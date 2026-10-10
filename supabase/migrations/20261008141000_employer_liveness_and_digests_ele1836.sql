-- ELE-1836 · Prove it is used (2/3): per-firm liveness for Admin → Employers,
-- the boss's Sunday "your team this week" email, the worker's Friday note.
--
-- Every send is recorded in employer_digest_log (the ELE-1730 lesson); repeat
-- sends are stopped by employer_expiry_sent (firm, ref) like every other
-- employer reminder.

-- ─── send log ────────────────────────────────────────────────────────────
create table if not exists public.employer_digest_log (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  recipient_id uuid,
  kind text not null check (kind in ('boss_weekly', 'worker_friday')),
  ref text not null,
  status text not null default 'queued' check (status in ('queued', 'sent', 'failed', 'skipped')),
  detail text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.employer_digest_log is
  '[EMPLOYER] ELE-1836: one row per weekly digest send — the boss''s Sunday email (boss_weekly: queued by queue_employer_weekly_digests, marked sent/failed by edge fn employer-weekly-digest) and the worker''s Friday push note (worker_friday: send_worker_friday_notes). Scope: employer_id = the firm; recipient_id = the auth user it went to. Rule: server-only, no client policies; repeat-send guard lives in employer_expiry_sent.';
create index if not exists employer_digest_log_firm_time on public.employer_digest_log (employer_id, created_at desc);
alter table public.employer_digest_log enable row level security;
revoke all on public.employer_digest_log from public, anon, authenticated;

-- ─── per-firm unsubscribe ────────────────────────────────────────────────
create table if not exists public.employer_digest_prefs (
  employer_id uuid primary key,
  token uuid not null unique default gen_random_uuid(),
  weekly_email_off_at timestamptz,
  updated_at timestamptz not null default now()
);
comment on table public.employer_digest_prefs is
  '[EMPLOYER] ELE-1836: the firm''s choice about the Sunday "your team this week" email. token = the secret in the email''s unsubscribe link (edge fn employer-weekly-digest ?unsubscribe= / ?resubscribe=); weekly_email_off_at set = do not send. Scope: employer_id = the firm. Rule: server-only, no client policies.';
alter table public.employer_digest_prefs enable row level security;
revoke all on public.employer_digest_prefs from public, anon, authenticated;

-- ─── which workflow an event belongs to ──────────────────────────────────
create or replace function public._eu_workflow(p_event text)
returns text language sql immutable set search_path = public as $$
  select case
    when p_event like 'invite_%' then 'team'
    when p_event = 'job_created' then 'jobs'
    when p_event in ('job_assigned', 'diary_moved') then 'diary'
    when p_event like 'timesheet_%' then 'timesheets'
    when p_event like 'expense_%' then 'expenses'
    when p_event like 'snag_%' then 'snags'
    when p_event like 'pack_%' then 'packs'
    when p_event like 'briefing_%' then 'briefings'
    when p_event = 'attestation_decided' then 'apprentice_hours'
    when p_event like 'invoice_%' then 'invoices'
    when p_event = 'checklist_completed' then 'checklists'
    else 'other'
  end;
$$;

-- Every firm we know of: anyone on the employer tier, plus anyone running a
-- roster or jobs (some firms pre-date the tier flag).
create or replace function public._eu_all_firms()
returns setof uuid language sql stable security definer set search_path = public as $$
  select p.id from public.profiles p
   where lower(coalesce(p.subscription_tier, '')) = 'employer' or p.role::text = 'employer'
  union select e.employer_id from public.employer_employees e where e.employer_id is not null
  union select j.user_id from public.employer_jobs j where j.user_id is not null
  union select s.employer_id from public.employer_seats s where s.employer_id is not null;
$$;

revoke all on function public._eu_workflow(text) from public, anon, authenticated;
revoke all on function public._eu_all_firms() from public, anon, authenticated;

-- ─── Admin → Employers: who is alive ─────────────────────────────────────
create or replace function public.admin_employer_liveness()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_out jsonb;
  v_order text[] := array['team', 'jobs', 'diary', 'timesheets', 'packs', 'briefings',
                          'snags', 'expenses', 'invoices', 'checklists'];
begin
  if auth.uid() is null or not public.is_admin() then
    raise exception 'admins only' using errcode = '42501';
  end if;

  with firms as (
    select f.id from public._eu_all_firms() f(id)
  ),
  ev as (
    select e.employer_id, e.event, public._eu_workflow(e.event) wf, e.actor_id, e.actor_role, e.created_at
      from public.employer_usage_events e
     where e.employer_id in (select id from firms)
  ),
  per as (
    select f.id,
           max(ev.created_at) last_event_at,
           min(ev.created_at) first_event_at,
           count(ev.event) filter (where ev.created_at >= now() - interval '7 days')::int events_7d,
           count(ev.event) filter (where ev.created_at >= now() - interval '30 days')::int events_30d,
           count(ev.event)::int events_all,
           coalesce(array_agg(distinct ev.wf) filter (where ev.created_at >= now() - interval '7 days'), '{}') wf_7d,
           coalesce(array_agg(distinct ev.wf) filter (where ev.created_at >= now() - interval '30 days'), '{}') wf_30d,
           coalesce(array_agg(distinct ev.wf) filter (where ev.wf is not null), '{}') wf_ever,
           count(distinct ev.actor_id) filter (where ev.created_at >= now() - interval '7 days'
                                               and ev.actor_role in ('owner', 'manager', 'worker'))::int people_7d
      from firms f left join ev on ev.employer_id = f.id
     group by f.id
  ),
  base as (
    select per.*,
           p.created_at owner_created_at,
           u.last_sign_in_at,
           coalesce(nullif(btrim(cp.company_name), ''), nullif(btrim(p.full_name), ''), 'Unnamed firm') firm_name,
           u.email owner_email,
           (select count(*) from public.employer_seats s where s.employer_id = per.id and s.status = 'active')::int seats,
           (select count(*) from public.employer_employees e
             where e.employer_id = per.id and lower(coalesce(e.status, '')) = 'active')::int roster,
           (select count(*) from public.employer_employees e
             where e.employer_id = per.id and lower(coalesce(e.status, '')) = 'active' and e.user_id is not null)::int linked,
           (select max(l.created_at) from public.employer_digest_log l
             where l.employer_id = per.id and l.kind = 'boss_weekly' and l.status = 'sent') last_digest_at,
           exists (select 1 from public.employer_digest_prefs dp
                    where dp.employer_id = per.id and dp.weekly_email_off_at is not null) digest_off
      from per
      left join public.profiles p on p.id = per.id
      left join auth.users u on u.id = per.id
      left join lateral (select c.company_name from public.company_profiles c
                          where c.user_id = per.id limit 1) cp on true
  ),
  aha as (
    select b.id,
           -- The firm's first week: from sign-up, unless the account is an old
           -- electrician account that turned into a firm later (then from its
           -- first firm action).
           case when b.first_event_at is not null
                 and b.owner_created_at is not null
                 and b.first_event_at > b.owner_created_at + interval '30 days'
                then b.first_event_at
                else coalesce(b.owner_created_at, b.first_event_at) end start_at
      from base b
  ),
  aha_days as (
    select a.id, a.start_at,
           (select count(distinct (e.created_at at time zone 'Europe/London')::date)
              from public.employer_usage_events e
             where e.employer_id = a.id
               and e.created_at >= a.start_at and e.created_at < a.start_at + interval '7 days')::int days
      from aha a
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'firm_id', b.id,
           'name', b.firm_name,
           'owner_email', b.owner_email,
           'signed_up_at', b.owner_created_at,
           'last_login_at', b.last_sign_in_at,
           'last_event_at', b.last_event_at,
           'events_7d', b.events_7d,
           'events_30d', b.events_30d,
           'events_all', b.events_all,
           'workflows_7d', to_jsonb(b.wf_7d),
           'workflows_30d', to_jsonb(b.wf_30d),
           'workflows_ever', to_jsonb(b.wf_ever),
           'never_done', to_jsonb(array(select w from unnest(v_order) with ordinality t(w, n)
                                         where not (w = any (b.wf_ever)) order by n)),
           'seats', b.seats,
           'roster', b.roster,
           'linked', b.linked,
           'people_7d', b.people_7d,
           'aha_start', d.start_at,
           'aha_days', d.days,
           'aha_state', case when d.days >= 3 then 'hit'
                             when d.start_at > now() - interval '7 days' then 'in_window'
                             else 'missed' end,
           'last_digest_at', b.last_digest_at,
           'digest_off', b.digest_off
         ) order by b.last_event_at desc nulls last), '[]'::jsonb)
    into v_out
    from base b join aha_days d on d.id = b.id;

  return jsonb_build_object('generated_at', now(), 'firms', v_out);
