-- Who may mark an assessor trainee or qualified (10 Oct 2026, batch 2).
--
-- college_staff rows can be updated by any member of staff at the college
-- (qualifications, phone). assessor_status decides whether someone's passes
-- count without a countersignature, so it gets its own rule: only someone
-- who manages staff (college_can 'staff.manage') may set or change it, and
-- never on their own row. Additive: one trigger.
begin;
set local lock_timeout = '5s';

create or replace function public._college_staff_assessor_status_guard()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then return new; end if;  -- service role, migrations
  if tg_op = 'UPDATE' and new.assessor_status is not distinct from old.assessor_status then
    return new;
  end if;
  if tg_op = 'INSERT' and new.assessor_status is null then
    return new;
  end if;
  if new.user_id is not distinct from auth.uid() then
    raise exception 'you cannot change your own assessor status; ask whoever manages staff' using errcode = '42501';
  end if;
  if not public.college_can('staff.manage', new.college_id) then
    raise exception 'only someone who manages staff can mark an assessor trainee or qualified' using errcode = '42501';
  end if;
  return new;
end $$;

drop trigger if exists trg_college_staff_assessor_status_guard on public.college_staff;
create trigger trg_college_staff_assessor_status_guard
  before insert or update of assessor_status on public.college_staff
  for each row execute function public._college_staff_assessor_status_guard();

commit;
