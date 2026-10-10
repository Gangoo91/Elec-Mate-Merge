-- ELE-2061 / ELE-2075 review fixes (10 Oct 2026).
--
-- 1. HR reminders (probation, qualifying date, right-to-work follow-ups) went
--    to every active employer_admins row through notify_employer_bell, and
--    into the office daily summary email. employer_person_hr and the check
--    records are owner/admin only (can_see_firm_money). They now go through
--    notify_employer_admins_bell (owner + access_role 'admin' only) and stay
--    out of the summary email. notify_employer_bell is untouched.
--    The qualifying-date reminder no longer names unfair dismissal:
--    "Probation decision due before 3 Jan · Bob".
-- 2. _rtw_status uses least(follow_up_due, permission_expires_on), so a lapsed
--    time-limited permission is never shown as Checked.
-- 3. Block mode is enforced server-side on assigning / booking: a BEFORE
--    trigger on employer_job_assignments refuses a NEW person on a job (insert,
--    a change of person, or reviving a removed booking) when the firm has
--    chosen block and the person's check is missing or overdue. Only for
--    signed-in requests (auth.uid() not null); cron, service role and the
--    public booking widget (already filtered by _sched_options) are not
--    stopped. Approving and paying hours already worked is never blocked.
--    No firm uses block today (employer_hr_settings is empty), so HEAD and
--    build 49 see no change until a firm opts in.
-- 4. Qualifying period by nation. ERA 2025 s.25 extends to England, Wales and
--    Scotland only; Northern Ireland stays at one year:
--      https://www.gov.uk/dismiss-staff/eligibility-to-claim-unfair-dismissal
--        ("In Northern Ireland, the qualifying period is still usually 1 year.")
--      https://www.nidirect.gov.uk/articles/what-do-if-you-are-unfairly-dismissed
--        ("you will normally need one year's service first")
--      https://www.legislation.gov.uk/nisi/1996/1919/article/140 (one year)
--      https://www.legislation.gov.uk/ukpga/2025/36/section/25 (extent E+W+S)
--    The firm's nation is employer_hr_settings.employment_law ('gb' | 'ni'),
--    else read from the company postcode (BT = Northern Ireland). Unknown
--    (no postcode, Channel Islands, Isle of Man) gives no date at all.
-- 5. Retention: leavers need a real leaving date before right-to-work copies or
--    the name can go (no more updated_at guess). The queue lists right-to-work
--    files no longer linked to any record so they can be deleted. Workers can
--    delete their own uploads that never reached a submission.
--
-- Additive: new nullable column on a new table, new functions, new policies,
-- one new BEFORE trigger (proved with rolled-back inserts before applying),
-- and new definitions of server-only functions with the same signatures.

-- 0. Firm nation ----------------------------------------------------------------
alter table public.employer_hr_settings
  add column if not exists employment_law text check (employment_law in ('gb', 'ni'));
comment on column public.employer_hr_settings.employment_law is
  'Where the firm employs people, for the unfair dismissal qualifying period: gb (England, Scotland, Wales) or ni (Northern Ireland). Null = read from company_profiles.company_postcode (BT = ni) (ELE-2075).';

create or replace function public._hr_postcode_law(p_postcode text)
returns text
language sql
immutable
set search_path = public
as $fn$
  select case
    when p_postcode is null or btrim(p_postcode) = '' then null
    when upper(btrim(p_postcode)) ~ '^BT[0-9]' then 'ni'
    -- Jersey, Guernsey and the Isle of Man have their own employment law.
    when upper(btrim(p_postcode)) ~ '^(JE|GY|IM)[0-9]' then null
    when upper(btrim(p_postcode)) ~ '^[A-Z]{1,2}[0-9][0-9A-Z]?\s*[0-9][A-Z]{2}$' then 'gb'
    else null
  end;
$fn$;
revoke all on function public._hr_postcode_law(text) from public, anon;
grant execute on function public._hr_postcode_law(text) to authenticated;

create or replace function public._hr_firm_law(p_firm uuid)
returns text
language sql
stable
security definer
set search_path = public
as $fn$
  select coalesce(
    (select s.employment_law from public.employer_hr_settings s where s.employer_id = p_firm),
    (select public._hr_postcode_law(cp.company_postcode)
       from public.company_profiles cp where cp.user_id = p_firm
      order by cp.updated_at desc nulls last limit 1));
$fn$;
revoke all on function public._hr_firm_law(uuid) from public, anon, authenticated;

