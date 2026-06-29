/**
 * Module 3 · Section 6 · Subsection 2 — Efficiency Calculations for Equipment and Systems
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   System-level efficiency &mdash; cascade arithmetic, motor IE classes, transformer
 *   efficiency curves, life-cycle cost analysis. The numbers behind every Part L
 *   compliance and BREEAM Ene credit submission.
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

const TITLE = 'Efficiency Calculations for Equipment and Systems - HNC Module 3 Section 6.2';
const DESCRIPTION =
  'Master efficiency calculations for building services equipment: motor efficiency classes IE1-IE5, transformer efficiency, part-load considerations, life cycle costing and energy auditing techniques.';

const quickCheckQuestions = [
  {
    id: 'efficiency-formula',
    question: 'What is the basic efficiency formula?',
    options: [
      'η = Pin/Pout × 100%',
      'η = Pout - Pin',
      'η = Pin × Pout',
      'η = Pout/Pin × 100%',
    ],
    correctIndex: 3,
    explanation:
      'Efficiency (η) equals output power divided by input power, multiplied by 100% to express as a percentage: η = Pout/Pin × 100%. This always gives a value less than 100% due to losses.',
  },
  {
    id: 'ie-class',
    question: 'Which motor efficiency class represents the highest efficiency level?',
    options: [
      'IE2 High',
      'IE3 Premium',
      'IE5 Ultra Premium',
      'IE1 Standard',
    ],
    correctIndex: 2,
    explanation:
      'IE5 Ultra Premium represents the highest motor efficiency class, approximately 20% lower losses than IE4. The scale runs from IE1 (Standard) to IE5 (Ultra Premium).',
  },
  {
    id: 'all-day-efficiency',
    question: 'All-day efficiency for transformers is calculated using:',
    options: [
      'Output power ÷ input power at full load only',
      'The ratio of iron losses to copper losses',
      'Rated kVA ÷ actual peak demand over 24 hours',
      'Energy output ÷ Energy input over 24 hours',
    ],
    correctIndex: 3,
    explanation:
      'All-day efficiency considers the total energy delivered over 24 hours divided by total energy consumed. This accounts for varying load profiles throughout the day.',
  },
  {
    id: 'payback-period',
    question:
      'If an efficient motor costs GBP 2,400 more but saves GBP 800/year in energy, what is the simple payback period?',
    options: [
      '3 years',
      '1 year',
      '2 years',
      '4 years',
    ],
    correctIndex: 0,
    explanation:
      'Simple payback period = Extra cost ÷ Annual savings = GBP 2,400 ÷ GBP 800/year = 3 years. This is a basic economic measure for equipment selection decisions.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A motor draws 15kW from the supply and delivers 12.75kW at the shaft. What is its efficiency?',
    options: [
      '82%',
      '85%',
      '88%',
      '90%',
    ],
    correctAnswer: 1,
    explanation: 'Efficiency η = Pout/Pin × 100% = 12.75/15 × 100% = 85%',
  },
  {
    id: 2,
    question:
      'Under EU Ecodesign regulations (2021), what is the minimum efficiency class for most new three-phase motors 0.75-1000kW?',
    options: [
      'IE4 Super Premium',
      'IE1 Standard',
      'IE3 Premium',
      'IE2 High',
    ],
    correctAnswer: 2,
    explanation:
      'Since July 2021, new three-phase motors 0.75-1000kW must meet IE3 minimum. Motors 75-200kW must meet IE4 since July 2023.',
  },
  {
    id: 3,
    question:
      'A transformer has 500W iron losses and 1500W copper losses at full load. At what fraction of full load does maximum efficiency occur?',
    options: [
      '0.50',
      '0.33',
      '0.75',
      '0.58',
    ],
    correctAnswer: 3,
    explanation:
      'Maximum efficiency occurs when iron losses = copper losses. Since copper losses vary with load squared: x² × 1500 = 500, so x = √(500/1500) = √0.333 = 0.577 ≈ 0.58',
  },
  {
    id: 4,
    question: 'Why does motor efficiency typically decrease at part-load operation?',
    options: [
      'Fixed losses become a larger proportion of reduced output',
      'Copper losses increase sharply as load is reduced',
      'The power factor improves and draws more current',
      'The supply voltage rises when the motor is unloaded',
    ],
    correctAnswer: 0,
    explanation:
      'Fixed losses (iron losses, friction, windage) remain constant regardless of load. At reduced load, these fixed losses represent a larger percentage of the smaller output power.',
  },
  {
    id: 5,
    question: "What percentage of a motor's life cycle cost is typically energy consumption?",
    options: [
      '45-55%',
      '90-97%',
      '25-35%',
      '65-75%',
    ],
    correctAnswer: 1,
    explanation:
      "Energy costs typically represent 90-97% of a motor's total life cycle cost. Initial purchase is only 2-5%, making efficiency a crucial selection criterion.",
  },
  {
    id: 6,
    question:
      'A building has three systems with efficiencies of 95%, 90%, and 85%. What is the overall system efficiency?',
    options: [
      '85%',
      '90%',
      '72.7%',
      '270%',
    ],
    correctAnswer: 2,
    explanation:
      "For systems in series, overall efficiency = η1 × η2 × η3 = 0.95 × 0.90 × 0.85 = 0.727 = 72.7%. Efficiencies multiply, they don't add.",
  },
  {
    id: 7,
    question: 'When conducting an energy audit, what is the typical first step?',
    options: [
      'Install sub-metering on every final circuit',
      'Carry out thermal imaging surveys of switchgear',
      'Specify replacement motors and drives',
      'Collect utility bills and establish baseline consumption',
    ],
    correctAnswer: 3,
    explanation:
      'The first step is establishing baseline energy consumption from utility bills (12+ months ideally). This provides the reference against which improvements are measured.',
  },
  {
    id: 8,
    question:
      'A 100kVA transformer operates at 80% of full load with 0.85 power factor. Iron losses are 800W and full-load copper losses are 1800W. What is the efficiency?',
    options: [
      '97.1%',
      '97.8%',
      '96.2%',
      '98.3%',
    ],
    correctAnswer: 0,
    explanation:
      'Output power = 100 × 0.8 × 0.85 = 68kW. Copper losses at 0.8 load = 1800 × 0.8² = 1152W. Total losses = 800 + 1152 = 1952W. Input = 68000 + 1952 = 69952W. η = 68000/69952 × 100 = 97.2%',
  },
  {
    id: 9,
    question: 'What is the Net Present Value (NPV) criterion for a worthwhile investment?',
    options: [
      'NPV = 0',
      'NPV > 0',
      'NPV < 0',
      'NPV = initial cost',
    ],
    correctAnswer: 1,
    explanation:
      'A positive NPV indicates the investment generates returns exceeding the discount rate. NPV > 0 means the project adds value and should be considered worthwhile.',
  },
  {
    id: 10,
    question:
      'HVAC systems in commercial buildings typically consume what percentage of total electrical energy?',
    options: [
      '20-30%',
      '80-90%',
      '40-50%',
      '60-70%',
    ],
    correctAnswer: 2,
    explanation:
      'HVAC systems typically consume 40-50% of commercial building electrical energy. This makes them primary targets for efficiency improvements and energy audits.',
  },
];

const faqs = [
  {
    question: 'Why are motor efficiency classes important in building services?',
    answer:
      'Motors consume approximately 45% of all electrical energy in the EU. In building services (pumps, fans, compressors), motors often run continuously. Even a 2-3% efficiency improvement translates to significant lifetime savings. EU regulations now mandate IE3/IE4 for new installations, making class selection a compliance and economic issue.',
  },
  {
    question: 'What is the difference between efficiency and coefficient of performance (COP)?',
    answer:
      'Efficiency compares output to input of the same energy type (electrical out/electrical in). COP is used for heat pumps where the output (heating or cooling) is thermal energy but input is electrical. COP can exceed 1.0 (often 3-5) because heat pumps move heat rather than generate it. A COP of 4 means 4kW heat delivered per 1kW electrical input.',
  },
  {
    question: 'How do I calculate energy savings from upgrading to a higher efficiency motor?',
    answer:
      'Annual savings = Power × Hours × (1/η_old - 1/η_new) × electricity cost. For example, upgrading a 15kW motor from 89% to 93% efficiency running 6000 hours/year at 15p/kWh: Savings = 15 × 6000 × (1/0.89 - 1/0.93) × 0.15 = GBP 645/year.',
  },
  {
    question: 'What factors should I consider when selecting equipment based on efficiency?',
    answer:
      'Consider: 1) Actual operating load profile (not just full-load efficiency), 2) Running hours per year, 3) Electricity tariff and projected increases, 4) Capital cost premium, 5) Simple payback period and NPV, 6) Regulatory requirements (minimum IE class), 7) Building certification needs (BREEAM, etc.), 8) Maintenance costs and reliability.',
  },
  {
    question: 'Why does transformer efficiency matter for all-day efficiency calculations?',
    answer:
      'Transformers often serve loads that vary significantly throughout the day (offices, retail). Maximum efficiency occurs at a specific load point (where iron losses equal copper losses). A transformer sized for peak load may operate inefficiently during off-peak periods. All-day efficiency captures this reality better than rated efficiency.',
  },
  {
    question: 'What are the main components of an energy audit?',
    answer:
      'A comprehensive energy audit includes: 1) Baseline establishment from utility data, 2) Site survey and equipment inventory, 3) Load profiling and sub-metering analysis, 4) Identification of energy conservation measures (ECMs), 5) Cost-benefit analysis of each measure, 6) Prioritised action plan with payback periods, 7) Implementation recommendations, 8) Monitoring and verification procedures.',
  },
];

const HNCModule3Section6_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6 · Subsection 2"
            title="Efficiency calculations for equipment and systems"
            description="Quantifying equipment performance and making economically sound decisions for building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You compute system efficiency as the product of stage efficiencies &mdash; motor &times; gearbox &times; pump cascades down quickly, rewarding upstream IE class selection.',
              'You apply IE3 minimum (2021), IE4 minimum 75&ndash;200 kW (2023) under Ecodesign Reg 2019/1781 retained as UK law.',
              'You evaluate part-load efficiency curves, not just nameplate &mdash; transformer peaks at 40&ndash;60 % rated kVA, motor peaks at 75&ndash;100 % rated power.',
              'You produce life-cycle cost analysis (LCCA) on every motor, transformer and VSD specification &mdash; energy is typically 90&ndash;97 % of motor lifetime cost.',
            ]}
          />

          <RegsCallout
            source="Building Regulations 2010 — Approved Document L (2021): Conservation of fuel and power"
            clause="Reasonable provision shall be made for the conservation of fuel and power in or in connection with buildings by limiting heat gains and losses, by providing fixed building services that are energy-efficient, have effective controls, and are commissioned by testing and adjustment to use no more fuel and power than is reasonable."
            meaning={
              <>
                Approved Document L 2021 &mdash; both Volume 1 (dwellings) and Volume 2
                (other buildings) &mdash; requires fixed building services to be
                energy-efficient. The IE-class motor and transformer-efficiency arithmetic
                in this section is the engineering evidence that satisfies the regulation.
                Building Control inspectors will check the motor schedule and transformer
                spec against Ecodesign minimum, and may request supporting calculations
                on commercial submissions.
              </>
            }
            cite="Source: Building Regulations 2010 + Approved Document L (2021); Commission Regulation (EU) 2019/1781 (retained UK law); CIBSE Guide F &mdash; Energy efficiency in buildings; CIBSE TM39 &mdash; Building energy metering"
          />

          <SectionRule />

          <ConceptBlock title="In 30 seconds">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Basic formula:</strong> η = Pout/Pin × 100%</li>
              <li><strong>Motor classes:</strong> IE1 to IE5 (Standard to Ultra Premium)</li>
              <li><strong>System efficiency:</strong> Individual efficiencies multiply</li>
              <li><strong>Life cycle costs:</strong> Energy is 90-97% of motor costs</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>HVAC motors:</strong> Fans, pumps, compressors</li>
              <li><strong>Transformers:</strong> Distribution efficiency matters</li>
              <li><strong>Part-load:</strong> Real-world operation rarely at full load</li>
              <li><strong>Energy audits:</strong> Identify improvement opportunities</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Fundamental Efficiency Concepts">
            <p>
              Efficiency is the ratio of useful output to total input, expressed as a percentage. No
              real machine can be 100% efficient due to unavoidable losses such as friction, heat
              dissipation, and electrical resistance.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                The Efficiency Equation
              </p>
              <p><strong>
                η = P<sub>out</sub> / P<sub>in</sub> × 100%
              </strong></p>
              <p>
                Where η (eta) = efficiency, Pout = useful output power, Pin = total input power
              </p>

              <p className="text-sm font-medium text-white">Alternative expressions:</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>η = (Pin - Losses) / Pin × 100%</strong> — when losses are known
                </li>
                <li>
                  <strong>η = Pout / (Pout + Losses) × 100%</strong> — when output and losses are
                  known
                </li>
                <li>
                  <strong>Losses = Pin × (1 - η)</strong> — calculating power dissipated
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Types of Losses in Electrical Equipment
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Copper losses (I²R)</strong> — Winding resistance — Varies with load squared</li>
              <li><strong>Iron losses (core)</strong> — Hysteresis and eddy currents — Approximately constant</li>
              <li><strong>Friction and windage</strong> — Bearings, air resistance — Approximately constant</li>
              <li><strong>Stray load losses</strong> — Leakage flux, harmonics — Varies with load</li>
            </ul>

            <p>
              <strong>Key insight:</strong> Fixed losses (iron, friction, windage) remain constant
              regardless of load. This is why efficiency drops significantly at light loads.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <ConceptBlock title="Motor Efficiency Classes (IE1-IE5)">
            <p>
              The International Electrotechnical Commission (IEC) defines motor efficiency classes
              under IEC 60034-30-1. These are legally mandated minimum requirements under EU
              Ecodesign regulations.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Motor Efficiency Classes
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>IE1</strong> — Standard — 88.4% — No longer permitted for new installations</li>
              <li><strong>IE2</strong> — High — 89.8% — Previous minimum standard</li>
              <li><strong>IE3</strong> — Premium — 91.4% — Current minimum (0.75-1000kW)</li>
              <li><strong>IE4</strong> — Super Premium — 92.6% — Required for 75-200kW (Jul 2023)</li>
              <li><strong>IE5</strong> — Ultra Premium — ~94% — ~20% lower losses than IE4</li>
            </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  EU Ecodesign Requirements (2021+)
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    Three-phase motors 0.75-1000kW: minimum <strong>IE3</strong>
                  </li>
                  <li>
                    Motors 75-200kW (Jul 2023): minimum <strong>IE4</strong>
                  </li>
                  <li>Single-phase motors 0.12kW+: included from Jul 2023</li>
                  <li>VSD-fed motors also covered</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Exemptions</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Motors for hazardous atmospheres (ATEX)</li>
                  <li>Brake motors (until further notice)</li>
                  <li>Motors immersed in liquids</li>
                  <li>Motors at altitudes above 4000m</li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Efficiency Improvement Example
              </p>
              <p>
                An 11kW motor runs 6000 hours/year. Upgrading from IE2 (89.8%) to IE4 (92.6%):
              </p>

                <p>IE2 input power = 11 / 0.898 = 12.25 kW</p>
                <p>IE4 input power = 11 / 0.926 = 11.88 kW</p>
                <p>Power saving = 12.25 - 11.88 = 0.37 kW</p>
                <p>
                  Annual energy saving = 0.37 × 6000 = <strong>2,220 kWh</strong>
                </p>
                <p>
                  At 15p/kWh = <strong>GBP 333/year</strong>
                </p>

            

            <p>
              <strong>Remember:</strong> Efficiency improvements compound over the motor's 15-20
              year lifespan. Small percentage gains translate to thousands of pounds in savings.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="Transformer Efficiency and All-Day Efficiency">
            <p>
              Transformers in building services typically operate at high efficiency (95-99%), but
              their continuous operation means even small losses represent significant energy
              consumption. Understanding all-day efficiency is crucial for proper sizing.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Transformer Efficiency Formula
              </p>
              <p><strong>
                η = (V<sub>2</sub>I<sub>2</sub>cosφ) / (V<sub>2</sub>I<sub>2</sub>cosφ + P
                <sub>i</sub> + P<sub>c</sub>) × 100%
              </strong></p>
              <p>
                Where Pi = iron losses (constant), Pc = copper losses at actual load
              </p>

              <p className="text-sm font-medium text-white">
                Key transformer loss characteristics:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Iron losses (Pi):</strong> Constant whenever transformer is energised
                  (no-load losses)
                </li>
                <li>
                  <strong>Copper losses (Pc):</strong> Vary with load squared: Pc = Pc(FL) ×
                  (I/IFL)²
                </li>
                <li>
                  <strong>Maximum efficiency:</strong> Occurs when Pi = Pc (iron losses = copper
                  losses)
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Maximum Efficiency Load Point
              </p>
              <p><strong>
                x = √(P<sub>i</sub> / P<sub>c(FL)</sub>)
              </strong></p>
              <p>
                Where x = fraction of full load at maximum efficiency
              </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                All-Day Efficiency (Energy Efficiency)
              </p>
              <p>
                All-day efficiency accounts for the varying load profile over a 24-hour period,
                providing a more realistic measure for transformers that serve variable loads.
              </p>

                <p><strong>
                  η<sub>all-day</sub> = (Energy output over 24h) / (Energy input over 24h) × 100%
                </strong></p>
                <p>
                  Or: η = ΣW<sub>out</sub> / (ΣW<sub>out</sub> + 24×P<sub>i</sub> + ΣP<sub>c</sub>
                  ×t)
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Typical Building Load Profile (Office)
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>00:00-07:00</strong> — 7h — 10-20% — Security, emergency lighting, IT cooling</li>
              <li><strong>07:00-09:00</strong> — 2h — 50-70% — Building warm-up, early arrivals</li>
              <li><strong>09:00-17:00</strong> — 8h — 80-100% — Full occupation, peak HVAC</li>
              <li><strong>17:00-20:00</strong> — 3h — 40-60% — Reduced occupation, cleaning</li>
              <li><strong>20:00-00:00</strong> — 4h — 15-25% — Security, minimal HVAC</li>
            </ul>

            <p>
              <strong>Sizing tip:</strong> Design transformers for maximum efficiency at the most
              common operating load, not necessarily at full rated capacity.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="Part-Load Efficiency Considerations">
            <p>
              Most building services equipment operates at part-load for the majority of its running
              time. Understanding how efficiency varies with load is essential for accurate energy
              calculations and proper equipment selection.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Why Part-Load Efficiency Matters
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  HVAC systems sized for peak loads that occur 1-2% of the time
                </li>
                <li>
                  Motors driving variable loads (fans, pumps) spend most time at 50-75% load
                </li>
                <li>
                  Fixed losses become proportionally larger as output decreases
                </li>
                <li>
                  Oversized equipment operates inefficiently at typical loads
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Typical Motor Efficiency vs Load
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>100%</strong> — 91.4% — Baseline — Rated efficiency</li>
              <li><strong>75%</strong> — 91.8% — -4% — Often peak efficiency point</li>
              <li><strong>50%</strong> — 90.2% — +14% — Still acceptable</li>
              <li><strong>25%</strong> — 84.5% — +80% — Significant efficiency drop</li>
              <li><strong>10%</strong> — ~70% — +250% — Very poor - consider resizing</li>
            </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Solutions for Part-Load Efficiency
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Variable speed drives:</strong> Match motor speed to load
                  </li>
                  <li>
                    <strong>Right-sizing:</strong> Select equipment for typical, not peak load
                  </li>
                  <li>
                    <strong>Multiple units:</strong> Stage smaller units to match load
                  </li>
                  <li>
                    <strong>High-efficiency motors:</strong> Flatter efficiency curves
                  </li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  VSD Energy Savings (Fan/Pump)
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Power varies with speed cubed (affinity laws)</li>
                  <li>50% speed = 12.5% power consumption</li>
                  <li>Typical savings: 30-50% on variable loads</li>
                  <li>Payback often under 2 years</li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Affinity Laws for Fans and Pumps
              </p>

                
                  <p className="font-bold text-elec-yellow mb-1">Q ∝ N</p>
                  <p className="text-white text-xs">Flow proportional to speed</p>

                
                  <p className="font-bold text-elec-yellow mb-1">H ∝ N²</p>
                  <p className="text-white text-xs">Head proportional to speed squared</p>

                
                  <p className="font-bold text-elec-yellow mb-1">P ∝ N³</p>
                  <p className="text-white text-xs">Power proportional to speed cubed</p>

              

            <p>
              <strong>Design principle:</strong> Always consider the operating load profile, not
              just the nameplate rating. A motor that spends 90% of its time at 40% load may be the
              wrong choice.
            </p>
          </ConceptBlock>

          <ConceptBlock title="System Efficiency Calculations">
            <p>
              Building services systems comprise multiple components in series. The overall system
              efficiency is the product of individual component efficiencies, not the sum. This
              cascade effect means even small improvements in individual components can
              significantly impact overall system performance.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                System Efficiency Formula
              </p>
              <p><strong>
                η<sub>system</sub> = η<sub>1</sub> × η<sub>2</sub> × η<sub>3</sub> × ... × η
                <sub>n</sub>
              </strong></p>
              <p>
                Individual efficiencies multiply - they do not add
              </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Example: Chilled Water System
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Transformer</strong> — 97% — 97.0%</li>
              <li><strong>Variable speed drive</strong> — 97% — 94.1%</li>
              <li><strong>Motor (IE3)</strong> — 93% — 87.5%</li>
              <li><strong>Belt drive</strong> — 95% — 83.1%</li>
              <li><strong>Pump</strong> — 80% — 66.5%</li>
            </ul>
              <p className="text-xs text-white mt-2">
                Overall system efficiency: 0.97 × 0.97 × 0.93 × 0.95 × 0.80 = 66.5% - nearly
                one-third of input energy is lost.
              </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Impact of Improving Individual Components
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Baseline</strong> — - — 66.5% — -</li>
              <li><strong>IE4 motor (96%)</strong> — 96% — 68.7% — +3.3%</li>
              <li><strong>Direct drive (no belt)</strong> — 100% — 70.0% — +5.3%</li>
              <li><strong>Better pump (85%)</strong> — 85% — 70.6% — +6.2%</li>
              <li><strong>All improvements</strong> — - — 76.7% — +15.3%</li>
            </ul>

            <p>
              <strong>Key insight:</strong> Target improvements at the least efficient components
              first - a 5% improvement in an 80% efficient pump saves more energy than a 5%
              improvement in a 97% efficient transformer.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Life Cycle Cost Analysis">
            <p>
              Life cycle cost (LCC) analysis considers all costs from acquisition through operation
              and disposal. For electrical equipment, energy costs typically dominate, making
              efficiency a crucial economic factor.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Life Cycle Cost Formula
              </p>
              <p><strong>
                LCC = C<sub>ic</sub> + C<sub>in</sub> + C<sub>e</sub> + C<sub>o</sub> + C
                <sub>m</sub> + C<sub>s</sub> + C<sub>env</sub> - C<sub>d</sub>
              </strong></p>

                <span>Cic = Initial cost</span>
                <span>Cin = Installation cost</span>
                <span>Ce = Energy cost</span>
                <span>Co = Operating cost</span>
                <span>Cm = Maintenance cost</span>
                <span>Cs = Downtime cost</span>
                <span>Cenv = Environmental cost</span>
                <span>Cd = Disposal/residual value</span>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Typical Motor Life Cycle Cost Breakdown
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Energy consumption</strong> — 90-97% — Dominates total cost</li>
              <li><strong>Purchase price</strong> — 2-5% — One-time cost</li>
              <li><strong>Installation</strong> — 0.5-2% — Often included in purchase</li>
              <li><strong>Maintenance</strong> — 1-3% — Bearings, lubrication</li>
            </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Simple Payback Period
                </p>

                  <p><strong>Payback = ΔCost / Annual Savings</strong></p>
                  <p>
                    Years to recover extra investment
                  </p>

                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Easy to calculate and understand</li>
                  <li>Does not consider time value of money</li>
                  <li>Typical target: 2-5 years for motors</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Net Present Value (NPV)
                </p>

                  <p><strong>
                    NPV = Σ (C<sub>t</sub> / (1+r)<sup>t</sup>) - C<sub>0</sub>
                  </strong></p>
                  <p>
                    Discounted cash flow over equipment life
                  </p>

                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Accounts for time value of money</li>
                  <li>NPV &gt; 0 indicates worthwhile investment</li>
                  <li>Use discount rate (r) typically 5-10%</li>
                </ul>

            

              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                LCC Example: Motor Selection
              </h3>
              <p>
                15kW motor, 6000 hours/year, 15 year life, electricity at 15p/kWh:
              </p>

                <p className="font-bold">Standard motor (IE2, 89.8%):</p>
                <p>Purchase: GBP 850</p>
                <p>
                  Annual energy: 15 ÷ 0.898 × 6000 × 0.15 = <strong>GBP 15,034</strong>
                </p>
                <p>15-year energy: GBP 225,501</p>
                <p className="text-white">LCC ≈ GBP 226,350</p>
                <p className="mt-3 font-bold">Premium motor (IE4, 92.6%):</p>
                <p>Purchase: GBP 1,250 (+GBP 400)</p>
                <p>
                  Annual energy: 15 ÷ 0.926 × 6000 × 0.15 = <strong>GBP 14,579</strong>
                </p>
                <p>15-year energy: GBP 218,685</p>
                <p className="text-white">LCC ≈ GBP 219,935</p>
                <p className="mt-3 text-green-400 font-bold">Savings: GBP 6,415 over 15 years</p>
                <p className="text-green-400">
                  Simple payback: GBP 400 ÷ GBP 455/year = 0.88 years
                </p>

            

            <p>
              <strong>Decision rule:</strong> When energy costs dominate LCC, always choose the
              highest efficiency option that meets technical requirements - the payback is almost
              always favourable.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <ConceptBlock title="Energy Auditing Techniques">
            <p>
              Energy audits systematically assess energy use within a building to identify
              opportunities for improvement. They range from simple walk-through surveys to detailed
              instrumented analyses.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Types of Energy Audits (CIBSE TM22)
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Level 1</strong> — Walk-through survey — 1-2 days — Quick wins identification</li>
              <li><strong>Level 2</strong> — Standard audit — 1-2 weeks — Energy balance, ECM costings</li>
              <li><strong>Level 3</strong> — Investment-grade audit — Several weeks — Detailed analysis, bankable savings</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">Energy Audit Process</p>

                
                  <span className="text-elec-yellow font-bold">1</span>

                    <p className="font-medium">Baseline Establishment</p>
                    <p className="text-white text-sm">
                      Collect 12+ months utility bills, establish kWh/m²/year benchmark
                    </p>

                

                  <span className="text-elec-yellow font-bold">2</span>

                    <p className="font-medium">Site Survey</p>
                    <p className="text-white text-sm">
                      Equipment inventory, operating schedules, nameplate data collection
                    </p>

                

                  <span className="text-elec-yellow font-bold">3</span>

                    <p className="font-medium">Load Profiling</p>
                    <p className="text-white text-sm">
                      Sub-metering, power logging, identify peak demand periods
                    </p>

                

                  <span className="text-elec-yellow font-bold">4</span>

                    <p className="font-medium">Energy Balance</p>
                    <p className="text-white text-sm">
                      Account for all energy use, identify major consumers (should balance to ±5%)
                    </p>

                

                  <span className="text-elec-yellow font-bold">5</span>

                    <p className="font-medium">ECM Identification</p>
                    <p className="text-white text-sm">
                      List all Energy Conservation Measures with costs and savings
                    </p>

                

                  <span className="text-elec-yellow font-bold">6</span>

                    <p className="font-medium">Prioritisation</p>
                    <p className="text-white text-sm">
                      Rank by payback, NPV, or marginal abatement cost
                    </p>

                

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Key Audit Instrumentation
              </p>

                
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>
                      <strong>Power analyser:</strong> kW, kVA, PF, harmonics
                    </li>
                    <li>
                      <strong>Data logger:</strong> Long-term monitoring
                    </li>
                    <li>
                      <strong>Clamp meter:</strong> Current measurements
                    </li>
                    <li>
                      <strong>Thermal camera:</strong> Heat loss, hot spots
                    </li>
                  </ul>

                
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>
                      <strong>Lux meter:</strong> Lighting levels
                    </li>
                    <li>
                      <strong>Ultrasonic detector:</strong> Compressed air leaks
                    </li>
                    <li>
                      <strong>Flow meter:</strong> Water/air flow rates
                    </li>
                    <li>
                      <strong>Temperature logger:</strong> HVAC performance
                    </li>
                  </ul>

              

              <p className="text-sm font-medium text-elec-yellow/80">
                Typical Building Energy Breakdown
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>HVAC</strong> — 40-50 — 35-45 — 45-55</li>
              <li><strong>Lighting</strong> — 20-30 — 25-35 — 15-20</li>
              <li><strong>Equipment/IT</strong> — 15-25 — 10-15 — 20-30</li>
              <li><strong>Other</strong> — 10-15 — 15-20 — 10-15</li>
            </ul>

            <p>
              <strong>Audit tip:</strong> The biggest savings are often in operational changes
              (schedules, setpoints, maintenance) rather than capital investment. Check controls and
              operation first.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Building Services: Equipment Selection and Payback Calculations">
            <p>
              Selecting efficient equipment for building services requires balancing capital cost
              against operating cost savings. The right choice depends on running hours, energy
              prices, and available capital.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Equipment Selection Decision Framework
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Running hours</strong> — &gt;4000 hours/year — &lt;2000 hours/year</li>
              <li><strong>Load profile</strong> — Continuous, near full load — Intermittent, variable</li>
              <li><strong>Energy cost</strong> — High/rising tariffs — Low/stable tariffs</li>
              <li><strong>Equipment life</strong> — &gt;10 years expected — Short-term installation</li>
              <li><strong>Building certification</strong> — BREEAM/LEED targets — No certification needed</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Common Energy Conservation Measures (ECMs)
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>LED lighting retrofit</strong> — 50-70% — 2-4 years</li>
              <li><strong>VSD on AHU fans</strong> — 30-50% — 1-3 years</li>
              <li><strong>VSD on pumps</strong> — 25-40% — 1-3 years</li>
              <li><strong>IE3/IE4 motor upgrade</strong> — 3-5% — 1-2 years</li>
              <li><strong>Optimised BMS controls</strong> — 10-20% — &lt;1 year</li>
              <li><strong>Power factor correction</strong> — kVA reduction — 1-3 years</li>
              <li><strong>Compressed air leak repair</strong> — 20-30% — &lt;1 year</li>
            </ul>

              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Payback Calculation Example: LED Retrofit
              </h3>
              <p>
                Office building lighting: 500 × 58W fluorescent fittings, 3000 hours/year
              </p>

                <p className="font-bold">Existing system:</p>
                <p>Load = 500 × 58W × 1.15 (ballast) = 33.35 kW</p>
                <p>Annual energy = 33.35 × 3000 = 100,050 kWh</p>
                <p>
                  Annual cost @ 15p/kWh = <strong>GBP 15,008</strong>
                </p>
                <p className="mt-3 font-bold">LED replacement (25W panels):</p>
                <p>Load = 500 × 25W = 12.5 kW</p>
                <p>Annual energy = 12.5 × 3000 = 37,500 kWh</p>
                <p>
                  Annual cost @ 15p/kWh = <strong>GBP 5,625</strong>
                </p>
                <p className="mt-3 text-green-400 font-bold">Annual saving: GBP 9,383</p>
                <p>Installation cost: 500 × GBP 65 = GBP 32,500</p>
                <p className="text-green-400 font-bold">
                  Simple payback = GBP 32,500 ÷ GBP 9,383 = 3.5 years
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                BREEAM/LEED Energy Credits
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>BREEAM Ene01:</strong> Up to 15 credits for exceeding Part L by 40%+
                </li>
                <li>
                  <strong>Sub-metering (Ene02):</strong> Requires major energy-consuming systems to
                  be metered
                </li>
                <li>
                  <strong>LEED EA Prerequisite:</strong> Minimum energy performance required
                </li>
                <li>
                  <strong>LEED EA Credits:</strong> Points for 6-50% improvement over baseline
                </li>
              </ul>

            <p>
              <strong>Specification tip:</strong> When specifying equipment, include energy
              performance requirements in tender documents. Request efficiency data at 50%, 75%, and
              100% load, not just rated efficiency.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
                Example 1: Motor Efficiency Calculation
              </p>
              <p>
                <strong>Question:</strong> A motor draws 18.5kW from the supply and has mechanical
                losses of 1.2kW and electrical losses of 0.8kW. Calculate its efficiency.
              </p>

                <p>Total losses = 1.2 + 0.8 = 2.0 kW</p>
                <p>Output power = 18.5 - 2.0 = 16.5 kW</p>
                <p>Efficiency η = Pout / Pin × 100%</p>
                <p>
                  η = 16.5 / 18.5 × 100% = <strong>89.2%</strong>
                </p>
                <p>
                  Alternative: η = (Pin - Losses) / Pin = (18.5 - 2.0) / 18.5 = 89.2%
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 2: Transformer All-Day Efficiency
              </p>
              <p>
                <strong>Question:</strong> A 500kVA transformer has iron losses of 2kW and full-load
                copper losses of 8kW. It operates at full load for 6 hours, half load for 10 hours,
                and 10% load for 8 hours daily. Calculate the all-day efficiency at 0.8 power
                factor.
              </p>

                <p className="font-bold">Energy output:</p>
                <p>Full load: 500 × 0.8 × 6 = 2400 kWh</p>
                <p>Half load: 500 × 0.5 × 0.8 × 10 = 2000 kWh</p>
                <p>10% load: 500 × 0.1 × 0.8 × 8 = 320 kWh</p>
                <p>Total output = 4720 kWh</p>
                <p className="mt-2 font-bold">Energy losses:</p>
                <p>Iron losses = 2 kW × 24h = 48 kWh (constant)</p>
                <p>Copper losses:</p>
                <p className="pl-4">Full load: 8 × 1² × 6 = 48 kWh</p>
                <p className="pl-4">Half load: 8 × 0.5² × 10 = 20 kWh</p>
                <p className="pl-4">10% load: 8 × 0.1² × 8 = 0.64 kWh</p>
                <p>Total copper losses = 68.64 kWh</p>
                <p className="mt-2 font-bold">All-day efficiency:</p>
                <p>η = 4720 / (4720 + 48 + 68.64) × 100%</p>
                <p>
                  η = 4720 / 4836.64 = <strong>97.6%</strong>
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 3: System Efficiency and Energy Cost
              </p>
              <p>
                <strong>Question:</strong> A pumping system requires 45kW at the pump shaft. The
                system comprises: VSD (96%), motor (91%), coupling (98%), pump (75%). Calculate
                annual energy cost at 14p/kWh for 5000 hours operation.
              </p>

                <p className="font-bold">System efficiency:</p>
                <p>η_system = 0.96 × 0.91 × 0.98 × 0.75 = 0.642 = 64.2%</p>
                <p className="mt-2 font-bold">Electrical input power:</p>
                <p>Pin = Pshaft / η_system = 45 / 0.642 = 70.1 kW</p>
                <p className="mt-2 font-bold">Annual energy consumption:</p>
                <p>E = 70.1 × 5000 = 350,500 kWh</p>
                <p className="mt-2 font-bold">Annual cost:</p>
                <p>
                  Cost = 350,500 × 0.14 = <strong>GBP 49,070</strong>
                </p>
                <p>
                  Losses = 70.1 - 45 = 25.1 kW (GBP 17,570/year wasted)
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 4: NPV Analysis for VSD Investment
              </p>
              <p>
                <strong>Question:</strong> A VSD costs GBP 8,000 installed and saves GBP 2,500/year
                in energy. Equipment life is 10 years. Calculate NPV at 8% discount rate.
              </p>

                <p className="font-bold">Using present value of annuity factor:</p>
                <p>PVA factor (10 years, 8%) = (1 - (1.08)^-10) / 0.08 = 6.710</p>
                <p>PV of savings = GBP 2,500 × 6.710 = GBP 16,775</p>
                <p className="mt-2 font-bold">NPV calculation:</p>
                <p>NPV = PV of savings - Initial cost</p>
                <p>
                  NPV = GBP 16,775 - GBP 8,000 = <strong>GBP 8,775</strong>
                </p>
                <p className="mt-2 text-green-400">
                  NPV &gt; 0, therefore investment is worthwhile
                </p>
                <p className="text-white mt-2">Simple payback = 8000 / 2500 = 3.2 years</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>η = Pout / Pin × 100%</strong> — Basic efficiency
                </li>
                <li>
                  <strong>η_system = η1 × η2 × ... × ηn</strong> — System efficiency
                </li>
                <li>
                  <strong>Copper losses ∝ I²</strong> — Load-dependent losses
                </li>
                <li>
                  <strong>x = √(Pi/Pc)</strong> — Maximum efficiency load point
                </li>
                <li>
                  <strong>Payback = ΔCost / Annual savings</strong> — Simple payback
                </li>
                <li>
                  <strong>NPV = Σ(Ct/(1+r)^t) - C0</strong> — Net present value
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Key Values to Remember
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  Motor energy: <strong>90-97%</strong> of life cycle cost
                </li>
                <li>
                  IE3 minimum for new motors: <strong>0.75-1000kW</strong>
                </li>
                <li>
                  VSD saves <strong>30-50%</strong> on variable flow applications
                </li>
                <li>
                  HVAC: <strong>40-50%</strong> of commercial building energy
                </li>
                <li>
                  Target payback: typically <strong>2-5 years</strong>
                </li>
              </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Adding efficiencies</strong> — System efficiencies multiply, not add
                </li>
                <li>
                  <strong>Using rated efficiency only</strong> — Consider part-load performance
                </li>
                <li>
                  <strong>Ignoring running hours</strong> — High-hour equipment deserves high
                  efficiency
                </li>
                <li>
                  <strong>Oversizing</strong> — Results in poor part-load efficiency
                </li>
                <li>
                  <strong>Ignoring power factor</strong> — Affects real power in transformer
                  calculations
                </li>
              </ul>
              </>
            }
            doInstead="Apply the formulas with care, verify with measured values where possible, and always cross-check against BS 7671 and equipment manufacturer data."
          />

          <SectionRule />

          <ConceptBlock title="Quick Reference">
            <p className="text-sm font-medium text-elec-yellow/80">Efficiency Fundamentals</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>η = Pout/Pin × 100% (always &lt;100%)</li>
                  <li>Losses = Pin - Pout = Pin × (1 - η)</li>
                  <li>System η = product of individual η</li>
                  <li>Max transformer η when Pi = Pc</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Motor Efficiency Classes</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>IE1 Standard (no longer permitted)</li>
                  <li>IE2 High (previous minimum)</li>
                  <li>IE3 Premium (current minimum)</li>
                  <li>IE4 Super Premium (75-200kW)</li>
                  <li>IE5 Ultra Premium (best available)</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Economic Analysis</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Simple payback = Extra cost / Annual saving</li>
                  <li>NPV &gt; 0 = worthwhile investment</li>
                  <li>Energy = 90-97% of motor LCC</li>
                  <li>Target payback: 2-5 years</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Energy Audit Steps</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>1. Baseline from utility data</li>
                  <li>2. Site survey and inventory</li>
                  <li>3. Load profiling and metering</li>
                  <li>4. Energy balance (±5%)</li>
                  <li>5. ECM identification and costing</li>
                </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Pump system efficiency audit &mdash; identifying the worst stage"
            situation={
              <>
                A primary chilled-water circulation pump has the following nameplate
                data: 30 kW IE3 motor (94 % at full load), direct-coupled centrifugal
                pump (BEP efficiency 76 %, but operating at 65 % of BEP flow with system
                efficiency only 58 %). VSD-controlled (97 %). Total electrical input
                measured at 42 kW. Hydraulic output measured at 19.5 kW.
              </>
            }
            whatToDo={
              <>
                Compute system efficiency: 19.5 / 42 = 46 % overall. Cascade analysis:
                VSD 0.97 &times; motor 0.94 &times; pump 0.58 = 0.529 &mdash; close to
                the measured 0.46 (with cabling and operating tolerance). The pump is
                the limiting stage at 58 %, dragging the whole system down. Investigation:
                pump is oversized for actual demand &mdash; impeller trim or pump
                replacement to BEP-aligned curve recovers ~15&ndash;20 % efficiency
                points. Specify a hydraulic re-balance and trim assessment;
                consider pump downsize at next planned outage. Document the
                cascade in the building log book.
              </>
            }
            whyItMatters={
              <>
                Cascade efficiency analysis pinpoints which stage to fix first &mdash;
                upgrading the IE3 motor to IE4 here would only recover ~1 efficiency
                point, while right-sizing the pump recovers 15&ndash;20. The HNC
                engineer&rsquo;s analytical instinct to look at the system not just
                the component is what unlocks the largest savings.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Efficiency &eta; = P&#x2092;&#x1d64;&#x209c; / P&#x1d62;&#x2099; &times; 100 % &mdash; report at the operating point, not just at nameplate full load.',
              'System efficiency = product of stage efficiencies &mdash; cascade compounds quickly so weak stages dominate.',
              'Motor IE classes: IE1 standard, IE2 high, IE3 premium, IE4 super-premium, IE5 ultra (PMSM only) &mdash; UK minimum IE3.',
              'Transformer efficiency curve peaks at 40&ndash;60 % rated kVA &mdash; oversizing increases iron loss continuously.',
              'Part-load efficiency is the operating reality &mdash; nameplate full-load values flatter equipment that runs lightly loaded.',
              'Life-cycle cost analysis: capital + lifetime energy + maintenance + disposal &mdash; energy is 90&ndash;97 % of motor LCC.',
              'Building Regs Approved Document L 2021 expects energy-efficient fixed services &mdash; the IE-class arithmetic is the evidence.',
              'CIBSE TM39 covers building energy metering strategy &mdash; tie efficiency claims to measured kWh, not vendor curves.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section6-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Electrical losses (I²R, eddy current, hysteresis)
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section6-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Load management and demand reduction
              </div>
            </button>
          </div>

        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section6_2;
