-- Create project_exports table to link all generated documents
CREATE TABLE IF NOT EXISTS public.project_exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  conversation_id TEXT NOT NULL,
  eic_schedule_id UUID REFERENCES public.eic_schedules(id) ON DELETE SET NULL,
  quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
  rams_data JSONB,
  method_statement_data JSONB,
  exported_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.project_exports ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own project exports"
  ON public.project_exports
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own project exports"
  ON public.project_exports
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own project exports"
  ON public.project_exports
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own project exports"
  ON public.project_exports
  FOR DELETE
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_project_exports_user_id ON public.project_exports(user_id);
CREATE INDEX idx_project_exports_conversation_id ON public.project_exports(conversation_id);
CREATE INDEX idx_project_exports_exported_at ON public.project_exports(exported_at DESC);

-- Trigger for updated_at
CREATE TRIGGER update_project_exports_updated_at
  BEFORE UPDATE ON public.project_exports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();