-- Migration: Fix company_profiles and mental_health_peer_supporters tables
-- This migration ensures both tables exist with proper RLS policies
-- Uses IF NOT EXISTS to be idempotent

-- =====================================================
-- COMPANY PROFILES TABLE
-- =====================================================

-- Create table if not exists
CREATE TABLE IF NOT EXISTS public.company_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  company_address TEXT,
  company_postcode TEXT,
  company_phone TEXT,
  company_email TEXT,
  company_website TEXT,
  company_registration TEXT,
  vat_number TEXT,
  logo_url TEXT,
  logo_data_url TEXT,
  primary_color TEXT DEFAULT '#1e40af',
  secondary_color TEXT DEFAULT '#3b82f6',
  currency TEXT DEFAULT 'GBP',
  locale TEXT DEFAULT 'en-GB',
  payment_terms TEXT DEFAULT '30 days',
  bank_details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.company_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own company profile" ON public.company_profiles;
DROP POLICY IF EXISTS "Users can create their own company profile" ON public.company_profiles;
DROP POLICY IF EXISTS "Users can update their own company profile" ON public.company_profiles;
DROP POLICY IF EXISTS "Users can delete their own company profile" ON public.company_profiles;

-- Create RLS policies
CREATE POLICY "Users can view their own company profile"
ON public.company_profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own company profile"
ON public.company_profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own company profile"
ON public.company_profiles
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own company profile"
ON public.company_profiles
FOR DELETE
USING (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_company_profiles_user_id ON public.company_profiles(user_id);

-- =====================================================
-- MENTAL HEALTH PEER SUPPORTERS TABLE
-- =====================================================

-- Create table if not exists
CREATE TABLE IF NOT EXISTS public.mental_health_peer_supporters (
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

-- Enable RLS
ALTER TABLE public.mental_health_peer_supporters ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can view available supporters" ON public.mental_health_peer_supporters;
DROP POLICY IF EXISTS "Users can view own supporter profile" ON public.mental_health_peer_supporters;
DROP POLICY IF EXISTS "Users can create own supporter profile" ON public.mental_health_peer_supporters;
DROP POLICY IF EXISTS "Users can update own supporter profile" ON public.mental_health_peer_supporters;

-- Create RLS policies
-- Anyone can view available supporters (for browsing)
CREATE POLICY "Anyone can view available supporters" ON public.mental_health_peer_supporters
  FOR SELECT USING (is_available = true AND is_active = true);

-- Users can view their own supporter profile (even if not available)
CREATE POLICY "Users can view own supporter profile" ON public.mental_health_peer_supporters
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own supporter profile
CREATE POLICY "Users can create own supporter profile" ON public.mental_health_peer_supporters
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own supporter profile
CREATE POLICY "Users can update own supporter profile" ON public.mental_health_peer_supporters
  FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_peer_supporters_user ON public.mental_health_peer_supporters(user_id);
CREATE INDEX IF NOT EXISTS idx_peer_supporters_available ON public.mental_health_peer_supporters(is_available, is_active);

-- =====================================================
-- MENTAL HEALTH PEER CONVERSATIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.mental_health_peer_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supporter_id UUID REFERENCES public.mental_health_peer_supporters(id) ON DELETE SET NULL,
  seeker_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'ended', 'archived')),
  started_at TIMESTAMPTZ DEFAULT now(),
  ended_at TIMESTAMPTZ,
  last_message_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mental_health_peer_conversations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own conversations" ON public.mental_health_peer_conversations;
DROP POLICY IF EXISTS "Users can start conversations" ON public.mental_health_peer_conversations;
DROP POLICY IF EXISTS "Participants can update conversations" ON public.mental_health_peer_conversations;

