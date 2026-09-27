/**
 * Ported from the English course, combining:
 *   level3/module1/section3/Sub6.tsx
 *   level3/module6/section3/Sub2.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';

const checks = [
  {
    id: 'l3-m1-s3-sub6-procedure',
    question: "L2 mate is about to start safe isolation. What's the L3-grade observation list?",
    options: [
      'Check the mate has correct PPE and a tidy work area, confirm the right tools are present, then leave them to isolate however they prefer.',
      'Verify the full six steps in order, with the correct GS38 equipment, lock-off and tag-out present at each stage.',
      'Confirm the circuit is switched off at the consumer unit, check the lights have gone out, then let work begin once it looks dead.',
      'Make sure the mate has a multimeter set to AC volts, has identified the circuit, and has tested the conductors once before starting.',
    ],
    correctIndex: 1,
    explanation:
      'Remember from L2 — prove-test-prove + lock-off + tag-out. The L3 supervisor verifies all six steps every time: (1) approved voltage indicator (GS38) selected; (2) prove on a known live source; (3) test the conductors to be isolated; (4) prove again on the known live source; (5) lock-off device fitted; (6) tag-out / warning notice, with keys held by the operative who locked it and a re-check before work starts.',
  },
  {
    id: 'l3-m1-s3-sub6-implications',
    question: 'What are the legal implications of NOT carrying out safe isolation?',
    options: [
      'Breaches of EAWR and HASAWA, RIDDOR reporting if injury, voided insurance, and personal as well as firm prosecution.',
      'None, provided no one is injured — the duty to isolate only applies once an accident has actually occurred.',
      'A written warning from the firm only; safe isolation is an internal company policy, not a legal requirement in law.',
      'A small fixed penalty notice from the DNO for working on their network without authorisation or permit.',
    ],
    correctIndex: 0,
    explanation:
      'The implications are legal (EAWR Reg 13 and Reg 14, HASAWA s.2 / s.3 / s.7), commercial (insurance, contracts), reputational (HSE Public Register) and personal (s.7 prosecution). Not isolating is one of the most-prosecuted electrical safety failures and is well-documented in HSE case law.',
  },
  {
    id: 'l3-m1-s3-sub6-audit',
    question:
      "You're auditing the firm's isolation practice across teams. What's the L3 supervisor's primary metric?",
    options: [
      'The number of locks and tags the firm has bought and issued across all the vans this year.',
      'The speed at which operatives complete isolation, measured so that jobs are not slowed down.',
      'The number of isolation-related incidents reported across the firm in the last 12 months only.',
      'Compliance with the six-step procedure on every job, verified by observation, record review and training currency.',
    ],
    correctIndex: 3,
    explanation:
      'Audit is the verification that the documented procedure is the actual practice. Methods: observation (jobs visited unannounced or scheduled), record review (locks, voltage indicators in date and tested), training records (operatives current on the procedure), and incident / near-miss data. The trend is tracked and intervention follows where slippage is seen; observation is the gold standard with records and training as supporting evidence.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's the EAWR Reg 13 duty?",
    options: [
      'A duty to provide adequate working space, access and lighting for persons working on or near electrical equipment.',
      'A duty to take adequate precautions to prevent equipment made dead from becoming electrically charged during work, if danger may arise.',
      'A duty to ensure all electrical equipment is constructed and maintained to prevent danger so far as reasonably practicable.',
      'A duty to ensure only competent persons carry out work on or near electrical systems where technical knowledge is required.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 13 is the legal hook for safe isolation. Compliance in practice means lock-off, tag-out, prove-test-prove and control of the isolation point — the six-step procedure.',
  },
  {
    id: 2,
    question: "What's the prove-test-prove procedure?",
    options: [
      'Test the circuit dead, switch off at the consumer unit, then test again to confirm the supply has gone.',
      'Prove the circuit is dead, fit a lock-off, then prove again that the lock-off device has fully worked.',
      'Prove the indicator on a known live source, test the conductors to be isolated, then prove the indicator again on that source.',
      'Prove the lock-off device is secure, test the operative knows the procedure, then prove the tag-out notice is in place.',
    ],
    correctAnswer: 2,
    explanation:
      'Prove-test-prove guards against indicator failure giving a false dead reading. Prove the indicator on a known live source (proving unit or known live circuit); test the conductors line-to-earth, line-to-neutral, line-to-line and neutral-to-earth; then prove the indicator again on the same source. Skipping the second prove is a common shortcut and a common cause of incidents.',
  },
  {
    id: 3,
    question: 'What’s a "GS38" voltage indicator?',
    options: [
      'A multimeter set to its highest AC voltage range, which is the recommended tool for proving dead.',
      'A neon screwdriver, which lights when voltage is present and is approved for proving circuits dead.',
      'A non-contact volt-stick that beeps near a live conductor, used to confirm a circuit is dead before work.',
      'A purpose-built voltage indicator that complies with HSE Guidance Note GS38 and is designed to fail safe.',
    ],
    correctAnswer: 3,
    explanation:
      'GS38 is the HSE guidance for selection and use of test instruments and probes. A GS38 indicator is purpose-built for proving dead, not a multimeter: physically robust, with a non-current-limiting fuse, finger barriers, suitable probes and low loop impedance. A multimeter on the wrong setting can give a false dead reading; GS38 indicators are designed to fail safe.',
  },
  {
    id: 4,
    question: "What's the lock-off and tag-out procedure?",
    options: [
      'Each operative fits their own lock to the isolation point and removes it only when their own work is complete.',
      'The supervisor holds a single master lock for the whole team and removes it once everyone says they have finished.',
      'A warning notice alone is fitted at the isolation point; a physical lock is only needed on industrial sites.',
      'The first operative to arrive locks off and the last to leave removes the lock at the end of the working day.',
    ],
    correctAnswer: 0,
    explanation:
      "Lock-off + tag-out is per-operative. Each operative fits their own lock (or to a hasp / multi-lock where several work on one point); the tag identifies the operative, circuit, date / time and work; and the lock comes off only when that operative's work is complete and it is safe to re-energise. Each operative's lock means they control when the supply can be restored.",
  },
  {
    id: 5,
    question: "What's the implication of bypassing safe isolation?",
    options: [
      'A minor delay only, since the work can still be completed and certified as normal afterwards.',
      'A cascade of EAWR and HASAWA breaches, RIDDOR, voided insurance, and personal as well as firm prosecution.',
      'A requirement to re-test the circuit, but no legal, insurance or reputational consequences for anyone.',
      'An internal disciplinary matter for the firm, with no involvement of the HSE or the insurers at all.',
    ],
    correctAnswer: 1,
    explanation:
      'The implication cascade is severe across legal, commercial and personal dimensions: EAWR Reg 13/14 breach; HASAWA s.2/3/7 breach; potential RIDDOR; voided insurance; personal and firm prosecution; reputational damage on the HSE Public Register; possible JIB / scheme-body deregistration; and director liability under s.37. Bypassing is one of the lowest-effort, highest-consequence safety failures.',
  },
  {
    id: 6,
    question: "What's the L3 supervisor's role in safe isolation?",
    options: [
      'To carry out every isolation personally so that junior operatives never have to do it themselves.',
      'To sign off the paperwork at the end of the job without observing the isolation itself at all.',
      'To verify the procedure on every job by observation and record review, and to intervene and coach where needed.',
      'To leave isolation entirely to the operative, since each is responsible for their own safety on site.',
    ],
    correctAnswer: 2,
    explanation:
      "L3 supervisor = procedure custodian. They verify the procedure is followed on every job through observation, audit and record review; intervene immediately if shortcuts are seen; coach junior operatives until competent; update the firm's training record; and escalate persistent non-compliance. The responsibility is for ensuring isolation actually happens, not just that it is on paper.",
  },
  {
    id: 7,
    question: 'What’s a "permit-to-work" in the isolation context?',
    options: [
      'A licence issued by the local authority allowing a contractor to carry out electrical work in a dwelling.',
      'A document the customer signs to confirm they are happy for the supply to be switched off for the day.',
      'A certificate issued by the DNO authorising a contractor to work on the supply side of the meter.',
      'A formal written authorisation defining the isolation, the work, the authorised personnel and the sign-off conditions.',
    ],
    correctAnswer: 3,
    explanation:
      'Permits formalise the isolation procedure for higher-hazard or complex scenarios — multiple sources, large industrial sites, safety-critical systems. The permit defines the isolation, work, authorised personnel, time period and sign-off conditions; it is issued by the issuing authority, signed-on by the operative, and signed-off when complete and safe to re-energise. The L3 operative may be the named person on a permit.',
  },
  {
    id: 8,
    question: 'What does HSG85 cover?',
    options: [
      'HSE guidance "Electricity at Work — Safe Working Practices", the practitioner companion to the EAWR.',
      'HSE guidance on the selection and use of test instruments, leads and probes for electrical work.',
      'HSE guidance on the management of asbestos-containing materials in non-domestic premises.',
      'HSE guidance on first-aid provision and the first-aid needs assessment for workplaces.',
    ],
    correctAnswer: 0,
    explanation:
      'HSG85 is the non-statutory practitioner reference. It gives detailed guidance on EAWR compliance including isolation procedures, live working defences, competence and supervision. Knowing it exists and what it covers is L3-essential.',
  },
];

const faqs = [
  {
    question: "Can I rely on the customer's isolation device alone?",
    answer:
      "No. Use your own lock; verify the customer's isolation independently. The customer's isolation may be operated by someone else; your own lock keeps you in control.",
  },
  {
    question: "What if there's no built-in isolation point?",
    answer:
      "Withdrawal of the supplier's main fuse with the DNO's consent (DNO controls cut-out fuses); installation of a temporary isolation device; or escalation to a different isolation strategy. Do not work without isolation.",
  },
  {
    question: 'How do I test a multi-source circuit (PV, generator backup, UPS)?',
    answer:
      'Identify ALL sources before starting. Isolate each one. Lock and tag each isolation point. Apply prove-test-prove from all directions. PV in particular can back-feed during daylight even with the AC isolated; check DC isolation too.',
  },
  {
    question: "What's the role of the voltage indicator beyond proving dead?",
    answer:
      'Confirming neutral integrity (N-E reading), checking for parasitic voltages, identifying mis-wired returns. The indicator is a diagnostic tool as well as a safety device; trained use is part of L3 competence.',
  },
  {
    question: 'Are battery-powered "test pens" suitable for proving dead?',
    answer:
      'No — most test pens are not GS38 compliant. They can give false readings (capacitive coupling can light a non-contact pen on a dead conductor; conversely a low-battery pen may not light on a live one). Use a proper GS38 voltage indicator with a separate proving unit or known live source.',
  },
  {
    question: 'How does the L3 supervisor verify training is current?',
    answer:
      "Firm's training matrix tracks operatives' EAWR / safe-isolation training; refreshers typically every 2-3 years. Practical observation periodically confirms the procedure is being followed correctly. Combine record review + observation.",
  },
  {
    question: 'What records should I keep of a safe-isolation procedure?',
    answer:
      'Many firms now require a per-circuit safe-isolation certificate — operative name, circuit ID, isolation point, lock-off device fitted, voltage indicator serial and last calibration, proving method, test readings (L-E, L-N, L-L, N-E), date, time, signature. Retained with the job pack. After any incident this is the contemporaneous record that demonstrates the procedure was followed.',
  },
  {
    question: 'How does safe isolation interact with BS 7671 testing?',
    answer:
      'Dead testing (continuity, IR) requires safe isolation as a precondition. Live testing (loop impedance, RCD operation) requires the circuit re-energised. The L3 supervisor sequences the testing — all dead tests first while the isolation is in place; then restoration; then live tests; then close out. Mixing the sequences leads to errors and incidents.',
  },
  {
    question: 'What about working on isolated DC PV-array conductors?',
    answer:
      'PV DC stays energised during daylight as long as modules are illuminated. The DC isolator between modules and inverter must be opened, locked and tagged. Even with the inverter off, the modules continue to produce voltage; touching the array-side conductors without isolation can deliver lethal DC shock. PV-specific safe-isolation training is increasingly part of L3 competence.',
  },
  {
    question: 'How does the firm prove the indicator’s calibration to an inspector?',
    answer:
      'Calibration certificate from manufacturer or certified calibrator; indicator typically calibrated annually; certificate referenced by serial number; firm’s asset register lists current calibration date for each indicator. Out-of-calibration indicator used in a safe-isolation procedure is treated by inspectors as effectively no isolation having occurred.',
  },
];

const checks2 = [
  {
    id: 'device-type',
    question:
      'A 6 A lighting circuit serving LED downlights with electronic drivers. The driver in-rush is high (200 A peak for 100 microseconds at switch-on across the full circuit). The right protective device characteristic is:',
    options: [
      'Type B 10 A — bump the rating so the higher thermal threshold rides through the in-rush.',
      'Type D 6 A — the 10-20 x In magnetic threshold is the only one high enough for LED in-rush.',
      'Type C 6 A — the 5-10 x In magnetic threshold stays clear of the LED driver in-rush.',
      'Type B 6 A with a 100 mA time-delayed RCD — the RCD delay absorbs the in-rush.',
    ],
    correctIndex: 2,
    explanation:
      'LED driver in-rush is the classic Type B nuisance-trip case. Type B trips magnetically at 3-5 x In; on a 6 A device that is 18-30 A, easily exceeded by the 200 A in-rush even though it lasts only microseconds. Type C trips at 5-10 x In (30-60 A on a 6 A device), so the magnetic trip stays clear of the in-rush. Increasing the rating (Type B 10 A) breaks cable protection; Type D is unnecessarily harsh and needs a very low Zs; the RCD does not influence magnetic tripping. The thermal overload protection is unchanged between Type B and Type C.',
  },
  {
    id: 'device-bcap',
    question:
      'A small commercial unit with 100 A intake, declared PSCC at the intake of 16 kA. The consumer unit is fed by 25 mm² T&E (impedance about 0.0072 ohms / m, run 8 m). The PSCC at the consumer unit busbar is approximately 13.8 kA. What breaking capacity must the MCBs in the consumer unit be?',
    options: [
      '10 kA Icn minimum — the 13.8 kA busbar PSCC exceeds 6 kA, so use 10 kA or BS 88 cascade.',
      '6 kA Icn — the 8 m of 25 mm² T&E limits busbar fault current to within the 6 kA rating.',
      '3 kA Icn — domestic-spec devices are 3 kA and the cut-out fuse handles the rest.',
      'Breaking capacity is irrelevant — the RCD disconnects before the MCB sees the fault current.',
    ],
    correctIndex: 0,
    explanation:
      "BS EN 60898 MCBs are commonly available in 6 kA and 10 kA Icn ratings. Domestic CU swaps where intake PSCC is in the 1-3 kA range can use 6 kA. Commercial units where the PSCC at the consumer unit busbar can reach 13-25 kA need 10 kA Icn devices, or cascade-coordinated protection where an upstream BS 88 fuse limits let-through energy to within the downstream MCB's Icn. Reg 434.5.1 mandates that the breaking capacity is at least the PSCC at the device (or that backup protection is provided that limits the prospective fault current to within the device rating).",
  },
  {
    id: 'device-discrim',
    question:
      'A B40 RCBO in the consumer unit is fed via a 100 A BS 88-3 main switch and main fuse. A short-circuit fault on a final circuit downstream of the RCBO. The discrimination outcome you want is:',
    options: [
      'Both the RCBO and the 100 A main fuse operate together, isolating the whole building so the fault cannot spread.',
      "Only the RCBO trips; the 100 A BS 88-3 main fuse stays intact, leaving the rest of the building's circuits running.",
      'Only the 100 A main fuse blows, because the larger device always operates first on a heavy short-circuit fault.',
      'Neither device operates — the fault current is shared so each sees less than its own rating and rides through.',
    ],
    correctIndex: 1,
    explanation:
      'Discrimination (also called selectivity) means that on a downstream fault only the immediate upstream device operates — not its upstream device. For our case the B40 RCBO clears the fault and the 100 A BS 88-3 main fuse stays intact. The whole building keeps power except the affected circuit. Discrimination requires coordinated time-current characteristics between the device and its upstream backup; for fuse-MCB combinations the discrimination is usually ensured by the fuse being substantially larger than the MCB (typically 1.6 x or more) and by the let-through energy I²t curves not crossing in the fault range.',
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question: 'BS EN 60898 MCB Type B trips magnetically (instantaneous) at:',
    options: [
      '1.45 times the rated current (In) — the same multiple as the thermal overload trip point.',
      '3 to 5 times the rated current (In), suited to resistive and standard domestic loads.',
      '5 to 10 times the rated current (In), the lowest of the three trip-curve thresholds.',
      '2 to 3 times the rated current (In), reserved for the most sensitive lighting circuits.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 60898 Type B trip characteristic: magnetic instantaneous trip between 3 x In and 5 x In. Suited to domestic and small commercial circuits without significant in-rush — lighting (incandescent and most LED drivers below the in-rush threshold), socket-outlets, fixed appliances. Type B is the default choice for residential CU work because most domestic loads sit comfortably below 3 x In during normal operation, and its lower magnetic threshold gives the fastest fault clearance for a given Zs.',
  },
  {
    id: 2,
    question: 'BS EN 60898 Type C MCB trips magnetically at:',
    options: [
      '3 to 5 times the rated current, used on general domestic lighting and socket circuits.',
      '10 to 20 times the rated current, reserved for transformers and welding plant with severe in-rush.',
      '5 to 10 times the rated current, used on circuits with moderate in-rush such as LED arrays and small motors.',
      '4 to 7 times the rated current, the mid-range curve used only on motor circuits below 5 kW.',
    ],
    correctAnswer: 2,
    explanation:
      'Type C: magnetic instantaneous trip between 5 x In and 10 x In. Tolerates higher in-rush than Type B without nuisance tripping. The trade-off: requires a lower Zs (higher fault current) to achieve the same disconnection time as a Type B of the same rating, since fault current must reach 5-10 x In rather than 3-5 x In. The Table 41.3 max Zs for a Type C is therefore lower (more demanding) than for a Type B of the same rating.',
  },
  {
    id: 3,
    question: 'BS EN 60898 Type D MCB trips magnetically at:',
    options: [
      '5 to 10 times In, used for moderate in-rush such as fluorescent banks and small motors.',
      '20 to 40 times In, the highest available curve, reserved for X-ray equipment only.',
      '3 to 5 times In, the standard domestic curve, suitable for any fixed appliance.',
      '10 to 20 times In, used for very high in-rush such as large transformers and heavy DOL motor starts.',
    ],
    correctAnswer: 3,
    explanation:
      'Type D: magnetic instantaneous trip between 10 x In and 20 x In. Reserved for circuits with severe in-rush — large step-up transformers, welder primaries, heavy DOL motor starts, X-ray equipment. Requires very low Zs to achieve the disconnection time, often making Type D impractical at the end of long radial runs. For most domestic and commercial work, Type D is not the right answer; Type C plus careful coordination is.',
  },
  {
    id: 4,
    question: 'What does Reg 434.5.1 require regarding protective device breaking capacity?',
    options: [
      'The rated breaking capacity shall be at least the prospective fault current at the device, unless cascade backup limits the let-through energy.',
      'The breaking capacity shall be at least the design current Ib, so the device can interrupt its own normal load.',
      "The breaking capacity shall be at least 1.45 times the cable's current-carrying capacity Iz, matching overload coordination.",
      'The breaking capacity shall be at least twice the rated current In, giving a margin against nuisance overload operation.',
    ],
    correctAnswer: 0,
    explanation:
      "Reg 434.5.1 requires that the breaking capacity of a protective device equals or exceeds the prospective fault current at the point of installation, unless backup protection (a coordinated upstream device with let-through energy within the downstream device's rating) is provided. For domestic where intake PSCC is in the 1-3 kA range, 6 kA Icn MCBs are sufficient. For commercial where PSCC at the busbar can be 13-25 kA, either 10 kA Icn MCBs or a cascade scheme with an upstream BS 88 fuse is required.",
  },
  {
    id: 5,
    question:
      'BS 7671 A4:2026 Table 41.3 maximum Zs for a Type B 32 A MCB on a 230 V system (Cmin 0.95) is approximately:',
    options: [
      '2.30 ohms — the full nominal 230 V supply divided by the 100 A overload threshold.',
      '1.37 ohms — the A4:2026 figure with Cmin = 0.95 applied (older editions were higher).',
      '0.68 ohms — the figure for a Type C 32 A device, which shares the Type B max Zs.',
      '4.37 ohms — the disconnection-time value before the magnetic trip threshold is considered.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671:2018+A4:2026 Table 41.3 gives the maximum Zs for a Type B 32 A MCB at 1.37 ohms on a 230 V system, calculated with Cmin = 0.95 (worst-case low supply voltage allowance). The value derives from: minimum fault current to ensure 5 x In magnetic trip = 5 x 32 = 160 A; with Cmin x V = 0.95 x 230 = 218.5 V, max Zs = 218.5 / 160 = 1.366 ohms, rounded to 1.37. Older editions used Cmin near 1.0 and quoted around 1.44 ohms; A4:2026 hardened the figure. Always design to the current Table 41.3 from the active edition.',
  },
  {
    id: 6,
    question: 'An RCBO (BS EN 61009-1) provides:',
    options: [
      'Residual current protection only, with no overcurrent function — it needs a separate MCB on the same circuit.',
      'Overcurrent protection only — effectively an MCB with higher breaking capacity and no residual current sensing.',
      'Combined overcurrent (like an MCB) and residual current protection (like an RCD) in a single device.',
      'Arc fault detection combined with overcurrent protection, replacing the need for a separate AFDD.',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 61009-1 RCBO = Residual Current Breaker with Overcurrent. Combines an MCB (BS EN 60898) with an RCD (BS EN 61008) in one module. Common ratings: 6, 10, 16, 20, 25, 32, 40, 50 A; Type B or C overcurrent characteristic; 30 mA Type A or Type F (UK domestic standard) or Type B (EV charging on TN-C-S). RCBOs are the modern domestic and small commercial standard because they isolate the affected circuit only on a residual current event, rather than a whole-board RCD trip taking down everything.',
  },
  {
    id: 7,
    question: 'A BS 88 HRC fuse has the advantage over an MCB of:',
    options: [
      'Re-settability after a fault — the fuse can be reset by hand like an MCB, avoiding the need for spares.',
      'A built-in switching function, isolating the circuit for maintenance without a separate switch.',
      'Integrated residual current protection, removing the need for a separate RCD on the protected circuit.',
      'Substantially higher breaking capacity (typically 50-80 kA) with fast I²t let-through and clean cascade.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 88 HRC (high-rupturing capacity) fuses have several real advantages: breaking capacity routinely 50-80 kA (vs 6-10 kA for BS EN 60898 MCBs), very fast I²t let-through on heavy faults (the fuse element vaporises in milliseconds, limiting downstream energy), and clean cascade coordination with downstream MCBs. Disadvantages: must be replaced after operation, no overcurrent re-set, no built-in switching function. The compromise on most modern installations is a BS 88 main fuse at the origin (provides high-PSCC fault clearance and cascade backup) with BS EN 60898 MCBs / RCBOs downstream (give per-circuit isolation and switching).',
  },
  {
    id: 8,
    question:
      'On the design schedule, the protective device row for a 32 A radial socket circuit on a 230 V TN-C-S supply should record:',
    options: [
      'Type, rating, breaking capacity, characteristic, RCD class if combined, design max Zs, and manufacturer / part number.',
      'The rating only (32 A) — type, breaking capacity and RCD class are chosen by the installer from whatever is in the van.',
      'The measured Zs and RCD trip time from testing — the design row is filled in only after installation and testing.',
      'The cable CSA and length only — the protective device is implied by the cable size and needs no separate spec.',
    ],
    correctAnswer: 0,
    explanation:
      "The protective device row on the cable schedule has to be specific enough that any future designer or inspector can verify the choice. Type, rating, breaking capacity, characteristic, RCD class if combined, max Zs design figure, manufacturer / part number. 'MCB 32 A' is a guess, not a specification. The same is true at construction stage: the installer needs the spec to order the right part, and the inspector needs it to verify the installed device matches the design.",
  },
];

const faqs2 = [
  {
    question: 'Can I use a BS 3036 rewireable fuse on a new circuit design?',
    answer:
      'Almost never on new design work. BS 3036 rewireable (semi-enclosed) fuses are still permitted by BS 7671 in specific replacement contexts, but for new design work they are unsuitable: low and uncertain breaking capacity (typically 1-2 kA), poor coordination with downstream protection, slow operation on faults, and operator hazards (replacing wire while live is unsafe practice). Modern design uses BS 88 HRC for high-current, BS EN 60898 MCBs / BS EN 61009-1 RCBOs for distribution, and never BS 3036 rewireable. Periodic inspection of installations with surviving BS 3036 boards typically codes them C3 (improvement recommended) or C2 if other Code-2 issues compound.',
  },
  {
    question: 'How do I choose between RCBO 30 mA Type A, F and B?',
    answer:
      'Type AC was the original (covers AC residual currents only) and is largely obsolete in BS 7671 A4:2026 — most modern installations require Type A as a minimum. Type A covers AC plus pulsating DC residual currents (essential for circuits with rectifier loads — most LED lighting, computers, kitchen appliances). Type F adds covering of mixed-frequency residual currents from single-phase VSDs and inverters (specified for circuits feeding washing machines, dishwashers, induction hobs). Type B covers smooth DC residual currents (essential for EV charging on TN-C-S supply per Reg 722.531.3.101 — either the charger has internal Type B equivalent monitoring or an external Type B RCD is fitted). Default for new domestic CU: Type A 30 mA across all final circuits, with Type B specifically on the EV charger circuit.',
  },
  {
    question: 'What breaking capacity should I specify for a domestic CU upgrade?',
    answer:
      "Check the declared PSCC at the meter — if the DNO has not declared, treat it as 16 kA per the standard assumption for domestic supplies on PME (a conservative value; actual PSCC at most domestic intakes is in the 1-3 kA range). For a domestic CU served by a BS 88 cut-out fuse at the intake, a 6 kA Icn BS EN 60898 MCB / RCBO is normally sufficient because the cut-out fuse provides cascade backup and limits let-through energy to within the MCB's rating. For commercial work or for unusually short service-line installations where PSCC is high, specify 10 kA Icn or use BS 88 fuses for distribution. The schedule should record the assumed PSCC and the declared Icn alongside the device type.",
  },
  {
    question: 'When is a Type C MCB the right choice over Type B?',
    answer:
      'Type C is right when in-rush exceeds the Type B 3-5 x In magnetic trip threshold but is well within the Type C 5-10 x In threshold. Common cases: LED arrays with high in-rush drivers (large warehouse / commercial lighting installs), fluorescent banks (older magnetic-ballast fittings or larger contactor-controlled banks), small motor circuits below 5 kW where the FLC plus starting transient sits in the Type C window, transformer-fed equipment (small distribution transformers, signage). Type C is not the default — use Type B for general domestic and small commercial unless a specific circuit needs the higher magnetic threshold. The trade-off is that Type C requires a lower Zs to meet the disconnection time, since fault current has to reach 5-10 x In rather than 3-5 x In.',
  },
  {
    question: 'How does the BS 7671 A4:2026 Cmin 0.95 figure change my Table 41.3 design?',
    answer:
      "Cmin is the minimum supply voltage factor used in fault-current calculations to give a conservative (higher Zs / lower fault current) result. A4:2026 sets Cmin at 0.95 (so design fault voltage is 0.95 x 230 = 218.5 V). The Table 41.3 maximum Zs values are derived from this Cmin. Compared with older editions that used Cmin near 1.0, the A4:2026 figures are tighter — a Type B 32 A maximum Zs is 1.37 ohms in A4:2026 versus around 1.37 ohms in older editions. Always design to the current edition's Table 41.3 and document the Cmin assumption on the calc. Periodic inspection of older installations: code based on the edition in force at the time of design / installation, not retrospectively.",
  },
  {
    question: 'Should I use RCBOs or a single board-mounted RCD with MCBs?',
    answer:
      'RCBOs (one per final circuit) are the modern standard for new domestic CUs and small commercial installations, for one substantial reason: discrimination and convenience on a residual current event. With board-mounted RCDs (one or two RCDs covering the whole board), a residual current event on any circuit takes down every circuit on that RCD — fridges, freezers, alarms, the whole floor of lights. With per-circuit RCBOs, the fault clears its own circuit and the rest stays alive. The cost difference is marginal on a new build; the user-experience and safety difference is large. Reg 314.1 (separation into circuits) effectively favours per-circuit RCD discrimination on any installation where circuit loss has real consequence.',
  },
];

export default function Lesson315E_1_4() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        {
          'Remember from L2 — prove-test-prove, lock-off, tag-out. At L3 you supervise the procedure, audit it across the team, and explain the implications when it goes wrong.'
        }
      </p>

      <TLDR
        points={[
          'EAWR Reg 13 is the legal hook for safe isolation. Compliance = six-step procedure: prove voltage indicator, test conductors, prove indicator again, lock-off, tag-out, re-check before work.',
          'GS38-compliant voltage indicator + known live source / proving unit. Multimeter on wrong setting can give false dead.',
          'Implications of bypass: EAWR + HASAWA + RIDDOR + insurance void + personal s.7 + s.37 director liability + reputational damage on HSE Public Register.',
          'BS 7671 Sections 462 / 463 / 537 specify the device-level requirements that allow EAWR Reg 13 to be discharged operationally.',
          'Multi-source installations (PV, BESS, generator, UPS, dual feed) require sequential isolation of every source and prove-test-prove from every direction.',
          'EAWR Reg 12 covers the design duty to provide means of isolation; Reg 13 the operational duty to use them; Reg 14 the narrow live-working exception; Reg 16 competence.',
        ]}
      />
      <LearningOutcomes
        outcomes={[
          'Specify and demonstrate the procedures for ensuring electrical systems are safe to work on.',
          'State the implications of carrying out safe isolation procedures and NOT carrying them out.',
          'Apply EAWR Reg 13 and HSG85 in practice.',
          'Audit the safe isolation procedure across a team — observation, record review, training currency.',
          'Recognise multi-source isolation requirements (PV, generator, UPS, dual feed).',
          'Identify when a permit-to-work formalises the isolation for higher-hazard scenarios.',
          'Map BS 7671 Sections 462 / 463 / 537 to the EAWR Reg 12 / 13 duty chain.',
          'Apply the EAWR Reg 14 three-test for genuine live-working defence with documented reasoning.',
          'Apply Reg 16 supervision proportionate to operative competence and task hazard.',
          'Apply structured restoration discipline mirroring the isolation procedure.',
          'Walk through an HSE inspector audit pattern and self-test the firm’s isolation system.',
          'Recognise the cascade of multi-defendant prosecution (operative / supervisor / director / firm) in isolation-failure cases.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The six-step procedure</ContentEyebrow>
      <ConceptBlock
        title="Prove-test-prove + lock-off + tag-out + re-check"
        plainEnglish="The six steps: (1) prove the voltage indicator on a known live source; (2) test the conductors to be isolated; (3) prove the indicator again on the same known live source; (4) fit lock-off device to the isolation point; (5) attach tag identifying operative, circuit, time, work; (6) re-check before starting work. Repeat after any break in the work."
        onSite="Each step has a purpose. Skipping any one of them creates a failure mode. The L3 supervisor’s job is to verify all six on every job — observation in the moment, record review afterwards."
      >
        <p>Why each step matters:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Step 1 (prove)</strong> — confirms voltage indicator is working before relying
            on it.
          </li>
          <li>
            <strong>Step 2 (test)</strong> — confirms the conductors are dead.
          </li>
          <li>
            <strong>Step 3 (prove again)</strong> — confirms the indicator didn&apos;t fail during
            step 2.
          </li>
          <li>
            <strong>Step 4 (lock-off)</strong> — physical barrier to re-energisation.
          </li>
          <li>
            <strong>Step 5 (tag-out)</strong> — identifies who locked it, why, when, what work.
          </li>
          <li>
            <strong>Step 6 (re-check)</strong> — guards against intervening events between
            isolation and work start.
          </li>
          <li>
            <strong>After any break</strong> — repeat the prove-test-prove on return; conditions
            may have changed.
          </li>
          <li>
            <strong>Identify the correct isolation point</strong> — circuit ID verified by
            drawing, label, or trace; a confidently-misidentified isolator is one of the commonest
            failure modes.
          </li>
          <li>
            <strong>Brief any second person</strong> — if a colleague will be exposed to the area,
            they need to know what is isolated, what is not, and where the locks are.
          </li>
          <li>
            <strong>Document the isolation</strong> — circuit, isolator, lock number, time,
            operative, voltage readings.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="EAWR 1989 — Reg 13"
        clause={
          <>
            "Adequate precautions shall be taken to prevent electrical equipment, which has been
            made dead in order to prevent danger while work is carried out on or near that
            equipment, from becoming electrically charged during the work if danger may thereby
            arise."
          </>
        }
        meaning={
          <>
            The legal hook for safe isolation. &quot;Adequate precautions&quot; = the six-step
            procedure in practice. Lock-off and tag-out are how the regulation is discharged.
            Skipping them is a Reg 13 breach regardless of whether re-energisation actually
            occurred — the duty is on the precautions, not on the outcome.
          </>
        }
        cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 13."
      />

      <RegsCallout
        source="HSE Guidance Note GS38"
        clause={
          <>
            HSE guidance on the selection and use of test instruments and leads — voltage
            indicators must be: purpose-designed for the application, robust, with
            non-current-limiting fuses, finger barriers, suitable probe shrouding, and able to
            fail safe (false-dead reading not credible).
          </>
        }
        meaning={
          <>
            GS38 is non-statutory but is treated as the practitioner standard. Voltage indicators
            meeting GS38 are the appropriate tool for proving dead. A general-purpose multimeter
            is NOT GS38 compliant; it can give false dead readings if set to the wrong range.
          </>
        }
        cite="Source: HSE Guidance Note GS38 — Electrical test equipment for use on low voltage electrical systems — published by HSE."
      />

      <InlineCheck {...checks[0]} />

      <SectionRule />
      <ContentEyebrow>Implications of compliance and non-compliance</ContentEyebrow>
      <ConceptBlock
        title="What happens when isolation is done right"
        plainEnglish="Compliance with EAWR Reg 13 = legal duty discharged on the isolation point. Operative protected from re-energisation. Firm’s defence position strong. Insurance valid. Reputation intact. Audit trail clean."
        onSite="The cost of doing it right is small (5-10 minutes per circuit, plus equipment). The cost of doing it wrong is enormous. Done-right is the default for L3 operatives."
      >
        <p>Positive implications of compliant isolation:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Personal protection from electric shock.</li>
          <li>EAWR Reg 13 duty discharged.</li>
          <li>HASAWA s.2/3/7 protected.</li>
          <li>Insurance cover preserved.</li>
          <li>Defensible position if any incident occurs (your evidence is solid).</li>
          <li>Customer / client confidence — they can see professional practice.</li>
          <li>Apprentices learn correct method by seeing it modelled.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="What happens when isolation is bypassed"
        plainEnglish="Non-compliance with EAWR Reg 13 cascades: regulatory breach, prosecution risk, RIDDOR if injury, insurance void, reputational damage on the HSE Public Register, scheme-body deregistration risk, personal s.7 / s.37 prosecution. The HSE prosecutes isolation-failure cases harshly because the consequences are usually fatal."
        onSite="The cascade is real. Multiple cases on the HSE Public Register show firms and operatives prosecuted for isolation bypass; many cases include custodial sentences for directors under s.37."
      >
        <p>Negative implications of non-compliant isolation:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Risk of electric shock — typically fatal in commercial DBs and switchgear.</li>
          <li>EAWR Reg 13 + Reg 14 breach (de facto live working).</li>
          <li>HASAWA s.2 / s.3 / s.7 breach.</li>
          <li>RIDDOR if injury — F2508 + immediate phone for specified injury.</li>
          <li>Insurance void — PI / EL won&apos;t cover wilful safety breach.</li>
          <li>Sentencing Council Definitive Guideline applies.</li>
          <li>Personal prosecution under s.7 and (for directors) s.37.</li>
          <li>
            Reputational damage on HSE Public Register — lost contracts, framework
            disqualification.
          </li>
          <li>Scheme-body (NICEIC / NAPIT) deregistration risk.</li>
          <li>Civil liability to injured persons.</li>
          <li>
            Corporate Manslaughter and Corporate Homicide Act 2007 exposure where senior
            management failure was a substantial element.
          </li>
          <li>
            Defective Premises Act 1972 + BSA 2022 30-year retrospective liability for higher-risk
            buildings.
          </li>
          <li>
            Lost productivity from RIDDOR investigation, internal investigation, customer
            notification, regulatory cooperation.
          </li>
          <li>
            Long-term insurance market consequences — premium uplift, cover restriction, market
            exclusion.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck {...checks[1]} />

      <SectionRule />
      <ContentEyebrow>Audit and supervision</ContentEyebrow>
      <ConceptBlock
        title="L3 audit of the isolation procedure"
        plainEnglish="The L3 supervisor verifies the documented procedure is the actual practice. Methods: observation on jobs (planned and unannounced); record review (locks, voltage indicators, calibration, training); incident / near-miss data review; equipment audit."
        onSite="Audit isn’t ‘gotcha' — it's verifying the system works. Most operatives respond well to a culture of mutual verification once it’s clear the purpose is safety, not blame."
      >
        <p>Audit dimensions:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Procedure</strong> — six-step compliance observed in practice.
          </li>
          <li>
            <strong>Equipment</strong> — voltage indicators in date, tested, GS38 compliant; locks
            and tags available; proving units present.
          </li>
          <li>
            <strong>Records</strong> — operative training matrix current; safe-isolation
            refreshers within validity.
          </li>
          <li>
            <strong>Documentation</strong> — RAMS reference safe isolation; permits-to-work used
            appropriately.
          </li>
          <li>
            <strong>Incident data</strong> — any events related to isolation failure; trend
            tracking.
          </li>
          <li>
            <strong>Coaching</strong> — observed shortcomings corrected; non-compliance escalated.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Common audit findings and remediation patterns"
        plainEnglish="The L3 supervisor running periodic audits sees patterns. Some findings recur across teams and merit firm-wide intervention; others are individual coaching items. Recognising the patterns lets the supervisor target effort efficiently."
        onSite="Audit isn’t complete until findings are tracked through to closure. The L3 supervisor maintains a simple log: finding, severity, action, owner, due date, closed date. Trends become visible after a few audit cycles."
      >
        <p>Common audit findings:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Indicator out of calibration — equipment management gap; replace and reset cycle.
          </li>
          <li>Lock-off device missing — kit gap; restock and audit van inventories firm-wide.</li>
          <li>Tag-out illegible or unsigned — discipline gap; coach and re-audit.</li>
          <li>
            Second prove skipped — procedure shortcut; coach and observe; toolbox talk if
            firm-wide.
          </li>
          <li>Single operative on multi-source kit — RAMS gap; review and amend.</li>
          <li>Operative training lapsed — training matrix gap; book refresher.</li>
          <li>Restoration done without final visual check — discipline gap; coach.</li>
          <li>Records absent for past work — recording gap; remind of firm policy.</li>
          <li>
            Customer&apos;s isolation relied on without firm&apos;s own lock — independence
            principle violation; coach.
          </li>
          <li>
            Cumulative slippage — many small findings indicate cultural drift; escalate to firm
            H&amp;S.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Multi-source isolation"
        plainEnglish="Modern installations increasingly have multiple sources — PV, battery storage, generator backup, UPS, dual incoming feeds. Each source must be identified, isolated, locked and tagged. Apply prove-test-prove from all directions; PV in particular can back-feed during daylight even with the AC side isolated."
        onSite="The L3 supervisor’s first question on any modern installation: ‘how many sources are there?'. Walk-through identifies them; isolation strategy addresses each one. PV DC isolation, battery DC isolation, UPS internal battery, generator transfer switch — all need attention."
      >
        <p>Common multi-source scenarios:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>PV system</strong> — DC + AC sides; battery if hybrid; isolate both.
          </li>
          <li>
            <strong>Battery storage</strong> — battery DC contactor + AC side.
          </li>
          <li>
            <strong>UPS</strong> — internal battery; mains input; bypass switch position.
          </li>
          <li>
            <strong>Generator</strong> — Auto Transfer Switch position; engine start interlock.
          </li>
          <li>
            <strong>Dual mains feed</strong> — both incomers + tie breaker.
          </li>
          <li>
            <strong>Microgeneration</strong> — small wind / hydro can back-feed unexpectedly.
          </li>
          <li>
            <strong>EV charging infrastructure</strong> — may have V2G capability; bi-directional
            flow possible.
          </li>
          <li>
            <strong>CHP units</strong> — combined heat and power; can back-feed during operation.
          </li>
          <li>
            <strong>Capacitor banks</strong> — stored energy after AC isolation; discharge time
            required.
          </li>
          <li>
            <strong>Inductive loads</strong> — motors, transformers; back-EMF during
            disconnection.
          </li>
          <li>
            <strong>Other-contractor equipment in same DB</strong> — verify scope of isolation; do
            not assume one feed.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck {...checks[2]} />

      <SectionRule />
      <ContentEyebrow>EAWR Reg 14, competence and the wider system</ContentEyebrow>
      <ConceptBlock
        title="EAWR Reg 14 — when live working is permitted"
        plainEnglish="Reg 14 is the ’exception’ to the general dead-working principle. Live work is only permitted if THREE conditions are ALL met: (a) it’s unreasonable to work dead; (b) it’s reasonable to work live; (c) suitable precautions are in place. All three. Failing any one means dead working is required."
        onSite="The L3 supervisor reads ’unreasonable to work dead’ strictly — convenience and customer time pressure don’t qualify. Live testing for diagnostic purposes is often defensible (you can’t diagnose dead); routine installation work almost never is."
      >
        <p>The Reg 14 three-test:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Test 1 (unreasonable to be dead)</strong> — the work cannot reasonably be done
            with the equipment isolated. Diagnostic / fault-finding may meet; routine install
            almost never does.
          </li>
          <li>
            <strong>Test 2 (reasonable to be live)</strong> — the risk of working live is
            justified by the benefit. Customer convenience alone doesn&apos;t justify.
          </li>
          <li>
            <strong>Test 3 (suitable precautions)</strong> — insulating PPE, insulated tools,
            second person, permit-to-work, restricted access, all controls actually in place.
          </li>
          <li>All three required; failing any = dead working required.</li>
          <li>Document the three-test reasoning; the documentation is the defence.</li>
          <li>
            <strong>Limb (a) examples that pass</strong> — taking a continuous-supply diagnostic
            reading on a fault-finding job; commissioning verification that requires live
            operation; emergency intervention on a system that cannot be safely isolated.
          </li>
          <li>
            <strong>Limb (a) examples that fail</strong> — &quot;customer wants the lights
            on&quot;; &quot;we&apos;re behind schedule&quot;; &quot;the isolator is in an awkward
            place&quot;.
          </li>
          <li>
            <strong>Limb (b) considerations</strong> — operative competence verified; equipment in
            place; supervision arrangement; environmental conditions; consequence if event occurs.
          </li>
          <li>
            <strong>Limb (c) precautions</strong> — Class 0 gloves (1000V AC), arc-flash PPE
            matched to incident energy, insulated tools to IEC 60900, second person trained in
            rescue, restricted-access zone, fire watch where appropriate, permit-to-work.
          </li>
          <li>
            <strong>Documentation</strong> — three-test reasoning recorded in writing; signed by
            issuing authority; signed by operative; retained.
          </li>
          <li>
            <strong>Inspector treatment</strong> — Reg 14 is read narrowly; the burden of
            demonstrating each limb sits with the dutyholder; absent documentation is treated as
            no three-test.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="EAWR Reg 16 — competence and the L3 step"
        plainEnglish="Reg 16 requires that no person engages in any electrical work where technical knowledge or experience is necessary unless they have that knowledge / experience or are under appropriate supervision. The L3 supervisor is often the ’appropriate supervision’ for L2 mates and apprentices."
        onSite="The supervision must be APPROPRIATE — close enough to intervene before harm. Phone-call distance often isn’t. The L3 supervisor on site, observing, available to intervene, is what discharges Reg 16 for the team. Leaving an L2 mate alone on an unfamiliar installation may be a Reg 16 breach."
      >
        <p>Appropriate supervision factors:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Proximity — supervisor reachable in time to prevent harm.</li>
          <li>Competence ratio — supervisor competent for the work being done.</li>
          <li>Workload — supervisor not overwhelmed by parallel demands.</li>
          <li>Experience of the supervised — newer = closer supervision.</li>
          <li>Hazard level — high-hazard work = closer supervision.</li>
          <li>Documentation — supervision arrangements recorded on RAMS.</li>
          <li>Communication — clear chain of escalation when something unexpected occurs.</li>
          <li>
            Briefing — pre-task briefing of supervised operative on hazards and the supervision
            arrangement.
          </li>
          <li>
            Competence assessment — periodic verification by observation; not just qualification
            certificates on file.
          </li>
          <li>
            Reg 16 covers electrical knowledge specifically — for general construction-site
            hazards CDM Reg 8 and MHSWR Reg 13 cover supervision separately.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="HSG85 — the practitioner reference"
        plainEnglish="HSE Guidance HSG85 ’Electricity at Work — Safe Working Practices’ is the detailed practitioner guidance on EAWR compliance. Covers isolation, live working defences, competence, supervision, system design, equipment standards. Non-statutory but treated as the practitioner standard; courts cite it."
        onSite="L3 should know HSG85 exists and what it covers. Reading the relevant sections before any non-routine job adds defence-in-depth to the firm’s position. HSE inspectors expect competent operatives to be familiar with HSG85."
      >
        <p>HSG85 sections relevant to L3:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>System design and maintenance (Reg 4).</li>
          <li>Isolation procedures and equipment (Reg 13).</li>
          <li>Live working — three-test, precautions, permits (Reg 14).</li>
          <li>Competence and supervision (Reg 16).</li>
          <li>PPE and tools.</li>
          <li>
            Specific scenarios — switchgear, transformers, batteries, capacitors, generators.
          </li>
          <li>Emergency response.</li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="EAWR 1989 — Reg 14"
        clause={
          <>
            "No person shall be engaged in any work activity on or so near any live conductor
            (other than one suitably covered with insulating material so as to prevent danger)
            that danger may arise unless — (a) it is unreasonable in all the circumstances for it
            to be dead; and (b) it is reasonable in all the circumstances for him to be at work on
            or near it while it is live; and (c) suitable precautions (including where necessary
            the provision of suitable protective equipment) are taken to prevent injury."
          </>
        }
        meaning={
          <>
            The three-test for live working. ALL THREE must be met. Default = dead working under
            Reg 13. Reg 14 is the narrow exception with strict gates. Documentation of the
            three-test reasoning is the defence if challenged.
          </>
        }
        cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 14."
      />

      <SectionRule />
      <CommonMistake
        title="Skipping the second 'prove' on the voltage indicator"
        whatHappens={
          <>
            Operative proves indicator on a known live, tests circuit shows dead, doesn&apos;t
            prove indicator again. Indicator was actually faulty and gave false dead reading.
            Operative touches conductors that are still live; shocked. Investigation finds the
            procedure shortcut. EAWR Reg 13 prosecution; firm + operative under HASAWA s.2/s.7.
          </>
        }
        doInstead={
          <>
            Always prove-test-prove. The second prove is the safety net against indicator failure.
            30 seconds saved isn&apos;t worth a hospital visit.
          </>
        }
      />

      <CommonMistake
        title="One operative removes another's lock to ‘save time'"
        whatHappens={
          <>
            Two operatives working on isolated circuit; one finishes early, sees the other&apos;s
            lock still on, removes it to allow re-energisation for the customer. Other operative
            touches what they thought was still isolated; shocked. Multi-prosecution event. Lock
            removal by anyone other than the operative who fitted it is a fundamental procedure
            violation.
          </>
        }
        doInstead={
          <>
            One lock per operative; only that operative removes their own lock. Multi-lock hasps
            for multiple operatives on one isolation point. Re-energisation only when ALL locks
            are removed by their owners.
          </>
        }
      />

      <Scenario
        title="Auditing the firm's isolation practice"
        situation={
          <>
            You’ve been asked to spend a day auditing the safe-isolation practice across the
            firm’s operatives. Three teams currently on different jobs: Team A on a domestic CU
            change, Team B on a commercial DB upgrade, Team C on a small fault-finding visit at an
            industrial customer.
          </>
        }
        whatToDo={
          <>
            Visit each team unannounced. Observe the procedure in action: prove-test-prove
            sequence; equipment used (GS38 indicator, proving unit); lock-off and tag-out;
            multi-lock hasp where multiple operatives; record-keeping. Talk to operatives —
            what&apos;s the procedure for THIS site? Where do you use the prove? What if this is a
            multi-source site? Check equipment — voltage indicators in calibration; locks and tags
            available; proving units present. Review training matrix back at office — when was
            each operative&apos;s last safe-isolation refresher? Cross-reference any near-misses
            logged in the past 6 months — anything related to isolation? Compile findings:
            what&apos;s working well; what&apos;s slipping; what needs intervention. Feedback to
            firm&apos;s H&amp;S manager and to the teams individually. Plan: refresher training
            where due; equipment replacement where indicators are out of calibration; toolbox talk
            on the most common slippage observed; follow-up audit in 3 months.
          </>
        }
        whyItMatters={
          <>
            The audit is what verifies the documented procedure is the actual practice. Without
            audit, the firm has policy on paper and unknown reality on site — that&apos;s how
            isolation incidents happen and that&apos;s what the HSE finds when they investigate.
            Periodic audit + intervention + retraining is the cycle that keeps isolation practice
            current. The L3 supervisor doing this work is contributing directly to the firm&apos;s
            POCMR cycle under MHSWR Reg 5.
          </>
        }
      />

      <SectionRule />
      <ContentEyebrow>Safe isolation in BS 7671 — the 462/463 framework</ContentEyebrow>

      <ConceptBlock
        title="How the Wiring Regulations cross-reference EAWR Reg 13"
        plainEnglish="BS 7671 doesn’t replicate EAWR; it provides the design and installation standards that allow EAWR’s general duties to be discharged in practice. Section 462 covers isolation; Section 463 covers switching for mechanical maintenance and emergency switching. Section 537 in Chapter 53 sets out the requirements for isolating and switching devices. These regulations work together — EAWR Reg 13 is the legal duty; BS 7671 462/463 is the practical specification of devices that meet it."
        onSite="The L3 supervisor reading a design checks the isolation provisions against BS 7671: is there a means of isolating each circuit, accessible without exposure to live parts, securable in the off position to prevent inadvertent re-energisation? Where shared isolation points serve multiple circuits, does the design provide for individual circuit isolation when required? Without these design provisions, the on-site safe-isolation procedure becomes impossible regardless of operative skill."
      >
        <p>BS 7671 isolation requirements:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Reg 462.1</strong> — each electrical installation shall have provisions
            for isolation from each supply.
          </li>
          <li>
            <strong>Reg 462.1.201</strong> — a main linked switch or linked circuit-breaker shall
            be provided as near as practicable to the origin.
          </li>
          <li>
            <strong>Reg 462.2</strong> — every circuit shall be provided with isolation means for
            all live conductors.
          </li>
          <li>
            <strong>Reg 462.3</strong> — devices for isolation shall be designed and/or installed
            so as to prevent unintentional or inadvertent re-energisation.
          </li>
          <li>
            <strong>Reg 462.4</strong> — where residual electrical energy is potentially present,
            suitable means shall be provided to discharge it.
          </li>
</ul>
      </ConceptBlock>

      <RegsCallout
        source="Electricity at Work Regulations 1989 — Reg 16 (Persons to be competent to prevent danger and injury)"
        clause={
          <>
            &quot;No person shall be engaged in any work activity where technical knowledge or
            experience is necessary to prevent danger or, where appropriate, injury, unless he
            possesses such knowledge or experience, or is under such degree of supervision as may
            be appropriate having regard to the nature of the work.&quot;
          </>
        }
        meaning={
          <>
            Reg 16 — the competence-or-supervision rule. Either the operative possesses the
            technical knowledge / experience or they work under appropriate supervision. The L3
            supervisor is often the &apos;appropriate supervision&apos; for L2 mates and
            apprentices. &apos;Appropriate&apos; is judged by hazard level, supervised
            operative&apos;s competence, proximity, workload and the ability of the supervisor to
            intervene before harm. Phone-call distance is often insufficient. Reg 16 breaches are
            commonly cited alongside Reg 13 / Reg 14 in prosecutions where a junior operative was
            left effectively unsupervised on a hazardous task.
          </>
        }
        cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 16."
      />

      <RegsCallout
        source="Electricity at Work Regulations 1989 — Reg 4(1) and 4(4)"
        clause={
          <>
            &quot;All systems shall at all times be of such construction as to prevent, so far as
            is reasonably practicable, danger.&quot; (Reg 4(1)) &quot;All systems shall be
            maintained so as to prevent, so far as is reasonably practicable, such danger.&quot;
            (Reg 4(2)) &quot;Every work activity, including operation, use and maintenance of a
            system and work near a system, shall be carried out in such a manner as not to give
            rise, so far as is reasonably practicable, to danger.&quot; (Reg 4(3)) &quot;Any
            equipment provided under these Regulations for the purpose of protecting persons at
            work on or near electrical equipment shall be suitable for the use for which it is
            provided, be maintained in a condition suitable for that use, and be properly
            used.&quot; (Reg 4(4))
          </>
        }
        meaning={
          <>
            Reg 4 is the umbrella system duty — construction, maintenance, work activity and
            protective equipment. The L3 supervisor verifying the voltage indicator is fit for
            purpose, the lock-off devices are functional, the protective gloves are within their
            inspection period — all sit within Reg 4(4). The framework reads upward: Reg 4 (system
            level), Reg 12 (means of isolation provided), Reg 13 (isolation precautions), Reg 14
            (live working exception), Reg 16 (competence). A breach often engages multiple
            regulations simultaneously.
          </>
        }
        cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 4."
      />

      <RegsCallout
        source="Electricity at Work Regulations 1989 — Reg 12"
        clause={
          <>
            &quot;Where necessary to prevent danger, suitable means (including, where appropriate,
            methods of identifying circuits) shall be available for — (a) cutting off the supply
            of electrical energy to any electrical equipment; and (b) the isolation of any
            electrical equipment.&quot;
          </>
        }
        meaning={
          <>
            Reg 12 — the duty to PROVIDE the means of isolation. This is the design-stage
            companion to Reg 13&apos;s operational isolation duty. Without compliant means of
            isolation at the design stage, the operational isolation procedure becomes impossible.
            The duty captures both the cutting-off function (switching for operational purposes)
            and the isolation function (securing for safe work).
          </>
        }
        cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 12."
      />

      <SectionRule />
      <ContentEyebrow>The voltage indicator — selection, use, calibration</ContentEyebrow>

      <ConceptBlock
        title="GS38 in detail — what makes a voltage indicator fit for purpose"
        plainEnglish="HSE Guidance GS38 sets out the selection and use requirements for test equipment, leads and probes intended for proving dead on low-voltage electrical systems. Indicators that meet GS38 are designed to fail safe — that is, when the device fails its failure mode is to indicate live rather than to indicate dead. They have purpose-built probes with finger barriers, non-current-limiting fuses where appropriate, shrouding to prevent short-circuit during test, robust construction, and clear high-contrast visual indication. The two main types are two-pole voltage indicators (sometimes called proving units’ companion devices) and digital voltage indicators with phase-rotation function. Multimeters set to AC volts ranges are not GS38 compliant for proving dead — they can give false-dead readings if set to the wrong range, if the battery is low, or if the input impedance is too high to register the actual voltage."
        onSite="The L3 supervisor verifies the indicator on the van or in the team’s kit meets GS38 by checking the manufacturer’s specification, the probes’ condition, and the calibration certificate. Indicators that have been dropped, soaked, or are showing erratic behaviour are taken out of service immediately. The proving unit (a self-contained known-live source) accompanies the indicator and is used for prove-test-prove sequences where no other known live source is convenient. Both pieces of equipment have calibration cycles and the firm maintains records."
      >
        <p>GS38 voltage indicator characteristics:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Fail-safe design</strong> — failure modes indicate live not dead; low-battery
            alerts visible.
          </li>
          <li>
            <strong>Probe construction</strong> — finger barriers to prevent slip onto live
            conductors; insulated to the rated voltage.
          </li>
          <li>
            <strong>Shrouded tips</strong> — minimum exposed metal to prevent short-circuit
            between adjacent conductors.
          </li>
          <li>
            <strong>Non-current-limiting fuse</strong> — internal protection within the indicator.
          </li>
          <li>
            <strong>Robust mechanical design</strong> — suitable for site use; impact resistance;
            ingress protection.
          </li>
          <li>
            <strong>Clear visual indication</strong> — high-contrast LED, audible tone; visible in
            poor lighting.
          </li>
          <li>
            <strong>Voltage range</strong> — appropriate to the system (typically 12-690V AC /
            12-1000V DC for LV).
          </li>
          <li>
            <strong>Polarity tolerance</strong> — works either way round; no risk of operator
            error.
          </li>
          <li>
            <strong>Calibration cycle</strong> — typically annual; certificate retained on
            firm&apos;s asset register.
          </li>
          <li>
            <strong>Proving unit companion</strong> — known-live source for prove steps;
            battery-powered; self-contained.
          </li>
          <li>
            <strong>Multimeter NOT suitable</strong> — wrong setting risk; battery dependence;
            input impedance issues.
          </li>
          <li>
            <strong>Non-contact pen NOT suitable for proving dead</strong> — capacitive coupling
            can light on dead conductor; low battery can fail to light on live.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>PV, battery and ESS — the multi-source isolation problem</ContentEyebrow>

      <ConceptBlock
        title="Why traditional safe-isolation procedures fail on hybrid systems"
        plainEnglish="A traditional installation has one isolation point: the main switch or the MCB. A modern hybrid system has multiple sources operating in parallel: solar PV with its DC isolators and AC inverter, battery energy storage with its own DC contactor and AC inverter, possibly a generator with auto-transfer switch, possibly a UPS with internal battery, and the conventional grid supply. Each source can back-feed if the others are isolated; PV in particular can deliver dangerous DC voltages whenever there is daylight, regardless of the AC-side state."
        onSite="The L3 supervisor on any modern installation starts with a system survey — list every source, locate every isolation device, understand the operational logic. The safe-isolation procedure becomes a sequence: isolate AC mains, isolate PV DC at module-array switch, isolate battery DC at battery breaker, isolate generator at engine stop and ATS lockout, isolate UPS at bypass and internal battery contactor. Each gets its own lock and tag. Prove-test-prove from all directions before any work proceeds. The conventional ’isolate the MCB’ mental model is wholly inadequate."
      >
        <p>Multi-source isolation sequence for a hybrid PV + battery + grid installation:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Identify all sources</strong> — drawing review, on-site walk, label check.
          </li>
          <li>
            <strong>Isolate the AC mains</strong> — main switch off, locked, tagged.
          </li>
          <li>
            <strong>Isolate PV DC</strong> — DC isolator between modules and inverter, off,
            locked.
          </li>
          <li>
            <strong>Isolate battery DC</strong> — battery breaker open, locked.
          </li>
          <li>
            <strong>Isolate generator</strong> — engine stop, ATS in maintenance position, locked.
          </li>
          <li>
            <strong>Discharge any stored energy</strong> — wait for inverter capacitors to
            discharge (typically 5 minutes), confirm via voltage indicator.
          </li>
          <li>
            <strong>Prove voltage indicator on known live source</strong>.
          </li>
          <li>
            <strong>Test for absence of voltage at the work point</strong> — from every direction:
            between phases, phase to neutral, phase to earth, on the PV DC side, on the battery DC
            side.
          </li>
          <li>
            <strong>Re-prove voltage indicator on known live source</strong> — confirm indicator
            still working.
          </li>
          <li>
            <strong>Tag isolation points</strong> — name, date, contact, expected duration.
          </li>
          <li>
            <strong>Begin work</strong> — under the protection of confirmed isolation.
          </li>
          <li>
            <strong>On completion</strong> — work area cleared, covers replaced, all operatives
            accounted for, then sequential restoration in reverse order with operational checks at
            each stage.
          </li>
        </ol>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>
        HSG85 — the practitioner reference for safe electrical working
      </ContentEyebrow>

      <ConceptBlock
        title="What HSG85 actually says and why the L3 supervisor should have read it"
        plainEnglish="HSG85 ’Electricity at Work: Safe Working Practices’ is HSE’s detailed practitioner guidance on the Electricity at Work Regulations 1989. It is non-statutory but is treated as the practitioner standard; courts cite it routinely. The document covers system design and maintenance (Reg 4); isolation procedures and equipment (Reg 13); live working — the three-test, suitable precautions, permits (Reg 14); competence and supervision (Reg 16); and specific scenarios — switchgear, transformers, batteries, capacitors, generators, photovoltaic systems, battery energy storage, electric-vehicle charging. The guidance was substantially updated in recent revisions to reflect modern installation types including PV and ESS. Reading the relevant sections before any non-routine job is a defence-in-depth investment the L3 supervisor should make a habit."
        onSite="On any non-routine job — first time on this type of equipment, unfamiliar customer, larger-scale than usual — the L3 supervisor checks the relevant HSG85 section as part of pre-job preparation. Most firms hold a current copy in PDF; HSE keeps the latest version on its website. The guidance is the bridge between the regulation text and on-site practice; inspectors expect competent operatives to be familiar with it."
      >
        <p>HSG85 sections most relevant at L3:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>System design and maintenance</strong> — Reg 4 expansion; what competent
            design and maintenance looks like.
          </li>
          <li>
            <strong>Isolation procedures</strong> — Reg 13 expansion; equipment requirements;
            lock-off; tag-out.
          </li>
          <li>
            <strong>Live working</strong> — Reg 14 three-test detail; suitable precautions;
            permits-to-work; the second-person principle.
          </li>
          <li>
            <strong>Competence and supervision</strong> — Reg 16 expansion; assessing competence;
            appropriate supervision.
          </li>
          <li>
            <strong>PPE and tools</strong> — selection criteria; standards; maintenance.
          </li>
          <li>
            <strong>Switchgear</strong> — specific safe-working procedures.
          </li>
          <li>
            <strong>Transformers</strong> — high-voltage considerations; oil filling; stored
            energy.
          </li>
          <li>
            <strong>Batteries</strong> — DC hazards; stored energy; thermal runaway; lithium-ion
            considerations.
          </li>
          <li>
            <strong>Capacitors</strong> — stored energy after isolation; discharge procedures.
          </li>
          <li>
            <strong>Generators</strong> — multi-source isolation; transfer-switch interlocks.
          </li>
          <li>
            <strong>Photovoltaic systems</strong> — DC-side isolation; daylight hazard.
          </li>
          <li>
            <strong>Battery energy storage</strong> — modern ESS considerations; BS EN IEC
            standards.
          </li>
          <li>
            <strong>Emergency response</strong> — rescue from contact with live conductors; first
            aid; RIDDOR.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>
        HSE prosecution case-law — what isolation-bypass actually costs
      </ContentEyebrow>

      <ConceptBlock
        title="Worked example — the cascade from one skipped prove to a multi-defendant prosecution"
        plainEnglish="A small commercial electrical contractor pleaded guilty to breaches of HSWA s.2 and EAWR Reg 13 after a 24-year-old operative received a fatal electric shock during a routine sub-board upgrade. Investigation revealed: the operative had proved the voltage indicator on a known live source, tested the conductors and found them dead, but had not re-proved the indicator on the known live source before commencing work. The voltage indicator was later found to have an intermittent fault that gave false-dead readings approximately 1 in 20 uses. The firm had not implemented a calibration regime; the indicator’s last calibration was 14 months earlier (the firm’s policy required annual). The operative was working alone with no second person; the firm’s RAMS for the activity required a second person for any work in commercial switchgear. The supervisor had signed off the RAMS that morning without verifying the equipment or the personnel arrangements matched what was specified. Sentencing Council Definitive Guideline applied: high culpability (multiple failures, departure from own policy), Category 1 harm (death). Firm fined a six-figure sum; the director was sentenced under HSWA s.37 to a suspended custodial sentence and personally fined; the supervisor was prosecuted under HSWA s.7 and given a community order. The case appeared on the HSE Public Register and several framework contracts were withdrawn."
        onSite="The lessons: the six-step procedure is non-negotiable not because the HSE says so but because the indicator can fail. Calibration cycles must be maintained and visible. RAMS that specifies a second person must mean a second person, not a supervisor signature alone. The supervisor sign-off is a verification act, not a formality. The cascade reaches from operative (s.7) through supervisor (s.7) to director (s.37) to firm (s.2) in routine HSE practice; one set of facts often produces four defendants."
      >
        <p>Patterns the HSE looks for in isolation-failure prosecutions:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Procedure shortcut</strong> — second prove skipped, lock-off omitted, tag-out
            unsigned.
          </li>
          <li>
            <strong>Equipment failure</strong> — out-of-calibration indicator, missing proving
            unit, damaged probes.
          </li>
          <li>
            <strong>Lone working</strong> — second-person provision specified in RAMS but absent
            on site.
          </li>
          <li>
            <strong>Time pressure</strong> — commercial deadline, customer complaint, end-of-shift
            commitment.
          </li>
          <li>
            <strong>Supervisor sign-off without verification</strong> — RAMS approved on paper but
            conditions not checked on site.
          </li>
          <li>
            <strong>Training records lapsed</strong> — operative&apos;s safe-isolation refresher
            expired or never undertaken.
          </li>
          <li>
            <strong>Culture indicators</strong> — recent near-misses unreported or ignored, audit
            findings not actioned.
          </li>
          <li>
            <strong>Multi-defendant outcome</strong> — firm under s.2, director under s.37,
            supervisor under s.7, operative under s.7 if surviving.
          </li>
          <li>
            <strong>Custodial sentence available for individuals</strong> — Sentencing Council
            guideline puts individual custody on the table for high culpability / Category 1 harm.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>
        Inspector walkthrough — what an HSE audit of isolation practice looks like
      </ContentEyebrow>

      <ConceptBlock
        title="The structured way an HSE inspector tests whether the firm’s isolation system is real"
        plainEnglish="HSE inspectors auditing a firm’s isolation practice work through a structured pattern. They start with the firm’s written safety policy (s.2(3)) and the firm’s EAWR / safe-isolation procedure document. They then move to records — calibration certificates for voltage indicators; training records for operatives; permit registers where applicable; near-miss / incident logs; previous audit findings. They then move to assets — the indicators themselves, the proving units, the lock-off devices, the tags. Finally they move to site — unannounced visit to observe the procedure in action; question operatives about what they do; cross-reference the operative’s account against the documentation. Discrepancies at any level (policy, records, assets, site) feed the inspector’s judgement on whether the system is real or paper-only."
        onSite="The L3 supervisor in advance of any inspection should be confident the firm can survive each stage. The documentation should match practice; the practice should match documentation. Either alone fails the audit. Mock audits within the firm — the L3 supervisor running through the inspector’s pattern as a self-check — are a high-yield investment of an afternoon."
      >
        <p>Inspector audit sequence and what passes / fails each stage:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Stage 1 — written policy and procedure</strong> — current, signed, dated,
            brought to operatives&apos; notice; references EAWR Reg 13 and the six-step procedure.
          </li>
          <li>
            <strong>Stage 2 — calibration records</strong> — voltage indicators all in date;
            proving units functional; lock-off devices fit for purpose.
          </li>
          <li>
            <strong>Stage 3 — training records</strong> — operatives current on safe-isolation
            training; refresher cycle adhered to; competence assessed practically not just by
            certificate.
          </li>
          <li>
            <strong>Stage 4 — permit and isolation certificate register</strong> — completed
            forms; sign-on / sign-off; archive of past permits.
          </li>
          <li>
            <strong>Stage 5 — near-miss / incident log</strong> — any events related to isolation;
            actions taken; trend tracking.
          </li>
          <li>
            <strong>Stage 6 — audit history</strong> — previous internal audits; findings; actions
            closed.
          </li>
          <li>
            <strong>Stage 7 — site observation</strong> — unannounced visit to a live job; observe
            the procedure; verify equipment used matches the registered kit.
          </li>
          <li>
            <strong>Stage 8 — operative interview</strong> — &quot;walk me through what you did
            this morning&quot;; verify operative can articulate the six steps, the equipment, the
            reasoning.
          </li>
          <li>
            <strong>Stage 9 — supervisor interview</strong> — verify supervisor understands the
            procedure, the audit regime, the firm&apos;s wider safety framework.
          </li>
          <li>
            <strong>Stage 10 — final judgement</strong> — coherence across all stages indicates
            the system is real; inconsistencies trigger improvement / prohibition notice or
            prosecution depending on severity.
          </li>
        </ul>
      </ConceptBlock>

      <Scenario
        title="Restoration after work — the under-emphasised second half of the procedure"
        situation={
          <>
            You and an L2 mate have finished the isolated work on a small commercial DB — three
            circuits modified, terminations made, RCBOs replaced. All testing complete. Time to
            restore the supply. Customer is keen to be back online. Your locks and the L2&apos;s
            locks are still on the main switch.
          </>
        }
        whatToDo={
          <>
            Restoration deserves the same discipline as isolation. (1) Final visual check inside
            the DB — no tools left behind, no loose conductors, all terminations tight, no debris.
            (2) Re-cover and re-seal — interior covers refitted, blanking plates in place, gland
            nuts tightened, cover screws torqued. (3) Both operatives confirm work area cleared,
            tools accounted for, no third party in the danger zone. (4) Pre-energisation IR test
            repeated where applicable. (5) Lock-off devices removed by the operatives who fitted
            them — only by the operatives who fitted them. (6) Main switch closed; check no
            breakers trip on energisation; check indicators show healthy. (7) Re-energise
            sub-circuits one by one; watch for trip; confirm operation. (8) Final live testing —
            loop impedance, RCD operation, polarity at outlets. (9) Brief the customer — what was
            done, what to expect, any post-work instructions. (10) Document — restoration time,
            tests carried out, any anomalies. The L2 mate&apos;s lock should not be removed by
            you; they remove their own.
          </>
        }
        whyItMatters={
          <>
            Many isolation-related incidents happen during restoration, not during the isolated
            work itself. Tools left behind cause short circuits when energised. Loose terminations
            heat up and fail later. Removing someone else&apos;s lock removes the human
            accountability that the lock provided. Inspectors recognise &apos;restoration
            discipline&apos; as a separate competence — many firms train the isolation procedure
            carefully but treat restoration as the easy reverse. It isn&apos;t. The L3 supervisor
            models the structured restoration that mirrors the structured isolation; the team
            learns by watching.
          </>
        }
      />

      <SectionRule />
      <FAQ items={faqs} />
      <SectionRule />
      <KeyTakeaways
        points={[
          'Remember from L2 — prove-test-prove, lock-off, tag-out. At L3 you supervise, audit and explain implications.',
          'EAWR Reg 13 is the legal hook. Compliance = six-step procedure on every job, every time.',
          'GS38-compliant voltage indicator + known live source / proving unit. Multimeter is NOT GS38.',
          'Bypass implications cascade: EAWR + HASAWA + RIDDOR + insurance void + s.7 / s.37 personal prosecution + reputational damage.',
          'Multi-source isolation is increasingly common (PV, battery, UPS, generator, dual feed). Identify all sources; isolate each.',
          'Lock-off + tag-out: per operative. Only the operative who fitted the lock removes it. Multi-lock hasps for shared isolation points.',
          'Permits-to-work formalise the isolation procedure for higher-hazard scenarios.',
          'L3 supervisor audits the procedure: observation + records + training currency + incident data. Intervention where slippage seen.',
          'BS 7671 Section 462 / 463 / 537 provide the device-level requirements that allow EAWR Reg 13 to be discharged.',
          'EAWR Reg 12 is the design duty (provide means); Reg 13 the operational duty (use them); Reg 14 the narrow live-working exception; Reg 16 competence.',
          'Restoration discipline mirrors isolation discipline — final visual check, re-cover, sequential energisation, live testing, customer brief.',
          'Inspector audit pattern moves policy → records → assets → site → operative interview. Coherence across all stages is required.',
          'Calibration regime for voltage indicators is part of the safe-isolation system; out-of-calibration indicator treated as no isolation.',
          'Multi-defendant prosecution outcomes are routine — operative s.7, supervisor s.7, director s.37, firm s.2 from one set of facts.',
        ]}
      />
      <Quiz title="Safe isolation supervision — knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Selecting the right protective device for a circuit. BS 88 HRC fuses, BS EN 60898 MCBs, BS
        EN 61009-1 RCBOs. Type B / C / D characteristics, breaking capacity, discrimination, and
        the BS 7671 A4:2026 Table 41.3 max Zs figures (including B32 = 1.37 ohms).
      </p>

      <TLDR
        points={[
          'Three protective device families dominate UK LV: BS 88 HRC fuses (high breaking capacity, cascade backup), BS EN 60898 MCBs (per-circuit overcurrent protection), and BS EN 61009-1 RCBOs (combined overcurrent + RCD).',
          'MCB / RCBO trip characteristics: Type B (3-5 x In magnetic) for general domestic; Type C (5-10 x In) for moderate in-rush; Type D (10-20 x In) for severe in-rush. Higher characteristic = higher fault current required = lower max Zs.',
          "BS 7671 A4:2026 Table 41.3 max Zs for a Type B 32 A on 230 V is 1.37 ohms (with Cmin 0.95). Older editions quoted around 1.44 ohms — design to the current edition's figure.",
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Distinguish the three principal UK LV protective device families — BS 88 HRC fuses, BS EN 60898 MCBs and BS EN 61009-1 RCBOs — by trip characteristic, breaking capacity and typical application.',
          "Select Type B, Type C or Type D MCB / RCBO based on the circuit's in-rush profile and the available Zs to achieve the required disconnection time.",
          'Verify protective device breaking capacity (Icn for MCBs, breaking capacity for fuses) against the prospective fault current at the device (Reg 434.5.1), and recognise when cascade backup is required.',
          'Look up and apply BS 7671 A4:2026 Table 41.3 maximum Zs values for ADS verification, including the current B32 = 1.37 ohms figure with Cmin 0.95.',
          'Coordinate downstream protective devices with their upstream backup to achieve discrimination on a fault and maintain supply to unaffected circuits.',
          'Specify protective devices on the cable schedule with type, rating, breaking capacity, characteristic, RCD class if combined, and the design maximum Zs — sufficient that any future designer or inspector can verify the choice.',
        ]}
        initialVisibleCount={3}
      />

      <ConceptBlock
        title="The three device families and what they do"
        plainEnglish="A fuse is a sacrificial element that vaporises on fault. An MCB is a re-set magnetic-thermal switch. An RCBO is an MCB plus an RCD in one module."
        onSite="Modern UK domestic and small commercial work uses RCBOs almost exclusively for final circuits; BS 88 fuses dominate at the origin (DNO cut-out, supply intake) and on commercial distribution; MCBs without integrated RCD are increasingly relegated to circuits where RCD protection is not required."
      >
        <p>
          <strong>BS 88 HRC fuse</strong> — high-rupturing-capacity fuse standard used at
          installation origins, distribution boards and on commercial circuits. The element
          vaporises in milliseconds on a heavy fault, providing very high breaking capacity
          (commonly 50-80 kA for BS 88-3 / BS 88-2). One-shot device — must be replaced after
          operation. No switching function, no integrated RCD. Used for: DNO cut-out at the intake
          (typically 100 A BS 88-3), main switch fuses at distribution boards, motor circuit
          protection on industrial sites, cascade backup for downstream MCBs in high-PSCC
          environments.
        </p>
        <p>
          <strong>BS EN 60898 MCB</strong> — miniature circuit breaker with magnetic instantaneous
          trip and thermal overload trip in one module. Re-settable. Common ratings 6, 10, 16, 20,
          25, 32, 40, 50, 63 A. Trip characteristics Type B (3-5 x In), Type C (5-10 x In), Type D
          (10-20 x In). Common breaking capacity (Icn) 6 kA or 10 kA. Used for: per-circuit
          overcurrent on distribution boards where RCD protection is provided separately or not
          required.
        </p>
        <p>
          <strong>BS EN 61009-1 RCBO</strong> — combined RCD (residual current device) and MCB in
          one module. Same overcurrent ratings as MCBs, plus a residual current trip threshold
          (typically 30 mA for additional protection on socket-outlets and lighting). RCD types:
          AC (legacy), A (now minimum for most circuits), F (for mixed-frequency residual from
          single-phase inverters / VSDs), B (for smooth DC residual, required on EV charging
          without internal Type B monitoring per Reg 722). Used for: per-circuit combined
          overcurrent + RCD protection — modern domestic and small commercial standard.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 433.1.201 (Coordination with standard protective devices)"
        clause="Where the protective device is a general-purpose type (gG) fuse to BS 88-2, a fuse to BS 88-3, a circuit-breaker to BS EN 60898, a circuit-breaker to BS EN 60947-2 or a residual current circuit-breaker with integral overcurrent protection (RCBO) to BS EN 61009-1, compliance with conditions (a) and (b) also results in compliance with condition (c) of Regulation 433.1.1."
        meaning={
          <>
            Reg 433.1.201 is the practical short-cut that flows from 433.1.1: when the installed
            protective device is one of the listed standard types — BS 88 fuse, BS EN 60898 MCB,
            BS EN 60947-2 MCCB, or BS EN 61009-1 RCBO — meeting the In ≥ Ib and In ≤ Iz conditions
            automatically satisfies the I2 ≤ 1.45 × Iz rule. That is why the device standards
            listed in this lesson (BS EN 60898 MCB, BS EN 60947-2 MCCB, BS EN 61009-1 RCBO) dominate
            UK distribution boards: pick the standard device, size to In, and overload
            coordination falls out for free. A non-listed device or a BS 3036 semi-enclosed fuse
            needs the additional 0.725 × Iz check from 433.1.202.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 43, Regulation 433.1.201."
      />

      <SectionRule />

      <ContentEyebrow>Trip characteristics — Type B, C and D</ContentEyebrow>

      <ConceptBlock
        title="Type B — general domestic and small commercial"
        plainEnglish="Magnetic trip at 3-5 x In. Default choice for residential CU work — lighting, sockets, fixed appliances, immersions, EV chargers (paired with appropriate RCD)."
      >
        <p>Type B trip curve highlights:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Thermal overload — operates within the standard time-current envelope (1.13 x In = no
            trip in 1 hour, 1.45 x In = trip within 1 hour for In greater than 32 A or within 2
            hours for In less than or equal to 32 A).
          </li>
          <li>Magnetic instantaneous — operates between 3 x In and 5 x In within 100 ms.</li>
          <li>
            Disconnection time at 5 x In on most Type B devices is in the order of 0.1 s, well
            within the 0.4 s requirement for socket-outlet final circuits up to 63 A on a 230 V
            system (Reg 411.3.1.2 and Table 41.1).
          </li>
        </ul>
        <p>
          Type B is the default for residential CU work because most domestic loads sit
          comfortably below 3 x In during normal operation. Lighting, socket-outlet rings, cooker,
          immersion, shower, EV charger (with appropriate RCD class) — all suited to Type B at the
          conventional ratings. The lower magnetic threshold also gives the fastest fault
          clearance for a given Zs, which means the maximum Zs for ADS compliance is the most
          permissive of the three characteristics.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Type C — moderate in-rush"
        plainEnglish="Magnetic trip at 5-10 x In. Used when in-rush would nuisance-trip a Type B but does not justify the harshness of Type D."
      >
        <p>Common Type C applications:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            LED arrays with high in-rush drivers (large commercial / warehouse lighting
            installations where multiple drivers all energise at once).
          </li>
          <li>
            Fluorescent banks with magnetic ballasts (legacy fittings, larger contactor-controlled
            installations).
          </li>
          <li>
            Small motor circuits below 5 kW where DOL starting transient pushes Type B threshold
            (for larger motors use motor protection circuit breakers, MPCBs, with adjustable
            thermal and magnetic settings).
          </li>
          <li>
            Transformer-fed equipment — small distribution transformers, signage with internal
            step-down transformers.
          </li>
        </ul>
        <p>
          The trade-off: Type C requires a lower Zs (higher fault current) to achieve the same
          disconnection time as a Type B of the same rating. Table 41.3 max Zs for a Type C 32 A
          is roughly half that of a Type B 32 A on the same supply. On long radial runs the lower
          max Zs can be the limiting design factor — sometimes forcing a larger cable than the
          thermal calc alone would require.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Type D — severe in-rush"
        plainEnglish="Magnetic trip at 10-20 x In. Industrial use only — large transformers, welders, X-ray plant, heavy DOL motor starts."
      >
        <p>
          Type D is reserved for circuits with severe in-rush — typically 10-20 x rated current
          for several cycles. Common applications:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Large step-up / isolating transformers (10 kVA upwards).</li>
          <li>Welder primaries, particularly resistance welders with very heavy in-rush.</li>
          <li>X-ray equipment — pulsed loads with extreme peak demand.</li>
          <li>
            Heavy DOL motor starts on industrial machines with high inertia (larger compressors,
            pumps with reciprocating loads).
          </li>
        </ul>
        <p>
          Type D requires very low Zs to meet ADS. On most domestic and commercial supplies the Zs
          available cannot meet a Type D max Zs at the end of a radial run — Type D is effectively
          impractical outside short, low-impedance industrial distribution. For most heavy-in-rush
          applications outside of specialist industrial, the design answer is Type C plus careful
          cable / Zs design rather than Type D.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Breaking capacity and Reg 434.5.1</ContentEyebrow>

      <ConceptBlock
        title="Breaking capacity — Icn, Icu and Ics"
        plainEnglish="The fault current the device can interrupt without exploding. Get this wrong and the device fails violently on a real fault."
        onSite="Domestic 6 kA Icn is sufficient for almost all UK domestic installations because the DNO cut-out fuse provides cascade backup and limits PSCC at the consumer unit busbar to within the MCB rating. Commercial work needs to be checked properly."
      >
        <p>
          For BS EN 60898 MCBs there is one main rating: Icn — rated short-circuit breaking
          capacity. Common values 6 kA and 10 kA. The device is type-tested at this current and is
          guaranteed to interrupt it once. (After operating at Icn the device may be damaged and
          need replacing — distinct from operating at the lower 'service' rating where it remains
          usable.)
        </p>
        <p>
          For BS EN 60947-2 MCCBs (moulded-case circuit breakers, used at higher ratings on
          commercial / industrial distribution) there are two ratings:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Icu — ultimate short-circuit breaking capacity. Device interrupts the fault but is
            then expected to be replaced.
          </li>
          <li>
            Ics — service short-circuit breaking capacity. Device interrupts the fault and remains
            in service. Typically Ics = 100 percent, 75 percent or 50 percent of Icu depending on
            device class.
          </li>
        </ul>
        <p>
          For BS 88 fuses the relevant rating is the rated breaking capacity, typically 50-80 kA
          for BS 88-3 / BS 88-2 — comfortably above any LV PSCC encountered in practice. That high
          breaking capacity is why BS 88 fuses dominate at the origin: they handle the maximum
          credible PSCC and provide cascade backup for downstream lower-rated MCBs.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 434.5.1 (Breaking capacity)"
        clause="The rated short-circuit breaking capacity shall be not less than the prospective fault current at the point at which the device is installed, except where backup protection is provided. In the case where backup protection is provided, the characteristics of the devices shall be coordinated so that the energy let through by the upstream device does not exceed that which can be withstood without damage by the downstream device and the conductors protected by it."
        meaning={
          <>
            Reg 434.5.1 sets the breaking capacity rule: every protective device must either rate
            above the prospective fault current at its location, or be backed up by an upstream
            device whose let-through energy is within the downstream device's withstand. The
            cascade option lets a 6 kA Icn MCB sit downstream of a BS 88 main fuse on a circuit
            where the busbar PSCC is 13 kA, provided the manufacturer's cascade tables show the
            combination is type-tested. Without cascade, the device Icn must equal or exceed the
            PSCC.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 43, Regulation 434.5.1."
      />

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Discrimination and Table 41.3</ContentEyebrow>

      <ConceptBlock
        title="Discrimination — clearing the smallest area on a fault"
        plainEnglish="On a fault, the immediate upstream device clears it. Devices further upstream stay closed. The unaffected circuits keep running."
      >
        <p>
          Discrimination (also called selectivity) is the design intent that on any downstream
          fault, only the immediate upstream device operates. The rest of the system stays alive.
          The opposite of discrimination is cascade tripping, where a downstream fault takes down
          its upstream feeder and possibly the whole board — bad for users, bad for fault
          diagnosis, bad for the periodic inspection report.
        </p>
        <p>Discrimination is achieved by coordinating time-current characteristics:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Fuse upstream of MCB — typically discriminates if fuse rating is at least 1.6 x MCB
            rating, AND I²t curves do not cross in the fault range. Manufacturer's cascade tables
            confirm.
          </li>
          <li>
            MCB upstream of MCB — harder. Type-tested combinations are required for full
            discrimination at fault levels; partial discrimination at overload is typical.
          </li>
          <li>
            RCD time-delay (selective S-type 100 ms or general 30 ms) — for discrimination between
            RCDs in series, the upstream RCD is time-delayed (S-type) so the downstream 30 mA
            operates first.
          </li>
          <li>
            BS 88 fuse upstream of BS 88 fuse — typically discriminates if upstream fuse is at
            least 1.6 x downstream rating; manufacturer tables confirm.
          </li>
        </ul>
        <p>
          The L3 designer's job: identify the discrimination scheme on the design pack, cite the
          manufacturer's cascade tables for any non-obvious combination, and make sure the
          installation will behave as intended on a fault. On critical installations (data
          centres, hospitals, life-safety) a mis-coordinated cascade trip can be a notifiable
          event.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Table 41.3 — maximum Zs for ADS"
        plainEnglish="The maximum loop impedance at which the protective device clears a fault within the required disconnection time. Calculated from supply voltage, Cmin and the device's magnetic trip current."
        onSite="The single most-checked figure in design verification. If your calculated Zs at the end of a circuit exceeds the Table 41.3 max for the chosen device, ADS does not work — re-design with a larger cable, a different device characteristic or RCD-based ADS."
      >
        <p>
          Table 41.3 of BS 7671 gives the maximum measured / design Zs for each common protective
          device at which ADS is achieved within the Table 41.1 disconnection time (typically 0.4
          s for socket-outlet circuits up to 63 A, 5 s for distribution and fixed-equipment
          circuits at the relevant rating). Selected current values in BS 7671:2018+A4:2026
          (calculated with Cmin = 0.95):
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>BS EN 60898 Type B 6 A — max Zs approx 7.28 ohms.</li>
          <li>BS EN 60898 Type B 16 A — max Zs approx 2.73 ohms.</li>
          <li>BS EN 60898 Type B 20 A — max Zs approx 2.18 ohms.</li>
          <li>
            BS EN 60898 Type B 32 A — max Zs approx 1.37 ohms (this is the A4:2026 value with Cmin
            0.95; older editions quoted approx 1.44 ohms).
          </li>
          <li>BS EN 60898 Type B 40 A — max Zs approx 1.09 ohms.</li>
          <li>
            BS EN 60898 Type C 16 A — max Zs approx 1.37 ohms (Type C 16 A roughly equivalent to
            Type B 32 A in max Zs because of higher 5-10 x In magnetic threshold).
          </li>
          <li>BS EN 60898 Type C 32 A — max Zs approx 0.68 ohms.</li>
          <li>BS EN 60898 Type D 32 A — max Zs approx 0.34 ohms.</li>
        </ul>
        <p>
          Why A4:2026 changed the figures: Cmin was hardened from approximately 1.0 in older
          editions to 0.95 in A4:2026 to give a more conservative fault-current calculation. The
          maximum Zs reduces by the same ratio. Always design to the current edition's Table 41.3
          — citing an out-of-date max Zs on a new design is a verification finding waiting to
          happen.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 411.3.1.1 (Automatic disconnection in case of a fault)"
        clause="A protective device shall automatically interrupt the supply to the line conductor of a circuit or equipment in the event of a fault of negligible impedance between the line conductor and an exposed-conductive-part or a protective conductor in the circuit or equipment within the disconnection time required by Regulation 411.3.2."
        meaning={
          <>
            Reg 411.3.1.1 mandates ADS — automatic disconnection of supply on an earth fault. The
            device that does the disconnecting must operate within the Table 41.1 time (0.4 s for
            socket-outlet circuits up to 63 A on 230 V, 5 s for distribution and fixed-equipment
            circuits at rated current up to 32 A). The Zs at the fault point must be low enough
            that fault current reaches the device's magnetic trip threshold — Table 41.3 gives the
            max Zs for each common device that satisfies this.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.1.1. See also Regulations 411.3.1.2 and 411.3.2 for circuits in scope of Table 41.1 and disconnection times."
      />

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Things that catch people out</ContentEyebrow>

      <CommonMistake
        title="Specifying Type B on a circuit with high LED in-rush, then debugging nuisance trips for months"
        whatHappens={
          <>
            You spec Type B 6 A on a corridor lighting circuit serving twenty LED downlights. The
            drivers all energise simultaneously when the lighting circuit is switched on from the
            wall switch. Combined in-rush per driver typically 10-20 A peak for tens of
            microseconds; combined across twenty fittings this comfortably exceeds the Type B 6 A
            magnetic threshold of 18-30 A. The breaker trips on switch-on every third or fourth
            time. The customer demands a fix; you swap the breaker, the installer swaps the lamps,
            the fault persists.
          </>
        }
        doInstead={
          <>
            On any LED lighting circuit with more than a handful of drivers, calculate the
            aggregate in-rush from the manufacturer's per-driver in-rush figure. If the total
            in-rush exceeds the Type B threshold for the chosen rating, switch to Type C — the
            magnetic trip moves up to 5-10 x In, comfortably above the in-rush. Verify the Zs is
            low enough for Type C max Zs (about half the Type B figure) — if not, either upsize
            the cable or split the lighting circuit into smaller groups so each switched section
            has fewer drivers and lower aggregate in-rush.
          </>
        }
      />

      <CommonMistake
        title="Using a 6 kA Icn MCB at a commercial CU busbar where PSCC is actually 14 kA"
        whatHappens={
          <>
            You install a 6 kA Icn domestic-spec MCB on a commercial board, assuming intake fuse
            cascade is sufficient. The intake fuse is BS 88-3 100 A but the supply is a short-run
            dedicated cable from the substation, declared PSCC 14 kA at the busbar. On a
            downstream short-circuit fault the BS 88 fuse limits let-through but the actual fault
            current at the MCB peaks above 6 kA — the device fails violently rather than
            interrupting cleanly, sending the case across the panel.
          </>
        }
        doInstead={
          <>
            Always check the declared or measured PSCC at the device's installed point. If it
            exceeds the device's Icn, either upsize the device (10 kA Icn BS EN 60898 MCBs are
            widely available, 25 kA MCCBs available for higher-rated distribution) or use
            cascade-coordinated protection where the upstream device's let-through energy is
            proven by manufacturer cascade tables to be within the downstream device's withstand.
            The schedule must record the assumed PSCC, the device Icn, and the cascade table
            reference if applicable.
          </>
        }
      />

      <Scenario
        title="Domestic CU upgrade — protective device specification page-by-page"
        situation={
          <>
            The running brief for this section. New consumer unit with shower (45 A circuit), EV charger (32 A
            circuit), heat pump (40 A circuit), existing lighting and sockets, kitchen ring final
            and cooker. TN-C-S supply with declared Ze 0.35 ohms, PSCC at intake approximately 6
            kA after intake fuse cascade.
          </>
        }
        whatToDo={
          <>
            Spec each device explicitly on the schedule. Shower: BS EN 61009-1 RCBO 50 A Type B, 6
            kA Icn, 30 mA Type A — design max Zs per Table 41.3 Type B 50 A approx 0.87 ohms. EV
            charger: BS EN 61009-1 RCBO 32 A Type B, 6 kA Icn, 30 mA Type B (required for EV on
            TN-C-S per Reg 722.531.3.101 unless charger has internal Type B equivalent monitoring)
            — design max Zs Type B 32 A approx 1.37 ohms. Heat pump: BS EN 61009-1 RCBO 40 A Type
            C, 6 kA Icn, 30 mA Type A — Type C handles compressor inrush — design max Zs Type C 40
            A approx 0.55 ohms. Lighting: BS EN 61009-1 RCBO 6 A Type B (or Type C if LED-array
            circuit), 30 mA Type A. Sockets ring: RCBO 32 A Type B, 30 mA Type A. Cooker: RCBO 32
            A Type B, 30 mA Type A. Each row on the schedule names manufacturer / part number,
            breaking capacity, characteristic, RCD class and design max Zs.
          </>
        }
        whyItMatters={
          <>
            The schedule is the spec the installer orders to and the inspector verifies against. A
            vague 'MCB 32 A' line on the schedule is an inviting fit-anything-on- hand error.
            Specific lines — BS EN 61009-1 Type B 32 A 6 kA 30 mA Type A manufacturer X part Y —
            are how design discipline shows up in the installed product. The same discipline
            applies to commercial and industrial work; the ratings and types vary, the discipline
            does not.
          </>
        }
      />

      <ConceptBlock
        title="Special-case devices — AFDD, MPCB, fuse-switch combination"
        plainEnglish="Beyond the BS 88 / MCB / RCBO triangle there are specialised devices for specific design problems."
      >
        <p>
          <strong>AFDD (Arc Fault Detection Device, BS EN 62606)</strong> — detects series arc
          faults that an OPD or RCD does not see. Recommended (not yet mandatory in BS 7671) by
          Reg 421.1.7 in AC final circuits to mitigate fire risk. Available as standalone device
          or combined AFDD+RCBO module. See the lesson on devices for protection against the risk
          of fire for full design treatment. HRRBs under
          Building Safety Act 2022 are likely to harden this recommendation into a requirement.
        </p>
        <p>
          <strong>MPCB (Motor Protection Circuit Breaker, BS EN 60947-2 / -4-1)</strong> —
          adjustable thermal overload (typically 0.7-1.0 x In adjustable) and adjustable magnetic
          trip (typically 12-13 x In fixed). Used on industrial motor circuits for fine-grain
          motor protection coordinated with the motor's thermal time constant. Often paired with a
          contactor for DOL switching, replacing the older fuse-plus-overload combination.
        </p>
        <p>
          <strong>Fuse switch / switch fuse</strong> — combination of BS 88 fuse and isolating
          switch in one enclosure. Main switch fuse at distribution boards, main intake fuses on
          commercial sites. Provides switching function (which a bare fuse does not), high
          breaking capacity (which an MCB at the same rating does not), and clean cascade for
          downstream MCBs.
        </p>
        <p>
          <strong>Earth fault relay (BS EN 60947-2 with shunt trip)</strong> — high-current
          circuit breaker with current transformer and earth fault relay providing summative earth
          fault protection at higher RCD thresholds (300 mA, 500 mA) on TT or large TN
          installations where 30 mA additional protection is provided per circuit downstream.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The 'design Zs' figure — calculating it for verification"
        plainEnglish="At design stage you calculate the worst-case Zs at the end of every circuit. The figure must be at or below the Table 41.3 max for the chosen device. The installation is then verified at handover by measurement."
      >
        <p>Design Zs at the end of a circuit:</p>
        <p className="font-mono bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px]">
          Zs = Ze + (R1 + R2) x correction factors
        </p>
        <p>Where:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Ze = declared (or measured) external loop impedance at the supply origin (typically
            0.35 ohms TN-C-S, up to 0.8 ohms TN-S, 100 ohms or higher TT).
          </li>
          <li>
            R1 = phase conductor resistance per metre x circuit length, looked up in OSG Table I1
            / IET tables.
          </li>
          <li>R2 = CPC resistance per metre x circuit length, same source.</li>
          <li>
            Correction factor for conductor temperature at the time of fault — typically 1.20 for
            70 deg C thermoplastic insulation (the cable warms during the fault before
            disconnection).
          </li>
          <li>
            (In some calculation methods Cmin x V is used in the disconnection-current calculation
            rather than as a Zs multiplier; the result is equivalent.)
          </li>
        </ul>
        <p>
          Worked example: a Type B 32 A RCBO on a 25 m run of 4 mm² T&E (2.5 mm² CPC) on a TN-C-S
          supply with declared Ze 0.35 ohms. R1 = 4.6 milliohm/m at 70 deg C x 25 = 0.115 ohms. R2
          = 7.4 milliohm/m at 70 deg C x 25 = 0.185 ohms. Zs = 0.35 + 0.115 + 0.185 = 0.65 ohms.
          Table 41.3 max for Type B 32 A is 1.37 ohms. Zs design = 0.65 ohms, comfortably within
          max — ADS verified at design stage. Measured Zs at handover (cold cable, ambient) will
          be lower than 0.65 ohms, comfortably within the design figure.
        </p>
      </ConceptBlock>

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Three protective device families dominate UK LV: BS 88 HRC fuses (high breaking capacity, cascade backup), BS EN 60898 MCBs (per-circuit overcurrent), and BS EN 61009-1 RCBOs (combined overcurrent + RCD).',
          'Type B (3-5 x In magnetic): default for residential and small commercial. Type C (5-10 x In): moderate in-rush — LED arrays, fluorescent banks, small motors. Type D (10-20 x In): industrial only — large transformers, welders, heavy DOL.',
          'Higher trip characteristic = higher fault current required = lower max Zs. A Type C 32 A has roughly half the max Zs of a Type B 32 A; a Type D requires very low Zs and is impractical at the end of long radials.',
          "BS 7671 A4:2026 Table 41.3 max Zs for Type B 32 A on 230 V is 1.37 ohms with Cmin 0.95. Older editions quoted approximately 1.44 ohms. Design to the current edition's figures.",
          "Reg 434.5.1: device breaking capacity must equal or exceed PSCC at its installed point, OR be backed up by a cascade-coordinated upstream device with proven let-through energy within the downstream device's withstand.",
          'RCD class for combined RCBOs: Type A is the modern minimum; Type F for circuits with single-phase inverters / VSDs; Type B mandatory for EV charging on TN-C-S without internal Type B equivalent monitoring (Reg 722.531.3.101).',
          'Discrimination — clearing the smallest area on a fault — requires coordinated time-current characteristics. Fuse upstream of MCB: typically discriminates if fuse is at least 1.6 x MCB rating; verify with manufacturer cascade tables.',
          'The schedule row for each device must state type, rating, breaking capacity, characteristic, RCD class if combined, and design max Zs — sufficient that any future designer or inspector can verify the choice without ringing you.',
        ]}
      />

      <Quiz title="Protective device selection — knowledge check" questions={quizQuestions2} />
    </div>
  );
}
