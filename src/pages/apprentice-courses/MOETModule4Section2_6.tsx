import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Trend Analysis and Predictive Maintenance - MOET Module 4.2.6";
const DESCRIPTION = "Data analysis techniques for predictive maintenance: trending condition monitoring data, P-F curves, setting alarm levels, CMMS integration, KPIs and building a predictive maintenance programme for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "trend-pf-curve",
    question: "The P-F curve describes the relationship between:",
    options: [
      "Power factor and frequency",
      "The point of detectable potential failure (P) and the point of functional failure (F)",
      "Preventive and corrective maintenance costs",
      "Pressure and flow in hydraulic systems"
    ],
    correctIndex: 1,
    explanation: "The P-F curve (also called the failure development curve) shows how a fault progresses from the point at which it can first be detected by condition monitoring (P — potential failure) to the point at which the equipment can no longer perform its required function (F — functional failure). The P-F interval is the window of opportunity to plan and carry out maintenance before breakdown."
  },
  {
    id: "trend-alarm-levels",
    question: "When setting alarm levels for condition monitoring parameters, best practice is to:",
    options: [
      "Use the manufacturer's generic limits for all equipment",
      "Base alarm levels on the specific equipment's baseline readings plus a statistically determined threshold",
      "Set alarms at the BS 7671 minimum values",
      "Only set trip levels, not alarms"
    ],
    correctIndex: 1,
    explanation: "Effective alarm levels are based on each equipment item's own baseline readings, not just generic standards. A statistically determined threshold (e.g., 2 or 3 standard deviations above baseline) accounts for normal variation. Generic limits are a useful starting point but should be refined using actual operating data. Two levels are typically set: alert (investigate) and danger (immediate action)."
  },
  {
    id: "trend-cmms-role",
    question: "A computerised maintenance management system (CMMS) supports predictive maintenance by:",
    options: [
      "Replacing the need for condition monitoring equipment",
      "Storing historical data, generating trend reports, triggering work orders from alarm conditions and tracking KPIs",
      "Automatically repairing faulty equipment",
      "Eliminating the need for maintenance technicians"
    ],
    correctIndex: 1,
    explanation: "A CMMS is the central platform for managing predictive maintenance data. It stores condition monitoring readings, generates trend graphs, compares current values against alarm thresholds, automatically generates work orders when thresholds are exceeded, and tracks maintenance KPIs. It provides the data management backbone that makes a large-scale predictive maintenance programme practical."
  },
  {
    id: "trend-data-quality",
    question: "The single most important factor determining the success of a predictive maintenance programme is:",
    options: [
      "The cost of the monitoring equipment",
      "Consistent, accurate data collection with disciplined recording practices and regular trend review",
      "The number of technicians employed",
      "The age of the equipment being monitored"
    ],
    correctIndex: 1,
    explanation: "Without consistent, accurate data, even the most sophisticated monitoring equipment and CMMS software are worthless. Every reading must be taken under comparable conditions, at the correct measurement point, with a calibrated instrument, and recorded accurately with the correct asset identifier. Inconsistent data produces misleading trends that can lead to either unnecessary maintenance or missed faults."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Predictive maintenance differs from preventive maintenance because it:",
    options: [
      "Is carried out after equipment has failed",
      "Schedules maintenance based on actual measured condition rather than fixed time intervals",
      "Only applies to electrical equipment",
      "Does not require any planning"
    ],
    correctAnswer: 1,
    explanation: "Predictive maintenance (PdM) uses condition monitoring data to determine the actual condition of equipment and schedule maintenance only when it is needed. This contrasts with preventive maintenance (PM) which schedules tasks at fixed time intervals regardless of condition. PdM avoids both unnecessary maintenance (cost) and unexpected failures (downtime)."
  },
  {
    id: 2,
    question: "The monitoring interval for condition-based maintenance must be:",
    options: [
      "Exactly monthly for all equipment",
      "Shorter than half the P-F interval to ensure at least two data points before failure",
      "Quarterly regardless of equipment type",
      "Only when the operator reports a problem"
    ],
    correctAnswer: 1,
    explanation: "The monitoring interval must be shorter than half the P-F interval. This ensures at least two data points are captured between the onset of detectable deterioration and functional failure, giving time to confirm the trend and plan maintenance. Equipment with short P-F intervals requires more frequent monitoring or continuous online systems."
  },
  {
    id: 3,
    question: "A trend graph showing vibration levels slowly increasing over 12 months then sharply rising in the last two months indicates:",
    options: [
      "Normal equipment behaviour",
      "The monitoring equipment is faulty",
      "The equipment has entered the final stage of the P-F curve and failure is approaching rapidly",
      "Seasonal temperature variation"
    ],
    correctAnswer: 2,
    explanation: "A slow increase followed by a sharp rise (exponential increase) is characteristic of the final stage of the P-F curve. The fault has progressed to the point where deterioration is accelerating. Immediate action is required — either planned shutdown for maintenance or continuous monitoring with defined trip levels to prevent catastrophic failure."
  },
  {
    id: 4,
    question: "Mean time between failures (MTBF) is a KPI that measures:",
    options: [
      "The average time taken to repair equipment",
      "The average operating time between consecutive failures of a repairable system",
      "The cost of spare parts",
      "The number of maintenance technicians required"
    ],
    correctAnswer: 1,
    explanation: "MTBF measures the average time a system operates between failures. A rising MTBF indicates improving reliability — which is a key objective of predictive maintenance. By detecting and addressing deterioration before failure, PdM extends the operating period between breakdowns, increasing MTBF."
  },
  {
    id: 5,
    question: "Statistical process control (SPC) applied to condition monitoring data uses:",
    options: [
      "Fixed manufacturer limits only",
      "Control charts with upper and lower control limits based on statistical analysis of the data",
      "The opinions of experienced operators",
      "Random sampling intervals"
    ],
    correctAnswer: 1,
    explanation: "SPC uses control charts to distinguish between normal variation (common cause) and abnormal variation (special cause) in condition monitoring data. Upper and lower control limits are calculated statistically from the baseline data. Points outside the control limits or non-random patterns (trends, runs, shifts) indicate a change in equipment condition requiring investigation."
  },
  {
    id: 6,
    question: "The main advantage of continuous online monitoring over periodic route-based monitoring is:",
    options: [
      "It is always cheaper",
      "It captures data continuously, enabling detection of rapidly developing faults and providing real-time alarm capability",
      "It does not require any sensors",
      "It eliminates the need for skilled analysts"
    ],
    correctAnswer: 1,
    explanation: "Continuous online monitoring captures data 24/7, meaning rapidly developing faults cannot 'hide' between periodic measurement intervals. It provides real-time alarm and trip capability, which is essential for critical equipment with short P-F intervals. The trade-off is higher initial cost for sensors, wiring and data acquisition hardware."
  },
  {
    id: 7,
    question: "When combining multiple condition monitoring techniques on a single asset, the benefit is:",
    options: [
      "It confuses the analysis",
      "Different techniques detect different fault types, providing a more complete picture and higher diagnostic confidence",
      "It reduces the amount of data to analyse",
      "Only one technique needs to work"
    ],
    correctAnswer: 1,
    explanation: "Each condition monitoring technique has strengths for specific fault types. Vibration detects mechanical faults, thermal imaging detects hot connections, oil analysis detects wear debris, and insulation testing detects electrical deterioration. Combining techniques provides overlapping coverage and higher confidence in diagnoses. A vibration reading indicating bearing wear, confirmed by elevated bearing temperature on thermal imaging and iron particles in the oil, gives very high diagnostic certainty."
  },
  {
    id: 8,
    question: "The 'bathtub curve' describes equipment failure rate over its lifecycle. The three stages are:",
    options: [
      "Design, manufacture and disposal",
      "Early life (infant mortality), useful life (random failures) and wear-out (increasing failure rate)",
      "Installation, operation and decommissioning",
      "Planning, execution and review"
    ],
    correctAnswer: 1,
    explanation: "The bathtub curve shows three distinct phases: early life (high failure rate from manufacturing defects and installation errors that decreases over time), useful life (low, relatively constant random failure rate), and wear-out (increasing failure rate as components reach end of life). Predictive maintenance is most valuable in detecting the onset of wear-out, enabling planned replacement before failure."
  },
  {
    id: 9,
    question: "A maintenance KPI showing OEE (Overall Equipment Effectiveness) of 65% means:",
    options: [
      "The equipment runs at 65% of its rated speed",
      "The combined effect of availability, performance and quality results in 65% of the theoretical maximum output being achieved",
      "65% of the maintenance budget has been spent",
      "65% of spare parts are in stock"
    ],
    correctAnswer: 1,
    explanation: "OEE multiplies three factors: availability (uptime / planned production time), performance (actual speed / design speed) and quality (good output / total output). An OEE of 65% means significant losses from downtime, speed reductions or quality defects. World-class OEE is considered to be 85% or above. Predictive maintenance improves OEE primarily through increased availability."
  },
  {
    id: 10,
    question: "Data-driven maintenance decision-making requires:",
    options: [
      "Replacing all equipment on a fixed schedule",
      "Consistent data collection, accurate record keeping, trend analysis and clear action thresholds",
      "Only reacting to equipment breakdowns",
      "Ignoring historical data"
    ],
    correctAnswer: 1,
    explanation: "Effective predictive maintenance requires disciplined data management: consistent measurement procedures, accurate and complete record keeping (in a CMMS), regular trend analysis to detect changes, and clearly defined action thresholds that trigger investigation and maintenance. Without good data, condition monitoring becomes guesswork."
  },
  {
    id: 11,
    question: "The primary risk of relying solely on time-based preventive maintenance is:",
    options: [
      "It is too cheap",
      "It may replace components that are still in good condition (over-maintenance) or miss faults developing between intervals (under-maintenance)",
      "It requires too much data",
      "It is only suitable for electrical equipment"
    ],
    correctAnswer: 1,
    explanation: "Fixed-interval maintenance does not account for actual equipment condition. It can lead to over-maintenance (replacing components with remaining useful life, wasting money and introducing 'infant mortality' risk from the new component) and under-maintenance (failing to detect faults developing between service intervals). Condition-based maintenance addresses both problems."
  },
  {
    id: 12,
    question: "Under ST1426, trend analysis and predictive maintenance knowledge maps to:",
    options: [
      "Only commercial awareness requirements",
      "Condition monitoring, maintenance planning and continuous improvement competences",
      "Health and safety legislation only",
      "Technical drawing interpretation"
    ],
    correctAnswer: 1,
    explanation: "ST1426 requires maintenance technicians to understand predictive maintenance strategies, interpret condition monitoring data, and contribute to continuous improvement of maintenance processes. Trend analysis and data-driven decision-making are core competences for the modern maintenance technician."
  }
];

