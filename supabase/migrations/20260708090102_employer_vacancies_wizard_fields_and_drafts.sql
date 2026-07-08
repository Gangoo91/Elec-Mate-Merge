-- The vacancy wizard collects six fields (two of them mandatory in the form)
-- that the create/update transform silently dropped — the employer filled in
-- work arrangement, experience level, postcode, schedule, start date and
-- nice-to-haves that never reached the job ad, and the edit path re-hydrated
-- hardcoded 'On-site'/'Mid'. Store them for real.
-- Rollback: alter table public.employer_vacancies
--   drop column work_arrangement, drop column experience_level,
--   drop column postcode, drop column schedule, drop column start_date,
--   drop column nice_to_have;

alter table public.employer_vacancies
  add column if not exists work_arrangement text,
  add column if not exists experience_level text,
  add column if not exists postcode text,
  add column if not exists schedule text,
  add column if not exists start_date date,
  add column if not exists nice_to_have text[] not null default '{}';
