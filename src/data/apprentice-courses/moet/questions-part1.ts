// MOET Level 3 - Maintenance & Operations Engineering Technician (ST1426)
// Electrical Engineering Maintenance Technician Pathway
// Questions Part 1: Module 1 (Health, Safety & Compliance) and Module 2 (Engineering Principles & Electrical Theory)
// Questions 1-40

import type { StandardMockQuestion } from '@/types/standardMockExam';

export const questionsPart1: StandardMockQuestion[] = [
  // ============================================================
  // MODULE 1: HEALTH, SAFETY & COMPLIANCE (Questions 1-20)
  // ============================================================

  // Permit to Work & Isolation (Questions 1-5)
  {
    id: 1,
    question: "What is the primary purpose of a permit to work system in an industrial environment?",
    options: [
      "To record attendance of maintenance personnel on site",
      "To provide a formal documented procedure ensuring work is carried out safely on high-risk activities",
      "To allocate budget for maintenance tasks",
      "To schedule planned preventive maintenance activities"
    ],
    correctAnswer: 1,
    explanation: "A permit to work (PTW) system provides a formal, documented procedure that ensures high-risk work activities (such as hot work, confined space entry, electrical isolation) are carried out safely with all necessary precautions in place. It defines responsibilities, hazards, and controls before work commences.",
    section: "Permit to Work",
    difficulty: "basic",
    topic: "PTW Systems",
    category: "Health, Safety & Compliance"
  },
  {
    id: 2,
    question: "When carrying out safe isolation of an electrical circuit, what is the correct sequence of steps?",
    options: [
      "Lock off, identify circuit, prove dead, test instrument",
      "Identify circuit, obtain permission, isolate, lock off, prove dead using a proven test instrument",
      "Switch off, remove fuses, start work immediately",
      "Test with a multimeter, switch off, apply lock"
    ],
    correctAnswer: 1,
    explanation: "The correct safe isolation procedure follows a strict sequence: identify the circuit to be worked on, obtain permission/permit, isolate the supply, apply lock-off devices and warning labels, prove the test instrument on a known live source, verify the circuit is dead, then prove the test instrument again. This is critical for compliance with the Electricity at Work Regulations 1989.",
    section: "Safe Isolation",
    difficulty: "basic",
    topic: "Isolation Procedures",
    category: "Health, Safety & Compliance"
  },
  {
    id: 3,
    question: "Under a lock-out/tag-out (LOTO) procedure, who is authorised to remove a personal safety lock?",
    options: [
      "Any qualified electrician on site",
      "The site manager or shift supervisor",
      "Only the person who applied the lock, unless a formally documented override procedure is followed",
      "The permit issuer alone"
    ],
    correctAnswer: 2,
    explanation: "Personal safety locks must only be removed by the individual who applied them. This ensures that no one can inadvertently re-energise a circuit while the person is still working on it. Override procedures exist for emergencies but require formal authorisation, documentation, and verification that the area is clear.",
    section: "LOTO",
    difficulty: "intermediate",
    topic: "Lock-Out/Tag-Out",
    category: "Health, Safety & Compliance"
  },
  {
    id: 4,
    question: "A maintenance technician is asked to work on a 415 V motor starter. The permit to work has been issued but the circuit has not yet been isolated. What should the technician do?",
    options: [
      "Proceed with caution using insulated tools",
      "Refuse to commence work until safe isolation has been completed and verified",
      "Ask a colleague to hold a voltage indicator while they work",
      "Begin work and isolate the circuit when convenient"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 14 of the Electricity at Work Regulations 1989, no person shall work on or near live conductors unless it is unreasonable for them to be dead, suitable precautions are taken, and it is reasonable in all circumstances. A 415 V motor starter must be isolated before work commences. The technician has a legal duty to refuse unsafe work.",
    section: "Electrical Safety",
    difficulty: "basic",
    topic: "Live Working",
    category: "Health, Safety & Compliance"
  },
  {
    id: 5,
    question: "What information must be clearly stated on a permit to work for electrical maintenance?",
    options: [
      "Only the name of the person doing the work",
      "The equipment identity, nature of work, hazards identified, precautions required, and signatures of issuer and recipient",
      "A generic risk assessment reference number",
      "The cost estimate for the maintenance task"
    ],
    correctAnswer: 1,
    explanation: "A permit to work must contain: exact identification of equipment/circuit, description of work to be done, hazards identified and precautions required (including isolation points), time limits, signatures of both the permit issuer and the person receiving the permit, and a formal handback/cancellation section when work is complete.",
    section: "Permit to Work",
    difficulty: "intermediate",
    topic: "PTW Content",
    category: "Health, Safety & Compliance"
  },

  // PPE and Risk Assessment (Questions 6-10)
  {
    id: 6,
    question: "According to the hierarchy of risk control, what is the preferred approach to managing an electrical hazard?",
    options: [
      "Provide personal protective equipment (PPE) to all workers",
      "Eliminate the hazard at source, or substitute with something less hazardous",
      "Provide training and safe systems of work only",
      "Display warning signs and rely on worker experience"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy of control (as defined in the Management of Health and Safety at Work Regulations 1999) prioritises: elimination, substitution, engineering controls, administrative controls, and PPE as the last resort. For electrical hazards, this means isolating the supply (elimination) is always preferred over relying on PPE such as arc flash suits.",
    section: "Risk Assessment",
    difficulty: "basic",
    topic: "Hierarchy of Control",
    category: "Health, Safety & Compliance"
  },
  {
    id: 7,
    question: "What category of arc flash PPE would typically be required when working on an energised 400 V motor control centre (MCC) with a calculated incident energy of 10 cal/cm²?",
    options: [
      "Category 1 (minimum 4 cal/cm²)",
      "Category 2 (minimum 8 cal/cm²)",
      "Category 3 (minimum 25 cal/cm²)",
      "No arc flash PPE is required at 400 V"
    ],
    correctAnswer: 2,
    explanation: "With an incident energy of 10 cal/cm², Category 2 arc flash PPE (rated at minimum 8 cal/cm²) would not provide sufficient protection. Category 3 (rated at minimum 25 cal/cm²) would be required to provide adequate protection above the calculated incident energy. Arc flash risk exists at any voltage where sufficient fault current is available.",
    section: "PPE",
    difficulty: "advanced",
    topic: "Arc Flash Protection",
    category: "Health, Safety & Compliance"
  },
  {
    id: 8,
    question: "When conducting a risk assessment for electrical maintenance work, which regulation requires the assessment to be 'suitable and sufficient'?",
    options: [
      "Electricity at Work Regulations 1989",
      "Management of Health and Safety at Work Regulations 1999",
      "Provision and Use of Work Equipment Regulations 1998",
      "Personal Protective Equipment at Work Regulations 2022"
    ],
    correctAnswer: 1,
    explanation: "Regulation 3 of the Management of Health and Safety at Work Regulations 1999 requires employers to carry out a 'suitable and sufficient' risk assessment. While EAWR 1989 covers electrical safety specifically, the duty to formally assess risk comes from MHSWR 1999.",
    section: "Risk Assessment",
    difficulty: "intermediate",
    topic: "Legal Requirements",
    category: "Health, Safety & Compliance"
  },
  {
    id: 9,
    question: "What class of electrical protective gloves would be required for work on a 1000 V AC system?",
    options: [
      "Class 00 (max 500 V AC)",
      "Class 0 (max 1000 V AC)",
      "Class 1 (max 7500 V AC)",
      "Class 2 (max 17000 V AC)"
    ],
    correctAnswer: 1,
    explanation: "Electrical insulating gloves are classified by their voltage rating to BS EN 60903. Class 0 gloves provide protection up to 1000 V AC and would be the minimum required for a 1000 V system. In practice, the next class up (Class 1) may be selected to provide an additional safety margin.",
    section: "PPE",
    difficulty: "intermediate",
    topic: "Insulating Gloves",
    category: "Health, Safety & Compliance"
  },
  {
    id: 10,
    question: "What is the legal status of an Approved Code of Practice (ACoP) in the UK?",
    options: [
      "It has the same legal force as an Act of Parliament",
      "It is advisory only with no legal standing",
      "It is not legally binding but failure to follow it can be used as evidence of non-compliance in court",
      "It only applies to self-employed persons"
    ],
    correctAnswer: 2,
    explanation: "Approved Codes of Practice (ACoPs) are not legally binding in themselves, but they have a special legal status. If an employer is prosecuted for a breach of health and safety law and has not followed the relevant ACoP, a court can find them at fault unless they can demonstrate they complied with the law in an equivalent or better way.",
    section: "Legislation",
    difficulty: "intermediate",
    topic: "Legal Framework",
    category: "Health, Safety & Compliance"
  },

  // HSWA 1974 & EAWR 1989 (Questions 11-16)
  {
    id: 11,
    question: "Under Section 2 of the Health and Safety at Work Act 1974, what is the employer's general duty?",
    options: [
      "To eliminate all risks in the workplace",
      "To ensure, so far as is reasonably practicable, the health, safety and welfare at work of all employees",
      "To provide PPE to all visitors",
      "To conduct weekly safety inspections"
    ],
    correctAnswer: 1,
    explanation: "Section 2(1) of HSWA 1974 places a general duty on every employer to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all employees. This includes provision of safe plant, safe systems of work, information, training, and supervision.",
    section: "HSWA 1974",
    difficulty: "basic",
    topic: "Employer Duties",
    category: "Health, Safety & Compliance"
  },
  {
    id: 12,
    question: "Regulation 4(3) of the Electricity at Work Regulations 1989 requires that every work activity on or near an electrical system shall be carried out in such a manner as not to give rise to what?",
    options: [
      "Excessive noise levels",
      "Danger, so far as is reasonably practicable",
      "Environmental pollution",
      "Damage to company property"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4(3) of EAWR 1989 states that every work activity, including operation, use and maintenance of a system and work near a system, shall be carried out in such a manner as not to give rise, so far as is reasonably practicable, to danger. This is a fundamental requirement covering all electrical work.",
    section: "EAWR 1989",
    difficulty: "basic",
    topic: "General Duties",
    category: "Health, Safety & Compliance"
  },
  {
    id: 13,
    question: "Which regulation within EAWR 1989 specifically addresses working on or near live conductors?",
    options: [
      "Regulation 4",
      "Regulation 12",
      "Regulation 14",
      "Regulation 16"
    ],
    correctAnswer: 2,
    explanation: "Regulation 14 of EAWR 1989 states that no person shall be engaged in work on or near a live conductor unless: (a) it is unreasonable in all circumstances for it to be dead, (b) it is reasonable in all the circumstances for the person to be at work on or near it while live, and (c) suitable precautions are taken to prevent injury.",
    section: "EAWR 1989",
    difficulty: "intermediate",
    topic: "Live Working",
    category: "Health, Safety & Compliance"
  },
  {
    id: 14,
    question: "Under HSWA 1974, what duty does Section 7 place on employees?",
    options: [
      "To provide their own safety equipment",
      "To take reasonable care for the health and safety of themselves and others who may be affected by their acts or omissions",
      "To write risk assessments for all their tasks",
      "To report all accidents to the HSE directly"
    ],
    correctAnswer: 1,
    explanation: "Section 7 of HSWA 1974 requires every employee to take reasonable care for the health and safety of themselves and of other persons who may be affected by their acts or omissions at work. Employees must also cooperate with their employer to enable compliance with statutory duties.",
    section: "HSWA 1974",
    difficulty: "basic",
    topic: "Employee Duties",
    category: "Health, Safety & Compliance"
  },
  {
    id: 15,
    question: "The Provision and Use of Work Equipment Regulations 1998 (PUWER) require that work equipment is suitable for its intended purpose. How does this apply to a voltage indicating device used for proving dead?",
    options: [
      "Any multimeter can be used for proving dead",
      "The device must comply with GS 38, be in calibration, and be proved on a known live source before and after use",
      "Only devices purchased in the last year may be used",
      "The device only needs to be tested annually"
    ],
    correctAnswer: 1,
    explanation: "PUWER requires work equipment to be suitable, maintained, and used by trained people. For voltage indicating devices, HSE Guidance Note GS 38 specifies requirements including fused test leads, finger guards, and proving units. The device must be proved on a known live source before and after testing to confirm it is functioning correctly.",
    section: "PUWER 1998",
    difficulty: "intermediate",
    topic: "Test Equipment",
    category: "Health, Safety & Compliance"
  },
  {
    id: 16,
    question: "Under RIDDOR 2013, which of the following electrical incidents must be reported to the HSE?",
    options: [
      "A minor electric shock with no injury requiring hospital treatment",
      "An electrical burn requiring hospital treatment, or any electrical incident causing loss of consciousness",
      "A blown fuse in a distribution board",
      "A failed PAT test result"
    ],
    correctAnswer: 1,
    explanation: "Under RIDDOR 2013 (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations), electrical injuries requiring hospital treatment, loss of consciousness from electric shock, or dangerous occurrences involving electrical short circuits or overloads causing fire or explosion must be reported to the HSE.",
    section: "RIDDOR",
    difficulty: "intermediate",
    topic: "Incident Reporting",
    category: "Health, Safety & Compliance"
  },

  // BS 7671 & Compliance (Questions 17-20)
  {
    id: 17,
    question: "What is the legal status of BS 7671:2018+A3:2024 (the IET Wiring Regulations)?",
    options: [
      "It is a statutory regulation that carries criminal penalties",
      "It is a non-statutory British Standard, but is referenced by statutory regulations such as EAWR 1989 as a means of compliance",
      "It only applies to domestic installations",
      "It has no connection to any legislation"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 is a British Standard, not a statutory regulation. However, compliance with BS 7671 is widely regarded as meeting the requirements of the Electricity at Work Regulations 1989. It is also referenced in Building Regulations Approved Document P. Non-compliance does not automatically constitute a criminal offence but may be used as evidence of negligence.",
    section: "BS 7671",
    difficulty: "intermediate",
    topic: "Legal Status",
    category: "Health, Safety & Compliance"
  },
  {
    id: 18,
    question: "What does BS 7671 require regarding the maximum disconnection time for a 230 V final circuit not exceeding 32 A?",
    options: [
      "5 seconds",
      "0.4 seconds",
      "0.2 seconds",
      "1 second"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Table 41.1 requires a maximum disconnection time of 0.4 seconds for final circuits not exceeding 63 A in a TN system at 230 V. This ensures rapid disconnection of the supply in the event of a fault to limit the duration of electric shock to a safe level.",
    section: "BS 7671",
    difficulty: "intermediate",
    topic: "Disconnection Times",
    category: "Health, Safety & Compliance"
  },
  {
    id: 19,
    question: "Under Regulation 12 of EAWR 1989, what must be ensured about the means of cutting off the supply and isolation of electrical equipment?",
    options: [
      "A verbal instruction to switch off is sufficient",
      "Suitable means shall be available for cutting off the supply and for isolation, and these must be capable of being secured in the OFF position",
      "Only the site manager needs to know where isolators are located",
      "Isolation is only required for circuits above 1000 V"
    ],
    correctAnswer: 1,
    explanation: "Regulation 12 of EAWR 1989 requires that where necessary to prevent danger, suitable means shall be available for cutting off the supply and isolating any electrical equipment. The means of isolation must be capable of being secured to prevent inadvertent re-energisation, which is the basis for lock-off procedures.",
    section: "EAWR 1989",
    difficulty: "basic",
    topic: "Isolation Requirements",
    category: "Health, Safety & Compliance"
  },
  {
    id: 20,
    question: "A maintenance technician discovers a colleague has received an electric shock and is still in contact with the live source. What is the correct first action?",
    options: [
      "Pull them away from the source immediately with bare hands",
      "Isolate the electrical supply if it can be done quickly and safely, or use a non-conducting object to separate them from the source",
      "Call an ambulance and wait for them to arrive",
      "Apply CPR while they are still in contact with the source"
    ],
    correctAnswer: 1,
    explanation: "The first priority is to remove the danger by isolating the supply if this can be done quickly and safely. If not, use a dry non-conducting object (such as a wooden broom handle) to separate the casualty from the live source. Never touch the casualty directly while they are in contact with the live source as you may also receive a shock.",
    section: "Emergency Response",
    difficulty: "basic",
    topic: "Electric Shock Response",
    category: "Health, Safety & Compliance"
  },

  // ============================================================
  // MODULE 2: ENGINEERING PRINCIPLES & ELECTRICAL THEORY (Questions 21-40)
  // ============================================================

  // Ohm's Law and Basic Theory (Questions 21-26)
  {
    id: 21,
    question: "A 415 V three-phase motor draws a line current of 25 A at a power factor of 0.85. What is the total power consumed?",
    options: [
      "10.375 kW",
      "15.27 kW",
      "17.97 kW",
      "25.5 kW"
    ],
    correctAnswer: 1,
    explanation: "Three-phase power is calculated using P = root(3) x V_L x I_L x pf. So P = 1.732 x 415 x 25 x 0.85 = 15,270 W or approximately 15.27 kW. This formula applies to balanced three-phase loads and is essential knowledge for maintenance technicians sizing cables and protective devices.",
    section: "Electrical Theory",
    difficulty: "intermediate",
    topic: "Three-Phase Power",
    category: "Engineering Principles & Electrical Theory"
  },
  {
    id: 22,
    question: "According to Kirchhoff's Current Law (KCL), what is true at any junction (node) in an electrical circuit?",
    options: [
      "The voltage across all components is equal",
      "The total current entering the node equals the total current leaving the node",
      "The resistance at the node is always zero",
      "Power is neither created nor destroyed at the node"
    ],
    correctAnswer: 1,
    explanation: "Kirchhoff's Current Law states that the algebraic sum of currents at any node in a circuit is zero, meaning the total current flowing into a node equals the total current flowing out. This is fundamental to analysing parallel circuits and distribution boards in maintenance work.",
    section: "Kirchhoff's Laws",
    difficulty: "basic",
    topic: "KCL",
    category: "Engineering Principles & Electrical Theory"
  },
  {
    id: 23,
    question: "A circuit has three resistors in parallel: 10 ohm, 20 ohm, and 30 ohm. What is the total resistance of the parallel combination?",
    options: [
      "60 ohm",
      "5.45 ohm",
      "20 ohm",
      "6.67 ohm"
    ],
    correctAnswer: 1,
    explanation: "For resistors in parallel: 1/R_total = 1/R1 + 1/R2 + 1/R3 = 1/10 + 1/20 + 1/30 = 6/60 + 3/60 + 2/60 = 11/60. Therefore R_total = 60/11 = 5.45 ohm. The total resistance of a parallel combination is always less than the smallest individual resistance.",
    section: "Electrical Theory",
    difficulty: "basic",
    topic: "Parallel Resistance",
    category: "Engineering Principles & Electrical Theory"
  },
  {
    id: 24,
    question: "Kirchhoff's Voltage Law (KVL) states that around any closed loop in a circuit, what is the sum of all voltages?",
    options: [
      "Equal to the supply voltage",
      "Equal to zero",
      "Equal to the total current multiplied by total resistance",
      "Always positive"
    ],
    correctAnswer: 1,
    explanation: "Kirchhoff's Voltage Law states that the algebraic sum of all voltages around any closed loop in a circuit equals zero. This means the sum of voltage drops across components equals the sum of voltage sources in the loop. This principle is essential for fault finding on series circuits.",
    section: "Kirchhoff's Laws",
    difficulty: "basic",
    topic: "KVL",
    category: "Engineering Principles & Electrical Theory"
  },
  {
    id: 25,
    question: "A 230 V single-phase heater has a resistance of 26.5 ohm. What current does it draw?",
    options: [
      "6.10 A",
      "8.68 A",
      "10.00 A",
      "2.00 kW"
    ],
    correctAnswer: 1,
    explanation: "Using Ohm's Law: I = V / R = 230 / 26.5 = 8.68 A. Ohm's Law (V = IR) is the most fundamental relationship in electrical engineering and is used constantly in maintenance work for calculating expected currents, checking measured values, and sizing components.",
    section: "Ohm's Law",
    difficulty: "basic",
    topic: "Current Calculation",
    category: "Engineering Principles & Electrical Theory"
  },
  {
    id: 26,
    question: "What is the relationship between peak voltage (V_pk) and RMS voltage (V_rms) for a sinusoidal AC waveform?",
    options: [
      "V_rms = V_pk x 2",
      "V_rms = V_pk / root(2), approximately 0.707 x V_pk",
      "V_rms = V_pk x root(2)",
      "V_rms = V_pk / 2"
    ],
    correctAnswer: 1,
    explanation: "For a sinusoidal waveform, V_rms = V_pk / root(2) = 0.707 x V_pk. The UK mains voltage of 230 V is an RMS value; the peak voltage is 230 x 1.414 = 325.3 V. RMS (root mean square) represents the equivalent DC voltage that would produce the same heating effect in a resistive load.",
    section: "AC Theory",
    difficulty: "intermediate",
    topic: "RMS Values",
    category: "Engineering Principles & Electrical Theory"
  },

  // AC/DC Theory and Transformers (Questions 27-33)
  {
    id: 27,
    question: "In a three-phase star-connected system, what is the relationship between line voltage and phase voltage?",
    options: [
      "V_line = V_phase",
      "V_line = root(3) x V_phase",
      "V_line = V_phase / root(3)",
      "V_line = 3 x V_phase"
    ],
    correctAnswer: 1,
    explanation: "In a star (wye) connection, V_line = root(3) x V_phase. For the UK supply: V_phase = 230 V, V_line = 230 x 1.732 = 400 V (approximately 415 V historically). Understanding star and delta relationships is essential for maintenance technicians working with three-phase industrial equipment.",
    section: "AC Theory",
    difficulty: "intermediate",
    topic: "Three-Phase Systems",
    category: "Engineering Principles & Electrical Theory"
  },
  {
    id: 28,
    question: "A single-phase transformer has a primary winding of 1000 turns and a secondary winding of 50 turns. If the primary voltage is 11 kV, what is the secondary voltage?",
    options: [
      "230 V",
      "550 V",
      "415 V",
      "110 V"
    ],
    correctAnswer: 1,
    explanation: "Using the transformer turns ratio: V2/V1 = N2/N1. Therefore V2 = V1 x (N2/N1) = 11000 x (50/1000) = 550 V. Transformer ratios are fundamental to understanding power distribution in industrial settings, from the incoming HV supply through to utilisation voltage.",
    section: "Transformers",
    difficulty: "intermediate",
    topic: "Turns Ratio",
    category: "Engineering Principles & Electrical Theory"
  },
  {
    id: 29,
    question: "What is the primary function of a transformer's core?",
    options: [
      "To conduct electrical current between windings",
      "To provide a low-reluctance path for magnetic flux, enabling efficient energy transfer between windings",
      "To act as a heat sink for the windings",
      "To provide structural support for the windings only"
    ],
    correctAnswer: 1,
    explanation: "The transformer core (typically laminated silicon steel) provides a low-reluctance path for the magnetic flux generated by the primary winding, ensuring efficient coupling to the secondary winding. Laminations reduce eddy current losses. Core condition is an important factor in transformer maintenance and condition monitoring.",
    section: "Transformers",
    difficulty: "basic",
    topic: "Transformer Construction",
    category: "Engineering Principles & Electrical Theory"
  },
  {
    id: 30,
    question: "In a purely inductive AC circuit, what is the phase relationship between voltage and current?",
    options: [
      "Voltage and current are in phase",
      "Current leads voltage by 90 degrees",
      "Current lags voltage by 90 degrees",
      "Current lags voltage by 45 degrees"
    ],
    correctAnswer: 2,
    explanation: "In a purely inductive circuit, the current lags the voltage by 90 degrees (pi/2 radians). This is because the inductor opposes changes in current. The mnemonic 'CIVIL' helps remember: in a Capacitor, I (current) leads V (voltage); in an Inductor, V leads I (current Lags).",
    section: "AC Theory",
    difficulty: "intermediate",
    topic: "Phase Relationships",
    category: "Engineering Principles & Electrical Theory"
  },
  {
    id: 31,
    question: "A capacitor bank is connected to an industrial installation. What is its primary purpose?",
    options: [
      "To increase the supply voltage",
      "To improve the power factor by providing leading reactive current to offset the lagging reactive current drawn by inductive loads",
      "To store energy for emergency lighting",
      "To reduce harmonic distortion"
    ],
    correctAnswer: 1,
    explanation: "Power factor correction capacitors provide leading reactive current (kVAr) that offsets the lagging reactive current drawn by inductive loads such as motors and transformers. This improves the power factor towards unity, reducing the total current drawn from the supply, which reduces losses and avoids reactive power charges from the electricity supplier.",
    section: "AC Theory",
    difficulty: "intermediate",
    topic: "Power Factor Correction",
    category: "Engineering Principles & Electrical Theory"
  },
  {
    id: 32,
    question: "What is the impedance of a series RL circuit with resistance of 30 ohm and inductive reactance of 40 ohm?",
    options: [
      "70 ohm",
      "50 ohm",
      "10 ohm",
      "35 ohm"
    ],
    correctAnswer: 1,
    explanation: "Impedance in a series RL circuit is calculated using Z = root(R² + X_L²) = root(30² + 40²) = root(900 + 1600) = root(2500) = 50 ohm. This is a Pythagorean relationship because resistance and reactance are 90 degrees apart in the impedance triangle.",
    section: "AC Theory",
    difficulty: "intermediate",
    topic: "Impedance",
    category: "Engineering Principles & Electrical Theory"
  },
  {
    id: 33,
    question: "What is the frequency of the UK mains electrical supply?",
    options: [
      "60 Hz",
      "50 Hz",
      "55 Hz",
      "45 Hz"
    ],
    correctAnswer: 1,
    explanation: "The UK mains frequency is 50 Hz (50 cycles per second), as specified in the Electricity Safety, Quality and Continuity Regulations 2002 (ESQCR). The frequency is maintained within tight limits by the National Grid. Motor speeds, transformer design, and protective relay settings are all dependent on the supply frequency.",
    section: "AC Theory",
    difficulty: "basic",
    topic: "Supply Frequency",
    category: "Engineering Principles & Electrical Theory"
  },

  // Motors, Protection and Earthing (Questions 34-40)
  {
    id: 34,
    question: "What is the synchronous speed of a 4-pole induction motor connected to a 50 Hz supply?",
    options: [
      "3000 rpm",
      "1500 rpm",
      "750 rpm",
      "1000 rpm"
    ],
    correctAnswer: 1,
    explanation: "Synchronous speed n_s = (120 x f) / p, where f is frequency and p is the number of poles. n_s = (120 x 50) / 4 = 1500 rpm. The actual rotor speed of an induction motor will be slightly less than synchronous speed due to slip, which is necessary for torque production. A typical 4-pole motor might run at 1450-1480 rpm.",
    section: "Motors",
    difficulty: "intermediate",
    topic: "Motor Speed",
    category: "Engineering Principles & Electrical Theory"
  },
  {
    id: 35,
    question: "What is the purpose of earthing (grounding) in an electrical installation?",
    options: [
      "To improve the power factor of the installation",
      "To provide a low-impedance path for fault current, enabling protective devices to operate and disconnect the supply quickly",
      "To reduce the electricity bill",
      "To increase the voltage available at the load"
    ],
    correctAnswer: 1,
    explanation: "The primary purpose of earthing is to provide a low-impedance path for fault current to flow back to the source, enabling protective devices (fuses, circuit breakers, RCDs) to detect the fault and disconnect the supply quickly. This limits the touch voltage and duration of exposure, protecting people from electric shock. BS 7671 Chapter 41 covers this requirement.",
    section: "Earthing",
    difficulty: "basic",
    topic: "Purpose of Earthing",
    category: "Engineering Principles & Electrical Theory"
  },
  {
    id: 36,
    question: "In a TN-S earthing system, what provides the earth fault return path?",
    options: [
      "The general mass of earth",
      "A separate metallic conductor (usually the cable sheath) provided by the distributor throughout the distribution system",
      "A local earth electrode at the installation",
      "The neutral conductor"
    ],
    correctAnswer: 1,
    explanation: "In a TN-S (Terra-Neutral-Separate) system, the earth and neutral are separate conductors throughout. The earth fault return path is provided by a separate metallic conductor, typically the lead sheath or steel wire armour of the distributor's cable. This provides a reliable, low-impedance earth fault path independent of soil conditions.",
    section: "Earthing",
    difficulty: "intermediate",
    topic: "Earthing Systems",
    category: "Engineering Principles & Electrical Theory"
  },
  {
    id: 37,
    question: "An induction motor nameplate shows 'DOL' starting method. What does this mean and what is the typical starting current?",
    options: [
      "Direct On Line - starting current is approximately equal to full load current",
      "Direct On Line - starting current is typically 6 to 8 times full load current",
      "Dual Output Load - starting current is half the full load current",
      "Direct On Line - starting current is twice the full load current"
    ],
    correctAnswer: 1,
    explanation: "DOL (Direct On Line) means the motor is connected directly to the full supply voltage at start-up. The starting current (also called locked rotor current) is typically 6 to 8 times the full load current (FLC). This high starting current must be considered when selecting protective devices, cables, and assessing the impact on the supply network.",
    section: "Motors",
    difficulty: "intermediate",
    topic: "Motor Starting",
    category: "Engineering Principles & Electrical Theory"
  },
  {
    id: 38,
    question: "What is the purpose of a residual current device (RCD) in an electrical installation?",
    options: [
      "To protect against overload current only",
      "To detect an imbalance between line and neutral current, indicating earth leakage, and disconnect the supply",
      "To protect against short circuit current only",
      "To regulate the supply voltage"
    ],
    correctAnswer: 1,
    explanation: "An RCD monitors the balance between current flowing in the line conductor and current returning via the neutral. Any difference (residual current) indicates that current is leaking to earth, possibly through a person. When the residual current exceeds the rated sensitivity (e.g., 30 mA for additional protection against electric shock), the RCD trips and disconnects the supply.",
    section: "Protection",
    difficulty: "basic",
    topic: "RCD Operation",
    category: "Engineering Principles & Electrical Theory"
  },
  {
    id: 39,
    question: "What type of protective device discrimination ensures that only the device nearest to a fault operates, leaving upstream supplies intact?",
    options: [
      "Back-up protection",
      "Discrimination (selectivity or coordination)",
      "Time grading only",
      "Current limiting"
    ],
    correctAnswer: 1,
    explanation: "Discrimination (also called selectivity or coordination) ensures that the protective device closest to the fault operates first, isolating only the faulty circuit while maintaining supply to healthy circuits. This is achieved through a combination of time grading, current grading, and the use of manufacturers' discrimination tables. It is essential for maintaining plant availability.",
    section: "Protection",
    difficulty: "advanced",
    topic: "Discrimination",
    category: "Engineering Principles & Electrical Theory"
  },
  {
    id: 40,
    question: "A three-phase delta-connected motor has a line voltage of 400 V. What is the voltage across each motor winding?",
    options: [
      "230 V",
      "400 V",
      "692 V",
      "133 V"
    ],
    correctAnswer: 1,
    explanation: "In a delta connection, each winding is connected directly between two line conductors, so the voltage across each winding equals the line voltage. Therefore V_phase = V_line = 400 V. In contrast, in a star connection, V_phase = V_line / root(3) = 230 V. Understanding this is critical when checking motor winding connections during maintenance.",
    section: "Motors",
    difficulty: "intermediate",
    topic: "Delta Connection",
    category: "Engineering Principles & Electrical Theory"
  }
];
