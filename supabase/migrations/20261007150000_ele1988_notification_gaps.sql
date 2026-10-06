-- ELE-1988 — close the silent notification gaps (+ ELE-1986 office email plumbing)
--
-- Full event matrix: docs/notifications-matrix.md
--
-- 1. No notification can block a business write: worker_notify and
--    notify_employer_bell swallow their own errors, and every notify trigger
--    that lacked a handler gets one (in-place patch, live body kept).
-- 2. employer_notifications rows carry employee_id (the roster member the event
--    is about), job_id and a tappable action_url, filled by one BEFORE INSERT
--    trigger so every writer (triggers, RPCs, direct inserts) is covered.
--    Because employee_id now lands on OFFICE-recipient rows too, the read/update
--    policies only honour the employee_id branch for legacy rows with no
--    user_id (none exist) — otherwise a worker could read the office's row.
-- 3. Push-only events (task assigned, pack to sign, office task comment, pack
--    chase) now also write a bell row via worker_notify.
-- 4. Timesheet rejection reason reaches the worker; client portal messages
--    reach managers as well as the owner.
-- 5. New: progress note → office; briefing signed → creator; worker joined
--    the team → office.
-- 6. Daily (cron 147, notify_compliance_expiries, extended — no new job):
--    vehicle MOT/tax/insurance/service, policy review, compliance document,
--    tool PAT/calibration and team certificate expiries, plus RAMS not signed
--    off for a job starting within 3 days → office bell + push.
-- 7. Office email (company_profiles.notification_email, ELE-1986): incidents
--    and near misses, invoices paid, and a weekday morning summary (timesheets,
--    leave and expenses awaiting approval + expiry reminders raised that day).
--    DB queues → edge function employer-office-alert (net.http_post + vault key,
--    same pattern as tg_employer_employee_seat). One email per event, ever
--    (employer_office_email_log unique key).

-- ─────────────────────────────────────────────────────────────────────────────
-- Patch helpers (session-temporary)
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function pg_temp.patch_fn(p_fn text, p_old text, p_new text)
returns void language plpgsql as $$
declare v_def text;
begin
  v_def := pg_get_functiondef(p_fn::regprocedure);
  if strpos(v_def, p_old) = 0 then
    raise exception 'ELE-1988 patch anchor not found in %', p_fn;
  end if;
  execute replace(v_def, p_old, p_new);
end $$;

-- Wrap a trigger function's outer block in "exception when others → warning".
create or replace function pg_temp.swallow_fn(p_fn text, p_label text)
returns void language plpgsql as $$
declare v_def text; v_new text;
begin
  v_def := pg_get_functiondef(p_fn::regprocedure);
  if v_def ~* ('exception\s+when\s+others\s+then\s+raise\s+warning\s+''\[' || p_label) then
    return; -- already patched
  end if;
  v_new := regexp_replace(
    v_def,
    'end;\s*\$function\$\s*$',
    E'exception when others then\n  raise warning ''[' || p_label || E'] %'', sqlerrm;\n  return new;\nend;\n$function$\n'
  );
  if v_new = v_def then
    raise exception 'ELE-1988 swallow anchor not found in %', p_fn;
  end if;
  execute v_new;
