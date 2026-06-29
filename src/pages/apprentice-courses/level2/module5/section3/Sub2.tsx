/**
 * Module 5 · Section 3 · Sub 2 — Reading RAMS / Method Statements
 * Synthesis Sub — extends LO2 / AC 2.2 (purpose of workplace information)
 * but is not directly mapped to a single 210 AC. Reading RAMS is a Level 2
 * skill; writing them is a Level 3 / 4 skill.
 *
 * Frame: RAMS = Risk Assessment + Method Statement. The apprentice's job is
 * to READ and FOLLOW. Generic vs site-specific. Sign-on responsibility.
 * Stopping work when RAMS doesn't match the actual conditions.
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
  'Reading RAMS and method statements | Level 2 Module 5.3.2 | Elec-Mate';
const DESCRIPTION =
  'How to read a RAMS like a tradesperson, not skim it like a chore. Generic vs site-specific, sign-on responsibility, and stopping work when the document does not match what you are being asked to do.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s3-sub2-signon',
    question:
      "You're handed a RAMS at the morning briefing and asked to sign the front sheet. The supervisor is moving on to the next operative quickly. You haven't read it yet. What do you do?",
    options: [
      "Politely ask for two minutes to read it before signing. Signing the RAMS sign-on sheet is a positive declaration that you have read it, understood it, and will work to it. If something goes wrong later and the document had a defect you could have spotted on a quick read, your signature on the front is evidence against you. Two minutes of reading at the briefing is non-negotiable.",
      "IQA Level 4 (Internal Quality Assurance) is the qualification for verifying assessment quality — you sample and second-mark other assessors' work to ensure consistency. Senior progression beyond TAQA L3. Typical course 5-10 days plus portfolio. Required for IQA roles at colleges and training providers, and for senior assessor positions. Can lead to EQA (External Quality Assurance) at L4 — the awarding body's own QA function.",
      "Safety Data Sheet — a 16-section document required for all hazardous substances by the CLP Regulation (EU 1272/2008, retained as UK law after Brexit). The SDS is the manufacturer's authoritative source of hazard, handling, exposure and first-aid information for the product. Required by COSHH 2002 Reg 12 to be available to anyone handling the substance.",
      "HSE acknowledges receipt and may follow up — desktop review, request for further information, site visit, inspection. Whether HSE attends depends on the severity of the incident and the wider context (e.g. recurrence, sector trends, public interest). For specified injuries and fatalities a follow-up visit is normally expected.",
    ],
    correctIndex: 0,
    explanation:
      "The RAMS sign-on is a personal declaration. Once your signature is on it you've adopted the document — including the working method, the controls, and the residual risks. HASAWA s.7 places a personal duty on you to take reasonable care; reading the document you are signing is the most basic application of that duty. Most supervisors will accept a 'two minutes please' request without complaint precisely because they know what it means if you signed without reading.",
  },
  {
    id: 'mod5-s3-sub2-mismatch',
    question:
      "The RAMS specifies a podium step for working at height in the comms cupboard. When you arrive the cupboard is full of stored boxes and the only access kit on site is a step ladder. The supervisor says 'just use the step ladder, it'll be fine'. What's the right move?",
    options: [
      "Ze is a LIVE test — it requires the supply to be energised and the measurement is taken at the MET with the installation isolated. It is part of the live test sequence after first energisation, but its value is needed for the dead-test sequence Zs calculations (Zs = Ze + R1+R2). On a new install, Ze is typically measured early in the live-test phase but estimated from DNO published values during dead-test design verification.",
      "Stop, raise it in writing (text the supervisor or log it in the app). The RAMS specifies a podium for a reason — that is the documented control for the working-at-height risk on this task. Verbally swapping it out for a step ladder is an undocumented change to the safe system of work. Either the boxes get cleared and the podium gets used, or the RAMS gets formally amended and re-signed by everyone affected. WAHR 2005 Reg 6 puts the duty on the employer to use the most suitable equipment; verbally downgrading isn't a defence.",
      "Potentially yes. CDM 2015 Reg 2 defines a 'contractor' as any person (including a company) who in the course or furtherance of a business carries out, manages or controls construction work. If your firm is the only one carrying out construction work for the client, your firm is the contractor. As the operative on site you carry the Reg 8 (general worker) and Reg 15 (cooperation) duties, plus your firm carries Reg 9 (contractor duties — plan, manage, monitor). Contractor status is a function of the role, not the title.",
      "The customer makes the COMMERCIAL decision (cost / convenience trade-off). The firm makes the SAFETY / COMPLIANCE decision (which options satisfy BS 7671 + current standards). Apprentice presents options with trade-offs in plain English; customer chooses; firm executes the chosen option within the safety constraint. Customer cannot choose 'below BS 7671' — that's the firm's professional duty floor. The boundary: customer chooses between compliant options; firm refuses non-compliant requests.",
    ],
    correctIndex: 1,
    explanation:
      "RAMS deviations have to be documented or they aren't real. A verbal 'just do it this way' from the supervisor doesn't change the legal status of the document — the RAMS is still in force, and if you work outside it you're working outside the safe system of work. Raising it in writing creates a record, gives the supervisor a chance to either clear the obstruction or properly amend the document, and protects you if the work later goes wrong. Refusing the unsafe instruction is also explicitly protected under the Employment Rights Act 1996 s.44.",
  },
  {
    id: 'mod5-s3-sub2-generic',
    question:
      "The RAMS for today's job is identical word-for-word to the RAMS you signed three weeks ago for a completely different site. The hazards listed are 'electrical hazards, working at height, manual handling' and the controls are 'use of PPE, safe working practices'. What does this tell you?",
    options: [
      "Competent-person schemes (CPS) are Government-authorised audit bodies that allow registered contractors to self-certify Building Regulations Part P notifiable work in dwellings. Trade associations are member bodies that lobby for the industry, run technical events, publish guidance and (in the case of ECA and SELECT) co-run the JIB / SJIB. A firm typically belongs to both — one CPS for self-certification, one trade association for representation.",
      "Install a separate earth electrode (earth rod) for the EV charging circuit, creating TT earthing for that circuit, with an RCD providing earth fault protection — or use an EVSE that the manufacturer confirms has integral open-PEN protection meeting the requirements of BS 7671 Regulation 722.411.4",
      "It's a generic template-trap. The RAMS hasn't been tailored to this site, the actual hazards aren't listed, and the controls are too vague to be useful. MHSWR 1999 Reg 3 requires the assessment to be 'suitable and sufficient' — generic boilerplate is the opposite of that. Raise it with the supervisor before signing, ask for site-specific content, and don't start work on the basis of the generic version.",
      "The supervision is appropriate when the supervisor is themselves competent for the task, has direct visibility of the work AND the trainee, can intervene before a danger materialises, and the degree of supervision is matched to BOTH the task danger AND the trainee's experience level. A second-year on socket extensions is light supervision; a first-year on a CU change is direct, hands-on supervision throughout. Token oversight from elsewhere on site doesn't meet the regulation.",
    ],
    correctIndex: 2,
    explanation:
      "Generic RAMS that haven't been tailored to the specific site are a HSE inspector's first finding. The 'suitable and sufficient' test under MHSWR 1999 Reg 3 has been interpreted by the courts as requiring the assessment to reflect the actual conditions — not to recite a list of generic hazards that could apply anywhere. Recognising the template-trap and pushing back on it is part of becoming a tradesperson. By year three you should be able to spot it within thirty seconds of opening the document.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: "What does RAMS actually stand for, and what does each half do?",
    options: [
      "The four stages — concrete experience (having an emotional interaction), reflective observation (thinking about what happened and how you felt), abstract conceptualisation (identifying patterns and principles), and active experimentation (trying a new approach next time) — create a systematic method for learning from emotional experiences rather than repeating the same patterns",
      "Risk Assessment + Method Statement. The Risk Assessment identifies hazards, evaluates the risk (likelihood × consequence) and lists the controls. The Method Statement turns the assessed risks into a step-by-step working procedure that builds in the controls. Together they convert MHSWR 1999 Reg 3 duty into specific instructions for specific work.",
      "Part 4 — protection for safety. Specifically Chapter 41 (protection against electric shock), where Reg 411.3.3 (RCD on socket-outlets up to 32 A) and Reg 411.3.4 (RCD on luminaires in domestic premises) live. Part 4 is where every shock / overcurrent / thermal protection question lands.",
      "Rotational — typically 2 weeks on platform / 2 weeks off, or 14/14 patterns. Offshore platform work involves helicopter transit (HUET training required), confined-space and working-at-height, harsh weather, extended periods away from home. Day rates typically £400-700+ on rotation but the family/relationship demands are significant. Common in North Sea (oil and gas) and offshore wind (East Coast UK, Scotland).",
    ],
    correctAnswer: 1,
    explanation:
      "RAMS is the standard industry shorthand for Risk Assessment + Method Statement. The two halves are different documents that travel together — the assessment identifies what's risky and what's done about it, the method statement is the step-by-step recipe that incorporates those controls. A RAMS that has only the assessment half (a list of hazards with no method) or only the method half (a procedure with no risk basis) is incomplete.",
  },
  {
    id: 2,
    question: "Which statutory regulation is the basis for the risk-assessment half of RAMS?",
    options: [
      "Being proactive within your level of authority — asking questions, volunteering for learning opportunities, suggesting improvements, and taking appropriate action when you identify issues — while recognising when to seek guidance",
      "A poor or loose termination at one end (most often the MET) or at the BS 951 clamp itself — oxidised contact face, screw not torqued, ferrule damaged. The cable resistance alone should be ~7 mOhm; 0.85 ohm means about 0.84 ohm of contact resistance somewhere.",
      "Management of Health and Safety at Work Regulations 1999 Reg 3 — every employer (and every self-employed person) must make a 'suitable and sufficient' assessment of risks to health and safety. Reg 3(6) requires firms with five or more employees to record the significant findings.",
      "Carry out visual inspection (cable condition, connector pins, enclosure integrity, ventilation), electrical testing (earth continuity, insulation resistance, RCD operation, loop impedance), verify smart functionality (communication, scheduling, firmware version), and check the control pilot signal is within specification",
    ],
    correctAnswer: 2,
    explanation:
      "MHSWR 1999 Reg 3 is the statutory hook for the risk-assessment regime in Great Britain. It's made under HASAWA's enabling powers, so a breach of Reg 3 also feeds into a HASAWA s.2 / s.3 breach. The 'five or more employees' recording threshold is low — almost every electrical contracting firm crosses it — so written RAMS are effectively required for the contracting industry.",
  },
  {
    id: 3,
    question: "What's the apprentice's specific job in the RAMS process?",
    options: [
      "A trained operative who attaches loads to a crane (slinging) and signals the crane operator (signalling) during a lift. Both functions require formal CPCS or equivalent training. Lift operations are governed by LOLER 1998 (Lifting Operations and Lifting Equipment Regulations) which requires lifts to be planned by a competent person and supervised throughout.",
      "You must confirm that the rating and condition of the existing equipment, including that of the distributor (cut-out fuse, service cable capacity, declared earth fault loop impedance, declared maximum demand), is adequate for the altered circumstances. Only then do you design the addition.",
      "Although the PD's primary duty is during the pre-construction phase (gathering and providing pre-construction information), they often make periodic visits during construction to verify that the design assumptions held up and that the pre-construction H&S information is being used. This is especially common on complex projects where design changes during construction.",
      "Read it, follow it, sign on, work to the controls and steps as written, and flag anything on site that doesn't match what the document describes. Writing RAMS is a Level 3 / 4 / supervisor competency — at Level 2 you're a reader and follower of RAMS, and a flagger when reality doesn't match.",
    ],
    correctAnswer: 3,
    explanation:
      "There's a clear progression of RAMS competency in the trade. Level 2 apprentices read and follow RAMS. Level 3 apprentices and competent operatives read, follow and contribute to RAMS amendments. Supervisors and project managers write the RAMS. Trying to leapfrog the progression — writing RAMS as a first-year — is how generic boilerplate ends up on site. Be a competent reader first.",
  },
  {
    id: 4,
    question: "What is the 'sign-on' on a RAMS and what does signing it commit you to?",
    options: [
      "It's a positive declaration that you have read the RAMS, understood it, and will work to it. Once your signature is on the sheet you've personally adopted the document — including the working method, the controls and the residual risks. It's the contractor's evidence to the HSE that the operatives were properly briefed, and it's the reason your supervisor will push back if you sign without reading.",
      "Reg 644.1.1 — 'Upon completion of inspection and testing of an installation or an addition or alteration to an installation, an Electrical Installation Certificate based on the model in Appendix 6, together with a Schedule of Inspections (or Schedule of Items Inspected) and a Schedule of Test Results, shall be given to the person ordering the work.'",
      "Because a ladder is a personal access platform that doesn't have a guardrail and depends on the user's three-point contact and footing for stability. It provides minimal collective protection. INDG401 and INDG402 (HSE guidance) limit ladder use to short-duration tasks (typically up to 30 minutes at one location), light work (one-handed work where reasonably practicable, with a free hand for grip) and where a higher control isn't reasonably practicable.",
      "Lower electricity bills (offset import + earn SEG on export), reduced carbon footprint, partial grid-independence (with battery), a hedge against rising electricity prices, often a positive impact on house value, and government incentive schemes that vary by year. Real benefits — but not “free electricity”.",
    ],
    correctAnswer: 0,
    explanation:
      "The sign-on sheet is one of the most-checked documents on a site after an incident. The HSE inspector traces backwards: who was briefed, what did the briefing cover, did the briefing match the activity? Your signature is the firm's evidence that the answer is 'yes'. Signing without reading transfers the consequence of any defect in the document onto you personally as well as onto the firm.",
  },
  {
    id: 5,
    question: "What's the difference between a generic RAMS and a site-specific RAMS?",
    options: [
      "Accountability structures are important because EI development involves changing habitual patterns, which is difficult without external support. An effective structure might include: a development partner (colleague or mentor who checks in regularly), a reflective journal (tracking specific incidents and responses), regular self-assessments, and scheduled review points to evaluate progress against goals",
      "A generic RAMS is template wording that could apply to any job — 'electrical hazards', 'working at height', 'use of PPE'. A site-specific RAMS names the actual site, the actual tasks, the hazards identified on the walk-round, the specific access kit, the specific controls and the specific steps. The HSE 'suitable and sufficient' test under MHSWR Reg 3 effectively requires site-specific content.",
      "The 'workmanship' standard and 'manufacturers' instructions' obligation. So a faulty cable joint that's electrically OK at the moment of test but executed with poor workmanship breaches 134.1.1, AND ignoring an SPD lead-length spec or a CU manufacturer's torque setting also breaches 134.1.1. This is the regulation a scheme inspector quotes when they're calling out poor workmanship without it being a specific technical-test failure.",
      "Four dead-test functions on the MFT: (1) Continuity of protective conductors (R1+R2 / R2), low-resistance ohms range; (2) Insulation resistance, 500 V DC test (250 V for SELV / 1000 V for over 500 V circuits); (3) Polarity, by continuity check from origin to accessory; (4) Earth electrode resistance (where TT system or earth electrode used). The live-test sequence then adds Ze, Zs, PFC and RCD time/current. Sub 6.x covers the full sequence in detail.",
    ],
    correctAnswer: 1,
    explanation:
      "The 'template-trap' is generic boilerplate dressed up as a RAMS. An inspector will spot it in seconds — same wording across multiple jobs, vague controls, no site-specific hazards. The fix at apprentice level is to recognise it and raise it with the supervisor. By the time you're a Level 3 you'll be expected to contribute the site-specific content yourself.",
  },
  {
    id: 6,
    question: "The RAMS says 'use a podium for working at height'. The site only has a step ladder. What's the legal status of the situation?",
    options: [
      "A document accompanying the transfer of controlled waste from the producer to the next holder. Must contain a description of the waste, the European Waste Catalogue (EWC) code, the SIC (Standard Industrial Classification) code of the producer's activity, the quantity, the carrier's licence details, the destination, and signatures of both parties. Kept for 2 years (3 years for Hazardous Waste Consignment Notes).",
      "CompEx (Competency in Explosive Atmospheres) is the standard UK competence scheme for electrical work in hazardous areas — petrochemical, offshore, fuel storage, paint shops, anywhere with explosive atmospheres. The CompEx Ex01-04 modules cover gas-protected installations; Ex05-06 cover dust-protected. Holding CompEx earns you the Hazardous Areas endorsement on your ECS card and unlocks high-day-rate work in oil and gas.",
      "The RAMS is the documented safe system of work for the task. Substituting a step ladder for a podium is a deviation from the documented control. Either the podium gets sourced, or the RAMS gets formally amended and re-signed before any work proceeds. Verbally working around the document leaves you outside the safe system of work — and outside any legal protection if something goes wrong. WAHR 2005 Reg 6 puts the duty on the employer to use the most suitable equipment.",
      "Use physiological regulation (controlled breathing to manage cortisol), cognitive reappraisal (reframe as \"this is a solvable technical challenge, not a personal attack\"), psychological flexibility (accept discomfort while committing to values of professionalism), and measured vulnerability (\"I understand this is frustrating — let me walk you through our resolution plan\")",
    ],
    correctAnswer: 2,
    explanation:
      "RAMS deviations have to be documented or they aren't real. The whole point of a written safe system of work is that it can be audited; an undocumented verbal swap defeats the audit. The legally and practically correct response is to stop, raise it in writing, and either get the right kit or get the document amended. The Employment Rights Act 1996 s.44 protects you from detriment for raising health and safety concerns.",
  },
  {
    id: 7,
    question:
      "Under HASAWA s.7, what personal duty does an operative owe in relation to the RAMS for their own work?",
    options: [
      "Analyse the failure and condition monitoring history: if failures are occurring between PM intervals the frequency should be increased; if components are consistently in good condition at PM time the interval may be too short and can be extended",
      "A bespoke evacuation plan for a person with a disability or specific need who cannot use the standard evacuation route unaided. Required under the Equality Act 2010 and embedded in fire safety arrangements under RRFSO 2005. Covers refuge points (typically protected lobbies for wheelchair users), designated buddies, communication aids and re-entry sequence.",
      "When the circuit supplies multiple loads that will not all run simultaneously at full power. Apply diversity to the connected load before deriving Ib. For a dedicated single-load circuit (single shower, single hob), no diversity applies — Ib equals the rated current of the load.",
      "To take reasonable care for the health and safety of self and others, and to co-operate with the employer's safety arrangements. In RAMS terms that means reading the document, following the written method, raising defects in the document, and not working outside the documented controls. 'Following orders' is no defence to an s.7 prosecution.",
    ],
    correctAnswer: 3,
    explanation:
      "HASAWA s.7 puts a personal duty on every operative — including apprentices. The duty has two limbs: take reasonable care, and co-operate with the safety arrangements. Reading the RAMS and working to it is the most basic discharge of both limbs. Knowing the regulation by name is part of being a competent tradesperson; it's the regulation that says 'you can't blame the boss for everything'.",
  },
  {
    id: 8,
    question:
      "Where do toolbox talks fit alongside the RAMS in the daily safety routine?",
    options: [
      "Toolbox talks are short pre-shift safety briefings on a single topic — the RAMS for the day, a recent near-miss, a seasonal hazard. They keep the formal RAMS active in the day-to-day work. Recorded with attendance. Together with the RAMS sign-on they form the daily safety briefing chain.",
      "A non-compliance with BS 7671 because when the switch is open the line conductor remains live to the load — anyone working on the load thinks it is dead but the line is still energised. Reg 643.6(a) requires single-pole switches in the line.",
      "Installers of standard domestic and small commercial installations — it pulls the most-used BS 7671 tables (cable sizing, diversity, ratings) into a pocket-sized reference and explains the standard install methods.",
      "Knowing where the emergency gas isolation valve sits before work starts means you (or any trade in the property) can shut the gas down quickly if there is a leak — including a leak you might cause by chasing into a concealed pipe. It is part of the 'services' family of hazards and forms part of a defensible safe-system-of-work record.",
    ],
    correctAnswer: 0,
    explanation:
      "Toolbox talks are the day-to-day mechanism for keeping the formal RAMS alive. A RAMS signed off three weeks ago at the contract start is a dead document on its own; a five-minute toolbox talk at the start of the shift on the day's task is what makes the RAMS a working tool. Attendance is recorded — it's part of the same chain of evidence as the sign-on sheet.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "What's the difference between a method statement and a procedure?",
    answer:
      "A method statement is task-specific and time-bounded — it covers a particular activity on a particular site, with the controls baked into the steps. A procedure is the firm's standard way of doing a recurring activity (e.g. 'how we install a consumer unit') and is reused across jobs. The RAMS for a specific job will reference the firm's procedures where they apply, and add site-specific content on top. Both are part of the safe system of work, but at different levels.",
  },
  {
    question: "Who actually writes the RAMS — me or my supervisor?",
    answer:
      "At Level 2 you're not expected to write RAMS — that's a Level 3 / 4 / supervisor competency. You read them, follow them, sign on, and flag defects. By Level 3 you'll be expected to contribute (review the supervisor's draft, suggest amendments based on what you've seen on site). By the time you're running jobs you'll be writing them yourself. The progression is read, contribute, write — in that order.",
  },
  {
    question: "Can I refuse to start work if the RAMS is missing or generic?",
    answer:
      "Yes — and you should. HASAWA s.7 puts a personal duty on you to co-operate with the safety arrangements, and a missing or grossly inadequate RAMS means there isn't a safe system of work to co-operate with. The Employment Rights Act 1996 s.44 protects you from detriment (dismissal, demotion, unfair treatment) for raising health and safety concerns. Raise it in writing to your supervisor, ask for the document, and wait. Refusing to start work in those circumstances is reasonable and legally protected.",
  },
  {
    question: "What if I notice halfway through a task that the RAMS doesn't actually cover what I'm doing?",
    answer:
      "Stop. The RAMS is the documented basis of the work; if it doesn't cover what you're being asked to do, you're outside the safe system of work. Stop, contact the supervisor, explain the gap and wait for a properly amended RAMS before continuing. 'I'll just finish this bit' is exactly the situation where things go wrong. The five minutes of pause is cheap compared to the alternative.",
  },
  {
    question: "How long does a RAMS stay valid for?",
    answer:
      "There's no statutory expiry, but RAMS are time-bounded by the work they describe. A RAMS for a specific job covers that job and is closed out at completion. A RAMS for a longer-running activity (e.g. a phased fit-out over several months) needs review at sensible intervals — typically when the phase changes, when conditions change significantly, or after any incident or near-miss. The 'suitable and sufficient' test under MHSWR Reg 3 is a continuing duty, not a one-off.",
  },
  {
    question: "Can the RAMS just say 'work in accordance with BS 7671 and good trade practice'?",
    answer:
      "No — that's the textbook generic-RAMS template-trap. 'Good trade practice' is too vague to be a control measure. The RAMS has to identify the specific hazards on this job, name the specific controls (PPE, isolation, access kit, permits), and describe the specific working method. References to BS 7671 are fine in the technical content but they don't substitute for site-specific risk assessment. An inspector spotting that wording will treat it as evidence the assessment wasn't suitable and sufficient.",
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
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3 · Subsection 2"
            title="Reading RAMS and method statements"
            description="How to read a RAMS like a tradesperson, not skim it like a chore. Generic vs site-specific, sign-on responsibility, and stopping work when the document does not match what you are being asked to do."
            tone="emerald"
          />

          <TLDR
            points={[
              "RAMS = Risk Assessment + Method Statement. The risk assessment identifies hazards and controls; the method statement is the step-by-step procedure with the controls baked in. MHSWR 1999 Reg 3 is the statutory hook.",
              "Apprentice's job is to READ, FOLLOW, SIGN ON and FLAG. Writing RAMS is a Level 3 / 4 competency. The sign-on is a positive declaration — sign without reading and you've personally adopted whatever the document says.",
              "Generic 'template-trap' wording — same RAMS across multiple jobs, vague hazards, vague controls — is the opposite of 'suitable and sufficient'. Spot it, raise it in writing, and don't start on the basis of it.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Supplementary content — extends LO2 / AC 2.2 (purpose of workplace information) but is not directly mapped to a single 210 AC. Reading RAMS is a Level 2 skill; writing them is a Level 3 / 4 skill.",
              "Define RAMS — Risk Assessment + Method Statement — and state the role of each half.",
              "Identify the statutory basis for risk assessment under MHSWR 1999 Reg 3 (and the recording duty in Reg 3(6) for firms with five or more employees).",
              "Describe the apprentice's specific role in the RAMS process — read, follow, sign on, flag defects — and where this sits in the wider Level 2 / 3 / supervisor progression.",
              "Recognise the difference between a generic 'template-trap' RAMS and a site-specific one, and how to raise the difference with a supervisor.",
              "State the personal duty under HASAWA s.7 to co-operate with the documented safe system of work and the protection under Employment Rights Act 1996 s.44 for raising health and safety concerns.",
              "Apply the rule that RAMS deviations must be documented before they are real — verbal swaps of equipment or method aren't permitted.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What RAMS actually is</ContentEyebrow>

          <ConceptBlock
            title="Two documents bound together — assessment and method"
            plainEnglish="The Risk Assessment identifies the hazards on the task, evaluates the risk (likelihood × consequence) and lists the controls. The Method Statement turns those assessed risks into a step-by-step working procedure where the controls are built into the steps. Together they form the documented safe system of work for that activity on that site."
            onSite="A good RAMS reads like a recipe — clear sequence, named tools, named PPE, named access kit, named persons-affected, named emergency response. A bad RAMS reads like a wishlist of generic hazards. The difference is visible in seconds; one of the skills you build through Level 2 and 3 is recognising the difference."
          >
            <p>
              The two halves and what each contains:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Risk Assessment</strong> — hazard, who is at risk, current controls,
                likelihood / consequence rating, residual risk after controls, additional
                actions.
              </li>
              <li>
                <strong>Method Statement</strong> — scope of work, sequence of operations, tools,
                PPE, access kit, persons affected, emergency response, sign-on.
              </li>
              <li>
                <strong>Cover sheet</strong> — site, date, contract reference, author, version,
                review date, sign-on grid for every operative on the task.
              </li>
              <li>
                <strong>Appendices</strong> — relevant COSHH data sheets, drawings, permits,
                manufacturer instructions referenced from the body of the document.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Management of Health and Safety at Work Regulations 1999 — Reg 3(1) and 3(6)"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 3(1)</strong> — &quot;Every employer shall make a suitable and
                  sufficient assessment of (a) the risks to the health and safety of his
                  employees to which they are exposed whilst they are at work; and (b) the risks
                  to the health and safety of persons not in his employment arising out of or in
                  connection with the conduct by him of his undertaking ...&quot;
                </p>
                <p>
                  <strong>Reg 3(6)</strong> — &quot;Where the employer employs five or more
                  employees, he shall record (a) the significant findings of the assessment;
                  and (b) any group of his employees identified by it as being especially at
                  risk.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Reg 3(1) is the assessment duty — &apos;suitable and sufficient&apos; covers both
                employees AND non-employees affected by the work. Reg 3(6) is the recording duty
                for firms of five or more. Almost every electrical contracting firm crosses that
                threshold so written RAMS are effectively required across the contracting
                industry. The HSE inspector after an incident asks &apos;show me your risk
                assessment&apos; — and if the answer is &apos;we didn&apos;t write one&apos; or
                &apos;here&apos;s a generic template&apos;, that&apos;s the start of an
                investigation that doesn&apos;t end well.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 3 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.2(2)(a)"
            clause={
              <>
                &quot;The matters to which [the employer&apos;s general duty under s.2(1)] extends
                include in particular — (a) the provision and maintenance of plant and systems
                of work that are, so far as is reasonably practicable, safe and without risks to
                health.&quot;
              </>
            }
            meaning={
              <>
                HASAWA s.2(2)(a) is the umbrella duty on the employer to provide a safe system
                of work. The RAMS is how that safe system is documented and communicated for a
                specific activity. A &apos;system of work&apos; that exists only in the
                supervisor&apos;s head doesn&apos;t satisfy the duty. The RAMS turns the abstract
                obligation in s.2 into a specific, auditable instruction set for a specific job.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.2 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <ConceptBlock
            title="The audit trail behind a RAMS — who reads it after the fact"
            plainEnglish="A RAMS doesn't sit on a shelf — it has an audience. The HSE inspector after an incident reads it to check the safe system of work. The principal contractor reads it before letting your firm onto the site. The client's project manager reads it to confirm scope. Your firm's H&S officer reads it during internal audit. The insurance assessor reads it if there's a claim. Knowing who reads the document explains why it has to be written properly."
            onSite="On a small domestic job the audit trail is short — the document might never be read by anyone other than the operatives. On a major project it's read by a chain of people across multiple organisations. The document doesn't know which it is, which is why it has to meet the same standard either way."
          >
            <p>
              The audiences for a RAMS, in order of how often they read it:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The operatives</strong> — every time the work is done. Daily on a
                long-running job.
              </li>
              <li>
                <strong>The supervisor</strong> — at briefings, at any incident, at any RAMS
                amendment.
              </li>
              <li>
                <strong>The principal contractor</strong> — at induction, at periodic site
                audit, at any incident.
              </li>
              <li>
                <strong>The firm&apos;s H&amp;S officer</strong> — at internal audit, at any
                near-miss review.
              </li>
              <li>
                <strong>The HSE inspector</strong> — at any reactive visit, after any incident.
                Treats a defective RAMS as evidence of a wider H&amp;S culture problem.
              </li>
              <li>
                <strong>The insurance assessor</strong> — after any claim. A defective RAMS can
                affect the insurance position.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.7 (General duties of employees at work)"
            clause={
              <>
                &quot;It shall be the duty of every employee while at work — (a) to take
                reasonable care for the health and safety of himself and of other persons who
                may be affected by his acts or omissions at work; and (b) as regards any duty
                or requirement imposed on his employer or any other person by or under any of
                the relevant statutory provisions, to co-operate with him so far as is
                necessary to enable that duty or requirement to be performed or complied
                with.&quot;
              </>
            }
            meaning={
              <>
                HASAWA s.7 is the personal duty on every operative &mdash; including
                apprentices. Two limbs: take reasonable care, and co-operate with the
                employer&apos;s safety arrangements. In RAMS terms that means reading the
                document, working to it, raising defects, and not working outside the
                documented controls. &apos;Following orders&apos; from a supervisor who
                authorises an unsafe deviation isn&apos;t a defence to an s.7 prosecution. The
                personal duty exists precisely to prevent that argument.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.7 — verbatim from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>How to read a RAMS in five minutes</ContentEyebrow>

          <ConceptBlock
            title="A repeatable scan — cover, scope, hazards, method, sign-on"
            plainEnglish="Reading a RAMS isn't reading it cover-to-cover. It's a structured five-minute scan that checks the document is fit for the work in front of you. Cover sheet (right site, right date, right contract). Scope (does it match what you're being asked to do). Hazards (do they include the actual hazards on site). Method (does it match the conditions). Sign-on (sign last, after you're satisfied)."
            onSite="The five-minute scan is what experienced electricians do automatically. The point of teaching it as a structured routine is to build the habit early. Once it's automatic you'll spot a generic RAMS or a mismatched scope within seconds — the way a good QS spots a missing variation in a tender."
          >
            <p>
              The recommended scan order:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cover sheet</strong> — site address, contract reference, date, version
                number, author, review date. Wrong site or out-of-date version = stop.
              </li>
              <li>
                <strong>Scope of work</strong> — read the description of what's covered. Does it
                match what you're being asked to do today? Activities outside the scope = stop.
              </li>
              <li>
                <strong>Hazards identified</strong> — do they include the hazards you can see on
                site? If a hazard is missing (e.g. live cables on a refurb when the document
                only mentions new install) = raise it.
              </li>
              <li>
                <strong>Controls and method</strong> — do the named controls (PPE, access kit,
                isolation, permits) match what's actually available on site? Mismatch = raise it.
              </li>
              <li>
                <strong>Persons affected</strong> — does it cover everybody actually on or near
                the work area? Missing trades / public / customer = raise it.
              </li>
              <li>
                <strong>Emergency response</strong> — assembly point, first aiders, route to
                A&amp;E, isolation procedure if a circuit needs killing fast.
              </li>
              <li>
                <strong>Sign-on</strong> — only after the above is satisfactory. Once your
                signature is on the sheet you've adopted the document.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="The sign-on grid — what your signature actually means"
            plainEnglish="The sign-on grid on the front of a RAMS is a positive declaration. By signing you're stating that you have read the document, you understand it, and you'll work to it. The contractor uses the signed grid as evidence to the HSE that the briefing happened and that the operatives were competent."
            onSite="On a busy morning briefing the temptation is to sign and move on. Resist it. Two minutes of reading is the difference between a defensible safe system of work and a paper trail that doesn't reflect reality. Most supervisors will give you the time without complaint precisely because they know what the alternative is."
          >
            <p>
              What signing on commits you to:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                You have read the document, including the risk assessment, the method statement
                and the appendices.
              </li>
              <li>
                You understand the hazards identified, the controls in place and the working
                method.
              </li>
              <li>
                You will work to the documented method, will not deviate without authorisation,
                and will use the controls (PPE, access kit, permits) as specified.
              </li>
              <li>
                You will raise anything on site that doesn't match the document — additional
                hazards, missing equipment, conditions outside the assumed scope.
              </li>
              <li>
                If the document is later challenged in any forum, your signature is evidence
                the briefing happened.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reading the method statement step-by-step — does the order make sense?"
            plainEnglish="The method statement should read like a recipe — clear sequence, each step building on the one before. As you read it through, ask yourself: does the order make sense for what's actually being done? Are there missing steps (no isolation step before live work, no functional check after termination)? Are there steps in the wrong order (testing before terminations are torqued)? Method-statement defects are usually visible on a careful read."
            onSite="Method statements written by people who haven't done the work tend to read oddly — too abstract, missing obvious physical steps, or describing the work in a way that a tradesperson wouldn't recognise. That's a red flag. A method statement that an experienced electrician wouldn't recognise as their working method is a method statement that hasn't been checked by an experienced electrician. Raise it."
          >
            <p>
              The method-statement read-through checks:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Does each step name a specific action (not &quot;install electrical equipment&quot;
                but &quot;terminate the 6mm² T&amp;E into the new RCBO at 1.2 Nm using a
                calibrated torque screwdriver&quot;)?
              </li>
              <li>
                Are isolation, lock-off and proof-of-dead steps present and in the right place
                (before any live work)?
              </li>
              <li>
                Are functional checks specified after terminations (e.g. RCBO test button,
                continuity check, polarity)?
              </li>
              <li>
                Are the access kit and PPE specified for each step that needs them, not just at
                the start of the document?
              </li>
              <li>
                Is the customer / client / public-protection arrangement clear (barriers,
                warning notices, communications)?
              </li>
              <li>
                Is the end-of-shift handover specified (lock-off retained, work area secured,
                customer briefed)?
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Generic vs site-specific — the template-trap</ContentEyebrow>

          <ConceptBlock
            title="Spotting a generic RAMS in thirty seconds"
            plainEnglish="A generic RAMS is template wording that hasn't been tailored to the actual site. It tends to use abstract phrasing — 'electrical hazards', 'working at height', 'use of PPE', 'safe working practices' — without naming what's specifically present on this job. It's the single most common failing in site safety paperwork and the one HSE inspectors find first."
            onSite="The template-trap exists because writing a fresh site-specific RAMS for every job is work, and copy-paste is fast. The way you spot it: same wording across multiple jobs you've worked on, vague controls that could apply anywhere, no reference to the walk-round you watched the supervisor do this morning. Spot it, raise it, don't sign on it."
          >
            <p>
              Tell-tale signs of a template-trap RAMS:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Same scope wording across jobs</strong> — &quot;electrical installation
                works to current edition of BS 7671&quot; with no actual task description.
              </li>
              <li>
                <strong>Generic hazard list</strong> — &quot;electrical, working at height,
                manual handling, slips and trips&quot; with no site-specific hazards from the
                walk-round.
              </li>
              <li>
                <strong>Vague controls</strong> — &quot;use of appropriate PPE&quot;, &quot;safe
                working practices&quot;, &quot;competent operatives&quot;.
              </li>
              <li>
                <strong>No reference to specific access kit</strong> for working-at-height tasks
                (just &quot;use of suitable equipment&quot;).
              </li>
              <li>
                <strong>No persons-affected list</strong> beyond &quot;site personnel and
                public&quot;.
              </li>
              <li>
                <strong>No emergency response section</strong> — assembly point, first aiders,
                route to A&amp;E.
              </li>
              <li>
                <strong>Identical wording</strong> across the firm&apos;s portfolio when you
                compare RAMS from different jobs.
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

          <ContentEyebrow>When the RAMS doesn't match what you're being asked to do</ContentEyebrow>

          <ConceptBlock
            title="Stop, raise it, wait — the right response to a mismatch"
            plainEnglish="If you notice the RAMS doesn't match what you're being asked to do — wrong scope, missing hazards, controls that aren't available on site — the correct response is to stop, raise it in writing to your supervisor, and wait for a proper amendment. Working on through the mismatch is the textbook way an apprentice ends up in front of an HSE inspector."
            onSite="The temptation is always to 'just get on with it' — particularly if the supervisor is impatient or the customer is watching. Resist it. Five minutes of pause and a written message saves hours of unpicking later. The Employment Rights Act 1996 s.44 specifically protects you from detriment for raising health and safety concerns; it is one of the few legal protections that an apprentice has by default."
          >
            <p>
              The escalation routine when you spot a mismatch:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stop work</strong> — don't continue while the mismatch is unresolved.
              </li>
              <li>
                <strong>Raise it in writing</strong> — text, email, app comment. Be specific:
                what does the RAMS say, what's actually on site, what's the gap.
              </li>
              <li>
                <strong>Wait for response</strong> — the supervisor either clears the obstruction
                (sources the right access kit, isolates the live circuit, removes the missing
                control) or formally amends the RAMS and re-signs everyone.
              </li>
              <li>
                <strong>Don't restart on a verbal</strong> — &quot;just do it the old way&quot;
                from the supervisor doesn&apos;t change the documented safe system of work.
              </li>
              <li>
                <strong>If unresolved, escalate up the chain</strong> — your supervisor's
                supervisor, your firm's H&amp;S officer, your training provider's tutor.
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock
            title="The escalation calculus — when raising it costs less than not raising it"
            plainEnglish="Apprentices feel pressure not to push back — fear of being seen as difficult, fear of slowing the job, fear of upsetting the supervisor. The pressure is real but the calculus is in your favour. The cost of raising a defect in writing is five minutes. The cost of not raising it and the work going wrong is anything from a snag list to an injury to a prosecution. Five minutes always wins."
            onSite="Most supervisors will react reasonably to a polite written escalation. The few who don't react reasonably are exactly the supervisors that the s.44 protection exists for. Either way, raising it in writing is the right move — it creates a record, it discharges your s.7 duty, and it forces the issue up the chain where it can actually be resolved."
          >
            <p>
              Why the calculus favours escalation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                The cost of raising a defect = five minutes of writing.
              </li>
              <li>
                The cost of not raising and the work going wrong = anywhere from a snag list to
                an HSE prosecution. Often weeks of unpicking.
              </li>
              <li>
                Raising it creates a record that protects you personally if the work later
                goes wrong.
              </li>
              <li>
                Raising it triggers the supervisor&apos;s duty under HASAWA s.2 to provide a
                safe system of work &mdash; you&apos;ve put the issue on their desk.
              </li>
              <li>
                Employment Rights Act 1996 s.44 protects you from detriment for raising H&amp;S
                concerns. The protection is automatic; you don&apos;t need to invoke it.
              </li>
              <li>
                Most supervisors react reasonably. The ones who don&apos;t are the ones the
                protection exists for.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Signing the RAMS sign-on without reading it"
            whatHappens={
              <>
                Apprentice arrives at a busy morning briefing on a commercial fit-out. Twenty
                operatives are queuing to sign on. The supervisor is moving fast. The apprentice
                signs the sheet without reading the document, picks up the toolbox, and heads
                to the work area. Two hours in, an incident occurs — a foreseeable hazard that
                was actually flagged in the RAMS but not communicated verbally. The HSE
                inspector arrives, asks who was briefed and how, and the sign-on sheet shows the
                apprentice as briefed. The defence &quot;I didn&apos;t read it&quot; is gone the
                moment the signature appears.
              </>
            }
            doInstead={
              <>
                Two minutes of reading at the briefing is non-negotiable. If the supervisor is
                moving too fast, ask politely for the time to read before signing — most
                supervisors will accept it precisely because they know what it means if you
                signed without reading. If the queue is long, take the document with you to a
                quiet corner, read it, and sign when you&apos;re ready. The signature is a
                positive declaration; treat it as one.
              </>
            }
          />

          <Scenario
            title="Generic RAMS for working at height in a comms cupboard"
            situation={
              <>
                You&apos;re asked to install a new patch panel in a small comms cupboard at the
                back of a commercial unit. The RAMS handed to you is the firm&apos;s generic
                &quot;working at height&quot; template — it lists ladders, podiums and towers
                as &quot;suitable equipment&quot; with no specification of which one for this
                task. The cupboard is partly full of stored boxes, has poor lighting, and the
                only access kit on site this morning is a fibreglass step ladder. The supervisor
                says &quot;just use the step ladder, it&apos;ll be fine for an hour&apos;s
                work&quot;.
              </>
            }
            whatToDo={
              <>
                Stop and raise it in writing. The RAMS is generic — it doesn&apos;t name the
                podium that the actual task needs (the WAHR 2005 Reg 6 hierarchy puts a podium
                above a ladder for short-duration light work in a confined space). The cupboard
                conditions (boxes, poor lighting) are additional hazards not addressed. The
                verbal instruction to use the step ladder is an undocumented deviation from any
                proper safe system of work. Text the supervisor: &quot;The RAMS for the patch
                panel install is generic and doesn&apos;t cover the specific access in cupboard
                X. Boxes need clearing, lighting needs a temporary task light, and the access
                kit needs to be a podium per WAHR Reg 6. Please can the RAMS be amended and the
                kit sourced before I start?&quot;. Then wait. The five minutes of writing
                discharges your HASAWA s.7 duty and your s.44 protection kicks in if the
                supervisor pushes back.
              </>
            }
            whyItMatters={
              <>
                The combination of a generic RAMS, a confined working area and a verbal
                instruction to substitute equipment is the textbook setup for a fall-from-height
                incident. The HSE has prosecuted contractors and individual operatives in
                exactly these circumstances. The five-minute pause to raise it in writing is the
                difference between a documented safe system and an injury. Apprentices feel
                pressure not to push back; the legal protection in s.44 exists precisely for
                that pressure.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "RAMS = Risk Assessment + Method Statement. The risk assessment identifies hazards, evaluates risk and lists controls. The method statement is the step-by-step procedure with the controls baked in. MHSWR 1999 Reg 3 is the statutory hook.",
              "Apprentice's job in the RAMS process is to READ, FOLLOW, SIGN ON and FLAG — not to write. Writing RAMS is a Level 3 / 4 / supervisor competency. Read first, contribute later, write when you're running jobs.",
              "Sign-on is a positive declaration — by signing you adopt the document. Two minutes of reading at the briefing is non-negotiable. Sign without reading and any defect in the document attaches to you personally.",
              "Generic 'template-trap' RAMS — same wording across multiple jobs, vague hazards, vague controls, no site-specific content — is the opposite of the 'suitable and sufficient' test under MHSWR Reg 3. Spot it, raise it, don't sign on it.",
              "RAMS deviations have to be documented before they're real. A verbal 'just do it this way' from the supervisor doesn't change the documented safe system of work. Either the conditions get fixed or the RAMS gets amended and re-signed.",
              "If the RAMS doesn't match what you're being asked to do — stop, raise it in writing, wait for a proper amendment. Don't restart on a verbal. The Employment Rights Act 1996 s.44 protects you from detriment for raising health and safety concerns.",
              "HASAWA s.7 puts a personal duty on every operative — including apprentices — to take reasonable care and to co-operate with the documented safe system of work. Reading and following the RAMS is the most basic discharge of that duty.",
              "Toolbox talks at the start of the shift keep the formal RAMS active in the day-to-day work. Together with the sign-on grid they form the daily safety briefing chain. Both are recorded with attendance.",
            ]}
          />

          <Quiz
            title="Reading RAMS — knowledge check"
            questions={quizQuestions}
          />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section3/3-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.1 Purpose of workplace information
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section3/3-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.3 COSHH data sheets
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
