-- Phase 1 Client CRM foundation: per-tenant client record + nullable links.
-- Rollback: drop table employer_clients cascade; alter table ... drop column client_id.

CREATE TABLE IF NOT EXISTS public.employer_clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id uuid NOT NULL DEFAULT auth.uid(),
  name text NOT NULL,
  contact_name text,
  email text,
  phone text,
  address text,
  notes text,
  tags text[] NOT NULL DEFAULT '{}',
  last_activity_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS employer_clients_employer_id_idx ON public.employer_clients (employer_id);

ALTER TABLE public.employer_clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employer manages own clients"
  ON public.employer_clients FOR ALL TO authenticated
  USING (employer_id = (SELECT auth.uid()))
  WITH CHECK (employer_id = (SELECT auth.uid()));

-- Keep updated_at fresh (reuse the standard trigger fn if present, else inline)
CREATE OR REPLACE FUNCTION public.set_employer_clients_updated_at()
 RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $$
begin new.updated_at = now(); return new; end; $$;

CREATE TRIGGER trg_employer_clients_updated_at
  BEFORE UPDATE ON public.employer_clients
  FOR EACH ROW EXECUTE FUNCTION public.set_employer_clients_updated_at();

-- Nullable links — existing free-text `client` stays as fallback/display.
ALTER TABLE public.employer_quotes   ADD COLUMN IF NOT EXISTS client_id uuid REFERENCES public.employer_clients(id) ON DELETE SET NULL;
ALTER TABLE public.employer_invoices ADD COLUMN IF NOT EXISTS client_id uuid REFERENCES public.employer_clients(id) ON DELETE SET NULL;
ALTER TABLE public.employer_jobs     ADD COLUMN IF NOT EXISTS client_id uuid REFERENCES public.employer_clients(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS employer_quotes_client_id_idx   ON public.employer_quotes (client_id);
CREATE INDEX IF NOT EXISTS employer_invoices_client_id_idx ON public.employer_invoices (client_id);
CREATE INDEX IF NOT EXISTS employer_jobs_client_id_idx     ON public.employer_jobs (client_id);
