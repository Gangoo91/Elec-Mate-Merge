-- ELE-2061: right-to-work checks for every employee and individual subcontractor.
--
-- Law (checked 10 Oct 2026):
--   * Home Office, Employer's guide to right to work checks (1 October 2026):
--     https://www.gov.uk/government/publications/right-to-work-checks-employers-guide
--     Check before work starts; repeat before time-limited permission ends;
--     keep a copy for the employment plus two years, then destroy it.
--     Civil penalty up to £60,000 per illegal worker.
--   * Border Security, Asylum and Immigration Act 2025 s.48 extends the duty to
--     worker's contracts and individual sub-contractors, in force 1 Oct 2026
--     (S.I. 2026/683): https://www.legislation.gov.uk/ukpga/2025/31/section/48
--     Only arrangements entered into on or after 1 Oct 2026 are in scope.
--
-- Additive only:
--   * employer_hr_settings          firm setting: warn or block on unchecked people
--   * employer_rtw_checks           one row per check (owner/admin only)
--   * employer_rtw_submissions      documents / share code a worker sends in
--   * bucket rtw-evidence (private) owner/admin read; worker writes own folder
--   * _rtw_status / rtw_team_status / rtw_gate / my_rtw_status / rtw_submit_my_documents
--   * employer_expiry_items gains right-to-work follow-ups (bell + office summary)
--   * notification type rtw_submitted

-- 1. Firm HR settings --------------------------------------------------------
create table if not exists public.employer_hr_settings (
  employer_id uuid primary key,
  rtw_enforcement text not null default 'warn' check (rtw_enforcement in ('warn', 'block')),
  default_probation_months integer check (default_probation_months between 1 and 24),
  retention_overrides jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid default auth.uid()
);
alter table public.employer_hr_settings enable row level security;
comment on table public.employer_hr_settings is
  '[EMPLOYER] One row per firm: HR rules. rtw_enforcement (warn or block when an unchecked person is assigned, dispatched or paid), default probation length, retention overrides in months per record type. Scope: employer_id = the firm; everyone in my_employer_scope() reads; owner/admin (can_see_firm_money) write. Used by: People > Right to work and HR records (ELE-2061, ELE-2075).';

drop policy if exists "hr settings read in firm" on public.employer_hr_settings;
create policy "hr settings read in firm" on public.employer_hr_settings
  for select to authenticated
  using (employer_id in (select public.my_employer_scope()));
drop policy if exists "hr settings owner admin insert" on public.employer_hr_settings;
create policy "hr settings owner admin insert" on public.employer_hr_settings
  for insert to authenticated
  with check (public.can_see_firm_money(employer_id));
drop policy if exists "hr settings owner admin update" on public.employer_hr_settings;
create policy "hr settings owner admin update" on public.employer_hr_settings
  for update to authenticated
  using (public.can_see_firm_money(employer_id))
  with check (public.can_see_firm_money(employer_id));

