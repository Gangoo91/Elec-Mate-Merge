-- ============================================================================
-- Elec-AI Infrastructure Migration
-- ============================================================================
-- Creates all tables and columns required for the Business AI agent system.
-- Covers: ELE-153, ELE-125, ELE-120, ELE-155, ELE-158, ELE-123, ELE-203,
--         ELE-204, ELE-205, ELE-206, ELE-207, ELE-208
-- ============================================================================

-- ============================================================================
-- 1. PROFILES TABLE — Agent columns (ELE-153, ELE-125, ELE-204, ELE-205)
-- ============================================================================

-- Business AI subscription flag (ELE-125)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS business_ai_enabled boolean DEFAULT false;

-- Agent provisioning state (ELE-153)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS agent_status text DEFAULT 'inactive';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS agent_port int;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS agent_provisioned_at timestamptz;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS agent_last_active timestamptz;

-- Agent health monitoring (ELE-204)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS agent_health_status text DEFAULT 'unknown';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS agent_last_health_check timestamptz;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS agent_consecutive_failures int DEFAULT 0;

-- Agent workspace version tracking (ELE-205)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS agent_workspace_version text DEFAULT '4.0.0';

-- WhatsApp number for agent routing (ELE-151)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS agent_whatsapp_number text;

COMMENT ON COLUMN profiles.business_ai_enabled IS 'Whether user has active Business AI subscription';
COMMENT ON COLUMN profiles.agent_status IS 'Agent container state: inactive | starting | active | error | killed | deprovisioned';
COMMENT ON COLUMN profiles.agent_port IS 'Unique port assigned to this user agent container';
COMMENT ON COLUMN profiles.agent_provisioned_at IS 'When agent was first provisioned';
COMMENT ON COLUMN profiles.agent_last_active IS 'Last time agent processed a message or action';
COMMENT ON COLUMN profiles.agent_health_status IS 'Health monitor state: unknown | healthy | unhealthy | error';
COMMENT ON COLUMN profiles.agent_last_health_check IS 'Last successful health check timestamp';
COMMENT ON COLUMN profiles.agent_consecutive_failures IS 'Number of consecutive health check failures';
COMMENT ON COLUMN profiles.agent_workspace_version IS 'Version of .md files running in agent workspace';
COMMENT ON COLUMN profiles.agent_whatsapp_number IS 'WhatsApp number registered for this user agent';

-- ============================================================================
-- 2. USER AGENT PREFERENCES (ELE-155 — Memory persistence)
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_agent_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  key text NOT NULL,
  value text NOT NULL,
  source text CHECK (source IN ('user_stated', 'agent_learned')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (user_id, key)
);

CREATE INDEX IF NOT EXISTS idx_agent_prefs_user ON user_agent_preferences(user_id);

COMMENT ON TABLE user_agent_preferences IS 'Agent-learned and user-stated preferences, synced between MEMORY.md and Supabase';

ALTER TABLE user_agent_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own agent preferences"
  ON user_agent_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own agent preferences"
  ON user_agent_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own agent preferences"
  ON user_agent_preferences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own agent preferences"
  ON user_agent_preferences FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 3. CLIENT COMMS CONSENT (ELE-158 — WhatsApp opt-in compliance)
-- ============================================================================

CREATE TABLE IF NOT EXISTS client_comms_consent (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  channel text NOT NULL CHECK (channel IN ('whatsapp', 'sms', 'email')),
  consented boolean NOT NULL DEFAULT false,
  consent_method text CHECK (consent_method IN ('booking_form', 'opt_in_link', 'reply', 'manual')),
  consented_at timestamptz,
  withdrawn_at timestamptz,
  ip_address text,
  created_at timestamptz DEFAULT now(),
  UNIQUE (customer_id, channel)
);

CREATE INDEX IF NOT EXISTS idx_consent_customer ON client_comms_consent(customer_id);
CREATE INDEX IF NOT EXISTS idx_consent_user ON client_comms_consent(user_id);

COMMENT ON TABLE client_comms_consent IS 'GDPR/WhatsApp consent records for client messaging. Audit trail kept indefinitely.';

ALTER TABLE client_comms_consent ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view consent for own customers"
  ON client_comms_consent FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert consent for own customers"
  ON client_comms_consent FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update consent for own customers"
  ON client_comms_consent FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 4. AGENT ACTION LOG (ELE-123 — Activity log)
-- ============================================================================

CREATE TABLE IF NOT EXISTS agent_action_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  action_type text NOT NULL,
  description text,
  customer_name text,
  detail jsonb,
  outcome text,
  undoable boolean DEFAULT false,
  undo_payload jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_action_log_user ON agent_action_log(user_id);
