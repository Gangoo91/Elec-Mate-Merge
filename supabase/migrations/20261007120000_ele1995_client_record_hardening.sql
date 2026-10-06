-- ELE-1995 (follow-up to 20261006130000_one_customer_record): finish making
-- `customers` the ONE client record for the owner's Electrical Hub and the firm.
--
-- 1. SECURITY: client_activities / client_tasks / client_reviews still carried
--    their original "own …" policies (user_id = auth.uid(), role public). Being
--    permissive, they let ANY signed-in account attach a note/task/review to
--    ANOTHER firm's customer just by naming its id (verified 7 Oct: an
--    unrelated account inserted a note on a customer of aa69361d…). The firm
--    policy ("Firm manages customer …") already covers the owner and managers,
--    so the "own" policies are dropped. A trigger stamps the author.
-- 2. Managers can delete a client from the Employer Hub only when it has no
--    history (quotes, invoices, jobs, certificates). A client WITH history is
--    refused with a clear message; the owner keeps the Electrical Hub's own
--    delete (which unlinks quotes/certs — they hold their own copy).
-- 3. get_employer_client_summaries returns customers.company_name in its
--    contact_name column (was always null, so the company line never showed).
-- 4. get_firm_customer_documents(): certificates and properties for one client,
--    readable by the firm's office (reports/customer_properties are owner-only
--    under RLS, so managers saw nothing).
-- 5. employer_clients is retired: no code reads or writes it. INSERT/UPDATE are
--    revoked so its rows can never drift from customers — the release-held
--    drop (20261006158000) checks every row is in customers.

-- 1 ─ notes / tasks / reviews: firm-scoped only
drop policy if exists "own activities delete" on public.client_activities;
drop policy if exists "own activities insert" on public.client_activities;
drop policy if exists "own activities select" on public.client_activities;
drop policy if exists "own tasks delete" on public.client_tasks;
drop policy if exists "own tasks insert" on public.client_tasks;
drop policy if exists "own tasks select" on public.client_tasks;
drop policy if exists "own tasks update" on public.client_tasks;
drop policy if exists "own reviews delete" on public.client_reviews;
drop policy if exists "own reviews insert" on public.client_reviews;
drop policy if exists "own reviews select" on public.client_reviews;
drop policy if exists "own reviews update" on public.client_reviews;

revoke all on public.client_activities, public.client_tasks, public.client_reviews from anon;

create or replace function public.client_child_stamp_author()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  -- The writer is whoever is signed in; a client cannot write a note "as" a colleague.
  if auth.uid() is not null then
    new.user_id := auth.uid();
  end if;
  return new;
end;
$$;
revoke all on function public.client_child_stamp_author() from public, anon;

drop trigger if exists trg_client_activities_author on public.client_activities;
create trigger trg_client_activities_author before insert on public.client_activities
  for each row execute function public.client_child_stamp_author();
drop trigger if exists trg_client_tasks_author on public.client_tasks;
create trigger trg_client_tasks_author before insert on public.client_tasks
  for each row execute function public.client_child_stamp_author();
drop trigger if exists trg_client_reviews_author on public.client_reviews;
create trigger trg_client_reviews_author before insert on public.client_reviews
  for each row execute function public.client_child_stamp_author();

-- 2 ─ history check + manager delete
create or replace function public.customer_has_history(p_customer_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  -- Conservative: a customer outside the caller's firm "has history", so the
  -- answer never helps anyone delete (or probe) another firm's records.
  select case
    when not exists (select 1 from customers c
                      where c.id = p_customer_id
                        and c.user_id in (select my_employer_scope())) then true
    else exists (select 1 from quotes q where q.customer_id = p_customer_id and q.deleted_at is null)
      or exists (select 1 from employer_jobs j where j.customer_id = p_customer_id)
      or exists (select 1 from reports r where r.customer_id = p_customer_id and r.deleted_at is null)
  end;
$$;
revoke all on function public.customer_has_history(uuid) from public, anon;
grant execute on function public.customer_has_history(uuid) to authenticated;

drop policy if exists "Firm deletes customers without history" on public.customers;
create policy "Firm deletes customers without history" on public.customers
  for delete to authenticated
  using (user_id in (select public.my_employer_scope())
         and not public.customer_has_history(id));

-- 3 ─ summaries: company line (body otherwise unchanged from 20261006130000)
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
    cu.company_name,
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
revoke all on function public.get_employer_client_summaries() from public, anon;
grant execute on function public.get_employer_client_summaries() to authenticated;

-- 4 ─ certificates + properties for one client, for the firm's office
create or replace function public.get_firm_customer_documents(p_customer_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_owner uuid;
begin
  select c.user_id into v_owner
    from customers c
   where c.id = p_customer_id
     and c.user_id in (select my_employer_scope());
  if v_owner is null then
    raise exception 'Client not found' using errcode = '42501';
  end if;

  return jsonb_build_object(
    'is_owner', v_owner = auth.uid(),
    'certificates', coalesce((
      select jsonb_agg(x order by x.sort_at desc)
        from (
          select r.id, r.report_id, r.report_type, r.certificate_number, r.status,
                 r.inspection_date, r.next_inspection_due, r.expiry_date,
                 r.installation_address, r.created_at,
                 coalesce(r.inspection_date::timestamptz, r.created_at) as sort_at
            from reports r
           where r.customer_id = p_customer_id
             and r.deleted_at is null
             and r.status <> 'auto-draft'
             and r.superseded_by is null
           order by coalesce(r.inspection_date::timestamptz, r.created_at) desc
           limit 50
        ) x), '[]'::jsonb),
    'properties', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', p.id, 'address', p.address, 'postcode', p.postcode,
               'property_type', p.property_type, 'is_primary', p.is_primary)
             order by p.is_primary desc, p.created_at)
        from customer_properties p
       where p.customer_id = p_customer_id), '[]'::jsonb)
  );
end;
$$;
revoke all on function public.get_firm_customer_documents(uuid) from public, anon;
grant execute on function public.get_firm_customer_documents(uuid) to authenticated;

-- 5 ─ employer_clients: frozen
revoke insert, update on public.employer_clients from anon, authenticated;
comment on table public.employer_clients is
  '[LEGACY — DO NOT USE] Old Employer Hub client list (3 rows, copied into customers on 6 Oct). Scope: employer_id = the firm (owner profiles.id). Used by: nothing (no code reads or writes it; INSERT/UPDATE revoked 7 Oct, ELE-1995). Rule: Use customers. Kept only for rollback; dropped by release-held 20261006158000.';
