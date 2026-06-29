/**
 * Module 5 · Section 1 · Subsection 2 — Individuals reporting to site management
 * Maps to City & Guilds 2365-02 / Unit 210 / LO1 / AC 1.2
 *   AC 1.2 — "Identify the key roles of the individuals that report to the
 *             site management team"
 *
 * Frame: the trades and operatives at the work face. Electricians (Apprentice,
 * Improver, Electrician, Approved), plumbers, joiners, plasterers, gas-safe
 * engineers, painters, plant operators (PASMA + IPAF), labourers, banksmen,
 * slingers/signallers. Each reports up their own contractor's chain to the
 * Principal Contractor's site management. Apprentice's specific peer group:
 * Improver, Approved Electrician, Mentor.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
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
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Individuals reporting to site management (1.2) | Level 2 Module 5.1.2 | Elec-Mate';
const DESCRIPTION =
  'The trades and operatives at the work face — electricians, plumbers, joiners, plasterers, gas-safe engineers, painters, plant operators, labourers, banksmen and slingers. How each reports up their own contractor\'s chain.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s1-sub2-grades',
    question:
      "On the JIB grading structure, what's the difference between an Improver and an Electrician?",
    options: [
      "An Improver is a first-year junior apprentice, while an Electrician has finished college but not yet started work on site.",
      "An Improver has passed AM2 and supervises others, while an Electrician is still working towards the technical qualifications.",
      "An Improver and an Electrician are the same JIB grade under two different names used by different firms.",
      "An Improver holds the technical quals but has not yet passed AM2 and works supervised; an Electrician has passed AM2 and works unsupervised on routine work.",
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
      "Carry on across the bay — you have right of way as a pedestrian and the truck driver must wait for you to clear the area.",
      "Wave back to acknowledge them, then keep walking on your original line so the driver can see where you are heading.",
      "Stop immediately — the banksman is the trained signaller and has authority to stop pedestrians; wait to be waved on.",
      "Ignore the banksman and ask your own Foreman first, since the banksman works for a different contractor on site.",
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
      "Crash through the cabling as fast as you can before the joiner fixes the noggin, so your work is in first and they have to work around you.",
      "Stop, talk it through with the joiner, and if you can't agree, fetch a Foreman to mediate — conversation first, escalation if needed, under the co-operation duty in HASAWA s.7(b).",
      "Insist the joiner moves their noggin because you were working in the room first and cable always takes priority over joinery.",
      "Move your cable yourself without telling anyone and let the joiner carry on, even if it leaves the cable poorly dressed.",
    ],
    correctIndex: 1,
    explanation:
      "Trade clashes are the most common day-to-day issue at first-fix. CDM 2015 Reg 8 and Reg 13 put a co-ordination duty on the Principal Contractor, but the practical resolution at the work face is conversation between the two trades. HASAWA s.7(b) requires every operative to co-operate with safety arrangements, and a clash that's not resolved becomes a safety issue (cables damaged, joinery weakened, both trades back-tracking). Conversation first; escalation if needed.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the role of a labourer on a typical commercial fit-out?",
    options: [
      "Labourers carry out the skilled second-fix work — fitting accessories, hanging doors and finishing surfaces — under the direction of the trades.",
      "Labourers handle site logistics — moving materials, clearing access routes, breaking out spoil and supporting trades with manual handling — reporting up to their own contractor's Foreman.",
      "Labourers supervise the trades and allocate the day's tasks at the morning brief on behalf of the Site Manager.",
      "Labourers inspect and sign off the finished electrical and mechanical installations before hand-over to the client.",
    ],
    correctAnswer: 1,
    explanation:
      "Labourers are a legitimate and valuable part of the workforce. Underestimating them is a common apprentice mistake — they often clear your access route, dispose of your offcuts and shift the materials you need. Treating labourers with respect is the basic professional courtesy and it's also practical: a labourer who likes you helps you out faster.",
  },
  {
    id: 2,
    question:
      "Plant operators on construction sites typically need which two industry-recognised cards?",
    options: [
      "An ECS card and a JIB grading card, the same as the electricians carry on site.",
      "A first-aid certificate and an asbestos-awareness certificate, both renewed annually.",
      "PASMA for mobile tower scaffolds and IPAF for MEWPs (scissor lifts, cherry pickers).",
      "A CSCS card and a Gas Safe registration before they may operate any plant on site.",
    ],
    correctAnswer: 2,
    explanation:
      "PASMA (Prefabricated Access Suppliers' and Manufacturers' Association) and IPAF (International Powered Access Federation) are the two industry standards for tower scaffolds and powered access. CPCS (Construction Plant Competence Scheme) and NPORS cover heavy plant. Operating any of these without the relevant card is a HASAWA s.7 issue (failure to take care) and a PUWER 1998 Reg 9 issue (use of work equipment by competent persons only).",
  },
  {
    id: 3,
    question:
      "What is a slinger / signaller on site?",
    options: [
      "A labourer whose job is to sweep out the site and stage materials ready for the next day's lift.",
      "The site manager's deputy, responsible for running the morning brief whenever the manager is away.",
      "An electrician who specialises in fixing cable trays and baskets at high level using a MEWP.",
      "A trained operative who attaches loads to a crane and signals the operator during a LOLER-governed lift.",
    ],
    correctAnswer: 3,
    explanation:
      "Slingers and signallers are critical safety roles on any site with crane operations. LOLER 1998 Reg 8 requires lifts to be properly planned and appropriately supervised. The slinger/signaller is the supervisor at the work face. As an apprentice you should never attach a load or signal a crane without the relevant card — it's outside your competence and it puts everyone underneath the load at risk.",
  },
  {
    id: 4,
    question:
      "Who in the trade workforce do you, as an apprentice electrician, take direct work instructions from on the immediate task?",
    options: [
      "The Approved Electrician you're paired with — they direct the task; the Foreman allocates the pairing.",
      "The main contractor's Site Manager, who sets every operative's tasks directly each morning.",
      "The client's M&E consultant, who briefs each apprentice on their daily work face to face.",
      "Any qualified electrician on site, whichever one happens to be nearest when you need a task.",
    ],
    correctAnswer: 0,
    explanation:
      "Apprentice-pairing with an Approved Electrician is the standard model. The Approved Electrician holds the immediate competence and supervision for your work. The Foreman or Charge-hand sets the pairing each day or each task. Other trades (plumbers, joiners, labourers) co-operate with you under HASAWA s.7(b) but they don't direct your electrical work.",
  },
  {
    id: 5,
    question:
      "Under HASAWA s.7, what duties does every employee owe?",
    options: [
      "To provide their own PPE and tools, and to insure themselves against any harm they cause to others on site.",
      "7(a) take reasonable care for self and others; 7(b) co-operate with the employer's safety duties.",
      "To attend every toolbox talk and sign the attendance register, and to report all near-misses within ten days.",
      "To hold a current ECS card and to keep their qualifications and CPD records up to date at all times.",
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
      "They carry out the electrical work on the gas appliances, since gas and electrical work fall under the same competence scheme.",
      "They supervise the electricians during the rewire and sign off the finished electrical installation themselves.",
      "They work the gas appliances and pipework — disconnecting before electrical work, reconnecting after.",
      "They have no role on a rewire and only attend if a new gas supply is being installed from scratch.",
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
      "Because other trades are competitors for the same work and may try to take over your tasks if you let them.",
      "Because the trades above and below you set the daily programme and you must take your instructions from them.",
      "Because trades working at different levels are paid more than you and the pay difference causes friction in the gang.",
      "Because they create falling-object, dust and noise risk for you, and you create electrical risk for them.",
    ],
    correctAnswer: 3,
    explanation:
      "Apprentices new to commercial work tend to think 'workspace' is the room they're in. On a live fit-out the workspace is three-dimensional. Plumbers cutting overhead, joiners with battery saws, decorators with wet paint and dust sheets, scaffolders moving boards — all of it affects you. The morning brief is when these clashes are flagged.",
  },
  {
    id: 8,
    question:
      "Who is the apprentice's specific peer group on a typical electrical sub-contract?",
    options: [
      "Other apprentices, the Improvers, the Approved Electrician you're paired with, and your allocated Mentor.",
      "The Project Manager, the Site Manager and the client, who together set your daily learning objectives.",
      "The main contractor's labourers and banksmen, who supervise your work and sign off your portfolio.",
      "The college tutor and the external assessor only, since on-site staff have no role in an apprentice's learning.",
    ],
    correctAnswer: 0,
    explanation:
      "Apprentices learn most from the Approved Electrician they're paired with on the day, calibrate progress with their Mentor monthly and exchange tips with other apprentices and Improvers continuously. Building a relationship with this peer group is what makes the apprenticeship work. Isolating yourself ('I'll just work alone') is a common mistake.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Do labourers really matter on a commercial site, or are they just there for the heavy lifting?",
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
    question: "Are plant operators usually employed by the main contractor or sub-contracted in?",
    answer:
      "Both. Smaller plant (telehandlers, dumpers) is often hired in with operators from a plant-hire company. Larger plant (tower cranes, mobile cranes) is almost always sub-contracted with its own operator, slinger and banksman. They report up to their own employer for technical and disciplinary matters but co-operate with the Principal Contractor's site management for co-ordination on the day under CDM 2015 Reg 13.",
  },
  {
    question: "If a Gas Safe engineer asks me to isolate a circuit so they can work safely, do I have to?",
    answer:
      "Not unless your Foreman has agreed to it. Cross-trade requests for electrical work need to go through your own chain — the Gas Safe engineer talks to your Foreman, your Foreman tasks you. You can be polite and say 'I'll need to check with my Foreman' — that's the right answer. Isolating circuits without authority is a disciplinary issue and a HASAWA s.7(b) co-operation issue (you co-operate via the chain, not around it).",
  },
  {
    question: "Why is co-operation between trades treated as a statutory duty rather than just a polite-nice-to-have?",
    answer:
      "HASAWA s.7(b) makes co-operation with safety arrangements a personal statutory duty on every employee — not optional. CDM 2015 Reg 15 reinforces it for construction sites specifically. The reason is that almost every serious incident on a multi-trade site has a 'failure to co-ordinate' element — a trade not knowing what another trade was doing, a sequence error, a hand-over miscommunication. Treating co-operation as a duty is what closes those gaps.",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 5 · Section 1 · Subsection 2"
            title="Individuals reporting to site management"
            description="Electricians, plumbers, joiners, plasterers, gas-safe engineers, painters, plant operators, labourers, banksmen and slingers — the trades and operatives at the work face. Each reports up their own contractor's chain."
            tone="emerald"
          />

          <TLDR
            points={[
              "The trade workforce on a typical commercial fit-out includes electricians (Apprentice / Improver / Electrician / Approved), plumbers, joiners, plasterers, gas-safe engineers, painters, plant operators, labourers, banksmen and slingers/signallers. Each trade reports up its own contractor's chain to the Principal Contractor's site management.",
              "Your specific peer group as an apprentice is other apprentices, Improvers, the Approved Electrician you're paired with day to day, and the formally-allocated Mentor. The Approved Electrician directs the immediate task; the Foreman allocates the pairing.",
              "Co-operation between trades is a statutory duty — HASAWA s.7(b) on every employee, CDM 2015 Reg 15 on every worker on a construction site. Trade clashes get resolved by conversation first, escalation to a Foreman if needed.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the key roles of the individuals that report to the site management team (Unit 210 LO1 AC 1.2 — verbatim from City & Guilds 2365-02 specification).",
              "Identify the trades typically present on a commercial fit-out — electricians, plumbers, joiners, plasterers, gas-safe engineers, painters — and their relationship to one another.",
              "Identify the role of plant operators (PASMA, IPAF, CPCS), labourers, banksmen and slingers/signallers on a construction site.",
              "Identify the JIB grades for electricians (Apprentice / Improver / Electrician / Approved Electrician / Technician) and where the AM2 sits as the line between Improver and Electrician.",
              "Identify the apprentice's specific peer group — Improver, Approved Electrician, Mentor — and the role each plays in day-to-day learning.",
              "State the duty under HASAWA s.7 on every employee to take reasonable care and to co-operate with safety arrangements.",
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
            <p>
              The typical trade list on a commercial fit-out:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electricians</strong> &mdash; Apprentices, Improvers, Electricians and
                Approved Electricians, working in pairs or small gangs. Containment, cabling,
                terminations, testing and commissioning.
              </li>
              <li>
                <strong>Plumbers</strong> &mdash; hot/cold water, drainage, sometimes heating.
                Often work in parallel with electricians at first-fix and second-fix.
              </li>
              <li>
                <strong>Joiners</strong> &mdash; first-fix carpentry (noggins, studs, door linings),
                second-fix (skirtings, architraves, door hanging) and sometimes built-in furniture.
              </li>
              <li>
                <strong>Plasterers</strong> &mdash; wet plaster on solid walls, taping and jointing
                on plasterboard. Their finish hides your first-fix work — the timing is critical.
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
                <strong>Floor layers</strong> &mdash; vinyl, carpet, tile, raised access flooring
                in office space. Cabling under raised floors is in your gift; the floor layer's
                follow-on schedule depends on you.
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
                  Under indenture (apprenticeship contract). Working towards 2365 / NVQ Level 3 /
                  AM2. Always supervised by an Approved Electrician. ECS Apprentice card.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Improver
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Post-college, pre-AM2. Holds the technical qualifications but has not yet
                  passed AM2. Works under Approved Electrician supervision. ECS Improver card.
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
                  responsibility for testing and certification. ECS Approved card. Higher JIB
                  rate. Typical Charge-hand grade.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4 sm:col-span-2">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Technician
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Additional formal qualifications (often HNC, HND or degree level) plus
                  Approved status. Typical roles: design, commissioning, project engineering,
                  technical supervision. ECS Technician card. Senior JIB rate.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
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
                <strong>NPORS</strong> &mdash; National Plant Operators Registration Scheme.
                Similar coverage to CPCS, accepted on most sites as an alternative.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Labourers — site logistics and the unsung backbone"
            plainEnglish="Labourers handle site logistics — moving materials, clearing access routes, breaking out spoil, sweeping out at end of shift, supporting trades with manual handling. They free up skilled trades to focus on their specialism and they keep the site safe by maintaining access routes. They report up to their own contractor's Foreman, often via a working foreman within the labour gang."
            onSite="Treating labourers with respect is the basic professional courtesy and it's also practical — a labourer who likes you helps you out faster. As an apprentice you might find yourself shifting materials alongside a labour gang at the start of a project; that's normal and useful. Don't bark instructions; ask politely if you need a hand."
          >
            <p>
              Where labourers fit on a typical day:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Start of shift</strong> &mdash; deliveries unloading, materials staged
                to work areas.
              </li>
              <li>
                <strong>Through the day</strong> &mdash; spoil clearance, access route
                maintenance, ad-hoc heavy lifts for trades.
              </li>
              <li>
                <strong>End of shift</strong> &mdash; sweep-out, waste segregation, securing the
                site.
              </li>
              <li>
                <strong>Weekly deeper clean</strong> &mdash; preparing the site for the
                following week's trades.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Banksmen, slingers and signallers — vehicle and lift operations"
            plainEnglish="Banksmen (also called traffic marshals) direct vehicle movements on site — reversing tipper trucks, manoeuvring articulated lorries, controlling pedestrian access during a movement. Slingers attach loads to cranes and signallers direct the crane operator. All three roles require formal training and they have site authority to stop pedestrian and vehicle traffic during a movement."
            onSite="When a banksman puts up a hand, you stop. Their signal is binding on you under CDM 2015 Reg 15 (workers must co-operate with the PC's arrangements) and under HASAWA s.7(b). Ignoring a banksman is a fast way off site. Crane lifts have an exclusion zone — if you're inside the zone during a lift, the slinger or signaller is responsible for clearing you out before the lift starts."
          >
            <p>
              The legal framework:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Workplace Transport guidance (HSG136)</strong> &mdash; HSE guidance on
                vehicle movements on site. Banksmen are the standard control measure.
              </li>
              <li>
                <strong>LOLER 1998</strong> &mdash; Lifting Operations and Lifting Equipment
                Regulations. Reg 8 requires lifts to be properly planned and supervised. The
                slinger/signaller is the supervisor at the work face.
              </li>
              <li>
                <strong>CDM 2015 Reg 13</strong> &mdash; Principal Contractor co-ordinates lift
                and vehicle operations site-wide.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="How the trades interlock — first-fix sequencing on a typical fit-out"
            plainEnglish="On a commercial fit-out the trades follow a rough sequence at first-fix and a different sequence at second-fix. Get the sequence wrong and trades end up working over each other or having to come back. The Foremen across all the trades agree the sequence at the morning brief; the operatives implement it. Knowing roughly where electrical fits in the sequence helps you anticipate clashes."
            onSite="At first-fix the rough order on a typical commercial fit-out is: structural and partition (drylines, joiners), then services first-fix (electrical, plumbing, mechanical, fire, data) running in parallel, then dry-walling closes up. At second-fix the order reverses and gets finer-grained. Your Foreman knows the sequence; if you're unsure where you fit on a given day, ask before pulling cable."
          >
            <p>
              The typical first-fix sequence on a commercial fit-out:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Structural and partition</strong> &mdash; metal stud framing, timber
                stud framing, ceiling grid suspension. Drylines and joiners.
              </li>
              <li>
                <strong>Containment first-fix</strong> &mdash; tray, basket, conduit, trunking.
                Electrical contractor leading; data and fire alarm often share containment routes.
              </li>
              <li>
                <strong>Cabling first-fix</strong> &mdash; mains, sub-mains, lighting, power, data,
                fire alarm, BMS. Pulled into containment, dressed, marked and terminated at
                accessory boxes.
              </li>
              <li>
                <strong>Mechanical and plumbing first-fix</strong> &mdash; pipework, ductwork,
                cylinder positions. Often parallel with electrical first-fix &mdash; trade-clash
                management is critical here.
              </li>
              <li>
                <strong>Fire-stopping</strong> &mdash; sealing penetrations through fire
                compartments. Often a specialist sub-contractor. Has to be done before the
                ceilings close up.
              </li>
              <li>
                <strong>Dry-walling close-up</strong> &mdash; plasterboarding the partitions
                with the first-fix services inside.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="Working alongside apprentices from other trades — peer respect across the trades"
            plainEnglish="On a commercial fit-out you'll meet apprentices from every trade — apprentice plumbers, joiners, plasterers, gas-safe engineers. They're on the same journey as you in their own trade, with their own version of the apprenticeship triangle (College Tutor, Workplace Mentor, Employer). Treating other trades' apprentices with the same respect you'd want from them is part of the professional culture you're learning."
            onSite="Cross-trade apprentice friendships are also a useful informal network — they hear about hazards in their work area before you do, they often know which sub-contractors are good or bad to work alongside, and they're a peer support group through the longer journey of the apprenticeship. Time spent at break or in the welfare cabin getting to know other apprentices is rarely wasted."
          >
            <p>
              The other trades' apprenticeships you'll encounter:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Plumbing apprentice</strong> &mdash; usually under the Plumbing and
                Domestic Heating apprenticeship standard. Three to four years. Their EPA also
                involves a practical assessment.
              </li>
              <li>
                <strong>Joiner / carpenter apprentice</strong> &mdash; Site Carpentry or
                Architectural Joinery standards. Often three years, with a strong workshop
                element alongside on-site work.
              </li>
              <li>
                <strong>Plasterer apprentice</strong> &mdash; Plasterer apprenticeship standard.
                Two to three years. Heavy reliance on workplace learning because the trade is
                hand-skill intensive.
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
                  experience necessary to carry it out safely and without risk to health, or is
                  in the process of obtaining them; (b) report to the person in control of the
                  way construction work is carried out anything which the worker is aware is
                  likely to endanger the safety or health of the worker or others; and (c)
                  co-operate with any other person working on or in connection with the project
                  to enable that person to comply with their duties.&quot;
                </p>
                <p>
                  <strong>Reg 15(2)</strong> &mdash; &quot;A worker must comply with the
                  requirements of regulation 8 in so far as they relate to the performance of
                  any duty assigned to them.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Reg 15 is the personal-duty regulation for every worker on a CDM site, including
                apprentices. The three duties under Reg 15(1) are: don&apos;t do work you&apos;re
                not competent for (Reg 15(1)(a) &mdash; this is why apprentices are supervised);
                report hazards to the person in control (your Foreman, ultimately the Principal
                Contractor) under Reg 15(1)(b); and co-operate with everyone else to let them
                comply with their own duties under Reg 15(1)(c). The co-operation duty is what
                catches the cross-trade clashes &mdash; you co-operate with the joiner, the
                plumber, the labourer and the Principal Contractor&apos;s site team.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 15 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.7"
            clause={
              <>
                &quot;It shall be the duty of every employee while at work &mdash; (a) to take
                reasonable care for the health and safety of himself and of other persons who
                may be affected by his acts or omissions at work; and (b) as regards any duty or
                requirement imposed on his employer or any other person by or under any of the
                relevant statutory provisions, to co-operate with him so far as is necessary to
                enable that duty or requirement to be performed or complied with.&quot;
              </>
            }
            meaning={
              <>
                HASAWA s.7 is the personal-duty section that applies to every employee. Section
                7(a) is &quot;reasonable care&quot; &mdash; for yourself and for others. Section
                7(b) is the co-operation duty &mdash; co-operating with your employer&apos;s
                safety arrangements and with the Principal Contractor&apos;s arrangements on a
                CDM site. These duties are why a Foreman&apos;s instruction has statutory
                weight, why ignoring a banksman is a personal s.7 breach, and why
                cross-trade co-operation is not optional.
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
                  <strong>s.39(2)</strong> &mdash; &quot;An employer (A) must not discriminate
                  against an employee of A&apos;s (B) &mdash; (a) as to B&apos;s terms of
                  employment; (b) in the way A affords B access, or by not affording B access, to
                  opportunities for promotion, transfer or training or for receiving any other
                  benefit, facility or service&hellip;&quot;
                </p>
              </>
            }
            meaning={
              <>
                Site banter that crosses into protected characteristics (race, sex, religion,
                disability, sexual orientation, age, etc.) is a personal Equality Act issue for
                the perpetrator and a vicarious-liability issue for the employer. Apprentices
                arriving on site sometimes encounter old habits that need challenging &mdash; the
                law sits behind the challenge. Reporting via your own chain (Mentor, Foreman,
                Contracts Manager) or via the main contractor&apos;s site team is the right
                route. Banter is not a defence to s.39 discrimination.
              </>
            }
            cite="Source: Equality Act 2010 (c.15), Part 2 s.4 and Part 5 s.39 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Your specific peer group as an apprentice</ContentEyebrow>

          <ConceptBlock
            title="Improvers, Approved Electricians and Mentor — who you actually learn from"
            plainEnglish="Your peer group as an apprentice is narrower than the whole site workforce. Day to day you work with: other apprentices on the same job (peer learning), Improvers (post-college, pre-AM2 colleagues — they're a year or two ahead of you), the Approved Electrician you're paired with for each task (your immediate supervisor and teacher), and the formally-allocated Mentor (your strategic teacher across the apprenticeship)."
            onSite="Building a relationship with this peer group is what makes the apprenticeship work. Other apprentices share the unspoken bits (how the Foreman likes things done, which suppliers are good for cable, which test sets to avoid). Improvers are recent enough to remember college and old enough to know the work face. The Approved Electrician shows you the trade in real time. The Mentor calibrates the longer arc."
          >
            <p>
              The four-way peer group:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Other apprentices</strong> &mdash; same year or different years on the
                same job. Peer learning, shared problems, social support.
              </li>
              <li>
                <strong>Improvers</strong> &mdash; recently post-college. Closest in experience
                to you and an excellent source of practical tips that haven&apos;t been
                forgotten yet.
              </li>
              <li>
                <strong>Approved Electrician (daily pairing)</strong> &mdash; immediate
                supervisor and teacher for the task. Direct feedback, immediate correction, the
                core of on-the-job learning.
              </li>
              <li>
                <strong>Mentor (formal role)</strong> &mdash; strategic teacher across the
                apprenticeship. Portfolio sign-off, three-way reviews, AM2 prep. Covered in
                detail in Sub 5.
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
                doesn&apos;t learn the labourers&apos; names, treats them as &quot;not really part
                of the trade&quot;. By week two the labour gang doesn&apos;t go out of their way
                for that apprentice &mdash; access routes don&apos;t get cleared promptly,
                materials don&apos;t get staged where the apprentice expected, spoil sits in the
                way of first-fix. The apprentice spends an hour a day shifting their own gear
                that should have been moved for them.
              </>
            }
            doInstead={
              <>
                Learn the labourers&apos; names. Say good morning. Ask, don&apos;t order. Help
                them when you can &mdash; carrying a heavy box at end of shift earns goodwill
                that comes back to you the next day. Labourers are skilled at what they do
                (manual handling, logistics, materials staging) and they&apos;re your day-to-day
                peers on site even though they&apos;re a different role. Treat them with the
                respect you&apos;d want from them.
              </>
            }
          />

          <CommonMistake
            title="Trying to resolve a trade clash by working faster around the other trade"
            whatHappens={
              <>
                Apprentice and joiner end up needing the same wall section at the same time.
                Apprentice tries to crash through the cabling fast before the joiner notices,
                cable ends up dressed badly, joiner&apos;s noggin goes through the cable later
                in the day, both trades have to come back and fix it, the Foreman has a
                conversation with the apprentice about co-ordination.
              </>
            }
            doInstead={
              <>
                Stop. Talk to the joiner. Agree who goes first or whether the spot can shift
                slightly. If you can&apos;t agree, fetch your Foreman (or the joiner&apos;s
                Foreman) to mediate &mdash; they can re-sequence the work or adjust the
                programme. CDM 2015 Reg 15(1)(c) puts a co-operation duty on you; HASAWA s.7(b)
                reinforces it. Conversation first; escalation if needed. Crashing through is
                always the worst option.
              </>
            }
          />

          <Scenario
            title="Toolbox talk on a commercial fit-out — who's there and who do you defer to?"
            situation={
              <>
                It&apos;s 7:30am on a commercial fit-out. The toolbox talk for your gang
                (electricians) is in the welfare cabin &mdash; eight people including you, run
                by your Foreman. The talk covers: today&apos;s tasks (third-floor first-fix
                containment), a hazard about a wet bay where a leak was reported overnight, a
                manual-handling reminder for the new 4mm SWA being delivered at 9am, and a
                sequence note that the joiners need the corridor between 11am and 1pm. After
                the talk you head to the work area. You&apos;re paired with an Approved
                Electrician called Sam. As you start work the joiners arrive in the same
                corridor at 9am instead of 11am.
              </>
            }
            whatToDo={
              <>
                <strong>At the toolbox talk</strong> &mdash; listen, ask questions if anything
                isn&apos;t clear, sign the attendance record. The Foreman runs the talk; the
                Approved Electricians chip in if there&apos;s a technical clarification needed.
                You don&apos;t need to speak unless you&apos;ve got a hazard to flag.
                <br /><br />
                <strong>On the manual-handling decision</strong> &mdash; you defer to Sam (your
                paired Approved Electrician) on whether the 4mm SWA needs two people to lift,
                what kit to use and how to stage it. They&apos;ve done it before; you
                haven&apos;t.
                <br /><br />
                <strong>On the joiner clash</strong> &mdash; the joiners arrived early. You
                don&apos;t resolve it yourself &mdash; you flag it to Sam, Sam flags it to the
                Foreman, the Foreman has a conversation with the joiners&apos; Foreman to
                re-agree the sequence. CDM 2015 Reg 15(1)(c) &quot;co-operate&quot; duty in
                action.
                <br /><br />
                <strong>On the wet bay hazard</strong> &mdash; you avoid it until your Foreman
                or the main contractor&apos;s Site Manager confirms it&apos;s been made safe.
                Reporting hazards under Reg 15(1)(b) is your duty too &mdash; if you spot anything
                else dodgy, you tell the Foreman.
              </>
            }
            whyItMatters={
              <>
                The toolbox talk is the formal hand-over of safety information from the Foreman
                to the gang. Trade clashes are normal and are resolved by conversation between
                the trades&apos; Foremen, escalating to the main contractor&apos;s Site Manager
                if needed. You stay in your own chain &mdash; the Approved Electrician for the
                task, the Foreman for the day, escalation up from there. Trying to resolve trade
                clashes yourself by &quot;just working faster&quot; or &quot;just telling the
                joiner where to go&quot; is the most common day-one apprentice mistake.
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
              "The trade workforce on a typical commercial fit-out includes electricians, plumbers, joiners, plasterers, gas-safe engineers, painters, ceiling fixers, drylines and floor layers. Each trade reports up its own contractor's chain to the Principal Contractor's site management.",
              "JIB grades for electricians run Apprentice → Improver → Electrician → Approved Electrician → Technician. AM2 is the line between Improver and Electrician. ECS card evidences the grade and is required on most sites.",
              "Plant operators need the relevant competence card — PASMA for tower scaffolds, IPAF for MEWPs, CPCS or NPORS for heavy plant. Operating plant without the card is a HASAWA s.7 and PUWER 1998 Reg 9 breach.",
              "Labourers handle site logistics — moving materials, clearing access routes, breaking out spoil, supporting trades. They report up to their own contractor's Foreman and they're a legitimate, valuable part of the workforce.",
              "Banksmen direct vehicle movements; slingers attach loads to cranes; signallers direct crane operators. All three have site authority to stop traffic and pedestrians during a movement. Their signal is binding under CDM 2015 Reg 15 and HASAWA s.7(b).",
              "Your apprentice peer group is other apprentices, Improvers, the Approved Electrician you're paired with day to day, and the formally-allocated Mentor. The Approved Electrician directs the immediate task; the Foreman allocates the pairing.",
              "HASAWA s.7 is the personal-duty section: s.7(a) reasonable care, s.7(b) co-operation. CDM 2015 Reg 15 reinforces both for construction sites. Trade clashes are resolved by conversation first, escalation to a Foreman if needed.",
              "Equality Act 2010 protected characteristics apply on site. Site banter that crosses into discrimination is a personal s.39 issue for the perpetrator and a vicarious-liability issue for the employer. Reporting via your own chain or the main contractor's team is the right route.",
            ]}
          />

          <Quiz title="Trades and operatives — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section1/1-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.1 Site management team key roles
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section1/1-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.3 Site visitors key roles
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
