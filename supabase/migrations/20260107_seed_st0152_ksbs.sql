-- ST0152 Installation and Maintenance Electrician Apprenticeship Standard
-- Official KSBs from ST0152 v1.0 (Skills England)
-- Knowledge (K1-K8) and Behaviours (B1-B8) — skills are integrated into knowledge units

-- First, ensure we have the ST0152 qualification
INSERT INTO qualifications (id, awarding_body, level, title, code, description)
VALUES (
  'st0152-apprenticeship-00000001',
  'IfATE',
  'Level 3',
  'Installation and Maintenance Electrician Apprenticeship Standard',
  'ST0152',
  'Level 3 apprenticeship standard for Installation and Maintenance Electricians. Duration: 42-48 months. End Point Assessment includes AM2S synoptic test (16.5 hours over 2.5 days, 70% practical / 30% theory). Routes available: Installation Electrician or Maintenance Electrician. Skills are integrated into knowledge units — the 5357-23 qualification units deliver both knowledge and practical competence together.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  code = EXCLUDED.code,
  description = EXCLUDED.description,
  updated_at = NOW();

-- Clear existing KSBs for this qualification
DELETE FROM apprenticeship_ksbs WHERE qualification_id = 'st0152-apprenticeship-00000001';

-- ===================
-- KNOWLEDGE (K1-K8)
-- ===================

INSERT INTO apprenticeship_ksbs (qualification_id, ksb_type, code, title, description, assessment_method, route, sort_order)
VALUES
-- K1
('st0152-apprenticeship-00000001', 'knowledge', 'K1',
 'Termination and connection of conductors, cables and cords',
 'Understand and apply methods for terminating and connecting conductors, cables and cords in electrical installations. Delivered through Unit 107 (Understand Terminations and Connections of Conductors) and Unit 118 (Termination and Connection of Conductors).',
 ARRAY['portfolio', 'test', 'observation'], 'core', 1),

-- K2
('st0152-apprenticeship-00000001', 'knowledge', 'K2',
 'Preparation and installation of wiring systems and equipment',
 'Understand and apply practices and procedures for preparing and installing wiring systems and associated equipment. Delivered through Unit 104/004 (Understand Installation of Wiring Systems and Associated Equipment) and Unit 109 (Install Wiring Systems and Associated Equipment).',
 ARRAY['portfolio', 'test', 'observation'], 'core', 2),

-- K3
('st0152-apprenticeship-00000001', 'knowledge', 'K3',
 'Inspection, testing, commissioning and certification',
 'Understand and apply procedures for initial verification and periodic inspection and testing of electrical installations, including test sequences, instrument use, and completion of certificates (EIC, MEIWC, EICR). Delivered through Unit 312/212 (Principles of Inspection, Testing and Commissioning) and Unit 113 (Inspect, Test and Commission Electrical Systems).',
 ARRAY['portfolio', 'test', 'observation'], 'core', 3),

-- K4
('st0152-apprenticeship-00000001', 'knowledge', 'K4',
 'Diagnosing and correcting electrical faults',
 'Understand and apply systematic fault diagnosis procedures, use of test instruments, interpretation of results, and methods for fault rectification. Delivered through Unit 114/014 (Understand How to Diagnose and Correct Electrical Faults) and Unit 115 (Diagnose and Correct Electrical Faults).',
 ARRAY['portfolio', 'test', 'observation'], 'core', 4),

-- K5
('st0152-apprenticeship-00000001', 'knowledge', 'K5',
 'Electrical principles for design, building, installation and maintenance',
 'Understand electrical science and principles underpinning the design, building, installation and maintenance of electrical systems, including AC/DC theory, power calculations, magnetism, inductance, capacitance, and three-phase systems. Delivered through Unit 103/003 (Electrical Principles).',
 ARRAY['portfolio', 'test'], 'core', 5),

-- K6
('st0152-apprenticeship-00000001', 'knowledge', 'K6',
 'Oversee and organise the work environment',
 'Understand how to plan, organise and oversee the electrical work environment, including resource management, coordination with other trades, and quality assurance. Delivered through Unit 105/505 (Understand How to Oversee and Organise the Work Environment) and Unit 106 (Oversee and Organise the Work Environment).',
 ARRAY['portfolio', 'discussion'], 'core', 6),

-- K7 (Installation route only)
('st0152-apprenticeship-00000001', 'knowledge', 'K7',
 'Planning and selection for installation',
 'Understand planning and selection processes for electrical installation work, including load assessment, diversity, cable selection, circuit protection, and compliance with BS 7671. Delivered through Unit 105/505 and Unit 109. Installation route only.',
 ARRAY['portfolio', 'test', 'observation'], 'installation', 7),

-- K8 (Maintenance route only)
('st0152-apprenticeship-00000001', 'knowledge', 'K8',
 'Planning and preparing to maintain systems',
 'Understand planning and preparation for maintaining electrical systems, including scheduled and reactive maintenance procedures, system analysis, and documentation. Delivered through Unit 110 (Maintain Electrical Systems and Equipment). Maintenance route only.',
 ARRAY['portfolio', 'test', 'observation'], 'maintenance', 8);

-- ===================
-- BEHAVIOURS (B1-B8)
-- ===================

INSERT INTO apprenticeship_ksbs (qualification_id, ksb_type, code, title, description, assessment_method, route, sort_order)
VALUES
-- B1
('st0152-apprenticeship-00000001', 'behaviour', 'B1',
 'Work reliably and effectively without close supervision',
 'Demonstrate the ability to work independently, manage own time and tasks, and deliver work reliably and effectively without the need for close supervision.',
 ARRAY['portfolio', 'discussion'], 'core', 1),

-- B2
('st0152-apprenticeship-00000001', 'behaviour', 'B2',
 'Accept responsibility for own and others'' work',
 'Accept responsibility for the quality and safety of own work and the work of others under their supervision. Take ownership of outcomes.',
 ARRAY['portfolio', 'discussion'], 'core', 2),

-- B3
('st0152-apprenticeship-00000001', 'behaviour', 'B3',
 'Accept, allocate and supervise technical and other tasks',
 'Demonstrate the ability to accept tasks, allocate work to others appropriately, and supervise technical and other tasks to ensure standards are met.',
 ARRAY['portfolio', 'discussion'], 'core', 3),

-- B4
('st0152-apprenticeship-00000001', 'behaviour', 'B4',
 'Use oral, written and electronic communication methods',
 'Communicate effectively using oral, written and electronic methods with clients, colleagues and other stakeholders.',
 ARRAY['portfolio', 'discussion'], 'core', 4),

-- B5
('st0152-apprenticeship-00000001', 'behaviour', 'B5',
 'Work effectively with colleagues, trades, clients, suppliers and the public',
 'Work effectively and build productive relationships with colleagues, other trades, clients, suppliers and the public.',
 ARRAY['portfolio', 'discussion'], 'core', 5),

-- B6
('st0152-apprenticeship-00000001', 'behaviour', 'B6',
 'Contribute to sustainable development',
 'Demonstrate awareness of environmental impact and contribute to sustainable development through working practices and material choices.',
 ARRAY['portfolio', 'discussion'], 'core', 6),

-- B7
('st0152-apprenticeship-00000001', 'behaviour', 'B7',
 'Maintain and enhance competence in own area',
 'Take responsibility for own continuing professional development. Seek opportunities to maintain and enhance competence in own area of work.',
 ARRAY['portfolio', 'discussion'], 'core', 7),

-- B8
('st0152-apprenticeship-00000001', 'behaviour', 'B8',
 'Exercise responsibilities in an ethical manner',
 'Exercise responsibilities in an ethical manner, demonstrating honesty, integrity and respect for others in all professional activities.',
 ARRAY['portfolio', 'discussion'], 'core', 8);

-- ====================================
-- QUALIFICATION CATEGORIES (updated)
-- ====================================

DELETE FROM qualification_categories WHERE qualification_id = 'st0152-apprenticeship-00000001';

INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES
-- Core Technical Knowledge
('st0152-apprenticeship-00000001',
 'Core Technical Knowledge',
 'Demonstrate understanding of electrical installation principles, science, and technology (K1, K2, K5)',
 'Zap',
 '#3b82f6',
 6,
 ARRAY[
   'Understand electrical science and circuit theory (K5)',
   'Apply knowledge of wiring systems and enclosures (K2)',
   'Understand termination and connection methods (K1)',
   'Apply knowledge of BS 7671 requirements'
 ],
 ARRAY[
   'Evidence of electrical calculations and theory application',
   'Evidence of understanding BS 7671 requirements',
   'Evidence of wiring system knowledge',
   'Evidence of termination and connection competence'
 ]),

-- Practical Installation Skills (route-specific)
('st0152-apprenticeship-00000001',
 'Practical Installation Skills',
 'Demonstrate competence in electrical installation or maintenance work (K2, K7 installation / K8 maintenance)',
 'Wrench',
 '#10b981',
 8,
 ARRAY[
   'Install wiring systems safely (K2)',
   'Make correct terminations and connections (K1)',
   'Plan and select for installation (K7) or maintenance (K8)',
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
 'Demonstrate competence in inspection, testing, and fault diagnosis (K3, K4)',
 'Search',
 '#f59e0b',
 5,
 ARRAY[
   'Conduct initial verification tests (K3)',
   'Complete certification accurately (K3)',
   'Diagnose faults systematically (K4)',
   'Rectify faults safely (K4)'
 ],
 ARRAY[
   'Evidence of all required tests being conducted',
   'Evidence of completed EIC/MEIWC/EICR',
   'Evidence of fault diagnosis and rectification',
   'Evidence of test instrument competence'
 ]),

-- Professional Competence
('st0152-apprenticeship-00000001',
 'Professional Competence',
 'Demonstrate professional behaviours and work organisation (K6, B1-B8)',
 'Users',
 '#8b5cf6',
 4,
 ARRAY[
   'Oversee and organise work effectively (K6)',
   'Work reliably without close supervision (B1)',
   'Communicate effectively (B4)',
   'Demonstrate professional behaviours (B2, B3, B5, B7, B8)'
 ],
 ARRAY[
   'Evidence of effective communication with clients/colleagues',
   'Evidence of work organisation and planning',
   'Evidence of teamwork and coordination',
   'Evidence of professional conduct and attitudes'
 ]),

-- Health, Safety and Environment
('st0152-apprenticeship-00000001',
 'Health, Safety and Environment',
 'Demonstrate consistent application of health, safety and environmental requirements (B1, B6 + Unit 101/102 ACs)',
 'Shield',
 '#ef4444',
 4,
 ARRAY[
   'Apply health and safety legislation',
   'Conduct risk assessments',
   'Work safely at all times (B1)',
   'Contribute to sustainable development (B6)'
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
