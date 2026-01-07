-- City & Guilds 2365-02 Level 2 Diploma in Electrical Installations
-- Real unit data based on the qualification handbook

-- First, insert or update the qualification
INSERT INTO qualifications (id, awarding_body, level, title, code, description)
VALUES (
  'cg-2365-l2-00000000-0000-0001',
  'City & Guilds',
  'Level 2',
  'Diploma in Electrical Installations (Buildings and Structures)',
  '2365-02',
  'Level 2 Diploma covering health and safety, electrical science, installation technology, and practical installation skills. Assessed through online tests and practical assignments. Total qualification value: 49 credits.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  code = EXCLUDED.code,
  description = EXCLUDED.description,
  updated_at = NOW();

-- Delete any existing categories for this qualification to replace with real units
DELETE FROM qualification_categories
WHERE qualification_id = 'cg-2365-l2-00000000-0000-0001';

-- Unit 201: Health and Safety in Building Services Engineering
-- 3 credits, 26 GLH, Assessment: Online test (601) + Practical assignment (211)
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'cg-2365-l2-00000000-0000-0001',
  'Unit 201: Health and Safety in Building Services Engineering',
  '3 credits, 26 GLH. Covers health and safety legislation, safe working procedures, hazard identification, and emergency procedures. Assessment: 75-minute online test (40 questions) + practical assignment.',
  'Shield',
  '#ef4444',
  4,
  ARRAY[
    'LO1: Know the health and safety legislation, roles and responsibilities of personnel and relevant health and safety information within the building services engineering sector',
    'LO2: Know the hazards and risks associated with work activities within the building services engineering sector',
    'LO3: Know the safe working practices and procedures within the building services engineering working environment',
    'LO4: Know the importance of fire and emergency procedures in the workplace'
  ],
  ARRAY[
    '1.1 State the main duties of employers and employees under the Health and Safety at Work Act 1974',
    '1.2 Identify the statutory requirements relating to the Electricity at Work Regulations 1989',
    '1.3 State the requirements for PPE provision under relevant regulations',
    '1.4 Describe the requirements for accident reporting under RIDDOR',
    '2.1 Identify hazards associated with electrical work environments',
    '2.2 Describe methods for identifying and controlling risks in the workplace',
    '2.3 Explain the purpose and content of risk assessments',
    '2.4 Describe methods for reducing risk from manual handling activities',
    '3.1 Describe safe isolation procedures for low voltage systems',
    '3.2 Explain the requirements for working at height safely',
    '3.3 State the requirements for using access equipment',
    '3.4 Describe permit to work systems and their application',
    '4.1 Describe fire prevention and emergency evacuation procedures',
    '4.2 State the different classes of fire and appropriate extinguishing methods',
    '4.3 Explain first aid procedures for electric shock victims',
    '4.4 Identify emergency contact procedures and reporting requirements'
  ]
);

-- Unit 202: Principles of Electrical Science
-- 10 credits, 89 GLH, Assessment: 90-minute online test (40 questions)
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'cg-2365-l2-00000000-0000-0001',
  'Unit 202: Principles of Electrical Science',
  '10 credits, 89 GLH. Covers basic electrical principles, units, circuit theory, magnetism, and electrical components. Assessment: 90-minute online test (40 questions).',
  'Zap',
  '#3b82f6',
  3,
  ARRAY[
    'LO1: Understand standard units of measurement used in electrical installation',
    'LO2: Understand basic electrical circuit theory and Ohms law',
    'LO3: Understand the relationship between resistance, resistivity, and temperature',
    'LO4: Understand the principles of magnetism and electromagnetism',
    'LO5: Understand single-phase AC circuit theory',
    'LO6: Understand the operating principles of electrical components'
  ],
  ARRAY[
    '1.1 Identify SI units and derived units for electrical quantities',
    '1.2 Apply standard prefixes (milli, micro, kilo, mega) in calculations',
    '1.3 Calculate electrical quantities using appropriate formulas',
    '2.1 Apply Ohms law to calculate voltage, current, and resistance',
    '2.2 Calculate values in series and parallel resistor circuits',
    '2.3 Apply Kirchhoffs laws to circuit analysis',
    '2.4 Calculate power in DC circuits using P=IV, P=I²R, P=V²/R',
    '3.1 Explain the relationship between resistance and conductor properties',
    '3.2 Calculate conductor resistance using ρL/A formula',
    '3.3 Describe the effect of temperature on conductor resistance',
    '4.1 Describe magnetic flux, flux density, and magnetic field strength',
    '4.2 Explain the principle of electromagnetic induction',
    '4.3 Describe the construction and operation of transformers',
    '5.1 Calculate RMS and peak values of AC waveforms',
    '5.2 Explain the concept of phase angle and power factor',
    '5.3 Calculate impedance in AC circuits with resistive and reactive components',
    '6.1 Describe the operation of capacitors and inductors in circuits',
    '6.2 Explain the characteristics of semiconductor devices',
    '6.3 Describe the operation of protection devices (fuses, MCBs, RCDs)'
  ]
);

