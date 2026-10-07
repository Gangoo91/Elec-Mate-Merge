-- ELE-1852 Demo college fixture ledger (P-ELE-13, 8 Oct 2026).
--
-- Northgate Technical College (a1b2c3d4-…) is the demo college. It also holds
-- REAL accounts (Andrew's two, and James Eccleson), so the demo roster that
-- scripts/college-demo/seed_demo_college.mjs builds must be removable without
-- ever touching them. Every row the script creates is written here, by table
-- and id, and `--reset` deletes exactly these rows and nothing else.
--
--   kind 'seeded'   a row the script inserted; deleted on --reset
--   kind 'adopted'  a pre-existing fictional row the script relabelled
--                   (the six 2025 roll rows); restored only on --purge
--   kind 'account'  a fixture auth account (founder+collegedemo-*); kept
--                   across resets so ids stay stable, removed on --purge
--
-- Service role only: no app role reads or writes it.

create table if not exists public.demo_fixture_rows (
  table_name text not null,
  row_id uuid not null,
  kind text not null default 'seeded' check (kind in ('seeded', 'adopted', 'account')),
  label text,
  restore jsonb,
  seeded_at timestamptz not null default now(),
  primary key (table_name, row_id)
);
create index if not exists demo_fixture_rows_kind_idx on public.demo_fixture_rows (kind, table_name);

alter table public.demo_fixture_rows enable row level security;
revoke all on public.demo_fixture_rows from anon, authenticated;

comment on table public.demo_fixture_rows is
  '[DEMO FIXTURE] Ledger of every row the demo-college seed script (scripts/college-demo/seed_demo_college.mjs) created or relabelled on Northgate Technical College: table, id, kind (seeded / adopted / account) and, for adopted rows, the values to restore. Scope: fixture data only, i.e. founder+collegedemo-* accounts and the fictional roll rows. Used by: the seed script (--reset deletes exactly the seeded rows; --purge also removes accounts and restores adopted rows). Rule: service role only; never record a real person''s row here; the script refuses to run if a seeded row would belong to a non-fixture account.';