end $$;

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. Core senders never raise
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.worker_notify(
  p_user_id uuid, p_type text, p_title text, p_message text, p_data jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if p_user_id is null then return; end if;
  insert into public.employer_notifications (user_id, type, title, message, action_url, metadata)
  values (p_user_id, p_type, p_title, p_message, p_data->>'route', p_data);
  perform team_push(p_user_id, p_title, p_message, p_data);
exception when others then
  raise warning '[worker_notify] % / %: %', p_user_id, p_type, sqlerrm;
end; $function$;

-- notify_employer_bell is patched in section 2, once its resolver exists.

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. employee_id / job_id / action_url on employer_notifications
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.notification_employee_id(
  p_meta jsonb, p_recipient uuid, p_route text
)
returns uuid
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  v uuid;
  v_n int;
  re constant text := '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$';
  k text;
begin
  if p_meta is null then p_meta := '{}'::jsonb; end if;

  k := p_meta->>'employee_id';
  if k ~ re then
    select id into v from employer_employees where id = k::uuid;
    if v is not null then return v; end if;
  end if;

  k := p_meta->>'leave_id';
  if k ~ re then
    select employee_id into v from employer_leave_requests where id = k::uuid;
    if v is not null then return v; end if;
  end if;

  k := p_meta->>'expense_id';
  if k ~ re then
    select employee_id into v from employer_expense_claims where id = k::uuid;
    if v is not null then return v; end if;
  end if;

  k := p_meta->>'timesheet_id';
  if k ~ re then
    select employee_id into v from employer_timesheets where id = k::uuid;
    if v is not null then return v; end if;
  end if;

  k := coalesce(p_meta->>'issue_id', p_meta->>'snag_id');
  if k ~ re then
    select reported_by into v from job_issues where id = k::uuid;
    if v is not null then return v; end if;
  end if;

  k := p_meta->>'task_id';
  if k ~ re then
    select assignee_employee_id into v from employer_job_tasks where id = k::uuid;
    if v is not null then return v; end if;
  end if;

  k := p_meta->>'location_id';
  if k ~ re then
    select employee_id into v from employer_worker_locations where id = k::uuid;
    if v is not null then return v; end if;
  end if;

  k := p_meta->>'incident_id';
  if k ~ re then
    select coalesce(i.injured_employee_id,
                    case when i.reported_by ~ re then i.reported_by::uuid end)
      into v
      from employer_incidents i where i.id = k::uuid;
    if v is not null and exists (select 1 from employer_employees where id = v) then
      return v;
    end if;
    v := null;
  end if;

  k := p_meta->>'entry_id';  -- apprentice OTJ entry
  if k ~ re then
    select e.id into v
      from college_otj_entries o
      join employer_employees e on e.user_id = o.student_id
     where o.id = k::uuid
       and (e.employer_id = p_recipient or e.user_id = p_recipient)
     order by (lower(coalesce(e.status, '')) = 'archived'), e.created_at desc
     limit 1;
    if v is not null then return v; end if;
  end if;

  -- A worker-facing row with nothing else to go on is about the recipient:
  -- use their roster record when it is unambiguous.
  if coalesce(p_route, '') not like '/employer%' and p_recipient is not null then
    select count(*), min(id::text)::uuid into v_n, v
      from employer_employees
     where user_id = p_recipient
       and lower(coalesce(status, '')) <> 'archived';
    if v_n = 1 then return v; end if;
  end if;

  return null;
exception when others then
  return null;
end;
$function$;

revoke all on function public.notification_employee_id(jsonb, uuid, text) from public, anon, authenticated;

create or replace function public.fill_employer_notification_fields()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  re constant text := '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$';
  v_job uuid;
begin
  -- Tappable: several writers put the route only in metadata.
  if new.action_url is null then
    new.action_url := coalesce(new.metadata->>'route', new.metadata->>'link');
  end if;

  if new.employee_id is null then
    new.employee_id := public.notification_employee_id(new.metadata, new.user_id, new.action_url);
  end if;

  if new.job_id is null and (new.metadata->>'job_id') ~ re then
    select id into v_job from employer_jobs where id = (new.metadata->>'job_id')::uuid;
    new.job_id := v_job;
  end if;

  return new;
exception when others then
  raise warning '[fill_employer_notification_fields] %', sqlerrm;
  return new;
end;
$function$;

revoke all on function public.fill_employer_notification_fields() from public, anon, authenticated;

drop trigger if exists fill_employer_notification_fields on public.employer_notifications;
create trigger fill_employer_notification_fields
  before insert on public.employer_notifications
  for each row execute function public.fill_employer_notification_fields();

-- Office rows now carry the worker's employee_id: the employee_id branch must
-- only apply to legacy rows addressed by roster id alone (user_id null).
alter policy "Users read own notifications" on public.employer_notifications
  using (
    user_id = (select auth.uid())
    or (user_id is null and exists (
      select 1 from public.employer_employees e
       where e.id = employer_notifications.employee_id
         and e.user_id = (select auth.uid())))
  );

alter policy "Users mark own notifications read" on public.employer_notifications
  using (
    user_id = (select auth.uid())
    or (user_id is null and exists (
      select 1 from public.employer_employees e
       where e.id = employer_notifications.employee_id
         and e.user_id = (select auth.uid())))
  )
  with check (
    user_id = (select auth.uid())
    or (user_id is null and exists (
      select 1 from public.employer_employees e
       where e.id = employer_notifications.employee_id
         and e.user_id = (select auth.uid())))
  );

-- Now that the resolver exists, apply the notify_employer_bell patch for real.
select pg_temp.patch_fn(
  'public.notify_employer_bell(uuid,text,text,text,jsonb)',
  E'  if v_route is not null then\n    v_meta := v_meta || jsonb_build_object(''route'', v_route);\n  end if;',
  E'  if v_route is not null then\n    v_meta := v_meta || jsonb_build_object(''route'', v_route);\n  end if;\n\n  -- ELE-1988: name the roster member the event is about.\n  if (v_meta->>''employee_id'') is null then\n    v_meta := jsonb_strip_nulls(v_meta || jsonb_build_object(\n      ''employee_id'', public.notification_employee_id(v_meta, p_employer, v_route)));\n  end if;'
);
select pg_temp.patch_fn(
  'public.notify_employer_bell(uuid,text,text,text,jsonb)',
  E'    exception when others then\n      raise warning ''[notify_employer_bell] recipient % failed: %'', r.uid, sqlerrm;\n    end;\n  end loop;\nend;',
  E'    exception when others then\n      raise warning ''[notify_employer_bell] recipient % failed: %'', r.uid, sqlerrm;\n    end;\n  end loop;\nexception when others then\n  raise warning ''[notify_employer_bell] % / %: %'', p_employer, p_type, sqlerrm;\nend;'
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. Push-only events also land in the bell
-- ─────────────────────────────────────────────────────────────────────────────
select pg_temp.patch_fn(
  'public.trg_notify_task_assignment()',
  E'    perform team_push(\n      v_worker,\n      ''New task: '' || new.title,',
  E'    perform worker_notify(\n      v_worker, ''task_assigned'',\n      ''New task: '' || new.title,'
);

select pg_temp.patch_fn(
  'public.trg_notify_pack_ack()',
  E'    perform team_push(\n      v_worker,\n      ''Job pack to sign'',',
  E'    perform worker_notify(\n      v_worker, ''pack_to_sign'',\n      ''Job pack to sign'','
);
-- name the signer on the office row
select pg_temp.patch_fn(
  'public.trg_notify_pack_ack()',
  E'      jsonb_build_object(''job_pack_id'', new.job_pack_id)\n    );',
  E'      jsonb_build_object(''job_pack_id'', new.job_pack_id, ''employee_id'', new.employee_id)\n    );'
);

select pg_temp.patch_fn(
  'public.trg_notify_task_comment()',
  E'perform team_push(v_worker, ''Comment on: '' || v_task.title,',
  E'perform worker_notify(v_worker, ''task_comment'', ''Comment on: '' || v_task.title,'
);
-- a manager's comment is the office talking, not a worker
select pg_temp.patch_fn(
  'public.trg_notify_task_comment()',
  E'if auth.uid() = v_task.employer_id then',
  E'if v_task.employer_id in (select public.my_employer_scope()) then'
);

select pg_temp.patch_fn(
  'public.chase_pack_signoff(uuid)',
  E'  perform team_push(\n    v_worker,\n    ''Reminder: sign your job pack'',',
  E'  perform worker_notify(\n    v_worker, ''pack_chase'',\n    ''Reminder: sign your job pack'','
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. Reasons reach the worker; portal messages reach managers
-- ─────────────────────────────────────────────────────────────────────────────
select pg_temp.patch_fn(
  'public.trg_notify_timesheet_decision()',
  E'coalesce(new.total_hours::text, ''?'') || '' hours '' || lower(new.status),',
  E'coalesce(new.total_hours::text, ''?'') || '' hours '' || lower(new.status) ||\n        case when lower(new.status) = ''rejected'' and nullif(trim(new.rejection_reason), '''') is not null\n             then '': '' || left(new.rejection_reason, 140) else '''' end,'
);

create or replace function public.notify_client_portal_message()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_owner uuid;
begin
  if new.sender_type <> 'client' then return new; end if;
  select user_id into v_owner from public.client_portal_links
    where access_token = new.access_token limit 1;
  if v_owner is null then return new; end if;
  -- notify_employer_bell: owner + active managers, tappable row.
  perform public.notify_employer_bell(
    v_owner, 'client_message', 'New message from a client',
    left(new.message, 140),
    jsonb_build_object('job_id', new.job_id, 'route', '/employer?section=clientportal'));
  return new;
exception when others then
  raise warning '[notify_client_portal_message] %', sqlerrm;
  return new;
end; $function$;

-- ─────────────────────────────────────────────────────────────────────────────
-- 1b. Every notify trigger swallows its own errors
-- ─────────────────────────────────────────────────────────────────────────────
select pg_temp.swallow_fn('public.notify_worker_status_override()', 'notify_worker_status_override');
select pg_temp.swallow_fn('public.notify_owner_new_lead()', 'notify_owner_new_lead');
select pg_temp.swallow_fn('public.trg_notify_assignment()', 'trg_notify_assignment');
select pg_temp.swallow_fn('public.trg_notify_communication()', 'trg_notify_communication');
select pg_temp.swallow_fn('public.trg_notify_expense_claim()', 'trg_notify_expense_claim');
select pg_temp.swallow_fn('public.trg_notify_expense_decision()', 'trg_notify_expense_decision');
select pg_temp.swallow_fn('public.trg_notify_leave_decision()', 'trg_notify_leave_decision');
select pg_temp.swallow_fn('public.trg_notify_leave_request()', 'trg_notify_leave_request');
select pg_temp.swallow_fn('public.trg_notify_pack_ack()', 'trg_notify_pack_ack');
select pg_temp.swallow_fn('public.trg_notify_snag()', 'trg_notify_snag');
select pg_temp.swallow_fn('public.trg_notify_snag_decision()', 'trg_notify_snag_decision');
select pg_temp.swallow_fn('public.trg_notify_task_assignment()', 'trg_notify_task_assignment');
select pg_temp.swallow_fn('public.trg_notify_task_comment()', 'trg_notify_task_comment');
select pg_temp.swallow_fn('public.trg_notify_task_status()', 'trg_notify_task_status');
select pg_temp.swallow_fn('public.trg_notify_timesheet_decision()', 'trg_notify_timesheet_decision');
select pg_temp.swallow_fn('public.trg_notify_timesheet_submission()', 'trg_notify_timesheet_submission');

-- ─────────────────────────────────────────────────────────────────────────────
-- Registered types for the new events (bell + push via notify_user)
-- ─────────────────────────────────────────────────────────────────────────────
insert into public.notification_types (type, category, push, importance) values
  ('briefing_signed', 'tasks_projects', true, 1),
  ('team_joined', 'tasks_projects', true, 1),
  ('employer_expiry', 'certificates_compliance', true, 1)
on conflict (type) do nothing;

-- ─────────────────────────────────────────────────────────────────────────────
-- 5a. Progress note (worker) → office
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.notify_progress_note()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_job record;
  v_emp record;
begin
  if coalesce(new.comment_type, '') <> 'progress' or new.task_id is not null then
    return new;
  end if;
  if auth.uid() is null then return new; end if;

  select j.id, j.title, j.user_id into v_job from public.employer_jobs j where j.id = new.job_id;
  if v_job.user_id is null then return new; end if;

  -- The office's own notes (incl. the automatic "Progress updated to 40%") stay quiet.
  if v_job.user_id in (select public.my_employer_scope()) then return new; end if;

  select e.id, e.name into v_emp
    from public.employer_employees e
   where e.employer_id = v_job.user_id and e.user_id = auth.uid()
   order by (lower(coalesce(e.status, '')) = 'archived'), e.created_at desc
   limit 1;
  if v_emp.id is null then return new; end if;

  perform public.notify_employer_bell(
    v_job.user_id,
    'progress_note',
    coalesce(nullif(trim(v_emp.name), ''), nullif(trim(new.author_name), ''), 'A team member')
      || ' added a progress note',
    coalesce(v_job.title || ': ', '') || left(coalesce(new.content, ''), 140),
    jsonb_build_object(
      'route', '/employer?section=progresslogs',
      'job_id', new.job_id,
      'comment_id', new.id,
      'employee_id', v_emp.id
    )
  );
  return new;
exception when others then
  raise warning '[notify_progress_note] %', sqlerrm;
  return new;
end;
$function$;

revoke all on function public.notify_progress_note() from public, anon, authenticated;

drop trigger if exists trg_notify_progress_note on public.employer_job_comments;
create trigger trg_notify_progress_note
  after insert on public.employer_job_comments
  for each row
  when (new.comment_type = 'progress' and new.task_id is null)
  execute function public.notify_progress_note();

-- ─────────────────────────────────────────────────────────────────────────────
-- 5b. Briefing signed → the briefing's creator (notify only; briefing logic
--     untouched). Signatures taken on the presenter's own device stay quiet.
--     One bell per signature; push de-duplicated per briefing per day.
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.notify_briefing_signed()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_b record;
  v_name text;
  v_signed int;
  v_total int;
begin
  if new.acknowledged is not true then return new; end if;
  if tg_op = 'UPDATE' and old.acknowledged is true then return new; end if;

  select b.id, b.user_id, b.title into v_b from public.briefings b where b.id = new.briefing_id;
  if v_b.user_id is null then return new; end if;
  if auth.uid() is not distinct from v_b.user_id then return new; end if;

  if new.employee_id is not null then
    select e.name into v_name from public.employer_employees e where e.id = new.employee_id;
  end if;
  v_name := coalesce(nullif(trim(v_name), ''), nullif(trim(new.guest_name), ''), 'Someone');

  select count(*) filter (where a.acknowledged is true), count(*)
    into v_signed, v_total
    from public.briefing_attendees a where a.briefing_id = new.briefing_id;

  perform public.notify_employer_bell(
    v_b.user_id,
    'briefing_signed',
    v_name || ' signed the briefing',
    coalesce(nullif(trim(v_b.title), ''), 'Briefing') || ' · ' || v_signed || ' of ' || v_total || ' signed',
    jsonb_build_object(
      'route', '/employer?section=briefings',
      'briefing_id', v_b.id,
      'ref_id', 'briefing:' || v_b.id,
      'employee_id', new.employee_id
    )
  );
  return new;
exception when others then
  raise warning '[notify_briefing_signed] %', sqlerrm;
  return new;
end;
$function$;

revoke all on function public.notify_briefing_signed() from public, anon, authenticated;

drop trigger if exists trg_notify_briefing_signed on public.briefing_attendees;
create trigger trg_notify_briefing_signed
  after insert or update of acknowledged on public.briefing_attendees
  for each row execute function public.notify_briefing_signed();

-- ─────────────────────────────────────────────────────────────────────────────
-- 5c. Worker joined the team → office. Any non-pending, non-revoked status
--     counts as joined, so a free-role seat status (ELE-1831) is covered too.
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.notify_team_member_joined()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_name text;
begin
  if new.employer_id is null or new.user_id is null then return new; end if;
  if coalesce(new.status, '') in ('pending', 'revoked') then return new; end if;
  if tg_op = 'UPDATE'
     and coalesce(old.status, '') not in ('pending', 'revoked')
     and old.user_id is not null then
    return new;
  end if;
  -- The office linking someone by hand already knows.
  if new.employer_id in (select public.my_employer_scope()) then return new; end if;

  select e.name into v_name from public.employer_employees e where e.id = new.employee_id;

  perform public.notify_employer_bell(
    new.employer_id,
    'team_joined',
    coalesce(nullif(trim(v_name), ''), 'A team member') || ' joined your team',
    'They can now see their jobs, clock in and send timesheets.',
    jsonb_build_object(
      'route', '/employer?section=team' || coalesce('&member=' || new.employee_id, ''),
      'employee_id', new.employee_id,
      'ref_id', 'seat:' || new.id
    )
  );
  return new;
exception when others then
  raise warning '[notify_team_member_joined] %', sqlerrm;
  return new;
end;
$function$;

revoke all on function public.notify_team_member_joined() from public, anon, authenticated;

drop trigger if exists trg_notify_team_member_joined on public.employer_seats;
create trigger trg_notify_team_member_joined
  after insert or update of status, user_id on public.employer_seats
  for each row execute function public.notify_team_member_joined();

-- ─────────────────────────────────────────────────────────────────────────────
-- 7. Office email queue (ELE-1986)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.employer_office_email_log (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null references public.profiles(id) on delete cascade,
  kind text not null,
  ref text not null,
  created_at timestamptz not null default now(),
  unique (employer_id, kind, ref)
);
alter table public.employer_office_email_log enable row level security;
revoke all on public.employer_office_email_log from anon, authenticated;
comment on table public.employer_office_email_log is
  '[EMPLOYER HUB] One row per office alert email queued to company_profiles.notification_email (incident, invoice_paid, daily_summary). Scope: employer_id = the firm (owner profiles.id). Used by: queue_office_email() → edge fn employer-office-alert. Rule: unique (employer_id, kind, ref) = an event is emailed once, ever; no client access (RLS on, no policies).';

create or replace function public.queue_office_email(
  p_employer uuid, p_kind text, p_ref text, p_payload jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_to text;
  v_id uuid;
  v_key text;
begin
  if p_employer is null or p_kind is null or p_ref is null then return; end if;

  select nullif(trim(cp.notification_email), '') into v_to
    from public.company_profiles cp where cp.user_id = p_employer
   limit 1;
  if v_to is null then return; end if;

  insert into public.employer_office_email_log (employer_id, kind, ref)
  values (p_employer, p_kind, p_ref)
  on conflict (employer_id, kind, ref) do nothing
  returning id into v_id;
  if v_id is null then return; end if;

  select decrypted_secret into v_key
    from vault.decrypted_secrets where name = 'service_role_key' limit 1;
  if v_key is null then
    raise warning '[queue_office_email] service_role_key not found in vault';
    return;
  end if;

  -- The function re-reads the address itself; it never travels in the queue.
  perform net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/employer-office-alert',
    headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || v_key),
    body := jsonb_build_object(
      'employer_id', p_employer,
      'kind', p_kind,
      'ref', p_ref,
      'payload', coalesce(p_payload, '{}'::jsonb)
    )
  );
exception when others then
  raise warning '[queue_office_email] % / %: %', p_employer, p_kind, sqlerrm;
end;
$function$;

revoke all on function public.queue_office_email(uuid, text, text, jsonb) from public, anon, authenticated;

-- Incidents and near misses → office email, alongside the existing bell.
select pg_temp.patch_fn(
  'public.notify_incident()',
  E'        ''job_id'', NEW.job_id\n      )\n    );\n    return NEW;',
  E'        ''job_id'', NEW.job_id\n      )\n    );\n    perform public.queue_office_email(\n      NEW.employer_id, ''incident'', NEW.id::text,\n      jsonb_build_object(''incident_id'', NEW.id));\n    return NEW;'
);

-- Invoices paid → office email. Invoices live on quotes (legacy path, most
-- invoices) and on invoices (deposit / new path); both are covered.
create or replace function public.notify_office_invoice_paid()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_firm uuid;
begin
  if new.user_id is null then return new; end if;
  -- An invoice raised by a manager belongs to the firm they manage.
  select a.employer_id into v_firm
    from public.employer_admins a
   where a.user_id = new.user_id and a.status = 'active'
   limit 1;
  v_firm := coalesce(v_firm, new.user_id);

  perform public.queue_office_email(
    v_firm, 'invoice_paid', tg_table_name || ':' || new.id,
    jsonb_build_object('source', tg_table_name, 'id', new.id));
  return new;
exception when others then
  raise warning '[notify_office_invoice_paid] %', sqlerrm;
  return new;
end;
$function$;

revoke all on function public.notify_office_invoice_paid() from public, anon, authenticated;

drop trigger if exists trg_office_email_invoice_paid on public.quotes;
create trigger trg_office_email_invoice_paid
  after update of invoice_status on public.quotes
  for each row
  when (new.invoice_status = 'paid' and old.invoice_status is distinct from 'paid')
  execute function public.notify_office_invoice_paid();

drop trigger if exists trg_office_email_invoice_paid on public.invoices;
create trigger trg_office_email_invoice_paid
  after update of paid_at on public.invoices
  for each row
  when (new.paid_at is not null and old.paid_at is null)
  execute function public.notify_office_invoice_paid();

-- ─────────────────────────────────────────────────────────────────────────────
-- 6. Daily expiries (extends cron 147 via notify_compliance_expiries)
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.employer_expiry_items()
returns table (
  firm uuid, kind text, item_id uuid, field text, label text, due date, name text, route text
)
language sql
stable
security definer
set search_path to 'public'
as $function$
  select v.user_id, 'vehicle', v.id, f.field, f.label, f.due,
         coalesce(nullif(trim(v.registration), ''), nullif(trim(concat_ws(' ', v.make, v.model)), ''), 'A vehicle'),
         '/employer?section=fleet'
    from public.vehicles v
   cross join lateral (values
     ('mot_expiry', 'MOT', v.mot_expiry),
     ('tax_expiry', 'Road tax', v.tax_expiry),
     ('insurance_expiry', 'Insurance', v.insurance_expiry),
     ('next_service', 'Service', v.next_service)) f(field, label, due)
   where f.due is not null and coalesce(v.status, '') <> 'Off Road'
  union all
  select p.user_id, 'policy', p.id, 'review_date', 'Policy review', p.review_date,
         coalesce(nullif(trim(p.name), ''), 'A policy'), '/employer?section=policies'
    from public.employer_policies p
   where p.review_date is not null and coalesce(p.status, '') not in ('Draft', 'Archived')
  union all
  select d.user_id, 'compliance_document', d.id, 'expiry_date', 'Document renewal', d.expiry_date,
         coalesce(nullif(trim(d.title), ''), 'A compliance document'), '/employer?section=compliance'
    from public.compliance_documents d
   where d.expiry_date is not null and coalesce(d.status, '') <> 'Draft'
  union all
  select t.user_id, 'tool', t.id, f.field, f.label, f.due,
         coalesce(nullif(trim(t.name), ''), 'A tool'), '/employer?section=procurement'
    from public.employer_company_tools t
   cross join lateral (values
     ('pat_due', 'PAT test', t.pat_due),
     ('next_calibration', 'Calibration', t.next_calibration)) f(field, label, due)
   where f.due is not null and coalesce(t.status, '') not in ('Lost', 'Written Off')
  union all
  select e.employer_id, 'team_certification', c.id, 'expiry_date', 'Certificate renewal', c.expiry_date,
         coalesce(nullif(trim(c.name), ''), 'A certificate') || ' (' || coalesce(nullif(trim(e.name), ''), 'team member') || ')',
         '/employer?section=team&member=' || e.id
    from public.employer_certifications c
    join public.employer_employees e on e.id = c.employee_id
   where c.expiry_date is not null
     and e.employer_id is not null
     and lower(coalesce(e.status, '')) <> 'archived'
$function$;

revoke all on function public.employer_expiry_items() from public, anon, authenticated;

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
begin
  -- (a) Dated items: once at ~30 days, once inside 7 days, once when overdue.
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
      continue when exists (
        select 1 from public.user_notifications n
         where n.user_id = r.firm and n.type = 'employer_expiry'
           and n.created_at > now() - interval '120 days'
           and n.metadata->>'ref_id' = v_ref);
      v_days := r.due - current_date;
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

  -- (b) RAMS still not signed off for a job starting within 3 days.
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
      continue when exists (
        select 1 from public.user_notifications n
         where n.user_id = r.firm and n.type = 'employer_expiry'
           and n.created_at > now() - interval '120 days'
           and n.metadata->>'ref_id' = v_ref);
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

  -- (c) Weekday office summary email, only when something is waiting.
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
        select count(*) into v_new
          from public.user_notifications n
         where n.user_id = r.firm and n.type = 'employer_expiry'
           and n.created_at >= date_trunc('day', now());

        continue when v_ts + v_leave + v_exp + v_new = 0;

        select coalesce(jsonb_agg(x order by x->>'due'), '[]'::jsonb) into v_list
          from (
            select jsonb_build_object('label', i.label, 'name', i.name, 'due', i.due, 'route', i.route) as x
              from public.employer_expiry_items() i
             where i.firm = r.firm
               and i.due <= current_date + 30 and i.due >= current_date - 60
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

-- Hook into the existing 08:15 daily job (cron 147) instead of a parallel one.
do $$
declare v_def text; v_new text;
begin
  v_def := pg_get_functiondef('public.notify_compliance_expiries()'::regprocedure);
  if strpos(v_def, 'notify_employer_expiries') > 0 then return; end if;
  v_new := regexp_replace(
    v_def,
    'end loop;\s*end;\s*\$function\$\s*$',
    E'end loop;\n\n  -- ELE-1988: firm-level expiries + the office summary email.\n  begin\n    perform public.notify_employer_expiries();\n  exception when others then\n    raise warning ''[notify_compliance_expiries] employer expiries: %'', sqlerrm;\n  end;\nend;\n$function$\n'
  );
  if v_new = v_def then
    raise exception 'ELE-1988: notify_compliance_expiries anchor not found';
  end if;
  execute v_new;
end $$;