-- Unit 203: Electrical Installations Technology
-- 12 credits, 115 GLH, Assessment: 90-minute online test (40 questions)
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'cg-2365-l2-00000000-0000-0001',
  'Unit 203: Electrical Installations Technology',
  '12 credits, 115 GLH. Covers installation methods, cable selection, earthing systems, protection, and BS 7671 requirements. Assessment: 90-minute online test (40 questions).',
  'Cable',
  '#10b981',
  5,
  ARRAY[
    'LO1: Know the supply systems and earthing arrangements used in electrical installations',
    'LO2: Know the types, applications and limitations of wiring systems',
    'LO3: Know the types, applications and limitations of electrical equipment',
    'LO4: Know the requirements for selecting cables and circuit protective devices',
    'LO5: Know the principles of protection against electric shock',
    'LO6: Know the principles of illumination and lighting systems'
  ],
  ARRAY[
    '1.1 Describe the characteristics of TN-C-S, TN-S, and TT earthing systems',
    '1.2 Identify the components of earthing arrangements (main earth terminal, bonding conductors)',
    '1.3 Explain the function of protective earthing and bonding',
    '1.4 Describe single and three-phase supply systems',
    '2.1 Identify types of cables (PVC, XLPE, SWA, MI, LSF) and their applications',
    '2.2 Describe containment systems (trunking, conduit, cable tray)',
    '2.3 State the factors affecting cable installation methods',
    '2.4 Identify appropriate wiring systems for different environments',
    '3.1 Describe types of circuit protective devices and their characteristics',
    '3.2 Identify types of switches, sockets, and accessories',
    '3.3 Describe types of luminaires and their applications',
    '3.4 Identify special location equipment requirements',
    '4.1 Apply cable selection criteria (current-carrying capacity, voltage drop)',
    '4.2 Calculate circuit protective device ratings',
    '4.3 Apply correction factors for cable grouping and ambient temperature',
    '4.4 Calculate earth fault loop impedance requirements',
    '5.1 Describe basic and fault protection measures',
    '5.2 Explain automatic disconnection of supply requirements',
    '5.3 Describe supplementary and additional protection measures',
    '5.4 Identify requirements for RCD protection',
    '6.1 Describe lighting design principles and lux levels',
    '6.2 Identify types of lamps and their characteristics',
    '6.3 Describe emergency lighting requirements'
  ]
);

