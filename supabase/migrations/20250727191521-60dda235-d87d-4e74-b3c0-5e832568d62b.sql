-- Create portfolio categories for MOET (Maintenance Operability Electrical Testing) Level 3 qualification
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
(
  '4e39bf6a-6fec-4f22-b35f-fcc85694ab65',
  'Electrical Testing and Inspection',
  'Competencies in carrying out electrical testing procedures, using appropriate test instruments, and interpreting results in accordance with BS7671',
  'zap',
  'hsl(45, 100%, 50%)',
  3,
  ARRAY[
    'Carry out safe isolation procedures before testing',
    'Select and use appropriate test instruments for different types of electrical testing',
    'Perform continuity, insulation resistance, and earth fault loop impedance tests',
    'Interpret test results and identify non-conformities',
    'Document test results accurately on appropriate certificates'
  ],
  ARRAY[
    'Demonstrates safe isolation procedures following approved codes of practice',
    'Correctly selects test instruments appropriate to the type of test being carried out',
    'Performs tests in the correct sequence according to BS7671 requirements',
    'Accurately records test results and identifies values outside acceptable limits',
    'Completes test certificates with all required information and signatures'
  ]
),
(
  '4e39bf6a-6fec-4f22-b35f-fcc85694ab65',
  'Periodic Inspection and Testing',
  'Skills in conducting periodic inspections of electrical installations and identifying defects or deterioration',
  'search',
  'hsl(210, 100%, 50%)',
  3,
  ARRAY[
    'Plan and prepare for periodic inspection and testing activities',
    'Conduct visual inspections to identify obvious defects',
    'Perform dead and live testing as appropriate',
    'Classify defects according to their severity',
    'Issue appropriate certificates and remedial action recommendations'
  ],
  ARRAY[
    'Demonstrates systematic approach to planning inspection and testing activities',
    'Identifies visual defects and potential safety hazards during inspection',
    'Applies appropriate testing procedures for periodic inspection',
    'Correctly classifies defects as C1, C2, C3, or FI in accordance with BS7671',
    'Issues clear recommendations for remedial action with appropriate timescales'
  ]
),
(
  '4e39bf6a-6fec-4f22-b35f-fcc85694ab65',
  'Fault Finding and Diagnosis',
  'Advanced skills in systematic fault finding, diagnosis of electrical problems, and implementing effective solutions',
  'tool',
  'hsl(15, 100%, 50%)',
  3,
  ARRAY[
    'Apply systematic fault finding techniques to identify electrical problems',
    'Use diagnostic test equipment to locate faults in electrical circuits',
    'Analyse circuit behaviour and identify causes of malfunction',
    'Implement appropriate solutions to rectify identified faults',
    'Test repaired systems to confirm proper operation'
  ],
  ARRAY[
    'Demonstrates logical approach to fault finding using appropriate techniques',
    'Correctly uses diagnostic equipment to isolate faults in electrical systems',
    'Accurately identifies root causes of electrical problems',
    'Implements safe and effective solutions to rectify faults',
    'Confirms successful repair through appropriate testing and verification'
  ]
),
(
  '4e39bf6a-6fec-4f22-b35f-fcc85694ab65',
  'Maintenance Procedures',
  'Competencies in planned preventive maintenance of electrical systems and equipment to ensure continued safe operation',
  'wrench',
  'hsl(120, 100%, 40%)',
  2,
  ARRAY[
    'Develop and implement planned maintenance schedules',
    'Perform routine maintenance tasks on electrical equipment',
    'Identify signs of wear, deterioration, or potential failure',
    'Replace components and consumables as required',
    'Maintain accurate records of maintenance activities'
  ],
  ARRAY[
    'Creates appropriate maintenance schedules based on manufacturer recommendations and operating conditions',
    'Performs maintenance tasks safely and in accordance with established procedures',
    'Recognises early indicators of equipment deterioration or impending failure',
    'Carries out component replacement using appropriate techniques and materials',
    'Maintains comprehensive records of all maintenance activities and findings'
  ]
),
(
  '4e39bf6a-6fec-4f22-b35f-fcc85694ab65',
  'Health and Safety in Electrical Work',
  'Application of health and safety principles specific to electrical testing and maintenance work environments',
  'shield',
  'hsl(0, 100%, 50%)',
  2,
  ARRAY[
    'Apply relevant health and safety legislation to electrical work activities',
    'Conduct risk assessments for electrical testing and maintenance tasks',
    'Use appropriate personal protective equipment (PPE)',
    'Implement safe systems of work including permit to work procedures',
    'Respond appropriately to electrical emergencies and incidents'
  ],
  ARRAY[
    'Demonstrates thorough knowledge of relevant health and safety legislation',
    'Produces comprehensive risk assessments identifying electrical hazards and control measures',
    'Selects and uses appropriate PPE for different electrical work activities',
    'Follows established safe systems of work and permit procedures',
    'Takes appropriate action in response to electrical emergencies following established procedures'
  ]
),
(
  '4e39bf6a-6fec-4f22-b35f-fcc85694ab65',
  'Documentation and Compliance',
  'Skills in completing accurate documentation and ensuring compliance with relevant standards and regulations',
  'file-text',
  'hsl(270, 100%, 50%)',
  2,
  ARRAY[
    'Complete electrical certificates and documentation accurately',
    'Understand and apply relevant British Standards and regulations',
    'Maintain traceability records for testing and maintenance activities',
    'Ensure work complies with statutory and regulatory requirements',
    'Communicate findings and recommendations clearly to clients'
  ],
  ARRAY[
    'Completes all required certificates and documentation with accuracy and attention to detail',
    'Demonstrates current knowledge of relevant standards including BS7671 and building regulations',
    'Maintains comprehensive records enabling full traceability of work activities',
    'Ensures all work meets current statutory and regulatory requirements',
    'Provides clear, professional communication of findings and recommendations to clients'
  ]
);