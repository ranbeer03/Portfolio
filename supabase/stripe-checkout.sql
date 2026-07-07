-- Stripe checkout support. Run AFTER security-lockdown.sql and orders.sql.
-- Supabase dashboard → SQL Editor → New query → paste → Run.

-- 1. Orders gain Stripe bookkeeping columns.
--    Status flow: pending_payment → paid → shipped (or cancelled).
--    The legacy invoice flow keeps using: new → confirmed → paid → shipped.
alter table public.orders
  add column if not exists stripe_session_id text unique,
  add column if not exists paid_at timestamptz;

-- 2. Shop settings the server must be able to trust (the edge function
--    reads the delivery fee from here, never from the client).
create table if not exists public.settings (
  key text primary key,
  value jsonb not null
);

alter table public.settings enable row level security;

drop policy if exists "Public read" on public.settings;
create policy "Public read" on public.settings for select using (true);

insert into public.settings (key, value)
values ('delivery_fee', '10'::jsonb)
on conflict (key) do nothing;

-- 3. Atomic, race-safe stock decrement used by the stripe-webhook function.
--    Returns true when stock was available and decremented; false when the
--    edition sold out between checkout start and payment (refund path).
create or replace function public.decrement_stock(
  p_artwork_id bigint,
  p_stock_column text,
  p_quantity integer
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  updated integer;
begin
  if p_stock_column not in
    ('original_stock', 'a5_print_stock', 'a4_stock', 'a3_stock', 'a2_print_stock')
  then
    raise exception 'invalid stock column %', p_stock_column;
  end if;

  execute format(
    'update public.prices set %1$I = %1$I - $1
     where artwork_id = $2 and %1$I >= $1',
    p_stock_column
  ) using p_quantity, p_artwork_id;

  get diagnostics updated = row_count;
  return updated > 0;
end;
$$;

-- Only the service role (edge functions) may call it.
revoke execute on function public.decrement_stock(bigint, text, integer) from public, anon, authenticated;
