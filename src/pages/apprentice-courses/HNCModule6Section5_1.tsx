import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Energy Auditing - HNC Module 6 Section 5.1";
const DESCRIPTION = "Master energy auditing for building services: ESOS requirements, audit types, data collection methods, site survey procedures, measurement protocols, and EN 16247 reporting standards.";

const quickCheckQuestions = [
  {
    id: "audit-definition",
    question: "What is the primary purpose of an energy audit?",
    options: ["To calculate electricity bills", "To systematically analyse energy use and identify improvement opportunities", "To design new electrical systems", "To test equipment performance"],
    correctIndex: 1,
    explanation: "An energy audit is a systematic analysis of energy flows within a building or facility to understand consumption patterns, identify inefficiencies, and recommend improvement measures with associated costs and savings."
  },
  {
    id: "esos-requirement",
    question: "Which organisations must comply with ESOS regulations?",
    options: ["All UK businesses", "Large undertakings with 250+ employees or turnover >£44m", "Only public sector buildings", "Buildings over 1000m²"],
    correctIndex: 1,
    explanation: "ESOS (Energy Savings Opportunity Scheme) applies to large undertakings: those with 250+ employees OR annual turnover exceeding £44 million AND balance sheet exceeding £38 million. Approximately 12,000 UK organisations qualify."
  },
  {
    id: "investment-grade",
    question: "What distinguishes an investment-grade audit from a walk-through audit?",
    options: ["It costs more", "It includes detailed financial analysis and measurement data sufficient for funding decisions", "It takes longer to complete", "It requires more auditors"],
    correctIndex: 1,
    explanation: "An investment-grade audit (ASHRAE Level III) provides detailed engineering analysis, extensive sub-metering data, and rigorous financial modelling sufficient to support capital investment decisions and secure project funding."
  },
  {
    id: "en-16247",
    question: "EN 16247 is the European standard for:",
    options: ["Electrical installation testing", "Energy audits - requirements, methodology and reporting", "Building energy performance certificates", "Carbon emissions reporting"],
    correctIndex: 1,
    explanation: "EN 16247 is the European standard series for energy audits, defining quality requirements, methodologies, deliverables, and competence requirements for energy auditors across buildings, industrial processes, and transport."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under ESOS, how frequently must qualifying organisations conduct energy audits?",
    options: [
      "Annually",
      "Every 2 years",
      "Every 4 years",
      "Every 5 years"
    ],
    correctAnswer: 2,
    explanation: "ESOS operates on a 4-year compliance cycle. Qualifying organisations must conduct audits covering at least 90% of their total energy consumption and report compliance to the Environment Agency by the deadline."
  },
  {
    id: 2,
    question: "Which audit level involves detailed sub-metering and comprehensive life cycle cost analysis?",
    options: ["Walk-through survey (Level I)", "Energy survey (Level II)", "Investment-grade audit (Level III)", "Diagnostic audit (Level IV)"],
    correctAnswer: 2,
    explanation: "ASHRAE Level III (Investment-grade audit) involves detailed sub-metering, engineering calculations, comprehensive life cycle cost analysis, and financial modelling to support capital investment decisions."
  },
  {
    id: 3,
    question: "What percentage of total energy consumption must an ESOS audit cover?",
    options: ["50%", "75%", "90%", "100%"],
    correctAnswer: 2,
    explanation: "ESOS requires audits to cover at least 90% of an organisation's total energy consumption. The remaining 10% can be excluded using de minimis provisions, allowing focus on significant energy users."
  },
  {
    id: 4,
    question: "Which document is essential for establishing baseline energy consumption?",
    options: [
      "Building regulations Part L",
      "At least 12 months of utility bills",
      "Equipment manufacturer data sheets",
      "Display Energy Certificate"
    ],
    correctAnswer: 1,
    explanation: "At least 12 months of utility bills provide the baseline for understanding consumption patterns, seasonal variations, and total energy use. This data enables meaningful comparison of energy saving measures."
  },
  {
    id: 5,
    question: "During a site survey, what is the purpose of identifying 'energy significant areas'?",
    options: [
      "To comply with health and safety",
      "To prioritise audit effort on areas with greatest saving potential",
      "To create evacuation routes",
      "To determine electrical circuit ratings"
    ],
    correctAnswer: 1,
    explanation: "Energy significant areas are zones or systems that account for substantial energy consumption. Identifying these enables auditors to focus detailed analysis where the greatest savings opportunities exist."
  },
  {
    id: 6,
    question: "What type of meter reading provides the most detailed consumption profile?",
    options: [
      "Monthly meter reads",
      "Half-hourly metering data",
      "Annual consumption figures",
      "Estimated readings"
    ],
    correctAnswer: 1,
    explanation: "Half-hourly metering data reveals consumption patterns throughout each day, identifying peak demands, base loads, out-of-hours consumption, and operational anomalies that monthly data cannot show."
  },
  {
    id: 7,
    question: "Which measurement instrument is used to assess thermal performance of building fabric?",
    options: ["Power quality analyser", "Lux meter", "Thermal imaging camera", "Tachometer"],
    correctAnswer: 2,
    explanation: "Thermal imaging cameras detect temperature differences, revealing heat loss through building fabric, insulation defects, air leakage paths, and thermal bridges that affect energy performance."
  },
  {
    id: 8,
    question: "EN 16247-1 requires the energy audit report to include:",
    options: [
      "Only recommended measures",
      "Current energy use, analysis, recommended measures with costs and savings",
      "Just the financial payback calculations",
      "Equipment specifications only"
    ],
    correctAnswer: 1,
    explanation: "EN 16247-1 specifies that audit reports must include current energy use data, analysis methodology, identified opportunities, recommended measures with estimated costs, savings, and implementation timescales."
  },
  {
    id: 9,
    question: "What is the purpose of degree day normalisation in energy analysis?",
    options: [
      "To calculate boiler efficiency",
      "To adjust consumption data for weather variations",
      "To determine insulation thickness",
      "To measure temperature"
    ],
    correctAnswer: 1,
    explanation: "Degree day normalisation adjusts energy consumption data to account for weather variations (heating/cooling requirements), enabling fair year-on-year comparison and identification of genuine efficiency changes."
  },
  {
    id: 10,
    question: "Which metric expresses building energy performance as consumption per unit floor area?",
    options: ["Power factor", "Energy Use Intensity (EUI)", "Load factor", "Diversity factor"],
    correctAnswer: 1,
    explanation: "Energy Use Intensity (EUI), typically expressed as kWh/m²/year, normalises consumption by floor area, enabling benchmarking against similar buildings and tracking performance improvements."
  },
  {
    id: 11,
    question: "A walk-through audit (Level I) is most appropriate when:",
    options: [
      "Seeking project financing",
      "Needing quick identification of obvious inefficiencies",
      "Detailed engineering calculations are required",
      "Measurement and verification is needed"
    ],
    correctAnswer: 1,
    explanation: "Walk-through audits provide rapid identification of obvious inefficiencies and low/no-cost improvements. They suit initial assessments or situations with limited budget but are insufficient for major capital decisions."
  },
  {
    id: 12,
    question: "Which organisation maintains the UK's ESOS register and receives compliance notifications?",
    options: [
      "CIBSE",
      "Environment Agency",
      "National Grid",
      "Building Research Establishment"
    ],
    correctAnswer: 1,
    explanation: "The Environment Agency administers ESOS in England, maintaining the compliance register and receiving notifications. Equivalent bodies operate in Scotland (SEPA), Wales (NRW), and Northern Ireland (NIEA)."
  }
];

