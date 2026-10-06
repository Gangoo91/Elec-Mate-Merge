-- ELE-1995 / ELE-1997: one customer record for the firm and the owner's
-- Electrical Hub. The Employer Hub listed `customers` (6,698 — the real book)
-- but its detail sheet, edits, notes, tasks and reviews all pointed at the
-- legacy `employer_clients` (3 rows), so for nearly every client the sheet was
-- empty, edits matched nothing and notes/tasks/reviews failed their FK.
--
-- 1. client_activities / client_tasks / client_reviews (0 rows each) now
--    reference customers, and are visible to the whole firm, not just whoever
--    wrote them.
-- 2. customers readable/editable by co-admins (my_employer_scope), not only the
--    owner. Owners are already in their own scope, so nothing narrows.
-- 3. employer_jobs.customer_id → customers; summaries count jobs per customer.
-- 4. The 3 legacy employer_clients rows are copied into customers (matched by
--    name per firm) and their 3 linked jobs repointed. employer_clients is left
--    in place, unused, for rollback.

-- 1 ─ notes / tasks / reviews
do $$
declare r record;
begin
  for r in
    select tc.table_name, tc.constraint_name
      from information_schema.table_constraints tc
      join information_schema.constraint_column_usage ccu on ccu.constraint_name = tc.constraint_name
     where tc.constraint_type = 'FOREIGN KEY'
       and tc.table_schema = 'public'
       and tc.table_name in ('client_activities','client_tasks','client_reviews')
       and ccu.table_name = 'employer_clients'
  loop
    execute format('alter table public.%I drop constraint %I', r.table_name, r.constraint_name);
  end loop;
end $$;

alter table public.client_activities add constraint client_activities_customer_fk
  foreign key (client_id) references public.customers(id) on delete cascade;
alter table public.client_tasks add constraint client_tasks_customer_fk
  foreign key (client_id) references public.customers(id) on delete cascade;
alter table public.client_reviews add constraint client_reviews_customer_fk
  foreign key (client_id) references public.customers(id) on delete cascade;

do $$
declare t text;
begin
  foreach t in array array['client_activities','client_tasks','client_reviews'] loop
    execute format('drop policy if exists %I on public.%I', 'Firm manages customer ' || t, t);
    execute format($p$create policy %I on public.%I for all to authenticated
      using (exists (select 1 from public.customers c where c.id = %I.client_id
                       and c.user_id in (select public.my_employer_scope())))
      with check (exists (select 1 from public.customers c where c.id = %I.client_id
                       and c.user_id in (select public.my_employer_scope())))$p$,
      'Firm manages customer ' || t, t, t, t);
  end loop;
end $$;

-- 2 ─ customers shared with co-admins
drop policy if exists "Firm reads its customers" on public.customers;
create policy "Firm reads its customers" on public.customers
  for select to authenticated using (user_id in (select public.my_employer_scope()));
drop policy if exists "Firm updates its customers" on public.customers;
create policy "Firm updates its customers" on public.customers
  for update to authenticated using (user_id in (select public.my_employer_scope()))
  with check (user_id in (select public.my_employer_scope()));
drop policy if exists "Firm adds customers" on public.customers;
create policy "Firm adds customers" on public.customers
  for insert to authenticated with check (user_id in (select public.my_employer_scope()));

-- 3 ─ jobs link to customers
alter table public.employer_jobs
  add column if not exists customer_id uuid references public.customers(id) on delete set null;
create index if not exists employer_jobs_customer_idx on public.employer_jobs (customer_id);

-- 4 ─ migrate the legacy rows
with legacy as (
  select ec.* from public.employer_clients ec
),
ins as (
  insert into public.customers (user_id, name, email, phone, address, notes, tags, last_activity_at, created_at)
  select l.employer_id, l.name, l.email, l.phone, l.address, l.notes, coalesce(l.tags, '{}'), l.last_activity_at, l.created_at
    from legacy l
   where not exists (
     select 1 from public.customers c
      where c.user_id = l.employer_id and lower(trim(c.name)) = lower(trim(l.name))
   )
  returning id, user_id, name
)
select count(*) from ins;

update public.employer_jobs j
   set customer_id = c.id
  from public.employer_clients ec
  join public.customers c
    on c.user_id = ec.employer_id and lower(trim(c.name)) = lower(trim(ec.name))
 where j.client_id = ec.id and j.customer_id is null;

-- 5 ─ summaries: customers only (legacy branch removed — its rows were copied
--     above, so keeping it would list them twice); jobs counted per customer.
create or replace function public.get_employer_client_summaries()
returns table(id uuid, name text, contact_name text, email text, phone text, address text,
              notes text, tags text[], last_activity_at timestamptz, created_at timestamptz,
              quote_count bigint, open_quote_value numeric, invoice_count bigint,
              total_invoiced numeric, total_paid numeric, outstanding numeric,
              job_count bigint, active_job_count numeric)
language sql
stable security definer
set search_path to 'public'
as $function$
  select
    cu.id, cu.name,
    null::text,
    cu.email, cu.phone, cu.address, cu.notes, cu.tags,
    cu.last_activity_at, cu.created_at,
    coalesce(agg.quote_count, 0), coalesce(agg.open_quote_value, 0),
    coalesce(agg.invoice_count, 0), coalesce(agg.total_invoiced, 0),
    coalesce(agg.total_paid, 0),
    coalesce(agg.total_invoiced, 0) - coalesce(agg.total_paid, 0),
    coalesce(jj.job_count, 0), coalesce(jj.active_job_count, 0)
  from customers cu
  left join (
    select q.customer_id,
           count(*) filter (where not coalesce(q.invoice_raised, false))                as quote_count,
           sum(q.total) filter (where not coalesce(q.invoice_raised, false)
                                 and lower(coalesce(q.status,'')) in ('draft','sent'))  as open_quote_value,
           count(*) filter (where coalesce(q.invoice_raised, false)
                              and lower(coalesce(q.invoice_status,'')) <> 'draft')      as invoice_count,
           sum(q.total) filter (where coalesce(q.invoice_raised, false)
                                 and lower(coalesce(q.invoice_status,'')) <> 'draft')   as total_invoiced,
           sum(coalesce(nullif(q.total_paid,0), q.total))
             filter (where coalesce(q.invoice_raised,false)
                       and lower(coalesce(q.invoice_status,'')) = 'paid')               as total_paid
      from quotes q
     where q.deleted_at is null and q.customer_id is not null
     group by q.customer_id
  ) agg on agg.customer_id = cu.id
  left join (
    select customer_id, count(*) job_count,
           count(*) filter (where status = 'Active') active_job_count
      from employer_jobs where customer_id is not null and archived_at is null
     group by customer_id
  ) jj on jj.customer_id = cu.id
  where cu.user_id in (select public.my_employer_scope())
  order by last_activity_at desc nulls last, name asc;
$function$;
