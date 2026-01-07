-- Migration: Create peer blocks and reports tables
-- Run this migration in Supabase SQL Editor

-- Table: mental_health_peer_blocks
CREATE TABLE mental_health_peer_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  blocked_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(blocker_id, blocked_user_id)
);

-- Table: mental_health_peer_reports
CREATE TABLE mental_health_peer_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reported_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES mental_health_peer_conversations(id),
  reason TEXT NOT NULL,
  additional_notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'actioned', 'dismissed')),
  admin_notes TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE mental_health_peer_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE mental_health_peer_reports ENABLE ROW LEVEL SECURITY;

-- Users can manage their own blocks
CREATE POLICY "Users can view own blocks" ON mental_health_peer_blocks
  FOR SELECT USING (auth.uid() = blocker_id);

CREATE POLICY "Users can create blocks" ON mental_health_peer_blocks
  FOR INSERT WITH CHECK (auth.uid() = blocker_id);

CREATE POLICY "Users can delete own blocks" ON mental_health_peer_blocks
  FOR DELETE USING (auth.uid() = blocker_id);

-- Users can create reports, admins can view all
CREATE POLICY "Users can create reports" ON mental_health_peer_reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view own reports" ON mental_health_peer_reports
  FOR SELECT USING (auth.uid() = reporter_id);

-- Index for performance
CREATE INDEX idx_peer_blocks_blocker ON mental_health_peer_blocks(blocker_id);
CREATE INDEX idx_peer_blocks_blocked ON mental_health_peer_blocks(blocked_user_id);
CREATE INDEX idx_peer_reports_status ON mental_health_peer_reports(status);
