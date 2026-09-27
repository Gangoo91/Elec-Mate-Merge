/**
 * Ported from the English course, combining:
 *   level2/module5/section1/Sub1.tsx
 *   level2/module5/section1/Sub2.tsx
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

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s1-sub1-chain',
    question:
      "It's your first day on a commercial fit-out. The main contractor's Site Manager walks past the welfare cabin and tells you to drop everything and help carry plasterboard up to the second floor. Your own electrical contractor's Site Supervisor has just briefed you to first-fix containment in the comms room. What's the right move?",
    options: [
      "Drop the containment job straight away — the main contractor's Site Manager is the most senior person on site, so their instruction overrides your supervisor's.",
      "Politely explain you've been tasked by your own supervisor on a different priority, and offer to fetch your supervisor so the two managers can re-prioritise.",
      'Carry on with your containment and ignore the Site Manager — you only answer to your own electrical contractor and the main contractor has no say over you.',
      'Down tools and wait for the two managers to sort it out between themselves before doing any work at all.',
    ],
    correctIndex: 1,
    explanation:
      "On a CDM 2015 site the main contractor (Principal Contractor) co-ordinates the work of all contractors on site under Reg 13, but each contractor's workforce takes day-to-day instructions from their own line management. The Site Manager raising a labour-shortage with your supervisor is the correct route — the supervisor then decides whether to release you. Apprentices stepping outside their own chain on a single instruction is how scope creep, unsafe work and contractual disputes start. Polite, defer-to-your-own-supervisor is the right answer almost every time.",
  },
  {
    id: 'mod5-s1-sub1-pm-vs-sm',
    question:
      "On a £4m commercial refit, what's the practical difference between the Project Manager (PM) and the Site Manager (SM)?",
    options: [
      'The PM is client-facing and owns the programme, budget and contract, visiting weekly; the SM runs the site day to day — daily plan, trade co-ordination, welfare and safety walks.',
      'The PM and SM are the same job with two names; firms use whichever title they prefer and there is no real difference in what they do.',
      'The SM is senior to the PM and owns the contract, while the PM just keeps the daily site diary and reports up to the SM.',
      'The PM handles only the electrical work and the SM handles only the building work; they each run a separate trade on site.',
    ],
    correctIndex: 0,
    explanation:
      "Both PM and SM work for the main contractor (or for the larger sub-contractors on bigger jobs). The split is between strategic (PM — programme, budget, client) and tactical (SM — daily delivery on site). On smaller jobs one person may do both. As an apprentice you'll deal with the SM more often than the PM, but it helps to know the PM is the one with the contract in their hand if a programme dispute reaches them.",
  },
  {
    id: 'mod5-s1-sub1-foreman',
    question:
      "What does an electrical Foreman (or Site Supervisor) actually do that the Project Engineer and Contracts Manager don't?",
    options: [
      'The Foreman produces the cable calculations and resolves design queries, while the Project Engineer runs the morning brief at the work face.',
      'The Foreman owns the contract and the money, while the Project Engineer and Contracts Manager only visit site when there is a dispute.',
      'The Foreman directs the work at the face — who pulls which cable, in what sequence — runs the daily brief and allocates apprentices, and is the only one of the three in the work area all day.',
      'The Foreman has no day-to-day role and only steps in to sign off the finished installation at hand-over.',
    ],
    correctIndex: 2,
    explanation:
      "The Foreman (sometimes called Site Supervisor or Charge-hand on smaller jobs) is the work-face leader. They translate the design and the programme into 'today's job for each pair of hands'. Apprentices answer directly to the Foreman almost every day, and the Foreman calibrates with the Project Engineer on technical issues and with the Contracts Manager on programme and labour. Knowing this triangle stops you defaulting to 'I'll just ask the most senior person' — you ask the Foreman first, and they escalate if needed.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Who in the site management team is the client's main day-to-day point of contact on a typical commercial project?",
    options: [
      'The Foreman, because they are in the work area all day and know exactly how the job is progressing.',
      "The Project Manager (PM), who owns the contract, programme and budget on the contractor's side and is who the client phones about money, dates, scope or a serious problem.",
      'The Site Manager, because they run the site day to day and are the most senior person physically on site.',
      "The Approved Electrician, because they hold the technical competence to answer the client's questions directly.",
    ],
    correctAnswer: 1,
    explanation:
      "The PM is the contractor's commercial face. They sit between the client and the Site Manager. On a smaller project the same person may wear both hats; on a larger project there can be a layer between (a Senior Project Manager or a Construction Manager). The principle stays the same — the PM is who the client deals with, the SM is who the trades deal with.",
  },
  {
    id: 2,
    question: "What's the role of a Charge-hand on an electrical install?",
    options: [
      'A junior apprentice whose job is making the tea and running errands for the rest of the gang during the working day.',
      'The desk-based technical role that produces the cable calculations and resolves design queries from site.',
      'A senior trade lead — typically an experienced Approved Electrician — who runs a small gang on a specific area and reports up to the Foreman.',
      'The most senior manager on site, who owns the contract with the main contractor and signs off variations.',
    ],
    correctAnswer: 2,
    explanation:
      "On smaller jobs the Foreman directly runs everyone. On bigger jobs the Foreman delegates to Charge-hands — each runs a gang of three to six. As an apprentice you'll often be paired with a Charge-hand who acts as your day-to-day mentor on top of any formal Apprentice Mentor scheme.",
  },
  {
    id: 3,
    question:
      "On the electrical contractor's side of the chain, what does the Contracts Manager own?",
    options: [
      "The day-to-day allocation of tasks at the work face and the running of the gang's morning brief.",
      'The cable calculations, protective device settings and the sign-off of as-installed drawings.',
      "The pre-use inspection of tools and the maintenance of the site's lifting equipment.",
      'The commercial relationship with the main contractor — the programme, variations, labour resourcing and invoicing — sitting above the Project Engineer, often running several jobs at once.',
    ],
    correctAnswer: 3,
    explanation:
      "Contracts Manager is the equivalent of the main contractor's Project Manager but on the sub-contractor's side. On a multi-site electrical contracting firm the Contracts Manager runs three or four live jobs at once, attending site meetings, resolving programme clashes, signing off variations. The on-site Foreman calls them when there's a problem that goes beyond the work face.",
  },
  {
    id: 4,
    question: "What's the difference between an Approved Electrician and an Apprentice Mentor?",
    options: [
      'Approved Electrician is a JIB competence grade above Electrician; Mentor is a role — an experienced electrician formally allocated to support a specific apprentice through portfolio, on-site learning and AM2. Often the same person.',
      'Approved Electrician and Mentor are both JIB grades, with Mentor sitting one step above Approved Electrician on the ladder.',
      'Approved Electrician is a workplace role with no formal qualification, while Mentor is the JIB grade awarded after AM2 plus experience.',
      'They are two names for the same thing — an electrician who has passed AM2 and supervises apprentices day to day.',
    ],
    correctAnswer: 0,
    explanation:
      'JIB (Joint Industry Board) grades run Apprentice → Improver → Electrician → Approved Electrician → Technician. Mentor is a workplace responsibility, not a JIB grade. The JIB Apprentice Code of Practice expects every apprentice to have a named workplace Mentor who signs off portfolio entries and calibrates on-site competence with the college tutor.',
  },
  {
    id: 5,
    question:
      'Under CDM 2015 what must the Principal Contractor (typically the main contractor) ensure for every worker arriving on a notifiable site?',
    options: [
      'That every worker holds a current ECS card and has personally signed the construction phase plan before starting.',
      'That a suitable site induction is provided, covering site rules, welfare, emergency procedures and the specific hazards on that site.',
      'That every worker has passed AM2 or its trade equivalent before being allowed onto the work face.',
      'That each worker provides their own PPE and lifting equipment, inspected and certified by their own employer.',
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 Reg 13(4) places the duty on the Principal Contractor (PC) to provide a suitable site induction. This is the formal moment when the PC's site management chain passes hazard information to operatives joining the site. As an apprentice it's the most important briefing of your day-one — it tells you the chain of command, the rules and the emergency arrangements.",
  },
  {
    id: 6,
    question:
      'The loudest, most confident voice on a site briefing is usually the most senior person there. True or false?',
    options: [
      'True — the person who speaks loudest at the brief is given that role precisely because they can be heard over a noisy site.',
      'True — site convention is that the most senior manager always leads the briefing in the loudest voice so everyone knows who is in charge.',
      'False — seniority is signalled by the badge on the hard hat, the title in the brief and the position in the chain; loud confidence is often just the longest-serving trade person, not the boss.',
      'False — there is no chain of command on a modern site, so no one is more senior than anyone else regardless of how they speak.',
    ],
    correctAnswer: 2,
    explanation:
      "Apprentices arriving on a busy site can mistake confidence and noise for authority. Hard-hat colour conventions vary by site (often white = manager, blue = visitor, yellow = operative, but it's not universal — check the site induction). The reliable signal is the morning brief — whoever runs it is the SM or their delegate. Asking is always fine; assuming is risky.",
  },
  {
    id: 7,
    question:
      'What does HASAWA s.2 require an employer to do that connects to having a clear management structure?',
    options: [
      'Provide every employee with a written copy of the construction phase plan before they start work.',
      'Ensure each employee carries their own public liability insurance to cover any harm they cause on site.',
      'Display the names and contact numbers of all sub-contractors at the site entrance at all times.',
      'Ensure, so far as is reasonably practicable, the health, safety and welfare of employees — including safe systems of work, of which a clear management and supervisory structure is part.',
    ],
    correctAnswer: 3,
    explanation:
      "HASAWA s.2(2)(a) requires 'the provision and maintenance of plant and systems of work that are, so far as is reasonably practicable, safe and without risks to health'. A defined management structure (PM → SM → Foreman → trades) is part of the system of work — it tells everyone who supervises them and who they escalate problems to. After an incident the HSE inspector asks 'who was supervising?' and 'who was that person reporting to?' — a clear chain answers both questions.",
  },
  {
    id: 8,
    question:
      'On a typical day, who gives an apprentice their actual work instructions on a commercial fit-out?',
    options: [
      "The electrical contractor's Foreman or Charge-hand at the morning brief, who allocate the day's tasks; the Approved Electrician you're paired with then directs the work at the face.",
      "The main contractor's Site Manager, who gives every operative on site their tasks directly regardless of which contractor employs them.",
      "The client's M&E consultant, who attends each morning to set the day's work for the electrical apprentices.",
      'Whoever is most senior in the welfare cabin at the start of the shift, irrespective of trade or employer.',
    ],
    correctAnswer: 0,
    explanation:
      "Day-to-day work allocation is a Foreman job. Trade-pairing (apprentice with Approved Electrician) is the standard apprentice arrangement. On bigger sites the Charge-hand may be the morning-brief lead for a specific area. Knowing this stops apprentices defaulting to 'I'll ask the boss' — the boss for that day is the Foreman, and the Foreman escalates up if needed.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question:
      'Who is the most senior person on a building site — the client, the Project Manager or the Site Manager?',
    answer:
      "On the contractor's side it's the Project Manager (PM) — they own the contract, the programme and the budget. The Site Manager (SM) is senior on site but reports to the PM. The client is contractually senior to all of the contractor's team but is not 'on the management chain' day-to-day — they instruct via the contract. As an apprentice you'll see the SM most often, the PM occasionally and the client rarely.",
  },
  {
    question:
      "If I'm employed by an electrical sub-contractor, do I take instructions from the main contractor's Site Manager?",
    answer:
      "No — not directly. The main contractor's Site Manager co-ordinates between sub-contractors under CDM 2015 Reg 13, but day-to-day work instructions to you come from your own employer's chain (Foreman → Project Engineer → Contracts Manager). If the main contractor's SM wants something done they raise it with your Foreman, who decides. Stepping outside your own chain to take an instruction direct from the main contractor's SM is how labour disputes and unsafe work start.",
  },
  {
    question: "What's the difference between a Foreman and a Site Supervisor?",
    answer:
      "In most electrical contracting firms they're the same role with two names. 'Foreman' is the older trade term, 'Site Supervisor' is the modern title that some firms (particularly the bigger M&E contractors) prefer because it sounds less hierarchical. The job is the same — work-face leader, runs the morning brief, allocates trades, signs off small works, escalates problems.",
  },
  {
    question: 'How do hard-hat colours work — is there a national standard?',
    answer:
      "There is no single national standard. BS EN 397 sets the helmet's safety performance but not the colour code. Common conventions on UK sites: white = site management or visitors, blue = supervisors or skilled workers, yellow = general operatives, green = first aid or safety, orange = signallers/banksmen, red = fire warden. But every site can set its own rules — the induction tells you the local colour code. Don't assume.",
  },
  {
    question: 'Where does a Project Engineer fit on the electrical side?',
    answer:
      "Project Engineer (sometimes Design Engineer or Engineer) is the technical desk-based role on the contractor's side. They produce or review the design, resolve RFIs (requests for information) from site, calculate cable sizes and protective device settings, and sign off as-installed drawings. They sit above the Foreman in technical authority but below the Contracts Manager in commercial authority. The Foreman calls them when there's a 'how do I install this?' question.",
  },
  {
    question: "I'm an apprentice — am I expected to know everyone's name and role on day one?",
    answer:
      "No, but you're expected to know your own chain — your Foreman, your Charge-hand if you have one, your Approved Electrician for the day, and the name of your Site Supervisor or Contracts Manager up the line. Knowing the main contractor's SM by sight is helpful too. The rest comes with time. If you're not sure who someone is, ask politely — 'sorry, who do you work for?' is a fine question and beats guessing wrong.",
  },
];

const DESCRIPTION2 =
  "The trades and operatives at the work face — electricians, plumbers, joiners, plasterers, gas-safe engineers, painters, plant operators, labourers, banksmen and slingers. How each reports up their own contractor's chain.";

/* ── Inline checks2 ────────────────────────────────────────────────── */

