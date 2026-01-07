-- EAL Level 3 NVQ Diploma in Installing Electrotechnical Systems and Equipment
-- Based on qualification code 603/3929/9

-- Insert or update the EAL NVQ qualification
INSERT INTO qualifications (id, awarding_body, level, title, code, description)
VALUES (
  'eal-nvq-l3-00000000-0000-0001',
  'EAL',
  'Level 3',
  'NVQ Diploma in Installing Electrotechnical Systems and Equipment',
  '603/3929/9',
  'Competency-based qualification for electrical installation professionals. Assessment through portfolio evidence demonstrating workplace competence. Includes the AM2 Electrotechnical Assessment.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  code = EXCLUDED.code,
  description = EXCLUDED.description,
  updated_at = NOW();

-- Delete existing categories
DELETE FROM qualification_categories
WHERE qualification_id = 'eal-nvq-l3-00000000-0000-0001';

-- Unit 301: Health and Safety in Building Services Engineering
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'eal-nvq-l3-00000000-0000-0001',
  'Unit 301: Health and Safety in Building Services Engineering',
  'Demonstrate understanding and application of health and safety requirements in the workplace. Evidence of safe working practices throughout all work activities.',
  'Shield',
  '#ef4444',
  4,
  ARRAY[
    'LO1: Understand health and safety legislation and its application',
    'LO2: Understand how to identify and control hazards and risks',
    'LO3: Know how to apply safe working practices in the workplace'
  ],
  ARRAY[
    '1.1 Demonstrate knowledge of the Health and Safety at Work Act 1974',
    '1.2 Apply requirements of the Electricity at Work Regulations 1989',
    '1.3 Follow COSHH requirements when handling hazardous substances',
    '1.4 Apply manual handling regulations to work activities',
    '2.1 Identify hazards in the work environment',
    '2.2 Assess risks and apply appropriate control measures',
    '2.3 Complete risk assessments for work activities',
    '2.4 Report hazards and incidents appropriately',
    '3.1 Use correct PPE for all work activities',
    '3.2 Apply safe isolation procedures',
    '3.3 Work safely at height using appropriate access equipment',
    '3.4 Apply fire prevention and emergency procedures'
  ]
);

-- Unit 302: Environmental Legislation and Working Practices
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'eal-nvq-l3-00000000-0000-0001',
  'Unit 302: Environmental Legislation and Working Practices',
  'Understand environmental legislation and demonstrate sustainable working practices. Evidence of waste management and environmental awareness.',
  'Leaf',
  '#22c55e',
  2,
  ARRAY[
    'LO1: Understand the environmental legislation, working practices and principles relevant to work activities',
    'LO2: Understand how work methods and procedures can reduce material wastage and impact on the environment',
    'LO3: Understand how and where environmental technology systems can be applied'
  ],
  ARRAY[
    '2.1 Describe relevant environmental legislation and regulations',
    '2.2 Explain the environmental impact of electrical work',
    '2.3 Apply waste management procedures (WEEE, hazardous waste)',
    '2.4 Demonstrate energy-efficient working practices',
    '2.5 Identify opportunities to reduce environmental impact',
    '2.6 Describe applications of environmental technology systems'
  ]
);

-- Unit 303: Overseeing and Organising the Work Environment
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'eal-nvq-l3-00000000-0000-0001',
  'Unit 303: Overseeing and Organising the Work Environment',
  'Plan, organise and oversee electrical installation work. Evidence of work planning, coordination with others, and quality management.',
  'Users',
  '#8b5cf6',
  3,
  ARRAY[
    'LO1: Understand practices and procedures for overseeing and organising the work environment',
    'LO2: Be able to plan and prepare work activities',
    'LO3: Be able to oversee and organise work activities',
    'LO4: Be able to ensure work quality and compliance'
  ],
  ARRAY[
    '3.1 Interpret contract documents and specifications',
    '3.2 Plan work schedules and resource requirements',
    '3.3 Coordinate work with other trades and services',
    '3.4 Monitor progress against planned programme',
    '3.5 Apply quality control procedures to work activities',
    '3.6 Ensure compliance with relevant standards and regulations',
    '3.7 Communicate effectively with clients and team members',
    '3.8 Maintain accurate work records and documentation'
  ]
);

-- Unit 304: Installing Wiring Systems and Enclosures
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'eal-nvq-l3-00000000-0000-0001',
  'Unit 304: Installing Wiring Systems and Enclosures',
  'Install a range of wiring systems and enclosures in different environments. Portfolio evidence of practical installation work.',
  'Cable',
  '#3b82f6',
  6,
  ARRAY[
    'LO1: Know the procedures for installing wiring systems and enclosures',
    'LO2: Be able to select materials, tools and equipment for installation',
    'LO3: Be able to install wiring systems and enclosures',
    'LO4: Be able to inspect completed installation work'
  ],
  ARRAY[
    '4.1 Interpret installation drawings and specifications',
    '4.2 Select appropriate wiring systems for different applications',
    '4.3 Install PVC insulated cables using correct methods',
    '4.4 Install steel wire armoured (SWA) cables',
    '4.5 Install mineral insulated (MI) cables',
    '4.6 Install PVC and steel conduit systems',
    '4.7 Install trunking and cable tray systems',
    '4.8 Install cables and enclosures in special locations',
    '4.9 Apply appropriate cable management techniques',
    '4.10 Conduct visual inspection of completed installations'
  ]
);

