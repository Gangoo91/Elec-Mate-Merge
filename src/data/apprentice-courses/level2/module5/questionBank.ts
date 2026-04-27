export interface QuestionBank {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  topic: string;
}

// Module 5 — Unit 210: Communicate with others within building services engineering
// C&G 2365-02 Level 2. 300 questions covering 11 ACs across 3 LOs plus cross-cutting topics.
// Section codes map to assessment criteria:
//   5.1.1 = AC 1.1 (site management team)        5.2.3 = AC 2.3 (customer info)
//   5.1.2 = AC 1.2 (individuals reporting)       5.2.4 = AC 2.4 (company policies)
//   5.1.3 = AC 1.3 (site visitors)               5.3.1 = AC 3.1 (communication methods)
//   5.2.1 = AC 2.1 (statutory legislation)       5.3.2 = AC 3.2 (accessible comms)
//   5.2.2 = AC 2.2 (workplace info)              5.3.3 = AC 3.3 (conflict)
//   5.3.4 = AC 3.4 (effects of poor communication)
//   5.X.1 = cross-cutting (CDM Worker, GDPR, mental health, BS 7671 514.13/514.12, PIDA, Equality Act, ACAS)
export const module5QuestionBank: QuestionBank[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // §5.1.1 — AC 1.1 Site management team & roles (25 questions)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    question:
      'Who is responsible for the day-to-day safety co-ordination of all trades on a CDM 2015 construction project?',
    options: ['Client', 'Principal Designer', 'Principal Contractor', 'Site visitor'],
    correctAnswer: 2,
    explanation:
      'Under CDM 2015 Reg 13, the Principal Contractor plans, manages and monitors the construction phase, including day-to-day co-ordination of trades and site safety.',
    section: '5.1.1',
    difficulty: 'basic',
    topic: 'Site management team',
  },
  {
    id: 2,
    question:
      'On a domestic rewire with one electrician and one apprentice, who carries the CDM 2015 client duties?',
    options: [
      'The apprentice',
      'The householder who commissioned the work',
      'The wholesaler supplying cable',
      'The Building Control surveyor',
    ],
    correctAnswer: 1,
    explanation:
      'Under CDM 2015 Reg 6, the person who commissions the work is the client. For domestic clients the contractor takes on most of the client duties, but the householder is still legally the client.',
    section: '5.1.1',
    difficulty: 'intermediate',
    topic: 'Site management team',
  },
  {
    id: 3,
    question:
      'Which role is appointed by the client to plan, manage and monitor the pre-construction phase?',
    options: ['Principal Contractor', 'Principal Designer', 'Site supervisor', 'Quantity surveyor'],
    correctAnswer: 1,
    explanation:
      'CDM 2015 Reg 11 requires the client to appoint a Principal Designer to co-ordinate health and safety during the pre-construction (design) phase on projects with more than one contractor.',
    section: '5.1.1',
    difficulty: 'basic',
    topic: 'Site management team',
  },
  {
    id: 4,
    question:
      'Your site supervisor asks you to second-fix a circuit you believe is unsafe. What is the correct action?',
    options: [
      'Carry on — the supervisor outranks you',
      'Stop work, raise the concern with the supervisor and document it; escalate to the contracts manager if needed',
      'Walk off site without telling anyone',
      'Wait until the next toolbox talk to mention it',
    ],
    correctAnswer: 1,
    explanation:
      'HASAWA s.7 places a personal duty on every employee to take reasonable care for themselves and others. Stop, report, document — never work around an unsafe instruction.',
    section: '5.1.1',
    difficulty: 'intermediate',
    topic: 'Site management team',
  },
  {
    id: 5,
    question: 'Which member of the site team would normally chair the daily morning briefing on a multi-trade project?',
    options: ['Apprentice', 'Site manager', 'Wholesaler rep', 'Client'],
    correctAnswer: 1,
    explanation:
      'The site manager (working for the Principal Contractor) is responsible for the daily co-ordination briefing covering programme, deliveries, RAMS and welfare.',
    section: '5.1.1',
    difficulty: 'basic',
    topic: 'Site management team',
  },
  {
    id: 6,
    question:
      'On a project with two or more contractors, the client must appoint a Principal Contractor and Principal Designer. What happens if the client fails to make these appointments?',
    options: [
      'The project cannot start',
      'The client takes on those duties themselves under CDM 2015 Reg 5(3)',
      'Building Control automatically appoints them',
      'The HSE appoints them',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 Reg 5(3): if the client fails to make the appointments, the client is treated as carrying out those duties personally. This is why early appointment is critical.',
    section: '5.1.1',
    difficulty: 'advanced',
    topic: 'Site management team',
  },
  {
    id: 7,
    question:
      'On a hospital refurb the contractor appoints a "responsible person" for permits to work in clinical areas. What is the apprentice\'s role in this system?',
    options: [
      'Sign permits on behalf of the supervisor',
      'Work only under a permit issued to a competent person, follow its conditions exactly and never extend it',
      'Issue their own permit if the supervisor is busy',
      'Ignore the permit if the work seems simple',
    ],
    correctAnswer: 1,
    explanation:
      'Permits to work are issued to the named competent person (your supervisor). You work under their permit, follow the conditions, and stop if anything changes.',
    section: '5.1.1',
    difficulty: 'intermediate',
    topic: 'Site management team',
  },
  {
    id: 8,
    question: 'Who typically signs off the Health and Safety File at handover on a CDM 2015 project?',
    options: [
      'The apprentice',
      'The Principal Designer (who compiles it) and hands it to the client at end of construction',
      'The wholesaler',
      'Building Control',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 Reg 12: the Principal Designer prepares the H&S File during pre-construction and updates it through construction; it is handed to the client at handover for future use.',
    section: '5.1.1',
    difficulty: 'advanced',
    topic: 'Site management team',
  },
  {
    id: 9,
    question: 'On a school refurbishment during term-time, who takes the lead on safeguarding co-ordination with the school?',
    options: [
      'The apprentice',
      'The Principal Contractor\'s site manager, liaising with the school\'s designated safeguarding lead',
      'The wholesaler',
      'The pupils',
    ],
    correctAnswer: 1,
    explanation:
      'Safeguarding on live school sites is jointly managed: the site manager controls the works boundary and contractor conduct; the school\'s safeguarding lead handles pupil contact rules.',
    section: '5.1.1',
    difficulty: 'intermediate',
    topic: 'Site management team',
  },
  {
    id: 10,
    question: 'A site agent and a site manager — what is the typical difference in role?',
    options: [
      'No difference, just different names',
      'The site agent is more senior, often running multiple sites or the whole project commercially; the site manager runs the day-to-day operations on one site',
      'The site agent is more junior',
      'Site agents work only on demolition',
    ],
    correctAnswer: 1,
    explanation:
      'Site agent is normally a more senior role with commercial and programme oversight; site manager runs daily operations. Titles vary by employer — always confirm reporting line.',
    section: '5.1.1',
    difficulty: 'intermediate',
    topic: 'Site management team',
  },
  {
    id: 11,
    question:
      'On a small commercial fit-out with three trades, who is the duty holder for welfare facilities (toilets, drying, drinking water)?',
    options: [
      'Each trade looks after their own',
      'The Principal Contractor under CDM 2015 Schedule 2 — welfare must be provided from the start',
      'The client',
      'The Principal Designer',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 Schedule 2 lists minimum welfare standards. The Principal Contractor must provide them throughout construction — not "we\'ll get round to it next week".',
    section: '5.1.1',
    difficulty: 'intermediate',
    topic: 'Site management team',
  },
  {
    id: 12,
    question: 'On site you hear someone called the "QS". What do they do?',
    options: [
      'Quality scaffolder',
      'Quantity surveyor — measures work, values variations and prepares payment applications',
      'Quick supervisor',
      'Quality safety officer',
    ],
    correctAnswer: 1,
    explanation:
      'The Quantity Surveyor (QS) handles commercial measurement, valuations, variations and final account. On big jobs there is a client-side QS and a contractor QS.',
    section: '5.1.1',
    difficulty: 'basic',
    topic: 'Site management team',
  },
  {
    id: 13,
    question: 'On an industrial project the "M&E co-ordinator" role exists. What is their main function?',
    options: [
      'Order food for the canteen',
      'Co-ordinate mechanical and electrical services so trades do not clash in ceilings, risers and plant rooms — usually using a BIM model',
      'Manage the apprentice rota',
      'Sign EICs',
    ],
    correctAnswer: 1,
    explanation:
      'M&E co-ordinators stop services from physically clashing — they run clash-detection on the BIM model and resolve sequencing before kit goes in.',
    section: '5.1.1',
    difficulty: 'advanced',
    topic: 'Site management team',
  },
  {
    id: 14,
    question: 'A project safety advisor visits site monthly. Who do they typically work for?',
    options: [
      'The wholesaler',
      'The Principal Contractor (or a CDM consultancy) — they audit conditions, review RAMS and report to senior management',
      'The HSE only',
      'The client only',
    ],
    correctAnswer: 1,
    explanation:
      'Safety advisors are usually employed by the Principal Contractor or appointed CDM consultants. They audit, advise and feed up to directors — they do not normally manage day-to-day work.',
    section: '5.1.1',
    difficulty: 'intermediate',
    topic: 'Site management team',
  },
  {
    id: 15,
    question:
      'You are an apprentice on your first day on a healthcare site. Who should give you the site induction?',
    options: [
      'Nobody, just crack on',
      'The site manager (or their nominee) — covers site rules, hazards, emergency procedures, welfare and reporting routes',
      'The client',
      'The wholesaler',
    ],
    correctAnswer: 1,
    explanation:
      'Site induction is mandatory before starting work — even if you are only there for a day. CDM 2015 Reg 13 places this duty on the Principal Contractor.',
    section: '5.1.1',
    difficulty: 'basic',
    topic: 'Site management team',
  },
  {
    id: 16,
    question:
      'A small electrical contractor with no main contractor (single-trade, domestic rewire) — who is the Principal Contractor?',
    options: [
      'There isn\'t one; CDM still applies but with simplified duties',
      'The wholesaler',
      'The customer',
      'Building Control',
    ],
    correctAnswer: 0,
    explanation:
      'Single-contractor projects do not need a Principal Contractor or Principal Designer. CDM still applies — that single contractor takes on those duties to the extent reasonable.',
    section: '5.1.1',
    difficulty: 'advanced',
    topic: 'Site management team',
  },
  {
    id: 17,
    question: 'On a multi-trade site your supervisor refers to the "PC". What does PC stand for?',
    options: ['Personal computer', 'Principal Contractor', 'Project consultant', 'Plant controller'],
    correctAnswer: 1,
    explanation:
      'On site PC almost always means Principal Contractor — the duty holder under CDM 2015 Reg 12/13 for the construction phase.',
    section: '5.1.1',
    difficulty: 'basic',
    topic: 'Site management team',
  },
  {
    id: 18,
    question:
      'A foreman tells you to ignore the site rule on harnesses because the job is "only five minutes". What do you do?',
    options: [
      'Comply — they outrank you',
      'Refuse politely, do the task with proper fall protection, and report the instruction to your own supervisor',
      'Walk off site',
      'Wait until later to mention it',
    ],
    correctAnswer: 1,
    explanation:
      'WAH Regs 2005 and HASAWA s.7 do not have a "five-minute" exception. Refuse the unsafe instruction, do it safely, and tell your supervisor — they need to know.',
    section: '5.1.1',
    difficulty: 'intermediate',
    topic: 'Site management team',
  },
  {
    id: 19,
    question:
      'On a JIB-graded contracting firm, who is the technical lead on electrical matters that the apprentice consults?',
    options: [
      'The wholesaler',
      'The Approved Electrician or Technician grade who supervises their work',
      'The client',
      'The HSE',
    ],
    correctAnswer: 1,
    explanation:
      'JIB grades define competency: Apprentice → Electrician → Approved Electrician → Technician. The supervising Approved Electrician or Technician is the apprentice\'s first technical contact.',
    section: '5.1.1',
    difficulty: 'intermediate',
    topic: 'Site management team',
  },
  {
    id: 20,
    question: 'A client representative attends weekly progress meetings. Who do they communicate with on the contractor side?',
    options: [
      'The apprentice',
      'The contractor\'s project/site manager and commercial lead — not individual trades',
      'The wholesaler',
      'Random operatives',
    ],
    correctAnswer: 1,
    explanation:
      'Communication discipline: clients deal with the contractor\'s management. Trades do not negotiate directly with clients — that bypasses contract control.',
    section: '5.1.1',
    difficulty: 'intermediate',
    topic: 'Site management team',
  },
  {
    id: 21,
    question:
      'Which CDM 2015 regulation places the duty on the Principal Contractor to draw up the construction phase plan?',
    options: ['Reg 5', 'Reg 12', 'Reg 15', 'Reg 22'],
    correctAnswer: 1,
    explanation:
      'CDM 2015 Reg 12 requires the Principal Contractor to plan, manage and monitor construction, including drawing up the construction phase plan before work starts.',
    section: '5.1.1',
    difficulty: 'advanced',
    topic: 'Site management team',
  },
  {
    id: 22,
    question:
      'On a high-rise residential refurb (HRRB) covered by the Building Safety Act 2022, an additional duty holder is the:',
    options: [
      'Wholesaler',
      'Principal Accountable Person, with golden-thread information duties through the Building Safety Regulator',
      'Apprentice',
      'Client only',
    ],
    correctAnswer: 1,
    explanation:
      'BSA 2022 introduces the Principal Accountable Person for higher-risk buildings (HRRBs). They hold the golden-thread information and engage with the Building Safety Regulator.',
    section: '5.1.1',
    difficulty: 'advanced',
    topic: 'Site management team',
  },
  {
    id: 23,
    question:
      'On a domestic EICR your supervisor is the only person on site and they are absent for an hour. The customer asks you to make a circuit live again. What do you do?',
    options: [
      'Energise it — the customer asked',
      'Decline politely, explain you cannot energise without your supervisor present, and call them for guidance',
      'Argue with the customer',
      'Leave the property',
    ],
    correctAnswer: 1,
    explanation:
      'EAWR 1989 Reg 16 — competence requirement. As an apprentice you do not have authority to make decisions about energising; defer to your supervisor and explain politely to the customer.',
    section: '5.1.1',
    difficulty: 'intermediate',
    topic: 'Site management team',
  },
  {
    id: 24,
    question: 'A "clerk of works" on site reports to whom?',
    options: [
      'The Principal Contractor',
      'The client (employer) — they are the client\'s eyes and ears for quality on site',
      'The HSE',
      'The wholesaler',
    ],
    correctAnswer: 1,
    explanation:
      'Clerks of works are appointed by the client to monitor quality and workmanship. They report findings up to the contract administrator and client — independent of the contractor.',
    section: '5.1.1',
    difficulty: 'advanced',
    topic: 'Site management team',
  },
  {
    id: 25,
    question:
      'You\'re given conflicting instructions by two supervisors — your direct line manager and the site manager from another firm. Who do you follow?',
    options: [
      'The loudest one',
      'Your direct line manager, then raise the conflict so the two managers can resolve it',
      'The other firm\'s manager',
      'Neither — make your own decision',
    ],
    correctAnswer: 1,
    explanation:
      'You report through your own line of supervision. Conflicting instructions get escalated upward, not resolved by the apprentice picking a side.',
    section: '5.1.1',
    difficulty: 'basic',
    topic: 'Site management team',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // §5.1.2 — AC 1.2 Individuals reporting (25 questions)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 26,
    question: 'On a typical contracting site, who does the apprentice report to first?',
    options: ['The client directly', 'The supervising electrician or charge hand', 'The HSE', 'The wholesaler'],
    correctAnswer: 1,
    explanation:
      'Apprentices report through the line of supervision — usually the supervising electrician or charge hand, who in turn reports to the site manager or contracts manager.',
    section: '5.1.2',
    difficulty: 'basic',
    topic: 'Reporting lines',
  },
  {
    id: 27,
    question: 'You discover a damaged 110V transformer at the start of shift. Who do you report it to?',
    options: [
      'No one — just swap it out',
      'Your supervisor straight away, then quarantine the item and complete a defect report',
      'The client',
      'Wait until the end of the day and mention it casually',
    ],
    correctAnswer: 1,
    explanation:
      'PUWER 1998 Reg 5 and HASAWA s.7 require defective equipment to be reported and removed from use. Tell your supervisor, isolate/quarantine, log it.',
    section: '5.1.2',
    difficulty: 'basic',
    topic: 'Reporting lines',
  },
  {
    id: 28,
    question: 'A near-miss on site (someone almost stepped through an unguarded floor opening) should be reported to:',
    options: [
      'No one if no injury occurred',
      'The site manager, recorded in the accident/incident book and used to update the RA',
      'Only if a colleague was injured',
      'The wholesaler',
    ],
    correctAnswer: 1,
    explanation:
      'Near-misses are gold-dust learning events. Report to site management, log it, update the risk assessment so the next person is protected.',
    section: '5.1.2',
    difficulty: 'intermediate',
    topic: 'Reporting lines',
  },
  {
    id: 29,
    question: 'Who is the correct first contact for a payroll or working-time issue you encounter as an apprentice?',
    options: [
      'Your training provider directly',
      'Your employer (line manager or office contact), with your training provider as a secondary route',
      'The HSE',
      'Your client',
    ],
    correctAnswer: 1,
    explanation:
      'Employment matters go to your employer first. The training provider is a backstop if your employer cannot or will not resolve the issue.',
    section: '5.1.2',
    difficulty: 'intermediate',
    topic: 'Reporting lines',
  },
  {
    id: 30,
    question: 'On a JCT contract, who does the main contractor report variations and progress to?',
    options: [
      'The HSE',
      'The contract administrator (often the architect or surveyor acting for the client)',
      'The Principal Designer',
      'The wholesaler',
    ],
    correctAnswer: 1,
    explanation:
      'On JCT contracts the contract administrator is the formal communication route between contractor and client for variations, payment applications and progress.',
    section: '5.1.2',
    difficulty: 'advanced',
    topic: 'Reporting lines',
  },
  {
    id: 31,
    question: 'A subcontracted electrical contractor reports up to which role on a CDM 2015 project?',
    options: [
      'Directly to the client',
      'The Principal Contractor (who co-ordinates all trades)',
      'The Principal Designer',
      'Building Control',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 Reg 13: the Principal Contractor co-ordinates all contractors on site. Subcontractors report to the Principal Contractor on programme, RAMS and progress.',
    section: '5.1.2',
    difficulty: 'intermediate',
    topic: 'Reporting lines',
  },
  {
    id: 32,
    question:
      'You witness a workplace injury that requires hospital attendance. Beyond reporting to your supervisor, what other reporting may apply?',
    options: [
      'Nothing else',
      'RIDDOR 2013 reporting by the responsible person if the injury is over-7-day, specified or fatal',
      'A toolbox talk only',
      'Only an internal email',
    ],
    correctAnswer: 1,
    explanation:
      'RIDDOR 2013 requires reporting of specified injuries (incl. over-7-day absences and certain serious injuries) to the HSE. The duty falls on the employer/responsible person.',
    section: '5.1.2',
    difficulty: 'intermediate',
    topic: 'Reporting lines',
  },
  {
    id: 33,
    question:
      'You\'re a third-year apprentice and you spot a competence concern with a colleague\'s safe-isolation. What is the correct reporting route?',
    options: [
      'Confront them publicly',
      'Quietly raise it with your supervisor — competence concerns are investigated through the line, not by peers',
      'Post it in a group chat',
      'Tell the client',
    ],
    correctAnswer: 1,
    explanation:
      'Concerns about competence go up the line confidentially. Public confrontation breeds conflict; private supervisor escalation triggers a measured response.',
    section: '5.1.2',
    difficulty: 'intermediate',
    topic: 'Reporting lines',
  },
  {
    id: 34,
    question:
      'A delivery is short — three reels of 2.5mm T&E missing. Who do you tell?',
    options: [
      'The wholesaler driver and let it go',
      'Your supervisor (who handles the supplier dispute) and note the shortage on the signed delivery note',
      'Nobody — order more',
      'The client',
    ],
    correctAnswer: 1,
    explanation:
      'Note the shortage at point of receipt (sign "received short — 3 reels 2.5mm missing") and tell your supervisor. The signed note is the evidence the supplier credits against.',
    section: '5.1.2',
    difficulty: 'basic',
    topic: 'Reporting lines',
  },
  {
    id: 35,
    question:
      'You make an error wiring a circuit and only notice the next day. What is the correct response?',
    options: [
      'Hide it and hope nobody notices',
      'Tell your supervisor immediately, isolate if needed, and put it right — errors caught and corrected are not disciplinary issues; errors hidden are',
      'Blame it on someone else',
      'Wait for testing to find it',
    ],
    correctAnswer: 1,
    explanation:
      'Honest reporting protects everyone. Most employers respond to honest mistakes with coaching; they respond to cover-ups with discipline.',
    section: '5.1.2',
    difficulty: 'basic',
    topic: 'Reporting lines',
  },
  {
    id: 36,
    question:
      'A bullying incident from a senior colleague needs reporting. Who do you go to first per the ACAS Code?',
    options: [
      'A solicitor',
      'Your line manager (or, if they are the perpetrator, their manager or HR)',
      'The HSE',
      'The press',
    ],
    correctAnswer: 1,
    explanation:
      'ACAS Code: try informal raise first with your line manager; if they are the issue, escalate one level up or to HR. Keep a written log of incidents and dates.',
    section: '5.1.2',
    difficulty: 'intermediate',
    topic: 'Reporting lines',
  },
  {
    id: 37,
    question:
      'On a multi-stage project the apprentice attends weekly progress meetings. What is their typical role?',
    options: [
      'Lead the meeting',
      'Observe, take notes for their own learning, and contribute when asked — not negotiate with the client',
      'Sign off variations',
      'Skip them',
    ],
    correctAnswer: 1,
    explanation:
      'Apprentices benefit hugely from sitting in on progress meetings. Listen, learn, take notes — but the formal voice is the supervisor or project manager.',
    section: '5.1.2',
    difficulty: 'basic',
    topic: 'Reporting lines',
  },
  {
    id: 38,
    question:
      'A welfare issue (no hot water, broken loo) on site needs reporting to:',
    options: [
      'The wholesaler',
      'The Principal Contractor\'s site manager — welfare is their CDM 2015 Schedule 2 duty',
      'The HSE only',
      'Your training provider',
    ],
    correctAnswer: 1,
    explanation:
      'Welfare is the Principal Contractor\'s duty under CDM 2015 Sch 2. Tell the site manager — if not resolved, escalate via your employer and ultimately to the HSE.',
    section: '5.1.2',
    difficulty: 'basic',
    topic: 'Reporting lines',
  },
  {
    id: 39,
    question:
      'A subcontractor electrician notices the main contractor is breaching scaffold rules. The correct route is:',
    options: [
      'Ignore it — not your scaffold',
      'Stop your work in the affected area, report to your supervisor and to the Principal Contractor — HASAWA s.3 covers risk to non-employees',
      'Adjust the scaffold yourself',
      'Take photos and post on social media',
    ],
    correctAnswer: 1,
    explanation:
      'HASAWA s.3 — duty to non-employees. Report up your line and to the PC. If unaddressed, escalate to your director and ultimately the HSE.',
    section: '5.1.2',
    difficulty: 'advanced',
    topic: 'Reporting lines',
  },
  {
    id: 40,
    question:
      'A NICEIC scheme assessor visits your site for a routine assessment. Who do they report findings to?',
    options: [
      'You directly',
      'The Qualified Supervisor and the contracting business — non-conformities go on a written report with corrective action timescales',
      'The HSE',
      'The wholesaler',
    ],
    correctAnswer: 1,
    explanation:
      'Scheme assessors (NICEIC, NAPIT, ELECSA) report to the QS and business. Non-conformities are tracked to closure — recurring ones can affect scheme membership.',
    section: '5.1.2',
    difficulty: 'intermediate',
    topic: 'Reporting lines',
  },
  {
    id: 41,
    question:
      'On a domestic install you uncover undisclosed asbestos in a wall you need to chase. What is the correct reporting?',
    options: [
      'Carry on chasing',
      'Stop work immediately, isolate the area, tell the householder and your supervisor — Control of Asbestos Regs 2012 require a refurbishment/demolition survey before disturbing fabric',
      'Cover it with paint',
      'Take a sample home',
    ],
    correctAnswer: 1,
    explanation:
      'CAR 2012 — stop, isolate, do not disturb. Notify the duty holder (householder) and your supervisor. A licensed surveyor or analyst takes it from there.',
    section: '5.1.2',
    difficulty: 'advanced',
    topic: 'Reporting lines',
  },
  {
    id: 42,
    question:
      'You are working alone on a domestic call-out and feel unwell. What is the safest reporting protocol?',
    options: [
      'Push through and finish',
      'Stop work, contact your supervisor or office, leave site safely if able and follow the lone-worker check-in procedure',
      'Tell only the customer',
      'Lock yourself in the van and sleep',
    ],
    correctAnswer: 1,
    explanation:
      'Lone-worker procedures should require regular check-ins. If you feel unwell, tell the office, stop work, get help. Health beats finishing the job every time.',
    section: '5.1.2',
    difficulty: 'intermediate',
    topic: 'Reporting lines',
  },
  {
    id: 43,
    question:
      'On a final account meeting the QS challenges a variation valuation. The site supervisor was not on site that day. Who has the contemporaneous record?',
    options: [
      'No one',
      'The site diary kept by whoever was supervising — that record carries weight in commercial disputes',
      'The wholesaler',
      'The client',
    ],
    correctAnswer: 1,
    explanation:
      'Site diaries are routinely used in commercial dispute resolution. A clear, dated, contemporaneous entry is much harder to challenge than memory months later.',
    section: '5.1.2',
    difficulty: 'advanced',
    topic: 'Reporting lines',
  },
  {
    id: 44,
    question:
      'A heavy snowfall closes the site overnight. The contracts manager wants to know status. Who reports up the line?',
    options: [
      'Each apprentice individually',
      'The site manager — single point of contact upward to the contracts manager',
      'The wholesaler',
      'No one',
    ],
    correctAnswer: 1,
    explanation:
      'Single-point-of-contact discipline avoids confusion. The site manager collates and reports up; trades report to their supervisor; supervisors to the site manager.',
    section: '5.1.2',
    difficulty: 'basic',
    topic: 'Reporting lines',
  },
  {
    id: 45,
    question:
      'A safeguarding concern arises on a school job — an adult is behaving in a way that worries you. The correct first step is:',
    options: [
      'Confront them',
      'Withdraw, tell your site manager and the school\'s Designated Safeguarding Lead — they decide next steps including any police involvement',
      'Post on social media',
      'Wait until the end of the week',
    ],
    correctAnswer: 1,
    explanation:
      'Safeguarding concerns go through the school\'s DSL. The site manager liaises with them. Never confront — observe, withdraw, report.',
    section: '5.1.2',
    difficulty: 'advanced',
    topic: 'Reporting lines',
  },
  {
    id: 46,
    question:
      'A union shop steward visits site. Their role with members is to:',
    options: [
      'Run disciplinary hearings',
      'Represent members in grievance and disciplinary matters and provide a confidential reporting/advice route',
      'Supervise apprentices',
      'Sign EICs',
    ],
    correctAnswer: 1,
    explanation:
      'Shop stewards represent union members in workplace issues. They are an alternative reporting route alongside the formal company line, particularly for grievances.',
    section: '5.1.2',
    difficulty: 'intermediate',
    topic: 'Reporting lines',
  },
  {
    id: 47,
    question:
      'You suspect a colleague is stealing tools. The correct reporting route is:',
    options: [
      'Confront them',
      'Report confidentially to your line manager (or HR), with any evidence — the company decides next steps including police involvement',
      'Post on social media',
      'Steal them back',
    ],
    correctAnswer: 1,
    explanation:
      'Suspected theft is investigated through the company. Confronting risks escalation and may compromise an investigation. Confidential report up the line is the right call.',
    section: '5.1.2',
    difficulty: 'intermediate',
    topic: 'Reporting lines',
  },
  {
    id: 48,
    question:
      'A near-miss involves a falling object that could have hit someone. What is the lesson-loop after reporting?',
    options: [
      'Forget about it',
      'The site manager updates the RA, briefs the team in a toolbox talk, and amends the MS so it cannot recur',
      'Blame an individual',
      'Close the report without action',
    ],
    correctAnswer: 1,
    explanation:
      'Reporting alone is not enough — the lesson loop closes when the RA/MS is updated, the team briefed, and the change verified. That\'s how culture improves.',
    section: '5.1.2',
    difficulty: 'intermediate',
    topic: 'Reporting lines',
  },
  {
    id: 49,
    question:
      'On a CDM 2015 site, who does the Principal Contractor report up to on construction phase progress?',
    options: [
      'The wholesaler',
      'The client (often via the contract administrator) — the client must satisfy themselves the project is being managed safely',
      'The Principal Designer only',
      'The HSE',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 Reg 4: the client must make sure the project is run safely. The PC reports progress up to the client (often via the CA/PM) — the client cannot wash their hands.',
    section: '5.1.2',
    difficulty: 'advanced',
    topic: 'Reporting lines',
  },
  {
    id: 50,
    question:
      'A trainee apprentice reports a problem to their supervisor and is told "not now". What should they do?',
    options: [
      'Drop it',
      'Document the report (time, who, what), follow up later in writing, and escalate one level up if it is a safety matter not addressed',
      'Tell the client',
      'Walk off site',
    ],
    correctAnswer: 1,
    explanation:
      'Document and persist — particularly for safety. "Not now" is fine briefly; it is not fine for a real hazard. Escalate one level if needed.',
    section: '5.1.2',
    difficulty: 'intermediate',
    topic: 'Reporting lines',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // §5.1.3 — AC 1.3 Site visitors (25 questions)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 51,
    question: 'An HSE inspector arrives unannounced at site. What do you do?',
    options: [
      'Refuse them entry',
      'Stay calm, fetch your supervisor and let the inspector see whatever they ask to see',
      'Tell them to leave and come back with an appointment',
      'Stop all work and send everyone home',
    ],
    correctAnswer: 1,
    explanation:
      'HASAWA s.20 gives HSE inspectors the right to enter premises without notice. Co-operate, fetch your supervisor — never lie or obstruct. Obstruction is a criminal offence under s.33.',
    section: '5.1.3',
    difficulty: 'basic',
    topic: 'Site visitors',
  },
  {
    id: 52,
    question: 'A wholesaler delivery driver arrives at site. What is the correct procedure?',
    options: [
      'Wave them straight onto site',
      'Sign them in, brief them on site rules and PPE requirements, and direct them to the unloading area',
      'Leave them to find their own way',
      'Ignore them — they are not your responsibility',
    ],
    correctAnswer: 1,
    explanation:
      'All visitors including delivery drivers must be signed in, given a site induction or briefing appropriate to their visit, and supervised in the work area.',
    section: '5.1.3',
    difficulty: 'basic',
    topic: 'Site visitors',
  },
  {
    id: 53,
    question: 'A potential client asks to walk round an active refurb site to see the work. What is the safest approach?',
    options: [
      'Refuse outright',
      'Arrange an escorted visit outside high-risk activities, with full PPE and a short induction',
      'Let them wander on their own',
      'Tell them to come back when the job is finished',
    ],
    correctAnswer: 1,
    explanation:
      'Visitors are owed a duty of care under HASAWA s.3. Escorted, inducted, full PPE, away from high-risk activities (lifting, hot works, live testing).',
    section: '5.1.3',
    difficulty: 'intermediate',
    topic: 'Site visitors',
  },
  {
    id: 54,
    question:
      'Which document records who is on site at any one time and is essential for emergency evacuation?',
    options: ['RAMS', 'Site diary', 'Visitor sign-in / fire register', 'Job sheet'],
    correctAnswer: 2,
    explanation:
      'The site sign-in book / fire register tracks everyone present so a roll call can be done at the muster point in an emergency.',
    section: '5.1.3',
    difficulty: 'basic',
    topic: 'Site visitors',
  },
  {
    id: 55,
    question: 'A Building Control surveyor visits to inspect first-fix. What do they need from you?',
    options: [
      'A cup of tea and nothing else',
      'Access to the work, drawings, certs to date and the ability to ask questions of the installer',
      'The wholesaler invoice',
      'Your training provider details',
    ],
    correctAnswer: 1,
    explanation:
      'Building Control inspections under the Building Regs (incl. Approved Document P for electrical) need access, drawings, certs and the installer available to answer questions.',
    section: '5.1.3',
    difficulty: 'intermediate',
    topic: 'Site visitors',
  },
  {
    id: 56,
    question:
      'A local authority Environmental Health Officer turns up about a noise complaint. Are they entitled to enter the site?',
    options: [
      'No — only HSE inspectors can enter',
      'Yes — Local Authority enforcement officers have similar powers of entry under HASAWA s.20 for premises they enforce',
      'Only with a court warrant',
      'Only if the client agrees',
    ],
    correctAnswer: 1,
    explanation:
      'HASAWA splits enforcement between HSE (construction, factories) and Local Authorities (offices, retail). Both have s.20 powers to enter and inspect within their remit.',
    section: '5.1.3',
    difficulty: 'advanced',
    topic: 'Site visitors',
  },
  {
    id: 57,
    question:
      'A scheme assessor (NICEIC, NAPIT, ELECSA) arrives for a routine assessment. Do they need an induction?',
    options: [
      'No — they are scheme staff',
      'Yes — every visitor regardless of role gets a site-specific induction covering hazards, PPE, fire procedures and welfare',
      'Only for the first visit ever',
      'Only on construction sites',
    ],
    correctAnswer: 1,
    explanation:
      'Site induction applies to everyone. A scheme assessor is competent in their job but does not know your site\'s specific hazards.',
    section: '5.1.3',
    difficulty: 'basic',
    topic: 'Site visitors',
  },
  {
    id: 58,
    question:
      'A police officer attends a domestic property where you are working, asking about an unrelated matter. What do you do?',
    options: [
      'Refuse to engage',
      'Be polite and helpful, but tell them you cannot give access without the householder\'s permission and call your supervisor for guidance',
      'Let them search the premises',
      'Hide the tools',
    ],
    correctAnswer: 1,
    explanation:
      'You\'re a guest in someone\'s home. Be courteous, do not authorise access, escalate to supervisor and householder. The police have their own legal routes if needed.',
    section: '5.1.3',
    difficulty: 'advanced',
    topic: 'Site visitors',
  },
  {
    id: 59,
    question:
      'A school site requires DBS checks for trades working in occupied buildings. Why?',
    options: [
      'Marketing reasons',
      'Safeguarding — anyone in a position of trust around children/vulnerable adults must be DBS-checked under safeguarding policies',
      'Insurance only',
      'It is optional',
    ],
    correctAnswer: 1,
    explanation:
      'DBS (Disclosure and Barring Service) checks are part of safeguarding due diligence. Schools, care homes and similar settings routinely require enhanced DBS for site staff.',
    section: '5.1.3',
    difficulty: 'intermediate',
    topic: 'Site visitors',
  },
  {
    id: 60,
    question:
      'A media crew arrives to film a project for marketing. The site manager should:',
    options: [
      'Wave them on',
      'Brief them on site rules, escort them, ensure no live testing or unsafe activities are filmed unattended, and confirm written permissions for any recognisable workers',
      'Refuse outright',
      'Let them film whatever they want',
    ],
    correctAnswer: 1,
    explanation:
      'Media on site need induction, escort and respect for individual privacy (UK GDPR — recognisable individuals need consent). Manage the visit like any other.',
    section: '5.1.3',
    difficulty: 'advanced',
    topic: 'Site visitors',
  },
  {
    id: 61,
    question:
      'A skip wagon arrives to swap waste skips. The driver is a regular visitor. What still needs to happen?',
    options: [
      'Nothing — they know the site',
      'Sign in, segregation check on skip contents, banksman for the lift if reversing into busy areas',
      'Just sign in',
      'Skip them straight to unload',
    ],
    correctAnswer: 1,
    explanation:
      'Even regular visitors sign in for fire roll-call. Reversing manoeuvres in busy areas need a banksman; waste segregation matters for compliance with the Duty of Care.',
    section: '5.1.3',
    difficulty: 'intermediate',
    topic: 'Site visitors',
  },
  {
    id: 62,
    question:
      'A customer\'s tenant on a void refurb wants to come and "see how it\'s going" mid-week. The right answer is:',
    options: [
      'No, never',
      'Refer them to the client (the landlord) — access is the client\'s decision, not the contractor\'s; if agreed, escort and induct',
      'Let them in unsupervised',
      'Argue with them',
    ],
    correctAnswer: 1,
    explanation:
      'Access permissions sit with the client. Refer the request up; if the landlord approves, manage the visit with induction and escort.',
    section: '5.1.3',
    difficulty: 'intermediate',
    topic: 'Site visitors',
  },
  {
    id: 63,
    question:
      'PPE requirements for visitors should be:',
    options: [
      'Whatever the visitor brings',
      'Provided by the site (loan kit) or required to be brought, matching the site PPE rules — no PPE, no entry',
      'Optional',
      'Only required for trades',
    ],
    correctAnswer: 1,
    explanation:
      'Visitor PPE matches site rules — no exceptions. Loan kit is normal practice (hard hat, hi-vis, eye protection at minimum). The induction enforces it.',
    section: '5.1.3',
    difficulty: 'basic',
    topic: 'Site visitors',
  },
  {
    id: 64,
    question:
      'A first-aider from the office attends after an incident on site. Are they a "visitor" for sign-in purposes?',
    options: [
      'No — they\'re company staff',
      'Yes — anyone not normally based on site signs in for emergency roll-call purposes',
      'Only if they stay over an hour',
      'Only if a manager',
    ],
    correctAnswer: 1,
    explanation:
      'Sign-in is about who is on site for fire muster — not job title. Company staff visiting still sign in.',
    section: '5.1.3',
    difficulty: 'basic',
    topic: 'Site visitors',
  },
  {
    id: 65,
    question:
      'A college tutor visits to see an apprentice on the job for an off-the-job learning observation. What is the right process?',
    options: [
      'Refuse access',
      'Treat as a visitor — sign in, brief on site rules, escorted access to the work area at a low-risk time',
      'Let them roam free',
      'Make the apprentice come outside',
    ],
    correctAnswer: 1,
    explanation:
      'Tutor observations are part of the apprenticeship. Manage as a normal visitor — induct, sign in, escort. Plan the timing so they see real work.',
    section: '5.1.3',
    difficulty: 'basic',
    topic: 'Site visitors',
  },
  {
    id: 66,
    question:
      'A client arrives in business clothes to "look round" with no PPE and no induction. The correct response is:',
    options: [
      'Wave them in — they\'re paying',
      'Stop them at the gate, offer loan PPE, give the standard visitor induction, then escort — politely but firmly',
      'Argue with them',
      'Pretend you didn\'t see them',
    ],
    correctAnswer: 1,
    explanation:
      'No exceptions for clients. Stop, induct, kit out, escort. Most clients respect this — and any who do not are a much bigger problem.',
    section: '5.1.3',
    difficulty: 'intermediate',
    topic: 'Site visitors',
  },
  {
    id: 67,
    question:
      'A specialist engineer arrives from a manufacturer to commission a piece of switchgear. Their visit is:',
    options: [
      'Outside the site rules — they are a specialist',
      'Inside the site rules — induct, sign in, brief on hazards; their RAMS for the commissioning task should also be reviewed',
      'Optional',
      'Only relevant to the wholesaler',
    ],
    correctAnswer: 1,
    explanation:
      'Specialists still need site induction. Their own RAMS for the commissioning task should be reviewed and integrated with the site\'s controls.',
    section: '5.1.3',
    difficulty: 'intermediate',
    topic: 'Site visitors',
  },
  {
    id: 68,
    question:
      'A young person (14-year-old) on work experience visits site for a day. Extra duties apply because of:',
    options: [
      'Marketing rules',
      'MHSWR 1999 Reg 19 — additional risk assessment for young persons, considering their inexperience and immaturity',
      'BS 7671',
      'No extra duties',
    ],
    correctAnswer: 1,
    explanation:
      'MHSWR 1999 Reg 19: employers must specifically assess risks to young persons (under 18) and put extra protections in place. Work experience is no exception.',
    section: '5.1.3',
    difficulty: 'advanced',
    topic: 'Site visitors',
  },
  {
    id: 69,
    question:
      'A neighbour to a domestic site complains about noise and dust. Are they a "site visitor"?',
    options: [
      'No — keep them off site',
      'No, they\'re a member of the public — but HASAWA s.3 still requires you to manage the impact of your work on them; talk to them politely and adjust working methods if reasonable',
      'Yes — let them in',
      'Yes — induct them',
    ],
    correctAnswer: 1,
    explanation:
      'Neighbours are not visitors but are owed a duty under HASAWA s.3 (risks to non-employees). Polite engagement and reasonable mitigation is good practice and protects the firm.',
    section: '5.1.3',
    difficulty: 'intermediate',
    topic: 'Site visitors',
  },
  {
    id: 70,
    question:
      'A solicitor and surveyor arrive to inspect a defect for a third-party claim. The site manager should:',
    options: [
      'Refuse access and shout',
      'Refer them to the contractor\'s commercial/legal lead, take their details, and not give site access without authorisation from above',
      'Let them in unescorted',
      'Make them sign a waiver and let them go',
    ],
    correctAnswer: 1,
    explanation:
      'Third-party legal visits are a commercial/legal matter — they go through the contractor\'s leadership, not the site team. Take details, escalate, do not block but do not authorise.',
    section: '5.1.3',
    difficulty: 'advanced',
    topic: 'Site visitors',
  },
  {
    id: 71,
    question: 'On a healthcare estate visit, infection control rules may require:',
    options: [
      'Nothing extra',
      'Specific PPE (e.g. gowns, gloves, hand hygiene), no eating/drinking in clinical areas, controlled access through air-locked corridors',
      'Just normal site PPE',
      'Hi-vis only',
    ],
    correctAnswer: 1,
    explanation:
      'Healthcare estates have additional infection-control rules layered over normal site rules. The Trust\'s estates team briefs visitors — follow it precisely.',
    section: '5.1.3',
    difficulty: 'advanced',
    topic: 'Site visitors',
  },
  {
    id: 72,
    question:
      'A visitor with a mobility need (wheelchair user) attends an inspection. The site team should:',
    options: [
      'Tell them they can\'t come on',
      'Plan an accessible route in advance, brief on the planned route, provide an escort, and adjust under Equality Act 2010 reasonable adjustments duty',
      'Carry them around',
      'Do nothing',
    ],
    correctAnswer: 1,
    explanation:
      'Equality Act 2010 s.20 — reasonable adjustments. Plan an accessible route ahead of time; live sites can be made workable for many access needs with thought.',
    section: '5.1.3',
    difficulty: 'intermediate',
    topic: 'Site visitors',
  },
  {
    id: 73,
    question:
      'On a nursing-home job a confused resident wanders into the work area. The right immediate action is:',
    options: [
      'Shout at them',
      'Make safe, calmly guide them out of the work area and contact the home\'s care staff — they manage resident welfare',
      'Lock them in a room',
      'Ignore them',
    ],
    correctAnswer: 1,
    explanation:
      'Make safe first, then call care staff. Vulnerable residents are managed by the home\'s team — you co-ordinate with them, you do not handle directly.',
    section: '5.1.3',
    difficulty: 'intermediate',
    topic: 'Site visitors',
  },
  {
    id: 74,
    question:
      'A drone operator arrives to do an aerial survey. Site rules should cover:',
    options: [
      'Nothing extra',
      'CAA permissions, flight plan, exclusion zone for personnel beneath the flight path, RAMS for the operation',
      'Just sign in',
      'Insurance only',
    ],
    correctAnswer: 1,
    explanation:
      'Drone (UAS) ops need CAA permissions, a flight plan and ground-level exclusions. Manage as a specialist task with its own RAMS integrated with the site.',
    section: '5.1.3',
    difficulty: 'advanced',
    topic: 'Site visitors',
  },
  {
    id: 75,
    question:
      'On a domestic call-out you arrive to find the customer is intoxicated and aggressive. The safest action is:',
    options: [
      'Carry on',
      'Withdraw to your van, contact your supervisor and the office, and reschedule via written communication when the customer is fit to engage',
      'Argue back',
      'Lock yourself inside',
    ],
    correctAnswer: 1,
    explanation:
      'Personal safety first. Withdraw, escalate, reschedule via written channels. Lone-worker procedures should support this kind of decision without questions.',
    section: '5.1.3',
    difficulty: 'intermediate',
    topic: 'Site visitors',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // §5.2.1 — AC 2.1 Statutory legislation (25 questions)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 76,
    question: 'Which of the following is statutory legislation?',
    options: [
      'BS 7671:2018+A4:2026',
      'IET On-Site Guide',
      'The Health and Safety at Work etc. Act 1974',
      'NICEIC technical bulletin',
    ],
    correctAnswer: 2,
    explanation:
      'HASAWA 1974 is an Act of Parliament — statutory law. BS 7671 and the IET guides are non-statutory standards (they become enforceable when cited via Building Regs Approved Doc P or contracts).',
    section: '5.2.1',
    difficulty: 'basic',
    topic: 'Statutory legislation',
  },
  {
    id: 77,
    question: 'BS 7671 is best described as:',
    options: [
      'Statutory law that all electricians must obey',
      'A non-statutory British Standard that is widely cited and referenced by Approved Document P of the Building Regulations',
      'A code of practice with no legal weight',
      'An EU regulation',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 is a voluntary standard, but Approved Document P (Building Regs) cites it as a way of complying with the requirement for electrical safety in dwellings, and contracts routinely require compliance.',
    section: '5.2.1',
    difficulty: 'intermediate',
    topic: 'Statutory legislation',
  },
  {
    id: 78,
    question: 'Under HASAWA s.7, what is the personal duty placed on every employee at work?',
    options: [
      'Take reasonable care for themselves and others, and co-operate with the employer on H&S',
      'Provide their own PPE',
      'Carry out their own risk assessments only',
      'Provide H&S training to colleagues',
    ],
    correctAnswer: 0,
    explanation:
      'HASAWA s.7 places two duties on employees: take reasonable care for own/others\' safety, and co-operate with the employer so the employer can comply with their own duties.',
    section: '5.2.1',
    difficulty: 'basic',
    topic: 'Statutory legislation',
  },
  {
    id: 79,
    question: 'The Electricity at Work Regulations 1989 Reg 4 requires that:',
    options: [
      'Only qualified electricians may switch on lights',
      'All electrical systems are constructed, maintained and worked on so as to prevent danger',
      'All electrical work must be tested annually',
      'Only metallic enclosures may be used',
    ],
    correctAnswer: 1,
    explanation:
      'EAWR 1989 Reg 4 is the cornerstone duty: systems must be constructed, maintained and worked on so as to prevent danger, so far as is reasonably practicable.',
    section: '5.2.1',
    difficulty: 'intermediate',
    topic: 'Statutory legislation',
  },
  {
    id: 80,
    question: 'The minimum cover required by the Employers\' Liability (Compulsory Insurance) Act 1969 is:',
    options: ['£1 million', '£2 million', '£5 million', '£10 million'],
    correctAnswer: 2,
    explanation:
      'Employers\' Liability (Compulsory Insurance) Regs 1998 set the minimum at £5 million. Most policies provide £10 million as standard.',
    section: '5.2.1',
    difficulty: 'advanced',
    topic: 'Statutory legislation',
  },
  {
    id: 81,
    question: 'Under HASAWA s.21, an HSE inspector can issue an Improvement Notice. What does this mean for the employer?',
    options: [
      'They must close the site immediately',
      'They have a stated period (minimum 21 days) to put the breach right, with right of appeal',
      'They lose their licence to trade',
      'They are automatically prosecuted',
    ],
    correctAnswer: 1,
    explanation:
      'An Improvement Notice (s.21) gives time to fix a breach. A Prohibition Notice (s.22) stops the activity immediately because of risk of serious personal injury.',
    section: '5.2.1',
    difficulty: 'advanced',
    topic: 'Statutory legislation',
  },
  {
    id: 82,
    question:
      'Which statutory regulation requires electrical equipment to be maintained in efficient working order and good repair (so far as reasonably practicable)?',
    options: [
      'CDM 2015',
      'Provision and Use of Work Equipment Regulations 1998 (PUWER) Reg 5',
      'COSHH 2002',
      'Equality Act 2010',
    ],
    correctAnswer: 1,
    explanation:
      'PUWER 1998 Reg 5: work equipment shall be maintained in an efficient state, in efficient working order and in good repair. PAT testing exists to evidence this.',
    section: '5.2.1',
    difficulty: 'intermediate',
    topic: 'Statutory legislation',
  },
  {
    id: 83,
    question: 'The Manual Handling Operations Regulations 1992 require employers to:',
    options: [
      'Set lifting limits in kilograms',
      'Avoid hazardous manual handling so far as reasonably practicable; if unavoidable, assess and reduce the risk',
      'Provide gloves',
      'Train employees once only',
    ],
    correctAnswer: 1,
    explanation:
      'MHOR 1992 follows the standard hierarchy: avoid → assess → reduce. There is no statutory weight limit; the assessment considers task, individual, load and environment (TILE).',
    section: '5.2.1',
    difficulty: 'intermediate',
    topic: 'Statutory legislation',
  },
  {
    id: 84,
    question:
      'The Personal Protective Equipment at Work Regulations 1992 (as amended 2022) extend duties to:',
    options: [
      'Employees only',
      'Both employees and "limb (b)" workers (workers who are not employees but provide personal services)',
      'Volunteers only',
      'Self-employed only',
    ],
    correctAnswer: 1,
    explanation:
      'The 2022 amendment to PPER widened protection to limb (b) workers — agency staff, gig workers etc. — as well as employees. The duty applies to both groups.',
    section: '5.2.1',
    difficulty: 'advanced',
    topic: 'Statutory legislation',
  },
  {
    id: 85,
    question:
      'The Working Time Regulations 1998 set a maximum average working week of:',
    options: ['37 hours', '40 hours', '48 hours (averaged over 17 weeks, can be opted out by adults)', '60 hours'],
    correctAnswer: 2,
    explanation:
      'WTR 1998: 48 hours averaged over 17 weeks. Adult workers can opt out of the 48-hour limit in writing; under-18s cannot. Daily/weekly rest breaks also apply.',
    section: '5.2.1',
    difficulty: 'intermediate',
    topic: 'Statutory legislation',
  },
  {
    id: 86,
    question:
      'The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR) require reporting of:',
    options: [
      'Only fatal accidents',
      'Specified injuries, over-7-day absences, occupational diseases and dangerous occurrences to the HSE',
      'Only injuries causing hospital attendance',
      'Only employee injuries',
    ],
    correctAnswer: 1,
    explanation:
      'RIDDOR 2013 is broader than just fatalities — specified injuries (e.g. amputations, major fractures), over-7-day absences, occupational diseases and dangerous occurrences all report.',
    section: '5.2.1',
    difficulty: 'intermediate',
    topic: 'Statutory legislation',
  },
  {
    id: 87,
    question:
      'The Equality Act 2010 protects against discrimination on the basis of how many "protected characteristics"?',
    options: ['5', '7', '9', '12'],
    correctAnswer: 2,
    explanation:
      'Equality Act 2010 has 9 protected characteristics: age, disability, gender reassignment, marriage/civil partnership, pregnancy/maternity, race, religion/belief, sex and sexual orientation.',
    section: '5.2.1',
    difficulty: 'intermediate',
    topic: 'Statutory legislation',
  },
  {
    id: 88,
    question:
      'The Building Safety Act 2022 introduces a new duty holder for higher-risk buildings (HRRBs). What is the role called?',
    options: [
      'Site agent',
      'Principal Accountable Person',
      'Principal Designer',
      'Principal Contractor',
    ],
    correctAnswer: 1,
    explanation:
      'BSA 2022 introduces the Principal Accountable Person for HRRBs (residential buildings ≥18m or ≥7 storeys). They hold the golden-thread information and engage with the Building Safety Regulator.',
    section: '5.2.1',
    difficulty: 'advanced',
    topic: 'Statutory legislation',
  },
  {
    id: 89,
    question:
      'The Control of Asbestos Regulations 2012 require that before work that may disturb a building\'s fabric, the duty holder:',
    options: [
      'Wear gloves',
      'Provides an asbestos register and a refurbishment/demolition survey identifying ACMs',
      'Just hopes for the best',
      'Lets contractors decide',
    ],
    correctAnswer: 1,
    explanation:
      'CAR 2012: duty holder must manage asbestos. Contractors disturbing the fabric must be given the asbestos register and (for refurb/demo) a refurb/demo survey.',
    section: '5.2.1',
    difficulty: 'advanced',
    topic: 'Statutory legislation',
  },
  {
    id: 90,
    question:
      'The Control of Substances Hazardous to Health Regulations 2002 (COSHH) require employers to:',
    options: [
      'Provide gloves only',
      'Assess the risk from hazardous substances, prevent or control exposure, and provide info, instruction and training',
      'Buy any cleaning product',
      'Only deal with paint',
    ],
    correctAnswer: 1,
    explanation:
      'COSHH 2002: assess → prevent/control → monitor → train. SDS (safety data sheets) inform the assessment but do not replace it.',
    section: '5.2.1',
    difficulty: 'intermediate',
    topic: 'Statutory legislation',
  },
  {
    id: 91,
    question:
      'The Management of Health and Safety at Work Regulations 1999 require risk assessments to be:',
    options: [
      'Verbal only',
      'Suitable and sufficient, and recorded in writing where the employer has 5 or more employees',
      'Generic and copied from another firm',
      'Optional for small firms',
    ],
    correctAnswer: 1,
    explanation:
      'MHSWR 1999 Reg 3: suitable and sufficient risk assessments. Written records required if 5+ employees. Same threshold as the H&S policy under HASAWA s.2(3).',
    section: '5.2.1',
    difficulty: 'intermediate',
    topic: 'Statutory legislation',
  },
  {
    id: 92,
    question:
      'BS 7671 Reg 132.13 in A4:2026 places a duty on the designer to provide:',
    options: [
      'A toolbox talk',
      'Documentation describing the supply characteristics and other information needed for the installation',
      'A wholesaler invoice',
      'Marketing material',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Reg 132.13 (A4:2026 — moved from 132.12) requires documentation including supply characteristics, nature of current (AC/DC) and other design information.',
    section: '5.2.1',
    difficulty: 'advanced',
    topic: 'Statutory legislation',
  },
  {
    id: 93,
    question:
      'The Construction (Design and Management) Regulations 2015 are made under which Act of Parliament?',
    options: [
      'Building Safety Act 2022',
      'Health and Safety at Work etc. Act 1974',
      'Equality Act 2010',
      'Consumer Rights Act 2015',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 is statutory instrument 2015/51 made under HASAWA 1974. HASAWA is the parent enabling Act for almost all UK H&S regulations.',
    section: '5.2.1',
    difficulty: 'intermediate',
    topic: 'Statutory legislation',
  },
  {
    id: 94,
    question:
      'Approved Document P of the Building Regulations applies to:',
    options: [
      'All commercial work',
      'Fixed electrical installations in new and existing dwellings, and parts of buildings serving dwellings',
      'Industrial work only',
      'Marine installations',
    ],
    correctAnswer: 1,
    explanation:
      'AD P is the electrical safety document under the Building Regulations 2010 — it covers domestic dwellings (new and existing) and shared/common parts that serve them.',
    section: '5.2.1',
    difficulty: 'intermediate',
    topic: 'Statutory legislation',
  },
  {
    id: 95,
    question:
      'A Prohibition Notice issued under HASAWA s.22 takes effect:',
    options: [
      'After 21 days',
      'Immediately, where the inspector believes there is a risk of serious personal injury',
      'Only after court approval',
      'After employer agreement',
    ],
    correctAnswer: 1,
    explanation:
      'A Prohibition Notice stops the activity immediately. Improvement Notice = time to fix; Prohibition Notice = stop now. Both come with appeal rights to the tribunal.',
    section: '5.2.1',
    difficulty: 'advanced',
    topic: 'Statutory legislation',
  },
  {
    id: 96,
    question:
      'The Health and Safety (First-Aid) Regulations 1981 require employers to:',
    options: [
      'Have a defibrillator',
      'Provide adequate and appropriate equipment, facilities and personnel for first aid based on a needs assessment',
      'Have a fully equipped clinic',
      'Send everyone on a first-aid course',
    ],
    correctAnswer: 1,
    explanation:
      'First-Aid Regs 1981: a needs assessment determines what is "adequate and appropriate" — number of first-aiders, kit and facilities scaled to risk and headcount.',
    section: '5.2.1',
    difficulty: 'intermediate',
    topic: 'Statutory legislation',
  },
  {
    id: 97,
    question:
      'The Workplace (Health, Safety and Welfare) Regulations 1992 cover:',
    options: [
      'Only construction',
      'Workplace conditions: ventilation, temperature, lighting, cleanliness, welfare, traffic routes etc.',
      'PPE only',
      'Lifting only',
    ],
    correctAnswer: 1,
    explanation:
      'WHSWR 1992 covers fixed-workplace conditions. On construction sites the Construction Regs sit alongside but the principles are similar — adequate environment for work.',
    section: '5.2.1',
    difficulty: 'intermediate',
    topic: 'Statutory legislation',
  },
  {
    id: 98,
    question:
      'Under HASAWA s.2, the employer\'s general duty to employees includes:',
    options: [
      'Providing only PPE',
      'Ensuring, so far as reasonably practicable, the H&S of all employees — including safe systems, training, premises and a written policy where 5+ employees',
      'Buying tools only',
      'Paying overtime',
    ],
    correctAnswer: 1,
    explanation:
      'HASAWA s.2 is the headline employer duty. Subsections cover plant/systems, substances, info/instruction/training, workplace, and the written policy.',
    section: '5.2.1',
    difficulty: 'basic',
    topic: 'Statutory legislation',
  },
  {
    id: 99,
    question:
      'Failure to obey an Improvement or Prohibition Notice can lead to:',
    options: [
      'A polite letter',
      'Unlimited fines and/or imprisonment of up to 2 years on indictment under HASAWA s.33',
      'Loss of trade-press subscription',
      'Nothing',
    ],
    correctAnswer: 1,
    explanation:
      'HASAWA s.33: failure to comply with a notice is a criminal offence. Penalties on indictment include unlimited fines and up to 2 years imprisonment.',
    section: '5.2.1',
    difficulty: 'advanced',
    topic: 'Statutory legislation',
  },
  {
    id: 100,
    question:
      'Statutory law differs from non-statutory standards (e.g. BS 7671) because:',
    options: [
      'They are the same thing',
      'Statutory law is binding through Acts/Regulations enforceable by criminal sanction; non-statutory standards are voluntary unless cited in law or contract',
      'Standards are stronger',
      'Standards are unenforceable',
    ],
    correctAnswer: 1,
    explanation:
      'Statutory = law (HASAWA, EAWR, CDM, COSHH). Non-statutory = standards/guidance (BS 7671, IET guides). Standards become enforceable when called up by law or contract — and BS 7671 is widely both.',
    section: '5.2.1',
    difficulty: 'basic',
    topic: 'Statutory legislation',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // §5.2.2 — AC 2.2 Workplace information (25 questions)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 101,
    question: 'What does "RAMS" stand for in a construction context?',
    options: [
      'Risk Assessment and Material Schedule',
      'Risk Assessment and Method Statement',
      'Reporting And Monitoring System',
      'Roof Access Management System',
    ],
    correctAnswer: 1,
    explanation:
      'RAMS = Risk Assessment + Method Statement. The RA identifies hazards and controls; the MS describes the safe sequence of work step by step.',
    section: '5.2.2',
    difficulty: 'basic',
    topic: 'Workplace information',
  },
  {
    id: 102,
    question: 'COSHH 2002 requires which document to accompany hazardous substances on site?',
    options: [
      'A delivery note only',
      'A safety data sheet (SDS) and a COSHH assessment for the task',
      'A photograph of the container',
      'Nothing — the label is enough',
    ],
    correctAnswer: 1,
    explanation:
      'COSHH 2002 requires manufacturers to supply SDS and the employer to assess the risk for the specific task before use. Solvents, expanding foam, brick acid and similar all need this.',
    section: '5.2.2',
    difficulty: 'intermediate',
    topic: 'Workplace information',
  },
  {
    id: 103,
    question: 'Manufacturer instructions for equipment are referenced by which BS 7671 regulation in A4:2026?',
    options: ['Reg 132.13', 'Reg 526.1', 'Reg 411.3.3', 'Reg 643.1'],
    correctAnswer: 0,
    explanation:
      'BS 7671 Reg 132.13 (A4:2026 — moved from 132.12) requires the design documentation and manufacturer information to be provided. Ignoring it is both a Regs breach and grounds for warranty refusal.',
    section: '5.2.2',
    difficulty: 'advanced',
    topic: 'Workplace information',
  },
  {
    id: 104,
    question: 'What is the purpose of a site diary?',
    options: [
      'To record personal opinions about colleagues',
      'A daily contemporaneous record of weather, deliveries, visitors, instructions received and progress',
      'To track lunch breaks only',
      'To replace the timesheet',
    ],
    correctAnswer: 1,
    explanation:
      'The site diary is a legal-quality contemporaneous record. It is invaluable evidence in disputes over delays, variations and instructions.',
    section: '5.2.2',
    difficulty: 'basic',
    topic: 'Workplace information',
  },
  {
    id: 105,
    question: 'A timesheet is primarily used to:',
    options: [
      'Show when colleagues took breaks',
      'Record hours worked against jobs/cost codes for payroll, invoicing and job profitability',
      'Record visitors to site',
      'Replace the RAMS',
    ],
    correctAnswer: 1,
    explanation:
      'Timesheets feed payroll, customer invoicing (for time-and-materials work) and post-job profitability analysis. Accuracy matters for all three.',
    section: '5.2.2',
    difficulty: 'basic',
    topic: 'Workplace information',
  },
  {
    id: 106,
    question:
      'You arrive on site and the Method Statement tells you to use a step-up access tower for high-level work. The tower is missing a guardrail. What do you do?',
    options: [
      'Use it anyway — the MS says so',
      'Stop, report to the supervisor, and do not work at height until the tower is compliant or an alternative is in place',
      'Climb a ladder instead without changing the MS',
      'Ask a colleague to hold the tower',
    ],
    correctAnswer: 1,
    explanation:
      'Work at Height Regs 2005 Reg 7 — equipment must be suitable. Stop, report, do not improvise. The MS may need updating before work resumes.',
    section: '5.2.2',
    difficulty: 'intermediate',
    topic: 'Workplace information',
  },
  {
    id: 107,
    question: 'What is a permit-to-work used for?',
    options: [
      'A holiday request',
      'Formal authorisation to do high-risk work (e.g. hot work, confined space, live work) under defined conditions for a defined time',
      'A purchase order',
      'A wage slip',
    ],
    correctAnswer: 1,
    explanation:
      'Permits to work isolate high-risk activities — they name who can do it, what controls apply, what hazards are present and when the permit expires.',
    section: '5.2.2',
    difficulty: 'intermediate',
    topic: 'Workplace information',
  },
  {
    id: 108,
    question: 'A drawing register is used to:',
    options: [
      'Record visitors',
      'Track the current revision of every drawing on site so workers always work to the latest issue',
      'Record COSHH info',
      'Track tools',
    ],
    correctAnswer: 1,
    explanation:
      'Working to a superseded drawing is a classic source of rework. The drawing register pins down current revision; superseded versions get marked and removed.',
    section: '5.2.2',
    difficulty: 'intermediate',
    topic: 'Workplace information',
  },
  {
    id: 109,
    question: 'A specification ("spec") differs from a drawing because it:',
    options: [
      'Is the same thing',
      'Describes performance, materials, finishes, standards and quality requirements in words; the drawing shows geometry and arrangement',
      'Is just a price list',
      'Replaces the contract',
    ],
    correctAnswer: 1,
    explanation:
      'Drawing = where. Spec = what/how/quality. Both apply together; conflicts get resolved through the contract\'s precedence clause.',
    section: '5.2.2',
    difficulty: 'intermediate',
    topic: 'Workplace information',
  },
  {
    id: 110,
    question: 'A snagging list (also called a punch list) is:',
    options: [
      'A pre-start checklist',
      'A record of defects identified at handover that must be put right before final sign-off',
      'A timesheet',
      'A wholesaler list',
    ],
    correctAnswer: 1,
    explanation:
      'Snagging happens at practical completion. The list captures defects (cosmetic, functional, certification) for the contractor to fix before final account.',
    section: '5.2.2',
    difficulty: 'basic',
    topic: 'Workplace information',
  },
  {
    id: 111,
    question:
      'You receive a verbal instruction to add a socket. Best practice for the workplace record is:',
    options: [
      'Just do it',
      'Confirm in writing (email) before starting, capturing scope, price impact and time impact — and only proceed once acknowledged',
      'Ignore it',
      'Charge double',
    ],
    correctAnswer: 1,
    explanation:
      'Verbal instructions are easy to misremember. Confirm in writing — email is fine — and get an acknowledgement. Protects you commercially and clarifies the scope.',
    section: '5.2.2',
    difficulty: 'basic',
    topic: 'Workplace information',
  },
  {
    id: 112,
    question: 'A toolbox talk record is kept to:',
    options: [
      'Decorate the wall',
      'Evidence that workers were briefed on a specific topic — sign-in sheet, date, content, attendees, presenter',
      'Replace the RAMS',
      'Track lunches',
    ],
    correctAnswer: 1,
    explanation:
      'Toolbox talk records are evidence of training. After an incident, an HSE inspector will ask for them — no record means no proof of briefing.',
    section: '5.2.2',
    difficulty: 'basic',
    topic: 'Workplace information',
  },
  {
    id: 113,
    question:
      'A site programme (e.g. Gantt chart) shows:',
    options: [
      'Today\'s lunch menu',
      'Sequence and duration of each work activity, dependencies, milestones and the critical path',
      'Material orders only',
      'Weather forecast',
    ],
    correctAnswer: 1,
    explanation:
      'The programme is the project\'s timeline. Critical path activities cannot slip without delaying the whole project. Weekly look-ahead schedules sit beneath it.',
    section: '5.2.2',
    difficulty: 'intermediate',
    topic: 'Workplace information',
  },
  {
    id: 114,
    question:
      'A "snag" found during second-fix testing should be:',
    options: [
      'Hidden',
      'Recorded on the snag list, the cause investigated, fixed and re-tested before the work is signed off',
      'Ignored',
      'Charged to the apprentice',
    ],
    correctAnswer: 1,
    explanation:
      'Snags get logged, fixed, re-tested. Hidden defects come back as warranty calls — usually at the worst time and at the contractor\'s cost.',
    section: '5.2.2',
    difficulty: 'basic',
    topic: 'Workplace information',
  },
  {
    id: 115,
    question:
      'A safety data sheet (SDS) for a hazardous substance is structured into how many standardised sections?',
    options: ['8', '10', '14', '16'],
    correctAnswer: 3,
    explanation:
      'SDS structure follows REACH/CLP — 16 sections, from identification through transport to other info. Sections 4 (first aid), 7 (handling) and 8 (exposure controls) are the most-used on site.',
    section: '5.2.2',
    difficulty: 'advanced',
    topic: 'Workplace information',
  },
  {
    id: 116,
    question:
      'A "look-ahead" schedule typically covers:',
    options: [
      'The whole project',
      'The next 1–4 weeks of activity in detail, used at the weekly site meeting',
      'Yesterday only',
      'Material costs',
    ],
    correctAnswer: 1,
    explanation:
      'Look-aheads zoom in on the immediate horizon. They drive resource booking, deliveries and trade co-ordination — sitting under the master programme.',
    section: '5.2.2',
    difficulty: 'intermediate',
    topic: 'Workplace information',
  },
  {
    id: 117,
    question:
      'O&M (operation and maintenance) manuals are handed over to:',
    options: [
      'The wholesaler',
      'The end client at handover — they describe how to operate, maintain and find spares for the installation',
      'The apprentice',
      'The architect only',
    ],
    correctAnswer: 1,
    explanation:
      'O&Ms are the user manual for the building. They form part of the H&S File on CDM 2015 projects and the certs that BS 7671 Reg 132.13 requires for the customer.',
    section: '5.2.2',
    difficulty: 'intermediate',
    topic: 'Workplace information',
  },
  {
    id: 118,
    question:
      'A delivery note signed "received unchecked" means:',
    options: [
      'You\'ve confirmed everything',
      'You have not confirmed quantity or condition — protects against signing for items you haven\'t verified, but limits a later claim',
      'You\'ve accepted full liability',
      'The delivery never happened',
    ],
    correctAnswer: 1,
    explanation:
      '"Received unchecked" preserves your right to dispute later, but the supplier may push back. Best practice: check, then sign accurately — note shortages or damage explicitly.',
    section: '5.2.2',
    difficulty: 'intermediate',
    topic: 'Workplace information',
  },
  {
    id: 119,
    question:
      'The construction phase plan (CPP) under CDM 2015 must:',
    options: [
      'Be a one-page summary',
      'Set out the H&S arrangements for the project, including site rules, RAMS for high-risk work and emergency procedures',
      'Cover only the first week',
      'Be optional',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 Reg 12: the PC draws up the CPP before construction starts. It is a living document — updated as the project evolves.',
    section: '5.2.2',
    difficulty: 'advanced',
    topic: 'Workplace information',
  },
  {
    id: 120,
    question:
      'A defects/near-miss report should always include:',
    options: [
      'Only the date',
      'Date, time, location, what happened, who was involved, immediate action, and proposed corrective/preventive action',
      'Only the person\'s name',
      'A photo only',
    ],
    correctAnswer: 1,
    explanation:
      'Good incident reports use the 5W1H structure (who, what, where, when, why, how) plus action taken and proposed prevention. Otherwise the lesson cannot be learned.',
    section: '5.2.2',
    difficulty: 'intermediate',
    topic: 'Workplace information',
  },
  {
    id: 121,
    question:
      'Where the spec, drawing and bill of quantities conflict, the contract typically resolves it by:',
    options: [
      'Whoever shouts loudest',
      'A precedence clause that ranks the documents (e.g. spec > drawings > BoQ) — read your contract',
      'Random pick',
      'Apprentice decides',
    ],
    correctAnswer: 1,
    explanation:
      'Standard contracts (JCT, NEC) include a precedence clause for resolving document conflicts. Always check your contract — it is not always the same order.',
    section: '5.2.2',
    difficulty: 'advanced',
    topic: 'Workplace information',
  },
  {
    id: 122,
    question:
      'A risk assessment uses the standard hierarchy of control. Which order is correct?',
    options: [
      'PPE → admin → engineering → substitution → elimination',
      'Elimination → substitution → engineering → admin → PPE',
      'PPE first, always',
      'Whatever is cheapest',
    ],
    correctAnswer: 1,
    explanation:
      'Hierarchy of control: eliminate → substitute → engineering controls → admin controls → PPE (last resort). PPE is the weakest because it relies on individual behaviour.',
    section: '5.2.2',
    difficulty: 'intermediate',
    topic: 'Workplace information',
  },
  {
    id: 123,
    question:
      'A daily plant check (e.g. MEWP pre-use) is recorded on:',
    options: [
      'A blank piece of paper',
      'A pre-use inspection sheet kept with the equipment — checks structural integrity, controls, fluids, signage; defects taken out of service',
      'Verbal log only',
      'The site diary',
    ],
    correctAnswer: 1,
    explanation:
      'Pre-use plant checks evidence PUWER 1998 Reg 5/6 maintenance and inspection. The sheet stays with the kit; defects mean it goes out of service immediately.',
    section: '5.2.2',
    difficulty: 'intermediate',
    topic: 'Workplace information',
  },
  {
    id: 124,
    question:
      'A pre-construction information (PCI) pack is provided by:',
    options: [
      'The Principal Contractor',
      'The client, via the Principal Designer — it gives bidders the info they need to plan their work safely',
      'The wholesaler',
      'The apprentice',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 Reg 4(4): the client must provide PCI to bidders. It typically includes asbestos info, services info, site constraints, and existing H&S file material.',
    section: '5.2.2',
    difficulty: 'advanced',
    topic: 'Workplace information',
  },
  {
    id: 125,
    question:
      'A test result sheet (e.g. for installation testing) is kept because:',
    options: [
      'It looks nice',
      'BS 7671 Part 6 requires it as evidence of compliance, and it forms part of the cert handed to the client per Reg 132.13',
      'For decoration',
      'It is never needed',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Part 6 (Inspection and Testing) requires recorded results. They form the schedule of test results attached to the EIC/EICR/Minor Works cert delivered to the customer.',
    section: '5.2.2',
    difficulty: 'intermediate',
    topic: 'Workplace information',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // §5.2.3 — AC 2.3 Customer information (25 questions)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 126,
    question:
      'A customer rings to add an EV charger to a quote you are delivering tomorrow. What is the best response?',
    options: [
      'Add the charger and bill the customer at the end',
      'Acknowledge verbally, immediately confirm in writing as a variation with cost and time impact, and do not start until the variation is signed',
      'Refuse — the original quote is fixed',
      'Ignore the request',
    ],
    correctAnswer: 1,
    explanation:
      'Variations need a written record. A verbal yes followed by a written variation (email is fine) protects both parties. Never start unpriced work without sign-off — it kills jobs.',
    section: '5.2.3',
    difficulty: 'intermediate',
    topic: 'Customer information',
  },
  {
    id: 127,
    question: 'When handing over a completed installation to a domestic customer, what must you give them?',
    options: [
      'Only an invoice',
      'The Electrical Installation Certificate, schedule of test results and the manufacturer\'s instructions / user guides for any equipment installed',
      'A verbal explanation only',
      'Nothing — the certs go to Building Control',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Reg 132.13 and the EIC sections require certs, test results and manufacturer information to be supplied to the person ordering the work.',
    section: '5.2.3',
    difficulty: 'basic',
    topic: 'Customer information',
  },
  {
    id: 128,
    question:
      'A landlord asks for the EICR result. The installation is unsatisfactory (C1 / C2 codes present). How do you communicate this?',
    options: [
      'Tell them it\'s fine and they can re-let',
      'Provide the EICR, explain plainly which observations are coded C1 (danger present) or C2 (potentially dangerous), and the urgency to make safe',
      'Hide the C1s so the landlord doesn\'t panic',
      'Refuse to discuss it over the phone',
    ],
    correctAnswer: 1,
    explanation:
      'C1 = danger present, immediate action required. C2 = potentially dangerous, urgent remedial. Honest plain-English explanation protects the customer, the tenants and you.',
    section: '5.2.3',
    difficulty: 'intermediate',
    topic: 'Customer information',
  },
  {
    id: 129,
    question: 'What information should a quotation contain to be clear to a domestic customer?',
    options: [
      'Just the total price',
      'Scope of work, what is and is not included, price (ex/inc VAT), payment terms, validity and any assumptions',
      'Just labour cost',
      'Just material cost',
    ],
    correctAnswer: 1,
    explanation:
      'A clear quote prevents disputes. Scope, exclusions, price (ex/inc VAT), payment terms, validity period and assumptions (e.g. plaster making good) should all be stated.',
    section: '5.2.3',
    difficulty: 'intermediate',
    topic: 'Customer information',
  },
  {
    id: 130,
    question: 'A vulnerable elderly customer struggles to understand technical jargon. How should you brief them on a fuseboard upgrade?',
    options: [
      'Speak louder using the same jargon',
      'Use plain English, short sentences, visual aids and check understanding by asking them to summarise back',
      'Skip the explanation and just send a written quote',
      'Speak only to a relative instead',
    ],
    correctAnswer: 1,
    explanation:
      'Plain English + visual aids + teach-back (ask them to summarise) is the proven technique. Respect their autonomy — adjust the medium, not the audience.',
    section: '5.2.3',
    difficulty: 'basic',
    topic: 'Customer information',
  },
  {
    id: 131,
    question:
      'Under the Consumer Rights Act 2015, services to consumers must be performed with:',
    options: [
      'No particular standard',
      'Reasonable care and skill, within a reasonable time, for a reasonable price (where not pre-agreed)',
      'Only the standard the customer asks for',
      'Whatever standard the contractor decides',
    ],
    correctAnswer: 1,
    explanation:
      'Consumer Rights Act 2015 ss.49–52: services to consumers must be performed with reasonable care and skill, within a reasonable time, for a reasonable price. Implied terms — they apply even if not written.',
    section: '5.2.3',
    difficulty: 'advanced',
    topic: 'Customer information',
  },
  {
    id: 132,
    question:
      'A domestic customer cancels a quote 5 days after signing it (off-premises contract). Which Act protects their cancellation right?',
    options: [
      'CRA 2015',
      'Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 — 14-day cancellation right for off-premises contracts',
      'BS 7671',
      'CDM 2015',
    ],
    correctAnswer: 1,
    explanation:
      'CCRs 2013 give consumers a 14-day cooling-off right for off-premises contracts (signed in the customer\'s home). The customer must be told in writing about this right.',
    section: '5.2.3',
    difficulty: 'advanced',
    topic: 'Customer information',
  },
  {
    id: 133,
    question:
      'A customer\'s written quote should include a clear validity period because:',
    options: [
      'It looks professional',
      'Material prices and labour rates change; an open-ended quote can leave the contractor on the hook for old prices',
      'The customer demands it',
      'It is required by HASAWA',
    ],
    correctAnswer: 1,
    explanation:
      '"This quote is valid for 30 days" protects against price drift. After that, the customer is asking for a fresh quote — fair to both parties.',
    section: '5.2.3',
    difficulty: 'intermediate',
    topic: 'Customer information',
  },
  {
    id: 134,
    question:
      'A customer asks why their EICR shows a C3 observation. The plain-English answer is:',
    options: [
      'It\'s dangerous',
      'It is an "improvement recommended" — the installation is not unsatisfactory because of it, but addressing it would improve safety',
      'It is illegal',
      'It means re-test now',
    ],
    correctAnswer: 1,
    explanation:
      'C3 = improvement recommended. The installation is still satisfactory; the C3 flags something that, while not dangerous, falls below current best practice.',
    section: '5.2.3',
    difficulty: 'intermediate',
    topic: 'Customer information',
  },
  {
    id: 135,
    question:
      'A customer wants the EIC emailed to them. From a UK GDPR standpoint:',
    options: [
      'No restrictions',
      'Send via secure means, only to the verified email address, retain the cert per your retention policy, and the privacy notice should cover this use',
      'Forward to all your colleagues',
      'Post on social media',
    ],
    correctAnswer: 1,
    explanation:
      'UK GDPR data minimisation and integrity/confidentiality. Send only to verified address, secure means, kept per retention. Privacy notice on the quote covers this.',
    section: '5.2.3',
    difficulty: 'advanced',
    topic: 'Customer information',
  },
  {
    id: 136,
    question:
      'A customer has agreed verbally that they will pay on completion. To avoid a dispute, you should:',
    options: [
      'Trust the verbal agreement',
      'Confirm payment terms in writing on the quote and acceptance — and follow the Late Payment of Commercial Debts Act if they slip',
      'Charge double',
      'Charge nothing',
    ],
    correctAnswer: 1,
    explanation:
      'Written terms beat memory in a dispute. Late Payment of Commercial Debts (Interest) Act 1998 covers business-to-business; consumers fall under CRA 2015 — but in both cases, written is better.',
    section: '5.2.3',
    difficulty: 'intermediate',
    topic: 'Customer information',
  },
  {
    id: 137,
    question:
      'You complete a Minor Works Certificate for a domestic customer. The customer copy must be:',
    options: [
      'Optional',
      'Provided to the customer (paper or electronic), with the Building Control notification handled via your competent person scheme',
      'Held only by the contractor',
      'Sent to the wholesaler',
    ],
    correctAnswer: 1,
    explanation:
      'Customer always gets the cert. For notifiable work in dwellings, the competent person scheme handles the Building Control notification (typically NICEIC, NAPIT, ELECSA, ECA, SELECT).',
    section: '5.2.3',
    difficulty: 'basic',
    topic: 'Customer information',
  },
  {
    id: 138,
    question:
      'A customer asks for "the same job but cheaper" by deleting RCDs. What is the correct response?',
    options: [
      'Do as asked',
      'Decline politely, explain why RCD protection is required by BS 7671 (e.g. Reg 411.3.3 for socket-outlets ≤32A) and is not optional for compliant work',
      'Charge more',
      'Argue with the customer',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 A4:2026 Reg 411.3.3 requires RCD protection for socket-outlets ≤32A (with stated exceptions). It is not optional. Polite explanation, not negotiation.',
    section: '5.2.3',
    difficulty: 'advanced',
    topic: 'Customer information',
  },
  {
    id: 139,
    question:
      'A customer leaves a complaint on Google reviews about communication. The right response is:',
    options: [
      'Ignore it',
      'Respond publicly and professionally — acknowledge the issue, offer to resolve offline, and do not get into a public argument',
      'Insult them back',
      'Sue them',
    ],
    correctAnswer: 1,
    explanation:
      'Public reviews demand a measured public response. Acknowledge, take it offline, fix the underlying issue. Future customers read your replies as carefully as the reviews.',
    section: '5.2.3',
    difficulty: 'intermediate',
    topic: 'Customer information',
  },
  {
    id: 140,
    question:
      'A customer\'s privacy notice on your quote/invoice typically covers:',
    options: [
      'Marketing only',
      'What personal data you collect, why, how long you keep it, who you share with, and the customer\'s rights under UK GDPR',
      'Nothing',
      'Pricing',
    ],
    correctAnswer: 1,
    explanation:
      'UK GDPR Art 13/14 transparency. A short, plain-English privacy notice on your quote/invoice covers your obligations and reassures the customer.',
    section: '5.2.3',
    difficulty: 'advanced',
    topic: 'Customer information',
  },
  {
    id: 141,
    question:
      'Handover documentation for a new-build dwelling typically includes:',
    options: [
      'Just the EIC',
      'EIC, schedule of test results, schedule of inspections, manufacturer instructions for installed kit (CU, AFDDs, smoke alarms, EV charger if any), and user instructions',
      'Nothing',
      'Just an invoice',
    ],
    correctAnswer: 1,
    explanation:
      'Handover is a pack — certs + test schedules + inspection schedule + manufacturer info + user instructions. BS 7671 Reg 132.13 wraps this up as the design info to be provided.',
    section: '5.2.3',
    difficulty: 'intermediate',
    topic: 'Customer information',
  },
  {
    id: 142,
    question:
      'A landlord refuses to share the EICR with their tenants, but the law in England since 2020 requires:',
    options: [
      'Nothing',
      'A copy of the EICR to be given to existing tenants within 28 days, new tenants before occupation, and to the local authority on request — Electrical Safety Standards in the Private Rented Sector Regs 2020',
      'Verbal description only',
      'The cert to be hidden',
    ],
    correctAnswer: 1,
    explanation:
      'England PRS Regs 2020: 5-yearly EICR, copies to tenants and the local authority, urgent remedial action within 28 days. Failure can attract fines up to £30,000.',
    section: '5.2.3',
    difficulty: 'advanced',
    topic: 'Customer information',
  },
  {
    id: 143,
    question:
      'A commercial customer wants a written method statement for a planned outage. What level of detail is appropriate?',
    options: [
      'A one-liner',
      'Step-by-step sequence, isolation strategy, who is involved, contingency for restoration, and notification chain — task-specific',
      'A generic template',
      'Just verbal',
    ],
    correctAnswer: 1,
    explanation:
      'Outage MS is a task-specific document — generic templates won\'t cut it. The customer needs to see how you keep their operations safe and how you restore them.',
    section: '5.2.3',
    difficulty: 'advanced',
    topic: 'Customer information',
  },
  {
    id: 144,
    question:
      'A customer asks what happens if they discover a defect 3 months after handover. The correct briefing is:',
    options: [
      'They pay for any fix',
      'Workmanship/materials defects are usually covered by your guarantee/scheme insurance-backed warranty (e.g. NICEIC PCG, NAPIT IBG); explain how to make a claim',
      'Tough luck',
      'Argue',
    ],
    correctAnswer: 1,
    explanation:
      'Scheme members offer insurance-backed warranties (NICEIC Platinum Promise, NAPIT Insurance Backed Guarantee). Tell the customer at handover so they know how to claim.',
    section: '5.2.3',
    difficulty: 'intermediate',
    topic: 'Customer information',
  },
  {
    id: 145,
    question:
      'A customer asks why the new RCBO trips when they plug in their old freezer. Plain-English answer:',
    options: [
      'It\'s broken',
      'It is doing its job — the freezer likely has earth leakage; explain we will investigate, and recommend repair/replacement of the appliance',
      'Bypass the RCBO',
      'Disable the protection',
    ],
    correctAnswer: 1,
    explanation:
      'Tripping = working. Old freezers commonly have insulation degradation. Explain, investigate, and recommend appliance repair/replacement — never bypass protection.',
    section: '5.2.3',
    difficulty: 'intermediate',
    topic: 'Customer information',
  },
  {
    id: 146,
    question:
      'A customer wants to pay cash with no invoice. What is the right answer?',
    options: [
      'Take it',
      'Decline — provide a proper VAT invoice (or zero-VAT invoice if not registered) for tax compliance and to protect the customer\'s warranty rights',
      'Charge double',
      'Argue',
    ],
    correctAnswer: 1,
    explanation:
      'No-invoice cash is tax evasion. Always provide a proper invoice — the customer needs it for any future warranty/insurance claim, and you need it for HMRC.',
    section: '5.2.3',
    difficulty: 'advanced',
    topic: 'Customer information',
  },
  {
    id: 147,
    question:
      'When briefing a customer at the end of an EV charger install, you should:',
    options: [
      'Walk away',
      'Demonstrate operation, explain the smart features and tariff considerations, hand over manufacturer guides and your cert pack, and note the smart charger regs (e.g. randomised delay)',
      'Verbal only',
      'Email later',
    ],
    correctAnswer: 1,
    explanation:
      'EV charger handover = demo + manuals + cert pack + a chat about smart-charging and tariffs. The Electric Vehicles (Smart Charge Points) Regs 2021 require certain features; mention them.',
    section: '5.2.3',
    difficulty: 'intermediate',
    topic: 'Customer information',
  },
  {
    id: 148,
    question:
      'A customer is unsure if they need an EICR or a PIR. The correct response is:',
    options: [
      'They are different',
      'They are the same product — EICR replaced the older "PIR" (periodic inspection report) terminology; explain politely',
      'Refuse to do either',
      'Argue',
    ],
    correctAnswer: 1,
    explanation:
      'EICR = Electrical Installation Condition Report. The older "PIR" name was replaced when BS 7671 17th Edition Amendment 1 introduced the standard cert. Same thing, modern name.',
    section: '5.2.3',
    difficulty: 'basic',
    topic: 'Customer information',
  },
  {
    id: 149,
    question:
      'A customer requests a verbal price over the phone. Best practice is:',
    options: [
      'Quote on the spot',
      'Give a rough indicator only, then follow up with a written, scoped quote — so both sides have the same understanding',
      'Refuse to talk',
      'Charge a call-out for the call',
    ],
    correctAnswer: 1,
    explanation:
      'Verbal pricing leads to disputes. Indicate, then write. The written quote captures scope, assumptions and exclusions properly.',
    section: '5.2.3',
    difficulty: 'basic',
    topic: 'Customer information',
  },
  {
    id: 150,
    question:
      'A landlord asks how long you must keep their EICR. UK GDPR storage limitation suggests:',
    options: [
      'Forever',
      'Only as long as needed for the legitimate purpose — typically the EICR validity period plus a buffer for limitation/insurance reasons (often 6+ years)',
      'One day',
      'One week',
    ],
    correctAnswer: 1,
    explanation:
      'UK GDPR storage limitation principle. EICRs are typically retained for the validity period plus 6 years (limitation period for contract claims) — your retention policy should state it.',
    section: '5.2.3',
    difficulty: 'advanced',
    topic: 'Customer information',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // §5.2.4 — AC 2.4 Company policies & procedures (25 questions)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 151,
    question: 'What is the purpose of a company Health and Safety policy?',
    options: [
      'To meet a paperwork requirement only',
      'To set out the company\'s commitment, organisation and arrangements for managing H&S — required in writing if 5+ employees (HASAWA s.2(3))',
      'To replace risk assessments',
      'To set holiday allowances',
    ],
    correctAnswer: 1,
    explanation:
      'HASAWA s.2(3) requires a written H&S policy if you have 5 or more employees. It states intent (statement), responsibilities (organisation) and how it is delivered (arrangements).',
    section: '5.2.4',
    difficulty: 'intermediate',
    topic: 'Company policies',
  },
  {
    id: 152,
    question: 'A company\'s drug and alcohol policy is most likely to require:',
    options: [
      'Random testing of office staff only',
      'Zero tolerance with for-cause and post-incident testing, supported by an employee assistance referral route',
      'Testing only on the day of an accident',
      'No testing at all',
    ],
    correctAnswer: 1,
    explanation:
      'Most contracting D&A policies pair a clear zero-tolerance rule with for-cause and post-incident testing, and signpost confidential support — discipline alone doesn\'t address the root cause.',
    section: '5.2.4',
    difficulty: 'intermediate',
    topic: 'Company policies',
  },
  {
    id: 153,
    question: 'What is the purpose of an equal opportunities policy?',
    options: [
      'To ensure equal pay only',
      'To set out how the company prevents discrimination and harassment based on the Equality Act 2010 protected characteristics',
      'To set the minimum wage',
      'To control overtime',
    ],
    correctAnswer: 1,
    explanation:
      'An equal opportunities policy operationalises the Equality Act 2010 — protected characteristics, complaint route, training and consequences for breaches.',
    section: '5.2.4',
    difficulty: 'basic',
    topic: 'Company policies',
  },
  {
    id: 154,
    question:
      'A company\'s grievance procedure is governed by which statutory code?',
    options: [
      'CDM 2015',
      'The ACAS Code of Practice on Disciplinary and Grievance Procedures',
      'EAWR 1989',
      'COSHH 2002',
    ],
    correctAnswer: 1,
    explanation:
      'The ACAS Code is statutory in the sense that tribunals can adjust awards by up to 25% if it is unreasonably ignored. Grievance and disciplinary procedures should mirror it.',
    section: '5.2.4',
    difficulty: 'advanced',
    topic: 'Company policies',
  },
  {
    id: 155,
    question:
      'A whistleblowing policy protects an employee who reports wrongdoing under which Act?',
    options: [
      'Equality Act 2010',
      'Public Interest Disclosure Act 1998 (PIDA)',
      'Data Protection Act 2018',
      'CDM 2015',
    ],
    correctAnswer: 1,
    explanation:
      'PIDA 1998 (amending the Employment Rights Act 1996) protects workers who make protected disclosures (e.g. dangerous practices, fraud) from detriment or dismissal.',
    section: '5.2.4',
    difficulty: 'advanced',
    topic: 'Company policies',
  },
  {
    id: 156,
    question:
      'Why should every apprentice read the company\'s Health and Safety policy on day one?',
    options: [
      'Because it is interesting reading',
      'Because it tells them the reporting routes, named responsible people and arrangements they will rely on every day',
      'Because the union demands it',
      'Because it sets their wage',
    ],
    correctAnswer: 1,
    explanation:
      'The H&S policy names who you report to, where to find RAMS, accident book location, fire procedures and welfare arrangements — all the daily logistics of staying safe.',
    section: '5.2.4',
    difficulty: 'basic',
    topic: 'Company policies',
  },
  {
    id: 157,
    question:
      'A disciplinary policy mirroring the ACAS Code typically follows which sequence?',
    options: [
      'Sack first, ask later',
      'Investigation → meeting → decision → right to be accompanied → right of appeal',
      'Verbal only',
      'No process',
    ],
    correctAnswer: 1,
    explanation:
      'ACAS Code: investigate, hold a meeting, decide, allow accompaniment, allow appeal. Skipping steps risks "unfair dismissal" findings — and a 25% uplift on tribunal awards.',
    section: '5.2.4',
    difficulty: 'intermediate',
    topic: 'Company policies',
  },
  {
    id: 158,
    question:
      'A bullying and harassment policy operationalises duties under:',
    options: [
      'BS 7671',
      'Equality Act 2010 ss.26-27 (harassment) and HASAWA (employer duty to protect health, including mental)',
      'COSHH',
      'EAWR',
    ],
    correctAnswer: 1,
    explanation:
      'Equality Act 2010 covers harassment based on protected characteristics. HASAWA covers the wider duty of care — including from psychological harm. The policy puts both into operation.',
    section: '5.2.4',
    difficulty: 'intermediate',
    topic: 'Company policies',
  },
  {
    id: 159,
    question:
      'A data protection policy implements which UK statute?',
    options: [
      'CDM 2015',
      'UK GDPR and the Data Protection Act 2018',
      'PUWER 1998',
      'CRA 2015',
    ],
    correctAnswer: 1,
    explanation:
      'UK GDPR + DPA 2018 are the framework. The company\'s data protection policy operationalises them — what data, why, how kept, who has access, breach response.',
    section: '5.2.4',
    difficulty: 'intermediate',
    topic: 'Company policies',
  },
  {
    id: 160,
    question:
      'A company\'s lone working policy should:',
    options: [
      'Ban all lone work',
      'Set out who can work alone, what risk assessment applies, communication/check-in arrangements, and high-risk activities that need a buddy',
      'Be optional',
      'Apply only to electricians',
    ],
    correctAnswer: 1,
    explanation:
      'Lone-working policy follows MHSWR 1999 — assess the risks. Some activities (live work, work at height in dwellings, confined spaces) should not be done alone.',
    section: '5.2.4',
    difficulty: 'intermediate',
    topic: 'Company policies',
  },
  {
    id: 161,
    question:
      'A vehicle/driving-at-work policy should cover:',
    options: [
      'Speed limits only',
      'Licence checks, insurance, MOT, vehicle inspection, mobile phone use, fatigue management — all part of the employer\'s duty under HASAWA s.3 to others',
      'Fuel only',
      'Nothing',
    ],
    correctAnswer: 1,
    explanation:
      'Driving for work is a major workplace risk. Policies cover competence (licence), kit (insurance, MOT, inspection), behaviour (no phone, fatigue) and incident reporting.',
    section: '5.2.4',
    difficulty: 'advanced',
    topic: 'Company policies',
  },
  {
    id: 162,
    question:
      'A modern slavery policy is required for businesses with turnover above:',
    options: [
      '£1m',
      '£36 million (Modern Slavery Act 2015 s.54)',
      '£500m',
      'No threshold',
    ],
    correctAnswer: 1,
    explanation:
      'Modern Slavery Act 2015 s.54: businesses ≥£36m turnover must publish a slavery and human trafficking statement. Below that, a policy is good practice but not statutory.',
    section: '5.2.4',
    difficulty: 'advanced',
    topic: 'Company policies',
  },
  {
    id: 163,
    question:
      'A "fit and proper person" policy in a regulated firm typically requires:',
    options: [
      'Anything goes',
      'Background checks (DBS), reference checks, ongoing competence assessment and prompt action on conduct issues',
      'Only photo ID',
      'Nothing',
    ],
    correctAnswer: 1,
    explanation:
      'Fit and proper goes beyond a one-off check — initial vetting plus ongoing competence and conduct review, with action taken when issues arise.',
    section: '5.2.4',
    difficulty: 'advanced',
    topic: 'Company policies',
  },
  {
    id: 164,
    question:
      'An IT/acceptable use policy typically prohibits:',
    options: [
      'Coffee at desks',
      'Sharing passwords, using company systems for unlawful or commercial private purposes, downloading unauthorised software',
      'All internet',
      'Nothing',
    ],
    correctAnswer: 1,
    explanation:
      'AUPs cover the basics — passwords, lawful use, no shadow IT. Breaches can lead to disciplinary action and, for security incidents, ICO involvement under UK GDPR.',
    section: '5.2.4',
    difficulty: 'intermediate',
    topic: 'Company policies',
  },
  {
    id: 165,
    question:
      'A social media policy for tradespeople typically asks them to:',
    options: [
      'Never post anything',
      'Avoid identifying clients or live worksites without consent, no derogatory comments about colleagues/clients/competitors, and respect confidentiality',
      'Post everything',
      'Slag off competitors',
    ],
    correctAnswer: 1,
    explanation:
      'Social media policies protect confidentiality, reputation and UK GDPR compliance. Photos of live sites can identify clients — get consent before posting.',
    section: '5.2.4',
    difficulty: 'intermediate',
    topic: 'Company policies',
  },
  {
    id: 166,
    question:
      'A company\'s mental health/wellbeing policy typically signposts to:',
    options: [
      'Nothing',
      'EAP (Employee Assistance Programme), Lighthouse Construction Industry Charity helpline, Mind, Mates in Mind, and the GP route',
      'A self-help book',
      'A pub',
    ],
    correctAnswer: 1,
    explanation:
      'Wellbeing policies signpost real support — EAP, Lighthouse (0345 605 1956), Mind (0300 123 3393), Mates in Mind. Two construction workers a day in the UK take their own lives.',
    section: '5.2.4',
    difficulty: 'basic',
    topic: 'Company policies',
  },
  {
    id: 167,
    question:
      'An apprentice\'s training agreement is a contractual document setting out:',
    options: [
      'Holiday only',
      'Roles of employer/training provider/apprentice, off-the-job learning hours, end-point assessment plans and pay/conditions',
      'Nothing important',
      'Wholesaler discounts',
    ],
    correctAnswer: 1,
    explanation:
      'The apprenticeship agreement is a tripartite document. Off-the-job learning (typically 20% of paid hours) is statutory; the agreement evidences it for ESFA/Ofsted.',
    section: '5.2.4',
    difficulty: 'intermediate',
    topic: 'Company policies',
  },
  {
    id: 168,
    question:
      'A return-to-work meeting after sick absence is conducted to:',
    options: [
      'Discipline',
      'Welcome back, identify any ongoing health needs, confirm fitness for normal duties and discuss any reasonable adjustments',
      'Cut pay',
      'Get rid of the employee',
    ],
    correctAnswer: 1,
    explanation:
      'Return-to-work interviews are a wellbeing tool. They catch underlying issues, identify reasonable adjustments (Equality Act 2010), and help the person settle back in.',
    section: '5.2.4',
    difficulty: 'intermediate',
    topic: 'Company policies',
  },
  {
    id: 169,
    question:
      'A safeguarding policy in a contracting firm working in schools should include:',
    options: [
      'Nothing extra',
      'Enhanced DBS for staff, named safeguarding officer, training, and a clear route for reporting concerns about children/vulnerable adults',
      'Just sign in',
      'Hi-vis only',
    ],
    correctAnswer: 1,
    explanation:
      'Working in schools/care settings = layered safeguarding. Enhanced DBS, named officer, training, reporting route. The policy makes the response systematic.',
    section: '5.2.4',
    difficulty: 'advanced',
    topic: 'Company policies',
  },
  {
    id: 170,
    question:
      'A company\'s anti-bribery policy implements which Act?',
    options: [
      'CRA 2015',
      'Bribery Act 2010 — strict-liability corporate offence of failing to prevent bribery',
      'CDM 2015',
      'BS 7671',
    ],
    correctAnswer: 1,
    explanation:
      'Bribery Act 2010 s.7: a corporate offence of failing to prevent bribery by associated persons. Defence is having "adequate procedures" — that\'s what the policy provides.',
    section: '5.2.4',
    difficulty: 'advanced',
    topic: 'Company policies',
  },
  {
    id: 171,
    question:
      'A complaint handling procedure for customers should include:',
    options: [
      'Ignore complaints',
      'Acknowledge promptly, investigate fairly, respond in writing within a stated timescale, signpost to ADR (e.g. scheme provider) if unresolved',
      'Always blame the customer',
      'Verbal only',
    ],
    correctAnswer: 1,
    explanation:
      'Good complaint handling: acknowledge, investigate, respond, escalate to ADR. Most scheme providers (NICEIC, NAPIT, ELECSA, ECA) offer ADR for unresolved consumer disputes.',
    section: '5.2.4',
    difficulty: 'intermediate',
    topic: 'Company policies',
  },
  {
    id: 172,
    question:
      'A company\'s environmental policy may commit to:',
    options: [
      'Nothing',
      'Waste segregation, responsible disposal of WEEE, energy reduction, low-NOx vehicle policy and supplier sustainability — supporting environmental compliance and contracts that require it',
      'Burn rubbish',
      'Tip in rivers',
    ],
    correctAnswer: 1,
    explanation:
      'Environmental policies cover Duty of Care for waste (Environmental Protection Act 1990), WEEE Regs, energy efficiency. Many public-sector contracts require demonstrable environmental policy.',
    section: '5.2.4',
    difficulty: 'intermediate',
    topic: 'Company policies',
  },
  {
    id: 173,
    question:
      'A firm\'s training policy should evidence:',
    options: [
      'Nothing',
      'How competence is identified, gained, refreshed and recorded — supporting EAWR Reg 16 and HASAWA s.2(2)(c)',
      'Anything goes',
      'Holiday only',
    ],
    correctAnswer: 1,
    explanation:
      'Competence is a live duty: EAWR 1989 Reg 16, HASAWA s.2(2)(c). The training policy + records show how the firm meets it — a basic ask of any HSE inspection.',
    section: '5.2.4',
    difficulty: 'advanced',
    topic: 'Company policies',
  },
  {
    id: 174,
    question:
      'A new starter induction policy should cover at least:',
    options: [
      'Holiday only',
      'H&S basics, fire procedure, first aid, reporting routes, key policies (D&A, equality, IT, social media), site rules and named manager',
      'Just the wage',
      'Nothing',
    ],
    correctAnswer: 1,
    explanation:
      'Induction is the foundation. HASAWA s.2(2)(c) requires info, instruction and training. New starters should leave the induction knowing where to go for the things that matter.',
    section: '5.2.4',
    difficulty: 'basic',
    topic: 'Company policies',
  },
  {
    id: 175,
    question:
      'A confidentiality clause in a contract of employment typically prevents:',
    options: [
      'All speech',
      'Disclosure of client information, designs, prices and trade secrets — both during employment and (within reason) afterwards',
      'Nothing',
      'Holiday',
    ],
    correctAnswer: 1,
    explanation:
      'Confidentiality clauses protect commercial info. They cannot lawfully prevent whistleblowing protected under PIDA — that is always preserved.',
    section: '5.2.4',
    difficulty: 'advanced',
    topic: 'Company policies',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // §5.3.1 — AC 3.1 Communication methods (25 questions)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 176,
    question: 'Which method of communication is best for a complex variation request that affects price?',
    options: [
      'A verbal conversation only',
      'Written (email) so there is a clear record both parties can refer back to',
      'A text message',
      'A WhatsApp voice note',
    ],
    correctAnswer: 1,
    explanation:
      'Anything affecting price, scope or programme should be in writing. Email creates the audit trail. Verbal can be faster initially but always confirm in writing afterwards.',
    section: '5.3.1',
    difficulty: 'basic',
    topic: 'Communication methods',
  },
  {
    id: 177,
    question: 'A toolbox talk is best described as:',
    options: [
      'A casual chat at break',
      'A short, focused safety briefing on a specific topic delivered to the work team — interactive, recorded with attendees signed in',
      'A formal company meeting',
      'A disciplinary hearing',
    ],
    correctAnswer: 1,
    explanation:
      'Toolbox talks are 5–15 minute focused briefings — one topic, on the work, two-way questions encouraged, signed-in record kept as evidence of training.',
    section: '5.3.1',
    difficulty: 'basic',
    topic: 'Communication methods',
  },
  {
    id: 178,
    question:
      'Hand signals on site (e.g. for crane lifts) are an example of which type of communication?',
    options: [
      'Written communication',
      'Non-verbal / visual communication',
      'Electronic communication',
      'Telephone communication',
    ],
    correctAnswer: 1,
    explanation:
      'Hand signals are non-verbal / visual communication — used where noise, distance or PPE makes voice unreliable. BS 7121 specifies standard crane signals.',
    section: '5.3.1',
    difficulty: 'basic',
    topic: 'Communication methods',
  },
  {
    id: 179,
    question:
      'When is a face-to-face conversation more appropriate than email?',
    options: [
      'For a sensitive performance discussion or a heated disagreement that needs de-escalation',
      'For a price quotation',
      'For a variation order',
      'For sharing a drawing',
    ],
    correctAnswer: 0,
    explanation:
      'Sensitive, emotional or ambiguous situations benefit from face-to-face — tone, body language and instant clarification reduce the risk of misreading. Confirm in writing afterwards if needed.',
    section: '5.3.1',
    difficulty: 'intermediate',
    topic: 'Communication methods',
  },
  {
    id: 180,
    question: 'What is "active listening" on site?',
    options: [
      'Hearing the words while looking at your phone',
      'Giving the speaker your full attention, not interrupting, then summarising back what you heard to confirm understanding',
      'Recording everything secretly',
      'Listening only for the parts you want to hear',
    ],
    correctAnswer: 1,
    explanation:
      'Active listening = full attention, no interruption, reflect back ("so what you\'re saying is…"). It catches misunderstandings before they become rework or accidents.',
    section: '5.3.1',
    difficulty: 'intermediate',
    topic: 'Communication methods',
  },
  {
    id: 181,
    question:
      'A formal Architect\'s Instruction (AI) on a JCT job is normally issued by which method?',
    options: [
      'Verbal instruction in passing',
      'A numbered written instruction (paper or electronic) issued by the contract administrator',
      'Text message',
      'WhatsApp',
    ],
    correctAnswer: 1,
    explanation:
      'JCT contracts require Architect\'s Instructions in writing, numbered and issued by the contract administrator. Anything else is not contractually binding and you may not get paid for the work.',
    section: '5.3.1',
    difficulty: 'advanced',
    topic: 'Communication methods',
  },
  {
    id: 182,
    question:
      'Which is the best communication method to confirm a customer\'s appointment time the day before?',
    options: [
      'Drop in unannounced',
      'A short SMS or email confirming time, address and any prep needed (parking, access)',
      'No contact',
      'A long phone call',
    ],
    correctAnswer: 1,
    explanation:
      'A short, structured confirmation reduces no-shows and parking hassle. Customers appreciate it and it protects your day from wasted journeys.',
    section: '5.3.1',
    difficulty: 'basic',
    topic: 'Communication methods',
  },
  {
    id: 183,
    question:
      '"7-38-55" is a rule of thumb that says non-verbal cues carry significant communication weight. The numbers stand for:',
    options: [
      'Random',
      '7% words, 38% tone of voice, 55% body language — relevant when emotional content is at stake',
      'Page numbers',
      'Pay grades',
    ],
    correctAnswer: 1,
    explanation:
      'Mehrabian\'s 7-38-55 rule applies when feelings/attitudes are being communicated — not technical content. Worth knowing for sensitive conversations and customer interactions.',
    section: '5.3.1',
    difficulty: 'advanced',
    topic: 'Communication methods',
  },
  {
    id: 184,
    question:
      'A "pre-start" meeting before a new project is best held by:',
    options: [
      'Email only',
      'Face-to-face (or video for distributed teams) — covers scope, programme, RAMS, key contacts and unanswered questions',
      'Text',
      'No meeting',
    ],
    correctAnswer: 1,
    explanation:
      'Pre-start meetings build shared understanding. Face-to-face (or video) lets ambiguities surface immediately — they are far harder to spot in email exchanges.',
    section: '5.3.1',
    difficulty: 'intermediate',
    topic: 'Communication methods',
  },
  {
    id: 185,
    question:
      'A two-way radio is used on a large site because:',
    options: [
      'It looks cool',
      'It allows fast, group communication in noisy/large environments where mobiles are unreliable; useful for banksman, lifts, emergencies',
      'It replaces all other methods',
      'It is mandatory',
    ],
    correctAnswer: 1,
    explanation:
      'Two-way radios solve the noise/coverage problem on big sites. Standard discipline: short, clear messages, named callers, channel awareness.',
    section: '5.3.1',
    difficulty: 'basic',
    topic: 'Communication methods',
  },
  {
    id: 186,
    question:
      'A SBAR (Situation, Background, Assessment, Recommendation) handover is used because:',
    options: [
      'It sounds technical',
      'It structures a clinical/safety handover so nothing important is missed — increasingly used in construction safety briefings too',
      'It replaces RAMS',
      'It is mandatory',
    ],
    correctAnswer: 1,
    explanation:
      'SBAR comes from healthcare. It forces structure: what is happening, what is the context, what do I think, what do I want you to do. Useful for shift/crew handover.',
    section: '5.3.1',
    difficulty: 'advanced',
    topic: 'Communication methods',
  },
  {
    id: 187,
    question:
      'A WhatsApp group for a small contracting team is fine for:',
    options: [
      'Customer personal data',
      'Logistics chat (e.g. "running 10 mins late") — but anything contractually significant or personal data should still go through formal channels',
      'Everything',
      'Never use it',
    ],
    correctAnswer: 1,
    explanation:
      'Messaging apps are great for logistics. Don\'t use them for customer personal data (UK GDPR — controlled processing) or contractual variations (need a record on the right system).',
    section: '5.3.1',
    difficulty: 'intermediate',
    topic: 'Communication methods',
  },
  {
    id: 188,
    question:
      'A "tailgate" briefing is similar to a toolbox talk but typically:',
    options: [
      'Held over lunch',
      'Held at the work face at the start of shift, very short (2-5 min), focused on the day\'s specific tasks and hazards',
      'A formal meeting',
      'A disciplinary',
    ],
    correctAnswer: 1,
    explanation:
      'Tailgate briefings are the daily warm-up. Quick, on-the-spot, focused on today\'s work. Toolbox talks are typically longer/topic-based.',
    section: '5.3.1',
    difficulty: 'intermediate',
    topic: 'Communication methods',
  },
  {
    id: 189,
    question:
      'Email etiquette for site teams typically asks you to:',
    options: [
      'Reply to all',
      'Use clear subject lines, keep messages short, only CC people who need it, and avoid sending sensitive info as attachments without checking the recipient',
      'Use slang',
      'Write essays',
    ],
    correctAnswer: 1,
    explanation:
      'Good email = clear subject, short message, right recipients. Sensitive info needs verification + secure means — particularly under UK GDPR.',
    section: '5.3.1',
    difficulty: 'basic',
    topic: 'Communication methods',
  },
  {
    id: 190,
    question:
      'A "stand-down" is a communication tool used after:',
    options: [
      'A win',
      'A serious incident or near-miss — work stops, the workforce is briefed on what happened and what changes',
      'A break',
      'A holiday',
    ],
    correctAnswer: 1,
    explanation:
      'Safety stand-downs reset the team after something significant. Work stops, briefing happens, lessons captured, work resumes when controls are confirmed.',
    section: '5.3.1',
    difficulty: 'intermediate',
    topic: 'Communication methods',
  },
  {
    id: 191,
    question:
      'Drawings are themselves a form of communication. A "cloud" on a revised drawing shows:',
    options: [
      'A doodle',
      'The area that has been changed since the previous revision — making it easy to spot what is new',
      'Weather',
      'A defect',
    ],
    correctAnswer: 1,
    explanation:
      'Revision clouds highlight changes between drawing issues. Combined with the revision triangle and revision history block, the reader can spot what is different.',
    section: '5.3.1',
    difficulty: 'intermediate',
    topic: 'Communication methods',
  },
  {
    id: 192,
    question:
      'A "request for information" (RFI) is a:',
    options: [
      'Holiday request',
      'Formal written question from contractor to designer/CA when a drawing or spec is unclear or contradictory — recorded and tracked',
      'Variation',
      'Invoice',
    ],
    correctAnswer: 1,
    explanation:
      'RFIs flush out design ambiguity. Numbered, tracked, with an answer date. Time spent writing the RFI saves multiples in rework if you guess wrong.',
    section: '5.3.1',
    difficulty: 'advanced',
    topic: 'Communication methods',
  },
  {
    id: 193,
    question:
      'Body language during a customer briefing should be:',
    options: [
      'Crossed arms, no eye contact',
      'Open posture, eye contact, nodding to acknowledge, calm tone — encourages trust and openness',
      'Facing away',
      'Looking at the phone',
    ],
    correctAnswer: 1,
    explanation:
      'Open posture and eye contact signal attention. Customers read body language even when they don\'t consciously notice it — it shapes their perception of competence.',
    section: '5.3.1',
    difficulty: 'basic',
    topic: 'Communication methods',
  },
  {
    id: 194,
    question:
      'A QR code on a site notice can:',
    options: [
      'Replace the notice entirely',
      'Supplement the notice — e.g. linking to manufacturer instructions, full RAMS or O&M info — but the printed words should still cover the key safety message',
      'Confuse people',
      'Do nothing',
    ],
    correctAnswer: 1,
    explanation:
      'QR codes are a useful supplement — they extend a printed notice. But not everyone will scan; the headline message must work without it.',
    section: '5.3.1',
    difficulty: 'intermediate',
    topic: 'Communication methods',
  },
  {
    id: 195,
    question:
      'A site notice board typically displays:',
    options: [
      'Personal info',
      'F10 notice (where required), site rules, fire plan, first-aid info, the H&S policy statement and current toolbox talk topics',
      'Nothing',
      'Football scores',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 requires the F10 displayed (where notifiable). Site notice boards also carry the H&S policy statement, fire plan, first-aiders and current safety information.',
    section: '5.3.1',
    difficulty: 'intermediate',
    topic: 'Communication methods',
  },
  {
    id: 196,
    question:
      'Voice notes (e.g. WhatsApp audio) for site instructions are usually:',
    options: [
      'Best practice',
      'Avoided for anything important — they are hard to search, share, transcribe and reference later; use written for record',
      'Required',
      'Only for emergencies',
    ],
    correctAnswer: 1,
    explanation:
      'Voice notes are convenient for the sender, painful for the recipient and useless as a record. Use text/email for anything you might need to refer back to.',
    section: '5.3.1',
    difficulty: 'basic',
    topic: 'Communication methods',
  },
  {
    id: 197,
    question:
      'A "tag" or label on a defective tool is a form of:',
    options: [
      'Decoration',
      'Visual communication — instantly tells anyone who picks it up that the tool is out of service, with reason and date',
      'Branding',
      'Inventory',
    ],
    correctAnswer: 1,
    explanation:
      'Visual signals (tags, lock-out devices, isolation tape) communicate to anyone passing — they don\'t depend on the next person remembering the verbal warning.',
    section: '5.3.1',
    difficulty: 'basic',
    topic: 'Communication methods',
  },
  {
    id: 198,
    question:
      'A weekly progress report typically uses which communication style?',
    options: [
      'Free-form prose',
      'Structured (sections: progress, programme, RFIs, variations, H&S incidents, look-ahead) so the reader can scan quickly',
      'Verbal',
      'A photo',
    ],
    correctAnswer: 1,
    explanation:
      'Structured weekly reports let busy readers scan to what matters. Most contracts and most clients expect a familiar structure.',
    section: '5.3.1',
    difficulty: 'intermediate',
    topic: 'Communication methods',
  },
  {
    id: 199,
    question:
      'A whiteboard in the site cabin used for the daily look-ahead is an example of:',
    options: [
      'Decoration',
      'Visual management — keeps the team\'s attention on today\'s priorities and tomorrow\'s readiness',
      'A toy',
      'A drawing',
    ],
    correctAnswer: 1,
    explanation:
      'Visual management (whiteboards, kanban, look-ahead boards) keeps the plan visible and the team aligned. Cheap, effective, and updated daily.',
    section: '5.3.1',
    difficulty: 'intermediate',
    topic: 'Communication methods',
  },
  {
    id: 200,
    question:
      'For an emergency on site (e.g. fire), what is the primary communication method?',
    options: [
      'Email',
      'Site alarm + verbal "evacuate" + roll call at muster point — every site\'s induction covers this',
      'WhatsApp',
      'Wait until later',
    ],
    correctAnswer: 1,
    explanation:
      'Emergencies need the loudest, fastest channel — alarm + voice + muster. Practiced through drills. The induction covers it for everyone, every site.',
    section: '5.3.1',
    difficulty: 'basic',
    topic: 'Communication methods',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // §5.3.2 — AC 3.2 Accessible communication (25 questions)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 201,
    question:
      'How should you brief a colleague whose first language is not English on a safe-isolation procedure?',
    options: [
      'Speak louder in English',
      'Use plain English with a visual demonstration, ask them to demonstrate it back, and provide a written checklist (translated where possible)',
      'Just give them the checklist and walk away',
      'Skip the briefing — they should pick it up',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-channel: plain language + visual demo + teach-back + translated checklist. Equality Act 2010 reasonable adjustments and HASAWA s.2 training duty both apply.',
    section: '5.3.2',
    difficulty: 'basic',
    topic: 'Accessible communication',
  },
  {
    id: 202,
    question:
      'A colleague is dyslexic and struggles with written method statements. A reasonable adjustment under the Equality Act 2010 might be:',
    options: [
      'Refusing to give them written documents at all',
      'Providing the MS in larger sans-serif font on cream paper, supplemented by a verbal walk-through and a labelled site sketch',
      'Telling them to "just get on with it"',
      'Removing them from the job',
    ],
    correctAnswer: 1,
    explanation:
      'Equality Act 2010 s.20 — reasonable adjustments. Dyslexia-friendly format (sans-serif, cream paper, larger spacing) plus verbal/visual reinforcement is a low-cost, high-impact adjustment.',
    section: '5.3.2',
    difficulty: 'intermediate',
    topic: 'Accessible communication',
  },
  {
    id: 203,
    question: 'Which is an example of accessible visual communication on site?',
    options: [
      'A small text-only safety notice',
      'Pictograms (e.g. PPE symbols) used alongside short text, in high-contrast colours',
      'A long memo in technical jargon',
      'A QR code with no caption',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN ISO 7010 standardises safety pictograms. Pictogram + short text in high contrast works across language and literacy barriers.',
    section: '5.3.2',
    difficulty: 'basic',
    topic: 'Accessible communication',
  },
  {
    id: 204,
    question:
      'A customer is deaf. What is the most accessible way to brief them on the work programme for the week?',
    options: [
      'Shout louder',
      'Use written communication (printed schedule + email), face them clearly when speaking so they can lip-read, and offer to use a BSL interpreter for complex discussions',
      'Speak only to a hearing relative',
      'Skip the briefing',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-channel and customer-led: written schedule + face them clearly + offer BSL for anything complex. The customer chooses what works for them.',
    section: '5.3.2',
    difficulty: 'intermediate',
    topic: 'Accessible communication',
  },
  {
    id: 205,
    question:
      'Why should H&S signage on site use ISO 7010 pictograms?',
    options: [
      'They look modern',
      'They are internationally standardised so workers from any background can recognise the meaning instantly',
      'They are cheaper',
      'It is required by BS 7671',
    ],
    correctAnswer: 1,
    explanation:
      'ISO 7010 standardises safety symbols globally. A red prohibition circle, blue mandatory circle and yellow warning triangle mean the same thing in every country.',
    section: '5.3.2',
    difficulty: 'basic',
    topic: 'Accessible communication',
  },
  {
    id: 206,
    question:
      'A neurodivergent colleague (autistic) has told you they find busy verbal briefings overwhelming. The most respectful adjustment is:',
    options: [
      'Brief them last when everyone else has left',
      'Give them the written brief in advance, allow processing time, follow up one-to-one in a quiet area for questions',
      'Stop briefing them altogether',
      'Single them out in front of the team',
    ],
    correctAnswer: 1,
    explanation:
      'Reasonable adjustments under Equality Act 2010 s.20. Pre-reading + processing time + quiet 1:1 follow-up respects their needs without singling them out.',
    section: '5.3.2',
    difficulty: 'advanced',
    topic: 'Accessible communication',
  },
  {
    id: 207,
    question:
      'Easy Read versions of customer letters are particularly useful for:',
    options: [
      'No one',
      'Customers with learning disabilities — short sentences, plain words, supporting images',
      'Only children',
      'Only the elderly',
    ],
    correctAnswer: 1,
    explanation:
      'Easy Read uses short sentences, plain words and images. Originally for people with learning disabilities, useful for many — including customers in stressful situations.',
    section: '5.3.2',
    difficulty: 'intermediate',
    topic: 'Accessible communication',
  },
  {
    id: 208,
    question:
      'Subtitles/captions on a training video are helpful for:',
    options: [
      'Only deaf people',
      'Deaf and hard-of-hearing people, non-native English speakers, anyone in a noisy environment, and many neurodivergent people — universal benefit',
      'No one',
      'Only office staff',
    ],
    correctAnswer: 1,
    explanation:
      'Captions are an "asymmetric design" win — designed for one group, useful to many. Always caption training videos.',
    section: '5.3.2',
    difficulty: 'basic',
    topic: 'Accessible communication',
  },
  {
    id: 209,
    question:
      'For accessible web/app content, the WCAG (Web Content Accessibility Guidelines) require minimum contrast ratios of:',
    options: [
      '1:1',
      '4.5:1 for normal text (Level AA) — so text reads against background for visually-impaired users',
      '10:1',
      'No requirement',
    ],
    correctAnswer: 1,
    explanation:
      'WCAG 2.1 Level AA: 4.5:1 contrast for normal text, 3:1 for large text. Public-sector websites must meet this; many private firms do too as good practice.',
    section: '5.3.2',
    difficulty: 'advanced',
    topic: 'Accessible communication',
  },
  {
    id: 210,
    question:
      'A customer letter using technical jargon could be made more accessible by:',
    options: [
      'Adding more jargon',
      'Replacing jargon with plain alternatives (e.g. "RCD" → "safety switch that cuts power if there\'s a fault"), short sentences, and a friendly closing',
      'Making it longer',
      'Using complex grammar',
    ],
    correctAnswer: 1,
    explanation:
      'Plain English: short sentences, plain words, jargon explained. The Plain English Campaign Crystal Mark is one external benchmark; the principle is universal.',
    section: '5.3.2',
    difficulty: 'basic',
    topic: 'Accessible communication',
  },
  {
    id: 211,
    question:
      'A colour-blind person may struggle with safety signs that rely on red/green only. The accessible solution is:',
    options: [
      'Use only red',
      'Pair colour with shape and text — red circle with slash for prohibition, blue circle for mandatory, yellow triangle for warning',
      'Use no colour',
      'Use bright colours only',
    ],
    correctAnswer: 1,
    explanation:
      'ISO 7010 already does this — colour + shape + symbol means the message survives even if colour is missed. Don\'t rely on colour alone.',
    section: '5.3.2',
    difficulty: 'intermediate',
    topic: 'Accessible communication',
  },
  {
    id: 212,
    question:
      'A site induction video for a multi-national workforce should:',
    options: [
      'Be in English only',
      'Have multiple language subtitles, use clear visuals, avoid colloquialisms, and include a short comprehension check at the end',
      'Use slang',
      'Be only verbal',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-language subtitles + visuals + plain English + comprehension check. Construction has a multilingual workforce — the induction should reflect that.',
    section: '5.3.2',
    difficulty: 'intermediate',
    topic: 'Accessible communication',
  },
  {
    id: 213,
    question:
      'A blind customer needs the EICR result. The accessible approach is:',
    options: [
      'Email PDF only',
      'Provide a tagged accessible PDF (or large-print/braille if requested), an audio summary, and offer a verbal walk-through of any concerns',
      'Refuse',
      'Give it to a relative without permission',
    ],
    correctAnswer: 1,
    explanation:
      'Customer-led format. A tagged PDF works with screen readers; a verbal walk-through covers nuance. Equality Act 2010 reasonable adjustments duty applies.',
    section: '5.3.2',
    difficulty: 'advanced',
    topic: 'Accessible communication',
  },
  {
    id: 214,
    question:
      'A sans-serif font like Arial or Verdana is generally easier to read on screen because:',
    options: [
      'It looks modern',
      'Letterforms are simpler with fewer decorative strokes, helping some readers (e.g. dyslexic) distinguish characters',
      'It is shorter',
      'It is colourful',
    ],
    correctAnswer: 1,
    explanation:
      'Sans-serif fonts are commonly recommended for screen and dyslexia-friendly text. Pair with adequate line spacing and avoid pure black-on-white for some readers.',
    section: '5.3.2',
    difficulty: 'intermediate',
    topic: 'Accessible communication',
  },
  {
    id: 215,
    question:
      'A "teach-back" technique is when you:',
    options: [
      'Lecture the audience',
      'Ask the listener to summarise back the key message in their own words to confirm understanding',
      'Read from a script',
      'Talk over them',
    ],
    correctAnswer: 1,
    explanation:
      'Teach-back catches misunderstandings before they become accidents. Use it for safe isolation, customer briefings, anything where wrong understanding is dangerous.',
    section: '5.3.2',
    difficulty: 'intermediate',
    topic: 'Accessible communication',
  },
  {
    id: 216,
    question:
      'A deaf-blind customer can communicate using:',
    options: [
      'Only sign language',
      'Tactile signing (deafblind manual or block alphabet), with the help of a communicator-guide — every situation is individual',
      'Only writing',
      'They cannot communicate',
    ],
    correctAnswer: 1,
    explanation:
      'Deafblind people use tactile communication methods, often with a communicator-guide. Engage with the customer (or their named contact) to find what works for them.',
    section: '5.3.2',
    difficulty: 'advanced',
    topic: 'Accessible communication',
  },
  {
    id: 217,
    question:
      'A briefing in noisy conditions (e.g. live workshop) should:',
    options: [
      'Be shouted',
      'Be moved to a quiet area, or use written/visual aids and confirm understanding individually',
      'Be skipped',
      'Be done quickly',
    ],
    correctAnswer: 1,
    explanation:
      'Noisy environments defeat verbal communication. Move to a quiet area, or use written and visual aids. PPE (ear defenders) further reduces hearing in workshops.',
    section: '5.3.2',
    difficulty: 'basic',
    topic: 'Accessible communication',
  },
  {
    id: 218,
    question:
      'When writing for accessibility, what is the recommended sentence length?',
    options: [
      '50+ words',
      'Under 25 words (ideally 15-20) — shorter sentences are easier to process for everyone',
      '5 words',
      'Whatever you fancy',
    ],
    correctAnswer: 1,
    explanation:
      'Plain English guidance: aim for 15-20 word sentences, max around 25. Long sentences slow comprehension for all readers — even the skilled.',
    section: '5.3.2',
    difficulty: 'intermediate',
    topic: 'Accessible communication',
  },
  {
    id: 219,
    question:
      'Closed captioning differs from subtitling in that:',
    options: [
      'No difference',
      'Closed captions also describe non-speech audio (sirens, music, off-screen voices) — useful for deaf viewers',
      'Subtitles are louder',
      'Captions are colour',
    ],
    correctAnswer: 1,
    explanation:
      'Captions add non-speech audio descriptions. Subtitles typically translate or transcribe speech only. For deaf viewers, captions give the fuller picture.',
    section: '5.3.2',
    difficulty: 'advanced',
    topic: 'Accessible communication',
  },
  {
    id: 220,
    question:
      'A site briefing should consider literacy levels — typical UK construction workforce average reading age is around:',
    options: [
      'University level',
      'A reading age of around 9-11 years has been quoted in industry research; brief accordingly',
      'Pre-school',
      'No relevance',
    ],
    correctAnswer: 1,
    explanation:
      'Industry research has flagged literacy as a barrier. Briefings should use plain language, visuals and confirmation — so the message lands regardless of reading skill.',
    section: '5.3.2',
    difficulty: 'advanced',
    topic: 'Accessible communication',
  },
  {
    id: 221,
    question:
      'A customer who uses a wheelchair lives in a property with a step at the front door. The accessible approach for a survey visit is:',
    options: [
      'Just ask them to come outside',
      'Phone ahead to discuss access — alternative meeting place, or use a portable ramp, or invite a family member as agreed with the customer',
      'Do nothing',
      'Skip the survey',
    ],
    correctAnswer: 1,
    explanation:
      'Plan accessibility ahead. Equality Act 2010 reasonable adjustments duty. Customer-led — they know their access best.',
    section: '5.3.2',
    difficulty: 'intermediate',
    topic: 'Accessible communication',
  },
  {
    id: 222,
    question:
      'Plain English Campaign\'s "Crystal Mark" certifies a document as:',
    options: [
      'Made of crystal',
      'Written in plain English to a defined standard — used by some public bodies and consumer-facing firms',
      'Translated',
      'Free',
    ],
    correctAnswer: 1,
    explanation:
      'Crystal Mark is a recognised standard for plain English. Many public bodies (HMRC, councils) use it; private firms may too as a quality signal.',
    section: '5.3.2',
    difficulty: 'advanced',
    topic: 'Accessible communication',
  },
  {
    id: 223,
    question:
      'For an audit by a hearing-impaired customer rep, the venue should ideally have:',
    options: [
      'A noisy cafe',
      'A hearing loop (induction loop), good lighting (for lip-reading), and chairs arranged so faces are visible',
      'A loud TV',
      'No special arrangements',
    ],
    correctAnswer: 1,
    explanation:
      'Hearing loops, lighting and seating arrangement remove barriers. Most modern meeting rooms in public buildings have loops; arrange seating consciously.',
    section: '5.3.2',
    difficulty: 'intermediate',
    topic: 'Accessible communication',
  },
  {
    id: 224,
    question:
      'When using technical drawings to communicate with a customer, you should:',
    options: [
      'Hand them over without explanation',
      'Walk them through the key symbols, highlight what they care about (sockets, switches, locations) and offer to print a simplified version',
      'Refuse to share',
      'Just email them',
    ],
    correctAnswer: 1,
    explanation:
      'Drawings are designer-to-installer language. Customers benefit from a translation: highlight what matters to them, simplify if possible.',
    section: '5.3.2',
    difficulty: 'basic',
    topic: 'Accessible communication',
  },
  {
    id: 225,
    question:
      'A "personal emergency evacuation plan" (PEEP) is needed for:',
    options: [
      'No one',
      'Anyone who cannot evacuate without assistance — e.g. mobility-impaired visitors, people with conditions affecting evacuation',
      'Only office staff',
      'Only construction',
    ],
    correctAnswer: 1,
    explanation:
      'PEEPs are part of the Regulatory Reform (Fire Safety) Order 2005 thinking. If someone needs help to evacuate, plan for it — don\'t leave it to the moment.',
    section: '5.3.2',
    difficulty: 'advanced',
    topic: 'Accessible communication',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // §5.3.3 — AC 3.3 Conflict (25 questions)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 226,
    question:
      'A customer says "you\'re useless, I want a different electrician". What is the best response?',
    options: [
      'Argue back and defend yourself',
      'Stay calm, listen to the specific complaint, acknowledge their frustration, and fetch your supervisor — document the interaction afterwards',
      'Walk off the job',
      'Call them rude',
    ],
    correctAnswer: 1,
    explanation:
      'De-escalate: stay calm, listen, acknowledge feeling (not necessarily agree), bring in supervisor. Document time, place, words used — protects you if it escalates further.',
    section: '5.3.3',
    difficulty: 'basic',
    topic: 'Conflict',
  },
  {
    id: 227,
    question:
      'A row breaks out between you and another trade over space in a riser cupboard. The best first step is to:',
    options: [
      'Down tools and refuse to work',
      'Step back, take a breath, and propose a quick joint look at the drawings with both supervisors to agree the sequence',
      'Shout louder',
      'Move the other trade\'s work yourself',
    ],
    correctAnswer: 1,
    explanation:
      'Conflict on site is usually about sequencing or co-ordination. Pause, get drawings, get supervisors, agree sequence — that\'s how the Principal Contractor expects it to be solved.',
    section: '5.3.3',
    difficulty: 'intermediate',
    topic: 'Conflict',
  },
  {
    id: 228,
    question:
      'A colleague is making jokes about your background that make you uncomfortable. What is the right response?',
    options: [
      'Laugh along to fit in',
      'Tell them clearly the comments are not OK, and report it to your supervisor or HR if it continues — this may be harassment under Equality Act 2010 s.26',
      'Get into a fight',
      'Quit the job',
    ],
    correctAnswer: 1,
    explanation:
      'Equality Act 2010 s.26 defines harassment as unwanted conduct related to a protected characteristic. Tell them, report it, log it. The employer has a duty to act.',
    section: '5.3.3',
    difficulty: 'intermediate',
    topic: 'Conflict',
  },
  {
    id: 229,
    question:
      'You believe you have been treated unfairly at work. What is the formal first step?',
    options: [
      'Go straight to an Employment Tribunal',
      'Raise it informally with your line manager first, then in writing as a formal grievance per the company procedure (which should mirror the ACAS Code)',
      'Resign',
      'Walk off site',
    ],
    correctAnswer: 1,
    explanation:
      'ACAS Code: try informal resolution, then a written grievance, then meeting, then appeal. Tribunal awards can be reduced by up to 25% if you skip these steps unreasonably.',
    section: '5.3.3',
    difficulty: 'advanced',
    topic: 'Conflict',
  },
  {
    id: 230,
    question:
      'A site manager and the client argue about a £3k variation. As the apprentice present, you should:',
    options: [
      'Take a side',
      'Stay out of the negotiation, carry on with your task, and let the supervisor and client resolve it — but record what you heard in case it\'s asked about later',
      'Tell the client they are right',
      'Call your training provider',
    ],
    correctAnswer: 1,
    explanation:
      'Stay neutral, stay productive, record what was said. Variations are above your pay grade but your honest record may be needed later if the dispute escalates.',
    section: '5.3.3',
    difficulty: 'basic',
    topic: 'Conflict',
  },
  {
    id: 231,
    question:
      'Aggressive behaviour from a member of the public at a domestic job suddenly escalates and you feel unsafe. What do you do?',
    options: [
      'Try to win the argument',
      'Withdraw to a safe place, call your supervisor, and call 999 if you fear imminent harm — never put yourself in danger to finish a job',
      'Carry on regardless',
      'Throw a tool back at them',
    ],
    correctAnswer: 1,
    explanation:
      'Personal safety first. HASAWA s.7 — duty to protect yourself. Withdraw, escalate, 999 if needed. The job will wait; your safety won\'t.',
    section: '5.3.3',
    difficulty: 'intermediate',
    topic: 'Conflict',
  },
  {
    id: 232,
    question:
      'A common cause of trade-on-trade conflict is:',
    options: [
      'Football',
      'Sequencing — one trade not ready when another is, or two trades working in the same space at the same time without co-ordination',
      'Music',
      'Lunch',
    ],
    correctAnswer: 1,
    explanation:
      'Sequencing/space conflicts are the daily friction on busy sites. The Principal Contractor co-ordinates this through programme and the daily look-ahead.',
    section: '5.3.3',
    difficulty: 'basic',
    topic: 'Conflict',
  },
  {
    id: 233,
    question:
      'When de-escalating a heated customer interaction, the most useful single technique is:',
    options: [
      'Talking over them',
      'Active listening with empathic acknowledgement — let them feel heard before trying to problem-solve',
      'Walking away mid-sentence',
      'Raising your voice',
    ],
    correctAnswer: 1,
    explanation:
      'People who feel heard de-escalate. Listen without interrupting; reflect what you hear; only then move to problem-solving. Counter-intuitive but it works.',
    section: '5.3.3',
    difficulty: 'intermediate',
    topic: 'Conflict',
  },
  {
    id: 234,
    question:
      'A formal grievance under the ACAS Code typically includes the right to be accompanied by:',
    options: [
      'A solicitor',
      'A trade union rep or a work colleague at the grievance meeting (statutory right under the Employment Relations Act 1999)',
      'A friend',
      'No one',
    ],
    correctAnswer: 1,
    explanation:
      'ERA 1999 s.10: statutory right to be accompanied by a TU rep or work colleague at grievance/disciplinary meetings. Solicitors can attend by agreement, not as of right.',
    section: '5.3.3',
    difficulty: 'advanced',
    topic: 'Conflict',
  },
  {
    id: 235,
    question:
      'A senior trade is verbally aggressive to an apprentice. The right response is:',
    options: [
      'Endure it',
      'Tell them clearly the behaviour is not OK, withdraw if needed, and report it to your line manager — this is bullying, not "banter"',
      'Match the aggression',
      'Wait for end of contract',
    ],
    correctAnswer: 1,
    explanation:
      'Bullying is a workplace H&S issue (HASAWA — psychological harm) and a contract/policy issue. Speak up, withdraw, report. Apprentices are protected the same as everyone else.',
    section: '5.3.3',
    difficulty: 'intermediate',
    topic: 'Conflict',
  },
  {
    id: 236,
    question:
      'A "win-win" approach to conflict resolution focuses on:',
    options: [
      'One side losing',
      'Looking for the underlying interests of both parties and finding a solution that meets both — a more durable outcome than either side "winning"',
      'Compromise alone',
      'Avoidance',
    ],
    correctAnswer: 1,
    explanation:
      'Interest-based negotiation (the Harvard "Getting to Yes" approach) digs beneath positions to find shared interests. More durable than positional bargaining.',
    section: '5.3.3',
    difficulty: 'advanced',
    topic: 'Conflict',
  },
  {
    id: 237,
    question:
      'A customer\'s complaint about timeliness of a job often masks a deeper issue, which is usually:',
    options: [
      'Money',
      'Lack of communication — the customer didn\'t know what was happening; reasonable updates would have prevented the complaint',
      'Football',
      'Weather',
    ],
    correctAnswer: 1,
    explanation:
      'Most "you\'re late" complaints are really "you didn\'t tell me you\'d be late". Proactive updates change the perception even when timing slips.',
    section: '5.3.3',
    difficulty: 'intermediate',
    topic: 'Conflict',
  },
  {
    id: 238,
    question:
      'An apprentice witnesses a fight on site. The correct action is:',
    options: [
      'Join in',
      'Move to safety, call site management/999 if needed, and provide a written witness account afterwards',
      'Watch and film it',
      'Walk away silently',
    ],
    correctAnswer: 1,
    explanation:
      'Personal safety first; let trained people manage the situation. A clear written witness account afterwards is invaluable for any disciplinary or police follow-up.',
    section: '5.3.3',
    difficulty: 'basic',
    topic: 'Conflict',
  },
  {
    id: 239,
    question:
      'Discrimination on the basis of a protected characteristic at work is unlawful under the Equality Act 2010. The four types are:',
    options: [
      'Direct, indirect, harassment, victimisation',
      'Yellow, green, red, blue',
      'Single, married, divorced, widowed',
      'Site, office, home, van',
    ],
    correctAnswer: 0,
    explanation:
      'Equality Act 2010 covers direct discrimination (treating someone less favourably), indirect (a rule that disadvantages a group), harassment (s.26) and victimisation (s.27).',
    section: '5.3.3',
    difficulty: 'advanced',
    topic: 'Conflict',
  },
  {
    id: 240,
    question:
      'A site manager loses their temper and makes a threat against an employee. What is the appropriate response?',
    options: [
      'Comply',
      'Withdraw from the immediate situation, report it as a grievance per the ACAS Code, and if the threat is criminal involve the police',
      'Confront physically',
      'Ignore it',
    ],
    correctAnswer: 1,
    explanation:
      'Threats are misconduct (and potentially criminal). Don\'t engage in the moment; report through formal channels. The company has a duty to investigate.',
    section: '5.3.3',
    difficulty: 'intermediate',
    topic: 'Conflict',
  },
  {
    id: 241,
    question:
      'A "conciliation" via ACAS is offered before:',
    options: [
      'Wages are paid',
      'An Employment Tribunal claim — early conciliation is mandatory under most claims (the EC certificate is required to lodge a claim)',
      'Holiday',
      'Lunch',
    ],
    correctAnswer: 1,
    explanation:
      'ACAS Early Conciliation is a mandatory step before most ET claims. It tries to resolve the dispute without tribunal — and the EC certificate is required to lodge.',
    section: '5.3.3',
    difficulty: 'advanced',
    topic: 'Conflict',
  },
  {
    id: 242,
    question:
      'A customer becomes aggressive about pricing. Best practice is:',
    options: [
      'Match their tone',
      'Stay calm, restate the basis of the price (scope, time, materials), offer to revisit any specific item — and end the conversation if it stays abusive',
      'Argue',
      'Drop the price immediately',
    ],
    correctAnswer: 1,
    explanation:
      'Stay calm, stick to facts, offer rational engagement on specifics. You don\'t have to tolerate abuse — leaving the conversation is a legitimate option.',
    section: '5.3.3',
    difficulty: 'intermediate',
    topic: 'Conflict',
  },
  {
    id: 243,
    question:
      'A "grievance" under the ACAS Code is:',
    options: [
      'A holiday request',
      'A formal concern, problem or complaint that an employee raises with their employer',
      'A purchase order',
      'A wage slip',
    ],
    correctAnswer: 1,
    explanation:
      'Grievance = employee → employer concern. Disciplinary = employer → employee concern. Both should follow the ACAS Code or their adapted company procedure.',
    section: '5.3.3',
    difficulty: 'basic',
    topic: 'Conflict',
  },
  {
    id: 244,
    question:
      'A neighbour at a domestic site makes racist comments to your colleague. The right response is:',
    options: [
      'Ignore it',
      'Withdraw your colleague, report to the supervisor and the customer, and make a record — a hate-speech matter may need police involvement',
      'Argue back',
      'Carry on',
    ],
    correctAnswer: 1,
    explanation:
      'Racism is a hate crime. Withdraw, report, record, escalate. The customer should be told their visitor\'s behaviour is unacceptable and unsafe for the team.',
    section: '5.3.3',
    difficulty: 'advanced',
    topic: 'Conflict',
  },
  {
    id: 245,
    question:
      'Two colleagues disagree about a wiring approach. Healthy resolution looks like:',
    options: [
      'Whoever is loudest wins',
      'Refer to the spec/drawings/BS 7671 — the standards arbitrate; if still unclear, raise an RFI to the designer',
      'Coin flip',
      'Avoid the work',
    ],
    correctAnswer: 1,
    explanation:
      'Technical disputes get resolved by the standards: spec, drawings, BS 7671. If they don\'t answer it, the designer (via RFI) does. That removes ego from the conversation.',
    section: '5.3.3',
    difficulty: 'intermediate',
    topic: 'Conflict',
  },
  {
    id: 246,
    question:
      'A "mediation" in workplace conflict is:',
    options: [
      'A massage',
      'A facilitated conversation between disputing parties, led by a trained neutral, aimed at reaching a voluntary resolution',
      'A disciplinary',
      'A tribunal',
    ],
    correctAnswer: 1,
    explanation:
      'Mediation uses a neutral facilitator to help parties find their own resolution. Often quicker, cheaper and less damaging than formal grievance/tribunal routes.',
    section: '5.3.3',
    difficulty: 'advanced',
    topic: 'Conflict',
  },
  {
    id: 247,
    question:
      'A subcontractor disputes a deduction from their final account. The best forum is:',
    options: [
      'A pub argument',
      'Negotiation first, then the contract\'s formal dispute resolution route (often adjudication under the Construction Act for construction contracts)',
      'Twitter',
      'Ignore them',
    ],
    correctAnswer: 1,
    explanation:
      'Construction Act (HGCRA 1996 as amended) gives statutory right to adjudication for construction contracts — fast (28-day) binding-pending-final route. Negotiate first, adjudicate if needed.',
    section: '5.3.3',
    difficulty: 'advanced',
    topic: 'Conflict',
  },
  {
    id: 248,
    question:
      'A customer\'s teenager films you working without consent and posts it on social media. The right response is:',
    options: [
      'Confront them',
      'Politely raise it with the customer (parent), explain the privacy concern, and if not removed escalate via your supervisor — UK GDPR may apply',
      'Take their phone',
      'Argue',
    ],
    correctAnswer: 1,
    explanation:
      'Polite escalation through the customer first. UK GDPR can apply where you\'re identifiable; ICO would expect you to engage proportionately rather than confront.',
    section: '5.3.3',
    difficulty: 'intermediate',
    topic: 'Conflict',
  },
  {
    id: 249,
    question:
      'A "Type A" personality colleague pushes hard on every disagreement. How do you co-exist productively?',
    options: [
      'Avoid them',
      'Stay factual, document agreements in writing, don\'t take it personally, and engage your supervisor early if it affects safety or the work',
      'Match the aggression',
      'Quit',
    ],
    correctAnswer: 1,
    explanation:
      'Stay factual, write things down, don\'t personalise. If it affects safety or the work, escalate. Most people moderate when they meet calm professionalism.',
    section: '5.3.3',
    difficulty: 'intermediate',
    topic: 'Conflict',
  },
  {
    id: 250,
    question:
      'A union member can also raise concerns through:',
    options: [
      'Only HR',
      'The union representative — confidential parallel route alongside the company\'s own grievance procedure',
      'Only friends',
      'No one',
    ],
    correctAnswer: 1,
    explanation:
      'Union reps are an additional confidential route. Members can use them alongside the company\'s formal channels — a backstop that protects against poor management.',
    section: '5.3.3',
    difficulty: 'basic',
    topic: 'Conflict',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // §5.3.4 — AC 3.4 Effects of poor communication (25 questions)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 251,
    question: 'What is usually the FIRST direct cost of poor communication on site?',
    options: [
      'Loss of insurance',
      'Rework — re-doing an installation because the spec was misunderstood',
      'Bankruptcy',
      'Court action',
    ],
    correctAnswer: 1,
    explanation:
      'Rework hits first: wrong cable run, wrong socket position, wrong colour finish. It eats labour, materials and programme — and customer goodwill.',
    section: '5.3.4',
    difficulty: 'basic',
    topic: 'Effects of poor communication',
  },
  {
    id: 252,
    question:
      'Poor communication of a safe-isolation handover between two electricians could result in:',
    options: [
      'A late lunch',
      'Electric shock or arc flash to the second person if they assume the system is dead — potentially fatal',
      'A small fine only',
      'Nothing serious',
    ],
    correctAnswer: 1,
    explanation:
      'Safe isolation must be personally proven by every person working on the system. Assuming someone else has done it has killed electricians. EAWR 1989 Reg 14.',
    section: '5.3.4',
    difficulty: 'intermediate',
    topic: 'Effects of poor communication',
  },
  {
    id: 253,
    question:
      'Which long-term effect on a contracting business is most likely from a pattern of poor communication with customers?',
    options: [
      'Increased referrals',
      'Reputation damage, negative reviews, lost repeat work and increased complaint handling cost',
      'Lower insurance premiums',
      'Easier hiring',
    ],
    correctAnswer: 1,
    explanation:
      'Trust is the contractor\'s currency. Poor comms → bad reviews → no referrals → marketing spend goes up to compensate. It compounds.',
    section: '5.3.4',
    difficulty: 'intermediate',
    topic: 'Effects of poor communication',
  },
  {
    id: 254,
    question:
      'A site manager fails to communicate a programme change. The likely operational impact on the electrical contractor is:',
    options: [
      'Nothing',
      'Wasted attendance (van and labour mobilised for nothing), abortive material drops and a knock-on delay claim against the main contractor',
      'A pay rise',
      'A bonus',
    ],
    correctAnswer: 1,
    explanation:
      'Abortive visits cost real money (van, fuel, paid time, materials returned to wholesaler at restock fee). Main contractors who don\'t communicate get charged for it.',
    section: '5.3.4',
    difficulty: 'intermediate',
    topic: 'Effects of poor communication',
  },
  {
    id: 255,
    question:
      'What is the worst-case legal consequence of a failure to communicate a known electrical hazard to other site workers?',
    options: [
      'A polite email',
      'Prosecution under HASAWA s.7 (employee duty) or s.3 (employer duty to non-employees) following an injury or fatality',
      'A toolbox talk',
      'A small refund',
    ],
    correctAnswer: 1,
    explanation:
      'Failing to warn others of a known hazard breaches HASAWA. Following an injury or fatality this can lead to personal prosecution (employee), corporate prosecution (employer) and possibly Corporate Manslaughter charges.',
    section: '5.3.4',
    difficulty: 'advanced',
    topic: 'Effects of poor communication',
  },
  {
    id: 256,
    question:
      'Which of these is a positive effect of good communication on site?',
    options: [
      'More accidents',
      'Higher productivity, fewer reworks, better safety record, stronger team morale and repeat-customer business',
      'Higher rework rates',
      'More disputes',
    ],
    correctAnswer: 1,
    explanation:
      'Good comms compounds the same way poor comms does — but in your favour. Productivity, safety, retention, repeat work all lift together.',
    section: '5.3.4',
    difficulty: 'basic',
    topic: 'Effects of poor communication',
  },
  {
    id: 257,
    question:
      'A "knock-on" delay caused by poor comms with one trade can affect:',
    options: [
      'Only that trade',
      'The whole programme — successor trades cannot start, scaffold may be retained, plant hire is extended; the cumulative cost grows fast',
      'Lunch',
      'Nothing',
    ],
    correctAnswer: 1,
    explanation:
      'Programme is interconnected. One missed handover ripples through scaffold hire, plant retention, successor trades, even the final completion date.',
    section: '5.3.4',
    difficulty: 'intermediate',
    topic: 'Effects of poor communication',
  },
  {
    id: 258,
    question:
      'Failure to record a verbal customer instruction can result in:',
    options: [
      'A bonus',
      'A "your word against theirs" dispute about scope and price — usually resolved in the customer\'s favour with no record',
      'A medal',
      'Nothing',
    ],
    correctAnswer: 1,
    explanation:
      'No record = no defence. Always confirm verbal instructions in writing. Email is fine; a screenshot of a text is fine — make sure it is captured somewhere.',
    section: '5.3.4',
    difficulty: 'basic',
    topic: 'Effects of poor communication',
  },
  {
    id: 259,
    question:
      'Mis-labelled circuits at a consumer unit are a poor-communication issue. The risk is:',
    options: [
      'None',
      'Wrong circuit isolated by future maintainers — leading to live work where the worker thought they had isolated; potentially fatal',
      'Cosmetic only',
      'Funny',
    ],
    correctAnswer: 1,
    explanation:
      'Circuit labels are written communication for future workers. Wrong labels invite the worst kind of mistake — confident isolation of the wrong circuit.',
    section: '5.3.4',
    difficulty: 'intermediate',
    topic: 'Effects of poor communication',
  },
  {
    id: 260,
    question:
      'A poorly-written method statement is most likely to lead to:',
    options: [
      'Better outcomes',
      'Workers improvising on site, missing critical controls — which the MS was supposed to spell out',
      'Less rework',
      'Lower cost',
    ],
    correctAnswer: 1,
    explanation:
      'A vague MS is worse than no MS — it gives false comfort that hazards are managed when they may not be. Improvisation fills the gap, and accidents follow.',
    section: '5.3.4',
    difficulty: 'intermediate',
    topic: 'Effects of poor communication',
  },
  {
    id: 261,
    question:
      'A failure to communicate variations promptly to the QS results in:',
    options: [
      'A bonus',
      'Variations missed from the next valuation — cash-flow strain on the contractor and arguments at final account',
      'Nothing',
      'Free coffee',
    ],
    correctAnswer: 1,
    explanation:
      'Late notification = late inclusion = cash-flow pain. Most contracts have time bars for notification — miss them and you may lose entitlement.',
    section: '5.3.4',
    difficulty: 'advanced',
    topic: 'Effects of poor communication',
  },
  {
    id: 262,
    question:
      'A trade missing a toolbox talk because they weren\'t told about it can lead to:',
    options: [
      'Nothing',
      'Working without the latest safety briefing — and the firm cannot evidence training under HASAWA s.2(2)(c) for that worker',
      'Better pay',
      'A bonus',
    ],
    correctAnswer: 1,
    explanation:
      'No briefing = no record = potential failure of the training duty. Toolbox talks must reach the people who need them; missed attendees should be re-briefed.',
    section: '5.3.4',
    difficulty: 'intermediate',
    topic: 'Effects of poor communication',
  },
  {
    id: 263,
    question:
      'Customer perception of a contractor is often shaped MORE by:',
    options: [
      'The technical work itself',
      'How well and how often the contractor communicates progress, problems and costs — the technical work is assumed to be competent',
      'The van colour',
      'The toolbox brand',
    ],
    correctAnswer: 1,
    explanation:
      'Customers usually can\'t judge the technical work — they assume competence. They judge what they CAN see: communication, tidiness, manners, punctuality.',
    section: '5.3.4',
    difficulty: 'intermediate',
    topic: 'Effects of poor communication',
  },
  {
    id: 264,
    question:
      'Poor handover information at job completion (no certs, no manuals) typically leads to:',
    options: [
      'Happy customers',
      'Repeat support calls, warranty disputes, and a Building Control or scheme audit failure if certs are missing',
      'Nothing',
      'A bonus',
    ],
    correctAnswer: 1,
    explanation:
      'Missing handover info = repeat calls + audit fails. BS 7671 Reg 132.13 makes this an installer duty — the customer pack matters.',
    section: '5.3.4',
    difficulty: 'intermediate',
    topic: 'Effects of poor communication',
  },
  {
    id: 265,
    question:
      'A failure to update RAMS after a near-miss is a communication failure that can lead to:',
    options: [
      'Lessons learned',
      'The same near-miss recurring — possibly with worse outcome — because the controls weren\'t shared or tightened',
      'Nothing',
      'A bonus',
    ],
    correctAnswer: 1,
    explanation:
      'Near-misses are warnings. If the RAMS isn\'t updated and the team isn\'t briefed, the warning is wasted and the actual incident becomes more likely.',
    section: '5.3.4',
    difficulty: 'intermediate',
    topic: 'Effects of poor communication',
  },
  {
    id: 266,
    question:
      'A wholesaler delivers the wrong cable size because the order was unclear. The cost falls on:',
    options: [
      'The wholesaler always',
      'Whoever placed the unclear order — the contractor pays for return restock fees and the impact on the day\'s work',
      'Nobody',
      'The customer',
    ],
    correctAnswer: 1,
    explanation:
      'Unclear orders = your problem. Restock fees, lost time, second visit. Always state size, length, BS standard, drum/coil and quantity precisely.',
    section: '5.3.4',
    difficulty: 'intermediate',
    topic: 'Effects of poor communication',
  },
  {
    id: 267,
    question:
      'A site that consistently has poor comms tends to attract:',
    options: [
      'The best people',
      'Higher staff turnover, lower morale and a worse safety culture — and worse commercial performance follows',
      'Awards',
      'Investors',
    ],
    correctAnswer: 1,
    explanation:
      'Comms culture and safety culture track together. Sites where people don\'t communicate also tend to lose people, lose performance and lose money.',
    section: '5.3.4',
    difficulty: 'advanced',
    topic: 'Effects of poor communication',
  },
  {
    id: 268,
    question:
      'A failure to read the spec carefully before pricing causes:',
    options: [
      'Nothing',
      'Items missed from the bid, leading to a job that loses money or to disputes with the customer over what was included',
      'A bonus',
      'Lower tax',
    ],
    correctAnswer: 1,
    explanation:
      'Estimating is reading first, pricing second. Missed scope is the classic "loss-leader" trap — the contractor takes the hit or fights for variations.',
    section: '5.3.4',
    difficulty: 'intermediate',
    topic: 'Effects of poor communication',
  },
  {
    id: 269,
    question:
      'Lack of feedback to apprentices on their work can lead to:',
    options: [
      'Better learning',
      'Slower skill development, repeated errors and disengagement — feedback is what turns experience into competence',
      'Faster promotion',
      'Nothing',
    ],
    correctAnswer: 1,
    explanation:
      'Apprentices learn fastest with prompt, specific feedback. Without it, errors persist and motivation drops. Supervisors who give feedback get better workers.',
    section: '5.3.4',
    difficulty: 'basic',
    topic: 'Effects of poor communication',
  },
  {
    id: 270,
    question:
      'A health-related communication failure (e.g. not telling a worker about a known asbestos area) can lead to:',
    options: [
      'Nothing',
      'Long-term occupational disease (mesothelioma) decades later — and a major civil liability claim against the firm',
      'A small fine',
      'A bonus',
    ],
    correctAnswer: 1,
    explanation:
      'Asbestos-related disease has a 20-40 year latency. Civil claims and regulatory enforcement can hit decades after the failure to communicate. CAR 2012 makes the duty explicit.',
    section: '5.3.4',
    difficulty: 'advanced',
    topic: 'Effects of poor communication',
  },
  {
    id: 271,
    question:
      'A failure to communicate a near-miss promptly may breach:',
    options: [
      'No regulation',
      'The company\'s own incident reporting policy, and potentially HASAWA s.7 if a hazard goes unaddressed and harms someone',
      'BS 7671',
      'COSHH',
    ],
    correctAnswer: 1,
    explanation:
      'Internal: breach of policy. External: HASAWA s.7 if you knew of a hazard and didn\'t report it, and harm followed. Report promptly — every time.',
    section: '5.3.4',
    difficulty: 'advanced',
    topic: 'Effects of poor communication',
  },
  {
    id: 272,
    question:
      'A customer who feels ignored during a job is more likely to:',
    options: [
      'Recommend you',
      'Withhold final payment, leave a poor review, and never use you again — even if the work itself was fine',
      'Pay extra',
      'Be neutral',
    ],
    correctAnswer: 1,
    explanation:
      'Communication shapes the experience more than technical work. Ignored customers are unhappy customers — and they tell others.',
    section: '5.3.4',
    difficulty: 'basic',
    topic: 'Effects of poor communication',
  },
  {
    id: 273,
    question:
      'A drawing issued at revision C while the team works to revision B because no one was told is a:',
    options: [
      'Win',
      'Communication failure that leads to rework — the controlled drawing register exists exactly to prevent this',
      'Bonus',
      'Acceptable risk',
    ],
    correctAnswer: 1,
    explanation:
      'Drawing-revision discipline is a daily comms task. The register, the issue note and the removal of superseded drawings together prevent expensive misalignment.',
    section: '5.3.4',
    difficulty: 'intermediate',
    topic: 'Effects of poor communication',
  },
  {
    id: 274,
    question:
      'Internal team comms failures (e.g. a new starter not knowing reporting routes) can lead to:',
    options: [
      'Nothing',
      'Hazards going unreported, isolation of the new starter, and slower integration into the team — a missed induction is a real cost',
      'Bonuses',
      'Faster integration',
    ],
    correctAnswer: 1,
    explanation:
      'Inductions are the foundation of internal comms. Skipped or rushed inductions show up later as missed reports, slower onboarding and avoidable mistakes.',
    section: '5.3.4',
    difficulty: 'intermediate',
    topic: 'Effects of poor communication',
  },
  {
    id: 275,
    question:
      'Good communication is consistently associated with:',
    options: [
      'Nothing measurable',
      'Better safety performance, higher productivity, lower complaint rates, higher customer NPS and lower staff turnover — measurable on every metric',
      'Higher costs only',
      'Slower work',
    ],
    correctAnswer: 1,
    explanation:
      'Comms isn\'t a "soft" skill — it\'s a leading indicator for almost every other business outcome. Investing in it pays back across the board.',
    section: '5.3.4',
    difficulty: 'basic',
    topic: 'Effects of poor communication',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Cross-cutting (25 questions): CDM Worker, GDPR/DPA, mental health, BS 7671 514.13/514.12,
  // PIDA whistleblowing, Equality Act protected characteristics, ACAS Code
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 276,
    question:
      'Under CDM 2015 Reg 15, your duty as a Worker on a construction site is to:',
    options: [
      'Wear hi-vis only',
      'Co-operate with the Principal Contractor, comply with directions and H&S information, and report anything you see that puts you or others at risk',
      'Carry your own first-aid kit',
      'Provide your own RAMS',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 Reg 15 places three duties on workers: co-operate, comply, and report defects/risks. It mirrors HASAWA s.7 in a CDM-specific way.',
    section: '5.X.1',
    difficulty: 'intermediate',
    topic: 'CDM Worker duties',
  },
  {
    id: 277,
    question:
      'A customer\'s name, address and EICR results count as personal data. Under the UK GDPR / Data Protection Act 2018, you should:',
    options: [
      'Email them around freely',
      'Process them only for the agreed purpose (the cert), store them securely, share only with parties who need them (e.g. landlord, scheme provider), and have a privacy notice telling the customer what you do with their data',
      'Sell them on',
      'Post them on social media as a job done',
    ],
    correctAnswer: 1,
    explanation:
      'UK GDPR principles: lawfulness, purpose limitation, data minimisation, accuracy, storage limitation, integrity/confidentiality, accountability. A short privacy notice on your quote/invoice covers your obligations to the customer.',
    section: '5.X.1',
    difficulty: 'advanced',
    topic: 'GDPR / Data protection',
  },
  {
    id: 278,
    question:
      'A struggling tradesperson in the UK construction industry can get free 24/7 mental health support from:',
    options: [
      'No one — they should just get on with it',
      'The Lighthouse Construction Industry Charity (helpline 0345 605 1956) and apps such as the Lighthouse Helpline app',
      'Only their GP during opening hours',
      'Only the HSE',
    ],
    correctAnswer: 1,
    explanation:
      'Lighthouse Club / Lighthouse Construction Industry Charity runs a free, confidential 24/7 helpline (0345 605 1956) and a self-support app. Two construction workers a day in the UK take their own lives — this matters.',
    section: '5.X.1',
    difficulty: 'basic',
    topic: 'Mental health & wellbeing',
  },
  {
    id: 279,
    question:
      'BS 7671 Reg 514.13.1 requires which warning notice to be fixed at certain earthing/bonding connection points?',
    options: [
      'A "Do not touch" sticker',
      'A notice marked "Safety Electrical Connection - Do Not Remove" durably fixed in a visible position',
      'A QR code linking to the manufacturer',
      'The electrician\'s phone number',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Reg 514.13.1 (A4:2026): "Safety Electrical Connection - Do Not Remove" notices at earthing/bonding connection points. (Periodic inspection notices are 514.12; supply-source warnings 514.15.)',
    section: '5.X.1',
    difficulty: 'intermediate',
    topic: 'BS 7671 514.13 warning notices',
  },
  {
    id: 280,
    question:
      'BS 7671 Reg 514.12 covers periodic inspection and testing notices. The A4:2026 amendment introduced an exception for:',
    options: [
      'Industrial premises',
      'Domestic (household) premises in certain situations — the standard 514.12 notice does not apply where conditions are met',
      'Marina installations',
      'No exception',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 A4:2026 added an exception in 514.12 for domestic (household) premises in certain situations — recognising the modern landlord regime already requires periodic EICR.',
    section: '5.X.1',
    difficulty: 'advanced',
    topic: 'BS 7671 514.12 warning notices',
  },
  {
    id: 281,
    question:
      'A "protected disclosure" under PIDA 1998 (Public Interest Disclosure Act) is a report about:',
    options: [
      'Personal grievances only',
      'A relevant failure (criminal offence, breach of legal obligation, miscarriage of justice, danger to H&S, environmental damage, or cover-up of the above)',
      'Football opinions',
      'Holiday requests',
    ],
    correctAnswer: 1,
    explanation:
      'PIDA 1998 (incorporated in ERA 1996) lists six categories of relevant failure that can amount to protected disclosures. Workers reporting them in the public interest are protected from detriment.',
    section: '5.X.1',
    difficulty: 'advanced',
    topic: 'Whistleblowing (PIDA)',
  },
  {
    id: 282,
    question:
      'A worker who makes a qualifying disclosure under PIDA and is subsequently dismissed has a claim for:',
    options: [
      'No claim',
      'Automatically unfair dismissal — no qualifying period applies and uncapped compensation may follow',
      'A small fine',
      'A bonus',
    ],
    correctAnswer: 1,
    explanation:
      'PIDA dismissals are automatically unfair — no 2-year qualifying period, no statutory cap on compensation. The protection is strong because the public-interest goal is strong.',
    section: '5.X.1',
    difficulty: 'advanced',
    topic: 'Whistleblowing (PIDA)',
  },
  {
    id: 283,
    question:
      'Equality Act 2010 protected characteristic — "gender reassignment" protects:',
    options: [
      'No one',
      'A person who is proposing to undergo, is undergoing, or has undergone a process to reassign their sex — they have the protected characteristic from the moment they propose it',
      'Only people who have had surgery',
      'Only those with a Gender Recognition Certificate',
    ],
    correctAnswer: 1,
    explanation:
      'EA 2010 s.7: gender reassignment protection applies from the moment the person decides to transition — no medical or legal step is required to be protected.',
    section: '5.X.1',
    difficulty: 'advanced',
    topic: 'Equality Act protected characteristics',
  },
  {
    id: 284,
    question:
      'Equality Act 2010 protected characteristic — "disability" is defined as:',
    options: [
      'Only mobility issues',
      'A physical or mental impairment with a substantial and long-term (12 months+) adverse effect on ability to carry out normal day-to-day activities',
      'Only registered disability',
      'Only severe conditions',
    ],
    correctAnswer: 1,
    explanation:
      'EA 2010 s.6: definition is broad — physical or mental, substantial, long-term (12 months+ or recurring). Some conditions (e.g. cancer, MS, HIV) are deemed disabilities from diagnosis.',
    section: '5.X.1',
    difficulty: 'advanced',
    topic: 'Equality Act protected characteristics',
  },
  {
    id: 285,
    question:
      'Equality Act 2010 protected characteristic — "religion or belief" includes:',
    options: [
      'Religion only',
      'Religion and any religious or philosophical belief (including a lack of belief) — recognised philosophical beliefs include ethical veganism and gender-critical belief',
      'Only major world religions',
      'Only Christianity',
    ],
    correctAnswer: 1,
    explanation:
      'EA 2010 s.10: religion and philosophical belief, including the lack of belief. Case law has extended this to ethical veganism and gender-critical views as qualifying beliefs.',
    section: '5.X.1',
    difficulty: 'advanced',
    topic: 'Equality Act protected characteristics',
  },
  {
    id: 286,
    question:
      'The ACAS Code of Practice on Disciplinary and Grievance Procedures recommends what overall structure?',
    options: [
      'Decide first, ask later',
      'Establish facts → inform employee → hold meeting → decide → allow appeal',
      'No structure',
      'Random order',
    ],
    correctAnswer: 1,
    explanation:
      'ACAS Code: investigate → notify in writing → meeting (with right to be accompanied) → decision in writing → right of appeal. Skip these and tribunals can uplift awards by up to 25%.',
    section: '5.X.1',
    difficulty: 'advanced',
    topic: 'ACAS Code of Practice',
  },
  {
    id: 287,
    question:
      'The ACAS Code applies to:',
    options: [
      'Only large firms',
      'All employers and workers — failure to follow it can affect tribunal awards in unfair dismissal and similar claims',
      'Only public sector',
      'Only union members',
    ],
    correctAnswer: 1,
    explanation:
      'ACAS Code applies universally. Tribunals can adjust awards by up to 25% if it is unreasonably ignored — by either party. Worth knowing inside out.',
    section: '5.X.1',
    difficulty: 'intermediate',
    topic: 'ACAS Code of Practice',
  },
  {
    id: 288,
    question:
      'Mates in Mind is a UK construction industry charity focused on:',
    options: [
      'Football',
      'Mental health awareness, training and support across the construction sector',
      'Tools',
      'Training PPE',
    ],
    correctAnswer: 1,
    explanation:
      'Mates in Mind partners with employers to roll out mental health awareness training, signposting and support across construction. Sister organisation to Lighthouse Club.',
    section: '5.X.1',
    difficulty: 'basic',
    topic: 'Mental health & wellbeing',
  },
  {
    id: 289,
    question:
      'Mind\'s mental health helpline (Infoline) operates on:',
    options: [
      'No number',
      '0300 123 3393 (Mon-Fri 9am-6pm) — for support, info and guidance on mental health concerns',
      '999 only',
      'Email only',
    ],
    correctAnswer: 1,
    explanation:
      'Mind Infoline 0300 123 3393 — Mon-Fri 9am-6pm. For 24/7 in crisis: Samaritans 116 123. For construction-specific 24/7: Lighthouse 0345 605 1956.',
    section: '5.X.1',
    difficulty: 'basic',
    topic: 'Mental health & wellbeing',
  },
  {
    id: 290,
    question:
      'Under UK GDPR, the lawful basis most commonly relied on for processing customer data on a contracting job is:',
    options: [
      'Consent only',
      'Contract — processing necessary for the performance of the contract (or to take pre-contract steps at the customer\'s request)',
      'Vital interests',
      'No basis',
    ],
    correctAnswer: 1,
    explanation:
      'UK GDPR Art 6(1)(b): contract is the usual basis for routine customer data on a job. Consent is needed for marketing/separate purposes; legitimate interests for some others.',
    section: '5.X.1',
    difficulty: 'advanced',
    topic: 'GDPR / Data protection',
  },
  {
    id: 291,
    question:
      'A personal data breach (e.g. lost laptop with customer data) under UK GDPR must be reported to the ICO within:',
    options: [
      '24 hours',
      '72 hours of awareness, where the breach is likely to result in a risk to individuals',
      '7 days',
      'Never',
    ],
    correctAnswer: 1,
    explanation:
      'UK GDPR Art 33: 72-hour notification to ICO where breach likely to risk individuals. Affected individuals must also be notified if high risk. Train your team to flag immediately.',
    section: '5.X.1',
    difficulty: 'advanced',
    topic: 'GDPR / Data protection',
  },
  {
    id: 292,
    question:
      'CDM 2015 Reg 15 requires Workers to report which of the following?',
    options: [
      'Only major incidents',
      'Anything they consider likely to endanger their own H&S, or that of another person — to the appropriate person (typically site manager or supervisor)',
      'Only non-injury items',
      'Nothing',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 Reg 15(3): workers must report any work, situation or activity they consider likely to endanger H&S. Mirrors HASAWA s.7 — broad personal duty.',
    section: '5.X.1',
    difficulty: 'intermediate',
    topic: 'CDM Worker duties',
  },
  {
    id: 293,
    question:
      'BS 7671 Reg 514.15 requires warning notices where:',
    options: [
      'There is one supply',
      'An installation includes alternative or additional sources of supply (e.g. PV, battery, generator) — at the origin and at certain other points',
      'Only at lights',
      'Only at sockets',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Reg 514.15.1 (A4:2026): warning notices for alternative/additional supplies — at the origin and at the meter (if remote). Critical for safe isolation by future workers.',
    section: '5.X.1',
    difficulty: 'advanced',
    topic: 'BS 7671 514.15 warning notices',
  },
  {
    id: 294,
    question:
      'A subject access request (SAR) under UK GDPR/DPA 2018 must be responded to within:',
    options: [
      '7 days',
      'One month (extendable to three months for complex requests if the data subject is told of the extension within the first month)',
      '6 months',
      'Never',
    ],
    correctAnswer: 1,
    explanation:
      'UK GDPR Art 12: one calendar month, extendable by two further months for complex/numerous requests. Free of charge for the first request.',
    section: '5.X.1',
    difficulty: 'advanced',
    topic: 'GDPR / Data protection',
  },
  {
    id: 295,
    question:
      'A protected disclosure under PIDA must be made (in normal cases) to:',
    options: [
      'The press first',
      'The employer or another responsible person (with wider routes including prescribed persons such as the HSE or ICO if conditions are met)',
      'Anyone',
      'Friends',
    ],
    correctAnswer: 1,
    explanation:
      'PIDA tiers: employer first (most cases) → prescribed person (regulator) → wider disclosure (only if certain conditions met). Going straight to the press loses protection in most cases.',
    section: '5.X.1',
    difficulty: 'advanced',
    topic: 'Whistleblowing (PIDA)',
  },
  {
    id: 296,
    question:
      'Equality Act 2010 protected characteristic — "marriage and civil partnership" protects:',
    options: [
      'Only married people',
      'Anyone who is married or in a civil partnership; cohabitees and single people are not protected by this characteristic',
      'Cohabitees',
      'Single people',
    ],
    correctAnswer: 1,
    explanation:
      'EA 2010 s.8: only marriage and civil partnership are protected by this characteristic. Cohabitees and single people are not (though other characteristics may apply).',
    section: '5.X.1',
    difficulty: 'advanced',
    topic: 'Equality Act protected characteristics',
  },
  {
    id: 297,
    question:
      'The Samaritans 24/7 free helpline number is:',
    options: [
      '999',
      '116 123',
      '101',
      'No number',
    ],
    correctAnswer: 1,
    explanation:
      'Samaritans: 116 123, free, 24/7. Text "SHOUT" to 85258 also offers a UK 24/7 text-based crisis support service. Save these numbers in your phone.',
    section: '5.X.1',
    difficulty: 'basic',
    topic: 'Mental health & wellbeing',
  },
  {
    id: 298,
    question:
      'A "fundamental breach" of the ACAS Code by an employer can lead to a tribunal award uplift of up to:',
    options: [
      '5%',
      '25%',
      '100%',
      'No uplift',
    ],
    correctAnswer: 1,
    explanation:
      'ACAS Code uplift: up to 25% increase in tribunal awards where the employer unreasonably failed to follow the Code. Equally, awards can be reduced by up to 25% if the employee unreasonably failed.',
    section: '5.X.1',
    difficulty: 'advanced',
    topic: 'ACAS Code of Practice',
  },
  {
    id: 299,
    question:
      'BS 7671 Reg 514.11 (A4:2026) covers warning notices about:',
    options: [
      'Periodic testing',
      'Isolation — to alert workers where an isolation device does not isolate all live conductors at a single point',
      'Earthing only',
      'Nothing',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Reg 514.11: warning notices about non-single-device isolation. Tells future workers a single switch may not kill everything. Sits alongside 514.12 (PIT), 514.13 (earthing), 514.15 (alt supplies).',
    section: '5.X.1',
    difficulty: 'advanced',
    topic: 'BS 7671 514.11 warning notices',
  },
  {
    id: 300,
    question:
      'A construction firm with a strong wellbeing culture typically combines which of the following?',
    options: [
      'Just a poster',
      'Mental Health First Aiders, EAP access, signposting (Lighthouse, Mind, Mates in Mind, Samaritans), regular wellbeing toolbox talks, and a no-blame reporting culture',
      'Bonuses only',
      'Nothing',
    ],
    correctAnswer: 1,
    explanation:
      'Layered wellbeing: trained MHFAs, EAP access, signposting (Lighthouse 0345 605 1956 / Mind 0300 123 3393 / Mates in Mind / Samaritans 116 123), toolbox talks, and a culture where speaking up is safe.',
    section: '5.X.1',
    difficulty: 'basic',
    topic: 'Mental health & wellbeing',
  },
];

/**
 * Get random questions from the Module 5 question bank
 * @param count Number of questions to return
 * @param difficultyDistribution Optional distribution of difficulty levels (percentages)
 * @returns Array of random questions
 */
export function getRandomQuestions(
  count: number = 30,
  difficultyDistribution: { basic: number; intermediate: number; advanced: number } = {
    basic: 40,
    intermediate: 45,
    advanced: 15,
  }
): QuestionBank[] {
  const basicCount = Math.round((count * difficultyDistribution.basic) / 100);
  const intermediateCount = Math.round((count * difficultyDistribution.intermediate) / 100);
  const advancedCount = count - basicCount - intermediateCount;

  const basicQuestions = module5QuestionBank.filter((q) => q.difficulty === 'basic');
  const intermediateQuestions = module5QuestionBank.filter((q) => q.difficulty === 'intermediate');
  const advancedQuestions = module5QuestionBank.filter((q) => q.difficulty === 'advanced');

  const selectedBasic = basicQuestions.sort(() => 0.5 - Math.random()).slice(0, basicCount);
  const selectedIntermediate = intermediateQuestions
    .sort(() => 0.5 - Math.random())
    .slice(0, intermediateCount);
  const selectedAdvanced = advancedQuestions
    .sort(() => 0.5 - Math.random())
    .slice(0, advancedCount);

  return [...selectedBasic, ...selectedIntermediate, ...selectedAdvanced].sort(
    () => 0.5 - Math.random()
  );
}

/**
 * Validate the question bank structure and distribution
 */
export function validateQuestionBank(): {
  isValid: boolean;
  totalQuestions: number;
  sectionDistribution: Record<string, number>;
  difficultyDistribution: Record<string, number>;
  issues: string[];
} {
  const issues: string[] = [];
  const sectionDistribution: Record<string, number> = {};
  const difficultyDistribution: Record<string, number> = {};

  // Count by section
  module5QuestionBank.forEach((q) => {
    sectionDistribution[q.section] = (sectionDistribution[q.section] || 0) + 1;
    difficultyDistribution[q.difficulty] = (difficultyDistribution[q.difficulty] || 0) + 1;
  });

  // Validate total count (Unit 210 bank: 300 questions across 11 ACs + cross-cutting)
  if (module5QuestionBank.length < 300) {
    issues.push(`Insufficient questions: ${module5QuestionBank.length} (target: 300)`);
  }

  // Validate all 11 ACs are covered (5.1.1–5.1.3, 5.2.1–5.2.4, 5.3.1–5.3.4)
  const expectedSections = [
    '5.1.1',
    '5.1.2',
    '5.1.3',
    '5.2.1',
    '5.2.2',
    '5.2.3',
    '5.2.4',
    '5.3.1',
    '5.3.2',
    '5.3.3',
    '5.3.4',
  ];
  expectedSections.forEach((section) => {
    if (!sectionDistribution[section] || sectionDistribution[section] < 25) {
      issues.push(
        `AC ${section} has ${sectionDistribution[section] || 0} questions (target: 25+)`
      );
    }
  });

  // Validate difficulty distribution
  const basicPercentage =
    ((difficultyDistribution['basic'] || 0) / module5QuestionBank.length) * 100;
  const intermediatePercentage =
    ((difficultyDistribution['intermediate'] || 0) / module5QuestionBank.length) * 100;
  const advancedPercentage =
    ((difficultyDistribution['advanced'] || 0) / module5QuestionBank.length) * 100;

  // Difficulty ranges sized for the 300-question bank (broader spread than the
  // original 70-question bank because the expanded bank intentionally pulls
  // more nuanced statutory/contract content into the advanced tier).
  if (basicPercentage < 20 || basicPercentage > 50) {
    issues.push(
      `Basic questions percentage out of range: ${basicPercentage.toFixed(1)}% (recommended: 20-50%)`
    );
  }
  if (intermediatePercentage < 35 || intermediatePercentage > 55) {
    issues.push(
      `Intermediate questions percentage out of range: ${intermediatePercentage.toFixed(1)}% (recommended: 35-55%)`
    );
  }
  if (advancedPercentage < 10 || advancedPercentage > 35) {
    issues.push(
      `Advanced questions percentage out of range: ${advancedPercentage.toFixed(1)}% (recommended: 10-35%)`
    );
  }

  return {
    isValid: issues.length === 0,
    totalQuestions: module5QuestionBank.length,
    sectionDistribution,
    difficultyDistribution,
    issues,
  };
}

