-- Enable RLS on pricing_intelligence table
ALTER TABLE pricing_intelligence ENABLE ROW LEVEL SECURITY;

-- Allow service role to manage pricing intelligence (for enrichment functions)
CREATE POLICY "Service role can manage pricing intelligence"
  ON pricing_intelligence
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to read pricing intelligence
CREATE POLICY "Authenticated users can read pricing intelligence"
  ON pricing_intelligence
  FOR SELECT
  TO authenticated
  USING (true);