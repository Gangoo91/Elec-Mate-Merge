/**
 * Module 3 · Section 4 · Subsection 4 — Calculations of Three-Phase Power (kW, kVA, PF)
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   Three-phase P, Q, S arithmetic — single- and two-wattmeter measurement, transformer
 *   and DNO supply sizing, PFC bank specification. The numbers behind every BSE
 *   distribution and connection-charge calculation.
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

const TITLE = 'Calculations of Three-Phase Power (kW, kVA, PF) - HNC Module 3 Section 4.4';
const DESCRIPTION =
  'Master three-phase power calculations including real power (kW), apparent power (kVA), reactive power (kVAr), power factor correction, and practical measurement techniques for building services design.';

const quickCheckQuestions = [
  {
    id: 'three-phase-power-formula',
    question: 'What is the formula for three-phase real power?',
    options: ['P = VL × IL', 'P = 3 × VL × IL', 'P = √3 × VL × IL × cos φ', 'P = VL × IL × cos φ'],
    correctIndex: 2,
    explanation:
      'Three-phase real power P = √3 × VL × IL × cos φ, where VL is line voltage, IL is line current, and cos φ is the power factor. The √3 factor accounts for the 120° phase displacement between phases.',
  },
  {
    id: 'apparent-power',
    question: 'A three-phase load draws 100A at 400V. What is the apparent power?',
    options: ['40 kVA', '69.3 kVA', '120 kVA', '173 kVA'],
    correctIndex: 1,
    explanation:
      'Apparent power S = √3 × VL × IL = 1.732 × 400 × 100 = 69,280 VA = 69.3 kVA. This is the total power supplied, before considering power factor.',
  },
  {
    id: 'power-factor-meaning',
    question: 'What does a power factor of 0.8 lagging indicate?',
    options: [
      'The load is purely resistive',
      'Current leads voltage by 36.87°',
      'Current lags voltage by 36.87° (inductive load)',
      '20% of power is wasted as heat',
    ],
    correctIndex: 2,
    explanation:
      "A power factor of 0.8 lagging means cos φ = 0.8, so φ = 36.87°. 'Lagging' indicates an inductive load where current lags behind voltage - typical of motors and transformers.",
  },
  {
    id: 'two-wattmeter-reading',
    question: 'In the two-wattmeter method, if W1 = 50kW and W2 = 30kW, what is the total power?',
    options: ['20 kW', '40 kW', '80 kW', '150 kW'],
    correctIndex: 2,
    explanation:
      'Total three-phase power P = W1 + W2 = 50 + 30 = 80 kW. The two-wattmeter method gives total power as the algebraic sum of both readings.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the relationship between apparent power (S), real power (P), and reactive power (Q)?',
    options: ['S = P + Q', 'S² = P² + Q²', 'S = P × Q', 'S = P - Q'],
    correctAnswer: 1,
    explanation:
      'The power triangle relationship is S² = P² + Q², or S = √(P² + Q²). Apparent power is the vector sum of real and reactive power, not their arithmetic sum.',
  },
  {
    id: 2,
    question:
      'A 75kW three-phase motor operates at 0.85 power factor on 400V. What is the line current?',
    options: ['108A', '127A', '150A', '220A'],
    correctAnswer: 1,
    explanation:
      'Using P = √3 × VL × IL × cos φ: IL = P / (√3 × VL × cos φ) = 75,000 / (1.732 × 400 × 0.85) = 75,000 / 588.9 = 127.4A',
  },
  {
    id: 3,
    question:
      'What is the reactive power drawn by a load with 100kVA apparent power and 0.8 power factor?',
    options: ['20 kVAr', '60 kVAr', '80 kVAr', '125 kVAr'],
    correctAnswer: 1,
    explanation:
      'Using S² = P² + Q²: P = S × pf = 100 × 0.8 = 80kW. Q = √(S² - P²) = √(100² - 80²) = √3600 = 60 kVAr',
  },
  {
    id: 4,
    question: 'Why do electricity suppliers penalise consumers with poor power factor?',
    options: [
      'Poor power factor causes more harmonics',
      'It increases the current for a given real power, stressing infrastructure',
      'It causes voltage spikes in the network',
      'Low power factor increases energy consumption',
    ],
    correctAnswer: 1,
    explanation:
      'Poor power factor means higher current is required to deliver the same real power. This increases I²R losses in cables and transformers, and requires larger capacity infrastructure - costs the supplier bears.',
  },
  {
    id: 5,
    question: 'In the two-wattmeter method, what does it indicate if one wattmeter reads negative?',
    options: [
      'The wattmeter is faulty',
      'Power factor is below 0.5',
      'The load is unbalanced',
      'There is a phase reversal',
    ],
    correctAnswer: 1,
    explanation:
      'When power factor drops below 0.5 (φ > 60°), one wattmeter reads negative. Total power is still W1 + W2 (algebraic sum). This is a useful diagnostic for very poor power factor loads.',
  },
  {
    id: 6,
    question:
      'A commercial building has a maximum demand of 250kVA. If the power factor is improved from 0.7 to 0.95, what is the new kVA demand for the same kW load?',
    options: ['184 kVA', '238 kVA', '175 kVA', '263 kVA'],
    correctAnswer: 0,
    explanation:
      'Original kW = 250 × 0.7 = 175kW. With improved pf: New kVA = 175 / 0.95 = 184.2 kVA. Power factor correction reduces apparent power demand by 26%.',
  },
  {
    id: 7,
    question: 'What is the power factor of a purely resistive three-phase load?',
    options: ['0', '0.85', '1.0', '1.732'],
    correctAnswer: 2,
    explanation:
      'A purely resistive load has no reactive component - current and voltage are in phase. Therefore cos φ = cos 0° = 1.0 (unity power factor).',
  },
  {
    id: 8,
    question:
      'A 500kVA transformer supplies a building at 0.8 power factor. What is the maximum real power available?',
    options: ['400 kW', '500 kW', '625 kW', '300 kW'],
    correctAnswer: 0,
    explanation:
      "Real power P = S × pf = 500 × 0.8 = 400kW. The transformer is rated in kVA because it must handle both real and reactive power - the actual kW depends on the load's power factor.",
  },
  {
    id: 9,
    question: 'What is the formula for calculating power factor from two-wattmeter readings?',
    options: [
      'pf = W1 / W2',
      'pf = (W1 - W2) / (W1 + W2)',
      'tan φ = √3(W1 - W2) / (W1 + W2)',
      'pf = (W1 + W2) / √3',
    ],
    correctAnswer: 2,
    explanation:
      'The power factor angle can be found from tan φ = √3(W1 - W2) / (W1 + W2). Then pf = cos φ. This allows power factor measurement without separate instrumentation.',
  },
  {
    id: 10,
    question:
      "A factory's maximum demand is 800kW at 0.75 power factor. How much capacitive kVAr is needed to improve pf to 0.95?",
    options: ['350 kVAr', '440 kVAr', '530 kVAr', '266 kVAr'],
    correctAnswer: 0,
    explanation:
      'Original Q1 = P × tan(cos⁻¹ 0.75) = 800 × 0.882 = 705.6 kVAr. Target Q2 = 800 × tan(cos⁻¹ 0.95) = 800 × 0.329 = 263.2 kVAr. Capacitor kVAr = 705.6 - 263.2 = 442.4 kVAr ≈ 440 kVAr',
  },
];

const faqs = [
  {
    question: 'Why are transformers rated in kVA rather than kW?',
    answer:
      "Transformers must handle the total current flowing through them, regardless of power factor. A transformer rated at 500kVA can supply 500kW at unity pf, but only 400kW at 0.8pf - the same current in both cases. Rating in kVA ensures the transformer isn't overloaded regardless of the connected load's power factor.",
  },
  {
    question: 'What causes lagging power factor in buildings?',
    answer:
      'Inductive loads cause lagging power factor: motors (HVAC, lifts, pumps), transformers, fluorescent lamp ballasts (older magnetic types), and induction heating. Motors are the primary cause in most commercial buildings, drawing magnetising current that lags the voltage.',
  },
  {
    question: 'How is power factor correction achieved?',
    answer:
      'Capacitor banks are connected in parallel with inductive loads. Capacitors draw leading current that partially cancels the lagging current from motors. Correction can be individual (at each motor), group (at distribution boards), or bulk (at the main switchboard). Target pf is typically 0.95-0.98.',
  },
  {
    question: 'Why not correct power factor to unity (1.0)?',
    answer:
      'Correcting to exactly 1.0 risks over-correction when loads vary, which can cause leading power factor and voltage rise. Additionally, capacitors may resonate with system inductance at certain frequencies. A target of 0.95-0.98 provides good efficiency without these risks.',
  },
  {
    question: 'What is the difference between displacement and distortion power factor?',
    answer:
      "Displacement power factor (cos φ) relates to the phase angle between fundamental voltage and current - what we've discussed here. Distortion power factor accounts for harmonic currents from non-linear loads (VFDs, LED drivers, IT equipment). True power factor combines both: PFtrue = PFdisplacement × PFdistortion.",
  },
  {
    question: "How do I interpret my electricity bill's kVA maximum demand charge?",
    answer:
      "Suppliers measure your peak kVA demand over each billing period (often in 30-minute intervals). If your power factor is poor, you pay for kVA you can't use productively. For example, at pf = 0.7, you pay for 100kVA but only get 70kW of useful power. Improving pf reduces your maximum demand charges.",
  },
];

const HNCModule3Section4_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4 · Subsection 4"
            title="Calculations of Three-Phase Power"
            description="Real power (kW), apparent power (kVA), reactive power (kVAr), and power factor in three-phase systems"
            tone="purple"
          />

          <TLDR
            points={[
              'You apply P = &radic;3 &times; V&#x2097; &times; I&#x2097; &times; cos&phi; on every three-phase calculation — and S = &radic;3 &times; V&#x2097; &times; I&#x2097; for kVA without the pf factor.',
              'You convert kW &harr; kVA via pf at every transformer, generator and DNO supply sizing exercise — never assume unity pf on real BSE loads.',
              'You apply two-wattmeter method (3-wire delta) or three-wattmeter method (4-wire star) for measurement on test sheets and energy submetering.',
              'You size PFC banks via kVAr = kW &times; (tan&phi;&#x2081; &minus; tan&phi;&#x2082;) — target 0.95 pf to clear DNO reactive penalties on commercial tariffs.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 311.2 (Diversity)"
            clause="In determining the maximum demand of an installation or part thereof, diversity may be taken into account."
            meaning={
              <>
                BS 7671 311.2 lets you apply diversity (CIBSE Guide F or IET On-Site
                Guide tables) to connected three-phase loads when calculating maximum
                demand for transformer and DNO supply sizing. As BSE designer your
                arithmetic chain is: nameplate kW &rarr; diversity factor &rarr; assumed pf
                &rarr; kVA &rarr; round up to standard transformer/DNO rating. This is the
                single most commercially significant calculation on the project &mdash;
                the substation rating is the basis of the connection charge.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Reg 311.2; CIBSE Guide F (Energy efficiency in buildings); IET On-Site Guide diversity tables; ENA Engineering Recommendation P28 / G99"
          />

          <LearningOutcomes
            outcomes={[
              'Calculate three-phase real, apparent, and reactive power',
              'Apply the power triangle to solve practical problems',
              'Understand the two-wattmeter method for power measurement',
              'Determine power factor from measurements',
              'Size transformers and main supplies for buildings',
              'Calculate power factor correction requirements',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="Three-phase power has three forms — real (kW), apparent (kVA) and reactive (kVAr) — linked by the power triangle and power factor."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Real power (P):</strong> √3 × VL × IL × cos φ (kW)
              </li>
              <li>
                <strong>Apparent power (S):</strong> √3 × VL × IL (kVA)
              </li>
              <li>
                <strong>Reactive power (Q):</strong> √3 × VL × IL × sin φ (kVAr)
              </li>
              <li>
                <strong>Power factor:</strong> P/S = cos φ (0 to 1)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Transformer sizing:</strong> Based on kVA not kW
              </li>
              <li>
                <strong>Maximum demand:</strong> Typically 0.8-0.9 pf assumed
              </li>
              <li>
                <strong>Supply agreements:</strong> kVA charges for poor pf
              </li>
              <li>
                <strong>PF correction:</strong> Capacitors to reduce kVA demand
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Three-Phase Real Power Formula">
            <p>
              Three-phase real power (also called true power or active power) represents the actual
              work done by the electrical system - the power that drives motors, heats elements, and
              produces light. It is measured in kilowatts (kW) or watts (W).
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Fundamental Three-Phase Power Equation
            </p>
            <p>
              P = √3 × V<sub>L</sub> × I<sub>L</sub> × cos φ
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>P = Real power (watts)</li>
              <li>VL = Line voltage (400V in UK)</li>
              <li>IL = Line current (amps)</li>
              <li>cos φ = Power factor</li>
            </ul>
            <p className="text-sm font-medium text-white">Why √3 (1.732)?</p>
            <p>
              The √3 factor arises from the 120° phase displacement between the three phases. In a
              balanced three-phase system, power is delivered continuously (unlike single-phase
              which pulsates). The mathematical derivation shows that total instantaneous power
              equals √3 × VL × IL × cos φ at all times.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Alternative Forms</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>P = √3 × VL × IL × cos φ:</strong> Line values — most common, direct
                measurement
              </li>
              <li>
                <strong>P = 3 × VP × IP × cos φ:</strong> Phase values — when phase values are known
              </li>
              <li>
                <strong>P = 3 × IP² × R:</strong> Current and resistance — resistive loads, cable
                losses
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> For a balanced load, the power in each phase is P/3. The
              √3 factor converts between line and phase quantities automatically.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Apparent Power (kVA)">
            <p>
              Apparent power represents the total power supplied to the circuit - the combination of
              real power that does useful work and reactive power that sustains magnetic and
              electric fields. It determines the current flowing and hence the capacity required for
              cables, switchgear, and transformers.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Apparent Power Formula</p>
            <p>
              S = √3 × V<sub>L</sub> × I<sub>L</sub> — Unit: Volt-Amperes (VA) or kilovolt-amperes
              (kVA)
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Why kVA Matters</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Transformers are rated in kVA</li>
              <li>Generators are rated in kVA</li>
              <li>Supply agreements specify kVA</li>
              <li>Cable sizing based on current (hence kVA)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">kVA vs kW</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>kVA = kW only at unity pf</li>
              <li>kVA {'>'} kW for all other loads</li>
              <li>kW/kVA = power factor</li>
              <li>Poor pf means higher kVA for same kW</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Typical Equipment Ratings</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Transformers:</strong> kVA — must handle total current regardless of pf
              </li>
              <li>
                <strong>Generators:</strong> kVA — alternator heating depends on current
              </li>
              <li>
                <strong>UPS systems:</strong> kVA — inverter capacity is current-limited
              </li>
              <li>
                <strong>Motors:</strong> kW — mechanical output is real power
              </li>
              <li>
                <strong>Heaters:</strong> kW — heat output is real power (pf ≈ 1)
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> When specifying transformers, use kVA and assume the load
              power factor. A 500kVA transformer at pf = 0.8 delivers only 400kW of useful power.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Reactive Power (kVAr)">
            <p>
              Reactive power is the power that oscillates between the source and the reactive
              components (inductors and capacitors) of the load. It does no useful work but is
              essential for establishing magnetic fields in motors and transformers.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Reactive Power Formula</p>
            <p>
              Q = √3 × V<sub>L</sub> × I<sub>L</sub> × sin φ — Unit: Volt-Amperes Reactive (VAr) or
              kilovolt-amperes reactive (kVAr)
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">The Power Triangle</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>S² = P² + Q² (hypotenuse equals apparent power)</li>
              <li>tan φ = Q/P</li>
              <li>cos φ = P/S (Power Factor)</li>
              <li>Real power P sits along the horizontal axis (kW)</li>
              <li>Reactive power Q sits along the vertical axis (kVAr)</li>
              <li>Apparent power S is the hypotenuse (kVA)</li>
            </ul>
            <p className="text-sm font-medium text-white">Types of Reactive Power</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inductive (QL):</strong> Motors, transformers — current lags voltage; +Q
                (consumed)
              </li>
              <li>
                <strong>Capacitive (QC):</strong> Capacitors, long cables — current leads voltage;
                -Q (supplied)
              </li>
            </ul>
            <p className="text-sm text-white italic">
              <strong>Net reactive power:</strong> Q<sub>net</sub> = Q<sub>L</sub> - Q<sub>C</sub>.
              Power factor correction adds capacitive kVAr to cancel inductive kVAr.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Two-Wattmeter Method for Power Measurement">
            <p>
              The two-wattmeter method is a practical technique for measuring total power in a
              three-phase, three-wire system. It works for both balanced and unbalanced loads and
              can also determine the power factor.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Connection Arrangement</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>W1: Current coil in L1, voltage coil L1-L2</li>
              <li>W2: Current coil in L3, voltage coil L3-L2</li>
              <li>L2 is the common reference for both wattmeter voltage coils</li>
              <li>No connection to the neutral required</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Two-Wattmeter Equations</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>
                  P<sub>total</sub> = W<sub>1</sub> + W<sub>2</sub>
                </strong>{' '}
                — Total real power
              </li>
              <li>
                <strong>
                  tan φ = √3 × (W<sub>1</sub> - W<sub>2</sub>) / (W<sub>1</sub> + W<sub>2</sub>)
                </strong>{' '}
                — Power factor angle
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Interpreting Wattmeter Readings
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>pf = 1.0 (unity):</strong> W1 positive, W2 positive — W1 = W2
              </li>
              <li>
                <strong>pf = 0.866:</strong> W1 positive, W2 positive — W1 = 2 × W2
              </li>
              <li>
                <strong>pf = 0.5:</strong> W1 positive, W2 zero — W2 = 0
              </li>
              <li>
                <strong>pf {'<'} 0.5:</strong> W1 positive, W2 negative — W1 + (-W2) = P
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> Modern three-phase power analysers use digital
              sampling and FFT, but the two-wattmeter principle is still useful for understanding
              readings and verification.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Power Factor in Three-Phase Systems">
            <p>
              Power factor is the ratio of real power to apparent power. It indicates how
              effectively the electrical power is being converted into useful work output. A poor
              power factor means the supply must provide more current (and hence more kVA) to
              deliver the same amount of useful power.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Power Factor Definition</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>pf = P / S</strong> — Basic definition
              </li>
              <li>
                <strong>pf = cos φ</strong> — Phase angle method
              </li>
              <li>
                <strong>pf = kW / kVA</strong> — Practical form
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Typical Power Factors by Load Type
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Resistive heaters:</strong> 1.0 — unity
              </li>
              <li>
                <strong>Incandescent lamps:</strong> 1.0 — unity
              </li>
              <li>
                <strong>Fluorescent lamps (electronic):</strong> 0.95-0.98 — lagging (corrected)
              </li>
              <li>
                <strong>LED drivers:</strong> 0.90-0.95 — varies (often corrected)
              </li>
              <li>
                <strong>Induction motors (full load):</strong> 0.80-0.90 — lagging
              </li>
              <li>
                <strong>Induction motors (light load):</strong> 0.30-0.50 — lagging
              </li>
              <li>
                <strong>Variable frequency drives:</strong> 0.95-0.98 — near unity
              </li>
              <li>
                <strong>Welding equipment:</strong> 0.50-0.70 — lagging
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Economic impact:</strong> Improving power factor from 0.7 to 0.95 reduces the
              current (and hence kVA demand) by 26% for the same kW output.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="kW vs kVA in Specifications">
            <p>
              Understanding when to use kW and when to use kVA is crucial for correct specification
              of electrical equipment. Using the wrong unit can lead to under-sized or over-sized
              equipment, with cost and performance implications.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Specify in kW when:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Describing mechanical output (motors)</li>
              <li>Calculating energy consumption (kWh)</li>
              <li>Specifying heating loads</li>
              <li>Determining electricity costs</li>
              <li>Comparing equipment efficiency</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Specify in kVA when:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sizing transformers</li>
              <li>Specifying generators</li>
              <li>Sizing UPS systems</li>
              <li>Determining cable sizes</li>
              <li>Agreeing supply capacity with DNO</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Conversion Between kW and kVA</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>kVA = kW / pf</strong> — kW to kVA
              </li>
              <li>
                <strong>kW = kVA × pf</strong> — kVA to kW
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example: Sizing a Transformer</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Building load: 200kW at 0.8 power factor</li>
              <li>
                Required kVA = 200 / 0.8 = <strong>250 kVA</strong>
              </li>
              <li>
                Select transformer: <strong>315 kVA</strong> (next standard size)
              </li>
              <li>This provides ~25% spare capacity for growth</li>
            </ul>
            <p className="text-sm text-white italic">
              <strong>Common error:</strong> Specifying a 200kW generator for a 200kW load. At
              0.8pf, this load requires 250kVA, so a 250kVA (200kW) generator would be fully loaded.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Maximum Demand Calculations">
            <p>
              Maximum demand (MD) is the highest load expected to occur at any one time. It
              determines the capacity of the incoming supply, main cables, and distribution
              equipment. Accurate MD assessment is essential for cost-effective design.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Maximum Demand Calculation Process
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>List all connected loads with their ratings</li>
              <li>Apply diversity factors from BS 7671 Appendix 1 or experience</li>
              <li>Sum the diversified loads</li>
              <li>Apply an overall building diversity factor if appropriate</li>
              <li>Convert to kVA using expected power factor</li>
              <li>Add margin for future growth (typically 20-25%)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Typical Diversity Factors</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lighting:</strong> 0.90-1.00 — high for offices, lower for warehouses
              </li>
              <li>
                <strong>Socket outlets (commercial):</strong> 0.30-0.50 — depends on usage pattern
              </li>
              <li>
                <strong>HVAC:</strong> 0.80-1.00 — seasonal peaks considered
              </li>
              <li>
                <strong>Lifts:</strong> 0.60-0.80 — not all running simultaneously
              </li>
              <li>
                <strong>Cooking equipment:</strong> 0.60-0.80 — thermostatic control
              </li>
              <li>
                <strong>IT equipment:</strong> 0.70-0.90 — varies with occupancy
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Power Factor Assumptions</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Office buildings:</strong> 0.85-0.90 (mixed lighting, IT, HVAC)
              </li>
              <li>
                <strong>Industrial:</strong> 0.75-0.85 (heavy motor loads)
              </li>
              <li>
                <strong>Retail:</strong> 0.90-0.95 (mainly lighting, some HVAC)
              </li>
              <li>
                <strong>Data centres:</strong> 0.95-0.98 (UPS with pf correction)
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>DNO requirements:</strong> Electricity distributors require power factor of
              0.95 or better. Consumers with poor pf may face kVA-based maximum demand charges.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Building Services: Transformer Sizing and Supply Calculations">
            <p>
              Building services engineers must correctly size electrical infrastructure to meet the
              building's power requirements safely, efficiently, and economically. This involves
              understanding the relationship between connected load, maximum demand, and supply
              capacity.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Transformer Sizing Methodology</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Calculate maximum demand (kW) with diversity</li>
              <li>Divide by expected power factor: kVA = kW / pf</li>
              <li>Add allowance for future growth (typically 20-25%)</li>
              <li>Select next standard transformer size</li>
              <li>Verify transformer can handle starting currents (motor loads)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Standard UK Transformer Ratings (Oil-Filled)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>100 kVA:</strong> Full load 144A — small retail, workshops
              </li>
              <li>
                <strong>200 kVA:</strong> Full load 289A — medium commercial
              </li>
              <li>
                <strong>315 kVA:</strong> Full load 455A — small office blocks
              </li>
              <li>
                <strong>500 kVA:</strong> Full load 722A — medium office, retail
              </li>
              <li>
                <strong>800 kVA:</strong> Full load 1155A — large commercial
              </li>
              <li>
                <strong>1000 kVA:</strong> Full load 1443A — multi-storey, industrial
              </li>
              <li>
                <strong>1600 kVA:</strong> Full load 2309A — large industrial
              </li>
              <li>Note: Full load current calculated at 400V three-phase: I = kVA × 1000 / (√3 × 400)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Supply Agreement Considerations
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Agreed supply capacity (ASC):</strong> The kVA the DNO agrees to provide
              </li>
              <li>
                <strong>Available capacity:</strong> What the local network can support
              </li>
              <li>
                <strong>Connection charge:</strong> Based on capacity and distance to network
              </li>
              <li>
                <strong>Reactive power charges:</strong> Applied if pf {'<'} 0.95
              </li>
              <li>
                <strong>Maximum demand indicator:</strong> Records peak kVA for billing
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Cost optimisation:</strong> Accurately sizing supply capacity avoids paying
              for unused capacity while ensuring sufficient headroom for operational peaks and
              future growth.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 1: Three-Phase Motor Power Calculation
            </p>
            <p>
              <strong>Question:</strong> A three-phase induction motor draws 45A at 400V with a
              power factor of 0.85. Calculate the real, apparent, and reactive power.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Apparent power: S = √3 × VL × IL</li>
              <li>
                S = 1.732 × 400 × 45 = <strong>31,176 VA = 31.2 kVA</strong>
              </li>
              <li>Real power: P = S × cos φ</li>
              <li>
                P = 31.2 × 0.85 = <strong>26.5 kW</strong>
              </li>
              <li>Reactive power: Q = S × sin φ</li>
              <li>sin φ = sin(cos⁻¹ 0.85) = 0.527</li>
              <li>
                Q = 31.2 × 0.527 = <strong>16.4 kVAr</strong>
              </li>
              <li>Check: √(26.5² + 16.4²) = √(702 + 269) = √971 = 31.2 kVA ✓</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 2: Two-Wattmeter Method
            </p>
            <p>
              <strong>Question:</strong> Two wattmeters connected to a balanced three-phase load
              read 42kW and 18kW. Calculate the total power and power factor.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total power: P = W1 + W2</li>
              <li>
                P = 42 + 18 = <strong>60 kW</strong>
              </li>
              <li>Power factor angle: tan φ = √3 × (W1 - W2) / (W1 + W2)</li>
              <li>tan φ = 1.732 × (42 - 18) / (42 + 18)</li>
              <li>tan φ = 1.732 × 24 / 60 = 0.693</li>
              <li>φ = tan⁻¹(0.693) = 34.7°</li>
              <li>
                Power factor: pf = cos φ = cos(34.7°) = <strong>0.82 lagging</strong>
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 3: Building Maximum Demand
            </p>
            <p>
              <strong>Question:</strong> Calculate the transformer size for an office building
              with: Lighting 80kW, Small power 120kW, HVAC 200kW, Lifts 60kW. Apply appropriate
              diversity.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Apply diversity factors:</li>
              <li>Lighting: 80 × 0.95 = 76 kW</li>
              <li>Small power: 120 × 0.40 = 48 kW</li>
              <li>HVAC: 200 × 0.85 = 170 kW</li>
              <li>Lifts: 60 × 0.70 = 42 kW</li>
              <li>
                Total diversified load = 76 + 48 + 170 + 42 = <strong>336 kW</strong>
              </li>
              <li>
                At pf = 0.85: kVA = 336 / 0.85 = <strong>395 kVA</strong>
              </li>
              <li>
                Add 20% growth: 395 × 1.2 = <strong>474 kVA</strong>
              </li>
              <li>
                Select: <strong>500 kVA transformer</strong>
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Example 4: Power Factor Correction
            </p>
            <p>
              <strong>Question:</strong> A factory has a load of 500kW at 0.7 power factor.
              Calculate the capacitor kVAr required to improve pf to 0.95.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Original reactive power:</li>
              <li>φ1 = cos⁻¹(0.7) = 45.57°</li>
              <li>
                Q1 = P × tan φ1 = 500 × tan(45.57°) = 500 × 1.02 = <strong>510 kVAr</strong>
              </li>
              <li>Target reactive power:</li>
              <li>φ2 = cos⁻¹(0.95) = 18.19°</li>
              <li>
                Q2 = 500 × tan(18.19°) = 500 × 0.329 = <strong>164 kVAr</strong>
              </li>
              <li>Capacitor kVAr required = Q1 - Q2</li>
              <li>
                QC = 510 - 164 = <strong>346 kVAr</strong>
              </li>
              <li>This reduces kVA from 714 to 526 - a 26% reduction in demand</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>P = √3 × VL × IL × cos φ</strong> — Three-phase real power (kW)
              </li>
              <li>
                <strong>S = √3 × VL × IL</strong> — Apparent power (kVA)
              </li>
              <li>
                <strong>Q = √3 × VL × IL × sin φ</strong> — Reactive power (kVAr)
              </li>
              <li>
                <strong>S² = P² + Q²</strong> — Power triangle relationship
              </li>
              <li>
                <strong>pf = P / S = cos φ</strong> — Power factor
              </li>
              <li>
                <strong>P = W1 + W2</strong> — Two-wattmeter total power
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Values to Remember</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                √3 = <strong>1.732</strong>
              </li>
              <li>
                UK three-phase line voltage: <strong>400V</strong>
              </li>
              <li>
                Typical motor pf (full load): <strong>0.85</strong>
              </li>
              <li>
                DNO target power factor: <strong>0.95</strong>
              </li>
              <li>
                Transformer sizing margin: <strong>20-25%</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common three-phase power calculation mistakes"
            whatHappens={
              <>
                Confusing kW and kVA when sizing transformers. Forgetting the √3 factor in
                three-phase formulas. Ignoring power factor — same kW needs more current at low pf.
                Sizing without diversity factors. Forgetting to add a future-growth margin.
              </>
            }
            doInstead={
              <>
                Always size transformers/generators in kVA. Include √3 (1.732) in every three-phase
                calculation. Convert kW to kVA using the load's expected pf. Apply diversity from
                BS 7671 Appendix 1 to every load type. Add 20-25% headroom for growth.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Hospital MRI suite — three-phase supply assessment"
            situation={
              <>
                A new MRI suite has the following three-phase loads: 80 kVA scanner
                (helium compressor + RF cabinet) at 0.85 pf, 25 kVA chiller plant at
                0.78 pf, 12 kW (single-phase, 230 V) lighting/SP at 0.95 pf. The local
                LV substation feeds the suite via a dedicated 200 A submain. You need to
                confirm capacity and design the PFC, if required.
              </>
            }
            whatToDo={
              <>
                Compute kVA per circuit: scanner 80 kVA, chiller 25 kVA, lighting/SP =
                12/0.95 = 12.6 kVA. Total connected = 117.6 kVA. Apply diversity (scanner
                100 % during scans, chiller 100 % when scanning, lighting 80 %): operating
                kVA &asymp; 115 kVA. Submain capacity at 400 V three-phase: 200 A &times;
                400 &times; &radic;3 = 138 kVA &mdash; just adequate. Combined pf
                &asymp; 0.83 &mdash; below 0.95 target. Specify a 25 kVAr detuned PFC bank
                local to the suite to lift pf to 0.96 and free up busbar headroom.
              </>
            }
            whyItMatters={
              <>
                MRI suites are pf-poor, harmonic-rich (RF amplifier), and intolerant of
                voltage dip (each helium re-fill costs ~&pound;15k). The three-phase
                arithmetic the BSE engineer signs off here drives the substation kVA, the
                cable size, the PFC sizing, and the protection coordination upstream &mdash;
                getting it wrong costs five-figure variations during commissioning.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Three-phase real power: P = &radic;3 &times; V&#x2097; &times; I&#x2097; &times; cos&phi; — the &radic;3 catches every apprentice but is non-negotiable.',
              'Three-phase apparent power: S = &radic;3 &times; V&#x2097; &times; I&#x2097; — the value you size transformers and supply cables to.',
              'Three-phase reactive power: Q = &radic;3 &times; V&#x2097; &times; I&#x2097; &times; sin&phi; — drives PFC capacitor sizing.',
              'Two-wattmeter method (3-wire delta): P&#x209c;&#x2092;&#x209c; = W&#x2081; + W&#x2082; — pf can be derived from the wattmeter ratio.',
              'Three-wattmeter method (4-wire star with neutral): P&#x209c;&#x2092;&#x209c; = W&#x2081; + W&#x2082; + W&#x2083; — required for unbalanced star loads.',
              'Convert kW &harr; kVA via pf — kVA = kW / pf; sized at the assumed pf for the load mix (0.85 office typical, 0.78 refrigeration, 0.92 lighting).',
              'PFC sizing: kVAr = kW &times; (tan&phi;&#x2081; &minus; tan&phi;&#x2082;) — target 0.95 pf to clear DNO reactive penalties.',
              'BS 7671 Reg 311.2 allows diversity in maximum-demand calc — the basis of every transformer and DNO supply sizing.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Balanced and Unbalanced Loads
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Cable Sizing and Voltage Drop
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section4_4;
