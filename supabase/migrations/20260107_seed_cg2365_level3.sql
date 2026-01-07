-- City & Guilds 2365-03 Level 3 Diploma in Electrical Installations
-- Real unit data based on the qualification handbook

-- First, insert or update the qualification
INSERT INTO qualifications (id, awarding_body, level, title, code, description)
VALUES (
  'cg-2365-l3-00000000-0000-0001',
  'City & Guilds',
  'Level 3',
  'Diploma in Electrical Installations (Buildings and Structures)',
  '2365-03',
  'Level 3 Diploma covering advanced electrical installation theory, inspection and testing, fault diagnosis, and system design. Builds on Level 2 knowledge and skills. Assessment through online examinations and practical assignments.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  code = EXCLUDED.code,
  description = EXCLUDED.description,
  updated_at = NOW();

-- Delete any existing categories for this qualification
DELETE FROM qualification_categories
WHERE qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- Unit 301: Electrical System Design
-- Advanced design principles and calculations
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'cg-2365-l3-00000000-0000-0001',
  'Unit 301: Electrical System Design',
  'Advanced unit covering electrical system design principles, circuit design, cable selection, and protective device coordination. Assessment: Online examination.',
  'PenTool',
  '#6366f1',
  4,
  ARRAY[
    'LO1: Understand the principles of electrical system design',
    'LO2: Understand how to design electrical circuits',
    'LO3: Understand how to select cables for electrical installations',
    'LO4: Understand how to select and coordinate protective devices',
    'LO5: Understand the requirements for special installations and locations'
  ],
  ARRAY[
    '1.1 Describe the design process for electrical installations',
    '1.2 Identify factors that influence electrical system design',
    '1.3 Explain the importance of electrical load assessment',
    '1.4 Describe methods for diversity calculation',
    '2.1 Design circuits for lighting, power, and specialist applications',
    '2.2 Calculate circuit loads and diversity',
    '2.3 Apply BS 7671 requirements to circuit design',
    '2.4 Specify appropriate wiring systems for circuit applications',
    '3.1 Apply the criteria for cable selection',
    '3.2 Calculate current-carrying capacity with correction factors',
    '3.3 Calculate voltage drop and verify compliance',
    '3.4 Verify thermal constraints for protective conductors',
    '3.5 Calculate earth fault loop impedance (Zs) requirements',
    '4.1 Select appropriate protective devices for different circuits',
    '4.2 Calculate prospective fault current requirements',
    '4.3 Verify protective device coordination (discrimination)',
    '4.4 Apply requirements for RCD selection and coordination',
    '5.1 Describe requirements for bathroom and shower installations',
    '5.2 Describe requirements for swimming pool and hot tub installations',
    '5.3 Describe requirements for agricultural and horticultural premises',
    '5.4 Describe requirements for construction sites and exhibitions'
  ]
);