-- What the HR screens show: the law in use and where it came from.
create or replace function public.hr_employment_law(p_firm uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $fn$
declare
  v_firm uuid := coalesce(p_firm, auth.uid());
  v_set text;
  v_pc text;
begin
  if v_firm is null or v_firm not in (select public.my_employer_scope()) then
    return jsonb_build_object('law', null, 'source', null);
  end if;
  select s.employment_law into v_set from public.employer_hr_settings s where s.employer_id = v_firm;
  if v_set is not null then
    return jsonb_build_object('law', v_set, 'source', 'setting');
  end if;
  select public._hr_postcode_law(cp.company_postcode) into v_pc
    from public.company_profiles cp where cp.user_id = v_firm
   order by cp.updated_at desc nulls last limit 1;
  return jsonb_build_object('law', v_pc, 'source', case when v_pc is not null then 'postcode' end);
end;
$fn$;
revoke all on function public.hr_employment_law(uuid) from public, anon;
grant execute on function public.hr_employment_law(uuid) to authenticated;

-- GB: 2 years before 1 Jan 2027, then 6 months (the 1-arg version, unchanged).
-- NI: 1 year. Unknown: null.
create or replace function public.hr_qualifying_date(p_start date, p_law text)
returns date
language sql
immutable
set search_path = public
as $fn$
  select case
    when p_start is null then null
    when p_law = 'ni' then (p_start + interval '1 year')::date
    when p_law = 'gb' then public.hr_qualifying_date(p_start)
    else null
  end;
$fn$;
revoke all on function public.hr_qualifying_date(date, text) from public, anon;
grant execute on function public.hr_qualifying_date(date, text) to authenticated;

create or replace function public.hr_people(p_firm uuid default null)
returns table (
  roster_id uuid, name text, team_role text, status text,
  start_date date, start_is_join_date boolean,
  probation_end_date date, probation_review_date date,
  probation_outcome text, probation_outcome_on date, probation_notes text,
  qualifying_date date, left_on date
)
language plpgsql
stable
security definer
set search_path = public
as $fn$
declare
  v_firm uuid := coalesce(p_firm, auth.uid());
  v_law text;
begin
  if v_firm is null or not public.can_see_firm_money(v_firm) then
    return;
  end if;
  v_law := public._hr_firm_law(v_firm);
  return query
  select r.id, r.name, r.team_role, r.status,
         coalesce(h.start_date, r.join_date), h.start_date is null,
         h.probation_end_date, h.probation_review_date,
         h.probation_outcome, h.probation_outcome_on, h.probation_notes,
         case when r.team_role = 'Subcontractor' then null
              else public.hr_qualifying_date(coalesce(h.start_date, r.join_date), v_law) end,
         h.left_on
    from public.employer_employees r
    left join public.employer_person_hr h on h.roster_id = r.id
   where r.employer_id = v_firm;
end;
$fn$;
revoke all on function public.hr_people(uuid) from public, anon;
grant execute on function public.hr_people(uuid) to authenticated;

-- 1. Owner/admin-only bell ------------------------------------------------------
-- Same delivery as notify_employer_bell (notify_user when the type is
-- registered, else employer_notifications), but only to the owner and active
-- employer_admins rows with access_role = 'admin' (my_employer_admin_scope).
create or replace function public.notify_employer_admins_bell(
  p_employer uuid, p_type text, p_title text, p_message text, p_meta jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $fn$
declare
  r record;
  v_central text;
  v_meta jsonb := coalesce(p_meta, '{}'::jsonb);
  v_route text := coalesce(v_meta->>'route', v_meta->>'link');
begin
  if p_employer is null then return; end if;
  p_title := public._notif_tidy(p_title);
  p_message := public._notif_tidy(p_message);
  if v_route is not null then
    v_meta := v_meta || jsonb_build_object('route', v_route);
  end if;
  if (v_meta->>'employee_id') is null then
    v_meta := jsonb_strip_nulls(v_meta || jsonb_build_object(
      'employee_id', public.notification_employee_id(v_meta, p_employer, v_route)));
  end if;
  if exists (select 1 from public.notification_types t where t.type = p_type) then
    v_central := p_type;
  end if;

  for r in
    select p_employer as uid
    union
    select a.user_id
      from public.employer_admins a
     where a.employer_id = p_employer
       and a.status = 'active'
       and a.access_role = 'admin'
       and a.user_id is not null
  loop
    begin
      if v_central is not null then
        perform public.notify_user(r.uid, v_central, p_title, p_message,
                                   v_meta || jsonb_build_object('source_type', p_type));
      else
        insert into public.employer_notifications (user_id, type, title, message, action_url, metadata)
        values (r.uid, p_type, p_title, p_message, v_route, v_meta);
      end if;
    exception when others then
      raise warning '[notify_employer_admins_bell] recipient % failed: %', r.uid, sqlerrm;
    end;
  end loop;
exception when others then
  raise warning '[notify_employer_admins_bell] % / %: %', p_employer, p_type, sqlerrm;
end;
$fn$;
revoke all on function public.notify_employer_admins_bell(uuid, text, text, text, jsonb) from public, anon, authenticated;

-- HR kinds in employer_expiry_items: owner/admin bell only, never the email.
create or replace function public._hr_expiry_kind(p_kind text)
returns boolean
language sql
immutable
set search_path = public
as $fn$
  select p_kind in ('probation', 'qualifying_period', 'right_to_work');
$fn$;
revoke all on function public._hr_expiry_kind(text) from public, anon, authenticated;

-- Wording for HR reminders. Never mentions unfair dismissal.
create or replace function public._hr_expiry_text(
  p_kind text, p_label text, p_name text, p_due date, p_stage text,
  out title text, out message text
)
language sql
stable
set search_path = public
as $fn$
  select
    case p_kind
      when 'qualifying_period' then
        case when p_stage = 'overdue'
             then 'Probation decision date passed · ' || p_name
             else 'Probation decision due before ' || to_char(p_due, 'FMDD Mon') || ' · ' || p_name end
      when 'probation' then
        case when p_stage = 'overdue'
             then 'Probation review date passed · ' || p_name
             else 'Probation review due · ' || p_name end
      else p_label || case when p_stage = 'overdue' then ' overdue' else ' due' end || ' · ' || p_name
    end,
    case p_kind
      when 'qualifying_period' then
        case when p_stage = 'overdue'
             then 'It was ' || to_char(p_due, 'FMDD Mon YYYY') || '. Record the probation outcome on their HR record.'
             else 'Record the probation outcome on their HR record before ' || to_char(p_due, 'FMDD Mon YYYY') || '.' end
      when 'probation' then
        case when p_stage = 'overdue'
             then 'It was ' || to_char(p_due, 'FMDD Mon YYYY') || '. Record the outcome or a new date.'
             when p_due = current_date then 'Due today.'
             else 'Due ' || to_char(p_due, 'FMDD Mon YYYY') || ' (in ' || (p_due - current_date) ||
                  case when p_due - current_date = 1 then ' day).' else ' days).' end end
      else
        case when p_stage = 'overdue' then 'Was due ' || to_char(p_due, 'FMDD Mon YYYY') || '. Check again before they work.'
             when p_due = current_date then 'Due today.'
             else 'Due ' || to_char(p_due, 'FMDD Mon YYYY') || ' (in ' || (p_due - current_date) ||
                  case when p_due - current_date = 1 then ' day).' else ' days).' end end
    end;
$fn$;
revoke all on function public._hr_expiry_text(text, text, text, date, text) from public, anon, authenticated;

-- notify_employer_expiries: the live definition with three changes, marked
-- "HR (ELE-2061/2075)". Everything else is byte-for-byte the same.
create or replace function public.notify_employer_expiries()
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  r record;
  v_stage text;
  v_ref text;
  v_days int;
  v_ts int; v_ts_oldest date; v_leave int; v_exp int; v_new int;
  v_list jsonb;
  v_hr record;
begin
  for r in
    select * from public.employer_expiry_items() i
     where i.firm is not null
       and i.due <= current_date + 30
       and i.due >= current_date - 60
  loop
    begin
      v_stage := case when r.due < current_date then 'overdue'
                      when r.due <= current_date + 7 then 'due7'
                      else 'due30' end;
      v_ref := r.kind || ':' || r.item_id || ':' || r.field || ':' || r.due || ':' || v_stage;
      insert into public.employer_expiry_sent (firm, ref) values (r.firm, v_ref) on conflict do nothing;
      continue when not found;
      v_days := r.due - current_date;
      if public._hr_expiry_kind(r.kind) then
        -- HR (ELE-2061/2075): owner and admins only, plain wording.
        select * into v_hr from public._hr_expiry_text(r.kind, r.label, r.name, r.due, v_stage);
        perform public.notify_employer_admins_bell(
          r.firm, 'employer_expiry', v_hr.title, v_hr.message,
          jsonb_build_object('route', r.route, 'ref_id', v_ref, 'kind', r.kind, 'item_id', r.item_id, 'due', r.due)
        );
        continue;
      end if;
      perform public.notify_employer_bell(
        r.firm,
        'employer_expiry',
        r.label || case when v_stage = 'overdue' then ' overdue' else ' due' end || ' · ' || r.name,
        case when v_stage = 'overdue' then 'Was due ' || to_char(r.due, 'FMDD Mon YYYY') || '.'
             when v_days = 0 then 'Due today.'
             else 'Due ' || to_char(r.due, 'FMDD Mon YYYY') || ' (in ' || v_days ||
                  case when v_days = 1 then ' day).' else ' days).' end
        end,
        jsonb_build_object('route', r.route, 'ref_id', v_ref, 'kind', r.kind, 'item_id', r.item_id, 'due', r.due)
      );
    exception when others then
      raise warning '[notify_employer_expiries] item %: %', r.item_id, sqlerrm;
    end;
  end loop;

  for r in
    select j.user_id as firm, d.id, j.title as job_title, j.start_date, d.status,
           coalesce(nullif(trim(d.project_name), ''), j.title, 'RAMS') as name
      from public.rams_documents d
      join public.employer_jobs j on j.id = d.employer_job_id
     where j.start_date between current_date and current_date + 3
       and j.archived_at is null
       and lower(coalesce(j.status, '')) not in ('completed', 'complete', 'cancelled', 'archived')
       and lower(coalesce(d.status, '')) not in ('approved', 'issued')
  loop
    begin
      v_ref := 'rams:' || r.id || ':' || r.start_date;
      insert into public.employer_expiry_sent (firm, ref) values (r.firm, v_ref) on conflict do nothing;
      continue when not found;
      perform public.notify_employer_bell(
        r.firm,
        'employer_expiry',
        'RAMS not signed off · ' || coalesce(r.job_title, r.name),
        'The job starts ' || to_char(r.start_date, 'FMDD Mon') || ' and its RAMS is still ' ||
          case lower(coalesce(r.status, '')) when 'generated' then 'an AI draft' else coalesce(lower(r.status), 'a draft') end || '.',
        jsonb_build_object('route', '/employer?section=rams', 'ref_id', v_ref, 'kind', 'rams', 'item_id', r.id)
      );
    exception when others then
      raise warning '[notify_employer_expiries] rams %: %', r.id, sqlerrm;
    end;
  end loop;

  if extract(isodow from (now() at time zone 'Europe/London')) < 6 then
    for r in
      select cp.user_id as firm
        from public.company_profiles cp
       where nullif(trim(cp.notification_email), '') is not null
    loop
      begin
        select count(*), min(t.date) into v_ts, v_ts_oldest
          from public.employer_timesheets t
          join public.employer_employees e on e.id = t.employee_id
         where e.employer_id = r.firm
           and lower(coalesce(t.status, '')) in ('pending', 'submitted')
           and t.total_hours is not null;
        select count(*) into v_leave
          from public.employer_leave_requests l
          join public.employer_employees e on e.id = l.employee_id
         where e.employer_id = r.firm and lower(coalesce(l.status, '')) = 'pending';
        select count(*) into v_exp
          from public.employer_expense_claims x
          join public.employer_employees e on e.id = x.employee_id
         where e.employer_id = r.firm and lower(coalesce(x.status, '')) in ('pending', 'submitted');
        select count(*) into v_new from public.employer_expiry_sent s
         where s.firm = r.firm and s.sent_at >= date_trunc('day', now())
           and s.ref not like 'mine:%' and s.ref not like 'log:%'
           -- HR (ELE-2061/2075): not in the office email.
           and s.ref not like 'probation:%' and s.ref not like 'qualifying_period:%'
           and s.ref not like 'right_to_work:%';

        continue when v_ts + v_leave + v_exp + v_new = 0;

        select coalesce(jsonb_agg(x order by x->>'due'), '[]'::jsonb) into v_list
          from (
            select jsonb_build_object('label', i.label, 'name', i.name, 'due', i.due, 'route', i.route) as x
              from public.employer_expiry_items() i
             where i.firm = r.firm
               and i.due <= current_date + 30 and i.due >= current_date - 60
               -- HR (ELE-2061/2075): not in the office email.
               and not public._hr_expiry_kind(i.kind)
             order by i.due
             limit 12
          ) s;

        perform public.queue_office_email(
          r.firm, 'daily_summary', to_char(current_date, 'YYYY-MM-DD'),
          jsonb_build_object(
            'timesheets', v_ts, 'timesheets_oldest', v_ts_oldest,
            'leave', v_leave, 'expenses', v_exp,
            'expiring', v_list));
      exception when others then
        raise warning '[notify_employer_expiries] summary %: %', r.firm, sqlerrm;
      end;
    end loop;
  end if;
end;
$function$;
revoke all on function public.notify_employer_expiries() from public, anon, authenticated;

-- 2 + 4. employer_expiry_items: right-to-work follow-up honours the permission
-- expiry; qualifying date by nation, label without "unfair dismissal". Same
-- signature and every other branch unchanged (text replace on the live body,
-- each replacement asserted).
do $do$
declare
  v_def text := pg_get_functiondef('public.employer_expiry_items()'::regprocedure);
  v_new text;
  v_a text := 'c.roster_id, c.employer_id, c.follow_up_due, c.check_type';
  v_a2 text := 'c.roster_id, c.employer_id, least(c.follow_up_due, c.permission_expires_on) as follow_up_due, c.check_type';
  v_b text := '''Unfair dismissal protection'', public.hr_qualifying_date(coalesce(h.start_date, r.join_date))';
  v_b2 text := '''Probation decision'', public.hr_qualifying_date(coalesce(h.start_date, r.join_date), public._hr_firm_law(h.employer_id))';
  v_c text := 'and public.hr_qualifying_date(coalesce(h.start_date, r.join_date)) >= current_date';
  v_c2 text := 'and public.hr_qualifying_date(coalesce(h.start_date, r.join_date), public._hr_firm_law(h.employer_id)) >= current_date';
begin
  if position(v_a2 in v_def) > 0 and position(v_b2 in v_def) > 0 and position(v_c2 in v_def) > 0 then
    return;
  end if;
  if position(v_a in v_def) = 0 then raise exception 'employer_expiry_items: rtw anchor not found'; end if;
  if position(v_b in v_def) = 0 then raise exception 'employer_expiry_items: qualifying label anchor not found'; end if;
  if position(v_c in v_def) = 0 then raise exception 'employer_expiry_items: qualifying filter anchor not found'; end if;
  v_new := replace(replace(replace(v_def, v_a, v_a2), v_b, v_b2), v_c, v_c2);
  execute v_new;
end
$do$;

-- 2. _rtw_status: the follow-up is due at the earlier of the follow-up date
-- and the permission expiry.
create or replace function public._rtw_status(p_firm uuid)
returns table (
  roster_id uuid, name text, team_role text, status text, reason text,
  checked_on date, check_type text, follow_up_due date, submitted_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $fn$
  with latest as (
    select distinct on (c.roster_id) c.*,
           least(c.follow_up_due, c.permission_expires_on) as due_on
      from public.employer_rtw_checks c
     where c.employer_id = p_firm and c.roster_id is not null
     order by c.roster_id, c.checked_on desc, c.created_at desc
  ), sub as (
    select distinct on (s.roster_id) s.roster_id, s.submitted_at
      from public.employer_rtw_submissions s
     where s.employer_id = p_firm and s.status = 'submitted' and s.roster_id is not null
     order by s.roster_id, s.submitted_at desc
  )
  select r.id, r.name, r.team_role,
         case
           when l.id is null and r.team_role = 'Subcontractor' and r.join_date < date '2026-10-01'
             then 'not_required'
           when l.id is null then 'missing'
           when l.check_type = 'not_required' then 'not_required'
           when l.due_on is not null and l.due_on < current_date then 'overdue'
           when l.due_on is not null and l.due_on <= current_date + 28 then 'due'
           else 'checked'
         end,
         case
           when l.id is null and r.team_role = 'Subcontractor' and r.join_date < date '2026-10-01'
             then 'Engaged before 1 Oct 2026'
           when l.check_type = 'not_required' then l.not_required_reason
         end,
         l.checked_on, l.check_type, l.due_on, sub.submitted_at
    from public.employer_employees r
    left join latest l on l.roster_id = r.id
    left join sub on sub.roster_id = r.id
   where r.employer_id = p_firm
     and lower(coalesce(r.status, '')) <> 'archived';
$fn$;
revoke all on function public._rtw_status(uuid) from public, anon, authenticated;

-- 1. A worker's submission rings owner/admin only (they are the only ones who
-- can see it or record the check). Same function otherwise.
create or replace function public.rtw_submit_my_documents(
  p_roster_id uuid,
  p_share_code text,
  p_date_of_birth date,
  p_document_paths text[],
  p_note text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_r record;
  v_code text := nullif(upper(regexp_replace(coalesce(p_share_code, ''), '[^A-Za-z0-9]', '', 'g')), '');
  v_paths text[] := coalesce(p_document_paths, array[]::text[]);
  v_id uuid;
  p text;
begin
  select e.id, e.employer_id, e.name into v_r
    from public.employer_employees e
   where e.id = p_roster_id and e.user_id = auth.uid()
     and lower(coalesce(e.status, '')) = 'active' and e.employer_id is not null;
  if v_r.id is null then
    raise exception 'not_on_team';
  end if;
  if v_code is not null and v_code !~ '^W[A-Z0-9]{8}$' then
    raise exception 'share_code_format';
  end if;
  if v_code is null and cardinality(v_paths) = 0 then
    raise exception 'nothing_to_send';
  end if;
  foreach p in array v_paths loop
    if p not like v_r.employer_id || '/' || v_r.id || '/worker/%' then
      raise exception 'bad_path';
    end if;
  end loop;
  if p_date_of_birth is not null and (p_date_of_birth > current_date - 3650 or p_date_of_birth < date '1900-01-01') then
    raise exception 'date_of_birth';
  end if;

  insert into public.employer_rtw_submissions
    (employer_id, roster_id, user_id, share_code, date_of_birth, document_paths, note)
  values (v_r.employer_id, v_r.id, auth.uid(), v_code, p_date_of_birth, v_paths,
          nullif(left(trim(coalesce(p_note, '')), 1000), ''))
  returning id into v_id;

  insert into public.employer_expiry_sent (firm, ref)
  values (v_r.employer_id, 'log:rtw_submitted:' || v_r.id || ':' || current_date)
  on conflict do nothing;
  if found then
    perform public.notify_employer_admins_bell(
      v_r.employer_id, 'rtw_submitted',
      'Right to work: ' || coalesce(nullif(trim(v_r.name), ''), 'A team member') || ' sent their details',
      case when v_code is not null then 'A share code to check online. Record the check when you have done it.'
           else 'Documents to check. Record the check when you have seen the originals.' end,
      jsonb_build_object('employee_id', v_r.id, 'submission_id', v_id,
        'route', '/employer?section=team&member=' || v_r.id));
  end if;
  return jsonb_build_object('success', true, 'id', v_id);
end;
$fn$;
revoke all on function public.rtw_submit_my_documents(uuid, text, date, text[], text) from public, anon;
grant execute on function public.rtw_submit_my_documents(uuid, text, date, text[], text) to authenticated;

-- 3. Block mode on assign / book --------------------------------------------------
create or replace function public.trg_rtw_block_assignment()
returns trigger
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_firm uuid;
  v_name text;
  v_mode text;
  v_status text;
begin
  -- Signed-in requests only. Cron, service role and the public booking widget
  -- (whose suggestions already leave blocked people out) carry on.
  if auth.uid() is null or new.employee_id is null then
    return new;
  end if;
  -- Only when a person is newly put on the job.
  if tg_op = 'UPDATE'
     and new.employee_id is not distinct from old.employee_id
     and not (lower(coalesce(old.status, '')) in ('removed', 'cancelled')
              and lower(coalesce(new.status, '')) not in ('removed', 'cancelled')) then
    return new;
  end if;
  begin
    select e.employer_id, nullif(trim(e.name), '') into v_firm, v_name
      from public.employer_employees e where e.id = new.employee_id;
    if v_firm is null then return new; end if;
    select s.rtw_enforcement into v_mode
      from public.employer_hr_settings s where s.employer_id = v_firm;
    if coalesce(v_mode, 'warn') <> 'block' then return new; end if;
    select st.status into v_status
      from public._rtw_status(v_firm) st where st.roster_id = new.employee_id;
  exception when others then
    -- Fails open: a fault here never stops a booking.
    raise warning '[trg_rtw_block_assignment] %', sqlerrm;
    return new;
  end;
  if v_status in ('missing', 'overdue') then
    raise exception 'Right to work: % has no valid check on record. Your firm blocks booking until the check is recorded.',
      coalesce(v_name, 'This person')
      using errcode = 'P0001', hint = 'rtw_blocked';
  end if;
  return new;
end;
$fn$;
revoke all on function public.trg_rtw_block_assignment() from public, anon, authenticated;

drop trigger if exists rtw_block_assignment on public.employer_job_assignments;
create trigger rtw_block_assignment
  before insert or update of employee_id, status on public.employer_job_assignments
  for each row execute function public.trg_rtw_block_assignment();

-- 5. Retention: a real leaving date, and stray files -------------------------------
-- Files in rtw-evidence under the firm that no check or submission points at
-- (a storage delete that failed, an upload whose save failed). Over an hour
-- old so an upload in progress is never listed.
create or replace function public._rtw_orphan_paths(p_firm uuid)
returns text[]
language sql
stable
security definer
set search_path = public
as $fn$
  select coalesce(array_agg(o.name order by o.name), array[]::text[])
    from storage.objects o
   where o.bucket_id = 'rtw-evidence'
     and o.name like p_firm::text || '/%'
     and o.created_at < now() - interval '1 hour'
     and not exists (select 1 from public.employer_rtw_checks c
                      where c.employer_id = p_firm and o.name = any(c.evidence_paths))
     and not exists (select 1 from public.employer_rtw_submissions s
                      where s.employer_id = p_firm and o.name = any(s.document_paths));
$fn$;
revoke all on function public._rtw_orphan_paths(uuid) from public, anon, authenticated;

create or replace function public.hr_retention_queue(p_firm uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $fn$
declare
  v_firm uuid := coalesce(p_firm, auth.uid());
  v_rtw int; v_name int; v_cv int;
  v_leavers jsonb; v_apps jsonb;
begin
  if v_firm is null or not public.can_see_firm_money(v_firm) then
    return jsonb_build_object('error', 'not_allowed');
  end if;
  v_rtw := public._hr_months(v_firm, 'rtw');
  v_name := public._hr_months(v_firm, 'hr_file');
  v_cv := public._hr_months(v_firm, 'cvs');

  -- No leaving date, no countdown: the record waits until one is entered.
  with l as (
    select r.id, r.name,
           h.left_on,
           (r.phone is not null or r.email is not null or r.photo_url is not null
             or r.emergency_contact_name is not null or r.emergency_contact_phone is not null) as has_contact,
           h.name_removed_at is not null as name_removed,
           (select count(*) from public.employer_rtw_checks c where c.roster_id = r.id) as rtw_checks,
           (select count(*) from public.employer_rtw_submissions s where s.roster_id = r.id) as rtw_sent
      from public.employer_employees r
      left join public.employer_person_hr h on h.roster_id = r.id
     where r.employer_id = v_firm
       and lower(coalesce(r.status, '')) = 'archived'
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'roster_id', l.id, 'name', l.name, 'left_on', l.left_on,
           'needs_left_on', l.left_on is null
              and (l.rtw_checks + l.rtw_sent > 0 or not l.name_removed),
           'contact_on_file', l.has_contact,
           'rtw_records', l.rtw_checks + l.rtw_sent,
           'rtw_until', (l.left_on + make_interval(months => v_rtw))::date,
           'name_until', (l.left_on + make_interval(months => v_name))::date,
           'name_removed', l.name_removed,
           'ready', array_remove(array[
              case when l.has_contact then 'contact' end,
              case when l.left_on is not null and l.rtw_checks + l.rtw_sent > 0
                    and (l.left_on + make_interval(months => v_rtw))::date <= current_date then 'rtw' end,
              case when l.left_on is not null and not l.name_removed
                    and (l.left_on + make_interval(months => v_name))::date <= current_date then 'name' end
           ], null)
         ) order by l.left_on nulls first, l.name), '[]'::jsonb)
    into v_leavers
    from l;

  select coalesce(jsonb_agg(jsonb_build_object(
           'id', a.id, 'vacancy', v.title, 'decided_on', a.updated_at::date)
           order by a.updated_at), '[]'::jsonb)
    into v_apps
    from public.employer_vacancy_applications a
    join public.employer_vacancies v on v.id = a.vacancy_id
   where v.employer_id = v_firm
     and (a.status = 'Rejected' or (lower(coalesce(v.status, '')) in ('closed', 'filled') and coalesce(a.status, '') <> 'Hired'))
     and a.updated_at < now() - make_interval(months => v_cv)
     and (a.applicant_email is not null or a.applicant_phone is not null or a.cv_url is not null
          or a.cover_letter is not null);

  return jsonb_build_object(
    'months', jsonb_build_object('rtw', v_rtw, 'hr_file', v_name, 'cvs', v_cv),
    'leavers', v_leavers,
    'applications', v_apps,
    'orphan_files', to_jsonb(public._rtw_orphan_paths(v_firm)));
end;
$fn$;
revoke all on function public.hr_retention_queue(uuid) from public, anon;
grant execute on function public.hr_retention_queue(uuid) to authenticated;

create or replace function public.hr_anonymise_leaver(p_roster_id uuid, p_parts text[])
returns jsonb
language plpgsql
security definer
set search_path = public
as $fn$
declare
  r record;
  v_left date;
  v_paths text[] := array[]::text[];
  v_done text[] := array[]::text[];
begin
  select e.*, h.left_on as hr_left_on, h.name_removed_at
    into r
    from public.employer_employees e
    left join public.employer_person_hr h on h.roster_id = e.id
   where e.id = p_roster_id;
  if r.id is null or not public.can_see_firm_money(r.employer_id) then
    raise exception 'not_found';
  end if;
  if lower(coalesce(r.status, '')) <> 'archived' then
    raise exception 'not_a_leaver';
  end if;
  v_left := r.hr_left_on;
  -- The periods run from the real leaving date; never a guess.
  if v_left is null and ('rtw' = any(p_parts) or 'name' = any(p_parts)) then
    raise exception 'left_on_required';
  end if;

  insert into public.employer_person_hr (roster_id, employer_id)
  values (r.id, r.employer_id)
  on conflict (roster_id) do nothing;

  if 'contact' = any(p_parts) then
    update public.employer_employees
       set phone = null, email = null, photo_url = null,
           emergency_contact_name = null, emergency_contact_phone = null,
           emergency_contact_relationship = null, updated_at = now()
     where id = r.id;
    update public.employer_person_hr set contact_removed_at = now(), updated_at = now(), updated_by = auth.uid()
     where roster_id = r.id;
    v_done := array_append(v_done, 'contact');
  end if;

  if 'rtw' = any(p_parts) then
    if (v_left + make_interval(months => public._hr_months(r.employer_id, 'rtw')))::date > current_date then
      raise exception 'rtw_not_due';
    end if;
    select coalesce(array_agg(p), array[]::text[]) into v_paths
      from (
        select unnest(c.evidence_paths) p from public.employer_rtw_checks c where c.roster_id = r.id
        union
        select unnest(s.document_paths) from public.employer_rtw_submissions s where s.roster_id = r.id
      ) x;
    delete from public.employer_rtw_checks where roster_id = r.id;
    delete from public.employer_rtw_submissions where roster_id = r.id;
    update public.employer_person_hr set rtw_removed_at = now(), updated_at = now(), updated_by = auth.uid()
     where roster_id = r.id;
    v_done := array_append(v_done, 'rtw');
  end if;

  if 'name' = any(p_parts) and r.name_removed_at is null then
    if (v_left + make_interval(months => public._hr_months(r.employer_id, 'hr_file')))::date > current_date then
      raise exception 'name_not_due';
    end if;
    update public.employer_employees
       set name = 'Former team member', avatar_initials = 'FT', updated_at = now()
     where id = r.id;
    update public.employer_leave_requests set employee_name = 'Former team member'
     where employee_id = r.id;
    update public.employer_person_hr
       set name_removed_at = now(), probation_notes = null, updated_at = now(), updated_by = auth.uid()
     where roster_id = r.id;
    v_done := array_append(v_done, 'name');
  end if;

  return jsonb_build_object('success', true, 'done', to_jsonb(v_done), 'paths', to_jsonb(v_paths));
end;
$fn$;
revoke all on function public.hr_anonymise_leaver(uuid, text[]) from public, anon;
grant execute on function public.hr_anonymise_leaver(uuid, text[]) to authenticated;

-- 5. A worker may read and delete their own uploads that never reached a
-- submission (the send failed), so the app can tidy up after itself.
create or replace function public._rtw_worker_unsent_path(p_name text)
returns boolean
language sql
stable
security definer
set search_path = public
as $fn$
  select public._rtw_worker_owns_path(p_name)
     and not exists (select 1 from public.employer_rtw_submissions s
                      where s.employer_id = public._rtw_path_firm(p_name)
                        and p_name = any(s.document_paths));
$fn$;
revoke all on function public._rtw_worker_unsent_path(text) from public, anon;
grant execute on function public._rtw_worker_unsent_path(text) to authenticated;

drop policy if exists "rtw evidence worker read own unsent" on storage.objects;
create policy "rtw evidence worker read own unsent" on storage.objects
  for select to authenticated
  using (bucket_id = 'rtw-evidence' and public._rtw_worker_unsent_path(name));
drop policy if exists "rtw evidence worker delete own unsent" on storage.objects;
create policy "rtw evidence worker delete own unsent" on storage.objects
  for delete to authenticated
  using (bucket_id = 'rtw-evidence' and public._rtw_worker_unsent_path(name));
