-- Founder invite system for onboarding founder subscribers
CREATE TABLE public.founder_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  invite_token text UNIQUE NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'claimed', 'expired')),
  sent_at timestamptz,
  claimed_at timestamptz,
  user_id uuid REFERENCES auth.users(id),
  expires_at timestamptz DEFAULT (now() + interval '30 days'),
  created_at timestamptz DEFAULT now()
);

-- Indexes for fast lookups
CREATE INDEX idx_founder_invites_token ON public.founder_invites(invite_token);
CREATE INDEX idx_founder_invites_email ON public.founder_invites(email);
CREATE INDEX idx_founder_invites_status ON public.founder_invites(status);

-- Enable RLS
ALTER TABLE public.founder_invites ENABLE ROW LEVEL SECURITY;

-- Admin-only policies (using service role via edge functions)
CREATE POLICY "Service role has full access to founder_invites"
  ON public.founder_invites
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to generate secure invite token
CREATE OR REPLACE FUNCTION generate_founder_token()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  token TEXT := 'FND-';
BEGIN
  FOR i IN 1..16 LOOP
    token := token || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN token;
END;
$$ LANGUAGE plpgsql;
