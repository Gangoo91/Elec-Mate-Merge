-- ELE-893 / [A1]  IQA-checks-assessor audit chain on OTJ
--
-- Extends college_iqa_samples to support OTJ entries alongside observations.
-- One row per (sampling_plan, observation OR otj_entry). Verdict + comments
-- already exist; we just teach the table about a second sample target type.
--
-- Why one table, not two?  The IQA verdict workflow + dashboard + audit pack
-- export are identical for observations and OTJ. Splitting tables would force
-- duplicated UI + reports. Adding a second target_id keeps the verdict chain
-- unified and Ofsted-ready in one query.

-- 1. New columns: otj_id + snapshots (snapshots survive even if the source
--    OTJ entry is later deleted, so the audit chain stays intact)
ALTER TABLE public.college_iqa_samples
  ADD COLUMN IF NOT EXISTS otj_id uuid
    REFERENCES public.college_otj_entries(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS otj_title_snapshot text,
  ADD COLUMN IF NOT EXISTS otj_date_snapshot date;

-- 2. Unique guard so the same OTJ can't be sampled twice in one plan
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.college_iqa_samples'::regclass
      AND conname  = 'college_iqa_samples_sampling_plan_id_otj_id_key'
  ) THEN
    ALTER TABLE public.college_iqa_samples
      ADD CONSTRAINT college_iqa_samples_sampling_plan_id_otj_id_key
      UNIQUE (sampling_plan_id, otj_id);
  END IF;
END $$;

-- 3. Exactly-one-target check: the row must point at either an observation
--    OR an OTJ entry, but never both (avoid ambiguity in audit pack render)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.college_iqa_samples'::regclass
      AND conname  = 'college_iqa_samples_target_check'
  ) THEN
    ALTER TABLE public.college_iqa_samples
      ADD CONSTRAINT college_iqa_samples_target_check
      CHECK (
        (observation_id IS NOT NULL AND otj_id IS NULL)
        OR (observation_id IS NULL AND otj_id IS NOT NULL)
      );
  END IF;
END $$;

-- 4. Index for the new "samples for an OTJ entry" lookup pattern
CREATE INDEX IF NOT EXISTS college_iqa_samples_otj_id_idx
  ON public.college_iqa_samples(otj_id)
  WHERE otj_id IS NOT NULL;

-- 5. RLS — the parent table already has policies scoped through the sampling
--    plan's college_id via _ch_same_college. New columns inherit that
--    scoping; no policy changes needed. Documenting that explicitly:
--
--    SELECT/INSERT/UPDATE/DELETE on college_iqa_samples is gated by the
--    parent college_iqa_sampling (sampling_plan_id) row's college_id, which
--    must match the caller's college via _ch_same_college().

COMMENT ON COLUMN public.college_iqa_samples.otj_id IS
  'OTJ entry sampled by IQA. Mutually exclusive with observation_id (one or the other, never both, never neither).';
COMMENT ON COLUMN public.college_iqa_samples.otj_title_snapshot IS
  'Snapshot of the OTJ activity title at sample time — preserves audit trail if the OTJ entry is later edited or deleted.';
COMMENT ON COLUMN public.college_iqa_samples.otj_date_snapshot IS
  'Snapshot of the OTJ activity_date at sample time.';
