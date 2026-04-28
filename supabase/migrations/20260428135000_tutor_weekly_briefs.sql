CREATE TABLE IF NOT EXISTS public.tutor_weekly_briefs (
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

CREATE INDEX IF NOT EXISTS idx_tutor_weekly_briefs_user_week
  ON public.tutor_weekly_briefs (user_id, iso_week DESC);

ALTER TABLE public.tutor_weekly_briefs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "tutor reads own brief" ON public.tutor_weekly_briefs;
CREATE POLICY "tutor reads own brief"
ON public.tutor_weekly_briefs FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- No INSERT/UPDATE/DELETE policies — only the edge function (service role) writes.
