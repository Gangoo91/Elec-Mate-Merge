-- Fix for Mental Health Hub Database Errors
-- This migration:
-- 1. Creates mental health tables if they don't exist
-- 2. Adds RLS policies to profiles table for chat functionality

-- =====================================================
-- MENTAL HEALTH TABLES
-- =====================================================

-- MOOD ENTRIES TABLE
CREATE TABLE IF NOT EXISTS public.mental_health_mood_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    mood INTEGER NOT NULL CHECK (mood >= 1 AND mood <= 5),
    notes TEXT,
    factors TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

ALTER TABLE public.mental_health_mood_entries ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_mood_entries' AND policyname = 'Users can view own mood entries') THEN
    CREATE POLICY "Users can view own mood entries" ON public.mental_health_mood_entries FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_mood_entries' AND policyname = 'Users can insert own mood entries') THEN
    CREATE POLICY "Users can insert own mood entries" ON public.mental_health_mood_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_mood_entries' AND policyname = 'Users can update own mood entries') THEN
    CREATE POLICY "Users can update own mood entries" ON public.mental_health_mood_entries FOR UPDATE USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_mood_entries' AND policyname = 'Users can delete own mood entries') THEN
    CREATE POLICY "Users can delete own mood entries" ON public.mental_health_mood_entries FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_mood_entries_user_date ON public.mental_health_mood_entries(user_id, date DESC);

-- JOURNAL ENTRIES TABLE
CREATE TABLE IF NOT EXISTS public.mental_health_journal_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    time TIME NOT NULL,
    mood INTEGER NOT NULL CHECK (mood >= 1 AND mood <= 5),
    mood_label TEXT,
    content TEXT,
    gratitude TEXT[] DEFAULT '{}',
    triggers TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    prompt TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.mental_health_journal_entries ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_journal_entries' AND policyname = 'Users can view own journal entries') THEN
    CREATE POLICY "Users can view own journal entries" ON public.mental_health_journal_entries FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_journal_entries' AND policyname = 'Users can insert own journal entries') THEN
    CREATE POLICY "Users can insert own journal entries" ON public.mental_health_journal_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_journal_entries' AND policyname = 'Users can update own journal entries') THEN
    CREATE POLICY "Users can update own journal entries" ON public.mental_health_journal_entries FOR UPDATE USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_journal_entries' AND policyname = 'Users can delete own journal entries') THEN
    CREATE POLICY "Users can delete own journal entries" ON public.mental_health_journal_entries FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_journal_entries_user_date ON public.mental_health_journal_entries(user_id, date DESC);

-- SLEEP ENTRIES TABLE
CREATE TABLE IF NOT EXISTS public.mental_health_sleep_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    bed_time TIME NOT NULL,
    wake_time TIME NOT NULL,
    hours DECIMAL(3,1) NOT NULL,
    quality INTEGER NOT NULL CHECK (quality >= 1 AND quality <= 5),
    notes TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

ALTER TABLE public.mental_health_sleep_entries ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_sleep_entries' AND policyname = 'Users can view own sleep entries') THEN
    CREATE POLICY "Users can view own sleep entries" ON public.mental_health_sleep_entries FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_sleep_entries' AND policyname = 'Users can insert own sleep entries') THEN
    CREATE POLICY "Users can insert own sleep entries" ON public.mental_health_sleep_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_sleep_entries' AND policyname = 'Users can update own sleep entries') THEN
    CREATE POLICY "Users can update own sleep entries" ON public.mental_health_sleep_entries FOR UPDATE USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_sleep_entries' AND policyname = 'Users can delete own sleep entries') THEN
    CREATE POLICY "Users can delete own sleep entries" ON public.mental_health_sleep_entries FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_sleep_entries_user_date ON public.mental_health_sleep_entries(user_id, date DESC);

-- SAFETY PLANS TABLE
CREATE TABLE IF NOT EXISTS public.mental_health_safety_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    warning_signs TEXT[] DEFAULT '{}',
    coping_strategies TEXT[] DEFAULT '{}',
    distractions TEXT[] DEFAULT '{}',
    support_people JSONB DEFAULT '[]',
    professionals JSONB DEFAULT '[]',
    safe_environment TEXT[] DEFAULT '{}',
    reasons_for_living TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

ALTER TABLE public.mental_health_safety_plans ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_safety_plans' AND policyname = 'Users can view own safety plan') THEN
    CREATE POLICY "Users can view own safety plan" ON public.mental_health_safety_plans FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_safety_plans' AND policyname = 'Users can insert own safety plan') THEN
    CREATE POLICY "Users can insert own safety plan" ON public.mental_health_safety_plans FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_safety_plans' AND policyname = 'Users can update own safety plan') THEN
    CREATE POLICY "Users can update own safety plan" ON public.mental_health_safety_plans FOR UPDATE USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_safety_plans' AND policyname = 'Users can delete own safety plan') THEN
    CREATE POLICY "Users can delete own safety plan" ON public.mental_health_safety_plans FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_safety_plans_user ON public.mental_health_safety_plans(user_id);

-- GROUNDING PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.mental_health_grounding_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    exercises_completed TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

ALTER TABLE public.mental_health_grounding_progress ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_grounding_progress' AND policyname = 'Users can view own grounding progress') THEN
    CREATE POLICY "Users can view own grounding progress" ON public.mental_health_grounding_progress FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_grounding_progress' AND policyname = 'Users can insert own grounding progress') THEN
    CREATE POLICY "Users can insert own grounding progress" ON public.mental_health_grounding_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'mental_health_grounding_progress' AND policyname = 'Users can update own grounding progress') THEN
    CREATE POLICY "Users can update own grounding progress" ON public.mental_health_grounding_progress FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_grounding_progress_user_date ON public.mental_health_grounding_progress(user_id, date DESC);

-- UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_mental_health_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
DROP TRIGGER IF EXISTS update_mood_entries_updated_at ON public.mental_health_mood_entries;
CREATE TRIGGER update_mood_entries_updated_at
    BEFORE UPDATE ON public.mental_health_mood_entries
    FOR EACH ROW EXECUTE FUNCTION update_mental_health_updated_at();

DROP TRIGGER IF EXISTS update_journal_entries_updated_at ON public.mental_health_journal_entries;
CREATE TRIGGER update_journal_entries_updated_at
    BEFORE UPDATE ON public.mental_health_journal_entries
    FOR EACH ROW EXECUTE FUNCTION update_mental_health_updated_at();

DROP TRIGGER IF EXISTS update_sleep_entries_updated_at ON public.mental_health_sleep_entries;
CREATE TRIGGER update_sleep_entries_updated_at
    BEFORE UPDATE ON public.mental_health_sleep_entries
    FOR EACH ROW EXECUTE FUNCTION update_mental_health_updated_at();

DROP TRIGGER IF EXISTS update_safety_plans_updated_at ON public.mental_health_safety_plans;
CREATE TRIGGER update_safety_plans_updated_at
    BEFORE UPDATE ON public.mental_health_safety_plans
    FOR EACH ROW EXECUTE FUNCTION update_mental_health_updated_at();

-- =====================================================
-- PROFILES TABLE RLS POLICIES
-- =====================================================

-- Enable RLS on profiles table (may already be enabled)
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated users can view basic profile info" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Allow authenticated users to view basic profile info of other users
-- This is needed for chat, peer support, and displaying user names
CREATE POLICY "Authenticated users can view basic profile info"
  ON public.profiles
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow users to insert their own profile (for new signups)
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);
