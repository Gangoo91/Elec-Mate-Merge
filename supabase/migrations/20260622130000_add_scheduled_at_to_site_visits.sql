-- Work planner: let site visits be booked for a date/time so they appear on the
-- calendar. Nullable — existing visits are unaffected (just won't be scheduled).
ALTER TABLE public.site_visits
  ADD COLUMN IF NOT EXISTS scheduled_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_site_visits_scheduled_at
  ON public.site_visits(scheduled_at)
  WHERE scheduled_at IS NOT NULL;
