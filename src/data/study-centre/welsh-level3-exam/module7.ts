/**
 * Final paper — Module 7: Inspection, testing and commissioning.
 *
 * Sixty questions, and the part of the paper where a wrong answer is most
 * likely to end up on somebody's certificate. The three things it presses
 * hardest on are the ones the course found people get wrong most often: that
 * the test sequence is risk management rather than paperwork order, that a
 * tabulated maximum Zs is not the limit you compare a cold site measurement
 * against, and that choosing the wrong certificate invalidates the lot.
 *
 * Numeric limits here come from the repo's own transcription of BS 7671
 * (src/data/zsLimits.ts: Type B 6 A 7.28 Ω, 16 A 2.73 Ω, 32 A 1.37 Ω with
 * Cmin 0.95) and from the course's checked RegsCallouts.
 */

import { bank, type WelshExamQuestion } from './helpers';

const QUESTIONS: WelshExamQuestion[] = [
  // ── Section 1 · Safe isolation and the legal framework ──────────────────
  {
    id: 296,
    question: 'What does isolation mean, as distinct from switching off?',
    options: [
      'Opening the protective device for the circuit being worked on',
      'Secure separation from every source of supply, held in place while you work',
      'Removing the fuse carrier and retaining it at the point of work',
      'Confirming with a voltage indicator that the circuit reads zero',
    ],
    correctAnswer: 1,
    explanation:
      'Isolation is a state, not a switch position: separation from every source, secured so it cannot be undone while you are working. Opening a device and removing a fuse are both actions that may form part of it, and neither is secure on its own — somebody can close the device or refit the carrier. A zero reading proves the circuit is dead at that moment; it does nothing to keep it that way.',
    section: 'Safe isolation and the legal framework',
    difficulty: 'basic',
    topic: 'What isolation means',
    reference: 'EAWR 1989 Regulations 12 and 13',
  },
  {
    id: 297,
    question:
      'What are the seven steps of the safe isolation procedure, in order?',
    options: [
      'Identify, switch off, secure, prove, test, re-prove, post notice',
      'Switch off, identify, test, secure, prove, post notice, re-prove',
      'Identify, test, switch off, prove, secure, re-prove, post notice',
      'Switch off, secure, post notice, identify, prove, test, re-prove',
    ],
    correctAnswer: 0,
    explanation:
      'Identify, switch off, secure, prove, test, re-prove, post notice — each step exists to catch a failure of the one before it, and the second prove is what confirms the indicator was still working when you took the dead reading. Testing before switching off, or securing after proving, breaks that chain; and posting the notice before you have established the circuit is dead advertises a state you have not yet confirmed.',
    section: 'Safe isolation and the legal framework',
    difficulty: 'basic',
    topic: 'The isolation sequence',
    reference: 'Module 7, Section 1 — Seven steps',
  },
  {
    id: 298,
    question:
      'How many readings are required to prove a three-phase supply dead?',
    options: [
      'Three — each line to earth',
      'Four — each line to earth, and neutral to earth',
      'Seven — each line to neutral, each line to earth, and neutral to earth',
      'Ten — every line to neutral, every line to earth, every line pair, and neutral to earth',
    ],
    correctAnswer: 3,
    explanation:
      'Ten: three line-to-neutral, three line-to-earth, three line-to-line, and neutral-to-earth. Every combination has to be checked because any one of them can be the one carrying a backfeed or a borrowed neutral. Three, four or seven readings all leave combinations untested, and on a single-phase supply the equivalent full set is three — line-neutral, line-earth and neutral-earth.',
    section: 'Safe isolation and the legal framework',
    difficulty: 'intermediate',
    topic: 'Proving dead on three phase',
    reference: 'Module 7, Section 1 — Ten readings',
  },
  {
    id: 299,
    question:
      'You are isolating a circuit and the board schedule identifies the way clearly. Is that sufficient identification?',
    options: [
      'Yes, provided the schedule was produced when the installation was certified',
      'No — the schedule is evidence, not proof; prove the device by watching the load die',
      'Yes, provided the schedule matches the labels on the board',
      'No — identification must always be confirmed by a second person',
    ],
    correctAnswer: 1,
    explanation:
      'A schedule is evidence and on an altered installation you should expect it to be wrong — identification is proved by operating the device and watching the load respond. The age of the schedule and its agreement with the labels tell you nothing, because both were written at the same time and neither was updated when somebody added a spur. A second person is a useful control but it is not what makes the identification valid.',
    section: 'Safe isolation and the legal framework',
    difficulty: 'intermediate',
    topic: 'Identifying the circuit',
    reference: 'Module 7, Section 1 — Isolation is a state',
  },
  {
    id: 300,
    question:
      'Which BS 7671 Section sets the requirements for a device suitable for isolation?',
    options: [
      'Section 411',
      'Section 511',
      'Section 537',
      'Section 643',
    ],
    correctAnswer: 2,
    explanation:
      'Section 537 covers isolation and switching, including that the device must be securable in the off position — which is why an ordinary flick switch is not a point of isolation. Section 411 is protection against electric shock, Section 511 is compliance of equipment with standards, and Section 643 is the testing requirements.',
    section: 'Safe isolation and the legal framework',
    difficulty: 'intermediate',
    topic: 'Devices for isolation',
    reference: 'BS 7671 Section 537',
  },
  {
    id: 301,
    question:
      'Regulation 537.2.2 states which of the following?',
    options: [
      'Semiconductor devices shall not be used as isolating devices',
      'Isolating devices shall be lockable in the open position',
      'A single isolating device shall serve no more than one distribution board',
      'Isolating devices shall be located within 2 m of the equipment they serve',
    ],
    correctAnswer: 0,
    explanation:
      'Semiconductor devices shall not be used for isolation — a solid-state switch has no physical contact gap, so it cannot provide the secure separation isolation means. Lockability, the number of boards served and proximity to equipment are all genuine concerns addressed by other requirements in the same section, and none of them is what 537.2.2 says.',
    section: 'Safe isolation and the legal framework',
    difficulty: 'advanced',
    topic: 'Isolating devices',
    reference: 'BS 7671 Regulation 537.2.2',
  },
  {
    id: 302,
    question:
      'Under EAWR Regulation 14, live working may be justified only if which conditions are met?',
    options: [
      'A permit to work has been issued and a second person is present',
      'It is unreasonable for the conductor to be dead, it is reasonable to work live, and suitable precautions are taken',
      'The operative holds a current competence card and appropriate PPE is worn',
      'The work is verification testing rather than installation work',
    ],
    correctAnswer: 1,
    explanation:
      'All three conditions together: unreasonable to be dead, reasonable to work live, and suitable precautions. Verification live tests — Zs, loop impedance and RCD operation — routinely satisfy all three, which is why they are lawful, but it is the three conditions that make them so rather than the category of work. A permit, a second person, a card and PPE are all precautions; precautions alone do not justify live working.',
    section: 'Safe isolation and the legal framework',
    difficulty: 'advanced',
    topic: 'Live working',
    reference: 'EAWR 1989 Regulation 14',
  },
  {
    id: 303,
    question:
      'EAWR Regulation 4(2) creates a duty to maintain the system in a safe condition. Who holds it once the EIC has been signed?',
    options: [
      'The contractor, indefinitely, because they installed the system',
      'The duty holder receiving the installation — and a continuing duty stays with you if you later learn of a defect and do not act',
      'Nobody, until the first periodic inspection falls due',
      'The competent person scheme, as part of its registration of the work',
    ],
    correctAnswer: 1,
    explanation:
      'The ongoing duty lives with the installation and passes to the client or occupier when the certificate is signed — but if you later discover a defect, failing to notify, make safe or remedy it can itself be an offence under Regulation 4. The contractor does not carry the maintenance duty indefinitely, the duty never lapses between inspections, and a scheme registers work rather than taking on the duty.',
    section: 'Safe isolation and the legal framework',
    difficulty: 'advanced',
    topic: 'The maintenance duty',
    reference: 'EAWR 1989 Regulation 4(2)',
  },
  {
    id: 304,
    question:
      'You need to isolate the fire alarm system to carry out work. Who can authorise that?',
    options: [
      'The principal contractor, as the party controlling the site',
      'Your own supervisor, provided the isolation is brief',
      'The building’s responsible person under the Fire Safety Order',
      'Nobody — a fire alarm system may never be isolated',
    ],
    correctAnswer: 2,
    explanation:
      'Fire alarm and emergency lighting are life-safety systems, so only the building’s responsible person under the Fire Safety Order can authorise isolation, and a fire watch plus a fire log book entry are mandatory while it is off. Neither the principal contractor nor your supervisor holds that authority, and the duration does not change who does. It can be isolated — under control.',
    section: 'Safe isolation and the legal framework',
    difficulty: 'advanced',
    topic: 'Isolating life-safety systems',
    reference: 'Module 7, Section 2 — Five stakeholders',
  },
  {
    id: 305,
    question:
      'How should the scope of an isolation be planned?',
    options: [
      'At the main switch, so nothing can be missed',
      'To the smallest workable footprint — device first, board second, main switch only if the work requires it',
      'At the distribution board serving the work, as a standard approach',
      'Wherever the customer finds it least disruptive, since they bear the cost',
    ],
    correctAnswer: 1,
    explanation:
      'Smallest workable footprint: the device for the circuit if that suffices, the board if it does not, and the main switch only where the work genuinely requires it. Isolating at the main switch as a default drops refrigeration, tills, IT and production equipment with real and foreseeable cost. Always going to the board has a smaller version of the same problem, and the customer’s preference cannot override what the work safely needs.',
    section: 'Safe isolation and the legal framework',
    difficulty: 'intermediate',
    topic: 'Planning the isolation',
    reference: 'Module 7, Section 2 — Five stakeholders',
  },

  // ── Section 2 · Purpose, information and documents ──────────────────────
  {
    id: 306,
    question:
      'Regulation 641.1 requires every installation to be inspected and tested when?',
    options: [
      'On completion, before the certificate is issued',
      'During erection and on completion, before being put into service',
      'Within 30 days of the installation being energised',
      'At first occupation of the building',
    ],
    correctAnswer: 1,
    explanation:
      'During erection and on completion, before being put into service — inspection during erection matters because much of what needs looking at gets covered up. Waiting for completion alone misses everything now behind plasterboard, and tying it to energisation or occupation puts the installation into use before it has been verified.',
    section: 'Purpose, information and documents for initial verification',
    difficulty: 'intermediate',
    topic: 'When verification happens',
    reference: 'BS 7671 Regulation 641.1',
  },
  {
    id: 307,
    question:
      'Regulation 641.5 deals with additions and alterations. What must be verified?',
    options: [
      'That the whole installation now complies with the current edition',
      'That the addition or alteration complies, and does not impair the safety of the existing installation',
      'That the existing installation was compliant when it was originally certified',
      'That the addition can be isolated independently of the existing installation',
    ],
    correctAnswer: 1,
    explanation:
      'Two things: the new work complies, and it has not made the existing installation less safe — which is why a new circuit added to a board with no main bonding is a problem even though the new circuit itself is faultless. Requiring the whole installation to be brought up to the current edition goes beyond the regulation, and neither historical compliance nor independent isolation is what it asks.',
    section: 'Purpose, information and documents for initial verification',
    difficulty: 'advanced',
    topic: 'Additions and alterations',
    reference: 'BS 7671 Regulation 641.5',
  },
  {
    id: 308,
    question:
      'What is the difference between verification and commissioning?',
    options: [
      'Verification is carried out by the installer; commissioning is carried out by the client',
      'Verification is compliance with BS 7671; commissioning is functional acceptance',
      'Verification applies to new work; commissioning applies to alterations',
      'Verification is the dead tests; commissioning is the live tests',
    ],
    correctAnswer: 1,
    explanation:
      'Verification asks whether the installation meets BS 7671; commissioning asks whether it does what it was installed to do. Both are needed for a full handover, and a system can pass one and fail the other — a correctly wired control system with the wrong configuration is the standard example. Who does them, which work they apply to, and the dead-against-live split are all different distinctions.',
    section: 'Purpose, information and documents for initial verification',
    difficulty: 'intermediate',
    topic: 'Verification and commissioning',
    reference: 'Module 7, Section 2 — Technical, legal and documentary',
  },
  {
    id: 309,
    question:
      'Regulation 642.1 requires certain information before testing begins. What should you do if it cannot be obtained?',
    options: [
      'Proceed and note the assumptions made on the certificate',
      'Test against typical values for that type of installation',
      'Document a limitation, and on an initial verification consider whether you can start at all',
      'Ask the client to accept the installation without certification',
    ],
    correctAnswer: 2,
    explanation:
      'Missing data means stop and escalate: record a limitation, and for an initial verification consider whether you have enough to verify anything at all — without the design data, a measurement is a number with nothing to compare it against. Assumptions and typical values manufacture a baseline that does not exist, and an installation is never handed over uncertified.',
    section: 'Purpose, information and documents for initial verification',
    difficulty: 'advanced',
    topic: 'Information before testing',
    reference: 'BS 7671 Regulation 642.1',
  },
  {
    id: 310,
    question:
      'You are replacing a consumer unit in an old house with no documentation at all. What is the right approach?',
    options: [
      'Carry out the work, then test what you find and record the results',
      'Reverse-engineer the design by survey before the work, creating the verification baseline',
      'Record the whole installation as a limitation and certify only the new consumer unit',
      'Decline the work, since verification is impossible without the original design',
    ],
    correctAnswer: 1,
    explanation:
      'Survey first and establish what is there, so you have something to verify against — then do the work and verify against that baseline. Testing afterwards gives you readings with no expected values, which is how an existing fault ends up inside your certification. Limiting the whole installation dodges the question you were engaged to answer, and the work is entirely doable — it just starts earlier than people expect.',
    section: 'Purpose, information and documents for initial verification',
    difficulty: 'advanced',
    topic: 'Undocumented installations',
    reference: 'Module 7, Section 2 — Verification information',
  },
  {
    id: 311,
    question:
      'Which chapter of BS 7671 Part 6 covers periodic inspection and testing?',
    options: [
      'Chapter 63',
      'Chapter 64',
      'Chapter 65',
      'Chapter 66',
    ],
    correctAnswer: 2,
    explanation:
      'Chapter 65 is periodic. Chapter 64 is initial verification and Chapter 66 covers the additional requirements for special locations — the three sit in sequence, which is why the numbers are easy to slide between. Appendix 6 holds the model forms for all of them.',
    section: 'Purpose, information and documents for initial verification',
    difficulty: 'intermediate',
    topic: 'The structure of Part 6',
    reference: 'BS 7671 Part 6',
  },
  {
    id: 312,
    question:
      'Regulation 652.1 requires the frequency of periodic inspection to be determined having regard to what?',
    options: [
      'A fixed interval by building type, published in Guidance Note 3',
      'The type of installation and equipment, its use and operation, the quality of maintenance and the external influences',
      'The date of the previous certificate plus a maximum of five years',
      'Whichever interval the duty holder’s insurer specifies',
    ],
    correctAnswer: 1,
    explanation:
      'It is a judgement based on the installation itself — its type, use, maintenance and the conditions it is subject to — and the results and recommendations of previous certificates and reports must also be taken into account. Fixed intervals by building type are published as guidance and are a starting point rather than the requirement, a blanket five years applies to nothing in particular, and an insurer’s requirement sits alongside rather than replacing the assessment.',
    section: 'Purpose, information and documents for initial verification',
    difficulty: 'advanced',
    topic: 'Periodic inspection intervals',
    reference: 'BS 7671 Regulation 652.1',
  },
  {
    id: 313,
    question:
      'Which document supplies the practical methods that BS 7671 Part 6 does not?',
    options: [
      'The IET On-Site Guide',
      'IET Guidance Note 3',
      'The competent person scheme technical manual',
      'HSE guidance HSR25',
    ],
    correctAnswer: 1,
    explanation:
      'Guidance Note 3 is the practical companion to Part 6 — the standard says what to test and what it must achieve, GN3 says how to do it and how to compare the results. The On-Site Guide is the install-side quick reference, a scheme manual covers the scheme’s own requirements, and HSR25 is the HSE guidance to EAWR. Where GN3 and BS 7671 differ, the standard is the authority.',
    section: 'Purpose, information and documents for initial verification',
    difficulty: 'basic',
    topic: 'Guidance Note 3',
    reference: 'IET Guidance Note 3',
  },
  {
    id: 314,
    question:
      'Regulation 651.4 requires what to be recorded in a periodic report?',
    options: [
      'Only those defects that present an immediate danger',
      'Details of any damage, deterioration, defects or dangerous conditions',
      'A comparison of every test result against the previous report',
      'The remedial work required, with a priced schedule',
    ],
    correctAnswer: 1,
    explanation:
      'Damage, deterioration, defects and dangerous conditions all go in the report — not just the dangerous ones, because deterioration recorded now is what the next inspection is compared against. Comparing every result with the previous report is good practice rather than the requirement, and pricing remedial work is a commercial matter outside the report.',
    section: 'Purpose, information and documents for initial verification',
    difficulty: 'intermediate',
    topic: 'What a periodic report records',
    reference: 'BS 7671 Regulation 651.4',
  },

  // ── Section 3 · Carrying out the inspection ─────────────────────────────
  {
    id: 315,
    question:
      'Why does inspection precede testing in the Part 6 sequence?',
    options: [
      'Because the Schedule of Inspections is completed before the Schedule of Test Results',
      'Because visible defects are caught with no instrument risk, and before the installation is energised',
      'Because inspection is quicker, so defects are found sooner',
      'Because testing cannot be carried out until the schedule of inspections has been signed',
    ],
    correctAnswer: 1,
    explanation:
      'The sequence is risk management: looking finds defects without connecting an instrument to anything and without energising, so the dangerous discoveries happen at the safest moment. The order of the paperwork follows the order of the work rather than causing it, speed is not the reason, and nothing about signing the schedule gates the testing.',
    section: 'Carrying out the inspection',
    difficulty: 'intermediate',
    topic: 'Why inspection comes first',
    reference: 'BS 7671 Regulations 642 and 643',
  },
  {
    id: 316,
    question:
      'The Regulation 642.3 list of inspection items is described as non-exhaustive. What follows from that?',
    options: [
      'Items may be omitted where the inspector judges them unnecessary',
      'Part 7 location-specific items and anything else safety-relevant are added to it',
      'The list is advisory, so a scheme’s own schedule takes precedence',
      'Only those items relevant to the circuits being tested need be inspected',
    ],
    correctAnswer: 1,
    explanation:
      'Non-exhaustive means it is a minimum: you add the Part 7 items for every special location present, and anything else safety-relevant you identify. It does not license omission — the listed items are checked where relevant. A scheme schedule derives from the standard rather than overriding it, and the inspection is not limited to the circuits you happen to be testing.',
    section: 'Carrying out the inspection',
    difficulty: 'advanced',
    topic: 'Scope of the inspection',
    reference: 'BS 7671 Regulation 642.3',
  },
  {
    id: 317,
    question:
      'On a Schedule of Inspections, what must accompany every cross and every limitation?',
    options: [
      'A photograph of the item concerned',
      'A comment explaining what was found',
      'A reference to the regulation not complied with',
      'A signature from the duty holder acknowledging it',
    ],
    correctAnswer: 1,
    explanation:
      'A comment is mandatory wherever a cross or a limitation is recorded — the entry on its own tells the next person nothing about what was found or why. A photograph is useful evidence and a regulation reference is good practice, but neither is what the schedule requires, and the duty holder does not countersign individual items. A blank entry is itself a finding, and an honest limitation beats a dishonest tick every time.',
    section: 'Carrying out the inspection',
    difficulty: 'intermediate',
    topic: 'Completing the schedule',
    reference: 'BS 7671 Appendix 6 — Schedule of Inspections',
  },
  {
    id: 318,
    question:
      'A cable is installed in a wall at a depth of less than 50 mm. What makes it compliant?',
    options: [
      'A prescribed zone, 30 mA RCD protection, or sufficient mechanical protection',
      'Being run vertically rather than horizontally within the wall',
      'Being enclosed in oval PVC conduit',
      'Being recorded as a departure on the certificate',
    ],
    correctAnswer: 0,
    explanation:
      'Any one of those three routes: within a prescribed zone, protected by a 30 mA RCD, or with sufficient earthed mechanical protection. Direction of run has nothing to do with it — a vertical cable outside a zone is no better off. Oval conduit provides containment rather than the mechanical protection the requirement means, and a departure records non-compliance rather than creating compliance.',
    section: 'Carrying out the inspection',
    difficulty: 'intermediate',
    topic: 'Cables concealed in walls',
    reference: 'BS 7671 Regulation 522.6.202',
  },
  {
    id: 319,
    question:
      'Where must a single-pole protective or switching device be connected?',
    options: [
      'In the neutral conductor, so the line remains continuous',
      'In the line conductor only',
      'In either conductor, provided the polarity is recorded',
      'In the line conductor for protective devices and the neutral for switching devices',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 132.14.1 is explicit: a single-pole fuse, switch or circuit-breaker shall be inserted in the line conductor only — and 530.3.3 adds that a switching device shall not be inserted in the neutral conductor alone. A device in the neutral leaves the equipment live when it is "off", which is exactly the condition that kills. It is one of the most frequent first-fix defects, caught both by eye during inspection and by the polarity test, which is why both are carried out. Recording the polarity does not make a neutral-switched device safe, and the rule does not vary by device function.',
    section: 'Carrying out the inspection',
    difficulty: 'intermediate',
    topic: 'Single-pole devices',
    reference: 'BS 7671 Regulations 132.14.1 and 530.3.3',
  },
  {
    id: 320,
    question:
      'Regulation 411.3.1.1 requires a protective conductor to be run to and terminated at which points?',
    options: [
      'Each distribution board and each socket-outlet',
      'Each point in wiring and each accessory, with one lampholder exception',
      'Each accessory located within a special location',
      'Each point where Class I equipment is to be connected',
    ],
    correctAnswer: 1,
    explanation:
      'Every point in wiring and every accessory, with one narrow exception for a lampholder with no exposed-conductive-parts suspended from such a point. Limiting it to boards and sockets, to special locations, or to where Class I equipment happens to be connected today all leave points with no CPC — and the next person who fits a metal accessory there has no earth to connect to.',
    section: 'Carrying out the inspection',
    difficulty: 'advanced',
    topic: 'Where a CPC is required',
    reference: 'BS 7671 Regulation 411.3.1.1',
  },
  {
    id: 321,
    question:
      'Where should a main bonding clamp be located on an incoming metallic service?',
    options: [
      'Within 600 mm of the meter or the point of entry, on bright clean metal, carrying the BS 951 label',
      'At the nearest convenient accessible point, anywhere on the pipework',
      'On the consumer side of any insulating section, with no distance requirement',
      'Within 2 m of the main earthing terminal',
    ],
    correctAnswer: 0,
    explanation:
      'Within 600 mm of the meter or the service entry, on bright clean metal, with the BS 951 label fitted. Anywhere accessible allows the bond to sit beyond a section of pipe that may later be replaced in plastic. Being on the consumer side of an insulating section is necessary but not sufficient without the distance, and the distance is measured from the service rather than from the MET.',
    section: 'Carrying out the inspection',
    difficulty: 'advanced',
    topic: 'Bonding clamp position',
    reference: 'BS 7671 Regulations 514.13.1 and 544.1',
  },
  {
    id: 322,
    question:
      'Which senses are used in an electrical inspection?',
    options: [
      'Sight and touch only — the others cannot provide reliable evidence',
      'Sight, smell, hearing and — used sparingly and only where safe — touch',
      'All five, including taste for identifying chemical contamination',
      'Sight only, with everything else confirmed by instrument',
    ],
    correctAnswer: 1,
    explanation:
      'Sight does most of the work; smell catches overheating before it is visible; hearing detects arcing, buzzing and a changed transformer note, and also something that should be running and is not; touch is used sparingly, only where it is safe, and never to test for voltage. Taste is never used in electrical inspection, under any circumstances. And the senses detect symptoms rather than values, which is why testing follows.',
    section: 'Carrying out the inspection',
    difficulty: 'basic',
    topic: 'Using the senses',
    reference: 'Module 7, Section 3 — Inspection first, instruments later',
  },
  {
    id: 323,
    question:
      'Which special-location requirement applies to an EV charge point on a PME supply?',
    options: [
      'A dedicated circuit and a Type A RCD',
      'PEN-fault protection, by an appropriate device or by a separate TT electrode',
      'A separate consumer unit fed from the origin',
      'An isolator within 1 m of the charge point',
    ],
    correctAnswer: 1,
    explanation:
      'Protection against the consequences of an open PEN conductor is the requirement that is specific to PME, met either by a device that disconnects on detecting the fault or by earthing the charging equipment through a separate TT electrode. A dedicated circuit and local isolation are both required but neither is PME-specific, the RCD type has to suit the equipment and is often Type B, and a separate consumer unit is one arrangement among several.',
    section: 'Carrying out the inspection',
    difficulty: 'advanced',
    topic: 'EV charging installations',
    reference: 'BS 7671 Regulation 722.411.4',
  },
  {
    id: 324,
    question:
      'In a location containing a bath or shower, which of these is permitted within the zones?',
    options: [
      'A standard 13 A socket-outlet, provided it is at least 3 m from zone 1',
      'A shaver supply unit complying with BS EN 61558-2-5',
      'A fused connection unit supplying a towel rail',
      'Any accessory, provided it is IPX4 rated',
    ],
    correctAnswer: 1,
    explanation:
      'A shaver supply unit to BS EN 61558-2-5 is the recognised exception; ordinary socket-outlets are prohibited within the zones, and the 3 m measurement applies outside them rather than creating an allowance inside. A fused connection unit is an accessory subject to the same zone restrictions, and an IP rating addresses water ingress rather than making any accessory permissible in any zone.',
    section: 'Carrying out the inspection',
    difficulty: 'advanced',
    topic: 'Bathroom zones',
    reference: 'BS 7671 Section 701',
  },

  // ── Section 4 · Test instruments, calibration and safe use ──────────────
  {
    id: 325,
    question:
      'Which of these is NOT part of the de-energised test sequence?',
    options: [
      'Continuity of protective conductors',
      'Insulation resistance',
      'Earth fault loop impedance',
      'Polarity',
    ],
    correctAnswer: 2,
    explanation:
      'Earth fault loop impedance is a live test and follows energisation, along with prospective fault current and RCD operating time. Continuity, insulation resistance, polarity and earth electrode resistance make up the dead set — and each of them either cannot be done on an energised circuit or would endanger the person and the connected equipment if it were.',
    section: 'Test instruments, calibration and safe use',
    difficulty: 'basic',
    topic: 'Dead and live tests',
    reference: 'BS 7671 Regulation 643.1',
  },
  {
    id: 326,
    question:
      'What test voltage and minimum value apply to insulation resistance on a standard 230 V circuit?',
    options: [
      '250 V d.c., minimum 0.5 MΩ',
      '500 V d.c., minimum 1 MΩ',
      '500 V d.c., minimum 2 MΩ',
      '1000 V d.c., minimum 1 MΩ',
    ],
    correctAnswer: 1,
    explanation:
      '500 V d.c. with a 1 MΩ minimum for low-voltage circuits up to 500 V. 250 V d.c. and 0.5 MΩ is the SELV and PELV row, and 1000 V d.c. applies above 500 V — three rows of the same table, which is why the circuit type is established before the range is selected. And 1 MΩ is a floor, not a target: a healthy installation reads tens of megohms.',
    section: 'Test instruments, calibration and safe use',
    difficulty: 'intermediate',
    topic: 'Insulation resistance test voltages',
    reference: 'BS 7671 Regulation 643.3 · Table 64',
  },
  {
    id: 327,
    question:
      'A circuit returns an insulation resistance of 3 MΩ where the neighbouring circuits all read above 100 MΩ. What should you do?',
    options: [
      'Record it as a pass, since it exceeds the 1 MΩ minimum',
      'Record it, and investigate before it is accepted — a reading an order of magnitude below its neighbours is a developing fault',
      'Re-test at 250 V d.c. to avoid stressing the insulation further',
      'Record it as a failure, since it is below 50 MΩ',
    ],
    correctAnswer: 1,
    explanation:
      'It passes the minimum and it is still worth investigating: 1 MΩ is a floor, and a reading far below its neighbours on the same installation is a developing fault that will be somebody’s call-out later. Recording it as a clean pass throws away the signal. Dropping the test voltage would not tell you anything useful, and calling it a failure misstates the criterion — it is a pass that warrants investigation.',
    section: 'Test instruments, calibration and safe use',
    difficulty: 'intermediate',
    topic: 'Interpreting insulation resistance',
    reference: 'Module 7, Section 5 — Reading the trend',
  },
  {
    id: 328,
    question:
      'Which components should be disconnected, or otherwise addressed, before an insulation resistance test?',
    options: [
      'Nothing — a 500 V d.c. test does not affect installed equipment',
      'RCDs, RCBOs, AFDDs, SPDs, capacitors, electronic dimmers and fixed appliances',
      'Only surge protective devices, which are designed to conduct at elevated voltage',
      'Only the main switch, which must be open for the test',
    ],
    correctAnswer: 1,
    explanation:
      'Anything presenting a deliberately low resistance or vulnerable electronics: RCDs and RCBOs, AFDDs, SPDs, capacitors, dimmers and fixed appliances — or use the two-stage method, testing line and neutral together to earth with the electronics in place, then line to neutral with them isolated. Testing everything in situ both damages equipment and produces a meaningless low reading. SPDs alone are not the whole list, and opening the main switch is a given rather than the answer.',
    section: 'Test instruments, calibration and safe use',
    difficulty: 'advanced',
    topic: 'Preparing for insulation resistance testing',
    reference: 'BS 7671 Regulation 643.3.3',
  },
  {
    id: 329,
    question:
      'Under Regulation 643.2.1, what output must a continuity test instrument provide?',
    options: [
      'At least 200 mA at 4 V to 24 V no-load',
      'At least 25 mA at 50 V no-load',
      'At least 1 A at 12 V no-load',
      'At least 200 mA at 250 V d.c.',
    ],
    correctAnswer: 0,
    explanation:
      'At least 200 mA at a no-load voltage between 4 V and 24 V. The current matters because a low test current can read through a joint that would fail under fault conditions. The other combinations either lack the current to be meaningful or apply a voltage that belongs to the insulation resistance test rather than to continuity.',
    section: 'Test instruments, calibration and safe use',
    difficulty: 'advanced',
    topic: 'Continuity instrument requirements',
    reference: 'BS 7671 Regulation 643.2.1',
  },
  {
    id: 330,
    question:
      'Why is a multimeter unsuitable for proving dead, beyond not being GS38-compliant?',
    options: [
      'Its accuracy is insufficient at low voltages',
      'Its high input impedance lets it read ghost voltages as real',
      'It cannot measure a.c. and d.c. on the same range',
      'Its leads are not rated for CAT III use',
    ],
    correctAnswer: 1,
    explanation:
      'At around 10 MΩ input impedance a multimeter reads induced and capacitively coupled voltages as though they were real supplies, where a two-pole indicator at roughly 1 to 5 kΩ loads them to zero. That is why the two are not interchangeable. Accuracy is not the issue, most multimeters handle both a.c. and d.c., and CAT-rated leads are available for multimeters.',
    section: 'Test instruments, calibration and safe use',
    difficulty: 'advanced',
    topic: 'Ghost voltages',
    reference: 'Module 7, Section 4 — Four de-energised tests',
  },
  {
    id: 331,
    question:
      'Under HSE GS38, what is the maximum exposed metal tip on a test probe?',
    options: [
      '2 mm',
      '4 mm',
      '10 mm',
      '19 mm',
    ],
    correctAnswer: 1,
    explanation:
      '4 mm maximum, together with finger barriers, robust insulated leads and fusing where appropriate. 2 mm is tighter than the guidance and 10 mm and 19 mm both leave enough metal exposed to bridge adjacent terminals — which is the specific incident the limit exists to prevent.',
    section: 'Test instruments, calibration and safe use',
    difficulty: 'intermediate',
    topic: 'GS38 test leads',
    reference: 'HSE GS38',
  },
  {
    id: 332,
    question:
      'What is the typical calibration interval for a multifunction tester, and for a two-pole voltage indicator?',
    options: [
      'Both annually, each on a UKAS-traceable certificate',
      'MFT annually; two-pole indicator every 24 months',
      'MFT every six months; two-pole indicator annually',
      'MFT every 24 months; two-pole indicator annually',
    ],
    correctAnswer: 1,
    explanation:
      'Annually for the MFT, with a UKAS-traceable certificate — shortened to six-monthly in daily use — and every 24 months for the two-pole indicator, which has far less to drift. The other combinations either over- or under-service one of the two, and the consequence of an out-of-date MFT is serious: results from an out-of-calibration instrument are not admissible, and any certificate built on them has to be re-tested and reissued.',
    section: 'Test instruments, calibration and safe use',
    difficulty: 'advanced',
    topic: 'Calibration intervals',
    reference: 'Module 7, Section 4 — Suitable, calibrated, sound',
  },
  {
    id: 333,
    question:
      'What does the as-found reading on a calibration certificate tell you?',
    options: [
      'The accuracy the instrument will hold until its next calibration',
      'Whether the previous year of results taken with that instrument still stands',
      'The instrument’s accuracy specification as published by the manufacturer',
      'Whether the instrument was damaged in transit to the laboratory',
    ],
    correctAnswer: 1,
    explanation:
      'As-found is the state the instrument arrived in, so it tells you whether it was still within specification while you were using it — which is the question that matters if a result is ever challenged. As-left is the state it went back out in, and neither predicts future accuracy. The published specification is a separate document, and transit damage would show as a physical fault rather than in the as-found line.',
    section: 'Test instruments, calibration and safe use',
    difficulty: 'advanced',
    topic: 'Calibration certificates',
    reference: 'Module 7, Section 4 — Suitable, calibrated, sound',
  },
  {
    id: 334,
    question:
      'An instrument is dropped on site. What is the correct action?',
    options: [
      'Carry out a self-test and continue if it passes',
      'Continue, but note the drop in the job record',
      'Presume it unsafe — tag it "do not use" and function-check it at base against a reference instrument',
      'Continue using it for dead tests only until it can be calibrated',
    ],
    correctAnswer: 2,
    explanation:
      'A dropped instrument is presumed unsafe until proved otherwise: tag it out and function-check it at base against a reference before it goes back into service. An on-board self-test checks the instrument’s own electronics, not whether the lead insulation or the probe barrier cracked. Noting it and carrying on, or restricting it to dead tests, both keep a suspect instrument in use on work that depends on its readings.',
    section: 'Test instruments, calibration and safe use',
    difficulty: 'intermediate',
    topic: 'Damaged instruments',
    reference: 'Module 7, Section 4 — Suitable, calibrated, sound',
  },

  // ── Section 5 · The sequence of tests and interpreting results ──────────
  {
    id: 335,
    question:
      'Why does continuity of protective conductors come first in the test sequence?',
    options: [
      'Because it is the quickest test and gets the circuit identified',
      'Because every later test assumes a proven earth path, and a broken CPC falsifies the results',
      'Because it is the only test that can be carried out before the circuit is complete',
      'Because the instrument must be nulled before any other range is used',
    ],
    correctAnswer: 1,
    explanation:
      'A broken protective conductor makes everything after it meaningless — the insulation resistance to earth, the polarity check, the loop impedance all assume the path exists. Speed is not the reason, other tests can be done on incomplete work, and nulling the leads is a step within the continuity test rather than a reason to do it first.',
    section: 'The sequence of tests and interpreting results',
    difficulty: 'intermediate',
    topic: 'Why continuity comes first',
    reference: 'BS 7671 Regulation 643.1',
  },
  {
    id: 336,
    question:
      'Why does polarity testing come after insulation resistance rather than before it?',
    options: [
      'Because polarity requires the circuit to be energised',
      'Because a reversal passes both continuity and insulation resistance, so it must be caught by its own test',
      'Because the insulation resistance test would be invalidated by a reversed connection',
      'Because polarity is a visual check rather than a measurement',
    ],
    correctAnswer: 1,
    explanation:
      'A line-neutral reversal passes continuity and passes insulation resistance quite happily, and still leaves a live neutral — so it needs a test of its own, placed where it will catch what the earlier tests cannot. Polarity is verified dead, on the continuity range, so it does not need energisation. It does not invalidate the insulation test, and while it is confirmed by eye during inspection as well, it is a measurement here.',
    section: 'The sequence of tests and interpreting results',
    difficulty: 'advanced',
    topic: 'Why polarity sits where it does',
    reference: 'BS 7671 Regulation 643.1',
  },
  {
    id: 337,
    question:
      'On a ring final circuit wired in 2.5 mm² with a 1.5 mm² CPC, what relationship do you expect between r1 and r2?',
    options: [
      'r2 approximately equal to r1',
      'r2 approximately 1.6 to 1.7 times r1',
      'r2 approximately half r1',
      'r2 approximately 2.5 times r1',
    ],
    correctAnswer: 1,
    explanation:
      'The CPC has a smaller cross-sectional area, so its resistance is higher in roughly the ratio of the areas — about 1.67 for 2.5 mm² against 1.5 mm², which is where the 1.6 to 1.7 expectation comes from. Equal readings would suggest the CPC is the same size as the line conductor; half would mean it is larger; and 2.5 times is beyond what that pair of sizes produces. Note that r1 and rn should be close to each other.',
    section: 'The sequence of tests and interpreting results',
    difficulty: 'advanced',
    topic: 'Ring final continuity',
    reference: 'Module 7, Section 5 — Ring final continuity',
  },
  {
    id: 338,
    question:
      'How is Zs predicted before the supply is connected?',
    options: [
      'By measuring Ze and adding the cable length in metres',
      'By adding R1 + R2 to Ze',
      'By measuring insulation resistance and applying the cable constant',
      'It cannot be predicted — Zs is only ever measured live',
    ],
    correctAnswer: 1,
    explanation:
      'Ze plus R1 + R2 predicts Zs while the installation is still dead, which is how the design gets verified before energisation and gives you an expected value to check the live measurement against. Length alone is not a resistance, insulation resistance measures something else entirely, and the whole point of the calculation is that Zs does not have to wait for the live test.',
    section: 'The sequence of tests and interpreting results',
    difficulty: 'intermediate',
    topic: 'Predicting Zs',
    reference: 'Module 7, Section 5 — What has to be true before you start',
  },
  {
    id: 339,
    question:
      'You measure Zs on a Type B 32 A circuit at ambient temperature. Against what figure should the reading be compared?',
    options: [
      '1.37 Ω, the tabulated value from Table 41.3',
      '1.10 Ω, the tabulated value with the 0.8 multiplier applied',
      '1.71 Ω, the tabulated value divided by 0.8',
      '1.44 Ω, the value from the previous edition',
    ],
    correctAnswer: 1,
    explanation:
      'The tabulated maximum assumes the conductor is at operating temperature; a site measurement is taken cold, so the reading is compared against 0.8 × 1.37 = 1.10 Ω. Comparing against 1.37 Ω passes circuits that will fail once warm. Dividing rather than multiplying moves the limit the wrong way, and 1.44 Ω is the pre-Cmin figure from an earlier edition. The corrected limits worth carrying: B6 5.83 Ω, B16 2.19 Ω, B32 1.10 Ω.',
    section: 'The sequence of tests and interpreting results',
    difficulty: 'advanced',
    topic: 'The 0.8 multiplier',
    reference: 'BS 7671 Table 41.3 · IET Guidance Note 3',
  },
  {
    id: 340,
    question:
      'Which Zs test mode should be used on an RCD-protected circuit?',
    options: [
      'Full trip-current mode, for the most accurate reading',
      'No-trip or low-current mode',
      'Either, provided the RCD is reset afterwards',
      'Full trip-current mode, with the RCD temporarily bypassed',
    ],
    correctAnswer: 1,
    explanation:
      'No-trip mode, because a high-current test trips the RCD, invalidates the reading and inconveniences the customer. Resetting afterwards does not recover the measurement. And bypassing the RCD to take a reading removes protection from a live test on an energised installation, which is precisely the wrong trade. Full trip mode belongs on non-RCD circuits, or for confirming a borderline reading once the trip has been prepared for.',
    section: 'The sequence of tests and interpreting results',
    difficulty: 'intermediate',
    topic: 'Zs test modes',
    reference: 'Module 7, Section 5 — Two modes, two trade-offs',
  },
  {
    id: 341,
    question:
      'Your measured Zs differs from Ze + R1 + R2 by 40 per cent. What does that indicate?',
    options: [
      'Normal variation — measured and calculated values commonly differ by this much',
      'A discrepancy worth investigating in either the dead-test or the live-test result',
      'That the 0.8 multiplier has not been applied to the calculated figure',
      'That the circuit has a parallel earth path, which is a compliant condition',
    ],
    correctAnswer: 1,
    explanation:
      'Agreement within about 10 to 20 per cent is expected; 40 per cent means one of the two results is wrong and you find out which before either goes on a certificate. The 0.8 multiplier is for comparing against a tabulated maximum, not for reconciling a measurement with a calculation. A parallel earth path is one possible explanation and it is something to identify rather than assume, because it can mask a defective CPC.',
    section: 'The sequence of tests and interpreting results',
    difficulty: 'advanced',
    topic: 'Cross-checking Zs',
    reference: 'Module 7, Section 5 — Reading the trend',
  },
  {
    id: 342,
    question:
      'Under the simplified RCD verification introduced in Amendment 2 (2022), what test is required for a general non-delay 30 mA device?',
    options: [
      'Tests at half rated current, rated current and five times rated current, on both half-cycles',
      'A single alternating-current test at the rated residual operating current, with a maximum of 300 ms',
      'A single test at five times rated current, with a maximum of 40 ms',
      'The integral test button only, with no instrument test',
    ],
    correctAnswer: 1,
    explanation:
      'A single a.c. test at 1 × IΔn, with 300 ms the maximum for a general non-delay device — alongside the integral test button, which is checked as well rather than instead. The multi-test sequence at half, one and five times rated current was the previous method and has been superseded, and the 40 ms figure belongs to the old five-times test.',
    section: 'The sequence of tests and interpreting results',
    difficulty: 'advanced',
    topic: 'RCD verification',
    reference: 'BS 7671 Regulation 643.7.3',
  },
  {
    id: 343,
    question:
      'A test fails part way through the sequence. What must be repeated after rectification?',
    options: [
      'That test only, since the earlier tests already passed',
      'That test, plus any preceding test the fault could have influenced',
      'The entire sequence from the beginning, on every circuit',
      'Nothing further, provided the rectification is recorded',
    ],
    correctAnswer: 1,
    explanation:
      'The failed test plus any earlier test the fault might have affected — because a fault found at insulation resistance may well have been sitting behind the continuity reading you already recorded. Repeating only the failed test leaves those earlier results unverified. Repeating everything on every circuit is disproportionate, and recording the rectification without re-testing certifies a result that was never taken.',
    section: 'The sequence of tests and interpreting results',
    difficulty: 'advanced',
    topic: 'Retesting after a failure',
    reference: 'BS 7671 Regulation 643.7.2',
  },
  {
    id: 344,
    question:
      'What is the difference between a result that passes and a result that is healthy?',
    options: [
      'There is none — passing the criterion is the definition of a healthy result',
      'A pass meets the BS 7671 minimum; a healthy result matches what a properly installed system of that type should produce',
      'A pass applies to dead tests; healthy applies to live tests',
      'A pass is recorded on the certificate; healthy is a judgement recorded in the comments',
    ],
    correctAnswer: 1,
    explanation:
      'The minimum is a floor. Comparing against both the BS 7671 limit and the value the cable, topology and supply data predict is what turns a set of readings into diagnosis — a borderline pass is a developing fault, and it is the baseline the next inspection is measured against. The distinction is not about which tests, and it is not a separate box on the form.',
    section: 'The sequence of tests and interpreting results',
    difficulty: 'intermediate',
    topic: 'Pass against healthy',
    reference: 'Module 7, Section 5 — Reading the trend',
  },
  {
    id: 345,
    question:
      'While carrying out an EICR you find a condition presenting immediate danger. What follows?',
    options: [
      'Record it as C1 and complete the report before raising it with the customer',
      'Immediate action regardless of the call-out scope — make safe, notify the customer in writing, escalate',
      'Record it as C2, since the installation is still energised and functioning',
      'Complete the inspection, then quote for the remedial work',
    ],
    correctAnswer: 1,
    explanation:
      'A C1 means danger is present now, so it is acted on immediately whatever you were called out to do: make safe, give the customer written notification and escalate to your supervisor. Finishing the report first leaves the danger live in the meantime. It is not a C2, which is potentially dangerous rather than presently so — and the fact that the installation is working says nothing about whether it is safe.',
    section: 'The sequence of tests and interpreting results',
    difficulty: 'intermediate',
    topic: 'Acting on a C1',
    reference: 'Module 7, Section 5 — Unsatisfactory results',
  },
  {
    id: 346,
    question:
      'On a TT installation, why is Zs not compared against the Table 41.3 figures?',
    options: [
      'Because Table 41.3 applies only to three-phase installations',
      'Because Ze is dominated by the electrode resistance and is far too high for overcurrent ADS — the RCD provides the protection',
      'Because the 0.8 multiplier cannot be applied to a TT measurement',
      'Because Zs is not measured on TT installations',
    ],
    correctAnswer: 1,
    explanation:
      'On TT, Ze is effectively the electrode resistance and is typically tens to hundreds of ohms, so no overcurrent device will operate in time — the RCD does the fault protection and Table 41.5 with Ra × IΔn ≤ 50 V is what applies. Table 41.3 is not limited to three-phase, the multiplier is not the issue, and Zs is still measured — it is simply compared against a different criterion.',
    section: 'The sequence of tests and interpreting results',
    difficulty: 'advanced',
    topic: 'Zs on TT systems',
    reference: 'BS 7671 Table 41.5 · Regulation 411.5.3',
  },
  {
    id: 347,
    question:
      'What hazard does Guidance Note 3 highlight during earth fault loop impedance testing?',
    options: [
      'That the test current can damage electronic equipment connected to the circuit',
      'That the test briefly raises exposed-conductive-parts above true earth, creating a touch voltage',
      'That the instrument may trip upstream protective devices without warning',
      'That the reading is invalid if any load is connected during the test',
    ],
    correctAnswer: 1,
    explanation:
      'The test current through the CPC resistance briefly lifts exposed-conductive-parts above earth potential — which is why access has to be managed in commercial and public installations while testing is in progress. Nuisance tripping is a real nuisance rather than the hazard, connected loads do not invalidate the reading in that way, and equipment damage is not the concern GN3 raises here.',
    section: 'The sequence of tests and interpreting results',
    difficulty: 'advanced',
    topic: 'Touch voltage during testing',
    reference: 'IET Guidance Note 3',
  },

  // ── Section 6 · Recording results, commissioning and handover ───────────
  {
    id: 348,
    question:
      'How should an RCD test result be recorded on the Schedule of Test Results?',
    options: [
      'As "Pass", since that is the outcome that matters',
      'As the measured value — for example 28 ms',
      'As "Within limits", with the limit stated in the comments',
      'As the rated residual operating current of the device',
    ],
    correctAnswer: 1,
    explanation:
      'Record measured values, not verdicts: the next inspector needs something to compare against, and a device drifting from 28 ms to 180 ms over two inspection cycles is a finding that "Pass" would have hidden both times. Stating the limit rather than the reading has the same problem, and the device’s rated current is a property of the device rather than a test result.',
    section: 'Recording results, commissioning and handover',
    difficulty: 'intermediate',
    topic: 'Recording measured values',
    reference: 'BS 7671 Regulation 644.3',
  },
  {
    id: 349,
    question:
      'A required field on the Schedule of Test Results does not apply to the circuit. What goes in it?',
    options: [
      'A dash, to show it has been considered',
      'It is left blank, since nothing applies',
      '"N/A", or "not tested" with a reason where a test was not carried out',
      'The value from the nearest comparable circuit',
    ],
    correctAnswer: 2,
    explanation:
      'Never leave a required field blank — a blank is indistinguishable from an oversight. N/A where the test genuinely does not apply, or "not tested" with the reason where it applies but was not carried out. A dash is ambiguous, and copying a value from another circuit records a measurement that was never taken, which is a false record.',
    section: 'Recording results, commissioning and handover',
    difficulty: 'intermediate',
    topic: 'Completing the schedule',
    reference: 'BS 7671 Regulation 644.3',
  },
  {
    id: 350,
    question:
      'When should the test results be written down?',
    options: [
      'At the instrument, against the circuit they belong to',
      'At the end of each circuit, from the instrument’s stored results',
      'At the end of the day, while the job is still fresh',
      'At the office, transcribed from the instrument download',
    ],
    correctAnswer: 0,
    explanation:
      'At the instrument, against the circuit — a schedule written up later is reconstruction, and it shows. Even the instrument’s own stored results can be attributed to the wrong circuit once you are away from the board. Writing up at the end of the day or back at the office compounds that, and a transposed digit at that point looks entirely plausible to everyone who reads it afterwards.',
    section: 'Recording results, commissioning and handover',
    difficulty: 'basic',
    topic: 'When results are recorded',
    reference: 'Module 7, Section 6 — The record is made at the instrument',
  },
  {
    id: 351,
    question:
      'A defect is revealed during the inspection and testing of a new installation. What does Regulation 644.1.1 require?',
    options: [
      'That it is recorded in the comments and brought to the duty holder’s attention',
      'That it is corrected before the certificate is issued',
      'That it is recorded as a departure with the reasoning stated',
      'That it is corrected within 30 days of the certificate being issued',
    ],
    correctAnswer: 1,
    explanation:
      'On a new installation, defects and omissions found during inspection and testing are corrected before the certificate is issued — fix, re-test, then certify. A note in the comments is not a substitute for a repair, a departure documents a deliberate and justified divergence rather than a fault, and there is no grace period. On an addition or alteration the position differs: defects affecting the safety of the new work must be corrected, and pre-existing defects elsewhere are recorded as observations.',
    section: 'Recording results, commissioning and handover',
    difficulty: 'advanced',
    topic: 'Defects before certification',
    reference: 'BS 7671 Regulation 644.1.1',
  },
  {
    id: 352,
    question:
      'You add one new circuit to an existing installation. Which certificate applies?',
    options: [
      'A Minor Electrical Installation Works Certificate, since only one circuit is involved',
      'An Electrical Installation Certificate, with both schedules',
      'An Electrical Installation Condition Report covering the affected board',
      'Either, depending on whether the work is notifiable under Part P',
    ],
    correctAnswer: 1,
    explanation:
      'Any new circuit, however small, triggers an EIC with a Schedule of Inspections and a Schedule of Test Results. The Minor Works Certificate is reserved for work on existing circuits with no new circuit added. An EICR is for periodic inspection of an existing installation, and whether the work is notifiable under the Building Regulations is a separate question from which BS 7671 form applies.',
    section: 'Recording results, commissioning and handover',
    difficulty: 'intermediate',
    topic: 'Choosing the certificate',
    reference: 'BS 7671 Section 644',
  },
  {
    id: 353,
    question:
      'How many separate declarations does an Electrical Installation Certificate carry, and what do they cover?',
    options: [
      'Two — construction and inspection and testing',
      'Three — design, construction, and inspection and testing',
      'One — overall compliance with BS 7671',
      'Four — design, construction, inspection and testing, and handover',
    ],
    correctAnswer: 1,
    explanation:
      'Three, each a separate declaration of personal responsibility. On a small job one competent person may sign all three, and they remain three distinct declarations rather than merging into one. Omitting the design declaration loses the accountability for the design decisions, and handover is not a declaration on the certificate.',
    section: 'Recording results, commissioning and handover',
    difficulty: 'intermediate',
    topic: 'The EIC declarations',
    reference: 'BS 7671 Section 644',
  },
  {
    id: 354,
    question:
      'For Part P notifiable work in England, within what period must a competent person scheme registration be made?',
    options: [
      '7 days',
      '14 days',
      '30 days',
      '90 days',
    ],
    correctAnswer: 2,
    explanation:
      '30 days, after which the scheme notifies Building Control and the Building Control Compliance Certificate is posted to the customer, typically two to six weeks later. The shorter periods are tighter than the window actually is, and 90 days is well beyond it — missing the window is a scheme compliance issue and leaves the customer without the certificate they will need when they sell the property.',
    section: 'Recording results, commissioning and handover',
    difficulty: 'advanced',
    topic: 'Scheme notification',
    reference: 'Building Regulations Approved Document P',
  },
  {
    id: 355,
    question:
      'What does a proper customer walk-through at handover cover?',
    options: [
      'The certificate and the schedules, explained line by line',
      'Board and isolator location, the test-button routine, circuit labels, anything new, the next inspection date and the contact route',
      'The test results, with an explanation of what each measurement means',
      'The warranty terms and the procedure for reporting a fault',
    ],
    correctAnswer: 1,
    explanation:
      'The walk-through is about what the occupant has to be able to do: find the board and the isolator, work the test button, read the labels, operate anything new, know when the next inspection is due and know who to ring. Explaining the certificate and the test results line by line answers a question the customer did not ask — the documentation is handed over as well, and it is a different deliverable. Warranty and fault reporting are part of the contact route rather than the whole of it.',
    section: 'Recording results, commissioning and handover',
    difficulty: 'intermediate',
    topic: 'The handover walk-through',
    reference: 'Module 7, Section 6 — Handover',
  },
];

export const MODULE_7_QUESTIONS = bank('Inspection & testing', QUESTIONS);
