import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Post-Occupancy Evaluation - HNC Module 6 Section 6.6";
const DESCRIPTION = "Master post-occupancy evaluation for building services: POE methodology, soft landings framework, performance monitoring, user satisfaction surveys, BUS methodology, lessons learned, and continuous improvement.";

const quickCheckQuestions = [
  {
    id: "poe-definition",
    question: "What is the primary purpose of Post-Occupancy Evaluation (POE)?",
    options: ["To calculate final project costs", "To assess building performance and user satisfaction after handover", "To complete snagging lists", "To train maintenance staff"],
    correctIndex: 1,
    explanation: "Post-Occupancy Evaluation (POE) systematically assesses building performance and user satisfaction after handover, comparing actual outcomes against design intent to identify improvements and lessons learned."
  },
  {
    id: "soft-landings",
    question: "When does the Soft Landings framework engagement begin?",
    options: ["At practical completion", "During the defects liability period", "At the briefing and design stage", "Three years after handover"],
    correctIndex: 2,
    explanation: "Soft Landings engagement begins at the briefing and design stage (Stage 1), not at handover. This early involvement ensures performance targets are defined and the team commits to aftercare from project inception."
  },
  {
    id: "bus-methodology",
    question: "What does the BUS methodology primarily measure?",
    options: ["Building energy consumption", "Occupant satisfaction with comfort and building usability", "Construction defects", "Maintenance costs"],
    correctIndex: 1,
    explanation: "The Building Use Studies (BUS) methodology is a standardised occupant satisfaction survey measuring comfort, health, productivity, and overall building usability through benchmarked questionnaires."
  },
  {
    id: "performance-gap",
    question: "The 'performance gap' in building services refers to:",
    options: ["The gap between tender and final account", "The difference between predicted and actual energy performance", "The gap between design and construction teams", "The time between handover and occupation"],
    correctIndex: 1,
    explanation: "The performance gap is the well-documented difference between predicted (design) energy performance and actual measured performance in operation, often showing buildings using 2-5 times more energy than predicted."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which Soft Landings stage covers the period 1-3 years after handover?",
    options: [
      "Stage 4: Initial Aftercare",
      "Stage 5: Extended Aftercare and POE",
      "Stage 3: Pre-Handover",
      "Stage 6: Continuous Improvement"
    ],
    correctAnswer: 1,
    explanation: "Stage 5 (Extended Aftercare and POE) covers the period 1-3 years after handover, during which formal POE studies, energy monitoring, and user surveys are conducted to assess long-term performance."
  },
  {
    id: 2,
    question: "What is the recommended minimum duration for post-handover energy monitoring?",
    options: ["3 months", "6 months", "12 months (full seasonal cycle)", "24 months"],
    correctAnswer: 2,
    explanation: "A minimum of 12 months monitoring is recommended to capture a full seasonal cycle, ensuring heating and cooling seasons are assessed and seasonal variations in energy use are understood."
  },
  {
    id: 3,
    question: "In BUS surveys, which parameter is NOT typically measured?",
    options: ["Thermal comfort", "Lighting quality", "Construction programme duration", "Air quality"],
    correctAnswer: 2,
    explanation: "BUS surveys measure occupant satisfaction with environmental conditions (thermal comfort, lighting, air quality, noise) and building usability, not construction-related metrics like programme duration."
  },
  {
    id: 4,
    question: "What is 'continuous commissioning' in the context of POE?",
    options: [
      "Repeating initial commissioning tests",
      "Ongoing optimisation of building systems based on performance data",
      "Training new maintenance staff",
      "Extending the defects liability period"
    ],
    correctAnswer: 1,
    explanation: "Continuous commissioning (also called ongoing commissioning) involves ongoing monitoring and optimisation of building systems based on operational performance data, adjusting setpoints and controls to improve efficiency."
  },
  {
    id: 5,
    question: "Display Energy Certificates (DECs) are required for:",
    options: [
      "All new buildings over 50m²",
      "Public buildings over 250m² frequently visited by the public",
      "Only residential properties",
      "Industrial buildings only"
    ],
    correctAnswer: 1,
    explanation: "DECs are required for public buildings over 250m² that are frequently visited by the public, displaying actual operational energy ratings based on metered consumption data."
  },
  {
    id: 6,
    question: "The 'lessons learned' process should primarily feed into:",
    options: [
      "The project final account",
      "Future project briefing, design, and specifications",
      "Building insurance documentation",
      "Planning permission applications"
    ],
    correctAnswer: 1,
    explanation: "Lessons learned should feed into future project briefing, design standards, and specifications to prevent recurring issues and improve outcomes on subsequent projects - closing the feedback loop."
  },
  {
    id: 7,
    question: "What percentage energy uplift factor do CIBSE recommend applying to design predictions?",
    options: ["5-10%", "10-20%", "20-40%", "50-100%"],
    correctAnswer: 2,
    explanation: "CIBSE TM54 recommends applying a 20-40% uplift factor to design energy predictions to account for the typical performance gap, providing more realistic expectations of operational energy use."
  },
  {
    id: 8,
    question: "Thermal comfort surveys should assess which of the following?",
    options: [
      "Only temperature",
      "Temperature, humidity, air movement, and radiant temperature",
      "Only heating system efficiency",
      "Only air conditioning capacity"
    ],
    correctAnswer: 1,
    explanation: "Thermal comfort is multifactorial, requiring assessment of air temperature, humidity, air movement/draughts, and radiant temperature from surfaces - all contributing to perceived comfort per BS EN ISO 7730."
  },
  {
    id: 9,
    question: "What is the purpose of sub-metering in POE?",
    options: [
      "To reduce meter reading workload",
      "To identify energy use by system, zone, or tenant for targeted improvements",
      "To comply with planning conditions",
      "To satisfy building control requirements"
    ],
    correctAnswer: 1,
    explanation: "Sub-metering enables disaggregation of energy use by system (HVAC, lighting, small power), zone, or tenant, allowing identification of high consumers and targeted efficiency improvements."
  },
  {
    id: 10,
    question: "Which document provides guidance on undertaking POE in the UK?",
    options: [
      "BS 7671",
      "CIBSE Guide L and TM22",
      "Building Regulations Part L",
      "HSE Guidance Note 85"
    ],
    correctAnswer: 1,
    explanation: "CIBSE Guide L (Sustainability) and TM22 (Energy Assessment and Reporting Methodology) provide comprehensive guidance on undertaking POE, energy assessment, and building performance evaluation."
  },
  {
    id: 11,
    question: "The Soft Landings Champion role is responsible for:",
    options: [
      "Signing off defects",
      "Coordinating aftercare activities and maintaining focus on performance outcomes",
      "Approving final accounts",
      "Issuing practical completion certificates"
    ],
    correctAnswer: 1,
    explanation: "The Soft Landings Champion coordinates aftercare activities, maintains focus on performance outcomes throughout the project, and ensures the team delivers on Soft Landings commitments from design through occupation."
  },
  {
    id: 12,
    question: "Which factor commonly contributes to the building performance gap?",
    options: [
      "Accurate design assumptions",
      "Unregulated loads, extended operating hours, and poor controls commissioning",
      "Effective building handover",
      "Comprehensive O&M documentation"
    ],
    correctAnswer: 1,
    explanation: "Common contributors to the performance gap include: unregulated loads not in design calculations, extended actual operating hours, poor controls commissioning, user behaviour differences, and specification changes during construction."
  }
];

