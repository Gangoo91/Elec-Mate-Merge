-- Point the leave-decision push at the new routed page instead of the generic
-- Worker Tools hub, so a tap lands straight on /electrician/worker-tools/leave.
-- Idempotent (create or replace). Rollback: set route back to '/electrician/worker-tools'.
create or replace function public.trg_notify_leave_decision()
returns trigger language plpgsql security definer set search_path to 'public' as $function$
declare
  v_worker uuid;
begin
  if new.status is distinct from old.status and lower(new.status) in ('approved', 'rejected') then
    select e.user_id into v_worker from employer_employees e where e.id = new.employee_id;
    perform team_push(
      v_worker,
      'Leave ' || lower(new.status),
      to_char(new.start_date, 'DD Mon') || ' to ' || to_char(new.end_date, 'DD Mon') || ' — ' || lower(new.status),
      jsonb_build_object('leave_id', new.id, 'route', '/electrician/worker-tools/leave')
    );
  end if;
  return new;
end;
$function$;
