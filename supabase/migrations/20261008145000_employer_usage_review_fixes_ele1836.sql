-- ELE-1836 review fixes (4/4).
--
-- 1. The usage triggers fired their plpgsql function (and its exception
--    subtransaction) on every matching UPDATE, even when nothing the funnel
--    counts had changed. supabase-js updates send whole rows, so on quotes and
--    timesheets that was most saves. Each trigger now carries a WHEN clause, so
--    the function only runs when a step really happened. INSERT and UPDATE are
--    split (a WHEN cannot reference OLD on INSERT): eu_usage_ins / eu_usage.
-- 2. Invoices: only rows that are invoices (invoice_raised) count; the email's
--    "invoiced", "paid in" and "overdue" ignore deleted invoices. Before this,
--    deleted invoices still left "overdue" set would have told a firm it had
--    invoices overdue that it had already binned.
-- 3. The email goes out on Sunday evening and calls the coming week "this
--    week", so the all-days-empty fix line says "this week's jobs" too.

create or replace function public.trg_eu_invoices()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_was boolean;
  v_sent boolean;
  v_link boolean;
  v_paid boolean;
  v_firm uuid;
begin
  if new.invoice_raised is not true then return null; end if;
  -- A quote converted into an invoice counts from the moment it became one.
  v_was := tg_op = 'UPDATE' and old.invoice_raised is true;
  v_sent := new.invoice_sent_at is not null and (not v_was or old.invoice_sent_at is null);
  v_link := nullif(new.stripe_payment_link_url, '') is not null
            and (not v_was or nullif(old.stripe_payment_link_url, '') is null);
  v_paid := new.invoice_status = 'paid' and (not v_was or old.invoice_status is distinct from 'paid');
  if not (v_sent or v_link or v_paid) then return null; end if;

  v_firm := public._eu_office_firm(new.user_id);
  if v_firm is null and new.employer_job_id is not null then
    select j.user_id into v_firm from public.employer_jobs j where j.id = new.employer_job_id;
  end if;
  if v_firm is null then return null; end if;

  if v_sent then perform public._eu_log(v_firm, 'invoice_sent', new.id); end if;
  if v_link then perform public._eu_log(v_firm, 'invoice_pay_link', new.id); end if;
  if v_paid then perform public._eu_log(v_firm, 'invoice_paid', new.id); end if;
  return null;
exception when others then
  raise warning '[trg_eu_invoices] %', sqlerrm; return null;
end; $$;
revoke all on function public.trg_eu_invoices() from public, anon, authenticated;

-- ─── re-create every trigger with a WHEN guard ───────────────────────────
drop trigger if exists eu_usage on public.employer_team_invites;
drop trigger if exists eu_usage_ins on public.employer_team_invites;
create trigger eu_usage_ins after insert on public.employer_team_invites
  for each row execute function public.trg_eu_team_invites();
create trigger eu_usage after update of status, accepted_at on public.employer_team_invites
  for each row when (new.accepted_at is distinct from old.accepted_at or new.status is distinct from old.status)
  execute function public.trg_eu_team_invites();

drop trigger if exists eu_usage on public.employer_employees;
create trigger eu_usage after update of claimed_at on public.employer_employees
  for each row when (old.claimed_at is null and new.claimed_at is not null)
  execute function public.trg_eu_employees();

drop trigger if exists eu_usage on public.employer_jobs;
drop trigger if exists eu_usage_ins on public.employer_jobs;
create trigger eu_usage_ins after insert on public.employer_jobs
  for each row when (new.is_template is not true)
  execute function public.trg_eu_jobs();
create trigger eu_usage after update of start_date, end_date on public.employer_jobs
  for each row when (old.start_date is not null
                     and (new.start_date, new.end_date) is distinct from (old.start_date, old.end_date))
  execute function public.trg_eu_jobs();

drop trigger if exists eu_usage on public.employer_dispatch_changes;
create trigger eu_usage after insert on public.employer_dispatch_changes
  for each row when (new.kind in ('assigned', 'moved'))
  execute function public.trg_eu_dispatch();

drop trigger if exists eu_usage on public.employer_timesheets;
drop trigger if exists eu_usage_ins on public.employer_timesheets;
create trigger eu_usage_ins after insert on public.employer_timesheets
  for each row when (new.total_hours is not null)
  execute function public.trg_eu_timesheets();
