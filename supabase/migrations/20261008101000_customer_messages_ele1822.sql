-- ELE-1822 — Customer messages from the firm's jobs.
--
-- Reuses the Electrical Hub's hand-off model (TellCustomerSheet: WhatsApp /
-- text / email / copy, nothing sends itself except the branded email) and its
-- evening-before reminder (send-booking-reminders, crons 176/177), wired to
-- employer_jobs through the job's mirrored calendar entry (ELE-1820).
--
--  1. sync_firm_job_calendar no longer forces customer_reminder_opt_in off on
--     every job edit (it silently cancelled a reminder the office asked for),
--     and clears customer_reminder_sent_at when the job's date moves, so the
--     customer is reminded about the NEW day.
--  2. get_firm_job_message: everything the office's "Tell the customer" needs
--     for one job, firm-scoped.
--  3. log_customer_contact: every confirmation, "On my way", reminder and
--     review request lands on the job as a `customer_contact` comment, so the
--     office sees it happened (hand-offs leave the phone; this is the record).
--  4. get_customer_contact_log: the same history on the client record.
--  5. get_job_last_visit reads only diary notes, never these contact logs.

-- 1 -------------------------------------------------------------------------
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.sync_firm_job_calendar(uuid)'::regprocedure);
  if position('customer_reminder_sent_at = case' in v_def) = 0 then
    v_def := replace(v_def,
      'all_day = true, reminder_minutes = 0, customer_reminder_opt_in = false,',
      'all_day = true, reminder_minutes = 0,
           customer_reminder_sent_at = case when e.start_at is distinct from v_start then null else e.customer_reminder_sent_at end,');
    if position('customer_reminder_sent_at = case' in v_def) = 0 then
      raise exception 'sync_firm_job_calendar not patched';
    end if;
    execute v_def;
  end if;
end $$;

-- 2 -------------------------------------------------------------------------
create or replace function public.get_firm_job_message(p_job uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  j public.employer_jobs;
  e public.calendar_events;
  v_company record;
  v_name text;
begin
  select * into j from public.employer_jobs where id = p_job;
  if j.id is null or j.user_id not in (select public.my_employer_scope()) then
    raise exception 'Job not found';
  end if;
  select * into e from public.calendar_events
   where user_id = j.user_id and mirrored_from_job = j.id and coalesce(sync_status, '') <> 'pending_delete'
   limit 1;
  select company_name, review_request_enabled, review_links, review_request_message
    into v_company from public.company_profiles where user_id = j.user_id limit 1;
  select full_name into v_name from public.profiles where id = j.user_id;

  return jsonb_build_object(
    'job_id', j.id,
    'firm_id', j.user_id,
    'title', j.title,
    'client', j.client,
    'client_email', nullif(btrim(coalesce(j.client_email, '')), ''),
    'client_phone', nullif(btrim(coalesce(j.client_phone, '')), ''),
    'customer_id', j.customer_id,
    'location', j.location,
    'start_date', j.start_date,
    'end_date', j.end_date,
    'board_stage', j.board_stage,
    'status', j.status,
    'business_name', coalesce(nullif(btrim(v_company.company_name), ''), v_name),
    'crew', (select coalesce(jsonb_agg(x.first order by x.first), '[]'::jsonb) from (
               select distinct split_part(btrim(regexp_replace(coalesce(p.name, ''), '\(.*?\)', '', 'g')), ' ', 1) as first
                 from public.employer_job_assignments a
                 join public.employer_employees p on p.id = a.employee_id
                where a.job_id = j.id
                  and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended')
                  and lower(coalesce(p.status, '')) <> 'archived') x
             where x.first <> ''),
    'event', case when e.id is null then null else jsonb_build_object(
               'id', e.id, 'start_at', e.start_at, 'end_at', e.end_at, 'all_day', e.all_day,
               'confirmation_sent_at', e.confirmation_sent_at, 'confirmation_sent_to', e.confirmation_sent_to,
               'reminder_opt_in', e.customer_reminder_opt_in, 'reminder_sent_at', e.customer_reminder_sent_at) end,
    'review', jsonb_build_object(
               'enabled', coalesce(v_company.review_request_enabled, false),
               'links', coalesce(to_jsonb(v_company.review_links), '[]'::jsonb),
               'message', v_company.review_request_message),
    'log', (select coalesce(jsonb_agg(jsonb_build_object('at', c.created_at, 'who', c.author_name, 'text', c.content)
                    order by c.created_at desc), '[]'::jsonb)
              from (select * from public.employer_job_comments c
                     where c.job_id = j.id and c.comment_type = 'customer_contact'
                     order by c.created_at desc limit 12) c));
end;
$function$;
revoke all on function public.get_firm_job_message(uuid) from public, anon;
grant execute on function public.get_firm_job_message(uuid) to authenticated;

-- 3 -------------------------------------------------------------------------
create or replace function public.log_customer_contact(
  p_job uuid, p_kind text, p_channel text default null, p_text text default null)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  j public.employer_jobs;
  v_id uuid;
  v_emp uuid;
  v_who text;
  v_line text;
begin
  select * into j from public.employer_jobs where id = p_job;
  if j.id is null then raise exception 'Job not found'; end if;
  if not (j.user_id in (select public.my_employer_scope()) or public.is_assigned_to_job(p_job)) then
    raise exception 'Job not found';
  end if;
  if p_kind not in ('confirmation', 'on_my_way', 'reminder', 'review', 'message') then
    raise exception 'Unknown message kind';
  end if;

  select e.id, e.name into v_emp, v_who from public.employer_employees e
   where e.employer_id = j.user_id and e.user_id = auth.uid() and lower(coalesce(e.status, '')) <> 'archived'
   limit 1;
  if v_who is null then
    select coalesce(a.full_name, p.full_name) into v_who
      from public.profiles p
      left join public.employer_admins a on a.user_id = p.id and a.employer_id = j.user_id and a.status = 'active'
     where p.id = auth.uid();
  end if;

  v_line := case p_kind
    when 'confirmation' then 'Told the customer about the booking'
    when 'on_my_way' then 'Told the customer they are on the way'
    when 'reminder' then 'Reminded the customer'
    when 'review' then 'Asked the customer for a review'
    else 'Messaged the customer' end
    || case lower(coalesce(p_channel, ''))
         when 'whatsapp' then ' by WhatsApp'
         when 'sms' then ' by text'
         when 'email' then ' by email'
         when 'copy' then ' (message copied)'
         else '' end
    || coalesce('. ' || nullif(btrim(left(p_text, 300)), ''), '');

  insert into public.employer_job_comments (job_id, author_name, author_user_id, author_employee_id, content, comment_type)
  values (p_job, coalesce(v_who, 'Office'), auth.uid(), v_emp, v_line, 'customer_contact')
  returning id into v_id;
  return v_id;
end;
$function$;
revoke all on function public.log_customer_contact(uuid,text,text,text) from public, anon;
grant execute on function public.log_customer_contact(uuid,text,text,text) to authenticated;

-- 4 -------------------------------------------------------------------------
create or replace function public.get_customer_contact_log(p_customer uuid, p_firm uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
begin
  if p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed';
  end if;
  return coalesce((
    select jsonb_agg(jsonb_build_object('at', c.created_at, 'who', c.author_name, 'text', c.content,
                                        'job_id', j.id, 'job', j.title) order by c.created_at desc)
      from (select c.* from public.employer_job_comments c
              join public.employer_jobs j on j.id = c.job_id
             where j.user_id = p_firm and j.customer_id = p_customer and c.comment_type = 'customer_contact'
             order by c.created_at desc limit 30) c
      join public.employer_jobs j on j.id = c.job_id), '[]'::jsonb);
end;
$function$;
revoke all on function public.get_customer_contact_log(uuid,uuid) from public, anon;
grant execute on function public.get_customer_contact_log(uuid,uuid) to authenticated;

-- 5 -------------------------------------------------------------------------
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.get_job_last_visit(uuid)'::regprocedure);
  if position('cm.comment_type' in v_def) = 0 then
    v_def := replace(v_def,
      'where cm.job_id = v_prev.id and nullif(btrim(cm.content), '''') is not null',
      'where cm.job_id = v_prev.id and cm.task_id is null
                     and coalesce(cm.comment_type, ''comment'') in (''progress'', ''comment'')
                     and nullif(btrim(cm.content), '''') is not null');
    if position('cm.comment_type' in v_def) = 0 then raise exception 'get_job_last_visit not patched'; end if;
    execute v_def;
  end if;
end $$;

-- 6. "On my way": who is sending and for which firm, for a job the caller is on.
create or replace function public.get_on_my_way(p_job uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  j public.employer_jobs;
  v_me text;
  v_business text;
begin
  select * into j from public.employer_jobs where id = p_job;
  if j.id is null or not (public.is_assigned_to_job(p_job) or j.user_id in (select public.my_employer_scope())) then
    return null;
  end if;
  select split_part(btrim(regexp_replace(coalesce(e.name, ''), '\(.*?\)', '', 'g')), ' ', 1) into v_me
    from public.employer_employees e
   where e.employer_id = j.user_id and e.user_id = auth.uid() limit 1;
  if coalesce(v_me, '') = '' then
    select split_part(btrim(coalesce(full_name, '')), ' ', 1) into v_me from public.profiles where id = auth.uid();
  end if;
  select coalesce(nullif(btrim(c.company_name), ''), p.full_name) into v_business
    from public.profiles p left join public.company_profiles c on c.user_id = p.id
   where p.id = j.user_id;
  return jsonb_build_object('me', nullif(v_me, ''), 'business', v_business, 'destination', j.location);
end;
$function$;
revoke all on function public.get_on_my_way(uuid) from public, anon;
grant execute on function public.get_on_my_way(uuid) to authenticated;
