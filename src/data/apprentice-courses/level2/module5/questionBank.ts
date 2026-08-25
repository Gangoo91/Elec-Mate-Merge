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
import {
  drawWeighted,
  LEVEL2_WEIGHTS,
  type DifficultyWeights,
} from '@/utils/apprenticeQuestionDraw';

export const module5QuestionBank: QuestionBank[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // §5.1.1 — AC 1.1 Site management team & roles (25 questions)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    question:
      'Who is responsible for the day-to-day safety co-ordination of all trades on a CDM 2015 construction project?',
    options: [
      'Clerk of works',
      'Principal Contractor',
      'Site supervisor',
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
      'The supervising electrician on site',
      'The training provider assessing the apprentice',
      'The householder who commissioned the work',
      'The competent person scheme provider',
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
      'Carry on as instructed — your supervisor issued the order, so responsibility for any resulting fault rests with them',
      'Energise the circuit and test it first, so that you can prove it is genuinely unsafe before raising it with anyone',
      'Finish the task quietly and note your doubts in the site diary, so the record covers you if it fails later',
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
      'Clerk of works',
      'Site manager',
      'Wholesaler rep',
      'Contracts manager',
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
      'Hold a permit of your own once you have completed the site induction, then work in clinical areas alone',
      'Sign the permit register on behalf of the whole team each morning before any work starts on the ward',
      'Take charge of the permit yourself and authorise the other trades to enter the clinical area',
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
      'The HSE inspector, who must countersign the file before the completed building can be occupied',
      'The Building Control surveyor, who retains the master copy on the council record for the area',
      'The site manager, who archives it for the Principal Contractor once the site has been demobilised',
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
      'The apprentice on site, as the youngest member of the team and the closest to the pupils in age',
      'The Principal Contractor\'s site manager, liaising with the school\'s designated safeguarding lead',
      'The local authority Environmental Health Officer, who approves every works package in an occupied school',
      'The Principal Designer, who builds safeguarding duties into the pre-construction information',
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
      'They are exactly the same role — the two job titles are interchangeable, carry identical authority and duties, and vary only with the house style of the company',
      'The site manager is the senior commercial role and holds the project budget, while the site agent deals only with deliveries, gate security and site tidiness on the job',
      'The site agent is more senior, often running multiple sites or the whole project commercially; the site manager runs the day-to-day operations on one site',
      'The site agent works directly for the client as their representative on site, while the site manager is always employed by a subcontractor to run a single package',
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
      'Each individual trade contractor provides welfare only for its own directly employed operatives on site',
      'The client, because the welfare arrangements are listed in the pre-construction information pack',
      'Whichever trade arrives on site first must set up the shared welfare facilities for everyone',
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
      'Quality surveyor — inspects finished work and signs off the snag list before handover',
      'Quayside storeman — controls material deliveries and stock on the larger sites',
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
      'Manage the maintenance and electrical testing schedule once the building is occupied and handed over to the client facilities team',
      'Co-ordinate mechanical and electrical services so trades do not clash in ceilings, risers and plant rooms — usually using a BIM model',
      'Negotiate mechanical and electrical material prices with the wholesalers and place the orders against the project procurement schedule',
      'Carry out the final commissioning of every mechanical and electrical plant item single-handed before the client witnesses the handover tests',
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
      'The HSE — safety advisors are government inspectors making routine monthly visits to every notified construction site',
      'The individual trades on site, who jointly employ the advisor and share the monthly cost between them by headcount',
      'The Principal Contractor (or a CDM consultancy) — they audit conditions, review RAMS and report to senior management',
      'The client directly, which under CDM 2015 removes the need to appoint a Principal Designer for the project',
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
      'The client — they own the building, so they brief every person entering it on the local site rules and the hazards involved',
      'The hospital estates department, since the site sits within their premises and they issue all the ward access permits and keys',
      'Your training provider, who must approve and induct you at any new placement before you first attend a live working site',
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
      'Planning co-ordinator',
      'Procurement controller',
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
      'Do it as told — a direct instruction from the foreman overrides the written site rules for a short task',
      'Wear the harness but skip clipping on, since five minutes at height is too brief for the risk to matter',
      'Refuse politely, do the task with proper fall protection, and report the instruction to your own supervisor',
      'Get a colleague to foot the ladder instead, so that no harness is needed for a task lasting five minutes',
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
      'The apprentice keeping the site diary, who records the client requests as they are made',
      'The HSE inspector, who passes the client concerns on to the contractor each week',
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
      'Reg 4',
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
      'Principal Fire Officer, appointed by the local fire and rescue authority for the whole duration of the works',
      'Senior Responsible Engineer, who signs off the structural calculations and the fire strategy drawings',
      'Principal Accountable Person, with golden-thread information duties through the Building Safety Regulator',
      'Building Safety Marshal, who patrols the building throughout the works and reports each week to the client body',
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
      'Energise it — the customer owns the property, so their instruction overrides your testing procedure',
      'Energise it, but only after a quick visual check that nothing on the circuit is obviously wrong',
      'Energise it and text your supervisor afterwards to tell them exactly what you have done and why',
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
      'The Principal Contractor, who instructs them on what to inspect and record on site each day',
      'The HSE, because the clerk of works is appointed as a statutory site safety inspector',
      'The site foreman, who they assist with the day-to-day labour co-ordination on site',
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
      'The site manager for the Principal Contractor',
      'The client at the weekly site progress meeting',
      'The supervising electrician or charge hand',
      'The placement assessor from the training provider',
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
      'The site manager for the Principal Contractor, who holds the plant register for the site',
      'The wholesaler who supplied it, by phoning their returns line directly that morning',
      'The next operative to use it, told verbally so they know to avoid the damaged unit',
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
      'The Principal Designer, who records all near-misses in the pre-construction information',
      'The HSE alone, since near-misses are reportable under RIDDOR in the same way as injuries are',
      'The person who nearly fell, who decides whether the near-miss is worth mentioning at all',
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
      'The site manager from the Principal Contractor, who handles all of the pay queries raised on the site',
      'Your employer (line manager or office contact), with your training provider as a secondary route',
      'ACAS directly, because pay and working-time disputes are always settled through a formal tribunal claim',
      'The JIB, who set the grade rates and settle every individual pay disagreement between members',
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
      'Notification to the local authority within 24 hours, as hospital attendance is a local matter',
      'A report by the injured person to their own GP, who then notifies the HSE on their behalf',
      'A police report, since any hospital attendance arising from work is treated as a crime scene',
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
      'Confront the colleague on site straight away so that they redo the isolation before anyone works on it',
      'Quietly raise it with your supervisor — competence concerns are investigated through the line, not by peers',
      'Report it anonymously to the HSE, since competence to work on electrical systems is a matter for them alone',
      'Say nothing, since questioning the safe isolation of a more senior colleague is not an apprentice responsibility',
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
      'The delivery driver only, asking them to return the three missing reels on their next site visit',
      'The wholesaler directly, signing the delivery note in full so that the driver is free to leave the site',
      'Your supervisor (who handles the supplier dispute) and note the shortage on the signed delivery note',
      'The site manager for the Principal Contractor, who owns the locked material store on the site',
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
      'Quietly put it right yourself before anyone else notices, so that it never becomes an issue for the job, for the paperwork or for your apprenticeship review',
      'Wait and see whether the circuit actually causes a problem in service before deciding whether the mistake is worth mentioning to your supervisor later on',
      'Leave it exactly as it is — if the circuit passed its initial verification tests then it must be acceptable and needs no further action from you now',
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
      'Lead the meeting, present the electrical programme and answer for their employer on progress',
      'Observe, take notes for their own learning, and contribute when asked — not negotiate with the client',
      'Negotiate variations and agree prices directly with the client to gain commercial experience early',
      'Take the official minutes and circulate them to every trade contractor working on the project',
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
      'Say nothing — the scaffold belongs to the main contractor, and an electrician has no standing to comment on the work of another trade',
      'Report it straight to the HSE before telling anyone on site, so that you are protected if there is an incident on the scaffold later',
      'Adjust the scaffold yourself so the hazard is removed before anyone can be hurt, then tell the main contractor what you have changed and why',
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
      'The HSE, who use the scheme assessment report as the basis for any enforcement action later taken against the registered contractor',
      'The customer whose installation was assessed, who receives the non-conformity list and sets the corrective action timescales for the firm',
      'Building Control, who hold the master record of every registered contractor assessment and all of the outcomes recorded there',
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
      'Carry on chasing carefully in a disposable dust mask to limit fibre exposure, then damp down and clear the debris before anyone else enters the room or the adjoining rooms',
      'Stop work immediately, isolate the area, tell the householder and your supervisor — Control of Asbestos Regs 2012 require a refurbishment/demolition survey before disturbing fabric',
      'Damp the area down thoroughly with water and bag the debris as you go, since wetting suppresses the fibres and makes it safe to finish the chase without a survey first',
      'Report it only to the HSE and wait for them to attend before doing anything else, since they are the enforcing authority for all licensed asbestos work in a domestic home',
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
      'Finish the job quickly so that you can leave the property, then mention how unwell you felt at the next morning briefing on site',
      'Wait until your scheduled lone-worker check-in time before saying anything to the office, so that you avoid raising a false alarm',
      'Stop work, contact your supervisor or office, leave site safely if able and follow the lone-worker check-in procedure',
      'Lie down somewhere quiet in the customer property until you feel well enough to carry on and finish the job on your own',
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
      'The valuation spreadsheet kept by the QS, which is taken as the definitive account of what happened',
      'The recollection of the client, who commissioned the variation and paid for the extra work',
      'The verbal account given by whichever operative happened to be working on site that day',
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
      'Confront the adult directly and ask them to explain their behaviour, then decide for yourself whether it is worth reporting to anyone on site',
      'Withdraw, tell your site manager and the school\'s Designated Safeguarding Lead — they decide next steps including any police involvement',
      'Call 999 immediately yourself before telling anyone on site, since every safeguarding concern in a school is a matter for the police and not the school',
      'Say nothing unless you actually witness an offence being committed, since reporting a suspicion about an adult could be unfair on them later',
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
      'Negotiate the commercial contracts and material prices for the firm on behalf of the members working on the site',
      'Carry out the site safety inductions for all new union members joining the project and keep the induction records',
      'Represent members in grievance and disciplinary matters and provide a confidential reporting/advice route',
      'Set and enforce the JIB grade pay rates that the employer is obliged to follow for each of its operatives',
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
      'Confront the colleague directly and demand that they return the tools before you tell anyone else in the company or on site',
      'Call the police yourself before telling anyone in the company, so that the evidence on the site is properly preserved for them',
      'Say nothing — without firm proof, raising it could expose you and the company to a defamation claim from the colleague',
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
      'The report is filed in the accident book and no further action is needed unless the same thing happens again',
      'The person who nearly got hit is given a verbal warning for being in the wrong place at the time',
      'The HSE issues an improvement notice setting out exactly which additional controls the site must put in place',
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
      'The HSE, who must receive a written progress report from the Principal Contractor at every stage of the construction phase',
      'The client (often via the contract administrator) — the client must satisfy themselves the project is being managed safely',
      'The Principal Designer, who continues to oversee and direct the works throughout the whole of the construction phase',
      'Nobody above them — the Principal Contractor is the top duty holder on the project once the construction phase has actually begun',
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
      'Drop it — once a supervisor has said not now, the matter is closed and should not be raised with anyone again for the rest of that job on site',
      'Go straight over the supervisor and take it to the contracts manager every time, without waiting for any reply from the supervisor first',
      'Document the report (time, who, what), follow up later in writing, and escalate one level up if it is a safety matter not addressed',
      'Sort the problem out themselves on the quiet rather than bothering the supervisor a second time about the very same issue on that job',
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
      'Wave them straight through — delivery drivers are exempt from the site sign-in and induction',
      'Have them give a full site induction to your own team before they start to unload the vehicle',
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
      'Let them wander the site freely so that they get a genuine feel for how the live works are going',
      'Arrange an escorted visit outside high-risk activities, with full PPE and a short induction',
      'Refuse any visit until the project is fully complete and handed over to the paying client',
      'Allow it as long as they sign a disclaimer accepting all of the risk for themselves',
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
      'The accident and incident report book',
      'Visitor sign-in / fire register',
      'The drawing issue and revision register',
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
      'Only a verbal description of the work — physical access to the first-fix cabling is not required at all',
      'The full set of priced quotations and the customer payment records for the whole of the contract',
      'The site welfare facilities and a copy of the construction phase plan to review in the office',
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
      'No — only HSE inspectors have any legal power to enter a construction or other work site without consent',
      'Only with a court warrant obtained in advance, never on an unannounced visit to site like this one',
      'No — Environmental Health Officers deal with food and housing matters and have no power of entry onto a construction site',
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
      'No — scheme assessors are technically competent people, so a site-specific induction would serve no real purpose here',
      'Yes — every visitor regardless of role gets a site-specific induction covering hazards, PPE, fire procedures and welfare',
      'No — they only review paperwork in the site office and never enter the working areas of the building itself',
      'Only if they intend to stay on site for more than one full working day or need to enter a live working area',
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
      'Answer all of their questions about the household fully and in detail, since you are legally required to co-operate with a police officer at any time',
      'Tell them to leave the property immediately and shut the door, as they have no right to be there without a warrant issued by a magistrates court',
      'Be polite and helpful, but tell them you cannot give access without the householder\'s permission and call your supervisor for guidance',
      'Give them access to the whole of the property so that they can complete their enquiry as quickly as possible and leave you to get on with the work',
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
      'Insurance — the insurer for the school will not cover any trade working on the occupied premises who has not been DBS-checked first',
      'Competence — a DBS check confirms that the worker is technically qualified for the electrical job they are sent to do',
      'Data protection — the check proves that the worker can be trusted with the pupil personal data that is held under UK GDPR',
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
      'Let them film freely — media crews carry their own public liability insurance and manage their own safety on site under their own written risk assessment and method statement',
      'Refuse all filming anywhere on the site, since recording a live construction site is never permitted under CDM 2015 or under standard construction insurance conditions',
      'Allow them in without an induction provided they wear their own hi-vis, hard hats and boots and stay close to the marketing team throughout the whole of the visit to site',
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
      'Nothing extra — regular drivers are known to the team, so they can come and go from the site freely',
      'Sign in, segregation check on skip contents, banksman for the lift if reversing into busy areas',
      'A fresh full site induction on every visit, identical to the one that a first-time visitor would receive',
      'A permit to work issued before the skip wagon is allowed in through the gate onto the site',
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
      'Let them visit whenever they like — as the future occupant of the property they have a right of access during the refurb works',
      'Refuse outright, since tenants have no involvement in the works at all until the refurb is fully handed over to the landlord',
      'Refer them to the client (the landlord) — access is the client\'s decision, not the contractor\'s; if agreed, escort and induct',
      'Give them a key so they can let themselves in and check on progress in their own time without troubling the site team',
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
      'Who is responsible for providing protective equipment to a visitor attending site?',
    options: [
      'Waived for short visits, since visitors are only on the site briefly and are rarely close to the working hazards',
      'A hard hat and nothing else — visitors do not need hi-vis or eye protection in the way that the workforce does',
      'Up to each visitor to decide for themselves, since they accept their own risk when they enter the site',
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
      'No — first-aiders responding to an incident are exempt from the site sign-in process',
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
      'Let them walk straight through to the apprentice unaccompanied, as they are a known professional visitor to the firm',
      'Treat as a visitor — sign in, brief on site rules, escorted access to the work area at a low-risk time',
      'Turn them away — college tutors have no right of access to a commercial construction site while work is going on',
      'Ask them to observe the apprentice from outside the perimeter fence, where no site induction is required',
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
      'Let them straight in — the client owns the project, so the normal site rules do not really apply to them',
      'Allow the walk-round in their business clothes provided they stay close behind you at all times on site',
      'Stop them at the gate, offer loan PPE, give the standard visitor induction, then escort — politely but firmly',
      'Ask them to wait in the site office until the day work is finished and the site is safe to enter',
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
      'Exempt from induction — manufacturer specialists are competent on their own equipment and carry their own written approvals',
      'Covered by the rules of their own employer only, so the main site induction does not apply to their visit at all',
      'Allowed to commission the switchgear without anyone on site reviewing their written method of work beforehand',
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
      'CDM 2015 Reg 15 — young persons must be appointed as Workers with full reporting duties to the Principal Contractor',
      'The Working Time Regulations 1998 — under-18s must opt out of the 48-hour working week in writing before starting',
      'PUWER 1998 Reg 9 — young persons may only use work equipment after a formal competence assessment on site',
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
      'Yes — anyone affected by the works counts as a site visitor under CDM 2015, so they must be signed into the register and given an induction before work continues nearby',
      'No, they\'re a member of the public — but HASAWA s.3 still requires you to manage the impact of your work on them; talk to them politely and adjust working methods if reasonable',
      'Yes — neighbours are owed a full site induction and a copy of the method statement before any work takes place close to their boundary, party wall or shared access way',
      'No, and you owe them no duty at all, since the work is being carried out entirely inside the customer property and not on theirs at any point during the whole of the job',
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
      'Give them immediate access to inspect the alleged defect so that the third-party claim can be settled quickly and cheaply for the firm involved',
      'Refuse to let them onto the site under any circumstances and ask them to leave the premises immediately without taking any of their details',
      'Refer them to the contractor\'s commercial/legal lead, take their details, and not give site access without authorisation from above',
      'Answer all of their questions about the alleged defect personally on site, to show that the firm has nothing at all to hide from the claim',
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
      'Only the standard construction PPE — infection control rules do not affect the electrical trades working on a healthcare estate',
      'A separate first-aid certificate for every operative who works in or passes through any of the clinical areas of the hospital site itself',
      'A DBS check in place of the normal PPE, since contact with the patients is the only real infection risk anywhere on the ward',
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
      'Reschedule the inspection until after handover, since a live construction site cannot reasonably be made accessible to a wheelchair user during the works',
      'Carry the visitor and their wheelchair over any obstacles on the route so that the inspection can go ahead as planned on the day without any delay at all',
      'Ask them to inspect only the ground-floor areas that happen to be step-free, and report the rest of the works to them by photograph and email afterwards',
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
      'Carry on working and ignore them, since the care home staff are the ones responsible for looking after their residents',
      'Make safe, calmly guide them out of the work area and contact the home\'s care staff — they manage resident welfare',
      'Take the resident back to their own room yourself before returning to the job that you were working on at the time',
      'Tell the resident firmly to leave the work area and then carry on with the live work straight away as originally planned',
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
      'Nothing beyond the normal site rules, since a drone survey is low-risk and needs no extra controls',
      'The insurance policy held by the operator alone, since a drone flight is entirely their responsibility',
      'CAA permissions, flight plan, exclusion zone for personnel beneath the flight path, RAMS for the operation',
      'A verbal warning to the team to look up during the flight, with no exclusion zone marked on site',
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
      'Carry on with the job as quickly as you can and avoid eye contact so as not to provoke the customer any further while you are in the property alone',
      'Try to calm the customer down yourself and talk them round before deciding for yourself whether it is safe to start the work that day at all',
      'Refuse to leave the property until the customer has paid you for the call-out attendance in full and in cash before you leave the site',
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
      'The IET On-Site Guide to BS 7671',
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
      'An Act of Parliament that is directly enforceable by HSE inspectors through the criminal courts in England and in Wales today',
      'A non-statutory British Standard that is widely cited and referenced by Approved Document P of the Building Regulations',
      'A statutory instrument made under the Electricity at Work Regulations 1989 and enforced directly by HSE inspectors',
      'A European directive that became UK law automatically on a fixed transition date after 2016 and still applies today',
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
      'Provide and pay for their own personal protective equipment before starting work on any new site',
      'Carry out a written risk assessment before starting any task on site, whatever the risk involved',
      'Take reasonable care for themselves and others, and co-operate with the employer on H&S',
      'Report all injuries and diseases directly to the HSE under RIDDOR within seven working days',
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
      'Live working is permitted only where a written permit-to-work has been issued first',
      'Every installation is tested and certified to BS 7671 before it is energised',
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
      'They must stop the activity immediately, because of the risk of serious personal injury',
      'They have a stated period (minimum 21 days) to put the breach right, with right of appeal',
      'They face an automatic unlimited fine with no opportunity to appeal against the notice',
      'They must close the whole of the site until an HSE inspector re-attends and lifts the notice',
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
      'The Manual Handling Operations Regulations 1992 (MHOR)',
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
      'Enforce a strict 25 kg maximum lifting limit for every worker on site, whatever the task or the posture involved',
      'Provide mechanical lifting aids for any load weighing more than 10 kg, whatever the situation and whatever the site',
      'Ban all manual lifting on site and require every load to be moved by machine or by a mechanical lifting aid',
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
      'The self-employed only, who previously had no PPE protection at all under the 1992 Regulations',
      'Members of the public who visit a workplace and may need protective equipment while they are on it',
      'Apprentices and young persons specifically, but not adult employees who are already covered',
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
      'Only fatal accidents and major fires on site, reported within 24 hours to the local authority for the area',
      'Every minor first-aid case on site, logged in the accident book but never sent anywhere outside the firm',
      'Specified injuries, over-7-day absences, occupational diseases and dangerous occurrences to the HSE',
      'All near-misses and unsafe site conditions, reported to the Principal Contractor at the end of each week',
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
      'Building Safety Regulator',
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
      'Removes all of the asbestos from the building before any trades are allowed onto the site',
      'Provides an asbestos register and a refurbishment/demolition survey identifying ACMs',
      'Notifies the HSE at least 14 days before any work starts in the building itself',
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
      'Ban all hazardous substances from the site and replace every one of them with a safe alternative before the work starts',
      'Keep a safety data sheet on file for each substance used on site but take no further action until an incident actually occurs',
      'Assess the risk from hazardous substances, prevent or control exposure, and provide info, instruction and training',
      'Provide respiratory PPE to every worker on the site, regardless of which of the substances are actually being used there',
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
      'Reviewed and re-signed by an HSE inspector before any high-risk work is allowed to begin on site',
      'Recorded in writing by every employer, no matter how few people they actually happen to employ',
      'Carried out only once at the start of the project and never revisited once the work begins',
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
      'A signed Electrical Installation Certificate before any cable is run on the site by the installer',
      'Verbal confirmation to the client that the design meets every BS 7671 requirement in full',
      'A periodic inspection notice fixed at the consumer unit on completion of the whole installation',
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
      'The Building Act 1984 (as amended)',
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
      'All commercial and industrial electrical installations right across England and Wales, without any exception',
      'Portable electrical appliances and the PAT testing of them in any type of building that is in daily use',
      'Fixed electrical installations in new and existing dwellings, and parts of buildings serving dwellings',
      'The structural fire safety of high-rise residential buildings, and nothing else in the Regulations',
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
      'After a minimum of 21 days, giving the employer the time needed to remedy the breach first',
      'Only once a magistrates court has confirmed the findings made by the inspector',
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
      'Appoint at least one fully qualified first-aider for every ten employees, on each site and in every single workplace',
      'Keep a fully stocked first-aid room at every single workplace, regardless of its size, its risk level or its layout',
      'Send any injured worker straight to hospital rather than treating them anywhere on the site or in the site office',
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
      'The safe use, maintenance and statutory inspection of all work equipment and machinery on site',
      'Workplace conditions: ventilation, temperature, lighting, cleanliness, welfare, traffic routes etc.',
      'The assessment and control of exposure to hazardous substances used at work by any employee',
      'The selection, provision and correct use of personal protective equipment for all workers',
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
      'Ensuring only that the workplace premises themselves are kept clean, tidy and free from obstruction throughout the working hours on site each day',
      'Reporting all employee injuries and diseases directly to the HSE under RIDDOR, which is the whole of the employer general duty to the staff on site',
      'Ensuring, so far as reasonably practicable, the H&S of all employees — including safe systems, training, premises and a written policy where 5+ employees',
      'Providing free personal protective equipment to anyone who enters the workplace, whether they are employed there or are simply visiting the site on business',
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
      'A fixed penalty notice of £5,000 issued on the spot, with no possibility of any imprisonment',
      'Only a written warning from the HSE, with prosecution reserved for any repeat breaches',
      'Automatic loss of the competent person scheme registration and nothing further',
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
      'Statutory law applies only to employers, while non-statutory standards apply only to employees and the self-employed working on the same site',
      'Statutory law is reviewed and reissued every year, whereas non-statutory standards never change at all once the standards body has published them',
      'Statutory law covers electrical work only, while non-statutory standards are what govern all of the other trades working in construction today',
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
      'Roof Access and Method Statements',
      'Reporting and Monitoring Standards',
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
      'A list of the hours worked by each operative on the job, used to calculate the weekly payroll run for the firm',
      'A schedule of the test results recorded against every circuit on completion of the electrical works on site',
      'A register tracking the current revision of every drawing that has been issued to the site for construction work',
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
      'Record who is on the site each day for the emergency fire roll-call at the site muster point',
      'Record hours worked against jobs/cost codes for payroll, invoicing and job profitability',
      'Log the defects found at handover so they can be put right before the final sign-off',
      'Track the sequence and duration of every activity on the project master programme',
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
      'Use the tower anyway, but stay below the level at which the missing guardrail would normally sit while you are working on it',
      'Fit any spare scaffold tube you can find as a temporary guardrail and carry on with the high-level work as planned that day',
      'Stop, report to the supervisor, and do not work at height until the tower is compliant or an alternative is in place',
      'Work from a stepladder alongside the tower instead, since the method statement is only guidance and not a binding instruction',
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
      'To record the test results and the inspection schedule for every circuit before the installation is energised and handed over',
      'To prove that every worker on site has been briefed on a specific safety topic before starting work on that particular day',
      'To track exactly who is on site at any time so that the fire roll-call at the muster point can be checked against it',
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
      'List the test results recorded against each circuit during the inspection and testing at completion',
      'Record the hours each operative works against the drawing numbers they were issued with',
      'Log every visitor who signs in at the gate before viewing the drawings in the site office',
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
      'Shows the exact physical dimensions and the layout of the installation, while the drawing lists all the materials in words, figures and quantities',
      'Describes performance, materials, finishes, standards and quality requirements in words; the drawing shows geometry and arrangement',
      'Always overrides the drawing wherever the two documents disagree, so the drawing can be ignored once the spec has been reissued to the site',
      'Is produced by the contractor on site during the construction works, while the drawing is always produced by the designer at tender stage',
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
      'A list of every hazardous substance brought onto site and its COSHH assessment sheet',
      'A schedule of the variations agreed with the client and the extra cost priced for each one',
      'A record of defects identified at handover that must be put right before final sign-off',
      'A register of the work activities planned for the coming one to four weeks of the site programme',
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
      'Start the extra socket straight away, since a verbal instruction from the customer is binding enough without any paperwork',
      'Note it in the site diary only, and then add the cost to the final account when the whole job is invoiced at completion',
      'Wait until the next monthly progress meeting to mention it before carrying out any of the additional work asked for',
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
      'Record on the timesheet the hours each operative worked so that the time spent at the briefing is paid at the right rate',
      'Log any near-misses raised by the team during the briefing so that they can be entered in the site accident book later',
      'Track who has signed in on site for the emergency fire roll-call at the designated muster point outside the gate',
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
      'The cost of each work activity and the running total spent against the budget by the month end',
      'Sequence and duration of each work activity, dependencies, milestones and the critical path',
      'The hazards and the control measures for every high-risk task listed on the project site',
      'The current revision of every drawing issued to the trades working on the site today',
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
      'Left until the next progress meeting so that the supervisor can decide whether it really needs fixing at all',
      'Recorded only if the customer notices it, and otherwise the work can be signed off exactly as it stands',
      'Recorded on the snag list, the cause investigated, fixed and re-tested before the work is signed off',
      'Reported straight to Building Control as a non-conformity before any repair is attempted on it',
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
      '12',
      '18',
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
      'The Building Control surveyor, who files them with the council\'s permanent records for that property address',
      'The end client at handover — they describe how to operate, maintain and find spares for the installation',
      'The wholesaler who supplied the equipment, for their own warranty, returns and their stock records',
      'The Principal Designer, who archives them alongside the pre-construction information for the project',
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
      'You have fully checked the quantity and the condition of the goods and accepted the delivery as correct in every respect at the site gate',
      'The supplier accepts full liability for any shortage or damage found at any later date, however long after the delivery was signed for on site',
      'You have not confirmed quantity or condition — protects against signing for items you haven\'t verified, but limits a later claim',
      'The delivery cannot be booked into the store or used on site until a second person has counter-signed the note and checked the contents',
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
      'Set out the commercial terms, the tendered prices and the payment schedule agreed with the client before work starts on site',
      'List the test results for every circuit recorded during the inspection and testing carried out at practical completion',
      'Record the hours each trade works on the project for payroll and for the monthly valuation of the works on site',
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
      'Only the name of the person responsible for the incident, so they can be held accountable by the firm afterwards',
      'The cost of the damage and who pays for it, but not the cause of the incident or the action taken afterwards',
      'A photograph of the scene alone, since the written detail can always be added afterwards if it is needed',
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
      'Where the specification and the drawing conflict, what should the electrician do before proceeding?',
    options: [
      'Always following the drawing, because it is the most detailed and the most visual of the three documents',
      'A precedence clause that ranks the documents (e.g. spec > drawings > BoQ) — read your contract',
      'Whichever of the three documents was issued most recently automatically taking priority over the other two',
      'Leaving the contractor to choose whichever interpretation is the cheapest and quickest to build',
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
      'The site diary, completed at the end of the shift by whoever was supervising the work and countersigned by the site manager at the end of that week',
      'The accident book, alongside any injuries or near-misses recorded at any point during that day\'s work on the site by the supervisor',
      'The toolbox talk register, signed by everyone who attended the safety briefing held at the start of that morning\'s shift before work began',
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
      'The Principal Contractor, once construction has started, as a written summary of the progress so far',
      'The HSE, who issue it to every notifiable project once the F10 notification has been submitted',
      'The winning contractor\'s quantity surveyor, who prepares it for the client\'s final account',
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
      'CDM 2015 requires it as part of the construction phase plan, which the Principal Contractor keeps on site throughout the works',
      'BS 7671 Part 6 requires it as evidence of compliance, and it forms part of the cert handed to the client per Reg 132.13',
      'It is needed only for the contractor\'s own site records and is never handed to the customer at the handover meeting',
      'The wholesaler requires it before they will honour the warranty on the cable and the accessories supplied to site',
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
      'Add the charger to the quote at no extra cost, to keep the customer happy on the day and to win the wider rewiring job when you deliver the quote tomorrow',
      'Tell the customer that it is too late to change anything at all now that the quote is already printed and being delivered to them the following day',
      'Acknowledge verbally, immediately confirm in writing as a variation with cost and time impact, and do not start until the variation is signed',
      'Fit the charger first and agree the price with the customer afterwards, once it is installed, commissioned and working properly on their vehicle',
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
      'Only a verbal explanation of what was done, with the certificate and the schedule of test results held back by the contractor until the invoice is paid',
      'A copy of the construction phase plan, the firm\'s health and safety policy and its public liability certificate for the customer\'s records',
      'An invoice and a receipt only, since the Electrical Installation Certificate is lodged with Building Control and is never issued to the householder',
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
      'Record the installation as satisfactory and list the C1 and C2 items as recommendations for improvement, so the landlord can let it at once',
      'Give a verbal summary of the worst faults only, and withhold the written report until the remedial work has been quoted for and paid for',
      'Send the coded report straight to the tenants and the local authority first, leaving the landlord to work out the coding themselves',
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
      'A single total figure and a start date, with the scope, exclusions and payment terms agreed verbally on the day',
      'Scope of work, what is and is not included, price (ex/inc VAT), payment terms, validity and any assumptions',
      'The contractor\'s health and safety policy, public liability cover and competent person scheme number',
      'A full schedule of test results, a schedule of inspections and the EIC for the proposed installation',
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
      'Use the full technical terms throughout, so that the customer learns the correct vocabulary for the fuseboard upgrade',
      'Skip the explanation entirely and leave them the written certificate pack and the manufacturer\'s leaflet to read',
      'Use plain English, short sentences, visual aids and check understanding by asking them to summarise back',
      'Ask a younger relative to take over the conversation so that you can get on with fitting the new consumer unit',
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
      'A written contract signed by both parties and witnessed before any work begins on the property',
      'A minimum 12-month guarantee on both labour and materials, fixed by statute for every job carried out',
      'Materials of the cheapest available grade, unless the customer pays extra for an upgrade',
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
      'The Consumer Rights Act 2015, which gives the customer a 30-day right to reject and cancel any signed quotation without giving the contractor a reason',
      'The Sale of Goods Act 1979, which sets a statutory 7-day cooling-off period on every contract agreed in the customer\'s own home or their workplace',
      'The Late Payment of Commercial Debts (Interest) Act 1998, which lets either party cancel within 14 days of signing the written agreement',
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
      'Consumer law requires every written quotation to state an expiry date before it can be legally accepted',
      'Material prices and labour rates change; an open-ended quote can leave the contractor on the hook for old prices',
      'It starts the 14-day statutory cancellation period running from the date the quote was issued to the customer',
      'Building Control will not accept a competent person notification unless the quote shows a validity date',
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
      'It means danger is present, so the affected circuit must be made safe immediately and the installation is recorded as unsatisfactory',
      'It means the installation is potentially dangerous, so urgent remedial work is needed before the report can be satisfactory',
      'It is an "improvement recommended" — the installation is not unsatisfactory because of it, but addressing it would improve safety',
      'It means further investigation is required without delay, and the report cannot be issued until that investigation is complete',
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
      'You may post or email the certificate to any address the customer mentions on the phone, since consent is implied by the fact that they asked for a copy of it',
      'You should copy the wholesaler, the manufacturer and the Building Control surveyor into the email so that every party holds a record of the certificate',
      'Certificates may never be emailed under UK GDPR, so they must be printed and handed over in person to the customer named on the contract at the property',
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
      'Rely on the verbal agreement, because a spoken promise to pay for completed work is fully binding and needs no written record at all',
      'Take a cash deposit up front, which removes the need to record the agreed payment terms anywhere on the quote or on the final invoice',
      'Leave the payment terms open on the quote and invoice whatever the job turns out to be worth once all the work is finished',
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
      'Retained by the contractor for their own records, with the customer given only a verbal confirmation that it has been notified',
      'Provided to the customer (paper or electronic), with the Building Control notification handled via your competent person scheme',
      'Sent to Building Control first, who then issue the completion certificate and forward the customer copy on your behalf',
      'Held back until the invoice is paid in full, then released to the customer along with the scheme notification number',
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
      'Agree to omit the RCDs and record the customer\'s instruction in writing, since the customer is fully entitled to accept the risk on their own domestic property',
      'Fit the RCD devices but leave them unconnected, so that the consumer unit still looks compliant and the customer gets the lower price that they asked for',
      'Decline politely, explain why RCD protection is required by BS 7671 (e.g. Reg 411.3.3 for socket-outlets ≤32A) and is not optional for compliant work',
      'Leave the RCDs out and record it on the certificate as a departure from BS 7671, which makes the reduced installation acceptable to sign off and hand over',
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
      'Leave the review unanswered but ask friends and family to post positive reviews so that the average star rating recovers',
      'Reply publicly disputing the customer\'s account point by point and set out the evidence from the file that shows they are wrong',
      'Ask the customer to take the review down before you will discuss the issue, then deal with the complaint privately',
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
      'The scope of work, the exclusions, the price, the payment terms and the validity period agreed with the customer on the quote',
      'The contractor\'s public liability cover, the limits that apply to any claim and the excess that the customer would have to pay',
      'The competent person scheme membership number, the warranty period offered and the complaints procedure to be used',
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
      'Only the final invoice and a receipt for the work, as the EIC, the schedule of test results and the manufacturer literature stay with the contractor as their record',
      'EIC, schedule of test results, schedule of inspections, manufacturer instructions for installed kit (CU, AFDDs, smoke alarms, EV charger if any), and user instructions',
      'The construction phase plan, the firm\'s health and safety policy statement and its risk assessments, which the developer passes on to the buyer on completion',
      'A verbal demonstration of the consumer unit and the smoke alarms only, since the developer always issues all of the written documentation to the buyer directly',
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
      'No copy needs to be given to tenants at all, as the landlord simply retains the EICR on file and produces it only if the local authority serves a formal written request on them under the Housing Act 2004',
      'A copy given to tenants only if they specifically ask for it in writing, and to the local authority only where an enforcement notice has already been served on the landlord for that particular rented property',
      'A copy of the EICR to be given to existing tenants within 28 days, new tenants before occupation, and to the local authority on request — Electrical Safety Standards in the Private Rented Sector Regs 2020',
      'A copy displayed in the property\'s communal area for tenants to read, with the original retained by the landlord and produced to the local authority at the next licensing inspection of the property',
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
      'A single line stating the outage window and a contact number, with the working method explained verbally to the client on the day itself',
      'A generic template covering all electrical work, reused unchanged for every job so that the wording stays consistent on every project',
      'The price, the duration and the isolation point only, since the working method is the contractor\'s own business and not the client\'s',
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
      'Once the work has been handed over and the final invoice paid, liability passes to the customer and no claim can be made against the contractor after that point',
      'Any defect appearing after handover is the customer\'s responsibility, because the Consumer Rights Act only covers the first 30 days after the work was completed on site',
      'Defects must be reported to Building Control, who then instruct a remedial contractor and recharge the cost of the repair to the original contractor instead',
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
      'The RCBO is simply over-sensitive and nuisance tripping, so we will replace it with a 100 mA device to keep the freezer circuit on',
      'It is doing its job — the freezer likely has earth leakage; explain we will investigate, and recommend repair/replacement of the appliance',
      'The consumer unit has been wired with a shared neutral between circuits, so we will rewire it and the freezer will then stop tripping',
      'The freezer is fine, so we will move it onto a dedicated circuit without RCD protection and the tripping will then stop for good',
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
      'Accept the cash and offer a discount on the labour in return, since work paid for in cash falls below the VAT threshold and needs no invoice or receipt',
      'Take the cash on the day and issue an invoice only if the customer later asks for one, keeping a note of the payment in your own job diary in the meantime',
      'Decline — provide a proper VAT invoice (or zero-VAT invoice if not registered) for tax compliance and to protect the customer\'s warranty rights',
      'Accept the cash without any paperwork at all, as how a customer chooses to pay is their decision and the certificate is the only record that anybody needs',
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
      'Hand over the invoice and the certificate only, since the manufacturer\'s app takes the customer through the commissioning steps and every setting on the charge point they are likely to use',
      'Leave the manufacturer guides and the certificate pack in the box for the customer to read through in their own time, and demonstrate the unit only if they specifically ask for it',
      'Give a brief verbal explanation of the on/off button only, as the certificate and the smart charge point regulations are matters for the installer alone rather than the customer',
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
      'A customer asks whether they need an EICR or a periodic inspection report. What should you explain?',
    options: [
      'They are the same product — EICR replaced the older "PIR" (periodic inspection report) terminology; explain politely',
      'A PIR is for new installations and an EICR is only for existing ones, so a new build needs a PIR before it can be occupied',
      'A PIR is a visual inspection only, while an EICR involves full dead and live testing of every circuit on site',
      'A PIR is issued by the landlord and an EICR by the electrician, so both of the documents are needed for a rented property',
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
      'Give a firm fixed price over the phone, since a verbal quotation only becomes binding once it is put in writing',
      'Give a rough indicator only, then follow up with a written, scoped quote — so both sides have the same understanding',
      'Refuse to give any figure at all until you have surveyed the property and seen the consumer unit and the wiring',
      'Quote the highest likely price verbally so there is room to come down when you issue the written quote',
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
      'Indefinitely, as once the data has been lawfully collected it may be retained forever in case the same customer returns for more work at a later date',
      'Exactly 12 months from the date shown on the report, after which UK GDPR requires the EICR to be deleted from all of your systems and backups',
      'Only as long as needed for the legitimate purpose — typically the EICR validity period plus a buffer for limitation/insurance reasons (often 6+ years)',
      'Until the next EICR is carried out, at which point the previous report must then be destroyed to avoid holding duplicate records of the same rented property',
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
      'To record the results of every test the company carries out, so that it can prove to an HSE inspector on request that all of its work meets BS 7671',
      'To list the prices the company charges for each type of electrical work it carries out, so that quotations stay consistent across the whole workforce',
      'To name the responsible person on site on each working day and set out the fire roll-call arrangements for the company\'s own office premises',
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
      'Random testing of the whole workforce every Friday afternoon, with a verbal warning for a first positive result only',
      'Testing of new starters at interview stage only, with no further screening at all once they have been employed',
      'Self-declaration by each worker at their induction, with the company taking no further action either way',
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
      'To set out the company\'s commitment to managing health and safety and its arrangements for site inductions and talks',
      'To set out how the company prevents discrimination and harassment based on the Equality Act 2010 protected characteristics',
      'To set out the pay rates, the bonus structure and the overtime rates offered to every employee on the same basis',
      'To set out how the company handles customer complaints and disputes fairly and consistently in each case raised',
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
      'The Health and Safety at Work etc. Act 1974 and the CDM Regulations 2015',
      'The Public Interest Disclosure Act 1998 whistleblowing code of practice',
      'The ACAS Code of Practice on Disciplinary and Grievance Procedures',
      'The Working Time Regulations 1998 and the ACAS guidance on rest breaks at work',
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
      'Health and Safety at Work etc. Act 1974 (HASAWA)',
      'Equality Act 2010 (protected characteristics)',
      'Data Protection Act 2018 (UK GDPR)',
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
      'Because they must sign it to confirm that they accept personal liability for any accident that happens to them on site',
      'Because it sets out the pay rates, the overtime arrangements and the travel allowances for their grade of apprentice',
      'Because reading it counts towards the off-the-job training hours recorded for their apprenticeship each week',
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
      'The Working Time Regulations 1998 and the unfair dismissal rules in the Employment Rights Act 1996',
      'The Public Interest Disclosure Act 1998 and the corporate hospitality rules of the Bribery Act 2010',
      'Equality Act 2010 ss.26-27 (harassment) and HASAWA (employer duty to protect health, including mental)',
      'The Consumer Rights Act 2015 and the special category rules in the Data Protection Act 2018',
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
      'The Equality Act 2010 and its statutory code',
      'The Bribery Act 2010 and PIDA 1998',
      'The Freedom of Information Act 2000',
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
      'Ban lone working entirely, requiring at least two operatives on every single job on the basis that HASAWA prohibits working alone in every case',
      'Apply only to apprentices and trainees, since qualified electricians are competent to work alone on any task without any further assessment at all',
      'Require every lone worker to hold a permit to work signed by the site manager before starting any activity, whatever the risk of the work involved',
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
      'Fuel allowances and the mileage rates paid to staff who use their own vehicles for work, since driving is already covered by road traffic law and its penalties',
      'Licence checks, insurance, MOT, vehicle inspection, mobile phone use, fatigue management — all part of the employer\'s duty under HASAWA s.3 to others',
      'Only the route planning and the delivery scheduling for the company\'s vans, since driver conduct on the road is a matter for the police alone to deal with',
      'The rules on the personal use of company vehicles outside of working hours and the tax treatment of that benefit in kind for the driver each year',
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
      'A single DBS check taken at recruitment, with no need for any further review once the worker has been taken on by the firm',
      'A signed declaration of good character from the worker, taken at face value on the day they are appointed to the role',
      'A formal qualification in the relevant trade, with past conduct playing no part in the decision to appoint them',
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
      'Using personal mobile phones on site for any purpose at all, including taking photographs of completed work for the job file',
      'Accessing the company email account from home, or from any personal device at all outside normal office hours',
      'Storing any customer data electronically, on the basis that records must be kept on paper in the office filing cabinet',
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
      'Post regularly about every job, including the property address, to build the company\'s online profile and win work from the neighbouring houses on the street',
      'Avoid identifying clients or live worksites without consent, no derogatory comments about colleagues/clients/competitors, and respect confidentiality',
      'Use only their own personal social accounts, so that the company can never be associated with anything they post about a job, a client or a competitor',
      'Tag the customer, the wholesaler and the manufacturer in every post to maximise the firm\'s own online reach and its ranking in the search results',
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
      'The HSE incident reporting line, which logs every wellbeing concern raised by a worker and passes it back to the employer',
      'The company\'s own occupational health department only, and with no signposting to any external charities or helplines',
      'EAP (Employee Assistance Programme), Lighthouse Construction Industry Charity helpline, Mind, Mates in Mind, and the GP route',
      'The trade union helpline, which is treated as the only confidential route that is open to employees under HASAWA',
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
      'The pay rate and the working hours alone, with all of the training arrangements handled separately by the training provider',
      'Only the qualifications to be achieved and the assessment dates, with no mention of pay, hours or conditions at all',
      'The employer\'s health and safety duties towards the apprentice while they are on site or travelling to and from it',
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
      'Issue a formal disciplinary warning covering the days of work that were missed, as the ACAS Code of Practice on discipline requires',
      'Deduct the days of sickness absence from the worker\'s holiday entitlement for the remainder of the current holiday leave year',
      'Require a doctor\'s fit note covering every single day of absence before the worker is allowed back on site or into the office',
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
      'A standard basic DBS check for the site supervisor only, with no safeguarding training for the rest of the team working on the site',
      'Enhanced DBS for staff, named safeguarding officer, training, and a clear route for reporting concerns about children/vulnerable adults',
      'A signed declaration from each worker confirming that they have no criminal record of any kind at all, checked once at recruitment and never again',
      'A blanket ban on speaking to any pupil on the premises, which removes the need for DBS checks on the workforce entirely, whatever the role',
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
      'The Fraud Act 2006, covering dishonest gain or a loss caused to another party',
      'The Modern Slavery Act 2015, requiring a transparency statement from big firms',
      'Bribery Act 2010 — strict-liability corporate offence of failing to prevent bribery',
      'The Proceeds of Crime Act 2002, covering money laundering and criminal property',
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
      'Handle every complaint verbally out on site, keeping no written record of it unless the customer specifically asks for one to be made in writing',
      'Refer every single complaint straight to the firm\'s solicitor before carrying out any internal review of the job, the paperwork or the certificates issued',
      'Offer the customer a full refund immediately so that the complaint goes away before it reaches the competent person scheme or an online review site',
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
      'Sending all site waste to landfill in a single mixed skip to keep collection costs down, since segregation of waste is the carrier\'s legal duty rather than the contractor\'s responsibility',
      'Disposing of old cable and redundant equipment by burning it on site, which saves on haulage costs and is permitted on private land where the client has given consent in writing',
      'Leaving waste management entirely to the client under the duty of care, as the contractor\'s only real environmental obligation is to leave the work area tidy at the end of each day',
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
      'Only the qualifications each worker held when they were first recruited and the dates on which they were awarded',
      'How competence is identified, gained, refreshed and recorded — supporting EAWR Reg 16 and HASAWA s.2(2)(c)',
      'The cost of every training course attended, for the firm\'s own accounts and its tax records each year',
      'The hours that each worker spends in training, used only for the off-the-job hours logged on an apprenticeship',
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
      'The pay arrangements, holiday entitlement and the pension details for the new starter\'s grade, and nothing further beyond that',
      'Only the technical detail of the first job the new starter will be working on, since everything else is picked up on the job later',
      'H&S basics, fire procedure, first aid, reporting routes, key policies (D&A, equality, IT, social media), site rules and named manager',
      'A tour of the office and an introduction to the team, leaving site-specific rules to be picked up on the job as they arise',
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
      'An employee from working anywhere in the electrical trade for a period of two years after they leave the company for any reason',
      'An employee from reporting any genuine wrongdoing to a regulator such as the HSE or to their competent person scheme',
      'An employee from taking annual leave during any period that the company has already declared to be a busy trading period',
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
      'A quick phone call, since it is faster and avoids putting the change on paper at all',
      'A WhatsApp voice note, so the tone of the request comes across clearly to the client',
      'A verbal chat out on site, with a handshake to confirm that both parties agree',
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
      'A full-day formal training course delivered off site by an external provider, ending with a written assessment paper and a certificate',
      'A short, focused safety briefing on a specific topic delivered to the work team — interactive, recorded with attendees signed in',
      'A one-to-one disciplinary meeting between a worker and their line manager about an unsafe act witnessed on site that day',
      'A written safety notice posted up on the site board for workers to read in their own time and sign at the end of the working week',
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
      'Written communication on paper',
      'Verbal communication by radio',
      'Non-verbal / visual communication',
      'Electronic communication',
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
      'For confirming a routine material order and delivery date with the wholesaler\'s trade counter staff',
      'For sending on a complex variation that affects the price and needs a clear written record',
      'For a quick reminder about tomorrow\'s start time that could just as easily wait until the morning',
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
      'Writing down every word the speaker says, so that there is a verbatim written record of the instruction afterwards on file',
      'Listening out only for the instructions that affect your own task and letting the rest of the briefing pass you by',
      'Waiting patiently for the speaker to finish so that you can give your own view on the job straight away instead',
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
      'A verbal instruction given to the site foreman by the architect at the weekly progress meeting',
      'A numbered written instruction (paper or electronic) issued by the contract administrator',
      'A note in the site diary recorded by whoever was supervising the works on that particular day',
      'A WhatsApp message from the client confirming the change that they want made on site',
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
      'A formal letter posted first class to the customer a week before the appointment',
      'A WhatsApp voice note left on the customer\'s phone the night before the visit',
      'A short SMS or email confirming time, address and any prep needed (parking, access)',
      'A phone call at 6am sharp to make sure that the customer is awake and ready',
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
      'Why should a supervisor deliver bad news about a programme face to face rather than by message?',
    options: [
      '7 seconds to make a first impression, 38 seconds to build rapport and 55 seconds to close the sale',
      '7 parts listening, 38 parts speaking and 55 parts writing in any good conversation on site',
      '7% eye contact, 38% gestures and 55% posture during any face-to-face customer briefing',
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
      'A group email to all parties, since it gives every trade exactly the same written information at the same time on the same day',
      'A WhatsApp group chat, so that the team can ask their questions in their own time over the first week or two of the works',
      'A phone call to each trade individually, so that every conversation stays private and focused on that trade and its own work',
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
      'It keeps a permanent written record of every message that can be checked back later if there is a dispute over the instructions that were given',
      'It allows fast, group communication in noisy/large environments where mobiles are unreliable; useful for banksman, lifts, emergencies',
      'It is the only means of communication permitted during any declared site emergency under the CDM Regulations 2015 on a notifiable site',
      'It is cheaper to run than mobile phones and so reduces the project\'s overall running costs for the contractor over a long project',
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
      'It keeps the handover deliberately brief so that the incoming shift can start work with the minimum of delay at the work face',
      'It is a legal requirement under the CDM Regulations 2015 for every single crew change on a notifiable construction project',
      'It structures a clinical/safety handover so nothing important is missed — increasingly used in construction safety briefings too',
      'It records the handover in writing so that it can be produced as evidence in a later contractual dispute with the client',
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
      'Sending customer addresses, phone numbers and EICR results, so that the whole team can see them without having to log into the office job management system',
      'Recording the formal variations to the price and the scope agreed verbally with the client during a site visit, so that the whole team can see them',
      'Issuing the official RAMS and the method statements for high-risk tasks to everyone on the job at the same time, in place of the formal site briefing',
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
      'Held in a classroom off site, lasting a full day and ending with a written test of the workers\' understanding',
      'Held only after an accident, to brief the team on what went wrong and what is changing as a result of the investigation',
      'Held once at the very start of the project and never repeated during the remainder of the construction phase',
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
      'CC the whole company on every single email so that nobody can later claim that they were not informed of a change to the programme, the design or the price',
      'Use clear subject lines, keep messages short, only CC people who need it, and avoid sending sensitive info as attachments without checking the recipient',
      'Write all of the important points in capitals so that the message stands out on the screen and is acted on ahead of the other messages sitting in the inbox',
      'Reply to every email within a few minutes of receiving it, even if that means sending an incomplete or unchecked answer straight back to the sender',
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
      'A successful project handover, to thank the whole team and formally close out the works on the site',
      'A change of shift, to brief the incoming crew on the tasks left over from the previous shift that day',
      'A serious incident or near-miss — work stops, the workforce is briefed on what happened and what changes',
      'A materials shortage, to decide how the team will work around the missing deliveries that week',
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
      'The area where the electrical services are located, separate from the building structure',
      'The part of the drawing that is still only provisional and not yet approved for construction on site',
      'The zone reserved for the client\'s own notes and comments on the issued drawing sheet',
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
      'A formal written request from the client to the contractor for a price for the additional work outside the original scope of the contract',
      'A formal complaint raised by a worker about their treatment at work, handled under the firm\'s own grievance procedure and the ACAS code',
      'A notice issued by Building Control requiring a defect to be corrected within a stated period of time before the works can continue',
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
      'What does a customer read from an electrician\'s body language during a briefing?',
    options: [
      'Crossed arms and minimal eye contact, to appear businesslike and professional throughout',
      'Open posture, eye contact, nodding to acknowledge, calm tone — encourages trust and openness',
      'Constant note-taking with your head down, to show the customer you are recording everything they say',
      'Standing as close as you possibly can to the customer to show confidence and authority throughout',
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
      'Replace the printed notice entirely, on the basis that everybody working on site now carries a smartphone that can read the code in a second',
      'Track who has read the notice by logging the identity of every single person who scans it, which satisfies the site record-keeping duty in full on its own',
      'Supplement the notice — e.g. linking to manufacturer instructions, full RAMS or O&M info — but the printed words should still cover the key safety message',
      'Lock the notice down so that only authorised staff are able to read the content, once they have scanned it with a company-issued device of their own',
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
      'The priced contract sum, the monthly payment schedule and the retention figures agreed between the client and the main contractor',
      'The personal details, the home addresses and the next-of-kin contacts of everyone currently working on the project for any trade on it',
      'The full set of the construction drawings at their current revision number, for any trade to consult or to take away with them',
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
      'Why is a voice message a poor way to issue an instruction that changes the scope of work?',
    options: [
      'Avoided for anything important — they are hard to search, share, transcribe and reference later; use written for record',
      'The best choice for important instructions, since they capture the tone of voice and so cannot be misread by the listener',
      'Legally binding as a record of instruction in exactly the same way as a written email from the client would be',
      'Preferred on site because they can be listened to over ear defenders and high background noise levels on a busy site',
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
      'Written communication, since it forms a permanent paper record of that tool\'s inspection and fault history over time',
      'Visual communication — instantly tells anyone who picks it up that the tool is out of service, with reason and date',
      'Verbal communication, as it relies on the last user telling the next user that it is faulty before they use it',
      'Electronic communication, as it sends an alert to the supervisor\'s phone whenever the tool fails its weekly inspection check',
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
      'A single long unbroken paragraph, so that the reader takes in the full picture of the week\'s progress in one go',
      'Bullet points with no headings and no dates, so that the report stays as short as it can possibly be to read',
      'Structured (sections: progress, programme, RFIs, variations, H&S incidents, look-ahead) so the reader can scan quickly',
      'Verbal at the weekly progress meeting only, with nothing written down or circulated to the wider project team',
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
      'Written communication, as it is a formal contractual record of the day\'s plan of work',
      'Verbal communication, as it relies on the supervisor reading it out to the team each morning',
      'Electronic communication, as it links directly to the project management software used in the office',
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
      'A group email sent to every worker on the site explaining the exact location and the nature of the fire',
      'A note pinned on the site notice board telling people what they should do in the event of an emergency on site',
      'A WhatsApp message sent to the whole team, so that everyone gets the alert on their own mobile phone',
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
      'Speak more loudly and much more slowly in English, repeating each step of the isolation procedure until they nod to show that they have understood',
      'Use plain English with a visual demonstration, ask them to demonstrate it back, and provide a written checklist (translated where possible)',
      'Hand them the written safe isolation procedure in English and let them read it through on their own before they start work on the job',
      'Tell them only to watch a qualified colleague carrying out the isolation first, and never to attempt the procedure for themselves at any point',
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
      'Excusing them from having to follow the written method statement at all, on the grounds that they cannot read it easily',
      'Printing the method statement in a much smaller font so that there is far less text on the page for them to work through',
      'Providing the MS in larger sans-serif font on cream paper, supplemented by a verbal walk-through and a labelled site sketch',
      'Moving them permanently onto tasks that need no method statement, so that the difficulty never arises for them',
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
      'A two-page method statement pinned up by the site entrance in eight-point print',
      'A single spoken briefing given to the first team on the opening morning of the project',
      'A QR code linking to a safety video, with no printed wording beside it',
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
      'Speak far more loudly than normal and exaggerate every mouth movement, on the basis that enough volume will carry the whole programme across without any written notes being needed',
      'Ask a hearing family member to relay the whole programme for you at the door, so that the visit can be run in exactly the same way as it would be run for any other customer',
      'Leave a long voicemail setting out the full programme and the daily start times, so that the customer can replay the message as often as they need to before the work starts',
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
      'They cost less to print than text-based signs, which brings the cost of setting up a site down',
      'They are internationally standardised so workers from any background can recognise the meaning instantly',
      'They are required on every construction site by CDM 2015 Reg 15, whatever hazards that site holds',
      'They survive outdoors far longer than printed wording, which fades within weeks in strong sunlight',
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
      'Excuse them from every verbal briefing and leave the written notes in their locker afterwards, with no further discussion',
      'Insist that they attend every verbal briefing exactly as the rest of the team does, so that nobody can claim favouritism',
      'Give them the written brief in advance, allow processing time, follow up one-to-one in a quiet area for questions',
      'Move them on to a different squad on another floor, so that they no longer have to attend a group briefing',
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
      'Customers who read English fluently and would simply rather be sent a shorter letter than usual',
      'Customers who are deaf and rely on a British Sign Language interpreter to follow conversation',
      'Customers who are blind and who use a screen reader to reach documents on screen',
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
      'Only profoundly deaf viewers, since anybody with any hearing at all can simply follow the spoken soundtrack of the video without a caption',
      'Viewers whose phone screen is too small for them to make out the wiring being demonstrated in the footage, rather than to hear the words',
      'People who have chosen to mute the training video at a shared desk, since captions are there purely for the convenience of that group',
    ],
    correctAnswer: 0,
    explanation:
      'Captions are an "asymmetric design" win — designed for one group, useful to many. Always caption training videos.',
    section: '5.3.2',
    difficulty: 'basic',
    topic: 'Accessible communication',
  },
  {
    id: 210,
    question:
      'A customer letter using technical jargon could be made more accessible by:',
    options: [
      'Adding more technical detail and quoting the full regulation numbers, so that the customer can see exactly which requirement each item was raised against',
      'Rewriting the trade terms in the formal wording used in BS 7671, so that no single sentence in the letter can be read in more than one way',
      'Replacing jargon with plain alternatives (e.g. "RCD" → "safety switch that cuts power if there\'s a fault"), short sentences, and a friendly closing',
      'Setting the whole letter in a smaller font so that it fits on to one side of paper, on the basis that a shorter-looking letter is less daunting',
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
      'Print every sign in bright fluorescent colour, so that each one stands out far more strongly from the painted wall behind it',
      'Make each sign considerably larger, so that the colour used on it can be picked out from a much greater distance away',
      'Replace all of the red and green signs with blue ones, since blue is the one colour that every worker on the site can tell apart',
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
      'Be delivered in spoken English only, since anybody working on a UK construction site is expected to understand spoken English already',
      'Be cut to the shortest possible running time by dropping the safety detail, so that the team lose the least time from the tools that day',
      'Rely on fast-paced narration throughout, so that the whole induction can be delivered in under five minutes for each new worker',
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
      'Post out the standard printed report and assume that a relative or a carer will read the findings out once the post arrives',
      'Provide a tagged accessible PDF (or large-print/braille if requested), an audio summary, and offer a verbal walk-through of any concerns',
      'Give a verbal summary of the findings on the day and keep no written version at all, so that nothing can be referred back to later',
      'Send a scanned image of the handwritten report, on the basis that a screen reader will interpret the picture and read the wording aloud',
    ],
    correctAnswer: 1,
    explanation:
      'Customer-led format. A tagged PDF works with screen readers; a verbal walk-through covers nuance. Equality Act 2010 reasonable adjustments duty applies.',
    section: '5.3.2',
    difficulty: 'advanced',
    topic: 'Accessible communication',
  },
  {
    id: 215,
    question:
      'A "teach-back" technique is when you:',
    options: [
      'Repeat the same instruction several times over until the listener stops asking you any questions about it',
      'Hand the listener a written copy of everything that you have just explained to them verbally',
      'Demonstrate the task slowly yourself while the listener stands and watches you work through each step',
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
      'Standard British Sign Language on its own, watched in exactly the way a deaf customer with full vision would watch it',
      'A large-print written schedule, which they can read for themselves using a magnifying glass and a bright desk lamp',
      'A hearing loop fitted in the room, which amplifies your voice enough for them to follow the whole conversation',
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
      'Be shouted over the machine noise so that the whole team can hear it without having to stop work',
      'Be moved to a quiet area, or use written/visual aids and confirm understanding individually',
      'Be kept very short, so that it is over before anybody on the floor needs to take out their ear defenders',
      'Be repeated several times on the workshop floor until everyone nods that they have understood',
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
      'Why are shorter sentences used when writing safety information for site?',
    options: [
      'Over 40 words — longer sentences carry more detail and cut the overall length of a document',
      'Exactly 30 words each time — a fixed length keeps a steady rhythm across the page',
      'Under 25 words (ideally 15-20) — shorter sentences are easier to process for everyone',
      'As short as possible, ideally 3-5 words — even where the meaning breaks down',
    ],
    correctAnswer: 2,
    explanation:
      'Plain English guidance: aim for 15-20 word sentences, max around 25. Long sentences slow comprehension for all readers — even the skilled.',
    section: '5.3.2',
    difficulty: 'intermediate',
    topic: 'Accessible communication',
  },
  {
    id: 220,
    question:
      'Why should a site briefing be written in short sentences and plain words?',
    options: [
      'A reading age of around 9-11 years has been quoted in industry research; brief accordingly',
      'A reading age of around 16-18 years is typical, so technical wording is no barrier on a site briefing',
      'A reading age of around 5-6 years is typical, so only pictures should be used on a site notice',
      'A reading age matching that of a university graduate, so trade jargon is perfectly safe to use',
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
      'Turn up at the property as planned and ask the customer to come out and meet you on the doorstep instead of going inside',
      'Phone ahead to discuss access — alternative meeting place, or use a portable ramp, or invite a family member as agreed with the customer',
      'Cancel the survey altogether, on the basis that a property with a step at the door cannot be assessed while the customer is there',
      'Lift the customer over the step yourself, so that the survey can go ahead exactly as it was planned for that particular morning',
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
      'What does a plain English review of a customer letter aim to achieve?',
    options: [
      'Free of any spelling or grammatical error, having been checked over line by line by a professional proofreader',
      'Compliant with the WCAG contrast and structure standards for use on a public-sector website or mobile app',
      'Written in plain English to a defined standard — used by some public bodies and consumer-facing firms',
      'Legally binding on both of the parties from the moment that the customer has signed and dated it',
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
      'Overhead lighting kept low throughout the meeting, so that the projector screen can be seen clearly by everybody',
      'A large table set between the two parties, so that the drawings and notes can be spread out during the audit',
      'Background music playing quietly in the room, to put everybody at ease and keep the meeting relaxed',
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
      'Hand them the full set of technical drawings and leave them to work out for themselves what each of the symbols on the sheet means',
      'Avoid showing them any drawing at all, on the basis that a domestic customer cannot be expected to read a technical drawing',
      'Explain every symbol on the drawing in turn, so that they understand the whole of the design before they sign it off at handover',
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
      'Every visitor who signs in at the site gate, whether or not they would need any assistance to leave the building in an evacuation',
      'Anyone who cannot evacuate without assistance — e.g. mobility-impaired visitors, people with conditions affecting evacuation',
      'Only the appointed fire marshals, who lead the evacuation and then sweep each floor of the building before they leave themselves',
      'Any worker who is carrying out hot works, confined space entry or another high-risk activity on the site during that shift of work',
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
      'Defend yourself firmly and set out, point by point, why every part of the work that you have done is correct and fully to the standard required',
      'Pack up your tools and leave the job there and then, without telling the customer or anybody back at the office what has happened',
      'Stay calm, listen to the specific complaint, acknowledge their frustration, and fetch your supervisor — document the interaction afterwards',
      'Promise the customer on the spot that a different electrician will be sent, so as to calm the situation before it escalates further',
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
      'Get your own containment into the riser first, so that the other trade has no choice but to fit their services around yours',
      'Down tools and refuse to carry on with the job until the other trade has cleared right out of the riser cupboard',
      'Report the other trade to the HSE for obstructing your access to the riser while the site is still live and running',
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
      'Laugh along with the jokes and add one or two of your own, so that you fit in with the rest of the team and nothing on the site is made awkward for anybody',
      'Make similar jokes back about the background of the colleague in front of the rest of the team, so that they can see for themselves how it feels from the other side',
      'Say nothing at all and keep out of their way on site, since making a formal complaint about it would only damage your own reputation with the firm in the long run',
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
      'Submit a claim directly to an employment tribunal, without ever raising the matter internally with your line manager or your employer',
      'Raise it informally with your line manager first, then in writing as a formal grievance per the company procedure (which should mirror the ACAS Code)',
      'Report the matter straight to the HSE, on the basis that the unfair treatment of workers is investigated as part of their enforcement role',
      'Resign immediately and claim constructive dismissal, which is treated as the correct first formal step in any case of unfair treatment',
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
      'Take the side of the client in front of the site manager, on the basis that the customer is always right whenever the price of a variation is being argued over on site',
      'Step in and offer your own opinion on what the variation ought to be worth, based on the hours that you have personally worked on that section of the job so far',
      'Stay out of the negotiation, carry on with your task, and let the supervisor and client resolve it — but record what you heard in case it\'s asked about later',
      'Leave the room straight away and say nothing about it to anybody afterwards, so that you cannot be drawn into the argument at a later point by either side',
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
      'Stand your ground and argue back firmly, so as to show the person that you are not going to be intimidated on their own doorstep or property',
      'Carry on working and hope that the person calms down of their own accord before the situation escalates into anything more serious on the job',
      'Try to remove the aggressor from the property yourself, so that the job can still be finished without a second visit being needed',
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
      'Differences in the pay rates between the trades, which the JIB grade structure is designed to settle before the work starts',
      'Disagreement over which trade chairs the daily morning briefing and sets the order of priorities for the site each day',
      'Personality clashes on their own, which have nothing at all to do with the work actually being carried out in the building',
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
      'Raising your own voice to match the volume of the customer, so that you are not talked over on their own doorstep',
      'Active listening with empathic acknowledgement — let them feel heard before trying to problem-solve',
      'Offering a discount on the invoice straight away, so that the complaint goes away as quickly as it possibly can',
      'Explaining in technical detail why the customer is wrong about the work that has been carried out so far',
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
      'A solicitor of their own choosing, who has an automatic statutory right to attend the grievance meeting and to speak at it',
      'A family member or a close friend, provided that the person chosen does not work for the company as well themselves',
      'A trade union rep or a work colleague at the grievance meeting (statutory right under the Employment Relations Act 1999)',
      'An ACAS conciliator, who by law must attend every formal grievance meeting that an employer holds with a worker',
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
      'Accept it as part of the trade, since apprentices have always been expected to take rough treatment on a site of this kind',
      'Shout back at the senior trade in front of the others, so that they learn the apprentice will not be pushed around like that on the job',
      'Say nothing at all, since raising it against a senior worker would only look like trouble-making to the firm and to the team',
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
      'Splitting the difference exactly down the middle, so that neither of the two sides ends up with anything like what they wanted from the final outcome',
      'Standing firm on your opening position until the other party gives way completely and accepts each of your own terms without amendment of any kind',
      'Letting the most senior person in the room decide the outcome, so that the dispute is brought to an end as quickly and with as little fuss as possible',
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
      'A customer complains about timekeeping on a job that is running to programme. What should be checked first?',
    options: [
      'Poor workmanship that the customer has only just noticed, now that the job has been finished and cleared away from site',
      'Lack of communication — the customer didn\'t know what was happening; reasonable updates would have prevented the complaint',
      'A dispute over the final price, which the customer has dressed up as a complaint about the timing of the work instead',
      'Unreasonable expectations on the part of the customer about how quickly electrical work can be carried out safely',
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
      'Step in between the two of them to separate them physically and bring the fight to an end straight away',
      'Film the fight on your phone, so that there is clear evidence of it available for the police',
      'Move to safety, call site management/999 if needed, and provide a written witness account afterwards',
      'Report it to the training provider assessor at their next visit rather than to anybody on the site that day',
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
      'Personal, collective, intentional, unintentional',
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
      'Threaten the manager back in front of the witnesses, so that they can see the behaviour will not be tolerated by the whole team',
      'Say nothing, since a site manager is entitled to speak to their own staff in whatever way they choose to on their own site',
      'Wait to see whether the manager offers an apology first, before deciding whether to take it any further with anybody else',
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
      'A formal grievance is raised, since ACAS early conciliation is designed to replace the internal grievance procedure of the company entirely',
      'An Employment Tribunal claim — early conciliation is mandatory under most claims (the EC certificate is required to lodge a claim)',
      'A disciplinary meeting, at which an ACAS officer chairs the hearing on behalf of the employer and then gives a ruling on it in writing',
      'A County Court claim for unpaid wages, which ACAS is required by statute to attempt to settle before it can be issued by the worker first',
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
      'Drop the price straight away to whatever figure the customer is demanding, so as to bring the argument to an end and keep their goodwill for the future',
      'Match the tone of the customer throughout, so that they realise you are not going to be talked down on the price you quoted on the original job',
      'Stay calm, restate the basis of the price (scope, time, materials), offer to revisit any specific item — and end the conversation if it stays abusive',
      'Refuse to discuss the price any further and walk off the job there and then, without giving the customer any explanation of the figures',
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
      'A concern that an employer raises about the conduct or the performance of an employee',
      'A dispute between two contractors over payment under a construction contract',
      'A complaint that a customer makes about the standard of the work received',
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
      'Tell your colleague to ignore the remarks and carry on working, since the neighbour is not the customer who is paying for this particular job of work',
      'Confront the neighbour directly and demand an apology from them in front of the customer before any more work is carried out that day on site',
      'Say nothing about it, on the basis that remarks made by a neighbour are nothing to do with the contractor carrying out the work at the property',
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
      'Whichever of the two colleagues holds the more senior grade decides which approach is used on the job',
      'Refer to the spec/drawings/BS 7671 — the standards arbitrate; if still unclear, raise an RFI to the designer',
      'Both carry on with their own approach and see which of the two circuits passes its testing afterwards',
      'The supervisor picks whichever of the two approaches is the cheaper one, so as to keep the job costs down',
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
      'A binding ruling imposed on both of the parties by an independent legal adjudicator whom the employer has appointed and paid',
      'A formal investigation carried out by the employer before any disciplinary hearing can be held on the matter at all',
      'A facilitated conversation between disputing parties, led by a trained neutral, aimed at reaching a voluntary resolution',
      'A tribunal hearing at which a judge decides the outcome of the workplace dispute for both of the parties without their agreement',
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
      'An employment tribunal, since a deduction from money owed is treated as an unlawful deduction from wages under the Employment Rights Act and not in court',
      'ACAS early conciliation, which is treated as a mandatory first step before any commercial dispute can be heard anywhere else in this country',
      'A grievance raised under the ACAS Code with the HR department of the main contractor, in writing, within fourteen days of the deduction being applied',
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
      'Take the phone off the teenager and delete the video from it yourself, before the footage can be spread any further online or shared again',
      'Call the police immediately, since filming a worker without their consent is a criminal offence under the UK GDPR in a private home',
      'Post your own video of the job on the social media page of the firm, so that your side of the story is out there for customers to see',
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
      'A colleague argues hard over every disagreement. How do you work with them productively?',
    options: [
      'Push back just as hard on every single point that they raise, so that they learn to back down whenever you are anywhere around on the job in future',
      'Stay factual, document agreements in writing, don\'t take it personally, and engage your supervisor early if it affects safety or the work',
      'Avoid them completely and refuse to work alongside them on any task at all for the remainder of the project on that site or on the next one',
      'Always give way to keep the peace, even where you are quite certain that your own approach is the technically correct one for the installation',
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
      'The HSE alone, who take on every concern that a union member raises about their own workplace safety',
      'An employment tribunal directly, bypassing the internal grievance procedure of the company entirely',
      'The union representative — confidential parallel route alongside the company\'s own grievance procedure',
      'The site manager of the Principal Contractor, who must settle every concern a union member raises on site',
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
      'A short delay only, since the second electrician will always re-test the circuit before starting work on it',
      'Damage to the test instrument, if both electricians lock off the very same circuit at the same time',
      'A pay dispute between the two electricians over which of them completed the isolation first',
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
      'Improved technical quality, as the team then focuses harder on the standard of the work itself on site',
      'Reputation damage, negative reviews, lost repeat work and increased complaint handling cost',
      'Lower material costs, because fewer customer meetings mean less time is spent out on quoting for work',
      'No lasting effect, since customers judge a contractor only on the finished result they can see',
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
      'A modest saving overall, since the electrical contractor can simply use the free time on another job elsewhere that week instead',
      'A safety improvement, because the team is then left with far more time to plan the work out properly with the supervisor beforehand',
      'Wasted attendance (van and labour mobilised for nothing), abortive material drops and a knock-on delay claim against the main contractor',
      'No real impact at all, as the main contractor absorbs every programme change and the costs of it under the main contract',
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
      'A deduction from the wages of the worker, to cover any damage that the hazard goes on to cause to the installation itself',
      'Loss of the competent person scheme registration of the firm, which is the only real consequence in practice for the firm',
      'A verbal warning from the site manager, recorded on the personnel file of the worker for twelve months only',
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
    id: 257,
    question:
      'A "knock-on" delay caused by poor comms with one trade can affect:',
    options: [
      'Only the trade that actually caused the delay, with no effect at all on any of the other trades working on the site that week',
      'The whole programme — successor trades cannot start, scaffold may be retained, plant hire is extended; the cumulative cost grows fast',
      'The project budget alone, since a delay of this kind is purely a commercial matter rather than a programming one for the team',
      'Nothing beyond that single day, as each trade simply makes the lost time up over the next morning on the programme instead',
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
      'No consequence at all, since a verbal instruction given by a customer is fully binding on both of the parties in law once given',
      'An automatic breach of UK GDPR, for failing to hold a written record of the request that the customer has made in person',
      'A "your word against theirs" dispute about scope and price — usually resolved in the customer\'s favour with no record',
      'An HSE investigation, since an undocumented instruction is a health and safety failing in its own right on a construction site',
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
      'A failed Building Control inspection only, with no real risk at all to anybody who works on that board at a later date in the future',
      'Confusion for the customer when reading across the board, but no safety consequence for anyone working on it at a later date',
      'A delay at the next periodic inspection, while the labelling is put right before testing can start on the installation',
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
      'Workers completing the task more quickly, since less detail on paper means fewer steps to follow',
      'A delay only, while the document is rewritten, with no real safety consequence at all',
      'An automatic HSE prosecution of the author from the moment the document is issued',
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
      'No impact at all, because the QS picks up every variation from the marked-up drawings on file at valuation time',
      'Variations missed from the next valuation — cash-flow strain on the contractor and arguments at final account',
      'A health and safety breach, since every variation on a job must be reported under the CDM Regulations 2015 in writing',
      'A delay to the programme only, with no effect at all on the cash flow position of the contractor in that month',
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
      'No consequence, as one missed toolbox talk makes very little difference to an experienced worker who knows the job',
      'A deduction from the pay of the worker for the time that the safety briefing would have taken to deliver on site',
      'Working without the latest safety briefing — and the firm cannot evidence training under HASAWA s.2(2)(c) for that worker',
      'An automatic RIDDOR report to the HSE for the missed safety communication on that particular job that week',
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
      'Which contractor behaviour most directly changes what a customer says about them afterwards?',
    options: [
      'The exact test results that are written on to the installation certificate once the whole job has been completed and handed over',
      'The brand of consumer unit and the range of accessories that the contractor has chosen to fit in the property and in the outbuildings',
      'The qualifications and the scheme registrations that each of the individual electricians on the job holds at the time',
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
      'A faster handover, since the customer is then left with far less paperwork to read through on the day of completion',
      'No consequence, as every certificate is held on the internal system of the contractor for years afterwards anyway',
      'An immediate fine from the HSE for failing to issue the installation certificate to the customer on time',
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
      'A delay only, while the paperwork is brought back up to date before work resumes on the site that day',
      'The same near-miss recurring — possibly with worse outcome — because the controls weren\'t shared or tightened',
      'A reduction in the pay of the team for failing to keep the site documents up to date between visits',
      'No effect at all, since the near-miss did not actually injure anybody on the day that it happened',
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
      'The wholesaler, who is responsible for clarifying any ambiguous order with the buyer before it is despatched from the counter',
      'The customer, since the materials are ultimately being installed in their own property for their own use in the end',
      'Whoever placed the unclear order — the contractor pays for return restock fees and the impact on the day\'s work',
      'Nobody at all, because a wholesaler will always exchange wrongly supplied goods free of any charge to the trade account',
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
      'What effect does a pattern of poor communication have on a contractor\'s ability to keep staff?',
    options: [
      'Lower running costs, because far less of the week is then spent in meetings and formal briefings on the site',
      'A more independent workforce, which solves problems on its own without waiting to be told what to do',
      'Faster decision-making, since fewer people are consulted before work is allowed to go ahead on site',
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
      'A safer installation, because a simpler price always means a simpler scope of works out on the site for the team to fit',
      'No real impact, since any items missed can simply be added later as paid variations to the contract at cost',
      'A faster quote that wins more work, by undercutting the competition on price nearly every time it is sent',
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
      'Faster independence, since apprentices learn best when they are left to work things out entirely on their own on site',
      'Slower skill development, repeated errors and disengagement — feedback is what turns experience into competence',
      'No effect at all, because apprentices pick the skills up naturally by watching the rest of the team at work each day',
      'A breach of the apprenticeship agreement, which the training provider is then obliged to report on to the employer',
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
      'A short delay only, while the worker is sent off to be checked over by an occupational doctor that week',
      'A fine for the worker who entered the area without first checking the asbestos register for the building',
      'Long-term occupational disease (mesothelioma) decades later — and a major civil liability claim against the firm',
      'No consequence at all, provided that the worker wore a standard dust mask while in the area that day',
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
      'RIDDOR 2013 alone, since every near-miss on site has to be reported directly to the HSE within ten working days of it happening',
      'The Consumer Rights Act 2015, because a near-miss on site affects the quality of the work being carried out there',
      'UK GDPR, since failing to record an incident properly is a personal data processing failure in its own right under the Act',
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
      'Overlook the poor communication entirely, provided that the finished work is to a high enough standard in the end',
      'Recommend the contractor to friends, because the job was finished on the date first promised at the outset',
      'Pay more readily, since a quiet job with no updates feels efficient from the customer side of things',
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
      'A minor issue that the next revision of the drawing will quietly correct without any rework',
      'Communication failure that leads to rework — the controlled drawing register exists exactly to prevent this',
      'A design error by the architect, for which the contractor cannot be held responsible at all',
      'A health and safety breach reportable to the HSE under the CDM Regulations 2015 within days',
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
      'A faster start on site, since the new starter can then get straight on to the tools on their very first morning without an induction',
      'No real issue at all, as a new starter soon picks the reporting routes up from colleagues in the first week or so on the job without help',
      'Hazards going unreported, isolation of the new starter, and slower integration into the team — a missed induction is a real cost',
      'An automatic HSE prosecution the moment that an uninducted worker steps on to a live construction site anywhere in the country at all',
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
      'Which measurable outcome improves on a site where information is passed on reliably?',
    options: [
      'Higher material costs, since far more of the working day is then spent briefing the team rather than fitting anything in the working week on site',
      'Longer working days, because every hour that is spent communicating on site is an hour taken away from being on the tools each day',
      'More paperwork for everybody working on the site, which slows the overall pace of the work right across the whole project each week',
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
      'Prepare the construction phase plan and keep it up to date throughout the works, then hand it to the Principal Designer at completion of the project',
      'Carry out the risk assessments for the whole of the site and brief every other trade on the findings before any work begins each morning',
      'Appoint the Principal Designer and issue the pre-construction information to everyone bidding for the electrical package on the job itself',
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
      'Share them freely with anybody who asks for a copy, on the basis that a completed certificate becomes a public document once it has been lodged with the scheme provider and with Building Control by the contractor who issued it',
      'Process them only for the agreed purpose (the cert), store them securely, share only with parties who need them (e.g. landlord, scheme provider), and have a privacy notice telling the customer what you do with their data',
      'Delete them as soon as the job has been paid for, since the storage limitation principle in the UK GDPR means that you no longer have any legitimate need to hold the data once the invoice has been settled in full by the customer',
      'Keep them indefinitely on a shared drive so that the whole team can reach them at any time, on the basis that data held for genuine business purposes is exempt from the storage limitation principle that the UK GDPR sets out',
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
      'The HSE incident line, which logs every mental health concern that a worker raises about their workplace',
      'The occupational health department of their employer, which is the only confidential route open to them',
      'The Lighthouse Construction Industry Charity (helpline 0345 605 1956) and apps such as the Lighthouse Helpline app',
      'The local job centre, which signposts construction workers to mental health services free of charge',
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
      'A notice giving the date of the next periodic inspection and the name of the inspector who carried it out',
      'A notice warning that more than one source of supply is present in the installation itself',
      'A notice indicating that a single switch does not isolate all of the live conductors of the circuit',
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
      'Industrial premises that have their own on-site maintenance team and a responsible electrical engineer on the staff full time',
      'Installations protected throughout by AFDDs, where the periodic notice is no longer required to be fitted at the origin at all',
      'Commercial premises that are inspected more often than once every five years by a competent person under contract',
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
      'Any personal grievance that a worker has about their own pay, hours or working conditions, once it has been raised in writing with the employer',
      'A relevant failure (criminal offence, breach of legal obligation, miscarriage of justice, danger to H&S, environmental damage, or cover-up of the above)',
      'A complaint about the conduct of a colleague that the worker personally finds annoying or unprofessional and reports to a manager on site',
      'A disagreement with management about the way the company ought to be run commercially, raised at a formal team meeting by a worker on the job',
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
      'Ordinary unfair dismissal, but only after completing two full years of continuous service with the employer',
      'Wrongful dismissal, limited to the notice pay that they were contractually owed under their contract',
      'Automatically unfair dismissal — no qualifying period applies and uncapped compensation may follow',
      'No claim at all, since a protected disclosure cannot prevent a fair redundancy from going ahead anyway',
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
      'Only a person who has completed medical treatment and obtained a Gender Recognition Certificate, since the characteristic depends on the legal change being fully complete first',
      'A person who has legally changed their name and updated every official document held by the employer, since the protection follows the paperwork rather than the person',
      'A person who is currently undergoing surgical treatment, but nobody before that stage of the process has begun and nobody at all once it has been completed by the surgeon',
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
      'A physical impairment that is visible to other people and that a doctor has confirmed in writing on a fit note for the employer to see',
      'Any short-term illness or injury that stops a person from carrying out their normal day-to-day work for more than a week or two at a stretch in a year',
      'A condition that means the person is registered as disabled with their local authority and holds a blue badge for parking at their home',
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
      'Only the major established religions that have been recognised for centuries, with no protection at all for minority faiths, for newer belief systems or for a lack of belief',
      'Religion and any religious or philosophical belief (including a lack of belief) — recognised philosophical beliefs include ethical veganism and gender-critical belief',
      'Religious belief itself only, with philosophical beliefs and political beliefs both specifically excluded from the protection that the Act gives a worker at work or on site',
      'A belief held by someone who actively practises it in their daily life and who attends a recognised place of worship on a regular weekly basis with the rest of their family',
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
      'Only employers with five or more employees, mirroring the written health and safety policy threshold in HASAWA',
      'Large unionised firms, where a trade union is formally recognised for collective bargaining on pay and hours',
      'Public-sector employers, leaving private contractors free to set their own procedures on grievances',
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
    id: 290,
    question:
      'Under UK GDPR, the lawful basis most commonly relied on for processing customer data on a contracting job is:',
    options: [
      'Consent — the customer has to tick a box agreeing to every separate use that you make of their personal data on the job',
      'Legal obligation — a statute requires the data to be processed before any of the electrical work can be carried out on the property',
      'Contract — processing necessary for the performance of the contract (or to take pre-contract steps at the customer\'s request)',
      'Vital interests — the processing is necessary in order to protect the life or the physical safety of somebody who is on the site',
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
      '24 hours of awareness, where the breach is likely to result in a risk to the individuals',
      '7 days of awareness, where the breach is likely to result in a risk to the individuals',
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
      'Injuries serious enough to need hospital treatment, which the employer then reports on to the HSE under RIDDOR 2013 within ten working days',
      'Only defects in the equipment that they are personally using on that particular task, reported to the site storeman at the end of the shift',
      'Hazards that fall within their own trade, leaving each of the other trades on site to report the hazards that they see for themselves',
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
      'An earthing or a main protective bonding connection is made, with the warning notice fixed at or near that connection point in a visible position',
      'An installation includes alternative or additional sources of supply (e.g. PV, battery, generator) — at the origin and at certain other points',
      'A single isolation device does not disconnect all of the live conductors of a circuit or of an item of fixed equipment in the installation itself',
      'An installation is due for its next periodic inspection and test, with the notice giving the date on which it falls due for the customer to see',
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
      '72 hours (extendable to one week for complex requests if the data subject is told about the extension within the first 24 hours)',
      '14 days (extendable to 28 days for complex requests if the data subject is told about the extension within that time)',
      'One month (extendable to three months for complex requests if the data subject is told of the extension within the first month)',
      'Six months (extendable to one year for complex requests if the data subject is told of the extension within the month)',
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
      'The national media in the first instance, so as to ensure that the wrongdoing is made public straight away and cannot be buried by anybody',
      'A solicitor alone, who must then lodge the disclosure with the employer on behalf of the worker and in writing within a month',
      'A trade union representative, who is treated as the only protected route for making a disclosure under PIDA by any union member',
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
      'Anyone in a long-term relationship, whether they are married, in a civil partnership or living together as a couple at the time',
      'Married couples alone, with civil partners protected instead under a separate characteristic of their own in the same Act',
      'Anyone who is planning to marry, but not those who are already married or who are in a civil partnership at the time of a claim',
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
      'Where can a worker in construction get free confidential mental health support at any hour?',
    options: [
      '999',
      '116 123',
      '101',
      '0345 605 1956',
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
      'Earthing — to identify the main earthing terminal and the protective bonding connections in the installation itself',
      'Periodic inspection — to state the date on which the next inspection and test of the installation are due to be done',
      'Alternative supplies — to warn that more than one source of supply is present in the building on site',
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
      'A single annual wellbeing poster displayed on the site notice board, with everything else left to the individual workers to sort out for themselves in their own time',
      'A policy that tells struggling workers to keep their personal problems well away from the workplace, so that the job itself is never affected by them in any way at all',
      'Random testing for stress on site each month, together with a disciplinary process for anyone who is found to be struggling to cope with the demands of the job',
    ],
    correctAnswer: 0,
    explanation:
      'Layered wellbeing: trained MHFAs, EAP access, signposting (Lighthouse 0345 605 1956 / Mind 0300 123 3393 / Mates in Mind / Samaritans 116 123), toolbox talks, and a culture where speaking up is safe.',
    section: '5.X.1',
    difficulty: 'basic',
    topic: 'Mental health & wellbeing',
  },
  {
    id: 301,
    question: 'Who is responsible for providing protective equipment to a visitor attending an active site?',
    options: [
      'The organisation hosting the visit',
      'The visitor\'s own employer',
      'The trade working nearest to the visit',
      'The client who commissioned the project',
    ],
    correctAnswer: 0,
    explanation: 'Whoever invites a visitor onto site has to make sure they can be there safely, which includes issuing the protective equipment the site requires. The visitor\'s employer is the tempting answer because they equip their own staff, but a visitor arriving at another firm\'s site cannot be relied on to bring it.',
    section: '5.1.3',
    difficulty: 'basic',
    topic: 'Site visitors',
  },
  {
    id: 302,
    question: 'What does a drawing marked \'preliminary\' mean for the electrician holding it?',
    options: [
      'It shows only electrical services',
      'It must not be used to build from',
      'It has been checked by building control',
      'It replaces the previous revision issued',
    ],
    correctAnswer: 1,
    explanation: 'Only drawings issued for construction carry the authority to install from, and building from a preliminary issue means installing something that is still being changed. Assuming it supersedes the last revision is the tempting error, because a preliminary drawing may be issued alongside a current construction one.',
    section: '5.2.2',
    difficulty: 'basic',
    topic: 'Workplace information',
  },
  {
    id: 303,
    question: 'Why must a verbal instruction that adds work be confirmed in writing?',
    options: [
      'So building control can be told about it',
      'So the customer can cancel it within days',
      'So there is a record of what was agreed',
      'So the supervisor can check the pricing',
    ],
    correctAnswer: 2,
    explanation: 'When a bill is questioned months later, the written confirmation is the only thing that shows what was asked for and accepted. Supervisor checking is the tempting answer because approval often does follow, but the confirmation exists to record the agreement rather than to route it for approval.',
    section: '5.3.1',
    difficulty: 'basic',
    topic: 'Communication methods',
  },
  {
    id: 304,
    question: 'What is the purpose of a company health and safety policy statement?',
    options: [
      'To satisfy the insurer at renewal',
      'To list the hazards present on each site',
      'To record the training every employee holds',
      'To set out how safety will be managed',
    ],
    correctAnswer: 3,
    explanation: 'The statement sets out the organisation\'s intentions, who is responsible for what, and the arrangements for delivering it. Listing site hazards is the tempting answer because it sounds like safety, but that belongs in the risk assessment for the particular job.',
    section: '5.2.4',
    difficulty: 'basic',
    topic: 'Company policies',
  },
  {
    id: 305,
    question: 'A colleague\'s first language is not English. What is the first step before briefing them on an isolation procedure?',
    options: [
      'Check how well they follow spoken English',
      'Hand them a written copy to read alone',
      'Ask another operative to do the work',
      'Speak more loudly and more slowly',
    ],
    correctAnswer: 0,
    explanation: 'You cannot choose how to communicate until you know what the person actually understands, so the check comes before the briefing. Speaking louder is the tempting answer because it feels helpful, but volume does nothing for someone who does not know the words.',
    section: '5.3.2',
    difficulty: 'basic',
    topic: 'Accessible communication',
  },
  {
    id: 306,
    question: 'Two trades need the same riser at the same time. What should happen first?',
    options: [
      'The trade that arrived first carries on working',
      'Both raise it with the site programme holder',
      'Each trade works around the other as best it can',
      'The apprentice decides who has the greater need',
    ],
    correctAnswer: 1,
    explanation: 'A clash between trades is a sequencing problem, and whoever holds the programme is the person who can resequence it. Letting the first arrival continue is the tempting answer because it seems fair, but it settles nothing about who goes next and the clash recurs.',
    section: '5.3.3',
    difficulty: 'basic',
    topic: 'Conflict',
  },
  {
    id: 307,
    question: 'What must a customer be given so they can operate what has been installed?',
    options: [
      'The names of the operatives who fitted it',
      'The test results recorded during commissioning',
      'Instructions for the equipment and its controls',
      'A copy of the contractor\'s insurance schedule',
    ],
    correctAnswer: 2,
    explanation: 'Operating information is what turns installed equipment into something the customer can actually use and look after. Test results are the tempting answer because they are handed over too, but they evidence compliance rather than explain operation.',
    section: '5.2.3',
    difficulty: 'basic',
    topic: 'Customer information',
  },
  {
    id: 308,
    question: 'Who enforces health and safety law on a construction site?',
    options: [
      'The principal contractor\'s own auditors',
      'The local authority environmental team',
      'The client\'s safety advisor',
      'The Health and Safety Executive',
    ],
    correctAnswer: 3,
    explanation: 'Construction is enforced by the national regulator, while local authorities enforce in premises such as shops and offices. The site safety advisor is the tempting answer because they inspect and issue findings, but they act for the business rather than as an enforcing authority.',
    section: '5.2.1',
    difficulty: 'basic',
    topic: 'Statutory legislation',
  },
  {
    id: 309,
    question: 'An apprentice cannot reach their supervisor and a decision is needed before work continues. What should they do?',
    options: [
      'Stop and escalate to the next person up',
      'Use their own judgement and press on',
      'Ask the nearest operative from another trade',
      'Wait until the supervisor returns tomorrow',
    ],
    correctAnswer: 0,
    explanation: 'Stopping costs an hour, and escalating gets an authorised decision from someone who can give one. Asking another trade is the tempting answer because they are on hand, but they carry no responsibility for the apprentice or for electrical work.',
    section: '5.1.2',
    difficulty: 'basic',
    topic: 'Reporting lines',
  },
  {
    id: 310,
    question: 'What is the effect of poor labelling at a consumer unit on the next person to work there?',
    options: [
      'They cannot record the results of their tests',
      'They cannot identify what they are isolating',
      'They cannot issue a certificate for the work',
      'They cannot confirm the earthing arrangement',
    ],
    correctAnswer: 1,
    explanation: 'Labelling is how one electrician tells the next which circuit is which, and without it every isolation becomes guesswork. Being unable to certify is the tempting answer because certification does record circuit details, but the immediate consequence is a safety one.',
    section: '5.3.4',
    difficulty: 'basic',
    topic: 'Effects of poor communication',
  },
  {
    id: 311,
    question: 'Who may authorise the issue of a permit to work on a site with a permit system?',
    options: [
      'Any operative competent for the task',
      'Any supervisor present in the work area',
      'Only the person appointed to that duty',
      'The client\'s representative on request',
    ],
    correctAnswer: 2,
    explanation: 'A permit system only works if a named, appointed person controls issue and cancellation, because they are the one who knows what else is happening in that area. Allowing any competent operative to issue one is the tempting answer, but competence for the task says nothing about the wider conflicts a permit exists to manage.',
    section: '5.1.1',
    difficulty: 'intermediate',
    topic: 'Site management team',
  },
  {
    id: 312,
    question: 'Which role coordinates temporary supports and propping so that other trades can work safely around them?',
    options: [
      'The structural engineer\'s site inspector',
      'The principal designer for the project',
      'The supervisor for each trade',
      'The temporary works coordinator',
    ],
    correctAnswer: 3,
    explanation: 'Temporary works have their own coordinator because propping, edge protection and support to excavations affect every trade in the area. The structural engineer\'s inspector is the tempting answer because they attend for the same reason, but they check design compliance rather than coordinate the works.',
    section: '5.1.1',
    difficulty: 'intermediate',
    topic: 'Site management team',
  },
  {
    id: 313,
    question: 'A subcontracted electrician has a technical query about the design. What is the correct route?',
    options: [
      'Through their supervisor as a written query',
      'Directly to the designer by telephone call',
      'Through the nearest available site manager',
      'Directly to the client at the next meeting',
    ],
    correctAnswer: 0,
    explanation: 'Design queries travel as a formal written request so the answer is recorded and reaches everyone it affects, and it goes up the contractual line rather than sideways. Telephoning the designer is the tempting answer because it is quicker, but a verbal answer binds nobody and leaves no trace.',
    section: '5.1.2',
    difficulty: 'intermediate',
    topic: 'Reporting lines',
  },
  {
    id: 314,
    question: 'An electrical contractor learns their work will finish a week late. When should the main contractor be told?',
    options: [
      'At the next progress meeting',
      'As soon as the delay is known',
      'Once the revised finish date is certain',
      'When the following trade asks about it',
    ],
    correctAnswer: 1,
    explanation: 'Early notice is what lets the programme be resequenced while there is still room to move, which is the whole value of the information. Waiting for certainty is the tempting answer because it feels more professional, but by then the following trades have already been booked.',
    section: '5.1.2',
    difficulty: 'intermediate',
    topic: 'Reporting lines',
  },
  {
    id: 315,
    question: 'An agency operative attends site to work for the electrical contractor. Are they a visitor?',
    options: [
      'Yes, because the agency is their employer',
      'Yes, so they sign the visitors book only',
      'No, they are a worker and need an induction',
      'No, but only once they have worked a week',
    ],
    correctAnswer: 2,
    explanation: 'Someone carrying out work on site is a worker whoever pays them, so they need the full induction, the site rules and a place on the register. Treating them as a visitor because the agency employs them is the tempting error, and it is how people end up unbriefed on live hazards.',
    section: '5.1.3',
    difficulty: 'intermediate',
    topic: 'Site visitors',
  },
  {
    id: 316,
    question: 'A manufacturer\'s engineer arrives to commission switchgear and expects to work on it energised. What must happen first?',
    options: [
      'They must show evidence of their public liability',
      'They must be issued with the site induction pack',
      'They must be signed in by the electrical supervisor',
      'Their method must be agreed under the site system',
    ],
    correctAnswer: 3,
    explanation: 'An outside specialist cannot bring their own rules onto someone else\'s site, so their intended method has to be reviewed and controlled through the permit and risk arrangements in force. Induction is the tempting answer because it is a genuine requirement, but induction does not authorise energised work.',
    section: '5.1.3',
    difficulty: 'intermediate',
    topic: 'Site visitors',
  },
  {
    id: 317,
    question: 'What is the legal standing of an approved code of practice?',
    options: [
      'Following it is evidence of compliance',
      'It has the same force as the regulation',
      'It is advice with no bearing in court',
      'It applies only where a regulator adopts it',
    ],
    correctAnswer: 0,
    explanation: 'An approved code has a special status: follow it and you are taken to have complied, depart from it and you must show you achieved the same standard another way. Treating it as identical to the regulation is the tempting error, because you may lawfully do something different if it is equally effective.',
    section: '5.2.1',
    difficulty: 'intermediate',
    topic: 'Statutory legislation',
  },
  {
    id: 318,
    question: 'An employee is off work for more than seven consecutive days after an injury at work. What must the employer do?',
    options: [
      'Record it in the accident book only',
      'Report it to the enforcing authority',
      'Notify the employee\'s own insurer',
      'Refer the employee for a medical check',
    ],
    correctAnswer: 1,
    explanation: 'An over-seven-day absence caused by a work injury is reportable, and the report goes to the enforcing authority. Recording it in the accident book is the tempting answer because that also has to happen, but the internal record is not the statutory report.',
    section: '5.2.1',
    difficulty: 'intermediate',
    topic: 'Statutory legislation',
  },
  {
    id: 319,
    question: 'How does an electrician confirm they are holding the current revision of a drawing?',
    options: [
      'Check with the trade working alongside them',
      'Check the date printed in the title block',
      'Check the number against the drawing register',
      'Check that the drawing shows a revision cloud',
    ],
    correctAnswer: 2,
    explanation: 'The register is the controlled list of what has been issued and which revision is current, so it is the only reliable check. The date in the title block is the tempting answer because it looks definitive, but a later revision may have been issued that you were never sent.',
    section: '5.2.2',
    difficulty: 'intermediate',
    topic: 'Workplace information',
  },
  {
    id: 320,
    question: 'What is a hold point in a construction programme?',
    options: [
      'Work stops until payment has been received',
      'Work stops until materials are delivered',
      'Work stops while another trade is present',
      'Work stops until an inspection is passed',
    ],
    correctAnswer: 3,
    explanation: 'A hold point is a planned stop so that something can be inspected or witnessed before it is covered up or energised. Waiting for materials is the tempting answer because that also stops work, but that is a delay rather than a control built into the programme.',
    section: '5.2.2',
    difficulty: 'intermediate',
    topic: 'Workplace information',
  },
  {
    id: 321,
    question: 'What information should a customer be given before work starts, rather than at handover?',
    options: [
      'What will be disrupted and for how long',
      'The test results for the completed circuits',
      'The operating instructions for the equipment',
      'The certificate for the finished work',
    ],
    correctAnswer: 0,
    explanation: 'Disruption is something the customer has to plan around, so it is worth nothing to them after the event. Operating instructions are the tempting answer because customers do want them, but they are only useful once the equipment exists.',
    section: '5.2.3',
    difficulty: 'intermediate',
    topic: 'Customer information',
  },
  {
    id: 322,
    question: 'A customer asks to keep the old consumer unit that has been removed. What should you tell them?',
    options: [
      'It must be taken away as controlled waste',
      'It can be left with them if they want it',
      'It must be returned to the manufacturer',
      'It has to be kept by you for six years',
    ],
    correctAnswer: 1,
    explanation: 'It is the customer\'s property, and if they want to keep it that is their decision; the duty to deal with waste only bites on waste you take away. Insisting it must be removed is the tempting answer because contractors normally do remove it, but normal practice is not a requirement to seize a customer\'s property.',
    section: '5.2.3',
    difficulty: 'intermediate',
    topic: 'Customer information',
  },
  {
    id: 323,
    question: 'A company policy and a site rule cover the same thing but say different things. Which applies?',
    options: [
      'The site rule, as the site is controlled',
      'The company policy, as the employer\'s rule',
      'Whichever sets the higher standard',
      'Neither, until both are reconciled',
    ],
    correctAnswer: 2,
    explanation: 'You comply with both by working to whichever is stricter, and you raise the difference so it can be resolved properly. Following the site rule because the site controls access is the tempting answer, but a site rule cannot lower a standard your employer requires of you.',
    section: '5.2.4',
    difficulty: 'intermediate',
    topic: 'Company policies',
  },
  {
    id: 324,
    question: 'Which policy governs whether an electrician may photograph work inside a customer\'s home?',
    options: [
      'The customer complaints handling policy',
      'The company\'s social media policy',
      'The information technology use policy',
      'The data protection and privacy policy',
    ],
    correctAnswer: 3,
    explanation: 'Images of a person\'s home are information about that person, so their capture, storage and use fall under data protection. The social media policy is the tempting answer because that is where photographs usually cause trouble, but it governs publication rather than whether the image may be taken at all.',
    section: '5.2.4',
    difficulty: 'intermediate',
    topic: 'Company policies',
  },
  {
    id: 325,
    question: 'Which method should be used to instruct a change that increases the price of a job?',
    options: [
      'A written instruction confirmed by both parties',
      'A telephone call followed by a diary note',
      'A message in the site messaging group',
      'A verbal agreement witnessed by a colleague',
    ],
    correctAnswer: 0,
    explanation: 'Anything that moves money needs a record that both sides have accepted, because that is the document produced when the final account is disputed. A witnessed verbal agreement is the tempting answer because it feels robust, but a witness recalls a conversation rather than the terms.',
    section: '5.3.1',
    difficulty: 'intermediate',
    topic: 'Communication methods',
  },
  {
    id: 326,
    question: 'How does a sender know that a safety message has actually been understood?',
    options: [
      'The receiver confirms they have understood it',
      'The receiver explains it back in their own words',
      'The receiver signs the briefing record sheet',
      'The receiver asks no questions afterwards',
    ],
    correctAnswer: 1,
    explanation: 'Asking someone to say it back exposes the gap between hearing and understanding, which a yes or a signature does not. A signature on the record is the tempting answer because it is the evidence kept, but it evidences attendance rather than comprehension.',
    section: '5.3.1',
    difficulty: 'intermediate',
    topic: 'Communication methods',
  },
  {
    id: 327,
    question: 'A tradesperson who cannot read well is to be briefed on a safe isolation procedure. What is the best approach?',
    options: [
      'Ask a colleague to read the procedure to them',
      'Give them the written procedure to take away',
      'Demonstrate it and have them repeat it back',
      'Provide the procedure in a larger typeface',
    ],
    correctAnswer: 2,
    explanation: 'Showing the sequence and having it performed back proves the person can carry it out, which is what matters for a procedure. Reading it aloud is the tempting answer because it does remove the reading barrier, but hearing a procedure is not the same as being able to do it.',
    section: '5.3.2',
    difficulty: 'intermediate',
    topic: 'Accessible communication',
  },
  {
    id: 328,
    question: 'Why should an interpreter be used rather than a bilingual colleague for a formal safety briefing?',
    options: [
      'The colleague may not be free on the day',
      'The colleague may refuse to take part in it',
      'The colleague cannot be paid for the time',
      'The colleague may not know the technical terms',
    ],
    correctAnswer: 3,
    explanation: 'Everyday fluency does not carry the vocabulary of isolation, earthing or permits, and a well-meaning paraphrase can change what was said. Availability is the tempting answer because it is a real practical problem, but it does not explain why the translation itself would be unreliable.',
    section: '5.3.2',
    difficulty: 'intermediate',
    topic: 'Accessible communication',
  },
  {
    id: 329,
    question: 'A customer disputes work you carried out that they had agreed to in writing. What should you produce first?',
    options: [
      'The written agreement and any variations to it',
      'Photographs taken of the completed work',
      'The certificate issued at the end of the job',
      'A statement from the operative who did it',
    ],
    correctAnswer: 0,
    explanation: 'The dispute is about what was agreed, so the document recording the agreement and any changes to it answers it directly. Photographs are the tempting answer because they show what was done, but they say nothing about what was asked for.',
    section: '5.3.3',
    difficulty: 'intermediate',
    topic: 'Conflict',
  },
  {
    id: 330,
    question: 'Which communication failure is most likely to cause an injury rather than a cost?',
    options: [
      'A variation that is never priced or issued',
      'A handover that omits an unproved isolation',
      'A drawing revision that is not circulated',
      'A delivery note that is signed unchecked',
    ],
    correctAnswer: 1,
    explanation: 'An isolation nobody has confirmed leaves the next person working on something they believe to be dead. The uncirculated revision is the tempting answer because it certainly causes harm, but the harm it causes is rework rather than contact with a live conductor.',
    section: '5.3.4',
    difficulty: 'intermediate',
    topic: 'Effects of poor communication',
  },
  {
    id: 331,
    question: 'On a project with two contractors, who decides how the electrical work is sequenced against the other trades?',
    options: [
      'The client, at the monthly progress meeting',
      'The electrical contractor, from its own resources',
      'The principal contractor, through the programme',
      'The principal designer, in the pre-construction pack',
    ],
    correctAnswer: 2,
    explanation: 'Planning and managing the construction phase, including how trades follow one another, sits with the principal contractor. The principal designer is the tempting answer because they shape how risk is designed out, but their duties sit before construction rather than in day to day sequencing.',
    section: '5.1.1',
    difficulty: 'advanced',
    topic: 'Site management team',
  },
  {
    id: 332,
    question: 'A site manager from another firm tells an apprentice to change what they are doing. What should the apprentice do?',
    options: [
      'Comply and report it at the end of the shift',
      'Comply, as the site manager controls the site',
      'Refuse, as they take no instruction from them',
      'Stop and check with their own supervisor',
    ],
    correctAnswer: 3,
    explanation: 'Site managers control the site and can stop unsafe work, but changing what an apprentice is doing technically belongs to the employer who is responsible for them. Flat refusal is the tempting answer because the line of authority is clear, but it ignores that a site manager may be stopping something genuinely unsafe.',
    section: '5.1.1',
    difficulty: 'advanced',
    topic: 'Site management team',
  },
  {
    id: 333,
    question: 'An electrician is told by the client\'s representative to add a circuit that is not on the drawings. What should happen?',
    options: [
      'It is passed up for a formal instruction',
      'It is carried out and noted in the site diary',
      'It is refused because the drawings are fixed',
      'It is priced and invoiced after completion',
    ],
    correctAnswer: 0,
    explanation: 'A client representative asking directly is not the same as an instruction under the contract, so it has to be routed for one before anyone works or prices. Doing it and noting the diary is the tempting answer because it feels cooperative, but an unrecorded extra is what disappears at the final account.',
    section: '5.1.1',
    difficulty: 'advanced',
    topic: 'Site management team',
  },
  {
    id: 334,
    question: 'An apprentice reports the same hazard twice and nothing is done. What is the correct next step?',
    options: [
      'Report it directly to the enforcing authority',
      'Escalate above their supervisor within the firm',
      'Stop work on site until it has been dealt with',
      'Record it in their own diary and move on',
    ],
    correctAnswer: 1,
    explanation: 'The internal route has not been exhausted until someone above the supervisor has been given the chance to act, and that is the step that usually resolves it. Going straight to the regulator is the tempting answer because the risk is real, but it skips the person most able to fix it quickly.',
    section: '5.1.2',
    difficulty: 'advanced',
    topic: 'Reporting lines',
  },
  {
    id: 335,
    question: 'An electrician finds another trade has drilled through a cable route. Who should be told first?',
    options: [
      'The customer paying for the works',
      'The operative who did the drilling',
      'Their own supervisor and the site manager',
      'The designer who set the cable route',
    ],
    correctAnswer: 2,
    explanation: 'Damage to a wiring system is both a safety matter and a commercial one, so it goes up both lines at once: your own supervisor and the person who controls the site. Speaking to the operative is the tempting answer because they are standing there, but a quiet word leaves no record and no repair.',
    section: '5.1.2',
    difficulty: 'advanced',
    topic: 'Reporting lines',
  },
  {
    id: 336,
    question: 'An electrician is directly employed but works permanently on a client\'s premises under their facilities manager. Who directs their work?',
    options: [
      'Whichever of the two is on site that day',
      'The facilities manager, as they set the tasks',
      'The employer, who ignores the client\'s requests',
      'Both, with technical direction from the employer',
    ],
    correctAnswer: 3,
    explanation: 'Split arrangements are normal, and they work when the client sets the priorities while the employer remains answerable for how the work is done and for the person\'s competence. Treating the facilities manager as the sole authority is the tempting answer because they issue the daily work, but that leaves nobody accountable for technical standards.',
    section: '5.1.2',
    difficulty: 'advanced',
    topic: 'Reporting lines',
  },
  {
    id: 337,
    question: 'A visitor refuses to sign in because they are only staying five minutes. What is the consequence?',
    options: [
      'Nobody knows they are there in an evacuation',
      'They cannot be charged for the time on site',
      'The site loses its insurance for the day',
      'The induction record cannot be completed',
    ],
    correctAnswer: 0,
    explanation: 'The register exists so the roll call after an evacuation is accurate, and an unrecorded person is either searched for unnecessarily or left inside. Losing insurance is the tempting answer because it sounds like the serious consequence, but the immediate risk is to the person themselves.',
    section: '5.1.3',
    difficulty: 'advanced',
    topic: 'Site visitors',
  },
  {
    id: 338,
    question: 'A network operator\'s engineer attends a domestic property to work on the service head while you are rewiring. What should you do?',
    options: [
      'Leave the property until they have finished',
      'Agree who is isolating what before either starts',
      'Continue working and stay clear of their area',
      'Ask them to confirm your isolation is secure',
    ],
    correctAnswer: 1,
    explanation: 'Two people working on the same supply from different ends is exactly how someone gets caught out, so the isolation arrangements have to be agreed between you before either starts. Staying clear of their area is the tempting answer because it separates you physically, but the hazard travels down the conductors rather than across the floor.',
    section: '5.1.3',
    difficulty: 'advanced',
    topic: 'Site visitors',
  },
  {
    id: 339,
    question: 'What are the conditions that must be met before work on or near live conductors can be justified?',
    options: [
      'The work is urgent and the operative holds an inspection qualification',
      'The customer agrees and a second person is present at all times',
      'Unreasonable to work dead, reasonable to work live, precautions taken',
      'A permit is issued and insulated tools and gloves are being used',
    ],
    correctAnswer: 2,
    explanation: 'All three limbs must be satisfied together: it must be unreasonable in all the circumstances to work dead, reasonable in all the circumstances to work live, and suitable precautions taken to prevent injury. Listing a permit and insulated tools is the tempting answer because they are real precautions, but precautions alone do not justify the decision to work live.',
    section: '5.2.1',
    difficulty: 'advanced',
    topic: 'Statutory legislation',
  },
  {
    id: 340,
    question: 'A method statement conflicts with the manufacturer\'s instructions for a piece of equipment. What should the electrician do?',
    options: [
      'Follow whichever is easier to achieve on site',
      'Follow the manufacturer, as they made the item',
      'Follow the method statement, as it is site specific',
      'Stop and have the difference resolved formally',
    ],
    correctAnswer: 3,
    explanation: 'Both documents carry weight and neither can simply overrule the other in the hands of the operative, so the conflict is escalated and the answer recorded. Following the manufacturer is the tempting answer because their instructions are authoritative for the product, but the method statement may exist precisely because of a site condition they never considered.',
    section: '5.2.2',
    difficulty: 'advanced',
    topic: 'Workplace information',
  },
  {
    id: 341,
    question: 'A risk assessment on site does not cover the task an electrician has been asked to do. What is the correct action?',
    options: [
      'Stop and have the assessment extended first',
      'Carry out the task using general precautions',
      'Add a handwritten note to the existing document',
      'Ask another trade how they assessed the same task',
    ],
    correctAnswer: 0,
    explanation: 'An assessment that does not reach the task offers no controls for it, so the work waits until it has been assessed by someone competent to do so. Annotating the document is the tempting answer because it looks like closing the gap, but an operative\'s note is not an assessment.',
    section: '5.2.2',
    difficulty: 'advanced',
    topic: 'Workplace information',
  },
  {
    id: 342,
    question: 'Why does a specification matter more than a drawing when judging the quality of what is installed?',
    options: [
      'It is issued later than the drawings are',
      'It states the standard the materials must meet',
      'It is the only document the client signs',
      'It shows the position of every accessory',
    ],
    correctAnswer: 1,
    explanation: 'The drawing shows where things go; the specification says what they must be and how they must be installed, which is what quality turns on. Saying it is issued later is the tempting answer because revisions do matter, but issue order says nothing about which document governs quality.',
    section: '5.2.2',
    difficulty: 'advanced',
    topic: 'Workplace information',
  },
  {
    id: 343,
    question: 'A customer instruction would produce an installation that does not meet the specification. What should the electrician do?',
    options: [
      'Follow the specification and say nothing further',
      'Follow the customer, as they are paying for it',
      'Set out the conflict in writing before proceeding',
      'Ask the customer to sign a disclaimer and proceed',
    ],
    correctAnswer: 2,
    explanation: 'The customer may be entitled to change what they want, but the departure has to be recorded so nobody later claims the installation was built wrongly. A signed disclaimer is the tempting answer because it feels like protection, but it does not address whether the change is acceptable in the first place.',
    section: '5.2.3',
    difficulty: 'advanced',
    topic: 'Customer information',
  },
  {
    id: 344,
    question: 'A customer will not read the inspection report you have given them. How do you make sure they can act on it?',
    options: [
      'Give the report to a family member instead',
      'Send the report again by email with a summary',
      'Leave a copy and ask them to read it later',
      'Talk them through what is unsafe and what to do',
    ],
    correctAnswer: 3,
    explanation: 'Information the customer cannot use is information they have not been given, so the content is delivered in a form they can act on. Giving it to a relative is the tempting answer because someone then reads it, but the customer is the person who has to decide and it may not be theirs to share.',
    section: '5.2.3',
    difficulty: 'advanced',
    topic: 'Customer information',
  },
  {
    id: 345,
    question: 'A tenant asks for a copy of the inspection report on the property they rent. What should the contractor do?',
    options: [
      'Refer them to the landlord who ordered it',
      'Send them a copy as they live in the property',
      'Refuse and explain that reports are confidential',
      'Send a copy with the results removed',
    ],
    correctAnswer: 0,
    explanation: 'The report was commissioned by and belongs to the landlord, who has their own duty to provide it, so the request is directed to them rather than answered by the contractor. Sending it because the tenant lives there is the tempting answer, and it is exactly how a contractor ends up releasing another party\'s document.',
    section: '5.2.3',
    difficulty: 'advanced',
    topic: 'Customer information',
  },
  {
    id: 346,
    question: 'What makes a company policy effective rather than merely written?',
    options: [
      'It is signed by the most senior director',
      'It is communicated, followed and reviewed',
      'It is displayed on the site notice board',
      'It is issued to every new starter on day one',
    ],
    correctAnswer: 1,
    explanation: 'A policy only changes anything when people know it, work to it, and it is revisited when circumstances change. Signature by a director is the tempting answer because it does signal commitment, but plenty of signed policies sit unread in a folder.',
    section: '5.2.4',
    difficulty: 'advanced',
    topic: 'Company policies',
  },
  {
    id: 347,
    question: 'An operative is asked to work in a way their employer\'s policy forbids but the client permits. What should they do?',
    options: [
      'Comply and note the departure in the site diary',
      'Comply, since the client controls the premises',
      'Decline and raise it with their own employer',
      'Ask the client to confirm the request in writing',
    ],
    correctAnswer: 2,
    explanation: 'The employer\'s policy binds the employee whatever a client permits, so the work stops and the conflict goes back to the employer to resolve. Getting it in writing is the tempting answer because a record feels protective, but a written request does not make a prohibited method acceptable.',
    section: '5.2.4',
    difficulty: 'advanced',
    topic: 'Company policies',
  },
  {
    id: 348,
    question: 'Which method should a supervisor choose to tell a dispersed team that a hazard has changed on site?',
    options: [
      'An email sent to each operative that morning',
      'A message to the team\'s group chat',
      'A notice pinned to the site notice board',
      'A briefing at the point of work with a record',
    ],
    correctAnswer: 3,
    explanation: 'A changed hazard has to reach the people exposed to it and be understood there, which means going to where they are working and recording that it was done. The group chat is the tempting answer because it is instant, but there is no way of knowing who read it before picking up their tools.',
    section: '5.3.1',
    difficulty: 'advanced',
    topic: 'Communication methods',
  },
  {
    id: 349,
    question: 'An urgent safety instruction has to reach an operative working alone in a plant room. What is the right method?',
    options: [
      'Attend in person or call and confirm receipt',
      'Send a message and assume it has been seen',
      'Tell their supervisor to pass it on later',
      'Post it on the notice board they walk past',
    ],
    correctAnswer: 0,
    explanation: 'Urgency means the sender has to know the message arrived, which only direct contact or a confirmed call gives. Passing it through a supervisor is the tempting answer because it follows the reporting line, but every relay adds delay to something that cannot wait.',
    section: '5.3.1',
    difficulty: 'advanced',
    topic: 'Communication methods',
  },
  {
    id: 350,
    question: 'A written instruction and a verbal one given the same day contradict each other. Which does the electrician act on?',
    options: [
      'The written one, as it is the formal record',
      'Neither, until the contradiction is resolved',
      'The verbal one, as it was given most recently',
      'Whichever came from the more senior person',
    ],
    correctAnswer: 1,
    explanation: 'Acting on either one means guessing which the issuer meant, and if it is the wrong guess the work has to be undone. Choosing the written instruction is the tempting answer because records normally win, but a written instruction can be the one that has been superseded.',
    section: '5.3.1',
    difficulty: 'advanced',
    topic: 'Communication methods',
  },
  {
    id: 351,
    question: 'A customer with a learning disability is having a fuseboard replaced. Who should be given the safety information?',
    options: [
      'The support worker who attends each week',
      'The relative who arranged the appointment',
      'The customer, in a form they can follow',
      'The landlord who owns the property',
    ],
    correctAnswer: 2,
    explanation: 'The information belongs to the customer and the adjustment is in how it is delivered, not in delivering it to somebody else. Giving it to a relative is the tempting answer because it seems practical, but it removes the customer from a decision about their own home.',
    section: '5.3.2',
    difficulty: 'advanced',
    topic: 'Accessible communication',
  },
  {
    id: 352,
    question: 'A hearing aid user cannot follow a briefing in a running plant room. What is the most effective adjustment?',
    options: [
      'Repeat the briefing a second time',
      'Speak louder and face them directly',
      'Write the key points on a whiteboard',
      'Move the briefing somewhere quiet',
    ],
    correctAnswer: 3,
    explanation: 'Hearing aids amplify background noise as well as speech, so removing the noise is what actually helps. Speaking louder is the tempting answer because it feels responsive, but raising your voice raises the level the aid is already struggling with.',
    section: '5.3.2',
    difficulty: 'advanced',
    topic: 'Accessible communication',
  },
  {
    id: 353,
    question: 'Why is asking \'do you understand?\' a weak check after a safety briefing?',
    options: [
      'People say yes rather than admit confusion',
      'It takes longer than asking them to repeat it',
      'It cannot be recorded on the briefing sheet',
      'It is not permitted under equality legislation',
    ],
    correctAnswer: 0,
    explanation: 'A closed question in front of colleagues invites the answer that ends the conversation, which is why understanding is checked by asking the person to explain the task. Saying it cannot be recorded is the tempting answer, but the record is not the problem; the answer is.',
    section: '5.3.2',
    difficulty: 'advanced',
    topic: 'Accessible communication',
  },
  {
    id: 354,
    question: 'An apprentice is told by their employer to do something the site rules forbid. Where do they stand?',
    options: [
      'They should follow the employer\'s instruction',
      'They should not proceed and must raise it',
      'They should follow the site rule without comment',
      'They should ask another apprentice what to do',
    ],
    correctAnswer: 1,
    explanation: 'An apprentice cannot resolve a conflict between two people who each have authority over part of what they do, so the work stops and the conflict goes back up. Quietly following the site rule is the tempting answer because it keeps them compliant on site, but it leaves the employer expecting work that is not being done.',
    section: '5.3.3',
    difficulty: 'advanced',
    topic: 'Conflict',
  },
  {
    id: 355,
    question: 'A disagreement with a colleague has been raised informally twice with no change. What is the appropriate next step?',
    options: [
      'Approach the colleague a third time directly',
      'Raise it with the main contractor',
      'Put it in writing as a formal grievance',
      'Ask other colleagues to support the complaint',
    ],
    correctAnswer: 2,
    explanation: 'Informal resolution has been tried and has not worked, so the formal procedure exists for exactly that point. Involving the main contractor is the tempting answer because they run the site, but an internal disagreement between employees of one firm is not theirs to settle.',
    section: '5.3.3',
    difficulty: 'advanced',
    topic: 'Conflict',
  },
  {
    id: 356,
    question: 'A customer becomes angry about a delay that was caused by another trade. What is the most effective first response?',
    options: [
      'Refer the customer to the main contractor',
      'Explain that the delay was not your responsibility',
      'Offer a reduction on the price of your work',
      'Acknowledge the delay and explain the position',
    ],
    correctAnswer: 3,
    explanation: 'Acknowledging the problem before explaining it lets the customer hear the explanation, which they will not do while they feel dismissed. Leading with whose fault it was is the tempting answer because it is accurate, but it sounds like an excuse and the conversation stops there.',
    section: '5.3.3',
    difficulty: 'advanced',
    topic: 'Conflict',
  },
  {
    id: 357,
    question: 'Who carries the cost of rework when extra work was instructed verbally and never recorded?',
    options: [
      'Usually the contractor, having no evidence',
      'Always the customer, who requested the work',
      'The main contractor, who controls the site',
      'Nobody, since the work was still completed',
    ],
    correctAnswer: 0,
    explanation: 'Without a record the contractor cannot show what was asked for, so a disputed extra is generally absorbed. Saying the customer always pays is the tempting answer because they did request it, but a request nobody can prove is a request that does not exist commercially.',
    section: '5.3.4',
    difficulty: 'advanced',
    topic: 'Effects of poor communication',
  },
  {
    id: 358,
    question: 'A near-miss is reported to a supervisor but never shared with the wider team. What is the most likely result?',
    options: [
      'The report cannot be used in any investigation',
      'The same circumstances recur elsewhere on site',
      'The supervisor becomes personally liable for it',
      'The site loses its accreditation at the next audit',
    ],
    correctAnswer: 1,
    explanation: 'The value of a near-miss is the warning it gives everyone else, and a report that stops at one desk gives no warning at all. Personal liability is the tempting answer because responsibility feels like the issue, but the practical consequence is a repeat.',
    section: '5.3.4',
    difficulty: 'advanced',
    topic: 'Effects of poor communication',
  },
  {
    id: 359,
    question: 'An electrical contractor\'s request for information goes unanswered for three weeks. What is the direct effect?',
    options: [
      'The designer becomes liable for the delay',
      'The contract is automatically extended',
      'Work is held or built on an assumption',
      'The request lapses and must be reissued',
    ],
    correctAnswer: 2,
    explanation: 'Either the work waits, which costs time, or somebody guesses, which usually costs more when the answer finally arrives. Automatic extension is the tempting answer because delay does feed into extension claims, but nothing happens automatically without notice and assessment.',
    section: '5.3.4',
    difficulty: 'advanced',
    topic: 'Effects of poor communication',
  },
  {
    id: 360,
    question: 'A completed installation is handed over with no operating information. What is the most likely long-term consequence?',
    options: [
      'The warranty period is shortened by half',
      'The certificate becomes invalid over time',
      'The customer cannot insure the property',
      'The system is misused and fails early',
    ],
    correctAnswer: 3,
    explanation: 'Equipment nobody knows how to run gets left in the wrong mode, never serviced and blamed when it underperforms. Certificate validity is the tempting answer because documentation is the theme, but a certificate records the condition at the time and is not undone by a missing manual.',
    section: '5.3.4',
    difficulty: 'advanced',
    topic: 'Effects of poor communication',
  },
];

/**
 * Get random questions from the Module 5 question bank
 * @param count Number of questions to return
 * @param difficultyDistribution Optional distribution of difficulty levels (percentages)
 * @returns Array of random questions
 */
/**
 * Draws a paper honouring the difficulty tags.
 *
 * Previously shuffled each band with `sort(() => 0.5 - Math.random())`, which is
 * not a uniform permutation, and had no backfill — a band holding fewer
 * questions than its weight demanded returned a SHORT paper with no error and
 * no warning. Both fixed by the shared helper.
 * See src/utils/apprenticeQuestionDraw.ts.
 */
export function getRandomQuestions(
  count: number = 30,
  difficultyDistribution: DifficultyWeights = LEVEL2_WEIGHTS
): QuestionBank[] {
  return drawWeighted(module5QuestionBank, count, difficultyDistribution);
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

