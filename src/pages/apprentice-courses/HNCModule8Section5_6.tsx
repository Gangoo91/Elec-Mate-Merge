/**
 * Module 8 · Section 5 · Subsection 6 — System Optimisation
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Energy monitoring, fault detection, performance analytics and continuous commissioning
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'System Optimisation - HNC Module 8 Section 5.6';
const DESCRIPTION =
  'Master BMS system optimisation: energy monitoring and dashboards, sub-metering strategies, fault detection and diagnostics (FDD), performance analytics, continuous commissioning (Cx), building analytics platforms, and NABERS/DEC ratings.';

const quickCheckQuestions = [
  {
    id: 'energy-monitoring',
    question: 'What is the primary purpose of energy sub-metering in a building management system?',
    options: [
      'To reduce the number of utility meters',
      'To allocate energy consumption to specific systems or tenants and identify saving opportunities',
      'To replace the main utility meter',
      'To measure voltage quality only',
    ],
    correctIndex: 1,
    explanation:
      'Sub-metering enables consumption to be allocated to specific building systems (HVAC, lighting, lifts) or tenant areas. This granular data identifies energy waste, supports tenant billing, and prioritises efficiency improvements.',
  },
  {
    id: 'fdd-purpose',
    question: 'What does Fault Detection and Diagnostics (FDD) software primarily analyse?',
    options: [
      'Electrical wiring diagrams only',
      'BMS trend data and operational patterns to identify system faults and inefficiencies',
      'Building structural integrity',
      'Fire alarm system performance',
    ],
    correctIndex: 1,
    explanation:
      'FDD software analyses BMS trend data, setpoints, and operational patterns using rule-based or machine learning algorithms to automatically detect equipment faults, control sequences that deviate from design intent, and energy waste.',
  },
  {
    id: 'continuous-commissioning',
    question: 'How does continuous commissioning (CCx) differ from initial commissioning?',
    options: [
      'It only occurs during building handover',
      'It is a one-time activity',
      'It is an ongoing process to maintain optimal performance throughout building life',
      'It focuses only on documentation',
    ],
    correctIndex: 2,
    explanation:
      'Continuous commissioning (CCx) is an ongoing process that uses monitoring data to continuously verify and optimise building performance. Unlike initial commissioning at handover, CCx addresses performance degradation and operational changes throughout the building lifecycle.',
  },
  {
    id: 'dec-rating',
    question: 'What does a Display Energy Certificate (DEC) measure in the UK?',
    options: [
      'Predicted energy performance based on design',
      'Actual measured operational energy use over 12 months',
      'Theoretical maximum efficiency',
      'Renewable energy generation only',
    ],
    correctIndex: 1,
    explanation:
      'A DEC shows the actual operational energy use of a public building over the previous 12 months, measured in kWh/m²/year and converted to a rating from A to G. This differs from an EPC which shows predicted performance.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which metering hierarchy level typically monitors individual air handling units?',
    options: [
      'Level 1 - Main incoming supply',
      'Level 2 - Building or zone level',
      'Level 3 - System or end-use level',
      'Level 4 - Equipment or circuit level',
    ],
    correctAnswer: 2,
    explanation:
      'Level 3 sub-metering monitors specific systems or end-uses such as individual AHUs, chiller plants, or lighting circuits. This level provides the granularity needed to identify system-specific inefficiencies and verify retrofit savings.',
  },
  {
    id: 2,
    question:
      'What is the recommended interval for BMS trend logging to support effective energy analysis?',
    options: [
      '1-minute intervals for all points',
      '15-minute intervals aligned with half-hourly utility data',
      'Hourly intervals only',
      'Daily totals only',
    ],
    correctAnswer: 1,
    explanation:
      '15-minute trend intervals align with UK half-hourly utility metering and provide sufficient resolution for energy analysis whilst managing data storage requirements. Critical points may warrant shorter intervals; less critical points may use longer intervals.',
  },
  {
    id: 3,
    question:
      'A BMS dashboard shows cooling energy significantly higher than predicted. The most likely FDD rule to trigger would detect:',
    options: [
      'Low lighting levels',
      'Simultaneous heating and cooling operation',
      'Fire alarm activation',
      'Lift motor overload',
    ],
    correctAnswer: 1,
    explanation:
      'Simultaneous heating and cooling is a common fault detectable by FDD rules. When heating and cooling systems operate concurrently in the same zone (due to conflicting setpoints or faulty controls), significant energy is wasted fighting against each other.',
  },
  {
    id: 4,
    question:
      'Which analytics technique compares current building performance against a baseline model adjusted for weather?',
    options: [
      'Simple trending',
      'Cumulative Sum (CUSUM) analysis',
      'Alarm logging',
      'Equipment scheduling',
    ],
    correctAnswer: 1,
    explanation:
      'CUSUM analysis compares actual consumption against a weather-adjusted baseline model, accumulating the differences over time. This technique quickly identifies when performance deviates from expected patterns, even when daily variations might mask the change.',
  },
  {
    id: 5,
    question: 'The NABERS rating system originated in which country?',
    options: ['United Kingdom', 'United States', 'Australia', 'Canada'],
    correctAnswer: 2,
    explanation:
      'NABERS (National Australian Built Environment Rating System) was developed in Australia and has been adapted for use in other countries including the UK (NABERS UK). It rates actual building performance based on measured operational data rather than design predictions.',
  },
  {
    id: 6,
    question:
      'What percentage energy saving is typically achievable through continuous commissioning of an existing building?',
    options: ['1-5%', '5-15%', '10-30%', '50-70%'],
    correctAnswer: 2,
    explanation:
      'Continuous commissioning typically achieves 10-30% energy savings in existing buildings by identifying and correcting operational issues, optimising setpoints, and ensuring systems operate as intended. Savings depend on building age, complexity, and existing maintenance quality.',
  },
  {
    id: 7,
    question: 'Which FDD approach uses predefined logical rules based on engineering knowledge?',
    options: ['Machine learning FDD', 'Neural network FDD', 'Rule-based FDD', 'Statistical FDD'],
    correctAnswer: 2,
    explanation:
      "Rule-based FDD uses expert-defined logical rules such as 'if outdoor air temperature is below 15°C and chiller is running, flag as potential fault'. These rules are transparent and easy to understand, though they require engineering expertise to develop.",
  },
  {
    id: 8,
    question: 'A building analytics platform integrates data from which sources?',
    options: [
      'BMS only',
      'Utility meters only',
      'BMS, utility meters, weather data, occupancy systems, and IoT sensors',
      'Fire alarm systems only',
    ],
    correctAnswer: 2,
    explanation:
      'Modern building analytics platforms integrate multiple data sources including BMS, utility sub-meters, weather feeds, occupancy/access control, IoT sensors, and maintenance systems. This holistic view enables comprehensive performance analysis and cross-system optimisation.',
  },
  {
    id: 9,
    question:
      'The UK Display Energy Certificate uses which metric to express building energy performance?',
    options: [
      'kW peak demand',
      'kWh/m²/year (energy use intensity)',
      'Percentage efficiency',
      'Carbon intensity only',
    ],
    correctAnswer: 1,
    explanation:
      'DECs express building energy performance as energy use intensity (EUI) in kWh/m²/year, which normalises consumption by floor area. This allows fair comparison between buildings of different sizes and is converted to an A-G rating scale.',
  },
  {
    id: 10,
    question:
      'Which visualisation technique best shows how energy consumption varies with outdoor temperature?',
    options: [
      'Pie chart',
      'Bar chart of monthly totals',
      'Scatter plot with regression line',
      'Single number display',
    ],
    correctAnswer: 2,
    explanation:
      "A scatter plot with energy consumption on the Y-axis and outdoor temperature on the X-axis reveals the building's weather dependence. The regression line shows the expected relationship, whilst outliers indicate potential faults or operational anomalies.",
  },
  {
    id: 11,
    question: 'Automated fault detection typically prioritises faults by:',
    options: [
      'Alphabetical order',
      'Date discovered only',
      'Energy impact, comfort impact, and equipment risk',
      'Random selection',
    ],
    correctAnswer: 2,
    explanation:
      'Effective FDD systems prioritise faults by their impact - energy cost, occupant comfort, and equipment degradation risk. This ensures maintenance resources address the most significant issues first, maximising return on corrective action investment.',
  },
  {
    id: 12,
    question:
      'What is the recommended frequency for reviewing BMS energy dashboards in a well-managed building?',
    options: [
      'Annually during audits',
      'Monthly at minimum',
      'Daily or weekly for key metrics',
      'Only when problems are reported',
    ],
    correctAnswer: 2,
    explanation:
      'Effective energy management requires regular dashboard review - daily for critical metrics, weekly for trends, and monthly for detailed analysis. Frequent review enables rapid detection of issues before they cause significant energy waste or equipment damage.',
  },
];

const faqs = [
  {
    question: 'How do I justify the cost of implementing a building analytics platform?',
    answer:
      'Build the business case around multiple value streams: energy savings (typically 10-30%), maintenance cost reduction through predictive insights, extended equipment life, improved occupant comfort and productivity, and reduced carbon emissions for sustainability reporting. Calculate simple payback based on energy savings alone (often 1-3 years), then add qualitative benefits. Reference case studies from similar buildings and consider starting with a pilot zone to demonstrate value before full deployment.',
  },
  {
    question: 'What data points are essential for effective energy monitoring?',
    answer:
      'Essential points include: main incoming electricity (kWh, kW, power factor), gas consumption, major plant sub-meters (chillers, boilers, AHUs), lighting circuits by floor or zone, plug load samples, outdoor temperature and humidity, key space temperatures, and occupancy indicators. Ensure all meters communicate via BACnet, Modbus, or pulse outputs to the BMS, with timestamps synchronised across all systems.',
  },
  {
    question: 'How do I differentiate between rule-based and machine learning FDD?',
    answer:
      "Rule-based FDD uses predefined engineering rules (e.g., 'flag if cooling and heating simultaneously active') - transparent but requires expert rule development for each fault type. Machine learning FDD learns normal patterns from historical data and flags deviations - adapts automatically but can be a 'black box' and may generate false positives during unusual but valid operation. Many systems now combine both approaches for optimal results.",
  },
  {
    question: 'What is the difference between EPC and DEC ratings in the UK?',
    answer:
      'An Energy Performance Certificate (EPC) rates theoretical performance based on building design and is required at construction, sale, or lease. A Display Energy Certificate (DEC) rates actual operational performance based on measured energy use over 12 months and is required for public buildings over 250m². EPCs show potential; DECs show reality - the performance gap between them highlights operational improvement opportunities.',
  },
  {
    question: 'How often should continuous commissioning activities occur?',
    answer:
      'Continuous commissioning is ongoing, not periodic. Daily automated monitoring via analytics/FDD should run continuously. Weekly review of dashboard metrics and fault reports by facilities staff. Monthly detailed analysis of trends, energy reports, and comfort complaints. Quarterly review of control sequences and setpoints with seasonal adjustments. Annual comprehensive review with benchmark comparisons. Major recommissioning every 3-5 years or following significant changes.',
  },
  {
    question: 'What qualifications are needed to interpret building analytics data?',
    answer:
      'Effective interpretation requires understanding of HVAC systems and control logic, familiarity with BMS operation and common fault patterns, basic data analysis skills (trending, statistics), and knowledge of building physics and energy flows. Training is available through CIBSE, BSRIA, and analytics platform vendors. Consider building internal capability alongside external specialist support for complex analysis.',
  },
];

const HNCModule8Section5_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section5")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 5 · Subsection 6"
            title="System Optimisation"
            description="Energy monitoring, fault detection, performance analytics and continuous commissioning"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Design effective energy monitoring and sub-metering strategies",
              "Configure BMS dashboards for operational insight",
              "Implement fault detection and diagnostics (FDD) systems",
              "Apply analytics techniques for performance trending",
              "Establish continuous commissioning (CCx) programmes",
              "Understand NABERS and DEC rating methodologies",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Energy Monitoring and Dashboards">
            <p>Effective energy management requires comprehensive monitoring systems that capture consumption data at appropriate granularity. Modern BMS platforms provide sophisticated dashboards that transform raw data into actionable insights for building operators.</p>
            <p><strong>Sub-Metering Hierarchy:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Level 1 - Main incoming:</strong> Fiscal meters at utility supply point</li>
              <li><strong>Level 2 - Building/zone:</strong> Major distribution boards, tenant areas</li>
              <li><strong>Level 3 - System:</strong> HVAC plant, lighting circuits, lifts</li>
              <li><strong>Level 4 - Equipment:</strong> Individual AHUs, chillers, pumps</li>
            </ul>
            <p><strong>Sub-Metering Strategy Guide</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Level 1:</strong> 100% of supply — Billing, overall tracking — Essential - mandatory</li>
              <li><strong>Level 2:</strong> 80-90% of load — Zone allocation, tenant billing — High value - recommended</li>
              <li><strong>Level 3:</strong> 60-80% of load — System benchmarking, M&amp;V — Good value for large systems</li>
              <li><strong>Level 4:</strong> Critical equipment — Fault detection, optimisation — Selective - high-value plant</li>
            </ul>
            <p><strong>Dashboard Design Principles</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Executive summary:</strong> Top-level KPIs visible at a glance (EUI, cost, carbon)</li>
              <li><strong>Drill-down capability:</strong> From building to system to equipment level</li>
              <li><strong>Comparative views:</strong> Actual vs target, this year vs last year, building vs benchmark</li>
              <li><strong>Trend visualisation:</strong> Time-series charts showing patterns and anomalies</li>
              <li><strong>Alert integration:</strong> Traffic light indicators for out-of-range conditions</li>
              <li><strong>Mobile accessibility:</strong> Responsive design for on-site viewing</li>
            </ul>
            <p><strong>Key Dashboard Metrics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Energy Use Intensity (EUI):</strong> kWh/m²/year - normalised consumption</li>
              <li><strong>Peak Demand:</strong> kW maximum - capacity and charges</li>
              <li><strong>Power Factor:</strong> Target &gt; 0.95 - reactive charges</li>
              <li><strong>Base Load Ratio:</strong> Night/day consumption - identifies waste</li>
              <li><strong>Carbon Intensity:</strong> kgCO₂/m² - sustainability reporting</li>
            </ul>
            <p><strong>Best practice:</strong> Implement automatic meter validation to flag missing data, negative readings, and implausible values before they corrupt analysis.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Fault Detection and Diagnostics (FDD)">
            <p>Fault Detection and Diagnostics (FDD) software automatically analyses BMS data to identify equipment faults, control sequence errors, and operational inefficiencies. FDD can detect issues that would otherwise go unnoticed until causing significant energy waste or equipment failure.</p>
            <p><strong>Rule-Based FDD</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Predefined engineering rules</li>
              <li>Transparent logic - easy to understand</li>
              <li>Requires expert rule development</li>
              <li>Limited to anticipated fault modes</li>
              <li>Example: "If OAT &lt; 15°C AND chiller ON, flag"</li>
            </ul>
            <p><strong>Machine Learning FDD</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Learns normal patterns from data</li>
              <li>Adapts to building-specific behaviour</li>
              <li>Can detect novel fault patterns</li>
              <li>Requires training data period</li>
              <li>May generate false positives initially</li>
            </ul>
            <p><strong>Common FDD Rules for HVAC Systems</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Simultaneous heating/cooling:</strong> Heating AND cooling active in same zone — High - systems fight each other</li>
              <li><strong>Economiser not working:</strong> OAT favourable but dampers at minimum — Moderate - missed free cooling</li>
              <li><strong>Stuck valve:</strong> Valve command changes but output unchanged — Variable - depends on stuck position</li>
              <li><strong>Sensor drift:</strong> Sensor reading implausible vs related sensors — High - incorrect control decisions</li>
              <li><strong>Schedule mismatch:</strong> Equipment running outside occupied hours — Moderate - unnecessary runtime</li>
            </ul>
            <p><strong>FDD Implementation Steps</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Data audit:</strong> Verify BMS trending captures required points at sufficient intervals</li>
              <li><strong>Rule configuration:</strong> Select and tune rules for building systems and climate</li>
              <li><strong>Threshold setting:</strong> Balance sensitivity (catch faults) vs specificity (avoid false alarms)</li>
              <li><strong>Prioritisation logic:</strong> Rank faults by energy impact, comfort impact, and urgency</li>
              <li><strong>Integration:</strong> Link to CAFM/maintenance systems for work order generation</li>
              <li><strong>Feedback loop:</strong> Capture resolution data to improve detection accuracy</li>
            </ul>
            <p><strong>FDD Benefits Quantified</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Energy savings: 5-15% from fault correction</li>
              <li>Maintenance efficiency: 30-40% reduction in reactive calls</li>
              <li>Equipment life: Extended through early problem detection</li>
              <li>Comfort complaints: 50-70% reduction through proactive response</li>
            </ul>
            <p><strong>Implementation tip:</strong> Start with a limited rule set focused on high-impact faults, then expand as the team builds confidence with the system.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Performance Analytics and Trending">
            <p>Building analytics transforms raw operational data into insights that drive optimisation decisions. Advanced analytics techniques reveal patterns, predict problems, and benchmark performance against targets and similar buildings.</p>
            <p><strong>Key Analytics Techniques</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Time-series trending:</strong> Any measured parameter — Patterns, anomalies, seasonality</li>
              <li><strong>Regression analysis:</strong> Energy vs weather/occupancy — Weather normalisation, baseline models</li>
              <li><strong>CUSUM analysis:</strong> Cumulative variance tracking — Performance drift detection</li>
              <li><strong>Load duration curves:</strong> Demand analysis — Base load, peak shaving opportunities</li>
              <li><strong>Carpet plots (heat maps):</strong> Hour-by-day visualisation — Schedule effectiveness, weekend operation</li>
            </ul>
            <p><strong>CUSUM Analysis Example</strong></p>
            <p>Purpose: Detect when performance deviates from baseline</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Baseline model:</strong> kWh = 1,500 + (25 × HDD)</li>
              <li><strong>Week 1 actual:</strong> 2,100 kWh, HDD = 20</li>
              <li><strong>Week 1 predicted:</strong> 1,500 + (25 × 20) = 2,000 kWh</li>
              <li><strong>Week 1 variance:</strong> 2,100 - 2,000 = +100 kWh</li>
              <li><strong>CUSUM after W1:</strong> +100 kWh</li>
            </ul>
            <p>Accumulate weekly variances - rising CUSUM indicates degradation</p>
            <p><strong>Building Analytics Platform Features</strong></p>
            <p><strong>Data Integration</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BMS via BACnet/Modbus/API</li>
              <li>Utility meters (AMR/smart meters)</li>
              <li>Weather data feeds</li>
              <li>Occupancy/access control systems</li>
              <li>IoT sensors and sub-meters</li>
            </ul>
            <p><strong>Analysis Capabilities</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Automated benchmarking</li>
              <li>Fault detection and diagnostics</li>
              <li>Energy modelling and M&amp;V</li>
              <li>Comfort monitoring</li>
              <li>Predictive maintenance</li>
            </ul>
            <p><strong>Benchmarking Comparisons:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Internal:</strong> Same building year-on-year, adjusted for weather</li>
              <li><strong>Portfolio:</strong> Compare similar buildings within organisation</li>
              <li><strong>Industry:</strong> CIBSE TM46 benchmarks by building type</li>
              <li><strong>Best practice:</strong> BREEAM/LEED exemplar performance targets</li>
            </ul>
            <p><strong>Analytics insight:</strong> A scatter plot of energy vs outdoor temperature should show a clear V-shape for buildings with heating and cooling - deviations indicate control or operational issues.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Continuous Commissioning and Performance Ratings">
            <p>Continuous commissioning (CCx) extends the benefits of initial commissioning throughout the building lifecycle. Combined with formal performance ratings like NABERS and DEC, CCx provides a framework for sustained operational excellence.</p>
            <p><strong>Commissioning Types Compared</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Initial (Cx):</strong> Construction/handover — Design intent verification — Baseline establishment</li>
              <li><strong>Retro-commissioning (RCx):</strong> Existing buildings — Restoring performance — 10-20%</li>
              <li><strong>Re-commissioning:</strong> Periodic (3-5 years) — Performance recovery — 5-15%</li>
              <li><strong>Continuous (CCx):</strong> Ongoing — Sustained optimisation — 10-30%</li>
            </ul>
            <p><strong>CCx Programme Elements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Monitoring infrastructure:</strong> Comprehensive sub-metering and BMS trending</li>
              <li><strong>Analytics platform:</strong> FDD, dashboards, and reporting tools</li>
              <li><strong>Review cadence:</strong> Daily monitoring, weekly analysis, monthly reporting</li>
              <li><strong>Skilled resources:</strong> Trained operators with analytics interpretation skills</li>
              <li><strong>Action tracking:</strong> Fault logging, work orders, and resolution verification</li>
              <li><strong>Continuous improvement:</strong> Regular setpoint optimisation and sequence tuning</li>
            </ul>
            <p><strong>NABERS UK Rating</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1-6 star scale (6 = best)</li>
              <li>Based on 12 months operational data</li>
              <li>Weather and hours normalised</li>
              <li>Separate base building and tenancy ratings</li>
              <li>Growing adoption in UK commercial sector</li>
              <li>Links to Design for Performance framework</li>
            </ul>
            <p><strong>Display Energy Certificate (DEC)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>A-G scale (A = best)</li>
              <li>Mandatory for public buildings &gt; 250m²</li>
              <li>Based on actual energy consumption</li>
              <li>Displayed prominently in building</li>
              <li>Renewed annually</li>
              <li>Advisory report identifies improvements</li>
            </ul>
            <p><strong>DEC Rating Calculation</strong></p>
            <p>Step 1: Calculate building energy use</p>
            <p>Total kWh = Electricity kWh + (Gas kWh × 1.0)</p>
            <p>Step 2: Calculate energy use intensity</p>
            <p>EUI = Total kWh ÷ Gross Internal Area (m²)</p>
            <p>Step 3: Compare to benchmark</p>
            <p>Operational Rating = (EUI ÷ Benchmark EUI) × 100</p>
            <p>Step 4: Convert to letter grade</p>
            <p>A = 0-25, B = 26-50, C = 51-75, D = 76-100</p>
            <p>E = 101-125, F = 126-150, G = &gt; 150</p>
            <p><strong>Common CCx Issues to Address</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Schedule creep:</strong> Operating hours extended beyond occupancy requirements</li>
              <li><strong>Setpoint drift:</strong> Temperatures adjusted for complaints not reset</li>
              <li><strong>Override accumulation:</strong> Manual overrides left in place permanently</li>
              <li><strong>Sensor degradation:</strong> Calibration drift causing incorrect control</li>
              <li><strong>Sequence bypass:</strong> Optimisation routines disabled for troubleshooting</li>
            </ul>
            <p><strong>Performance principle:</strong> Buildings rarely maintain their as-commissioned efficiency without active management. CCx addresses the natural tendency for performance to degrade over time through operational drift, equipment wear, and changing use patterns.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Sub-Metering Coverage Analysis</strong>
            </p>
            <p><strong>Scenario:</strong> Determine sub-metering coverage for a 5,000m² office building.</p>
            <p>Main meter reading:</p>
            <p>Total building consumption: 850,000 kWh/year</p>
            <p>Sub-meter readings:</p>
            <p>Chiller plant: 280,000 kWh (33%)</p>
            <p>AHU/FCU motors: 85,000 kWh (10%)</p>
            <p>Lighting floors 1-3: 120,000 kWh (14%)</p>
            <p>Lifts: 35,000 kWh (4%)</p>
            <p>Small power/unmetered: 330,000 kWh (39%)</p>
            <p>Coverage calculation:</p>
            <p>Metered load: 280k + 85k + 120k + 35k = 520,000 kWh</p>
            <p>Coverage: 520,000 ÷ 850,000 = 61%</p>
            <p>Recommendation: Add small power sampling (5-10 circuits)</p>
            <p>and tenant meters to achieve 80% coverage target</p>
            <p>
              <strong>Example 2: FDD Energy Impact Prioritisation</strong>
            </p>
            <p><strong>Scenario:</strong> Prioritise three detected faults by energy impact.</p>
            <p>Fault A - Simultaneous heating/cooling:</p>
            <p>Duration: 8 hours/day × 5 days × 40 weeks = 1,600 hours</p>
            <p>Wasted capacity: 15 kW heating + 12 kW cooling = 27 kW</p>
            <p>Annual waste: 27 kW × 1,600 h = 43,200 kWh = £12,960</p>
            <p>Fault B - Economiser disabled:</p>
            <p>Free cooling hours lost: 800 hours/year</p>
            <p>Additional chiller load: 25 kW</p>
            <p>Annual waste: 25 kW × 800 h = 20,000 kWh = £6,000</p>
            <p>Fault C - Out-of-hours operation:</p>
            <p>Unnecessary runtime: 2 hours/day × 250 days = 500 hours</p>
            <p>System load: 8 kW</p>
            <p>Annual waste: 8 kW × 500 h = 4,000 kWh = £1,200</p>
            <p>Priority ranking: Fault A &gt; Fault B &gt; Fault C</p>
            <p>
              <strong>Example 3: DEC Rating Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate DEC rating for a public building.</p>
            <p>Building data:</p>
            <p>Gross internal area: 2,500 m²</p>
            <p>Building type: General office</p>
            <p>Electricity: 425,000 kWh/year</p>
            <p>Gas: 180,000 kWh/year</p>
            <p>Step 1 - Total energy:</p>
            <p>Total = 425,000 + 180,000 = 605,000 kWh/year</p>
            <p>Step 2 - Energy Use Intensity:</p>
            <p>EUI = 605,000 ÷ 2,500 = 242 kWh/m²/year</p>
            <p>Step 3 - Compare to benchmark (TM46):</p>
            <p>General office benchmark: 210 kWh/m²/year</p>
            <p>Operational Rating = (242 ÷ 210) × 100 = 115</p>
            <p>Step 4 - DEC grade:</p>
            <p>Rating 115 falls in range 101-125</p>
            <p>DEC Rating: E (Advisory report required)</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>System Optimisation Implementation Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Audit existing metering and identify gaps against 80% coverage target</li>
              <li>Configure BMS trending for key points at 15-minute intervals minimum</li>
              <li>Implement energy dashboards with drill-down capability</li>
              <li>Deploy FDD rules starting with high-impact fault types</li>
              <li>Establish review cadence: daily monitoring, weekly analysis, monthly reports</li>
              <li>Train operations staff on analytics interpretation and response</li>
              <li>Link fault detection to maintenance work order system</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sub-metering coverage target: <strong>80%</strong> of total consumption</li>
              <li>Trend logging interval: <strong>15 minutes</strong> standard</li>
              <li>FDD detection rate: <strong>60-80%</strong> of operational faults</li>
              <li>CCx savings potential: <strong>10-30%</strong> of baseline</li>
              <li>DEC renewal: <strong>Annual</strong> for public buildings</li>
              <li>NABERS stars: <strong>4+</strong> considered good performance</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Data overload:</strong> Trending everything without analysis capacity</li>
                <li><strong>Alert fatigue:</strong> Too many low-priority alarms desensitise operators</li>
                <li><strong>No action loop:</strong> Detecting faults without resolution tracking</li>
                <li><strong>Static thresholds:</strong> Not adjusting FDD rules for seasonal changes</li>
                <li><strong>Ignoring base load:</strong> Focusing on peaks whilst night consumption drifts</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section5-5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Control strategies
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Services coordination
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section5_6;
