/**
 * Module 3 · Section 2 · Subsection 5 — Inductance, capacitance and reactance (AC 2.1, 2.2)
 * Maps to C&G 2365-03 / Unit 302 / LO2 / AC 2.1, 2.2
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 7.1, 7.2
 *   AC 7.1 — "explain the relationship between resistance, inductance, capacitance and impedance"
 *   AC 7.2 — "calculate unknown values of resistance, inductance, inductive reactance, capacitance, capacitive reactance and impedance"
 *
 * Inductors store energy in a magnetic field. Capacitors store it in an electric field.
 * Both react to AC frequency in opposite directions. Combine with R and you get
 * impedance Z — the AC equivalent of resistance.
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
import { CapacitorSymbol, InductorSymbol } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Inductance, capacitance and reactance | Level 3 Module 3.2.5 | Elec-Mate';
const DESCRIPTION =
  'X_L = 2πfL, X_C = 1/(2πfC). Combine with R using Pythagoras to get impedance Z. The maths behind every PF correction capacitor and motor winding.';

const checks = [
  {
    id: 'l3-m3-2-5-xl',
    question:
      'Inductive reactance of a 0.05 H inductor at 50 Hz:',
    options: [
      '7.85 Ω',
      '15.7 Ω',
      '157 Ω',
      '0.785 Ω',
    ],
    correctIndex: 1,
    explanation:
      'X_L = 2πfL = 2 × π × 50 × 0.05 = 15.7 Ω. Reactance rises with frequency — at 60 Hz it would be 18.85 Ω.',
  },
  {
    id: 'l3-m3-2-5-xc',
    question:
      'Capacitive reactance of a 100 μF capacitor at 50 Hz:',
    options: [
      '31.8 Ω',
      '3.18 Ω',
      '318 Ω',
      '0.318 Ω',
    ],
    correctIndex: 0,
    explanation:
      'X_C = 1/(2πfC) = 1/(2 × π × 50 × 100 × 10⁻⁶) = 1/0.0314 = 31.83 Ω. Reactance falls as frequency rises — opposite to inductors.',
  },
  {
    id: 'l3-m3-2-5-z',
    question:
      'A series RL circuit: R = 6 Ω, X_L = 8 Ω. Impedance Z =',
    options: [
      '14 Ω',
      '10 Ω',
      '2 Ω',
      '48 Ω',
    ],
    correctIndex: 1,
    explanation:
      'Z = √(R² + X_L²) = √(36 + 64) = √100 = 10 Ω. Pythagoras applied to the impedance triangle.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Inductance is measured in:',
    options: [
      'Farad',
      'Henry',
      'Tesla',
      'Coulomb',
    ],
    correctAnswer: 1,
    explanation: 'Henry (H). 1 H = 1 V across the inductor when current changes at 1 A/s.',
  },
  {
    id: 2,
    question: 'Capacitance is measured in:',
    options: [
      'Tesla',
      'Henry',
      'Farad',
      'Joule',
    ],
    correctAnswer: 2,
    explanation: 'Farad (F). 1 F = 1 C of charge stored per volt across the capacitor.',
  },
  {
    id: 3,
    question: 'Inductive reactance X_L equals:',
    options: [
      '2πfC',
      '1/(2πfC)',
      'L/C',
      '2πfL',
    ],
    correctAnswer: 3,
    explanation: 'X_L = 2πfL = ωL. Higher frequency → higher reactance → less current.',
  },
  {
    id: 4,
    question: 'Capacitive reactance X_C equals:',
    options: [
      '1/(2πfC)',
      '2πfC',
      '2πfL',
      'C × f',
    ],
    correctAnswer: 0,
    explanation: 'X_C = 1/(2πfC). Higher frequency → lower reactance → more current.',
  },
  {
    id: 5,
    question: 'In a pure inductor, the current:',
    options: [
      'Leads voltage by 90°',
      'Lags voltage by 90°',
      'Lags by 180°',
      'Is in phase with voltage',
    ],
    correctAnswer: 1,
    explanation:
      'Voltage leads current by 90° in an inductor. Current can\'t change instantly because the inductor opposes change. Mnemonic: ELI (E leads I in L).',
  },
  {
    id: 6,
    question: 'In a pure capacitor, the current:',
    options: [
      'Is in phase with voltage',
      'Lags voltage by 90°',
      'Leads voltage by 90°',
      'Leads by 180°',
    ],
    correctAnswer: 2,
    explanation:
      'Current leads voltage by 90° in a capacitor. The cap charges up to follow voltage. Mnemonic: ICE (I leads E in C).',
  },
  {
    id: 7,
    question:
      'Series R-L-C: R = 8, X_L = 6, X_C = 0. Impedance:',
    options: [
      '8 Ω',
      '6 Ω',
      '14 Ω',
      '10 Ω',
    ],
    correctAnswer: 3,
    explanation:
      'Net reactance X = X_L − X_C = 6 − 0 = 6 Ω. Z = √(R² + X²) = √(64 + 36) = √100 = 10 Ω.',
  },
  {
    id: 8,
    question: 'Resonance occurs when:',
    options: [
      'X_L = X_C, so net reactance is zero',
      'R equals X_L, so impedance is at its maximum',
      'X_C is twice X_L, so the circuit is purely capacitive',
      'The supply frequency is exactly 50 Hz regardless of L and C',
    ],
    correctAnswer: 0,
    explanation:
      'At resonance, inductive and capacitive reactance cancel exactly. Z = R only, current is maximum, and the circuit looks purely resistive. f_r = 1 / (2π√(LC)).',
  },
];

const faqs = [
  {
    question: 'Why do inductors and capacitors have a phase shift but resistors don\'t?',
    answer:
      "Resistors dissipate energy as heat — current and voltage rise and fall together. Inductors store energy in a magnetic field; the field can't change instantly so the current lags. Capacitors store charge; the charge can't appear instantly so the voltage lags the current. Both store-and-release behaviours produce the 90° phase shift.",
  },
  {
    question: "What's the difference between resistance and reactance?",
    answer:
      "Both oppose current and have units of ohms. Resistance dissipates energy as heat (real power, watts). Reactance just stores and returns energy each cycle — no net energy lost (reactive power, VAr). Both contribute to total impedance Z.",
  },
  {
    question: 'Why does X_L go UP with frequency but X_C go DOWN?',
    answer:
      "An inductor's voltage = L × di/dt. Higher frequency = faster current change = bigger voltage drop = more opposition. A capacitor's current = C × dv/dt. Higher frequency = faster voltage change = bigger current = LESS apparent opposition. Same physics, mirror image.",
  },
  {
    question: 'How does this relate to the work I do in a CU?',
    answer:
      "Every motor, fluorescent ballast, transformer and contactor coil is an inductance. The current lagging the voltage is what creates a poor power factor — and what power-factor correction capacitors are added to fix. Sub 3.4 and 3.5 cover this.",
  },
  {
    question: 'Are RLC circuits really used outside textbooks?',
    answer:
      "Yes. EMC filters on VFDs and LED drivers are LC networks. Resonant fluorescent ballasts. Power-factor correction circuits. Switching converters in inverters and EV chargers. The maths in this Sub is the foundation for designing or fault-finding any of them.",
  },
  {
    question: 'What is impedance triangle Z = R + jX really showing me?',
    answer:
      "It's a vector picture. R points along the horizontal (resistive). X points vertical (reactive). Z is the hypotenuse — the total opposition. The angle between Z and R is the phase angle φ; cos φ is power factor. Same triangle, used to derive every AC quantity.",
  },
];

export default function Sub5() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 3 · Section 2 · Subsection 5"
            title="Inductance, capacitance and reactance"
            description="X_L = 2πfL. X_C = 1/(2πfC). Pythagoras gives impedance Z. The maths behind every motor winding and every PFC capacitor."
            tone="yellow"
          />

          <TLDR
            points={[
              'Inductors store energy in a magnetic field; capacitors in an electric field. Both react to AC by frequency.',
              'X_L = 2πfL — rises with frequency. X_C = 1/(2πfC) — falls with frequency.',
              'In an inductor, voltage leads current by 90° (ELI). In a capacitor, current leads voltage (ICE).',
              'Impedance Z = √(R² + X²), where X = X_L − X_C. Phase angle φ = arctan(X/R).',
              'Resonance: X_L = X_C cancel; Z = R only; current peaks. f_r = 1/(2π√LC).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define inductance (H) and capacitance (F) and explain energy storage in each.',
              'Calculate inductive and capacitive reactance from L, C and frequency.',
              'Apply Pythagoras to find impedance Z in series R-L, R-C and R-L-C circuits.',
              'Identify the phase relationship between V and I in pure R, L, and C.',
              'Calculate the resonant frequency of an LC circuit.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Inductance — opposing change in current</ContentEyebrow>

          <ConceptBlock
            title="An inductor stores energy in its magnetic field"
            plainEnglish="A coil of wire. When current flows, it creates a magnetic field. Try to change the current and the collapsing/growing field induces a back-EMF that opposes the change. That opposition IS inductance."
            onSite="Every motor winding, every transformer winding, every contactor coil and every fluorescent ballast is an inductor. The lagging current they all draw is what creates poor power factor in commercial installs."
          >
            <p>
              <strong>v(t) = L × di/dt</strong> — voltage across an inductor depends on the rate
              of change of current.
            </p>
            <p>
              Inductance is measured in henries (H). Practical inductors at 50 Hz are usually
              tens to hundreds of mH. A motor winding might be 50-200 mH. A fluorescent choke
              ballast was typically 1-3 H. EMC filters use μH.
            </p>
            <p>
              Energy stored: <strong>W = ½ × L × I²</strong>. A 0.5 H inductor carrying 10 A
              stores 25 J — released as a spark if you suddenly break the circuit (which is why
              you fit a freewheel diode across DC inductive loads).
            </p>
          </ConceptBlock>

          <InductorSymbol />

          <ConceptBlock
            title="Inductive reactance X_L"
            plainEnglish="In AC, the inductor's opposition to current depends on frequency. The faster the AC swings, the harder it is for the current to follow."
          >
            <p>
              <strong>X_L = 2πfL = ωL</strong> (ohms)
            </p>
            <p>Worked example: a 0.5 H inductor on 50 Hz mains.</p>
            <p>
              X_L = 2π × 50 × 0.5 = 157 Ω. So with 230 V across it, current = 230 / 157 = 1.46 A
              — and it lags the voltage by 90°.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Capacitance — opposing change in voltage</ContentEyebrow>

          <ConceptBlock
            title="A capacitor stores energy in its electric field"
            plainEnglish="Two conductive plates separated by an insulator (dielectric). Connect a voltage and charge accumulates on the plates. The capacitor opposes any change in the voltage across it."
          >
            <p>
              <strong>i(t) = C × dv/dt</strong> — current depends on the rate of change of
              voltage.
            </p>
            <p>
              Capacitance is measured in farads (F). Practical capacitors are μF, nF, pF. PFC
              capacitors are tens of μF. EMC filter caps are nF. Smoothing caps in PSUs are
              hundreds of μF up to thousands.
            </p>
            <p>
              Energy stored: <strong>W = ½ × C × V²</strong>. A 100 μF cap charged to 325 V (peak
              of UK mains) stores 5.3 J — enough to give a memorable shock if discharged through
              you. Always test capacitors discharged before working on them.
            </p>
          </ConceptBlock>

          <CapacitorSymbol />

          <ConceptBlock
            title="Capacitive reactance X_C"
            plainEnglish="At AC, the capacitor's opposition to current depends on frequency. The faster the voltage swings, the more the cap charges and discharges, and the more current flows."
          >
            <p>
              <strong>X_C = 1/(2πfC) = 1/(ωC)</strong> (ohms)
            </p>
            <p>
              Worked example: a 100 μF capacitor at 50 Hz.
              <br />
              X_C = 1 / (2π × 50 × 100 × 10⁻⁶) = 1 / 0.03142 = 31.83 Ω.
              <br />
              At 230 V, current = 230 / 31.83 = 7.22 A — leading the voltage by 90°.
            </p>
            <p>
              Note the difference from X_L: as frequency rises, X_L grows but X_C shrinks. They
              are mirror-image behaviours.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Combining R, L and C — impedance Z</ContentEyebrow>

          <ConceptBlock
            title="Impedance is the AC equivalent of resistance"
            plainEnglish="In an AC circuit with a mix of R, L and C, you can't just add ohms — the inductive and capacitive reactances are 90° out of phase with the resistance. You combine them as vectors using Pythagoras."
          >
            <p>For a series R-L circuit:</p>
            <p>
              <strong>Z = √(R² + X_L²)</strong>; phase angle φ = arctan(X_L / R), current lags
              voltage.
            </p>
            <p>For a series R-C circuit:</p>
            <p>
              <strong>Z = √(R² + X_C²)</strong>; phase angle φ = arctan(−X_C / R), current leads
              voltage.
            </p>
            <p>For a series R-L-C circuit:</p>
            <p>
              <strong>X = X_L − X_C</strong>; <strong>Z = √(R² + X²)</strong>. Phase angle sign
              depends on whether L or C dominates.
            </p>
            <p>
              Worked example: R = 6 Ω, X_L = 12 Ω, X_C = 4 Ω.
              <br />
              X = 12 − 4 = 8 Ω. Z = √(36 + 64) = 10 Ω.
              <br />
              At 230 V: I = 230 / 10 = 23 A. φ = arctan(8/6) = 53.1° (current lags, since X_L
              dominates).
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Resonance</ContentEyebrow>

          <ConceptBlock
            title="Series vs parallel L and C — combination rules"
            plainEnglish="Inductors in series add (like resistors); inductors in parallel combine reciprocally. Capacitors do the OPPOSITE: parallel adds, series combines reciprocally. Easy to muddle — picture the geometry. Two caps in parallel = bigger plate area = bigger C. Two caps in series = thicker dielectric = smaller C."
          >
            <p>For inductors:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Series: L_T = L₁ + L₂ + L₃ + … (same as resistors)</li>
              <li>Parallel: 1/L_T = 1/L₁ + 1/L₂ + … (same as resistors)</li>
            </ul>
            <p>For capacitors (the opposite):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Parallel: C_T = C₁ + C₂ + C₃ + …</li>
              <li>Series: 1/C_T = 1/C₁ + 1/C₂ + …; for two: C_T = (C₁ × C₂) / (C₁ + C₂).</li>
            </ul>
            <p>
              Worked example: two 100 μF capacitors. In parallel: C_T = 200 μF. In series: C_T =
              (100 × 100)/(100 + 100) = 10 000/200 = 50 μF. Voltage rating doubles in series
              (handy when you need a higher-voltage cap from two lower-rated ones — common in
              high-voltage strings, but you need balancing resistors).
            </p>
            <p>
              Power-factor correction banks parallel multiple capacitors for higher capacitance
              at the line voltage. Smoothing in PSUs uses parallel caps to lower equivalent
              series resistance and share ripple current.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="When X_L = X_C they cancel out"
            plainEnglish="At one specific frequency, inductive and capacitive reactance are equal. They cancel, leaving only R. The circuit looks purely resistive — current is maximum, power factor is 1.0, and the supply sees the smallest possible impedance."
            onSite="Resonance is what tunes a radio or a fluorescent ballast. It can also be a problem — a PFC capacitor sized wrongly can resonate with the supply inductance and amplify harmonics. Industrial PFC needs detuned reactors to avoid this."
          >
            <p>
              <strong>Resonant frequency: f_r = 1 / (2π√(LC))</strong>
            </p>
            <p>
              For L = 0.1 H and C = 100 μF:
              <br />
              f_r = 1 / (2π × √(0.1 × 100 × 10⁻⁶)) = 1 / (2π × √(10⁻⁵)) = 1 / (2π × 3.16 × 10⁻³)
              ≈ 50.3 Hz.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 61921:2017 — Power capacitors — Low-voltage power factor correction banks"
            clause="PFC banks intended for connection to networks with significant harmonic distortion shall be detuned (i.e. fitted with a series reactor) to avoid resonance with the network impedance and amplification of harmonics."
            meaning={
              <>
                A naive PFC capacitor bank can resonate with the inductance of the supply
                transformer at a harmonic frequency (typically 5th or 7th — 250 Hz / 350 Hz),
                causing capacitor failure and voltage distortion. Detuning reactors lower the
                resonant frequency well below the dominant harmonic so the cap stops the
                lagging-PF current without amplifying anything.
              </>
            }
            cite="Source: BS EN 61921:2017."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 525.1 (Voltage at terminals)"
            clause="In the absence of any other consideration, under normal service conditions the voltage at the terminals of any fixed current-using equipment shall be greater than the lower limit corresponding to the product standard relevant to the equipment."
            meaning={
              <>
                Poor power factor inflates line current for the same real power, so cable
                voltage drop rises and the terminal voltage at the equipment falls. Sizing for
                cos φ = 0.7 lagging without correction often pushes V<sub>terminal</sub> below
                the appliance's product-standard floor — Reg 525.1 then drives you to either
                upsize cable or fit PFC at the load.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 525.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 523.6.201 (Harmonic effects on CCC)"
            clause="The tabulated current-carrying capacities in Appendix 4 are based on the fundamental frequency only and do not take account of the effect of harmonics."
            meaning={
              <>
                A detuned PFC bank is one half of harmonic management; the other half is cable
                sizing. Where the load mix is rich in non-linear devices (LED drivers, VFDs,
                rectifiers), Appendix 4 §C harmonic factors apply on top of grouping and ambient
                de-rating. Treat the harmonic content of the load as a separate de-rating axis
                — power factor correction does not on its own clean the harmonics.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 523.6.201; Appendix 4."
          />

          <ConceptBlock
            title="Power factor correction (PFC) — sizing the capacitor"
            plainEnglish="Inductive loads (motors, ballasts) draw lagging current — the cable carries reactive power that does no useful work but increases line current and DNO charges. A capacitor across the load draws leading current that cancels the inductor's lagging current, bringing power factor back toward 1.0."
            onSite="A workshop has 50 kW of motor load at pf 0.7 lagging. Apparent power S = P / pf = 50 / 0.7 = 71.4 kVA. Reactive power Q = √(S² − P²) = √(5102 − 2500) = √2602 = 51 kvar lagging. To correct to pf 0.95: new Q = P × tan(arccos 0.95) = 50 × 0.329 = 16.4 kvar. Capacitor must absorb 51 − 16.4 = 34.6 kvar."
          >
            <p>
              <strong>Capacitor size: C = Q_c / (2πf × V²)</strong> (single-phase) or per phase
              for 3-phase delta-connected banks.
            </p>
            <p>
              Worked example continued: for the 34.6 kvar required at 400 V 3-phase, per phase
              (delta) Q = 34.6 / 3 = 11.5 kvar at 400 V (line-line). C per phase = 11 500 / (2π
              × 50 × 400²) = 11 500 / (314 × 160 000) = 11 500 / 50 240 000 = 229 × 10⁻⁶ F =
              229 μF. Sourced as a standard 250 μF / 440 V cap (next size up).
            </p>
            <p>
              After correction: total current = P / (√3 × V × pf) = 50 000 / (1.732 × 400 × 0.95)
              = 76 A — down from 50 000 / (1.732 × 400 × 0.7) = 103 A before. Same useful work,
              26 % less line current → smaller cable, smaller switchgear, smaller DNO bill.
            </p>
          </ConceptBlock>

          <SectionRule />

          <CommonMistake
            title="Adding X_L and R as if they were both resistors"
            whatHappens={
              <>
                Sum says: R = 6 Ω, X_L = 8 Ω. Apprentice writes Z = 6 + 8 = 14 Ω. Calculates
                current = 230 / 14 = 16.4 A. Real Z is only 10 Ω, so current is actually 23 A —
                cable now under-sized.
              </>
            }
            doInstead={
              <>
                R and X are 90° apart. Use Pythagoras: Z = √(R² + X²) = √(36 + 64) = 10 Ω, not
                14 Ω. This is exactly the same mistake as adding the legs of a right-angled
                triangle as if they were straight lines.
              </>
            }
          />

          <Scenario
            title="Sizing a contactor coil supply"
            situation={
              <>
                A control circuit drives a 24 V AC contactor coil with inductance 0.6 H and
                resistance 8 Ω. What current does it draw on a 24 V 50 Hz supply, and what
                power factor does the coil present?
              </>
            }
            whatToDo={
              <>
                X_L = 2πfL = 2π × 50 × 0.6 = 188.5 Ω.
                <br />
                Z = √(R² + X_L²) = √(64 + 35530) = √35594 = 188.7 Ω.
                <br />
                I = V/Z = 24 / 188.7 = 0.127 A = 127 mA.
                <br />
                Phase angle φ = arctan(X_L / R) = arctan(188.5 / 8) = 87.6°.
                <br />
                Power factor cos φ = cos 87.6° = 0.042 (very poor — almost pure inductance).
                <br />
                Real power absorbed = V × I × cos φ = 24 × 0.127 × 0.042 = 0.13 W.
              </>
            }
            whyItMatters={
              <>
                Most of the apparent VA is reactive — the coil is just sloshing energy back and
                forth in its magnetic field. The current the coil draws is set by Z, not R alone.
                Sizing the supply transformer or PSU to R alone (24 / 8 = 3 A) would massively
                over-spec it. The Z calculation tells you the real story.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Inductance L (henry) opposes change in current; capacitance C (farad) opposes change in voltage.',
              'X_L = 2πfL — rises with frequency. X_C = 1/(2πfC) — falls with frequency.',
              'ELI in inductor (E leads I); ICE in capacitor (I leads E). Both 90° phase shift.',
              'Impedance Z = √(R² + X²), where X = X_L − X_C. Combine R and X with Pythagoras.',
              'Phase angle φ = arctan(X/R). Power factor cos φ.',
              'Resonance at f_r = 1/(2π√LC); X_L = X_C cancel; Z = R only.',
              'PFC banks need detuning reactors to avoid resonance with supply harmonics.',
            ]}
          />

          <Quiz title="Inductance and capacitance knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section2-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.4 Sine wave fundamentals
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section2-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.6 Transient response — RC and RL time constants
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
