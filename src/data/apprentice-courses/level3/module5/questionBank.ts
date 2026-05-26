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
      'Scope, sequence, hazards/controls, isolation strategy, PPE, instruments, competence of personnel, emergency arrangements',
      'It is unreasonable in all the circumstances to make dead, AND it is reasonable to work live, AND suitable precautions are taken',
      'Arc-rated clothing matched to the prospective incident energy, insulated gloves rated to the working voltage, eye/face protection, and insulated footwear',
      'Finger barriers, shrouded probes exposing no more than 4mm of metal, and fused tips (typically 500mA HRC)',
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
      'Final circuits supplying socket-outlets in higher-risk residential buildings (HRRBs), care homes, student accommodation, etc. (recommendation, not absolute requirement, in non-HRRB)',
      'Type (BS EN 60898-1 MCB / BS 88-3 fuse / BS EN 61009 RCBO), rating (In), breaking capacity (Icn/Icu) suitable for Ipf, and selectivity with upstream',
      'Identify circuit, switch off, secure isolation (lock and tag), prove voltage indicator on known live source, test for absence of voltage, re-prove on known live source',
      'Connect simultaneously-accessible exposed and extraneous conductive parts AND have continuity-test resistance per Reg 415.2.2: R <= 50V/Ia',
    ],
    correctAnswer: 2,
    explanation:
      'Best Practice Guide 2 requires the prove-test-prove sequence with an approved GS38-compliant two-pole voltage indicator (NOT a multimeter) and a known live proving unit.',
    section: '1.2',
    difficulty: 'intermediate',
  },
  {
    id: 3,
    question:
      'Which test instrument is the ONLY device acceptable for proving dead during safe isolation?',
    options: [
      'Only sinusoidal AC residual currents — UNSUITABLE for circuits with electronic loads producing pulsating DC (most modern loads)',
      'Acceptable — Icn 6kA exceeds Ipf 4.2kA, satisfying Reg 432.1 breaking capacity requirement',
      '30mA RCD additional protection per Reg 753.415.1, and floor-temperature limiter to prevent damage to floor coverings',
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
      'Insulation resistance values in parallel ADD as conductances (1/RT = 1/R1 + 1/R2 + ...), so a circuit with many parallel cables shows LOWER overall IR than each individual cable',
      'Calculation from supply transformer impedance and cable parameters; OR use of DNO declared values (e.g. 16kA at typical urban supply origin)',
      'After energising, that the supply polarity (line vs neutral) is as expected and consistent with dead-test polarity verification at all accessories',
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
      'Functional check via integral test button at commissioning AND at periodic intervals (per manufacturer); operational testing of arc detection requires OEM-specific equipment',
      'L1-L2-L3 positive (clockwise) rotation using a phase rotation indicator — to ensure motors run in correct direction at first energisation',
      'Use a single-pole MCB lock-off device with a personal padlock, the only key retained by the person doing the work, plus a caution notice',
      'C2 (potentially dangerous) — bonding fails to meet Reg 544.1 cross-section, undermining fault protection in the event of a PEN failure; remedial action required',
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
      'Use a single-pole MCB lock-off device with a personal padlock, the only key retained by the person doing the work, plus a caution notice',
      'L conductor -> fault -> cpc -> MET -> separate metallic earth conductor back to source transformer star point',
      'Each apply their own personal padlock so the isolation cannot be removed until ALL workers have removed their padlocks',
      'Loss of supply to other tenants/users, loss of life-safety systems (fire alarm, emergency lighting), loss of refrigeration, loss of IT systems',
    ],
    correctAnswer: 3,
    explanation:
      '2357 AC 1.3 requires consideration of the wider implications: other personnel, customers, public, and building systems. Pre-warning, scheduling, and temporary supplies may be needed.',
    section: '1.3',
    difficulty: 'intermediate',
  },
  {
    id: 8,
    question:
      'Under the Health and Safety at Work etc Act 1974 (HASAWA), the duty to provide a safe system of work for inspection and testing rests primarily with:',
    options: [
      'The employer (with co-operation duties on the employee under s.7)',
      'About 0.59Ω (R1: 30m × 7.41mΩ = 0.222Ω; R2: 30m × 12.10mΩ = 0.363Ω; total 0.585Ω)',
      '1×IΔn only — the 5×IΔn AC test was deleted in Amendment 4:2026',
      'A new installation OR an addition/alteration that introduces a new circuit',
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
      'Insulated tools, insulating mat, GS38 leads, arc-rated PPE, a competent accompanying person, barriers, and a documented procedure',
      'Finger barriers, shrouded probes exposing no more than 4mm of metal, and fused tips (typically 500mA HRC)',
      'Annually, with interim accuracy checks (e.g. against a calibration check box) before each use',
      'Acceptable — Icn 6kA exceeds Ipf 4.2kA, satisfying Reg 432.1 breaking capacity requirement',
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
      'RCD function (1×IΔn trip time) AND MCB function (continuity, polarity, Zs to verify magnetic trip operates within disc time on L-PE faults beyond RCD coverage)',
      'About 0.79Ω (R1: 80m × 4.61mΩ = 0.369Ω; R2 of armour for 4mm² SWA ~ 5.20 mΩ/m × 80m = 0.416Ω; total ~0.785Ω)',
      'Electrical hazards, working at height, manual handling, slips/trips, lone working, occupant disruption, and emergency arrangements',
      '(R1+R2) for the ring = (r1 + r2)/4 — because the ring presents two parallel paths each containing both line and cpc series-connected, and parallel of two equal R = R/2',
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
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 — 5 years maximum',
      'Each apply their own personal padlock so the isolation cannot be removed until ALL workers have removed their padlocks',
      'Reports the condition of an EXISTING installation against current BS 7671 (with deviations recorded)',
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
      'Arc-rated clothing matched to the prospective incident energy, insulated gloves rated to the working voltage, eye/face protection, and insulated footwear',
      'Lock off the main switch with a personal padlock and post a caution notice — and prove dead at the point of work',
      'Avoids the test voltage appearing across the SPD (which is L-N or L-PE) potentially triggering or damaging it',
      'Stopped, made safe, investigated for root cause, and reported per the company H&S policy and (if a dangerous occurrence) RIDDOR',
    ],
    correctAnswer: 0,
    explanation:
      'Arc-flash PPE selection follows incident-energy assessment per IEEE 1584/Energy Networks Association guidance; gloves must be voltage-class rated and in-date.',
    section: '1.6',
    difficulty: 'advanced',
  },
  {
    id: 13,
    question:
      'A permit-to-work for HV inspection differs from a sanction-to-test in that a permit:',
    options: [
      'BS EN IEC 60900 (1000V AC / 1500V DC rated)',
      'Authorises work on equipment confirmed dead and earthed',
      'IP44 minimum (IP54/IP55 in dustier or wetter areas) per Reg 705.512.2',
      'Potentially dangerous — urgent remedial action required',
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
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 — 5 years maximum',
      'To detect faults (short circuits, mis-wiring, low IR, missing CPC) BEFORE applying voltage that could cause shock, fire, or equipment damage',
      'Lock off the main switch with a personal padlock and post a caution notice — and prove dead at the point of work',
      'Longer cable = MORE insulation surface in parallel = LOWER measured IR. Test result expected to be inversely proportional to length',
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
      'To confirm the indicator was working immediately before AND immediately after the dead test, eliminating the risk of a faulty indicator giving a false dead reading',
      'Stopped, made safe, investigated for root cause, and reported per the company H&S policy and (if a dangerous occurrence) RIDDOR',
      'TN-S: 0.8Ω; TN-C-S: 0.35Ω (these are ASSUMED maxima — actual values must be measured or confirmed from DNO)',
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
      'Loss of supply to other tenants/users, loss of life-safety systems (fire alarm, emergency lighting), loss of refrigeration, loss of IT systems',
      '6kA, 10kA, 16kA — selected to exceed measured Ipf at the point of installation per Reg 432.1',
      'Annually, with interim accuracy checks (e.g. against a calibration check box) before each use',
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
      'Loop impedance, RCD trip time at 1×IΔn, AFDD presence (Y/N) and earthing arrangement (TN-S, TN-C-S/PNB, TT)',
      'Insulated tools, insulating mat, GS38 leads, arc-rated PPE, a competent accompanying person, barriers, and a documented procedure',
      'After energising, that the supply polarity (line vs neutral) is as expected and consistent with dead-test polarity verification at all accessories',
      'That the line and CPC of the ring are continuous and unbroken — high or open readings indicate a broken conductor at one of the accessory terminations',
    ],
    correctAnswer: 1,
    explanation:
      'EAWR Reg 14(c) requires "such precautions as will prevent injury", which in practice means engineered, procedural, and PPE controls collectively.',
    section: '1.6',
    difficulty: 'advanced',
  },
  {
    id: 18,
    question:
      'When working in a domestic property with vulnerable occupants (e.g. medical equipment, elderly), pre-isolation actions include:',
    options: [
      'Identify previously coded defects, recommended improvements, and any limitations — to inform scope and expected condition',
      'Continuity test from L bus-bar at distribution board to LINE terminal of each accessory; from N bus-bar to NEUTRAL terminal; from MET to cpc terminal — proving correct identification at every termination',
      'Notify the occupant in advance, agree timings, identify life-safety equipment dependent on supply, plan temporary arrangements where required, document agreement',
      'Be CAT-rated equal to or greater than the instrument, GS38 compliant, with shroud, fused tips and clearly visible insulation integrity',
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
      'Phase rotation/sequence (L1-L2-L3 = positive/clockwise rotation) using a phase-rotation indicator, especially before energising motors and rotating machinery',
      'C2 (potentially dangerous) — bonding fails to meet Reg 544.1 cross-section, undermining fault protection in the event of a PEN failure; remedial action required',
      'Use the no-trip / 15mA / lower-current loop test mode (modern MFTs have this), accepting slightly reduced accuracy in exchange for non-tripping',
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
      'Investigate: check for loose terminations, broken cpc, damaged cable, parallel paths via metalwork — rectify before any live testing',
      'Multiplier from Appendix 9 / GN3 (typically 1.20 for 70°C thermoplastic at full load) — giving Zs = Ze + ((R1+R2) × 1.20)',
      'Equipment producing smooth DC residual current (e.g. EV chargers without separation, three-phase VSDs/inverters) per Reg 531.3.3 / 722.531.3.101',
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
      'That the requirements of BS 7671 have been met by inspection AND testing',
      'EAWR 1989 Regulation 4(2) — "as may be necessary to prevent danger"',
      'A spur, broken ring, or high-resistance joint at a socket — investigation required',
      'About 0.36-0.40Ω (50m × ~7.41mΩ/m ≈ 0.37Ω at 20°C; OSG mΩ/m table)',
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
      '0.68Ω (Zs = 0.95 × 230 / 320 = 0.683Ω)',
      '250V DC, minimum acceptable IR 0.5 MΩ',
      'BS EN IEC 60900 (1000V AC / 1500V DC rated)',
      '500V DC, with minimum acceptable IR of 1.0 MΩ',
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
      'Type (rod / plate / mat), accessibility for measurement (test link), corrosion, label per Reg 514.13.1, and a measured Ra giving compliant Zs at the furthest point',
      'Method 1 (R1+R2 — link line and cpc at distribution board, measure end-to-end at each accessory) and Method 2 (R2 only — using a long lead with one end at the MET)',
      'Re-prove dead independently using their own GS38 voltage indicator and known live proving unit',
      'Electric shock, arc flash/burn, secondary injuries from involuntary reaction, fire, falls from height, and trip hazards from leads',
    ],
    correctAnswer: 3,
    explanation:
      'A holistic hazard assessment captures all foreseeable harm, not just shock. Secondary injury from involuntary reaction is a leading cause of injury during testing.',
    section: '1.6',
    difficulty: 'basic',
  },
  {
    id: 24,
    question:
      'The minimum frequency of calibration recommended for test instruments used for certification purposes is:',
    options: [
      'Annually, with interim accuracy checks (e.g. against a calibration check box) before each use',
      'Lock off the main switch with a personal padlock and post a caution notice — and prove dead at the point of work',
      'A new installation OR an addition/alteration that introduces a new circuit',
      'About 0.59Ω (R1: 30m × 7.41mΩ = 0.222Ω; R2: 30m × 12.10mΩ = 0.363Ω; total 0.585Ω)',
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
      'Sized per Table 54.8 (TN-C-S 10mm minimum, TN-S/TT half csa of earthing conductor, with absolute minimum 6mm copper)',
      'Scope, sequence, hazards/controls, isolation strategy, PPE, instruments, competence of personnel, emergency arrangements',
      'Maximum demand, supply characteristics (Ze, Ipf, U0), earthing arrangement, type and composition of circuits, designer details, and Schedule of design data',
      'Identify previously coded defects, recommended improvements, and any limitations — to inform scope and expected condition',
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
      'Healthy ring (Step 3 = (r1+r2)/4 = 1.05/4 = 0.2625Ω; matches measured 0.26Ω across all sockets)',
      'EAWR 1989 Regulation 4(2) — "as may be necessary to prevent danger"',
      'Possess such knowledge and experience, or be under appropriate supervision',
      'A new installation OR an addition/alteration that introduces a new circuit',
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
      'Ze (external loop) + R1 (line cpc to fault) + R2 (cpc to MET) at operating temperature — abbreviated Zs = Ze + (R1+R2)cor',
      'L -> fault -> cpc -> MET -> earth electrode -> earth (soil) -> DNO supply electrode -> back to transformer',
      'Annually, with interim accuracy checks (e.g. against a calibration check box) before each use',
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
      'Heat stress, falls through ceiling between joists, contact with hot pipes/cables, glass fibre/asbestos exposure, restricted access for emergency egress',
      'It is unreasonable in all the circumstances to make dead, AND it is reasonable to work live, AND suitable precautions are taken',
      'Multiplier from Appendix 9 / GN3 (typically 1.20 for 70°C thermoplastic at full load) — giving Zs = Ze + ((R1+R2) × 1.20)',
      'Insulation of live parts (Reg 416.1), barriers/enclosures to at least IPXXB/IP2X (Reg 416.2), and obstacles/placing out of reach where applicable',
    ],
    correctAnswer: 0,
    explanation:
      'Loft work compounds electrical hazards with environmental and access ones; method statement must address all.',
    section: '1.6',
    difficulty: 'intermediate',
  },
  {
    id: 29,
    question:
      'The "competent person" definition in EAWR 1989 Reg 16 requires:',
    options: [
      'Switch off and lock off the main switch first to prevent the touch-voltage hazard arising if a fault develops while the earth is removed',
      'Sufficient technical knowledge, experience, and (where lacking) appropriate supervision — proportionate to the work',
      'Longer cable = MORE insulation surface in parallel = LOWER measured IR. Test result expected to be inversely proportional to length',
      'Use the no-trip / 15mA / lower-current loop test mode (modern MFTs have this), accepting slightly reduced accuracy in exchange for non-tripping',
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
      'L conductor -> fault -> cpc -> MET -> separate metallic earth conductor back to source transformer star point',
      'At reduced voltage (250V) where SPD operating voltage may otherwise be exceeded — OR with the SPD temporarily disconnected, then re-test at full voltage if appropriate',
      'Make safe (isolate, barrier, warn), then notify the duty holder in writing, then document on certification (Code C1 on EICR if applicable)',
      'For TN: measured Zs at every furthest point gives a fault current (U0/Zs) that operates the OCPD within the required disconnection time per Reg 411.3.2; OR a 30mA RCD is fitted',
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
      "Annually, with interim accuracy checks (e.g. against a calibration check box) before each use",
      "10 years OR change of occupancy (per IET Guidance, BPG4)",
      "A new installation OR an addition/alteration that introduces a new circuit",
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
      "Maximum demand, supply characteristics (Ze, Ipf, U0), earthing arrangement, type and composition of circuits, designer details, and Schedule of design data",
      "Physical separation OR equivalent insulation OR an earthed metallic screen — to prevent transfer of mains potential into ELV circuits",
      "Connect simultaneously-accessible exposed and extraneous conductive parts AND have continuity-test resistance per Reg 415.2.2: R <= 50V/Ia",
      "Tick (acceptable), N/A (not applicable), LIM (limitation), or appropriate code — accompanied by an overall declaration",
    ],
    correctAnswer: 0,
    explanation:
      "Reg 641.1 mirrors Reg 132 design info. Without supply characteristics and design data the inspector cannot verify ADS or cable selection.",
    section: "2.4",
    difficulty: "intermediate",
  },
  {
    id: 33,
    question:
      "The relevant documents associated with initial verification of a new installation are:",
    options: [
      "About 0.36-0.40Ω (50m × ~7.41mΩ/m ≈ 0.37Ω at 20°C; OSG mΩ/m table)",
      "Electrical Installation Certificate (EIC) + Schedule of Inspections + Schedule of Test Results",
      "Reports the condition of an EXISTING installation against current BS 7671 (with deviations recorded)",
      "Sufficient technical knowledge, experience, and (where lacking) appropriate supervision — proportionate to the work",
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
      "That the requirements of BS 7671 have been met by inspection AND testing",
      "Potentially dangerous — urgent remedial action required",
      "A new installation OR an addition/alteration that introduces a new circuit",
      "Annually, with interim accuracy checks (e.g. against a calibration check box) before each use",
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
      "Reports the condition of an EXISTING installation against current BS 7671 (with deviations recorded)",
      "The employer (with co-operation duties on the employee under s.7)",
      "Annually, with interim accuracy checks (e.g. against a calibration check box) before each use",
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
      "Lock off the main switch with a personal padlock and post a caution notice — and prove dead at the point of work",
      "Possess such knowledge and experience, or be under appropriate supervision",
      "DURING erection where appropriate, AND on completion BEFORE the installation is put into service",
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
      "Tick (acceptable), N/A (not applicable), LIM (limitation), or appropriate code — accompanied by an overall declaration",
      "The persons responsible for the design, construction, and inspection/testing of the installation (these may be the same person on small jobs)",
      "Earthing arrangement (TN-S/TN-C-S/TT), nominal voltage U/U0, frequency, prospective fault current Ipf, external loop impedance Ze, type and rating of supply protective device",
      "Sufficient technical knowledge, experience, and (where lacking) appropriate supervision — proportionate to the work",
    ],
    correctAnswer: 1,
    explanation:
      "Three separate signature roles: design, construction, inspection/testing. On small jobs all three may be one signatory.",
    section: "7.4",
    difficulty: "intermediate",
  },
  {
    id: 38,
    question:
      "The PRIMARY purpose of initial verification is to confirm:",
    options: [
      "L conductor -> fault -> cpc -> MET -> separate metallic earth conductor back to source transformer star point",
      "Electric shock, arc flash/burn, secondary injuries from involuntary reaction, fire, falls from height, and trip hazards from leads",
      "The installation has been designed, constructed, inspected and tested in accordance with BS 7671 and is safe to be energised and put into service",
      "Compliant with BS EN 61557 (safety + functional standard for low-voltage test equipment), CAT III/IV rated, calibrated annually, with GS38 leads",
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
      "The employer (with co-operation duties on the employee under s.7)",
      "That the requirements of BS 7671 have been met by inspection AND testing",
      "500V DC, with minimum acceptable IR of 1.0 MΩ",
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
      "The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 — 5 years maximum",
      "Acceptable — Icn 6kA exceeds Ipf 4.2kA, satisfying Reg 432.1 breaking capacity requirement",
      "Lock off the main switch with a personal padlock and post a caution notice — and prove dead at the point of work",
      "Improvement recommended — does not represent immediate or potential danger but improvement would contribute to safety",
    ],
    correctAnswer: 0,
    explanation:
      "PRS Regulations 2020 mandate a 5-year EICR for English private rentals; copies must be supplied to tenants and the local authority on request.",
    section: "2.1",
    difficulty: "intermediate",
  },
  {
    id: 41,
    question:
      "Per Reg 643.1, inspection and testing during initial verification must be carried out:",
    options: [
      "The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 — 5 years maximum",
      "DURING erection where appropriate, AND on completion BEFORE the installation is put into service",
      "Ze (external loop) + R1 (line cpc to fault) + R2 (cpc to MET) at operating temperature — abbreviated Zs = Ze + (R1+R2)cor",
      "Identify previously coded defects, recommended improvements, and any limitations — to inform scope and expected condition",
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
      "L conductor -> fault -> cpc -> MET -> separate metallic earth conductor back to source transformer star point",
      "Recommended for final circuits in dwellings, with mandatory installation in higher-risk residential buildings (HRRBs) under the Building Safety Act 2022",
      "Design drawings, specifications, BS 7671, GN3, manufacturer instructions, previous EICR (if alteration), and risk assessment/method statement",
      "At the origin (Ipf) and at every relevant point — line-line, line-neutral, AND line-earth — taking the higher of L-N (Ipsc) and L-PE (Ipefc), recorded as Ipf",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 643.1.1 requires the inspector to compare results with relevant criteria (design, BS 7671, manufacturer info).",
    section: "2.2",
    difficulty: "intermediate",
  },
  {
    id: 43,
    question:
      "On a typical EICR observation, Code C1 means:",
    options: [
      "A spur, broken ring, or high-resistance joint at a socket — investigation required",
      "Possess such knowledge and experience, or be under appropriate supervision",
      "An addition or alteration that does NOT extend an existing circuit by adding a new one",
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
      "BS EN IEC 60900 (1000V AC / 1500V DC rated)",
      "Authorises work on equipment confirmed dead and earthed",
      "About 0.36-0.40Ω (50m × ~7.41mΩ/m ≈ 0.37Ω at 20°C; OSG mΩ/m table)",
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
      "Connect simultaneously-accessible exposed and extraneous conductive parts AND have continuity-test resistance per Reg 415.2.2: R <= 50V/Ia",
      "Improvement recommended — does not represent immediate or potential danger but improvement would contribute to safety",
      "The persons responsible for the design, construction, and inspection/testing of the installation (these may be the same person on small jobs)",
      "Design drawings, specifications, BS 7671, GN3, manufacturer instructions, previous EICR (if alteration), and risk assessment/method statement",
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
      "Recorded to the resolution displayed by the instrument and compared against design values (and BS 7671 maxima) BEFORE leaving site",
      "Reports the condition of an EXISTING installation against current BS 7671 (with deviations recorded)",
      "Further Investigation required without delay — inspector cannot conclude on safety without more information",
      "Brown (line), blue (neutral), green-and-yellow (cpc) for single-phase; brown/black/grey for three-phase",
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
      "0.68Ω (Zs = 0.95 × 230 / 320 = 0.683Ω)",
      "250V DC, minimum acceptable IR 0.5 MΩ",
      "1000V DC, minimum acceptable IR 1.0 MΩ",
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
      "Earthing arrangement (TN-S/TN-C-S/TT), nominal voltage U/U0, frequency, prospective fault current Ipf, external loop impedance Ze, type and rating of supply protective device",
      "Disturbing existing terminations may have loosened them; the cpc integrity of the whole circuit (origin to all accessories) must be re-confirmed before energising",
      "ADS device type, settings, presence of cpc throughout, equipotential bonding (main and supplementary where required), and any additional protection (30mA RCD)",
      "Connect simultaneously-accessible exposed and extraneous conductive parts AND have continuity-test resistance per Reg 415.2.2: R <= 50V/Ia",
    ],
    correctAnswer: 0,
    explanation:
      "Reg 132.2 / 313 supply characteristics underpin every design decision; the EIC captures them for the record.",
    section: "7.2",
    difficulty: "intermediate",
  },
  {
    id: 49,
    question:
      "The Schedule of Inspections must record an outcome for each item as:",
    options: [
      "Achieve appropriate resolution and accuracy for the value being measured, AND avoid false trip/damage to RCD-protected circuits",
      "Tick (acceptable), N/A (not applicable), LIM (limitation), or appropriate code — accompanied by an overall declaration",
      "L -> fault -> cpc -> MET -> combined PEN (neutral) conductor back to transformer (PEN bonded to earth at supply)",
      "Motor to run in REVERSE direction — potentially destructive on pumps, fans, compressors, lifts; trips on overload often follow",
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
      "Upstream RCD has higher IΔn AND time-delayed (Type S) characteristic, so downstream 30mA RCD trips first for downstream faults — preventing total supply loss",
      "Identify circuit, switch off, secure isolation (lock and tag), prove voltage indicator on known live source, test for absence of voltage, re-prove on known live source",
      "Circuit ID, conductor csa (live + cpc), reference method, OCPD type/rating, R1+R2 (or R2), insulation resistance, polarity, Zs, RCD operating current and trip time, plus AFDD where fitted",
      "The persons responsible for the design, construction, and inspection/testing of the installation (these may be the same person on small jobs)",
    ],
    correctAnswer: 2,
    explanation:
      "Schedule of Test Results = the dataset proving every circuit was tested and met design criteria. A4:2026 added AFDD test columns.",
    section: "7.2",
    difficulty: "intermediate",
  },
  {
    id: 51,
    question:
      "Under Building Regulations Part P (England) and notifiable work, the installer must:",
    options: [
      "ADS device type, settings, presence of cpc throughout, equipotential bonding (main and supplementary where required), and any additional protection (30mA RCD)",
      "Standard or Enhanced fire-resistant cable (e.g. FP200 / Firetuf), separation from other circuits, and fire-rated supports/clips that survive collapse temperatures",
      "Improvement recommended — does not represent immediate or potential danger but improvement would contribute to safety",
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
      "Golden thread of digital information including electrical certification, accountability through dutyholder roles, and AFDD-related design considerations",
      "Insulated tools, insulating mat, GS38 leads, arc-rated PPE, a competent accompanying person, barriers, and a documented procedure",
      "Longer cable = MORE insulation surface in parallel = LOWER measured IR. Test result expected to be inversely proportional to length",
      "Motor to run in REVERSE direction — potentially destructive on pumps, fans, compressors, lifts; trips on overload often follow",
    ],
    correctAnswer: 0,
    explanation:
      "BSA 2022 introduced the dutyholder regime and golden thread for HRRBs (>=18m or 7 storeys with 2+ dwellings). Electrical records form part of the safety case.",
    section: "7.1",
    difficulty: "advanced",
  },
  {
    id: 53,
    question:
      "Limitations agreed with the client on an EICR (e.g. fitted furniture preventing inspection of sockets) must be:",
    options: [
      "Brown (line), blue (neutral), green-and-yellow (cpc) for single-phase; brown/black/grey for three-phase",
      "Recorded explicitly on the report so the reader understands the scope of what was NOT inspected and the implications",
      "Physical separation OR equivalent insulation OR an earthed metallic screen — to prevent transfer of mains potential into ELV circuits",
      "Electric shock, arc flash/burn, secondary injuries from involuntary reaction, fire, falls from height, and trip hazards from leads",
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
      "Scope, sequence, hazards/controls, isolation strategy, PPE, instruments, competence of personnel, emergency arrangements",
      "The installation has been designed, constructed, inspected and tested in accordance with BS 7671 and is safe to be energised and put into service",
      "For the lifetime of the installation, by both the issuer and the recipient — and made available to subsequent inspectors",
      "4V and 24V (per BS EN 61557-4) and a minimum short-circuit current of 200mA — to break through any film of oxide on connections",
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
      "Longer cable = MORE insulation surface in parallel = LOWER measured IR. Test result expected to be inversely proportional to length",
      "Switch off and lock off the main switch first to prevent the touch-voltage hazard arising if a fault develops while the earth is removed",
      "Stopped, made safe, investigated for root cause, and reported per the company H&S policy and (if a dangerous occurrence) RIDDOR",
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
      "Healthy ring (Step 3 = (r1+r2)/4 = 1.05/4 = 0.2625Ω; matches measured 0.26Ω across all sockets)",
      "Insulated tools, insulating mat, GS38 leads, arc-rated PPE, a competent accompanying person, barriers, and a documented procedure",
      "Stopped, made safe, investigated for root cause, and reported per the company H&S policy and (if a dangerous occurrence) RIDDOR",
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
      "Continuity test from L bus-bar at distribution board to LINE terminal of each accessory; from N bus-bar to NEUTRAL terminal; from MET to cpc terminal — proving correct identification at every termination",
      "Connections of conductors, identification of conductors, routing of cables, conductor selection (csa, current capacity, voltage drop), choice and setting of protective devices, presence of fire barriers, methods of protection against electric shock — full list in Reg 642.3",
      "Each test depends on the previous (continuity of CPC must be proven before IR can be interpreted; earthing must be proven before live tests rely on it; functional last because it confirms the whole system works)",
      "The insulation resistance is at or above the upper limit of the test instrument's display range (typically 299 MΩ on a 500 V tester) — a passing result; record as '>299' rather than the displayed numeral",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 642.3 lists 19 items including those above. The Schedule of Inspections form mirrors this list.",
    section: "3.4",
    difficulty: "intermediate",
  },
  {
    id: 58,
    question:
      "Human senses used during visual inspection (Reg 642.3 / GN3) include:",
    options: [
      "Ze (external loop) + R1 (line cpc to fault) + R2 (cpc to MET) at operating temperature — abbreviated Zs = Ze + (R1+R2)cor",
      "It is unreasonable in all the circumstances to make dead, AND it is reasonable to work live, AND suitable precautions are taken",
      "Sight, hearing (e.g. arcing/buzzing), smell (e.g. burning insulation), touch (carefully — for excessive temperature) — never taste",
      "Ra <= 50V/IΔn — for a 30mA RCD this gives Ra <= 1667Ω; for 100mA <= 500Ω; in practice 200Ω is targeted as a stable upper limit",
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
      "Generally inferred from cable size, length, and design data; physical measurement only required if compliance is in doubt — limits are 3% (lighting) and 5% (other) of nominal",
      "Final circuits supplying socket-outlets in higher-risk residential buildings (HRRBs), care homes, student accommodation, etc. (recommendation, not absolute requirement, in non-HRRB)",
      "Make safe (isolate, barrier, warn), then notify the duty holder in writing, then document on certification (Code C1 on EICR if applicable)",
      "Correct material and csa per Reg 543, secure connection at MET (BS 951 clamp) with a label per Reg 514.13.1, and protection against mechanical/corrosion damage",
    ],
    correctAnswer: 3,
    explanation:
      "Earthing conductor csa per Table 54.7 (or by calculation). BS 951 clamp at MET. Permanent label is mandatory.",
    section: "3.4",
    difficulty: "intermediate",
  },
  {
    id: 60,
    question:
      "Per Reg 514.13.1, the label at every connection of an earthing or bonding conductor must read:",
    options: [
      "SAFETY ELECTRICAL CONNECTION — DO NOT REMOVE",
      "Authorises work on equipment confirmed dead and earthed",
      "Any C1, any C2, OR any FI observation",
      "7.28Ω (Zs = 0.95 × 230 / (5 × 6) = 7.283Ω)",
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
      "Stopped, made safe, investigated for root cause, and reported per the company H&S policy and (if a dangerous occurrence) RIDDOR",
      "Sized per Table 54.8 (TN-C-S 10mm minimum, TN-S/TT half csa of earthing conductor, with absolute minimum 6mm copper)",
      "Cross-sectional area, length, conductor material (copper vs aluminium ≈1.6×), and temperature (~0.4%/K rise above 20°C)",
      "Finger barriers, shrouded probes exposing no more than 4mm of metal, and fused tips (typically 500mA HRC)",
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
      "Same dead-polarity test as a standard socket (line at LINE terminal); functional check via charging a known device confirms output polarity",
      "Electric shock, arc flash/burn, secondary injuries from involuntary reaction, fire, falls from height, and trip hazards from leads",
      "Connect simultaneously-accessible exposed and extraneous conductive parts AND have continuity-test resistance per Reg 415.2.2: R <= 50V/Ia",
      "Physical separation OR equivalent insulation OR an earthed metallic screen — to prevent transfer of mains potential into ELV circuits",
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
      "Loss of supply to other tenants/users, loss of life-safety systems (fire alarm, emergency lighting), loss of refrigeration, loss of IT systems",
      "A SINGLE AC test at 1×IΔn (the 5×IΔn test was DELETED in A4:2026; functional check via test button still required)",
      "Origin of the supply, every accessory (sockets, switches), and every Edison-screw lampholder (centre contact must be LINE)",
      "Type (BS EN 60898-1 MCB / BS 88-3 fuse / BS EN 61009 RCBO), rating (In), breaking capacity (Icn/Icu) suitable for Ipf, and selectivity with upstream",
    ],
    correctAnswer: 3,
    explanation:
      "Reg 432.1: device must interrupt prospective fault current. Reg 433.1.1: rating must coordinate with cable Iz. Reg 536: selectivity for downstream coverage.",
    section: "3.4",
    difficulty: "intermediate",
  },
  {
    id: 64,
    question:
      "IP ratings (BS EN 60529) on equipment in a Section 701 Zone 1 (bath/shower) must be at least:",
    options: [
      "IPX4",
      "IP20",
      "IP10",
      "IP00",
    ],
    correctAnswer: 0,
    explanation:
      "Reg 701.512.2 + Table 701.55.1: Zone 1 IPX4 minimum (IPX5 if water jets used). Zone 0 = IPX7. The X allows any solid-particle rating.",
    section: "3.5",
    difficulty: "intermediate",
  },
  {
    id: 65,
    question:
      "Section 705 (agricultural and horticultural) requires equipment IP rating of at least:",
    options: [
      "Possess such knowledge and experience, or be under appropriate supervision",
      "IP44 minimum (IP54/IP55 in dustier or wetter areas) per Reg 705.512.2",
      "Authorises work on equipment confirmed dead and earthed",
      "1.37Ω (Ze + (R1+R2)×1.20 = 0.35 + 0.85×1.20 = 0.35 + 1.02 = 1.37Ω)",
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
      "Per Reg 421.1.7 (A4:2026), AFDDs are recommended for:",
    options: [
      "The persons responsible for the design, construction, and inspection/testing of the installation (these may be the same person on small jobs)",
      "Continuity of CPCs and ring conductors, insulation resistance, polarity, earth electrode resistance (TT) — completed BEFORE energising",
      "Final circuits supplying socket-outlets in higher-risk residential buildings (HRRBs), care homes, student accommodation, etc. (recommendation, not absolute requirement, in non-HRRB)",
      "A SINGLE AC test at 1×IΔn — measured trip time must be within published maximum (BS EN 61008/61009: 300ms general purpose). 5×IΔn was DELETED",
    ],
    correctAnswer: 2,
    explanation:
      "A4:2026 retains AFDD as a RECOMMENDATION (not mandatory) under Reg 421.1.7. The Building Safety Act regime can make them effectively mandatory in HRRBs via dutyholder duties.",
    section: "3.4",
    difficulty: "advanced",
  },
  {
    id: 67,
    question:
      "Surge Protective Devices (SPDs) per Reg 443 / 534 should be inspected for:",
    options: [
      "FAIL the verification — Icn < Ipf is C2 (potentially dangerous): MCBs cannot safely interrupt available fault current — replace devices or fit upstream backup fuse for energy limitation",
      "Golden thread of digital information including electrical certification, accountability through dutyholder roles, and AFDD-related design considerations",
      "To prove the cpc has a low-resistance path so that under fault the disconnection device operates within the required time (and to prove main and supplementary bonding continuity)",
      "Type (1/2/3 per BS EN 61643-11), correct location relative to ADS, status indicator (green = OK), and connection lead lengths kept short (<0.5m total recommended)",
    ],
    correctAnswer: 3,
    explanation:
      "SPD effectiveness depends on lead length (Up + voltage drop on leads). Status indicator must be checked at every inspection.",
    section: "3.4",
    difficulty: "intermediate",
  },
  {
    id: 68,
    question:
      "Inspection of cable supports and containment must verify:",
    options: [
      "Spacing per OSG Table 4.5/4.6, mechanical protection at penetrations, fire-stopping at floor/wall penetrations (Reg 527.2), and capping/grommets where cables enter enclosures",
      "Stopped, made safe, investigated for root cause, and reported per the company H&S policy and (if a dangerous occurrence) RIDDOR",
      "Sinusoidal AC AND pulsating DC residual currents (covers most domestic/commercial electronic loads). Default per Reg 531.3.3",
      "For TN: measured Zs at every furthest point gives a fault current (U0/Zs) that operates the OCPD within the required disconnection time per Reg 411.3.2; OR a 30mA RCD is fitted",
    ],
    correctAnswer: 0,
    explanation:
      "Reg 527.2 + Building Regs Approved Doc B: fire-stopping prevents fire spread via service penetrations.",
    section: "3.4",
    difficulty: "intermediate",
  },
  {
    id: 69,
    question:
      "Cables installed in a wall under 50mm depth that are NOT in safe zones (Reg 522.6.202/.203) must be:",
    options: [
      "Re-prove dead independently using their own GS38 voltage indicator and known live proving unit",
      "Mechanically protected (capping/conduit), OR enclosed in earthed metallic covering, OR provided with 30mA RCD additional protection",
      "6kA, 10kA, 16kA — selected to exceed measured Ipf at the point of installation per Reg 432.1",
      "Electrical hazards, working at height, manual handling, slips/trips, lone working, occupant disruption, and emergency arrangements",
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
      "Below-minimum or above-maximum values indicate a fault that prevents the protective measure from operating as designed — risking shock, fire, or equipment damage",
      "Battery condition, lead/probe integrity (no cracks, exposed metal), zero/null function (continuity), calibration date, and against a known reference where applicable",
      "Of non-combustible material (e.g. metal) OR enclosed in a non-combustible cabinet — to limit fire spread from the consumer unit",
      "A loose neutral connection (high-resistance N) shifting the star point — confirm with N-E and L-N tests, then isolate, prove dead, and remake the neutral termination",
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
      "Tick (acceptable), N/A (not applicable), LIM (limitation), or appropriate code — accompanied by an overall declaration",
      "Preferably before, but in any case prior to, testing — and as far as reasonably practicable with the installation isolated",
      "Avoids the test voltage appearing across the SPD (which is L-N or L-PE) potentially triggering or damaging it",
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
      "C2 (potentially dangerous) — broken PEN risk in prohibited environments creates touch voltage hazard; inspector recommends conversion to TT",
      "Type (BS EN 60898-1 MCB / BS 88-3 fuse / BS EN 61009 RCBO), rating (In), breaking capacity (Icn/Icu) suitable for Ipf, and selectivity with upstream",
      "Low-resistance ohmmeter (R2 method) from MET to the bonded service entry point — typically <0.05Ω; values significantly higher indicate poor connection",
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
      "Each input/output operates per design, interlocks function, emergency stop activates correctly with safety-rated contactors, and timing/sequencing matches the specification",
      "Insulation method (Class II / equivalent), DC isolator at array, polarity, string fuses, earthing arrangement (functional vs protective), and labels at supply intake (Reg 514)",
      "Recommended for final circuits in dwellings, with mandatory installation in higher-risk residential buildings (HRRBs) under the Building Safety Act 2022",
      "Light works but lampholder/luminaire body remains at line potential when switch is OFF — major shock risk during lamp change",
    ],
    correctAnswer: 1,
    explanation:
      "PV DC sides are floating relative to earth; protection by Class II insulation throughout. Multiple labels required including dual-supply warning at consumer unit.",
    section: "3.5",
    difficulty: "advanced",
  },
  {
    id: 74,
    question:
      "Inspection of fire alarm cable installation (BS 5839-1) must verify:",
    options: [
      "Each input/output operates per design, interlocks function, emergency stop activates correctly with safety-rated contactors, and timing/sequencing matches the specification",
      "Improvement recommended — does not represent immediate or potential danger but improvement would contribute to safety",
      "Standard or Enhanced fire-resistant cable (e.g. FP200 / Firetuf), separation from other circuits, and fire-rated supports/clips that survive collapse temperatures",
      "Sized per Table 54.8 (TN-C-S 10mm minimum, TN-S/TT half csa of earthing conductor, with absolute minimum 6mm copper)",
    ],
    correctAnswer: 2,
    explanation:
      "BS 5839-1 mandates fire-resistant cable rated for system survival time. Plastic clips/trays fail in fire — fire-rated metallic supports required.",
    section: "3.5",
    difficulty: "intermediate",
  },
  {
    id: 75,
    question:
      "Section 753 (heating cables/embedded heating systems) requires:",
    options: [
      "Two-pole approved voltage indicator complying with GS38 (e.g. Martindale VI-13800, Drummond MTL10)",
      "Electrical hazards, working at height, manual handling, slips/trips, lone working, occupant disruption, and emergency arrangements",
      "An individual circuit with Type B RCD (or Type A + RDC-DD) per Reg 722.531.3.101 to detect smooth DC residual currents",
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
      "At the origin of the installation, identifying every circuit, the type and composition, OCPD, and characteristics necessary for inspection and testing",
      "Insulation method (Class II / equivalent), DC isolator at array, polarity, string fuses, earthing arrangement (functional vs protective), and labels at supply intake (Reg 514)",
      "For TN: measured Zs at every furthest point gives a fault current (U0/Zs) that operates the OCPD within the required disconnection time per Reg 411.3.2; OR a 30mA RCD is fitted",
      "Use a single-pole MCB lock-off device with a personal padlock, the only key retained by the person doing the work, plus a caution notice",
    ],
    correctAnswer: 0,
    explanation:
      "Reg 514.9 mandates information adequate for safe operation, inspection, testing and maintenance — typically a circuit chart inside the CU door.",
    section: "3.4",
    difficulty: "basic",
  },
  {
    id: 77,
    question:
      "When inspecting a TT installation, the earth electrode arrangement must be checked for:",
    options: [
      "Insulation method (Class II / equivalent), DC isolator at array, polarity, string fuses, earthing arrangement (functional vs protective), and labels at supply intake (Reg 514)",
      "Type (rod / plate / mat), accessibility for measurement (test link), corrosion, label per Reg 514.13.1, and a measured Ra giving compliant Zs at the furthest point",
      "Disconnect/unplug sensitive electronics, link out (or accept loss of) MOVs, and test L+N joined to earth (rather than between L and N) to avoid damaging equipment",
      "Of non-combustible material (e.g. metal) OR enclosed in a non-combustible cabinet — to limit fire spread from the consumer unit",
    ],
    correctAnswer: 1,
    explanation:
      "TT relies entirely on the local electrode for fault path; physical and electrical condition both matter. Test link is essential for periodic re-measurement.",
    section: "3.4",
    difficulty: "intermediate",
  },
  {
    id: 78,
    question:
      "Inspection of segregation between Band I (ELV/SELV) and Band II (LV mains) circuits per Reg 528.1 requires:",
    options: [
      "+/- 30% of measured value (allowing for instrument and test method uncertainty) — accounted for in BS 7671 Table 41.3 by use of Cmin = 0.95 and 80% rule",
      "Of non-combustible material (e.g. metal) OR enclosed in a non-combustible cabinet — to limit fire spread from the consumer unit",
      "Physical separation OR equivalent insulation OR an earthed metallic screen — to prevent transfer of mains potential into ELV circuits",
      "At reduced voltage (250V) where SPD operating voltage may otherwise be exceeded — OR with the SPD temporarily disconnected, then re-test at full voltage if appropriate",
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
      "It is unreasonable in all the circumstances to make dead, AND it is reasonable to work live, AND suitable precautions are taken",
      "4V and 24V (per BS EN 61557-4) and a minimum short-circuit current of 200mA — to break through any film of oxide on connections",
      "Stopped, made safe, investigated for root cause, and reported per the company H&S policy and (if a dangerous occurrence) RIDDOR",
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
      "ADS device type, settings, presence of cpc throughout, equipotential bonding (main and supplementary where required), and any additional protection (30mA RCD)",
      "4V and 24V (per BS EN 61557-4) and a minimum short-circuit current of 200mA — to break through any film of oxide on connections",
      "To ensure single-pole devices (switches, fuses, MCBs) are connected in the LINE conductor only (not neutral), preventing equipment remaining live when switched off",
      "An individual circuit with Type B RCD (or Type A + RDC-DD) per Reg 722.531.3.101 to detect smooth DC residual currents",
    ],
    correctAnswer: 0,
    explanation:
      "Fault protection per Reg 411 is the multi-layer ADS strategy: cpc + bonding + ADS device that operates within the disconnection time.",
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
      "Avoids the test voltage appearing across the SPD (which is L-N or L-PE) potentially triggering or damaging it",
      "Continuity of protective conductors -> continuity of ring final conductors -> insulation resistance -> polarity (dead) -> earth electrode resistance (TT)",
      "Insulation method (Class II / equivalent), DC isolator at array, polarity, string fuses, earthing arrangement (functional vs protective), and labels at supply intake (Reg 514)",
      "Notify the occupant in advance, agree timings, identify life-safety equipment dependent on supply, plan temporary arrangements where required, document agreement",
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
      "Either conversion to TT, or a means of detecting an open-PEN condition (e.g. integral PEN-loss device in the EVSE) to prevent dangerous touch voltage on the vehicle bodywork",
      "Each input/output operates per design, interlocks function, emergency stop activates correctly with safety-rated contactors, and timing/sequencing matches the specification",
      "Earth electrode (live, for TT) -> earth fault loop impedance Ze -> prospective fault current -> earth fault loop impedance Zs -> polarity (energised) -> RCD operation -> AFDD operation -> functional/operational",
      "At reduced voltage (250V) where SPD operating voltage may otherwise be exceeded — OR with the SPD temporarily disconnected, then re-test at full voltage if appropriate",
    ],
    correctAnswer: 2,
    explanation:
      "Live tests follow a logical safety order: confirm earthing path before relying on it for ADS verification. Functional checks are last.",
    section: "4.6",
    difficulty: "intermediate",
  },
  {
    id: 83,
    question:
      "The fundamental reason for the prescribed test sequence is:",
    options: [
      "Repeat the test to verify, identify and rectify the fault, then re-test ALL preceding affected tests in sequence to confirm the rectification has not introduced new issues",
      "Final circuits supplying socket-outlets in higher-risk residential buildings (HRRBs), care homes, student accommodation, etc. (recommendation, not absolute requirement, in non-HRRB)",
      "Connect simultaneously-accessible exposed and extraneous conductive parts AND have continuity-test resistance per Reg 415.2.2: R <= 50V/Ia",
      "Each test relies on the integrity of a previous test (e.g. IR cannot be safely interpreted without continuity of cpc; live tests require dead-test confirmation of earthing)",
    ],
    correctAnswer: 3,
    explanation:
      "Sequence is safety-critical: skipping or re-ordering can invalidate results or expose the inspector to live faults.",
    section: "4.6",
    difficulty: "intermediate",
  },
  {
    id: 84,
    question:
      "An MFT (Multi-Function Tester) such as a Megger MFT1741+ or Fluke 1664FC must be:",
    options: [
      "Compliant with BS EN 61557 (safety + functional standard for low-voltage test equipment), CAT III/IV rated, calibrated annually, with GS38 leads",
      "Circuit ID, conductor csa (live + cpc), reference method, OCPD type/rating, R1+R2 (or R2), insulation resistance, polarity, Zs, RCD operating current and trip time, plus AFDD where fitted",
      "Finger barriers, shrouded probes exposing no more than 4mm of metal, and fused tips (typically 500mA HRC)",
      "Of non-combustible material (e.g. metal) OR enclosed in a non-combustible cabinet — to limit fire spread from the consumer unit",
    ],
    correctAnswer: 0,
    explanation:
      "BS EN 61557 mandates the test instrument family standard. CAT III 600V minimum for distribution work; CAT IV at supply origin.",
    section: "4.2",
    difficulty: "intermediate",
  },
  {
    id: 85,
    question:
      "Per BS 7671 Reg 643.7.3 (A4:2026), the RCD test sequence is:",
    options: [
      "Mechanically protected (capping/conduit), OR enclosed in earthed metallic covering, OR provided with 30mA RCD additional protection",
      "A SINGLE AC test at 1×IΔn (the 5×IΔn test was DELETED in A4:2026; functional check via test button still required)",
      "Two-pole approved voltage indicator complying with GS38 (e.g. Martindale VI-13800, Drummond MTL10)",
      "Loss of supply to other tenants/users, loss of life-safety systems (fire alarm, emergency lighting), loss of refrigeration, loss of IT systems",
    ],
    correctAnswer: 1,
    explanation:
      "A4:2026 simplified the RCD test to a single AC test at 1×IΔn (must trip within published time, generally <300ms for general purpose, <40ms for Type S delay). 5×IΔn was deleted as redundant.",
    section: "4.5",
    difficulty: "advanced",
  },
  {
    id: 86,
    question:
      "Insulation resistance test voltage per BS 7671 Table 64 / Reg 643.3.3 for circuits up to and including 500V (excluding SELV/PELV) is:",
    options: [
      "Automatic compensation from the DNO",
      "7.28Ω (Zs = 0.95 × 230 / (5 × 6) = 7.283Ω)",
      "500V DC, with minimum acceptable IR of 1.0 MΩ",
      "Authorises work on equipment confirmed dead and earthed",
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
      "0.68Ω (Zs = 0.95 × 230 / 320 = 0.683Ω)",
      "Automatic compensation from the DNO",
      "SAFETY ELECTRICAL CONNECTION — DO NOT REMOVE",
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
      "Automatic compensation from the DNO",
      "BS EN IEC 60900 (1000V AC / 1500V DC rated)",
      "250V DC, minimum acceptable IR 0.5 MΩ",
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
      "FAIL — exceeds max. Investigation: increase cpc csa, reduce length, fit RCD additional protection, or replace with Type B at higher rating that accepts Zs",
      "Investigate further — record the value, isolate sub-circuits, and verify whether the low value reflects normal cable length or a developing fault",
      "Sufficient technical knowledge, experience, and (where lacking) appropriate supervision — proportionate to the work",
      "Sight, hearing (e.g. arcing/buzzing), smell (e.g. burning insulation), touch (carefully — for excessive temperature) — never taste",
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
      "Light works but lampholder/luminaire body remains at line potential when switch is OFF — major shock risk during lamp change",
      "After energising, that the supply polarity (line vs neutral) is as expected and consistent with dead-test polarity verification at all accessories",
      "Repeat the test to verify, identify and rectify the fault, then re-test ALL preceding affected tests in sequence to confirm the rectification has not introduced new issues",
      "Confirming using approved voltage indicator that the LINE terminal carries supply voltage to earth/neutral, and the neutral does not — with installation isolated downstream",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 643.1.2 requires fault rectification AND re-testing of any preceding tests that could be affected — preventing the new fix from introducing new faults.",
    section: "4.5",
    difficulty: "intermediate",
  },
  {
    id: 91,
    question:
      "Test instruments must be checked before use for:",
    options: [
      "4V and 24V (per BS EN 61557-4) and a minimum short-circuit current of 200mA — to break through any film of oxide on connections",
      "Type (1/2/3 per BS EN 61643-11), correct location relative to ADS, status indicator (green = OK), and connection lead lengths kept short (<0.5m total recommended)",
      "An individual circuit with Type B RCD (or Type A + RDC-DD) per Reg 722.531.3.101 to detect smooth DC residual currents",
      "Battery condition, lead/probe integrity (no cracks, exposed metal), zero/null function (continuity), calibration date, and against a known reference where applicable",
    ],
    correctAnswer: 3,
    explanation:
      "Pre-use functional checks supplement annual calibration. A cracked lead or flat battery can produce dangerously misleading results.",
    section: "4.3",
    difficulty: "basic",
  },
  {
    id: 92,
    question:
      "When testing IR on a circuit containing electronic equipment (PCs, dimmers, RCBO electronics), best practice is to:",
    options: [
      "Disconnect/unplug sensitive electronics, link out (or accept loss of) MOVs, and test L+N joined to earth (rather than between L and N) to avoid damaging equipment",
      "Live conductors connected together to earth (preferred when SPDs present), AND between live and neutral with loads disconnected",
      "4V and 24V (per BS EN 61557-4) and a minimum short-circuit current of 200mA — to break through any film of oxide on connections",
      "Sufficient technical knowledge, experience, and (where lacking) appropriate supervision — proportionate to the work",
    ],
    correctAnswer: 0,
    explanation:
      "Electronic loads can be damaged by 500V DC. GN3 recommends disconnection or alternative methods (e.g. live conductors joined together to earth).",
    section: "4.5",
    difficulty: "advanced",
  },
  {
    id: 93,
    question:
      "Continuity test instruments must have a no-load voltage between:",
    options: [
      "Continuity of CPCs and ring conductors, insulation resistance, polarity, earth electrode resistance (TT) — completed BEFORE energising",
      "4V and 24V (per BS EN 61557-4) and a minimum short-circuit current of 200mA — to break through any film of oxide on connections",
      "<= 80% of Table 41.3 maximum to allow for instrument uncertainty (typically +/- 30% for loop testers) and temperature rise above test temperature",
      "Upstream RCD has higher IΔn AND time-delayed (Type S) characteristic, so downstream 30mA RCD trips first for downstream faults — preventing total supply loss",
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
      "Physical separation OR equivalent insulation OR an earthed metallic screen — to prevent transfer of mains potential into ELV circuits",
      "Type (BS EN 60898-1 MCB / BS 88-3 fuse / BS EN 61009 RCBO), rating (In), breaking capacity (Icn/Icu) suitable for Ipf, and selectivity with upstream",
      "+/- 30% of measured value (allowing for instrument and test method uncertainty) — accounted for in BS 7671 Table 41.3 by use of Cmin = 0.95 and 80% rule",
      "Upstream RCD has higher IΔn AND time-delayed (Type S) characteristic, so downstream 30mA RCD trips first for downstream faults — preventing total supply loss",
    ],
    correctAnswer: 2,
    explanation:
      "MFT loop testers carry significant uncertainty. The 80% rule (measured Zs <= 0.8 × tabulated max) provides safety margin.",
    section: "4.3",
    difficulty: "advanced",
  },
  {
    id: 95,
    question:
      "Per Reg 643.7.1 + GN3, Ze (external earth fault loop impedance) is measured by:",
    options: [
      "Maximum demand, supply characteristics (Ze, Ipf, U0), earthing arrangement, type and composition of circuits, designer details, and Schedule of design data",
      "The installation has been designed, constructed, inspected and tested in accordance with BS 7671 and is safe to be energised and put into service",
      "Below-minimum or above-maximum values indicate a fault that prevents the protective measure from operating as designed — risking shock, fire, or equipment damage",
      "Disconnecting the installation main earthing conductor at the MET, then loop-testing between supply L and the disconnected MET earth — with main switch OFF and circuits isolated for safety",
    ],
    correctAnswer: 3,
    explanation:
      "Ze test isolates the supply contribution. Disconnecting the main earth must be done with installation isolated to remove touch-voltage hazard.",
    section: "4.5",
    difficulty: "advanced",
  },
  {
    id: 96,
    question:
      "Maximum DNO-declared Ze values commonly assumed (per BPG3) are:",
    options: [
      "TN-S: 0.8Ω; TN-C-S: 0.35Ω (these are ASSUMED maxima — actual values must be measured or confirmed from DNO)",
      "Two-pole approved voltage indicator complying with GS38 (e.g. Martindale VI-13800, Drummond MTL10)",
      "Re-prove dead independently using their own GS38 voltage indicator and known live proving unit",
      "Improvement recommended — does not represent immediate or potential danger but improvement would contribute to safety",
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
      "FAIL — exceeds max. Investigation: increase cpc csa, reduce length, fit RCD additional protection, or replace with Type B at higher rating that accepts Zs",
      "Ra <= 50V/IΔn — for a 30mA RCD this gives Ra <= 1667Ω; for 100mA <= 500Ω; in practice 200Ω is targeted as a stable upper limit",
      "Multiplier from Appendix 9 / GN3 (typically 1.20 for 70°C thermoplastic at full load) — giving Zs = Ze + ((R1+R2) × 1.20)",
      "C2 (potentially dangerous) — bonding fails to meet Reg 544.1 cross-section, undermining fault protection in the event of a PEN failure; remedial action required",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 411.5.3 formula. 200Ω stable target reflects long-term stability concerns (drying soil); higher values may not stay reliable.",
    section: "4.5",
    difficulty: "advanced",
  },
  {
    id: 98,
    question:
      "Functional testing per Reg 643.10 covers:",
    options: [
      "Continuity test from L bus-bar at distribution board to LINE terminal of each accessory; from N bus-bar to NEUTRAL terminal; from MET to cpc terminal — proving correct identification at every termination",
      "It is unreasonable in all the circumstances to make dead, AND it is reasonable to work live, AND suitable precautions are taken",
      "Switchgear, controlgear, drives, controls, interlocks, monitoring devices etc. — verifying they operate as intended including after the protective device test",
      "Improvement recommended — does not represent immediate or potential danger but improvement would contribute to safety",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 643.10: every assembled device that depends on operation must be functionally proven before handover.",
    section: "4.5",
    difficulty: "intermediate",
  },
  {
    id: 99,
    question:
      "Test instrument leads with crocodile/probe combinations should:",
    options: [
      "Sized per Table 54.8 (TN-C-S 10mm minimum, TN-S/TT half csa of earthing conductor, with absolute minimum 6mm copper)",
      "For the lifetime of the installation, by both the issuer and the recipient — and made available to subsequent inspectors",
      "Functional check via integral test button at commissioning AND at periodic intervals (per manufacturer); operational testing of arc detection requires OEM-specific equipment",
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
      "Each test depends on the previous (continuity of CPC must be proven before IR can be interpreted; earthing must be proven before live tests rely on it; functional last because it confirms the whole system works)",
      "Final circuits supplying socket-outlets in higher-risk residential buildings (HRRBs), care homes, student accommodation, etc. (recommendation, not absolute requirement, in non-HRRB)",
      "Connections of conductors, identification of conductors, routing of cables, conductor selection (csa, current capacity, voltage drop), choice and setting of protective devices, presence of fire barriers, methods of protection against electric shock — full list in Reg 642.3",
      "The insulation resistance is at or above the upper limit of the test instrument's display range (typically 299 MΩ on a 500 V tester) — a passing result; record as '>299' rather than the displayed numeral",
    ],
    correctAnswer: 0,
    explanation:
      "Sequence integrity is a safety requirement, not tradition. Re-ordering can invalidate later results or expose inspector to risk.",
    section: "4.6",
    difficulty: "intermediate",
  },
  {
    id: 101,
    question:
      "Per Table 41.3 (A4:2026), the maximum Zs for a 32A Type B BS EN 60898 MCB at 230V (0.4s disconnection time) is:",
    options: [
      "The persons responsible for the design, construction, and inspection/testing of the installation (these may be the same person on small jobs)",
      "1.37Ω (the value moved to 1.37Ω with the introduction of the Cmin = 0.95 multiplier; 1.44Ω is the old pre-Cmin value)",
      "Lock off the main switch with a personal padlock and post a caution notice — and prove dead at the point of work",
      "An addition or alteration that does NOT extend an existing circuit by adding a new one",
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
      "500V DC, with minimum acceptable IR of 1.0 MΩ",
      "250V DC, minimum acceptable IR 0.5 MΩ",
      "7.28Ω (Zs = 0.95 × 230 / (5 × 6) = 7.283Ω)",
      "BS EN IEC 60900 (1000V AC / 1500V DC rated)",
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
      "BS EN IEC 60900 (1000V AC / 1500V DC rated)",
      "Any C1, any C2, OR any FI observation",
      "250V DC, minimum acceptable IR 0.5 MΩ",
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
      "A calibration check box (e.g. resistance check unit, test box) at intervals — and at each suspected damage event — to confirm continued accuracy between calibrations",
      "Sized per Table 54.8 (TN-C-S 10mm minimum, TN-S/TT half csa of earthing conductor, with absolute minimum 6mm copper)",
      "Earthing arrangement (TN-S/TN-C-S/TT), nominal voltage U/U0, frequency, prospective fault current Ipf, external loop impedance Ze, type and rating of supply protective device",
      "C2 (potentially dangerous) — broken PEN risk in prohibited environments creates touch voltage hazard; inspector recommends conversion to TT",
    ],
    correctAnswer: 0,
    explanation:
      "GN3 best practice: interim checks against a known reference catch drift between annual UKAS calibrations.",
    section: "4.3",
    difficulty: "intermediate",
  },
  {
    id: 109,
    question:
      "Selecting the correct instrument scale (e.g. continuity 0-200Ω, IR 500V, loop high-current/no-trip mode) is necessary to:",
    options: [
      "FAIL — replace device. Test button only verifies the mechanical trip; instrument test verifies electrical detection of residual current",
      "Achieve appropriate resolution and accuracy for the value being measured, AND avoid false trip/damage to RCD-protected circuits",
      "1.37Ω (the value moved to 1.37Ω with the introduction of the Cmin = 0.95 multiplier; 1.44Ω is the old pre-Cmin value)",
      "Method 1 (R1+R2 — link line and cpc at distribution board, measure end-to-end at each accessory) and Method 2 (R2 only — using a long lead with one end at the MET)",
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
      "It is unreasonable in all the circumstances to make dead, AND it is reasonable to work live, AND suitable precautions are taken",
      "An individual circuit with Type B RCD (or Type A + RDC-DD) per Reg 722.531.3.101 to detect smooth DC residual currents",
      "Recorded to the resolution displayed by the instrument and compared against design values (and BS 7671 maxima) BEFORE leaving site",
      "A calibration check box (e.g. resistance check unit, test box) at intervals — and at each suspected damage event — to confirm continued accuracy between calibrations",
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
      "Use the no-trip / 15mA / lower-current loop test mode (modern MFTs have this), accepting slightly reduced accuracy in exchange for non-tripping",
      "Maximum demand, supply characteristics (Ze, Ipf, U0), earthing arrangement, type and composition of circuits, designer details, and Schedule of design data",
      "Achieve appropriate resolution and accuracy for the value being measured, AND avoid false trip/damage to RCD-protected circuits",
      "To prove the cpc has a low-resistance path so that under fault the disconnection device operates within the required time (and to prove main and supplementary bonding continuity)",
    ],
    correctAnswer: 3,
    explanation:
      "Without verified low-resistance cpc, ADS cannot work — fault current path is broken or too high to disconnect.",
    section: "5.1",
    difficulty: "basic",
  },
  {
    id: 112,
    question:
      "The two methods for verifying continuity of protective conductors per GN3 Section 2.7 are:",
    options: [
      "Method 1 (R1+R2 — link line and cpc at distribution board, measure end-to-end at each accessory) and Method 2 (R2 only — using a long lead with one end at the MET)",
      "Circuit ID, conductor csa (live + cpc), reference method, OCPD type/rating, R1+R2 (or R2), insulation resistance, polarity, Zs, RCD operating current and trip time, plus AFDD where fitted",
      "The insulation resistance is at or above the upper limit of the test instrument's display range (typically 299 MΩ on a 500 V tester) — a passing result; record as '>299' rather than the displayed numeral",
      "Ra <= 50V/IΔn — for a 30mA RCD this gives Ra <= 1667Ω; for 100mA <= 500Ω; in practice 200Ω is targeted as a stable upper limit",
    ],
    correctAnswer: 0,
    explanation:
      "Method 1 gives both R1 and R2 (useful for Zs calculation); Method 2 is faster but only confirms cpc continuity.",
    section: "5.2",
    difficulty: "intermediate",
  },
  {
    id: 113,
    question:
      "The ring final circuit continuity test (3-step method per GN3) checks:",
    options: [
      "Each test depends on the previous (continuity of CPC must be proven before IR can be interpreted; earthing must be proven before live tests rely on it; functional last because it confirms the whole system works)",
      "Step 1: end-to-end resistance of each conductor (r1, rn, r2). Step 2: cross-connect L outgoing to N return; measure L-N at each socket — should be ~constant. Step 3: cross-connect L outgoing to cpc return; measure L-cpc at each socket — gives R1+R2 for the ring",
      "Circuit ID, conductor csa (live + cpc), reference method, OCPD type/rating, R1+R2 (or R2), insulation resistance, polarity, Zs, RCD operating current and trip time, plus AFDD where fitted",
      "The insulation resistance is at or above the upper limit of the test instrument's display range (typically 299 MΩ on a 500 V tester) — a passing result; record as '>299' rather than the displayed numeral",
    ],
    correctAnswer: 1,
    explanation:
      "3-step method confirms ring is unbroken (no spurs/break) AND yields R1+R2 for Zs calculation. Step-2 readings should be roughly equal across all sockets.",
    section: "5.2",
    difficulty: "advanced",
  },
  {
    id: 114,
    question:
      "On a healthy 32A 2.5/1.5mm² ring final circuit ~50m long, expected r1 (end-to-end of one line conductor) is approximately:",
    options: [
      "That the requirements of BS 7671 have been met by inspection AND testing",
      "A spur, broken ring, or high-resistance joint at a socket — investigation required",
      "About 0.36-0.40Ω (50m × ~7.41mΩ/m ≈ 0.37Ω at 20°C; OSG mΩ/m table)",
      "Possess such knowledge and experience, or be under appropriate supervision",
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
      "An addition or alteration that does NOT extend an existing circuit by adding a new one",
      "The employer (with co-operation duties on the employee under s.7)",
      "Two-pole approved voltage indicator complying with GS38 (e.g. Martindale VI-13800, Drummond MTL10)",
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
      "Multiplier from Appendix 9 / GN3 (typically 1.20 for 70°C thermoplastic at full load) — giving Zs = Ze + ((R1+R2) × 1.20)",
      "Upstream RCD has higher IΔn AND time-delayed (Type S) characteristic, so downstream 30mA RCD trips first for downstream faults — preventing total supply loss",
      "Make safe (isolate, barrier, warn), then notify the duty holder in writing, then document on certification (Code C1 on EICR if applicable)",
      "Phase rotation/sequence (L1-L2-L3 = positive/clockwise rotation) using a phase-rotation indicator, especially before energising motors and rotating machinery",
    ],
    correctAnswer: 0,
    explanation:
      "Conductor resistance rises ~0.4%/K. Test at 20°C, operating ~70°C, so 50K rise => factor ~1.20.",
    section: "5.3",
    difficulty: "advanced",
  },
  {
    id: 117,
    question:
      "Insulation resistance test should be conducted between:",
    options: [
      "At the origin (Ipf) and at every relevant point — line-line, line-neutral, AND line-earth — taking the higher of L-N (Ipsc) and L-PE (Ipefc), recorded as Ipf",
      "Live conductors connected together to earth (preferred when SPDs present), AND between live and neutral with loads disconnected",
      "Investigate: check for loose terminations, broken cpc, damaged cable, parallel paths via metalwork — rectify before any live testing",
      "Sized per Table 54.1 (e.g. 16mm copper buried) considering protection against corrosion, and resistant to mechanical damage; minimum csa as per BS 7671",
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
      "The persons responsible for the design, construction, and inspection/testing of the installation (these may be the same person on small jobs)",
      "It is unreasonable in all the circumstances to make dead, AND it is reasonable to work live, AND suitable precautions are taken",
      "Insulation resistance values in parallel ADD as conductances (1/RT = 1/R1 + 1/R2 + ...), so a circuit with many parallel cables shows LOWER overall IR than each individual cable",
      "Identify circuit, switch off, secure isolation (lock and tag), prove voltage indicator on known live source, test for absence of voltage, re-prove on known live source",
    ],
    correctAnswer: 2,
    explanation:
      "Parallel insulation = parallel resistance to earth. Each additional parallel cable lowers the measured value, even if each cable is individually fine.",
    section: "5.5",
    difficulty: "intermediate",
  },
  {
    id: 119,
    question:
      "Effect of cable LENGTH on insulation resistance:",
    options: [
      "From the load side of the RCD between L and PE — at the furthest practicable point on each circuit it protects, with both 0° and 180° starting phase",
      "It is unreasonable in all the circumstances to make dead, AND it is reasonable to work live, AND suitable precautions are taken",
      "Continuity of protective conductors -> continuity of ring final conductors -> insulation resistance -> polarity (dead) -> earth electrode resistance (TT)",
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
      "Loss of supply to other tenants/users, loss of life-safety systems (fire alarm, emergency lighting), loss of refrigeration, loss of IT systems",
      "Identify circuit, switch off, secure isolation (lock and tag), prove voltage indicator on known live source, test for absence of voltage, re-prove on known live source",
      "Insulated tools, insulating mat, GS38 leads, arc-rated PPE, a competent accompanying person, barriers, and a documented procedure",
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
      "4V and 24V (per BS EN 61557-4) and a minimum short-circuit current of 200mA — to break through any film of oxide on connections",
      "Origin of the supply, every accessory (sockets, switches), and every Edison-screw lampholder (centre contact must be LINE)",
      "+/- 30% of measured value (allowing for instrument and test method uncertainty) — accounted for in BS 7671 Table 41.3 by use of Cmin = 0.95 and 80% rule",
      "After energising, that the supply polarity (line vs neutral) is as expected and consistent with dead-test polarity verification at all accessories",
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
      "Sized per Table 54.1 (e.g. 16mm copper buried) considering protection against corrosion, and resistant to mechanical damage; minimum csa as per BS 7671",
      "Circuit ID, conductor csa (live + cpc), reference method, OCPD type/rating, R1+R2 (or R2), insulation resistance, polarity, Zs, RCD operating current and trip time, plus AFDD where fitted",
      "Continuity test from L bus-bar at distribution board to LINE terminal of each accessory; from N bus-bar to NEUTRAL terminal; from MET to cpc terminal — proving correct identification at every termination",
      "Identify circuit, switch off, secure isolation (lock and tag), prove voltage indicator on known live source, test for absence of voltage, re-prove on known live source",
    ],
    correctAnswer: 2,
    explanation:
      "Dead-test polarity uses continuity verification from origin to load. Live polarity (Reg 643.6) repeats verification once energised.",
    section: "5.7",
    difficulty: "intermediate",
  },
  {
    id: 123,
    question:
      "Earth electrode resistance (Ra) for a TT installation can be measured by (per GN3 Section 2.10):",
    options: [
      "FAIL the verification — Icn < Ipf is C2 (potentially dangerous): MCBs cannot safely interrupt available fault current — replace devices or fit upstream backup fuse for energy limitation",
      "Non-compliant — Zs exceeds the A4:2026 maximum of 1.37 Ω; the circuit fails disconnection time and must be re-designed (larger conductor, RCD additional protection, or supplementary bonding) before energising",
      "Circuit ID, conductor csa (live + cpc), reference method, OCPD type/rating, R1+R2 (or R2), insulation resistance, polarity, Zs, RCD operating current and trip time, plus AFDD where fitted",
      "Three-point fall-of-potential method (most accurate, requires auxiliary spikes), OR earth fault loop impedance test method (Ze test on TT, gives an approximation including supply contribution), OR clamp-meter method (loop impedance via stake current/voltage)",
    ],
    correctAnswer: 3,
    explanation:
      "GN3 lists three methods. Fall-of-potential is most accurate but slow; loop method is quickest for routine checks.",
    section: "5.8",
    difficulty: "advanced",
  },
  {
    id: 124,
    question:
      "Polarity verification at three-phase distribution boards must additionally check:",
    options: [
      "Phase rotation/sequence (L1-L2-L3 = positive/clockwise rotation) using a phase-rotation indicator, especially before energising motors and rotating machinery",
      "Correct material and csa per Reg 543, secure connection at MET (BS 951 clamp) with a label per Reg 514.13.1, and protection against mechanical/corrosion damage",
      "Scope, sequence, hazards/controls, isolation strategy, PPE, instruments, competence of personnel, emergency arrangements",
      "To confirm the indicator was working immediately before AND immediately after the dead test, eliminating the risk of a faulty indicator giving a false dead reading",
    ],
    correctAnswer: 0,
    explanation:
      "Reverse phase rotation runs motors backwards — dangerous on pumps, lifts, conveyors. Phase rotation tester (typically 3 lamps + arrow) is essential.",
    section: "5.7",
    difficulty: "intermediate",
  },
  {
    id: 125,
    question:
      "Insulation resistance test, on a circuit incorporating an SPD, should be:",
    options: [
      "Be calculated by adiabatic equation S = sqrt(I²t)/k, OR selected from Table 54.7 (effectively the same csa as the line for cables up to 16mm²)",
      "At reduced voltage (250V) where SPD operating voltage may otherwise be exceeded — OR with the SPD temporarily disconnected, then re-test at full voltage if appropriate",
      "Scope, sequence, hazards/controls, isolation strategy, PPE, instruments, competence of personnel, emergency arrangements",
      "It is unreasonable in all the circumstances to make dead, AND it is reasonable to work live, AND suitable precautions are taken",
    ],
    correctAnswer: 1,
    explanation:
      "BS EN 61643 SPDs activate above their nominal voltage — applying 500V can spuriously trigger them and skew or damage the device. Disconnect or use 250V.",
    section: "5.4",
    difficulty: "advanced",
  },
  {
    id: 126,
    question:
      "Factors affecting conductor resistance (Reg 524 + Appendix 4) include:",
    options: [
      "Investigate further — record the value, isolate sub-circuits, and verify whether the low value reflects normal cable length or a developing fault",
      "It is unreasonable in all the circumstances to make dead, AND it is reasonable to work live, AND suitable precautions are taken",
      "Cross-sectional area, length, conductor material (copper vs aluminium ≈1.6×), and temperature (~0.4%/K rise above 20°C)",
      "Improvement recommended — does not represent immediate or potential danger but improvement would contribute to safety",
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
      "Standard or Enhanced fire-resistant cable (e.g. FP200 / Firetuf), separation from other circuits, and fire-rated supports/clips that survive collapse temperatures",
      "Use a single-pole MCB lock-off device with a personal padlock, the only key retained by the person doing the work, plus a caution notice",
      "Be calculated by adiabatic equation S = sqrt(I²t)/k, OR selected from Table 54.7 (effectively the same csa as the line for cables up to 16mm²)",
      "(R1+R2) for the ring = (r1 + r2)/4 — because the ring presents two parallel paths each containing both line and cpc series-connected, and parallel of two equal R = R/2",
    ],
    correctAnswer: 3,
    explanation:
      "Ring = two parallel paths each with (r1+r2). Parallel of two equal: (r1+r2)/2; but the test connects both in parallel for line AND cpc separately, giving the /4 factor.",
    section: "5.2",
    difficulty: "advanced",
  },
  {
    id: 128,
    question:
      "Variations in Step-2 (cross-connected ring) readings of more than ~0.05Ω between sockets typically indicate:",
    options: [
      "A spur, broken ring, or high-resistance joint at a socket — investigation required",
      "A new installation OR an addition/alteration that introduces a new circuit",
      "The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 — 5 years maximum",
      "6kA, 10kA, 16kA — selected to exceed measured Ipf at the point of installation per Reg 432.1",
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
      "L conductor -> fault -> cpc -> MET -> separate metallic earth conductor back to source transformer star point",
      "Sized per Table 54.1 (e.g. 16mm copper buried) considering protection against corrosion, and resistant to mechanical damage; minimum csa as per BS 7671",
      "Measure R2 from origin gland to far-end gland AND verify bonding of armour at BOTH ends (gland correctly tightened, banjo washer fitted)",
      "Pass — within 300ms maximum for general-purpose 30mA RCD per BS EN 61008/61009 (and Reg 643.7.3 verification)",
    ],
    correctAnswer: 1,
    explanation:
      "Buried earthing conductor must withstand corrosion and mechanical stress. Bare or PVC-sheathed copper is typical.",
    section: "5.8",
    difficulty: "intermediate",
  },
  {
    id: 130,
    question:
      "On a 100m steel-armoured cable installed underground supplying a remote outbuilding (TN-S-derived), the SWA may serve as the cpc provided:",
    options: [
      "Loop impedance, RCD trip time at 1×IΔn, AFDD presence (Y/N) and earthing arrangement (TN-S, TN-C-S/PNB, TT)",
      "Sized per Table 54.1 (e.g. 16mm copper buried) considering protection against corrosion, and resistant to mechanical damage; minimum csa as per BS 7671",
      "Adiabatic check (Reg 543.1.3) shows armour csa is sufficient: S >= sqrt(I²t)/k — and earth fault loop impedance verifies disconnection time is met",
      "Notify the occupant in advance, agree timings, identify life-safety equipment dependent on supply, plan temporary arrangements where required, document agreement",
    ],
    correctAnswer: 2,
    explanation:
      "SWA armour can be cpc but must pass the adiabatic check for fault current withstand and the loop impedance check for disconnection time.",
    section: "5.1",
    difficulty: "advanced",
  },
  {
    id: 131,
    question:
      "Polarity at the supply origin (Ze test point) is verified by:",
    options: [
      "Origin of the supply, every accessory (sockets, switches), and every Edison-screw lampholder (centre contact must be LINE)",
      "Disconnect/unplug sensitive electronics, link out (or accept loss of) MOVs, and test L+N joined to earth (rather than between L and N) to avoid damaging equipment",
      "Stopped, made safe, investigated for root cause, and reported per the company H&S policy and (if a dangerous occurrence) RIDDOR",
      "Confirming using approved voltage indicator that the LINE terminal carries supply voltage to earth/neutral, and the neutral does not — with installation isolated downstream",
    ],
    correctAnswer: 3,
    explanation:
      "DNO supply polarity occasionally swapped (e.g. after cable joints). Confirm at intake before relying on rest of the installation polarity tests.",
    section: "6.1",
    difficulty: "intermediate",
  },
  {
    id: 132,
    question:
      "Per Reg 543.1.1, the minimum csa of a separate cpc must:",
    options: [
      "Be calculated by adiabatic equation S = sqrt(I²t)/k, OR selected from Table 54.7 (effectively the same csa as the line for cables up to 16mm²)",
      "Further Investigation required without delay — inspector cannot conclude on safety without more information",
      "+/- 30% of measured value (allowing for instrument and test method uncertainty) — accounted for in BS 7671 Table 41.3 by use of Cmin = 0.95 and 80% rule",
      "FAIL — replace device. Test button only verifies the mechanical trip; instrument test verifies electrical detection of residual current",
    ],
    correctAnswer: 0,
    explanation:
      "Reg 543.1.1: adiabatic OR Table 54.7 (the simpler tabulated route for typical cable sizes).",
    section: "5.1",
    difficulty: "advanced",
  },
  {
    id: 133,
    question:
      "When testing IR on a circuit that cannot be safely disconnected from electronic loads, the recommended approach is:",
    options: [
      "Generally inferred from cable size, length, and design data; physical measurement only required if compliance is in doubt — limits are 3% (lighting) and 5% (other) of nominal",
      "Use 250V test voltage where the equipment manufacturer permits, OR test live conductors connected together to earth (without between live and neutral), interpreting accordingly",
      "Only sinusoidal AC residual currents — UNSUITABLE for circuits with electronic loads producing pulsating DC (most modern loads)",
      "Low-resistance ohmmeter (R2 method) from MET to the bonded service entry point — typically <0.05Ω; values significantly higher indicate poor connection",
    ],
    correctAnswer: 1,
    explanation:
      "Reduced voltage and modified test method are GN3 approved alternatives that protect equipment while still verifying insulation to earth.",
    section: "5.4",
    difficulty: "advanced",
  },
  {
    id: 134,
    question:
      "Continuity of main protective bonding to extraneous conductive parts (gas, water, steel) should be verified by:",
    options: [
      "That the line and CPC of the ring are continuous and unbroken — high or open readings indicate a broken conductor at one of the accessory terminations",
      "Avoids the test voltage appearing across the SPD (which is L-N or L-PE) potentially triggering or damaging it",
      "Low-resistance ohmmeter (R2 method) from MET to the bonded service entry point — typically <0.05Ω; values significantly higher indicate poor connection",
      "A calibration check box (e.g. resistance check unit, test box) at intervals — and at each suspected damage event — to confirm continued accuracy between calibrations",
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
      "Method 1 (R1+R2 — link line and cpc at distribution board, measure end-to-end at each accessory) and Method 2 (R2 only — using a long lead with one end at the MET)",
      "Design drawings, specifications, BS 7671, GN3, manufacturer instructions, previous EICR (if alteration), and risk assessment/method statement",
      "Sight, hearing (e.g. arcing/buzzing), smell (e.g. burning insulation), touch (carefully — for excessive temperature) — never taste",
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
      "Meets the minimum but warrants investigation per GN3 — sectional testing and visual inspection to determine if it represents normal length-related leakage or a developing fault",
      "That the line and CPC of the ring are continuous and unbroken — high or open readings indicate a broken conductor at one of the accessory terminations",
      "Standard or Enhanced fire-resistant cable (e.g. FP200 / Firetuf), separation from other circuits, and fire-rated supports/clips that survive collapse temperatures",
      "Sight, hearing (e.g. arcing/buzzing), smell (e.g. burning insulation), touch (carefully — for excessive temperature) — never taste",
    ],
    correctAnswer: 0,
    explanation:
      "1MΩ is the minimum; values at or near it on short circuits indicate a problem. Long circuits may legitimately approach the limit.",
    section: "5.4",
    difficulty: "intermediate",
  },
  {
    id: 137,
    question:
      "Test instruments for continuity testing must have the LIMP (low impedance) setting ON when testing:",
    options: [
      "Only sinusoidal AC residual currents — UNSUITABLE for circuits with electronic loads producing pulsating DC (most modern loads)",
      "Through devices that may give nuisance trips on standard test current — and the reading interpreted with awareness of the test current limit",
      "The installation has been designed, constructed, inspected and tested in accordance with BS 7671 and is safe to be energised and put into service",
      "A calibration check box (e.g. resistance check unit, test box) at intervals — and at each suspected damage event — to confirm continued accuracy between calibrations",
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
      "Spacing per OSG Table 4.5/4.6, mechanical protection at penetrations, fire-stopping at floor/wall penetrations (Reg 527.2), and capping/grommets where cables enter enclosures",
      "Type (rod / plate / mat), accessibility for measurement (test link), corrosion, label per Reg 514.13.1, and a measured Ra giving compliant Zs at the furthest point",
      "Measure R2 from origin gland to far-end gland AND verify bonding of armour at BOTH ends (gland correctly tightened, banjo washer fitted)",
      "Sight, hearing (e.g. arcing/buzzing), smell (e.g. burning insulation), touch (carefully — for excessive temperature) — never taste",
    ],
    correctAnswer: 2,
    explanation:
      "SWA armour cpc relies on glanding at both ends. Loose gland or missing banjo invalidates the cpc continuity.",
    section: "5.1",
    difficulty: "advanced",
  },
  {
    id: 139,
    question:
      "Polarity of an AC-supplied USB charging socket installed by another contractor is verified by:",
    options: [
      "Golden thread of digital information including electrical certification, accountability through dutyholder roles, and AFDD-related design considerations",
      "Achieve appropriate resolution and accuracy for the value being measured, AND avoid false trip/damage to RCD-protected circuits",
      "Sinusoidal AC AND pulsating DC residual currents (covers most domestic/commercial electronic loads). Default per Reg 531.3.3",
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
      "A spur, broken ring, or high-resistance joint at a socket — investigation required",
      "About 0.59Ω (R1: 30m × 7.41mΩ = 0.222Ω; R2: 30m × 12.10mΩ = 0.363Ω; total 0.585Ω)",
      "The employer (with co-operation duties on the employee under s.7)",
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
      "Physical separation OR equivalent insulation OR an earthed metallic screen — to prevent transfer of mains potential into ELV circuits",
      "Light works but lampholder/luminaire body remains at line potential when switch is OFF — major shock risk during lamp change",
      "Notify Building Control (or use a Competent Person Scheme) for new circuits, consumer unit replacements, and special-location work",
      "Insulation of live parts (Reg 416.1), barriers/enclosures to at least IPXXB/IP2X (Reg 416.2), and obstacles/placing out of reach where applicable",
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
      "6kA, 10kA, 16kA — selected to exceed measured Ipf at the point of installation per Reg 432.1",
      "Use a single-pole MCB lock-off device with a personal padlock, the only key retained by the person doing the work, plus a caution notice",
      "About 0.79Ω (R1: 80m × 4.61mΩ = 0.369Ω; R2 of armour for 4mm² SWA ~ 5.20 mΩ/m × 80m = 0.416Ω; total ~0.785Ω)",
      "Two-pole approved voltage indicator complying with GS38 (e.g. Martindale VI-13800, Drummond MTL10)",
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
      "Re-prove dead independently using their own GS38 voltage indicator and known live proving unit",
      "Scope, sequence, hazards/controls, isolation strategy, PPE, instruments, competence of personnel, emergency arrangements",
      "A SINGLE AC test at 1×IΔn (the 5×IΔn test was DELETED in A4:2026; functional check via test button still required)",
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
      "Code C2 / refuse certification + recommend conversion to TT supply with RCD additional protection AND notification to dutyholder/installer",
      "Electric shock, arc flash/burn, secondary injuries from involuntary reaction, fire, falls from height, and trip hazards from leads",
      "Physical separation OR equivalent insulation OR an earthed metallic screen — to prevent transfer of mains potential into ELV circuits",
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
      "Equipment producing smooth DC residual current (e.g. EV chargers without separation, three-phase VSDs/inverters) per Reg 531.3.3 / 722.531.3.101",
      "Disturbing existing terminations may have loosened them; the cpc integrity of the whole circuit (origin to all accessories) must be re-confirmed before energising",
      "Continuity test from L bus-bar at distribution board to LINE terminal of each accessory; from N bus-bar to NEUTRAL terminal; from MET to cpc terminal — proving correct identification at every termination",
      "Non-compliant — Zs exceeds the A4:2026 maximum of 1.37 Ω; the circuit fails disconnection time and must be re-designed (larger conductor, RCD additional protection, or supplementary bonding) before energising",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 643.1.2 requires re-test of preceding tests after rectification — same logic for alteration work.",
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
      "Mechanically protected (capping/conduit), OR enclosed in earthed metallic covering, OR provided with 30mA RCD additional protection",
      "Battery condition, lead/probe integrity (no cracks, exposed metal), zero/null function (continuity), calibration date, and against a known reference where applicable",
      "After energising, that the supply polarity (line vs neutral) is as expected and consistent with dead-test polarity verification at all accessories",
      "Measure R2 from origin gland to far-end gland AND verify bonding of armour at BOTH ends (gland correctly tightened, banjo washer fitted)",
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
      "A SINGLE AC test at 1×IΔn (the 5×IΔn test was DELETED in A4:2026; functional check via test button still required)",
      "From the load side of the RCD between L and PE — at the furthest practicable point on each circuit it protects, with both 0° and 180° starting phase",
      "Loss of supply to other tenants/users, loss of life-safety systems (fire alarm, emergency lighting), loss of refrigeration, loss of IT systems",
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
      "Calculation from supply transformer impedance and cable parameters; OR use of DNO declared values (e.g. 16kA at typical urban supply origin)",
      "An addition or alteration that does NOT extend an existing circuit by adding a new one",
      "Identify previously coded defects, recommended improvements, and any limitations — to inform scope and expected condition",
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
      "Electrical hazards, working at height, manual handling, slips/trips, lone working, occupant disruption, and emergency arrangements",
      "L -> fault -> cpc -> MET -> combined PEN (neutral) conductor back to transformer (PEN bonded to earth at supply)",
      "Stopped, made safe, investigated for root cause, and reported per the company H&S policy and (if a dangerous occurrence) RIDDOR",
      "It is unreasonable in all the circumstances to make dead, AND it is reasonable to work live, AND suitable precautions are taken",
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
      "4V and 24V (per BS EN 61557-4) and a minimum short-circuit current of 200mA — to break through any film of oxide on connections",
      "It is unreasonable in all the circumstances to make dead, AND it is reasonable to work live, AND suitable precautions are taken",
      "L -> fault -> cpc -> MET -> earth electrode -> earth (soil) -> DNO supply electrode -> back to transformer",
      "30mA RCD additional protection per Reg 753.415.1, and floor-temperature limiter to prevent damage to floor coverings",
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
      "Disconnect/unplug sensitive electronics, link out (or accept loss of) MOVs, and test L+N joined to earth (rather than between L and N) to avoid damaging equipment",
      "RECOMMENDED for final circuits supplying socket-outlets in HRRBs, care homes, student accommodation, and similar — per Building Safety Act 2022 dutyholder duties",
      "(R1+R2) for the ring = (r1 + r2)/4 — because the ring presents two parallel paths each containing both line and cpc series-connected, and parallel of two equal R = R/2",
      "For TN: measured Zs at every furthest point gives a fault current (U0/Zs) that operates the OCPD within the required disconnection time per Reg 411.3.2; OR a 30mA RCD is fitted",
    ],
    correctAnswer: 3,
    explanation: "ADS = OCPD operates fast enough OR RCD provides fault disconnection. Either path acceptable but must be verified.",
    section: "6.4",
    difficulty: "intermediate",
  },
  {
    id: 152,
    question: "The RCD test per BS 7671 Reg 643.7.3 (A4:2026) requires:",
    options: [
      "A SINGLE AC test at 1×IΔn — measured trip time must be within published maximum (BS EN 61008/61009: 300ms general purpose). 5×IΔn was DELETED",
      "30mA RCD additional protection per Reg 753.415.1, and floor-temperature limiter to prevent damage to floor coverings",
      "Socket-outlets up to 32A intended for general use, AND mobile equipment up to 32A used outdoors, AND cables concealed in walls below 50mm without other protection",
      "For TN: measured Zs at every furthest point gives a fault current (U0/Zs) that operates the OCPD within the required disconnection time per Reg 411.3.2; OR a 30mA RCD is fitted",
    ],
    correctAnswer: 0,
    explanation: "A4:2026 reform: only 1×IΔn at 0° AND 180° required for verification. The 5×IΔn test was removed from Reg 643.7.3.",
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
      "Upstream RCD has higher IΔn AND time-delayed (Type S) characteristic, so downstream 30mA RCD trips first for downstream faults — preventing total supply loss",
      "Equipment producing smooth DC residual current (e.g. EV chargers without separation, three-phase VSDs/inverters) per Reg 531.3.3 / 722.531.3.101",
      "From the load side of the RCD between L and PE — at the furthest practicable point on each circuit it protects, with both 0° and 180° starting phase",
      "<= 80% of Table 41.3 maximum to allow for instrument uncertainty (typically +/- 30% for loop testers) and temperature rise above test temperature",
    ],
    correctAnswer: 2,
    explanation: "Phase angle affects waveform application; testing at both 0° and 180° catches asymmetry in the RCD trip mechanism.",
    section: "6.8",
    difficulty: "intermediate",
  },
  {
    id: 155,
    question: "Type AC RCDs detect:",
    options: [
      "Method 1 (R1+R2 — link line and cpc at distribution board, measure end-to-end at each accessory) and Method 2 (R2 only — using a long lead with one end at the MET)",
      "For the lifetime of the installation, by both the issuer and the recipient — and made available to subsequent inspectors",
      "Switch off and lock off the main switch first to prevent the touch-voltage hazard arising if a fault develops while the earth is removed",
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
      "Sinusoidal AC AND pulsating DC residual currents (covers most domestic/commercial electronic loads). Default per Reg 531.3.3",
      "Improvement recommended — does not represent immediate or potential danger but improvement would contribute to safety",
      "Investigate further — record the value, isolate sub-circuits, and verify whether the low value reflects normal cable length or a developing fault",
      "Type (BS EN 60898-1 MCB / BS 88-3 fuse / BS EN 61009 RCBO), rating (In), breaking capacity (Icn/Icu) suitable for Ipf, and selectivity with upstream",
    ],
    correctAnswer: 0,
    explanation: "Type A is the modern default. Required for circuits with switch-mode power supplies, dimmers, electronic ballasts.",
    section: "6.8",
    difficulty: "intermediate",
  },
  {
    id: 157,
    question: "Type B RCDs are required for circuits supplying:",
    options: [
      "Code C2 / refuse certification + recommend conversion to TT supply with RCD additional protection AND notification to dutyholder/installer",
      "Equipment producing smooth DC residual current (e.g. EV chargers without separation, three-phase VSDs/inverters) per Reg 531.3.3 / 722.531.3.101",
      "Cross-sectional area, length, conductor material (copper vs aluminium ≈1.6×), and temperature (~0.4%/K rise above 20°C)",
      "Sized per Table 54.1 (e.g. 16mm copper buried) considering protection against corrosion, and resistant to mechanical damage; minimum csa as per BS 7671",
    ],
    correctAnswer: 1,
    explanation: "Type B detects smooth DC fault currents that blind Types AC and A. Mandatory on EV chargers without an isolating transformer.",
    section: "6.8",
    difficulty: "advanced",
  },
  {
    id: 158,
    question: "AFDD test per Reg 643.7.4 (A4:2026):",
    options: [
      "Be CAT-rated equal to or greater than the instrument, GS38 compliant, with shroud, fused tips and clearly visible insulation integrity",
      "A loose neutral connection (high-resistance N) shifting the star point — confirm with N-E and L-N tests, then isolate, prove dead, and remake the neutral termination",
      "Functional check via integral test button at commissioning AND at periodic intervals (per manufacturer); operational testing of arc detection requires OEM-specific equipment",
      "Each test depends on the previous (continuity of CPC must be proven before IR can be interpreted; earthing must be proven before live tests rely on it; functional last because it confirms the whole system works)",
    ],
    correctAnswer: 2,
    explanation: "AFDD verification is limited to test-button operation in BS 7671. The arc-detection algorithm cannot be replicated by standard test instruments.",
    section: "6.8",
    difficulty: "advanced",
  },
  {
    id: 159,
    question: "Per Reg 421.1.7 (A4:2026), AFDDs are:",
    options: [
      "Improvement recommended — does not represent immediate or potential danger but improvement would contribute to safety",
      "An individual circuit with Type B RCD (or Type A + RDC-DD) per Reg 722.531.3.101 to detect smooth DC residual currents",
      "1.37Ω (the value moved to 1.37Ω with the introduction of the Cmin = 0.95 multiplier; 1.44Ω is the old pre-Cmin value)",
      "RECOMMENDED for final circuits supplying socket-outlets in HRRBs, care homes, student accommodation, and similar — per Building Safety Act 2022 dutyholder duties",
    ],
    correctAnswer: 3,
    explanation: "Verbatim Reg 421.1.7: recommendation in BS 7671. In HRRBs the BSA 2022 dutyholder regime makes AFDDs effectively required as part of safe design.",
    section: "6.4",
    difficulty: "advanced",
  },
  {
    id: 160,
    question: "Prospective fault current Ipf measurement per Reg 643.7.3.201 (A4:2026 - PFC) must be made:",
    options: [
      "At the origin (Ipf) and at every relevant point — line-line, line-neutral, AND line-earth — taking the higher of L-N (Ipsc) and L-PE (Ipefc), recorded as Ipf",
      "Mechanically protected (capping/conduit), OR enclosed in earthed metallic covering, OR provided with 30mA RCD additional protection",
      "It is unreasonable in all the circumstances to make dead, AND it is reasonable to work live, AND suitable precautions are taken",
      "Circuit ID, conductor csa (live + cpc), reference method, OCPD type/rating, R1+R2 (or R2), insulation resistance, polarity, Zs, RCD operating current and trip time, plus AFDD where fitted",
    ],
    correctAnswer: 0,
    explanation: "PFC governs OCPD breaking capacity. Both PSCC (L-N short) and EFLC (L-PE) measured; higher = Ipf. Recorded on EIC.",
    section: "6.5",
    difficulty: "advanced",
  },
  {
    id: 161,
    question: "Standard breaking capacity (Icn) for BS EN 60898 MCBs commonly available:",
    options: [
      "Re-prove dead independently using their own GS38 voltage indicator and known live proving unit",
      "6kA, 10kA, 16kA — selected to exceed measured Ipf at the point of installation per Reg 432.1",
      "Tick (acceptable), N/A (not applicable), LIM (limitation), or appropriate code — accompanied by an overall declaration",
      "30mA RCD additional protection per Reg 753.415.1, and floor-temperature limiter to prevent damage to floor coverings",
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
      "Compliant with BS EN 61557 (safety + functional standard for low-voltage test equipment), CAT III/IV rated, calibrated annually, with GS38 leads",
      "Because PNB has the neutral and earth bonded only at the consumer's intake (not the DNO source), giving different fault path characteristics that the inspector must record",
      "FAIL the verification — Icn < Ipf is C2 (potentially dangerous): MCBs cannot safely interrupt available fault current — replace devices or fit upstream backup fuse for energy limitation",
      "Each test depends on the previous (continuity of CPC must be proven before IR can be interpreted; earthing must be proven before live tests rely on it; functional last because it confirms the whole system works)",
    ],
    correctAnswer: 2,
    explanation: "MCB rated below available Ipf can fail explosively under fault. Reg 432.1 violation; remedy via backup fuse (BS 88) or higher Icn devices.",
    section: "6.7",
    difficulty: "advanced",
  },
  {
    id: 163,
    question: "Methods for determining PFC where instrument testing is impractical (e.g. high-current supplies):",
    options: [
      "Investigate: check for loose terminations, broken cpc, damaged cable, parallel paths via metalwork — rectify before any live testing",
      "ADS device type, settings, presence of cpc throughout, equipotential bonding (main and supplementary where required), and any additional protection (30mA RCD)",
      "Sized per Table 54.8 (TN-C-S 10mm minimum, TN-S/TT half csa of earthing conductor, with absolute minimum 6mm copper)",
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
      "L1-L2-L3 positive (clockwise) rotation using a phase rotation indicator — to ensure motors run in correct direction at first energisation",
      "Code C2 / refuse certification + recommend conversion to TT supply with RCD additional protection AND notification to dutyholder/installer",
      "Loop impedance, RCD trip time at 1×IΔn, AFDD presence (Y/N) and earthing arrangement (TN-S, TN-C-S/PNB, TT)",
      "Calculation from supply transformer impedance and cable parameters; OR use of DNO declared values (e.g. 16kA at typical urban supply origin)",
    ],
    correctAnswer: 0,
    explanation: "Wrong rotation runs motors backwards; for pumps/fans/compressors potentially destructive. Always test BEFORE energising rotating loads.",
    section: "6.10",
    difficulty: "intermediate",
  },
  {
    id: 165,
    question: "Functional testing per Reg 643.10 includes confirming:",
    options: [
      "Identify circuit, switch off, secure isolation (lock and tag), prove voltage indicator on known live source, test for absence of voltage, re-prove on known live source",
      "Switchgear operates correctly, controls (timers, sensors, contactors) function as designed, interlocks engage, RCDs/RCBOs trip via test button, and emergency systems operate",
      "Code C2 / refuse certification + recommend conversion to TT supply with RCD additional protection AND notification to dutyholder/installer",
      "Each test relies on the integrity of a previous test (e.g. IR cannot be safely interpreted without continuity of cpc; live tests require dead-test confirmation of earthing)",
    ],
    correctAnswer: 1,
    explanation: "Functional = end-to-end system verification of every operating item. Final acceptance test before handover.",
    section: "6.11",
    difficulty: "intermediate",
  },
  {
    id: 166,
    question: "When dealing with clients during commissioning and certification, the inspector should:",
    options: [
      "Of non-combustible material (e.g. metal) OR enclosed in a non-combustible cabinet — to limit fire spread from the consumer unit",
      "Disconnect/unplug sensitive electronics, link out (or accept loss of) MOVs, and test L+N joined to earth (rather than between L and N) to avoid damaging equipment",
      "Communicate clearly and professionally; explain results, defects (with codes), recommended actions, retention of documentation, and limitations — and confirm in writing",
      "Use a single-pole MCB lock-off device with a personal padlock, the only key retained by the person doing the work, plus a caution notice",
    ],
    correctAnswer: 2,
    explanation: "Customer relationship is part of the job. Plain-English explanation of EICR codes and recommendations supports informed decisions.",
    section: "6.13",
    difficulty: "basic",
  },
  {
    id: 167,
    question: "Earth fault loop impedance Zs measured directly using an MFT loop tester is:",
    options: [
      "Ze (external loop) + R1 (line cpc to fault) + R2 (cpc to MET) at operating temperature — abbreviated Zs = Ze + (R1+R2)cor",
      "Phase rotation/sequence (L1-L2-L3 = positive/clockwise rotation) using a phase-rotation indicator, especially before energising motors and rotating machinery",
      "For TN: measured Zs at every furthest point gives a fault current (U0/Zs) that operates the OCPD within the required disconnection time per Reg 411.3.2; OR a 30mA RCD is fitted",
      "Typically the LIVE Zs reading INCLUDING parallel earth paths from extraneous bonded metalwork — and may be lower than calculated Zs from Ze + (R1+R2)",
    ],
    correctAnswer: 3,
    explanation: "Live Zs benefits from parallel paths; calculated Zs from Ze + (R1+R2) is the worst-case design value. Both used in compliance check.",
    section: "6.4",
    difficulty: "advanced",
  },
  {
    id: 168,
    question: "Test results meeting standard values (Reg 643.1.1) are essential because:",
    options: [
      "Below-minimum or above-maximum values indicate a fault that prevents the protective measure from operating as designed — risking shock, fire, or equipment damage",
      "Each apply their own personal padlock so the isolation cannot be removed until ALL workers have removed their padlocks",
      "Final circuits supplying socket-outlets in higher-risk residential buildings (HRRBs), care homes, student accommodation, etc. (recommendation, not absolute requirement, in non-HRRB)",
      "Ra <= 50V/IΔn — for a 30mA RCD this gives Ra <= 1667Ω; for 100mA <= 500Ω; in practice 200Ω is targeted as a stable upper limit",
    ],
    correctAnswer: 0,
    explanation: "Standard values are the design margins. Non-compliance = ADS or insulation failure under fault.",
    section: "4.4",
    difficulty: "basic",
  },
  {
    id: 169,
    question: "For confirming polarity of an incoming supply at a TT installation, the inspector must:",
    options: [
      "L -> fault -> cpc -> MET -> combined PEN (neutral) conductor back to transformer (PEN bonded to earth at supply)",
      "Confirm L-PE = nominal voltage (~230V), N-PE = small voltage (typically <5V), and L-N = nominal — using approved voltage indicator at the cut-out or main switch",
      "Each apply their own personal padlock so the isolation cannot be removed until ALL workers have removed their padlocks",
      "Type (1/2/3 per BS EN 61643-11), correct location relative to ADS, status indicator (green = OK), and connection lead lengths kept short (<0.5m total recommended)",
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
      "About 0.79Ω (R1: 80m × 4.61mΩ = 0.369Ω; R2 of armour for 4mm² SWA ~ 5.20 mΩ/m × 80m = 0.416Ω; total ~0.785Ω)",
      "Switch off and lock off the main switch first to prevent the touch-voltage hazard arising if a fault develops while the earth is removed",
      "Pass — within 300ms maximum for general-purpose 30mA RCD per BS EN 61008/61009 (and Reg 643.7.3 verification)",
      "It is unreasonable in all the circumstances to make dead, AND it is reasonable to work live, AND suitable precautions are taken",
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
      "+/- 30% of measured value (allowing for instrument and test method uncertainty) — accounted for in BS 7671 Table 41.3 by use of Cmin = 0.95 and 80% rule",
      "Switch off and lock off the main switch first to prevent the touch-voltage hazard arising if a fault develops while the earth is removed",
      "Be CAT-rated equal to or greater than the instrument, GS38 compliant, with shroud, fused tips and clearly visible insulation integrity",
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
      "FAIL — exceeds max. Investigation: increase cpc csa, reduce length, fit RCD additional protection, or replace with Type B at higher rating that accepts Zs",
      "Correct material and csa per Reg 543, secure connection at MET (BS 951 clamp) with a label per Reg 514.13.1, and protection against mechanical/corrosion damage",
      "Preferably before, but in any case prior to, testing — and as far as reasonably practicable with the installation isolated",
      "Measure R2 from origin gland to far-end gland AND verify bonding of armour at BOTH ends (gland correctly tightened, banjo washer fitted)",
    ],
    correctAnswer: 0,
    explanation: "1.55Ω > 1.37Ω = ADS too slow under fault. Remediation: up-size cpc OR fit 30mA RCD additional protection.",
    section: "6.4",
    difficulty: "advanced",
  },
  {
    id: 173,
    question: "The 80% rule for measured Zs (Reg 643.7.3 informative) suggests measured Zs should be:",
    options: [
      "Electrical hazards, working at height, manual handling, slips/trips, lone working, occupant disruption, and emergency arrangements",
      "<= 80% of Table 41.3 maximum to allow for instrument uncertainty (typically +/- 30% for loop testers) and temperature rise above test temperature",
      "+/- 30% of measured value (allowing for instrument and test method uncertainty) — accounted for in BS 7671 Table 41.3 by use of Cmin = 0.95 and 80% rule",
      "After energising, that the supply polarity (line vs neutral) is as expected and consistent with dead-test polarity verification at all accessories",
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
      "Use the no-trip / 15mA / lower-current loop test mode (modern MFTs have this), accepting slightly reduced accuracy in exchange for non-tripping",
      "Calculation from supply transformer impedance and cable parameters; OR use of DNO declared values (e.g. 16kA at typical urban supply origin)",
      "FAIL — contactor showing signs of distress (worn contacts, coil insulation degrading); investigate and rectify before energising in service",
      "A SINGLE AC test at 1×IΔn — measured trip time must be within published maximum (BS EN 61008/61009: 300ms general purpose). 5×IΔn was DELETED",
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
      "Insulated tools, insulating mat, GS38 leads, arc-rated PPE, a competent accompanying person, barriers, and a documented procedure",
      "1.37Ω (the value moved to 1.37Ω with the introduction of the Cmin = 0.95 multiplier; 1.44Ω is the old pre-Cmin value)",
      "Type (BS EN 60898-1 MCB / BS 88-3 fuse / BS EN 61009 RCBO), rating (In), breaking capacity (Icn/Icu) suitable for Ipf, and selectivity with upstream",
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
      "Upstream RCD has higher IΔn AND time-delayed (Type S) characteristic, so downstream 30mA RCD trips first for downstream faults — preventing total supply loss",
      "To detect faults (short circuits, mis-wiring, low IR, missing CPC) BEFORE applying voltage that could cause shock, fire, or equipment damage",
      "Mechanically protected (capping/conduit), OR enclosed in earthed metallic covering, OR provided with 30mA RCD additional protection",
      "L1-L2-L3 positive (clockwise) rotation using a phase rotation indicator — to ensure motors run in correct direction at first energisation",
    ],
    correctAnswer: 0,
    explanation: "Selective coordination: 100mA Type S upstream + 30mA downstream = downstream operates first on its own zone fault.",
    section: "6.7",
    difficulty: "advanced",
  },
  {
    id: 177,
    question: "Phase sequence reversal on a 3-phase induction motor will cause:",
    options: [
      "Sized per Table 54.1 (e.g. 16mm copper buried) considering protection against corrosion, and resistant to mechanical damage; minimum csa as per BS 7671",
      "Motor to run in REVERSE direction — potentially destructive on pumps, fans, compressors, lifts; trips on overload often follow",
      "Same dead-polarity test as a standard socket (line at LINE terminal); functional check via charging a known device confirms output polarity",
      "Adiabatic check (Reg 543.1.3) shows armour csa is sufficient: S >= sqrt(I²t)/k — and earth fault loop impedance verifies disconnection time is met",
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
      "Light works but lampholder/luminaire body remains at line potential when switch is OFF — major shock risk during lamp change",
      "Mechanically protected (capping/conduit), OR enclosed in earthed metallic covering, OR provided with 30mA RCD additional protection",
      "Socket-outlets up to 32A intended for general use, AND mobile equipment up to 32A used outdoors, AND cables concealed in walls below 50mm without other protection",
      "Of non-combustible material (e.g. metal) OR enclosed in a non-combustible cabinet — to limit fire spread from the consumer unit",
    ],
    correctAnswer: 2,
    explanation: "Reg 415.1.1: additional protection at 30mA for typical user-touched circuits. A4:2026 retains this.",
    section: "6.8",
    difficulty: "intermediate",
  },
  {
    id: 179,
    question: "Test sequence for an RCBO (combined RCD + MCB) verifies:",
    options: [
      "Arc-rated clothing matched to the prospective incident energy, insulated gloves rated to the working voltage, eye/face protection, and insulated footwear",
      "C2 (potentially dangerous) — IR below 1 MΩ minimum means insulation has failed; aged rubber compounds especially prone to deterioration; replacement recommended",
      "For TN: measured Zs at every furthest point gives a fault current (U0/Zs) that operates the OCPD within the required disconnection time per Reg 411.3.2; OR a 30mA RCD is fitted",
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
      "About 0.79Ω (R1: 80m × 4.61mΩ = 0.369Ω; R2 of armour for 4mm² SWA ~ 5.20 mΩ/m × 80m = 0.416Ω; total ~0.785Ω)",
      "1.37Ω (the value moved to 1.37Ω with the introduction of the Cmin = 0.95 multiplier; 1.44Ω is the old pre-Cmin value)",
      "A SINGLE AC test at 1×IΔn (the 5×IΔn test was DELETED in A4:2026; functional check via test button still required)",
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
      "Sized per Table 54.1 (e.g. 16mm copper buried) considering protection against corrosion, and resistant to mechanical damage; minimum csa as per BS 7671",
      "Code C2 / refuse certification + recommend conversion to TT supply with RCD additional protection AND notification to dutyholder/installer",
      "Stopped, made safe, investigated for root cause, and reported per the company H&S policy and (if a dangerous occurrence) RIDDOR",
      "The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 — 5 years maximum",
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
      "Confirm L-PE = nominal voltage (~230V), N-PE = small voltage (typically <5V), and L-N = nominal — using approved voltage indicator at the cut-out or main switch",
      "Final circuits supplying socket-outlets in higher-risk residential buildings (HRRBs), care homes, student accommodation, etc. (recommendation, not absolute requirement, in non-HRRB)",
      "Each input/output operates per design, interlocks function, emergency stop activates correctly with safety-rated contactors, and timing/sequencing matches the specification",
      "Correct material and csa per Reg 543, secure connection at MET (BS 951 clamp) with a label per Reg 514.13.1, and protection against mechanical/corrosion damage",
    ],
    correctAnswer: 2,
    explanation: "Modern control systems are software + hardware; functional commissioning is structured against the design specification.",
    section: "6.11",
    difficulty: "intermediate",
  },
  {
    id: 183,
    question: "Voltage drop verification per Reg 643 / 525.202:",
    options: [
      "C2 (potentially dangerous) — broken PEN risk in prohibited environments creates touch voltage hazard; inspector recommends conversion to TT",
      "Golden thread of digital information including electrical certification, accountability through dutyholder roles, and AFDD-related design considerations",
      "Correct material and csa per Reg 543, secure connection at MET (BS 951 clamp) with a label per Reg 514.13.1, and protection against mechanical/corrosion damage",
      "Generally inferred from cable size, length, and design data; physical measurement only required if compliance is in doubt — limits are 3% (lighting) and 5% (other) of nominal",
    ],
    correctAnswer: 3,
    explanation: "Voltage drop is normally a design check; measurement only when there is reason to believe a deviation exists.",
    section: "6.11",
    difficulty: "intermediate",
  },
  {
    id: 184,
    question: "On an EICR, an installation on TN-C-S supply but connected to a swimming pool/marina/agricultural building violating Section 705/709/721 is coded:",
    options: [
      "C2 (potentially dangerous) — broken PEN risk in prohibited environments creates touch voltage hazard; inspector recommends conversion to TT",
      "An individual circuit with Type B RCD (or Type A + RDC-DD) per Reg 722.531.3.101 to detect smooth DC residual currents",
      "From the load side of the RCD between L and PE — at the furthest practicable point on each circuit it protects, with both 0° and 180° starting phase",
      "The installation has been designed, constructed, inspected and tested in accordance with BS 7671 and is safe to be energised and put into service",
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
      "Multiplier from Appendix 9 / GN3 (typically 1.20 for 70°C thermoplastic at full load) — giving Zs = Ze + ((R1+R2) × 1.20)",
      "C2 (potentially dangerous) — IR below 1 MΩ minimum means insulation has failed; aged rubber compounds especially prone to deterioration; replacement recommended",
      "Arc-rated clothing matched to the prospective incident energy, insulated gloves rated to the working voltage, eye/face protection, and insulated footwear",
      "+/- 30% of measured value (allowing for instrument and test method uncertainty) — accounted for in BS 7671 Table 41.3 by use of Cmin = 0.95 and 80% rule",
    ],
    correctAnswer: 1,
    explanation: "0.3MΩ << 1MΩ minimum. Aged rubber loses elasticity and conductivity rises. C2 unless an immediate shock/fire hazard exists then C1.",
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
      "Switchgear, controlgear, drives, controls, interlocks, monitoring devices etc. — verifying they operate as intended including after the protective device test",
      "Recorded explicitly on the report so the reader understands the scope of what was NOT inspected and the implications",
      "Notify the occupant in advance, agree timings, identify life-safety equipment dependent on supply, plan temporary arrangements where required, document agreement",
      "Recommended for final circuits in dwellings, with mandatory installation in higher-risk residential buildings (HRRBs) under the Building Safety Act 2022",
    ],
    correctAnswer: 3,
    explanation: "Reg 421.1.7 was relaxed in A4:2026 — BS 7671 now 'recommends' AFDDs on certain final circuits. Mandatory deployment in HRRBs comes from the Building Safety Act 2022, not BS 7671 itself.",
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
      "The employer (with co-operation duties on the employee under s.7)",
      "1×IΔn only — the 5×IΔn AC test was deleted in Amendment 4:2026",
      "IP44 minimum (IP54/IP55 in dustier or wetter areas) per Reg 705.512.2",
      "Authorises work on equipment confirmed dead and earthed",
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
      "Light works but lampholder/luminaire body remains at line potential when switch is OFF — major shock risk during lamp change",
      "Mechanically protected (capping/conduit), OR enclosed in earthed metallic covering, OR provided with 30mA RCD additional protection",
      "Loop impedance, RCD trip time at 1×IΔn, AFDD presence (Y/N) and earthing arrangement (TN-S, TN-C-S/PNB, TT)",
      "Tick (acceptable), N/A (not applicable), LIM (limitation), or appropriate code — accompanied by an overall declaration",
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
      "Multiplier from Appendix 9 / GN3 (typically 1.20 for 70°C thermoplastic at full load) — giving Zs = Ze + ((R1+R2) × 1.20)",
      "For the lifetime of the installation, by both the issuer and the recipient — and made available to subsequent inspectors",
      "A loose neutral connection (high-resistance N) shifting the star point — confirm with N-E and L-N tests, then isolate, prove dead, and remake the neutral termination",
      "Because PNB has the neutral and earth bonded only at the consumer's intake (not the DNO source), giving different fault path characteristics that the inspector must record",
    ],
    correctAnswer: 3,
    explanation: "Protective Neutral Bonding (PNB) is a TN-C-S variant where the N-E link sits at the consumer's intake. A4:2026 treats it as a separate selectable option on the certificate so the supply is recorded accurately.",
    section: "5.2",
    difficulty: "advanced",
  },
  {
    id: 192,
    question: "During the initial verification of a new circuit you measure Zs = 1.40 Ω on a 32A Type B MCB on a 230V TN system. Under A4:2026 Table 41.3 (limit 1.37 Ω) this is:",
    options: [
      "Non-compliant — Zs exceeds the A4:2026 maximum of 1.37 Ω; the circuit fails disconnection time and must be re-designed (larger conductor, RCD additional protection, or supplementary bonding) before energising",
      "To ensure single-pole devices (switches, fuses, MCBs) are connected in the LINE conductor only (not neutral), preventing equipment remaining live when switched off",
      "Maximum demand, supply characteristics (Ze, Ipf, U0), earthing arrangement, type and composition of circuits, designer details, and Schedule of design data",
      "Below-minimum or above-maximum values indicate a fault that prevents the protective measure from operating as designed — risking shock, fire, or equipment damage",
    ],
    correctAnswer: 0,
    explanation: "1.40 Ω > 1.37 Ω (Table 41.3, A4:2026). The circuit cannot meet the 0.4 s disconnection time at the design fault current, so it fails verification.",
    section: "3.4",
    difficulty: "advanced",
  },
  {
    id: 193,
    question: "When commissioning an EV charger fed from a TN-C-S supply, A4:2026 Section 722 requires:",
    options: [
      "Typically the LIVE Zs reading INCLUDING parallel earth paths from extraneous bonded metalwork — and may be lower than calculated Zs from Ze + (R1+R2)",
      "Either conversion to TT, or a means of detecting an open-PEN condition (e.g. integral PEN-loss device in the EVSE) to prevent dangerous touch voltage on the vehicle bodywork",
      "Sinusoidal AC AND pulsating DC residual currents (covers most domestic/commercial electronic loads). Default per Reg 531.3.3",
      "Continuity of CPCs and ring conductors, insulation resistance, polarity, earth electrode resistance (TT) — completed BEFORE energising",
    ],
    correctAnswer: 1,
    explanation: "Section 722 was strengthened by A4:2026: an open-PEN detection device or a TT island is mandatory when EV charging is fed from a TN-C-S/PME supply, because a broken PEN could energise the vehicle.",
    section: "4.4",
    difficulty: "advanced",
  },
  {
    id: 194,
    question: "On a Schedule of Test Results under A4:2026, an insulation resistance reading of '>299 MΩ' on a circuit tested at 500 V dc means:",
    options: [
      "RCD function (1×IΔn trip time) AND MCB function (continuity, polarity, Zs to verify magnetic trip operates within disc time on L-PE faults beyond RCD coverage)",
      "Heat stress, falls through ceiling between joists, contact with hot pipes/cables, glass fibre/asbestos exposure, restricted access for emergency egress",
      "The insulation resistance is at or above the upper limit of the test instrument's display range (typically 299 MΩ on a 500 V tester) — a passing result; record as '>299' rather than the displayed numeral",
      "Step 1: end-to-end resistance of each conductor (r1, rn, r2). Step 2: cross-connect L outgoing to N return; measure L-N at each socket — should be ~constant. Step 3: cross-connect L outgoing to cpc return; measure L-cpc at each socket — gives R1+R2 for the ring",
    ],
    correctAnswer: 2,
    explanation: "Many MFTs cap the displayed IR at 299 MΩ. A4:2026 / GN3 confirm that a '>299 MΩ' record is correct — the actual value is simply above the instrument's range, well above the 1 MΩ minimum.",
    section: "3.2",
    difficulty: "basic",
  },
  {
    id: 195,
    question: "When commissioning a 3-phase distribution board you find one phase reads 245 V, the other two read 230 V. The most likely fault is:",
    options: [
      "Standard or Enhanced fire-resistant cable (e.g. FP200 / Firetuf), separation from other circuits, and fire-rated supports/clips that survive collapse temperatures",
      "Sinusoidal AC AND pulsating DC residual currents (covers most domestic/commercial electronic loads). Default per Reg 531.3.3",
      "Final circuits supplying socket-outlets in higher-risk residential buildings (HRRBs), care homes, student accommodation, etc. (recommendation, not absolute requirement, in non-HRRB)",
      "A loose neutral connection (high-resistance N) shifting the star point — confirm with N-E and L-N tests, then isolate, prove dead, and remake the neutral termination",
    ],
    correctAnswer: 3,
    explanation: "A loose / high-resistance neutral causes the star point to drift, lifting one phase voltage above 230 V and dropping others. Diagnosed by L-N voltage variance and resolved by remaking the neutral terminations.",
    section: "6.9",
    difficulty: "advanced",
  },
  {
    id: 196,
    question: "An EICR issued in 2026 should explicitly cite:",
    options: [
      "BS 7671:2018 incorporating Amendment 4:2026",
      "Any C1, any C2, OR any FI observation",
      "Potentially dangerous — urgent remedial action required",
      "250V DC, minimum acceptable IR 0.5 MΩ",
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
      "Light works but lampholder/luminaire body remains at line potential when switch is OFF — major shock risk during lamp change",
      "That the line and CPC of the ring are continuous and unbroken — high or open readings indicate a broken conductor at one of the accessory terminations",
      "Switchgear, controlgear, drives, controls, interlocks, monitoring devices etc. — verifying they operate as intended including after the protective device test",
      "To confirm the indicator was working immediately before AND immediately after the dead test, eliminating the risk of a faulty indicator giving a false dead reading",
    ],
    correctAnswer: 1,
    explanation: "Step 2 of the ring final circuit test (per GN3) measures end-to-end continuity of L and CPC. An open reading flags a broken conductor before energising the circuit.",
    section: "3.4",
    difficulty: "basic",
  },
  {
    id: 198,
    question: "On the new A4:2026 EICR coding flowchart, an undersized main protective bonding conductor (e.g. 6 mm² where 10 mm² is required for a 100 A PME supply) is normally coded:",
    options: [
      "Be CAT-rated equal to or greater than the instrument, GS38 compliant, with shroud, fused tips and clearly visible insulation integrity",
      "At the origin of the installation, identifying every circuit, the type and composition, OCPD, and characteristics necessary for inspection and testing",
      "C2 (potentially dangerous) — bonding fails to meet Reg 544.1 cross-section, undermining fault protection in the event of a PEN failure; remedial action required",
      "ADS device type, settings, presence of cpc throughout, equipotential bonding (main and supplementary where required), and any additional protection (30mA RCD)",
    ],
    correctAnswer: 2,
    explanation: "Inadequate main bonding for the supply type is potentially dangerous because it undermines fault protection. The standard convention is C2; only code C1 if the bonding is missing entirely AND a danger is present today.",
    section: "5.4",
    difficulty: "intermediate",
  },
  {
    id: 199,
    question: "When commissioning a new installation, the order of dead tests should be:",
    options: [
      "Ze (external loop) + R1 (line cpc to fault) + R2 (cpc to MET) at operating temperature — abbreviated Zs = Ze + (R1+R2)cor",
      "Only sinusoidal AC residual currents — UNSUITABLE for circuits with electronic loads producing pulsating DC (most modern loads)",
      "Achieve appropriate resolution and accuracy for the value being measured, AND avoid false trip/damage to RCD-protected circuits",
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
      "EIC + Schedule of Inspections + Schedule of Test Results + 'as installed' drawings + designer's written design data (per Reg 132.13) + manufacturer information for AFDDs / RCBOs / SPDs",
      "Code C2 / refuse certification + recommend conversion to TT supply with RCD additional protection AND notification to dutyholder/installer",
      "Through devices that may give nuisance trips on standard test current — and the reading interpreted with awareness of the test current limit",
      "The persons responsible for the design, construction, and inspection/testing of the installation (these may be the same person on small jobs)",
    ],
    correctAnswer: 0,
    explanation: "A4:2026 reinforces the 'design data' requirement under Reg 132.13. A complete pack: EIC + schedules + as-installed drawings + design assumptions + manufacturer data for protective devices.",
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