-- Create RLS policies
CREATE POLICY "Users can view own conversations" ON public.mental_health_peer_conversations
  FOR SELECT USING (
    auth.uid() = seeker_id OR
    EXISTS (
      SELECT 1 FROM public.mental_health_peer_supporters
      WHERE id = mental_health_peer_conversations.supporter_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can start conversations" ON public.mental_health_peer_conversations
  FOR INSERT WITH CHECK (auth.uid() = seeker_id);

CREATE POLICY "Participants can update conversations" ON public.mental_health_peer_conversations
  FOR UPDATE USING (
    auth.uid() = seeker_id OR
    EXISTS (
      SELECT 1 FROM public.mental_health_peer_supporters
      WHERE id = mental_health_peer_conversations.supporter_id
      AND user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_peer_conversations_seeker ON public.mental_health_peer_conversations(seeker_id);
CREATE INDEX IF NOT EXISTS idx_peer_conversations_supporter ON public.mental_health_peer_conversations(supporter_id);
CREATE INDEX IF NOT EXISTS idx_peer_conversations_status ON public.mental_health_peer_conversations(status);

-- =====================================================
-- MENTAL HEALTH PEER MESSAGES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.mental_health_peer_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.mental_health_peer_conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mental_health_peer_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view messages in own conversations" ON public.mental_health_peer_messages;
DROP POLICY IF EXISTS "Users can send messages in own conversations" ON public.mental_health_peer_messages;
DROP POLICY IF EXISTS "Users can mark messages as read" ON public.mental_health_peer_messages;

-- Create RLS policies
CREATE POLICY "Users can view messages in own conversations" ON public.mental_health_peer_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.mental_health_peer_conversations c
      WHERE c.id = mental_health_peer_messages.conversation_id
      AND (
        c.seeker_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.mental_health_peer_supporters s
          WHERE s.id = c.supporter_id AND s.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Users can send messages in own conversations" ON public.mental_health_peer_messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.mental_health_peer_conversations c
      WHERE c.id = mental_health_peer_messages.conversation_id
      AND (
        c.seeker_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.mental_health_peer_supporters s
          WHERE s.id = c.supporter_id AND s.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Users can mark messages as read" ON public.mental_health_peer_messages
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.mental_health_peer_conversations c
      WHERE c.id = mental_health_peer_messages.conversation_id
      AND (
        c.seeker_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.mental_health_peer_supporters s
          WHERE s.id = c.supporter_id AND s.user_id = auth.uid()
        )
      )
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_peer_messages_conversation ON public.mental_health_peer_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_peer_messages_sender ON public.mental_health_peer_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_peer_messages_unread ON public.mental_health_peer_messages(conversation_id, is_read) WHERE is_read = false;

-- =====================================================
-- MENTAL HEALTH PEER BLOCKS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.mental_health_peer_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  blocked_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(blocker_id, blocked_user_id)
);

-- Enable RLS
ALTER TABLE public.mental_health_peer_blocks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own blocks" ON public.mental_health_peer_blocks;
DROP POLICY IF EXISTS "Users can create blocks" ON public.mental_health_peer_blocks;
DROP POLICY IF EXISTS "Users can delete own blocks" ON public.mental_health_peer_blocks;

-- Create RLS policies
CREATE POLICY "Users can view own blocks" ON public.mental_health_peer_blocks
  FOR SELECT USING (auth.uid() = blocker_id);

CREATE POLICY "Users can create blocks" ON public.mental_health_peer_blocks
  FOR INSERT WITH CHECK (auth.uid() = blocker_id);

CREATE POLICY "Users can delete own blocks" ON public.mental_health_peer_blocks
  FOR DELETE USING (auth.uid() = blocker_id);

-- =====================================================
-- MENTAL HEALTH PEER REPORTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.mental_health_peer_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reported_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES public.mental_health_peer_conversations(id) ON DELETE SET NULL,
  reason TEXT NOT NULL CHECK (reason IN ('harassment', 'inappropriate', 'spam', 'other')),
  additional_notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'actioned', 'dismissed')),
  admin_notes TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mental_health_peer_reports ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can create reports" ON public.mental_health_peer_reports;
DROP POLICY IF EXISTS "Users can view own reports" ON public.mental_health_peer_reports;

-- Create RLS policies
CREATE POLICY "Users can create reports" ON public.mental_health_peer_reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view own reports" ON public.mental_health_peer_reports
  FOR SELECT USING (auth.uid() = reporter_id);

-- =====================================================
-- ENABLE REALTIME
-- =====================================================

-- Safely add tables to realtime publication (ignore if already added)
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.mental_health_peer_messages;
EXCEPTION WHEN duplicate_object THEN
  NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.mental_health_peer_supporters;
EXCEPTION WHEN duplicate_object THEN
  NULL;
END $$;
