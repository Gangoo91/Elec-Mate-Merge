/**
 * Module 3 · Section 3 · Subsection 6 — True, Reactive and Apparent Power in AC Systems
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   P (kW), Q (kVAr), S (kVA), pf — power triangle, single-phase and three-phase
 *   formulae, wattmeter operation, DNO billing structures. The numbers behind every
 *   transformer kVA selection and every PFC capacitor sizing exercise.
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

const TITLE = 'True, Reactive and Apparent Power in AC Systems - HNC Module 3 Section 3.6';
const DESCRIPTION =
  'Master AC power relationships for building services: true power (kW), reactive power (kVAr), apparent power (kVA), power factor, wattmeter measurement, and DNO billing implications.';

const quickCheckQuestions = [
  {
    id: 'true-power-formula',
    question: 'What is the formula for true (active) power in a single-phase AC circuit?',
    options: [
      'P = VI',
      'P = VI sin φ',
      'P = VI cos φ',
      'P = V/I',
    ],
    correctIndex: 2,
    explanation:
      'True power P = VI cos φ, where cos φ is the power factor. This accounts for the phase angle between voltage and current in AC circuits. Only the in-phase component of current does useful work.',
  },
  {
    id: 'reactive-power-unit',
    question: 'What is the unit of reactive power?',
    options: [
      'Watts (W)',
      'Volt-Amperes (VA)',
      'Joules (J)',
      'Volt-Amperes reactive (VAr)',
    ],
    correctIndex: 3,
    explanation:
      'Reactive power is measured in Volt-Amperes reactive (VAr) or kVAr. This distinguishes it from true power (Watts) and apparent power (VA), even though all three have the same dimensional units.',
  },
  {
    id: 'power-factor-calculation',
    question: 'A load draws 8kW at 10kVA. What is the power factor?',
    options: [
      '0.6',
      '1.25',
      '0.8',
      '1.0',
    ],
    correctIndex: 2,
    explanation:
      'Power factor = P/S = 8kW ÷ 10kVA = 0.8. This means 80% of the apparent power is doing useful work. The remaining 20% is reactive power circulating in the circuit.',
  },
  {
    id: 'three-phase-power',
    question: 'For a balanced three-phase load, which formula calculates true power?',
    options: [
      'P = VL × IL',
      'P = √3 × VL × IL × cos φ',
      'P = √3 × VL × IL',
      'P = 3 × VP × IP',
    ],
    correctIndex: 1,
    explanation:
      'Three-phase true power P = √3 × VL × IL × cos φ, where VL is line voltage (400V) and IL is line current. The √3 factor accounts for the phase relationships in a three-phase system.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does true power represent in an AC circuit?',
    options: [
      'The total power supplied by the source',
      'The actual power consumed and converted to useful work',
      'The power stored in magnetic and electric fields',
      'The power returned to the supply',
    ],
    correctAnswer: 1,
    explanation:
      'True power (P) represents the actual power consumed by the load and converted to useful work such as heat, light, or mechanical energy. It is the only component that appears on energy bills.',
  },
  {
    id: 2,
    question:
      'A motor draws 15A at 230V with a power factor of 0.85. What is the true power consumed?',
    options: [
      '4.06kW',
      '2.55kW',
      '2.93kW',
      '3.45kW',
    ],
    correctAnswer: 2,
    explanation:
      'P = V × I × cos φ = 230 × 15 × 0.85 = 2932.5W = 2.93kW. The power factor reduces the true power below the apparent power (VA) value.',
  },
  {
    id: 3,
    question: 'What causes reactive power in an electrical system?',
    options: [
      'Purely resistive loads such as heaters and filament lamps',
      'High resistance in conductors causing voltage drop',
      'Harmonic distortion from non-linear switching loads',
      'Inductive and capacitive loads storing and releasing energy',
    ],
    correctAnswer: 3,
    explanation:
      'Reactive power arises from inductors (motors, transformers) and capacitors storing energy in magnetic and electric fields respectively, then returning it to the supply each half cycle.',
  },
  {
    id: 4,
    question:
      'A building has a maximum demand of 500kVA with a power factor of 0.7. What true power is available?',
    options: [
      '350kW',
      '500kW',
      '714kW',
      '250kW',
    ],
    correctAnswer: 0,
    explanation:
      'P = S × cos φ = 500kVA × 0.7 = 350kW. The poor power factor means only 70% of the supply capacity is available for useful work.',
  },
  {
    id: 5,
    question: 'Why do DNOs charge penalties for poor power factor?',
    options: [
      'Poor power factor damages transformers',
      'It increases cable losses and reduces network capacity',
      'It increases harmonic distortion',
      'It causes voltage fluctuations',
    ],
    correctAnswer: 1,
    explanation:
      'Poor power factor increases current for the same true power, causing greater I²R losses in distribution networks and reducing the capacity available for other customers.',
  },
  {
    id: 6,
    question: 'What type of instrument measures true power directly?',
    options: [
      'Ammeter',
      'Voltmeter',
      'Wattmeter',
      'VAr meter',
    ],
    correctAnswer: 2,
    explanation:
      'A wattmeter measures true power by multiplying instantaneous voltage and current, automatically accounting for the phase angle. Digital power analysers extend this to include reactive and apparent power.',
  },
  {
    id: 7,
    question: 'Calculate the reactive power for a load with S = 100kVA and P = 80kW.',
    options: [
      '20kVAr',
      '40kVAr',
      '80kVAr',
      '60kVAr',
    ],
    correctAnswer: 3,
    explanation:
      'Using the power triangle: Q = √(S² - P²) = √(100² - 80²) = √(10000 - 6400) = √3600 = 60kVAr',
  },
  {
    id: 8,
    question:
      'A three-phase motor draws 25A per phase at 400V with pf = 0.9. What is the true power?',
    options: [
      '15.6kW',
      '17.3kW',
      '10.4kW',
      '13.9kW',
    ],
    correctAnswer: 0,
    explanation: 'P = √3 × VL × IL × cos φ = 1.732 × 400 × 25 × 0.9 = 15,588W = 15.6kW',
  },
  {
    id: 9,
    question: 'What is the typical power factor threshold below which DNOs apply surcharges?',
    options: [
      '0.95',
      '0.90',
      '0.85',
      '0.80',
    ],
    correctAnswer: 1,
    explanation:
      'Most UK DNOs apply reactive power charges when the power factor falls below 0.9 (or kVAr exceeds approximately 0.484 per kW). This encourages customers to install power factor correction.',
  },
  {
    id: 10,
    question:
      'An energy meter shows 50,000 kWh and a reactive meter shows 40,000 kVArh. What is the average power factor?',
    options: [
      '0.89',
      '0.80',
      '0.78',
      '0.85',
    ],
    correctAnswer: 2,
    explanation:
      'kVAh = √(kWh² + kVArh²) = √(50000² + 40000²) = 64,031. Power factor = kWh/kVAh = 50000/64031 = 0.78',
  },
];

const faqs = [
  {
    question: 'Why is apparent power measured in VA rather than Watts?',
    answer:
      'Although VA and Watts have the same dimensional units (voltage × current), using different names distinguishes their roles. Apparent power (VA) represents the total power that must be supplied by the source and determines equipment sizing. True power (W) represents actual energy consumption and appears on bills. Using distinct units prevents confusion in specifications and calculations.',
  },
  {
    question: 'Can power factor exceed 1.0?',
    answer:
      'No, power factor cannot exceed 1.0 (unity). A power factor of 1.0 means voltage and current are perfectly in phase - all supplied power is doing useful work. Values above 1.0 would violate conservation of energy. However, over-correction with capacitors can cause a leading power factor, which also wastes energy and may incur penalties.',
  },
  {
    question: 'What is the difference between kWh and kVAh billing?',
    answer:
      'Domestic and small commercial customers typically pay only for kWh (true energy consumed). Large commercial and industrial customers may face kVAh or maximum demand (kVA) charges that include reactive power consumption. This reflects the additional infrastructure costs of supplying reactive current even though it does no useful work.',
  },
  {
    question: 'Why do motors have poor power factor at light loads?',
    answer:
      'Induction motors draw magnetising current to create the rotating magnetic field regardless of mechanical load. At full load, this reactive component is a small proportion of total current, giving good power factor (0.85-0.9). At light loads, the magnetising current dominates, reducing power factor to 0.3-0.5. Variable speed drives can improve this by reducing voltage at light loads.',
  },
  {
    question: 'How does power factor correction affect cable sizing?',
    answer:
      'Improving power factor reduces current for the same true power (I = P / V cos φ). This can allow smaller cables, reduce voltage drop, and free up capacity in existing installations. However, cables must still be sized for the actual current drawn, and correction capacitors should be installed close to inductive loads for maximum benefit.',
  },
  {
    question: 'What is the two-wattmeter method for three-phase power measurement?',
    answer:
      'The two-wattmeter method uses two wattmeters to measure total three-phase power in a balanced or unbalanced system without a neutral connection. Total power equals the algebraic sum of both readings. The method also allows power factor calculation: tan φ = √3 × (W1 - W2) / (W1 + W2). This is standard practice for three-wire three-phase installations.',
  },
];

const HNCModule3Section3_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 3 · Subsection 6"
            title="True, Reactive and Apparent Power in AC Systems"
            description="Understanding power relationships essential for equipment sizing, energy management and DNO compliance in building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You size every transformer, generator and DNO supply in kVA (apparent power) — not kW — because cable, switchgear and machine current ratings respond to apparent power.',
              'You calculate three-phase power as P = &radic;3 &times; V&#x2097; &times; I&#x2097; &times; cos &phi; — the &radic;3 factor catches out apprentices but is non-negotiable.',
              'You quote pf at the metered point of supply, target 0.95 minimum to avoid DNO reactive penalties on commercial tariffs.',
              'You specify wattmeters, not VAR meters, for kWh billing — and pf-correcting metering on any installation with significant inductive load (motors, transformers, fluorescent ballasts).',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 311.1 (Maximum demand)"
            clause="The maximum demand of an installation shall be assessed. In determining the maximum demand of an installation or part thereof, diversity may be taken into account."
            meaning={
              <>
                BS 7671 311.1 forces you to declare maximum demand &mdash; in kVA, not kW
                &mdash; because that is the figure the DNO sizes the supply on, and the
                figure the busbar/switchgear must carry. As a BSE designer you take
                connected kW, apply CIBSE Guide F diversity, divide by the assumed pf
                (0.85 typical for office, 0.9 for residential, 0.78 for refrigeration),
                and present the kVA on your DNO supply application.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Reg 311.1; CIBSE Guide F (Energy efficiency in buildings); Engineering Recommendation P28 / G99 for parallel-running plant"
          />

          <LearningOutcomes
            outcomes={[
              'Define true, reactive and apparent power with correct units',
              'Calculate power factor from measured values',
              'Apply single-phase and three-phase power formulae',
              'Understand wattmeter operation and power measurement',
              'Explain DNO billing structures and reactive power charges',
              'Specify power monitoring systems for building services',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="True (Active) Power - P">
            <p>
              True power, also called active or real power, represents the actual electrical
              energy converted to useful work such as heat, light, or mechanical motion. This is
              the only power component that appears on electricity bills for most customers.
            </p>
            <p>
              <strong>True Power Formulae:</strong> Single-phase: P = V × I × cos φ. Three-phase:
              P = √3 × VL × IL × cos φ.
            </p>
            <p>Key characteristics of true power:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Measured in Watts (W) or kilowatts (kW)</li>
              <li>Represents energy actually consumed per second</li>
              <li>Cannot be negative - always flows from source to load</li>
              <li>Equals apparent power only when pf = 1 (purely resistive)</li>
              <li>Determines energy consumption: Energy (kWh) = P × time</li>
            </ul>
            <p>
              <strong>Typical True Power Values in Buildings:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>LED lighting (per fitting) — 20-60W — pf 0.90-0.95</li>
              <li>Desktop computer — 150-300W — pf 0.60-0.90</li>
              <li>Small AHU motor (7.5kW) — 7.5kW — pf 0.85</li>
              <li>Chiller compressor (100kW) — 100kW — pf 0.88-0.92</li>
              <li>Resistive heater — 1-3kW — pf 1.00</li>
            </ul>
            <p>
              <strong>Remember:</strong> True power is what you pay for on standard domestic
              tariffs - it represents actual energy consumed.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Reactive Power - Q">
            <p>
              Reactive power represents energy that oscillates between the source and the load
              without being consumed. Inductors (motors, transformers) store energy in magnetic
              fields, while capacitors store energy in electric fields - both returning this
              energy to the supply each cycle.
            </p>
            <p>
              <strong>Reactive Power Formula:</strong> Single-phase: Q = V × I × sin φ.
              Three-phase: Q = √3 × VL × IL × sin φ.
            </p>
            <p>Understanding reactive power:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Measured in Volt-Amperes reactive (VAr) or kVAr</li>
              <li><strong>Inductive loads (motors):</strong> Q is positive (lagging current)</li>
              <li><strong>Capacitive loads:</strong> Q is negative (leading current)</li>
              <li>Does no useful work but increases current in conductors</li>
              <li>Causes additional I²R losses in cables and transformers</li>
            </ul>
            <p>
              <strong>Sources of Inductive Reactive Power:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Induction motors (largest source)</li>
              <li>Transformers (magnetising current)</li>
              <li>Fluorescent lamp ballasts</li>
              <li>Welding equipment</li>
              <li>Induction heaters</li>
            </ul>
            <p>
              <strong>Effects of Excess Reactive Power:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Increased cable current and losses</li>
              <li>Larger cable sizes required</li>
              <li>Reduced transformer capacity</li>
              <li>Greater voltage drop</li>
              <li>DNO penalty charges</li>
            </ul>
            <p>
              <strong>Key insight:</strong> Capacitors can supply reactive power to inductive
              loads locally, reducing the reactive power drawn from the supply (power factor
              correction).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Apparent Power - S">
            <p>
              Apparent power is the total power that must be supplied by the source - the product
              of RMS voltage and RMS current. It determines the sizing of cables, transformers,
              generators, and switchgear regardless of power factor.
            </p>
            <p>
              <strong>Apparent Power Formula:</strong> Single-phase: S = V × I. Three-phase: S =
              √3 × VL × IL.
            </p>
            <p>
              <strong>The Power Triangle Relationship:</strong> S² = P² + Q²; equivalently S =
              √(P² + Q²). Apparent power is the vector sum of true and reactive power.
            </p>
            <p>Why apparent power matters:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Measured in Volt-Amperes (VA) or kilovolt-amperes (kVA)</li>
              <li>Transformers rated in kVA (not kW) because they must carry total current</li>
              <li>Generators rated in kVA - true power output depends on load pf</li>
              <li>Cable sizing based on current, which depends on S, not P</li>
              <li>Maximum demand charges often based on kVA</li>
            </ul>
            <p>
              <strong>Equipment Ratings in Building Services:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Distribution transformer — kVA — Heating depends on total current</li>
              <li>Standby generator — kVA — Alternator limited by current capacity</li>
              <li>UPS system — kVA — Inverter limited by current output</li>
              <li>Motor — kW (shaft) — Mechanical output is useful work</li>
              <li>Cables — Amperes — Heating depends on I²R</li>
            </ul>
            <p>
              <strong>Design tip:</strong> When specifying a generator for a building with pf =
              0.8, a 100kVA generator can only deliver 80kW of true power to the load.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Power Factor">
            <p>
              Power factor is the ratio of true power to apparent power, indicating how
              efficiently electrical power is being used. It equals the cosine of the phase angle
              between voltage and current waveforms.
            </p>
            <p>
              <strong>Power Factor Definitions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>pf = P/S — From power values</li>
              <li>pf = cos φ — From phase angle</li>
              <li>pf = R/Z — From impedance</li>
            </ul>
            <p>
              <strong>Power Factor Classifications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>0.95-1.00 — Excellent — Resistive heaters, corrected loads</li>
              <li>0.85-0.95 — Good — Motors at full load, modern lighting</li>
              <li>0.70-0.85 — Poor — Lightly loaded motors, old equipment</li>
              <li>&lt;0.70 — Very Poor — Uncorrected welding, idle motors</li>
            </ul>
            <p>
              <strong>Lagging Power Factor:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Current lags voltage (inductive loads)</li>
              <li>Most common in buildings (motors)</li>
              <li>Corrected with parallel capacitors</li>
              <li>Positive reactive power (Q)</li>
            </ul>
            <p>
              <strong>Leading Power Factor:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Current leads voltage (capacitive loads)</li>
              <li>Occurs with over-correction</li>
              <li>Can cause voltage rise problems</li>
              <li>Negative reactive power (Q)</li>
            </ul>
            <p>
              <strong>Target:</strong> Most building services aim for pf = 0.95 lagging or better
              to avoid DNO charges whilst not over-correcting.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Power Measurement with Wattmeters">
            <p>
              Wattmeters measure true power by multiplying instantaneous voltage and current,
              automatically accounting for the phase angle. Modern digital power analysers extend
              this to provide comprehensive power quality data.
            </p>
            <p>
              <strong>Wattmeter Operating Principle:</strong> An electrodynamic wattmeter
              contains a current coil (in series with load) and a voltage coil (in parallel with
              load). The torque produced is proportional to the instantaneous product of V and I,
              giving a deflection proportional to average (true) power. Reading = (1/T) × ∫ v(t)
              × i(t) dt = V × I × cos φ = P.
            </p>
            <p>Power measurement methods:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Single-phase:</strong> One wattmeter measures total power directly</li>
              <li><strong>Three-phase (balanced):</strong> One wattmeter × 3 gives total power</li>
              <li><strong>Three-phase (any load):</strong> Two-wattmeter method for 3-wire systems</li>
              <li><strong>Three-phase with neutral:</strong> Three wattmeters, sum all readings</li>
            </ul>
            <p>
              <strong>Two-Wattmeter Method (Three-Phase):</strong> Total Power: Ptotal = W1 + W2.
              Power Factor: tan φ = √3 × (W1 - W2) / (W1 + W2). Note: One reading may be negative
              at low power factors.
            </p>
            <p>
              <strong>Modern Power Analyser Functions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>True power — P (kW) — Energy billing, load assessment</li>
              <li>Reactive power — Q (kVAr) — PFC sizing, DNO compliance</li>
              <li>Apparent power — S (kVA) — Equipment sizing, cable selection</li>
              <li>Power factor — pf / cos φ — System efficiency, correction needs</li>
              <li>Harmonics (THD) — THD% — Power quality, filter requirements</li>
            </ul>
            <p>
              <strong>Site tip:</strong> Clamp-on power analysers can measure power without
              disconnection, making them ideal for building energy audits and fault-finding.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Single-Phase vs Three-Phase Power">
            <p>
              Understanding the differences between single-phase and three-phase power
              calculations is essential for correctly sizing equipment and calculating loads in
              building services installations.
            </p>
            <p>
              <strong>Power Formulae Comparison:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Apparent (S) — Single-phase: S = V × I — Three-phase: S = √3 × VL × IL</li>
              <li>True (P) — Single-phase: P = V × I × cos φ — Three-phase: P = √3 × VL × IL × cos φ</li>
              <li>Reactive (Q) — Single-phase: Q = V × I × sin φ — Three-phase: Q = √3 × VL × IL × sin φ</li>
              <li>Current — Single-phase: I = P / (V × cos φ) — Three-phase: I = P / (√3 × VL × cos φ)</li>
            </ul>
            <p>
              <strong>Single-Phase Applications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>General socket outlets (13A)</li>
              <li>Lighting circuits</li>
              <li>Small heaters up to 3kW</li>
              <li>Domestic appliances</li>
              <li>Single-phase air conditioning units</li>
            </ul>
            <p>
              <strong>Three-Phase Applications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Motors above 2.2kW (typical)</li>
              <li>Large HVAC equipment</li>
              <li>Commercial kitchens</li>
              <li>Main distribution boards</li>
              <li>Data centre power distribution</li>
            </ul>
            <p>
              <strong>Why √3 in Three-Phase Formulae?</strong> In a three-phase system, line
              voltage (400V) is √3 times phase voltage (230V). The √3 factor (1.732) converts
              between line and phase values. For balanced loads, total power equals 3 × phase
              power, but using line values: P = √3 × VL × IL × cos φ.
            </p>
            <p>
              <strong>Remember:</strong> Three-phase delivers √3 times more power than
              single-phase for the same current, making it more efficient for large loads.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="kWh vs kVAh Billing">
            <p>
              Understanding how electricity is metered and billed is essential for managing
              building energy costs. Different customer categories face different charging
              structures based on their consumption patterns and power factor.
            </p>
            <p>
              <strong>Energy Metering Types:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>kWh meter — True energy consumed — Domestic, small commercial</li>
              <li>kVArh meter — Reactive energy — Large commercial/industrial</li>
              <li>MD meter — Maximum demand (kW or kVA) — HV customers, large sites</li>
              <li>Half-hourly meter — 30-minute profiles — Profile class 00 (100kW+)</li>
            </ul>
            <p>Understanding energy calculations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>kWh (kilowatt-hours):</strong> True energy = P × t (billed to all customers)</li>
              <li><strong>kVArh (kilovolt-ampere reactive hours):</strong> Reactive energy = Q × t</li>
              <li><strong>kVAh (kilovolt-ampere hours):</strong> Total energy = S × t = √(kWh² + kVArh²)</li>
              <li><strong>Average power factor:</strong> pf = kWh / kVAh over billing period</li>
            </ul>
            <p>
              <strong>Standard Billing Components:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Standing charge (p/day)</li>
              <li>Unit rate (p/kWh)</li>
              <li>Climate Change Levy</li>
              <li>VAT (5% or 20%)</li>
            </ul>
            <p>
              <strong>Additional Charges (Large Users):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Maximum demand (£/kVA/month)</li>
              <li>Reactive power (p/kVArh)</li>
              <li>Capacity charges</li>
              <li>Transmission network use (TNUoS)</li>
            </ul>
            <p>
              <strong>Worked Example: Annual Energy Cost Impact of Power Factor.</strong> Site:
              500kW average load, 8760 hours/year. At pf = 0.75: kVA = 500 / 0.75 = 667 kVA;
              Reactive = √(667² - 500²) = 441 kVAr; kVArh = 441 × 8760 = 3,863,160 kVArh. At pf =
              0.95: kVA = 500 / 0.95 = 526 kVA; Reactive = √(526² - 500²) = 164 kVAr; kVArh = 164
              × 8760 = 1,436,640 kVArh. Savings: 2,426,520 kVArh @ 0.5p = £12,133/year.
            </p>
            <p>
              <strong>Financial impact:</strong> Poor power factor increases both reactive power
              charges and maximum demand charges, significantly affecting operating costs.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Building Services: DNO Charges and Power Monitoring">
            <p>
              Distribution Network Operators (DNOs) apply specific charges related to power
              factor and maximum demand. Understanding these charges is essential for designing
              cost-effective building electrical systems.
            </p>
            <p>
              <strong>DNO Reactive Power Charges:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Power factor below 0.9 — Trigger: kVArh exceeds 0.484 × kWh — Typical Charge: 0.3-0.8p per excess kVArh</li>
              <li>Maximum demand — Trigger: Peak kVA in billing period — Typical Charge: £2-5 per kVA per month</li>
              <li>Excess capacity — Trigger: Demand exceeds agreed supply — Typical Charge: Penalty rates apply</li>
            </ul>
            <p>Why DNOs charge for reactive power:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reactive current increases I²R losses in network cables and transformers</li>
              <li>Reduces available capacity for other customers</li>
              <li>Requires larger transformers and cables in distribution network</li>
              <li>Causes voltage regulation problems at end of long feeders</li>
              <li>Encourages customers to install power factor correction</li>
            </ul>
            <p>
              <strong>Power Monitoring Systems:</strong> Modern buildings use sophisticated power
              monitoring to optimise energy use and costs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Main incomer — Multi-function meter, CT/VT — kW, kVA, kVAr, pf, V, I, THD</li>
              <li>Sub-distribution — Smart MCCBs, energy meters — kWh, max demand, current</li>
              <li>Final circuits — CT clamps, pulse output — kWh for tenant billing</li>
              <li>BMS integration — Modbus/BACnet gateway — Real-time data to EMS</li>
            </ul>
            <p>
              <strong>Benefits of Power Monitoring:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify poor power factor loads</li>
              <li>Track energy consumption trends</li>
              <li>Verify billing accuracy</li>
              <li>Detect equipment faults early</li>
              <li>Support ISO 50001 compliance</li>
            </ul>
            <p>
              <strong>Automatic PFC Systems:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Measure reactive power continuously</li>
              <li>Switch capacitor banks as needed</li>
              <li>Maintain target pf (typically 0.95)</li>
              <li>Protect against over-correction</li>
              <li>Include detuning reactors for harmonics</li>
            </ul>
            <p>
              <strong>Best practice:</strong> Install power monitoring at main incomer as
              minimum. For buildings over 1MVA, sub-metering by floor or tenant enables accurate
              cost allocation and identifies problem areas.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Single-Phase Power Calculation.</strong> A single-phase motor
              draws 8.5A at 230V with a power factor of 0.82. Calculate P, Q, and S.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Apparent power: S = V × I = 230 × 8.5 = <strong>1955 VA = 1.96 kVA</strong></li>
              <li>True power: P = S × cos φ = 1955 × 0.82 = <strong>1603W = 1.60 kW</strong></li>
              <li>sin φ = √(1 - cos²φ) = √(1 - 0.82²) = 0.572</li>
              <li>Reactive power: Q = S × sin φ = 1955 × 0.572 = <strong>1118 VAr = 1.12 kVAr</strong></li>
              <li>Check: S² = P² + Q² → 1955² = 1603² + 1118²</li>
            </ul>
            <p>
              <strong>Example 2: Three-Phase Load Current.</strong> An AHU has a 22kW motor with
              power factor 0.88 on 400V three-phase. What current does it draw?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Using: P = √3 × VL × IL × cos φ</li>
              <li>Rearranging: IL = P / (√3 × VL × cos φ)</li>
              <li>IL = 22000 / (1.732 × 400 × 0.88) = 22000 / 609.7 = <strong>36.1A per phase</strong></li>
              <li>Select 40A protective device and appropriate cable</li>
            </ul>
            <p>
              <strong>Example 3: Power Factor from Two Wattmeters.</strong> Two-wattmeter method
              gives W1 = 45kW and W2 = 25kW. Find total power and power factor.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total power: P = W1 + W2 = 45 + 25 = <strong>70 kW</strong></li>
              <li>tan φ = √3 × (W1 - W2) / (W1 + W2) = 1.732 × (45 - 25) / (45 + 25) = 1.732 × 20 / 70 = 0.495</li>
              <li>φ = arctan(0.495) = 26.3°; cos φ = cos(26.3°) = <strong>0.896 ≈ 0.90</strong></li>
            </ul>
            <p>
              <strong>Example 4: Capacitor Sizing for PFC.</strong> A 150kW load at pf = 0.75
              needs correction to pf = 0.95. What capacitor kVAr is required?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>At pf = 0.75: φ₁ = arccos(0.75) = 41.4°, tan φ₁ = 0.882; Q₁ = P × tan φ₁ = 150 × 0.882 = 132.3 kVAr</li>
              <li>At pf = 0.95: φ₂ = arccos(0.95) = 18.2°, tan φ₂ = 0.329; Q₂ = P × tan φ₂ = 150 × 0.329 = 49.4 kVAr</li>
              <li>Capacitor required: Qc = Q₁ - Q₂ = 132.3 - 49.4 = <strong>82.9 kVAr</strong></li>
              <li>Specify 90kVAr automatic PFC panel with steps</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p>
              <strong>Essential Formulae:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>P = VI cos φ</strong> — True power (single-phase)</li>
              <li><strong>Q = VI sin φ</strong> — Reactive power (single-phase)</li>
              <li><strong>S = VI</strong> — Apparent power (single-phase)</li>
              <li><strong>S² = P² + Q²</strong> — Power triangle relationship</li>
              <li><strong>pf = P/S = cos φ</strong> — Power factor</li>
              <li><strong>P = √3 × VL × IL × cos φ</strong> — Three-phase true power</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>√3 = <strong>1.732</strong> (three-phase factor)</li>
              <li>DNO threshold: pf = <strong>0.9</strong> (kVAr ≤ 0.484 × kW)</li>
              <li>Motor full load pf: typically <strong>0.85-0.90</strong></li>
              <li>Target corrected pf: <strong>0.95</strong> (lagging)</li>
              <li>Unity power factor: <strong>1.0</strong> (resistive loads only)</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Confusing P and S</strong> — Generators rated in kVA, not kW</li>
                <li><strong>Forgetting √3</strong> — Essential for all three-phase calculations</li>
                <li><strong>Using P = VI</strong> — Only correct for unity power factor</li>
                <li><strong>Over-correcting PFC</strong> — Leading pf also causes problems</li>
                <li><strong>Ignoring harmonics</strong> — Can distort readings and damage capacitors</li>
              </ul>
            }
            doInstead="Quote generator and transformer ratings in kVA. Always include √3 in three-phase power and current calculations. Apply cos φ when computing P from V × I. Set PFC target at 0.95 lagging — never over to leading. Verify harmonic levels before sizing PFC capacitors."
          />

          <SectionRule />

          <Scenario
            title="Sizing the DNO supply for a mixed-use scheme"
            situation={
              <>
                A new mixed-use development has 320 kW connected mechanical load
                (chillers, AHU fans, pumps, lifts) at an estimated 0.78 pf, plus 180 kW
                lighting and small power at 0.92 pf, plus 90 kW EV charging at unity pf.
                CIBSE Guide F diversity factors give a coincident demand of 75 % on
                mechanical and 60 % on lighting/SP and 100 % on EV. You need the DNO
                application kVA.
              </>
            }
            whatToDo={
              <>
                Compute each contribution: mechanical = (320 &times; 0.75) / 0.78 = 308
                kVA; lighting/SP = (180 &times; 0.60) / 0.92 = 117 kVA; EV = (90 &times;
                1.00) / 1.00 = 90 kVA. Total = 515 kVA. Round up to the nearest standard
                DNO substation rating (probably 800 kVA for headroom on EV growth) and
                submit on the connection application. Specify a 600 kVA G99 standby
                generator if the brief includes essential life-safety / lift backup.
              </>
            }
            whyItMatters={
              <>
                Under-sizing the DNO supply means a costly substation upgrade later (often
                &pound;30k&ndash;&pound;100k plus six-month lead time). Over-sizing inflates
                connection charges and ongoing capacity charges. The kVA arithmetic with
                pf and diversity is the most commercially significant calculation a BSE
                engineer does on most projects.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'P (kW) = real / active power — does work, charged on tariffs by kWh.',
              'Q (kVAr) = reactive power — circulates between source and reactive load, no useful work, may attract DNO penalties.',
              'S (kVA) = apparent power = &radic;(P&sup2; + Q&sup2;) — the rating you size transformers, generators and supply cables to.',
              'pf = cos &phi; = P/S — target 0.95 or better at the point of supply on commercial tariffs.',
              'Single-phase: P = V &times; I &times; cos &phi;. Three-phase balanced: P = &radic;3 &times; V&#x2097; &times; I&#x2097; &times; cos &phi;.',
              'Wattmeter measures real kWh (the basis of DNO billing); pf meter or analyser logs Q for reactive penalty calculations.',
              'CIBSE Guide F diversity factors applied to connected load give the maximum demand the DNO supply must carry.',
              'BS 7671 Reg 311.1 makes maximum-demand assessment compulsory — in kVA at the assumed pf, not kW.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section3-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Harmonics
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section3-7')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Power Triangle and Efficiency
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section3_6;
