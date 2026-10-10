-- ELE-1834 — competence-matched dispatch. A job carries the credentials the
-- crew must hold between them (matrix column keys: '2391', 'ev', 'solar',
-- 'ecs', 'ipaf' …, the canonical buckets in src/utils/competenceMatrix.ts).
-- The assign sheet and diary check the crew against it; "Send anyway" is
-- logged on the job feed against the person who chose it.
alter table public.employer_jobs
  add column if not exists required_credentials text[] not null default '{}';
comment on column public.employer_jobs.required_credentials is
  'ELE-1834: credentials the crew must hold between them (competence matrix keys). Empty = no requirement set.';
