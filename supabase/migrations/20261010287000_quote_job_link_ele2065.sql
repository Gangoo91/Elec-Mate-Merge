-- ELE-2065 / gap analysis §3A #11: a quote not raised from the job stayed
-- unlinked to it, so the job's P&L, money flow and "Invoice this job" all
-- missed it. Quotes made in the Electrical Hub builder, from a client record or
-- before the job existed had no way to join the job afterwards.
--
-- link_quote_to_job(quote, job): "Link to a job" on a quote's sheet. Sets
-- quotes.employer_job_id on the quote and, when the quote has been invoiced in
-- the Hub (settings.convertedInvoiceId), on that invoice too, unless the
-- invoice already sits on a different job. A null job takes the quote off its
-- job (its invoice follows only if it was on the same job).
--
-- Rules: signed in; the quote is the firm's (my_employer_scope, the quotes RLS
-- rule); the job is the same firm's and not archived. An Electrical Hub
-- invoice (converted in place, so the row is both) can be linked the same way.
-- Crew are not in my_employer_scope, so they can't relink. Additive: one new
-- function; the existing refresh_job_finance_quotes_upd trigger refreshes both
-- jobs' money when employer_job_id changes.

create or replace function public.link_quote_to_job(p_quote_id uuid, p_job_id uuid)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  q public.quotes;
  j public.employer_jobs;
  v_old uuid;
  v_inv uuid;
  v_inv_moved boolean := false;
begin
  if auth.uid() is null then
    raise exception 'Sign in again.' using errcode = '42501';
  end if;
  select * into q from public.quotes where id = p_quote_id and deleted_at is null for update;
  if q.id is null or q.user_id not in (select public.my_employer_scope()) then
    raise exception 'You can only link your own firm''s quotes.' using errcode = '42501';
  end if;
  if p_job_id is not null then
    select * into j from public.employer_jobs where id = p_job_id;
    if j.id is null or j.user_id is distinct from q.user_id then
      raise exception 'That job isn''t one of this firm''s jobs.' using errcode = '42501';
    end if;
    if j.archived_at is not null then
      raise exception 'That job is archived. Restore it first.' using errcode = '22023';
    end if;
  end if;

  v_old := q.employer_job_id;
  if v_old is not distinct from p_job_id then
    return jsonb_build_object('quote_id', q.id, 'job_id', p_job_id, 'changed', false, 'invoice_moved', false);
  end if;

  update public.quotes set employer_job_id = p_job_id where id = q.id;

  -- The Hub invoice raised from this quote follows it, unless someone already
  -- put that invoice on a different job.
  if coalesce(q.settings->>'convertedInvoiceId', '') ~ '^[0-9a-f-]{36}$' then
    v_inv := (q.settings->>'convertedInvoiceId')::uuid;
    update public.quotes
       set employer_job_id = p_job_id
     where id = v_inv
       and user_id = q.user_id
       and deleted_at is null
       and coalesce(invoice_raised, false)
       and (employer_job_id is null or employer_job_id is not distinct from v_old);
    v_inv_moved := found;
  end if;

  return jsonb_build_object('quote_id', q.id, 'job_id', p_job_id, 'previous_job_id', v_old,
                            'changed', true, 'invoice_moved', v_inv_moved);
end;
$$;
revoke all on function public.link_quote_to_job(uuid, uuid) from public, anon;
grant execute on function public.link_quote_to_job(uuid, uuid) to authenticated;
comment on function public.link_quote_to_job(uuid, uuid) is
  'ELE-2065 §3A #11: put a firm quote on one of the firm''s jobs (or take it off with null). Its Hub invoice (settings.convertedInvoiceId) follows unless already on another job. Firm managers only (my_employer_scope).';
