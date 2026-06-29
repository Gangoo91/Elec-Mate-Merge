// Level 3 Module 5: Inspection, Testing & Commissioning - Question Bank
// ~250 questions covering 2365-03 Unit 304 (LO1-11) + 2357 Unit 607 ELTK06 (LO1-5)
// + 2366-03 Unit 302 (LO1-8). 136 effective ACs.
// BS 7671 18th Edn Amendment 4:2026 throughout.
// Heavy verbatim citations from bs7671_facets (Part 6 + GN3 + BPG4).
// Difficulty mix: ~40% basic / ~45% intermediate / ~15% advanced.

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

export const module5Questions: Question[] = [
  // ============================================================
  // LO1: Safe Isolation, EAWR & Health and Safety (Q1-30)
  // 304 AC1.1-1.6, 607 AC1.1-1.5, 302 AC1.1-1.5
  // ============================================================
  {
    id: 1,
    question:
      'Under the Electricity at Work Regulations 1989 Reg 14, live working is only permitted when:',
    options: [
      'The supply voltage does not exceed 230V AND the circuit is protected by a 30mA RCD AND the worker holds a current ECS card',
      'It is unreasonable in all the circumstances to make dead, AND it is reasonable to work live, AND suitable precautions are taken',
      'The duty holder has issued a written permit-to-work AND a second competent person is present AND the work lasts no longer than one hour',
      'It would cause unacceptable disruption to make dead, OR the client refuses isolation, OR insulated tools are available on site',
    ],
    correctAnswer: 1,
    explanation:
      'EAWR 1989 Reg 14 imposes three cumulative tests. All three must be met; failing any one makes live working a criminal offence under the Regulations.',
    section: '1.1',
    difficulty: 'intermediate',
  },
  {
    id: 2,
    question:
      'The correct sequence for safe isolation in accordance with HSG85 and the Electrical Safety First Best Practice Guide 2 is:',
    options: [
      'Switch off, test dead with a multimeter, lock off and apply a caution notice once confirmed dead',
      'Identify circuit, prove the indicator dead, isolate, test the circuit, then lock off afterwards',
      'Identify, switch off, secure isolation, prove indicator live, test for absence of voltage, re-prove live',
      'Lock off the supply, test for voltage, prove the indicator live, then switch off and apply notices',
    ],
    correctAnswer: 2,
    explanation:
      'Best Practice Guide 2 requires the identify-isolate-secure then prove-test-prove sequence, using an approved GS38-compliant two-pole voltage indicator (NOT a multimeter) and a known live proving unit.',
    section: '1.2',
    difficulty: 'intermediate',
  },
  {
    id: 3,
    question:
      'Which test instrument is the ONLY device acceptable for proving dead during safe isolation?',
    options: [
      'A digital multimeter set to the AC voltage range, provided the leads carry GS38-compliant fused probes',
      'A non-contact voltage detector (volt-stick), as it requires no physical contact with live parts',
      'A mains-test neon screwdriver, provided it is checked against a known live source first',
      'Two-pole approved voltage indicator complying with GS38 (e.g. Martindale VI-13800, Drummond MTL10)',
    ],
    correctAnswer: 3,
    explanation:
      'HSE GS38 requires a dedicated two-pole voltage indicator with finger-barriers, fused tips, and probes exposing no more than 4mm of metal. Multimeters and neons are explicitly unsafe.',
    section: '1.2',
    difficulty: 'basic',
  },
  {
    id: 4,
    question: 'Why must the voltage indicator be proved on a known live source both before and after testing the circuit?',
    options: [
      'To confirm the indicator was working immediately before AND immediately after the dead test, eliminating the risk of a faulty indicator giving a false dead reading',
      'To allow the battery in the indicator to be calibrated against the supply voltage before relying on the dead reading',
      'To satisfy the manufacturer warranty condition that the indicator is checked against a live source at the start of each working day',
      'To confirm the proving unit output matches the nominal supply voltage so the dead reading can be quantified accurately',
    ],
    correctAnswer: 0,
    explanation:
      'A voltage indicator can fail open-circuit between the two proves, giving a dangerous false-dead. Proving immediately before AND after closes that gap.',
    section: '1.2',
    difficulty: 'intermediate',
  },
  {
    id: 5,
    question:
      'The implications of failing to carry out safe isolation include all of the following EXCEPT:',
    options: [
      'Electric shock or arc-flash injury or fatality',
      'Automatic compensation from the DNO',
      'RIDDOR-reportable dangerous occurrence',
      'Personal liability under EAWR Reg 14',
    ],
    correctAnswer: 1,
    explanation:
      'Failed isolation can cause shock, fire, RIDDOR-reportable events, and EAWR/HASAWA prosecution of both worker and employer. The DNO has no liability for contractor negligence.',
    section: '1.4',
    difficulty: 'basic',
  },
  {
    id: 6,
    question:
      'When isolating a single circuit at a domestic consumer unit, the most secure method of preventing inadvertent re-energisation is:',
    options: [
      'Place a clearly written warning label over the MCB toggle instructing others not to switch it on',
      'Switch the MCB to the off position and inform the householder verbally that work is in progress',
      'Use a single-pole MCB lock-off device with a personal padlock, the only key retained by the person doing the work, plus a caution notice',
      'Remove the circuit fuse carrier and keep it in your pocket while working on the circuit',
    ],
    correctAnswer: 2,
    explanation:
      'A personal padlock with sole key retention prevents anyone from re-energising. A sticker or instruction can be ignored or overridden.',
    section: '1.2',
    difficulty: 'basic',
  },
  {
    id: 7,
    question:
      'Implications of carrying out safe isolation that the inspector must mitigate include:',
    options: [
      'Reduced cable temperature once de-energised, needing re-measurement of conductor resistance',
      'Loss of the proving unit reference voltage, preventing the indicator from being re-proved',
      'Increased prospective fault current at the origin while the installation is off-load',
      'Loss of supply to other users, life-safety systems, refrigeration and IT equipment',
    ],
    correctAnswer: 3,
    explanation:
      '2357 AC 1.3 requires consideration of the wider implications: other personnel, customers, public, and building systems (fire alarm, emergency lighting, refrigeration, IT). Pre-warning, scheduling, and temporary supplies may be needed.',
    section: '1.3',
    difficulty: 'intermediate',
  },
  {
    id: 8,
    question:
      'Under the Health and Safety at Work etc Act 1974 (HASAWA), the duty to provide a safe system of work for inspection and testing rests primarily with:',
    options: [
      'The employer (with co-operation duties on the employee under s.7)',
      'The individual employee, since s.7 makes each worker solely responsible for their own safe system of work',
      'The Health and Safety Executive, as the enforcing authority that approves each method statement',
      'The client/duty holder commissioning the work, who carries the primary duty under s.3',
    ],
    correctAnswer: 0,
    explanation:
      'HASAWA s.2 places the primary duty on the employer; s.7 places a co-operation/reasonable care duty on every employee. Self-employed inspectors carry both duties.',
    section: '1.6',
    difficulty: 'basic',
  },
  {
    id: 9,
    question:
      'GS38-compliant test leads must have which of the following features?',
    options: [
      'Unshrouded crocodile clips, bare 20mm probe tips, and unfused leads to ensure a positive contact',
      'Finger barriers, shrouded probes exposing no more than 4mm of metal, and fused tips (typically 500mA HRC)',
      'Retractable probe tips exposing 15mm of metal, colour-coded sheaths, and a 13A fuse in each lead',
      'Coiled leads at least 3m long, moulded plugs, and no fuses so the full fault current can be measured',
    ],
    correctAnswer: 1,
    explanation:
      'HSE GS38 (4th edition) requires finger barriers, ≤4mm metal exposed at the tip, and HRC fuses in test leads to limit fault energy.',
    section: '1.6',
    difficulty: 'intermediate',
  },
  {
    id: 10,
    question:
      'A risk assessment for inspection and testing of an occupied commercial unit must consider:',
    options: [
      'Only the electrical shock and arc-flash hazards, since other risks are covered by the building occupier',
      'Only the prospective fault current and earth loop impedance values measured at the origin',
      'Electrical hazards, working at height, manual handling, slips/trips, lone working, occupant disruption, and emergency arrangements',
      'Only the competence and qualifications of the personnel carrying out the testing work',
    ],
    correctAnswer: 2,
    explanation:
      'Management of Health and Safety at Work Regulations 1999 Reg 3 requires a suitable and sufficient assessment of all foreseeable risks, not just electrical ones.',
    section: '1.6',
    difficulty: 'intermediate',
  },
  {
    id: 11,
    question:
      'When a person other than the original isolator returns to work on a previously isolated circuit, they must:',
    options: [
      'Accept the existing lock-off and caution notice as proof the circuit remains dead without re-testing',
      'Ask the original isolator to confirm verbally that the circuit is still isolated before starting work',
      'Check that the caution notice is still in place and the padlock has not been disturbed, then begin work',
      'Re-prove dead independently using their own GS38 voltage indicator and known live proving unit',
    ],
    correctAnswer: 3,
    explanation:
      'Each competent person must satisfy themselves the circuit is dead. Trust without re-proving has caused fatalities.',
    section: '1.2',
    difficulty: 'intermediate',
  },
  {
    id: 12,
    question:
      'PPE for live testing (where unavoidable) of LV switchgear should as a minimum include:',
    options: [
      'Arc-rated clothing to the incident energy, voltage-rated insulated gloves, face protection, insulated footwear',
      'Standard cotton overalls, latex examination gloves, and safety glasses to BS EN 166 for splash protection',
      'High-visibility vest, steel-toe-capped boots, and a hard hat as required for general construction site work',
      'Cut-resistant gloves, ear defenders, and a dust mask to protect against contaminants inside the switchgear',
    ],
    correctAnswer: 0,
    explanation:
      'Arc-flash PPE selection follows incident-energy assessment per IEEE 1584/Energy Networks Association guidance; gloves must be voltage-class rated and in-date, with arc-rated clothing, face protection and insulated footwear.',
    section: '1.6',
    difficulty: 'advanced',
  },
  {
    id: 13,
    question:
      'A permit-to-work for HV inspection differs from a sanction-to-test in that a permit:',
    options: [
      'Authorises defined live testing on equipment that must remain energised under controlled conditions',
      'Authorises work on equipment confirmed dead and earthed',
      'Is issued verbally for short-duration tasks, whereas a sanction-to-test must always be in writing',
      'Allows any competent person to remove the earths without the issuing authority being notified',
    ],
    correctAnswer: 1,
    explanation:
      'Permit-to-work is for dead-and-earthed conditions; sanction-to-test allows defined live testing under controlled conditions. Both must be in writing and competently issued.',
    section: '1.6',
    difficulty: 'advanced',
  },
  {
    id: 14,
    question:
      'When isolating at the consumer unit using the main switch only, the inspector must additionally:',
    options: [
      'Disconnect the main earthing conductor at the MET so that no fault path remains during the work',
      'Switch off every individual circuit breaker as well, since the main switch alone does not break the neutral',
      'Lock off the main switch with a personal padlock and post a caution notice — and prove dead at the point of work',
      'Withdraw the DNO service fuse, as the main switch does not provide a secure means of isolation',
    ],
    correctAnswer: 2,
    explanation:
      'Switching alone is not isolation. A securable means of disconnection (padlock, removable handle) plus signage and dead-testing at the work point are all required.',
    section: '1.2',
    difficulty: 'basic',
  },
  {
    id: 15,
    question:
      'Why is testing carried out before energising any new installation?',
    options: [
      'To allow the test instrument batteries to be conditioned against the supply before live testing begins',
      'To satisfy the DNO requirement that the installation is proven before they connect the service cut-out',
      'To warm the conductors to operating temperature so that loop impedance readings are accurate',
      'To detect faults (short circuits, mis-wiring, low IR, missing CPC) BEFORE applying voltage that could cause shock, fire, or equipment damage',
    ],
    correctAnswer: 3,
    explanation:
      'Dead tests verify the integrity of insulation, conductors, and protection BEFORE energisation, preventing dangerous first-energisation faults.',
    section: '1.6',
    difficulty: 'basic',
  },
  {
    id: 16,
    question:
      'A pre-job survey before initial verification typically includes:',
    options: [
      'Confirming scope, supply characteristics, design data availability, accessibility, occupancy, and previous certification',
      'Measuring earth fault loop impedance and prospective fault current at every accessory in advance',
      'Completing the full Schedule of Test Results before any inspection or testing is carried out',
      'Energising the installation and recording RCD trip times to establish a baseline before work begins',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 Reg 132 and 133 require sufficient information to design and verify; the inspector confirms this is available before starting.',
    section: '1.6',
    difficulty: 'intermediate',
  },
  {
    id: 17,
    question:
      'For live working that meets the EAWR Reg 14 three-test threshold, suitable precautions typically include:',
    options: [
      'A 30mA RCD on the circuit, a fire extinguisher to hand, and the supply voltage reduced to 110V CTE',
      'Insulated tools and mat, GS38 leads, arc-rated PPE, a competent accompanying person, and barriers',
      'A signed permit-to-work, a witness statement, and confirmation that the circuit has been proven dead',
      'A calibrated multifunction tester, the manufacturer instructions, and the previous certificate for reference',
    ],
    correctAnswer: 1,
    explanation:
      'EAWR Reg 14(c) requires "such precautions as will prevent injury", which in practice means engineered, procedural, and PPE controls collectively, plus a documented procedure.',
    section: '1.6',
    difficulty: 'advanced',
  },
  {
    id: 18,
    question:
      'When working in a domestic property with vulnerable occupants (e.g. medical equipment, elderly), pre-isolation actions include:',
    options: [
      'Isolate the supply without warning so the work can be completed as quickly as possible to minimise disruption',
      'Rely on the occupant to notice the loss of supply and contact their care provider if needed',
      'Notify the occupant in advance, agree timings, identify life-safety equipment dependent on supply, plan temporary arrangements where required, document agreement',
      'Leave the medical equipment energised on a separate circuit while isolating the rest of the installation',
    ],
    correctAnswer: 2,
    explanation:
      'Implications of safe isolation extend beyond the worker; vulnerable occupants require advance planning to avoid harm from supply loss.',
    section: '1.3',
    difficulty: 'intermediate',
  },
  {
    id: 19,
    question:
      'A near-miss (e.g. discovering an isolated circuit is actually live) must be:',
    options: [
      'Ignored if no injury resulted, since RIDDOR only applies where a person is actually harmed',
      'Recorded informally in the engineer notebook but not escalated unless it happens a second time',
      'Reported only to the DNO, who are responsible for investigating all supply-related incidents',
      'Stopped, made safe, investigated for root cause, and reported per the company H&S policy and (if a dangerous occurrence) RIDDOR',
    ],
    correctAnswer: 3,
    explanation:
      'A failed isolation is a dangerous occurrence under RIDDOR Schedule 2; investigation and reporting prevent recurrence.',
    section: '1.4',
    difficulty: 'intermediate',
  },
  {
    id: 20,
    question:
      'On a TN-C-S supply, before disconnecting the main earthing conductor for testing (e.g. Ze), the inspector must:',
    options: [
      'Switch off and lock off the main switch first to prevent the touch-voltage hazard arising if a fault develops while the earth is removed',
      'Disconnect the main protective bonding conductors first so they do not affect the Ze reading',
      'Leave the installation energised and loaded so the Ze reading reflects normal operating conditions',
      'Connect a temporary earth electrode at the MET to maintain a fault path while the conductor is removed',
    ],
    correctAnswer: 0,
    explanation:
      'Removing the main earth on a live installation is dangerous: any earth fault becomes a touch-voltage hazard. The installation must be isolated first.',
    section: '1.6',
    difficulty: 'advanced',
  },
  {
    id: 21,
    question:
      'Which document gives the legal duty to maintain electrical systems so as to prevent danger?',
    options: [
      'BS 7671:2018 Regulation 642.1 — the requirement to verify before putting into service',
      'EAWR 1989 Regulation 4(2) — "as may be necessary to prevent danger"',
      'The Building Regulations Part P — covering the maintenance of domestic electrical systems',
      'The Electricity Safety, Quality and Continuity Regulations 2002 — the DNO maintenance duty',
    ],
    correctAnswer: 1,
    explanation:
      'EAWR Reg 4(2) is the statutory maintenance duty. BS 7671 is the means of compliance, but the legal duty is in EAWR.',
    section: '1.1',
    difficulty: 'intermediate',
  },
  {
    id: 22,
    question:
      'Insulated tools used during testing must comply with:',
    options: [
      'BS EN 61557 (the standard for low-voltage test instruments)',
      'BS EN 60529 (the IP-rating standard for enclosures)',
      'BS EN IEC 60900 (1000V AC / 1500V DC rated)',
      'BS EN 60898 (the standard for circuit-breakers for household use)',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN IEC 60900 sets the dielectric and impact testing standard for insulated hand tools used on live or near-live work.',
    section: '1.6',
    difficulty: 'intermediate',
  },
  {
    id: 23,
    question:
      'The principal hazards encountered during inspection and testing are:',
    options: [
      'Electric shock only, since modern instruments eliminate every other hazard during inspection work',
      'Overvoltage damage to the test instrument and incorrect readings caused by a flat instrument battery',
      'Loss of supply to the building and the inconvenience this causes to the occupier during the works',
      'Shock, arc flash/burn, secondary injury from involuntary reaction, fire, falls from height, and trip hazards',
    ],
    correctAnswer: 3,
    explanation:
      'A holistic hazard assessment captures all foreseeable harm, not just shock. Secondary injury from involuntary reaction (e.g. recoiling, falling) is a leading cause of injury during testing.',
    section: '1.6',
    difficulty: 'basic',
  },
  {
    id: 24,
    question:
      'The minimum frequency of calibration recommended for test instruments used for certification purposes is:',
    options: [
      'Annually, with interim accuracy checks (e.g. against a calibration check box) before each use',
      'Every five years, matching the periodic inspection interval for rented dwellings',
      'Only when the instrument gives an obviously incorrect reading or is visibly damaged',
      'Monthly, with a full UKAS-traceable recalibration before each certification job',
    ],
    correctAnswer: 0,
    explanation:
      'GN3 and BS 7671 Reg 642.2 require instruments to be of sufficient accuracy. Industry practice: annual UKAS-traceable calibration plus pre-use checks.',
    section: '1.6',
    difficulty: 'intermediate',
  },
  {
    id: 25,
    question:
      'A method statement for inspection and testing should include:',
    options: [
      'Only the names and signatures of the design, construction, and inspection personnel',
      'Scope, sequence, hazards/controls, isolation strategy, PPE, instruments, competence of personnel, emergency arrangements',
      'Only the test results required on the Schedule of Test Results for each circuit',
      'Only the supply characteristics and earthing arrangement recorded on the certificate',
    ],
    correctAnswer: 1,
    explanation:
      'A method statement is the documented safe system of work. Without these elements it cannot demonstrate suitable and sufficient assessment under MHSWR.',
    section: '1.6',
    difficulty: 'intermediate',
  },
  {
    id: 26,
    question:
      'EAWR 1989 Regulation 16 requires persons engaged in work activities where technical knowledge or experience is necessary to prevent danger to:',
    options: [
      'Hold a current ECS gold card and be registered with a Competent Person Scheme',
      'Carry a minimum of five years post-qualification experience on similar installations',
      'Possess such knowledge and experience, or be under appropriate supervision',
      'Work only under a written permit-to-work issued by a chartered engineer',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 16 is the competence requirement: knowledge, experience, and supervision proportionate to the risk.',
    section: '1.1',
    difficulty: 'intermediate',
  },
  {
    id: 27,
    question:
      'Locking off using a multi-lock hasp allows multiple workers to:',
    options: [
      'Share a single padlock, with the key held by the most senior person on site',
      'Isolate several circuits at once using one lock-off device on the main switch',
      'Re-energise the circuit individually once their own portion of the work is complete',
      'Each apply their own personal padlock so the isolation cannot be removed until ALL workers have removed their padlocks',
    ],
    correctAnswer: 3,
    explanation:
      'Multi-lock hasp = each worker controls their own safety. The last padlock off is the last worker out — no premature re-energisation.',
    section: '1.2',
    difficulty: 'basic',
  },
  {
    id: 28,
    question:
      'When testing in a domestic loft on a hot day, additional risks to control include:',
    options: [
      'Heat stress, falls through the ceiling, hot pipes, glass-fibre/asbestos, and restricted emergency egress',
      'Higher conductor resistance from the heat, requiring a temperature-correction factor on every reading taken',
      'Increased prospective fault current in the loft because the cables run closer together in the warm space',
      'Reduced insulation resistance readings caused by the heat, requiring the test voltage to be raised to 1000V',
    ],
    correctAnswer: 0,
    explanation:
      'Loft work compounds electrical hazards with environmental and access ones — heat stress, falls between joists, hot services, fibre/asbestos exposure and restricted egress. The method statement must address all of them.',
    section: '1.6',
    difficulty: 'intermediate',
  },
  {
    id: 29,
    question:
      'The "competent person" definition in EAWR 1989 Reg 16 requires:',
    options: [
      'A formal NVQ Level 3 qualification plus membership of a Competent Person Scheme',
      'Sufficient technical knowledge, experience, and (where lacking) appropriate supervision — proportionate to the work',
      'A minimum of three years on-site experience regardless of formal qualifications held',
      'Authorisation in writing from the employer to carry out any electrical work without supervision',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 16 is outcome-based: competence is a combination of knowledge, experience, and supervision matched to the actual risk.',
    section: '1.1',
    difficulty: 'basic',
  },
  {
    id: 30,
    question:
      'If during inspection an inspector identifies an immediately dangerous condition (e.g. exposed live conductor), the FIRST action is to:',
    options: [
      'Complete the remaining inspection items first, then record the defect as a C1 on the report',
      'Photograph the defect and email the client a quotation for the remedial work before doing anything else',
      'Make safe (isolate, barrier, warn), then notify the duty holder in writing, then document on certification (Code C1 on EICR if applicable)',
      'Finish testing the circuit to establish the cause before deciding whether the condition is dangerous',
    ],
    correctAnswer: 2,
    explanation:
      "BPG4 Code C1 (Danger present) demands immediate action. The inspector duty under HASAWA s.3/7 is to prevent harm to others.",
    section: '1.6',
    difficulty: 'intermediate',
  },

  // ============================================================
  // LO2: Initial Verification - Purpose, Requirements & Documents (Q31-55)
  // 304 AC2.1-2.4, 607 AC2.1-2.3, 302 AC2.1-2.3
  // ============================================================
  {
    id: 31,
    question:
      "BS 7671 Reg 642.1 requires that on completion of every installation or alteration the inspector shall verify:",
    options: [
      "That the requirements of BS 7671 have been met by testing alone, inspection being optional",
      "That the installer holds a current Competent Person Scheme registration",
      "That the design data has been signed off by the DNO before energisation",
      "That the requirements of BS 7671 have been met by inspection AND testing",
    ],
    correctAnswer: 3,
    explanation:
      "Reg 642.1 is the cornerstone of Part 6: every installation must be verified by both inspection AND testing against the requirements of BS 7671 before being put into service.",
    section: "2.1",
    difficulty: "basic",
  },
  {
    id: 32,
    question:
      "Information required by the inspector before initial verification includes (Reg 641.1 / GN3 Ch 2):",
    options: [
      "Maximum demand, supply characteristics (Ze, Ipf, U0), earthing arrangement, circuit composition and design data",
      "Only the supply voltage and frequency, as all other data is derived during the testing process on site",
      "Only the previous EICR, since a brand-new installation requires no separate design information at all",
      "Only the manufacturer instructions for the consumer unit and the outgoing protective devices fitted",
    ],
    correctAnswer: 0,
    explanation:
      "Reg 641.1 mirrors the Reg 132 design information. Without supply characteristics, earthing arrangement, circuit composition, designer details and the schedule of design data, the inspector cannot verify ADS or cable selection.",
    section: "2.4",
    difficulty: "intermediate",
  },
  {
    id: 33,
    question:
      "The relevant documents associated with initial verification of a new installation are:",
    options: [
      "Electrical Installation Condition Report (EICR) + Schedule of Inspections only",
      "Electrical Installation Certificate (EIC) + Schedule of Inspections + Schedule of Test Results",
      "Minor Electrical Installation Works Certificate + Schedule of Test Results",
      "Electrical Installation Certificate (EIC) alone, with no accompanying schedules required",
    ],
    correctAnswer: 1,
    explanation:
      "Per Reg 644.1, the EIC is accompanied by a Schedule of Inspections and a Schedule of Test Results. All three together form the verification record.",
    section: "2.3",
    difficulty: "basic",
  },
  {
    id: 34,
    question:
      "An Electrical Installation Certificate (EIC) is appropriate for:",
    options: [
      "A periodic assessment of an existing installation against current BS 7671",
      "Adding a single socket-outlet to an existing ring final circuit only",
      "A new installation OR an addition/alteration that introduces a new circuit",
      "Replacing a like-for-like accessory such as a damaged switch or socket faceplate",
    ],
    correctAnswer: 2,
    explanation:
      "EIC = new work or new circuits. Minor alterations to existing circuits use a Minor Works Certificate. Periodic = EICR.",
    section: "2.1",
    difficulty: "basic",
  },
  {
    id: 35,
    question:
      "A Minor Electrical Installation Works Certificate (MWC/MEIWC) may be used for:",
    options: [
      "The installation of a new consumer unit and all its outgoing circuits",
      "A periodic condition assessment of a whole existing installation",
      "Any work involving the addition of one or more new final circuits",
      "An addition or alteration that does NOT extend an existing circuit by adding a new one",
    ],
    correctAnswer: 3,
    explanation:
      "MWC covers minor work on a single existing circuit (e.g. adding a socket to a ring). New circuits or new consumer units always require an EIC.",
    section: "2.1",
    difficulty: "basic",
  },
  {
    id: 36,
    question:
      "An Electrical Installation Condition Report (EICR) differs from an EIC in that it:",
    options: [
      "Reports the condition of an EXISTING installation against current BS 7671 (with deviations recorded)",
      "Certifies that newly installed work complies fully with BS 7671 before energisation",
      "Is issued only for additions or alterations that introduce a new circuit",
      "Records the design data and supply characteristics for a brand-new installation",
    ],
    correctAnswer: 0,
    explanation:
      "EICR = condition assessment with observation codes (C1/C2/C3/FI). It does not certify but rather reports.",
    section: "2.1",
    difficulty: "basic",
  },
  {
    id: 37,
    question:
      "Per Reg 644.1.1, the EIC must include the names and signatures of:",
    options: [
      "The client commissioning the work and the DNO representative who connected the supply cut-out",
      "The persons responsible for the design, the construction, and the inspection/testing of the work",
      "Only the inspector who actually carried out the testing, accompanied by an independent witness",
      "The Competent Person Scheme assessor together with the local authority building control officer",
    ],
    correctAnswer: 1,
    explanation:
      "Three separate signature roles are required: design, construction, and inspection/testing. On small jobs all three may be the same signatory.",
    section: "7.4",
    difficulty: "intermediate",
  },
  {
    id: 38,
    question:
      "The PRIMARY purpose of initial verification is to confirm:",
    options: [
      "That the installation will not require any periodic inspection for at least ten years",
      "That the maximum demand of the installation does not exceed the supply capacity",
      "The installation has been designed, constructed, inspected and tested in accordance with BS 7671 and is safe to be energised and put into service",
      "That the cost of the installation matches the original quotation provided to the client",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 641.1: verification confirms compliance with BS 7671 prior to first putting into service.",
    section: "2.1",
    difficulty: "basic",
  },
  {
    id: 39,
    question:
      "Periodic inspection (EICR) frequencies for a domestic owner-occupied dwelling are typically:",
    options: [
      "1 year OR change of occupancy, whichever is sooner",
      "3 years OR after any alteration to the installation",
      "20 years OR sale of the property, whichever is sooner",
      "10 years OR change of occupancy (per IET Guidance, BPG4)",
    ],
    correctAnswer: 3,
    explanation:
      "10 years is the recommended max for domestic owner-occupied. Rented dwellings (England private rented sector) = 5 years legal max under PRS Regulations 2020.",
    section: "2.1",
    difficulty: "intermediate",
  },
  {
    id: 40,
    question:
      "Periodic inspection frequency for an England private rented dwelling is set by:",
    options: [
      "The Electrical Safety Standards in the Private Rented Sector Regulations 2020 — 5 years maximum",
      "The Landlord and Tenant Act 1985 — a 10-year maximum interval between periodic inspections",
      "The Housing Act 2004 — a 3-year maximum interval, tied to the property licensing regime",
      "BS 7671 Regulation 651.1 — a 1-year maximum interval for all private rented dwellings",
    ],
    correctAnswer: 0,
    explanation:
      "The Private Rented Sector (England) Regulations 2020 mandate a 5-year EICR for English private rentals; copies must be supplied to tenants and the local authority on request.",
    section: "2.1",
    difficulty: "intermediate",
  },
  {
    id: 41,
    question:
      "Per Reg 643.1, inspection and testing during initial verification must be carried out:",
    options: [
      "Only after the installation has been energised and is in normal service",
      "DURING erection where appropriate, AND on completion BEFORE the installation is put into service",
      "Only at the design stage, before any conductors are installed",
      "Only once the client has signed off the as-installed drawings",
    ],
    correctAnswer: 1,
    explanation:
      "Many inspection items (e.g. cables in conduit) cannot be inspected after enclosure. In-progress inspection during erection is essential.",
    section: "2.1",
    difficulty: "intermediate",
  },
  {
    id: 42,
    question:
      "Documents the inspector should consult before starting initial verification include:",
    options: [
      "Only BS 7671, since all of the other information is derived during the on-site testing process",
      "Only the manufacturer instructions for the consumer unit, with nothing else being relevant here",
      "Drawings, specs, BS 7671, GN3, manufacturer data, any previous EICR, and the RAMS",
      "Only the client's verbal description of what electrical work has been carried out so far",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 643.1.1 requires the inspector to compare results with the relevant criteria — design drawings and specifications, BS 7671, GN3, manufacturer instructions, the previous EICR (if an alteration) and the risk assessment/method statement.",
    section: "2.2",
    difficulty: "intermediate",
  },
  {
    id: 43,
    question:
      "On a typical EICR observation, Code C1 means:",
    options: [
      "Potentially dangerous — urgent remedial action required",
      "Improvement recommended — would contribute to the safety of the installation",
      "Further investigation required without delay to establish the cause",
      "Danger present — risk of injury — IMMEDIATE remedial action required",
    ],
    correctAnswer: 3,
    explanation:
      "Per Best Practice Guide 4, C1 = danger present. Inspector must make safe before leaving site (e.g. isolate, label, notify duty holder in writing).",
    section: "2.1",
    difficulty: "basic",
  },
  {
    id: 44,
    question:
      "EICR Code C2 means:",
    options: [
      "Potentially dangerous — urgent remedial action required",
      "Danger present — risk of injury — immediate remedial action required",
      "Improvement recommended — does not represent a present or potential danger",
      "Acceptable condition — no action required at this inspection",
    ],
    correctAnswer: 0,
    explanation:
      "C2 = potentially dangerous (e.g. accessible Class I metalwork without effective earthing). The fault has potential to cause injury under certain conditions.",
    section: "2.1",
    difficulty: "basic",
  },
  {
    id: 45,
    question:
      "EICR Code C3 means:",
    options: [
      "Danger present — risk of injury — immediate remedial action required",
      "Improvement recommended — does not represent immediate or potential danger but improvement would contribute to safety",
      "Potentially dangerous — urgent remedial action required",
      "Further investigation required without delay to determine whether danger exists",
    ],
    correctAnswer: 1,
    explanation:
      "C3 = improvement recommended. Common for non-compliances with current BS 7671 that were compliant when installed.",
    section: "2.1",
    difficulty: "basic",
  },
  {
    id: 46,
    question:
      "EICR Code FI means:",
    options: [
      "Fault Identified — the defect has been located and rectified during the inspection",
      "Failed Inspection — the whole installation must be condemned and replaced",
      "Further Investigation required without delay — inspector cannot conclude on safety without more information",
      "Fault Isolated — the affected circuit has been disconnected pending repair",
    ],
    correctAnswer: 2,
    explanation:
      "FI is used when test/inspection cannot determine safety (e.g. RCD failed to trip but cause unclear). Action: invasive investigation.",
    section: "2.1",
    difficulty: "intermediate",
  },
  {
    id: 47,
    question:
      "An overall EICR outcome is recorded as UNSATISFACTORY if any of the following are present:",
    options: [
      "Any C3 observation only, regardless of whether C1 or C2 are present",
      "Three or more C3 observations on the same circuit",
      "Any departure from the previous EICR recommendations",
      "Any C1, any C2, OR any FI observation",
    ],
    correctAnswer: 3,
    explanation:
      "Per BPG4: presence of C1, C2 or FI = Unsatisfactory. C3 alone does NOT make a report Unsatisfactory.",
    section: "2.1",
    difficulty: "intermediate",
  },
  {
    id: 48,
    question:
      "Information that the EIC must record about the supply (per Reg 644 + Form) includes:",
    options: [
      "Earthing arrangement, nominal voltage U/U0, frequency, Ipf, Ze, and the supply protective device rating",
      "Only the nominal voltage and frequency, all other characteristics being fixed at the design stage off-site",
      "Only the prospective fault current at the origin and the type of supply protective device that is fitted",
      "Only the earthing arrangement and the assessed maximum demand of the whole installation at the origin",
    ],
    correctAnswer: 0,
    explanation:
      "Reg 132.2 / 313 supply characteristics underpin every design decision. The EIC records the earthing arrangement (TN-S/TN-C-S/TT), U/U0, frequency, Ipf, Ze and the supply protective device type and rating.",
    section: "7.2",
    difficulty: "intermediate",
  },
  {
    id: 49,
    question:
      "The Schedule of Inspections must record an outcome for each item as:",
    options: [
      "A numerical resistance value in ohms for each inspection item",
      "Tick (acceptable), N/A (not applicable), LIM (limitation), or appropriate code — accompanied by an overall declaration",
      "Pass or fail only, with no provision for items that are not applicable",
      "A percentage compliance score against the BS 7671 requirements",
    ],
    correctAnswer: 1,
    explanation:
      "Standard tick/N/A/LIM convention with limitations explicitly recorded so the customer understands what was NOT inspected.",
    section: "7.2",
    difficulty: "intermediate",
  },
  {
    id: 50,
    question:
      "On the Schedule of Test Results, a circuit-by-circuit record must include as a minimum:",
    options: [
      "Only the circuit ID and whether each individual circuit passed or failed the test overall",
      "Only the insulation resistance and earth fault loop impedance recorded for the whole board",
      "Circuit ID, conductor csa, reference method, OCPD, R1+R2/R2, IR, polarity, Zs, RCD time, AFDD",
      "Only the supply characteristics (Ze, Ipf) measured once at the origin of the installation",
    ],
    correctAnswer: 2,
    explanation:
      "The Schedule of Test Results is the dataset proving every circuit was tested and met its design criteria — circuit ID, conductor csa (live + cpc), reference method, OCPD type/rating, R1+R2 (or R2), insulation resistance, polarity, Zs and RCD operating current/trip time. A4:2026 added AFDD columns.",
    section: "7.2",
    difficulty: "intermediate",
  },
  {
    id: 51,
    question:
      "Under Building Regulations Part P (England) and notifiable work, the installer must:",
    options: [
      "Notify the DNO before any new circuit is energised in a dwelling",
      "Obtain written planning permission from the local authority for all electrical work",
      "Submit the EIC to the HSE within 30 days of completing notifiable work",
      "Notify Building Control (or use a Competent Person Scheme) for new circuits, consumer unit replacements, and special-location work",
    ],
    correctAnswer: 3,
    explanation:
      "Part P notification is the legal obligation. CPS membership (NICEIC, NAPIT, etc.) lets the contractor self-certify and lodge electronically.",
    section: "7.1",
    difficulty: "intermediate",
  },
  {
    id: 52,
    question:
      "The Building Safety Act 2022 introduces additional requirements for high-risk residential buildings (HRRBs). For electrical inspection these include:",
    options: [
      "A golden thread of digital information, dutyholder accountability, and AFDD design considerations",
      "A mandatory annual EICR for every dwelling, replacing the normal recommended periodic interval",
      "Use of a TT earthing arrangement throughout the building, regardless of the DNO supply type",
      "A doubling of the prospective fault current rating required for all of the protective devices",
    ],
    correctAnswer: 0,
    explanation:
      "BSA 2022 introduced the dutyholder regime and golden thread for HRRBs (>=18m or 7 storeys with 2+ dwellings), covering electrical certification, dutyholder accountability and AFDD design considerations. Electrical records form part of the safety case.",
    section: "7.1",
    difficulty: "advanced",
  },
  {
    id: 53,
    question:
      "Limitations agreed with the client on an EICR (e.g. fitted furniture preventing inspection of sockets) must be:",
    options: [
      "Coded as C1 on the report, since any area not inspected represents a present danger",
      "Recorded explicitly on the report so the reader understands the scope of what was NOT inspected and the implications",
      "Omitted from the report so as not to alarm the client about un-inspected areas",
      "Recorded only in the inspector's own notes and not shared with the client",
    ],
    correctAnswer: 1,
    explanation:
      "BPG4 requires limitations to be agreed with the client BEFORE work and recorded on the report. Hidden faults inside un-inspected areas remain the client risk to manage.",
    section: "7.2",
    difficulty: "intermediate",
  },
  {
    id: 54,
    question:
      "Per Reg 644.4 / GN3, certificates and reports must be retained:",
    options: [
      "For a maximum of 12 months, after which they may be destroyed",
      "Only until the next periodic inspection, then superseded and discarded",
      "For the lifetime of the installation, by both the issuer and the recipient — and made available to subsequent inspectors",
      "By the issuer only, with no obligation on the recipient to keep a copy",
    ],
    correctAnswer: 2,
    explanation:
      "Long-term retention enables comparison over time and supports the periodic comparison principle (deterioration tracking).",
    section: "7.5",
    difficulty: "intermediate",
  },
  {
    id: 55,
    question:
      "The inspector preparing for a verification job should review the previous EICR (if any) primarily to:",
    options: [
      "Copy across the previous test results so that re-testing is not needed",
      "Confirm the previous inspector's registration is still valid before starting",
      "Establish the exact date the installation must next be inspected",
      "Identify previously coded defects, recommended improvements, and any limitations — to inform scope and expected condition",
    ],
    correctAnswer: 3,
    explanation:
      "Previous reports give baseline and known issues. They never substitute for fresh testing.",
    section: "2.2",
    difficulty: "intermediate",
  },

  // ============================================================
  // LO3: Visual Inspection (Q56-80)
  // 304 AC3.1-3.5, 607 AC3.1-3.4, 302 AC3.1-3.3
  // ============================================================
  {
    id: 56,
    question:
      "Visual inspection per Reg 642.3 is carried out:",
    options: [
      "Preferably before, but in any case prior to, testing — and as far as reasonably practicable with the installation isolated",
      "After all dead and live testing is complete, as a final check before handover",
      "Only on the energised installation, so that indicator lamps and displays can be observed",
      "At the same time as live testing, so faults can be confirmed immediately",
    ],
    correctAnswer: 0,
    explanation:
      "Reg 642.3 places visual inspection BEFORE testing. Many defects (e.g. damaged insulation, loose terminations) are found visually and would be hazardous to test live.",
    section: "3.4",
    difficulty: "basic",
  },
  {
    id: 57,
    question:
      "Items that must be inspected per Reg 642.3 include (sample):",
    options: [
      "Only the consumer unit enclosure and the main switch, all other items being tested rather than inspected",
      "Conductor connections and identification, cable routing and selection, protective devices, and fire barriers",
      "Only the earthing and bonding arrangements, since these are the only genuinely safety-critical items present",
      "Only those items that cannot be verified by testing, such as the manufacturer labels and warning notices",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 642.3 lists 19 items, including connections and identification of conductors, routing and selection of cables (csa, current capacity, voltage drop), choice and setting of protective devices, fire barriers and methods of shock protection. The Schedule of Inspections mirrors this list.",
    section: "3.4",
    difficulty: "intermediate",
  },
  {
    id: 58,
    question:
      "Human senses used during visual inspection (Reg 642.3 / GN3) include:",
    options: [
      "Sight only — physical contact with any part of the installation is prohibited during inspection",
      "Sight and touch only, since hearing and smell give no useful diagnostic information",
      "Sight, hearing (e.g. arcing/buzzing), smell (e.g. burning insulation), touch (carefully — for excessive temperature) — never taste",
      "Sight, hearing, smell, touch AND taste, to detect chemical contamination of conductors",
    ],
    correctAnswer: 2,
    explanation:
      "GN3 explicitly lists sight, sound, smell and touch (with care). Taste has no place in electrical inspection.",
    section: "3.2",
    difficulty: "basic",
  },
  {
    id: 59,
    question:
      "Inspection of the earthing conductor must verify:",
    options: [
      "That it is sleeved blue along its full length to distinguish it clearly from the neutral conductor",
      "That it is no smaller than 1.5mm copper and run within the same containment as the line conductors",
      "That it is connected directly to the neutral bar rather than to the main earthing terminal at the origin",
      "Correct material and csa, secure BS 951 clamp at the MET, label per Reg 514.13.1, and damage protection",
    ],
    correctAnswer: 3,
    explanation:
      "Earthing conductor csa per Table 54.7 (or by calculation), a secure BS 951 clamp at the MET, a permanent label per Reg 514.13.1, and protection against mechanical and corrosion damage are all verified.",
    section: "3.4",
    difficulty: "intermediate",
  },
  {
    id: 60,
    question:
      "Per Reg 514.13.1, the label at every connection of an earthing or bonding conductor must read:",
    options: [
      "SAFETY ELECTRICAL CONNECTION — DO NOT REMOVE",
      "EARTH CONNECTION — DO NOT DISCONNECT WHILE LIVE",
      "WARNING — PROTECTIVE BONDING — ISOLATE BEFORE REMOVAL",
      "DANGER — MAIN EARTH TERMINAL — AUTHORISED PERSONS ONLY",
    ],
    correctAnswer: 0,
    explanation:
      "Reg 514.13.1 verbatim: the warning notice prevents accidental removal during plumbing or other works that could otherwise compromise earthing.",
    section: "3.4",
    difficulty: "basic",
  },
  {
    id: 61,
    question:
      "Main protective bonding conductors per Reg 411.3.1.2 / Reg 544 must be:",
    options: [
      "A minimum of 16mm copper on all earthing arrangements regardless of supply neutral size",
      "Sized per Table 54.8 (TN-C-S 10mm minimum, TN-S/TT half csa of earthing conductor, with absolute minimum 6mm copper)",
      "The same csa as the largest final circuit line conductor in the installation",
      "Always 4mm copper, matching the cpc of a typical ring final circuit",
    ],
    correctAnswer: 1,
    explanation:
      "Table 54.8 / OSG Table 4.1: 10mm typical for TN-C-S, 6mm minimum on TN-S, sized against the supply neutral csa. Up-rated for parallel paths.",
    section: "3.4",
    difficulty: "intermediate",
  },
  {
    id: 62,
    question:
      "Supplementary equipotential bonding conductors in a Section 701 location bath/shower must:",
    options: [
      "Be a minimum of 10mm copper and connected directly to the main earthing terminal",
      "Connect only the exposed-conductive-parts to each other, extraneous parts being excluded",
      "Connect simultaneously-accessible exposed and extraneous conductive parts AND have continuity-test resistance per Reg 415.2.2: R <= 50V/Ia",
      "Be run in green-and-yellow sheathing and bonded to the water supply pipe only",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 415.2.2: supplementary bonding effective when R between simultaneously-accessible parts <= 50V/Ia. Mandatory unless 30mA RCD AND main bonding verified compliant.",
    section: "3.4",
    difficulty: "advanced",
  },
  {
    id: 63,
    question:
      "Inspection of overcurrent protective devices must verify:",
    options: [
      "Only the colour of the toggle and the manufacturer's name printed on the front of the device",
      "Only that the device trips correctly when its integral test button is pressed at the board",
      "Only that the device is the same brand as the consumer unit into which it is actually fitted",
      "Type, rated current In, breaking capacity (Icn/Icu) suitable for Ipf, and selectivity with upstream",
    ],
    correctAnswer: 3,
    explanation:
      "Inspection covers the device type (BS EN 60898-1 MCB / BS 88-3 fuse / BS EN 61009 RCBO), rated current In, breaking capacity suitable for Ipf (Reg 432.1), coordination with cable Iz (Reg 433.1.1) and selectivity with upstream devices (Reg 536).",
    section: "3.4",
    difficulty: "intermediate",
  },
  {
    id: 64,
    question:
      "IP ratings (BS EN 60529) on equipment in a Section 701 Zone 1 (bath/shower) must be at least:",
    options: [
      "IPX4",
      "IPX1",
      "IPX0",
      "IPX7",
    ],
    correctAnswer: 0,
    explanation:
      "Reg 701.512.2: Zone 1 IPX4 minimum (IPX5 if water jets used). Zone 0 = IPX7 (the higher rating, used for the immersed interior of the bath itself). The X allows any solid-particle rating.",
    section: "3.5",
    difficulty: "intermediate",
  },
  {
    id: 65,
    question:
      "Section 705 (agricultural and horticultural) requires equipment IP rating of at least:",
    options: [
      "IP20 minimum, the same as for a standard domestic dry indoor location",
      "IP44 minimum (IP54/IP55 in dustier or wetter areas) per Reg 705.512.2",
      "IPX7 minimum, matching the requirement for the interior of a bath",
      "No IP rating is specified, the 30mA RCD providing all necessary protection",
    ],
    correctAnswer: 1,
    explanation:
      "Agricultural environments combine moisture, dust and physical impact. Reg 705.512 sets enhanced IP requirements, plus 30mA RCD on socket-outlets up to 32A.",
    section: "3.5",
    difficulty: "intermediate",
  },
  {
    id: 66,
    question:
      "Per Reg 421.1.7 (A4:2026), AFDDs on socket-outlet final circuits up to 32 A are:",
    options: [
      "Mandatory on every single final circuit of every installation, with no exceptions permitted at all",
      "Prohibited within residential premises and permitted only in industrial and commercial settings",
      "A requirement in HRRBs, HMOs, student accommodation and care homes; recommended elsewhere",
      "No longer referenced anywhere in BS 7671 following the publication of Amendment 4:2026",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 421.1.7 was redrafted in A4:2026: AFDDs on socket-outlet final circuits not exceeding 32 A are now a REQUIREMENT in Higher Risk Residential Buildings, Houses in Multiple Occupation, purpose-built student accommodation and care homes, and RECOMMENDED for all other premises.",
    section: "3.4",
    difficulty: "advanced",
  },
  {
    id: 67,
    question:
      "Surge Protective Devices (SPDs) per Reg 443 / 534 should be inspected for:",
    options: [
      "Trip time at 1×IΔn, on the basis that the SPD operates as a residual current device internally",
      "Insulation resistance of the SPD measured at 1000V DC during the dead tests before energisation",
      "Breaking capacity (Icn) matched to the prospective fault current measured at the origin of supply",
      "Type (1/2/3), correct location relative to ADS, status indicator, and short connection lead lengths",
    ],
    correctAnswer: 3,
    explanation:
      "SPDs are inspected for type (1/2/3 per BS EN 61643-11), correct location relative to ADS, a healthy status indicator (green = OK) and short connection leads (<0.5m total recommended), as effectiveness depends on lead length.",
    section: "3.4",
    difficulty: "intermediate",
  },
  {
    id: 68,
    question:
      "Inspection of cable supports and containment must verify:",
    options: [
      "Support spacing, mechanical protection at penetrations, fire-stopping (Reg 527.2), and grommets at entries",
      "Only that the cable colours match the harmonised colour code consistently along the whole cable run",
      "Only the insulation resistance of each individually supported cable length measured at 500V DC",
      "Only that the cable csa is large enough to carry the design current of the circuit it supplies",
    ],
    correctAnswer: 0,
    explanation:
      "Support spacing per OSG Table 4.5/4.6, mechanical protection at penetrations, fire-stopping at floor/wall penetrations (Reg 527.2 + Approved Doc B) and capping/grommets at enclosure entries are all verified to prevent damage and fire spread.",
    section: "3.4",
    difficulty: "intermediate",
  },
  {
    id: 69,
    question:
      "Cables installed in a wall under 50mm depth that are NOT in safe zones (Reg 522.6.202/.203) must be:",
    options: [
      "Run only in plastic capping with no other protection required",
      "Mechanically protected (capping/conduit), OR enclosed in earthed metallic covering, OR provided with 30mA RCD additional protection",
      "Sleeved in green-and-yellow along the concealed section to indicate a hazard",
      "Increased in csa by one size to compensate for the shallow burial depth",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 522.6.202/203 requires one of: depth >50mm, safe zone routing, mechanical protection, earthed metal sheath, OR 30mA RCD.",
    section: "3.4",
    difficulty: "intermediate",
  },
  {
    id: 70,
    question:
      "Inspection of the consumer unit per Reg 421.1.201 in domestic premises (single dwellings) must verify the enclosure is:",
    options: [
      "Of transparent material so the protective devices can be read without opening it",
      "Fitted with at least IP65 rating to prevent moisture ingress in domestic locations",
      "Of non-combustible material (e.g. metal) OR enclosed in a non-combustible cabinet — to limit fire spread from the consumer unit",
      "Bonded to the gas and water services to provide supplementary equipotential bonding",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 421.1.201 (post-Amendment 3) addresses fires originating from consumer units: metal enclosures or non-combustible cabinets are required.",
    section: "3.4",
    difficulty: "intermediate",
  },
  {
    id: 71,
    question:
      "Cable identification per Reg 514 / OSG Section 7 in modern (post-2006) UK installations uses:",
    options: [
      "Red (line), black (neutral), green (cpc) for single-phase; red/yellow/blue for three-phase",
      "Black (line), grey (neutral), green-and-yellow (cpc) for single-phase only",
      "Brown (line), black (neutral), bare copper (cpc) for single-phase; red/yellow/blue for three-phase",
      "Brown (line), blue (neutral), green-and-yellow (cpc) for single-phase; brown/black/grey for three-phase",
    ],
    correctAnswer: 3,
    explanation:
      "Harmonised colours since BS 7671 BS 7671:2008 + corrigendum (effective 2006). Pre-2006 installations may still have red/black.",
    section: "3.4",
    difficulty: "basic",
  },
  {
    id: 72,
    question:
      "Section 722 (electric vehicle charging points) requires that each EV connection point be supplied by:",
    options: [
      "An individual circuit with Type B RCD (or Type A + RDC-DD) per Reg 722.531.3.101 to detect smooth DC residual currents",
      "A shared ring final circuit with a single Type AC RCD covering all charge points",
      "A spur taken from the nearest socket-outlet ring with a 13A fused connection unit",
      "A circuit protected by a Type AC 100mA time-delayed RCD for selectivity",
    ],
    correctAnswer: 0,
    explanation:
      "EV chargers can produce smooth DC fault currents that blind Type AC and even Type A RCDs. Type B (or Type A + RDC-DD detector) is required for safety.",
    section: "3.5",
    difficulty: "advanced",
  },
  {
    id: 73,
    question:
      "Section 712 (PV systems) requires the DC side to be inspected for:",
    options: [
      "30mA RCD additional protection on each DC string, tested at 1×IΔn before the array is energised",
      "Insulation method, DC isolator, polarity, string fuses, earthing arrangement, and intake labelling",
      "Correct phase rotation of the DC strings checked before they are connected through to the inverter",
      "Earth fault loop impedance of each individual DC string measured against the Table 41.3 limits",
    ],
    correctAnswer: 1,
    explanation:
      "The PV DC side is inspected for insulation method (Class II/equivalent), DC isolator at the array, polarity, string fuses, the earthing arrangement (functional vs protective) and labels at the supply intake (Reg 514), as the DC side floats relative to earth.",
    section: "3.5",
    difficulty: "advanced",
  },
  {
    id: 74,
    question:
      "Inspection of fire alarm cable installation (BS 5839-1) must verify:",
    options: [
      "Standard PVC twin-and-earth cable clipped direct, exactly the same as a domestic lighting circuit",
      "A 30mA RCD on the fire-alarm supply to provide additional protection against earth fault current",
      "Standard or Enhanced fire-resistant cable, separated from other circuits, on fire-rated supports",
      "SWA cable with the steel armour used as the cpc and glanded correctly at both ends of the run",
    ],
    correctAnswer: 2,
    explanation:
      "BS 5839-1 mandates Standard or Enhanced fire-resistant cable (e.g. FP200 / Firetuf) rated for the system survival time, separation from other circuits, and fire-rated supports/clips. Plastic clips and trays fail in fire, so metallic supports are required.",
    section: "3.5",
    difficulty: "intermediate",
  },
  {
    id: 75,
    question:
      "Section 753 (heating cables/embedded heating systems) requires:",
    options: [
      "100mA time-delayed RCD protection only, to avoid nuisance tripping of the heating element",
      "Supplementary bonding of the heating element to the building structural steel",
      "A Type B RCD to detect smooth DC currents produced by the heating controller",
      "30mA RCD additional protection per Reg 753.415.1, and floor-temperature limiter to prevent damage to floor coverings",
    ],
    correctAnswer: 3,
    explanation:
      "Embedded heating contains live conductors in walls/floors; 30mA RCD is mandatory additional protection.",
    section: "3.5",
    difficulty: "intermediate",
  },
  {
    id: 76,
    question:
      "Diagrams, charts and similar information per Reg 514.9 must be displayed:",
    options: [
      "At the origin, identifying every circuit, its composition, the OCPD and the test characteristics",
      "Only at the local authority Building Control office where the installation work was originally notified",
      "Only on the certificate handed to the client, and not on or anywhere near the installation itself",
      "At every accessory throughout the installation, repeated in full for each socket-outlet and switch",
    ],
    correctAnswer: 0,
    explanation:
      "Reg 514.9 mandates information adequate for safe operation, inspection, testing and maintenance — at the origin, identifying every circuit, its type and composition, the OCPD and the characteristics needed for inspection and testing. Typically a circuit chart inside the CU door.",
    section: "3.4",
    difficulty: "basic",
  },
  {
    id: 77,
    question:
      "When inspecting a TT installation, the earth electrode arrangement must be checked for:",
    options: [
      "Connection to the supply neutral at the cut-out, as would be required for a TN-C-S conversion",
      "Type, accessibility for measurement, corrosion, the Reg 514.13.1 label, and a compliant measured Ra",
      "A measured Ra below 0.35Ω, to match the assumed maximum Ze for a TN-C-S supply at the origin",
      "Bonding of the electrode to the gas and water services to form a single combined earth at the MET",
    ],
    correctAnswer: 1,
    explanation:
      "TT relies entirely on the local electrode for the fault path, so both physical and electrical condition matter — type (rod/plate/mat), test-link accessibility for periodic re-measurement, corrosion, the Reg 514.13.1 label, and an Ra giving compliant Zs at the furthest point.",
    section: "3.4",
    difficulty: "intermediate",
  },
  {
    id: 78,
    question:
      "Inspection of segregation between Band I (ELV/SELV) and Band II (LV mains) circuits per Reg 528.1 requires:",
    options: [
      "That all Band I and Band II conductors share the same colour code for ease of identification",
      "That Band I circuits are run at a higher level than Band II circuits in any common containment",
      "Physical separation OR equivalent insulation OR an earthed metallic screen — to prevent transfer of mains potential into ELV circuits",
      "That Band I and Band II circuits are protected by a common 30mA RCD",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 528.1 protects users of low-voltage equipment (e.g. data, signal) from mains transfer in the event of insulation failure.",
    section: "3.4",
    difficulty: "intermediate",
  },
  {
    id: 79,
    question:
      "When inspecting the methods of basic protection (Reg 416), the inspector verifies:",
    options: [
      "Presence of a cpc throughout, main equipotential bonding, and ADS within the disconnection time",
      "A 30mA RCD on every final circuit to provide automatic disconnection of supply",
      "Earth fault loop impedance at every point below the Table 41.3 maximum value",
      "Insulation of live parts (Reg 416.1), barriers/enclosures to at least IPXXB/IP2X (Reg 416.2), and obstacles/placing out of reach where applicable",
    ],
    correctAnswer: 3,
    explanation:
      "Basic protection prevents direct contact. IPXXB = no contact with finger; IP2X = no contact with 12.5mm-diameter object.",
    section: "3.4",
    difficulty: "intermediate",
  },
  {
    id: 80,
    question:
      "Inspection per Reg 642.3 of methods of FAULT protection includes verifying:",
    options: [
      "ADS device type and settings, cpc throughout, equipotential bonding, and any 30mA RCD",
      "Insulation of live parts together with barriers and enclosures to at least IPXXB or IP2X",
      "That accessible live parts are placed out of arm's reach or otherwise positioned behind obstacles",
      "That the cable colours and the labelling together allow every conductor to be correctly identified",
    ],
    correctAnswer: 0,
    explanation:
      "Fault protection per Reg 411 is the multi-layer ADS strategy: an ADS device of the correct type/setting, a cpc throughout, main and supplementary equipotential bonding where required, and any additional 30mA RCD protection — operating within the disconnection time.",
    section: "3.4",
    difficulty: "intermediate",
  },

  // ============================================================
  // LO4: Test Sequence, Instruments & Standard Values (Q81-110)
  // 304 AC4.1-4.6, 607 AC4.1-4.5, 302 AC4.1-4.5
  // ============================================================
  {
    id: 81,
    question:
      "The dead-test sequence per Reg 643.2 / GN3 Section 2 is:",
    options: [
      "Insulation resistance -> continuity of protective conductors -> polarity (dead) -> earth electrode resistance (TT)",
      "Continuity of protective conductors -> continuity of ring final conductors -> insulation resistance -> polarity (dead) -> earth electrode resistance (TT)",
      "Earth fault loop impedance -> insulation resistance -> continuity -> polarity (dead)",
      "Polarity (dead) -> insulation resistance -> continuity of protective conductors -> RCD operation",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 643.2 sequence: dead tests preserve a meaningful order — continuity proves CPC integrity (needed for IR test interpretation), then IR, then polarity at dead, then electrode resistance for TT.",
    section: "4.6",
    difficulty: "intermediate",
  },
  {
    id: 82,
    question:
      "The live-test sequence per Reg 643.2 / GN3 is:",
    options: [
      "RCD operation -> Ze -> Zs -> prospective fault current -> polarity (energised) -> functional checks last",
      "Insulation resistance -> Zs -> RCD operation -> polarity (energised) -> AFDD operation -> functional",
      "Earth electrode (TT) -> Ze -> PFC -> Zs -> polarity (energised) -> RCD -> AFDD -> functional",
      "Functional/operational -> RCD operation -> Zs -> Ze -> prospective fault current -> polarity (energised)",
    ],
    correctAnswer: 2,
    explanation:
      "Live tests follow a logical safety order: earth electrode (live, TT), Ze, prospective fault current, Zs, energised polarity, RCD operation then AFDD operation, with functional/operational checks last. The earthing path is confirmed before being relied on for ADS verification.",
    section: "4.6",
    difficulty: "intermediate",
  },
  {
    id: 83,
    question:
      "The fundamental reason for the prescribed test sequence is:",
    options: [
      "It allows the inspector to complete the certificate in the same order as the form is laid out",
      "It minimises the total time the installation is de-energised during the testing process on site",
      "It ensures the test instrument batteries are used in the most efficient order to extend their life",
      "Each test relies on the integrity of the previous one, and live tests need the dead-test results first",
    ],
    correctAnswer: 3,
    explanation:
      "The sequence is safety-critical: IR cannot be safely interpreted without continuity of the cpc, and live tests require dead-test confirmation of earthing. Skipping or re-ordering can invalidate results or expose the inspector to live faults.",
    section: "4.6",
    difficulty: "intermediate",
  },
  {
    id: 84,
    question:
      "An MFT (Multi-Function Tester) such as a Megger MFT1741+ or Fluke 1664FC must be:",
    options: [
      "Compliant with BS EN 61557, CAT III/IV rated, calibrated annually, and fitted with GS38 leads",
      "Compliant with BS EN 60898, CAT I rated, and recalibrated only when the instrument is visibly damaged",
      "Compliant with BS EN 60529, CAT II rated, with no calibration requirement at all for routine site use",
      "Compliant with BS EN IEC 60900, CAT III rated, and recalibrated once every five years on a fixed cycle",
    ],
    correctAnswer: 0,
    explanation:
      "BS EN 61557 is the safety and functional standard for low-voltage test equipment. CAT III 600V minimum is needed for distribution work and CAT IV at the supply origin, with annual calibration and GS38 leads.",
    section: "4.2",
    difficulty: "intermediate",
  },
  {
    id: 85,
    question:
      "Per BS 7671 Reg 643.7.3 (A4:2026), the RCD test sequence is:",
    options: [
      "Tests at both 1×IΔn and 5×IΔn, with the half-rated no-trip test newly added in A4:2026",
      "A single AC test at 1×IΔn, the 5×IΔn test having been deleted in A4:2026 as redundant",
      "A single test at 5×IΔn only, the 1×IΔn trip-time test having been deleted in A4:2026",
      "A test at 0.5×IΔn confirming the RCD does NOT trip, with no trip-time test required at all",
    ],
    correctAnswer: 1,
    explanation:
      "A4:2026 simplified the RCD test to a single AC test at 1×IΔn (must trip within the published time, generally <300ms for general purpose, <40ms for Type S delay) plus the test-button functional check. The 5×IΔn test was deleted as redundant.",
    section: "4.5",
    difficulty: "advanced",
  },
  {
    id: 86,
    question:
      "Insulation resistance test voltage per BS 7671 Table 64 / Reg 643.3.3 for circuits up to and including 500V (excluding SELV/PELV) is:",
    options: [
      "1000V DC, with minimum acceptable IR of 1.0 MΩ",
      "250V DC, with minimum acceptable IR of 0.5 MΩ",
      "500V DC, with minimum acceptable IR of 1.0 MΩ",
      "500V DC, with minimum acceptable IR of 2.0 MΩ",
    ],
    correctAnswer: 2,
    explanation:
      "Table 64 verbatim: 500V DC test, 1.0 MΩ minimum. Lower IR (>=1MΩ but suspect) warrants further investigation.",
    section: "4.4",
    difficulty: "basic",
  },
  {
    id: 87,
    question:
      "Insulation resistance test voltage per Table 64 for SELV and PELV circuits is:",
    options: [
      "500V DC, minimum acceptable IR 1.0 MΩ",
      "100V DC, minimum acceptable IR 0.25 MΩ",
      "250V DC, minimum acceptable IR 1.0 MΩ",
      "250V DC, minimum acceptable IR 0.5 MΩ",
    ],
    correctAnswer: 3,
    explanation:
      "Table 64 verbatim: SELV/PELV use 250V DC at 0.5MΩ to avoid damage to ELV equipment from higher test voltage.",
    section: "4.4",
    difficulty: "basic",
  },
  {
    id: 88,
    question:
      "Insulation resistance test voltage per Table 64 for circuits ABOVE 500V up to 1000V is:",
    options: [
      "1000V DC, minimum acceptable IR 1.0 MΩ",
      "500V DC, minimum acceptable IR 1.0 MΩ",
      "1000V DC, minimum acceptable IR 2.0 MΩ",
      "1500V DC, minimum acceptable IR 1.0 MΩ",
    ],
    correctAnswer: 0,
    explanation:
      "Table 64 verbatim: HV-LV circuits >500V use 1000V test voltage. Same 1.0 MΩ acceptance.",
    section: "4.4",
    difficulty: "intermediate",
  },
  {
    id: 89,
    question:
      "If an insulation resistance test result is below 1 MΩ but above the minimum 1 MΩ value (e.g. 1.5 MΩ on a long circuit), the inspector should:",
    options: [
      "Fail the circuit outright, since any value below 2MΩ is non-compliant under BS 7671",
      "Investigate further — record the value, isolate sub-circuits, and verify whether the low value reflects normal cable length or a developing fault",
      "Accept the value without comment, as it exceeds the 1MΩ minimum and needs no further action",
      "Re-test at 250V instead of 500V to obtain a higher reading before recording the result",
    ],
    correctAnswer: 1,
    explanation:
      "GN3 advises that values approaching but above 1MΩ may indicate leakage; investigate by sectional testing.",
    section: "4.5",
    difficulty: "intermediate",
  },
  {
    id: 90,
    question:
      "Action on UNSATISFACTORY test result per Reg 643.1.2:",
    options: [
      "Record the failing value on the certificate and recommend the client monitors it over time in service",
      "Continue testing the remaining circuits and address the single failure at the next periodic inspection",
      "Repeat the test, rectify the fault, then re-test all preceding tests the fix could have affected",
      "Reduce the test voltage until the circuit passes, then accept and record the lower reading obtained",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 643.1.2 requires fault rectification AND re-testing of any preceding tests that could be affected, in sequence — preventing the new fix from introducing new faults.",
    section: "4.5",
    difficulty: "intermediate",
  },
  {
    id: 91,
    question:
      "Test instruments must be checked before use for:",
    options: [
      "Only the calibration certificate date, with all other aspects being covered by annual calibration",
      "Only that the instrument is the correct CAT rating for the particular work being undertaken on site",
      "Only that the instrument display is set to the correct units of measurement before each reading",
      "Battery, lead/probe integrity, the zero/null function, calibration date, and a known reference",
    ],
    correctAnswer: 3,
    explanation:
      "Pre-use functional checks supplement annual calibration: battery condition, lead/probe integrity (no cracks or exposed metal), the continuity zero/null function, the calibration date, and a check against a known reference where applicable. A cracked lead or flat battery can produce dangerously misleading results.",
    section: "4.3",
    difficulty: "basic",
  },
  {
    id: 92,
    question:
      "When testing IR on a circuit containing electronic equipment (PCs, dimmers, RCBO electronics), best practice is to:",
    options: [
      "Disconnect sensitive electronics, link out MOVs, and test L+N joined to earth rather than L to N",
      "Raise the test voltage to 1000V so the electronics are fully stressed and any latent weakness is exposed",
      "Skip the insulation resistance test entirely on any circuit that contains any electronic equipment at all",
      "Test between line and neutral only, leaving all the electronic equipment connected throughout the test",
    ],
    correctAnswer: 0,
    explanation:
      "Electronic loads can be damaged by 500V DC. GN3 recommends disconnecting/unplugging sensitive electronics, linking out MOVs, and testing L+N joined to earth (rather than between L and N) to avoid applying voltage across the equipment.",
    section: "4.5",
    difficulty: "advanced",
  },
  {
    id: 93,
    question:
      "Continuity test instruments must have a no-load voltage between:",
    options: [
      "50V and 250V, with a minimum short-circuit current of 1mA to protect sensitive electronics",
      "4V and 24V (per BS EN 61557-4) and a minimum short-circuit current of 200mA — to break through any film of oxide on connections",
      "230V and 400V, matching the nominal single- and three-phase supply voltages",
      "100V and 500V DC, the same test voltages used for insulation resistance testing",
    ],
    correctAnswer: 1,
    explanation:
      "BS EN 61557-4: 4-24V open-circuit, ≥200mA short-circuit ensures consistent low-resistance measurement free of contact film effects.",
    section: "4.3",
    difficulty: "intermediate",
  },
  {
    id: 94,
    question:
      "Earth fault loop impedance instrument tolerance per BS EN 61557-3 is typically:",
    options: [
      "+/- 1% of the measured value, the same order of precision as a UKAS reference standard instrument",
      "+/- 5% of the measured value, with no further allowance needed at the circuit design stage at all",
      "+/- 30% of the measured value, accounted for in Table 41.3 by Cmin = 0.95 and the 80% rule",
      "+/- 50% of the measured value, requiring every reading to be doubled before it is used for safety",
    ],
    correctAnswer: 2,
    explanation:
      "MFT loop testers carry significant uncertainty (around +/- 30%) from instrument and test-method effects. The 80% rule (measured Zs <= 0.8 × tabulated max), with Cmin = 0.95 in Table 41.3, provides the safety margin.",
    section: "4.3",
    difficulty: "advanced",
  },
  {
    id: 95,
    question:
      "Per Reg 643.7.1 + GN3, Ze (external earth fault loop impedance) is measured by:",
    options: [
      "Loop-testing at the furthest socket on every final circuit with the installation fully energised",
      "Adding the measured R1+R2 of every circuit and subtracting the total from the measured Zs reading",
      "Measuring continuity between the main earthing terminal and the earth electrode with the supply on",
      "Disconnecting the main earthing conductor at the MET, then loop-testing supply L to the MET earth",
    ],
    correctAnswer: 3,
    explanation:
      "The Ze test isolates the supply contribution by loop-testing between supply L and the disconnected MET earth. The main switch must be OFF and the circuits isolated, because disconnecting the main earth on a live installation creates a touch-voltage hazard.",
    section: "4.5",
    difficulty: "advanced",
  },
  {
    id: 96,
    question:
      "Maximum DNO-declared Ze values commonly assumed (per BPG3) are:",
    options: [
      "TN-S: 0.8Ω; TN-C-S: 0.35Ω (these are ASSUMED maxima — actual values must be measured or confirmed from DNO)",
      "TN-S: 0.35Ω; TN-C-S: 0.8Ω (the higher value applying to the combined PEN supply)",
      "TN-S: 21Ω; TN-C-S: 200Ω (the same maxima as for a TT earth electrode)",
      "TN-S: 1.0Ω; TN-C-S: 1.0Ω (a single common value for all earthing arrangements)",
    ],
    correctAnswer: 0,
    explanation:
      "DNO declared maxima used at design stage. Always measure on site to confirm — actual Ze can vary widely.",
    section: "4.4",
    difficulty: "intermediate",
  },
  {
    id: 97,
    question:
      "When inspecting a TT installation, the maximum Ra (earth electrode resistance) for an RCD-protected installation per Reg 411.5.3 is:",
    options: [
      "Ra <= 0.35Ω, the same maximum value as the assumed Ze for a TN-C-S supply at the origin",
      "Ra <= 50V/IΔn — giving 1667Ω for a 30mA RCD, though 200Ω is the practical stable target",
      "Ra <= 1Ω in every case, regardless of the rating of the RCD providing the fault protection",
      "Ra <= 230V/IΔn — giving an upper limit of approximately 7667Ω for a 30mA RCD on a TT supply",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 411.5.3: Ra <= 50V/IΔn (1667Ω for 30mA, 500Ω for 100mA). In practice 200Ω is targeted as a stable upper limit, because higher values may not stay reliable as the soil dries.",
    section: "4.5",
    difficulty: "advanced",
  },
  {
    id: 98,
    question:
      "Functional testing per Reg 643.10 covers:",
    options: [
      "Only the insulation resistance of every functional circuit measured at 500V DC before handover",
      "Only the earth fault loop impedance of each switched circuit measured at its furthest point",
      "Switchgear, controlgear, drives, controls, interlocks and monitoring devices operating as intended",
      "Only the polarity of every functional switch on the installation verified at the dead-test stage",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 643.10: every assembled device that depends on operation — switchgear, controlgear, drives, controls, interlocks and monitoring devices — must be functionally proven before handover, including after the protective-device test.",
    section: "4.5",
    difficulty: "intermediate",
  },
  {
    id: 99,
    question:
      "Test instrument leads with crocodile/probe combinations should:",
    options: [
      "Be at least 3m long with unshrouded clips so connection to busbars is easier",
      "Be replaced annually regardless of condition, the same interval as instrument calibration",
      "Carry a lower CAT rating than the instrument so they fuse first under fault",
      "Be CAT-rated equal to or greater than the instrument, GS38 compliant, with shroud, fused tips and clearly visible insulation integrity",
    ],
    correctAnswer: 3,
    explanation:
      "Lead rating must match or exceed the instrument CAT rating; mismatched leads invalidate the protection rating.",
    section: "4.3",
    difficulty: "intermediate",
  },
  {
    id: 100,
    question:
      "The reason for testing in the order specified in BS 7671 (Reg 643.2 + GN3) is:",
    options: [
      "Each test depends on the previous one, so re-ordering can invalidate results or create a hazard",
      "It follows the exact layout of the Schedule of Test Results form, purely for ease of recording values",
      "It groups the quickest tests first so the whole job can be completed in the least time on site",
      "It allows the most expensive test instrument to be used last and then packed away first afterwards",
    ],
    correctAnswer: 0,
    explanation:
      "Sequence integrity is a safety requirement, not tradition: continuity of the cpc must be proven before IR can be interpreted, and earthing before live tests rely on it; functional checks come last as they confirm the whole system works.",
    section: "4.6",
    difficulty: "intermediate",
  },
  {
    id: 101,
    question:
      "Per Table 41.3 (A4:2026), the maximum Zs for a 32A Type B BS EN 60898 MCB at 230V (0.4s disconnection time) is:",
    options: [
      "1.44Ω (the pre-Cmin value, calculated as 230/(5×32) without the 0.95 multiplier)",
      "1.37Ω (the value moved to 1.37Ω with the introduction of the Cmin = 0.95 multiplier; 1.44Ω is the old pre-Cmin value)",
      "0.68Ω (calculated using the Type C 10×In multiplier rather than Type B 5×In)",
      "7.28Ω (the value for a 6A Type B device, not a 32A device)",
    ],
    correctAnswer: 1,
    explanation:
      "A4:2026 (and pre-existing in A2:2022) introduced Cmin to BS 7671 calculation: Zs_max = (Cmin × U0)/Ia = 0.95×230/(5×32) = 1.367Ω. 1.44Ω is the obsolete distractor.",
    section: "4.4",
    difficulty: "advanced",
  },
  {
    id: 102,
    question:
      "Maximum Zs for a 6A Type B MCB (final circuit, 0.4s) per Table 41.3 is approximately:",
    options: [
      "1.37Ω (the value for a 32A Type B device, not a 6A device)",
      "7.67Ω (Zs = 230 / 30, omitting the Cmin = 0.95 multiplier)",
      "7.28Ω (Zs = 0.95 × 230 / (5 × 6) = 7.283Ω)",
      "3.64Ω (Zs = 0.95 × 230 / (10 × 6), using the Type C multiplier)",
    ],
    correctAnswer: 2,
    explanation:
      "Calculation: Cmin × U0 / Ia = 0.95 × 230 / 30 = 7.283Ω.",
    section: "4.4",
    difficulty: "advanced",
  },
  {
    id: 103,
    question:
      "Maximum Zs for a 32A Type C MCB (Ia = 10×In = 320A) per Table 41.3 at 0.4s is approximately:",
    options: [
      "1.37Ω (Zs = 0.95 × 230 / 160, using the Type B 5×In multiplier by mistake)",
      "0.72Ω (Zs = 230 / 320, omitting the Cmin = 0.95 multiplier)",
      "0.34Ω (Zs = 0.95 × 230 / 640, using a 20×In multiplier)",
      "0.68Ω (Zs = 0.95 × 230 / 320 = 0.683Ω)",
    ],
    correctAnswer: 3,
    explanation:
      "Type C requires 10×In to disconnect within 0.1s instantaneous range; this halves the allowable Zs vs Type B.",
    section: "4.4",
    difficulty: "advanced",
  },
  {
    id: 104,
    question:
      "Per Reg 411.3.2.2, maximum disconnection time for a 230V TN-system FINAL circuit not exceeding 63A supplying socket-outlets is:",
    options: [
      "0.4 seconds",
      "5 seconds",
      "1 second",
      "30 seconds",
    ],
    correctAnswer: 0,
    explanation:
      "0.4s applies to TN final circuits ≤63A (sockets) and ≤32A (mobile equipment). Distribution circuits and final circuits >63A: 5s.",
    section: "4.4",
    difficulty: "intermediate",
  },
  {
    id: 105,
    question:
      "Per Reg 411.3.2.4, maximum disconnection time for TN distribution circuits (and final circuits >63A) is:",
    options: [
      "0.2 seconds",
      "5 seconds",
      "30 seconds",
      "0.4 seconds",
    ],
    correctAnswer: 1,
    explanation:
      "5s for distribution circuits (allowed because users do not directly contact distribution boards in normal use).",
    section: "4.4",
    difficulty: "basic",
  },
  {
    id: 106,
    question:
      "Per Reg 411.3.2.2, maximum disconnection time for TT final circuits ≤63A (sockets) is:",
    options: [
      "0.4s",
      "1s",
      "0.2s",
      "5s",
    ],
    correctAnswer: 2,
    explanation:
      "TT systems have higher loop impedance — shorter disconnection time required to limit touch voltage exposure (typically achieved by 30mA RCD).",
    section: "4.4",
    difficulty: "intermediate",
  },
  {
    id: 107,
    question:
      "Per Reg 411.3.2.4, max disconnection time for TT distribution circuits is:",
    options: [
      "0.2s",
      "0.4s",
      "5s",
      "1 second",
    ],
    correctAnswer: 3,
    explanation:
      "TT distribution: 1s (vs 0.4s on final), reflecting the same logic as TN but with stricter values for the higher loop impedance.",
    section: "4.4",
    difficulty: "intermediate",
  },
  {
    id: 108,
    question:
      "Test instruments calibrated annually should additionally have an interim accuracy check using:",
    options: [
      "A calibration check box at intervals and after any suspected damage, confirming continued accuracy",
      "The supply voltage at the origin, comparing the instrument reading against the nominal 230V value",
      "A second uncalibrated instrument of the same make and model, comparing the two displayed readings",
      "The previous test results for the installation, checking the instrument returns the same values again",
    ],
    correctAnswer: 0,
    explanation:
      "GN3 best practice: interim checks against a known reference (a calibration check box / resistance test unit) at intervals and after any suspected damage catch drift between annual UKAS calibrations.",
    section: "4.3",
    difficulty: "intermediate",
  },
  {
    id: 109,
    question:
      "Selecting the correct instrument scale (e.g. continuity 0-200Ω, IR 500V, loop high-current/no-trip mode) is necessary to:",
    options: [
      "Reduce the time the test takes by skipping ranges that are unlikely to be needed",
      "Achieve appropriate resolution and accuracy for the value being measured, AND avoid false trip/damage to RCD-protected circuits",
      "Extend the battery life of the instrument by using the lowest power range available",
      "Match the instrument range to the colour code of the conductor being tested",
    ],
    correctAnswer: 1,
    explanation:
      "Correct range gives both accuracy and safety. Loop testing on RCD circuits requires no-trip mode to prevent nuisance tripping during the test.",
    section: "4.2",
    difficulty: "intermediate",
  },
  {
    id: 110,
    question:
      "When recording test results on the Schedule of Test Results, values should be:",
    options: [
      "Rounded to the nearest whole ohm to keep the certificate tidy and easy to read",
      "Recorded only if they fail, passing values being left blank on the schedule",
      "Recorded to the resolution displayed by the instrument and compared against design values (and BS 7671 maxima) BEFORE leaving site",
      "Averaged across all circuits on the board and a single figure entered for the installation",
    ],
    correctAnswer: 2,
    explanation:
      "On-site comparison catches non-compliance immediately, allowing fault-finding before leaving the job.",
    section: "4.4",
    difficulty: "intermediate",
  },

  // ============================================================
  // LO5: Continuity, IR, Polarity, Earth Electrode (Q111-145)
  // 304 AC5.1-5.7, 607 AC4.6-4.13, 302 AC5.1-5.8
  // ============================================================
  {
    id: 111,
    question:
      "Why is continuity of protective conductors verified per Reg 643.2.1?",
    options: [
      "To confirm the cpc is large enough to carry the full load current of the circuit continuously in service",
      "To verify the cpc colour coding (green-and-yellow) is correct at every accessory along the circuit",
      "To measure the insulation resistance between the cpc and the line conductor before energising",
      "To prove the cpc has a low-resistance path so ADS operates in time, and to prove bonding continuity",
    ],
    correctAnswer: 3,
    explanation:
      "Without a verified low-resistance cpc, ADS cannot work — the fault-current path is broken or too high to disconnect in time. The test also proves main and supplementary bonding continuity.",
    section: "5.1",
    difficulty: "basic",
  },
  {
    id: 112,
    question:
      "The two methods for verifying continuity of protective conductors per GN3 Section 2.7 are:",
    options: [
      "Method 1 (R1+R2 — link line and cpc at the board) and Method 2 (R2 only — long lead from the MET)",
      "Method 1 (insulation resistance L-cpc at 500V) and Method 2 (insulation resistance L-N measured at 250V)",
      "Method 1 (loop impedance measured at the origin) and Method 2 (loop impedance at the furthest point)",
      "Method 1 (RCD trip time at 1×IΔn) and Method 2 (RCD trip time at 5×IΔn) measured at each accessory",
    ],
    correctAnswer: 0,
    explanation:
      "Method 1 links line and cpc at the distribution board and measures end-to-end at each accessory, giving both R1 and R2 (useful for Zs). Method 2 uses a long lead from the MET, is faster, but confirms cpc continuity only.",
    section: "5.2",
    difficulty: "intermediate",
  },
  {
    id: 113,
    question:
      "The ring final circuit continuity test (3-step method per GN3) checks:",
    options: [
      "Step 1: IR L-N. Step 2: IR L-cpc. Step 3: IR N-cpc — all measured at 500V DC at every socket-outlet",
      "Step 1: end-to-end r1, rn, r2. Step 2: cross-connect L-N, measure L-N at each socket. Step 3: cross-connect L-cpc",
      "Step 1: Ze at the origin. Step 2: Zs at the first socket. Step 3: Zs at the furthest socket on the ring",
      "Step 1: prove dead. Step 2: test polarity. Step 3: confirm the RCD trips — at each socket in turn",
    ],
    correctAnswer: 1,
    explanation:
      "The 3-step method: Step 1 measures end-to-end r1/rn/r2; Step 2 cross-connects L outgoing to N return and reads L-N at each socket (should be roughly constant); Step 3 cross-connects L to cpc and reads L-cpc, giving R1+R2 for the ring. It confirms the ring is unbroken and yields R1+R2 for Zs.",
    section: "5.2",
    difficulty: "advanced",
  },
  {
    id: 114,
    question:
      "On a healthy 32A 2.5/1.5mm² ring final circuit ~50m long, expected r1 (end-to-end of one line conductor) is approximately:",
    options: [
      "About 0.05Ω (assuming the resistance of copper is negligible over 50m)",
      "About 0.60Ω (using the 1.5mm cpc figure of 12.10 mΩ/m instead of the 2.5mm line figure)",
      "About 0.36-0.40Ω (50m × ~7.41mΩ/m ≈ 0.37Ω at 20°C; OSG mΩ/m table)",
      "About 0.74Ω (taking the full ring length of 100m rather than one 50m leg)",
    ],
    correctAnswer: 2,
    explanation:
      "OSG Table I1: 2.5mm² = 7.41 mΩ/m at 20°C; 50m × 7.41 = 370.5mΩ. r2 (1.5mm²) higher.",
    section: "5.3",
    difficulty: "advanced",
  },
  {
    id: 115,
    question:
      "On a 30m radial 2.5/1.5mm² circuit, expected (R1+R2) at 20°C is approximately:",
    options: [
      "About 0.22Ω (counting only the 2.5mm line conductor and ignoring the cpc)",
      "About 0.36Ω (using two 1.5mm conductors instead of one line and one cpc)",
      "About 1.17Ω (taking 60m total there-and-back instead of the 30m circuit length)",
      "About 0.59Ω (R1: 30m × 7.41mΩ = 0.222Ω; R2: 30m × 12.10mΩ = 0.363Ω; total 0.585Ω)",
    ],
    correctAnswer: 3,
    explanation:
      "OSG mΩ/m: 2.5mm²=7.41, 1.5mm²=12.10. 30m × (7.41+12.10) = 30 × 19.51 = 0.585Ω.",
    section: "5.3",
    difficulty: "advanced",
  },
  {
    id: 116,
    question:
      "For Zs calculation from R1+R2 measured at 20°C, the value must be corrected to operating temperature using:",
    options: [
      "A multiplier from GN3 (typically 1.20 for 70°C thermoplastic), giving Zs = Ze + ((R1+R2) × 1.20)",
      "A divisor of 1.20, on the basis that conductor resistance falls as the cable warms in service",
      "The Cmin = 0.95 multiplier already applied within Table 41.3, so no further correction is needed",
      "A fixed addition of 0.05Ω, applied regardless of the conductor size or the operating temperature",
    ],
    correctAnswer: 0,
    explanation:
      "Conductor resistance rises ~0.4%/K. Tested at 20°C but operating ~70°C (a 50K rise) gives an Appendix 9 / GN3 factor of about 1.20, so Zs = Ze + ((R1+R2) × 1.20).",
    section: "5.3",
    difficulty: "advanced",
  },
  {
    id: 117,
    question:
      "Insulation resistance test should be conducted between:",
    options: [
      "Line and earth only, the neutral being excluded because it is already bonded to earth",
      "Live conductors connected together to earth (preferred when SPDs present), AND between live and neutral with loads disconnected",
      "Cpc and the main earthing terminal only, to confirm the earthing path is intact",
      "Line and neutral only, since insulation to earth is verified by the loop impedance test",
    ],
    correctAnswer: 1,
    explanation:
      "L+N joined to earth tests insulation to earth without putting voltage across L-N (avoids damaging SPDs/equipment). Where loads can be disconnected, L-N is also tested.",
    section: "5.4",
    difficulty: "intermediate",
  },
  {
    id: 118,
    question:
      "Effect of cables in parallel on insulation resistance:",
    options: [
      "Parallel insulation paths ADD in series, so the overall IR is the SUM of each cable's individual value",
      "Parallel cables have no effect on the measured IR, because insulation resistance is independent of quantity",
      "IR values in parallel ADD as conductances, so many parallel cables give a LOWER overall reading",
      "Each additional parallel cable RAISES the measured IR, because the extra copper improves the insulation",
    ],
    correctAnswer: 2,
    explanation:
      "Parallel insulation paths add as conductances (1/RT = 1/R1 + 1/R2 + ...). Each additional parallel cable lowers the measured value, even if each cable is individually fine.",
    section: "5.5",
    difficulty: "intermediate",
  },
  {
    id: 119,
    question:
      "Effect of cable LENGTH on insulation resistance:",
    options: [
      "Longer cable = LESS insulation surface to leak through = HIGHER measured IR, proportional to length",
      "Cable length has no effect on insulation resistance because IR depends only on the insulation material",
      "Longer cable = HIGHER conductor resistance, which the IR tester reads as a higher insulation value",
      "Longer cable = MORE insulation surface in parallel = LOWER measured IR. Test result expected to be inversely proportional to length",
    ],
    correctAnswer: 3,
    explanation:
      "Doubling length doubles the parallel insulation paths, halving IR. A long circuit naturally gives lower readings.",
    section: "5.5",
    difficulty: "intermediate",
  },
  {
    id: 120,
    question:
      "Reasons for verifying polarity per Reg 643.6 include:",
    options: [
      "To ensure single-pole devices (switches, fuses, MCBs) are connected in the LINE conductor only (not neutral), preventing equipment remaining live when switched off",
      "To confirm the line and neutral conductors are the same cross-sectional area at every accessory",
      "To verify the supply frequency is correct before any equipment is connected to the circuit",
      "To check the phase rotation is clockwise so that single-phase motors run in the correct direction",
    ],
    correctAnswer: 0,
    explanation:
      "If a single-pole switch is wired in the neutral, the load remains at line potential when switched off — major shock hazard.",
    section: "5.6",
    difficulty: "basic",
  },
  {
    id: 121,
    question:
      "Polarity must additionally be verified at:",
    options: [
      "Only at the consumer unit, since polarity cannot change between the board and the accessories",
      "Origin of the supply, every accessory (sockets, switches), and every Edison-screw lampholder (centre contact must be LINE)",
      "Only at the furthest point of each circuit, where polarity errors are most likely",
      "Only at bayonet-cap lampholders, Edison-screw types being inherently safe",
    ],
    correctAnswer: 1,
    explanation:
      "ES (Edison Screw) lampholders pose particular risk — touching the threaded shell during lamp change is common; line in shell would shock.",
    section: "5.7",
    difficulty: "basic",
  },
  {
    id: 122,
    question:
      "Procedure for verifying polarity (dead) per GN3 is:",
    options: [
      "Energise and confirm with an approved voltage indicator that the LINE terminal reads 230V to earth",
      "Measure insulation resistance between line and neutral, taking a low value as proof of correct polarity",
      "Continuity test from each bus-bar at the board to the matching LINE, NEUTRAL and cpc terminals",
      "Use a phase-rotation indicator at each accessory to confirm the line conductor is correctly placed",
    ],
    correctAnswer: 2,
    explanation:
      "Dead-test polarity uses continuity from the L bus-bar to each LINE terminal, the N bus-bar to each NEUTRAL terminal, and the MET to each cpc terminal — proving correct identification at every termination. Live polarity (Reg 643.6) repeats this once energised.",
    section: "5.7",
    difficulty: "intermediate",
  },
  {
    id: 123,
    question:
      "Earth electrode resistance (Ra) for a TT installation can be measured by (per GN3 Section 2.10):",
    options: [
      "Insulation resistance test at 500V DC between the electrode and the main earthing terminal at the origin",
      "Continuity test (R2 method) between the earth electrode and the cpc of the furthest circuit on the board",
      "RCD trip-time test taken at the electrode, with the measured trip time read off as a measure of resistance",
      "Fall-of-potential method, earth fault loop impedance (Ze) method, or earth-clamp (stake-less) loop method",
    ],
    correctAnswer: 3,
    explanation:
      "GN3 lists three methods: the three-point fall-of-potential method (most accurate, uses auxiliary spikes), the earth fault loop impedance method (a Ze test giving an approximation including the supply contribution), and the clamp-meter loop method. Fall-of-potential is most accurate but slow.",
    section: "5.8",
    difficulty: "advanced",
  },
  {
    id: 124,
    question:
      "Polarity verification at three-phase distribution boards must additionally check:",
    options: [
      "Phase rotation/sequence (L1-L2-L3, clockwise) with a rotation indicator before energising motors",
      "That all three line voltages are exactly equal to 230V to neutral at the distribution board",
      "That the neutral is fused on all three of the phases to provide balanced overcurrent protection",
      "That the prospective fault current measured is identical on each of the three line phases",
    ],
    correctAnswer: 0,
    explanation:
      "Reverse phase rotation runs motors backwards — dangerous on pumps, lifts and conveyors. A phase-rotation indicator (typically three lamps plus an arrow) confirms L1-L2-L3 positive (clockwise) rotation before energising rotating machinery.",
    section: "5.7",
    difficulty: "intermediate",
  },
  {
    id: 125,
    question:
      "Insulation resistance test, on a circuit incorporating an SPD, should be:",
    options: [
      "Carried out at 1000V DC to ensure the SPD is fully stressed so that any latent weakness is exposed",
      "Done at reduced voltage (250V), or with the SPD disconnected, then re-tested at full voltage",
      "Omitted entirely, on the basis that the SPD provides its own internal insulation monitoring function",
      "Carried out at the standard 500V with the SPD left connected, simply accepting the lower reading",
    ],
    correctAnswer: 1,
    explanation:
      "BS EN 61643 SPDs activate above their nominal voltage — applying 500V can spuriously trigger or damage them. Test at 250V where the SPD operating voltage would otherwise be exceeded, or disconnect the SPD and re-test at full voltage if appropriate.",
    section: "5.4",
    difficulty: "advanced",
  },
  {
    id: 126,
    question:
      "Factors affecting conductor resistance (Reg 524 + Appendix 4) include:",
    options: [
      "Only the cross-sectional area, length being irrelevant because resistance is a material property",
      "The supply voltage, frequency, and the prospective fault current at the origin",
      "Cross-sectional area, length, conductor material (copper vs aluminium ≈1.6×), and temperature (~0.4%/K rise above 20°C)",
      "Only the insulation type and the ambient humidity around the cable",
    ],
    correctAnswer: 2,
    explanation:
      "R = ρL/A. All four factors interact in design and test interpretation. Aluminium needs ~1.6× the csa of copper for equivalent R.",
    section: "5.3",
    difficulty: "intermediate",
  },
  {
    id: 127,
    question:
      "Measured (R1+R2) for the ring (from 3-step Step 3) is related to the per-leg measurements by:",
    options: [
      "(R1+R2) for the ring = (r1 + r2) — the full end-to-end series value of one single ring leg",
      "(R1+R2) for the ring = (r1 + r2)/2 — the simple parallel combination of the two ring legs",
      "(R1+R2) for the ring = 2 × (r1 + r2) — because the ring doubles the total conductor length",
      "(R1+R2) for the ring = (r1 + r2)/4 — two parallel paths, with line and cpc cross-connected",
    ],
    correctAnswer: 3,
    explanation:
      "A ring presents two parallel paths each containing line and cpc in series. The parallel of two equal values is R/2; cross-connecting both line and cpc gives the overall /4 factor, so (R1+R2)ring = (r1+r2)/4.",
    section: "5.2",
    difficulty: "advanced",
  },
  {
    id: 128,
    question:
      "Variations in Step-2 (cross-connected ring) readings of more than ~0.05Ω between sockets typically indicate:",
    options: [
      "A spur, broken ring, or high-resistance joint at a socket — investigation required",
      "A perfectly healthy ring, since readings always vary slightly between sockets",
      "Reversed polarity at one of the socket-outlets on the ring",
      "An insulation fault between line and neutral somewhere on the ring",
    ],
    correctAnswer: 0,
    explanation:
      "Healthy ring with no spurs gives near-constant readings. Spurs add resistance proportional to distance; breaks unbalance the ring.",
    section: "5.2",
    difficulty: "advanced",
  },
  {
    id: 129,
    question:
      "Earthing conductor for a TT system per Reg 542.3 should typically be:",
    options: [
      "A minimum of 1.5mm copper, the same csa as a typical lighting circuit cpc on a radial circuit",
      "Sized per Table 54.1, protected against corrosion and mechanical damage (e.g. 16mm buried copper)",
      "Aluminium of any size, on the basis that the soil provides the main fault path on a TT system anyway",
      "The same csa as the supply neutral, matching a TN-C-S main protective bonding conductor at the MET",
    ],
    correctAnswer: 1,
    explanation:
      "A buried earthing conductor must withstand corrosion and mechanical stress and meet the minimum csa of Table 54.1. Bare or PVC-sheathed copper (e.g. 16mm) is typical on a TT system.",
    section: "5.8",
    difficulty: "intermediate",
  },
  {
    id: 130,
    question:
      "On a 100m steel-armoured cable installed underground supplying a remote outbuilding (TN-S-derived), the SWA may serve as the cpc provided:",
    options: [
      "A separate 1.5mm copper cpc is also run alongside the armour to act as a backup earth path",
      "The armour is bonded only at the supply end, with the far end of the run left floating",
      "An adiabatic check shows the armour csa is sufficient, and the loop impedance meets the disconnection time",
      "The insulation resistance between the armour and the cores exceeds 1MΩ at a 500V DC test",
    ],
    correctAnswer: 2,
    explanation:
      "SWA armour can serve as the cpc but must pass the adiabatic check (Reg 543.1.3, S >= sqrt(I²t)/k) for fault-current withstand and the earth fault loop impedance check for disconnection time.",
    section: "5.1",
    difficulty: "advanced",
  },
  {
    id: 131,
    question:
      "Polarity at the supply origin (Ze test point) is verified by:",
    options: [
      "Continuity testing between the line and neutral terminals with the supply fully isolated upstream",
      "Measuring the insulation resistance between line and earth at the cut-out before energising",
      "Checking the phase rotation at the origin using a three-lamp phase-rotation indicator at the intake",
      "Confirming with an approved voltage indicator that the LINE carries supply voltage and the neutral does not",
    ],
    correctAnswer: 3,
    explanation:
      "DNO supply polarity is occasionally swapped (e.g. after cable joints). With the installation isolated downstream, an approved voltage indicator confirms the LINE terminal carries supply voltage to earth/neutral and the neutral does not, before relying on the rest of the polarity tests.",
    section: "6.1",
    difficulty: "intermediate",
  },
  {
    id: 132,
    question:
      "Per Reg 543.1.1, the minimum csa of a separate cpc must:",
    options: [
      "Be found by the adiabatic equation S = sqrt(I²t)/k, or selected directly from Table 54.7",
      "Always be 6mm copper regardless of the line conductor size or the circuit it is protecting",
      "Be exactly half the cross-sectional area of the line conductor in every case, with no minimum",
      "Be sized only against the prospective fault current, ignoring the required disconnection time",
    ],
    correctAnswer: 0,
    explanation:
      "Reg 543.1.1 allows the adiabatic equation S = sqrt(I²t)/k OR Table 54.7 (the simpler tabulated route, giving effectively the same csa as the line for cables up to 16mm²).",
    section: "5.1",
    difficulty: "advanced",
  },
  {
    id: 133,
    question:
      "When testing IR on a circuit that cannot be safely disconnected from electronic loads, the recommended approach is:",
    options: [
      "Raise the test voltage to 1000V so the electronics are fully proven before the circuit is energised",
      "Use 250V where the manufacturer permits, or test live conductors joined together to earth only",
      "Skip the insulation resistance test altogether and rely on the loop impedance result instead",
      "Test at 500V between line and neutral only, leaving the electronic equipment fully connected",
    ],
    correctAnswer: 1,
    explanation:
      "Reduced test voltage and the modified method (live conductors joined to earth, not between live and neutral) are GN3-approved alternatives that protect equipment while still verifying insulation to earth.",
    section: "5.4",
    difficulty: "advanced",
  },
  {
    id: 134,
    question:
      "Continuity of main protective bonding to extraneous conductive parts (gas, water, steel) should be verified by:",
    options: [
      "Insulation resistance test at 500V DC between the bonding conductor and the service pipe",
      "Earth fault loop impedance test between the bonded part and the supply line conductor",
      "Low-resistance ohmmeter (R2 method) from MET to the bonded service entry point — typically <0.05Ω; values significantly higher indicate poor connection",
      "A visual check of the clamp tightness, which is sufficient without any electrical test",
    ],
    correctAnswer: 2,
    explanation:
      "Bonding integrity must be electrically verified — visual is insufficient. Tight metal-to-metal connections at clamps should give very low resistance.",
    section: "5.1",
    difficulty: "intermediate",
  },
  {
    id: 135,
    question:
      "If continuity of a circuit cpc gives an unexpectedly high resistance (e.g. 4Ω on a short circuit), the inspector should:",
    options: [
      "Accept the value, since 4Ω is well within the maximum permitted cpc resistance",
      "Add the 4Ω to the measured Ze and record the total as the circuit Zs without further action",
      "Re-test at a higher instrument current to force the reading lower before recording it",
      "Investigate: check for loose terminations, broken cpc, damaged cable, parallel paths via metalwork — rectify before any live testing",
    ],
    correctAnswer: 3,
    explanation:
      "High R2 means ADS may not work. Find and fix root cause before live testing, which would be hazardous.",
    section: "5.5",
    difficulty: "intermediate",
  },
  {
    id: 136,
    question:
      "Insulation resistance value of EXACTLY 1.0 MΩ on a circuit at 500V test:",
    options: [
      "Meets the minimum but warrants GN3 investigation by sectional testing and visual inspection",
      "Fails outright, since the minimum acceptable insulation resistance value is actually 2MΩ at 500V",
      "Is an automatic C1 danger code, requiring the affected circuit to be isolated immediately on site",
      "Is recorded as a clear pass with no further action needed, regardless of the circuit length",
    ],
    correctAnswer: 0,
    explanation:
      "1MΩ is the minimum; values at or near it on short circuits indicate a problem. Sectional testing and visual inspection determine whether it reflects normal length-related leakage or a developing fault. Long circuits may legitimately approach the limit.",
    section: "5.4",
    difficulty: "intermediate",
  },
  {
    id: 137,
    question:
      "Test instruments for continuity testing must have the LIMP (low impedance) setting ON when testing:",
    options: [
      "Through any circuit longer than 50m, to compensate for the higher conductor resistance",
      "Through devices that may give nuisance trips on standard test current — and the reading interpreted with awareness of the test current limit",
      "On every continuity test, since the low-impedance mode is always the most accurate",
      "Only when testing insulation resistance on circuits that contain surge protective devices",
    ],
    correctAnswer: 1,
    explanation:
      "Some MFTs offer a low-current continuity mode for use through electronic devices — at the cost of reduced accuracy.",
    section: "4.3",
    difficulty: "advanced",
  },
  {
    id: 138,
    question:
      "When testing continuity of an SWA cable used as cpc, the inspector should:",
    options: [
      "Measure the insulation resistance between the armour and the cores at a 1000V DC test voltage",
      "Bond the armour at the supply end only and rely on the surrounding soil for the return path",
      "Measure R2 gland-to-gland and verify the armour is bonded at both ends (gland tight, banjo fitted)",
      "Test the armour continuity at 250V instead of 500V to avoid damaging the cable insulation",
    ],
    correctAnswer: 2,
    explanation:
      "SWA armour cpc relies on glanding at both ends. The inspector measures R2 from origin gland to far-end gland and verifies the armour is bonded at both ends — a loose gland or missing banjo washer invalidates cpc continuity.",
    section: "5.1",
    difficulty: "advanced",
  },
  {
    id: 139,
    question:
      "Polarity of an AC-supplied USB charging socket installed by another contractor is verified by:",
    options: [
      "Measuring the DC output voltage of the USB port and checking it against polarity markings",
      "An insulation resistance test between the USB terminals and earth at 500V DC",
      "A phase rotation test at the socket to confirm the line conductor is correctly placed",
      "Same dead-polarity test as a standard socket (line at LINE terminal); functional check via charging a known device confirms output polarity",
    ],
    correctAnswer: 3,
    explanation:
      "Even special accessories must satisfy basic polarity rules. Functional test confirms equipment operates correctly.",
    section: "5.7",
    difficulty: "intermediate",
  },
  {
    id: 140,
    question:
      "When a measured (R1+R2) at 20°C is 0.85Ω and Ze is 0.35Ω, calculated Zs at full load (×1.20 temperature factor) is:",
    options: [
      "1.37Ω (Ze + (R1+R2)×1.20 = 0.35 + 0.85×1.20 = 0.35 + 1.02 = 1.37Ω)",
      "1.20Ω (Ze + R1+R2 = 0.35 + 0.85, omitting the temperature multiplier)",
      "1.02Ω ((R1+R2)×1.20 only, omitting the Ze contribution)",
      "1.44Ω (Ze + (R1+R2)×1.28, using an incorrect temperature factor)",
    ],
    correctAnswer: 0,
    explanation:
      "Calculation: 0.35 + (0.85 × 1.20) = 0.35 + 1.02 = 1.37Ω. Compare against Table 41.3 for the device.",
    section: "5.3",
    difficulty: "advanced",
  },
  {
    id: 141,
    question:
      "If polarity is incorrect at a single-pole switch on a lighting circuit (switch in neutral), the symptom would be:",
    options: [
      "The light fails to come on at all because the switch interrupts the line conductor",
      "Light works but lampholder/luminaire body remains at line potential when switch is OFF — major shock risk during lamp change",
      "The lighting MCB trips every time the switch is operated because of the reversed connection",
      "The light flickers continuously because the neutral is being switched rather than the line",
    ],
    correctAnswer: 1,
    explanation:
      "Symptom is silent — light still works. Hazard appears only when someone changes the lamp. Polarity test at the accessory catches it.",
    section: "5.6",
    difficulty: "intermediate",
  },
  {
    id: 142,
    question:
      "On a 4mm² SWA cable 80m long supplying a TT outbuilding, expected R1+R2 (using armour as cpc, OSG/manufacturer mΩ/m data) is approximately:",
    options: [
      "About 0.37Ω (counting only the 4mm copper line conductor and ignoring the armour)",
      "About 1.57Ω (taking 160m there-and-back instead of the 80m run length)",
      "About 0.79Ω (R1: 80m × 4.61mΩ = 0.369Ω; R2 of armour for 4mm² SWA ~ 5.20 mΩ/m × 80m = 0.416Ω; total ~0.785Ω)",
      "About 0.42Ω (counting only the armour cpc and ignoring the line conductor)",
    ],
    correctAnswer: 2,
    explanation:
      "OSG: 4mm² Cu = 4.61 mΩ/m. SWA armour for 4mm² (2-core) is approx 5.2 mΩ/m. Sum 0.785Ω, well within most TT design constraints.",
    section: "5.3",
    difficulty: "advanced",
  },
  {
    id: 143,
    question:
      "If during continuity testing of a ring final, r1 = 0.40Ω and r2 = 0.65Ω, and Step 3 gives 0.26Ω at every socket, the result indicates:",
    options: [
      "A broken ring, because Step 3 should equal (r1+r2)/2 = 0.525Ω, not 0.26Ω",
      "A spur on the ring, because the Step 3 reading is lower than (r1+r2) = 1.05Ω",
      "A high-resistance joint, because Step 3 should equal r1 alone = 0.40Ω",
      "Healthy ring (Step 3 = (r1+r2)/4 = 1.05/4 = 0.2625Ω; matches measured 0.26Ω across all sockets)",
    ],
    correctAnswer: 3,
    explanation:
      "Calculation matches: (0.40 + 0.65)/4 = 0.2625Ω. Constant readings across all sockets = no spurs, no breaks.",
    section: "5.2",
    difficulty: "advanced",
  },
  {
    id: 144,
    question:
      "Reason for testing IR between L+N joined to earth (rather than L-N separately) when SPDs are present:",
    options: [
      "Avoids the test voltage appearing across the SPD (which is L-N or L-PE) potentially triggering or damaging it",
      "Speeds up the test by allowing line and neutral to be measured in a single operation",
      "Provides a higher insulation reading by halving the number of conductors under test",
      "Allows the SPD status indicator to be checked at the same time as the insulation test",
    ],
    correctAnswer: 0,
    explanation:
      "L+N together = no L-N voltage difference; only L (and N) to earth voltage applied. SPDs designed to clamp at higher voltages are protected.",
    section: "5.4",
    difficulty: "advanced",
  },
  {
    id: 145,
    question:
      "After altering a circuit (e.g. adding a socket), continuity of cpc on the WHOLE affected circuit must be re-verified because:",
    options: [
      "The added socket increases the connected load, raising the operating temperature of the whole circuit",
      "Disturbing existing terminations may have loosened them, so cpc integrity must be re-confirmed",
      "The csa of the existing cpc must be increased to suit the now slightly longer overall circuit length",
      "The previous test results are no longer valid, because the original certificate date has now expired",
    ],
    correctAnswer: 1,
    explanation:
      "Disturbing existing terminations may have loosened them, so the cpc integrity of the whole circuit (origin to all accessories) must be re-confirmed before energising. Reg 643.1.2 applies the same re-test logic to alteration work.",
    section: "5.2",
    difficulty: "intermediate",
  },

  // ============================================================
  // LO6: Live Tests - Polarity, Ze, Zs, PFC, RCD, AFDD, Phase Sequence (Q146-185)
  // ============================================================
  {
    id: 146,
    question: "Live polarity test (Reg 643.6) is conducted to confirm:",
    options: [
      "That the supply voltage is within +/- 10% of the nominal 230V at every accessory",
      "That the RCD trips within 300ms at 1×IΔn once the installation is energised",
      "After energising, that the supply polarity (line vs neutral) is as expected and consistent with dead-test polarity verification at all accessories",
      "That the earth fault loop impedance is below the Table 41.3 maximum at the furthest point",
    ],
    correctAnswer: 2,
    explanation: "Live polarity catches any wiring fault that might have been missed at dead-test, including supply-side issues from the DNO.",
    section: "6.1",
    difficulty: "intermediate",
  },
  {
    id: 147,
    question: "Earth fault loop impedance Zs at the furthest point of a circuit is the sum of:",
    options: [
      "Ze minus (R1+R2), since the internal resistance reduces the external loop value",
      "R1 + R2 only, the external loop impedance being excluded from Zs",
      "Ze + Rn (line plus neutral), the cpc not forming part of the loop",
      "Ze (external loop) + R1 (line cpc to fault) + R2 (cpc to MET) at operating temperature — abbreviated Zs = Ze + (R1+R2)cor",
    ],
    correctAnswer: 3,
    explanation: "Zs is the total loop impedance for an L-PE fault at the most-disconnect-difficult point.",
    section: "6.4",
    difficulty: "basic",
  },
  {
    id: 148,
    question: "Earth fault loop paths for TN-S systems:",
    options: [
      "L conductor -> fault -> cpc -> MET -> separate metallic earth conductor back to source transformer star point",
      "L -> fault -> cpc -> MET -> combined PEN conductor back to transformer (neutral and earth combined)",
      "L -> fault -> cpc -> MET -> earth electrode -> soil -> DNO electrode -> back to transformer",
      "L -> fault -> neutral -> MET -> earth electrode -> soil -> back to the supply transformer",
    ],
    correctAnswer: 0,
    explanation: "TN-S has separate neutral and earth conductors throughout supply and installation. Earth path is metallic from MET back to source.",
    section: "6.3",
    difficulty: "basic",
  },
  {
    id: 149,
    question: "Earth fault loop paths for TN-C-S (PNB - Protective Neutral Bonded, A4:2026 terminology):",
    options: [
      "L -> fault -> cpc -> MET -> separate metallic earth conductor back to source transformer star point",
      "L -> fault -> cpc -> MET -> combined PEN (neutral) conductor back to transformer (PEN bonded to earth at supply)",
      "L -> fault -> cpc -> MET -> earth electrode -> soil -> DNO electrode -> back to transformer",
      "L -> fault -> neutral -> earth electrode -> soil -> DNO electrode -> back to the transformer",
    ],
    correctAnswer: 1,
    explanation: "TN-C-S = combined PEN externally; separated to N and PE within the installation. Lower Ze typical (<=0.35Ω). A4:2026 uses PNB terminology in places.",
    section: "6.3",
    difficulty: "intermediate",
  },
  {
    id: 150,
    question: "Earth fault loop paths for TT systems:",
    options: [
      "L -> fault -> cpc -> MET -> separate metallic earth conductor back to source transformer star point",
      "L -> fault -> cpc -> MET -> combined PEN conductor back to transformer (PEN bonded at supply)",
      "L -> fault -> cpc -> MET -> earth electrode -> earth (soil) -> DNO supply electrode -> back to transformer",
      "L -> fault -> neutral -> MET -> combined PEN conductor back to the supply transformer",
    ],
    correctAnswer: 2,
    explanation: "TT relies on earth path through soil — typically high impedance (e.g. 50-200Ω). RCD essential for ADS within disconnection time.",
    section: "6.3",
    difficulty: "intermediate",
  },
  {
    id: 151,
    question: "ADS verification per Reg 411.4-411.6 requires verification that:",
    options: [
      "The insulation resistance between the live conductors and earth exceeds 1MΩ at a 500V test",
      "Every final circuit is fitted with a Type B RCD to detect smooth DC residual fault currents",
      "The main bonding conductor is sized to at least 16mm copper on every earthing arrangement used",
      "Measured Zs gives a fault current that operates the OCPD within the disconnection time, or a 30mA RCD is fitted",
    ],
    correctAnswer: 3,
    explanation: "ADS is verified where the measured Zs at the furthest point gives a fault current (U0/Zs) that operates the OCPD within the Reg 411.3.2 disconnection time, OR a 30mA RCD provides disconnection. Either path is acceptable but must be verified.",
    section: "6.4",
    difficulty: "intermediate",
  },
  {
    id: 152,
    question: "The RCD test per BS 7671 Reg 643.7.3 (A4:2026) requires:",
    options: [
      "A single AC test at 1×IΔn, within the published maximum; the 5×IΔn test was deleted",
      "Tests at 1×IΔn, 5×IΔn and 0.5×IΔn together, exactly as required by previous amendments",
      "A single test at 5×IΔn only, the 1×IΔn trip-time test having been deleted in A4:2026",
      "A test at 0.5×IΔn only, to confirm the device does NOT trip below half of its rated residual current",
    ],
    correctAnswer: 0,
    explanation: "A4:2026 reform: only the 1×IΔn AC test (at 0° and 180°) is required for verification, with the trip time within the published maximum (BS EN 61008/61009: 300ms general purpose). The 5×IΔn test was removed from Reg 643.7.3.",
    section: "6.8",
    difficulty: "advanced",
  },
  {
    id: 153,
    question: "Maximum operating time for a 30mA general-purpose RCD (BS EN 61008/61009) at 1×IΔn (per A4:2026 verification):",
    options: [
      "100ms",
      "300ms",
      "1000ms",
      "40ms",
    ],
    correctAnswer: 1,
    explanation: "300ms at 1×IΔn for general-purpose. 40ms at 5×IΔn applies as additional protection (Reg 415.1.1), but verification in A4:2026 is at 1×IΔn only.",
    section: "6.8",
    difficulty: "intermediate",
  },
  {
    id: 154,
    question: "When testing an RCD, the test must be conducted:",
    options: [
      "From the supply side of the RCD between L and N, taken at the consumer unit origin only",
      "Between line and neutral at the furthest socket, with the cpc disconnected for the test",
      "From the load side between L and PE, at the furthest point, at both 0° and 180° start phase",
      "Between neutral and earth at the origin, to confirm that no parallel earth paths exist anywhere",
    ],
    correctAnswer: 2,
    explanation: "The test is conducted from the load side of the RCD between L and PE, at the furthest practicable point on each circuit it protects. Phase angle affects waveform application, so testing at both 0° and 180° catches asymmetry in the trip mechanism.",
    section: "6.8",
    difficulty: "intermediate",
  },
  {
    id: 155,
    question: "Type AC RCDs detect:",
    options: [
      "Sinusoidal AC and pulsating DC residual currents, the same as a Type A device",
      "Smooth DC residual currents, making them suitable for EV charger circuits",
      "Sinusoidal AC, pulsating DC and smooth DC residual currents of all waveforms",
      "Only sinusoidal AC residual currents — UNSUITABLE for circuits with electronic loads producing pulsating DC (most modern loads)",
    ],
    correctAnswer: 3,
    explanation: "Type AC is increasingly inadequate for modern loads. BS 7671 (post-Amendment 2) prefers Type A as the default.",
    section: "6.8",
    difficulty: "advanced",
  },
  {
    id: 156,
    question: "Type A RCDs detect:",
    options: [
      "Sinusoidal AC and pulsating DC residual currents — the modern default device per Reg 531.3.3",
      "Only sinusoidal AC residual currents, exactly the same as a basic Type AC device would detect",
      "Smooth DC residual currents only, which is what makes them mandatory for EV charger circuits",
      "Sinusoidal AC, pulsating DC and smooth DC residual currents of every waveform, like a Type B",
    ],
    correctAnswer: 0,
    explanation: "Type A is the modern default, covering most domestic/commercial electronic loads. Required for circuits with switch-mode power supplies, dimmers and electronic ballasts.",
    section: "6.8",
    difficulty: "intermediate",
  },
  {
    id: 157,
    question: "Type B RCDs are required for circuits supplying:",
    options: [
      "Standard domestic lighting and socket-outlet circuits carrying purely resistive loads only",
      "Equipment producing smooth DC residual current, e.g. EV chargers without separation or VSDs",
      "Circuits supplying only switch-mode power supplies and electronic dimmer-controlled lighting",
      "Any circuit located in a bathroom or shower room that requires supplementary equipotential bonding",
    ],
    correctAnswer: 1,
    explanation: "Type B detects smooth DC fault currents that blind Types AC and A (Reg 531.3.3 / 722.531.3.101). Mandatory on EV chargers without an isolating transformer and on three-phase VSDs/inverters.",
    section: "6.8",
    difficulty: "advanced",
  },
  {
    id: 158,
    question: "AFDD test per Reg 643.7.4 (A4:2026):",
    options: [
      "An injection of a simulated series arc using a standard multifunction tester set to 1×IΔn",
      "A residual-current trip test at 30mA, on the basis that the AFDD also performs the RCD function",
      "A functional test-button check at commissioning and at periodic intervals, per the manufacturer",
      "An insulation resistance test of the AFDD electronics at 500V DC before the circuit is energised",
    ],
    correctAnswer: 2,
    explanation: "AFDD verification in BS 7671 is limited to the integral test-button check at commissioning and at periodic intervals (per the manufacturer); operational testing of the arc-detection algorithm needs OEM-specific equipment and cannot be replicated by standard test instruments.",
    section: "6.8",
    difficulty: "advanced",
  },
  {
    id: 159,
    question: "Per Reg 421.1.7 (A4:2026), AFDDs on socket-outlet final circuits up to 32 A are:",
    options: [
      "Mandatory on every single final circuit of every installation, with no exceptions permitted at all",
      "Prohibited within residential premises and permitted only in industrial and commercial settings",
      "No longer referenced anywhere in BS 7671 following the publication of Amendment 4:2026",
      "A requirement in HRRBs, HMOs, student accommodation and care homes; recommended elsewhere",
    ],
    correctAnswer: 3,
    explanation: "Reg 421.1.7 (A4:2026) makes AFDDs on socket-outlet final circuits not exceeding 32 A a REQUIREMENT in HRRBs, Houses in Multiple Occupation, purpose-built student accommodation and care homes, and a RECOMMENDATION for all other premises.",
    section: "6.4",
    difficulty: "advanced",
  },
  {
    id: 160,
    question: "Prospective fault current Ipf measurement per Reg 643.7.3.201 (A4:2026 - PFC) must be made:",
    options: [
      "At the origin and relevant points, taking the higher of the L-N and L-PE values, recorded as Ipf",
      "At the furthest point of each circuit only, taking the lower of the L-N and L-PE values measured",
      "Between line and neutral only, the line-earth value being irrelevant to the device breaking capacity",
      "At the origin only, recording the line-earth value and ignoring the line-neutral value altogether",
    ],
    correctAnswer: 0,
    explanation: "PFC governs OCPD breaking capacity. Both the L-N short (PSCC/Ipsc) and the L-PE fault (EFLC/Ipefc) are measured; the higher value is recorded as Ipf on the EIC.",
    section: "6.5",
    difficulty: "advanced",
  },
  {
    id: 161,
    question: "Standard breaking capacity (Icn) for BS EN 60898 MCBs commonly available:",
    options: [
      "30mA, 100mA, 300mA — matching the residual current ratings of common RCDs",
      "6kA, 10kA, 16kA — selected to exceed measured Ipf at the point of installation per Reg 432.1",
      "6A, 16A, 32A — the standard rated currents (In) of domestic MCBs",
      "0.4s, 1s, 5s — the maximum disconnection times for different earthing systems",
    ],
    correctAnswer: 1,
    explanation: "Reg 432.1 requires Icn >= Ipf. Common values 6kA (small DBs) or 10kA (typical UK domestic) up to 16kA. RCBOs typically 6kA.",
    section: "6.7",
    difficulty: "intermediate",
  },
  {
    id: 162,
    question: "If measured Ipf at supply origin = 8.5kA, and the consumer unit MCBs are 6kA, the inspector must:",
    options: [
      "Accept the installation — a 6kA device is adequate here because the measured Ipf is below 10kA",
      "Increase the rated current (In) of each MCB so as to bring the breaking capacity up to 8.5kA",
      "FAIL the verification — Icn < Ipf is C2; replace the devices or fit an upstream backup fuse",
      "Reduce the supply Ze by upgrading the main bonding so that the measured Ipf falls below 6kA",
    ],
    correctAnswer: 2,
    explanation: "Icn < Ipf is potentially dangerous (C2): the MCBs cannot safely interrupt the available fault current and can fail explosively. This violates Reg 432.1; remedy via a BS 88 backup fuse for energy limitation or higher-Icn devices.",
    section: "6.7",
    difficulty: "advanced",
  },
  {
    id: 163,
    question: "Methods for determining PFC where instrument testing is impractical (e.g. high-current supplies):",
    options: [
      "Measuring the earth electrode resistance and applying the formula Ipf = U0/Ra",
      "Reading the breaking capacity printed on the consumer unit and taking that as the PFC",
      "Multiplying the measured Zs at the furthest point by the rated current of the device",
      "Calculation from supply transformer impedance and cable parameters; OR use of DNO declared values (e.g. 16kA at typical urban supply origin)",
    ],
    correctAnswer: 3,
    explanation: "DNO declared values are the design fallback; calculations using transformer Zk and cable Z give site-specific results.",
    section: "6.6",
    difficulty: "advanced",
  },
  {
    id: 164,
    question: "Phase rotation/sequence test on three-phase supplies must verify:",
    options: [
      "L1-L2-L3 positive (clockwise) rotation, checked with a phase-rotation indicator before energising",
      "That all three line voltages are within +/- 5% of one another, measured at the distribution board",
      "That the neutral current is balanced evenly across all three of the phases under normal load",
      "That the prospective fault current measured is equal on each of the three individual line phases",
    ],
    correctAnswer: 0,
    explanation: "A phase-rotation indicator confirms L1-L2-L3 positive (clockwise) rotation so motors run the correct way at first energisation. Wrong rotation runs motors backwards and is potentially destructive on pumps, fans and compressors — always test BEFORE energising rotating loads.",
    section: "6.10",
    difficulty: "intermediate",
  },
  {
    id: 165,
    question: "Functional testing per Reg 643.10 includes confirming:",
    options: [
      "The insulation resistance of every switched circuit on the board measured at 500V DC before handover",
      "Switchgear, controls and interlocks operate, and RCDs/RCBOs trip on the test button as designed",
      "The earth fault loop impedance of each functional circuit measured at its furthest accessible point",
      "The polarity of every functional switch on the installation verified during the dead-test stage only",
    ],
    correctAnswer: 1,
    explanation: "Functional testing is end-to-end verification of every operating item — switchgear, controls (timers, sensors, contactors), interlocks, RCD/RCBO test-button operation and emergency systems. It is the final acceptance test before handover.",
    section: "6.11",
    difficulty: "intermediate",
  },
  {
    id: 166,
    question: "When dealing with clients during commissioning and certification, the inspector should:",
    options: [
      "Hand over only the certificate and avoid discussing any of the defects so the client is not alarmed",
      "Use technical regulation numbers throughout so the client understands the standard that was applied",
      "Communicate clearly; explain results, coded defects, recommended actions and limitations in writing",
      "Leave the documentation on site without any explanation, since the client can refer to BS 7671 itself",
    ],
    correctAnswer: 2,
    explanation: "The customer relationship is part of the job. A plain-English explanation of results, coded defects, recommended actions, document retention and limitations — confirmed in writing — supports informed decisions.",
    section: "6.13",
    difficulty: "basic",
  },
  {
    id: 167,
    question: "Earth fault loop impedance Zs measured directly using an MFT loop tester is:",
    options: [
      "Always exactly equal to the calculated Zs from Ze + (R1+R2), with no variation between them",
      "Typically HIGHER than the calculated Zs, because the test current itself heats the conductors",
      "The dead-test value measured before energising, requiring no separate live measurement at all",
      "A live reading INCLUDING parallel earth paths, so it may be LOWER than the calculated Zs",
    ],
    correctAnswer: 3,
    explanation: "A live Zs reading benefits from parallel earth paths via extraneous bonded metalwork, so it may be lower than the calculated Zs from Ze + (R1+R2), which is the worst-case design value. Both are used in the compliance check.",
    section: "6.4",
    difficulty: "advanced",
  },
  {
    id: 168,
    question: "Test results meeting standard values (Reg 643.1.1) are essential because:",
    options: [
      "Out-of-range values reveal a fault that stops the protective measure operating as designed",
      "Standard values guarantee that the installation will not require periodic inspection for ten years",
      "Meeting the standard values measurably reduces the energy consumption of the installation in service",
      "Standard values confirm the installation matches the original cost estimate given to the client",
    ],
    correctAnswer: 0,
    explanation: "Standard values are the design margins. A below-minimum or above-maximum result means ADS or insulation failure under fault, risking shock, fire or equipment damage.",
    section: "4.4",
    difficulty: "basic",
  },
  {
    id: 169,
    question: "For confirming polarity of an incoming supply at a TT installation, the inspector must:",
    options: [
      "Confirm L-PE = small voltage (<5V), N-PE = nominal (~230V), and L-N = zero at the cut-out",
      "Confirm L-PE = nominal voltage (~230V), N-PE = small voltage (typically <5V), and L-N = nominal — using approved voltage indicator at the cut-out or main switch",
      "Measure the earth electrode resistance and confirm it is below 200Ω before checking polarity",
      "Carry out a phase-rotation test at the cut-out to confirm the line conductor is correctly placed",
    ],
    correctAnswer: 1,
    explanation: "Even on TT, supply polarity must be verified — a supply-side neutral break can leave neutral at line potential.",
    section: "6.1",
    difficulty: "intermediate",
  },
  {
    id: 170,
    question: "RCD tested with a measured trip time of 250ms at 1×IΔn (30mA) is:",
    options: [
      "Fail — exceeds the 40ms maximum that applies to a 30mA RCD at 1×IΔn",
      "Fail — exceeds the 200ms maximum permitted under Reg 643.7.3 verification",
      "Pass — within 300ms maximum for general-purpose 30mA RCD per BS EN 61008/61009 (and Reg 643.7.3 verification)",
      "Fail — a general-purpose RCD must trip within 100ms at 1×IΔn to be acceptable",
    ],
    correctAnswer: 2,
    explanation: "300ms is the maximum at 1×IΔn for general-purpose 30mA. 250ms is acceptable.",
    section: "6.8",
    difficulty: "basic",
  },
  {
    id: 171,
    question: "If RCD trips on the test-button check but fails to trip during instrument test at 1×IΔn:",
    options: [
      "PASS — the test button trip is sufficient proof that the RCD operates correctly",
      "Re-test using a higher instrument current of 5×IΔn, accepting the device if it then trips",
      "Record it as a C3 improvement and recommend replacement at the next inspection",
      "FAIL — replace device. Test button only verifies the mechanical trip; instrument test verifies electrical detection of residual current",
    ],
    correctAnswer: 3,
    explanation: "Test button is mechanical only. Failure under instrument test = the detection circuitry has degraded — RCD must be replaced.",
    section: "6.8",
    difficulty: "intermediate",
  },
  {
    id: 172,
    question: "If measured Zs at the furthest point of a 32A B-Type radial = 1.55Ω, with Table 41.3 max = 1.37Ω:",
    options: [
      "FAIL — exceeds the max; up-size the cpc, reduce length, or fit RCD additional protection",
      "PASS — 1.55Ω is acceptable because the 80% rule allows a measured Zs of up to 1.71Ω here",
      "PASS — the measured value falls within the +/- 30% instrument tolerance around 1.37Ω",
      "PASS — Zs only needs to be below the 5s disconnection-time limit, not the 0.4s value",
    ],
    correctAnswer: 0,
    explanation: "1.55Ω > 1.37Ω means ADS is too slow under fault. Remediation: up-size the cpc, reduce circuit length, or fit 30mA RCD additional protection.",
    section: "6.4",
    difficulty: "advanced",
  },
  {
    id: 173,
    question: "The 80% rule for measured Zs (Reg 643.7.3 informative) suggests measured Zs should be:",
    options: [
      ">= 80% of Table 41.3 maximum, so that the circuit uses the full available impedance margin",
      "<= 80% of Table 41.3 maximum to allow for instrument uncertainty (typically +/- 30% for loop testers) and temperature rise above test temperature",
      "Exactly 80% of the measured Ze, regardless of the protective device rating",
      "<= 120% of Table 41.3 maximum, allowing for the cable being tested while cold",
    ],
    correctAnswer: 1,
    explanation: "80% rule provides margin for instrument tolerance and conductor temperature rise. Some MFTs apply this automatically.",
    section: "6.4",
    difficulty: "advanced",
  },
  {
    id: 174,
    question: "If during functional testing a contactor operates but with abnormal noise/heat:",
    options: [
      "PASS — the contactor operates, and noise or heat is normal during the first hour of running",
      "Record the noise as a C3 improvement and leave the contactor in service",
      "FAIL — contactor showing signs of distress (worn contacts, coil insulation degrading); investigate and rectify before energising in service",
      "Increase the supply voltage to the coil so the contactor seats more firmly and the noise stops",
    ],
    correctAnswer: 2,
    explanation: "Operation is necessary but not sufficient — abnormal indicators predict failure. Replace.",
    section: "6.11",
    difficulty: "intermediate",
  },
  {
    id: 175,
    question: "During EICR live tests, if RCD-protected circuit Zs measurement causes nuisance trip:",
    options: [
      "Temporarily link out the RCD so a full-current loop test can be carried out, then reconnect it",
      "Calculate Zs as Ze + (R1+R2) from the dead tests instead, since a live Zs cannot be obtained",
      "Bridge the RCD test terminals to bypass the residual detection during the loop test",
      "Use the no-trip / 15mA / lower-current loop test mode (modern MFTs have this), accepting slightly reduced accuracy in exchange for non-tripping",
    ],
    correctAnswer: 3,
    explanation: "No-trip loop test injects current too low to trip the RCD. Accuracy reduces (~30% tolerance) but result is still useful for compliance.",
    section: "6.4",
    difficulty: "intermediate",
  },
  {
    id: 176,
    question: "Selectivity (Reg 536) between RCDs in series is achieved when:",
    options: [
      "The upstream RCD has a higher IΔn and a time-delayed (Type S) characteristic, so the downstream trips first",
      "Both RCDs have the same 30mA rating so that they simply share the fault current equally between them",
      "The upstream RCD has a lower IΔn than the downstream device, so it trips first for any downstream fault",
      "The downstream RCD is time-delayed (Type S), so the upstream device trips first and clears the fault",
    ],
    correctAnswer: 0,
    explanation: "Selective coordination: a 100mA Type S RCD upstream of a 30mA RCD downstream means the downstream device operates first on its own zone fault, preventing total supply loss.",
    section: "6.7",
    difficulty: "advanced",
  },
  {
    id: 177,
    question: "Phase sequence reversal on a 3-phase induction motor will cause:",
    options: [
      "The motor to fail to start at all, drawing no current until the phases are corrected",
      "Motor to run in REVERSE direction — potentially destructive on pumps, fans, compressors, lifts; trips on overload often follow",
      "The motor to run at double speed, overheating the windings within seconds",
      "The motor to run normally, since three-phase induction motors are insensitive to phase order",
    ],
    correctAnswer: 1,
    explanation: "Wrong rotation = wrong direction. On centrifugal loads (pump impellers, lift gear) destructive within minutes.",
    section: "6.9",
    difficulty: "intermediate",
  },
  {
    id: 178,
    question: "Per Reg 415.1.1, 30mA RCD additional protection is required for:",
    options: [
      "Distribution circuits and sub-mains only, with all final circuits specifically excluded here",
      "Only circuits supplying fixed equipment such as immersion heaters, boilers and storage heaters",
      "General-use socket-outlets up to 32A, outdoor mobile equipment, and shallow concealed cables",
      "Only circuits located within bathrooms and shower rooms in domestic and similar premises",
    ],
    correctAnswer: 2,
    explanation: "Reg 415.1.1 requires 30mA additional protection for typical user-touched circuits: socket-outlets up to 32A for general use, mobile equipment up to 32A used outdoors, and cables concealed in walls below 50mm without other protection. A4:2026 retains this.",
    section: "6.8",
    difficulty: "intermediate",
  },
  {
    id: 179,
    question: "Test sequence for an RCBO (combined RCD + MCB) verifies:",
    options: [
      "Only the RCD function (1×IΔn trip time), the MCB function being assumed from the rating",
      "Only the MCB function (Zs at the furthest point), the residual function being covered by the test button",
      "Only the insulation resistance of the device measured at 500V before energising",
      "RCD function (1×IΔn trip time) AND MCB function (continuity, polarity, Zs to verify magnetic trip operates within disc time on L-PE faults beyond RCD coverage)",
    ],
    correctAnswer: 3,
    explanation: "RCBO combines two devices in one — both must be verified independently.",
    section: "6.8",
    difficulty: "intermediate",
  },
  {
    id: 180,
    question: "On a 230V TN system, Ipf measured at 4.2kA with a 32A B-type MCB (Icn 6kA): the OCPD coordination is:",
    options: [
      "Acceptable — Icn 6kA exceeds Ipf 4.2kA, satisfying Reg 432.1 breaking capacity requirement",
      "Unacceptable — Icn must be at least double the Ipf, so a 10kA device is required",
      "Unacceptable — Icn 6kA is below the 4.2kA Ipf and cannot interrupt the fault",
      "Acceptable only if a 30mA RCD is added, since the breaking capacity is otherwise too low",
    ],
    correctAnswer: 0,
    explanation: "6kA Icn safely interrupts a 4.2kA fault. Coordination satisfied.",
    section: "6.7",
    difficulty: "intermediate",
  },
  {
    id: 181,
    question: "When the inspector identifies that the supply earthing is unsuitable (e.g. PME prohibited area like marina, EV charger without RCBO/protection):",
    options: [
      "Accept the PME earth and fit a 30mA RCD, which removes the need for a TT conversion",
      "Code C2 / refuse certification + recommend conversion to TT supply with RCD additional protection AND notification to dutyholder/installer",
      "Increase the main bonding conductor to 25mm to compensate for the prohibited PME supply",
      "Connect the installation earth directly to the supply neutral to lower the loop impedance",
    ],
    correctAnswer: 1,
    explanation: "TN-C-S earthing in prohibited zones is potentially dangerous (broken PEN can transfer line voltage to earthed metalwork). Section 722 + DNO ENA EREC G12 cover.",
    section: "6.4",
    difficulty: "advanced",
  },
  {
    id: 182,
    question: "For commissioning a control panel with PLC and contactors, functional testing must verify:",
    options: [
      "Only the insulation resistance of all the control wiring measured at 500V DC before energising",
      "Only the earth fault loop impedance measured at the incoming supply terminals of the panel",
      "Each I/O operates, interlocks and the emergency stop function, and timing matches the spec",
      "Only the polarity of the incoming three-phase supply checked at the panel's main isolator",
    ],
    correctAnswer: 2,
    explanation: "Modern control systems are software plus hardware; functional commissioning is structured against the design specification — each input/output, interlock, the emergency stop with safety-rated contactors, and the timing/sequencing.",
    section: "6.11",
    difficulty: "intermediate",
  },
  {
    id: 183,
    question: "Voltage drop verification per Reg 643 / 525.202:",
    options: [
      "Always physically measured at every accessory with a calibrated voltmeter under full design load",
      "Verified instead by an insulation resistance test, where a low value indicates excessive voltage drop",
      "Limited to 10% for lighting and 15% for all other circuits, measured directly at the supply origin",
      "Generally inferred from cable size, length and design data; limits are 3% lighting and 5% other",
    ],
    correctAnswer: 3,
    explanation: "Voltage drop is normally a design check inferred from cable size, length and design data; physical measurement is only needed if compliance is in doubt. The limits are 3% (lighting) and 5% (other) of nominal voltage.",
    section: "6.11",
    difficulty: "intermediate",
  },
  {
    id: 184,
    question: "On an EICR, an installation on TN-C-S supply but connected to a swimming pool/marina/agricultural building violating Section 705/709/721 is coded:",
    options: [
      "C2 (potentially dangerous) — broken PEN risk in prohibited environments creates touch voltage hazard; inspector recommends conversion to TT",
      "C3 (improvement recommended) — acceptable in service but ideally converted to TT in future",
      "Satisfactory — a PME supply is permitted in any location provided a 30mA RCD is fitted",
      "C1 (danger present) in every case, requiring the installation to be isolated immediately",
    ],
    correctAnswer: 0,
    explanation: "C2 = potentially dangerous. PEN faults under specific environmental conditions of the special location could electrify exposed metalwork.",
    section: "6.4",
    difficulty: "advanced",
  },
  {
    id: 185,
    question: "EICR scenario: A 60-year-old rubber-insulated cable has IR result of 0.3MΩ at 500V. The appropriate code is:",
    options: [
      "Satisfactory — 0.3MΩ is acceptable on a long circuit that has aged rubber insulation throughout",
      "C2 (potentially dangerous) — below the 1 MΩ minimum, the insulation has failed; replacement advised",
      "C3 (improvement recommended) — the low reading is essentially cosmetic and presents no real danger",
      "FI (further investigation) only — the circuit should be re-tested at 250V before any code is assigned",
    ],
    correctAnswer: 1,
    explanation: "0.3MΩ is well below the 1MΩ minimum, so the insulation has failed. Aged rubber compounds are especially prone to deterioration (loss of elasticity, rising conductivity). Code C2, escalating to C1 only if an immediate shock/fire hazard exists.",
    section: "6.4",
    difficulty: "advanced",
  },
  // ============================================================
  // A4:2026 update questions (Q186-Q200) — Table 41.3, AFDDs (Reg 421.1.7),
  // Reg 132.13, single-test RCD verification, EICR coding refresh.
  // ============================================================
  {
    id: 186,
    question: "Under BS 7671 Amendment 4:2026, the maximum permitted Zs for a 32A Type B MCB on a TN system (per the updated Table 41.3) is:",
    options: [
      "1.44 Ω",
      "1.50 Ω",
      "1.37 Ω",
      "0.72 Ω",
    ],
    correctAnswer: 2,
    explanation: "Table 41.3 in A4:2026 lists 1.37 Ω for a 32A Type B MCB on a 230 V TN system (the value used at the elevated 80% Cmin). The pre-amendment value of 1.44 Ω is now superseded.",
    section: "3.4",
    difficulty: "intermediate",
  },
  {
    id: 187,
    question: "Per Regulation 421.1.7 in BS 7671 Amendment 4:2026, AFDDs are now:",
    options: [
      "Mandatory on every AC final circuit of a fixed installation, with absolutely no exceptions permitted",
      "Mandatory only on socket-outlet circuits rated up to and including 32A, in every type of premises",
      "No longer referenced at all — Amendment 4:2026 removed AFDDs from BS 7671 in their entirety",
      "Required on 32A socket-outlet circuits in HRRBs, HMOs, student accommodation and care homes",
    ],
    correctAnswer: 3,
    explanation: "Reg 421.1.7 was redrafted in A4:2026: AFDDs on socket-outlet final circuits not exceeding 32 A are now a REQUIREMENT in BS 7671 itself for Higher Risk Residential Buildings, Houses in Multiple Occupation, purpose-built student accommodation and care homes, and a RECOMMENDATION for all other premises.",
    section: "1.6",
    difficulty: "intermediate",
  },
  {
    id: 188,
    question: "Which BS 7671 regulation, renumbered in Amendment 4:2026, now requires the designer to record the assumed external influences and design assumptions on the certificate?",
    options: [
      "Reg 132.13",
      "Reg 134.1.1",
      "Reg 132.12",
      "Reg 132.14",
    ],
    correctAnswer: 0,
    explanation: "Reg 132.13 in A4:2026 (previously 132.12 in earlier amendments) requires the designer to provide written design data — assumed external influences, supply characteristics and so on — recorded on the certificate.",
    section: "5.1",
    difficulty: "intermediate",
  },
  {
    id: 189,
    question: "Under BS 7671 Amendment 4:2026, RCD operating-time verification on a Type AC/A 30 mA RCD requires testing at:",
    options: [
      "Both 1×IΔn and 5×IΔn, as required under previous amendments",
      "1×IΔn only — the 5×IΔn AC test was deleted in Amendment 4:2026",
      "5×IΔn only, with the 1×IΔn trip-time test deleted",
      "½×IΔn (no-trip) and 1×IΔn, with the 5×IΔn test retained",
    ],
    correctAnswer: 1,
    explanation: "Amendment 4:2026 simplified RCD verification. The 5×IΔn AC test has been removed; a single 1×IΔn AC trip-time test is now sufficient (with the half-rated no-trip test retained for Type B/F where required).",
    section: "3.5",
    difficulty: "intermediate",
  },
  {
    id: 190,
    question: "An EIC issued under BS 7671 Amendment 4:2026 must show, in the new schedule columns, which of the following?",
    options: [
      "The arc-flash incident energy and the PPE category required at each distribution board",
      "The carbon footprint of the cable runs and the recycled content of the consumer unit",
      "Loop impedance, RCD trip time at 1×IΔn, AFDD presence (Y/N) and earthing arrangement (TN-S, TN-C-S/PNB, TT)",
      "The cost of each circuit and the labour hours recorded against the installation",
    ],
    correctAnswer: 2,
    explanation: "A4:2026 model schedules added explicit columns for AFDD presence and updated the earthing arrangement to distinguish TN-C-S from PNB. Loop impedance, single-test RCD time, and earthing arrangement remain core entries.",
    section: "5.2",
    difficulty: "intermediate",
  },
  {
    id: 191,
    question: "On a TN-C-S (PNB) supply, why does Amendment 4:2026 specifically distinguish PNB from conventional TN-C-S on the model certificate?",
    options: [
      "Because a PNB supply always uses a TT earth electrode in addition to the incoming PEN conductor",
      "Because PNB requires a Type B RCD on every final circuit, unlike a conventional TN-C-S supply",
      "Because PNB carries a higher prospective fault current than any other earthing arrangement used",
      "Because the neutral-earth link sits at the consumer's intake, giving different fault path characteristics",
    ],
    correctAnswer: 3,
    explanation: "Protective Neutral Bonding (PNB) is a TN-C-S variant where the N-E link sits at the consumer's intake rather than the DNO source. A4:2026 treats it as a separate selectable certificate option so the supply and its fault path are recorded accurately.",
    section: "5.2",
    difficulty: "advanced",
  },
  {
    id: 192,
    question: "During the initial verification of a new circuit you measure Zs = 1.40 Ω on a 32A Type B MCB on a 230V TN system. Under A4:2026 Table 41.3 (limit 1.37 Ω) this is:",
    options: [
      "Non-compliant — Zs exceeds the 1.37 Ω maximum, so the circuit fails and must be re-designed",
      "Compliant — 1.40 Ω falls within the +/- 30% instrument tolerance around the 1.37 Ω limit value",
      "Compliant — the 80% rule permits a measured Zs of up to 1.71 Ω before the circuit actually fails",
      "Compliant — Zs only needs to satisfy the 5 s disconnection time, not the stricter 0.4 s value",
    ],
    correctAnswer: 0,
    explanation: "1.40 Ω > 1.37 Ω (Table 41.3, A4:2026). The circuit cannot meet the 0.4 s disconnection time at the design fault current, so it fails verification; remedy with a larger conductor, RCD additional protection or supplementary bonding before energising.",
    section: "3.4",
    difficulty: "advanced",
  },
  {
    id: 193,
    question: "When commissioning an EV charger fed from a TN-C-S supply, A4:2026 Section 722 requires:",
    options: [
      "A 100mA time-delayed Type S RCD on the EV charging circuit to provide selectivity with upstream devices",
      "Either conversion to TT or a means of detecting an open-PEN condition, to prevent dangerous touch voltage",
      "An increase of the main protective bonding conductor to 25mm to handle the broken-PEN fault current",
      "Supplementary bonding of the vehicle chassis to the building structural steelwork at the charge point",
    ],
    correctAnswer: 1,
    explanation: "Section 722 was strengthened by A4:2026: an open-PEN detection device (e.g. integral PEN-loss protection in the EVSE) or a TT island is mandatory when EV charging is fed from a TN-C-S/PME supply, because a broken PEN could energise the vehicle bodywork.",
    section: "4.4",
    difficulty: "advanced",
  },
  {
    id: 194,
    question: "On a Schedule of Test Results under A4:2026, an insulation resistance reading of '>299 MΩ' on a circuit tested at 500 V dc means:",
    options: [
      "A failing result — the insulation has broken down and the circuit must therefore not be energised",
      "An instrument fault — the tester should be sent away for recalibration before the result is recorded",
      "The IR is at or above the instrument's display ceiling — a pass; record as '>299' not the numeral",
      "A borderline result requiring further investigation by sectional insulation testing of the circuit",
    ],
    correctAnswer: 2,
    explanation: "Many MFTs cap the displayed IR at 299 MΩ on a 500 V test. A4:2026 / GN3 confirm a '>299 MΩ' record is correct — the actual value is simply above the instrument's range, well above the 1 MΩ minimum.",
    section: "3.2",
    difficulty: "basic",
  },
  {
    id: 195,
    question: "When commissioning a 3-phase distribution board you find one phase reads 245 V, the other two read 230 V. The most likely fault is:",
    options: [
      "Reversed phase rotation on the incoming supply, raising one phase voltage above the other two",
      "A failed SPD on the raised phase, clamping the other two phases down to the nominal 230 V level",
      "An undersized cpc on the raised phase, increasing that phase's earth fault loop impedance value",
      "A loose, high-resistance neutral shifting the star point — confirm, isolate, and remake the termination",
    ],
    correctAnswer: 3,
    explanation: "A loose / high-resistance neutral causes the star point to drift, lifting one phase voltage above 230 V and dropping others. Diagnosed by N-E and L-N voltage variance, then resolved by isolating, proving dead and remaking the neutral terminations.",
    section: "6.9",
    difficulty: "advanced",
  },
  {
    id: 196,
    question: "An EICR issued in 2026 should explicitly cite:",
    options: [
      "BS 7671:2018 incorporating Amendment 4:2026",
      "BS 7671:2018 incorporating Amendment 2:2022",
      "BS 7671:2026 (the standard is fully reissued under a new year)",
      "BS 7671:2018 (no amendment reference is required on the report)",
    ],
    correctAnswer: 0,
    explanation: "From the A4:2026 effective date, EICRs must reference 'BS 7671:2018+A4:2026' (or the equivalent house style) so that the inspection criteria applied are unambiguous.",
    section: "5.3",
    difficulty: "basic",
  },
  {
    id: 197,
    question: "Continuity of a ring final circuit (R1+R2 end-to-end test, step 2 of the ring test) confirms:",
    options: [
      "That the insulation resistance between the line and the cpc exceeds 1MΩ at a 500V DC test",
      "That the line and CPC of the ring are continuous and unbroken end-to-end around the loop",
      "That the RCD protecting the ring trips within 300ms at 1×IΔn once the circuit is energised",
      "That the polarity is correct at every single socket-outlet around the ring final circuit",
    ],
    correctAnswer: 1,
    explanation: "Step 2 of the ring final circuit test (per GN3) measures end-to-end continuity of L and CPC. A high or open reading flags a broken conductor at an accessory termination before the circuit is energised.",
    section: "3.4",
    difficulty: "basic",
  },
  {
    id: 198,
    question: "On the new A4:2026 EICR coding flowchart, an undersized main protective bonding conductor (e.g. 6 mm² where 10 mm² is required for a 100 A PME supply) is normally coded:",
    options: [
      "C3 (improvement recommended) — undersized bonding is acceptable provided a 30mA RCD is fitted",
      "Satisfactory — 6mm bonding is adequate for any PME supply up to and including 100A at the cut-out",
      "C2 (potentially dangerous) — fails the Reg 544.1 csa, undermining fault protection on a PEN failure",
      "FI (further investigation) — the bonding size cannot be coded without first measuring its resistance",
    ],
    correctAnswer: 2,
    explanation: "Inadequate main bonding for the supply type is potentially dangerous because it undermines fault protection if the PEN fails; remedial action is required. The standard convention is C2; only code C1 if the bonding is missing entirely AND a danger is present today.",
    section: "5.4",
    difficulty: "intermediate",
  },
  {
    id: 199,
    question: "When commissioning a new installation, the order of dead tests should be:",
    options: [
      "Insulation resistance, continuity of CPCs, polarity, then earth fault loop impedance — all before energising",
      "Earth fault loop impedance, RCD trip time, polarity, then insulation resistance — before energising",
      "Polarity, RCD operation, continuity of CPCs, then insulation resistance — before energising",
      "Continuity of CPCs and ring conductors, insulation resistance, polarity, earth electrode resistance (TT) — completed BEFORE energising",
    ],
    correctAnswer: 3,
    explanation: "GN3 sets the dead-test sequence: continuity (R1+R2 / ring step 1+2), insulation resistance, polarity, then earth electrode resistance for TT. Loop impedance and RCD trip times are live tests done after energising.",
    section: "3.4",
    difficulty: "basic",
  },
  {
    id: 200,
    question: "When commissioning is complete on a new installation under A4:2026, the documentation pack handed to the client must include:",
    options: [
      "EIC, both schedules, as-installed drawings, design data (Reg 132.13), and protective-device data",
      "The EIC alone, since the schedules and the drawings are retained only by the installer who did the work",
      "An EICR plus a Schedule of Test Results, as is required for a brand-new installation under A4:2026",
      "Only the manufacturer information for the consumer unit and the outgoing protective devices fitted",
    ],
    correctAnswer: 0,
    explanation: "A4:2026 reinforces the design-data requirement under Reg 132.13. A complete pack is the EIC plus the Schedule of Inspections and Schedule of Test Results, as-installed drawings, the designer's written design data, and manufacturer information for AFDDs, RCBOs and SPDs.",
    section: "5.1",
    difficulty: "intermediate",
  },
];

// Helper function to get random questions for mock exams
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...module5Questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Helper function to get questions by section
export const getQuestionsBySection = (section: string): Question[] => {
  return module5Questions.filter((q) => q.section === section);
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (
  difficulty: 'basic' | 'intermediate' | 'advanced'
): Question[] => {
  return module5Questions.filter((q) => q.difficulty === difficulty);
};

// Map section codes to broader topic labels (used by getQuestionsByTopic).
const M5_SECTION_TOPIC: Record<string, string> = {
  '1': 'Principles & Safe Isolation',
  '2': 'Inspection',
  '3': 'Testing',
  '4': 'Commissioning',
  '5': 'Certification & Reporting',
  '6': 'Faults & EICR Coding',
  '7': 'Special Locations',
};

// Filter questions by topic (matches the leading section number, e.g. '3.4' -> '3').
export const getQuestionsByTopic = (topic: string): Question[] => {
  return module5Questions.filter((q) => {
    const lead = (q.section || '').split('.')[0];
    return M5_SECTION_TOPIC[lead] === topic;
  });
};

// Structural validation — used by tests / spot-checks.
export const validateQuestionBank = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const seenIds = new Set<number>();
  module5Questions.forEach((q, idx) => {
    if (typeof q.id !== 'number') errors.push(`Q[${idx}]: id must be a number`);
    if (seenIds.has(q.id)) errors.push(`Q[${idx}]: duplicate id ${q.id}`);
    seenIds.add(q.id);
    if (!q.question) errors.push(`Q${q.id}: question text missing`);
    if (!Array.isArray(q.options) || q.options.length < 2)
      errors.push(`Q${q.id}: options must have at least 2 entries`);
    if (
      typeof q.correctAnswer !== 'number' ||
      q.correctAnswer < 0 ||
      q.correctAnswer >= (q.options?.length || 0)
    )
      errors.push(`Q${q.id}: correctAnswer index out of range`);
    if (!q.explanation) errors.push(`Q${q.id}: explanation missing`);
    if (!q.section) errors.push(`Q${q.id}: section missing`);
    if (!['basic', 'intermediate', 'advanced'].includes(q.difficulty as string))
      errors.push(`Q${q.id}: difficulty invalid`);
  });
  return { isValid: errors.length === 0, errors };
};

export default module5Questions;
