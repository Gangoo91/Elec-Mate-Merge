/**
 * Ported from the English course, combining:
 *   level2/module1/section4/Sub2.tsx
 *   level2/module4/section2/Sub2.tsx
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

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks = [
  {
    id: 'glove-class-check',
    question:
      'You’re working on a 230 V single-phase domestic CU. The tails could go live if the meter’s reconnected. Which IEC 60903 glove class is the minimum?',
    options: [
      'Standard work gloves are fine',
      'Class 00 — 500 V AC',
      'Class 0 — 1000 V AC',
      'Class 2 — 17 000 V AC',
    ],
    correctIndex: 2,
    explanation:
      'Class 0 = 1000 V AC max use voltage, comfortably above 230 V. Class 00 (500 V AC) would also exceed 230 V but Class 0 is the standard call for any LV work — it’s the de facto industry minimum for electricians. Class 2 is HV-only — overkill, and stiffer to work with.',
  },
  {
    id: 'insulated-tools-check',
    question: 'A screwdriver marked "VDE 1000V" with the BS EN 60900 logo — what does that mean?',
    options: [
      'Power exchanged between source and reactive components',
      'Tested at 10 000 V AC, certified for use up to 1000 V AC live working',
      'Emergency duration, type, battery test information and location',
      'No fixed maximum, but must be appropriate for the application',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 60900 tools are FACTORY-tested at 10 000 V AC and rated for live use up to 1000 V AC / 1500 V DC. The double triangle / "1000 V" mark is what to look for. Anything not BS EN 60900 marked is NOT live-rated, even if it has a plastic handle.',
  },
  {
    id: 'arc-flash-rating-check',
    question:
      'Your RAMS calls for arc-rated kit at "8 cal/cm² minimum". What does that number actually mean?',
    options: [
      'The maximum voltage the fabric is insulated against',
      'The number of layers of flame-resistant material in the garment',
      'The temperature in degrees Celsius the fabric can survive',
      'The incident energy the fabric is tested to withstand without breaking open / igniting',
    ],
    correctIndex: 3,
    explanation:
      'Arc Thermal Performance Value (ATPV) — measured in cal/cm². It’s the incident heat energy the fabric will resist before second-degree burn becomes likely on skin underneath. 8 cal/cm² is a common ‘Category 2’ specification for LV switchroom work; HV may need 25 or 40 cal/cm². The arc flash hazard analysis in the RAMS sets the number.',
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions = [
  {
    id: 1,
    question: 'Which standard covers electrically insulated gloves?',
    options: [
      'BS EN 388 (cut resistance)',
      'IEC 60903 / BS EN 60903',
      'BS EN 397 (helmets)',
      'BS EN 166 (eye protection)',
    ],
    correctAnswer: 1,
    explanation:
      'IEC 60903 (published in the UK as BS EN 60903) is the dedicated standard for insulating gloves. Six classes: 00, 0, 1, 2, 3, 4 — covering 500 V to 36 000 V AC. Anything else with "insulated" written on it but no IEC 60903 mark is NOT certified electrical PPE.',
  },
  {
    id: 2,
    question: 'IEC 60903 Class 0 gloves are rated for what maximum AC use voltage?',
    options: ['7500 V', '230 V', '1000 V', '500 V'],
    correctAnswer: 2,
    explanation:
      'Class 0 = 1000 V AC max use voltage (1500 V DC). Each glove is also tested at 5000 V AC during manufacture. Class 00 = 500 V AC, Class 1 = 7500 V AC, Class 2 = 17 000 V AC, Class 3 = 26 500 V AC, Class 4 = 36 000 V AC.',
  },
  {
    id: 3,
    question: 'How often must IEC 60903 insulating gloves be re-tested in service?',
    options: [
      'To verify the RCD trips within the required time',
      'Investigate the connection and clean/retighten as necessary',
      'To identify variations in impedance along the circuit',
      'Every 6 months (and inspected before EVERY use)',
    ],
    correctAnswer: 3,
    explanation:
      'Periodic dielectric test every 6 months is standard practice (per IEC 60903 + UK industry guidance). Plus a VISUAL + AIR-INFLATION check before each use — roll the cuff to trap air and look for leaks. Test date is marked on the cuff. Past it = bin it.',
  },
  {
    id: 4,
    question:
      'A BS EN 60900 insulated screwdriver carries the "double triangle / 1000 V" mark. The maximum live-working voltage is:',
    options: [
      '1000 V AC and 1500 V DC',
      '500 V AC',
      '10 000 V AC',
      'Any voltage if you have insulating gloves on too',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 60900: factory tested at 10 000 V AC, rated for live use at 1000 V AC / 1500 V DC. That covers all LV (up to 1000 V AC). For HV you’d need different kit entirely. Wearing gloves doesn’t extend the rating of the tool.',
  },
  {
    id: 5,
    question: 'What does "Category 2 / 8 cal/cm²" describe in arc-flash PPE?',
    options: [
      'The voltage class of the insulating gloves to be worn',
      'The minimum incident energy rating of the fabric (ATPV ≥ 8 cal/cm²)',
      'The number of arc-flash incidents the garment has survived',
      'The maximum fault current the switchboard can deliver',
    ],
    correctAnswer: 1,
    explanation:
      'Arc Thermal Performance Value (ATPV) ≥ 8 cal/cm² means the fabric is tested to withstand 8 calories per square centimetre of incident heat energy without breaking open. NFPA 70E PPE Category 2 is a common LV switchroom specification. The actual number needed comes from an arc-flash hazard analysis on the specific kit.',
  },
  {
    id: 6,
    question: 'What is the minimum safety footwear standard for general electrical site work?',
    options: [
      'EN 50321-1 dielectric footwear for all general site work',
      'BS EN 166 — the same standard as eye protection',
      'EN ISO 20345 SB (basic safety footwear with toe protection)',
      'IEC 60903 — the insulating glove standard applied to boots',
    ],
    correctAnswer: 2,
    explanation:
      'EN ISO 20345 is THE safety footwear standard. The lowest grade SB has a 200 J impact-resistant toe-cap. S1, S2, S3 add features (S3 = penetration-resistant midsole, water-resistant, antistatic). For dedicated electrical isolation work — see EN 50321-1 dielectric footwear — that’s a separate specialist standard for live work, NOT general site wear.',
  },
  {
    id: 7,
    question: 'Which eye protection standard applies to safety glasses on an electrician’s site?',
    options: ['BS 7671', 'IEC 60903', 'EN ISO 20345', 'BS EN 166'],
    correctAnswer: 3,
    explanation:
      'BS EN 166 is the eye protection standard. Look for "F" (low-energy impact, basic safety glasses) for general site, or higher impact ratings (B = medium, A = high) for grinding / power tool work. Also includes 2C-1.2 etc for UV / IR / glare from arc work.',
  },
  {
    id: 8,
    question:
      'You inflate the cuff of your IEC 60903 glove and feel a slow hiss of escaping air on the back of the index finger. What do you do?',
    options: [
      'Bin it and get a new pair — it’s failed the in-use check',
      'Tape over the leak and carry on for the rest of the day',
      'Use it anyway — 230 V is low enough for a small leak',
      'Wear it under a leather over-glove to seal the hole',
    ],
    correctAnswer: 0,
    explanation:
      'A leak = pinhole = the dielectric protection has failed. Tape doesn’t restore the rating. Even on "low" voltage 230 V, a pinhole can be the path that drives a fatal current through your hand. Out of service immediately. Report it. Get the dated replacement and the failure logged.',
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question: 'Why are insulated gloves so expensive when standard work gloves are a fiver?',
    answer:
      'Because each pair has been factory-tested under high voltage to prove the rubber holds out a specific voltage with no breakdown. Class 0 gloves are tested at 5 000 V AC and certified for use to 1 000 V AC. They’re also re-tested every 6 months in service. You’re paying for the test record, not just the rubber. Cheap unmarked gloves haven’t had any of that done.',
  },
  {
    question: 'Do I wear insulated gloves on top of leather gloves, or instead?',
    answer:
      'On site you’ll often wear them WITH leather over-gloves — the leather protects the rubber from cuts and abrasion (rubber gloves are surprisingly easy to puncture). Some manufacturers sell matched sets. The dielectric rating sits in the rubber underneath; the leather is just there to keep the rubber alive longer. Never the other way round — leather alone is no electrical protection.',
  },
  {
    question: 'My screwdriver has a plastic handle — that means it’s insulated, right?',
    answer:
      'No. A plastic handle just means it’s comfortable to hold. ‘Insulated for live work’ means BS EN 60900 — factory tested at 10 000 V AC, rated for 1 000 V AC live use, marked with the double-triangle ‘1000 V’ symbol. If those marks aren’t on the tool, treat it as un-insulated. For any LV live work, you need the BS EN 60900 set.',
  },
  {
    question: 'What’s the difference between an arc rating and a voltage rating?',
    answer:
      'Different hazards. Voltage rating (insulating gloves, BS EN 60900 tools) protects you against shock — current passing through your body. Arc rating (BS EN 61482 clothing, face shields) protects against the FLASH — radiated heat and pressure wave from an arc fault. You can need both at the same time: gloves to stop the shock, arc kit to stop the flash burning you. Each is rated separately.',
  },
  {
    question: 'Do I need a hard hat for normal domestic rewires?',
    answer:
      'Depends on the job. EN 397 helmets are needed where there’s a real risk of falling objects — construction sites, roof spaces, working under scaffold. For a settled domestic install with no overhead risk, your supervisor might issue a bump cap (EN 812) instead — lighter, just there to stop you cracking your head on a joist. The RAMS makes the call.',
  },
  {
    question: 'What about hi-vis on a domestic job — really?',
    answer:
      'Often not needed inside a house, but the moment you’re unloading the van on a road, walking on a building site, or near anything with moving plant — yes. EN ISO 20471 Class 1 (vest), Class 2 (mid), Class 3 (full sleeve) depending on the speed of nearby traffic. Class 3 is the norm on highways and construction. Pop it on the moment you leave the customer’s living room.',
  },
];

/* ── Inline checks2 ────────────────────────────────────────────────── */