-- 2. Check records -----------------------------------------------------------
create table if not exists public.employer_rtw_checks (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  roster_id uuid references public.employer_employees(id) on delete set null,
  person_name text,
  check_type text not null check (check_type in ('manual', 'online', 'idsp', 'ecs', 'not_required')),
  checked_on date not null,
  checked_by uuid default auth.uid(),
  checked_by_name text,
  documents_seen text,
  share_code text,
  permission text check (permission in ('unlimited', 'time_limited')),
  permission_expires_on date,
  follow_up_due date,
  restrictions text,
  not_required_reason text,
  evidence_paths text[] not null default '{}',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists employer_rtw_checks_roster_idx
  on public.employer_rtw_checks (roster_id, checked_on desc, created_at desc);
create index if not exists employer_rtw_checks_firm_idx on public.employer_rtw_checks (employer_id);
alter table public.employer_rtw_checks enable row level security;
comment on table public.employer_rtw_checks is
  '[EMPLOYER] Right-to-work checks, one row per check on a roster person (employee or individual subcontractor): type (manual, online share code, IDSP, ECS, or not required with a reason), date, who checked, documents seen, permission expiry and follow-up due, evidence paths in the private rtw-evidence bucket. Scope: employer_id = the firm; owner/admin only (can_see_firm_money). Status for the rest of the firm comes from rtw_team_status(). Rule: keep for the engagement plus 2 years (Home Office guide), then remove via hr_anonymise_leaver (ELE-2061).';

drop policy if exists "rtw checks owner admin read" on public.employer_rtw_checks;
create policy "rtw checks owner admin read" on public.employer_rtw_checks
  for select to authenticated
  using (public.can_see_firm_money(employer_id));
drop policy if exists "rtw checks owner admin insert" on public.employer_rtw_checks;
create policy "rtw checks owner admin insert" on public.employer_rtw_checks
  for insert to authenticated
  with check (
    public.can_see_firm_money(employer_id)
    and roster_id in (select e.id from public.employer_employees e
                       where e.employer_id = employer_rtw_checks.employer_id)
  );
drop policy if exists "rtw checks owner admin update" on public.employer_rtw_checks;
create policy "rtw checks owner admin update" on public.employer_rtw_checks
  for update to authenticated
  using (public.can_see_firm_money(employer_id))
  with check (public.can_see_firm_money(employer_id));
drop policy if exists "rtw checks owner admin delete" on public.employer_rtw_checks;
create policy "rtw checks owner admin delete" on public.employer_rtw_checks
  for delete to authenticated
  using (public.can_see_firm_money(employer_id));

-- 3. What a worker sends in --------------------------------------------------
create table if not exists public.employer_rtw_submissions (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  roster_id uuid references public.employer_employees(id) on delete set null,
  user_id uuid not null default auth.uid(),
  share_code text,
  date_of_birth date,
  document_paths text[] not null default '{}',
  note text,
  status text not null default 'submitted' check (status in ('submitted', 'used', 'dismissed')),
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid
);
create index if not exists employer_rtw_submissions_roster_idx
  on public.employer_rtw_submissions (roster_id, submitted_at desc);
alter table public.employer_rtw_submissions enable row level security;
comment on table public.employer_rtw_submissions is
  '[EMPLOYER] Right-to-work documents or a Home Office share code a roster person sent from Worker Tools, waiting for the firm to do the check. Scope: employer_id = the firm; owner/admin read and mark used/dismissed; the worker writes only through rtw_submit_my_documents() and reads only through my_rtw_status(). Files live in rtw-evidence under <firm>/<roster>/worker/ (ELE-2061).';

drop policy if exists "rtw submissions owner admin read" on public.employer_rtw_submissions;
create policy "rtw submissions owner admin read" on public.employer_rtw_submissions
  for select to authenticated
  using (public.can_see_firm_money(employer_id));
drop policy if exists "rtw submissions owner admin update" on public.employer_rtw_submissions;
create policy "rtw submissions owner admin update" on public.employer_rtw_submissions
  for update to authenticated
  using (public.can_see_firm_money(employer_id))
  with check (public.can_see_firm_money(employer_id));

-- 4. Private evidence bucket ---------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('rtw-evidence', 'rtw-evidence', false, 10485760,
        array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf'])
on conflict (id) do nothing;

-- Paths: <firm uuid>/<roster uuid>/<file>          (the office's copies)
--        <firm uuid>/<roster uuid>/worker/<file>   (what the worker sent)
create or replace function public._rtw_path_firm(p_name text)
returns uuid
language sql
immutable
set search_path = public
as $fn$
  select case when split_part(p_name, '/', 1) ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
              then split_part(p_name, '/', 1)::uuid end;
$fn$;
revoke all on function public._rtw_path_firm(text) from public, anon;
grant execute on function public._rtw_path_firm(text) to authenticated;

create or replace function public._rtw_worker_owns_path(p_name text)
returns boolean
language sql
stable
security definer
set search_path = public
as $fn$
  select auth.uid() is not null
     and split_part(p_name, '/', 3) = 'worker'
     and split_part(p_name, '/', 2) ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
     and exists (
       select 1 from public.employer_employees e
        where e.id = split_part(p_name, '/', 2)::uuid
          and e.employer_id = public._rtw_path_firm(p_name)
          and e.user_id = auth.uid()
          and lower(coalesce(e.status, '')) = 'active'
     );
$fn$;
revoke all on function public._rtw_worker_owns_path(text) from public, anon;
grant execute on function public._rtw_worker_owns_path(text) to authenticated;

drop policy if exists "rtw evidence owner admin read" on storage.objects;
create policy "rtw evidence owner admin read" on storage.objects
  for select to authenticated
  using (bucket_id = 'rtw-evidence'
         and public.can_see_firm_money(public._rtw_path_firm(name)));
drop policy if exists "rtw evidence owner admin upload" on storage.objects;
create policy "rtw evidence owner admin upload" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'rtw-evidence'
              and public.can_see_firm_money(public._rtw_path_firm(name)));
drop policy if exists "rtw evidence owner admin delete" on storage.objects;
create policy "rtw evidence owner admin delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'rtw-evidence'
         and public.can_see_firm_money(public._rtw_path_firm(name)));
drop policy if exists "rtw evidence worker upload own" on storage.objects;
create policy "rtw evidence worker upload own" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'rtw-evidence' and public._rtw_worker_owns_path(name));

