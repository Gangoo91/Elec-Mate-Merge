/**
 * Module 3 · Section 2 · Sub 2 — Drawing types
 * Maps to City & Guilds 2365-02 / Unit 203 / LO2 / AC 2.2
 *   AC 2.2 — "Recognise different drawing types"
 *
 * Cross-references:
 *   - Back to Sub 1 (where drawings sit in the document hierarchy)
 *   - Forward to Sub 3 (the symbols those drawings use)
 *   - Forward to Sub 4 (reading scale on layout/floor plans)
 *
 * Reg sources cited: 514.9.2 (A4:2026 — diagrams shall comply with applicable
 * standards), 132.12 (information to be provided — paraphrased).
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

const TITLE = 'Drawing types | Level 2 Module 3.2.2 | Elec-Mate';
const DESCRIPTION =
  'Block, schematic, wiring, circuit, layout and as-built drawings — six families of drawing every electrician needs to read, with the typical use case for each.';

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'drawings-which-type-check',
    question:
      "Your supervisor hands you a drawing showing the consumer unit feeding three sub-mains, each going to a separate distribution board, with a battery backup off the second DB. No conductor sizes, no terminations — just boxes and arrows. What kind of drawing is it?",
    options: [
      'Wiring diagram',
      'Block diagram',
      'Schematic diagram',
      'Layout drawing',
    ],
    correctIndex: 1,
    explanation:
      "Block diagram. Boxes for each major part of the system, arrows showing how power/signal flows between them, no detail on individual conductors. It's the 30,000-foot view — the first drawing you look at to understand what the system IS before you read anything else.",
  },
  {
    id: 'drawings-circuit-vs-wiring-check',
    question:
      "A circuit diagram and a wiring diagram differ in one fundamental way. Which is it?",
    options: [
      'Circuit diagrams use colour, wiring diagrams use black-and-white',
      "Circuit diagrams show function (the logic of how it works); wiring diagrams show physical connection (every conductor between every terminal)",
      'Circuit diagrams are for AC, wiring diagrams are for DC',
      'Circuit diagrams are computer-generated, wiring diagrams are hand-drawn',
    ],
    correctIndex: 1,
    explanation:
      "Function vs physical. A circuit diagram shows the logic — how the components interact electrically, drawn for clarity (e.g. a 2-way lighting circuit with the strappers crossed for understanding). A wiring diagram shows the actual physical wiring — every cable, every terminal, the way the install is really laid out. You read circuit diagrams to understand; you wire from wiring diagrams.",
  },
  {
    id: 'drawings-asbuilt-check',
    question:
      "What's the difference between an 'as-designed' drawing and an 'as-built' drawing?",
    options: [
      "Nothing — they're the same thing",
      'As-designed = before the job. As-built = updated to show what was actually installed (including any deviations)',
      'As-designed is for residential, as-built is for commercial',
      "As-built drawings don't need a scale",
    ],
    correctIndex: 1,
    explanation:
      "As-designed is the drawing the designer issued at the start. As-built (sometimes called 'red-line' or 'record drawing') is the drawing marked up to show what was ACTUALLY installed — including the variations that happened on site (cable rerouted around an unexpected beam, socket moved 200 mm, etc). The as-built is the document handed over at completion and is what future maintenance relies on.",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "You're trying to understand how a star-delta motor starter works conceptually — the sequence of contactor operations and the timer logic. Which drawing type gives you that fastest?",
    options: ['Wiring diagram', 'Schematic diagram', 'Layout drawing', 'Block diagram'],
    correctAnswer: 1,
    explanation:
      "Schematic. It's drawn for understanding the function — components in their logical positions, control wiring spread out for clarity, sequence easy to follow. The wiring diagram would show the same circuit but with every physical cable drawn between the actual terminals — much harder to follow if you're trying to learn how it works.",
  },
  {
    id: 2,
    question:
      "An electrician on site is fault-finding a faulty contactor and needs to know which terminals connect to which control wires. Which drawing should they reach for?",
    options: ['Block diagram', 'Schematic diagram', 'Wiring diagram', 'Layout drawing'],
    correctAnswer: 2,
    explanation:
      "Wiring diagram. It maps every conductor to every termination — exactly what you need when you've got a meter on the panel and you're trying to trace a fault. The schematic shows the logic; the wiring diagram shows the physical reality.",
  },
  {
    id: 3,
    question:
      "A floor plan drawing shows a kitchen with sockets marked at six positions on the wall. The drawing has a scale of 1:50 and a key in the bottom corner. What kind of drawing is this?",
    options: ['Wiring diagram', 'Schematic', 'Layout drawing (floor plan)', 'Block diagram'],
    correctAnswer: 2,
    explanation:
      "Layout drawing (floor plan). It shows where things go physically in the building, drawn to scale. It does NOT show how they're wired — that's the wiring diagram's job. A layout shows position; a wiring diagram shows electrical connection.",
  },
  {
    id: 4,
    question:
      "BS 3939 used to be the British Standard for electrical drawing symbols. What replaced it?",
    options: ['BS 7671', 'BS EN 60617 (now superseded by IEC 60617)', 'BS 5266', 'BS 1363'],
    correctAnswer: 1,
    explanation:
      "BS 3939 was withdrawn in favour of BS EN 60617, the European-aligned graphical symbol set. BS EN 60617 has been withdrawn as a printed standard; the symbols are now maintained centrally as the IEC 60617 online database, which BSI references — and the 60617 number is what you'll hear quoted on UK sites and in the C&G syllabus.",
  },
  {
    id: 5,
    question:
      "Which of these statements about as-built drawings is TRUE?",
    options: [
      "They're optional and rarely produced",
      "They're produced before the install starts",
      'They reflect the final installed state including any site variations and are part of the handover',
      "They're only required on commercial jobs over £100k",
    ],
    correctAnswer: 2,
    explanation:
      "As-builts are the record of what was actually installed and are part of the handover pack on any job of substance. They're how the next electrician in five years' time understands what's behind the wall.",
  },
  {
    id: 6,
    question:
      "A drawing shows just the general principle of how a fire alarm system is laid out on a single floor — call points, sounders and the panel — without any specific cable types or terminal numbers. The intent is for the apprentice to understand the system, not wire it. What type of drawing is this MOST LIKELY?",
    options: [
      'Wiring diagram (every conductor shown)',
      'Schematic diagram (function-focused)',
      'Block diagram (boxes and flows)',
      "Manufacturer's installation instruction",
    ],
    correctAnswer: 1,
    explanation:
      "Schematic. It's showing the system's function and layout for understanding, not the every-conductor detail of a wiring diagram and not the boxes-and-arrows abstraction of a block diagram. Schematics sit between the two.",
  },
  {
    id: 7,
    question:
      "A new regulation in BS 7671:2018+A4:2026 (514.9.2) clarified an expectation about drawings and charts on installations. What does it require?",
    options: [
      "Drawings must be supplied in PDF format",
      'Diagrams, charts and information notices shall comply with the applicable standards specified',
      'Drawings must be replaced every five years',
      'Drawings must be hand-drawn for legal validity',
    ],
    correctAnswer: 1,
    explanation:
      "514.9.2 (new in A4:2026) requires diagrams, charts and notices to comply with the applicable standards — symbols per IEC 60617, notices per BS EN 60073/60446 etc. It nailed down what 'a proper drawing' means.",
  },
  {
    id: 8,
    question:
      "When a drawing is updated DURING a job to show a routing change (a sub-main is rerouted around a beam that wasn't on the original drawing), what's the conventional way of marking it?",
    options: [
      'Erase the old route and redraw',
      "Print a fresh drawing — don't mark the old one",
      "Red-line the change on the working drawing — that becomes the basis for the as-built",
      'Email the change to head office, no change to drawing',
    ],
    correctAnswer: 2,
    explanation:
      "Red-lining (literally marking the change in red pen on the working drawing) is the traditional convention. The red-lined drawing then gets formally updated into the as-built before handover. The principle is that nothing happens on site without leaving a record.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: "How do I tell at a glance whether a drawing is a schematic or a wiring diagram?",
    answer:
      "Schematics look TIDY — components arranged for clarity, wires running in clean horizontal/vertical lines, often without colour codes. Wiring diagrams look MESSY by comparison — every conductor with its colour, terminal numbers everywhere, components drawn roughly where they actually sit. Schematic = readable; wiring diagram = installable. If you can follow the logic easily it's probably a schematic.",
  },
  {
    question: "Do I really need block diagrams? They look so basic.",
    answer:
      "They're basic on purpose. A block diagram is the first thing you look at on an unfamiliar system to understand what the system IS — power source, distribution, sub-systems, loads. Without it you'd dive straight into a 30-page wiring pack with no map. The block diagram is the map.",
  },
  {
    question: "What's a single-line diagram (SLD)? It wasn't on the syllabus list.",
    answer:
      "It's a sub-type of block/schematic that's almost universal on commercial and industrial boards. It shows the entire distribution system as single lines (even though it's three-phase or split-phase), with switchgear, protective devices, ratings and feeder destinations marked. You'll meet it constantly once you're on commercial work — basically the 'what's where on the board' overview.",
  },
  {
    question: "Why do circuit diagrams sometimes look weird — strappers crossed, components in odd positions?",
    answer:
      "Because they're drawn for FUNCTION, not physical reality. A 2-way lighting circuit drawn 'properly' with the strappers crossed shows the switch operation immediately — you can see exactly which path is live in each switch position. Drawn the way it's actually wired (strappers parallel) the function is much harder to follow.",
  },
  {
    question: "Do as-built drawings really get used after handover?",
    answer:
      "Absolutely — they're the only record of what's actually behind the wall. When a future electrician comes to add a circuit, fault-find or do a periodic, the as-built is what they'll be working from. A bad as-built (or no as-built) means future work is guesswork and dangerous. That's why handover packs without as-builts get rejected on serious jobs.",
  },
  {
    question: "What's the difference between an architectural drawing with circuits marked and a proper electrical layout?",
    answer:
      "Architects' drawings show the building. Electrical layouts (often produced by overlaying onto the architect's drawing) show electrical positions and runs. They share a backdrop but the layout is the electrician's responsibility. Don't try to wire from the architect's plan alone — it won't have circuit references, cable routes or device-specific information.",
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
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 3 · Section 2 · Subsection 2"
            title="Drawing types"
            description="Six families of drawing every electrician needs to read — block, schematic, wiring, circuit, layout/floor plan and as-built. Mix them up and you'll wire the wrong thing."
            tone="emerald"
          />

          <TLDR
            points={[
              'Six drawing types to recognise: block, schematic, wiring, circuit, layout/floor plan, as-built. Each has a job.',
              "Schematic shows function (the logic). Wiring diagram shows physical connection (every conductor). Don't confuse them.",
              "As-built drawings are the record of what was ACTUALLY installed — they're the handover document and the basis for all future work.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Recognise and name the six common electrical drawing types: block, schematic, wiring, circuit, layout and as-built.',
              'State what each drawing type shows and what it deliberately leaves out.',
              'Pick the right drawing type for the task: understanding a system (block/schematic), wiring it (wiring/circuit), positioning equipment (layout), recording what was done (as-built).',
              'Understand the difference between as-designed and as-built drawings and why both matter.',
              'Recognise that BS 3939 was replaced by BS EN 60617 (now maintained as IEC 60617) for graphical symbols.',
              'Identify the conventional drawing pack you should expect on any decent-sized job.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this matters</ContentEyebrow>

          <ConceptBlock
            title="The right drawing for the right question"
            plainEnglish="Each drawing type answers a specific question. Pick the wrong one and you'll spend an hour trying to read information that isn't there."
            onSite="Apprentices waste serious time trying to wire from a schematic, or fault-find from a block diagram. The drawing types aren't interchangeable — they're tools."
          >
            <p>
              On a real job you'll get handed a pack — sometimes one drawing, sometimes thirty. The
              ability to flick to the right one in ten seconds is what separates an apprentice
              who's been around six months from one who's been around two years. Each type is
              optimised for a different question.
            </p>
            <p>
              Want to understand the SYSTEM? Block or schematic. Want to WIRE it up? Circuit or
              wiring. Want to know WHERE things go physically? Layout / floor plan. Want to know
              what's ACTUALLY THERE behind the plaster? As-built. Six tools, six jobs.
            </p>
            <p>
              Counter-intuitive bit: schematics LOOK simpler — that's the trap. A schematic
              strips the picture down to the function so you can see what the circuit DOES, not
              how it's wired. The wiring diagram looks chaotic by comparison, but it's the only
              one that tells you which terminal goes where. Reach for the simple-looking
              schematic when you should have grabbed the wiring diagram and you'll be staring
              at it for an hour wondering why the terminals don't match.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Block diagrams — the 30,000-foot view</ContentEyebrow>

          <ConceptBlock
            title="Block diagrams: what the system IS"
            plainEnglish="Boxes with labels, arrows showing flow. No detail on conductors or terminals."
            onSite="The first drawing you look at on an unfamiliar install. Spend two minutes here BEFORE diving into the wiring pack and you'll save half an hour later."
          >
            <p>
              A block diagram is the simplest level of system drawing. Each major sub-system gets a
              labelled box, and arrows show how power, signal or data flows between them. There's
              no attempt to show individual conductors, terminations, ratings or routing — just
              what's there and how it connects at the top level.
            </p>
            <p>
              Typical use cases:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                A standby generator system: 'mains supply → ATS → main DB; generator → ATS → main
                DB; main DB → essential loads; main DB → non-essential loads'.
              </li>
              <li>
                A fire alarm system overview: 'panel → loop 1 (call points + sounders for floor 1)
                → loop 2 (floor 2) → BMS interface'.
              </li>
              <li>
                A solar PV install at top level: 'roof array → DC isolator → inverter → AC isolator
                → consumer unit; battery → hybrid inverter → CU'.
              </li>
            </ul>
            <p>
              Read it once, get the mental picture, then move to the detailed drawings.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Schematic diagrams — the function</ContentEyebrow>

          <ConceptBlock
            title="Schematic diagrams: how it WORKS, drawn for clarity"
            plainEnglish="Components in logical positions, wires running clean. Optimised for understanding the function, not the physical install."
          >
            <p>
              A schematic shows the same circuit as a wiring diagram but rearranged for readability.
              Components sit in their logical relationship to each other (often top-to-bottom for
              control, left-to-right for power flow), and the conductors are drawn as straight
              lines, often with crossings, to keep the function easy to follow.
            </p>
            <p>
              Typical use cases:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Motor control circuits — start/stop logic, hold-on contacts, overload reset.
              </li>
              <li>
                Lighting circuits drawn for teaching or fault-finding (2-way, intermediate,
                stairwell with multiple switches).
              </li>
              <li>
                Control panels — the 'how the logic works' drawing that sits behind the wiring
                diagram.
              </li>
            </ul>
            <p>
              Schematics are what you read to UNDERSTAND. They're rarely what you wire from
              directly — for that, you need the wiring diagram.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Wiring diagrams — the physical reality</ContentEyebrow>

          <ConceptBlock
            title="Wiring diagrams: every conductor, every termination"
            plainEnglish="The drawing you wire from. Every cable, every terminal, every connection."
            onSite="Wiring diagrams look messy because real wiring IS messy. The whole point is to be able to put a meter on terminal X3.4 and know what should be on it."
          >
            <p>
              A wiring diagram shows the physical wiring of an installation as it's actually
              installed: every conductor, the terminal it goes to, often the cable colour, sometimes
              the cable size and type. Components are drawn roughly where they physically sit.
            </p>
            <p>
              Typical use cases:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Control panel wiring drawings — used by the panel-builder to wire it and by the
                installer/maintainer to fault-find.
              </li>
              <li>
                Equipment internal wiring (e.g. inside a packaged AHU or a process skid).
              </li>
              <li>
                Domestic accessory connection diagrams supplied with smart switches, dimmers,
                two-gang plates etc.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Circuit diagrams — the function (close cousin of schematic)</ContentEyebrow>

          <ConceptBlock
            title="Circuit diagrams: components in their function"
            plainEnglish="Function-focused like a schematic, but with stronger emphasis on individual circuit elements."
          >
            <p>
              The terms 'circuit diagram' and 'schematic diagram' often overlap. In strict UK usage,
              a circuit diagram emphasises the components and how they interact electrically (often
              with circuit references like CCT 1, CCT 2 marked); a schematic is broader and may
              include control logic, sequencing and timing.
            </p>
            <p>
              Both use BS EN 60617 graphical symbols (the standard introduced in Sub 3) — the
              symbols replaced the older BS 3939 set. Both are drawn for function, not for physical
              wiring.
            </p>
            <p>
              Typical use cases:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Domestic final circuits (radials, rings, lighting) drawn to show how they work.
              </li>
              <li>
                Educational drawings — what you see in textbooks and what you'll see on the C&G
                exam paper.
              </li>
              <li>
                Single-circuit explanations supplied with manufacturer literature.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671 — Regulation 514.9.2 (new in A4:2026)"
            clause="514.9.2 — All diagrams, charts, and information or instruction notices used in electrical installations shall comply with the applicable standards specified."
            meaning={
              <>
                The regulatory anchor for the whole topic of drawings and symbols. The 'applicable
                standards' for graphical symbols are now the IEC 60617 online database (the modern
                continuation of BS EN 60617, which itself replaced BS 3939). Drawings using
                home-made symbols, mixed conventions or out-of-date sets technically don't comply
                with this regulation.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 Part 5, Section 514.9.2 (paraphrased)"
          />

          <RegsCallout
            source="BS 7671 — Regulation 132.12 (information to be provided)"
            clause="132.12 — Information about the electrical installation shall be provided to enable users, operators and persons subsequently working on the installation to identify circuits, isolation points, protective devices, the means of compliance with the regulations and any specific risks."
            meaning={
              <>
                The regulation that makes drawings, schedules, charts and labels a regulatory
                requirement (not a paperwork nicety). Block, schematic, wiring, layout and as-built
                drawings are how you discharge 132.12 in practice. Hand over a job without a usable
                drawing pack and you're in breach — the next electrician on the install can't
                identify the circuits, isolation points or specific risks the regulation says they
                should be able to.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 132.12 (paraphrased)"
          />

          <RegsCallout
            source="BS 7671 — Regulation 511.1 (compliance with standards)"
            clause="511.1 — Every item of equipment shall comply with the relevant requirements of the applicable British Standard or Harmonized Standard appropriate to the intended use of the equipment, or of an equivalent standard."
            meaning={
              <>
                The flip-side of 514.9.2. Where 514.9.2 governs the drawings themselves, 511.1
                governs everything ON the drawings — the equipment specified must comply with the
                applicable BS / BS EN. So a designer can't put 'generic socket-outlet' on a layout;
                they have to specify (or their spec has to imply) compliance with BS 1363-2 for a
                socket, BS EN 60898 for an MCB, BS EN 61009 for an RCBO. The drawing pack is
                read alongside 511.1.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 Part 5, Chapter 51, Regulation 511.1 (paraphrased)"
          />

          <RegsCallout
            source="BS 8888 and IEC 60617 — the standards that sit behind the drawings"
            clause="BS 8888 — Technical product documentation and specification — is the UK / European master standard for engineering drawings, references ISO 128 (general drawing principles), ISO 5455 (scales) and ISO 5456 (projection methods). IEC 60617 is the graphical symbol database for electrical drawings."
            meaning={
              <>
                BS 7671 Reg 514.9.2 demands compliance with the 'applicable standards' for diagrams.
                The two applicable standards for an electrical drawing are BS 8888 (how the drawing
                is structured — projection, scale, dimensioning, title block) and IEC 60617 (which
                symbols sit on it). A drawing that follows BS 8888 + IEC 60617 is what 514.9.2 is
                pointing at as compliant. A drawing that uses neither is informal — treat it with
                the same caution as a drawing with a home-made symbol set.
              </>
            }
            cite="Reference: BS 8888:2020 (Technical product documentation and specification); IEC 60617 graphical symbols database (paraphrased)"
          />

          <SectionRule />

          <ContentEyebrow>Projection conventions — orthographic vs isometric (BS 8888)</ContentEyebrow>

          <ConceptBlock
            title="Orthographic and isometric projection — and why BS 8888 underpins both"
            plainEnglish="Orthographic = flat 2D views (plan, front, side). Isometric = a single 3D-style view that shows three faces at once. Different jobs, different drawings."
            onSite="On a building you'll mostly see orthographic plans (plan + elevations). On a piece of equipment — a control-panel mount, a busbar chamber, a containment riser — you'll meet isometric views because they show the depth in a single picture."
          >
            <p>
              Two projection conventions cover almost every technical drawing you'll meet:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Orthographic projection</strong> — the object is shown as multiple flat 2D
                views (typically plan from above, front elevation, side elevation). The UK / European
                convention is <strong>first-angle</strong> projection (the side view sits on the
                opposite side of the front view to the side it represents). The US convention is{' '}
                <strong>third-angle</strong> projection (the side view sits on the same side). The
                title block carries a small symbol — a truncated cone or two circles — indicating
                which angle is in use.
              </li>
              <li>
                <strong>Isometric projection</strong> — a single pseudo-3D view drawn at 30°
                axes, showing three faces of the object simultaneously without perspective
                foreshortening. Used for assembly drawings, equipment-mount drawings,
                circuit-board layouts and any time you need to communicate the depth of an object
                in one picture rather than three.
              </li>
            </ul>
            <p>
              <strong>BS 8888</strong> is the UK / European standard for technical product
              documentation — it specifies how engineering drawings (orthographic, isometric and
              everything between) are produced, dimensioned, tolerated and presented. BS 8888
              references the underlying ISO standards (ISO 128 for general drawing principles,
              ISO 5455 for scales, ISO 5456 for projection methods) so that a drawing produced in
              the UK can be read anywhere that follows the same family. As an apprentice you don't
              need to read BS 8888 cover-to-cover — you do need to know it exists and that it's
              the standard your designer's drawings are claiming to follow.
            </p>
            <p>
              Practical takeaway:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Building / floor-plan drawings → orthographic (first-angle in the UK), usually
                plan + elevations.
              </li>
              <li>
                Equipment / panel / containment assembly drawings → isometric (or exploded
                isometric for assemblies).
              </li>
              <li>
                Look at the title block for the projection symbol and the standard cited
                (typically 'Drawn to BS 8888' or 'ISO 128 / ISO 5456'). If neither is shown, the
                drawing is informal — treat it with the same caution as a drawing with a
                home-made symbol set.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id="m3-s2-sub2-projection-check"
            question="A building floor plan shows the layout from directly above and is drawn flat with no 3D effect. Which projection convention is this, and what's the UK default angle?"
            options={[
              'Isometric projection — UK default is 30°',
              'Orthographic projection — UK default is first-angle',
              'Perspective projection — UK default is two-point',
              "It doesn't matter, projections are interchangeable",
            ]}
            correctIndex={1}
            explanation="Floor plans are orthographic (flat 2D view from above). The UK / European convention is first-angle projection — confirmed by the truncated-cone symbol in the title block. US drawings use third-angle projection, which can throw apprentices working from US-origin equipment drawings."
          />

          <SectionRule />

          <ContentEyebrow>Layout / floor plans — where things physically GO</ContentEyebrow>

          <ConceptBlock
            title="Layout drawings: position, not connection"
            plainEnglish="Drawn on a floor plan, to scale. Shows where every device sits in the building."
            onSite="The drawing you measure off when you're first-fixing. The layout tells you 'socket here, downlight there', the wiring diagram tells you HOW they're connected."
          >
            <p>
              A layout drawing (or floor plan) is an architect-style plan view of the building with
              the electrical positions marked using BS EN 60617 symbols. It's drawn to scale
              (typically 1:50 for individual rooms or 1:100 for whole floors — see Sub 4) and
              includes a key explaining each symbol used.
            </p>
            <p>
              What you'll see on a typical electrical layout:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Switch positions, with their type marked (1-way, 2-way, dimmer, fan isolator).
              </li>
              <li>
                Socket-outlets — single, twin, switched, USB, FCU.
              </li>
              <li>
                Lighting positions — pendants, downlighters, emergency, battens.
              </li>
              <li>
                Special positions — cooker outlet, shower switch, EV charge point, smoke alarms.
              </li>
              <li>
                Sometimes circuit references (e.g. all sockets on the kitchen wall labelled 'Cct
                3') tying back to the schedule of circuits on the board.
              </li>
            </ul>
            <p>
              What it does NOT show: cable routes, conductor sizes, terminal numbers. For those you
              go to the wiring diagram or the schedule of circuits.
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

          <ContentEyebrow>As-built drawings — the record of what's actually there</ContentEyebrow>

          <ConceptBlock
            title="As-built drawings: the truth, not the plan"
            plainEnglish="The drawing the project HANDS OVER as a record of what was actually installed."
            onSite="The maintenance electrician in five years' time will be working from this. If it's wrong, they're working blind — and that's how electric shocks happen."
          >
            <p>
              An as-built (sometimes called 'as-installed' or 'record drawing') is the final
              version of every drawing in the pack, updated to reflect the installation as it
              actually exists at the end of the job. It captures every site variation: the sub-main
              that got rerouted around an unexpected steel beam, the socket position that moved
              200 mm to clear a kitchen unit, the upgrade from a single to a twin RCBO that the
              client requested mid-job.
            </p>
            <p>
              Process is usually:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                During the install, all changes are 'red-lined' (marked in red pen) on the working
                drawing as they happen.
              </li>
              <li>
                At completion, the red-line drawings are formally redrawn into clean as-built
                drawings (often by the design office, sometimes by the contractor's CAD tech).
              </li>
              <li>
                The as-built pack is part of the handover documentation, alongside the
                certificates, O&M manuals, test results and warranty information.
              </li>
            </ul>
            <p>
              On any decent commercial or industrial job, no as-built means no handover, which
              means no payment release. They're not optional.
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

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Trying to wire from a schematic instead of a wiring diagram"
            whatHappens={
              <>
                Apprentice gets handed a star-delta motor starter schematic. It shows the
                contactors, the timer and the overload in their logical positions for understanding
                the sequence. Apprentice tries to wire the actual panel from the schematic, gets
                confused because the physical terminal numbers aren't shown, and either guesses
                wrong or has to stop and ask. Worst case they wire the timer contacts to the wrong
                contactor coil and the motor doesn't transition.
              </>
            }
            doInstead={
              <>
                Use the schematic to UNDERSTAND the circuit's function, then switch to the wiring
                diagram to actually do the wiring. Most decent control gear comes with both — read
                the schematic first to get the picture, then follow the wiring diagram terminal by
                terminal.
              </>
            }
          />

          <CommonMistake
            title="Confusing a block diagram for a schematic"
            whatHappens={
              <>
                Apprentice asked to fault-find an issue on a fire alarm loop opens up the drawing
                pack and looks at the system block diagram (panel + four loops in boxes with
                arrows). They expect to see call points and sounders individually but they're not
                there — the apprentice concludes the drawing pack is incomplete and gives up. The
                detailed loop schematic is two drawings further on in the pack.
              </>
            }
            doInstead={
              <>
                Recognise that a block diagram is a deliberate abstraction — it's the system map,
                not the wiring detail. If you need the wiring detail, flip to the next drawing in
                the pack (or look in the index for 'loop wiring' / 'panel termination' etc).
              </>
            }
          />

          <Scenario
            title="The drawing pack with no as-built"
            situation={
              <>
                You're a year-two apprentice sent to add a new 32 A radial circuit to a small
                workshop. The customer hands you what looks like the original installation drawings
                from when the unit was built ten years ago. Walking the install you can see that
                somebody has added several circuits since, none of which appear on the drawings.
                The board's schedule of circuits is also out of date.
              </>
            }
            whatToDo={
              <>
                Stop and tell your supervisor BEFORE energising or modifying anything. Without an
                accurate as-built (or at minimum an accurate schedule of circuits), you can't be
                sure what's really on which way, what's downstream of what, or whether your new
                cable run will pierce something live. The right move is to do a partial trace,
                update the board schedule, and only then proceed.
              </>
            }
            whyItMatters={
              <>
                Working from out-of-date drawings is one of the classic causes of unexpected
                contact with live conductors. The original drawing said this stud wall was empty —
                but somebody added a sub-main through it eight years ago and never updated the
                drawing. Drill bit meets cable, circuit trips, you survive (hopefully). The
                as-built exists to prevent exactly that.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Six drawing types: block (system view), schematic (function), wiring (every conductor), circuit (function-with-components), layout (physical positions), as-built (final record).',
              "Schematic = drawn for understanding. Wiring diagram = drawn for wiring. Don't try to wire from a schematic.",
              'BS EN 60617 (now maintained as IEC 60617) replaced BS 3939 as the standard symbol set. Reg 514.9.2 (A4:2026) requires diagrams to comply.',
              'Layout drawings show position to scale; they do NOT show how things are wired.',
              'As-built drawings are the record of what was actually installed and are the basis for all future maintenance work.',
              "Red-lining (marking changes in red on the working drawing) is the conventional way to capture site variations as they happen.",
            ]}
          />

          <Quiz title="Drawing types — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section2/2-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Sources of technical information
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section2/2-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                BS EN 60617 drawing symbols
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
