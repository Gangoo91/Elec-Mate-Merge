-- Update Building Services Engineering Installer Apprenticeship qualification with correct details
UPDATE qualifications 
SET 
  title = 'Building Services Engineering Installer Apprenticeship (Electrical Pathway)',
  code = '3529',
  awarding_body = 'City & Guilds',
  description = 'Level 3 apprenticeship for building services engineering installers specialising in electrical pathway. Develops competency in electrical installation, maintenance, and safety practices.',
  updated_at = now()
WHERE id = '206e1549-4f4d-49d4-b1d9-a09e83b33825';

-- Delete existing categories for this qualification to replace with correct ones
DELETE FROM qualification_categories 
WHERE qualification_id = '206e1549-4f4d-49d4-b1d9-a09e83b33825';

-- Insert the 9 correct evidence categories for Building Services Engineering Installer Apprenticeship
INSERT INTO qualification_categories (
  qualification_id, 
  name, 
  description, 
  icon, 
  color, 
  required_entries, 
  learning_outcomes, 
  assessment_criteria
) VALUES
-- 1. Health and Safety
(
  '206e1549-4f4d-49d4-b1d9-a09e83b33825',
  'Health and Safety',
  'Evidence of safe working practices, risk assessments, and compliance with health and safety regulations in electrical work',
  'Shield',
  '#ef4444',
  4,
  ARRAY[
    'Apply health and safety requirements and procedures',
    'Identify electrical hazards and implement control measures',
    'Use appropriate personal protective equipment (PPE)',
    'Complete risk assessments for electrical work activities'
  ],
  ARRAY[
    'Demonstrate knowledge of CDM regulations and safety legislation',
    'Show competence in safe isolation procedures',
    'Complete RAMS (Risk Assessment Method Statements)',
    'Evidence of incident reporting and near-miss procedures'
  ]
),
-- 2. Electrical Theory and Principles
(
  '206e1549-4f4d-49d4-b1d9-a09e83b33825',
  'Electrical Theory and Principles',
  'Understanding of fundamental electrical concepts, calculations, and theoretical knowledge supporting practical work',
  'Zap',
  '#3b82f6',
  3,
  ARRAY[
    'Apply electrical principles and theory',
    'Perform electrical calculations and problem-solving',
    'Understand AC/DC theory and electrical components',
    'Apply Ohms law and power calculations'
  ],
  ARRAY[
    'Demonstrate understanding of electrical fundamentals',
    'Complete electrical calculations accurately',
    'Explain circuit behaviour and component characteristics',
    'Apply theoretical knowledge to practical situations'
  ]
),
-- 3. Installation Methods and Techniques
(
  '206e1549-4f4d-49d4-b1d9-a09e83b33825',
  'Installation Methods and Techniques',
  'Practical installation of electrical systems, equipment, and components using industry-standard methods',
  'Wrench',
  '#10b981',
  6,
  ARRAY[
    'Install electrical systems and equipment safely',
    'Select appropriate installation methods and materials',
    'Use tools and equipment competently',
    'Follow installation procedures and specifications'
  ],
  ARRAY[
    'Complete electrical installations to BS 7671 standards',
    'Demonstrate competent use of hand and power tools',
    'Show understanding of cable management systems',
    'Evidence of different installation techniques and environments'
  ]
),
-- 4. Testing and Commissioning
(
  '206e1549-4f4d-49d4-b1d9-a09e83b33825',
  'Testing and Commissioning',
  'Electrical testing procedures, commissioning new installations, and completion of certification documentation',
  'CheckCircle',
  '#8b5cf6',
  4,
  ARRAY[
    'Carry out electrical testing procedures',
    'Commission electrical installations',
    'Complete test certificates and documentation',
    'Interpret test results and identify remedial actions'
  ],
  ARRAY[
    'Perform prescribed electrical tests safely and accurately',
    'Complete electrical installation certificates',
    'Demonstrate understanding of testing sequences',
    'Evidence of commissioning procedures and handover'
  ]
),
-- 5. Fault Diagnosis and Repair
(
  '206e1549-4f4d-49d4-b1d9-a09e83b33825',
  'Fault Diagnosis and Repair',
  'Systematic fault finding, diagnosis of electrical problems, and implementation of repair solutions',
  'Search',
  '#f59e0b',
  4,
  ARRAY[
    'Apply systematic fault finding techniques',
    'Use diagnostic equipment and test instruments',
    'Implement appropriate repair solutions',
    'Document fault finding and repair activities'
  ],
  ARRAY[
    'Demonstrate logical fault finding approach',
    'Use test equipment correctly and safely',
    'Complete repairs to required standards',
    'Evidence of different fault scenarios and solutions'
  ]
),
-- 6. Maintenance and Inspection
(
  '206e1549-4f4d-49d4-b1d9-a09e83b33825',
  'Maintenance and Inspection',
  'Planned preventive maintenance, periodic inspection, and condition monitoring of electrical systems',
  'Cog',
  '#6366f1',
  3,
  ARRAY[
    'Carry out maintenance procedures on electrical systems',
    'Perform periodic inspection and testing',
    'Identify maintenance requirements and priorities',
    'Complete maintenance documentation and records'
  ],
  ARRAY[
    'Follow maintenance schedules and procedures',
    'Complete periodic inspection and testing (EICR)',
    'Demonstrate understanding of maintenance planning',
    'Evidence of different maintenance activities and systems'
  ]
),
-- 7. Documentation and Communication
(
  '206e1549-4f4d-49d4-b1d9-a09e83b33825',
  'Documentation and Communication',
  'Technical documentation, communication skills, and professional interaction with colleagues and clients',
  'FileText',
  '#0ea5e9',
  3,
  ARRAY[
    'Complete technical documentation accurately',
    'Communicate effectively with colleagues and customers',
    'Maintain professional standards and conduct',
    'Use appropriate technical language and terminology'
  ],
  ARRAY[
    'Complete installation and test certificates',
    'Demonstrate effective verbal and written communication',
    'Show evidence of customer interaction and service',
    'Maintain accurate work records and documentation'
  ]
),
-- 8. Regulations and Standards
(
  '206e1549-4f4d-49d4-b1d9-a09e83b33825',
  'Regulations and Standards',
  'Knowledge and application of electrical regulations, standards, and industry codes of practice',
  'Book',
  '#dc2626',
  3,
  ARRAY[
    'Apply BS 7671 Wiring Regulations requirements',
    'Understand relevant electrical standards and codes',
    'Comply with statutory and regulatory requirements',
    'Apply building regulations relevant to electrical work'
  ],
  ARRAY[
    'Demonstrate knowledge of BS 7671 requirements',
    'Show understanding of electrical safety standards',
    'Apply relevant building and planning regulations',
    'Evidence of regulatory compliance in work activities'
  ]
),
-- 9. Professional Development and Continuous Learning
(
  '206e1549-4f4d-49d4-b1d9-a09e83b33825',
  'Professional Development and Continuous Learning',
  'Evidence of ongoing learning, skill development, and professional growth throughout the apprenticeship',
  'GraduationCap',
  '#059669',
  2,
  ARRAY[
    'Engage in continuous professional development',
    'Reflect on learning and skill development',
    'Seek opportunities for knowledge enhancement',
    'Demonstrate commitment to professional standards'
  ],
  ARRAY[
    'Evidence of training courses and skill development',
    'Demonstrate reflective practice and self-assessment',
    'Show engagement with professional development opportunities',
    'Evidence of knowledge sharing and mentoring activities'
  ]
);

