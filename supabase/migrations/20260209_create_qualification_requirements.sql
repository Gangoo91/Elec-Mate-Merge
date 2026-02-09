-- Qualification Requirements Table
-- Stores extracted C&G and EAL qualification PDF content for RAG search.
-- Each row = one learning outcome with its assessment criteria.

CREATE TABLE IF NOT EXISTS public.qualification_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Qualification identification
  qualification_code TEXT NOT NULL,       -- '2365-02', '2365-03', '2366-03', '603/3929/9', 'EAL-600/4341/5'
  qualification_name TEXT NOT NULL,       -- 'C&G 2365-02 Level 2 Diploma in Electrical Installations'

  -- Unit and learning outcome
  unit_code TEXT NOT NULL,                -- '201', '301', 'NETP3-01'
  unit_title TEXT NOT NULL,
  learning_outcome_number TEXT,           -- '1', '2', '3.1'
  learning_outcome TEXT NOT NULL,
  assessment_criteria TEXT[],             -- AC texts under this LO

  -- Classification
  topic_area TEXT,                        -- 'Health & Safety', 'Wiring', etc.
  keywords TEXT[] NOT NULL DEFAULT '{}',  -- GIN-indexed for fast search
  content_text TEXT NOT NULL,             -- full searchable text blob (LO + all ACs concatenated)
  level INTEGER,                          -- 2 or 3

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now()
);

-- GIN index on keywords for fast && overlap search
CREATE INDEX IF NOT EXISTS idx_qual_req_keywords
  ON public.qualification_requirements USING GIN (keywords);

-- B-tree indexes for filtered lookups
CREATE INDEX IF NOT EXISTS idx_qual_req_qual_code
  ON public.qualification_requirements (qualification_code);

CREATE INDEX IF NOT EXISTS idx_qual_req_unit_code
  ON public.qualification_requirements (unit_code);

-- Fast keyword search function (same && overlap pattern as search_practical_work_fast)
CREATE OR REPLACE FUNCTION search_qualification_requirements(
  p_keywords TEXT[],
  p_qualification_code TEXT DEFAULT NULL,
  p_unit_code TEXT DEFAULT NULL,
  p_limit INTEGER DEFAULT 20
) RETURNS SETOF public.qualification_requirements AS $$
  SELECT * FROM public.qualification_requirements
  WHERE keywords && p_keywords
    AND (p_qualification_code IS NULL OR qualification_code = p_qualification_code)
    AND (p_unit_code IS NULL OR unit_code = p_unit_code)
  ORDER BY array_length(
    ARRAY(SELECT unnest(keywords) INTERSECT SELECT unnest(p_keywords)), 1
  ) DESC NULLS LAST
  LIMIT p_limit;
$$ LANGUAGE sql STABLE;

-- RLS
ALTER TABLE public.qualification_requirements ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read all requirements (reference data)
DROP POLICY IF EXISTS "Qualification requirements are viewable by authenticated users"
  ON public.qualification_requirements;
CREATE POLICY "Qualification requirements are viewable by authenticated users"
  ON public.qualification_requirements
  FOR SELECT
  TO authenticated
  USING (true);
