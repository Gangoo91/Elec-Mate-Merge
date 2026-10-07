-- Review fixes for the 7 Oct evening work (ELE-1821, 1822, 1832, 1947).
--
--  1. HIGH: a "Start a certificate" tap linked EVERY certificate the person
--     finished in the next 14 days to that job, whatever its address. A start
--     now only counts for a certificate created after it, of the same type, at
--     the job's postcode (or with no postcode yet), and it is used up once
--     linked. link_my_certificate_to_job no longer writes a second start.
--  2. HIGH: "Book the next inspection" on a visit that a repeat schedule made
--     started a SECOND schedule (duplicate visits and invoices). set_job_recurring
--     now updates the schedule the job already belongs to. Renewals and the
--     Overview no longer offer a certificate whose job is already on a schedule.
--  3. Lead days are clamped to 0–60, the table's own check.
--  5. Office managers could read and change contract prices through the table
--     directly. Direct access is now owner/admins (my_employer_admin_scope);
--     managers use the firm-scoped RPCs, which hide the price.
--  7. "Change" on a paused schedule no longer quietly resumes it.
--  8. Moving a job's date clears "told the customer" too, so the office tells
--     them the new day (and the reminder is for the day they were told about).
--  +  The generator no longer books visits from an archived job.
--  +  A quote number never lands on one already used by a direct invoice when a
--     firm's quote and invoice prefixes match.

-- 1 ---------------------------------------------------------------------------
create or replace function public._auto_link_certificate(p_report uuid, p_firm uuid default null)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  r record;
  v_firms uuid[];
  v_pc text;
  v_day date;
  v_job uuid;
  v_start uuid;
  v_n int;
begin
  select id, user_id, report_type, installation_address, inspection_date, created_at, updated_at, deleted_at
    into r from public.reports where id = p_report;
  if r.id is null or r.deleted_at is not null or r.user_id is null then return null; end if;
  if exists (select 1 from public.employer_job_certificates where report_uuid = p_report) then return null; end if;

  select array_agg(distinct f) into v_firms from (
    select e.employer_id as f from public.employer_employees e
     where e.user_id = r.user_id and lower(coalesce(e.status, '')) <> 'archived'
    union select a.employer_id from public.employer_admins a where a.user_id = r.user_id and a.status = 'active'
    union select r.user_id where exists (select 1 from public.employer_jobs j0 where j0.user_id = r.user_id)
  ) x where f is not null and (p_firm is null or f = p_firm);
  if v_firms is null then return null; end if;

  v_pc := public._uk_postcode(r.installation_address);
  v_day := coalesce(r.inspection_date::date, r.updated_at::date, current_date);

  -- Started from the job: only a certificate made after the tap, of the type
  -- tapped, at that job's postcode (or with none yet). Used up once linked.
  select s.id, s.job_id into v_start, v_job
    from public.employer_cert_starts s join public.employer_jobs j on j.id = s.job_id
   where s.user_id = r.user_id and s.created_at > now() - interval '14 days'
     and s.created_at <= r.created_at + interval '5 minutes'
     and (s.report_type is null or lower(s.report_type) = lower(r.report_type))
     and (v_pc is null or public._uk_postcode(j.location) is null or public._uk_postcode(j.location) = v_pc)
     and j.user_id = any (v_firms) and j.archived_at is null
   order by s.created_at desc limit 1;

  if v_job is null and v_pc is not null then
    select count(*), (array_agg(j.id))[1] into v_n, v_job
      from public.employer_jobs j
     where j.user_id = any (v_firms)
       and j.archived_at is null and coalesce(j.is_template, false) = false
       and public._uk_postcode(j.location) = v_pc
       and v_day between coalesce(j.start_date, v_day) - 14 and coalesce(j.end_date, j.start_date, v_day) + 30
       and (j.user_id = r.user_id
            or exists (select 1 from public.employer_admins a where a.employer_id = j.user_id and a.user_id = r.user_id and a.status = 'active')
            or exists (select 1 from public.employer_job_assignments a
                         join public.employer_employees e on e.id = a.employee_id
                        where a.job_id = j.id and e.user_id = r.user_id));
    if v_n <> 1 then v_job := null; end if;
  end if;
  if v_job is null then return null; end if;

  insert into public.employer_job_certificates (employer_id, job_id, report_uuid, linked_by)
  select j.user_id, j.id, p_report, null from public.employer_jobs j where j.id = v_job
  on conflict (report_uuid) do nothing;
  if v_start is not null then delete from public.employer_cert_starts where id = v_start; end if;
  return v_job;
