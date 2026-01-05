-- Fix the UPDATE RLS policy to allow updates regardless of deleted_at status
DROP POLICY IF EXISTS "Users can update own reports" ON public.reports;

-- Create new UPDATE policy without deleted_at restriction
CREATE POLICY "Users can update own reports"
ON public.reports
FOR UPDATE
TO public
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);