end;
$$;
revoke all on function public.admin_employer_liveness() from public, anon;
grant execute on function public.admin_employer_liveness() to authenticated;

-- ─── the boss's week, as numbers ─────────────────────────────────────────
-- p_sunday = the London date the email goes out. "Last week" is the 7 days
-- ending that Sunday; "this week" is the Monday to Sunday after it.
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
begin
  select array_agg(x) into v_office from (
    select p_firm x
    union select a.user_id from public.employer_admins a
     where a.employer_id = p_firm and a.status = 'active' and a.user_id is not null) o;

  select coalesce(nullif(btrim(c.company_name), ''), 'your firm') into v_name
    from public.company_profiles c where c.user_id = p_firm limit 1;

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
   where q.user_id = any (v_office) and q.invoice_sent_at is not null
     and (q.invoice_sent_at at time zone 'Europe/London')::date between v_from and v_to;

  select coalesce(sum(coalesce(nullif(q.total_paid, 0), q.total)), 0) into v_paid from public.quotes q
   where q.user_id = any (v_office) and q.invoice_status = 'paid' and q.invoice_paid_at is not null
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
   where q.user_id = any (v_office) and q.invoice_status in ('sent', 'overdue')
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
    'should_send', (v_events > 0 or v_booked > 0)
  );
