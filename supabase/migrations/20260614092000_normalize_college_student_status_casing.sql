-- Recurrence guard for the college_students.status casing split (active/Active).
-- ~15 college surfaces filter status === 'Active' case-sensitively, so a single
-- lowercase row silently drops a student from active counts / OTJ tracking /
-- comments / cohort tallies. Existing rows were normalised to 'Active'; this
-- trigger canonicalises KNOWN status values on write so an ad-hoc seed can't
-- reintroduce the split. Anything unrecognised is left exactly as-is (no
-- blanket transform). Applied live 2026-06-14.

create or replace function public.tg_normalize_college_student_status()
returns trigger
language plpgsql
as $function$
begin
  if new.status is not null then
    new.status := case lower(btrim(new.status))
      when 'active'    then 'Active'
      when 'withdrawn' then 'Withdrawn'
      when 'archived'  then 'Archived'
      when 'completed' then 'Completed'
      when 'on hold'   then 'On Hold'
      when 'paused'    then 'Paused'
      else new.status
    end;
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_normalize_college_student_status on public.college_students;
create trigger trg_normalize_college_student_status
  before insert or update of status on public.college_students
  for each row execute function public.tg_normalize_college_student_status();
