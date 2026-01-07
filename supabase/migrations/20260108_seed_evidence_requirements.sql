-- Seed Evidence Requirements for All Qualification Units
-- Maps each assessment criterion to required evidence types

-- =====================================================
-- CITY & GUILDS 2365 LEVEL 2 EVIDENCE REQUIREMENTS
-- =====================================================

-- Unit 201: Health and Safety in Building Services Engineering
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '1.1', 'State the main duties of employers and employees under the Health and Safety at Work Act 1974',
  ARRAY['document', 'reflection'],
  1,
  'Provide a written explanation or annotated document showing your understanding of employer and employee duties.',
  'Completed risk assessment with annotations explaining HASAWA requirements',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '2.1', 'Describe safe isolation procedures for low voltage systems',
  ARRAY['photo', 'witness'],
  2,
  'Provide photographic evidence of you performing safe isolation with a witness statement confirming correct procedure.',
  'Photos of lock-off, proving dead, and supervisor observation record',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '3.1', 'Carry out risk assessments',
  ARRAY['document'],
  2,
  'Provide completed risk assessment forms for different work activities.',
  'Risk assessments for cable installation work and working at height',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '4.1', 'Describe first aid procedures for electric shock victims',
  ARRAY['certificate', 'reflection'],
  1,
  'Provide first aid training certificate or a detailed written account of electric shock first aid procedures.',
  'First aid at work certificate or written emergency procedure',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- Unit 202: Principles of Electrical Science
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '2.1', 'Apply Ohms law to calculate voltage, current, and resistance',
  ARRAY['calculation'],
  3,
  'Provide worked examples of Ohm''s law calculations from real or practice scenarios.',
  'Calculations showing V=IR for circuit analysis',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '2.2', 'Calculate values in series and parallel resistor circuits',
  ARRAY['calculation', 'drawing'],
  2,
  'Provide circuit diagrams with accompanying calculations for series and parallel circuits.',
  'Drawn circuit with calculated total resistance values',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '3.2', 'Calculate conductor resistance using ρL/A formula',
  ARRAY['calculation'],
  2,
  'Show conductor resistance calculations using resistivity formula.',
  'Cable resistance calculation with workings',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '5.1', 'Calculate RMS and peak values of AC waveforms',
  ARRAY['calculation'],
  2,
  'Provide AC waveform calculations converting between RMS and peak values.',
  'Vrms to Vpeak calculations with formula application',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- Unit 203: Electrical Installations Technology
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '1.1', 'Describe the characteristics of TN-C-S, TN-S, and TT earthing systems',
  ARRAY['drawing', 'reflection'],
  1,
  'Provide annotated diagrams of different earthing systems with explanations.',
  'Drawings showing TN-S, TN-C-S, TT systems with component labels',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '2.1', 'Identify types of cables (PVC, XLPE, SWA, MI, LSF) and their applications',
  ARRAY['photo', 'reflection'],
  3,
  'Photos of different cable types you have worked with, with written notes on their applications.',
  'Photos of SWA, Twin & Earth, and Flex cables with usage descriptions',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '4.1', 'Apply cable selection criteria (current-carrying capacity, voltage drop)',
  ARRAY['calculation', 'document'],
  2,
  'Cable selection calculations showing CCC, voltage drop, and correction factors.',
  'Cable sizing calculation using BS 7671 tables',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '5.1', 'Describe basic and fault protection measures',
  ARRAY['photo', 'document'],
  2,
  'Evidence of RCD installation or testing with documentation.',
  'Photo of RCD installation with schedule of test results',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- Unit 204: Installation of Wiring Systems and Enclosures
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '3.1', 'Install PVC/PVC cables using appropriate methods',
  ARRAY['photo', 'witness'],
  3,
  'Photos of PVC cable installations with witness confirmation of competence.',
  'Cable clips correctly spaced, neat runs, supervisor sign-off',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '3.2', 'Install steel wire armoured (SWA) cables',
  ARRAY['photo', 'witness'],
  2,
  'Photos showing SWA cable installation including gland terminations.',
  'SWA gland assembly, cable support, entry into enclosure',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '3.3', 'Install PVC conduit and accessories',
  ARRAY['photo'],
  2,
  'Photos of PVC conduit installation showing bends, boxes, and accessories.',
  'Conduit runs with inspection boxes and set bends',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '3.4', 'Install steel conduit and accessories',
  ARRAY['photo', 'witness'],
  2,
  'Photos of steel conduit with threaded joints and witness confirmation.',
  'Steel conduit bends, threading, and connection to accessories',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '3.5', 'Install cable trunking systems',
  ARRAY['photo'],
  2,
  'Photos showing trunking installation with internal and external angles.',
  'Trunking runs with accessories, lid fitted, cables dressed',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '4.1', 'Conduct visual inspection of completed installation',
  ARRAY['document', 'photo'],
  1,
  'Completed inspection checklist with supporting photos.',
  'Schedule of inspection with all items checked and photos of key areas',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- =====================================================
