/**
 * MOET · Module 2 · Section 2.2 · Subsection 5 — Reactance, Impedance and Power Factor
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Electrical. Electrical engineering principles: circuit terminology,
 *     Ohm’s Law, transformer theory, and power calculations."
 *   · "Use mathematical principles and formulae to support engineering
 *     maintenance."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * Content note: quickCheckQuestions[2] ('pfc-purpose') carries three answer
 * options that do not belong to this question (a lever/mechanism definition,
 * an estimating-bias statement, and a description of a hop-up platform) —
 * this looks like a copy/paste mix-up from unrelated question banks in the
 * ORIGINAL page. Left byte-identical per the conversion rules; flagged in
 * the conversion report rather than corrected here.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import { PowerTriangle } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Reactance, Impedance and Power Factor - MOET Module 2.2.5';
const DESCRIPTION =
  'Comprehensive guide to reactance, impedance and power factor for maintenance technicians: inductive reactance (XL=2πfL), capacitive reactance (XC=1/2πfC), impedance (Z), the power triangle (P, Q, S), power factor (cos φ), leading vs lagging, power factor correction, PFC capacitors, penalties for low PF, measurement and maintenance under BS 7671 and ST1426.';

const quickCheckQuestions = [
  {
    id: 'inductive-reactance',
    question: 'A 0.1 H inductor is connected to a 50 Hz supply. What is its inductive reactance?',
    options: ['5 Ω', '31.4 Ω', '50 Ω', '314 Ω'],
    correctIndex: 1,
    explanation:
      'Inductive reactance XL = 2πfL = 2π x 50 x 0.1 = 31.4 Ω. The reactance is directly proportional to both frequency and inductance — doubling either would double the reactance. At DC (f = 0), the inductive reactance is zero, meaning an inductor appears as a short circuit to DC (only its winding resistance limits current).',
  },
  {
    id: 'power-triangle',
    question:
      'A motor draws 10 kVA from the supply at a power factor of 0.8 lagging. What is the real power consumed?',
    options: ['12.5 kW', '8 kW', '10 kW', '6 kW'],
    correctIndex: 1,
    explanation:
      "Real power P = S x cos φ = 10 x 0.8 = 8 kW. The remaining 6 kVAr (Q = S x sin φ = 10 x 0.6 = 6 kVAr) is reactive power — it flows back and forth between the supply and the motor's magnetic field without doing useful work but still causes current to flow in the supply conductors.",
  },
  {
    id: 'pfc-purpose',
    question: 'The primary purpose of power factor correction is to:',
    options: [
      'Reduce the real power in kW that the load consumes',
      'Raise the supply voltage at the load to compensate for volt drop',
      'Increase the insulation resistance of the motor windings',
      'Reduce the reactive current drawn from the supply, allowing more real power to be delivered',
    ],
    correctIndex: 3,
    explanation:
      'Power factor correction reduces the reactive current component drawn from the supply by providing the reactive power locally (typically via capacitors) rather than drawing it from the supply transformer and cables. This frees up capacity in the supply infrastructure for real power, reduces I²R losses in cables, and improves voltage regulation. It does not change the actual power consumed by the load.',
  },
  {
    id: 'impedance-calc',
    question:
      'A series circuit has a resistance of 30 Ω and an inductive reactance of 40 Ω. What is the impedance?',
    options: ['1200 Ω', '70 Ω', '10 Ω', '50 Ω'],
    correctIndex: 3,
    explanation:
      "In a series R-L circuit, impedance Z = √(R² + XL²) = √(30² + 40²) = √(900 + 1600) = √2500 = 50 Ω. Note that impedance is NOT the arithmetic sum of R and X (which would give 70 Ω) — it is the vector sum, calculated using Pythagoras' theorem because R and X are at 90 degrees to each other on the impedance triangle.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Inductive reactance (XL) is calculated using the formula:',
    options: ['XL = 1/(2πfL)', 'XL = 2πfL', 'XL = 2πfC', 'XL = R x L'],
    correctAnswer: 1,
    explanation:
      'Inductive reactance XL = 2πfL, where f is the frequency in hertz and L is the inductance in henries. XL is measured in ohms and increases with both frequency and inductance. At 50 Hz, a 100 mH inductor has XL = 2π x 50 x 0.1 = 31.4 Ω.',
  },
  {
    id: 2,
    question: 'Capacitive reactance (XC) is calculated using the formula:',
    options: ['XC = 2πfL', 'XC = 2πfC', 'XC = 1/(2πfC)', 'XC = R / C'],
    correctAnswer: 2,
    explanation:
      'Capacitive reactance XC = 1/(2πfC), where f is the frequency in hertz and C is the capacitance in farads. Unlike inductive reactance, XC decreases with increasing frequency and capacitance. At DC (f = 0), XC is infinite — a capacitor blocks DC completely. At high frequencies, XC approaches zero — a capacitor passes high frequencies easily.',
  },
  {
    id: 3,
    question: 'In an AC circuit, impedance (Z) is defined as:',
    options: [
      'The opposition to current flow caused by resistance alone, ignoring reactance',
      'The arithmetic sum of resistance and reactance (Z = R + X)',
      'The rate at which a capacitor stores and releases charge each cycle',
      'The total opposition to current flow, combining resistance and reactance vectorially',
    ],
    correctAnswer: 3,
    explanation:
      "Impedance is the total opposition to current flow in an AC circuit, combining resistance (R) and reactance (X) as a vector sum: Z = √(R² + X²) for a series circuit. It is measured in ohms but unlike pure resistance, impedance has both magnitude and phase angle. The current in the circuit is determined by V/Z (Ohm's law for AC).",
  },
  {
    id: 4,
    question: 'The power factor of a circuit is defined as:',
    options: [
      'The cosine of the phase angle between voltage and current (cos φ)',
      'The ratio of reactive power to real power (kVAr/kW)',
      'The product of voltage and current divided by the supply frequency',
      'The sine of the phase angle between voltage and current (sin φ)',
    ],
    correctAnswer: 0,
    explanation:
      'Power factor = cos φ, where φ is the phase angle between the voltage and current waveforms. It can also be expressed as the ratio of real power to apparent power: PF = P/S = kW/kVA. A power factor of 1.0 (unity) means all current is doing useful work. A power factor of 0.5 means only half the current is doing useful work — the rest is reactive.',
  },
  {
    id: 5,
    question: "A 'lagging' power factor is caused by:",
    options: [
      'Capacitive loads (PFC capacitors, long cable runs)',
      'Inductive loads (motors, transformers, solenoids)',
      'Non-linear loads (VSDs, LED drivers)',
      'Resistive loads (heaters, incandescent lamps)',
    ],
    correctAnswer: 1,
    explanation:
      'A lagging power factor occurs when the current lags behind the voltage — this is caused by inductive loads. Motors, transformers, solenoids, fluorescent lighting with magnetic ballasts and induction heaters all have lagging power factors. The majority of industrial loads are inductive, which is why most industrial installations have a lagging power factor and require power factor correction.',
  },
  {
    id: 6,
    question:
      'An installation draws 100 kVA at a power factor of 0.7 lagging. After PFC is installed, the power factor improves to 0.95. The new apparent power demand is approximately:',
    options: ['70 kVA', '95 kVA', '73.7 kVA', '100 kVA'],
    correctAnswer: 2,
    explanation:
      'The real power remains the same: P = 100 x 0.7 = 70 kW. With the improved power factor: S = P / cos φ = 70 / 0.95 = 73.7 kVA. The apparent power demand has been reduced from 100 kVA to 73.7 kVA — a 26.3% reduction. This means 26.3% less current flowing through the supply cables and transformer, reducing losses and freeing up capacity.',
  },
  {
    id: 7,
    question: 'The three components of the power triangle are:',
    options: [
      'Voltage (V), current (A) and resistance (Ω)',
      'Real power (kW), power factor (cos φ) and frequency (Hz)',
      'Resistance (R), inductive reactance (XL) and capacitive reactance (XC)',
      'Real power (kW), reactive power (kVAr) and apparent power (kVA)',
    ],
    correctAnswer: 3,
    explanation:
      'The power triangle represents the relationship between real power P (kW — the power that does useful work), reactive power Q (kVAr — the power that flows back and forth supporting magnetic and electric fields), and apparent power S (kVA — the total power delivered by the supply). They are related by: S² = P² + Q², and the power factor = P/S = cos φ.',
  },
  {
    id: 8,
    question: 'Power factor correction capacitors are connected in:',
    options: [
      'Parallel with the load',
      'Series with the neutral conductor',
      'Series with the load',
      'Between the line and earth conductors',
    ],
    correctAnswer: 0,
    explanation:
      'PFC capacitors are always connected in parallel with the load (or the supply bus). This allows the capacitor to supply the reactive current locally, reducing the reactive current drawn from the supply. The capacitor current leads the voltage by 90 degrees, opposing the lagging current drawn by inductive loads. Connecting capacitors in series would reduce the voltage to the load and is not used for power factor correction.',
  },
  {
    id: 9,
    question:
      'A UK electricity supplier typically applies financial penalties when the power factor falls below:',
    options: [
      '1.0 (any value less than perfect unity)',
      '0.90 or 0.85 (varies by supplier)',
      '0.50 (only severely reactive loads are charged)',
      '0.20 (only when the load is almost entirely reactive)',
    ],
    correctAnswer: 1,
    explanation:
      'Most UK electricity suppliers apply reactive power charges when the power factor falls below a threshold, typically 0.90 or 0.85 (the exact value varies by supplier and tariff). The charge is based on the amount of reactive energy consumed (measured in kVArh by a reactive energy meter). The penalty can be substantial for large industrial consumers with poor power factor.',
  },
  {
    id: 10,
    question: 'At resonance in a series RLC circuit, what happens to the impedance?',
    options: [
      'Impedance rises to a maximum as XL and XC add together',
      'Impedance becomes purely capacitive and the current leads the voltage',
      'Impedance equals the resistance only (XL and XC cancel)',
      'Impedance falls to zero and the current becomes infinite',
    ],
    correctAnswer: 2,
    explanation:
      'At the resonant frequency, the inductive reactance (XL) equals the capacitive reactance (XC), and they cancel each other out. The impedance of the series circuit reduces to the resistance alone: Z = R. This means maximum current flows at resonance. In power systems, series resonance between PFC capacitors and transformer inductance can amplify harmonic currents to dangerous levels — a critical design consideration.',
  },
  {
    id: 11,
    question: 'Which instrument is used to measure power factor on site?',
    options: [
      'A continuity tester set to the lowest resistance range',
      'An insulation resistance tester at 500 V DC',
      'A standard analogue multimeter on its AC voltage range',
      'A power quality analyser or power factor meter',
    ],
    correctAnswer: 3,
    explanation:
      'Power factor is measured using a power quality analyser (which measures voltage, current and their phase relationship simultaneously) or a dedicated power factor meter. Clamp-on power meters that measure voltage and current can also calculate power factor. For accurate results, the meter must be a true-RMS type, as average-responding meters give incorrect power factor readings on non-sinusoidal waveforms.',
  },
  {
    id: 12,
    question: 'The reactive power (Q) in an AC circuit is measured in:',
    options: [
      'Volt-amperes reactive (VAr)',
      'Watts (W)',
      'Volt-amperes (VA)',
      'Joules per second (J/s)',
    ],
    correctAnswer: 0,
    explanation:
      'Reactive power is measured in volt-amperes reactive (VAr), or more commonly kVAr (kilovolt-amperes reactive). Real power is measured in watts (W or kW), and apparent power is measured in volt-amperes (VA or kVA). The distinction is important: reactive power does no useful work but still causes current to flow, contributing to I²R losses in the supply infrastructure.',
  },
];

const faqs = [
  {
    question: 'Why does a low power factor cost money?',
    answer:
      'A low power factor means a higher proportion of the total current is reactive — flowing back and forth between the supply and the load without doing useful work. This reactive current still causes I²R losses in supply cables and transformers, occupies capacity in the distribution system, and causes voltage drop. Electricity suppliers charge for this wasted capacity through reactive power charges (kVArh metering). A factory drawing 100 kW at PF 0.7 requires 143 kVA of supply capacity; at PF 0.95 it requires only 105 kVA — a 26% reduction.',
  },
  {
    question: 'Can power factor be greater than 1?',
    answer:
      "No. Power factor (cos φ) can only range from 0 to 1. A value of 1 (unity) means voltage and current are perfectly in phase and all power is real (useful). A value of 0 means voltage and current are 90 degrees apart and all power is reactive (no useful work). In practice, power factors below about 0.6 are rare in normal installations. Note that 'displacement power factor' (cos φ) and 'true power factor' (P/S including harmonics) may differ — distortion from harmonics can reduce the true power factor even when the displacement power factor is good.",
  },
  {
    question: 'What is the difference between kW, kVA and kVAr?',
    answer:
      'These are the three types of power in AC circuits. kW (kilowatts) is real (active) power — the power that does useful work (turning motors, producing heat, producing light). kVAr (kilovolt-amperes reactive) is reactive power — the power that flows back and forth supporting magnetic fields in motors and transformers. kVA (kilovolt-amperes) is apparent power — the total power delivered by the supply (the vector sum of kW and kVAr). The supply transformer, cables and switchgear must all be rated for the apparent power (kVA), which is always greater than or equal to the real power (kW) unless power factor is unity.',
  },
  {
    question: 'How do I size PFC capacitors for an installation?',
    answer:
      'To size PFC capacitors: 1) Measure the existing power factor and real power demand (kW) using a power quality analyser. 2) Determine the target power factor (typically 0.95 for UK installations). 3) Calculate the required kVAr: Q_cap = P x (tan φ₁ - tan φ₂), where φ₁ is the existing angle and φ₂ is the target angle. For example, to correct 100 kW from PF 0.7 to 0.95: Q_cap = 100 x (tan(45.6°) - tan(18.2°)) = 100 x (1.02 - 0.33) = 69 kVAr. Consider automatic (stepped) PFC for variable loads to avoid leading power factor when load is light.',
  },
  {
    question: 'What maintenance is required for PFC capacitor banks?',
    answer:
      'PFC capacitor banks require regular maintenance: thermographic survey annually (look for hot connections, overheated capacitors), visual inspection quarterly (swelling, leaking, discolouration), power factor measurement monthly (verify correction is working), harmonic current check annually (ensure capacitors are not absorbing excessive harmonic currents), contact inspection on switching contactors (arc damage reduces life), and capacitance measurement annually (capacitance drop of more than 5% indicates degradation). Also check discharge resistors are functioning — capacitors must discharge to below 50 V within one minute of disconnection per BS EN 60831.',
  },
];

const MOETModule2Section2_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.2 · Subsection 5"
        title="Reactance, Impedance and Power Factor"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Understanding reactive components, impedance calculations and power factor correction
            for electrical maintenance.
          </p>

          <TLDR
            points={[
              'XL = 2πfL — inductive reactance increases with frequency.',
              'XC = 1/(2πfC) — capacitive reactance decreases with frequency.',
              'Z = √(R² + X²) — impedance is the vector sum.',
              'PF = cos φ = kW/kVA — target 0.95 for UK installations.',
            ]}
          />

          <ConceptBlock title="Power triangle">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>P (kW):</strong> Real power — does useful work.
              </li>
              <li>
                <strong>Q (kVAr):</strong> Reactive power — supports fields.
              </li>
              <li>
                <strong>S (kVA):</strong> Apparent power — total supply demand.
              </li>
              <li>
                <strong>S² = P² + Q²</strong> — Pythagoras applies.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Calculate inductive reactance (XL = 2πfL) and capacitive reactance (XC = 1/2πfC)',
              'Calculate impedance in series and parallel AC circuits',
              'Explain the power triangle and the relationship between P, Q and S',
              'Define power factor and distinguish between leading and lagging',
              'Describe power factor correction using capacitors and explain its benefits',
              'Carry out power factor measurement and maintain PFC equipment',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Inductive and capacitive reactance</ContentEyebrow>

          <ConceptBlock title="Reactance opposes current differently to resistance">
            <p>
              In DC circuits, only resistance opposes the flow of current. In AC circuits, inductors
              and capacitors also oppose current flow — but in a fundamentally different way. This
              opposition is called reactance. Unlike resistance, which dissipates energy as heat,
              reactance stores energy temporarily in magnetic fields (inductors) or electric fields
              (capacitors) and returns it to the circuit during each cycle. Reactance depends on
              frequency — a critical distinction from resistance.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Inductive reactance (XL)">
            <div className="rounded bg-white/5 p-3 text-center font-mono text-sm">
              XL = 2πfL = ωL
            </div>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Unit:</strong> Ohms (Ω).
              </li>
              <li>
                <strong>Behaviour:</strong> Increases linearly with frequency — higher frequency
                means more opposition.
              </li>
              <li>
                <strong>At DC (f = 0):</strong> XL = 0 — inductor appears as a short circuit (only
                winding resistance limits current).
              </li>
              <li>
                <strong>At high frequency:</strong> XL approaches infinity — inductor blocks
                high-frequency signals.
              </li>
              <li>
                <strong>Phase effect:</strong> Current lags voltage by 90° in a pure inductor.
              </li>
              <li>
                <strong>Example:</strong> Motor winding L = 50 mH at 50 Hz: XL = 2π x 50 x 0.05 =
                15.7 Ω.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Capacitive reactance (XC)">
            <div className="rounded bg-white/5 p-3 text-center font-mono text-sm">
              XC = 1/(2πfC) = 1/(ωC)
            </div>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Unit:</strong> Ohms (Ω).
              </li>
              <li>
                <strong>Behaviour:</strong> Decreases with increasing frequency — higher frequency
                means less opposition.
              </li>
              <li>
                <strong>At DC (f = 0):</strong> XC = infinity — capacitor blocks DC completely (open
                circuit).
              </li>
              <li>
                <strong>At high frequency:</strong> XC approaches zero — capacitor passes high
                frequencies easily.
              </li>
              <li>
                <strong>Phase effect:</strong> Current leads voltage by 90° in a pure capacitor.
              </li>
              <li>
                <strong>Example:</strong> PFC capacitor C = 100 μF at 50 Hz: XC = 1/(2π x 50 x
                100x10⁻⁶) = 31.8 Ω.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Reactance vs resistance — key differences">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Property</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Resistance (R)</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Reactance (X)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Energy</td>
                    <td className="border border-white/10 px-3 py-2">Dissipates energy as heat</td>
                    <td className="border border-white/10 px-3 py-2">Stores and returns energy</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Frequency</td>
                    <td className="border border-white/10 px-3 py-2">Independent of frequency</td>
                    <td className="border border-white/10 px-3 py-2">Changes with frequency</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Phase</td>
                    <td className="border border-white/10 px-3 py-2">V and I in phase (0°)</td>
                    <td className="border border-white/10 px-3 py-2">V and I 90° apart</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Power</td>
                    <td className="border border-white/10 px-3 py-2">Consumes real power (kW)</td>
                    <td className="border border-white/10 px-3 py-2">
                      Consumes no real power (kVAr only)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> In practical AC circuits, components have both resistance
              and reactance. A motor winding has resistance (from the copper wire) and inductance
              (from the magnetic circuit). A cable has resistance, inductance and capacitance. The
              total opposition to current is called impedance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Impedance and the impedance triangle</ContentEyebrow>

          <ConceptBlock title="A vector sum, not an arithmetic sum">
            <p>
              Impedance (Z) is the total opposition to current flow in an AC circuit. It combines
              resistance (R) and reactance (X) as a vector sum — not an arithmetic sum. This is
              because resistance and reactance are 90 degrees apart in their effect on the circuit
              (resistance is in phase with current, reactance is 90 degrees out of phase). The
              impedance triangle is the graphical representation of this relationship.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Impedance calculations">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Series R-L circuit:</strong> Z = √(R² + XL²), phase angle φ = arctan(XL/R).
              </li>
              <li>
                <strong>Series R-C circuit:</strong> Z = √(R² + XC²), phase angle φ = arctan(XC/R).
              </li>
              <li>
                <strong>Series R-L-C circuit:</strong> Z = √(R² + (XL - XC)²), X_net = XL - XC.
              </li>
              <li>
                <strong>If XL &gt; XC:</strong> Circuit is net inductive (current lags voltage).
              </li>
              <li>
                <strong>If XC &gt; XL:</strong> Circuit is net capacitive (current leads voltage).
              </li>
              <li>
                <strong>If XL = XC:</strong> Series resonance — Z = R (minimum impedance, maximum
                current).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Ohm's law for AC circuits">
            <p>The AC version of Ohm&apos;s law uses impedance instead of resistance:</p>
            <div className="rounded bg-white/5 p-3 text-center font-mono text-sm">
              V = I x Z &nbsp;&nbsp;|&nbsp;&nbsp; I = V / Z &nbsp;&nbsp;|&nbsp;&nbsp; Z = V / I
            </div>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>All values are RMS unless stated otherwise.</li>
              <li>V, I and Z are all phasor quantities (magnitude and angle).</li>
              <li>
                <strong>Example:</strong> 230 V supply, Z = 46 Ω, then I = 230/46 = 5 A.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Resonance — a critical concept"
            whatHappens={
              <>
                <p>
                  Resonance occurs when XL = XC — the inductive and capacitive reactances are equal.
                  The resonant frequency is f₀ = 1 / (2π√(LC)). In series resonance, impedance falls
                  to R only and current reaches maximum — this is dangerous in power systems and can
                  cause overcurrents through PFC capacitors. In parallel resonance, impedance rises
                  to maximum and current from the supply falls to minimum, which can amplify
                  harmonic voltages at the resonant frequency. Resonance between PFC capacitors and
                  transformer inductance at a harmonic frequency can amplify that harmonic to
                  dangerous levels.
                </p>
              </>
            }
            doInstead={
              <>
                This is why PFC must be designed with harmonic content in mind, not just the target
                power factor.
              </>
            }
          />

          <ConceptBlock title="Maintenance tip">
            <p>
              Earth fault loop impedance (Zs) measured during testing is an AC impedance, not just
              resistance. It includes the resistance and reactance of the supply transformer, cables
              and earth path. At 50 Hz, the reactive component is significant for larger cable sizes
              and longer runs, which is why measured Zs may differ from calculated values based on
              resistance alone.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>The power triangle and power factor</ContentEyebrow>

          <ConceptBlock title="Three types of AC power">
            <p>
              In AC circuits with reactance, not all the power delivered by the supply does useful
              work. The power triangle describes the relationship between the three types of AC
              power: real (active) power, reactive power, and apparent power. Power factor is the
              crucial ratio that indicates how efficiently the supply current is being used.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Real power P (kW):</strong> The power that does useful work — turns motors,
                produces heat, produces light. P = V x I x cos φ. Measured by a wattmeter. The only
                type of power you pay for directly (kWh meter).
              </li>
              <li>
                <strong>Reactive power Q (kVAr):</strong> The power that flows back and forth
                between the supply and the reactive components (inductors, capacitors) without doing
                useful work. Q = V x I x sin φ. Essential for maintaining magnetic fields in motors
                and transformers but causes additional current to flow.
              </li>
              <li>
                <strong>Apparent power S (kVA):</strong> The total power delivered by the supply —
                the product of RMS voltage and RMS current. S = V x I. The supply infrastructure
                (transformer, cables, switchgear) must be rated for the apparent power, not just the
                real power.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Power factor — leading and lagging">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Power factor = cos φ = P/S = kW/kVA.</strong>
              </li>
              <li>
                <strong>Unity (PF = 1.0):</strong> Purely resistive load. V and I in phase. All
                current does useful work. Maximum efficiency.
              </li>
              <li>
                <strong>Lagging (0 &lt; PF &lt; 1):</strong> Inductive load. Current lags voltage.
                Caused by motors, transformers, solenoids. The dominant condition in industrial
                installations.
              </li>
              <li>
                <strong>Leading (0 &lt; PF &lt; 1):</strong> Capacitive load. Current leads voltage.
                Caused by PFC capacitors, long lightly loaded cables. Usually only seen when PFC
                overcorrects.
              </li>
              <li>
                <strong>Zero PF (PF = 0):</strong> Purely reactive load. No real power consumed. All
                power is reactive. Theoretical limit — not encountered in practice.
              </li>
            </ul>
          </ConceptBlock>

          <PowerTriangle variant="apparent" />

          <ConceptBlock title="Typical power factors">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Load Type</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Typical PF</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Resistive heaters</td>
                    <td className="border border-white/10 px-3 py-2">1.0</td>
                    <td className="border border-white/10 px-3 py-2">Unity</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Incandescent lighting</td>
                    <td className="border border-white/10 px-3 py-2">1.0</td>
                    <td className="border border-white/10 px-3 py-2">Unity</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Induction motors (full load)
                    </td>
                    <td className="border border-white/10 px-3 py-2">0.80-0.90</td>
                    <td className="border border-white/10 px-3 py-2">Lagging</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Induction motors (no load)</td>
                    <td className="border border-white/10 px-3 py-2">0.15-0.30</td>
                    <td className="border border-white/10 px-3 py-2">Lagging</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Fluorescent lighting (magnetic ballast)
                    </td>
                    <td className="border border-white/10 px-3 py-2">0.50-0.60</td>
                    <td className="border border-white/10 px-3 py-2">Lagging</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">LED lighting (with PFC)</td>
                    <td className="border border-white/10 px-3 py-2">0.90-0.99</td>
                    <td className="border border-white/10 px-3 py-2">Leading or lagging</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Welding sets</td>
                    <td className="border border-white/10 px-3 py-2">0.40-0.60</td>
                    <td className="border border-white/10 px-3 py-2">Lagging</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">VSDs (with input PFC)</td>
                    <td className="border border-white/10 px-3 py-2">0.95-0.98</td>
                    <td className="border border-white/10 px-3 py-2">Lagging</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> The most common cause of poor power factor in industrial
              installations is induction motors — especially those running at less than full load. A
              motor running at 50% load draws nearly the same reactive current as at full load but
              only half the real current, causing the power factor to deteriorate significantly.
              Oversized motors are a major contributor to poor power factor.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Power factor correction and maintenance</ContentEyebrow>

          <ConceptBlock title="Reducing reactive current locally">
            <p>
              Power factor correction (PFC) is the process of reducing the reactive current drawn
              from the supply by providing the reactive power locally — typically using capacitors.
              PFC capacitors supply the leading reactive current that partially or fully cancels the
              lagging reactive current drawn by inductive loads. This reduces the total current from
              the supply, freeing up capacity, reducing losses and avoiding financial penalties.
            </p>
          </ConceptBlock>

          <ConceptBlock title="PFC methods">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Individual correction:</strong> Capacitor fitted directly to each motor or
                large inductive load. The capacitor is switched with the load. Simple and effective
                but requires many capacitors. Often used for large motors (&gt;15 kW).
              </li>
              <li>
                <strong>Group correction:</strong> A capacitor bank connected to a distribution
                board to correct a group of loads. Partially compensates for the varying load
                profiles of multiple loads.
              </li>
              <li>
                <strong>Central automatic correction:</strong> An automatically switched capacitor
                bank at the main switchboard. A PFC controller monitors the power factor in real
                time and switches capacitor stages in and out to maintain the target PF. The most
                common solution for industrial installations.
              </li>
              <li>
                <strong>Static VAr compensators:</strong> Thyristor-controlled reactors used for
                fast, precise PFC in applications with rapidly varying loads (arc furnaces, welding
                bays).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Benefits of power factor correction">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reduced electricity costs:</strong> Avoidance of reactive power charges
                (kVArh penalties). Typical payback period for PFC equipment: 12-18 months.
              </li>
              <li>
                <strong>Freed-up capacity:</strong> Reducing the current from 100 kVA to 74 kVA (PF
                0.7 to 0.95) frees 26 kVA of transformer and cable capacity for additional load.
              </li>
              <li>
                <strong>Reduced I²R losses:</strong> Lower current means proportionally lower copper
                losses in cables and transformers. Energy savings of 2-5% are typical.
              </li>
              <li>
                <strong>Improved voltage regulation:</strong> Less current means less voltage drop.
                Voltage at the load terminals improves, benefiting motor performance and equipment
                life.
              </li>
              <li>
                <strong>Reduced cable heating:</strong> Lower current reduces cable operating
                temperature, extending insulation life.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="PFC hazards and safety">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stored energy:</strong> PFC capacitors retain a charge after disconnection.
                Discharge resistors should reduce the voltage to below 50 V within one minute (BS EN
                60831). Always verify discharge before handling.
              </li>
              <li>
                <strong>Overcorrection:</strong> If the PFC bank supplies more reactive power than
                the load demands, the power factor becomes leading. This can cause voltage rise,
                generator instability and problems with some protection devices. Automatic PFC
                controllers prevent this.
              </li>
              <li>
                <strong>Harmonic resonance:</strong> PFC capacitors can resonate with the system
                inductance at harmonic frequencies, amplifying harmonics and causing capacitor
                overheating and failure. Detuning reactors (typically 5.67% or 7% impedance) are
                used to shift the resonant frequency below the lowest significant harmonic.
              </li>
              <li>
                <strong>Inrush current:</strong> Switching large capacitor banks can cause
                significant inrush current, causing contact wear and voltage transients.
                Pre-insertion resistors or controlled switching can mitigate this.
              </li>
              <li>
                <strong>Self-excitation:</strong> Do not leave PFC capacitors connected to motors
                that may be disconnected from the supply — the motor can self-excite as a generator,
                producing dangerous voltages.
              </li>
            </ul>
            <p>
              <strong>ST1426 link:</strong> The maintenance technician standard requires
              understanding of power factor, its effects on the electrical system, and the operation
              and maintenance of power factor correction equipment. PFC systems are a common
              maintenance responsibility in industrial and commercial installations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=Tv_7XWf96gg"

            title="Power Factor Explained"

            channel="The Engineering Mindset"

            duration="11:09"

            topic="Real, reactive and apparent power, and why the supply authority cares"

            caption="The clearest explanation of why a poor power factor costs money without changing the kW you actually use."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'In practical AC circuits, components have both resistance and reactance — a motor winding, a cable, all combine to give impedance.',
              'Impedance is a vector sum, not an arithmetic sum: Z = √(R² + X²), never R + X.',
              'Resonance between PFC capacitors and transformer inductance at a harmonic frequency can amplify that harmonic to dangerous levels — PFC must be designed with harmonic content in mind.',
              'The most common cause of poor power factor in industrial installations is induction motors running at less than full load — oversized motors are a major contributor.',
              'PFC capacitors retain a charge after disconnection — always verify discharge to below 50 V before handling, per BS EN 60831.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz
              title="Test Your Knowledge — Reactance, Impedance and PF"
              questions={quizQuestions}
            />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section2-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Frequency and Waveforms
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section2-6')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Capacitors and Inductors
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section2_5;
