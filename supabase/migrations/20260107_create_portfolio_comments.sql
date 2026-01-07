-- Portfolio Comments Table
-- Enables tutor-apprentice communication on portfolio evidence

CREATE TABLE IF NOT EXISTS public.portfolio_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  context_type TEXT NOT NULL CHECK (context_type IN ('evidence', 'assessment', 'ilp', 'portfolio')),
  context_id UUID NOT NULL,
  parent_id UUID REFERENCES public.portfolio_comments(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL CHECK (author_role IN ('tutor', 'assessor', 'student', 'admin', 'support')),
  author_initials TEXT NOT NULL,
  content TEXT NOT NULL,
  mentions UUID[] DEFAULT '{}',
  requires_action BOOLEAN DEFAULT false,
  action_owner UUID REFERENCES auth.users(id),
  is_resolved BOOLEAN DEFAULT false,
  resolved_by UUID REFERENCES auth.users(id),
  resolved_by_name TEXT,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_portfolio_comments_context ON public.portfolio_comments(context_type, context_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_comments_author ON public.portfolio_comments(author_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_comments_action_owner ON public.portfolio_comments(action_owner) WHERE requires_action = true AND is_resolved = false;
CREATE INDEX IF NOT EXISTS idx_portfolio_comments_parent ON public.portfolio_comments(parent_id);

-- Enable RLS
ALTER TABLE public.portfolio_comments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running)
DROP POLICY IF EXISTS "Users can view relevant comments" ON public.portfolio_comments;
DROP POLICY IF EXISTS "Users can create comments" ON public.portfolio_comments;
DROP POLICY IF EXISTS "Users can update own comments" ON public.portfolio_comments;
DROP POLICY IF EXISTS "Users can delete own comments" ON public.portfolio_comments;

-- Policy: Users can view comments where they are:
-- 1. The author
-- 2. The action owner
-- 3. The portfolio owner (context_id matches their portfolio item)
CREATE POLICY "Users can view relevant comments"
  ON public.portfolio_comments
  FOR SELECT
  USING (
    author_id = auth.uid()
    OR action_owner = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.portfolio_items pi
      WHERE pi.id = portfolio_comments.context_id
      AND pi.user_id = auth.uid()
    )
  );

-- Policy: Users can insert comments
CREATE POLICY "Users can create comments"
  ON public.portfolio_comments
  FOR INSERT
  WITH CHECK (author_id = auth.uid());

-- Policy: Users can update their own comments or resolve comments they own
CREATE POLICY "Users can update own comments"
  ON public.portfolio_comments
  FOR UPDATE
  USING (
    author_id = auth.uid()
    OR action_owner = auth.uid()
  );

-- Policy: Users can delete their own comments
CREATE POLICY "Users can delete own comments"
  ON public.portfolio_comments
  FOR DELETE
  USING (author_id = auth.uid());

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_portfolio_comments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS portfolio_comments_updated_at ON public.portfolio_comments;
CREATE TRIGGER portfolio_comments_updated_at
  BEFORE UPDATE ON public.portfolio_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_portfolio_comments_updated_at();

-- Enable realtime for this table (ignore error if already added)
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.portfolio_comments;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