-- 5. Status --------------------------------------------------------------------
-- checked | due (follow-up within 28 days) | overdue (follow-up passed: the
-- statutory excuse has lapsed) | missing | not_required (a recorded reason, or
-- a subcontractor engaged before 1 Oct 2026, when the extension started).
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
    select distinct on (c.roster_id) c.*
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
           when l.follow_up_due is not null and l.follow_up_due < current_date then 'overdue'
           when l.follow_up_due is not null and l.follow_up_due <= current_date + 28 then 'due'
           else 'checked'
         end,
         case
           when l.id is null and r.team_role = 'Subcontractor' and r.join_date < date '2026-10-01'
             then 'Engaged before 1 Oct 2026'
           when l.check_type = 'not_required' then l.not_required_reason
         end,
         l.checked_on, l.check_type, l.follow_up_due, sub.submitted_at
    from public.employer_employees r
    left join latest l on l.roster_id = r.id
    left join sub on sub.roster_id = r.id
   where r.employer_id = p_firm
     and lower(coalesce(r.status, '')) <> 'archived';
$fn$;
revoke all on function public._rtw_status(uuid) from public, anon, authenticated;

-- Everyone who can see the team sees the status (office books people on jobs).
create or replace function public.rtw_team_status(p_firm uuid default null)
returns table (
  roster_id uuid, name text, team_role text, status text, reason text,
  checked_on date, check_type text, follow_up_due date, submitted_at timestamptz
)
language plpgsql
stable
security definer
set search_path = public
as $fn$
declare
  v_firm uuid := coalesce(p_firm, auth.uid());
begin
  if v_firm is null or v_firm not in (select public.my_employer_scope()) then
    return;
  end if;
  return query select * from public._rtw_status(v_firm);
end;
$fn$;
revoke all on function public.rtw_team_status(uuid) from public, anon;
grant execute on function public.rtw_team_status(uuid) to authenticated;

-- The gate the assign / dispatch / approve / pay paths call. Fails open: an
-- unknown id is ignored, and the caller treats an error as "carry on".
create or replace function public.rtw_gate(p_employee_ids uuid[])
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $fn$
declare
  v_firm uuid;
  v_mode text;
  v_people jsonb;
