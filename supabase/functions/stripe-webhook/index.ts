/**
 * stripe-webhook — marks orders paid and decrements stock after checkout.
 *
 * Register in Stripe: Dashboard → Developers → Webhooks → Add endpoint
 *   URL:    https://<project-ref>.supabase.co/functions/v1/stripe-webhook
 *   Events: checkout.session.completed, checkout.session.expired
 *
 * Deploy:  supabase functions deploy stripe-webhook --no-verify-jwt
 *          (--no-verify-jwt is required: Stripe cannot send a Supabase JWT;
 *           authenticity comes from the Stripe signature check instead)
 * Secrets: supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
 */
import Stripe from 'npm:stripe@17';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { EDITIONS, type EditionKey } from '../_shared/editions.ts';

Deno.serve(async (request) => {
  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const signature = request.headers.get('stripe-signature');
  if (!signature) return new Response('Missing signature', { status: 400 });

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      await request.text(),
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!
    );
  } catch (error) {
    console.error('signature verification failed', error);
    return new Response('Invalid signature', { status: 400 });
  }

  if (
    event.type !== 'checkout.session.completed' &&
    event.type !== 'checkout.session.expired'
  ) {
    return new Response('ignored', { status: 200 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const orderId = Number(session.metadata?.order_id);
  if (!orderId) {
    console.error('webhook session without order_id metadata', session.id);
    return new Response('no order_id', { status: 200 });
  }

  if (event.type === 'checkout.session.expired') {
    await supabase
      .from('orders')
      .update({ status: 'cancelled' })
      .eq('id', orderId)
      .eq('status', 'pending_payment');
    return new Response('ok', { status: 200 });
  }

  // checkout.session.completed — idempotent: only a pending order transitions.
  const details = session.customer_details;
  const shipping =
    (session as unknown as { shipping_details?: typeof details })
      .shipping_details ?? details;
  const address = shipping?.address;
  const addressText = address
    ? [
        shipping?.name,
        address.line1,
        address.line2,
        address.postal_code,
        address.city,
        address.state,
        address.country,
      ]
        .filter(Boolean)
        .join(', ')
    : '(missing — check the Stripe dashboard)';

  const { data: updated, error } = await supabase
    .from('orders')
    .update({
      status: 'paid',
      paid_at: new Date().toISOString(),
      customer_name: details?.name ?? '(unknown)',
      email: details?.email ?? '(unknown)',
      phone: details?.phone ?? null,
      shipping_address: addressText,
    })
    .eq('id', orderId)
    .eq('status', 'pending_payment')
    .select('items')
    .single();

  if (error || !updated) {
    // Already processed (retry) or unknown order — nothing more to do.
    console.log('order not transitioned', orderId, error?.message);
    return new Response('ok', { status: 200 });
  }

  // Decrement stock per line. A false return means someone else bought the
  // last one first — flag the order so you can refund from the dashboard.
  for (const item of updated.items as Array<{
    artwork_id: number;
    edition_key?: EditionKey;
    quantity: number;
  }>) {
    if (!item.edition_key) continue;
    const edition = EDITIONS[item.edition_key];
    const { data: decremented, error: stockError } = await supabase.rpc(
      'decrement_stock',
      {
        p_artwork_id: item.artwork_id,
        p_stock_column: edition.stockField,
        p_quantity: item.quantity,
      }
    );
    if (stockError || decremented === false) {
      console.error('OVERSOLD order', orderId, item, stockError?.message);
      await supabase
        .from('orders')
        .update({ status: 'needs_attention' })
        .eq('id', orderId);
    }
  }

  return new Response('ok', { status: 200 });
});
