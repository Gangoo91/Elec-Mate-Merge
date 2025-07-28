-- Create storage bucket for evidence files
INSERT INTO storage.buckets (id, name, public) VALUES ('evidence-files', 'evidence-files', true);

-- Create training evidence table
CREATE TABLE public.training_evidence (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  evidence_type TEXT NOT NULL,
  file_url TEXT,
  file_name TEXT,
  file_size INTEGER,
  tags TEXT[] DEFAULT '{}',
  category TEXT,
  learning_outcomes TEXT[],
  assessment_criteria TEXT[],
  date_achieved DATE NOT NULL DEFAULT CURRENT_DATE,
  time_spent INTEGER DEFAULT 0, -- minutes
  verification_status TEXT DEFAULT 'pending',
  witness_name TEXT,
  portfolio_linked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.training_evidence ENABLE ROW LEVEL SECURITY;

-- Create policies for training evidence
CREATE POLICY "Users can view their own training evidence" 
ON public.training_evidence 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own training evidence" 
ON public.training_evidence 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own training evidence" 
ON public.training_evidence 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own training evidence" 
ON public.training_evidence 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create storage policies for evidence files
CREATE POLICY "Users can view evidence files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'evidence-files');

CREATE POLICY "Users can upload their own evidence files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'evidence-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own evidence files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'evidence-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own evidence files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'evidence-files' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_training_evidence_updated_at
BEFORE UPDATE ON public.training_evidence
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();