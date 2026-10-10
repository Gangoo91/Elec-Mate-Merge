-- ELE-2091 (gap #5): hiring flows into onboarding without retyping.
--
-- Before: hire_applicant created the roster row with hourly_rate 0, a fixed
-- role and no join date, and the app said "Hired & onboarded". A zero rate
-- blocks payroll, and the office typed everything again.
--
-- Now:
--   * employer_hire_offers   the offer terms (pay, start date, role, job title),
--                            written at "Make offer" or at hire. Owner/admin only.
--   * employer_starters      one row per new starter: where they came from, the
--                            Elec-ID cards they applied with (a snapshot, until
--                            their account links), and when onboarding finished.
--   * save_hire_offer        records the offer.
--   * hire_applicant         same signature (HEAD and build 49 call it). The
--                            roster row now carries the offer's pay, start date,
--                            role and job title when there is an offer, and a
--                            starter row is opened. With no offer it behaves as
--                            before. The finder's fee record is only written
--                            when the applicant applied with an Elec-ID
--                            (worker_profile_id is NOT NULL, so a direct
--                            applicant used to fail the whole hire).
--   * hire_applicant_onboard the new app's one call: offer + hire + probation
--                            (employer_person_hr, from the firm's HR settings)
--                            + pay profile (date of birth, apprentice start).
--   * starter_checklist      the onboarding checklist, worked out live from the
--                            records that already exist (right to work,
--                            contract, probation, pay profile, app invite,
--                            policies, first job). Nothing is stored twice.
--   * finish_starter         closes a checklist.
--
-- Additive only: two new tables (RLS on), new functions, and a new body for
-- hire_applicant with the same signature and return keys (plus new keys).
-- No policy, column or FK on an existing table changes.
--
-- Applied 10 Oct 2026 in four parts (hire_onboarding_ele2091_tables,
-- _offer_fns, _checklist, _hire_applicant). hire_applicant's new body was
-- proved first inside a rolled-back transaction as owner, admin, crew,
-- outsider and anon (the function md5 was unchanged afterwards).

-- 1. Offer terms ------------------------------------------------------------------
create table if not exists public.employer_hire_offers (
  application_id uuid primary key
    references public.employer_vacancy_applications(id) on delete cascade,
  employer_id uuid not null,
  pay_type text not null default 'hourly' check (pay_type in ('hourly', 'annual')),
  hourly_rate numeric check (hourly_rate is null or (hourly_rate >= 0 and hourly_rate < 1000)),
  annual_salary numeric check (annual_salary is null or (annual_salary >= 0 and annual_salary < 1000000)),
  start_date date,
  team_role text check (team_role is null or team_role in (
    'QS', 'Supervisor', 'Project Manager', 'Apprentice Co-ordinator',
    'Operative', 'Apprentice', 'Subcontractor')),
  job_title text check (job_title is null or char_length(job_title) <= 80),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid default auth.uid()
);
create index if not exists employer_hire_offers_firm_idx on public.employer_hire_offers (employer_id);
alter table public.employer_hire_offers enable row level security;
comment on table public.employer_hire_offers is
  '[EMPLOYER] The offer made to a job applicant: pay (hourly rate or salary), start date, team role and job title. Carried into the roster at hire so nothing is typed twice. Scope: employer_id = the firm; owner/admin only (can_see_firm_money), written through save_hire_offer / hire_applicant_onboard. Used by: Job vacancies > Make offer and Hire (ELE-2091).';

drop policy if exists "hire offers owner admin read" on public.employer_hire_offers;
create policy "hire offers owner admin read" on public.employer_hire_offers
  for select to authenticated
  using (public.can_see_firm_money(employer_id));

-- 2. Starters --------------------------------------------------------------------
create table if not exists public.employer_starters (
  roster_id uuid primary key references public.employer_employees(id) on delete cascade,
  employer_id uuid not null,
  application_id uuid references public.employer_vacancy_applications(id) on delete set null,
  vacancy_title text,
  elec_id_profile_id uuid references public.employer_elec_id_profiles(id) on delete set null,
  cards jsonb not null default '{}'::jsonb,
  hired_at timestamptz not null default now(),
  hired_by uuid default auth.uid(),
  finished_at timestamptz,
  finished_by uuid
);
create index if not exists employer_starters_open_idx
  on public.employer_starters (employer_id) where finished_at is null;
alter table public.employer_starters enable row level security;
comment on table public.employer_starters is
  '[EMPLOYER] One row per new starter hired through Job vacancies: the application and vacancy they came from, a snapshot of the Elec-ID cards they applied with (shown until their account links, when the live Elec-ID takes over), and when onboarding was finished. The checklist itself is worked out live by starter_checklist(). Scope: employer_id = the firm; owner/admin only. Used by: People hub Starters, the person sheet (ELE-2091).';

drop policy if exists "starters owner admin read" on public.employer_starters;
create policy "starters owner admin read" on public.employer_starters
  for select to authenticated
  using (public.can_see_firm_money(employer_id));

-- 3. Record an offer ---------------------------------------------------------------
create or replace function public._hire_offer_upsert(p_firm uuid, p_application_id uuid, p_offer jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_pay text := coalesce(nullif(p_offer->>'pay_type', ''), 'hourly');
  v_rate numeric;
  v_salary numeric;
  v_start date;
  v_role text := nullif(btrim(coalesce(p_offer->>'team_role', '')), '');
  v_title text := nullif(btrim(coalesce(p_offer->>'job_title', '')), '');
begin
  if v_pay not in ('hourly', 'annual') then raise exception 'offer_pay_type'; end if;
  begin
    v_rate := nullif(p_offer->>'hourly_rate', '')::numeric;
    v_salary := nullif(p_offer->>'annual_salary', '')::numeric;
    v_start := nullif(p_offer->>'start_date', '')::date;
  exception when others then
    raise exception 'offer_format';
  end;
  if v_start is not null and (v_start < current_date - 365 or v_start > current_date + 730) then
    raise exception 'offer_start_date';
  end if;
  if v_pay = 'hourly' then v_salary := null; else v_rate := null; end if;

  insert into public.employer_hire_offers as o (
    application_id, employer_id, pay_type, hourly_rate, annual_salary,
    start_date, team_role, job_title, updated_by
  ) values (
    p_application_id, p_firm, v_pay, v_rate, v_salary, v_start, v_role, left(v_title, 80), auth.uid()
  )
  on conflict (application_id) do update set
    pay_type = excluded.pay_type,
    hourly_rate = excluded.hourly_rate,
    annual_salary = excluded.annual_salary,
    start_date = excluded.start_date,
    team_role = excluded.team_role,
    job_title = excluded.job_title,
    updated_at = now(),
    updated_by = auth.uid();
end;
$fn$;
revoke all on function public._hire_offer_upsert(uuid, uuid, jsonb) from public, anon, authenticated;

create or replace function public.save_hire_offer(p_application_id uuid, p_offer jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_firm uuid;
begin
  if auth.uid() is null then return jsonb_build_object('error', 'not_authenticated'); end if;
  select v.employer_id into v_firm
    from public.employer_vacancy_applications a
    join public.employer_vacancies v on v.id = a.vacancy_id
   where a.id = p_application_id;
  if v_firm is null then return jsonb_build_object('error', 'application_not_found'); end if;
  if not public.can_see_firm_money(v_firm) then
    return jsonb_build_object('error', 'not_authorised');
  end if;
  perform public._hire_offer_upsert(v_firm, p_application_id, coalesce(p_offer, '{}'::jsonb));
  return jsonb_build_object('ok', true, 'application_id', p_application_id);
end;
$fn$;
revoke all on function public.save_hire_offer(uuid, jsonb) from public, anon;
grant execute on function public.save_hire_offer(uuid, jsonb) to authenticated;

-- 4. hire_applicant, same signature ------------------------------------------------
create or replace function public.hire_applicant(p_application_id uuid, p_fee_amount numeric default null::numeric)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_uid uuid := public.my_default_employer_id();
  v_app record;
  v_vac record;
  v_offer public.employer_hire_offers%rowtype;
  v_profile public.employer_elec_id_profiles%rowtype;
  v_profile_employee_id uuid;
  v_worker_user_id uuid;
  v_existing_roster uuid;
  v_new_employee uuid;
  v_hire_id uuid;
  v_initials text;
  v_cards jsonb := '{}'::jsonb;
  v_money boolean;
begin
  if v_uid is null then
    return jsonb_build_object('error', 'not_authenticated');
  end if;

  select * into v_app from employer_vacancy_applications where id = p_application_id;
  if v_app is null then return jsonb_build_object('error', 'application_not_found'); end if;

  select * into v_vac from employer_vacancies where id = v_app.vacancy_id;
  if v_vac is null or v_vac.employer_id <> v_uid then
    return jsonb_build_object('error', 'not_authorised');
  end if;

  -- Pay is set by the owner or an admin only (guard_roster_pay_rates).
  v_money := public.can_see_firm_money(v_uid);
  select * into v_offer from employer_hire_offers
   where application_id = p_application_id and v_money;

  select p.* into v_profile from employer_elec_id_profiles p where p.id = v_app.applicant_profile_id;
  v_profile_employee_id := v_profile.employee_id;
  if v_profile_employee_id is not null then
    select e.user_id into v_worker_user_id from employer_employees e where e.id = v_profile_employee_id;
  end if;

  update employer_vacancy_applications set status = 'Hired', updated_at = now()
    where id = p_application_id;

  v_initials := upper(coalesce(substring(split_part(v_app.applicant_name, ' ', 1) from 1 for 1), '')) ||
                upper(coalesce(substring(split_part(v_app.applicant_name, ' ', 2) from 1 for 1), ''));
  if v_initials = '' then v_initials := 'NW'; end if;

  select id into v_existing_roster from employer_employees
   where employer_id = v_uid
     and (
       (v_worker_user_id is not null and user_id = v_worker_user_id)
       or (v_app.applicant_email is not null and lower(email) = lower(v_app.applicant_email))
     )
   limit 1;

  if v_existing_roster is null then
    insert into employer_employees (
      name, role, team_role, status, email, phone, avatar_initials,
      hourly_rate, pay_type, annual_salary, join_date, employer_id, user_id
    ) values (
      coalesce(v_app.applicant_name, 'New worker'),
      coalesce(v_offer.job_title, 'electrician'),
      coalesce(v_offer.team_role, 'Operative'),
      'Active',
      v_app.applicant_email, v_app.applicant_phone, v_initials,
      -- A salary also sets the hourly equivalent (salary / 40h / 52w), as Add employee does.
      case when coalesce(v_offer.pay_type, 'hourly') = 'hourly' then coalesce(v_offer.hourly_rate, 0)
           else round(coalesce(v_offer.annual_salary, 0) / 2080.0, 2) end,
      coalesce(v_offer.pay_type, 'hourly'),
      case when v_offer.pay_type = 'annual' then v_offer.annual_salary end,
      v_offer.start_date,
      v_uid, null
    ) returning id into v_new_employee;

    -- The cards they applied with, so the firm sees them from day one. Their
    -- live Elec-ID replaces this once their account links to the roster row.
    if v_profile.id is not null and not coalesce(v_profile.opt_out, false) then
      v_cards := jsonb_build_object(
        'ecs_card_type', nullif(lower(coalesce(v_profile.ecs_card_type, '')), 'none'),
        'ecs_expiry_date', v_profile.ecs_expiry_date,
        'ecs_verification_level', v_profile.ecs_verification_level,
        'job_title', v_profile.job_title,
        'qualifications', coalesce((
          select jsonb_agg(jsonb_build_object(
                   'name', q.qualification_name,
                   'awarding_body', q.awarding_body,
                   'expiry_date', q.expiry_date,
                   'verified', coalesce(q.is_verified, false))
                 order by q.date_achieved desc nulls last)
            from employer_elec_id_qualifications q
           where q.profile_id = v_profile.id), '[]'::jsonb));
    end if;

    insert into employer_starters (roster_id, employer_id, application_id, vacancy_title,
                                   elec_id_profile_id, cards)
    values (v_new_employee, v_uid, p_application_id, v_vac.title,
            case when coalesce(v_profile.opt_out, false) then null else v_profile.id end, v_cards)
    on conflict (roster_id) do nothing;
  end if;

  if v_app.applicant_profile_id is not null and not exists (
    select 1 from elec_id_hire_records
    where employer_id = v_uid and worker_profile_id = v_app.applicant_profile_id
  ) then
    insert into elec_id_hire_records (worker_profile_id, employer_id, job_type, fee_amount)
    values (v_app.applicant_profile_id, v_uid, v_vac.title, coalesce(p_fee_amount, 250.00))
    returning id into v_hire_id;
  end if;

  update employer_conversations set electrician_can_reply = true, updated_at = now()
    where employer_id = v_uid and electrician_profile_id = v_app.applicant_profile_id;

  return jsonb_build_object(
    'ok', true,
    'application_id', p_application_id,
    'roster_employee_id', coalesce(v_existing_roster, v_new_employee),
    'roster_created', v_new_employee is not null,
    'hire_record_id', v_hire_id,
    'worker_user_id', v_worker_user_id,
    'worker_name', v_app.applicant_name,
    'pay_carried', v_new_employee is not null and v_offer.application_id is not null
                   and coalesce(v_offer.hourly_rate, v_offer.annual_salary, 0) > 0,
    'start_date', case when v_new_employee is not null then v_offer.start_date end
  );
end;
$function$;
revoke all on function public.hire_applicant(uuid, numeric) from public, anon;
grant execute on function public.hire_applicant(uuid, numeric) to authenticated;

-- 5. The one call the new app makes -----------------------------------------------
-- p_details: the offer keys (pay_type, hourly_rate, annual_salary, start_date,
-- team_role, job_title) plus date_of_birth and apprentice_start_date.
create or replace function public.hire_applicant_onboard(p_application_id uuid, p_details jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_firm uuid;
  v_res jsonb;
  v_roster uuid;
  v_role text;
  v_start date;
  v_months int;
  v_end date;
  v_dob date;
  v_appr date;
  v_d jsonb := coalesce(p_details, '{}'::jsonb);
  v_probation boolean := false;
  v_pay_profile boolean := false;
begin
  if auth.uid() is null then return jsonb_build_object('error', 'not_authenticated'); end if;
  select v.employer_id into v_firm
    from public.employer_vacancy_applications a
    join public.employer_vacancies v on v.id = a.vacancy_id
   where a.id = p_application_id;
  if v_firm is null then return jsonb_build_object('error', 'application_not_found'); end if;
  if not public.can_see_firm_money(v_firm) then
    return jsonb_build_object('error', 'not_authorised');
  end if;

  begin
    v_dob := nullif(v_d->>'date_of_birth', '')::date;
    v_appr := nullif(v_d->>'apprentice_start_date', '')::date;
  exception when others then
    return jsonb_build_object('error', 'details_format');
  end;
  if v_dob is not null and (v_dob < date '1930-01-01' or v_dob > current_date - interval '13 years') then
    return jsonb_build_object('error', 'date_of_birth');
  end if;

  perform public._hire_offer_upsert(v_firm, p_application_id, v_d);
  v_res := public.hire_applicant(p_application_id, null);
  if v_res ? 'error' then
    -- Nothing half-done: undo the offer write with the hire.
    raise exception 'hire_failed:%', v_res->>'error';
  end if;

  v_roster := (v_res->>'roster_employee_id')::uuid;
  if coalesce((v_res->>'roster_created')::boolean, false) then
    select e.team_role, e.join_date into v_role, v_start
      from public.employer_employees e where e.id = v_roster;

    -- Probation from the firm's HR settings (default 6 months), review two
    -- weeks before the end. Same rule as the person sheet. Employees only.
    if v_start is not null and coalesce(v_role, '') <> 'Subcontractor' then
      select coalesce(s.default_probation_months, 6) into v_months
        from public.employer_hr_settings s where s.employer_id = v_firm;
      v_months := coalesce(v_months, 6);
      if v_months > 0 then
        v_end := (v_start + make_interval(months => v_months))::date;
        insert into public.employer_person_hr (roster_id, employer_id, start_date,
                                               probation_end_date, probation_review_date)
        values (v_roster, v_firm, v_start, v_end, v_end - 14)
        on conflict (roster_id) do nothing;
        v_probation := found;
      end if;
    end if;

    -- Pay profile: date of birth (minimum wage band) and, for an apprentice,
    -- the apprenticeship start (defaults to their start date).
    if coalesce(v_role, '') <> 'Subcontractor'
       and (v_dob is not null or v_appr is not null or v_role = 'Apprentice') then
      insert into public.employer_employee_pay_profiles (employee_id, employer_id, date_of_birth,
                                                         apprenticeship_start_date)
      values (v_roster, v_firm, v_dob,
              case when v_role = 'Apprentice' then coalesce(v_appr, v_start) end)
      on conflict (employee_id) do nothing;
      v_pay_profile := found;
    end if;
  end if;

  return v_res || jsonb_build_object(
    'probation_end_date', case when v_probation then v_end end,
    'pay_profile_created', v_pay_profile);
end;
$fn$;
revoke all on function public.hire_applicant_onboard(uuid, jsonb) from public, anon;
grant execute on function public.hire_applicant_onboard(uuid, jsonb) to authenticated;

-- 6. The checklist, worked out live --------------------------------------------------
create or replace function public.starter_checklist(p_firm uuid default null, p_roster_id uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $fn$
declare
  v_firm uuid := coalesce(p_firm, public.my_default_employer_id());
  v_pols int;
  v_out jsonb;
begin
  if v_firm is null or not public.can_see_firm_money(v_firm) then
    return '[]'::jsonb;
  end if;
  select count(*) into v_pols from public.employer_policies
   where user_id = v_firm and published_version is not null;

  with s as (
    select st.*, e.name, e.team_role, e.email, e.user_id, e.join_date, e.hourly_rate,
           e.annual_salary, e.pay_type, e.role
      from public.employer_starters st
      join public.employer_employees e on e.id = st.roster_id
     where st.employer_id = v_firm
       and e.employer_id = v_firm
       and lower(coalesce(e.status, '')) <> 'archived'
       and (p_roster_id is null or st.roster_id = p_roster_id)
       and (p_roster_id is not null or st.finished_at is null)
  ), rtw as (
    select * from public._rtw_status(v_firm)
  ), x as (
    select s.*,
      (s.team_role = 'Subcontractor') as is_sub,
      r.status as rtw_status, r.submitted_at as rtw_submitted_at,
      (select sub.date_of_birth from public.employer_rtw_submissions sub
        where sub.roster_id = s.roster_id and sub.employer_id = v_firm and sub.date_of_birth is not null
        order by sub.submitted_at desc limit 1) as rtw_dob,
      (select jsonb_build_object('status', case
                 when q.id is null then null
                 when q.status not in ('Signed', 'Declined') and q.expires_at < now() then 'Expired'
                 else q.status end,
               'countersigned', c.employer_signed_at is not null)
         from public.contracts c
         left join lateral (
           select sr.* from public.signature_requests sr
            where sr.document_type = 'Contract' and sr.document_id = c.id and sr.status <> 'Revoked'
            order by sr.created_at desc limit 1) q on true
        where c.employee_id = s.roster_id and c.is_template = false and c.user_id = v_firm
        order by c.created_at desc limit 1) as contract,
      h.probation_end_date,
      pp.date_of_birth, pp.apprenticeship_start_date,
      (select jsonb_build_object('status', i.status, 'last_sent_at', i.last_sent_at)
         from public.employer_team_invites i
        where i.employee_id = s.roster_id
        order by i.last_sent_at desc nulls last limit 1) as invite,
      case when s.user_id is null or v_pols = 0 then 0 else (
        select count(distinct p.id) from public.employer_policies p
          join public.employer_policy_acknowledgements a
            on a.policy_id = p.id and a.policy_version = p.published_version and a.user_id = s.user_id
         where p.user_id = v_firm and p.published_version is not null) end as pols_signed,
      (select count(*) from public.employer_job_assignments ja
        where ja.employee_id = s.roster_id
          and coalesce(ja.status, '') not in ('removed', 'cancelled')) as jobs
    from s
    left join rtw r on r.roster_id = s.roster_id
    left join public.employer_person_hr h on h.roster_id = s.roster_id
    left join public.employer_employee_pay_profiles pp on pp.employee_id = s.roster_id
  ), items as (
    select x.*, (
      select jsonb_agg(it order by ord) from (
        select 1 ord, jsonb_build_object('key', 'terms',
          'state', case when (case when x.pay_type = 'annual' then coalesce(x.annual_salary, 0)
                                   else coalesce(x.hourly_rate, 0) end) > 0
                          and x.join_date is not null then 'done' else 'todo' end,
          'pay_set', (case when x.pay_type = 'annual' then coalesce(x.annual_salary, 0)
                           else coalesce(x.hourly_rate, 0) end) > 0,
          'start_date', x.join_date) it
        union all
        select 2, jsonb_build_object('key', 'rtw',
          'state', case when x.rtw_status in ('checked', 'due', 'not_required') then 'done'
                        when x.rtw_submitted_at is not null then 'waiting' else 'todo' end,
          'status', x.rtw_status, 'submitted', x.rtw_submitted_at is not null)
        union all
        select 3, jsonb_build_object('key', 'contract',
          'state', case when x.contract->>'status' = 'Signed' then 'done'
                        when x.contract->>'status' is null
                          or x.contract->>'status' in ('Declined', 'Expired') then 'todo'
                        else 'waiting' end,
          'status', x.contract->>'status',
          'on_file', x.contract is not null,
          'countersigned', coalesce((x.contract->>'countersigned')::boolean, false))
        union all
        select 4, jsonb_build_object('key', 'probation',
          'state', case when x.probation_end_date is not null then 'done' else 'todo' end,
          'end_date', x.probation_end_date)
          where not x.is_sub
        union all
        select 5, jsonb_build_object('key', 'pay_profile',
          'state', case when x.date_of_birth is not null then 'done' else 'todo' end,
          'rtw_dob', case when x.date_of_birth is null then x.rtw_dob end,
          'apprentice', x.team_role = 'Apprentice',
          'apprentice_start', x.apprenticeship_start_date)
          where not x.is_sub
        union all
        select 6, jsonb_build_object('key', 'app',
          'state', case when x.user_id is not null then 'done'
                        when x.invite->>'status' = 'pending' then 'waiting' else 'todo' end,
          'has_email', nullif(btrim(coalesce(x.email, '')), '') is not null,
          'invite_status', x.invite->>'status',
          'invite_sent_at', x.invite->>'last_sent_at')
        union all
        select 7, jsonb_build_object('key', 'cards',
          'state', case when (x.user_id is not null
                              and public._elec_id_profile_for_roster(x.roster_id) is not null)
                          or (x.cards->>'ecs_card_type') is not null then 'done'
                        when jsonb_array_length(coalesce(x.cards->'qualifications', '[]'::jsonb)) > 0
                          then 'waiting' else 'todo' end,
          'linked', x.user_id is not null,
          'snapshot', x.cards)
        union all
        select 8, jsonb_build_object('key', 'policies',
          'state', case when x.pols_signed >= v_pols then 'done'
                        when x.user_id is not null then 'waiting' else 'todo' end,
          'signed', x.pols_signed, 'total', v_pols)
          where v_pols > 0
        union all
        select 9, jsonb_build_object('key', 'first_job',
          'state', case when x.jobs > 0 then 'done' else 'todo' end, 'jobs', x.jobs)
      ) z) as list
    from x
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'roster_id', i.roster_id,
           'name', i.name,
           'team_role', i.team_role,
           'job_title', i.role,
           'start_date', i.join_date,
           'hired_at', i.hired_at,
           'vacancy_title', i.vacancy_title,
           'application_id', i.application_id,
           'finished_at', i.finished_at,
           'items', i.list,
           'done', (select count(*) from jsonb_array_elements(i.list) e where e->>'state' = 'done'),
           'total', jsonb_array_length(i.list))
         order by i.join_date nulls last, i.hired_at), '[]'::jsonb)
    into v_out
    from items i;
  return v_out;
end;
$fn$;
revoke all on function public.starter_checklist(uuid, uuid) from public, anon;
grant execute on function public.starter_checklist(uuid, uuid) to authenticated;

-- 7. Close a checklist ------------------------------------------------------------
create or replace function public.finish_starter(p_roster_id uuid, p_reopen boolean default false)
returns jsonb
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_firm uuid;
begin
  if auth.uid() is null then return jsonb_build_object('error', 'not_authenticated'); end if;
  select employer_id into v_firm from public.employer_starters where roster_id = p_roster_id;
  if v_firm is null then return jsonb_build_object('error', 'not_found'); end if;
  if not public.can_see_firm_money(v_firm) then
    return jsonb_build_object('error', 'not_authorised');
  end if;
  update public.employer_starters
     set finished_at = case when p_reopen then null else now() end,
         finished_by = case when p_reopen then null else auth.uid() end
   where roster_id = p_roster_id;
  return jsonb_build_object('ok', true);
end;
$fn$;
revoke all on function public.finish_starter(uuid, boolean) from public, anon;
grant execute on function public.finish_starter(uuid, boolean) to authenticated;
