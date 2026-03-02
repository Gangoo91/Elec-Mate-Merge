-- ============================================================================
-- Phone Verification & Agent JWT Tokens
-- ============================================================================
-- Adds OTP verification for Business AI phone registration and
-- long-lived JWT storage for per-user MCP authentication.
-- ============================================================================

-- ============================================================================
-- 1. PHONE VERIFICATION CODES (OTP for Business AI registration)
-- ============================================================================

CREATE TABLE IF NOT EXISTS phone_verification_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  phone_number text NOT NULL,
  code text NOT NULL,
  attempts int DEFAULT 0,
  max_attempts int DEFAULT 3,
  expires_at timestamptz NOT NULL,
  verified_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_phone_verify_user ON phone_verification_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_phone_verify_expires ON phone_verification_codes(expires_at);

COMMENT ON TABLE phone_verification_codes IS 'Temporary OTP codes for phone number verification during Business AI setup. Auto-cleaned after 24h.';

ALTER TABLE phone_verification_codes ENABLE ROW LEVEL SECURITY;

-- Users can read their own codes (to check status), service role writes
CREATE POLICY "Users can view own verification codes"
  ON phone_verification_codes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage verification codes"
  ON phone_verification_codes FOR ALL
  USING (true);

-- ============================================================================
-- 2. AGENT JWT TOKENS (long-lived tokens for MCP authentication)
-- ============================================================================

CREATE TABLE IF NOT EXISTS agent_jwt_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  token_encrypted text NOT NULL,
  expires_at timestamptz NOT NULL,
  last_used_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz DEFAULT now(),
  rotated_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_agent_jwt_user ON agent_jwt_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_agent_jwt_expires ON agent_jwt_tokens(expires_at);

COMMENT ON TABLE agent_jwt_tokens IS 'Encrypted long-lived JWTs for per-user MCP server authentication. One active token per user.';

ALTER TABLE agent_jwt_tokens ENABLE ROW LEVEL SECURITY;

-- Only service role accesses this table (provisioning + MCP server)
CREATE POLICY "Service role full access to agent JWT tokens"
  ON agent_jwt_tokens FOR ALL
  USING (true);

-- ============================================================================
-- 3. VERIFIED PHONE ON PROFILES
-- ============================================================================

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS agent_phone_verified boolean DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS agent_phone_verified_at timestamptz;

COMMENT ON COLUMN profiles.agent_phone_verified IS 'Whether agent WhatsApp phone number has been OTP-verified';
COMMENT ON COLUMN profiles.agent_phone_verified_at IS 'When phone number was last verified';

-- ============================================================================
-- 4. CLEANUP FUNCTION — Remove expired OTP codes (run daily via cron)
-- ============================================================================

CREATE OR REPLACE FUNCTION cleanup_expired_phone_codes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM phone_verification_codes
  WHERE expires_at < now() - interval '24 hours';
END;
$$;

COMMENT ON FUNCTION cleanup_expired_phone_codes IS 'Removes expired phone verification codes older than 24 hours';
