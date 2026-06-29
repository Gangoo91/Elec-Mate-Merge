/**
 * Module 3 · Section 2 · Sub 1 — Sources of technical information
 * Maps to City & Guilds 2365-02 / Unit 203 / LO2 / AC 2.1
 *   AC 2.1 — "State purpose of different sources of technical information"
 *
 * Cross-references:
 *   - Back to §1 (statutory + non-statutory regs — BS 7671 itself, GN3, OSG sit there too)
 *   - Forward to §3 (where these sources land in real wiring decisions)
 *
 * Reg sources cited: 514.9.2 (A4:2026 — diagrams shall comply with applicable
 * standards), 514.9.1 (domestic exception), 132.13 (Documentation —
 * paraphrased; see 132.13.1 Diagrams and 132.13.2 Routine maintenance),
 * 526.1 (manufacturer instructions for terminations).
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

const TITLE = 'Sources of technical information | Level 2 Module 3.2.1 | Elec-Mate';
const DESCRIPTION =
  'BS 7671, GN3, OSG, manufacturer manuals, drawings, RAMS, certification scheme bulletins and HSE guidance — what each source is, what it tells you, and when you reach for it on site.';

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'sources-which-source-check',
    question:
      "You've got a brand-new RCBO sat in front of you and the test sequence on the OSG doesn't quite match what the device looks like. Where do you go FIRST to confirm how to test it?",
    options: [
      "The manufacturer's installation instructions for that specific RCBO",
      "The On-Site Guide ready-reckoner tables",
      "Guidance Note 3, for the generic test sequence",
      "The blank model forms in BS 7671 Appendix 6",
    ],
    correctIndex: 0,
    explanation:
      "Manufacturer's installation instructions (IIs) win for device-specific behaviour. BS 7671 and GN3 set the framework, but the device datasheet tells you the test buttons, terminal layout and any quirks. Reg 510.3 / 134.1.1 require you to follow manufacturer's instructions where they exist.",
  },
  {
    id: 'sources-bs7671-part-check',
    question:
      "You need to know the maximum permitted Zs for a 32 A Type B MCB on a TN system. Which part of BS 7671 do you open?",
    options: [
      "Part 1 — Scope, object, fundamental principles",
      "Appendix 3 — Time/current characteristics",
      "Part 6 — Inspection and testing",
      "Part 4 — Protection for safety",
    ],
    correctIndex: 1,
    explanation:
      "Appendix 3 holds the time/current curves and the corresponding Zs tables for standard protective devices. Part 4 explains the principle of automatic disconnection; Appendix 3 gives you the actual numbers. Apprentices often head to Part 6 by reflex — Part 6 tells you HOW to test, not what the limit IS.",
  },
  {
    id: 'sources-rams-check',
    question:
      "What's the difference between a RAMS and a method statement?",
    options: [
      "RAMS = Risk Assessment AND Method Statement combined into one document",
      "A RAMS is for high-risk work, a method statement is for low-risk",
      "A RAMS is just the risk assessment, the method statement is separate",
      "Nothing — they mean the same thing",
    ],
    correctIndex: 0,
    explanation:
      "RAMS is the umbrella term for the combined Risk Assessment + Method Statement document. The risk assessment identifies hazards and controls; the method statement is the step-by-step of how the work will actually be done. Most contractors issue them together as one PDF.",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Where in BS 7671 would you find the verbatim wording of a regulation about RCD additional protection on socket-outlets?",
    options: [
      "Part 1 (Scope)",
      "Part 4 (Protection for safety)",
      "Part 7 (Special installations or locations)",
      "Appendix 6 (Model forms)",
    ],
    correctAnswer: 1,
    explanation:
      "Part 4 — Protection for safety. Section 411 (TN/TT/IT) and Section 415 (additional protection by RCD) live there. Part 7 covers special locations like bathrooms and would extend the requirement; Appendix 6 just holds blank model forms.",
  },
  {
    id: 2,
    question:
      "You're sizing a final circuit on a domestic dwelling and want quick lookup tables for cable size vs MCB rating, with diversity factors already applied. Which book gets you there fastest?",
    options: [
      "IET Guidance Note 3 (GN3)",
      "BS 7671 itself",
      "IET On-Site Guide (OSG)",
      "BS 7671 Appendix 4",
    ],
    correctAnswer: 2,
    explanation:
      "The On-Site Guide is the ready-reckoner for domestic and small commercial work — pre-calculated tables, diversity worked out, the lot. GN3 covers inspection and testing in depth, not design.",
  },
  {
    id: 3,
    question:
      "BS 7671:2018+A4:2026 introduced a new regulation, 514.9.2, about diagrams and charts. What does it actually require?",
    options: [
      "That every installation must include a full single-line diagram on A3 paper",
      "That diagrams must be hand-drawn rather than produced on a computer",
      "That a copy of every drawing must be left inside the consumer unit",
      "That all diagrams, charts and information notices comply with the applicable standards specified",
    ],
    correctAnswer: 3,
    explanation:
      "514.9.2 (new in A4:2026) requires diagrams, charts and information/instruction notices to comply with the applicable standards — that means symbols per IEC 60617 (the modern replacement for BS EN 60617), notices per BS EN 60073 / 60446 etc. It's about consistency so anyone reading the drawing or label knows what they're looking at.",
  },
  {
    id: 4,
    question:
      "The manufacturer's installation instructions for an RCBO say 'torque each terminal to 1.2 Nm'. The OSG quotes 0.8-1.5 Nm as a typical range. What do you do?",
    options: [
      "Use 1.2 Nm — the manufacturer's specific figure overrides the generic guidance",
      "Use the OSG range — published guidance always takes priority over a single maker",
      "Use the midpoint of the OSG range as a sensible compromise between the two",
      "Use whichever value is highest to be sure the terminal is tight enough",
    ],
    correctAnswer: 0,
    explanation:
      "Specific beats generic. Reg 526.1 requires connections to be made in accordance with manufacturer instructions — that's the legal hook. The OSG range is a safety net for when no specific figure is given.",
  },
  {
    id: 5,
    question: "What is a RAMS?",
    options: [
      "Required Amperage Method Standard",
      "Risk Assessment and Method Statement",
      "Rated Ampacity Multiplier System",
      "Regulation Assessment for Mains Supply",
    ],
    correctAnswer: 1,
    explanation:
      "Risk Assessment and Method Statement — combined into a single document on most jobs. Identifies hazards, controls, and the step-by-step way the task will be done safely.",
  },
  {
    id: 6,
    question:
      "You've found a non-standard four-pole isolator on a refurb and need to know its short-circuit withstand rating. Where will the answer definitely be?",
    options: [
      "BS 7671 Appendix 3 time/current characteristics",
      "The On-Site Guide standard circuit tables",
      "The manufacturer's product datasheet",
      "Guidance Note 3 inspection schedules",
    ],
    correctAnswer: 2,
    explanation:
      "Datasheets carry the device-specific electrical ratings: In, Icn, Icu, Ics, mechanical endurance, terminal capacity. BS 7671 sets the requirements an installation must meet; the datasheet tells you what THIS device can actually do.",
  },
  {
    id: 7,
    question:
      "Which of these is NOT something you'd expect to find in BS 7671 itself (rather than in a Guidance Note)?",
    options: [
      "Definition of 'extraneous-conductive-part' (Part 2)",
      "Verbatim regulation wording on isolation (Section 537)",
      "Time/current curves for standard protective devices (Appendix 3)",
      "Worked example of a bathroom installation with the cable runs marked",
    ],
    correctAnswer: 3,
    explanation:
      "BS 7671 sets requirements, not worked installation examples. Worked examples with cable runs marked sit in the OSG and the Guidance Notes — that's their job. BS 7671 stays prescriptive: definitions, regulations, appendix data.",
  },
  {
    id: 8,
    question:
      "On site, you spot the certification scheme (NICEIC / NAPIT / Stroma) has issued a technical bulletin about a specific manufacturer's consumer unit being recalled. What's the correct response?",
    options: [
      "Read it, log it, and apply it on relevant jobs — bulletins reflect current best practice and the scheme audits against them",
      "Ignore it — only changes to BS 7671 itself have any force",
      "Wait for the next BS 7671 amendment before changing anything you do",
      "Apply it only if a customer specifically asks you to",
    ],
    correctAnswer: 0,
    explanation:
      "Scheme bulletins are how certification bodies communicate urgent technical changes between BS 7671 amendments. Audits expect to see you've taken account of them. Ignoring a bulletin about a recalled CU is exactly the kind of thing that fails an assessment visit.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: "BS 7671 is huge. Do I really need to know my way round all of it?",
    answer:
      "You don't memorise it — you learn the SHAPE of it, so when a question lands you know roughly which Part to open. Part 1 = scope, Part 2 = definitions, Part 3 = assessment, Part 4 = protection, Part 5 = selection of equipment, Part 6 = inspection & testing, Part 7 = special locations, then the appendices. Get the shape down and the rest is just turning pages.",
  },
  {
    question: "OSG vs GN3 — when do I use which?",
    answer:
      "OSG (On-Site Guide) is your day-one design book — cable sizes, diversity, ready-reckoner tables for domestic and small commercial. GN3 is your inspection & testing bible — every test method, every form, every certification scenario. Most apprentices live in the OSG for the first year and grow into GN3 once they're testing more.",
  },
  {
    question: "What's the difference between manufacturer's installation instructions and a datasheet?",
    answer:
      "Installation instructions tell you how to fit, wire and commission the device — torque settings, mounting orientation, test sequences. The datasheet tells you what it IS — electrical ratings, dimensions, certifications, environmental limits. Both come from the manufacturer and both override generic guidance for that specific product.",
  },
  {
    question: "Do I have to read the RAMS or is it just paperwork?",
    answer:
      "Read it. Sign it. Question anything you don't understand BEFORE the work starts. The RAMS is the document that proves the contractor thought about how to do this job safely — and if you get hurt doing something that contradicts the RAMS, both you and the contractor are in trouble. It's your shield as much as the company's.",
  },
  {
    question: "Why are there so many overlapping documents? BS 7671, OSG, GN3, scheme bulletins…",
    answer:
      "BS 7671 is the legal-strength standard (referenced by EAWR through dutyholder duties). The IET Guidance Notes and OSG break it down for practical use. Scheme bulletins (NICEIC SnagIT, NAPIT etc) plug the gap between amendments and flag emerging issues. Each layer is more practical and faster-moving than the one above it.",
  },
  {
    question: "If a manufacturer's instructions contradict BS 7671, who wins?",
    answer:
      "BS 7671 wins for installation requirements, but a manufacturer can REQUIRE more than BS 7671 — never less. If the manufacturer says 'must be on its own 30 mA RCD', you do that even if BS 7671 doesn't strictly require one for that circuit type. The rule is: meet the higher of the two.",
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
            eyebrow="Module 3 · Section 2 · Subsection 1"
            title="Sources of technical information"
            description="Where you actually look stuff up on site. The right answer isn't 'Google' — it's BS 7671, GN3, OSG, manufacturer's instructions, drawings, RAMS, scheme bulletins and HSE INDGs. Each one has a job."
            tone="emerald"
          />

          <TLDR
            points={[
              "BS 7671 is the regulation — the legal-strength standard. The OSG and the Guidance Notes break it down into practical, ready-to-use form.",
              "Manufacturer's installation instructions and datasheets win for device-specific behaviour. Reg 526.1 makes following them a legal requirement.",
              'Drawings, specs and RAMS are the job-specific layer. Scheme bulletins and HSE INDGs sit alongside as the live, fast-moving sources.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the purpose of BS 7671 and identify which Part covers which type of question.',
              'Describe the role of the IET On-Site Guide (OSG) and Guidance Note 3 (GN3) and when to reach for each.',
              "Explain why manufacturer's installation instructions and datasheets override generic guidance for that device.",
              'Identify the contents of a typical site spec, drawing pack and RAMS — and what each one is for.',
              'Recognise certification scheme technical bulletins as a live source of best-practice updates between BS 7671 amendments.',
              'Find the appropriate HSE INDG (industry guidance) for common site hazards (electricity, working at height, manual handling).',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this matters</ContentEyebrow>

          <ConceptBlock
            title="The wrong source is worse than no source"
            plainEnglish="Every document has a job. Reach for the wrong one and you'll get an answer that's confidently wrong."
            onSite="The supervisor doesn't expect you to know everything — they expect you to know where to LOOK. 'Let me check the manual' is a professional answer; 'I think it's about 1.5 Nm' is the answer that strips a terminal."
          >
            <p>
              On day one you'll be handed a drawing pack, a spec, a RAMS, a manufacturer's manual
              and (if you're lucky) somebody pointing at the relevant page of the OSG. Without a map
              of which document does what, you'll either freeze or — worse — pick a number out of
              the wrong book and run with it.
            </p>
            <p>
              The map is roughly: BS 7671 sets the rules, the OSG and the Guidance Notes turn the
              rules into practical tables and method, manufacturer documentation governs the
              specific device, drawings and spec govern the specific job, the RAMS governs the
              specific shift, and scheme bulletins + HSE INDGs feed in the latest live updates.
              Six layers, each with a different job.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>BS 7671 — the rulebook itself</ContentEyebrow>

          <ConceptBlock
            title="The shape of BS 7671 (so you can find anything in under a minute)"
            plainEnglish="Seven Parts plus Appendices. Learn the shape, not the page numbers."
          >
            <p>
              BS 7671 is structured the same way every amendment, so the muscle memory carries
              between editions. The current edition is BS 7671:2018+A4:2026. The Parts:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Part 1 — Scope, object, fundamental principles.</strong> What the standard
                covers and the safety principles behind it. You'll dip in here once a year at most.
              </li>
              <li>
                <strong>Part 2 — Definitions.</strong> Every defined term in alphabetical order.
                When you don't know what 'extraneous-conductive-part' or 'protective bonding
                conductor' actually means, this is where you go.
              </li>
              <li>
                <strong>Part 3 — Assessment of general characteristics.</strong> What you survey
                BEFORE you design — earthing system, supply, maximum demand, external influences.
              </li>
              <li>
                <strong>Part 4 — Protection for safety.</strong> Shock protection, fault protection,
                overcurrent, voltage disturbances, thermal effects. The biggest single Part.
              </li>
              <li>
                <strong>Part 5 — Selection and erection of equipment.</strong> Cables, switchgear,
                earthing arrangements, isolation, identification, other equipment.
              </li>
              <li>
                <strong>Part 6 — Inspection and testing.</strong> The test sequence, acceptance
                criteria, what goes on the cert. Twin reference with GN3.
              </li>
              <li>
                <strong>Part 7 — Special installations or locations.</strong> Bathrooms, swimming
                pools, agricultural premises, EV charging, marinas, caravan parks, medical
                locations. Each section adds to or modifies the general requirements.
              </li>
              <li>
                <strong>Appendices.</strong> Model forms (App 6), time/current curves (App 3),
                voltage drop (App 12), harmonised cable colours (App 7) and the rest. Reach for
                these constantly.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671 — Regulation 514.9.2 (new in A4:2026)"
            clause="514.9.2 — All diagrams, charts, and information or instruction notices used in electrical installations shall comply with the applicable standards specified."
            meaning={
              <>
                A4:2026 added this clause to nail down what 'a proper drawing' actually means.
                Symbols on diagrams need to follow the IEC 60617 graphical symbol set (the modern
                continuation of the old BS EN 60617). Notices need to follow BS EN 60073 (colours)
                and BS EN 60446 (markings). It's the regs catching up with the fact that home-made
                diagrams with made-up symbols don't help anyone read the install ten years later.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 Part 5, Section 514.9.2 (paraphrased)"
          />

          <RegsCallout
            source="BS 7671 — Regulation 526.1 (manufacturer's instructions for terminations)"
            clause="Every electrical connection shall be selected to take account of the conductors, the insulation, the number of conductors to be connected and the manner of installation, and shall be made in accordance with the manufacturer's instructions where applicable."
            meaning={
              <>
                The legal hook for following the manufacturer's torque, terminal type and connection
                method. If the device says 1.2 Nm, you do 1.2 Nm — even if the OSG quotes a wider
                generic range. Specific beats generic, and 526.1 gives the inspector the regulation
                to point at if you didn't.
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Section 526 for full text"
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The IET books that sit next to BS 7671</ContentEyebrow>

          <ConceptBlock
            title="On-Site Guide (OSG) — the apprentice's first lookup"
            plainEnglish="BS 7671 with the boring bits removed and the practical tables pre-filled. Domestic and small commercial focus."
            onSite="If you only carry one IET book in the van, make it the OSG. It's the one you'll reach for forty times a week — cable sizes, diversity, ring final calcs, ready-reckoner Zs values."
          >
            <p>
              The On-Site Guide is the IET's plain-English, pre-calculated companion to BS 7671. It
              assumes a domestic or small commercial install, applies sensible defaults and gives
              you ready tables for cable sizing, diversity, voltage drop and standard final
              circuits. Anything that's not domestic — heavy industrial, special locations,
              non-standard supply — drops you back to the full BS 7671 numbers.
            </p>
            <p>
              What's actually in it: standard final circuit arrangements (radial, ring, lighting),
              diversity tables for sockets / cookers / showers, current-carrying capacity tables
              (lifted from BS 7671 Appendix 4), maximum permissible Zs values for common MCBs,
              standard test result limits, blank certification forms.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Guidance Note 3 — Inspection and Testing (GN3)"
            plainEnglish="The deep-dive companion to BS 7671 Part 6. Every test method, every form, every awkward edge case."
            onSite="GN3 is the book you grow into. Year one you barely open it. Year three you can't test without it. It's the one the assessor will assume you know inside out by AM2."
          >
            <p>
              There are eight numbered Guidance Notes (GN1 through GN8) — each one expands on a
              specific area of BS 7671. The two you'll meet first as an apprentice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>GN1 — Selection and Erection.</strong> Expands on Parts 5 of BS 7671 — wiring
                systems, containment, terminations.
              </li>
              <li>
                <strong>GN3 — Inspection and Testing.</strong> Expands on Part 6. Every test method
                with diagrams, every cert form filled out as a worked example, periodic vs initial
                vs minor works, schedules of inspections, sample EICR.
              </li>
            </ul>
            <p>
              GN3 in particular is your canonical reference for HOW to do every test in the
              sequence: continuity (R1+R2 / wander lead), insulation resistance, polarity, earth
              fault loop impedance (Zs at the furthest point, Ze at the origin), prospective fault
              current, RCD operation. When you sit AM2, GN3 is the document you'll have read
              cover-to-cover.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Manufacturer documentation — the device-specific layer</ContentEyebrow>

          <ConceptBlock
            title="Installation instructions (IIs) and datasheets"
            plainEnglish="Two different documents, both from the manufacturer. IIs = how to fit it. Datasheet = what it does."
          >
            <p>
              <strong>Installation instructions</strong> ship with every accessory, device and
              piece of switchgear. They tell you how to mount it, what orientation it needs, the
              torque for each terminal, the cable sizes the terminals will accept, the test
              sequence on commissioning and any specific warnings (e.g. 'must not be installed
              within 1 m of ferromagnetic material' for some current transformers).
            </p>
            <p>
              <strong>Datasheets</strong> are the technical product card. Rated current (In),
              breaking capacity (Icn / Icu / Ics), trip curve type (B / C / D), residual current
              rating for RCDs (30 mA, 100 mA, 300 mA), terminal capacity range, IP rating,
              dimensions for cut-out, working temperature range, conformity standards (BS EN 60898,
              BS EN 61009 etc).
            </p>
            <p>
              When you specify, design or commission a device, both documents matter. When the
              inspector turns up, the first thing they'll ask if anything looks off is "have you got
              the manufacturer's instructions?". If the answer is no, they'll fail it on principle.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Job-specific paperwork — drawings, specs, RAMS</ContentEyebrow>

          <ConceptBlock
            title="Drawings, specifications and BS / BS EN standards"
            plainEnglish="The job-specific layer — what THIS install needs, on THIS site, to THESE specs."
          >
            <p>
              <strong>Drawings</strong> show you the physical install — block diagrams, schematics,
              wiring diagrams, layout/floor plans, single-line diagrams for the board. (Sub 2
              breaks down each type.)
            </p>
            <p>
              <strong>Specifications</strong> (the 'spec') is the written brief from the
              designer/architect/M&E consultant. It lists the required products by
              standard/manufacturer, the design intent (lux levels, socket density), any project
              constraints (only LSF cable, only DALI dimming etc) and the contractual deliverables.
              Read the spec BEFORE you order materials.
            </p>
            <p>
              <strong>BS and BS EN standards</strong> sit underneath as the product standards. A
              spec might say "all socket-outlets to BS 1363-2"; that BS standard is the thing the
              socket has to conform to. You don't need to read every product standard cover to
              cover, but you need to know they exist and what they govern (BS 6004 = PVC cables,
              BS 5733 = general accessories, BS EN 60898 = MCBs, BS EN 61009 = RCBOs).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="RAMS — Risk Assessment and Method Statement"
            plainEnglish="The document that says how this job will be done safely. Read it before you start."
            onSite="If you ever hear 'oh just crack on, the RAMS is in the van' — that's a flag. The RAMS exists to be read and signed by everyone doing the work, not stored under a coffee cup."
          >
            <p>
              A RAMS combines two things into one document:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The risk assessment</strong> — every significant hazard on this job, the
                likelihood and severity, and the control measures. Think: working at height,
                live-working risk, confined space, asbestos, manual handling, vehicle movements.
              </li>
              <li>
                <strong>The method statement</strong> — the step-by-step of how the work will be
                carried out, in order, with the safety controls integrated. Think: 'isolate at the
                main switch, lock off, prove dead with a GS38 voltage indicator that has been proved
                on a known live source, then…'.
              </li>
            </ul>
            <p>
              It's signed off by a competent person before work starts. Every operative on the job
              should read and sign it. If site conditions change (a wall comes down, asbestos turns
              up) the work stops and the RAMS is reviewed before restart.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The fast-moving sources — bulletins and HSE</ContentEyebrow>

          <ConceptBlock
            title="Certification scheme technical bulletins"
            plainEnglish="The way scheme bodies (NICEIC, NAPIT, Stroma, ELECSA) update you between BS 7671 amendments."
            onSite="Your assessor on a scheme audit will assume you've read the latest bulletins. 'I didn't see it' isn't a defence — bulletins go out by email and sit on the scheme website."
          >
            <p>
              Certification schemes issue technical bulletins when something material changes —
              a manufacturer recall, an emerging fault pattern (e.g. a particular CU brand catching
              fire), a clarification of how a new amendment should be interpreted in practice, a
              change to scheme rules. NICEIC's are commonly called SnagIT or technical updates;
              NAPIT and Stroma have their own equivalents.
            </p>
            <p>
              Bulletins are not law in the way BS 7671 is, but ignoring them is a fast track to a
              failed annual assessment. They reflect current best practice and the schemes will
              audit you against them.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="HSE INDGs and ACoPs"
            plainEnglish="HSE = Health and Safety Executive. INDG = INDustry Guidance leaflet. ACoP = Approved Code of Practice."
          >
            <p>
              HSE produces short, practical leaflets on common workplace hazards. The ones an
              electrician should know by name:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>INDG354</strong> — Safety in electrical testing at work (the 'safe isolation'
                pattern).
              </li>
              <li>
                <strong>INDG236</strong> — Maintaining portable electric equipment (PAT).
              </li>
              <li>
                <strong>INDG401</strong> — Working at height — a brief guide.
              </li>
              <li>
                <strong>INDG163</strong> — Five steps to risk assessment (if you're ever asked to
                produce one).
              </li>
            </ul>
            <p>
              Approved Codes of Practice (ACoPs) sit alongside specific Regulations (CDM, COSHH,
              Asbestos, EAWR). ACoPs have special legal status: if you can show you followed the
              ACoP, you're presumed to have complied with the law; if you didn't, you have to prove
              you achieved compliance another way.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Reaching for the OSG when the answer needed BS 7671 itself"
            whatHappens={
              <>
                You're working on a swimming pool plant room and want to know the IP rating
                requirement for the equipment in Zone 1. You flick through the OSG, can't find it
                (because the OSG is domestic-focused and doesn't go deep on Section 702), and end
                up guessing or asking the WhatsApp group. The 'just use IP44' answer somebody gives
                you is wrong — Section 702 has specific zone-by-zone requirements that aren't in
                the OSG.
              </>
            }
            doInstead={
              <>
                Special locations always live in BS 7671 Part 7. Pool = 702. Bathroom = 701. EV
                charging point = 722. Solar PV = 712. Train yourself to go straight to Part 7 the
                moment a job has any of those words attached, and only drop back to the OSG for the
                generic stuff.
              </>
            }
          />

          <CommonMistake
            title="Treating the spec as a suggestion"
            whatHappens={
              <>
                The spec calls for LSF (Low Smoke and Fume) cable throughout. You've got T&E in the
                van, the merchant doesn't have LSF in stock today, you crack on with T&E to keep
                the programme. Three months later the M&E consultant walks the install, spots the
                T&E and the contractor has to strip and refit the lot — at your firm's cost.
              </>
            }
            doInstead={
              <>
                The spec is contractually binding. If you can't meet it (material unavailable,
                physical clash, design error) you raise a Technical Query (TQ) or Request For
                Information (RFI) in writing and wait for a written variation. Verbal "yeah it's
                fine" from a foreman is worth nothing when the snag list arrives.
              </>
            }
          />

          <Scenario
            title="The recalled consumer unit"
            situation={
              <>
                You're shadowing on a periodic inspection. The CU is a brand and model that NICEIC
                issued a technical bulletin about six months ago — manufacturer admitted a batch
                were prone to internal arcing under fault conditions and recommended replacement.
                Your supervisor doesn't seem to know about the bulletin and is about to mark the
                CU as 'satisfactory'.
              </>
            }
            whatToDo={
              <>
                Quietly mention the bulletin and offer to pull it up on your phone. Frame it as
                'just in case we need to flag it' — don't make it a confrontation. If the bulletin
                applies, the CU should be coded (typically C2 — potentially dangerous) and the
                customer informed in writing. Reissuing a 'satisfactory' EICR on a recalled CU
                exposes the firm if anything later goes wrong.
              </>
            }
            whyItMatters={
              <>
                Scheme bulletins are exactly the situation where 'I didn't know' isn't a defence.
                The CU recall is a documented hazard with a known control. An EICR signed off
                without acknowledging it is a paperwork failure with real liability.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 = the rules. OSG = practical day-one tables. GN3 = inspection & testing in depth. Manufacturer IIs + datasheets = device-specific.',
              "Reg 526.1 makes manufacturer's installation instructions a legal requirement for terminations — torque, terminal type, connection method.",
              'Reg 514.9.2 (new in A4:2026) requires diagrams, charts and notices to comply with the applicable standards (IEC 60617 for symbols, BS EN 60073 for notices).',
              'A RAMS is the Risk Assessment + Method Statement combined — read it, sign it, question it before work starts.',
              'Spec is contractually binding. If you can\'t meet it, raise a TQ/RFI in writing and wait for a written variation.',
              'Certification scheme bulletins (NICEIC, NAPIT, Stroma) are how new issues get communicated between BS 7671 amendments. Read them.',
            ]}
          />

          <Quiz title="Sources of technical info — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section1/1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Non-statutory regulations and guidance
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section2/2-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Drawing types
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