end;
$$;
revoke all on function public._employer_weekly_digest(uuid, date) from public, anon, authenticated;

-- ─── Sunday 18:00 (London): queue the boss's email ───────────────────────
-- p_only + p_dry_run are for testing: a dry run returns what WOULD be sent
-- and writes nothing.
create or replace function public.queue_employer_weekly_digests(p_only uuid default null, p_dry_run boolean default false)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamp := now() at time zone 'Europe/London';
  v_sunday date := (now() at time zone 'Europe/London')::date;
  v_ref text;
  r record;
  d jsonb;
  v_token uuid;
  v_log uuid;
  v_key text;
  v_out jsonb := '[]'::jsonb;
begin
  if p_only is null then
    -- Cron fires at 17:00 and 18:00 UTC so 18:00 London lands in BST and GMT.
    if extract(isodow from v_now) <> 7 or extract(hour from v_now) <> 18 then
      return jsonb_build_object('skipped', 'not Sunday 6pm in London');
    end if;
  else
    -- A manual run reports on the most recent Sunday.
    v_sunday := v_sunday - (extract(isodow from v_sunday)::int % 7);
  end if;
  v_ref := 'weekly-digest:' || to_char(v_sunday, 'IYYY-"W"IW');

  if not p_dry_run then
    select decrypted_secret into v_key from vault.decrypted_secrets where name = 'service_role_key' limit 1;
    if v_key is null then
      raise warning '[queue_employer_weekly_digests] service_role_key not in vault';
      return jsonb_build_object('error', 'no service key');
    end if;
  end if;

  for r in
    select f.id firm from public._eu_all_firms() f(id)
     where (p_only is null or f.id = p_only)
       and not exists (select 1 from public.employer_digest_prefs dp
                        where dp.employer_id = f.id and dp.weekly_email_off_at is not null)
  loop
    begin
      d := public._employer_weekly_digest(r.firm, v_sunday);
      continue when not coalesce((d->>'should_send')::boolean, false);

      if p_dry_run then
        v_out := v_out || jsonb_build_array(jsonb_build_object('firm', r.firm, 'ref', v_ref, 'digest', d));
        continue;
      end if;

      insert into public.employer_expiry_sent (firm, ref) values (r.firm, v_ref) on conflict do nothing;
      continue when not found;

      insert into public.employer_digest_prefs (employer_id) values (r.firm) on conflict do nothing;
      select dp.token into v_token from public.employer_digest_prefs dp where dp.employer_id = r.firm;

      insert into public.employer_digest_log (employer_id, recipient_id, kind, ref, status)
      values (r.firm, r.firm, 'boss_weekly', v_ref, 'queued')
      returning id into v_log;

      perform net.http_post(
        url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/employer-weekly-digest',
        headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || v_key),
        body := jsonb_build_object('employer_id', r.firm, 'ref', v_ref, 'log_id', v_log,
                                   'unsubscribe_token', v_token, 'digest', d)
      );
      v_out := v_out || jsonb_build_array(jsonb_build_object('firm', r.firm, 'log_id', v_log));
    exception when others then
      raise warning '[queue_employer_weekly_digests] %: %', r.firm, sqlerrm;
    end;
  end loop;
  return jsonb_build_object('ref', v_ref, 'dry_run', p_dry_run, 'queued', v_out);
end;
$$;
revoke all on function public.queue_employer_weekly_digests(uuid, boolean) from public, anon, authenticated;

-- ─── Friday 16:00 (London): the worker's note (bell + push, no email) ────
create or replace function public.send_worker_friday_notes(p_only_employee uuid default null, p_dry_run boolean default false)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamp := now() at time zone 'Europe/London';
  v_today date := (now() at time zone 'Europe/London')::date;
  v_monday date;
  v_week text;
  r record;
  v_total numeric; v_ok numeric; v_wait numeric; v_back int; v_packs int;
  v_msg text;
  v_ref text;
  v_out jsonb := '[]'::jsonb;
