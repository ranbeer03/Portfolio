-- Orders table for the shop checkout.
-- Run this once in the Supabase dashboard: SQL Editor → New query → paste → Run.

create table public.orders (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  status text not null default 'new',           -- new → confirmed → paid → shipped
  user_id uuid references auth.users (id),      -- null for guest checkout
  customer_name text not null,
  email text not null,
  phone text,
  shipping_address text not null,
  note text,
  items jsonb not null,                         -- [{ artwork_id, artwork_name, edition, unit_price, quantity }]
  subtotal numeric not null,
  delivery_fee numeric not null,
  total numeric not null,
  currency text not null default 'GBP'
);

alter table public.orders enable row level security;

-- Guests can place orders; signed-in customers can only place orders as themselves.
create policy "Anyone can place an order"
  on public.orders for insert
  with check (user_id is null or auth.uid() = user_id);

-- Signed-in customers see their own orders (the account page's order history).
-- Manage all orders in the Supabase dashboard: Table Editor → orders.
create policy "Customers can read their own orders"
  on public.orders for select
  using (auth.uid() = user_id);
