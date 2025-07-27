-- First, let's check what qualifications we have and add the missing ones if needed
INSERT INTO public.qualifications (awarding_body, level, title, code, description) VALUES
('City & Guilds', 'Level 2', 'Level 2 Electrical Installation', 'C&G-L2-EI', 'City & Guilds Level 2 Electrical Installation qualification'),
('City & Guilds', 'Level 3', 'Level 3 Electrical Installation', 'C&G-L3-EI', 'City & Guilds Level 3 Electrical Installation qualification'),
('EAL', 'Level 3', 'Level 3 Advanced Diploma in Electrical Installation', 'EAL-L3-ADEI', 'EAL Level 3 Advanced Diploma in Electrical Installation'),
('EAL', 'Level 3', 'Level 3 NVQ Diploma in Electrotechnical Technology', 'EAL-L3-NVQET', 'EAL Level 3 NVQ Diploma in Electrotechnical Technology')
ON CONFLICT (code) DO NOTHING;

-- Now add portfolio categories for City & Guilds Level 2 Electrical Installation
INSERT INTO public.qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT 
  q.id,
  'Electrical Installation Fundamentals',
  'Basic electrical installation skills and knowledge',
  'Zap',
  'blue',
  3,
  ARRAY['Understand electrical safety principles', 'Demonstrate basic wiring techniques', 'Apply electrical regulations'],
  ARRAY['Safety procedures followed', 'Correct installation methods used', 'Compliance with BS 7671']
FROM qualifications q 
WHERE q.code = 'C&G-L2-EI';

INSERT INTO public.qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT 
  q.id,
  'Testing and Inspection',
  'Testing and inspection of electrical installations',
  'Search',
  'green',
  2,
  ARRAY['Perform electrical tests', 'Interpret test results', 'Complete certificates'],
  ARRAY['Correct testing procedures', 'Accurate measurements', 'Proper documentation']
FROM qualifications q 
WHERE q.code = 'C&G-L2-EI';

-- Add portfolio categories for City & Guilds Level 3 Electrical Installation
INSERT INTO public.qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT 
  q.id,
  'Advanced Installation Techniques',
  'Advanced electrical installation and design skills',
  'Zap',
  'blue',
  4,
  ARRAY['Design electrical circuits', 'Install complex systems', 'Apply advanced regulations'],
  ARRAY['Circuit design accuracy', 'Professional installation standards', 'Regulatory compliance']
FROM qualifications q 
WHERE q.code = 'C&G-L3-EI';

INSERT INTO public.qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT 
  q.id,
  'Inspection and Testing',
  'Advanced testing and inspection techniques',
  'Search',
  'green',
  3,
  ARRAY['Advanced testing methods', 'Fault diagnosis', 'Certification procedures'],
  ARRAY['Comprehensive testing', 'Accurate fault finding', 'Complete documentation']
FROM qualifications q 
WHERE q.code = 'C&G-L3-EI';

-- Add portfolio categories for EAL Level 3 Advanced Diploma
INSERT INTO public.qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT 
  q.id,
  'Electrical Installation Design',
  'Design and planning of electrical installations',
  'PenTool',
  'purple',
  4,
  ARRAY['Create installation designs', 'Calculate electrical loads', 'Select appropriate equipment'],
  ARRAY['Design accuracy', 'Load calculations', 'Equipment selection']
FROM qualifications q 
WHERE q.code = 'EAL-L3-ADEI';

INSERT INTO public.qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT 
  q.id,
  'Installation and Commissioning',
  'Installation and commissioning of electrical systems',
  'Settings',
  'orange',
  3,
  ARRAY['Install electrical systems', 'Commission installations', 'Handover procedures'],
  ARRAY['Installation quality', 'Commissioning procedures', 'Documentation standards']
FROM qualifications q 
WHERE q.code = 'EAL-L3-ADEI';

-- Add portfolio categories for EAL Level 3 NVQ Diploma
INSERT INTO public.qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT 
  q.id,
  'Electrotechnical Systems',
  'Working with electrotechnical systems and equipment',
  'Cpu',
  'red',
  4,
  ARRAY['Understand electrotechnical principles', 'Maintain electrical systems', 'Troubleshoot faults'],
  ARRAY['Technical understanding', 'Maintenance procedures', 'Fault resolution']
FROM qualifications q 
WHERE q.code = 'EAL-L3-NVQET';

INSERT INTO public.qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT 
  q.id,
  'Professional Practice',
  'Professional practices in electrotechnical work',
  'Users',
  'indigo',
  3,
  ARRAY['Apply professional standards', 'Work safely and efficiently', 'Communicate effectively'],
  ARRAY['Professional conduct', 'Safety compliance', 'Communication skills']
FROM qualifications q 
WHERE q.code = 'EAL-L3-NVQET';