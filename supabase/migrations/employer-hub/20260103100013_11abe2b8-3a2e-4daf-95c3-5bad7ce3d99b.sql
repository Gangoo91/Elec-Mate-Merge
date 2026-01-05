-- Add columns for archive, templates, cover photos, and card positioning
ALTER TABLE public.jobs 
ADD COLUMN IF NOT EXISTS archived_at timestamp with time zone DEFAULT NULL,
ADD COLUMN IF NOT EXISTS is_template boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS cover_photo_url text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS position integer DEFAULT 0;

-- Create index for archived jobs filtering
CREATE INDEX IF NOT EXISTS idx_jobs_archived_at ON public.jobs(archived_at);

-- Create index for templates filtering
CREATE INDEX IF NOT EXISTS idx_jobs_is_template ON public.jobs(is_template) WHERE is_template = true;

-- Create index for position ordering
CREATE INDEX IF NOT EXISTS idx_jobs_position ON public.jobs(position);