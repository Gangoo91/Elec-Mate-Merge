-- ============================================================================
-- Fix Agent RLS Policies and Add Constraints
-- ============================================================================
-- Addresses critical audit findings:
-- 1. agent_action_log INSERT policy allows writing for any user_id
-- 2. agent_usage UPDATE policy allows write-to-any-user
-- 3. Missing CHECK constraints on agent_status and agent_health_status
-- 4. Missing UNIQUE constraint on agent_port
-- 5. Missing cleanup function for expired agent_jwt_tokens
-- 6. Missing outcome CHECK constraint on agent_action_log
-- ============================================================================

-- ============================================================================
-- 1. Fix agent_action_log INSERT policy
-- ============================================================================
-- Old policy: WITH CHECK (true) — allows any authenticated user to insert
-- logs with any user_id, which is a security hole.
-- New: service role inserts (from edge functions) bypass RLS entirely,
-- so we tighten the policy to only allow users to insert their own logs.

DROP POLICY IF EXISTS "Service role can insert agent actions" ON agent_action_log;

CREATE POLICY "Users can insert own agent actions"
  ON agent_action_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- 2. Fix agent_usage UPDATE policy
-- ============================================================================
-- Old policy: USING (true) — allows updating any user's usage.
-- Edge functions use service role (bypasses RLS), so tighten for normal users.

DROP POLICY IF EXISTS "Service role can update agent usage" ON agent_usage;

CREATE POLICY "Users can update own agent usage"
  ON agent_usage FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- 3. Add CHECK constraints on profiles agent columns
-- ============================================================================

-- agent_status: only valid states
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'agent_status_valid'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT agent_status_valid
      CHECK (agent_status IS NULL OR agent_status IN (
        'inactive', 'starting', 'provisioning', 'active',
        'error', 'killed', 'deprovisioned'
      ));
  END IF;
END $$;

-- agent_health_status: only valid states
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'agent_health_status_valid'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT agent_health_status_valid
      CHECK (agent_health_status IS NULL OR agent_health_status IN (
        'unknown', 'healthy', 'unhealthy', 'error'
      ));
  END IF;
END $$;

-- ============================================================================
-- 4. Add UNIQUE constraint on agent_port (partial — only non-null)
-- ============================================================================

CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_agent_port_unique
  ON profiles (agent_port) WHERE agent_port IS NOT NULL;

-- ============================================================================
-- 5. Add outcome CHECK constraint on agent_action_log
-- ============================================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'agent_action_log_outcome_valid'
  ) THEN
    ALTER TABLE agent_action_log ADD CONSTRAINT agent_action_log_outcome_valid
      CHECK (outcome IS NULL OR outcome IN ('success', 'failure', 'partial', 'pending'));
  END IF;
END $$;

-- ============================================================================
-- 6. Cleanup function for expired agent_jwt_tokens
-- ============================================================================

CREATE OR REPLACE FUNCTION cleanup_expired_agent_tokens()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete tokens that expired more than 7 days ago
  DELETE FROM agent_jwt_tokens
  WHERE expires_at < now() - interval '7 days';

  -- Delete tokens that were revoked more than 30 days ago
  DELETE FROM agent_jwt_tokens
  WHERE revoked_at IS NOT NULL
    AND revoked_at < now() - interval '30 days';
END;
$$;

COMMENT ON FUNCTION cleanup_expired_agent_tokens IS
  'Removes expired (7d) and revoked (30d) agent JWT tokens. Schedule via pg_cron.';

-- ============================================================================
-- 7. Schedule cleanup cron jobs (if pg_cron is available)
-- ============================================================================

-- Cleanup expired phone codes daily at 3 AM
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    PERFORM cron.schedule(
      'cleanup-expired-phone-codes',
      '0 3 * * *',
      'SELECT cleanup_expired_phone_codes();'
    );

    PERFORM cron.schedule(
      'cleanup-expired-agent-tokens',
      '0 4 * * *',
      'SELECT cleanup_expired_agent_tokens();'
    );
  END IF;
END $$;
