-- Add setup_banner_dismissed column to profiles table for permanent banner dismissal
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS setup_banner_dismissed BOOLEAN DEFAULT FALSE;

-- Add comment to explain the column
COMMENT ON COLUMN public.profiles.setup_banner_dismissed IS 'Indicates if user has permanently dismissed the setup incomplete banner';
