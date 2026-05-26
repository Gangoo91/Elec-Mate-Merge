/**
 * Module 3 · Section 1 · Subsection 1 — Voltage, Current, Resistance and Power
 * HNC Electrical Engineering for Building Services (Pearson U4019 — Electrical & Electronic Principles)
 *   The four foundation quantities the HNC engineer uses every day — to size cables,
 *   pick protective devices, estimate energy use and assess voltage drop on commercial supplies.
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

const TITLE = 'Voltage, Current, Resistance and Power - HNC Module 3 Section 1.1';
const DESCRIPTION =
  'Master fundamental electrical quantities for building services: voltage, current, resistance and power calculations with practical applications in commercial installations.';

const quickCheckQuestions = [
  {
    id: 'uk-voltage',
    question: 'What is the standard UK single-phase supply voltage (RMS)?',
    options: [
      '240V',
      '250V',
      '230V',
      '220V',
    ],
    correctIndex: 2,
    explanation:
      'UK single-phase supply is 230V AC RMS (±10% tolerance). This was harmonised with European standards, though historically the UK used 240V.',
  },
  {
    id: 'power-formula',
    question: 'Which formula correctly relates power, voltage and current?',
    options: [
      'P = V/I',
      'P = V × I',
      'P = V + I',
      'P = I/V',
    ],
    correctIndex: 1,
    explanation:
      'Power (in Watts) equals Voltage (in Volts) multiplied by Current (in Amps): P = V × I. This fundamental relationship is essential for all load calculations.',
  },
  {
    id: 'heater-current',
    question: 'A 3kW heater operates at 230V. What current does it draw?',
    options: [
      '13A',
      '16A',
      '7.5A',
      '10A',
    ],
    correctIndex: 0,
    explanation:
      'Using I = P/V: I = 3000W ÷ 230V = 13.04A ≈ 13A. This is why 3kW heaters typically require a 16A or 20A circuit.',
  },
  {
    id: 'resistance-unit',
    question: 'What is the SI unit of electrical resistance?',
    options: [
      'Watt',
      'Ohm',
      'Volt',
      'Ampere',
    ],
    correctIndex: 1,
    explanation:
      'Resistance is measured in Ohms (Ω), named after Georg Ohm who discovered the relationship between voltage, current and resistance.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is voltage?',
    options: [
      'PWM (chopped) approximating a sine wave at variable frequency',
      'The electrical potential difference between two points',
      'To navigate around obstacles while maintaining parallel runs',
      'Providing networking, influence, and development opportunities',
    ],
    correctAnswer: 1,
    explanation:
      "Voltage (V) is the electrical potential difference between two points, measured in Volts. It represents the 'pressure' that pushes electrons through a circuit.",
  },
  {
    id: 2,
    question: 'If a circuit has a resistance of 46Ω and draws 5A, what is the voltage across it?',
    options: [
      '41V',
      '9.2V',
      '230V',
      '23V',
    ],
    correctAnswer: 2,
    explanation: "Using Ohm's Law: V = I × R = 5A × 46Ω = 230V",
  },
  {
    id: 3,
    question: 'What is the relationship between power, current and resistance?',
    options: [
      'P = R/I²',
      'P = I/R',
      'P = IR',
      'P = I²R',
    ],
    correctAnswer: 3,
    explanation:
      'P = I²R is one of the power equations derived from combining P = VI and V = IR. Power increases with the square of current, which is why cable sizing is critical.',
  },
  {
    id: 4,
    question:
      'A commercial building has 50 LED luminaires each rated at 45W. What is the total lighting load?',
    options: [
      'Both B and C are correct',
      '2250W',
      '2.25kW',
      '1125W',
    ],
    correctAnswer: 0,
    explanation:
      'Total power = 50 × 45W = 2250W = 2.25kW. Both answers represent the same value in different units.',
  },
  {
    id: 5,
    question: 'What maximum voltage is permitted for SELV circuits in bathrooms?',
    options: [
      '24V DC',
      '50V AC or 120V DC',
      '230V with RCD protection',
      '12V AC',
    ],
    correctAnswer: 1,
    explanation:
      'SELV (Separated Extra-Low Voltage) is limited to 50V AC or 120V DC ripple-free. This provides protection against electric shock in wet environments.',
  },
  {
    id: 6,
    question:
      'A 2.5mm² cable has a resistance of 7.41mΩ/m. What is the total resistance of 30m of this cable (go and return)?',
    options: [
      '0.222Ω',
      '0.111Ω',
      '0.444Ω',
      '7.41Ω',
    ],
    correctAnswer: 2,
    explanation:
      'Total length = 30m × 2 (go and return) = 60m. Total R = 60m × 7.41mΩ/m = 444.6mΩ = 0.445Ω ≈ 0.444Ω',
  },
  {
    id: 7,
    question:
      'What is the typical power density (W/m²) used for general office lighting calculations?',
    options: [
      '5 W/m²',
      '50 W/m²',
      '25-30 W/m²',
      '10-12 W/m²',
    ],
    correctAnswer: 3,
    explanation:
      'Modern LED office lighting typically uses 10-12 W/m² to achieve 300-500 lux. This has reduced significantly from the 15-20 W/m² common with fluorescent lighting.',
  },
  {
    id: 8,
    question:
      'A three-phase supply delivers 100kW at 400V line voltage with 0.85 power factor. What is the line current?',
    options: [
      '170A',
      '250A',
      '144A',
      '295A',
    ],
    correctAnswer: 0,
    explanation:
      'Using P = √3 × VL × IL × cosφ: IL = P / (√3 × VL × cosφ) = 100000 / (1.732 × 400 × 0.85) = 170A',
  },
  {
    id: 9,
    question: 'Why is P = I²R particularly important for cable sizing?',
    options: [
      'Insulation, continuity, RCD, and loop impedance testing',
      'Power loss increases with the square of current, causing heating',
      'To avoid conflicts like lights switching on at full brightness in bright daylight',
      'Ventricular fibrillation (VF) and pulseless ventricular tachycardia (pVT)',
    ],
    correctAnswer: 1,
    explanation:
      'P = I²R shows that power loss (heat) in cables increases with the square of current. Doubling the current quadruples the heat generated, which is why cable sizing must account for current capacity.',
  },
  {
    id: 10,
    question: 'What energy does a 3kW immersion heater consume in 4 hours?',
    options: [
      '0.75 kWh',
      '3 kWh',
      '12 kWh',
      '12000 J',
    ],
    correctAnswer: 2,
    explanation:
      'Energy = Power × Time = 3kW × 4h = 12 kWh. This is the unit measured by electricity meters for billing purposes.',
  },
];

const faqs = [
  {
    question: "What's the difference between AC and DC voltage?",
    answer:
      'DC (Direct Current) maintains constant polarity - electrons flow in one direction. AC (Alternating Current) periodically reverses polarity at 50Hz in the UK. Most building supplies are AC, but many control systems use DC (typically 24V DC for BMS sensors and actuators).',
  },
  {
    question: 'Why does the UK use 230V when many countries use 110V?',
    answer:
      'Higher voltage allows the same power to be delivered with lower current (P = VI), reducing cable sizes and I²R losses. 110V systems require larger cables or accept greater losses. The UK harmonised from 240V to 230V (±10%) to align with European standards.',
  },
  {
    question: 'What is the difference between kW and kVA?',
    answer:
      'kW (kilowatts) measures real power - the actual work done. kVA (kilovolt-amperes) measures apparent power - the total power supplied. In AC circuits with inductive loads (motors), kVA is greater than kW due to reactive power. The ratio kW/kVA is the power factor.',
  },
  {
    question: 'How do I calculate cable size for a given load?',
    answer:
      'First calculate current (I = P/V for single-phase, or I = P/(√3 × V × pf) for three-phase). Then select a cable with adequate current capacity from BS 7671 tables, considering installation method, ambient temperature, and grouping. Finally, verify voltage drop is within limits (typically 5% for power circuits).',
  },
  {
    question: 'Why is insulation resistance measured in megohms?',
    answer:
      'Good insulation should allow virtually no current to flow. Even at 500V test voltage, the leakage current through good insulation (say 200MΩ) is only 2.5µA - a tiny amount. Values below 1MΩ indicate degraded insulation that could allow dangerous fault currents.',
  },
  {
    question: "What does 'diversity' mean in load calculations?",
    answer:
      "Diversity accounts for the fact that not all loads operate simultaneously at full capacity. BS 7671 Appendix 1 provides diversity factors - for example, socket outlets in dwellings have diversity factors meaning a 32A ring can serve many sockets without overloading, as they won't all be used at once.",
  },
];

const HNCModule3Section1_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 1 · Subsection 1"
            title="Voltage, Current, Resistance and Power"
            description="The fundamental electrical quantities that underpin all circuit analysis and building services design"
            tone="purple"
          />

          <TLDR
            points={[
              'You can define V, I, R and P in SI units and move between them confidently using Ohm’s law and the three power equations (P = VI, P = I²R, P = V²/R).',
              'You can pick the right UK supply voltage for the application — 230 V single-phase, 400 V three-phase, 24 V DC for BMS, 110 V CTE for site tools, SELV for special locations.',
              'You can size a circuit from a load: convert kW to amps, allow for power factor, check Ib ≤ In ≤ Iz against BS 7671 cable tables.',
              'You can do a back-of-envelope voltage-drop check using cable mO/m values and the go-and-return rule.',
              'You can estimate energy use (kWh) and lighting power density (W/m²) for early-stage building services design.',
            ]}
          />

          <RegsCallout
            source="BS EN 50160 — Voltage characteristics of electricity supplied by public distribution systems"
            clause="UK declared low-voltage supply: 230 V single-phase / 400 V three-phase, 50 Hz, with a tolerance of ±10 % under normal operating conditions (207-253 V)."
            meaning={
              <>
                Equipment is rated to operate across the full ±10 % band, so HNC sizing
                calculations should use 230 V nominal and check worst-case voltage drop down to
                207 V at the furthest outlet. Anything outside that band is a power-quality issue,
                not a normal design assumption.
              </>
            }
            cite="Source: BS EN 50160 (latest edition); BS 7671 Section 132."
          />

          <LearningOutcomes
            outcomes={[
              'Define voltage, current, resistance and power with correct SI units',
              'Apply the power equations P = VI, P = I²R and P = V²/R',
              'Calculate current, voltage drop and power for single and three-phase',
              'Understand UK supply voltages in building services',
              'Apply power density calculations for lighting design',
              'Calculate energy consumption for load assessment',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="Voltage pushes, current flows, resistance opposes, power is the rate of work done."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Voltage (V):</strong> Electrical 'pressure' pushing charge through circuits
              </li>
              <li>
                <strong>Current (I):</strong> Rate of charge flow, measured in Amperes
              </li>
              <li>
                <strong>Resistance (R):</strong> Opposition to current, measured in Ohms
              </li>
              <li>
                <strong>Power (P):</strong> Rate of energy transfer: P = V × I
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>UK supplies:</strong> 230V single-phase, 400V three-phase
              </li>
              <li>
                <strong>Load calculations:</strong> Lighting, heating, HVAC
              </li>
              <li>
                <strong>Cable sizing:</strong> Based on current and voltage drop
              </li>
              <li>
                <strong>Energy billing:</strong> kWh consumption calculations
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Voltage — Electrical Potential Difference">
            <p>
              Voltage is the electrical 'pressure' that drives current through a circuit. It
              represents the energy available per unit charge and is always measured between two
              points.
            </p>
            <p className="text-sm font-medium text-white">Key facts about voltage:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1 Volt = 1 Joule per Coulomb (1V = 1 J/C)</li>
              <li>Voltage is always measured between two points (potential difference)</li>
              <li>Higher voltage can deliver more power with the same current</li>
              <li>Symbol: V, Unit: Volts (V)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">UK Building Services Voltages</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single-phase supply:</strong> 230V AC — ±10% tolerance (207V-253V)
              </li>
              <li>
                <strong>Three-phase (line):</strong> 400V AC — Between phases
              </li>
              <li>
                <strong>Three-phase (phase):</strong> 230V AC — Phase to neutral
              </li>
              <li>
                <strong>SELV (bathrooms):</strong> ≤50V AC / ≤120V DC — Extra-low voltage
                protection
              </li>
              <li>
                <strong>BMS controls:</strong> 24V DC — Sensors, actuators, controls
              </li>
              <li>
                <strong>Construction site tools:</strong> 110V AC — CTE (centre-tapped earth)
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> 400V ÷ √3 = 230V - this is the relationship between line
              and phase voltages in a three-phase system.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Current — Flow of Electric Charge">
            <p>
              Current is the rate at which electric charge flows through a conductor. It determines
              cable sizes, protective device ratings, and heat generation in circuits.
            </p>
            <p className="text-sm font-medium text-white">Key facts about current:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1 Ampere = 1 Coulomb per second (1A = 1 C/s)</li>
              <li>Current is the same at all points in a series circuit</li>
              <li>Current divides between parallel branches</li>
              <li>Symbol: I, Unit: Amperes (A)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Current Calculations</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single-phase:</strong> I = P / V = P / 230
              </li>
              <li>
                <strong>Three-phase:</strong> I = P / (√3 × VL × pf)
              </li>
              <li>Cable Iz must exceed design current Ib</li>
              <li>Device rating In must be ≥ Ib and ≤ Iz</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Typical Load Currents (230V)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>LED luminaire (45W):</strong> 0.2A
              </li>
              <li>
                <strong>Desktop computer:</strong> 0.9A
              </li>
              <li>
                <strong>3kW heater:</strong> 13A
              </li>
              <li>
                <strong>9.5kW shower:</strong> 41A
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Ib ≤ In ≤ Iz (design current ≤ protective device ≤
              cable capacity)
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Resistance — Opposition to Current Flow">
            <p>
              Resistance determines how much current flows for a given voltage. In building
              services, cable resistance causes voltage drop and power losses that must be accounted
              for in design.
            </p>
            <p className="text-sm font-medium text-white">Key facts about resistance:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1 Ohm = 1 Volt per Ampere (1Ω = 1 V/A)</li>
              <li>R = ρL/A (resistivity × length / area)</li>
              <li>Resistance increases with temperature</li>
              <li>Symbol: R, Unit: Ohms (Ω)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Cable Resistance (Copper at 20°C)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1.5mm²:</strong> 12.1 mΩ/m — Lighting circuits
              </li>
              <li>
                <strong>2.5mm²:</strong> 7.41 mΩ/m — Ring finals, radials
              </li>
              <li>
                <strong>4mm²:</strong> 4.61 mΩ/m — Cookers, showers
              </li>
              <li>
                <strong>6mm²:</strong> 3.08 mΩ/m — Showers, small motors
              </li>
              <li>
                <strong>10mm²:</strong> 1.83 mΩ/m — Sub-mains, large loads
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Temperature effect:</strong> Copper resistance increases ~0.4% per °C rise.
              Use correction factor 1.2 for cables operating at 70°C.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Power — Rate of Energy Transfer">
            <p>
              Power calculations are fundamental to building services design - from sizing
              individual circuits to specifying transformers and generators for entire buildings.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">The Power Equations</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>P = V × I</strong> — Basic power
              </li>
              <li>
                <strong>P = I² × R</strong> — Power from current
              </li>
              <li>
                <strong>P = V² / R</strong> — Power from voltage
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Three-Phase Power</p>
            <p>
              P = √3 × V<sub>L</sub> × I<sub>L</sub> × cos φ — Where VL = line voltage (400V),
              cos φ = power factor
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Power Density for Lighting (W/m²)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>General office:</strong> 10-12 W/m² (LED) — Target 300-500 lux
              </li>
              <li>
                <strong>Corridors:</strong> 5-8 W/m² (LED) — Target 100 lux
              </li>
              <li>
                <strong>Retail:</strong> 15-20 W/m² (LED) — Target 300-500 lux
              </li>
              <li>
                <strong>Warehouse:</strong> 5-8 W/m² (LED) — Target 150-200 lux
              </li>
            </ul>
            <p className="text-sm text-white italic">
              <strong>Energy calculation:</strong> E = P × t (kWh = kW × hours) - this is what
              electricity meters measure for billing.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">Example 1: Lighting Circuit Load</p>
            <p>
              <strong>Question:</strong> An office floor (500m²) requires lighting at 12 W/m².
              Calculate the total load and circuit current.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total power = Area × Power density</li>
              <li>P = 500m² × 12 W/m² = <strong>6000W = 6kW</strong></li>
              <li>Current at 230V: I = P / V = 6000 / 230 = <strong>26.1A</strong></li>
              <li>→ Requires multiple circuits or single 32A circuit</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 2: Cable Voltage Drop</p>
            <p>
              <strong>Question:</strong> A 3kW heater is supplied by 25m of 2.5mm² cable.
              Calculate the voltage drop.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Current: I = P / V = 3000 / 230 = 13A</li>
              <li>Cable resistance: R = 25m × 2 × 7.41mΩ/m = 0.37Ω (×2 for go and return conductors)</li>
              <li>Voltage drop: V = I × R = 13 × 0.37 = <strong>4.8V</strong></li>
              <li>As percentage: (4.8 / 230) × 100 = <strong>2.1%</strong> ✓ Within 5% limit for power circuits</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 3: Three-Phase Motor</p>
            <p>
              <strong>Question:</strong> A 15kW AHU motor operates at 0.85 power factor on 400V
              three-phase. Calculate the line current.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Using: P = √3 × VL × IL × cos φ</li>
              <li>Rearranging: IL = P / (√3 × VL × cos φ)</li>
              <li>IL = 15000 / (1.732 × 400 × 0.85)</li>
              <li>IL = 15000 / 588.9 = <strong>25.5A per phase</strong></li>
              <li>→ 32A MCB and 4mm² cable suitable</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>V = I × R</strong> — Ohm's Law
              </li>
              <li>
                <strong>P = V × I</strong> — Power (single-phase)
              </li>
              <li>
                <strong>P = √3 × VL × IL × cos φ</strong> — Three-phase power
              </li>
              <li>
                <strong>Vd = I × R × 2</strong> — Voltage drop (single-phase)
              </li>
              <li>
                <strong>E = P × t</strong> — Energy consumption
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Values to Remember</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                UK single-phase: <strong>230V</strong> (±10%)
              </li>
              <li>
                UK three-phase line: <strong>400V</strong>
              </li>
              <li>
                √3 = <strong>1.732</strong> (three-phase factor)
              </li>
              <li>
                Voltage drop limit (power): <strong>5%</strong>
              </li>
              <li>
                Voltage drop limit (lighting): <strong>3%</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common power and cable calculation mistakes"
            whatHappens={
              <>
                Forgetting to ×2 cable length for go and return conductors. Mixing mΩ/m and Ω in the
                same calculation. Ignoring power factor on motor loads. Treating cable resistance at
                20°C as if it were the operating value (it's ~20% higher at 70°C).
              </>
            }
            doInstead={
              <>
                Always double the run length for single-phase Vd. Convert all resistances to Ω
                before substituting. Apply pf for inductive loads. Use the 1.2 correction factor for
                hot cables.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Sizing a sub-main for a new tenant fit-out"
            situation={
              <>
                You are the building services engineer on a Cat-B office fit-out. The tenant
                has declared 80 kW of total connected load (lighting, small power, comfort
                cooling fan-coils) at an assumed 0.9 power factor, fed from a 400 V three-phase
                sub-main run 35 m from the landlord’s riser distribution board.
              </>
            }
            whatToDo={
              <>
                Convert load to line current: I<sub>L</sub> = P / (√3 × V<sub>L</sub>{' '}
                × cos φ) = 80 000 / (1.732 × 400 × 0.9) ≈ 128 A. Pick
                the next standard protective device above 128 A (typically 160 A MCCB), then
                select a cable from BS 7671 Appendix 4 with I<sub>z</sub> ≥ 160 A under the
                actual installation method, ambient and grouping factors. Finally check
                voltage drop over 35 m using the cable’s mV/A/m figure × length ×
                I<sub>b</sub> against the 5 % limit for power circuits in BS 7671 Appendix 12.
              </>
            }
            whyItMatters={
              <>
                Getting these four basics right — V, I, R and P — is the difference
                between a sub-main that serves the tenant for 25 years and one that nuisance-trips,
                cooks its insulation or fails the voltage drop check on commissioning. The numbers
                also sit inside the Part L energy submission, so they are auditable, not throwaway.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Voltage is potential difference (V), current is rate of charge flow (A), resistance is opposition (Ω), power is rate of energy transfer (W) — all four are bound together by Ohm’s law and the three power equations.',
              'UK declared supply: 230 V ±10 % single-phase, 400 V three-phase line, 50 Hz — design at nominal but check worst case at 207 V.',
              'Single-phase: I = P / V. Three-phase: I = P / (√3 × Vₗ × cos φ). Always include power factor on inductive loads.',
              'Cable selection rule: Iᵇ ≤ Iₙ ≤ I_z (design current ≤ device rating ≤ cable capacity at site conditions).',
              'I²R losses scale with the square of current — doubling the load quadruples the heat in the cable. Drives both cable sizing and voltage drop.',
              'Voltage drop limits (BS 7671 Appendix 12): 3 % lighting, 5 % power — always use the go-and-return distance for single-phase calcs.',
              'Energy is power × time (kWh) — the unit billed by the supply utility and reported in the Part L energy submission.',
              'Power density (W/m²) is the early-stage tool for sizing landlord supplies before the lighting and HVAC schedules are issued.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                DC circuit theory
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Ohm's Law
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section1_1;
