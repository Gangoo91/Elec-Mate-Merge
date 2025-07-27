-- Add qualification categories for the City & Guilds electrical apprenticeship
INSERT INTO qualification_categories (qualification_id, name, description, required_entries, learning_outcomes, assessment_criteria) VALUES
(
  (SELECT id FROM qualifications WHERE code = '3529'),
  'Electrical Installation Work',
  'Core electrical installation activities and safety procedures',
  8,
  ARRAY['Install electrical systems safely', 'Follow BS 7671 wiring regulations', 'Use appropriate tools and equipment'],
  ARRAY['Demonstrate safe working practices', 'Complete installations to required standards', 'Test and commission electrical systems']
),
(
  (SELECT id FROM qualifications WHERE code = '3529'),
  'Testing and Commissioning',
  'Electrical testing, inspection and commissioning procedures',
  5,
  ARRAY['Perform electrical testing', 'Understand test results', 'Complete inspection certificates'],
  ARRAY['Carry out prescribed electrical tests', 'Interpret test results correctly', 'Complete required documentation']
),
(
  (SELECT id FROM qualifications WHERE code = '3529'),
  'Health and Safety',
  'Health and safety practices in electrical work',
  4,
  ARRAY['Identify electrical hazards', 'Apply risk assessment procedures', 'Use PPE correctly'],
  ARRAY['Demonstrate hazard awareness', 'Complete risk assessments', 'Follow safety procedures']
),
(
  (SELECT id FROM qualifications WHERE code = '3529'),
  'Fault Diagnosis and Repair',
  'Electrical fault finding and repair techniques',
  6,
  ARRAY['Diagnose electrical faults', 'Use diagnostic equipment', 'Implement repair solutions'],
  ARRAY['Apply systematic fault finding', 'Use test equipment correctly', 'Complete repairs safely']
),
(
  (SELECT id FROM qualifications WHERE code = '3529'),
  'Professional Development',
  'Communication, teamwork and professional skills',
  3,
  ARRAY['Communicate effectively', 'Work as part of a team', 'Maintain professional standards'],
  ARRAY['Demonstrate effective communication', 'Show teamwork skills', 'Maintain professional conduct']
);