-- Update other key qualifications with correct information
-- EAL Level 3 Installation and Maintenance Electrician Apprenticeship Standard
UPDATE qualifications 
SET 
  title = 'Installation and Maintenance Electrician Apprenticeship Standard',
  code = '603/3895/8',
  description = 'Level 3 apprenticeship standard for installation and maintenance electricians, covering both installation and maintenance competencies.'
WHERE id = '7a2bdf91-51d7-4363-87b9-d4f675331434';

-- EAL Level 3 Electrotechnical Qualification (Installation) (NVQ)
UPDATE qualifications 
SET 
  title = 'Electrotechnical Qualification (Installation) (NVQ)',
  code = '603/3929/9',
  description = 'Level 3 NVQ qualification for electrical installation professionals, focusing on competency-based assessment.'
WHERE id = 'df197ef2-f358-4857-9d32-c89003dea03f';

-- EAL Level 3 Electrotechnical Qualification (Maintenance) (NVQ)
UPDATE qualifications 
SET 
  title = 'Electrotechnical Qualification (Maintenance) (NVQ)',
  code = '603/3928/7',
  description = 'Level 3 NVQ qualification for electrical maintenance professionals, focusing on competency-based assessment.'
WHERE id = 'f5d17f78-be2d-4043-b615-2e5f1594954a';

-- Update City & Guilds qualifications with correct codes and titles
UPDATE qualifications 
SET 
  title = 'Electrotechnical Qualification (Installation or Maintenance) – Apprenticeship Standard',
  code = '5357',
  description = 'Level 3 electrotechnical qualification supporting the installation and maintenance electrician apprenticeship standard.'
WHERE id = '8fba41dc-6af1-4b51-bb65-6baf391394f4';

UPDATE qualifications 
SET 
  title = 'NVQ Diploma in Installing Electrotechnical Systems and Equipment',
  code = '2357',
  description = 'Level 3 NVQ qualification for installing electrotechnical systems in buildings, structures and the environment.'
WHERE id = '1bdf0f01-963b-4bca-8d22-3699f781243a';