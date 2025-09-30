-- Drop the existing check constraint
ALTER TABLE public.quotes DROP CONSTRAINT IF EXISTS quotes_tags_check;

-- Add the updated check constraint with 'work_done' included
ALTER TABLE public.quotes ADD CONSTRAINT quotes_tags_check 
CHECK (
  tags <@ ARRAY['awaiting_payment', 'job_not_complete', 'on_hold', 'disputed', 'work_done']::text[]
);