const faqs = [
  {
    question: "What qualifications are required to conduct ESOS audits?",
    answer: "ESOS audits must be led by a qualified Lead Assessor approved under an Environment Agency-recognised scheme (e.g., CIBSE, EMA, IEMA). The Lead Assessor must hold relevant professional qualifications and demonstrate competence through assessment. They can be internal employees or external consultants but must sign off the audit and compliance notification."
  },
  {
    question: "How do I choose between audit levels for a project?",
    answer: "The audit level depends on project objectives and available budget. Level I (walk-through) suits initial assessments and quick wins identification (~£1-5k). Level II (energy survey) provides detailed analysis for planning purposes (~£5-15k). Level III (investment-grade) is required when seeking project financing or for complex retrofits (~£15-50k+). Match the audit depth to the decision being made."
  },
  {
    question: "What data should be collected before the site visit?",
    answer: "Pre-visit data collection should include: 12-36 months utility bills (electricity, gas, oil, etc.), half-hourly meter data if available, building drawings and floor areas, equipment schedules and specifications, occupancy patterns and operating hours, previous audit reports or EPCs, maintenance records, and any sub-metering data. Thorough preparation maximises productive site time."
  },
  {
    question: "How do I calculate simple payback for energy efficiency measures?",
    answer: "Simple payback = Implementation cost ÷ Annual energy savings. For example, LED lighting retrofit costing £15,000 saving £5,000/year has a 3-year payback. Note that simple payback ignores maintenance savings, price escalation, and time value of money. For investment-grade audits, use Net Present Value (NPV) and Internal Rate of Return (IRR) calculations."
  },
  {
    question: "What are the key sections required in an EN 16247 compliant audit report?",
    answer: "EN 16247 requires: Executive summary with key findings and recommendations, description of audited object (building/process), data sources and collection methodology, analysis of current energy use and consumption breakdown, list of energy saving opportunities ranked by impact, detailed recommendations with costs, savings, payback, and implementation timescale, plus measurement and verification approach."
  },
  {
    question: "How does SECR relate to ESOS?",
    answer: "Streamlined Energy and Carbon Reporting (SECR) requires qualifying companies to report energy use and emissions in their annual reports. While ESOS focuses on identifying savings opportunities through audits, SECR ensures ongoing public disclosure of energy performance. Organisations may qualify for both schemes. ESOS audit data can support SECR reporting, but they serve different purposes."
  }
];

