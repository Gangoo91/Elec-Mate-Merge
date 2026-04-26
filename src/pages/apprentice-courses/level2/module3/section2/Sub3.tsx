/**
 * Module 3 · Section 2 · Sub 3 — BS EN 60617 graphical symbols
 * Maps to City & Guilds 2365-02 / Unit 203 / LO2 / AC 2.3
 *   AC 2.3 — "Recognise symbols used in drawings"
 *
 * Cross-references:
 *   - Back to Sub 2 (the drawings these symbols appear ON)
 *   - Forward to §3 (wiring systems — once you know the symbols you can read
 *     the wiring decisions)
 *
 * Note on the standard: BS EN 60617 was the canonical reference for UK
 * graphical symbols and is what every UK syllabus, including C&G 2365-02,
 * still names. The standard itself has been formally withdrawn and
 * superseded by the IEC 60617 online database — the symbols are unchanged
 * and the "60617" name remains the lingua franca on UK sites.
 *
 * Reg sources cited: 514.9.2 (A4:2026 — diagrams shall comply with applicable
 * standards), 514.1.1 (labels for switchgear/controlgear).
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
import {
  ResistorSymbol,
  CapacitorSymbol,
  InductorSymbol,
  DiodeSymbol,
  LEDSymbol,
  RelaySymbol,
  ContactorSymbol,
  SwitchSymbols,
} from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'BS EN 60617 drawing symbols | Level 2 Module 3.2.3 | Elec-Mate';
const DESCRIPTION =
  'The BS EN 60617 graphical symbol library — switches, sockets, lights, protective devices and accessories — the visual shorthand on every UK installation drawing.';

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'symbols-protective-device-check',
    question:
      'On a single-line diagram of a domestic consumer unit, you see a symbol that combines a circuit-breaker and an RCD function in a single device. What is it?',
    options: [
      'MCB (Miniature Circuit Breaker)',
      'RCD (Residual Current Device)',
      'RCBO (Residual Current Breaker with Overcurrent)',
      'AFDD (Arc Fault Detection Device)',
    ],
    correctIndex: 2,
    explanation:
      "RCBO. It's the device that combines an MCB (overcurrent protection) and an RCD (residual current protection) into one unit. On a board diagram you'll see the symbol carry both the MCB rating (e.g. B32) and the residual current rating (e.g. 30 mA) — that combination tells you it's an RCBO.",
  },
  {
    id: 'symbols-switch-check',
    question:
      "On a layout drawing, two pendant lights are wired to a single switch position drawn as a rectangle with a slash and the number '2' next to it. What does the '2' mean?",
    options: [
      'Two-gang switch (two switches in one plate)',
      'Two-way switch (one of a pair on a stairwell circuit)',
      '2 amp switch rating',
      '2-pole switch (switching both line and neutral)',
    ],
    correctIndex: 1,
    explanation:
      "Two-way switch — one of a matched pair, typically used on stairwells, hallways or any room with two entry points so you can switch the same light from either end. Don't confuse with two-gang (which is two physically separate switches in one faceplate, drawn differently) or two-pole (which is a different symbol again).",
  },
  {
    id: 'symbols-cable-check',
    question:
      "A cable is drawn as a single line on a layout diagram with three small slashes through it. What does that mean?",
    options: [
      'Three-phase cable (three line conductors)',
      'A cable with three conductors total (e.g. line, neutral and CPC)',
      'Three cables run together in the same containment',
      "It's a damaged section of cable",
    ],
    correctIndex: 1,
    explanation:
      "The slashes count the conductors in the cable. Three slashes = three conductors (typically L + N + CPC for a single-phase circuit). Five slashes would indicate a three-phase + neutral + CPC cable. It's a quick way to indicate cable composition without drawing every core.",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      'A symbol on a board diagram shows a circle with the letters MCB inside and "B32" written next to it. What does B32 mean?',
    options: [
      '32-amp breaker, Type B trip curve',
      '32 mm² cable, terminal type B',
      "32 V rated, manufacturer's code B",
      '32-position breaker in slot B',
    ],
    correctAnswer: 0,
    explanation:
      'B = Type B trip curve (3-5 × In, suitable for resistive loads and standard domestic). 32 = rated current in amps. On a single-line diagram you read it as "Type B, 32 amps" — most common rating for ring final circuits and heavy domestic loads.',
  },
  {
    id: 2,
    question:
      'On a UK installation drawing, a protective conductor (CPC / earth) is conventionally drawn as which colour?',
    options: ['Brown', 'Blue', 'Green/Yellow', 'Black'],
    correctAnswer: 2,
    explanation:
      'Green/Yellow has been the protective conductor identification since the harmonised colours came in. On a colour drawing you\'ll see green/yellow stripes on the CPC; on a mono drawing it might be labelled "PE" or "CPC" or shown with a distinctive symbol or hatching.',
  },
  {
    id: 3,
    question:
      'A symbol on a layout shows a circle with a horizontal line through the middle and two terminals coming out the top. It is labelled "FCU 13A". What is it?',
    options: [
      'Fused Connection Unit, 13 amp',
      'Floor-Cable Unit, 13 amp',
      'Fused Conduit Union, 13 amp',
      'Fixed Cable Underground, 13 amp',
    ],
    correctAnswer: 0,
    explanation:
      'FCU = Fused Connection Unit — the spurred-off accessory that holds a 13 A BS 1362 fuse and feeds a fixed appliance (boiler, towel rail, heater) from a ring final or radial. Switched and unswitched variants exist.',
  },
  {
    id: 4,
    question:
      'On a board diagram you see a symbol showing a circuit-breaker and below it the marking "30 mA" with a small Δ (delta) or testing button. What kind of device is this?',
    options: [
      'A 30 mA ammeter',
      'A residual current device (RCD) with 30 mA residual operating current',
      'A 30 mA fuse',
      'A 30 amp circuit-breaker',
    ],
    correctAnswer: 1,
    explanation:
      "30 mA refers to the residual operating current — the trip threshold for a residual current device used for additional protection (typically against electric shock). Don't confuse mA (residual current rating for an RCD/RCBO) with A (the load current rating of an MCB/RCBO).",
  },
  {
    id: 5,
    question:
      'A symbol shows a vertical line with a small triangle pointing horizontally outwards. Underneath is the marking "AFDD". What is this?',
    options: [
      'Audio Frequency Detection Device',
      'Arc Fault Detection Device',
      'Alternating Frequency Damper Device',
      'Automatic Fuse Disconnect Device',
    ],
    correctAnswer: 1,
    explanation:
      "AFDD = Arc Fault Detection Device, mandated by BS 7671:2018+A4:2026 for certain higher-risk locations (HMOs, care homes, purpose-built student accommodation, premises with thatched roofs). It detects the unique signature of dangerous series and parallel arcs and disconnects before a fire starts.",
  },
  {
    id: 6,
    question:
      'A pair of horizontal lines, one solid and one dashed, drawn close together with no other components — what does this typically represent on an electrical drawing?',
    options: [
      'A capacitor',
      'A battery',
      'A cable junction',
      'A two-conductor cable shown in cross-section',
    ],
    correctAnswer: 1,
    explanation:
      "Two parallel lines — one long, one short — is the standard battery cell symbol. Multiple cells stacked = a multi-cell battery. The longer line is the positive terminal, the shorter line is the negative.",
  },
  {
    id: 7,
    question:
      'BS 7671:2018+A4:2026 introduced regulation 514.9.2. What does it require regarding diagrams and symbols?',
    options: [
      'All diagrams must be in colour',
      'Diagrams, charts and information notices shall comply with the applicable standards specified',
      'All diagrams must be on A3 paper',
      'All diagrams must be witnessed by two electricians',
    ],
    correctAnswer: 1,
    explanation:
      "514.9.2 (new in A4:2026) requires diagrams, charts and information/instruction notices to comply with the applicable standards — symbols per IEC 60617 (the modern continuation of BS EN 60617), notices per BS EN 60073 / 60446. Home-made symbols don't comply.",
  },
  {
    id: 8,
    question:
      'You see a symbol on a layout showing a downward-pointing triangle with two vertical lines extending below it. It\'s placed in the corridor of an office. What is it?',
    options: [
      'A standard luminaire',
      'A wall socket',
      'An emergency luminaire',
      'A smoke detector',
    ],
    correctAnswer: 2,
    explanation:
      "An emergency luminaire (the triangle pointing down with the additional marking — often an 'M' for maintained or 'NM' for non-maintained inside or alongside). Emergency lighting symbols on layouts are deliberately distinct from standard luminaires so the emergency layout is unambiguous.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: "Do I really need to memorise all the symbols?",
    answer:
      "The common 30 or so, yes — switches, sockets, lights, MCB/RCD/RCBO/AFDD, FCU, MET, junction box, simple cable types. You'll see those daily. The rarer ones (specific motor types, instrumentation, specialist sensors) you can look up when they appear. Build a deck of flashcards in your first few months — it pays dividends on every drawing pack you ever read.",
  },
  {
    question: "BS EN 60617 vs IEC 60617 — which name is right?",
    answer:
      "Both are still in use on UK sites. BS EN 60617 was the formal British/European publication of the symbols and is what the C&G syllabus, OSG and most printed material reference. BS EN 60617 has been withdrawn as a printed standard; the symbols are now maintained centrally as the IEC 60617 online database, which BSI references — same symbols, different home. Use whichever your training material uses; the symbols are the same.",
  },
  {
    question: "Are symbols different on US drawings?",
    answer:
      "Yes — significantly. The US uses ANSI/IEEE Y32 and NEMA-style symbols which look quite different (different switch and socket symbols especially). Stick with BS EN 60617 / IEC 60617 for any UK or European job. If you ever work from US drawings, get a US symbol key alongside.",
  },
  {
    question: "Why do some drawings combine multiple symbol conventions?",
    answer:
      "Old drawings sometimes mix BS 3939 (the predecessor) with BS EN 60617. Manufacturer drawings sometimes use their own style. Treat any drawing with mixed conventions as suspect — confirm what each symbol means against a key, ideally before you wire from it.",
  },
  {
    question: "What's an MET? I saw it in a board schedule.",
    answer:
      "Main Earthing Terminal — the central earth bar in the consumer unit (or a separate dedicated terminal block) where every protective conductor in the installation lands and where the earthing conductor from the supply ties on. Drawn as a horizontal line with multiple terminals branching off it, often labelled 'MET'.",
  },
  {
    question: "How do I tell a 1-way switch from a 2-way on a layout drawing?",
    answer:
      "A simple slash through the line is a 1-way (SPST). A slash with a small '2' or with two branched outputs at the far end is a 2-way (SPDT). On a layout drawing you'll usually see the type written next to the switch — 1G/1W (one-gang one-way), 2G/2W (two-gang two-way) etc. If the legend doesn't match what's on site, raise a TQ before wiring.",
  },
];

export default function Sub3() {
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
            eyebrow="Module 3 · Section 2 · Subsection 3"
            title="BS EN 60617 graphical symbols"
            description="The standard symbol library you read on every UK installation drawing — switches, sockets, lights, protective devices, accessories. Memorise the common ones. You'll see them daily."
            tone="emerald"
          />

          <TLDR
            points={[
              'BS EN 60617 (now IEC 60617) is the standard graphical symbol set used on UK electrical drawings. It replaced the older BS 3939.',
              "There are about 30 common symbols you'll see daily. Memorise those; look up the rest as they appear.",
              'Reg 514.9.2 (new in A4:2026) requires diagrams to comply with the applicable standard — IEC 60617 for symbols.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Recognise the BS EN 60617 / IEC 60617 graphical symbols for power sources, conductors, switches, sockets, luminaires and protective devices.',
              'Identify common circuit components: resistors, capacitors, inductors, diodes, LEDs, contactors and relays.',
              'Read switch symbols correctly — 1-way, 2-way, intermediate, 2-pole, 2-gang variants.',
              'Identify protective device symbols (MCB, RCD, RCBO, AFDD, MCCB, fuse) and the markings that distinguish them.',
              'Read socket-outlet symbols including single, twin, switched, and special variants (USB, FCU).',
              'Identify lighting symbols including standard luminaires, downlighters and emergency lighting.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why a standard symbol set matters</ContentEyebrow>

          <ConceptBlock
            title="The visual shorthand of an electrical drawing"
            plainEnglish="Symbols are an alphabet. Once you know them, a drawing reads like a sentence."
            onSite="The supervisor expects you to read a layout drawing as fluently as you'd read a road sign. Pause to ask 'what does that symbol mean?' on every job and you'll quickly lose your supervisor's confidence."
          >
            <p>
              BS EN 60617 (now maintained in the IEC 60617 online database) defines the standard
              graphical symbols used on electrical drawings across the UK and Europe. Every
              installation drawing — domestic, commercial, industrial — should use this set. It's
              the alphabet that makes drawings universally readable: a UK electrician can pick up a
              drawing produced anywhere in Europe and understand it because the symbols are the
              same.
            </p>
            <p>
              The standard groups symbols into families: power sources, conductors, switches,
              outlets, luminaires, protective devices, accessories, instruments, transformers and
              motors. The families below cover the symbols an apprentice meets in the first six
              months on site.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671 — Regulation 514.9.2 (new in A4:2026)"
            clause="514.9.2 — All diagrams, charts, and information or instruction notices used in electrical installations shall comply with the applicable standards specified."
            meaning={
              <>
                The regulatory backbone for using a standard symbol set. The 'applicable standard'
                for graphical symbols on UK electrical drawings is the IEC 60617 online database
                (the modern continuation of BS EN 60617). Drawings that mix standards or invent
                symbols don't comply with this regulation, and an inspector can flag them as a
                non-conformance.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 Part 5, Section 514.9.2 (paraphrased)"
          />

          <SectionRule />

          <ContentEyebrow>Power sources</ContentEyebrow>

          <ConceptBlock
            title="Battery, generator, transformer"
            plainEnglish="Where the energy comes from in the circuit."
          >
            <p>
              The three most common power-source symbols you'll meet:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Battery (cell)</strong> — a long line and a short line, parallel. Long line
                = positive (+), short line = negative (-). Stacking multiple pairs indicates a
                multi-cell battery (e.g. a 12 V battery is shown as six cells in series).
              </li>
              <li>
                <strong>Generator</strong> — a circle with a 'G' inside (or 'GS' for synchronous
                generator). For an alternator it's often a circle with a sine-wave squiggle.
              </li>
              <li>
                <strong>Transformer</strong> — two coils side by side (often as two adjacent loops
                or stacked horizontal lines), usually with a vertical line between them indicating
                the iron core. Auto-transformers, current transformers (CT) and voltage
                transformers (VT) all have specific variants.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Conductors and cables</ContentEyebrow>

          <ConceptBlock
            title="Lines, junctions, crossings, slashes for conductor count"
            plainEnglish="Cables are lines. The way the lines meet, cross or are marked tells you what's joined and what's not."
          >
            <p>
              Conductor conventions:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Conductor</strong> — single line. On a colour drawing the colour matches
                the conductor (brown = line, blue = neutral, green/yellow = CPC).
              </li>
              <li>
                <strong>Junction (connection)</strong> — a filled dot at the intersection of two
                lines. No dot = the lines cross but are NOT connected.
              </li>
              <li>
                <strong>Conductor count</strong> — short slashes (tick marks) drawn across a single
                line indicate the number of conductors in that cable. Three slashes = three-core
                (e.g. L + N + CPC); five slashes = five-core (e.g. 3-phase + N + CPC).
              </li>
              <li>
                <strong>Twisted pair</strong> — two lines drawn with helical crossings, used for
                data and instrumentation cables to denote twisted-pair construction.
              </li>
              <li>
                <strong>Screened/braided</strong> — a dashed or hatched envelope around the
                conductor(s) indicates a screened cable. The screen connection point is shown as a
                terminal with an earth symbol.
              </li>
              <li>
                <strong>Earth symbol</strong> — three horizontal lines of decreasing length stacked
                vertically (the classic 'tree' earth symbol) indicates a connection to the
                installation earth. A circle around the earth lines indicates clean/instrument
                earth.
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

          <ContentEyebrow>Switches</ContentEyebrow>

          <ConceptBlock
            title="1-way, 2-way, intermediate, 2-pole — and how to tell them apart"
            plainEnglish="A switch is a hinged line. The number of throws and poles changes how the symbol is drawn."
            onSite="Mis-reading a 2-way as a 1-way (or vice versa) is the classic apprentice trap when wiring lighting on a stairwell. Look at the symbol AND look at the layout AND check there's a matching switch at the other end."
          >
            <p>
              The switch family runs from the simplest single-pole single-throw all the way to
              ganged multi-pole switches. Below are interactive symbol cards for the common ones —
              tap or hover to view.
            </p>
          </ConceptBlock>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
            <SwitchSymbols type="SPST" label="SPST · 1-way (single-pole single-throw)" />
            <SwitchSymbols type="SPDT" label="SPDT · changeover (one of a 2-way pair)" />
            <SwitchSymbols type="2-way" label="2-way · L1/L2 strappers shown" />
            <SwitchSymbols type="DPDT" label="DPDT · double-pole, two ganged contacts" />
          </div>

          <ConceptBlock title="The everyday accessory variants">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1-gang 1-way (1G/1W)</strong> — one switch on a plate, switches one circuit
                from one position. Most bedrooms.
              </li>
              <li>
                <strong>1-gang 2-way (1G/2W)</strong> — one switch on a plate that's one of a
                matched pair on a 2-way (stairwell-style) circuit.
              </li>
              <li>
                <strong>2-gang 1-way (2G/1W)</strong> — two physically separate switches on a
                single plate, each controlling its own circuit. Common at room entrances controlling
                main + accent lighting.
              </li>
              <li>
                <strong>Intermediate</strong> — used in the MIDDLE of a stairwell circuit with
                three or more switch positions. Symbol shows two crossed strappers indicating it
                swaps L1↔L2.
              </li>
              <li>
                <strong>2-pole</strong> — switches both line and neutral simultaneously. Used for
                isolation of higher-risk equipment (showers, immersions in some cases). Symbol
                shows two ganged contacts with a mechanical link.
              </li>
              <li>
                <strong>Pull-cord</strong> — for use in bathrooms (out of reach of the bath/shower
                zones). Symbol is a switch with a small pendant cord drawn dropping from it.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Socket-outlets</ContentEyebrow>

          <ConceptBlock
            title="Single, twin, switched, FCU, USB"
            plainEnglish="Sockets are drawn as a half-circle or rectangle with a number indicating gangs and modifiers for switched / fused / USB."
          >
            <p>
              The standard set:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single socket</strong> — half-circle (or a small rectangle) with a single
                connection line. Often labelled '1G' for one-gang.
              </li>
              <li>
                <strong>Twin (double) socket</strong> — half-circle with the gang count '2'
                alongside, or two half-circles back-to-back.
              </li>
              <li>
                <strong>Switched socket</strong> — adds a switch symbol next to or above the
                socket. Standard in the UK; unswitched are unusual outside specific applications.
              </li>
              <li>
                <strong>USB socket</strong> — the standard socket symbol with 'USB' or a small USB
                logo annotation. Common in modern domestic and commercial.
              </li>
              <li>
                <strong>Fused Connection Unit (FCU)</strong> — a circle or rectangle with 'FCU'
                marking and the fuse rating (typically 13 A). Switched and unswitched variants
                exist; the switched FCU has a switch symbol beside it.
              </li>
              <li>
                <strong>Cooker outlet</strong> — labelled 'CO' or 'C', with a flex outlet symbol
                indicating cable exit point. Usually fed by a dedicated 32 A or 40 A radial.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Lighting</ContentEyebrow>

          <ConceptBlock
            title="Luminaires, downlighters, emergency, fluorescent"
            plainEnglish="Lights vary by type. Downlighters are circles, emergency adds a marking, fluorescents are rectangles."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>General luminaire (pendant / ceiling rose)</strong> — a circle with an
                'X' or cross through it, often with a small line dropping to indicate a pendant
                cord.
              </li>
              <li>
                <strong>Downlighter (recessed)</strong> — a circle with a single short line
                inside. Sometimes annotated with the lamp type (LED, CFL, halogen).
              </li>
              <li>
                <strong>Wall light</strong> — a half-circle attached to a wall line, with the flat
                side against the wall.
              </li>
              <li>
                <strong>Fluorescent batten</strong> — a long thin rectangle, sometimes with a
                wavy line or fluorescent tube indication inside.
              </li>
              <li>
                <strong>Emergency luminaire</strong> — the standard luminaire symbol with an
                additional marking. 'M' = maintained (always on, also acts as emergency); 'NM' =
                non-maintained (only on during failure of the normal supply). Often shown as a
                triangle pointing down.
              </li>
              <li>
                <strong>Exit sign</strong> — a small rectangle with a directional arrow inside
                (or the running-man pictogram on a more detailed drawing).
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Accessories — junction boxes, FCUs, MET</ContentEyebrow>

          <ConceptBlock
            title="The supporting cast"
            plainEnglish="Not the headline equipment but you can't read a layout without recognising them."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Junction box</strong> — a small filled circle or square, often with the
                box reference and conductor count noted.
              </li>
              <li>
                <strong>MET (Main Earthing Terminal)</strong> — a horizontal line with multiple
                short branching lines (each terminal point), labelled 'MET'.
              </li>
              <li>
                <strong>Smoke detector</strong> — a circle with 'SD' inside, often with an
                arrow or annotation indicating linked/standalone.
              </li>
              <li>
                <strong>Heat detector</strong> — a circle with 'HD' inside.
              </li>
              <li>
                <strong>CO detector</strong> — a circle with 'CO' inside.
              </li>
              <li>
                <strong>Telephone / data outlet</strong> — typically a triangle (data) or 'T' in a
                box (telephone). Often labelled with the cable type (Cat 5e, Cat 6, fibre).
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Protective devices — the most common symbols on a board diagram</ContentEyebrow>

          <ConceptBlock
            title="Fuse, MCB, MCCB, RCD, RCBO, AFDD"
            plainEnglish="The protective devices each have a distinct symbol. The markings (rating + trip type + residual current) tell you what they DO."
            onSite="Spend time on these. The single biggest difference between an apprentice and an experienced electrician reading a board diagram is fluency in the protective device symbols and what their markings mean."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fuse</strong> — a rectangle with two terminals. BS 1361 (cartridge), BS 88
                (high-breaking-capacity HRC) and BS 1362 (plug-top) all use the same base symbol
                with the fuse type/rating annotated.
              </li>
              <li>
                <strong>MCB (Miniature Circuit Breaker)</strong> — the standard breaker symbol
                (typically a square with a hooked operating handle), marked with the rating +
                trip-curve type. E.g. 'B32' = Type B, 32 A. Trip curves: B (3-5×In), C (5-10×In),
                D (10-20×In).
              </li>
              <li>
                <strong>MCCB (Moulded Case Circuit Breaker)</strong> — a larger version of the MCB
                symbol, often with adjustable trip settings noted. Used at higher ratings (typically
                above 100 A) on commercial/industrial installations.
              </li>
              <li>
                <strong>RCD (Residual Current Device)</strong> — symbol shows the breaker with a Δ
                (delta) marking and the residual current rating (typically 30 mA for additional
                protection, 100 mA / 300 mA for fire / earth fault protection).
              </li>
              <li>
                <strong>RCBO (Residual Current Breaker with Overcurrent)</strong> — combines the
                MCB and RCD symbols. Carries BOTH the rating + trip curve (e.g. B32) AND the
                residual current (e.g. 30 mA).
              </li>
              <li>
                <strong>AFDD (Arc Fault Detection Device)</strong> — added in BS 7671:2018+A4:2026
                as mandatory for certain locations. Symbol shows the breaker base with a small
                triangle/arc marking and 'AFDD' annotation.
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

          <ContentEyebrow>Electronic components you'll see in control circuits</ContentEyebrow>

          <ConceptBlock
            title="Resistor, capacitor, inductor, diode, LED, contactor, relay"
            plainEnglish="In motor control panels, alarm systems and any electronic accessory you'll meet these every day."
          >
            <p>
              Tap any symbol below to view it.
            </p>
          </ConceptBlock>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ResistorSymbol />
            <CapacitorSymbol />
            <InductorSymbol />
            <DiodeSymbol />
            <LEDSymbol />
            <RelaySymbol />
            <ContactorSymbol />
          </div>

          <RegsCallout
            source="BS 7671 — Regulation 514.1.1 (identification of switchgear)"
            clause="514.1.1 — Except where there is no possibility of confusion, a label or other suitable means of identification shall be provided to indicate the purpose of each item of switchgear and controlgear."
            meaning={
              <>
                The flip-side of the symbols story. On the drawing, every device has a symbol with
                a marking. On the install, every device has to have a label that matches the
                drawing (e.g. 'Cooker Cct 6'). When you wire a board, the symbols on the drawing
                drive the labels you put on the actual board — so getting the symbols right on the
                drawing is also the basis for getting the board labelling right.
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Section 514.1.1 for full text"
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Mistaking mA (residual rating) for A (load rating)"
            whatHappens={
              <>
                Apprentice looking at a board diagram sees an RCBO marked '30 mA' next to
                'B32' and assumes it's a 30 mA (i.e. 0.03 A) load device. Or worse — sees 'RCD
                100 mA' on a fire-protection RCD and tries to use it for additional shock
                protection on socket-outlets, which need 30 mA, not 100 mA.
              </>
            }
            doInstead={
              <>
                Drill it: <strong>mA</strong> on a protective device means RESIDUAL operating
                current (the trip threshold for the RCD function — how much earth-fault current it
                takes to trip). <strong>A</strong> means RATED load current (what it carries
                continuously without tripping on overload). 30 mA = additional shock protection.
                100 mA / 300 mA = fire / earth-fault protection. The unit tells you which
                parameter you're looking at.
              </>
            }
          />

          <CommonMistake
            title="Confusing 2-way with 2-gang or 2-pole"
            whatHappens={
              <>
                Apprentice asked to fit '2-way switches throughout the upstairs hallway' fits
                2-gang switches by mistake (because they look 'bigger' on the symbol legend).
                Comes back to find half the switches do nothing and the homeowner wants their
                landing light to actually work from both ends of the hallway.
              </>
            }
            doInstead={
              <>
                Get the language straight. <strong>2-way</strong> = SPDT, one of a matched pair on
                a circuit you can switch from two positions (stairwell, corridor).
                <strong> 2-gang</strong> = two physically separate switches on a single plate, each
                controlling a different circuit. <strong>2-pole</strong> = a single switch that
                breaks both line AND neutral simultaneously. The symbols look different — train
                your eye on a side-by-side comparison until you can spot which is which without
                thinking.
              </>
            }
          />

          <Scenario
            title="The drawing with home-made symbols"
            situation={
              <>
                You're at a small commercial fit-out. The drawing pack is from a low-cost design
                outfit and several symbols don't match anything in the BS EN 60617 / IEC 60617 set
                — there's a blob with 'X' on the kitchen layout that nobody can identify, and the
                symbol legend at the bottom of the drawing is incomplete.
              </>
            }
            whatToDo={
              <>
                Stop and raise a Technical Query (TQ) in writing before installing anything where
                you're not 100% sure of the symbol meaning. Reg 514.9.2 (A4:2026) requires
                diagrams to comply with the applicable standards — non-standard symbols on a
                drawing are a non-conformance the designer needs to fix. Don't guess. Wiring the
                wrong device into a position because you assumed the symbol meant a socket when it
                meant an FCU is a snag waiting to happen.
              </>
            }
            whyItMatters={
              <>
                Symbols only work if everyone uses the same set. The day you start guessing what
                a non-standard symbol means is the day you wire the wrong type of device into the
                wrong position. The standard exists to remove that ambiguity — and the regulation
                exists so the inspector can flag drawings that don't comply.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BS EN 60617 (now IEC 60617) is the standard graphical symbol set on UK electrical drawings. It replaced the older BS 3939.",
              'Reg 514.9.2 (new in A4:2026) makes compliance with the applicable standards mandatory — including IEC 60617 for symbols.',
              "Memorise the common families: power sources, conductors, switches, sockets, lighting, accessories and protective devices. About 30 symbols cover 90% of what you'll see daily.",
              "mA on a protective device = residual operating current (RCD trip threshold). A = rated load current. They're different parameters — read the unit.",
              "2-way (SPDT — paired stairwell switch) is NOT the same as 2-gang (two separate switches on one plate) or 2-pole (switches both L and N). Read each symbol carefully.",
              "Reg 514.1.1 ties symbols on the drawing to labels on the board — get the drawing right and the labelling follows.",
            ]}
          />

          <Quiz title="BS EN 60617 symbols — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section2/2-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Drawing types
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section2/2-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Scale conversion
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
