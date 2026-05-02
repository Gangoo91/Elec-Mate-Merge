/**
 * Module 3 · Section 3 · Subsection 7 — Power Triangle and Efficiency
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   The graphical anatomy of power — Pythagoras on P/Q/S, motor IE classes,
 *   transformer efficiency curves, Part L compliance arithmetic. Where AC theory
 *   meets the energy-efficiency obligations of every BSE design.
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

const TITLE = 'Power Triangle and Efficiency - HNC Module 3 Section 3.7';
const DESCRIPTION =
  'Master the power triangle relationship between real, reactive and apparent power. Learn efficiency calculations for motors, transformers and building services systems including IE ratings and Part L compliance.';

const quickCheckQuestions = [
  {
    id: 'power-triangle-relationship',
    question: 'In a power triangle, what is the relationship between S, P and Q?',
    options: ['S = P + Q', 'S² = P² + Q²', 'S = P × Q', 'S = P - Q'],
    correctIndex: 1,
    explanation:
      "The power triangle follows Pythagoras' theorem: S² = P² + Q². Apparent power (S) is the hypotenuse, with real power (P) as the adjacent side and reactive power (Q) as the opposite side.",
  },
  {
    id: 'efficiency-formula',
    question: 'What is the correct formula for efficiency?',
    options: [
      'η = Pin / Pout × 100%',
      'η = Pout / Pin × 100%',
      'η = (Pin - Pout) × 100%',
      'η = Pout + losses',
    ],
    correctIndex: 1,
    explanation:
      'Efficiency η = Pout / Pin × 100%. This represents the percentage of input power that is converted to useful output power. The remainder is lost as heat, noise, or other forms.',
  },
  {
    id: 'ie3-motor',
    question: 'What IE efficiency class is mandatory for most new motors in the EU/UK since 2017?',
    options: ['IE1 Standard', 'IE2 High', 'IE3 Premium', 'IE4 Super Premium'],
    correctIndex: 2,
    explanation:
      'IE3 Premium efficiency motors became mandatory for most applications (0.75kW to 375kW) from 2017. IE4 is increasingly required for certain applications from 2023.',
  },
  {
    id: 'transformer-efficiency',
    question:
      'A transformer has 500W iron losses and 800W copper losses at full load. With 50kW output, what is its efficiency?',
    options: ['96.5%', '97.4%', '98.7%', '99.2%'],
    correctIndex: 1,
    explanation:
      'η = Pout / (Pout + losses) = 50000 / (50000 + 500 + 800) = 50000 / 51300 = 0.9746 = 97.4%. Transformer efficiency is typically very high at 95-99%.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'In a power triangle, which power component forms the horizontal (adjacent) side?',
    options: ['Reactive power (Q)', 'Apparent power (S)', 'Real power (P)', 'Power factor'],
    correctAnswer: 2,
    explanation:
      'Real power (P) in kW forms the horizontal (adjacent) side of the power triangle. Reactive power (Q) is vertical (opposite), and apparent power (S) is the hypotenuse.',
  },
  {
    id: 2,
    question: 'A motor draws 50kVA at 0.8 power factor lagging. What is the reactive power?',
    options: ['30 kVAr', '40 kVAr', '50 kVAr', '62.5 kVAr'],
    correctAnswer: 0,
    explanation:
      'Using Q = S × sin φ, where sin φ = √(1 - cos²φ) = √(1 - 0.64) = 0.6. Therefore Q = 50 × 0.6 = 30 kVAr. Alternatively, P = 50 × 0.8 = 40kW, then Q = √(50² - 40²) = 30 kVAr.',
  },
  {
    id: 3,
    question: 'What does the angle φ (phi) represent in the power triangle?',
    options: [
      'The efficiency of the system',
      'The phase angle between voltage and current',
      'The power loss percentage',
      'The harmonic distortion',
    ],
    correctAnswer: 1,
    explanation:
      'The angle φ represents the phase angle between voltage and current. Its cosine (cos φ) gives the power factor. A larger angle means more reactive power and lower power factor.',
  },
  {
    id: 4,
    question: 'A 15kW motor operates at 92% efficiency. What is the input power required?',
    options: ['13.8kW', '15kW', '16.3kW', '17.4kW'],
    correctAnswer: 2,
    explanation:
      'Pin = Pout / η = 15kW / 0.92 = 16.3kW. The motor requires more input power than its output rating due to internal losses.',
  },
  {
    id: 5,
    question: 'Which losses occur in a transformer regardless of load?',
    options: [
      'Copper losses only',
      'Iron (core) losses only',
      'Both copper and iron losses',
      'Neither - all losses are load-dependent',
    ],
    correctAnswer: 1,
    explanation:
      'Iron (core) losses occur whenever the transformer is energised, regardless of load. They include hysteresis and eddy current losses. Copper (I²R) losses vary with load current.',
  },
  {
    id: 6,
    question: 'An IE4 motor compared to an IE2 motor of the same rating typically offers:',
    options: [
      '2-3% higher efficiency',
      '5-10% higher efficiency',
      'The same efficiency but longer life',
      'Lower efficiency but lower cost',
    ],
    correctAnswer: 0,
    explanation:
      'IE4 Super Premium motors typically offer 2-3% higher efficiency than IE2 High efficiency motors. While this seems small, over years of operation, the energy savings are substantial.',
  },
  {
    id: 7,
    question:
      'For a system with two components in series (η₁ = 95%, η₂ = 90%), what is the overall efficiency?',
    options: ['185%', '92.5%', '85.5%', '90%'],
    correctAnswer: 2,
    explanation:
      'For series components, multiply efficiencies: η_total = η₁ × η₂ = 0.95 × 0.90 = 0.855 = 85.5%. Each stage reduces overall efficiency.',
  },
  {
    id: 8,
    question:
      'Building Regulations Part L requires consideration of which aspect related to power and efficiency?',
    options: [
      'Power factor correction only',
      'Motor starting currents only',
      'Energy efficiency of fixed building services',
      'Harmonic distortion levels',
    ],
    correctAnswer: 2,
    explanation:
      'Part L requires consideration of energy efficiency for fixed building services including HVAC, lighting, and hot water systems. High-efficiency equipment helps achieve compliance.',
  },
  {
    id: 9,
    question: 'At what load condition does a transformer typically achieve maximum efficiency?',
    options: ['No load', 'When copper losses equal iron losses', 'Full load', '150% overload'],
    correctAnswer: 1,
    explanation:
      'Transformer efficiency is maximum when variable (copper) losses equal constant (iron) losses. This typically occurs at 50-75% of full load, making transformers most efficient at typical operating loads.',
  },
  {
    id: 10,
    question:
      'A building has 200kW of motor loads at average 90% efficiency running 3000 hours/year. If motors are upgraded to 95% efficiency, what is the annual energy saving?',
    options: ['5,263 kWh', '11,696 kWh', '31,579 kWh', '35,088 kWh'],
    correctAnswer: 2,
    explanation:
      'Original input: 200/0.90 = 222.2kW. New input: 200/0.95 = 210.5kW. Saving: (222.2 - 210.5) × 3000 = 11.7kW × 3000 = 35,100 kWh, closest to 35,088 kWh.',
  },
];

const faqs = [
  {
    question: 'Why is the power triangle important in building services design?',
    answer:
      'The power triangle helps engineers understand the relationship between real power (kW - what does useful work), reactive power (kVAr - circulates in the system), and apparent power (kVA - what must be supplied). Cables, transformers and switchgear must be sized for apparent power (kVA), while energy bills are based on real power (kWh). Poor power factor means oversized equipment and potentially reactive power charges.',
  },
  {
    question: 'How do I calculate efficiency losses in a complete system?',
    answer:
      'For components in series (e.g., VSD feeding a motor driving a pump), multiply individual efficiencies: η_total = η_VSD × η_motor × η_pump. For a 97% efficient VSD, 92% motor, and 75% pump: 0.97 × 0.92 × 0.75 = 67% overall. Always start from the load and work back to determine required input power.',
  },
  {
    question: 'What are the main sources of motor losses?',
    answer:
      'Motor losses include: stator copper losses (I²R in windings), rotor copper losses, iron/core losses (hysteresis and eddy currents), mechanical losses (friction and windage), and stray load losses. Higher IE-class motors reduce these through better materials, tighter tolerances, and optimised electromagnetic design.',
  },
  {
    question: 'When should I specify an IE4 motor instead of IE3?',
    answer:
      "Specify IE4 for motors with high running hours (>4000 hours/year), constant load applications, and where payback calculations justify the premium. From July 2023, IE4 became mandatory for certain motor types (75-200kW, 2, 4, and 6 pole). The 2-3% efficiency gain compounds significantly over a motor's 15-20 year life.",
  },
  {
    question: 'How does Part L affect equipment selection?',
    answer:
      'Building Regulations Part L requires energy-efficient fixed building services. This affects selection of motors (minimum IE3/IE4), lighting (efficacy requirements), HVAC equipment (SEER/SCOP ratings), pumps, and fans. Compliance is demonstrated through BRUKL calculations and actual equipment specifications must match or exceed design assumptions.',
  },
  {
    question: 'What is the difference between iron losses and copper losses in transformers?',
    answer:
      "Iron (core) losses are constant whenever the transformer is energised - they don't depend on load. They include hysteresis losses (energy to magnetise/demagnetise the core each cycle) and eddy current losses (circulating currents in the core). Copper losses (I²R) vary with the square of load current and occur in the windings. At light loads, iron losses dominate; at heavy loads, copper losses dominate.",
  },
];

const HNCModule3Section3_7 = () => {
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
            eyebrow="Module 3 · Section 3 · Subsection 7"
            title="Power Triangle and Efficiency"
            description="Graphical representation of power relationships and system efficiency calculations for building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You apply Pythagoras to P, Q, S on every PFC sizing exercise — the geometry shows exactly how kVAr injection rotates the triangle towards unity pf.',
              'You specify motors to IE3 minimum (IE4 above 75 kW) under Ecodesign Regulation 2019/1781 — sub-IE3 motors cannot be placed on the UK market for new installations.',
              'You evaluate transformer load profile against the efficiency curve — peak efficiency typically at 40&ndash;60 % rated kVA, not at full load.',
              'You document Part L (Approved Document L 2021) compliance with motor and luminaire efficiency evidence — the BREEAM credits and SAP/SBEM submission depend on it.',
            ]}
          />

          <RegsCallout
            source="Building Regulations 2010 — Approved Document L (2021): Conservation of fuel and power"
            clause="Reasonable provision shall be made for the conservation of fuel and power in or in connection with buildings by limiting heat gains and losses, by providing fixed building services that are energy-efficient, have effective controls, and are commissioned by testing and adjustment to use no more fuel and power than is reasonable."
            meaning={
              <>
                Approved Document L 2021 (and L Volume 1 / Volume 2 for dwellings and
                non-dwellings) is the regulatory anchor for efficiency on every BSE
                project. As designer you evidence motor IE class, lighting efficacy
                (lm/W), variable speed control on pumps/fans, and overall as-built energy
                performance against the design-stage SAP / SBEM model. The arithmetic on
                this page (efficiency, P/Q/S) is the calculation behind that evidence.
              </>
            }
            cite="Source: Building Regulations 2010, Approved Document L (2021); Ecodesign Regulation (EU) 2019/1781 retained as UK law; CIBSE Guide F &mdash; Energy efficiency in buildings"
          />

          <LearningOutcomes
            outcomes={[
              'Construct and interpret the power triangle for AC circuits',
              "Apply Pythagoras' theorem to calculate P, Q and S",
              'Calculate efficiency for motors, transformers and systems',
              'Understand motor IE efficiency classifications',
              'Analyse transformer losses and efficiency conditions',
              'Apply efficiency calculations to Part L compliance',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="The Power Triangle - P, Q, S Relationship">
            <p>
              The power triangle is a graphical representation of the relationship between real
              power (P), reactive power (Q) and apparent power (S) in AC circuits. It provides an
              intuitive way to visualise how these three power components relate to each other and
              to power factor.
            </p>
            <p>Power Triangle Components:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Real Power (P):</strong> Horizontal side - measured in kW - does useful work</li>
              <li><strong>Reactive Power (Q):</strong> Vertical side - measured in kVAr - energy storage in L and C</li>
              <li><strong>Apparent Power (S):</strong> Hypotenuse - measured in kVA - total power supplied</li>
              <li><strong>Phase Angle (φ):</strong> Angle between P and S - determines power factor</li>
            </ul>
            <p>
              <strong>Power Triangle Diagram:</strong> S (apparent power, hypotenuse, kVA) at the
              top of the right-angled triangle; P (real power, adjacent, kW) along the horizontal
              base; Q (reactive power, opposite, kVAr) on the vertical side; angle φ between P
              and S; cos φ = Power Factor = P/S.
            </p>
            <p>
              <strong>Key Relationships:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>P = S × cos φ — Real power</li>
              <li>Q = S × sin φ — Reactive power</li>
              <li>cos φ = P / S — Power factor</li>
              <li>tan φ = Q / P — Q/P ratio</li>
            </ul>
            <p>
              <strong>Remember:</strong> For inductive loads (motors, transformers), Q is
              positive (lagging). For capacitive loads, Q is negative (leading). The triangle
              helps visualise the effect of power factor correction.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Pythagoras' Theorem: S² = P² + Q²">
            <p>
              Since the power triangle is a right-angled triangle, Pythagoras' theorem applies
              directly. This fundamental relationship allows calculation of any unknown power
              component when two are known.
            </p>
            <p>
              <strong>The Fundamental Equation:</strong> S² = P² + Q². Apparent power squared
              equals real power squared plus reactive power squared.
            </p>
            <p>
              <strong>Rearranged Forms:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Apparent Power (S) = √(P² + Q²) — Example: √(40² + 30²) = 50 kVA</li>
              <li>Real Power (P) = √(S² - Q²) — Example: √(50² - 30²) = 40 kW</li>
              <li>Reactive Power (Q) = √(S² - P²) — Example: √(50² - 40²) = 30 kVAr</li>
            </ul>
            <p>
              <strong>Alternative Using Power Factor:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>S = P / cos φ</strong> — Calculate S when P and pf are known</li>
              <li><strong>Q = P × tan φ</strong> — Calculate Q when P and pf are known</li>
              <li><strong>sin φ = √(1 - cos²φ)</strong> — Convert power factor to sin for Q calculations</li>
            </ul>
            <p>
              <strong>Design tip:</strong> Equipment (cables, transformers, switchgear) must be
              rated for apparent power S, not real power P. A 100kW load at 0.8 pf requires
              125kVA capacity.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Graphical Representation and Applications">
            <p>
              The power triangle provides valuable visual insight into system behaviour and the
              effects of power factor correction. Understanding these graphical relationships is
              essential for building services design.
            </p>
            <p>
              <strong>Power Factor Correction Visualised.</strong> Before PFC (pf = 0.7): S₁ =
              143 kVA, Q₁ = 102 kVAr, angle 45°, P = 100 kW. After PFC (pf = 0.95): S₂ = 105 kVA,
              Q₂ = 33 kVAr, angle 18°, P = 100 kW. Capacitor added: Qc = 102 - 33 = 69 kVAr.
              Result: 27% reduction in apparent power (S).
            </p>
            <p>What the Triangle Shows:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Angle φ:</strong> Larger angle = lower power factor = more reactive power</li>
              <li><strong>PFC effect:</strong> Reduces Q, therefore reduces S while P stays constant</li>
              <li><strong>Capacity release:</strong> Lower S means existing cables/transformers can serve more real load</li>
              <li><strong>Unity pf:</strong> Triangle collapses to a line (Q = 0, S = P)</li>
            </ul>
            <p>
              <strong>Typical Power Factor Values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Resistive (heaters, incandescent) — pf 1.0 — Phase angle 0°</li>
              <li>LED drivers (with PFC) — pf 0.90-0.95 — Phase angle 18-26°</li>
              <li>Induction motors (full load) — pf 0.80-0.90 — Phase angle 26-37°</li>
              <li>Induction motors (light load) — pf 0.40-0.60 — Phase angle 53-66°</li>
              <li>Welding equipment — pf 0.50-0.70 — Phase angle 45-60°</li>
            </ul>
            <p>
              <strong>Practical note:</strong> Most DNOs and large suppliers charge reactive
              power penalties when power factor falls below 0.95 lagging. The power triangle
              helps calculate the capacitor kVAr needed for correction.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Efficiency - η = Pout/Pin × 100%">
            <p>
              Efficiency measures how effectively a device converts input power to useful output
              power. In building services, understanding efficiency is critical for equipment
              selection, energy calculations and regulatory compliance.
            </p>
            <p>
              <strong>The Efficiency Equation:</strong> η = (Pout / Pin) × 100%. Efficiency
              equals output power divided by input power, expressed as a percentage.
            </p>
            <p>
              <strong>Alternative Forms:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>η = Pout / Pin</strong> — Basic ratio (as decimal)</li>
              <li><strong>η = (Pin - Losses) / Pin</strong> — Using losses</li>
              <li><strong>Losses = Pin - Pout</strong> — Power dissipated</li>
              <li><strong>Pin = Pout / η</strong> — Input from output</li>
              <li><strong>Pout = Pin × η</strong> — Output from input</li>
              <li><strong>Losses = Pin × (1 - η)</strong> — Loss calculation</li>
            </ul>
            <p>
              <strong>Efficiency in Energy Terms:</strong> η = Eout / Ein = (Pout × t) / (Pin × t).
              Annual energy loss = Pin × (1 - η) × operating hours. Example: 50kW motor at 92%
              efficiency, 4000 hrs/year. Input = 50/0.92 = 54.3kW, Losses = 4.3kW. Annual loss =
              4.3 × 4000 = 17,200 kWh.
            </p>
            <p>
              <strong>Key principle:</strong> Efficiency is always less than 100% due to
              unavoidable losses. Even small efficiency improvements yield significant savings
              over equipment lifetime.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Motor Efficiency and IE Classifications">
            <p>
              Electric motors consume approximately 45% of global electricity. The International
              Efficiency (IE) classification system standardises motor efficiency ratings, with
              minimum requirements set by EU Ecodesign regulations applicable in the UK.
            </p>
            <p>
              <strong>IE Efficiency Classes (IEC 60034-30-1):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>IE1 — Standard — Typical η (11kW, 4-pole) 87.6% — Status: Not permitted (new)</li>
              <li>IE2 — High — 89.8% — Status: With VSD only</li>
              <li>IE3 — Premium — 91.4% — Status: Minimum (DOL)</li>
              <li>IE4 — Super Premium — 92.6% — Status: Required 75-200kW (2023)</li>
              <li>IE5 — Ultra Premium — 93.9% — Status: Best available</li>
            </ul>
            <p>Current UK/EU Regulations (from July 2023):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>0.75-1000kW:</strong> IE3 minimum for direct-on-line starting</li>
              <li><strong>0.75-1000kW with VSD:</strong> IE2 minimum permitted</li>
              <li><strong>75-200kW (2,4,6 pole):</strong> IE4 mandatory</li>
              <li><strong>Exemptions:</strong> ATEX, high altitude, specific duty applications</li>
            </ul>
            <p>
              <strong>Motor Loss Categories:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Stator copper losses:</strong> I²R losses in stator windings (largest component)</li>
              <li><strong>Rotor copper losses:</strong> I²R losses in rotor (induction motors)</li>
              <li><strong>Iron/core losses:</strong> Hysteresis and eddy currents in laminations</li>
              <li><strong>Mechanical losses:</strong> Bearing friction and windage (fan cooling)</li>
              <li><strong>Stray load losses:</strong> Leakage flux and harmonic effects</li>
            </ul>
            <p>
              <strong>Selection guidance:</strong> For motors running &gt;4000 hours/year at
              &gt;75% load, IE4 typically pays back within 2-3 years despite higher purchase
              cost.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Transformer Efficiency">
            <p>
              Transformers are highly efficient devices (typically 95-99%), but given their
              continuous operation and the large powers involved, even small efficiency
              improvements translate to significant energy and cost savings.
            </p>
            <p>
              <strong>Transformer Losses:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Iron (Core) Losses - Constant — Occur whenever energised; Independent of load; Hysteresis losses (magnetisation); Eddy current losses; Also called "no-load losses"</li>
              <li>Copper (Winding) Losses - Variable — Vary with load current; Proportional to I² (load squared); I²R losses in windings; Also called "load losses"; Quadruple if load doubles</li>
            </ul>
            <p>
              <strong>Transformer Efficiency Formula:</strong> η = Pout / (Pout + Piron + Pcopper)
              × 100%. Or equivalently: η = Pout / Pin × 100%.
            </p>
            <p>
              <strong>Condition for Maximum Efficiency:</strong> Maximum efficiency occurs when
              Iron losses = Copper losses. Since copper losses = PCu(FL) × (Load fraction)² and
              iron losses are constant, Load for max η = √(Piron / PCu(FL)) × Full load.
              Typically occurs at 50-75% of rated load.
            </p>
            <p>
              <strong>Typical Transformer Efficiencies:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>100 kVA — Oil-filled distribution — 98.0-98.5%</li>
              <li>500 kVA — Oil-filled distribution — 98.5-99.0%</li>
              <li>1000 kVA — Dry-type (cast resin) — 98.0-98.5%</li>
              <li>10-50 kVA — Control/isolation — 95.0-97.0%</li>
            </ul>
            <p>
              <strong>EU Ecodesign:</strong> Regulation 2019/1783 sets minimum efficiency (Tier 2
              from July 2021) for distribution transformers 50kVA - 40MVA. Specify compliant
              transformers for new installations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="System Efficiency Calculations">
            <p>
              Real building services systems comprise multiple components in series.
              Understanding how to calculate overall system efficiency is essential for accurate
              energy modelling and equipment sizing.
            </p>
            <p>
              <strong>Series Efficiency Rule:</strong> ηtotal = η₁ × η₂ × η₃ × ... × ηn. For
              components in series, multiply individual efficiencies.
            </p>
            <p>
              <strong>Example: Variable Speed Pump System.</strong> Components in series:
              Transformer η = 98.5%; Variable Speed Drive η = 97%; Motor (IE3, 15kW) η = 92%;
              Pump η = 75%. Overall efficiency: ηtotal = 0.985 × 0.97 × 0.92 × 0.75 = 0.659 =
              65.9%. To deliver 10kW hydraulic power: Electrical input = 10 / 0.659 = 15.2 kW.
            </p>
            <p>
              <strong>Typical System Component Efficiencies:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Distribution transformer — 98-99% — Higher for larger units</li>
              <li>Variable Speed Drive — 95-98% — Lower at low speeds</li>
              <li>IE3 Motor (11-90kW) — 90-94% — At rated load</li>
              <li>Centrifugal pump — 60-85% — At BEP; lower off-design</li>
              <li>Centrifugal fan — 65-85% — At BEP; lower off-design</li>
              <li>Belt drive — 95-98% — Direct drive avoids this</li>
              <li>Gearbox — 95-98% — Per stage</li>
            </ul>
            <p>
              <strong>Design insight:</strong> The lowest-efficiency component dominates system
              performance. Improving pump efficiency from 70% to 80% saves more energy than
              improving a 95% motor to 97%.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Building Services: Equipment Efficiency and Compliance">
            <p>
              Understanding efficiency is essential for building services engineers to select
              appropriate equipment, demonstrate regulatory compliance, and identify
              opportunities for energy savings through audits and upgrades.
            </p>
            <p>
              <strong>Building Regulations Part L Requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fixed building services:</strong> Must meet minimum efficiency standards</li>
              <li><strong>HVAC systems:</strong> SEER (cooling) and SCOP (heating) ratings apply</li>
              <li><strong>Lighting:</strong> Luminous efficacy and control requirements</li>
              <li><strong>Motors and drives:</strong> IE class requirements as per Ecodesign</li>
              <li><strong>BRUKL compliance:</strong> As-built specifications must match or exceed design</li>
            </ul>
            <p>
              <strong>Energy Audits - Key Efficiency Checks:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Motors — IE class, loading factor, running hours — Improvement: Upgrade to IE4, right-size, add VSD</li>
              <li>Transformers — No-load losses, loading pattern — Improvement: Low-loss cores, right-sizing</li>
              <li>Lighting — Luminous efficacy (lm/W), controls — Improvement: LED retrofit, presence/daylight sensing</li>
              <li>HVAC — SEER, SCOP, fan/pump efficiency — Improvement: High-efficiency chillers, VSDs on AHUs</li>
              <li>Power factor — Site pf, reactive power charges — Improvement: PFC capacitors, active filters</li>
            </ul>
            <p>
              <strong>Life Cycle Cost Analysis.</strong> Comparing IE3 vs IE4 motor (15kW, 4000
              hrs/year, 12p/kWh): IE3: η = 91.5%, Input = 15/0.915 = 16.39 kW. IE4: η = 93.0%,
              Input = 15/0.930 = 16.13 kW. Annual saving = (16.39 - 16.13) × 4000 × 0.12 = 0.26 ×
              4000 × 0.12 = £125/year. If IE4 premium is £300, payback = 2.4 years. Over 15-year
              motor life: £1,875 net saving.
            </p>
            <p>ESOS and Energy Auditing Requirements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>ESOS (Energy Savings Opportunity Scheme):</strong> Large organisations must conduct energy audits every 4 years</li>
              <li><strong>ISO 50001:</strong> Energy management certification (ESOS alternative)</li>
              <li><strong>DEC (Display Energy Certificate):</strong> Public buildings must display energy performance</li>
              <li><strong>MEES (Minimum Energy Efficiency Standards):</strong> EPC rating requirements for lettings</li>
            </ul>
            <p>
              <strong>Professional practice:</strong> Always document equipment efficiencies in
              design reports. This supports Part L compliance, future audits, and maintenance
              decisions.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Power Triangle Calculation.</strong> A three-phase motor draws
              75kVA at 0.85 power factor lagging. Calculate P, Q and verify using Pythagoras.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Given: S = 75 kVA, cos φ = 0.85 (lagging)</li>
              <li>Real power: P = S × cos φ = 75 × 0.85 = <strong>63.75 kW</strong></li>
              <li>sin φ = √(1 - cos²φ) = √(1 - 0.7225) = 0.527</li>
              <li>Reactive power: Q = S × sin φ = 75 × 0.527 = <strong>39.5 kVAr</strong> (lagging)</li>
              <li>Verify: S² = P² + Q² → 75² = 63.75² + 39.5² → 5625 = 4064 + 1560 = 5624 (rounding)</li>
            </ul>
            <p>
              <strong>Example 2: Motor Efficiency and Running Costs.</strong> A 22kW IE3 motor
              (93% efficiency) runs 5000 hours/year. Calculate annual energy consumption and
              cost at 15p/kWh.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pout = 22 kW; η = 93% = 0.93</li>
              <li>Pin = Pout / η = 22 / 0.93 = <strong>23.66 kW</strong></li>
              <li>E = Pin × hours = 23.66 × 5000 = <strong>118,300 kWh</strong></li>
              <li>Cost = 118,300 × £0.15 = <strong>£17,745/year</strong></li>
              <li>Power losses = 23.66 - 22 = 1.66 kW (dissipated as heat)</li>
            </ul>
            <p>
              <strong>Example 3: Transformer Efficiency at Part Load.</strong> A 500kVA
              transformer has 1.2kW iron losses and 6kW copper losses at full load. Calculate
              efficiency at full load and 50% load.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>At full load (assuming unity pf, so Pout = 500kW): Total losses = 1.2 + 6.0 = 7.2 kW; η = 500 / (500 + 7.2) × 100 = <strong>98.58%</strong></li>
              <li>At 50% load (Pout = 250kW): Iron losses = 1.2 kW (constant); Copper losses = 6.0 × (0.5)² = 6.0 × 0.25 = 1.5 kW; Total losses = 1.2 + 1.5 = 2.7 kW; η = 250 / (250 + 2.7) × 100 = <strong>98.93%</strong></li>
              <li>Higher efficiency at part load as iron is approximately equal to copper losses</li>
            </ul>
            <p>
              <strong>Example 4: Complete Pump System Efficiency.</strong> A HVAC pump system
              requires 8kW hydraulic power. Calculate the electrical input given: VSD 96%, motor
              91%, pump 72%.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Phydraulic = 8 kW</li>
              <li>ηsystem = ηVSD × ηmotor × ηpump = 0.96 × 0.91 × 0.72 = <strong>0.629 = 62.9%</strong></li>
              <li>Pelec = Phydraulic / ηsystem = 8 / 0.629 = <strong>12.72 kW</strong></li>
              <li>Losses breakdown: VSD: 12.72 × 0.04 = 0.51 kW; Motor: (12.72 - 0.51) × 0.09 = 1.10 kW; Pump: (12.72 - 0.51 - 1.10) × 0.28 = 3.11 kW; Total: 4.72 kW losses (37.1% of input)</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p>
              <strong>Essential Formulae:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>S² = P² + Q²</strong> — Pythagoras for power triangle</li>
              <li><strong>P = S × cos φ</strong> — Real power from apparent</li>
              <li><strong>Q = S × sin φ</strong> — Reactive power from apparent</li>
              <li><strong>η = Pout / Pin × 100%</strong> — Efficiency definition</li>
              <li><strong>ηtotal = η₁ × η₂ × η₃</strong> — Series efficiency</li>
              <li><strong>Pin = Pout / η</strong> — Input from output and efficiency</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>IE3 motor typical efficiency: <strong>90-94%</strong> (depends on size)</li>
              <li>Distribution transformer efficiency: <strong>98-99%</strong></li>
              <li>VSD efficiency: <strong>95-98%</strong> at rated speed</li>
              <li>Centrifugal pump BEP efficiency: <strong>70-85%</strong></li>
              <li>Target site power factor: <strong>&gt;0.95</strong> (avoid charges)</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Adding efficiencies:</strong> Series efficiencies multiply, not add</li>
                <li><strong>Confusing kW and kVA:</strong> Size equipment for kVA, pay for kWh</li>
                <li><strong>Ignoring part-load:</strong> Equipment often runs at 30-70% load</li>
                <li><strong>Full-load efficiency only:</strong> Efficiency varies with loading</li>
                <li><strong>Forgetting copper loss varies:</strong> Copper losses are proportional to load² for transformers</li>
              </ul>
            }
            doInstead="Multiply series-component efficiencies (never add). Specify cables and switchgear in kVA; bill in kWh. Use part-load efficiency curves for equipment that rarely runs at full load. Include load² scaling for transformer copper losses in any energy model."
          />

          <SectionRule />

          <Scenario
            title="School AHU motor replacement &mdash; IE3 vs IE4 lifecycle cost"
            situation={
              <>
                A school AHU has a failed 22 kW IE2 induction motor (typical 91.0 %
                efficiency). The maintenance contractor proposes a like-for-like IE3
                replacement (92.6 %), but a Part L compliance review by the SBEM
                consultant suggests an IE4 motor (93.6 %) for the additional CO&#x2082;
                credit. Annual run-time is 4500 hours.
              </>
            }
            whatToDo={
              <>
                Compute the energy delta. IE3 input = 22 / 0.926 = 23.76 kW; IE4 input = 22
                / 0.936 = 23.50 kW. Annual kWh saving (IE4 vs IE3) = (23.76 &minus; 23.50)
                &times; 4500 = 1170 kWh, ~&pound;234/year at 20 p/kWh, plus 0.16 t
                CO&#x2082;/year. Capital uplift IE4 vs IE3 typically &pound;200&ndash;&pound;400.
                Payback &lt; 2 years. Specify IE4 and document the saving in the
                building&rsquo;s log book / SBEM as-built submission.
              </>
            }
            whyItMatters={
              <>
                Motor efficiency above IE3 is no longer optional in UK new-build above
                certain ratings under Ecodesign Regulation 2019/1781 (retained as UK law),
                and is increasingly enforced on like-for-like replacements via Part L log
                book obligations. The arithmetic the BSE engineer signs off here is the
                evidence the building uses for SAP/SBEM as-built compliance.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Power triangle: S&sup2; = P&sup2; + Q&sup2; — Pythagoras applies because P (real) and Q (reactive) are 90&deg; out of phase.',
              'pf = cos &phi; = P/S — the power-factor angle is the angle of S above the horizontal P axis.',
              'Efficiency &eta; = P&#x2092;&#x1d64;&#x209c; / P&#x1d62;&#x2099; &times; 100 % &mdash; cumulatively multiply efficiencies through a chain (motor &times; gearbox &times; pump = system efficiency).',
              'Motor IE classes: IE1 standard, IE2 high, IE3 premium, IE4 super-premium &mdash; UK Ecodesign Regulation 2019/1781 mandates IE3 minimum for most new motors.',
              'Transformer efficiency curve peaks at 40&ndash;60 % load &mdash; oversizing actually loses energy because no-load (iron) losses are continuous.',
              'BREEAM Ene credits and Part L compliance both rely on the efficiency arithmetic the BSE engineer signs off on.',
              'PFC kVAr = kW &times; (tan&phi;&#x2081; &minus; tan&phi;&#x2082;) — the geometry of the triangle is the basis of every capacitor sizing.',
              'Approved Document L 2021 is the over-arching regulatory anchor for every efficiency calculation on a UK building services design.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section3-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                True, Reactive and Apparent Power
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4-1')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Star and Delta Configurations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section3_7;
