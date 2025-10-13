-- Fix RLS policy for query_cache table
-- The table should only be accessible via edge functions (service role)
-- Drop the overly permissive policy and create proper ones

DROP POLICY IF EXISTS "Service role can manage query cache" ON query_cache;

-- Policy: Only service role (edge functions) can read cache
CREATE POLICY "Service role can read cache"
ON query_cache
FOR SELECT
USING (auth.role() = 'service_role');

-- Policy: Only service role can insert/update cache
CREATE POLICY "Service role can write cache"
ON query_cache
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

-- Policy: Only service role can update cache
CREATE POLICY "Service role can update cache"
ON query_cache
FOR UPDATE
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Policy: Only service role can delete old cache entries
CREATE POLICY "Service role can delete cache"
ON query_cache
FOR DELETE
USING (auth.role() = 'service_role');
