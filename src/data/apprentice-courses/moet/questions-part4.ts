// MOET Level 3 - Maintenance & Operations Engineering Technician (ST1426)
// Electrical Engineering Maintenance Technician Pathway
// Questions Part 4: Module 7 (EPA Preparation) and Cross-Module Integration
// Questions 121-150

import type { StandardMockQuestion } from '@/types/standardMockExam';

export const questionsPart4: StandardMockQuestion[] = [
  // ============================================================
  // MODULE 7: EPA PREPARATION (Questions 121-140)
  // ============================================================

  // EPA Structure & Knowledge Test (Questions 121-126)
  {
    id: 121,
    question: 'The MOET EPA (End-Point Assessment) consists of which assessment components?',
    options: [
      'A single written examination covering all core and pathway knowledge',
      'A knowledge test, a practical assessment, and a portfolio-based professional discussion',
      'An online multiple-choice test and a structured peer review by colleagues',
      'A supervised workplace observation and a written technical report',
    ],
    correctAnswer: 1,
    explanation:
      'The MOET Level 3 EPA comprises three components: a knowledge test covering the core and pathway knowledge, a practical assessment demonstrating competence in maintenance tasks, and a professional discussion underpinned by a portfolio of evidence. Each component must be passed individually to achieve the overall apprenticeship standard.',
    section: 'EPA Structure',
    difficulty: 'basic',
    topic: 'EPA Components',
    category: 'EPA Preparation',
  },
  {
    id: 122,
    question: 'What grades are available in the MOET EPA?',
    options: [
      'Pass or fail only',
      'Percentage scores with no grade boundaries',
      'Fail, pass, or distinction',
      'Grades A to E',
    ],
    correctAnswer: 2,
    explanation:
      'The MOET EPA awards three possible outcomes: fail, pass, or distinction. To achieve a distinction, the apprentice must demonstrate performance that exceeds the pass criteria across the assessment components, showing deeper knowledge, higher-level skills, and more developed professional behaviours.',
    section: 'EPA Structure',
    difficulty: 'basic',
    topic: 'EPA Grading',
    category: 'EPA Preparation',
  },
  {
    id: 123,
    question:
      'During the EPA knowledge test, a question asks about the purpose of a risk assessment. Which answer best demonstrates the depth of understanding expected at Level 3?',
    options: [
      'A legal form the supervisor must sign before any work starts on site',
      'A checklist of the personal protective equipment required for the task',
      'A record of accidents and near-misses kept to satisfy the enforcing authority',
      'A systematic process of identifying hazards and setting controls under MHSWR 1999',
    ],
    correctAnswer: 3,
    explanation:
      'At Level 3, the EPA expects technicians to demonstrate a thorough understanding that goes beyond basic definitions. A risk assessment is not merely a form but a systematic process rooted in legislation (the Management of Health and Safety at Work Regulations 1999). Referencing the hierarchy of control, specific regulations, and the evaluation methodology demonstrates the depth of knowledge expected for a pass or distinction.',
    section: 'EPA Knowledge',
    difficulty: 'intermediate',
    topic: 'Risk Assessment Depth',
    category: 'EPA Preparation',
  },
  {
    id: 124,
    question:
      'What is the role of the Independent End-Point Assessment Organisation (EPAO) in the MOET EPA?',
    options: [
      'To independently assess the apprentice against the standard, ensuring impartiality',
      'To deliver the on-programme training and mentor the apprentice throughout the apprenticeship',
      'To employ the apprentice and confirm they are ready to enter the gateway',
      'To set the funding band and pay the training provider for each apprentice',
    ],
    correctAnswer: 0,
    explanation:
      'The EPAO is an independent organisation responsible for carrying out the end-point assessment. They design and deliver the assessment activities, train and standardise assessors, and make the final grading decisions. Their independence from the employer and training provider ensures impartiality and maintains the integrity of the qualification.',
    section: 'EPA Structure',
    difficulty: 'basic',
    topic: 'EPAO Role',
    category: 'EPA Preparation',
  },
  {
    id: 125,
    question: 'Before entering EPA gateway, what must an apprentice have achieved?',
    options: [
      'A distinction grade in the on-programme knowledge modules only',
      'Level 2 English and maths (or equivalent), completed on-programme learning and employer sign-off',
      'A minimum of five years of relevant electrical workplace experience',
      'A Level 3 qualification in a subject unrelated to the apprenticeship standard',
    ],
    correctAnswer: 1,
    explanation:
      'The EPA gateway requires: achievement of Level 2 English and maths (or Functional Skills equivalents), completion of all on-programme training and development, compilation of the portfolio of evidence, and formal confirmation from the employer that the apprentice is ready for assessment. The gateway is the checkpoint that ensures the apprentice is fully prepared.',
    section: 'EPA Structure',
    difficulty: 'basic',
    topic: 'Gateway Requirements',
    category: 'EPA Preparation',
  },
  {
    id: 126,
    question:
      'During the EPA practical assessment, the assessor observes a technician performing safe isolation. What would demonstrate distinction-level performance?',
    options: [
      'Completing the isolation as quickly as possible to minimise downtime on the line',
      'Carrying out the isolation in silence so as not to distract the assessor',
      'Isolating correctly while explaining each step, citing EAWR 1989 and GS 38 equipment',
      'Isolating the supply and relying on the assessor to verify the dead state',
    ],
    correctAnswer: 2,
    explanation:
      'Distinction-level performance requires the apprentice to not only demonstrate technical competence but also to articulate the reasoning behind each step, reference relevant legislation and standards (such as the Electricity at Work Regulations 1989 and HSE Guidance Note GS 38 on test equipment), use appropriate equipment correctly, and show proactive risk management. This demonstrates the deeper understanding and professional behaviours expected for a distinction grade.',
    section: 'EPA Practical',
    difficulty: 'advanced',
    topic: 'Distinction Criteria',
    category: 'EPA Preparation',
  },

  // Professional Discussion & Portfolio (Questions 127-132)
  {
    id: 127,
    question: 'What is the purpose of the portfolio of evidence in the MOET EPA?',
    options: [
      'To replace the practical assessment so that no observed task is required',
      'To record the apprentice\'s attendance throughout the on-programme period',
      'To act as a personal scrapbook that the assessor does not review',
      'To collect structured evidence of competence across the standard, supporting the professional discussion',
    ],
    correctAnswer: 3,
    explanation:
      "The portfolio of evidence is a curated collection of work-based evidence that demonstrates the apprentice's competence, knowledge, and behaviours across the requirements of the standard. It supports the professional discussion by providing concrete examples for the assessor to explore. Evidence may include work orders, test records, risk assessments, maintenance reports, and reflective accounts.",
    section: 'Portfolio',
    difficulty: 'basic',
    topic: 'Portfolio Purpose',
    category: 'EPA Preparation',
  },
  {
    id: 128,
    question:
      'During the professional discussion, the assessor asks about a complex fault you diagnosed. What approach would best demonstrate the required competencies?',
    options: [
      'Explain the systematic approach, the reasoning, the root cause and the prevention',
      'State the final outcome and confirm that the equipment is now working correctly',
      'Explain that a colleague diagnosed the fault and describe what they did',
      'Describe the fault in general terms without referring to any specific job',
    ],
    correctAnswer: 0,
    explanation:
      "The professional discussion assesses the apprentice's ability to reflect on and articulate their work experiences. A comprehensive response covering systematic fault-finding methodology, safety considerations, root cause analysis, and recommendations for prevention demonstrates the technical knowledge, problem-solving skills, and professional behaviours expected by the standard.",
    section: 'Professional Discussion',
    difficulty: 'intermediate',
    topic: 'Discussion Technique',
    category: 'EPA Preparation',
  },
  {
    id: 129,
    question: 'Which types of evidence are most valuable in a MOET EPA portfolio?',
    options: [
      'A single large maintenance report covering one task in great detail',
      'A diverse mix of work orders, test certificates, witness testimonies and reflective accounts',
      'A set of photographs of completed work with no supporting documentation',
      'Printouts of the apprenticeship standard with no work-based evidence attached',
    ],
    correctAnswer: 1,
    explanation:
      "High-quality portfolio evidence should be diverse, authentic, and mapped to specific requirements of the apprenticeship standard. The combination of documentary evidence (work orders, test results), witness testimonies from supervisors, and reflective accounts provides a rounded picture of the apprentice's competence. Each piece of evidence should be clearly referenced to the relevant section of the standard.",
    section: 'Portfolio',
    difficulty: 'intermediate',
    topic: 'Evidence Types',
    category: 'EPA Preparation',
  },
  {
    id: 130,
    question:
      "In the professional discussion, how should an apprentice demonstrate the behaviour 'taking responsibility for own professional development'?",
    options: [
      'State that all training is arranged by the employer and outside their control',
      'Explain that professional development only begins once the apprenticeship is complete',
      'Give examples of self-directed learning and CPD undertaken on their own initiative and applied to improve their practice',
      'List the mandatory courses the employer required them to attend on programme',
    ],
    correctAnswer: 2,
    explanation:
      'Demonstrating professional development behaviours requires evidence of self-motivation and initiative. The apprentice should provide specific examples of learning activities they identified and pursued themselves, such as researching technical topics, attending voluntary training, obtaining additional certifications, and actively seeking challenging work to develop new skills.',
    section: 'Professional Discussion',
    difficulty: 'intermediate',
    topic: 'Professional Behaviours',
    category: 'EPA Preparation',
  },
  {
    id: 131,
    question:
      'An EPA assessor asks about your understanding of maintenance strategies. Which response demonstrates comprehensive knowledge?',
    options: [
      'We run every asset to failure and replace components only when they break down',
      'We carry out preventive maintenance on a fixed monthly schedule for all equipment regardless of criticality',
      'Maintenance strategy is decided by the production manager and is not a technician\'s concern',
      'Matching planned, condition-based and run-to-failure work to asset criticality via a CMMS',
    ],
    correctAnswer: 3,
    explanation:
      'This response demonstrates Level 3 understanding by referencing multiple maintenance strategies (planned preventive, condition-based using thermography and vibration analysis, and run-to-failure for non-critical items), digital management tools (CMMS), and relevant KPIs such as MTBF, MTTR and maintenance backlog. It shows the apprentice understands how different strategies are applied to different criticality levels, which is a key aspect of the MOET standard.',
    section: 'Professional Discussion',
    difficulty: 'advanced',
    topic: 'Maintenance Strategy Knowledge',
    category: 'EPA Preparation',
  },
  {
    id: 132,
    question:
      'What is the maximum timeframe typically allowed to complete all EPA components once the first assessment has been taken?',
    options: [
      'Typically three to six months, as set by the assessment plan',
      'Up to two years from the gateway date',
      'No time limit applies once started',
      'One week from the first activity',
    ],
    correctAnswer: 0,
    explanation:
      'The MOET assessment plan specifies a window of typically three to six months for completion of all EPA components once the first assessment activity has commenced. This allows reasonable time for scheduling all three components whilst maintaining the currency and relevance of the assessment. Specific timings are determined by the EPAO in line with the assessment plan.',
    section: 'EPA Structure',
    difficulty: 'basic',
    topic: 'EPA Timescales',
    category: 'EPA Preparation',
  },

  // ============================================================
  // CROSS-MODULE INTEGRATION (Questions 133-150)
  // ============================================================

  // Integrated Scenarios (Questions 133-138)
  {
    id: 133,
    question:
      'A maintenance technician is called to investigate a tripping VSD on a critical production line pump. Applying a systematic approach, what is the correct sequence of actions?',
    options: [
      'Reset the VSD repeatedly until the pump runs and then close the work order off',
      'Read the VSD fault log, test the motor and load, then apply root cause analysis',
      'Replace the VSD immediately as it is always the most likely cause of tripping',
      'Increase the VSD current limit so the protection stops tripping the drive out',
    ],
    correctAnswer: 1,
    explanation:
      'This question integrates knowledge from multiple modules: fault diagnosis methodology (Module 4), VSD technology (Module 3), motor testing (Module 2), safety considerations (Module 1), and documentation (Module 6). A systematic approach using VSD diagnostic data, electrical testing, mechanical assessment, and root cause analysis demonstrates the integrated thinking expected of a MOET technician.',
    section: 'Integrated Scenario',
    difficulty: 'advanced',
    topic: 'VSD Fault Diagnosis',
    category: 'Cross-Module Integration',
  },
  {
    id: 134,
    question:
      'A planned shutdown is scheduled for an 11 kV/400 V substation to replace a transformer. What planning documents and safety systems are required?',
    options: [
      'A verbal briefing to the team on the morning of the shutdown, with no written records',
      'A single risk assessment, with switching carried out from memory by the senior engineer',
      'Method statement, risk assessment, switching schedule, permit to work, LOTO, proof of competence and a communication plan',
      'The transformer manufacturer\'s data sheet, with switching arranged informally on the day',
    ],
    correctAnswer: 2,
    explanation:
      'This cross-module question combines: safety management (Module 1 - method statements, risk assessments, permits, LOTO), electrical plant knowledge (Module 3 - substation operations, switching procedures), documentation (Module 6 - switching schedules, communication plans), and professional behaviours (competence, planning). It reflects the real-world complexity that a MOET technician must manage.',
    section: 'Integrated Scenario',
    difficulty: 'advanced',
    topic: 'Shutdown Planning',
    category: 'Cross-Module Integration',
  },
  {
    id: 135,
    question:
      'During a routine PPM visit, a thermographic survey of a motor control centre reveals a hot spot at 85 degrees C on one contactor connection (normal operating temperature is 40 degrees C). What actions should be taken?',
    options: [
      'Ignore the hot spot as 85 degrees C is within the normal range for a contactor',
      'Immediately tighten the connection while the circuit remains live and loaded',
      'Switch the whole motor control centre off at once without informing anyone',
      'Record it, raise a priority work order, assess the risk and report to the duty engineer',
    ],
    correctAnswer: 3,
    explanation:
      'This integrates condition monitoring (Module 4), electrical safety (Module 1), risk assessment, plant knowledge (Module 3), and documentation/reporting (Module 6). The response balances production impact against safety risk, demonstrates understanding of condition monitoring trending, and follows correct reporting procedures. The 45-degree temperature differential is significant and requires action.',
    section: 'Integrated Scenario',
    difficulty: 'intermediate',
    topic: 'Condition Monitoring Response',
    category: 'Cross-Module Integration',
  },
  {
    id: 136,
    question:
      'A PLC-controlled packaging line has an intermittent fault causing random stoppages. The PLC diagnostics show no fault codes. What cross-disciplinary approach should be used?',
    options: [
      'Monitor the I/O and sensors, review the logic timing, and check for VSD electrical noise',
      'Replace the PLC processor first because intermittent faults are always processor related',
      'Wait for a fault code to appear on the PLC before taking any further action',
      'Disable the safety circuit temporarily to see whether the stoppages then cease',
    ],
    correctAnswer: 0,
    explanation:
      'This integrates PLC and automation knowledge (Module 5), fault-finding methodology (Module 4), electrical interference understanding (Module 2/3), and safety circuit knowledge (Module 5). Intermittent faults require a systematic, multi-disciplinary approach. Checking for electrical noise from VSDs and marginal safety switch contacts are particularly relevant for industrial packaging environments.',
    section: 'Integrated Scenario',
    difficulty: 'advanced',
    topic: 'PLC Fault Diagnosis',
    category: 'Cross-Module Integration',
  },
  {
    id: 137,
    question:
      'An apprentice is preparing evidence for their EPA portfolio relating to a motor replacement task. Which combination of evidence would best demonstrate competence?',
    options: [
      'A single photograph of the new motor installed on the conveyor system',
      'Work order, risk assessment, isolation certificate, test results and a reflective account',
      'A verbal account given to the assessor during the professional discussion',
      'The delivery note and supplier invoice for the replacement motor only',
    ],
    correctAnswer: 1,
    explanation:
      'This EPA-focused question demonstrates how real-world tasks generate multiple types of portfolio evidence across several modules: safety documentation (Module 1), technical testing (Module 2/4), plant knowledge (Module 3), documentation (Module 6), and reflective practice (Module 7). The comprehensive evidence package shows the breadth and depth expected in an EPA portfolio.',
    section: 'EPA Portfolio',
    difficulty: 'intermediate',
    topic: 'Evidence Mapping',
    category: 'Cross-Module Integration',
  },
  {
    id: 138,
    question:
      'A maintenance technician needs to specify a replacement motor for a conveyor system. What information is needed and where would it be found?',
    options: [
      'The power rating only, taken from any similarly sized motor in the stores',
      'The colour and physical size of the old motor so a visual match can be found',
      'Rating, voltage, speed, mounting, IP rating and duty from the nameplate and O&M data',
      'The supplier\'s current catalogue, choosing whichever motor is in stock at the time',
    ],
    correctAnswer: 2,
    explanation:
      "This combines motor knowledge (Module 2), plant systems understanding (Module 3), documentation and record keeping (Module 6), and maintenance management (Module 4). Correct motor specification requires reference to multiple documentation sources and understanding of the motor's operating requirements within the complete system.",
    section: 'Integrated Scenario',
    difficulty: 'intermediate',
    topic: 'Motor Specification',
    category: 'Cross-Module Integration',
  },

  // Applied Knowledge (Questions 139-144)
  {
    id: 139,
    question:
      'A 400 V three-phase motor has been rewound. Before returning it to service, what tests must be performed and what minimum values apply?',
    options: [
      'A visual inspection of the windings only, with no electrical testing before service',
      'A continuity test of the windings, then a return straight to full-load operation',
      'Insulation resistance testing at 250 V DC with a minimum of 0.5 megohm and nothing further',
      'Insulation resistance at 500 V DC (min 1 megohm), winding balance, rotation and no-load current',
    ],
    correctAnswer: 3,
    explanation:
      'This question integrates electrical testing knowledge (Module 2/4), motor theory (Module 2), safety procedures (Module 1), and commissioning documentation (Module 6). A comprehensive post-rewind testing regime ensures the motor is fit for service. The insulation resistance minimum of 1 megohm at 500 V DC is specified by BS 7671 Table 6.1 for circuits up to 500 V.',
    section: 'Applied Knowledge',
    difficulty: 'advanced',
    topic: 'Motor Commissioning',
    category: 'Cross-Module Integration',
  },
  {
    id: 140,
    question:
      "What is the significance of power factor in an industrial installation and how does it affect the maintenance technician's work?",
    options: [
      'Poor power factor raises current for the same real power, causing losses and charges',
      'Power factor only affects the supply authority and has no impact on the technician\'s work',
      'A poor power factor reduces the current drawn, lowering the load on cables and switchgear',
      'Power factor is fixed by the motor design at manufacture and cannot change in service',
    ],
    correctAnswer: 0,
    explanation:
      'This cross-module question links electrical theory (Module 2), plant systems (Module 3 - capacitor banks), maintenance implications (Module 4 - failing capacitors, overheating), and cost awareness. A poor power factor increases current draw for the same real power, raising losses and reactive-power charges, and may signal failing power-factor-correction capacitors. Understanding power factor helps technicians identify the root cause of overheating cables, interpret energy monitoring data, and maintain correction equipment.',
    section: 'Applied Knowledge',
    difficulty: 'intermediate',
    topic: 'Power Factor Implications',
    category: 'Cross-Module Integration',
  },
  {
    id: 141,
    question:
      'A building management system (BMS) alarm indicates a UPS battery fault. What should the maintenance technician do?',
    options: [
      'Silence the alarm and take no further action as UPS batteries rarely actually fail',
      'Acknowledge it, test battery impedance and voltages, assess autonomy and report back',
      'Switch the UPS to bypass and disconnect the batteries before any investigation',
      'Replace the entire UPS unit immediately without first testing the batteries',
    ],
    correctAnswer: 1,
    explanation:
      'This integrates UPS knowledge (Module 3), condition monitoring and testing (Module 4), SCADA/BMS systems (Module 5), and reporting procedures (Module 6). Battery maintenance is critical for UPS reliability. The technician must assess the fault severity, test the batteries, evaluate the impact on critical load protection, and communicate the findings through proper channels.',
    section: 'Applied Knowledge',
    difficulty: 'intermediate',
    topic: 'UPS Battery Maintenance',
    category: 'Cross-Module Integration',
  },
  {
    id: 142,
    question:
      'When interpreting a motor control schematic to fault-find a star-delta starter that fails to change from star to delta, which components and connections should be checked?',
    options: [
      'The motor overload relay and the main isolator only',
      'The supply fuses and the incoming cable terminations only',
      'The timer KT1, the KM3 and KM2 contactors, their interlock and the control wiring',
      'The motor windings and the driven load coupling only',
    ],
    correctAnswer: 2,
    explanation:
      'This integrates schematic reading (Module 6), motor starter knowledge (Module 3), control circuit understanding (Module 5), and systematic fault finding (Module 4). The fault lies in the changeover circuit: the star-delta timer relay (KT1), the delta contactor (KM3) coil and contacts, the star contactor (KM2) auxiliary contacts that enable the delta contactor, the interlocking contacts between KM2 and KM3, and the control wiring between them. The timer initiates changeover, the star contactor drops out, and the delta contactor pulls in; interlocking prevents both being energised simultaneously.',
    section: 'Applied Knowledge',
    difficulty: 'advanced',
    topic: 'Star-Delta Fault Finding',
    category: 'Cross-Module Integration',
  },
  {
    id: 143,
    question:
      'A safety light curtain on a press machine has been reported as intermittently blanking out. The machine has emergency-stopped twice today. What systematic approach should be followed?',
    options: [
      'Bypass the light curtain so the press can continue running while you investigate',
      'Reduce the sensitivity of the light curtain to stop the nuisance trips occurring',
      'Replace the press control PLC as the most likely cause of the intermittent blanking',
      'Check alignment, clean the lenses, verify the safety relay and confirm the safety distance',
    ],
    correctAnswer: 3,
    explanation:
      'This cross-module question combines safety systems (Module 1/5), systematic fault finding (Module 4), environmental awareness (Module 3), and documentation review (Module 6). Safety devices must never be disabled or their sensitivity reduced. The systematic approach checks alignment and lens cleanliness, environmental contaminants such as dust and coolant mist, safety relay status, wiring connections, maintenance history for recurring issues, and that the safety distance calculation is still valid, all while maintaining the safety integrity of the machine.',
    section: 'Applied Knowledge',
    difficulty: 'intermediate',
    topic: 'Safety Device Troubleshooting',
    category: 'Cross-Module Integration',
  },
  {
    id: 144,
    question:
      'An energy audit has identified that a group of conveyor motors are operating at 60% load on average. What recommendation might a maintenance technician make?',
    options: [
      'Replace the oversized motors with correctly sized units, or fit VSDs to match the load',
      'Leave the motors as they are, since running below rated load extends their life and needs no action',
      'Increase the supply voltage to the motors so they draw more current and run at full load',
      'Fit even larger motors so there is more spare capacity for future production increases',
    ],
    correctAnswer: 0,
    explanation:
      'This integrates motor theory (Module 2 - efficiency curves, power factor at partial load), energy management, VSD technology (Module 3), maintenance strategy (Module 4 - planned replacement), and professional development (Module 7 - contributing to continuous improvement). Motors operating well below rated load have poor efficiency and power factor, increasing energy costs.',
    section: 'Applied Knowledge',
    difficulty: 'intermediate',
    topic: 'Energy Efficiency',
    category: 'Cross-Module Integration',
  },

  // Professional Practice & Continuous Improvement (Questions 145-150)
  {
    id: 145,
    question:
      'What is the importance of effective communication in the role of a maintenance technician?',
    options: [
      'Communication matters only when dealing with customers, not within the maintenance team',
      'It underpins safe handovers, accurate fault reporting and coordination with production',
      'Communication is the supervisor\'s responsibility and not part of a technician\'s role',
      'Communication is unimportant provided the technical work itself is carried out correctly',
    ],
    correctAnswer: 1,
    explanation:
      "Communication is a core behaviour in the MOET standard. It ensures safe handovers between shifts, accurate fault reporting for root cause analysis, effective coordination with production teams, correct documentation, and professional interaction with colleagues, supervisors and contractors. Poor communication is a contributing factor in many industrial incidents, particularly during shift handovers and permit to work procedures. The EPA professional discussion specifically assesses the apprentice's ability to communicate technical information clearly, both verbally and in writing.",
    section: 'Professional Practice',
    difficulty: 'basic',
    topic: 'Communication Skills',
    category: 'Cross-Module Integration',
  },
  {
    id: 146,
    question:
      'A maintenance technician notices that the same type of contactor keeps failing across multiple motor starters in a plant. What approach demonstrates continuous improvement thinking?',
    options: [
      'Keep replacing the contactors like-for-like as they fail and accept the recurring cost',
      'Fit the next size up of contactor without first investigating why they are failing',
      'Investigate the failure with RCA, check the rating and propose a design improvement',
      'Report the issue to the supervisor and then take no further action yourself',
    ],
    correctAnswer: 2,
    explanation:
      'This question tests the continuous improvement behaviour expected in the MOET standard. Rather than accepting repeated failures, a competent technician applies root cause analysis, challenges existing specifications, and proposes improvements. This proactive approach demonstrates the problem-solving and initiative expected at Level 3 and would contribute strong evidence for the EPA portfolio.',
    section: 'Continuous Improvement',
    difficulty: 'intermediate',
    topic: 'Root Cause Analysis Application',
    category: 'Cross-Module Integration',
  },
  {
    id: 147,
    question:
      'During a professional discussion, the assessor asks how you ensure compliance with relevant legislation in your daily work. What comprehensive answer would be expected?',
    options: [
      'I rely on my supervisor to tell me what the law requires for each task I do',
      'I follow custom and practice on site, as legislation does not apply to maintenance work',
      'I assume the equipment is compliant because it was installed by an approved contractor',
      'I apply HSWA 1974, EAWR 1989 and BS 7671 through risk assessment and safe isolation',
    ],
    correctAnswer: 3,
    explanation:
      'The EPA expects technicians to demonstrate awareness of how legislation translates into daily practice. Citing specific legislation (the Health and Safety at Work Act 1974 and the Electricity at Work Regulations 1989), Approved Codes of Practice and standards (BS 7671), and practical applications (risk assessment, safe isolation, PPE, maintaining competence and accurate record keeping) shows the integrated understanding of theory and practice that distinguishes a competent Level 3 technician.',
    section: 'Professional Discussion',
    difficulty: 'intermediate',
    topic: 'Legislative Compliance',
    category: 'Cross-Module Integration',
  },
  {
    id: 148,
    question:
      "What is meant by 'competence' in the context of the Electricity at Work Regulations 1989, and how does the MOET apprenticeship contribute to it?",
    options: [
      'The blend of knowledge, skills, experience and risk awareness suited to the work',
      'Competence simply means holding any recognised electrical qualification, regardless of experience',
      'Competence is the number of years a person has worked in the electrical industry',
      'Competence is confirmed solely by passing the EPA knowledge test at the end',
    ],
    correctAnswer: 0,
    explanation:
      'The EAWR 1989 Regulation 16 requires persons to be competent to prevent danger and injury. The HSE defines competence as a combination of training, skills, experience and knowledge, plus the ability to recognise and manage risk appropriate to the work. The MOET apprenticeship directly addresses all these elements through structured training, supervised workplace experience and formal assessment, making it a structured pathway to the competence required under the regulations for electrical maintenance work.',
    section: 'Professional Practice',
    difficulty: 'intermediate',
    topic: 'Competence Definition',
    category: 'Cross-Module Integration',
  },
  {
    id: 149,
    question:
      'A maintenance technician is asked to work on equipment they have not been trained on. What is the correct professional response?',
    options: [
      'Proceed with the work and learn the equipment as you go to avoid delaying production',
      'Tell the supervisor they are not trained, and ask for training or supervision first',
      'Refuse the task outright and report the supervisor for even asking them to do it',
      'Ask another apprentice who is also untrained to help work it out together',
    ],
    correctAnswer: 1,
    explanation:
      "This tests the professional behaviour of recognising the limits of one's competence, as required by EAWR 1989 and the MOET standard. A professional response demonstrates self-awareness, prioritises safety, communicates clearly with the supervisor, and shows initiative by seeking to develop new skills. This approach aligns with the apprenticeship behaviour of taking responsibility for personal development.",
    section: 'Professional Practice',
    difficulty: 'basic',
    topic: 'Limits of Competence',
    category: 'Cross-Module Integration',
  },
  {
    id: 150,
    question:
      "How does the concept of 'continuous improvement' apply to a maintenance department, and how can a technician contribute?",
    options: [
      'Continuous improvement is a management initiative that technicians cannot influence',
      'Continuous improvement only applies to production output, not to the maintenance function',
      'By spotting recurring failures, feeding accurate CMMS data and joining root cause analysis',
      'Continuous improvement means working faster to close more work orders each shift',
    ],
    correctAnswer: 2,
    explanation:
      'Continuous improvement is a key behaviour in the MOET standard. Maintenance technicians are uniquely placed to identify improvement opportunities because they work directly with the equipment. Contributing to CMMS data accuracy, participating in RCA, sharing knowledge, and proposing practical improvements are all ways technicians drive continuous improvement in reliability, safety, and efficiency.',
    section: 'Continuous Improvement',
    difficulty: 'basic',
    topic: 'Continuous Improvement',
    category: 'Cross-Module Integration',
  },
];
