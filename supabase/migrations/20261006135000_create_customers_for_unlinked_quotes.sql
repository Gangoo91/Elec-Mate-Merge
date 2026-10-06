-- ELE-1995, Andrew 6 Oct: "create customer records". 228 quotes/invoices (106
-- accounts) had a client name/email but no customer record, so client totals,
-- detail sheets and the portal missed them. One customer per account per
-- client (grouped by email, else by name), tagged 'auto-created-from-quotes'
-- with a note, so they are identifiable and reversible. 18 quotes with no name
-- or email are left alone.
-- Rollback:
--   update quotes q set customer_id = null from quotes_customer_backfill_20261006 b
--    where b.quote_id = q.id and b.matched_on = 'created';
--   delete from customers where id in (select customer_id from customers_created_20261006);
create table if not exists public.customers_created_20261006 (
  customer_id uuid primary key,
  user_id uuid not null,
  group_key text not null,
  created_at timestamptz default now()
);
alter table public.customers_created_20261006 enable row level security;

with u as (
  select q.id, q.user_id, q.created_at,
         nullif(lower(trim(coalesce(q.client_data->>'email',''))),'') em,
         nullif(trim(coalesce(q.client_data->>'name','')),'') nm,
         nullif(trim(coalesce(q.client_data->>'phone','')),'') ph,
         nullif(trim(coalesce(q.client_data->>'address','')),'') ad
    from public.quotes q
   where q.deleted_at is null and q.customer_id is null
),
g as (
  select u.*, coalesce('e:' || em, 'n:' || lower(nm)) gk
    from u where em is not null or nm is not null
),
latest as (
  select distinct on (user_id, gk)
         user_id, gk, coalesce(nm, em) as name, em, ph, ad
    from g
   order by user_id, gk, created_at desc
),
ins as (
  insert into public.customers (user_id, name, email, phone, address, notes, tags, last_activity_at)
  select l.user_id, l.name, l.em, l.ph, l.ad,
         'Added automatically on 6 Oct 2026 from earlier quotes/invoices that had no customer linked.',
         array['auto-created-from-quotes'], now()
    from latest l
  returning id, user_id, lower(coalesce(email,'')) em, lower(name) nm
)
insert into public.customers_created_20261006 (customer_id, user_id, group_key)
select id, user_id, case when em <> '' then 'e:' || em else 'n:' || nm end from ins;

insert into public.quotes_customer_backfill_20261006 (quote_id, customer_id, matched_on)
select q.id, c.customer_id, 'created'
  from public.quotes q
  join public.customers_created_20261006 c
    on c.user_id = q.user_id
   and c.group_key = coalesce('e:' || nullif(lower(trim(coalesce(q.client_data->>'email',''))),''),
                              'n:' || lower(nullif(trim(coalesce(q.client_data->>'name','')),'')))
 where q.deleted_at is null and q.customer_id is null
on conflict do nothing;

update public.quotes q
   set customer_id = b.customer_id
  from public.quotes_customer_backfill_20261006 b
 where b.quote_id = q.id and b.matched_on = 'created' and q.customer_id is null;
