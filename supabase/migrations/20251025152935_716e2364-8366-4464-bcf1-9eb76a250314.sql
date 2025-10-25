-- Add tracking columns to user_email_configs for rate limiting and monitoring
ALTER TABLE public.user_email_configs 
ADD COLUMN IF NOT EXISTS daily_sent_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS total_sent_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS rate_limit_reset_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_DATE + INTERVAL '1 day');