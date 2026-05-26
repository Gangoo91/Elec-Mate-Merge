/**
 * Module 5 · Section 5 · Subsection 1 — Suitable communication methods
 * Maps to City & Guilds 2365-02 / Unit 210 / LO3 / AC 3.1
 *   AC 3.1 — "Identify suitable communication methods for use in work situations"
 *
 * Frame: communication is a working tool. Verbal, written, visual and formal
 * methods each have a job. The wrong medium for the message is how variations
 * stop getting paid, how site briefings go in one ear, and how a contract dispute
 * ends up in court with WhatsApp screenshots as evidence. Match the medium to
 * the message — and leave an audit trail when the message matters.
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
  'Suitable communication methods (3.1) | Level 2 Module 5.5.1 | Elec-Mate';
const DESCRIPTION =
  'Verbal, written, visual and formal communication methods on a building site — picking the right medium for the message and leaving the audit trail when the message matters.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s5-sub1-medium',
    question:
      "A customer rings at 4pm and asks if you can add a second outdoor socket while you're on site tomorrow. They sound friendly and casual. What do you do?",
    options: [
      "Both check Building Regulations compliance, but LABC inspectors work for the Local Authority and follow the public-sector route; Approved Inspectors are private-sector firms registered with CICAIR (Construction Industry Council Approved Inspectors Register) who can be appointed in place of LABC. The choice is the client's. Both have the same statutory authority and the same Building Regulations to enforce.",
      "Report internally; if the defect appears systemic (e.g. a brand of MCB failing prematurely across multiple installs), escalate to the firm\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s technical lead who can report to the manufacturer / RAPEX (Rapid Alert System for Non-Food Products) / Office for Product Safety and Standards. Product withdrawals and safety alerts come out of these channels.",
      "No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger, unless they possess such knowledge or experience or are under appropriate supervision having regard to the nature of the work. So either you're competent yourself OR you're being supervised by someone who is. Working outside your competence without supervision is a Reg 16 breach.",
      "Acknowledge the request verbally, then send a short written variation by email or in your job-management app before the end of the day. Quote the additional cost, get the customer's written confirmation back before you arrive on site, and only then carry out the extra work. The verbal yes is fine for tone; the written variation is what protects payment, scope and warranty.",
    ],
    correctIndex: 3,
    explanation:
      "Consumer Rights Act 2015 treats verbal agreements as binding, but proving what was agreed is another matter. Courts and ombudsmen consistently weight written contractual evidence above verbal recollection. The rule of thumb on a contract change: acknowledge verbally for the relationship, confirm in writing for the file. Variation orders, scope changes and price increases are written, every time, before the work happens — not after.",
  },
  {
    id: 'mod5-s5-sub1-radio',
    question:
      "You're on a fit-out site with a labourer at the lift core feeding cable up to you on the third floor. The hand signal range is broken by a wall, your phones are in the welfare cabin, and the radios are charged on the desk. What's the right communication method to set up before you start the pull?",
    options: [
      "Teams with high collective EI can better understand client concerns, communicate their approach empathetically, build trust during interviews, handle challenging questions with composure, and demonstrate collaborative working relationships — all of which influence bid evaluations",
      "EI enables informal leadership through: influence without authority (social skills), building trust through consistent, regulated behaviour (self-regulation), motivating others through enthusiasm and competence (motivation), understanding and responding to team needs (empathy), and modelling emotionally intelligent behaviour that others naturally follow (self-awareness)",
      "Raise it with your supervisor or QS in line with the firm whistleblowing process; document what you saw, when and where. Falsified certificates are dangerous to the public and a criminal matter under EWR 1989 and the Fraud Act 2006. You have a duty under EWR Reg 3 not to be complicit.",
      "Two-way radios on a pre-agreed channel, tested before the pull starts. Brief both ends on the agreed call-words ('pull', 'stop', 'slack', 'snag'), confirm channel volume so both parties hear over background noise, and agree a default action if comms drop ('stop' is always the default). Phones are a backup, not the primary — they can ring while you're holding cable.",
    ],
    correctIndex: 3,
    explanation:
      "Two-way radio is the right tool for short-range, hands-busy, two-way coordination. The structured pre-brief (call-words, default action on comms loss) is what stops the pull becoming an incident if a battery dies mid-job. The HSE has investigated cable-pull incidents where the operative below couldn't hear 'stop' over plant noise — the safe-system-of-work needs the comms channel built into it from the start.",
  },
  {
    id: 'mod5-s5-sub1-photo',
    question:
      "You finish a first-fix at 5pm. The plasterer is coming in at 7am to board over the chases. What's the most useful communication artefact to leave for the second-fix electrician (which might be you, in a fortnight)?",
    options: [
      "A short series of photos of every chase, every cable drop and every back-box position before the plasterer arrives, geotagged or labelled by room, saved to the job folder. A redline on the layout drawing showing actual routes vs designed routes. Five minutes with a phone camera saves an hour of detective work in two weeks' time and stops the second-fix electrician drilling into a cable they didn't know was there.",
      "All of them — the old fuse board, the under-cabinet LED strips, the extractor fan motor, the integrated oven, the lighting transformers, the ceiling pendants. WEEE covers any equipment dependent on electric currents or electromagnetic fields to work properly. Cable offcuts and fixings are not WEEE but are still controlled waste under the Environmental Protection Act 1990 Duty of Care.",
      "Tape measure (5 m or 8 m, lockable), spirit level (a torpedo level for short runs, a 600 mm level for socket lines), pencil OR a chinagraph pencil for darker surfaces, and a marker square (or just the level on edge) to keep the back box parallel to the line of the wall. Centre-mark with a small cross so the chaser knows where the centre is, not just the outline.",
      "Both can be held liable. The individual harasser is personally liable under s.110 (helping a discriminatory act). The employer is vicariously liable under s.109 for acts done by the employee 'in the course of employment'. The employer's defence is to show they took 'all reasonable steps' to prevent the conduct — i.e. proper policies, training, monitoring and enforcement. A claimant can name both the individual and the employer in the same claim.",
    ],
    correctIndex: 0,
    explanation:
      "Photographs are the most under-used communication artefact on a fit-out. They're free, they're fast, they're geotaggable, and they're contemporaneous evidence. Modern job-management apps timestamp them automatically. The redline on the layout drawing converts the photos into something the second-fix electrician (or the inspector) can navigate — photo plus drawing markup is the gold standard for as-built communication.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the core principle for picking a communication method on site?",
    options: [
      "CAR 2012 Reg 10 — anyone who is or may be exposed to asbestos must receive adequate training. UKATA / IATP-certified asbestos awareness (1-day) is the typical baseline for trades. Higher levels (non-licensed work, licensed work) require more advanced training.",
      "Match the medium to the message. Quick coordination = verbal or radio. Contractual change = written. Geometry or position = visual (photo, sketch, redline). Permanent record = formal (RAMS, certificate, variation order). The wrong medium for the message either burns time (formal letter for a quick query) or burns money (WhatsApp message for a contract change).",
      "Provided to the customer (full pack — EIC + Schedule of Inspections + STR), retained by the contractor (typically minimum six years), and uploaded to any applicable Competent Person Scheme (NICEIC, NAPIT, Stroma, ECA etc.) within the scheme\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s required notification window — typically 30 days for Part P-notifiable work.",
      "Periodic visual inspection, checking for physical damage, verifying ventilation and cooling, reviewing BMS logs for cell imbalance or temperature anomalies, testing isolation and protection devices, confirming firmware is current, and checking earthing and bonding",
    ],
    correctAnswer: 1,
    explanation:
      "Communication is a tool. Like any other tool you reach for the right one for the job. A site supervisor coordinating ten trades through the day uses verbal for fast coordination, radio for hands-busy work, email for variations, photos for as-built and the formal RAMS / certificate for permanent record. Defaulting to one medium for everything is how messages get missed and how variations don't get paid.",
  },
  {
    id: 2,
    question:
      "Which Act places a statutory duty on the employer to provide employees with information they need for their health and safety at work?",
    options: [
      "Reg 722.411.4 applies to TN systems and addresses requirements where a PME earthing facility would otherwise be used as the means of earthing for the protective conductor contact(s) of a charging point located outdoors or that might reasonably be expected to be used to charge a vehicle outdoors. It sets alternative methods (b) to (e) that shall be used instead of using the PME facility directly as the charging-point protective-earth connection.",
      "Risk assessment identifies the hazards; hierarchy of control reduces them; PPE addresses residual risk. Match the standard to the specific hazard (electrical, mechanical, thermal, chemical, biological, ionising). Consider compatibility (multiple PPE items must work together — e.g. helmet + hearing defenders + safety glasses).",
      "Management of Health and Safety at Work Regulations 1999, Reg 10 — every employer must provide employees with comprehensible and relevant information on the risks to their health and safety identified by the assessment, and on the preventive and protective measures. Regulation 11 covers co-operation and co-ordination on shared workplaces. The duty to communicate safety information is statutory, not optional.",
      "Record: measured Ze (= electrode resistance for TT) = 180 Ω; RCD test results — IΔn trip at 30 mA / 27 ms (passes the 300 ms requirement for general use, 40 ms for additional protection); RA × IΔn = 180 × 0.03 = 5.4 V (passes Reg 411.5); and the test instrument used and its calibration date.",
    ],
    correctAnswer: 2,
    explanation:
      "MHSWR 1999 Reg 10 is the statutory hook for safety communication. The word 'comprehensible' is doing a lot of work — a briefing in dense legal English to a labourer with English-as-a-second-language doesn't satisfy the duty. 'Comprehensible' is what drives plain English, visual aids and translated material on real sites. Sub 5.2 picks this up in detail.",
  },
  {
    id: 3,
    question:
      "When is WhatsApp an appropriate communication method on a site?",
    options: [
      "PASMA (for mobile aluminium tower scaffolds) and IPAF (for mobile elevating work platforms / MEWPs / cherry pickers and scissor lifts). PASMA covers tower assembly and use; IPAF covers powered access. Both are industry-recognised competence schemes accepted on most CDM sites. Many plant operators also hold CPCS (for construction plant — excavators, dumpers, telehandlers) or NPORS.",
      "Optimistic individuals persist longer after setbacks, approach challenges with greater creativity, and maintain motivation through difficult periods — leading to measurably better performance outcomes. The MetLife study demonstrated that optimism (measured by Seligman's ASQ) was a better predictor of success than traditional hiring criteria",
      "To co-operate with the client, principal designer, principal contractor, contractor and any other person performing a duty under CDM, AND to report to the principal contractor (or contractor where there is no principal contractor) anything that they consider is likely to endanger their own or another person's health or safety, AND to comply with the requirements of CDM.",
      "Informal coordination — 'I'm five minutes away', 'meet me at the welfare unit', 'have you got a 16mm fly lead in the van'. NOT for contractual changes, scope variations, formal warnings, grievances, safety briefings of record, or anything you might need to defend in a dispute. WhatsApp messages have been admitted as evidence in court, but they carry less evidential weight than a signed variation order and they sit on a personal device the employer doesn't control.",
    ],
    correctAnswer: 3,
    explanation:
      "WhatsApp is excellent for fast informal coordination and dreadful for contractual record. The line between the two gets crossed when an apprentice agrees to extra work on WhatsApp because the customer asked them to. Two months later, when the invoice is disputed, the evidence is a thread of casual messages with no clear scope agreement. The discipline is to switch to a formal medium the moment the conversation stops being coordination and starts being contract.",
  },
  {
    id: 4,
    question:
      "Under CDM 2015, what's the duty around providing pre-construction information to workers?",
    options: [
      "Reg 13 places a duty on the principal contractor to plan, manage, monitor and co-ordinate the construction phase, and to ensure suitable site induction. Reg 4(2) puts a duty on the client and Reg 9 puts a duty on the principal designer to provide pre-construction information. The information must be in a form that can be understood by those who need to use it — that's a written, structured, accessible duty, not a verbal handover at the gate.",
      "Lifting equipment used to lift persons (MEWPs, lift platforms, scaffolding hoists carrying personnel) requires thorough examination at 6-monthly intervals. Other lifting equipment (chain blocks, manual hoists, anchor points used for material lifting only) requires 12-monthly thorough examination, OR in accordance with an examination scheme drawn up by a competent person. Per LOLER 1998 Reg 9(3). The examination is by a competent person (typically an independent examiner) and a written report is provided. The current report must be available with the machine.",
      "Circuit reference, conductor sizes (line, neutral, CPC), protective device type and rating, RCD operating current and operating time (where applicable), R1+R2 or R2 (depending on test method), insulation resistance values (line-line, line-earth, neutral-earth), polarity confirmation, Zs value, RCD operating time, and any test instrument identification needed for traceability.",
      "Consistently demonstrating: (1) framing work as a learning problem (\\\"what can we learn from this?\\\"), (2) acknowledging your own fallibility (\\\"I may have missed something — what do you see?\\\"), (3) modelling curiosity by asking genuine questions, (4) responding to mistakes with inquiry rather than blame, (5) following through on commitments made when people do speak up, and (6) explicitly thanking people for raising concerns even when the news is unwelcome",
    ],
    correctAnswer: 0,
    explanation:
      "CDM 2015 makes communication a structured, multi-party duty. Pre-construction information flows from client and principal designer to principal contractor, who turns it into a construction phase plan and a site induction for everyone arriving on site. The form of communication is regulated — it must be in a form the recipients can understand. Verbal-only doesn't satisfy the duty for a notifiable project.",
  },
  {
    id: 5,
    question:
      "You receive a verbal instruction from your supervisor that contradicts the written method statement for the job. What do you do?",
    options: [
      "Near-misses are the leading indicator of serious incidents. The HSE's accident triangle (and similar industrial-safety models) consistently shows that for every serious incident there are dozens or hundreds of near-misses with similar root causes that didn't quite escalate. Investigating and acting on near-misses is the most effective way to prevent the serious incident. Failing to report a near-miss leaves the same defect in place for the next person — who may not be as lucky.",
      "Stop, raise the conflict politely, and ask for the change in writing. The method statement is the documented safe system of work. A verbal instruction to depart from it needs a documented reason, ideally a revised method statement signed off by whoever owns the original. If the supervisor refuses to put it in writing, that itself is a red flag — escalate via your employer's safety route. HASAWA s.7 makes you personally responsible for following the safe system; 'I was told to' is not a defence to a prosecution.",
      "To enable the customer to operate the install correctly, recognise fault conditions, perform any user-level routine checks (e.g. weekly fire-alarm test) and know when to call you back. Without them the customer can't discharge their own legal duties (e.g. fire-alarm log under the Regulatory Reform (Fire Safety) Order 2005) and is more likely to mis-use or under-maintain the kit.",
      "Five-yearly EICR (Electrical Installation Condition Report) covering the entire fixed electrical installation, including any PV, EV chargers, heat pump supplies, battery storage circuits and MVHR supplies that have been added. Landlord must provide the EICR to tenants and to the local authority on request. Any C1 (immediate danger) or C2 (potentially dangerous) findings must be remediated within 28 days. Environmental tech additions trigger an updated EICR; they don't escape the regime. The Regulations apply to private rented properties in England; equivalents in the devolved nations.",
    ],
    correctAnswer: 1,
    explanation:
      "The conflict between verbal and written instruction is one of the most common ways apprentices get exposed. The principle: the written safe system is the authority unless and until it's formally revised in writing. A verbal instruction to depart from it shifts personal liability to whoever follows the verbal instruction. Asking for the change in writing both protects you and forces a moment of reflection on whether the change is really needed.",
  },
  {
    id: 6,
    question:
      "What's the appropriate communication method for raising a formal grievance about working conditions?",
    options: [
      "The employer is potentially failing in their legal duty under the Health & Safety at Work Act 1974 to protect employee welfare, and a systematic assessment using the HSE Management Standards could help identify and address the organisational factors contributing to poor mental health, potentially reducing both turnover and absence",
      "5-day course at an accredited training centre. Covers ATEX/UKEX directives, hazardous-area zone classification (zones 0/1/2 for gas, 20/21/22 for dust), Ex equipment marking and selection, installation methods (cable glanding, conduit, sealing), inspection regimes (visual / close / detailed). Mix of classroom and practical lab. Assessment includes written exam and practical inspection task. Cost typically £1,000-1,500 plus any travel/accommodation.",
      "Written grievance following the employer's documented grievance procedure (which the employer is required to provide under the ACAS Code of Practice on Discipline and Grievance). The written grievance triggers a structured response with timescales and right of appeal. Verbal complaints are easy to ignore; documented grievances are not. ACAS conciliation is available if the internal process fails.",
      "Control of Substances Hazardous to Health Regulations 2002 (COSHH), SI 2002/2677. COSHH places a statutory duty on the employer to assess and control exposure to hazardous substances — solvents, paints, cleaning products, dust, fumes — and on workers to use the controls provided and report defects. A leaking chemical drum is a COSHH issue: stop work, evacuate the immediate area, report to the supervisor and the site responsible person, and don't try to clean it up yourself unless trained.",
    ],
    correctAnswer: 2,
    explanation:
      "The ACAS Code of Practice on Discipline and Grievance is the framework. Employers without a written grievance procedure are in breach of good practice and the Code's recommendations are taken into account by employment tribunals when assessing the reasonableness of conduct on both sides. Putting a grievance in writing — calmly, factually, with dates — is the apprentice's best protection in the early years.",
  },
  {
    id: 7,
    question:
      "On a fit-out, the principal contractor calls a toolbox talk for everyone arriving on site that morning. What's the purpose of that communication method?",
    options: [
      "0.4 seconds (400 ms) for TN, 0.2 seconds (200 ms) for TT — these are the maximum disconnection times specified in Table 41.1 for the supply system and final-circuit type. For a 30 mA general-purpose RCD operated by a 30 mA residual current (1 x I delta n), the manufacturer\\\\\\\\'s declared maximum trip time is 300 ms (per BS EN 61008 / BS EN 61009 product standards) — well within the Table 41.1 system requirement. The verification is the Table 41.1 limit; the 300 ms is the product spec.",
      "Tariff arbitrage. The system controller can charge the battery from the grid during the cheap window and discharge during the expensive window, regardless of solar. On a tariff with a 25-30 p/kWh spread between cheap and expensive rates, the arbitrage saves a few hundred pounds a year on top of the solar self-consumption benefit. Over a 10-15 year battery life this can roughly double the system's lifetime value compared to solar self-consumption alone. The G98/G99 notification covers grid charging if the system can also export.",
      "Annual service is the standard, with weekly to monthly customer-side tasks. Annual: full strip-down clean, ash compartment service, auger inspection, igniter check, fan check, flue inspection, controls firmware update, performance check. Monthly customer task: empty ash pan. Weekly customer task: top up pellet hopper, check fuel feed, visual check for blockages. Pellet quality matters — high-ash or wet pellets shorten component life. Some boilers need flue cleaning more frequently than annual; chimney sweep is a specialist trade.",
      "Toolbox talks are short, focused, structured verbal briefings to workers on a specific safety topic — typically a hazard relevant to that day or that week. They're documented (sign-on sheet) so the employer can demonstrate they've discharged the MHSWR Reg 10 duty to provide comprehensible information. The format works because it's short, in person, with the chance to ask questions — the opposite of a long written document nobody reads.",
    ],
    correctAnswer: 3,
    explanation:
      "Toolbox talks are HSE-recommended, statutorily-aligned communication. The combination of short length (5-15 minutes), specific topic, in-person delivery and signed attendance record makes them effective both as actual communication and as evidence the duty has been discharged. The apprentice's job is to actually listen, ask if anything is unclear, and sign in honestly.",
  },
  {
    id: 8,
    question:
      "What's an RFI (Request For Information) and when do you use one?",
    options: [
      "A Request For Information is a formal written query from a contractor to the design team (architect, engineer, principal designer) when the drawings or specifications are unclear, contradictory or missing detail. It's logged, numbered, dated and tracked through to a written response. It protects the contractor from being held responsible for a design ambiguity and creates a paper trail for any later dispute. Use one whenever you'd otherwise be guessing.",
      "Because EAWR is the trade-specific instrument made under HASAWA's enabling powers (s.15) — but HASAWA's general duties (s.2, s.3, s.7) sit underneath the EAWR breach as the broader safe-system / personal-duty obligations. Charging both gives the prosecution two routes to conviction and lets the court assess culpability across both the specific technical reg AND the broader systems-of-work failure.",
      "Roughly £15-20/month for full Unite membership for a working electrician, with reduced rates for apprentices, students and the unemployed. Cost is tax-deductible against income tax for trade union subscriptions. In return members get representation in disputes, legal advice, training discounts, member-only insurance products and the Unite member benefits programme.",
      "Investigate. Expected R2 for 20 m of 1.5 mm² Cu is approximately 0.24 Ω. 0.85 Ω is roughly 3.5 × the expected value — strongly suggests a poor termination (loose terminal at an accessory, oxidised connection in a junction box) or a partly broken CPC. Trace through the circuit, retighten or replace the suspect connection, retest.",
    ],
    correctAnswer: 0,
    explanation:
      "RFIs are the formal communication mechanism for design queries on construction projects. Structured RFI logs are standard practice on any project of meaningful scale. As an apprentice you may not raise the RFI yourself — your supervisor or project engineer will — but you should be the source of the question when something on the drawing isn't right. 'I assumed' is the phrase that's never in the file when an RFI would have been the safer move.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Can a verbal agreement with a customer be legally binding?",
    answer:
      "Yes. The Consumer Rights Act 2015 and ordinary contract law recognise verbal agreements as binding contracts, provided the elements of a contract are present (offer, acceptance, consideration, intention to create legal relations). The problem isn't whether the agreement is binding — it's proving what was actually agreed. Courts and ombudsmen consistently give written evidence more weight than verbal recollection. The practical rule for an apprentice: acknowledge verbally for the relationship; confirm in writing for the file. Any change to scope, price or timeline is written, every time.",
  },
  {
    question: "Is a text message or WhatsApp admissible as evidence in a contract dispute?",
    answer:
      "Yes — UK courts routinely admit electronic messages as evidence. But admissibility is not the same as evidential weight. A signed variation order on company letterhead carries more weight than a casual WhatsApp exchange. The Small Claims Court will accept the WhatsApp screenshots; the apprentice will spend a day in court explaining context that a single signed page would have made unnecessary. Use WhatsApp for coordination, switch to email or a formal variation document the moment the topic is contractual.",
  },
  {
    question: "What's the difference between a method statement and a RAMS?",
    answer:
      "A method statement is a step-by-step description of how a particular job will be carried out safely. A RAMS — Risk Assessment + Method Statement — is the combined document that includes both the risk assessment (hazards identified, risks rated, controls specified) and the method statement (the procedure). On most UK sites the two terms are used interchangeably and 'RAMS' is the catch-all. They're a written communication artefact between employer and operative, designed to document the safe system of work and discharge the MHSWR Reg 3 duty.",
  },
  {
    question: "Do I have to attend a toolbox talk if I've heard the same topic before?",
    answer:
      "Yes. Toolbox talks are part of the employer's MHSWR Reg 10 duty to provide comprehensible information. Attending and signing in is also evidence of your personal compliance with HASAWA s.7 — taking reasonable care for your own safety and co-operating with the safety arrangements. Hearing a topic before is not a get-out; site conditions change, controls update, and your re-attendance is the mechanism that keeps the safety information current. Skip a toolbox talk and an inspector will treat your sign-in record as the gap it is.",
  },
  {
    question: "Should I copy my supervisor on every email I send to the customer?",
    answer:
      "On contractual matters and anything that could become a complaint, yes. CC'ing your supervisor on a variation acknowledgement, a programme query or a scope change creates an internal record and gives the supervisor the chance to intervene before the conversation goes off-plan. For purely operational coordination (arrival times, parking, where to find the meter cupboard) it's not necessary. Apprentices in particular should err towards over-copying in the early years — it both protects you and signals that you understand the chain of command.",
  },
  {
    question: "What's the right way to record a phone conversation with a customer?",
    answer:
      "Two options. First — and best — make a contemporaneous file note immediately after the call. Date, time, who was on the call, what was agreed, what action items came out of it. Email a short summary to the customer the same day ('further to our call earlier — to confirm…'). Second, if the call is genuinely contentious, ask permission and record (UK law allows recording of your own conversations for personal record without the other party's consent, but business use is governed by the ICO's guidance — get permission). The file note plus follow-up email is sufficient evidence in 95% of cases.",
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
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5 · Subsection 1"
            title="Suitable communication methods"
            description="Verbal, written, visual and formal — each has a job, and the wrong medium for the message is how variations don't get paid and contract disputes end up in court with WhatsApp screenshots as evidence."
            tone="emerald"
          />

          <TLDR
            points={[
              "Match the medium to the message. Verbal for fast coordination, written for contractual change, visual for geometry, formal for permanent record.",
              "Anything that affects scope, price, timeline or safety goes in writing — even if you also said it verbally for the relationship.",
              "Personal liability under HASAWA s.7 doesn't go away because you 'were only doing what you were told'. If a verbal instruction departs from the written method statement, ask for the change in writing.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify suitable communication methods for use in work situations.",
              "Distinguish between verbal, written, visual and formal communication and the situations each one fits.",
              "Recognise the statutory duty to provide comprehensible information under MHSWR 1999 Reg 10.",
              "Identify the role of CDM 2015 Reg 13 in structuring construction-phase communication.",
              "Apply the discipline of switching from informal to formal media at the moment a conversation becomes contractual.",
              "Recognise WhatsApp and other informal channels as legitimate for coordination but inappropriate for contract change, grievance or safety briefing of record.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why the medium matters as much as the message</ContentEyebrow>

          <ConceptBlock
            title="Communication is a tool — pick the right one for the job"
            plainEnglish="Apprentices arrive on site able to wire a circuit and tend to think communication is the soft bit around the edges. It isn't. Communication is the operating system of the job. Get it right and the work flows; get it wrong and you're chasing variations, defending your position to the customer, or explaining to your supervisor why the brief didn't land."
            onSite="Experienced electricians don't think about which medium to use — they switch automatically. A verbal yes for the customer's tone, a follow-up email for the file. A radio call for the labourer five floors below, a photo of the as-built for the second-fix electrician in two weeks' time. The point of teaching it as four families is to help you build the same automatic instinct."
          >
            <p>
              The four families of communication on a building site:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Verbal</strong> — face-to-face conversations, phone calls, two-way
                radio, public-address (tannoy), toolbox talks. Fast, immediate, allows
                tone and questions, leaves no record unless one is actively created.
              </li>
              <li>
                <strong>Written</strong> — email, text, WhatsApp, formal letter, site
                diary, formal report. Slower than verbal, but creates a record by default
                and supports more complex content.
              </li>
              <li>
                <strong>Visual</strong> — sketch, photograph, video, redline on a drawing,
                screenshot, animated explainer. Best when the message is about position,
                geometry or process — what something looks like or where it is.
              </li>
              <li>
                <strong>Formal</strong> — RAMS, certificate, contract, variation order,
                Request For Information (RFI), grievance letter. Structured, signed,
                logged, often legally significant. The medium of last resort and of
                permanent record.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Verbal communication</ContentEyebrow>

          <ConceptBlock
            title="Face-to-face — the highest-bandwidth medium you have"
            plainEnglish="Standing in front of someone and talking is the richest form of communication available. You get tone, body language, immediate feedback and the chance to clarify on the spot. Most apprentices over-rely on text and email and under-use the in-person conversation."
            onSite="When the message is sensitive, complex, or relationship-critical (a complaint, a safety concern, a difficult customer, a request for help), face-to-face beats every other medium. Walk to the supervisor's office; don't send a long email. Pull a customer aside; don't escalate by text. The cost of a five-minute conversation is much lower than the cost of a misunderstood email thread."
          >
            <p>
              When face-to-face is the right medium:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Anything relationship-critical — first contact with a new customer, a
                difficult conversation, breaking bad news (the job will overrun, the
                price has gone up).
              </li>
              <li>
                Toolbox talks and team briefings — the standard format for transferring
                hazard information and getting buy-in.
              </li>
              <li>
                Coaching an apprentice or training a less-experienced colleague — text
                or video can supplement, but the in-person conversation is the core.
              </li>
              <li>
                Conflict resolution — Sub 5.3 covers this in detail. The default for a
                live conflict is in-person, calmly, in a neutral location.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Phone — the next-best thing when you can't be there"
            plainEnglish="A phone call carries tone and allows immediate feedback but loses body language. It's faster than email when you need an answer in the next ten minutes and it's better than text for anything where the receiver might misread your tone."
            onSite="The discipline with phone calls is the file note. After any call that touched on scope, price, timing or safety, write a short note in your job pack — date, time, who was on the call, what was agreed, what's the action — and send a follow-up email summary to the other party the same day. The combination is much stronger evidence than your memory in three weeks' time."
          >
            <p>
              When phone is the right medium:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Urgent coordination where text would be too slow.
              </li>
              <li>
                A customer query that needs a real answer rather than a holding email.
              </li>
              <li>
                Following up on an email that hasn't been answered and the matter is time-
                sensitive.
              </li>
              <li>
                Anything where you suspect the receiver has misread the tone of a written
                message — switching to voice usually defuses it.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Two-way radio — short range, hands-busy, structured"
            plainEnglish="Two-way radios are the right tool for short-range coordination where both ends have their hands full. Cable pulls, lift-shaft work, large-area site coordination, anywhere the phone in your pocket isn't reachable mid-task."
            onSite="Radios need a pre-brief to work properly. Agree the channel, agree the call-words ('pull', 'stop', 'slack', 'snag'), agree the default action if comms drop ('stop' is always the default), test the channel before you start. Keep transmissions short and one party at a time — radio comms have a half-duplex protocol; you can't both speak at once."
          >
            <p>
              Radio etiquette on site:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Identify yourself and the recipient at the start of each transmission
                (&quot;Lift core to third floor&quot;).
              </li>
              <li>
                Keep messages short and direct — &quot;pull&quot;, &quot;stop&quot;,
                &quot;copy&quot;, &quot;over&quot;.
              </li>
              <li>
                Confirm receipt — never assume the other end heard you. &quot;Confirm
                copy&quot; is the standard ack.
              </li>
              <li>
                If you lose comms, default to the agreed safe action — usually
                &quot;stop&quot; — never default to carrying on without contact.
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

          <ContentEyebrow>Written communication</ContentEyebrow>

          <ConceptBlock
            title="Email — formal-by-default, audit-trail, slow"
            plainEnglish="Email is the workhorse of professional written communication. It's slower than text or WhatsApp but it carries more weight, it's archived by default in a business email system, and it supports attachments, formatting and structured content."
            onSite="Use email for anything where the file matters — variations, scope changes, programme updates, customer queries that need a documented response, follow-ups to phone calls. Keep the subject line specific (&quot;Variation 03 — additional outdoor socket — confirmation&quot; not &quot;Quick question&quot;). CC your supervisor on anything contractual."
          >
            <p>
              When email is the right medium:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Variations and scope changes — written confirmation before work proceeds.
              </li>
              <li>
                Customer-facing communication where the response will form part of the
                project record.
              </li>
              <li>
                Internal handover notes — shift change, job handover to a colleague.
              </li>
              <li>
                Confirming verbal agreements — &quot;further to our call earlier, to
                confirm…&quot;.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Text and WhatsApp — fast, informal, NOT for contract"
            plainEnglish="Text messages and WhatsApp are excellent for quick informal coordination — 'I'm five minutes away', 'meet at the welfare unit', 'have you got a 16mm fly lead in the van'. They're a poor choice for anything contractual, formal or that needs to live in the project record."
            onSite="The line between coordination and contract gets crossed when an apprentice agrees to extra work on WhatsApp because the customer asked them to. Two months later, the invoice is disputed and the evidence is a thread of casual messages. The discipline: switch to a formal medium the moment the conversation stops being coordination and starts being contract."
          >
            <p>
              Where WhatsApp / text fits:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Logistics and coordination — arrival times, parking, who's bringing what.
              </li>
              <li>
                Quick photos for context — &quot;is this the right cable&quot; with a
                photo attached.
              </li>
              <li>
                Group coordination among the immediate site team.
              </li>
            </ul>
            <p className="pt-2">
              Where it doesn&apos;t fit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Variations, scope changes or any conversation about price.
              </li>
              <li>
                Formal warnings, grievances or anything HR-relevant.
              </li>
              <li>
                Safety briefings of record — those are toolbox talks with sign-on sheets.
              </li>
              <li>
                Complaints from customers — switch to email or phone immediately.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Site diary, formal letter and report — the permanent record"
            plainEnglish="A site diary is your personal contemporaneous record of what happened on site each day — who was there, what was done, what was agreed, what went wrong, what got fixed. A formal letter is the heaviest medium of written communication and is reserved for situations that need to land with weight (contract notices, formal complaints). A formal report is a structured document — incident report, inspection report, defect report — written to be read by people who weren't there."
            onSite="Site diaries are old-fashioned and entirely worth keeping. A short notebook in the van with date, address, hours on site, what was done and any incidents is the apprentice's best protection in the early years. App-based job-management systems do the same job digitally, but the principle is the same: write it down on the day, not from memory three weeks later."
          >
            <p>
              When each is the right medium:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Site diary</strong> — every working day. The personal record that
                supports your portfolio, your timesheet and your defence in any later
                dispute.
              </li>
              <li>
                <strong>Formal letter</strong> — contract notices, formal warnings, formal
                complaints, grievance escalations. The heavy artillery — use sparingly
                but use properly.
              </li>
              <li>
                <strong>Formal report</strong> — incident reports under RIDDOR
                (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations
                2013), defect reports, structured inspection reports, AM2 portfolio
                evidence reports.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Management of Health and Safety at Work Regulations 1999 — Reg 10(1)"
            clause={
              <>
                &quot;Every employer shall provide his employees with comprehensible and
                relevant information on — (a) the risks to their health and safety
                identified by the assessment; (b) the preventive and protective measures;
                (c) the procedures referred to in regulation 8(1)(a); (d) the identity of
                those persons nominated by him in accordance with regulation 8(1)(b); and
                (e) the risks notified to him in accordance with regulation 11(1)(c).&quot;
              </>
            }
            meaning={
              <>
                The duty is to provide &quot;comprehensible and relevant&quot; information
                — both words matter. &quot;Comprehensible&quot; rules out information
                that&apos;s technically correct but pitched in language the worker
                can&apos;t follow. &quot;Relevant&quot; rules out information dumps that
                bury the important point. The whole apparatus of toolbox talks, plain-
                English RAMS summaries and translated safety briefings flows from this
                regulation. Reg 10 is what makes communication a statutory duty rather
                than good practice.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 10 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Management of Health and Safety at Work Regulations 1999 — Reg 11(1)"
            clause={
              <>
                &quot;Where two or more employers share a workplace (whether on a temporary
                or a permanent basis) each such employer shall — (a) co-operate with the
                other employers concerned so far as is necessary to enable them to comply
                with the requirements and prohibitions imposed upon them by or under the
                relevant statutory provisions and by Part II of the Fire Precautions
                (Workplace) Regulations 1997; (b) (taking into account the nature of his
                activities) take all reasonable steps to co-ordinate the measures he takes
                to comply with the requirements and prohibitions imposed upon him by or
                under the relevant statutory provisions and by Part II of the Fire
                Precautions (Workplace) Regulations 1997 with the measures the other
                employers concerned are taking to comply with the requirements and
                prohibitions imposed upon them by or under those provisions; and (c) take
                all reasonable steps to inform the other employers concerned of the risks
                to their employees&apos; health and safety arising out of or in connection
                with the conduct by him of his undertaking.&quot;
              </>
            }
            meaning={
              <>
                Reg 11 is the duty to communicate between employers sharing a workplace —
                exactly the situation on every fit-out. The electrical contractor must
                co-operate with the M&E contractor, the joiner, the plasterer and every
                other trade on co-ordinating safety. The mechanism is communication, both
                verbal (toolbox talks, daily co-ordination meetings) and written (RAMS
                shared, programme issued, site rules signed). Failing to communicate
                hazards between trades is a Reg 11 breach.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 11 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Visual communication</ContentEyebrow>

          <ConceptBlock
            title="Photographs, sketches and redlines — when geometry beats words"
            plainEnglish="A photograph of where a cable runs in a wall takes two seconds and conveys more than a paragraph of written description. A redline on a layout drawing showing actual vs designed routes converts the photo into something the inspector or the next electrician can navigate. A quick sketch on the back of a job sheet often clarifies a question that would take ten minutes to write out."
            onSite="Visual communication is the most under-used family on most sites. Apprentices in particular default to text when a photo plus a one-line caption would do the job better. Modern job-management apps make it almost frictionless — point the phone, tap, attach to the job — and the resulting record is contemporaneous, geotagged and timestamped."
          >
            <p>
              When visual is the right medium:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>As-built records</strong> — chases, cable runs, back-box
                positions before plastering. Five minutes with a phone camera saves
                hours of detective work later.
              </li>
              <li>
                <strong>Defect or snag records</strong> — photo of the fault, with a
                ruler or coin in shot for scale, geotagged and timestamped.
              </li>
              <li>
                <strong>Position queries</strong> — &quot;is this the right location for
                the socket?&quot; with a photo annotated with markup is much faster
                than a written description.
              </li>
              <li>
                <strong>Process demonstration</strong> — a short video of a manufacturer&apos;s
                installation procedure or a colleague&apos;s technique is often the
                clearest training material.
              </li>
              <li>
                <strong>Drawing redlines</strong> — formal markup of as-built changes on
                the design drawings, signed off and returned to the design team.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Formal communication</ContentEyebrow>

          <ConceptBlock
            title="RAMS, certificates, variation orders and RFIs — the structured record"
            plainEnglish="Formal communication is the documents that have a name, a number, a sign-off and often a legal weight. RAMS document the safe system of work. Certificates document compliance. Variation orders document scope and price changes. RFIs document design queries. Formal letters document contract notices. Each one is structured because the structure is what gives it weight."
            onSite="As an apprentice you'll receive most formal communication rather than initiate it. The discipline is to read it (don't sign without reading), keep your copy, and treat it as the authoritative version when there's any conflict between formal and informal communication. A signed variation order beats a remembered phone call, every time."
          >
            <p>
              The headline formal communication artefacts on an electrical job:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>RAMS</strong> — Risk Assessment + Method Statement. The safe
                system of work, signed off before work starts.
              </li>
              <li>
                <strong>Certificates</strong> — Electrical Installation Certificate (EIC),
                Minor Works Certificate, EICR. Statutory record of electrical compliance
                under BS 7671 and Part P.
              </li>
              <li>
                <strong>Variation order</strong> — formal record of any change to scope or
                price, signed by the customer before work proceeds.
              </li>
              <li>
                <strong>RFI</strong> — Request For Information. Formal query to the
                design team when drawings or specs are unclear, logged and tracked to
                resolution.
              </li>
              <li>
                <strong>Permit-to-work</strong> — formal authorisation for high-risk
                tasks (live work, hot work, confined-space entry) issued by the
                responsible person and signed back on completion.
              </li>
              <li>
                <strong>Handover documentation</strong> — Operations & Maintenance manuals,
                as-built drawings, test certificates bundled and handed to the client at
                project completion.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 — Reg 13(1) and 13(2)"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 13(1)</strong> — &quot;The principal contractor must plan,
                  manage and monitor the construction phase and co-ordinate matters
                  relating to health and safety during the construction phase to ensure
                  that, so far as is reasonably practicable, construction work is carried
                  out without risks to health or safety.&quot;
                </p>
                <p>
                  <strong>Reg 13(2)</strong> — &quot;In fulfilling the duties in paragraph
                  (1), and in particular when — (a) preparing the construction phase
                  plan; and (b) organising co-operation between contractors and co-
                  ordinating their work, the principal contractor must take into account
                  the general principles of prevention.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Reg 13 puts a duty on the principal contractor to communicate hazard
                information forwards (to operatives) and to co-ordinate communication
                sideways (between trades). The construction phase plan is the headline
                written artefact, the site induction is the verbal mechanism, the daily
                briefings and toolbox talks are the ongoing communication. The whole
                CDM 2015 framework is a structured communication regime.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 13 — verbatim from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Agreeing to a contract change on WhatsApp"
            whatHappens={
              <>
                Customer messages on WhatsApp at the end of the day asking if the
                apprentice can &quot;just add a couple more sockets&quot; while
                they&apos;re on site tomorrow. Apprentice replies &quot;yeah no
                problem&quot;. The work happens, gets added to the invoice with an
                additional charge, and the customer disputes it because the original
                quote didn&apos;t mention them. The dispute goes to the Small Claims
                Court. The evidence on both sides is a thread of casual WhatsApp
                messages with no clear scope or price agreement. The court finds for
                the customer because the contractor cannot demonstrate the variation
                was properly documented before work commenced.
              </>
            }
            doInstead={
              <>
                Acknowledge the request verbally or by message for the relationship.
                Switch immediately to a formal medium for the contract — a written
                variation document by email, listing the additional work, the additional
                cost, the additional time impact and the customer&apos;s confirmation
                requirement. Don&apos;t start the additional work until the written
                confirmation is back. Five minutes of formal documentation prevents
                the dispute and protects the payment.
              </>
            }
          />

          <CommonMistake
            title="Following a verbal instruction that contradicts the written method statement"
            whatHappens={
              <>
                Apprentice on a fit-out is briefed via the RAMS to isolate a sub-
                distribution board before working on a downstream circuit. Supervisor
                arrives and says &quot;don&apos;t bother, the load downstream is light,
                just crack on live, we&apos;re behind schedule&quot;. Apprentice does
                what the supervisor said. Receives a shock. Investigation finds the
                apprentice departed from the documented safe system of work, on a
                verbal instruction that was never recorded. HASAWA s.7 personal
                liability sits on the apprentice; the supervisor faces s.7 too plus
                potential employer liability under s.2.
              </>
            }
            doInstead={
              <>
                Stop. Politely ask the supervisor to put the change in writing — even
                a one-line email or a revised method statement signed by both of you.
                If the supervisor refuses, escalate via your employer&apos;s safety
                route. The written method statement is the authoritative safe system
                until it&apos;s formally revised. &quot;I was told to&quot; is not a
                defence to a HASAWA s.7 prosecution and Employment Rights Act 1996
                s.44 protects you from being penalised for raising the safety
                concern.
              </>
            }
          />

          <Scenario
            title="Customer rings at 4pm asking for a variation tomorrow"
            situation={
              <>
                You&apos;re on a kitchen rewire that you&apos;re due to finish tomorrow.
                The customer rings at 4pm, friendly and casual. &quot;Could you fit an
                EV charger on the front of the house while you&apos;re here? I know it&apos;s
                last minute but the car&apos;s being delivered Friday.&quot; The original
                quote covers a kitchen rewire only — no outside work, no EV charger, no
                supply assessment. You&apos;ve got the rest of the day on site to wrap up
                first-fix.
              </>
            }
            whatToDo={
              <>
                Acknowledge the request warmly on the phone — &quot;I hear you,
                let&apos;s see what&apos;s possible&quot;. Don&apos;t commit verbally.
                Explain that an EV charger is a separate piece of work that needs
                a supply assessment (DNO notification under ESQCR 2002 plus BS 7671
                Section 722 considerations), a separate quote and probably a separate
                visit because the kit needs ordering. Offer to send a written variation
                proposal within 24 hours covering scope, cost and earliest install
                date. Send the email the same evening with the variation laid out
                clearly. Don&apos;t carry out any EV-charger-related work until the
                customer has confirmed in writing. Document the call in your job
                pack — date, time, what was discussed, what you&apos;re doing next.
              </>
            }
            whyItMatters={
              <>
                The temptation to say yes on the phone is enormous — the customer is
                friendly, the work is in your skill range, and turning it down feels
                rude. But agreeing on the phone bypasses the design and notification
                duties (DNO consent for EV chargers, supply capacity check, Part P
                notification, BS 7671 Section 722 compliance), exposes you to a
                contract dispute if the price isn&apos;t agreed in writing, and risks
                non-compliant work if it&apos;s rushed. The right medium for a contract
                change is written, every time. The verbal acknowledgement is for the
                relationship; the written variation is for the file.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Match the medium to the message. Verbal for fast coordination, written for contractual change, visual for geometry, formal for permanent record.",
              "Anything that affects scope, price, timeline or safety goes in writing — even if you also said it verbally for the relationship.",
              "WhatsApp is excellent for coordination and dreadful for contract. Switch to a formal medium the moment the conversation stops being coordination and starts being contract.",
              "MHSWR 1999 Reg 10 makes 'comprehensible and relevant' safety information a statutory duty. Reg 11 extends the duty to inter-trade communication on shared workplaces.",
              "If a verbal instruction departs from the written method statement, ask for the change in writing. HASAWA s.7 personal liability doesn't go away because you 'were only doing what you were told'.",
              "Photographs are the most under-used communication artefact on a fit-out. Five minutes with a phone camera before plastering saves hours of detective work later.",
              "Keep a contemporaneous record of everything — site diary, file notes after phone calls, follow-up emails after meetings. Memory in three weeks' time is no match for a note written on the day.",
              "Formal artefacts (RAMS, certificates, variation orders, RFIs, permits-to-work) are structured because the structure is what gives them weight. Read before signing, keep your copy, treat them as authoritative.",
            ]}
          />

          <Quiz title="Suitable communication methods — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section4/4-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.4 BS 7671 514.13 warning notices
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section5/5-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.2 Effective comms across disabilities and language
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
