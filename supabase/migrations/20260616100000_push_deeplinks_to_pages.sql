-- Point the remaining employer→worker pushes at their specific routed pages
-- (were the generic /electrician/worker-tools hub) so a tap lands in the right
-- place. Idempotent (create or replace).
-- Rollback: set each route back to '/electrician/worker-tools'.

create or replace function public.trg_notify_assignment()
returns trigger language plpgsql security definer set search_path to 'public' as $function$
declare v_worker uuid; v_title text;
begin
  select e.user_id into v_worker from employer_employees e where e.id = new.employee_id;
  select j.title into v_title from employer_jobs j where j.id = new.job_id;
  perform team_push(
    v_worker,
    'New job assignment',
    'You''ve been assigned to ' || coalesce(v_title, 'a job'),
    jsonb_build_object('job_id', new.job_id, 'route', '/electrician/worker-tools/jobs')
  );
  return new;
end; $function$;

create or replace function public.trg_notify_communication()
returns trigger language plpgsql security definer set search_path to 'public' as $function$
declare v_worker uuid; v_title text; v_type text;
begin
  select e.user_id into v_worker from employer_employees e where e.id = new.employee_id;
  if v_worker is null then return new; end if;
  select title, type into v_title, v_type from employer_communications where id = new.communication_id;
  perform team_push(
    v_worker,
    coalesce(nullif(v_title, ''), 'New message'),
    'New ' || coalesce(v_type, 'message') || ' from your employer',
    jsonb_build_object('communication_id', new.communication_id, 'route', '/electrician/worker-tools/comms')
  );
  return new;
end; $function$;

create or replace function public.trg_notify_expense_decision()
returns trigger language plpgsql security definer set search_path to 'public' as $function$
declare v_worker uuid;
begin
  if new.status is distinct from old.status and lower(new.status) in ('approved','rejected','paid') then
    select e.user_id into v_worker from employer_employees e where e.id = new.employee_id;
    if v_worker is not null then
      perform team_push(
        v_worker,
        'Expense ' || lower(new.status),
        '£' || coalesce(new.amount::text, '?') || coalesce(' — ' || new.category, '') || ' ' || lower(new.status),
        jsonb_build_object('expense_id', new.id, 'route', '/electrician/worker-tools/expenses')
      );
    end if;
  end if;
  return new;
end; $function$;

create or replace function public.trg_notify_snag_decision()
returns trigger language plpgsql security definer set search_path to 'public' as $function$
declare v_worker uuid;
begin
  if new.status is distinct from old.status and lower(new.status) in ('resolved','closed','done','fixed') then
    select e.user_id into v_worker from employer_employees e where e.id = new.reported_by;
    if v_worker is not null then
      perform team_push(
        v_worker,
        'Snag ' || lower(new.status),
        coalesce(new.title, 'Your reported issue') || ' — ' || lower(new.status),
        jsonb_build_object('snag_id', new.id, 'route', '/electrician/worker-tools/reports')
      );
    end if;
  end if;
  return new;
end; $function$;

create or replace function public.trg_notify_timesheet_decision()
returns trigger language plpgsql security definer set search_path to 'public' as $function$
declare v_worker uuid;
begin
  if new.status is distinct from old.status and lower(new.status) in ('approved', 'rejected') then
    select e.user_id into v_worker from employer_employees e where e.id = new.employee_id;
    perform team_push(
      v_worker,
      'Timesheet ' || lower(new.status),
      to_char(new.date, 'DD Mon') || ' — ' || coalesce(new.total_hours::text, '?') || ' hours ' || lower(new.status),
      jsonb_build_object('timesheet_id', new.id, 'route', '/electrician/worker-tools/timesheets')
    );
  end if;
  return new;
end; $function$;
