-- Add rate settings to employer_elec_id_profiles table
-- Allows users to set their preferred rate type and amount for display in Talent Pool

-- Add rate_type column (hourly, daily, weekly, yearly)
ALTER TABLE public.employer_elec_id_profiles
ADD COLUMN IF NOT EXISTS rate_type TEXT DEFAULT 'daily';

-- Add rate_amount column (the numeric rate value)
ALTER TABLE public.employer_elec_id_profiles
ADD COLUMN IF NOT EXISTS rate_amount NUMERIC DEFAULT NULL;

-- Add check constraint for valid rate types
ALTER TABLE public.employer_elec_id_profiles
ADD CONSTRAINT valid_rate_type CHECK (rate_type IN ('hourly', 'daily', 'weekly', 'yearly'));

-- Add comment for documentation
COMMENT ON COLUMN public.employer_elec_id_profiles.rate_type IS 'The type of rate (hourly, daily, weekly, yearly)';
COMMENT ON COLUMN public.employer_elec_id_profiles.rate_amount IS 'The rate amount in GBP';