const HNCModule6Section5_1 = () => {
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
            <span>Module 6.5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Energy Auditing
          </h1>
          <p className="text-white/80">
            Audit types, data collection, site surveys, measurement protocols and EN 16247 reporting standards
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Purpose:</strong> Systematic analysis to identify energy savings</li>
              <li className="pl-1"><strong>ESOS:</strong> 4-year cycle, covers 90% of consumption</li>
              <li className="pl-1"><strong>Audit levels:</strong> Walk-through, survey, investment-grade</li>
              <li className="pl-1"><strong>Standard:</strong> EN 16247 defines methodology</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>HVAC:</strong> Typically 40-60% of building energy</li>
              <li className="pl-1"><strong>Lighting:</strong> 15-25% of commercial consumption</li>
              <li className="pl-1"><strong>Half-hourly data:</strong> Essential for detailed analysis</li>
              <li className="pl-1"><strong>Benchmarking:</strong> kWh/m² enables comparison</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain ESOS requirements and compliance obligations",
              "Differentiate between walk-through, survey, and investment-grade audits",
              "Apply systematic data collection and utility bill analysis",
              "Conduct site surveys using appropriate measurement equipment",
              "Analyse energy data using degree days and benchmarking",
              "Prepare EN 16247 compliant audit reports with recommendations"
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

        {/* Section 1: ESOS and Regulatory Framework */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            ESOS and Regulatory Framework
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Energy Savings Opportunity Scheme (ESOS) is the UK's implementation of Article 8 of the
              EU Energy Efficiency Directive. It mandates energy audits for large organisations to identify
              cost-effective energy saving opportunities and drive improved energy performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">ESOS Qualification Criteria:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Employee threshold:</strong> 250 or more employees in the UK</li>
                <li className="pl-1"><strong>Financial threshold:</strong> Annual turnover exceeding £44 million AND balance sheet exceeding £38 million</li>
                <li className="pl-1"><strong>Group test:</strong> Applies if any UK group company meets criteria</li>
                <li className="pl-1"><strong>Qualification date:</strong> Assessment on 31 December of each compliance period</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ESOS Compliance Timeline</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Phase</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Qualification Date</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Compliance Deadline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase 1</td>
                      <td className="border border-white/10 px-3 py-2">31 December 2014</td>
                      <td className="border border-white/10 px-3 py-2">5 December 2015</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase 2</td>
                      <td className="border border-white/10 px-3 py-2">31 December 2018</td>
                      <td className="border border-white/10 px-3 py-2">5 December 2019</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase 3</td>
                      <td className="border border-white/10 px-3 py-2">31 December 2022</td>
                      <td className="border border-white/10 px-3 py-2">5 December 2023</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase 4</td>
                      <td className="border border-white/10 px-3 py-2">31 December 2026</td>
                      <td className="border border-white/10 px-3 py-2">5 December 2027</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">ESOS Coverage Requirements</p>
              <ul className="text-sm text-white space-y-1">
                <li>• Audits must cover <strong>at least 90%</strong> of total energy consumption</li>
                <li>• Includes buildings, industrial processes, and transport</li>
                <li>• De minimis threshold allows exclusion of small consumption areas</li>
                <li>• Alternative compliance routes: ISO 50001 certification, DECs, GDAs</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Compliance note:</strong> Non-compliance can result in penalties up to £90,000 plus £500 per day for continued breach. The Environment Agency publishes non-compliant organisations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Audit Types and Methodology */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Audit Types and Methodology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy audits range from brief walk-through assessments to comprehensive investment-grade
              analyses. The ASHRAE classification provides a widely-adopted framework defining three
              distinct audit levels, each with specific purposes and deliverables.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Level I: Walk-Through</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Brief site assessment</li>
                  <li className="pl-1">Utility bill analysis</li>
                  <li className="pl-1">Identify obvious issues</li>
                  <li className="pl-1">Low/no-cost measures</li>
                  <li className="pl-1">Duration: 1-2 days</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Level II: Energy Survey</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Detailed site survey</li>
                  <li className="pl-1">End-use breakdown</li>
                  <li className="pl-1">Engineering calculations</li>
                  <li className="pl-1">Capital measures costed</li>
                  <li className="pl-1">Duration: 1-4 weeks</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Level III: Investment-Grade</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Sub-metering installed</li>
                  <li className="pl-1">Dynamic simulation</li>
                  <li className="pl-1">Life cycle costing</li>
                  <li className="pl-1">Finance-ready analysis</li>
                  <li className="pl-1">Duration: 4-12 weeks</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Audit Methodology (EN 16247)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activities</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Outputs</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Preliminary Contact</td>
                      <td className="border border-white/10 px-3 py-2">Define scope, boundaries, objectives</td>
                      <td className="border border-white/10 px-3 py-2">Audit agreement, data request</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Start-up Meeting</td>
                      <td className="border border-white/10 px-3 py-2">Review data, discuss operations</td>
                      <td className="border border-white/10 px-3 py-2">Understanding of site/process</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Data Collection</td>
                      <td className="border border-white/10 px-3 py-2">Gather bills, drawings, schedules</td>
                      <td className="border border-white/10 px-3 py-2">Baseline consumption data</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Field Work</td>
                      <td className="border border-white/10 px-3 py-2">Site survey, measurements, interviews</td>
                      <td className="border border-white/10 px-3 py-2">Equipment inventory, readings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Analysis</td>
                      <td className="border border-white/10 px-3 py-2">Energy balance, benchmarking, ECMs</td>
                      <td className="border border-white/10 px-3 py-2">Identified opportunities</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6. Reporting</td>
                      <td className="border border-white/10 px-3 py-2">Document findings, recommendations</td>
                      <td className="border border-white/10 px-3 py-2">Audit report</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Match audit level to decision requirements - a walk-through for initial assessment, investment-grade for major capital projects requiring board approval.
            </p>
          </div>
        </section>

        {/* Section 3: Data Collection and Analysis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Data Collection and Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Robust data collection forms the foundation of meaningful energy analysis. The quality
              of audit recommendations depends directly on the completeness and accuracy of baseline
              data and operational information gathered during the audit process.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Essential Data Requirements</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Utility Data</p>
                  <ul className="text-white/80 space-y-0.5">
                    <li>• 12-36 months electricity bills</li>
                    <li>• Gas/oil consumption records</li>
                    <li>• Half-hourly metering data</li>
                    <li>• Tariff structures and rates</li>
                    <li>• Maximum demand readings</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Building Information</p>
                  <ul className="text-white/80 space-y-0.5">
                    <li>• Floor areas (GIA/NIA)</li>
                    <li>• Occupancy schedules</li>
                    <li>• Operating hours</li>
                    <li>• Equipment schedules</li>
                    <li>• Building drawings/BIM</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Utility Bill Analysis Techniques</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Base load identification:</strong> Minimum consumption during unoccupied periods indicates continuous loads</li>
                <li className="pl-1"><strong>Degree day correlation:</strong> Plot consumption against heating/cooling degree days to assess weather sensitivity</li>
                <li className="pl-1"><strong>CUSUM analysis:</strong> Cumulative sum charts identify step changes in consumption patterns</li>
                <li className="pl-1"><strong>Regression analysis:</strong> Statistical relationship between consumption and driving variables</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Performance Metrics</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Metric</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Calculation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Office</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy Use Intensity (EUI)</td>
                      <td className="border border-white/10 px-3 py-2">kWh/m²/year</td>
                      <td className="border border-white/10 px-3 py-2">150-400 kWh/m²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical EUI</td>
                      <td className="border border-white/10 px-3 py-2">Electricity kWh/m²</td>
                      <td className="border border-white/10 px-3 py-2">80-200 kWh/m²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fossil thermal EUI</td>
                      <td className="border border-white/10 px-3 py-2">Gas/oil kWh/m²</td>
                      <td className="border border-white/10 px-3 py-2">70-200 kWh/m²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Carbon intensity</td>
                      <td className="border border-white/10 px-3 py-2">kgCO₂/m²/year</td>
                      <td className="border border-white/10 px-3 py-2">30-100 kgCO₂/m²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost intensity</td>
                      <td className="border border-white/10 px-3 py-2">£/m²/year</td>
                      <td className="border border-white/10 px-3 py-2">£15-50/m²</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Half-Hourly Data Analysis</p>
              <div className="text-sm space-y-2">
                <p><strong>Base load:</strong> Minimum overnight/weekend consumption - identify equipment running unnecessarily</p>
                <p><strong>Peak demand:</strong> Maximum kW - opportunity for demand management and tariff optimisation</p>
                <p><strong>Load profile shape:</strong> Sharp rise at start-up suggests simultaneous equipment start - implement soft starts</p>
                <p><strong>Out-of-hours consumption:</strong> Energy used outside operating hours as percentage of total</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Analysis tip:</strong> Out-of-hours consumption often represents 30-50% of total electricity use in commercial buildings - a key focus area for quick wins.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Site Surveys and Measurement */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Site Surveys and Measurement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The site survey validates desktop analysis, captures equipment data, and identifies
              operational practices affecting energy use. Systematic measurement using calibrated
              instruments provides the evidence base for energy saving calculations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Site Survey Checklist</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Building Fabric</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Glazing type and condition</li>
                    <li>• Insulation levels (if accessible)</li>
                    <li>• Air tightness observations</li>
                    <li>• Solar shading provision</li>
                    <li>• Thermal bridges/cold spots</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">HVAC Systems</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Plant nameplates and ratings</li>
                    <li>• Operating schedules</li>
                    <li>• Set points and controls</li>
                    <li>• Distribution system condition</li>
                    <li>• Maintenance history</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Measurement Equipment</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Instrument</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Measurements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power analyser</td>
                      <td className="border border-white/10 px-3 py-2">Electrical systems</td>
                      <td className="border border-white/10 px-3 py-2">kW, kVA, PF, kWh, harmonics</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Clamp meter</td>
                      <td className="border border-white/10 px-3 py-2">Circuit loading</td>
                      <td className="border border-white/10 px-3 py-2">Amps, voltage, power</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermal camera</td>
                      <td className="border border-white/10 px-3 py-2">Building fabric, electrical</td>
                      <td className="border border-white/10 px-3 py-2">Surface temperature, heat loss</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lux meter</td>
                      <td className="border border-white/10 px-3 py-2">Lighting assessment</td>
                      <td className="border border-white/10 px-3 py-2">Illuminance levels (lux)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data logger</td>
                      <td className="border border-white/10 px-3 py-2">Long-term monitoring</td>
                      <td className="border border-white/10 px-3 py-2">Temperature, humidity, CO₂</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flue gas analyser</td>
                      <td className="border border-white/10 px-3 py-2">Boiler efficiency</td>
                      <td className="border border-white/10 px-3 py-2">O₂, CO₂, CO, efficiency %</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Anemometer</td>
                      <td className="border border-white/10 px-3 py-2">Ventilation assessment</td>
                      <td className="border border-white/10 px-3 py-2">Air velocity, flow rate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ultrasonic flow meter</td>
                      <td className="border border-white/10 px-3 py-2">Water/heating systems</td>
                      <td className="border border-white/10 px-3 py-2">Flow rate, heat transfer</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Measurement Protocols</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Calibration:</strong> Ensure all instruments are within calibration date and accuracy specifications</li>
                <li className="pl-1"><strong>Representative conditions:</strong> Measure during typical operating conditions, not during maintenance or unusual loads</li>
                <li className="pl-1"><strong>Duration:</strong> Spot measurements suit stable systems; logging required for varying loads</li>
                <li className="pl-1"><strong>Documentation:</strong> Record location, date, time, conditions, and any abnormalities</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Survey tip:</strong> Interview facilities staff and building users - operational practices often explain unexpected consumption patterns that measurements alone cannot reveal.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Energy Use Intensity Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate EUI for a 5,000m² office building consuming 850,000 kWh electricity and 450,000 kWh gas annually.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given:</p>
                <p className="ml-4">Floor area = 5,000 m² (GIA)</p>
                <p className="ml-4">Electricity = 850,000 kWh/year</p>
                <p className="ml-4">Gas = 450,000 kWh/year</p>
                <p className="mt-2">Calculations:</p>
                <p className="ml-4">Electrical EUI = 850,000 ÷ 5,000 = 170 kWh/m²/year</p>
                <p className="ml-4">Fossil EUI = 450,000 ÷ 5,000 = 90 kWh/m²/year</p>
                <p className="ml-4">Total EUI = 170 + 90 = 260 kWh/m²/year</p>
                <p className="mt-2 text-green-400">Benchmark: CIBSE TM46 typical office = 120 electricity + 120 gas = 240 kWh/m²</p>
                <p className="text-yellow-400">Assessment: Electrical consumption above benchmark - investigate lighting and cooling</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Simple Payback Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> LED lighting retrofit for an office floor - assess financial viability.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Current situation:</p>
                <p className="ml-4">100 x 58W T8 fluorescent fittings</p>
                <p className="ml-4">Operating hours: 2,500 hours/year</p>
                <p className="ml-4">Current consumption: 100 × 58W × 2,500h = 14,500 kWh/year</p>
                <p className="mt-2">Proposed LED:</p>
                <p className="ml-4">100 x 25W LED panels</p>
                <p className="ml-4">LED consumption: 100 × 25W × 2,500h = 6,250 kWh/year</p>
                <p className="mt-2">Savings calculation:</p>
                <p className="ml-4">Energy saved: 14,500 - 6,250 = 8,250 kWh/year</p>
                <p className="ml-4">At £0.28/kWh: 8,250 × £0.28 = £2,310/year</p>
                <p className="mt-2">Investment:</p>
                <p className="ml-4">Supply and install: £12,000</p>
                <p className="mt-2 text-green-400">Simple payback = £12,000 ÷ £2,310 = 5.2 years</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Degree Day Normalisation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Compare heating consumption between a mild year and a cold year.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Year 1 (mild): Gas = 400,000 kWh, Degree days = 1,800</p>
                <p>Year 2 (cold): Gas = 520,000 kWh, Degree days = 2,400</p>
                <p className="mt-2">Normalised comparison (to 20-year average of 2,100 DD):</p>
                <p className="ml-4">Year 1 normalised = 400,000 × (2,100/1,800) = 466,667 kWh</p>
                <p className="ml-4">Year 2 normalised = 520,000 × (2,100/2,400) = 455,000 kWh</p>
                <p className="mt-2 text-green-400">Conclusion: Year 2 actually more efficient when weather-adjusted</p>
                <p className="text-white/60">Without normalisation, Year 2 appears 30% worse</p>
                <p className="text-white/60">After normalisation, Year 2 is 2.5% better</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Reporting Standards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">EN 16247 Reporting Standards</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">EN 16247 Series Structure</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>EN 16247-1:</strong> General requirements - methodology applicable to all audits</li>
                <li className="pl-1"><strong>EN 16247-2:</strong> Buildings - specific requirements for building energy audits</li>
                <li className="pl-1"><strong>EN 16247-3:</strong> Processes - industrial process audit requirements</li>
                <li className="pl-1"><strong>EN 16247-4:</strong> Transport - fleet and logistics audits</li>
                <li className="pl-1"><strong>EN 16247-5:</strong> Competence of energy auditors</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Audit Report Contents (EN 16247-1)</h3>
              <div className="p-4 rounded-lg bg-white/5">
                <ul className="text-sm text-white space-y-2">
                  <li><strong>1. Executive summary:</strong> Key findings, recommendations, estimated savings</li>
                  <li><strong>2. Background:</strong> Audit scope, objectives, boundaries, limitations</li>
                  <li><strong>3. Description of audited object:</strong> Building/process characteristics, operations</li>
                  <li><strong>4. Data collection:</strong> Sources, methodology, measurement details</li>
                  <li><strong>5. Energy analysis:</strong> Consumption breakdown, benchmarking, trends</li>
                  <li><strong>6. Opportunities identified:</strong> Full list of potential measures</li>
                  <li><strong>7. Recommended measures:</strong> Prioritised actions with costs, savings, payback</li>
                  <li><strong>8. Implementation plan:</strong> Timescales, responsibilities, M&V approach</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Conservation Measure (ECM) Documentation</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Required Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Measure description</td>
                      <td className="border border-white/10 px-3 py-2">Technical description of proposed intervention</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy savings</td>
                      <td className="border border-white/10 px-3 py-2">kWh/year by fuel type with calculation basis</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Carbon savings</td>
                      <td className="border border-white/10 px-3 py-2">tCO₂/year using current emission factors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost savings</td>
                      <td className="border border-white/10 px-3 py-2">£/year at current tariff rates</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Implementation cost</td>
                      <td className="border border-white/10 px-3 py-2">Capital and installation costs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Simple payback</td>
                      <td className="border border-white/10 px-3 py-2">Years to recover investment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Implementation time</td>
                      <td className="border border-white/10 px-3 py-2">Duration and any operational impacts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Risks and barriers</td>
                      <td className="border border-white/10 px-3 py-2">Technical, financial, operational considerations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Audit Pitfalls to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Insufficient baseline data:</strong> Basing savings on estimates rather than measured consumption</li>
                <li className="pl-1"><strong>Ignoring interactions:</strong> Not accounting for heating/cooling interactions when replacing lighting</li>
                <li className="pl-1"><strong>Over-optimistic savings:</strong> Using manufacturer claims without operational derating</li>
                <li className="pl-1"><strong>Missing operational hours:</strong> Assuming design schedules when actual operation differs</li>
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
                <p className="font-medium text-white mb-1">ESOS Requirements</p>
                <ul className="space-y-0.5">
                  <li>4-year compliance cycle</li>
                  <li>Cover 90% of energy consumption</li>
                  <li>Lead Assessor sign-off required</li>
                  <li>Notify Environment Agency by deadline</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Audit Levels</p>
                <ul className="space-y-0.5">
                  <li>Level I: Walk-through (quick wins)</li>
                  <li>Level II: Energy survey (planning)</li>
                  <li>Level III: Investment-grade (financing)</li>
                  <li>EN 16247: European standard series</li>
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
            <Link to="../h-n-c-module6-section5-2">
              Next: Energy Management Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section5_1;
