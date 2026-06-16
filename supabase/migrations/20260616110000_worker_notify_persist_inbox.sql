-- Worker in-app notification centre: persist employer→worker notifications so
-- they show in an in-app inbox (not OS-push only). worker_notify() writes a row
-- to employer_notifications (the existing per-user store; RLS already lets users
-- read/mark-read their own) AND fires the existing OS push. The 6 employer→worker
-- triggers are repointed to it. The employer bell path (notify_employer_bell) is
-- untouched, so no double-rows.
-- Rollback: repoint the 6 triggers back to perform team_push(...) and drop worker_notify.

alter table public.employer_notifications replica identity full;
do $$ begin
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and tablename='employer_notifications') then
    alter publication supabase_realtime add table public.employer_notifications;
  end if;
end $$;

create or replace function public.worker_notify(
  p_user_id uuid, p_type text, p_title text, p_message text, p_data jsonb default '{}'::jsonb
) returns void language plpgsql security definer set search_path to 'public' as $function$
begin
  if p_user_id is null then return; end if;
  insert into public.employer_notifications (user_id, type, title, message, action_url, metadata)
  values (p_user_id, p_type, p_title, p_message, p_data->>'route', p_data);
  perform team_push(p_user_id, p_title, p_message, p_data);
end; $function$;

create or replace function public.trg_notify_leave_decision()
returns trigger language plpgsql security definer set search_path to 'public' as $function$
declare v_worker uuid;
begin
  if new.status is distinct from old.status and lower(new.status) in ('approved','rejected') then
    select e.user_id into v_worker from employer_employees e where e.id = new.employee_id;
    perform worker_notify(v_worker, 'leave', 'Leave ' || lower(new.status),
      to_char(new.start_date, 'DD Mon') || ' to ' || to_char(new.end_date, 'DD Mon') || ' — ' || lower(new.status),
      jsonb_build_object('leave_id', new.id, 'route', '/electrician/worker-tools/leave'));
  end if;
  return new;
end; $function$;

create or replace function public.trg_notify_timesheet_decision()
returns trigger language plpgsql security definer set search_path to 'public' as $function$
declare v_worker uuid;
begin
  if new.status is distinct from old.status and lower(new.status) in ('approved','rejected') then
    select e.user_id into v_worker from employer_employees e where e.id = new.employee_id;
    perform worker_notify(v_worker, 'timesheet', 'Timesheet ' || lower(new.status),
      to_char(new.date, 'DD Mon') || ' — ' || coalesce(new.total_hours::text, '?') || ' hours ' || lower(new.status),
      jsonb_build_object('timesheet_id', new.id, 'route', '/electrician/worker-tools/timesheets'));
  end if;
  return new;
end; $function$;

create or replace function public.trg_notify_expense_decision()
returns trigger language plpgsql security definer set search_path to 'public' as $function$
declare v_worker uuid;
begin
  if new.status is distinct from old.status and lower(new.status) in ('approved','rejected','paid') then
    select e.user_id into v_worker from employer_employees e where e.id = new.employee_id;
    perform worker_notify(v_worker, 'expense', 'Expense ' || lower(new.status),
      '£' || coalesce(new.amount::text, '?') || coalesce(' — ' || new.category, '') || ' ' || lower(new.status),
      jsonb_build_object('expense_id', new.id, 'route', '/electrician/worker-tools/expenses'));
  end if;
  return new;
end; $function$;

create or replace function public.trg_notify_snag_decision()
returns trigger language plpgsql security definer set search_path to 'public' as $function$
declare v_worker uuid;
begin
  if new.status is distinct from old.status and lower(new.status) in ('resolved','closed','done','fixed') then
    select e.user_id into v_worker from employer_employees e where e.id = new.reported_by;
    perform worker_notify(v_worker, 'snag', 'Snag ' || lower(new.status),
      coalesce(new.title, 'Your reported issue') || ' — ' || lower(new.status),
      jsonb_build_object('snag_id', new.id, 'route', '/electrician/worker-tools/reports'));
  end if;
  return new;
end; $function$;

create or replace function public.trg_notify_communication()
returns trigger language plpgsql security definer set search_path to 'public' as $function$
declare v_worker uuid; v_title text; v_type text;
begin
  select e.user_id into v_worker from employer_employees e where e.id = new.employee_id;
  if v_worker is null then return new; end if;
  select title, type into v_title, v_type from employer_communications where id = new.communication_id;
  perform worker_notify(v_worker, 'communication', coalesce(nullif(v_title, ''), 'New message'),
    'New ' || coalesce(v_type, 'message') || ' from your employer',
    jsonb_build_object('communication_id', new.communication_id, 'route', '/electrician/worker-tools/comms'));
  return new;
end; $function$;

create or replace function public.trg_notify_assignment()
returns trigger language plpgsql security definer set search_path to 'public' as $function$
declare v_worker uuid; v_title text;
begin
  select e.user_id into v_worker from employer_employees e where e.id = new.employee_id;
  select j.title into v_title from employer_jobs j where j.id = new.job_id;
  perform worker_notify(v_worker, 'job_assignment', 'New job assignment',
    'You''ve been assigned to ' || coalesce(v_title, 'a job'),
    jsonb_build_object('job_id', new.job_id, 'route', '/electrician/worker-tools/jobs'));
  return new;
end; $function$;
