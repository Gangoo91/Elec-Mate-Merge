-- Drop existing conversation_memory if it exists to recreate with proper structure
DROP TABLE IF EXISTS conversation_memory CASCADE;

-- Create install_planner_results table for completed designs
CREATE TABLE IF NOT EXISTS install_planner_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  conversation_id text,
  
  -- Project info
  project_name text NOT NULL,
  installation_type text NOT NULL,
  
  -- Design data
  circuits jsonb NOT NULL DEFAULT '[]'::jsonb,
  agent_outputs jsonb NOT NULL DEFAULT '{}'::jsonb,
  
  -- Cost breakdown
  total_cost jsonb NOT NULL DEFAULT '{
    "materials": 0,
    "labour": 0,
    "overhead": 0,
    "profit": 0,
    "subtotal": 0,
    "vat": 0,
    "total": 0
  }'::jsonb,
  
  -- Compliance
  compliance jsonb NOT NULL DEFAULT '{
    "bs7671": false,
    "partP": false,
    "warnings": []
  }'::jsonb,
  
  -- Export tracking
  export_history jsonb DEFAULT '[]'::jsonb,
  
  -- Photos
  photos jsonb DEFAULT '[]'::jsonb,
  
  -- Share settings
  share_token text UNIQUE,
  share_enabled boolean DEFAULT false,
  share_expires_at timestamptz,
  
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Recreate conversation_memory table with proper structure
CREATE TABLE conversation_memory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_id text UNIQUE NOT NULL,
  project_name text,
  
  -- Conversation data
  conversation_data jsonb NOT NULL DEFAULT '[]'::jsonb,
  plan_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  
  -- Agent tracking
  active_agents text[] DEFAULT '{}',
  last_agent text,
  message_count integer DEFAULT 0,
  
  -- Link to results if saved
  result_id uuid REFERENCES install_planner_results(id) ON DELETE SET NULL,
  
  -- Timestamps
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  resumed_at timestamptz
);

-- Indexes for performance
CREATE INDEX idx_conversation_memory_user_new ON conversation_memory(user_id);
CREATE INDEX idx_conversation_memory_session_new ON conversation_memory(session_id);
CREATE INDEX idx_conversation_memory_updated_new ON conversation_memory(updated_at DESC);

CREATE INDEX idx_install_planner_results_user ON install_planner_results(user_id);
CREATE INDEX idx_install_planner_results_created ON install_planner_results(created_at DESC);
CREATE INDEX idx_install_planner_results_share ON install_planner_results(share_token) WHERE share_token IS NOT NULL;

-- RLS Policies for conversation_memory
ALTER TABLE conversation_memory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own conversations"
  ON conversation_memory
  FOR ALL
  USING (auth.uid() = user_id);

-- RLS Policies for install_planner_results
ALTER TABLE install_planner_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own results"
  ON install_planner_results
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own results"
  ON install_planner_results
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own results"
  ON install_planner_results
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users delete own results"
  ON install_planner_results
  FOR DELETE
  USING (auth.uid() = user_id);

-- Public access via share token
CREATE POLICY "Public view shared results"
  ON install_planner_results
  FOR SELECT
  USING (
    share_enabled = true 
    AND share_expires_at > now()
  );

-- Auto-update timestamps
CREATE OR REPLACE FUNCTION update_conversation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER conversation_memory_updated_new
  BEFORE UPDATE ON conversation_memory
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_timestamp();

CREATE TRIGGER install_planner_results_updated_new
  BEFORE UPDATE ON install_planner_results
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();