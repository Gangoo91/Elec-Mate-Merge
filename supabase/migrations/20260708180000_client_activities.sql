-- Manual client interactions (calls/emails/notes/meetings) that merge with
-- derived events (quotes/invoices/jobs) into one client activity timeline.
CREATE TABLE IF NOT EXISTS public.client_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  client_id uuid NOT NULL REFERENCES public.employer_clients(id) ON DELETE CASCADE,
  type text NOT NULL DEFAULT 'note',
  summary text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.client_activities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "own activities select" ON public.client_activities;
CREATE POLICY "own activities select" ON public.client_activities
  FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS "own activities insert" ON public.client_activities;
CREATE POLICY "own activities insert" ON public.client_activities
  FOR INSERT WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "own activities delete" ON public.client_activities;
CREATE POLICY "own activities delete" ON public.client_activities
  FOR DELETE USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS client_activities_client_idx
  ON public.client_activities (client_id, created_at DESC);
