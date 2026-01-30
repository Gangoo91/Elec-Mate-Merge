-- Add overhead and profit margin settings to company_profiles
ALTER TABLE public.company_profiles
ADD COLUMN IF NOT EXISTS overhead_percentage NUMERIC DEFAULT 15,
ADD COLUMN IF NOT EXISTS profit_margin NUMERIC DEFAULT 20;

-- Add comment
COMMENT ON COLUMN public.company_profiles.overhead_percentage IS 'Default overhead percentage for quotes/invoices';
COMMENT ON COLUMN public.company_profiles.profit_margin IS 'Default profit margin percentage for quotes/invoices';
