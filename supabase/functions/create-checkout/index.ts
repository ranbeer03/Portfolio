/**
 * create-checkout — turns a cart into a Stripe Checkout Session.
 *
 * The client sends only { artworkId, editionKey, quantity } lines; every
 * price is recomputed here from the prices table so a hostile client can
 * never dictate what it pays. Stock is validated up front and decremented
 * for real by the stripe-webhook function after payment.
 *
 * Deploy:  supabase functions deploy create-checkout
 * Secrets: supabase secrets set STRIPE_SECRET_KEY=sk_test_...
 *          supabase secrets set SITE_URL=https://your-domain.example
 */
import Stripe from 'npm:stripe@17';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { CORS_HEADERS, EDITIONS, type EditionKey } from '../_shared/editions.ts';

type CartLine = { artworkId: number; editionKey: EditionKey; quantity: number };

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }
  if (request.method !== 'POST') return json(405, { error: 'POST only' });

  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  const siteUrl = Deno.env.get('SITE_URL') ?? 'http://localhost:3000';

  let lines: CartLine[];
  try {
    const body = await request.json();
    lines = body.lines;
    if (!Array.isArray(lines) || lines.length === 0) throw new Error();
    for (const line of lines) {
      if (
        !Number.isInteger(line.artworkId) ||
        !(line.editionKey in EDITIONS) ||
        !Number.isInteger(line.quantity) ||
        line.quantity < 1 ||
        line.quantity > 50
      ) {
        throw new Error();
      }
    }
  } catch {
    return json(400, { error: 'Invalid cart payload' });
  }

  // Identify the signed-in customer, if any (guests check out too).
  let userId: string | null = null;
  const authHeader = request.headers.get('Authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const { data } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );
    userId = data.user?.id ?? null;
  }

  // Server-side truth: prices, names, stock, delivery fee.
  const artworkIds = [...new Set(lines.map((line) => line.artworkId))];
  const [pricesResult, artworksResult, settingsResult] = await Promise.all([
    supabase.from('prices').select('*').in('artwork_id', artworkIds),
    supabase.from('artworks').select('id, name').in('id', artworkIds),
    supabase.from('settings').select('value').eq('key', 'delivery_fee').single(),
  ]);
  if (pricesResult.error || artworksResult.error) {
    return json(500, { error: 'Could not load catalog' });
  }
  const deliveryFee = Number(settingsResult.data?.value ?? 10);

  const priceRows = new Map(
    (pricesResult.data ?? []).map((row) => [row.artwork_id, row])
  );
  const artworkNames = new Map(
    (artworksResult.data ?? []).map((row) => [row.id, row.name])
  );

  const orderItems = [];
  const stripeLineItems = [];
  let subtotal = 0;

  for (const line of lines) {
    const edition = EDITIONS[line.editionKey];
    const priceRow = priceRows.get(line.artworkId);
    const name = artworkNames.get(line.artworkId);
    if (!priceRow || !name) {
      return json(400, { error: `Artwork ${line.artworkId} is not for sale` });
    }

    const unitPrice = Number(priceRow[edition.priceField]);
    const stock = priceRow[edition.stockField];
    const quantity = edition.unique ? 1 : line.quantity;

    if (!unitPrice || unitPrice <= 0) {
      return json(400, { error: `"${name}" (${edition.label}) is not for sale` });
    }
    if (stock !== null && stock < quantity) {
      return json(409, { error: `"${name}" (${edition.label}) is sold out` });
    }

    subtotal += unitPrice * quantity;
    orderItems.push({
      artwork_id: line.artworkId,
      artwork_name: name,
      edition: edition.label,
      edition_key: line.editionKey,
      unit_price: unitPrice,
      quantity,
    });
    stripeLineItems.push({
      price_data: {
        currency: 'gbp',
        product_data: { name: `${name} — ${edition.label}` },
        unit_amount: Math.round(unitPrice * 100),
      },
      quantity,
    });
  }

  // The order row exists before payment; the webhook flips it to 'paid'.
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      status: 'pending_payment',
      user_id: userId,
      customer_name: '(pending — collected by Stripe)',
      email: '(pending)',
      shipping_address: '(pending — collected by Stripe)',
      items: orderItems,
      subtotal,
      delivery_fee: deliveryFee,
      total: subtotal + deliveryFee,
      currency: 'GBP',
    })
    .select('id')
    .single();
  if (orderError) {
    console.error('order insert failed', orderError);
    return json(500, { error: 'Could not create order' });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: stripeLineItems,
    shipping_address_collection: {
      // Extend as you confirm you can ship there.
      allowed_countries: ['GB', 'CH', 'FR', 'DE', 'IN', 'US'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Tracked delivery',
          type: 'fixed_amount',
          fixed_amount: {
            amount: Math.round(deliveryFee * 100),
            currency: 'gbp',
          },
        },
      },
    ],
    phone_number_collection: { enabled: true },
    metadata: { order_id: String(order.id) },
    client_reference_id: String(order.id),
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/cart`,
  });

  await supabase
    .from('orders')
    .update({ stripe_session_id: session.id })
    .eq('id', order.id);

  return json(200, { url: session.url });
});
