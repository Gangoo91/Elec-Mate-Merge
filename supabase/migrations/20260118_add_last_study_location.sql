-- Add last study location tracking to profiles table
-- This enables "Continue where you left off" functionality for apprentices

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS last_study_path TEXT,
ADD COLUMN IF NOT EXISTS last_study_title TEXT,
ADD COLUMN IF NOT EXISTS last_study_at TIMESTAMPTZ;

-- Add index for efficient queries
CREATE INDEX IF NOT EXISTS idx_profiles_last_study_at ON public.profiles(last_study_at DESC) WHERE last_study_at IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.profiles.last_study_path IS 'URL path of the last visited course/section';
COMMENT ON COLUMN public.profiles.last_study_title IS 'Display title of the last visited course/section';
COMMENT ON COLUMN public.profiles.last_study_at IS 'Timestamp of when the user last studied';
