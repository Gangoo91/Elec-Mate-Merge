import { ArrowLeft, BarChart3, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Criticality Analysis of Equipment - MOET Module 4 Section 7.3";
const DESCRIPTION = "Understanding how to assess and rank equipment criticality for maintenance prioritisation, including criticality matrices, risk-based ranking, consequence assessment, and how criticality drives maintenance strategy selection for electrical systems aligned to ST1426.";

const quickCheckQuestions = [
  {
    id: "criticality-purpose",
    question: "The primary purpose of criticality analysis in maintenance management is to:",
    options: [
      "Determine which equipment should be scrapped",
      "Rank equipment based on the consequences of its failure so that maintenance resources can be focused on the most important assets first",
      "Calculate the purchase price of all equipment",
      "Determine the number of spare parts to hold for every item"
    ],
    correctIndex: 1,
    explanation: "Criticality analysis ranks equipment based on the impact that its failure would have on safety, the environment, production, quality and cost. This ranking enables the maintenance organisation to allocate its limited resources (technician time, condition monitoring, spare parts investment) to the assets where failure would have the greatest consequences. Critical assets receive the most comprehensive maintenance strategy, while non-critical assets may be maintained with simpler or less frequent tasks, or deliberately run to failure."
  },
  {
    id: "criticality-factors",
    question: "When assessing the criticality of a piece of electrical equipment, the key factors to consider include:",
    options: [
      "Only the physical size of the equipment",
      "The consequences of failure across multiple dimensions: safety impact, environmental impact, production impact, repair cost and time, and the availability of redundancy or backup",
      "Only the age of the equipment",
      "Only the original purchase price"
    ],
    correctIndex: 1,
    explanation: "Criticality is determined by the consequences of failure, not by the physical characteristics or cost of the equipment. A small, inexpensive relay that protects against a safety-critical failure may be more critical than a large, expensive motor that has a standby backup. The assessment considers: would a failure cause injury or death? Would it cause environmental harm? Would it stop production? How long would it take to repair? Is there redundancy? Each factor is scored and the overall criticality rating determines the maintenance strategy."
  },
  {
    id: "criticality-categories",
    question: "A typical criticality classification system categorises equipment as:",
    options: [
      "Only 'important' or 'not important'",
      "Critical (A) — essential, no redundancy, high failure consequence; Important (B) — significant impact but some mitigation available; General (C) — low consequence, run-to-failure acceptable",
      "Only by manufacturer name",
      "Only by installation date"
    ],
    correctIndex: 1,
    explanation: "Most criticality systems use three or four categories. Critical (A) assets are those where failure would have serious safety, environmental or production consequences and where no backup or redundancy exists — these receive the most comprehensive maintenance. Important (B) assets have moderate consequences or have partial redundancy — they receive targeted preventive maintenance. General (C) assets have low failure consequences and are typically managed with basic inspection or run-to-failure. This ABC classification directly drives the maintenance strategy for each asset."
  },
  {
    id: "criticality-maintenance-link",
    question: "The relationship between criticality and maintenance strategy is:",
    options: [
      "There is no relationship — all equipment receives the same maintenance",
      "Higher-criticality equipment receives more comprehensive, proactive maintenance strategies (condition monitoring, predictive techniques, comprehensive PM), while lower-criticality equipment receives simpler or reactive strategies",
      "Only critical equipment receives any maintenance at all",
      "Lower-criticality equipment always receives more maintenance than higher-criticality equipment"
    ],
    correctIndex: 1,
    explanation: "Criticality directly determines maintenance strategy. Critical (A) assets typically receive: condition-based monitoring (vibration, thermography, oil analysis), comprehensive PPM with shorter intervals, detailed FMEA, priority spare parts holding, and detailed failure investigation when breakdowns occur. Important (B) assets receive targeted PPM and selective condition monitoring. General (C) assets receive basic inspection or are managed on a run-to-failure basis. This ensures that maintenance effort is proportional to the consequences of failure."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Criticality analysis should be performed:",
    options: [
      "Only when a new piece of equipment is installed",
      "As a systematic exercise covering all assets, and reviewed periodically or when operating conditions change, new equipment is added, or following significant failures that reveal previously underestimated consequences",
      "Only after a major breakdown",
      "Only by the equipment manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Criticality analysis should be a systematic, documented exercise covering all maintainable assets. It should be reviewed periodically (typically annually or as part of the maintenance review cycle) and updated when circumstances change: new equipment is installed, production requirements change, redundancy is added or removed, regulations change, or a failure reveals consequences that were not previously recognised. A criticality register that is never reviewed becomes outdated and ceases to drive appropriate maintenance decisions."
  },
  {
    id: 2,
    question: "A criticality matrix typically scores each asset against factors including:",
    options: [
      "Only the weight of the equipment",
      "Safety impact (severity of potential harm), environmental impact, production impact (downtime cost), frequency of failure, detection difficulty, and repair time/cost",
      "Only the distance from the maintenance workshop",
      "Only the noise level during operation"
    ],
    correctAnswer: 1,
    explanation: "A criticality matrix scores each asset against multiple consequence dimensions. Common factors include: safety impact (from no impact to potential fatality), environmental impact (from none to reportable incident), production impact (from none to complete plant shutdown), failure frequency (how often the failure mode is expected to occur), detectability (how easily a developing fault can be detected), and repair time/cost (from quick replacement to extended rebuild). Each factor is scored on a numerical scale, and the scores are combined to produce an overall criticality rating."
  },
  {
    id: 3,
    question: "In a criticality matrix, a motor on a critical production line with no standby backup would typically be rated:",
    options: [
      "Low criticality because motors are common items",
      "High criticality (A) because its failure would stop production, there is no redundancy, and the consequences include significant lost production and potential supply chain impacts",
      "Medium criticality because it can be repaired eventually",
      "Not rated because motors do not need criticality analysis"
    ],
    correctAnswer: 1,
    explanation: "The criticality of the motor is determined by the consequences of its failure in context, not by its inherent characteristics. A motor on a critical production line with no backup scores highly on production impact (line stops), repair time (may need specialist parts or winding), and lack of redundancy (no alternative path). This makes it a high-criticality (A) asset, warranting comprehensive maintenance: vibration monitoring, thermographic survey, insulation resistance testing, detailed PM schedule, and priority spare parts. The same model of motor in a non-critical application might be rated C."
  },
  {
    id: 4,
    question: "A standby generator used for emergency power in a hospital would be classified as:",
    options: [
      "Low criticality because it only runs occasionally",
      "High criticality (A) because its failure during a mains outage could have life-safety consequences — the low running hours do not reduce its criticality because the consequence of failure when needed is extreme",
      "Medium criticality because it has a long service life",
      "Not applicable because generators are not electrical equipment"
    ],
    correctAnswer: 1,
    explanation: "Criticality is based on the consequences of failure, not on how often the equipment runs. A standby generator in a hospital has extreme consequences if it fails when demanded — loss of power to operating theatres, life support equipment, and essential services. Despite running for only a few hours per year, it must be classified as critical (A) with a comprehensive maintenance and testing regime including regular load testing, fuel system maintenance, battery and starter checks, automatic transfer switch testing, and periodic full-load runs. This is an example of RCM's failure-finding task applied to equipment with hidden failure potential."
  },
  {
    id: 5,
    question: "The concept of 'redundancy' affects criticality because:",
    options: [
      "Redundant equipment does not need any maintenance",
      "If a standby or backup system exists and can maintain the required function when the primary system fails, the overall consequence of a single failure is reduced — but the backup system itself becomes critical and must be maintained to ensure it works when needed",
      "Redundancy makes all equipment non-critical",
      "Redundancy only applies to IT systems"
    ],
    correctAnswer: 1,
    explanation: "Redundancy reduces the production consequence of a single failure — if Pump A fails, Pump B can take over. However, this does not mean Pump A or Pump B can be neglected. Each pump individually may be rated as important (B) rather than critical (A) because the other provides backup. But the system as a whole remains critical, and the backup pump must be maintained and tested to ensure it will actually work when called upon. A common failure is neglecting the standby unit because it is 'not running' — which defeats the purpose of having redundancy."
  },
  {
    id: 6,
    question: "A Risk Priority Number (RPN) is calculated by:",
    options: [
      "Adding the criticality score to the asset number",
      "Multiplying Severity (S) x Occurrence (O) x Detection (D) to produce a number that ranks the overall risk of each failure mode",
      "Dividing the purchase price by the expected life",
      "Counting the number of maintenance tasks assigned"
    ],
    correctAnswer: 1,
    explanation: "The Risk Priority Number (RPN) is a tool from FMEA that combines three factors: Severity (how serious are the consequences of this failure mode — scored 1-10), Occurrence (how likely is this failure mode to occur — scored 1-10), and Detection (how likely is it that the failure will be detected before it causes the consequence — scored 1-10, where 10 means very hard to detect). RPN = S x O x D, giving a range from 1 to 1,000. Higher RPN values indicate failure modes that need priority attention. The RPN drives both criticality ranking and maintenance task selection."
  },
  {
    id: 7,
    question: "When two assets have the same production impact but one has a safety consequence and the other does not, the asset with the safety consequence should:",
    options: [
      "Be treated identically to the other asset",
      "Always be ranked higher in criticality because safety consequences take priority over all other factors in the criticality assessment — safety is non-negotiable",
      "Be given a lower criticality rating to save money",
      "Only be assessed after all other assets"
    ],
    correctAnswer: 1,
    explanation: "Safety always takes priority in criticality assessment. An asset whose failure could cause injury or death must be ranked as critical regardless of its production impact. This reflects the legal duty of care under the Health and Safety at Work etc. Act 1974 and the Electricity at Work Regulations 1989 — the employer must ensure that electrical systems are maintained so as to prevent danger. No economic argument can justify accepting a safety risk. The criticality assessment must reflect this hierarchy: safety first, then environmental, then operational, then economic."
  },
  {
    id: 8,
    question: "A criticality register should contain, as a minimum:",
    options: [
      "Only the equipment name and location",
      "Asset identification, function, criticality rating (A/B/C), the basis for the rating (what consequences were considered), the assigned maintenance strategy, and review date",
      "Only the manufacturer's serial number",
      "Only the date of last maintenance"
    ],
    correctAnswer: 1,
    explanation: "A useful criticality register documents: asset identification (tag number, description, location), the asset's function in the system, the criticality rating (A, B or C), the justification for the rating (what failure consequences were considered and scored), the maintenance strategy assigned based on the criticality (condition monitoring, PPM, run-to-failure), spare parts holding decision, and the date of last review. This documentation ensures that criticality decisions are traceable, reviewable and auditable — not based on individual opinion or tradition."
  },
  {
    id: 9,
    question: "A common mistake in criticality analysis is:",
    options: [
      "Including too many assets in the analysis",
      "Assessing criticality based on the cost or size of the equipment rather than the consequences of its failure in its operating context — a cheap relay protecting a safety function may be more critical than an expensive motor with a backup",
      "Involving operators in the assessment",
      "Using a numerical scoring system"
    ],
    correctAnswer: 1,
    explanation: "One of the most common mistakes is confusing asset value with asset criticality. A large, expensive transformer with a standby backup may be less critical than a small, cheap RCD that provides the sole means of earth fault protection for a socket circuit used by production staff. Criticality is about consequences of failure in context, not about the inherent value or complexity of the equipment. Other common mistakes include: not considering hidden failures (standby/protective devices), not accounting for secondary damage, and not reviewing the analysis when conditions change."
  },
  {
    id: 10,
    question: "The maintenance strategy for a Critical (A) rated electrical panel would typically include:",
    options: [
      "No maintenance — just replace it when it fails",
      "Comprehensive condition monitoring (annual thermographic survey, scheduled IR testing of busbars), detailed PPM (annual inspection, torque checks, cleaning), priority spare parts holding, and documented failure investigation for any breakdown",
      "Only a visual check every 5 years",
      "Only cleaning the panel exterior"
    ],
    correctAnswer: 1,
    explanation: "Critical (A) assets warrant the most comprehensive maintenance approach: condition monitoring (thermographic surveys to detect hot joints, insulation resistance testing for busbar degradation, partial discharge monitoring for HV panels), comprehensive PPM (scheduled inspections with torque checks, cleaning, functional testing of protection devices), priority spare parts (key components held in stock or on guaranteed delivery), emergency response plan (documented procedure for rapid repair), and detailed investigation and root cause analysis following any failure."
  },
  {
    id: 11,
    question: "For a General (C) rated asset such as a convenience socket outlet in a storage area, the appropriate maintenance strategy is typically:",
    options: [
      "The same comprehensive strategy as a Critical (A) asset",
      "Basic periodic inspection as part of the fixed installation inspection programme (BS 7671), with repair or replacement when a fault is reported — a run-to-failure approach is acceptable because the consequences of failure are low",
      "No inspection or maintenance of any kind",
      "Daily condition monitoring with specialist equipment"
    ],
    correctAnswer: 1,
    explanation: "General (C) assets have low consequences of failure and do not justify comprehensive proactive maintenance. A convenience socket outlet in a storage area would be inspected as part of the periodic inspection and testing programme required by BS 7671 (typically every 5 years for a commercial premises), and repaired or replaced when a fault is reported by the user. This is a run-to-failure strategy with basic statutory inspection — it is appropriate because the consequence of the socket failing is minimal (no safety, environmental or production impact beyond minor inconvenience)."
  },
  {
    id: 12,
    question: "In the context of ST1426, understanding criticality analysis enables the maintenance technician to:",
    options: [
      "Only maintain the most expensive equipment",
      "Understand why different assets have different maintenance strategies, contribute to criticality assessments using their operational knowledge, prioritise their own work based on asset criticality, and explain to colleagues why maintenance effort varies between assets",
      "Avoid maintaining any non-critical equipment",
      "Only work on equipment that has already failed"
    ],
    correctAnswer: 1,
    explanation: "ST1426 expects maintenance technicians to understand the rationale behind maintenance planning and contribute to continuous improvement. Understanding criticality enables the technician to: prioritise their own work (critical equipment first when multiple tasks compete for time), contribute practical knowledge to criticality assessments (they know which equipment causes the most problems), understand why some equipment gets more attention than others, and explain the maintenance strategy to operators and colleagues. This understanding is valued in the End Point Assessment professional discussion."
  }
];

const faqs = [
  {
    question: "Who should carry out the criticality analysis?",
    answer: "Criticality analysis should be a team exercise involving maintenance technicians, maintenance planners, production/operations staff, and the engineering manager. Technicians bring knowledge of failure modes and repair times, operators bring knowledge of the production impact of equipment failure, planners bring knowledge of maintenance costs and history, and the manager provides the strategic perspective. A team-based approach ensures the assessment is comprehensive and that the resulting maintenance strategies have buy-in from all stakeholders."
  },
  {
    question: "How often should criticality ratings be reviewed?",
    answer: "Criticality ratings should be reviewed at least annually as part of the maintenance programme review, and also when: new equipment is installed, production requirements change (an asset that was non-critical may become critical if production increases), redundancy is added or removed, a failure reveals consequences that were not previously recognised, regulations change, or the operating context changes significantly. A criticality register that is never reviewed becomes a historical document rather than a living management tool."
  },
  {
    question: "What is the difference between criticality analysis and risk assessment?",
    answer: "Criticality analysis and risk assessment are related but different exercises. Risk assessment (as required by the Management of Health and Safety at Work Regulations 1999) focuses on identifying hazards and evaluating the risk to people's health and safety. Criticality analysis is broader — it considers safety, environmental, operational and economic consequences of equipment failure. In practice, safety risk assessment should inform the safety dimension of the criticality analysis. An asset with a high safety risk will always be rated as critical."
  },
  {
    question: "Should I apply the same criticality framework to all types of equipment?",
    answer: "The same framework (same consequence categories, same scoring scale) should be applied to all assets to ensure consistency and comparability. However, the specific failure modes, consequences and probabilities will be different for different equipment types. A motor, a VSD, a distribution panel and a PLC each have different failure modes and different consequences. The framework provides a consistent basis for comparison, while the specific analysis is tailored to each asset type and its operating context."
  },
  {
    question: "What do I do if I disagree with the criticality rating assigned to an asset?",
    answer: "Raise it through the appropriate channel — typically at a maintenance review meeting or with your supervisor. If you believe an asset is rated too low (based on your experience of its failure consequences or frequency), provide specific evidence: describe the failures you have witnessed, the consequences that occurred, and why you believe the rating should be higher. Similarly, if you believe an asset is rated too high and is consuming excessive maintenance resources, present the evidence. Criticality analysis should be a living process, and practical feedback from technicians is essential to keeping it accurate."
  }
];

const MOETModule4Section7_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <BarChart3 className="h-4 w-4" />
            <span>Module 4.7.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Criticality Analysis of Equipment
          </h1>
          <p className="text-white/80">
            Ranking assets by failure consequences to focus maintenance where it matters most
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Consequence-based:</strong> Criticality reflects failure impact, not equipment cost or size</li>
              <li className="pl-1"><strong>ABC classification:</strong> Critical, Important, General — drives maintenance strategy</li>
              <li className="pl-1"><strong>Multi-factor:</strong> Safety, environment, production, repair time, redundancy</li>
              <li className="pl-1"><strong>Resource allocation:</strong> Focus maintenance effort on the assets that matter most</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Work prioritisation:</strong> Critical assets take priority when tasks compete for time</li>
              <li className="pl-1"><strong>Practical input:</strong> Your failure mode knowledge improves criticality accuracy</li>
              <li className="pl-1"><strong>Strategy understanding:</strong> Explains why different assets have different PM schedules</li>
              <li className="pl-1"><strong>ST1426:</strong> Demonstrates understanding of maintenance planning and prioritisation</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose of criticality analysis in maintenance management",
              "Identify the factors that determine equipment criticality",
              "Apply a criticality matrix to rank electrical equipment by failure consequence",
              "Describe how criticality ratings drive maintenance strategy selection",
              "Explain the role of redundancy in criticality assessment",
              "Contribute to criticality reviews using practical maintenance knowledge"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Criticality Analysis Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every maintenance organisation has limited resources — there are never enough technicians, enough time, enough budget or enough shutdown windows to do everything perfectly. Criticality analysis provides a rational, documented basis for deciding where to focus those resources for maximum impact. Without it, maintenance effort tends to be distributed based on tradition, personal preference, or whoever shouts loudest when their equipment breaks down.
            </p>
            <p>
              The core principle is simple: not all equipment is equally important. A failure in a safety-critical protective system has fundamentally different consequences from a failure in a convenience socket outlet. The maintenance strategy should reflect this difference. A comprehensive condition monitoring programme on a critical production motor is money well spent. The same programme on a non-critical ventilation fan in a storage room would be wasteful.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Problem Without Criticality Analysis</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Over-maintenance of non-critical assets:</strong> Technician time spent on equipment where failure has minimal consequences</li>
                <li className="pl-1"><strong>Under-maintenance of critical assets:</strong> Important equipment does not receive the attention it needs because resources are spread too thinly</li>
                <li className="pl-1"><strong>Reactive firefighting:</strong> Without prioritisation, every breakdown feels equally urgent, leading to constant firefighting</li>
                <li className="pl-1"><strong>Inefficient spare parts:</strong> Stock held for non-critical items while critical spares are not available</li>
                <li className="pl-1"><strong>No basis for investment:</strong> Difficult to justify condition monitoring or PM investment without documented criticality</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Practical Example: Two Motors, Same Model</p>
              <p className="text-sm text-white mb-2">
                Consider two identical 30 kW motors — same manufacturer, same model, same age:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Motor A:</strong> Drives the main production line conveyor. No standby. Failure stops the entire factory. 8-hour repair time. Lost production cost is very high per hour</li>
                <li className="pl-1"><strong>Motor B:</strong> Drives a ventilation fan in the warehouse. Standby fan available. Failure causes minor inconvenience. 4-hour repair time. No production impact</li>
              </ul>
              <p className="text-sm text-white mt-2 italic">
                Same motor, entirely different criticality. Motor A is Critical (A) — full condition monitoring, comprehensive PM, priority spares. Motor B is General (C) — basic inspection, run-to-failure acceptable. This is criticality in action.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Criticality is a property of the asset in its operating context, not a property of the equipment type. The same model of motor, VSD or panel can have different criticality ratings depending on what it does, where it is, and what happens if it fails.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Criticality Matrix
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A criticality matrix provides a structured, repeatable method for assessing and scoring the criticality of each asset. By scoring multiple consequence factors on a consistent scale, the matrix produces an overall criticality rating that can be used to rank all assets and assign appropriate maintenance strategies. The matrix ensures that criticality decisions are based on objective criteria rather than subjective opinion.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Criticality Scoring Matrix</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-center">Score 1 (Low)</th>
                      <th className="border border-white/10 px-3 py-2 text-center">Score 3 (Medium)</th>
                      <th className="border border-white/10 px-3 py-2 text-center">Score 5 (High)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Safety</td>
                      <td className="border border-white/10 px-3 py-2 text-center">No risk to people</td>
                      <td className="border border-white/10 px-3 py-2 text-center">Minor injury possible</td>
                      <td className="border border-white/10 px-3 py-2 text-center">Serious injury or fatality possible</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Environment</td>
                      <td className="border border-white/10 px-3 py-2 text-center">No environmental impact</td>
                      <td className="border border-white/10 px-3 py-2 text-center">Minor contained release</td>
                      <td className="border border-white/10 px-3 py-2 text-center">Reportable environmental incident</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Production</td>
                      <td className="border border-white/10 px-3 py-2 text-center">No impact on output</td>
                      <td className="border border-white/10 px-3 py-2 text-center">Reduced output or quality</td>
                      <td className="border border-white/10 px-3 py-2 text-center">Complete production stop</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Repair Time</td>
                      <td className="border border-white/10 px-3 py-2 text-center">Under 1 hour</td>
                      <td className="border border-white/10 px-3 py-2 text-center">1-8 hours</td>
                      <td className="border border-white/10 px-3 py-2 text-center">Over 8 hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Redundancy</td>
                      <td className="border border-white/10 px-3 py-2 text-center">Full backup available</td>
                      <td className="border border-white/10 px-3 py-2 text-center">Partial mitigation possible</td>
                      <td className="border border-white/10 px-3 py-2 text-center">No redundancy at all</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Total score: 5-9 = General (C), 10-17 = Important (B), 18-25 = Critical (A). Safety score of 5 automatically overrides to Critical (A) regardless of total.</p>
            </div>

            <p>
              The matrix should be applied systematically to every asset in the maintenance register. The scoring is typically done by a small team that includes a maintenance technician (who knows how the equipment fails and how long repairs take), an operator (who knows the production impact), and a planner or manager (who has the overview of the system). The resulting scores are documented in the criticality register and linked to the CMMS asset record.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Any asset with a safety score of 5 (serious injury or fatality possible) should automatically be rated Critical (A) regardless of the other scores. Safety consequences override all other considerations. This is a non-negotiable principle that reflects legal and ethical obligations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            From Criticality to Maintenance Strategy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The criticality rating directly determines the maintenance strategy for each asset. This is the practical output of the analysis — it translates the criticality assessment into specific maintenance actions, frequencies, spare parts decisions, and failure response procedures. The link between criticality and strategy must be documented, understood and followed.
            </p>

            <div className="my-6 space-y-3">
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                <h3 className="text-sm font-medium text-red-400 mb-2">Critical (A) — Comprehensive Proactive Strategy</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Full condition monitoring programme (vibration, thermography, IR testing, oil analysis as applicable)</li>
                  <li className="pl-1">Comprehensive PPM schedule with shorter intervals</li>
                  <li className="pl-1">Detailed FMEA to identify all significant failure modes</li>
                  <li className="pl-1">Priority spare parts held in stock or on guaranteed rapid delivery</li>
                  <li className="pl-1">Documented emergency response and repair procedures</li>
                  <li className="pl-1">Root cause analysis mandatory for every unplanned failure</li>
                  <li className="pl-1">Regular review of maintenance effectiveness</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <h3 className="text-sm font-medium text-yellow-400 mb-2">Important (B) — Targeted Proactive Strategy</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Selective condition monitoring (thermography, key measurements)</li>
                  <li className="pl-1">Standard PPM schedule based on manufacturer recommendations and experience</li>
                  <li className="pl-1">Key spare parts identified and sourced (not necessarily held in stock)</li>
                  <li className="pl-1">Root cause analysis for repeated failures or significant events</li>
                  <li className="pl-1">Periodic review of failure history to adjust strategy</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                <h3 className="text-sm font-medium text-green-400 mb-2">General (C) — Basic or Reactive Strategy</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Basic periodic inspection (as part of statutory requirements e.g. BS 7671)</li>
                  <li className="pl-1">Run-to-failure acceptable for most failure modes</li>
                  <li className="pl-1">Spare parts sourced when needed (standard supply chain)</li>
                  <li className="pl-1">Repair on failure, no detailed investigation required</li>
                  <li className="pl-1">Consider for replacement rather than expensive repair</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Example: Distribution Board Hierarchy</p>
              <p className="text-sm text-white mb-2">Consider three distribution boards in a manufacturing facility:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Main switchboard (MSB):</strong> Feeds the entire facility. Critical (A). Annual thermographic survey, 6-monthly insulation testing, trip test programme for all protection, spare MCCB held in stock</li>
                <li className="pl-1"><strong>Production sub-board (DB1):</strong> Feeds one production line. Standby changeover available. Important (B). Annual thermographic survey, annual inspection, key spares identified</li>
                <li className="pl-1"><strong>Office lighting board (DB7):</strong> Feeds office lighting only. General (C). 5-yearly periodic inspection per BS 7671, repair on fault report</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The maintenance strategy must be proportional to the criticality. Applying a Critical (A) strategy to a General (C) asset wastes resources. Applying a General (C) strategy to a Critical (A) asset creates unacceptable risk. Getting this alignment right is one of the most important decisions in maintenance management.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Implementing and Maintaining the Criticality Register
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A criticality register is only valuable if it is implemented effectively, kept current, and used to drive real maintenance decisions. Too often, organisations invest time in creating a criticality analysis but then fail to translate it into practice, or allow it to become outdated. The register must be a living document that actively shapes day-to-day maintenance priorities.
            </p>

            <div className="my-6 space-y-3">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 1 — Create the Asset Register</h3>
                <p className="text-sm text-white">
                  List all maintainable electrical assets: motors, drives, panels, transformers, generators, UPS systems, protection devices, control systems and instrumentation. Each asset should have a unique identifier (tag number) linked to the CMMS. Include the asset's function, location and the system it serves.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 2 — Score Each Asset</h3>
                <p className="text-sm text-white">
                  Apply the criticality matrix to each asset as a team exercise. Score safety, environment, production, repair time and redundancy. Document the scores and the rationale. Identify any assets where the rating is uncertain and flag them for further review or discussion with operations.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 3 — Assign Maintenance Strategies</h3>
                <p className="text-sm text-white">
                  Map each criticality category to a maintenance strategy template. Link the strategies to specific CMMS PM schedules, condition monitoring routes and spare parts lists. Ensure every Critical (A) asset has a comprehensive strategy, every Important (B) asset has a targeted strategy, and every General (C) asset has at minimum the statutory inspection requirements covered.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 4 — Review and Update</h3>
                <p className="text-sm text-white">
                  Schedule annual reviews of the criticality register. Update when: new assets are installed, assets are decommissioned, production requirements change, redundancy is added or removed, a failure reveals previously unrecognised consequences, or regulatory requirements change. Track changes to maintain an audit trail.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Signs of Effective Implementation</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Technicians know which assets are critical in their area</li>
                  <li className="pl-1">PM schedules reflect criticality (more tasks on A, fewer on C)</li>
                  <li className="pl-1">Spare parts stock aligns with criticality priorities</li>
                  <li className="pl-1">Breakdown response prioritises critical equipment</li>
                  <li className="pl-1">Criticality register is referenced in maintenance reviews</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Implementation Failures</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Analysis done but not linked to CMMS or PM schedules</li>
                  <li className="pl-1">Register created but never reviewed or updated</li>
                  <li className="pl-1">Criticality not communicated to technicians and operators</li>
                  <li className="pl-1">Same PM applied to all assets regardless of rating</li>
                  <li className="pl-1">No process for challenging or updating ratings</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Criticality analysis is not a one-off project — it is an ongoing management process. The initial analysis establishes the baseline, but the real value comes from using it daily to guide maintenance decisions, and updating it continuously as the organisation learns more about its assets and their failure behaviour. A well-maintained criticality register is one of the most valuable tools in the maintenance manager's toolkit.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

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

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Criticality Assessment Factors</p>
                <ul className="space-y-0.5">
                  <li>Safety impact (injury/fatality potential)</li>
                  <li>Environmental impact (release/contamination)</li>
                  <li>Production impact (output/quality/delivery)</li>
                  <li>Repair time and cost</li>
                  <li>Redundancy and backup availability</li>
                  <li>Failure frequency and detectability</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">ABC Maintenance Strategy</p>
                <ul className="space-y-0.5">
                  <li>A (Critical): Full CBM, comprehensive PPM, priority spares</li>
                  <li>B (Important): Selective CBM, standard PPM, key spares</li>
                  <li>C (General): Basic inspection, run-to-failure, repair/replace</li>
                  <li>Safety score 5 = auto-Critical (A)</li>
                  <li>Review annually + on change</li>
                  <li>Document rationale in criticality register</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section7-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: Balancing PPM and Corrective
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section7-4">
              Next: Industry Best Practices in RCM
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule4Section7_3;