-- Unit 204: Installation of Wiring Systems and Enclosures
-- 21 credits, 196 GLH, Assessment: Practical assignment + supplementary questions
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'cg-2365-l2-00000000-0000-0001',
  'Unit 204: Installation of Wiring Systems and Enclosures',
  '21 credits, 196 GLH. Practical unit covering cable management systems, wiring methods, and installation techniques. Assessment: Practical assignment with supplementary questions.',
  'Wrench',
  '#8b5cf6',
  6,
  ARRAY[
    'LO1: Know the procedures for installing and connecting cables and enclosures',
    'LO2: Be able to select and use materials, components and equipment for installation',
    'LO3: Be able to install wiring systems and enclosures safely',
    'LO4: Be able to inspect and test completed work'
  ],
  ARRAY[
    '1.1 Interpret installation drawings and specifications',
    '1.2 Describe safe working procedures for installation activities',
    '1.3 Identify requirements for fixing and supporting cables and enclosures',
    '1.4 Describe procedures for making good after installation',
    '2.1 Select appropriate cables for different circuit types',
    '2.2 Select appropriate containment systems and accessories',
    '2.3 Identify and use correct tools and equipment safely',
    '2.4 Calculate material requirements from specifications',
    '3.1 Install PVC/PVC cables using appropriate methods',
    '3.2 Install steel wire armoured (SWA) cables',
    '3.3 Install PVC conduit and accessories',
    '3.4 Install steel conduit and accessories',
    '3.5 Install cable trunking systems',
    '3.6 Install cable tray and ladder systems',
    '3.7 Install cable clips and fixings appropriately',
    '3.8 Form appropriate bends in conduit',
    '4.1 Conduct visual inspection of completed installation',
    '4.2 Verify correct installation against specification',
    '4.3 Identify and rectify installation defects',
    '4.4 Complete installation records and documentation'
  ]
);

-- Unit 210: Termination and Connection of Conductors, Cables and Flexible Cords
-- Practical unit covering termination techniques
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'cg-2365-l2-00000000-0000-0001',
  'Unit 210: Termination and Connection of Conductors, Cables and Cords',
  'Practical unit covering safe termination and connection of various cable types, conductors, and flexible cords in electrical installations.',
  'Link',
  '#f59e0b',
  4,
  ARRAY[
    'LO1: Know the procedures for terminating and connecting cables and flexible cords',
    'LO2: Be able to terminate and connect conductors in single cables and multicore cables',
    'LO3: Be able to terminate and connect flexible cords and cables',
    'LO4: Be able to verify completed terminations and connections'
  ],
  ARRAY[
    '1.1 Describe safe termination procedures for different cable types',
    '1.2 Identify termination methods appropriate to cable and equipment types',
    '1.3 State the requirements for termination in different environments',
    '2.1 Prepare cables for termination using appropriate techniques',
    '2.2 Terminate single cables in consumer units and distribution boards',
    '2.3 Terminate multicore cables using appropriate glands and accessories',
    '2.4 Make connections in junction boxes and accessories',
    '3.1 Terminate flexible cords in plugs, connectors, and appliances',
    '3.2 Prepare and terminate armoured cables',
    '3.3 Connect cables to motors and industrial equipment',
    '4.1 Verify polarity of completed terminations',
    '4.2 Test termination integrity and tightness',
    '4.3 Inspect terminations against relevant standards'
  ]
);

-- Unit 211: Practical Assessment
-- This represents the integrated practical assessment
INSERT INTO qualification_categories (
  qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria
) VALUES (
  'cg-2365-l2-00000000-0000-0001',
  'Unit 211: Integrated Practical Assessment',
  'Integrated practical assessment demonstrating competency across all practical units. Candidates complete an assessed practical installation task.',
  'CheckCircle',
  '#059669',
  2,
  ARRAY[
    'LO1: Be able to plan and prepare for electrical installation work',
    'LO2: Be able to install electrical systems to specification',
    'LO3: Be able to complete and document installation work'
  ],
  ARRAY[
    '1.1 Interpret drawings, diagrams and specifications correctly',
    '1.2 Select appropriate materials, tools and equipment',
    '1.3 Apply safe working practices throughout',
    '2.1 Install wiring systems to BS 7671 requirements',
    '2.2 Make terminations and connections correctly',
    '2.3 Install accessories and equipment appropriately',
    '2.4 Apply quality standards to all work',
    '3.1 Conduct visual inspection of completed work',
    '3.2 Test completed circuits using appropriate instruments',
    '3.3 Complete installation documentation accurately'
  ]
);
