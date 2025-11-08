-- Ensure a clean slate for our new tables
DROP MATERIALIZED VIEW IF EXISTS circuit_design_calculations CASCADE;
-- If an old table exists with a different shape, drop it (table drop will no-op if MV existed only)
DROP TABLE IF EXISTS circuit_design_calculations CASCADE;
DROP TABLE IF EXISTS circuit_template_cache CASCADE;
DROP TABLE IF EXISTS circuit_level_cache CASCADE;

-- Create Circuit Design Calculations table
CREATE TABLE IF NOT EXISTS circuit_design_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  circuit_type TEXT NOT NULL,
  calculation_name TEXT NOT NULL,
  formula TEXT NOT NULL,
  worked_example JSONB,
  table_data JSONB,
  regulation_reference TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_circuit_calculations_type ON circuit_design_calculations(circuit_type);
CREATE INDEX IF NOT EXISTS idx_circuit_calculations_name ON circuit_design_calculations(calculation_name);

-- Create Circuit Template Cache table
CREATE TABLE IF NOT EXISTS circuit_template_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_key TEXT UNIQUE NOT NULL,
  circuit_type TEXT NOT NULL,
  power_range_min INTEGER,
  power_range_max INTEGER,
  length_range_max INTEGER,
  template_design JSONB NOT NULL,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_template_circuit_type ON circuit_template_cache(circuit_type);
CREATE INDEX IF NOT EXISTS idx_template_usage ON circuit_template_cache(usage_count DESC);

-- Create Circuit Level Cache table
CREATE TABLE IF NOT EXISTS circuit_level_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  circuit_hash TEXT UNIQUE NOT NULL,
  circuit_type TEXT NOT NULL,
  load_power INTEGER NOT NULL,
  cable_length INTEGER NOT NULL,
  voltage INTEGER NOT NULL,
  design JSONB NOT NULL,
  hit_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_hit_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_circuit_hash ON circuit_level_cache(circuit_hash);
CREATE INDEX IF NOT EXISTS idx_circuit_type_cache ON circuit_level_cache(circuit_type);