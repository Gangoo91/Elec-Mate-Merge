/**
 * Module 6 · Section 5 · Subsection 5 — Building Performance
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Display Energy Certificates, operational ratings, performance gaps, benchmarking, and strategies for improving building energy performance
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Building Performance - HNC Module 6 Section 5.5';
const DESCRIPTION =
  'Master building performance assessment: Display Energy Certificates, operational ratings, asset ratings, performance gaps, CIBSE TM54 methodology, benchmarking, and strategies for improving operational energy efficiency.';

const quickCheckQuestions = [
  {
    id: 'dec-requirement',
    question: 'Which buildings are required to display a DEC in England and Wales?',
    options: [
      'All commercial buildings',
      'Public buildings over 250m² with public access',
      'Any building with air conditioning',
      'All buildings over 1000m²',
    ],
    correctIndex: 1,
    explanation:
      'Display Energy Certificates are mandatory for public buildings over 250m² that are frequently visited by the public. This includes schools, hospitals, council offices, and leisure centres.',
  },
  {
    id: 'operational-rating',
    question: 'What does an operational rating measure?',
    options: [
      'Theoretical energy efficiency of the building fabric',
      'Actual metered energy consumption in use',
      'Maximum permissible energy consumption',
      'Energy consumption during commissioning',
    ],
    correctIndex: 1,
    explanation:
      'An operational rating is based on actual metered energy consumption data, reflecting how the building performs in real-world conditions with actual occupants, weather, and operating patterns.',
  },
  {
    id: 'performance-gap',
    question: "The 'performance gap' refers to the difference between:",
    options: [
      'Summer and winter energy consumption',
      'Predicted design energy use and actual operational energy use',
      'Electrical and gas consumption',
      'Peak demand and average demand',
    ],
    correctIndex: 1,
    explanation:
      'The performance gap is the difference between predicted energy consumption at design stage and actual measured energy consumption once the building is operational. This gap is often significant, typically 2-5 times higher than predicted.',
  },
  {
    id: 'tm54-purpose',
    question: 'What is the primary purpose of CIBSE TM54?',
    options: [
      'To calculate U-values',
      'To predict operational energy use more accurately',
      'To size HVAC equipment',
      'To design lighting systems',
    ],
    correctIndex: 1,
    explanation:
      'CIBSE TM54 provides a methodology for evaluating operational energy performance at design stage, aiming to produce realistic predictions that account for actual operating conditions, occupancy patterns, and equipment loads.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "A DEC rating of 'A' indicates energy consumption that is:",
    options: [
      'Average for the building type',
      'Less than 25% of the typical benchmark',
      'Compliant with Building Regulations',
      'Below the median for the sector',
    ],
    correctAnswer: 1,
    explanation:
      "A DEC rating of 'A' indicates that the building's energy consumption is less than 25% of the typical benchmark for that building type. The scale runs from A (most efficient) to G (least efficient), with 100 representing typical performance.",
  },
  {
    id: 2,
    question: 'The key difference between an EPC and a DEC is:',
    options: [
      'EPCs are for residential buildings only',
      'DECs measure actual energy use, EPCs assess theoretical performance',
      'EPCs are displayed publicly, DECs are private',
      'DECs are only valid for 1 year',
    ],
    correctAnswer: 1,
    explanation:
      'EPCs (Energy Performance Certificates) provide an asset rating based on theoretical calculations of the building fabric and systems. DECs (Display Energy Certificates) provide an operational rating based on actual metered energy consumption.',
  },
  {
    id: 3,
    question: 'What is the typical validity period for a DEC in buildings over 1000m²?',
    options: ['6 months', '1 year', '5 years', '10 years'],
    correctAnswer: 1,
    explanation:
      'DECs for buildings over 1000m² must be renewed annually because they are based on the previous 12 months of actual energy consumption data. Buildings between 250-1000m² require renewal every 10 years.',
  },
  {
    id: 4,
    question: 'Which energy sources are typically included in DEC calculations?',
    options: [
      'Electricity only',
      'Gas and electricity only',
      'All metered energy including electricity, gas, oil, and district heating',
      'Only renewable energy sources',
    ],
    correctAnswer: 2,
    explanation:
      'DEC calculations include all metered energy supplies to the building, including electricity, gas, oil, LPG, coal, biomass, and district heating/cooling. The total is converted to kWh/m²/year using standard conversion factors.',
  },
  {
    id: 5,
    question: 'A building with a DEC rating of 150 uses approximately:',
    options: [
      'Half the energy of a typical building',
      'The same energy as a typical building',
      '50% more energy than a typical building',
      'Three times the energy of a typical building',
    ],
    correctAnswer: 2,
    explanation:
      'The DEC numerical rating uses 100 as the benchmark for typical performance. A rating of 150 indicates the building uses 50% more energy than the typical benchmark for that building type.',
  },
  {
    id: 6,
    question:
      'CIBSE TM54 recommends including which of the following in operational energy predictions?',
    options: [
      'Only regulated loads',
      'Regulated loads plus standard occupancy assumptions',
      'All energy uses including unregulated loads, actual hours, and small power',
      'Only HVAC and lighting systems',
    ],
    correctAnswer: 2,
    explanation:
      'TM54 requires inclusion of all energy uses: regulated loads (heating, cooling, ventilation, lighting, hot water), unregulated loads (small power, servers, lifts, catering), actual operating hours, and realistic occupancy patterns.',
  },
  {
    id: 7,
    question: 'What is the main cause of performance gaps in new buildings?',
    options: [
      'Poor construction quality only',
      'Incorrect energy modelling assumptions and operational factors',
      'Equipment failures',
      'Weather variations',
    ],
    correctAnswer: 1,
    explanation:
      'Performance gaps typically result from multiple factors: unrealistic design assumptions (occupancy, operating hours, set points), unregulated loads not included in compliance models, poor commissioning, and operational practices different from design intent.',
  },
  {
    id: 8,
    question: 'Building energy benchmarks from CIBSE TM46 are expressed as:',
    options: [
      'kWh per occupant per year',
      'kWh per m² of floor area per year',
      'kW of peak demand',
      'Carbon emissions per year',
    ],
    correctAnswer: 1,
    explanation:
      'CIBSE TM46 benchmarks are expressed as kWh/m²/year for different building types, split into electrical and fossil fuel (thermal) benchmarks. This allows comparison across buildings of different sizes within the same category.',
  },
  {
    id: 9,
    question: 'Which factor typically contributes most to the performance gap in office buildings?',
    options: [
      'Heating system inefficiency',
      'Extended operating hours and out-of-hours use',
      'Poor insulation',
      'Lighting design',
    ],
    correctAnswer: 1,
    explanation:
      'Extended operating hours are a major contributor to performance gaps. Design assumptions often use standard occupancy (e.g., 8am-6pm), but actual buildings frequently operate longer hours, include weekend use, and have significant out-of-hours consumption from servers, security, and cleaning.',
  },
  {
    id: 10,
    question: 'An Advisory Report (AR) accompanying a DEC must include:',
    options: [
      "Only the building's energy consumption data",
      'Recommendations for improving energy efficiency',
      'A complete retrofit specification',
      'Guaranteed energy savings',
    ],
    correctAnswer: 1,
    explanation:
      "The Advisory Report provides cost-effective recommendations for improving the building's energy efficiency. It must identify improvement opportunities, estimated savings, and implementation priorities, though detailed specifications are not required.",
  },
  {
    id: 11,
    question: 'Soft Landings is a process that aims to:',
    options: [
      'Reduce construction costs',
      'Ensure buildings perform as designed through extended aftercare',
      'Simplify planning applications',
      'Speed up construction programmes',
    ],
    correctAnswer: 1,
    explanation:
      'Soft Landings (now part of Government Soft Landings - GSL) is a building delivery process that extends from design through construction and into operation, with the aim of closing the performance gap through better briefing, commissioning, handover, and aftercare.',
  },
  {
    id: 12,
    question: 'Sub-metering is important for improving operational ratings because it:',
    options: [
      'Is required by Building Regulations',
      'Enables identification of energy waste and targeting of improvements',
      'Reduces overall energy consumption automatically',
      'Satisfies insurance requirements',
    ],
    correctAnswer: 1,
    explanation:
      'Sub-metering allows energy consumption to be monitored at system or zone level, enabling identification of inefficient equipment, out-of-hours consumption, and specific improvement opportunities. Without sub-metering, it is difficult to target interventions effectively.',
  },
];

const faqs = [
  {
    question: 'Why do buildings often use 2-5 times more energy than predicted?',
    answer:
      "The performance gap has multiple causes: (1) Design models only include 'regulated' loads required for Building Regulations compliance, excluding small power, servers, and catering equipment; (2) Standard assumptions for occupancy and operating hours rarely match reality; (3) Control systems are often not commissioned properly or are overridden by occupants; (4) Building fabric may not achieve design specifications due to construction quality issues; (5) Actual weather data differs from design data. CIBSE TM54 methodology addresses many of these issues by requiring more realistic assumptions.",
  },
  {
    question: 'What is the difference between asset rating and operational rating?',
    answer:
      "Asset rating (EPC) assesses the theoretical energy efficiency of the building fabric and fixed services independent of occupancy - like a car's published fuel consumption figures. Operational rating (DEC) measures actual metered energy consumption - like a car's real-world fuel consumption. Asset ratings are based on standard assumptions and calculation methods, making them useful for comparing building fabric efficiency. Operational ratings reflect actual use patterns, occupant behaviour, and real operating conditions.",
  },
  {
    question: 'How can operational ratings be improved without major capital works?',
    answer:
      'Many improvements require minimal investment: (1) Optimise BMS settings and control strategies; (2) Review and adjust operating schedules to match actual occupancy; (3) Implement systematic switch-off procedures for out-of-hours periods; (4) Retune heating/cooling set points and dead bands; (5) Fix stuck dampers, valves, and malfunctioning sensors; (6) Address lighting controls and implement daylight dimming; (7) Engage occupants with energy awareness campaigns; (8) Review and renegotiate maintenance contracts to include energy performance. Studies show 10-20% savings are often achievable through operational improvements alone.',
  },
  {
    question: 'When should TM54 methodology be used?',
    answer:
      'TM54 should be used whenever realistic operational energy predictions are needed: (1) Setting design targets for new buildings or major refurbishments; (2) Validating energy strategies during RIBA Stage 2-3; (3) Preparing for Soft Landings delivery; (4) Supporting BREEAM assessments requiring energy performance evidence; (5) Informing business cases where operational costs are critical; (6) Post-occupancy evaluation to compare actual vs predicted performance. It is particularly valuable for public sector clients and projects subject to Government Soft Landings requirements.',
  },
  {
    question: 'How do weather corrections affect DEC ratings?',
    answer:
      "DEC calculations include weather corrections to enable fair comparison between buildings in different locations and across different years. Degree-day corrections normalise heating and cooling energy to a standard weather year, removing variations due to unusually warm or cold periods. This ensures a building's rating reflects its inherent efficiency rather than weather conditions, allowing meaningful comparison with benchmarks and previous years' performance.",
  },
];

const HNCModule6Section5_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section5")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 5 · Subsection 5"
            title="Building Performance"
            description="Display Energy Certificates, operational ratings, performance gaps, benchmarking, and strategies for improving building energy performance"
            tone="purple"
          />

          <TLDR
            points={[
              "Display Energy Certificates (DECs) rate operational (in-use) energy performance for public buildings >250 m² using actual metered data — distinct from the design-based EPC.",
              "Operational ratings benchmark a building against typical performance — Band A (lowest) to G (highest energy use); revealing the performance gap is often a precondition to closing it.",
              "CIBSE TM22 (energy assessment and reporting) and TM61–63 (in-use performance) provide the institutional methodology — turning raw meter data into actionable performance reports.",
            ]}
          />

          <RegsCallout
            source="The Energy Performance of Buildings (England and Wales) Regulations 2012 + CIBSE TM22"
            clause="A Display Energy Certificate (DEC) shall be commissioned for any building with a total useful floor area greater than 250 m² which is occupied by a public authority and frequently visited by the public. The DEC shall display the operational rating, valid for 12 months, and shall be accompanied by an Advisory Report valid for 7 years. The operational rating shall be calculated using actual metered energy consumption data for the most recent 12-month period in accordance with the Operational Rating Methodology."
            meaning={
              <>
                DECs apply only to public buildings (schools, hospitals, council buildings, libraries) — not commercial offices or retail. Annual renewal exposes performance trends publicly. The Advisory Report identifies improvement actions; private-sector equivalents (CIBSE TM22 reports, TM63 in-use evaluations) are voluntary but increasingly common in net-zero strategies.
              </>
            }
            cite="Source: SI 2012/3118 — legislation.gov.uk; CIBSE TM22 (2012) — cibse.org"
          />

          <LearningOutcomes
            outcomes={[
              "Explain DEC requirements, ratings, and Advisory Reports",
              "Distinguish between asset ratings and operational ratings",
              "Identify causes of building performance gaps",
              "Apply CIBSE TM54 methodology for operational energy prediction",
              "Use energy benchmarks for building performance comparison",
              "Recommend strategies for improving operational ratings",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Display Energy Certificates (DECs)">
            <p>Display Energy Certificates provide an operational rating based on actual measured energy consumption, showing how efficiently a building is being used in practice. Unlike EPCs which assess theoretical performance, DECs reflect real-world energy use including occupant behaviour and operating patterns.</p>
            <p><strong>DEC Requirements:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Mandatory for:</strong> Public buildings over 250m² frequently visited by the public</li>
              <li><strong>Display location:</strong> Prominently displayed where clearly visible to the public</li>
              <li><strong>Renewal:</strong> Annually for buildings over 1000m², every 10 years for 250-1000m²</li>
              <li><strong>Advisory Report:</strong> Required alongside DEC with improvement recommendations</li>
            </ul>
            <p><strong>DEC Rating Scale</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>A:</strong> 0-25 — Exceptional - less than 25% of typical</li>
              <li><strong>B:</strong> 26-50 — Excellent - 26-50% of typical</li>
              <li><strong>C:</strong> 51-75 — Good - 51-75% of typical</li>
              <li><strong>D:</strong> 76-100 — Typical - around benchmark level</li>
              <li><strong>E:</strong> 101-125 — Below average - up to 25% above typical</li>
              <li><strong>F:</strong> 126-150 — Poor - 26-50% above typical</li>
              <li><strong>G:</strong> Over 150 — Very poor - more than 50% above typical</li>
            </ul>
            <p><strong>DEC Calculation Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Electricity consumption:</strong> Metered kWh from utility bills</li>
              <li><strong>Heating fuel:</strong> Gas, oil, or district heating in kWh</li>
              <li><strong>Total floor area:</strong> Gross internal area (GIA) in m²</li>
              <li><strong>Weather correction:</strong> Degree-day normalisation</li>
              <li><strong>Benchmark:</strong> CIBSE TM46 values for building type</li>
            </ul>
            <p><strong>Key principle:</strong> DECs promote transparency and continuous improvement by making energy performance visible to building users and the public.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Asset Rating vs Operational Rating">
            <p>Understanding the difference between asset ratings (EPCs) and operational ratings (DECs) is fundamental to building performance assessment. Each serves a different purpose and measures different aspects of energy efficiency.</p>
            <p><strong>Asset Rating (EPC)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Based on building fabric and systems</li>
              <li>Calculated using standard assumptions</li>
              <li>Independent of actual occupancy</li>
              <li>Allows building-to-building comparison</li>
              <li>Valid for 10 years</li>
              <li>Required for sale/let transactions</li>
            </ul>
            <p><strong>Operational Rating (DEC)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Based on actual metered consumption</li>
              <li>Reflects real operating conditions</li>
              <li>Includes occupant behaviour effects</li>
              <li>Shows year-on-year performance trends</li>
              <li>Updated annually (large buildings)</li>
              <li>Required for public display</li>
            </ul>
            <p><strong>Rating Comparison Example - Office Building</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Operating hours:</strong> Standard: 52 hrs/week — Actual: 70 hrs/week</li>
              <li><strong>Heating set point:</strong> Standard: 21°C — Actual: 23°C average</li>
              <li><strong>Small power:</strong> Standard: 12 W/m² — Actual: 25 W/m²</li>
              <li><strong>Server room:</strong> Not included — Fully included</li>
              <li><strong>Resulting rating:</strong> B (45) — E (118)</li>
            </ul>
            <p><strong>Why Both Ratings Matter</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Asset rating:</strong> Identifies fabric and system improvement opportunities</li>
              <li><strong>Operational rating:</strong> Reveals management and control improvement opportunities</li>
              <li><strong>Large gap between ratings:</strong> Suggests operational issues rather than building deficiencies</li>
              <li><strong>Similar ratings:</strong> Indicates the building is operating close to its theoretical potential</li>
            </ul>
            <p><strong>Practical insight:</strong> A building with a good EPC but poor DEC has significant operational improvement potential without capital investment.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Performance Gaps and CIBSE TM54">
            <p>The performance gap between predicted and actual energy consumption is a critical issue in building engineering. Research consistently shows that buildings use 2-5 times more energy than design predictions suggest. CIBSE TM54 provides a methodology to address this.</p>
            <p><strong>Causes of Performance Gaps</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Unregulated loads excluded:</strong> Compliance models ignore small power, servers, lifts, catering</li>
              <li><strong>Unrealistic assumptions:</strong> Standard occupancy and hours rarely match actual use</li>
              <li><strong>Poor commissioning:</strong> Systems not optimised or controls not properly set up</li>
              <li><strong>Construction quality:</strong> Air tightness and insulation below specification</li>
              <li><strong>Operational issues:</strong> Overridden controls, extended hours, comfort complaints</li>
              <li><strong>Tenant fit-out:</strong> Additional loads added post-completion</li>
            </ul>
            <p><strong>CIBSE TM54 Methodology</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1:</strong> Gather operational information — Actual hours, occupancy, process loads</li>
              <li><strong>2:</strong> Identify all energy uses — Both regulated and unregulated loads</li>
              <li><strong>3:</strong> Create energy model — Using actual operational parameters</li>
              <li><strong>4:</strong> Separate end uses — Heating, cooling, lighting, equipment etc.</li>
              <li><strong>5:</strong> Apply monthly profiles — Seasonal variation in loads</li>
              <li><strong>6:</strong> Compare with benchmarks — Validate predictions against TM46</li>
            </ul>
            <p><strong>Regulated Loads</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Space heating</li>
              <li>Space cooling</li>
              <li>Ventilation fans</li>
              <li>Fixed lighting</li>
              <li>Hot water (pumps)</li>
              <li>Auxiliary energy</li>
            </ul>
            <p><strong>Unregulated Loads</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Small power/equipment</li>
              <li>Server rooms/IT</li>
              <li>Lifts and escalators</li>
              <li>Catering equipment</li>
              <li>External lighting</li>
              <li>Specialist equipment</li>
            </ul>
            <p><strong>TM54 Additions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Actual operating hours</li>
              <li>Real occupancy patterns</li>
              <li>Out-of-hours loads</li>
              <li>Tenant equipment</li>
              <li>Management factors</li>
              <li>Uncertainty margins</li>
            </ul>
            <p><strong>TM54 target:</strong> Predictions within ±20% of actual consumption, compared to typical gaps of 150-400% using compliance calculations alone.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Benchmarking and Improvement Strategies">
            <p>Energy benchmarking enables comparison of building performance against similar buildings and identification of improvement opportunities. CIBSE TM46 provides standardised benchmarks for various building types used in DEC calculations.</p>
            <p><strong>CIBSE TM46 Benchmarks (kWh/m²/year)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>General Office:</strong> 95 — 120 — 215</li>
              <li><strong>Schools/Universities:</strong> 40 — 150 — 190</li>
              <li><strong>Hospital (Clinical):</strong> 120 — 420 — 540</li>
              <li><strong>Retail (Sales Area):</strong> 165 — 0 — 165</li>
              <li><strong>Leisure Centre:</strong> 115 — 475 — 590</li>
            </ul>
            <p><strong>Strategies for Improving Operational Ratings</strong></p>
            <p><strong>Low/No Cost Measures</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Optimise BMS schedules and setpoints</li>
              <li>Implement systematic switch-off procedures</li>
              <li>Reduce out-of-hours operation</li>
              <li>Engage occupants in energy saving</li>
              <li>Review and fix control issues</li>
              <li>Retune heating/cooling deadbands</li>
            </ul>
            <p><strong>Capital Investment Measures</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>LED lighting upgrades with controls</li>
              <li>Variable speed drives on pumps/fans</li>
              <li>BMS upgrades and optimisation</li>
              <li>Heat recovery systems</li>
              <li>Improved insulation and glazing</li>
              <li>Renewable energy installations</li>
            </ul>
            <p><strong>Sub-Metering Strategy</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Mains incomer:</strong> Total site consumption (required for DEC)</li>
              <li><strong>Major plant:</strong> Chillers, boilers, AHUs, lift motors</li>
              <li><strong>Lighting circuits:</strong> Separately metered per floor or zone</li>
              <li><strong>Small power:</strong> Floor-by-floor or tenant sub-metering</li>
              <li><strong>Server rooms:</strong> Critical for identifying IT energy use</li>
              <li><strong>Catering:</strong> Separate metering for kitchens and vending</li>
            </ul>
            <p><strong>Soft Landings and Post-Occupancy Evaluation</strong></p>
            <p><strong>Government Soft Landings (GSL)</strong> is a building delivery process designed to close the performance gap:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Stage 1:</strong> Define outcome-based performance requirements at briefing</li>
              <li><strong>Stage 2:</strong> Set measurable energy targets using TM54 methodology</li>
              <li><strong>Stage 3:</strong> Reality checking during design development</li>
              <li><strong>Stage 4:</strong> Commissioning and pre-handover verification</li>
              <li><strong>Stage 5:</strong> Extended aftercare period (typically 3 years)</li>
              <li><strong>POE:</strong> Post-occupancy evaluation comparing actual vs design</li>
            </ul>
            <p><strong>Continuous improvement:</strong> Annual DEC renewal provides an opportunity to track progress and refine improvement strategies based on measured results.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: DEC Rating Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate the DEC rating for a 5,000m² office building.</p>
            <p>Annual energy consumption:</p>
            <p>Electricity: 550,000 kWh</p>
            <p>Gas: 450,000 kWh</p>
            <p>Floor area: 5,000 m² GIA</p>
            <p>Energy use intensity:</p>
            <p>Electricity: 550,000 ÷ 5,000 = 110 kWh/m²/yr</p>
            <p>Gas: 450,000 ÷ 5,000 = 90 kWh/m²/yr</p>
            <p>Compare to TM46 Office benchmark (95 + 120 = 215):</p>
            <p>Actual total: 110 + 90 = 200 kWh/m²/yr</p>
            <p>Rating: (200 ÷ 215) × 100 = 93</p>
            <p>Result: DEC Rating D (93) - slightly better than typical</p>
            <p>
              <strong>Example 2: Performance Gap Analysis</strong>
            </p>
            <p><strong>Scenario:</strong> Analyse the performance gap for a new school building.</p>
            <p>Design prediction (Part L compliance):</p>
            <p>Regulated energy: 85 kWh/m²/yr</p>
            <p>TM54 prediction (operational):</p>
            <p>Regulated: 85 kWh/m²/yr</p>
            <p>Unregulated (IT, catering): 45 kWh/m²/yr</p>
            <p>Extended hours factor: +15%</p>
            <p>Total: (85 + 45) × 1.15 = 150 kWh/m²/yr</p>
            <p>Actual consumption (Year 1):</p>
            <p>Metered: 175 kWh/m²/yr</p>
            <p>Performance gap analysis:</p>
            <p>vs Part L: 175 ÷ 85 = 2.06× (106% gap)</p>
            <p>vs TM54: 175 ÷ 150 = 1.17× (17% gap)</p>
            <p>TM54 produced a more realistic prediction</p>
            <p>Investigate remaining 17% gap: controls, behaviour</p>
            <p>
              <strong>Example 3: Improvement Strategy Development</strong>
            </p>
            <p><strong>Scenario:</strong> Develop an improvement plan for a council building with DEC rating F (142).</p>
            <p>Current performance:</p>
            <p>DEC Rating: F (142) - 42% above typical</p>
            <p>Consumption: 285 kWh/m²/yr</p>
            <p>Benchmark: 200 kWh/m²/yr</p>
            <p>Sub-metering analysis reveals:</p>
            <p>Out-of-hours baseload: 35% of consumption</p>
            <p>Heating running 24/7 (not required)</p>
            <p>Lighting on timers, not occupancy</p>
            <p>Recommended actions:</p>
            <p>1. BMS optimisation (no cost): -15%</p>
            <p>2. Heating schedule correction: -10%</p>
            <p>3. Lighting controls upgrade: -8%</p>
            <p>4. Staff engagement programme: -5%</p>
            <p>Projected consumption: 285 × 0.62 = 177 kWh/m²/yr</p>
            <p>Projected DEC Rating: D (88)</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>DEC Assessment Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Gather 12 months of energy bills for all fuel types</li>
              <li>Confirm gross internal floor area from measured drawings</li>
              <li>Identify building category from TM46 classification</li>
              <li>Apply weather corrections using degree-day data</li>
              <li>Document any changes affecting consumption (occupancy, hours)</li>
              <li>Prepare Advisory Report with prioritised recommendations</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>DEC benchmark: <strong>100 = typical</strong> for building type</li>
              <li>Typical performance gap: <strong>2-5 times</strong> design predictions</li>
              <li>TM54 target accuracy: <strong>±20%</strong> of actual consumption</li>
              <li>Operational savings potential: <strong>10-20%</strong> without capital investment</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Relying on EPC alone:</strong> Asset rating doesn't predict operational performance</li>
                <li><strong>Ignoring unregulated loads:</strong> Often 30-50% of total consumption</li>
                <li><strong>Assuming design = reality:</strong> Always verify with measured data</li>
                <li><strong>No sub-metering:</strong> Cannot target improvements without disaggregated data</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="DEC band drops from D to F — political consequence"
            situation={
              <>
                A local council civic building DEC drops from Band D (typical) to Band F (worst quartile) at annual renewal. The cause is a 2-year-old AHU controls failure that has been masked by spare capacity. Local press coverage follows; the council faces public criticism.
              </>
            }
            whatToDo={
              <>
                Three-stage response: (1) immediate technical — diagnose the controls failure (typically BMS scheduling, sensor failure or commissioning drift), repair, re-commission, verify with 4-week metering; (2) update the DEC Advisory Report with the corrective action and re-issue (DEC band can be improved at re-issue if metering confirms); (3) review entire estate for similar failures — DECs catch problems that BMS alarms missed. Use the political moment to fund a wider energy-management programme.
              </>
            }
            whyItMatters={
              <>
                DECs make operational performance visible to the public. For commercial buildings, equivalent transparency is increasingly required by ESG-conscious tenants, investors and lenders. Building performance is moving from a back-office FM concern to a front-of-house reputational issue.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "DEC = Display Energy Certificate, operational rating, mandatory for public buildings >250 m².",
              "EPC vs DEC: EPC is design-based prediction, DEC is actual measured performance.",
              "Operational rating: A (best) to G (worst); benchmarked against typical performance.",
              "CIBSE TM22 = energy assessment and reporting methodology.",
              "CIBSE TM61–63 = in-use performance evaluation.",
              "Performance gap: design vs actual — typically 30–80% in non-dom buildings.",
              "Public, ESG and tenant pressure increasingly making operational ratings reputationally important.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section5-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                ISO 50001
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section5-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Energy efficiency measures
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section5_5;
