-- ELE-1472 — bridge the diary to the project time log.
--
-- Reported by Ian Mills, 4 Aug 2026: he is on one site all day, all week, and
-- has to add a calendar entry AND separately run a project timer.
--
-- The ticket assumed "the architecture supports the link — it just isn't wired
-- up in the UI". It does not. The two sides live in different hubs:
--
--   calendar_events.job_id     -> employer_jobs   (Employer Hub)
--   time_sessions.project_id   -> spark_projects  (Electrician Hub)
--
-- There is no column joining a calendar event to a spark_projects row, so the
-- link has to be created. `job_id` is also dead in practice — 0 of 345 events
-- populate it — so it is left alone rather than repurposed: it means something
-- different, and quietly changing what a column points at is how you get two
-- readings of the same data.
--
-- This is a bridge, not a merge: a nullable pointer added to the Electrician
-- Hub side, with the hubs otherwise untouched.

-- ── Diary entry -> project ───────────────────────────────────────────────
-- ON DELETE SET NULL: deleting a project must not delete the diary entry. The
-- appointment still happened and may still be in the electrician's week.
ALTER TABLE public.calendar_events
  ADD COLUMN IF NOT EXISTS project_id uuid REFERENCES public.spark_projects(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_calendar_events_project_id
  ON public.calendar_events (project_id)
  WHERE project_id IS NOT NULL;

COMMENT ON COLUMN public.calendar_events.project_id IS
  'ELE-1472 — links a diary entry to a spark_projects row so the block can be logged as billable time. Distinct from job_id, which points at employer_jobs and is unused.';

-- ── Time session -> the diary entry it came from ─────────────────────────
-- Provenance, and the thing that makes importing idempotent.
--
-- ON DELETE SET NULL, never CASCADE. time_sessions carries `hourly_rate` and
-- `invoice_id` — these rows are billable, and six of them are already invoiced.
-- Cascading would mean deleting a diary entry silently destroys invoiced hours
-- and leaves an invoice referencing work with no record behind it. The session
-- outlives the appointment; it just forgets where it came from.
ALTER TABLE public.time_sessions
  ADD COLUMN IF NOT EXISTS calendar_event_id uuid REFERENCES public.calendar_events(id) ON DELETE SET NULL;

COMMENT ON COLUMN public.time_sessions.calendar_event_id IS
  'ELE-1472 — the diary entry this session was imported from. Enforces one session per event so a block cannot be logged twice.';

-- Double-billing guard at the DATABASE, not just the UI. A disabled button is
-- defeated by a double-tap, a retried request, or two devices; a unique index
-- is not. Partial, so the 44 existing sessions (all with a NULL event) are
-- unaffected and hand-entered sessions stay unrestricted.
CREATE UNIQUE INDEX IF NOT EXISTS unique_time_session_per_calendar_event
  ON public.time_sessions (calendar_event_id)
  WHERE calendar_event_id IS NOT NULL;

-- No RLS changes needed: both tables already gate every command on
-- `auth.uid() = user_id`, and these are columns on those same rows.
