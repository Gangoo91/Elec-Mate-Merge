-- Enable Row Level Security on new circuit tables
ALTER TABLE circuit_design_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE circuit_template_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE circuit_level_cache ENABLE ROW LEVEL SECURITY;

-- Public read access for calculation formulas (everyone needs these)
CREATE POLICY "Anyone can read circuit calculations" 
  ON circuit_design_calculations 
  FOR SELECT 
  USING (true);

-- Service role can manage calculations (for seeding/updating)
CREATE POLICY "Service role can manage calculations" 
  ON circuit_design_calculations 
  FOR ALL 
  USING (auth.role() = 'service_role');

-- Public read access for template cache
CREATE POLICY "Anyone can read circuit templates" 
  ON circuit_template_cache 
  FOR SELECT 
  USING (true);

-- Service role can manage templates
CREATE POLICY "Service role can manage templates" 
  ON circuit_template_cache 
  FOR ALL 
  USING (auth.role() = 'service_role');

-- Public read access for circuit level cache
CREATE POLICY "Anyone can read circuit cache" 
  ON circuit_level_cache 
  FOR SELECT 
  USING (true);

-- Authenticated users can manage circuit cache
CREATE POLICY "Authenticated users can manage circuit cache" 
  ON circuit_level_cache 
  FOR ALL 
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');