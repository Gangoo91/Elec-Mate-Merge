-- Add status and tags columns to quotes table
ALTER TABLE public.quotes 
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS last_reminder_sent_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Update status column to support new statuses
ALTER TABLE public.quotes 
ALTER COLUMN status TYPE TEXT;

-- Add constraint to ensure valid status values
ALTER TABLE public.quotes 
ADD CONSTRAINT quotes_status_check 
CHECK (status IN ('draft', 'sent', 'pending', 'completed', 'rejected'));

-- Add constraint to ensure valid tag values
ALTER TABLE public.quotes 
ADD CONSTRAINT quotes_tags_check 
CHECK (
  tags <@ ARRAY['awaiting_payment', 'job_not_complete', 'on_hold', 'disputed']::TEXT[]
);

-- Add index for better performance on status and tags queries
CREATE INDEX IF NOT EXISTS idx_quotes_status ON public.quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_tags ON public.quotes USING GIN(tags);