begin
  if p_only_employee is null then
    if extract(isodow from v_now) <> 5 or extract(hour from v_now) <> 16 then
      return jsonb_build_object('skipped', 'not Friday 4pm in London');
    end if;
  end if;
  v_monday := v_today - (extract(isodow from v_today)::int - 1);
  v_week := to_char(v_monday, 'IYYY-"W"IW');

  for r in
    select e.id, e.user_id, e.employer_id
      from public.employer_employees e
     where e.user_id is not null and e.employer_id is not null
       and lower(coalesce(e.status, '')) = 'active'
       and e.user_id <> e.employer_id
       and (p_only_employee is null or e.id = p_only_employee)
  loop
    begin
      select coalesce(sum(t.total_hours), 0),
             coalesce(sum(t.total_hours) filter (where lower(t.status) = 'approved'), 0),
             coalesce(sum(t.total_hours) filter (where lower(t.status) in ('pending', 'submitted')), 0),
             count(*) filter (where lower(t.status) = 'rejected')
        into v_total, v_ok, v_wait, v_back
        from public.employer_timesheets t
       where t.employee_id = r.id and t.date between v_monday and v_today and t.total_hours is not null;

      select count(*) into v_packs
        from public.employer_job_pack_acknowledgements a
        join public.employer_job_packs p on p.id = a.job_pack_id
       where a.employee_id = r.id and a.acknowledged_at is null and p.sent_to_workers_at is not null;

      continue when v_total = 0 and v_packs = 0;

      v_msg := case
        when v_total = 0 then ''
        when v_ok = v_total then 'Hours this week: ' || trim(to_char(v_total, 'FM999990.##')) || ', all approved.'
        else 'Hours this week: ' || trim(to_char(v_total, 'FM999990.##')) || ', '
             || trim(to_char(v_ok, 'FM999990.##')) || ' approved'
             || case when v_wait > 0 then ', ' || trim(to_char(v_wait, 'FM999990.##')) || ' waiting for the office' else '' end
             || '.'
      end
      || case when v_back > 0 then ' ' || v_back || case when v_back = 1 then ' day was' else ' days were' end || ' sent back to fix.' else '' end
      || case when v_packs > 0 then ' ' || v_packs || case when v_packs = 1 then ' pack' else ' packs' end || ' to sign before Monday.' else '' end;
      v_msg := btrim(v_msg);

      if p_dry_run then
        v_out := v_out || jsonb_build_array(jsonb_build_object('employee', r.id, 'message', v_msg));
        continue;
      end if;

      v_ref := 'mine:friday-note:' || r.id || ':' || v_week;
      insert into public.employer_expiry_sent (firm, ref) values (r.user_id, v_ref) on conflict do nothing;
      continue when not found;

      perform public.worker_notify(r.user_id, 'weekly_note', 'Your week', v_msg,
        jsonb_build_object('employee_id', r.id,
          'route', case when v_total = 0 and v_packs > 0 then '/electrician/worker-tools/signoffs'
                        else '/electrician/worker-tools/timesheets' end));

      insert into public.employer_digest_log (employer_id, recipient_id, kind, ref, status, detail)
      values (r.employer_id, r.user_id, 'worker_friday', v_ref, 'sent', 'bell + push');
      v_out := v_out || jsonb_build_array(jsonb_build_object('employee', r.id));
    exception when others then
      raise warning '[send_worker_friday_notes] %: %', r.id, sqlerrm;
      begin
        insert into public.employer_digest_log (employer_id, recipient_id, kind, ref, status, detail)
        values (r.employer_id, r.user_id, 'worker_friday', coalesce(v_ref, 'friday-note:' || v_week), 'failed', left(sqlerrm, 300));
      exception when others then null;
      end;
    end;
  end loop;
  return jsonb_build_object('week', v_week, 'dry_run', p_dry_run, 'notes', v_out);
end;
$$;
revoke all on function public.send_worker_friday_notes(uuid, boolean) from public, anon, authenticated;

-- ─── crons ───────────────────────────────────────────────────────────────
do $$
begin
  perform cron.unschedule(jobid) from cron.job
   where jobname in ('employer-weekly-digest-sunday', 'employer-worker-friday-note');
end $$;
select cron.schedule('employer-weekly-digest-sunday', '0 17,18 * * 0',
  $$select public.queue_employer_weekly_digests();$$);
select cron.schedule('employer-worker-friday-note', '0 15,16 * * 5',
  $$select public.send_worker_friday_notes();$$);
