/**
 * Ported from the English course, combining:
 *   level2/module3/section2/Sub2.tsx
 *   level2/module4/section3/Sub2.tsx
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

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'drawings-which-type-check',
    question:
      'Your supervisor hands you a drawing showing the consumer unit feeding three sub-mains, each going to a separate distribution board, with a battery backup off the second DB. No conductor sizes, no terminations — just boxes and arrows. What kind of drawing is it?',
    options: ['Block diagram', 'Wiring diagram', 'Schematic diagram', 'Layout drawing'],
    correctIndex: 0,
    explanation:
      "Block diagram. Boxes for each major part of the system, arrows showing how power/signal flows between them, no detail on individual conductors. It's the 30,000-foot view — the first drawing you look at to understand what the system IS before you read anything else.",
  },
  {
    id: 'drawings-circuit-vs-wiring-check',
    question: 'A circuit diagram and a wiring diagram differ in one fundamental way. Which is it?',
    options: [
      "Circuit diagrams show the wiring colours; wiring diagrams show the cable manufacturer's part numbers",
      'Circuit diagrams show function (the logic of how it works); wiring diagrams show physical connection (every conductor between every terminal)',
      'Circuit diagrams are always to scale; wiring diagrams are never drawn to scale',
      'Circuit diagrams are used only for three-phase work; wiring diagrams only for single-phase',
    ],
    correctIndex: 1,
    explanation:
      'Function vs physical. A circuit diagram shows the logic — how the components interact electrically, drawn for clarity (e.g. a 2-way lighting circuit with the strappers crossed for understanding). A wiring diagram shows the actual physical wiring — every cable, every terminal, the way the install is really laid out. You read circuit diagrams to understand; you wire from wiring diagrams.',
  },
  {
    id: 'drawings-asbuilt-check',
    question: "What's the difference between an 'as-designed' drawing and an 'as-built' drawing?",
    options: [
      'Before any testing — Reg 642 places visual inspection ahead of Reg 643 testing in Part 6 sequence.',
      "A don't/do statement that addresses concerns about your intentions and confirms your actual purpose",
      'As-designed = before the job. As-built = updated to show what was actually installed (including any deviations)',
      'How well and how often the contractor communicates progress, problems and costs — the technical work is assumed to be competent',
    ],
    correctIndex: 2,
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
      'An electrician on site is fault-finding a faulty contactor and needs to know which terminals connect to which control wires. Which drawing should they reach for?',
    options: ['Layout drawing', 'Block diagram', 'Wiring diagram', 'Schematic diagram'],
    correctAnswer: 2,
    explanation:
      "Wiring diagram. It maps every conductor to every termination — exactly what you need when you've got a meter on the panel and you're trying to trace a fault. The schematic shows the logic; the wiring diagram shows the physical reality.",
  },
  {
    id: 3,
    question:
      'A floor plan drawing shows a kitchen with sockets marked at six positions on the wall. The drawing has a scale of 1:50 and a key in the bottom corner. What kind of drawing is this?',
    options: [
      'Underestimating requirements',
      'Sustainable Drainage Systems',
      'All electronic components',
      'Layout drawing (floor plan)',
    ],
    correctAnswer: 3,
    explanation:
      "Layout drawing (floor plan). It shows where things go physically in the building, drawn to scale. It does NOT show how they're wired — that's the wiring diagram's job. A layout shows position; a wiring diagram shows electrical connection.",
  },
  {
    id: 4,
    question:
      'BS 3939 used to be the British Standard for electrical drawing symbols. What replaced it?',
    options: [
      'BS EN 60617 (now superseded by IEC 60617)',
      'From day one, applied equally to everyone',
      '1/R_total = 1/R1 + 1/R2 + 1/R3',
      'Starting current which can be 6-8 times full load',
    ],
    correctAnswer: 0,
    explanation:
      "BS 3939 was withdrawn in favour of BS EN 60617, the European-aligned graphical symbol set. BS EN 60617 has been withdrawn as a printed standard; the symbols are now maintained centrally as the IEC 60617 online database, which BSI references — and the 60617 number is what you'll hear quoted on UK sites and in the C&G syllabus.",
  },
  {
    id: 5,
    question: 'Which of these statements about as-built drawings is TRUE?',
    options: [
      'Matching task types to your natural energy levels throughout the day',
      'They reflect the final installed state including any site variations and are part of the handover',
      'Batching similar tasks reduces attention residue by minimising context switches',
      'Fire-rated circuits, high-temperature environments and applications requiring exceptional mechanical protection',
    ],
    correctAnswer: 1,
    explanation:
      "As-builts are the record of what was actually installed and are part of the handover pack on any job of substance. They're how the next electrician in five years' time understands what's behind the wall.",
  },
  {
    id: 6,
    question:
      'A drawing shows just the general principle of how a fire alarm system is laid out on a single floor — call points, sounders and the panel — without any specific cable types or terminal numbers. The intent is for the apprentice to understand the system, not wire it. What type of drawing is this MOST LIKELY?',
    options: [
      'Wiring diagram (every conductor shown)',
      'Block diagram (boxes and flows)',
      'Schematic diagram (function-focused)',
      "Manufacturer's installation instruction",
    ],
    correctAnswer: 2,
    explanation:
      "Schematic. It's showing the system's function and layout for understanding, not the every-conductor detail of a wiring diagram and not the boxes-and-arrows abstraction of a block diagram. Schematics sit between the two.",
  },
  {
    id: 7,
    question:
      'A new regulation in BS 7671:2018+A4:2026 (514.9.2) clarified an expectation about drawings and charts on installations. What does it require?',
    options: [
      'There is no set minimum — readings should be taken to confirm the atmosphere is safe',
      'Redundancy — two independent channels monitor the E-stop, detecting single faults',
      'Below the front view, because you look down onto the object and the view falls below',
      'Diagrams, charts and information notices shall comply with the applicable standards specified',
    ],
    correctAnswer: 3,
    explanation:
      "514.9.2 (new in A4:2026) requires diagrams, charts and notices to comply with the applicable standards — symbols per IEC 60617, notices per BS EN 60073/60446 etc. It nailed down what 'a proper drawing' means.",
  },
  {
    id: 8,
    question:
      "When a drawing is updated DURING a job to show a routing change (a sub-main is rerouted around a beam that wasn't on the original drawing), what's the conventional way of marking it?",
    options: [
      'Red-line the change on the working drawing — that becomes the basis for the as-built',
      'Dangerous high voltages develop that can damage insulation and harm personnel',
      'Dust-tight and protected against high-pressure, high-temperature wash-down',
      "It's vague and may cause misunderstandings or incorrect action",
    ],
    correctAnswer: 0,
    explanation:
      'Red-lining (literally marking the change in red pen on the working drawing) is the traditional convention. The red-lined drawing then gets formally updated into the as-built before handover. The principle is that nothing happens on site without leaving a record.',
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: 'How do I tell at a glance whether a drawing is a schematic or a wiring diagram?',
    answer:
      "Schematics look TIDY — components arranged for clarity, wires running in clean horizontal/vertical lines, often without colour codes. Wiring diagrams look MESSY by comparison — every conductor with its colour, terminal numbers everywhere, components drawn roughly where they actually sit. Schematic = readable; wiring diagram = installable. If you can follow the logic easily it's probably a schematic.",
  },
  {
    question: 'Do I really need block diagrams? They look so basic.',
    answer:
      "They're basic on purpose. A block diagram is the first thing you look at on an unfamiliar system to understand what the system IS — power source, distribution, sub-systems, loads. Without it you'd dive straight into a 30-page wiring pack with no map. The block diagram is the map.",
  },
  {
    question: "What's a single-line diagram (SLD)? It wasn't on the syllabus list.",
    answer:
      "It's a sub-type of block/schematic that's almost universal on commercial and industrial boards. It shows the entire distribution system as single lines (even though it's three-phase or split-phase), with switchgear, protective devices, ratings and feeder destinations marked. You'll meet it constantly once you're on commercial work — basically the 'what's where on the board' overview.",
  },
  {
    question:
      'Why do circuit diagrams sometimes look weird — strappers crossed, components in odd positions?',
    answer:
      "Because they're drawn for FUNCTION, not physical reality. A 2-way lighting circuit drawn 'properly' with the strappers crossed shows the switch operation immediately — you can see exactly which path is live in each switch position. Drawn the way it's actually wired (strappers parallel) the function is much harder to follow.",
  },
  {
    question: 'Do as-built drawings really get used after handover?',
    answer:
      "Absolutely — they're the only record of what's actually behind the wall. When a future electrician comes to add a circuit, fault-find or do a periodic, the as-built is what they'll be working from. A bad as-built (or no as-built) means future work is guesswork and dangerous. That's why handover packs without as-builts get rejected on serious jobs.",
  },
  {
    question:
      "What's the difference between an architectural drawing with circuits marked and a proper electrical layout?",
    answer:
      "Architects' drawings show the building. Electrical layouts (often produced by overlaying onto the architect's drawing) show electrical positions and runs. They share a backdrop but the layout is the electrician's responsibility. Don't try to wire from the architect's plan alone — it won't have circuit references, cable routes or device-specific information.",
  },
];

const checks2 = [
  {
    id: 'ffl-vs-floor',
    question:
      'A drawing shows socket centres at 450 mm. The screed is not in yet. What height do you mark from?',
    options: [
      'From the bare concrete slab you are standing on — it is the only fixed surface available.',
      'From the underside of the joists overhead, measuring downwards by tape.',
      'From the FFL (floor finish level) — the top of the finished floor as it will be when the customer walks in.',
      'From the skirting board line, since sockets traditionally sit just above the skirting.',
    ],
    correctIndex: 2,
    explanation:
      'Setting out always references the FFL — the height the customer will perceive once the floor is laid. Mark from the slab and you end up with sockets that look low after the screed and finish go in. Take the FFL from the architect’s drawing or set it out with the principal contractor before you mark anything.',
  },
  {
    id: 'scale-reading',
    question:
      'A 1:50 drawing shows a wall 80 mm long on paper. What is the real-world wall length?',
    options: ['4.0 m', '8.0 m', '0.16 m', '0.8 m'],
    correctIndex: 0,
    explanation:
      '1:50 means 1 mm on paper = 50 mm in real life. 80 × 50 = 4000 mm = 4.0 m. Always use the scale bar on the drawing as a sense-check; scales get overridden when drawings are reduced for printing, and the dimensions on the paper become unreliable. The numbered dimensions on the drawing always trump scaled measurements.',
  },
  {
    id: 'marking-media',
    question:
      'You need to mark a chalk line for back-box centres on a smooth, recently plastered wall. What is the right marking medium?',
    options: [
      'Chinagraph pencil — it bonds to the plaster.',
      'Pencil (HB or 2B), or low-tack masking tape with a Sharpie line on it.',
      'Sharpie marker — it is permanent and visible.',
      'Centre punch directly into the plaster.',
    ],
    correctIndex: 1,
    explanation:
      'On smooth plaster you use pencil (light, easy to remove) or masking tape with a marker (lifts off cleanly without ghosting). Sharpie direct on plaster bleeds through paint and the painter will hate you. Centre punch into plaster cracks the surface. Different substrate, different medium — that is the whole skill.',
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question:
      'The standard mounting height for a domestic light switch (centre of switch) is approximately:',
    options: ['450 mm', '1200 mm', '900 mm', '1500 mm'],
    correctAnswer: 1,
    explanation:
      'Approximately 1200 mm to centre is the long-standing UK domestic standard for light switches, set out from FFL. Approved Document M (accessible buildings) often specifies 900-1200 mm to suit reach from a wheelchair, with 1200 mm being the common compromise. New build always references FFL, never the slab.',
  },
  {
    id: 2,
    question:
      'Approved Document M (accessibility) typically requires socket centres in new dwellings to be set at:',
    options: [
      'At a fixed 150 mm above FFL, the traditional "skirting plus 50 mm" height.',
      'At 300 mm above FFL throughout, to clear most skirting boards.',
      'Between 450 mm and 1200 mm above FFL — the "reach range".',
      'At 1000 mm above FFL, level with the standard 1 m datum line.',
    ],
    correctAnswer: 2,
    explanation:
      'Approved Doc M (volume 1, dwellings) specifies the accessible reach range of 450-1200 mm from FFL for sockets, switches and other controls. Common practice is 450 mm centres for sockets in habitable rooms (replacing the older 150 mm centres). Above worktops you mount roughly 150 mm above the worktop surface, which usually lands above the 1200 mm upper limit and is acceptable as a worktop-fitted accessory.',
  },
  {
    id: 3,
    question: 'A datum line is best described as:',
    options: [
      'The line on the floor marking where the consumer unit tails enter the building.',
      'The horizontal centre line of the consumer unit, used to align the meter tails.',
      'The maximum height to which any accessory may be mounted in a habitable room.',
      'A reference line on the wall at a known height (typically 1 m above FFL) from which other heights are measured.',
    ],
    correctAnswer: 3,
    explanation:
      'A datum is your reference line — set at a known height above FFL (1 m is a common choice because it is easy to measure up or down from). All other heights on the wall are then dimensioned from the datum. Setting one good datum line per room lets you mark every accessory accurately without re-measuring from the floor each time.',
  },
  {
    id: 4,
    question:
      'For a long horizontal run (>5 m) of accessory centres at the same height, the most accurate setting-out tool is:',
    options: [
      'A laser level (rotary or cross-line) projected onto the wall.',
      'A chalk line snapped between two pre-marked end points.',
      'A spirit level — repeatedly leap-frogged.',
      'A tape measure off the floor at each socket position.',
    ],
    correctAnswer: 0,
    explanation:
      'Over more than ~5 m the cumulative error in leap-frogging a spirit level becomes significant. A laser level projects a single horizontal reference across the whole wall in one operation, so every socket is set to the same plane. Chalk line is acceptable as a backup where two end points have already been precisely set out.',
  },
  {
    id: 5,
    question:
      'Why mark with chinagraph (wax pencil) on concrete or block, rather than a regular HB pencil?',
    options: [
      'Chinagraph leaves a finer, more precise line than HB pencil, which matters for accurate setting out.',
      'HB pencil leaves a graphite line that barely shows on rough textured surfaces, whereas chinagraph is wax-bound and stays visible on dust, oil and rough mineral surfaces.',
      'HB pencil is conductive and could leave a graphite trace that compromises insulation resistance.',
      'Chinagraph is the only marking medium permitted by BS 7671 for setting out on masonry.',
    ],
    correctAnswer: 1,
    explanation:
      'Chinagraph (also called china marker / grease pencil) is wax-based and writes on dusty, oily, smooth or porous surfaces where graphite gives nothing. On concrete and rough block you need that visibility. On smooth plaster use HB pencil or masking tape — chinagraph is a nightmare for the painter to cover.',
  },
  {
    id: 6,
    question:
      'Tolerances on accessory positioning. The drawing says 450 mm centres. Acceptable tolerance for first fix:',
    options: [
      '±50 mm typically; first-fix positions are rough and adjusted again at second fix.',
      '±1 mm typically; setting out must be exact or the faceplate will not cover the box.',
      '±10 mm typically; tighter for visible runs of accessories where misalignment shows.',
      'No tolerance applies — every centre must land exactly on the dimensioned figure.',
    ],
    correctAnswer: 2,
    explanation:
      '±10 mm is the common rule of thumb for first-fix setting out — that is what you can achieve consistently with chalk-line and pencil. Where accessories run in a visible bank (4 sockets across one wall, 6 grid switches in a bedroom), tolerance tightens because the human eye spots a 5 mm misalignment in a row of identical plates. Spec or architect drawings sometimes call out tighter tolerances for fit-out scheme reasons.',
  },
  {
    id: 7,
    question:
      'A scale rule is graduated for both 1:50 and 1:100. You read a wall on the 1:100 scale and get 25 mm. What is the real-world dimension?',
    options: ['0.25 m', '1.25 m', '25 m', '2.5 m'],
    correctAnswer: 3,
    explanation:
      '1:100 means 1 mm = 100 mm. 25 × 100 = 2500 mm = 2.5 m. Read the scale bar on the drawing first to confirm what scale is in use — printed drawings often get reduced from A1 to A3 and the original scale becomes wrong; the printed dimensions always take precedence over scaled values for that reason.',
  },
  {
    id: 8,
    question:
      'You need to mark out a vertical line for a switch drop on a stud wall. The wall has a slight bow in it. Best tool:',
    options: [
      'Plumb bob (gravity-true vertical) or a self-levelling laser plumb.',
      'A 600 mm spirit level held flat against the wall surface and drawn down.',
      'A chalk line snapped vertically between floor and ceiling.',
      'A tape measure run from the nearest corner to keep the line parallel to the wall.',
    ],
    correctAnswer: 0,
    explanation:
      'A plumb bob is gravity-true and ignores any bow or twist in the wall — it gives you the true vertical regardless of what the surface is doing. Self-levelling laser plumbs do the same job faster on a long drop. A spirit level held against a bowed surface measures the surface, not gravity. The switch drop must be true vertical or the cable will not sit in the chase straight.',
  },
];

const faqs2 = [
  {
    question: 'What height do I mount sockets — 150 mm or 450 mm?',
    answer:
      'For new build the answer is 450 mm minimum (Approved Document M — accessibility, dwellings). 150 mm has been the legacy "skirting plus 50 mm" standard for decades and you still see it on rewires of older properties where the customer specifically wants it. Rule of thumb: new dwelling = 450 mm minimum to centre; period property rewire matching existing = whatever the customer signs off, usually 150-300 mm. Above worktops it is roughly 150 mm above the worktop surface.',
  },
  {
    question: 'What is FFL and why does it matter so much?',
    answer:
      'FFL is "Floor Finish Level" — the height of the finished floor as it will exist when the customer walks in, including screed, underlay, carpet, tile, vinyl, whatever the finish is. On site you may be standing on raw concrete slab; FFL might be 80 mm higher once the screed and tiles go in. Setting out from the slab gives sockets that look 80 mm low after fit-out. The architect’s general arrangement drawing always quotes FFL — that is the number you mark from.',
  },
  {
    question: 'Should I use a laser level for everything?',
    answer:
      'No — over-tooling a small job kills momentum. Laser is the right tool for long horizontal runs (>5 m), large rooms with multiple banks of accessories, and any visible commercial fit-out where alignment is part of the spec. For a single room of domestic sockets, a spirit level and a chalk line is faster and just as accurate. Use the right tool for the scale of the job.',
  },
  {
    question: 'How do I deal with a wall that is not square or not plumb?',
    answer:
      'Two strategies. (1) Set out from a single agreed datum on each wall — pick a corner that the architect has dimensioned from, set the datum line off it, mark everything from that datum, even if the wall ends up bowed. The accessories are then aligned to each other, which is what the eye sees. (2) For very poor walls, build a temporary timber batten true and plumb to the architect’s grid, mark off the batten, then remove. Never try to make a bowed wall’s accessories follow the bow — they look wrong.',
  },
  {
    question: 'Do I have to mark out fire alarm devices to a specific height?',
    answer:
      'Yes — BS 5839-6 (domestic and similar fire detection) gives detector positioning rules. Smoke detectors at high level (300 mm minimum from any wall, on the ceiling, or on the wall ≥150 mm down from the ceiling). Heat detectors in kitchens at high level. Manual call points at 1400 mm to centre, on the escape route, no further than the manufacturer’s reset distance from the panel. The drawing pack should give you the exact positions; you set them out from FFL or from the ceiling depending on the device type.',
  },
  {
    question: 'Why are tolerances tighter on a bank of accessories?',
    answer:
      'The eye spots misalignment between identical objects much more readily than misalignment of one object against the wall. A row of 6 identical white socket plates 5 mm out of line on the bottom edge looks instantly wrong; the same 5 mm error on a single socket nobody would notice. For visible banks (kitchen sockets, grid-switch panels, intercom plates, AV outlets) tighten your tolerance to ±3 mm and use a long laser line or a temporary batten as the reference for every box in the bank.',
  },
];

export default function Lesson304E_3_3() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Six families of drawing every electrician needs to read — block, schematic, wiring,
        circuit, layout/floor plan and as-built. Mix them up and you'll wire the wrong thing.
      </p>

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
          ability to flick to the right one in ten seconds is what separates an apprentice who's
          been around six months from one who's been around two years. Each type is optimised for
          a different question.
        </p>
        <p>
          Want to understand the SYSTEM? Block or schematic. Want to WIRE it up? Circuit or
          wiring. Want to know WHERE things go physically? Layout / floor plan. Want to know
          what's ACTUALLY THERE behind the plaster? As-built. Six tools, six jobs.
        </p>
        <p>
          Counter-intuitive bit: schematics LOOK simpler — that's the trap. A schematic strips the
          picture down to the function so you can see what the circuit DOES, not how it's wired.
          The wiring diagram looks chaotic by comparison, but it's the only one that tells you
          which terminal goes where. Reach for the simple-looking schematic when you should have
          grabbed the wiring diagram and you'll be staring at it for an hour wondering why the
          terminals don't match.
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
          labelled box, and arrows show how power, signal or data flows between them. There's no
          attempt to show individual conductors, terminations, ratings or routing — just what's
          there and how it connects at the top level.
        </p>
        <p>Typical use cases:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            A standby generator system: 'mains supply → ATS → main DB; generator → ATS → main DB;
            main DB → essential loads; main DB → non-essential loads'.
          </li>
          <li>
            A fire alarm system overview: 'panel → loop 1 (call points + sounders for floor 1) →
            loop 2 (floor 2) → BMS interface'.
          </li>
          <li>
            A solar PV install at top level: 'roof array → DC isolator → inverter → AC isolator →
            consumer unit; battery → hybrid inverter → CU'.
          </li>
        </ul>
        <p>Read it once, get the mental picture, then move to the detailed drawings.</p>
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
          control, left-to-right for power flow), and the conductors are drawn as straight lines,
          often with crossings, to keep the function easy to follow.
        </p>
        <p>Typical use cases:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Motor control circuits — start/stop logic, hold-on contacts, overload reset.</li>
          <li>
            Lighting circuits drawn for teaching or fault-finding (2-way, intermediate, stairwell
            with multiple switches).
          </li>
          <li>
            Control panels — the 'how the logic works' drawing that sits behind the wiring
            diagram.
          </li>
        </ul>
        <p>
          Schematics are what you read to UNDERSTAND. They're rarely what you wire from directly —
          for that, you need the wiring diagram.
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
        <p>Typical use cases:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Control panel wiring drawings — used by the panel-builder to wire it and by the
            installer/maintainer to fault-find.
          </li>
          <li>Equipment internal wiring (e.g. inside a packaged AHU or a process skid).</li>
          <li>
            Domestic accessory connection diagrams supplied with smart switches, dimmers, two-gang
            plates etc.
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
          The terms 'circuit diagram' and 'schematic diagram' often overlap. In strict UK usage, a
          circuit diagram emphasises the components and how they interact electrically (often with
          circuit references like CCT 1, CCT 2 marked); a schematic is broader and may include
          control logic, sequencing and timing.
        </p>
        <p>
          Both use IEC 60617 graphical symbols (the standard introduced earlier) — the symbols
          replaced the older BS 3939 set. Both are drawn for function, not for physical wiring.
        </p>
        <p>Typical use cases:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Domestic final circuits (radials, rings, lighting) drawn to show how they work.</li>
          <li>
            Educational drawings — what you see in textbooks and what you'll see on the C&G exam
            paper.
          </li>
          <li>Single-circuit explanations supplied with manufacturer literature.</li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671 — Regulation 514.9.2 (new in A4:2026)"
        clause="514.9.2 — All diagrams, charts, and information or instruction notices used in electrical installations shall comply with the applicable standards specified."
        meaning={
          <>
            The regulatory anchor for the whole topic of drawings and symbols. The 'applicable
            standards' for graphical symbols are now the IEC 60617 online database (the modern
            continuation of BS EN 60617, which itself replaced BS 3939). Drawings using home-made
            symbols, mixed conventions or out-of-date sets technically don't comply with this
            regulation.
          </>
        }
        cite="Reference: BS 7671:2018+A4:2026 Part 5, Section 514.9.2 (paraphrased)"
      />

      <RegsCallout
        source="BS 7671 — Regulation 132.13 (Documentation)"
        clause="132.13 — Documentation for the electrical installation shall be provided so that users, operators and persons subsequently working on the installation can identify circuits, isolation points, protective devices, the means of compliance with the regulations and any specific risks. Sub-clauses cover 132.13.1 (Diagrams) and 132.13.2 (Routine maintenance)."
        meaning={
          <>
            The regulation that makes drawings, schedules, charts and labels a regulatory
            requirement (not a paperwork nicety). Block, schematic, wiring, layout and as-built
            drawings are how you discharge 132.13 in practice. Hand over a job without a usable
            drawing pack and you're in breach — the next electrician on the install can't identify
            the circuits, isolation points or specific risks the regulation says they should be
            able to.
          </>
        }
        cite="Paraphrased — see BS 7671:2018+A4:2026 Regulation 132.13 (Diagrams and documentation)."
      />

      <RegsCallout
        source="BS 7671 — Regulation 511.1 (compliance with standards)"
        clause="511.1 — Every item of equipment shall comply with the relevant requirements of the applicable British Standard or Harmonized Standard appropriate to the intended use of the equipment, or of an equivalent standard."
        meaning={
          <>
            The flip-side of 514.9.2. Where 514.9.2 governs the drawings themselves, 511.1 governs
            everything ON the drawings — the equipment specified must comply with the applicable
            BS / BS EN. So a designer can't put 'generic socket-outlet' on a layout; they have to
            specify (or their spec has to imply) compliance with BS 1363-2 for a socket, BS EN
            60898 for an MCB, BS EN 61009 for an RCBO. The drawing pack is read alongside 511.1.
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
            The two applicable standards for an electrical drawing are BS 8888 (how the drawing is
            structured — projection, scale, dimensioning, title block) and IEC 60617 (which
            symbols sit on it). A drawing that follows BS 8888 + IEC 60617 is what 514.9.2 is
            pointing at as compliant. A drawing that uses neither is informal — treat it with the
            same caution as a drawing with a home-made symbol set.
          </>
        }
        cite="Reference: BS 8888:2020 (Technical product documentation and specification); IEC 60617 graphical symbols database (paraphrased)"
      />

      <SectionRule />

      <ContentEyebrow>
        Projection conventions — orthographic vs isometric (BS 8888)
      </ContentEyebrow>

      <ConceptBlock
        title="Orthographic and isometric projection — and why BS 8888 underpins both"
        plainEnglish="Orthographic = flat 2D views (plan, front, side). Isometric = a single 3D-style view that shows three faces at once. Different jobs, different drawings."
        onSite="On a building you'll mostly see orthographic plans (plan + elevations). On a piece of equipment — a control-panel mount, a busbar chamber, a containment riser — you'll meet isometric views because they show the depth in a single picture."
      >
        <p>Two projection conventions cover almost every technical drawing you'll meet:</p>
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
            <strong>Isometric projection</strong> — a single pseudo-3D view drawn at 30° axes,
            showing three faces of the object simultaneously without perspective foreshortening.
            Used for assembly drawings, equipment-mount drawings, circuit-board layouts and any
            time you need to communicate the depth of an object in one picture rather than three.
          </li>
        </ul>
        <p>
          <strong>BS 8888</strong> is the UK / European standard for technical product
          documentation — it specifies how engineering drawings (orthographic, isometric and
          everything between) are produced, dimensioned, tolerated and presented. BS 8888
          references the underlying ISO standards (ISO 128 for general drawing principles, ISO
          5455 for scales, ISO 5456 for projection methods) so that a drawing produced in the UK
          can be read anywhere that follows the same family. As an apprentice you don't need to
          read BS 8888 cover-to-cover — you do need to know it exists and that it's the standard
          your designer's drawings are claiming to follow.
        </p>
        <p>Practical takeaway:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Building / floor-plan drawings → orthographic (first-angle in the UK), usually plan +
            elevations.
          </li>
          <li>
            Equipment / panel / containment assembly drawings → isometric (or exploded isometric
            for assemblies).
          </li>
          <li>
            Look at the title block for the projection symbol and the standard cited (typically
            'Drawn to BS 8888' or 'ISO 128 / ISO 5456'). If neither is shown, the drawing is
            informal — treat it with the same caution as a drawing with a home-made symbol set.
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
          the electrical positions marked using IEC 60617 symbols. It's drawn to scale (typically
          1:50 for individual rooms or 1:100 for whole floors) and includes a key
          explaining each symbol used.
        </p>
        <p>What you'll see on a typical electrical layout:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Switch positions, with their type marked (1-way, 2-way, dimmer, fan isolator).</li>
          <li>Socket-outlets — single, twin, switched, USB, FCU.</li>
          <li>Lighting positions — pendants, downlighters, emergency, battens.</li>
          <li>
            Special positions — cooker outlet, shower switch, EV charge point, smoke alarms.
          </li>
          <li>
            Sometimes circuit references (e.g. all sockets on the kitchen wall labelled 'Cct 3')
            tying back to the schedule of circuits on the board.
          </li>
        </ul>
        <p>
          What it does NOT show: cable routes, conductor sizes, terminal numbers. For those you go
          to the wiring diagram or the schedule of circuits.
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
          An as-built (sometimes called 'as-installed' or 'record drawing') is the final version
          of every drawing in the pack, updated to reflect the installation as it actually exists
          at the end of the job. It captures every site variation: the sub-main that got rerouted
          around an unexpected steel beam, the socket position that moved 200 mm to clear a
          kitchen unit, the upgrade from a single to a twin RCBO that the client requested
          mid-job.
        </p>
        <p>Process is usually:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            During the install, all changes are 'red-lined' (marked in red pen) on the working
            drawing as they happen.
          </li>
          <li>
            At completion, the red-line drawings are formally redrawn into clean as-built drawings
            (often by the design office, sometimes by the contractor's CAD tech).
          </li>
          <li>
            The as-built pack is part of the handover documentation, alongside the certificates,
            O&M manuals, test results and warranty information.
          </li>
        </ul>
        <p>
          On any decent commercial or industrial job, no as-built means no handover, which means
          no payment release. They're not optional.
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
            Apprentice gets handed a star-delta motor starter schematic. It shows the contactors,
            the timer and the overload in their logical positions for understanding the sequence.
            Apprentice tries to wire the actual panel from the schematic, gets confused because
            the physical terminal numbers aren't shown, and either guesses wrong or has to stop
            and ask. Worst case they wire the timer contacts to the wrong contactor coil and the
            motor doesn't transition.
          </>
        }
        doInstead={
          <>
            Use the schematic to UNDERSTAND the circuit's function, then switch to the wiring
            diagram to actually do the wiring. Most decent control gear comes with both — read the
            schematic first to get the picture, then follow the wiring diagram terminal by
            terminal.
          </>
        }
      />

      <CommonMistake
        title="Confusing a block diagram for a schematic"
        whatHappens={
          <>
            Apprentice asked to fault-find an issue on a fire alarm loop opens up the drawing pack
            and looks at the system block diagram (panel + four loops in boxes with arrows). They
            expect to see call points and sounders individually but they're not there — the
            apprentice concludes the drawing pack is incomplete and gives up. The detailed loop
            schematic is two drawings further on in the pack.
          </>
        }
        doInstead={
          <>
            Recognise that a block diagram is a deliberate abstraction — it's the system map, not
            the wiring detail. If you need the wiring detail, flip to the next drawing in the pack
            (or look in the index for 'loop wiring' / 'panel termination' etc).
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
            somebody has added several circuits since, none of which appear on the drawings. The
            board's schedule of circuits is also out of date.
          </>
        }
        whatToDo={
          <>
            Stop and tell your supervisor BEFORE energising or modifying anything. Without an
            accurate as-built (or at minimum an accurate schedule of circuits), you can't be sure
            what's really on which way, what's downstream of what, or whether your new cable run
            will pierce something live. The right move is to do a partial trace, update the board
            schedule, and only then proceed.
          </>
        }
        whyItMatters={
          <>
            Working from out-of-date drawings is one of the classic causes of unexpected contact
            with live conductors. The original drawing said this stud wall was empty — but
            somebody added a sub-main through it eight years ago and never updated the drawing.
            Drill bit meets cable, circuit trips, you survive (hopefully). The as-built exists to
            prevent exactly that.
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
          'Red-lining (marking changes in red on the working drawing) is the conventional way to capture site variations as they happen.',
        ]}
      />

      <Quiz title="Drawing types — knowledge check" questions={quizQuestions} />

      {/* ── Prev / next nav ─────────────────────────────────── */}

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Translating dimensions on the layout into chalk lines, datum points and centre marks on
        the actual wall. Datums, FFL, socket and switch heights, scale reading, tolerances, and
        the marking media that work on each substrate. Get the setting-out right and the install
        almost installs itself.
      </p>

      <TLDR
        points={[
          'All accessory heights reference FFL (floor finish level), not the slab. Mark from the wrong reference and the install looks low after fit-out.',
          'Set one datum line per wall (typically 1 m above FFL) and dimension everything else from it. One good datum saves 30 measurements off the floor.',
          'Marking media changes by substrate — pencil on smooth plaster, chinagraph on concrete/block, masking tape + Sharpie on finished surfaces, centre punch on metal.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Mark out dimensions on work areas from drawings.',
          'Set up a wall datum from FFL using a tape, spirit level or laser, and dimension all accessory heights from that single datum.',
          'Apply standard UK accessory heights (sockets 450 mm to centre per Approved Doc M; switches 1200 mm; fire alarm devices per BS 5839-6) to a typical room layout.',
          'Read 1:50, 1:100 and 1:200 scale drawings using a scale rule, with the printed dimensions taking precedence over scaled measurements.',
          'Choose the correct marking medium for each substrate — pencil, chinagraph, Sharpie on tape, or centre punch — without damaging the finish.',
          'Apply realistic tolerances (±10 mm typical, ±3 mm for visible banks of accessories) and verify alignment with a laser or string line before drilling.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Datums and FFL — the foundation of setting out</ContentEyebrow>

      <ConceptBlock
        title="Why every height on the drawing is FFL"
        plainEnglish="Every accessory height on a layout drawing is dimensioned from FFL (floor finish level) — the height the floor will be once it is fully laid. On site you might be standing on bare slab. Mark from the slab and your sockets end up 50-80 mm low after the floor goes in."
        onSite="The architect’s general arrangement drawing always shows FFL on every section. Get that number, transfer it to the wall as a horizontal mark, and that is your zero. Every socket, switch, junction box and fire alarm height comes off FFL."
      >
        <p>
          FFL is the surface the customer perceives — top of the carpet, top of the tile, top of
          the vinyl. Below FFL there might be acoustic underlay, screed, insulation, membrane,
          slab — possibly 80-120 mm of buildup in a domestic floor, more in commercial. None of
          that exists from the customer&rsquo;s point of view; what they see is a finished floor
          at FFL, and a socket centred 450 mm above it.
        </p>
        <p>
          On a job with a wet trade still to come (screed, tiling), set the FFL by marking it on
          every wall before the wet trade arrives. A pencil cross 1 m above FFL on every wall,
          dated and signed, becomes the permanent reference for every trade that follows.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The 1 m datum line — set once, mark everything from it"
        plainEnglish="The 1 m datum is a horizontal line marked on every wall at exactly 1 m above FFL. Once you have that line, every other height in the room is just an addition or subtraction from 1 m. You measure once, mark once, and reference everything from there."
        onSite="The 1 m datum is universal across UK construction — every other trade uses it too, so if it is already on the wall when you arrive, use it (after sense-checking with a tape from FFL). If not, set it for everyone."
      >
        <p>Standard offsets from a 1 m datum:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Sockets at 450 mm centre = 550 mm BELOW datum.</li>
          <li>Sockets above worktop (worktop ~900 mm) = 50 mm ABOVE datum.</li>
          <li>Light switches at 1200 mm = 200 mm ABOVE datum.</li>
          <li>
            Cooker switch at 1400 mm above worktop (~2300 mm from FFL) = 1300 mm above datum.
          </li>
          <li>Fire alarm manual call point at 1400 mm = 400 mm above datum.</li>
          <li>
            Smoke detector on ceiling = depends on ceiling height; reference from the ceiling, not
            the datum.
          </li>
        </ul>
        <p>
          The point of the datum is consistency — every accessory in the room references the same
          horizontal line, so a row of sockets is genuinely level even if the floor and ceiling
          are not.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Standard UK accessory heights</ContentEyebrow>

      <ConceptBlock
        title="The numbers you should know without looking them up"
        plainEnglish="UK domestic and light-commercial work has a standard set of accessory heights. They come from Approved Document M (accessibility) for new build, BS 5839-6 (fire detection), and decades of conventional practice for legacy work. Memorise them and you stop measuring twice."
        onSite="The figures below are typical defaults — the drawing pack always overrides them, and for accessibility-spec work the reach range of 450-1200 mm above FFL applies to all controls in habitable rooms."
      >
        <div className="space-y-2.5 sm:hidden">
          <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
              Socket — habitable room
            </div>
            <p className="text-[13px] text-white/85 mt-1">
              450 mm to centre, FFL (Approved Doc M new build). 150-300 mm common on rewires
              matching existing.
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
              Socket — above worktop
            </div>
            <p className="text-[13px] text-white/85 mt-1">
              ~150 mm above worktop surface (worktop typically 900 mm = socket centre ~1050 mm).
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
              Light switch
            </div>
            <p className="text-[13px] text-white/85 mt-1">
              1200 mm to centre, FFL (Approved Doc M reach range upper limit). 1350-1500 mm legacy
              common.
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
              Cooker switch / shower switch
            </div>
            <p className="text-[13px] text-white/85 mt-1">
              ~1400 mm above worktop, or 300 mm above ceiling for ceiling-pull shower. Drawing
              always specifies.
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
              Manual call point (fire)
            </div>
            <p className="text-[13px] text-white/85 mt-1">
              1400 mm to centre, on escape route. BS 5839-1 (commercial) and BS 5839-6 (domestic).
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
              Smoke / heat detector
            </div>
            <p className="text-[13px] text-white/85 mt-1">
              Ceiling-mounted, 300 mm minimum from any wall, away from corners. BS 5839-6.
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
              Bathroom shaver socket
            </div>
            <p className="text-[13px] text-white/85 mt-1">
              Above sink height, typically 1500 mm to centre. Outside zones 0/1, ideally outside
              zone 2.
            </p>
          </div>
        </div>
        <ul className="hidden sm:block space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Socket — habitable room</strong> — 450 mm to centre, FFL (Approved Doc M new
            build).
          </li>
          <li>
            <strong>Socket — above worktop</strong> — ~150 mm above worktop surface.
          </li>
          <li>
            <strong>Light switch</strong> — 1200 mm to centre, FFL (Approved Doc M reach range
            upper limit).
          </li>
          <li>
            <strong>Cooker switch / shower switch</strong> — ~1400 mm above worktop,
            drawing-specified.
          </li>
          <li>
            <strong>Manual call point (fire)</strong> — 1400 mm to centre, on escape route. BS
            5839-1/-6.
          </li>
          <li>
            <strong>Smoke / heat detector</strong> — Ceiling-mounted, 300 mm min from walls. BS
            5839-6.
          </li>
          <li>
            <strong>Bathroom shaver socket</strong> — ~1500 mm to centre, outside Zones 0/1.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Approved Document M (Access to and use of buildings) — Volume 1: dwellings (paraphrased)"
        clause="In every new dwelling, switches, sockets and other controls in habitable rooms shall be located in a 'reach range' between 450 mm and 1200 mm above finished floor level, so that they can be reached and operated by people in a wheelchair or with limited mobility."
        meaning={
          <>
            Approved Doc M is why the modern UK socket height moved from 150 mm to 450 mm. The
            450-1200 mm reach range applies to every control in habitable rooms — not just sockets
            and switches, but also TV outlets, intercom plates, thermostats and door entry.
            Above-worktop accessories are an accepted exception because worktop sockets follow the
            worktop, not the floor. The drawing pack should show all heights compliant with this
            range; if it does not, raise an RFI.
          </>
        }
        cite="Source: Approved Document M, Building Regulations 2010 (England), Volume 1 (dwellings) — see legislation.gov.uk for the full text."
      />

      <InlineCheck {...checks2[0]} />

      <SectionRule />

      <ContentEyebrow>Setting-out tools</ContentEyebrow>

      <ConceptBlock
        title="Spirit level, chalk line, plumb bob, laser — pick the right one"
        plainEnglish="The right tool depends on the distance and the accuracy needed. Short runs (<2 m) — spirit level. Long horizontal runs (>5 m) — laser level. Vertical drops on a bowed wall — plumb bob or laser plumb. Marking a row of centres on a wall — chalk line. The skill is not having every tool, it is knowing which one to use when."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Spirit level (600 mm or 1200 mm)</strong> — short horizontals up to about 2 m;
            quick checks2 on a single accessory. Cumulative error grows fast on leap-frogged
            measurements over longer runs.
          </li>
          <li>
            <strong>Chalk line (snap line)</strong> — long straight reference line between two
            pre-marked end points. Ideal for marking a row of socket centres on a long wall. Blue
            chalk on plaster wipes off; red is more permanent (used outdoors / on rough surfaces
            only).
          </li>
          <li>
            <strong>Plumb bob</strong> — true vertical reference, gravity-true, ignores any bow in
            the wall surface. Cheap, reliable, slow.
          </li>
          <li>
            <strong>Self-levelling cross-line laser</strong> — projects horizontal and vertical
            lines onto walls. Massive time-saver on commercial fit-outs and multi-room domestic.
            Worth investing in if you do this work weekly. Works best in shaded conditions; in
            bright sunlight you need the laser detector receiver.
          </li>
          <li>
            <strong>Rotary laser</strong> — horizontal line projected 360° at a fixed height. The
            right tool for setting one datum across a whole large room or floor.
          </li>
          <li>
            <strong>Tape measure</strong> — every job. 5 m for room work, 8 m for larger. Class II
            accuracy is fine for setting out; Class I if you are working to tight commissioning
            tolerances.
          </li>
          <li>
            <strong>Scale rule</strong> — six-sided rule with 1:20, 1:50, 1:100, 1:200, 1:500,
            1:1250 markings. Use the scale that matches the drawing.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Reading 1:50 vs 1:100 vs 1:200"
        plainEnglish="Scale tells you what 1 mm on the paper means in real life. 1:50 = 1 mm = 50 mm. 1:100 = 1 mm = 100 mm. 1:200 = 1 mm = 200 mm. Always read the scale bar on the drawing first to confirm what scale was actually printed."
        onSite="Drawings get reduced for printing all the time. An A1 drawing at 1:50 reduced to A3 becomes effectively 1:100 — but the scale notation often does not get updated. The scale bar on the drawing is the only reliable measurement reference; printed numerical dimensions always trump scaled measurements."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>1:20</strong> — detail drawings (a single socket position with dimensions).
          </li>
          <li>
            <strong>1:50</strong> — most domestic and small commercial floor plans.
          </li>
          <li>
            <strong>1:100</strong> — larger commercial floor plans, full house plans on a single
            sheet.
          </li>
          <li>
            <strong>1:200</strong> — site plans, multi-floor commercial.
          </li>
          <li>
            <strong>1:500 / 1:1250</strong> — site context drawings, planning drawings, services
            routing on a development scale.
          </li>
        </ul>
        <p>
          Printed dimensions on the drawing always override scaled measurements. If a wall is
          dimensioned "4500" on the drawing but scales to 4400, you build to 4500. Scaling is for
          sense-checking, not for setting out.
        </p>
      </ConceptBlock>

      <InlineCheck {...checks2[1]} />

      <SectionRule />

      <ContentEyebrow>Marking media — substrate-specific</ContentEyebrow>

      <ConceptBlock
        title="The right pencil for the right wall"
        plainEnglish="Different surfaces take different marking media. Smooth plaster takes pencil. Concrete takes chinagraph. Painted finish takes masking tape with a marker. Steel needs a centre punch. Get this wrong and you either cannot see your marks (HB on rough block) or you damage the finish (chinagraph on white painted plaster — bleeds through paint)."
        onSite="A roll of low-tack masking tape and a thick Sharpie is the most versatile combination — sticks to almost any surface, takes a clear bold line, lifts off without ghosting. For permanent marks where another trade needs to see them after first fix, chinagraph or pencil direct on the substrate."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Smooth plaster (skim coat, brand new)</strong> — HB or 2B pencil. Light,
            clear, easy to remove or paint over. Never Sharpie — it bleeds through emulsion and
            the painter has to seal-coat it.
          </li>
          <li>
            <strong>Painted plaster (existing rewire)</strong> — masking tape + Sharpie line on
            the tape. Lifts off cleanly without disturbing the existing finish. Pencil works on
            light colours; not visible on dark.
          </li>
          <li>
            <strong>Concrete, block, brick</strong> — chinagraph (wax pencil). Visible on rough
            mineral surfaces. Stays put through dust. Marker pen also works for bold marks;
            carpenter&rsquo;s pencil for fine.
          </li>
          <li>
            <strong>Plasterboard (unpainted)</strong> — pencil. Sharpie is permanent and will need
            scuff-sanding before painting.
          </li>
          <li>
            <strong>Timber (joists, studs)</strong> — pencil or carpenter&rsquo;s pencil for
            drilling reference. Centre punch where you want a hole started.
          </li>
          <li>
            <strong>Metal (steel conduit, trunking, back-boxes)</strong> — centre punch for hole
            positions; chinagraph for layout marks.
          </li>
          <li>
            <strong>Tile, glass, polished surface</strong> — masking tape + Sharpie on the tape.
            Never directly on the surface — risk of permanent staining or scratching the finish.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck {...checks2[2]} />

      <ConceptBlock
        title="Common marking-out errors and how to avoid them"
        plainEnglish="Most marking-out mistakes fall into a handful of repeating patterns. Knowing them ahead of time stops you from making them — every one of these has been the cause of a remedial visit on someone’s job."
        onSite="Review this list before you start marking on every new room. Five seconds of reflection can save you 30 minutes of pulling boxes out and re-cutting plaster."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Marking from the slab when the screed is still to come</strong> — socket
            centres land 50-80 mm low after fit-out. Always confirm FFL before marking.
          </li>
          <li>
            <strong>Trusting a printed scale on a reduced drawing</strong> — A1 → A3 printing
            changes the effective scale. Use the scale bar AND the printed dimensions; printed
            dimensions always win.
          </li>
          <li>
            <strong>Sharpie direct on plaster</strong> — bleeds through emulsion. The painter has
            to seal-coat over it. Use pencil or masking tape + Sharpie on the tape.
          </li>
          <li>
            <strong>Leap-frogging a 600 mm spirit level over a 5 m wall</strong> — cumulative
            error grows fast. Use a chalk line between two pre-marked end points, or a laser line
            for anything &gt;5 m.
          </li>
          <li>
            <strong>Ignoring the Approved Doc M reach range</strong> — sockets at 150 mm on a new
            build = non-compliance. New build = 450 mm minimum to centre, FFL.
          </li>
          <li>
            <strong>Setting out a row of accessories without a single datum</strong> — each box
            measured independently from the floor → cumulative error → bank of sockets visibly out
            of line. Set ONE datum per wall, dimension everything off it.
          </li>
          <li>
            <strong>Forgetting to verify before drilling</strong> — once the hole is cut, the
            position is locked. Run a long level or laser across the marked centres before the
            first drill bit goes in.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Tolerances and verification</ContentEyebrow>

      <ConceptBlock
        title="±10 mm is fine for hidden work; ±3 mm for visible banks"
        plainEnglish="Setting-out tolerance depends on whether the result will be visible. A back-box that is 7 mm out of position and gets covered by a faceplate is invisible. A row of six identical sockets where the bottom edges are 7 mm out of line catches the eye instantly. Tighten your tolerance for visible runs."
      >
        <p>Standard tolerances:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Single accessory in isolation</strong> — ±10 mm vertically and horizontally is
            the typical first-fix tolerance. The faceplate covers the box and small misalignment
            does not show.
          </li>
          <li>
            <strong>Bank of identical accessories on one wall</strong> — ±3 mm. The eye spots
            horizontal misalignment in a row much more readily than position error against the
            wall.
          </li>
          <li>
            <strong>Accessories aligned to architectural features</strong> (centred on a window,
            centred between two cabinets) — ±5 mm. The architect or interior designer set those
            positions for a reason and the tolerance follows the visual intent.
          </li>
          <li>
            <strong>Surface-mounted accessories on visible runs</strong> (dado trunking, surface
            conduit) — ±3 mm vertically and horizontally; the tolerance is on the
            trunking/conduit, not on the accessory in isolation.
          </li>
        </ul>
        <p>
          Verify before drilling. Run a long spirit level (or a laser line) across the row of
          marked centre points and adjust before any cutting starts. A 30-second check before the
          first hole saves a 30-minute rework after.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 134.1.1 (Workmanship)"
        clause="(Paraphrased from the regulation requiring good workmanship and proper materials.) Good workmanship by competent persons or persons under their supervision and proper materials shall be used in the erection of every electrical installation. Equipment shall be installed in accordance with the instructions provided by the manufacturer."
        meaning={
          <>
            Reg 134.1.1 is the regulation that sits behind setting out. Marking accessories
            accurately on the wall is workmanship — sloppy marking gives sloppy install gives a
            134.1.1 finding at periodic inspection. The standard you set during setting-out
            propagates through every subsequent stage of the install. Take it seriously and the
            rest of the install reflects that.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 134.1.1 (paraphrased)."
      />

      <SectionRule />

      <ContentEyebrow>Worked example — kitchen wall, 6 sockets evenly spaced</ContentEyebrow>

      <Scenario
        title="6 sockets across a 4.2 m kitchen wall, evenly spaced from FFL"
        situation={
          <>
            Customer-spec kitchen rewire. The kitchen wall is 4.2 m end to end. The drawing pack
            shows 6 twin sockets evenly spaced across the wall, 150 mm above the worktop (worktop
            top at 900 mm above FFL, so socket centres at 1050 mm above FFL). You are first-fix
            and need to set out 6 back-box positions.
          </>
        }
        whatToDo={
          <>
            <strong>Step 1.</strong> Confirm FFL with the kitchen fitter — kitchen units arrive at
            900 mm to worktop top, but the floor finish (LVT, vinyl, tile) might add 8-12 mm. Get
            the screed level and the floor finish confirmed in writing before marking.
            <br />
            <br />
            <strong>Step 2.</strong> Set a 1 m datum line across the full 4.2 m wall using a laser
            level (or a long spirit level with chalk line). Mark with a pencil every ~500 mm so
            the line is visible after the chalk fades.
            <br />
            <br />
            <strong>Step 3.</strong> Socket centre height = 1050 mm above FFL = 50 mm above the 1
            m datum. Mark the height line as a second chalk line, 50 mm above the datum, full wall
            length.
            <br />
            <br />
            <strong>Step 4.</strong> Calculate horizontal centres. 6 sockets evenly spaced across
            4200 mm with equal margins each end. Total wall = 4200 mm. Divide into 7 equal gaps (6
            sockets create 7 spaces — left margin, 5 between-socket gaps, right margin). 4200 / 7
            = 600 mm. So the first socket centre is 600 mm from the left wall, then 600 mm to the
            next, and so on. Mark every 600 mm along the height line with a centre cross.
            <br />
            <br />
            <strong>Step 5.</strong> Verify. Stand back. Run a tape end to end and confirm the
            centres are at 600, 1200, 1800, 2400, 3000, 3600 mm from the left wall. Confirm all 6
            centres land on the height line (laser-check or long spirit level).
            <br />
            <br />
            <strong>Step 6.</strong> Cut the back-box holes. Each box centred on the cross.
            Tolerance ±3 mm on this run because it is a visible bank of 6 identical sockets.
          </>
        }
        whyItMatters={
          <>
            A row of 6 sockets is the most visible setting-out task in a kitchen rewire. The
            customer sees them every time they walk in. Get the spacing wrong by ±10 mm on each
            box and the row looks staggered; tighten to ±3 mm and the install looks professional.
            Same time, same materials, dramatically better end result.
          </>
        }
      />

      <CommonMistake
        title="Setting out from the slab when the screed is still to come"
        whatHappens={
          <>
            You measure socket centres at 450 mm from the slab on a new build. Six weeks later the
            screed goes in (60 mm) and the floor finish (12 mm vinyl). The socket centres are now
            378 mm above FFL — visibly low compared to other rooms set out properly. The customer
            notices. The site manager wants the boxes moved. Two days of remedial work plus
            plastering reinstatement.
          </>
        }
        doInstead={
          <>
            Always confirm FFL before marking. Get it from the architect&rsquo;s drawing or set it
            with the principal contractor. Mark a permanent FFL reference cross on every wall
            before any vertical setting-out happens. If FFL is not yet fixed (early-stage shell),
            wait until it is. A two-day delay is cheaper than a two-day rework.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'FFL (Floor Finish Level) is the only reliable height reference — never measure from the slab if the floor finish is still to come.',
          'Set one datum line per wall (typically 1 m above FFL). Every other height comes off that one datum, not off the floor each time.',
          'Standard heights: sockets 450 mm centres (Approved Doc M new build), 150 mm above worktop, switches 1200 mm, fire alarm devices per BS 5839-6.',
          'Right tool for the distance — spirit level <2 m, chalk line for marked end points, laser for >5 m, plumb bob for vertical drops on bowed walls.',
          'Read 1:50 / 1:100 / 1:200 with a scale rule; printed dimensions ALWAYS override scaled measurements; reduced drawings are scale-unreliable.',
          'Marking media by substrate — pencil on smooth plaster, chinagraph on concrete/block, masking tape + Sharpie on finished surfaces, centre punch on metal.',
          'Tolerances ±10 mm typical, ±3 mm for visible banks of accessories. Verify with a long level or laser before drilling.',
          'Reg 134.1.1 (workmanship) sits behind every setting-out decision. Sloppy marks give sloppy install gives 134.1.1 findings.',
        ]}
      />

      <Quiz title="Marking out from drawings — knowledge check" questions={quizQuestions2} />
    </div>
  );
}
