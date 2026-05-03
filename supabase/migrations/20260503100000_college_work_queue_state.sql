-- College Work Queue State — per-tutor in-progress / completed state for
-- the aggregated /college work queue. Source rows (grades, ILPs, EPAs,
-- portfolio submissions) don't carry "I'm working on this" state on
-- themselves, so we track that here per (staff_id, source_type, source_id).
--
-- Same-college staff can read each other's rows (so you can see a peer
-- is already on something); only the owner can write.

CREATE TABLE IF NOT EXISTS public.college_work_queue_state (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id uuid NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  staff_id uuid NOT NULL REFERENCES public.college_staff(id) ON DELETE CASCADE,
  source_type text NOT NULL CHECK (source_type IN ('grade','ilp','gateway','portfolio')),
  source_id uuid NOT NULL,
  status text NOT NULL CHECK (status IN ('In Progress','Completed')),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(staff_id, source_type, source_id)
);

CREATE INDEX IF NOT EXISTS idx_cwqs_college_status
  ON public.college_work_queue_state(college_id, status);

CREATE INDEX IF NOT EXISTS idx_cwqs_staff
  ON public.college_work_queue_state(staff_id);

CREATE INDEX IF NOT EXISTS idx_cwqs_source
  ON public.college_work_queue_state(source_type, source_id);

ALTER TABLE public.college_work_queue_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY cwqs_read_same_college
  ON public.college_work_queue_state
  FOR SELECT
  TO authenticated
  USING (
    college_id IN (
      SELECT college_id FROM public.college_staff WHERE user_id = auth.uid()
    )
  );

CREATE POLICY cwqs_write_self
  ON public.college_work_queue_state
  FOR ALL
  TO authenticated
  USING (
    staff_id IN (SELECT id FROM public.college_staff WHERE user_id = auth.uid())
  )
  WITH CHECK (
    staff_id IN (SELECT id FROM public.college_staff WHERE user_id = auth.uid())
  );

CREATE OR REPLACE FUNCTION public.cwqs_touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS cwqs_touch_updated_at ON public.college_work_queue_state;
CREATE TRIGGER cwqs_touch_updated_at
  BEFORE UPDATE ON public.college_work_queue_state
  FOR EACH ROW
  EXECUTE FUNCTION public.cwqs_touch_updated_at();
