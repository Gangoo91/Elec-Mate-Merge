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

import {
  drawWeighted,
  LEVEL3_WEIGHTS,
  type DifficultyWeights,
} from '@/utils/apprenticeQuestionDraw';

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
      'The supply voltage does not exceed 230V, AND the circuit is protected by a 30mA RCD, AND the worker holds a current ECS card',
      'It is unreasonable in all the circumstances to make dead, AND it is reasonable to work live, AND suitable precautions are taken',
      'The duty holder has issued a written permit-to-work, AND a second competent person is present, AND the work lasts no longer than one hour',
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
      'Switch off, test dead using a multimeter, then lock off and apply a caution notice once the circuit reads dead',
      'Identify the circuit, prove the indicator dead, isolate, test the circuit, then lock off afterwards',
      'Identify, switch off, secure isolation, prove indicator live, test for absence of voltage, re-prove live',
      'Lock off the supply, test for voltage, prove the indicator live, then switch off and post the notices',
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
      'A digital multimeter set to the AC voltage range (e.g. Fluke 117), provided the leads carry fused probes',
      'A non-contact voltage detector (volt-stick), as it requires no physical contact with live parts',
      'A mains-test neon screwdriver (single-pole), provided it is checked against a known live source first',
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
    question:
      'Why must the voltage indicator be proved on a known live source both before and after testing the circuit?',
    options: [
      'To confirm the indicator was working immediately before AND immediately after the dead test, eliminating the risk of a faulty indicator giving a false dead reading',
      'To allow the battery in the indicator to be calibrated against the measured supply voltage, so that the dead reading taken at the point of work can be relied upon',
      'To satisfy the manufacturer warranty condition, which requires the indicator to be checked against a live source at the start of each working day before it is used',
      'To confirm the proving unit output matches the nominal supply voltage, so that the dead reading obtained can be quantified accurately on the schedule of results',
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
      'Which one of the following is not an implication of failing to carry out safe isolation?',
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
      'Place a clearly written warning label over the MCB toggle at the board, instructing others not to switch the circuit back on while work continues',
      'Switch the MCB to the off position, then tell the householder that work on the circuit is in progress and that it must be left well alone',
      'Use a single-pole MCB lock-off device with a personal padlock, the only key retained by the person doing the work, plus a caution notice',
      'Remove the circuit fuse carrier from the board, keeping it in your own pocket for the whole of the time you are working on the circuit on site',
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
      'Which consequence of safely isolating an installation must the inspector plan for and manage?',
    options: [
      'Reduced cable temperature once de-energised, needing re-measurement of conductor resistance',
      'Loss of the proving unit reference voltage, preventing the indicator from being re-proved',
      'Increased prospective fault current at the origin, while the installation is off-load',
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
      'The individual employee (under the personal duty in s.7 to take reasonable care)',
      'The Health and Safety Executive (as the authority approving each method statement)',
      'The client/duty holder commissioning the work (under s.3)',
    ],
    correctAnswer: 0,
    explanation:
      'HASAWA s.2 places the primary duty on the employer; s.7 places a co-operation/reasonable care duty on every employee. Self-employed inspectors carry both duties.',
    section: '1.6',
    difficulty: 'basic',
  },
  {
    id: 9,
    question: 'GS38-compliant test leads must have which of the following features?',
    options: [
      'Unshrouded crocodile clips, bare 20mm probe tips, and unfused leads (to ensure a positive contact)',
      'Finger barriers, shrouded probes exposing no more than 4mm of metal, and fused tips (typically 500mA HRC)',
      'Retractable probe tips exposing 15mm of metal, colour-coded sheaths, and a 13A fuse (BS 1362) in each lead',
      'Coiled leads at least 3m long, moulded plug ends, and no fuses (so the full fault current can be measured)',
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
      'The electrical shock/arc-flash hazards alone, since every other risk on site is covered by the separate assessment held by the occupier',
      'The prospective fault current/earth fault loop impedance values, measured at the origin of the installation before any work starts',
      'Electrical hazards, working at height, manual handling, slips/trips, lone working, occupant disruption, and emergency arrangements',
      'The competence/qualifications of the personnel carrying out the testing, which the client checks before granting site access',
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
      'Accept the existing lock-off and caution notice as proof the circuit is still dead',
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
      'Where live testing of low voltage switchgear cannot be avoided, the minimum personal protective equipment is:',
    options: [
      'Arc-rated clothing to the incident energy, voltage-rated insulated gloves, face protection, insulated footwear',
      'Standard cotton overalls, latex examination gloves, and safety glasses to BS EN 166 giving splash protection only',
      'High-visibility vest, steel-toe-capped boots, and a hard hat as required for any general work on a construction site',
      'Cut-resistant gloves, ear defenders, and a dust mask to protect against dust and contaminants inside the switchgear',
    ],
    correctAnswer: 0,
    explanation:
      'Arc-flash PPE selection follows incident-energy assessment per IEEE 1584/Energy Networks Association guidance; gloves must be voltage-class rated and in-date, with arc-rated clothing, face protection and insulated footwear.',
    section: '1.6',
    difficulty: 'basic',
  },
  {
    id: 13,
    question:
      'A permit-to-work for HV inspection differs from a sanction-to-test in that a permit:',
    options: [
      'Authorises defined live testing on equipment kept energised',
      'Authorises work on equipment confirmed dead and earthed',
      'Is issued verbally, whereas a sanction-to-test is in writing',
      'Lets any competent person remove the earths unsupervised',
    ],
    correctAnswer: 1,
    explanation:
      'Permit-to-work is for dead-and-earthed conditions; sanction-to-test allows defined live testing under controlled conditions. Both must be in writing and competently issued.',
    section: '1.6',
    difficulty: 'intermediate',
  },
  {
    id: 14,
    question:
      'Where isolation is carried out at the consumer unit main switch alone, what further action must the inspector take?',
    options: [
      'Disconnect the main earthing conductor at the MET — so that no fault path remains on the installation',
      'Switch off every individual circuit breaker as well — the main switch alone does not break the neutral',
      'Lock off the main switch with a personal padlock and post a caution notice — and prove dead at the point of work',
      'Withdraw the DNO service fuse and retain it — a main switch cannot be secured in the off position',
    ],
    correctAnswer: 2,
    explanation:
      'Switching alone is not isolation. A securable means of disconnection (padlock, removable handle) plus signage and dead-testing at the work point are all required.',
    section: '1.2',
    difficulty: 'basic',
  },
  {
    id: 15,
    question: 'Why is testing carried out before energising any new installation?',
    options: [
      'To allow the test instrument\'s batteries (and its leads) to be conditioned against the supply, so the first live readings are accurate',
      'To satisfy the distributor (DNO), who will not connect the cut-out and meter until the installation has been proven',
      'To warm the conductors to their normal operating temperature (70°C), so the loop impedance readings afterwards are accurate',
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
    question: 'A pre-job survey before initial verification typically includes:',
    options: [
      'Confirming scope, supply characteristics, design data availability, accessibility, occupancy, and previous certification',
      'Measuring earth fault loop impedance and prospective fault current at every accessory, in advance of the visit',
      'Completing the full Schedule of Test Results from the design data, before any of the inspection or testing is carried out on site',
      'Energising the installation and recording the RCD trip times, to establish a baseline before any other work begins on site',
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
    difficulty: 'intermediate',
  },
  {
    id: 18,
    question:
      'Before isolating the supply in a dwelling where an occupant depends on medical equipment, the electrician should:',
    options: [
      'Isolate the supply without any warning, so that the work is completed as quickly as possible and the disruption caused to the occupant is minimised overall',
      'Rely on the occupant to notice the loss of supply for themselves, and to contact their own care provider if they need help with their equipment during the work',
      'Notify the occupant in advance, agree timings, identify life-safety equipment dependent on supply, plan temporary arrangements where required, document agreement',
      'Leave the medical equipment energised on its own separate circuit while isolating the rest of the installation for the testing work, without telling the occupant first',
    ],
    correctAnswer: 2,
    explanation:
      'Implications of safe isolation extend beyond the worker; vulnerable occupants require advance planning to avoid harm from supply loss.',
    section: '1.3',
    difficulty: 'intermediate',
  },
  {
    id: 19,
    question: 'A near-miss (e.g. discovering an isolated circuit is actually live) must be:',
    options: [
      'Logged as a training point at the next team meeting, since RIDDOR (reporting of injuries) applies only where a person has been harmed',
      'Recorded informally in a personal site notebook (not the site H&S file), unless the same thing happens again on a later site visit',
      'Reported only to the distributor (DNO), who are responsible for investigating every supply-related incident of this kind in the area',
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
      'On a TN-C-S supply, before disconnecting the main earthing conductor to measure Ze, the inspector must:',
    options: [
      'Switch off and lock off the main switch first to prevent the touch-voltage hazard arising if a fault develops while the earth is removed',
      'Disconnect the main protective bonding conductors first so that they do not affect the value of the Ze reading obtained at the origin of supply',
      'Leave the installation energised and under load so that the Ze reading obtained reflects the normal operating conditions of the installation',
      'Connect a temporary earth electrode at the MET to maintain a fault path while the main earthing conductor is removed for the Ze measurement',
    ],
    correctAnswer: 0,
    explanation:
      'Removing the main earth on a live installation is dangerous: any earth fault becomes a touch-voltage hazard. The installation must be isolated first.',
    section: '1.6',
    difficulty: 'intermediate',
  },
  {
    id: 21,
    question:
      'Which document gives the legal duty to maintain electrical systems so as to prevent danger?',
    options: [
      'BS 7671 Regulation 642.1 (initial verification) — verify before putting into service',
      'EAWR 1989 Regulation 4(2) — "as may be necessary to prevent danger"',
      'Building Regulations Part P (Schedule 1) — domestic electrical work',
      'Electricity Safety, Quality and Continuity Regulations 2002 (ESQCR) — DNO duties',
    ],
    correctAnswer: 1,
    explanation:
      'EAWR Reg 4(2) is the statutory maintenance duty. BS 7671 is the means of compliance, but the legal duty is in EAWR.',
    section: '1.1',
    difficulty: 'intermediate',
  },
  {
    id: 22,
    question: 'Insulated tools used during testing must comply with:',
    options: [
      'BS EN 61557 (the standard for test/measuring instruments)',
      'BS EN 60529 (the IP2X/IPXXB enclosure rating standard)',
      'BS EN IEC 60900 (1000V AC / 1500V DC rated)',
      'BS EN 60898 (Type B/C circuit-breakers for household use)',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN IEC 60900 sets the dielectric and impact testing standard for insulated hand tools used on live or near-live work.',
    section: '1.6',
    difficulty: 'intermediate',
  },
  {
    id: 23,
    question: 'The principal hazards encountered during inspection and testing are:',
    options: [
      'Electric shock/electrocution only, since modern test instruments eliminate every other hazard on site',
      'Overvoltage/transient damage to the test instrument, and incorrect readings caused by a flat battery',
      'Loss of supply to the building, and the inconvenience/disruption this causes to the occupier during testing',
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
      'How often should a test instrument used for certification be recalibrated, as a minimum?',
    options: [
      'Annually, with interim accuracy checks (e.g. against a calibration check box) before each use',
      'Every five years, the periodic interval for rented dwellings (PRS Regulations 2020)',
      'Only when the instrument gives an obviously incorrect reading, or when it is found to be visibly damaged (whichever occurs first)',
      'Monthly, with full UKAS-traceable recalibration (certificate issued) before each job',
    ],
    correctAnswer: 0,
    explanation:
      'GN3 and BS 7671 Reg 642.2 require instruments to be of sufficient accuracy. Industry practice: annual UKAS-traceable calibration plus pre-use checks.',
    section: '1.6',
    difficulty: 'intermediate',
  },
  {
    id: 25,
    question: 'A method statement for inspection and testing should include:',
    options: [
      'The names and the signatures of the design, construction and inspection/testing personnel involved in the project on site',
      'Scope, sequence, hazards/controls, isolation strategy, PPE, instruments, competence of personnel, emergency arrangements',
      'The test results required on the Schedule of Test Results for each circuit/board in the installation, and nothing else besides',
      'The supply characteristics and the TN-S/TN-C-S earthing arrangement, to be recorded on the certificate issued at the end of the job',
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
      'Hold a current ECS gold card, and be registered with a Competent Person Scheme',
      'Carry a minimum of five years post-qualification experience, gained on similar installations',
      'Possess such knowledge and experience, or be under appropriate supervision',
      'Work only under a written permit-to-work, issued by a chartered engineer',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 16 is the competence requirement: knowledge, experience, and supervision proportionate to the risk.',
    section: '1.1',
    difficulty: 'intermediate',
  },
  {
    id: 27,
    question: 'Locking off using a multi-lock hasp allows multiple workers to:',
    options: [
      'Share a single padlock fitted to the hasp, with the only key held by the most senior person on the site that day',
      'Isolate several circuits at once using one lock-off device fitted to the main switch of the board instead of using the hasp',
      'Re-energise the circuit individually as soon as their own portion of the work has been completed and checked off',
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
    question: 'Which additional hazards must be controlled when testing in a domestic loft space in hot weather?',
    options: [
      'Heat stress, falls through the ceiling, hot pipes, glass-fibre/asbestos, and restricted emergency egress',
      'Higher conductor resistance from the heat, requiring a temperature/length correction factor on every reading taken',
      'Increased prospective fault current in the loft, because the line/neutral cables run closer together up there',
      'Reduced insulation resistance readings caused by the heat, requiring the line/earth test voltage to be raised to 1000V',
    ],
    correctAnswer: 0,
    explanation:
      'Loft work compounds electrical hazards with environmental and access ones — heat stress, falls between joists, hot services, fibre/asbestos exposure and restricted egress. The method statement must address all of them.',
    section: '1.6',
    difficulty: 'intermediate',
  },
  {
    id: 29,
    question: 'The "competent person" definition in EAWR 1989 Reg 16 requires:',
    options: [
      'A formal NVQ Level 3 qualification, plus membership of a Competent Person Scheme (CPS) — registered for the work',
      'Sufficient technical knowledge, experience, and (where lacking) appropriate supervision — proportionate to the work',
      'Three years of on-site experience, logged in a site diary (and countersigned) — whatever qualifications are held',
      'Written authorisation from the employer (a permit to work) — which alone establishes competence, whatever else is held',
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
      'Complete the remaining inspection items on the schedule first, then record the defect as an observation (Code C1) on the report afterwards',
      'Photograph the defect, then email the client a written quotation (with a schedule of rates) for the remedial work before taking any other action',
      'Make safe (isolate, barrier, warn), then notify the duty holder in writing, then document on certification (Code C1 on EICR if applicable)',
      'Finish testing the whole circuit to establish the cause (root cause analysis), before deciding whether the condition found is actually dangerous',
    ],
    correctAnswer: 2,
    explanation:
      'BPG4 Code C1 (Danger present) demands immediate action. The inspector duty under HASAWA s.3/7 is to prevent harm to others.',
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
      'BS 7671 Reg 642.1 requires that on completion of every installation or alteration the inspector shall verify:',
    options: [
      'That the requirements of BS 7671 have been met by testing alone, inspection being optional',
      'That the installer holds a current Competent Person Scheme registration',
      'That the design data has been signed off by the DNO before energisation',
      'That the requirements of BS 7671 have been met by inspection AND testing',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 642.1 is the cornerstone of Part 6: every installation must be verified by both inspection AND testing against the requirements of BS 7671 before being put into service.',
    section: '2.1',
    difficulty: 'basic',
  },
  {
    id: 32,
    question:
      'Which information must be made available to the inspector before initial verification begins?',
    options: [
      'Maximum demand, supply characteristics (Ze, Ipf, U0), earthing arrangement, circuit composition and design data',
      'The supply voltage and frequency alone (230V/50Hz), as all of the other data is derived during testing on site',
      'The previous EICR alone (with its observation codes), since a brand-new installation requires no design information',
      'The manufacturer instructions for the consumer unit, and for the outgoing protective devices (MCBs/RCBOs) fitted',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 641.1 mirrors the Reg 132 design information. Without supply characteristics, earthing arrangement, circuit composition, designer details and the schedule of design data, the inspector cannot verify ADS or cable selection.',
    section: '2.4',
    difficulty: 'intermediate',
  },
  {
    id: 33,
    question:
      'The relevant documents associated with initial verification of a new installation are:',
    options: [
      'Electrical Installation Condition Report (EICR) + Schedule of Inspections, with no results schedule',
      'Electrical Installation Certificate (EIC) + Schedule of Inspections + Schedule of Test Results',
      'Minor Electrical Installation Works Certificate (MEIWC) + Schedule of Test Results for the circuit altered',
      'Electrical Installation Certificate (EIC) alone, with no accompanying schedules required',
    ],
    correctAnswer: 1,
    explanation:
      'Per Reg 644.1, the EIC is accompanied by a Schedule of Inspections and a Schedule of Test Results. All three together form the verification record.',
    section: '2.3',
    difficulty: 'basic',
  },
  {
    id: 34,
    question: 'An Electrical Installation Certificate (EIC) is appropriate for:',
    options: [
      'A periodic assessment/report on an existing installation against BS 7671',
      'Adding a single socket-outlet/spur to an existing ring final circuit only',
      'A new installation OR an addition/alteration that introduces a new circuit',
      'Replacing a like-for-like accessory such as a damaged switch/socket faceplate',
    ],
    correctAnswer: 2,
    explanation:
      'EIC = new work or new circuits. Minor alterations to existing circuits use a Minor Works Certificate. Periodic = EICR.',
    section: '2.1',
    difficulty: 'basic',
  },
  {
    id: 35,
    question: 'A Minor Electrical Installation Works Certificate may be issued for:',
    options: [
      'The installation of a new consumer unit together with all of its outgoing final circuits',
      'A periodic condition assessment of a whole existing installation and all of its final circuits',
      'Any work that involves the addition of one or more new final circuits to the consumer unit',
      'An addition or alteration that does NOT extend an existing circuit by adding a new one',
    ],
    correctAnswer: 3,
    explanation:
      'MWC covers minor work on a single existing circuit (e.g. adding a socket to a ring). New circuits or new consumer units always require an EIC.',
    section: '2.1',
    difficulty: 'basic',
  },
  {
    id: 36,
    question: 'An Electrical Installation Condition Report (EICR) differs from an EIC in that it:',
    options: [
      'Reports the condition of an EXISTING installation against current BS 7671 (with deviations recorded)',
      'Certifies that newly installed work complies fully with BS 7671 (Part 6) before it is first energised',
      'Is issued only for an addition or an alteration that introduces a new final circuit (a new way) to a board',
      'Records the design data and the supply characteristics (Ze, Ipf) for a brand-new installation before use',
    ],
    correctAnswer: 0,
    explanation:
      'EICR = condition assessment with observation codes (C1/C2/C3/FI). It does not certify but rather reports.',
    section: '2.1',
    difficulty: 'basic',
  },
  {
    id: 37,
    question: 'An Electrical Installation Certificate must carry the names and signatures of:',
    options: [
      'The client commissioning the work, and the DNO/meter operator who connected the cut-out at the origin',
      'The persons responsible for the design, the construction, and the inspection/testing of the work',
      'Only the inspector/tester who actually carried out the testing, with an independent witness present',
      'The Competent Person Scheme assessor, together with the building control/local authority officer',
    ],
    correctAnswer: 1,
    explanation:
      'Three separate signature roles are required: design, construction, and inspection/testing. On small jobs all three may be the same signatory.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 38,
    question: 'The PRIMARY purpose of initial verification is to confirm:',
    options: [
      'That the installation will not require any further periodic inspection and testing, for at least ten years from the date of first energisation',
      'That the maximum demand of the completed installation does not exceed the supply capacity, as provided by the distributor at the origin',
      'The installation has been designed, constructed, inspected and tested in accordance with BS 7671 and is safe to be energised and put into service',
      'That the final cost of the completed installation matches the original quotation, as provided to the client before any of the work was started',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 641.1: verification confirms compliance with BS 7671 prior to first putting into service.',
    section: '2.1',
    difficulty: 'basic',
  },
  {
    id: 39,
    question:
      'Periodic inspection (EICR) frequencies for a domestic owner-occupied dwelling are typically:',
    options: [
      '1 year, OR change of occupancy (per the landlord\'s insurer)',
      '3 years, OR after any alteration (per the manufacturer\'s warranty)',
      '20 years, OR sale of the property (per the conveyancing survey)',
      '10 years OR change of occupancy (per IET Guidance, BPG4)',
    ],
    correctAnswer: 3,
    explanation:
      '10 years is the recommended max for domestic owner-occupied. Rented dwellings (England private rented sector) = 5 years legal max under PRS Regulations 2020.',
    section: '2.1',
    difficulty: 'intermediate',
  },
  {
    id: 40,
    question: 'Periodic inspection frequency for an England private rented dwelling is set by:',
    options: [
      'The Electrical Safety Standards in the Private Rented Sector Regulations 2020 — 5 years maximum',
      'The Landlord and Tenant Act 1985 — a 10-year maximum interval between periodic inspections of the dwelling',
      'The Housing Act 2004 — a 3-year maximum interval, tied to the licensing regime for the rented property',
      'BS 7671 Regulation 651.1 — a 1-year maximum interval for every dwelling that is let to tenants',
    ],
    correctAnswer: 0,
    explanation:
      'The Private Rented Sector (England) Regulations 2020 mandate a 5-year EICR for English private rentals; copies must be supplied to tenants and the local authority on request.',
    section: '2.1',
    difficulty: 'intermediate',
  },
  {
    id: 41,
    question:
      'Per Reg 643.1, inspection and testing during initial verification must be carried out:',
    options: [
      'Following energisation, once the installation has been in normal service for a reasonable period of time',
      'DURING erection where appropriate, AND on completion BEFORE the installation is put into service',
      'At the design stage only, before any of the conductors have been installed on site by the contractor',
      'Once the client has signed off all of the as-installed drawings, and the work on the site is complete',
    ],
    correctAnswer: 1,
    explanation:
      'Many inspection items (e.g. cables in conduit) cannot be inspected after enclosure. In-progress inspection during erection is essential.',
    section: '2.1',
    difficulty: 'intermediate',
  },
  {
    id: 42,
    question:
      'Documents the inspector should consult before starting initial verification include:',
    options: [
      'BS 7671 alone, since all of the other information is derived during on-site testing',
      'The manufacturer instructions for the consumer unit, and for its protective devices',
      'Drawings, specs, BS 7671, GN3, manufacturer data, any previous EICR, and the RAMS',
      'The client\'s verbal description, covering whatever electrical work has been carried out so far',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 643.1.1 requires the inspector to compare results with the relevant criteria — design drawings and specifications, BS 7671, GN3, manufacturer instructions, the previous EICR (if an alteration) and the risk assessment/method statement.',
    section: '2.2',
    difficulty: 'intermediate',
  },
  {
    id: 43,
    question: 'On a typical EICR observation, Code C1 means:',
    options: [
      'Potentially dangerous — urgent remedial action required',
      'Improvement recommended — would contribute to the safety of the installation',
      'Further investigation required without delay — to establish the cause',
      'Danger present — risk of injury — IMMEDIATE remedial action required',
    ],
    correctAnswer: 3,
    explanation:
      'Per Best Practice Guide 4, C1 = danger present. Inspector must make safe before leaving site (e.g. isolate, label, notify duty holder in writing).',
    section: '2.1',
    difficulty: 'basic',
  },
  {
    id: 44,
    question: 'EICR Code C2 means:',
    options: [
      'Potentially dangerous — urgent remedial action required',
      'Danger present — risk of injury — immediate remedial action required',
      'Improvement recommended — does not represent a present or potential danger',
      'Acceptable condition — no action required at this inspection',
    ],
    correctAnswer: 0,
    explanation:
      'C2 = potentially dangerous (e.g. accessible Class I metalwork without effective earthing). The fault has potential to cause injury under certain conditions.',
    section: '2.1',
    difficulty: 'basic',
  },
  {
    id: 45,
    question: 'EICR Code C3 means:',
    options: [
      'Danger present — a risk of injury exists, so immediate remedial action is required of the duty holder without any delay',
      'Improvement recommended — does not represent immediate or potential danger but improvement would contribute to safety',
      'Potentially dangerous — urgent remedial action is required in order to remove the risk to persons on the site',
      'Further investigation is required without delay — to establish whether a danger actually exists on site',
    ],
    correctAnswer: 1,
    explanation:
      'C3 = improvement recommended. Common for non-compliances with current BS 7671 that were compliant when installed.',
    section: '2.1',
    difficulty: 'basic',
  },
  {
    id: 46,
    question: 'EICR Code FI means:',
    options: [
      'Fault Identified — the defect has been located and rectified during the course of the inspection work on site',
      'Failed Inspection — the whole installation must be condemned and replaced in full before it can be re-energised',
      'Further Investigation required without delay — inspector cannot conclude on safety without more information',
      'Fault Isolated — the affected circuit has been disconnected and left dead pending the remedial work',
    ],
    correctAnswer: 2,
    explanation:
      'FI is used when test/inspection cannot determine safety (e.g. RCD failed to trip but cause unclear). Action: invasive investigation.',
    section: '2.1',
    difficulty: 'intermediate',
  },
  {
    id: 47,
    question:
      'An Electrical Installation Condition Report is recorded as unsatisfactory where the inspection finds:',
    options: [
      'Any C3, with or without a C2',
      'Three C3 codes, all on one circuit',
      'Any departure from the previous EICR advice, whether or not it was coded',
      'Any C1, any C2, OR any FI observation',
    ],
    correctAnswer: 3,
    explanation:
      'Per BPG4: presence of C1, C2 or FI = Unsatisfactory. C3 alone does NOT make a report Unsatisfactory.',
    section: '2.1',
    difficulty: 'intermediate',
  },
  {
    id: 48,
    question:
      'Information that the EIC must record about the supply (per Reg 644 + Form) includes:',
    options: [
      'Earthing arrangement, nominal voltage U/U0, frequency, Ipf, Ze, and the supply protective device rating',
      'The nominal voltage/frequency alone, all of the other characteristics being fixed at the design stage',
      'The prospective fault current at the origin, and the type/rating of supply protective device fitted there',
      'The earthing arrangement, and the assessed maximum demand/diversity of the whole installation at the origin',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 132.2 / 313 supply characteristics underpin every design decision. The EIC records the earthing arrangement (TN-S/TN-C-S/TT), U/U0, frequency, Ipf, Ze and the supply protective device type and rating.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 49,
    question: 'On the Schedule of Inspection, the outcome recorded against each item must be:',
    options: [
      'A numerical resistance value in ohms/megohms (to two decimal places), recorded against every item — with no tick boxes used',
      'Tick (acceptable), N/A (not applicable), LIM (limitation), or appropriate code — accompanied by an overall declaration',
      'Pass or fail only (with no N/A provision), so that items not applicable cannot be recorded — every item needs a verdict',
      'A percentage compliance score (0-100%), assessed against BS 7671 for every item inspected — pass/fail set at 80% or more',
    ],
    correctAnswer: 1,
    explanation:
      'Standard tick/N/A/LIM convention with limitations explicitly recorded so the customer understands what was NOT inspected.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 50,
    question:
      'On the Schedule of Test Results, a circuit-by-circuit record must include as a minimum:',
    options: [
      'The circuit ID, and whether each individual circuit passed/failed the test overall on site',
      'The line/earth insulation resistance and the loop impedance, each recorded once for the whole board',
      'Circuit ID, conductor csa, reference method, OCPD, R1+R2/R2, IR, polarity, Zs, RCD time, AFDD',
      'The supply characteristics (Ze, Ipf) measured once at the origin/cut-out of the installation only',
    ],
    correctAnswer: 2,
    explanation:
      'The Schedule of Test Results is the dataset proving every circuit was tested and met its design criteria — circuit ID, conductor csa (live + cpc), reference method, OCPD type/rating, R1+R2 (or R2), insulation resistance, polarity, Zs and RCD operating current/trip time. A4:2026 added AFDD columns.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 51,
    question:
      'Under Building Regulations Part P (England) and notifiable work, the installer must:',
    options: [
      'Notify the electricity distributor (DNO) in writing, before any new circuit added in a dwelling is first energised on site',
      'Obtain written planning permission (a full application) from the local authority, before carrying out any notifiable electrical work',
      'Submit the completed EIC to the Health and Safety Executive (HSE), within 30 days of finishing any notifiable work in a dwelling',
      'Notify Building Control (or use a Competent Person Scheme) for new circuits, consumer unit replacements, and special-location work',
    ],
    correctAnswer: 3,
    explanation:
      'Part P notification is the legal obligation. CPS membership (NICEIC, NAPIT, etc.) lets the contractor self-certify and lodge electronically.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 52,
    question:
      'The Building Safety Act 2022 introduces additional requirements for high-risk residential buildings (HRRBs). For electrical inspection these include:',
    options: [
      'A golden thread of digital information, dutyholder accountability, and AFDD design considerations',
      'A mandatory annual EICR for every dwelling, replacing the recommended periodic interval that applies',
      'Use of a TT earthing arrangement throughout the building, regardless of the type of DNO supply',
      'A doubling of the prospective fault current rating, required of all of the protective devices fitted',
    ],
    correctAnswer: 0,
    explanation:
      'BSA 2022 introduced the dutyholder regime and golden thread for HRRBs (>=18m or 7 storeys with 2+ dwellings), covering electrical certification, dutyholder accountability and AFDD design considerations. Electrical records form part of the safety case.',
    section: '7.1',
    difficulty: 'basic',
  },
  {
    id: 53,
    question:
      'Limitations agreed with the client on an EICR (e.g. fitted furniture preventing inspection of sockets) must be:',
    options: [
      'Coded as C1 on the report, since any area that has not been inspected represents a danger that is present in the installation',
      'Recorded explicitly on the report so the reader understands the scope of what was NOT inspected and the implications',
      'Omitted from the report so as not to alarm the client about any of the areas that were not inspected during the visit',
      'Recorded only in the site notes of the inspector and not shared with the client or with the duty holder afterwards',
    ],
    correctAnswer: 1,
    explanation:
      'BPG4 requires limitations to be agreed with the client BEFORE work and recorded on the report. Hidden faults inside un-inspected areas remain the client risk to manage.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 54,
    question: 'Per Reg 644.4 / GN3, certificates and reports must be retained:',
    options: [
      'For a maximum of 12 months from issue, after which they may be destroyed — longer retention serves no purpose',
      'Only until the next periodic inspection, when they are superseded — the newer report replaces the older entirely',
      'For the lifetime of the installation, by both the issuer and the recipient — and made available to subsequent inspectors',
      'By the issuer alone, never by the recipient — who has no obligation to retain a copy of the certificate',
    ],
    correctAnswer: 2,
    explanation:
      'Long-term retention enables comparison over time and supports the periodic comparison principle (deterioration tracking).',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 55,
    question:
      'The inspector preparing for a verification job should review the previous EICR (if any) primarily to:',
    options: [
      'Copy across the previous test results, saving a re-test — the earlier figures stay valid until the next due date',
      'Confirm the scheme registration of the previous inspector, valid at issue — an invalid registration voids that report',
      'Establish the exact date of the next inspection, fixed by the previous report — the interval cannot be varied now',
      'Identify previously coded defects, recommended improvements, and any limitations — to inform scope and expected condition',
    ],
    correctAnswer: 3,
    explanation:
      'Previous reports give baseline and known issues. They never substitute for fresh testing.',
    section: '2.2',
    difficulty: 'intermediate',
  },

  // ============================================================
  // LO3: Visual Inspection (Q56-80)
  // 304 AC3.1-3.5, 607 AC3.1-3.4, 302 AC3.1-3.3
  // ============================================================
  {
    id: 56,
    question: 'The inspection required by Regulation 642.3 is carried out:',
    options: [
      'Preferably before, but in any case prior to, testing — and as far as reasonably practicable with the installation isolated',
      'After all of the dead and the live testing, as a final check — the inspection then only confirms the results',
      'Only on the energised installation, so indicator lamps and displays can be seen working — a dead inspection shows nothing',
      'At the same time as the live testing, so faults found are confirmed there and then — the two being a single operation',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 642.3 places visual inspection BEFORE testing. Many defects (e.g. damaged insulation, loose terminations) are found visually and would be hazardous to test live.',
    section: '3.4',
    difficulty: 'basic',
  },
  {
    id: 57,
    question: 'Which of the following must be checked during the inspection required by Regulation 642.3?',
    options: [
      'The consumer unit enclosure and the main switch alone, all other items being tested rather than inspected',
      'Conductor connections and identification, cable routing and selection, protective devices, and fire barriers',
      'The earthing and bonding arrangements alone, since these are the only genuinely safety-critical items present',
      'Those items that cannot be verified by testing, such as the manufacturer labels and warning notices',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 642.3 lists 19 items, including connections and identification of conductors, routing and selection of cables (csa, current capacity, voltage drop), choice and setting of protective devices, fire barriers and methods of shock protection. The Schedule of Inspections mirrors this list.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 58,
    question: 'Human senses used during visual inspection (Reg 642.3 / GN3) include:',
    options: [
      'Sight only (no physical contact) — touching/probing any part of the installation, energised or not, is prohibited',
      'Sight and touch only, since hearing (arcing/buzzing) and smell (burning) are unreliable — neither is an inspection finding',
      'Sight, hearing (e.g. arcing/buzzing), smell (e.g. burning insulation), touch (carefully — for excessive temperature) — never taste',
      'Sight, hearing, smell, touch AND taste (for chemical/residue contamination) — taste identifying residues on conductors',
    ],
    correctAnswer: 2,
    explanation:
      'GN3 explicitly lists sight, sound, smell and touch (with care). Taste has no place in electrical inspection.',
    section: '3.2',
    difficulty: 'basic',
  },
  {
    id: 59,
    question: 'Inspection of the earthing conductor must verify:',
    options: [
      'That it is sleeved blue along its full length, to distinguish it clearly from the neutral conductor',
      'That it is no smaller than 1.5mm copper, and run within the same containment as the line conductors',
      'That it is connected directly to the neutral bar, rather than to the main earthing terminal at the origin',
      'Correct material and csa, secure BS 951 clamp at the MET, label per Reg 514.13.1, and damage protection',
    ],
    correctAnswer: 3,
    explanation:
      'Earthing conductor csa per Table 54.7 (or by calculation), a secure BS 951 clamp at the MET, a permanent label per Reg 514.13.1, and protection against mechanical and corrosion damage are all verified.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 60,
    question:
      'The warning notice fixed at every earthing and bonding conductor connection must read:',
    options: [
      'SAFETY ELECTRICAL CONNECTION — DO NOT REMOVE',
      'EARTH CONNECTION — DO NOT DISCONNECT WHILE LIVE',
      'WARNING — PROTECTIVE BONDING — ISOLATE BEFORE REMOVAL',
      'DANGER — MAIN EARTH TERMINAL — AUTHORISED PERSONS ONLY',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 514.13.1 verbatim: the warning notice prevents accidental removal during plumbing or other works that could otherwise compromise earthing.',
    section: '3.4',
    difficulty: 'basic',
  },
  {
    id: 61,
    question: 'Main protective bonding conductors per Reg 411.3.1.2 / Reg 544 must be:',
    options: [
      'A minimum of 16mm copper (Table 54.7) on every TN-S/TT arrangement, regardless of the supply neutral',
      'Sized per Table 54.8 (TN-C-S 10mm minimum, TN-S/TT half csa of earthing conductor, with absolute minimum 6mm copper)',
      'The same csa as the largest final circuit line/neutral conductor (not the cpc), measured at the distribution board',
      'Always 4mm copper (a fixed size), matching the cpc of a typical ring final circuit in 2.5/1.5 flat twin cable',
    ],
    correctAnswer: 1,
    explanation:
      'Table 54.8 / OSG Table 4.1: 10mm typical for TN-C-S, 6mm minimum on TN-S, sized against the supply neutral csa. Up-rated for parallel paths.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 62,
    question:
      'Supplementary equipotential bonding conductors in a Section 701 location bath/shower must:',
    options: [
      'Be a minimum of 10mm copper throughout and connected directly back to the main earthing terminal/earth bar of the installation',
      'Connect only the exposed-conductive-parts in the location to one another, with extraneous water/gas pipework excluded from it',
      'Connect simultaneously-accessible exposed and extraneous conductive parts AND have continuity-test resistance per Reg 415.2.2: R <= 50V/Ia',
      'Be run in green-and-yellow sheathing and bonded to the incoming water/gas supply pipe only, with no other connections made',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 415.2.2: supplementary bonding effective when R between simultaneously-accessible parts <= 50V/Ia. Mandatory unless 30mA RCD AND main bonding verified compliant.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 63,
    question: 'Inspection of overcurrent protective devices must verify:',
    options: [
      'The colour of the toggle/dolly, and the manufacturer name (and catalogue number) on the device',
      'That the device trips when its integral test button (T/TEST) is pressed, which confirms its breaking capacity',
      'That the device is the same brand (and range) as the consumer unit/board, this being the only check required',
      'Type, rated current In, breaking capacity (Icn/Icu) suitable for Ipf, and selectivity with upstream',
    ],
    correctAnswer: 3,
    explanation:
      'Inspection covers the device type (BS EN 60898-1 MCB / BS 88-3 fuse / BS EN 61009 RCBO), rated current In, breaking capacity suitable for Ipf (Reg 432.1), coordination with cable Iz (Reg 433.1.1) and selectivity with upstream devices (Reg 536).',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 64,
    question:
      'Equipment installed in zone 1 of a room containing a bath or shower must have a degree of protection of at least:',
    options: ['IPX4', 'IPX1', 'IPX0', 'IPX7'],
    correctAnswer: 0,
    explanation:
      'Reg 701.512.2: Zone 1 IPX4 minimum (IPX5 if water jets used). Zone 0 = IPX7 (the higher rating, used for the immersed interior of the bath itself). The X allows any solid-particle rating.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 65,
    question:
      'Section 705 (agricultural and horticultural) requires equipment IP rating of at least:',
    options: [
      'IP2X/IP20 minimum (Reg 416.2.1), as for a standard dry indoor location',
      'IP44 minimum (IP54/IP55 in dustier or wetter areas) per Reg 705.512.2',
      'IPX7/IPX8 minimum (Reg 701.512.2), matching the interior of a bath',
      'No IP rating is specified (Reg 705.411.1), the 30mA RCD/RCBO providing all protection',
    ],
    correctAnswer: 1,
    explanation:
      'Agricultural environments combine moisture, dust and physical impact. Reg 705.512 sets enhanced IP requirements, plus 30mA RCD on socket-outlets up to 32A.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 66,
    question: 'Per Reg 421.1.7 (A4:2026), AFDDs on socket-outlet final circuits up to 32 A are:',
    options: [
      'Mandatory on every final circuit, in every installation; no exceptions are permitted at all',
      'Prohibited within residential premises, including HRRBs; permitted only in industrial and commercial settings',
      'A requirement in HRRBs, HMOs, student accommodation and care homes; recommended elsewhere',
      'No longer referenced anywhere in BS 7671; Reg 421.1.7 was withdrawn in full, at Amendment 4:2026',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 421.1.7 was redrafted at Amendment 2:2022 (A4:2026 then changed item (a) to High rise residential buildings): AFDDs on socket-outlet final circuits not exceeding 32 A are now a REQUIREMENT in Higher Risk Residential Buildings, Houses in Multiple Occupation, purpose-built student accommodation and care homes, and RECOMMENDED for all other premises.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 67,
    question: 'Surge Protective Devices (SPDs) per Reg 443 / 534 should be inspected for:',
    options: [
      'Trip time at 1×IΔn (as for RCD/RCBO), on the basis that the SPD acts as a residual current device',
      'Insulation resistance of the SPD at 500V/1000V DC (before energisation), during the dead tests',
      'Breaking capacity (Icn/Icu), matched to the prospective fault current measured at the supply origin',
      'Type (1/2/3), correct location relative to ADS, status indicator, and short connection lead lengths',
    ],
    correctAnswer: 3,
    explanation:
      'SPDs are inspected for type (1/2/3 per BS EN 61643-11), correct location relative to ADS, a healthy status indicator (green = OK) and short connection leads (<0.5m total recommended), as effectiveness depends on lead length.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 68,
    question: 'Inspection of cable supports and containment must verify:',
    options: [
      'Support spacing, mechanical protection at penetrations, fire-stopping (Reg 527.2), and grommets at entries',
      'That the cable colours match the harmonised colour code (Reg 514.3.1), along the whole of the cable run',
      'The insulation resistance of each supported cable length, measured at 500V DC (Reg 643.3)',
      'That the cable csa is large enough (Reg 523.1) to carry the design current, at the reference method used',
    ],
    correctAnswer: 0,
    explanation:
      'Support spacing per OSG Table 4.5/4.6, mechanical protection at penetrations, fire-stopping at floor/wall penetrations (Reg 527.2 + Approved Doc B) and capping/grommets at enclosure entries are all verified to prevent damage and fire spread.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 69,
    question:
      'Cables buried less than 50 mm deep in a wall and outside the prescribed zones must be:',
    options: [
      'Run in plastic capping/trunking only (no earthed metallic covering), with no additional RCD protection required',
      'Mechanically protected (capping/conduit), OR enclosed in earthed metallic covering, OR provided with 30mA RCD additional protection',
      'Sleeved in green-and-yellow (as for a cpc) along the concealed section, so the run is identified as a shock/fire hazard',
      'Increased in csa by one size (e.g. 2.5mm to 4mm), to compensate for the reduced depth/cover and the risk of mechanical damage',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 522.6.202/203 requires one of: depth >50mm, safe zone routing, mechanical protection, earthed metal sheath, OR 30mA RCD.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 70,
    question:
      'In a single dwelling, the inspection must confirm that the consumer unit enclosure is:',
    options: [
      'Of transparent material (e.g. polycarbonate) — so the protective devices inside can be read without the cover being opened',
      'Fitted with an enclosure rated at least IP65 (dust-tight, jetproof) — to prevent any moisture ingress in a dwelling',
      'Of non-combustible material (e.g. metal) OR enclosed in a non-combustible cabinet — to limit fire spread from the consumer unit',
      'Bonded directly to the incoming gas and water services (10mm minimum) — providing supplementary bonding at the MET',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 421.1.201 (post-Amendment 3) addresses fires originating from consumer units: metal enclosures or non-combustible cabinets are required.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 71,
    question:
      'In a UK installation wired since the harmonised cable colours were adopted, conductor identification uses:',
    options: [
      'Red (line), black (neutral), green (cpc) for single-phase; red/yellow/blue for three-phase',
      'Black (line), grey (neutral), green-and-yellow (cpc) for single-phase; blue/orange/white for three-phase',
      'Brown (line), black (neutral), bare copper (cpc) for single-phase; red/yellow/blue for three-phase',
      'Brown (line), blue (neutral), green-and-yellow (cpc) for single-phase; brown/black/grey for three-phase',
    ],
    correctAnswer: 3,
    explanation:
      'Harmonised colours since BS 7671 BS 7671:2008 + corrigendum (effective 2006). Pre-2006 installations may still have red/black.',
    section: '3.4',
    difficulty: 'basic',
  },
  {
    id: 72,
    question:
      'Section 722 (electric vehicle charging points) requires that each EV connection point be supplied by:',
    options: [
      'An individual circuit with Type B RCD (or Type A + RDC-DD) per Reg 722.531.3.101 to detect smooth DC residual currents',
      'A shared ring final circuit protected by a single Type AC RCD (30mA) covering all of the charge points',
      'A spur taken from the nearest socket-outlet ring through a 13A fused connection unit (BS 1363-4) and an isolator',
      'A circuit protected by a Type AC 100mA time-delayed RCD (S-type) to give selectivity with the upstream device',
    ],
    correctAnswer: 0,
    explanation:
      'EV chargers can produce smooth DC fault currents that blind Type AC and even Type A RCDs. Type B (or Type A + RDC-DD detector) is required for safety.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 73,
    question: 'Section 712 (PV systems) requires the DC side to be inspected for:',
    options: [
      '30mA RCD additional protection on each DC string, tested at 1×IΔn before the array is energised',
      'Insulation method, DC isolator, polarity, string fuses, earthing arrangement, and intake labelling',
      'Correct phase rotation of the DC strings, checked before they are connected to the inverter',
      'Earth fault loop impedance of each individual DC string, measured against the Table 41.3 limits',
    ],
    correctAnswer: 1,
    explanation:
      'The PV DC side is inspected for insulation method (Class II/equivalent), DC isolator at the array, polarity, string fuses, the earthing arrangement (functional vs protective) and labels at the supply intake (Reg 514), as the DC side floats relative to earth.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 74,
    question: 'Inspection of fire alarm cable installation (BS 5839-1) must verify:',
    options: [
      'Standard PVC twin-and-earth cable clipped direct, exactly the same as a domestic lighting circuit',
      'A 30mA RCD on the fire-alarm supply, to provide additional protection against earth fault current',
      'Standard or Enhanced fire-resistant cable, separated from other circuits, on fire-rated supports',
      'SWA cable with the steel armour used as the cpc, glanded correctly at both ends of the run',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5839-1 mandates Standard or Enhanced fire-resistant cable (e.g. FP200 / Firetuf) rated for the system survival time, separation from other circuits, and fire-rated supports/clips. Plastic clips and trays fail in fire, so metallic supports are required.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 75,
    question: 'Section 753 (heating cables/embedded heating systems) requires:',
    options: [
      '100mA time-delayed RCD protection only, so as to avoid nuisance tripping of the heating element in use',
      'Supplementary bonding of the heating element to the structural steelwork, throughout the building',
      'A Type B RCD, to detect the smooth DC residual currents produced by the electronic heating controller',
      '30mA RCD additional protection per Reg 753.415.1, and floor-temperature limiter to prevent damage to floor coverings',
    ],
    correctAnswer: 3,
    explanation:
      'Embedded heating contains live conductors in walls/floors; 30mA RCD is mandatory additional protection.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 76,
    question: 'Diagrams, charts and similar information per Reg 514.9 must be displayed:',
    options: [
      'At the origin, identifying every circuit, its composition, the OCPD and the test characteristics',
      'At the local authority Building Control office, where the installation work was notified',
      'On the certificate handed to the client, and not on or anywhere near the installation',
      'At every accessory throughout the installation, repeated in full for each socket-outlet and switch',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 514.9 mandates information adequate for safe operation, inspection, testing and maintenance — at the origin, identifying every circuit, its type and composition, the OCPD and the characteristics needed for inspection and testing. Typically a circuit chart inside the CU door.',
    section: '3.4',
    difficulty: 'basic',
  },
  {
    id: 77,
    question:
      'When inspecting a TT installation, the earth electrode arrangement must be checked for:',
    options: [
      'Connection to the supply neutral at the cut-out, as would be required for a TN-C-S conversion',
      'Type, accessibility for measurement, corrosion, the Reg 514.13.1 label, and a compliant measured Ra',
      'A measured Ra below 0.35Ω, to match the assumed maximum Ze for a TN-C-S supply at the origin',
      'Bonding of the electrode to the gas and water services, to form a single combined earth at the MET',
    ],
    correctAnswer: 1,
    explanation:
      'TT relies entirely on the local electrode for the fault path, so both physical and electrical condition matter — type (rod/plate/mat), test-link accessibility for periodic re-measurement, corrosion, the Reg 514.13.1 label, and an Ra giving compliant Zs at the furthest point.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 78,
    question:
      'Inspection of segregation between Band I (ELV/SELV) and Band II (LV mains) circuits per Reg 528.1 requires:',
    options: [
      'That all of the Band I and Band II conductors share a common colour code — so that they can be easily identified later',
      'That the Band I circuits are run at a higher level than the Band II circuits — within any shared containment system',
      'Physical separation OR equivalent insulation OR an earthed metallic screen — to prevent transfer of mains potential into ELV circuits',
      'That the Band I and the Band II circuits are both protected by a common 30mA RCD — at the board supplying them',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 528.1 protects users of low-voltage equipment (e.g. data, signal) from mains transfer in the event of insulation failure.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 79,
    // Scoped to "Reg 416", but the key's third limb — obstacles and placing out
    // of reach — is Section 417, not 416. Both are methods of basic protection;
    // the citation in the stem was simply too narrow for its own key.
    question: 'When inspecting the methods of basic protection, the inspector verifies:',
    options: [
      'Presence of a cpc throughout, main protective bonding, and automatic disconnection of supply (Reg 416.2) within 0.4s/5s for the circuit',
      'A 30mA RCD/RCBO fitted on every final circuit in the installation (Reg 416.1) to provide automatic disconnection, whatever the load',
      'Earth fault loop impedance measured line/earth at every point on the circuit (Reg 417.2), and found below the tabulated maximum for the device',
      'Insulation of live parts (Reg 416.1), barriers/enclosures to at least IPXXB/IP2X (Reg 416.2), and obstacles/placing out of reach where applicable',
    ],
    correctAnswer: 3,
    explanation:
      'Basic protection prevents direct contact. IPXXB = no contact with finger; IP2X = no contact with 12.5mm-diameter object.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 80,
    question: 'Inspection per Reg 642.3 of methods of FAULT protection includes verifying:',
    options: [
      'ADS device type and settings, cpc throughout, equipotential bonding, and any 30mA RCD',
      'Insulation of live parts, together with barriers and enclosures to at least IPXXB or IP2X',
      'That accessible live parts are placed out of arm\'s reach, or otherwise positioned behind obstacles',
      'That the cable colours and the labelling, taken together, allow every conductor to be identified',
    ],
    correctAnswer: 0,
    explanation:
      'Fault protection per Reg 411 is the multi-layer ADS strategy: an ADS device of the correct type/setting, a cpc throughout, main and supplementary equipotential bonding where required, and any additional 30mA RCD protection — operating within the disconnection time.',
    section: '3.4',
    difficulty: 'intermediate',
  },

  // ============================================================
  // LO4: Test Sequence, Instruments & Standard Values (Q81-110)
  // 304 AC4.1-4.6, 607 AC4.1-4.5, 302 AC4.1-4.5
  // ============================================================
  {
    id: 81,
    question: 'The correct order of the tests carried out before the installation is energised is:',
    options: [
      'Insulation resistance -> continuity of protective conductors -> continuity of ring final conductors -> polarity (dead) -> earth electrode resistance',
      'Continuity of protective conductors -> continuity of ring final conductors -> insulation resistance -> polarity (dead) -> earth electrode resistance (TT)',
      'Earth fault loop impedance -> insulation resistance -> continuity of protective conductors -> continuity of ring final conductors -> polarity (dead)',
      'Polarity (dead) -> insulation resistance -> continuity of protective conductors -> RCD operation -> earth electrode resistance (TT)',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.2 sequence: dead tests preserve a meaningful order — continuity proves CPC integrity (needed for IR test interpretation), then IR, then polarity at dead, then electrode resistance for TT.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 82,
    question: 'The correct order of the tests carried out after the installation is energised is:',
    options: [
      'RCD operation -> Ze -> Zs -> prospective fault current -> polarity (energised) -> functional checks last',
      'Insulation resistance -> Zs -> RCD -> polarity (energised) -> AFDD -> functional',
      'Earth electrode (TT) -> Ze -> PFC -> Zs -> polarity (energised) -> RCD -> AFDD -> functional',
      'Functional/operational -> RCD operation -> Zs -> Ze -> prospective fault current -> polarity (energised)',
    ],
    correctAnswer: 2,
    explanation:
      'Live tests follow a logical safety order: earth electrode (live, TT), Ze, prospective fault current, Zs, energised polarity, RCD operation then AFDD operation, with functional/operational checks last. The earthing path is confirmed before being relied on for ADS verification.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 83,
    question: 'The fundamental reason for the prescribed test sequence is:',
    options: [
      'It allows the inspector to complete the certificate top to bottom, in the order the form is laid out',
      'It minimises the total time the installation is de-energised, across the whole of the testing process',
      'It ensures the test instrument batteries are used in the most efficient order, extending their life',
      'Each test relies on the integrity of the previous one, and live tests need the dead-test results first',
    ],
    correctAnswer: 3,
    explanation:
      'The sequence is safety-critical: IR cannot be safely interpreted without continuity of the cpc, and live tests require dead-test confirmation of earthing. Skipping or re-ordering can invalidate results or expose the inspector to live faults.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 84,
    question: 'A multi-function test instrument used for certification must be:',
    options: [
      'Compliant with BS EN 61557, CAT III/IV rated, calibrated annually, and fitted with GS38 leads',
      'Compliant with BS EN 60898, CAT I/II rated, and recalibrated only when visibly damaged',
      'Compliant with BS EN 60529, CAT II/III rated, with no calibration requirement at all for site use',
      'Compliant with BS EN IEC 60900, CAT III/IV rated, and recalibrated every five years on a fixed cycle',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 61557 is the safety and functional standard for low-voltage test equipment. CAT III 600V minimum is needed for distribution work and CAT IV at the supply origin, with annual calibration and GS38 leads.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 85,
    question: 'When verifying a residual current device, the tests are carried out in which order?',
    options: [
      'Tests at both 1×IΔn and 5×IΔn, with the half-rated no-trip test newly added in A4:2026',
      'A single AC test at 1×IΔn, the 5×IΔn test having been deleted in A4:2026 as redundant',
      'A single test at 5×IΔn only, the 1×IΔn trip-time test having been deleted in A4:2026',
      'A test at 0.5×IΔn confirming the RCD does NOT trip, with no trip-time test required at all',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 simplified the RCD test to a single AC test at 1×IΔn (must trip within the published time, generally <300ms for general purpose, <40ms for Type S delay) plus the test-button functional check. The 5×IΔn test was deleted as redundant.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 86,
    question:
      'The insulation resistance test voltage for a circuit with a nominal voltage up to and including 500 V, other than SELV or PELV, is:',
    options: [
      '1000V DC, with minimum acceptable IR of 1.0 MΩ',
      '250V DC, with minimum acceptable IR of 0.5 MΩ',
      '500V DC, with minimum acceptable IR of 1.0 MΩ',
      '500V DC, with minimum acceptable IR of 2.0 MΩ',
    ],
    correctAnswer: 2,
    explanation:
      'Table 64 verbatim: 500V DC test, 1.0 MΩ minimum. Lower IR (>=1MΩ but suspect) warrants further investigation.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 87,
    question: 'Insulation resistance test voltage per Table 64 for SELV and PELV circuits is:',
    options: [
      '500V DC, minimum acceptable IR 1.0 MΩ',
      '100V DC, minimum acceptable IR 0.25 MΩ',
      '250V DC, minimum acceptable IR 1.0 MΩ',
      '250V DC, minimum acceptable IR 0.5 MΩ',
    ],
    correctAnswer: 3,
    explanation:
      'Table 64 verbatim: SELV/PELV use 250V DC at 0.5MΩ to avoid damage to ELV equipment from higher test voltage.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 88,
    question:
      'Insulation resistance test voltage per Table 64 for circuits ABOVE 500V up to 1000V is:',
    options: [
      '1000V DC, minimum acceptable IR 1.0 MΩ',
      '500V DC, minimum acceptable IR 1.0 MΩ',
      '1000V DC, minimum acceptable IR 2.0 MΩ',
      '1500V DC, minimum acceptable IR 1.0 MΩ',
    ],
    correctAnswer: 0,
    explanation:
      'Table 64 verbatim: HV-LV circuits >500V use 1000V test voltage. Same 1.0 MΩ acceptance.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 89,
    question:
      // Stem was self-contradictory — "below 1 MΩ but above the minimum 1 MΩ
      // value (e.g. 1.5 MΩ)". 1.5 MΩ is not below 1 MΩ, so the question could
      // not be answered as written. Reworded to the case the explanation and
      // the key both describe: a result that passes Table 64 but sits close to
      // the limit. Table 64 minimum for a 500 V DC test is 1.0 MΩ.
      'If an insulation resistance test result is above the 1 MΩ minimum but close to it (e.g. 1.5 MΩ on a long circuit), the inspector should:',
    options: [
      'Fail the circuit outright and code the defect — any value measured below 2MΩ, on any circuit, is non-compliant on the schedule',
      'Investigate further — record the value, isolate sub-circuits, and verify whether the low value reflects normal cable length or a developing fault',
      'Accept the value without further comment on the report — it exceeds the 1MΩ minimum, so no further action of any kind is needed',
      'Re-test the circuit at 250V instead of 500V — 250V being the value required, on long circuits, by the schedule of tests',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 advises that values approaching but above 1MΩ may indicate leakage; investigate by sectional testing.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 90,
    question: 'Where a test gives an unsatisfactory result, the electrician must:',
    options: [
      'Record the failing value on the certificate, and recommend the client monitors it over time in service',
      'Continue testing the remaining circuits, and address the single failure at the next periodic inspection',
      'Repeat the test, rectify the fault, then re-test all preceding tests the fix could have affected',
      'Reduce the test voltage until the circuit passes, then accept and record the lower reading obtained',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 643.1.2 requires fault rectification AND re-testing of any preceding tests that could be affected, in sequence — preventing the new fix from introducing new faults.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 91,
    question: 'Test instruments must be checked before use for:',
    options: [
      'The calibration certificate/label date, with all other aspects covered by annual calibration',
      'That the instrument carries the correct CAT III/IV rating, for the work being done on site',
      'That the instrument display is set to the correct Ω/MΩ units, before each reading is taken',
      'Battery, lead/probe integrity, the zero/null function, calibration date, and a known reference',
    ],
    correctAnswer: 3,
    explanation:
      'Pre-use functional checks supplement annual calibration: battery condition, lead/probe integrity (no cracks or exposed metal), the continuity zero/null function, the calibration date, and a check against a known reference where applicable. A cracked lead or flat battery can produce dangerously misleading results.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 92,
    question:
      'When insulation resistance testing a circuit containing electronic equipment such as dimmers, the correct practice is to:',
    options: [
      'Disconnect sensitive electronics, link out MOVs, and test L+N joined to earth rather than L to N',
      'Raise the test voltage to 1000V, so any latent weakness is exposed',
      'Skip the insulation resistance test entirely, on any circuit with electronic equipment',
      'Test between line and neutral only, leaving all the electronic equipment connected throughout the test',
    ],
    correctAnswer: 0,
    explanation:
      'Electronic loads can be damaged by 500V DC. GN3 recommends disconnecting/unplugging sensitive electronics, linking out MOVs, and testing L+N joined to earth (rather than between L and N) to avoid applying voltage across the equipment.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 93,
    question: 'A continuity test instrument must have an open-circuit test voltage of:',
    options: [
      '50V and 250V (per BS EN 61557-2), with a minimum short-circuit current of 1mA — so that sensitive electronic components are protected',
      '4V and 24V (per BS EN 61557-4) and a minimum short-circuit current of 200mA — to break through any film of oxide on connections',
      '230V and 400V (per BS EN 61557-3) — matching the nominal single-phase and three-phase supply voltages of the installation tested',
      '100V and 500V DC (per BS EN 61557-6) — the same two test voltages that are used for insulation resistance testing of conductors',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 61557-4: 4-24V open-circuit, ≥200mA short-circuit ensures consistent low-resistance measurement free of contact film effects.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 94,
    question: 'Earth fault loop impedance instrument tolerance per BS EN 61557-3 is typically:',
    options: [
      '+/- 1% of the measured value, the same order of precision as a UKAS reference standard instrument',
      '+/- 5% of the measured value, with no further design allowance needed',
      '+/- 30% of the measured value, allowed for by Cmin = 0.95 in Table 41.3 and separately by the GN3 80% rule of thumb',
      '+/- 50% of the measured value, requiring every reading to be doubled before it is used for safety',
    ],
    correctAnswer: 2,
    explanation:
      'MFT loop testers carry significant uncertainty (around +/- 30%) from instrument and test-method effects. The 80% rule (measured Zs <= 0.8 × tabulated max), with Cmin = 0.95 in Table 41.3, provides the safety margin.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 95,
    question: 'Per Reg 643.7.1 + GN3, Ze (external earth fault loop impedance) is measured by:',
    options: [
      'Loop-testing at the furthest socket on every final circuit, with the installation fully energised',
      'Adding the measured R1+R2 of every circuit, then subtracting the total from the measured Zs reading',
      'Measuring continuity between the main earthing terminal and the earth electrode, with the supply on',
      'Disconnecting the main earthing conductor at the MET, then loop-testing supply L to the MET earth',
    ],
    correctAnswer: 3,
    explanation:
      'The Ze test isolates the supply contribution by loop-testing between supply L and the disconnected MET earth. The main switch must be OFF and the circuits isolated, because disconnecting the main earth on a live installation creates a touch-voltage hazard.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 96,
    question: 'The maximum external earth fault loop impedance values normally declared by the distributor are:',
    options: [
      'TN-S: 0.8Ω; TN-C-S: 0.35Ω (these are ASSUMED maxima — actual values must be measured or confirmed from DNO)',
      'TN-S: 0.35Ω; TN-C-S: 0.8Ω (assumed maxima — the higher value applying to a combined PEN conductor)',
      'TN-S: 21Ω; TN-C-S: 200Ω (assumed maxima — the same values applying to a TT electrode arrangement)',
      'TN-S: 1.0Ω; TN-C-S: 1.0Ω (a single common maximum — applying to every one of the earthing arrangements)',
    ],
    correctAnswer: 0,
    explanation:
      'DNO declared maxima used at design stage. Always measure on site to confirm — actual Ze can vary widely.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 97,
    question:
      'On a TT installation protected by an RCD, the earth electrode resistance is acceptable where:',
    options: [
      'Ra <= 0.35Ω, matching the assumed Ze for a TN-C-S/PME supply — the same limit applying on a TT system',
      'Ra <= 50V/IΔn — giving 1667Ω for a 30mA RCD, though 200Ω is the practical stable target',
      'Ra <= 1Ω in every case, whatever the RCD rating — a fixed limit for all TT/TN-S installations',
      'Ra <= 230V/IΔn — giving an upper limit of approximately 7667Ω, for a 30mA RCD on a TT supply',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 411.5.3: Ra <= 50V/IΔn (1667Ω for 30mA, 500Ω for 100mA). In practice 200Ω is targeted as a stable upper limit, because higher values may not stay reliable as the soil dries.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 98,
    question: 'Functional testing per Reg 643.10 covers:',
    options: [
      'The insulation resistance of every functional circuit, measured at 500V DC before handover',
      'The earth fault loop impedance of each switched circuit, measured at its furthest point',
      'Switchgear, controlgear, drives, controls, interlocks and monitoring devices operating as intended',
      'The polarity of every functional switch on the installation, verified at the dead-test stage',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 643.10: every assembled device that depends on operation — switchgear, controlgear, drives, controls, interlocks and monitoring devices — must be functionally proven before handover, including after the protective-device test.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 99,
    question: 'Test instrument leads with crocodile/probe combinations should:',
    options: [
      'Be at least 3m long and fitted with unshrouded clips, so that connection to exposed busbars is easier for the tester on site',
      'Be replaced annually regardless of their condition, at the same interval as the calibration of the test instrument itself',
      'Carry a lower CAT rating than the instrument itself, so that the leads fuse first under any fault conditions that arise',
      'Be CAT-rated equal to or greater than the instrument, GS38 compliant, with shroud, fused tips and clearly visible insulation integrity',
    ],
    correctAnswer: 3,
    explanation:
      'Lead rating must match or exceed the instrument CAT rating; mismatched leads invalidate the protection rating.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 100,
    question: 'The reason for testing in the order specified in BS 7671 (Reg 643.2 + GN3) is:',
    options: [
      'Each test depends on the previous one, so re-ordering can invalidate results or create a hazard',
      'It follows the exact layout of the Schedule of Test Results form, purely for ease of recording values',
      'It groups the quickest tests first, so the whole job can be completed in the least time on site',
      'It allows the most expensive test instrument to be used last, and then packed away first afterwards',
    ],
    correctAnswer: 0,
    explanation:
      'Sequence integrity is a safety requirement, not tradition: continuity of the cpc must be proven before IR can be interpreted, and earthing before live tests rely on it; functional checks come last as they confirm the whole system works.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 101,
    question:
      'The maximum permitted earth fault loop impedance for a 32 A Type B circuit-breaker to BS EN 60898 on a 230 V supply is:',
    options: [
      '1.44Ω (the pre-Cmin value, calculated as 230/(5×32); the Cmin 0.95 multiplier is not applied to the result)',
      '1.37Ω (the value moved to 1.37Ω with the introduction of the Cmin = 0.95 multiplier; 1.44Ω is the old pre-Cmin value)',
      '0.68Ω (calculated using the Type C 10×In multiplier; the device concerned is a Type B needing 5×In)',
      '7.28Ω (the value that applies to a 6A Type B device; the device concerned is a 32A of the same type)',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 (and pre-existing in A2:2022) introduced Cmin to BS 7671 calculation: Zs_max = (Cmin × U0)/Ia = 0.95×230/(5×32) = 1.367Ω. 1.44Ω is the obsolete distractor.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 102,
    question:
      'Maximum Zs for a 6A Type B MCB (final circuit, 0.4s) per Table 41.3 is approximately:',
    options: [
      '1.37Ω (a 32A Type B value, 218.5/160)',
      '7.67Ω (Zs = 230 / 30, omitting Cmin)',
      '7.28Ω (Zs = 0.95 × 230 / (5 × 6) = 7.283Ω)',
      '3.64Ω (0.95 × 230 / (10 × 6), Type C)',
    ],
    correctAnswer: 2,
    explanation: 'Calculation: Cmin × U0 / Ia = 0.95 × 230 / 30 = 7.283Ω.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 103,
    question:
      'The maximum permitted earth fault loop impedance for a 32 A Type C circuit-breaker on a 230 V supply is:',
    options: [
      '1.37Ω (a Type B 5×In result of 218.5/160 by mistake)',
      '0.72Ω (Zs = 230 / 320, omitting the Cmin factor)',
      '0.34Ω (a 20×In result of 218.5/640 by mistake)',
      '0.68Ω (Zs = 0.95 × 230 / 320 = 0.683Ω)',
    ],
    correctAnswer: 3,
    explanation:
      'Type C requires 10×In to disconnect within 0.1s instantaneous range; this halves the allowable Zs vs Type B.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 104,
    question:
      'Per Reg 411.3.2.2, maximum disconnection time for a 230V TN-system FINAL circuit not exceeding 63A supplying socket-outlets is:',
    options: ['0.4 seconds', '5 seconds', '1 second', '30 seconds'],
    correctAnswer: 0,
    explanation:
      '0.4s applies to TN final circuits ≤63A (sockets) and ≤32A (mobile equipment). Distribution circuits and final circuits >63A: 5s.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 105,
    question:
      'The maximum disconnection time permitted for a distribution circuit on a TN system is:',
    options: ['0.2 seconds', '5 seconds', '30 seconds', '0.4 seconds'],
    correctAnswer: 1,
    explanation:
      '5s for distribution circuits (allowed because users do not directly contact distribution boards in normal use).',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 106,
    question:
      'Per Reg 411.3.2.2, maximum disconnection time for TT final circuits ≤63A (sockets) is:',
    options: ['0.4s', '1s', '0.2s', '5s'],
    correctAnswer: 2,
    explanation:
      'TT systems have higher loop impedance — shorter disconnection time required to limit touch voltage exposure (typically achieved by 30mA RCD).',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 107,
    question: 'Per Reg 411.3.2.4, max disconnection time for TT distribution circuits is:',
    options: ['0.2 seconds', '0.4 seconds', '5 seconds', '1 second'],
    correctAnswer: 3,
    explanation:
      'TT distribution: 1s (vs 0.4s on final), reflecting the same logic as TN but with stricter values for the higher loop impedance.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 108,
    question:
      'Test instruments calibrated annually should additionally have an interim accuracy check using:',
    options: [
      'A calibration check box at intervals and after any suspected damage, confirming continued accuracy',
      'The supply voltage at the origin, comparing the instrument reading against the nominal 230V value',
      'A second uncalibrated instrument of the same make and model, comparing the two displayed readings',
      'The previous test results for the installation, checking the instrument returns the same values again',
    ],
    correctAnswer: 0,
    explanation:
      'GN3 best practice: interim checks against a known reference (a calibration check box / resistance test unit) at intervals and after any suspected damage catch drift between annual UKAS calibrations.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 109,
    question:
      'Selecting the correct range and setting on a test instrument before a test is necessary in order to:',
    options: [
      'Reduce the time that each test takes, by skipping over the instrument ranges/settings that are unlikely to be needed on the job',
      'Achieve appropriate resolution and accuracy for the value being measured, AND avoid false trip/damage to RCD-protected circuits',
      'Extend the battery life of the instrument, by always selecting the lowest power/current range available for the test in hand',
      'Match the selected instrument range to the colour code of the line/neutral conductor, whichever one is being tested on the circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Correct range gives both accuracy and safety. Loop testing on RCD circuits requires no-trip mode to prevent nuisance tripping during the test.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 110,
    question: 'Values entered on the Schedule of Test Results must be:',
    options: [
      'Rounded to the nearest whole ohm (0.5Ω and above rounded up) so that the certificate is kept tidy and easy for the client to read',
      'Recorded only where a value fails, passing values being left blank (a blank read as satisfactory) so that the failures stand out',
      'Recorded to the resolution displayed by the instrument and compared against design values (and BS 7671 maxima) BEFORE leaving site',
      'Averaged across all of the circuits on the board (the arithmetic mean), a single representative figure then being entered for the installation',
    ],
    correctAnswer: 2,
    explanation:
      'On-site comparison catches non-compliance immediately, allowing fault-finding before leaving the job.',
    section: '4.4',
    difficulty: 'intermediate',
  },

  // ============================================================
  // LO5: Continuity, IR, Polarity, Earth Electrode (Q111-145)
  // 304 AC5.1-5.7, 607 AC4.6-4.13, 302 AC5.1-5.8
  // ============================================================
  {
    id: 111,
    question: 'Why is continuity of protective conductors verified per Reg 643.2.1?',
    options: [
      'To confirm the cpc can carry the full load current of the circuit continuously, as though it were a neutral',
      'To verify the cpc colour coding (green-and-yellow), checked at every accessory along the circuit',
      'To measure the insulation resistance between the cpc and the line conductor, before energising',
      'To prove the cpc has a low-resistance path so ADS operates in time, and to prove bonding continuity',
    ],
    correctAnswer: 3,
    explanation:
      'Without a verified low-resistance cpc, ADS cannot work — the fault-current path is broken or too high to disconnect in time. The test also proves main and supplementary bonding continuity.',
    section: '5.1',
    difficulty: 'basic',
  },
  {
    id: 112,
    question:
      'The two methods for verifying continuity of protective conductors per GN3 Section 2.7 are:',
    options: [
      'Method 1 (R1+R2 — link line and cpc at the board) and Method 2 (R2 only — long lead from the MET)',
      'Method 1 (insulation resistance L-cpc — at 500V) and Method 2 (insulation resistance L-N — measured at 250V)',
      'Method 1 (loop impedance — at the origin) and Method 2 (loop impedance — at the far point)',
      'Method 1 (RCD trip time — at 1×IΔn) and Method 2 (RCD trip time — at 5×IΔn), measured at each accessory',
    ],
    correctAnswer: 0,
    explanation:
      'Method 1 links line and cpc at the distribution board and measures end-to-end at each accessory, giving both R1 and R2 (useful for Zs). Method 2 uses a long lead from the MET, is faster, but confirms cpc continuity only.',
    section: '5.2',
    difficulty: 'intermediate',
  },
  {
    id: 113,
    question: 'The three-step continuity test on a ring final circuit confirms:',
    options: [
      'Step 1: IR L-N. Step 2: IR L-cpc. Step 3: IR N-cpc — all three at 500V DC, at every socket-outlet on the ring',
      'Step 1: end-to-end r1, rn, r2. Step 2: cross-connect L-N, measure L-N at each socket. Step 3: cross-connect L-cpc',
      'Step 1: Ze at the origin. Step 2: Zs at the first socket on the ring. Step 3: Zs at the furthest socket, ring closed',
      'Step 1: prove dead, then lock off. Step 2: test polarity at every socket. Step 3: confirm the RCD trips at each socket',
    ],
    correctAnswer: 1,
    explanation:
      'The 3-step method: Step 1 measures end-to-end r1/rn/r2; Step 2 cross-connects L outgoing to N return and reads L-N at each socket (should be roughly constant); Step 3 cross-connects L to cpc and reads L-cpc, giving R1+R2 for the ring. It confirms the ring is unbroken and yields R1+R2 for Zs.',
    section: '5.2',
    difficulty: 'intermediate',
  },
  {
    id: 114,
    question:
      'A ring final circuit is wired in 2.5 mm² line and neutral with a 1.5 mm² protective conductor, with a total loop length of 50 m. The expected end-to-end reading of one line conductor is approximately:',
    options: [
      'About 0.05Ω (copper mΩ/m taken as negligible; 50m ignored)',
      'About 0.60Ω (uses the 1.5mm cpc 12.1 mΩ/m figure; not the 2.5mm)',
      'About 0.36-0.40Ω (50m × ~7.41mΩ/m ≈ 0.37Ω at 20°C; OSG mΩ/m table)',
      'About 0.74Ω (takes the full 100m ring at 7.41 mΩ/m; one leg is measured)',
    ],
    correctAnswer: 2,
    explanation:
      'OSG Table I1: 2.5mm² = 7.41 mΩ/m at 20°C; 50m × 7.41 = 370.5mΩ. r2 (1.5mm²) higher.',
    section: '5.3',
    difficulty: 'intermediate',
  },
  {
    id: 115,
    question: 'A 30 m radial circuit is wired in 2.5 mm² line with a 1.5 mm² protective conductor. The expected value of R1 + R2 at 20 °C is approximately:',
    options: [
      'About 0.22Ω (counts the 2.5mm line conductor only; the 1.5mm cpc run is ignored)',
      'About 0.36Ω (counts the 1.5mm cpc alone; the 2.5mm line conductor run is omitted)',
      'About 1.17Ω (takes 60m of there-and-back length; the circuit run length is only 30m)',
      'About 0.59Ω (R1: 30m × 7.41mΩ = 0.222Ω; R2: 30m × 12.10mΩ = 0.363Ω; total 0.585Ω)',
    ],
    correctAnswer: 3,
    explanation: 'OSG mΩ/m: 2.5mm²=7.41, 1.5mm²=12.10. 30m × (7.41+12.10) = 30 × 19.51 = 0.585Ω.',
    section: '5.3',
    difficulty: 'intermediate',
  },
  {
    id: 116,
    question:
      // Stem ended "must first be:" while every option names a thing rather than
      // completing the verb — the key reads "A multiplier from GN3...".
      'To calculate Zs from an R1 + R2 value measured at 20 °C, what must be applied to the measured value?',
    options: [
      'A multiplier from GN3 (typically 1.20 for 70°C thermoplastic), giving Zs = Ze + ((R1+R2) × 1.20)',
      'A divisor of 1.20 (giving (R1+R2)/1.20), since resistance falls as the cable warms',
      'The Cmin = 0.95 multiplier (already applied within Table 41.3), so that no further correction is needed',
      'A fixed addition of 0.05Ω (whatever the circuit), regardless of size or temperature',
    ],
    correctAnswer: 0,
    explanation:
      'Conductor resistance rises ~0.4%/K. Tested at 20°C but operating ~70°C (a 50K rise) gives an Appendix 9 / GN3 factor of about 1.20, so Zs = Ze + ((R1+R2) × 1.20).',
    section: '5.3',
    difficulty: 'intermediate',
  },
  {
    id: 117,
    question: 'Insulation resistance test should be conducted between:',
    options: [
      'Line and earth only (at 500V DC), the neutral being excluded from the test because it is already bonded to earth at the origin',
      'Live conductors connected together to earth (preferred when SPDs present), AND between live and neutral with loads disconnected',
      'Cpc and the main earthing terminal only (an R2 continuity check), confirming that the earthing path through the circuit is intact throughout',
      'Line and neutral only (loads left connected), the insulation to earth being taken as verified by the loop impedance test on each circuit',
    ],
    correctAnswer: 1,
    explanation:
      'L+N joined to earth tests insulation to earth without putting voltage across L-N (avoids damaging SPDs/equipment). Where loads can be disconnected, L-N is also tested.',
    section: '5.4',
    difficulty: 'intermediate',
  },
  {
    id: 118,
    question: 'What effect does connecting circuits in parallel have on the measured insulation resistance?',
    options: [
      "Parallel insulation paths ADD in series, so the overall IR is the SUM of each cable's individual value",
      'Parallel cables have no effect on the measured IR, whatever the quantity',
      'IR values in parallel ADD as conductances, so many parallel cables give a LOWER overall reading',
      'Each additional parallel cable RAISES the measured IR, because the extra copper improves the insulation',
    ],
    correctAnswer: 2,
    explanation:
      'Parallel insulation paths add as conductances (1/RT = 1/R1 + 1/R2 + ...). Each additional parallel cable lowers the measured value, even if each cable is individually fine.',
    section: '5.5',
    difficulty: 'intermediate',
  },
  {
    id: 119,
    question: 'What effect does increasing cable length have on the measured insulation resistance?',
    options: [
      'Longer cable = LESS insulation surface to leak through = HIGHER measured IR, the result rising in direct proportion to the cable length',
      'Cable length has no effect at all on insulation resistance, because IR depends only on the insulation material that is used',
      'Longer cable = HIGHER conductor resistance, which the IR tester then reads back as a higher insulation value for the circuit',
      'Longer cable = MORE insulation surface in parallel = LOWER measured IR. Test result expected to be inversely proportional to length',
    ],
    correctAnswer: 3,
    explanation:
      'Doubling length doubles the parallel insulation paths, halving IR. A long circuit naturally gives lower readings.',
    section: '5.5',
    difficulty: 'intermediate',
  },
  {
    id: 120,
    question: 'Reasons for verifying polarity per Reg 643.6 include:',
    options: [
      'To ensure single-pole devices (switches, fuses, MCBs) are connected in the LINE conductor only (not neutral), preventing equipment remaining live when switched off',
      'To confirm that the line and the neutral conductors are of the same csa (cross-sectional area), at every accessory and every joint on the final circuit tested',
      'To verify that the supply frequency (50Hz nominal) is correct, before any item of equipment is connected to the final circuit and energised for the first time',
      'To check that the phase rotation is clockwise (L1-L2-L3), so that the single-phase motors on the installation all run in the correct direction when first started',
    ],
    correctAnswer: 0,
    explanation:
      'If a single-pole switch is wired in the neutral, the load remains at line potential when switched off — major shock hazard.',
    section: '5.6',
    difficulty: 'basic',
  },
  {
    id: 121,
    question: 'Polarity must additionally be verified at:',
    options: [
      'The consumer unit alone (at the outgoing ways), since polarity cannot change beyond the board',
      'Origin of the supply, every accessory (sockets, switches), and every Edison-screw lampholder (centre contact must be LINE)',
      'The furthest point of each circuit alone (the Zs test point), where a wiring polarity error is most likely',
      'Bayonet-cap (BC) lampholders alone, since Edison-screw types are inherently safe here',
    ],
    correctAnswer: 1,
    explanation:
      'ES (Edison Screw) lampholders pose particular risk — touching the threaded shell during lamp change is common; line in shell would shock.',
    section: '5.7',
    difficulty: 'basic',
  },
  {
    id: 122,
    question: 'Procedure for verifying polarity (dead) per GN3 is:',
    options: [
      'Energise and confirm, with an approved voltage indicator, that the LINE terminal reads 230V to earth',
      'Measure insulation resistance between line and neutral, taking a low value as proof of correct polarity',
      'Continuity test from each bus-bar at the board to the matching LINE, NEUTRAL and cpc terminals',
      'Use a phase-rotation indicator at each accessory, to confirm the line conductor is correctly placed',
    ],
    correctAnswer: 2,
    explanation:
      'Dead-test polarity uses continuity from the L bus-bar to each LINE terminal, the N bus-bar to each NEUTRAL terminal, and the MET to each cpc terminal — proving correct identification at every termination. Live polarity (Reg 643.6) repeats this once energised.',
    section: '5.7',
    difficulty: 'intermediate',
  },
  {
    id: 123,
    question:
      'The earth electrode resistance of a TT installation may be measured using:',
    options: [
      'Insulation resistance test (500V DC), taken between the electrode and the main earthing terminal at the origin',
      'Continuity test (R2 method), taken between the earth electrode and the cpc of the furthest circuit on the board',
      'RCD trip-time test (at 1×IΔn) taken at the electrode, the measured trip time read off as a resistance value',
      'Fall-of-potential method, earth fault loop impedance (Ze) method, or earth-clamp (stake-less) loop method',
    ],
    correctAnswer: 3,
    explanation:
      'GN3 lists three methods: the three-point fall-of-potential method (most accurate, uses auxiliary spikes), the earth fault loop impedance method (a Ze test giving an approximation including the supply contribution), and the clamp-meter loop method. Fall-of-potential is most accurate but slow.',
    section: '5.8',
    difficulty: 'intermediate',
  },
  {
    id: 124,
    question: 'Polarity verification at three-phase distribution boards must additionally check:',
    options: [
      'Phase rotation/sequence (L1-L2-L3, clockwise) with a rotation indicator before energising motors',
      'That all three line/neutral voltages are exactly 230V (400V between lines)',
      'That the neutral is fused on all three phases (four fuses/links in all), giving balanced overcurrent protection',
      'That the prospective fault current (Ipf), measured line/earth at the board, is identical on each of the three lines',
    ],
    correctAnswer: 0,
    explanation:
      'Reverse phase rotation runs motors backwards — dangerous on pumps, lifts and conveyors. A phase-rotation indicator (typically three lamps plus an arrow) confirms L1-L2-L3 positive (clockwise) rotation before energising rotating machinery.',
    section: '5.7',
    difficulty: 'intermediate',
  },
  {
    id: 125,
    question: 'Where a circuit includes a surge protective device, the insulation resistance test should be:',
    options: [
      'Carried out at 1000V DC (not 500V), so the SPD is fully stressed',
      'Done at reduced voltage (250V), or with the SPD disconnected, then re-tested at full voltage',
      'Omitted entirely (no value recorded), since the SPD monitors its own insulation',
      'Carried out at the standard 500V (the Table 64 value) with the SPD left connected, accepting the lower reading',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 61643 SPDs activate above their nominal voltage — applying 500V can spuriously trigger or damage them. Test at 250V where the SPD operating voltage would otherwise be exceeded, or disconnect the SPD and re-test at full voltage if appropriate.',
    section: '5.4',
    difficulty: 'intermediate',
  },
  {
    id: 126,
    question: 'Factors affecting conductor resistance (Reg 524 + Appendix 4) include:',
    options: [
      'The cross-sectional area alone (R varies as 1/A), length being irrelevant to a material property',
      'The supply voltage (230/400V), the supply frequency (50Hz), and the prospective fault current measured at the origin of the incoming supply',
      'Cross-sectional area, length, conductor material (copper vs aluminium ≈1.6×), and temperature (~0.4%/K rise above 20°C)',
      'The insulation type (PVC/XLPE), and the ambient humidity around the cable during dead testing',
    ],
    correctAnswer: 2,
    explanation:
      'R = ρL/A. All four factors interact in design and test interpretation. Aluminium needs ~1.6× the csa of copper for equivalent R.',
    section: '5.3',
    difficulty: 'intermediate',
  },
  {
    id: 127,
    question:
      'On a ring final circuit, the R1 + R2 value read at each socket-outlet in step 3 relates to the end-to-end readings as:',
    options: [
      '(R1+R2) for the ring = (r1 + r2) — the full end-to-end line/cpc series value, as read on one leg of the ring',
      '(R1+R2) for the ring = (r1 + r2)/2 — a simple parallel combination of the two legs',
      '(R1+R2) for the ring = 2 × (r1 + r2) — because the ring, being a loop, doubles the line/cpc run',
      '(R1+R2) for the ring = (r1 + r2)/4 — two parallel paths, with line and cpc cross-connected',
    ],
    correctAnswer: 3,
    explanation:
      'A ring presents two parallel paths each containing line and cpc in series. The parallel of two equal values is R/2; cross-connecting both line and cpc gives the overall /4 factor, so (R1+R2)ring = (r1+r2)/4.',
    section: '5.2',
    difficulty: 'intermediate',
  },
  {
    id: 128,
    question:
      'During the cross-connected step of a ring final circuit test, readings that vary noticeably between socket-outlets indicate:',
    options: [
      'A spur, broken ring, or high-resistance joint at a socket — investigation required',
      'A perfectly healthy ring — the readings always vary slightly, socket to socket',
      'Reversed polarity at one socket-outlet — the ring itself, being unbroken, is sound',
      'An insulation fault between line and neutral — somewhere on the ring, but not a break',
    ],
    correctAnswer: 0,
    explanation:
      'Healthy ring with no spurs gives near-constant readings. Spurs add resistance proportional to distance; breaks unbalance the ring.',
    section: '5.2',
    difficulty: 'intermediate',
  },
  {
    id: 129,
    question: 'Earthing conductor for a TT system per Reg 542.3 should typically be:',
    options: [
      'A minimum of 1.5mm copper (bare or PVC-sheathed), the same csa as a typical lighting circuit cpc',
      'Sized per Table 54.1, protected against corrosion and mechanical damage (e.g. 16mm buried copper)',
      'Aluminium of any size (uncoated), on the basis that the soil provides the main fault path on a TT system',
      'The same csa as the supply neutral (as for PME main bonding), matching a TN-C-S bonding conductor at the MET',
    ],
    correctAnswer: 1,
    explanation:
      'A buried earthing conductor must withstand corrosion and mechanical stress and meet the minimum csa of Table 54.1. Bare or PVC-sheathed copper (e.g. 16mm) is typical on a TT system.',
    section: '5.8',
    difficulty: 'intermediate',
  },
  {
    id: 130,
    question:
      'On a 100m steel-armoured cable installed underground supplying a remote outbuilding (TN-S-derived), the SWA may serve as the cpc provided:',
    options: [
      'A separate 1.5mm copper cpc is also run alongside the armour, serving as a back-up earth path to the MET',
      'The armour is bonded only at the supply end, with the far end of the run left floating and unearthed throughout',
      'An adiabatic check shows the armour csa is sufficient, and the loop impedance meets the disconnection time',
      'The insulation resistance between the armour and the cores exceeds 1MΩ, when tested at 500V DC at each gland',
    ],
    correctAnswer: 2,
    explanation:
      'SWA armour can serve as the cpc but must pass the adiabatic check (Reg 543.1.3, S >= sqrt(I²t)/k) for fault-current withstand and the earth fault loop impedance check for disconnection time.',
    section: '5.1',
    difficulty: 'intermediate',
  },
  {
    id: 131,
    question: 'Polarity at the supply origin (Ze test point) is verified by:',
    options: [
      'Continuity testing between the line and neutral terminals with the supply fully isolated upstream of the cut-out',
      'Measuring the insulation resistance between line and earth at the cut-out before the installation is energised',
      'Checking the phase rotation at the origin using a three-lamp phase-rotation indicator at the intake position',
      'Confirming with an approved voltage indicator that the LINE carries supply voltage and the neutral does not',
    ],
    correctAnswer: 3,
    explanation:
      'DNO supply polarity is occasionally swapped (e.g. after cable joints). With the installation isolated downstream, an approved voltage indicator confirms the LINE terminal carries supply voltage to earth/neutral and the neutral does not, before relying on the rest of the polarity tests.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 132,
    question: 'Per Reg 543.1.1, the minimum csa of a separate cpc must:',
    options: [
      'Be found by the adiabatic equation S = sqrt(I²t)/k, or selected directly from Table 54.7',
      'Always be 6mm copper (one fixed size), whatever the line/neutral conductor size',
      'Be exactly half the csa (cross-sectional area) of the line/neutral conductor in every case, with no minimum applied',
      'Be sized only against the measured line/earth Ipf (not the load)',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 543.1.1 allows the adiabatic equation S = sqrt(I²t)/k OR Table 54.7 (the simpler tabulated route, giving effectively the same csa as the line for cables up to 16mm²).',
    section: '5.1',
    difficulty: 'intermediate',
  },
  {
    id: 133,
    question:
      'Where electronic equipment on a circuit cannot be disconnected before an insulation resistance test, the correct approach is to:',
    options: [
      'Raise the test voltage to 1000V, so the electronics are fully proven before the circuit is energised',
      'Use 250V where the manufacturer permits, or test live conductors joined together to earth only',
      'Skip the insulation resistance test altogether, and rely on the loop impedance result instead',
      'Test at 500V between line and neutral only, leaving the electronic equipment fully connected',
    ],
    correctAnswer: 1,
    explanation:
      'Reduced test voltage and the modified method (live conductors joined to earth, not between live and neutral) are GN3-approved alternatives that protect equipment while still verifying insulation to earth.',
    section: '5.4',
    difficulty: 'intermediate',
  },
  {
    id: 134,
    question:
      'Continuity of main protective bonding to extraneous conductive parts (gas, water, steel) should be verified by:',
    options: [
      'An insulation resistance test (500V DC) between the bonding conductor and the incoming service pipe; a high reading — above 1MΩ — confirms a sound bond',
      'An earth fault loop impedance test (Ze) from the bonded metalwork to the supply line conductor; a reading below 0.35Ω — the TN-C-S maximum — confirms the bond',
      'Low-resistance ohmmeter (R2 method) from MET to the bonded service entry point — typically <0.05Ω; values significantly higher indicate poor connection',
      'A visual check of the clamp for tightness (BS 951 clamp, warning label fitted); no electrical test is needed — a sound clamp cannot be a high-resistance joint',
    ],
    correctAnswer: 2,
    explanation:
      'Bonding integrity must be electrically verified — visual is insufficient. Tight metal-to-metal connections at clamps should give very low resistance.',
    section: '5.1',
    difficulty: 'intermediate',
  },
  {
    id: 135,
    question:
      'A continuity test on the protective conductor of a short lighting circuit gives 4 Ω. The electrician should:',
    options: [
      'Accept the measured value, since 4Ω is well within the maximum permitted — a lighting circuit cpc may read up to 10Ω',
      'Add the 4Ω to the measured Ze and record the total as the circuit Zs — no further action being needed, once the value is written down',
      'Re-test at a higher instrument test current, which will force the reading lower — 4Ω being an instrument range error',
      'Investigate: check for loose terminations, broken cpc, damaged cable, parallel paths via metalwork — rectify before any live testing',
    ],
    correctAnswer: 3,
    explanation:
      'High R2 means ADS may not work. Find and fix root cause before live testing, which would be hazardous.',
    section: '5.5',
    difficulty: 'intermediate',
  },
  {
    id: 136,
    question: 'A circuit tested at 500 V d.c. gives an insulation resistance of exactly 1.0 MΩ. This result is:',
    options: [
      'Meets the minimum but warrants GN3 investigation by sectional testing and visual inspection',
      'Fails outright, since the minimum acceptable insulation resistance value is actually 2MΩ at 500V',
      'Is an automatic C1 danger code, requiring the affected circuit to be isolated immediately on site',
      'Is recorded as a clear pass with no further action needed, regardless of the circuit length',
    ],
    correctAnswer: 0,
    explanation:
      '1MΩ is the minimum; values at or near it on short circuits indicate a problem. Sectional testing and visual inspection determine whether it reflects normal length-related leakage or a developing fault. Long circuits may legitimately approach the limit.',
    section: '5.4',
    difficulty: 'intermediate',
  },
  {
    id: 137,
    question:
      'The low-impedance range of a continuity tester should be selected when testing:',
    options: [
      'Through any circuit longer than 50m — so as to compensate for the higher resistance of the conductors being tested on the installation',
      'Through devices that may give nuisance trips on standard test current — and the reading interpreted with awareness of the test current limit',
      'On every continuity test that is carried out on site — the low-impedance mode being always the most accurate setting the instrument offers',
      'Only when testing insulation resistance on circuits containing surge protective devices — at the board or elsewhere on the installation being tested',
    ],
    correctAnswer: 1,
    explanation:
      'Some MFTs offer a low-current continuity mode for use through electronic devices — at the cost of reduced accuracy.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 138,
    question: 'When testing continuity of an SWA cable used as cpc, the inspector should:',
    options: [
      'Measure the insulation resistance between the armour and the cores (1000V DC), at each end of the run',
      'Bond the armour at the supply end only (single-end bonding), relying on the soil for the earth return',
      'Measure R2 gland-to-gland and verify the armour is bonded at both ends (gland tight, banjo fitted)',
      'Test the armour continuity at 250V (rather than 500V), so as to avoid damaging the cable insulation',
    ],
    correctAnswer: 2,
    explanation:
      'SWA armour cpc relies on glanding at both ends. The inspector measures R2 from origin gland to far-end gland and verifies the armour is bonded at both ends — a loose gland or missing banjo washer invalidates cpc continuity.',
    section: '5.1',
    difficulty: 'intermediate',
  },
  {
    id: 139,
    question:
      'The polarity of a socket-outlet incorporating a USB charging module is verified by:',
    options: [
      'Measuring the DC output voltage of the USB port (nominally 5V); the reading is then checked against the polarity markings on the front plate',
      'An insulation resistance test (500V DC) taken between the USB output terminals and earth; a reading above 1MΩ confirms the polarity is correct',
      'A phase rotation test (L1-L2-L3) carried out at the socket; a clockwise result confirms the line conductor is in its own terminal at the accessory',
      'Same dead-polarity test as a standard socket (line at LINE terminal); functional check via charging a known device confirms output polarity',
    ],
    correctAnswer: 3,
    explanation:
      'Even special accessories must satisfy basic polarity rules. Functional test confirms equipment operates correctly.',
    section: '5.7',
    difficulty: 'intermediate',
  },
  {
    id: 140,
    question:
      'A circuit has a measured R1 + R2 of 0.85 Ω at 20 °C and a measured Ze of 0.35 Ω. Applying a temperature factor of 1.20, the calculated Zs is:',
    options: [
      '1.37Ω (Ze + (R1+R2)×1.20 = 0.35 + 0.85×1.20 = 0.35 + 1.02 = 1.37Ω)',
      '1.20Ω (Ze + R1+R2 = 0.35 + 0.85, omitting the temperature multiplier)',
      '1.02Ω ((R1+R2)×1.20 only, omitting the Ze contribution)',
      '1.44Ω (Ze + (R1+R2)×1.28, using an incorrect temperature factor)',
    ],
    correctAnswer: 0,
    explanation:
      'Calculation: 0.35 + (0.85 × 1.20) = 0.35 + 1.02 = 1.37Ω. Compare against Table 41.3 for the device.',
    section: '5.3',
    difficulty: 'intermediate',
  },
  {
    id: 141,
    question:
      'If polarity is incorrect at a single-pole switch on a lighting circuit (switch in neutral), the symptom would be:',
    options: [
      'The light fails to come on at all — the switch interrupting the line conductor of the circuit, not the neutral/return',
      'Light works but lampholder/luminaire body remains at line potential when switch is OFF — major shock risk during lamp change',
      'The lighting circuit MCB trips every time the switch is operated — the reversed connection causing a direct line/neutral short',
      'The light flickers continuously — the neutral/return being switched rather than the line conductor of the lighting circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Symptom is silent — light still works. Hazard appears only when someone changes the lamp. Polarity test at the accessory catches it.',
    section: '5.6',
    difficulty: 'intermediate',
  },
  {
    id: 142,
    question:
      'An 80 m run of 4 mm² steel wire armoured cable supplies an outbuilding, with the armour used as the protective conductor. Taking the armour resistance as the value given in the data supplied, the expected R1 + R2 is approximately:',
    options: [
      'About 0.37Ω (counts the 4mm copper line at 4.61 mΩ/m only; the steel wire armour used as cpc is ignored)',
      'About 1.57Ω (takes 160m of there-and-back length at ~9.81 mΩ/m; the run as installed is only 80m)',
      'About 0.79Ω (R1: 80m × 4.61mΩ = 0.369Ω; R2 of armour for 4mm² SWA ~ 5.20 mΩ/m × 80m = 0.416Ω; total ~0.785Ω)',
      'About 0.42Ω (counts the armour at ~5.20 mΩ/m as the cpc only; the 4mm copper line conductor is ignored entirely)',
    ],
    correctAnswer: 2,
    explanation:
      'OSG: 4mm² Cu = 4.61 mΩ/m. SWA armour for 4mm² (2-core) is approx 5.2 mΩ/m. Sum 0.785Ω, well within most TT design constraints.',
    section: '5.3',
    difficulty: 'intermediate',
  },
  {
    id: 143,
    question:
      'If during continuity testing of a ring final, r1 = 0.40Ω and r2 = 0.65Ω, and Step 3 gives 0.26Ω at every socket, the result indicates:',
    options: [
      'A broken ring; Step 3 should have equalled (r1+r2)/2 = 0.525Ω, not the 0.26Ω actually measured',
      'A spur on the ring; the Step 3 reading is below the r1/r2 end-to-end sum (1.05Ω) at every socket',
      'A high-resistance joint; the Step 3 line/cpc reading should equal r1 (0.40Ω) at every socket',
      'Healthy ring (Step 3 = (r1+r2)/4 = 1.05/4 = 0.2625Ω; matches measured 0.26Ω across all sockets)',
    ],
    correctAnswer: 3,
    explanation:
      'Calculation matches: (0.40 + 0.65)/4 = 0.2625Ω. Constant readings across all sockets = no spurs, no breaks.',
    section: '5.2',
    difficulty: 'advanced',
  },
  {
    id: 144,
    question:
      'Reason for testing IR between L+N joined to earth (rather than L-N separately) when SPDs are present:',
    options: [
      'Avoids the test voltage appearing across the SPD (which is L-N or L-PE) potentially triggering or damaging it',
      'Speeds up the test by measuring line and neutral in one operation (one lead placement)',
      'Provides a higher insulation reading (in MΩ) by halving the conductors under test',
      'Allows the SPD status indicator (the green/red window) to be checked at the same time as the insulation test is carried out',
    ],
    correctAnswer: 0,
    explanation:
      'L+N together = no L-N voltage difference; only L (and N) to earth voltage applied. SPDs designed to clamp at higher voltages are protected.',
    section: '5.4',
    difficulty: 'intermediate',
  },
  {
    id: 145,
    question:
      'After altering a circuit (e.g. adding a socket), continuity of cpc on the WHOLE affected circuit must be re-verified because:',
    options: [
      'The added socket increases the connected load, raising the operating temperature of the whole circuit',
      'Disturbing existing terminations may have loosened them, so cpc integrity must be re-confirmed',
      'The csa of the existing cpc must be increased, to suit the longer circuit',
      'The previous test results are no longer valid, because the original certificate date has now expired',
    ],
    correctAnswer: 1,
    explanation:
      'Disturbing existing terminations may have loosened them, so the cpc integrity of the whole circuit (origin to all accessories) must be re-confirmed before energising. Reg 643.1.2 applies the same re-test logic to alteration work.',
    section: '5.2',
    difficulty: 'intermediate',
  },

  // ============================================================
  // LO6: Live Tests - Polarity, Ze, Zs, PFC, RCD, AFDD, Phase Sequence (Q146-185)
  // ============================================================
  {
    id: 146,
    question: 'Live polarity test (Reg 643.6) is conducted to confirm:',
    options: [
      'That the supply voltage remains within +/- 10% of the nominal 230V (as declared by the DNO), at every accessory under normal load conditions',
      'That the RCD trips within 300ms at 1×IΔn (its rated residual current), once the installation has been energised and put into service for the first time',
      'After energising, that the supply polarity (line vs neutral) is as expected and consistent with dead-test polarity verification at all accessories',
      'That the earth fault loop impedance (Zs) is below the tabulated maximum, at the furthest point of every final circuit on the installation that was tested',
    ],
    correctAnswer: 2,
    explanation:
      'Live polarity catches any wiring fault that might have been missed at dead-test, including supply-side issues from the DNO.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 147,
    question: 'Earth fault loop impedance Zs at the furthest point of a circuit is the sum of:',
    options: [
      'Ze minus (R1+R2) — the internal resistance of the installation reducing the external loop value seen at the origin',
      'R1 + R2 only (as measured) — the external loop impedance of the supply being excluded from the value of Zs at every point tested',
      'Ze + Rn (the line plus the neutral conductor) — the cpc forming no part of the earth fault loop path of the final circuit',
      'Ze (external loop) + R1 (line conductor to the fault) + R2 (cpc back to the MET), corrected to operating temperature — Zs = Ze + (R1+R2)',
    ],
    correctAnswer: 3,
    explanation:
      'Zs is the total loop impedance for an L-PE fault at the most-disconnect-difficult point.',
    section: '6.4',
    difficulty: 'basic',
  },
  {
    id: 148,
    question: 'Earth fault loop paths for TN-S systems:',
    options: [
      'L conductor -> fault -> cpc -> MET -> separate metallic earth conductor back to source transformer star point',
      'L -> fault -> cpc -> MET -> combined PEN conductor back to the source transformer (neutral and earth are combined)',
      'L -> fault -> cpc -> MET -> earth electrode -> soil -> DNO supply earth electrode -> back to the transformer star point',
      'L -> fault -> neutral -> MET -> earth electrode -> soil -> DNO electrode -> back to the source transformer star point',
    ],
    correctAnswer: 0,
    explanation:
      'TN-S has separate neutral and earth conductors throughout supply and installation. Earth path is metallic from MET back to source.',
    section: '6.3',
    difficulty: 'basic',
  },
  {
    id: 149,
    question:
      'On a TN-C-S supply, the earth fault loop path is:',
    options: [
      'L -> fault -> cpc -> MET -> separate metallic earthing conductor (a TN-S path) back to the source transformer',
      'L -> fault -> cpc -> MET -> combined PEN (neutral) conductor back to transformer (PEN bonded to earth at supply)',
      'L -> fault -> cpc -> MET -> earth electrode -> soil (a TT path) -> DNO supply electrode -> back to the transformer',
      'L -> fault -> neutral (not the cpc) -> earth electrode -> soil -> DNO supply earth electrode -> back to the transformer',
    ],
    correctAnswer: 1,
    explanation:
      'TN-C-S = combined PEN externally; separated to N and PE within the installation. Lower Ze typical (<=0.35Ω). A4:2026 uses PNB terminology in places.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 150,
    question: 'Earth fault loop paths for TT systems:',
    options: [
      'L -> fault -> cpc -> MET -> separate metallic earthing conductor (a TN-S path) back to the transformer star point',
      'L -> fault -> cpc -> MET -> combined PEN conductor back to the source transformer (PEN bonded at the supply)',
      'L -> fault -> cpc -> MET -> earth electrode -> earth (soil) -> DNO supply electrode -> back to transformer',
      'L -> fault -> neutral (not the cpc) -> MET -> combined PEN conductor -> back to the transformer neutral point',
    ],
    correctAnswer: 2,
    explanation:
      'TT relies on earth path through soil — typically high impedance (e.g. 50-200Ω). RCD essential for ADS within disconnection time.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 151,
    question: 'ADS verification per Reg 411.4-411.6 requires verification that:',
    options: [
      'The insulation resistance between the live conductors and earth exceeds 1MΩ, when tested at 500V DC on each circuit',
      'Every final circuit is fitted with a Type B RCD, so as to detect smooth DC residual fault currents in the installation',
      'The main protective bonding conductor is sized to at least 16mm copper, on every earthing arrangement that is used',
      'Measured Zs gives a fault current that operates the OCPD within the disconnection time, or a 30mA RCD is fitted',
    ],
    correctAnswer: 3,
    explanation:
      'ADS is verified where the measured Zs at the furthest point gives a fault current (U0/Zs) that operates the OCPD within the Reg 411.3.2 disconnection time, OR a 30mA RCD provides disconnection. Either path is acceptable but must be verified.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 152,
    question: 'Verification of a residual current device requires the operating time to be measured:',
    options: [
      'A single AC test at 1×IΔn, within the published maximum; the 5×IΔn test was deleted',
      'Tests at 1×IΔn, 5×IΔn and 0.5×IΔn together; all three remain required by A4:2026',
      'A single test at 5×IΔn only; the 1×IΔn trip-time test, at 0° and 180°, was deleted at A4:2026',
      'A test at 0.5×IΔn only; confirming the device does NOT trip, at or below half its rated residual current',
    ],
    correctAnswer: 0,
    explanation:
      'A4:2026 reform: only the 1×IΔn AC test (at 0° and 180°) is required for verification, with the trip time within the published maximum (BS EN 61008/61009: 300ms general purpose). The 5×IΔn test was removed from Reg 643.7.3.',
    section: '6.8',
    difficulty: 'intermediate',
  },
  {
    id: 153,
    question:
      'A general, non-delay 30 mA residual current device tested at its rated residual operating current must disconnect within:',
    options: ['100ms', '300ms', '1000ms', '40ms'],
    correctAnswer: 1,
    explanation:
      '300ms at 1×IΔn for general-purpose. 40ms at 5×IΔn applies as additional protection (Reg 415.1.1), but verification in A4:2026 is at 1×IΔn only.',
    section: '6.8',
    difficulty: 'intermediate',
  },
  {
    id: 154,
    question: 'When testing an RCD, the test must be conducted:',
    options: [
      'From the supply side of the RCD between L and N, taken at the consumer unit origin only',
      'Between line and neutral at the furthest socket, with the cpc disconnected for the test',
      'From the load side between L and PE, at the furthest point, at both 0° and 180° start phase',
      'Between neutral and earth at the origin, to confirm that no parallel earth paths exist anywhere',
    ],
    correctAnswer: 2,
    explanation:
      'The test is conducted from the load side of the RCD between L and PE, at the furthest practicable point on each circuit it protects. Phase angle affects waveform application, so testing at both 0° and 180° catches asymmetry in the trip mechanism.',
    section: '6.8',
    difficulty: 'intermediate',
  },
  {
    id: 155,
    question: 'Type AC RCDs detect:',
    options: [
      'Sinusoidal AC and pulsating DC residual currents (Type A performance) — on any final circuit, in a dwelling or in a workplace',
      'Smooth DC residual currents (Type B performance) — which makes them suitable for EV charger circuits in any premises',
      'Sinusoidal AC, pulsating DC and smooth DC residual currents — every waveform likely to occur on a final circuit (in service)',
      'Only sinusoidal AC residual currents — UNSUITABLE for circuits with electronic loads producing pulsating DC (most modern loads)',
    ],
    correctAnswer: 3,
    explanation:
      'Type AC is increasingly inadequate for modern loads. BS 7671 (post-Amendment 2) prefers Type A as the default.',
    section: '6.8',
    difficulty: 'intermediate',
  },
  {
    id: 156,
    question: 'Type A RCDs detect:',
    options: [
      'Sinusoidal AC and pulsating DC residual currents — the modern default device per Reg 531.3.3',
      'Only sinusoidal AC residual currents — exactly the same as a basic Type AC device would detect',
      'Smooth DC residual currents only — which is what makes them mandatory for EV charger circuits',
      'Sinusoidal AC, pulsating DC and smooth DC residual currents of every waveform — like a Type B',
    ],
    correctAnswer: 0,
    explanation:
      'Type A is the modern default, covering most domestic/commercial electronic loads. Required for circuits with switch-mode power supplies, dimmers and electronic ballasts.',
    section: '6.8',
    difficulty: 'intermediate',
  },
  {
    id: 157,
    question: 'Type B RCDs are required for circuits supplying:',
    options: [
      'Standard domestic lighting and socket-outlet circuits, carrying purely resistive loads only',
      'Equipment producing smooth DC residual current, e.g. EV chargers without separation or VSDs',
      'Circuits supplying switch-mode power supplies, and electronic dimmer-controlled lighting',
      'Any circuit in a bathroom or shower room, where supplementary equipotential bonding is required',
    ],
    correctAnswer: 1,
    explanation:
      'Type B detects smooth DC fault currents that blind Types AC and A (Reg 531.3.3 / 722.531.3.101). Mandatory on EV chargers without an isolating transformer and on three-phase VSDs/inverters.',
    section: '6.8',
    difficulty: 'intermediate',
  },
  {
    id: 158,
    question: 'An arc fault detection device is functionally tested by:',
    options: [
      'An injection of a simulated series arc, using a standard multifunction tester set to 1×IΔn',
      'A residual-current trip test at 30mA, on the basis that the AFDD also performs the RCD function',
      'A functional test-button check at commissioning and at periodic intervals, per the manufacturer',
      'An insulation resistance test of the AFDD electronics at 500V DC, before the circuit is energised',
    ],
    correctAnswer: 2,
    explanation:
      'AFDD verification in BS 7671 is limited to the integral test-button check at commissioning and at periodic intervals (per the manufacturer); operational testing of the arc-detection algorithm needs OEM-specific equipment and cannot be replicated by standard test instruments.',
    section: '6.8',
    difficulty: 'basic',
  },
  {
    id: 159,
    // Asked what an AFDD "must be inspected for"; all four options describe
    // where AFDDs are required or recommended. Reworded to the question the
    // options answer. Key verified against bs7671_facets: Reg 421.1.7 REQUIRES
    // AFDDs on socket-outlet final circuits not exceeding 32 A in HRRBs, HMOs,
    // purpose-built student accommodation and care homes, and RECOMMENDS them
    // elsewhere.
    question: 'What is the status of arc fault detection devices (AFDDs) in BS 7671?',
    options: [
      'Mandatory on every final circuit, of every installation; no exceptions are permitted anywhere',
      'Prohibited in residential premises, including HMOs; permitted only in industrial and commercial settings',
      'No longer referenced anywhere in BS 7671; Reg 421.1.7 was withdrawn in full, at Amendment 4:2026',
      'A requirement in HRRBs, HMOs, student accommodation and care homes; recommended elsewhere',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 421.1.7, redrafted at Amendment 2:2022, makes AFDDs on socket-outlet final circuits not exceeding 32 A a REQUIREMENT in HRRBs, Houses in Multiple Occupation, purpose-built student accommodation and care homes, and a RECOMMENDATION for all other premises.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 160,
    question:
      'The prospective fault current at the origin of an installation must be:',
    options: [
      'At the origin and relevant points, taking the higher of the L-N and L-PE values, recorded as Ipf',
      'At the furthest point of each circuit only, taking the lower of the L-N and L-PE values measured',
      'Between line and neutral only, the line-earth value being irrelevant to the device breaking capacity',
      'At the origin only, recording the line-earth value and ignoring the line-neutral value altogether',
    ],
    correctAnswer: 0,
    explanation:
      'PFC governs OCPD breaking capacity. Both the L-N short (PSCC/Ipsc) and the L-PE fault (EFLC/Ipefc) are measured; the higher value is recorded as Ipf on the EIC.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 161,
    question: 'Standard breaking capacity (Icn) for BS EN 60898 MCBs commonly available:',
    options: [
      '30mA, 100mA, 300mA — matching the residual current ratings of the common RCDs now in use',
      '6kA, 10kA, 16kA — selected to exceed measured Ipf at the point of installation per Reg 432.1',
      '6A, 16A, 32A — the standard rated currents (In) of the MCBs commonly used on domestic circuits',
      '0.4s, 1s, 5s — the maximum disconnection times that apply to the different earthing systems in use',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 432.1 requires Icn >= Ipf. Common values 6kA (small DBs) or 10kA (typical UK domestic) up to 16kA. RCBOs typically 6kA.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 162,
    question:
      'The prospective fault current at the origin measures 8.5 kA and the circuit-breakers have a rated short-circuit capacity of 6 kA. The inspector must:',
    options: [
      'Accept the installation; a 6kA device is adequate here — the measured Ipf being below 10kA',
      'Increase the rated current (In) of each MCB; this raises the breaking capacity — up to 8.5kA',
      'FAIL the verification — Icn < Ipf is C2; replace the devices or fit an upstream backup fuse',
      'Upgrade the main bonding to reduce the supply Ze; the measured Ipf then falls — below the 6kA',
    ],
    correctAnswer: 2,
    explanation:
      'Icn < Ipf is potentially dangerous (C2): the MCBs cannot safely interrupt the available fault current and can fail explosively. This violates Reg 432.1; remedy via a BS 88 backup fuse for energy limitation or higher-Icn devices.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 163,
    question:
      'Methods for determining PFC where instrument testing is impractical (e.g. high-current supplies):',
    options: [
      'Measurement of the earth electrode resistance (Ra) at the intake; application of Ipf = U0/Ra to the value obtained at the origin of the installation',
      'The breaking capacity (Icn) printed on the consumer unit, taken as the prospective fault current at the origin; no measurement being made at all',
      'Multiplication of the measured Zs at the furthest point by the rated current (In) of the protective device; the product is taken as the PFC at the board',
      'Calculation from supply transformer impedance and cable parameters; OR use of DNO declared values (e.g. 16kA at typical urban supply origin)',
    ],
    correctAnswer: 3,
    explanation:
      'DNO declared values are the design fallback; calculations using transformer Zk and cable Z give site-specific results.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 164,
    question: 'Phase rotation/sequence test on three-phase supplies must verify:',
    options: [
      'L1-L2-L3 positive (clockwise) rotation, checked with a phase-rotation indicator before energising',
      'That all three line voltages (L1-N, L2-N, L3-N) are within +/- 5% of one another at the distribution board',
      'That the neutral current is shared evenly across all three phases (L1, L2, L3) under normal load',
      'That the prospective fault current (Ipf), measured at the board, is equal on each of the three lines',
    ],
    correctAnswer: 0,
    explanation:
      'A phase-rotation indicator confirms L1-L2-L3 positive (clockwise) rotation so motors run the correct way at first energisation. Wrong rotation runs motors backwards and is potentially destructive on pumps, fans and compressors — always test BEFORE energising rotating loads.',
    section: '6.10',
    difficulty: 'intermediate',
  },
  {
    id: 165,
    question: 'Functional testing per Reg 643.10 includes confirming:',
    options: [
      'The insulation resistance of every switched circuit on the board, measured line/earth at 500V DC',
      'Switchgear, controls and interlocks operate, and RCDs/RCBOs trip on the test button as designed',
      'The earth fault loop impedance of each functional circuit, measured line/earth at its furthest point',
      'The polarity of every functional switch/isolator on the installation, verified at the dead-test stage',
    ],
    correctAnswer: 1,
    explanation:
      'Functional testing is end-to-end verification of every operating item — switchgear, controls (timers, sensors, contactors), interlocks, RCD/RCBO test-button operation and emergency systems. It is the final acceptance test before handover.',
    section: '6.11',
    difficulty: 'intermediate',
  },
  {
    id: 166,
    question:
      'When dealing with clients during commissioning and certification, the inspector should:',
    options: [
      'Hand over the certificate only; avoid discussing the defects, so that the client is not alarmed',
      'Use technical regulation numbers throughout; the client can then look up the standard, clause by clause',
      'Communicate clearly; explain results, coded defects, recommended actions and limitations in writing',
      'Leave the documentation on site without explanation; the client can refer to BS 7671, if they wish',
    ],
    correctAnswer: 2,
    explanation:
      'The customer relationship is part of the job. A plain-English explanation of results, coded defects, recommended actions, document retention and limitations — confirmed in writing — supports informed decisions.',
    section: '6.13',
    difficulty: 'basic',
  },
  {
    id: 167,
    question: 'Earth fault loop impedance Zs measured directly using an MFT loop tester is:',
    options: [
      'Always exactly equal to the calculated Zs from Ze + (R1+R2), with no variation between them',
      'Typically HIGHER than the calculated Zs, because the test current itself heats the conductors',
      'The dead-test value measured before energising, requiring no separate live measurement at all',
      'A live reading INCLUDING parallel earth paths, so it may be LOWER than the calculated Zs',
    ],
    correctAnswer: 3,
    explanation:
      'A live Zs reading benefits from parallel earth paths via extraneous bonded metalwork, so it may be lower than the calculated Zs from Ze + (R1+R2), which is the worst-case design value. Both are used in the compliance check.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 168,
    question: 'Test results meeting standard values (Reg 643.1.1) are essential because:',
    options: [
      'Out-of-range values reveal a fault that stops the protective measure operating as designed',
      'Standard values guarantee that the installation will not require periodic inspection for ten years',
      'Meeting the standard values measurably reduces the energy consumption of the installation in service',
      'Standard values confirm the installation matches the original cost estimate given to the client',
    ],
    correctAnswer: 0,
    explanation:
      'Standard values are the design margins. A below-minimum or above-maximum result means ADS or insulation failure under fault, risking shock, fire or equipment damage.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 169,
    question:
      'For confirming polarity of an incoming supply at a TT installation, the inspector must:',
    options: [
      'Confirm that L-PE = a small voltage (<5V), N-PE = nominal (~230V), and L-N = zero — using an approved voltage indicator at the cut-out or main switch',
      'Confirm L-PE = nominal voltage (~230V), N-PE = small voltage (typically <5V), and L-N = nominal — using approved voltage indicator at the cut-out or main switch',
      'Measure the earth electrode resistance (Ra), and confirm that it is below 200Ω — the polarity of the incoming supply is checked only once that value is proved',
      'Carry out a phase-rotation test (L1-L2-L3) at the cut-out — this confirms, on a single-phase TT supply, that the line conductor sits in the correct main switch terminal',
    ],
    correctAnswer: 1,
    explanation:
      'Even on TT, supply polarity must be verified — a supply-side neutral break can leave neutral at line potential.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 170,
    question: 'A 30 mA residual current device gives an operating time of 250 ms at its rated residual operating current. The device is:',
    options: [
      'Fail — exceeds the 40ms maximum that applies to a 30mA RCD at 1×IΔn per BS EN 61008/61009 (and BS 7671 Part 6)',
      'Fail — exceeds the 200ms maximum permitted when verifying an existing RCD/RCBO during a periodic inspection (EICR)',
      'Pass — within 300ms maximum for general-purpose 30mA RCD per BS EN 61008/61009 (and the BS 7671 verification requirement)',
      'Fail — a general-purpose RCD/RCBO must operate within 100ms at 1×IΔn (Reg 643.7.1) before the installation is certified',
    ],
    correctAnswer: 2,
    explanation: '300ms is the maximum at 1×IΔn for general-purpose 30mA. 250ms is acceptable.',
    section: '6.8',
    difficulty: 'basic',
  },
  {
    id: 171,
    question:
      'If RCD trips on the test-button check but fails to trip during instrument test at 1×IΔn:',
    options: [
      'PASS — the trip on the test button is sufficient proof; the RCD is operating correctly in service on the day of the test',
      'Re-test the device at 5×IΔn — the higher instrument current proves the detection circuit; accept the device if it then trips at that current instead',
      'Record it as a C3 improvement recommended — the device still trips mechanically; advise replacement at the time of the next inspection of the installation',
      'FAIL — replace device. Test button only verifies the mechanical trip; instrument test verifies electrical detection of residual current',
    ],
    correctAnswer: 3,
    explanation:
      'Test button is mechanical only. Failure under instrument test = the detection circuitry has degraded — RCD must be replaced.',
    section: '6.8',
    difficulty: 'intermediate',
  },
  {
    id: 172,
    question:
      'The measured Zs at the far end of a radial circuit protected by a 32 A Type B circuit-breaker is 1.55 Ω, against a tabulated maximum of 1.37 Ω. The electrician must:',
    options: [
      'FAIL — exceeds the max; up-size the cpc, reduce length, or fit RCD additional protection',
      'PASS — the 80% rule applies here; up to 1.71Ω, or 125%, is acceptable',
      'PASS — instrument tolerance is +/- 30%; 1.55Ω, once applied, falls within 1.37Ω',
      'PASS — only the 5s limit applies; 0.4s, a distribution-circuit value, is not relevant',
    ],
    correctAnswer: 0,
    explanation:
      '1.55Ω > 1.37Ω means ADS is too slow under fault. Remediation: up-size the cpc, reduce circuit length, or fit 30mA RCD additional protection.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 173,
    question:
      'Where Zs is measured at ambient temperature, the measured value is acceptable where it does not exceed:',
    options: [
      '>= 80% of the Table 41.3 maximum (measured at ambient/20°C), so that the circuit uses the full impedance margin in its design',
      '<= 80% of Table 41.3 maximum to allow for instrument uncertainty (typically +/- 30% for loop testers) and temperature rise above test temperature',
      'Exactly 80% of the measured Ze at the origin, regardless of the rating (In) and Type B/C of the device fitted to the circuit',
      '<= 120% of the Table 41.3 maximum (a cold-cable allowance), since the cable is tested while it is still cold/unloaded on site',
    ],
    correctAnswer: 1,
    explanation:
      '80% rule provides margin for instrument tolerance and conductor temperature rise. Some MFTs apply this automatically.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 174,
    question: 'If during functional testing a contactor operates but with abnormal noise/heat:',
    options: [
      'PASS — the contactor still operates (an audible hum is normal); noise and heat settle down, usually within the first hour after energising',
      'Record the noise as a C3 (improvement recommended) — heat alone is not a defect; leave the contactor in service, pending the next inspection of the installation',
      'FAIL — contactor showing signs of distress (worn contacts, coil insulation degrading); investigate and rectify before energising in service',
      'Increase the voltage applied to the coil (above its rated Uc) — the armature then seats firmly; the noise stops, and the heating falls away in service',
    ],
    correctAnswer: 2,
    explanation:
      'Operation is necessary but not sufficient — abnormal indicators predict failure. Replace.',
    section: '6.11',
    difficulty: 'intermediate',
  },
  {
    id: 175,
    question:
      'During EICR live tests, if RCD-protected circuit Zs measurement causes nuisance trip:',
    options: [
      'Temporarily link out the RCD (L-N/L-E bridge at the device) so that a full-current loop test can be carried out, then reconnect it',
      'Calculate Zs as Ze + (R1+R2) from the dead test results instead, since a live Zs value cannot be obtained on an RCD/RCBO circuit',
      'Bridge the RCD test terminals (T/N), bypassing the residual current detection while the loop test is carried out on the circuit',
      'Use the no-trip / 15mA / lower-current loop test mode (modern MFTs have this), accepting slightly reduced accuracy in exchange for non-tripping',
    ],
    correctAnswer: 3,
    explanation:
      'No-trip loop test injects current too low to trip the RCD. Accuracy reduces (~30% tolerance) but result is still useful for compliance.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 176,
    question: 'Selectivity (Reg 536) between RCDs in series is achieved when:',
    options: [
      'The upstream RCD has a higher IΔn and a time-delayed (Type S) characteristic, so the downstream trips first',
      'Both RCDs have the same rating (30mA), so that they simply share the residual current equally between them',
      'The upstream RCD has a lower IΔn (30mA) than the downstream device, so it trips first for any downstream fault',
      'The downstream RCD is time-delayed (Type S), so the upstream device trips first and clears the fault',
    ],
    correctAnswer: 0,
    explanation:
      'Selective coordination: a 100mA Type S RCD upstream of a 30mA RCD downstream means the downstream device operates first on its own zone fault, preventing total supply loss.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 177,
    question: 'Phase sequence reversal on a 3-phase induction motor will cause:',
    options: [
      'The motor to fail to start, drawing no current — the stator field cannot form; nothing happens until corrected',
      'Motor to run in REVERSE direction — potentially destructive on pumps, fans, compressors, lifts; trips on overload often follow',
      'The motor to run at double speed — reversal doubles the field frequency; the windings, unrated for it, overheat in seconds',
      'The motor to run normally — direction is set by the windings, not the supply; phase order, therefore, is irrelevant',
    ],
    correctAnswer: 1,
    explanation:
      'Wrong rotation = wrong direction. On centrifugal loads (pump impellers, lift gear) destructive within minutes.',
    section: '6.9',
    difficulty: 'intermediate',
  },
  {
    id: 178,
    question: 'Per Reg 415.1.1, 30mA RCD additional protection is required for:',
    options: [
      'Distribution circuits and sub-mains only, with all final circuits specifically excluded here',
      'Circuits supplying fixed equipment such as immersion heaters, boilers and storage heaters',
      'General-use socket-outlets up to 32A, outdoor mobile equipment, and shallow concealed cables',
      'Circuits located within bathrooms and shower rooms only, whatever the type of premises',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 415.1.1 requires 30mA additional protection for typical user-touched circuits: socket-outlets up to 32A for general use, mobile equipment up to 32A used outdoors, and cables concealed in walls below 50mm without other protection. A4:2026 retains this.',
    section: '6.8',
    difficulty: 'intermediate',
  },
  {
    id: 179,
    question: 'Test sequence for an RCBO (combined RCD + MCB) verifies:',
    options: [
      'The RCD function alone (1×IΔn trip time), with the MCB function assumed from the rating marked on the front of the device by the inspector',
      'The MCB function alone (Zs at the furthest point), with the residual current function being covered by the integral test button on the device itself',
      'The insulation resistance of the device alone (500V d.c.), measured before the circuit is energised for the first time and put into service',
      'RCD function (1×IΔn trip time) AND MCB function (continuity, polarity, Zs to verify magnetic trip operates within disc time on L-PE faults beyond RCD coverage)',
    ],
    correctAnswer: 3,
    explanation: 'RCBO combines two devices in one — both must be verified independently.',
    section: '6.8',
    difficulty: 'intermediate',
  },
  {
    id: 180,
    question:
      'A 230 V TN installation has a prospective fault current of 4.2 kA and 32 A Type B circuit-breakers rated at 6 kA short-circuit capacity. The protective devices are:',
    options: [
      'Acceptable — Icn 6kA exceeds Ipf 4.2kA, satisfying the Reg 434.5.1 breaking capacity requirement',
      'Unacceptable — Icn must be at least double the Ipf, so a 10kA device is required',
      'Unacceptable — Icn 6kA is below the 4.2kA Ipf, so the device cannot interrupt the fault',
      'Acceptable only if a 30mA RCD is added — the RCD raises the effective breaking capacity, since 6kA alone is too low',
    ],
    correctAnswer: 0,
    explanation: '6kA Icn safely interrupts a 4.2kA fault. Coordination satisfied.',
    section: '6.7',
    difficulty: 'intermediate',
  },
  {
    id: 181,
    question:
      'An inspector finds that a PME earthing facility has been used in a location where it is not permitted. The correct action is to:',
    options: [
      'Accept the PME/TN-C-S earth and fit a 30mA RCD, which removes the need for any conversion to a TT supply at the origin of the job',
      'Code C2 / refuse certification + recommend conversion to TT supply with RCD additional protection AND notification to dutyholder/installer',
      'Increase the main protective bonding conductor to 25mm so as to compensate for the prohibited PME/PNB supply in that location',
      'Connect the installation earth directly to the supply neutral so as to lower the line/earth fault loop impedance at the origin',
    ],
    correctAnswer: 1,
    explanation:
      'TN-C-S earthing in prohibited zones is potentially dangerous (broken PEN can transfer line voltage to earthed metalwork). Section 722 + DNO ENA EREC G12 cover.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 182,
    question:
      'For commissioning a control panel with PLC and contactors, functional testing must verify:',
    options: [
      'The insulation resistance of all the control wiring, measured at 500V DC line/earth',
      'The earth fault loop impedance, measured line/earth at the incoming terminals of the panel',
      'Each I/O operates, interlocks and the emergency stop function, and timing matches the spec',
      'The polarity of the incoming L1/L2/L3 supply, checked at the main isolator of the panel',
    ],
    correctAnswer: 2,
    explanation:
      'Modern control systems are software plus hardware; functional commissioning is structured against the design specification — each input/output, interlock, the emergency stop with safety-rated contactors, and the timing/sequencing.',
    section: '6.11',
    difficulty: 'intermediate',
  },
  {
    id: 183,
    question: 'Voltage drop verification per Reg 643 / 525.202:',
    options: [
      'Always physically measured at every accessory; a calibrated voltmeter, under full design load, is the only accepted method',
      'Verified by an insulation resistance test; a low value, at 500V DC, means excessive drop',
      'Limited to 10% for lighting, and 15% for others; measured at the origin',
      'Generally inferred from cable size, length and design data; limits are 3% lighting and 5% other',
    ],
    correctAnswer: 3,
    explanation:
      'Voltage drop is normally a design check inferred from cable size, length and design data; physical measurement is only needed if compliance is in doubt. The limits are 3% (lighting) and 5% (other) of nominal voltage.',
    section: '6.11',
    difficulty: 'intermediate',
  },
  {
    id: 184,
    question:
      'A condition report finds a PME earthing facility used to earth a marina berth supply. The observation should be coded:',
    options: [
      'C2 (potentially dangerous) — broken PEN risk in prohibited environments creates touch voltage hazard; inspector recommends conversion to TT',
      'C3 (improvement recommended) — acceptable in service; ideally converted to a TT arrangement at some point in the future',
      'Satisfactory (no code) — a PME supply is permitted in any location; a 30mA RCD on the final circuit is the only condition',
      'C1 (danger present) in every case — any PME connection is an immediate danger; the whole installation must be isolated on site by the inspector',
    ],
    correctAnswer: 0,
    explanation:
      'C2 = potentially dangerous. PEN faults under specific environmental conditions of the special location could electrify exposed metalwork.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 185,
    question:
      'EICR scenario: A 60-year-old rubber-insulated cable has IR result of 0.3MΩ at 500V. The appropriate code is:',
    options: [
      'Satisfactory (no code) — 0.3MΩ is acceptable; the circuit is long, and the rubber has aged',
      'C2 (potentially dangerous) — below the 1 MΩ minimum, the insulation has failed; replacement advised',
      'C3 (improvement recommended) — the low reading is essentially cosmetic; provided the circuit still functions, no real danger is present',
      'FI (further investigation) only — no code can be assigned; the circuit must first be re-tested at 250V, the voltage used for aged cable',
    ],
    correctAnswer: 1,
    explanation:
      '0.3MΩ is well below the 1MΩ minimum, so the insulation has failed. Aged rubber compounds are especially prone to deterioration (loss of elasticity, rising conductivity). Code C2, escalating to C1 only if an immediate shock/fire hazard exists.',
    section: '6.4',
    difficulty: 'advanced',
  },
  // ============================================================
  // A4:2026 update questions (Q186-Q200) — Table 41.3, AFDDs (Reg 421.1.7),
  // Reg 132.13, single-test RCD verification, EICR coding refresh.
  // ============================================================
  {
    id: 186,
    question:
      'Under BS 7671 Amendment 4:2026, the maximum permitted Zs for a 32A Type B MCB on a TN system (per the updated Table 41.3) is:',
    options: ['1.44 Ω', '1.50 Ω', '1.37 Ω', '0.72 Ω'],
    correctAnswer: 2,
    explanation:
      'Table 41.3 in A4:2026 lists 1.37 Ω for a 32A Type B MCB on a 230 V TN system (the value used at the elevated 80% Cmin). The pre-amendment value of 1.44 Ω is now superseded.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 187,
    question: 'Per Regulation 421.1.7 in BS 7671 Amendment 4:2026, AFDDs are now:',
    options: [
      'Mandatory on every AC final circuit of a fixed installation, with absolutely no exceptions permitted',
      'Mandatory only on socket-outlet circuits up to 32A, in all premises',
      'No longer referenced at all — AFDDs were struck out by Amendment 4:2026, along with the whole of Regulation 421.1.7',
      'Required on 32A socket-outlet circuits in HRRBs, HMOs, student accommodation and care homes',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 421.1.7 was redrafted at Amendment 2:2022 (A4:2026 then changed item (a) to High rise residential buildings): AFDDs on socket-outlet final circuits not exceeding 32 A are now a REQUIREMENT in BS 7671 itself for Higher Risk Residential Buildings, Houses in Multiple Occupation, purpose-built student accommodation and care homes, and a RECOMMENDATION for all other premises.',
    section: '1.6',
    difficulty: 'intermediate',
  },
  {
    id: 188,
    question:
      'Which BS 7671 regulation, renumbered in Amendment 4:2026, now requires the designer to record the assumed external influences and design assumptions on the certificate?',
    options: ['Reg 132.13', 'Reg 134.1.1', 'Reg 132.12', 'Reg 132.14'],
    correctAnswer: 0,
    explanation:
      'Reg 132.13 in A4:2026 (previously 132.12 in earlier amendments) requires the designer to provide written design data — assumed external influences, supply characteristics and so on — recorded on the certificate.',
    section: '5.1',
    difficulty: 'intermediate',
  },
  {
    id: 189,
    question:
      'Verification of the operating time of a 30 mA residual current device requires the test current to be:',
    options: [
      'Both 1×IΔn and 5×IΔn — unchanged at Amendment 4:2026',
      '1×IΔn only — the 5×IΔn AC test was deleted in Amendment 4:2026',
      '5×IΔn only — the 1×IΔn test was the one deleted',
      '½×IΔn (no-trip) and 1×IΔn — the 5×IΔn test is retained too',
    ],
    correctAnswer: 1,
    explanation:
      'Amendment 4:2026 simplified RCD verification. The 5×IΔn AC test has been removed; a single 1×IΔn AC trip-time test is now sufficient (with the half-rated no-trip test retained for Type B/F where required).',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 190,
    question:
      'An EIC issued under BS 7671 Amendment 4:2026 must show, in the new schedule columns, which of the following?',
    options: [
      'The arc-flash incident energy (cal/cm²), and the PPE category required at each distribution board on site',
      'The carbon footprint (kgCO2e/m) of the cable runs, and the recycled content of the consumer unit enclosure',
      'Loop impedance, RCD trip time at 1×IΔn, AFDD presence (Y/N) and earthing arrangement (TN-S, TN-C-S/PNB, TT)',
      'The cost of each circuit (materials/labour), and the hours recorded against the installation work',
    ],
    correctAnswer: 2,
    explanation:
      'A4:2026 model schedules added explicit columns for AFDD presence and updated the earthing arrangement to distinguish TN-C-S from PNB. Loop impedance, single-test RCD time, and earthing arrangement remain core entries.',
    section: '5.2',
    difficulty: 'intermediate',
  },
  {
    id: 191,
    question:
      'Why is protective neutral bonding recorded separately from a standard TN-C-S supply on the certificate?',
    options: [
      'Because a PNB supply always uses a TT earth electrode, in addition to the incoming PEN conductor',
      'Because PNB requires a Type B RCD on every final circuit, unlike a conventional TN-C-S supply',
      'Because PNB carries a higher prospective fault current, higher than any other earthing arrangement used',
      "Because the neutral-earth link sits at the consumer's intake, giving different fault path characteristics",
    ],
    correctAnswer: 3,
    explanation:
      "Protective Neutral Bonding (PNB) is a TN-C-S variant where the N-E link sits at the consumer's intake rather than the DNO source. A4:2026 treats it as a separate selectable certificate option so the supply and its fault path are recorded accurately.",
    section: '5.2',
    difficulty: 'intermediate',
  },
  {
    id: 192,
    question:
      'During the initial verification of a new circuit you measure Zs = 1.40 Ω on a 32A Type B MCB on a 230V TN system. Under A4:2026 Table 41.3 (limit 1.37 Ω) this is:',
    options: [
      'Non-compliant — Zs exceeds the 1.37 Ω maximum, so the circuit fails and must be re-designed',
      'Compliant — 1.40 Ω falls within the +/- 30% instrument tolerance, which brackets the 1.37 Ω limit value',
      'Compliant — the 80% rule permits a measured Zs of up to 1.71 Ω, well above the value actually obtained',
      'Compliant — Zs only needs to satisfy the 5 s disconnection time, not the stricter 0.4 s value',
    ],
    correctAnswer: 0,
    explanation:
      '1.40 Ω > 1.37 Ω (Table 41.3, A4:2026). The circuit cannot meet the 0.4 s disconnection time at the design fault current, so it fails verification; remedy with a larger conductor, RCD additional protection or supplementary bonding before energising.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 193,
    question:
      'When commissioning an EV charger fed from a TN-C-S supply, A4:2026 Section 722 requires:',
    options: [
      'A 100mA time-delayed Type S RCD on the EV charging circuit, to provide selectivity with upstream devices',
      'Either conversion to TT or a means of detecting an open-PEN condition, to prevent dangerous touch voltage',
      'An increase of the main protective bonding conductor to 25mm², sized to carry the broken-PEN fault current',
      'Supplementary bonding of the vehicle chassis to the building structural steelwork, taken back to the charge point',
    ],
    correctAnswer: 1,
    explanation:
      'Section 722 was strengthened by A4:2026: an open-PEN detection device (e.g. integral PEN-loss protection in the EVSE) or a TT island is mandatory when EV charging is fed from a TN-C-S/PME supply, because a broken PEN could energise the vehicle bodywork.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 194,
    question:
      'An insulation resistance test at 500 V d.c. gives a reading at the top of the instrument\'s range. This means:',
    options: [
      'A failing result — the insulation has broken down; the circuit must therefore not be energised',
      'An instrument fault — the tester is over-ranging; send it away for recalibration before recording',
      "The IR is at or above the instrument's display ceiling — a pass; record as '>299' not the numeral",
      'A borderline result — a reading at the range limit cannot be trusted; sectional insulation testing of the circuit is needed',
    ],
    correctAnswer: 2,
    explanation:
      "Many MFTs cap the displayed IR at 299 MΩ on a 500 V test. A4:2026 / GN3 confirm a '>299 MΩ' record is correct — the actual value is simply above the instrument's range, well above the 1 MΩ minimum.",
    section: '3.2',
    difficulty: 'basic',
  },
  {
    id: 195,
    question:
      'During commissioning of a three-phase board, one line-to-neutral voltage reads 245 V while the other two read 230 V. The most likely cause is:',
    options: [
      'Reversed phase rotation on the incoming supply — swapping two lines lifts one phase above the rest',
      'A failed SPD on the raised phase — its clamping pulls the other two down to 230 V',
      'An undersized cpc on the raised phase — the higher earth fault loop impedance lifts that phase\'s line-to-neutral voltage',
      'A loose, high-resistance neutral shifting the star point — confirm, isolate, and remake the termination',
    ],
    correctAnswer: 3,
    explanation:
      'A loose / high-resistance neutral causes the star point to drift, lifting one phase voltage above 230 V and dropping others. Diagnosed by N-E and L-N voltage variance, then resolved by isolating, proving dead and remaking the neutral terminations.',
    section: '6.9',
    difficulty: 'advanced',
  },
  {
    id: 196,
    question: 'An EICR issued in 2026 should explicitly cite:',
    options: [
      'BS 7671:2018 incorporating Amendment 4:2026',
      'BS 7671:2018 incorporating Amendment 2:2022',
      'BS 7671:2026 (the standard is fully reissued under a new year)',
      'BS 7671:2018 (no amendment reference is required on the report)',
    ],
    correctAnswer: 0,
    explanation:
      "From the A4:2026 effective date, EICRs must reference 'BS 7671:2018+A4:2026' (or the equivalent house style) so that the inspection criteria applied are unambiguous.",
    section: '5.3',
    difficulty: 'basic',
  },
  {
    id: 197,
    question:
      'The end-to-end continuity readings taken in step 1 of the ring final circuit test confirm:',
    options: [
      'That the insulation resistance between the line and the cpc exceeds 1MΩ at a 500V DC test',
      'That the line and CPC of the ring are continuous and unbroken end-to-end around the loop',
      'That the RCD protecting the ring trips within 300ms at 1×IΔn once the circuit is energised',
      'That the polarity is correct at every single socket-outlet around the ring final circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Step 2 of the ring final circuit test (per GN3) measures end-to-end continuity of L and CPC. A high or open reading flags a broken conductor at an accessory termination before the circuit is energised.',
    section: '3.4',
    difficulty: 'basic',
  },
  {
    id: 198,
    question:
      'On the new A4:2026 EICR coding flowchart, an undersized main protective bonding conductor (e.g. 6 mm² where 10 mm² is required for a 100 A PME supply) is normally coded:',
    options: [
      'C3 (improvement recommended) — undersized bonding is acceptable, provided a 30mA RCD is fitted',
      'Satisfactory (no code) — 6mm² bonding is adequate for any PME supply, up to and including 100A',
      'C2 (potentially dangerous) — fails the Reg 544.1 csa, undermining fault protection on a PEN failure',
      'FI (further investigation) — the bonding size cannot be coded, not until its resistance has been measured',
    ],
    correctAnswer: 2,
    explanation:
      'Inadequate main bonding for the supply type is potentially dangerous because it undermines fault protection if the PEN fails; remedial action is required. The standard convention is C2; only code C1 if the bonding is missing entirely AND a danger is present today.',
    section: '5.4',
    difficulty: 'intermediate',
  },
  {
    id: 199,
    question: 'The tests carried out before an installation is energised should be done in the order:',
    options: [
      'Insulation resistance, continuity of CPCs, polarity, then earth fault loop impedance (Zs) — all completed before energising the board',
      'Earth fault loop impedance, RCD trip time, polarity, then insulation resistance (500V d.c.) — all completed before energising',
      'Polarity, RCD operation, continuity of CPCs (R1+R2), then insulation resistance — all completed before energising the installation',
      'Continuity of CPCs and ring conductors, insulation resistance, polarity, earth electrode resistance (TT) — completed BEFORE energising',
    ],
    correctAnswer: 3,
    explanation:
      'GN3 sets the dead-test sequence: continuity (R1+R2 / ring step 1+2), insulation resistance, polarity, then earth electrode resistance for TT. Loop impedance and RCD trip times are live tests done after energising.',
    section: '3.4',
    difficulty: 'basic',
  },
  {
    id: 200,
    question:
      'When commissioning is complete on a new installation under A4:2026, the documentation pack handed to the client must include:',
    options: [
      'EIC, both schedules, as-installed drawings, design data (Reg 132.13), and protective-device data',
      'The EIC alone (Reg 644.4), since the schedules and drawings are retained by the installer',
      'An EICR (condition report) plus a Schedule of Test Results, as is required for a brand-new installation',
      'Only the manufacturer information (data sheets), covering the consumer unit and devices',
    ],
    correctAnswer: 0,
    explanation:
      "A4:2026 reinforces the design-data requirement under Reg 132.13. A complete pack is the EIC plus the Schedule of Inspections and Schedule of Test Results, as-installed drawings, the designer's written design data, and manufacturer information for AFDDs, RCBOs and SPDs.",
    section: '5.1',
    difficulty: 'intermediate',
  },

  // ============================================================
  // LO12: Initial verification, dead & live tests, commissioning
  // and certification — extended set (Q201-250)
  // BS 7671:2018+A4:2026 Part 6 + GN3 9th Ed (A4) + OSG
  // ============================================================
  {
    id: 201,
    question:
      'Regulation 643.1 requires that the tests of Regulations 643.2 to 643.11, where relevant, are:',
    options: [
      'carried out in any convenient order, provided all of them are completed before the supply is switched on',
      'carried out in the order given, but only once the origin of the installation has already been energised',
      'carried out in the order given in those Regulations and completed before the installation is energised',
      'carried out in the order given on new work and in the reverse order on an addition to a final circuit',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 643.1 states the tests of Regulations 643.2 to 643.6 shall be carried out in that order before the installation is energized. The order is not a convention: each dead test protects the tester and the equipment during the test that follows it.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 202,
    question:
      'Before an earth fault loop impedance measurement is made, Regulation 643.7.3.1 requires that:',
    options: [
      'an electrical continuity test to Regulation 643.2 has already been carried out on that circuit',
      'an insulation resistance test to Regulation 643.3 has already been carried out on that circuit',
      'the earth electrode resistance has already been measured and entered on the schedule of results',
      'the residual current device protecting the circuit has already been operated at its rated current',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 643.7.3.1 states that an electrical continuity test in accordance with Regulation 643.2 shall be carried out before the earth fault loop impedance measurement. A loop reading taken through a broken cpc can look plausible while the protective path does not exist.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 203,
    question:
      'Regulation 643.1 requires that measuring instruments and monitoring equipment used for testing are:',
    options: [
      'chosen from the manufacturer list published by the scheme provider, the body the contractor is registered with',
      'chosen in accordance with BS EN 60529, and recalibrated by the manufacturer before every working week',
      'chosen so that each separate quantity has its own single-function instrument, no multifunction tester being permitted',
      'chosen in accordance with the relevant parts of BS EN 61557, or offer no lesser performance and safety',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 643.1 requires measuring instruments and monitoring equipment and methods to be chosen in accordance with the relevant parts of BS EN 61557. Other equipment may be used only where it provides no lesser degree of performance and safety.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 204,
    question: 'Under Regulation 641.7, a certificate must be prepared:',
    options: [
      'on completion of the verification, but only where every result compared satisfactorily with the criteria',
      'on completion of the verification carried out under Regulations 641.1 to 641.6, whatever the outcome',
      'before the verification begins, so that the results can be entered on the form as testing progresses',
      'on completion of the verification, but only where the work has created one or more new final circuits',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 641.7 requires a certificate to be prepared on completion of the verification according to Regulations 641.1 to 641.6. The duty is not conditional on the results being satisfactory, and defects found are recorded on the certificate rather than kept off it.',
    section: '2.1',
    difficulty: 'basic',
  },
  {
    id: 205,
    question:
      'GN3 lists information the inspector needs before initial verification. Two items relating to the origin are:',
    options: [
      'the external earth fault loop impedance Ze, and the date the distributor last replaced the cut-out fuse',
      'the measured prospective fault current at every socket, and the type of meter fitted by the supplier',
      'the external earth fault loop impedance Ze, and the type and rating of the overcurrent device at the origin',
      'the depth and route of the distributor service cable, and the rating of the transformer feeding the street',
    ],
    correctAnswer: 2,
    explanation:
      'GN3 Chapter 2 lists Ze, the earth fault loop impedance of the part of the system external to the installation, and the type and rating of the overcurrent protective devices acting at the origin as required information. Both are needed to verify Zs and disconnection times.',
    section: '2.4',
    difficulty: 'intermediate',
  },
  {
    id: 206,
    question:
      'GN3 describes two widely used methods for checking continuity of protective conductors. They are:',
    options: [
      'test method 1, which shorts the circuit conductors, and test method 2, the wandering lead method',
      'test method 1, which uses a wandering lead, and test method 2, which shorts the circuit conductors',
      'test method 1, which shorts the circuit conductors, and test method 2, an insulation resistance test',
      'test method 1, which uses a clamp-on ammeter, and test method 2, the fall of potential arrangement',
    ],
    correctAnswer: 0,
    explanation:
      'GN3 sets out two evolved methods: the circuit-short method, test method 1, where the line conductor and cpc are linked at the origin, and the supplementary test cable or wandering lead method, test method 2, used where shorting the circuit is impractical.',
    section: '5.2',
    difficulty: 'intermediate',
  },
  {
    id: 207,
    question:
      'Using GN3 test method 1 on a lighting circuit, the reading obtained can be taken as R1 plus R2 only where:',
    options: [
      'the wiring is all-insulated and every accessory box is bonded back to the main earthing terminal',
      'the circuit is wired in steel conduit so that the enclosure runs in parallel with the cpc throughout',
      'the instrument leads have been nulled and the circuit has been left energised at the distribution board',
      'the wiring is all-insulated and the accessory boxes are not in contact with earthed building fabric',
    ],
    correctAnswer: 3,
    explanation:
      'GN3 notes that where the wiring is all-insulated and cable accessories are not in contact with earth, the measurement is the sum of the line conductor resistance R1 and the protective conductor resistance R2. Parallel paths through earthed metalwork give a lower, misleading value.',
    section: '5.2',
    difficulty: 'intermediate',
  },
  {
    id: 208,
    question:
      'GN3 requires continuity of main protective bonding conductors to be confirmed using test method 2 because:',
    options: [
      'a supplementary test lead injects a higher current than the circuit-short method can deliver at the origin',
      'a supplementary test lead reaches the far end without the bonding conductor having to be shorted out',
      'the circuit-short method cannot be used on any conductor whose cross-sectional area exceeds ten square mm',
      'the bonding conductor must be tested while still connected at both ends to keep the earth path intact',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 Chapter 7 states that test method 2 is used to confirm continuity of bonding and earthing conductors. A bonding conductor has no companion line conductor to link it to, so the wandering lead provides the return path for the low resistance ohmmeter.',
    section: '5.2',
    difficulty: 'intermediate',
  },
  {
    id: 209,
    question:
      'Regulation 463.3.3 applies where the safety of a machine depends on the direction of motor rotation. It requires:',
    options: [
      'provision that indicates reverse operation of the motor to the operator by an alarm at the control panel',
      'provision that records the phase sequence on the schedule of test results at every periodic inspection',
      'provision that prevents reverse operation of the motor arising from a reversal of the supply phases',
      'provision that limits the motor to a reduced speed whenever the supply phase sequence has been reversed',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 463.3.3 requires provision to be made for the prevention of reverse operation due to a reversal of phases. Detection alone does not satisfy it: a phase sequence relay must inhibit the contactor, not merely raise an alarm once the machine is already turning.',
    section: '6.9',
    difficulty: 'intermediate',
  },
  {
    id: 210,
    question: 'Step 1 of the ring final circuit continuity test consists of:',
    options: [
      'measuring the end-to-end resistance of each of the line, neutral and protective conductor loops',
      'measuring the resistance between line and neutral, at every socket-outlet served by the ring circuit',
      'measuring the resistance between line and cpc, at the socket furthest from the distribution board',
      'measuring the insulation resistance of each of the line, neutral and protective conductor loops',
    ],
    correctAnswer: 0,
    explanation:
      'GN3 step 1 takes the three separate end-to-end readings, referred to as r1, rn and r2, with the ring legs disconnected at the board. Comparing the three at this stage is what identifies an interconnection or a break before any cross-connection is made.',
    section: '5.2',
    difficulty: 'basic',
  },
  {
    id: 211,
    question:
      'In step 2 of the ring final circuit test the line and neutral legs are cross-connected. The reading obtained should be:',
    options: [
      'about half of the sum of the two end-to-end readings, and substantially the same at every socket',
      'about a quarter of the sum of the two end-to-end readings, and highest at the socket nearest the board',
      'about the same as the sum of the two end-to-end readings, and lowest at the socket furthest from the board',
      'about a quarter of the sum of the two end-to-end readings, and substantially the same at every socket',
    ],
    correctAnswer: 3,
    explanation:
      'GN3 shows that for a correctly connected ring, step 2 gives a reading equal to a quarter of the sum of the line and neutral open loop resistances, because the measurement sees two half-rings in parallel. A rising reading as you move round the ring indicates a spur or a break.',
    section: '5.2',
    difficulty: 'intermediate',
  },
  {
    id: 212,
    question:
      'Step 3 of the GN3 ring final circuit continuity test is carried out by cross-connecting the open ends of:',
    options: [
      'the line conductor and the neutral conductor, then measuring at each socket-outlet in turn',
      'the line conductor and the circuit protective conductor, then measuring at each socket in turn',
      'the neutral conductor and the circuit protective conductor, then measuring at the board only',
      'all three conductor loops together, then measuring at the socket furthest from the distribution board',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 step 3 cross-connects the open ends of the line conductor and the cpc. The value read at each socket is the R1 plus R2 for that point, and it is this figure that is carried forward to the schedule of test results and used to confirm Zs.',
    section: '5.2',
    difficulty: 'intermediate',
  },
  {
    id: 213,
    question:
      'During step 3 on a ring wired in 2.5 mm² with a 1.5 mm² protective conductor, the readings vary noticeably from socket-outlet to socket-outlet. This is:',
    options: [
      'proof of a break in the cpc, because the step 3 readings must be identical at every socket-outlet',
      'proof of an unintended spur, because a spur always raises the reading at the socket that feeds it',
      'expected, because GN3 tabulates the variation that arises where line and cpc have different areas',
      'expected, because the instrument leads have not been nulled before the step 3 readings were taken',
    ],
    correctAnswer: 2,
    explanation:
      'GN3 Table 2.9 gives example percentage differences between the lowest and highest step 3 readings where the line conductor and cpc have different cross-sectional areas. A modest, smooth variation is normal; a sharp jump at one point is what indicates a fault.',
    section: '5.3',
    difficulty: 'advanced',
  },
  {
    id: 214,
    question: 'Regulation 643.2.1 requires continuity of live conductors to be verified:',
    options: [
      'for ring final circuits, while continuity of protective conductors is verified for all circuits',
      'for all final circuits, while continuity of protective conductors is verified for ring circuits only',
      'for radial circuits above 20 A, while protective conductor continuity is verified for all circuits',
      'for every circuit in the installation, by a resistance measurement taken after the supply is restored',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 643.2.1 requires the continuity of protective conductors, including bonding conductors, to be verified by a measurement of resistance, and adds the live conductor requirement specifically for ring final circuits, where a break can hide behind the parallel path.',
    section: '5.1',
    difficulty: 'intermediate',
  },
  {
    id: 215,
    question:
      'A 230 V lighting final circuit is being insulation resistance tested at initial verification. Table 64 requires:',
    options: [
      'a test voltage of 250 V DC and a measured value of not less than 0.5 megohms for the circuit',
      'a test voltage of 500 V DC and a measured value of not less than 0.5 megohms for the circuit',
      'a test voltage of 1000 V DC and a measured value of not less than 1.0 megohms for the circuit',
      'a test voltage of 500 V DC and a measured value of not less than 1.0 megohms for the circuit',
    ],
    correctAnswer: 3,
    explanation:
      'Table 64 applies 500 V DC with a minimum of 1.0 megohms to circuits up to and including 500 V, other than SELV and PELV. The 250 V and 1000 V rows belong to SELV or PELV circuits and to circuits above 500 V respectively.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 216,
    question:
      'Table 64 gives separate values for SELV and PELV circuits. Those circuits are to be tested at:',
    options: [
      '250 V DC, with a minimum insulation resistance of 1.0 megohms for the result to be satisfactory',
      '250 V DC, with a minimum insulation resistance of 0.5 megohms for the result to be satisfactory',
      '500 V DC, with a minimum insulation resistance of 0.5 megohms for the result to be satisfactory',
      '50 V DC, with a minimum insulation resistance of 0.25 megohms for the result to be satisfactory',
    ],
    correctAnswer: 1,
    explanation:
      'Table 64 lists SELV and PELV separately at 250 V DC with a minimum of 0.5 megohms. The row for circuits up to and including 500 V is expressly qualified with the exception of those systems, so SELV and PELV are never tested at the 500 V, 1.0 megohms values.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 217,
    question:
      'For a circuit with a nominal voltage above 500 V, the test voltage and minimum value in Table 64 are:',
    options: [
      '1000 V DC and 2.0 megohms, twice the minimum value that applies to circuits up to and including 500 V',
      '500 V DC and 1.0 megohms, the same values as apply to a circuit up to and including 500 V nominal',
      '1000 V DC and 1.0 megohms, the same minimum value as applies to circuits up to and including 500 V',
      '1000 V DC and 0.5 megohms, the same minimum value as applies to a SELV or PELV circuit at 250 V DC',
    ],
    correctAnswer: 2,
    explanation:
      'Table 64 raises the test voltage to 1000 V DC for circuits above 500 V but leaves the acceptance value at 1.0 megohms. The test voltage tracks the working voltage the insulation must withstand; the minimum resistance does not change with it.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 218,
    question:
      'Regulation 643.3.1 states where insulation resistance is measured. The required measurements are:',
    options: [
      'between live conductors, and between live conductors and the protective conductor connected to earth',
      'between live conductors only, since a live to earth path is proved later by the loop impedance test',
      'between each live conductor and earth only, since a live to live fault is found by the polarity test',
      'between the protective conductor and earth, and between the neutral conductor and the earthing terminal',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 643.3.1 requires measurement between live conductors and between live conductors and the protective conductor connected to the earthing arrangement. It also permits line and neutral to be connected together, which gives a conservative single reading to earth.',
    section: '5.4',
    difficulty: 'intermediate',
  },
  {
    id: 219,
    question:
      'Regulation 643.3 was redrafted in A4:2026 to deal with connected equipment. Where equipment is likely to influence the test or be damaged by it:',
    options: [
      'a 500 V DC test is still made, and any equipment damaged by the test is replaced before certification',
      'the test is omitted for that circuit, and the omission is noted as a departure on the certificate',
      'a 250 V DC test may be made following connection of the equipment, and the reason recorded on the schedule',
      'a 1000 V DC test is made at the distribution board only, and the reason recorded on the schedule',
    ],
    correctAnswer: 2,
    explanation:
      'The redraft to Regulation 643.3 clarifies that a 250 V DC insulation resistance test following connection of the equipment may be used where connected equipment would influence the result or be damaged. The method and the reason for it should be recorded for traceability.',
    section: '5.4',
    difficulty: 'intermediate',
  },
  {
    id: 220,
    question:
      'GN3 sets out how the installation is to be prepared before an insulation resistance test. It requires that:',
    options: [
      'the main switch is off with fuses removed, switches and circuit-breakers open, and lamps left fitted',
      'the main switch is on with fuses in place, switches and circuit-breakers closed, and lamps left fitted',
      'the main switch is off with fuses in place, switches and circuit-breakers open, and lamps left fitted',
      'the main switch is off with fuses in place, switches and circuit-breakers closed, and lamps removed',
    ],
    correctAnswer: 3,
    explanation:
      'GN3 requires the main switch off with all fuses in place, switches and circuit-breakers closed so the whole of the wiring is included, lamps removed, and fluorescent and discharge luminaires disconnected. Devices left open would leave part of the circuit untested.',
    section: '5.4',
    difficulty: 'intermediate',
  },
  {
    id: 221,
    question:
      'A new final circuit gives an insulation resistance of 4 MΩ. Guidance is that this reading:',
    options: [
      'conforms to the Regulations, and needs no further action because it is above the tabulated minimum',
      'conforms to the Regulations, but is low enough for a new circuit that it should be investigated',
      'fails the Regulations, because the minimum for a circuit up to 500 V is 20 megohms under A4:2026',
      'fails the Regulations, because a value below 10 megohms is treated as a short circuit to earth',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 states that a value as low as 1 megohms would conform to the Regulations, but distinguishes the regulatory minimum from good practice and advises investigation of any new circuit reading below 20 megohms. A satisfactory result and a healthy one are not the same thing.',
    section: '5.5',
    difficulty: 'advanced',
  },
  {
    id: 222,
    question:
      'GN3 permits an insulation resistance test on the whole installation rather than circuit by circuit only where:',
    options: [
      'all the cables in the installation have already been tested to Table 64 prior to connection of equipment',
      'all the equipment in the installation has been disconnected and the neutral bar has been fully unbolted',
      'all the circuits in the installation are protected by residual current devices rated at 30 mA or less',
      'all the results are recorded on a single line of the schedule and countersigned by the qualified supervisor',
    ],
    correctAnswer: 0,
    explanation:
      'GN3 makes the whole-installation test conditional on all cables having been tested in accordance with Table 64 before connection. Without those pre-connection results a single low group reading gives no way of telling which circuit is at fault.',
    section: '5.5',
    difficulty: 'intermediate',
  },
  {
    id: 223,
    question:
      'A group insulation resistance test on a consumer unit gives a reading only just above the Table 64 minimum. The correct response is to:',
    options: [
      'accept the result, because a group reading above the tabulated minimum satisfies the Regulations',
      'retest the group at 250 V DC, because the lower test voltage will give a higher and truer reading',
      'test the circuits individually, because the circuit insulation resistances are measured in parallel',
      'test the circuits individually, because the group reading is the sum of the individual circuit values',
    ],
    correctAnswer: 2,
    explanation:
      'Insulation resistances of circuits tested together appear in parallel, so the group value is always lower than any single circuit and falls further as circuits are added. Splitting the group is the only way to find which circuit is dragging the reading down.',
    section: '5.5',
    difficulty: 'intermediate',
  },
  {
    id: 224,
    question:
      'One of the three checks Regulation 643.6 requires during the polarity test is confirmation that:',
    options: [
      'every fuse and single-pole control or protective device is connected in the neutral conductor only',
      'every fuse and single-pole control or protective device is connected in the line conductor only',
      'every fuse and double-pole control device is connected in the neutral conductor at the consumer unit',
      'every fuse and single-pole control device carries a label giving the circuit it protects and its rating',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 643.6(a) requires verification that every fuse and single-pole control and protective device is connected in the line conductor only. A device in the neutral leaves the equipment live at the line terminal after it has been switched off.',
    section: '5.6',
    difficulty: 'basic',
  },
  {
    id: 225,
    question:
      'Regulation 643.6(b) deals with lampholders in circuits having an earthed neutral conductor. It requires that:',
    options: [
      'outer or screwed contacts go to neutral, except for B15 and B22 lampholders to BS EN 60238',
      'centre contacts go to neutral, except for E14 and E27 lampholders complying with BS EN 60238',
      'outer or screwed contacts go to the line conductor, in every bayonet and Edison screw lampholder',
      'outer or screwed contacts go to neutral, except for E14 and E27 lampholders to BS EN 60238',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 643.6(b) requires centre contact bayonet and Edison screw lampholders to have the outer or screwed contacts connected to the neutral conductor, and expressly excepts E14 and E27 lampholders to BS EN 60238, whose construction already protects the user.',
    section: '5.7',
    difficulty: 'intermediate',
  },
  {
    id: 226,
    question:
      'Regulation 643.6 requires the polarity of the supply at the origin of the installation to be verified:',
    options: [
      'before the installation is energised, as part of the pre-energisation verification sequence',
      'after the installation is energised, once the earth fault loop impedance at the origin is known',
      'after the installation is energised, but before any final circuit is connected at the consumer unit',
      'only where the distributor confirms it in writing, and only if the service cable has been altered',
    ],
    correctAnswer: 0,
    explanation:
      'Where relevant, the polarity of the supply at the origin shall be verified before the installation is energized. Energising an installation fed with reversed polarity puts every single-pole device in the neutral at once, so the check has to come first.',
    section: '5.7',
    difficulty: 'basic',
  },
  {
    id: 227,
    question:
      'Regulation 643.6(c) requires verification that wiring is correctly connected throughout. A socket wired with line and neutral transposed would:',
    options: [
      'fail the insulation resistance test, because line to neutral insulation is bridged by the transposition',
      'fail the continuity test, because the R1 plus R2 value is measured through the neutral conductor',
      'pass the continuity and insulation tests, so only the polarity check reliably reveals the error',
      'fail the earth fault loop impedance test, because the loop is completed through the neutral conductor',
    ],
    correctAnswer: 2,
    explanation:
      'A transposition leaves conductor resistance and insulation unchanged, so the earlier dead tests are unaffected and the accessory still works. Regulation 643.6(c) exists precisely because correct function is no evidence that the wiring is correctly connected.',
    section: '5.7',
    difficulty: 'advanced',
  },
  {
    id: 228,
    question:
      'GN3 identifies three methods of assessing earth electrode resistance. The one it names as the most accurate is:',
    options: [
      'test method E2, a dedicated stakeless or clamp type tester needing no driven auxiliary spikes',
      'test method E1, a dedicated tester of the fall of potential type using three or four terminals',
      'test method E3, an earth fault loop impedance tester used at the consumer unit earthing terminal',
      'test method E1, an insulation resistance tester used between the electrode and a remote spike',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 lists E1, the fall of potential dedicated tester with three or four terminals, E2, the stakeless or clamp type, and E3, using an earth fault loop impedance tester, and states plainly that the most accurate of these is test method E1.',
    section: '5.8',
    difficulty: 'intermediate',
  },
  {
    id: 229,
    question:
      'A stakeless or clamp-type earth tester cannot be used to measure a single earth electrode unless:',
    options: [
      'at least one auxiliary spike has been driven in, at ten times the buried length of the electrode',
      'at least one residual current device on the installation has first been disconnected, at its load terminals',
      'at least one reading has been taken, with the earthing conductor lifted off the main earth bar',
      'at least one other earth is connected, such as extraneous-conductive-parts or a TN supply earth',
    ],
    correctAnswer: 3,
    explanation:
      'GN3 states that the stakeless tester cannot measure the resistance of a single earth electrode unless there is at least one other earth connected, which may be formed from extraneous-conductive-parts or, in TN systems, the means of earthing of the supply. It measures a loop, not one rod.',
    section: '5.8',
    difficulty: 'intermediate',
  },
  {
    id: 230,
    question:
      'GN3 requires an earth electrode resistance measurement to be made with a four-terminal instrument so that:',
    options: [
      'the resistance of the test leads is excluded from the reading by separating current and potential',
      'the resistance of the soil is excluded from the reading by separating the current and potential spikes',
      'the test current is shared between two pairs of leads, halving the current each connection has to carry',
      'the instrument can display the electrode resistance and the soil resistivity from a single measurement',
    ],
    correctAnswer: 0,
    explanation:
      'The four-terminal arrangement gives the current and potential circuits separate connections at the electrode, so lead and connection resistance is not counted in the result. On a low resistance electrode, lead resistance alone can be a large part of the figure.',
    section: '5.8',
    difficulty: 'intermediate',
  },
  {
    id: 231,
    question:
      'GN3 advises that an earth electrode resistance test should be carried out in the least favourable conditions, meaning:',
    options: [
      'in conditions such as heavy rain or flooding, which give the lowest and most repeatable value',
      'in conditions of moderate humidity, which give the value closest to the annual average result',
      'in conditions such as frozen or dry ground, which give the highest and most conservative value',
      'in conditions where the installation is fully loaded, which give the value seen during a real fault',
    ],
    correctAnswer: 2,
    explanation:
      'Electrode resistance rises when the soil is frozen or dried out, so a reading taken then is the worst case the installation will see. A figure obtained after heavy rain can flatter an electrode that will not perform in the middle of a dry summer or a hard frost.',
    section: '5.8',
    difficulty: 'intermediate',
  },
  {
    id: 232,
    question:
      'GN3 describes the test for Ze at the origin of a small installation. The measurement is made:',
    options: [
      'between the incoming line conductor and the outgoing neutral bar, with the main switch left closed',
      'between the incoming line conductor and the main earthing terminal, with all bonding left connected',
      'between the earthing conductor and a remote spike, with the installation left connected and energised',
      'between the incoming line conductor and the means of earthing, with the earthing disconnected',
    ],
    correctAnswer: 3,
    explanation:
      'GN3 requires the test between the incoming line conductor and the means of earthing, with the means of earthing disconnected from the installation and from extraneous-conductive-parts so that there are no parallel paths. Left connected, bonding lowers the reading and flatters Ze.',
    section: '6.3',
    difficulty: 'intermediate',
  },
  {
    id: 233,
    question:
      'GN3 permits a measured Ze to be added to a circuit R1 plus R2 value to obtain Zs. That addition is valid only where:',
    options: [
      'the Ze measurement was taken with the bonding connected so that the whole earth path was included',
      'the Ze measurement was taken with the earthing isolated so that no parallel paths were included',
      'the R1 plus R2 value was measured at the origin rather than at the far end of the circuit concerned',
      'the R1 plus R2 value was obtained by calculation from tabulated resistance per metre rather than measured',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 states the measured Ze is suitable for addition to circuit R1 plus R2 values only where the earthing and extraneous parts were correctly isolated and no parallel paths existed. A Ze taken with bonding in place already contains part of the installation.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 234,
    question:
      'Regulation 411.4.4 expresses the requirement for automatic disconnection as Zs times Ia not exceeding U0 times Cmin. Cmin is:',
    options: [
      'a minimum current factor allowing for device tolerance, given the value 0.95 for a BS EN 60898 device',
      'a minimum temperature factor allowing for conductor heating, given the value 0.80 for a copper cable',
      'a minimum voltage factor allowing for supply variation, given the value 0.95 for an ESQCR LV supply',
      'a minimum voltage factor allowing for supply variation, given the value 0.80 for an ESQCR LV supply',
    ],
    correctAnswer: 2,
    explanation:
      'Cmin is the minimum voltage factor accounting for variations with time and place, transformer tap changes and similar. For a low voltage supply given in accordance with the ESQCR it takes the value 0.95, so the tabulated maximum Zs values allow for a depressed supply voltage.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 235,
    question:
      'BS 7671 gives a way of judging a Zs measured at ambient temperature against the tabulated maximum. It is satisfied where the measured value is:',
    options: [
      'less than 0.8 times U0 divided by the product of Ia and Cmin, which allows for conductor heating',
      'less than 1.2 times U0 divided by the product of Ia and Cmin, which allows for conductor heating',
      'less than 0.95 times U0 divided by the product of Ia alone, since Cmin is already built into the table',
      'less than 0.8 times U0 divided by Ia alone, since Cmin applies to design calculations rather than tests',
    ],
    correctAnswer: 0,
    explanation:
      'The requirements of Regulation 411.4.4 or 411.5.4 are considered met where the measured Zs is less than 0.8 times U0 divided by Ia times Cmin. The 0.8 accounts for the rise in conductor resistance between the cold test and full operating temperature.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 236,
    question:
      'GN3 warns that the test current of an earth fault loop impedance tester may trip protective devices. The remedy it offers is:',
    options: [
      'an instrument that limits the test current to below 30 mA, or one that uses AC biasing of the core',
      'an instrument that limits the test current to below 15 mA, or one that uses DC biasing of the core',
      'an instrument that applies the test between line and neutral, rather than between line and earth',
      'an instrument that averages several readings, taken with the residual current device link removed',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 notes that the measuring current can trip some 6 A Type B circuit-breakers and any RCD protecting the circuit, and that manufacturers supply testers less liable to trip RCDs by limiting the test current to less than 15 mA or by DC biasing.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 237,
    question:
      'GN3 explains why a measured loop impedance cannot be compared directly with a design Zs value. The reason is that:',
    options: [
      'instrument tolerance under BS EN 61557 is wide, wider than the tolerance allowed for the protective device',
      'the measured value includes the supply impedance, while the design value covers the final circuit only',
      'the design value is derived using Cmin, which already allows for every difference between the two',
      'conductor resistance rises with temperature, so the two figures refer to different conductor conditions',
    ],
    correctAnswer: 3,
    explanation:
      'GN3 points out that ambient temperature affects conductor resistance, so tabulated measured impedances and the Zs design values in BS 7671 assume different conductor temperatures. A correction factor has to be applied before the comparison means anything.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 238,
    question:
      'Regulation 643.7.3.201 sets a requirement about fault current at the origin of the installation. It is that:',
    options: [
      'the prospective short-circuit and earth fault currents are measured, calculated or determined there',
      'the prospective short-circuit current alone is measured there, the earth fault current being calculated',
      'the prospective earth fault current alone is measured there, the short-circuit current being calculated',
      'the prospective short-circuit and earth fault currents are measured there, using a two-lead instrument',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 643.7.3.201 requires the prospective short-circuit current and the prospective earth fault current to be measured, calculated or determined at the origin of the installation. The greater of the two is what the devices at the origin must be able to break.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 239,
    question:
      'Where a prospective fault current cannot practicably be measured, BS 7671 permits it to be established by:',
    options: [
      'calculation only, since enquiry of the distributor gives a figure for the network rather than the origin',
      'enquiry of the distributor only, since calculation cannot allow for the impedance of the service cable',
      'calculation or by enquiry of the distributor, both being accepted alongside direct measurement',
      'comparison with a similar installation, provided the two are supplied from the same substation',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 permits determination by calculation, measurement or enquiry. A4:2026 also redefined Appendix 14, which now carries information on the determination of prospective fault current, the earth fault loop impedance material having moved to Appendix 3.',
    section: '6.6',
    difficulty: 'basic',
  },
  {
    id: 240,
    question:
      'Regulation 826.7 addresses loop impedance and fault current testing in a prosumer installation. It requires that:',
    options: [
      'an alternative method is used where the generator has been isolated from the installation for testing',
      'an alternative method is used where power converting equipment may affect the validity of readings',
      'the readings are taken twice, once with the inverter running and once with the inverter shut down',
      'the readings are taken only at the origin, since converting equipment cannot influence a Ze measurement',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 826.7 states that where the validity of readings taken with a fault loop impedance test instrument may be adversely affected by power converting equipment such as inverters, an alternative method of determining prospective fault current and loop impedance shall be used.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 241,
    question:
      'Under BS 7671:2018+A4:2026, a general non-delay 30 mA RCD is deemed verified where it disconnects within:',
    options: [
      '40 ms with an alternating current test at five times its rated residual operating current, IdeltaN',
      '200 ms with an alternating current test at half its rated residual operating current, IdeltaN',
      '500 ms with an alternating current test at its rated residual operating current, IdeltaN',
      '300 ms with an alternating current test at its rated residual operating current, IdeltaN',
    ],
    correctAnswer: 3,
    explanation:
      'The note to Regulation 643.7.3 states that regardless of RCD Type, effectiveness is deemed verified where a general non-delay device disconnects within 300 ms maximum with an alternating current test at the rated residual operating current. There is no separate five times test.',
    section: '6.8',
    difficulty: 'intermediate',
  },
  {
    id: 242,
    question:
      'A delay type S RCD is tested with an alternating current at its rated residual operating current. It is deemed verified where it disconnects:',
    options: [
      'between 130 ms as a minimum and 500 ms as a maximum, a window with both a floor and a ceiling',
      'between 40 ms as a minimum and 300 ms as a maximum, a window with both a floor and a ceiling',
      'within 500 ms, there being no minimum time because a faster trip is always the safer outcome',
      'within 130 ms, this being the maximum permitted for any device offering additional protection',
    ],
    correctAnswer: 0,
    explanation:
      'The note to Regulation 643.7.3 gives the delay type S device a band of 130 ms minimum to 500 ms maximum at IdeltaN. A type S that trips too quickly has lost the delay that gives it selectivity with the RCDs protecting the final circuits below it.',
    section: '6.8',
    difficulty: 'intermediate',
  },
  {
    id: 243,
    question:
      'GN3 describes an upstream and downstream RCD test arrangement. The test connection is made between:',
    options: [
      'the line conductor on the supply side of the device and the neutral conductor on the load side',
      'the line conductor on the load side of the device and the protective conductor at the same point',
      'the line conductor on the load side of the device and the neutral conductor on the supply side',
      'the line conductor on the supply side of the device and the earthing conductor at the main terminal',
    ],
    correctAnswer: 2,
    explanation:
      'GN3 specifies the test between a live conductor on the supply side and another live conductor on the load side, in practice line at the load side to neutral at the supply side. Taking the test outside the protective conductor avoids injecting the test current into the earth path.',
    section: '6.8',
    difficulty: 'intermediate',
  },
  {
    id: 244,
    question: 'Operating the integral test button on an RCD during initial verification is:',
    options: [
      'a functional check of the trip mechanism that replaces the instrument test on a domestic installation',
      'a functional check of the trip mechanism that does not replace the instrument test of the device',
      'an accuracy check of the trip time that must be recorded on the schedule of test results in seconds',
      'an accuracy check of the residual current setting that is required at six-monthly intervals thereafter',
    ],
    correctAnswer: 1,
    explanation:
      'The integral test button proves only that the mechanism releases; it passes a current set by the device itself and says nothing about the operating time or the residual current. Regulation 514.12 requires a notice telling the user to press it six-monthly, which is a separate duty.',
    section: '6.8',
    difficulty: 'intermediate',
  },
  {
    id: 245,
    question:
      'Regulation 411.3.3 was revised in A4:2026. RCD protection for socket-outlets may now be omitted where:',
    options: [
      'the location is not a dwelling and a documented risk assessment finds the protection unnecessary',
      'the location is not a dwelling and the socket-outlets are labelled for use by skilled persons only',
      'the socket-outlets are rated above 13 A and the circuit is protected by an arc fault detection device',
      'the socket-outlets are supplied from a circuit whose earth fault loop impedance is below one ohm',
    ],
    correctAnswer: 0,
    explanation:
      'The revised Regulation 411.3.3 applies to socket-outlets with a rated current not exceeding 32 A and permits omission only where, other than for a dwelling, a documented risk assessment determines the protection is not necessary. The assessment must be retained as a record.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 246,
    question:
      'For polyphase circuits, BS 7671 requires a check of phase sequence which verifies that:',
    options: [
      'the phase sequence is maintained at the origin of the installation and at the main switchboard',
      'the three line voltages are balanced to within five per cent of one another at every final circuit',
      'the phase sequence is maintained at all relevant points throughout the whole of the installation',
      'the neutral current does not exceed the rated current of the smallest line conductor in the circuit',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 requires verification that phase sequence is maintained at all relevant points throughout the installation. A sequence that is correct at the origin can still be reversed at a sub-board where the lines have been transposed in a gland or a busbar chamber.',
    section: '6.10',
    difficulty: 'basic',
  },
  {
    id: 247,
    question:
      'Regulation 643.10 gives examples of equipment requiring functional testing. Those examples include:',
    options: [
      'assemblies, drives, controls and interlocks, socket-outlet polarity, and insulation monitoring',
      'luminaires, heating appliances and motors, together with every accessory fitted on a final circuit',
      'assemblies and drives only, other equipment being covered by the manufacturer commissioning record',
      'assemblies, drives, controls and interlocks, emergency switching off, and insulation monitoring',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 643.10 lists switchgear and controlgear assemblies, drives, controls and interlocks, systems for emergency switching off and emergency stopping, and insulation monitoring. The list is not exhaustive, and the checks prove the installation works as designed.',
    section: '6.11',
    difficulty: 'intermediate',
  },
  {
    id: 248,
    question:
      'Regulation 644.3 states what an Electrical Installation Certificate must include. Besides the extent of the work, it requires:',
    options: [
      'Schedules of Inspection and Schedules of Circuit Details and Test Results, based on Appendix 4 models',
      'Schedules of Inspection and Schedules of Circuit Details and Test Results, based on Appendix 6 models',
      'Schedules of Inspection alone, the test results being retained by the contractor for six years instead',
      'Schedules of Circuit Details and Test Results alone, since inspection outcomes appear on the certificate',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 644.3 requires the certificate to include the extent of the work covered, plus the Schedules of Inspection and the Schedules of Circuit Details and Test Results, all based on the models in Appendix 6. A certificate missing a schedule is not complete.',
    section: '7.2',
    difficulty: 'basic',
  },
  {
    id: 249,
    question:
      'A Minor Electrical Installation Works Certificate may be issued where the work:',
    options: [
      'does not include a new circuit or the replacement of a distribution board or a consumer unit',
      'does not include a new circuit, but may include a new consumer unit',
      'does not include a new circuit, and is confined to a domestic dwelling',
      'does not include work in any special location, whatever circuits it creates',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 644.4.201 allows a Minor Works Certificate, based on the Appendix 6 model, for each circuit added to or altered where the work does not include the provision of a new circuit or replacement of a distribution board or consumer unit. Anything more needs an EIC.',
    section: '2.1',
    difficulty: 'intermediate',
  },
  {
    id: 250,
    question:
      'On completion of the periodic inspection and testing of an existing installation, the person producing the report must:',
    options: [
      'an Electrical Installation Certificate, based on the model and notes given in Appendix 6',
      'a Minor Electrical Installation Works Certificate, one for each circuit found to need remedial work',
      'an Electrical Installation Condition Report, based on the model and notes given in Appendix 6',
      'a written quotation for the remedial work, issued alongside the schedule of test results obtained',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 653.1 requires an Electrical Installation Condition Report to be produced on completion of periodic inspection and testing, taking account of the notes for the person producing the report in Appendix 6. An EIC covers new work, not the condition of an existing installation.',
    section: '6.13',
    difficulty: 'basic',
  },
  {
    id: 251,
    question: 'The main reason for isolating a circuit and proving it dead before work begins is to:',
    options: [
      'remove the risk of electric shock and burns to the worker',
      'record the voltage present at the origin of the supply',
      'confirm the protective device is rated for its load',
      'let the insulation tester discharge its capacitor',
    ],
    correctAnswer: 0,
    explanation: 'Isolation exists to protect people. Proving dead removes the shock and burn hazard before anyone puts a hand near a conductor. Recording the supply voltage is tempting because it is done at the origin, but it is a measurement made while the supply is still on and does nothing to make the work safe.',
    section: '1.3',
    difficulty: 'basic',
  },
  {
    id: 252,
    question: 'An apprentice asks why a circuit must be isolated before a continuity test when the test instrument itself produces only a few volts. The correct answer is that:',
    options: [
      'the instrument first needs a live reference to null out its test leads',
      'a live circuit would endanger the tester and give a false reading',
      'continuity values are valid only above operating temperature',
      'the wander lead must be energised to complete the loop',
    ],
    correctAnswer: 1,
    explanation: 'A low resistance ohmmeter injects its own current into a circuit it expects to be dead. Mains voltage on that circuit can damage the instrument, injure the user and swamp the reading. Nulling the leads is a real step, but it is done by shorting the probes together, not against a live supply.',
    section: '1.3',
    difficulty: 'intermediate',
  },
  {
    id: 253,
    question: 'A final circuit can be fed either from the consumer unit or, through a changeover switch, from a standby generator. Safe isolation of that circuit requires that:',
    options: [
      'only the changeover switch is locked off, because it selects the live source',
      'the standby generator is left running so that it can prove the voltage indicator',
      'all sources are locked off and the circuit proved dead at the point of work',
      'the consumer unit alone is locked off, as the generator feeds a relay',
    ],
    correctAnswer: 2,
    explanation: 'Every possible source of supply has to be secured, and the circuit must then be proved dead where the work will actually happen. Locking the changeover switch alone is the tempting answer because it does select the source, but a changeover switch can be bypassed, mis-wired or fail to break every pole, so it cannot be relied on as the only point of isolation.',
    section: '1.3',
    difficulty: 'intermediate',
  },
  {
    id: 254,
    question: 'Isolating the supply to a shop unit for testing will:',
    options: [
      'raise the insulation resistance of the circuits, since nothing is then left connected',
      'reset the prospective fault current, as declared at the distributor\'s meter',
      'clear any earth fault already present, on any of the final circuits',
      'interrupt trading and shut down tills, lighting and refrigeration',
    ],
    correctAnswer: 3,
    explanation: 'The practical consequence of isolating is loss of supply to everything downstream, which has to be planned with the occupier. Isolation does not clear faults; a fault that exists before isolation is still there afterwards, which is why testing follows.',
    section: '1.4',
    difficulty: 'basic',
  },
  {
    id: 255,
    question: 'Before isolating the whole installation of an occupied care home for testing, the electrician should first:',
    options: [
      'agree a time window with the responsible person and warn occupants',
      'disconnect the main earthing conductor at the supply terminal',
      'remove every lamp so the lighting circuits read open circuit',
      'measure the insulation resistance while the supply is on',
    ],
    correctAnswer: 0,
    explanation: 'Loss of supply in a care home affects lifts, call systems, heating and medical equipment, so the outage must be agreed and communicated before the switch is opened. Removing lamps is a genuine part of preparing for an insulation resistance test, but it comes after the supply has been isolated, not before it is agreed.',
    section: '1.4',
    difficulty: 'intermediate',
  },
  {
    id: 256,
    question: 'An installation includes a server room fed through an uninterruptible power supply. When the main switch is opened for testing, the electrician must recognise that:',
    options: [
      'the UPS output falls to zero the moment the main switch is opened',
      'parts fed by the UPS stay live and must be isolated separately',
      'the UPS output is a SELV source needing no further isolation',
      'opening the main switch also opens the UPS bypass path',
    ],
    correctAnswer: 1,
    explanation: 'An uninterruptible supply is designed to keep its outgoing circuits live when the incoming supply fails, so opening the main switch is precisely the event it exists to cover. Assuming the output falls to zero is the classic and dangerous mistake; those circuits need their own isolation and proving dead.',
    section: '1.4',
    difficulty: 'intermediate',
  },
  {
    id: 257,
    question: 'Working on a circuit that has not been proved dead exposes the electrician to:',
    options: [
      'an inaccurate earth electrode result, measured at the rod',
      'a reduced insulation resistance reading, on that final circuit',
      'electric shock, burns and arcing at the point of contact',
      'loss of calibration, needing the instrument re-certified',
    ],
    correctAnswer: 2,
    explanation: 'The hazards of unproved conductors are injury hazards: shock, burns and arc flash. The measurement answers are tempting because bad practice does spoil results, but a spoiled reading is an inconvenience while contact with a live conductor can be fatal.',
    section: '1.4',
    difficulty: 'basic',
  },
  {
    id: 258,
    question: 'An electrician relies on a socket tester to decide that a circuit is dead. The danger of doing so is that:',
    options: [
      'the device gives a reading only where the polarity has been transposed',
      'the device will trip the residual current device as it is connected',
      'the device measures the earth fault loop impedance instead of voltage',
      'the device cannot prove absence of voltage on all live conductors',
    ],
    correctAnswer: 3,
    explanation: 'A socket tester indicates at one accessory, on the terminals it happens to contact, and gives no proof that every live conductor is dead at the point of work. Proving dead needs an approved voltage indicator proved on a known source before and after. The tripping answer is tempting because some testers do have a trip button, but nuisance tripping is not the safety failure here.',
    section: '1.4',
    difficulty: 'intermediate',
  },
  {
    id: 259,
    question: 'A three-phase board is locked off at its incoming isolator, yet a test shows one busbar still at 230 V to earth. The most likely explanation is that:',
    options: [
      'a borrowed neutral or back-feed is energising that section',
      'the isolator failed to break the protective conductor',
      'the loop tester is charging the busbar capacitance',
      'the voltage indicator is reading induced voltage',
    ],
    correctAnswer: 0,
    explanation: 'A genuine 230 V reading after isolation means another source is reaching that busbar, typically a back-feed from a circuit fed elsewhere or a shared neutral from an adjacent board. The protective conductor answer is wrong on its face: an isolator is never intended to break the protective conductor, so failing to do so is normal, not a fault.',
    section: '1.4',
    difficulty: 'advanced',
  },
  {
    id: 260,
    question: 'The purpose of initial verification is to confirm that the new work:',
    options: [
      'will not need any further inspection for at least the next ten years',
      'meets the requirements of BS 7671 before it is put into service',
      'has been priced correctly against the client\'s original quote',
      'uses cables from a manufacturer approved by the distributor',
    ],
    correctAnswer: 1,
    explanation: 'Initial verification is a compliance check made before the installation is used, comparing what has been built against the standard and the design. It says nothing about how long the installation will last; a future inspection interval is recommended separately and is not what verification proves.',
    section: '2.1',
    difficulty: 'basic',
  },
  {
    id: 261,
    question: 'Initial verification of a new installation is carried out:',
    options: [
      'at any point within twelve months, counted from the handover',
      'only after the client has occupied the premises, and started to use them',
      'during erection and on completion, before it is put into service',
      'once the distributor has energised the supply, and not before',
    ],
    correctAnswer: 2,
    explanation: 'Verification runs alongside the work and finishes before the installation is handed over for use, so that defects are found while they can still be reached and corrected. Waiting for the distributor to energise the supply is the tempting answer, but much of the verification, including all the dead tests, must be complete before that point.',
    section: '2.1',
    difficulty: 'intermediate',
  },
  {
    id: 262,
    question: 'During initial verification an inspector finds a defect in a circuit installed by another operative on the same job. The correct course of action is to:',
    options: [
      'record it on a condition report instead, as it was another operative\'s work',
      'issue the certificate and record the defect on it as an agreed departure',
      'issue the certificate now and forward the retest results at a later date',
      'have the defect corrected and retested before the certificate is issued',
    ],
    correctAnswer: 3,
    explanation: 'For a new installation, any defect or omission found during inspection and testing must be corrected before the certificate is issued. Recording it as a departure is tempting because departures do have a place on the certificate, but a departure is a considered design decision that still achieves safety, not a way of certifying faulty work.',
    section: '2.1',
    difficulty: 'basic',
  },
  {
    id: 263,
    question: 'Initial verification consists of:',
    options: [
      'inspection followed by testing, with the results recorded',
      'testing only, as inspection is part of the design stage',
      'inspection only, with testing left to periodic reports',
      'a visual walk round, with testing if the client asks',
    ],
    correctAnswer: 0,
    explanation: 'Verification is inspection and testing together, with the outcome written down on the certificate and its schedules. Testing on its own is not enough because many defects, such as a missing fire barrier or an unsuitable enclosure, produce no test reading at all.',
    section: '2.2',
    difficulty: 'basic',
  },
  {
    id: 264,
    question: 'Initial verification requires the new work to be compared against:',
    options: [
      'the previous condition report, as issued for the premises',
      'the design, the manufacturers\' instructions and BS 7671',
      'the regulations in force, as at the date the building was built',
      'the client\'s schedule of rates, as priced for the contract',
    ],
    correctAnswer: 1,
    explanation: 'The inspector checks the installation against three things: what the designer specified, what the equipment manufacturer requires, and what the current standard demands. Comparing against the edition in force when the building was built is the tempting answer, but that only applies when assessing an existing installation on a condition report, not when verifying new work.',
    section: '2.2',
    difficulty: 'intermediate',
  },
  {
    id: 265,
    question: 'An inspector arrives to verify a new distribution board but no circuit chart or design data has been supplied. The correct response is to:',
    options: [
      'assume that the design is correct and test against standard values',
      'verify what is visible and record the rest as an agreed limitation',
      'obtain the information needed before verification can proceed',
      'carry out the testing first and produce the chart after',
    ],
    correctAnswer: 2,
    explanation: 'The information about the design and the general characteristics of the installation must be made available to the person carrying out the verification; without it there is nothing to verify the work against. Recording a limitation is the tempting answer because limitations are normal on a condition report, but they have no place in initial verification, where missing information is obtained rather than excused.',
    section: '2.2',
    difficulty: 'basic',
  },
  {
    id: 266,
    question: 'The senses used by an inspector when inspecting an installation are:',
    options: [
      'smell and taste, plus a torch and mirror',
      'sight and hearing only, for safety',
      'sight and taste, as taught in training',
      'sight, hearing, smell and touch',
    ],
    correctAnswer: 3,
    explanation: 'Four senses are used: sight for damage and identification, hearing for arcing or humming, smell for overheating insulation, and touch, used with care, for unexpected warmth. Taste is never used on an electrical installation for obvious reasons.',
    section: '3.2',
    difficulty: 'basic',
  },
  {
    id: 267,
    question: 'An inspector should not rely on touch to check a suspect connection because:',
    options: [
      'the part may be live or hot enough to cause injury',
      'skin resistance masks a high resistance joint',
      'gloves stop any temperature being sensed',
      'touch is used on protective conductors',
    ],
    correctAnswer: 0,
    explanation: 'Touch tells you very little and can hurt you: a suspect terminal may still be live, or hot enough to burn. It is used sparingly, on isolated equipment, and only as a prompt to investigate further. The skin resistance answer sounds technical but confuses the human body with the circuit being measured.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 268,
    question: 'While inspecting a distribution board an electrician notices a faint smell of hot plastic and a slight buzz from one way. The correct next step is to:',
    options: [
      'record it as a satisfactory item and carry on with the inspection',
      'isolate and investigate that way for a loose termination',
      'measure insulation resistance on that circuit live',
      'note it and return at the next inspection date',
    ],
    correctAnswer: 1,
    explanation: 'Smell and hearing have both flagged the same outgoing way, which points to a loose or overheating termination. That is a live danger and must be isolated and investigated now. Deferring it to the next inspection is the tempting answer because the fault is not yet visible, but a hot joint gets worse, not better.',
    section: '3.2',
    difficulty: 'basic',
  },
  {
    id: 269,
    question: 'During inspection, hearing is most useful for detecting:',
    options: [
      'insulation resistance falling below the minimum figure',
      'a break in the protective conductor of a lighting circuit',
      'arcing or humming at a loose or overloaded connection',
      'incorrect polarity at a bayonet lampholder',
    ],
    correctAnswer: 2,
    explanation: 'Arcing crackles and a loose or heavily loaded joint hums, so hearing gives an early warning of a connection going bad. A broken protective conductor makes no sound at all, which is exactly why continuity has to be tested rather than inspected.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 270,
    question: 'During inspection, the sense of smell most commonly warns the inspector of:',
    options: [
      'cables run outside the safe zones',
      'an undersized main bonding conductor',
      'a missing notice at the earth electrode',
      'overheating insulation or a burning termination',
    ],
    correctAnswer: 3,
    explanation: 'Overheated PVC has a distinctive smell that carries well beyond the point of the fault, so smell often finds a problem before anything is visible. The bonding conductor answer is a real defect, but it is found by looking at the conductor and measuring it, not by smelling it.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 271,
    question: 'An inspector runs a gloved hand along a length of trunking and finds one section noticeably warmer than the rest. The most useful conclusion is that:',
    options: [
      'the loading or terminations in that section need investigating',
      'the supply voltage there is higher than it is at the origin',
      'the circuit protective conductor has broken in that run',
      'the cables have been derated for grouping and are fine',
    ],
    correctAnswer: 0,
    explanation: 'Localised heat means localised power being dissipated, which points either to heavier loading in that run or to a poor joint inside it. Both need investigating. The voltage answer is wrong because voltage does not rise along a run, it falls, and a broken protective conductor carries no current in normal service so it generates no heat.',
    section: '3.2',
    difficulty: 'basic',
  },
  {
    id: 272,
    question: 'Sight, hearing, smell and touch each have limits during inspection. The main reason inspection alone cannot confirm an installation is safe is that:',
    options: [
      'the human senses cannot be calibrated, not against any national standard value',
      'many defects, such as a broken protective conductor, are not visible',
      'BS 7671 does not permit inspection alone, without a second person present',
      'inspection is carried out only on periodic reports, never on new work',
    ],
    correctAnswer: 1,
    explanation: 'Continuity, insulation resistance, polarity behind an accessory and loop impedance all produce no smell, sound or visible sign, so they can only be established by measurement. That is precisely why verification is inspection and testing together rather than either on its own.',
    section: '3.2',
    difficulty: 'basic',
  },
  {
    id: 273,
    question: 'The instrument used to measure the resistance of a protective conductor is a:',
    options: [
      'earth loop impedance tester',
      'insulation resistance tester',
      'low resistance ohmmeter',
      'phase rotation meter',
    ],
    correctAnswer: 2,
    explanation: 'Protective conductor resistances are fractions of an ohm, so the instrument must resolve to hundredths of an ohm and drive enough current to find a poor joint. An insulation resistance tester is the tempting wrong choice because it also measures resistance, but it works at the megohm end of the scale and would simply read zero.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 274,
    question: 'The instrument used to confirm the direction of rotation on a three-phase supply is a:',
    options: [
      'insulation resistance tester',
      'low resistance continuity meter',
      'clamp-type earth electrode tester',
      'phase sequence indicator',
    ],
    correctAnswer: 3,
    explanation: 'Only a phase sequence indicator shows the order in which the three lines reach their peak, which is what determines which way a motor turns. None of the other instruments can distinguish one line from another in time.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 275,
    question: 'An earth fault loop impedance test is to be made on a circuit protected by a 30 mA residual current device. The instrument should be set to:',
    options: [
      'a no-trip or low current loop test range',
      'the 500 V insulation resistance range',
      'the high current loop test range',
      'a 200 ohm continuity test range',
    ],
    correctAnswer: 0,
    explanation: 'A standard loop test injects enough current to operate a 30 mA device, so the no-trip range is used, which applies a much smaller current over a longer period. Selecting the high current range is the classic mistake and simply trips the device, leaving the circuit dead and the reading unobtained.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 276,
    question: 'A continuity tester is to be used on a circuit whose resistance is expected to be below one ohm. The correct instrument feature is:',
    options: [
      'a resolution of 1 ohm with the leads nulled out',
      'a resolution of 0.01 ohm with lead nulling',
      'a 500 V output with a 1 megohm range',
      'a 250 V d.c. output with lead nulling',
    ],
    correctAnswer: 1,
    explanation: 'A reading of a few hundredths of an ohm is useless if the instrument only resolves to whole ohms, and the resistance of the leads themselves is a significant part of the total, so it must be nulled out first. Resolution of 1 ohm is the tempting answer because the instrument would still give a number, but that number could not distinguish a good conductor from a poor one.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 277,
    question: 'A 400 V three-phase submain is to be insulation resistance tested. The instrument setting required is:',
    options: [
      '1000 V d.c., accepting no less than 1.0 megohm',
      '250 V d.c., accepting no less than half a megohm',
      '500 V d.c., accepting no less than 1.0 megohm',
      '500 V a.c., accepting no less than 1 megohm',
    ],
    correctAnswer: 2,
    explanation: 'For a circuit with a nominal voltage up to and including 500 V, other than SELV or PELV, the test is made at 500 V d.c. and the minimum acceptable value is 1.0 megohm. The 250 V setting belongs to SELV and PELV circuits, and 1000 V applies only above 500 V, so choosing either would apply the wrong stress and the wrong pass mark.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 278,
    question: 'An electrician needs to measure the resistance of a single earth electrode at a TT installation to the highest accuracy available. The correct choice is:',
    options: [
      'an insulation resistance tester at 250 V',
      'a clamp-type stakeless tester',
      'a loop impedance tester at the electrode',
      'a fall-of-potential tester with auxiliary spikes',
    ],
    correctAnswer: 3,
    explanation: 'The fall-of-potential method, using a dedicated three or four terminal instrument with auxiliary spikes driven into the ground, is the most accurate of the recognised methods. A clamp-type tester is quicker and needs no spikes, which makes it tempting, but it cannot measure a single electrode unless at least one other earth is connected in parallel with it.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 279,
    question: 'Polarity is verified so that:',
    options: [
      'protective and switching devices are in the line conductor',
      'the insulation resistance of the circuit is not reduced',
      'the earth fault loop impedance stays in limit',
      'conductors are correctly sized for the load',
    ],
    correctAnswer: 0,
    explanation: 'Polarity checks confirm that every fuse and single-pole device sits in the line conductor, so that operating it actually makes the equipment safe to touch. Loop impedance is a separate matter of how quickly a fault disconnects, and it can be perfectly acceptable on a circuit with reversed polarity.',
    section: '5.6',
    difficulty: 'basic',
  },
  {
    id: 280,
    question: 'If a single-pole switch on a lighting circuit is connected in the neutral conductor, the effect is that:',
    options: [
      'the lamp will not light up when the switch is closed',
      'the lampholder stays live when the switch is off',
      'the protective device will trip on closing',
      'the insulation resistance falls below 1 megohm',
    ],
    correctAnswer: 1,
    explanation: 'The lamp still switches on and off normally, which is what makes this fault so dangerous: everything appears to work while the lampholder remains connected to the line conductor with the switch open. Expecting the lamp not to light is the natural guess, but breaking the neutral interrupts the circuit just as effectively as breaking the line.',
    section: '5.6',
    difficulty: 'intermediate',
  },
  {
    id: 281,
    question: 'A bayonet lampholder in a circuit with an earthed neutral is found with the outer contact connected to the line conductor. This matters because:',
    options: [
      'the protective conductor carries the full load current',
      'the lamp will operate at a noticeably reduced light output',
      'the outer contact can be touched when changing a lamp',
      'the residual current device will not reset',
    ],
    correctAnswer: 2,
    explanation: 'In a circuit with an earthed neutral, the outer or screwed contact must go to the neutral, because that is the contact a person\'s fingers reach as a lamp is fitted or removed. The lamp itself is indifferent to which way round it is connected, so nothing about its brightness would reveal the fault.',
    section: '5.6',
    difficulty: 'intermediate',
  },
  {
    id: 282,
    question: 'Polarity of the supply at the origin is confirmed by proving that:',
    options: [
      'the meter tails are the same length as one another at the cut-out',
      'the neutral and the earthing conductor are joined at the origin',
      'the main switch disconnects the protective conductor as well',
      'the line terminal is live with respect to neutral and earth',
    ],
    correctAnswer: 3,
    explanation: 'At the origin the check is simply that the conductor marked line is the live one, measured against both neutral and earth. The answer about disconnecting the protective conductor describes something a main switch must never do, so it can be ruled out immediately.',
    section: '6.1',
    difficulty: 'basic',
  },
  {
    id: 283,
    question: 'Polarity of the incoming supply must be confirmed before any other live test because:',
    options: [
      'later live tests assume the line conductor is correctly placed',
      'the loop impedance tester cannot null its leads without it',
      'the distributor requires this before energising the service',
      'insulation resistance cannot be measured before it',
    ],
    correctAnswer: 0,
    explanation: 'Loop impedance and residual current device tests all connect between what the instrument believes is the line conductor and earth. If the supply polarity is reversed, every one of those readings is taken from the wrong point and cannot be trusted. Insulation resistance is a dead test, so it is finished long before this stage.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 284,
    question: 'At a TT installation the electrician measures 230 V between line and neutral, 230 V between line and earth and close to 0 V between neutral and earth. These readings show that:',
    options: [
      'the line and neutral conductors have been transposed at the origin',
      'supply polarity is correct at the origin of the installation',
      'the earth electrode connection is open circuit at the rod',
      'the installation is being fed from a TN-S supply',
    ],
    correctAnswer: 1,
    explanation: 'The line conductor sits at 230 V above both neutral and earth while neutral and earth sit close together, which is exactly the pattern expected when polarity is correct. Reading transposition into these figures is the tempting error, but if line and neutral were swapped the 230 V would appear between the neutral terminal and earth instead.',
    section: '6.1',
    difficulty: 'intermediate',
  },
  {
    id: 285,
    question: 'Prospective fault current at the origin must be determined so that:',
    options: [
      'the disconnection time can be read straight from Table 41.1',
      'the design current of each of the final circuits can be selected',
      'the protective devices can break the fault current safely',
      'the insulation resistance can be compared to Table 64',
    ],
    correctAnswer: 2,
    explanation: 'Every protective device has a rated short-circuit capacity, and the fault current available where it is installed must not exceed it, or the device could fail destructively while trying to clear a fault. Disconnection time is a separate question answered by loop impedance and the device characteristic, not by the fault current at the origin.',
    section: '6.5',
    difficulty: 'basic',
  },
  {
    id: 286,
    question: 'On a single-phase supply, the prospective fault current recorded at the origin is:',
    options: [
      'the average of the line-neutral and the line-earth readings',
      'the sum of the line-neutral and the line-earth readings',
      'the lower of the line-neutral and the line-earth readings',
      'the greater of the line-neutral and line-earth values',
    ],
    correctAnswer: 3,
    explanation: 'Both measurements are made and the higher one is recorded, because the device has to cope with the worst fault it might see. Taking the lower value is the tempting error and would understate the duty on the device, which is the one direction in which it is unsafe to be wrong.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 287,
    question: 'A prospective fault current test at the origin of a three-phase supply gives 6 kA between line and neutral. Where the instrument cannot measure between lines, the three-phase value is taken as approximately:',
    options: [
      '12 kA, twice the line to neutral measured value',
      '6 kA, the same as the line to neutral value',
      '3.5 kA, the value divided by root three',
      '18 kA, three times the measured value',
    ],
    correctAnswer: 0,
    explanation: 'Where a line to line measurement cannot be made, the accepted rule of thumb is that the balanced three-phase fault level is about twice the single-phase value, which errs on the safe side. Dividing by root three is the tempting error because that factor does appear in three-phase work, but it reduces the figure and would leave the devices under-rated.',
    section: '6.5',
    difficulty: 'intermediate',
  },
  {
    id: 288,
    question: 'An installation has a prospective fault current of 16 kA at the origin. The consumer unit is fitted with circuit-breakers having a rated short-circuit capacity of 6 kA. The arrangement is acceptable only where:',
    options: [
      'the circuit-breakers are replaced on a five year maintenance cycle',
      'backup protection from an upstream device is proven adequate',
      'an RCD of 30 mA is fitted upstream of the whole board',
      'the measured earth fault loop impedance is below 0.35 ohm',
    ],
    correctAnswer: 1,
    explanation: 'A device may be used below the prospective fault current at its point of installation where an upstream device limits the energy let through to a level the downstream device can withstand, and that combination is verified from the manufacturer\'s data. Adding a residual current device does nothing here, because a residual current device does not detect or limit a line to neutral short circuit.',
    section: '6.5',
    difficulty: 'advanced',
  },
  {
    id: 289,
    question: 'Where the prospective fault current cannot be measured, it may be:',
    options: [
      'recorded as the rating of the main switch that is fitted',
      'left blank on the schedule with an explanatory note added',
      'calculated or obtained from the distributor\'s figure',
      'taken as the breaking capacity of the devices',
    ],
    correctAnswer: 2,
    explanation: 'The value has to be established one way or another, either by calculation from the supply characteristics or by enquiry of the distributor. Taking the breaking capacity of the devices as the answer reverses the logic entirely: the fault current decides whether the devices are suitable, so it cannot be derived from them.',
    section: '6.6',
    difficulty: 'basic',
  },
  {
    id: 290,
    question: 'Enquiry of the distributor is used to establish prospective fault current where:',
    options: [
      'the instrument test leads do not fully comply with GS 38',
      'the installation is fed from a TT earthing arrangement',
      'the main switch is rated at more than 100 amperes at origin',
      'measurement at the origin is impracticable or unsafe',
    ],
    correctAnswer: 3,
    explanation: 'Enquiry is the fallback when a direct measurement cannot practicably or safely be made, for example on a large supply where the test itself would be hazardous. Non-compliant leads are the tempting answer, but the remedy there is to obtain proper leads, not to stop measuring.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 291,
    question: 'An installation includes a solar inverter that remains connected during testing. The fault current instrument may give a false reading, so the correct approach is to:',
    options: [
      'use an alternative method of determining the fault current',
      'test with the inverter running to add its contribution',
      'record the inverter output current as the fault current',
      'leave the value blank and note the inverter',
    ],
    correctAnswer: 0,
    explanation: 'Power converting equipment inside the installation can distort what the instrument sees, so an alternative method of determining the fault current and loop impedance is used instead. Recording the inverter output current is the tempting shortcut, but normal running current and prospective fault current are entirely different quantities.',
    section: '6.6',
    difficulty: 'intermediate',
  },
  {
    id: 292,
    question: 'A distributor declares a maximum prospective fault current of 16 kA at the cut-out. The electrician measures 3.2 kA at the origin. For selecting protective devices the value used should be:',
    options: [
      '3.2 kA, because measurement always beats a declaration',
      '16 kA, because the declared maximum can occur later',
      '9.6 kA, the mean of the two available values',
      '3.2 kA, provided the reading is repeated',
    ],
    correctAnswer: 1,
    explanation: 'A site measurement captures the network as it stands on that day. The distributor may reinforce the supply or reconfigure the network later, and the declared maximum covers those conditions, so devices are selected against it. Trusting the measured figure feels right because it is real data, but it is only a snapshot.',
    section: '6.6',
    difficulty: 'advanced',
  },
  {
    id: 293,
    question: 'Phase sequence is verified on a three-phase installation because:',
    options: [
      'the insulation resistance of the submain would be much reduced',
      'the neutral current would otherwise exceed the line currents',
      'motors and other rotating machines must turn the right way',
      'the prospective fault current would rise too high',
    ],
    correctAnswer: 2,
    explanation: 'The order in which the three lines peak decides which way a three-phase motor turns, so sequence has to be confirmed wherever direction matters. Sequence has no bearing on insulation resistance, which is a property of the cable rather than of the supply.',
    section: '6.9',
    difficulty: 'basic',
  },
  {
    id: 294,
    question: 'Reversed phase sequence supplied to a three-phase pump would result in:',
    options: [
      'the pump drawing no current at all when it is started',
      'the pump overheating and then tripping on overload',
      'the pump starting slowly and then reaching full speed',
      'the pump running backwards and moving no liquid',
    ],
    correctAnswer: 3,
    explanation: 'The motor runs perfectly happily, simply in the opposite direction, so the pump turns backwards and delivers nothing. The overload answer is tempting because the outcome is clearly wrong, but the motor itself is not stressed and may never trip, which is why the fault can go unnoticed.',
    section: '6.9',
    difficulty: 'intermediate',
  },
  {
    id: 295,
    question: 'Two supplies are to feed the same three-phase board through a changeover panel. Phase sequence must be verified on both because:',
    options: [
      'a mismatch would damage connected motors on changeover',
      'a mismatch would raise the earth loop impedance',
      'a mismatch would lower the insulation resistance',
      'a mismatch would stop the main switch closing',
    ],
    correctAnswer: 0,
    explanation: 'If the two sources have opposite sequence, every motor on the board reverses the instant the changeover operates, which can wreck driven machinery and injure anyone near it. Nothing about the main switch would prevent the changeover, which is exactly why the check has to be made deliberately beforehand.',
    section: '6.9',
    difficulty: 'intermediate',
  },
  {
    id: 296,
    question: 'Phase sequence is verified using:',
    options: [
      'a low resistance ohmmeter across each pair of the lines',
      'a phase rotation instrument at the point of supply',
      'an insulation resistance tester at 500 V d.c.',
      'an earth loop impedance tester on each line',
    ],
    correctAnswer: 1,
    explanation: 'A phase rotation instrument compares the timing of the three lines and indicates the sequence directly. Measuring between pairs of lines with an ohmmeter or a loop tester gives numbers that are identical whichever way round the sequence runs, so those instruments cannot answer the question.',
    section: '6.10',
    difficulty: 'basic',
  },
  {
    id: 297,
    question: 'A phase rotation instrument is being used at a three-phase board. To obtain a valid indication the electrician must:',
    options: [
      'connect both leads across the same pair of line conductors',
      'connect one lead to the neutral and one to each line',
      'connect to all three lines in the marked lead order',
      'connect one lead to earth and one to line one',
    ],
    correctAnswer: 2,
    explanation: 'The instrument compares all three lines against each other, so all three must be connected and the leads must follow the markings, or the displayed sequence will simply reflect how the leads were put on. Using the neutral as a reference is the tempting error, but sequence is a relationship between the lines and the neutral plays no part in it.',
    section: '6.10',
    difficulty: 'intermediate',
  },
  {
    id: 298,
    question: 'A phase rotation instrument shows the correct sequence at the main switch but the reverse sequence at a submain board. This indicates that:',
    options: [
      'the submain has been run in single core cables inside steel trunking',
      'the submain neutral has been left disconnected at one end',
      'the submain protective conductor is too small in cross-section',
      'two line conductors have been transposed in the submain',
    ],
    correctAnswer: 3,
    explanation: 'Swapping any two of the three line conductors reverses the sequence, so a sequence that changes between two points locates the transposition to the run between them. A disconnected neutral would cause serious voltage problems on single-phase loads but would leave the sequence of the three lines unchanged.',
    section: '6.10',
    difficulty: 'intermediate',
  },
  {
    id: 299,
    question: 'Functional testing at the end of an installation includes operating:',
    options: [
      'the main switch, circuit-breakers and any RCDs',
      'the insulation tester, circuit by circuit',
      'the loop tester, socket-outlet by socket-outlet',
      'the phase rotation indicator, at each board on site',
    ],
    correctAnswer: 0,
    explanation: 'Functional testing means physically operating the assembled equipment to prove it works: the main switch, each circuit-breaker and every residual current device, including its integral test button. The instrument answers describe measurements, which are a separate part of verification.',
    section: '6.11',
    difficulty: 'basic',
  },
  {
    id: 300,
    question: 'The integral test button on an RCD is operated during verification to prove:',
    options: [
      'the operating time of the device meets the stated time limit',
      'the mechanical tripping mechanism of the device works',
      'the residual operating current matches its rating',
      'the earth loop impedance is inside the limit',
    ],
    correctAnswer: 1,
    explanation: 'The button applies an internal test current and shows that the mechanism releases, which is a functional check of the device itself. It gives no timing and no measured current, so it cannot replace the instrument test; assuming it proves the operating time is the common and important mistake.',
    section: '6.11',
    difficulty: 'intermediate',
  },
  {
    id: 301,
    question: 'A control panel contains interlocked contactors, an emergency stop and a motor starter. Functional testing must confirm that:',
    options: [
      'each device is rated above the prospective fault current',
      'each device has an insulation resistance above 1 megohm',
      'each device operates as the designer intended it to',
      'each device carries a label giving its rating',
    ],
    correctAnswer: 2,
    explanation: 'Functional testing proves the assembly behaves as designed, including that the interlocks prevent the wrong combination and that the emergency stop actually removes power. The insulation resistance answer is a genuine test but belongs to the dead testing stage and says nothing about whether the control logic works.',
    section: '6.11',
    difficulty: 'basic',
  },
  {
    id: 302,
    question: 'When handing over a completed installation, the electrician should give the client:',
    options: [
      'a copy of BS 7671, together with the manufacturers\' catalogue',
      'a verbal summary, together with the final invoice for the work',
      'the calibration certificate, for the test instrument that was used',
      'the certificate, schedules and any operating instructions',
    ],
    correctAnswer: 3,
    explanation: 'The client receives the certificate with its schedules of inspection, circuit details and test results, together with the instructions needed to operate and maintain the equipment. A verbal summary leaves the client with nothing they can produce later for an insurer, a landlord or the next electrician.',
    section: '6.13',
    difficulty: 'basic',
  },
  {
    id: 303,
    question: 'A client asks the electrician to leave one circuit untested so the premises can open on time. The correct response is to:',
    options: [
      'explain that the certificate cannot be issued without it',
      'test it later and backdate the schedule to today',
      'record the circuit as satisfactory and revisit later',
      'issue the certificate with that line left blank',
    ],
    correctAnswer: 0,
    explanation: 'A certificate declares that the work has been inspected and tested, so it cannot be issued while a circuit remains untested. Leaving the line blank is the tempting compromise because it looks honest, but the certificate still carries a signed declaration covering the whole extent of the work described on it.',
    section: '6.13',
    difficulty: 'intermediate',
  },
  {
    id: 304,
    question: 'During commissioning an electrician finds a dangerous condition in an existing part of the installation, outside the contracted work. The correct action is to:',
    options: [
      'leave it alone because it falls outside the agreed contract',
      'make it safe if possible and tell the client in writing',
      'repair it at once and add the cost to the invoice',
      'note it on the certificate and continue the work',
    ],
    correctAnswer: 1,
    explanation: 'A danger found in the course of the work must be made safe where that is possible and must be reported to the client in writing so there is a record that they were told. Leaving it because of the contract boundary is the tempting answer, but the duty not to leave people in danger does not stop at the edge of a quotation.',
    section: '6.13',
    difficulty: 'basic',
  },
  {
    id: 305,
    question: 'The purpose of an Electrical Installation Certificate is to record that:',
    options: [
      'the installer holds a current qualification, covering inspection work',
      'the client has paid in full, for all of the work that was done',
      'the work has been designed, built and verified to BS 7671',
      'the distributor has agreed to energise the supply, and has done so',
    ],
    correctAnswer: 2,
    explanation: 'The certificate is a signed declaration covering design, construction and verification, backed by the schedules that show what was inspected and what was measured. It says nothing about payment, and a person\'s qualifications are evidenced separately rather than through the certificate.',
    section: '7.1',
    difficulty: 'basic',
  },
  {
    id: 306,
    question: 'Certification protects the client because it provides:',
    options: [
      'a discount on the next condition report',
      'a guarantee that no fault can develop',
      'an insurance policy covering future damage',
      'a dated record of the condition of the work at handover',
    ],
    correctAnswer: 3,
    explanation: 'The value of the certificate is that it fixes in writing what was found and measured on a particular date, which gives a baseline for anyone working on the installation later. Reading it as a guarantee against future faults is the common misunderstanding: an installation deteriorates in use, which is why periodic inspection exists.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 307,
    question: 'An electrician is asked to certify an installation designed and built by someone else, having only carried out the testing. The correct approach is to:',
    options: [
      'sign only for the verification part of the certificate',
      'sign all three parts, as the tester takes the work on',
      'refuse and issue a condition report instead',
      'sign for design and verification, not construction',
    ],
    correctAnswer: 0,
    explanation: 'The certificate has separate declarations for design, construction and verification precisely so that different people can take responsibility for the parts they actually did. Signing all three would make the tester answerable for decisions they never made and work they never carried out.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 308,
    question: 'The Electrical Installation Certificate is issued to:',
    options: [
      'the local building control body',
      'the person ordering the work',
      'the electricity distributor',
      'the board manufacturer',
    ],
    correctAnswer: 1,
    explanation: 'The certificate goes to the person who ordered the work, together with the records that accompany it. Copies may reach other bodies for their own purposes, but the standard identifies the person ordering the work as the recipient.',
    section: '7.1',
    difficulty: 'basic',
  },
  {
    id: 309,
    question: 'A certificate for a new installation may only be issued once:',
    options: [
      'the first periodic inspection date has been agreed on',
      'the client has signed to accept all of the completed work',
      'every defect found during testing has been corrected',
      'the distributor has connected the incoming supply',
    ],
    correctAnswer: 2,
    explanation: 'For a new installation, any defect or omission revealed during inspection and testing must be put right before the certificate is issued, so there is no such thing as a provisional certificate. Agreeing the next inspection date is a requirement of what goes on the certificate, not a condition that has to be met before issuing it.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 310,
    question: 'A consumer unit has been replaced in a dwelling and no new circuit was added. The correct certification is:',
    options: [
      'a Minor Works Certificate for every one of the altered circuits',
      'a Minor Electrical Installation Works Certificate instead',
      'an Electrical Installation Condition Report on its own',
      'an Electrical Installation Certificate for the work',
    ],
    correctAnswer: 3,
    explanation: 'Replacing a distribution board or consumer unit takes the work outside the scope of the minor works certificate, so a full Electrical Installation Certificate is required. Reaching for the minor works form is the natural mistake because no new circuit was created, but the board replacement alone is enough to rule it out.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 311,
    question: 'Two socket-outlets are added to an existing ring final circuit in a dwelling. No new circuit is created and no board is replaced. Certification may be by:',
    options: [
      'a Minor Works Certificate for the altered circuit',
      'an Electrical Installation Condition Report',
      'a note in the site diary signed by both',
      'an entry on the original certificate',
    ],
    correctAnswer: 0,
    explanation: 'Where the work adds to or alters an existing circuit without providing a new circuit or replacing a board, a minor works certificate may be issued for each circuit altered. A condition report is the wrong document because it reports on the state of an existing installation rather than certifying new work.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 312,
    question: 'On an Electrical Installation Certificate for a new installation, signatures are required for:',
    options: [
      'design and construction, but not for the testing',
      'design, construction and inspection and testing',
      'inspection and testing only, signed by the client\'s agent',
      'construction and testing, not design',
    ],
    correctAnswer: 1,
    explanation: 'Three responsibilities are declared and signed for: design, construction, and inspection and testing. All three may be signed by the same person where one person did all three, but none of them can simply be left off.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 313,
    question: 'Where one person is responsible for design, construction and verification of the work, the certificate:',
    options: [
      'must be issued by the certification body on his behalf',
      'must also be countersigned by a second competent person',
      'may carry that person\'s signature in all three places',
      'may carry one signature, with no date required',
    ],
    correctAnswer: 2,
    explanation: 'Nothing prevents one competent person taking all three responsibilities and signing accordingly. There is no requirement for a countersignature, and the date is required in every case because the certificate records the condition of the work on a particular day.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 314,
    question: 'A designer specifies a circuit, an electrician installs it and a third person tests it. If the cable installed is found to be smaller than the size the designer specified, responsibility for that error rests with:',
    options: [
      'the client who ordered and paid for the whole of the job',
      'the person who signed the verification part of the form',
      'the person who signed the design declaration on its own',
      'the person who signed the construction declaration',
    ],
    correctAnswer: 3,
    explanation: 'The design was correct, so the error was introduced when the work was built, and the construction declaration covers building the installation in accordance with that design. The verification signature is tempting because the inspector should have caught it, but failing to detect an error is a separate shortcoming from having created it.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 315,
    question: 'An inspector carrying out verification signs the certificate for inspection and testing only. By doing so the inspector accepts responsibility for:',
    options: [
      'the accuracy of the results and the tests carried out',
      'the choice of cable sizes used across the works',
      'the workmanship of every termination made',
      'the selection of the protective devices used',
    ],
    correctAnswer: 0,
    explanation: 'Signing the verification declaration means standing behind the inspection performed and the readings recorded. Cable sizes and device selection belong to the design declaration, and how well the terminations were made belongs to construction, each signed for by whoever took that responsibility.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 316,
    question: 'The original Electrical Installation Certificate should be:',
    options: [
      'retained by the electrician who signed it',
      'given to the person ordering the work',
      'sent on to the electricity distributor',
      'filed with the local building control body',
    ],
    correctAnswer: 1,
    explanation: 'The original goes to the person who ordered the work, so that it stays with the installation and can be handed on. The electrician keeps a duplicate, which is why retaining the original instead is the wrong way round.',
    section: '7.5',
    difficulty: 'basic',
  },
  {
    id: 317,
    question: 'A duplicate of the certificate and its schedules should be:',
    options: [
      'posted to the manufacturer of the consumer unit',
      'destroyed once the client has confirmed receipt',
      'kept by the person issuing the certificate',
      'fixed to the inside of the board door',
    ],
    correctAnswer: 2,
    explanation: 'The issuer keeps a duplicate as their own record of what was done and measured. Destroying it once the client has the original is the tempting tidy answer, but it leaves the electrician with no evidence if the work is questioned years later.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 318,
    question: 'An electrician is asked to work on an installation certified eight years ago. The value of retaining the earlier certificate and schedules is that they:',
    options: [
      'set the date the next condition report falls due',
      'remove the need to test the altered circuits',
      'prove the installation still complies today',
      'give a baseline of results to compare new readings with',
    ],
    correctAnswer: 3,
    explanation: 'Old results let the electrician see whether a value has drifted, which turns a single reading into a trend and can expose a deteriorating connection long before it fails. They prove nothing about the installation\'s condition today, because eight years of use, alteration and damage sit between the two dates.',
    section: '7.5',
    difficulty: 'basic',
  },
  {
    id: 319,
    question: 'A fault found during the insulation resistance test is corrected. The continuity results already recorded on that circuit must be:',
    options: [
      'repeated, because the fault may have affected them',
      'accepted, because continuity was tested first',
      'averaged with the new readings, then recorded as one figure',
      'recorded as they stand, with a note added',
    ],
    correctAnswer: 0,
    explanation: 'A fault discovered by any test can make earlier results on the same circuit unreliable, so tests that may have been influenced are repeated after the repair. Accepting the earlier readings because they came first is the tempting shortcut, but the sequence exists to catch faults, not to protect results taken before one was found.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 320,
    question: 'Before a multi-function instrument is used on site, the electrician should check that:',
    options: [
      'the internal battery has been replaced within the year',
      'leads and probes are sound and calibration is in date',
      'the instrument has a current PAT test label fitted to it',
      'the case has been cleaned since it was last used',
    ],
    correctAnswer: 1,
    explanation: 'The pre-use check covers the condition of the leads and probes, which are the part that touches live conductors, and confirmation that the instrument is still within its calibration period. A battery that works is enough; there is no requirement to replace a serviceable one on a calendar.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 321,
    question: 'The measured Zs of a circuit is compared with the tabulated maximum. The tabulated value assumes the conductors are:',
    options: [
      'at zero degrees, the worst case for resistance values',
      'at the ambient temperature of the site on the day of test',
      'at their normal operating temperature under load',
      'at the temperature written on the schedule',
    ],
    correctAnswer: 2,
    explanation: 'Tabulated maximum values are set for conductors at their operating temperature, when resistance is at its highest and disconnection is slowest. A site measurement is normally taken on cold conductors, so it reads lower than the value the table is written for, which is why the measured figure must be corrected or judged against a reduced limit.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 322,
    question: 'Insulation resistance on a lighting circuit measures 0.4 megohm at 500 V d.c. with all lamps removed. The electrician must:',
    options: [
      'energise the circuit and then retest it again while under load',
      'record the value, since it is above the 0.25 megohm minimum',
      'repeat the test at 250 V d.c. and record that result instead',
      'find and correct the fault before energising the circuit',
    ],
    correctAnswer: 3,
    explanation: 'The minimum acceptable value for a 230 V circuit tested at 500 V d.c. is 1.0 megohm, so 0.4 megohm is a fail and points to a real defect such as a damaged cable or a trapped conductor. Dropping to 250 V is the tempting way to make the number look better, but that test voltage belongs to SELV and PELV circuits and would simply hide the fault.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 323,
    question: 'A 30 mA residual current device gives an operating time of 340 milliseconds at its rated residual operating current. The electrician should:',
    options: [
      'replace the device, as it exceeds the permitted time',
      'accept it, as any time under half a second is fine',
      'retest it, once the circuit has been loaded up',
      'record it, and code it on a condition report',
    ],
    correctAnswer: 0,
    explanation: 'A general, non-delay device is deemed verified where it disconnects within 300 milliseconds at its rated residual operating current, so 340 milliseconds is a fail and the device must be replaced. The half second figure comes from the delay type S device, which is a different product with a different acceptance range.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 324,
    question: 'A radial circuit 40 m long is wired in 2.5 mm² line with a 1.5 mm² protective conductor. Taking the combined resistance as 19.51 milliohms per metre, the expected R1 + R2 at 20 °C is about:',
    options: [
      '0.30 ohm',
      '0.78 ohm',
      '0.078 ohm',
      '0.48 ohm',
    ],
    correctAnswer: 1,
    explanation: '40 metres at 19.51 milliohms per metre gives 0.78 ohm. The figure of 0.30 ohm comes from using the 2.5 mm² line conductor value on its own and forgetting the protective conductor, and 0.48 ohm from using the 1.5 mm² value alone; both are the same mistake, because R1 + R2 needs the two conductors added together. The value of 0.078 ohm is a decimal slip from leaving the answer in milliohms.',
    section: '5.3',
    difficulty: 'intermediate',
  },
  {
    id: 325,
    question: 'A circuit has a measured R1 + R2 of 0.62 ohm at 20 °C and a measured Ze of 0.28 ohm. Applying a temperature factor of 1.20, the calculated Zs is about:',
    options: [
      '1.08 ohm',
      '0.90 ohm',
      '1.02 ohm',
      '0.744 ohm',
    ],
    correctAnswer: 2,
    explanation: 'Only the conductors inside the installation warm up, so the factor is applied to R1 + R2 alone: 0.62 multiplied by 1.20 gives 0.744, then adding Ze of 0.28 gives 1.02 ohm. The value of 1.08 ohm comes from applying the factor to the whole loop including Ze, which wrongly assumes the distributor\'s network heats up with the circuit, and 0.744 ohm is the corrected circuit resistance with Ze left out altogether.',
    section: '5.3',
    difficulty: 'intermediate',
  },
  {
    id: 326,
    question: 'On a ring final circuit the end-to-end readings are r1 = 0.52 ohm and r2 = 0.86 ohm. The reading expected at each socket-outlet in the final step is about:',
    options: [
      '0.173 ohm',
      '0.69 ohm',
      '1.38 ohm',
      '0.35 ohm',
    ],
    correctAnswer: 3,
    explanation: 'With the ends cross-connected, each socket-outlet sits at the midpoint of two parallel halves, so the reading is a quarter of r1 plus r2: 1.38 divided by 4 gives 0.35 ohm. Halving instead of quartering gives 0.69 ohm and is the most common error, because it accounts for the parallel paths once rather than twice; 1.38 ohm is the uncorrected sum and 0.173 ohm comes from dividing by eight.',
    section: '5.2',
    difficulty: 'intermediate',
  },
  {
    id: 327,
    question: 'During the final step of a ring final circuit test, one socket-outlet reads 0.62 ohm while all the others read about 0.35 ohm. The most likely cause is that:',
    options: [
      'the outlet is wired as a spur off the ring',
      'the ring legs are crossed at the board',
      'the protective conductor is broken there',
      'the outlet has line and neutral swapped',
    ],
    correctAnswer: 0,
    explanation: 'A spur is fed from one direction only, so it loses the benefit of the parallel path and reads higher than the outlets on the ring itself. Crossed legs are the tempting alternative, but that fault raises the readings progressively around the whole ring rather than at a single outlet.',
    section: '5.2',
    difficulty: 'intermediate',
  },
  {
    id: 328,
    question: 'A circuit protected by a 32 A Type B circuit-breaker gives a measured Zs of 1.24 ohm at ambient temperature, against a tabulated maximum of 1.37 ohm. This reading is:',
    options: [
      'satisfactory, because it is below the tabulated maximum value',
      'unsatisfactory, as it exceeds 80 per cent of the maximum',
      'satisfactory, because the ambient reading is what applies',
      'unsatisfactory, as it exceeds half the maximum',
    ],
    correctAnswer: 1,
    explanation: 'A value measured on cold conductors is judged against 80 per cent of the tabulated maximum, which here is about 1.10 ohm, because the conductors will be hotter and their resistance higher in service. Reading 1.24 ohm as a pass simply because it is under 1.37 ohm ignores that correction and would let a circuit through that fails at operating temperature.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 329,
    question: 'A circuit is protected by a 10 A Type B circuit-breaker on a 230 V TN supply. The maximum earth fault loop impedance permitted for that device is:',
    options: [
      '14.57 ohm',
      '2.19 ohm',
      '4.37 ohm',
      '3.50 ohm',
    ],
    correctAnswer: 2,
    explanation: 'The tabulated maximum for a 10 A Type B device at 230 V is 4.37 ohm. The value of 2.19 ohm is the Type C figure for the same rating and 14.57 ohm belongs to a 3 A Type B device, so both come from reading across the wrong column or down the wrong row. The figure of 3.50 ohm is the reduced limit used when judging a reading taken on cold conductors, not the tabulated maximum itself.',
    section: '6.4',
    difficulty: 'intermediate',
  },
  {
    id: 330,
    question: 'Continuity of protective conductors is tested before insulation resistance because:',
    options: [
      'the order is set out by the layout of the schedule of results',
      'the insulation tester would be damaged by an open circuit path',
      'insulation resistance readings would rise where continuity is poor',
      'a broken protective conductor would invalidate later tests',
    ],
    correctAnswer: 3,
    explanation: 'The insulation resistance test is taken between the live conductors and the protective conductor connected to earth, so if that conductor is broken the instrument simply cannot see the part of the circuit beyond the break and returns a high, meaningless result. The sequence exists to make each test valid, not to match the order of columns on a form.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  // ============================================================
  // Advanced top-up (Q331-Q340) — multi-step verdicts, interacting
  // rules and diagnosis. Every value verified against bs7671_facets.
  // ============================================================
  {
    id: 331,
    question: 'A ring final circuit protected by a 32 A Type B circuit-breaker gives end-to-end readings of r1 = 0.80 ohm and r2 = 1.32 ohm. Ze at the origin measures 0.48 ohm. Judged on these ambient temperature figures the circuit is:',
    options: [
      'FAIL, because R1 plus R2 is the sum of the end-to-end readings, giving a Zs of 2.60 ohm',
      'PASS, because Zs works out at 1.01 ohm, inside the 1.10 ohm figure that applies to a cold reading',
      'PASS, because Zs works out at 1.01 ohm and a value taken at ambient temperature needs no correction',
      'FAIL, because Zs works out at 1.01 ohm and a ring final circuit is limited to 0.80 ohm',
    ],
    correctAnswer: 1,
    explanation: 'Two steps have to be carried through. R1 plus R2 at a socket on an intact ring is a quarter of the end-to-end values, so (0.80 + 1.32) divided by 4 gives 0.53 ohm, and adding Ze gives a Zs of 1.01 ohm. That figure is then judged not against the tabulated 1.37 ohm but against 80 per cent of it, 1.10 ohm, because the conductors were cold when measured and will be hotter in service. Adding r1 and r2 straight together is the arithmetic trap, and accepting 1.01 ohm purely because it is under 1.37 ohm is the reasoning trap, since it reaches the right verdict for the wrong reason and would pass a circuit sitting between 1.10 and 1.37 ohm.',
    section: '5.2',
    difficulty: 'advanced',
  },
  {
    id: 332,
    question: 'A 230 V lighting circuit was tested at 500 V d.c. before the LED drivers were fitted. With the drivers connected, the further test at 250 V d.c. between the live conductors joined together and the protective conductor reads 0.7 megohm. The result is:',
    options: [
      'a pass, because 0.5 megohm is the value that applies whenever 250 V d.c. is used',
      'a fail, because the test made after connection has to reach at least 1 megohm',
      'a pass, because the acceptance value falls in step with the reduced test voltage',
      'a fail, because a circuit at low voltage may never be tested at 250 V d.c.',
    ],
    correctAnswer: 1,
    explanation: 'Regulation 643.3.3 allows cables to be proved at 500 V d.c. before sensitive equipment is fitted and then re-tested at 250 V d.c. once it is connected, but it sets that second test its own acceptance value of 1 megohm. The 0.5 megohm figure that sits alongside 250 V d.c. in Table 64 belongs to SELV and PELV circuits only, so carrying it across to a 230 V circuit is the trap. The reduced test voltage protects the drivers; it does not reduce the standard the insulation has to meet.',
    section: '5.4',
    difficulty: 'advanced',
  },
  {
    id: 333,
    question: 'Ze is measured at the origin with the main earthing conductor left connected to the main earthing terminal, and a very low value is obtained. The reading should be treated as:',
    options: [
      'sound, because any parallel path present during the test is present during a fault',
      'sound, because a lower external impedance can only shorten disconnection times',
      'unsafe to rely on, because parallel paths through bonded metalwork have flattered the value',
      'unsafe to rely on, because the instrument cannot resolve values that low',
    ],
    correctAnswer: 2,
    explanation: 'Ze is the external part of the loop, and a measured Ze is only fit to be added to circuit R1 plus R2 values where the earthing and extraneous parts have been isolated so that no parallel path exists. With the earthing conductor still connected, the instrument reads the supply earth in parallel with every bonded gas, water and structural path, and returns a figure lower than the supply alone can offer. A low reading feels like the safe outcome, which is exactly why this one is dangerous: the design is then built on an impedance that disappears the day a plumber fits a plastic section.',
    section: '4.5',
    difficulty: 'advanced',
  },
  {
    id: 334,
    question: 'A main protective bonding conductor of 10 mm2 runs 25 metres to a water service, where the expected resistance is about 0.05 ohm. The continuity test reads 0.38 ohm. The electrician should:',
    options: [
      'accept it, since 0.38 ohm satisfies the 0.5 ohm maximum given for bonding conductors',
      'accept it, since 0.38 ohm is far below the resistance of the earthing conductor itself',
      'investigate the run and the clamps, since the reading is well above the 0.1 ohm guideline',
      'repeat the test on the low resistance range, since 0.38 ohm is below instrument resolution',
    ],
    correctAnswer: 2,
    explanation: 'Guidance gives 25 metres of 10 mm2 an expected resistance of roughly 0.05 ohm, and where the expected value is that small the guideline acceptance of not exceeding 0.1 ohm is used because instrument resolution becomes the limiting factor. A reading seven times the expected figure is not a resolution problem at all; it is a joint problem, and the usual culprit is a corroded or loosely made clamp at the pipe. There is no 0.5 ohm maximum for bonding conductors, and comparing the reading with the earthing conductor tells the electrician nothing about this bond.',
    section: '5.5',
    difficulty: 'advanced',
  },
  {
    id: 335,
    question: 'A distribution circuit is protected by a 32 A device, so only the 5 second disconnection time applies to it. Compared with the 0.4 second figure, the maximum Zs permitted is:',
    options: [
      'higher for both, because a longer permitted time always allows a larger earth fault loop impedance',
      'unchanged for both, because the tabulated values are derived from the 0.4 second column only',
      'higher for a Type B circuit-breaker, rising to 1.71 ohm, but unchanged at 0.99 ohm for a BS 88-2 fuse',
      'higher for a BS 88-2 fuse, rising from 0.99 ohm to 1.7 ohm, but unchanged at 1.37 ohm for a Type B device',
    ],
    correctAnswer: 3,
    explanation: 'The answer depends on which device is fitted, and that is the point. A fuse clears an earth fault on its time and current curve, so allowing it 5 seconds instead of 0.4 seconds does permit a higher impedance, and the 32 A BS 88-2 figure rises from 0.99 ohm to 1.7 ohm. A Type B circuit-breaker relies on its instantaneous magnetic trip, which either operates or does not, so the same 1.37 ohm applies to both columns and the extra time buys nothing. Assuming a longer time is always more generous is the intuitive error that this pairing exposes.',
    section: '4.4',
    difficulty: 'advanced',
  },
  {
    id: 336,
    question: 'An RCBO on an upstairs lighting circuit trips only when the downstairs lighting is switched on. Insulation resistance on the upstairs circuit alone measures over 200 megohm. The most likely cause is:',
    options: [
      'a neutral shared between the two lighting circuits so current returns outside the RCBO',
      'a shift of the star point caused by a high resistance neutral at the supply intake',
      'an undersized protective conductor on the downstairs lighting circuit',
      'a line to earth fault on the upstairs circuit that appears only when it warms up',
    ],
    correctAnswer: 0,
    explanation: 'An RCBO trips on the difference between the current leaving on its line and returning on its neutral. Where an earlier alteration has borrowed a neutral, the downstairs load current comes back through the upstairs neutral, the RCBO sees an imbalance that has nothing to do with earth leakage, and it operates the moment the other circuit is used. The insulation resistance result already rules out a leakage fault on the tripping circuit. Star point shift is a genuine mechanism but a three-phase one, and an undersized protective conductor affects loop impedance rather than residual current.',
    section: '6.9',
    difficulty: 'advanced',
  },
  {
    id: 337,
    question: 'In a location relying on insulating floors and walls at 230 V, three measurements taken on one wall give 71, 64 and 38 kilohm. The correct conclusion is:',
    options: [
      'the wall passes, because the mean of the three measurements clears the 50 kilohm minimum',
      'the wall fails, and it is deemed an extraneous-conductive-part for shock protection',
      'the wall fails, and the three measurements are repeated with a 500 V d.c. insulation tester',
      'the wall passes, because the 50 kilohm minimum applies only above 500 V nominal voltage',
    ],
    correctAnswer: 1,
    explanation: 'Where the nominal voltage does not exceed 500 V the resistance has to be not less than 50 kilohm at every point of measurement, not on average, so one reading of 38 kilohm settles it. The consequence is the part that catches people out: the surface is not simply recorded as a failure but is from then on deemed an extraneous-conductive-part for protection against electric shock, which pulls it into the bonding requirements. The 100 kilohm figure belongs above 500 V, and the measurement is made with the system voltage to earth at nominal frequency rather than with a d.c. insulation tester.',
    section: '5.4',
    difficulty: 'advanced',
  },
  {
    id: 338,
    question: 'A 30 mA RCD to BS 4293 is found on an existing installation, and its product standard specifies operating times shorter than those in BS 7671. When the device is tested, the time it must meet is:',
    options: [
      'the 300 millisecond figure in BS 7671, since the current standard governs any device in service',
      'the average of the product standard time and the BS 7671 time, since both apply to the device',
      'no stated time at all, since a device to a superseded standard is coded rather than tested',
      'the shorter time given in its own product standard',
    ],
    correctAnswer: 3,
    explanation: 'Guidance is explicit that where an RCD to BS 4293 or BS 7288 has operating times in its product standard that are shorter than those in BS 7671, the device has to meet the shorter times. The device was built and marked to that specification, and BS 7671 is not offering it a relaxation. Reaching for the familiar 300 millisecond figure is the tempting move here, and it would pass a device that its own manufacturer would have failed.',
    section: '6.8',
    difficulty: 'advanced',
  },
  {
    id: 339,
    question: 'A periodic inspection of a TT installation finds fault protection provided by a 100 mA delay type S RCD at the origin. The electrode resistance measures 620 ohm and the RCD operates in 210 milliseconds at its rated residual operating current. The observation should be:',
    options: [
      'no code, because the operating time sits inside the band required of a delay type S device',
      'C3, because an electrode above 200 ohm is an improvement matter and not a safety matter',
      'C2, because 620 ohm times 0.1 ampere gives 62 volts, over the 50 volt fault protection limit',
      'C1, because any TT electrode above 200 ohm leaves the installation dangerous while it is in use',
    ],
    correctAnswer: 2,
    explanation: 'Two criteria are in play and only one of them has been met. The 210 millisecond operating time does fall inside the 130 to 500 millisecond band that a delay type S device is judged against, so the device itself is healthy. Fault protection also requires the product of the electrode resistance and the rated residual operating current to stay within 50 volts, and 620 times 0.1 gives 62 volts, so the touch voltage during a fault is not held to a safe level. A working device on an inadequate electrode is potentially dangerous rather than merely in need of improvement, and it is not an immediate danger warranting C1.',
    section: '6.4',
    difficulty: 'advanced',
  },
  {
    id: 340,
    question: 'Verification of voltage drop appears among the tests listed in Part 6. At the initial verification of a domestic installation the correct position is that:',
    options: [
      'it is not normally required, and where it is required it may be met by calculation',
      'it must be measured on every final circuit, and the figure entered on the schedule of test results',
      'it must be measured on the longest final circuit only, and compared with the tabulated percentage',
      'it is never required, because Chapter 52 places the duty on the designer and not the verifier',
    ],
    correctAnswer: 0,
    explanation: 'Part 6 lists the verification of voltage drop, but it also notes that it is not normally required at initial verification, and where it is needed to demonstrate compliance with Chapter 52 it may be evaluated by calculation rather than by measurement. Two things are therefore true at once, which is why the extreme answers both fail: it is not a routine measurement on every circuit, and it is not something the verifier can disclaim entirely, because the inspection itself has to check that conductors were selected for voltage drop in accordance with the design.',
    section: '4.6',
    difficulty: 'advanced',
  },
];

// Helper function to get random questions for mock exams
/**
 * Draws a paper honouring the difficulty tags.
 *
 * Previously this was a flat `sort(() => Math.random() - 0.5)` slice, which
 * ignored `difficulty` entirely — the tags were decorative and a paper's
 * difficulty was pure luck — and used the broken sort-shuffle idiom, which is
 * not a uniform permutation. See src/utils/apprenticeQuestionDraw.ts.
 */
export const getRandomQuestions = (
  count: number,
  weights: DifficultyWeights = LEVEL3_WEIGHTS
): Question[] => drawWeighted(module5Questions, count, weights);

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
/**
 * Section number → readable topic. Exported because the results screen needs
 * it too: questions here carry only `section: '3.4'`, so without this the
 * "what to study next" list reads as a column of outline numbers.
 * Keyed on the LEADING segment — see getQuestionsByTopic below.
 */
export const M5_SECTION_TOPIC: Record<string, string> = {
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
