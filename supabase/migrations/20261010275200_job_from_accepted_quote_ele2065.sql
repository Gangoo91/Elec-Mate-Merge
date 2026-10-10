-- ELE-2065 / gap #1, journey break A1: an accepted quote never became a firm
-- job (0 of 1,386 accepted quotes link one; acceptance makes a spark_projects
-- row, which the Employer Hub doesn't read), so the office retyped it.
--
-- The smallest safe link, nothing automatic:
--   * create_job_from_quote(quote): a firm manager taps "Create job from this
--     quote". It makes one employer_jobs row prefilled from the quote (title,
--     client, site, contact, scope, net value) at board stage Confirmed with no
--     date ("won, needs a date") and links it (quotes.employer_job_id). Calling
--     it again returns the same job. Employer accounts only.
--   * get_won_quotes_without_job(): the Overview To do row "Quote accepted, no
--     job yet". Accepted in the last 60 days, not invoiced, no job.
-- The acceptance trigger (handle_quote_acceptance) is untouched.

create or replace function public.create_job_from_quote(p_quote_id uuid)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  q public.quotes;
  v_job uuid;
  v_title text;
  v_client text;
  v_location text;
begin
  if auth.uid() is null then
    raise exception 'Sign in again.' using errcode = '42501';
  end if;
  select * into q from public.quotes where id = p_quote_id and deleted_at is null for update;
  if q.id is null or q.user_id not in (select public.my_employer_scope()) then
    raise exception 'You can only make jobs from your own firm''s quotes.' using errcode = '42501';
  end if;
  if not public.is_employer_account(q.user_id) then
    raise exception 'Jobs come with the Employer Hub.' using errcode = '42501';
  end if;
  if coalesce(q.invoice_raised, false) then
    raise exception 'That is an invoice, not a quote.' using errcode = '22023';
  end if;
  if not (coalesce(q.acceptance_status, '') in ('accepted', 'accepted_pending_deposit')
          or lower(coalesce(q.status, '')) = 'approved') then
    raise exception 'Only an accepted quote can become a job.' using errcode = '22023';
  end if;

  if q.employer_job_id is not null
     and exists (select 1 from public.employer_jobs j where j.id = q.employer_job_id and j.archived_at is null) then
    return jsonb_build_object('job_id', q.employer_job_id, 'created', false);
  end if;

  v_client := coalesce(nullif(btrim(q.client_data->>'name'), ''), 'Client');
  v_title := coalesce(nullif(btrim(q.job_details->>'title'), ''),
                      'Job for ' || v_client || coalesce(' (' || q.quote_number || ')', ''));
  v_location := coalesce(nullif(btrim(q.job_details->>'location'), ''),
                         nullif(btrim(concat_ws(', ', nullif(btrim(q.client_data->>'address'), ''),
                                                      nullif(btrim(q.client_data->>'postcode'), ''))), ''),
                         '');

  insert into public.employer_jobs (
    user_id, title, client, location, status, board_stage, value, description,
    client_email, client_phone, customer_id)
  values (
    q.user_id, v_title, v_client, v_location, 'Pending', 'Confirmed',
    nullif(coalesce(q.subtotal, q.total, 0), 0),
    nullif(btrim(concat_ws(E'\n\n', nullif(btrim(q.job_details->>'description'), ''),
                                   'From quote ' || coalesce(q.quote_number, '') || '.')), ''),
    nullif(btrim(q.client_data->>'email'), ''), nullif(btrim(q.client_data->>'phone'), ''),
    q.customer_id)
  returning id into v_job;

  update public.quotes set employer_job_id = v_job where id = q.id;

  return jsonb_build_object('job_id', v_job, 'created', true);
end;
$$;
revoke all on function public.create_job_from_quote(uuid) from public, anon;
grant execute on function public.create_job_from_quote(uuid) to authenticated;
comment on function public.create_job_from_quote(uuid) is
  'ELE-2065: one employer_jobs row from an accepted quote (board stage Confirmed, no date), linked via quotes.employer_job_id. Idempotent. Firm managers of an employer account only.';

create or replace function public.get_won_quotes_without_job()
returns table(id uuid, quote_number text, client text, job_title text, accepted_at timestamptz)
language sql
stable
security definer
set search_path to 'public'
as $$
  select q.id, q.quote_number, coalesce(nullif(q.client_data->>'name', ''), 'Client'),
         nullif(q.job_details->>'title', ''), q.accepted_at
    from public.quotes q
   where q.user_id in (select public.my_employer_scope())
     and public.is_employer_account(q.user_id)
     and q.deleted_at is null
     and not coalesce(q.invoice_raised, false)
     and coalesce(q.settings->>'convertedInvoiceId', '') = ''
     and coalesce(q.is_active_version, true)
     and (q.acceptance_status in ('accepted', 'accepted_pending_deposit'))
     and q.accepted_at > now() - interval '60 days'
     and (q.employer_job_id is null
          or not exists (select 1 from public.employer_jobs j where j.id = q.employer_job_id and j.archived_at is null))
   order by q.accepted_at desc
   limit 20;
$$;
revoke all on function public.get_won_quotes_without_job() from public, anon;
grant execute on function public.get_won_quotes_without_job() to authenticated;
