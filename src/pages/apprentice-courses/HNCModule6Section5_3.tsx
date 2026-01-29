import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Monitoring and Targeting - HNC Module 6 Section 5.3";
const DESCRIPTION = "Master Monitoring and Targeting (M&T) for energy management: degree day analysis, cusum charts, weather normalisation, regression analysis, exception reporting, and performance tracking systems.";

const quickCheckQuestions = [
  {
    id: "mt-definition",
    question: "What is the primary purpose of Monitoring and Targeting (M&T)?",
    options: ["To measure electricity consumption only", "To compare actual energy use against expected performance and identify variances", "To calculate utility bills", "To design heating systems"],
    correctIndex: 1,
    explanation: "M&T compares actual energy consumption against expected performance targets, identifies variances, and enables corrective action to improve energy efficiency."
  },
  {
    id: "degree-day-purpose",
    question: "Why are degree days used in energy analysis?",
    options: ["To measure indoor temperature", "To calculate electricity tariffs", "To normalise energy consumption for weather variations", "To determine ventilation rates"],
    correctIndex: 2,
    explanation: "Degree days provide a method to normalise heating or cooling energy consumption for weather variations, enabling fair comparison between different periods regardless of outdoor conditions."
  },
  {
    id: "cusum-interpretation",
    question: "On a cusum chart, a downward slope indicates:",
    options: ["Increasing energy consumption", "Performance better than target", "Equipment failure", "Rising outdoor temperatures"],
    correctIndex: 1,
    explanation: "A downward slope on a cusum chart indicates that actual consumption is consistently below target (negative variances accumulating), meaning performance is better than expected."
  },
  {
    id: "exception-reporting",
    question: "What triggers an exception report in an M&T system?",
    options: ["Normal energy consumption patterns", "Variance exceeding predetermined threshold limits", "Monthly billing cycles", "Annual energy reviews"],
    correctIndex: 1,
    explanation: "Exception reports are triggered when actual consumption deviates from expected values by more than predetermined threshold limits, highlighting potential problems requiring investigation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A building has a base temperature of 15.5°C. If the mean daily outdoor temperature is 8°C, how many heating degree days occurred?",
    options: [
      "8 degree days",
      "7.5 degree days",
      "15.5 degree days",
      "23.5 degree days"
    ],
    correctAnswer: 1,
    explanation: "Heating degree days = Base temperature - Mean outdoor temperature = 15.5°C - 8°C = 7.5 degree days. This represents the heating requirement for that day."
  },
  {
    id: 2,
    question: "In regression analysis of energy consumption, the y-intercept of the performance line represents:",
    options: ["Weather-dependent consumption", "Base load consumption", "Peak demand", "Degree day total"],
    correctAnswer: 1,
    explanation: "The y-intercept represents the base load - energy consumption that occurs regardless of weather, such as lighting, equipment, domestic hot water, and other non-heating/cooling loads."
  },
  {
    id: 3,
    question: "Which formula correctly describes the standard performance line equation?",
    options: [
      "Energy = Base load × Degree days",
      "Energy = (Slope × Degree days) + Base load",
      "Energy = Degree days ÷ Base load",
      "Energy = Base load - (Slope × Degree days)"
    ],
    correctAnswer: 1,
    explanation: "The performance line equation is E = (m × DD) + c, where E is energy, m is the slope (weather sensitivity), DD is degree days, and c is the base load (y-intercept)."
  },
  {
    id: 4,
    question: "A cusum chart shows a sudden upward step change in the line. This most likely indicates:",
    options: [
      "Gradual equipment degradation",
      "A specific event causing increased consumption (e.g., new equipment, system fault)",
      "Seasonal weather variation",
      "Normal operating conditions"
    ],
    correctAnswer: 1,
    explanation: "A sudden step change in a cusum chart indicates a discrete event occurred at that point - perhaps equipment failure, new plant installation, occupancy change, or control system malfunction."
  },
  {
    id: 5,
    question: "What base temperature is typically used for UK heating degree day calculations?",
    options: [
      "18°C",
      "20°C",
      "15.5°C",
      "12°C"
    ],
    correctAnswer: 2,
    explanation: "The UK standard base temperature for heating degree days is 15.5°C. This assumes internal heat gains (people, equipment, solar) reduce the heating requirement, so heating is only needed when outdoor temperature falls below this threshold."
  },
  {
    id: 6,
    question: "Exception reporting thresholds are typically set at:",
    options: [
      "Any deviation from target",
      "5-10% variance from expected values",
      "50% variance from expected values",
      "Only when consumption doubles"
    ],
    correctAnswer: 1,
    explanation: "Exception thresholds are typically set at 5-10% variance from expected performance. This captures significant deviations while avoiding false alarms from minor measurement variations or normal operational fluctuations."
  },
  {
    id: 7,
    question: "The slope of a performance line (energy vs degree days) represents:",
    options: [
      "Base load consumption",
      "Building thermal performance (weather sensitivity)",
      "Total annual consumption",
      "Occupancy hours"
    ],
    correctAnswer: 1,
    explanation: "The slope represents the building's thermal performance or weather sensitivity - how much additional energy is required per degree day. A steeper slope indicates poorer insulation or higher ventilation losses."
  },
  {
    id: 8,
    question: "Which action should follow identification of an exception in M&T analysis?",
    options: [
      "Immediately replace all equipment",
      "Investigation to identify root cause before taking action",
      "Ignore if less than 20% variance",
      "Adjust the target to match actual consumption"
    ],
    correctAnswer: 1,
    explanation: "Exceptions require investigation to identify the root cause - is it a meter fault, operational change, equipment problem, or genuine efficiency loss? Only after understanding the cause can appropriate corrective action be determined."
  },
  {
    id: 9,
    question: "A building's performance line shows: E = 2.5DD + 1,200 (kWh). For a month with 300 degree days, expected consumption is:",
    options: [
      "750 kWh",
      "1,200 kWh",
      "1,950 kWh",
      "3,600 kWh"
    ],
    correctAnswer: 2,
    explanation: "Expected consumption = (2.5 × 300) + 1,200 = 750 + 1,200 = 1,950 kWh. The 750 kWh is weather-dependent heating, and 1,200 kWh is the base load."
  },
  {
    id: 10,
    question: "What does R² (coefficient of determination) indicate in regression analysis?",
    options: [
      "The base load value",
      "The percentage of consumption variation explained by degree days",
      "The number of data points",
      "The target consumption level"
    ],
    correctAnswer: 1,
    explanation: "R² indicates how well the regression line fits the data - specifically, the proportion of energy consumption variation that can be explained by degree day variation. Values above 0.9 indicate good correlation."
  },
  {
    id: 11,
    question: "Which meter data frequency is typically recommended for effective M&T?",
    options: [
      "Annual readings only",
      "Quarterly readings",
      "Weekly or more frequent readings",
      "Monthly is always sufficient"
    ],
    correctAnswer: 2,
    explanation: "Weekly or more frequent readings (ideally half-hourly from smart meters) enable timely identification of problems. Annual or quarterly data may detect long-term trends but cannot identify issues quickly enough for effective intervention."
  },
  {
    id: 12,
    question: "When establishing a baseline for M&T, what period should typically be used?",
    options: [
      "One week of data",
      "One month of data",
      "At least 12 months to capture seasonal variations",
      "The previous day only"
    ],
    correctAnswer: 2,
    explanation: "A minimum of 12 months of baseline data is needed to capture full seasonal variation, occupancy patterns, and establish reliable performance lines that account for all operating conditions throughout the year."
  }
];

