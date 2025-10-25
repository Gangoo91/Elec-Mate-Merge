-- Create oauth_states table for OAuth CSRF protection
CREATE TABLE IF NOT EXISTS public.oauth_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('gmail', 'outlook')),
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_oauth_states_state ON public.oauth_states(state);
CREATE INDEX IF NOT EXISTS idx_oauth_states_expires ON public.oauth_states(expires_at);

-- Enable RLS
ALTER TABLE public.oauth_states ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (safe to run multiple times)
DROP POLICY IF EXISTS "Users can insert own oauth states" ON public.oauth_states;
DROP POLICY IF EXISTS "Users can read own oauth states" ON public.oauth_states;
DROP POLICY IF EXISTS "Callback can read state (anon allowed)" ON public.oauth_states;
DROP POLICY IF EXISTS "Users can delete own oauth states" ON public.oauth_states;

-- Policies
-- Authenticated users can insert their own states from the init step
CREATE POLICY "Users can insert own oauth states"
ON public.oauth_states
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Authenticated users can read their own states (for debugging if needed)
CREATE POLICY "Users can read own oauth states"
ON public.oauth_states
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow anonymous SELECT so the callback function (which runs without a user JWT) can validate state
CREATE POLICY "Callback can read state (anon allowed)"
ON public.oauth_states
FOR SELECT
TO anon
USING (true);

-- Authenticated users can delete their own states (not typically needed, but safe)
CREATE POLICY "Users can delete own oauth states"
ON public.oauth_states
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Cleanup function to remove expired states
CREATE OR REPLACE FUNCTION public.cleanup_expired_oauth_states()
RETURNS void AS $$
BEGIN
  DELETE FROM public.oauth_states
  WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;