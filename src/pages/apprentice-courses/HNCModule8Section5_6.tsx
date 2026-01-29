import { ArrowLeft, Settings, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "System Optimisation - HNC Module 8 Section 5.6";
const DESCRIPTION = "Master BMS system optimisation: energy monitoring and dashboards, sub-metering strategies, fault detection and diagnostics (FDD), performance analytics, continuous commissioning (Cx), building analytics platforms, and NABERS/DEC ratings.";

const quickCheckQuestions = [
  {
    id: "energy-monitoring",
    question: "What is the primary purpose of energy sub-metering in a building management system?",
    options: ["To reduce the number of utility meters", "To allocate energy consumption to specific systems or tenants and identify saving opportunities", "To replace the main utility meter", "To measure voltage quality only"],
    correctIndex: 1,
    explanation: "Sub-metering enables consumption to be allocated to specific building systems (HVAC, lighting, lifts) or tenant areas. This granular data identifies energy waste, supports tenant billing, and prioritises efficiency improvements."
  },
  {
    id: "fdd-purpose",
    question: "What does Fault Detection and Diagnostics (FDD) software primarily analyse?",
    options: ["Electrical wiring diagrams only", "BMS trend data and operational patterns to identify system faults and inefficiencies", "Building structural integrity", "Fire alarm system performance"],
    correctIndex: 1,
    explanation: "FDD software analyses BMS trend data, setpoints, and operational patterns using rule-based or machine learning algorithms to automatically detect equipment faults, control sequences that deviate from design intent, and energy waste."
  },
  {
    id: "continuous-commissioning",
    question: "How does continuous commissioning (CCx) differ from initial commissioning?",
    options: ["It only occurs during building handover", "It is a one-time activity", "It is an ongoing process to maintain optimal performance throughout building life", "It focuses only on documentation"],
    correctIndex: 2,
    explanation: "Continuous commissioning (CCx) is an ongoing process that uses monitoring data to continuously verify and optimise building performance. Unlike initial commissioning at handover, CCx addresses performance degradation and operational changes throughout the building lifecycle."
  },
  {
    id: "dec-rating",
    question: "What does a Display Energy Certificate (DEC) measure in the UK?",
    options: ["Predicted energy performance based on design", "Actual measured operational energy use over 12 months", "Theoretical maximum efficiency", "Renewable energy generation only"],
    correctIndex: 1,
    explanation: "A DEC shows the actual operational energy use of a public building over the previous 12 months, measured in kWh/m²/year and converted to a rating from A to G. This differs from an EPC which shows predicted performance."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which metering hierarchy level typically monitors individual air handling units?",
    options: [
      "Level 1 - Main incoming supply",
      "Level 2 - Building or zone level",
      "Level 3 - System or end-use level",
      "Level 4 - Equipment or circuit level"
    ],
    correctAnswer: 2,
    explanation: "Level 3 sub-metering monitors specific systems or end-uses such as individual AHUs, chiller plants, or lighting circuits. This level provides the granularity needed to identify system-specific inefficiencies and verify retrofit savings."
  },
  {
    id: 2,
    question: "What is the recommended interval for BMS trend logging to support effective energy analysis?",
    options: ["1-minute intervals for all points", "15-minute intervals aligned with half-hourly utility data", "Hourly intervals only", "Daily totals only"],
    correctAnswer: 1,
    explanation: "15-minute trend intervals align with UK half-hourly utility metering and provide sufficient resolution for energy analysis whilst managing data storage requirements. Critical points may warrant shorter intervals; less critical points may use longer intervals."
  },
  {
    id: 3,
    question: "A BMS dashboard shows cooling energy significantly higher than predicted. The most likely FDD rule to trigger would detect:",
    options: [
      "Low lighting levels",
      "Simultaneous heating and cooling operation",
      "Fire alarm activation",
      "Lift motor overload"
    ],
    correctAnswer: 1,
    explanation: "Simultaneous heating and cooling is a common fault detectable by FDD rules. When heating and cooling systems operate concurrently in the same zone (due to conflicting setpoints or faulty controls), significant energy is wasted fighting against each other."
  },
  {
    id: 4,
    question: "Which analytics technique compares current building performance against a baseline model adjusted for weather?",
    options: [
      "Simple trending",
      "Cumulative Sum (CUSUM) analysis",
      "Alarm logging",
      "Equipment scheduling"
    ],
    correctAnswer: 1,
    explanation: "CUSUM analysis compares actual consumption against a weather-adjusted baseline model, accumulating the differences over time. This technique quickly identifies when performance deviates from expected patterns, even when daily variations might mask the change."
  },
  {
    id: 5,
    question: "The NABERS rating system originated in which country?",
    options: [
      "United Kingdom",
      "United States",
      "Australia",
      "Canada"
    ],
    correctAnswer: 2,
    explanation: "NABERS (National Australian Built Environment Rating System) was developed in Australia and has been adapted for use in other countries including the UK (NABERS UK). It rates actual building performance based on measured operational data rather than design predictions."
  },
  {
    id: 6,
    question: "What percentage energy saving is typically achievable through continuous commissioning of an existing building?",
    options: [
      "1-5%",
      "5-15%",
      "10-30%",
      "50-70%"
    ],
    correctAnswer: 2,
    explanation: "Continuous commissioning typically achieves 10-30% energy savings in existing buildings by identifying and correcting operational issues, optimising setpoints, and ensuring systems operate as intended. Savings depend on building age, complexity, and existing maintenance quality."
  },
  {
    id: 7,
    question: "Which FDD approach uses predefined logical rules based on engineering knowledge?",
    options: [
      "Machine learning FDD",
      "Neural network FDD",
      "Rule-based FDD",
      "Statistical FDD"
    ],
    correctAnswer: 2,
    explanation: "Rule-based FDD uses expert-defined logical rules such as 'if outdoor air temperature is below 15°C and chiller is running, flag as potential fault'. These rules are transparent and easy to understand, though they require engineering expertise to develop."
  },
  {
    id: 8,
    question: "A building analytics platform integrates data from which sources?",
    options: [
      "BMS only",
      "Utility meters only",
      "BMS, utility meters, weather data, occupancy systems, and IoT sensors",
      "Fire alarm systems only"
    ],
    correctAnswer: 2,
    explanation: "Modern building analytics platforms integrate multiple data sources including BMS, utility sub-meters, weather feeds, occupancy/access control, IoT sensors, and maintenance systems. This holistic view enables comprehensive performance analysis and cross-system optimisation."
  },
  {
    id: 9,
    question: "The UK Display Energy Certificate uses which metric to express building energy performance?",
    options: [
      "kW peak demand",
      "kWh/m²/year (energy use intensity)",
      "Percentage efficiency",
      "Carbon intensity only"
    ],
    correctAnswer: 1,
    explanation: "DECs express building energy performance as energy use intensity (EUI) in kWh/m²/year, which normalises consumption by floor area. This allows fair comparison between buildings of different sizes and is converted to an A-G rating scale."
  },
  {
    id: 10,
    question: "Which visualisation technique best shows how energy consumption varies with outdoor temperature?",
    options: [
      "Pie chart",
      "Bar chart of monthly totals",
      "Scatter plot with regression line",
      "Single number display"
    ],
    correctAnswer: 2,
    explanation: "A scatter plot with energy consumption on the Y-axis and outdoor temperature on the X-axis reveals the building's weather dependence. The regression line shows the expected relationship, whilst outliers indicate potential faults or operational anomalies."
  },
  {
    id: 11,
    question: "Automated fault detection typically prioritises faults by:",
    options: [
      "Alphabetical order",
      "Date discovered only",
      "Energy impact, comfort impact, and equipment risk",
      "Random selection"
    ],
    correctAnswer: 2,
    explanation: "Effective FDD systems prioritise faults by their impact - energy cost, occupant comfort, and equipment degradation risk. This ensures maintenance resources address the most significant issues first, maximising return on corrective action investment."
  },
  {
    id: 12,
    question: "What is the recommended frequency for reviewing BMS energy dashboards in a well-managed building?",
    options: [
      "Annually during audits",
      "Monthly at minimum",
      "Daily or weekly for key metrics",
      "Only when problems are reported"
    ],
    correctAnswer: 2,
    explanation: "Effective energy management requires regular dashboard review - daily for critical metrics, weekly for trends, and monthly for detailed analysis. Frequent review enables rapid detection of issues before they cause significant energy waste or equipment damage."
  }
];

const faqs = [
  {
    question: "How do I justify the cost of implementing a building analytics platform?",
    answer: "Build the business case around multiple value streams: energy savings (typically 10-30%), maintenance cost reduction through predictive insights, extended equipment life, improved occupant comfort and productivity, and reduced carbon emissions for sustainability reporting. Calculate simple payback based on energy savings alone (often 1-3 years), then add qualitative benefits. Reference case studies from similar buildings and consider starting with a pilot zone to demonstrate value before full deployment."
  },
  {
    question: "What data points are essential for effective energy monitoring?",
    answer: "Essential points include: main incoming electricity (kWh, kW, power factor), gas consumption, major plant sub-meters (chillers, boilers, AHUs), lighting circuits by floor or zone, plug load samples, outdoor temperature and humidity, key space temperatures, and occupancy indicators. Ensure all meters communicate via BACnet, Modbus, or pulse outputs to the BMS, with timestamps synchronised across all systems."
  },
  {
    question: "How do I differentiate between rule-based and machine learning FDD?",
    answer: "Rule-based FDD uses predefined engineering rules (e.g., 'flag if cooling and heating simultaneously active') - transparent but requires expert rule development for each fault type. Machine learning FDD learns normal patterns from historical data and flags deviations - adapts automatically but can be a 'black box' and may generate false positives during unusual but valid operation. Many systems now combine both approaches for optimal results."
  },
  {
    question: "What is the difference between EPC and DEC ratings in the UK?",
    answer: "An Energy Performance Certificate (EPC) rates theoretical performance based on building design and is required at construction, sale, or lease. A Display Energy Certificate (DEC) rates actual operational performance based on measured energy use over 12 months and is required for public buildings over 250m². EPCs show potential; DECs show reality - the performance gap between them highlights operational improvement opportunities."
  },
  {
    question: "How often should continuous commissioning activities occur?",
    answer: "Continuous commissioning is ongoing, not periodic. Daily automated monitoring via analytics/FDD should run continuously. Weekly review of dashboard metrics and fault reports by facilities staff. Monthly detailed analysis of trends, energy reports, and comfort complaints. Quarterly review of control sequences and setpoints with seasonal adjustments. Annual comprehensive review with benchmark comparisons. Major recommissioning every 3-5 years or following significant changes."
  },
  {
    question: "What qualifications are needed to interpret building analytics data?",
    answer: "Effective interpretation requires understanding of HVAC systems and control logic, familiarity with BMS operation and common fault patterns, basic data analysis skills (trending, statistics), and knowledge of building physics and energy flows. Training is available through CIBSE, BSRIA, and analytics platform vendors. Consider building internal capability alongside external specialist support for complex analysis."
  }
];

const HNCModule8Section5_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Settings className="h-4 w-4" />
            <span>Module 8.5.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            System Optimisation
          </h1>
          <p className="text-white/80">
            Energy monitoring, fault detection, performance analytics and continuous commissioning
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Energy monitoring:</strong> Sub-metering and dashboards track consumption</li>
              <li className="pl-1"><strong>FDD:</strong> Automated detection of faults and inefficiencies</li>
              <li className="pl-1"><strong>Analytics:</strong> Data-driven insights for optimisation</li>
              <li className="pl-1"><strong>CCx:</strong> Ongoing commissioning maintains performance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CCx savings:</strong> 10-30% energy reduction typical</li>
              <li className="pl-1"><strong>FDD detection:</strong> Identifies 60-80% of operational faults</li>
              <li className="pl-1"><strong>NABERS/DEC:</strong> Operational performance ratings</li>
              <li className="pl-1"><strong>Payback:</strong> Analytics platforms 1-3 years typical</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Design effective energy monitoring and sub-metering strategies",
              "Configure BMS dashboards for operational insight",
              "Implement fault detection and diagnostics (FDD) systems",
              "Apply analytics techniques for performance trending",
              "Establish continuous commissioning (CCx) programmes",
              "Understand NABERS and DEC rating methodologies"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Energy Monitoring and Dashboards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Energy Monitoring and Dashboards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective energy management requires comprehensive monitoring systems that capture consumption
              data at appropriate granularity. Modern BMS platforms provide sophisticated dashboards that
              transform raw data into actionable insights for building operators.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Sub-Metering Hierarchy:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Level 1 - Main incoming:</strong> Fiscal meters at utility supply point</li>
                <li className="pl-1"><strong>Level 2 - Building/zone:</strong> Major distribution boards, tenant areas</li>
                <li className="pl-1"><strong>Level 3 - System:</strong> HVAC plant, lighting circuits, lifts</li>
                <li className="pl-1"><strong>Level 4 - Equipment:</strong> Individual AHUs, chillers, pumps</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sub-Metering Strategy Guide</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Coverage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cost/Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Level 1</td>
                      <td className="border border-white/10 px-3 py-2">100% of supply</td>
                      <td className="border border-white/10 px-3 py-2">Billing, overall tracking</td>
                      <td className="border border-white/10 px-3 py-2">Essential - mandatory</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Level 2</td>
                      <td className="border border-white/10 px-3 py-2">80-90% of load</td>
                      <td className="border border-white/10 px-3 py-2">Zone allocation, tenant billing</td>
                      <td className="border border-white/10 px-3 py-2">High value - recommended</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Level 3</td>
                      <td className="border border-white/10 px-3 py-2">60-80% of load</td>
                      <td className="border border-white/10 px-3 py-2">System benchmarking, M&amp;V</td>
                      <td className="border border-white/10 px-3 py-2">Good value for large systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Level 4</td>
                      <td className="border border-white/10 px-3 py-2">Critical equipment</td>
                      <td className="border border-white/10 px-3 py-2">Fault detection, optimisation</td>
                      <td className="border border-white/10 px-3 py-2">Selective - high-value plant</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dashboard Design Principles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Executive summary:</strong> Top-level KPIs visible at a glance (EUI, cost, carbon)</li>
                <li className="pl-1"><strong>Drill-down capability:</strong> From building to system to equipment level</li>
                <li className="pl-1"><strong>Comparative views:</strong> Actual vs target, this year vs last year, building vs benchmark</li>
                <li className="pl-1"><strong>Trend visualisation:</strong> Time-series charts showing patterns and anomalies</li>
                <li className="pl-1"><strong>Alert integration:</strong> Traffic light indicators for out-of-range conditions</li>
                <li className="pl-1"><strong>Mobile accessibility:</strong> Responsive design for on-site viewing</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Key Dashboard Metrics</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Energy Use Intensity (EUI):</span> <span className="text-white">kWh/m²/year - normalised consumption</span></p>
                <p><span className="text-white/60">Peak Demand:</span> <span className="text-white">kW maximum - capacity and charges</span></p>
                <p><span className="text-white/60">Power Factor:</span> <span className="text-white">Target &gt; 0.95 - reactive charges</span></p>
                <p><span className="text-white/60">Base Load Ratio:</span> <span className="text-white">Night/day consumption - identifies waste</span></p>
                <p><span className="text-white/60">Carbon Intensity:</span> <span className="text-white">kgCO₂/m² - sustainability reporting</span></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Implement automatic meter validation to flag missing data, negative readings, and implausible values before they corrupt analysis.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Fault Detection and Diagnostics */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fault Detection and Diagnostics (FDD)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fault Detection and Diagnostics (FDD) software automatically analyses BMS data to identify
              equipment faults, control sequence errors, and operational inefficiencies. FDD can detect
              issues that would otherwise go unnoticed until causing significant energy waste or equipment failure.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Rule-Based FDD</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Predefined engineering rules</li>
                  <li className="pl-1">Transparent logic - easy to understand</li>
                  <li className="pl-1">Requires expert rule development</li>
                  <li className="pl-1">Limited to anticipated fault modes</li>
                  <li className="pl-1">Example: "If OAT &lt; 15°C AND chiller ON, flag"</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Machine Learning FDD</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Learns normal patterns from data</li>
                  <li className="pl-1">Adapts to building-specific behaviour</li>
                  <li className="pl-1">Can detect novel fault patterns</li>
                  <li className="pl-1">Requires training data period</li>
                  <li className="pl-1">May generate false positives initially</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common FDD Rules for HVAC Systems</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Fault Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Detection Rule</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Energy Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Simultaneous heating/cooling</td>
                      <td className="border border-white/10 px-3 py-2">Heating AND cooling active in same zone</td>
                      <td className="border border-white/10 px-3 py-2">High - systems fight each other</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Economiser not working</td>
                      <td className="border border-white/10 px-3 py-2">OAT favourable but dampers at minimum</td>
                      <td className="border border-white/10 px-3 py-2">Moderate - missed free cooling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stuck valve</td>
                      <td className="border border-white/10 px-3 py-2">Valve command changes but output unchanged</td>
                      <td className="border border-white/10 px-3 py-2">Variable - depends on stuck position</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sensor drift</td>
                      <td className="border border-white/10 px-3 py-2">Sensor reading implausible vs related sensors</td>
                      <td className="border border-white/10 px-3 py-2">High - incorrect control decisions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Schedule mismatch</td>
                      <td className="border border-white/10 px-3 py-2">Equipment running outside occupied hours</td>
                      <td className="border border-white/10 px-3 py-2">Moderate - unnecessary runtime</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">FDD Implementation Steps</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Data audit:</strong> Verify BMS trending captures required points at sufficient intervals</li>
                <li className="pl-1"><strong>Rule configuration:</strong> Select and tune rules for building systems and climate</li>
                <li className="pl-1"><strong>Threshold setting:</strong> Balance sensitivity (catch faults) vs specificity (avoid false alarms)</li>
                <li className="pl-1"><strong>Prioritisation logic:</strong> Rank faults by energy impact, comfort impact, and urgency</li>
                <li className="pl-1"><strong>Integration:</strong> Link to CAFM/maintenance systems for work order generation</li>
                <li className="pl-1"><strong>Feedback loop:</strong> Capture resolution data to improve detection accuracy</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">FDD Benefits Quantified</p>
              <ul className="text-sm text-white space-y-1">
                <li>Energy savings: 5-15% from fault correction</li>
                <li>Maintenance efficiency: 30-40% reduction in reactive calls</li>
                <li>Equipment life: Extended through early problem detection</li>
                <li>Comfort complaints: 50-70% reduction through proactive response</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Implementation tip:</strong> Start with a limited rule set focused on high-impact faults, then expand as the team builds confidence with the system.
            </p>
          </div>
        </section>

        {/* Section 3: Performance Analytics and Trending */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Performance Analytics and Trending
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building analytics transforms raw operational data into insights that drive optimisation
              decisions. Advanced analytics techniques reveal patterns, predict problems, and benchmark
              performance against targets and similar buildings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Analytics Techniques</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Technique</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Insight Provided</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Time-series trending</td>
                      <td className="border border-white/10 px-3 py-2">Any measured parameter</td>
                      <td className="border border-white/10 px-3 py-2">Patterns, anomalies, seasonality</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Regression analysis</td>
                      <td className="border border-white/10 px-3 py-2">Energy vs weather/occupancy</td>
                      <td className="border border-white/10 px-3 py-2">Weather normalisation, baseline models</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CUSUM analysis</td>
                      <td className="border border-white/10 px-3 py-2">Cumulative variance tracking</td>
                      <td className="border border-white/10 px-3 py-2">Performance drift detection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Load duration curves</td>
                      <td className="border border-white/10 px-3 py-2">Demand analysis</td>
                      <td className="border border-white/10 px-3 py-2">Base load, peak shaving opportunities</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Carpet plots (heat maps)</td>
                      <td className="border border-white/10 px-3 py-2">Hour-by-day visualisation</td>
                      <td className="border border-white/10 px-3 py-2">Schedule effectiveness, weekend operation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">CUSUM Analysis Example</p>
              <div className="font-mono text-sm space-y-1">
                <p className="text-white/60">Purpose: Detect when performance deviates from baseline</p>
                <p className="mt-2"><span className="text-white">Baseline model:</span> <span className="text-white/80">kWh = 1,500 + (25 × HDD)</span></p>
                <p><span className="text-white">Week 1 actual:</span> <span className="text-white/80">2,100 kWh, HDD = 20</span></p>
                <p><span className="text-white">Week 1 predicted:</span> <span className="text-white/80">1,500 + (25 × 20) = 2,000 kWh</span></p>
                <p><span className="text-white">Week 1 variance:</span> <span className="text-white/80">2,100 - 2,000 = +100 kWh</span></p>
                <p><span className="text-white">CUSUM after W1:</span> <span className="text-white/80">+100 kWh</span></p>
                <p className="mt-2 text-white/60">Accumulate weekly variances - rising CUSUM indicates degradation</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Analytics Platform Features</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Data Integration</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>BMS via BACnet/Modbus/API</li>
                    <li>Utility meters (AMR/smart meters)</li>
                    <li>Weather data feeds</li>
                    <li>Occupancy/access control systems</li>
                    <li>IoT sensors and sub-meters</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Analysis Capabilities</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Automated benchmarking</li>
                    <li>Fault detection and diagnostics</li>
                    <li>Energy modelling and M&amp;V</li>
                    <li>Comfort monitoring</li>
                    <li>Predictive maintenance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Benchmarking Comparisons:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Internal:</strong> Same building year-on-year, adjusted for weather</li>
                <li className="pl-1"><strong>Portfolio:</strong> Compare similar buildings within organisation</li>
                <li className="pl-1"><strong>Industry:</strong> CIBSE TM46 benchmarks by building type</li>
                <li className="pl-1"><strong>Best practice:</strong> BREEAM/LEED exemplar performance targets</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Analytics insight:</strong> A scatter plot of energy vs outdoor temperature should show a clear V-shape for buildings with heating and cooling - deviations indicate control or operational issues.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Continuous Commissioning and Ratings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Continuous Commissioning and Performance Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Continuous commissioning (CCx) extends the benefits of initial commissioning throughout
              the building lifecycle. Combined with formal performance ratings like NABERS and DEC,
              CCx provides a framework for sustained operational excellence.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Types Compared</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Timing</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Focus</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Initial (Cx)</td>
                      <td className="border border-white/10 px-3 py-2">Construction/handover</td>
                      <td className="border border-white/10 px-3 py-2">Design intent verification</td>
                      <td className="border border-white/10 px-3 py-2">Baseline establishment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retro-commissioning (RCx)</td>
                      <td className="border border-white/10 px-3 py-2">Existing buildings</td>
                      <td className="border border-white/10 px-3 py-2">Restoring performance</td>
                      <td className="border border-white/10 px-3 py-2">10-20%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Re-commissioning</td>
                      <td className="border border-white/10 px-3 py-2">Periodic (3-5 years)</td>
                      <td className="border border-white/10 px-3 py-2">Performance recovery</td>
                      <td className="border border-white/10 px-3 py-2">5-15%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Continuous (CCx)</td>
                      <td className="border border-white/10 px-3 py-2">Ongoing</td>
                      <td className="border border-white/10 px-3 py-2">Sustained optimisation</td>
                      <td className="border border-white/10 px-3 py-2">10-30%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CCx Programme Elements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Monitoring infrastructure:</strong> Comprehensive sub-metering and BMS trending</li>
                <li className="pl-1"><strong>Analytics platform:</strong> FDD, dashboards, and reporting tools</li>
                <li className="pl-1"><strong>Review cadence:</strong> Daily monitoring, weekly analysis, monthly reporting</li>
                <li className="pl-1"><strong>Skilled resources:</strong> Trained operators with analytics interpretation skills</li>
                <li className="pl-1"><strong>Action tracking:</strong> Fault logging, work orders, and resolution verification</li>
                <li className="pl-1"><strong>Continuous improvement:</strong> Regular setpoint optimisation and sequence tuning</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm font-medium text-green-400 mb-2">NABERS UK Rating</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">1-6 star scale (6 = best)</li>
                  <li className="pl-1">Based on 12 months operational data</li>
                  <li className="pl-1">Weather and hours normalised</li>
                  <li className="pl-1">Separate base building and tenancy ratings</li>
                  <li className="pl-1">Growing adoption in UK commercial sector</li>
                  <li className="pl-1">Links to Design for Performance framework</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="text-sm font-medium text-blue-400 mb-2">Display Energy Certificate (DEC)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">A-G scale (A = best)</li>
                  <li className="pl-1">Mandatory for public buildings &gt; 250m²</li>
                  <li className="pl-1">Based on actual energy consumption</li>
                  <li className="pl-1">Displayed prominently in building</li>
                  <li className="pl-1">Renewed annually</li>
                  <li className="pl-1">Advisory report identifies improvements</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DEC Rating Calculation</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: Calculate building energy use</p>
                <p className="ml-4">Total kWh = Electricity kWh + (Gas kWh × 1.0)</p>
                <p className="mt-2 text-white/60">Step 2: Calculate energy use intensity</p>
                <p className="ml-4">EUI = Total kWh ÷ Gross Internal Area (m²)</p>
                <p className="mt-2 text-white/60">Step 3: Compare to benchmark</p>
                <p className="ml-4">Operational Rating = (EUI ÷ Benchmark EUI) × 100</p>
                <p className="mt-2 text-white/60">Step 4: Convert to letter grade</p>
                <p className="ml-4">A = 0-25, B = 26-50, C = 51-75, D = 76-100</p>
                <p className="ml-4">E = 101-125, F = 126-150, G = &gt; 150</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common CCx Issues to Address</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Schedule creep:</strong> Operating hours extended beyond occupancy requirements</li>
                <li className="pl-1"><strong>Setpoint drift:</strong> Temperatures adjusted for complaints not reset</li>
                <li className="pl-1"><strong>Override accumulation:</strong> Manual overrides left in place permanently</li>
                <li className="pl-1"><strong>Sensor degradation:</strong> Calibration drift causing incorrect control</li>
                <li className="pl-1"><strong>Sequence bypass:</strong> Optimisation routines disabled for troubleshooting</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Performance principle:</strong> Buildings rarely maintain their as-commissioned efficiency without active management. CCx addresses the natural tendency for performance to degrade over time through operational drift, equipment wear, and changing use patterns.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Sub-Metering Coverage Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Determine sub-metering coverage for a 5,000m² office building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Main meter reading:</p>
                <p className="ml-4">Total building consumption: 850,000 kWh/year</p>
                <p className="mt-2 text-white/60">Sub-meter readings:</p>
                <p className="ml-4">Chiller plant: 280,000 kWh (33%)</p>
                <p className="ml-4">AHU/FCU motors: 85,000 kWh (10%)</p>
                <p className="ml-4">Lighting floors 1-3: 120,000 kWh (14%)</p>
                <p className="ml-4">Lifts: 35,000 kWh (4%)</p>
                <p className="ml-4">Small power/unmetered: 330,000 kWh (39%)</p>
                <p className="mt-2 text-white/60">Coverage calculation:</p>
                <p className="ml-4">Metered load: 280k + 85k + 120k + 35k = 520,000 kWh</p>
                <p className="ml-4">Coverage: 520,000 ÷ 850,000 = 61%</p>
                <p className="mt-2 text-green-400">Recommendation: Add small power sampling (5-10 circuits)</p>
                <p className="text-green-400">and tenant meters to achieve 80% coverage target</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: FDD Energy Impact Prioritisation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Prioritise three detected faults by energy impact.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Fault A - Simultaneous heating/cooling:</p>
                <p className="ml-4">Duration: 8 hours/day × 5 days × 40 weeks = 1,600 hours</p>
                <p className="ml-4">Wasted capacity: 15 kW heating + 12 kW cooling = 27 kW</p>
                <p className="ml-4">Annual waste: 27 kW × 1,600 h = 43,200 kWh = £12,960</p>
                <p className="mt-2 text-white/60">Fault B - Economiser disabled:</p>
                <p className="ml-4">Free cooling hours lost: 800 hours/year</p>
                <p className="ml-4">Additional chiller load: 25 kW</p>
                <p className="ml-4">Annual waste: 25 kW × 800 h = 20,000 kWh = £6,000</p>
                <p className="mt-2 text-white/60">Fault C - Out-of-hours operation:</p>
                <p className="ml-4">Unnecessary runtime: 2 hours/day × 250 days = 500 hours</p>
                <p className="ml-4">System load: 8 kW</p>
                <p className="ml-4">Annual waste: 8 kW × 500 h = 4,000 kWh = £1,200</p>
                <p className="mt-2 text-green-400">Priority ranking: Fault A &gt; Fault B &gt; Fault C</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: DEC Rating Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate DEC rating for a public building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Building data:</p>
                <p className="ml-4">Gross internal area: 2,500 m²</p>
                <p className="ml-4">Building type: General office</p>
                <p className="ml-4">Electricity: 425,000 kWh/year</p>
                <p className="ml-4">Gas: 180,000 kWh/year</p>
                <p className="mt-2 text-white/60">Step 1 - Total energy:</p>
                <p className="ml-4">Total = 425,000 + 180,000 = 605,000 kWh/year</p>
                <p className="mt-2 text-white/60">Step 2 - Energy Use Intensity:</p>
                <p className="ml-4">EUI = 605,000 ÷ 2,500 = 242 kWh/m²/year</p>
                <p className="mt-2 text-white/60">Step 3 - Compare to benchmark (TM46):</p>
                <p className="ml-4">General office benchmark: 210 kWh/m²/year</p>
                <p className="ml-4">Operational Rating = (242 ÷ 210) × 100 = 115</p>
                <p className="mt-2 text-white/60">Step 4 - DEC grade:</p>
                <p className="ml-4">Rating 115 falls in range 101-125</p>
                <p className="mt-2 text-green-400">DEC Rating: E (Advisory report required)</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">System Optimisation Implementation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Audit existing metering and identify gaps against 80% coverage target</li>
                <li className="pl-1">Configure BMS trending for key points at 15-minute intervals minimum</li>
                <li className="pl-1">Implement energy dashboards with drill-down capability</li>
                <li className="pl-1">Deploy FDD rules starting with high-impact fault types</li>
                <li className="pl-1">Establish review cadence: daily monitoring, weekly analysis, monthly reports</li>
                <li className="pl-1">Train operations staff on analytics interpretation and response</li>
                <li className="pl-1">Link fault detection to maintenance work order system</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Sub-metering coverage target: <strong>80%</strong> of total consumption</li>
                <li className="pl-1">Trend logging interval: <strong>15 minutes</strong> standard</li>
                <li className="pl-1">FDD detection rate: <strong>60-80%</strong> of operational faults</li>
                <li className="pl-1">CCx savings potential: <strong>10-30%</strong> of baseline</li>
                <li className="pl-1">DEC renewal: <strong>Annual</strong> for public buildings</li>
                <li className="pl-1">NABERS stars: <strong>4+</strong> considered good performance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Data overload:</strong> Trending everything without analysis capacity</li>
                <li className="pl-1"><strong>Alert fatigue:</strong> Too many low-priority alarms desensitise operators</li>
                <li className="pl-1"><strong>No action loop:</strong> Detecting faults without resolution tracking</li>
                <li className="pl-1"><strong>Static thresholds:</strong> Not adjusting FDD rules for seasonal changes</li>
                <li className="pl-1"><strong>Ignoring base load:</strong> Focusing on peaks whilst night consumption drifts</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Sub-Metering Levels</p>
                <ul className="space-y-0.5">
                  <li>Level 1: Main incoming - 100% (mandatory)</li>
                  <li>Level 2: Building/zone - 80-90%</li>
                  <li>Level 3: System/end-use - 60-80%</li>
                  <li>Level 4: Equipment - critical items</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">DEC Ratings</p>
                <ul className="space-y-0.5">
                  <li>A: 0-25 (excellent)</li>
                  <li>B: 26-50, C: 51-75, D: 76-100</li>
                  <li>E: 101-125, F: 126-150</li>
                  <li>G: &gt; 150 (poor)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">FDD Approaches</p>
                <ul className="space-y-0.5">
                  <li>Rule-based: Expert logic, transparent</li>
                  <li>Machine learning: Data-driven, adaptive</li>
                  <li>Hybrid: Combined for best results</li>
                  <li>Prioritise by energy/comfort impact</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">CCx Review Cadence</p>
                <ul className="space-y-0.5">
                  <li>Daily: Automated FDD monitoring</li>
                  <li>Weekly: Dashboard review, fault triage</li>
                  <li>Monthly: Detailed analysis, reporting</li>
                  <li>Quarterly: Setpoint optimisation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section6-1">
              Next: Section 6.1
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section5_6;
