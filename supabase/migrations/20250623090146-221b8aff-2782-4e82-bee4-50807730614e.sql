
-- Simplify the time_entries table by removing the approval workflow
-- We'll keep the existing table structure but remove the complex approval system

-- First, let's check if we need to add any missing columns to time_entries
-- The table should have: id, user_id, date, duration, activity, notes, is_automatic, created_at

-- Add any missing columns if they don't exist
DO $$ 
BEGIN
    -- Check if is_automatic column exists, if not add it
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'time_entries' AND column_name = 'is_automatic') THEN
        ALTER TABLE public.time_entries ADD COLUMN is_automatic BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Enable RLS on time_entries if not already enabled
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for time_entries if they don't exist
DO $$
BEGIN
    -- Drop existing policies if they exist to recreate them
    DROP POLICY IF EXISTS "Users can view their own time entries" ON public.time_entries;
    DROP POLICY IF EXISTS "Users can create their own time entries" ON public.time_entries;
    DROP POLICY IF EXISTS "Users can update their own time entries" ON public.time_entries;
    DROP POLICY IF EXISTS "Users can delete their own time entries" ON public.time_entries;
    
    -- Create new policies
    CREATE POLICY "Users can view their own time entries" ON public.time_entries FOR SELECT USING (auth.uid() = user_id);
    CREATE POLICY "Users can create their own time entries" ON public.time_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
    CREATE POLICY "Users can update their own time entries" ON public.time_entries FOR UPDATE USING (auth.uid() = user_id);
    CREATE POLICY "Users can delete their own time entries" ON public.time_entries FOR DELETE USING (auth.uid() = user_id);
END $$;
