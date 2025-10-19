-- Create design_exports table for EIC integration
CREATE TABLE public.design_exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  design_id TEXT NOT NULL,
  project_name TEXT NOT NULL,
  installation_address TEXT,
  client_name TEXT,
  electrician_name TEXT,
  
  -- Export metadata
  export_type TEXT NOT NULL DEFAULT 'eic',
  status TEXT NOT NULL DEFAULT 'pending',
  circuits_count INTEGER NOT NULL,
  voltage INTEGER NOT NULL,
  phases TEXT NOT NULL,
  
  -- Full design data (InstallationDesign JSON)
  design_data JSONB NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '90 days',
  
  -- Constraints
  CONSTRAINT valid_status CHECK (status IN ('pending', 'in-progress', 'completed', 'archived')),
  CONSTRAINT valid_export_type CHECK (export_type IN ('eic', 'quote', 'test-sheet')),
  CONSTRAINT valid_phases CHECK (phases IN ('single', 'three'))
);

-- Enable RLS
ALTER TABLE public.design_exports ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own exports"
  ON public.design_exports FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own exports"
  ON public.design_exports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exports"
  ON public.design_exports FOR UPDATE
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_design_exports_user_status ON public.design_exports(user_id, status);
CREATE INDEX idx_design_exports_created ON public.design_exports(created_at DESC);

-- Auto-cleanup function
CREATE OR REPLACE FUNCTION public.cleanup_expired_design_exports()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  DELETE FROM public.design_exports 
  WHERE expires_at < NOW() AND status = 'completed';
END;
$$;

-- Create eic-exports storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('eic-exports', 'eic-exports', false);

-- Storage RLS Policies
CREATE POLICY "Users can upload own eic exports"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'eic-exports' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can read own eic exports"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'eic-exports' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);