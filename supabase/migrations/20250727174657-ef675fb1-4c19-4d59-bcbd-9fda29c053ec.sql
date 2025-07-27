-- Enable RLS on the qualifications table if it's not already enabled
ALTER TABLE public.qualifications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to view qualifications
CREATE POLICY "Anyone can view qualifications" ON public.qualifications
  FOR SELECT USING (true);

-- Check if user_qualification_selections table exists and enable RLS if needed
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_qualification_selections') THEN
    ALTER TABLE public.user_qualification_selections ENABLE ROW LEVEL SECURITY;
    
    -- Create policies for user_qualification_selections
    DROP POLICY IF EXISTS "Users can view their own qualification selections" ON public.user_qualification_selections;
    CREATE POLICY "Users can view their own qualification selections" ON public.user_qualification_selections
      FOR SELECT USING (auth.uid() = user_id);
    
    DROP POLICY IF EXISTS "Users can create their own qualification selections" ON public.user_qualification_selections;
    CREATE POLICY "Users can create their own qualification selections" ON public.user_qualification_selections
      FOR INSERT WITH CHECK (auth.uid() = user_id);
    
    DROP POLICY IF EXISTS "Users can update their own qualification selections" ON public.user_qualification_selections;
    CREATE POLICY "Users can update their own qualification selections" ON public.user_qualification_selections
      FOR UPDATE USING (auth.uid() = user_id);
      
    DROP POLICY IF EXISTS "Users can delete their own qualification selections" ON public.user_qualification_selections;
    CREATE POLICY "Users can delete their own qualification selections" ON public.user_qualification_selections
      FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;