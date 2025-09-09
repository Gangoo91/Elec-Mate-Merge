-- Add tags and last_reminder_sent_at columns to quotes table (if they don't exist)
DO $$ 
BEGIN
    -- Add tags column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'quotes' AND column_name = 'tags') THEN
        ALTER TABLE public.quotes ADD COLUMN tags TEXT[] DEFAULT '{}';
    END IF;
    
    -- Add last_reminder_sent_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'quotes' AND column_name = 'last_reminder_sent_at') THEN
        ALTER TABLE public.quotes ADD COLUMN last_reminder_sent_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;
    END IF;
END $$;

-- Add constraint to ensure valid tag values (drop if exists first)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
               WHERE constraint_name = 'quotes_tags_check' AND table_name = 'quotes') THEN
        ALTER TABLE public.quotes DROP CONSTRAINT quotes_tags_check;
    END IF;
    
    ALTER TABLE public.quotes 
    ADD CONSTRAINT quotes_tags_check 
    CHECK (
      tags <@ ARRAY['awaiting_payment', 'job_not_complete', 'on_hold', 'disputed']::TEXT[]
    );
END $$;

-- Add indexes for better performance (if they don't exist)
CREATE INDEX IF NOT EXISTS idx_quotes_status ON public.quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_tags ON public.quotes USING GIN(tags);