const checks2 = [
  {
    id: 'mod5-s1-sub2-grades',
    question:
      "On the JIB grading structure, what's the difference between an Improver and an Electrician?",
    options: [
      'An Improver is a first-year junior apprentice, while an Electrician has finished college but not yet started work on site.',
      'An Improver has passed AM2 and supervises others, while an Electrician is still working towards the technical qualifications.',
      'An Improver and an Electrician are the same JIB grade under two different names used by different firms.',
      'An Improver holds the technical quals but has not yet passed AM2 and works supervised; an Electrician has passed AM2 and works unsupervised on routine work.',
    ],
    correctIndex: 3,
    explanation:
      "JIB (Joint Industry Board) grades run Apprentice → Improver → Electrician → Approved Electrician → Technician. The AM2 (the End Point Assessment / industry test) is the line between Improver and Electrician. Once you've passed AM2 and your certification is updated you become an Electrician with full ECS card. Improvers carry an ECS card too but it specifies the Improver grade and the supervision requirement.",
  },
  {
    id: 'mod5-s1-sub2-banksman',
    question:
      "On a busy commercial site you're carrying tools across the loading bay when a tipper truck starts reversing. A banksman (in a high-vis vest, holding a stop sign) holds up their hand to you. What do you do?",
    options: [
      'Carry on across the bay — you have right of way as a pedestrian and the truck driver must wait for you to clear the area.',
      'Wave back to acknowledge them, then keep walking on your original line so the driver can see where you are heading.',
      'Stop immediately — the banksman is the trained signaller and has authority to stop pedestrians; wait to be waved on.',
      'Ignore the banksman and ask your own Foreman first, since the banksman works for a different contractor on site.',
    ],
    correctIndex: 2,
    explanation:
      "Banksmen (also called traffic marshals or signallers) are formally trained for vehicle movements on site under the Workplace Transport guidance (HSG136). They have site authority to stop pedestrians and traffic during a movement. Their signal is binding on you under CDM 2015 Reg 15 (workers must co-operate with the PC's arrangements) and under HASAWA s.7(b) (workers must co-operate with safety duties). Ignoring a banksman is a fast way off site.",
  },
  {
    id: 'mod5-s1-sub2-other-trades',
    question:
      "Halfway through a first-fix you and the joiner are working in the same room. The joiner needs to fit a noggin in exactly the spot where you've just dressed a cable. What's the right move?",
    options: [
      'Crash through the cabling as fast as you can before the joiner fixes the noggin, so your work is in first and they have to work around you.',
      "Stop, talk it through with the joiner, and if you can't agree, fetch a Foreman to mediate — conversation first, escalation if needed, under the co-operation duty in HASAWA s.7(b).",
      'Insist the joiner moves their noggin because you were working in the room first and cable always takes priority over joinery.',
      'Move your cable yourself without telling anyone and let the joiner carry on, even if it leaves the cable poorly dressed.',
    ],
    correctIndex: 1,
    explanation:
      "Trade clashes are the most common day-to-day issue at first-fix. CDM 2015 Reg 8 and Reg 13 put a co-ordination duty on the Principal Contractor, but the practical resolution at the work face is conversation between the two trades. HASAWA s.7(b) requires every operative to co-operate with safety arrangements, and a clash that's not resolved becomes a safety issue (cables damaged, joinery weakened, both trades back-tracking). Conversation first; escalation if needed.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions2 = [
  {
    id: 1,
    question: "What's the role of a labourer on a typical commercial fit-out?",
    options: [
      'Labourers carry out the skilled second-fix work — fitting accessories, hanging doors and finishing surfaces — under the direction of the trades.',
      "Labourers handle site logistics — moving materials, clearing access routes, breaking out spoil and supporting trades with manual handling — reporting up to their own contractor's Foreman.",
      "Labourers supervise the trades and allocate the day's tasks at the morning brief on behalf of the Site Manager.",
      'Labourers inspect and sign off the finished electrical and mechanical installations before hand-over to the client.',
    ],
    correctAnswer: 1,
    explanation:
      "Labourers are a legitimate and valuable part of the workforce. Underestimating them is a common apprentice mistake — they often clear your access route, dispose of your offcuts and shift the materials you need. Treating labourers with respect is the basic professional courtesy and it's also practical: a labourer who likes you helps you out faster.",
  },
  {
    id: 2,
    question:
      'Plant operators on construction sites typically need which two industry-recognised cards?',
    options: [
      'An ECS card and a JIB grading card, the same as the electricians carry on site.',
      'A first-aid certificate and an asbestos-awareness certificate, both renewed annually.',
      'PASMA for mobile tower scaffolds and IPAF for MEWPs (scissor lifts, cherry pickers).',
      'A CSCS card and a Gas Safe registration before they may operate any plant on site.',
    ],
    correctAnswer: 2,
    explanation:
      "PASMA (Prefabricated Access Suppliers' and Manufacturers' Association) and IPAF (International Powered Access Federation) are the two industry standards for tower scaffolds and powered access. CPCS (Construction Plant Competence Scheme) and NPORS cover heavy plant. Operating any of these without the relevant card is a HASAWA s.7 issue (failure to take care) and a PUWER 1998 Reg 9 issue (use of work equipment by competent persons only).",
  },
  {
    id: 3,
    question: 'What is a slinger / signaller on site?',
    options: [
      "A labourer whose job is to sweep out the site and stage materials ready for the next day's lift.",
      "The site manager's deputy, responsible for running the morning brief whenever the manager is away.",
      'An electrician who specialises in fixing cable trays and baskets at high level using a MEWP.',
      'A trained operative who attaches loads to a crane and signals the operator during a LOLER-governed lift.',
    ],
    correctAnswer: 3,
    explanation:
      "Slingers and signallers are critical safety roles on any site with crane operations. LOLER 1998 Reg 8 requires lifts to be properly planned and appropriately supervised. The slinger/signaller is the supervisor at the work face. As an apprentice you should never attach a load or signal a crane without the relevant card — it's outside your competence and it puts everyone underneath the load at risk.",
  },
  {
    id: 4,
    question:
      'Who in the trade workforce do you, as an apprentice electrician, take direct work instructions from on the immediate task?',
    options: [
      "The Approved Electrician you're paired with — they direct the task; the Foreman allocates the pairing.",
      "The main contractor's Site Manager, who sets every operative's tasks directly each morning.",
      "The client's M&E consultant, who briefs each apprentice on their daily work face to face.",
      'Any qualified electrician on site, whichever one happens to be nearest when you need a task.',
    ],
    correctAnswer: 0,
    explanation:
      "Apprentice-pairing with an Approved Electrician is the standard model. The Approved Electrician holds the immediate competence and supervision for your work. The Foreman or Charge-hand sets the pairing each day or each task. Other trades (plumbers, joiners, labourers) co-operate with you under HASAWA s.7(b) but they don't direct your electrical work.",
  },
  {
    id: 5,
    question: 'Under HASAWA s.7, what duties does every employee owe?',
    options: [
      'To provide their own PPE and tools, and to insure themselves against any harm they cause to others on site.',
      "7(a) take reasonable care for self and others; 7(b) co-operate with the employer's safety duties.",
      'To attend every toolbox talk and sign the attendance register, and to report all near-misses within ten days.',
      'To hold a current ECS card and to keep their qualifications and CPD records up to date at all times.',
    ],
    correctAnswer: 1,
    explanation:
      "HASAWA s.7 is the personal duty section that applies to every employee. Section 7(a) is the 'reasonable care' duty — for yourself and for others. Section 7(b) is the 'co-operation' duty — co-operating with your employer's safety arrangements and with the Principal Contractor's. These duties are why a Foreman's instruction has statutory weight and why ignoring a banksman is a personal s.7 breach.",
  },
  {
    id: 6,
    question:
      "What's the role of a Gas Safe registered engineer on a refurbishment that involves a kitchen rewire?",
    options: [
      'They carry out the electrical work on the gas appliances, since gas and electrical work fall under the same competence scheme.',
      'They supervise the electricians during the rewire and sign off the finished electrical installation themselves.',
      'They work the gas appliances and pipework — disconnecting before electrical work, reconnecting after.',
      'They have no role on a rewire and only attend if a new gas supply is being installed from scratch.',
    ],
    correctAnswer: 2,
    explanation:
      "Gas Safe Register is the legal register for gas engineers in Great Britain (under the Gas Safety (Installation and Use) Regulations 1998). Touching gas pipework or appliances without Gas Safe registration is a criminal offence. Co-ordinating with the Gas Safe engineer at first-fix and at re-commissioning is part of the apprentice's awareness — you don't do their work, but you sequence around it.",
  },
  {
    id: 7,
    question:
      "Why does the workspace include 'other trades working above and below you' as a people hazard?",
    options: [
      'Because other trades are competitors for the same work and may try to take over your tasks if you let them.',
      'Because the trades above and below you set the daily programme and you must take your instructions from them.',
      'Because trades working at different levels are paid more than you and the pay difference causes friction in the gang.',
      'Because they create falling-object, dust and noise risk for you, and you create electrical risk for them.',
    ],
    correctAnswer: 3,
    explanation:
      "Apprentices new to commercial work tend to think 'workspace' is the room they're in. On a live fit-out the workspace is three-dimensional. Plumbers cutting overhead, joiners with battery saws, decorators with wet paint and dust sheets, scaffolders moving boards — all of it affects you. The morning brief is when these clashes are flagged.",
  },
  {
    id: 8,
    question: "Who is the apprentice's specific peer group on a typical electrical sub-contract?",
    options: [
      "Other apprentices, the Improvers, the Approved Electrician you're paired with, and your allocated Mentor.",
      'The Project Manager, the Site Manager and the client, who together set your daily learning objectives.',
      "The main contractor's labourers and banksmen, who supervise your work and sign off your portfolio.",
      "The college tutor and the external assessor only, since on-site staff have no role in an apprentice's learning.",
    ],
    correctAnswer: 0,
    explanation:
      "Apprentices learn most from the Approved Electrician they're paired with on the day, calibrate progress with their Mentor monthly and exchange tips with other apprentices and Improvers continuously. Building a relationship with this peer group is what makes the apprenticeship work. Isolating yourself ('I'll just work alone') is a common mistake.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs2 = [
  {
    question:
      'Do labourers really matter on a commercial site, or are they just there for the heavy lifting?',
    answer:
      "Labourers run site logistics — moving materials, clearing access routes, breaking out spoil, sweeping out at end of shift. Without them the skilled trades would spend half their day shifting boxes. Treating labourers with respect is the basic professional courtesy and it's also practical — a labourer who likes you helps you out faster when you need a ladder shifted or your spoil cleared. Underestimating them is a classic apprentice mistake.",
  },
  {
    question: "If I'm an apprentice, can I direct a labourer to help me?",
    answer:
      "Not directly. You can ask politely — 'when you've got a minute, could you give me a hand shifting this drum?' — but you don't 'direct' the labourer because they're not in your chain. Labourers report up to their own contractor's Foreman. If you genuinely need labour support, your own Foreman raises it with the labour gang's Foreman. Apprentices barking instructions at labourers is how site relationships break down.",
  },
  {
    question: "What's a 'tea-boy' and is it still a real role?",
    answer:
      "On older sites there was a junior labourer whose informal job was making the tea round and running errands for the gang. The modern equivalent is more often shared between apprentices and labourers and there's no formal job title for it. The principle still applies — informal site logistics (tea, runs to the bakery, fetching small consumables) tend to fall to the most junior on site. It's part of the culture; it's also not your main job.",
  },
  {
    question: 'Are plant operators usually employed by the main contractor or sub-contracted in?',
    answer:
      "Both. Smaller plant (telehandlers, dumpers) is often hired in with operators from a plant-hire company. Larger plant (tower cranes, mobile cranes) is almost always sub-contracted with its own operator, slinger and banksman. They report up to their own employer for technical and disciplinary matters but co-operate with the Principal Contractor's site management for co-ordination on the day under CDM 2015 Reg 13.",
  },
  {
    question:
      'If a Gas Safe engineer asks me to isolate a circuit so they can work safely, do I have to?',
    answer:
      "Not unless your Foreman has agreed to it. Cross-trade requests for electrical work need to go through your own chain — the Gas Safe engineer talks to your Foreman, your Foreman tasks you. You can be polite and say 'I'll need to check with my Foreman' — that's the right answer. Isolating circuits without authority is a disciplinary issue and a HASAWA s.7(b) co-operation issue (you co-operate via the chain, not around it).",
  },
  {
    question:
      'Why is co-operation between trades treated as a statutory duty rather than just a polite-nice-to-have?',
    answer:
      "HASAWA s.7(b) makes co-operation with safety arrangements a personal statutory duty on every employee — not optional. CDM 2015 Reg 15 reinforces it for construction sites specifically. The reason is that almost every serious incident on a multi-trade site has a 'failure to co-ordinate' element — a trade not knowing what another trade was doing, a sequence error, a hand-over miscommunication. Treating co-operation as a duty is what closes those gaps.",
  },
];

export default function Lesson303_2_1() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Project Manager, Site Manager, Foreman, Charge-hand on the main side; Contracts Manager,
        Project Engineer, Approved Electrician, Mentor on the electrical side. Knowing who
        outranks who saves you a year of awkward conversations.
      </p>

      <TLDR
        points={[
          "Site management splits into two parallel chains — the main contractor's (Project Manager → Site Manager → Foreman) and the electrical contractor's (Contracts Manager → Project Engineer → Foreman/Site Supervisor → Approved Electrician → Apprentice). Each chain runs its own people; the two chains co-ordinate at the top and at the morning brief.",
          "As an apprentice you take work instructions from your own electrical contractor's chain — Foreman or Charge-hand on the day, Approved Electrician for the immediate task. The main contractor's Site Manager co-ordinates between contractors under CDM 2015 Reg 13 but does not give direct instructions to a sub-contractor's apprentice.",
          "Loud isn't senior. The seat at the morning brief, the badge on the hard hat and the title in the chain are what tell you who's actually in charge — not the volume of the voice in the corridor.",
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify the key roles of the site management team.',
          "Distinguish between the Project Manager (PM) and the Site Manager (SM) on the main contractor's side, and the Contracts Manager and Project Engineer on the electrical sub-contractor's side.",
          'Identify the role of the Foreman or Site Supervisor as the work-face leader who allocates trades, runs the morning brief and escalates problems up the chain.',
          'Identify the role of the Charge-hand as a senior trade lead running a gang within the wider electrical workforce.',
          'Identify the role of the Approved Electrician and the Apprentice Mentor in supporting on-site learning and portfolio sign-off.',
          'State the duty under CDM 2015 Reg 8 on the Principal Contractor to plan, manage, monitor and co-ordinate the construction phase, and the duty under Reg 13 to ensure a suitable site induction.',
          'State the duty under HASAWA s.2(2)(a) to provide and maintain safe systems of work, including a clear management and supervisory structure.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Why this matters on day one</ContentEyebrow>

      <ConceptBlock
        title="A site is a chain of command before it is a job"
        plainEnglish="When you arrive on a busy commercial fit-out the noise, the kit and the people can be overwhelming. Underneath all of that is a structured chain of command that decides who gives instructions, who escalates problems and who signs off the work. Knowing the chain is what stops you taking the wrong instruction from the wrong person on day one — and it's also what helps you ask for help in the right place when you need it."
        onSite="The single most useful thing an apprentice can do in their first week is sketch the chain on the back of a notebook. Who's the Site Manager today? Who's our Foreman? Who's the Approved Electrician I'm paired with? Who's our Contracts Manager? Once you've got those four names, you've got the framework. The rest fills in over the following weeks."
      >
        <p>The two parallel chains on a typical commercial fit-out:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Main contractor's chain</strong> — Client → Project Manager (PM) → Site
            Manager (SM) → Foreman / Site Supervisor → trades. The PM is client-facing and rarely
            on site. The SM runs the site day to day. The Foreman runs the work face.
          </li>
          <li>
            <strong>Electrical sub-contractor's chain</strong> — Contracts Manager → Project
            Engineer → Foreman / Site Supervisor → Charge-hand → Approved Electrician →
            Apprentice. The Contracts Manager owns the contract with the main contractor. The
            Foreman is your daily boss.
          </li>
          <li>
            <strong>Where they meet</strong> — at the morning brief (Site Manager runs it, each
            contractor's Foreman attends) and at the weekly site progress meeting (PMs and
            Contracts Managers attend). Day-to-day instructions to apprentices flow down their own
            chain.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Main contractor's side — PM, SM, Foreman, Charge-hand</ContentEyebrow>

      <ConceptBlock
        title="Project Manager — client-facing, programme + budget owner"
        plainEnglish="The Project Manager (PM) is the contractor's commercial face. They own the contract, the programme and the budget. They're the person the client phones when there's a question about money, dates or scope. On a £4m project the PM might run two or three jobs at once and visit each site weekly."
        onSite="You'll rarely deal with the PM directly as an apprentice. You'll see them at progress meetings, hear them mentioned in escalations, and meet them on the rare occasion something has gone seriously wrong. The PM is who the Site Manager reports to and who the Site Manager calls when a programme problem can't be fixed on site."
      >
        <p>What the PM owns:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>The contract</strong> — the agreement with the client setting out the scope,
            the price and the programme. Variations get logged through the PM.
          </li>
          <li>
            <strong>The programme</strong> — the master schedule of trades, deliveries and
            milestones. The PM holds the contractor's commitment to hand-over date.
          </li>
          <li>
            <strong>The budget</strong> — the labour cost, the materials cost and the allowance
            for variations. The PM signs off the monthly valuation to the client.
          </li>
          <li>
            <strong>Client relationship</strong> — weekly progress reports, contractual
            correspondence, dispute resolution. The PM is the diplomatic face of the firm.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Site Manager — daily delivery, runs the site"
        plainEnglish="The Site Manager (SM) runs the site day to day. They do the morning brief, walk the site for safety, co-ordinate between contractors, sign in deliveries, manage welfare and chair the weekly trade meeting. They're on site every day; the PM is not. If the PM is the firm's commercial face, the SM is the firm's operational face."
        onSite="The SM is the most senior person you'll see on a normal day. They typically wear a white hat (on most sites) and carry a clipboard or a tablet. They're the person you greet at sign-in and the person you'd report a serious incident to if your own Foreman wasn't reachable."
      >
        <p>What the SM does on a typical day:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Morning brief</strong> — runs the daily start-of-shift briefing covering day's
            plan, deliveries, hazards and trade clashes. Each contractor's Foreman attends and
            feeds back.
          </li>
          <li>
            <strong>Site walks</strong> — at least two safety walks a day, more on a busy site.
            Spots issues, raises with the relevant contractor's Foreman.
          </li>
          <li>
            <strong>Co-ordination</strong> — under CDM 2015 Reg 13 the Principal Contractor
            co-ordinates the work of all contractors. The SM is who actually does this on the
            ground.
          </li>
          <li>
            <strong>Welfare and discipline</strong> — sign-in, PPE compliance, conduct on site,
            sub-contractor non-compliance. The SM has authority to stop work and to remove
            individuals from site.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Foreman / Site Supervisor — work-face leader"
        plainEnglish="The Foreman (also called Site Supervisor on more modern firms) is the work-face leader. They direct the trades, sign off small works, run the daily morning brief for their own gang, allocate apprentices to electricians, and feed problems up the chain. The Foreman is the only one of the three who is in the work area all day."
        onSite="As an apprentice the Foreman is your direct boss almost every day. They tell you what to work on, who to pair with and how the day is going to flow. When you've got a question — about the work, about the programme, about anything — the Foreman is the first person to ask. They escalate up if they can't answer."
      >
        <p>The Foreman's day-to-day responsibilities:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Allocate trades</strong> — who works on what, in what sequence, paired with
            whom. Apprentice-pairing is a Foreman call.
          </li>
          <li>
            <strong>Run the morning brief</strong> — for their own gang (separate from the main
            contractor's site-wide brief). Day's tasks, hazards, materials.
          </li>
          <li>
            <strong>Sign off small works</strong> — completion of a discrete piece of work. Bigger
            sign-offs (a circuit, a board) go up to the Project Engineer.
          </li>
          <li>
            <strong>Escalate problems</strong> — design queries to the Project Engineer, programme
            issues to the Contracts Manager, safety issues to the main contractor's Site Manager.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Charge-hand — senior trade lead running a gang"
        plainEnglish="On a larger job the Foreman delegates to Charge-hands — typically experienced Approved Electricians who run a gang of three to six on a specific area (a wing, a floor, a system). Each Charge-hand reports up to the Foreman. On a smaller job the Foreman runs the trades directly and there are no Charge-hands."
        onSite="As an apprentice you'll often be paired with a Charge-hand who acts as your day-to-day mentor on top of any formal Apprentice Mentor scheme. The Charge-hand is the person who actually shows you how to do the work and who you spend most of your time with."
      >
        <p>When you'll see a Charge-hand:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            On larger projects (typically over £500k of electrical works) where one Foreman can't
            physically be in every part of the site at once.
          </li>
          <li>
            On long-running jobs where the work splits naturally into zones — a Charge-hand per
            zone keeps the work coherent.
          </li>
          <li>
            On industrial and infrastructure work where each system (lighting, power, data, fire)
            has its own Charge-hand.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks[0].id}
        question={checks[0].question}
        options={checks[0].options}
        correctIndex={checks[0].correctIndex}
        explanation={checks[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>
        Electrical contractor's side — Contracts Manager, Project Engineer, Mentor
      </ContentEyebrow>

      <ConceptBlock
        title="Contracts Manager — owns the contract with the main contractor"
        plainEnglish="The Contracts Manager is the equivalent of the main contractor's Project Manager but on the sub-contractor's side. They own the commercial relationship with the main contractor — the programme, the variations, the labour resourcing, the invoicing. They sit above the Project Engineer and the Foreman, and they often run several jobs in parallel."
        onSite="You'll see the Contracts Manager at the weekly progress meeting and occasionally on site walks. They're the senior decision-maker for the contract — if the main contractor wants to add or remove scope, change the programme or dispute a payment, they go to the Contracts Manager. As an apprentice you'd only deal with them through your Foreman."
      >
        <p>The Contracts Manager's typical week:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Two or three site visits to live jobs.</li>
          <li>The weekly progress meeting at each site.</li>
          <li>Variation pricing and submission to the main contractor.</li>
          <li>
            Labour resourcing — moving electricians and apprentices between jobs as programmes
            shift.
          </li>
          <li>Pre-construction meetings for new tenders won.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Project Engineer — the technical authority"
        plainEnglish="The Project Engineer (sometimes Design Engineer or just Engineer) is the technical desk-based role. They produce or review the design, resolve RFIs (requests for information) from site, calculate cable sizes and protective device settings, and sign off as-installed drawings. They sit above the Foreman in technical authority but below the Contracts Manager in commercial authority."
        onSite="You'll meet the Project Engineer when there's a technical question the Foreman can't answer — 'this cable doesn't fit the containment we've been given', 'the design shows a 32A circuit but the load looks like 40A', 'the room layout has changed and we need a different feed route'. The Project Engineer is the one with the design authority to resolve those questions."
      >
        <p>When the Project Engineer gets called in:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Design queries from the Foreman — anything that requires a re-calculation or a
            deviation from the issued drawings.
          </li>
          <li>
            Co-ordination with the M&E consultant (the client's designer) for technical issues
            that escalate beyond the contractor's scope.
          </li>
          <li>Sign-off of as-installed drawings and completion certificates.</li>
          <li>Pre-commissioning checks and witnessing for larger systems.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Approved Electrician — competence grade and daily pairing"
        plainEnglish="Approved Electrician is a JIB (Joint Industry Board) competence grade — the level above Electrician, awarded after AM2 plus experience and CPD. As an apprentice you'll be paired with an Approved Electrician for almost every task — they direct the work at the immediate face, show you how to do it and check your work before sign-off."
        onSite="The Approved Electrician you're paired with is the person you'll learn from most directly. The Foreman allocates pairings; the Approved Electrician does the on-the-job teaching. They're not formally your Mentor (that's a separate role) but in practice they're your day-to-day teacher."
      >
        <p>JIB grades from bottom to top:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Apprentice</strong> — under indenture, working towards AM2.
          </li>
          <li>
            <strong>Improver</strong> — qualified electrician but pre-AM2, working under Approved
            supervision.
          </li>
          <li>
            <strong>Electrician</strong> — passed AM2, can work without direct supervision on
            routine work.
          </li>
          <li>
            <strong>Approved Electrician</strong> — additional experience and CPD, can supervise
            others and sign off work.
          </li>
          <li>
            <strong>Technician</strong> — additional formal qualifications (often HNC or degree
            level), typically design or commissioning.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Apprentice Mentor — formal workplace teaching role"
        plainEnglish="The Apprentice Mentor is a named experienced electrician (usually Approved or Technician grade) who is formally allocated to support a specific apprentice through the apprenticeship. They sign off portfolio entries, calibrate on-site competence with the college tutor, attend the monthly three-way reviews and act as the first point of escalation for apprentice-specific issues."
        onSite="The Mentor is rarely the same person you're paired with day-to-day — pairings change with the work, but the Mentor stays the same person across the apprenticeship. Once a month or so you sit down with the Mentor to review your portfolio, discuss progress and identify gaps. The college tutor reads the same portfolio."
      >
        <p>The Mentor's responsibilities:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Portfolio sign-off</strong> — reviewing and signing each portfolio entry as
            evidence of on-site competence.
          </li>
          <li>
            <strong>Three-way reviews</strong> — monthly meeting with the apprentice and the
            college tutor (and often the employer's HR or training lead).
          </li>
          <li>
            <strong>Pastoral support</strong> — first point of contact for apprentice- specific
            issues that aren't strictly work-related.
          </li>
          <li>
            <strong>AM2 prep</strong> — calibrating with the college on AM2 readiness and
            identifying any gaps before booking.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Construction (Design and Management) Regulations 2015 — Reg 8 (Principal Contractor — co-ordination)"
        clause={
          <>
            <p className="mb-2">
              <strong>Reg 12(1)</strong> — &quot;The principal contractor must plan, manage and
              monitor the construction phase and co-ordinate matters relating to it to ensure
              that, so far as is reasonably practicable, construction work is carried out without
              risks to health or safety.&quot;
            </p>
            <p>
              <strong>Reg 12(2)</strong> — &quot;In fulfilling the duties in paragraph (1), and in
              particular when (a) design, technical and organisational aspects are being decided
              in order to plan the various items or stages of work which are to take place
              simultaneously or in succession; and (b) estimating the period of time required to
              complete such work or work stages, the principal contractor must take into account
              the general principles of prevention.&quot;
            </p>
          </>
        }
        meaning={
          <>
            The Principal Contractor is the legal entity (almost always the main contractor) that
            owns the duty to co-ordinate the construction phase. The Principal Contractor&apos;s
            Site Manager is who does this on the ground &mdash; the morning brief, the safety
            walks, the trade-clash resolution. As an apprentice you co-operate with the PC&apos;s
            arrangements under Reg 15 (covered later in this course). The PC&apos;s management
            chain is
            therefore not just a contractual hierarchy &mdash; it&apos;s a statutory one.
          </>
        }
        cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 12 — verbatim from legislation.gov.uk."
      />

      <RegsCallout
        source="Construction (Design and Management) Regulations 2015 — Reg 13(4) (PC site induction)"
        clause={
          <>
            &quot;The principal contractor must ensure that &mdash; (a) a suitable site induction
            is provided; (b) the necessary steps are taken to prevent access by unauthorised
            persons to the construction site; and (c) facilities that comply with the requirements
            of Schedule 2 are provided throughout the construction phase.&quot;
          </>
        }
        meaning={
          <>
            The site induction is the formal moment when the PC&apos;s management chain transfers
            safety information to operatives joining the site. As an apprentice this is the
            briefing where you find out who&apos;s the Site Manager, what the site rules are,
            where the welfare is and what the emergency arrangements are. Skipping or sleeping
            through the induction is a CDM Reg 15 breach by you and puts you outside the site
            H&amp;S system on day one.
          </>
        }
        cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 13 — verbatim from legislation.gov.uk."
      />

      <RegsCallout
        source="Health and Safety at Work etc Act 1974 — s.2(2)(a)"
        clause={
          <>
            &quot;Without prejudice to the generality of an employer&apos;s duty under the
            preceding subsection, the matters to which that duty extends include in particular
            &mdash; (a) the provision and maintenance of plant and systems of work that are, so
            far as is reasonably practicable, safe and without risks to health.&quot;
          </>
        }
        meaning={
          <>
            The &quot;safe system of work&quot; duty under HASAWA s.2(2)(a) extends to
            organisational arrangements as well as physical plant. A clear management structure
            with defined supervisory responsibilities is part of the system of work. After an
            incident the HSE inspector asks &quot;who was supervising?&quot; and &quot;who was
            that person reporting to?&quot;. A clear chain answers both questions; an unclear
            chain is treated as evidence of a s.2 breach.
          </>
        }
        cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.2 — verbatim from legislation.gov.uk."
      />

      <InlineCheck
        id={checks[1].id}
        question={checks[1].question}
        options={checks[1].options}
        correctIndex={checks[1].correctIndex}
        explanation={checks[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The two chains side by side</ContentEyebrow>

      <ConceptBlock
        title="Reading the chain — main contractor side, electrical sub-contractor side"
        plainEnglish="On a commercial fit-out you've got two parallel management chains running side by side. The main contractor's chain owns the site overall. The electrical sub-contractor's chain owns the electrical work within it. The two meet at the morning brief and at the weekly progress meeting. Knowing the two chains and where they meet stops you taking the wrong instruction from the wrong person."
        onSite="The card-list below shows the two chains in parallel. Read each one top to bottom. As an apprentice you sit at the bottom of the right-hand (electrical) chain and you take instructions up that chain. The left-hand (main) chain co-ordinates with you via the right-hand chain — they don't reach across."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
              Main contractor's chain
            </div>
            <ol className="space-y-2 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong>Client</strong> — commissions the project, signs the contract.
              </li>
              <li>
                <strong>Project Manager</strong> — contract, programme, budget. Client-facing.
              </li>
              <li>
                <strong>Site Manager</strong> — daily site running. Most senior on site.
              </li>
              <li>
                <strong>Foreman / Site Supervisor</strong> — work-face leader for the main
                contractor's own trades.
              </li>
              <li>
                <strong>Trades</strong> — main contractor's directly-employed workforce.
              </li>
            </ol>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
              Electrical sub-contractor's chain
            </div>
            <ol className="space-y-2 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong>Contracts Manager</strong> — owns the contract with main contractor.
              </li>
              <li>
                <strong>Project Engineer</strong> — technical authority, design and RFIs.
              </li>
              <li>
                <strong>Foreman / Site Supervisor</strong> — runs the electrical work face.
              </li>
              <li>
                <strong>Charge-hand</strong> — senior trade lead, gang of 3 to 6.
              </li>
              <li>
                <strong>Approved Electrician</strong> — daily pairing for the apprentice.
              </li>
              <li>
                <strong>Apprentice (you)</strong> — under indenture, working towards AM2.
              </li>
            </ol>
          </div>
        </div>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Assuming the loudest person on site is the most senior"
        whatHappens={
          <>
            Apprentice on day one mistakes the loud, confident voice in the corridor for the Site
            Manager. Takes an instruction from someone who turns out to be a delivery driver
            chasing a misplaced consignment. Spends an hour helping shift boxes that weren&apos;t
            their problem, misses the actual morning brief, gets a quiet talking-to from their own
            Foreman who had to come looking for them.
          </>
        }
        doInstead={
          <>
            When in doubt, ask politely &mdash; &quot;sorry, who do you work for?&quot; or
            &quot;I&apos;m looking for our Foreman, do you know where they&apos;re based?&quot;
            are perfectly fine questions. Apprentices are expected to ask; it&apos;s how the site
            teaches you. Take instructions only from your own Foreman or from someone they&apos;ve
            specifically delegated to. Loud and confident is not the same as in charge.
          </>
        }
      />

      <CommonMistake
        title="Stepping outside your own chain to take an instruction direct from the main contractor"
        whatHappens={
          <>
            Main contractor&apos;s Site Manager walks past and asks the apprentice to drop their
            containment job and come help carry something heavy upstairs. Apprentice says yes to
            be helpful, drops the work, helps for an hour. Their own Foreman then can&apos;t find
            them and the containment job slips into another trade&apos;s window, causing a
            programme clash. Worse, if there&apos;s an incident on the instructed task, the chain
            of command for any RIDDOR investigation is unclear because the apprentice was acting
            outside their own employer&apos;s instruction.
          </>
        }
        doInstead={
          <>
            Politely say you&apos;ve been tasked by your own supervisor on a different priority,
            and offer to ask your supervisor to come over so the two managers can re-prioritise.
            The main contractor&apos;s SM raising a labour-shortage with your Foreman is the
            correct route. Your Foreman then decides whether to release you, and the chain of
            responsibility stays clean. This is the polite, professional answer almost every time.
          </>
        }
      />

      <Scenario
        title="Day one on a £4m commercial fit-out — who do you actually answer to?"
        situation={
          <>
            You arrive at 7:30am for your first day on a commercial fit-out. The main
            contractor&apos;s Site Manager (white hat, clipboard) signs you in at the gate and
            directs you to the welfare cabin. At 8am there&apos;s a site-wide morning brief run by
            that same Site Manager &mdash; about 40 people in the cabin, every trade on the
            project. After the brief your own electrical contractor&apos;s Foreman pulls your gang
            aside (six electricians and two apprentices, you included) and runs a separate gang
            brief. You&apos;re paired with an Approved Electrician called Sam for the day, working
            on first-fix containment in the third-floor comms room. Mid-morning the main
            contractor&apos;s Site Manager walks past and tells you to drop everything and help
            carry plasterboard. Two hours later your Contracts Manager is on site for the weekly
            progress meeting and asks how you&apos;re finding it.
          </>
        }
        whatToDo={
          <>
            The chain you&apos;re working in:
            <br />
            <br />
            <strong>Day-to-day instructions</strong> &mdash; from Sam (your Approved Electrician
            for the day) for the immediate task, and from your Foreman for anything bigger. Never
            from the main contractor&apos;s Site Manager direct.
            <br />
            <br />
            <strong>The plasterboard ask</strong> &mdash; politely defer, offer to fetch your
            Foreman so the two managers can re-prioritise. Your Foreman decides whether to release
            you. The main contractor&apos;s SM raising a labour issue with your Foreman is the
            correct route.
            <br />
            <br />
            <strong>The morning briefs</strong> &mdash; the site-wide brief is the main
            contractor&apos;s SM transferring co-ordination information (deliveries, trade
            clashes, hazards). Your gang brief is your Foreman translating that into today&apos;s
            tasks for your gang.
            <br />
            <br />
            <strong>The Contracts Manager visit</strong> &mdash; they&apos;re here for the weekly
            progress meeting with the main contractor. Their conversation with you is friendly,
            not commercial. Be honest about how you&apos;re finding it &mdash; they&apos;re your
            senior decision-maker for the contract.
          </>
        }
        whyItMatters={
          <>
            Day one is when the chain gets set in your head. Get it right on day one and
            you&apos;ll never confuse who you answer to. Get it wrong and you&apos;ll spend the
            next month taking instructions from the wrong people, missing your own morning briefs
            and frustrating your Foreman. The chain isn&apos;t bureaucracy &mdash; it&apos;s how
            the site protects you and how the work gets done coherently.
          </>
        }
      />

      <InlineCheck
        id={checks[2].id}
        question={checks[2].question}
        options={checks[2].options}
        correctIndex={checks[2].correctIndex}
        explanation={checks[2].explanation}
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          "A site has two parallel management chains — the main contractor's (PM → SM → Foreman) and the electrical sub-contractor's (Contracts Manager → Project Engineer → Foreman → Charge-hand → Approved Electrician → Apprentice). The two chains meet at the morning brief and the weekly progress meeting.",
          'The Project Manager (PM) is client-facing and owns the contract, programme and budget. They visit site weekly. The Site Manager (SM) runs the site day to day — most senior person on site.',
          "The Foreman (or Site Supervisor) is the work-face leader. They allocate trades, run the gang's morning brief, sign off small works and escalate problems up the chain. As an apprentice the Foreman is your direct boss almost every day.",
          'On the electrical side, the Contracts Manager owns the commercial relationship with the main contractor; the Project Engineer is the technical authority for design and RFIs; the Approved Electrician is your day-to-day pairing; the Mentor is your formal workplace teacher.',
          "Day-to-day instructions flow down your own chain. The main contractor's Site Manager co-ordinates between contractors under CDM 2015 Reg 13 but does not give direct work instructions to a sub-contractor's apprentice — those go through your Foreman.",
          'The loudest voice is rarely the most senior. The seat at the morning brief, the badge on the hard hat and the title in the chain are the reliable signals — not the volume in the corridor.',
          'HASAWA s.2(2)(a) requires safe systems of work, which includes a clear management structure with defined supervisory responsibilities. CDM 2015 Reg 12 places the co-ordination duty on the Principal Contractor; Reg 13 requires a suitable site induction; both flow through the management chain.',
          'Charge-hands appear on larger jobs as a layer between the Foreman and the trades — typically experienced Approved Electricians running a gang of three to six in a specific area. On smaller jobs the Foreman runs the trades directly.',
        ]}
      />

      <Quiz title="Site management team — knowledge check" questions={quizQuestions} />

      {/* ── Prev / next nav ─────────────────────────────────── */}

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Electricians, plumbers, joiners, plasterers, gas-safe engineers, painters, plant
        operators, labourers, banksmen and slingers — the trades and operatives at the work face.
        Each reports up their own contractor's chain.
      </p>

      <TLDR
        points={[
          "The trade workforce on a typical commercial fit-out includes electricians (Apprentice / Improver / Electrician / Approved), plumbers, joiners, plasterers, gas-safe engineers, painters, plant operators, labourers, banksmen and slingers/signallers. Each trade reports up its own contractor's chain to the Principal Contractor's site management.",
          "Your specific peer group as an apprentice is other apprentices, Improvers, the Approved Electrician you're paired with day to day, and the formally-allocated Mentor. The Approved Electrician directs the immediate task; the Foreman allocates the pairing.",
          'Co-operation between trades is a statutory duty — HASAWA s.7(b) on every employee, CDM 2015 Reg 15 on every worker on a construction site. Trade clashes get resolved by conversation first, escalation to a Foreman if needed.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify the key roles of the individuals who report to the site management team.',
          'Identify the trades typically present on a commercial fit-out — electricians, plumbers, joiners, plasterers, gas-safe engineers, painters — and their relationship to one another.',
          'Identify the role of plant operators (PASMA, IPAF, CPCS), labourers, banksmen and slingers/signallers on a construction site.',
          'Identify the JIB grades for electricians (Apprentice / Improver / Electrician / Approved Electrician / Technician) and where the AM2 sits as the line between Improver and Electrician.',
          "Identify the apprentice's specific peer group — Improver, Approved Electrician, Mentor — and the role each plays in day-to-day learning.",
          'State the duty under HASAWA s.7 on every employee to take reasonable care and to co-operate with safety arrangements.',
          "State the duty under CDM 2015 Reg 15 on every worker to co-operate with the Principal Contractor's arrangements and to comply with H&S information.",
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The trades you'll meet on a typical site</ContentEyebrow>

      <ConceptBlock
        title="Trades on a commercial fit-out — the work-face workforce"
        plainEnglish="On a typical £4m commercial fit-out you'll see five to ten trades working in parallel — electricians, plumbers, joiners, plasterers, gas-safe engineers, painters, ceiling fixers, drylines, floor layers and decorators. Each trade is employed by its own contractor (or by the main contractor directly for the smaller trades) and reports up its own contractor's chain. The Principal Contractor's site management co-ordinates the trades but does not employ them all."
        onSite="The morning brief is where you'll see all the trades represented — each trade's Foreman attends, raises issues for their gang and listens for clashes. Walking the site you'll see different colour helmets and hi-vis for different trades and contractors. Knowing which gang each trade belongs to helps when you need to ask for a temporary access shift or a programme adjustment."
      >
        <p>The typical trade list on a commercial fit-out:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Electricians</strong> &mdash; Apprentices, Improvers, Electricians and
            Approved Electricians, working in pairs or small gangs. Containment, cabling,
            terminations, testing and commissioning.
          </li>
          <li>
            <strong>Plumbers</strong> &mdash; hot/cold water, drainage, sometimes heating. Often
            work in parallel with electricians at first-fix and second-fix.
          </li>
          <li>
            <strong>Joiners</strong> &mdash; first-fix carpentry (noggins, studs, door linings),
            second-fix (skirtings, architraves, door hanging) and sometimes built-in furniture.
          </li>
          <li>
            <strong>Plasterers</strong> &mdash; wet plaster on solid walls, taping and jointing on
            plasterboard. Their finish hides your first-fix work — the timing is critical.
          </li>
          <li>
            <strong>Gas-safe engineers</strong> &mdash; gas appliances and pipework. Disconnect
            before electrical work on gas appliances; reconnect and commission afterwards.
          </li>
          <li>
            <strong>Painters and decorators</strong> &mdash; final-finish trade, often the last
            in. Their work is most affected by snags from earlier trades.
          </li>
          <li>
            <strong>Ceiling fixers and drylines</strong> &mdash; suspended ceilings, partitions.
            Cabling above ceilings has to be in before the ceiling tiles go up.
          </li>
          <li>
            <strong>Floor layers</strong> &mdash; vinyl, carpet, tile, raised access flooring in
            office space. Cabling under raised floors is in your gift; the floor layer's follow-on
            schedule depends on you.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>JIB grades for electricians</ContentEyebrow>

      <ConceptBlock
        title="The grade ladder — Apprentice, Improver, Electrician, Approved, Technician"
        plainEnglish="The Joint Industry Board (JIB) sets the competence grades, the working rules and the pay rates for electricians in England, Wales and Northern Ireland (Scotland uses SELECT/SJIB). Grades are evidenced by the ECS (Electrotechnical Certification Scheme) card you carry on site. The grade ladder runs Apprentice → Improver → Electrician → Approved Electrician → Technician. Each step requires formal qualifications plus on-site experience."
        onSite="As an apprentice your ECS card shows 'Apprentice' grade. After AM2 (and the relevant qualifications) you upgrade to Electrician grade. After more experience and CPD (and the JIB's grading criteria) you can apply for Approved. The grade isn't just a title — it determines what work you can do unsupervised, what you can sign off and what you get paid."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
              Apprentice
            </div>
            <p className="text-[13.5px] text-white/85 leading-relaxed">
              Under indenture (apprenticeship contract). Working towards 2365 / NVQ Level 3 / AM2.
              Always supervised by an Approved Electrician. ECS Apprentice card.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
              Improver
            </div>
            <p className="text-[13.5px] text-white/85 leading-relaxed">
              Post-college, pre-AM2. Holds the technical qualifications but has not yet passed
              AM2. Works under Approved Electrician supervision. ECS Improver card.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
              Electrician
            </div>
            <p className="text-[13.5px] text-white/85 leading-relaxed">
              Passed AM2. Can work without direct supervision on routine work. Can supervise
              Apprentices and Improvers. ECS Electrician card. Standard JIB rate.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
              Approved Electrician
            </div>
            <p className="text-[13.5px] text-white/85 leading-relaxed">
              Additional experience and CPD. Can supervise gangs, sign off work, take
              responsibility for testing and certification. ECS Approved card. Higher JIB rate.
              Typical Charge-hand grade.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4 sm:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
              Technician
            </div>
            <p className="text-[13.5px] text-white/85 leading-relaxed">
              Additional formal qualifications (often HNC, HND or degree level) plus Approved
              status. Typical roles: design, commissioning, project engineering, technical
              supervision. ECS Technician card. Senior JIB rate.
            </p>
          </div>
        </div>
      </ConceptBlock>

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Plant operators, labourers, banksmen, slingers</ContentEyebrow>

      <ConceptBlock
        title="Plant operators — PASMA, IPAF, CPCS, NPORS"
        plainEnglish="Plant operators run the powered access and the heavy plant on site. Each type of plant has its own competence scheme. PASMA is for mobile aluminium tower scaffolds. IPAF is for mobile elevating work platforms (MEWPs — scissor lifts and cherry pickers). CPCS and NPORS cover heavy construction plant — excavators, dumpers, telehandlers. Operating any of these without the relevant card is a HASAWA s.7 issue and a PUWER 1998 Reg 9 issue."
        onSite="As an apprentice you'll see plant operators handing over equipment to your gang (a tower scaffold for high-level cabling, a scissor lift for lighting installation). The handover is when the operator briefs your gang on the equipment and the safe working area. You don't operate the plant unless you hold the relevant card — and even then your employer has to authorise the use."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>PASMA</strong> &mdash; tower scaffolds (the lightweight aluminium kit you
            build up to height for short-duration work). Required for assembly and use.
          </li>
          <li>
            <strong>IPAF</strong> &mdash; powered access (scissor lifts, cherry pickers, boom
            lifts). The IPAF PAL card lists the categories you're trained for.
          </li>
          <li>
            <strong>CPCS</strong> &mdash; Construction Plant Competence Scheme. Excavators,
            dumpers, telehandlers, rollers, piling rigs. Categorised by plant type.
          </li>
          <li>
            <strong>NPORS</strong> &mdash; National Plant Operators Registration Scheme. Similar
            coverage to CPCS, accepted on most sites as an alternative.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Labourers — site logistics and the unsung backbone"
        plainEnglish="Labourers handle site logistics — moving materials, clearing access routes, breaking out spoil, sweeping out at end of shift, supporting trades with manual handling. They free up skilled trades to focus on their specialism and they keep the site safe by maintaining access routes. They report up to their own contractor's Foreman, often via a working foreman within the labour gang."
        onSite="Treating labourers with respect is the basic professional courtesy and it's also practical — a labourer who likes you helps you out faster. As an apprentice you might find yourself shifting materials alongside a labour gang at the start of a project; that's normal and useful. Don't bark instructions; ask politely if you need a hand."
      >
        <p>Where labourers fit on a typical day:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Start of shift</strong> &mdash; deliveries unloading, materials staged to work
            areas.
          </li>
          <li>
            <strong>Through the day</strong> &mdash; spoil clearance, access route maintenance,
            ad-hoc heavy lifts for trades.
          </li>
          <li>
            <strong>End of shift</strong> &mdash; sweep-out, waste segregation, securing the site.
          </li>
          <li>
            <strong>Weekly deeper clean</strong> &mdash; preparing the site for the following
            week's trades.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Banksmen, slingers and signallers — vehicle and lift operations"
        plainEnglish="Banksmen (also called traffic marshals) direct vehicle movements on site — reversing tipper trucks, manoeuvring articulated lorries, controlling pedestrian access during a movement. Slingers attach loads to cranes and signallers direct the crane operator. All three roles require formal training and they have site authority to stop pedestrian and vehicle traffic during a movement."
        onSite="When a banksman puts up a hand, you stop. Their signal is binding on you under CDM 2015 Reg 15 (workers must co-operate with the PC's arrangements) and under HASAWA s.7(b). Ignoring a banksman is a fast way off site. Crane lifts have an exclusion zone — if you're inside the zone during a lift, the slinger or signaller is responsible for clearing you out before the lift starts."
      >
        <p>The legal framework:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Workplace Transport guidance (HSG136)</strong> &mdash; HSE guidance on vehicle
            movements on site. Banksmen are the standard control measure.
          </li>
          <li>
            <strong>LOLER 1998</strong> &mdash; Lifting Operations and Lifting Equipment
            Regulations. Reg 8 requires lifts to be properly planned and supervised. The
            slinger/signaller is the supervisor at the work face.
          </li>
          <li>
            <strong>CDM 2015 Reg 13</strong> &mdash; Principal Contractor co-ordinates lift and
            vehicle operations site-wide.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="How the trades interlock — first-fix sequencing on a typical fit-out"
        plainEnglish="On a commercial fit-out the trades follow a rough sequence at first-fix and a different sequence at second-fix. Get the sequence wrong and trades end up working over each other or having to come back. The Foremen across all the trades agree the sequence at the morning brief; the operatives implement it. Knowing roughly where electrical fits in the sequence helps you anticipate clashes."
        onSite="At first-fix the rough order on a typical commercial fit-out is: structural and partition (drylines, joiners), then services first-fix (electrical, plumbing, mechanical, fire, data) running in parallel, then dry-walling closes up. At second-fix the order reverses and gets finer-grained. Your Foreman knows the sequence; if you're unsure where you fit on a given day, ask before pulling cable."
      >
        <p>The typical first-fix sequence on a commercial fit-out:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Structural and partition</strong> &mdash; metal stud framing, timber stud
            framing, ceiling grid suspension. Drylines and joiners.
          </li>
          <li>
            <strong>Containment first-fix</strong> &mdash; tray, basket, conduit, trunking.
            Electrical contractor leading; data and fire alarm often share containment routes.
          </li>
          <li>
            <strong>Cabling first-fix</strong> &mdash; mains, sub-mains, lighting, power, data,
            fire alarm, BMS. Pulled into containment, dressed, marked and terminated at accessory
            boxes.
          </li>
          <li>
            <strong>Mechanical and plumbing first-fix</strong> &mdash; pipework, ductwork,
            cylinder positions. Often parallel with electrical first-fix &mdash; trade-clash
            management is critical here.
          </li>
          <li>
            <strong>Fire-stopping</strong> &mdash; sealing penetrations through fire compartments.
            Often a specialist sub-contractor. Has to be done before the ceilings close up.
          </li>
          <li>
            <strong>Dry-walling close-up</strong> &mdash; plasterboarding the partitions with the
            first-fix services inside.
          </li>
        </ol>
      </ConceptBlock>

      <ConceptBlock
        title="Working alongside apprentices from other trades — peer respect across the trades"
        plainEnglish="On a commercial fit-out you'll meet apprentices from every trade — apprentice plumbers, joiners, plasterers, gas-safe engineers. They're on the same journey as you in their own trade, with their own version of the apprenticeship triangle (College Tutor, Workplace Mentor, Employer). Treating other trades' apprentices with the same respect you'd want from them is part of the professional culture you're learning."
        onSite="Cross-trade apprentice friendships are also a useful informal network — they hear about hazards in their work area before you do, they often know which sub-contractors are good or bad to work alongside, and they're a peer support group through the longer journey of the apprenticeship. Time spent at break or in the welfare cabin getting to know other apprentices is rarely wasted."
      >
        <p>The other trades' apprenticeships you'll encounter:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Plumbing apprentice</strong> &mdash; usually under the Plumbing and Domestic
            Heating apprenticeship standard. Three to four years. Their EPA also involves a
            practical assessment.
          </li>
          <li>
            <strong>Joiner / carpenter apprentice</strong> &mdash; Site Carpentry or Architectural
            Joinery standards. Often three years, with a strong workshop element alongside on-site
            work.
          </li>
          <li>
            <strong>Plasterer apprentice</strong> &mdash; Plasterer apprenticeship standard. Two
            to three years. Heavy reliance on workplace learning because the trade is hand-skill
            intensive.
          </li>
          <li>
            <strong>Gas-safe (heating) apprentice</strong> &mdash; usually a Gas Engineering
            Operative standard. Includes ACS (Accredited Certification Scheme) gas-safety
            assessments.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Construction (Design and Management) Regulations 2015 — Reg 15 (Workers' duties)"
        clause={
          <>
            <p className="mb-2">
              <strong>Reg 15(1)</strong> &mdash; &quot;A worker must &mdash; (a) not carry out
              construction work unless the worker has the skills, knowledge, training and
              experience necessary to carry it out safely and without risk to health, or is in the
              process of obtaining them; (b) report to the person in control of the way
              construction work is carried out anything which the worker is aware is likely to
              endanger the safety or health of the worker or others; and (c) co-operate with any
              other person working on or in connection with the project to enable that person to
              comply with their duties.&quot;
            </p>
            <p>
              <strong>Reg 15(2)</strong> &mdash; &quot;A worker must comply with the requirements
              of regulation 8 in so far as they relate to the performance of any duty assigned to
              them.&quot;
            </p>
          </>
        }
        meaning={
          <>
            Reg 15 is the personal-duty regulation for every worker on a CDM site, including
            apprentices. The three duties under Reg 15(1) are: don&apos;t do work you&apos;re not
            competent for (Reg 15(1)(a) &mdash; this is why apprentices are supervised); report
            hazards to the person in control (your Foreman, ultimately the Principal Contractor)
            under Reg 15(1)(b); and co-operate with everyone else to let them comply with their
            own duties under Reg 15(1)(c). The co-operation duty is what catches the cross-trade
            clashes &mdash; you co-operate with the joiner, the plumber, the labourer and the
            Principal Contractor&apos;s site team.
          </>
        }
        cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 15 — verbatim from legislation.gov.uk."
      />

      <RegsCallout
        source="Health and Safety at Work etc Act 1974 — s.7"
        clause={
          <>
            &quot;It shall be the duty of every employee while at work &mdash; (a) to take
            reasonable care for the health and safety of himself and of other persons who may be
            affected by his acts or omissions at work; and (b) as regards any duty or requirement
            imposed on his employer or any other person by or under any of the relevant statutory
            provisions, to co-operate with him so far as is necessary to enable that duty or
            requirement to be performed or complied with.&quot;
          </>
        }
        meaning={
          <>
            HASAWA s.7 is the personal-duty section that applies to every employee. Section 7(a)
            is &quot;reasonable care&quot; &mdash; for yourself and for others. Section 7(b) is
            the co-operation duty &mdash; co-operating with your employer&apos;s safety
            arrangements and with the Principal Contractor&apos;s arrangements on a CDM site.
            These duties are why a Foreman&apos;s instruction has statutory weight, why ignoring a
            banksman is a personal s.7 breach, and why cross-trade co-operation is not optional.
          </>
        }
        cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.7 — verbatim from legislation.gov.uk."
      />

      <RegsCallout
        source="Equality Act 2010 — s.4 (protected characteristics) and s.39 (employment)"
        clause={
          <>
            <p className="mb-2">
              <strong>s.4</strong> &mdash; &quot;The following characteristics are protected
              characteristics &mdash; age; disability; gender reassignment; marriage and civil
              partnership; pregnancy and maternity; race; religion or belief; sex; sexual
              orientation.&quot;
            </p>
            <p>
              <strong>s.39(2)</strong> &mdash; &quot;An employer (A) must not discriminate against
              an employee of A&apos;s (B) &mdash; (a) as to B&apos;s terms of employment; (b) in
              the way A affords B access, or by not affording B access, to opportunities for
              promotion, transfer or training or for receiving any other benefit, facility or
              service&hellip;&quot;
            </p>
          </>
        }
        meaning={
          <>
            Site banter that crosses into protected characteristics (race, sex, religion,
            disability, sexual orientation, age, etc.) is a personal Equality Act issue for the
            perpetrator and a vicarious-liability issue for the employer. Apprentices arriving on
            site sometimes encounter old habits that need challenging &mdash; the law sits behind
            the challenge. Reporting via your own chain (Mentor, Foreman, Contracts Manager) or
            via the main contractor&apos;s site team is the right route. Banter is not a defence
            to s.39 discrimination.
          </>
        }
        cite="Source: Equality Act 2010 (c.15), Part 2 s.4 and Part 5 s.39 — verbatim from legislation.gov.uk."
      />

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Your specific peer group as an apprentice</ContentEyebrow>

      <ConceptBlock
        title="Improvers, Approved Electricians and Mentor — who you actually learn from"
        plainEnglish="Your peer group as an apprentice is narrower than the whole site workforce. Day to day you work with: other apprentices on the same job (peer learning), Improvers (post-college, pre-AM2 colleagues — they're a year or two ahead of you), the Approved Electrician you're paired with for each task (your immediate supervisor and teacher), and the formally-allocated Mentor (your strategic teacher across the apprenticeship)."
        onSite="Building a relationship with this peer group is what makes the apprenticeship work. Other apprentices share the unspoken bits (how the Foreman likes things done, which suppliers are good for cable, which test sets to avoid). Improvers are recent enough to remember college and old enough to know the work face. The Approved Electrician shows you the trade in real time. The Mentor calibrates the longer arc."
      >
        <p>The four-way peer group:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Other apprentices</strong> &mdash; same year or different years on the same
            job. Peer learning, shared problems, social support.
          </li>
          <li>
            <strong>Improvers</strong> &mdash; recently post-college. Closest in experience to you
            and an excellent source of practical tips that haven&apos;t been forgotten yet.
          </li>
          <li>
            <strong>Approved Electrician (daily pairing)</strong> &mdash; immediate supervisor and
            teacher for the task. Direct feedback, immediate correction, the core of on-the-job
            learning.
          </li>
          <li>
            <strong>Mentor (formal role)</strong> &mdash; strategic teacher across the
            apprenticeship. Portfolio sign-off, three-way reviews, AM2 prep.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating labourers as junior — they often clear your access route"
        whatHappens={
          <>
            Apprentice on day one talks down to the labour gang &mdash; orders rather than asks,
            doesn&apos;t learn the labourers&apos; names, treats them as &quot;not really part of
            the trade&quot;. By week two the labour gang doesn&apos;t go out of their way for that
            apprentice &mdash; access routes don&apos;t get cleared promptly, materials don&apos;t
            get staged where the apprentice expected, spoil sits in the way of first-fix. The
            apprentice spends an hour a day shifting their own gear that should have been moved
            for them.
          </>
        }
        doInstead={
          <>
            Learn the labourers&apos; names. Say good morning. Ask, don&apos;t order. Help them
            when you can &mdash; carrying a heavy box at end of shift earns goodwill that comes
            back to you the next day. Labourers are skilled at what they do (manual handling,
            logistics, materials staging) and they&apos;re your day-to-day peers on site even
            though they&apos;re a different role. Treat them with the respect you&apos;d want from
            them.
          </>
        }
      />

      <CommonMistake
        title="Trying to resolve a trade clash by working faster around the other trade"
        whatHappens={
          <>
            Apprentice and joiner end up needing the same wall section at the same time.
            Apprentice tries to crash through the cabling fast before the joiner notices, cable
            ends up dressed badly, joiner&apos;s noggin goes through the cable later in the day,
            both trades have to come back and fix it, the Foreman has a conversation with the
            apprentice about co-ordination.
          </>
        }
        doInstead={
          <>
            Stop. Talk to the joiner. Agree who goes first or whether the spot can shift slightly.
            If you can&apos;t agree, fetch your Foreman (or the joiner&apos;s Foreman) to mediate
            &mdash; they can re-sequence the work or adjust the programme. CDM 2015 Reg 15(1)(c)
            puts a co-operation duty on you; HASAWA s.7(b) reinforces it. Conversation first;
            escalation if needed. Crashing through is always the worst option.
          </>
        }
      />

      <Scenario
        title="Toolbox talk on a commercial fit-out — who's there and who do you defer to?"
        situation={
          <>
            It&apos;s 7:30am on a commercial fit-out. The toolbox talk for your gang
            (electricians) is in the welfare cabin &mdash; eight people including you, run by your
            Foreman. The talk covers: today&apos;s tasks (third-floor first-fix containment), a
            hazard about a wet bay where a leak was reported overnight, a manual-handling reminder
            for the new 4mm SWA being delivered at 9am, and a sequence note that the joiners need
            the corridor between 11am and 1pm. After the talk you head to the work area.
            You&apos;re paired with an Approved Electrician called Sam. As you start work the
            joiners arrive in the same corridor at 9am instead of 11am.
          </>
        }
        whatToDo={
          <>
            <strong>At the toolbox talk</strong> &mdash; listen, ask questions if anything
            isn&apos;t clear, sign the attendance record. The Foreman runs the talk; the Approved
            Electricians chip in if there&apos;s a technical clarification needed. You don&apos;t
            need to speak unless you&apos;ve got a hazard to flag.
            <br />
            <br />
            <strong>On the manual-handling decision</strong> &mdash; you defer to Sam (your paired
            Approved Electrician) on whether the 4mm SWA needs two people to lift, what kit to use
            and how to stage it. They&apos;ve done it before; you haven&apos;t.
            <br />
            <br />
            <strong>On the joiner clash</strong> &mdash; the joiners arrived early. You don&apos;t
            resolve it yourself &mdash; you flag it to Sam, Sam flags it to the Foreman, the
            Foreman has a conversation with the joiners&apos; Foreman to re-agree the sequence.
            CDM 2015 Reg 15(1)(c) &quot;co-operate&quot; duty in action.
            <br />
            <br />
            <strong>On the wet bay hazard</strong> &mdash; you avoid it until your Foreman or the
            main contractor&apos;s Site Manager confirms it&apos;s been made safe. Reporting
            hazards under Reg 15(1)(b) is your duty too &mdash; if you spot anything else dodgy,
            you tell the Foreman.
          </>
        }
        whyItMatters={
          <>
            The toolbox talk is the formal hand-over of safety information from the Foreman to the
            gang. Trade clashes are normal and are resolved by conversation between the
            trades&apos; Foremen, escalating to the main contractor&apos;s Site Manager if needed.
            You stay in your own chain &mdash; the Approved Electrician for the task, the Foreman
            for the day, escalation up from there. Trying to resolve trade clashes yourself by
            &quot;just working faster&quot; or &quot;just telling the joiner where to go&quot; is
            the most common day-one apprentice mistake.
          </>
        }
      />

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          "The trade workforce on a typical commercial fit-out includes electricians, plumbers, joiners, plasterers, gas-safe engineers, painters, ceiling fixers, drylines and floor layers. Each trade reports up its own contractor's chain to the Principal Contractor's site management.",
          'JIB grades for electricians run Apprentice → Improver → Electrician → Approved Electrician → Technician. AM2 is the line between Improver and Electrician. ECS card evidences the grade and is required on most sites.',
          'Plant operators need the relevant competence card — PASMA for tower scaffolds, IPAF for MEWPs, CPCS or NPORS for heavy plant. Operating plant without the card is a HASAWA s.7 and PUWER 1998 Reg 9 breach.',
          "Labourers handle site logistics — moving materials, clearing access routes, breaking out spoil, supporting trades. They report up to their own contractor's Foreman and they're a legitimate, valuable part of the workforce.",
          'Banksmen direct vehicle movements; slingers attach loads to cranes; signallers direct crane operators. All three have site authority to stop traffic and pedestrians during a movement. Their signal is binding under CDM 2015 Reg 15 and HASAWA s.7(b).',
          "Your apprentice peer group is other apprentices, Improvers, the Approved Electrician you're paired with day to day, and the formally-allocated Mentor. The Approved Electrician directs the immediate task; the Foreman allocates the pairing.",
          'HASAWA s.7 is the personal-duty section: s.7(a) reasonable care, s.7(b) co-operation. CDM 2015 Reg 15 reinforces both for construction sites. Trade clashes are resolved by conversation first, escalation to a Foreman if needed.',
          "Equality Act 2010 protected characteristics apply on site. Site banter that crosses into discrimination is a personal s.39 issue for the perpetrator and a vicarious-liability issue for the employer. Reporting via your own chain or the main contractor's team is the right route.",
        ]}
      />

      <Quiz title="Trades and operatives — knowledge check" questions={quizQuestions2} />

      {/* ── Prev / next nav ─────────────────────────────────── */}
    </div>
  );
}
