-- =============================================================================
-- COMPREHENSIVE EVIDENCE REQUIREMENTS FOR ALL QUALIFICATION UNITS
-- Maps EVERY assessment criterion to required evidence types
-- =============================================================================

-- Clear existing requirements to rebuild completely
DELETE FROM public.unit_evidence_requirements;

-- =============================================================================
-- CITY & GUILDS 2365 LEVEL 2
-- =============================================================================

-- -----------------------------------------------------------------------------
-- UNIT 201: Health and Safety in Building Services Engineering (16 criteria)
-- -----------------------------------------------------------------------------

-- LO1: Health and Safety Legislation (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.1', 'State the main duties of employers and employees under the Health and Safety at Work Act 1974',
  ARRAY['reflection', 'document'], 1, 'Written explanation of HASAWA duties or annotated workplace H&S policy', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.2', 'Identify the statutory requirements relating to the Electricity at Work Regulations 1989',
  ARRAY['reflection', 'document'], 1, 'Written account of EAW Regulations application or toolbox talk notes', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.3', 'State the requirements for PPE provision under relevant regulations',
  ARRAY['photo', 'reflection'], 1, 'Photos of correct PPE usage with written explanation of selection', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.4', 'Describe the requirements for accident reporting under RIDDOR',
  ARRAY['document', 'reflection'], 1, 'Example accident report or written account of RIDDOR requirements', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO2: Hazards and Risks (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.1', 'Identify hazards associated with electrical work environments',
  ARRAY['photo', 'document'], 2, 'Photos of workplace hazards identified with risk assessment form', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.2', 'Describe methods for identifying and controlling risks in the workplace',
  ARRAY['document', 'reflection'], 1, 'Completed risk assessment with control measures identified', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.3', 'Explain the purpose and content of risk assessments',
  ARRAY['document'], 2, 'Two different completed risk assessments for electrical work activities', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.4', 'Describe methods for reducing risk from manual handling activities',
  ARRAY['photo', 'reflection'], 1, 'Photo of correct manual handling technique with written explanation', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO3: Safe Working Practices (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.1', 'Describe safe isolation procedures for low voltage systems',
  ARRAY['photo', 'witness'], 2, 'Photos of isolation procedure steps with supervisor witness statement', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.2', 'Explain the requirements for working at height safely',
  ARRAY['photo', 'document'], 1, 'Photo of safe access equipment use with work at height risk assessment', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.3', 'State the requirements for using access equipment',
  ARRAY['photo', 'certificate'], 1, 'Photo of ladder/scaffold use or PASMA/IPAF certificate', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.4', 'Describe permit to work systems and their application',
  ARRAY['document'], 1, 'Example completed permit to work form', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO4: Fire and Emergency Procedures (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.1', 'Describe fire prevention and emergency evacuation procedures',
  ARRAY['document', 'reflection'], 1, 'Site emergency procedure or written account of fire drill participation', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.2', 'State the different classes of fire and appropriate extinguishing methods',
  ARRAY['reflection', 'certificate'], 1, 'Written account of fire classes or fire safety training certificate', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.3', 'Explain first aid procedures for electric shock victims',
  ARRAY['certificate', 'reflection'], 1, 'First aid certificate or detailed written procedure for electric shock', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.4', 'Identify emergency contact procedures and reporting requirements',
  ARRAY['document', 'photo'], 1, 'Photo of emergency contact information or site induction document', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 201:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- -----------------------------------------------------------------------------
-- UNIT 202: Principles of Electrical Science (19 criteria)
-- -----------------------------------------------------------------------------

-- LO1: Units of Measurement (3 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.1', 'Identify SI units and derived units for electrical quantities',
  ARRAY['calculation', 'reflection'], 1, 'Calculations showing correct use of SI units with written explanations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.2', 'Apply standard prefixes (milli, micro, kilo, mega) in calculations',
  ARRAY['calculation'], 2, 'Worked examples converting between prefixes (e.g., mA to A, kV to V)', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.3', 'Calculate electrical quantities using appropriate formulas',
  ARRAY['calculation'], 3, 'Range of calculations: V, I, R, P using correct formulas', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO2: Circuit Theory and Ohm's Law (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.1', 'Apply Ohms law to calculate voltage, current, and resistance',
  ARRAY['calculation'], 3, 'V=IR calculations showing all three transpositions', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.2', 'Calculate values in series and parallel resistor circuits',
  ARRAY['calculation', 'drawing'], 2, 'Circuit diagrams with series and parallel resistance calculations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.3', 'Apply Kirchhoffs laws to circuit analysis',
  ARRAY['calculation', 'drawing'], 2, 'Circuit analysis showing KVL and KCL application', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.4', 'Calculate power in DC circuits using P=IV, P=I²R, P=V²/R',
  ARRAY['calculation'], 3, 'Power calculations using all three formulas', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO3: Resistance and Temperature (3 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.1', 'Explain the relationship between resistance and conductor properties',
  ARRAY['reflection', 'calculation'], 1, 'Written explanation with examples of how length, CSA, material affect R', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.2', 'Calculate conductor resistance using ρL/A formula',
  ARRAY['calculation'], 2, 'Worked examples calculating cable resistance', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.3', 'Describe the effect of temperature on conductor resistance',
  ARRAY['reflection'], 1, 'Written explanation of temperature coefficient and its effects', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO4: Magnetism (3 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.1', 'Describe magnetic flux, flux density, and magnetic field strength',
  ARRAY['reflection', 'drawing'], 1, 'Diagrams and written explanation of magnetic quantities', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.2', 'Explain the principle of electromagnetic induction',
  ARRAY['reflection', 'drawing'], 1, 'Diagrams showing electromagnetic induction with written explanation', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.3', 'Describe the construction and operation of transformers',
  ARRAY['reflection', 'drawing', 'calculation'], 1, 'Transformer diagram with explanation and turns ratio calculation', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO5: AC Circuit Theory (3 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.1', 'Calculate RMS and peak values of AC waveforms',
  ARRAY['calculation'], 2, 'Conversions between RMS and peak (Vpeak = √2 × Vrms)', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.2', 'Explain the concept of phase angle and power factor',
  ARRAY['reflection', 'drawing'], 1, 'Phasor diagrams with explanation of power factor', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.3', 'Calculate impedance in AC circuits with resistive and reactive components',
  ARRAY['calculation', 'drawing'], 2, 'Impedance calculations for RL and RC circuits', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO6: Electrical Components (3 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '6.1', 'Describe the operation of capacitors and inductors in circuits',
  ARRAY['reflection', 'drawing'], 1, 'Written explanation with circuit symbols and charging curves', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '6.2', 'Explain the characteristics of semiconductor devices',
  ARRAY['reflection', 'drawing'], 1, 'Diode and transistor explanations with symbols', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '6.3', 'Describe the operation of protection devices (fuses, MCBs, RCDs)',
  ARRAY['reflection', 'photo'], 1, 'Photos of protection devices with written operating principles', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 202:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- -----------------------------------------------------------------------------
-- UNIT 203: Electrical Installations Technology (23 criteria)
-- -----------------------------------------------------------------------------

-- LO1: Supply Systems and Earthing (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.1', 'Describe the characteristics of TN-C-S, TN-S, and TT earthing systems',
  ARRAY['drawing', 'reflection'], 1, 'Diagrams of all three earthing systems with explanations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.2', 'Identify the components of earthing arrangements',
  ARRAY['photo', 'drawing'], 2, 'Photos/diagrams of MET, bonding conductors, earth electrodes', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.3', 'Explain the function of protective earthing and bonding',
  ARRAY['reflection', 'photo'], 1, 'Written explanation with photo of bonding installation', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.4', 'Describe single and three-phase supply systems',
  ARRAY['drawing', 'reflection'], 1, 'Diagrams showing single and three-phase supplies with explanations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO2: Wiring Systems (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.1', 'Identify types of cables (PVC, XLPE, SWA, MI, LSF) and their applications',
  ARRAY['photo', 'reflection'], 3, 'Photos of different cable types with written applications', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.2', 'Describe containment systems (trunking, conduit, cable tray)',
  ARRAY['photo', 'reflection'], 2, 'Photos of containment systems with selection criteria', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.3', 'State the factors affecting cable installation methods',
  ARRAY['reflection', 'document'], 1, 'Written account of environmental and mechanical factors', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.4', 'Identify appropriate wiring systems for different environments',
  ARRAY['reflection', 'photo'], 2, 'Examples of wiring systems for domestic, commercial, industrial', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO3: Electrical Equipment (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.1', 'Describe types of circuit protective devices and their characteristics',
  ARRAY['photo', 'reflection'], 2, 'Photos of MCBs, RCBOs, fuses with characteristics explained', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.2', 'Identify types of switches, sockets, and accessories',
  ARRAY['photo'], 2, 'Photos showing range of accessories installed', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.3', 'Describe types of luminaires and their applications',
  ARRAY['photo', 'reflection'], 2, 'Photos of different luminaire types with applications', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.4', 'Identify special location equipment requirements',
  ARRAY['reflection', 'photo'], 1, 'Written account of IP ratings and zone requirements', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO4: Cable and Device Selection (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.1', 'Apply cable selection criteria (current-carrying capacity, voltage drop)',
  ARRAY['calculation', 'document'], 2, 'Cable sizing calculations using BS 7671 tables', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.2', 'Calculate circuit protective device ratings',
  ARRAY['calculation'], 2, 'MCB/fuse rating calculations for different circuits', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.3', 'Apply correction factors for cable grouping and ambient temperature',
  ARRAY['calculation'], 2, 'Calculations applying Cg, Ca, Ci factors', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.4', 'Calculate earth fault loop impedance requirements',
  ARRAY['calculation'], 2, 'Zs calculations and comparison with maximum values', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO5: Protection Against Electric Shock (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.1', 'Describe basic and fault protection measures',
  ARRAY['reflection', 'drawing'], 1, 'Written explanation with diagrams of protection measures', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.2', 'Explain automatic disconnection of supply requirements',
  ARRAY['reflection', 'calculation'], 1, 'ADS explanation with disconnection time requirements', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.3', 'Describe supplementary and additional protection measures',
  ARRAY['reflection', 'photo'], 1, 'Written account of supplementary bonding and RCD protection', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.4', 'Identify requirements for RCD protection',
  ARRAY['photo', 'reflection'], 1, 'Photos of RCD installations with selection criteria', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO6: Lighting Systems (3 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '6.1', 'Describe lighting design principles and lux levels',
  ARRAY['reflection', 'document'], 1, 'Written account of lighting requirements per room type', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '6.2', 'Identify types of lamps and their characteristics',
  ARRAY['photo', 'reflection'], 2, 'Photos of lamp types (LED, fluorescent, etc.) with characteristics', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '6.3', 'Describe emergency lighting requirements',
  ARRAY['photo', 'reflection'], 1, 'Photo of emergency lighting with BS 5266 requirements', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 203:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- -----------------------------------------------------------------------------
-- UNIT 204: Installation of Wiring Systems and Enclosures (20 criteria)
-- -----------------------------------------------------------------------------

-- LO1: Installation Procedures (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.1', 'Interpret installation drawings and specifications',
  ARRAY['document', 'photo'], 2, 'Marked-up drawings showing your interpretation of specifications', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.2', 'Describe safe working procedures for installation activities',
  ARRAY['document', 'reflection'], 1, 'Method statement or written safe system of work', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.3', 'Identify requirements for fixing and supporting cables and enclosures',
  ARRAY['photo', 'reflection'], 2, 'Photos showing correct fixing spacings and support methods', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.4', 'Describe procedures for making good after installation',
  ARRAY['photo'], 1, 'Photos showing making good (fire stopping, plaster repair)', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO2: Material Selection (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.1', 'Select appropriate cables for different circuit types',
  ARRAY['reflection', 'photo'], 2, 'Written rationale for cable selection with photos', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.2', 'Select appropriate containment systems and accessories',
  ARRAY['reflection', 'photo'], 2, 'Selection rationale for conduit/trunking with photos', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.3', 'Identify and use correct tools and equipment safely',
  ARRAY['photo', 'witness'], 1, 'Photos of tool use with supervisor confirmation', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.4', 'Calculate material requirements from specifications',
  ARRAY['calculation', 'document'], 1, 'Material take-off or requisition with calculations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO3: Installation Skills (8 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.1', 'Install PVC/PVC cables using appropriate methods',
  ARRAY['photo', 'witness'], 3, 'Photos of T&E installations with clip spacings correct', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.2', 'Install steel wire armoured (SWA) cables',
  ARRAY['photo', 'witness'], 2, 'Photos showing SWA run, bends, and gland terminations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.3', 'Install PVC conduit and accessories',
  ARRAY['photo', 'witness'], 2, 'Photos of PVC conduit with bends and boxes', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.4', 'Install steel conduit and accessories',
  ARRAY['photo', 'witness'], 2, 'Photos of steel conduit with threaded joints and bends', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.5', 'Install cable trunking systems',
  ARRAY['photo', 'witness'], 2, 'Photos showing trunking runs with accessories', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.6', 'Install cable tray and ladder systems',
  ARRAY['photo', 'witness'], 1, 'Photos of cable tray installation with fixings', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.7', 'Install cable clips and fixings appropriately',
  ARRAY['photo'], 2, 'Photos showing correct clip spacing and fixing methods', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.8', 'Form appropriate bends in conduit',
  ARRAY['photo', 'witness'], 2, 'Photos of set, kick, and double-set bends', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO4: Inspection (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.1', 'Conduct visual inspection of completed installation',
  ARRAY['document', 'photo'], 2, 'Completed inspection checklist with photos of inspected areas', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.2', 'Verify correct installation against specification',
  ARRAY['document', 'photo'], 1, 'Sign-off checklist comparing work to drawings', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.3', 'Identify and rectify installation defects',
  ARRAY['photo', 'reflection'], 1, 'Before/after photos of defect rectification with explanation', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.4', 'Complete installation records and documentation',
  ARRAY['document'], 2, 'Job sheets, handover documentation, as-built records', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 204:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- -----------------------------------------------------------------------------
-- UNIT 210: Termination and Connection (13 criteria)
-- -----------------------------------------------------------------------------

-- LO1: Termination Procedures (3 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.1', 'Describe safe termination procedures for different cable types',
  ARRAY['reflection', 'photo'], 1, 'Written account of termination methods with photos', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 210:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.2', 'Identify termination methods appropriate to cable and equipment types',
  ARRAY['photo', 'reflection'], 2, 'Photos of different termination methods used', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 210:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.3', 'State the requirements for termination in different environments',
  ARRAY['reflection'], 1, 'Written account of IP ratings and environmental considerations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 210:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO2: Single and Multicore Terminations (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.1', 'Prepare cables for termination using appropriate techniques',
  ARRAY['photo', 'video'], 2, 'Photos/video of cable preparation (stripping, forming)', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 210:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.2', 'Terminate single cables in consumer units and distribution boards',
  ARRAY['photo', 'witness'], 3, 'Photos of CU/DB terminations with supervisor sign-off', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 210:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.3', 'Terminate multicore cables using appropriate glands and accessories',
  ARRAY['photo', 'witness'], 2, 'Photos of SWA gland terminations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 210:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.4', 'Make connections in junction boxes and accessories',
  ARRAY['photo', 'witness'], 2, 'Photos of junction box and accessory connections', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 210:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO3: Flexible Cord Terminations (3 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.1', 'Terminate flexible cords in plugs, connectors, and appliances',
  ARRAY['photo', 'witness'], 2, 'Photos of plug and appliance flex terminations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 210:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.2', 'Prepare and terminate armoured cables',
  ARRAY['photo', 'witness'], 2, 'Photos showing armour stripping and gland assembly', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 210:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.3', 'Connect cables to motors and industrial equipment',
  ARRAY['photo', 'witness'], 1, 'Photos of motor terminations with witness statement', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 210:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO4: Verification (3 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.1', 'Verify polarity of completed terminations',
  ARRAY['test_result', 'photo'], 2, 'Test results confirming correct polarity', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 210:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.2', 'Test termination integrity and tightness',
  ARRAY['test_result', 'witness'], 1, 'Continuity test results with witness confirmation', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 210:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.3', 'Inspect terminations against relevant standards',
  ARRAY['document', 'photo'], 1, 'Inspection checklist with photos of terminations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 210:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- -----------------------------------------------------------------------------
-- UNIT 211: Integrated Practical Assessment (10 criteria)
-- -----------------------------------------------------------------------------

-- LO1: Planning (3 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.1', 'Interpret drawings, diagrams and specifications correctly',
  ARRAY['document', 'reflection'], 1, 'Annotated drawings showing your interpretation', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 211:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.2', 'Select appropriate materials, tools and equipment',
  ARRAY['document', 'photo'], 1, 'Material list with photos of tools selected', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 211:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.3', 'Apply safe working practices throughout',
  ARRAY['witness', 'document'], 1, 'Supervisor observation of safe working', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 211:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO2: Installation (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.1', 'Install wiring systems to BS 7671 requirements',
  ARRAY['photo', 'witness'], 2, 'Photos of compliant installations with sign-off', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 211:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.2', 'Make terminations and connections correctly',
  ARRAY['photo', 'witness'], 2, 'Photos of correct terminations with sign-off', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 211:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.3', 'Install accessories and equipment appropriately',
  ARRAY['photo', 'witness'], 2, 'Photos of accessory installations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 211:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.4', 'Apply quality standards to all work',
  ARRAY['witness', 'reflection'], 1, 'Quality assessment by supervisor', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 211:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- LO3: Completion (3 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.1', 'Conduct visual inspection of completed work',
  ARRAY['document', 'photo'], 1, 'Completed inspection schedule with photos', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 211:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.2', 'Test completed circuits using appropriate instruments',
  ARRAY['test_result', 'photo'], 1, 'Test results with photos of testing', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 211:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.3', 'Complete installation documentation accurately',
  ARRAY['certificate', 'document'], 1, 'Completed EIC or MEIWC', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 211:%' AND qc.qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- =============================================================================
-- CITY & GUILDS 2365 LEVEL 3
-- =============================================================================

-- -----------------------------------------------------------------------------
-- UNIT 301: Electrical System Design (21 criteria)
-- -----------------------------------------------------------------------------

-- LO1: Design Principles (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.1', 'Describe the design process for electrical installations',
  ARRAY['reflection', 'document'], 1, 'Written account of design process stages with example specification', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.2', 'Identify factors that influence electrical system design',
  ARRAY['reflection', 'document'], 1, 'Written analysis of design factors (load, environment, regulations)', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.3', 'Explain the importance of electrical load assessment',
  ARRAY['calculation', 'document'], 2, 'Load assessment calculations for real installation', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.4', 'Describe methods for diversity calculation',
  ARRAY['calculation'], 2, 'Diversity calculations using BS 7671 Table 1A', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO2: Circuit Design (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.1', 'Design circuits for lighting, power, and specialist applications',
  ARRAY['drawing', 'calculation'], 3, 'Circuit designs for different applications with calculations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.2', 'Calculate circuit loads and diversity',
  ARRAY['calculation'], 2, 'Detailed load calculations with diversity applied', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.3', 'Apply BS 7671 requirements to circuit design',
  ARRAY['document', 'calculation'], 2, 'Design specifications referencing specific BS 7671 regulations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.4', 'Specify appropriate wiring systems for circuit applications',
  ARRAY['reflection', 'drawing'], 2, 'Wiring system specifications with selection rationale', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO3: Cable Selection (5 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.1', 'Apply the criteria for cable selection',
  ARRAY['calculation', 'document'], 2, 'Full cable selection process documented', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.2', 'Calculate current-carrying capacity with correction factors',
  ARRAY['calculation'], 3, 'CCC calculations applying Cg, Ca, Ci, Cc factors', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.3', 'Calculate voltage drop and verify compliance',
  ARRAY['calculation'], 3, 'Voltage drop calculations for different circuit lengths', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.4', 'Verify thermal constraints for protective conductors',
  ARRAY['calculation'], 2, 'Adiabatic equation calculations (k²S² ≥ I²t)', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.5', 'Calculate earth fault loop impedance (Zs) requirements',
  ARRAY['calculation'], 3, 'Zs calculations verifying ADS compliance', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO4: Protective Device Selection (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.1', 'Select appropriate protective devices for different circuits',
  ARRAY['calculation', 'reflection'], 2, 'Device selection with rationale for Type B/C/D MCBs', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.2', 'Calculate prospective fault current requirements',
  ARRAY['calculation'], 2, 'PSCC/PEFC calculations verifying device suitability', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.3', 'Verify protective device coordination (discrimination)',
  ARRAY['calculation', 'drawing'], 2, 'Discrimination study with time/current curves', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.4', 'Apply requirements for RCD selection and coordination',
  ARRAY['reflection', 'calculation'], 1, 'RCD selection rationale (30mA, 100mA, time-delayed)', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO5: Special Locations (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.1', 'Describe requirements for bathroom and shower installations',
  ARRAY['drawing', 'reflection'], 1, 'Zone diagram with equipment requirements per zone', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.2', 'Describe requirements for swimming pool and hot tub installations',
  ARRAY['reflection', 'drawing'], 1, 'Zone requirements and SELV provisions explained', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.3', 'Describe requirements for agricultural and horticultural premises',
  ARRAY['reflection'], 1, 'Written account of agricultural installation requirements', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.4', 'Describe requirements for construction sites and exhibitions',
  ARRAY['reflection', 'photo'], 1, 'Written requirements or photos from temporary installations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- -----------------------------------------------------------------------------
-- UNIT 302: Inspection, Testing and Commissioning (25 criteria)
-- -----------------------------------------------------------------------------

-- LO1: Inspection and Testing Requirements (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.1', 'State the statutory and non-statutory requirements for inspection and testing',
  ARRAY['reflection', 'document'], 1, 'Written summary of EAWR, BS 7671 Part 6 requirements', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.2', 'Explain when initial verification is required',
  ARRAY['reflection'], 1, 'Written explanation of initial verification triggers', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.3', 'Explain when periodic inspection and testing is required',
  ARRAY['reflection', 'document'], 1, 'Written account with recommended intervals table', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.4', 'Describe the purpose and scope of inspection and testing',
  ARRAY['reflection'], 1, 'Written explanation of I&T purpose and limitations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO2: Visual Inspection (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.1', 'Describe the items to be checked during visual inspection',
  ARRAY['document', 'reflection'], 1, 'Completed schedule of inspection with all items', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.2', 'Identify defects and non-compliances during visual inspection',
  ARRAY['photo', 'document'], 2, 'Photos of identified defects with defect descriptions', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.3', 'Assess the condition of electrical installations',
  ARRAY['document', 'photo'], 1, 'Condition assessment with observations and photos', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.4', 'Identify appropriate actions for observed defects',
  ARRAY['document', 'reflection'], 1, 'Defect report with recommended actions and coding', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO3: Testing Procedures (8 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.1', 'Conduct continuity tests on protective conductors',
  ARRAY['test_result', 'photo'], 3, 'R1+R2 test results with photos of testing process', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.2', 'Conduct continuity tests on ring final circuit conductors',
  ARRAY['test_result', 'photo'], 2, 'Ring continuity results (end-to-end and cross readings)', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.3', 'Conduct insulation resistance tests',
  ARRAY['test_result', 'photo'], 3, 'IR test results at 500V for multiple circuits', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.4', 'Conduct polarity tests',
  ARRAY['test_result', 'witness'], 2, 'Polarity verification results with supervisor sign-off', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.5', 'Conduct earth fault loop impedance tests (Ze and Zs)',
  ARRAY['test_result', 'photo'], 3, 'Ze and Zs readings with comparison to max values', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.6', 'Conduct prospective fault current measurements',
  ARRAY['test_result'], 2, 'PSCC readings at origin and distribution points', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.7', 'Conduct RCD tests (operating time and current)',
  ARRAY['test_result', 'photo'], 3, 'RCD test results at x1, x5, and ramp test', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.8', 'Conduct functional tests on assemblies and equipment',
  ARRAY['test_result', 'witness'], 1, 'Functional test records with supervisor verification', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO4: Commissioning (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.1', 'Describe commissioning procedures for electrical installations',
  ARRAY['reflection', 'document'], 1, 'Commissioning procedure document or written account', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.2', 'Set up and commission lighting and power circuits',
  ARRAY['photo', 'witness', 'test_result'], 2, 'Photos of commissioning with test results and sign-off', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.3', 'Commission motor circuits and control systems',
  ARRAY['photo', 'test_result', 'witness'], 1, 'Motor commissioning with current readings and verification', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.4', 'Conduct safe handover procedures',
  ARRAY['document', 'witness'], 1, 'Handover documentation signed by client', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO5: Certification and Documentation (5 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.1', 'Complete Electrical Installation Certificates (EIC)',
  ARRAY['certificate'], 2, 'Completed EICs for new installations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.2', 'Complete Minor Electrical Installation Works Certificates (MEIWC)',
  ARRAY['certificate'], 2, 'Completed MEIWCs for additions/alterations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.3', 'Complete Electrical Installation Condition Reports (EICR)',
  ARRAY['certificate'], 2, 'Completed EICRs with observations and coding', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.4', 'Complete schedule of inspections and test results',
  ARRAY['document', 'test_result'], 3, 'Completed schedules with all test results recorded', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.5', 'Determine appropriate recommendations and coding (C1, C2, C3, FI)',
  ARRAY['document', 'reflection'], 2, 'EICRs showing correct defect coding with justification', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- -----------------------------------------------------------------------------
-- UNIT 303: Fault Diagnosis and Rectification (21 criteria)
-- -----------------------------------------------------------------------------

-- LO1: Fault Diagnosis Principles (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.1', 'Describe the symptoms of common electrical faults',
  ARRAY['reflection'], 1, 'Written account of fault symptoms (OC, SC, earth faults, HI)', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.2', 'Explain logical and systematic fault-finding procedures',
  ARRAY['reflection', 'document'], 1, 'Written explanation of systematic approach', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.3', 'Describe the six-point fault-finding methodology',
  ARRAY['reflection'], 1, 'Written description of 6-point method application', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.4', 'Identify factors that affect fault diagnosis efficiency',
  ARRAY['reflection'], 1, 'Written account of efficiency factors (documentation, access, etc.)', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO2: Diagnostic Equipment (5 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.1', 'Describe the use of multimeters for fault diagnosis',
  ARRAY['photo', 'reflection'], 1, 'Photos of multimeter use with technique explanation', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.2', 'Describe the use of insulation resistance testers',
  ARRAY['photo', 'test_result'], 1, 'IR tester use photos with readings obtained', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.3', 'Describe the use of earth fault loop impedance testers',
  ARRAY['photo', 'test_result'], 1, 'Loop tester use with Zs readings', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.4', 'Describe the use of RCD testers',
  ARRAY['photo', 'test_result'], 1, 'RCD tester use with trip times recorded', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.5', 'Interpret instrument readings and identify fault conditions',
  ARRAY['test_result', 'reflection'], 2, 'Test results with interpretation and fault identified', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO3: Fault Diagnosis Skills (7 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.1', 'Apply safe isolation procedures before fault diagnosis',
  ARRAY['photo', 'witness'], 2, 'Photos of safe isolation with lock-off and proving', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.2', 'Gather information about the reported fault',
  ARRAY['document', 'reflection'], 2, 'Fault reports or notes from customer interviews', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.3', 'Conduct appropriate tests to locate faults',
  ARRAY['test_result', 'photo'], 3, 'Test results from fault-finding process with photos', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.4', 'Identify the cause of faults in different circuit types',
  ARRAY['reflection', 'photo'], 2, 'Written diagnosis with photos of fault cause', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.5', 'Diagnose faults in lighting circuits',
  ARRAY['reflection', 'test_result', 'photo'], 1, 'Lighting fault diagnosis with test evidence', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.6', 'Diagnose faults in power circuits',
  ARRAY['reflection', 'test_result', 'photo'], 1, 'Power circuit fault diagnosis with evidence', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.7', 'Diagnose faults in motor and control circuits',
  ARRAY['reflection', 'test_result', 'photo'], 1, 'Motor/control circuit fault diagnosis', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO4: Fault Rectification (5 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.1', 'Select appropriate materials and components for rectification',
  ARRAY['photo', 'reflection'], 1, 'Photos of replacement components with selection rationale', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.2', 'Rectify faults using safe working procedures',
  ARRAY['photo', 'witness'], 2, 'Before/after photos with supervisor verification', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.3', 'Verify repairs by appropriate testing',
  ARRAY['test_result'], 2, 'Post-repair test results confirming fix', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.4', 'Complete fault repair documentation',
  ARRAY['document'], 2, 'Completed fault report forms', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- -----------------------------------------------------------------------------
-- UNIT 304: Electrical Installation Planning and Overseeing (16 criteria)
-- -----------------------------------------------------------------------------

-- LO1: Planning (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.1', 'Interpret contract documents, specifications and drawings',
  ARRAY['document', 'reflection'], 2, 'Marked-up specifications showing interpretation', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.2', 'Plan work schedules and sequences of operations',
  ARRAY['document'], 2, 'Work programmes or Gantt charts created', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.3', 'Identify resource requirements (materials, tools, labour)',
  ARRAY['document', 'calculation'], 1, 'Material requisition or resource schedule', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.4', 'Assess and manage project risks',
  ARRAY['document'], 2, 'Project risk assessments created', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO2: Overseeing (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.1', 'Coordinate work with other trades and services',
  ARRAY['document', 'reflection'], 1, 'Coordination meeting notes or written account', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.2', 'Monitor work progress against programme',
  ARRAY['document'], 1, 'Progress reports or marked-up programmes', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.3', 'Supervise safe working practices on site',
  ARRAY['witness', 'document'], 1, 'Witness statement of supervision or toolbox talk records', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.4', 'Apply company procedures and quality standards',
  ARRAY['document', 'reflection'], 1, 'Evidence of following company procedures', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO3: Quality Control (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.1', 'Explain quality management systems and procedures',
  ARRAY['reflection', 'document'], 1, 'Written account of QMS or company quality policy', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.2', 'Conduct quality inspections of completed work',
  ARRAY['document', 'photo'], 2, 'Quality inspection checklists with photos', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.3', 'Identify and address quality issues',
  ARRAY['document', 'photo', 'reflection'], 1, 'NCR or snagging list with resolution photos', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.4', 'Maintain quality records and documentation',
  ARRAY['document'], 2, 'Quality records maintained (inspection reports, test records)', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO4: Communication (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.1', 'Communicate effectively with clients and stakeholders',
  ARRAY['document', 'reflection'], 1, 'Client correspondence or meeting notes', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.2', 'Brief and instruct team members',
  ARRAY['witness', 'document'], 1, 'Toolbox talk record or witness statement of briefing', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.3', 'Liaise with site management and other contractors',
  ARRAY['document', 'reflection'], 1, 'Site meeting minutes or written account', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.4', 'Report progress and issues to management',
  ARRAY['document'], 2, 'Progress reports or site diaries', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- -----------------------------------------------------------------------------
-- UNIT 305: Advanced Electrical Science (20 criteria)
-- -----------------------------------------------------------------------------

-- LO1: Advanced AC Theory (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.1', 'Calculate impedance in complex RLC circuits',
  ARRAY['calculation'], 3, 'Impedance calculations for RLC series and parallel circuits', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.2', 'Construct and interpret phasor diagrams',
  ARRAY['drawing', 'calculation'], 2, 'Phasor diagrams with associated calculations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.3', 'Calculate power in AC circuits (apparent, true, reactive)',
  ARRAY['calculation'], 3, 'Power triangle calculations (S, P, Q)', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.4', 'Apply complex number notation to AC circuit analysis',
  ARRAY['calculation'], 2, 'Complex number (j-notation) circuit calculations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO2: Three-Phase Systems (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.1', 'Describe three-phase generation and distribution',
  ARRAY['reflection', 'drawing'], 1, 'Written explanation with 3-phase waveform diagram', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.2', 'Explain star and delta connection methods',
  ARRAY['drawing', 'reflection'], 1, 'Star and delta diagrams with voltage/current relationships', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.3', 'Calculate line and phase values in three-phase systems',
  ARRAY['calculation'], 3, 'VL/VP and IL/IP calculations for star and delta', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.4', 'Calculate power in balanced three-phase loads',
  ARRAY['calculation'], 2, '3-phase power calculations (P = √3 × VL × IL × cosφ)', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO3: Power Factor (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.1', 'Explain the causes and effects of poor power factor',
  ARRAY['reflection'], 1, 'Written explanation of PF causes and effects on supply', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.2', 'Calculate power factor correction requirements',
  ARRAY['calculation'], 2, 'PFC capacitor sizing calculations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.3', 'Describe methods of power factor improvement',
  ARRAY['reflection', 'drawing'], 1, 'Written account of PFC methods with diagrams', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.4', 'Explain the benefits of power factor correction',
  ARRAY['reflection', 'calculation'], 1, 'Cost/benefit analysis of PFC installation', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO4: Motor Operation (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.1', 'Describe the operating principles of AC induction motors',
  ARRAY['reflection', 'drawing'], 1, 'Written explanation with rotating magnetic field diagram', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.2', 'Describe motor starting methods and their applications',
  ARRAY['reflection', 'drawing'], 1, 'DOL, star-delta, soft-start explanations with circuits', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.3', 'Explain motor speed control methods',
  ARRAY['reflection'], 1, 'Written account of VFD and pole-changing methods', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.4', 'Describe motor protection requirements',
  ARRAY['reflection', 'drawing'], 1, 'Motor protection devices and selection criteria', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO5: Electronic Control (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.1', 'Describe basic electronic control circuits',
  ARRAY['reflection', 'drawing'], 1, 'Basic control circuit explanations (timers, sensors)', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.2', 'Explain the operation of variable speed drives',
  ARRAY['reflection', 'photo'], 1, 'VFD operation explanation with photos of installation', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.3', 'Describe programmable logic controllers (PLCs)',
  ARRAY['reflection', 'drawing'], 1, 'PLC overview with ladder logic examples', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.4', 'Identify applications of electronic control systems',
  ARRAY['reflection', 'photo'], 1, 'Examples of control system applications encountered', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- -----------------------------------------------------------------------------
-- UNIT 306: Environmental Technology Systems (16 criteria)
-- -----------------------------------------------------------------------------

-- LO1: Environmental Legislation (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.1', 'Describe environmental legislation affecting electrical work',
  ARRAY['reflection'], 1, 'Written summary of EPA, WEEE, Building Regs Part L', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.2', 'Explain waste management requirements and procedures',
  ARRAY['reflection', 'document'], 1, 'WEEE disposal evidence or waste transfer notes', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.3', 'Describe environmental impact assessment requirements',
  ARRAY['reflection'], 1, 'Written account of EIA process and when required', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.4', 'Identify sustainable working practices',
  ARRAY['reflection', 'photo'], 1, 'Evidence of sustainable practices applied on site', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO2: Energy Efficiency (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.1', 'Describe methods for improving energy efficiency',
  ARRAY['reflection'], 1, 'Written account of efficiency measures in electrical work', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.2', 'Explain energy management systems and smart controls',
  ARRAY['reflection', 'photo'], 1, 'BMS/smart control explanation with examples', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.3', 'Describe efficient lighting systems and controls',
  ARRAY['reflection', 'photo'], 1, 'LED, PIR, daylight dimming explanations with photos', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.4', 'Identify energy-efficient equipment and technologies',
  ARRAY['reflection', 'photo'], 1, 'Examples of efficient equipment installed', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO3: Renewable Energy (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.1', 'Describe solar photovoltaic (PV) systems and installation requirements',
  ARRAY['reflection', 'photo', 'drawing'], 1, 'PV system explanation with wiring diagram', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.2', 'Describe small-scale wind generation systems',
  ARRAY['reflection'], 1, 'Written account of small wind turbine systems', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.3', 'Explain electric vehicle charging infrastructure',
  ARRAY['reflection', 'photo'], 1, 'EV charging installation requirements and photos', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.4', 'Describe energy storage systems (batteries)',
  ARRAY['reflection', 'drawing'], 1, 'Battery storage explanation with system diagram', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- LO4: Emerging Technologies (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.1', 'Describe smart home and building technologies',
  ARRAY['reflection', 'photo'], 1, 'Smart home systems explanation with examples', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.2', 'Explain heat pump systems and their electrical requirements',
  ARRAY['reflection', 'drawing'], 1, 'Heat pump electrical requirements and supply sizing', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.3', 'Describe building energy management systems (BEMS)',
  ARRAY['reflection'], 1, 'BEMS overview and integration with electrical systems', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.4', 'Identify future developments in environmental technology',
  ARRAY['reflection'], 1, 'Written account of emerging technologies and trends', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'cg-2365-l3-00000000-0000-0001';

-- =============================================================================
-- EAL NVQ LEVEL 3 DIPLOMA
-- =============================================================================

-- -----------------------------------------------------------------------------
-- UNIT 301: Health and Safety in Building Services Engineering (12 criteria)
-- -----------------------------------------------------------------------------

-- LO1: Health and Safety Legislation (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.1', 'Demonstrate knowledge of the Health and Safety at Work Act 1974',
  ARRAY['reflection', 'document'], 1, 'Written account demonstrating HASAWA understanding with workplace examples', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.2', 'Apply requirements of the Electricity at Work Regulations 1989',
  ARRAY['document', 'witness'], 2, 'Evidence of applying EAW regs with supervisor verification', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.3', 'Follow COSHH requirements when handling hazardous substances',
  ARRAY['document', 'photo'], 1, 'COSHH data sheets used with photos of correct PPE', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '1.4', 'Apply manual handling regulations to work activities',
  ARRAY['photo', 'witness'], 1, 'Photos of correct manual handling with witness statement', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

-- LO2: Hazard Identification (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.1', 'Identify hazards in the work environment',
  ARRAY['photo', 'document'], 2, 'Photos of identified hazards with hazard identification checklist', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.2', 'Assess risks and apply appropriate control measures',
  ARRAY['document'], 2, 'Risk assessments with control measures applied', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.3', 'Complete risk assessments for work activities',
  ARRAY['document'], 3, 'Completed risk assessments for different work activities', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.4', 'Report hazards and incidents appropriately',
  ARRAY['document', 'reflection'], 1, 'Incident report or near-miss report completed', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

-- LO3: Safe Working Practices (4 criteria)
INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.1', 'Use correct PPE for all work activities',
  ARRAY['photo', 'witness'], 3, 'Photos of correct PPE use across different activities', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.2', 'Apply safe isolation procedures',
  ARRAY['photo', 'witness'], 3, 'Photos of safe isolation with lock-off, supervisor verified', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.3', 'Work safely at height using appropriate access equipment',
  ARRAY['photo', 'certificate', 'witness'], 1, 'Photos of working at height with PASMA/IPAF or training cert', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.4', 'Apply fire prevention and emergency procedures',
  ARRAY['document', 'reflection'], 1, 'Fire drill participation or emergency procedure knowledge', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 301:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

-- -----------------------------------------------------------------------------
-- UNIT 302: Environmental Legislation and Working Practices (6 criteria)
-- -----------------------------------------------------------------------------

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.1', 'Describe relevant environmental legislation and regulations',
  ARRAY['reflection'], 1, 'Written account of EPA, WEEE, Building Regs requirements', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.2', 'Explain the environmental impact of electrical work',
  ARRAY['reflection'], 1, 'Written explanation of energy use, waste, materials impact', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.3', 'Apply waste management procedures (WEEE, hazardous waste)',
  ARRAY['document', 'photo'], 2, 'Waste transfer notes or photos of correct disposal', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.4', 'Demonstrate energy-efficient working practices',
  ARRAY['reflection', 'photo'], 1, 'Evidence of energy-efficient practices applied', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.5', 'Identify opportunities to reduce environmental impact',
  ARRAY['reflection'], 1, 'Written account of opportunities identified on site', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '2.6', 'Describe applications of environmental technology systems',
  ARRAY['reflection', 'photo'], 1, 'Examples of PV, EV charging, heat pumps encountered', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 302:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

-- -----------------------------------------------------------------------------
-- UNIT 303: Overseeing and Organising the Work Environment (8 criteria)
-- -----------------------------------------------------------------------------

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.1', 'Interpret contract documents and specifications',
  ARRAY['document', 'reflection'], 2, 'Marked-up specs or written interpretation of contract docs', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.2', 'Plan work schedules and resource requirements',
  ARRAY['document'], 2, 'Work schedules or material lists created', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.3', 'Coordinate work with other trades and services',
  ARRAY['document', 'witness'], 1, 'Meeting notes or witness statement of coordination', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.4', 'Monitor progress against planned programme',
  ARRAY['document'], 1, 'Progress tracking documents or marked-up programme', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.5', 'Apply quality control procedures to work activities',
  ARRAY['document', 'photo'], 2, 'Quality checklists completed with inspection photos', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.6', 'Ensure compliance with relevant standards and regulations',
  ARRAY['document', 'reflection'], 1, 'Evidence of checking work against BS 7671', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.7', 'Communicate effectively with clients and team members',
  ARRAY['document', 'witness'], 1, 'Client correspondence or team briefing evidence', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '3.8', 'Maintain accurate work records and documentation',
  ARRAY['document'], 2, 'Job sheets, site diaries, or work records maintained', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 303:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

-- -----------------------------------------------------------------------------
-- UNIT 304: Installing Wiring Systems and Enclosures (10 criteria)
-- -----------------------------------------------------------------------------

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.1', 'Interpret installation drawings and specifications',
  ARRAY['document', 'reflection'], 2, 'Annotated drawings showing interpretation', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.2', 'Select appropriate wiring systems for different applications',
  ARRAY['reflection', 'photo'], 2, 'Selection rationale with photos of systems used', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.3', 'Install PVC insulated cables using correct methods',
  ARRAY['photo', 'witness'], 3, 'Photos of T&E installations with correct clip spacing', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.4', 'Install steel wire armoured (SWA) cables',
  ARRAY['photo', 'witness'], 2, 'Photos of SWA installation with glands and cleats', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.5', 'Install mineral insulated (MI) cables',
  ARRAY['photo', 'witness'], 1, 'Photos of MI cable installation and termination', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.6', 'Install PVC and steel conduit systems',
  ARRAY['photo', 'witness'], 3, 'Photos of conduit with bends, boxes, and draw wires', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.7', 'Install trunking and cable tray systems',
  ARRAY['photo', 'witness'], 2, 'Photos of trunking/tray with correct fixings', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.8', 'Install cables and enclosures in special locations',
  ARRAY['photo', 'witness', 'reflection'], 1, 'Evidence of installation in bathroom/special location', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.9', 'Apply appropriate cable management techniques',
  ARRAY['photo'], 2, 'Photos of neat cable management and routing', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '4.10', 'Conduct visual inspection of completed installations',
  ARRAY['document', 'photo'], 2, 'Inspection checklists with installation photos', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 304:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

-- -----------------------------------------------------------------------------
-- UNIT 305: Terminating and Connecting Conductors, Cables and Cords (8 criteria)
-- -----------------------------------------------------------------------------

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.1', 'Identify termination methods for different cable types',
  ARRAY['reflection', 'photo'], 1, 'Written account of termination methods with examples', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.2', 'Prepare cables for termination using correct techniques',
  ARRAY['photo', 'video'], 2, 'Photos/video of cable stripping and preparation', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.3', 'Terminate cables in consumer units and distribution boards',
  ARRAY['photo', 'witness'], 3, 'Photos of CU/DB terminations with sign-off', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.4', 'Terminate cables at accessories and equipment',
  ARRAY['photo', 'witness'], 3, 'Photos of accessory terminations (sockets, switches)', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.5', 'Install and terminate cable glands on armoured cables',
  ARRAY['photo', 'witness'], 2, 'Photos of SWA gland assembly and termination', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.6', 'Make connections using appropriate methods',
  ARRAY['photo'], 2, 'Photos of different connection methods used', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.7', 'Verify polarity and termination integrity',
  ARRAY['test_result', 'photo'], 2, 'Polarity test results with photos', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '5.8', 'Test completed terminations for compliance',
  ARRAY['test_result', 'witness'], 2, 'Continuity and IR tests on terminations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 305:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

-- -----------------------------------------------------------------------------
-- UNIT 306: Installing Equipment and Components (8 criteria)
-- -----------------------------------------------------------------------------

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '6.1', 'Install distribution equipment (consumer units, distribution boards)',
  ARRAY['photo', 'witness'], 2, 'Photos of CU/DB installation with sign-off', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '6.2', 'Install circuit protective devices',
  ARRAY['photo', 'witness'], 2, 'Photos of MCBs, RCBOs, RCDs installed', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '6.3', 'Install accessories (switches, sockets, fused spurs)',
  ARRAY['photo', 'witness'], 4, 'Range of accessory installations photographed', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '6.4', 'Install luminaires and lighting controls',
  ARRAY['photo', 'witness'], 3, 'Photos of luminaire and switch installations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '6.5', 'Install motor control equipment',
  ARRAY['photo', 'witness'], 1, 'Photos of motor starter/isolator installation', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '6.6', 'Install fire and security alarm components',
  ARRAY['photo', 'witness'], 1, 'Photos of fire/security components installed', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '6.7', 'Install data and communications equipment',
  ARRAY['photo', 'witness'], 1, 'Photos of data outlet/equipment installation', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '6.8', 'Verify correct installation of equipment',
  ARRAY['document', 'test_result'], 2, 'Inspection checklist and functional test results', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 306:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

-- -----------------------------------------------------------------------------
-- UNIT 307: Inspection, Testing and Commissioning (11 criteria)
-- -----------------------------------------------------------------------------

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '7.1', 'Conduct systematic visual inspection',
  ARRAY['document', 'photo'], 3, 'Completed inspection schedules with photos', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 307:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '7.2', 'Perform continuity tests (protective conductors, ring finals)',
  ARRAY['test_result', 'photo'], 4, 'R1+R2 and ring continuity results with photos', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 307:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '7.3', 'Perform insulation resistance tests',
  ARRAY['test_result', 'photo'], 4, 'IR test results for multiple installations', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 307:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '7.4', 'Perform polarity verification tests',
  ARRAY['test_result'], 3, 'Polarity test results confirming correct connections', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 307:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '7.5', 'Measure earth fault loop impedance (Ze and Zs)',
  ARRAY['test_result', 'photo'], 4, 'Ze and Zs readings for multiple circuits', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 307:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '7.6', 'Measure prospective fault current',
  ARRAY['test_result'], 2, 'PSCC measurements at different points', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 307:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '7.7', 'Test RCD operation (trip times and trip currents)',
  ARRAY['test_result', 'photo'], 3, 'RCD test results at x1, x5 and ramp', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 307:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '7.8', 'Conduct functional testing of installed equipment',
  ARRAY['test_result', 'witness'], 2, 'Functional test records with verification', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 307:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '7.9', 'Commission installations and verify operation',
  ARRAY['witness', 'document'], 2, 'Commissioning records with supervisor sign-off', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 307:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '7.10', 'Complete Electrical Installation Certificates',
  ARRAY['certificate'], 3, 'Completed and signed EICs', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 307:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '7.11', 'Complete schedules of inspections and test results',
  ARRAY['document', 'test_result'], 3, 'Full schedules with all test results recorded', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 307:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

-- -----------------------------------------------------------------------------
-- UNIT 308: Diagnosing and Rectifying Faults (10 criteria)
-- -----------------------------------------------------------------------------

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '8.1', 'Apply safe isolation procedures before fault diagnosis',
  ARRAY['photo', 'witness'], 2, 'Photos of safe isolation with supervisor verification', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 308:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '8.2', 'Gather information about reported faults',
  ARRAY['document', 'reflection'], 2, 'Fault reports or notes from customer interviews', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 308:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '8.3', 'Apply systematic fault-finding methodology',
  ARRAY['reflection', 'document'], 2, 'Written account of systematic approach used', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 308:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '8.4', 'Use appropriate test instruments for fault location',
  ARRAY['photo', 'test_result'], 2, 'Photos of instruments used with test readings', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 308:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '8.5', 'Identify the cause of electrical faults',
  ARRAY['photo', 'reflection'], 2, 'Photos of identified faults with written diagnosis', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 308:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '8.6', 'Diagnose faults in lighting, power and control circuits',
  ARRAY['reflection', 'test_result', 'photo'], 3, 'Evidence of diagnosing faults in different circuit types', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 308:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '8.7', 'Select appropriate materials for fault rectification',
  ARRAY['photo', 'reflection'], 1, 'Photos of replacement materials with selection rationale', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 308:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '8.8', 'Rectify faults safely and to required standards',
  ARRAY['photo', 'witness'], 2, 'Before/after photos with supervisor sign-off', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 308:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '8.9', 'Verify repairs through testing',
  ARRAY['test_result'], 2, 'Post-repair test results confirming successful fix', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 308:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, '8.10', 'Complete fault repair documentation',
  ARRAY['document'], 2, 'Completed fault report forms', true
FROM qualification_categories qc WHERE qc.name LIKE 'Unit 308:%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

-- -----------------------------------------------------------------------------
-- AM2 Electrotechnical Assessment (8 criteria)
-- -----------------------------------------------------------------------------

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, 'AM2.1', 'Complete installation tasks within time limits',
  ARRAY['certificate', 'witness'], 1, 'AM2 result certificate or assessor report', true
FROM qualification_categories qc WHERE qc.name LIKE 'AM2%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, 'AM2.2', 'Install wiring systems to specification',
  ARRAY['certificate', 'photo'], 1, 'AM2 result with photos of installation work', true
FROM qualification_categories qc WHERE qc.name LIKE 'AM2%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, 'AM2.3', 'Make terminations and connections correctly',
  ARRAY['certificate'], 1, 'AM2 termination assessment result', true
FROM qualification_categories qc WHERE qc.name LIKE 'AM2%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, 'AM2.4', 'Conduct all required tests accurately',
  ARRAY['certificate', 'test_result'], 1, 'AM2 testing assessment result with test schedule', true
FROM qualification_categories qc WHERE qc.name LIKE 'AM2%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, 'AM2.5', 'Complete certification correctly',
  ARRAY['certificate'], 1, 'AM2 certification assessment result', true
FROM qualification_categories qc WHERE qc.name LIKE 'AM2%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, 'AM2.6', 'Diagnose and rectify introduced faults',
  ARRAY['certificate'], 1, 'AM2 fault diagnosis assessment result', true
FROM qualification_categories qc WHERE qc.name LIKE 'AM2%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, 'AM2.7', 'Apply safe working practices throughout',
  ARRAY['certificate', 'witness'], 1, 'AM2 H&S assessment or observation record', true
FROM qualification_categories qc WHERE qc.name LIKE 'AM2%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';

INSERT INTO public.unit_evidence_requirements (category_id, assessment_criterion, assessment_criterion_text, evidence_type_codes, quantity_required, guidance, is_mandatory)
SELECT qc.id, 'AM2.8', 'Achieve pass standard in all assessment areas',
  ARRAY['certificate'], 1, 'AM2 overall pass certificate', true
FROM qualification_categories qc WHERE qc.name LIKE 'AM2%' AND qc.qualification_id = 'eal-nvq-l3-00000000-0000-0001';
