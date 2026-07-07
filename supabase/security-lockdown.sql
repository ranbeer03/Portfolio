-- =============================================================================
-- P0 SECURITY LOCKDOWN — run this BEFORE anything else, TODAY.
-- Supabase dashboard → SQL Editor → New query → paste → Run.
--
-- Verified 2026-07-07 with the anon key alone:
--   • UPDATE and DELETE succeed on artworks/images (catalog can be defaced)
--   • INSERT reaches the prices table (fails only on foreign keys)
--   • SELECT on inquiries returns customer emails and messages
-- =============================================================================

-- Catalog tables: the public may READ, never write.
alter table public.artworks enable row level security;
alter table public.images   enable row level security;
alter table public.prices   enable row level security;

drop policy if exists "Public read" on public.artworks;
drop policy if exists "Public read" on public.images;
drop policy if exists "Public read" on public.prices;

create policy "Public read" on public.artworks for select using (true);
create policy "Public read" on public.images   for select using (true);
create policy "Public read" on public.prices   for select using (true);

-- Inquiries: anyone may submit; nobody may read/change via the public API.
-- (You read them in the dashboard, which uses the service role.)
alter table public.inquiries enable row level security;

drop policy if exists "Anyone can submit an inquiry" on public.inquiries;

create policy "Anyone can submit an inquiry"
  on public.inquiries for insert
  with check (true);

-- Sanity check — expect rowsecurity = true on all four:
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in ('artworks', 'images', 'prices', 'inquiries');
