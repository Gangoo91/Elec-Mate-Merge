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
    question: "The MOET EPA (End-Point Assessment) consists of which assessment components?",
    options: [
      "A single written examination only",
      "A knowledge test, a practical assessment, and a professional discussion supported by a portfolio of evidence",
      "An online multiple-choice test and a peer review",
      "A workplace observation and a written report only"
    ],
    correctAnswer: 1,
    explanation: "The MOET Level 3 EPA comprises three components: a knowledge test covering the core and pathway knowledge, a practical assessment demonstrating competence in maintenance tasks, and a professional discussion underpinned by a portfolio of evidence. Each component must be passed individually to achieve the overall apprenticeship standard.",
    section: "EPA Structure",
    difficulty: "basic",
    topic: "EPA Components",
    category: "EPA Preparation"
  },
  {
    id: 122,
    question: "What grades are available in the MOET EPA?",
    options: [
      "Pass or fail only",
      "Fail, pass, or distinction",
      "Grades A to E",
      "Percentage scores with no grade boundaries"
    ],
    correctAnswer: 1,
    explanation: "The MOET EPA awards three possible outcomes: fail, pass, or distinction. To achieve a distinction, the apprentice must demonstrate performance that exceeds the pass criteria across the assessment components, showing deeper knowledge, higher-level skills, and more developed professional behaviours.",
    section: "EPA Structure",
    difficulty: "basic",
    topic: "EPA Grading",
    category: "EPA Preparation"
  },
  {
    id: 123,
    question: "During the EPA knowledge test, a question asks about the purpose of a risk assessment. Which answer best demonstrates the depth of understanding expected at Level 3?",
    options: [
      "It is a form that must be filled in before starting work",
      "It is a systematic process of identifying hazards, evaluating the likelihood and severity of harm, and determining suitable control measures in accordance with the hierarchy of control under the Management of Health and Safety at Work Regulations 1999",
      "It is a checklist provided by the HSE",
      "It is a verbal briefing given by the site supervisor"
    ],
    correctAnswer: 1,
    explanation: "At Level 3, the EPA expects technicians to demonstrate a thorough understanding that goes beyond basic definitions. A risk assessment is not merely a form but a systematic process rooted in legislation (MHSWR 1999). Referencing the hierarchy of control, specific regulations, and the evaluation methodology demonstrates the depth of knowledge expected for a pass or distinction.",
    section: "EPA Knowledge",
    difficulty: "intermediate",
    topic: "Risk Assessment Depth",
    category: "EPA Preparation"
  },
  {
    id: 124,
    question: "What is the role of the Independent End-Point Assessment Organisation (EPAO) in the MOET EPA?",
    options: [
      "To provide training to the apprentice throughout the programme",
      "To independently assess the apprentice against the standard, ensuring impartiality and consistency of assessment decisions",
      "To employ the apprentice during their apprenticeship",
      "To write the apprenticeship standard"
    ],
    correctAnswer: 1,
    explanation: "The EPAO is an independent organisation responsible for carrying out the end-point assessment. They design and deliver the assessment activities, train and standardise assessors, and make the final grading decisions. Their independence from the employer and training provider ensures impartiality and maintains the integrity of the qualification.",
    section: "EPA Structure",
    difficulty: "basic",
    topic: "EPAO Role",
    category: "EPA Preparation"
  },
  {
    id: 125,
    question: "Before entering EPA gateway, what must an apprentice have achieved?",
    options: [
      "A minimum of one year of employment only",
      "Level 2 English and maths qualifications (or equivalent), completion of the on-programme learning, and employer confirmation of readiness",
      "A degree-level qualification in engineering",
      "Five years of industrial maintenance experience"
    ],
    correctAnswer: 1,
    explanation: "The EPA gateway requires: achievement of Level 2 English and maths (or Functional Skills equivalents), completion of all on-programme training and development, compilation of the portfolio of evidence, and formal confirmation from the employer that the apprentice is ready for assessment. The gateway is the checkpoint that ensures the apprentice is fully prepared.",
    section: "EPA Structure",
    difficulty: "basic",
    topic: "Gateway Requirements",
    category: "EPA Preparation"
  },
  {
    id: 126,
    question: "During the EPA practical assessment, the assessor observes a technician performing safe isolation. What would demonstrate distinction-level performance?",
    options: [
      "Following the basic steps of isolation without explanation",
      "Performing isolation correctly whilst explaining each step, referencing the Electricity at Work Regulations 1989, demonstrating GS 38 compliant test equipment, and proactively identifying and managing risks",
      "Asking a colleague to perform the isolation instead",
      "Completing the isolation as quickly as possible without testing the voltage indicator"
    ],
    correctAnswer: 1,
    explanation: "Distinction-level performance requires the apprentice to not only demonstrate technical competence but also to articulate the reasoning behind each step, reference relevant legislation and standards, use appropriate equipment correctly, and show proactive risk management. This demonstrates the deeper understanding and professional behaviours expected for a distinction grade.",
    section: "EPA Practical",
    difficulty: "advanced",
    topic: "Distinction Criteria",
    category: "EPA Preparation"
  },

  // Professional Discussion & Portfolio (Questions 127-132)
  {
    id: 127,
    question: "What is the purpose of the portfolio of evidence in the MOET EPA?",
    options: [
      "To replace the need for practical assessment",
      "To provide a structured collection of evidence demonstrating competence across the apprenticeship standard, used to support the professional discussion",
      "To record attendance at college only",
      "To contain copies of all textbooks studied"
    ],
    correctAnswer: 1,
    explanation: "The portfolio of evidence is a curated collection of work-based evidence that demonstrates the apprentice's competence, knowledge, and behaviours across the requirements of the standard. It supports the professional discussion by providing concrete examples for the assessor to explore. Evidence may include work orders, test records, risk assessments, maintenance reports, and reflective accounts.",
    section: "Portfolio",
    difficulty: "basic",
    topic: "Portfolio Purpose",
    category: "EPA Preparation"
  },
  {
    id: 128,
    question: "During the professional discussion, the assessor asks about a complex fault you diagnosed. What approach would best demonstrate the required competencies?",
    options: [
      "Describe only the final solution without explaining the diagnostic process",
      "Explain the systematic fault-finding approach used, the reasoning behind each diagnostic step, how you ensured safety throughout, the root cause identified, and the preventive measures recommended",
      "State that you asked a senior engineer to fix it",
      "Provide a one-word answer about the faulty component"
    ],
    correctAnswer: 1,
    explanation: "The professional discussion assesses the apprentice's ability to reflect on and articulate their work experiences. A comprehensive response covering systematic fault-finding methodology, safety considerations, root cause analysis, and recommendations for prevention demonstrates the technical knowledge, problem-solving skills, and professional behaviours expected by the standard.",
    section: "Professional Discussion",
    difficulty: "intermediate",
    topic: "Discussion Technique",
    category: "EPA Preparation"
  },
  {
    id: 129,
    question: "Which types of evidence are most valuable in a MOET EPA portfolio?",
    options: [
      "Only photographs of equipment",
      "A diverse range including completed work orders, test certificates, risk assessments, method statements, witness testimonies, and reflective accounts that map to specific areas of the standard",
      "Generic training certificates unrelated to the standard",
      "Only college assignment grades"
    ],
    correctAnswer: 1,
    explanation: "High-quality portfolio evidence should be diverse, authentic, and mapped to specific requirements of the apprenticeship standard. The combination of documentary evidence (work orders, test results), witness testimonies from supervisors, and reflective accounts provides a rounded picture of the apprentice's competence. Each piece of evidence should be clearly referenced to the relevant section of the standard.",
    section: "Portfolio",
    difficulty: "intermediate",
    topic: "Evidence Types",
    category: "EPA Preparation"
  },
  {
    id: 130,
    question: "In the professional discussion, how should an apprentice demonstrate the behaviour 'taking responsibility for own professional development'?",
    options: [
      "State that their employer sends them on courses",
      "Describe specific examples of self-directed learning, CPD activities undertaken on their own initiative, technical challenges they researched independently, and how they have applied new knowledge to improve their practice",
      "Mention that they have a training folder",
      "Say that they passed their college exams"
    ],
    correctAnswer: 1,
    explanation: "Demonstrating professional development behaviours requires evidence of self-motivation and initiative. The apprentice should provide specific examples of learning activities they identified and pursued themselves, such as researching technical topics, attending voluntary training, obtaining additional certifications, and actively seeking challenging work to develop new skills.",
    section: "Professional Discussion",
    difficulty: "intermediate",
    topic: "Professional Behaviours",
    category: "EPA Preparation"
  },
  {
    id: 131,
    question: "An EPA assessor asks about your understanding of maintenance strategies. Which response demonstrates comprehensive knowledge?",
    options: [
      "We fix things when they break",
      "Our site uses a balanced approach combining planned preventive maintenance for critical assets, condition-based monitoring using thermography and vibration analysis, and run-to-failure for non-critical items, all managed through a CMMS with KPIs including MTBF, MTTR, and maintenance backlog",
      "We do maintenance every month",
      "The maintenance manager decides what to do"
    ],
    correctAnswer: 1,
    explanation: "This response demonstrates Level 3 understanding by referencing multiple maintenance strategies (PPM, CBM, RTF), specific condition monitoring techniques, digital management tools (CMMS), and relevant KPIs. It shows the apprentice understands how different strategies are applied to different criticality levels, which is a key aspect of the MOET standard.",
    section: "Professional Discussion",
    difficulty: "advanced",
    topic: "Maintenance Strategy Knowledge",
    category: "EPA Preparation"
  },
  {
    id: 132,
    question: "What is the maximum timeframe typically allowed to complete all EPA components once the first assessment has been taken?",
    options: [
      "One week",
      "Typically three to six months, as specified by the assessment plan",
      "Two years",
      "There is no time limit"
    ],
    correctAnswer: 1,
    explanation: "The MOET assessment plan specifies a window of typically three to six months for completion of all EPA components once the first assessment activity has commenced. This allows reasonable time for scheduling all three components whilst maintaining the currency and relevance of the assessment. Specific timings are determined by the EPAO in line with the assessment plan.",
    section: "EPA Structure",
    difficulty: "basic",
    topic: "EPA Timescales",
    category: "EPA Preparation"
  },

  // ============================================================
  // CROSS-MODULE INTEGRATION (Questions 133-150)
  // ============================================================

  // Integrated Scenarios (Questions 133-138)
  {
    id: 133,
    question: "A maintenance technician is called to investigate a tripping VSD on a critical production line pump. Applying a systematic approach, what is the correct sequence of actions?",
    options: [
      "Reset the VSD repeatedly until it stays running",
      "Check the VSD fault log for diagnostic codes, assess the motor insulation resistance and phase balance, inspect the mechanical load, review recent changes or maintenance, and apply root cause analysis before implementing a permanent fix",
      "Replace the VSD immediately",
      "Bypass the VSD and run the motor direct on line"
    ],
    correctAnswer: 1,
    explanation: "This question integrates knowledge from multiple modules: fault diagnosis methodology (Module 4), VSD technology (Module 3), motor testing (Module 2), safety considerations (Module 1), and documentation (Module 6). A systematic approach using VSD diagnostic data, electrical testing, mechanical assessment, and root cause analysis demonstrates the integrated thinking expected of a MOET technician.",
    section: "Integrated Scenario",
    difficulty: "advanced",
    topic: "VSD Fault Diagnosis",
    category: "Cross-Module Integration"
  },
  {
    id: 134,
    question: "A planned shutdown is scheduled for an 11 kV/400 V substation to replace a transformer. What planning documents and safety systems are required?",
    options: [
      "Only a verbal agreement with the operations manager",
      "A method statement, risk assessment, switching schedule, permit to work system, LOTO procedures, proof of competence for all personnel, and a communication plan including handover procedures",
      "A purchase order for the new transformer only",
      "An email to the maintenance team"
    ],
    correctAnswer: 1,
    explanation: "This cross-module question combines: safety management (Module 1 - method statements, risk assessments, permits, LOTO), electrical plant knowledge (Module 3 - substation operations, switching procedures), documentation (Module 6 - switching schedules, communication plans), and professional behaviours (competence, planning). It reflects the real-world complexity that a MOET technician must manage.",
    section: "Integrated Scenario",
    difficulty: "advanced",
    topic: "Shutdown Planning",
    category: "Cross-Module Integration"
  },
  {
    id: 135,
    question: "During a routine PPM visit, a thermographic survey of a motor control centre reveals a hot spot at 85 degrees C on one contactor connection (normal operating temperature is 40 degrees C). What actions should be taken?",
    options: [
      "Ignore it as the contactor is still working",
      "Record the finding, raise a priority work order for investigation during the next planned shutdown, increase monitoring frequency, assess the risk of continued operation, and report to the duty engineer for a decision on continued running",
      "Immediately shut down the entire production line",
      "Apply more grease to the connection"
    ],
    correctAnswer: 1,
    explanation: "This integrates condition monitoring (Module 4), electrical safety (Module 1), risk assessment, plant knowledge (Module 3), and documentation/reporting (Module 6). The response balances production impact against safety risk, demonstrates understanding of condition monitoring trending, and follows correct reporting procedures. The 45-degree temperature differential is significant and requires action.",
    section: "Integrated Scenario",
    difficulty: "intermediate",
    topic: "Condition Monitoring Response",
    category: "Cross-Module Integration"
  },
  {
    id: 136,
    question: "A PLC-controlled packaging line has an intermittent fault causing random stoppages. The PLC diagnostics show no fault codes. What cross-disciplinary approach should be used?",
    options: [
      "Replace the PLC immediately",
      "Investigate the I/O signals using PLC monitoring software, check sensor outputs and wiring, review the PLC programme logic for timing issues, check for electrical noise from nearby VSDs, and examine the safety circuit for marginal switch contacts",
      "Restart the PLC every time it stops",
      "Increase the PLC scan time"
    ],
    correctAnswer: 1,
    explanation: "This integrates PLC and automation knowledge (Module 5), fault-finding methodology (Module 4), electrical interference understanding (Module 2/3), and safety circuit knowledge (Module 5). Intermittent faults require a systematic, multi-disciplinary approach. Checking for electrical noise from VSDs and marginal safety switch contacts are particularly relevant for industrial packaging environments.",
    section: "Integrated Scenario",
    difficulty: "advanced",
    topic: "PLC Fault Diagnosis",
    category: "Cross-Module Integration"
  },
  {
    id: 137,
    question: "An apprentice is preparing evidence for their EPA portfolio relating to a motor replacement task. Which combination of evidence would best demonstrate competence?",
    options: [
      "A photograph of the new motor only",
      "The completed work order, risk assessment, method statement, safe isolation certificate, motor test results (insulation resistance, rotation check), commissioning record, and a reflective account of the task with lessons learnt",
      "A college assignment about motors",
      "A copy of the motor manufacturer's catalogue"
    ],
    correctAnswer: 1,
    explanation: "This EPA-focused question demonstrates how real-world tasks generate multiple types of portfolio evidence across several modules: safety documentation (Module 1), technical testing (Module 2/4), plant knowledge (Module 3), documentation (Module 6), and reflective practice (Module 7). The comprehensive evidence package shows the breadth and depth expected in an EPA portfolio.",
    section: "EPA Portfolio",
    difficulty: "intermediate",
    topic: "Evidence Mapping",
    category: "Cross-Module Integration"
  },
  {
    id: 138,
    question: "A maintenance technician needs to specify a replacement motor for a conveyor system. What information is needed and where would it be found?",
    options: [
      "Only the motor frame size",
      "Power rating, voltage, speed, mounting type, IP rating, duty cycle, and operating environment from the original motor nameplate, equipment data sheet in the O&M manual, asset register in the CMMS, and the original design specification",
      "The colour of the motor",
      "The price from the cheapest supplier"
    ],
    correctAnswer: 1,
    explanation: "This combines motor knowledge (Module 2), plant systems understanding (Module 3), documentation and record keeping (Module 6), and maintenance management (Module 4). Correct motor specification requires reference to multiple documentation sources and understanding of the motor's operating requirements within the complete system.",
    section: "Integrated Scenario",
    difficulty: "intermediate",
    topic: "Motor Specification",
    category: "Cross-Module Integration"
  },

  // Applied Knowledge (Questions 139-144)
  {
    id: 139,
    question: "A 400 V three-phase motor has been rewound. Before returning it to service, what tests must be performed and what minimum values apply?",
    options: [
      "No tests are required after a professional rewind",
      "Insulation resistance testing at 500 V DC (minimum 1 megohm per BS 7671), winding resistance balance check (within 2%), rotation direction verification, no-load current measurement, and vibration check after coupling to the driven equipment",
      "Only check the nameplate is attached",
      "Run the motor at full load immediately to test it"
    ],
    correctAnswer: 1,
    explanation: "This question integrates electrical testing knowledge (Module 2/4), motor theory (Module 2), safety procedures (Module 1), and commissioning documentation (Module 6). A comprehensive post-rewind testing regime ensures the motor is fit for service. The insulation resistance minimum of 1 megohm at 500 V DC is specified by BS 7671 Table 6.1 for circuits up to 500 V.",
    section: "Applied Knowledge",
    difficulty: "advanced",
    topic: "Motor Commissioning",
    category: "Cross-Module Integration"
  },
  {
    id: 140,
    question: "What is the significance of power factor in an industrial installation and how does it affect the maintenance technician's work?",
    options: [
      "Power factor has no relevance to maintenance",
      "A poor power factor increases current draw for the same real power, causing overheating in cables and equipment, increased losses, higher electricity costs from reactive power charges, and may indicate failing capacitors that need replacement during maintenance",
      "Power factor only matters for domestic installations",
      "Power factor is only relevant to the electricity supplier"
    ],
    correctAnswer: 1,
    explanation: "This cross-module question links electrical theory (Module 2), plant systems (Module 3 - capacitor banks), maintenance implications (Module 4 - failing capacitors, overheating), and cost awareness. Understanding power factor helps technicians identify the root cause of overheating cables, interpret energy monitoring data, and maintain power factor correction equipment.",
    section: "Applied Knowledge",
    difficulty: "intermediate",
    topic: "Power Factor Implications",
    category: "Cross-Module Integration"
  },
  {
    id: 141,
    question: "A building management system (BMS) alarm indicates a UPS battery fault. What should the maintenance technician do?",
    options: [
      "Ignore the alarm as the UPS is still running",
      "Acknowledge the alarm, check the UPS control panel for specific fault details, perform battery impedance or resistance testing, check battery terminal voltages and connections, assess the remaining battery autonomy, and report the findings with a recommendation for battery replacement if required",
      "Switch off the UPS immediately",
      "Reset the BMS alarm and continue"
    ],
    correctAnswer: 1,
    explanation: "This integrates UPS knowledge (Module 3), condition monitoring and testing (Module 4), SCADA/BMS systems (Module 5), and reporting procedures (Module 6). Battery maintenance is critical for UPS reliability. The technician must assess the fault severity, test the batteries, evaluate the impact on critical load protection, and communicate the findings through proper channels.",
    section: "Applied Knowledge",
    difficulty: "intermediate",
    topic: "UPS Battery Maintenance",
    category: "Cross-Module Integration"
  },
  {
    id: 142,
    question: "When interpreting a motor control schematic to fault-find a star-delta starter that fails to change from star to delta, which components and connections should be checked?",
    options: [
      "Only the main fuses",
      "The star-delta timer relay (KT1), the delta contactor (KM3) coil and contacts, the star contactor (KM2) auxiliary contacts that enable the delta contactor, interlocking contacts between KM2 and KM3, and the control circuit wiring between these components",
      "The motor windings only",
      "The incoming supply voltage"
    ],
    correctAnswer: 1,
    explanation: "This integrates schematic reading (Module 6), motor starter knowledge (Module 3), control circuit understanding (Module 5), and systematic fault finding (Module 4). The star-to-delta changeover relies on a specific sequence: the timer initiates changeover, the star contactor drops out, and the delta contactor pulls in. Interlocking prevents both being energised simultaneously.",
    section: "Applied Knowledge",
    difficulty: "advanced",
    topic: "Star-Delta Fault Finding",
    category: "Cross-Module Integration"
  },
  {
    id: 143,
    question: "A safety light curtain on a press machine has been reported as intermittently blanking out. The machine has emergency-stopped twice today. What systematic approach should be followed?",
    options: [
      "Disable the light curtain to keep production running",
      "Check the light curtain alignment, clean the lenses, inspect for environmental contaminants (dust, coolant mist), verify the safety relay status, check wiring connections, review the maintenance history for recurring issues, and ensure the safety distance calculation is still valid",
      "Replace the light curtain immediately without investigation",
      "Reduce the sensitivity of the light curtain"
    ],
    correctAnswer: 1,
    explanation: "This cross-module question combines safety systems (Module 1/5), systematic fault finding (Module 4), environmental awareness (Module 3), and documentation review (Module 6). Safety devices must never be disabled or their sensitivity reduced. The systematic approach addresses common causes of light curtain problems whilst ensuring the safety integrity of the machine is maintained.",
    section: "Applied Knowledge",
    difficulty: "intermediate",
    topic: "Safety Device Troubleshooting",
    category: "Cross-Module Integration"
  },
  {
    id: 144,
    question: "An energy audit has identified that a group of conveyor motors are operating at 60% load on average. What recommendation might a maintenance technician make?",
    options: [
      "No action needed as the motors are running",
      "Consider replacing the oversized motors with correctly sized alternatives, or fitting VSDs to match motor speed to the actual load requirement, reducing energy consumption and improving the power factor",
      "Increase the conveyor speed to use more power",
      "Add more load to the conveyors"
    ],
    correctAnswer: 1,
    explanation: "This integrates motor theory (Module 2 - efficiency curves, power factor at partial load), energy management, VSD technology (Module 3), maintenance strategy (Module 4 - planned replacement), and professional development (Module 7 - contributing to continuous improvement). Motors operating well below rated load have poor efficiency and power factor, increasing energy costs.",
    section: "Applied Knowledge",
    difficulty: "intermediate",
    topic: "Energy Efficiency",
    category: "Cross-Module Integration"
  },

  // Professional Practice & Continuous Improvement (Questions 145-150)
  {
    id: 145,
    question: "What is the importance of effective communication in the role of a maintenance technician?",
    options: [
      "Communication is not important for maintenance work",
      "Clear communication ensures safe handovers between shifts, accurate fault reporting for root cause analysis, effective coordination with production teams, correct documentation of maintenance activities, and professional interaction with colleagues, supervisors, and contractors",
      "Communication is only needed during emergencies",
      "Written communication is not necessary if verbal instructions are given"
    ],
    correctAnswer: 1,
    explanation: "Communication is a core behaviour in the MOET standard. Poor communication is a contributing factor in many industrial incidents, particularly during shift handovers and permit to work procedures. The EPA professional discussion specifically assesses the apprentice's ability to communicate technical information clearly, both verbally and in writing.",
    section: "Professional Practice",
    difficulty: "basic",
    topic: "Communication Skills",
    category: "Cross-Module Integration"
  },
  {
    id: 146,
    question: "A maintenance technician notices that the same type of contactor keeps failing across multiple motor starters in a plant. What approach demonstrates continuous improvement thinking?",
    options: [
      "Keep replacing them with the same type",
      "Investigate the common failure mode using RCA techniques, check whether the contactor rating is adequate for the application, review the operating environment and duty cycle, and propose a design improvement or alternative component to prevent recurrence across the plant",
      "Accept it as normal wear and tear",
      "Order a large stock of replacement contactors"
    ],
    correctAnswer: 1,
    explanation: "This question tests the continuous improvement behaviour expected in the MOET standard. Rather than accepting repeated failures, a competent technician applies root cause analysis, challenges existing specifications, and proposes improvements. This proactive approach demonstrates the problem-solving and initiative expected at Level 3 and would contribute strong evidence for the EPA portfolio.",
    section: "Continuous Improvement",
    difficulty: "intermediate",
    topic: "Root Cause Analysis Application",
    category: "Cross-Module Integration"
  },
  {
    id: 147,
    question: "During a professional discussion, the assessor asks how you ensure compliance with relevant legislation in your daily work. What comprehensive answer would be expected?",
    options: [
      "I follow what my supervisor tells me",
      "I apply the requirements of the Health and Safety at Work Act 1974, the Electricity at Work Regulations 1989, and relevant ACoPs and British Standards such as BS 7671, through practical actions including risk assessment, safe isolation, use of appropriate PPE, maintenance of competence, and accurate record keeping",
      "I read the regulations once during my training",
      "I rely on the company safety officer to ensure compliance"
    ],
    correctAnswer: 1,
    explanation: "The EPA expects technicians to demonstrate awareness of how legislation translates into daily practice. Citing specific legislation (HSWA 1974, EAWR 1989), standards (BS 7671), and practical applications (risk assessment, safe isolation, PPE, competence, records) shows the integrated understanding of theory and practice that distinguishes a competent Level 3 technician.",
    section: "Professional Discussion",
    difficulty: "intermediate",
    topic: "Legislative Compliance",
    category: "Cross-Module Integration"
  },
  {
    id: 148,
    question: "What is meant by 'competence' in the context of the Electricity at Work Regulations 1989, and how does the MOET apprenticeship contribute to it?",
    options: [
      "Competence simply means holding a qualification",
      "Competence is the combination of technical knowledge, practical skills, experience, and the ability to recognise and manage risk appropriate to the work being undertaken. The MOET apprenticeship develops all these elements through structured training, supervised workplace experience, and formal assessment",
      "Competence is determined solely by the number of years worked",
      "Competence is only relevant for electricians, not maintenance technicians"
    ],
    correctAnswer: 1,
    explanation: "The EAWR 1989 Regulation 16 requires persons to be competent to prevent danger and injury. The HSE defines competence as a combination of training, skills, experience, and knowledge. The MOET apprenticeship directly addresses all these elements, making it a structured pathway to achieving the competence required under the regulations for electrical maintenance work.",
    section: "Professional Practice",
    difficulty: "intermediate",
    topic: "Competence Definition",
    category: "Cross-Module Integration"
  },
  {
    id: 149,
    question: "A maintenance technician is asked to work on equipment they have not been trained on. What is the correct professional response?",
    options: [
      "Attempt the work anyway to avoid appearing unhelpful",
      "Inform the supervisor that they have not been trained on this specific equipment, request appropriate training or supervision, and offer to assist a competent colleague to develop their skills in a controlled manner",
      "Refuse all work on unfamiliar equipment permanently",
      "Watch an online video and proceed with the work"
    ],
    correctAnswer: 1,
    explanation: "This tests the professional behaviour of recognising the limits of one's competence, as required by EAWR 1989 and the MOET standard. A professional response demonstrates self-awareness, prioritises safety, communicates clearly with the supervisor, and shows initiative by seeking to develop new skills. This approach aligns with the apprenticeship behaviour of taking responsibility for personal development.",
    section: "Professional Practice",
    difficulty: "basic",
    topic: "Limits of Competence",
    category: "Cross-Module Integration"
  },
  {
    id: 150,
    question: "How does the concept of 'continuous improvement' apply to a maintenance department, and how can a technician contribute?",
    options: [
      "Continuous improvement is a management responsibility only",
      "Technicians contribute by identifying recurring failure patterns, proposing improvements to maintenance procedures, feeding back accurate data through the CMMS, sharing knowledge with colleagues, suggesting energy-saving measures, and participating in root cause analysis following significant failures",
      "Continuous improvement means working faster",
      "It only applies to production departments"
    ],
    correctAnswer: 1,
    explanation: "Continuous improvement is a key behaviour in the MOET standard. Maintenance technicians are uniquely placed to identify improvement opportunities because they work directly with the equipment. Contributing to CMMS data accuracy, participating in RCA, sharing knowledge, and proposing practical improvements are all ways technicians drive continuous improvement in reliability, safety, and efficiency.",
    section: "Continuous Improvement",
    difficulty: "basic",
    topic: "Continuous Improvement",
    category: "Cross-Module Integration"
  }
];
