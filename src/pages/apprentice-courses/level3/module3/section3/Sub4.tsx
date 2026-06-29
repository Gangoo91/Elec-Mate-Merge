/**
 * Module 3 · Section 3 · Subsection 4 — Power factor correction (AC 2.5, 2.6)
 * Maps to C&G 2365-03 / Unit 302 / LO2 / AC 2.5, 2.6
 *   AC 2.5 — "explain what is meant by power factor correction"
 *   AC 2.6 — "specify methods of power factor correction"
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 7.5, 7.6
 *
 * Capacitor sizing for PFC. Q_C = P × (tan φ1 - tan φ2). Static, switched, automatic
 * and active filters compared.
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
import { PowerTriangle } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Power factor correction | Level 3 Module 3.3.4 (AC 2.5, 2.6) | Elec-Mate';
const DESCRIPTION =
  'Q_C = P × (tan φ1 − tan φ2). Capacitor sizing, static vs automatic banks, detuned reactors, active filters. The maths every PFC quote is built on.';

const checks = [
  {
    id: 'l3-m3-3-4-qc',
    question:
      "A factory has P = 100 kW, pf 0.7 lagging. To improve to pf 0.95 lagging, what kVAr capacitor is needed?",
    options: [
      '25 kVAr',
      '69 kVAr',
      '102 kVAr',
      '140 kVAr',
    ],
    correctIndex: 1,
    explanation:
      'tan(cos⁻¹ 0.7) = tan(45.57°) = 1.020. tan(cos⁻¹ 0.95) = tan(18.19°) = 0.329. Q_C = 100 × (1.020 − 0.329) = 100 × 0.691 = 69.1 kVAr.',
  },
  {
    id: 'l3-m3-3-4-cap',
    question:
      "What capacitance (μF) at 230 V single-phase 50 Hz gives 1 kVAr reactive?",
    options: [
      '25 μF',
      '240 μF',
      '120 μF',
      '60 μF',
    ],
    correctIndex: 3,
    explanation:
      'Q = V² / X_C = V² × 2πfC. C = Q / (2πfV²) = 1000 / (2π × 50 × 230²) = 1000 / (16 619 600) ≈ 60 μF.',
  },
  {
    id: 'l3-m3-3-4-method',
    question:
      "An office with 50 kW load varying from 10 kW to 50 kW through the day. Best PFC method?",
    options: [
      'Automatic capacitor bank with multiple stages',
      'A single fixed capacitor sized for 50 kW',
      'A detuned reactor with no capacitors fitted',
      'A series capacitor in each line conductor',
    ],
    correctIndex: 0,
    explanation:
      'Variable load needs variable correction. A single fixed cap sized for 50 kW would over-correct at 10 kW (leading pf, voltage rise risk). An automatic bank switches stages in/out to track the load.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Power factor correction reduces:",
    options: [
      'The real power (kW) drawn by the load',
      'Apparent power and line current for the same real power',
      'The supply voltage delivered to the load',
      'The frequency of the supply at the connection point',
    ],
    correctAnswer: 1,
    explanation:
      "PFC adds capacitive kVAr to cancel inductive kVAr. The vector sum (S) shrinks; line current shrinks. Real power (kW) is unchanged — the customer still uses the same energy.",
  },
  {
    id: 2,
    question: "PFC capacitors are connected:",
    options: [
      'In series with each line conductor',
      'Between neutral and earth at the origin',
      'In parallel across the load (or supply)',
      'In series with the protective device',
    ],
    correctAnswer: 2,
    explanation:
      'PFC caps are always in parallel (shunt). Series capacitors do something completely different (series compensation in HV transmission).',
  },
  {
    id: 3,
    question: "Q_C formula for capacitor bank size to correct from pf₁ to pf₂:",
    options: [
      'Q_C = S × pf₁ × pf₂',
      'Q_C = P × (cos φ₁ − cos φ₂)',
      'Q_C = V × I × pf',
      'Q_C = P × (tan φ₁ − tan φ₂)',
    ],
    correctAnswer: 3,
    explanation:
      'Q_C = P × (tan φ₁ − tan φ₂). Because Q = P × tan φ at any pf, the difference in Q before and after gives the kVAr you need to add.',
  },
  {
    id: 4,
    question: "Detuned reactors are added to PFC banks to:",
    options: [
      'Avoid resonance with supply harmonics that would amplify them',
      'Increase the kVAr output of each capacitor stage',
      'Provide overcurrent protection for the capacitor bank',
      'Convert the capacitors from leading to lagging operation',
    ],
    correctAnswer: 0,
    explanation:
      "A bare PFC cap can resonate with supply inductance at a harmonic frequency (typically 5th, 7th). The reactor lowers the resonant frequency below the dominant harmonic, preventing amplification.",
  },
  {
    id: 5,
    question: 'Active harmonic filters work by:',
    options: [
      'Adding fixed capacitance to raise the power factor only',
      'Injecting opposite-phase harmonic currents to cancel the load harmonics',
      'Blocking all current above the fundamental with a series choke',
      'Switching the supply off whenever harmonics exceed a set limit',
    ],
    correctAnswer: 1,
    explanation:
      'AHFs measure the harmonic content drawn by the load and inject an equal-and-opposite current in real time, leaving only the fundamental in the supply. Used where passive PFC + reactor isn\'t enough.',
  },
  {
    id: 6,
    question: 'Over-correcting with too much capacitance causes:',
    options: [
      'A further drop in supply voltage at the busbar',
      'A reduction in the real power consumed',
      'Leading pf and possible voltage rise',
      'Lagging pf and increased line current',
    ],
    correctAnswer: 2,
    explanation:
      'Beyond unity, you get leading pf — the install now sources kVAr to the network. Risks include voltage rise, capacitor stress and resonance amplification.',
  },
  {
    id: 7,
    question: 'Static PFC (single fixed capacitor) is best for:',
    options: [
      'Loads that vary widely throughout the day',
      'Installations with high harmonic distortion',
      'Sites needing precise pf held at exactly 0.95',
      'Constant-load motors that run continuously',
    ],
    correctAnswer: 3,
    explanation:
      'Single big motor running continuously = constant Q = single fixed capacitor matches it. Variable loads need multi-stage switching.',
  },
  {
    id: 8,
    question:
      'A load improves from S = 20 kVA to S = 12 kVA after PFC. The line current drops by what factor?',
    options: [
      '12/20 = 0.6× of original',
      'Half',
      'No change',
      '20/12 = 1.67×',
    ],
    correctAnswer: 0,
    explanation:
      'I = S / V (or S / (√3 V_L)). Halving S halves I. Going from 20 kVA → 12 kVA: I drops to 12/20 = 60 % of original.',
  },
];

const faqs = [
  {
    question: 'Why does adding a capacitor reduce current?',
    answer:
      "The motor draws lagging (inductive) reactive current. The capacitor draws leading (capacitive) reactive current — equal and opposite. They cancel locally, so the supply only has to carry the real-power current. Apparent power S shrinks, line current shrinks, transformer and cable losses shrink.",
  },
  {
    question: "Doesn't PFC cost more in caps than it saves on bills?",
    answer:
      "Depends on the load. For an industrial site with sustained kW above ~50 with poor pf, the maximum demand (kVA) charge alone usually justifies PFC inside 18 months. For a small commercial unit running at light load, the payback can be 5+ years and isn't worth it.",
  },
  {
    question: 'How is automatic PFC different from static?',
    answer:
      "Static = one fixed capacitor sized for one operating point. Automatic = several smaller capacitors switched in by a controller that measures the network pf in real time. Automatic banks track varying loads (typical office, mixed industrial) without ever over-correcting.",
  },
  {
    question: 'Do LED lamps have power factor?',
    answer:
      "Yes — and modern LED drivers are usually pf &gt; 0.9. Cheap unbranded drivers can be 0.5-0.7. The IEC 61000-3-2 standard limits harmonic emissions for any lamp ≥ 25 W, which forces decent PFC at the driver level.",
  },
  {
    question: "What's the difference between PFC and harmonic filtering?",
    answer:
      "PFC corrects the FUNDAMENTAL phase angle (50 Hz). Harmonic filtering removes higher-frequency content (250, 350 Hz, etc.) that PFC alone won't fix and can actually amplify. Modern installs with VFDs and switching loads often need BOTH detuned PFC AND active harmonic filtering.",
  },
  {
    question: 'Where is the PFC capacitor physically installed?',
    answer:
      "Three options. (1) At each individual motor — best for variable loads but expensive. (2) At sub-DBs feeding groups of motors — compromise. (3) At the main incoming switchboard as a single big bank — cheapest, but only corrects up to that point so doesn't reduce internal cable losses. Most industrial installs use main-board correction with motor-level on the largest machines.",
  },
];

export default function Sub4() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 3 · Subsection 4"
            title="Power factor correction"
            description="Q_C = P × (tan φ1 − tan φ2). Sizing capacitor banks, static vs automatic, detuned reactors and active harmonic filters."
            tone="yellow"
          />

          <TLDR
            points={[
              'PFC adds capacitive kVAr to cancel inductive kVAr → smaller S, smaller line current, smaller losses.',
              'Q_C (kVAr) = P (kW) × (tan φ₁ − tan φ₂). φ from cos⁻¹(pf).',
              'Single capacitance: C = Q / (2πfV²). 60 μF at 230 V/50 Hz ≈ 1 kVAr.',
              'Static = constant load. Automatic banks = variable load. Detuned reactors avoid harmonic resonance. Active filters cancel harmonics.',
              'UK DNO target: ≥ 0.95 lagging averaged 30 min during high demand (P28/2).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Calculate the kVAr capacitor needed to improve pf from one value to another.',
              'Convert kVAr at a given voltage and frequency into a capacitance in μF.',
              'Compare static, switched, automatic and active PFC methods.',
              'Explain why detuned reactors are added on installations with significant harmonic content.',
              'Describe DNO requirements for power factor and the consequences of poor pf.',
            ]}
            initialVisibleCount={3}
          />

          <PowerTriangle />

          <ContentEyebrow>Why correct power factor</ContentEyebrow>

          <ConceptBlock
            title="The capacitor cancels the inductor's reactive current"
            plainEnglish="A motor draws lagging current. Add a capacitor in parallel and it draws leading current. They cancel each other in the supply cable, so the supply transformer only has to deliver the real (kW) current."
            onSite="Without PFC: 100 kW factory at pf 0.7 draws S = 143 kVA = 206 A line at 400 V. With PFC to 0.95: S = 105 kVA = 152 A. That's a 26 % drop in cable current — and the transformer can supply more real load before hitting its kVA limit."
          >
            <p>
              The benefits of correction:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lower line current → smaller cable, less I²R loss in cables and transformer.</li>
              <li>Better voltage regulation — less drop on long feeders.</li>
              <li>Frees up spare capacity in upstream switchgear and transformers.</li>
              <li>Avoids DNO kVA or kVAr penalty charges.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Sizing the capacitor bank</ContentEyebrow>

          <ConceptBlock
            title="Q_C = P × (tan φ₁ − tan φ₂)"
            plainEnglish="To go from old power factor pf₁ to new pf₂, you need to subtract the existing reactive power from the desired reactive power. Both are P × tan φ, so the formula simplifies."
          >
            <p>
              <strong>Q_C = P × (tan φ₁ − tan φ₂)</strong>
            </p>
            <p>Worked example: factory at 200 kW, pf 0.65 lagging. Improve to pf 0.95 lagging.</p>
            <p>
              φ₁ = cos⁻¹(0.65) = 49.46°. tan φ₁ = 1.169.
              <br />
              φ₂ = cos⁻¹(0.95) = 18.19°. tan φ₂ = 0.329.
              <br />
              Q_C = 200 × (1.169 − 0.329) = 200 × 0.840 = 168 kVAr.
            </p>
            <p>
              The factory needs a 168 kVAr capacitor bank. (Specify next standard size up — 175
              or 200 kVAr — and detuning to suit harmonic content.)
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Converting kVAr to actual capacitance"
            plainEnglish="At a given voltage and frequency, a capacitor's reactive power output is fixed by its capacitance. Use Q = V² × 2πfC."
          >
            <p>
              <strong>C = Q / (2πfV²)</strong>
            </p>
            <p>
              For a 168 kVAr 3-phase bank at 400 V (delta-connected, each cap sees 400 V line):
              <br />
              Per cap: Q = 168 / 3 = 56 kVAr.
              <br />
              C = 56 000 / (2π × 50 × 400²) = 56 000 / 50 265 000 = 1.114 × 10⁻³ F = 1114 μF per
              winding.
              <br />
              Three of those caps in delta gives the full 168 kVAr.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Methods of correction</ContentEyebrow>

          <ConceptBlock
            title="Static, switched, automatic, active"
            plainEnglish="Pick the method that matches the load profile. Constant load = static. Variable load = automatic. Significant harmonics = detuned or active."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Static (single fixed cap)</strong> — installed at the motor terminals.
                Best for big motors that run continuously at constant load. Switched on/off with
                the motor.
              </li>
              <li>
                <strong>Switched (manual stages)</strong> — a few capacitor banks switched in
                manually as load grows. Old-fashioned; rarely installed new.
              </li>
              <li>
                <strong>Automatic PFC bank</strong> — controller measures pf, switches in/out a
                stepped sequence of capacitors via contactors or thyristors. Tracks variable
                loads. Standard for mixed industrial sites.
              </li>
              <li>
                <strong>Detuned PFC bank</strong> — automatic bank with a series reactor
                (typically 7 % or 14 % detuning) to lower the resonant frequency below dominant
                harmonics (5th, 7th). Required where harmonic content &gt; 5 % THD.
              </li>
              <li>
                <strong>Active Harmonic Filter (AHF)</strong> — power-electronic device that
                injects opposite-phase harmonic currents in real time. Cancels harmonics back to
                the fundamental. Used on high-VFD-content sites where passive isn't enough.
              </li>
              <li>
                <strong>Static VAr Generator (SVG)</strong> — modern alternative to AHF/PFC,
                provides smooth fast leading or lagging kVAr without capacitor steps. Premium
                solution for sensitive loads.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <RegsCallout
            source="BS EN 61921:2017 — Power capacitors — Low-voltage power factor correction banks"
            clause="Capacitor banks intended for connection to networks with significant harmonic distortion shall be detuned (i.e. fitted with a series reactor) to avoid resonance with the network impedance and to limit the harmonic current absorbed by the capacitors."
            meaning={
              <>
                Modern UK installs with LED lighting, VFDs, EV chargers and PV inverters
                routinely have THD &gt; 5 %. A bare PFC bank can resonate at 5th harmonic
                (250 Hz) and amplify it 10-fold, blowing capacitors. Detuning is now the default
                for new PFC banks.
              </>
            }
            cite="Source: BS EN 61921:2017."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 444.4.1 (Cable separation, EMI)"
            clause="The minimum separation between the information technology cables and mains power cables includes all allowances for cable movement between their fixing points or other restraints. The minimum separation requirement applies in three dimensions. However, where information technology cables and mains power cables are required to cross and required minimum separation cannot be maintained then maintaining the angle of their crossing at 90 degrees on either side of the crossing for a distance no less than the applicable minimum separation requirement will minimize any electromagnetic disturbances."
            meaning={
              <>
                Mutual inductance between adjacent cables transfers harmonic noise from a power
                feeder onto a data cable in the same tray. Reg 444.4.1 fixes physical separation
                in all three dimensions; where you must cross, do it at 90° to drop the coupling
                coefficient toward zero. This is the regulation that comes from the very same
                Faraday/coupled-circuit physics you've worked through in this Sub.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 444.4.1; BS EN 50174."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 444.4.2.1 (Measures to reduce EMI)"
            clause="The following measures shall be considered, where appropriate, in order to reduce the effects of electromagnetic interference: where screened signal or data cables are used, care should be taken to limit the fault current from power systems flowing through the screens and cores of signal cables, or data cables, which are earthed."
            meaning={
              <>
                Inductive coupling and shared earth paths are how harmonics escape onto telephone
                pairs, BMS bus and data backbones. Reg 444.4.2.1 lays out the practical measures:
                screening, single-point screen earthing where appropriate, and segregated
                containment. The cable separation table (e.g. 50 mm at &lt; 35 m, 200 mm at
                &lt; 100 m) gives you defensible numbers.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 444.4.2.1; Section 444."
          />

          <SectionRule />

          <CommonMistake
            title="Sizing PFC for the worst load case and leaving it static"
            whatHappens={
              <>
                Designer specifies a single 100 kVAr capacitor bank for a factory that draws
                100 kW peak but averages 30 kW. At 30 kW load with the static bank still
                connected, pf goes leading → 0.7 leading. Voltage rises 5 V on the busbar.
                Capacitor over-currents trip. DNO not happy.
              </>
            }
            doInstead={
              <>
                Variable loads need automatic PFC banks with multiple stages. Controller switches
                steps in/out as load varies, keeping pf around 0.95 lagging. Even with a constant
                machine, automatic banks are now standard practice because they handle other
                loads on the same supply gracefully.
              </>
            }
          />

          <Scenario
            title="Sizing PFC for a small engineering workshop"
            situation={
              <>
                Workshop: 4 × 5 kW lathes (running together, pf 0.78), 1 × 11 kW grinder (pf 0.82),
                lighting and ancillaries 5 kW (pf 0.95). DNO has flagged poor pf and is threatening
                a kVA charge. Customer wants to bring pf to 0.95 lagging.
              </>
            }
            whatToDo={
              <>
                Total real power P:
                <br />
                — Lathes: 4 × 5 = 20 kW.
                <br />
                — Grinder: 11 kW.
                <br />
                — Other: 5 kW.
                <br />
                Total P = 36 kW.
                <br />
                Reactive Q per group:
                <br />
                — Lathes: tan(cos⁻¹ 0.78) = 0.802; Q = 20 × 0.802 = 16.04 kVAr.
                <br />
                — Grinder: tan(cos⁻¹ 0.82) = 0.698; Q = 11 × 0.698 = 7.68 kVAr.
                <br />
                — Other: tan(cos⁻¹ 0.95) = 0.329; Q = 5 × 0.329 = 1.65 kVAr.
                <br />
                Total Q = 25.37 kVAr. Initial pf = 36 / √(36² + 25.37²) = 36 / 44.05 = 0.817.
                <br />
                Target Q at pf 0.95: Q_target = 36 × tan(18.19°) = 36 × 0.329 = 11.84 kVAr.
                <br />
                Q_C needed = 25.37 − 11.84 = 13.53 kVAr.
                <br />
                Specify a 15 kVAr automatic bank, three stages of 5 kVAr each, detuned at 7 % (in
                case LED retrofit or VFDs added later).
              </>
            }
            whyItMatters={
              <>
                The arithmetic is exactly the formula in this Sub. Sum P, sum Q (separately for
                each load), find current pf, calculate Q_C from the difference. Five minutes with
                a calculator, then write the spec.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Apprentice depth — PFC retrofit on a real install</ContentEyebrow>

          <ConceptBlock
            title="Surveying for PFC — what you measure before quoting"
            plainEnglish="A PFC quote needs three numbers: peak real power P (kW), worst-case pf, and the harmonic profile (THD%) at the connection point. You also need to know how variable the load is — that drives static vs automatic choice."
            onSite="Hire a 3-phase PQ logger (Fluke 1738, Hioki PW3360 or similar). Clamp on the incoming busbar at the main switchboard. Log for at least 7 days covering a normal working week. Pull the report and look at: max kW, min/avg/max pf per phase, THD V, THD I per phase, and the load profile shape over the day."
          >
            <p>What each measurement tells you:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Peak P</strong> → drives Q_C calculation.</li>
              <li><strong>Worst pf</strong> → drives target improvement.</li>
              <li><strong>Load variability (max P / min P)</strong> → static vs automatic choice. &gt; 2× ratio = automatic.</li>
              <li><strong>THD I &gt; 5 %</strong> → mandatory detuning. THD I &gt; 15 % → consider AHF.</li>
              <li><strong>5th and 7th harmonic %</strong> → drives detuning frequency choice (7 % or 14 %).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Detuning percentages explained — 7 % vs 14 %"
            plainEnglish="A detuning reactor lowers the resonant frequency of the cap+supply network so it sits BELOW the lowest dominant harmonic. The percentage refers to how much voltage drops across the reactor at fundamental frequency. Lower percentage = higher tuning frequency."
            onSite="UK rule of thumb: 7 % (189 Hz tuned, well below 5th = 250 Hz) for installs dominated by 6-pulse VFDs and traditional rectifier loads — most industrial sites. 14 % (134 Hz tuned, below 3rd = 150 Hz) for installs with significant 3rd harmonic from single-phase non-linear loads (LED, switching PSUs in offices). Pick the lower (looser) detuning where possible — costs less, runs cooler."
          >
            <p>
              Why detuning matters: an undetuned cap forms an LC tank with the supply impedance. If
              that tank resonates near a load harmonic, the harmonic current can be amplified
              5-10×. Capacitors blow, fuses pop, contactors weld. Detuning forces resonance to a
              frequency where there is no harmonic to amplify.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="When to quote PFC at the motor vs at the main board"
            plainEnglish="Motor-level PFC corrects from the motor terminals back through every cable. Main-board PFC only corrects from the main board to the supply — internal cables still carry the inductive current. Motor-level wins on big single machines; main-board wins on diverse loads."
            onSite="Standard L3 design rule: any single motor &gt; 30 kW running &gt; 50 % of operating hours warrants its own static PFC capacitor at the starter. Smaller motors and mixed loads go on a central automatic bank. Hybrid is most common — central bank handles variable load, big motors get individual caps."
          >
            <p>Sizing motor-level PFC (rule of thumb):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Q_C ≈ motor rated kW × (pf_old → pf 0.95) factor.</li>
              <li>For pf 0.85 → 0.95: Q_C ≈ 0.29 × kW. (e.g. 30 kW motor → 8.7 kVAr cap.)</li>
              <li>For pf 0.78 → 0.95: Q_C ≈ 0.47 × kW.</li>
              <li>NEVER over-correct — leading pf at light load can cause self-excitation if the motor is disconnected from supply with cap still attached. Cap must switch with the motor.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="PFC payback maths — what the customer wants to see"
            plainEnglish="The customer cares about two numbers: how much will it save per year, and how long until the cap pays for itself. Savings come from three places: kWh reduction (cable losses), kVA charge reduction, kVAr surcharge elimination. The payback period is just install cost ÷ annual saving."
            onSite="Worked: 200 kW factory, pf 0.7 currently, kVA charge £4.50/kVA/month, no kVAr penalty (yet). Current S = 286 kVA; corrected to 0.95 → S = 211 kVA. Saving 75 kVA × £4.50 × 12 = £4050/year on availability charges alone. Plus ~1.5 % cable I²R reduction on say 200 000 kWh/year × £0.20/kWh = £600. Total ≈ £4650/year. PFC bank install cost ~£12 000. Payback = 12 000 / 4650 = 2.6 years."
          >
            <p>Quick cost-benefit table for typical industrial sites (UK 2026 prices, illustrative):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>50 kW @ pf 0.7: bank ~£4-6k, save £1.0-1.5k/yr, payback 3-5 yr.</li>
              <li>100 kW @ pf 0.7: bank ~£6-9k, save £2-3k/yr, payback 2-4 yr.</li>
              <li>250 kW @ pf 0.7: bank ~£12-18k, save £5-8k/yr, payback 1.5-3 yr.</li>
              <li>500 kW @ pf 0.7: bank ~£20-30k, save £10-15k/yr, payback 1.5-2 yr.</li>
            </ul>
            <p>
              Above 100 kW with poor pf, PFC almost always pays back inside 3 years. Below 30 kW
              it rarely makes economic sense unless the kVAr penalty is already biting.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'PFC reduces line current and apparent power for the same real power — saves cable losses, kVA charges and DNO penalties.',
              'Q_C (kVAr) = P × (tan φ₁ − tan φ₂). Cap size = required reactive power.',
              'C (μF) = Q × 10⁶ / (2π × f × V²). At 230 V/50 Hz, 60 μF ≈ 1 kVAr.',
              'Static = constant load; automatic = variable load; detuned = harmonic content; active = full cancellation.',
              'Over-correction → leading pf → voltage rise → capacitor stress → controller resonance.',
              'Modern installs default to detuned automatic banks because of widespread harmonic loads.',
              'P28/2 — UK DNO requires ≥ 0.95 lagging averaged 30 min during peak demand.',
            ]}
          />

          <Quiz title="Power factor correction knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section3-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.3 Power triangle
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section3-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.5 Neutral current and load balancing
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
