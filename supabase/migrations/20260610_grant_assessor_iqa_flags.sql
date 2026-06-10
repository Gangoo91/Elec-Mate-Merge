-- ============================================================================
-- College Hub — Slice 2b: assigned assessors / IQAs can actually SIGN OFF.
--
-- Assigning a tutor/assessor/IQA writes college_student_assignments role columns,
-- which makes the staff dashboards populate. But the portfolio_submissions
-- sign-off RLS additionally requires profiles.is_assessor / profiles.is_iqa = true.
-- So an assigned assessor could SEE their queue but not sign off.
--
-- This trigger grants the capability flag whenever someone is set as the
-- assessor/IQA on an assignment — covering every assignment path (the Assign
-- sheet, the invite RPC, bulk tooling) with no client change. Grant-only: the
-- flag is a capability ("can act as an assessor"), not per-student, so it is
-- never unset here (the person may still assess other learners).
--
-- Rollback at the bottom.
-- ============================================================================

create or replace function public.tg_grant_assessor_iqa_flags()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if new.assessor_id is not null then
    update profiles set is_assessor = true
     where id = new.assessor_id and is_assessor is distinct from true;
  end if;
  if new.iqa_id is not null then
    update profiles set is_iqa = true
     where id = new.iqa_id and is_iqa is distinct from true;
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_grant_assessor_iqa_flags on public.college_student_assignments;

create trigger trg_grant_assessor_iqa_flags
  after insert or update of assessor_id, iqa_id
  on public.college_student_assignments
  for each row
  execute function public.tg_grant_assessor_iqa_flags();

-- ============================================================================
-- ROLLBACK:
--   drop trigger if exists trg_grant_assessor_iqa_flags on public.college_student_assignments;
--   drop function if exists public.tg_grant_assessor_iqa_flags();
-- (Flags already granted stay granted — intended; they are capability flags.)
-- ============================================================================
