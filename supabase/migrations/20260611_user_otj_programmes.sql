-- ============================================================================
-- user_otj_programmes — durable self-set OTJ programme for apprentices with
-- no college link (~98% of paying apprentices today).
--
-- The self-set programme (start/end dates + fixed OTJ total from the DfE
-- Annex C standard) previously lived ONLY in localStorage — wiped by a device
-- change, reinstall or storage clear, silently reverting the learner to a
-- generic estimate. This table makes it durable; the college programme
-- (college_students.otj_required_hours) still takes priority when linked.
--
-- Apprentice-owned, user_id-keyed. No college tables touched.
--
-- Rollback: DROP TABLE public.user_otj_programmes;
-- ============================================================================

CREATE TABLE public.user_otj_programmes (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  start_date date NOT NULL,
  end_date date NOT NULL,
  -- DfE Annex C fixed totals; 187h is the statutory floor.
  total_hours integer NOT NULL CHECK (total_hours >= 187 AND total_hours <= 5000),
  standard_code text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (end_date > start_date)
);

ALTER TABLE public.user_otj_programmes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Own programme read" ON public.user_otj_programmes
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own programme insert" ON public.user_otj_programmes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own programme update" ON public.user_otj_programmes
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own programme delete" ON public.user_otj_programmes
  FOR DELETE USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public._touch_user_otj_programmes()
RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_touch_user_otj_programmes
  BEFORE UPDATE ON public.user_otj_programmes
  FOR EACH ROW EXECUTE FUNCTION public._touch_user_otj_programmes();
