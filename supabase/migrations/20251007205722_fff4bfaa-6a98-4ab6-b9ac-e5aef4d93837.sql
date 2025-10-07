-- Create EIC Schedules table for Inspection & Testing app integration
CREATE TABLE IF NOT EXISTS public.eic_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  installation_id TEXT NOT NULL,
  installation_address TEXT NOT NULL,
  designer_name TEXT NOT NULL,
  design_date DATE NOT NULL,
  schedule_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.eic_schedules ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own EIC schedules"
  ON public.eic_schedules
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own EIC schedules"
  ON public.eic_schedules
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own EIC schedules"
  ON public.eic_schedules
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own EIC schedules"
  ON public.eic_schedules
  FOR DELETE
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_eic_schedules_user_id ON public.eic_schedules(user_id);
CREATE INDEX idx_eic_schedules_installation_id ON public.eic_schedules(installation_id);
CREATE INDEX idx_eic_schedules_status ON public.eic_schedules(status);

-- Updated_at trigger
CREATE TRIGGER update_eic_schedules_updated_at
  BEFORE UPDATE ON public.eic_schedules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

COMMENT ON TABLE public.eic_schedules IS 'EIC Schedule of Test Results pre-populated from AI Install Planner for Inspection & Testing app integration';
COMMENT ON COLUMN public.eic_schedules.schedule_data IS 'JSONB array of EICCircuitData with pre-filled expected test values from BS 7671 calculations';