exception when others then
  raise warning '[_auto_link_certificate] %: %', p_report, sqlerrm;
  return null;
end;
$function$;
revoke all on function public._auto_link_certificate(uuid,uuid) from public, anon, authenticated;

create or replace function public.link_my_certificate_to_job(p_report_ref text, p_job uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_report uuid;
  v_type text;
  v_firm uuid;
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  select r.id, r.report_type into v_report, v_type from public.reports r
   where r.report_id = p_report_ref and r.user_id = auth.uid() and r.deleted_at is null;
  if v_report is null then raise exception 'Certificate not found'; end if;
  select j.user_id into v_firm from public.employer_jobs j where j.id = p_job and j.archived_at is null;
  if v_firm is null
     or not (public.is_assigned_to_job(p_job) or v_firm in (select public.my_employer_scope()))
     or not public._firm_team_has_user(v_firm, auth.uid()) then
    raise exception 'Job not found';
  end if;
  insert into public.employer_job_certificates (employer_id, job_id, report_uuid, linked_by)
  values (v_firm, p_job, v_report, auth.uid())
  on conflict (report_uuid) do nothing;
  -- The start that led here is used up: it must not claim a later certificate.
  delete from public.employer_cert_starts s
   where s.id = (select s2.id from public.employer_cert_starts s2
                  where s2.user_id = auth.uid() and s2.job_id = p_job
                    and (s2.report_type is null or lower(s2.report_type) = lower(v_type))
                  order by s2.created_at desc limit 1);
end;
$function$;
revoke all on function public.link_my_certificate_to_job(text,uuid) from public, anon;
grant execute on function public.link_my_certificate_to_job(text,uuid) to authenticated;

-- 2 + 3 + 7 -------------------------------------------------------------------
create or replace function public.set_job_recurring(
  p_job uuid, p_frequency text, p_next_due date, p_custom_days integer default null,
  p_lead_days integer default 14, p_end_date date default null, p_same_crew boolean default true,
  p_title text default null, p_auto_invoice boolean default false, p_amount numeric default null)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_job record;
  v_id uuid;
  v_money boolean;
  v_lead int := greatest(0, least(coalesce(p_lead_days, 14), 60));
begin
  select * into v_job from public.employer_jobs where id = p_job;
  if v_job.id is null or v_job.user_id not in (select public.my_employer_scope()) then
    raise exception 'Job not found';
  end if;
  if p_frequency not in ('weekly','monthly','quarterly','six_monthly','annually','two_yearly','three_yearly','five_yearly','custom') then
    raise exception 'Pick how often it repeats';
  end if;
  if p_frequency = 'custom' and coalesce(p_custom_days, 0) < 1 then
    raise exception 'Enter how many days between visits';
  end if;
  if p_next_due is null or p_next_due < (now() at time zone 'Europe/London')::date then
    raise exception 'The next visit must be today or later';
  end if;
  if p_end_date is not null and p_end_date < p_next_due then
    raise exception 'The end date is before the next visit';
  end if;
  v_money := public.can_see_firm_money(v_job.user_id);

  -- The schedule this job already belongs to: as its source, or as a visit it
  -- booked. Never start a second one for the same work.
  select id into v_id from public.maintenance_contracts
   where status <> 'ended'
     and (source_job_id = p_job or id = v_job.recurring_contract_id)
   order by (source_job_id = p_job) desc limit 1;

  if v_id is null then
    insert into public.maintenance_contracts (
      user_id, customer_id, customer_name, job_type, description, frequency, frequency_custom_days,
      start_date, end_date, next_due_date, reminder_days_before, auto_create_invoice,
      default_invoice_amount, auto_email_customer, client_type, status, source_job_id, same_crew)
    values (
      v_job.user_id, v_job.customer_id, coalesce(v_job.client, 'Client'),
      coalesce(nullif(btrim(p_title), ''), v_job.title), v_job.description,
      p_frequency, case when p_frequency = 'custom' then p_custom_days end,
      p_next_due, p_end_date, p_next_due, v_lead,
      case when v_money then coalesce(p_auto_invoice, false) else false end,
      case when v_money then p_amount end,
      false, 'business', 'active', p_job, coalesce(p_same_crew, true))
    returning id into v_id;
    update public.employer_jobs set recurring_contract_id = v_id where id = p_job;
  else
    -- Status is left alone: changing a paused schedule doesn't resume it.
    update public.maintenance_contracts set
      job_type = coalesce(nullif(btrim(p_title), ''), job_type),
      frequency = p_frequency,
      frequency_custom_days = case when p_frequency = 'custom' then p_custom_days end,
      next_due_date = p_next_due,
      end_date = p_end_date,
      reminder_days_before = v_lead,
      same_crew = coalesce(p_same_crew, true),
      auto_create_invoice = case when v_money then coalesce(p_auto_invoice, false) else auto_create_invoice end,
      default_invoice_amount = case when v_money then p_amount else default_invoice_amount end,
      updated_at = now()
    where id = v_id;
    update public.employer_jobs set recurring_contract_id = v_id
     where id = p_job and recurring_contract_id is null;
  end if;
  return v_id;
end;
$function$;
revoke all on function public.set_job_recurring(uuid,text,date,integer,integer,date,boolean,text,boolean,numeric) from public, anon;
grant execute on function public.set_job_recurring(uuid,text,date,integer,integer,date,boolean,text,boolean,numeric) to authenticated;

-- Renewals: a certificate whose job is on a live schedule is already covered.
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.get_firm_renewals(uuid,integer)'::regprocedure);
  if position('covered by a schedule' in v_def) = 0 then
    v_def := replace(v_def,
      $q$       where c.reminder_status = 'pending'$q$,
      $q$       where c.reminder_status = 'pending'
         -- covered by a schedule: its job (or the job it was made on) repeats
         and not exists (select 1 from public.employer_job_certificates l
                           join public.employer_jobs jj on jj.id = l.job_id
                           join public.maintenance_contracts mc on mc.id = jj.recurring_contract_id
                          where l.report_uuid = r.id and mc.status <> 'ended')$q$);
    if position('covered by a schedule' in v_def) = 0 then raise exception 'get_firm_renewals not patched'; end if;
    execute v_def;
  end if;
end $$;

-- 5 ---------------------------------------------------------------------------
drop policy if exists "Firm managers manage maintenance_contracts" on public.maintenance_contracts;
create policy "Firm owner and admins manage maintenance_contracts" on public.maintenance_contracts
  for all to authenticated
  using (user_id in (select public.my_employer_admin_scope()))
  with check (user_id in (select public.my_employer_admin_scope()));

-- 8 ---------------------------------------------------------------------------
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.sync_firm_job_calendar(uuid)'::regprocedure);
  if position('confirmation_sent_at = case' in v_def) = 0 then
    v_def := replace(v_def,
      'customer_reminder_sent_at = case when e.start_at is distinct from v_start then null else e.customer_reminder_sent_at end,',
      'customer_reminder_sent_at = case when e.start_at is distinct from v_start then null else e.customer_reminder_sent_at end,
           confirmation_sent_at = case when e.start_at is distinct from v_start then null else e.confirmation_sent_at end,
           confirmation_sent_to = case when e.start_at is distinct from v_start then null else e.confirmation_sent_to end,
           customer_reminder_opt_in = case when e.start_at is distinct from v_start then false else e.customer_reminder_opt_in end,');
    if position('confirmation_sent_at = case' in v_def) = 0 then raise exception 'sync_firm_job_calendar not patched'; end if;
    execute v_def;
  end if;
end $$;

-- + generator skips archived source jobs ---------------------------------------
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.generate_maintenance_contract_visits()'::regprocedure);
  if position('sj.archived_at is not null' in v_def) = 0 then
    v_def := replace(v_def,
      $q$    where mc.status = 'active'
      and mc.next_due_date <= current_date + mc.reminder_days_before$q$,
      $q$    where mc.status = 'active'
      and mc.next_due_date <= current_date + mc.reminder_days_before
      and not exists (select 1 from public.employer_jobs sj
                       where sj.id = mc.source_job_id and sj.archived_at is not null)$q$);
    if position('sj.archived_at is not null' in v_def) = 0 then raise exception 'generator not patched'; end if;
    execute v_def;
  end if;
end $$;

-- + quote numbers never collide with a direct invoice's number ---------------------
create or replace function public.assign_document_numbers()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_try int := 0;
begin
  if NEW.user_id is null then
    return NEW;
  end if;

  if NEW.invoice_raised is true
     and (NEW.invoice_number is null or NEW.invoice_number = '' or NEW.invoice_number = 'Invoice/TEMP')
  then
    NEW.invoice_number := public.format_document_number(
      NEW.user_id, 'invoice', public.next_document_number_for(NEW.user_id, 'invoice')
    );
  end if;

  if NEW.quote_number is null or NEW.quote_number = '' then
    if tg_op = 'INSERT' and NEW.invoice_raised is true and coalesce(NEW.invoice_number, '') <> ''
       and not exists (select 1 from public.quotes x
                        where x.user_id = NEW.user_id and x.quote_number = NEW.invoice_number) then
      NEW.quote_number := NEW.invoice_number;
    else
      -- Skip a number a direct invoice already holds (only possible when a
      -- firm's quote and invoice prefixes are the same).
      loop
        NEW.quote_number := public.format_document_number(
          NEW.user_id, 'quote', public.next_document_number_for(NEW.user_id, 'quote')
        );
        exit when v_try >= 50 or not exists (
          select 1 from public.quotes x where x.user_id = NEW.user_id and x.quote_number = NEW.quote_number);
        v_try := v_try + 1;
      end loop;
    end if;
  end if;

  return NEW;
end;
$function$;

-- 8b. A WhatsApp/text booking message is recorded on the job's diary entry too,
--     so "told the customer" clears when the date moves, whatever the channel.
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.log_customer_contact(uuid,text,text,text)'::regprocedure);
  if position('confirmation_sent_at = now()' in v_def) = 0 then
    v_def := replace(v_def,
      $q$  returning id into v_id;
  return v_id;$q$,
      $q$  returning id into v_id;
  if p_kind = 'confirmation' then
    update public.calendar_events
       set confirmation_sent_at = now(),
           confirmation_sent_to = case lower(coalesce(p_channel, ''))
             when 'whatsapp' then 'WhatsApp' when 'sms' then 'text' when 'copy' then 'copied message'
             else coalesce(confirmation_sent_to, p_channel) end
     where user_id = j.user_id and mirrored_from_job = j.id;
  end if;
  return v_id;$q$);
    if position('confirmation_sent_at = now()' in v_def) = 0 then raise exception 'log_customer_contact not patched'; end if;
    execute v_def;
  end if;
end $$;

-- Advisor tidy: fixed search_path on the postcode helper; trigger functions
-- are not callable as RPCs.
alter function public._uk_postcode(text) set search_path = public;
revoke all on function public.trg_auto_link_certificate() from public, anon, authenticated;
revoke all on function public.trg_cert_signed_off_on_job() from public, anon, authenticated;
