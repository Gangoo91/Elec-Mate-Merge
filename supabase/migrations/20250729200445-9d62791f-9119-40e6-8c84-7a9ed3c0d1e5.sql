-- Create the Electrotechnical Experienced Worker qualification first
INSERT INTO qualifications (
  awarding_body,
  level,
  title,
  code,
  description
) VALUES (
  'ECS (Electrotechnical Certification Scheme)',
  'Level 3',
  'Electrotechnical Experienced Worker',
  'ELEC-EXP-WORKER',
  'Assessment for experienced electrical workers to demonstrate competency through portfolio evidence'
);

-- Insert the 8 detailed categories for Electrotechnical Experienced Worker qualification
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

-- 1. Real Work Evidence
(
  (SELECT id FROM qualifications WHERE code = 'ELEC-EXP-WORKER'),
  'Real Work Evidence',
  'Evidence from minimum of 3 distinct sites covering the full installation lifecycle from design to testing',
  'Building2',
  'hsl(210, 100%, 56%)',
  3,
  ARRAY[
    'Demonstrate understanding of electrical design principles',
    'Execute complete electrical installations safely',
    'Perform thorough inspection and testing procedures',
    'Diagnose and resolve electrical faults effectively'
  ],
  ARRAY[
    'Evidence from minimum 3 distinct sites (domestic, commercial, industrial)',
    'Full installation lifecycle documentation',
    'Design understanding demonstrated',
    'Installation work completed to standard',
    'Inspection and testing reports included',
    'Fault finding evidence provided'
  ]
),

-- 2. Work-Based Tasks (Mandatory)
(
  (SELECT id FROM qualifications WHERE code = 'ELEC-EXP-WORKER'),
  'Work-Based Tasks (Mandatory)',
  'Mandatory evidence of core electrical work including cable systems, distribution boards, and testing',
  'Wrench',
  'hsl(142, 71%, 45%)',
  4,
  ARRAY[
    'Select and install appropriate cable types and containment systems',
    'Install and configure distribution boards and final circuits',
    'Implement proper earthing and bonding systems',
    'Complete inspection and testing with proper certification',
    'Install lighting, power, and special installations safely'
  ],
  ARRAY[
    'Cable types and containment systems evidence',
    'Distribution boards and final circuits installation',
    'Earthing and bonding implementation',
    'Completed inspection and testing certificates',
    'Lighting, power, and special installations work',
    'Safe isolation procedures demonstrated'
  ]
),

-- 3. Risk Management & Safety
(
  (SELECT id FROM qualifications WHERE code = 'ELEC-EXP-WORKER'),
  'Risk Management & Safety',
  'Comprehensive safety documentation including risk assessments and method statements',
  'Shield',
  'hsl(0, 84%, 60%)',
  3,
  ARRAY[
    'Conduct thorough risk assessments for electrical work',
    'Develop and follow method statements',
    'Implement COSHH procedures appropriately',
    'Participate in safety communications and training'
  ],
  ARRAY[
    'Risk assessments completed and documented',
    'Method statements prepared and followed',
    'COSHH-related procedures implemented',
    'Toolbox talks attendance recorded'
  ]
),

-- 4. Environmental Awareness
(
  (SELECT id FROM qualifications WHERE code = 'ELEC-EXP-WORKER'),
  'Environmental Awareness',
  'Evidence of environmental considerations in electrical work including energy efficiency and waste management',
  'Leaf',
  'hsl(120, 61%, 50%)',
  2,
  ARRAY[
    'Apply energy efficiency considerations in electrical installations',
    'Implement proper waste management and recycling practices',
    'Demonstrate environmental awareness in work practices'
  ],
  ARRAY[
    'Energy efficiency considerations documented',
    'Waste management or recycling measures evidence',
    'Environmental impact mitigation demonstrated'
  ]
),

-- 5. Communication Evidence
(
  (SELECT id FROM qualifications WHERE code = 'ELEC-EXP-WORKER'),
  'Communication Evidence',
  'Professional communication with clients, supervisors, and team members',
  'MessageSquare',
  'hsl(262, 83%, 58%)',
  3,
  ARRAY[
    'Follow job specifications accurately',
    'Communicate effectively with clients and supervisors',
    'Demonstrate leadership through delegation or mentoring',
    'Maintain professional relationships'
  ],
  ARRAY[
    'Job specifications followed accurately',
    'Client liaison documented',
    'Supervisor communication evidence',
    'Delegation or mentoring examples (if applicable)'
  ]
),

-- 6. Witness Statements
(
  (SELECT id FROM qualifications WHERE code = 'ELEC-EXP-WORKER'),
  'Witness Statements',
  'Formal statements from competent persons confirming work quality and safety',
  'FileCheck',
  'hsl(25, 95%, 53%)',
  3,
  ARRAY[
    'Obtain verification of work ownership and quality',
    'Demonstrate safe working practices to supervisors',
    'Meet required standards and specifications consistently'
  ],
  ARRAY[
    'Competent person confirmation of work ownership',
    'Safety compliance verified by supervisor',
    'Standard and specification compliance confirmed',
    'Professional competence witnessed'
  ]
),

-- 7. Reflective Reports
(
  (SELECT id FROM qualifications WHERE code = 'ELEC-EXP-WORKER'),
  'Reflective Reports',
  'Detailed reflection on work completed, challenges faced, and problem-solving approaches',
  'BookOpen',
  'hsl(217, 91%, 60%)',
  4,
  ARRAY[
    'Analyse work processes and outcomes critically',
    'Identify and reflect on challenges encountered',
    'Demonstrate problem-solving and decision-making skills',
    'Consider alternative methods and approaches'
  ],
  ARRAY[
    'Detailed description of work completed',
    'Challenges and difficulties identified',
    'Resolution methods documented',
    'Alternative approaches considered',
    'Learning outcomes reflected upon'
  ]
),

-- 8. Knowledge Questions / Professional Discussion Prep
(
  (SELECT id FROM qualifications WHERE code = 'ELEC-EXP-WORKER'),
  'Knowledge Questions / Professional Discussion Prep',
  'Preparation materials and evidence for professional discussions covering regulations and standards',
  'GraduationCap',
  'hsl(280, 100%, 70%)',
  3,
  ARRAY[
    'Demonstrate comprehensive knowledge of IET Wiring Regulations',
    'Apply building regulations to electrical installations',
    'Implement safe working practices consistently',
    'Understand and comply with Health & Safety legislation'
  ],
  ARRAY[
    'IET Wiring Regulations knowledge demonstrated',
    'Building regulations compliance evidence',
    'Safe working practices documentation',
    'Health & Safety legislation understanding',
    'Professional discussion preparation materials'
  ]
);