create trigger eu_usage after update of status, total_hours on public.employer_timesheets
  for each row when (new.status is distinct from old.status or new.total_hours is distinct from old.total_hours)
  execute function public.trg_eu_timesheets();

drop trigger if exists eu_usage on public.employer_expense_claims;
drop trigger if exists eu_usage_ins on public.employer_expense_claims;
create trigger eu_usage_ins after insert on public.employer_expense_claims
  for each row execute function public.trg_eu_expenses();
create trigger eu_usage after update of status on public.employer_expense_claims
  for each row when (new.status is distinct from old.status)
  execute function public.trg_eu_expenses();

drop trigger if exists eu_usage on public.job_issues;
drop trigger if exists eu_usage_ins on public.job_issues;
create trigger eu_usage_ins after insert on public.job_issues
  for each row execute function public.trg_eu_snags();
create trigger eu_usage after update of status on public.job_issues
  for each row when (new.status is distinct from old.status)
  execute function public.trg_eu_snags();

drop trigger if exists eu_usage on public.employer_job_packs;
drop trigger if exists eu_usage_ins on public.employer_job_packs;
create trigger eu_usage_ins after insert on public.employer_job_packs
  for each row when (new.sent_to_workers_at is not null)
  execute function public.trg_eu_packs();
create trigger eu_usage after update of sent_to_workers_at on public.employer_job_packs
  for each row when (old.sent_to_workers_at is null and new.sent_to_workers_at is not null)
  execute function public.trg_eu_packs();

drop trigger if exists eu_usage on public.employer_job_pack_acknowledgements;
drop trigger if exists eu_usage_ins on public.employer_job_pack_acknowledgements;
create trigger eu_usage_ins after insert on public.employer_job_pack_acknowledgements
  for each row when (new.acknowledged_at is not null)
  execute function public.trg_eu_pack_acks();
create trigger eu_usage after update of acknowledged_at on public.employer_job_pack_acknowledgements
  for each row when (old.acknowledged_at is null and new.acknowledged_at is not null)
  execute function public.trg_eu_pack_acks();

drop trigger if exists eu_usage on public.briefings;
drop trigger if exists eu_usage_ins on public.briefings;
create trigger eu_usage_ins after insert on public.briefings
  for each row when (lower(coalesce(new.status, '')) <> 'draft')
  execute function public.trg_eu_briefings();
create trigger eu_usage after update of status on public.briefings
  for each row when (new.status is distinct from old.status)
  execute function public.trg_eu_briefings();

drop trigger if exists eu_usage on public.briefing_attendees;
drop trigger if exists eu_usage_ins on public.briefing_attendees;
create trigger eu_usage_ins after insert on public.briefing_attendees
  for each row when (new.acknowledged is true)
  execute function public.trg_eu_briefing_signed();
create trigger eu_usage after update of acknowledged on public.briefing_attendees
  for each row when (new.acknowledged is true and old.acknowledged is not true)
  execute function public.trg_eu_briefing_signed();

drop trigger if exists eu_usage on public.college_otj_entries;
create trigger eu_usage after update of verification_status on public.college_otj_entries
  for each row when (new.verification_status is distinct from old.verification_status
                     and new.verification_status in ('verified_by_employer', 'rejected'))
  execute function public.trg_eu_otj_attest();

drop trigger if exists eu_usage on public.quotes;
drop trigger if exists eu_usage_ins on public.quotes;
create trigger eu_usage_ins after insert on public.quotes
  for each row when (new.invoice_raised is true
                     and (new.invoice_sent_at is not null
                          or nullif(new.stripe_payment_link_url, '') is not null
                          or new.invoice_status = 'paid'))
  execute function public.trg_eu_invoices();
create trigger eu_usage after update of invoice_raised, invoice_sent_at, stripe_payment_link_url, invoice_status on public.quotes
  for each row when (new.invoice_raised is true
                     and (new.invoice_raised is distinct from old.invoice_raised
                          or new.invoice_sent_at is distinct from old.invoice_sent_at
                          or new.stripe_payment_link_url is distinct from old.stripe_payment_link_url
                          or new.invoice_status is distinct from old.invoice_status))
  execute function public.trg_eu_invoices();

