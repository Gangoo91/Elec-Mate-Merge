-- Employer Hub Overview: everything the boss's home screen shows, in one
-- firm-scoped round trip (ELE-1939 / ELE-1819).
--
-- Firm = the acting employer (client passes getActingEmployerId(uid) ?? uid).
-- Guard: p_firm must be in my_employer_scope(). Role-aware: every money field
-- is null unless can_see_firm_money(p_firm) (owner / admin, never office).
-- Money comes from the shared finance model (finance_summary_core, the same
-- maths get_employer_pnl and get_finance_summary use), never a fresh sum.
-- Safety, RAMS and pack figures are read-only counts; Site Safety owns them.

create or replace function public.get_employer_home(p_firm uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $function$
declare
  v_today date := (now() at time zone 'Europe/London')::date;
  v_week_end date := v_today + 6;
  v_month_start date := date_trunc('month', (now() at time zone 'Europe/London'))::date;
  v_money boolean;
  v_role text;
  v_cp record;
  v_fin record;
  v_people jsonb;
  v_result jsonb;
begin
  if auth.uid() is null or p_firm is null
     or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;

  v_money := public.can_see_firm_money(p_firm);
  v_role := public.my_employer_role(p_firm);

  select cp.company_name, cp.logo_url, cp.logo_data_url, cp.stripe_account_status,
         cp.lead_page_slug, cp.lead_page_enabled, cp.insurance_expiry, cp.registration_expiry
    into v_cp
    from public.company_profiles cp
   where cp.user_id = p_firm
   limit 1;

  -- Office managers get an empty-owner call so the record is always assigned;
  -- nothing of the firm's money is computed for them.
  select * into v_fin
    from public.finance_summary_core(
           case when v_money then array[p_firm] else array[]::uuid[] end,
           v_month_start, v_today);

  -- Who is where today: one row per active roster member who is booked on a
  -- job, clocked in, or on approved leave. Leave wins over a booking.
  with roster as (
    select e.id, e.name, e.avatar_initials, e.photo_url, e.user_id
      from public.employer_employees e
     where e.employer_id = p_firm
       and lower(coalesce(e.status, 'active')) <> 'archived'
  ),
  asg as (
    select distinct on (a.employee_id)
           a.employee_id, j.id as job_id, j.title, j.location,
           to_char(a.start_time, 'HH24:MI') as start_time
      from public.employer_job_assignments a
      join public.employer_jobs j on j.id = a.job_id
     where j.user_id = p_firm
       and j.archived_at is null
       and coalesce(j.status, '') not in ('Cancelled', 'Completed')
       and lower(coalesce(a.status, '')) not in ('removed', 'cancelled', 'completed', 'ended')
       and a.start_date <= v_today
       and coalesce(a.end_date, j.end_date, a.start_date) >= v_today
     order by a.employee_id, a.start_time nulls last, j.title
  ),
  clk as (
    select distinct on (t.employee_id) t.employee_id, t.clock_in, t.job_id,
           (select j.title from public.employer_jobs j where j.id = t.job_id) as job_title
      from public.employer_timesheets t
      join roster r on r.id = t.employee_id
     where t.clock_out is null
       and (t.clock_in at time zone 'Europe/London')::date = v_today
     order by t.employee_id, t.clock_in desc
  ),
  lv as (
    select distinct on (l.employee_id) l.employee_id, l.type, l.half_day, l.end_date
      from public.employer_leave_requests l
      join roster r on r.id = l.employee_id
     where l.status = 'Approved'
       and l.start_date <= v_today and l.end_date >= v_today
     order by l.employee_id, l.start_date
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'employee_id', r.id,
           'name', r.name,
           'initials', r.avatar_initials,
           'photo_url', r.photo_url,
           'state', case when lv.employee_id is not null then 'leave'
                         when clk.employee_id is not null then 'clocked_in'
                         else 'booked' end,
           'job_id', coalesce(clk.job_id, asg.job_id),
           'job_title', coalesce(clk.job_title, asg.title),
           'location', asg.location,
           'postcode', substring(upper(coalesce(asg.location, ''))
                                 from '([A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2})'),
           'start_time', asg.start_time,
           'clocked_in_at', clk.clock_in,
           'leave_type', lv.type,
           'leave_half_day', lv.half_day,
           'leave_until', lv.end_date)
         order by case when lv.employee_id is not null then 2
                       when clk.employee_id is not null then 0 else 1 end,
                  lower(r.name)), '[]'::jsonb)
    into v_people
    from roster r
    left join asg on asg.employee_id = r.id
    left join clk on clk.employee_id = r.id
    left join lv on lv.employee_id = r.id
   where asg.employee_id is not null or clk.employee_id is not null or lv.employee_id is not null;

  with
  roster as (
    select e.* from public.employer_employees e
     where e.employer_id = p_firm
       and lower(coalesce(e.status, 'active')) <> 'archived'
  ),
  live_jobs as (
    select j.* from public.employer_jobs j
     where j.user_id = p_firm
       and j.archived_at is null
       and not coalesce(j.is_template, false)
       and coalesce(j.status, '') not in ('Cancelled', 'Completed')
  ),
  live_asg as (
    select a.*, coalesce(a.end_date, j.end_date, a.start_date) as until
      from public.employer_job_assignments a
      join live_jobs j on j.id = a.job_id
     where lower(coalesce(a.status, '')) not in ('removed', 'cancelled', 'completed', 'ended')
  ),
  jobs_today as (
    select j.* from live_jobs j
     where (j.start_date is not null and j.start_date <= v_today
            and coalesce(j.end_date, j.start_date) >= v_today)
        or exists (select 1 from live_asg a where a.job_id = j.id
                    and a.start_date <= v_today and a.until >= v_today)
  ),
  jobs_week as (
    select j.* from live_jobs j
     where (j.start_date is not null and j.start_date <= v_week_end
            and coalesce(j.end_date, j.start_date) >= v_today)
        or exists (select 1 from live_asg a where a.job_id = j.id
                    and a.start_date <= v_week_end and a.until >= v_today)
  ),
  unstaffed_today as (
    select j.* from jobs_today j
     where not exists (select 1 from live_asg a where a.job_id = j.id
                        and a.start_date <= v_today and a.until >= v_today)
  ),
  unstaffed_week as (
    select j.* from jobs_week j
     where not exists (select 1 from live_asg a where a.job_id = j.id
                        and a.start_date <= v_week_end and a.until >= v_today)
  ),
  ts_pending as (
    select t.* from public.employer_timesheets t
      join roster r on r.id = t.employee_id
     where lower(coalesce(t.status, '')) in ('pending', 'submitted')
       and t.clock_out is not null
  ),
  ts_stale as (
    select t.* from public.employer_timesheets t
      join roster r on r.id = t.employee_id
     where t.clock_out is null
       and (t.clock_in at time zone 'Europe/London')::date < v_today
  ),
  leave_pending as (
    select l.*, r.name as person from public.employer_leave_requests l
      join roster r on r.id = l.employee_id
     where lower(coalesce(l.status, '')) = 'pending'
  ),
  exp_pending as (
    select x.* from public.employer_expense_claims x
      join roster r on r.id = x.employee_id
     where lower(coalesce(x.status, '')) = 'pending'
  ),
  not_joined as (
    select r.* from roster r where r.user_id is null
  ),
  inc_open as (
    select i.* from public.employer_incidents i
     where i.employer_id = p_firm
       and lower(coalesce(i.status, '')) not in ('closed', 'resolved')
  ),
  inc_actions as (
    select i.id as incident_id, i.title, act
      from inc_open i
      cross join lateral jsonb_array_elements(
        case when jsonb_typeof(i.corrective_actions) = 'array' then i.corrective_actions else '[]'::jsonb end
      ) act
     where nullif(act ->> 'done_at', '') is null
  ),
  riddor as (
    select i.id, i.title,
           case when i.riddor_category = 'occupational_disease' then null
                else (coalesce(i.reported_at, i.created_at) at time zone 'Europe/London')::date
                     + case when i.riddor_category = 'over_7_day' then 15 else 10 end
           end as due
      from inc_open i
     where i.riddor_category is not null and i.riddor_category <> 'not_reportable'
       and i.riddor_reported_at is null
  ),
  site_actions as (
    select s.* from public.safety_corrective_actions s
     where s.user_id = p_firm
       and lower(coalesce(s.status, '')) not in ('completed', 'cancelled')
  ),
  packs_unsigned as (
    select p.id, p.title,
           (select count(*) from public.employer_job_pack_acknowledgements a
             where a.job_pack_id = p.id and a.acknowledged_at is null) as waiting
      from public.employer_job_packs p
     where p.employer_id = p_firm
       and p.sent_to_workers_at is not null
       and exists (select 1 from public.employer_job_pack_acknowledgements a
                    where a.job_pack_id = p.id and a.acknowledged_at is null)
  ),
  creds as (
    select e.id as employee_id, e.name, c.qualification_name, c.expiry_date
      from roster e
      join public.employer_elec_id_qualifications c
        on c.profile_id = public._elec_id_profile_for_roster(e.id)
     where (c.training_status is null or c.training_status in ('Completed', 'Expired'))
       and c.expiry_date is not null
       and c.expiry_date <= v_today + 30
  ),
  vehicle_docs as (
    select v.id, v.registration, x.label, x.expiry
      from public.vehicles v
      cross join lateral (values ('MOT', v.mot_expiry), ('Road tax', v.tax_expiry),
                                 ('Insurance', v.insurance_expiry)) as x(label, expiry)
     where v.user_id = p_firm and x.expiry is not null and x.expiry <= v_today + 30
  ),
  firm_docs as (
    select * from (values ('Business insurance', v_cp.insurance_expiry),
                          ('Scheme registration', v_cp.registration_expiry)) d(label, expiry)
     where d.expiry is not null and d.expiry <= v_today + 30
  ),
  otj as (
    select count(distinct o.id) as n
      from roster ee
      join public.college_otj_entries o on o.student_id = ee.user_id
     where lower(coalesce(ee.status, '')) = 'active'
       and o.verification_status = 'pending'
       and o.source_kind in ('apprentice_submitted', 'in_app')
       and public.can_confirm_otj_for(ee.user_id)
  )
  select jsonb_build_object(
    'firm', jsonb_build_object(
      'id', p_firm,
      'name', nullif(trim(coalesce(v_cp.company_name, '')), ''),
      'role', v_role,
      'money_visible', v_money),
    'today', v_today,

    'team', jsonb_build_object(
      'active', (select count(*) from roster),
      'joined', (select count(*) from roster where user_id is not null),
      'not_joined', (select count(*) from not_joined),
      'to_chase', coalesce((
        select jsonb_agg(jsonb_build_object('id', n.id, 'name', n.name,
                 'last_chased_at', n.invite_last_chased_at, 'added_at', n.created_at)
               order by n.created_at)
          from (select * from not_joined order by created_at limit 5) n), '[]'::jsonb)),

    'people_today', v_people,

    'jobs', jsonb_build_object(
      'live', (select count(*) from live_jobs),
      'today', (select count(*) from jobs_today),
      'week', (select count(*) from jobs_week),
      'unstaffed_today', (select count(*) from unstaffed_today),
      'unstaffed_today_first', (select jsonb_build_object('id', u.id, 'title', u.title)
                                  from unstaffed_today u order by u.start_date nulls last limit 1),
      'unstaffed_week', (select count(*) from unstaffed_week),
      'unstaffed_week_list', coalesce((
        select jsonb_agg(jsonb_build_object('id', u.id, 'title', u.title, 'client', u.client,
                 'location', u.location, 'start_date', u.start_date)
               order by u.start_date nulls last, u.title)
          from (select * from unstaffed_week order by start_date nulls last limit 5) u), '[]'::jsonb),
      'starting_week', coalesce((
        select jsonb_agg(jsonb_build_object('id', j.id, 'title', j.title, 'client', j.client,
                 'location', j.location, 'start_date', j.start_date,
                 'crew', (select count(distinct a.employee_id) from live_asg a where a.job_id = j.id
                           and a.start_date <= v_week_end and a.until >= v_today))
               order by j.start_date, j.title)
          from (select * from live_jobs
                 where start_date > v_today and start_date <= v_week_end
                 order by start_date limit 6) j), '[]'::jsonb),
      'starting_week_count', (select count(*) from live_jobs
                               where start_date > v_today and start_date <= v_week_end),
      'diary_unsent', (select count(*) from public.employer_dispatch_changes c
                        where c.firm_id = p_firm and c.notified_at is null)),

    'approvals', jsonb_build_object(
      'timesheets', (select count(*) from ts_pending),
      'timesheets_people', (select count(distinct employee_id) from ts_pending),
      'timesheets_oldest', (select min(date) from ts_pending),
      'timesheets_open_old', (select count(*) from ts_stale),
      'leave', (select count(*) from leave_pending),
      'leave_first', (select jsonb_build_object('id', l.id, 'name', l.person, 'type', l.type,
                              'start_date', l.start_date, 'days', l.total_days)
                        from leave_pending l order by l.start_date limit 1),
      'expenses', (select count(*) from exp_pending),
      'expenses_total', case when v_money then (select coalesce(sum(amount), 0) from exp_pending) end,
      'qs', (select count(*) from public.report_qs_reviews q
              where q.employer_id = p_firm and q.status = 'pending'),
      'otj', (select n from otj)),

    'safety', jsonb_build_object(
      'incidents_open', (select count(*) from inc_open),
      'incidents_unseen', (select count(*) from inc_open where acknowledged_at is null),
      'incident_first', (select jsonb_build_object('id', i.id, 'title', i.title)
                           from inc_open i where i.acknowledged_at is null
                          order by i.created_at desc limit 1),
      'riddor_due', (select count(*) from riddor),
      'riddor_next', (select jsonb_build_object('id', r.id, 'title', r.title, 'due', r.due)
                        from riddor r order by r.due nulls last limit 1),
      'actions_open', (select count(*) from inc_actions) + (select count(*) from site_actions),
      'actions_overdue',
        (select count(*) from inc_actions
          where nullif(act ->> 'due_date', '') is not null and (act ->> 'due_date')::date < v_today)
        + (select count(*) from site_actions where target_date < v_today),
      'packs_unsigned', (select count(*) from packs_unsigned),
      'signatures_waiting', (select coalesce(sum(waiting), 0) from packs_unsigned),
      'pack_first', (select jsonb_build_object('id', p.id, 'title', p.title, 'waiting', p.waiting)
                       from packs_unsigned p order by p.waiting desc limit 1),
      'rams_pending', (select count(*) from public.rams_documents r
                        where r.user_id = p_firm and r.status in ('submitted', 'generated'))),

    'expiring', jsonb_build_object(
      'credentials', (select count(*) from creds),
      'credentials_expired', (select count(*) from creds where expiry_date < v_today),
      'credential_items', coalesce((
        select jsonb_agg(jsonb_build_object('employee_id', c.employee_id, 'name', c.name,
                 'qualification', c.qualification_name, 'expiry_date', c.expiry_date)
               order by c.expiry_date)
          from (select * from creds order by expiry_date limit 5) c), '[]'::jsonb),
      'vehicles', (select count(*) from vehicle_docs),
      'vehicle_first', (select jsonb_build_object('registration', v.registration, 'label', v.label,
                                'expiry', v.expiry)
                          from vehicle_docs v order by v.expiry limit 1),
      'firm_docs', coalesce((select jsonb_agg(jsonb_build_object('label', d.label, 'expiry', d.expiry)
                                     order by d.expiry) from firm_docs d), '[]'::jsonb)),

    'leave_coming', coalesce((
      select jsonb_agg(jsonb_build_object('name', x.name, 'type', x.type,
               'start_date', x.start_date, 'end_date', x.end_date, 'days', x.total_days)
             order by x.start_date)
        from (select r.name, l.type, l.start_date, l.end_date, l.total_days
                from public.employer_leave_requests l
                join roster r on r.id = l.employee_id
               where l.status = 'Approved'
                 and l.start_date > v_today and l.start_date <= v_today + 13
               order by l.start_date limit 5) x), '[]'::jsonb),

    'money', case when v_money then jsonb_build_object(
      'outstanding', v_fin.outstanding,
      'outstanding_count', v_fin.outstanding_count,
      'overdue', v_fin.overdue,
      'overdue_count', v_fin.overdue_count,
      'paid_month', v_fin.paid_in,
      'paid_month_count', v_fin.paid_count,
      'invoiced_month', v_fin.invoiced,
      'invoiced_month_count', v_fin.invoice_count,
      'quotes_waiting', v_fin.open_quote_count,
      'quotes_waiting_value', v_fin.open_quote_value,
      'costs_month', v_fin.total_costs,
      'gross_profit_month', v_fin.gross_profit,
      'margin_pct', v_fin.margin_pct,
      'drafts', v_fin.draft_count) end,

    'grow', jsonb_build_object(
      'slug', case when coalesce(v_cp.lead_page_enabled, false) then v_cp.lead_page_slug end,
      'quote_page_leads_week', (select count(*) from public.employer_leads l
                                 where l.user_id = p_firm and l.source = 'Quote page'
                                   and l.created_at >= (v_today - 6)::timestamp at time zone 'Europe/London'),
      'quote_page_leads_total', (select count(*) from public.employer_leads l
                                  where l.user_id = p_firm and l.source = 'Quote page'),
      'new_leads', (select count(*) from public.employer_leads l
                     where l.user_id = p_firm and l.stage = 'New')),

    'setup', jsonb_build_object(
      'company', nullif(trim(coalesce(v_cp.company_name, '')), '') is not null,
      'logo', coalesce(v_cp.logo_url, v_cp.logo_data_url) is not null,
      'team', (select count(*) from roster) > 0,
      'job', exists (select 1 from public.employer_jobs j
                      where j.user_id = p_firm and not coalesce(j.is_template, false)),
      'crew_booked', exists (select 1 from public.employer_job_assignments a
                              join public.employer_jobs j on j.id = a.job_id
                             where j.user_id = p_firm),
      'card_payments', coalesce(v_cp.stripe_account_status, '') = 'active',
      'quote_page_live', coalesce(v_cp.lead_page_enabled, false) and v_cp.lead_page_slug is not null,
      'quote_page_lead', exists (select 1 from public.employer_leads l
                                  where l.user_id = p_firm and l.source = 'Quote page'))
  ) into v_result;

  return v_result;
end;
$function$;

comment on function public.get_employer_home(uuid) is
  'Employer Hub Overview (boss home) in one call: team, who is where today, jobs today/week, approvals, safety counts, expiries, money (null unless can_see_firm_money), quote page, setup checklist. Guard: p_firm in my_employer_scope().';

revoke all on function public.get_employer_home(uuid) from public, anon;
grant execute on function public.get_employer_home(uuid) to authenticated;
