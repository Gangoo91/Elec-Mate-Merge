-- First, add the missing qualifications without ON CONFLICT since we don't have a unique constraint on code
-- Let's check and insert only if they don't exist by title and awarding_body
DO $$
BEGIN
  -- Insert City & Guilds Level 2 Electrical Installation if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM qualifications WHERE title = 'Level 2 Electrical Installation' AND awarding_body = 'City & Guilds') THEN
    INSERT INTO public.qualifications (awarding_body, level, title, code, description) VALUES
    ('City & Guilds', 'Level 2', 'Level 2 Electrical Installation', 'C&G-L2-EI', 'City & Guilds Level 2 Electrical Installation qualification');
  END IF;

  -- Insert City & Guilds Level 3 Electrical Installation if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM qualifications WHERE title = 'Level 3 Electrical Installation' AND awarding_body = 'City & Guilds') THEN
    INSERT INTO public.qualifications (awarding_body, level, title, code, description) VALUES
    ('City & Guilds', 'Level 3', 'Level 3 Electrical Installation', 'C&G-L3-EI', 'City & Guilds Level 3 Electrical Installation qualification');
  END IF;

  -- Insert EAL Level 3 Advanced Diploma if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM qualifications WHERE title = 'Level 3 Advanced Diploma in Electrical Installation' AND awarding_body = 'EAL') THEN
    INSERT INTO public.qualifications (awarding_body, level, title, code, description) VALUES
    ('EAL', 'Level 3', 'Level 3 Advanced Diploma in Electrical Installation', 'EAL-L3-ADEI', 'EAL Level 3 Advanced Diploma in Electrical Installation');
  END IF;

  -- Insert EAL Level 3 NVQ Diploma if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM qualifications WHERE title = 'Level 3 NVQ Diploma in Electrotechnical Technology' AND awarding_body = 'EAL') THEN
    INSERT INTO public.qualifications (awarding_body, level, title, code, description) VALUES
    ('EAL', 'Level 3', 'Level 3 NVQ Diploma in Electrotechnical Technology', 'EAL-L3-NVQET', 'EAL Level 3 NVQ Diploma in Electrotechnical Technology');
  END IF;
END $$;

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
WHERE q.title = 'Level 2 Electrical Installation' AND q.awarding_body = 'City & Guilds'
AND NOT EXISTS (
  SELECT 1 FROM qualification_categories qc 
  WHERE qc.qualification_id = q.id AND qc.name = 'Electrical Installation Fundamentals'
);

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
WHERE q.title = 'Level 2 Electrical Installation' AND q.awarding_body = 'City & Guilds'
AND NOT EXISTS (
  SELECT 1 FROM qualification_categories qc 
  WHERE qc.qualification_id = q.id AND qc.name = 'Testing and Inspection'
);

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
WHERE q.title = 'Level 3 Electrical Installation' AND q.awarding_body = 'City & Guilds'
AND NOT EXISTS (
  SELECT 1 FROM qualification_categories qc 
  WHERE qc.qualification_id = q.id AND qc.name = 'Advanced Installation Techniques'
);

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
WHERE q.title = 'Level 3 Electrical Installation' AND q.awarding_body = 'City & Guilds'
AND NOT EXISTS (
  SELECT 1 FROM qualification_categories qc 
  WHERE qc.qualification_id = q.id AND qc.name = 'Inspection and Testing'
);

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
WHERE q.title = 'Level 3 Advanced Diploma in Electrical Installation' AND q.awarding_body = 'EAL'
AND NOT EXISTS (
  SELECT 1 FROM qualification_categories qc 
  WHERE qc.qualification_id = q.id AND qc.name = 'Electrical Installation Design'
);

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
WHERE q.title = 'Level 3 Advanced Diploma in Electrical Installation' AND q.awarding_body = 'EAL'
AND NOT EXISTS (
  SELECT 1 FROM qualification_categories qc 
  WHERE qc.qualification_id = q.id AND qc.name = 'Installation and Commissioning'
);

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
WHERE q.title = 'Level 3 NVQ Diploma in Electrotechnical Technology' AND q.awarding_body = 'EAL'
AND NOT EXISTS (
  SELECT 1 FROM qualification_categories qc 
  WHERE qc.qualification_id = q.id AND qc.name = 'Electrotechnical Systems'
);

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
WHERE q.title = 'Level 3 NVQ Diploma in Electrotechnical Technology' AND q.awarding_body = 'EAL'
AND NOT EXISTS (
  SELECT 1 FROM qualification_categories qc 
  WHERE qc.qualification_id = q.id AND qc.name = 'Professional Practice'
);