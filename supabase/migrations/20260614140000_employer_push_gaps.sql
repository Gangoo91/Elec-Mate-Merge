-- Employer push infrastructure — close the two worker→employer gaps.
--
-- Audit of the existing team-notification triggers (team_notifications_audit)
-- found the "employer ← bell + push" promise was only half-kept:
--   snag reported     → bell + push  ✅
--   leave requested   → bell + push  ✅
--   expense submitted → bell ONLY    ✗  (no phone push)
--   timesheet submit  → nothing      ✗  (no trigger at all)
--
-- The firm owner needs a PHONE push when a worker acts on site, deep-linking
-- straight to the right hub section (same as snags). This migration:
--   1. adds team_push to trg_notify_expense_claim (was bell-only)
--   2. adds trg_notify_timesheet_submission + trigger (bell + push) for a
--      worker-submitted timesheet
--
-- Both keep the canonical guards: only fire when the WORKER themselves wrote the
-- row (v_worker = auth.uid()), so office-entered rows stay silent. Timesheets
-- additionally require total_hours (a completed submission), so a live clock-in
-- with no clock-out doesn't ping the owner.
-- Rollback: restore trg_notify_expense_claim to bell-only; drop
-- notify_timesheet_submission trigger + trg_notify_timesheet_submission.

-- 1. Expense: add the missing phone push (keep the existing bell) ----------
create or replace function public.trg_notify_expense_claim()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_employer uuid;
  v_worker uuid;
  v_name text;
begin
  select e.employer_id, e.user_id, e.name into v_employer, v_worker, v_name
  from employer_employees e where e.id = new.employee_id;

  if v_worker is not null and v_worker = auth.uid() then
    perform notify_employer_bell(
      v_employer, 'expense_submitted', 'Expense claim',
      coalesce(v_name, 'A team member') || ' claimed £' || coalesce(new.amount::text, '?') ||
        coalesce(' — ' || new.category, ''),
      jsonb_build_object('expense_id', new.id, 'route', '/employer?section=timesheets')
    );
    perform team_push(
      v_employer, 'Expense claim',
      coalesce(v_name, 'A team member') || ' claimed £' || coalesce(new.amount::text, '?'),
      jsonb_build_object('expense_id', new.id, 'route', '/employer?section=timesheets')
    );
  end if;
  return new;
end;
$function$;

-- 2. Timesheet submitted by a worker → bell + push to the employer ---------
create or replace function public.trg_notify_timesheet_submission()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_employer uuid;
  v_worker uuid;
  v_name text;
  v_is_submit boolean;
begin
  -- Submission = status lands on pending/submitted with a completed entry.
  -- On UPDATE, only when status actually transitions INTO that (not edits).
  v_is_submit := lower(coalesce(new.status, '')) in ('pending', 'submitted')
                 and new.total_hours is not null
                 and (tg_op = 'INSERT'
                      or new.status is distinct from old.status);
  if not v_is_submit then
    return new;
  end if;

  select e.employer_id, e.user_id, e.name into v_employer, v_worker, v_name
  from employer_employees e where e.id = new.employee_id;

  -- Only when the WORKER submitted their own hours (office entry stays silent).
  if v_worker is not null and v_worker = auth.uid() and v_worker is distinct from v_employer then
    perform notify_employer_bell(
      v_employer, 'timesheet_submitted', 'Timesheet submitted',
      coalesce(v_name, 'A team member') || ' submitted ' ||
        coalesce(new.total_hours::text, '?') || ' hours for ' || to_char(new.date, 'DD Mon'),
      jsonb_build_object('timesheet_id', new.id, 'route', '/employer?section=timesheets')
    );
    perform team_push(
      v_employer, 'Timesheet submitted',
      coalesce(v_name, 'A team member') || ' submitted ' ||
        coalesce(new.total_hours::text, '?') || ' hours for approval',
      jsonb_build_object('timesheet_id', new.id, 'route', '/employer?section=timesheets')
    );
  end if;
  return new;
end;
$function$;

drop trigger if exists notify_timesheet_submission on public.employer_timesheets;
create trigger notify_timesheet_submission
  after insert or update of status on public.employer_timesheets
  for each row execute function public.trg_notify_timesheet_submission();
