-- The New cohort form asked for a cohort code, delivery mode, meeting day,
-- time and room (the code was even required), but college_cohorts had no
-- columns for them, so they were dropped silently on save. Store them.
alter table public.college_cohorts
  add column if not exists code text,
  add column if not exists delivery_mode text,
  add column if not exists meeting_day text,
  add column if not exists meeting_time text,
  add column if not exists room text;
