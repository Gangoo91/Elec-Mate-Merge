-- Create table for Stripe Connected Accounts
CREATE TABLE public.stripe_connected_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_account_id TEXT NOT NULL UNIQUE,
  account_status TEXT NOT NULL DEFAULT 'pending',
  charges_enabled BOOLEAN NOT NULL DEFAULT false,
  payouts_enabled BOOLEAN NOT NULL DEFAULT false,
  business_name TEXT,
  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.stripe_connected_accounts ENABLE ROW LEVEL SECURITY;

-- Create policy for all access (single-tenant for now)
CREATE POLICY "Allow all access to stripe_connected_accounts"
ON public.stripe_connected_accounts
FOR ALL
USING (true)
WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_stripe_connected_accounts_updated_at
BEFORE UPDATE ON public.stripe_connected_accounts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();