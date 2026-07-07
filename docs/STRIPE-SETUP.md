# Stripe checkout — go-live checklist

The code is fully in place and feature-flagged off. Checkout keeps using the
current email-invoice flow until you finish these steps and flip the flag.

## 1. Accounts & keys (~30 min, you)

1. Create a Stripe account → <https://dashboard.stripe.com>.
2. Copy the **test** secret key (`sk_test_…`) from Developers → API keys.
3. Install the Supabase CLI and link the project (once):

   ```sh
   brew install supabase/tap/supabase
   supabase login
   supabase link --project-ref <your-project-ref>
   ```

## 2. Database (2 min)

Run [supabase/stripe-checkout.sql](../supabase/stripe-checkout.sql) in the
SQL Editor. It adds `stripe_session_id`/`paid_at` to orders, creates the
`settings` table (server-side delivery fee), and the race-safe
`decrement_stock` function.

⚠️ Prerequisites: `security-lockdown.sql` (still not run as of 2026-07-07)
and `orders.sql` (done).

## 3. Deploy the edge functions (5 min)

```sh
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
supabase secrets set SITE_URL=http://localhost:3000   # prod domain later
supabase functions deploy create-checkout
supabase functions deploy stripe-webhook --no-verify-jwt
```

## 4. Register the webhook (5 min)

Stripe Dashboard → Developers → Webhooks → Add endpoint:

- URL: `https://<project-ref>.supabase.co/functions/v1/stripe-webhook`
- Events: `checkout.session.completed`, `checkout.session.expired`
- Copy the signing secret and run:
  `supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...`

## 5. Flip the flag & test (test mode)

1. In [src/config.js](../src/config.js) set `CHECKOUT_MODE = 'stripe'`.
2. Add a print to the cart → Checkout → pay with card `4242 4242 4242 4242`
   (any future expiry / CVC).
3. Verify: redirected to `/checkout/success`, cart cleared, order row
   `status='paid'` with the Stripe-collected address, stock decremented.
4. Cancel a checkout → order stays `pending_payment`, later flips to
   `cancelled` when the session expires (~24 h).

## 6. Go live

- Swap `STRIPE_SECRET_KEY` + webhook to **live** keys; set `SITE_URL` to the
  production domain.
- Update the Terms of Sale in `src/data/legalContent.js`: payment is now
  taken at checkout (the current text promises no online payment).

## Design notes

- The client sends only `{artworkId, editionKey, quantity}`; the
  `create-checkout` function recomputes every price and the delivery fee
  from the database — a tampered cart cannot change what is charged.
- Stock is decremented by the webhook *after* payment via `decrement_stock`,
  which refuses to go below zero. If two buyers race on a unique original,
  the second order is flagged `needs_attention` for a manual refund.
- `supabase/functions/_shared/editions.ts` mirrors `src/data/editions.js`;
  if you add an edition, update both.
