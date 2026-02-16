-- KSB ↔ Unit Mapping Table
-- Makes the implicit college mapping between ST0152 KSBs and 5357-23 qualification units explicit.
-- When an apprentice submits evidence against unit ACs, it automatically counts toward the parent KSB.

CREATE TABLE IF NOT EXISTS public.ksb_unit_mapping (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ksb_id UUID NOT NULL REFERENCES public.apprenticeship_ksbs(id) ON DELETE CASCADE,
  unit_code TEXT NOT NULL,           -- e.g. '107', '118', '312'
  unit_title TEXT NOT NULL,          -- e.g. 'Understand Terminations and Connections of Conductors'
  qualification_code TEXT NOT NULL,  -- e.g. '5357-23'
  mapping_type TEXT NOT NULL CHECK (mapping_type IN ('primary', 'supporting')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(ksb_id, unit_code, qualification_code)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ksb_unit_mapping_ksb ON public.ksb_unit_mapping(ksb_id);
CREATE INDEX IF NOT EXISTS idx_ksb_unit_mapping_unit ON public.ksb_unit_mapping(unit_code);
CREATE INDEX IF NOT EXISTS idx_ksb_unit_mapping_qual ON public.ksb_unit_mapping(qualification_code);

-- RLS
ALTER TABLE public.ksb_unit_mapping ENABLE ROW LEVEL SECURITY;

-- Everyone can read mappings (reference data)
CREATE POLICY "KSB unit mappings are viewable by everyone"
  ON public.ksb_unit_mapping
  FOR SELECT
  USING (true);

-- ====================================
-- SEED: KSB → 5357-23 Unit Mappings
-- ====================================

-- We reference KSBs by code within the ST0152 qualification.
-- Using a DO block to look up KSB IDs dynamically.

DO $$
DECLARE
  v_k1 UUID; v_k2 UUID; v_k3 UUID; v_k4 UUID;
  v_k5 UUID; v_k6 UUID; v_k7 UUID; v_k8 UUID;
  v_b1 UUID; v_b2 UUID; v_b3 UUID; v_b4 UUID;
  v_b5 UUID; v_b6 UUID; v_b7 UUID; v_b8 UUID;
BEGIN
  -- Look up KSB IDs
  SELECT id INTO v_k1 FROM apprenticeship_ksbs WHERE qualification_id = 'st0152-apprenticeship-00000001' AND code = 'K1';
  SELECT id INTO v_k2 FROM apprenticeship_ksbs WHERE qualification_id = 'st0152-apprenticeship-00000001' AND code = 'K2';
  SELECT id INTO v_k3 FROM apprenticeship_ksbs WHERE qualification_id = 'st0152-apprenticeship-00000001' AND code = 'K3';
  SELECT id INTO v_k4 FROM apprenticeship_ksbs WHERE qualification_id = 'st0152-apprenticeship-00000001' AND code = 'K4';
  SELECT id INTO v_k5 FROM apprenticeship_ksbs WHERE qualification_id = 'st0152-apprenticeship-00000001' AND code = 'K5';
  SELECT id INTO v_k6 FROM apprenticeship_ksbs WHERE qualification_id = 'st0152-apprenticeship-00000001' AND code = 'K6';
  SELECT id INTO v_k7 FROM apprenticeship_ksbs WHERE qualification_id = 'st0152-apprenticeship-00000001' AND code = 'K7';
  SELECT id INTO v_k8 FROM apprenticeship_ksbs WHERE qualification_id = 'st0152-apprenticeship-00000001' AND code = 'K8';
  SELECT id INTO v_b1 FROM apprenticeship_ksbs WHERE qualification_id = 'st0152-apprenticeship-00000001' AND code = 'B1';
  SELECT id INTO v_b2 FROM apprenticeship_ksbs WHERE qualification_id = 'st0152-apprenticeship-00000001' AND code = 'B2';
  SELECT id INTO v_b3 FROM apprenticeship_ksbs WHERE qualification_id = 'st0152-apprenticeship-00000001' AND code = 'B3';
  SELECT id INTO v_b4 FROM apprenticeship_ksbs WHERE qualification_id = 'st0152-apprenticeship-00000001' AND code = 'B4';
  SELECT id INTO v_b5 FROM apprenticeship_ksbs WHERE qualification_id = 'st0152-apprenticeship-00000001' AND code = 'B5';
  SELECT id INTO v_b6 FROM apprenticeship_ksbs WHERE qualification_id = 'st0152-apprenticeship-00000001' AND code = 'B6';
  SELECT id INTO v_b7 FROM apprenticeship_ksbs WHERE qualification_id = 'st0152-apprenticeship-00000001' AND code = 'B7';
  SELECT id INTO v_b8 FROM apprenticeship_ksbs WHERE qualification_id = 'st0152-apprenticeship-00000001' AND code = 'B8';

  -- ===================
  -- K1: Termination and connection of conductors, cables and cords
  -- ===================
  INSERT INTO ksb_unit_mapping (ksb_id, unit_code, unit_title, qualification_code, mapping_type) VALUES
    (v_k1, '107', 'Understand Terminations and Connections of Conductors', '5357-23', 'primary'),
    (v_k1, '118', 'Termination and Connection of Conductors', '5357-23', 'primary')
  ON CONFLICT DO NOTHING;

  -- ===================
  -- K2: Preparation and installation of wiring systems and equipment
  -- ===================
  INSERT INTO ksb_unit_mapping (ksb_id, unit_code, unit_title, qualification_code, mapping_type) VALUES
    (v_k2, '104', 'Understand the Installation of Wiring Systems and Associated Equipment', '5357-23', 'primary'),
    (v_k2, '109', 'Install Wiring Systems and Associated Equipment', '5357-23', 'primary')
  ON CONFLICT DO NOTHING;

  -- ===================
  -- K3: Inspection, testing, commissioning and certification
  -- ===================
  INSERT INTO ksb_unit_mapping (ksb_id, unit_code, unit_title, qualification_code, mapping_type) VALUES
    (v_k3, '312', 'Understand the Principles of Inspection, Testing and Commissioning', '5357-23', 'primary'),
    (v_k3, '113', 'Inspect, Test and Commission Electrical Systems', '5357-23', 'primary')
  ON CONFLICT DO NOTHING;

  -- ===================
  -- K4: Diagnosing and correcting electrical faults
  -- ===================
  INSERT INTO ksb_unit_mapping (ksb_id, unit_code, unit_title, qualification_code, mapping_type) VALUES
    (v_k4, '114', 'Understand How to Diagnose and Correct Electrical Faults', '5357-23', 'primary'),
    (v_k4, '115', 'Diagnose and Correct Electrical Faults', '5357-23', 'primary')
  ON CONFLICT DO NOTHING;

  -- ===================
  -- K5: Electrical principles for design, building, installation and maintenance
  -- ===================
  INSERT INTO ksb_unit_mapping (ksb_id, unit_code, unit_title, qualification_code, mapping_type) VALUES
    (v_k5, '103', 'Electrical Principles', '5357-23', 'primary')
  ON CONFLICT DO NOTHING;

  -- ===================
  -- K6: Oversee and organise the work environment
  -- ===================
  INSERT INTO ksb_unit_mapping (ksb_id, unit_code, unit_title, qualification_code, mapping_type) VALUES
    (v_k6, '105', 'Understand How to Oversee and Organise the Work Environment', '5357-23', 'primary'),
    (v_k6, '106', 'Oversee and Organise the Work Environment', '5357-23', 'primary')
  ON CONFLICT DO NOTHING;

  -- ===================
  -- K7: Planning and selection for installation (installation route)
  -- ===================
  INSERT INTO ksb_unit_mapping (ksb_id, unit_code, unit_title, qualification_code, mapping_type) VALUES
    (v_k7, '105', 'Understand How to Oversee and Organise the Work Environment', '5357-23', 'supporting'),
    (v_k7, '109', 'Install Wiring Systems and Associated Equipment', '5357-23', 'primary')
  ON CONFLICT DO NOTHING;

  -- ===================
  -- K8: Planning and preparing to maintain systems (maintenance route)
  -- ===================
  INSERT INTO ksb_unit_mapping (ksb_id, unit_code, unit_title, qualification_code, mapping_type) VALUES
    (v_k8, '110', 'Maintain Electrical Systems and Equipment', '5357-23', 'primary')
  ON CONFLICT DO NOTHING;

  -- ===================
  -- Cross-cutting units (H&S + BS 7671) — supporting mappings
  -- These underpin multiple KSBs rather than mapping 1:1
  -- ===================

  -- Unit 101/001: Understand Health, Safety and Environmental Considerations
  INSERT INTO ksb_unit_mapping (ksb_id, unit_code, unit_title, qualification_code, mapping_type) VALUES
    (v_k1, '101', 'Understand Health, Safety and Environmental Considerations', '5357-23', 'supporting'),
    (v_k2, '101', 'Understand Health, Safety and Environmental Considerations', '5357-23', 'supporting'),
    (v_k3, '101', 'Understand Health, Safety and Environmental Considerations', '5357-23', 'supporting'),
    (v_k4, '101', 'Understand Health, Safety and Environmental Considerations', '5357-23', 'supporting'),
    (v_k5, '101', 'Understand Health, Safety and Environmental Considerations', '5357-23', 'supporting'),
    (v_k6, '101', 'Understand Health, Safety and Environmental Considerations', '5357-23', 'supporting'),
    (v_b1, '101', 'Understand Health, Safety and Environmental Considerations', '5357-23', 'supporting'),
    (v_b6, '101', 'Understand Health, Safety and Environmental Considerations', '5357-23', 'supporting')
  ON CONFLICT DO NOTHING;

  -- Unit 102: Apply Health, Safety and Environmental Considerations
  INSERT INTO ksb_unit_mapping (ksb_id, unit_code, unit_title, qualification_code, mapping_type) VALUES
    (v_k1, '102', 'Apply Health, Safety and Environmental Considerations', '5357-23', 'supporting'),
    (v_k2, '102', 'Apply Health, Safety and Environmental Considerations', '5357-23', 'supporting'),
    (v_k3, '102', 'Apply Health, Safety and Environmental Considerations', '5357-23', 'supporting'),
    (v_k4, '102', 'Apply Health, Safety and Environmental Considerations', '5357-23', 'supporting'),
    (v_k5, '102', 'Apply Health, Safety and Environmental Considerations', '5357-23', 'supporting'),
    (v_k6, '102', 'Apply Health, Safety and Environmental Considerations', '5357-23', 'supporting'),
    (v_b1, '102', 'Apply Health, Safety and Environmental Considerations', '5357-23', 'supporting'),
    (v_b6, '102', 'Apply Health, Safety and Environmental Considerations', '5357-23', 'supporting')
  ON CONFLICT DO NOTHING;

  -- Unit 022: Understand the Requirements of BS 7671:2018 (2022)
  INSERT INTO ksb_unit_mapping (ksb_id, unit_code, unit_title, qualification_code, mapping_type) VALUES
    (v_k1, '022', 'Understand the Requirements of BS 7671:2018 (2022)', '5357-23', 'supporting'),
    (v_k2, '022', 'Understand the Requirements of BS 7671:2018 (2022)', '5357-23', 'supporting'),
    (v_k3, '022', 'Understand the Requirements of BS 7671:2018 (2022)', '5357-23', 'supporting'),
    (v_k4, '022', 'Understand the Requirements of BS 7671:2018 (2022)', '5357-23', 'supporting'),
    (v_k5, '022', 'Understand the Requirements of BS 7671:2018 (2022)', '5357-23', 'supporting')
  ON CONFLICT DO NOTHING;

END $$;
