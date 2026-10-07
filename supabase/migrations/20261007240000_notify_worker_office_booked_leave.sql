-- ELE-1953 follow-up: leave the office books for someone (often already
-- agreed, so inserted as Approved) told nobody — the decision trigger only
-- fires on UPDATE. Tell the worker on insert when someone else entered it.
create or replace function public.trg_notify_leave_request()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_employer uuid;
  v_worker uuid;
  v_when text;
begin
  select e.employer_id, e.user_id into v_employer, v_worker
  from employer_employees e where e.id = new.employee_id;

  v_when := to_char(new.start_date, 'FMDD Mon') ||
    case when new.end_date is distinct from new.start_date
         then ' to ' || to_char(new.end_date, 'FMDD Mon') else '' end;

  if v_worker is not null and v_worker = auth.uid() then
    -- The worker asked: ring the office.
    perform notify_employer_bell(
      v_employer, 'leave_requested', 'Leave request',
      coalesce(new.employee_name, 'A team member') || ' requested ' ||
        coalesce(new.total_days::text, '?') || ' day(s) from ' || to_char(new.start_date, 'DD Mon'),
      jsonb_build_object('leave_id', new.id)
    );
  elsif v_worker is not null then
    -- The office booked it for them: tell the worker.
    perform worker_notify(
      v_worker, 'leave',
      case when lower(coalesce(new.status, '')) = 'approved'
           then 'Leave booked for you' else 'Leave added for you' end,
      v_when || ' — ' ||
        case when lower(coalesce(new.status, '')) = 'approved'
             then 'approved by the office' else 'waiting for approval' end,
      jsonb_build_object('leave_id', new.id, 'route', '/electrician/worker-tools/leave'));
  end if;
  return new;
exception when others then
  raise warning '[trg_notify_leave_request] %', sqlerrm;
  return new;
end;
$function$;