const faqs = [
  {
    question: "When should POE be conducted after building handover?",
    answer: "POE should be conducted at multiple stages: initial walkthrough within weeks of occupation to identify immediate issues, a formal 12-month assessment after a full seasonal cycle, and ideally a 3-year assessment for long-term performance trends. The Soft Landings framework recommends extended aftercare activities spanning 1-3 years post-handover to capture operational learning and optimise performance."
  },
  {
    question: "How do you measure user satisfaction objectively?",
    answer: "Objective measurement uses standardised survey instruments like the BUS methodology, which provides benchmarked questionnaires covering thermal comfort, air quality, lighting, noise, and overall satisfaction. Results are compared against a database of similar buildings, providing percentile rankings. Surveys should achieve minimum response rates (typically &gt;40%) and use consistent timing to enable valid comparisons."
  },
  {
    question: "What should be included in a lessons learned report?",
    answer: "A comprehensive lessons learned report should include: design assumptions versus actual performance data, user feedback summary and themes, technical issues encountered and resolutions, successful innovations worth repeating, recommendations for specification changes, maintenance and operational observations, and cost implications. Reports should be disseminated to design teams, client organisations, and industry bodies where appropriate."
  },
  {
    question: "Who is responsible for POE activities?",
    answer: "Responsibility varies by contract and project structure. Under Soft Landings, the design team maintains involvement through extended aftercare. Building Performance Evaluation (BPE) may be conducted by the client's FM team, specialist consultants, or the original design team. Clarity on POE responsibilities should be established at project inception and included in appointments."
  },
  {
    question: "How does POE relate to BREEAM In-Use certification?",
    answer: "BREEAM In-Use is a certification scheme for operational buildings that complements POE activities. It assesses three parts: Asset Performance (building design), Building Management, and Occupier Management. POE data directly supports BREEAM In-Use assessments and certification, while the certification framework provides a structured approach to ongoing performance evaluation."
  },
  {
    question: "What technology supports effective performance monitoring?",
    answer: "Effective monitoring relies on Building Management Systems (BMS) with trend logging, sub-metering of major systems, automatic meter reading (AMR), energy dashboards for visualisation, and Building Analytics platforms that use algorithms to identify faults and optimisation opportunities. Integration with utility data and weather information enables normalised performance comparison."
  }
];

