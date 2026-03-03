-- Migration: Create business_ai_waitlist table
-- Purpose: Store interest registrations for the Elec-AI / Mate product (not yet launched)
-- Users tap "Count me in" on the Elec-AI sales page → their user_id is recorded here
-- Admin can query this to notify users when the product launches

CREATE TABLE IF NOT EXISTS public.business_ai_waitlist (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT business_ai_waitlist_user_id_key UNIQUE (user_id)
);

-- RLS
ALTER TABLE public.business_ai_waitlist ENABLE ROW LEVEL SECURITY;

-- Users can register their own interest
CREATE POLICY "Users can insert their own waitlist entry"
  ON public.business_ai_waitlist
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can check if they've already registered
CREATE POLICY "Users can view their own waitlist entry"
  ON public.business_ai_waitlist
  FOR SELECT
  USING (auth.uid() = user_id);

-- Service role gets full access (for admin queries / bulk notifications)
CREATE POLICY "Service role full access"
  ON public.business_ai_waitlist
  USING (true)
  WITH CHECK (true);
