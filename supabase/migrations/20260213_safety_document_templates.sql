-- Safety Document Templates System
-- System-provided templates (seeded with UK electrical safety docs)
CREATE TABLE IF NOT EXISTS safety_document_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  content TEXT NOT NULL DEFAULT '',
  placeholders TEXT[] DEFAULT '{}',
  summary TEXT,
  version INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  regulatory_references TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User-adopted/customised documents
CREATE TABLE IF NOT EXISTS user_safety_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  template_id UUID REFERENCES safety_document_templates(id),
  name TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft', 'Active', 'Review Due', 'Archived')),
  company_name TEXT,
  site_address TEXT,
  adopted_at TIMESTAMPTZ DEFAULT now(),
  review_date DATE,
  approved_by TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Safety Achievements (gamification)
CREATE TABLE IF NOT EXISTS safety_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  achievement_key TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, achievement_key)
);

-- Safe Isolation Records (GS38)
CREATE TABLE IF NOT EXISTS safe_isolation_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  rams_id UUID,
  permit_id UUID,
  site_address TEXT NOT NULL,
  circuit_description TEXT NOT NULL,
  distribution_board TEXT,
  isolation_device TEXT,
  lock_off_number TEXT,
  voltage_detector_serial TEXT,
  voltage_detector_calibration_date DATE,
  proving_unit_used BOOLEAN DEFAULT false,
  steps JSONB DEFAULT '[]',
  isolation_completed_at TIMESTAMPTZ,
  isolator_name TEXT,
  isolator_signature TEXT,
  verifier_name TEXT,
  verifier_signature TEXT,
  re_energisation_at TIMESTAMPTZ,
  re_energisation_by TEXT,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'isolated', 're_energised', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Pre-Use Equipment Checks (PUWER 1998)
CREATE TABLE IF NOT EXISTS pre_use_checks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  equipment_id UUID,
  equipment_type TEXT NOT NULL,
  equipment_description TEXT,
  check_date DATE DEFAULT CURRENT_DATE,
  site_address TEXT,
  items JSONB DEFAULT '[]',
  overall_result TEXT DEFAULT 'pass' CHECK (overall_result IN ('pass', 'fail', 'na')),
  checked_by TEXT,
  signature TEXT,
  actions_required TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Safety Observations
CREATE TABLE IF NOT EXISTS safety_observations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  observation_type TEXT DEFAULT 'positive' CHECK (observation_type IN ('positive', 'improvement_needed')),
  person_observed TEXT,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Electrician Site Diary
CREATE TABLE IF NOT EXISTS electrician_site_diary (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  entry_date DATE DEFAULT CURRENT_DATE,
  site_name TEXT NOT NULL,
  site_address TEXT,
  weather TEXT,
  start_time TIME,
  end_time TIME,
  personnel_count INTEGER,
  work_completed TEXT,
  issues TEXT,
  delays TEXT,
  materials_used TEXT,
  photos TEXT[] DEFAULT '{}',
  rams_ids UUID[] DEFAULT '{}',
  permit_ids UUID[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, entry_date, site_name)
);

-- Fire Watch Records
CREATE TABLE IF NOT EXISTS fire_watch_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  permit_id UUID,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  start_time TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_time TIMESTAMPTZ,
  duration_minutes INTEGER DEFAULT 60,
  checklist JSONB DEFAULT '[]',
  completed_by TEXT,
  completed_signature TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'extended')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE user_safety_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE safe_isolation_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE pre_use_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE electrician_site_diary ENABLE ROW LEVEL SECURITY;
ALTER TABLE fire_watch_records ENABLE ROW LEVEL SECURITY;

-- User documents: users see only their own
CREATE POLICY "Users can view own safety documents" ON user_safety_documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own safety documents" ON user_safety_documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own safety documents" ON user_safety_documents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own safety documents" ON user_safety_documents FOR DELETE USING (auth.uid() = user_id);

-- Templates: public read
CREATE POLICY "Anyone can read templates" ON safety_document_templates FOR SELECT USING (true);

-- Achievements
CREATE POLICY "Users can view own achievements" ON safety_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON safety_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Safe isolation records
CREATE POLICY "Users can view own isolation records" ON safe_isolation_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own isolation records" ON safe_isolation_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own isolation records" ON safe_isolation_records FOR UPDATE USING (auth.uid() = user_id);