drop trigger if exists eu_usage on public.employer_job_checklist_items;
create trigger eu_usage after update of is_completed on public.employer_job_checklist_items
  for each row when (new.is_completed is true and old.is_completed is not true)
  execute function public.trg_eu_checklist();

-- ─── the email's numbers: invoices only, never deleted ones ──────────────
create or replace function public._employer_weekly_digest(p_firm uuid, p_sunday date)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_from date := p_sunday - 6;
  v_to date := p_sunday;
  v_next_from date := p_sunday + 1;
  v_next_to date := p_sunday + 7;
  v_office uuid[];
  v_jobs int; v_hours numeric; v_invoiced numeric; v_paid numeric; v_snags int;
  v_booked int; v_ts_wait int; v_unpaid int; v_unpaid_sum numeric;
  v_events int; v_empty text[]; v_attest jsonb; v_fix jsonb;
  v_name text;
  v_roster int;
begin
  select array_agg(x) into v_office from (
    select p_firm x
    union select a.user_id from public.employer_admins a
     where a.employer_id = p_firm and a.status = 'active' and a.user_id is not null) o;

  select coalesce(nullif(btrim(c.company_name), ''), 'your firm') into v_name
    from public.company_profiles c where c.user_id = p_firm limit 1;

  select count(*) into v_roster from public.employer_employees e
   where e.employer_id = p_firm and lower(coalesce(e.status, '')) = 'active'
     and e.user_id is distinct from p_firm;

  select count(*) into v_events from public.employer_usage_events e
   where e.employer_id = p_firm and e.actor_role <> 'backfill'
     and e.created_at >= (v_from::timestamp at time zone 'Europe/London')
     and e.created_at < ((v_to + 1)::timestamp at time zone 'Europe/London');

  select count(distinct job_id) into v_jobs from (
    select t.job_id from public.employer_timesheets t
      join public.employer_employees e on e.id = t.employee_id
     where e.employer_id = p_firm and t.job_id is not null and t.date between v_from and v_to
    union
    select a.job_id from public.employer_job_assignments a
      join public.employer_jobs j on j.id = a.job_id
     where j.user_id = p_firm and a.start_date is not null
       and a.start_date <= v_to and coalesce(a.end_date, a.start_date) >= v_from
    union
    select j.id from public.employer_jobs j
     where j.user_id = p_firm and j.completed_at is not null
       and (j.completed_at at time zone 'Europe/London')::date between v_from and v_to
  ) w;

  select coalesce(sum(t.total_hours), 0) into v_hours
    from public.employer_timesheets t join public.employer_employees e on e.id = t.employee_id
   where e.employer_id = p_firm and lower(coalesce(t.status, '')) = 'approved'
     and t.date between v_from and v_to;

  select coalesce(sum(q.total), 0) into v_invoiced from public.quotes q
   where q.user_id = any (v_office) and q.invoice_raised is true and q.deleted_at is null
     and q.invoice_sent_at is not null
     and (q.invoice_sent_at at time zone 'Europe/London')::date between v_from and v_to;

  select coalesce(sum(coalesce(nullif(q.total_paid, 0), q.total)), 0) into v_paid from public.quotes q
   where q.user_id = any (v_office) and q.invoice_raised is true and q.deleted_at is null
     and q.invoice_status = 'paid' and q.invoice_paid_at is not null
     and (q.invoice_paid_at at time zone 'Europe/London')::date between v_from and v_to;

  select count(*) into v_snags from public.job_issues s join public.employer_jobs j on j.id = s.job_id
   where j.user_id = p_firm
     and lower(coalesce(s.status, '')) not in ('resolved', 'closed', 'done', 'fixed', 'cancelled');

  select count(distinct j.id) into v_booked from public.employer_jobs j
   where j.user_id = p_firm and j.archived_at is null and coalesce(j.is_template, false) = false
     and lower(coalesce(j.status, '')) not in ('cancelled', 'completed', 'complete')
     and (
       (j.start_date between v_next_from and v_next_to)
       or exists (select 1 from public.employer_job_assignments a
                   where a.job_id = j.id and a.start_date is not null
                     and a.start_date <= v_next_to and coalesce(a.end_date, a.start_date) >= v_next_from)
     );

  -- Weekdays next week with nobody on any job (only worth saying when work is booked).
  if v_booked > 0 then
    select array_agg(to_char(d, 'FMDay') order by d) into v_empty
      from generate_series(v_next_from, v_next_from + 4, interval '1 day') d
     where not exists (
       select 1 from public.employer_job_assignments a join public.employer_jobs j on j.id = a.job_id
        where j.user_id = p_firm and a.start_date is not null
          and a.start_date <= d::date and coalesce(a.end_date, a.start_date) >= d::date);
  end if;

  select count(*) into v_ts_wait from public.employer_timesheets t
    join public.employer_employees e on e.id = t.employee_id
   where e.employer_id = p_firm and lower(coalesce(t.status, '')) in ('pending', 'submitted')
     and t.total_hours is not null;

  select count(*), coalesce(sum(greatest(q.total - coalesce(q.total_paid, 0), 0)), 0)
    into v_unpaid, v_unpaid_sum
    from public.quotes q
   where q.user_id = any (v_office) and q.invoice_raised is true and q.deleted_at is null
     and q.invoice_status in ('sent', 'overdue')
     and q.invoice_due_date is not null and q.invoice_due_date < (p_sunday::timestamp at time zone 'Europe/London');

  -- Apprentice hours the firm signed off last week (names: the boss's own team).
  select coalesce(jsonb_agg(jsonb_build_object('name', x.name, 'hours', x.hours) order by x.hours desc), '[]'::jsonb)
    into v_attest
    from (
      select split_part(coalesce(nullif(btrim(e.name), ''), 'Apprentice'), ' ', 1) name,
             round(sum(o.duration_minutes)::numeric / 60, 1) hours
        from public.college_otj_entries o
        join public.employer_employees e on e.user_id = o.student_id and e.employer_id = p_firm
       where o.verification_status = 'verified_by_employer' and o.verified_at is not null
         and (o.verified_at at time zone 'Europe/London')::date between v_from and v_to
       group by 1 order by 2 desc limit 3
    ) x;

  -- The one thing to fix, in the ticket's order.
  v_fix := case
    when coalesce(array_length(v_empty, 1), 0) = 5 then jsonb_build_object(
      'kind', 'unassigned_day',
      'text', 'Nobody is booked on this week''s jobs yet',
      'route', '/employer?section=diary')
    when coalesce(array_length(v_empty, 1), 0) between 1 and 4 then jsonb_build_object(
      'kind', 'unassigned_day',
      'text', case when array_length(v_empty, 1) = 1 then v_empty[1] || ' has nobody booked on a job'
                   else array_to_string(v_empty[1:array_length(v_empty, 1) - 1], ', ') || ' and '
                        || v_empty[array_length(v_empty, 1)] || ' have nobody booked on a job' end,
      'route', '/employer?section=diary')
    when v_ts_wait > 0 then jsonb_build_object(
      'kind', 'timesheets',
      'text', v_ts_wait || case when v_ts_wait = 1 then ' timesheet is' else ' timesheets are' end || ' waiting for you to approve',
      'route', '/employer?section=timesheets&tab=pending')
    when v_unpaid > 0 then jsonb_build_object(
      'kind', 'unpaid',
      'text', v_unpaid || case when v_unpaid = 1 then ' invoice is' else ' invoices are' end || ' overdue',
      'amount', v_unpaid_sum,
      'route', '/employer?section=quotes')
    else null end;

  return jsonb_build_object(
    'firm_name', v_name,
    'week_from', v_from, 'week_to', v_to,
    'next_from', v_next_from, 'next_to', v_next_to,
    'activity', v_events,
    'jobs', v_jobs,
    'hours_approved', v_hours,
    'invoiced', v_invoiced,
    'paid_in', v_paid,
    'snags_open', v_snags,
    'jobs_booked', v_booked,
    'empty_days', to_jsonb(coalesce(v_empty, '{}')),
    'timesheets_waiting', v_ts_wait,
    'unpaid_count', v_unpaid,
    'unpaid_sum', v_unpaid_sum,
    'attested', v_attest,
    'fix', v_fix,
    'roster', v_roster,
    'should_send', (v_roster > 0 and (v_events > 0 or v_booked > 0))
  );
end;
$$;
revoke all on function public._employer_weekly_digest(uuid, date) from public, anon, authenticated;
