-- Migration: Fix community_pricing_submissions RLS
-- Previously had overly-permissive policies allowing any authenticated user
-- to UPDATE or DELETE any other user's pricing submission.
-- Also enables RLS (was disabled).
--
-- Final policy set:
--   SELECT  — open to all authenticated users (community data, intentional)
--   INSERT  — only if auth.uid() = user_id
--   UPDATE  — only if auth.uid() = user_id
--   DELETE  — only if auth.uid() = user_id

ALTER TABLE public.community_pricing_submissions ENABLE ROW LEVEL SECURITY;

-- Drop old blanket-permissive policies
DROP POLICY IF EXISTS "Authenticated users can delete" ON public.community_pricing_submissions;
DROP POLICY IF EXISTS "Authenticated users can insert" ON public.community_pricing_submissions;
DROP POLICY IF EXISTS "Authenticated users can update" ON public.community_pricing_submissions;

-- Scoped write policies
CREATE POLICY IF NOT EXISTS "Users can insert their own submissions"
  ON public.community_pricing_submissions
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own submissions"
  ON public.community_pricing_submissions
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete their own submissions"
  ON public.community_pricing_submissions
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);
