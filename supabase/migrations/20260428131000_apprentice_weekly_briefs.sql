CREATE TABLE IF NOT EXISTS public.apprentice_weekly_briefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  iso_week text NOT NULL,
  greeting text NOT NULL,
  headline text NOT NULL,
  bullets jsonb NOT NULL DEFAULT '[]'::jsonb,
  encouragement text NOT NULL DEFAULT '',
  generated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, iso_week)
);

CREATE INDEX IF NOT EXISTS idx_apprentice_weekly_briefs_user_week
  ON public.apprentice_weekly_briefs (user_id, iso_week DESC);

ALTER TABLE public.apprentice_weekly_briefs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "apprentice reads own brief" ON public.apprentice_weekly_briefs;
CREATE POLICY "apprentice reads own brief"
ON public.apprentice_weekly_briefs FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Tutors at the same college can read briefs for their learners (audit + IQA).
DROP POLICY IF EXISTS "staff reads briefs at their college" ON public.apprentice_weekly_briefs;
CREATE POLICY "staff reads briefs at their college"
ON public.apprentice_weekly_briefs FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.college_students cs
    JOIN public.college_staff st
      ON st.college_id = cs.college_id AND st.user_id = auth.uid()
    WHERE cs.user_id = apprentice_weekly_briefs.user_id
  )
);

-- No INSERT/UPDATE/DELETE policies — only the edge function (service role) writes.
