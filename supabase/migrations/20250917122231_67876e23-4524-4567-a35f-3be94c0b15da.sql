-- Only create tables and policies that don't exist yet
DO $$ 
BEGIN
  -- Create CPD entries table if it doesn't exist
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'cpd_entries') THEN
    CREATE TABLE public.cpd_entries (
      id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID NOT NULL,
      professional_body_id UUID REFERENCES public.professional_bodies(id),
      title TEXT NOT NULL,
      description TEXT,
      activity_type TEXT NOT NULL,
      category TEXT NOT NULL,
      hours NUMERIC NOT NULL,
      date_completed DATE NOT NULL,
      learning_outcomes TEXT[],
      evidence_files JSONB DEFAULT '[]'::jsonb,
      verification_status TEXT DEFAULT 'pending',
      is_verified BOOLEAN DEFAULT false,
      verified_by UUID,
      verified_at TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    );
    
    -- Enable RLS
    ALTER TABLE public.cpd_entries ENABLE ROW LEVEL SECURITY;
    
    -- Create policy if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can manage their own CPD entries') THEN
      CREATE POLICY "Users can manage their own CPD entries"
        ON public.cpd_entries
        FOR ALL
        USING (auth.uid() = user_id);
    END IF;
  END IF;

  -- Create CPD evidence files table if it doesn't exist  
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'cpd_evidence_files') THEN
    CREATE TABLE public.cpd_evidence_files (
      id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      cpd_entry_id UUID NOT NULL REFERENCES public.cpd_entries(id) ON DELETE CASCADE,
      user_id UUID NOT NULL,
      file_name TEXT NOT NULL,
      file_url TEXT NOT NULL,
      file_type TEXT NOT NULL,
      file_size INTEGER,
      uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      ocr_text TEXT,
      verification_status TEXT DEFAULT 'pending'
    );
    
    -- Enable RLS
    ALTER TABLE public.cpd_evidence_files ENABLE ROW LEVEL SECURITY;
    
    -- Create policy
    CREATE POLICY "Users can manage their own CPD evidence files"
      ON public.cpd_evidence_files
      FOR ALL
      USING (auth.uid() = user_id);
  END IF;

END $$;