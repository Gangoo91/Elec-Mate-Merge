-- Fleet's headline "vehicle-to-job assignment" had no link at all. Add a real
-- FK so a van can be assigned to a job (null on job delete).
ALTER TABLE public.vehicles
  ADD COLUMN IF NOT EXISTS job_id uuid REFERENCES public.employer_jobs(id) ON DELETE SET NULL;
