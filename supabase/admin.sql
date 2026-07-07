-- Admin dashboard backend. Run AFTER security-lockdown.sql and orders.sql.
-- Supabase dashboard → SQL Editor → New query → paste → Run.
--
-- Then make yourself an admin (find your user id under Auth → Users):
--   insert into public.admins (user_id) values ('<your-user-id>');
--
-- The dashboard lives at /admin (sign in with the same account first).
-- RLS below is the actual security boundary; the React route guard is
-- convenience only.

-- Who is an admin.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table public.admins enable row level security;

-- Users may check their own membership (drives the client-side guard).
-- Nobody can list other admins or write to the table via the public API.
drop policy if exists "Read own admin row" on public.admins;
create policy "Read own admin row"
  on public.admins for select
  using (auth.uid() = user_id);

-- Helper usable inside other policies without recursive-RLS headaches.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- Orders: tracking number for shipped orders, full admin read/update.
alter table public.orders
  add column if not exists tracking_number text;

drop policy if exists "Admins read all orders" on public.orders;
create policy "Admins read all orders"
  on public.orders for select
  using (public.is_admin());

drop policy if exists "Admins update orders" on public.orders;
create policy "Admins update orders"
  on public.orders for update
  using (public.is_admin())
  with check (public.is_admin());

-- Inquiries: admins read contact-form messages in-app.
drop policy if exists "Admins read inquiries" on public.inquiries;
create policy "Admins read inquiries"
  on public.inquiries for select
  using (public.is_admin());
