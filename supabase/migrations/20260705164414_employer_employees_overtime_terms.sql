-- Overtime terms vary by firm and worker (1×, 1.2×, 1.5×, different daily
-- thresholds) — store them per employee beside the rest of the pay data
-- instead of hardcoding time-and-a-half in the client.
-- Rollback: alter table public.employer_employees
--             drop column overtime_multiplier, drop column overtime_threshold_hours;

alter table public.employer_employees
  add column if not exists overtime_multiplier numeric not null default 1.5,
  add column if not exists overtime_threshold_hours numeric not null default 8;

comment on column public.employer_employees.overtime_multiplier is
  'Pay multiplier for overtime hours (1 = flat rate, 1.5 = time and a half)';
comment on column public.employer_employees.overtime_threshold_hours is
  'Daily hours above which time counts as overtime';
