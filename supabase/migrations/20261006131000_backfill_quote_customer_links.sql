-- ELE-1995: quotes_auto_link_customer only runs when client_data changes, so
-- 297 older quotes/invoices were never linked to a customer — clients' totals
-- and detail sheets missed them. Apply the trigger's own rule retroactively:
-- link only when exactly ONE customer of the same user matches the email, or
-- (failing that) exactly one matches the name. 51 rows qualify on 6 Oct.
-- Every change is recorded in quotes_customer_backfill_20261006 for rollback:
--   update quotes q set customer_id = null from quotes_customer_backfill_20261006 b where b.quote_id = q.id;
-- The ~246 with no matching customer are NOT touched (creating customers in
-- people's books is a product decision).
create table if not exists public.quotes_customer_backfill_20261006 (
  quote_id uuid primary key,
  customer_id uuid not null,
  matched_on text not null,
  created_at timestamptz default now()
);
alter table public.quotes_customer_backfill_20261006 enable row level security;

with u as (
  select q.id, q.user_id,
         lower(trim(coalesce(q.client_data->>'email',''))) em,
         lower(trim(coalesce(q.client_data->>'name',''))) nm
    from public.quotes q
   where q.deleted_at is null and q.customer_id is null
),
m as (
  select u.id,
    (select case when count(*) = 1 then (array_agg(c.id))[1] end from public.customers c
      where c.user_id = u.user_id and u.em <> '' and lower(trim(c.email)) = u.em) by_email,
    (select case when count(*) = 1 then (array_agg(c.id))[1] end from public.customers c
      where c.user_id = u.user_id and u.nm <> '' and lower(trim(c.name)) = u.nm) by_name
  from u
)
insert into public.quotes_customer_backfill_20261006 (quote_id, customer_id, matched_on)
select id, coalesce(by_email, by_name), case when by_email is not null then 'email' else 'name' end
  from m
 where coalesce(by_email, by_name) is not null
on conflict do nothing;

update public.quotes q
   set customer_id = b.customer_id
  from public.quotes_customer_backfill_20261006 b
 where b.quote_id = q.id and q.customer_id is null;