const faqs = [
  {
    question: "What is the difference between monitoring and targeting?",
    answer: "Monitoring is the systematic collection and analysis of energy consumption data over time. Targeting adds the comparative element - setting expected performance levels and comparing actual consumption against these targets. Together, M&T enables identification of variances and drives corrective action. Without targets, monitoring alone shows consumption patterns but cannot identify whether performance is good or poor."
  },
  {
    question: "How do I choose the correct base temperature for degree day analysis?",
    answer: "The standard UK base temperature is 15.5°C for heating. However, the optimal base temperature varies by building type. Buildings with high internal heat gains (offices, retail) may have lower base temperatures (14-15°C), while naturally ventilated or poorly insulated buildings may need higher values (16-17°C). The correct base temperature gives the highest R² correlation when plotting energy against degree days."
  },
  {
    question: "Why might a performance line show poor correlation (low R²)?",
    answer: "Poor correlation can result from: mixed fuel use not separately metered; significant non-weather-dependent loads dominating consumption; variable occupancy or operating hours; incorrect base temperature selection; meter reading errors or estimated readings; building with multiple heating zones on different schedules; or process loads that vary independently of weather."
  },
  {
    question: "How often should M&T reports be reviewed?",
    answer: "Exception reports should be reviewed weekly to enable prompt corrective action. Performance summaries should be reviewed monthly for management reporting. Cusum charts and trend analysis should be reviewed quarterly to identify gradual changes. Full baseline reviews should occur annually or when significant changes occur (refurbishment, occupancy change, new equipment)."
  },
  {
    question: "What actions can result from M&T exception reports?",
    answer: "Actions range from simple operational corrections (resetting time clocks, closing windows, adjusting set points) to maintenance interventions (fixing faulty controls, replacing failed components) to capital investment (upgrading inefficient equipment, improving insulation). The key is investigating to find root causes rather than simply noting the exception."
  },
  {
    question: "How does M&T support ISO 50001 energy management?",
    answer: "M&T directly supports ISO 50001 requirements for: establishing energy baselines (Clause 4.4.4); setting energy performance indicators and targets (Clause 4.4.5); monitoring and measurement (Clause 4.6.1); and continual improvement through the Plan-Do-Check-Act cycle. Cusum charts provide visual evidence of improvement trends for audit purposes."
  }
];

