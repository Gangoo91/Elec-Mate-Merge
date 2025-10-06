-- Phase 3: Create saved_designs table for design → testing workflow

CREATE TABLE public.saved_designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  project_name TEXT NOT NULL,
  client_name TEXT,
  client_email TEXT,
  installation_address TEXT,
  installation_postcode TEXT,
  circuits JSONB NOT NULL DEFAULT '[]'::jsonb,
  test_expectations JSONB NOT NULL DEFAULT '{}'::jsonb,
  materials_list JSONB DEFAULT '[]'::jsonb,
  rams_data JSONB DEFAULT '{}'::jsonb,
  h_and_s_data JSONB DEFAULT '{}'::jsonb,
  cost_estimate JSONB DEFAULT '{}'::jsonb,
  design_calculations JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'design_complete' CHECK (status IN ('design_complete', 'ready_for_testing', 'testing_in_progress', 'testing_complete', 'archived')),
  exported_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.saved_designs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own saved designs"
  ON public.saved_designs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved designs"
  ON public.saved_designs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved designs"
  ON public.saved_designs
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved designs"
  ON public.saved_designs
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add index for faster queries
CREATE INDEX idx_saved_designs_user_status ON public.saved_designs(user_id, status);
CREATE INDEX idx_saved_designs_created ON public.saved_designs(created_at DESC);

-- Add trigger for updated_at
CREATE TRIGGER update_saved_designs_updated_at
  BEFORE UPDATE ON public.saved_designs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();