-- ST0152 Installation and Maintenance Electrician Apprenticeship Standard
-- Knowledge, Skills and Behaviours (KSBs)

-- First, ensure we have the ST0152 qualification
INSERT INTO qualifications (id, awarding_body, level, title, code, description)
VALUES (
  'st0152-apprenticeship-00000001',
  'IfATE',
  'Level 3',
  'Installation and Maintenance Electrician Apprenticeship Standard',
  'ST0152',
  'Level 3 apprenticeship standard for Installation and Maintenance Electricians. Duration: 42-48 months. End Point Assessment includes practical assessment, multiple choice test, and professional discussion. Routes available: Installation Electrician or Maintenance Electrician.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  code = EXCLUDED.code,
  description = EXCLUDED.description,
  updated_at = NOW();

-- Clear existing KSBs for this qualification
DELETE FROM apprenticeship_ksbs WHERE qualification_id = 'st0152-apprenticeship-00000001';

-- ===================
-- KNOWLEDGE (K1-K15)
-- ===================

INSERT INTO apprenticeship_ksbs (qualification_id, ksb_type, code, title, description, assessment_method, sort_order)
VALUES
-- K1
('st0152-apprenticeship-00000001', 'knowledge', 'K1',
 'Installation, maintenance and repair of electrical installations',
 'Understand the principles and processes for the installation, maintenance and repair of electrical systems, including switchboards, motors, cables, protective devices, heating, lighting, air conditioning systems, and renewable energy technologies.',
 ARRAY['portfolio', 'test'], 1),

-- K2
('st0152-apprenticeship-00000001', 'knowledge', 'K2',
 'Relevant industry health, safety and environmental requirements',
 'Understand health and safety legislation (HASAWA, EAW Regulations), risk assessment, safe systems of work, COSHH, manual handling, working at height, and environmental protection requirements.',
 ARRAY['portfolio', 'test'], 2),

-- K3
('st0152-apprenticeship-00000001', 'knowledge', 'K3',
 'Electrical science and technology',
 'Understand electrical theory including AC/DC principles, Ohms law, power calculations, magnetism, inductance, capacitance, three-phase systems, and power factor.',
 ARRAY['portfolio', 'test'], 3),

-- K4
('st0152-apprenticeship-00000001', 'knowledge', 'K4',
 'Principles, practices and legislation for termination and connection',
 'Understand methods for terminating and connecting conductors, cables and cords, including cable glands, termination of armoured cables, and requirements of BS 7671.',
 ARRAY['portfolio', 'test'], 4),

-- K5
('st0152-apprenticeship-00000001', 'knowledge', 'K5',
 'Preparation and installation of wiring systems',
 'Understand practices and procedures for installing wiring systems including conduit, trunking, cable tray, SWA cables, and associated enclosures.',
 ARRAY['portfolio', 'test'], 5),

-- K6
('st0152-apprenticeship-00000001', 'knowledge', 'K6',
 'Inspection, testing, commissioning and certification',
 'Understand procedures for initial verification and periodic inspection and testing, including test sequences, instrument use, and completion of certificates (EIC, MEIWC, EICR).',
 ARRAY['portfolio', 'test'], 6),

-- K7
('st0152-apprenticeship-00000001', 'knowledge', 'K7',
 'Electrical system design',
 'Understand the principles of electrical system design including load assessment, diversity, cable selection, circuit protection, and compliance with BS 7671.',
 ARRAY['portfolio', 'test'], 7),

-- K8
('st0152-apprenticeship-00000001', 'knowledge', 'K8',
 'Fault diagnosis and rectification',
 'Understand systematic fault diagnosis procedures, use of test instruments, interpretation of results, and methods for fault rectification.',
 ARRAY['portfolio', 'test'], 8),

-- K9
('st0152-apprenticeship-00000001', 'knowledge', 'K9',
 'Overseeing and organising the work environment',
 'Understand how to plan, organise and oversee electrical installation work, including resource management, coordination with other trades, and quality assurance.',
 ARRAY['portfolio', 'discussion'], 9),

-- K10
('st0152-apprenticeship-00000001', 'knowledge', 'K10',
 'Communication techniques and professional standards',
 'Understand effective communication methods with clients, colleagues and other stakeholders, and the importance of professional conduct and standards.',
 ARRAY['portfolio', 'discussion'], 10),

-- K11
('st0152-apprenticeship-00000001', 'knowledge', 'K11',
 'Environmental technology systems',
 'Understand environmental technology systems including solar PV, electric vehicle charging, heat pumps, and energy management systems.',
 ARRAY['portfolio', 'test'], 11),

-- K12
('st0152-apprenticeship-00000001', 'knowledge', 'K12',
 'Special locations and installations',
 'Understand requirements for special locations as defined in BS 7671 including bathrooms, swimming pools, construction sites, and agricultural premises.',
 ARRAY['portfolio', 'test'], 12),

-- K13
('st0152-apprenticeship-00000001', 'knowledge', 'K13',
 'Motor control and automation',
 'Understand motor control systems, starting methods, variable speed drives, and basic programmable logic controllers (PLCs).',
 ARRAY['portfolio', 'test'], 13),

-- K14
('st0152-apprenticeship-00000001', 'knowledge', 'K14',
 'Fire and security systems',
 'Understand fire alarm and security system installations, including wiring requirements and integration with electrical installations.',
 ARRAY['portfolio', 'test'], 14),

-- K15
('st0152-apprenticeship-00000001', 'knowledge', 'K15',
 'Relevant industry regulations and standards',
 'Understand the application of BS 7671, building regulations, and other relevant standards to electrical installations.',
 ARRAY['portfolio', 'test'], 15);

-- ===================
-- SKILLS (S1-S12)
-- ===================

INSERT INTO apprenticeship_ksbs (qualification_id, ksb_type, code, title, description, assessment_method, sort_order)
VALUES
-- S1
('st0152-apprenticeship-00000001', 'skill', 'S1',
 'Install electrical systems safely to specification',
 'Plan, prepare and install electrical wiring systems, equipment and components safely and to customer/client specifications, following BS 7671 requirements.',
 ARRAY['portfolio', 'observation'], 1),

-- S2
('st0152-apprenticeship-00000001', 'skill', 'S2',
 'Apply safe working practices',
 'Consistently apply safe working practices including risk assessment, safe isolation, correct PPE usage, and compliance with health and safety requirements.',
 ARRAY['portfolio', 'observation'], 2),

-- S3
('st0152-apprenticeship-00000001', 'skill', 'S3',
 'Terminate and connect conductors',
 'Terminate and connect conductors, cables and flexible cords in electrical installations using appropriate techniques and to required standards.',
 ARRAY['portfolio', 'observation'], 3),

-- S4
('st0152-apprenticeship-00000001', 'skill', 'S4',
 'Install wiring systems and enclosures',
 'Install a range of wiring systems and enclosures including conduit, trunking, cable tray, and associated accessories.',
 ARRAY['portfolio', 'observation'], 4),

-- S5
('st0152-apprenticeship-00000001', 'skill', 'S5',
 'Install electrical equipment and components',
 'Install and connect electrical equipment and components including consumer units, distribution boards, protective devices, and accessories.',
 ARRAY['portfolio', 'observation'], 5),

-- S6
('st0152-apprenticeship-00000001', 'skill', 'S6',
 'Inspect, test and commission installations',
 'Conduct inspection, testing and commissioning of electrical installations, complete required tests accurately, and produce appropriate certification.',
 ARRAY['portfolio', 'observation'], 6),

-- S7
('st0152-apprenticeship-00000001', 'skill', 'S7',
 'Diagnose and rectify faults',
 'Apply systematic fault diagnosis procedures to locate faults, and rectify faults safely and effectively.',
 ARRAY['portfolio', 'observation'], 7),

-- S8
('st0152-apprenticeship-00000001', 'skill', 'S8',
 'Maintain electrical systems',
 'Carry out planned and reactive maintenance on electrical systems and equipment, identifying issues and recommending remedial action.',
 ARRAY['portfolio', 'observation'], 8),

-- S9
('st0152-apprenticeship-00000001', 'skill', 'S9',
 'Use technical documentation',
 'Read and interpret technical documentation including drawings, specifications, and manufacturers'' instructions.',
 ARRAY['portfolio', 'discussion'], 9),

-- S10
('st0152-apprenticeship-00000001', 'skill', 'S10',
 'Communicate effectively',
 'Communicate effectively with clients, colleagues and other stakeholders using appropriate methods (verbal, written, digital).',
 ARRAY['portfolio', 'discussion'], 10),

-- S11
('st0152-apprenticeship-00000001', 'skill', 'S11',
 'Complete documentation and records',
 'Accurately complete required documentation including test certificates, job sheets, handover documents, and work records.',
 ARRAY['portfolio', 'discussion'], 11),

-- S12
('st0152-apprenticeship-00000001', 'skill', 'S12',
 'Work as part of a team',
 'Work effectively as part of a team, coordinating with colleagues and other trades to complete work efficiently and safely.',
 ARRAY['portfolio', 'discussion'], 12);

-- ===================
-- BEHAVIOURS (B1-B6)
-- ===================

INSERT INTO apprenticeship_ksbs (qualification_id, ksb_type, code, title, description, assessment_method, sort_order)
VALUES
-- B1
('st0152-apprenticeship-00000001', 'behaviour', 'B1',
 'Safety-first mindset',
 'Prioritise health, safety and welfare of self and others in all work activities. Proactively identify and address safety concerns.',
 ARRAY['portfolio', 'discussion'], 1),

-- B2
('st0152-apprenticeship-00000001', 'behaviour', 'B2',
 'Professional integrity',
 'Demonstrate honesty, reliability and integrity. Take responsibility for own work and actions. Maintain confidentiality where required.',
 ARRAY['portfolio', 'discussion'], 2),

-- B3
('st0152-apprenticeship-00000001', 'behaviour', 'B3',
 'Quality focus',
 'Committed to producing work of high quality, following standards and specifications. Take pride in workmanship.',
 ARRAY['portfolio', 'discussion'], 3),

-- B4
('st0152-apprenticeship-00000001', 'behaviour', 'B4',
 'Positive attitude',
 'Demonstrate enthusiasm, motivation and commitment to work. Approach challenges positively and show resilience.',
 ARRAY['portfolio', 'discussion'], 4),

-- B5
('st0152-apprenticeship-00000001', 'behaviour', 'B5',
 'Self-development',
 'Take responsibility for own learning and development. Seek feedback and opportunities to improve skills and knowledge.',
 ARRAY['portfolio', 'discussion'], 5),

-- B6
('st0152-apprenticeship-00000001', 'behaviour', 'B6',
 'Customer focus',
 'Demonstrate awareness of customer needs and expectations. Provide helpful, courteous service and maintain professional conduct.',
 ARRAY['portfolio', 'discussion'], 6);

-- Add qualification categories for ST0152 that align with the KSBs
DELETE FROM qualification_categories WHERE qualification_id = 'st0152-apprenticeship-00000001';

INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES
-- Core Technical
('st0152-apprenticeship-00000001',
 'Core Technical Knowledge',
 'Demonstrate understanding of electrical installation principles, science, and technology (K1-K8)',
 'Zap',
 '#3b82f6',
 6,
 ARRAY[
   'Understand electrical science and circuit theory',
   'Apply knowledge of wiring systems and enclosures',
   'Understand testing and commissioning procedures',
   'Know fault diagnosis principles'
 ],
 ARRAY[
   'Evidence of electrical calculations and theory application',
   'Evidence of understanding BS 7671 requirements',
   'Evidence of testing knowledge and procedures',
   'Evidence of fault diagnosis methodology'
 ]),

-- Practical Installation
('st0152-apprenticeship-00000001',
 'Practical Installation Skills',
 'Demonstrate competence in electrical installation work (S1-S5)',
 'Wrench',
 '#10b981',
 8,
 ARRAY[
   'Install wiring systems safely',
   'Make correct terminations and connections',
   'Install equipment and accessories',
   'Apply safe working practices throughout'
 ],
 ARRAY[
   'Evidence of wiring system installation (conduit, trunking, cables)',
   'Evidence of termination work in various scenarios',
   'Evidence of equipment installation to specification',
   'Evidence of consistent safe working practices'
 ]),

-- Testing and Fault Diagnosis
('st0152-apprenticeship-00000001',
 'Testing and Fault Diagnosis',
 'Demonstrate competence in inspection, testing, and fault diagnosis (S6-S8, K6, K8)',
 'Search',
 '#f59e0b',
 5,
 ARRAY[
   'Conduct initial verification tests',
   'Complete certification accurately',
   'Diagnose faults systematically',
   'Rectify faults safely'
 ],
 ARRAY[
   'Evidence of all required tests being conducted',
   'Evidence of completed EIC/MEIWC/EICR',
   'Evidence of fault diagnosis and rectification',
   'Evidence of maintenance activities'
 ]),

-- Professional Competence
('st0152-apprenticeship-00000001',
 'Professional Competence',
 'Demonstrate professional behaviours and communication skills (B1-B6, S9-S12)',
 'Users',
 '#8b5cf6',
 4,
 ARRAY[
   'Communicate effectively',
   'Complete documentation accurately',
   'Work as part of a team',
   'Demonstrate professional behaviours'
 ],
 ARRAY[
   'Evidence of effective communication with clients/colleagues',
   'Evidence of accurate documentation completion',
   'Evidence of teamwork and coordination',
   'Evidence of professional conduct and attitudes'
 ]),

-- Health and Safety
('st0152-apprenticeship-00000001',
 'Health, Safety and Environment',
 'Demonstrate consistent application of health, safety and environmental requirements (K2, S2, B1, K11)',
 'Shield',
 '#ef4444',
 4,
 ARRAY[
   'Apply health and safety legislation',
   'Conduct risk assessments',
   'Work safely at all times',
   'Consider environmental impact'
 ],
 ARRAY[
   'Evidence of understanding H&S legislation',
   'Evidence of risk assessment completion',
   'Evidence of safe isolation and PPE usage',
   'Evidence of environmental awareness and practices'
 ]);

-- Create a view for apprentice journey tracking
CREATE OR REPLACE VIEW apprentice_journey_progress AS
SELECT
  uqs.user_id,
  uqs.qualification_id,
  q.title as qualification_title,
  q.code as qualification_code,
  COUNT(DISTINCT qc.id) as total_categories,
  COUNT(DISTINCT CASE WHEN qcomp.compliance_percentage >= 100 THEN qc.id END) as completed_categories,
  COALESCE(ROUND(AVG(qcomp.compliance_percentage), 0), 0) as overall_progress,
  uqs.target_completion_date,
  CASE
    WHEN uqs.target_completion_date IS NOT NULL
    THEN uqs.target_completion_date - CURRENT_DATE
    ELSE NULL
  END as days_remaining
FROM public.user_qualification_selections uqs
JOIN public.qualifications q ON q.id = uqs.qualification_id
LEFT JOIN public.qualification_categories qc ON qc.qualification_id = q.id
LEFT JOIN public.qualification_compliance qcomp ON qcomp.category_id = qc.id AND qcomp.user_id = uqs.user_id
WHERE uqs.is_active = true
GROUP BY uqs.user_id, uqs.qualification_id, q.title, q.code, uqs.target_completion_date;
