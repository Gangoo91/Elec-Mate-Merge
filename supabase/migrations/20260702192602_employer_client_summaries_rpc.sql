-- Per-client real aggregates for the CRM list + detail StatStrip (no fabricated
-- numbers). SECURITY DEFINER, scoped to the calling employer. Rollback: drop function.
CREATE OR REPLACE FUNCTION public.get_employer_client_summaries()
 RETURNS TABLE (
   id uuid,
   name text,
   contact_name text,
   email text,
   phone text,
   address text,
   notes text,
   tags text[],
   last_activity_at timestamptz,
   created_at timestamptz,
   quote_count bigint,
   open_quote_value numeric,
   invoice_count bigint,
   total_invoiced numeric,
   total_paid numeric,
   outstanding numeric,
   job_count bigint,
   active_job_count numeric
 )
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $$
  select
    c.id, c.name, c.contact_name, c.email, c.phone, c.address, c.notes, c.tags,
    c.last_activity_at, c.created_at,
    coalesce(q.quote_count, 0)      as quote_count,
    coalesce(q.open_quote_value, 0) as open_quote_value,
    coalesce(i.invoice_count, 0)    as invoice_count,
    coalesce(i.total_invoiced, 0)   as total_invoiced,
    coalesce(i.total_paid, 0)       as total_paid,
    coalesce(i.total_invoiced, 0) - coalesce(i.total_paid, 0) as outstanding,
    coalesce(j.job_count, 0)        as job_count,
    coalesce(j.active_job_count, 0) as active_job_count
  from employer_clients c
  left join (
    select client_id,
           count(*) as quote_count,
           sum(value) filter (where status in ('Draft','Sent','Pending')) as open_quote_value
      from employer_quotes where client_id is not null group by client_id
  ) q on q.client_id = c.id
  left join (
    select client_id,
           count(*) as invoice_count,
           sum(amount) as total_invoiced,
           sum(amount) filter (where status = 'Paid') as total_paid
      from employer_invoices where client_id is not null group by client_id
  ) i on i.client_id = c.id
  left join (
    select client_id,
           count(*) as job_count,
           count(*) filter (where status = 'Active') as active_job_count
      from employer_jobs where client_id is not null group by client_id
  ) j on j.client_id = c.id
  where c.employer_id = (select auth.uid())
  order by c.last_activity_at desc nulls last, c.name asc;
$$;

GRANT EXECUTE ON FUNCTION public.get_employer_client_summaries() TO authenticated;