const HNCModule6Section6_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section6">
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
            <span>Module 6.6.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Post-Occupancy Evaluation
          </h1>
          <p className="text-white/80">
            Performance monitoring, user satisfaction, lessons learned, and continuous improvement for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>POE:</strong> Systematic assessment of building performance in use</li>
              <li className="pl-1"><strong>Soft Landings:</strong> Framework for aftercare and performance focus</li>
              <li className="pl-1"><strong>Performance gap:</strong> Design vs actual energy often 2-5x different</li>
              <li className="pl-1"><strong>Feedback loop:</strong> Lessons learned inform future projects</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Energy monitoring:</strong> 12-month minimum for seasonal cycle</li>
              <li className="pl-1"><strong>User surveys:</strong> BUS methodology for benchmarking</li>
              <li className="pl-1"><strong>Continuous commissioning:</strong> Ongoing optimisation</li>
              <li className="pl-1"><strong>Sub-metering:</strong> Disaggregated performance analysis</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain POE methodology and its role in building performance",
              "Apply the Soft Landings framework to building services projects",
              "Design performance monitoring strategies using sub-metering",
              "Conduct user satisfaction surveys using BUS methodology",
              "Analyse the performance gap and implement closure strategies",
              "Develop lessons learned processes for continuous improvement"
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

        {/* Section 1: POE Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            POE Fundamentals and Soft Landings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Post-Occupancy Evaluation (POE) is the systematic assessment of buildings in use, comparing
              actual performance against design intent. It addresses a critical industry failing: the
              disconnection between design predictions and operational reality that results in buildings
              consuming 2-5 times more energy than anticipated.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key POE objectives:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Performance verification:</strong> Confirm systems deliver design intent</li>
                <li className="pl-1"><strong>User satisfaction:</strong> Assess occupant comfort and productivity</li>
                <li className="pl-1"><strong>Operational optimisation:</strong> Identify and implement improvements</li>
                <li className="pl-1"><strong>Lessons learned:</strong> Feed findings back to future designs</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Soft Landings Framework Stages</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Timing</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 1</td>
                      <td className="border border-white/10 px-3 py-2">Inception and Briefing</td>
                      <td className="border border-white/10 px-3 py-2">Define performance targets, agree POE scope</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 2</td>
                      <td className="border border-white/10 px-3 py-2">Design Development</td>
                      <td className="border border-white/10 px-3 py-2">Reality checking, metering strategy, user input</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 3</td>
                      <td className="border border-white/10 px-3 py-2">Pre-Handover</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning reviews, O&M preparation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 4</td>
                      <td className="border border-white/10 px-3 py-2">Initial Aftercare (0-12 months)</td>
                      <td className="border border-white/10 px-3 py-2">Resident on-site support, fine-tuning</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 5</td>
                      <td className="border border-white/10 px-3 py-2">Extended Aftercare (1-3 years)</td>
                      <td className="border border-white/10 px-3 py-2">Formal POE, seasonal reviews, user surveys</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Soft Landings commits the design team to operational outcomes, not just design delivery - a fundamental shift from traditional project completion approaches.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Performance Monitoring */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Performance Monitoring and Sub-Metering
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective performance monitoring requires comprehensive metering strategies that enable
              disaggregation of energy use by system, zone, and end use. Without sub-metering, identifying
              performance issues and optimisation opportunities becomes impossible.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Metering</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Fiscal meters for billing</li>
                  <li className="pl-1">Sub-meters by system/zone</li>
                  <li className="pl-1">Automatic meter reading</li>
                  <li className="pl-1">Half-hourly data logging</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Monitoring</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Temperature and humidity</li>
                  <li className="pl-1">CO2 levels (air quality)</li>
                  <li className="pl-1">Lux levels (lighting)</li>
                  <li className="pl-1">Acoustic measurements</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Performance</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Plant efficiency (COP/EER)</li>
                  <li className="pl-1">Flow rates and pressures</li>
                  <li className="pl-1">Operating hours</li>
                  <li className="pl-1">Control system logs</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recommended Sub-Metering Strategy</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Sub-Meter Points</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC</td>
                      <td className="border border-white/10 px-3 py-2">Chillers, boilers, AHUs, pumps, fans</td>
                      <td className="border border-white/10 px-3 py-2">Plant efficiency analysis</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">General, emergency, external</td>
                      <td className="border border-white/10 px-3 py-2">Lighting energy density (W/m²)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small Power</td>
                      <td className="border border-white/10 px-3 py-2">Floor/zone distribution boards</td>
                      <td className="border border-white/10 px-3 py-2">Unregulated load assessment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lifts and Escalators</td>
                      <td className="border border-white/10 px-3 py-2">Per lift/bank</td>
                      <td className="border border-white/10 px-3 py-2">Transportation energy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Server Rooms</td>
                      <td className="border border-white/10 px-3 py-2">IT load and cooling</td>
                      <td className="border border-white/10 px-3 py-2">PUE calculation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Monitoring tip:</strong> Data without analysis is useless - implement automated fault detection and diagnostics (FDD) to convert data into actionable insights.
            </p>
          </div>
        </section>

        {/* Section 3: User Satisfaction and BUS Methodology */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            User Satisfaction and BUS Methodology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              User satisfaction assessment provides essential feedback on how occupants experience
              the building environment. The Building Use Studies (BUS) methodology offers a standardised,
              benchmarked approach enabling comparison against hundreds of similar buildings.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">BUS Survey Categories</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Environmental Factors</p>
                  <ul className="text-white/80 space-y-0.5">
                    <li>- Temperature in winter and summer</li>
                    <li>- Air quality (fresh/stuffy, dry/humid)</li>
                    <li>- Lighting (natural and artificial)</li>
                    <li>- Noise (from inside and outside)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Building Factors</p>
                  <ul className="text-white/80 space-y-0.5">
                    <li>- Overall comfort</li>
                    <li>- Design and image</li>
                    <li>- Needs (does building meet needs?)</li>
                    <li>- Productivity (perceived impact)</li>
                    <li>- Health (perceived impact)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Survey Implementation Best Practice</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Timing:</strong> Conduct surveys at consistent times (avoid holiday periods, extreme weather)</li>
                <li className="pl-1"><strong>Response rate:</strong> Target &gt;40% minimum for statistical validity</li>
                <li className="pl-1"><strong>Anonymity:</strong> Ensure responses cannot be traced to individuals</li>
                <li className="pl-1"><strong>Communication:</strong> Explain purpose and how results will be used</li>
                <li className="pl-1"><strong>Follow-up:</strong> Share results and planned actions with respondents</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Interpreting BUS Results</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Percentile Ranking</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Interpretation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt;75th percentile</td>
                      <td className="border border-white/10 px-3 py-2">Excellent - top quartile performance</td>
                      <td className="border border-white/10 px-3 py-2">Maintain, share best practice</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50th-75th percentile</td>
                      <td className="border border-white/10 px-3 py-2">Good - above average</td>
                      <td className="border border-white/10 px-3 py-2">Minor improvements possible</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25th-50th percentile</td>
                      <td className="border border-white/10 px-3 py-2">Fair - below average</td>
                      <td className="border border-white/10 px-3 py-2">Investigate and address issues</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&lt;25th percentile</td>
                      <td className="border border-white/10 px-3 py-2">Poor - bottom quartile</td>
                      <td className="border border-white/10 px-3 py-2">Priority intervention required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>User engagement:</strong> Involve occupants in POE from the start - they provide invaluable operational insight and their buy-in improves survey response rates.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Lessons Learned and Continuous Improvement */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Lessons Learned and Continuous Improvement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The ultimate value of POE lies in feeding lessons learned back into future projects.
              Without this feedback loop, the industry repeats the same mistakes. Continuous
              commissioning extends this principle to ongoing building optimisation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Gap Causes and Solutions</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Gap Cause</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Impact</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Mitigation Strategy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Unregulated loads excluded</td>
                      <td className="border border-white/10 px-3 py-2">+30-50% energy use</td>
                      <td className="border border-white/10 px-3 py-2">TM54 operational energy modelling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Extended operating hours</td>
                      <td className="border border-white/10 px-3 py-2">+20-40% energy use</td>
                      <td className="border border-white/10 px-3 py-2">Realistic occupancy assumptions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Poor controls commissioning</td>
                      <td className="border border-white/10 px-3 py-2">+15-30% energy use</td>
                      <td className="border border-white/10 px-3 py-2">Extended commissioning, seasonal proving</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Specification changes</td>
                      <td className="border border-white/10 px-3 py-2">Variable</td>
                      <td className="border border-white/10 px-3 py-2">Change impact assessment on energy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">User behaviour differences</td>
                      <td className="border border-white/10 px-3 py-2">+10-20% energy use</td>
                      <td className="border border-white/10 px-3 py-2">User guides, displays, engagement</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Continuous Commissioning</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Ongoing BMS trend analysis</li>
                  <li className="pl-1">Seasonal setpoint optimisation</li>
                  <li className="pl-1">Fault detection and diagnostics</li>
                  <li className="pl-1">Preventive maintenance triggers</li>
                  <li className="pl-1">Energy baseline tracking</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lessons Learned Categories</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Design assumptions to revise</li>
                  <li className="pl-1">Specification improvements</li>
                  <li className="pl-1">Commissioning process changes</li>
                  <li className="pl-1">Handover documentation gaps</li>
                  <li className="pl-1">Innovations to repeat</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Feedback Loop Implementation</p>
              <div className="text-sm space-y-2">
                <p><strong>Step 1 - Capture:</strong> Document findings systematically using standard templates</p>
                <p><strong>Step 2 - Analyse:</strong> Identify root causes, not just symptoms</p>
                <p><strong>Step 3 - Validate:</strong> Review findings with project team and client</p>
                <p><strong>Step 4 - Disseminate:</strong> Share through design standards, briefing documents, CPD</p>
                <p><strong>Step 5 - Implement:</strong> Update specifications, checklists, and procedures</p>
                <p><strong>Step 6 - Verify:</strong> Check subsequent projects for improvement</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Industry improvement:</strong> Consider contributing anonymised POE data to initiatives like CarbonBuzz to help close the industry-wide performance gap.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Energy Performance Gap Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> An office building was designed to achieve 85 kWh/m²/year but is consuming 195 kWh/m²/year after 12 months. Analyse the gap.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Performance gap analysis:</p>
                <p className="mt-2">Design prediction: 85 kWh/m²/year</p>
                <p>Actual consumption: 195 kWh/m²/year</p>
                <p>Gap: 110 kWh/m²/year (129% over prediction)</p>
                <p className="mt-2">Sub-meter analysis reveals:</p>
                <p className="ml-4">- HVAC: 52 kWh/m² (design 45) → +7 kWh/m²</p>
                <p className="ml-4">- Lighting: 28 kWh/m² (design 22) → +6 kWh/m²</p>
                <p className="ml-4">- Small power: 85 kWh/m² (design 18) → +67 kWh/m²</p>
                <p className="ml-4">- Lifts/other: 30 kWh/m² (not in design) → +30 kWh/m²</p>
                <p className="mt-2 text-green-400">Key finding: 88% of gap from unregulated loads</p>
                <p className="text-green-400">Action: Implement small power management, review</p>
                <p className="text-green-400">TM54 methodology for future projects</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: BUS Survey Results Interpretation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A newly occupied building scores 4.2/7 for summer temperature comfort (benchmark mean 4.8). Interpret and recommend actions.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">BUS survey analysis:</p>
                <p className="mt-2">Parameter: Temperature in summer</p>
                <p>Building score: 4.2/7</p>
                <p>Benchmark mean: 4.8/7</p>
                <p>Percentile: 32nd (below average)</p>
                <p className="mt-2">Associated comments analysis:</p>
                <p className="ml-4">- "Too hot in afternoon" (47 mentions)</p>
                <p className="ml-4">- "Solar glare from windows" (23 mentions)</p>
                <p className="ml-4">- "Cannot control temperature" (18 mentions)</p>
                <p className="mt-2 text-green-400">Recommended investigation:</p>
                <p className="ml-4 text-green-400">1. Review solar shading commissioning</p>
                <p className="ml-4 text-green-400">2. Check cooling setpoints and schedules</p>
                <p className="ml-4 text-green-400">3. Assess local control provision</p>
                <p className="ml-4 text-green-400">4. Log afternoon internal temperatures</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Lessons Learned Documentation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Document a lesson learned regarding lighting control commissioning issues discovered during POE.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Lesson learned template:</p>
                <p className="mt-2"><strong>Issue:</strong> Lighting controls operating inefficiently</p>
                <p><strong>Discovery:</strong> 12-month POE energy analysis</p>
                <p><strong>Impact:</strong> +15% lighting energy consumption</p>
                <p className="mt-2"><strong>Root cause:</strong></p>
                <p className="ml-4">- Daylight dimming sensors facing wrong direction</p>
                <p className="ml-4">- Absence detection timeout set to 30 min (spec: 10 min)</p>
                <p className="ml-4">- Scene settings not configured post-handover</p>
                <p className="mt-2"><strong>Recommendation for future projects:</strong></p>
                <p className="ml-4 text-green-400">1. Add lighting controls to extended commissioning</p>
                <p className="ml-4 text-green-400">2. Include sensor orientation check in ITP</p>
                <p className="ml-4 text-green-400">3. Require scene programming in commissioning scope</p>
                <p className="ml-4 text-green-400">4. Specify post-occupancy lighting adjustment period</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">POE Implementation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Define POE scope and objectives during project inception</li>
                <li className="pl-1">Establish performance targets and monitoring strategy</li>
                <li className="pl-1">Ensure sub-metering installed per CIBSE TM39 guidance</li>
                <li className="pl-1">Plan user surveys for 12 months post-occupation</li>
                <li className="pl-1">Allocate budget for POE activities (typically 0.5-1% of project cost)</li>
                <li className="pl-1">Identify Soft Landings Champion and responsibilities</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Performance gap: typically <strong>2-5 times</strong> design prediction</li>
                <li className="pl-1">Monitoring period: <strong>12 months minimum</strong> for seasonal cycle</li>
                <li className="pl-1">Survey response rate: <strong>&gt;40%</strong> for validity</li>
                <li className="pl-1">TM54 uplift factor: <strong>20-40%</strong> on design predictions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Starting POE at handover</strong> - engagement should begin at project inception</li>
                <li className="pl-1"><strong>Insufficient metering</strong> - cannot analyse what you cannot measure</li>
                <li className="pl-1"><strong>Ignoring user feedback</strong> - occupants provide critical operational insight</li>
                <li className="pl-1"><strong>No feedback loop</strong> - lessons not captured or disseminated waste the POE investment</li>
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
                <p className="font-medium text-white mb-1">POE Key Elements</p>
                <ul className="space-y-0.5">
                  <li>Energy performance monitoring</li>
                  <li>User satisfaction surveys (BUS)</li>
                  <li>Environmental measurements</li>
                  <li>Lessons learned documentation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Soft Landings Principles</p>
                <ul className="space-y-0.5">
                  <li>Early engagement (Stage 1 inception)</li>
                  <li>Performance focus throughout</li>
                  <li>Extended aftercare (1-3 years)</li>
                  <li>Feedback to future projects</li>
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
            <Link to="../h-n-c-module6-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section6_6;