const HNCModule6Section5_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section5">
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
            <Zap className="h-4 w-4" />
            <span>Module 6.5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Monitoring and Targeting
          </h1>
          <p className="text-white/80">
            M&T principles, degree day analysis, cusum charts, exception reporting, and performance tracking systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>M&T:</strong> Compare actual vs expected energy performance</li>
              <li className="pl-1"><strong>Degree days:</strong> Weather normalisation for fair comparison</li>
              <li className="pl-1"><strong>Cusum charts:</strong> Visualise cumulative performance trends</li>
              <li className="pl-1"><strong>Exception reporting:</strong> Alert when variance exceeds threshold</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>UK base temp:</strong> 15.5°C for heating degree days</li>
              <li className="pl-1"><strong>Performance line:</strong> E = (m × DD) + c</li>
              <li className="pl-1"><strong>Threshold:</strong> Typically 5-10% variance</li>
              <li className="pl-1"><strong>Baseline:</strong> Minimum 12 months data</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain M&T principles and their role in energy management",
              "Apply degree day analysis for weather normalisation",
              "Construct and interpret performance lines using regression",
              "Create and analyse cusum charts to identify trends",
              "Design exception reporting systems with appropriate thresholds",
              "Establish baselines and set meaningful energy targets"
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

        {/* Section 1: M&T Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            M&T Fundamentals and Baseline Establishment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Monitoring and Targeting (M&T) is a systematic approach to energy management that
              compares actual consumption against expected performance. By establishing baselines,
              setting targets, and tracking variances, organisations can identify waste, verify
              savings, and drive continuous improvement in energy efficiency.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The M&T Process Cycle:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Monitor:</strong> Collect consumption data at appropriate intervals (weekly/daily/half-hourly)</li>
                <li className="pl-1"><strong>Normalise:</strong> Adjust for weather, occupancy, and production variations</li>
                <li className="pl-1"><strong>Compare:</strong> Assess actual performance against targets</li>
                <li className="pl-1"><strong>Report:</strong> Generate exception alerts when variances exceed thresholds</li>
                <li className="pl-1"><strong>Act:</strong> Investigate causes and implement corrective measures</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Baseline Establishment Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data period</td>
                      <td className="border border-white/10 px-3 py-2">Capture seasonal variation</td>
                      <td className="border border-white/10 px-3 py-2">12 months minimum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data quality</td>
                      <td className="border border-white/10 px-3 py-2">Reliable analysis</td>
                      <td className="border border-white/10 px-3 py-2">Actual readings, not estimates</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Weather data</td>
                      <td className="border border-white/10 px-3 py-2">Enable normalisation</td>
                      <td className="border border-white/10 px-3 py-2">Local degree day records</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Operating conditions</td>
                      <td className="border border-white/10 px-3 py-2">Context for analysis</td>
                      <td className="border border-white/10 px-3 py-2">Occupancy, hours, production data</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sub-metering</td>
                      <td className="border border-white/10 px-3 py-2">Identify specific loads</td>
                      <td className="border border-white/10 px-3 py-2">Separate heating, lighting, processes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> M&T answers "Are we using more or less energy than we should for the conditions?" rather than simply "How much energy did we use?"
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Degree Day Analysis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Degree Day Analysis and Weather Normalisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Degree days quantify the severity of weather and enable fair comparison of energy
              consumption across different periods. Without weather normalisation, comparing
              January's consumption to July's would be meaningless for heating analysis.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heating Degree Days (HDD)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">UK base temperature: 15.5°C</li>
                  <li className="pl-1">HDD = Base temp - Mean outdoor temp</li>
                  <li className="pl-1">Only counted when outdoor &lt; base</li>
                  <li className="pl-1">Higher HDD = more heating required</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cooling Degree Days (CDD)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Typical base: 18-22°C depending on building</li>
                  <li className="pl-1">CDD = Mean outdoor temp - Base temp</li>
                  <li className="pl-1">Only counted when outdoor &gt; base</li>
                  <li className="pl-1">Higher CDD = more cooling required</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Degree Day Calculation Example</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Base temperature:</span> <span className="text-white">15.5°C (UK standard)</span></p>
                <p><span className="text-white/60">Day 1 mean temp:</span> <span className="text-white">8°C → HDD = 15.5 - 8 = 7.5</span></p>
                <p><span className="text-white/60">Day 2 mean temp:</span> <span className="text-white">12°C → HDD = 15.5 - 12 = 3.5</span></p>
                <p><span className="text-white/60">Day 3 mean temp:</span> <span className="text-white">16°C → HDD = 0 (no heating needed)</span></p>
                <p className="mt-2"><span className="text-white/60">3-day total:</span> <span className="text-green-400">7.5 + 3.5 + 0 = 11 degree days</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Base Temperature Selection</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Base Temp</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reasoning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dense office</td>
                      <td className="border border-white/10 px-3 py-2">14-15°C</td>
                      <td className="border border-white/10 px-3 py-2">High internal gains from IT, people</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standard commercial</td>
                      <td className="border border-white/10 px-3 py-2">15.5°C</td>
                      <td className="border border-white/10 px-3 py-2">UK default, moderate internal gains</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Residential</td>
                      <td className="border border-white/10 px-3 py-2">15.5-16°C</td>
                      <td className="border border-white/10 px-3 py-2">Lower gains, higher comfort expectations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Warehouse</td>
                      <td className="border border-white/10 px-3 py-2">12-14°C</td>
                      <td className="border border-white/10 px-3 py-2">Lower temperature requirement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospital</td>
                      <td className="border border-white/10 px-3 py-2">16-17°C</td>
                      <td className="border border-white/10 px-3 py-2">Higher comfort, ventilation requirements</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Optimisation tip:</strong> The correct base temperature gives the highest R² correlation. Try different values (14-17°C) and select the one producing the best regression fit.
            </p>
          </div>
        </section>

        {/* Section 3: Performance Lines and Regression Analysis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Performance Lines and Regression Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Performance lines establish the relationship between energy consumption and degree
              days using linear regression. This enables prediction of expected consumption for
              any weather condition and forms the basis for target setting and variance analysis.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Performance Line Equation</p>
              <div className="font-mono text-lg text-white text-center py-2">
                E = (m × DD) + c
              </div>
              <div className="text-sm space-y-1 mt-3">
                <p><span className="text-white/60">E =</span> <span className="text-white">Energy consumption (kWh, kWh/m², or therms)</span></p>
                <p><span className="text-white/60">m =</span> <span className="text-white">Slope (weather sensitivity, kWh per degree day)</span></p>
                <p><span className="text-white/60">DD =</span> <span className="text-white">Degree days for the period</span></p>
                <p><span className="text-white/60">c =</span> <span className="text-white">Y-intercept (base load, weather-independent consumption)</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Interpreting the Performance Line</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Slope (m):</strong> Represents thermal performance - steeper slope means more energy per degree day (poorer building fabric or higher ventilation losses)</li>
                <li className="pl-1"><strong>Intercept (c):</strong> Base load consumption - lighting, equipment, domestic hot water, processes that occur regardless of weather</li>
                <li className="pl-1"><strong>R² value:</strong> Coefficient of determination - indicates how well the line fits data (aim for R² &gt; 0.9)</li>
                <li className="pl-1"><strong>Scatter:</strong> Spread of points around the line - wide scatter suggests other influencing factors</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regression Analysis Quality Indicators</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">R² Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Interpretation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt; 0.95</td>
                      <td className="border border-white/10 px-3 py-2">Excellent correlation</td>
                      <td className="border border-white/10 px-3 py-2">High confidence in predictions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.85 - 0.95</td>
                      <td className="border border-white/10 px-3 py-2">Good correlation</td>
                      <td className="border border-white/10 px-3 py-2">Acceptable for M&T purposes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.70 - 0.85</td>
                      <td className="border border-white/10 px-3 py-2">Moderate correlation</td>
                      <td className="border border-white/10 px-3 py-2">Consider other influencing factors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&lt; 0.70</td>
                      <td className="border border-white/10 px-3 py-2">Poor correlation</td>
                      <td className="border border-white/10 px-3 py-2">Review base temp, check data quality</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Line Calculation Example</p>
              <div className="text-sm space-y-2">
                <p><strong>Given regression result:</strong> E = 2.8DD + 850 (kWh/week)</p>
                <p><strong>February week:</strong> 95 degree days</p>
                <p><strong>Expected consumption:</strong> (2.8 × 95) + 850 = 266 + 850 = 1,116 kWh</p>
                <p><strong>Actual consumption:</strong> 1,280 kWh</p>
                <p><strong>Variance:</strong> 1,280 - 1,116 = +164 kWh (14.7% over target)</p>
                <p className="text-red-400 mt-2">This exceeds typical 10% threshold - exception report triggered</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Improvement indicator:</strong> A steeper slope after retrofit suggests insulation or controls improvements have not worked. A shallower slope confirms reduced weather sensitivity.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Cusum Charts and Exception Reporting */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Cusum Charts and Exception Reporting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cumulative Sum (Cusum) charts provide powerful visual representation of ongoing
              performance trends. By plotting the running total of variances (actual minus
              expected), cusum charts reveal patterns that might be obscured in raw consumption
              data.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cusum Calculation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Calculate variance each period</li>
                  <li className="pl-1">Variance = Actual - Expected</li>
                  <li className="pl-1">Add to cumulative total</li>
                  <li className="pl-1">Plot running sum over time</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Interpreting Cusum Slope</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Horizontal line = on target</li>
                  <li className="pl-1">Upward slope = over-consuming</li>
                  <li className="pl-1">Downward slope = under-consuming</li>
                  <li className="pl-1">Steeper = larger variance</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Cusum Chart Calculation Example</p>
              <div className="font-mono text-sm">
                <div className="grid grid-cols-4 gap-2 mb-1">
                  <span className="text-white/60">Week</span>
                  <span className="text-white/60">Variance (kWh)</span>
                  <span className="text-white/60">Cumulative</span>
                  <span className="text-white/60">Trend</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span>1</span><span>+50</span><span>+50</span><span className="text-red-400">↗</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span>2</span><span>+30</span><span>+80</span><span className="text-red-400">↗</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span>3</span><span>-10</span><span>+70</span><span className="text-yellow-400">→</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span>4</span><span>-40</span><span>+30</span><span className="text-green-400">↘</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span>5</span><span>-35</span><span>-5</span><span className="text-green-400">↘</span>
                </div>
                <p className="mt-2 text-white/60">Pattern shows over-consumption corrected by Week 5</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cusum Pattern Recognition</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Pattern</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Indicates</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Possible Causes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sudden step up</td>
                      <td className="border border-white/10 px-3 py-2">Discrete event increased consumption</td>
                      <td className="border border-white/10 px-3 py-2">New equipment, system fault, occupancy change</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sudden step down</td>
                      <td className="border border-white/10 px-3 py-2">Discrete event reduced consumption</td>
                      <td className="border border-white/10 px-3 py-2">Energy saving measure, equipment removed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gradual upward drift</td>
                      <td className="border border-white/10 px-3 py-2">Progressive degradation</td>
                      <td className="border border-white/10 px-3 py-2">Control deterioration, maintenance needs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Seasonal oscillation</td>
                      <td className="border border-white/10 px-3 py-2">Weather correlation issues</td>
                      <td className="border border-white/10 px-3 py-2">Wrong base temp, unaccounted solar gain</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Exception Reporting Framework</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Threshold setting:</strong> Typically 5-10% of expected consumption</li>
                <li className="pl-1"><strong>Alert mechanism:</strong> Automatic notification when threshold exceeded</li>
                <li className="pl-1"><strong>Investigation protocol:</strong> Defined steps to identify root cause</li>
                <li className="pl-1"><strong>Action tracking:</strong> Record corrective measures and outcomes</li>
                <li className="pl-1"><strong>Escalation:</strong> Procedures for persistent or severe exceptions</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Best practice:</strong> Set initial thresholds conservatively (10%) then tighten as the system matures and noise sources are eliminated.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Establishing a Performance Baseline</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Establish heating performance line for an office building from 12 months of data.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Monthly data collected (gas consumption vs degree days):</p>
                <p className="mt-2">Regression analysis results:</p>
                <p className="ml-4">Slope (m) = 45.2 kWh/degree day</p>
                <p className="ml-4">Intercept (c) = 2,450 kWh (monthly base load)</p>
                <p className="ml-4">R² = 0.94 (good correlation)</p>
                <p className="mt-2">Performance line: E = 45.2DD + 2,450 kWh/month</p>
                <p className="mt-2 text-white/60">Interpretation:</p>
                <p className="ml-4">- Base load 2,450 kWh/month (DHW, kitchens, losses)</p>
                <p className="ml-4">- Each degree day requires 45.2 kWh heating</p>
                <p className="ml-4 text-green-400">R² of 0.94 confirms reliable baseline for targeting</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Weather Normalised Comparison</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Compare January consumption between two years with different weather.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Year 1 January: 15,200 kWh at 380 degree days</p>
                <p>Year 2 January: 12,800 kWh at 310 degree days</p>
                <p className="mt-2 text-white/60">Raw comparison suggests 16% reduction - but is it real?</p>
                <p className="mt-2">Using performance line E = 35DD + 1,800:</p>
                <p className="ml-4">Year 1 expected: (35 × 380) + 1,800 = 15,100 kWh</p>
                <p className="ml-4">Year 2 expected: (35 × 310) + 1,800 = 12,650 kWh</p>
                <p className="mt-2">Normalised analysis:</p>
                <p className="ml-4">Year 1 variance: 15,200 - 15,100 = +100 kWh (+0.7%)</p>
                <p className="ml-4">Year 2 variance: 12,800 - 12,650 = +150 kWh (+1.2%)</p>
                <p className="mt-2 text-yellow-400">Conclusion: Performance similar - reduction was weather-related, not efficiency gain</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Cusum Analysis Identifying a Problem</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Analyse 10-week cusum data for a retail store.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Weekly variances (kWh): -5, +8, +12, +45, +52, +48, +55, +42, +38, +40</p>
                <p>Cumulative sum: -5, +3, +15, +60, +112, +160, +215, +257, +295, +335</p>
                <p className="mt-2 text-white/60">Pattern analysis:</p>
                <p className="ml-4">Weeks 1-3: Near horizontal (on target)</p>
                <p className="ml-4 text-red-400">Week 4: Sharp upward step (+45 kWh variance)</p>
                <p className="ml-4">Weeks 4-10: Sustained upward slope (~45 kWh/week average)</p>
                <p className="mt-2 text-white/60">Investigation findings:</p>
                <p className="ml-4">- Week 4: New refrigeration unit commissioned</p>
                <p className="ml-4">- Unit running 24/7 instead of scheduled hours</p>
                <p className="mt-2 text-green-400">Action: Correct time clock settings - savings verified in subsequent weeks</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Target Setting with Improvement Factor</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Set targets after implementing energy conservation measures.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Current performance line: E = 52DD + 3,200 kWh/month</p>
                <p className="mt-2 text-white/60">Planned improvements:</p>
                <p className="ml-4">- BMS optimisation: Expected 8% reduction in weather-dependent load</p>
                <p className="ml-4">- LED lighting retrofit: Expected 15% reduction in base load</p>
                <p className="mt-2">New target line calculation:</p>
                <p className="ml-4">New slope: 52 × 0.92 = 47.8 kWh/DD</p>
                <p className="ml-4">New intercept: 3,200 × 0.85 = 2,720 kWh</p>
                <p className="mt-2 text-green-400">Target line: E = 47.8DD + 2,720 kWh/month</p>
                <p className="mt-2 text-white/60">For month with 200 DD:</p>
                <p className="ml-4">Old expected: (52 × 200) + 3,200 = 13,600 kWh</p>
                <p className="ml-4">New target: (47.8 × 200) + 2,720 = 12,280 kWh</p>
                <p className="ml-4">Expected saving: 1,320 kWh (9.7%)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">M&T Implementation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Install appropriate sub-metering for major energy uses</li>
                <li className="pl-1">Establish data collection protocols and responsibilities</li>
                <li className="pl-1">Collect minimum 12 months baseline data</li>
                <li className="pl-1">Develop performance lines with R² validation</li>
                <li className="pl-1">Set realistic exception thresholds (start at 10%)</li>
                <li className="pl-1">Define investigation and escalation procedures</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">UK heating base temperature: <strong>15.5°C</strong></li>
                <li className="pl-1">Good R² correlation: <strong>&gt; 0.85</strong></li>
                <li className="pl-1">Typical exception threshold: <strong>5-10%</strong></li>
                <li className="pl-1">Baseline period: <strong>12 months minimum</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ignoring base temperature optimisation</strong> - Wrong base temp gives poor correlation</li>
                <li className="pl-1"><strong>Using estimated meter readings</strong> - Actual readings essential for accuracy</li>
                <li className="pl-1"><strong>Setting thresholds too tight initially</strong> - Creates alert fatigue</li>
                <li className="pl-1"><strong>Not investigating exceptions</strong> - Reports are useless without action</li>
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
                <p className="font-medium text-white mb-1">M&T Core Concepts</p>
                <ul className="space-y-0.5">
                  <li>HDD = Base temp - Mean outdoor temp</li>
                  <li>Performance line: E = (m × DD) + c</li>
                  <li>Cusum = Running total of variances</li>
                  <li>Exception = Variance &gt; threshold</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Cusum Interpretation</p>
                <ul className="space-y-0.5">
                  <li>Horizontal = on target</li>
                  <li>Rising = over-consuming</li>
                  <li>Falling = under-consuming</li>
                  <li>Step change = discrete event</li>
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
            <Link to="../h-n-c-module6-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section5-4">
              Next: Energy Auditing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section5_3;
