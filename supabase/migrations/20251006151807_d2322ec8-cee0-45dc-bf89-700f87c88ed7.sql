-- Create reference data tables for On-Site Guide, GS 38, and installation knowledge

-- Table for On-Site Guide reference tables
CREATE TABLE IF NOT EXISTS public.onsite_guide_tables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_number text NOT NULL UNIQUE,
  table_title text NOT NULL,
  section text NOT NULL,
  json_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  applies_to text[] DEFAULT '{}',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table for GS 38 test equipment guidance
CREATE TABLE IF NOT EXISTS public.gs38_guidance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_number text NOT NULL,
  section_title text NOT NULL,
  content text NOT NULL,
  equipment_type text,
  safety_category text DEFAULT 'reference',
  applies_to text[] DEFAULT '{}',
  key_points text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table for installation methods reference
CREATE TABLE IF NOT EXISTS public.installation_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  method_reference text NOT NULL UNIQUE,
  description text NOT NULL,
  derating_factor numeric(3,2),
  suitable_for text[] DEFAULT '{}',
  restrictions text,
  onsite_guide_reference text,
  bs7671_reference text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table for testing limits and acceptable values
CREATE TABLE IF NOT EXISTS public.testing_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_type text NOT NULL,
  circuit_type text,
  voltage_level text,
  min_value numeric,
  max_value numeric,
  unit text NOT NULL,
  regulation_reference text,
  gs38_reference text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.onsite_guide_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gs38_guidance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.installation_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testing_limits ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (reference data)
CREATE POLICY "Public can view onsite guide tables"
  ON public.onsite_guide_tables
  FOR SELECT
  USING (true);

CREATE POLICY "Public can view GS 38 guidance"
  ON public.gs38_guidance
  FOR SELECT
  USING (true);

CREATE POLICY "Public can view installation methods"
  ON public.installation_methods
  FOR SELECT
  USING (true);

CREATE POLICY "Public can view testing limits"
  ON public.testing_limits
  FOR SELECT
  USING (true);

-- Service role can manage all reference data
CREATE POLICY "Service role can manage onsite guide tables"
  ON public.onsite_guide_tables
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage GS 38 guidance"
  ON public.gs38_guidance
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage installation methods"
  ON public.installation_methods
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage testing limits"
  ON public.testing_limits
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create indexes for better query performance
CREATE INDEX idx_onsite_guide_table_number ON public.onsite_guide_tables(table_number);
CREATE INDEX idx_onsite_guide_applies_to ON public.onsite_guide_tables USING GIN(applies_to);
CREATE INDEX idx_gs38_equipment_type ON public.gs38_guidance(equipment_type);
CREATE INDEX idx_gs38_safety_category ON public.gs38_guidance(safety_category);
CREATE INDEX idx_installation_methods_reference ON public.installation_methods(method_reference);
CREATE INDEX idx_testing_limits_test_type ON public.testing_limits(test_type);

-- Insert initial GS 38 core guidance extracted from the PDF
INSERT INTO public.gs38_guidance (section_number, section_title, content, equipment_type, safety_category, key_points) VALUES
('1', 'Introduction', 'This guidance is aimed at people who use electrical test equipment on low voltage electrical systems and equipment. These may include electricians, electrical contractors, test supervisors, technicians, managers or appliance repairers.', 'general', 'critical', ARRAY['Applies to circuits up to 1000V AC', 'For electricians and contractors', 'Covers test probes, leads, lamps, voltage detectors']),

('3', 'Legal Requirements', 'The Electricity at Work Regulations 1989 require those in control of part or all of an electrical system to ensure that it is safe to use and that it is maintained in a safe condition. Live working must only be carried out when it is unreasonable to work dead AND reasonable to work live AND suitable precautions are taken.', 'general', 'critical', ARRAY['Equipment must be properly constructed and maintained', 'Live working only when unavoidable', 'Adequate competence and supervision required']),

('9', 'Test Probes and Leads Standards', 'Test probes, clips and leads should conform to BS EN 61010-031 or BS EN 61243-3. They must be marked with rated installation category (CAT II, III, or IV) and manufacturer identification.', 'probes_leads', 'critical', ARRAY['Must conform to BS EN 61010-031 or BS EN 61243-3', 'Marked with CAT rating', 'Finger barriers required', 'Maximum 4mm exposed tip', 'Fused or current-limited']),

('9', 'Probe Safety Features', 'Probes should have finger barriers, shrouded connectors, minimum exposed metal (max 4mm tip), HBC fuses or current limitation, and robust flexible insulated leads.', 'probes', 'critical', ARRAY['Finger barriers prevent contact', 'Max 4mm exposed metal tip', 'Shrouded connectors', 'HBC fuses (typically 500mA)', 'Robust flexible insulation']),

('10', 'CAT Ratings', 'Measurement categories reflect overvoltage levels: CAT IV for supply source measurements, CAT III for building installations (distribution boards, sockets), CAT II for appliances and portable tools.', 'general', 'critical', ARRAY['CAT IV: Supply source/meters', 'CAT III: Distribution boards/sockets', 'CAT II: Appliances/portable tools', 'Must match installation being tested']),

('11', 'Test Leads Requirements', 'Leads must be adequately insulated, colour-coded for distinction, flexible, sheathed for mechanical protection, and appropriate length. No exposed conductors except probe tips.', 'leads', 'critical', ARRAY['Adequately insulated', 'Colour-coded', 'Sheathed for protection', 'No exposed conductors', 'Appropriate length']),

('13', 'Voltage Detectors', 'Two types: illuminated indicators (test lamps with HBC fuses) and 2-pole detectors with independent indicating systems. Test lamps require 500mA HBC fuse protection. 2-pole detectors have built-in current limiting.', 'voltage_detectors', 'critical', ARRAY['Test lamps need HBC fuse protection', '2-pole detectors have built-in protection', 'Must be proved before and after use', 'Mark with max voltage and CAT rating']),

('14', 'Single-Pole Detectors', 'Non-contact voltage sticks should ONLY be used for identifying live equipment, NOT for proving dead. Only contact-type devices should be used for proving dead.', 'voltage_sticks', 'critical', ARRAY['Only for identifying live equipment', 'NOT for proving dead', 'Contact devices required for proving dead']),

('20', 'Proving Test Equipment', 'Any device used to prove dead may fail. Must be proved before and after use on a proving unit or known live source of similar voltage.', 'general', 'critical', ARRAY['Prove before use', 'Prove after use', 'Use proving unit or known live source', 'Prevents false sense of safety']),

('21', 'Multimeter Safety', 'When using multimeters, ensure correct function setting, appropriate CAT rating, and proper lead connection. Setting to wrong function (eg current range when measuring voltage) causes most accidents.', 'multimeters', 'critical', ARRAY['Check correct function setting', 'Verify CAT rating matches installation', 'Secure lead connections', 'Wrong setting = major hazard']);

COMMENT ON TABLE public.onsite_guide_tables IS 'Reference tables from IET On-Site Guide for quick circuit design';
COMMENT ON TABLE public.gs38_guidance IS 'Safety guidance from HSE GS 38 for electrical test equipment';
COMMENT ON TABLE public.installation_methods IS 'Cable installation method descriptions and derating factors';
COMMENT ON TABLE public.testing_limits IS 'Acceptable test values and limits for electrical testing';