-- Pre-use checks
CREATE POLICY "Users can view own pre-use checks" ON pre_use_checks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own pre-use checks" ON pre_use_checks FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Safety observations
CREATE POLICY "Users can view own observations" ON safety_observations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own observations" ON safety_observations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Site diary
CREATE POLICY "Users can view own diary entries" ON electrician_site_diary FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own diary entries" ON electrician_site_diary FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own diary entries" ON electrician_site_diary FOR UPDATE USING (auth.uid() = user_id);

-- Fire watch
CREATE POLICY "Users can view own fire watch records" ON fire_watch_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own fire watch records" ON fire_watch_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own fire watch records" ON fire_watch_records FOR UPDATE USING (auth.uid() = user_id);

-- Seed safety document templates
INSERT INTO safety_document_templates (name, category, subcategory, sort_order, summary, regulatory_references, content) VALUES
-- Risk Assessments
('Consumer Unit Replacement', 'Risk Assessment', 'Electrical', 1, 'Risk assessment for consumer unit/DB replacement work', ARRAY['BS 7671', 'GS38', 'Electricity at Work Regulations 1989'], '<h1>Risk Assessment: Consumer Unit Replacement</h1><h2>Company: {{company_name}}</h2><h2>Site: {{site_address}}</h2><h2>Date: {{date}}</h2><h3>Hazards Identified</h3><ul><li>Electric shock from live parts</li><li>Arc flash during isolation/reconnection</li><li>Asbestos in existing DB backing board</li><li>Working in confined spaces (under stairs)</li><li>Manual handling of equipment</li></ul><h3>Control Measures</h3><ul><li>Safe isolation procedure (GS38) before commencing work</li><li>Lock-off and prove dead at point of work</li><li>Suitable PPE: insulated gloves, safety glasses, arc-rated clothing</li><li>GS38-compliant voltage indicator and proving unit</li><li>If asbestos suspected, stop work and arrange survey</li><li>Adequate lighting and ventilation</li><li>Two-person working for DB changeover</li></ul><h3>Emergency Procedures</h3><ul><li>First aid kit on site</li><li>Emergency contact: {{emergency_contact}}</li><li>Nearest A&E: {{nearest_hospital}}</li></ul>'),
('DB Board Installation', 'Risk Assessment', 'Electrical', 2, 'Risk assessment for new distribution board installation', ARRAY['BS 7671', 'GS38'], '<h1>Risk Assessment: DB Board Installation</h1><h2>Company: {{company_name}}</h2><h2>Site: {{site_address}}</h2><h3>Hazards</h3><ul><li>Electric shock</li><li>Arc flash</li><li>Working at height (if board mounted high)</li><li>Drilling into unknown services</li><li>Manual handling</li></ul><h3>Controls</h3><ul><li>Safe isolation procedure</li><li>Cable/pipe detector scan before drilling</li><li>Appropriate fixings for wall type</li><li>Two-person lift for heavy boards</li></ul>'),
('Cable Installation', 'Risk Assessment', 'Electrical', 3, 'Risk assessment for cable installation work', ARRAY['BS 7671', 'CDM 2015'], '<h1>Risk Assessment: Cable Installation</h1><h2>Company: {{company_name}}</h2><h2>Site: {{site_address}}</h2><h3>Hazards</h3><ul><li>Contact with existing live services</li><li>Slips/trips from cable runs</li><li>Working at height (cable tray routing)</li><li>Dust from chasing walls</li><li>Noise from power tools</li></ul><h3>Controls</h3><ul><li>Scan for services before chasing</li><li>RPE for dust exposure</li><li>Hearing protection when using SDS drill</li><li>Cable routes clearly marked and protected</li></ul>'),
('Testing and Inspection', 'Risk Assessment', 'Electrical', 4, 'Risk assessment for electrical testing and inspection', ARRAY['BS 7671', 'GS38', 'GS 38'], '<h1>Risk Assessment: Testing & Inspection</h1><h2>Company: {{company_name}}</h2><h2>Site: {{site_address}}</h2><h3>Hazards</h3><ul><li>Electric shock during live testing</li><li>Arc flash at test points</li><li>Incorrect test instrument use</li><li>Working in confined/cramped spaces</li></ul><h3>Controls</h3><ul><li>GS38-compliant test leads and instruments</li><li>Calibrated instruments (within date)</li><li>Safe isolation for dead tests</li><li>Live testing only by competent persons with risk assessment</li></ul>'),
('Solar PV Installation', 'Risk Assessment', 'Renewable', 5, 'Risk assessment for solar PV installation', ARRAY['BS 7671', 'BS EN 62446', 'Work at Height Regulations 2005'], '<h1>Risk Assessment: Solar PV Installation</h1><h2>Company: {{company_name}}</h2><h2>Site: {{site_address}}</h2><h3>Hazards</h3><ul><li>Working at height (roof)</li><li>DC shock hazard (panels generate voltage in daylight)</li><li>Manual handling of panels</li><li>Fragile roof surfaces</li><li>Weather conditions</li></ul><h3>Controls</h3><ul><li>Edge protection/harness system</li><li>DC-rated PPE and tools</li><li>Opaque covers for panels during installation</li><li>Roof survey before work</li><li>Weather monitoring — no work in high winds</li></ul>'),
('EV Charger Installation', 'Risk Assessment', 'Electrical', 6, 'Risk assessment for EV charger installation', ARRAY['BS 7671', 'IET Code of Practice for EV Charging'], '<h1>Risk Assessment: EV Charger Installation</h1><h2>Company: {{company_name}}</h2><h2>Site: {{site_address}}</h2><h3>Hazards</h3><ul><li>Electric shock</li><li>Excavation for cable runs (external)</li><li>Drilling into walls</li><li>Vehicle movement in installation area</li></ul><h3>Controls</h3><ul><li>Safe isolation for connection work</li><li>Cable detection before drilling</li><li>Traffic management if near driveway</li><li>Weatherproof working methods</li></ul>'),

