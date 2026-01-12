-- Fix jobs table: Add missing user_id column
-- This column is required by jobService.ts but was missing from the original schema

-- Add user_id column
ALTER TABLE public.jobs
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Create index for faster queries by user
CREATE INDEX IF NOT EXISTS idx_jobs_user_id ON public.jobs(user_id);

-- Add comment for documentation
COMMENT ON COLUMN public.jobs.user_id IS 'The user who created this job';
