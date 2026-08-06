-- Remedial work raised from a certificate's coded observations.
--
-- An EICR's C1/C2/FI observations ARE a snagging list: something found, coded,
-- that someone has to go back and put right. Live data has 1,846 coded defects
-- across 344 certificates against 23 hand-typed snags — the list was being
-- captured properly and then dropped.
--
-- These two columns let a task remember the observation it came from, so the
-- action can be re-run on a certificate without raising everything twice.
-- Enforced by a unique index rather than by disabling a button: a double tap,
-- a retry or a second device would each defeat the button.
--
-- `source_report_id` is TEXT, not a uuid FK to reports. The EICR form works
-- against `effectiveReportId` (the human-facing certificate identifier) while
-- the database uuid is null until the certificate has been saved to the cloud
-- — so a uuid FK would refuse to raise remedial work from a certificate still
-- being filled in, which is exactly when an inspector wants to raise it.

alter table public.spark_tasks
  add column if not exists source_report_id text,
  add column if not exists source_observation_id text;

comment on column public.spark_tasks.source_report_id is
  'Certificate this task was raised from — the report identifier the form works with, not necessarily a reports.id uuid (the row may not exist yet).';
comment on column public.spark_tasks.source_observation_id is
  'Id of the specific observation within that certificate. Unique per user + report.';

-- NON-partial on purpose. Postgres will not infer an ON CONFLICT target from a
-- partial index unless the statement repeats the predicate, and PostgREST's
-- upsert cannot express that — a partial index here made every raise fail with
-- "no unique or exclusion constraint matching the ON CONFLICT specification".
-- Dropping the predicate is safe: unique indexes treat NULLs as distinct, so
-- the ordinary tasks that carry no source columns never collide.
create unique index if not exists spark_tasks_source_observation_uniq
  on public.spark_tasks (user_id, source_report_id, source_observation_id);

create index if not exists spark_tasks_source_report_idx
  on public.spark_tasks (source_report_id)
  where source_report_id is not null;