-- Method Statements
('First Fix Electrical', 'Method Statement', 'Installation', 1, 'Method statement for first fix electrical installation', ARRAY['BS 7671', 'CDM 2015'], '<h1>Method Statement: First Fix Electrical</h1><h2>Company: {{company_name}}</h2><h2>Site: {{site_address}}</h2><h3>Scope of Work</h3><p>Installation of cable containment, back boxes, and cable runs prior to plastering.</p><h3>Sequence of Operations</h3><ol><li>Review drawings and mark out positions</li><li>Install containment (trunking/conduit/cable tray)</li><li>Chase walls for flush accessories</li><li>Install back boxes and pattresses</li><li>Draw in cables to containment</li><li>Leave cable tails at points</li><li>Test continuity of CPC</li><li>Photograph cable runs before covering</li></ol>'),
('Second Fix Electrical', 'Method Statement', 'Installation', 2, 'Method statement for second fix electrical installation', ARRAY['BS 7671'], '<h1>Method Statement: Second Fix Electrical</h1><h2>Company: {{company_name}}</h2><h2>Site: {{site_address}}</h2><h3>Scope of Work</h3><p>Termination of accessories, fitting of luminaires, and connection of final circuits.</p><h3>Sequence of Operations</h3><ol><li>Isolate relevant circuits</li><li>Terminate accessories (sockets, switches, FCUs)</li><li>Fit luminaires and connect</li><li>Connect circuits at distribution board</li><li>Initial verification testing</li><li>Rectify any defects</li><li>Issue electrical certificates</li></ol>'),
('Safe Isolation Procedure', 'Method Statement', 'Safety', 3, 'Method statement for safe isolation to GS38', ARRAY['GS38', 'Electricity at Work Regulations 1989'], '<h1>Method Statement: Safe Isolation Procedure</h1><h2>Company: {{company_name}}</h2><h2>Site: {{site_address}}</h2><h3>8-Step Procedure</h3><ol><li>Identify the circuit to be worked on</li><li>Identify the means of isolation (switch, fuse, MCB)</li><li>Verify the voltage indicator against a known source (proving unit)</li><li>Isolate the circuit</li><li>Secure the isolation (lock-off device + warning notice)</li><li>Test that the circuit is dead using the voltage indicator</li><li>Re-verify the voltage indicator against the known source</li><li>Begin work</li></ol><h3>Re-energisation</h3><ol><li>Ensure all work is complete</li><li>Remove all tools and temporary connections</li><li>Replace all covers</li><li>Remove lock-off device</li><li>Re-energise circuit</li><li>Verify operation</li></ol>'),