const faqs = [
  {
    question: "How do I start a predictive maintenance programme with limited resources?",
    answer: "Start small with the most critical assets. Identify your top 10 most critical equipment items (based on consequence of failure) and begin with the simplest, lowest-cost monitoring technique for each — typically vibration screening and thermal imaging. Build a baseline, establish trending, and expand the programme as you demonstrate value. Even basic route-based measurements with a handheld vibration meter and thermal camera can prevent costly failures."
  },
  {
    question: "What is the difference between condition monitoring and predictive maintenance?",
    answer: "Condition monitoring is the process of measuring equipment parameters (vibration, temperature, oil condition, insulation resistance). Predictive maintenance is the broader maintenance strategy that uses condition monitoring data, along with trend analysis and decision-making frameworks, to plan and schedule maintenance based on actual equipment condition. Condition monitoring provides the data; predictive maintenance is what you do with it."
  },
  {
    question: "How do I justify the cost of a predictive maintenance programme to management?",
    answer: "Track and present the financial benefits: unplanned downtime costs avoided, component life extensions achieved, emergency repair costs reduced, and spare parts inventory optimisation. A single prevented motor burnout (replacement motor cost plus production downtime) typically pays for several years of vibration monitoring on multiple motors. Frame it as risk reduction and cost avoidance, supported by data."
  },
  {
    question: "Can predictive maintenance completely eliminate breakdowns?",
    answer: "No. Predictive maintenance significantly reduces the frequency of breakdowns by detecting most developing faults before they cause failure. However, some failure modes (sudden catastrophic events, external damage, human error) cannot be predicted by condition monitoring. The goal is to move from predominantly reactive maintenance to predominantly planned maintenance — typically targeting 80% or more planned work."
  },
  {
    question: "What software tools are used for trend analysis?",
    answer: "Condition monitoring software (often supplied with data collectors) provides trending and spectral analysis. CMMS platforms (such as SAP PM, Maximo, Fiix, or eMaint) store data and generate work orders. Spreadsheets can be used for basic trending on small programmes. The key is consistent data entry and regular review of trends — the tool matters less than the discipline of using it."
  }
];