const checks2 = [
  {
    id: 'mod4-s2-sub2-hierarchy',
    question: "Why is PPE described as the LAST line of defence in the HSE's hierarchy of control?",
    options: [
      'Because PPE is the most expensive control to provide, so cheaper measures must always be tried before any budget is spent on it.',
      'Because PPE takes the longest to fit and inspect, so it sits last in the order even though it gives the strongest protection.',
      "Because it protects only the wearer, depends on individual behaviour and doesn't reduce the hazard, so higher controls take priority.",
      'Because PPE is only legally required once an incident has occurred, the controls above it being the preventive measures.',
    ],
    correctIndex: 2,
    explanation:
      "The hierarchy is set out in Schedule 1 of MHSWR 1999 — eliminate, substitute, engineering controls (e.g. dust extraction), admin controls (e.g. work rotation), then PPE. Elimination, substitution, engineering and admin controls all rank above PPE because they reduce the risk for everyone in the area without depending on individual behaviour. PPE Regulations 1992 (as amended 2022) Reg 4 reinforces this — the employer must provide suitable PPE EXCEPT where and to the extent that the risk has been adequately controlled by other means which are equally or more effective. PPE is what's left when you've exhausted the other controls.",
  },
  {
    id: 'mod4-s2-sub2-chasing',
    question:
      "You're about to start chasing a vertical channel into a sand-and-cement plastered wall to drop a 2.5 mm² T&E to a new socket. Walk-round done. What's the minimum PPE before you switch the chaser on?",
    options: [
      'FFP3 mask, impact-rated eye protection, hearing protection, cut-resistant gloves, plus on-tool Class M dust extraction.',
      "FFP1 nuisance mask and safety glasses only — soft plaster makes coarse dust, so gloves and ear defenders aren't needed.",
      'Safety glasses and cut-resistant gloves only — debris and the chaser wheel are the priority, and a short chase makes little dust.',
      'P3 half-mask and ear defenders only — respiratory and noise dominate, and the chaser guard deflects debris from the eyes.',
    ],
    correctIndex: 0,
    explanation:
      'Respirable crystalline silica is an HSE priority and the workplace exposure limit is being kept under review. Chasing brick or sand-and-cement plaster generates fine silica dust that causes silicosis, COPD and lung cancer — FFP3 is the bare minimum and on-tool extraction (Class M for masonry dust) should be in place where reasonably practicable. Eye protection should be impact-rated (Z87 / EN 166 F or higher) and chasers run at 95-105 dB, so hearing protection is required. The combination of dust + noise + impact debris is why chasing has the heaviest PPE load of any common electrician task short of live work.',
  },
  {
    id: 'mod4-s2-sub2-fit',
    question:
      'Your colleague has a beard and is wearing a disposable FFP3 mask while chasing. Why is that a serious problem?',
    options: [
      'A beard makes the mask uncomfortable, so the wearer tends to loosen the straps and the protection is lost through fiddling rather than the seal.',
      'Facial hair traps dust against the skin inside the mask, so the beard becomes a secondary exposure route after the mask comes off.',
      'Disposable masks rely on a tight face seal; facial hair in the seal area lets a large fraction of inhaled air bypass the filter, so the rated protection is lost.',
      'A beard increases breathing resistance, so the wearer draws harder and forces fine particles straight through the filter material itself.',
    ],
    correctIndex: 2,
    explanation:
      "RPE fit-testing under INDG479 is mandatory for tight-fitting masks (HSG53 puts the duty on the employer). A bearded worker cannot pass a face-fit test on a disposable FFP3 — there is no fix short of shaving or switching to a PAPR. Allowing a bearded worker to use a disposable mask is a breach of the COSHH Regulations 2002 Reg 7 (control of exposure) AND of PPE Regs 1992 Reg 4 (suitable PPE) because the PPE is not suitable for the user. It also voids the manufacturer's stated protection rating.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions2 = [
  {
    id: 1,
    question: "What does 'the hierarchy of control' refer to in the context of selecting PPE?",
    options: [
      'The order in which PPE items are put on and taken off — head first, then eye, respiratory and hand protection, removed in reverse to avoid being partly unprotected.',
      'The order in which risks must be controlled — eliminate, substitute, engineering controls, administrative controls, then PPE last because it only protects the wearer.',
      'The ranking of PPE by protection class — Category I for minimal risk up to Category III for serious risk — used to decide the grade of equipment a task needs.',
      'The chain of responsibility for issuing PPE on site — principal contractor, employer, supervisor, then operative — setting out who provides and checks2 each item.',
    ],
    correctAnswer: 1,
    explanation:
      "The hierarchy is in Schedule 1 of MHSWR 1999 (the 'principles of prevention'). PPE is at the bottom of the list deliberately — it's the control with the highest residual risk because it depends on the operative remembering, fitting and inspecting it correctly. Reaching for PPE before considering the controls above it in the hierarchy is one of the most common audit findings.",
  },
  {
    id: 2,
    question:
      'Under the Personal Protective Equipment at Work Regulations 1992 (as amended 2022) Reg 4, when must an employer provide PPE?',
    options: [
      'Only when the worker specifically requests PPE in writing — the duty is triggered by the employee identifying a need and the employer then supplying it.',
      'Whenever a worker is on a construction site, regardless of the task — site PPE must be provided to everyone on site as a blanket requirement.',
      'When the worker may be exposed to a risk at work, except where that risk is already adequately controlled by other equally or more effective means.',
      'Only after a risk assessment has found a residual risk and the worker has completed formal PPE training — both conditions must be met first.',
    ],
    correctAnswer: 2,
    explanation:
      "The 2022 amendment (in force 6 April 2022) extended the regulations to cover limb (b) workers — broadly anyone who personally performs work for the employer and isn't a client of theirs. Before the amendment only employees in the strict sense were covered. The substantive PPE duty (Reg 4) still has the same wording — provide suitable PPE unless the risk is controlled by other means.",
  },
  {
    id: 3,
    question:
      "Which PPE category covers most electrical-installer hand protection — and what's the key consideration when choosing the right glove?",
    options: [
      'Category I — minimal risk, covering all general work gloves, because hand injuries on an installation are treated as low-consequence and any CE-marked glove will do.',
      'Category III — complex risk, covering every glove an installer wears, because hand protection on electrical work is always classed against a serious hazard.',
      'There is no category system for gloves — selection is by EN 388 cut level alone, so you simply pick the highest cut rating for every task to be safe.',
      'Category II — intermediate risk, with the key being to match the EN 388 cut/abrasion rating to the task rather than over- or under-arming the hand.',
    ],
    correctAnswer: 3,
    explanation:
      'PPE is grouped into three categories under the EU/UK regulations: Category I (minimal risk — sun, gardening), Category II (intermediate — most general work PPE), Category III (complex / serious risk — voltage-rated gloves, fall arrest, RPE protecting against gases). EN 388 is the cut/abrasion standard; the marking on the glove tells you the resistance levels. Picking by EN rating against the task is what makes the choice defensible.',
  },
  {
    id: 4,
    question:
      'When are voltage-rated insulating gloves (Class 0, Class 1, Class 2 etc.) actually required?',
    options: [
      'Only for work on or near LIVE conductors that has been specifically authorised under EAWR 1989 Reg 14 — not for the dead working that is the default after safe isolation.',
      'Whenever you work inside a consumer unit, even after isolation, because residual charge in capacitors and SPDs can still give a shock until the unit is discharged.',
      'On every electrical installation task as standard PPE, because any work on a wiring system carries a shock risk and Class 0 gloves are part of the baseline kit.',
      'During safe isolation only, for the proving and locking-off steps, because testing for dead is the moment of greatest shock risk and the gloves come off after.',
    ],
    correctAnswer: 0,
    explanation:
      "EAWR 1989 Reg 14 makes live work the exception, not the rule. Voltage-rated gloves are PPE for live work — Class 0 to 4 referenced to the system voltage they're rated against. Most installation work is done dead following safe isolation, in which case the relevant gloves are mechanical-protection (cut/abrasion) gloves, not insulating gloves. Wearing voltage-rated gloves on dead work isn't dangerous, but it isn't required and they wear out faster on rough work.",
  },
  {
    id: 5,
    question:
      "You're about to use a 110V chop saw to cut a length of galvanised steel cable tray. The walk-round is done. What PPE combination is required for this single task?",
    options: [
      'Eye protection and cut-resistant gloves only — a 110V chop saw is contained and guarded, so the spark and sharp edge are the only real hazards for a single cut.',
      'Impact-rated eye protection, hearing protection, cut-resistant gloves, RPE if cutting galvanised steel indoors (zinc oxide fume), and sturdy boots with long sleeves for the sparks.',
      'A full-face arc-flash visor, voltage-rated insulating gloves and arc-rated clothing — cutting metalwork near a board demands the same kit as live electrical work.',
      'Hearing protection and an FFP3 mask only — the noise and fine metal dust dominate, so the spark and cut edge do not warrant eye protection or gloves for a quick cut.',
    ],
    correctAnswer: 1,
    explanation:
      "Chop sawing tray is a multi-hazard task — debris + noise + sharp edges + zinc oxide fume (galvanised). Each hazard demands its own PPE. The fume risk is often missed because the operative is focused on the spark and noise. Cutting galvanised steel indoors without extraction or RPE has been linked to metal-fume fever (the 'zinc shakes') and chronic respiratory problems. Doing this work outdoors or with local exhaust ventilation (engineering control) is the better option above PPE.",
  },
  {
    id: 6,
    question:
      'An apprentice arrives on site without their hi-vis vest because they forgot it in the van. The site rule says hi-vis is mandatory. What should they do?',
    options: [
      'Work in the area furthest from plant and vehicles, since keeping clear of the traffic routes means the missing vest is not a real risk for that part of the job.',
      'Borrow any fluorescent jacket from another trade and carry on, since any high-visibility garment satisfies the rule and avoids a wasted trip to the van.',
      'Stop and either fetch the vest, borrow a site-office spare, or step off site until equipped — working without required PPE breaches HASAWA s.7 and CDM 2015 Reg 15.',
      'Sign in, note on the induction sheet that the vest is in the van, and fetch it at the next break, since recording the omission honestly discharges the duty.',
    ],
    correctAnswer: 2,
    explanation:
      "Hi-vis on a construction site is administrative + PPE — it makes the wearer visible to plant operators and other trades. Skipping it is a textbook s.7 breach. The fix is procedural — fetch, borrow or step off — not 'work around it'. Small breaches like this are how a firm's safety culture either holds up or falls apart, and inspectors specifically look for them on routine site visits.",
  },
  {
    id: 7,
    question:
      'Why does the PPE Regulations require employees to inspect their PPE before each use, and what should they do if they find damage?',
    options: [
      'Because PPE is consumable and the inspection is really a stock-check for reordering — damaged kit can be used until the replacement arrives.',
      "Because insurers require a daily inspection log for employer's liability cover — a defective item can still be worn if the defect is recorded.",
      'Because PPE must be portable-appliance tested before each shift — the pre-use check is the visual part of that PAT regime.',
      "Because damaged PPE doesn't give the rated protection — Reg 10 requires the employee to report defects, and the item must be taken out of service.",
    ],
    correctAnswer: 3,
    explanation:
      "PPE Regs Reg 7 places the maintenance and replacement duty on the employer; Reg 10 places the duty on the employee to use PPE per training and report any loss of, or obvious defect in, it. A cracked lens, a broken mask strap or peeling hi-vis tape all mean the rated protection is lost, so the item is taken out of service and replaced before use. The employee inspection is the day-to-day check; the employer's wider regime covers cleaning, replacement schedules and storage. Continuing to use damaged PPE breaches both regs and any post-incident investigation will use the damaged item as direct evidence of breach.",
  },
  {
    id: 8,
    question:
      'Hot work — using a gas torch to make a soldered joint on a copper bonding tail to a water pipe. What PPE and additional controls do you need beyond the standard install kit?',
    options: [
      'Heat-resistant leather gloves, thermal-rated eye protection, natural-fibre long sleeves, a fire blanket or extinguisher within reach, combustibles cleared, plus a hot-works permit.',
      'Voltage-rated insulating gloves and an arc-flash visor — the torch flame and bonding tail are electrically connected, so the soldering carries a shock and arc risk.',
      'An FFP3 respirator and on-tool dust extraction — the dominant added hazard is fine particulate from the flux and heated copper, so the extra controls are respiratory.',
      'Cryogenic gloves and a cold-burn face shield — soldering rapidly cools the joint, so the added risk is contact with chilled metalwork as it sets.',
    ],
    correctAnswer: 0,
    explanation:
      'Hot work has its own controls because the consequence (fire) extends well beyond the moment of the work — a smouldering ember can ignite hours later. PPE is layered with admin controls (hot-works permit, fire watch for 30-60 minutes after work ceases) and engineering controls (clearance of combustibles, fire blanket on the substrate). On modern installs the soldered earth bond is being replaced by clamp-on connections precisely to design out the hot-work risk.',
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs2 = [
  {
    question: 'Do I have to pay for my own PPE?',
    answer:
      "No. PPE Regs Reg 4 places the duty on the employer to PROVIDE suitable PPE — and Reg 9(3) explicitly prohibits the employer from charging for PPE that is provided to comply with the regulations. Specialist branded items beyond the regulatory minimum (premium-brand boots, designer shades) are a different conversation, but the working PPE you need to do the job safely is the employer's cost.",
  },
  {
    question: "If I'm a self-employed sub-contractor on a site, who provides my PPE?",
    answer:
      'You do — for your own. The 2022 amendment to the PPE Regulations extended the employer-provision duty to limb (b) workers, but a self-employed person who runs their own business is responsible for their own PPE. On a CDM site the principal contractor may impose site-specific PPE requirements (e.g. high-vis, helmet, glasses), and you have to meet those at your own cost.',
  },
  {
    question: 'How often does PPE need to be replaced?',
    answer:
      'PPE Regs Reg 7 requires the employer to maintain PPE in good repair and efficient working order, including replacement when needed. There is no fixed schedule — it depends on the item and the use. Disposable masks: single-shift typically. Safety glasses: when scratched or damaged. Helmets: per manufacturer (often 3-5 years from manufacture date stamped inside, replaced sooner if struck). Boots: when sole worn, toe cap exposed or upper damaged. The pre-use inspection is what catches the right moment.',
  },
  {
    question: 'Why does the rated protection on a mask depend on me being clean-shaven?',
    answer:
      "Tight-fitting RPE relies on a face seal. Stubble or beard in the seal area allows leakage past the filter — the air bypasses the protection. INDG479 (HSE guidance on RPE fit testing) and HSG53 are explicit that bearded workers cannot use disposable FFP1/2/3 masks or any other tight-fitting mask. The alternative is a powered air-purifying respirator (PAPR) with a loose-fitting hood, which doesn't rely on a face seal.",
  },
  {
    question: "What's the difference between EN 388 cut levels A-F and the older 1-5 scale?",
    answer:
      "The 1-5 scale (EN 388:2003) used a coup test that gave inconsistent results for high-cut materials. The A-F scale (EN 388:2016, ISO 13997) uses the TDM-100 test, which applies a known force to a sharp blade and measures the distance to cut-through. The two scales aren't directly equivalent — a glove can carry both ratings during the transition period. For electrical-installer cut hazards (cable, tray edges, snips) levels B-D on the new scale cover most general work; level E-F is for heavy steel handling.",
  },
  {
    question: 'Is a hi-vis vest PPE in the formal sense?',
    answer:
      'Yes — it falls under PPE Regs as it protects the wearer from a risk (being struck by a vehicle or plant by not being seen). It also has its own product standards (EN ISO 20471 for high-visibility clothing, with classes 1-3 by amount of reflective and fluorescent material). On a construction site Class 2 is typical for daytime, Class 3 for night work or roadside work. The colour (yellow or orange) is dictated by visibility against the working background — both are acceptable under EN ISO 20471.',
  },
];

export default function Lesson303_10_2() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        The specific PPE for electricians. Ratings, standards, what they actually protect against
        — and the kit you should expect to be holding before you go anywhere near a live
        conductor.
      </p>

      <TLDR
        points={[
          'Insulated gloves = IEC 60903 / BS EN 60903. Class 0 (1000 V AC) is the standard call for LV work. Visual + air-leak check EVERY use, dielectric re-test EVERY 6 months.',
          'Insulated hand tools = BS EN 60900. Factory-tested at 10 kV, rated for live use to 1000 V AC / 1500 V DC. Look for the double-triangle ‘1000 V’ mark.',
          'Arc-rated kit = BS EN 61482, measured in cal/cm². 8 cal/cm² is a common LV minimum — the actual number comes from an arc-flash hazard study in the RAMS.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'List the appropriate PPE for typical electrical tasks (cap-off, CU change, fault-finding, panel work).',
          'Identify and explain insulated glove classes under IEC 60903 (Class 00–4 voltage ratings).',
          'Identify BS EN 60900 insulated hand tools and explain the 1000 V AC live-working rating.',
          'Explain arc-flash PPE under BS EN 61482 — the cal/cm² rating and where it comes from.',
          'Specify eye, head, foot and hi-vis PPE to the right BS EN standard for the site.',
          'Carry out a pre-use visual + air-leak check on insulating gloves and recognise when to take them out of service.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The shock-protection layer</ContentEyebrow>

      <ConceptBlock
        title="Insulating gloves — IEC 60903 / BS EN 60903"
        plainEnglish="Rubber gloves engineered to stop current crossing into your hand. Each pair is voltage-tested in the factory and re-tested every six months in service. Cheap import knockoffs are NOT the same product."
        onSite="In your tool bag: a labelled pair of Class 0 gloves, leather over-gloves to stop them getting cut, and the test certificate or test-date stamp visible. Without all three, you can’t prove they’re fit for use."
      >
        <p>
          IEC 60903 is the international standard for live-working insulating gloves; BS EN 60903
          is the UK adoption. It defines six classes by maximum AC use voltage:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Class 00</strong> — max use 500 V AC (750 V DC). Light, dexterous. Sometimes
            used for ELV / control work.
          </li>
          <li>
            <strong>Class 0</strong> — max use 1000 V AC (1500 V DC). The standard electrician
            glove for LV (up to 1000 V AC) — covers all 230 V single-phase and 400 V three-phase
            work.
          </li>
          <li>
            <strong>Class 1</strong> — max use 7500 V AC. HV distribution.
          </li>
          <li>
            <strong>Class 2</strong> — max use 17 000 V AC.
          </li>
          <li>
            <strong>Class 3</strong> — max use 26 500 V AC.
          </li>
          <li>
            <strong>Class 4</strong> — max use 36 000 V AC. Heaviest, least dexterous.
          </li>
        </ul>
        <p>
          Each class also has a TYPE designation (Type A, B, C, H, R, Z) covering resistance to
          acid, oil, ozone, etc. Most general-purpose electrician gloves are Type R (acid + oil +
          ozone resistant) or Type Z (ozone-only).
        </p>
        <p>
          <strong>The glove markings to look for:</strong> the IEC 60903 reference, the class
          number, the type letter, max use voltage, manufacturer, batch number, date of
          manufacture, and the in-service test date. Anything missing = not certified electrical
          PPE.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Pre-use checks — every single time"
        onSite="30 seconds at the van. Take the gloves out, look them over, roll the cuff to inflate them like balloons, listen and feel for leaks, then put on the leather over-gloves. If anything’s off — bin them and get the spares."
      >
        <p>
          IEC 60903 + UK industry practice (notably ENA TS-29 for utilities) requires two routine
          checks:
        </p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Visual inspection BEFORE EACH USE</strong> — look at the whole glove, inside
            and out. Cuts, abrasion, embedded debris, swelling, discolouration, hardening, sticky
            patches, ozone cracks. Any defect = out of service.
          </li>
          <li>
            <strong>Air-inflation test BEFORE EACH USE</strong> — roll the cuff towards the
            fingers to trap air inside, then squeeze gently. Listen for hissing. Watch for slow
            deflation. Hold near your cheek to feel any leak. A pinhole you can’t see by eye will
            show up here.
          </li>
          <li>
            <strong>Periodic dielectric re-test EVERY 6 MONTHS</strong> — done by an accredited
            test house. Each glove is filled with water and a high-voltage test applied between
            the inside and outside. Pass = next test date stamped on the cuff. Past test date =
            take out of service until re-tested.
          </li>
        </ol>
      </ConceptBlock>

      <RegsCallout
        source="IEC 60903:2014 / BS EN 60903:2003+A2:2015 — Insulating Gloves (paraphrased)"
        clause="Class 0 gloves shall withstand a proof voltage test of 5 000 V AC and shall be marked with a maximum use voltage of 1 000 V AC. Periodic electrical retesting at intervals not exceeding six months is recommended for gloves in service."
        meaning={
          <>
            Each Class 0 glove is tested at <strong>five times</strong> its max use voltage in the
            factory — that’s the safety margin. The 6-month re-test isn’t optional best practice,
            it’s the recognised industry standard. If your gloves don’t have a current test date,
            they’re not certified for live work, regardless of how new they look.
          </>
        }
        cite="Verbatim wording paraphrased — see IEC 60903:2014 / BS EN 60903 for the full standard text; supported by Energy Networks Association TS-29."
      />

      <InlineCheck
        id={checks[0].id}
        question={checks[0].question}
        options={checks[0].options}
        correctIndex={checks[0].correctIndex}
        explanation={checks[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Insulated tools</ContentEyebrow>

      <ConceptBlock
        title="BS EN 60900 — the only spec that means ‘insulated for live work’"
        plainEnglish="A plastic handle isn’t insulation. BS EN 60900 means the tool was tested at 10 000 V AC in the factory and certified safe for live work up to 1000 V AC."
        onSite="Look for the double-triangle ‘1000V’ mark stamped or printed on the handle. Some manufacturers also use the German ‘VDE 1000V’ mark — same thing. No mark, treat it as a wood-handled tool, not a live-rated one."
      >
        <p>
          BS EN 60900 covers the full set of common hand tools — screwdrivers, pliers, side
          cutters, wire strippers, spanners, nut drivers, knives. The tools are moulded with
          multi-layer insulation that completely covers the metal except for the working tip.
        </p>
        <p>
          <strong>The certification process:</strong> each tool is dunked in water (so only the
          tip is dry) and a 10 000 V AC voltage applied between the water and the tip for 1 to 3
          seconds. No flashover, no leakage current above the specified limit = pass. The tool is
          then marked with the double-triangle and "1000 V" indicating the live-working rating.
        </p>
        <p>
          <strong>Pre-use checks:</strong> visual look-over for cracks, cuts, missing insulation,
          embedded metal swarf, signs of melting from previous arcing. Damaged insulation on a
          live-rated tool = bin it, not "wrap it in tape and hope". The integrity of the moulded
          layer is the whole protection.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS EN 60900:2018 — Hand tools for live working up to 1 000 V AC and 1 500 V DC (paraphrased)"
        clause="Tools intended for live working shall be subjected to a routine dielectric test at a voltage of 10 000 V AC for between 1 and 3 seconds. The leakage current shall not exceed the values specified in Table 4. Each tool shall be marked with the double-triangle insulation symbol and the maximum use voltage of 1 000 V AC and 1 500 V DC."
        meaning={
          <>
            Factory dielectric test at <strong>10 kV</strong> — the safety margin is 10× the
            in-service rating. The double-triangle symbol on the handle is the certificate.
            Without it, the tool is not certified for live work, no matter how chunky the plastic
            looks.
          </>
        }
        cite="Verbatim wording paraphrased — see BS EN 60900:2018 for the full standard text; HSE GS38 for site application."
      />

      <InlineCheck
        id={checks[1].id}
        question={checks[1].question}
        options={checks[1].options}
        correctIndex={checks[1].correctIndex}
        explanation={checks[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The arc-flash layer</ContentEyebrow>

      <ConceptBlock
        title="Arc-rated clothing + face shields — BS EN 61482"
        plainEnglish="Insulated gloves stop the SHOCK. Arc-rated kit stops the FLASH — the radiated heat that can melt clothing into skin in milliseconds. You need both for serious LV switchroom work."
        onSite="On a board change at a 100 A TP&N panel with bolted bus connections, the RAMS will probably specify arc-rated coveralls, arc-rated face shield, balaclava, and the right cal/cm² rating. The number isn’t plucked out of thin air — it comes from an arc-flash incident energy calculation on that specific gear."
      >
        <p>
          An arc fault releases energy as light, heat and a pressure wave. Even at 230 V an arc
          can hit several thousand degrees C in milliseconds and ignite normal cotton or synthetic
          clothing — making the burn far worse than the original flash. Arc-rated PPE uses
          inherently flame-resistant fabrics (e.g. modacrylic / aramid blends) that won’t ignite
          or melt.
        </p>
        <p>The two main rating systems you’ll see:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>BS EN 61482-2</strong> — the European standard for protective clothing against
            thermal hazards of an electric arc. Tests the fabric against an actual arc and gives a
            rating in cal/cm².
          </li>
          <li>
            <strong>NFPA 70E PPE Categories</strong> — US-derived but widely referenced in UK
            arc-flash assessments. Category 1 = ≥ 4 cal/cm², Cat 2 = ≥ 8 cal/cm², Cat 3 = ≥ 25
            cal/cm², Cat 4 = ≥ 40 cal/cm².
          </li>
        </ul>
        <p>
          The CORRECT cal/cm² rating for a given task comes from an{' '}
          <strong>arc-flash hazard analysis</strong> — looks at the available fault current, the
          device clearing time, and the working distance, and works out the incident energy you’d
          be exposed to. The rated kit must equal or exceed that energy.
        </p>
        <p>
          Domestic electricians rarely need full arc-flash kit; commercial / industrial / utility
          electricians routinely do. Either way, the rule is the same: never substitute cotton
          overalls or polyester hi-vis for arc-rated gear. Polyester MELTS onto skin in an arc
          flash — it’s WORSE than nothing.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS EN 61482-2:2020 — Live working — Protective clothing against the thermal hazards of an electric arc (paraphrased)"
        clause="Protective clothing shall be classified by either the box-test method (Class 1 = 4 kA, Class 2 = 7 kA) or the open-arc test method, which shall yield an Arc Thermal Performance Value (ATPV) or Energy Breakopen Threshold (EBT) value in cal/cm². The rating shall be permanently marked on each garment."
        meaning={
          <>
            Two test methods, two ways to rate the kit. The cal/cm² number is the one you’ll see
            on the tag. Match it (or exceed it) against the incident energy worked out for the job
            in the arc-flash assessment. Polyester / cotton high- vis vests are NOT arc-rated —
            wearing them OVER arc-rated kit can defeat the whole system.
          </>
        }
        cite="Verbatim wording paraphrased — see BS EN 61482-2:2020 for the full standard text; IEEE 1584 for incident energy calculation."
      />

      <InlineCheck
        id={checks[2].id}
        question={checks[2].question}
        options={checks[2].options}
        correctIndex={checks[2].correctIndex}
        explanation={checks[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The general site PPE</ContentEyebrow>

      <ConceptBlock title="Eyes, head, feet, ears, visibility — the standards in one place">
        <p>
          The non-electrical PPE you’ll wear every day. Each has a specific BS EN standard — and
          the standard is what actually defines the protection level.
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Eye protection — BS EN 166.</strong> Look for the field of impact rating: F =
            low energy, B = medium, A = high. For grinding / power saws use B or A as a minimum.
            For arc work add the BS EN 169 / 170 / 171 markings for UV/IR filtering.
          </li>
          <li>
            <strong>Head protection — BS EN 397 (industrial helmet).</strong> Tested for shock
            absorption, penetration resistance, flame and lateral deformation. Look for the date
            stamp on the inside — most manufacturers say replace 3-5 years from manufacture (or
            immediately after impact). For low-headroom work, EN 812 bump caps are a lighter
            alternative — they protect against bumps, NOT falling objects.
          </li>
          <li>
            <strong>Safety footwear — EN ISO 20345.</strong> SB = basic 200 J toe-cap. S1 = adds
            antistatic + heel energy absorption. S1P = adds penetration- resistant midsole. S3 =
            adds water-resistance. Most electricians wear S3 boots — handles wet,
            screws-in-the-floor, drops. NB: dielectric (live-working) footwear is a separate spec
            — EN 50321-1 — not normal site boots.
          </li>
          <li>
            <strong>Hi-vis — EN ISO 20471.</strong> Class 1 = vest only (low traffic), Class 2 =
            vest + sleeves OR vest + trousers (mid), Class 3 = full sleeve jacket + trousers (high
            speed traffic / construction). UK construction sites are typically Class 2 minimum,
            highways Class 3.
          </li>
          <li>
            <strong>Hearing protection — BS EN 352.</strong> Plugs (352-2) or muffs (352-1). Rated
            by SNR (Single Number Rating) in dB attenuation. Drilling masonry can hit 100+ dB(A) —
            a 27 dB SNR plug brings it to a safe level under 80 dB(A). Required above 80 dB(A)
            under the Control of Noise at Work Regs 2005.
          </li>
          <li>
            <strong>Respiratory protection — BS EN 149 (FFP masks).</strong> FFP1 = low-toxicity
            dust, FFP2 = standard electrician use (drill dust, plaster), FFP3 = high-protection
            (asbestos-suspect, lead). Single-use; replace when breathing resistance increases.
            Tight-fit RPE needs face-fit testing — beards defeat the seal.
          </li>
        </ul>
      </ConceptBlock>

      <CommonMistake
        title="Treating cheap import gloves as 1000 V rated because the box says so"
        whatHappens={
          <>
            Apprentice grabs a £6 pair of "insulated gloves — 1000V" off a market stall because
            the company-issue ones are out for re-test. Markings look right at a glance. He uses
            them on a CU change. The rubber compound is sub-spec, ageing badly, with no real
            dielectric test history. A pinhole is invisible to the eye. Across his palm at 230 V
            is enough current to fibrillate.
          </>
        }
        doInstead={
          <>
            If the proper gloves are out for test, the proper answer is{' '}
            <strong>postpone the live work</strong>, not improvise. Hire / borrow a certified
            spare set with current test date. PPER 2022 puts the duty on the EMPLOYER to keep
            certified PPE available — if they’ve let it run out, that’s their problem to solve,
            not yours to bodge around. Don’t go anywhere near live with anything you can’t prove
            the test history of.
          </>
        }
      />

      <CommonMistake
        title="Skipping the prove-test-prove because ‘the breaker is off’"
        whatHappens={
          <>
            You’re changing a socket on what should be a dead circuit. The breaker’s been thrown.
            You don’t bother proving dead with a voltage indicator because "I just turned it off,
            I know it’s off". Halfway through removing the terminals, your screwdriver bridges
            line-to-CPC and you find out it was the wrong breaker. (This happens. A lot.) PPE
            alone wouldn’t have saved you; proving dead would have.
          </>
        }
        doInstead={
          <>
            Always:{' '}
            <strong>
              prove the tester on a known live source → test the circuit → prove the tester again
              on the known live source
            </strong>
            . That’s the GS38 three-step ‘prove-test-prove’ procedure (covered in §4.3). Insulated
            PPE is the BACKSTOP for the moment something unexpected goes live — it’s NOT the
            substitute for confirming dead state in the first place.
          </>
        }
      />

      <Scenario
        title="The CU change with two phases of risk"
        situation={
          <>
            You and your supervisor turn up to swap an old wylex CU for a new dual-RCD board. The
            DNO meter is energised; tails go into the existing CU. You agree to (a) call the DNO
            for cut-out fuse pull, but they can’t come till next week, OR (b) work it live on the
            cut-out side — pull tails after declaring meter dead. RAMS specifies: Class 0 IEC
            60903 gloves + leather over-gloves, BS EN 60900 insulated tools, BS EN 166 F-rated
            glasses, BS EN 61482 Cat 2 arc-rated long-sleeve top + face shield (8 cal/cm²), helmet
            not required (no overhead risk).
          </>
        }
        whatToDo={
          <>
            Run the pre-use checks BEFORE you put a hand on anything. Visual + air-leak on the
            gloves, check the test date is current, look over each insulated tool for damaged
            insulation. Don the arc kit BEFORE the gloves go on (you can’t pull a tight sleeve
            over rubber gloves). Face shield down before the cover comes off the cut-out.
            One-handed working from there in (covered in §2.1). Confirm dead state on tails with a
            GS38-compliant voltage indicator (§4.3). THEN crack on.
          </>
        }
        whyItMatters={
          <>
            That’s a typical real-world LV live work job. Every layer of PPE is doing a specific
            job — the gloves stop a hand-to-hand shock if you brush a tail, the arc kit catches
            the radiated heat if you accidentally short tails to the meter case, the glasses catch
            the fragments if a fuse explodes, the insulated tools mean the screwdriver doesn’t
            become the conductor. Pull any one of those out and you’ve broken the system. PPER +
            EAWR + GS38 + BS 7671 — they all line up to land you here.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>The kit list, pulled together</ContentEyebrow>

      <ConceptBlock title="What ‘fully kitted’ looks like for an LV electrician">
        <p>
          For most apprentice work this is what your supervisor should be issuing you with — and
          what you should expect to see in your tool bag, dated, marked, and ready:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>EN ISO 20345 S3 safety boots (200 J toe-cap, midsole, water-resistant)</li>
          <li>EN ISO 20471 Class 2 hi-vis</li>
          <li>EN 397 helmet OR EN 812 bump cap (per RAMS)</li>
          <li>BS EN 166 F-rated safety glasses (in pocket / on head)</li>
          <li>
            IEC 60903 Class 0 insulating gloves + leather over-gloves (with current test date)
          </li>
          <li>BS EN 60900 insulated screwdrivers, side cutters, pliers, wire strippers</li>
          <li>BS EN 61482 arc-rated kit (when RAMS calls for it)</li>
          <li>BS EN 352 hearing protection (drilling / breaking)</li>
          <li>BS EN 149 FFP2 dust masks (drilling, chasing, lifting boards)</li>
        </ul>
        <p>
          Plus a GS38-compliant voltage indicator and proving unit for confirming dead — covered
          in detail next.
        </p>
      </ConceptBlock>

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'IEC 60903 / BS EN 60903 = the only spec that means ‘insulating glove’. Class 0 (1000 V AC) is the LV standard. Visual + air-leak before EVERY use; dielectric re-test every 6 months.',
          'BS EN 60900 = the only spec that means ‘insulated tool for live work’. Factory tested at 10 kV, rated 1000 V AC live use. Look for the double-triangle ‘1000 V’ mark.',
          'BS EN 61482 = arc-flash protective clothing rating in cal/cm². 8 cal/cm² is a typical LV minimum; the actual number comes from an arc-flash hazard study.',
          'Gloves stop SHOCK; arc kit stops FLASH; insulated tools stop the SCREWDRIVER becoming the conductor. Different hazards, different PPE.',
          'EN ISO 20345 SB minimum for footwear (S3 typical for electricians); EN 397 helmets; BS EN 166 eye protection; EN ISO 20471 Class 2 hi-vis as a baseline.',
          'Cheap unmarked imports are NOT certified PPE. No CE/UKCA + standard reference + class + test date = hard refuse, every time.',
        ]}
      />

      {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

      <Quiz title="PPE for electrical work knowledge check" questions={quizQuestions} />

      {/* ── Prev / next nav ─────────────────────────────────── */}

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Choosing PPE that matches the task — drilling masonry, cable pulling, live testing,
        working at height, hot work. PPE is the last line of defence in the hierarchy of control,
        not the first.
      </p>

      <TLDR
        points={[
          'PPE is the LAST line of defence in the hierarchy of control. Eliminate, substitute, engineering controls, admin controls, then PPE. Reaching for PPE before considering the controls above it is the most common audit finding.',
          "Pick PPE by the task — not by what's in the van. Chasing masonry, cable pulling, live testing and hot work each demand a different PPE combination.",
          'Tight-fitting RPE (FFP3 dust masks) only works on a clean-shaven face — INDG479 fit-testing rules apply. Bearded workers need a powered air-purifying respirator with a loose-fitting hood.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify the hierarchy of control under MHSWR 1999 Schedule 1 and explain why PPE sits at the bottom.',
          'State the duties of the employer under PPE Regulations 1992 (as amended 2022) Reg 4 (provide suitable PPE) and Reg 9(3) (no charge to the worker).',
          'State the duties of the employee under PPE Regulations Reg 10 to use PPE per training and report defects.',
          'Match PPE to the specific task — drilling masonry, cable pulling, live testing, working at height, hot work.',
          'Recognise the limits of disposable filtering facepiece masks and the role of fit-testing under HSE INDG479 / HSG53.',
          'Carry out a pre-use inspection of safety glasses, gloves, hi-vis, hard hat and RPE before commencing work.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Where PPE sits in the safety system</ContentEyebrow>

      <ConceptBlock
        title="The hierarchy of control — why PPE is at the bottom"
        plainEnglish="The HSE expects risks to be controlled in a fixed order. Eliminate the hazard first (don't do the dangerous task at all). Substitute with something less dangerous. Engineering controls (dust extraction, guards, RCDs). Administrative controls (work rotation, signage, training). Only then PPE. PPE is last because it depends on the operative remembering, fitting and inspecting it — and it only protects the wearer, not anyone else in the area."
        onSite="The first question on any task is 'can I avoid doing this dangerous thing?' (eliminate). Then 'can I do it a less dangerous way?' (substitute). Then 'can I add an engineering control?' (e.g. on-tool dust extraction for chasing). Then 'is there an admin control that helps?' (e.g. work rotation to reduce noise exposure). Only when those have been worked through does the question become 'what PPE do I need?'."
      >
        <p>The hierarchy as set out in Schedule 1 of MHSWR 1999:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>Avoid risks (eliminate the hazard).</li>
          <li>Evaluate the risks that cannot be avoided.</li>
          <li>Combat the risks at source.</li>
          <li>Adapt the work to the individual.</li>
          <li>Adapt to technical progress.</li>
          <li>Replace the dangerous with the non-dangerous or less dangerous.</li>
          <li>Develop a coherent overall prevention policy.</li>
          <li>
            Give collective protective measures priority over individual protective measures (i.e.
            engineering controls before PPE).
          </li>
          <li>Give appropriate instructions to employees.</li>
        </ol>
        <p>
          The eighth principle is the one that puts PPE last. The HSE inspector after an incident
          will ask &quot;what came before the PPE?&quot; — if the answer is &quot;nothing, we just
          gave them a mask&quot;, the SFAIRP defence collapses.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="Personal Protective Equipment at Work Regulations 1992 (as amended 2022) — Reg 4(1) and Reg 9(3)"
        clause={
          <>
            <p className="mb-2">
              <strong>Reg 4(1)</strong> — &quot;Every employer shall ensure that suitable personal
              protective equipment is provided to his employees who may be exposed to a risk to
              their health or safety while at work except where and to the extent that such risk
              has been adequately controlled by other means which are equally or more
              effective.&quot;
            </p>
            <p>
              <strong>Reg 9(3)</strong> — &quot;No employer shall require any employee to pay for
              any personal protective equipment which has been supplied to him for the purposes of
              these Regulations.&quot;
            </p>
          </>
        }
        meaning={
          <>
            Reg 4 is the substantive duty — provide suitable PPE unless the risk is controlled by
            other (equally or more effective) means. Reg 9(3) is the non-charging rule — the
            employer cannot pass the cost of compliance PPE on to the worker. The 2022 amendment
            extended both duties to cover limb (b) workers (some categories of casual / gig
            workers) as well as employees in the strict sense. For an apprentice this is
            straightforward — the firm provides your working PPE at no cost.
          </>
        }
        cite="Source: Personal Protective Equipment at Work Regulations 1992 (SI 1992/2966) as amended by the Personal Protective Equipment at Work (Amendment) Regulations 2022 (SI 2022/8) — verbatim from legislation.gov.uk."
      />

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>PPE by task — drilling and cutting masonry</ContentEyebrow>

      <ConceptBlock
        title="Chasing, drilling, breaking — the highest PPE load on a typical install"
        plainEnglish="Cutting or drilling masonry generates a particularly nasty mix — respirable crystalline silica dust, high noise, flying debris, vibration. Each one needs its own control. The combined PPE for a chasing task is heavier than for almost any other routine electrical task short of live work."
        onSite="Engineering controls come first — on-tool dust extraction (Class M for masonry dust) is the most effective single control. PPE then sits on top of that to catch what the extraction misses. Skipping the extraction and relying on PPE alone is the textbook 'PPE-first' failure that an inspector will pull you up on."
      >
        <p>The PPE combination for chasing or drilling masonry:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Respiratory protection</strong> — FFP3 disposable mask (minimum) or half-mask
            with P3 filter cartridges. Bearded? PAPR with loose-fitting hood. Fit tested under
            INDG479 / HSG53.
          </li>
          <li>
            <strong>Eye protection</strong> — impact-rated, EN 166 F (low-energy impact) or EN 166
            B (medium-energy) for chasers. Wraparound to keep dust out the sides.
          </li>
          <li>
            <strong>Hearing protection</strong> — chasers run 95-105 dB which is over the Control
            of Noise at Work Regulations 2005 upper exposure action value (85 dB). Earplugs (SNR
            27+) or earmuffs.
          </li>
          <li>
            <strong>Gloves</strong> — cut/abrasion-resistant (EN 388 level B-D) for handling the
            chaser and the masonry debris. Vibration-dampening palm if doing extended use.
          </li>
          <li>
            <strong>Engineering control</strong> — on-tool extraction (Class M vacuum) connected
            to the chaser. This is the single biggest reduction in dust exposure.
          </li>
        </ul>
        <p>Plus baseline site PPE — boots, hi-vis, hard hat where overhead risk.</p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>PPE by task — cable handling</ContentEyebrow>

      <ConceptBlock
        title="Cable pulling and termination — different gloves for different tasks"
        plainEnglish="Cable handling has two PPE problems — cut/abrasion when pulling through enclosures and dexterity when terminating. The same glove rarely does both well, so most apprentices end up with two pairs in the toolbox."
        onSite="Cable pulling generates abrasion (the cable sheath dragging through brackets and conduit) and the occasional snag injury. Termination is fine work — the glove either has to come off or has to be a thin grip-glove that lets you feel the strands. Picking the wrong glove for the wrong half of the job is a common minor-injury source."
      >
        <p>The PPE combination for cable pulling and termination:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Pulling gloves</strong> — palm-coated, cut-resistant (EN 388 level B-C), full
            grip. Protects against rope burn from pulled cable, sharp edges in enclosures, and the
            occasional buried staple.
          </li>
          <li>
            <strong>Termination gloves</strong> — thin nitrile-palm or no glove at all for fine
            work. Conductor strands need feel; bulky gloves cause poor terminations.
          </li>
          <li>
            <strong>Eye protection</strong> — light safety glasses (EN 166 F). Cable pulling can
            spring lose ends back at face level when a pull releases.
          </li>
          <li>
            <strong>Knee protection</strong> — knee pads when working at floor level for extended
            periods. The Manual Handling Operations Regulations 1992 Reg 4 covers this as part of
            the wider posture / load assessment.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>PPE by task — live work and electrical testing</ContentEyebrow>

      <ConceptBlock
        title="Live work is the exception — and the PPE reflects that"
        plainEnglish="Almost all installation work is done dead following safe isolation. EAWR 1989 Reg 14 makes live work the explicit exception — it has to be specifically justified because the work cannot reasonably be done dead, the operative has to be competent, and suitable precautions have to be in place. PPE for live work is a higher specification than for dead work."
        onSite="On dead work the PPE is the standard kit (eye protection, mechanical-protection gloves, baseline site PPE). On live work — and that includes voltage proving as part of safe isolation — there's a heavier kit. Class 0 voltage-rated insulating gloves (rated to 1000V AC), arc-rated clothing for higher fault-energy locations, eye protection rated for arc-flash, dielectric overshoes."
      >
        <p>The PPE combination for live work and live testing:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Voltage-rated insulating gloves</strong> — Class 0 rated to 1000V AC covers
            most LV work. Worn over leather mechanical-protection gloves to protect the rubber
            from puncture. Tested before each use (visual + air-inflation check for pinholes).
          </li>
          <li>
            <strong>Arc-rated eye protection</strong> — full face shield (EN 166 with arc-flash
            marking) for switchgear or higher-energy work. Standard safety glasses only for
            low-energy domestic testing.
          </li>
          <li>
            <strong>Arc-rated clothing</strong> — required for higher-energy commercial /
            industrial DBs at 415V where the calculated incident energy exceeds the bare-skin
            threshold. NFPA 70E and IEC 61482 give the calculation framework. Most domestic work
            is below the threshold but isn't zero risk.
          </li>
          <li>
            <strong>Insulated tools</strong> — VDE-rated screwdrivers and pliers (EN 60900) rated
            to 1000V AC. Inspected for damage to the insulation before use.
          </li>
          <li>
            <strong>Dielectric overshoes</strong> — for switchgear or higher-risk locations.
            Insulated mat at the work position is the engineering-control alternative.
          </li>
        </ul>
        <p>
          The cleanest control is to do the work dead. A live-work permit-to-work regime has to
          sit around any live work that cannot be avoided.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="Electricity at Work Regulations 1989 — Reg 14"
        clause={
          <>
            &quot;No person shall be engaged in any work activity on or so near any live conductor
            (other than one suitably covered with insulating material so as to prevent danger)
            that danger may arise unless — (a) it is unreasonable in all the circumstances for it
            to be dead; and (b) it is reasonable in all the circumstances for him to be at work on
            or near it while it is live; and (c) suitable precautions (including where necessary
            the provision of suitable protective equipment) are taken to prevent injury.&quot;
          </>
        }
        meaning={
          <>
            Reg 14 is the live-work prohibition with three cumulative exceptions. ALL THREE limbs
            have to be satisfied — it has to be unreasonable to make the conductor dead AND
            reasonable to work on it live AND suitable precautions in place. PPE is one of the
            &apos;suitable precautions&apos;. If any limb fails, live work is prohibited. The HSE
            has prosecuted electricians and their firms under Reg 14 where the &apos;could it have
            been done dead?&apos; question wasn&apos;t honestly answered.
          </>
        }
        cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 14 — verbatim from legislation.gov.uk."
      />

      <SectionRule />

      <ContentEyebrow>PPE by task — working at height and hot work</ContentEyebrow>

      <ConceptBlock
        title="Working at height and hot work — separate task families with their own PPE"
        plainEnglish="Working at height is covered in detail in the lesson on access equipment for work at height, but the PPE component is worth flagging here. Hard hat where overhead risk; chinstrap on the helmet to stop it falling off when working overhead; fall arrest if scaffold or MEWP requires it (cherry picker work routinely needs full body harness with shock-absorbing lanyard clipped to the basket anchor)."
        onSite="Hot work — using a gas torch to make a soldered joint on a copper bonding tail — has a specific PPE set. Leather gloves rather than synthetic, eye protection rated for thermal hazards, long sleeves of natural fibre (synthetics melt onto skin), a fire blanket or extinguisher within arm's reach, and clearance of combustibles from the work area."
      >
        <p>
          Working at height — PPE component (full hierarchy in the lesson on access equipment):
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Hard hat with chinstrap</strong> — when working overhead or where others are
            working overhead.
          </li>
          <li>
            <strong>Fall arrest harness + lanyard</strong> — required for MEWP basket work and for
            some scaffold work. IPAF / PASMA training covers correct use.
          </li>
          <li>
            <strong>Footwear with grip rating</strong> — particularly for ladder and scaffold
            work. Smooth-sole boots are a fall risk.
          </li>
        </ul>
        <p>Hot work — PPE plus admin controls:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Leather gloves</strong> — heat resistant, not synthetic.
          </li>
          <li>
            <strong>Thermal-rated eye protection</strong> — EN 166 with thermal-hazard marking.
          </li>
          <li>
            <strong>Natural-fibre clothing</strong> — long sleeves of cotton or wool. Synthetic
            clothing melts onto skin.
          </li>
          <li>
            <strong>Fire blanket / extinguisher in arm&apos;s reach</strong> — and clearance of
            combustibles from the work area.
          </li>
          <li>
            <strong>Hot-works permit</strong> — admin control on commercial premises.
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

      <ContentEyebrow>Fit, inspection and storage</ContentEyebrow>

      <ConceptBlock
        title="PPE only protects when it fits and is undamaged"
        plainEnglish="PPE Regs Reg 7 puts the maintenance duty on the employer; Reg 10 puts the inspection-and-report duty on the employee. Together they make the pre-use inspection a daily routine. Damaged PPE doesn't provide the rated protection — a cracked safety glass lens, a dust mask with a broken strap, a hi-vis with the reflective material peeling off — all need to be taken out of service before use."
        onSite="The pre-use inspection takes thirty seconds per item. Glasses — visible cracks or scratches that obscure vision? Mask — straps intact, nose-piece formable, no holes in the filter material? Gloves — no cuts, no chemical damage, dry inside? Helmet — within manufacturer's lifespan, no impact damage to the shell? If any item fails, swap it before work starts."
      >
        <p>The pre-use inspection routine:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Glasses / visor</strong> — clean, no scratches that obscure vision, no cracks.
            Side shields intact for wraparound.
          </li>
          <li>
            <strong>Mask / RPE</strong> — straps intact and elastic, nose piece bendable, no holes
            in filter material. Disposable masks are single-shift.
          </li>
          <li>
            <strong>Gloves</strong> — no cuts or holes, no chemical damage, no contamination.
            Voltage-rated gloves get an air-inflation check for pinholes.
          </li>
          <li>
            <strong>Helmet</strong> — within the manufacturer&apos;s lifespan (date stamped
            inside), no impact damage to the shell, harness intact.
          </li>
          <li>
            <strong>Hi-vis</strong> — fluorescent material not faded beyond visible threshold,
            reflective tape intact and not peeling.
          </li>
          <li>
            <strong>Boots</strong> — sole tread present, toe cap not exposed, upper not split.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Personal Protective Equipment at Work Regulations 1992 — Reg 7(1) and Reg 10(2)"
        clause={
          <>
            <p className="mb-2">
              <strong>Reg 7(1)</strong> — &quot;Every employer shall ensure that any personal
              protective equipment provided to his employees is maintained (including replaced or
              cleaned as appropriate) in an efficient state, in efficient working order and in
              good repair.&quot;
            </p>
            <p>
              <strong>Reg 10(2)</strong> — &quot;Every employee who has been provided with
              personal protective equipment by virtue of regulation 4(1) shall take all reasonable
              steps to ensure that it is returned to the accommodation provided for it after
              use.&quot;
            </p>
          </>
        }
        meaning={
          <>
            Reg 7 is the maintenance duty on the employer — PPE must be kept in working order. Reg
            10(2) puts a corresponding duty on the employee to put it back where it lives after
            use (so the next inspection finds it in a known condition). Reg 11 requires the
            employer to provide accommodation for PPE storage when not in use — a designated
            locker or van compartment, not the back seat of the van under wet cable.
          </>
        }
        cite="Source: Personal Protective Equipment at Work Regulations 1992 (SI 1992/2966) — verbatim from legislation.gov.uk."
      />

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Reaching for PPE first instead of working through the hierarchy"
        whatHappens={
          <>
            Apprentice is told to chase a wall by the supervisor. Supervisor hands them a
            disposable mask and says &quot;crack on&quot;. No on-tool extraction set up, no
            work-rotation arrangement, no consideration of whether a different cable route would
            avoid the chase entirely. Apprentice spends three hours producing silica dust the mask
            can&apos;t fully filter, and the supervisor has skipped everything ABOVE PPE in the
            hierarchy. The post-incident audit (or HSE visit) finds that the PPE-only approach was
            a breach of the principles of prevention in MHSWR Schedule 1 even though the worker
            WAS wearing PPE.
          </>
        }
        doInstead={
          <>
            Walk the hierarchy on every task. Can the chase be avoided (surface-mount in trunking,
            drop from above)? If not, can a less-dusty method substitute (stitch drilling rather
            than continuous chase)? If not, what engineering control (on-tool extraction with
            Class M vacuum)? What admin control (rotate operative, limit exposure time)? THEN PPE.
            The PPE is what catches what the controls above it miss — not the only thing standing
            between you and the hazard.
          </>
        }
      />

      <CommonMistake
        title="Allowing a bearded operative to use a disposable FFP3 mask"
        whatHappens={
          <>
            Apprentice in week two is sent to chase a wall. He&apos;s grown a beard since joining.
            Hands him a disposable FFP3 and waves him at the chaser. The face seal doesn&apos;t
            work over the beard, 15-20% of his inhaled air bypasses the filter, and three
            hours&apos; chasing exposes him to silica well above the workplace exposure limit.
            Years later he develops respiratory symptoms. The firm cannot show that fit-testing
            under INDG479 was carried out and the PPE provided was suitable for the user. Civil
            claim follows alongside a HSE investigation.
          </>
        }
        doInstead={
          <>
            Fit-testing applies to every tight-fitting RPE wearer per HSG53 and INDG479. If the
            worker has facial hair in the seal area, the disposable mask isn&apos;t suitable —
            switch to a powered air-purifying respirator (PAPR) with a loose-fitting hood. The
            PAPR doesn&apos;t rely on a face seal so it works regardless of facial hair. Yes, it
            costs more than a disposable mask. The cost of getting it wrong is much higher.
          </>
        }
      />

      <Scenario
        title="Cutting a chase in plaster for a new socket — what PPE before you start?"
        situation={
          <>
            You&apos;re second-year on a domestic kitchen retrofit. The customer wants a new
            socket on a wall that&apos;s currently bare sand-and-cement plaster. The wall is an
            external solid wall (no cavity), no concealed services flagged on the walk-round, and
            the chase will be 25mm wide x 15mm deep over a 1.2m vertical run. You&apos;re going to
            use a 110V wall chaser with two 125mm diamond blades. The customer is at home but in
            another room.
          </>
        }
        whatToDo={
          <>
            Walk the hierarchy first, then PPE. Eliminate? No — the customer wants a flush socket
            and surface-mount conduit isn&apos;t acceptable here. Substitute? Could stitch-drill
            the chase but the chaser is the right tool for a 1.2m run. Engineering control?
            Connect the chaser to a Class M vacuum extractor — this is the single biggest
            reduction in dust exposure and should be considered required for any significant
            chasing job. Admin control? Brief the customer that the work area is off-limits while
            the chaser runs, close the door to the rest of the house, and limit your continuous
            chasing to short runs with breaks (work rotation reduces noise and dust exposure even
            for a single operative). THEN PPE: FFP3 disposable mask (assuming you&apos;re
            clean-shaven and fit-tested), wraparound impact-rated eye protection (EN 166 F),
            hearing protection (SNR 27+ earplugs or earmuffs), cut-resistant gloves (EN 388 B-C),
            boots, hi-vis. Inspect each item before you put it on.
          </>
        }
        whyItMatters={
          <>
            The temptation as an apprentice is to grab the mask and the glasses and start cutting.
            Working through the hierarchy in that order — even out loud, even just in your head
            &mdash; is what an inspector wants to see in your routine and what turns &quot;PPE was
            provided&quot; into &quot;risk was controlled&quot;. The PPE catches what the
            engineering and admin controls miss. Skipping the controls above PPE and relying on
            the mask alone is the prosecutable failure. The same walk-the-hierarchy thinking
            applies to every task on this lesson.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'PPE is the LAST line of defence in the hierarchy of control under MHSWR 1999 Schedule 1. Eliminate, substitute, engineering controls, admin controls, then PPE.',
          'PPE Regs 1992 (as amended 2022) Reg 4 requires the employer to provide suitable PPE; Reg 9(3) prohibits the employer from charging the worker for it.',
          'The 2022 amendment extended PPE provision to limb (b) workers as well as employees in the strict sense.',
          'Match PPE to the task — chasing masonry, cable handling, live testing, working at height and hot work each demand a different combination.',
          'Tight-fitting RPE only works on a clean-shaven face. Bearded workers need a powered air-purifying respirator with a loose-fitting hood — INDG479 and HSG53 are explicit.',
          "Live work is the exception under EAWR 1989 Reg 14. Voltage-rated gloves, arc-rated kit and insulated tools are PPE for the situations where dead working isn't reasonable. Most installation work is done dead.",
          'Pre-use inspection of every PPE item — glasses, mask, gloves, helmet, hi-vis, boots — takes thirty seconds and catches damaged kit before it fails in use. PPE Regs Reg 10 makes the report-defect duty personal.',
          "PPE protects only the wearer, only when worn correctly, and only when undamaged. Engineering controls (extraction, RCDs, guards) protect everyone in the area without depending on individual behaviour — that's why they sit above PPE in the hierarchy.",
        ]}
      />

      <Quiz title="PPE selection — knowledge check" questions={quizQuestions2} />

      {/* ── Prev / next nav ─────────────────────────────────── */}
    </div>
  );
}