-- Unit 305: Terminating and Connecting Conductors
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'eal-nvq-l3-00000000-0000-0001',
  'Unit 305: Terminating and Connecting Conductors, Cables and Cords',
  'Terminate and connect a range of conductors, cables and flexible cords. Evidence of competent termination work.',
  'Link',
  '#f59e0b',
  5,
  ARRAY[
    'LO1: Know the procedures for terminating and connecting conductors',
    'LO2: Be able to terminate and connect cables and conductors',
    'LO3: Be able to verify completed terminations'
  ],
  ARRAY[
    '5.1 Identify termination methods for different cable types',
    '5.2 Prepare cables for termination using correct techniques',
    '5.3 Terminate cables in consumer units and distribution boards',
    '5.4 Terminate cables at accessories and equipment',
    '5.5 Install and terminate cable glands on armoured cables',
    '5.6 Make connections using appropriate methods',
    '5.7 Verify polarity and termination integrity',
    '5.8 Test completed terminations for compliance'
  ]
);

-- Unit 306: Installing Equipment and Components
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'eal-nvq-l3-00000000-0000-0001',
  'Unit 306: Installing Equipment and Components',
  'Install a range of electrical equipment and components. Evidence of installation in various environments and applications.',
  'Cpu',
  '#6366f1',
  5,
  ARRAY[
    'LO1: Know the procedures for installing electrical equipment',
    'LO2: Be able to install electrical equipment and components',
    'LO3: Be able to verify installed equipment'
  ],
  ARRAY[
    '6.1 Install distribution equipment (consumer units, distribution boards)',
    '6.2 Install circuit protective devices',
    '6.3 Install accessories (switches, sockets, fused spurs)',
    '6.4 Install luminaires and lighting controls',
    '6.5 Install motor control equipment',
    '6.6 Install fire and security alarm components',
    '6.7 Install data and communications equipment',
    '6.8 Verify correct installation of equipment'
  ]
);

-- Unit 307: Inspection, Testing and Commissioning
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'eal-nvq-l3-00000000-0000-0001',
  'Unit 307: Inspection, Testing and Commissioning',
  'Conduct initial verification and commissioning of electrical installations. Evidence of testing competence and certification.',
  'ClipboardCheck',
  '#10b981',
  5,
  ARRAY[
    'LO1: Understand the requirements for inspection and testing',
    'LO2: Be able to conduct visual inspection of installations',
    'LO3: Be able to conduct testing of electrical installations',
    'LO4: Be able to commission electrical installations',
    'LO5: Be able to complete certification and documentation'
  ],
  ARRAY[
    '7.1 Conduct systematic visual inspection',
    '7.2 Perform continuity tests (protective conductors, ring finals)',
    '7.3 Perform insulation resistance tests',
    '7.4 Perform polarity verification tests',
    '7.5 Measure earth fault loop impedance (Ze and Zs)',
    '7.6 Measure prospective fault current',
    '7.7 Test RCD operation (trip times and trip currents)',
    '7.8 Conduct functional testing of installed equipment',
    '7.9 Commission installations and verify operation',
    '7.10 Complete Electrical Installation Certificates',
    '7.11 Complete schedules of inspections and test results'
  ]
);

-- Unit 308: Diagnosing and Rectifying Faults
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'eal-nvq-l3-00000000-0000-0001',
  'Unit 308: Diagnosing and Rectifying Faults',
  'Apply systematic fault diagnosis procedures and rectify faults in electrical installations. Evidence of fault-finding competence.',
  'Search',
  '#dc2626',
  4,
  ARRAY[
    'LO1: Understand fault diagnosis principles and procedures',
    'LO2: Be able to diagnose faults in electrical installations',
    'LO3: Be able to rectify faults in electrical installations'
  ],
  ARRAY[
    '8.1 Apply safe isolation procedures before fault diagnosis',
    '8.2 Gather information about reported faults',
    '8.3 Apply systematic fault-finding methodology',
    '8.4 Use appropriate test instruments for fault location',
    '8.5 Identify the cause of electrical faults',
    '8.6 Diagnose faults in lighting, power and control circuits',
    '8.7 Select appropriate materials for fault rectification',
    '8.8 Rectify faults safely and to required standards',
    '8.9 Verify repairs through testing',
    '8.10 Complete fault repair documentation'
  ]
);

-- AM2 Electrotechnical Assessment
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'eal-nvq-l3-00000000-0000-0001',
  'AM2 Electrotechnical Assessment',
  'End assessment demonstrating occupational competence. Practical installation assessment at an approved centre covering installation, testing and fault diagnosis.',
  'Award',
  '#eab308',
  1,
  ARRAY[
    'LO1: Demonstrate competence in electrical installation',
    'LO2: Demonstrate competence in testing and commissioning',
    'LO3: Demonstrate competence in fault diagnosis'
  ],
  ARRAY[
    'AM2.1 Complete installation tasks within time limits',
    'AM2.2 Install wiring systems to specification',
    'AM2.3 Make terminations and connections correctly',
    'AM2.4 Conduct all required tests accurately',
    'AM2.5 Complete certification correctly',
    'AM2.6 Diagnose and rectify introduced faults',
    'AM2.7 Apply safe working practices throughout',
    'AM2.8 Achieve pass standard in all assessment areas'
  ]
);
