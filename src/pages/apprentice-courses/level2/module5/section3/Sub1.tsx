/**
 * Module 5 · Section 3 · Sub 1 — Purpose of workplace information
 * Maps to City & Guilds 2365-02 / Unit 210 / LO2 / AC 2.2
 *   AC 2.2 — "Identify the purpose of information that is used in the workplace"
 *
 * Frame: workplace info splits into five families — safety docs, design docs,
 * standards, contract/commercial, and HR docs. Each family has a different
 * purpose, a different owner, and a different consequence when missing.
 * The apprentice's job is to know what's in each family, where to find it,
 * and what happens if it's not there when you need it.
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
  'Purpose of workplace information (2.2) | Level 2 Module 5.3.1 | Elec-Mate';
const DESCRIPTION =
  'The five families of workplace information — safety, design, standards, contract and HR. What each one is for, who owns it, and what happens when it is not in the site folder when you need it.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s3-sub1-folder',
    question:
      "First day on a commercial DB upgrade. The site office hands you a thin clear-pocket folder with just a programme and a single drawing in it. Everything else you need is somewhere else. What do you do before you pick a tool up?",
    options: [
      'Crack on with the work — the programme tells you the sequence and that is enough.',
      "Stop and ask the supervisor for the missing items — RAMS, risk assessment, COSHH for any chemicals, the rest of the drawings (single line, schedule of circuits), the schematic, the schedule of test results from the existing install, BS 7671 and the OSG, mfr data for the new board, and the permit if any of the work is hot. Without that information you can't show your work was done to a 'suitable and sufficient' standard under MHSWR Reg 3 and you can't show compliance with BS 7671 Reg 132.13.",
      "Take photos of what you have and post them on the trade WhatsApp group — somebody will know.",
      'Drive back to the office and check the email — the missing documents are probably attached.',
    ],
    correctIndex: 1,
    explanation:
      "BS 7671 Reg 132.13 explicitly requires the designer to provide the information needed for the safe operation, inspection and maintenance of the installation. CDM 2015 Reg 13 puts a parallel duty on the principal contractor to make site information available to operatives. A thin folder with a programme is a red flag — it isn't a basis for safe work. The right move on day one is to ask, in writing if possible, for the full information set before starting. That request is itself evidence that you took reasonable steps under HASAWA s.7.",
  },
  {
    id: 'mod5-s3-sub1-purpose',
    question:
      "You're handed a manufacturer data sheet for a new RCBO. What is the SPECIFIC purpose of this document for you on the day, beyond 'reference material'?",
    options: [
      'It is just a marketing leaflet from the wholesaler — file it.',
      "It tells you the torque settings for the terminals, the conductor sizes the unit accepts, whether ferrules are required for stranded conductors, the breaking capacity, the trip curve, and the IP rating in its housing — all of which feed directly into compliance with BS 7671 Reg 526.1 (durable connections) and Reg 510.3 (selection and erection in line with mfr instructions). Skip the data sheet and you're terminating by feel, which voids warranty AND fails Reg 526.1.",
      "It is a sales document — the wholesaler's website has the same information.",
      'You only need the data sheet if the customer asks for it after the work is complete.',
    ],
    correctIndex: 1,
    explanation:
      "Manufacturer data is not optional reference material — BS 7671 Reg 510.3 ties equipment selection and erection to the manufacturer's instructions, and Reg 526.1 makes the connection itself a code-compliance issue. A torque value 'by feel' is not defensible if the install fails an inspection or if the warranty is later challenged. The data sheet is the authoritative source for the torque, the conductor capacity, and the ferrule requirement. Read it before terminating, not after.",
  },
  {
    id: 'mod5-s3-sub1-jib',
    question:
      "You're asked to work two hours past the standard finish time on a Friday. Where do you check what you're entitled to be paid for those two hours?",
    options: [
      "Whatever your supervisor says is fine — just take the cash.",
      "Your employment contract and the JIB Working Rules. The JIB Handbook sets the industry-standard overtime, travel-time, lodging and grading rules for electricians in England and Wales. Your contract should reference it (most reputable firms apply the JIB rates as a baseline). The HR docs — contract, JIB rules, holiday and grievance procedures — are how you get paid correctly and how you keep your rights if a dispute arises.",
      'The JIB doesn\'t apply to apprentices — you\'re on the apprentice national minimum wage and that is all.',
      "Just check your bank account next Friday and see what arrives.",
    ],
    correctIndex: 1,
    explanation:
      "HR and commercial information — your employment contract, the JIB Working Rules where they apply, holiday request procedures, grievance procedures — exists so that you can demonstrate (and defend) your rights and obligations. Apprentices are covered by the JIB Apprentice Grading scheme as well as the apprenticeship standards, and the JIB rates for overtime and travel time apply where the contract references them. 'Whatever the supervisor says' isn't a substitute for checking the rules — it's a route to being underpaid. Check the contract, check the rules, ask if uncertain.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Which five families of workplace information does Unit 210 AC 2.2 implicitly cover for an apprentice electrician?",
    options: [
      "Wages, hours, holidays, sick pay, redundancy.",
      "Safety documents (RAMS, COSHH, risk assessments, permits, fire muster, welfare info), design documents (drawings, specs, schedules, schematics, BIM, RFI logs), standards (BS 7671, IET OSG, manufacturer data), contract / commercial (programme, snag list, variations, delay notices) and HR (employment contract, JIB Working Rules, holiday and grievance procedures).",
      'Drawings, drawings, drawings, drawings, drawings.',
      'Just the RAMS — everything else is optional.',
    ],
    correctAnswer: 1,
    explanation:
      "AC 2.2 itself is short — 'Identify the purpose of information that is used in the workplace' — but the practical scope is wide. Splitting the information into five families gives you a memory aid and a checklist: when you arrive on site, you should be able to point to where each family lives. Missing any one of them is a problem; missing several is a sign the site is not being run properly.",
  },
  {
    id: 2,
    question:
      "What is the specific purpose of the safety-document family on a building site?",
    options: [
      "To slow the work down and create paperwork.",
      "To identify hazards, set out the controls, allocate responsibility, and provide a defensible record of the safe system of work. RAMS and risk assessments are statutory under MHSWR 1999 Reg 3. COSHH data sheets are statutory under COSHH 2002. Permits-to-work cover higher-risk activities. The fire muster and welfare info satisfy the Workplace (Health, Safety and Welfare) Regulations 1992. Together they convert legal duty into specific instructions.",
      'To let the principal contractor say they have a system, even if nobody uses it.',
      "They are only relevant on construction sites — domestic work doesn't need them.",
    ],
    correctAnswer: 1,
    explanation:
      "Safety documents have one job — to convert the abstract H&S duty into specific instructions for specific work on a specific day. After an incident the HSE inspector traces backwards from the incident through the safety documents. A complete and tailored set is a defence. A missing or generic set is evidence the duty wasn't being met. As an apprentice you live inside this paperwork — you read it, follow it, and flag anything on site that doesn't match.",
  },
  {
    id: 3,
    question:
      "Why does the design-document family matter to an apprentice doing a first-fix?",
    options: [
      'It does not — first-fix is just running cable to the rough position and the design office can sort the rest.',
      "Because the drawings, specs, schedules and schematics tell you exactly what cable, what circuit, what containment, what termination, and where it goes. Build the first-fix to a memory of what the customer said and you'll either be ripping it out at second-fix or fixing it on a snag list. Design documents are how 'what was specified' gets turned into 'what was installed' — and the as-built mark-up at the end is how the next person on site (maintenance, inspector, future works) understands what you did.",
      'Drawings are out of date by the time they reach site, so ignore them.',
      'Only the M&E consultant reads the drawings — the apprentice just runs cable.',
    ],
    correctAnswer: 1,
    explanation:
      "Design documents are the bridge between the specifier's intent and the installed reality. Sub-standard first-fix from poorly-read drawings is the single most common reason a snag list grows. The schedule of circuits tells you what protective device feeds what; the single line tells you the network topology; the drawings tell you where the accessories go. Ignoring any of them just transfers the work to second-fix or to the snag.",
  },
  {
    id: 4,
    question:
      "Where in BS 7671 is the duty to provide installation information formally placed?",
    options: [
      "There isn't a duty — BS 7671 only covers the technical regulations.",
      "Reg 132.13 — 'The designer of the electrical installation shall provide ... the information necessary to allow the safe operation, inspection, alteration, repair, maintenance and dismantling of the electrical installation'. The information has to be available to whoever is going to operate or maintain it. That is the BS 7671 hook for site-folder paperwork (single line diagram, schedule of circuits, certificate, schedule of test results, mfr data).",
      'Reg 526.1 — that is where information duties live.',
      'Only the IET Wiring Matters article on documentation covers it.',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 132.13 is the formal duty in BS 7671 for the designer to make installation information available to the user and the maintainer. It's why your final certificate package on a CU change includes the schedule of circuits and the schedule of test results — not just the EIC. Skipping the documentation is a Reg 132.13 breach as well as a practical problem for the next operative on site.",
  },
  {
    id: 5,
    question:
      "Under CDM 2015 Reg 13, what duty does the principal contractor have around information for workers arriving on a notifiable construction site?",
    options: [
      'No duty — workers are expected to find out for themselves.',
      "Provide site induction (covering the construction phase plan, site rules, welfare, emergency procedures and specific hazards), provide access to relevant pre-construction information, and ensure each worker has the information they need to do their work safely. Reg 14 makes it a duty on the principal contractor to ensure workers receive any relevant H&S training. Reg 15 puts a corresponding duty on the worker to co-operate.",
      'Just hand over a hi-vis and a hard hat.',
      'Only deliver an induction if the worker asks for one.',
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 Reg 13 is the formal mechanism on notifiable sites for transferring hazard knowledge from the principal contractor to every operative. The induction is where you learn the site-specific information that the textbook walk-round can't teach you — live services, asbestos survey results, trade-clash zones, structural concerns. Sign in without listening and you're outside the site information system on day one.",
  },
  {
    id: 6,
    question:
      "Why does the contract / commercial family of documents matter to a first-year apprentice?",
    options: [
      'It does not — apprentices are paid by the firm regardless of contract issues.',
      "The programme tells you the sequence and the deadline — miss it and your firm is at risk of liquidated damages. The snag list is your end-of-job homework. Variations and delay notices are how additional work or extra time is recorded so the firm can claim it. Your firm's cash flow — and ultimately your wages — depend on this paperwork being right. Even as an apprentice, learning to read the programme and the snag list is part of becoming a tradesperson.",
      'Only the QS reads the contract documents.',
      'The contract documents are confidential and apprentices should not see them.',
    ],
    correctAnswer: 1,
    explanation:
      "Commercial information is how the firm gets paid and how it manages risk on a project. As an apprentice you don't run the commercial side, but you should understand why the programme matters, what a variation is, what a snag list does, and why timely reporting of delays through the agreed channels protects everybody. By year four you'll be expected to understand it; year one is when you start watching.",
  },
  {
    id: 7,
    question:
      "Where does the manufacturer data sheet sit in the workplace-information families, and why?",
    options: [
      'It is a marketing document — not part of the workplace information system.',
      "It sits in the standards / technical family alongside BS 7671 and the IET OSG. BS 7671 Reg 510.3 ties equipment selection and erection to manufacturer's instructions. Reg 526.1 ties the connection itself (torque, ferrule requirement, mechanical strength) to those instructions. The data sheet is the authoritative source for how the unit is meant to be installed. Treat it as part of the site folder, not the bin.",
      'It belongs with the customer-facing documents.',
      "It is purely contractual — it tells you the warranty period and that's it.",
    ],
    correctAnswer: 1,
    explanation:
      "Manufacturer data is technical, not commercial — it's the instruction set for installing the equipment to the standard the manufacturer designed it to. BS 7671 Reg 510.3 makes those instructions effectively part of the regs themselves. A site folder without manufacturer data for the major equipment (board, RCBOs, surge device, EV charger) is a folder with a hole in it.",
  },
  {
    id: 8,
    question:
      "You finish a CU change in a domestic property. Where does the information you've created during the job ultimately go, and why?",
    options: [
      'In a drawer at the firm — out of sight is out of mind.',
      "Into the customer's installation record — Electrical Installation Certificate, schedule of circuits, schedule of test results, manufacturer data for the new board, and a copy of the final RAMS for your firm's own records. The customer's pack discharges the BS 7671 Reg 132.13 duty to provide information for safe operation, inspection and maintenance. Your firm's pack is what you produce to an HSE inspector if anything is challenged later.",
      "On the customer's WhatsApp — they can take a screenshot for their records.",
      'Just in your phone gallery as a photo backup.',
    ],
    correctAnswer: 1,
    explanation:
      "The information loop closes when the as-built information goes back into the customer's installation record and into the firm's job file. Reg 132.13 is the BS 7671 hook; the firm's QA system is the practical hook. Five years later when the next electrician opens that consumer unit and looks at the schedule, the quality of the documentation you handed over is what makes their job safe or unsafe. It's the long tail of every job you do.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Why does my employer make such a fuss about reading the RAMS before I start?",
    answer:
      "Two reasons. First, MHSWR 1999 Reg 3 puts a duty on the employer to make a 'suitable and sufficient' risk assessment. The RAMS is how that duty is recorded for the specific job. Second, HASAWA s.7 puts a personal duty on you to take reasonable care and to co-operate with the safety arrangements — reading the RAMS is the first step. Sign-on without reading and you've personally adopted whatever the document says, including any error in it. Five minutes of reading is cheap insurance.",
  },
  {
    question: "Do I really need to keep the manufacturer data sheet for a single RCBO?",
    answer:
      "Yes — at least for the duration of the install and the immediate warranty period. The torque value, the conductor capacity and the ferrule requirement are on the data sheet, and BS 7671 Reg 510.3 ties your installation method to the manufacturer's instructions. If a connection is later challenged (warranty claim, EICR observation, fault investigation) the data sheet is the document that proves the spec you worked to. Most firms file mfr data with the job paperwork on completion.",
  },
  {
    question: "What should the site folder actually contain on day one of a commercial fit-out?",
    answer:
      "A working site folder includes: the construction phase plan extract for your work area, the RAMS for your tasks, risk assessments, COSHH data sheets for any chemicals on site, the relevant drawings (single line, schedule of circuits, schematics, layout drawings), the schedule, BS 7671 and IET On-Site Guide for reference, manufacturer data for the major equipment, and any permits-to-work that apply. If any of those are missing, ask. Don't rely on 'someone's got it on their phone' — that is not a record system.",
  },
  {
    question: "Where can I check the JIB rules without bothering the office?",
    answer:
      "The JIB Handbook is available from the JIB website (jib.org.uk) and most reputable employers will give you a copy when you start. It covers grading, basic and overtime rates, travel time, lodging, holiday and the disputes procedure. The apprentice rates and grading rules are in there too. If your contract references the JIB Working Rules, those rules are part of your terms and conditions — knowing what's in them is knowing what you're entitled to.",
  },
  {
    question: "If a piece of information I need is missing, what's the right way to escalate?",
    answer:
      "In writing — text, email, or a logged comment in your firm's job-management app. The point is to create a record. 'I asked the supervisor for the RAMS and didn't get one' is a much weaker position after an incident than a text message timed and dated to that morning. Most supervisors will respond quickly to a polite written request precisely because they know it creates a paper trail. If the request is ignored, that's a separate problem you raise up the chain.",
  },
  {
    question: "Does the customer ever see the workplace information, or is it all internal?",
    answer:
      "Some of it goes to the customer — that's covered in the Section 2 sub on customer-facing documents (quote, invoice, EIC, schedule of test results, handover pack). The rest stays internal — RAMS, risk assessments, COSHH, programme, snag list, variations, your firm's QA records. The customer's pack at the end of a job is curated from the internal pile. As an apprentice you'll be helping prepare both.",
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
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3 · Subsection 1"
            title="Purpose of workplace information"
            description="The five families of workplace information — safety, design, standards, contract and HR. What each one is for, who owns it, and why missing any one of them is a problem."
            tone="emerald"
          />

          <TLDR
            points={[
              "Workplace information splits into five families — safety documents, design documents, standards / technical, contract / commercial, and HR. Each has a different purpose, a different owner, and a different consequence when missing.",
              "Safety docs (RAMS, COSHH, risk assessments, permits) convert the H&S duty into specific instructions. Design docs (drawings, specs, schedules, schematics) tell you what to install where. Standards (BS 7671, OSG, mfr data) tell you how to install it.",
              "BS 7671 Reg 132.13 is the formal duty on the designer to provide installation information; CDM 2015 Reg 13 is the parallel duty on the principal contractor to brief operatives on site. As an apprentice you read, follow and flag — every working day.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the purpose of information that is used in the workplace (Unit 210 AC 2.2 — verbatim).",
              "Group workplace information into five families — safety, design, standards, contract / commercial, and HR — and state the purpose of each.",
              "Identify the BS 7671 Reg 132.13 duty on the designer to provide installation information for safe operation, inspection and maintenance.",
              "Identify the CDM 2015 Reg 13 duty on the principal contractor to provide site induction and information to workers arriving on a notifiable construction site.",
              "Recognise the role of manufacturer data sheets in the standards family and the link to BS 7671 Reg 510.3 (selection and erection in line with manufacturer instructions).",
              "Recognise the role of HR documents (employment contract, JIB Working Rules, holiday and grievance procedures) in protecting your rights and obligations as an apprentice.",
              "Apply the rule of thumb that missing information is escalated in writing, not ignored — creating a record before the work starts.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why workplace information is more than 'paperwork'</ContentEyebrow>

          <ConceptBlock
            title="Information is the medium the trade actually runs on"
            plainEnglish="A working site is held together by information — what to do, how to do it, when to do it, who to do it with, and what to record afterwards. Take the information away and the cables don't go in the right place, the safe system of work falls over, and nobody gets paid correctly. The bricks-and-mortar work depends on the paper-and-pixel work in front of it and behind it."
            onSite="On day one of an apprenticeship you'll meet electricians who treat the paperwork as a chore and others who treat it as part of the job. The second group are the ones running the contracts five years later. The information system is how a competent firm distinguishes itself from one that just turns up and does what looks right."
          >
            <p>
              The five families of workplace information you'll meet on a typical job:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Safety documents</strong> — RAMS, COSHH data sheets, risk assessments,
                permits-to-work, fire muster, welfare and emergency information.
              </li>
              <li>
                <strong>Design documents</strong> — drawings (single line, schematic, layout),
                specifications, schedules, BIM models, RFI logs, technical submittals.
              </li>
              <li>
                <strong>Standards / technical</strong> — BS 7671, IET On-Site Guide, manufacturer
                data sheets and installation instructions, IET Guidance Notes.
              </li>
              <li>
                <strong>Contract / commercial</strong> — programme, snag list, variations, delay
                notices, instructions to proceed, daywork sheets.
              </li>
              <li>
                <strong>HR / personal</strong> — employment contract, JIB Working Rules where
                they apply, holiday request forms, grievance and disciplinary procedures, training
                records and apprenticeship paperwork.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Family 1 — Safety documents</ContentEyebrow>

          <ConceptBlock
            title="Converting the H&S duty into specific instructions"
            plainEnglish="Safety documents take the abstract regulatory duty (assess risk, control hazards, protect workers and the public) and turn it into specific instructions for a specific job on a specific day. RAMS and risk assessments are the headline documents. COSHH data sheets, permits-to-work, fire muster information and welfare arrangements fill in the rest."
            onSite="The safety paperwork on a well-run site is a working tool. On a badly-run site it's a paper trail nobody reads. Tell the difference within five minutes of arrival — does the supervisor brief from the RAMS, or does the supervisor say 'it's in the file somewhere'? The first is a sign of a competent contractor; the second is a problem you escalate."
          >
            <p>
              What sits in this family and why each item is there:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>RAMS (Risk Assessment + Method Statement)</strong> — task-specific
                assessment of hazards plus the step-by-step working method that builds in the
                controls. Statutory hook: MHSWR 1999 Reg 3.
              </li>
              <li>
                <strong>COSHH data sheets</strong> — for any hazardous substance on site (cable
                lubricant, contact cleaner, masonry sealant, brick acid). Statutory hook: COSHH
                2002 Reg 6.
              </li>
              <li>
                <strong>Permits-to-work</strong> — for higher-risk activities (hot work, confined
                space, live work). Statutory hook: EAWR 1989 Reg 14, Confined Spaces Regs 1997.
              </li>
              <li>
                <strong>Fire muster and emergency procedures</strong> — assembly point, alarm
                point, first aiders, route to nearest A&amp;E.
              </li>
              <li>
                <strong>Welfare arrangements</strong> — toilet, mess, drying area, fresh water,
                first aid kit. Statutory hook: Workplace (HSW) Regulations 1992, CDM 2015 Sch 2.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671 — Reg 132.13 (Documentation)"
            clause={
              <>
                <p>
                  Paraphrased: documentation for the electrical installation shall be provided to
                  allow safe operation, inspection, alteration, repair, maintenance and
                  dismantling. The sub-clauses cover 132.13.1 (Diagrams — single line, schedule
                  of circuits and similar) and 132.13.2 (Routine maintenance information).
                </p>
              </>
            }
            meaning={
              <>
                Reg 132.13 is the BS 7671 hook for the documentation pack that has to follow the
                installation through its life. The Electrical Installation Certificate, schedule
                of circuits, schedule of test results, single line diagram and any manufacturer
                data are all how the designer (or installer designing-as-they-go on a small job)
                discharges that duty. As an apprentice you produce parts of this pack on every
                job — it's the long tail of the work and the next operative on the install
                relies on it.
              </>
            }
            cite="Paraphrased — see BS 7671:2018+A4:2026 Regulation 132.13.1 (Diagrams) and 132.13.2 (Routine maintenance)."
          />

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
                CDM 2015 Reg 13(4) places the formal duty on the principal contractor to brief
                workers on the site information they need before any work starts. Reg 13(1)
                broadens this to planning, managing and monitoring the construction phase. Reg 15
                makes it a personal duty on the worker to co-operate. As an apprentice arriving
                on a fit-out, the induction is the formal handover of the site-specific
                information that doesn&apos;t live in the textbook.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 13 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Family 2 — Design documents</ContentEyebrow>

          <ConceptBlock
            title="From specifier's intent to installed reality"
            plainEnglish="Design documents tell you exactly what is meant to be installed, where it goes, and how it connects up. Drawings (single line, schematic, layout), specifications (the written description of what equipment and what standard), schedules (the lists — circuits, devices, accessories), BIM models on bigger jobs, and the RFI log where unanswered questions live."
            onSite="The drawings are the bridge between the M&E consultant who specified the job and you on site running the cable. Build the first-fix to a memory of the customer's words and you'll be ripping it out at second-fix or fixing it on a snag list. Read the drawings, mark them up as you go, and you've turned 'what was specified' into 'what was installed' — which the as-built drawings record at handover."
          >
            <p>
              The headline design documents you'll meet:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single line diagram</strong> — the electrical 'map' of the installation,
                showing supply, main switch, distribution boards, sub-mains and final circuits at
                a high level.
              </li>
              <li>
                <strong>Schedule of circuits</strong> — a row per final circuit showing protective
                device, cable size, route, length and the load being served. Required at handover
                under Reg 132.13.
              </li>
              <li>
                <strong>Layout drawings</strong> — floor plans showing where the accessories,
                lighting points, board positions and containment runs sit.
              </li>
              <li>
                <strong>Schematics</strong> — for control circuits (lighting controls, BMS,
                motor controls). Read alongside the layout.
              </li>
              <li>
                <strong>RFI log (Request For Information)</strong> — the formal record of
                questions asked of the design team. If something isn&apos;t clear on a drawing,
                you raise an RFI rather than guess.
              </li>
              <li>
                <strong>BIM models</strong> on larger projects — a 3D model with embedded data.
                Used for clash detection between trades and for as-built records.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The two drawings every apprentice should be able to read by month three"
            plainEnglish="A single line diagram and a schedule of circuits. The single line shows the structure of the installation — how power flows from the supply through the main switch, through the boards, out to the circuits. The schedule of circuits is the line-by-line detail — which RCBO, which cable, which load, which length."
            onSite="If you can read those two documents you can answer most 'what is fed from where' questions on site without asking. By the end of year one you should be able to mark up an as-built schedule (corrections, additions, deletions) and hand it back to the design team for incorporation into the final pack. That mark-up skill is what turns a worker into a tradesperson."
          >
            <p>
              Why these two before everything else:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                The schedule of circuits is what every inspector and tester reads first when they
                open the EICR — it&apos;s the index of the installation.
              </li>
              <li>
                The single line is what the next contractor to alter the install reads to
                understand the topology before disturbing anything.
              </li>
              <li>
                Both are required to be handed over with the EIC under BS 7671 Reg 132.13.
              </li>
              <li>
                Mistakes on either propagate forward — wrong cable size on the schedule means
                wrong testing, wrong diversity calculation, wrong protective device selection.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Family 3 — Standards and technical references</ContentEyebrow>

          <ConceptBlock
            title="BS 7671, the OSG, and the manufacturer data — the three you reach for"
            plainEnglish="The standards family is the technical authority you cite when challenged. BS 7671 (the IET Wiring Regulations) is the headline. The IET On-Site Guide is the practical handbook based on BS 7671. Manufacturer data sheets give you the specific instructions for specific products. Together they form the technical basis of every install you do."
            onSite="On a tidy site BS 7671 lives on the supervisor's desk and the OSG lives in your van. The mfr data is whatever the wholesaler delivered with the kit (or printed off the manufacturer's website). On a badly-run site you'll be told 'we always do it this way' — that is not an answer, and you politely point at the regulation."
          >
            <p>
              What each document gives you:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671 (the Wiring Regs)</strong> — the formal standard. Cited in
                contracts, certificates and EICRs. Everybody in the trade is expected to be
                familiar with the parts that apply to their work.
              </li>
              <li>
                <strong>IET On-Site Guide (OSG)</strong> — practical, table-driven, designed for
                site use. Covers the most common installation types and gives the numbers you
                need (cable sizes, fuse ratings, diversity factors).
              </li>
              <li>
                <strong>Manufacturer data sheets</strong> — torque values, conductor capacities,
                ferrule requirements, breaking capacities, IP ratings, mounting orientations. Tied
                to BS 7671 by Reg 510.3.
              </li>
              <li>
                <strong>IET Guidance Notes (1 to 8)</strong> — the in-depth technical companions
                covering selection &amp; erection, isolation, inspection &amp; testing, protection
                against fire, surge and earthing &amp; bonding.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671 — Reg 510.3 (General — selection and erection)"
            clause={
              <>
                &quot;Every item of equipment shall be selected and erected so as to allow
                compliance with the regulations stated in this chapter and the relevant
                regulations in other parts of BS 7671 and shall take account of manufacturers&apos;
                instructions.&quot;
              </>
            }
            meaning={
              <>
                Reg 510.3 ties the manufacturer&apos;s instructions directly to BS 7671 compliance.
                If the data sheet specifies a torque, that torque is part of how you achieve a
                code-compliant install. Skip the data sheet and you&apos;re relying on memory and
                feel — neither of which holds up under inspection or warranty challenge. The
                manufacturer data is part of the standards family because BS 7671 itself makes it
                so.
              </>
            }
            cite="Source: BS 7671:2018+A2:2022 IET Wiring Regulations, Chapter 51 — Common Rules, Reg 510.3."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Family 4 — Contract and commercial</ContentEyebrow>

          <ConceptBlock
            title="The paperwork that decides whether the firm gets paid"
            plainEnglish="Contract and commercial documents are how the firm manages the project from a cost-and-time perspective. Programme (the schedule), snag list (the end-of-job homework), variations (extra work outside the original scope), delay notices (formal record of programme slippage), instructions to proceed (formal go-ahead from the client). All of this lands on the QS's desk; some of it lands on yours."
            onSite="As an apprentice you don't run the commercial side, but you should know what each document does. The programme tells you the sequence and the deadline. The snag list is what the client uses to hold back final payment. Variations and delays have to be raised through the agreed channels — informal 'oh and can you do this too' conversations don't get paid for. Watch how the supervisor handles these and learn."
          >
            <p>
              The headline commercial documents:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Programme</strong> — the project schedule. Critical-path activities are
                the ones that can&apos;t slip without delaying the whole project. Knowing where
                your trade sits on the critical path is part of becoming a tradesperson.
              </li>
              <li>
                <strong>Snag list</strong> — defects identified at handover that need correcting
                before final payment is released. Owned by the client&apos;s representative or
                principal contractor.
              </li>
              <li>
                <strong>Variations</strong> — work outside the original contract scope, formally
                instructed and priced. The variation order is what triggers the additional
                payment.
              </li>
              <li>
                <strong>Delay notices</strong> — formal record that the programme has slipped,
                the cause, and (where applicable) the request for extension of time.
              </li>
              <li>
                <strong>Daywork sheets</strong> — used when work is being charged on a
                time-and-materials basis rather than against a fixed price. Signed by the client
                rep at the end of the day.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Family 5 — HR and personal</ContentEyebrow>

          <ConceptBlock
            title="The documents that define your terms, your rights and your apprenticeship"
            plainEnglish="HR documents cover your employment relationship — contract, JIB Working Rules where they apply, holiday request procedure, grievance and disciplinary procedures, training records and apprenticeship paperwork. They are how you get paid correctly, how you take time off, how you raise a concern, and how the apprenticeship is recorded for the end-point assessment."
            onSite="The HR family is the one apprentices ignore at their cost. Your contract is your terms; the JIB rules where they apply are the industry baseline; the grievance procedure is how you raise something formally. Knowing what's in each is knowing your standing in the firm. None of this is paranoid — it's basic professional practice for every trade."
          >
            <p>
              What sits in this family:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Employment contract</strong> — the legal basis of your job. Hours, pay,
                holiday, notice, pension, JIB reference where applicable. Read it; keep it.
              </li>
              <li>
                <strong>JIB Working Rules</strong> — the industry-standard rules for electricians
                in England and Wales. Cover grading, rates, overtime, travel time, lodging and the
                disputes procedure. Apprentices are covered by the JIB Apprentice Grading scheme.
              </li>
              <li>
                <strong>Apprenticeship paperwork</strong> — apprenticeship agreement, training
                plan, off-the-job hours log, monthly review forms (tutor + employer + you).
              </li>
              <li>
                <strong>Holiday and absence procedures</strong> — how to book time off, how to
                report sickness, what evidence is needed.
              </li>
              <li>
                <strong>Grievance and disciplinary procedures</strong> — how a concern is raised
                formally and how the firm responds. Read it before you need it.
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

          <ContentEyebrow>The five families on one site folder</ContentEyebrow>

          <ConceptBlock
            title="What a working site folder looks like — desktop and mobile"
            plainEnglish="A working site folder pulls representatives from each of the five families into one place — physical or digital. On a domestic CU change it might be a small ring-binder. On a commercial fit-out it's an app on the foreman's tablet plus a printed RAMS in each operative's pocket. On a major project it's a full document management system with version control."
            onSite="The format doesn't matter — the coverage does. If you can't point to the RAMS, the drawings, the standards reference, the programme and the contract paperwork within a couple of minutes of arrival, the site folder isn't doing its job. The walk-round to find each family is a five-minute exercise on day one and you log gaps to your supervisor."
          >
            <div className="space-y-3">
              <p className="text-[14px] leading-relaxed">
                What good coverage looks like on each family — table for desktop, card list for
                mobile so you can scan it without horizontal scrolling.
              </p>

              {/* Desktop table */}
              <div className="hidden sm:block overflow-hidden rounded-2xl border border-white/[0.08]">
                <table className="w-full text-[13px]">
                  <thead className="bg-white/[0.04] text-white/80 text-left">
                    <tr>
                      <th className="px-3 py-2 font-medium">Family</th>
                      <th className="px-3 py-2 font-medium">Headline document</th>
                      <th className="px-3 py-2 font-medium">Owner</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/85">
                    <tr className="border-t border-white/[0.06]">
                      <td className="px-3 py-2 font-medium">Safety</td>
                      <td className="px-3 py-2">RAMS, COSHH, permits</td>
                      <td className="px-3 py-2">PC / contractor</td>
                    </tr>
                    <tr className="border-t border-white/[0.06]">
                      <td className="px-3 py-2 font-medium">Design</td>
                      <td className="px-3 py-2">Drawings, schedules, RFI</td>
                      <td className="px-3 py-2">Designer / M&amp;E consultant</td>
                    </tr>
                    <tr className="border-t border-white/[0.06]">
                      <td className="px-3 py-2 font-medium">Standards</td>
                      <td className="px-3 py-2">BS 7671, OSG, mfr data</td>
                      <td className="px-3 py-2">Trade reference</td>
                    </tr>
                    <tr className="border-t border-white/[0.06]">
                      <td className="px-3 py-2 font-medium">Contract</td>
                      <td className="px-3 py-2">Programme, snag list, variations</td>
                      <td className="px-3 py-2">QS / project manager</td>
                    </tr>
                    <tr className="border-t border-white/[0.06]">
                      <td className="px-3 py-2 font-medium">HR</td>
                      <td className="px-3 py-2">Contract, JIB rules, apprenticeship paperwork</td>
                      <td className="px-3 py-2">Your employer</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile card list */}
              <div className="sm:hidden space-y-2">
                {[
                  { family: 'Safety', doc: 'RAMS, COSHH, permits', owner: 'PC / contractor' },
                  {
                    family: 'Design',
                    doc: 'Drawings, schedules, RFI',
                    owner: 'Designer / M&E consultant',
                  },
                  { family: 'Standards', doc: 'BS 7671, OSG, mfr data', owner: 'Trade reference' },
                  {
                    family: 'Contract',
                    doc: 'Programme, snag list, variations',
                    owner: 'QS / project manager',
                  },
                  {
                    family: 'HR',
                    doc: 'Contract, JIB rules, apprenticeship paperwork',
                    owner: 'Your employer',
                  },
                ].map((row) => (
                  <div
                    key={row.family}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3"
                  >
                    <div className="text-[10px] uppercase tracking-[0.18em] text-elec-yellow/80">
                      {row.family}
                    </div>
                    <div className="mt-1 text-[13px] font-semibold text-white">{row.doc}</div>
                    <div className="mt-0.5 text-[12px] text-white/60">Owner: {row.owner}</div>
                  </div>
                ))}
              </div>
            </div>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Leaving the site folder back at the office"
            whatHappens={
              <>
                Apprentice and second-year arrive on a domestic CU change. The supervisor has the
                site folder back at the office — &quot;I&apos;ll email it to you later&quot;. They
                start work without the RAMS, without the drawings, without the manufacturer data
                for the new board. Halfway through, a question comes up about the bonding
                arrangement and there&apos;s no schedule of circuits to refer to. They guess.
                Two months later the EICR observation flags a non-compliance and the firm has to
                go back to fix it on its own time.
              </>
            }
            doInstead={
              <>
                The site folder is a permanent part of the install record, not a courtesy
                handout. Make sure it&apos;s with the team that&apos;s actually doing the work
                from the moment work starts. Digital site folders (an app on a tablet) work fine
                provided every operative has access. If the folder isn&apos;t there, the work
                doesn&apos;t start &mdash; you raise it in writing to the supervisor and wait. BS
                7671 Reg 132.13 and CDM 2015 Reg 13 both require the information to be available
                at the workface, not in a drawer somewhere.
              </>
            }
          />

          <Scenario
            title="First day on a commercial DB upgrade — what should be in the site folder?"
            situation={
              <>
                You arrive at a small commercial DB upgrade &mdash; replacing a legacy distribution
                board in a single-tenant office unit. The supervisor hands you a clear-pocket
                folder containing the programme, a single-line diagram and the customer&apos;s
                purchase order. That&apos;s it. The work involves chasing for new sub-main
                containment, hot-works to fit a new gland plate, COSHH-relevant chemicals
                (contact cleaner, masonry sealant) and live working to make the final
                changeover.
              </>
            }
            whatToDo={
              <>
                Stop and list the missing information before any tool comes out. The folder
                should contain at minimum: RAMS for each task (chasing, hot-works, live
                changeover), a risk assessment that reflects this site (occupied office, public
                in the corridor, evening switch-over), COSHH data sheets for the contact cleaner
                and the masonry sealant, the schedule of existing circuits and a copy of the
                last EICR for the install, drawings beyond the single line (layout, schematic,
                schedule of new circuits), the manufacturer data for the new board and devices,
                a hot-works permit, BS 7671 / OSG for reference, and a reference back to the
                construction phase plan if this falls under CDM. Raise the gaps in writing to
                the supervisor and ask for them to be addressed before work starts. The
                supervisor will sometimes try to wave it off &mdash; politely don&apos;t. The
                request is itself evidence under HASAWA s.7 that you took reasonable steps.
              </>
            }
            whyItMatters={
              <>
                A thin folder is the single most common signal that a contractor is cutting
                corners. The work will probably get done &mdash; but the safety case is weak, the
                BS 7671 documentation duty under Reg 132.13 won&apos;t be properly discharged,
                and any incident becomes a problem that traces straight back to the missing
                information. The five minutes spent listing the gaps and asking for them is
                what separates a competent apprentice from one who will be in front of an HSE
                inspector five years from now wondering how it ended up there.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Workplace information splits into five families — safety, design, standards, contract / commercial and HR. Each has a different purpose, a different owner, and a different consequence when missing.",
              "Safety documents (RAMS, COSHH, risk assessments, permits, fire muster, welfare info) convert the H&S duty into specific instructions for specific work on a specific day. MHSWR 1999 Reg 3 is the statutory hook.",
              "Design documents (drawings, specs, schedules, schematics, RFI logs, BIM models) are the bridge between the specifier's intent and the installed reality. The schedule of circuits and single-line diagram are required at handover under BS 7671 Reg 132.13.",
              "Standards / technical references (BS 7671, IET OSG, manufacturer data, IET Guidance Notes) are the technical authority you cite when challenged. Reg 510.3 ties manufacturer instructions to BS 7671 compliance.",
              "Contract / commercial documents (programme, snag list, variations, delay notices, daywork sheets) are how the firm gets paid and how it manages risk. Apprentices watch and learn the commercial side from year one.",
              "HR documents (contract, JIB Working Rules, holiday and grievance procedures, apprenticeship paperwork) define your rights and obligations. Read them before you need them, not after.",
              "BS 7671 Reg 132.13 places the formal duty on the designer to provide installation information for safe operation, inspection and maintenance. CDM 2015 Reg 13 is the parallel duty on the principal contractor on notifiable construction sites.",
              "Missing information gets escalated in writing — text, email, app comment — not ignored. The escalation is itself evidence under HASAWA s.7 that you took reasonable steps before the work started.",
            ]}
          />

          <Quiz
            title="Purpose of workplace information — knowledge check"
            questions={quizQuestions}
          />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section2/2-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.4 Equality Act 2010
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section3/3-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.2 Reading RAMS and method statements
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
