/**
 * Module 4 · Section 2 · Subsection 1 — Identifying hazards in the workspace
 * Maps to City & Guilds 2365-02 / Unit 204 / LO2 / AC 2.1
 *   AC 2.1 — "Identify possible hazards in the workspace"
 *
 * Frame: a structured site walk before any tool comes out. Hazards stack
 * into four families — people, environment, services, fabric — and you
 * sweep each one in order. Static RAMS sets the baseline; the dynamic
 * walk-round on arrival catches what the RAMS could not have known.
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
  'Identifying hazards in the workspace (2.1) | Level 2 Module 4.2.1 | Elec-Mate';
const DESCRIPTION =
  'A structured site walk before tools come out — people, environment, services and fabric hazards. Static RAMS vs the dynamic risk assessment that catches what the paperwork could not.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod4-s2-sub1-walkround',
    question:
      "You arrive at an occupied domestic rewire. The customer's RAMS was written three weeks ago when the surveyor visited. What's the FIRST thing you do before opening the toolbox?",
    options: [
      'Fire / explosion, asphyxiation (oxygen deficiency or harmful atmosphere), drowning (free-flowing solid / liquid), hyperthermia (high temperature). Plus serious injury from entrapment. The Regs apply when the space is substantially enclosed AND any specified risk is foreseeable.',
      'Analyse the failure and condition monitoring history: if failures are occurring between PM intervals the frequency should be increased; if components are consistently in good condition at PM time the interval may be too short and can be extended',
      'Thank the worker for reporting the concern, investigate the allegation confidentially, take appropriate action against the unsafe management practice, reinforce that safety procedures are non-negotiable, and protect the worker from retaliation',
      'A short dynamic walk-round of every room you will work in today, comparing what is in front of you against what the RAMS describes. Anything that has changed (new pet, kids home from school, decorating in progress, a damp patch that was not there at the survey) becomes a fresh hazard you record before you start.',
    ],
    correctIndex: 3,
    explanation:
      "RAMS is the baseline plan — written before the work, in an office, sometimes weeks earlier. The dynamic risk assessment is the walk-round you do on the day, in the actual rooms, with the actual people present. Management of Health and Safety at Work Regulations 1999 Reg 3 requires the assessment to be 'suitable and sufficient' and that means up to date for the conditions you actually find. Five minutes of walking and looking before any tool comes out is what the regulation effectively demands.",
  },
  {
    id: 'mod4-s2-sub1-services',
    question:
      "You're chasing a vertical channel into a plastered wall in a 1960s end-terrace to drop a cable to a new socket. You've got a cable-and-pipe detector but it's flagging intermittently in the area. What's the safe next move?",
    options: [
      "Stop. Treat the intermittent reading as a positive find until proven otherwise. Check the gas meter location and trace the rough route of the meter tail visually, look at the floor below for clues to pipe routes, lift a floorboard if you can to see the joist void, and consider re-routing the chase. Cutting into a live mains gas pipe is a fire-and-explosion risk well above the cost of a re-route.",
      "Loss-of-mains (LoM) protection, commonly called anti-islanding. The inverter monitors voltage, frequency, vector shift and rate of change of frequency on the AC side. When the grid reference is lost or moves outside the permitted window defined in ENA G98 / G99, the inverter ceases to export within the specified timing. The intent is to protect DNO engineers, prevent asynchronous reclosure damage and stop a small generator attempting to support a much larger network it cannot stabilise.",
      "ACAS promotes early, informal resolution through open conversation — addressing issues promptly, listening to all perspectives, seeking mutually acceptable solutions, and using formal processes only when informal approaches have been exhausted. This aligns with EI-based conflict resolution that prioritises empathic dialogue, assertive communication, and collaborative problem-solving",
      "Reg 514.16.1 — introduced by A4:2026, requiring a label to indicate the presence of SPDs (with an exception for domestic / household premises). Located in Part 5 (selection and erection), Chapter 51 (common rules), Section 514 (identification and notices). Knowing the labelling regs live in Section 514 is faster than searching by reg number.",
    ],
    correctIndex: 0,
    explanation:
      "Concealed services are the headline 'services' hazard. Gas, water, structural steel and other live cables can all sit in a wall or under a floor with no surface clue. The detector is a tool, not a verdict — intermittent or flickering readings are treated as positive until you've proven they aren't. Cutting into a live gas pipe is the textbook avoidable fatality and the HSE has prosecuted electricians under HASAWA s.3 (risk to non-employees) when a botched chase has led to a gas leak in a customer's home.",
  },
  {
    id: 'mod4-s2-sub1-people',
    question:
      "Halfway through a kitchen first-fix, the customer's two young children come home from school and start running through the work area where you've got an open consumer unit and tools on the floor. Your work is partially complete and the area is not isolatable from the rest of the house. What do you do?",
    options: [
      "Creating a wellbeing programme that includes: team-building activities (Connect), active travel schemes and lunchtime walks (Be Active), mindfulness sessions and reflective practice groups (Take Notice), CPD opportunities and skills-sharing workshops (Keep Learning), and volunteering days and peer support schemes (Give)",
      "(1) Strict liability — pollution incidents are offences regardless of intent; (2) duty of care under EPA 1990 s.34 + the Polluter Pays principle; (3) MHSWR Reg 14 (employee duty to report shortcomings); (4) operator's environmental permit conditions; (5) reputational and commercial consequences of an undetected pollution event downstream; (6) personal liability under HASAWA s.7 if the environmental hazard also creates a worker safety hazard.",
      "GN3 allows omission of origin PFC measurement for this combination — BS EN 61439-3 CU rated 16 kA, TN-C-S supply with distributor-declared PFC at 16 kA maximum. Take the distributor\\\\\\\\\\\\'s declared 16 kA as the design value, document on the EIC. For non-conforming installations or commercial / industrial work, direct measurement is required.",
      "Stop work, secure the open consumer unit (close the door and lock-off where you can), gather the floor-level tools, and have a quick conversation with the parent about keeping the children out of the work area for the rest of the visit. If that can't be arranged, pack down and reschedule. HASAWA s.3 puts the duty on you to protect non-employees affected by your work — children in your work zone is a textbook s.3 issue.",
    ],
    correctIndex: 3,
    explanation:
      "People hazards include the customers, their family and visitors. HASAWA s.3 makes you responsible for them. A consumer unit with the cover off in a household with running children isn't a tolerable risk — you secure the area or you stop work. 'I told them to stay away' has never won an SFAIRP defence after an incident. The walk-round is repeated whenever the people in the property change, not just at the start of the day.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "When you arrive at a domestic property to start work, what's the difference between the RAMS and a dynamic risk assessment?",
    options: [
      "When the DNO does not provide an earth terminal at the supply (rural overhead supplies, some old undersea cables, certain industrial or specialist supply arrangements). The earthing arrangement is determined by the supply, not by choice.",
      "RAMS (risk assessment + method statement) is the written plan prepared in advance, usually after a survey. A dynamic risk assessment is the walk-round you do on the day, in real time, with real conditions and real people present. RAMS sets the baseline; the dynamic assessment catches what has changed since the paperwork was written.",
      "Heat-pump-ready electrical infrastructure (typically a 16-32 A radial spare way), EV charging provision (Approved Document S), PV and battery enabling (capped cables, suitably sized supply), and zero gas connections from 2025 in many new builds.",
      "Apply the 0.8 rule for measured-vs-table comparison: Zs(measured) ≤ 0.8 × Zs(table) = 0.8 × 1.37 = 1.10 Ω. 1.05 ≤ 1.10 → pass with small margin (5 %). Worth noting on the schedule that compliance is borderline; investigate any reasons the cable might be hot in service (long run, bundled cables, high ambient temperature).",
    ],
    correctAnswer: 1,
    explanation:
      "Management of Health and Safety at Work Regulations 1999 Reg 3 requires risk assessments to be 'suitable and sufficient' — that has been interpreted by the HSE as needing to reflect the conditions actually present. A RAMS written three weeks ago by a surveyor cannot do that on its own. The dynamic walk-round on arrival is the bit that closes the gap.",
  },
  {
    id: 2,
    question:
      "Which four broad families of hazard does the workspace walk-round in this Sub use as a structure?",
    options: [
      "Photos of the scene as it was when evacuated; identity and contact of witnesses; written first-hand account from yourself and any colleagues; equipment positions; any recordings (CCTV near you); customer / building-manager contact information; any fault you noted that may have caused or contributed; tool and instrument condition before and after.",
      "HRC fuses can interrupt very high prospective fault currents safely (1500 A or higher breaking capacity). Glass cartridges have ~35 A breaking capacity; on a high-PSCC circuit (UK domestic 6 kA, commercial 16 kA+) a glass fuse can rupture violently when fault current exceeds its breaking capacity — glass shards, hot metal, no current interruption. Fluke and Martindale lead sets use sand-filled HRC elements.",
      "People, environment, services, fabric. People — pedestrians, customers, children, other trades. Environment — weather, dust, asbestos suspicion in pre-2000 homes, confined spaces, working at height. Services — concealed live cables, gas pipes, water pipes, structural steel that needs bonding. Fabric — brittle masonry, joist orientation, plaster condition.",
      "On the client side — typically held by the building facilities manager (printed and digital), with a copy held by the building owner and a soft copy retained by the contractor for warranty and PI purposes. It is the reference for all future maintenance, fault diagnosis, periodic inspection (EICR) and any alteration project.",
    ],
    correctAnswer: 2,
    explanation:
      "The four families are a memory aid — they cover the realistic threat surface for an electrician on a typical install. Working through them in the same order each time stops you missing one. The HSE INDG163 leaflet on risk assessment uses a similar structure — slips/trips, electricity, manual handling, dust, working at height — but the four-family version maps better onto a domestic-or-commercial walk-round.",
  },
  {
    id: 3,
    question:
      "You're working in a property built in 1972. Before you drill into a ceiling, what assumption should you start from?",
    options: [
      "Following BS 7671 raises a presumption that the underlying statutory duty (EAWR Reg 4) has been met. The legal logic: HSR25 (HSE's guidance to EAWR) cites BS 7671 as a means of demonstrating EAWR compliance. So evidence of BS 7671 compliance = evidence of EAWR compliance, by reference. Departing from BS 7671 is allowed but flips the burden — you have to prove your alternative method was at least as safe.",
      "Advanced cultural empathy: understanding that safety communication styles must be adapted to cultural context. In high power-distance cultures, a peer raising concerns directly may be uncomfortable. In indirect communication cultures, blunt safety warnings may cause face-loss. The electrician must find a culturally appropriate way to communicate urgency without causing shame, possibly involving the site supervisor or using visual demonstration rather than direct verbal confrontation",
      "Wide statutory powers under s.20 — enter premises at any reasonable time, take photographs / measurements, take samples, require any person to answer questions, require production of documents, take possession of articles. Plus the power under s.21/s.22 to issue improvement and prohibition notices on the spot. Refusing or obstructing an inspector is itself a criminal offence under s.33.",
      "Treat it as 'asbestos suspect until proven otherwise'. Buildings constructed before 2000 (and refurbished before 2000) can contain asbestos in textured ceilings, insulation board, cement products, floor tiles and pipe lagging. Stop and check the asbestos register if the building has one (commercial buildings are required to have one under the Control of Asbestos Regulations 2012). For a domestic property without a register, assume suspect material is present and avoid disturbance until you can verify or arrange a survey.",
    ],
    correctAnswer: 3,
    explanation:
      "Control of Asbestos Regulations 2012 Reg 4 requires duty-holders of non-domestic buildings to maintain an asbestos register and provide it to anyone working on the fabric. For domestic work the duty falls on the homeowner but the practical risk is the same. Disturbing an asbestos textured ceiling without a survey is one of the most common ways an apprentice gets exposed. The default assumption for any pre-2000 build is 'suspect' and the safe move is to stop and check.",
  },
  {
    id: 4,
    question:
      "On a busy commercial fit-out, what 'people hazard' is most often missed by an apprentice on day one?",
    options: [
      "Other trades working above, beside or below you. Plumbers cutting overhead, joiners with battery saws, decorators with wet paint and dust sheets, scaffolders moving boards. Their work creates falling-object risk, slip risk and noise risk for you, and your work creates electrical and tripping risk for them. The walk-round needs to take account of who else is on site, not just your own activity.",
      "Part 6 has been completely restructured and renumbered to align with the CENELEC standard for inspection and testing. The old chapter and regulation numbers do not map directly to the new 64x.x numbering. Inspectors must use the new numbers on certificates and EICRs from A4:2026 onward.",
      "Bonding required per Reg 411.3.1.2 — the metal oil supply pipe is an extraneous-conductive-part liable to introduce a potential. Bond per Reg 544.1.2 — consumer side, before any branch, within 600 mm of point of entry where practicable. Use a BS 951 clamp suitable for oil application (similar specification to gas — DSEAR considerations apply).",
      "Set the switches to a known closed position, then continuity-test from line at the CU through to the switched-line terminal of the lamp. Toggle each switch in turn and verify the meter responds correctly at every step. The intermediate switch should swap the strap connections when toggled — the meter should show this in the continuity readings.",
    ],
    correctAnswer: 0,
    explanation:
      "Apprentices new to commercial work tend to think 'workspace' is the room they are in. On a live fit-out the workspace is three-dimensional — what is happening above your head and below your feet matters as much as what is in front of you. CDM 2015 Reg 13 puts a duty on the principal contractor to coordinate, but the individual operative still owes a duty under HASAWA s.7 to take reasonable care for themselves and others, and that includes scanning for what other trades are doing.",
  },
  {
    id: 5,
    question:
      "What's the purpose of identifying the gas isolation valve location during the walk-round of a domestic kitchen install?",
    options: [
      "Model the behaviour - report own near-misses openly; encourage colleagues to report theirs without blame; analyse with the team; feed lessons forward; celebrate the report (not the near-miss). Cumulative cultural change over months / years.",
      "Knowing where the emergency gas isolation valve sits before work starts means you (or any trade in the property) can shut the gas down quickly if there is a leak — including a leak you might cause by chasing into a concealed pipe. It is part of the 'services' family of hazards and forms part of a defensible safe-system-of-work record.",
      "The Construction Phase Plan is the Principal Contractor's plan for managing H&S throughout the construction phase (CDM 2015 Reg 12). It documents the controls, the welfare arrangements, the emergency procedures, the trade-clash management, the high-risk activities and the supervision arrangements. The PC writes it and updates it as the project evolves.",
      "Allows EVs to discharge stored battery energy back to the grid or building during peak demand periods — effectively using the EV battery as a distributed energy storage resource, providing grid services and reducing electricity costs for the vehicle owner",
    ],
    correctAnswer: 1,
    explanation:
      "An electrician shouldn't be operating gas isolation as a routine — that is gas-safe-engineer work — but knowing where the valve is, in case of an emergency, is basic preparation. It also signals to the customer that you understand the building. After-incident interviews regularly find that the operatives present had no idea where the gas valve was, which delays the response to a leak and worsens the outcome.",
  },
  {
    id: 6,
    question:
      "Which set of regulations explicitly requires the employer to assess workplace risks and record the significant findings?",
    options: [
      "The Apprentice, the College Tutor and the Workplace Mentor (with the Employer's training lead or HR sometimes attending as a fourth voice). The three-way review is the formal sit-down where progress is calibrated, gaps identified, and the next month's targets agreed. It's the structural mechanism that stops academic and practical sides drifting apart.",
      "Because the EIC and any future EICR have to be able to trace the calculation back to a defensible source — DNO Form 1 or BS 7671 assumed maximum for Ze; OSG Table I1 / IET GN1 cable resistance tables for (R1 + R2) — and confirm the temperature correction was applied. Without the trace the design Zs is unverifiable.",
      "Management of Health and Safety at Work Regulations 1999, Reg 3 — every employer (and every self-employed person) must make a 'suitable and sufficient' assessment of the risks to the health and safety of employees and of anyone else affected by their undertaking. Where there are five or more employees the significant findings must be recorded.",
      "Accountability structures are important because EI development involves changing habitual patterns, which is difficult without external support. An effective structure might include: a development partner (colleague or mentor who checks in regularly), a reflective journal (tracking specific incidents and responses), regular self-assessments, and scheduled review points to evaluate progress against goals",
    ],
    correctAnswer: 2,
    explanation:
      "MHSWR 1999 Reg 3 is the statutory hook for the risk-assessment regime. It is made under HASAWA's enabling powers, so a breach of Reg 3 also feeds back into a HASAWA s.2 / s.3 breach. The 'five or more employees' threshold for recording is a low bar — most electrical contracting firms cross it — and HSE inspectors will ask to see the risk assessments during any post-incident visit.",
  },
  {
    id: 7,
    question:
      "You're working alone in a customer's cellar. The lighting is one bare bulb on a pull-cord. What does the walk-round flag and what do you do about it?",
    options: [
      "The certificate references the edition in force on the date of installation (e.g. BS 7671:2018+A4:2026). Subsequent amendments don't make the install non-compliant retrospectively, but they DO change what's required for any future addition / alteration / EICR you do on the same installation. Periodic inspection (EICR) is carried out to the standard in force at the time of the inspection — so a 2026 install will be EICR'd against whatever amendment is current in 2031.",
      "IET Academy is the IET's online learning platform — bite-sized technical courses, BS 7671 update training, design and engineering CPD content. Member access typically included with MIET subscription; some content open to non-members. Strong CPD resource alongside scheme-specific (NICEIC, NAPIT) and provider-specific (Elec-Mate) CPD platforms.",
      "Gather and preserve facts at the scene; provide a contemporaneous written account; notify the responsible person immediately; assist with form completion if asked; provide witness information; preserve evidence; cooperate with any HSE follow-up. The operative isn\\\\\\\\'t normally the report-maker but is the source of the facts.",
      "Lighting is part of the workplace under HASAWA s.2(2)(d) and the Workplace (Health, Safety and Welfare) Regulations 1992 Reg 8. Inadequate task lighting in a confined area is a hazard in itself — it hides other hazards (trip risks, services, structural defects) and increases the chance of an error. The fix: bring temporary task lighting, set it up before tools come out, and record the temporary supply on the dynamic assessment.",
    ],
    correctAnswer: 3,
    explanation:
      "Lighting is one of the easiest hazards to fix and one of the most often ignored. The walk-round should explicitly flag 'is the lighting adequate for the task I'm about to do?' and the answer in cellars, lofts, plant rooms and unfinished new-builds is almost always 'no, bring temporary'. Working in poor light leads to slips, missed identification of services and bad terminations.",
  },
  {
    id: 8,
    question:
      "Under CDM 2015 Reg 13, what must the principal contractor provide to anyone coming on to a notifiable construction site to work?",
    options: [
      "Site induction covering the relevant parts of the construction phase plan, the site rules, the welfare arrangements, the emergency procedures, and the specific hazards on that site. Plus access to relevant information from the pre-construction phase. CDM 2015 Reg 13 makes this a duty on the principal contractor and Reg 15 makes it a duty on the worker to co-operate with it.",
      "The Electrical Contractors' Association — the largest trade association for electrical contractors in England, Wales and Northern Ireland. Membership signals quality, access to ECA technical guidance, ECA insurance products, ECA Apprentice scheme (for member firms taking on apprentices), and joint co-running of the JIB. ECA is not a CPS — you still need separate CPS membership for Part P self-certification.",
      "Engineering Council registration typically correlates with meaningful salary uplift. EngTech-registered roles often pay £35-45k; IEng roles £45-65k; CEng roles £65k+. Registration alone doesn't generate the salary — the underlying competence and the roles you take on do — but the registration is widely used as a salary-band anchor in engineering job markets. For senior technical and design roles registration is often a job pre-requisite.",
      "Conditionally yes — but only after the installer verifies and documents that the heating unit complies with Regulation 412.2.1.1 (Class II equipment type-tested and marked). Only when compliance with 412.2.1.1 is demonstrated may the mesh specified in Reg 753.411.3.2 be omitted. Verbal assurance is not acceptance — the documentary evidence of 412.2.1.1 conformity must be in the install file.",
    ],
    correctAnswer: 0,
    explanation:
      "CDM 2015 Reg 13 site induction is the formal mechanism for transferring the principal contractor's hazard knowledge to every operative arriving on site. Skipping the induction or signing in without listening is an apprentice-day-one mistake. The induction is also the moment to ask about specific hazards in your work area — the principal contractor's site team will know about live services, asbestos surveys and trade clashes that the design drawings won't show.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Do I really have to do a dynamic walk-round if there is already a written RAMS?",
    answer:
      "Yes. The RAMS is your starting point — the dynamic walk-round is what closes the gap between paperwork and reality. MHSWR 1999 Reg 3 requires the risk assessment to be 'suitable and sufficient' which means current, not historic. If the building has changed since the survey, if there are new occupants, if the weather has flooded the cellar — none of that is in the RAMS. Five minutes walking through the rooms before tools come out is what discharges the duty.",
  },
  {
    question: "Who actually owns the risk assessment on a domestic job — me or my employer?",
    answer:
      "Your employer owns the formal risk assessment under MHSWR 1999 Reg 3, but every individual operative owes a personal duty under HASAWA s.7 to take reasonable care and to co-operate with the safety arrangements. In practice that means your employer's RAMS is the framework, and you carry out the dynamic check on the day. If you are self-employed you own both.",
  },
  {
    question: "What if the customer doesn't want me wandering through their house first?",
    answer:
      "Explain calmly that a quick walk of the rooms you'll be working in is a safety requirement before tools come out and that it protects them and their family as well as you. Most customers are fine once they understand it isn't snooping. If the customer outright refuses, that itself is a hazard — record it, flag to your supervisor, and consider whether the work can safely proceed. Forcing the issue isn't the answer; raising it up the chain is.",
  },
  {
    question: "How do I record a dynamic risk assessment if I'm a sole apprentice on a job?",
    answer:
      "A short note in your job-pack notebook is enough — date, address, the hazards you identified beyond the RAMS, the controls you put in place. Some firms use a short pre-work checklist on a clipboard or in an app. The point is that there is contemporaneous evidence you did the assessment — not the format. After an incident the inspector will ask 'what risk assessment did you do?' and a notebook entry written at the start of the day is much stronger evidence than a recollection three weeks later.",
  },
  {
    question: "If I spot a serious hazard and my supervisor tells me to ignore it, what should I do?",
    answer:
      "Refuse the unsafe instruction and raise it up the chain — that is exactly what HASAWA s.7 limb (b) requires, and you have specific protection from victimisation under the Employment Rights Act 1996 s.44 (right not to suffer detriment for raising health and safety concerns). 'Following orders' is no defence to a s.7 prosecution. Raising the hazard in writing — even a short text or email — discharges your personal duty regardless of what the supervisor decides next.",
  },
  {
    question: "Is the walk-round needed every day or just on day one of a job?",
    answer:
      "Every day. Conditions change overnight on most sites — other trades have moved, deliveries have arrived, weather has affected the building, the customer has rearranged a room. A two-minute repeat sweep at the start of each day catches what has changed. On a long-running job it also stops complacency creeping in — the moment 'I know this site' becomes the assumption is the moment a fresh hazard gets missed.",
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
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · Subsection 1"
            title="Identifying hazards in the workspace"
            description="A structured site walk before any tool comes out — people, environment, services and fabric. The five minutes that prevents the incident is the unglamorous walk-round, not the heroics afterwards."
            tone="emerald"
          />

          <TLDR
            points={[
              "Static RAMS is the baseline plan written in advance. The dynamic risk assessment is the walk-round you do on the day, in the rooms, with the people who are actually present. Both are required.",
              "Sweep four hazard families in order — people, environment, services, fabric. Working through the same four families each time stops you missing one.",
              "Concealed services (gas, water, structural steel, live cables) are the highest-consequence 'environment' hazard in a domestic install. Treat any positive or intermittent detector reading as a positive find until you've proven otherwise.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the four families of workspace hazard relevant to electrical installation work — people, environment, services, fabric.",
              "Distinguish between the static RAMS and the dynamic risk assessment, and the role of each.",
              "State the duty under MHSWR 1999 Reg 3 to make a suitable and sufficient assessment of risks and to record significant findings.",
              "Identify the duty under HASAWA s.3 to protect non-employees (customers, public, other trades) affected by the work.",
              "Recognise the role of CDM 2015 Reg 13 in transferring hazard information from the principal contractor to operatives joining a notifiable site.",
              "Apply a structured walk-round routine before any tool comes out, repeated daily on long jobs and whenever conditions or people in the area change.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this matters before any tool comes out</ContentEyebrow>

          <ConceptBlock
            title="The five minutes before the toolbox opens is the most important five minutes of the day"
            plainEnglish="On almost every prosecuted electrical incident the post-incident report contains the same line — 'no walk-round was carried out before work commenced'. The walk-round is unglamorous, takes five minutes, and is the single most effective control you have. Skipping it doesn't save time; it transfers the cost of missing a hazard to the moment the hazard hurts someone."
            onSite="The walk-round is a habit, not a checklist exercise. It is what experienced electricians do automatically before they reach into the van. The point of teaching it as a structured routine is to build the habit early, while you are still aware of what you are doing — by year three it should be automatic."
          >
            <p>
              The walk-round has three jobs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Compare what you see against what the RAMS describes. Anything that has changed
                since the survey becomes a fresh hazard you record before you start.
              </li>
              <li>
                Identify hazards the RAMS could not have known about — people who arrived after
                the survey, weather, deliveries, work other trades have done since.
              </li>
              <li>
                Put eyes on the route from the van to the work area, on the work area itself,
                and on any space you might need to use (lofts, cupboards, cellars, gardens for
                cable runs).
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The four hazard families</ContentEyebrow>

          <ConceptBlock
            title="People — pedestrians, customers, children, other trades"
            plainEnglish="People hazards are anyone who can walk into your work area or be affected by what you're doing. On a domestic job that is the customer, their family, their pets, the postman, and the neighbour who wanders over to chat. On a commercial fit-out it adds in other trades, the principal contractor's site team, delivery drivers and visitors to the site office."
            onSite="People hazards are the ones most often missed because they move. A walk-round at 8am that finds an empty kitchen is irrelevant by 3pm when the children come home from school. The control is repeating the check whenever the people in the area change, and barriering or covering live work whenever you step away — even for a couple of minutes."
          >
            <p>
              Specific people hazards on an electrical install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Customers and their family</strong> — particularly children, elderly
                relatives, anyone with reduced mobility or impaired judgement. They are not your
                employees, so HASAWA s.3 applies, and the duty is on you to keep them out of risk.
              </li>
              <li>
                <strong>Pets</strong> — dogs and cats around open consumer units, exposed cables
                and bench tools. They will not respect your warning notice.
              </li>
              <li>
                <strong>Other trades</strong> — particularly anyone working above you (plumbers,
                ceiling fixers, scaffolders) creating falling-object risk, and anyone working in
                the same room creating cable-trip risk.
              </li>
              <li>
                <strong>Yourself</strong> — fatigue, dehydration, distraction by the customer.
                The walk-round is also the moment to honestly assess whether you are fit to do
                the work today.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Environment — weather, dust, asbestos, confined spaces, working at height"
            plainEnglish="The environment is the conditions you're working in — what's coming through the open window, what's underfoot, what's overhead, what's in the air. It changes constantly on a building site and varies wildly between job types."
            onSite="Environmental hazards are the ones the RAMS most often gets wrong because they change between when the surveyor visited and when you arrive. Heavy rain on a first-fix in stud walls, an unexpected heatwave in a loft conversion, a dust cloud kicked up by another trade — none of this is in the paperwork."
          >
            <p>
              The headline environmental hazards for an electrician:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Weather</strong> — rain on first-fix in stud walls (water tracking down
                cables), heat in lofts and roof voids (heat stress, deformation of plastic
                accessories), cold (numb fingers, brittle PVC sheathing).
              </li>
              <li>
                <strong>Dust</strong> — particularly silica from masonry chasing and brick-cutting.
                Respirable crystalline silica is now a HSE priority and the workplace exposure
                limit is being kept under review. FFP3 mask is the bare minimum for chasing.
              </li>
              <li>
                <strong>Asbestos suspicion</strong> — any building constructed or refurbished
                before 2000. Textured ceilings, insulation board, cement products, floor tiles,
                pipe lagging. Treat suspect material as 'asbestos until proven otherwise'.
              </li>
              <li>
                <strong>Confined spaces</strong> — under-floor voids, lift shafts, plant rooms
                with limited ventilation. The Confined Spaces Regulations 1997 apply if there is
                a risk of asphyxiation, fire, drowning or entrapment.
              </li>
              <li>
                <strong>Working at height</strong> — anything where a fall could cause injury.
                Covered separately in Sub 3 (access equipment) but flagged here because the
                walk-round is when you decide what access kit to bring.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Services — concealed cables, gas, water, structural steel"
            plainEnglish="The services hazard is what's hidden inside the building fabric and could be cut, drilled into or otherwise disturbed. The walk-round is when you trace the visible runs and form a picture of what's likely to be in the wall before you start chasing."
            onSite="The cable-and-pipe detector is a tool, not a verdict. It picks up some things some of the time, depending on depth, material and the building's geometry. The walk-round complements the detector — visible meter positions, pipe runs at low level, lintel positions, joist directions in the floor below — all of it informs where you put the chase."
          >
            <p>
              Each service category has its own consequence profile:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Live cables</strong> — concealed mains in walls and ceilings. Existing
                circuits in the property may not be where the customer thinks they are.
                Detector + cautious chase + visual checks at every step.
              </li>
              <li>
                <strong>Gas pipes</strong> — the highest-consequence services hazard. Cutting
                into a live mains gas pipe is a fire-and-explosion risk. Identify the meter
                position, trace the meter tail visually, know where the emergency isolation
                valve is.
              </li>
              <li>
                <strong>Water pipes</strong> — copper and plastic. A burst pipe in a customer's
                home is an embarrassing and expensive call to your insurer. Plastic pipes do
                not show on most cable detectors.
              </li>
              <li>
                <strong>Structural steel</strong> — beams, columns, cavity ties. Must be bonded
                where they form an extraneous-conductive-part (covered in Module 4 Section 4 on
                bonding). Drilling into a steel can also damage drill bits and create dangerous
                projectile shards.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Fabric — masonry condition, joist orientation, plaster, brittle materials"
            plainEnglish="The fabric is the building structure itself. Soft or crumbling brick won't hold a fixing. Plasterboard with a service void behind it is a different drilling problem from solid plaster. Joists running the wrong way change where you can drop a cable."
            onSite="The fabric check is the one apprentices skip most often because it feels like 'looking at a wall'. But fixing into bad masonry is how brackets fall down a week later, and drilling into a service void in the wrong direction is how you put a 6mm hole through a heating return at the floor below."
          >
            <p>
              What to check on the fabric pass:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Masonry condition</strong> — tap and look. Crumbling mortar, soft
                stretcher courses, lime mortar in older buildings — fixings need to be chosen
                accordingly (resin anchors for soft substrates, longer plugs, specialist
                hollow-wall fixings for plasterboard).
              </li>
              <li>
                <strong>Joist orientation</strong> — particularly above ground floor in a
                domestic build. The direction the joists run dictates whether you can drop a
                cable through a ceiling void or have to chase a wall.
              </li>
              <li>
                <strong>Plaster condition</strong> — old lime plaster shatters when chased and
                the chase needs to be deeper to land on a sound base. Modern gypsum plaster
                cuts more cleanly but is more likely to be hiding a service close to the
                surface.
              </li>
              <li>
                <strong>Suspended ceilings, dot-and-dab</strong> — both create voids that change
                drilling depth and fixing strategy.
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

          <ContentEyebrow>Static RAMS vs dynamic risk assessment</ContentEyebrow>

          <ConceptBlock
            title="Two documents, two different jobs"
            plainEnglish="RAMS — Risk Assessment + Method Statement — is the written plan produced before the work starts, usually after a survey. The dynamic risk assessment is what you do on the day, in real time, in the actual rooms. RAMS sets the strategy; the dynamic assessment confirms the strategy still fits the conditions you actually find."
            onSite="The dynamic assessment is what closes the gap between paperwork and reality. It is rarely written formally — a notebook entry or a quick note in the job app is enough — but the act of doing it is what discharges the personal duty under HASAWA s.7 and the employer duty under MHSWR Reg 3."
          >
            <p>
              Sub 5 of this section covers RAMS in detail. The points to keep in mind here:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                A RAMS that just says 'standard electrical install' is a template-trap. The
                inspector will spot it instantly and treat it as evidence the assessment was
                not 'suitable and sufficient' under MHSWR Reg 3.
              </li>
              <li>
                The dynamic assessment doesn't replace the RAMS — it supplements it. If the
                conditions you find are wildly different from the RAMS, stop work and call the
                supervisor for a fresh RAMS rather than try to manage it on the fly.
              </li>
              <li>
                The dynamic assessment is repeated whenever conditions change — start of each
                day, after a break, when other trades arrive, when the people in the area
                change.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Management of Health and Safety at Work Regulations 1999 — Reg 3(1) and 3(6)"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 3(1)</strong> — &quot;Every employer shall make a suitable and
                  sufficient assessment of (a) the risks to the health and safety of his employees
                  to which they are exposed whilst they are at work; and (b) the risks to the
                  health and safety of persons not in his employment arising out of or in
                  connection with the conduct by him of his undertaking, for the purpose of
                  identifying the measures he needs to take to comply with the requirements and
                  prohibitions imposed upon him by or under the relevant statutory provisions and
                  by Part II of the Fire Precautions (Workplace) Regulations 1997.&quot;
                </p>
                <p>
                  <strong>Reg 3(6)</strong> — &quot;Where the employer employs five or more
                  employees, he shall record (a) the significant findings of the assessment; and
                  (b) any group of his employees identified by it as being especially at
                  risk.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Two duties in two sentences. Reg 3(1) is the assessment duty — &apos;suitable and
                sufficient&apos; covers both employees AND non-employees affected by the work.
                Reg 3(6) is the recording duty for firms of five or more employees. Almost every
                electrical contracting firm crosses that threshold. The HSE inspector after an
                incident asks two questions in this order: &apos;show me your risk assessment&apos;
                and &apos;show me how it was kept up to date&apos;. The dynamic walk-round on
                arrival is the answer to the second question.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 3 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.3(1)"
            clause={
              <>
                &quot;It shall be the duty of every employer to conduct his undertaking in such a
                way as to ensure, so far as is reasonably practicable, that persons not in his
                employment who may be affected thereby are not thereby exposed to risks to their
                health or safety.&quot;
              </>
            }
            meaning={
              <>
                The s.3 duty is what catches the customer, the family, the neighbour and any
                other trade in the workspace. The walk-round protects them as well as you. An
                open consumer unit in a household with children is a textbook s.3 risk and an
                inspector will treat the failure to identify it as evidence the
                undertaking was not being conducted as safely as reasonably practicable.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.3 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The structured walk-round routine</ContentEyebrow>

          <ConceptBlock
            title="A repeatable order — outside in, top down"
            plainEnglish="The walk-round is a routine, not a free-flow inspection. Doing it in the same order each time means you don't miss anything. The order most experienced electricians use is outside in (van to area) and top down (ceiling to floor) within each room."
            onSite="On a domestic job the routine takes three to five minutes. On a commercial fit-out it can take fifteen to twenty including the trade-clash check. The time is well-spent — even one missed concealed service or one missed person-in-the-area can cost more in time and money than every walk-round you have ever done combined."
          >
            <p>
              The recommended routine:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Approach</strong> — walk from the van to the work area. Note pedestrian
                routes you'll be using to carry tools and cable, slip/trip hazards on the route,
                weather affecting access, gates and doors that need to be propped or kept secure
                for pets and children.
              </li>
              <li>
                <strong>Building entry</strong> — confirm the customer is expecting you, identify
                who else is in the building (other trades, family members, vulnerable adults,
                children, pets). Locate emergency isolation valves (gas, water) and the consumer
                unit you'll be working at.
              </li>
              <li>
                <strong>Work area sweep</strong> — top down. Ceiling (overhead trades, fixtures
                that could fall), walls (concealed services, fixings, plaster condition, light
                level), floor (slip/trip, joist orientation if floorboards are up, services in
                the floor void).
              </li>
              <li>
                <strong>Auxiliary spaces</strong> — loft, cellar, garage, plant room — anywhere
                you may need to enter during the work. Lighting, ventilation, access kit
                requirements.
              </li>
              <li>
                <strong>Confirm and record</strong> — short note in the job pack, anything
                significant that wasn't in the RAMS goes on the dynamic assessment record.
                Brief the customer on any restrictions (rooms to keep clear, doors to keep
                shut).
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>CDM 2015 on construction sites</ContentEyebrow>

          <ConceptBlock
            title="On a notifiable site the walk-round starts before you arrive — at the induction"
            plainEnglish="On a notifiable construction site (more than 30 days with 20+ workers, or 500+ person-days) CDM 2015 Reg 13 puts a duty on the principal contractor to provide a site induction covering the construction phase plan, site rules, welfare arrangements, emergency procedures and specific hazards. The induction is the formal mechanism for transferring hazard knowledge before you set foot in the work area."
            onSite="Skip the induction or sign in without listening and you've put yourself outside the site H&S system on day one. CDM 2015 Reg 15 makes it a personal duty on the worker to co-operate with the principal contractor's arrangements — that includes the induction."
          >
            <p>
              What the induction should cover, and what to ask if it doesn't:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Site layout, welfare facilities (toilets, mess, drying area), parking and
                pedestrian routes.
              </li>
              <li>
                Emergency procedures — fire alarm, assembly point, first aiders, accident
                reporting route.
              </li>
              <li>
                Site rules — PPE policy, sign-in/sign-out, no-go areas, hot-works permits,
                contractor coordination.
              </li>
              <li>
                Specific hazards on this site — asbestos survey results, live services,
                trade-clash zones, structural concerns.
              </li>
              <li>
                Construction phase plan extracts relevant to your work, plus any pre-construction
                information from the principal designer.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 — Reg 13(4)"
            clause={
              <>
                &quot;The principal contractor must ensure that — (a) a suitable site induction
                is provided; (b) the necessary steps are taken to prevent access by unauthorised
                persons to the construction site; and (c) facilities that comply with the
                requirements of Schedule 2 are provided throughout the construction phase.&quot;
              </>
            }
            meaning={
              <>
                CDM 2015 Reg 13(4) is the formal hook for site induction on notifiable projects.
                Reg 13(1) places the broader duty to plan, manage and monitor the construction
                phase. Reg 15 places the corresponding duty on workers to co-operate. As an
                apprentice arriving on a fit-out, the induction is where you learn the site-
                specific hazards that the textbook walk-round can&apos;t teach you.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 13 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Walking straight into an occupied home and starting work without a walk-round"
            whatHappens={
              <>
                Apprentice arrives at a domestic CU change, customer answers the door, leads them
                straight to the consumer unit. Apprentice opens the toolbox, isolates the supply,
                takes the cover off — and only then notices the toddler watching from behind the
                kitchen door, the partially-open gas valve under the sink, and a pet cat on top
                of the meter cabinet. None of this was in the RAMS because the surveyor visited
                three weeks earlier when the family was at work. By the time the apprentice
                spots the issues the workspace is already partially live and the dynamic risk
                assessment is now happening retrospectively, with tools out.
              </>
            }
            doInstead={
              <>
                Even on a job you&apos;ve been to before, take three to five minutes on arrival
                to walk every room you&apos;ll be working in and the route between them. Note
                what&apos;s changed since the RAMS — people, pets, decoration, weather damage,
                deliveries. Brief the customer on which rooms need to stay clear and why.
                Record the dynamic findings in your job pack. Then open the toolbox.
              </>
            }
          />

          <CommonMistake
            title="Trusting the cable-and-pipe detector as a complete answer"
            whatHappens={
              <>
                Apprentice runs the detector across the wall, sees it light up in one spot,
                avoids that spot, and chases happily through the rest of the wall. Cuts straight
                through a 22 mm copper water pipe the detector missed because it was deeper than
                the detection range and oriented in a direction that gave a weak signal. Customer
                ceiling collapses, insurance call follows, the apprentice&apos;s firm picks up
                the cost of replastering and decoration as well as the pipe repair.
              </>
            }
            doInstead={
              <>
                Detector + visual + caution. Look at the floor below for clues to pipe routes
                (radiators, towel rails, kitchen and bathroom positions). Trace gas and water
                runs visually from the meter wherever possible. Cut shallow first and inspect
                what you uncover before going deeper. Treat any positive or intermittent
                detector reading as a positive find until you&apos;ve proven otherwise. The
                detector is one input, not the verdict.
              </>
            }
          />

          <Scenario
            title="Domestic rewire — homeowner shows you the cellar"
            situation={
              <>
                You arrive at a domestic rewire on a 1930s end-terrace. The homeowner takes you
                straight to the cellar and asks &quot;can you sort the lighting down here while
                you&apos;re at it?&quot;. The cellar has: a single bare bulb on a pull-cord
                that doesn&apos;t work, a copper water pipe weeping at a joint just above head
                height, exposed joists with old VIR cabling stapled to them, a textured ceiling,
                no natural light, a step down with no handrail, and an electricity meter on the
                far wall with the last test certificate dated 1987. The RAMS describes the cellar
                as &quot;limited works, lighting only&quot;.
              </>
            }
            whatToDo={
              <>
                Stop. The cellar as found does not match the RAMS. Walk it once with the
                homeowner, write a fresh dynamic assessment listing every hazard in the order
                you found them: people (homeowner present, possible visitors), environment
                (no light, weeping pipe, suspect asbestos textured ceiling on a 1930s build,
                confined space and trip hazard at the step), services (existing VIR cabling
                potentially live, mains gas in adjacent cellar wall void, water leak above head
                height, meter pre-1990s — likely TT or PME with no recent test), fabric
                (unfinished joists, masonry condition unknown). Call your supervisor before
                touching anything. The realistic next steps are: temporary task lighting before
                any other work, asbestos check on the textured ceiling, a leak fix on the water
                pipe before any electrical work, and a fresh RAMS that reflects what&apos;s
                actually there. The customer&apos;s &quot;while you&apos;re at it&quot; isn&apos;t
                refusable on the spot, but it isn&apos;t doable on the spot either.
              </>
            }
            whyItMatters={
              <>
                A scope-creep request from a customer is the single most common way a small,
                contained job turns into a serious incident. The dynamic walk-round is what gives
                you the evidence to push back politely &mdash; &quot;I can see what you need but
                I can&apos;t safely do it on this visit because of x, y, z&quot;. Without that
                walk-round the apprentice ends up agreeing to the work, dropping into the cellar
                with no light, and disturbing a textured ceiling without a survey. The
                consequences cascade fast and they all sit on the firm&apos;s s.3 / EAWR record.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "The five minutes before tools come out is the most important five minutes of the day. Skipping it doesn't save time, it just transfers the cost to the moment something goes wrong.",
              "RAMS is the baseline written plan. The dynamic risk assessment is what you do on the day, in the rooms, with the people present. MHSWR Reg 3 effectively requires both.",
              "Sweep four hazard families in order — people, environment, services, fabric. The order is a habit; doing it the same way each time stops you missing one.",
              "People hazards include customers, family, pets, other trades and yourself. HASAWA s.3 makes you responsible for non-employees affected by your work — children in the work zone is a textbook s.3 issue.",
              "Concealed services are the highest-consequence hazard. Detector + visual + caution. Treat any positive or intermittent reading as a positive find until you've proven otherwise.",
              "Asbestos suspicion applies to any building constructed or refurbished before 2000. Treat suspect material as 'asbestos until proven otherwise' and stop until you can verify or arrange a survey.",
              "On a notifiable construction site, CDM 2015 Reg 13 site induction is the formal mechanism for transferring hazard knowledge. Reg 15 makes co-operating with it a personal duty on the worker.",
              "The walk-round is repeated daily on long jobs and whenever conditions or people in the area change. 'I know this site' is the moment a fresh hazard gets missed.",
            ]}
          />

          <Quiz title="Workspace hazards — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 1 — Tools used to install wiring systems
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section2/2-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.2 PPE for different tasks
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
