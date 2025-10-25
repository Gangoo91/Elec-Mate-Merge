-- Create user_email_configs table for storing OAuth email credentials
CREATE TABLE IF NOT EXISTS public.user_email_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  email_provider TEXT NOT NULL CHECK (email_provider IN ('gmail', 'outlook')),
  email_address TEXT NOT NULL,
  encrypted_access_token TEXT,
  encrypted_refresh_token TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, email_provider)
);

-- Create index for faster lookups
CREATE INDEX idx_user_email_configs_user_id ON public.user_email_configs(user_id);
CREATE INDEX idx_user_email_configs_active ON public.user_email_configs(user_id, is_active) WHERE is_active = true;

-- Enable RLS
ALTER TABLE public.user_email_configs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only manage their own email configs
CREATE POLICY "Users can view their own email configs"
  ON public.user_email_configs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own email configs"
  ON public.user_email_configs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own email configs"
  ON public.user_email_configs
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own email configs"
  ON public.user_email_configs
  FOR DELETE
  USING (auth.uid() = user_id);

-- Update timestamp trigger
CREATE TRIGGER update_user_email_configs_updated_at
  BEFORE UPDATE ON public.user_email_configs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();