-- Unit 302: Inspection, Testing and Commissioning
-- Core testing unit for the qualification
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'cg-2365-l3-00000000-0000-0001',
  'Unit 302: Inspection, Testing and Commissioning',
  'Comprehensive unit covering initial verification, periodic inspection, testing procedures, and certification. Assessment: Online examination plus practical assessment.',
  'ClipboardCheck',
  '#10b981',
  5,
  ARRAY[
    'LO1: Understand the requirements for inspection and testing electrical installations',
    'LO2: Understand how to conduct visual inspection of electrical installations',
    'LO3: Understand the procedures for testing electrical installations',
    'LO4: Understand how to commission electrical installations',
    'LO5: Understand how to complete certification and documentation'
  ],
  ARRAY[
    '1.1 State the statutory and non-statutory requirements for inspection and testing',
    '1.2 Explain when initial verification is required',
    '1.3 Explain when periodic inspection and testing is required',
    '1.4 Describe the purpose and scope of inspection and testing',
    '2.1 Describe the items to be checked during visual inspection',
    '2.2 Identify defects and non-compliances during visual inspection',
    '2.3 Assess the condition of electrical installations',
    '2.4 Identify appropriate actions for observed defects',
    '3.1 Conduct continuity tests on protective conductors',
    '3.2 Conduct continuity tests on ring final circuit conductors',
    '3.3 Conduct insulation resistance tests',
    '3.4 Conduct polarity tests',
    '3.5 Conduct earth fault loop impedance tests (Ze and Zs)',
    '3.6 Conduct prospective fault current measurements',
    '3.7 Conduct RCD tests (operating time and current)',
    '3.8 Conduct functional tests on assemblies and equipment',
    '4.1 Describe commissioning procedures for electrical installations',
    '4.2 Set up and commission lighting and power circuits',
    '4.3 Commission motor circuits and control systems',
    '4.4 Conduct safe handover procedures',
    '5.1 Complete Electrical Installation Certificates (EIC)',
    '5.2 Complete Minor Electrical Installation Works Certificates (MEIWC)',
    '5.3 Complete Electrical Installation Condition Reports (EICR)',
    '5.4 Complete schedule of inspections and test results',
    '5.5 Determine appropriate recommendations and coding (C1, C2, C3, FI)'
  ]
);

-- Unit 303: Fault Diagnosis and Rectification
-- Systematic fault-finding methodology
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'cg-2365-l3-00000000-0000-0001',
  'Unit 303: Fault Diagnosis and Rectification',
  'Covers systematic fault-finding methodology, use of diagnostic equipment, and rectification of electrical faults. Assessment: Practical assessment with related questions.',
  'Search',
  '#f59e0b',
  4,
  ARRAY[
    'LO1: Understand the principles of fault diagnosis',
    'LO2: Understand how to use diagnostic equipment and procedures',
    'LO3: Be able to diagnose faults in electrical installations',
    'LO4: Be able to rectify faults in electrical installations'
  ],
  ARRAY[
    '1.1 Describe the symptoms of common electrical faults',
    '1.2 Explain logical and systematic fault-finding procedures',
    '1.3 Describe the six-point fault-finding methodology',
    '1.4 Identify factors that affect fault diagnosis efficiency',
    '2.1 Describe the use of multimeters for fault diagnosis',
    '2.2 Describe the use of insulation resistance testers',
    '2.3 Describe the use of earth fault loop impedance testers',
    '2.4 Describe the use of RCD testers',
    '2.5 Interpret instrument readings and identify fault conditions',
    '3.1 Apply safe isolation procedures before fault diagnosis',
    '3.2 Gather information about the reported fault',
    '3.3 Conduct appropriate tests to locate faults',
    '3.4 Identify the cause of faults in different circuit types',
    '3.5 Diagnose faults in lighting circuits',
    '3.6 Diagnose faults in power circuits',
    '3.7 Diagnose faults in motor and control circuits',
    '4.1 Select appropriate materials and components for rectification',
    '4.2 Rectify faults using safe working procedures',
    '4.3 Verify repairs by appropriate testing',
    '4.4 Complete fault repair documentation'
  ]
);

-- Unit 304: Electrical Installation Planning and Overseeing
-- Supervisory and planning skills
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'cg-2365-l3-00000000-0000-0001',
  'Unit 304: Electrical Installation Planning and Overseeing',
  'Covers planning, supervising and coordinating electrical installation work, including resource management and quality control. Assessment: Portfolio evidence and assessment.',
  'Users',
  '#8b5cf6',
  3,
  ARRAY[
    'LO1: Understand how to plan electrical installation work',
    'LO2: Understand how to oversee and organize electrical installation work',
    'LO3: Understand quality control in electrical installations',
    'LO4: Understand liaison and communication requirements'
  ],
  ARRAY[
    '1.1 Interpret contract documents, specifications and drawings',
    '1.2 Plan work schedules and sequences of operations',
    '1.3 Identify resource requirements (materials, tools, labour)',
    '1.4 Assess and manage project risks',
    '2.1 Coordinate work with other trades and services',
    '2.2 Monitor work progress against programme',
    '2.3 Supervise safe working practices on site',
    '2.4 Apply company procedures and quality standards',
    '3.1 Explain quality management systems and procedures',
    '3.2 Conduct quality inspections of completed work',
    '3.3 Identify and address quality issues',
    '3.4 Maintain quality records and documentation',
    '4.1 Communicate effectively with clients and stakeholders',
    '4.2 Brief and instruct team members',
    '4.3 Liaise with site management and other contractors',
    '4.4 Report progress and issues to management'
  ]
);

