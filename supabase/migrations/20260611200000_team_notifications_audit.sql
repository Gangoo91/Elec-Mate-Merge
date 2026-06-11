-- ============================================================================
-- Employer Hub nerves — Slice 4: notifications + audit trail
--
-- Applied live as team_notifications_audit + team_audit_log_fix(2); this file
-- records the FINAL state. Notifications fire from DATABASE TRIGGERS so every
-- writer (employer UI, worker app, RPCs, office entry) produces them:
--   worker ← push: job assigned, timesheet decided, leave decided
--   employer ← bell + push: leave requested, expense submitted, snag reported
-- employer_audit_log: who did what, when, per company (status transitions
-- captured on updates). Worker actions are attributed via actor_id.
--
-- plpgsql lesson recorded in log_team_action: generic triggers must access
-- fields via to_jsonb() — direct old/new field refs resolve at parse time
-- against the row type and explode on tables lacking the column.
--
-- Full function bodies live in the DB; helpers: team_push (vault + pg_net →
-- send-push-notification, type 'team'), notify_employer_bell (insert into
-- employer_notifications). Triggers:
--   notify_assignment            AFTER INSERT employer_job_assignments
--   notify_timesheet_decision    AFTER UPDATE OF status employer_timesheets
--   notify_leave_decision        AFTER UPDATE OF status employer_leave_requests
--   notify_leave_request         AFTER INSERT employer_leave_requests (worker-submitted only)
--   notify_expense_claim         AFTER INSERT employer_expense_claims (worker-submitted only)
--   notify_snag                  AFTER INSERT job_issues (worker-reported only)
--   audit_team_action            AFTER I/U/D on employees/jobs/invites/timesheets/leave
--
-- Rollback: drop the triggers + functions + employer_audit_log table.
-- (table + policy)

create table if not exists public.employer_audit_log (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  actor_id uuid,
  action text not null,
  entity text not null,
  entity_id uuid,
  detail jsonb,
  created_at timestamptz not null default now()
);

alter table public.employer_audit_log enable row level security;

create policy "Employer reads own audit log"
  on public.employer_audit_log
  for select to authenticated
  using (employer_id = (select auth.uid()));

create index if not exists idx_employer_audit_log_employer
  on public.employer_audit_log (employer_id, created_at desc);
