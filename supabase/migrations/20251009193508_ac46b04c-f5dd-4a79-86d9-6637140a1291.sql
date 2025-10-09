-- Create RAMS documents table for persistence
CREATE TABLE IF NOT EXISTS public.rams_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_name TEXT NOT NULL,
  location TEXT NOT NULL,
  date TEXT NOT NULL,
  assessor TEXT NOT NULL,
  contractor TEXT,
  supervisor TEXT,
  activities TEXT[] DEFAULT '{}',
  risks JSONB NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'draft',
  version INTEGER NOT NULL DEFAULT 1,
  pdf_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_autosave_at TIMESTAMPTZ,
  ai_generation_metadata JSONB DEFAULT '{}'
);

-- Create method statements table
CREATE TABLE IF NOT EXISTS public.method_statements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rams_document_id UUID REFERENCES public.rams_documents(id) ON DELETE SET NULL,
  job_title TEXT NOT NULL,
  location TEXT NOT NULL,
  contractor TEXT NOT NULL,
  supervisor TEXT NOT NULL,
  work_type TEXT NOT NULL,
  duration TEXT,
  team_size TEXT,
  description TEXT,
  overall_risk_level TEXT NOT NULL DEFAULT 'medium',
  review_date TEXT,
  approved_by TEXT,
  steps JSONB NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_rams_documents_user_id ON public.rams_documents(user_id);
CREATE INDEX idx_rams_documents_updated_at ON public.rams_documents(updated_at DESC);
CREATE INDEX idx_rams_documents_status ON public.rams_documents(status);
CREATE INDEX idx_method_statements_user_id ON public.method_statements(user_id);
CREATE INDEX idx_method_statements_rams_id ON public.method_statements(rams_document_id);

-- Enable RLS
ALTER TABLE public.rams_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.method_statements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rams_documents
CREATE POLICY "Users can manage their own RAMS documents"
  ON public.rams_documents
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for method_statements
CREATE POLICY "Users can manage their own method statements"
  ON public.method_statements
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Trigger for updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_rams_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rams_documents_updated_at
  BEFORE UPDATE ON public.rams_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_rams_updated_at();

CREATE TRIGGER update_method_statements_updated_at
  BEFORE UPDATE ON public.method_statements
  FOR EACH ROW
  EXECUTE FUNCTION public.update_rams_updated_at();