CREATE INDEX IF NOT EXISTS idx_action_log_user_created ON agent_action_log(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_action_log_type ON agent_action_log(action_type);

COMMENT ON TABLE agent_action_log IS 'Full audit trail of every action taken by a user agent. Retained 12 months.';

ALTER TABLE agent_action_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own agent actions"
  ON agent_action_log FOR SELECT
  USING (auth.uid() = user_id);

-- Agent writes via service role, users only read
CREATE POLICY "Service role can insert agent actions"
  ON agent_action_log FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- 5. PHONE NUMBER ROUTING (ELE-203 — Message router)
-- ============================================================================

CREATE TABLE IF NOT EXISTS phone_number_routing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text NOT NULL UNIQUE,
  owner_type text NOT NULL CHECK (owner_type IN ('electrician', 'client')),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  registered_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_phone_routing_number ON phone_number_routing(phone_number);
CREATE INDEX IF NOT EXISTS idx_phone_routing_user ON phone_number_routing(user_id);

COMMENT ON TABLE phone_number_routing IS 'Maps phone numbers to users/customers for WhatsApp message routing';

ALTER TABLE phone_number_routing ENABLE ROW LEVEL SECURITY;

-- Only service role accesses this table (webhook router)
CREATE POLICY "Service role full access to phone routing"
  ON phone_number_routing FOR ALL
  USING (true);

-- ============================================================================
-- 6. AGENT WORKSPACE VERSIONS (ELE-205 — Update rollout)
-- ============================================================================

CREATE TABLE IF NOT EXISTS agent_workspace_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version text NOT NULL,
  files_changed text[],
  changelog text,
  deployed_at timestamptz DEFAULT now(),
  deployed_by uuid REFERENCES profiles(id)
);

CREATE INDEX IF NOT EXISTS idx_workspace_versions_deployed ON agent_workspace_versions(deployed_at DESC);

COMMENT ON TABLE agent_workspace_versions IS 'Tracks agent .md file version deployments across fleet';

ALTER TABLE agent_workspace_versions ENABLE ROW LEVEL SECURITY;

-- Admin only
CREATE POLICY "Admins can manage workspace versions"
  ON agent_workspace_versions FOR ALL
  USING (true);

-- ============================================================================
-- 7. AGENT INCIDENTS (ELE-206 — Kill switch)
-- ============================================================================

CREATE TABLE IF NOT EXISTS agent_incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL CHECK (action IN ('kill_all', 'resume_all', 'kill_one', 'resume_one')),
  reason text NOT NULL,
  triggered_by uuid REFERENCES profiles(id),
  agents_affected int,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_incidents_created ON agent_incidents(created_at DESC);

COMMENT ON TABLE agent_incidents IS 'Audit trail of kill switch activations. Never auto-deleted.';

ALTER TABLE agent_incidents ENABLE ROW LEVEL SECURITY;

-- Admin only
CREATE POLICY "Admins can manage incidents"
  ON agent_incidents FOR ALL
  USING (true);

-- ============================================================================
-- 8. AGENT USAGE (ELE-207 — Usage metering)
-- ============================================================================

CREATE TABLE IF NOT EXISTS agent_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT current_date,
  input_tokens bigint DEFAULT 0,
  output_tokens bigint DEFAULT 0,
  tool_calls int DEFAULT 0,
  messages_sent int DEFAULT 0,
  messages_received int DEFAULT 0,
  edge_function_calls int DEFAULT 0,
  rag_queries int DEFAULT 0,
  estimated_cost_gbp numeric(10,4) DEFAULT 0,
  UNIQUE (user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_agent_usage_user_date ON agent_usage(user_id, date);

COMMENT ON TABLE agent_usage IS 'Per-user daily API token consumption and cost tracking';

ALTER TABLE agent_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own usage"
  ON agent_usage FOR SELECT
  USING (auth.uid() = user_id);

-- Agent/edge functions write via service role
CREATE POLICY "Service role can insert/update usage"
  ON agent_usage FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update usage"
  ON agent_usage FOR UPDATE
  USING (true);

-- ============================================================================
-- 9. HELPER FUNCTION — Upsert usage counters (ELE-207)
-- ============================================================================

CREATE OR REPLACE FUNCTION increment_agent_usage(
  p_user_id uuid,
  p_input_tokens bigint DEFAULT 0,
  p_output_tokens bigint DEFAULT 0,
  p_tool_calls int DEFAULT 0,
  p_messages_sent int DEFAULT 0,
  p_messages_received int DEFAULT 0,
  p_edge_function_calls int DEFAULT 0,
  p_rag_queries int DEFAULT 0
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO agent_usage (user_id, date, input_tokens, output_tokens, tool_calls, messages_sent, messages_received, edge_function_calls, rag_queries)
  VALUES (p_user_id, current_date, p_input_tokens, p_output_tokens, p_tool_calls, p_messages_sent, p_messages_received, p_edge_function_calls, p_rag_queries)
  ON CONFLICT (user_id, date)
  DO UPDATE SET
    input_tokens = agent_usage.input_tokens + EXCLUDED.input_tokens,
    output_tokens = agent_usage.output_tokens + EXCLUDED.output_tokens,
    tool_calls = agent_usage.tool_calls + EXCLUDED.tool_calls,
    messages_sent = agent_usage.messages_sent + EXCLUDED.messages_sent,
    messages_received = agent_usage.messages_received + EXCLUDED.messages_received,
    edge_function_calls = agent_usage.edge_function_calls + EXCLUDED.edge_function_calls,
    rag_queries = agent_usage.rag_queries + EXCLUDED.rag_queries;
END;
$$;

COMMENT ON FUNCTION increment_agent_usage IS 'Atomic counter increment for agent usage tracking. Called by edge functions after each API call.';
