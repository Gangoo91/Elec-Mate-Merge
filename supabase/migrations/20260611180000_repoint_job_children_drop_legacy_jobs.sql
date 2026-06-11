-- ============================================================================
-- Worker bridge — repoint job children to employer_jobs; drop legacy `jobs`
--
-- Seven tables (job_financials, variation_orders, progress_logs, job_issues,
-- job_tests, briefings, client_portal_links) FK'd the LEGACY `jobs` table
-- (0 rows forever) — which is why the employer's Issues / Testing / Quality /
-- Progress / Briefings / Portal features could never link a real job: any
-- insert carrying an employer_jobs id violated the FK. All seven verified
-- with zero non-null job_id rows; legacy `jobs` verified 0 rows and 0 code
-- readers (the worker app's My Jobs was the last and is repointed).
-- ============================================================================

alter table public.job_financials drop constraint job_financials_job_id_fkey;
alter table public.job_financials add constraint job_financials_job_id_fkey
  foreign key (job_id) references public.employer_jobs(id) on delete cascade;

alter table public.variation_orders drop constraint variation_orders_job_id_fkey;
alter table public.variation_orders add constraint variation_orders_job_id_fkey
  foreign key (job_id) references public.employer_jobs(id) on delete cascade;

alter table public.progress_logs drop constraint progress_logs_job_id_fkey;
alter table public.progress_logs add constraint progress_logs_job_id_fkey
  foreign key (job_id) references public.employer_jobs(id) on delete cascade;

alter table public.job_issues drop constraint job_issues_job_id_fkey;
alter table public.job_issues add constraint job_issues_job_id_fkey
  foreign key (job_id) references public.employer_jobs(id) on delete cascade;

alter table public.job_tests drop constraint job_tests_job_id_fkey;
alter table public.job_tests add constraint job_tests_job_id_fkey
  foreign key (job_id) references public.employer_jobs(id) on delete cascade;

alter table public.briefings drop constraint briefings_job_id_fkey;
alter table public.briefings add constraint briefings_job_id_fkey
  foreign key (job_id) references public.employer_jobs(id) on delete set null;

alter table public.client_portal_links drop constraint client_portal_links_job_id_fkey;
alter table public.client_portal_links add constraint client_portal_links_job_id_fkey
  foreign key (job_id) references public.employer_jobs(id) on delete cascade;

drop table public.jobs;
