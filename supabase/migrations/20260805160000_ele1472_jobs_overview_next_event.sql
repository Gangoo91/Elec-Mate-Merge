-- ELE-1472 — make the jobs overview's "next event" actually resolve.
--
-- get_jobs_overview joins:
--     from public.calendar_events ev where ev.job_id = p.id
-- with p.id being a spark_projects id. calendar_events.job_id is FK'd to
-- employer_jobs, so that predicate can never match: the lateral has always
-- returned NULL and `next_event` has always been dead. Same category error as
-- BookJobSheet, which tried to WRITE a spark_projects id into job_id and
-- failed with a foreign key violation on every booking (0 of 345 events carry
-- one).
--
-- Repointing it at the project_id column added by 20260805150000 is what makes
-- a booked job show as booked.
--
-- The predicate is rewritten in place rather than the whole function being
-- restated, so nothing else in a 3.6k-character body can drift by accident.
DO $$
DECLARE
  def    text;
  newdef text;
BEGIN
  SELECT pg_get_functiondef(p.oid) INTO def
  FROM pg_proc p
  JOIN pg_namespace n ON n.oid = p.pronamespace
  WHERE n.nspname = 'public' AND p.proname = 'get_jobs_overview';

  IF def IS NULL THEN
    RAISE EXCEPTION 'ELE-1472: public.get_jobs_overview not found';
  END IF;

  IF position('ev.project_id = p.id' in def) > 0 THEN
    RAISE NOTICE 'ELE-1472: get_jobs_overview already reads ev.project_id — nothing to do';
    RETURN;
  END IF;

  IF position('ev.job_id = p.id' in def) = 0 THEN
    RAISE EXCEPTION
      'ELE-1472: neither ev.job_id nor ev.project_id predicate found in get_jobs_overview — refusing to guess';
  END IF;

  newdef := replace(def, 'ev.job_id = p.id', 'ev.project_id = p.id');
  EXECUTE newdef;
  RAISE NOTICE 'ELE-1472: get_jobs_overview next_event now reads calendar_events.project_id';
END $$;
