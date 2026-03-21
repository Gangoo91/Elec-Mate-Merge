-- Time sessions for callout/job hour tracking
CREATE TABLE IF NOT EXISTS time_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT,                              -- optional job description
  notes TEXT,                              -- optional memo added at end
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,                    -- NULL = currently running
  duration_seconds INTEGER,                -- computed on stop
  hourly_rate NUMERIC(10,2),               -- snapshot of rate at time of session
  invoice_id UUID,                         -- set when converted to invoice
  invoiced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Only one active session per user at a time
CREATE UNIQUE INDEX IF NOT EXISTS time_sessions_active_user
  ON time_sessions(user_id)
  WHERE ended_at IS NULL;

-- RLS
ALTER TABLE time_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "time_sessions_owner_select" ON time_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "time_sessions_owner_insert" ON time_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "time_sessions_owner_update" ON time_sessions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "time_sessions_owner_delete" ON time_sessions
  FOR DELETE USING (auth.uid() = user_id);
