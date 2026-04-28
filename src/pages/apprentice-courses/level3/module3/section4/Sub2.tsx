/**
 * Module 3 · Section 4 · Subsection 2 — Single-phase transformer principles (AC 1.2, 1.3)
 * Maps to C&G 2365-03 / Unit 302 / LO1 / AC 1.2, 1.3
 *   AC 1.2 — "describe the properties and principles of transformers"
 *   AC 1.3 — "determine values of voltage, current and turns ratios in transformers"
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 6.5, 6.7
 *
 * How a transformer works. Mutual induction. Turns ratio. Step-up vs step-down.
 * Open-circuit and short-circuit tests.
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
import { TransformerSchematic } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Single-phase transformer principles | Level 3 Module 3.4.2 | Elec-Mate';
const DESCRIPTION =
  'Mutual induction, turns ratio V1/V2 = N1/N2, step-up vs step-down, ideal vs real transformer model and basic tests.';

const checks = [
  {
    id: 'l3-m3-4-2-ratio',
    question:
      'A transformer has 800 primary turns and 100 secondary turns. With 230 V primary, secondary voltage is:',
    options: ['28.75 V', '230 V', '460 V', '1840 V'],
    correctIndex: 0,
    explanation: 'V2 = V1 × (N2/N1) = 230 × (100/800) = 230 × 0.125 = 28.75 V. Step-down.',
  },
  {
    id: 'l3-m3-4-2-current',
    question:
      'Same transformer, secondary load of 10 A. Primary current (ideal):',
    options: ['1.25 A', '8 A', '80 A', '1.0 A'],
    correctIndex: 0,
    explanation:
      'I1/I2 = N2/N1 (inverse ratio). I1 = 10 × (100/800) = 1.25 A. Power = V × I is conserved: 230 × 1.25 = 287 VA = 28.75 × 10. Tick.',
  },
  {
    id: 'l3-m3-4-2-step',
    question:
      'A 11 000 V / 433 V distribution transformer is:',
    options: ['Step-up', 'Step-down', 'Isolation', 'Auto-transformer'],
    correctIndex: 1,
    explanation:
      'Primary higher than secondary = step-down. Common UK pole-mounted distribution transformer feeding a 400 V LV network.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A transformer works by:',
    options: ['Direct conduction', 'Mutual induction between two coils on a magnetic core', 'Electrostatic charging', 'Mechanical motion'],
    correctAnswer: 1,
    explanation:
      'Primary coil creates an alternating flux in the core; secondary coil sits in that flux and an EMF is induced. No physical connection between primary and secondary — pure magnetic coupling.',
  },
  {
    id: 2,
    question: 'Voltage ratio for an ideal transformer:',
    options: ['V1/V2 = N1/N2', 'V1/V2 = I1/I2', 'V1 + V2 = N1 + N2', 'V1 × V2 = constant'],
    correctAnswer: 0,
    explanation: 'V1/V2 = N1/N2. Higher turns ratio = bigger voltage transformation.',
  },
  {
    id: 3,
    question: 'Current ratio for an ideal transformer:',
    options: ['I1/I2 = N1/N2', 'I1/I2 = N2/N1', 'I1 = I2', 'I1 + I2 = constant'],
    correctAnswer: 1,
    explanation: 'I1/I2 = N2/N1 — inverse of the voltage ratio. Step-down voltage = step-up current.',
  },
  {
    id: 4,
    question: 'In an ideal transformer, input apparent power equals:',
    options: ['Half output', 'Output (V1 × I1 = V2 × I2)', 'Twice output', 'Zero'],
    correctAnswer: 1,
    explanation: 'Power conservation. V1 × I1 = V2 × I2. Real transformers have small losses.',
  },
  {
    id: 5,
    question: 'A step-up transformer has more turns on the:',
    options: ['Primary', 'Secondary', 'Core', 'Both equally'],
    correctAnswer: 1,
    explanation: 'Step-up means higher secondary voltage → more secondary turns. Used at generators (11 kV → 132 kV) and at substations onto the grid.',
  },
  {
    id: 6,
    question: 'An isolation transformer has:',
    options: [
      'Primary and secondary at the same voltage, no electrical connection between them',
      'A 10:1 ratio',
      'Three phases',
      'No core',
    ],
    correctAnswer: 0,
    explanation:
      'Isolation = same voltage in and out (typically 1:1), with full electrical separation. Used in medical equipment, hi-fi, sensitive instruments to break ground loops.',
  },
  {
    id: 7,
    question: 'No-load test on a transformer measures:',
    options: ['Winding resistance', 'Iron (core) losses', 'Copper losses', 'Insulation resistance'],
    correctAnswer: 1,
    explanation:
      'No-load test: rated voltage on primary, secondary open. Tiny magnetising current; power drawn = iron losses (hysteresis + eddy).',
  },
  {
    id: 8,
    question: 'Short-circuit test on a transformer measures:',
    options: ['No-load loss', 'Iron losses only', 'Copper losses (winding I²R)', 'Magnetising current'],
    correctAnswer: 2,
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
      "When changing current in one coil produces an EMF in another coil. The mutual inductance M (in henries) measures how much. Tightly coupled (transformer cores) gives high M. Loosely coupled (just two coils side-by-side in air) gives low M.",
  },
  {
    question: "Why do transformers hum at 100 Hz, not 50?",
    answer:
      "Magnetostriction — the core slightly changes length as B varies. B reaches its maximum twice per cycle (positive and negative peaks), so the dimensional change happens at 2 × 50 Hz = 100 Hz. That's the audible hum.",
  },
  {
    question: 'What is "vector group" notation like Dyn11?',
    answer:
      "Letters describe winding connections: D/Y/Z for primary (capital), d/y/z for secondary (lower-case). n means neutral brought out. Number is phase shift in 30° steps. Dyn11 = Delta primary, star secondary, neutral, secondary lags primary by 11 × 30° = 330° (or leads by 30°). Critical for paralleling transformers.",
  },
  {
    question: 'How does an auto-transformer differ?',
    answer:
      "Auto-transformer has a single tapped winding instead of two separate coils. Cheaper and lighter for small voltage ratios (e.g. 230/110 V site transformers). But there's no electrical isolation — primary and secondary share a connection. Not used for safety isolation.",
  },
  {
    question: "What are 'tap changers' on a transformer?",
    answer:
      "Switches that select different turns on the primary or secondary, changing the ratio in small steps (typically ±5 % in 2.5 % steps). Used to compensate for supply voltage variation. Off-circuit tap changers (set when de-energised) are common; on-load tap changers are large and expensive — used at substation level.",
  },
];

export default function Sub2() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4 · Subsection 2"
            title="Single-phase transformer principles"
            description="Mutual induction, turns ratio V1/V2 = N1/N2, ideal vs real model, no-load and short-circuit tests."
            tone="yellow"
          />

          <TLDR
            points={[
              'Transformer = two coils on a shared magnetic core. Primary creates alternating flux; secondary sees that flux and an EMF is induced.',
              'V1/V2 = N1/N2 (turns ratio). Step-up: more secondary turns. Step-down: fewer.',
              'I1/I2 = N2/N1 (inverse). Power conserved (ideal): V1 × I1 = V2 × I2.',
              'No-load test → iron (core) losses. Short-circuit test → copper (winding) losses.',
              "Vector groups (Dyn11 etc.) describe winding configuration and phase shift.",
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
              Same dΦ/dt for both (same core), so:{' '}
              <strong>e₁/e₂ = N₁/N₂</strong> — the famous turns ratio.
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
              <li><strong>V1 / V2 = N1 / N2</strong></li>
              <li><strong>I1 / I2 = N2 / N1</strong></li>
              <li><strong>V1 × I1 = V2 × I2</strong> (apparent power conservation)</li>
            </ul>
            <p>
              Worked example: 11 000 V / 230 V transformer (N1/N2 = 11000/230 = 47.83). Secondary
              load draws 100 A.
              <br />
              I1 = I2 × (N2/N1) = 100 / 47.83 = 2.09 A.
              <br />
              S = 11 000 × 2.09 = 23 000 VA = 23 kVA = 230 × 100. Same VA both sides.
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
                <strong>Step-down distribution</strong> — 11 kV → 433 V or 230 V. The pole-mounted
                or pad-mounted transformer that feeds a street.
              </li>
              <li>
                <strong>Step-up generator</strong> — 11 kV (alternator) → 132/275/400 kV (grid).
                Sits at every power station.
              </li>
              <li>
                <strong>Isolation 1:1</strong> — same voltage, full electrical separation.
                Medical equipment, audio, breaking ground loops.
              </li>
              <li>
                <strong>Auto-transformer</strong> — single tapped winding. Cheaper and lighter for
                small ratios (110/230 V site transformers). No isolation.
              </li>
              <li>
                <strong>Instrument (CT/VT)</strong> — current and voltage transformers used to
                step large currents/voltages down to safe metering levels (e.g. 1000 A → 5 A,
                11 kV → 110 V).
              </li>
              <li>
                <strong>Constant-voltage (ferro-resonant)</strong> — saturates the core
                deliberately to stabilise output voltage against input variation. Used in old
                process control.
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
              Magnetising current is small (~1-5 % of rated). Wattmeter reads iron loss
              (hysteresis + eddy). Voltmeter and ammeter give the magnetising impedance.
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
                ratio, no-load loss, load loss and impedance — the data the designer uses to
                predict efficiency at any load. Never accept a transformer without its test
                certificate.
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
                drives terminal selection — the means of connection must take account of the
                conductor material, class, CSA, number of conductors per terminal, terminal
                temperature in service, and any vibration. Loose primary or secondary lugs
                generate heat that aggravates the iron-loss heat balance you've calculated.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 526.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 526.5 (Termination location)"
            clause="Every termination and joint in a live conductor or a PEN conductor shall be made within one of the following or a combination thereof: (a) a suitable accessory complying with the appropriate product standard; (b) an equipment enclosure complying with the appropriate product standard; (c) an enclosure partially formed or completed with building material which is non-combustible when tested to BS 476-4."
            meaning={
              <>
                Transformer terminations live inside an enclosure rated to the application —
                IP-rated for indoor LV, IP66 for outdoor pad-mount, and stainless or galvanised
                steel for harsh process environments. Reg 526.5 is the rule that stops you
                making "temporary" exposed joints between a transformer and its load — the joint
                must be inside an accessory or enclosure that meets the product standard.
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
                (limited only by core saturation, but enough to flash insulation, melt windings
                and possibly kill someone touching the 24 V terminal block).
              </>
            }
            doInstead={
              <>
                Always check primary and secondary markings BEFORE energising. Most transformers
                have clear voltage labels on each winding. If unmarked, measure resistance: the
                higher-voltage winding has more turns and significantly higher DC resistance.
              </>
            }
          />

          <Scenario
            title="Sizing an isolation transformer for a control panel"
            situation={
              <>
                Customer has a 5 kW machine running 24 V DC controls from a 230 V supply through
                a switching PSU. They want a galvanically isolated 230 V / 24 V transformer plus
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
                The maths chain (DC load → AC input via efficiency → transformer VA size) is
                exactly the same logic for any isolated supply. Pick efficiency factors realistically
                and use the next standard size up.
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
              <li><strong>kVA</strong> — drives cable and protection sizing on both HV and LV side.</li>
              <li><strong>Voltage ratio</strong> — defines turns ratio and confirms compatibility.</li>
              <li><strong>%Z</strong> — drives PSCC calculation on the LV side. PSCC = I_rated × 100 / %Z.</li>
              <li><strong>Vector group</strong> — must match before you parallel two transformers.</li>
              <li><strong>Tap range</strong> — defines how much you can adjust output voltage if it drifts.</li>
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
              <li><strong>Dyn11</strong> — Standard UK distribution. Delta primary, star secondary, neutral, 30° lag.</li>
              <li><strong>Yyn0</strong> — Star-star with no phase shift. Used where neutral on both sides is needed (rare in UK).</li>
              <li><strong>Dyn1</strong> — Same as Dyn11 but secondary leads by 30° instead of lags. Cannot parallel with Dyn11.</li>
              <li><strong>YNd11</strong> — Star-delta common at generator step-up; HV neutral earthed at source.</li>
              <li><strong>Dd0</strong> — Delta-delta no shift. Industrial sites with no neutral need on either side.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Inrush current — why a transformer trips its primary fuse on switch-on"
            plainEnglish="When you energise a transformer at the wrong point in the AC waveform, the core can saturate momentarily — drawing a HUGE inrush current for one or two cycles. Typical inrush is 8-12× rated current, lasting 50-100 ms before settling."
            onSite="Standard practice: protect transformer primary with a TIME-DELAY fuse (motor-rated, gG curve) sized for ~1.5-2× FLC. Standard MCBs (Type B) will trip on inrush every time. Type C is borderline. Type D (8-20× delay) is what you actually want — designed exactly for transformer/motor inrush. On larger units, an inrush-restraint relay or soft-start contactor handles the surge."
          >
            <p>
              Calculating inrush:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Worst case: switch-on at zero crossing of the voltage waveform, with residual flux already in the core.</li>
              <li>Peak inrush ≈ (2 × √2 × V) / (X_lk + X_m_sat) — limited only by leakage reactance and saturated mutual reactance.</li>
              <li>For a 10 kVA 230 V transformer (FLC 43 A): inrush typically 350-500 A peak, decaying over 50-100 ms.</li>
              <li>Type D MCB at 50 A handles this. Type B at 50 A trips instantly.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Insulation testing a transformer — what each reading means"
            plainEnglish="Insulation resistance test on a transformer measures whether the windings are still electrically isolated from each other and from the core/frame. Three readings: HV-to-LV, HV-to-frame, LV-to-frame. All should be in the GΩ range when new; degradation over decades is normal."
            onSite="L3 commissioning routine for a new transformer: use a 5 kV insulation tester (1 kV is not enough on HV windings). Test HV-LV at 5 kV for 1 minute; HV-frame at 5 kV for 1 minute; LV-frame at 1 kV for 1 minute. Record polarisation index (PI) — ratio of 10-min reading to 1-min reading. PI &gt; 2.0 = good insulation; PI &lt; 1.0 = wet/damaged insulation, do not energise."
          >
            <p>Typical pass/fail values:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>New transformer (factory test):</strong> &gt; 1000 MΩ HV-LV, often 10+ GΩ.</li>
              <li><strong>Aged service transformer (in spec):</strong> &gt; 100 MΩ HV-LV.</li>
              <li><strong>Concerning:</strong> 10-100 MΩ — investigate, may be moisture in oil.</li>
              <li><strong>Failed:</strong> &lt; 10 MΩ — out of service immediately, dry/clean/replace.</li>
              <li><strong>Polarisation index:</strong> &gt; 2 = excellent, 1.5-2 = OK, 1-1.5 = caution, &lt; 1 = wet/damaged.</li>
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

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section4-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.1 Magnetic circuits
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section4-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.3 Turns/voltage/current ratio
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
