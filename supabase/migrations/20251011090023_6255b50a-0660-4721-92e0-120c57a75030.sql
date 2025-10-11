-- Phase 1 & 3: Create Semantic Regulation Index & Design Patterns Tables

-- Regulation Index: Maps natural language to specific regulations
CREATE TABLE IF NOT EXISTS public.regulation_index (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  regulation_number TEXT NOT NULL,
  semantic_tags TEXT[] NOT NULL DEFAULT '{}',
  natural_language_terms TEXT[] NOT NULL DEFAULT '{}',
  circuit_types TEXT[] NOT NULL DEFAULT '{}',
  power_range_min INTEGER,
  power_range_max INTEGER,
  category TEXT NOT NULL,
  bs7671_section TEXT,
  priority_score INTEGER DEFAULT 50,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_regulation_semantic_tags ON public.regulation_index USING GIN(semantic_tags);
CREATE INDEX idx_regulation_circuit_types ON public.regulation_index USING GIN(circuit_types);
CREATE INDEX idx_regulation_number ON public.regulation_index(regulation_number);
CREATE INDEX idx_regulation_category ON public.regulation_index(category);

-- Design Patterns: Learning loop for successful designs
CREATE TABLE IF NOT EXISTS public.design_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pattern_hash TEXT NOT NULL UNIQUE,
  circuit_type TEXT NOT NULL,
  power_rating INTEGER NOT NULL,
  voltage INTEGER NOT NULL,
  cable_length INTEGER,
  success_count INTEGER DEFAULT 1,
  last_used TIMESTAMPTZ NOT NULL DEFAULT now(),
  design_solution JSONB NOT NULL,
  regulations_cited TEXT[] NOT NULL DEFAULT '{}',
  avg_response_time INTEGER,
  confidence_score NUMERIC DEFAULT 0.8,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_pattern_hash ON public.design_patterns(pattern_hash);
CREATE INDEX idx_pattern_circuit_type ON public.design_patterns(circuit_type);
CREATE INDEX idx_pattern_power ON public.design_patterns(power_rating);
CREATE INDEX idx_pattern_success ON public.design_patterns(success_count DESC);

-- RLS Policies
ALTER TABLE public.regulation_index ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_patterns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for regulation index"
ON public.regulation_index FOR SELECT
TO PUBLIC USING (true);

CREATE POLICY "Service can manage regulation index"
ON public.regulation_index FOR ALL
TO SERVICE_ROLE USING (true);

CREATE POLICY "Public read access for design patterns"
ON public.design_patterns FOR SELECT
TO PUBLIC USING (true);

CREATE POLICY "Service can manage design patterns"
ON public.design_patterns FOR ALL
TO SERVICE_ROLE USING (true);

-- Seed regulation index with common mappings
INSERT INTO public.regulation_index (regulation_number, semantic_tags, natural_language_terms, circuit_types, power_range_min, power_range_max, category, bs7671_section, priority_score) VALUES
  ('433.1', '{overload,protection,cable,sizing}', '{overload protection,cable capacity,current carrying}', '{shower,cooker,ev-charging,socket,lighting,general}', 0, 100000, 'protection', 'Chapter 43', 100),
  ('433.2.2', '{discrimination,selectivity,coordination}', '{circuit protection,mcb selection,rcbo sizing}', '{shower,cooker,ev-charging,socket}', 0, 100000, 'protection', 'Chapter 43', 90),
  ('411.3.3', '{fault,protection,disconnection}', '{earth fault,automatic disconnection,shock protection}', '{shower,cooker,socket,lighting,general}', 0, 100000, 'protection', 'Chapter 41', 95),
  ('701.512.3', '{bathroom,zones,ip,rating}', '{bathroom zones,ip rating,wet locations,moisture protection}', '{shower,bathroom}', 0, 15000, 'special-locations', 'Section 701', 100),
  ('415.1.1', '{voltage,drop,limits}', '{voltage drop,volt drop,cable length,distance}', '{shower,cooker,socket,lighting,general}', 0, 100000, 'design', 'Chapter 41', 85),
  ('722.531.2', '{ev,charging,dedicated,circuit}', '{ev charger,electric vehicle,charging point}', '{ev-charging}', 3000, 22000, 'special-installations', 'Section 722', 100),
  ('722.411.4.1', '{ev,earthing,pme,protection}', '{ev earthing,pme,protective conductor}', '{ev-charging}', 3000, 22000, 'special-installations', 'Section 722', 95),
  ('432.1', '{short,circuit,protection}', '{short circuit,fault current,breaking capacity}', '{shower,cooker,ev-charging,socket,lighting,general}', 0, 100000, 'protection', 'Chapter 43', 80),
  ('433.3.3', '{diversity,demand,assessment}', '{diversity factor,maximum demand,load assessment}', '{cooker,socket,general}', 0, 100000, 'design', 'Chapter 43', 75),
  ('531.2.4', '{isolation,switching,access}', '{isolator,switch,emergency stop}', '{shower,cooker,ev-charging,socket,general}', 0, 100000, 'control', 'Chapter 53', 70);

-- Function to search regulation index
CREATE OR REPLACE FUNCTION public.search_regulation_index(
  search_circuit_type TEXT DEFAULT NULL,
  search_power INTEGER DEFAULT NULL,
  search_terms TEXT[] DEFAULT NULL
)
RETURNS TABLE (
  regulation_number TEXT,
  bs7671_section TEXT,
  category TEXT,
  priority_score INTEGER,
  match_score INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ri.regulation_number,
    ri.bs7671_section,
    ri.category,
    ri.priority_score,
    (
      CASE WHEN search_circuit_type = ANY(ri.circuit_types) THEN 50 ELSE 0 END +
      CASE WHEN search_power BETWEEN ri.power_range_min AND ri.power_range_max THEN 30 ELSE 0 END +
      CASE WHEN search_terms && ri.semantic_tags THEN 20 ELSE 0 END
    ) AS match_score
  FROM public.regulation_index ri
  WHERE 
    (search_circuit_type IS NULL OR search_circuit_type = ANY(ri.circuit_types))
    AND (search_power IS NULL OR (search_power BETWEEN ri.power_range_min AND ri.power_range_max))
    AND (search_terms IS NULL OR search_terms && (ri.semantic_tags || ri.natural_language_terms))
  ORDER BY match_score DESC, ri.priority_score DESC
  LIMIT 10;
END;
$$;

-- Function to store/update design patterns
CREATE OR REPLACE FUNCTION public.upsert_design_pattern(
  p_pattern_hash TEXT,
  p_circuit_type TEXT,
  p_power_rating INTEGER,
  p_voltage INTEGER,
  p_cable_length INTEGER,
  p_design_solution JSONB,
  p_regulations_cited TEXT[],
  p_response_time INTEGER
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  v_id UUID;
BEGIN
  INSERT INTO public.design_patterns (
    pattern_hash,
    circuit_type,
    power_rating,
    voltage,
    cable_length,
    design_solution,
    regulations_cited,
    avg_response_time,
    success_count,
    last_used
  ) VALUES (
    p_pattern_hash,
    p_circuit_type,
    p_power_rating,
    p_voltage,
    p_cable_length,
    p_design_solution,
    p_regulations_cited,
    p_response_time,
    1,
    now()
  )
  ON CONFLICT (pattern_hash) DO UPDATE SET
    success_count = design_patterns.success_count + 1,
    last_used = now(),
    avg_response_time = ROUND((design_patterns.avg_response_time * design_patterns.success_count + p_response_time) / (design_patterns.success_count + 1)),
    confidence_score = LEAST(1.0, design_patterns.confidence_score + 0.05)
  RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$;