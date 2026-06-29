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
    options: [
      'Site visitor',
      'Principal Contractor',
      'Client',
      'Principal Designer',
    ],
    correctAnswer: 1,
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
      'The supervising electrician, as the senior competent person on site',
      'The apprentice, because they are present on every working day',
      'The householder who commissioned the work',
      'The competent person scheme provider that registers the work',
    ],
    correctAnswer: 2,
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
    options: [
      'Principal Contractor',
      'Quantity surveyor',
      'Site supervisor',
      'Principal Designer',
    ],
    correctAnswer: 3,
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
      'Stop work, raise the concern with the supervisor and document it; escalate to the contracts manager if needed',
      'Carry on as instructed — the supervisor holds the responsibility, so any fault is on them, not you',
      'Energise and test the circuit first to prove whether it is actually unsafe before saying anything',
      'Finish the task quietly but make a note in the site diary so you are covered if it goes wrong',
    ],
    correctAnswer: 0,
    explanation:
      'HASAWA s.7 places a personal duty on every employee to take reasonable care for themselves and others. Stop, report, document — never work around an unsafe instruction.',
    section: '5.1.1',
    difficulty: 'intermediate',
    topic: 'Site management team',
  },
  {
    id: 5,
    question: 'Which member of the site team would normally chair the daily morning briefing on a multi-trade project?',
    options: [
      'Apprentice',
      'Site manager',
      'Wholesaler rep',
      'Client',
    ],
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
      'The HSE automatically appoints both duty holders on the client\'s behalf',
      'Work cannot legally start until the appointments are made, so the project is suspended',
      'The client takes on those duties themselves under CDM 2015 Reg 5(3)',
      'The largest contractor on site is deemed to be the Principal Contractor by default',
    ],
    correctAnswer: 2,
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
      'The apprentice can be issued their own permit once they have completed the site induction',
      'The apprentice signs the permit register on behalf of the team each morning',
      'The apprentice holds the permit and authorises others to enter the clinical area',
      'Work only under a permit issued to a competent person, follow its conditions exactly and never extend it',
    ],
    correctAnswer: 3,
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
      'The Principal Designer (who compiles it) and hands it to the client at end of construction',
      'The HSE inspector, who must countersign the file before the building can be occupied',
      'The Building Control surveyor, who keeps the master copy on the council\'s records',
      'The site manager, who archives it on behalf of the Principal Contractor after handover',
    ],
    correctAnswer: 0,
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
      'The apprentice on site, as the youngest person closest to the pupils\' age group',
      'The Principal Contractor\'s site manager, liaising with the school\'s designated safeguarding lead',
      'The local authority Environmental Health Officer, who oversees all school visits',
      'The Principal Designer, who builds safeguarding into the pre-construction information',
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
      'They are exactly the same role — the two titles are interchangeable and carry identical authority',
      'The site manager is the more senior commercial role; the site agent only handles deliveries and gate security',
      'The site agent is more senior, often running multiple sites or the whole project commercially; the site manager runs the day-to-day operations on one site',
      'The site agent works for the client while the site manager always works for a subcontractor',
    ],
    correctAnswer: 2,
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
      'Each individual trade contractor provides welfare only for its own operatives',
      'The client, because welfare facilities are part of the pre-construction information',
      'Whichever trade arrives on site first must set up the shared welfare facilities',
      'The Principal Contractor under CDM 2015 Schedule 2 — welfare must be provided from the start',
    ],
    correctAnswer: 3,
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
      'Quantity surveyor — measures work, values variations and prepares payment applications',
      'Qualified supervisor — the named competent person for the scheme registration',
      'Quality surveyor — inspects finished work and signs off snags before handover',
      'Quayside storeman — controls material deliveries and stock on large sites',
    ],
    correctAnswer: 0,
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
      'Manage the maintenance and electrical testing schedule once the building is occupied',
      'Co-ordinate mechanical and electrical services so trades do not clash in ceilings, risers and plant rooms — usually using a BIM model',
      'Negotiate the mechanical and electrical material prices with wholesalers for the project',
      'Carry out the final commissioning of all mechanical and electrical plant single-handed',
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
      'The HSE — site safety advisors are government inspectors carrying out routine visits',
      'The individual trades, who jointly employ the advisor and share the cost between them',
      'The Principal Contractor (or a CDM consultancy) — they audit conditions, review RAMS and report to senior management',
      'The client directly, replacing the need for a Principal Designer on the project',
    ],
    correctAnswer: 2,
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
      'The client — they own the building, so they brief everyone entering it',
      'The hospital\'s estates department, as the site sits within their premises',
      'Your training provider, who must approve any new placement before you start',
      'The site manager (or their nominee) — covers site rules, hazards, emergency procedures, welfare and reporting routes',
    ],
    correctAnswer: 3,
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
      'The householder is the Principal Contractor because they own the property',
      'The wholesaler supplying the materials is treated as the Principal Contractor',
      'The HSE acts as the Principal Contractor on all single-trade domestic jobs',
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
    options: [
      'Plant controller',
      'Principal Contractor',
      'Personal computer',
      'Project consultant',
    ],
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
      'Do it as told — a foreman\'s instruction overrides the site rules for short tasks',
      'Wear the harness but skip clipping on, since five minutes is too brief to matter',
      'Refuse politely, do the task with proper fall protection, and report the instruction to your own supervisor',
      'Get a colleague to foot the ladder instead, so the harness is not needed at all',
    ],
    correctAnswer: 2,
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
      'The site manager, regardless of their trade background or electrical knowledge',
      'Another apprentice in a later year of the same training programme',
      'The wholesaler\'s technical helpline, which is the firm\'s main source of guidance',
      'The Approved Electrician or Technician grade who supervises their work',
    ],
    correctAnswer: 3,
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
      'The contractor\'s project/site manager and commercial lead — not individual trades',
      'Whichever trade is working in the area the client wants to discuss that week',
      'The apprentice keeping the site diary, who records the client\'s requests directly',
      'The HSE inspector, who passes the client\'s concerns on to the contractor',
    ],
    correctAnswer: 0,
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
    options: [
      'Reg 5',
      'Reg 12',
      'Reg 15',
      'Reg 22',
    ],
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
      'Principal Fire Officer, appointed by the local fire and rescue authority',
      'Senior Responsible Engineer, who signs off the structural calculations',
      'Principal Accountable Person, with golden-thread information duties through the Building Safety Regulator',
      'Building Safety Marshal, who patrols the building during the works only',
    ],
    correctAnswer: 2,
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
      'Energise it — the customer owns the property, so their request overrides the test',
      'Energise it but only after a quick visual check that nothing is obviously wrong',
      'Energise it and text your supervisor afterwards to let them know what you did',
      'Decline politely, explain you cannot energise without your supervisor present, and call them for guidance',
    ],
    correctAnswer: 3,
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
      'The client (employer) — they are the client\'s eyes and ears for quality on site',
      'The Principal Contractor, who directs them on what to inspect each day',
      'The HSE, because the clerk of works is a statutory safety inspector',
      'The site foreman, who they assist with day-to-day labour co-ordination',
    ],
    correctAnswer: 0,
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
      'Whichever supervisor gave the most recent instruction, as that one supersedes the earlier',
      'Your direct line manager, then raise the conflict so the two managers can resolve it',
      'The site manager from the other firm, because they control the overall site',
      'Whichever instruction is safer, decided by you on the spot without telling anyone',
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
    options: [
      'The site manager from the Principal Contractor, before anyone else',
      'The client or their representative on the weekly progress meeting',
      'The supervising electrician or charge hand',
      'The training provider\'s assessor, who oversees the placement',
    ],
    correctAnswer: 2,
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
      'Nobody — a 110V transformer is low voltage, so a fault is not worth reporting',
      'The wholesaler who supplied it, by phoning their returns line directly',
      'Leave it in place and just avoid using it yourself for the rest of the shift',
      'Your supervisor straight away, then quarantine the item and complete a defect report',
    ],
    correctAnswer: 3,
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
      'The site manager, recorded in the accident/incident book and used to update the RA',
      'Nobody — no one was actually hurt, so there is nothing to formally report',
      'Only the HSE, because near-misses are reportable under RIDDOR like injuries',
      'The person who nearly fell, who decides for themselves whether to mention it',
    ],
    correctAnswer: 0,
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
      'The site manager from the Principal Contractor, who handles all pay queries on site',
      'Your employer (line manager or office contact), with your training provider as a secondary route',
      'ACAS directly, because pay and working-time disputes always start with a tribunal',
      'The JIB, who set the grade rates and resolve every individual pay disagreement',
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
      'The client directly, because the contract is between them and the main contractor',
      'The quantity surveyor alone, who approves all variations without the client seeing them',
      'The contract administrator (often the architect or surveyor acting for the client)',
      'The Principal Designer, who manages communication throughout the construction phase',
    ],
    correctAnswer: 2,
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
      'The Principal Designer (who co-ordinates the pre-construction phase)',
      'The client directly, because they hold the head contract',
      'The contract administrator, who manages all site communication',
      'The Principal Contractor (who co-ordinates all trades)',
    ],
    correctAnswer: 3,
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
      'RIDDOR 2013 reporting by the responsible person if the injury is over-7-day, specified or fatal',
      'No further reporting is needed once the supervisor has been told in person',
      'The injured person must report it to their own GP, who then notifies the HSE',
      'A police report, because any hospital attendance from a workplace is a crime scene',
    ],
    correctAnswer: 0,
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
      'Confront the colleague directly on site so they correct their isolation straight away',
      'Quietly raise it with your supervisor — competence concerns are investigated through the line, not by peers',
      'Report it anonymously to the HSE, as competence is a statutory enforcement matter',
      'Say nothing, since challenging a more senior colleague is not your place as an apprentice',
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
      'Nobody — just use what arrived and order the missing reels yourself next time',
      'The wholesaler directly, signing the delivery note in full so the driver can leave',
      'Your supervisor (who handles the supplier dispute) and note the shortage on the signed delivery note',
      'The site manager from the Principal Contractor, as they own the material store',
    ],
    correctAnswer: 2,
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
      'Quietly fix it yourself before anyone notices, so it never becomes an issue',
      'Wait to see if the circuit causes a problem before deciding whether to mention it',
      'Leave it as-is — if it passed initial testing then it must be acceptable',
      'Tell your supervisor immediately, isolate if needed, and put it right — errors caught and corrected are not disciplinary issues; errors hidden are',
    ],
    correctAnswer: 3,
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
      'Your line manager (or, if they are the perpetrator, their manager or HR)',
      'Straight to an employment tribunal, since bullying is automatically unfair dismissal',
      'The HSE, because workplace bullying is reportable to them under RIDDOR',
      'The perpetrator\'s own line manager only, never your own manager or HR',
    ],
    correctAnswer: 0,
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
      'Lead the meeting and present the electrical programme on behalf of their firm',
      'Observe, take notes for their own learning, and contribute when asked — not negotiate with the client',
      'Negotiate variations and prices directly with the client to gain commercial experience',
      'Take the official minutes and circulate them to all the trades afterwards',
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
      'Nobody on site — welfare problems are for the building\'s landlord to sort out',
      'The local authority Environmental Health Officer, who must be called for any welfare fault',
      'The Principal Contractor\'s site manager — welfare is their CDM 2015 Schedule 2 duty',
      'Each trade\'s own employer, since every firm provides its own toilets and water',
    ],
    correctAnswer: 2,
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
      'Say nothing — scaffold is the main contractor\'s responsibility, not the electrician\'s',
      'Report it straight to the HSE before telling anyone on site, to protect yourself',
      'Fix the scaffold yourself so the hazard is removed before anyone gets hurt',
      'Stop your work in the affected area, report to your supervisor and to the Principal Contractor — HASAWA s.3 covers risk to non-employees',
    ],
    correctAnswer: 3,
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
      'The Qualified Supervisor and the contracting business — non-conformities go on a written report with corrective action timescales',
      'The HSE, who use the scheme assessment as the basis for any enforcement action',
      'The customer whose installation was assessed, who receives the non-conformity list',
      'Building Control, who hold the master record of every registered firm\'s assessments',
    ],
    correctAnswer: 0,
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
      'Carry on chasing carefully and just wear a dust mask to limit fibre exposure',
      'Stop work immediately, isolate the area, tell the householder and your supervisor — Control of Asbestos Regs 2012 require a refurbishment/demolition survey before disturbing fabric',
      'Damp the area down with water and bag the debris before continuing the chase',
      'Report it only to the HSE and wait for them to attend before doing anything else',
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
      'Finish the job quickly so you can leave, then mention it at the next morning briefing',
      'Wait until your scheduled check-in time before saying anything, to avoid false alarms',
      'Stop work, contact your supervisor or office, leave site safely if able and follow the lone-worker check-in procedure',
      'Lie down in the customer\'s property until you feel well enough to carry on working',
    ],
    correctAnswer: 2,
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
      'The QS\'s own valuation spreadsheet, which is taken as the definitive account of events',
      'The client\'s recollection of the day, since they commissioned and paid for the work',
      'The verbal account of whichever operative happened to be on site that day',
      'The site diary kept by whoever was supervising — that record carries weight in commercial disputes',
    ],
    correctAnswer: 3,
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
      'The site manager — single point of contact upward to the contracts manager',
      'Every trade supervisor individually, each phoning the contracts manager directly',
      'The apprentice on site, as the most junior person available to make the call',
      'The client, who then passes the status report on to the contracts manager',
    ],
    correctAnswer: 0,
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
      'Confront the adult directly and ask them to explain their behaviour before reporting it',
      'Withdraw, tell your site manager and the school\'s Designated Safeguarding Lead — they decide next steps including any police involvement',
      'Call 999 immediately yourself before telling anyone on site about your concern',
      'Say nothing unless you actually witness an offence being committed by the adult',
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
      'Negotiate the firm\'s commercial contracts and material prices on the members\' behalf',
      'Carry out the site safety inductions for all new union members joining the site',
      'Represent members in grievance and disciplinary matters and provide a confidential reporting/advice route',
      'Set and enforce the JIB grade pay rates that the employer must follow',
    ],
    correctAnswer: 2,
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
      'Confront the colleague directly and demand they return the tools straight away',
      'Call the police yourself before telling anyone in the company about your suspicion',
      'Say nothing — without firm proof, raising it could be a defamation risk for you',
      'Report confidentially to your line manager (or HR), with any evidence — the company decides next steps including police involvement',
    ],
    correctAnswer: 3,
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
      'The site manager updates the RA, briefs the team in a toolbox talk, and amends the MS so it cannot recur',
      'The report is filed in the accident book and no further action is needed unless it happens again',
      'The person who nearly got hit is given a verbal warning for being in the wrong place',
      'The HSE issues an improvement notice setting out exactly what controls to put in place',
    ],
    correctAnswer: 0,
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
      'The HSE, who must receive a progress report from the PC at every project stage',
      'The client (often via the contract administrator) — the client must satisfy themselves the project is being managed safely',
      'The Principal Designer, who continues to oversee the works through the construction phase',
      'Nobody above them — the Principal Contractor is the top duty holder on a CDM project',
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
      'Drop it — once a supervisor says "not now", the matter is closed and should not be raised again',
      'Go straight over the supervisor\'s head to the contracts manager every time without waiting',
      'Document the report (time, who, what), follow up later in writing, and escalate one level up if it is a safety matter not addressed',
      'Sort out the problem themselves rather than bothering the supervisor a second time',
    ],
    correctAnswer: 2,
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
      'Ask them to leave and come back once they have made a proper appointment',
      'Tell them nothing and refuse access until your supervisor has checked their ID with the office',
      'Answer all their questions yourself so your supervisor is not disturbed on the job',
      'Stay calm, fetch your supervisor and let the inspector see whatever they ask to see',
    ],
    correctAnswer: 3,
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
      'Sign them in, brief them on site rules and PPE requirements, and direct them to the unloading area',
      'Wave them straight through — delivery drivers are exempt from site sign-in and induction',
      'Have them give a full site induction to your team before they unload anything',
      'Let them unload wherever is convenient, since they are only on site for a few minutes',
    ],
    correctAnswer: 0,
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
      'Let them wander the site freely so they get a genuine feel for the live works',
      'Arrange an escorted visit outside high-risk activities, with full PPE and a short induction',
      'Refuse any visit until the project is fully complete and handed over to the client',
      'Allow it as long as they sign a disclaimer accepting all risk for themselves',
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
    options: [
      'The construction phase plan',
      'The accident and incident book',
      'Visitor sign-in / fire register',
      'The drawing register',
    ],
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
      'Only a verbal description of the work — physical access to the first-fix is not required',
      'The full set of priced quotations and the customer\'s payment records for the job',
      'The site welfare facilities and a copy of the construction phase plan to review',
      'Access to the work, drawings, certs to date and the ability to ask questions of the installer',
    ],
    correctAnswer: 3,
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
      'Yes — Local Authority enforcement officers have similar powers of entry under HASAWA s.20 for premises they enforce',
      'No — only HSE inspectors have any legal power to enter a construction or work site',
      'Only with a court warrant obtained in advance, never on an unannounced visit',
      'Only if the site manager gives written permission for them to come on site',
    ],
    correctAnswer: 0,
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
      'No — scheme assessors are technically competent, so an induction would be pointless',
      'Yes — every visitor regardless of role gets a site-specific induction covering hazards, PPE, fire procedures and welfare',
      'No — they only review paperwork in the office and never enter the work area',
      'Only if they intend to stay on site for more than one full working day',
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
      'Answer all their questions fully, since you must always co-operate with the police',
      'Tell them to leave the property immediately as they have no right to be there',
      'Be polite and helpful, but tell them you cannot give access without the householder\'s permission and call your supervisor for guidance',
      'Give them access to the whole property so they can complete their enquiry quickly',
    ],
    correctAnswer: 2,
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
      'Insurance — the school\'s insurer will not cover trades who have not been DBS-checked',
      'Competence — a DBS check confirms the worker is technically qualified for the job',
      'Data protection — the check proves the worker can be trusted with pupils\' personal data',
      'Safeguarding — anyone in a position of trust around children/vulnerable adults must be DBS-checked under safeguarding policies',
    ],
    correctAnswer: 3,
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
      'Brief them on site rules, escort them, ensure no live testing or unsafe activities are filmed unattended, and confirm written permissions for any recognisable workers',
      'Let them film freely — media crews carry their own insurance and manage their own safety',
      'Refuse all filming on site, as recording a live construction site is never permitted',
      'Allow them in without induction provided they wear their own hi-vis and hard hats',
    ],
    correctAnswer: 0,
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
      'Nothing extra — regular drivers are known to the team, so they can come and go freely',
      'Sign in, segregation check on skip contents, banksman for the lift if reversing into busy areas',
      'A fresh full site induction each time, identical to a first-time visitor\'s',
      'A permit to work issued before the skip wagon is allowed onto the site',
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
      'Let them visit whenever they like — as the future occupant they have a right of access',
      'Refuse outright, since tenants have no involvement until the refurb is fully handed over',
      'Refer them to the client (the landlord) — access is the client\'s decision, not the contractor\'s; if agreed, escort and induct',
      'Give them a key so they can let themselves in to check progress in their own time',
    ],
    correctAnswer: 2,
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
      'Waived for short visits, since visitors are only on site briefly and rarely near hazards',
      'A hard hat only — visitors do not need hi-vis or eye protection like the workforce',
      'Up to the visitor to decide, as they accept their own risk when they enter the site',
      'Provided by the site (loan kit) or required to be brought, matching the site PPE rules — no PPE, no entry',
    ],
    correctAnswer: 3,
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
      'Yes — anyone not normally based on site signs in for emergency roll-call purposes',
      'No — first-aiders responding to an incident are exempt from the sign-in process',
      'No — company staff are already on the payroll, so they do not count as visitors',
      'Only if they stay on site after the casualty has been taken away by ambulance',
    ],
    correctAnswer: 0,
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
      'Let them go straight to the apprentice unaccompanied, as they are a known education professional',
      'Treat as a visitor — sign in, brief on site rules, escorted access to the work area at a low-risk time',
      'Turn them away — college tutors have no right of access to a commercial work site',
      'Ask them to observe from outside the perimeter fence so no induction is needed',
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
      'Let them straight in — the client owns the project, so site rules do not apply to them',
      'Allow the walk-round in business clothes provided they stay close behind you at all times',
      'Stop them at the gate, offer loan PPE, give the standard visitor induction, then escort — politely but firmly',
      'Ask them to wait in the site office until the day\'s work is finished and it is safe',
    ],
    correctAnswer: 2,
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
      'Exempt from induction — manufacturer specialists are competent on their own equipment',
      'Covered by their employer\'s rules only, so the site induction does not apply to them',
      'Allowed to commission the switchgear without anyone reviewing their method of work',
      'Inside the site rules — induct, sign in, brief on hazards; their RAMS for the commissioning task should also be reviewed',
    ],
    correctAnswer: 3,
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
      'MHSWR 1999 Reg 19 — additional risk assessment for young persons, considering their inexperience and immaturity',
      'CDM 2015 Reg 15 — young persons must be appointed as Workers with full reporting duties',
      'The Working Time Regulations 1998 — under-18s must opt out of the 48-hour week in writing',
      'PUWER 1998 Reg 9 — young persons may only use equipment after a competence assessment',
    ],
    correctAnswer: 0,
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
      'Yes — anyone affected by the works counts as a site visitor and must be signed in',
      'No, they\'re a member of the public — but HASAWA s.3 still requires you to manage the impact of your work on them; talk to them politely and adjust working methods if reasonable',
      'Yes — neighbours are owed a full site induction before any work near their boundary',
      'No, and you owe them no duty at all since the work is on the customer\'s property',
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
      'Give them immediate access to inspect the defect so the claim can be settled quickly',
      'Refuse to let them onto the site under any circumstances and ask them to leave',
      'Refer them to the contractor\'s commercial/legal lead, take their details, and not give site access without authorisation from above',
      'Answer all their questions about the defect personally to show the firm has nothing to hide',
    ],
    correctAnswer: 2,
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
      'Only the standard construction PPE — infection control does not affect electrical trades',
      'A separate first-aid certificate for every operative working in the clinical areas',
      'A DBS check in place of normal PPE, as patient contact is the only real risk',
      'Specific PPE (e.g. gowns, gloves, hand hygiene), no eating/drinking in clinical areas, controlled access through air-locked corridors',
    ],
    correctAnswer: 3,
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
      'Plan an accessible route in advance, brief on the planned route, provide an escort, and adjust under Equality Act 2010 reasonable adjustments duty',
      'Reschedule the inspection for after handover, since live sites cannot be made accessible',
      'Carry the visitor over any obstacles so the inspection can go ahead as planned',
      'Ask them to inspect only the ground-floor areas that happen to be step-free that day',
    ],
    correctAnswer: 0,
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
      'Carry on working and ignore them, as the care home staff are responsible for residents',
      'Make safe, calmly guide them out of the work area and contact the home\'s care staff — they manage resident welfare',
      'Take the resident back to their room yourself before returning to the job',
      'Tell the resident firmly to leave and continue with the live work straight away',
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
      'Nothing special — a drone survey is low-risk and needs no site controls at all',
      'Only the operator\'s own insurance, since drone flights are entirely their responsibility',
      'CAA permissions, flight plan, exclusion zone for personnel beneath the flight path, RAMS for the operation',
      'Just a verbal warning to the team to look up, with no exclusion zone required',
    ],
    correctAnswer: 2,
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
      'Carry on with the job and avoid eye contact so as not to provoke the customer further',
      'Try to calm the customer down yourself before deciding whether to start the work',
      'Refuse to leave until the customer has paid for the call-out attendance in full',
      'Withdraw to your van, contact your supervisor and the office, and reschedule via written communication when the customer is fit to engage',
    ],
    correctAnswer: 3,
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
      'The Health and Safety at Work etc. Act 1974',
      'BS 7671 (the IET Wiring Regulations)',
      'The IET On-Site Guide',
      'The manufacturer\'s installation instructions',
    ],
    correctAnswer: 0,
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
      'An Act of Parliament that is directly enforceable by the HSE through criminal courts',
      'A non-statutory British Standard that is widely cited and referenced by Approved Document P of the Building Regulations',
      'A statutory instrument made under the Electricity at Work Regulations 1989',
      'A European directive that became UK law automatically on a fixed transition date',
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
      'Provide and pay for their own personal protective equipment at all times',
      'Carry out a written risk assessment before starting any task on site',
      'Take reasonable care for themselves and others, and co-operate with the employer on H&S',
      'Report all injuries and diseases directly to the HSE under RIDDOR',
    ],
    correctAnswer: 2,
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
      'All persons working on electrical systems hold a recognised electrical qualification',
      'Live working is permitted only where a written permit-to-work has been issued',
      'Every electrical installation is tested and certified to BS 7671 before energising',
      'All electrical systems are constructed, maintained and worked on so as to prevent danger',
    ],
    correctAnswer: 3,
    explanation:
      'EAWR 1989 Reg 4 is the cornerstone duty: systems must be constructed, maintained and worked on so as to prevent danger, so far as is reasonably practicable.',
    section: '5.2.1',
    difficulty: 'intermediate',
    topic: 'Statutory legislation',
  },
  {
    id: 80,
    question: 'The minimum cover required by the Employers\' Liability (Compulsory Insurance) Act 1969 is:',
    options: [
      '£5 million',
      '£2 million',
      '£1 million',
      '£10 million',
    ],
    correctAnswer: 0,
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
      'They must stop the activity immediately because of a risk of serious injury',
      'They have a stated period (minimum 21 days) to put the breach right, with right of appeal',
      'They face an automatic unlimited fine with no opportunity to appeal the notice',
      'They must close the entire site until an HSE inspector re-attends and lifts the notice',
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
      'The Manual Handling Operations Regulations 1992',
      'The Management of Health and Safety at Work Regulations 1999',
      'Provision and Use of Work Equipment Regulations 1998 (PUWER) Reg 5',
      'The Personal Protective Equipment at Work Regulations 1992',
    ],
    correctAnswer: 2,
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
      'Enforce a strict 25 kg maximum lifting limit for all workers regardless of the task',
      'Provide mechanical lifting aids for any load over 10 kg in every situation',
      'Ban all manual lifting on site and require every load to be moved by machine',
      'Avoid hazardous manual handling so far as reasonably practicable; if unavoidable, assess and reduce the risk',
    ],
    correctAnswer: 3,
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
      'Both employees and "limb (b)" workers (workers who are not employees but provide personal services)',
      'The self-employed only, who previously had no PPE protection at all',
      'Members of the public who visit a workplace and need protective equipment',
      'Apprentices and young persons specifically, but not adult employees',
    ],
    correctAnswer: 0,
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
    options: [
      '40 hours (averaged over 12 weeks, with no opt-out permitted)',
      '48 hours (averaged over 17 weeks, can be opted out by adults)',
      '56 hours (averaged over 26 weeks, with mandatory overtime pay above it)',
      '37.5 hours (a fixed weekly cap that cannot be averaged or opted out of)',
    ],
    correctAnswer: 1,
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
      'Only fatal accidents and major fires, reported within 24 hours to the local authority',
      'Every minor first-aid case, logged in the accident book but not sent anywhere external',
      'Specified injuries, over-7-day absences, occupational diseases and dangerous occurrences to the HSE',
      'All near-misses and unsafe conditions, reported to the Principal Contractor each week',
    ],
    correctAnswer: 2,
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
    options: [
      '5',
      '7',
      '12',
      '9',
    ],
    correctAnswer: 3,
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
      'Principal Accountable Person',
      'Principal Designer',
      'Responsible Person',
      'Competent Person',
    ],
    correctAnswer: 0,
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
      'Removes all asbestos from the building before any trades are allowed on site',
      'Provides an asbestos register and a refurbishment/demolition survey identifying ACMs',
      'Notifies the HSE at least 14 days before any work starts in the building',
      'Issues every worker with a respirator and a disposable suit as standard PPE',
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
      'Ban all hazardous substances from site and replace them with safe alternatives',
      'Keep a safety data sheet on file but take no further action until an incident occurs',
      'Assess the risk from hazardous substances, prevent or control exposure, and provide info, instruction and training',
      'Provide respiratory PPE to every worker on site regardless of the substances used',
    ],
    correctAnswer: 2,
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
      'Reviewed and re-signed by the HSE before any high-risk work can begin',
      'Recorded in writing for every employer, no matter how few people they employ',
      'Carried out only once at the start of a project and never updated afterwards',
      'Suitable and sufficient, and recorded in writing where the employer has 5 or more employees',
    ],
    correctAnswer: 3,
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
      'Documentation describing the supply characteristics and other information needed for the installation',
      'A signed Electrical Installation Certificate before any cable is run on site',
      'Verbal confirmation to the client that the design meets BS 7671 requirements',
      'A periodic inspection notice fixed at the consumer unit on completion',
    ],
    correctAnswer: 0,
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
      'The Building Safety Act 2022',
      'Health and Safety at Work etc. Act 1974',
      'The Building Act 1984',
      'The Electricity at Work Regulations 1989',
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
      'All commercial and industrial electrical installations across England and Wales',
      'Portable electrical appliances and the PAT testing of them in any building',
      'Fixed electrical installations in new and existing dwellings, and parts of buildings serving dwellings',
      'The structural fire safety of high-rise residential buildings only',
    ],
    correctAnswer: 2,
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
      'After a minimum of 21 days, giving the employer time to remedy the breach first',
      'Only once a magistrates\' court has confirmed the inspector\'s findings',
      'After the next scheduled HSE inspection visit confirms the risk still exists',
      'Immediately, where the inspector believes there is a risk of serious personal injury',
    ],
    correctAnswer: 3,
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
      'Provide adequate and appropriate equipment, facilities and personnel for first aid based on a needs assessment',
      'Appoint at least one qualified first-aider for every ten employees on every site',
      'Keep a fully stocked first-aid room at every workplace regardless of its size',
      'Send any injured worker to hospital immediately rather than treating them on site',
    ],
    correctAnswer: 0,
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
      'The safe use, maintenance and inspection of all work equipment and machinery',
      'Workplace conditions: ventilation, temperature, lighting, cleanliness, welfare, traffic routes etc.',
      'The assessment and control of exposure to hazardous substances at work',
      'The selection, provision and use of personal protective equipment for workers',
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
      'Ensuring only that the workplace premises themselves are kept clean and tidy',
      'Reporting all employee injuries and diseases directly to the HSE under RIDDOR',
      'Ensuring, so far as reasonably practicable, the H&S of all employees — including safe systems, training, premises and a written policy where 5+ employees',
      'Providing free personal protective equipment to anyone who enters the workplace',
    ],
    correctAnswer: 2,
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
      'A fixed penalty notice of £5,000 with no possibility of imprisonment',
      'Only a written warning from the HSE, with prosecution reserved for repeat breaches',
      'Automatic loss of the firm\'s competent person scheme registration and nothing more',
      'Unlimited fines and/or imprisonment of up to 2 years on indictment under HASAWA s.33',
    ],
    correctAnswer: 3,
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
      'Statutory law is binding through Acts/Regulations enforceable by criminal sanction; non-statutory standards are voluntary unless cited in law or contract',
      'Statutory law applies only to employers, while non-statutory standards apply only to employees',
      'Statutory law is reviewed every year, whereas non-statutory standards never change once published',
      'Statutory law covers electrical work only, while non-statutory standards cover all other trades',
    ],
    correctAnswer: 0,
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
      'A permit to work issued for every use of a hazardous substance on site',
      'A risk assessment and method statement covering the whole project',
      'A safety data sheet (SDS) and a COSHH assessment for the task',
      'A pre-use inspection sheet signed off before the substance is opened',
    ],
    correctAnswer: 2,
    explanation:
      'COSHH 2002 requires manufacturers to supply SDS and the employer to assess the risk for the specific task before use. Solvents, expanding foam, brick acid and similar all need this.',
    section: '5.2.2',
    difficulty: 'intermediate',
    topic: 'Workplace information',
  },
  {
    id: 103,
    question: 'Manufacturer instructions for equipment are referenced by which BS 7671 regulation in A4:2026?',
    options: [
      'Reg 643.1',
      'Reg 526.1',
      'Reg 411.3.3',
      'Reg 132.13',
    ],
    correctAnswer: 3,
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
      'A daily contemporaneous record of weather, deliveries, visitors, instructions received and progress',
      'A list of every operative\'s hours used to calculate the weekly payroll',
      'A schedule of test results recorded against each circuit on completion',
      'A register tracking the current revision of every drawing issued to site',
    ],
    correctAnswer: 0,
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
      'Record who is on site each day for the emergency fire roll-call',
      'Record hours worked against jobs/cost codes for payroll, invoicing and job profitability',
      'Log the defects found at handover so they can be put right before sign-off',
      'Track the sequence and duration of each activity on the project programme',
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
      'Use the tower anyway but stay below the level where the guardrail would normally be',
      'Fit any spare scaffold tube as a guardrail and carry on with the high-level work',
      'Stop, report to the supervisor, and do not work at height until the tower is compliant or an alternative is in place',
      'Work from a stepladder beside the tower instead, since the method statement is only guidance',
    ],
    correctAnswer: 2,
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
      'To record the test results for every circuit before the installation is energised',
      'To prove that workers have been briefed on a specific safety topic that day',
      'To track who is on site at any one time for emergency roll-call purposes',
      'Formal authorisation to do high-risk work (e.g. hot work, confined space, live work) under defined conditions for a defined time',
    ],
    correctAnswer: 3,
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
      'Track the current revision of every drawing on site so workers always work to the latest issue',
      'List the test results recorded against each circuit during inspection and testing',
      'Record the hours each operative works against the drawings they were issued',
      'Log every visitor who signs in to view the drawings in the site office',
    ],
    correctAnswer: 0,
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
      'Shows the exact physical dimensions and layout, while the drawing lists the materials in words',
      'Describes performance, materials, finishes, standards and quality requirements in words; the drawing shows geometry and arrangement',
      'Always overrides the drawing automatically wherever the two documents disagree',
      'Is produced by the contractor on site, while the drawing comes from the designer',
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
      'A list of every hazardous substance brought onto site and its safety data sheet',
      'A schedule of the variations agreed with the client during the project',
      'A record of defects identified at handover that must be put right before final sign-off',
      'A register of the planned activities for the next one to four weeks of work',
    ],
    correctAnswer: 2,
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
      'Crack on with the extra socket straight away, as a verbal instruction is binding enough',
      'Note it only in the site diary and add the cost to the final account at the end',
      'Wait until the next progress meeting to mention it before doing any of the work',
      'Confirm in writing (email) before starting, capturing scope, price impact and time impact — and only proceed once acknowledged',
    ],
    correctAnswer: 3,
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
      'Evidence that workers were briefed on a specific topic — sign-in sheet, date, content, attendees, presenter',
      'Record the hours each operative worked so the briefing time can be paid',
      'Log any near-misses raised by the team during the briefing for the accident book',
      'Track who is on site for the emergency fire roll-call at the muster point',
    ],
    correctAnswer: 0,
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
      'The cost of each work activity and the running total spent against the budget',
      'Sequence and duration of each work activity, dependencies, milestones and the critical path',
      'The hazards and control measures for every high-risk task on the project',
      'The current revision of every drawing issued to the trades on site',
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
      'Left until the next progress meeting before deciding whether it needs fixing',
      'Recorded only if the customer notices it, otherwise the work can be signed off as-is',
      'Recorded on the snag list, the cause investigated, fixed and re-tested before the work is signed off',
      'Reported straight to Building Control as a non-conformity before any repair is attempted',
    ],
    correctAnswer: 2,
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
    options: [
      '8',
      '10',
      '14',
      '16',
    ],
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
      'The next 1–4 weeks of activity in detail, used at the weekly site meeting',
      'The whole project from start to completion, fixed at the outset and never revised',
      'Only the activities already completed, recorded as a history of the works to date',
      'The next 12 months of work at a high level, used by the client\'s board only',
    ],
    correctAnswer: 0,
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
      'The Building Control surveyor, who keeps them on the council\'s permanent records',
      'The end client at handover — they describe how to operate, maintain and find spares for the installation',
      'The wholesaler who supplied the equipment, for their own warranty records',
      'The Principal Designer, who archives them with the pre-construction information',
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
      'You have fully checked and accepted the delivery as correct in every respect',
      'The supplier accepts full liability for any shortage found at any later date',
      'You have not confirmed quantity or condition — protects against signing for items you haven\'t verified, but limits a later claim',
      'The delivery cannot be used until a second person has counter-signed the note',
    ],
    correctAnswer: 2,
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
      'Set out the commercial terms, prices and payment schedule agreed with the client',
      'List the test results for every circuit recorded during inspection and testing',
      'Record the hours each trade works against the project for payroll purposes',
      'Set out the H&S arrangements for the project, including site rules, RAMS for high-risk work and emergency procedures',
    ],
    correctAnswer: 3,
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
      'Date, time, location, what happened, who was involved, immediate action, and proposed corrective/preventive action',
      'Only the name of the person responsible, so they can be held accountable later',
      'The cost of the damage and who will pay for it, but not the cause of the incident',
      'A photograph of the scene alone, since written detail can be added afterwards',
    ],
    correctAnswer: 0,
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
      'Always following the drawing, because it is the most visual of the three documents',
      'A precedence clause that ranks the documents (e.g. spec > drawings > BoQ) — read your contract',
      'Whichever document was issued most recently automatically taking priority',
      'Leaving the contractor to choose whichever interpretation is cheapest to build',
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
      'Substitution → elimination → PPE → engineering → admin',
      'Elimination → substitution → engineering → admin → PPE',
      'Admin → PPE → engineering → elimination → substitution',
    ],
    correctAnswer: 2,
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
      'The site diary, recorded by whoever was supervising the work that day',
      'The accident book, alongside any injuries that occurred during the shift',
      'The toolbox talk register, signed by everyone who attended the briefing',
      'A pre-use inspection sheet kept with the equipment — checks structural integrity, controls, fluids, signage; defects taken out of service',
    ],
    correctAnswer: 3,
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
      'The client, via the Principal Designer — it gives bidders the info they need to plan their work safely',
      'The Principal Contractor, after construction starts, as a summary of progress so far',
      'The HSE, who issue it to every notifiable project once an F10 has been submitted',
      'The winning contractor\'s QS, who prepares it for the client\'s final account',
    ],
    correctAnswer: 0,
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
      'CDM 2015 requires it as part of the construction phase plan kept on site',
      'BS 7671 Part 6 requires it as evidence of compliance, and it forms part of the cert handed to the client per Reg 132.13',
      'It is needed only for the contractor\'s own records and is never given to the customer',
      'The wholesaler requires it before they will honour the warranty on the cable',
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
      'Add the charger to the quote at no extra cost to keep the customer happy',
      'Tell the customer it is too late to change anything once the quote is being delivered',
      'Acknowledge verbally, immediately confirm in writing as a variation with cost and time impact, and do not start until the variation is signed',
      'Fit the charger first and agree the price with the customer afterwards once it is in',
    ],
    correctAnswer: 2,
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
      'Only a verbal explanation of what was done, with paperwork kept by the contractor',
      'A copy of the construction phase plan and the firm\'s health and safety policy',
      'An invoice and a receipt only — the certification stays with Building Control',
      'The Electrical Installation Certificate, schedule of test results and the manufacturer\'s instructions / user guides for any equipment installed',
    ],
    correctAnswer: 3,
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
      'Provide the EICR, explain plainly which observations are coded C1 (danger present) or C2 (potentially dangerous), and the urgency to make safe',
      'Mark the report satisfactory anyway so the landlord can let the property quickly',
      'Give only a verbal summary and withhold the written report until remedials are paid for',
      'Send the report straight to the tenants without explaining the codes to the landlord',
    ],
    correctAnswer: 0,
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
      'Only a single total figure, leaving the detail to be discussed verbally on the day',
      'Scope of work, what is and is not included, price (ex/inc VAT), payment terms, validity and any assumptions',
      'The contractor\'s health and safety policy and a copy of their public liability cover',
      'A full schedule of test results and the EIC for the proposed installation',
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
      'Use full technical terms throughout so the customer learns the correct vocabulary',
      'Skip the explanation entirely and just leave them the written certificate to read',
      'Use plain English, short sentences, visual aids and check understanding by asking them to summarise back',
      'Ask a younger relative to take over the conversation so you can get on with the work',
    ],
    correctAnswer: 2,
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
      'A written contract signed by both parties before any work begins on site',
      'A minimum 12-month guarantee on all labour, fixed by statute for every job',
      'Materials of the cheapest available grade unless the customer pays for an upgrade',
      'Reasonable care and skill, within a reasonable time, for a reasonable price (where not pre-agreed)',
    ],
    correctAnswer: 3,
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
      'Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 — 14-day cancellation right for off-premises contracts',
      'The Consumer Rights Act 2015 — a 30-day right to reject for any signed quotation',
      'The Sale of Goods Act 1979 — a 7-day cooling-off period on all home contracts',
      'The Late Payment of Commercial Debts Act 1998 — allowing cancellation within 14 days',
    ],
    correctAnswer: 0,
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
      'Consumer law requires every quotation to state an expiry date by statute',
      'Material prices and labour rates change; an open-ended quote can leave the contractor on the hook for old prices',
      'It starts the 14-day cancellation period running from the date of the quote',
      'Building Control will not accept a notification unless the quote shows a validity date',
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
      'It means danger is present and the circuit must be made safe immediately',
      'It means the installation is potentially dangerous and needs urgent remedial work',
      'It is an "improvement recommended" — the installation is not unsatisfactory because of it, but addressing it would improve safety',
      'It means further investigation is required before the report can be completed',
    ],
    correctAnswer: 2,
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
      'You may post it to any address the customer mentions without confirming it first',
      'You should CC the wholesaler and Building Control so everyone has a copy on file',
      'Email is not permitted for certificates — they must always be handed over on paper',
      'Send via secure means, only to the verified email address, retain the cert per your retention policy, and the privacy notice should cover this use',
    ],
    correctAnswer: 3,
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
      'Confirm payment terms in writing on the quote and acceptance — and follow the Late Payment of Commercial Debts Act if they slip',
      'Rely on the verbal agreement, since a spoken promise to pay is fully binding anyway',
      'Take a cash deposit up front so there is no need to record the payment terms at all',
      'Leave the payment terms open and simply invoice whatever feels fair on completion',
    ],
    correctAnswer: 0,
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
      'Kept by the contractor only, with the customer receiving just a verbal confirmation',
      'Provided to the customer (paper or electronic), with the Building Control notification handled via your competent person scheme',
      'Sent only to Building Control, who then forward a copy to the customer themselves',
      'Held back until full payment is received, then released to the customer on request',
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
      'Agree to leave the RCDs out, since the customer is entitled to accept the risk themselves',
      'Fit the RCDs but do not connect them, so the board looks compliant but costs less',
      'Decline politely, explain why RCD protection is required by BS 7671 (e.g. Reg 411.3.3 for socket-outlets ≤32A) and is not optional for compliant work',
      'Leave the RCDs out but note it on the certificate as a departure from the standard',
    ],
    correctAnswer: 2,
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
      'Ignore it completely, as engaging with a public review only draws attention to it',
      'Reply publicly disputing the customer\'s version of events point by point',
      'Demand the customer removes the review before you will discuss the issue at all',
      'Respond publicly and professionally — acknowledge the issue, offer to resolve offline, and do not get into a public argument',
    ],
    correctAnswer: 3,
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
      'What personal data you collect, why, how long you keep it, who you share with, and the customer\'s rights under UK GDPR',
      'The scope of work, exclusions, price and payment terms agreed with the customer',
      'The contractor\'s liability cover and the limits that apply to any claim made',
      'The competent person scheme membership number and the warranty period offered',
    ],
    correctAnswer: 0,
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
      'Only the final invoice and a receipt, with all certification kept by the contractor',
      'EIC, schedule of test results, schedule of inspections, manufacturer instructions for installed kit (CU, AFDDs, smoke alarms, EV charger if any), and user instructions',
      'The construction phase plan and the firm\'s health and safety policy statement',
      'A verbal demonstration of the consumer unit only, with no written paperwork',
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
      'No copy need be given to tenants at all — only the landlord retains the EICR',
      'A copy given to tenants only if they specifically ask for it in writing',
      'A copy of the EICR to be given to existing tenants within 28 days, new tenants before occupation, and to the local authority on request — Electrical Safety Standards in the Private Rented Sector Regs 2020',
      'A copy displayed in the property\'s communal area for all tenants to read',
    ],
    correctAnswer: 2,
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
      'A single line stating the outage time, with the detail explained verbally on the day',
      'A generic template covering all electrical work, reused unchanged for every job',
      'Only the price and duration of the outage, since the method is the contractor\'s concern',
      'Step-by-step sequence, isolation strategy, who is involved, contingency for restoration, and notification chain — task-specific',
    ],
    correctAnswer: 3,
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
      'Workmanship/materials defects are usually covered by your guarantee/scheme insurance-backed warranty (e.g. NICEIC PCG, NAPIT IBG); explain how to make a claim',
      'Once the work is handed over and paid for, the contractor has no further liability for it',
      'Any defect after handover is the customer\'s responsibility under the Consumer Rights Act',
      'Defects must be reported to Building Control, who arrange the repair at the customer\'s cost',
    ],
    correctAnswer: 0,
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
      'The RCBO is faulty and oversensitive; we will swap it for a higher-rated device',
      'It is doing its job — the freezer likely has earth leakage; explain we will investigate, and recommend repair/replacement of the appliance',
      'The new board is wired incorrectly; we will rewire the circuit to stop the tripping',
      'The freezer is fine; we will fit a non-RCD circuit for it so it stops tripping',
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
      'Accept the cash and offer a small discount in return for not raising an invoice',
      'Take the cash but issue the invoice only if the customer later asks for one',
      'Decline — provide a proper VAT invoice (or zero-VAT invoice if not registered) for tax compliance and to protect the customer\'s warranty rights',
      'Accept the cash, as a customer is entitled to choose how they pay for the work',
    ],
    correctAnswer: 2,
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
      'Hand over only the invoice, since the charger\'s app explains everything the customer needs',
      'Leave the manufacturer guides in the box for the customer to read in their own time',
      'Give a quick verbal explanation only, as the certificate covers the technical detail',
      'Demonstrate operation, explain the smart features and tariff considerations, hand over manufacturer guides and your cert pack, and note the smart charger regs (e.g. randomised delay)',
    ],
    correctAnswer: 3,
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
      'They are the same product — EICR replaced the older "PIR" (periodic inspection report) terminology; explain politely',
      'A PIR is for new installations and an EICR is only for existing ones, so they need the EICR',
      'A PIR is a visual inspection only, while an EICR involves full testing of every circuit',
      'A PIR is issued by the landlord and an EICR is issued by the electrician, so both are needed',
    ],
    correctAnswer: 0,
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
      'Give a firm fixed price over the phone so the customer can decide there and then',
      'Give a rough indicator only, then follow up with a written, scoped quote — so both sides have the same understanding',
      'Refuse to give any figure at all until you have visited and surveyed the property',
      'Quote the highest likely price verbally so there is room to reduce it later',
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
      'Indefinitely — once collected, the data can be kept forever for future reference',
      'Exactly 12 months, after which the report must be deleted under UK GDPR',
      'Only as long as needed for the legitimate purpose — typically the EICR validity period plus a buffer for limitation/insurance reasons (often 6+ years)',
      'Until the next EICR is done, when the previous one must be destroyed immediately',
    ],
    correctAnswer: 2,
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
      'To record the test results for every installation the company completes',
      'To list the prices the company charges for each type of electrical work',
      'To set out who is on site each day for the emergency fire roll-call',
      'To set out the company\'s commitment, organisation and arrangements for managing H&S — required in writing if 5+ employees (HASAWA s.2(3))',
    ],
    correctAnswer: 3,
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
      'Zero tolerance with for-cause and post-incident testing, supported by an employee assistance referral route',
      'Random testing only on Fridays, with no consequences for a first positive result',
      'Testing of new starters at interview only, with no further checks once employed',
      'Self-declaration by each worker, with the company taking no action either way',
    ],
    correctAnswer: 0,
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
      'To set out the company\'s commitment to managing health and safety on site',
      'To set out how the company prevents discrimination and harassment based on the Equality Act 2010 protected characteristics',
      'To set out the pay rates and bonus structure offered to all employees equally',
      'To set out how the company handles customer complaints fairly and consistently',
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
      'The Health and Safety at Work etc. Act 1974',
      'The Public Interest Disclosure Act 1998',
      'The ACAS Code of Practice on Disciplinary and Grievance Procedures',
      'The Working Time Regulations 1998',
    ],
    correctAnswer: 2,
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
      'Health and Safety at Work etc. Act 1974',
      'Equality Act 2010',
      'Data Protection Act 2018',
      'Public Interest Disclosure Act 1998 (PIDA)',
    ],
    correctAnswer: 3,
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
      'Because it tells them the reporting routes, named responsible people and arrangements they will rely on every day',
      'Because they must sign it to confirm they accept personal liability for any accident',
      'Because it sets out the pay rates and overtime arrangements for their grade',
      'Because reading it counts towards their off-the-job training hours for the apprenticeship',
    ],
    correctAnswer: 0,
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
      'Verbal warning → written warning → instant dismissal, with no right of appeal',
      'Investigation → meeting → decision → right to be accompanied → right of appeal',
      'Suspension → tribunal → conciliation → reinstatement, decided entirely by ACAS',
      'Grievance → mediation → final account → settlement, agreed with a trade union rep',
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
      'The Working Time Regulations 1998 and the Employment Rights Act 1996',
      'The Public Interest Disclosure Act 1998 and the Bribery Act 2010',
      'Equality Act 2010 ss.26-27 (harassment) and HASAWA (employer duty to protect health, including mental)',
      'The Consumer Rights Act 2015 and the Data Protection Act 2018',
    ],
    correctAnswer: 2,
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
      'The Equality Act 2010',
      'The Bribery Act 2010',
      'The Consumer Rights Act 2015',
      'UK GDPR and the Data Protection Act 2018',
    ],
    correctAnswer: 3,
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
      'Set out who can work alone, what risk assessment applies, communication/check-in arrangements, and high-risk activities that need a buddy',
      'Ban lone working entirely, requiring at least two operatives on every job without exception',
      'Apply only to apprentices, since qualified electricians are always free to work alone',
      'Require every lone worker to carry a permit to work signed by the site manager',
    ],
    correctAnswer: 0,
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
      'Only the fuel allowance and mileage rates paid to staff who use their own vehicles',
      'Licence checks, insurance, MOT, vehicle inspection, mobile phone use, fatigue management — all part of the employer\'s duty under HASAWA s.3 to others',
      'Only the route planning and delivery scheduling for the company\'s vans',
      'Only the rules on personal use of company vehicles outside working hours',
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
      '£10 million (Modern Slavery Act 2015 s.54)',
      '£1 million (Modern Slavery Act 2015 s.54)',
      '£36 million (Modern Slavery Act 2015 s.54)',
      '£100 million (Modern Slavery Act 2015 s.54)',
    ],
    correctAnswer: 2,
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
      'A one-off DBS check at recruitment, with no need for any further review afterwards',
      'A signed declaration of good character from the worker, taken at face value',
      'A formal qualification in the relevant trade, with conduct not being considered',
      'Background checks (DBS), reference checks, ongoing competence assessment and prompt action on conduct issues',
    ],
    correctAnswer: 3,
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
      'Sharing passwords, using company systems for unlawful or commercial private purposes, downloading unauthorised software',
      'Using personal phones at all on site, even for taking job photographs',
      'Accessing the company email account from home or outside office hours',
      'Storing any customer data electronically rather than on paper records only',
    ],
    correctAnswer: 0,
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
      'Post regularly about every job to build the company\'s online profile and win work',
      'Avoid identifying clients or live worksites without consent, no derogatory comments about colleagues/clients/competitors, and respect confidentiality',
      'Use only their personal accounts so the company is never associated with their posts',
      'Tag the customer and the wholesaler in every post to maximise the firm\'s reach',
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
      'The HSE incident reporting line, which logs every wellbeing concern raised at work',
      'The company\'s own occupational health department only, with no external services',
      'EAP (Employee Assistance Programme), Lighthouse Construction Industry Charity helpline, Mind, Mates in Mind, and the GP route',
      'The trade union helpline, which is the only confidential route open to employees',
    ],
    correctAnswer: 2,
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
      'Only the pay rate, with all training arrangements handled separately by the college',
      'Only the qualifications to be achieved, with no mention of pay or conditions',
      'Only the employer\'s health and safety duties towards the apprentice on site',
      'Roles of employer/training provider/apprentice, off-the-job learning hours, end-point assessment plans and pay/conditions',
    ],
    correctAnswer: 3,
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
      'Welcome back, identify any ongoing health needs, confirm fitness for normal duties and discuss any reasonable adjustments',
      'Issue a disciplinary warning for the days of work that were missed during the absence',
      'Deduct the sick days from the worker\'s holiday entitlement for the year ahead',
      'Require a doctor\'s note for every single day of absence before they can return',
    ],
    correctAnswer: 0,
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
      'A standard DBS check for the supervisor only, with no training for the wider team',
      'Enhanced DBS for staff, named safeguarding officer, training, and a clear route for reporting concerns about children/vulnerable adults',
      'A signed declaration from each worker that they have no criminal record at all',
      'A blanket ban on speaking to any pupil, removing the need for DBS checks entirely',
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
      'The Fraud Act 2006 — covering dishonest gain or loss caused to another party',
      'The Modern Slavery Act 2015 — requiring a transparency statement for large firms',
      'Bribery Act 2010 — strict-liability corporate offence of failing to prevent bribery',
      'The Proceeds of Crime Act 2002 — covering money laundering and criminal property',
    ],
    correctAnswer: 2,
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
      'Ignore complaints unless they are put in writing and sent by recorded delivery',
      'Refer every complaint straight to the firm\'s solicitor before any internal review',
      'Offer the customer a refund immediately to make the complaint go away quickly',
      'Acknowledge promptly, investigate fairly, respond in writing within a stated timescale, signpost to ADR (e.g. scheme provider) if unresolved',
    ],
    correctAnswer: 3,
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
      'Waste segregation, responsible disposal of WEEE, energy reduction, low-NOx vehicle policy and supplier sustainability — supporting environmental compliance and contracts that require it',
      'Sending all site waste to landfill in a single skip to keep collection costs low',
      'Disposing of old cable and equipment by burning it on site to save haulage',
      'Leaving waste management entirely to the client, as it is not the contractor\'s concern',
    ],
    correctAnswer: 0,
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
      'Only the qualifications held when each worker was first recruited to the firm',
      'How competence is identified, gained, refreshed and recorded — supporting EAWR Reg 16 and HASAWA s.2(2)(c)',
      'The cost of all training courses attended, for the firm\'s accounts and tax records',
      'The hours each worker spends in training, used only for off-the-job apprenticeship logs',
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
      'Only the pay arrangements and holiday entitlement for the new starter\'s grade',
      'Only the technical detail of the first job the new starter will be working on',
      'H&S basics, fire procedure, first aid, reporting routes, key policies (D&A, equality, IT, social media), site rules and named manager',
      'Only a tour of the office, leaving site-specific rules to be picked up on the job',
    ],
    correctAnswer: 2,
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
      'An employee from ever working in the electrical trade again after they leave',
      'An employee from reporting genuine wrongdoing to a regulator such as the HSE',
      'An employee from taking annual leave during a busy period for the company',
      'Disclosure of client information, designs, prices and trade secrets — both during employment and (within reason) afterwards',
    ],
    correctAnswer: 3,
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
      'Written (email) so there is a clear record both parties can refer back to',
      'A quick phone call, since it is faster and avoids putting anything on paper',
      'A WhatsApp voice note, so the tone of the request comes across clearly',
      'A verbal chat on site, with a handshake to confirm both parties agree',
    ],
    correctAnswer: 0,
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
      'A full-day formal training course delivered off site by an external provider',
      'A short, focused safety briefing on a specific topic delivered to the work team — interactive, recorded with attendees signed in',
      'A one-to-one disciplinary meeting between a worker and their line manager',
      'A written notice posted on the site board that workers read in their own time',
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
      'Electronic communication',
      'Non-verbal / visual communication',
      'Telephone communication',
    ],
    correctAnswer: 2,
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
      'For confirming a routine material order with the wholesaler\'s trade counter',
      'For sending a complex variation that affects the price and needs a clear record',
      'For a quick reminder about tomorrow\'s start time that can wait until the morning',
      'For a sensitive performance discussion or a heated disagreement that needs de-escalation',
    ],
    correctAnswer: 3,
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
      'Giving the speaker your full attention, not interrupting, then summarising back what you heard to confirm understanding',
      'Writing down every word the speaker says so there is a verbatim record afterwards',
      'Listening only for the instructions that affect your own task and ignoring the rest',
      'Waiting for the speaker to finish so you can immediately give your own opinion',
    ],
    correctAnswer: 0,
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
      'A verbal instruction given on site by the architect during a progress meeting',
      'A numbered written instruction (paper or electronic) issued by the contract administrator',
      'A note in the site diary recorded by whoever was supervising that day',
      'A WhatsApp message from the client confirming the change they want made',
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
      'A formal letter posted first class the week before the appointment',
      'A WhatsApp voice note left on the customer\'s phone the night before',
      'A short SMS or email confirming time, address and any prep needed (parking, access)',
      'A phone call at 6am to make sure the customer is awake and ready for you',
    ],
    correctAnswer: 2,
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
      '7 seconds to make a first impression, 38 to build rapport, 55 to close a sale',
      '7 parts listening, 38 parts speaking, 55 parts writing in a good conversation',
      '7% eye contact, 38% gestures, 55% posture during a face-to-face briefing',
      '7% words, 38% tone of voice, 55% body language — relevant when emotional content is at stake',
    ],
    correctAnswer: 3,
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
      'Face-to-face (or video for distributed teams) — covers scope, programme, RAMS, key contacts and unanswered questions',
      'A group email to all parties, since it gives everyone the same written information',
      'A WhatsApp group, so the team can ask questions in their own time over the week',
      'A phone call to each trade individually, keeping each conversation private',
    ],
    correctAnswer: 0,
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
      'It keeps a permanent written record of every message for later reference',
      'It allows fast, group communication in noisy/large environments where mobiles are unreliable; useful for banksman, lifts, emergencies',
      'It is the only legal way to communicate during a site emergency under CDM 2015',
      'It is cheaper than mobile phones and so reduces the project\'s running costs',
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
      'It keeps the handover deliberately brief so the next shift can start work quickly',
      'It is a legal requirement under CDM 2015 for every crew change on a construction site',
      'It structures a clinical/safety handover so nothing important is missed — increasingly used in construction safety briefings too',
      'It records the handover in writing so it can be used as evidence in a dispute',
    ],
    correctAnswer: 2,
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
      'Sending customer addresses and EICR results so the whole team can see them',
      'Recording formal variations to price and scope agreed with the client',
      'Issuing the official RAMS and method statements for high-risk tasks',
      'Logistics chat (e.g. "running 10 mins late") — but anything contractually significant or personal data should still go through formal channels',
    ],
    correctAnswer: 3,
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
      'Held at the work face at the start of shift, very short (2-5 min), focused on the day\'s specific tasks and hazards',
      'Held in a classroom off site and lasting a full day, with a written test at the end',
      'Held only after an accident, to brief the team on what went wrong and what changes',
      'Held once at the start of the project and never repeated during the works',
    ],
    correctAnswer: 0,
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
      'CC the whole company on every email so nobody can claim they were not informed',
      'Use clear subject lines, keep messages short, only CC people who need it, and avoid sending sensitive info as attachments without checking the recipient',
      'Write in capitals so the message stands out and is read straight away by everyone',
      'Reply to every email within minutes, even if it means sending an incomplete answer',
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
      'A successful project handover, to thank the team and close out the works',
      'A change of shift, to brief the incoming crew on the day\'s remaining tasks',
      'A serious incident or near-miss — work stops, the workforce is briefed on what happened and what changes',
      'A delivery shortage, to decide how to make up the missing materials',
    ],
    correctAnswer: 2,
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
      'The area where electrical services are located, separate from the structure',
      'The part of the drawing that is still provisional and not yet approved for construction',
      'The zone reserved for the client\'s own notes and comments on the drawing',
      'The area that has been changed since the previous revision — making it easy to spot what is new',
    ],
    correctAnswer: 3,
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
      'Formal written question from contractor to designer/CA when a drawing or spec is unclear or contradictory — recorded and tracked',
      'A request from the client to the contractor for a price for additional work',
      'A formal complaint raised by a worker about their treatment at work',
      'A notice issued by Building Control requiring a defect to be corrected',
    ],
    correctAnswer: 0,
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
      'Crossed arms and minimal eye contact, to appear businesslike and professional',
      'Open posture, eye contact, nodding to acknowledge, calm tone — encourages trust and openness',
      'Constant note-taking with your head down, to show you are recording everything',
      'Standing as close as possible to the customer to show confidence and authority',
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
      'Replace the printed notice entirely, since everyone on site has a smartphone now',
      'Track who has read the notice by logging each person who scans the code',
      'Supplement the notice — e.g. linking to manufacturer instructions, full RAMS or O&M info — but the printed words should still cover the key safety message',
      'Lock the notice so only authorised staff can read it by scanning the code',
    ],
    correctAnswer: 2,
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
      'The commercial contract, priced quotations and the client\'s payment schedule',
      'The personal details and home addresses of everyone working on the project',
      'The full set of construction drawings at their current revision for reference',
      'F10 notice (where required), site rules, fire plan, first-aid info, the H&S policy statement and current toolbox talk topics',
    ],
    correctAnswer: 3,
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
      'Avoided for anything important — they are hard to search, share, transcribe and reference later; use written for record',
      'The best choice for important instructions — they capture tone and cannot be misread',
      'Legally binding as a record of instruction, the same as a written email would be',
      'Preferred on site because they can be listened to over ear defenders and noise',
    ],
    correctAnswer: 0,
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
      'Written communication — it is a permanent paper record of the tool\'s fault history',
      'Visual communication — instantly tells anyone who picks it up that the tool is out of service, with reason and date',
      'Verbal communication — it relies on the last user telling the next user it is faulty',
      'Electronic communication — it sends an alert to the supervisor when the tool fails',
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
      'A single long paragraph, so the reader gets the full picture in one go',
      'Bullet points only, with no headings, to keep the report as short as possible',
      'Structured (sections: progress, programme, RFIs, variations, H&S incidents, look-ahead) so the reader can scan quickly',
      'Verbal at the weekly meeting only, with nothing written down afterwards',
    ],
    correctAnswer: 2,
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
      'Written communication — it is a formal contractual record of the day\'s plan',
      'Verbal communication — it relies on the supervisor reading it out each morning',
      'Electronic communication — it links directly to the project management software',
      'Visual management — keeps the team\'s attention on today\'s priorities and tomorrow\'s readiness',
    ],
    correctAnswer: 3,
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
      'Site alarm + verbal "evacuate" + roll call at muster point — every site\'s induction covers this',
      'A group email to all workers explaining the location and nature of the fire',
      'A note on the site notice board telling people what to do in an emergency',
      'A WhatsApp message to the team so everyone gets the alert on their phone',
    ],
    correctAnswer: 0,
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
      'Speak more loudly and slowly in English until they appear to understand the procedure',
      'Use plain English with a visual demonstration, ask them to demonstrate it back, and provide a written checklist (translated where possible)',
      'Hand them the written procedure in English and let them read it on their own',
      'Tell them to only watch a qualified colleague and never attempt isolation themselves',
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
      'Excusing them from following the method statement at all because they cannot read it',
      'Printing the method statement in a smaller font so there is less text to get through',
      'Providing the MS in larger sans-serif font on cream paper, supplemented by a verbal walk-through and a labelled site sketch',
      'Moving them onto tasks that do not need a method statement so the issue never arises',
    ],
    correctAnswer: 2,
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
      'A long written procedure pinned to the wall in small print near the entrance',
      'A verbal briefing given once at the start of the project to the original team',
      'A QR code that links to a video, with no printed information beside it',
      'Pictograms (e.g. PPE symbols) used alongside short text, in high-contrast colours',
    ],
    correctAnswer: 3,
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
      'Use written communication (printed schedule + email), face them clearly when speaking so they can lip-read, and offer to use a BSL interpreter for complex discussions',
      'Speak much louder than normal and exaggerate your mouth movements throughout',
      'Ask a hearing family member to relay everything so you do not have to adapt at all',
      'Leave a voicemail with the full programme so they can replay it as many times as needed',
    ],
    correctAnswer: 0,
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
      'They are cheaper to print than text-based signs and so reduce site costs',
      'They are internationally standardised so workers from any background can recognise the meaning instantly',
      'They are a legal requirement under CDM 2015 on every construction site',
      'They last longer outdoors than printed wording, which fades in sunlight',
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
      'Exclude them from the verbal briefings entirely and just give them the written notes',
      'Insist they attend every briefing the same as everyone else to avoid special treatment',
      'Give them the written brief in advance, allow processing time, follow up one-to-one in a quiet area for questions',
      'Move them to a different team so they no longer have to attend any group briefings',
    ],
    correctAnswer: 2,
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
      'Customers who speak English fluently and simply prefer shorter letters',
      'Customers who are deaf and rely on a British Sign Language interpreter',
      'Customers who are blind and use a screen reader to access documents',
      'Customers with learning disabilities — short sentences, plain words, supporting images',
    ],
    correctAnswer: 3,
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
      'Deaf and hard-of-hearing people, non-native English speakers, anyone in a noisy environment, and many neurodivergent people — universal benefit',
      'Only profoundly deaf people who cannot hear the soundtrack at all',
      'Only viewers watching on a phone where the screen is too small to follow',
      'Only people who have chosen to mute the video for their own convenience',
    ],
    correctAnswer: 0,
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
      '2:1 for normal text (Level AA) — so text reads against background for visually-impaired users',
      '4.5:1 for normal text (Level AA) — so text reads against background for visually-impaired users',
      '10:1 for normal text (Level AA) — so text reads against background for visually-impaired users',
      '1.5:1 for normal text (Level AA) — so text reads against background for visually-impaired users',
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
      'Adding more technical detail so the customer fully understands the regulations cited',
      'Translating the whole letter into Latin terms used in the trade standards',
      'Replacing jargon with plain alternatives (e.g. "RCD" → "safety switch that cuts power if there\'s a fault"), short sentences, and a friendly closing',
      'Writing it in a smaller font so the letter fits onto a single side of paper',
    ],
    correctAnswer: 2,
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
      'Use only bright fluorescent colours so the signs stand out more strongly',
      'Make the signs much larger so the colour is easier to see from a distance',
      'Replace all red and green signs with blue ones that everyone can distinguish',
      'Pair colour with shape and text — red circle with slash for prohibition, blue circle for mandatory, yellow triangle for warning',
    ],
    correctAnswer: 3,
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
      'Have multiple language subtitles, use clear visuals, avoid colloquialisms, and include a short comprehension check at the end',
      'Be delivered in English only, since all workers are expected to speak English on site',
      'Be kept as short as possible by cutting the safety detail to save the team time',
      'Rely on fast-paced narration so the induction can be completed in under five minutes',
    ],
    correctAnswer: 0,
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
      'Post a standard printed report and assume a relative will read it to them',
      'Provide a tagged accessible PDF (or large-print/braille if requested), an audio summary, and offer a verbal walk-through of any concerns',
      'Give only a verbal summary on the day and keep no written record for them',
      'Send a scanned image of the handwritten report, which a screen reader can interpret',
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
      'The decorative serifs guide the eye smoothly along each line of text',
      'They use less ink when printed, making documents cheaper to produce',
      'Letterforms are simpler with fewer decorative strokes, helping some readers (e.g. dyslexic) distinguish characters',
      'They can be displayed at a much smaller size while staying readable',
    ],
    correctAnswer: 2,
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
      'Repeat the instruction several times until the listener stops asking questions',
      'Hand the listener a written copy of everything you have just told them verbally',
      'Demonstrate the task yourself slowly while the listener simply watches you do it',
      'Ask the listener to summarise back the key message in their own words to confirm understanding',
    ],
    correctAnswer: 3,
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
      'Tactile signing (deafblind manual or block alphabet), with the help of a communicator-guide — every situation is individual',
      'Standard British Sign Language alone, the same as a deaf customer would use',
      'A large-print written schedule, which they can read with a magnifying glass',
      'A hearing loop in the room, which amplifies your voice for them to follow',
    ],
    correctAnswer: 0,
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
      'Be shouted over the noise so the whole team can hear it without stopping work',
      'Be moved to a quiet area, or use written/visual aids and confirm understanding individually',
      'Be kept very short so it is over before anyone needs to remove ear defenders',
      'Be repeated several times in the workshop until everyone nods that they understood',
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
      'Over 40 words — longer sentences carry more detail and reduce the document length',
      'Exactly 30 words every time, to keep a consistent rhythm across the document',
      'Under 25 words (ideally 15-20) — shorter sentences are easier to process for everyone',
      'As short as possible, ideally 3-5 words, even if the meaning becomes unclear',
    ],
    correctAnswer: 2,
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
      'Closed captions appear in a larger font, while subtitles are always small',
      'Closed captions are only ever in English, while subtitles are translations',
      'Closed captions can be switched off, while subtitles are permanently on screen',
      'Closed captions also describe non-speech audio (sirens, music, off-screen voices) — useful for deaf viewers',
    ],
    correctAnswer: 3,
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
      'A reading age of around 9-11 years has been quoted in industry research; brief accordingly',
      'A reading age of around 16-18 years, so technical wording is no barrier',
      'A reading age of around 5-6 years, so only pictures should ever be used',
      'A reading age that matches a university graduate, so jargon is acceptable',
    ],
    correctAnswer: 0,
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
      'Turn up as planned and ask the customer to come outside to meet you at the door',
      'Phone ahead to discuss access — alternative meeting place, or use a portable ramp, or invite a family member as agreed with the customer',
      'Cancel the survey, as a property with a step cannot be assessed for the customer',
      'Carry the customer over the step yourself so the survey can go ahead as normal',
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
      'Free of any spelling or grammatical errors, checked by a professional proofreader',
      'Compliant with WCAG accessibility standards for use on a public-sector website',
      'Written in plain English to a defined standard — used by some public bodies and consumer-facing firms',
      'Legally binding on both parties once it has been signed and dated by the customer',
    ],
    correctAnswer: 2,
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
      'Bright overhead lighting kept low so a projector screen can be seen clearly',
      'A large table between the parties so notes can be spread out during the audit',
      'Background music to put everyone at ease and make the meeting feel relaxed',
      'A hearing loop (induction loop), good lighting (for lip-reading), and chairs arranged so faces are visible',
    ],
    correctAnswer: 3,
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
      'Walk them through the key symbols, highlight what they care about (sockets, switches, locations) and offer to print a simplified version',
      'Hand them the full set of technical drawings and let them work out the symbols themselves',
      'Avoid showing them drawings at all, as customers cannot be expected to read them',
      'Explain every symbol on the drawing in full so they understand the whole design',
    ],
    correctAnswer: 0,
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
      'Every visitor to the site, regardless of whether they can evacuate unaided',
      'Anyone who cannot evacuate without assistance — e.g. mobility-impaired visitors, people with conditions affecting evacuation',
      'Only the appointed fire marshals, who lead the evacuation in an emergency',
      'Only workers carrying out hot works or other high-risk activities on site',
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
      'Defend yourself firmly and argue back that the work has been done correctly',
      'Pack up your tools and leave the job immediately without telling anyone',
      'Stay calm, listen to the specific complaint, acknowledge their frustration, and fetch your supervisor — document the interaction afterwards',
      'Promise the customer a different electrician on the spot to calm them down',
    ],
    correctAnswer: 2,
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
      'Get your own work into the riser first so the other trade has to fit around you',
      'Down tools and refuse to continue until the other trade leaves the cupboard',
      'Report the other trade to the HSE for obstructing your access to the riser',
      'Step back, take a breath, and propose a quick joint look at the drawings with both supervisors to agree the sequence',
    ],
    correctAnswer: 3,
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
      'Tell them clearly the comments are not OK, and report it to your supervisor or HR if it continues — this may be harassment under Equality Act 2010 s.26',
      'Laugh along with the jokes so you fit in and do not make things awkward on site',
      'Make similar jokes back about the colleague so they see how it feels to be targeted',
      'Say nothing and avoid the colleague, since complaining could damage your reputation',
    ],
    correctAnswer: 0,
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
      'Submit a claim directly to an employment tribunal without raising it internally first',
      'Raise it informally with your line manager first, then in writing as a formal grievance per the company procedure (which should mirror the ACAS Code)',
      'Report the matter straight to the HSE, who investigate unfair treatment at work',
      'Resign immediately and claim constructive dismissal as the first formal step',
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
      'Take the client\'s side, since the customer is always right in a dispute over price',
      'Step in and offer your own opinion on what the variation should be worth',
      'Stay out of the negotiation, carry on with your task, and let the supervisor and client resolve it — but record what you heard in case it\'s asked about later',
      'Leave the room straight away so you cannot be drawn into the argument at all',
    ],
    correctAnswer: 2,
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
      'Stand your ground and argue back to show you will not be intimidated on the job',
      'Carry on working and hope the person calms down before things escalate further',
      'Try to physically remove the aggressor from the property so you can finish safely',
      'Withdraw to a safe place, call your supervisor, and call 999 if you fear imminent harm — never put yourself in danger to finish a job',
    ],
    correctAnswer: 3,
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
      'Sequencing — one trade not ready when another is, or two trades working in the same space at the same time without co-ordination',
      'Differences in pay rates between trades, which the JIB grade structure resolves',
      'Disagreement over which trade chairs the daily morning briefing on site',
      'Personality clashes alone, which have nothing to do with the work being done',
    ],
    correctAnswer: 0,
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
      'Raising your own voice to match the customer\'s so you are not talked over',
      'Active listening with empathic acknowledgement — let them feel heard before trying to problem-solve',
      'Immediately offering a discount to make the complaint go away as fast as possible',
      'Explaining in technical detail why the customer is wrong about the work done',
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
      'A solicitor of their choice, who has an automatic right to attend the meeting',
      'A family member or friend who does not work for the company at all',
      'A trade union rep or a work colleague at the grievance meeting (statutory right under the Employment Relations Act 1999)',
      'An ACAS conciliator, who must be present at every grievance meeting by law',
    ],
    correctAnswer: 2,
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
      'Accept it as part of the trade, since apprentices are expected to take rough treatment',
      'Shout back at the senior trade so they learn the apprentice will not be pushed around',
      'Say nothing, because raising it against a senior worker would look like trouble-making',
      'Tell them clearly the behaviour is not OK, withdraw if needed, and report it to your line manager — this is bullying, not "banter"',
    ],
    correctAnswer: 3,
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
      'Looking for the underlying interests of both parties and finding a solution that meets both — a more durable outcome than either side "winning"',
      'Splitting the difference exactly down the middle so neither side gets what they wanted',
      'Standing firm on your opening position until the other party gives way completely',
      'Letting the more senior person decide the outcome so the dispute ends quickly',
    ],
    correctAnswer: 0,
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
      'Poor workmanship that the customer has only just noticed on the finished job',
      'Lack of communication — the customer didn\'t know what was happening; reasonable updates would have prevented the complaint',
      'A dispute over the final price that the customer has disguised as a timing complaint',
      'The customer\'s own unreasonable expectations about how quickly work can be done',
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
      'Step in between the two parties to physically separate them and stop the fight',
      'Take a video of the fight on your phone so there is clear evidence afterwards',
      'Move to safety, call site management/999 if needed, and provide a written witness account afterwards',
      'Ignore it and carry on working, as it is not the apprentice\'s place to get involved',
    ],
    correctAnswer: 2,
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
      'Verbal, written, non-verbal, electronic',
      'Direct, deliberate, accidental, structural',
      'Personal, collective, intentional, reckless',
      'Direct, indirect, harassment, victimisation',
    ],
    correctAnswer: 3,
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
      'Withdraw from the immediate situation, report it as a grievance per the ACAS Code, and if the threat is criminal involve the police',
      'Threaten the manager back so they understand the behaviour will not be tolerated',
      'Say nothing, since a manager has the authority to speak to staff however they choose',
      'Wait to see if the manager apologises before deciding whether to do anything about it',
    ],
    correctAnswer: 0,
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
      'A formal grievance is raised, as conciliation replaces the company\'s internal process',
      'An Employment Tribunal claim — early conciliation is mandatory under most claims (the EC certificate is required to lodge a claim)',
      'A disciplinary meeting, where ACAS chairs the hearing on the employer\'s behalf',
      'A County Court claim for unpaid wages, which ACAS must attempt to settle first',
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
      'Drop the price immediately to whatever the customer demands to end the argument',
      'Match the customer\'s tone so they realise you will not be talked down to on price',
      'Stay calm, restate the basis of the price (scope, time, materials), offer to revisit any specific item — and end the conversation if it stays abusive',
      'Refuse to discuss the price further and walk off the job without explanation',
    ],
    correctAnswer: 2,
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
      'A concern an employer raises about an employee\'s conduct or performance',
      'A dispute between two contractors over payment under a construction contract',
      'A complaint a customer makes about the standard of work they have received',
      'A formal concern, problem or complaint that an employee raises with their employer',
    ],
    correctAnswer: 3,
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
      'Withdraw your colleague, report to the supervisor and the customer, and make a record — a hate-speech matter may need police involvement',
      'Tell your colleague to ignore it and carry on, since the neighbour is not your customer',
      'Confront the neighbour directly and demand an apology before continuing work',
      'Say nothing, as comments made by a neighbour are nothing to do with the contractor',
    ],
    correctAnswer: 0,
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
      'Whoever is the more senior of the two colleagues decides which approach is used',
      'Refer to the spec/drawings/BS 7671 — the standards arbitrate; if still unclear, raise an RFI to the designer',
      'Both carry on with their own approach and see which circuit passes testing',
      'The supervisor picks the cheaper of the two approaches to keep costs down',
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
      'A binding ruling imposed on both parties by an independent legal adjudicator',
      'A formal investigation carried out by the employer before a disciplinary hearing',
      'A facilitated conversation between disputing parties, led by a trained neutral, aimed at reaching a voluntary resolution',
      'A tribunal hearing where a judge decides the outcome of the workplace dispute',
    ],
    correctAnswer: 2,
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
      'An employment tribunal, since a deduction from pay is an unlawful wages claim',
      'ACAS early conciliation, which is mandatory before any commercial dispute',
      'A grievance under the ACAS Code, raised with the main contractor\'s HR team',
      'Negotiation first, then the contract\'s formal dispute resolution route (often adjudication under the Construction Act for construction contracts)',
    ],
    correctAnswer: 3,
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
      'Politely raise it with the customer (parent), explain the privacy concern, and if not removed escalate via your supervisor — UK GDPR may apply',
      'Take the teenager\'s phone and delete the video yourself before it spreads further',
      'Call the police immediately, as filming a worker without consent is a criminal offence',
      'Ignore it completely, since anything filmed in a private home is legally allowed',
    ],
    correctAnswer: 0,
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
      'Push back just as hard on every point so they learn to back down around you',
      'Stay factual, document agreements in writing, don\'t take it personally, and engage your supervisor early if it affects safety or the work',
      'Avoid them completely and refuse to work on any task alongside them on site',
      'Always give way to keep the peace, even when you know your approach is correct',
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
      'The HSE only, who handle every concern raised by a union member at work',
      'An employment tribunal directly, bypassing the company\'s grievance procedure',
      'The union representative — confidential parallel route alongside the company\'s own grievance procedure',
      'The Principal Contractor\'s site manager, who must resolve all union members\' concerns',
    ],
    correctAnswer: 2,
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
      'An immediate HSE prosecution of the firm for breaching its communication duty',
      'A pay rise demand from the workforce to compensate for the extra effort involved',
      'A loss of the firm\'s competent person scheme registration with no warning given',
      'Rework — re-doing an installation because the spec was misunderstood',
    ],
    correctAnswer: 3,
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
      'Electric shock or arc flash to the second person if they assume the system is dead — potentially fatal',
      'A minor delay only, since the second electrician will re-test before starting anyway',
      'Damage to the test equipment if both electricians lock off the same circuit at once',
      'A pay dispute between the two electricians over who completed the isolation first',
    ],
    correctAnswer: 0,
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
      'Improved technical quality, as the team focuses harder on the work itself',
      'Reputation damage, negative reviews, lost repeat work and increased complaint handling cost',
      'Lower material costs, because fewer customer meetings mean less time spent quoting',
      'No lasting effect, since customers judge a contractor only on the finished result',
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
      'A modest saving, since the electrical contractor can use the time on another job',
      'A safety improvement, because the team has more time to plan the work properly',
      'Wasted attendance (van and labour mobilised for nothing), abortive material drops and a knock-on delay claim against the main contractor',
      'No real impact, as the main contractor absorbs all programme changes automatically',
    ],
    correctAnswer: 2,
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
      'A deduction from the worker\'s wages to cover any damage caused by the hazard',
      'Loss of the firm\'s competent person scheme registration as the only consequence',
      'A verbal warning from the site manager, recorded on the worker\'s personnel file',
      'Prosecution under HASAWA s.7 (employee duty) or s.3 (employer duty to non-employees) following an injury or fatality',
    ],
    correctAnswer: 3,
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
      'Higher productivity, fewer reworks, better safety record, stronger team morale and repeat-customer business',
      'Lower material costs, since well-briefed teams use cheaper components than usual',
      'Shorter working hours for everyone, because less time is spent talking on site',
      'Reduced need for any written records, as good verbal communication replaces them',
    ],
    correctAnswer: 0,
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
      'Only the trade that caused the delay, with no effect on any other trade on site',
      'The whole programme — successor trades cannot start, scaffold may be retained, plant hire is extended; the cumulative cost grows fast',
      'Only the project budget, since delays are purely a commercial rather than a timing issue',
      'Nothing beyond that day, as each trade simply makes up lost time the next morning',
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
      'No consequence at all, since a verbal instruction from a customer is fully binding',
      'An automatic breach of UK GDPR for failing to record the customer\'s request',
      'A "your word against theirs" dispute about scope and price — usually resolved in the customer\'s favour with no record',
      'An HSE investigation, as undocumented instructions are a health and safety failing',
    ],
    correctAnswer: 2,
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
      'A failed Building Control inspection only, with no risk to anyone working on it',
      'Confusion for the customer when reading the board, but no safety consequence',
      'A delay at the next periodic inspection while the labels are corrected',
      'Wrong circuit isolated by future maintainers — leading to live work where the worker thought they had isolated; potentially fatal',
    ],
    correctAnswer: 3,
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
      'Workers improvising on site, missing critical controls — which the MS was supposed to spell out',
      'Workers completing the task faster, since less detail means fewer steps to follow',
      'A delay only while the document is rewritten, with no real safety consequence',
      'An automatic HSE prosecution of the author the moment the document is issued',
    ],
    correctAnswer: 0,
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
      'No impact, because the QS automatically picks up every variation from the drawings',
      'Variations missed from the next valuation — cash-flow strain on the contractor and arguments at final account',
      'A health and safety breach, since variations must be reported under CDM 2015',
      'A delay to the programme only, with no effect on the contractor\'s cash flow',
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
      'No consequence, as one missed toolbox talk makes little difference to a worker',
      'A deduction from the worker\'s pay for the time the briefing would have taken',
      'Working without the latest safety briefing — and the firm cannot evidence training under HASAWA s.2(2)(c) for that worker',
      'An automatic RIDDOR report to the HSE for the missed safety communication',
    ],
    correctAnswer: 2,
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
      'The exact test results recorded on the installation certificate at completion',
      'The brand of consumer unit and accessories the contractor chose to install',
      'The qualifications and scheme registrations held by the individual electricians',
      'How well and how often the contractor communicates progress, problems and costs — the technical work is assumed to be competent',
    ],
    correctAnswer: 3,
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
      'Repeat support calls, warranty disputes, and a Building Control or scheme audit failure if certs are missing',
      'A faster handover, since the customer has less paperwork to read through',
      'No consequence, as the certification is held on the contractor\'s system anyway',
      'An immediate fine from the HSE for failing to issue the installation certificate',
    ],
    correctAnswer: 0,
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
      'A delay only, while the paperwork is brought up to date before work resumes',
      'The same near-miss recurring — possibly with worse outcome — because the controls weren\'t shared or tightened',
      'A reduction in the team\'s pay for failing to keep the documents current',
      'No effect at all, since the near-miss did not actually injure anyone the first time',
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
      'The wholesaler, who is responsible for clarifying any ambiguous order they receive',
      'The customer, since the materials are ultimately being installed in their property',
      'Whoever placed the unclear order — the contractor pays for return restock fees and the impact on the day\'s work',
      'Nobody, because wholesalers always exchange wrongly supplied goods free of charge',
    ],
    correctAnswer: 2,
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
      'Lower running costs, because less time is spent in meetings and briefings',
      'A more independent workforce that solves problems without needing to be told',
      'Faster decision-making, since fewer people are consulted before work proceeds',
      'Higher staff turnover, lower morale and a worse safety culture — and worse commercial performance follows',
    ],
    correctAnswer: 3,
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
      'Items missed from the bid, leading to a job that loses money or to disputes with the customer over what was included',
      'A safer installation, because a simpler price means a simpler scope of works',
      'No real impact, since any missed items can simply be added as paid variations',
      'A faster quote that wins more work by undercutting competitors on price',
    ],
    correctAnswer: 0,
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
      'Faster independence, as apprentices learn best by being left to work things out alone',
      'Slower skill development, repeated errors and disengagement — feedback is what turns experience into competence',
      'No effect, because apprentices pick up skills naturally from watching the team work',
      'A breach of the apprenticeship agreement that the training provider must report',
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
      'A short delay only, while the worker is sent to be checked over by a doctor',
      'A fine for the worker who entered the area without checking the asbestos register',
      'Long-term occupational disease (mesothelioma) decades later — and a major civil liability claim against the firm',
      'No consequence, provided the worker wore a standard dust mask while in the area',
    ],
    correctAnswer: 2,
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
      'RIDDOR 2013 only, since near-misses must always be reported directly to the HSE',
      'The Consumer Rights Act 2015, because a near-miss affects the quality of the work',
      'UK GDPR, as failing to record an incident is a personal data processing failure',
      'The company\'s own incident reporting policy, and potentially HASAWA s.7 if a hazard goes unaddressed and harms someone',
    ],
    correctAnswer: 3,
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
      'Withhold final payment, leave a poor review, and never use you again — even if the work itself was fine',
      'Overlook the poor communication entirely, provided the finished work is to a high standard',
      'Recommend the contractor to friends because the job was completed on time',
      'Pay more readily, as a quiet job with no updates feels efficient to the customer',
    ],
    correctAnswer: 0,
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
      'Minor issue that the next revision will quietly correct without any rework needed',
      'Communication failure that leads to rework — the controlled drawing register exists exactly to prevent this',
      'Design error by the architect that the contractor cannot be held responsible for',
      'Health and safety breach reportable to the HSE under CDM 2015 regulations',
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
      'A faster start, since the new starter can get straight onto the tools on day one',
      'No real issue, as new starters soon pick up the reporting routes from colleagues',
      'Hazards going unreported, isolation of the new starter, and slower integration into the team — a missed induction is a real cost',
      'An automatic HSE prosecution the moment an uninducted worker steps onto site',
    ],
    correctAnswer: 2,
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
      'Higher material costs, since more time is spent meeting and briefing the team',
      'Longer working days, because communication takes time away from the tools',
      'More paperwork for everyone, which slows the pace of work on site overall',
      'Better safety performance, higher productivity, lower complaint rates, higher customer NPS and lower staff turnover — measurable on every metric',
    ],
    correctAnswer: 3,
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
      'Co-operate with the Principal Contractor, comply with directions and H&S information, and report anything you see that puts you or others at risk',
      'Prepare the construction phase plan and keep it updated throughout the works',
      'Carry out risk assessments for the whole site and brief the other trades on them',
      'Appoint the Principal Designer and provide the pre-construction information to bidders',
    ],
    correctAnswer: 0,
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
      'Share them freely with anyone who asks, as a completed certificate is a public document',
      'Process them only for the agreed purpose (the cert), store them securely, share only with parties who need them (e.g. landlord, scheme provider), and have a privacy notice telling the customer what you do with their data',
      'Delete them as soon as the job is paid for, since you no longer need the customer\'s data',
      'Keep them indefinitely on a shared drive so the whole team can access them at any time',
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
      'The HSE incident line, which logs every mental health concern raised by workers',
      'Their employer\'s occupational health department, which is the only confidential route',
      'The Lighthouse Construction Industry Charity (helpline 0345 605 1956) and apps such as the Lighthouse Helpline app',
      'The local job centre, which signposts construction workers to mental health services',
    ],
    correctAnswer: 2,
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
      'A notice stating the date of the next periodic inspection and the inspector\'s name',
      'A notice warning that the installation has more than one source of supply present',
      'A notice indicating that a single switch does not isolate all live conductors',
      'A notice marked "Safety Electrical Connection - Do Not Remove" durably fixed in a visible position',
    ],
    correctAnswer: 3,
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
      'Domestic (household) premises in certain situations — the standard 514.12 notice does not apply where conditions are met',
      'Industrial premises with their own on-site maintenance team and electrical engineer',
      'Installations protected throughout by AFDDs, where the notice is no longer required',
      'Commercial premises inspected more often than every five years by a competent person',
    ],
    correctAnswer: 0,
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
      'Any personal grievance the worker has about their own pay or working conditions',
      'A relevant failure (criminal offence, breach of legal obligation, miscarriage of justice, danger to H&S, environmental damage, or cover-up of the above)',
      'A complaint about a colleague\'s conduct that the worker finds personally annoying',
      'A disagreement with management about how the company should be run commercially',
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
      'Ordinary unfair dismissal, but only after completing two years\' continuous service',
      'Wrongful dismissal, limited to the notice pay they were contractually owed',
      'Automatically unfair dismissal — no qualifying period applies and uncapped compensation may follow',
      'No claim at all, as protected disclosures cannot prevent a fair redundancy',
    ],
    correctAnswer: 2,
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
      'Only a person who has completed medical treatment and obtained a Gender Recognition Certificate',
      'Only a person who has legally changed their name and updated their official documents',
      'Only a person currently undergoing surgical treatment, but not before or after it',
      'A person who is proposing to undergo, is undergoing, or has undergone a process to reassign their sex — they have the protected characteristic from the moment they propose it',
    ],
    correctAnswer: 3,
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
      'A physical or mental impairment with a substantial and long-term (12 months+) adverse effect on ability to carry out normal day-to-day activities',
      'Only a physical impairment that is visible to others and confirmed by a doctor',
      'Any short-term illness or injury that prevents a person working for over a week',
      'Only a condition that means a person is registered disabled with the local authority',
    ],
    correctAnswer: 0,
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
      'Only the major established religions, with no protection for minority or new faiths',
      'Religion and any religious or philosophical belief (including a lack of belief) — recognised philosophical beliefs include ethical veganism and gender-critical belief',
      'Only religious belief, with philosophical and political beliefs specifically excluded',
      'Only belief held by someone who actively practises and attends a place of worship',
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
      'Suspend the employee → dismiss → allow them to appeal afterwards if they wish',
      'Hold a meeting → decide on the spot → record the outcome, with no appeal stage',
      'Establish facts → inform employee → hold meeting → decide → allow appeal',
      'Issue a written warning → wait six months → review, with no formal meeting needed',
    ],
    correctAnswer: 2,
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
      'Only employers with five or more employees, mirroring the H&S policy threshold',
      'Only large unionised firms where a trade union is formally recognised on site',
      'Only public-sector employers, with private contractors free to set their own procedures',
      'All employers and workers — failure to follow it can affect tribunal awards in unfair dismissal and similar claims',
    ],
    correctAnswer: 3,
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
      'Mental health awareness, training and support across the construction sector',
      'Apprenticeship funding and training-provider quality across the construction sector',
      'Physical fitness and manual-handling injury prevention for site workers',
      'Financial advice and debt support for self-employed tradespeople',
    ],
    correctAnswer: 0,
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
      '116 123 (24/7, every day of the year) — for support, info and guidance on mental health concerns',
      '0300 123 3393 (Mon-Fri 9am-6pm) — for support, info and guidance on mental health concerns',
      '0345 605 1956 (Mon-Fri 9am-5pm) — for support, info and guidance on mental health concerns',
      '999 (24/7 emergency only) — for support, info and guidance on mental health concerns',
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
      'Consent — the customer must tick a box agreeing to every use of their data',
      'Legal obligation — a statute requires the data to be processed for the work',
      'Contract — processing necessary for the performance of the contract (or to take pre-contract steps at the customer\'s request)',
      'Vital interests — the processing is needed to protect someone\'s life',
    ],
    correctAnswer: 2,
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
      '24 hours of awareness, where the breach is likely to result in a risk to individuals',
      '7 days of awareness, where the breach is likely to result in a risk to individuals',
      '30 days of awareness, where the breach is likely to result in a risk to individuals',
      '72 hours of awareness, where the breach is likely to result in a risk to individuals',
    ],
    correctAnswer: 3,
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
      'Anything they consider likely to endanger their own H&S, or that of another person — to the appropriate person (typically site manager or supervisor)',
      'Only injuries serious enough to require hospital treatment, reported under RIDDOR',
      'Only defects in equipment that they are personally using on that day\'s task',
      'Only hazards that fall within their own trade, leaving others for those trades to report',
    ],
    correctAnswer: 0,
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
      'An earthing or main bonding connection is made, fixed at the connection point',
      'An installation includes alternative or additional sources of supply (e.g. PV, battery, generator) — at the origin and at certain other points',
      'A single isolation device does not disconnect all the live conductors of a circuit',
      'An installation is due for its next periodic inspection and test by a competent person',
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
      '72 hours (extendable to one week for complex requests if the data subject is told of the extension)',
      '14 days (extendable to 28 days for complex requests if the data subject is told of the extension)',
      'One month (extendable to three months for complex requests if the data subject is told of the extension within the first month)',
      'Six months (extendable to one year for complex requests if the data subject is told of the extension)',
    ],
    correctAnswer: 2,
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
      'The national media first, to ensure the wrongdoing is made public straight away',
      'A solicitor only, who must lodge the disclosure on the worker\'s behalf',
      'A trade union representative, who is the only protected route under PIDA',
      'The employer or another responsible person (with wider routes including prescribed persons such as the HSE or ICO if conditions are met)',
    ],
    correctAnswer: 3,
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
      'Anyone who is married or in a civil partnership; cohabitees and single people are not protected by this characteristic',
      'Anyone in a long-term relationship, whether married, in a civil partnership or cohabiting',
      'Only married couples, with civil partners protected under a separate characteristic',
      'Anyone planning to marry, but not those who are already married or in a civil partnership',
    ],
    correctAnswer: 0,
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
      '100%',
      '25%',
      'No uplift',
    ],
    correctAnswer: 2,
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
      'Earthing — to identify the main earthing terminal and protective bonding connections',
      'Periodic inspection — to state the date of the next inspection and test',
      'Alternative supplies — to warn that more than one source of supply is present',
      'Isolation — to alert workers where an isolation device does not isolate all live conductors at a single point',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 Reg 514.11 (Warning notice: isolation) requires a durable warning notice fixed in each position where there are live parts not capable of being isolated by a single device, indicating the location of each disconnector. Tells future workers a single switch may not kill everything. Sits alongside 514.12 (PIT), 514.13 (earthing), 514.15 (alt supplies).',
    section: '5.X.1',
    difficulty: 'advanced',
    topic: 'BS 7671 514.11 warning notices',
  },
  {
    id: 300,
    question:
      'A construction firm with a strong wellbeing culture typically combines which of the following?',
    options: [
      'Mental Health First Aiders, EAP access, signposting (Lighthouse, Mind, Mates in Mind, Samaritans), regular wellbeing toolbox talks, and a no-blame reporting culture',
      'A single annual wellbeing poster on the site notice board and nothing more',
      'A policy that tells struggling workers to keep personal problems away from work',
      'Random testing for stress and a disciplinary process for anyone who is found struggling',
    ],
    correctAnswer: 0,
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

