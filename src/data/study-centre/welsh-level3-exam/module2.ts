/**
 * Final paper — Module 2: Health, safety and environment.
 *
 * Fifty questions. This is the largest legal surface in the course and the
 * one where a plausible-sounding wrong answer does real damage, so the
 * distractors here are mostly the adjacent duty, the adjacent regulation or
 * the adjacent timescale rather than anything invented: an improvement notice
 * against a prohibition notice, LOLER's six months against PUWER's pre-use
 * check, a hazardous waste consignment note against a waste transfer note.
 *
 * Statutes and regulation numbers are cited only where the course already
 * teaches them and the citation was checked against the source.
 */

import { bank, type WelshExamQuestion } from './helpers';

const QUESTIONS: WelshExamQuestion[] = [
  // ── Section 1 · Legislation, enforcement and sources of guidance ─────────
  {
    id: 41,
    question:
      'An HSE inspector arrives on site unannounced. Under which Act are they exercising their powers?',
    options: [
      'The Management of Health and Safety at Work Regulations 1999',
      'The Construction (Design and Management) Regulations 2015',
      'Part I of the Health and Safety at Work etc. Act 1974',
      'The Electricity at Work Regulations 1989',
    ],
    correctAnswer: 2,
    explanation:
      'An inspector’s powers of entry, examination and investigation come from Part I of the Health and Safety at Work etc. Act 1974 — they are exercising statutory powers, not asking permission. MHSWR, CDM and EAWR all create duties an inspector may be checking compliance with, but none of them is the source of the power to walk on site.',
    section: 'Legislation, enforcement and sources of guidance',
    difficulty: 'intermediate',
    topic: 'HSE enforcement powers',
    reference: 'HSWA 1974 Part I, Section 20',
  },
  {
    id: 42,
    question:
      'What is the essential difference between an improvement notice and a prohibition notice?',
    options: [
      'An improvement notice requires a contravention to be remedied while work continues; a prohibition notice stops the activity',
      'An improvement notice is issued to the employer; a prohibition notice is issued to the individual operative',
      'An improvement notice carries a fine; a prohibition notice carries a criminal conviction',
      'An improvement notice applies to documentation; a prohibition notice applies to physical conditions',
    ],
    correctAnswer: 0,
    explanation:
      'An improvement notice under s.21 requires a contravention to be remedied within a specified period — a minimum of 21 days — and the work carries on while the fix is made. A prohibition notice under s.22 stops the activity, because of a risk of serious personal injury. Both can be served on a duty holder rather than splitting by person, neither is itself a fine or a conviction, and the distinction is not documents against physical conditions.',
    section: 'Legislation, enforcement and sources of guidance',
    difficulty: 'intermediate',
    topic: 'Improvement and prohibition notices',
    reference: 'HSWA 1974 Sections 21 and 22',
  },
  {
    id: 43,
    question:
      'Both notices carry a 21-day appeal to an Employment Tribunal. What is the effect of lodging the appeal?',
    options: [
      'It suspends both notices until the tribunal has heard the case',
      'It suspends an improvement notice; it does not suspend a prohibition notice',
      'It suspends a prohibition notice; it does not suspend an improvement notice',
      'It suspends neither, but it stops any Fee for Intervention charge accruing',
    ],
    correctAnswer: 1,
    explanation:
      'Appealing an improvement notice suspends it; appealing a prohibition notice does not, because the whole point of a prohibition notice is a risk of serious personal injury that cannot wait for a hearing. The reverse would let a dangerous activity restart on the strength of a form. Suspending both has the same problem, and Fee for Intervention is a separate cost recovery mechanism that an appeal does not switch off.',
    section: 'Legislation, enforcement and sources of guidance',
    difficulty: 'advanced',
    topic: 'Appealing enforcement notices',
    reference: 'HSWA 1974 — appeals to an Employment Tribunal',
  },
  {
    id: 44,
    question: 'What triggers a Fee for Intervention charge?',
    options: [
      'Any visit by an HSE inspector, whether or not a contravention is found',
      'The service of a prohibition notice, but not an improvement notice',
      'A material breach written up in a letter, notice or report',
      'A conviction following prosecution in the magistrates’ court',
    ],
    correctAnswer: 2,
    explanation:
      'Fee for Intervention is triggered when an inspector writes a material breach up — in a letter, a notice or a report. Verbal advice on site does not trigger it. It is not charged for the visit itself, it is not limited to prohibition notices, and it operates well before and independently of any prosecution.',
    section: 'Legislation, enforcement and sources of guidance',
    difficulty: 'advanced',
    topic: 'Fee for Intervention',
    reference: 'Module 2, Section 1 — HSE enforcement',
  },
  {
    id: 45,
    question:
      'Regulation 526.1 makes which document a requirement for terminations under BS 7671?',
    options: [
      'The manufacturer’s installation instructions',
      'The IET On-Site Guide',
      'The project specification issued by the designer',
      'IET Guidance Note 3',
    ],
    correctAnswer: 0,
    explanation:
      'Manufacturer’s installation instructions — torque figures, terminal type, connection method — are what a compliant termination is made against, and BS 7671 ties compliance to them. The On-Site Guide and Guidance Note 3 are IET publications giving practical guidance rather than the device-specific instruction, and a project specification is contractually binding but is not what the standard points to for a termination.',
    section: 'Legislation, enforcement and sources of guidance',
    difficulty: 'intermediate',
    topic: 'Manufacturer instructions',
    reference: 'BS 7671 Regulations 510.3 and 526.1',
  },
  {
    id: 46,
    question:
      'You are handed four sources for a job. Which is the one that tells you the rules the installation must meet?',
    options: [
      'The IET On-Site Guide, which gives the practical day-one tables',
      'IET Guidance Note 3, which covers inspection and testing in depth',
      'BS 7671, which is the standard the installation is designed and built to',
      'The manufacturer’s datasheet, which is device-specific',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 is the rules. The On-Site Guide gives practical tables for straightforward work, Guidance Note 3 goes deep on inspection and testing, and a datasheet tells you about one device — all three are useful and none of them is the standard. Using the wrong source is worse than using no source, because it produces a confident answer to the wrong question.',
    section: 'Legislation, enforcement and sources of guidance',
    difficulty: 'basic',
    topic: 'Sources of technical guidance',
    reference: 'Module 2, Section 1 — The wrong source is worse than no source',
  },
  {
    id: 47,
    question:
      'You cannot meet a requirement in the project specification. What is the correct action?',
    options: [
      'Install the nearest equivalent and note it on the certification as a departure',
      'Raise a technical query or RFI in writing and wait for a written variation',
      'Agree the change verbally with the site manager and proceed',
      'Follow BS 7671 instead, since the standard overrides a specification',
    ],
    correctAnswer: 1,
    explanation:
      'A specification is contractually binding, so the route is a written query and a written variation before the work is done. Installing an equivalent and recording it afterwards presents the client with a decision already taken. A verbal agreement leaves nothing to rely on when it is questioned. And BS 7671 sets the minimum for safety — a specification can and often does require more, so meeting the standard does not discharge the contract.',
    section: 'Legislation, enforcement and sources of guidance',
    difficulty: 'intermediate',
    topic: 'Specifications and variations',
    reference: 'Module 2, Section 1 — Workplace information',
  },
  {
    id: 48,
    question:
      'How do new technical issues reach the trade between amendments to BS 7671?',
    options: [
      'Through amendments to the Electricity at Work Regulations 1989',
      'Through revised editions of the IET On-Site Guide only',
      'Through certification scheme technical bulletins',
      'Through HSE improvement notices served on affected contractors',
    ],
    correctAnswer: 2,
    explanation:
      'Certification scheme technical bulletins are the mechanism the industry uses between amendments, and they are worth reading. EAWR is primary legislation and is not amended for technical detail of this kind; the On-Site Guide is republished alongside amendments rather than continuously; and enforcement notices are served on individual duty holders about their own contraventions, not used as a communication channel to the trade.',
    section: 'Legislation, enforcement and sources of guidance',
    difficulty: 'intermediate',
    topic: 'Keeping up to date',
    reference: 'Module 2, Section 1 — The wrong source is worse than no source',
  },
  {
    id: 49,
    question: 'What is a RAMS, and what should you do with it?',
    options: [
      'The risk assessment and method statement combined — read it, sign it, and question it before work starts',
      'The risk assessment for the site, issued by the principal contractor and signed at induction only',
      'The method statement alone, with the risk assessment held separately by the employer',
      'The record of accidents and monitoring statistics, reviewed at the end of each phase',
    ],
    correctAnswer: 0,
    explanation:
      'RAMS is the risk assessment and the method statement together, and the point of signing is that you have read it, it fits the site you are actually standing on, and you have raised anything that does not. A site-wide induction document is not the same as a task RAMS, the two halves are not held separately, and it is a forward-looking plan rather than a record of what has already happened.',
    section: 'Legislation, enforcement and sources of guidance',
    difficulty: 'basic',
    topic: 'RAMS',
    reference: 'Module 2, Section 1 — Workplace information',
  },
  {
    id: 50,
    question:
      'Under MHSWR 1999 Regulation 3, when must the significant findings of a risk assessment be recorded?',
    options: [
      'Whenever the work involves a specified high-risk activity',
      'Whenever the employer employs five or more employees',
      'Whenever the work is carried out on a notifiable construction site',
      'Whenever the assessment identifies a risk that cannot be eliminated',
    ],
    correctAnswer: 1,
    explanation:
      'The recording duty bites at five or more employees. The assessment itself must be suitable and sufficient in every case — the threshold is about writing the significant findings down, not about whether to assess. High-risk activities, notifiable sites and un-eliminated risks all attract their own controls, but none of them is the trigger for this particular recording duty.',
    section: 'Legislation, enforcement and sources of guidance',
    difficulty: 'advanced',
    topic: 'Risk assessment duties',
    reference: 'MHSWR 1999 Regulation 3',
  },

  // ── Section 2 · Site hazards, electrical dangers and accident prevention ─
  {
    id: 51,
    question:
      'On a 110 V centre-tapped earth construction supply, what is the voltage from each conductor to earth?',
    options: [
      '110 V, because the whole supply voltage appears across the shock path',
      '55 V, because the centre tap halves the voltage to earth on each side',
      '65 V, because the tap is offset to allow for volt drop on site distribution',
      '0 V, because the centre tap earths both conductors at the transformer',
    ],
    correctAnswer: 1,
    explanation:
      'Centre-tapping the secondary and earthing that tap puts 55 V on each conductor with respect to earth, which halves the severity of a shock compared with a 230 V supply. The 110 V figure is the voltage between the two conductors, not to earth. 65 V is not a value this arrangement produces. And earthing the centre tap does not put both conductors at earth potential — if it did, the supply would deliver nothing.',
    section: 'Site hazards, electrical dangers and accident prevention',
    difficulty: 'intermediate',
    topic: 'Reduced low voltage on site',
    reference: 'BS 7671 Section 704 — construction and demolition sites',
  },
  {
    id: 52,
    question: 'What does the hierarchy of control require, and where does PPE sit in it?',
    options: [
      'Eliminate, substitute, engineering controls, administrative controls, PPE — with PPE last',
      'PPE first as an immediate control, then engineering controls as a permanent fix',
      'Eliminate, PPE, engineering controls, administrative controls, substitute',
      'Whichever control the risk assessment scores highest, applied on its own',
    ],
    correctAnswer: 0,
    explanation:
      'The order is eliminate, substitute, engineer, administer, PPE, and it is statutory through MHSWR Regulation 4 and Schedule 1. PPE is last because it depends on individual compliance and protects only the wearer, where an engineering control protects everybody in the area regardless of behaviour. Reaching for PPE first is the inversion most often found in prosecutions, and a risk score guides the choice of controls rather than replacing the order.',
    section: 'Site hazards, electrical dangers and accident prevention',
    difficulty: 'basic',
    topic: 'Hierarchy of control',
    reference: 'MHSWR 1999 Regulation 4 and Schedule 1',
  },
  {
    id: 53,
    question:
      'Which statement about the relationship between hazard and risk is correct?',
    options: [
      'Hazard and risk are the same thing described from different points of view',
      'Risk is the potential to cause harm; hazard is the likelihood of that harm occurring',
      'Hazard is the potential to cause harm; risk is likelihood combined with severity, given exposure and controls',
      'Hazard applies to substances and equipment; risk applies to people and behaviour',
    ],
    correctAnswer: 2,
    explanation:
      'A hazard has the potential to cause harm whatever the circumstances; the risk is how likely that harm is and how bad it would be, taking account of who is exposed and what controls are in place. Swapping the two round is the commonest error, and treating them as interchangeable loses the reason controls change the risk while leaving the hazard exactly where it was. The split is not by subject matter — a substance has both a hazard and a risk.',
    section: 'Site hazards, electrical dangers and accident prevention',
    difficulty: 'basic',
    topic: 'Hazard and risk',
    reference: 'Module 2, Section 2 — The precise definitions',
  },
  {
    id: 54,
    question:
      'Approximately what current through the body is associated with the onset of the inability to let go?',
    options: [
      '1 mA',
      '10 mA',
      '100 mA',
      '500 mA',
    ],
    correctAnswer: 1,
    explanation:
      'Around 10 mA is where muscular contraction prevents release, which is what turns a brief contact into a sustained one. 1 mA is the perception threshold — a tingle. 100 mA is well into the range where ventricular fibrillation becomes likely, and 500 mA is far beyond it. It is current that does the damage, not voltage.',
    section: 'Site hazards, electrical dangers and accident prevention',
    difficulty: 'intermediate',
    topic: 'Physiological effects of current',
    reference: 'Module 2, Section 2 — Shock',
  },
  {
    id: 55,
    question: 'Why is one-handed working taught as a discipline?',
    options: [
      'It halves the current that can flow through the body for a given voltage',
      'It keeps the other hand free to operate the means of isolation quickly',
      'It breaks the hand-to-hand path, which takes the current across the chest',
      'It reduces the contact area, which increases the body’s overall resistance',
    ],
    correctAnswer: 2,
    explanation:
      'Hand to hand is the killer path because it takes the current directly across the chest and the heart. Working one-handed removes that path. It does not halve the current — the current depends on the voltage and the impedance of whatever path exists. Keeping a hand free is a genuine benefit but it is not the reason. And contact area affects contact resistance marginally, nowhere near enough to be the point.',
    section: 'Site hazards, electrical dangers and accident prevention',
    difficulty: 'intermediate',
    topic: 'Shock paths',
    reference: 'Module 2, Section 2 — Shock',
  },
  {
    id: 56,
    question:
      'A colleague receives an electric shock with no visible injury beyond a small mark on the palm. What is the correct response?',
    options: [
      'Monitor them for the rest of the shift and report it if symptoms develop',
      'Treat the mark as a minor burn on site and record it in the accident book',
      'Send them home to rest and arrange a review the following morning',
      'Arrange attendance at A&E, because electrical burns can be deep internally',
    ],
    correctAnswer: 3,
    explanation:
      'Electrical burns are deceptive: a small surface mark can sit over substantial deep tissue damage along the current path, and there is a risk of delayed cardiac effects. Attendance at A&E is mandatory rather than a judgement call. Monitoring, treating it on site or sending them home all rest on the surface appearance, which is exactly the thing that misleads.',
    section: 'Site hazards, electrical dangers and accident prevention',
    difficulty: 'intermediate',
    topic: 'Response to electric shock',
    reference: 'Module 2, Section 2 — Shock',
  },
  {
    id: 57,
    question: 'What is the most common cause of electrical fires in installations?',
    options: [
      'Loose connections',
      'Undersized protective conductors',
      'Incorrect RCD selection',
      'Cables installed in thermal insulation',
    ],
    correctAnswer: 0,
    explanation:
      'Loose connections are the headline cause: the resistance at a poor joint dissipates heat exactly where the heat cannot escape, and it gets worse over time. That makes installation discipline and periodic inspection the two defences. An undersized protective conductor is a fault-protection problem, RCD selection is a shock and additional-protection question, and a cable in insulation is a current-carrying capacity issue — all real faults, none of them the leading fire cause.',
    section: 'Site hazards, electrical dangers and accident prevention',
    difficulty: 'basic',
    topic: 'Electrical fire causes',
    reference: 'Module 2, Section 2 — Shock, burn, fire and arc',
  },
  {
    id: 58,
    question:
      'What distinguishes direct contact from indirect contact, in terms of the protective measure that addresses each?',
    options: [
      'Direct contact is addressed by RCDs; indirect contact is addressed by basic insulation',
      'Direct contact is touching a live part, stopped by basic protection; indirect contact is touching something that has become live, stopped by automatic disconnection',
      'Direct contact applies at low voltage; indirect contact applies only at high voltage',
      'Direct contact is a shock from a line conductor; indirect contact is a shock from a neutral conductor',
    ],
    correctAnswer: 1,
    explanation:
      'Direct contact means touching a part that is live in normal service, and basic protection — insulation, barriers, enclosures — is what stops it. Indirect contact means touching an exposed-conductive-part that has become live under fault conditions, and automatic disconnection of supply, supported by additional protection, is what addresses it. Pairing direct contact with RCDs and indirect contact with basic insulation reverses the two, and neither the voltage band nor which conductor is involved is what separates them.',
    section: 'Site hazards, electrical dangers and accident prevention',
    difficulty: 'intermediate',
    topic: 'Direct and indirect contact',
    reference: 'Module 2, Section 2 — Shock',
  },
  {
    id: 59,
    question:
      'You are sweeping a domestic job for hazards before starting. Which hazard family carries the highest consequence if missed?',
    options: [
      'People — customers, children and pets in the work zone',
      'Environment — lighting, temperature and the weather that day',
      'Concealed services — cables and pipes buried in the fabric',
      'Fabric — the condition of the plaster, joists and fixings',
    ],
    correctAnswer: 2,
    explanation:
      'Concealed services are the highest-consequence hazard, which is why the approach is detector plus visual plus caution, and why any positive or intermittent reading is treated as a positive find until proven otherwise. People, environment and fabric are the other three families in the sweep and all matter — but a drill into a live cable or a gas pipe is the one that kills immediately.',
    section: 'Site hazards, electrical dangers and accident prevention',
    difficulty: 'intermediate',
    topic: 'Dynamic risk assessment',
    reference: 'Module 2, Section 2 — The five minutes before the toolbox opens',
  },
  {
    id: 60,
    question:
      'Under HASAWA section 3, to whom does a contractor owe a duty in respect of their work?',
    options: [
      'Their own employees only, with other trades covered by their own employers',
      'Persons not in their employment who may be affected by the work',
      'The client and the principal contractor, as the parties to the contract',
      'Anyone on site who has attended the site induction',
    ],
    correctAnswer: 1,
    explanation:
      'Section 3 extends the duty to persons not in your employment who may be affected by how you conduct your undertaking — which is exactly why children in the work zone of a domestic job are a textbook section 3 issue. Section 2 covers your own employees; the duty is not limited by contract, so naming the client and principal contractor misses most of the people at risk; and attending an induction has nothing to do with whether the duty is owed.',
    section: 'Site hazards, electrical dangers and accident prevention',
    difficulty: 'advanced',
    topic: 'Duties to non-employees',
    reference: 'HSWA 1974 Section 3',
  },
  {
    id: 61,
    question:
      'Under WAHR 2005, what height must a fall be from before the Regulations apply?',
    options: [
      'Two metres, measured from the working platform to the surface below',
      'One and a half metres, or any height where a fragile surface is involved',
      'There is no height threshold — the Regulations apply wherever a fall could cause injury',
      'Any height above the operative’s own standing height',
    ],
    correctAnswer: 2,
    explanation:
      'The Work at Height Regulations 2005 have no height threshold: if a fall could cause injury, they apply. The two-metre figure is a persistent piece of folklore from superseded legislation and is the most convincing wrong answer here. The other two options invent thresholds that appear nowhere.',
    section: 'Site hazards, electrical dangers and accident prevention',
    difficulty: 'basic',
    topic: 'Work at height',
    reference: 'Work at Height Regulations 2005',
  },
  {
    id: 62,
    question:
      'PUWER 1998 applies to work equipment. Where an operative brings their own tool onto site, who carries the duty?',
    options: [
      'The user firm, because PUWER applies to all equipment used at work',
      'The individual operative, because the tool is their personal property',
      'The hire shop or retailer that supplied it, under product safety law',
      'Nobody, because PUWER applies only to equipment provided by the employer',
    ],
    correctAnswer: 0,
    explanation:
      'PUWER covers all work equipment, including hired equipment and equipment an operative brings themselves, and the duty sits with the user firm — the pre-use check is the firm’s defence. Treating ownership as the test would let any duty be avoided by bringing your own tool. A supplier has product obligations, but that does not displace the user firm’s PUWER duty.',
    section: 'Site hazards, electrical dangers and accident prevention',
    difficulty: 'advanced',
    topic: 'PUWER',
    reference: 'PUWER 1998 Regulation 6',
  },
  {
    id: 63,
    question:
      'Why is near-miss reporting described as the highest-value preventive activity on site?',
    options: [
      'Because it is a statutory requirement under RIDDOR alongside reportable injuries',
      'Because near misses are leading indicators, so acting on them prevents the injury',
      'Because it transfers liability from the individual to the firm’s insurers',
      'Because it produces the statistics used to calculate a site’s accident frequency rate',
    ],
    correctAnswer: 1,
    explanation:
      'A near miss is a leading indicator: it tells you about a failure before anybody is hurt, while a RIDDOR report or an insurance claim is a lagging indicator that only measures harm already done. Near misses are not RIDDOR-reportable in their own right — dangerous occurrences are a separate defined list. Reporting does not shift liability, and accident frequency rates are built from actual injuries.',
    section: 'Site hazards, electrical dangers and accident prevention',
    difficulty: 'intermediate',
    topic: 'Near-miss reporting',
    reference: 'Module 2, Section 2 — Leading and lagging indicators',
  },
  {
    id: 64,
    question:
      'A confined space is defined by a two-part test. What are the two parts?',
    options: [
      'A space below ground level, and restricted access or egress',
      'A substantially enclosed space, and a foreseeable specified risk',
      'A space requiring a permit, and the presence of a standby person',
      'A space with no natural ventilation, and a volume below a stated limit',
    ],
    correctAnswer: 1,
    explanation:
      'Both parts must be present: the space is substantially enclosed, and there is a reasonably foreseeable specified risk such as fire, asphyxiation, drowning, hyperthermia or entrapment. That is why a cable riser or a plant room can qualify while a large basement may not. Being below ground, having a permit in place or lacking ventilation are all associated features rather than the definition — and a permit is a control that follows the classification, not a test that creates it.',
    section: 'Site hazards, electrical dangers and accident prevention',
    difficulty: 'advanced',
    topic: 'Confined spaces',
    reference: 'Confined Spaces Regulations 1997',
  },

  // ── Section 3 · Asbestos and hazardous substances ────────────────────────
  {
    id: 65,
    question: 'Why is the year 2000 the line for asbestos suspicion in buildings?',
    options: [
      'Because the Control of Asbestos Regulations came into force in 2000',
      'Because asbestos surveys became compulsory for all premises from 2000',
      'Because the last asbestos type in use, chrysotile, was banned in the UK in 1999',
      'Because building regulations first required a materials register from 2000',
    ],
    correctAnswer: 2,
    explanation:
      'Chrysotile — white asbestos, by far the most heavily used type in the UK — was the last to be banned, in 1999, which is where the pre-2000 presumption comes from. CAR 2012 is the current regulation and is later than the date; surveys are required in defined circumstances rather than universally from 2000; and no building regulation created the line.',
    section: 'Asbestos and hazardous substances',
    difficulty: 'basic',
    topic: 'The pre-2000 presumption',
    reference: 'Control of Asbestos Regulations 2012',
  },
  {
    id: 66,
    question:
      'Under CAR 2012 Regulation 4, where is an asbestos register required?',
    options: [
      'In all premises, domestic and non-domestic alike',
      'In non-domestic premises and the common parts of multi-occupied residential premises',
      'In premises built before 1985 only, when crocidolite and amosite were prohibited',
      'In any premises where a refurbishment survey has previously been carried out',
    ],
    correctAnswer: 1,
    explanation:
      'The duty to manage under Regulation 4 covers non-domestic premises and the common parts of multi-occupied residential premises. Individual domestic dwellings sit outside the register requirement — though the rest of CAR 2012 and your own duties do not change with the building type. The 1985 prohibition applied to crocidolite and amosite only, and a previous survey does not define where the duty falls.',
    section: 'Asbestos and hazardous substances',
    difficulty: 'intermediate',
    topic: 'The duty to manage',
    reference: 'CAR 2012 Regulation 4',
  },
  {
    id: 67,
    question:
      'Which survey type is required before significant alteration or refurbishment work?',
    options: [
      'A management survey, because it establishes what is present for the register',
      'A refurbishment and demolition survey, because it is a pre-disturbance survey',
      'A clearance air test, because it confirms the area is safe to work in',
      'A condition survey, because it records the state of any material found',
    ],
    correctAnswer: 1,
    explanation:
      'A refurbishment and demolition survey is intrusive and carried out before the fabric is disturbed, which is what the work requires. A management survey supports day-to-day occupation and the register but does not go looking behind the finishes. A clearance air test comes after licensed removal, to confirm reoccupation, and is not a survey at all — nor is a "condition survey", which is not one of the two recognised types.',
    section: 'Asbestos and hazardous substances',
    difficulty: 'intermediate',
    topic: 'Asbestos surveys',
    reference: 'CAR 2012 — survey types',
  },
  {
    id: 68,
    question:
      'You lift a ceiling tile and suspect the board above it is asbestos insulating board. What is the correct sequence?',
    options: [
      'Stop, do not disturb it, vacate and close off the area, document it and escalate',
      'Take a small sample for analysis, bag it, and send it to an accredited laboratory',
      'Replace the tile carefully, complete the day’s work elsewhere, and report at the end of the shift',
      'Damp the material down, seal the edges with tape, and continue in the adjacent area',
    ],
    correctAnswer: 0,
    explanation:
      'Stop, do not disturb, vacate and close off, document and escalate — and do not restart until it is confirmed or handed to a licensed contractor. You do not sample: taking a sample is itself a disturbance and sampling is specialist work. Carrying on and reporting later leaves others exposed in the meantime, and damping or sealing is work on the material, which for AIB is licensed work.',
    section: 'Asbestos and hazardous substances',
    difficulty: 'intermediate',
    topic: 'Discovery procedure',
    reference: 'Module 2, Section 3 — Pre-2000 buildings and ACMs',
  },
  {
    id: 69,
    question:
      'Work on asbestos insulating board, sprayed coatings and pipe lagging falls into which category?',
    options: [
      'Non-licensed work, provided the operative holds Category A awareness training',
      'Notifiable non-licensed work, with 14-day notification and medical surveillance',
      'Licensed work, which may only be carried out by an HSE-licensed contractor',
      'Unregulated work, provided the material is in good condition and undamaged',
    ],
    correctAnswer: 2,
    explanation:
      'AIB, sprayed coatings and lagging are licensed work and can only be done by an HSE-licensed contractor, because they are the most friable materials and release fibres readily. Notifiable non-licensed work is a genuine middle category but it does not extend to these materials, awareness training is not a licence to work on anything, and no asbestos work is unregulated.',
    section: 'Asbestos and hazardous substances',
    difficulty: 'advanced',
    topic: 'Licensed and non-licensed work',
    reference: 'CAR 2012 Regulation 8',
  },
  {
    id: 70,
    question:
      'Can you identify the type of asbestos in a material by its colour on site?',
    options: [
      'Yes — white, brown and blue are visually distinct once the surface is exposed',
      'Yes, for cement products, but not for insulating board or lagging',
      'No — identification requires laboratory analysis, and you do not sample',
      'No, but a calibrated fibre counter will give a reliable type on site',
    ],
    correctAnswer: 2,
    explanation:
      'You cannot identify the type by eye; bulk samples go to an accredited laboratory for polarised light microscopy, and sampling is not your job. The colour names are historical descriptions of the raw mineral, not of the finished product as you find it in a building. And a fibre counter counts airborne fibres — phase-contrast microscopy — rather than identifying the type in a material.',
    section: 'Asbestos and hazardous substances',
    difficulty: 'intermediate',
    topic: 'Asbestos identification',
    reference: 'Module 2, Section 3 — Why there is more than one kind',
  },
  {
    id: 71,
    question:
      'Under COSHH 2002 Regulation 6, when must the assessment for a hazardous substance be carried out?',
    options: [
      'Before exposure, whatever stage the substance arrives on site at',
      'Before the substance is ordered by the firm',
      'Within 14 days of the substance arriving on site',
      'At the same time as the annual review of the COSHH register',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 6 requires the assessment before exposure — which is why bringing a substance on site to use without a safety data sheet in the register is a Regulation 6 breach. Tying it to ordering is earlier than the duty and does not match how substances actually arrive on a job; a 14-day window and an annual review both allow exposure to happen first.',
    section: 'Asbestos and hazardous substances',
    difficulty: 'intermediate',
    topic: 'COSHH assessment',
    reference: 'COSHH 2002 Regulation 6',
  },
  {
    id: 72,
    question:
      'Which substances sit outside COSHH 2002 and are controlled under their own regulations?',
    options: [
      'Solder fume, cable lubricant and two-pack resins',
      'Asbestos, lead and ionising radiation',
      'Brick acid, battery electrolyte and refrigerant gases',
      'Silica dust, wood dust and contact cleaner',
    ],
    correctAnswer: 1,
    explanation:
      'Asbestos, lead and ionising radiation each have their own regulations and sit outside COSHH. Everything in the other three groups is a COSHH substance and needs an assessment and a safety data sheet — solder fume, silica dust and refrigerants included. Grouping the everyday trade chemicals as exempt is exactly the mistake that leaves a job with no assessment.',
    section: 'Asbestos and hazardous substances',
    difficulty: 'advanced',
    topic: 'Scope of COSHH',
    reference: 'COSHH 2002 — scope',
  },
  {
    id: 73,
    question:
      'A safety data sheet has 16 fixed sections. Which section gives the first-aid measures?',
    options: [
      'Section 2',
      'Section 4',
      'Section 8',
      'Section 13',
    ],
    correctAnswer: 1,
    explanation:
      'Section 4 is first aid, and it sits near the front precisely because exposure incidents are time-critical. Section 2 gives the hazard identification, Section 8 gives exposure controls and PPE, and Section 13 covers disposal — all three are operationally important, which is why they make plausible wrong answers, and all three are the ones to read before you open the container rather than after the spill.',
    section: 'Asbestos and hazardous substances',
    difficulty: 'basic',
    topic: 'Safety data sheets',
    reference: 'CLP Regulation — 16-section SDS format',
  },
  {
    id: 74,
    question:
      'Under EPA 1990 section 34, what happens to the waste duty of care once the waste leaves your site?',
    options: [
      'It transfers to the carrier, who becomes the holder of the waste',
      'It transfers to the receiving facility once the load is tipped',
      'It is discharged, provided a transfer note was completed',
      'It stays with the producer — the duty is strict liability and does not transfer',
    ],
    correctAnswer: 3,
    explanation:
      'The section 34 duty of care is strict liability and the producer firm remains on the hook after the waste leaves — which is why you use an authorised carrier and keep the transfer paperwork. The carrier and the receiving facility take on their own duties, but that is in addition rather than instead. And completing a transfer note is evidence of discharging the duty, not a release from it.',
    section: 'Asbestos and hazardous substances',
    difficulty: 'advanced',
    topic: 'Waste duty of care',
    reference: 'Environmental Protection Act 1990 Section 34',
  },
  {
    id: 75,
    question:
      'You are removing fluorescent tubes and lead-acid batteries from a stripped-out plant room. What paperwork must accompany the load?',
    options: [
      'A hazardous waste consignment note, retained for at least three years',
      'A standard waste transfer note, retained for at least two years',
      'A WEEE declaration from the producer, retained for one year',
      'No paperwork, provided the load goes to an authorised treatment facility',
    ],
    correctAnswer: 0,
    explanation:
      'Fluorescent tubes and lead-acid batteries are hazardous waste, so each transfer needs a hazardous waste consignment note, retained for at least three years. A standard transfer note with its two-year retention covers non-hazardous waste — the two-year figure is right for the wrong document. A WEEE declaration is not a substitute for the consignment note, and an authorised destination does not remove the need for the paperwork.',
    section: 'Asbestos and hazardous substances',
    difficulty: 'advanced',
    topic: 'Hazardous waste paperwork',
    reference: 'Hazardous Waste Regulations 2005',
  },
  {
    id: 76,
    question:
      'You find an unmarked container of liquid in a plant room you are working in. What do you do?',
    options: [
      'Smell it carefully to narrow down what it is before deciding',
      'Pour it into the nearest foul drain, since it is a small quantity',
      'Treat it as unknown — do not handle it without PPE, and do not transfer or dispose of it informally',
      'Label it "unknown solvent" and add it to the general waste skip',
    ],
    correctAnswer: 2,
    explanation:
      'An unmarked container is an unknown, and the protocol is not to handle it without PPE, not to transfer or dispose of it informally, and to treat it as hazardous waste until identified. Smelling it is an exposure by inhalation — the very thing the protocol is designed to prevent. Pouring it away is a pollution offence with strict liability, and putting it in general waste risks contaminating the whole load.',
    section: 'Asbestos and hazardous substances',
    difficulty: 'intermediate',
    topic: 'Unknown substances',
    reference: 'Module 2, Section 3 — Unknown-substance protocol',
  },

  // ── Section 4 · Access equipment, PPE and reporting procedures ────────────
  {
    id: 77,
    question:
      'Under WAHR 2005 Regulation 6, what is the three-tier hierarchy for work at height?',
    options: [
      'Avoid the work at height; prevent the fall; minimise the distance and consequences of a fall',
      'Assess the task; select the equipment; inspect it before use',
      'Provide edge protection; provide a harness; provide an airbag or net',
      'Eliminate; substitute; provide personal protective equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Avoid, prevent, minimise — and the order matters in court, because you have to justify why you did not do the tier above. Assess-select-inspect describes good practice in choosing kit but is not the statutory hierarchy. Edge protection, harness and net are examples of controls rather than the hierarchy itself. And the general eliminate-substitute-PPE hierarchy is the MHSWR one, which applies alongside but is not what Regulation 6 sets out.',
    section: 'Access equipment, PPE and reporting procedures',
    difficulty: 'intermediate',
    topic: 'Work at height hierarchy',
    reference: 'Work at Height Regulations 2005 Regulation 6',
  },
  {
    id: 78,
    question:
      'A leaning ladder is being used for access. What angle should it be set at?',
    options: [
      'Sixty degrees, a 1:2 ratio of out to up',
      'Seventy-five degrees, a 1:4 ratio of out to up',
      'Eighty degrees, a 1:6 ratio of out to up',
      'Forty-five degrees, a 1:1 ratio of out to up',
    ],
    correctAnswer: 1,
    explanation:
      'Seventy-five degrees, which is one out for every four up, and professional ladders carry a tilt indicator on the stile to confirm it. Setting it shallower at 60 or 45 degrees makes the foot far more likely to slide out; setting it steeper at 80 degrees makes it liable to tip backwards, particularly as you reach the top.',
    section: 'Access equipment, PPE and reporting procedures',
    difficulty: 'basic',
    topic: 'Ladders',
    reference: 'Module 2, Section 4 — Access equipment selection',
  },
  {
    id: 79,
    question:
      'Under WAHR 2005 Regulation 12, at what maximum interval must a tower scaffold in use be inspected?',
    options: [
      'Every 24 hours before first use each day',
      'At intervals not exceeding 7 days',
      'At intervals not exceeding 28 days',
      'Every 6 months, in line with LOLER thorough examination',
    ],
    correctAnswer: 1,
    explanation:
      'Inspection after assembly and then at intervals not exceeding seven days, with the record at the access point. A daily pre-use visual check is good practice and is a separate thing from the statutory inspection. Twenty-eight days is too long, and the six-month figure belongs to LOLER thorough examination of equipment used for lifting persons, not to scaffold inspection.',
    section: 'Access equipment, PPE and reporting procedures',
    difficulty: 'advanced',
    topic: 'Tower scaffold inspection',
    reference: 'Work at Height Regulations 2005 Regulation 12',
  },
  {
    id: 80,
    question:
      'Under LOLER 1998, how often must lifting equipment used for lifting persons receive a thorough examination?',
    options: [
      'Every 3 months',
      'Every 6 months',
      'Every 12 months',
      'Every 14 months',
    ],
    correctAnswer: 1,
    explanation:
      'Six months for equipment used to lift persons, such as a MEWP; twelve months for other lifting equipment, or in accordance with an examination scheme. The twelve-month figure is right for the wrong category, and fourteen months is the COSHH interval for thorough examination and test of local exhaust ventilation — a different regime entirely.',
    section: 'Access equipment, PPE and reporting procedures',
    difficulty: 'advanced',
    topic: 'LOLER thorough examination',
    reference: 'LOLER 1998 Regulation 9',
  },
  {
    id: 81,
    question:
      'Which standard identifies a glove as an electrically insulating glove?',
    options: [
      'BS EN 388, with the mechanical hazard pictogram and four-digit rating',
      'BS EN 60903, with a class rating — Class 0 for 1000 V a.c.',
      'BS EN 61482, with an ATPV value expressed in cal/cm²',
      'BS EN 60900, with the double-triangle 1000 V mark',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 60903 is the only specification that means "insulating glove", and Class 0 is the LV standard at 1000 V a.c. BS EN 388 is mechanical protection — cut, abrasion, tear and puncture — and a cut-resistant glove offers no electrical protection at all. BS EN 61482 is arc-flash clothing, and BS EN 60900 is insulated hand tools. Gloves stop shock, arc kit stops flash, and insulated tools stop the screwdriver becoming the conductor.',
    section: 'Access equipment, PPE and reporting procedures',
    difficulty: 'advanced',
    topic: 'PPE standards',
    reference: 'BS EN 60903 · BS EN 60900 · BS EN 61482',
  },
  {
    id: 82,
    question:
      'Who pays for PPE that an employee is required to wear at work?',
    options: [
      'The employer — no charge may be made to the employee',
      'The employee, who may reclaim the cost against tax',
      'The employer for specialist items, and the employee for general items such as boots',
      'The principal contractor, recharged to the employer through the site preliminaries',
    ],
    correctAnswer: 0,
    explanation:
      'HASAWA section 9 prohibits any charge to an employee for anything done or provided under a statutory requirement, and the PPE Regulations require the employer to provide suitable PPE — so no charge, for any item, specialist or general. Tax relief is irrelevant to the duty, and however the cost is passed around commercially between contractors, it never lands on the worker.',
    section: 'Access equipment, PPE and reporting procedures',
    difficulty: 'intermediate',
    topic: 'Provision of PPE',
    reference: 'HSWA 1974 Section 9 · PPE Regulations 1992 (as amended 2022)',
  },
  {
    id: 83,
    question:
      'An operative has a full beard and the task requires tight-fitting respiratory protective equipment. What is the correct approach?',
    options: [
      'Fit the mask more tightly and carry out a fit check before each use',
      'Use a powered air-purifying respirator with a loose-fitting hood',
      'Apply a barrier cream at the seal line to improve the face-piece seal',
      'Shorten the duration of the task so exposure stays below the short-term limit',
    ],
    correctAnswer: 1,
    explanation:
      'Tight-fitting RPE only seals on a clean-shaven face, and HSE guidance is explicit: where facial hair prevents a seal, the answer is loose-fitting powered equipment with a hood. Over-tightening does not create a seal through hair, barrier creams do not either, and shortening the task assumes an exposure figure you cannot rely on because the protection factor is unknown once the seal has failed.',
    section: 'Access equipment, PPE and reporting procedures',
    difficulty: 'intermediate',
    topic: 'Respiratory protection and face fit',
    reference: 'HSE INDG479 · HSG53',
  },
  {
    id: 84,
    question:
      'Under RIDDOR, within what period must an over-seven-day injury be reported?',
    options: [
      '10 days',
      '15 days',
      '21 days',
      '30 days',
    ],
    correctAnswer: 1,
    explanation:
      'Fifteen days for an over-seven-day injury. Ten days is the period for the other reportable categories submitted on the F2508 — near enough to be the most convincing wrong answer here. Twenty-one days is the minimum period on an improvement notice and the appeal window, and thirty days appears nowhere in RIDDOR. A late report is a separate offence in its own right.',
    section: 'Access equipment, PPE and reporting procedures',
    difficulty: 'advanced',
    topic: 'RIDDOR timescales',
    reference: 'RIDDOR 2013 — reporting timescales',
  },

  // ── Section 5 · Sustainability, ecology and waste disposal ───────────────
  {
    id: 85,
    question:
      'What is the order of the waste hierarchy that regulation 12 of the Waste (England and Wales) Regulations 2011 makes a legal duty?',
    options: [
      'Prevention, preparation for re-use, recycling, other recovery, disposal',
      'Recycling, prevention, re-use, disposal, other recovery',
      'Segregation, consignment, recovery, recycling, landfill',
      'Re-use, recycling, prevention, disposal, other recovery',
    ],
    correctAnswer: 0,
    explanation:
      'Prevention first, then preparing for re-use, then recycling, then other recovery, and disposal last. It is a legal duty rather than good practice. The alternatives move recycling or re-use above prevention, which inverts the whole point — the largest saving is always the material you never ordered. Segregation and consignment are mechanisms for handling waste, not tiers of the hierarchy.',
    section: 'Sustainability, ecology and waste disposal',
    difficulty: 'intermediate',
    topic: 'The waste hierarchy',
    reference: 'Waste (England and Wales) Regulations 2011 regulation 12',
  },
  {
    id: 86,
    question:
      'Why does putting a few fluorescent tubes into a mixed general skip create a problem beyond the cost?',
    options: [
      'The skip will be rejected at the transfer station and returned to site',
      'The tubes are WEEE, so they must be counted separately for producer reporting',
      'Mixing hazardous with non-hazardous waste contaminates the entire stream and is itself a breach',
      'The transfer note must then list every individual item in the load',
    ],
    correctAnswer: 2,
    explanation:
      'Mixing contaminates the whole load, so the entire skip becomes hazardous waste — and the mixing is itself a breach, quite apart from the disposal cost. Rejection at the transfer station is a possible commercial consequence rather than the legal problem; producer reporting under WEEE is a separate obligation; and a transfer note does not require an item-by-item list.',
    section: 'Sustainability, ecology and waste disposal',
    difficulty: 'intermediate',
    topic: 'Segregation at source',
    reference: 'Hazardous Waste Regulations 2005 · EPA 1990 Section 34',
  },
  {
    id: 87,
    question:
      'You are replacing a distribution board and a run of luminaires in a commercial unit. Which regime covers the equipment you are taking out?',
    options: [
      'WEEE — segregate, consign via an authorised carrier and deliver to an approved treatment facility',
      'The F-Gas Regulations, because the switchgear may contain insulating gas',
      'The Environmental Permitting Regulations, which require a bespoke permit for each load',
      'None — redundant equipment is scrap metal once it has been disconnected',
    ],
    correctAnswer: 0,
    explanation:
      'Distribution boards, switchgear, control panels and luminaires are all WEEE: segregate them, consign them through an authorised carrier and deliver them to an authorised approved treatment facility. F-Gas covers refrigerants in heat pumps and air conditioning, and disturbing that circuit needs certification most electricians do not hold. Environmental permitting is the umbrella framework rather than a per-load permit, and treating the equipment as ordinary scrap ignores both the hazardous components and the audit trail.',
    section: 'Sustainability, ecology and waste disposal',
    difficulty: 'intermediate',
    topic: 'WEEE',
    reference: 'WEEE Regulations 2013',
  },
  {
    id: 88,
    question:
      'You are working in the roof space of an older building and find droppings in a line and greasy staining around a gap in the eaves. What should you do?',
    options: [
      'Clean the area, seal the gap and carry on, since the signs indicate vermin',
      'Take photographs, continue working carefully, and mention it at handover',
      'Stop work in that area, disturb nothing, report it to one named person and wait for a decision in writing',
      'Continue, because signs are only relevant if the animals themselves are seen',
    ],
    correctAnswer: 2,
    explanation:
      'Stop in that area, disturb nothing, report to one named person and wait for the decision in writing. Sealing an access point is worse than the original job — it can trap animals inside a protected roost. Photographing and carrying on still disturbs the area, and treating an absence of sightings as an absence of animals is backwards: seeing nothing in daylight proves nothing.',
    section: 'Sustainability, ecology and waste disposal',
    difficulty: 'intermediate',
    topic: 'Protected species and roof spaces',
    reference: 'Module 2, Section 5 — Where this actually comes up',
  },
  {
    id: 89,
    question:
      'Where should you treat an external gully on site as leading, until somebody proves otherwise?',
    options: [
      'To the foul sewer, and therefore to a treatment works',
      'To an interceptor, which will retain anything you release',
      'Directly to a watercourse',
      'To a soakaway within the site boundary',
    ],
    correctAnswer: 2,
    explanation:
      'Treat every outside gully as a direct pipe to a watercourse until proven otherwise, because pollution offences are strict liability and the cost of being wrong is unlimited. Assuming it goes to foul drainage, through an interceptor, or into a soakaway all lead to the same mistake: releasing something on the basis of a guess about where it ends up.',
    section: 'Sustainability, ecology and waste disposal',
    difficulty: 'basic',
    topic: 'Pollution prevention',
    reference: 'Module 2, Section 5 — The rules arrive before you do',
  },
  {
    id: 90,
    question:
      'Who owns the copper recovered from a strip-out, and how should it be handled?',
    options: [
      'The operative who strips it, as a long-standing custom of the trade',
      'Whoever bought the material — agree it in writing before stripping and keep every weigh-in ticket',
      'The site principal contractor, as the holder of the waste carrier registration',
      'The client, in every case, because it was installed in their building',
    ],
    correctAnswer: 1,
    explanation:
      'Copper ownership follows whoever bought the material, which on different jobs can be the client, the main contractor or your own firm — so it is agreed in writing before stripping starts and every weigh-in ticket goes to the office. Trade custom is exactly the assumption that causes the dispute, holding a carrier registration says nothing about ownership, and the client is sometimes but not always the owner.',
    section: 'Sustainability, ecology and waste disposal',
    difficulty: 'intermediate',
    topic: 'Recovered materials',
    reference: 'Module 2, Section 5 — Waste is money before it is rubbish',
  },
];

export const MODULE_2_QUESTIONS = bank('Health & safety', QUESTIONS);
