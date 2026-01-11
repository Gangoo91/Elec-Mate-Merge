-- Migration: Create peer support tables
-- This migration creates the tables required for peer-to-peer mental health support
-- IMPORTANT: Run this migration BEFORE 20260107_create_peer_blocks_and_reports.sql
-- as that migration references mental_health_peer_conversations

-- =====================================================
-- Table: mental_health_peer_supporters
-- Stores peer supporter profiles (users who volunteer to help others)
-- =====================================================
CREATE TABLE IF NOT EXISTS mental_health_peer_supporters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  is_available BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  training_level TEXT DEFAULT 'peer' CHECK (training_level IN ('peer', 'trained', 'mhfa_certified')),
  topics_comfortable_with TEXT[] DEFAULT '{}',
  total_conversations INTEGER DEFAULT 0,
  last_active_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- =====================================================
-- Table: mental_health_peer_conversations
-- Stores conversations between seekers and supporters
-- =====================================================
CREATE TABLE IF NOT EXISTS mental_health_peer_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supporter_id UUID REFERENCES mental_health_peer_supporters(id) ON DELETE SET NULL,
  seeker_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'ended', 'archived')),
  started_at TIMESTAMPTZ DEFAULT now(),
  ended_at TIMESTAMPTZ,
  last_message_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- Table: mental_health_peer_messages
-- Stores messages within peer support conversations
-- =====================================================
CREATE TABLE IF NOT EXISTS mental_health_peer_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES mental_health_peer_conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- RLS Policies
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE mental_health_peer_supporters ENABLE ROW LEVEL SECURITY;
ALTER TABLE mental_health_peer_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE mental_health_peer_messages ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- Peer Supporters Policies
-- =====================================================

-- Anyone can view available supporters (for browsing)
CREATE POLICY "Anyone can view available supporters" ON mental_health_peer_supporters
  FOR SELECT USING (is_available = true AND is_active = true);

-- Users can view their own supporter profile
CREATE POLICY "Users can view own supporter profile" ON mental_health_peer_supporters
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own supporter profile
CREATE POLICY "Users can create own supporter profile" ON mental_health_peer_supporters
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own supporter profile
CREATE POLICY "Users can update own supporter profile" ON mental_health_peer_supporters
  FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- Peer Conversations Policies
-- =====================================================

-- Users can view conversations they're part of (as seeker or supporter)
CREATE POLICY "Users can view own conversations" ON mental_health_peer_conversations
  FOR SELECT USING (
    auth.uid() = seeker_id OR
    EXISTS (
      SELECT 1 FROM mental_health_peer_supporters
      WHERE id = mental_health_peer_conversations.supporter_id
      AND user_id = auth.uid()
    )
  );

-- Seekers can start conversations
CREATE POLICY "Users can start conversations" ON mental_health_peer_conversations
  FOR INSERT WITH CHECK (auth.uid() = seeker_id);

-- Participants can update conversation status
CREATE POLICY "Participants can update conversations" ON mental_health_peer_conversations
  FOR UPDATE USING (
    auth.uid() = seeker_id OR
    EXISTS (
      SELECT 1 FROM mental_health_peer_supporters
      WHERE id = mental_health_peer_conversations.supporter_id
      AND user_id = auth.uid()
    )
  );

-- =====================================================
-- Peer Messages Policies
-- =====================================================

-- Users can view messages in conversations they're part of
CREATE POLICY "Users can view messages in own conversations" ON mental_health_peer_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM mental_health_peer_conversations c
      WHERE c.id = mental_health_peer_messages.conversation_id
      AND (
        c.seeker_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM mental_health_peer_supporters s
          WHERE s.id = c.supporter_id AND s.user_id = auth.uid()
        )
      )
    )
  );

-- Users can send messages in conversations they're part of
CREATE POLICY "Users can send messages in own conversations" ON mental_health_peer_messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM mental_health_peer_conversations c
      WHERE c.id = mental_health_peer_messages.conversation_id
      AND (
        c.seeker_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM mental_health_peer_supporters s
          WHERE s.id = c.supporter_id AND s.user_id = auth.uid()
        )
      )
    )
  );

-- Users can mark messages as read in their conversations
CREATE POLICY "Users can mark messages as read" ON mental_health_peer_messages
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM mental_health_peer_conversations c
      WHERE c.id = mental_health_peer_messages.conversation_id
      AND (
        c.seeker_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM mental_health_peer_supporters s
          WHERE s.id = c.supporter_id AND s.user_id = auth.uid()
        )
      )
    )
  );

-- =====================================================
-- Indexes for Performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_peer_supporters_user ON mental_health_peer_supporters(user_id);
CREATE INDEX IF NOT EXISTS idx_peer_supporters_available ON mental_health_peer_supporters(is_available, is_active);
CREATE INDEX IF NOT EXISTS idx_peer_conversations_seeker ON mental_health_peer_conversations(seeker_id);
CREATE INDEX IF NOT EXISTS idx_peer_conversations_supporter ON mental_health_peer_conversations(supporter_id);
CREATE INDEX IF NOT EXISTS idx_peer_conversations_status ON mental_health_peer_conversations(status);
CREATE INDEX IF NOT EXISTS idx_peer_messages_conversation ON mental_health_peer_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_peer_messages_sender ON mental_health_peer_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_peer_messages_unread ON mental_health_peer_messages(conversation_id, is_read) WHERE is_read = false;

-- =====================================================
-- Trigger: Update last_message_at on new message
-- =====================================================
CREATE OR REPLACE FUNCTION update_conversation_last_message_at()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE mental_health_peer_conversations
  SET last_message_at = NEW.created_at
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_update_conversation_last_message
  AFTER INSERT ON mental_health_peer_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_last_message_at();

-- =====================================================
-- Trigger: Increment supporter conversation count
-- =====================================================
CREATE OR REPLACE FUNCTION increment_supporter_conversation_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.supporter_id IS NOT NULL THEN
    UPDATE mental_health_peer_supporters
    SET total_conversations = total_conversations + 1
    WHERE id = NEW.supporter_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_increment_supporter_conversations
  AFTER INSERT ON mental_health_peer_conversations
  FOR EACH ROW
  EXECUTE FUNCTION increment_supporter_conversation_count();

-- =====================================================
-- Enable Realtime for messages (for live chat)
-- =====================================================
ALTER PUBLICATION supabase_realtime ADD TABLE mental_health_peer_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE mental_health_peer_supporters;
