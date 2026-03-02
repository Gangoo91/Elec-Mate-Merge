-- Add user_id column to employer_jobs so jobs are owned by a user
-- This fixes the MCP create_job tool which inserts user_id but column didn't exist

-- 1. Add the column (nullable first so existing rows don't break)
ALTER TABLE public.employer_jobs
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. Backfill existing rows to Andrew Moore's real account
UPDATE public.employer_jobs
  SET user_id = 'b0113c59-8611-4c5e-8503-1797a75bb64f'
  WHERE user_id IS NULL;

-- 3. Now make it NOT NULL (all rows have been backfilled)
ALTER TABLE public.employer_jobs
  ALTER COLUMN user_id SET NOT NULL;

-- 4. Index for RLS policy performance
CREATE INDEX IF NOT EXISTS idx_employer_jobs_user_id
  ON public.employer_jobs(user_id);

-- 5. Enable RLS if not already enabled
ALTER TABLE public.employer_jobs ENABLE ROW LEVEL SECURITY;

-- 6. RLS policies — users can only see/modify their own jobs
DO $$ BEGIN
  -- Drop existing policies if any (clean slate)
  DROP POLICY IF EXISTS "Users can view own jobs" ON public.employer_jobs;
  DROP POLICY IF EXISTS "Users can insert own jobs" ON public.employer_jobs;
  DROP POLICY IF EXISTS "Users can update own jobs" ON public.employer_jobs;
  DROP POLICY IF EXISTS "Users can delete own jobs" ON public.employer_jobs;
END $$;

CREATE POLICY "Users can view own jobs"
  ON public.employer_jobs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own jobs"
  ON public.employer_jobs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own jobs"
  ON public.employer_jobs FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own jobs"
  ON public.employer_jobs FOR DELETE
  USING (auth.uid() = user_id);