-- Unit 305: Advanced Electrical Science
-- Building on Level 2 science knowledge
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'cg-2365-l3-00000000-0000-0001',
  'Unit 305: Advanced Electrical Science',
  'Builds on Level 2 electrical science with advanced AC theory, three-phase systems, and complex circuit analysis. Assessment: Online examination.',
  'Calculator',
  '#0ea5e9',
  3,
  ARRAY[
    'LO1: Understand advanced single-phase AC circuit theory',
    'LO2: Understand three-phase AC systems',
    'LO3: Understand power factor and its effects',
    'LO4: Understand principles of motor operation',
    'LO5: Understand electronic control systems'
  ],
  ARRAY[
    '1.1 Calculate impedance in complex RLC circuits',
    '1.2 Construct and interpret phasor diagrams',
    '1.3 Calculate power in AC circuits (apparent, true, reactive)',
    '1.4 Apply complex number notation to AC circuit analysis',
    '2.1 Describe three-phase generation and distribution',
    '2.2 Explain star and delta connection methods',
    '2.3 Calculate line and phase values in three-phase systems',
    '2.4 Calculate power in balanced three-phase loads',
    '3.1 Explain the causes and effects of poor power factor',
    '3.2 Calculate power factor correction requirements',
    '3.3 Describe methods of power factor improvement',
    '3.4 Explain the benefits of power factor correction',
    '4.1 Describe the operating principles of AC induction motors',
    '4.2 Describe motor starting methods and their applications',
    '4.3 Explain motor speed control methods',
    '4.4 Describe motor protection requirements',
    '5.1 Describe basic electronic control circuits',
    '5.2 Explain the operation of variable speed drives',
    '5.3 Describe programmable logic controllers (PLCs)',
    '5.4 Identify applications of electronic control systems'
  ]
);

-- Unit 306: Environmental Technology Systems
-- Green technologies and renewable energy
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'cg-2365-l3-00000000-0000-0001',
  'Unit 306: Environmental Technology Systems',
  'Covers environmental legislation, energy efficiency, renewable energy systems, and emerging technologies. Assessment: Portfolio evidence.',
  'Leaf',
  '#22c55e',
  2,
  ARRAY[
    'LO1: Understand environmental legislation and requirements',
    'LO2: Understand energy efficiency in electrical installations',
    'LO3: Understand renewable energy systems',
    'LO4: Understand emerging environmental technologies'
  ],
  ARRAY[
    '1.1 Describe environmental legislation affecting electrical work',
    '1.2 Explain waste management requirements and procedures',
    '1.3 Describe environmental impact assessment requirements',
    '1.4 Identify sustainable working practices',
    '2.1 Describe methods for improving energy efficiency',
    '2.2 Explain energy management systems and smart controls',
    '2.3 Describe efficient lighting systems and controls',
    '2.4 Identify energy-efficient equipment and technologies',
    '3.1 Describe solar photovoltaic (PV) systems and installation requirements',
    '3.2 Describe small-scale wind generation systems',
    '3.3 Explain electric vehicle charging infrastructure',
    '3.4 Describe energy storage systems (batteries)',
    '4.1 Describe smart home and building technologies',
    '4.2 Explain heat pump systems and their electrical requirements',
    '4.3 Describe building energy management systems (BEMS)',
    '4.4 Identify future developments in environmental technology'
  ]
);
