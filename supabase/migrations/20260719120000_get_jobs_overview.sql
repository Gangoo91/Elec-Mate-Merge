-- S3: jobs overview RPC — one round trip for the Jobs list, with auto-derived stage.
-- Replaces the client-side 1+2N query pattern. Stage is DERIVED from linked data, never stored.
-- Applied to prod 2026-07-19 via MCP. See migration of same name in Supabase dashboard.
create or replace function public.get_jobs_overview()
returns table (
  id uuid, user_id uuid, title text, description text, project_type text,
  status text, priority text, customer_id uuid, customer_name text,
  location text, estimated_value numeric, start_date date, due_date date,
  completed_at timestamptz, tags text[], created_at timestamptz, updated_at timestamptz,
  total_tasks int, done_tasks int,
  quote_count int, has_accepted_quote boolean, booked_slot timestamptz,
  invoice_count int, unpaid_invoice_count int, paid_invoice_count int,
  cert_count int, visit_count int,
  stage text
)
language sql security invoker set search_path = ''
as $$
  select p.id, p.user_id, p.title, p.description, p.project_type,
         p.status, p.priority, p.customer_id, c.name,
         p.location, p.estimated_value, p.start_date, p.due_date,
         p.completed_at, p.tags, p.created_at, p.updated_at,
         coalesce(t.total, 0)::int, coalesce(t.done, 0)::int,
         coalesce(q.n, 0)::int, coalesce(q.accepted, false), q.booked,
         coalesce(i.n, 0)::int, coalesce(i.unpaid, 0)::int, coalesce(i.paid, 0)::int,
         coalesce(r.n, 0)::int, coalesce(sv.n, 0)::int,
         case
           when p.status = 'cancelled' then 'cancelled'
           when p.status = 'completed'
                and coalesce(i.paid, 0) > 0 and coalesce(i.unpaid, 0) = 0 then 'paid'
           when coalesce(i.unpaid, 0) > 0 then 'awaiting_payment'
           when p.status = 'completed' then 'bill_it'
           when coalesce(t.done, 0) > 0 or p.status = 'active' then 'in_progress'
           when coalesce(q.accepted, false)
                and q.booked is not null and q.booked > now() then 'booked'
           when coalesce(q.accepted, false) then 'won'
           when coalesce(q.n, 0) > 0 then 'quoted'
           else 'enquiry'
         end
  from public.spark_projects p
  left join public.customers c on c.id = p.customer_id
  left join lateral (
    select count(*) filter (where st.status <> 'cancelled') as total,
           count(*) filter (where st.status = 'done') as done
    from public.spark_tasks st where st.project_id = p.id) t on true
  left join lateral (
    select count(*) as n,
           bool_or(qq.acceptance_status in ('accepted','accepted_pending_deposit')
                   or qq.status = 'approved') as accepted,
           max(qq.booked_slot_start) as booked
    from public.quotes qq where qq.project_id = p.id) q on true
  left join lateral (
    select count(*) filter (where iv.status <> 'draft') as n,
           count(*) filter (where iv.status in ('sent','overdue')) as unpaid,
           count(*) filter (where iv.status = 'paid') as paid
    from public.invoices iv where iv.project_id = p.id) i on true
  left join lateral (
    select count(*) as n from public.reports rr where rr.project_id = p.id) r on true
  left join lateral (
    select count(*) as n from public.site_visits s where s.project_id = p.id) sv on true
  where p.user_id = auth.uid() and p.status <> 'cancelled'
  order by p.created_at desc
$$;

revoke execute on function public.get_jobs_overview() from public, anon;
grant execute on function public.get_jobs_overview() to authenticated;
