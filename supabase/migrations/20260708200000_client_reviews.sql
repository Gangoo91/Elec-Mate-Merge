-- Reviews / testimonials captured against a client (and optionally a job).
CREATE TABLE IF NOT EXISTS public.client_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  client_id uuid NOT NULL REFERENCES public.employer_clients(id) ON DELETE CASCADE,
  job_id uuid REFERENCES public.employer_jobs(id) ON DELETE SET NULL,
  rating int CHECK (rating BETWEEN 1 AND 5),
  text text,
  requested_at timestamptz,
  received_at timestamptz,
  is_public boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.client_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "own reviews select" ON public.client_reviews;
CREATE POLICY "own reviews select" ON public.client_reviews
  FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS "own reviews insert" ON public.client_reviews;
CREATE POLICY "own reviews insert" ON public.client_reviews
  FOR INSERT WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "own reviews update" ON public.client_reviews;
CREATE POLICY "own reviews update" ON public.client_reviews
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "own reviews delete" ON public.client_reviews;
CREATE POLICY "own reviews delete" ON public.client_reviews
  FOR DELETE USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS client_reviews_client_idx
  ON public.client_reviews (client_id, created_at DESC);