-- Safe Systems of Work
('Safe Isolation (GS38)', 'Safe System of Work', 'Electrical', 1, 'Safe system of work for electrical isolation', ARRAY['GS38', 'Electricity at Work Regulations 1989'], '<h1>Safe System of Work: Safe Isolation</h1><h2>Company: {{company_name}}</h2><h3>Purpose</h3><p>To ensure all electrical work is carried out on circuits that have been confirmed dead.</p><h3>Requirements</h3><ul><li>GS38-compliant voltage indicator</li><li>Proving unit</li><li>Lock-off devices and warning notices</li><li>Two-pole voltage indicator (not a neon screwdriver)</li></ul>'),
('Lock-Out/Tag-Out', 'Safe System of Work', 'Electrical', 2, 'LOTO procedure for electrical isolation', ARRAY['Electricity at Work Regulations 1989'], '<h1>Safe System of Work: Lock-Out/Tag-Out</h1><h2>Company: {{company_name}}</h2><h3>Procedure</h3><ol><li>Identify all energy sources</li><li>Notify affected personnel</li><li>Shut down equipment using normal procedures</li><li>Isolate energy sources</li><li>Apply lock-off devices and tags</li><li>Verify isolation (prove dead)</li><li>Perform work</li><li>Remove locks/tags only by the person who applied them</li></ol>'),
('Lone Working', 'Safe System of Work', 'General', 3, 'Safe system of work for lone working electricians', ARRAY['Health and Safety at Work Act 1974', 'Management of Health and Safety at Work Regulations 1999'], '<h1>Safe System of Work: Lone Working</h1><h2>Company: {{company_name}}</h2><h3>Controls</h3><ul><li>Risk assessment completed before lone working</li><li>Check-in procedure — contact office/buddy every 2 hours</li><li>Mobile phone fully charged and signal confirmed</li><li>First aid kit available</li><li>No live working when working alone</li><li>Emergency contact details left with office</li><li>Work location shared with colleague</li></ul>'),

-- Checklists
('Pre-Start Site Safety Checklist', 'Checklist', 'Site Safety', 1, 'Checklist before starting work on site', ARRAY['CDM 2015'], '<h1>Pre-Start Site Safety Checklist</h1><h2>Site: {{site_address}}</h2><h2>Date: {{date}}</h2><ul><li>[ ] Site induction completed</li><li>[ ] RAMS reviewed and signed</li><li>[ ] PPE appropriate and in good condition</li><li>[ ] Work area inspected for hazards</li><li>[ ] Emergency exits and assembly points identified</li><li>[ ] First aid facilities located</li><li>[ ] Welfare facilities available</li><li>[ ] Permits to work obtained (if required)</li><li>[ ] Tools and equipment checked</li><li>[ ] Service detection completed</li></ul>'),
('Daily Tool Check', 'Checklist', 'Equipment', 2, 'Daily pre-use check for power tools and test equipment', ARRAY['PUWER 1998'], '<h1>Daily Tool Check</h1><h2>Date: {{date}}</h2><ul><li>[ ] Power tool casing undamaged</li><li>[ ] Cable/flex in good condition (no cuts or damage)</li><li>[ ] Plug pins not bent or loose</li><li>[ ] PAT test label in date</li><li>[ ] Guards and safety features operational</li><li>[ ] Test instruments calibrated (check sticker)</li><li>[ ] Test leads GS38 compliant (shrouded probes, 4mm exposed)</li><li>[ ] Battery tools fully charged</li></ul>'),
('PPE Condition Check', 'Checklist', 'Equipment', 3, 'Weekly PPE condition inspection', ARRAY['PPE Regulations 2002'], '<h1>PPE Condition Check</h1><h2>Date: {{date}}</h2><ul><li>[ ] Safety boots — soles intact, toe cap undamaged</li><li>[ ] Hard hat — no cracks, within expiry date</li><li>[ ] Safety glasses — lenses clean, no scratches</li><li>[ ] Insulated gloves — no tears, within test date</li><li>[ ] Hi-vis vest — clean, reflective strips intact</li><li>[ ] Hearing protection — ear defenders/plugs available</li><li>[ ] Knee pads — padding intact</li></ul>');
