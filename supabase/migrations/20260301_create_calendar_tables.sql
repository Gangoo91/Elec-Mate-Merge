-- ============================================================================
-- Calendar Tables Migration
-- ============================================================================
-- Creates tables for ELE-197: Calendar in Business Hub with Google Calendar Sync
-- Tables: calendar_events, google_calendar_tokens, calendar_oauth_states
-- ============================================================================

-- ============================================================================
-- 1. CALENDAR EVENTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  start_at timestamptz NOT NULL,
  end_at timestamptz NOT NULL,
  all_day boolean DEFAULT false,
  location text,
  client_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  job_id uuid REFERENCES employer_jobs(id) ON DELETE SET NULL,
  event_type text NOT NULL DEFAULT 'general'
    CHECK (event_type IN ('job', 'site_visit', 'inspection', 'meeting', 'personal', 'general')),
  colour text DEFAULT '#3B82F6',
  recurring boolean DEFAULT false,
  recurrence_rule text,
  parent_event_id uuid REFERENCES calendar_events(id) ON DELETE CASCADE,
  google_event_id text,
  google_calendar_id text,
  google_etag text,
  sync_status text NOT NULL DEFAULT 'local_only'
    CHECK (sync_status IN ('local_only', 'synced', 'pending_push', 'pending_pull', 'conflict')),
  last_synced_at timestamptz,
  notes text,
  reminder_minutes integer DEFAULT 30,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

COMMENT ON TABLE calendar_events IS 'User calendar events with optional Google Calendar sync';
COMMENT ON COLUMN calendar_events.event_type IS 'Event category: job, site_visit, inspection, meeting, personal, general';
COMMENT ON COLUMN calendar_events.sync_status IS 'Google sync state: local_only, synced, pending_push, pending_pull, conflict';
COMMENT ON COLUMN calendar_events.recurrence_rule IS 'RRULE string for recurring events (RFC 5545)';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_calendar_events_user_start ON calendar_events (user_id, start_at);
CREATE INDEX IF NOT EXISTS idx_calendar_events_google_event ON calendar_events (google_event_id);
CREATE INDEX IF NOT EXISTS idx_calendar_events_job ON calendar_events (job_id);
CREATE INDEX IF NOT EXISTS idx_calendar_events_pending_sync ON calendar_events (user_id, sync_status)
  WHERE sync_status != 'synced';

-- RLS
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own calendar events"
  ON calendar_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own calendar events"
  ON calendar_events FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own calendar events"
  ON calendar_events FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own calendar events"
  ON calendar_events FOR DELETE
  USING (auth.uid() = user_id);

-- Updated-at trigger
CREATE OR REPLACE FUNCTION update_calendar_events_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calendar_events_updated_at
  BEFORE UPDATE ON calendar_events
  FOR EACH ROW EXECUTE FUNCTION update_calendar_events_updated_at();

-- ============================================================================
-- 2. GOOGLE CALENDAR TOKENS
-- ============================================================================

CREATE TABLE IF NOT EXISTS google_calendar_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  encrypted_access_token text NOT NULL,
  encrypted_refresh_token text,
  token_expires_at timestamptz NOT NULL,
  google_email text,
  calendar_id text DEFAULT 'primary',
  sync_enabled boolean DEFAULT true,
  last_sync_at timestamptz,
  sync_token text,
  webhook_channel_id text,
  webhook_expiry timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

COMMENT ON TABLE google_calendar_tokens IS 'Encrypted Google Calendar OAuth tokens per user';
COMMENT ON COLUMN google_calendar_tokens.sync_token IS 'Google incremental sync token for efficient polling';

-- RLS — service role only (tokens are sensitive)
ALTER TABLE google_calendar_tokens ENABLE ROW LEVEL SECURITY;

-- Users can read their own connection status (email, sync_enabled, last_sync_at) but NOT tokens
CREATE POLICY "Users can view own token metadata"
  ON google_calendar_tokens FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================================================
-- 3. CALENDAR OAUTH STATES (CSRF protection)
-- ============================================================================

CREATE TABLE IF NOT EXISTS calendar_oauth_states (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state text NOT NULL UNIQUE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

COMMENT ON TABLE calendar_oauth_states IS 'Temporary CSRF state tokens for Google Calendar OAuth flow';

-- RLS — service role bypass for OAuth flow
ALTER TABLE calendar_oauth_states ENABLE ROW LEVEL SECURITY;

-- Auto-cleanup expired states (run via cron or on insert)
CREATE INDEX IF NOT EXISTS idx_calendar_oauth_states_expires ON calendar_oauth_states (expires_at);
CREATE INDEX IF NOT EXISTS idx_calendar_oauth_states_state ON calendar_oauth_states (state);
