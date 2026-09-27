/**
 * Ported from the English course, combining:
 *   level3/module3/section4/Sub2.tsx
 *   level3/module3/section4/Sub4.tsx
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
  VideoCard,
} from '@/components/study-centre/learning';
import { TransformerSchematic } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';

const checks = [
  {
    id: 'l3-m3-4-2-ratio',
    question:
      'A transformer has 800 primary turns and 100 secondary turns. With 230 V primary, secondary voltage is:',
    options: ['230 V', '460 V', '1840 V', '28.75 V'],
    correctIndex: 3,
    explanation: 'V2 = V1 × (N2/N1) = 230 × (100/800) = 230 × 0.125 = 28.75 V. Step-down.',
  },
  {
    id: 'l3-m3-4-2-current',
    question: 'Same transformer, secondary load of 10 A. Primary current (ideal):',
    options: ['8 A', '1.25 A', '80 A', '1.0 A'],
    correctIndex: 1,
    explanation:
      'I1/I2 = N2/N1 (inverse ratio). I1 = 10 × (100/800) = 1.25 A. Power = V × I is conserved: 230 × 1.25 = 287 VA = 28.75 × 10. Tick.',
  },
  {
    id: 'l3-m3-4-2-step',
    question: 'A 11 000 V / 433 V distribution transformer is:',
    options: ['Step-up', 'Isolation', 'Step-down', 'Auto-transformer'],
    correctIndex: 2,
    explanation:
      'Primary higher than secondary = step-down. Common UK pole-mounted distribution transformer feeding a 400 V LV network.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A transformer works by:',
    options: [
      'A direct electrical connection between primary and secondary',
      'Mutual induction between two coils on a magnetic core',
      'Mechanical rotation of one winding past the other',
      'Rectifying the AC supply to a smoothed DC output',
    ],
    correctAnswer: 1,
    explanation:
      'Primary coil creates an alternating flux in the core; secondary coil sits in that flux and an EMF is induced. No physical connection between primary and secondary — pure magnetic coupling.',
  },
  {
    id: 2,
    question: 'Voltage ratio for an ideal transformer:',
    options: ['V1 + V2 = N1 + N2', 'V1 × V2 = constant', 'V1/V2 = N1/N2', 'V1/V2 = I1/I2'],
    correctAnswer: 2,
    explanation: 'V1/V2 = N1/N2. Higher turns ratio = bigger voltage transformation.',
  },
  {
    id: 3,
    question: 'Current ratio for an ideal transformer:',
    options: ['I1 = I2', 'I1/I2 = N1/N2', 'I1 + I2 = constant', 'I1/I2 = N2/N1'],
    correctAnswer: 3,
    explanation:
      'I1/I2 = N2/N1 — inverse of the voltage ratio. Step-down voltage = step-up current.',
  },
  {
    id: 4,
    question: 'In an ideal transformer, input apparent power equals:',
    options: [
      'Output (V1 × I1 = V2 × I2)',
      'Twice the output power',
      'Output plus the iron and copper losses',
      'Output divided by the turns ratio',
    ],
    correctAnswer: 0,
    explanation: 'Power conservation. V1 × I1 = V2 × I2. Real transformers have small losses.',
  },
  {
    id: 5,
    question: 'A step-up transformer has more turns on the:',
    options: ['Primary', 'Secondary', 'Both equally', 'Core'],
    correctAnswer: 1,
    explanation:
      'Step-up means higher secondary voltage → more secondary turns. Used at generators (11 kV → 132 kV) and at substations onto the grid.',
  },
  {
    id: 6,
    question: 'An isolation transformer has:',
    options: [
      'A turns ratio of at least 10:1 to step the voltage down',
      'A single tapped winding shared between input and output',
      'Primary and secondary at the same voltage, no electrical connection between them',
      'Its secondary permanently bonded to the primary neutral',
    ],
    correctAnswer: 2,
    explanation:
      'Isolation = same voltage in and out (typically 1:1), with full electrical separation. Used in medical equipment, hi-fi, sensitive instruments to break ground loops.',
  },
  {
    id: 7,
    question: 'No-load test on a transformer measures:',
    options: ['Winding resistance', 'Insulation resistance', 'Copper losses', 'Iron (core) losses'],
    correctAnswer: 3,
    explanation:
      'No-load test: rated voltage on primary, secondary open. Tiny magnetising current; power drawn = iron losses (hysteresis + eddy).',
  },
  {
    id: 8,
    question: 'Short-circuit test on a transformer measures:',
    options: [
      'Copper losses (winding I²R)',
      'Iron losses (hysteresis and eddy)',
      'The magnetising current at no load',
      'The insulation resistance to the core',
    ],
    correctAnswer: 0,
    explanation:
      'Short-circuit test: secondary shorted, primary at reduced voltage to get rated current. Power drawn = copper losses (I²R) plus stray losses. Used to find equivalent series impedance.',
  },
];

const faqs = [
  {
    question: "Why doesn't a transformer work on DC?",
    answer:
      "Transformers need a CHANGING magnetic flux to induce voltage in the secondary (Faraday's law). DC produces a constant flux — once established, no induction. Connect 12 V DC to a transformer primary and you get one short pulse on the secondary, then nothing — and the primary acts like a short-circuit through its (very low) winding resistance, blowing fuses.",
  },
  {
    question: 'What is "mutual induction"?',
    answer:
      'When changing current in one coil produces an EMF in another coil. The mutual inductance M (in henries) measures how much. Tightly coupled (transformer cores) gives high M. Loosely coupled (just two coils side-by-side in air) gives low M.',
  },
  {
    question: 'Why do transformers hum at 100 Hz, not 50?',
    answer:
      "Magnetostriction — the core slightly changes length as B varies. B reaches its maximum twice per cycle (positive and negative peaks), so the dimensional change happens at 2 × 50 Hz = 100 Hz. That's the audible hum.",
  },
  {
    question: 'What is "vector group" notation like Dyn11?',
    answer:
      'Letters describe winding connections: D/Y/Z for primary (capital), d/y/z for secondary (lower-case). n means neutral brought out. Number is phase shift in 30° steps. Dyn11 = Delta primary, star secondary, neutral, secondary lags primary by 11 × 30° = 330° (or leads by 30°). Critical for paralleling transformers.',
  },
  {
    question: 'How does an auto-transformer differ?',
    answer:
      "Auto-transformer has a single tapped winding instead of two separate coils. Cheaper and lighter for small voltage ratios (e.g. 230/110 V site transformers). But there's no electrical isolation — primary and secondary share a connection. Not used for safety isolation.",
  },
  {
    question: "What are 'tap changers' on a transformer?",
    answer:
      'Switches that select different turns on the primary or secondary, changing the ratio in small steps (typically ±5 % in 2.5 % steps). Used to compensate for supply voltage variation. Off-circuit tap changers (set when de-energised) are common; on-load tap changers are large and expensive — used at substation level.',
  },
];

const DESCRIPTION2 =
  "Iron loss (constant) + copper loss (∝ I²). Why the maximum-efficiency point is where they're equal. Calculations for full and part load.";

const checks2 = [
  {
    id: 'l3-m3-4-4-cu',
    question:
      'A 100 kVA transformer has copper loss 1.5 kW at full load. At 50 % load, copper loss is:',
    options: ['1.5 kW', '0.75 kW', '0.375 kW', '3.0 kW'],
    correctIndex: 2,
    explanation: 'P_cu ∝ I². Half the current → quarter the loss. 1.5 × 0.25 = 0.375 kW.',
  },
  {
    id: 'l3-m3-4-4-fe',
    question: 'A transformer has iron loss 800 W at no load. At 50 % load, iron loss is:',
    options: ['400 W', '1600 W', '200 W', '800 W'],
    correctIndex: 3,
    explanation:
      'Iron loss is essentially constant — depends on flux density (set by V), not load current. Still 800 W at any load level.',
  },
  {
    id: 'l3-m3-4-4-eta',
    question:
      'A 50 kVA transformer at 75 % load with pf 0.9: P_out = 33.75 kW. Iron loss 0.4 kW; copper loss at full load 0.8 kW. Efficiency at 75 % load:',
    options: ['85 %', '99 %', '97 %', '92 %'],
    correctIndex: 2,
    explanation:
      'Cu loss at 75 % = 0.8 × 0.75² = 0.45 kW. Total loss = 0.4 + 0.45 = 0.85 kW. P_in = 33.75 + 0.85 = 34.6 kW. η = 33.75 / 34.6 × 100 = 97.5 %.',
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question: 'Iron (core) losses include:',
    options: [
      'Winding I²R losses only',
      'Hysteresis + eddy currents',
      'Stray leakage and terminal contact losses',
      'Friction and windage in the bearings',
    ],
    correctAnswer: 1,
    explanation:
      'Iron losses = hysteresis (re-orienting domains) + eddy currents (induced circulating in laminations). Both depend on flux density and frequency, not on load.',
  },
  {
    id: 2,
    question: 'Copper losses depend on:',
    options: ['Voltage', 'Flux density', 'I² × R of windings', 'Frequency'],
    correctAnswer: 2,
    explanation:
      'P_cu = I² × R for each winding. Quadratic with current — half load = quarter loss.',
  },
  {
    id: 3,
    question: 'Maximum efficiency occurs when:',
    options: [
      'Iron loss = ½ copper loss',
      'Iron loss = 2 × copper loss',
      'Always at full load',
      'Iron loss = copper loss',
    ],
    correctAnswer: 3,
    explanation:
      'Maximum efficiency when variable loss (Cu) equals constant loss (Fe). Often around 60-80 % load for distribution transformers.',
  },
  {
    id: 4,
    question:
      'A 50 kVA transformer with iron loss 500 W and full-load copper loss 800 W reaches max efficiency at approximately what fraction of full load?',
    options: ['√(500/800) = 0.79', '500/800 = 0.625', '0.5', '1.0'],
    correctAnswer: 0,
    explanation:
      'Set P_cu(x) = P_fe: 800 × x² = 500 → x = √(500/800) = 0.79. Max efficiency at 79 % of full load.',
  },
  {
    id: 5,
    question: 'Efficiency formula:',
    options: [
      'η = P_in / P_out',
      'η = P_out / P_in × 100 %',
      'η = P_out / P_loss',
      'η = P_loss / P_in',
    ],
    correctAnswer: 1,
    explanation: 'η = useful output / total input × 100. P_in = P_out + P_loss.',
  },
  {
    id: 6,
    question: 'A no-load test on a transformer measures primarily:',
    options: [
      'Full-load copper loss in the windings',
      'The short-circuit impedance of the unit',
      'Iron loss + magnetising VA',
      'The insulation resistance to the frame',
    ],
    correctAnswer: 2,
    explanation:
      'No load = no current in secondary = no copper loss. The wattmeter reads iron losses.',
  },
  {
    id: 7,
    question: 'Stray losses in a transformer are caused by:',
    options: [
      'Hysteresis in the main core laminations',
      'Magnetising current at no load',
      'I²R heating in the main windings',
      'Magnetic flux leakage and eddy currents in tank/core clamps',
    ],
    correctAnswer: 3,
    explanation:
      'Leakage flux induces eddies in steel tanks, end-windings and clamping plates. Small but counted in load loss measurements.',
  },
  {
    id: 8,
    question: 'Which loss is dominant at no-load?',
    options: ['Iron', 'Both equal', 'Copper', 'Stray'],
    correctAnswer: 0,
    explanation: 'No load = no significant current = negligible copper loss. Iron loss dominates.',
  },
];

const faqs2 = [
  {
    question: 'Why does my transformer get warm even with no load?',
    answer:
      'Iron losses (hysteresis + eddy) happen any time the core is energised, regardless of load. A 1 % no-load loss on a 1 MVA transformer is 10 kW continuously dissipated as heat — enough to warm a small room.',
  },
  {
    question: 'What is the "all-day efficiency" of a transformer?',
    answer:
      'A weighted average accounting for the fact that distribution transformers spend most of the day at low load. Iron losses are constant; copper losses dominate only at peak. For a typical distribution transformer at 25 % average load, all-day efficiency might be 95-97 % even though full-load efficiency is 98+ %.',
  },
  {
    question: 'Can I oversize a transformer to save energy?',
    answer:
      'Only up to a point. Oversized transformer = lower copper loss at the actual load (because it runs at lower fraction of rated). But iron loss stays the same regardless of size. Sweet spot is usually 70-90 % of rated capacity for the typical operating load.',
  },
  {
    question: 'What’s an "amorphous" transformer?',
    answer:
      'Uses an amorphous metal alloy core instead of silicon steel. ~70 % lower iron loss, but slightly higher cost and slightly larger size. Pays back over the 30-year life of a continuously energised distribution transformer through lower no-load loss.',
  },
  {
    question: 'How are losses measured at the factory?',
    answer:
      'No-load test (rated voltage, secondary open) gives iron loss. Short-circuit test (rated current, secondary shorted, primary at reduced voltage) gives full-load copper loss. Both must be on the test certificate per BS EN 60076.',
  },
  {
    question: 'Is "no-load loss" the same as "magnetising current loss"?',
    answer:
      'Roughly yes. The magnetising current is mostly reactive (wattless), but it has a real component that goes into iron loss. The no-load wattmeter reads only the real (loss) component.',
  },
];

export default function Lesson319E_2_7() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Mutual induction, turns ratio V1/V2 = N1/N2, ideal vs real model, no-load and
        short-circuit tests.
      </p>

      <TLDR
        points={[
          'Transformer = two coils on a shared magnetic core. Primary creates alternating flux; secondary sees that flux and an EMF is induced.',
          'V1/V2 = N1/N2 (turns ratio). Step-up: more secondary turns. Step-down: fewer.',
          'I1/I2 = N2/N1 (inverse). Power conserved (ideal): V1 × I1 = V2 × I2.',
          'No-load test → iron (core) losses. Short-circuit test → copper (winding) losses.',
          'Vector groups (Dyn11 etc.) describe winding configuration and phase shift.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain mutual induction and how a transformer transfers energy without direct connection.',
          'Apply the turns ratio to calculate secondary voltage and current.',
          'Distinguish step-up, step-down, isolation and auto-transformers.',
          'Describe the no-load and short-circuit tests and what they measure.',
          'Read transformer nameplate data fluently (kVA, voltage ratio, vector group).',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Mutual induction</ContentEyebrow>

      <ConceptBlock
        title="Two coils, one magnetic core, no wires between them"
        plainEnglish="Connect AC to the primary. Current flows, alternating flux builds in the core. The secondary coil sits in that flux and develops an induced EMF — completely separate electrically, but magnetically coupled."
        onSite="Open up any plug-in adapter, doorbell transformer or LED driver. You'll see two windings on a small core. Same physics from a 1 W phone charger to a 100 MVA grid transformer."
      >
        <p>
          <strong>EMF induced in secondary: e₂ = N₂ × dΦ/dt</strong>
        </p>
        <p>
          <strong>Primary back-EMF: e₁ = N₁ × dΦ/dt</strong>
        </p>
        <p>
          Same dΦ/dt for both (same core), so: <strong>e₁/e₂ = N₁/N₂</strong> — the famous turns
          ratio.
        </p>
      </ConceptBlock>

      <TransformerSchematic />

      <SectionRule />

      <ContentEyebrow>Turns ratio and power</ContentEyebrow>

      <ConceptBlock
        title="V scales with N; I scales inversely; VA stays the same"
        plainEnglish="A step-down transformer drops voltage and steps up current — the same VA passes through. A step-up transformer does the opposite."
      >
        <p>For an ideal transformer (no losses):</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>V1 / V2 = N1 / N2</strong>
          </li>
          <li>
            <strong>I1 / I2 = N2 / N1</strong>
          </li>
          <li>
            <strong>V1 × I1 = V2 × I2</strong> (apparent power conservation)
          </li>
        </ul>
        <p>
          Worked example: 11 000 V / 230 V transformer (N1/N2 = 11000/230 = 47.83). Secondary load
          draws 100 A.
          <br />
          I1 = I2 × (N2/N1) = 100 / 47.83 = 2.09 A.
          <br />S = 11 000 × 2.09 = 23 000 VA = 23 kVA = 230 × 100. Same VA both sides.
        </p>
      </ConceptBlock>

      <InlineCheck {...checks[0]} />
      <InlineCheck {...checks[1]} />
      <InlineCheck {...checks[2]} />

      <SectionRule />

      <ContentEyebrow>Types of transformer</ContentEyebrow>

      <ConceptBlock
        title="Step-up, step-down, isolation, auto"
        plainEnglish="Same physics, different applications."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Step-down distribution</strong> — 11 kV → 433 V or 230 V. The pole-mounted or
            pad-mounted transformer that feeds a street.
          </li>
          <li>
            <strong>Step-up generator</strong> — 11 kV (alternator) → 132/275/400 kV (grid). Sits
            at every power station.
          </li>
          <li>
            <strong>Isolation 1:1</strong> — same voltage, full electrical separation. Medical
            equipment, audio, breaking ground loops.
          </li>
          <li>
            <strong>Auto-transformer</strong> — single tapped winding. Cheaper and lighter for
            small ratios (110/230 V site transformers). No isolation.
          </li>
          <li>
            <strong>Instrument (CT/VT)</strong> — current and voltage transformers used to step
            large currents/voltages down to safe metering levels (e.g. 1000 A → 5 A, 11 kV → 110
            V).
          </li>
          <li>
            <strong>Constant-voltage (ferro-resonant)</strong> — saturates the core deliberately
            to stabilise output voltage against input variation. Used in old process control.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Tests</ContentEyebrow>

      <ConceptBlock
        title="No-load and short-circuit tests"
        plainEnglish="No-load test isolates the iron losses. Short-circuit test isolates the copper losses. Add them together for total losses at full load."
      >
        <p>
          <strong>No-load test:</strong> rated voltage on primary, secondary open-circuit.
          Magnetising current is small (~1-5 % of rated). Wattmeter reads iron loss (hysteresis +
          eddy). Voltmeter and ammeter give the magnetising impedance.
        </p>
        <p>
          <strong>Short-circuit test:</strong> secondary shorted (through ammeter), primary at
          REDUCED voltage to give rated current. Wattmeter reads copper loss (I²R) plus stray
          losses. Voltage required is the per-unit impedance (typically 4-7 %).
        </p>
        <p>
          The two tests together give you the full equivalent circuit and let you predict
          full-load efficiency without actually loading the transformer.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS EN 60076-1:2011 — Power transformers — Part 1: General"
        clause="Routine tests on liquid-immersed and dry-type power transformers shall include: measurement of winding resistance; voltage ratio and vector group check; no-load loss and current; short-circuit impedance and load loss; insulation resistance; dielectric tests."
        meaning={
          <>
            Every transformer leaves the factory with a documented test certificate covering
            ratio, no-load loss, load loss and impedance — the data the designer uses to predict
            efficiency at any load. Never accept a transformer without its test certificate.
          </>
        }
        cite="Source: BS EN 60076-1:2011."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 526.1 (Connections)"
        clause="Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection."
        meaning={
          <>
            Transformer secondary terminals carry the heaviest currents in the box. Reg 526.1
            drives terminal selection — the means of connection must take account of the conductor
            material, class, CSA, number of conductors per terminal, terminal temperature in
            service, and any vibration. Loose primary or secondary lugs generate heat that
            aggravates the iron-loss heat balance you've calculated.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026, Regulation 526.1."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 526.5 (Termination location)"
        clause="Every termination and joint in a live conductor or a PEN conductor shall be made within one of the following or a combination thereof: (a) a suitable accessory complying with the appropriate product standard; (b) an equipment enclosure complying with the appropriate product standard; (c) an enclosure partially formed or completed with building material which is non-combustible when tested to BS 476-4."
        meaning={
          <>
            Transformer terminations live inside an enclosure rated to the application — IP-rated
            for indoor LV, IP66 for outdoor pad-mount, and stainless or galvanised steel for harsh
            process environments. Reg 526.5 is the rule that stops you making "temporary" exposed
            joints between a transformer and its load — the joint must be inside an accessory or
            enclosure that meets the product standard.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026, Regulation 526.5."
      />

      <SectionRule />

      <CommonMistake
        title="Connecting a step-down transformer backwards"
        whatHappens={
          <>
            A 230 V / 24 V transformer is wired with the 24 V winding to mains. Turns ratio
            inverts the voltage upward — secondary now produces 230 × (10/1) = 2200 V or so
            (limited only by core saturation, but enough to flash insulation, melt windings and
            possibly kill someone touching the 24 V terminal block).
          </>
        }
        doInstead={
          <>
            Always check primary and secondary markings BEFORE energising. Most transformers have
            clear voltage labels on each winding. If unmarked, measure resistance: the
            higher-voltage winding has more turns and significantly higher DC resistance.
          </>
        }
      />

      <Scenario
        title="Sizing an isolation transformer for a control panel"
        situation={
          <>
            Customer has a 5 kW machine running 24 V DC controls from a 230 V supply through a
            switching PSU. They want a galvanically isolated 230 V / 24 V transformer plus
            rectifier instead of the SMPS. What size transformer?
          </>
        }
        whatToDo={
          <>
            DC load = 24 V × max current. If max is 10 A → 240 W DC.
            <br />
            Rectifier efficiency ~80 %, transformer 90 %, total 72 %. So input AC to the
            transformer = 240 / 0.72 ≈ 333 W.
            <br />
            Transformer rating: pick next standard size — 350 VA or 500 VA, with 50 % thermal
            headroom for inrush and ambient. Specify rated current 24 V × 14.6 A = 350 VA.
            <br />
            Primary fuse: 350 / 230 ≈ 1.5 A. Time-delay (inrush from core).
            <br />
            Secondary fuse downstream of rectifier per max DC current.
          </>
        }
        whyItMatters={
          <>
            The maths chain (DC load → AC input via efficiency → transformer VA size) is exactly
            the same logic for any isolated supply. Pick efficiency factors realistically and use
            the next standard size up.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Apprentice depth — site work and fault-finding</ContentEyebrow>

      <ConceptBlock
        title="Reading a transformer nameplate fluently"
        plainEnglish="Every transformer plate carries the same standard data. Once you can read it without thinking, you can size protection, plan installation and verify performance on site in minutes."
        onSite="Standard plate fields: kVA rating, voltage HV/LV (e.g. 11 000/433 V), current HV/LV (in A), vector group (Dyn11), impedance %Z (typical 4-7 %), no-load loss P_0 (W), load loss P_k (W), insulation class, cooling type (ONAN, ONAF, etc.), tap range, weight, oil volume."
      >
        <p>The five numbers you actually use on site:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>kVA</strong> — drives cable and protection sizing on both HV and LV side.
          </li>
          <li>
            <strong>Voltage ratio</strong> — defines turns ratio and confirms compatibility.
          </li>
          <li>
            <strong>%Z</strong> — drives PSCC calculation on the LV side. PSCC = I_rated × 100 /
            %Z.
          </li>
          <li>
            <strong>Vector group</strong> — must match before you parallel two transformers.
          </li>
          <li>
            <strong>Tap range</strong> — defines how much you can adjust output voltage if it
            drifts.
          </li>
        </ul>
        <p>
          Worked: 1000 kVA 11 000/433 V Dyn11 6 % Z. LV rated current = 1 000 000 / (√3 × 433) =
          1334 A. PSCC at LV terminals = 1334 × 100 / 6 = 22.2 kA. Designer specs LV switchgear
          for 25 kA breaking.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Vector groups for paralleling — Dyn11 and friends"
        plainEnglish="Two transformers can share load only if they have IDENTICAL vector group, IDENTICAL %Z (within 10 %), and SAME voltage ratio. Otherwise circulating currents flow between them, dumping energy as heat with no useful work."
        onSite="The L3 design check before paralleling: 1) Read both nameplates. 2) Vector group letter and number must match exactly. 3) %Z must agree to within 10 %. 4) HV and LV voltages must match. 5) Phase rotation must be identical at the LV terminals — verify with phase-rotation tester. Skip ANY one of these checks and you will damage one or both transformers within hours."
      >
        <p>Common UK vector groups and what they mean:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Dyn11</strong> — Standard UK distribution. Delta primary, star secondary,
            neutral, 30° lag.
          </li>
          <li>
            <strong>Yyn0</strong> — Star-star with no phase shift. Used where neutral on both
            sides is needed (rare in UK).
          </li>
          <li>
            <strong>Dyn1</strong> — Same as Dyn11 but secondary leads by 30° instead of lags.
            Cannot parallel with Dyn11.
          </li>
          <li>
            <strong>YNd11</strong> — Star-delta common at generator step-up; HV neutral earthed at
            source.
          </li>
          <li>
            <strong>Dd0</strong> — Delta-delta no shift. Industrial sites with no neutral need on
            either side.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Inrush current — why a transformer trips its primary fuse on switch-on"
        plainEnglish="When you energise a transformer at the wrong point in the AC waveform, the core can saturate momentarily — drawing a HUGE inrush current for one or two cycles. Typical inrush is 8-12× rated current, lasting 50-100 ms before settling."
        onSite="Standard practice: protect transformer primary with a TIME-DELAY fuse (motor-rated, gG curve) sized for ~1.5-2× FLC. Standard MCBs (Type B) will trip on inrush every time. Type C is borderline. Type D (8-20× delay) is what you actually want — designed exactly for transformer/motor inrush. On larger units, an inrush-restraint relay or soft-start contactor handles the surge."
      >
        <p>Calculating inrush:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Worst case: switch-on at zero crossing of the voltage waveform, with residual flux
            already in the core.
          </li>
          <li>
            Peak inrush ≈ (2 × √2 × V) / (X_lk + X_m_sat) — limited only by leakage reactance and
            saturated mutual reactance.
          </li>
          <li>
            For a 10 kVA 230 V transformer (FLC 43 A): inrush typically 350-500 A peak, decaying
            over 50-100 ms.
          </li>
          <li>Type D MCB at 50 A handles this. Type B at 50 A trips instantly.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Insulation testing a transformer — what each reading means"
        plainEnglish="Insulation resistance test on a transformer measures whether the windings are still electrically isolated from each other and from the core/frame. Three readings: HV-to-LV, HV-to-frame, LV-to-frame. All should be in the GΩ range when new; degradation over decades is normal."
        onSite="L3 commissioning routine for a new transformer: use a 5 kV insulation tester (1 kV is not enough on HV windings). Test HV-LV at 5 kV for 1 minute; HV-frame at 5 kV for 1 minute; LV-frame at 1 kV for 1 minute. Record polarisation index (PI) — ratio of 10-min reading to 1-min reading. PI > 2.0 = good insulation; PI < 1.0 = wet/damaged insulation, do not energise."
      >
        <p>Typical pass/fail values:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>New transformer (factory test):</strong> &gt; 1000 MΩ HV-LV, often 10+ GΩ.
          </li>
          <li>
            <strong>Aged service transformer (in spec):</strong> &gt; 100 MΩ HV-LV.
          </li>
          <li>
            <strong>Concerning:</strong> 10-100 MΩ — investigate, may be moisture in oil.
          </li>
          <li>
            <strong>Failed:</strong> &lt; 10 MΩ — out of service immediately, dry/clean/replace.
          </li>
          <li>
            <strong>Polarisation index:</strong> &gt; 2 = excellent, 1.5-2 = OK, 1-1.5 = caution,
            &lt; 1 = wet/damaged.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Transformer = two coils on a magnetic core. Mutual induction transfers energy magnetically.',
          'V1/V2 = N1/N2 (turns ratio). I1/I2 = N2/N1 (inverse).',
          'Apparent power conserved: V1×I1 = V2×I2 (ideal).',
          'Step-up (more secondary turns) used at generators; step-down at distribution.',
          'No-load test → iron loss; short-circuit test → copper loss.',
          'Auto-transformers cheaper but no isolation. Isolation transformers for safety.',
          'BS EN 60076-1 routine test certificate is mandatory for all power transformers.',
        ]}
      />

      <Quiz title="Transformer principles knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Iron (constant) + copper (∝ I²). Maximum efficiency where they're equal. The maths behind
        every datasheet efficiency curve.
      </p>

      <TLDR
        points={[
          'Iron loss (P_fe): constant, depends on flux density and frequency. Hysteresis + eddy.',
          'Copper loss (P_cu): variable, ∝ I². Half load = quarter loss.',
          'Maximum efficiency: P_cu = P_fe. Often around 60-80 % of full load.',
          'Efficiency at any load x: η = (x × S × pf) / (x × S × pf + P_fe + x² × P_cu_FL).',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Distinguish iron losses (hysteresis + eddy) from copper losses (I²R).',
          'Calculate efficiency at any load fraction given full-load Cu loss and Fe loss.',
          'Identify the load fraction giving maximum efficiency.',
          'Read no-load and short-circuit test results from a factory certificate.',
        ]}
        initialVisibleCount={3}
      />

      <TransformerSchematic />

      <ContentEyebrow>The two loss families</ContentEyebrow>

      <ConceptBlock
        title="Iron loss is constant; copper loss scales with load²"
        plainEnglish="Iron loss depends on the magnetic flux in the core — which is set by the supply voltage. Once energised, it's constant. Copper loss is I²R in the windings — varies with the square of load current."
      >
        <p>
          <strong>P_total = P_fe + P_cu(x) = P_fe + x² × P_cu_FL</strong>
        </p>
        <p>Where x = load fraction (0 to 1) of full load.</p>
        <p>
          Worked example: 200 kVA transformer with P_fe = 0.5 kW, P_cu (FL) = 2.5 kW. At full load
          total loss = 3 kW. At 50 % load = 0.5 + 0.25 × 2.5 = 1.125 kW. At no-load = 0.5 kW.
        </p>
      </ConceptBlock>

      <InlineCheck {...checks2[0]} />
      <InlineCheck {...checks2[1]} />

      <SectionRule />
      <ContentEyebrow>Maximum efficiency</ContentEyebrow>

      <ConceptBlock
        title="Find the load where Cu loss = Fe loss"
        plainEnglish="Below this load, iron loss dominates (small load not justifying the constant overhead). Above it, copper loss dominates (big I means big I²R). Right at the crossover, total loss is minimum relative to output, so efficiency peaks."
      >
        <p>
          Set P_cu(x) = P_fe: x² × P_cu_FL = P_fe → <strong>x_max_eff = √(P_fe / P_cu_FL)</strong>
        </p>
        <p>
          For the 200 kVA above: x = √(0.5/2.5) = √0.2 = 0.447 = 44.7 %. Maximum efficiency at ~45
          % of full load.
        </p>
        <p>
          Most distribution transformers are designed for max efficiency at 50-75 % load, matching
          typical daily demand profile.
        </p>
      </ConceptBlock>

      <InlineCheck {...checks2[2]} />

      <SectionRule />
      <ContentEyebrow>Calculating efficiency</ContentEyebrow>

      <ConceptBlock
        title="η = P_out / (P_out + P_loss)"
        plainEnglish="Output power = load × kVA × pf. Total loss = constant Fe loss + variable Cu loss at that load."
      >
        <p>For a 100 kVA transformer at 80 % load, pf 0.85: P_out = 0.8 × 100 × 0.85 = 68 kW.</p>
        <p>
          P_fe = 0.4 kW (from no-load test). P_cu (full load) = 1.2 kW. P_cu (80 %) = 1.2 × 0.64 =
          0.77 kW.
        </p>
        <p>P_loss = 0.4 + 0.77 = 1.17 kW. P_in = 68 + 1.17 = 69.17 kW.</p>
        <p>η = 68 / 69.17 × 100 = 98.3 %.</p>
      </ConceptBlock>

      <VideoCard {...videos.transformers} topic="How transformers work" />

      <RegsCallout
        source="Ecodesign Regulation 548/2014 (UK retained law) — Tier 2 efficiency for power transformers"
        clause="From 1 July 2021, all new medium and large power transformers placed on the UK or EU market must meet Tier 2 minimum efficiency at peak load and Tier 2 maximum no-load loss values per kVA rating, depending on type (oil or dry) and voltage class."
        meaning={
          <>
            Tier 2 cuts allowable iron and copper losses by ~10-30 % from earlier baseline. Drives
            use of higher-grade silicon steel, amorphous cores and improved copper geometry.
            Typical 100 kVA distribution transformer: P_fe ≤ 130 W, P_cu ≤ 1100 W under Tier 2.
          </>
        }
        cite="Source: Ecodesign for Energy-Related Products Regulations 2010 (as amended)."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 421.11 (Protection against fire)"
        clause="Persons, livestock and property shall be protected against harmful effects of heat or fire which may be generated or propagated in electrical installations. Manufacturers' instructions shall be taken into account in addition to the requirements of BS 7671."
        meaning={
          <>
            Iron loss is constant whenever the transformer is energised, so it heats the core 24/7
            even at zero load. The thermal envelope (winding class F/H, ambient, ventilation)
            sized for full-load steady-state is what Reg 421.11 binds you to. Under-ventilated
            transformer rooms breach 421.11 long before any electrical fault.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026, Regulation 421.11."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 132.15.201 (Means of cutting off voltage)"
        clause="Effective means, suitably placed for ready operation, shall be provided so that all voltage may be cut off from every installation, from every circuit thereof and from all equipment, as may be necessary to prevent or remove danger."
        meaning={
          <>
            Iron loss only stops when the transformer is fully isolated from supply. Reg
            132.15.201 demands a readily accessible isolator that breaks ALL voltage to the unit —
            for fire risk reduction (a smouldering core needs to be de-energised in seconds), for
            maintenance, and for after-hours energy savings. On low-load installs, automatic
            load-off isolation can cut iron-loss energy bills by 80 % overnight.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026, Regulation 132.15.201."
      />

      <SectionRule />

      <CommonMistake
        title="Quoting full-load efficiency for a transformer that runs at 25 % load"
        whatHappens={
          <>
            Customer told "this transformer is 98.5 % efficient". They run it at 25 % average
            load. Real efficiency at that point is only 96 % because copper loss is small but iron
            loss is unchanged — and as a fraction of the small output it is a bigger drag.
          </>
        }
        doInstead={
          <>
            Quote "all-day efficiency" or efficiency at typical operating load (often 25-50 %),
            not nameplate full-load. Pick a transformer sized for typical load, not for
            theoretical peak.
          </>
        }
      />

      <Scenario
        title="Sizing a transformer for an EV charger array"
        situation={
          <>
            Customer wants 8 × 22 kW AC chargers. Average duty cycle 30 % (typical for workplace
            charging). What kVA transformer, and what real efficiency to quote in the energy
            report?
          </>
        }
        whatToDo={
          <>
            Total connected = 8 × 22 = 176 kW. Diversity 0.6 (not all charge at peak): 176 × 0.6 =
            106 kW. Plus pf ~0.97 → kVA = 109. Pick 125 kVA (next standard).
            <br />
            Average load = 0.3 × 109 = 33 kVA = 26 % of rated.
            <br />
            Per Tier 2 efficiency: 125 kVA P_fe ≈ 150 W, P_cu (FL) ≈ 1300 W. Cu at 26 % = 1300 ×
            0.067 = 87 W. Total loss at average = 237 W. Output = 33000 × 0.95 = 31350 W. η =
            31350 / 31587 = 99.25 %. But all-day quote should be 99 % rounded.
          </>
        }
        whyItMatters={
          <>
            The customer energy report needs realistic numbers for kWh through the year. The maths
            in this lesson gives them — vs the marketing figure on the front of the data sheet.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Apprentice depth — losses on real installs</ContentEyebrow>

      <ConceptBlock
        title="Why a transformer humming hot at no-load is a red flag"
        plainEnglish="A transformer with no load connected should run cool — only iron loss is heating it (typically 0.1-0.5 % of rated kVA). If a 100 kVA transformer is running hot at no load, P_fe is way above the design value — usually due to overvoltage on the primary, wrong tap setting, or core damage."
        onSite="Standard L3 inspection: thermal imaging at no-load. A healthy 200 kVA distribution transformer might show 35 °C surface temperature with 20 °C ambient — i.e. ~15 K rise from iron losses. Same unit at 60 °C is suspect; at 80 °C is failing. Always check tap position and primary voltage before condemning the transformer."
      >
        <p>Iron loss approximations on common kVA ratings (Tier 2 limits, illustrative):</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>50 kVA: P_fe ≤ 90 W, P_cu (FL) ≤ 750 W.</li>
          <li>100 kVA: P_fe ≤ 130 W, P_cu (FL) ≤ 1100 W.</li>
          <li>200 kVA: P_fe ≤ 200 W, P_cu (FL) ≤ 1900 W.</li>
          <li>500 kVA: P_fe ≤ 360 W, P_cu (FL) ≤ 3850 W.</li>
          <li>1000 kVA: P_fe ≤ 600 W, P_cu (FL) ≤ 6000 W.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Cooling classes — ONAN, ONAF, OFAF and what they mean"
        plainEnglish="Transformer cooling code is two letters then two letters: oil/air, natural/forced. ONAN = Oil Natural, Air Natural — basic radiator cooling. ONAF adds forced air (fans) for ~30 % more capacity. OFAF adds forced oil pumps for another ~50 %. Same transformer can be rated at different kVA depending on which cooling stage is active."
        onSite="On a 1000 kVA ONAN/ONAF distribution transformer, the nameplate may read '1000/1300 kVA'. ONAN gives 1000 kVA continuous; ONAF (with fans running) gives 1300 kVA peak. Know which you are operating at — if the fans fail and the customer keeps drawing 1300 kVA, the transformer overheats and trips on Buchholz protection."
      >
        <p>Cooling class capacity multipliers (typical):</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>ONAN</strong> — base rating, no fans/pumps.
          </li>
          <li>
            <strong>ONAF</strong> — fans on radiators: × 1.30 to × 1.50 capacity.
          </li>
          <li>
            <strong>OFAF</strong> — fans + pumps: × 1.50 to × 1.67 capacity.
          </li>
          <li>
            <strong>ODAF</strong> — directed oil flow: × 1.67 to × 2.00 capacity.
          </li>
          <li>
            <strong>Dry-type AN/AF</strong> — air-natural or air-forced (no oil); for
            indoor/data-centre use.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Buchholz, oil temperature and winding temperature protection"
        plainEnglish="Oil-filled distribution transformers carry three or four protective devices monitoring different fault types. The Buchholz relay (between tank and conservator) detects gas evolution from internal arcing or insulation breakdown. Oil temperature gauge trips on bulk oil overheating. Winding temperature simulator estimates hottest spot using a CT-driven heater + thermistor."
        onSite="Standard transformer inspection routine: 1) Check Buchholz oil level window — should be full. 2) Check oil temp gauge reading vs ambient (10-30 K rise typical at part load). 3) Check winding temp simulator — should track oil temp +5 to +20 K depending on load. 4) If any device shows warning, log readings and report. NEVER reset Buchholz alarm without investigation — it is gas-tight and fires only on real internal events."
      >
        <p>Trip and alarm levels on a typical UK distribution transformer:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Buchholz alarm (gas accumulation): typically 200 ml gas → maintenance call.</li>
          <li>Buchholz trip (oil surge): rapid oil flow → immediate trip of HV breaker.</li>
          <li>Oil temp alarm: 75 °C bulk.</li>
          <li>Oil temp trip: 90 °C bulk.</li>
          <li>Winding temp alarm: 105 °C hottest spot.</li>
          <li>Winding temp trip: 115 °C hottest spot.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Loss reduction strategies for the customer"
        plainEnglish="Customer with an old underloaded transformer asks how to cut energy bills. Three options: (1) Replace with smaller, modern Tier 2 unit if load permanently dropped. (2) Install LED + PFC + harmonic mitigation on the load side. (3) Swap to amorphous-core transformer for ~70 % iron loss reduction. Each has different payback economics."
        onSite="Worked customer scenario: 1980s-vintage 1000 kVA transformer, P_fe = 2.5 kW (way above modern Tier 2 limit of 600 W), running at 30 % average load. Annual no-load energy cost = 2500 W × 8760 h × £0.20/kWh = £4380. Modern 600 kVA Tier 2 amorphous unit P_fe ≈ 200 W. New annual cost = £350. Saving £4030/year. Replacement cost ~£15-20k installed. Payback ~4 years. After that pure savings for next 25+ years."
      >
        <p>Decision matrix for old transformer replacement:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>P_fe &lt; Tier 2 limit, average load &gt; 50 %</strong> — keep transformer.
          </li>
          <li>
            <strong>P_fe 1-2× Tier 2 limit, average load 30-50 %</strong> — consider replace,
            payback 5-10 yr.
          </li>
          <li>
            <strong>P_fe &gt; 2× Tier 2 limit, any load</strong> — replace, payback &lt; 5 yr.
          </li>
          <li>
            <strong>Average load &lt; 25 %</strong> — downsize one rating step AND replace; double
            saving.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Loss measurement on site without taking the transformer out of service"
        plainEnglish="You cannot do a factory-style no-load or short-circuit test on a live transformer. But you can ESTIMATE iron loss from the no-load magnetising current measured by a clamp meter on the primary, and copper loss from the actual load current and known winding resistance. Combine for total loss."
        onSite="Quick on-site loss estimate procedure: 1) Clamp primary line current at off-peak (3am, when load is lowest). Note magnetising VA. 2) Note primary voltage at the same time. 3) Iron loss ≈ V × I_no-load × cos(φ_no-load). The pf at no-load is typically 0.1-0.2 (mostly reactive). 4) Clamp at peak load. Copper loss ≈ I_FL² × R_winding (R from factory cert or measured cold)."
      >
        <p>Worked: 200 kVA 11 kV/433 V distribution transformer.</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Off-peak primary clamp: 0.4 A line at 11 000 V. No-load VA = √3 × 11000 × 0.4 = 7.6
            kVA.
          </li>
          <li>
            No-load pf typical 0.15. P_fe = 7.6 × 0.15 = 1.14 kW (high — Tier 2 limit ~200 W).
          </li>
          <li>Peak primary clamp: 8 A line. Loading = 8/10.5 = 76 % of rated.</li>
          <li>P_cu (FL from cert) = 1.9 kW. P_cu at 76 % = 1.9 × 0.76² = 1.10 kW.</li>
          <li>
            Total loss at peak = 1.14 + 1.10 = 2.24 kW. Annual loss = ~12 000 kWh = £2400/year.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Iron loss = constant (hysteresis + eddy); copper loss = variable (I²R, scales as x²).',
          'Maximum efficiency where Cu loss = Fe loss: x_max = √(P_fe / P_cu_FL).',
          'Efficiency η = P_out / (P_out + P_fe + x² × P_cu_FL).',
          'No-load test → iron loss; short-circuit test → full-load copper loss.',
          'Ecodesign Tier 2 mandatory in UK from July 2021 — limits both Fe and Cu loss.',
          'Quote all-day or typical-load efficiency, not nameplate, for energy reports.',
        ]}
      />

      <Quiz title="Transformer losses knowledge check" questions={quizQuestions2} />
    </div>
  );
}
