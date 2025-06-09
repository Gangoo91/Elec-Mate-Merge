
-- Create portfolio items table
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  file_url TEXT,
  file_type TEXT,
  skills_demonstrated TEXT[],
  reflection_notes TEXT,
  supervisor_feedback TEXT,
  grade TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create evidence uploads table
CREATE TABLE public.evidence_uploads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  evidence_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  learning_outcome TEXT,
  unit_reference TEXT,
  date_achieved DATE NOT NULL,
  witness_name TEXT,
  witness_signature_url TEXT,
  verification_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create assessment tracking table
CREATE TABLE public.assessment_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  assessment_type TEXT NOT NULL,
  unit_code TEXT NOT NULL,
  unit_title TEXT NOT NULL,
  due_date DATE,
  completion_date DATE,
  grade TEXT,
  feedback TEXT,
  status TEXT DEFAULT 'not_started',
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create compliance tracking table
CREATE TABLE public.compliance_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  requirement_type TEXT NOT NULL,
  requirement_name TEXT NOT NULL,
  target_hours INTEGER,
  completed_hours INTEGER DEFAULT 0,
  deadline DATE,
  status TEXT DEFAULT 'in_progress',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for portfolio_items
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own portfolio items" 
  ON public.portfolio_items 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own portfolio items" 
  ON public.portfolio_items 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolio items" 
  ON public.portfolio_items 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own portfolio items" 
  ON public.portfolio_items 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add RLS policies for evidence_uploads
ALTER TABLE public.evidence_uploads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own evidence uploads" 
  ON public.evidence_uploads 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own evidence uploads" 
  ON public.evidence_uploads 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own evidence uploads" 
  ON public.evidence_uploads 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own evidence uploads" 
  ON public.evidence_uploads 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add RLS policies for assessment_tracking
ALTER TABLE public.assessment_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own assessment tracking" 
  ON public.assessment_tracking 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own assessment tracking" 
  ON public.assessment_tracking 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assessment tracking" 
  ON public.assessment_tracking 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own assessment tracking" 
  ON public.assessment_tracking 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add RLS policies for compliance_tracking
ALTER TABLE public.compliance_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own compliance tracking" 
  ON public.compliance_tracking 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own compliance tracking" 
  ON public.compliance_tracking 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own compliance tracking" 
  ON public.compliance_tracking 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own compliance tracking" 
  ON public.compliance_tracking 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add triggers for updated_at columns
CREATE TRIGGER update_portfolio_items_updated_at
  BEFORE UPDATE ON public.portfolio_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_evidence_uploads_updated_at
  BEFORE UPDATE ON public.evidence_uploads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_assessment_tracking_updated_at
  BEFORE UPDATE ON public.assessment_tracking
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_compliance_tracking_updated_at
  BEFORE UPDATE ON public.compliance_tracking
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
