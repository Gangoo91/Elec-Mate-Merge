-- Employer Hub: a rejected timesheet must tell the worker WHY. Expenses already
-- carry rejection_reason; timesheets had no column, so the worker only ever saw
-- a bare "Rejected" pill.
alter table public.employer_timesheets
  add column if not exists rejection_reason text;
comment on column public.employer_timesheets.rejection_reason is
  'Set by the employer when status flips to Rejected; shown to the worker in Worker Tools → Timesheets.';
