-- employer_employees.status carried mixed casing ('active' ×129, 'Active' ×1,
-- 'archived' ×1) while all client writers insert capitalised values — so
-- case-sensitive readers missed rows (new members invisible in pickers, a
-- lowercase-archived worker showing as Available). Normalise to the canonical
-- capitalised set used by the UI and constrain future writes.
-- All server-side comparisons are case-insensitive (seat trigger uses lower());
-- client readers use ilike/dual-case checks.
-- Rollback: alter table public.employer_employees drop constraint employer_employees_status_check;
--           (data normalisation is intentionally not reverted)

update public.employer_employees set status = 'Active' where status = 'active';
update public.employer_employees set status = 'Archived' where status = 'archived';
update public.employer_employees set status = 'On Leave' where lower(status) = 'on leave' and status <> 'On Leave';

alter table public.employer_employees
  add constraint employer_employees_status_check
  check (status in ('Active', 'On Leave', 'Archived'));