-- CITY & GUILDS 2365 LEVEL 3 EVIDENCE REQUIREMENTS
-- =====================================================

-- Unit 302: Inspection, Testing and Commissioning
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '3.1', 'Conduct continuity tests on protective conductors',
  ARRAY['test_result', 'photo'],
  3,
  'Test results showing R1+R2 values with photos of testing in progress.',
  'Schedule of test results with instrument and test lead photos',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '3.3', 'Conduct insulation resistance tests',
  ARRAY['test_result'],
  3,
  'IR test results for multiple circuits showing values meet requirements.',
  'Test schedule with IR readings per circuit (>1MΩ minimum)',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '3.5', 'Conduct earth fault loop impedance tests (Ze and Zs)',
  ARRAY['test_result'],
  3,
  'Ze and Zs readings with comparison to maximum permitted values.',
  'Earth loop impedance schedule with Zs values vs BS 7671 limits',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '3.7', 'Conduct RCD tests (operating time and current)',
  ARRAY['test_result'],
  2,
  'RCD trip time results at 1×, 5×, and ramp test values.',
  'RCD test schedule showing trip times within limits',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '5.1', 'Complete Electrical Installation Certificates (EIC)',
  ARRAY['certificate'],
  2,
  'Fully completed EIC forms for installations you have tested.',
  'Signed EIC with all sections completed including schedule of circuits',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '5.3', 'Complete Electrical Installation Condition Reports (EICR)',
  ARRAY['certificate'],
  1,
  'Completed EICR with observations and classification codes.',
  'EICR showing condition with C1, C2, C3, FI classifications',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- Unit 303: Fault Diagnosis and Rectification
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '3.1', 'Apply safe isolation procedures before fault diagnosis',
  ARRAY['photo', 'witness'],
  2,
  'Photo evidence of safe isolation with witness confirmation.',
  'Lock-off photos and proving dead before fault finding',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '3.4', 'Identify the cause of faults in different circuit types',
  ARRAY['test_result', 'reflection'],
  3,
  'Test results showing fault identification with written explanation of diagnosis process.',
  'Meter readings identifying fault, written fault analysis',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '4.2', 'Rectify faults using safe working procedures',
  ARRAY['photo', 'witness'],
  2,
  'Before and after photos of fault rectification with supervisor sign-off.',
  'Photos showing faulty component, repair work, completed fix',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '4.4', 'Complete fault repair documentation',
  ARRAY['document'],
  2,
  'Completed fault report forms documenting the issue and resolution.',
  'Job sheet or fault report with cause, action taken, result',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- =====================================================
-- EAL NVQ LEVEL 3 EVIDENCE REQUIREMENTS
-- =====================================================

-- Unit 304: Installing Wiring Systems and Enclosures
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '4.3', 'Install PVC insulated cables using correct methods',
  ARRAY['photo', 'witness', 'work_log'],
  3,
  'Portfolio of installation photos with witness observations and work log entries.',
  'Multiple installation examples from different sites',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '4.4', 'Install steel wire armoured (SWA) cables',
  ARRAY['photo', 'witness'],
  2,
  'Photos of SWA installations showing proper gland techniques.',
  'Complete SWA installation with indoor and outdoor glands',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

-- Unit 307: Inspection, Testing and Commissioning
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '7.2', 'Perform continuity tests (protective conductors, ring finals)',
  ARRAY['test_result', 'photo'],
  3,
  'Full test results for continuity including ring final circuit testing.',
  'R1+R2 schedules and ring final three-way test results',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 307:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '7.10', 'Complete Electrical Installation Certificates',
  ARRAY['certificate'],
  3,
  'Multiple completed EICs demonstrating range of installation types.',
  'EICs for domestic, commercial, and industrial installations',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 307:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

-- Unit 308: Diagnosing and Rectifying Faults
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '8.3', 'Apply systematic fault-finding methodology',
  ARRAY['reflection', 'test_result'],
  3,
  'Written account of fault diagnosis process with supporting test evidence.',
  'Six-step methodology applied to real fault scenarios',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 308:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  '8.8', 'Rectify faults safely and to required standards',
  ARRAY['photo', 'witness', 'document'],
  3,
  'Evidence of fault rectification with job completion records.',
  'Before/after photos, witness statement, completed job sheet',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'Unit 308:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

-- AM2 Assessment Evidence
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, example_description, is_mandatory)
SELECT qc.id,
  'AM2.1', 'Complete installation tasks within time limits',
  ARRAY['certificate', 'witness'],
  1,
  'AM2 result certificate or assessor statement.',
  'AM2 pass certificate from approved assessment centre',
  true
FROM qualification_categories qc
WHERE qc.name LIKE 'AM2%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';
