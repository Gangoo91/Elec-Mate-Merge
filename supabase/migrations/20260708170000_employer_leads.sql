-- Leads / enquiries — the front of the sales funnel, before a lead becomes a
-- client. Owner-scoped like the rest of the employer hub.
CREATE TABLE IF NOT EXISTS public.employer_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  name text NOT NULL,
  contact_name text,
  email text,
  phone text,
  source text,
  estimated_value numeric DEFAULT 0,
  stage text NOT NULL DEFAULT 'New',
  notes text,
  converted_client_id uuid REFERENCES public.employer_clients(id) ON DELETE SET NULL,
  converted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.employer_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "own leads select" ON public.employer_leads;
CREATE POLICY "own leads select" ON public.employer_leads
  FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS "own leads insert" ON public.employer_leads;
CREATE POLICY "own leads insert" ON public.employer_leads
  FOR INSERT WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "own leads update" ON public.employer_leads;
CREATE POLICY "own leads update" ON public.employer_leads
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "own leads delete" ON public.employer_leads;
CREATE POLICY "own leads delete" ON public.employer_leads
  FOR DELETE USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS employer_leads_user_stage_idx
  ON public.employer_leads (user_id, stage);
