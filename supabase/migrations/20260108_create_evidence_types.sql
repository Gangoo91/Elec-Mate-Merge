-- Evidence Types Table
-- Defines the types of evidence that can be uploaded for qualifications

CREATE TABLE IF NOT EXISTS public.evidence_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Unique code for reference
  code TEXT UNIQUE NOT NULL,

  -- Display information
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,

  -- File restrictions
  allowed_file_types TEXT[] DEFAULT ARRAY['image/jpeg', 'image/png', 'application/pdf'],
  max_file_size_mb INTEGER DEFAULT 10,

  -- Special requirements
  requires_witness BOOLEAN DEFAULT false,
  requires_date BOOLEAN DEFAULT false,

  -- Ordering
  sort_order INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Evidence Requirements Table
-- Maps assessment criteria to required evidence types per qualification category

CREATE TABLE IF NOT EXISTS public.unit_evidence_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Link to qualification category (unit)
  category_id UUID REFERENCES public.qualification_categories(id) ON DELETE CASCADE,

  -- Assessment criterion reference (e.g., "1.1", "2.3")
  assessment_criterion TEXT NOT NULL,
  assessment_criterion_text TEXT,

  -- Required evidence types (codes from evidence_types)
  evidence_type_codes TEXT[] NOT NULL,

  -- Quantity requirements
  quantity_required INTEGER DEFAULT 1,
  min_quantity INTEGER DEFAULT 1,

  -- Guidance for the apprentice
  guidance TEXT,
  example_description TEXT,

  -- Requirements
  is_mandatory BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_evidence_req_category ON public.unit_evidence_requirements(category_id);
CREATE INDEX IF NOT EXISTS idx_evidence_req_criterion ON public.unit_evidence_requirements(assessment_criterion);

-- RLS Policies
ALTER TABLE public.evidence_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unit_evidence_requirements ENABLE ROW LEVEL SECURITY;

-- Everyone can read evidence types (reference data)
DROP POLICY IF EXISTS "Evidence types are viewable by everyone" ON public.evidence_types;
CREATE POLICY "Evidence types are viewable by everyone"
  ON public.evidence_types
  FOR SELECT
  USING (true);

-- Everyone can read evidence requirements (reference data)
DROP POLICY IF EXISTS "Evidence requirements are viewable by everyone" ON public.unit_evidence_requirements;
CREATE POLICY "Evidence requirements are viewable by everyone"
  ON public.unit_evidence_requirements
  FOR SELECT
  USING (true);

-- =====================
-- SEED EVIDENCE TYPES
-- =====================

INSERT INTO public.evidence_types (code, name, description, icon, color, allowed_file_types, max_file_size_mb, requires_witness, requires_date, sort_order)
VALUES
-- Photo evidence
('photo', 'Photograph',
 'Photo evidence of completed work, installations, or processes. Should clearly show the work undertaken.',
 'Camera', '#3b82f6',
 ARRAY['image/jpeg', 'image/png', 'image/webp'],
 10, false, true, 1),

-- Document evidence
('document', 'Document',
 'Written documents such as risk assessments, method statements, job sheets, or technical reports.',
 'FileText', '#6366f1',
 ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
 10, false, true, 2),

-- Certificate evidence
('certificate', 'Certificate',
 'Official certificates including EIC, EICR, Minor Works, training certificates, or qualifications.',
 'Award', '#eab308',
 ARRAY['application/pdf', 'image/jpeg', 'image/png'],
 10, false, true, 3),

-- Test result evidence
('test_result', 'Test Results',
 'Instrument readings and test results such as insulation resistance, earth fault loop impedance, RCD tests.',
 'ClipboardList', '#10b981',
 ARRAY['application/pdf', 'image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
 10, false, true, 4),

-- Witness statement
('witness', 'Witness Statement',
 'Third-party verification from supervisor, assessor, or qualified person confirming competence.',
 'Users', '#8b5cf6',
 ARRAY['application/pdf', 'image/jpeg', 'image/png'],
 10, true, true, 5),

-- Reflective account
('reflection', 'Reflective Account',
 'Written reflection on work undertaken, challenges faced, lessons learned, and professional development.',
 'BookOpen', '#f59e0b',
 ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
 5, false, true, 6),

-- Work log
('work_log', 'Work Log',
 'Daily or weekly log of activities, tasks completed, and time spent on different work activities.',
 'Calendar', '#0ea5e9',
 ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
 5, false, true, 7),

-- Video evidence
('video', 'Video',
 'Video recording demonstrating a process, technique, or completed work. Keep videos concise and focused.',
 'Video', '#ef4444',
 ARRAY['video/mp4', 'video/webm', 'video/quicktime'],
 50, false, true, 8),

-- Technical drawing
('drawing', 'Technical Drawing',
 'Circuit diagrams, wiring layouts, as-built drawings, or design sketches.',
 'PenTool', '#14b8a6',
 ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/svg+xml'],
 10, false, true, 9),

-- Calculation
('calculation', 'Calculation',
 'Mathematical calculations such as cable sizing, voltage drop, fault current, or power factor.',
 'Calculator', '#ec4899',
 ARRAY['application/pdf', 'image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
 5, false, true, 10)

ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  allowed_file_types = EXCLUDED.allowed_file_types,
  max_file_size_mb = EXCLUDED.max_file_size_mb,
  requires_witness = EXCLUDED.requires_witness,
  requires_date = EXCLUDED.requires_date,
  sort_order = EXCLUDED.sort_order;
