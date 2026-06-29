/**
 * Module 3 · Section 2 · Subsection 2 — Reactance and Impedance in AC Circuits
 * HNC Electrical Engineering for Building Services (Pearson U4019 — Electrical & Electronic Principles)
 *   The AC version of resistance — impedance Z combines pure resistance R with reactance X
 *   to give the working model used for motor circuit analysis, transformer regulation and Zs.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Reactance and Impedance in AC Circuits - HNC Module 3 Section 2.2';
const DESCRIPTION =
  'Master inductive and capacitive reactance calculations, complex impedance analysis, and practical applications in building services including motor circuits, transformer equivalent circuits, and cable impedance.';

const quickCheckQuestions = [
  {
    id: 'inductive-reactance',
    question: 'What is the inductive reactance of a 50mH inductor at 50Hz?',
    options: [
      '7.85Ω',
      '15.7Ω',
      '31.4Ω',
      '157Ω',
    ],
    correctIndex: 1,
    explanation:
      'Xₗ = 2πfL = 2π × 50 × 0.050 = 15.7Ω. Remember to convert mH to H (50mH = 0.050H) before calculating.',
  },
  {
    id: 'capacitive-reactance',
    question: 'A 100µF capacitor has what reactance at 50Hz?',
    options: [
      '15.9Ω',
      '31.8Ω',
      '63.7Ω',
      '318Ω',
    ],
    correctIndex: 1,
    explanation:
      'Xᴄ = 1/(2πfC) = 1/(2π × 50 × 0.0001) = 31.8Ω. Note Xᴄ decreases as capacitance increases.',
  },
  {
    id: 'impedance-magnitude',
    question: 'A circuit has R = 30Ω and Xₗ = 40Ω. What is the impedance magnitude?',
    options: [
      '50Ω',
      '70Ω',
      '35Ω',
      '10Ω',
    ],
    correctIndex: 0,
    explanation:
      '|Z| = √(R² + X²) = √(30² + 40²) = √(900 + 1600) = √2500 = 50Ω. This is a classic 3-4-5 Pythagorean triangle.',
  },
  {
    id: 'phase-angle',
    question: 'For R = 100Ω and Xₗ = 100Ω, what is the phase angle?',
    options: [
      '30°',
      '60°',
      '45°',
      '90°',
    ],
    correctIndex: 2,
    explanation:
      'θ = arctan(X/R) = arctan(100/100) = arctan(1) = 45°. When X = R, the phase angle is always 45°.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is reactance?',
    options: [
      'The opposition to current flow caused by the resistance of a conductor, dissipating power as heat',
      'Opposition to AC current due to energy storage in electric or magnetic fields',
      'The total opposition to AC current, combining both resistance and reactance into one value',
      'The opposition to current flow that arises only at the instant a circuit is switched on',
    ],
    correctAnswer: 1,
    explanation:
      'Reactance is the opposition to AC current flow caused by inductors (magnetic field energy storage) and capacitors (electric field energy storage). Unlike resistance, reactance does not dissipate power.',
  },
  {
    id: 2,
    question: 'How does inductive reactance change with frequency?',
    options: [
      'Remains constant regardless of frequency',
      'Decreases as frequency increases',
      'Increases proportionally with frequency',
      'Increases with the square of frequency',
    ],
    correctAnswer: 2,
    explanation:
      'Xₗ = 2πfL shows that inductive reactance is directly proportional to frequency. Doubling the frequency doubles the reactance. This is why inductors block high frequencies.',
  },
  {
    id: 3,
    question: 'A motor winding has L = 0.1H. What is its reactance at 50Hz?',
    options: [
      '50Ω',
      '15.7Ω',
      '314Ω',
      '31.4Ω',
    ],
    correctAnswer: 3,
    explanation: 'Xₗ = 2πfL = 2π × 50 × 0.1 = 31.4Ω',
  },
  {
    id: 4,
    question: 'How does capacitive reactance change with frequency?',
    options: [
      'Decreases as frequency increases',
      'Increases proportionally with frequency',
      'Remains constant regardless of frequency',
      'Increases with the square of frequency',
    ],
    correctAnswer: 0,
    explanation:
      'Xᴄ = 1/(2πfC) shows that capacitive reactance is inversely proportional to frequency. Higher frequencies encounter less opposition, which is why capacitors pass high frequencies.',
  },
  {
    id: 5,
    question: 'What is the unit of impedance?',
    options: [
      'Farads',
      'Ohms',
      'Siemens',
      'Henrys',
    ],
    correctAnswer: 1,
    explanation:
      'Impedance, like resistance and reactance, is measured in Ohms (Ω). It represents the total opposition to AC current flow.',
  },
  {
    id: 6,
    question: "In the complex impedance Z = R + jX, what does 'j' represent?",
    options: [
      'The frequency of the supply in hertz, scaling the reactance term',
      'A correction factor for the temperature of the conductor',
      'The imaginary unit (√-1), indicating 90° phase shift',
      'The power factor of the circuit expressed as a decimal',
    ],
    correctAnswer: 2,
    explanation:
      'In electrical engineering, j represents √-1 (called i in pure mathematics). It indicates that the reactive component is 90° out of phase with the resistive component.',
  },
  {
    id: 7,
    question: 'A circuit has Z = 40 + j30 Ω. What is the impedance magnitude?',
    options: [
      '10Ω',
      '35Ω',
      '70Ω',
      '50Ω',
    ],
    correctAnswer: 3,
    explanation:
      '|Z| = √(R² + X²) = √(40² + 30²) = √(1600 + 900) = √2500 = 50Ω',
  },
  {
    id: 8,
    question:
      'Two impedances of 10Ω each are connected in series. What is the total impedance?',
    options: [
      '20Ω',
      '100Ω',
      '5Ω',
      '10Ω',
    ],
    correctAnswer: 0,
    explanation:
      'In series, impedances add directly: Zₜ = Z₁ + Z₂ = 10 + 10 = 20Ω. This is the same rule as for resistances in series.',
  },
  {
    id: 9,
    question: 'What is the phase angle of an impedance Z = 50 + j50√3 Ω?',
    options: [
      '30°',
      '60°',
      '45°',
      '90°',
    ],
    correctAnswer: 1,
    explanation: 'θ = arctan(X/R) = arctan(50√3/50) = arctan(√3) = 60°',
  },
  {
    id: 10,
    question: 'A power factor correction capacitor reduces motor circuit impedance magnitude. Why?',
    options: [
      'The capacitor increases the resistance, which dominates the impedance triangle',
      'The capacitor raises the supply frequency seen by the motor windings',
      'The capacitive reactance partially cancels the inductive reactance',
      'The capacitor stores charge that adds directly to the supply current',
    ],
    correctAnswer: 2,
    explanation:
      'Motors have inductive reactance (+jXₗ). Adding capacitance (-jXᴄ) reduces the net reactance. Since |Z| = √(R² + Xₙₑₜ²), reducing Xₙₑₜ reduces impedance magnitude.',
  },
  {
    id: 11,
    question: 'At what frequency does a 10mH inductor have Xₗ = 100Ω?',
    options: [
      '159Hz',
      '318Hz',
      '500Hz',
      '1.59kHz',
    ],
    correctAnswer: 3,
    explanation:
      'Rearranging Xₗ = 2πfL: f = Xₗ/(2πL) = 100/(2π × 0.01) = 100/0.0628 = 1592Hz ≈ 1.59kHz',
  },
  {
    id: 12,
    question: 'Two 20Ω impedances in parallel give what total impedance?',
    options: [
      '10Ω',
      '400Ω',
      '40Ω',
      '20Ω',
    ],
    correctAnswer: 0,
    explanation:
      'For equal impedances in parallel: Zₜ = Z/n = 20/2 = 10Ω. Alternatively: 1/Zₜ = 1/20 + 1/20 = 2/20, so Zₜ = 10Ω',
  },
];

const faqs = [
  {
    question: 'What is the difference between reactance and impedance?',
    answer:
      'Reactance (X) is the opposition to AC current caused only by inductors or capacitors - it involves energy storage, not dissipation. Impedance (Z) is the total opposition to AC current, combining both resistance (R) and reactance (X). Impedance is expressed as Z = R + jX in complex form, or |Z| = √(R² + X²) as a magnitude.',
  },
  {
    question: "Why do we use 'j' instead of 'i' for the imaginary unit in electrical engineering?",
    answer:
      "Electrical engineers use 'j' because 'i' is already the standard symbol for current. Using j = √-1 avoids confusion in circuit equations. The j operator indicates a 90° phase shift: +j for inductive reactance (current lags voltage) and -j for capacitive reactance (current leads voltage).",
  },
  {
    question: 'How does cable impedance affect building electrical systems?',
    answer:
      'Cable impedance (Z = R + jX) affects voltage drop, fault current levels, and system losses. The reactive component (mainly inductive for larger cables) becomes significant for long cable runs. BS 7671 provides cable impedance values (mV/A/m and mΩ/m) for voltage drop and fault loop calculations. Higher frequencies increase cable impedance due to skin effect.',
  },
  {
    question: 'Why is motor impedance important for building services?',
    answer:
      'Motor impedance determines starting current (typically 6-8 times running current), running current, power factor, and system voltage drop. During starting, motor impedance is low (near locked-rotor value), causing high inrush current. Understanding motor impedance is essential for sizing cables, protection devices, and power factor correction equipment.',
  },
  {
    question: 'How do transformers affect impedance in building electrical systems?',
    answer:
      'Transformer impedance (typically 4-6% for distribution transformers) limits fault current and causes voltage drop under load. The impedance is expressed as a percentage of rated voltage: a 5% impedance transformer drops 5% of rated voltage at full load. Lower impedance gives better voltage regulation but higher fault currents.',
  },
  {
    question: 'What happens to circuit impedance at resonance?',
    answer:
      'At resonance, inductive and capacitive reactances are equal and cancel out (Xₗ = Xᴄ). In a series RLC circuit, this minimises impedance to just R, maximising current. In a parallel RLC circuit, impedance becomes maximum. Resonance is used in filters and can cause problems if harmonics excite resonant frequencies in building systems.',
  },
];

const HNCModule3Section2_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 2 · Subsection 2"
            title="Reactance and Impedance in AC Circuits"
            description="Understanding opposition to AC current flow in reactive circuits and building services applications"
            tone="purple"
          />

          <TLDR
            points={[
              'You can compute X_L and X_C at 50 Hz and combine them with R to get impedance Z = √(R² + (X_L − X_C)²) for a series RLC circuit.',
              'You can find the phase angle φ = tan⁻¹((X_L − X_C)/R) and explain whether the load is resistive, inductive or capacitive.',
              'You can apply Z to motor circuit analysis — starting current, running impedance and the difference between blocked-rotor and full-load.',
              'You can use Z in earth-fault-loop calculations — Z_s is impedance, not resistance, on AC circuits with measurable inductance.',
              'You can spot why long cable runs at 50 Hz add reactance as well as resistance and why it matters for fault studies and voltage drop.',
            ]}
          />

          <RegsCallout
            source="BS 7671 — Section 411 (Protection by automatic disconnection of supply)"
            clause="The earth fault loop impedance Z_s at any point of the installation shall satisfy: Z_s × I_a ≤ U₀, where U₀ is the nominal a.c. voltage to earth and I_a is the current causing the protective device to operate within the time stated in Table 41.1."
            meaning={
              <>
                Z_s is impedance, not pure resistance — on three-phase circuits and long
                runs the inductive component matters and the calculated Z is bigger than the
                R₁ + R₂ you measured at DC. Always derive disconnection times from the
                impedance value, not from a continuity-only ohms reading.
              </>
            }
            cite="Source: BS 7671 (latest edition incl. A4:2026) Regulation 411.4.4."
          />

          <LearningOutcomes
            outcomes={[
              'Calculate inductive reactance using Xₗ = 2πfL',
              'Calculate capacitive reactance using Xᴄ = 1/(2πfC)',
              'Understand how frequency affects reactance values',
              'Express impedance in complex form Z = R + jX',
              'Calculate impedance magnitude and phase angle',
              'Apply series and parallel impedance combinations',
              'Analyse motor and transformer equivalent circuits',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="Reactance is frequency-dependent opposition to AC. Combine R and X with Pythagoras to get impedance Z."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inductive reactance:</strong> X<sub>L</sub> = 2πfL (increases with frequency)
              </li>
              <li>
                <strong>Capacitive reactance:</strong> X<sub>C</sub> = 1/(2πfC) (decreases with frequency)
              </li>
              <li>
                <strong>Impedance:</strong> Z = R + jX (complex number)
              </li>
              <li>
                <strong>Magnitude:</strong> |Z| = √(R² + X²)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motor circuits:</strong> Inductive loads, starting current
              </li>
              <li>
                <strong>Power factor correction:</strong> Capacitor sizing
              </li>
              <li>
                <strong>Cable impedance:</strong> Voltage drop, fault calculations
              </li>
              <li>
                <strong>Transformers:</strong> Equivalent circuit impedance
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Inductive Reactance (X_L)">
            <p>
              Inductive reactance is the opposition to AC current flow caused by an inductor. When
              AC current flows through an inductor, the changing magnetic field induces a back-EMF
              that opposes the change in current. This opposition increases with both frequency and
              inductance.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Inductive Reactance Formula</p>
            <p>
              <strong>X<sub>L</sub> = 2πfL = ωL</strong> — Where: f = frequency (Hz), L = inductance
              (H), ω = 2πf (rad/s).
            </p>
            <p className="text-sm font-medium text-white">Key characteristics:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>X<sub>L</sub> is measured in Ohms (Ω)</li>
              <li>Directly proportional to frequency — doubles if frequency doubles</li>
              <li>Directly proportional to inductance</li>
              <li>Current lags voltage by 90° in a pure inductor</li>
              <li>No power is dissipated (energy stored and returned)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Typical Inductance Values in Building Services</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Small single-phase motor:</strong> 50-100mH — X<sub>L</sub> = 15.7-31.4Ω at 50Hz
              </li>
              <li>
                <strong>Three-phase motor (per phase):</strong> 10-50mH — X<sub>L</sub> = 3.14-15.7Ω at 50Hz
              </li>
              <li>
                <strong>Fluorescent ballast:</strong> 0.5-2H — X<sub>L</sub> = 157-628Ω at 50Hz
              </li>
              <li>
                <strong>Choke/reactor:</strong> 1-10mH — X<sub>L</sub> = 0.31-3.14Ω at 50Hz
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Building services note:</strong> Motor windings are primarily inductive. At
              50Hz, a typical motor winding inductance of 50mH gives X<sub>L</sub> = 15.7Ω, but this
              varies with motor loading.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Capacitive Reactance (X_C)">
            <p>
              Capacitive reactance is the opposition to AC current flow caused by a capacitor.
              Capacitors store energy in an electric field between their plates. The opposition
              decreases as frequency increases because higher frequencies allow less time for charge
              to accumulate.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Capacitive Reactance Formula</p>
            <p>
              <strong>X<sub>C</sub> = 1/(2πfC) = 1/(ωC)</strong> — Where: f = frequency (Hz), C =
              capacitance (F), ω = 2πf (rad/s).
            </p>
            <p className="text-sm font-medium text-white">Key characteristics:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>X<sub>C</sub> is measured in Ohms (Ω)</li>
              <li>Inversely proportional to frequency — halves if frequency doubles</li>
              <li>Inversely proportional to capacitance</li>
              <li>Current leads voltage by 90° in a pure capacitor</li>
              <li>No power is dissipated (energy stored and returned)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Power Factor Correction Capacitors</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>5 kVAr (230V):</strong> 95µF — X<sub>C</sub> = 33.5Ω at 50Hz
              </li>
              <li>
                <strong>10 kVAr (400V):</strong> 50µF — X<sub>C</sub> = 63.7Ω at 50Hz
              </li>
              <li>
                <strong>25 kVAr (400V):</strong> 125µF — X<sub>C</sub> = 25.5Ω at 50Hz
              </li>
              <li>
                <strong>50 kVAr (400V):</strong> 250µF — X<sub>C</sub> = 12.7Ω at 50Hz
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Frequency Dependence Comparison (L = 100mH; C = 100µF)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>50Hz: X<sub>L</sub> = 31.4Ω; X<sub>C</sub> = 31.8Ω</li>
              <li>100Hz: X<sub>L</sub> = 62.8Ω; X<sub>C</sub> = 15.9Ω</li>
              <li>150Hz: X<sub>L</sub> = 94.2Ω; X<sub>C</sub> = 10.6Ω</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Harmonic consideration:</strong> Capacitive reactance decreases at harmonic
              frequencies, which can cause capacitors to absorb excessive harmonic currents,
              leading to overheating.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Complex Impedance (Z = R + jX)">
            <p>
              Impedance combines resistance and reactance into a single quantity that describes the
              total opposition to AC current. Because resistance and reactance are 90° out of phase,
              they must be combined using complex numbers or the Pythagorean theorem.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Complex Impedance Form</p>
            <p>
              <strong>Z = R + jX</strong> — Where R = resistance, X = net reactance (X<sub>L</sub> -
              X<sub>C</sub>), j = √-1.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inductive:</strong> Z = R + jX<sub>L</sub> — Current lags voltage
              </li>
              <li>
                <strong>Capacitive:</strong> Z = R - jX<sub>C</sub> — Current leads voltage
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Impedance Magnitude and Phase Angle</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>|Z| = √(R² + X²)</strong> — Total opposition in Ohms
              </li>
              <li>
                <strong>θ = arctan(X/R)</strong> — Angle between V and I
              </li>
            </ul>
            <p className="text-sm font-medium text-white">Understanding the j operator:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>j = √-1</strong> represents a 90° phase shift
              </li>
              <li>
                <strong>+jX</strong> means reactance leads resistance (inductive)
              </li>
              <li>
                <strong>-jX</strong> means reactance lags resistance (capacitive)
              </li>
              <li>Electrical engineers use j (not i) because i represents current</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Impedance Triangle</p>
            <p>
              Right-angled triangle: R along the base, X up the side, |Z| as the hypotenuse. |Z| =
              √(R² + X²); θ = arctan(X/R).
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Power factor link:</strong> cos(θ) = R/|Z| = power factor. A phase angle of 0°
              means purely resistive (pf = 1), while 90° means purely reactive (pf = 0).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Series and Parallel Impedance Combinations">
            <p>
              Impedances combine using the same rules as resistances, but with complex arithmetic.
              This is essential for analysing practical circuits with multiple components,
              including motor equivalent circuits and transformer models.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Series Impedance</p>
            <p>
              <strong>Z<sub>T</sub> = Z<sub>1</sub> + Z<sub>2</sub> + Z<sub>3</sub> + ...</strong>
              {' '}— Add complex impedances directly: (R<sub>1</sub> + jX<sub>1</sub>) + (R<sub>2</sub>
              + jX<sub>2</sub>) = (R<sub>1</sub> + R<sub>2</sub>) + j(X<sub>1</sub> + X<sub>2</sub>).
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Parallel Impedance</p>
            <p>
              <strong>1/Z<sub>T</sub> = 1/Z<sub>1</sub> + 1/Z<sub>2</sub> + ...</strong> For two
              impedances: Z<sub>T</sub> = (Z<sub>1</sub> × Z<sub>2</sub>)/(Z<sub>1</sub> + Z<sub>2</sub>).
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Applications</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motor circuit (cable + motor):</strong> Series — Z<sub>cable</sub> + Z<sub>motor</sub>
              </li>
              <li>
                <strong>PFC capacitor with motor:</strong> Parallel — reduces net reactive component
              </li>
              <li>
                <strong>Parallel loads on busbar:</strong> Parallel — combined load impedance
              </li>
              <li>
                <strong>Fault loop (source + cable):</strong> Series — Z<sub>s</sub> = Z<sub>e</sub> + Z<sub>cable</sub>
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Cable Impedance (BS 7671)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>2.5mm²:</strong> R = 7.41 mΩ/m; X = 0.1 mΩ/m; |Z| = 7.41 mΩ/m
              </li>
              <li>
                <strong>25mm²:</strong> R = 0.727 mΩ/m; X = 0.08 mΩ/m; |Z| = 0.73 mΩ/m
              </li>
              <li>
                <strong>95mm²:</strong> R = 0.193 mΩ/m; X = 0.075 mΩ/m; |Z| = 0.21 mΩ/m
              </li>
              <li>
                <strong>300mm²:</strong> R = 0.0601 mΩ/m; X = 0.07 mΩ/m; |Z| = 0.09 mΩ/m
              </li>
            </ul>
            <p>For larger cables, reactance becomes more significant relative to resistance.</p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Design note:</strong> For small cables (&lt;25mm²), reactance is negligible
              and Z ≈ R. For larger cables, especially long runs, include reactance in voltage drop
              calculations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">Example 1: Motor Circuit Impedance</p>
            <p>
              <strong>Question:</strong> A single-phase motor has winding resistance R = 8Ω and
              inductance L = 50mH. Calculate the impedance at 50Hz and the current drawn from 230V
              supply.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>X<sub>L</sub> = 2πfL = 2π × 50 × 0.050 = <strong>15.7Ω</strong></li>
              <li>|Z| = √(R² + X<sub>L</sub>²) = √(64 + 246.5) = √310.5 = <strong>17.6Ω</strong></li>
              <li>I = V/|Z| = 230/17.6 = <strong>13.1A</strong></li>
              <li>θ = arctan(15.7/8) = <strong>63°</strong> lagging → pf = cos(63°) = 0.45</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 2: Power Factor Correction</p>
            <p>
              <strong>Question:</strong> A motor draws 20A at 0.7 power factor lagging from 230V
              supply. Calculate the capacitor reactance needed to improve power factor to 0.95.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>|Z| = V/I = 230/20 = 11.5Ω; θ<sub>1</sub> = arccos(0.7) = 45.6°</li>
              <li>R = 11.5 × 0.7 = 8.05Ω; X<sub>L</sub> = 11.5 × 0.714 = 8.21Ω</li>
              <li>θ<sub>2</sub> = arccos(0.95) = 18.2° → X<sub>new</sub> = R × tan(θ<sub>2</sub>) = 8.05 × 0.329 = 2.65Ω</li>
              <li>X<sub>C</sub> = X<sub>L</sub> - X<sub>new</sub> = 8.21 - 2.65 = <strong>5.56Ω</strong></li>
              <li>C = 1/(2πfX<sub>C</sub>) = 1/(2π × 50 × 5.56) = <strong>573µF</strong></li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 3: Transformer Equivalent Circuit</p>
            <p>
              <strong>Question:</strong> A 100kVA transformer has 4% impedance with X/R ratio of
              10. Calculate the equivalent resistance and reactance referred to the 400V secondary.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Z<sub>base</sub> = V²/S = 400²/100000 = 1.6Ω</li>
              <li>Z<sub>T</sub> = 4% × Z<sub>base</sub> = 0.04 × 1.6 = <strong>0.064Ω</strong></li>
              <li>Given X/R = 10, |Z|² = R² + (10R)² = 101R² → R = 0.064/10.05 = <strong>6.4 mΩ</strong></li>
              <li>X = 10R = <strong>64 mΩ</strong> → Z = 0.0064 + j0.064 Ω</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 4: Fault Loop Impedance</p>
            <p>
              <strong>Question:</strong> A circuit has external earth fault loop impedance Z<sub>e</sub>
              = 0.35Ω and uses 30m of 4mm² cable (R = 4.61mΩ/m, X = 0.1mΩ/m). Calculate total Z<sub>s</sub>.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>R<sub>cable</sub> = 30 × 2 × 4.61 mΩ = 0.277Ω; X<sub>cable</sub> = 30 × 2 × 0.1 mΩ = 0.006Ω</li>
              <li>Assuming Z<sub>e</sub> resistive: R<sub>total</sub> = 0.35 + 0.277 = 0.627Ω; X<sub>total</sub> = 0.006Ω</li>
              <li>|Z<sub>s</sub>| = √(0.627² + 0.006²) ≈ <strong>0.627Ω</strong> (X negligible for 4mm²)</li>
              <li>I<sub>pf</sub> = U₀/Z<sub>s</sub> = 230/0.627 = <strong>367A</strong></li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>X<sub>L</sub> = 2πfL</strong> — Inductive reactance
              </li>
              <li>
                <strong>X<sub>C</sub> = 1/(2πfC)</strong> — Capacitive reactance
              </li>
              <li>
                <strong>Z = R + jX</strong> — Complex impedance
              </li>
              <li>
                <strong>|Z| = √(R² + X²)</strong> — Impedance magnitude
              </li>
              <li>
                <strong>θ = arctan(X/R)</strong> — Phase angle
              </li>
              <li>
                <strong>cos θ = R/|Z|</strong> — Power factor
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Values to Remember</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2π × 50Hz = <strong>314.16 rad/s</strong></li>
              <li>At 50Hz: X<sub>L</sub> = 314L (L in henrys)</li>
              <li>At 50Hz: X<sub>C</sub> = 3183/C (C in µF gives X in Ω)</li>
              <li>Cables &lt;25mm²: X ≈ 0, use R only</li>
              <li>Cables &gt;95mm²: include X in calculations</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Applications</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motor starting:</strong> Low speed = low back-EMF = low impedance = high current
              </li>
              <li>
                <strong>PFC capacitors:</strong> Size to cancel motor inductive reactance
              </li>
              <li>
                <strong>Transformer sizing:</strong> % impedance determines fault current and Vdrop
              </li>
              <li>
                <strong>Harmonic filters:</strong> Tuned LC circuits at specific frequencies
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common reactance and impedance mistakes"
            whatHappens={
              <>
                Adding R and X arithmetically (must use Pythagoras). Wrong units (mH, µF). Forgetting
                that reactance depends on frequency. Sign errors: X<sub>L</sub> is +j, X<sub>C</sub> is
                -j. Ignoring cable reactance on long large cable runs.
              </>
            }
            doInstead={
              <>
                Use |Z| = √(R²+X²). Convert to base SI units before substituting. Always specify
                frequency. Treat inductive as +j, capacitive as -j when summing. Include X for cables
                ≥95mm² over long runs.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Calculating starting current for a 15 kW AHU motor"
            situation={
              <>
                A 15 kW three-phase induction motor on the supply-air AHU has a measured
                running impedance of (3 + j5) Ω per phase. The blocked-rotor (locked-rotor)
                impedance is roughly one sixth of running impedance because rotor reactance
                drops at standstill. You need to estimate Direct-On-Line starting current to
                size cable, MCCB and feeder transformer.
              </>
            }
            whatToDo={
              <>
                Compute running impedance: |Z_run| = √(3² + 5²) = √34 ≈
                5.83 Ω, giving full-load line current of 230 / 5.83 ≈ 39 A. Estimate
                blocked-rotor impedance |Z_start| ≈ 5.83 / 6 ≈ 0.97 Ω, giving
                DOL starting current ≈ 230 / 0.97 ≈ 237 A — about 6 × FLC,
                consistent with NEMA Code F. Pick a Type C or D MCB sized for the running
                load but rated to ride through the start, and confirm the upstream
                transformer can deliver 237 A for several seconds without excessive voltage
                dip (≤ 5 % is the usual target).
              </>
            }
            whyItMatters={
              <>
                Impedance is the only correct model for AC starting current. Treating the
                motor as a pure resistance under-estimates inrush by a factor of six — the
                upstream MCB nuisance-trips on every start, the cable cooks under repeated
                inrush, and the feeder transformer dips voltage on neighbouring circuits.
                Soft-start or VFD systems exist precisely because of this DOL starting
                impedance behaviour.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Impedance Z (Ω) is the AC analogue of resistance — the total opposition to current including both R and X.',
              'Series RLC: Z = √(R² + (X_L − X_C)²). Phase angle φ = tan⁻¹((X_L − X_C)/R).',
              'Inductive reactance X_L = 2πfL = 314L at 50 Hz — rises with frequency, the source of inrush and back-EMF.',
              'Capacitive reactance X_C = 1/(2πfC) = 1/(314C) at 50 Hz — falls with frequency, used for PFC and harmonic-filter tuning.',
              'Pure R: V and I in phase, PF = 1. Pure L: V leads I by 90°. Pure C: I leads V by 90°. Real loads sit somewhere in between.',
              'Motor running impedance is much higher than blocked-rotor impedance — DOL starting current is typically 5–7 × full-load current.',
              'Z_s on AC circuits is impedance, not just resistance — inductive component matters on long runs and three-phase circuits.',
              'Cable mV/A/m tables in BS 7671 Appendix 4 already include the inductive reactance contribution at 50 Hz — use them, do not redo the maths.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section2-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Inductance & Capacitance
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section2-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Phase Angle & Phasors
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section2_2;
