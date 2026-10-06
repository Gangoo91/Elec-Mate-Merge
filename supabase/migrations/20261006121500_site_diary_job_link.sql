-- Site Safety: let electrician site-diary entries link to a job.
--
-- The 10-table job-link migration added job_id to `site_diary_entries`, but the
-- electrician diary writes to `electrician_site_diary`. The client sent job_id
-- anyway, so every diary save was rejected by PostgREST (table has 0 rows).
-- Additive and nullable: no existing row or policy changes.
--
-- Applied 6 Oct 2026; the diary form sends job_id and shows the job field again.

alter table public.electrician_site_diary
  add column if not exists job_id uuid references public.spark_projects(id) on delete set null;

create index if not exists electrician_site_diary_job_id_idx
  on public.electrician_site_diary (job_id)
  where job_id is not null;
