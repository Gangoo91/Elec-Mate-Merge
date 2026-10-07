-- Andrew, 7 Oct: a learner's break reads "On Break", not "Break in learning".
-- Canonical college_students.status becomes On Break; the old wording and the
-- usual variants map to it on write, so older builds keep working.
alter table public.college_students drop constraint if exists college_students_status_canon;

create or replace function public.tg_canon_college_students()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.status := public._canon_value(new.status,
    array['Active','On Break','Suspended','Withdrawn','Completed','Transferred','Archived'],
    '{"break in learning":"On Break","break":"On Break","on hold":"On Break","paused":"On Break","bil":"On Break"}');
  new.risk_level := public._canon_value(new.risk_level, array['Low','Medium','High','Critical']);
  return new;
end $$;

update public.college_students set status = 'On Break' where status = 'Break in learning';

alter table public.college_students add constraint college_students_status_canon check (status is null or status in
  ('Active','On Break','Suspended','Withdrawn','Completed','Transferred','Archived'));
