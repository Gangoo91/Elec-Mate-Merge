-- ELE-1828: Worker Tools works in a basement.
--
-- A task ticked with no signal reaches the server minutes or hours later.
-- trg_notify_task_status stamped completed_at := now() on the way to Done, so
-- the office saw the upload time, not when the work was done. It now keeps a
-- completed_at the phone supplies in the same update, provided it is sane:
-- not in the future (5 minutes' clock drift allowed) and no more than 7 days
-- old. Anything else, or no value, is now() as before. Office edits that do
-- not send completed_at behave exactly as they did.
--
-- Everything else in the function (bell to the employer) is unchanged.

create or replace function public.trg_notify_task_status()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_name text;
begin
  if new.status is distinct from old.status then
    if new.status = 'Done' then
      if new.completed_at is not null
         and new.completed_at is distinct from old.completed_at
         and new.completed_at <= now() + interval '5 minutes'
         and new.completed_at >= now() - interval '7 days' then
        new.completed_at := least(new.completed_at, now());
      else
        new.completed_at := now();
      end if;
    else
      new.completed_at := null;
    end if;

    if auth.uid() is distinct from new.employer_id and new.status in ('Done', 'Blocked') then
      select e.name into v_name from employer_employees e where e.id = new.assignee_employee_id;
      perform notify_employer_bell(
        new.employer_id,
        'task_' || lower(replace(new.status, ' ', '_')),
        'Task ' || lower(new.status),
        coalesce(v_name, 'A team member') || ' marked "' || new.title || '" ' || lower(new.status),
        jsonb_build_object('task_id', new.id, 'job_id', new.job_id)
      );
    end if;
  end if;
  return new;
exception when others then
  raise warning '[trg_notify_task_status] %', sqlerrm;
  return new;
end;
$function$;

revoke all on function public.trg_notify_task_status() from public, anon;