begin
  select e.employer_id into v_firm
    from public.employer_employees e
   where e.id = any(coalesce(p_employee_ids, array[]::uuid[]))
     and e.employer_id in (select public.my_employer_scope())
   limit 1;
  if v_firm is null then
    return jsonb_build_object('mode', 'warn', 'people', '[]'::jsonb);
  end if;
  select coalesce(s.rtw_enforcement, 'warn') into v_mode
    from public.employer_hr_settings s where s.employer_id = v_firm;
  select coalesce(jsonb_agg(jsonb_build_object(
           'id', st.roster_id, 'name', st.name, 'status', st.status,
           'follow_up_due', st.follow_up_due, 'submitted', st.submitted_at is not null)
           order by st.name), '[]'::jsonb)
    into v_people
    from public._rtw_status(v_firm) st
   where st.roster_id = any(p_employee_ids)
     and st.status in ('missing', 'overdue');
  return jsonb_build_object('mode', coalesce(v_mode, 'warn'), 'people', v_people,
                            'can_record', public.can_see_firm_money(v_firm));
end;
$fn$;
revoke all on function public.rtw_gate(uuid[]) from public, anon;
grant execute on function public.rtw_gate(uuid[]) to authenticated;

-- 6. The worker's side ----------------------------------------------------------
create or replace function public.my_rtw_status()
returns table (
  roster_id uuid, employer_id uuid, firm_name text, status text,
  follow_up_due date, last_submitted_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $fn$
  select r.id, r.employer_id,
         coalesce(nullif(trim(cp.company_name), ''), 'Your employer'),
         st.status, st.follow_up_due,
         (select max(s.submitted_at) from public.employer_rtw_submissions s
           where s.roster_id = r.id and s.user_id = auth.uid())
    from public.employer_employees r
    left join public.company_profiles cp on cp.user_id = r.employer_id
    cross join lateral (
      select x.status, x.follow_up_due from public._rtw_status(r.employer_id) x
       where x.roster_id = r.id
    ) st
   where r.user_id = auth.uid()
     and lower(coalesce(r.status, '')) = 'active'
     and r.employer_id is not null;
$fn$;
revoke all on function public.my_rtw_status() from public, anon;
grant execute on function public.my_rtw_status() to authenticated;

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
    -- Right-to-work share codes are 9 characters and start with W (Home Office).
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

  -- One bell a day per person, however many times they press send.
  insert into public.employer_expiry_sent (firm, ref)
  values (v_r.employer_id, 'log:rtw_submitted:' || v_r.id || ':' || current_date)
  on conflict do nothing;
  if found then
    perform public.notify_employer_bell(
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

-- 7. Follow-up checks join the firm's daily expiry alerts ------------------------
-- notify_employer_expiries (cron 147) rings the bell at 30 days, 7 days and
-- overdue, once per stage (employer_expiry_sent), and lists them in the office
-- daily summary email.
do $do$
declare
  v_def text := pg_get_functiondef('public.employer_expiry_items()'::regprocedure);
  v_new text := $n$
  union all
  select l.employer_id, 'right_to_work', r.id, 'follow_up_due',
         'Right-to-work follow-up', l.follow_up_due,
         coalesce(nullif(trim(r.name), ''), 'Team member'),
         '/employer?section=team&member=' || r.id
    from (select distinct on (c.roster_id) c.roster_id, c.employer_id, c.follow_up_due, c.check_type
            from public.employer_rtw_checks c
           where c.roster_id is not null
           order by c.roster_id, c.checked_on desc, c.created_at desc) l
    join public.employer_employees r on r.id = l.roster_id and r.employer_id = l.employer_id
   where l.follow_up_due is not null
     and l.check_type <> 'not_required'
     and lower(coalesce(r.status, '')) <> 'archived'
$function$$n$;
begin
  if position('''right_to_work''' in v_def) > 0 then
    return;
  end if;
  if v_def !~ E'\\n\\$function\\$\\s*$' then
    raise exception 'employer_expiry_items: closing anchor not found';
  end if;
  execute regexp_replace(v_def, E'\\n\\$function\\$\\s*$', v_new);
end
$do$;

-- 8. Notification type ---------------------------------------------------------
insert into public.notification_types (type, category, push, importance)
values ('rtw_submitted', 'certificates_compliance', true, 1)
on conflict (type) do nothing;
