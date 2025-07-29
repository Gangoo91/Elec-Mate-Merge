-- Delete existing categories for Building Services Engineering Installer Apprenticeship to replace with detailed requirements
DELETE FROM qualification_categories 
WHERE qualification_id = '206e1549-4f4d-49d4-b1d9-a09e83b33825';

-- Insert the 9 detailed evidence categories as per official apprenticeship standards
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
-- 1. Job Evidence (5-10 real installations)
(
  '206e1549-4f4d-49d4-b1d9-a09e83b33825',
  'Job Evidence',
  '5-10 real installations covering first fix, cable routing, second fix, consumer units, and commissioning',
  'Wrench',
  '#10b981',
  8,
  ARRAY[
    'Complete first fix and containment installations',
    'Demonstrate cable routing techniques and methods',
    'Carry out second fix and termination work',
    'Install and configure consumer units safely',
    'Perform final testing and commissioning procedures'
  ],
  ARRAY[
    'Evidence of first fix and containment work',
    'Documentation of cable routing methods',
    'Completion of second fix and terminations',
    'Consumer unit installation records',
    'Final testing and commissioning certificates',
    'Breadth across domestic and commercial settings',
    'Progression from simple to complex installations',
    'Variation in job types and environments'
  ]
),
-- 2. Health & Safety Evidence
(
  '206e1549-4f4d-49d4-b1d9-a09e83b33825',
  'Health & Safety Evidence',
  'Site inductions, risk assessments, method statements, toolbox talks, and safe isolation procedures',
  'Shield',
  '#ef4444',
  5,
  ARRAY[
    'Complete site inductions and safety briefings',
    'Conduct and document risk assessments',
    'Prepare and follow method statements',
    'Participate in toolbox talks and safety meetings',
    'Apply safe isolation procedures correctly'
  ],
  ARRAY[
    'Site induction records and certificates',
    'Completed risk assessment forms',
    'Method statements for electrical work',
    'Toolbox talk attendance logs',
    'Safe isolation procedure documentation',
    'Evidence of hazard identification',
    'Emergency procedure knowledge'
  ]
),
-- 3. Test & Inspection Work
(
  '206e1549-4f4d-49d4-b1d9-a09e83b33825',
  'Test & Inspection Work',
  'Initial verification tests, certificates, schedules of results, and test instrument usage evidence',
  'CheckCircle',
  '#8b5cf6',
  5,
  ARRAY[
    'Carry out initial verification testing',
    'Complete Minor Works certificates where applicable',
    'Produce schedules of test results',
    'Demonstrate competent use of test instruments',
    'Interpret and record test measurements accurately'
  ],
  ARRAY[
    'Initial verification test sheets completed',
    'Minor Works certificates (where applicable)',
    'Schedule of test results documentation',
    'Evidence of correct test instrument usage',
    'Accurate recording of test measurements',
    'Understanding of test sequences and procedures',
    'Compliance with BS 7671 testing requirements'
  ]
),
-- 4. Drawings & Planning
(
  '206e1549-4f4d-49d4-b1d9-a09e83b33825',
  'Drawings & Planning',
  'Cable calculations, site drawings, markups, installation schematics, and sequence photography',
  'FileText',
  '#0ea5e9',
  4,
  ARRAY[
    'Perform cable calculations for installations',
    'Interpret and create site drawings and markups',
    'Document installation sequences with schematics',
    'Plan electrical installations effectively'
  ],
  ARRAY[
    'Cable calculation worksheets and results',
    'Site drawings and markups completed',
    'Installation schematics or sequence photos',
    'Evidence of planning and preparation work',
    'Understanding of electrical design principles',
    'Ability to read and interpret technical drawings'
  ]
),
-- 5. Witness Statements
(
  '206e1549-4f4d-49d4-b1d9-a09e83b33825',
  'Witness Statements',
  'Supervisor confirmations of work completed and standards achieved during installations',
  'Users',
  '#f59e0b',
  5,
  ARRAY[
    'Obtain supervisor verification of completed work',
    'Demonstrate work meets required standards',
    'Show evidence of competent performance',
    'Document supervisor feedback and assessment'
  ],
  ARRAY[
    'Signed witness statements from supervisors',
    'Confirmation of work completion standards',
    'Evidence of competency demonstration',
    'Supervisor assessment of performance',
    'Verification of health and safety compliance',
    'Documentation of skill development progression'
  ]
),
-- 6. Reflective Accounts
(
  '206e1549-4f4d-49d4-b1d9-a09e83b33825',
  'Reflective Accounts',
  'Personal reflection on work completed, methods used, successes, and areas for improvement',
  'Brain',
  '#6366f1',
  4,
  ARRAY[
    'Reflect on work activities and methods used',
    'Analyse what went well in installations',
    'Identify areas for improvement and development',
    'Demonstrate learning from experience'
  ],
  ARRAY[
    'Description of what work was completed',
    'Explanation of why methods were chosen',
    'Analysis of what went well',
    'Identification of improvement opportunities',
    'Evidence of learning from experience',
    'Self-assessment of performance and development'
  ]
),
-- 7. Communication & Teamwork Evidence
(
  '206e1549-4f4d-49d4-b1d9-a09e83b33825',
  'Communication & Teamwork Evidence',
  'Working with others on-site, responding to instructions, and collaborative problem-solving',
  'MessageSquare',
  '#059669',
  3,
  ARRAY[
    'Work effectively with colleagues and teams',
    'Respond appropriately to instructions and guidance',
    'Contribute to collaborative problem-solving',
    'Communicate effectively in workplace situations'
  ],
  ARRAY[
    'Evidence of working with others on-site',
    'Documentation of responding to instructions',
    'Examples of collaborative problem-solving',
    'Communication with customers and colleagues',
    'Teamwork in challenging situations',
    'Professional conduct and behaviour'
  ]
),
-- 8. CPD / Progress Log
(
  '206e1549-4f4d-49d4-b1d9-a09e83b33825',
  'CPD / Progress Log',
  'Record of reviews, training completed, new learning, and mentoring received throughout apprenticeship',
  'GraduationCap',
  '#dc2626',
  3,
  ARRAY[
    'Maintain record of progress reviews',
    'Document training courses and development',
    'Record new tools and procedures learned',
    'Evidence mentoring and coaching received'
  ],
  ARRAY[
    'Progress review meeting records',
    'Training course certificates and completion',
    'Documentation of new tools/procedures learned',
    'Evidence of mentoring or coaching received',
    'Continuous professional development activities',
    'Self-directed learning initiatives'
  ]
),
-- 9. Evidence Mapping Document
(
  '206e1549-4f4d-49d4-b1d9-a09e83b33825',
  'Evidence Mapping Document',
  'All evidence linked directly to Apprenticeship Standard KSBs (Knowledge, Skills, Behaviours) with clear numbering',
  'Map',
  '#7c3aed',
  1,
  ARRAY[
    'Map all evidence to specific KSBs in the standard',
    'Ensure clear numbering and organisation',
    'Demonstrate coverage of all required competencies',
    'Provide cross-references between evidence and standards'
  ],
  ARRAY[
    'Complete mapping of evidence to KSBs',
    'Clear numbering system for all evidence',
    'Cross-reference table showing coverage',
    'Organisation suitable for assessment',
    'Demonstration of breadth and progression',
    'Ready for training provider sign-off'
  ]
);