/**
 * Ported from the English course, combining:
 *   level3/module5/section6/Sub1.tsx
 *   level3/module5/section6/Sub3.tsx
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';

const checks = [
  {
    id: 'm5-s6-sub1-form-pick',
    question:
      'You have just installed a new shower circuit on a 2.5 mm² + CPC cable from the existing CU, with a new 32 A Type A RCBO. Which certificate is required?',
    options: [
      'A Minor Electrical Installation Works Certificate (MEIWC) on its own — the work is small and uses only a short length of cable, so it falls within minor-works scope.',
      'No certificate at all — adding a circuit to an existing consumer unit is maintenance of the existing installation rather than new work.',
      'EIC + Schedule of Inspections + Schedule of Test Results — the work provides a new circuit, and BS 7671 reserves the MEIWC for minor works that do NOT include a new circuit.',
      'An EICR — because the existing consumer unit is being added to, the whole installation must be condition-reported rather than certified.',
    ],
    correctIndex: 2,
    explanation:
      'The MEIWC is defined for minor works that do NOT include the provision of a new circuit. Adding a brand-new shower circuit, even off an existing CU, is a new circuit — so the EIC + Schedule of Inspections + Schedule of Test Results pack is required. The classic confusion: people think "small job = MEIWC". The test is not size, it is whether a new circuit was created. New circuit always means EIC, regardless of how few extra metres of cable were involved.',
  },
  {
    id: 'm5-s6-sub1-defect-rule',
    question:
      'Reg 644.1.1 covers what happens when a defect is revealed during inspection and testing of a NEW installation:',
    options: [
      'For a new installation, any defect or omission revealed during inspection and testing shall be corrected before the Certificate is issued — fix first, retest, then certify.',
      'The defect may be recorded as a C2 observation on the Certificate and left for the duty holder to remedy at a later date.',
      'The Certificate is issued with the defect noted in the Departures box, since a deliberate deviation from BS 7671 is permitted if the designer accepts it.',
      'The Certificate is issued and a separate Minor Works Certificate is raised to cover the corrective work once it is carried out.',
    ],
    correctIndex: 0,
    explanation:
      'Reg 644.1.1 is the regulatory backbone of "test then certify". The EIC certifies the installation is safe and compliant at the moment of issue. You cannot legitimately certify an installation with a known IR fault, a non-compliant Zs, a missing CPC continuity, or any other identified defect. The corrective work is part of the original installation — no separate certificate required for the fix itself.',
  },
  {
    id: 'm5-s6-sub1-three-roles',
    question:
      'On a small domestic CU swap-out done by a single self-employed electrician, the EIC requires signatures for:',
    options: [
      'A single signature — because one person carried out the whole job, only one declaration is needed and the designer and constructor boxes are left blank.',
      'Two signatures — constructor and inspector — the design block is only completed on commercial work where a separate consulting engineer is involved.',
      'Three signatures — designer, constructor and inspector — even where one competent person did all three roles, each role-holder declaration is signed separately on the EIC.',
      'Four signatures — designer, constructor, inspector and the duty holder, who countersigns to accept responsibility for the completed installation.',
    ],
    correctIndex: 2,
    explanation:
      'The EIC has three signed declarations: designer (responsible for the design), constructor (responsible for the installation work), inspector (responsible for the inspection and testing). The same competent person can hold all three on a small job — and most domestic CU swaps are exactly that. Each role declaration is signed individually on the form. Forging a signature, leaving a role blank, or signing a role you did not perform invalidates the certificate and exposes you to professional and insurance consequences.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 7671 Section 644 sets out which three certification forms?',
    options: [
      'Electrical Installation Certificate (EIC), Electrical Installation Condition Report (EICR), and Building Regulations Compliance Certificate — the three documents every notifiable job must produce.',
      'EIC for new work or major alterations, MEIWC for minor alterations not creating a new circuit, and EICR for periodic inspection of an existing installation.',
      'Schedule of Inspections, Schedule of Test Results, and Minor Electrical Installation Works Certificate — the three schedules that make up every certification pack.',
      'Electrical Installation Certificate (EIC), Portable Appliance Test record, and Periodic Inspection Report — covering fixed wiring, appliances and periodic checks respectively.',
    ],
    correctAnswer: 1,
    explanation:
      'Section 644 of BS 7671:2018+A4:2026 prescribes three model forms: EIC for new installations and major alterations; MEIWC for minor alterations that do NOT include a new circuit; EICR for periodic inspection of an existing installation. Each has a different scope, a different recording template and a different signer relationship.',
  },
  {
    id: 2,
    question:
      'A circuit on the new domestic CU swap-out fails IR — reads 0.6 MΩ on a 500 V test (below the 1 MΩ minimum). The customer is keen to move in. What does Reg 644.1.1 require?',
    options: [
      'Issue the EIC with the 0.6 MΩ reading recorded, since the customer is moving in and any reading above zero shows the circuit is not a dead short.',
      'Issue the EIC and note the low reading in the Departures box as an accepted deviation from the 1 MΩ minimum.',
      'Correct the defect, retest, then issue the EIC. Reg 644.1.1 makes certificate issue conditional on correction of defects revealed during inspection and testing for new installations.',
      'Issue the EIC now and raise a separate EICR coding the low reading as a C3, leaving the customer to arrange the remedial work.',
    ],
    correctAnswer: 2,
    explanation:
      "Reg 644.1.1 is unconditional — for a new installation, any defect or omission revealed during inspection and testing shall be corrected before the Certificate is issued. The customer's pressure to move in does not override the regulation. Find the IR fault (likely a back-box pinch or damaged cable section), fix it, retest the circuit, then issue the EIC with all readings clean.",
  },
  {
    id: 3,
    question:
      'On an addition or alteration (not a new installation), the defect-correction rule changes how?',
    options: [
      'It does not change at all — every defect found anywhere in the installation, new or pre-existing, must be corrected before the Certificate for the alteration can be issued.',
      'It removes the duty entirely — for an alteration the installer simply records all findings as observations and issues the Certificate regardless of any defect.',
      'It shifts the duty to the duty holder — the installer issues the Certificate immediately and the client becomes responsible for correcting any defect found before energising.',
      'Only defects that affect the SAFETY of the addition or alteration itself must be corrected before issue; pre-existing defects elsewhere are recorded as observations.',
    ],
    correctAnswer: 3,
    explanation:
      'The wording for additions and alterations is narrower than for new work. The defect-correction obligation applies only to defects that will affect the safety of the addition or alteration itself. Pre-existing defects in unaltered parts of the installation are recorded in the Comments on existing installation section of the EIC, but do not block certification of the new portion. The customer can then choose to deal with those pre-existing items separately, typically by commissioning an EICR.',
  },
  {
    id: 4,
    question: 'The MEIWC may be used for:',
    options: [
      'Minor works that do NOT include a new circuit — adding a socket or lighting point to an existing circuit, or a like-for-like accessory replacement.',
      'A full consumer unit replacement, because every existing circuit is simply reconnected rather than newly installed.',
      'A single new circuit run from the consumer unit, provided only one circuit is added and the cable run is short.',
      'Periodic inspection of an existing installation, recording the condition of each circuit with C-codes.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 defines MEIWC scope precisely — it is for minor works that do NOT include a new circuit. Permitted examples: extra socket-outlet on an existing ring, extra lighting point on an existing lighting circuit, like-for-like accessory replacement. Not permitted: any new circuit (even a single-circuit addition), CU replacement, replacement of a non-like-for-like protective device. Use the EIC trio for those.',
  },
  {
    id: 5,
    question:
      'The EIC has separate signed declarations for designer, constructor and inspector. On a domestic CU swap by a single self-employed electrician:',
    options: [
      'Only the inspector declaration needs signing, because the design and construction of a like-for-like consumer unit swap do not require certification.',
      'All three roles are signed separately by the same competent person — each a distinct declaration with its own legal weight, not interchangeable.',
      'A single combined declaration is signed once, because one person performed all three roles and the EIC merges them into one signature on a domestic job.',
      'The three roles are signed by three different people, so a sole trader cannot lawfully issue an EIC for a consumer unit swap carried out alone.',
    ],
    correctAnswer: 1,
    explanation:
      'Each role declaration is signed individually even where the same person fulfils all three. Designer = "I am responsible for the design of the work described above". Constructor = "I am responsible for the construction of the work described above". Inspector = "I am responsible for the inspection and testing of the work described above". Three separate declarations of three distinct responsibilities — the same name and signature can appear in each box on a one-person job, but the declarations are not consolidated.',
  },
  {
    id: 6,
    question: 'The Departures from BS 7671 box on the EIC is for:',
    options: [
      'Recording any defect found during testing that the installer has chosen not to correct, so the duty holder is aware of it before energising.',
      'Listing the parts of the installation that were inaccessible at the time of inspection and could not be verified.',
      'Any deliberate deviation from a BS 7671 requirement that the designer judges acceptable, documented with reasoning and accepted by the duty-holder.',
      'Noting any items where the installation exceeds the BS 7671 minimum, such as fitting AFDDs where only recommended, as a record of enhanced provision.',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 recognises that not every numerical requirement can or should apply to every installation. The Departures section is the formal record of any deliberate deviation. Common examples include: socket-outlet without RCD under the Reg 411.3.3 risk-assessment exception; overlong cable run accepted with reduced disconnection time; equipment fitted in a special location with mitigating measures. Each departure must be accepted by the designer and the duty-holder, and recorded so any future inspector understands the reasoning.',
  },
  {
    id: 7,
    question: 'An EICR is issued at the end of:',
    options: [
      'The initial verification of a brand-new installation, certifying that the new work complies with BS 7671 before it is energised for the first time.',
      'A minor alteration to an existing circuit, such as adding a socket, where no new circuit has been created.',
      'A consumer unit replacement, recording the test results for every circuit reconnected to the new board.',
      'A periodic inspection of an EXISTING installation — assessing continued safe use, coding observations C1/C2/C3/FI and recommending a next inspection date.',
    ],
    correctAnswer: 3,
    explanation:
      'EIC = certifies new work or major alteration as safe and compliant on the day of issue. EICR = reports on the condition of an existing installation, telling the duty-holder whether it remains safe for continued use. Different purposes, different forms, different signer relationships. Mixing them up — issuing an EICR for new work, or an EIC for a periodic inspection — is a fundamental coding error that invalidates the document.',
  },
  {
    id: 8,
    question:
      "After issuing the EIC for a domestic CU swap, the contractor's minimum copy retention period (per common UK industry practice tied to the Limitation Act) is:",
    options: [
      'At least six years for civil liability under the Limitation Act, with most PI insurers and Competent Person Schemes requiring 10 to 25 years.',
      'No retention is required once the customer has been handed the original — the contractor can dispose of their copy immediately after issue.',
      'Exactly twelve months, after which the certificate is superseded and the contractor must destroy it to comply with data protection rules.',
      "Until the next periodic inspection only, at which point the new EICR replaces the original EIC in the contractor's records.",
    ],
    correctAnswer: 0,
    explanation:
      'Six years is the Limitation Act minimum for civil claims arising from contract or tort. PI insurers and Competent Person Schemes typically require longer — 10 to 25 years is common. Customer keeps the original for the lifetime of the installation. CPS holds its own copy via the upload portal. Cloud storage on the contractor side has made indefinite retention trivially cheap and is now standard practice.',
  },
];

const faqs = [
  {
    question:
      'If I do a CU swap and one circuit downstream has a marginal IR reading from old wiring, does Reg 644.1.1 force me to rewire that circuit before I can issue the EIC?',
    answer:
      'No — but read the regulation carefully. Reg 644.1.1 applies to NEW installations. A CU swap is technically an alteration to an existing installation, so the addition/alteration variant applies — defects affecting the SAFETY of the alteration must be corrected, but pre-existing defects elsewhere are recorded as observations on the EIC under Comments on existing installation. A marginal IR reading on existing wiring is recorded, the customer is advised, and the EIC for the alteration can issue with the observation noted. If the reading is so low that it actively endangers the new CU work (e.g. the IR fault is on the circuit you are now protecting with a 30 mA RCD that may trip continuously), then it does affect safety of the alteration and you must address it before issue.',
  },
  {
    question:
      'What is the legal status of the EIC — is it a certificate I issue, or one the customer issues?',
    answer:
      "You issue it. The EIC is a signed declaration by the competent persons (designer, constructor, inspector) that the work has been designed, constructed, inspected and tested in accordance with BS 7671. The customer receives it as evidence of compliance. They do not sign it — their signature is not required and would not add legal weight. The contractor's name, address, signature and contact details on the EIC make the contractor accountable for the work the certificate covers.",
  },
  {
    question:
      'Can I sign as designer on a job where the consulting engineer designed the install but I built it?',
    answer:
      'No — sign only the role you actually performed. Designer goes to the consulting engineer (their name, address and signature). You sign as constructor and, if you also did the inspection and testing, as inspector. Three different organisations on three different role boxes is normal on commercial work. Each signs only their own role.',
  },
  {
    question:
      'A customer asks me to back-date the EIC because the work was completed two weeks ago and they need it for a remortgage that closes tomorrow. Can I?',
    answer:
      'No. The EIC is dated to the date the certification work (final inspection and testing) was completed and the declarations were signed. Back-dating is dishonesty and can amount to fraud. If the customer needs a certificate dated within a particular window for a transaction, the right answer is to issue it with the actual completion date and let the customer present it to the lender. If the lender will not accept the actual date, that is between the customer and the lender — the contractor cannot fix that with a false certificate.',
  },
  {
    question:
      'My instrument download from the multi-function tester says one circuit had a Zs reading taken on a different date from the rest. Does that matter for the EIC?',
    answer:
      'It depends. Most CU swaps and large jobs span more than one day — first-fix on day one, test and commission on day two. The EIC date is the date the certification work was completed and the inspector signs. Individual test readings may be from across the test period. What you should NOT do is mix readings from different visits months apart and present them as if from a single completion — that misrepresents when the installation was certified safe. Same-job, multi-day readings recorded with their actual capture dates is fine; aged stale readings recycled into a fresh certificate is not.',
  },
  {
    question:
      'Where do I record the next inspection due date on the EIC, and how do I decide what it should be?',
    answer:
      'There is a dedicated field on the EIC for the recommended date of the next inspection. Set it per IET Guidance Note 3 frequency tables — domestic owner-occupied 10 years, rented domestic 5 years (also driven by the Electrical Safety Standards in the Private Rented Sector regs in England), commercial 5 years, industrial 3 years, with shorter intervals for higher-risk locations (swimming pools, agricultural, marinas). The number is a recommendation — the duty-holder can accelerate it on risk grounds. Document any rationale in the Comments box if you set it shorter than the GN3 default for the property type.',
  },
];

const checks2 = [
  {
    id: 'm5-s6-sub3-chain-order',
    question:
      'On a commercial new-build commissioning, the documentation chain runs in what order?',
    options: [
      'Designer (design pack) → installer (as-builts) → tester (test results) → certifier (signed EIC) → customer (O&M pack).',
      'Customer (brief) → certifier (EIC) → designer (design pack) → installer (as-builts) → tester (test results).',
      'Installer (as-builts) → designer (design pack) → tester (test results) → customer (O&M pack) → certifier (EIC).',
      'Tester (test results) → installer (as-builts) → designer (design pack) → certifier (EIC) → customer (O&M pack).',
    ],
    correctIndex: 0,
    explanation:
      'Each role generates documentation that the next role uses. Designer produces the design pack (single-line diagrams, panel schedules, calculations, specs) under Reg 132.13. Installer marks up the design with as-built changes and records the materials actually fitted. Tester records every reading on the Schedule of Test Results plus separate RCD/Zs witness sheets where the spec calls for them. Certifier (typically the senior electrician or commissioning engineer) signs the EIC top-level declarations and assembles the pack. Customer receives the consolidated O&M manual with everything in it.',
  },
  {
    id: 'm5-s6-sub3-design-pack',
    question:
      'The design pack handed from designer to installer at the start of the project should include:',
    options: [
      'Single-line diagrams, panel schedules, circuit calculations, OCPD and earthing specifications, and a departures log.',
      'The completed Schedule of Test Results, so the installer knows the target readings before starting and installs to hit them.',
      'The signed Electrical Installation Certificate, which the installer follows as the specification for the whole job.',
      "The customer's verbal brief written up as a method statement, with the detailed design produced afterwards from the as-builts.",
    ],
    correctIndex: 0,
    explanation:
      "The design pack is the installer's reference for what was specified. Without it, the installer is reverse-engineering the design from a verbal brief — a sign-off risk and a fault-tracing nightmare years later. Standard design pack contents: single-line diagrams, panel schedules with circuit-by-circuit OCPD selections, calculations supporting cable sizes and disconnection times, earthing arrangement spec, fault-clearance Zs targets, departure log, interface drawings with adjacent disciplines.",
  },
  {
    id: 'm5-s6-sub3-witness-sheets',
    question:
      'On a larger commercial commissioning, separate witness sheets for RCD trip times and Zs are typically used because:',
    options: [
      'BS 7671 prohibits recording RCD and Zs values on the standard Schedule of Test Results, so a separate witness sheet is the only permitted place to enter them.',
      'They replace the Schedule of Test Results entirely on commercial work, removing the need to complete the standard BS 7671 schedule for those circuits.',
      'The contract or spec requires a countersigned record of safety-critical items, adding an audit trail on top of the standard schedule.',
      'BS 7671 Part 6 makes them a regulatory requirement for every installation above a defined size, and omitting them invalidates the EIC.',
    ],
    correctIndex: 2,
    explanation:
      'Separate witness sheets are a contract or specification overlay on top of the BS 7671 minimum. They are not a regulatory requirement — the Schedule of Test Results captures the same data — but they provide an additional countersigned record on safety-critical items. Common on commercial fit-outs, public buildings, healthcare estates and hazardous locations where the project specification calls for redundant audit. The witness sheet typically captures the meter serial, the test value, the date, and signatures from both the testing electrician and the witnessing engineer.',
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question:
      'On a small domestic CU swap by a single self-employed electrician, the commissioning paperwork chain:',
    options: [
      'Disappears entirely — on a one-person domestic job no documentation chain exists, so only the EIC is produced and no other records are needed.',
      'Collapses to one person signing all three EIC declarations, but every documentation link still exists in compressed form.',
      'Requires the sole trader to subcontract the design and testing roles to separate competent persons, because one individual cannot lawfully sign all three EIC declarations.',
      'Is replaced by a single Minor Works Certificate, which combines the design, construction and inspection roles into one declaration for any domestic job.',
    ],
    correctAnswer: 1,
    explanation:
      "Even on a one-person job the chain is logically present. The electrician designs the work (Zs calculations, RCBO selection, earthing review) — designer role. Installs it — constructor role. Tests and inspects — inspector role. Signs each declaration on the EIC. The documentation chain is shorter (no separate design pack handed over to a different person) but every step still exists. The single competent person carries each role's accountability into a single set of signatures on the EIC.",
  },
  {
    id: 2,
    question: 'Reg 132.13 sits where in the commissioning chain?',
    options: [
      'Only at the very end — it applies solely to the customer handover, requiring operating instructions once the installation is certified.',
      'Nowhere in the commissioning chain — it is a testing regulation governing the dead-test sequence, sitting within Part 6 rather than the design chain.',
      "At the start — it is the design-side documentation requirement, and the same data flows through to the customer's O&M pack at handover.",
      "Only on commercial projects — it applies to fit-outs above a defined size and has no bearing on a domestic installation's documentation chain.",
    ],
    correctAnswer: 2,
    explanation:
      'Reg 132.13 sets the documentation requirement at the design phase — diagrams, schedules, circuit charts, protective-device location information for every installation. The design pack handed from designer to installer is the project-start delivery of Reg 132.13. The certifier folds the same documentation (with as-built mark-ups) into the customer pack. So Reg 132.13 spans the entire chain — start (designer), middle (installer mark-ups), end (customer pack).',
  },
  {
    id: 3,
    question: 'The installer hands to the tester:',
    options: [
      'The signed Electrical Installation Certificate, so the tester can confirm the readings match the values already certified before testing.',
      "The customer's Building Control Compliance Certificate, which the tester needs in order to begin the live-test sequence.",
      'Nothing — the tester works entirely from the original design pack, the two roles being kept separate for independence.',
      'Marked-up as-builts, materials register, dead-test record, and confirmation of safe-isolation status for live testing.',
    ],
    correctAnswer: 3,
    explanation:
      "The installer's deliverables to the tester are: as-built mark-ups (any deviations from the design), materials register (what brand of RCBO, what cable batch — useful for warranty and traceability), dead-test record sheet (continuity and IR readings recorded as installation progressed — saves the tester repeating work), and the safe-isolation status (which circuits can now be live-tested and which still need work). The tester then completes the live-test sequence and the Schedule of Test Results.",
  },
  {
    id: 4,
    question: 'The certifier (commissioning engineer or senior electrician) hands to the customer:',
    options: [
      'The Operations and Maintenance (O&M) pack — the consolidated bundle of certification, schedules, design pack, as-builts, manuals and maintenance schedule.',
      'The signed EIC alone — the schedules, design pack and manuals are retained by the certifier and released only on later request.',
      'The manufacturer manuals alone, the test documentation being technical information held by the contractor rather than the customer.',
      'A verbal confirmation that the installation is safe, with the written O&M pack lodged with Building Control rather than the customer.',
    ],
    correctAnswer: 0,
    explanation:
      "The O&M pack is the customer's evidence base for the lifetime of the installation. On commercial work it can run to hundreds of pages. On domestic it may be a 30-page folder or a bookmarked PDF. The pack contains everything from each role in the chain — design pack from designer, as-built mark-ups from installer, test results from tester, signed certification from certifier, and equipment manuals. Any future facility manager, EICR inspector or fault-finder picks up the O&M and has the full picture.",
  },
  {
    id: 5,
    question: 'Pre-commissioning checks2 (before any energisation) include:',
    options: [
      'Energising every circuit first, then carrying out the visual inspection and dead tests with the supply live to reflect real operating conditions.',
      'Visual inspection, the dead-test sequence (continuity, IR), circuit identification and isolation lock-off — all completed and passed before energisation.',
      'Live tests only — Zs and RCD trip times are measured before any dead testing, to establish the supply characteristics the rest depends on.',
      'A functional check of every accessory by switching it on and off, with no measurements, the schedule being completed after the install is in service.',
    ],
    correctAnswer: 1,
    explanation:
      'The pre-commissioning sequence is structured to catch issues before any live work. Visual inspection is first (Reg 642). Dead-test sequence next (continuity, IR, polarity at the CU — Reg 643.3). Circuit identification confirmed against the design pack and the CU labels. Isolation lock-off verified. Dead-test readings compared to expected values from the design (Zs calculation, R1+R2 expected from cable lengths) — anomalies investigated before energising. Only then is the supply restored and live testing proceeds.',
  },
  {
    id: 6,
    question:
      'The Operations and Maintenance manual on a commercial fit-out typically lives where after handover?',
    options: [
      'With the DNO, which holds the master copy of every commercial O&M manual as part of the supply records for the building.',
      'With Building Control, which retains the O&M manual as the formal compliance record and releases it only on a property sale.',
      'On the client side — held by the facilities manager and building owner, with a contractor soft copy kept for warranty and PI purposes.',
      'With the Competent Person Scheme, which stores the O&M centrally and issues sections to whichever contractor carries out future work.',
    ],
    correctAnswer: 2,
    explanation:
      "The O&M is the building's electrical history. Facilities manager uses it daily — fault diagnosis, planned maintenance, supplier contacts. Building owner retains a copy for compliance and asset evidence. Contractor retains a soft copy for warranty (typically 12 months on installation work, longer on equipment) and PI (6+ years per Limitation Act). On a property sale, the O&M transfers with the property — the next owner inherits the same reference base.",
  },
  {
    id: 7,
    question: 'On a domestic CU swap, the simplified commissioning chain typically is:',
    options: [
      "Identical to a commercial fit-out — a separate bound O&M manual, individual witness sheets and a third-party engineer's sign-off are all required.",
      'Reduced to a single verbal handover with no written documentation, since a domestic job does not require an EIC or any retained records.',
      'Split across four separate contractors each issuing their own certificate, because one person cannot hold all four roles on a domestic job.',
      'Compressed into the EIC trio plus customer pack, with design notes held in the contractor file and a verbal walk-through covering the handover.',
    ],
    correctAnswer: 3,
    explanation:
      'Domestic commissioning compresses the chain. The single competent person fulfils designer, installer, tester and certifier roles. The design notes (Zs calculations, RCBO selection, earthing review) typically live in the contractor file rather than being separately bound and handed to the customer. The customer pack is the EIC trio + manuals + as-built schedule + operational instructions. The verbal walk-through covers the parts a commercial O&M would document at length. Lighter chain, same logical content.',
  },
  {
    id: 8,
    question: 'Documentation chain integrity matters most when:',
    options: [
      "Years later — at a fault, sale, EICR, insurance claim or alteration, where a weak link can compromise the installation's defendability.",
      'Only on the day of handover — once the customer has signed for the pack the documentation has served its purpose and no longer matters.',
      "Only during the CPS audit — the chain matters solely so the scheme assessor can verify the contractor's paperwork, and no one else.",
      'Only while the installation is being commissioned — once energised and working the documentation is redundant, the install speaking for itself.',
    ],
    correctAnswer: 0,
    explanation:
      'The documentation chain is invisible while everything works. It becomes critical when something happens — a fault months later, a sale years later, an EICR a decade later, an insurance claim after an incident, an alteration project that has to start from "what was actually installed". A complete, traceable chain answers every question. A weak chain leaves the customer (and the contractor) defending a position with incomplete evidence.',
  },
];

const faqs2 = [
  {
    question:
      'On a small domestic job, do I really need to keep separate design notes if I am also the installer and the tester?',
    answer:
      'Yes — even if they live only in the contractor file. The design notes (Zs calculations, RCBO selection rationale, earthing review, voltage drop check, AFDD applicability) are evidence of the design step. They support the designer declaration on the EIC. They protect you if a defect emerges later and you need to evidence the design judgement. They also protect you in a CPS audit, where the assessor may ask to see how you arrived at the protective device selection and the disconnection time compliance. A one-page calculation sheet per job, kept in the cloud file, is enough on most domestic work.',
  },
  {
    question: 'What is the difference between commissioning and verification?',
    answer:
      'Verification (Part 6 of BS 7671) is the BS 7671 compliance confirmation — visual inspection, dead test, live test, signed certificate. Commissioning is broader — it includes verification PLUS functional testing of the installation in operation (every circuit energised, every accessory tested, every interlock proved, every changeover proved, every BMS or fire alarm interface tested). On a domestic install the two largely overlap. On a commercial install commissioning is a much bigger phase — it can run to weeks of structured testing across electrical, mechanical, BMS, fire, security and IT systems.',
  },
  {
    question: 'Who signs the commissioning certificate on a commercial fit-out?',
    answer:
      'Depends on the project. Some specs call for a single commissioning engineer to sign the top-level Commissioning Certificate. Others call for separate role sign-offs — the M&E consulting engineer signs the design verification, the principal contractor signs the construction, the appointed commissioning engineer signs the commissioning, the third-party inspector signs the inspection. The EIC sits underneath all of this and carries the BS 7671 declarations. Always read the spec to understand who signs what before commissioning starts.',
  },
  {
    question:
      'On a phased project (multiple commissioning stages), how does the documentation chain work?',
    answer:
      'Each phase is its own commissioning event with its own EIC and its own O&M section. Phase 1 hands over a defined extent — say, the basement plant room and Floor 1 — with a phase-1 EIC covering only that scope. Phase 2 then adds Floor 2 with its own phase-2 EIC. The customer’s master O&M is updated to add each phase’s documentation as it completes. Each phase EIC clearly states its extent ("Floor 1 only" or "Basement plant room only") to avoid ambiguity. Final commissioning at project completion may issue a project-wide EIC covering the whole installation, or may rely on the phased EICs as the certification record.',
  },
  {
    question: 'What if the design changes during construction?',
    answer:
      'Document the change. Most projects use a Technical Query / Design Change Note process — the installer raises a TQ, the designer reviews, issues a Design Change Note (DCN) with the revised information, the installer marks up the as-builts to reflect the change. The certifier records the DCN reference on the EIC under the extent description or the comments. Departures from BS 7671 introduced by a change get logged on the EIC departures section as for any other departure. The audit trail is the TQ + DCN + as-built + signed certification.',
  },
  {
    question: 'How long does the contractor keep the commissioning documentation after handover?',
    answer:
      "Contractor keeps a soft copy indefinitely on commercial work — for warranty (typically 12 months on installation, longer on equipment), professional indemnity (6+ years per the Limitation Act floor; 10-25 years per most PI policies), CPS audit (duration of scheme membership plus a trailing window), and to support the customer if their copy is ever lost. On domestic work the same retention principles apply — cloud storage of PDFs has made indefinite retention trivially cheap. The customer's O&M and EIC pack are the master documents; the contractor's copy is the back-up plus the contractor's own protection.",
  },
];

export default function Lesson317E_4_1() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Section 644 of BS 7671 sets out three distinct certification forms — EIC for new work and
        major alterations, MEIWC for minor work that does not include a new circuit, EICR for
        periodic inspection. Picking the wrong form invalidates the certification.
      </p>

      <TLDR
        points={[
          'BS 7671 Section 644 prescribes three model forms — EIC (new work + major alterations), MEIWC (minor work without a new circuit), EICR (periodic inspection of an existing installation). Each has defined scope and is not interchangeable.',
          'Reg 644.1.1 — for a new installation, any defect or omission revealed during inspection and testing shall be corrected before the Certificate is issued. Fix first, retest, then certify.',
          'For an addition or alteration the rule narrows — only defects that will affect the safety of the addition or alteration must be corrected before issue. Pre-existing defects elsewhere are recorded as observations.',
          'The EIC carries three separate signed declarations — designer, constructor, inspector. On a one-person domestic job the same name appears three times, but each declaration is signed individually.',
          'Departures from BS 7671 are documented on the EIC with reasoning and acceptance by the duty-holder. Comments on existing installation captures observations on unaltered parts.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify the three Section 644 model forms (EIC, MEIWC, EICR) and the scope each is reserved for.',
          'Pick the correct certificate for a given job, applying the new-circuit test that distinguishes EIC from MEIWC.',
          'State Reg 644.1.1 verbatim and apply the defect-correction rule to a new installation scenario.',
          'Apply the narrower addition/alteration variant — defects affecting the safety of the alteration must be corrected; pre-existing defects elsewhere are recorded as observations.',
          'Complete the three signed declarations (designer, constructor, inspector) on the EIC, including where one competent person fulfils all three roles.',
          'Document Departures from BS 7671 with reasoning and Comments on existing installation for unaltered parts.',
          'Distinguish the EIC (certifies new work) from the EICR (reports on existing installation condition) and avoid the form-mix-up coding error.',
          'Manage EIC retention per Limitation Act, professional indemnity and Competent Person Scheme requirements.',
        ]}
        initialVisibleCount={4}
      />

      <ContentEyebrow>The Section 644 framework — three forms, one job each</ContentEyebrow>

      <ConceptBlock
        title="EIC, MEIWC, EICR — what each form is for"
        plainEnglish="EIC certifies new work or major alterations as safe and compliant on the day of issue. MEIWC certifies minor work on an existing circuit. EICR reports on the condition of an existing installation. Three forms, three purposes, never interchangeable."
        onSite="The single most common form-selection error is using MEIWC for a new circuit. The test is not size — it is whether a new circuit was created. New shower circuit off an existing CU = new circuit = EIC, even though only one circuit was added."
      >
        <p>The Section 644 model forms and their scope:</p>

        <div className="hidden sm:block bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[13px]">
          <div className="grid grid-cols-3 gap-3 text-white/90">
            <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">
              Form
            </div>
            <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">
              Reserved for
            </div>
            <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">
              Defect rule (644.1.1 family)
            </div>

            <div>EIC + Schedule of Inspections + Schedule of Test Results</div>
            <div>
              New installations and major alterations — including any new circuit, CU replacement,
              or significant change to the supply or earthing arrangement
            </div>
            <div>
              Any defect or omission revealed during inspection and testing shall be corrected
              before the Certificate is issued (new installation scope)
            </div>

            <div>MEIWC (Minor Electrical Installation Works Certificate)</div>
            <div>
              Individual items of minor works that do NOT include a new circuit — extra
              socket-outlet on existing ring, extra lighting point on existing lighting circuit,
              like-for-like accessory swap
            </div>
            <div>
              Defects affecting the safety of the addition/alteration shall be corrected before
              issue; pre-existing defects elsewhere are recorded as observations
            </div>

            <div>EICR (Electrical Installation Condition Report)</div>
            <div>
              Periodic inspection of an EXISTING installation — assessing whether it remains safe
              for continued use; not a certification of new work
            </div>
            <div>
              EICR is a report, not a certification — observations are coded C1 / C2 / C3 / FI
              rather than blocking issue
            </div>
          </div>
        </div>

        <div className="sm:hidden space-y-2">
          {[
            {
              form: 'EIC + Schedule of Inspections + Schedule of Test Results',
              reserved:
                'New installations and major alterations — any new circuit, CU replacement, significant supply/earthing change',
              defect:
                'Reg 644.1.1: any defect or omission revealed shall be corrected before the Certificate is issued',
            },
            {
              form: 'MEIWC',
              reserved:
                'Minor works that do NOT include a new circuit — extra socket on existing ring, like-for-like accessory swap',
              defect:
                'Defects affecting safety of the alteration corrected before issue; pre-existing defects recorded as observations',
            },
            {
              form: 'EICR',
              reserved:
                'Periodic inspection of an existing installation — condition report, not a certification of new work',
              defect: 'Observations coded C1 / C2 / C3 / FI rather than blocking issue',
            },
          ].map((row, i) => (
            <div
              key={i}
              className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-3 text-[13px]"
            >
              <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold">
                Form
              </div>
              <div className="text-white/90 mt-0.5 font-semibold">{row.form}</div>
              <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold mt-2">
                Reserved for
              </div>
              <div className="text-white/80 mt-0.5">{row.reserved}</div>
              <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold mt-2">
                Defect rule
              </div>
              <div className="text-white/80 mt-0.5">{row.defect}</div>
            </div>
          ))}
        </div>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 644.1.1 (Defect correction prior to certification, new installation) — verbatim"
        clause="For a new installation, any defect or omission revealed during the inspection and testing shall be corrected before the Certificate is issued."
        meaning={
          <>
            The EIC certifies the installation as safe and compliant at the moment of issue. You
            cannot legitimately issue an EIC for a new installation with a known IR fault, a
            non-compliant Zs, a missing CPC continuity, or any other identified defect. Find the
            defect, fix it, retest the affected circuit, then issue the certificate. The
            corrective work is part of the original installation — no separate certificate
            required for the fix itself.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 644.1.1."
      />

      <InlineCheck
        id={checks[1].id}
        question={checks[1].question}
        options={checks[1].options}
        correctIndex={checks[1].correctIndex}
        explanation={checks[1].explanation}
      />

      <VideoCard
        {...videos.faultFinding}
        topic="Describing a fault on an EICR — language and coding"
        caption="The EICR is only as useful as the language used to describe the observations. Plain, precise fault description is what lets the duty holder act on the report and what defends the inspector if a coding is later challenged."
      />

      <SectionRule />

      <ContentEyebrow>Picking the right form — the new-circuit test</ContentEyebrow>

      <ConceptBlock
        title="MEIWC vs EIC — the test is whether a new circuit was created"
        plainEnglish="The MEIWC is reserved by definition for minor works that do NOT include a new circuit. Adding a single socket on an existing ring is MEIWC. Adding any new circuit — even one — is EIC. Size of the job is irrelevant; whether a new circuit was created is decisive."
        onSite="The classic error: thinking a small one-circuit job is automatically MEIWC. A single new EV charger circuit, a single new shower circuit, a single new outdoor lighting circuit — all new circuits, all need full EIC + Schedule of Inspections + Schedule of Test Results. The MEIWC has no scope for new circuits regardless of how minor the rest of the work appears."
      >
        <p>Worked examples of the form-selection test:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Add an extra socket on an existing kitchen ring final.</strong> No new circuit
            — extends an existing one. <strong>MEIWC.</strong>
          </li>
          <li>
            <strong>Add an extra pendant on an existing lighting circuit.</strong> No new circuit.{' '}
            <strong>MEIWC.</strong>
          </li>
          <li>
            <strong>Replace a damaged double socket like for like.</strong> No new circuit, no
            circuit alteration. <strong>MEIWC.</strong>
          </li>
          <li>
            <strong>Install a new EV charger on its own dedicated circuit from the CU.</strong>{' '}
            New circuit.{' '}
            <strong>EIC + Schedule of Inspections + Schedule of Test Results.</strong>
          </li>
          <li>
            <strong>Install a new electric shower on its own circuit from the CU.</strong> New
            circuit. <strong>EIC + Schedule of Inspections + Schedule of Test Results.</strong>
          </li>
          <li>
            <strong>Replace the existing CU with a new one.</strong> Major alteration to the
            supply distribution.{' '}
            <strong>EIC + Schedule of Inspections + Schedule of Test Results</strong> covering all
            retained circuits as well as the new CU.
          </li>
          <li>
            <strong>
              Add a complete new outbuilding fed by a new submain plus three new final circuits.
            </strong>{' '}
            Major alteration.{' '}
            <strong>EIC + Schedule of Inspections + Schedule of Test Results.</strong>
          </li>
          <li>
            <strong>Five-yearly inspection of a tenanted flat.</strong> No new work — periodic
            condition assessment of existing installation. <strong>EICR.</strong>
          </li>
        </ul>
        <p>
          When in doubt — if a new circuit was created, the answer is EIC. The MEIWC has no
          ambiguity on this point and will not stretch to cover a new circuit no matter how small
          the rest of the job.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks[0].id}
        question={checks[0].question}
        options={checks[0].options}
        correctIndex={checks[0].correctIndex}
        explanation={checks[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The EIC top-level — sections, declarations and signatures</ContentEyebrow>

      <ConceptBlock
        title="What goes on the EIC itself — section by section"
        plainEnglish="Header (address, dates, contractor, customer); extent of installation covered; supply characteristics; designer / constructor / inspector signed declarations; departures from BS 7671; comments on existing installation; recommended next inspection date; reference to attached Schedule of Inspections and Schedule of Test Results."
        onSite={`The EIC is the legal top-level document. Get the address right, get the extent right (be specific — "alteration to ground floor lighting circuit and addition of new EV charger circuit" beats "some electrical work"), get the signatures right, get the next-inspection date right per IET GN3 frequency tables.`}
      >
        <p>The principal sections of an EIC, in order:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Details of the client and installation.</strong> Address, occupier name, use
            of installation (domestic / commercial / industrial), the contractor name and contact
            details. Get the address exactly right — the certificate has to be identifiable to the
            property by a future buyer's solicitor or insurance investigator.
          </li>
          <li>
            <strong>Extent of installation covered.</strong> Plain-English description of what was
            done — for example, "Complete installation", or "Consumer unit replacement and
            addition of new EV charger circuit and outdoor socket-outlet circuit". Be specific.
            Ambiguity here causes problems years later when someone tries to work out which
            circuits the certificate covers.
          </li>
          <li>
            <strong>Supply characteristics.</strong> Nominal voltage, frequency, prospective fault
            current at origin, Ze, system earthing arrangement (TN-S, TN-C-S / Protective Multiple
            Earthing, TT, IT), number of phases. These come from the survey at the supply intake
            before the work begins.
          </li>
          <li>
            <strong>Designer declaration.</strong> "I being the person responsible for the design
            of the work ...". Signed and dated.
          </li>
          <li>
            <strong>Constructor declaration.</strong> "I being the person responsible for the
            construction of the work ...". Signed and dated.
          </li>
          <li>
            <strong>Inspector declaration.</strong> "I being the person responsible for the
            inspection and testing ...". Signed and dated.
          </li>
          <li>
            <strong>Departures from BS 7671.</strong> Any deliberate deviation, with reasoning.
            None permitted without documentation.
          </li>
          <li>
            <strong>Comments on existing installation.</strong> Observations on unaltered parts —
            pre-existing defects, recommendations, items the duty-holder should be aware of.
            Distinct from defects on the new work, which must be fixed before issue under Reg
            644.1.1.
          </li>
          <li>
            <strong>Recommended next inspection date.</strong> Per IET GN3 frequency tables for
            the property type (domestic owner-occupied 10 years, rented 5 years, etc.).
          </li>
          <li>
            <strong>Schedules attached.</strong> Reference to the Schedule of Inspections and
            Schedule of Test Results (number of pages of each).
          </li>
        </ol>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Section 644 (certification framework) — paraphrased"
        clause="An Electrical Installation Certificate (EIC) shall be issued for a new installation, or for an addition or alteration that is not minor. The Certificate shall include the supply characteristics, the extent of the installation covered, signed declarations from the persons responsible for design, construction and inspection and testing, any departures from this Standard, and shall reference the attached Schedule of Inspections and Schedule of Test Results."
        meaning={
          <>
            Section 644 prescribes the model EIC content. Each declaration is a separate signed
            statement of responsibility. The schedules are the evidence base. The whole pack — EIC
            plus Schedule of Inspections plus Schedule of Test Results — is what counts as the
            certification for the purposes of BS 7671 and for the Building Regulations Part P
            notification process in England and Wales.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Section 644 and Appendix 6."
      />

      <ConceptBlock
        title="The three signed declarations — designer, constructor, inspector"
        plainEnglish="Each of the three roles signs a separate declaration of responsibility. Same person can sign all three on a small job. Different organisations on a larger one. Each signature is a personal declaration — not interchangeable, not consolidated."
        onSite="On a domestic CU swap by a single self-employed electrician, the same name appears in all three boxes — but each is signed individually. On a commercial fit-out, the consulting engineer signs designer, the contractor signs constructor, and the third-party inspector (or the contractor again) signs inspector. Sign only the role you actually performed."
      >
        <p>What each role declaration commits the signer to:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Designer.</strong> "I being the person responsible for the design of the
            electrical installation, particulars of which are described above, having exercised
            reasonable skill and care when carrying out the design, hereby CERTIFY that the design
            work for which I have been responsible is to the best of my knowledge and belief in
            accordance with BS 7671 ... except for the departures, if any, detailed as follows."
            Designer accepts responsibility for the design approach, conductor sizing, protection
            coordination, earthing arrangement, disconnection times, voltage drop and equipment
            selection.
          </li>
          <li>
            <strong>Constructor.</strong> "I being the person responsible for the construction of
            the electrical installation ... hereby CERTIFY that the construction work for which I
            have been responsible is to the best of my knowledge and belief in accordance with BS
            7671 ..." Constructor accepts responsibility for the physical installation work —
            terminations, supports, cable routing, accessory installation, mechanical protection,
            segregation, IP ratings.
          </li>
          <li>
            <strong>Inspector.</strong> "I being the person responsible for the inspection and
            testing of the electrical installation ... hereby CERTIFY that the work for which I
            have been responsible is to the best of my knowledge and belief in accordance with BS
            7671 ..." Inspector accepts responsibility for the visual inspection, the dead-test
            sequence, the live-test sequence, defect identification and the readings recorded on
            the Schedule of Test Results.
          </li>
        </ul>
        <p>
          Where the same competent person fulfils all three roles, the same name and signature
          appears in all three boxes — but each declaration is a separate statement of personal
          responsibility. Forging a signature, leaving a role blank, or signing a role you did not
          perform invalidates the certificate and exposes you to professional, regulatory and
          insurance consequences.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks[2].id}
        question={checks[2].question}
        options={checks[2].options}
        correctIndex={checks[2].correctIndex}
        explanation={checks[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>
        Departures, comments, and observations on existing installation
      </ContentEyebrow>

      <ConceptBlock
        title="Departures from BS 7671 — what they are and how to document them"
        plainEnglish="A Departure is a deliberate, documented deviation from a numerical or method requirement of BS 7671 that the designer judges acceptable for the specific installation, with reasoning. The Standard expects departures to be rare and accepted by the duty-holder."
        onSite="Most installations have zero departures. When they appear, they are usually one of a small set: socket-outlet without RCD under the Reg 411.3.3 risk-assessment exception, equipment in a special location with mitigating measures, overlong cable run accepted with reduced disconnection time. Document each one with the regulation number, the chosen alternative, the reasoning and the duty-holder acceptance."
      >
        <p>How a Departure should be recorded:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>The clause being departed from.</strong> By regulation number — for example,
            "Departure from Reg 411.3.3 (additional protection by 30 mA RCD on socket-outlets)".
          </li>
          <li>
            <strong>The chosen alternative.</strong> "Socket-outlet C5 in plant room left without
            30 mA RCD additional protection."
          </li>
          <li>
            <strong>The reasoning.</strong> "Socket-outlet supplies a critical process computer;
            nuisance tripping on a 30 mA RCD would risk loss of process data. Documented risk
            assessment held by client (ref RA-PR-007 dated 2026-04-01) concludes additional
            protection is not required at this location, applying the Reg 411.3.3 exception for
            socket-outlets supplying specific equipment."
          </li>
          <li>
            <strong>The duty-holder acceptance.</strong> Formal acceptance by the client, ideally
            in writing — covered by the design sign-off correspondence and referenced on the EIC.
          </li>
        </ul>
        <p>
          Departures that are not documented, are not accepted by the duty-holder, or are applied
          where no exception exists in BS 7671 are non-compliances rather than departures. The
          Departures box on the EIC is a narrow doorway — most installations should have nothing
          in it. If yours has multiple entries, review the design.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Comments on existing installation — observations on unaltered parts"
        plainEnglish="On an addition or alteration, the EIC has a Comments on existing installation section for observations about parts of the installation NOT covered by the new work. This is where pre-existing defects on unaltered circuits are recorded for the customer’s information."
        onSite="On a CU swap-out, the Comments box typically gets used. The new CU is your work and is certified clean. The downstream circuits are unaltered but you have visibility of their condition through the inspection and testing process. Anything you noticed on unaltered parts — old rubber-sheath cabling, no CPC on lighting drops, missing supplementary bonding in a bathroom — goes here as an observation."
      >
        <p>Typical Comments on existing installation entries:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Old wiring observations.</strong> "Downstream circuits original rubber-sheath
            wiring; condition assessed as functional during the alteration but full EICR
            recommended within 12 months to confirm continued safe condition."
          </li>
          <li>
            <strong>No-CPC lighting circuits.</strong> "Upstairs lighting circuit (C7) two-core
            wiring with no CPC; existing Class II accessories acceptable; any future change to
            Class I light fittings on this circuit will require rewire to provide a CPC."
          </li>
          <li>
            <strong>Pre-existing bonding gaps.</strong> "Supplementary bonding to bathroom
            radiator pipe absent; main bonding to incoming gas and water in place; Reg 701.415.2
            may permit omission where ADS conditions are met but bonding survey recommended."
          </li>
          <li>
            <strong>Recommendations.</strong> "Separate EICR recommended within 12 months to
            establish baseline condition of unaltered circuits."
          </li>
        </ul>
        <p>
          These observations do NOT block issue of the EIC for the new work — that is certified on
          its own merits. They put the customer on notice of pre-existing issues so they can plan
          further work or inspection. The duty-holder receives the observations and decides what
          to do with them.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>
        Part P notification — the EIC plus the Building Control Compliance Certificate
      </ContentEyebrow>

      <ConceptBlock
        title="Building Regulations Part P (England and Wales) — when the EIC alone isn't enough"
        plainEnglish="In England and Wales, certain types of domestic electrical work are notifiable under Part P of the Building Regulations. The EIC certifies that the work meets BS 7671; the separate Building Control Compliance Certificate (or Part P notification through a Competent Person Scheme) certifies that the local authority has been notified and that the work meets the Building Regulations. Two documents, one job."
        onSite="On a domestic CU swap or any new circuit in a dwelling, you need both. The EIC goes to the customer at handover. The CPS upload (NICEIC, NAPIT, ELECSA, Stroma) within 30 days triggers the BCCC, which the customer needs for solicitor / lender / future EICR purposes. Skip the CPS upload and the customer is non-compliant with Part P even though the work itself is fine."
      >
        <p>Part P notifiable work in England and Wales (typical domestic):</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>New circuits</strong> — any addition to the installation that creates a new
            circuit (EV charger, shower, additional ring, garden lighting on a new MCB).
          </li>
          <li>
            <strong>Consumer unit replacement</strong> — full or partial replacement counts as
            notifiable work.
          </li>
          <li>
            <strong>Work in special locations</strong> — bathrooms, kitchens, outdoors, swimming
            pool zones — even minor works on existing circuits are notifiable.
          </li>
          <li>
            <strong>Electric shower replacement</strong> with a different rating (different cable
            / device required) — notifiable.
          </li>
        </ul>
        <p>Non-notifiable (still needs an EIC or MEIWC, but no Part P notification):</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Like-for-like replacement of a damaged accessory in a non-special location.</li>
          <li>
            Adding an extra socket on an existing ring final in a non-special location (living
            room, bedroom).
          </li>
          <li>Like-for-like replacement of a damaged cable section.</li>
        </ul>
        <p>Two routes to Part P compliance for notifiable work:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Competent Person Scheme upload</strong> (NICEIC, NAPIT, ELECSA, Stroma). The
            contractor uploads the EIC to the CPS portal within 30 days of completion. The CPS
            notifies the local authority on the contractor's behalf and issues the Building
            Control Compliance Certificate (BCCC) to the customer. This is the standard route for
            CPS-registered contractors.
          </li>
          <li>
            <strong>Direct Building Control notification.</strong> For non-CPS-registered
            contractors or for one-off jobs, notify the local authority's Building Control
            department BEFORE the work starts, pay the Building Control fee, and arrange Building
            Control inspection. The local authority issues the completion certificate.
          </li>
        </ol>
        <p>
          The customer pack for a notifiable job: EIC + Schedule of Inspections + Schedule of Test
          Results (your work product) + BCCC (CPS deliverable, typically issued 4-6 weeks after
          upload). The customer's solicitor at sale, the lender at remortgage, and the next EICR
          inspector all expect to see all four documents. Wales applies the same Part P regime;
          Scotland and Northern Ireland have their own equivalents (notably no Part P in Scotland
          — building warrants apply instead).
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Certificate retention — the contractor's audit trail"
        plainEnglish="The customer keeps the original EIC for the lifetime of the installation. The contractor keeps a copy for at least six years (Limitation Act floor) but typically much longer — 10 to 25 years under PI insurance and CPS rules. Cloud storage of PDFs has made indefinite retention trivially cheap; lever-arch files in a back office are no longer the standard."
        onSite="A 25-year-old EIC produced from cloud storage in 5 minutes is the difference between a smooth professional indemnity claim defence and a claim paid out by default. Set up cloud retention from day one of self-employment — name files consistently (date_address_certificateType.pdf), back up off-site, and never lose a certificate to a hard drive failure or a stolen laptop."
      >
        <p>The retention layers for an EIC:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Customer original.</strong> The customer retains for the lifetime of the
            installation. Used at sale (to the buyer's solicitor), at remortgage (to the lender),
            at next EICR (to the next inspector), and to commission any future alterations (the
            next contractor needs to see existing certification).
          </li>
          <li>
            <strong>Contractor copy — Limitation Act minimum 6 years.</strong> Civil claims
            arising from contract or tort are time-barred after 6 years (12 years for a deed). The
            contractor keeps a copy for at least this period to defend any claim.
          </li>
          <li>
            <strong>Contractor copy — PI insurance run-off period.</strong> Professional indemnity
            insurance covers claims made during the policy period plus any run-off period
            (typically 6-10 years after policy expiry). Some PI insurers require retention for the
            entire run-off period — check the policy.
          </li>
          <li>
            <strong>Contractor copy — Competent Person Scheme rules.</strong> NICEIC, NAPIT,
            ELECSA, Stroma each have retention requirements (typically the period of registration
            plus a tail). Specific dates vary by scheme; check current scheme rules.
          </li>
          <li>
            <strong>CPS portal copy.</strong> The CPS retains its own copy via the upload portal.
            This is independent of the contractor's retention — useful if the contractor ever
            loses their copy.
          </li>
        </ul>
        <p>Practical retention strategy for a small-to-medium contractor:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Cloud-first.</strong> PDFs in a structured folder hierarchy (year / month /
            job ref). Backed up to a second cloud (multi-cloud strategy: Google Drive primary,
            Dropbox backup, or similar).
          </li>
          <li>
            <strong>Indefinite retention.</strong> Storage is cheap (1 TB = ~£100/year cloud).
            Keeping certificates indefinitely costs nothing meaningful and removes any
            retention-period anxiety.
          </li>
          <li>
            <strong>Search-friendly naming.</strong> "2026-04-28_15-Acacia-Ave-Manchester_EIC.pdf"
            lets you find any certificate in seconds. "Untitled.pdf" does not.
          </li>
          <li>
            <strong>Embedded photos.</strong> Photos referenced by the EIC should be embedded in
            the PDF itself rather than stored separately — external references break when files
            are moved.
          </li>
          <li>
            <strong>Encryption / access control.</strong> Customer addresses are personal data
            under UK GDPR. Cloud retention should use access controls (2FA, encrypted at rest,
            contractor-only access) consistent with a small business's GDPR obligations.
          </li>
        </ul>
        <p>
          The retention discipline is unglamorous but is the foundation of a defensible practice.
          A contractor who can produce any certificate from the last 20 years inside 5 minutes
          presents a different professional impression than one who is searching through filing
          cabinets for a 5-year-old EIC.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>What goes wrong on site</ContentEyebrow>

      <CommonMistake
        title="Issuing an MEIWC for a single new circuit"
        whatHappens={
          <>
            You install a new dedicated EV charger circuit from the existing CU — single circuit,
            RCBO, isolator, charger. Job is small. You issue an MEIWC because it feels
            proportionate to the work scope. Six months later the customer is selling the house
            and the buyer’s solicitor flags the MEIWC as inappropriate for a new circuit. The
            Competent Person Scheme audit catches the same issue. You now have to retro-issue the
            EIC + Schedule of Inspections + Schedule of Test Results trio, re-attend to confirm
            the readings are still valid, and explain why the original certification was on the
            wrong form.
          </>
        }
        doInstead={
          <>
            The MEIWC is reserved for minor works that do NOT include a new circuit — BS 7671 is
            unambiguous on this point. Any new circuit, however single, triggers the EIC +
            Schedule of Inspections + Schedule of Test Results requirement. The form selection
            test is binary: did the work create a new circuit? If yes, EIC. If no, MEIWC may be
            appropriate. Size of the job is irrelevant.
          </>
        }
      />

      <CommonMistake
        title="Issuing the EIC with a known defect uncorrected"
        whatHappens={
          <>
            You complete a new domestic install. Final IR test on one circuit reads 0.7 MΩ (below
            the 1 MΩ minimum). Customer is moving in tonight. You decide to issue the EIC with a
            comment in the notes — "IR on circuit C7 below 1 MΩ; investigate further". Three
            months later there is an electrical fire on circuit C7. The insurer refuses the claim
            because the EIC noted a known defect that was not corrected. Your professional
            indemnity is exposed because the certificate was issued in breach of Reg 644.1.1.
          </>
        }
        doInstead={
          <>
            Find the IR fault, fix it, retest. Only then issue the EIC, with all readings clean.
            If the customer is pressing for handover, explain that the certificate cannot be
            issued for a new installation with known defects (Reg 644.1.1) and that the only path
            to handover is fixing the defect. Most defects (back-box pinch, damaged cable section)
            take an hour to fix. The conversation about delaying handover by an hour is much
            shorter than the conversation about defending a certificate that should never have
            been issued.
          </>
        }
      />

      <Scenario
        title="Domestic CU swap-out for a customer about to remortgage"
        situation={
          <>
            You have completed a domestic CU swap-out for a customer who tells you they need the
            certificate today because their remortgage application closes tomorrow and the lender
            requires "current electrical certification". The job is 8 circuits, single-phase
            TN-C-S, all new RCBOs (Type A 30 mA), measured Ze = 0.30 Ω. Dead tests pass; live
            tests pass; RCD trip times all within 22–35 ms; one downstream circuit (C7, upstairs
            lighting) reads 1.2 MΩ IR — above the 1 MΩ minimum but lower than the rest of the
            install. Customer is the homeowner. The wiring on C7 is original rubber-sheath, dating
            to the 1960s.
          </>
        }
        whatToDo={
          <>
            <strong>Form selection.</strong> CU swap = major alteration = EIC + Schedule of
            Inspections + Schedule of Test Results. Not MEIWC.
            <br />
            <br />
            <strong>Defect rule.</strong> The new work (CU itself, terminations, RCBO selection,
            labelling, bonding upgrades) is your alteration. Reg 644.1.1 addition/alteration
            variant applies — defects affecting safety of the alteration corrected before issue.
            The C7 IR reading of 1.2 MΩ is above the 1 MΩ floor and does not block issue, but it
            is an observation on the unaltered downstream circuit.
            <br />
            <br />
            <strong>EIC content.</strong> Address, occupier, "Major alteration — consumer unit
            replacement to existing installation" as the extent. Supply characteristics from your
            survey (230 V, 50 Hz, single-phase, TN-C-S, Ze = 0.30 Ω, PFC = X kA). Designer /
            constructor / inspector all signed by you (single-person job). Departures: none.
            Comments on existing installation: "Downstream circuit C7 (upstairs lighting) original
            rubber-sheath wiring with marginal IR reading (1.2 MΩ) — above BS 7671 minimum but
            lower than the rest of the install. Recommend EICR within 12 months to confirm
            continued safe condition; recommend rewire of C7 within 5 years." Next inspection due:
            10 years (owner-occupied domestic).
            <br />
            <br />
            <strong>Date.</strong> Today’s date — the date the inspection and testing was
            completed and the declarations were signed. Not back-dated for the remortgage. The
            lender accepts a certificate dated today; if the customer’s completion is tomorrow,
            that is between the customer and the lender.
            <br />
            <br />
            <strong>Distribution.</strong> Customer pack (printed at handover plus PDF emailed);
            contractor file (cloud); NICEIC (or your scheme) online portal upload within 30 days
            for Part P Building Control notification — the scheme then generates the Building
            Control Compliance Certificate that the customer will also need for the remortgage.
          </>
        }
        whyItMatters={
          <>
            The certification pack is what survives the install. The remortgage lender today, the
            buyer’s solicitor in five years, the EICR inspector in ten years and the insurance
            investigator after any incident will all pick up this EIC and need to make sense of
            it. Right form, right defect handling, right date, right comments on the unaltered
            parts — each one defensible on its own. Get any of those wrong and the certificate
            becomes a liability rather than an asset.
          </>
        }
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 651.1 (periodic inspection)"
        clause={
          <>
            Where required, periodic inspection and testing of every electrical installation shall
            be carried out in accordance with the regulations of Part 6.
          </>
        }
        meaning={
          <>
            The EICR is the periodic inspection&apos;s deliverable, governed by Part 6 as
            renumbered and restructured in A4:2026. The same regulation framework applies whether
            the install is domestic, commercial or industrial — only the frequency and the scope
            of sampling change.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Regulation 651.1 — full text from published amendment."
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'BS 7671 Section 644 prescribes three model forms: EIC for new work and major alterations; MEIWC for minor work without a new circuit; EICR for periodic inspection. Pick the right form for the job or the certification is invalid.',
          'Reg 644.1.1 (new installation) — any defect or omission revealed during inspection and testing shall be corrected before the Certificate is issued. Fix first, retest, then certify.',
          'Addition/alteration variant — only defects affecting the SAFETY of the addition or alteration must be corrected before issue. Pre-existing defects elsewhere are recorded as observations.',
          'New-circuit test — MEIWC is reserved for minor works that do NOT include a new circuit. Any new circuit, however small, triggers EIC + Schedule of Inspections + Schedule of Test Results.',
          'EIC has three signed declarations — designer, constructor, inspector. Same competent person can sign all three on a small job; each is a separate declaration of personal responsibility.',
          'Departures from BS 7671 are documented with regulation number, chosen alternative, reasoning and duty-holder acceptance. Most installations have zero departures.',
          'Comments on existing installation captures observations on unaltered parts — these do NOT block issue of the EIC for the new work.',
          'EIC retention — at least six years (Limitation Act floor) on the contractor side; PI insurers and CPS often require 10–25 years; cloud storage of PDFs is now standard practice.',
        ]}
      />

      <Quiz title="EIC issue and certificate types — knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        The chain of accountability that runs from designer to installer to tester to certifier to
        customer. Each link records what they did, signs for it, and passes the documentation
        forward. Reg 132.13 sets the start; the customer O&M is the end.
      </p>

      <TLDR
        points={[
          'Commissioning paperwork is a chain of accountability — designer (Reg 132.13 design pack) → installer (as-built mark-ups + materials register) → tester (Schedule of Test Results + witness sheets) → certifier (EIC top-level declarations) → customer (full O&M pack).',
          'On a small domestic job the chain collapses to one person but the logical steps remain — design notes, as-built schedule, test results, signed EIC, customer pack. Each link still exists, even if compressed.',
          'On a commercial project the chain is multi-organisation. M&E consultant designs; contractor installs; testing electrician tests; commissioning engineer certifies; facilities manager receives the O&M.',
          'Reg 132.13 spans the chain — design-side documentation flows from designer through installer mark-ups to the customer O&M. The same documentation evolves at each stage rather than being recreated.',
          "The documentation chain matters most years later — fault, sale, EICR, insurance claim, alteration. A weak link compromises the installation's defendability when it is needed most.",
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Map the commissioning paperwork chain end to end — designer, installer, tester, certifier, customer — and identify what each role records.',
          'Apply Reg 132.13 design documentation requirements to the design pack handed at project start.',
          'Identify the installer hand-over to tester — as-built mark-ups, materials register, dead-test record, safe-isolation confirmation.',
          'Define the tester hand-over to certifier — Schedule of Test Results, witness sheets, anomaly log, defect register.',
          'Compile the certifier hand-over to customer — the Operations and Maintenance pack with everything from the chain consolidated.',
          'Compress the chain for a single-person domestic job while preserving every logical step.',
          'Manage phased commissioning where each phase has its own EIC and the master O&M aggregates them.',
          'Apply contractor retention requirements (Limitation Act, professional indemnity, CPS audit) to the documentation chain.',
        ]}
        initialVisibleCount={4}
      />

      <ContentEyebrow>The chain — five roles, five hand-overs</ContentEyebrow>

      <ConceptBlock
        title="Designer → installer → tester → certifier → customer"
        plainEnglish="Each role generates documentation that the next role uses. Each hand-over is a recorded event with signatures and document references. The chain is what connects the design intent at project start to the customer's evidence base at lifetime end."
        onSite="On a domestic job the chain compresses into one person and one EIC. On a commercial project the chain spans multiple organisations and multiple weeks of commissioning. The principle is identical — each step records what was done, signs for it, and passes the documentation forward."
      >
        <p>The chain explained role by role:</p>

        <div className="hidden sm:block bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[13px]">
          <div className="grid grid-cols-3 gap-3 text-white/90">
            <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">
              Role
            </div>
            <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">
              Generates
            </div>
            <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">
              Hands to
            </div>

            <div>Designer (M&E consultant or competent electrician on small jobs)</div>
            <div>
              Reg 132.13 design pack — single-line diagrams, panel schedules, calculations (cable
              size, voltage drop, Zs), OCPD specification, earthing arrangement, departures log
            </div>
            <div>
              Installer (with the brief to build to spec; deviations require Design Change Notes)
            </div>

            <div>Installer (electrical contractor)</div>
            <div>
              As-built mark-ups (any deviations from design), materials register (what was
              fitted), dead-test record (continuity, IR captured during install), safe-isolation
              status
            </div>
            <div>Tester (the testing electrician, or the same person on smaller jobs)</div>

            <div>Tester (testing electrician)</div>
            <div>
              Schedule of Test Results (per-circuit dead + live readings), witness sheets where
              spec calls (RCD/Zs counter-signed), anomaly log, defect register for items requiring
              rectification under Reg 644.1.1
            </div>
            <div>Certifier (commissioning engineer or senior electrician)</div>

            <div>Certifier (commissioning engineer / senior electrician)</div>
            <div>
              Signed EIC top-level declarations (designer, constructor, inspector), Schedule of
              Inspections (visual checklist), departures formally documented, comments on existing
              installation, recommended next inspection
            </div>
            <div>Customer (handover pack and O&M manual)</div>

            <div>Customer (duty-holder for the installation)</div>
            <div>
              O&M pack retained for the lifetime of the installation — used for any future EICR,
              sale, insurance claim, alteration project, fault diagnosis
            </div>
            <div>(End of chain — pack stays with the duty-holder)</div>
          </div>
        </div>

        <div className="sm:hidden space-y-2">
          {[
            {
              role: 'Designer',
              generates:
                'Reg 132.13 design pack — single-line, panel schedules, calculations, OCPD spec, earthing, departures',
              to: 'Installer',
            },
            {
              role: 'Installer',
              generates:
                'As-built mark-ups, materials register, dead-test record, safe-isolation status',
              to: 'Tester',
            },
            {
              role: 'Tester',
              generates: 'Schedule of Test Results, witness sheets, anomaly log, defect register',
              to: 'Certifier',
            },
            {
              role: 'Certifier',
              generates:
                'Signed EIC, Schedule of Inspections, departures log, comments on existing installation',
              to: 'Customer',
            },
            {
              role: 'Customer',
              generates: 'Lifetime O&M retention — used for EICR, sale, insurance, alteration',
              to: '(End of chain)',
            },
          ].map((row, i) => (
            <div
              key={i}
              className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-3 text-[13px]"
            >
              <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold">
                Role
              </div>
              <div className="text-white/90 mt-0.5 font-semibold">{row.role}</div>
              <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold mt-2">
                Generates
              </div>
              <div className="text-white/80 mt-0.5">{row.generates}</div>
              <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold mt-2">
                Hands to
              </div>
              <div className="text-white/80 mt-0.5">{row.to}</div>
            </div>
          ))}
        </div>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 132.1 (Design documentation framework, Regs 132.2–132.5)"
        clause="The information required as a basis for design is stated in Regulations 132.2 to 132.5. The requirements to which the design shall conform are stated in Regulations 132.6 to 132.16. Designers shall therefore determine and record the information listed in 132.2–132.5 to demonstrate conformity with subsequent design requirements."
        meaning={
          <>
            The Reg 132.1 framework sits at the START of the commissioning chain — it is the
            design-side requirement that creates the design pack the installer works to. The same
            documentation flows forward through installer mark-ups to the customer's O&M. Without
            the Regs 132.2–132.5 information determined and recorded at the start of the chain,
            the installation has no design baseline and the certification at the end cannot
            reference what was designed.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Regulation 132.1 framework."
      />

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Designer hand-over to installer — the design pack</ContentEyebrow>

      <ConceptBlock
        title="What the design pack contains and why it matters at site"
        plainEnglish="The design pack is the installer’s reference for what was specified — what to fit, where to fit it, what cable to use, what protective device, what earthing arrangement. Without it the installer is reverse-engineering the design from a verbal brief."
        onSite="On a small domestic CU swap, the design pack is typically a one-page Zs/RCBO/earthing review held in the contractor file. On a commercial fit-out it can run to hundreds of drawings plus calculation books. Either way, the principle is the same — written specification that the installer can build to and the certifier can verify against."
      >
        <p>Standard design pack contents:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Single-line diagrams.</strong> Schematic showing supply intake, main
            switchgear, distribution boards, sub-mains, final circuits. The visual map of the
            installation.
          </li>
          <li>
            <strong>Panel schedules.</strong> Per-board schedule of every circuit — circuit
            number, description, OCPD type and rating, RCBO IΔn type, AFDD presence where fitted,
            cable size, reference method, max Zs target, design current.
          </li>
          <li>
            <strong>Calculations.</strong> Supporting maths for cable sizing (current carrying
            capacity from Appendix 4 tables, derating for grouping and ambient, voltage drop), Zs
            targets from Table 41.3 for ADS compliance, fault current at each board for OCPD
            breaking capacity, earth-fault loop calculations.
          </li>
          <li>
            <strong>Earthing arrangement spec.</strong> System type (TN-S, TN-C-S, TT, IT), MET
            location, main earthing conductor size per Table 54.7, main protective bonding
            conductor sizes per Table 54.8, supplementary bonding requirements per location.
          </li>
          <li>
            <strong>Departures log.</strong> Any deliberate deviations from BS 7671 with clause
            number, chosen alternative, reasoning, designer acceptance, duty-holder acceptance.
          </li>
          <li>
            <strong>Interface details.</strong> Where the electrical installation interfaces with
            adjacent disciplines — HVAC controls, fire alarm, BMS, security, lift controls, EV
            charging, solar PV, battery storage. Each interface documented so the installer knows
            what to terminate where.
          </li>
          <li>
            <strong>Specification documents.</strong> Brand and model numbers for major equipment
            (CU, RCBOs, AFDDs, isolators, EV chargers, SPDs), or performance specs where the
            contractor selects the brand.
          </li>
        </ol>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>
        Installer hand-over to tester — as-builts and dead-test record
      </ContentEyebrow>

      <ConceptBlock
        title="As-built mark-ups, materials register, dead-test record"
        plainEnglish="The installer hands the tester a marked-up version of the design pack showing what was actually built (rarely identical to what was designed), a list of materials actually fitted, and the dead-test readings captured during installation."
        onSite="As-built mark-ups are critical. Construction never matches the design 100% — a cable route changes around an unforeseen obstacle, a circuit is added under a Design Change Note, an accessory is repositioned at the customer’s request. The tester needs to test what is actually there, not what was designed. Mark-ups bridge the gap."
      >
        <p>Standard installer-to-tester deliverables:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Marked-up as-builts.</strong> Original design drawings with red-pen changes
            showing actual installation — cable routes, accessory positions, circuit additions,
            departure points from the original spec.
          </li>
          <li>
            <strong>Materials register.</strong> What was actually fitted — brand, model, serial
            where applicable, batch numbers for cables (useful for warranty and for tracing any
            future product recall). On a commercial fit-out this can be a spreadsheet or a
            database; on domestic it is typically a one-page list.
          </li>
          <li>
            <strong>Dead-test record.</strong> Continuity, R1+R2, ring final readings, IR captured
            during installation as each circuit completed. Saves the tester repeating dead tests;
            provides an audit trail of what was measured at installation rather than only at
            certification.
          </li>
          <li>
            <strong>Safe-isolation status.</strong> Confirmation of which circuits are ready for
            live test and which still require completion. Lock-off status of any circuits not yet
            ready. Permit status if working under a permit-to-work regime.
          </li>
          <li>
            <strong>Defect register.</strong> Any items the installer flagged as needing attention
            before energisation — typically minor (a missing label, a tight grommet that needs
            adjustment) but always disclosed so nothing is hidden from the tester.
          </li>
          <li>
            <strong>Design Change Notes log.</strong> List of all DCNs raised during installation
            with reference numbers and brief description. The certifier will need this to record
            any departures or scope changes on the EIC.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>
        Tester hand-over to certifier — Schedule of Test Results and witness sheets
      </ContentEyebrow>

      <ConceptBlock
        title="Schedule of Test Results, witness sheets, anomaly log"
        plainEnglish="The tester hands the certifier the completed Schedule of Test Results plus any contract-mandated witness sheets, an anomaly log of values that were unexpected, and a defect register of items requiring rectification under Reg 644.1.1."
        onSite="On a commercial project the witness sheets often dwarf the Schedule of Test Results in volume — every safety-critical test (RCD trip, Zs, IR) gets its own counter-signed sheet. On domestic the Schedule of Test Results alone is the standard. Either way, the tester’s deliverable is the per-circuit measurement evidence base that the certifier signs against."
      >
        <p>Standard tester-to-certifier deliverables:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Completed Schedule of Test Results.</strong> Per-circuit row with
            identification, wiring data, OCPD data, dead-test readings, IR readings, polarity, Zs
            measured, RCD trip times, AFDD test results. The regulatory deliverable per Reg 644.3
            and Section 644.
          </li>
          <li>
            <strong>Witness sheets (where spec requires).</strong> Counter-signed records for
            safety-critical tests — RCD trip time, Zs, IR. Typically signed by the testing
            electrician AND the witnessing engineer. Common on commercial, healthcare, public
            buildings and hazardous locations.
          </li>
          <li>
            <strong>Anomaly log.</strong> Readings that were unexpected — a Zs slightly higher
            than the design calculation, an IR reading lower than the rest of the installation, a
            borderline RCD trip time. Each anomaly investigated and noted with the conclusion
            (acceptable / requires further investigation / requires rectification).
          </li>
          <li>
            <strong>Defect register.</strong> Items requiring rectification before certification
            under Reg 644.1.1. Each defect logged with description, location, action required,
            action completed, retest result. Closed defects become part of the audit trail; open
            defects block the EIC issue.
          </li>
          <li>
            <strong>Instrument calibration certificates.</strong> Calibration certificates for the
            multifunction tester used (typically annual cal). Some specs require the tester to
            attach the cal cert to the test pack as evidence of measurement traceability.
          </li>
          <li>
            <strong>Test photographs.</strong> Photos of test setup, instrument readings, any
            unusual conditions. Increasingly common with phone-camera-equipped testers and
            cloud-based test recording. Provides an additional audit layer.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Certifier hand-over to customer — the O&M pack</ContentEyebrow>

      <ConceptBlock
        title="The Operations and Maintenance pack — full-chain documentation consolidated"
        plainEnglish="The certifier consolidates everything from the chain into a single Operations and Maintenance pack — design pack, as-built mark-ups, test results, signed EIC, manuals, BCCC, recommended maintenance schedule. This is what the customer keeps for the life of the installation."
        onSite="On commercial work the O&M can run to multiple bound volumes or a multi-gigabyte PDF set. On domestic it is typically a single folder or a bookmarked PDF. The contents are the same in principle — every step in the chain is in there, indexed and accessible."
      >
        <p>Standard O&M pack contents:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Signed EIC top-level.</strong> The certification document with all three role
            declarations signed.
          </li>
          <li>
            <strong>Schedule of Inspections.</strong> Visual checklist with every applicable item
            ticked or noted.
          </li>
          <li>
            <strong>Schedule of Test Results.</strong> Per-circuit measurement record.
          </li>
          <li>
            <strong>Design pack.</strong> Single-line diagrams, panel schedules, calculations,
            earthing arrangement spec. Marked up to as-built where deviations occurred.
          </li>
          <li>
            <strong>As-built drawings.</strong> Final marked-up drawings showing what was actually
            installed.
          </li>
          <li>
            <strong>Building Control Compliance Certificate.</strong> Or notification reference
            where the BCCC has not yet arrived from the scheme.
          </li>
          <li>
            <strong>Witness sheets.</strong> Where contract or spec required them.
          </li>
          <li>
            <strong>Departures log.</strong> Each departure documented with regulation number,
            alternative, reasoning, acceptance.
          </li>
          <li>
            <strong>Manufacturer manuals.</strong> For all installed equipment — RCBOs, AFDDs, EV
            chargers, SPDs, smart switches, BMS controllers, panel components.
          </li>
          <li>
            <strong>Recommended maintenance schedule.</strong> Periodic checks2 the duty-holder
            should carry out — RCD test routine, visual checks2, recommended EICR interval.
          </li>
          <li>
            <strong>Commissioning test results.</strong> For functional commissioning beyond BS
            7671 verification — interlocks, changeovers, BMS interfaces, fire alarm interfaces.
          </li>
          <li>
            <strong>Spare parts list.</strong> For commercial installations — recommended spares
            to hold for rapid maintenance response.
          </li>
          <li>
            <strong>Contractor and supplier contact directory.</strong> For warranty, fault
            response, future alteration projects.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Departure log — Reg 120.3 documenting where you depart from BS 7671"
        plainEnglish="BS 7671 allows departures from its own requirements where the design provides equivalent safety. Reg 120.3 in A4:2026 codifies this — every departure must be recorded on the EIC with the regulation departed from, the alternative provided, and the safety reasoning. The departure log is a formal part of the certification, not a footnote. Inspectors reading the certificate years later use the departure log to understand why the install does what it does."
        onSite="A typical departure: a customer's heritage building cannot accept BS 7671 522.6 cable burial depths because the walls are stone with no chase; the design uses surface conduit instead. The departure log records: 'Reg 522.6 — surface conduit substitution; mineral-filled steel conduit fitted to all exposed runs to provide equivalent mechanical protection; design accepted by [supervisor]'. The apprentice does not personally sign departures (typically the certifier does) but should recognise when a departure is being made and that it needs documenting."
      >
        <p>Departure log standard structure:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Regulation departed from</strong> — exact reg number and a brief paraphrase of
            the requirement.
          </li>
          <li>
            <strong>Reason for departure</strong> — site condition, customer constraint, design
            choice that the regulation did not anticipate.
          </li>
          <li>
            <strong>Alternative provided</strong> — what was done instead, in enough detail that
            the next inspector can evaluate the equivalence.
          </li>
          <li>
            <strong>Safety reasoning</strong> — how the alternative provides equivalent or better
            safety than the regulation's stated method.
          </li>
          <li>
            <strong>Acceptance and signature</strong> — the designer's or certifier's confirmation
            that the departure is acceptable; lives on the EIC.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Witness sheets and the contractual sign-off chain"
        plainEnglish="On commercial and public-sector jobs the contract often specifies witness signatures on key tests — main switch operation, RCD trip times, generator changeover, fire alarm interface, emergency lighting duration. The witness is typically the client's engineer or a third-party commissioning agent. Witness sheets are a contractual deliverable; missing or unsigned sheets stall the final account and can delay the project handover by weeks."
        onSite="The apprentice's role on witnessed tests is to know in advance which tests are witnessed (read the contract spec or the commissioning plan), schedule the witness with the office, set up the test cleanly so the witness can see the result clearly, and record the result on the witness sheet at the time. The witness signs the sheet; the original goes into the O&M pack; copies to the contractor's job file and the witness's records. Late or vague witness sheets are a project-management headache; on-the-day witnessing is the discipline that prevents it."
      >
        <p>Witness sheet workflow:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Identify witnessed tests</strong> — from the contract spec, the commissioning
            plan, the client's preferences; build the schedule before commissioning starts.
          </li>
          <li>
            <strong>Book the witness</strong> — client's engineer or third-party commissioning
            agent; typically requires advance notice.
          </li>
          <li>
            <strong>Set up the test cleanly</strong> — instrument calibration in date and visible,
            test point clearly marked, expected result understood, brief the witness on the test
            purpose and method.
          </li>
          <li>
            <strong>Record the result on the witness sheet</strong> — test description, instrument
            used, reading, pass / fail, date, witness signature, contractor signature.
          </li>
          <li>
            <strong>Distribute</strong> — original to O&M pack, copies to contractor file and
            witness's own records.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Digital twins and BIM — where commissioning paperwork is heading"
        plainEnglish="On larger commercial and public-sector projects the design and as-built records increasingly live in a Building Information Model (BIM). The BIM model carries the geometry, the schedule, the test results, the commissioning records and the maintenance schedule as linked attributes on each component. The apprentice working on these projects encounters BIM through the site model viewer (typically Autodesk Construction Cloud, Trimble Connect, BIM 360) and the commissioning data input on tablets that feed straight into the model."
        onSite="On smaller domestic and light-commercial work, BIM is rarely used; the paperwork chain is paper or simple PDF. On bigger jobs (schools, hospitals, large commercial fit-outs) BIM is the medium and the apprentice's commissioning data input on a tablet is part of the BIM workflow. The model captures: location of every accessory, model and serial of every device, test result against every test point, commissioning sign-off per circuit. The customer (typically the building's facilities team) uses the same model for ongoing maintenance — replace a faulty RCBO, the model knows where it is and what model goes in."
      >
        <p>BIM-aware commissioning workflow:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Tablet site app</strong> — Autodesk Construction Cloud, Trimble Connect, BIM
            360; the apprentice's interface to the model on site.
          </li>
          <li>
            <strong>Component-level data input</strong> — each accessory has a unique ID; the test
            result is logged against the ID.
          </li>
          <li>
            <strong>Live as-built</strong> — changes recorded on the tablet update the model in
            near-real-time; no separate as-built mark-up step required.
          </li>
          <li>
            <strong>Handover artefact</strong> — the model itself is the O&M pack; the customer
            receives an export plus ongoing access to the live model.
          </li>
          <li>
            <strong>Future maintenance</strong> — facilities team uses the same model to plan and
            record maintenance; the install record stays current for the life of the building.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>What goes wrong on site</ContentEyebrow>

      <CommonMistake
        title="Skipping as-built mark-ups because the installation matched the design"
        whatHappens={
          <>
            Installer assumes the design was followed exactly and skips the as-built mark-up step.
            Two years later a fault develops on a circuit and the EICR inspector pulls the
            original drawings. The drawings show the kitchen ring routed via the back wall; the
            actual route is via the floor void. The inspector spends hours tracing the actual
            route, charges the customer for the extra time, and flags the discrepancy as a
            documentation defect on the EICR. The customer is annoyed; the contractor file shows
            no DCN explaining the change.
          </>
        }
        doInstead={
          <>
            Mark up every change, every time, even minor ones. A cable rerouted around an
            unforeseen joist; an accessory moved 30 cm to clear a worktop; a circuit renumbered
            for clarity at the CU. All of it goes on the as-built mark-up. Five minutes per change
            at the time saves hours of forensic tracing years later. On commercial work the
            principal designer typically requires as-built returns before accepting completion; on
            domestic it is the contractor’s responsibility to maintain the standard.
          </>
        }
      />

      <CommonMistake
        title="Issuing the EIC without the certifier ever seeing the test results"
        whatHappens={
          <>
            On a busy job, the certifier (typically a senior electrician on a domestic contract)
            signs the EIC based on a verbal "all tested fine" from the testing electrician without
            reviewing the Schedule of Test Results. Months later a circuit fails an EICR retest
            with anomalous readings; the original Schedule of Test Results from your file shows
            the same anomaly was present at certification — a Zs reading 30% above the design
            value that should have triggered investigation. The certifier never saw it. Liability
            now sits with the certifier whose signature is on the EIC.
          </>
        }
        doInstead={
          <>
            Certifier reviews every Schedule of Test Results row before signing the EIC. Anomalies
            investigated. Defects rectified per Reg 644.1.1. Only then does the certifier sign.
            Verbal "all good" from the tester is not sufficient — the certifier’s signature
            carries personal liability and the certifier needs to see the data they are
            certifying.
          </>
        }
      />

      <Scenario
        title="Domestic CU swap — chain compressed into one person, every link still present"
        situation={
          <>
            You are completing a domestic CU swap-out as a single self-employed electrician.
            Customer is the homeowner, owner-occupied, about to remortgage. 8 circuits,
            single-phase TN-C-S, all RCBOs (Type A 30 mA), measured Ze = 0.30 Ω. There is no
            separate designer, no separate testing electrician, no separate commissioning engineer
            — you are all four roles. How does the documentation chain compress?
          </>
        }
        whatToDo={
          <>
            <strong>Designer step (you).</strong> Before the job, write a one-page design note —
            RCBO selection (Type A 30 mA per Reg 411.3.3 for domestic socket-outlets), Zs target
            check against Table 41.3 for each new RCBO, earthing arrangement review (TN-C-S
            confirmed at intake; main earthing conductor 16 mm² per Table 54.7 for 25 mm² PME
            tails), main protective bonding review (10 mm² to gas and water, sized per Table
            54.8). File this in the contractor cloud folder under the job reference.
            <br />
            <br />
            <strong>Installer step (you).</strong> Mark up the existing CU schedule with the new
            circuit numbers and any changes — circuits renumbered if RCBO arrangement changes, any
            accessory additions noted. Materials register = short list of brand/model of new CU,
            brand of RCBOs, batch numbers from packaging.
            <br />
            <br />
            <strong>Tester step (you).</strong> Complete the Schedule of Test Results per circuit
            — dead-test sequence (continuity, R1+R2, ring final readings, IR L-L/L-E/N-E),
            polarity at the CU, Zs measured at far end of each circuit, RCD trip times. Anomaly
            log: any reading that is unexpected gets a note (e.g. "C7 IR 1.2 MΩ — above 1 MΩ
            minimum but lower than rest of install; original rubber-sheath wiring on this
            circuit").
            <br />
            <br />
            <strong>Certifier step (you).</strong> Review your own Schedule of Test Results for
            sense (no transposed columns, no obviously wrong readings, no blank fields). Confirm
            Reg 644.1.1 — any defect on the new work corrected and retested. Sign the EIC
            declarations — designer, constructor, inspector — all in your name. Schedule of
            Inspections completed. Comments on existing installation captures the C7 IR
            observation. Recommended next inspection 10 years.
            <br />
            <br />
            <strong>Customer step.</strong> Hand over the pack — printed EIC trio, BCCC pending
            notification, operational instructions, manuals for RCBOs, as-built schedule on CU
            door plus pack copy. Five-minute walk-through. Email PDF copy within the hour. Upload
            to NICEIC same day.
            <br />
            <br />
            <strong>Contractor file.</strong> Cloud copy of design note, mark-ups, photos, EIC
            pack PDF, NICEIC notification reference. Indefinite retention.
          </>
        }
        whyItMatters={
          <>
            The chain works exactly the same on a one-person job as on a 50-person commissioning
            event — the steps just collapse into one set of hands and one set of signatures. The
            discipline of separating the steps mentally even when you are doing all of them keeps
            the documentation defensible. Skipping the "designer" step ("I just know what to fit")
            leaves no design evidence for an audit. Skipping the "as-built" step ("the install
            matched what I planned") leaves a future EICR inspector hunting for cable routes that
            are not documented. Each step matters; each step lives in the file.
          </>
        }
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 132.1 framework (Regs 132.2–132.5 / 132.6–132.16)"
        clause={
          <>
            The information required as a basis for design is stated in Regulations 132.2 to
            132.5. The requirements to which the design shall conform are stated in Regulations
            132.6 to 132.16. Designers shall therefore determine and record the information listed
            in 132.2–132.5 to demonstrate conformity with subsequent design requirements.
          </>
        }
        meaning={
          <>
            The design pack travels with the install through commissioning into the customer file.
            The Reg 132.1 framework (with the broader Chapter 13 architecture) specifies the
            information the designer must record — the inspector at handover, the next periodic
            inspector, and the duty holder all rely on the recorded data to verify the install
            matches the design intent.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Regulation 132.1 framework."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 133.1.3 (equipment usage on certification)"
        clause={
          <>
            Regulation 133.1.3 (Selection of equipment) has been modified and now requires that
            certain usage of equipment shall be recorded on the appropriate electrical
            certification specified in Part 6 of BS 7671. Designers, installers, and inspectors
            shall ensure that where BS 7671 calls for the usage of particular equipment to be
            identified, that usage is explicitly entered on the certification associated with the
            work covered by Part 6.
          </>
        }
        meaning={
          <>
            Commissioning paperwork is the home of these equipment-usage entries. Where the
            regulation calls out a specific role — for example open-PEN protection on an EV
            circuit or RCD type on a battery feed — the EIC has to record it. The next inspector
            relies on these entries to verify that the protective measures actually match the kit
            you fitted.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Regulation 133.1.3."
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Commissioning paperwork is a chain — designer (Reg 132.13 design pack) → installer (as-built mark-ups + materials register) → tester (Schedule of Test Results + witness sheets) → certifier (EIC top-level declarations) → customer (full O&M pack).',
          'On a single-person domestic job the chain compresses into one set of signatures on the EIC, but every logical step still exists — design notes, install record, test results, signed certification, customer pack.',
          'Designer hand-over to installer = design pack: single-line diagrams, panel schedules, calculations, OCPD spec, earthing arrangement, departures log.',
          'Installer hand-over to tester = as-built mark-ups, materials register, dead-test record, safe-isolation status, defect register, DCN log.',
          'Tester hand-over to certifier = completed Schedule of Test Results, witness sheets where spec requires, anomaly log, defect register, instrument calibration evidence.',
          'Certifier hand-over to customer = O&M pack consolidating everything — signed EIC, schedules, design pack, as-builts, BCCC, manuals, maintenance schedule, contact directory.',
          'Reg 132.13 spans the chain — design-side documentation flows from start to end, evolving at each link rather than being recreated at the end.',
          "Documentation chain integrity matters most years later — fault, sale, EICR, insurance claim, alteration. A weak link compromises the installation's defendability when it is needed most.",
        ]}
      />

      <Quiz title="Commissioning paperwork chain — knowledge check" questions={quizQuestions2} />
    </div>
  );
}
