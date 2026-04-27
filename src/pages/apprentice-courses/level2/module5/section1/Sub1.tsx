/**
 * Module 5 · Section 1 · Subsection 1 — Site management team key roles
 * Maps to City & Guilds 2365-02 / Unit 210 / LO1 / AC 1.1
 *   AC 1.1 — "Identify the key roles of the site management team"
 *
 * Frame: a site is a chain of command before it is a job. The management
 * team sits between the client and the work face — Project Manager owns
 * the programme and budget, Site Manager runs the site day to day, the
 * Foreman directs the trades at the work face. On the electrical side
 * there's a parallel chain — Contracts Manager, Project Engineer,
 * Approved Electrician, Apprentice Mentor — all of whom you actually
 * answer to before the main contractor's chain.
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
  'Site management team key roles (1.1) | Level 2 Module 5.1.1 | Elec-Mate';
const DESCRIPTION =
  'Project Manager, Site Manager, Foreman and Charge-hand on the main contractor side; Contracts Manager, Project Engineer, Approved Electrician and Mentor on the electrical side. Who outranks who and who you actually answer to.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s1-sub1-chain',
    question:
      "It's your first day on a commercial fit-out. The main contractor's Site Manager walks past the welfare cabin and tells you to drop everything and help carry plasterboard up to the second floor. Your own electrical contractor's Site Supervisor has just briefed you to first-fix containment in the comms room. What's the right move?",
    options: [
      "Drop the containment work and carry plasterboard — the main contractor's Site Manager outranks your supervisor.",
      "Politely tell the Site Manager you've been tasked by your own supervisor on a different priority, and offer to ask your supervisor to come over so the two managers can re-prioritise. You take instructions on the work face from your own contractor's chain (Site Supervisor → Project Engineer → Contracts Manager). The main contractor's Site Manager co-ordinates between contractors but does not give direct instructions to a sub-contractor's apprentice.",
      "Ignore the Site Manager and carry on with the containment.",
      "Phone the Project Manager at the client's office for a decision.",
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
      "There is no difference — they're the same role with two names.",
      "The Project Manager is client-facing and owns the programme, the budget and the contract. They sit in an office most of the week and visit site weekly. The Site Manager runs the site day to day — daily plan, trade co-ordination, welfare, safety walks, snag-list. The PM is who the client talks to about delays and money. The SM is who the trades talk to about the work itself.",
      "The PM works for the client and the SM works for the contractor.",
      "The PM only handles documents — the SM does all the work.",
    ],
    correctIndex: 1,
    explanation:
      "Both PM and SM work for the main contractor (or for the larger sub-contractors on bigger jobs). The split is between strategic (PM — programme, budget, client) and tactical (SM — daily delivery on site). On smaller jobs one person may do both. As an apprentice you'll deal with the SM more often than the PM, but it helps to know the PM is the one with the contract in their hand if a programme dispute reaches them.",
  },
  {
    id: 'mod5-s1-sub1-foreman',
    question:
      "What does an electrical Foreman (or Site Supervisor) actually do that the Project Engineer and Contracts Manager don't?",
    options: [
      "Nothing — the Foreman is a junior position with no real authority.",
      "The Foreman directs the work at the face — who pulls which cable, in what sequence, before what trade. They sign off small works, run the daily morning brief, allocate apprentices to electricians, and feed back any problems up the chain. The Project Engineer designs and resolves technical queries; the Contracts Manager owns the contract, programme and money. The Foreman is the only one of the three who is in the work area all day.",
      "The Foreman only fills in paperwork — the Project Engineer does the practical work.",
      "The Foreman is more senior than the Project Engineer and the Contracts Manager.",
    ],
    correctIndex: 1,
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
      "The Foreman.",
      "The Project Manager (PM). The PM owns the contract, the programme and the budget on the contractor's side, and is the person the client phones when there's a question about money, dates, scope or a serious problem. The Site Manager runs the site day to day but the client-facing seat sits with the PM.",
      "The labourer.",
      "The HSE inspector.",
    ],
    correctAnswer: 1,
    explanation:
      "The PM is the contractor's commercial face. They sit between the client and the Site Manager. On a smaller project the same person may wear both hats; on a larger project there can be a layer between (a Senior Project Manager or a Construction Manager). The principle stays the same — the PM is who the client deals with, the SM is who the trades deal with.",
  },
  {
    id: 2,
    question:
      "What's the role of a Charge-hand on an electrical install?",
    options: [
      "Charge-hand is an obsolete term that is no longer used.",
      "Charge-hand is a senior trade lead — typically an experienced Approved Electrician who runs a small gang of electricians and apprentices on a specific area of the work, reporting up to the Foreman. On a larger job there can be several Charge-hands under one Foreman, each leading a wing or a floor.",
      "Charge-hand is a labourer in charge of the canteen.",
      "Charge-hand is a member of the client's professional team.",
    ],
    correctAnswer: 1,
    explanation:
      "On smaller jobs the Foreman directly runs everyone. On bigger jobs the Foreman delegates to Charge-hands — each runs a gang of three to six. As an apprentice you'll often be paired with a Charge-hand who acts as your day-to-day mentor on top of any formal Apprentice Mentor scheme.",
  },
  {
    id: 3,
    question:
      "On the electrical contractor's side of the chain, what does the Contracts Manager own?",
    options: [
      "Nothing — the role doesn't exist.",
      "The Contracts Manager owns the commercial relationship with the main contractor (or client direct) — the programme, the variations, the labour resourcing, the invoicing. They sit above the Project Engineer and the Site Supervisor, often running several jobs in parallel. They're rarely on any one site full-time but they're the senior decision-maker for that contract.",
      "Only the canteen and welfare arrangements.",
      "The DNO connection only.",
    ],
    correctAnswer: 1,
    explanation:
      "Contracts Manager is the equivalent of the main contractor's Project Manager but on the sub-contractor's side. On a multi-site electrical contracting firm the Contracts Manager runs three or four live jobs at once, attending site meetings, resolving programme clashes, signing off variations. The on-site Foreman calls them when there's a problem that goes beyond the work face.",
  },
  {
    id: 4,
    question:
      "What's the difference between an Approved Electrician and an Apprentice Mentor?",
    options: [
      "There is no difference.",
      "Approved Electrician is a competence grade — the JIB grade above Electrician, awarded after AM2 plus experience and CPD. Mentor is a role — an experienced electrician (usually Approved or above) who is formally allocated to support a specific apprentice through portfolio, on-site learning and the AM2. The same person is often both.",
      "Approved Electrician is junior to Apprentice.",
      "Mentor is a college role and not on site.",
    ],
    correctAnswer: 1,
    explanation:
      "JIB (Joint Industry Board) grades run Apprentice → Improver → Electrician → Approved Electrician → Technician. Mentor is a workplace responsibility, not a JIB grade. The JIB Apprentice Code of Practice expects every apprentice to have a named workplace Mentor who signs off portfolio entries and calibrates on-site competence with the college tutor.",
  },
  {
    id: 5,
    question:
      "Under CDM 2015 Reg 12 what does the Principal Contractor (typically the main contractor) have to ensure for every worker arriving on a notifiable site?",
    options: [
      "Nothing — workers find out for themselves.",
      "The Principal Contractor must ensure a suitable site induction is provided. The induction covers the construction phase plan, site rules, welfare arrangements, emergency procedures and the specific hazards on that site. This is how the management chain transfers safety information to the people doing the work.",
      "A copy of BS 7671 and a high-vis vest only.",
      "Lunch on the first day and nothing else.",
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 Reg 13(4) places the duty on the Principal Contractor (PC) to provide a suitable site induction. This is the formal moment when the PC's site management chain passes hazard information to operatives joining the site. As an apprentice it's the most important briefing of your day-one — it tells you the chain of command, the rules and the emergency arrangements.",
  },
  {
    id: 6,
    question:
      "The loudest, most confident voice on a site briefing is usually the most senior person there. True or false?",
    options: [
      "True — seniority on site is signalled by volume.",
      "False — seniority on site is signalled by the badge on the hard hat, the title in the morning brief and the position in the chain of command. Loud confidence is often the trade person who has been on the longest, not the person who is in charge. Quiet, calm direction is more often the sign of a senior manager. When in doubt, ask 'who's the Site Manager today?' rather than listening for volume.",
      "True — apprentices should always do what the loudest person says.",
      "False — there is never any senior person on site.",
    ],
    correctAnswer: 1,
    explanation:
      "Apprentices arriving on a busy site can mistake confidence and noise for authority. Hard-hat colour conventions vary by site (often white = manager, blue = visitor, yellow = operative, but it's not universal — check the site induction). The reliable signal is the morning brief — whoever runs it is the SM or their delegate. Asking is always fine; assuming is risky.",
  },
  {
    id: 7,
    question:
      "What does HASAWA s.2 require an employer to do that connects to having a clear management structure?",
    options: [
      "Nothing — HASAWA s.2 is only about PPE.",
      "HASAWA s.2 requires every employer to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all their employees. Section 2(2)(a) explicitly requires the provision of safe systems of work, and a clear management structure with defined supervisory responsibilities is part of that. An employer who can't say who supervises whom is in breach of s.2.",
      "Only large companies need to comply with HASAWA s.2.",
      "HASAWA s.2 only applies to construction sites over £10m.",
    ],
    correctAnswer: 1,
    explanation:
      "HASAWA s.2(2)(a) requires 'the provision and maintenance of plant and systems of work that are, so far as is reasonably practicable, safe and without risks to health'. A defined management structure (PM → SM → Foreman → trades) is part of the system of work — it tells everyone who supervises them and who they escalate problems to. After an incident the HSE inspector asks 'who was supervising?' and 'who was that person reporting to?' — a clear chain answers both questions.",
  },
  {
    id: 8,
    question:
      "On a typical day, who gives an apprentice their actual work instructions on a commercial fit-out?",
    options: [
      "The client's CEO.",
      "The electrical contractor's Foreman or Charge-hand at the morning brief — they translate the day's programme into specific tasks for each pair of hands. The Approved Electrician you're paired with then directs your work at the face. Big-picture decisions (programme changes, design queries) escalate up via the Foreman to the Project Engineer or Contracts Manager.",
      "The HSE inspector during their unannounced visit.",
      "The plumber on the floor below.",
    ],
    correctAnswer: 1,
    explanation:
      "Day-to-day work allocation is a Foreman job. Trade-pairing (apprentice with Approved Electrician) is the standard apprentice arrangement. On bigger sites the Charge-hand may be the morning-brief lead for a specific area. Knowing this stops apprentices defaulting to 'I'll ask the boss' — the boss for that day is the Foreman, and the Foreman escalates up if needed.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Who is the most senior person on a building site — the client, the Project Manager or the Site Manager?",
    answer:
      "On the contractor's side it's the Project Manager (PM) — they own the contract, the programme and the budget. The Site Manager (SM) is senior on site but reports to the PM. The client is contractually senior to all of the contractor's team but is not 'on the management chain' day-to-day — they instruct via the contract. As an apprentice you'll see the SM most often, the PM occasionally and the client rarely.",
  },
  {
    question: "If I'm employed by an electrical sub-contractor, do I take instructions from the main contractor's Site Manager?",
    answer:
      "No — not directly. The main contractor's Site Manager co-ordinates between sub-contractors under CDM 2015 Reg 13, but day-to-day work instructions to you come from your own employer's chain (Foreman → Project Engineer → Contracts Manager). If the main contractor's SM wants something done they raise it with your Foreman, who decides. Stepping outside your own chain to take an instruction direct from the main contractor's SM is how labour disputes and unsafe work start.",
  },
  {
    question: "What's the difference between a Foreman and a Site Supervisor?",
    answer:
      "In most electrical contracting firms they're the same role with two names. 'Foreman' is the older trade term, 'Site Supervisor' is the modern title that some firms (particularly the bigger M&E contractors) prefer because it sounds less hierarchical. The job is the same — work-face leader, runs the morning brief, allocates trades, signs off small works, escalates problems.",
  },
  {
    question: "How do hard-hat colours work — is there a national standard?",
    answer:
      "There is no single national standard. BS EN 397 sets the helmet's safety performance but not the colour code. Common conventions on UK sites: white = site management or visitors, blue = supervisors or skilled workers, yellow = general operatives, green = first aid or safety, orange = signallers/banksmen, red = fire warden. But every site can set its own rules — the induction tells you the local colour code. Don't assume.",
  },
  {
    question: "Where does a Project Engineer fit on the electrical side?",
    answer:
      "Project Engineer (sometimes Design Engineer or Engineer) is the technical desk-based role on the contractor's side. They produce or review the design, resolve RFIs (requests for information) from site, calculate cable sizes and protective device settings, and sign off as-installed drawings. They sit above the Foreman in technical authority but below the Contracts Manager in commercial authority. The Foreman calls them when there's a 'how do I install this?' question.",
  },
  {
    question: "I'm an apprentice — am I expected to know everyone's name and role on day one?",
    answer:
      "No, but you're expected to know your own chain — your Foreman, your Charge-hand if you have one, your Approved Electrician for the day, and the name of your Site Supervisor or Contracts Manager up the line. Knowing the main contractor's SM by sight is helpful too. The rest comes with time. If you're not sure who someone is, ask politely — 'sorry, who do you work for?' is a fine question and beats guessing wrong.",
  },
];

export default function Sub1() {
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
            eyebrow="Module 5 · Section 1 · Subsection 1"
            title="Site management team key roles"
            description="Project Manager, Site Manager, Foreman, Charge-hand on the main side; Contracts Manager, Project Engineer, Approved Electrician, Mentor on the electrical side. Knowing who outranks who saves you a year of awkward conversations."
            tone="emerald"
          />

          <TLDR
            points={[
              "Site management splits into two parallel chains — the main contractor's (Project Manager → Site Manager → Foreman) and the electrical contractor's (Contracts Manager → Project Engineer → Foreman/Site Supervisor → Approved Electrician → Apprentice). Each chain runs its own people; the two chains co-ordinate at the top and at the morning brief.",
              "As an apprentice you take work instructions from your own electrical contractor's chain — Foreman or Charge-hand on the day, Approved Electrician for the immediate task. The main contractor's Site Manager co-ordinates between contractors under CDM 2015 Reg 13 but does not give direct instructions to a sub-contractor's apprentice.",
              "Loud isn't senior. The seat at the morning brief, the badge on the hard hat and the title in the chain are what tell you who's actually in charge — not the volume of the voice in the corridor.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the key roles of the site management team (Unit 210 LO1 AC 1.1 — verbatim from City & Guilds 2365-02 specification).",
              "Distinguish between the Project Manager (PM) and the Site Manager (SM) on the main contractor's side, and the Contracts Manager and Project Engineer on the electrical sub-contractor's side.",
              "Identify the role of the Foreman or Site Supervisor as the work-face leader who allocates trades, runs the morning brief and escalates problems up the chain.",
              "Identify the role of the Charge-hand as a senior trade lead running a gang within the wider electrical workforce.",
              "Identify the role of the Approved Electrician and the Apprentice Mentor in supporting on-site learning and portfolio sign-off.",
              "State the duty under CDM 2015 Reg 8 on the Principal Contractor to plan, manage, monitor and co-ordinate the construction phase, and the duty under Reg 13 to ensure a suitable site induction.",
              "State the duty under HASAWA s.2(2)(a) to provide and maintain safe systems of work, including a clear management and supervisory structure.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this matters on day one</ContentEyebrow>

          <ConceptBlock
            title="A site is a chain of command before it is a job"
            plainEnglish="When you arrive on a busy commercial fit-out the noise, the kit and the people can be overwhelming. Underneath all of that is a structured chain of command that decides who gives instructions, who escalates problems and who signs off the work. Knowing the chain is what stops you taking the wrong instruction from the wrong person on day one — and it's also what helps you ask for help in the right place when you need it."
            onSite="The single most useful thing an apprentice can do in their first week is sketch the chain on the back of a notebook. Who's the Site Manager today? Who's our Foreman? Who's the Approved Electrician I'm paired with? Who's our Contracts Manager? Once you've got those four names, you've got the framework. The rest fills in over the following weeks."
          >
            <p>
              The two parallel chains on a typical commercial fit-out:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Main contractor's chain</strong> — Client → Project Manager (PM) → Site
                Manager (SM) → Foreman / Site Supervisor → trades. The PM is client-facing and
                rarely on site. The SM runs the site day to day. The Foreman runs the work face.
              </li>
              <li>
                <strong>Electrical sub-contractor's chain</strong> — Contracts Manager → Project
                Engineer → Foreman / Site Supervisor → Charge-hand → Approved Electrician →
                Apprentice. The Contracts Manager owns the contract with the main contractor.
                The Foreman is your daily boss.
              </li>
              <li>
                <strong>Where they meet</strong> — at the morning brief (Site Manager runs it,
                each contractor's Foreman attends) and at the weekly site progress meeting (PMs
                and Contracts Managers attend). Day-to-day instructions to apprentices flow down
                their own chain.
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
            <p>
              What the PM owns:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The contract</strong> — the agreement with the client setting out the
                scope, the price and the programme. Variations get logged through the PM.
              </li>
              <li>
                <strong>The programme</strong> — the master schedule of trades, deliveries and
                milestones. The PM holds the contractor's commitment to hand-over date.
              </li>
              <li>
                <strong>The budget</strong> — the labour cost, the materials cost and the
                allowance for variations. The PM signs off the monthly valuation to the client.
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
            <p>
              What the SM does on a typical day:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Morning brief</strong> — runs the daily start-of-shift briefing covering
                day's plan, deliveries, hazards and trade clashes. Each contractor's Foreman
                attends and feeds back.
              </li>
              <li>
                <strong>Site walks</strong> — at least two safety walks a day, more on a busy
                site. Spots issues, raises with the relevant contractor's Foreman.
              </li>
              <li>
                <strong>Co-ordination</strong> — under CDM 2015 Reg 13 the Principal Contractor
                co-ordinates the work of all contractors. The SM is who actually does this on
                the ground.
              </li>
              <li>
                <strong>Welfare and discipline</strong> — sign-in, PPE compliance, conduct on
                site, sub-contractor non-compliance. The SM has authority to stop work and to
                remove individuals from site.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Foreman / Site Supervisor — work-face leader"
            plainEnglish="The Foreman (also called Site Supervisor on more modern firms) is the work-face leader. They direct the trades, sign off small works, run the daily morning brief for their own gang, allocate apprentices to electricians, and feed problems up the chain. The Foreman is the only one of the three who is in the work area all day."
            onSite="As an apprentice the Foreman is your direct boss almost every day. They tell you what to work on, who to pair with and how the day is going to flow. When you've got a question — about the work, about the programme, about anything — the Foreman is the first person to ask. They escalate up if they can't answer."
          >
            <p>
              The Foreman's day-to-day responsibilities:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Allocate trades</strong> — who works on what, in what sequence, paired
                with whom. Apprentice-pairing is a Foreman call.
              </li>
              <li>
                <strong>Run the morning brief</strong> — for their own gang (separate from the
                main contractor's site-wide brief). Day's tasks, hazards, materials.
              </li>
              <li>
                <strong>Sign off small works</strong> — completion of a discrete piece of work.
                Bigger sign-offs (a circuit, a board) go up to the Project Engineer.
              </li>
              <li>
                <strong>Escalate problems</strong> — design queries to the Project Engineer,
                programme issues to the Contracts Manager, safety issues to the main
                contractor's Site Manager.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Charge-hand — senior trade lead running a gang"
            plainEnglish="On a larger job the Foreman delegates to Charge-hands — typically experienced Approved Electricians who run a gang of three to six on a specific area (a wing, a floor, a system). Each Charge-hand reports up to the Foreman. On a smaller job the Foreman runs the trades directly and there are no Charge-hands."
            onSite="As an apprentice you'll often be paired with a Charge-hand who acts as your day-to-day mentor on top of any formal Apprentice Mentor scheme. The Charge-hand is the person who actually shows you how to do the work and who you spend most of your time with."
          >
            <p>
              When you'll see a Charge-hand:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                On larger projects (typically over £500k of electrical works) where one Foreman
                can't physically be in every part of the site at once.
              </li>
              <li>
                On long-running jobs where the work splits naturally into zones — a Charge-hand
                per zone keeps the work coherent.
              </li>
              <li>
                On industrial and infrastructure work where each system (lighting, power,
                data, fire) has its own Charge-hand.
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

          <ContentEyebrow>Electrical contractor's side — Contracts Manager, Project Engineer, Mentor</ContentEyebrow>

          <ConceptBlock
            title="Contracts Manager — owns the contract with the main contractor"
            plainEnglish="The Contracts Manager is the equivalent of the main contractor's Project Manager but on the sub-contractor's side. They own the commercial relationship with the main contractor — the programme, the variations, the labour resourcing, the invoicing. They sit above the Project Engineer and the Foreman, and they often run several jobs in parallel."
            onSite="You'll see the Contracts Manager at the weekly progress meeting and occasionally on site walks. They're the senior decision-maker for the contract — if the main contractor wants to add or remove scope, change the programme or dispute a payment, they go to the Contracts Manager. As an apprentice you'd only deal with them through your Foreman."
          >
            <p>
              The Contracts Manager's typical week:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Two or three site visits to live jobs.
              </li>
              <li>
                The weekly progress meeting at each site.
              </li>
              <li>
                Variation pricing and submission to the main contractor.
              </li>
              <li>
                Labour resourcing — moving electricians and apprentices between jobs as
                programmes shift.
              </li>
              <li>
                Pre-construction meetings for new tenders won.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Project Engineer — the technical authority"
            plainEnglish="The Project Engineer (sometimes Design Engineer or just Engineer) is the technical desk-based role. They produce or review the design, resolve RFIs (requests for information) from site, calculate cable sizes and protective device settings, and sign off as-installed drawings. They sit above the Foreman in technical authority but below the Contracts Manager in commercial authority."
            onSite="You'll meet the Project Engineer when there's a technical question the Foreman can't answer — 'this cable doesn't fit the containment we've been given', 'the design shows a 32A circuit but the load looks like 40A', 'the room layout has changed and we need a different feed route'. The Project Engineer is the one with the design authority to resolve those questions."
          >
            <p>
              When the Project Engineer gets called in:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Design queries from the Foreman — anything that requires a re-calculation or a
                deviation from the issued drawings.
              </li>
              <li>
                Co-ordination with the M&E consultant (the client's designer) for technical
                issues that escalate beyond the contractor's scope.
              </li>
              <li>
                Sign-off of as-installed drawings and completion certificates.
              </li>
              <li>
                Pre-commissioning checks and witnessing for larger systems.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Approved Electrician — competence grade and daily pairing"
            plainEnglish="Approved Electrician is a JIB (Joint Industry Board) competence grade — the level above Electrician, awarded after AM2 plus experience and CPD. As an apprentice you'll be paired with an Approved Electrician for almost every task — they direct the work at the immediate face, show you how to do it and check your work before sign-off."
            onSite="The Approved Electrician you're paired with is the person you'll learn from most directly. The Foreman allocates pairings; the Approved Electrician does the on-the-job teaching. They're not formally your Mentor (that's a separate role) but in practice they're your day-to-day teacher."
          >
            <p>
              JIB grades from bottom to top:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Apprentice</strong> — under indenture, working towards AM2.
              </li>
              <li>
                <strong>Improver</strong> — qualified electrician but pre-AM2, working under
                Approved supervision.
              </li>
              <li>
                <strong>Electrician</strong> — passed AM2, can work without direct supervision
                on routine work.
              </li>
              <li>
                <strong>Approved Electrician</strong> — additional experience and CPD, can
                supervise others and sign off work.
              </li>
              <li>
                <strong>Technician</strong> — additional formal qualifications (often HNC or
                degree level), typically design or commissioning.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Apprentice Mentor — formal workplace teaching role"
            plainEnglish="The Apprentice Mentor is a named experienced electrician (usually Approved or Technician grade) who is formally allocated to support a specific apprentice through the apprenticeship. They sign off portfolio entries, calibrate on-site competence with the college tutor, attend the monthly three-way reviews and act as the first point of escalation for apprentice-specific issues."
            onSite="The Mentor is rarely the same person you're paired with day-to-day — pairings change with the work, but the Mentor stays the same person across the apprenticeship. Once a month or so you sit down with the Mentor to review your portfolio, discuss progress and identify gaps. The college tutor reads the same portfolio."
          >
            <p>
              The Mentor's responsibilities:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Portfolio sign-off</strong> — reviewing and signing each portfolio
                entry as evidence of on-site competence.
              </li>
              <li>
                <strong>Three-way reviews</strong> — monthly meeting with the apprentice and
                the college tutor (and often the employer's HR or training lead).
              </li>
              <li>
                <strong>Pastoral support</strong> — first point of contact for apprentice-
                specific issues that aren't strictly work-related.
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
                  <strong>Reg 12(1)</strong> — &quot;The principal contractor must plan, manage
                  and monitor the construction phase and co-ordinate matters relating to it to
                  ensure that, so far as is reasonably practicable, construction work is carried
                  out without risks to health or safety.&quot;
                </p>
                <p>
                  <strong>Reg 12(2)</strong> — &quot;In fulfilling the duties in paragraph (1),
                  and in particular when (a) design, technical and organisational aspects are
                  being decided in order to plan the various items or stages of work which are
                  to take place simultaneously or in succession; and (b) estimating the period
                  of time required to complete such work or work stages, the principal
                  contractor must take into account the general principles of prevention.&quot;
                </p>
              </>
            }
            meaning={
              <>
                The Principal Contractor is the legal entity (almost always the main contractor)
                that owns the duty to co-ordinate the construction phase. The Principal
                Contractor&apos;s Site Manager is who does this on the ground &mdash; the
                morning brief, the safety walks, the trade-clash resolution. As an apprentice
                you co-operate with the PC&apos;s arrangements under Reg 15 (covered in Sub 4).
                The PC&apos;s management chain is therefore not just a contractual hierarchy &mdash;
                it&apos;s a statutory one.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 12 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 — Reg 13(4) (PC site induction)"
            clause={
              <>
                &quot;The principal contractor must ensure that &mdash; (a) a suitable site
                induction is provided; (b) the necessary steps are taken to prevent access by
                unauthorised persons to the construction site; and (c) facilities that comply
                with the requirements of Schedule 2 are provided throughout the construction
                phase.&quot;
              </>
            }
            meaning={
              <>
                The site induction is the formal moment when the PC&apos;s management chain
                transfers safety information to operatives joining the site. As an apprentice
                this is the briefing where you find out who&apos;s the Site Manager, what the
                site rules are, where the welfare is and what the emergency arrangements are.
                Skipping or sleeping through the induction is a CDM Reg 15 breach by you and
                puts you outside the site H&amp;S system on day one.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 13 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.2(2)(a)"
            clause={
              <>
                &quot;Without prejudice to the generality of an employer&apos;s duty under the
                preceding subsection, the matters to which that duty extends include in
                particular &mdash; (a) the provision and maintenance of plant and systems of
                work that are, so far as is reasonably practicable, safe and without risks to
                health.&quot;
              </>
            }
            meaning={
              <>
                The &quot;safe system of work&quot; duty under HASAWA s.2(2)(a) extends to
                organisational arrangements as well as physical plant. A clear management
                structure with defined supervisory responsibilities is part of the system of
                work. After an incident the HSE inspector asks &quot;who was supervising?&quot;
                and &quot;who was that person reporting to?&quot;. A clear chain answers both
                questions; an unclear chain is treated as evidence of a s.2 breach.
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
                  <li><strong>Client</strong> — commissions the project, signs the contract.</li>
                  <li><strong>Project Manager</strong> — contract, programme, budget. Client-facing.</li>
                  <li><strong>Site Manager</strong> — daily site running. Most senior on site.</li>
                  <li><strong>Foreman / Site Supervisor</strong> — work-face leader for the main contractor's own trades.</li>
                  <li><strong>Trades</strong> — main contractor's directly-employed workforce.</li>
                </ol>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Electrical sub-contractor's chain
                </div>
                <ol className="space-y-2 text-[13.5px] text-white/85 leading-relaxed">
                  <li><strong>Contracts Manager</strong> — owns the contract with main contractor.</li>
                  <li><strong>Project Engineer</strong> — technical authority, design and RFIs.</li>
                  <li><strong>Foreman / Site Supervisor</strong> — runs the electrical work face.</li>
                  <li><strong>Charge-hand</strong> — senior trade lead, gang of 3 to 6.</li>
                  <li><strong>Approved Electrician</strong> — daily pairing for the apprentice.</li>
                  <li><strong>Apprentice (you)</strong> — under indenture, working towards AM2.</li>
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
                Apprentice on day one mistakes the loud, confident voice in the corridor for the
                Site Manager. Takes an instruction from someone who turns out to be a delivery
                driver chasing a misplaced consignment. Spends an hour helping shift boxes that
                weren&apos;t their problem, misses the actual morning brief, gets a quiet talking-to
                from their own Foreman who had to come looking for them.
              </>
            }
            doInstead={
              <>
                When in doubt, ask politely &mdash; &quot;sorry, who do you work for?&quot; or
                &quot;I&apos;m looking for our Foreman, do you know where they&apos;re based?&quot;
                are perfectly fine questions. Apprentices are expected to ask; it&apos;s how the
                site teaches you. Take instructions only from your own Foreman or from someone
                they&apos;ve specifically delegated to. Loud and confident is not the same as in
                charge.
              </>
            }
          />

          <CommonMistake
            title="Stepping outside your own chain to take an instruction direct from the main contractor"
            whatHappens={
              <>
                Main contractor&apos;s Site Manager walks past and asks the apprentice to drop
                their containment job and come help carry something heavy upstairs. Apprentice
                says yes to be helpful, drops the work, helps for an hour. Their own Foreman
                then can&apos;t find them and the containment job slips into another trade&apos;s
                window, causing a programme clash. Worse, if there&apos;s an incident on the
                instructed task, the chain of command for any RIDDOR investigation is unclear
                because the apprentice was acting outside their own employer&apos;s instruction.
              </>
            }
            doInstead={
              <>
                Politely say you&apos;ve been tasked by your own supervisor on a different
                priority, and offer to ask your supervisor to come over so the two managers can
                re-prioritise. The main contractor&apos;s SM raising a labour-shortage with your
                Foreman is the correct route. Your Foreman then decides whether to release you,
                and the chain of responsibility stays clean. This is the polite, professional
                answer almost every time.
              </>
            }
          />

          <Scenario
            title="Day one on a £4m commercial fit-out — who do you actually answer to?"
            situation={
              <>
                You arrive at 7:30am for your first day on a commercial fit-out. The main
                contractor&apos;s Site Manager (white hat, clipboard) signs you in at the gate
                and directs you to the welfare cabin. At 8am there&apos;s a site-wide morning
                brief run by that same Site Manager &mdash; about 40 people in the cabin, every
                trade on the project. After the brief your own electrical contractor&apos;s
                Foreman pulls your gang aside (six electricians and two apprentices, you
                included) and runs a separate gang brief. You&apos;re paired with an Approved
                Electrician called Sam for the day, working on first-fix containment in the
                third-floor comms room. Mid-morning the main contractor&apos;s Site Manager
                walks past and tells you to drop everything and help carry plasterboard. Two
                hours later your Contracts Manager is on site for the weekly progress meeting
                and asks how you&apos;re finding it.
              </>
            }
            whatToDo={
              <>
                The chain you&apos;re working in:
                <br /><br />
                <strong>Day-to-day instructions</strong> &mdash; from Sam (your Approved
                Electrician for the day) for the immediate task, and from your Foreman for
                anything bigger. Never from the main contractor&apos;s Site Manager direct.
                <br /><br />
                <strong>The plasterboard ask</strong> &mdash; politely defer, offer to fetch
                your Foreman so the two managers can re-prioritise. Your Foreman decides whether
                to release you. The main contractor&apos;s SM raising a labour issue with your
                Foreman is the correct route.
                <br /><br />
                <strong>The morning briefs</strong> &mdash; the site-wide brief is the main
                contractor&apos;s SM transferring co-ordination information (deliveries, trade
                clashes, hazards). Your gang brief is your Foreman translating that into
                today&apos;s tasks for your gang.
                <br /><br />
                <strong>The Contracts Manager visit</strong> &mdash; they&apos;re here for the
                weekly progress meeting with the main contractor. Their conversation with you
                is friendly, not commercial. Be honest about how you&apos;re finding it &mdash;
                they&apos;re your senior decision-maker for the contract.
              </>
            }
            whyItMatters={
              <>
                Day one is when the chain gets set in your head. Get it right on day one and
                you&apos;ll never confuse who you answer to. Get it wrong and you&apos;ll spend
                the next month taking instructions from the wrong people, missing your own
                morning briefs and frustrating your Foreman. The chain isn&apos;t bureaucracy &mdash;
                it&apos;s how the site protects you and how the work gets done coherently.
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
              "The Project Manager (PM) is client-facing and owns the contract, programme and budget. They visit site weekly. The Site Manager (SM) runs the site day to day — most senior person on site.",
              "The Foreman (or Site Supervisor) is the work-face leader. They allocate trades, run the gang's morning brief, sign off small works and escalate problems up the chain. As an apprentice the Foreman is your direct boss almost every day.",
              "On the electrical side, the Contracts Manager owns the commercial relationship with the main contractor; the Project Engineer is the technical authority for design and RFIs; the Approved Electrician is your day-to-day pairing; the Mentor is your formal workplace teacher.",
              "Day-to-day instructions flow down your own chain. The main contractor's Site Manager co-ordinates between contractors under CDM 2015 Reg 13 but does not give direct work instructions to a sub-contractor's apprentice — those go through your Foreman.",
              "The loudest voice is rarely the most senior. The seat at the morning brief, the badge on the hard hat and the title in the chain are the reliable signals — not the volume in the corridor.",
              "HASAWA s.2(2)(a) requires safe systems of work, which includes a clear management structure with defined supervisory responsibilities. CDM 2015 Reg 12 places the co-ordination duty on the Principal Contractor; Reg 13 requires a suitable site induction; both flow through the management chain.",
              "Charge-hands appear on larger jobs as a layer between the Foreman and the trades — typically experienced Approved Electricians running a gang of three to six in a specific area. On smaller jobs the Foreman runs the trades directly.",
            ]}
          />

          <Quiz title="Site management team — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 1 — Site roles overview
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section1/1-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.2 Individuals reporting to site management
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
