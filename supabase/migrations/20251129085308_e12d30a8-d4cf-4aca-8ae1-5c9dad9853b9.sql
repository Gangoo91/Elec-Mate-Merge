-- Enable RLS on installation_method_cache table
ALTER TABLE installation_method_cache ENABLE ROW LEVEL SECURITY;

-- Allow service role to manage cache (edge functions use service role)
CREATE POLICY "Service role can manage installation cache"
ON installation_method_cache
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Anyone can read from cache (for performance monitoring)
CREATE POLICY "Anyone can read installation cache"
ON installation_method_cache
FOR SELECT
USING (true);