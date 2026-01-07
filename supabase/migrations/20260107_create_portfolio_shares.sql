-- Portfolio Shares Table
-- Enables generating shareable links for portfolios
-- Tutors/assessors can view apprentice portfolios via token-based links

CREATE TABLE IF NOT EXISTS public.portfolio_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- What is being shared (NULL = entire portfolio, array = specific entries)
  entry_ids UUID[] DEFAULT NULL,

  -- Share token for URL
  token VARCHAR(64) UNIQUE NOT NULL,

  -- Optional metadata
  title TEXT,
  description TEXT,

  -- Expiration settings
  expires_at TIMESTAMPTZ,

  -- Tracking
  view_count INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMPTZ,

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_portfolio_shares_token ON public.portfolio_shares(token) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_portfolio_shares_user ON public.portfolio_shares(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_shares_expires ON public.portfolio_shares(expires_at) WHERE expires_at IS NOT NULL AND is_active = true;

-- Enable RLS
ALTER TABLE public.portfolio_shares ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running)
DROP POLICY IF EXISTS "Users can view their own shares" ON public.portfolio_shares;
DROP POLICY IF EXISTS "Users can create shares" ON public.portfolio_shares;
DROP POLICY IF EXISTS "Users can update their own shares" ON public.portfolio_shares;
DROP POLICY IF EXISTS "Users can delete their own shares" ON public.portfolio_shares;
DROP POLICY IF EXISTS "Public can view active shares by token" ON public.portfolio_shares;

-- Policy: Users can view their own share links
CREATE POLICY "Users can view their own shares"
  ON public.portfolio_shares
  FOR SELECT
  USING (user_id = auth.uid());

-- Policy: Users can create share links
CREATE POLICY "Users can create shares"
  ON public.portfolio_shares
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Policy: Users can update their own shares (e.g., deactivate)
CREATE POLICY "Users can update their own shares"
  ON public.portfolio_shares
  FOR UPDATE
  USING (user_id = auth.uid());

-- Policy: Users can delete their own shares
CREATE POLICY "Users can delete their own shares"
  ON public.portfolio_shares
  FOR DELETE
  USING (user_id = auth.uid());

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_portfolio_shares_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS portfolio_shares_updated_at ON public.portfolio_shares;
CREATE TRIGGER portfolio_shares_updated_at
  BEFORE UPDATE ON public.portfolio_shares
  FOR EACH ROW
  EXECUTE FUNCTION update_portfolio_shares_updated_at();

-- Function to generate a unique share token
CREATE OR REPLACE FUNCTION generate_share_token()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  token TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..12 LOOP
    token := token || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN token;
END;
$$ LANGUAGE plpgsql;

-- Function to increment view count (called by edge function/API)
CREATE OR REPLACE FUNCTION increment_share_view(share_token TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.portfolio_shares
  SET
    view_count = view_count + 1,
    last_viewed_at = NOW()
  WHERE
    token = share_token
    AND is_active = true
    AND (expires_at IS NULL OR expires_at > NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get shared portfolio data (for public viewing)
CREATE OR REPLACE FUNCTION get_shared_portfolio(share_token TEXT)
RETURNS TABLE (
  share_id UUID,
  owner_name TEXT,
  share_title TEXT,
  share_description TEXT,
  entry_ids UUID[],
  is_valid BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ps.id as share_id,
    COALESCE(p.first_name || ' ' || p.last_name, u.email) as owner_name,
    ps.title as share_title,
    ps.description as share_description,
    ps.entry_ids,
    (ps.is_active AND (ps.expires_at IS NULL OR ps.expires_at > NOW())) as is_valid
  FROM public.portfolio_shares ps
  JOIN auth.users u ON u.id = ps.user_id
  LEFT JOIN public.profiles p ON p.id = ps.user_id
  WHERE ps.token = share_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
