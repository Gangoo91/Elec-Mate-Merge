-- Remove the older seat triggers — trg_employer_employee_seat now owns the full
-- lifecycle (pending on add, active on link, revoked on archive, re-hire safe).
-- Keeping both double-created active seats on link → double billing. Rollback:
-- recreate grant_seat_on_link / revoke_seat_on_archive from git if ever needed.
drop trigger if exists grant_seat_on_link on public.employer_employees;
drop trigger if exists revoke_seat_on_archive on public.employer_employees;