const MOETModule4Section2_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section2">
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
            <Shield className="h-4 w-4" />
            <span>Module 4.2.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Trend Analysis and Predictive Maintenance
          </h1>
          <p className="text-white/80">
            Converting condition monitoring data into maintenance decisions through trending and analysis
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>What:</strong> Analysing condition data trends to predict and prevent failures</li>
              <li className="pl-1"><strong>P-F curve:</strong> Window between detectable and functional failure</li>
              <li className="pl-1"><strong>Alarms:</strong> Alert and danger thresholds based on baselines</li>
              <li className="pl-1"><strong>KPIs:</strong> MTBF, MTTR, OEE measure programme effectiveness</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>CMMS:</strong> Central data store for all monitoring results</li>
              <li className="pl-1"><strong>Multi-technique:</strong> Combining vibration, thermal, oil and IR data</li>
              <li className="pl-1"><strong>Decisions:</strong> Run, monitor, plan, or act immediately</li>
              <li className="pl-1"><strong>ST1426:</strong> Maintenance planning and continuous improvement</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the P-F curve and its role in determining monitoring intervals",
              "Set meaningful alarm and trip levels based on baseline data",
              "Apply trend analysis to condition monitoring data for maintenance decisions",
              "Describe the role of CMMS in supporting predictive maintenance programmes",
              "Identify key maintenance KPIs and what they measure",
              "Link trend analysis to ST1426 continuous improvement requirements"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The P-F Curve and Failure Development
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The P-F curve is the foundational concept of predictive maintenance. It describes how equipment faults develop over time, from the point at which deterioration first becomes detectable to the point of actual functional failure. Understanding this concept is essential for designing effective monitoring programmes and determining appropriate monitoring intervals.
            </p>
            <p>
              Every piece of electrical equipment that fails through a progressive deterioration mechanism follows a P-F curve, whether the parameter being monitored is vibration, temperature, insulation resistance, oil condition, or any other measurable indicator. The shape and timescale of the curve varies enormously — a bearing failure in a large motor may have a P-F interval of several months, while insulation breakdown under thermal stress may develop over years. The key insight is that deterioration is usually detectable well before it causes a functional failure, provided you are measuring the right parameter at the right frequency.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Understanding the P-F Curve</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Point P (Potential failure):</strong> The point at which deterioration can first be detected by condition monitoring — e.g., a subtle increase in vibration or a slight change in insulation resistance</li>
                <li className="pl-1"><strong>Point F (Functional failure):</strong> The point at which the equipment can no longer perform its required function — breakdown, trip, or unsafe condition</li>
                <li className="pl-1"><strong>P-F interval:</strong> The time between P and F. This is the window of opportunity for planned maintenance. The monitoring interval must be less than half this value</li>
                <li className="pl-1"><strong>Different techniques detect at different points:</strong> Ultrasound and oil analysis may detect deterioration earlier than vibration, which detects earlier than thermal imaging. The earlier the detection, the longer the P-F interval</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">The Bathtub Curve</h3>
              <p className="text-sm text-white mb-2">
                The bathtub curve describes failure rate over an equipment's lifecycle in three phases:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Infant mortality (burn-in):</strong> High failure rate from manufacturing defects, installation errors and commissioning problems. Decreases as early failures are rectified</li>
                <li className="pl-1"><strong>Useful life:</strong> Low, approximately constant failure rate from random events. Time-based maintenance is least effective here because failures are random, not age-related</li>
                <li className="pl-1"><strong>Wear-out:</strong> Increasing failure rate as components reach end of life. Condition monitoring is most valuable here, detecting the onset of wear-out before failure</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">P-F Intervals for Electrical Equipment</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment / Fault Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Detection Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical P-F Interval</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor bearing degradation</td>
                      <td className="border border-white/10 px-3 py-2">Vibration analysis</td>
                      <td className="border border-white/10 px-3 py-2">1-9 months</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable insulation degradation</td>
                      <td className="border border-white/10 px-3 py-2">Insulation resistance trending</td>
                      <td className="border border-white/10 px-3 py-2">Months to years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Loose connection (thermal)</td>
                      <td className="border border-white/10 px-3 py-2">Thermographic survey</td>
                      <td className="border border-white/10 px-3 py-2">Weeks to months</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformer oil degradation</td>
                      <td className="border border-white/10 px-3 py-2">Dissolved gas analysis</td>
                      <td className="border border-white/10 px-3 py-2">Months to years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Contactor contact erosion</td>
                      <td className="border border-white/10 px-3 py-2">Contact resistance measurement</td>
                      <td className="border border-white/10 px-3 py-2">Weeks to months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Research shows that only approximately 11% of equipment failures follow the traditional 'wear-out' pattern. Most failures are random. This means time-based replacement is ineffective for the majority of failures — only condition-based monitoring can detect them.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Setting Alarm Levels and Decision Thresholds
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective trending requires clear decision thresholds — defined levels at which specific actions are triggered. Without thresholds, data collection becomes an academic exercise rather than a practical maintenance tool. The alarm levels must be meaningful: set too low and they generate nuisance alarms that are ignored; set too high and they fail to provide adequate warning of developing faults.
            </p>
            <p>
              The most effective approach is to establish baseline readings during commissioning or during a period of known good operation, then set alarm levels relative to that baseline using statistical methods. This accounts for the natural variation inherent in any measurement and ensures that alarms are triggered only by genuine changes in equipment condition.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Two-Level Alarm System</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Alert level:</strong> Indicates a change from normal condition. Action: increase monitoring frequency, investigate the cause, plan maintenance. Typically set at 2 standard deviations above baseline or at the ISO Zone B/C boundary</li>
                <li className="pl-1"><strong>Danger level:</strong> Indicates severity sufficient to cause damage or imminent failure. Action: immediate intervention — controlled shutdown, emergency maintenance. Typically set at 3 standard deviations or the ISO Zone C/D boundary</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Rate of Change Alarms</p>
              <p className="text-sm text-white">
                In addition to absolute level alarms, rate of change alarms detect rapid deterioration. A parameter that increases by more than a defined percentage between consecutive readings triggers an alert even if the absolute value is still below the alarm level. This catches rapidly developing faults that might reach failure before the next scheduled measurement. For example, a vibration reading that doubles in one month — even if still below the alert threshold — indicates a rapidly developing fault that warrants immediate investigation.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Decision Framework</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Below alert: continue routine monitoring</li>
                  <li className="pl-1">At alert: investigate, increase frequency</li>
                  <li className="pl-1">Rising trend: plan maintenance intervention</li>
                  <li className="pl-1">At danger: act immediately</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Refining Thresholds</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Start with generic standards (ISO 10816)</li>
                  <li className="pl-1">Refine using actual baseline data</li>
                  <li className="pl-1">Account for operating conditions (load, speed)</li>
                  <li className="pl-1">Review and adjust based on experience</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            CMMS Integration and Data Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A computerised maintenance management system (CMMS) is the backbone of an effective predictive maintenance programme. It stores all condition monitoring data, generates trends, manages alarm thresholds, triggers work orders and tracks maintenance KPIs. Without a CMMS, managing condition data across hundreds or thousands of assets becomes impractical, and the transition from data collection to data-driven decision-making is impossible.
            </p>
            <p>
              For the maintenance technician, the CMMS is both a tool and a responsibility. You are the primary data creator — the quality of the data you enter directly determines the quality of the trend analysis and the reliability of the maintenance decisions that follow. Entering a vibration reading against the wrong asset, recording the wrong measurement point, or failing to note the operating conditions at the time of measurement can corrupt the trend data and lead to incorrect decisions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">CMMS Functions for Predictive Maintenance</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Data storage:</strong> Historical repository for all condition monitoring readings, linked to individual equipment records</li>
                <li className="pl-1"><strong>Trend generation:</strong> Automatic plotting of parameters over time with alarm thresholds displayed</li>
                <li className="pl-1"><strong>Alarm management:</strong> Automatic notification when readings exceed thresholds</li>
                <li className="pl-1"><strong>Work order generation:</strong> Automatic creation of maintenance work orders triggered by alarm conditions</li>
                <li className="pl-1"><strong>KPI tracking:</strong> Dashboard reporting of MTBF, MTTR, availability, OEE and maintenance costs</li>
                <li className="pl-1"><strong>Asset history:</strong> Complete maintenance and condition history for each equipment item</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Data Quality — Garbage In, Garbage Out</p>
              <p className="text-sm text-white">
                The value of any predictive maintenance programme depends entirely on data quality. Inconsistent measurements, missing records, incorrect equipment identification and poor data entry undermine the entire system. Ensure every reading is recorded with the correct equipment ID, date, operating conditions and measurement point. A CMMS is only as good as the data entered into it. One incorrectly entered reading can distort a trend and trigger unnecessary maintenance — or, worse, mask a genuine developing fault.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Maintenance KPIs and Programme Effectiveness
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Key performance indicators (KPIs) measure the effectiveness of the predictive maintenance programme and demonstrate its value to the organisation. Understanding and contributing to KPI improvement is an important competence for maintenance technicians. KPIs provide objective evidence of whether the maintenance programme is achieving its goals — reducing breakdowns, improving availability, and optimising maintenance costs.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">KPI</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What It Measures</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Target Direction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MTBF</td>
                      <td className="border border-white/10 px-3 py-2">Average time between failures</td>
                      <td className="border border-white/10 px-3 py-2">Increase (more reliable)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MTTR</td>
                      <td className="border border-white/10 px-3 py-2">Average time to repair</td>
                      <td className="border border-white/10 px-3 py-2">Decrease (faster repairs)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Availability</td>
                      <td className="border border-white/10 px-3 py-2">Uptime as percentage of planned time</td>
                      <td className="border border-white/10 px-3 py-2">Increase (above 95%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">OEE</td>
                      <td className="border border-white/10 px-3 py-2">Availability x Performance x Quality</td>
                      <td className="border border-white/10 px-3 py-2">Increase (above 85%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Planned vs Reactive %</td>
                      <td className="border border-white/10 px-3 py-2">Ratio of planned to unplanned maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Increase planned (above 80%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PdM hit rate</td>
                      <td className="border border-white/10 px-3 py-2">Percentage of predictions confirmed correct</td>
                      <td className="border border-white/10 px-3 py-2">Increase (validates programme)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires understanding of maintenance strategies, continuous improvement and the ability to contribute to improving equipment reliability. Trend analysis and KPI management are core competences for modern maintenance practice.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Building an Effective Predictive Maintenance Programme
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Implementing a predictive maintenance programme is not simply a matter of buying monitoring equipment and taking readings. It requires a systematic approach that begins with understanding the assets, defining the monitoring strategy, establishing baselines, and building the organisational processes and skills to sustain the programme over time. Many organisations fail not because the technology does not work, but because the implementation lacks structure, commitment, or the data discipline to make it effective.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 1 — Asset Criticality Assessment</h3>
                <p className="text-sm text-white">
                  Not every asset justifies predictive maintenance. Begin by assessing criticality: what is the consequence of failure for each asset in terms of safety, production loss, environmental impact, and repair cost? Focus monitoring resources on the assets where the consequence of failure is highest. A criticality matrix (likelihood x consequence) provides a rational basis for prioritisation.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 2 — Technique Selection</h3>
                <p className="text-sm text-white">
                  Select the most appropriate monitoring technique for each asset based on the dominant failure modes. For rotating machinery, vibration analysis is typically the primary technique. For electrical connections, thermography is most effective. For transformers, dissolved gas analysis provides the best early warning. For cables and insulation systems, insulation resistance trending is the foundation. Where possible, combine multiple techniques for higher diagnostic confidence.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 3 — Baseline and Trending</h3>
                <p className="text-sm text-white">
                  Establish baseline readings under known good conditions — ideally during commissioning or after a major overhaul. These baselines become the reference point for all future comparisons. Begin regular trending immediately, plotting each measurement on a time-series graph. Look for gradual upward or downward trends, step changes, and cyclical patterns. A minimum of three data points is needed to confirm a trend, which is why the monitoring interval must allow multiple readings within the P-F interval.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Pitfalls in PdM Implementation</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Collecting data without analysing it:</strong> Data that sits unreviewed in a CMMS provides no value — schedule regular trend review meetings</li>
                <li className="pl-1"><strong>Monitoring everything equally:</strong> Focus on critical assets — not every motor needs weekly vibration readings</li>
                <li className="pl-1"><strong>Ignoring the human element:</strong> Technicians need training in measurement techniques and basic trend interpretation</li>
                <li className="pl-1"><strong>Expecting instant results:</strong> PdM programmes take 12 to 24 months to build sufficient data for reliable trending</li>
                <li className="pl-1"><strong>Poor data discipline:</strong> Inconsistent measurement points, missed readings, and data entry errors destroy trend reliability</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Remember:</strong> Predictive maintenance is a journey, not a destination. Start with the basics, build data, demonstrate value, and progressively expand. The maintenance technician who consistently collects accurate data, reviews trends, and acts on the findings is contributing directly to improved reliability, safety, and cost efficiency.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
                <p className="font-medium text-white mb-1">P-F Curve Essentials</p>
                <ul className="space-y-0.5">
                  <li>P = first detectable deterioration</li>
                  <li>F = functional failure (breakdown)</li>
                  <li>Monitor at less than half P-F interval</li>
                  <li>Earlier detection = longer P-F interval</li>
                  <li>Only 11% of failures are age-related</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key KPIs</p>
                <ul className="space-y-0.5">
                  <li>MTBF — mean time between failures</li>
                  <li>MTTR — mean time to repair</li>
                  <li>OEE — availability x performance x quality</li>
                  <li>Planned vs reactive ratio (target 80%+)</li>
                  <li>PdM hit rate validates predictions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section2-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Oil and Fluid Analysis
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section2">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section2_6;
