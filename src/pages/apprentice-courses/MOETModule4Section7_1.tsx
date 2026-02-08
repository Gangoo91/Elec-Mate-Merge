import { ArrowLeft, Settings, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Principles of Reliability-Centred Maintenance (RCM) - MOET Module 4 Section 7.1";
const DESCRIPTION = "Understanding the core principles of reliability-centred maintenance (RCM), including its origin, the seven questions framework, failure modes and effects analysis (FMEA), and how RCM determines the most appropriate maintenance strategy for each asset in electrical engineering, aligned to ST1426.";

const quickCheckQuestions = [
  {
    id: "rcm-primary-goal",
    question: "The primary goal of reliability-centred maintenance (RCM) is to:",
    options: [
      "Eliminate all maintenance tasks to reduce costs",
      "Determine the most appropriate maintenance strategy for each asset based on its function, failure modes and the consequences of failure",
      "Replace all equipment on a fixed time schedule regardless of condition",
      "Only repair equipment after it has failed"
    ],
    correctIndex: 1,
    explanation: "RCM is a structured process for determining the maintenance requirements of any physical asset in its operating context. Rather than applying a blanket maintenance strategy, RCM analyses each asset's functions, how those functions can fail, the consequences of each failure mode, and then selects the most cost-effective maintenance task that manages the risk. This ensures maintenance effort is focused where it delivers the greatest benefit."
  },
  {
    id: "rcm-seven-questions",
    question: "The RCM process is built around how many fundamental questions about each asset?",
    options: [
      "Three",
      "Five",
      "Seven",
      "Ten"
    ],
    correctIndex: 2,
    explanation: "The RCM process centres on seven questions: (1) What are the functions of the asset? (2) In what ways can it fail to fulfil those functions? (3) What causes each functional failure? (4) What happens when each failure occurs? (5) In what way does each failure matter? (6) What can be done to predict or prevent each failure? (7) What should be done if no suitable proactive task can be found? These questions systematically build from understanding the asset to selecting the right maintenance strategy."
  },
  {
    id: "rcm-fmea",
    question: "In RCM, a Failure Modes and Effects Analysis (FMEA) is used to:",
    options: [
      "Calculate the purchase cost of the equipment",
      "Identify and document all the ways an asset can fail, the causes of each failure mode, and the effects and consequences of each failure on operations, safety and the environment",
      "Determine the colour coding of maintenance tags",
      "Schedule the annual shutdown dates"
    ],
    correctIndex: 1,
    explanation: "FMEA is a core analytical tool within the RCM process. It systematically identifies every failure mode (the specific way a component or system can fail), determines the cause of each failure mode (wear, overload, contamination, etc.), describes the effect of the failure (what happens and what the operator notices), and assesses the consequences (safety, environmental, operational and economic). This information drives the selection of the appropriate maintenance strategy."
  },
  {
    id: "rcm-hidden-failure",
    question: "A 'hidden failure' in RCM terminology is a failure that:",
    options: [
      "Has been deliberately concealed by the maintenance team",
      "Is not evident to the operating crew under normal circumstances — it will only become apparent when a demand is placed on the system, such as a protective device that has failed but will only be noticed when it is called upon to operate",
      "Occurs inside an enclosed panel and is therefore not visible",
      "Is too small to cause any concern"
    ],
    correctIndex: 1,
    explanation: "Hidden failures are a critical concept in RCM. A hidden failure is one that will not become evident under normal operating conditions — it only reveals itself when the system is called upon to perform a specific function. Classic examples include protective relay failures (only evident when the relay needs to trip), standby pump failures (only evident when the duty pump fails), and emergency lighting failures (only evident during a power cut). RCM identifies hidden failures and assigns failure-finding tasks to detect them before they matter."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Reliability-centred maintenance was originally developed in the:",
    options: [
      "UK construction industry in the 2000s",
      "US commercial aviation industry in the late 1960s and 1970s, led by engineers at United Airlines",
      "Japanese motor vehicle industry in the 1950s",
      "European power generation industry in the 1990s"
    ],
    correctAnswer: 1,
    explanation: "RCM was developed by Stanley Nowlan and Howard Heap at United Airlines in the late 1960s and 1970s. Their work, published as the landmark report 'Reliability-Centered Maintenance' in 1978, was commissioned by the US Department of Defense. It revolutionised maintenance thinking by demonstrating that time-based overhaul was not the most effective strategy for most equipment, and that maintenance strategy should be driven by the consequences of failure, not simply the probability of failure."
  },
  {
    id: 2,
    question: "The first question in the RCM process — 'What are the functions of the asset?' — is important because:",
    options: [
      "It determines the purchase price of the asset",
      "Maintenance exists to preserve the functions that the user requires of the asset, so the functions must be clearly defined before failure analysis can begin",
      "It identifies the manufacturer's warranty terms",
      "It determines who is responsible for the asset"
    ],
    correctAnswer: 1,
    explanation: "RCM is function-focused. The purpose of maintenance is not to prevent all failures — it is to preserve the functions that the asset is required to perform. Defining functions precisely (including performance standards) is essential because a 'failure' in RCM terms means a loss of function — the asset can no longer do what the user requires. For example, a motor's primary function might be 'to drive conveyor C1 at 1.5 m/s continuously during production hours'. Any condition that prevents this constitutes a functional failure."
  },
  {
    id: 3,
    question: "A 'functional failure' in RCM terminology means:",
    options: [
      "The asset has been destroyed beyond repair",
      "The asset is unable to fulfil one or more of its required functions to the performance standard expected by the user in its operating context",
      "The asset has reached its design life",
      "The asset has been taken out of service for planned maintenance"
    ],
    correctAnswer: 1,
    explanation: "A functional failure occurs when the asset cannot meet the performance standard required by the user. This is broader than a complete breakdown — it includes partial failures and performance degradation. For example, if a ventilation fan is required to deliver 2,000 litres per second but can only deliver 1,500, it has suffered a functional failure even though it is still running. RCM analyses each function separately, so an asset can experience a functional failure in one function whilst still performing others."
  },
  {
    id: 4,
    question: "A failure mode in RCM is defined as:",
    options: [
      "The name of the failed component",
      "A specific event or process that causes a functional failure, described in enough detail to enable an appropriate maintenance strategy to be selected",
      "The date the failure occurred",
      "The cost of repairing the failure"
    ],
    correctAnswer: 1,
    explanation: "A failure mode is a specific cause of a functional failure. It should be described precisely enough to identify what maintenance task would manage it. 'Motor bearing fails' is too vague — 'motor bearing fails due to lubricant degradation from excessive operating temperature' is more useful because it points towards specific maintenance actions (temperature monitoring, lubricant analysis, cooling system checks). RCM typically identifies between 3 and 20 failure modes per function."
  },
  {
    id: 5,
    question: "In the RCM failure consequence framework, the correct order of consequence categories from most to least critical is:",
    options: [
      "Economic, operational, safety, hidden",
      "Hidden (safety), safety, operational, non-operational (economic)",
      "Operational, economic, safety, hidden",
      "Safety, hidden, economic, operational"
    ],
    correctAnswer: 1,
    explanation: "RCM categorises failure consequences into four groups: (1) Hidden failure consequences — where the failure is not evident and a combination of failures could have safety or environmental consequences; (2) Safety and environmental consequences — where the failure directly affects safety or causes environmental damage; (3) Operational consequences — where the failure affects production output, quality, service or operating costs; (4) Non-operational (economic) consequences — where the only consequence is the cost of repair. This hierarchy ensures safety is always prioritised."
  },
  {
    id: 6,
    question: "RCM demonstrated that the traditional assumption 'the older an item, the more likely it is to fail' applies to:",
    options: [
      "All types of equipment",
      "Only a small proportion (approximately 11%) of failure modes — most failure modes in complex equipment show no age-related increase in failure probability",
      "All mechanical equipment but not electrical equipment",
      "No equipment at all"
    ],
    correctAnswer: 1,
    explanation: "One of the most significant findings of the original RCM research was that only about 11% of failure modes showed an age-related increase in failure probability (the classic 'bathtub curve' or 'wear-out' pattern). The remaining 89% of failure modes showed either random failure patterns or even a higher probability of failure when new (infant mortality). This finding fundamentally challenged the practice of time-based overhaul — if age does not predict failure for most failure modes, then fixed-interval replacement is not the most effective strategy."
  },
  {
    id: 7,
    question: "A condition-based maintenance task in RCM is appropriate when:",
    options: [
      "The failure occurs randomly with no warning",
      "The failure mode has a detectable deterioration period (P-F interval) long enough to allow a planned response before functional failure occurs",
      "The equipment is not important",
      "The failure has no consequences"
    ],
    correctAnswer: 1,
    explanation: "Condition-based maintenance (on-condition tasks) is the preferred proactive maintenance strategy in RCM. It requires that the failure mode has a detectable progression from the point of potential failure (P) to functional failure (F) — the P-F interval. The condition monitoring interval must be shorter than the P-F interval to ensure the deterioration is detected in time to take planned action. Examples include vibration monitoring for bearings (P-F interval typically months), thermography for loose connections (P-F interval weeks to months), and insulation resistance testing for motor windings (P-F interval months to years)."
  },
  {
    id: 8,
    question: "A scheduled restoration or discard task in RCM is appropriate when:",
    options: [
      "The asset is new",
      "The failure mode exhibits a clear age-related failure pattern and the task restores the item to a condition where it can perform its function reliably for a further defined period",
      "The asset has a manufacturer's warranty",
      "The failure has no detectable warning signs and no consequences"
    ],
    correctAnswer: 1,
    explanation: "Scheduled restoration (overhaul at a fixed interval) or scheduled discard (replacement at a fixed interval) is appropriate when the failure mode has a clear age-related failure pattern — that is, the probability of failure increases significantly after a specific age or usage. The restoration or replacement interval must be set at a point before the probability of failure becomes unacceptable. Examples include replacing contactor tips every 100,000 operations, replacing motor bearings every 5 years, or overhauling gearboxes at specified intervals."
  },
  {
    id: 9,
    question: "When RCM determines that no proactive maintenance task is technically feasible or worth doing, the default strategy is:",
    options: [
      "Immediately replace the asset with a new one",
      "Run-to-failure (corrective maintenance only), provided the failure consequences are acceptable — or redesign if the consequences are not acceptable",
      "Increase the maintenance budget",
      "Outsource the maintenance to a third party"
    ],
    correctAnswer: 1,
    explanation: "If no condition-based or scheduled task is technically feasible and worth doing, RCM allows run-to-failure as a deliberate, justified strategy — provided the failure consequences are acceptable (typically non-operational economic consequences only). If the consequences are not acceptable (safety, environmental or significant operational impact), and no proactive task works, then the asset must be redesigned to change the failure characteristics. Run-to-failure in RCM is a conscious, documented decision, not a failure of the maintenance programme."
  },
  {
    id: 10,
    question: "A failure-finding task in RCM is specifically designed to:",
    options: [
      "Find the location of a fault after a breakdown",
      "Detect hidden failures in protective devices and standby systems by periodically testing them to confirm they can still perform their function when required",
      "Find spare parts in the stores",
      "Locate assets on a site plan"
    ],
    correctAnswer: 1,
    explanation: "Failure-finding tasks are unique to RCM and address hidden failures — failures that are not evident under normal operating conditions. These are typically protective devices (RCDs, overload relays, emergency stop circuits, fire detection systems) and standby equipment (standby generators, backup pumps). The failure-finding task periodically tests the device to confirm it can still perform its protective or standby function. The frequency of the test is calculated based on the required availability of the protective function."
  },
  {
    id: 11,
    question: "The international standard that defines the requirements for an RCM process is:",
    options: [
      "BS 7671",
      "SAE JA1011 — Evaluation Criteria for Reliability-Centered Maintenance (RCM) Processes",
      "ISO 9001",
      "BS EN 62305"
    ],
    correctAnswer: 1,
    explanation: "SAE JA1011, published by the Society of Automotive Engineers (now SAE International), defines the minimum criteria that any process must meet to be called RCM. It requires that the process addresses all seven RCM questions, uses a structured decision logic, and results in documented maintenance strategies. The companion standard SAE JA1012 provides a guide to the RCM standard. Any process that claims to be RCM but does not comply with JA1011 is, strictly speaking, not genuine RCM."
  },
  {
    id: 12,
    question: "In the context of ST1426, understanding RCM principles enables the maintenance technician to:",
    options: [
      "Only replace failed components",
      "Understand why different maintenance strategies are applied to different assets, contribute to FMEA and RCM reviews, and make better decisions about maintenance priorities based on failure consequences rather than simply equipment age",
      "Only perform time-based maintenance",
      "Only carry out run-to-failure maintenance"
    ],
    correctAnswer: 1,
    explanation: "ST1426 requires maintenance technicians to understand maintenance strategies and contribute to continuous improvement. RCM knowledge enables the technician to understand the rationale behind different maintenance approaches (why some equipment is condition-monitored, some is replaced on a schedule, and some is run to failure), participate meaningfully in FMEA and RCM reviews, make informed decisions about maintenance priorities, and contribute to the development of maintenance plans that are both effective and cost-efficient."
  }
];

const faqs = [
  {
    question: "Is RCM only used in aviation and military applications?",
    answer: "No. Although RCM was originally developed for commercial aviation, it has been adopted across virtually all asset-intensive industries: power generation and distribution, oil and gas, manufacturing, water and wastewater, rail transport, building services, and defence. The principles are universal because they apply to any physical asset that has functions, can fail, and where the consequences of failure matter. Many electrical maintenance organisations use RCM principles to develop their planned preventive maintenance programmes."
  },
  {
    question: "Does RCM eliminate all breakdowns?",
    answer: "No, and it does not attempt to. RCM recognises that some failures are best managed by allowing them to occur and repairing them when they happen (run-to-failure), provided the consequences are acceptable. RCM aims to focus maintenance effort where it delivers the greatest benefit — preventing failures with significant safety, environmental or operational consequences while accepting that low-consequence failures can be managed reactively. The result is a maintenance programme that is both more effective and more efficient than one based on time-based overhaul alone."
  },
  {
    question: "What is the difference between RCM and planned preventive maintenance (PPM)?",
    answer: "PPM is a maintenance strategy — it involves performing tasks at fixed time or usage intervals. RCM is a process for deciding which maintenance strategy to apply to each failure mode. RCM may result in PPM tasks for some failure modes, condition-based tasks for others, failure-finding tasks for protective devices, and run-to-failure for the remainder. PPM is one possible outcome of the RCM process, not an alternative to it. The key difference is that RCM provides a rigorous justification for every maintenance task."
  },
  {
    question: "How long does an RCM analysis take?",
    answer: "A full classical RCM analysis of a complex system can take significant time — typically weeks to months for a team of 4-6 people working part-time. This is why RCM is usually applied to the most critical assets first. Streamlined versions of RCM exist that reduce the analysis time by focusing on the most significant failure modes, but these must still comply with the principles of SAE JA1011 to be considered genuine RCM. For an apprentice, the important thing is to understand the principles and be able to contribute to RCM reviews."
  },
  {
    question: "How does the P-F interval relate to maintenance task frequency?",
    answer: "The P-F interval is the time between the point at which a failure starts to become detectable (the potential failure point, P) and the point at which it becomes a functional failure (F). For a condition-based task to be effective, the monitoring interval must be shorter than the P-F interval — typically half the P-F interval or less. For example, if bearing vibration becomes detectable 3 months before catastrophic failure, the vibration monitoring interval should be no more than 6 weeks. This ensures the deterioration is always detected in time to plan a repair."
  }
];

const MOETModule4Section7_1 = () => {
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
            <Settings className="h-4 w-4" />
            <span>Module 4.7.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Principles of Reliability-Centred Maintenance (RCM)
          </h1>
          <p className="text-white/80">
            A structured process for determining the right maintenance strategy for every asset
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Function-focused:</strong> Maintenance exists to preserve asset functions, not just prevent breakdowns</li>
              <li className="pl-1"><strong>Seven questions:</strong> Structured framework covering functions, failures, consequences and tasks</li>
              <li className="pl-1"><strong>Consequence-driven:</strong> Maintenance strategy depends on what happens when a failure occurs</li>
              <li className="pl-1"><strong>Evidence-based:</strong> Every maintenance task must be technically feasible and worth doing</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Rationale:</strong> Explains why different assets have different maintenance approaches</li>
              <li className="pl-1"><strong>FMEA:</strong> Technicians contribute failure mode knowledge to RCM reviews</li>
              <li className="pl-1"><strong>P-F interval:</strong> Determines how often condition monitoring should be performed</li>
              <li className="pl-1"><strong>ST1426:</strong> Demonstrates understanding of maintenance strategy and continuous improvement</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the origin and purpose of reliability-centred maintenance (RCM)",
              "Apply the seven RCM questions to analyse an asset's maintenance requirements",
              "Describe the role of failure modes and effects analysis (FMEA) within the RCM process",
              "Classify failure consequences using the RCM consequence framework",
              "Explain the P-F curve and how it determines condition monitoring intervals",
              "Select appropriate maintenance strategies based on failure mode characteristics and consequences"
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
            Origins and Purpose of RCM
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Reliability-centred maintenance (RCM) is a structured, systematic process for determining the maintenance requirements of any physical asset in its operating context. It was developed in the late 1960s and 1970s by Stanley Nowlan and Howard Heap at United Airlines, commissioned by the US Department of Defense. Their landmark 1978 report fundamentally changed how the world thinks about maintenance.
            </p>
            <p>
              Before RCM, the prevailing assumption was that all equipment had a 'right' overhaul interval — that components wore out predictably, and that regular time-based overhaul was the best way to maintain reliability. Nowlan and Heap's research, based on the analysis of hundreds of thousands of components in commercial aircraft, showed that this assumption was wrong for the vast majority of failure modes. Only about 11% of failure modes showed an age-related increase in failure probability. The remaining 89% showed either random failure patterns or a higher probability of failure immediately after maintenance (infant mortality).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Six Failure Patterns</p>
              <p className="text-sm text-white mb-3">RCM research identified six distinct failure patterns:</p>
              <div className="space-y-2">
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-elec-yellow/80 font-mono font-medium min-w-[24px]">A</span>
                  <span>Bathtub curve — high infant mortality, then constant, then wear-out (4% of failure modes)</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-elec-yellow/80 font-mono font-medium min-w-[24px]">B</span>
                  <span>Constant failure rate then wear-out — no infant mortality phase (2% of failure modes)</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-elec-yellow/80 font-mono font-medium min-w-[24px]">C</span>
                  <span>Gradually increasing failure rate — no identifiable wear-out age (5% of failure modes)</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-elec-yellow/80 font-mono font-medium min-w-[24px]">D</span>
                  <span>Low when new, then rapid increase to constant — initial low reliability (7% of failure modes)</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-elec-yellow/80 font-mono font-medium min-w-[24px]">E</span>
                  <span>Random — constant probability of failure at any age (14% of failure modes)</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-elec-yellow/80 font-mono font-medium min-w-[24px]">F</span>
                  <span>Infant mortality then constant — highest failure rate when new, then random (68% of failure modes)</span>
                </div>
              </div>
              <p className="text-xs text-white/60 mt-3">Pattern F (infant mortality then random) accounted for 68% of all failure modes studied. This means that for the majority of failures, overhauling equipment at a fixed interval actually increases the failure rate by reintroducing infant mortality.</p>
            </div>

            <p>
              This finding had profound implications. If time-based overhaul does not reduce the failure rate for most failure modes, then a different approach is needed. RCM provides that approach: instead of asking "how often should we overhaul this equipment?", it asks "what must we do to manage the consequences of each failure mode?" This shifts the focus from calendar-driven maintenance to consequence-driven maintenance.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> RCM does not eliminate maintenance — it rationalises it. The result is a maintenance programme where every task has a clear justification based on the failure mode it manages and the consequence it prevents. Tasks that do not meet this criterion are eliminated, freeing resources for tasks that do.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Seven RCM Questions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The RCM process is built around seven fundamental questions that are asked about each asset in its operating context. These questions follow a logical sequence: first understanding what the asset does, then how it can fail, and finally what should be done about each failure. Working through all seven questions ensures a complete and rigorous analysis.
            </p>

            <div className="my-6 space-y-3">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Question 1: What are the functions and associated performance standards of the asset in its present operating context?</h3>
                <p className="text-sm text-white">
                  Define every function the asset performs, including primary functions (the reason it was acquired) and secondary functions (safety, containment, appearance, environmental compliance). Each function must include a performance standard. Example: "Supply 415V three-phase power to distribution board DB3 continuously during production hours, within +10%/-6% voltage tolerance."
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Question 2: In what ways can it fail to fulfil its functions? (Functional Failures)</h3>
                <p className="text-sm text-white">
                  For each function, identify all the ways the asset can fail to meet the performance standard. A functional failure can be total (complete loss of function) or partial (function degraded below the required standard). Example: "Total loss of supply to DB3" and "Voltage to DB3 outside tolerance limits" are both functional failures of the function above.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Question 3: What causes each functional failure? (Failure Modes)</h3>
                <p className="text-sm text-white">
                  For each functional failure, identify all the failure modes — the specific events or processes that cause it. Failure modes should be described precisely enough to enable appropriate maintenance task selection. Example: "Transformer winding insulation breakdown due to moisture ingress" is a failure mode that points to specific monitoring tasks (insulation resistance testing, dissolved gas analysis).
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Question 4: What happens when each failure occurs? (Failure Effects)</h3>
                <p className="text-sm text-white">
                  Describe what happens when each failure mode occurs: what evidence does the operator see, hear or smell? What does the failure do to production, safety or the environment? How long does it take to repair? What secondary damage occurs? This information is essential for assessing consequences in the next question.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Question 5: In what way does each failure matter? (Failure Consequences)</h3>
                <p className="text-sm text-white">
                  Classify the consequences of each failure mode: hidden failure (not evident under normal conditions), safety or environmental, operational (affects production), or non-operational (economic cost only). The consequence category determines which maintenance strategies are acceptable and how much effort is justified.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Question 6: What can be done to predict or prevent each failure? (Proactive Tasks)</h3>
                <p className="text-sm text-white">
                  For each failure mode, identify whether a proactive maintenance task is technically feasible and worth doing. Options include: condition-based tasks (monitoring for deterioration), scheduled restoration (overhaul at fixed intervals), scheduled discard (replacement at fixed intervals), and failure-finding tasks (periodic testing of hidden functions).
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Question 7: What should be done if no suitable proactive task can be found? (Default Actions)</h3>
                <p className="text-sm text-white">
                  If no proactive task is technically feasible and worth doing: for hidden failures and safety consequences, redesign is mandatory; for operational consequences, run-to-failure may be acceptable if the economic impact is tolerable; for non-operational consequences, run-to-failure is the default. Every failure mode must have a documented strategy.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The seven questions must be answered in sequence. Skipping to maintenance task selection without first understanding functions, functional failures, failure modes, failure effects and consequences leads to maintenance programmes that are either wasteful (doing too much) or ineffective (doing the wrong things).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            FMEA and the P-F Curve
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Failure modes and effects analysis (FMEA) is the analytical engine of the RCM process. It provides the structured framework for answering questions 2 through 5 — identifying functional failures, failure modes, failure effects and failure consequences. The FMEA document becomes the permanent record of the analysis and the foundation for the maintenance programme.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">FMEA Information Sheet — Typical Structure</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Column</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Function</td>
                      <td className="border border-white/10 px-3 py-2">What the asset is required to do, with performance standard</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Functional Failure</td>
                      <td className="border border-white/10 px-3 py-2">How the function can be lost (total or partial)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Failure Mode</td>
                      <td className="border border-white/10 px-3 py-2">The specific cause of the functional failure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Failure Effect</td>
                      <td className="border border-white/10 px-3 py-2">What happens when the failure mode occurs (evidence, impact, repair time)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Consequence</td>
                      <td className="border border-white/10 px-3 py-2">Hidden, safety/environmental, operational, or non-operational</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              The P-F curve is a fundamental concept in RCM that determines whether condition-based maintenance is feasible for a given failure mode. "P" represents the point of potential failure — the earliest point at which deterioration can be detected using a monitoring technique. "F" represents the point of functional failure — where the asset can no longer perform its required function. The time between P and F is the P-F interval.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The P-F Curve</p>
              <div className="bg-white/5 rounded p-3 text-sm text-white space-y-1 font-mono">
                <p>Condition</p>
                <p>&nbsp;&nbsp;&nbsp;|</p>
                <p>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;Normal operating condition</p>
                <p>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;================================</p>
                <p>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\</p>
                <p>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\ P (Potential failure)</p>
                <p>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\</p>
                <p>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\ &lt;-- P-F interval --&gt;</p>
                <p>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\</p>
                <p>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F (Functional failure)</p>
                <p>&nbsp;&nbsp;&nbsp;+------------------------------------------&gt; Time</p>
              </div>
              <p className="text-xs text-white/60 mt-2">The monitoring interval must be shorter than the P-F interval (typically half or less) to ensure deterioration is always detected before functional failure.</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">P-F Intervals for Common Electrical Failure Modes</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Motor bearing vibration:</strong> P-F interval typically 1-9 months — monitor vibration monthly</li>
                <li className="pl-1"><strong>Loose electrical connections (thermography):</strong> P-F interval weeks to months — thermal survey quarterly</li>
                <li className="pl-1"><strong>Motor winding insulation (IR testing):</strong> P-F interval months to years — test annually or six-monthly</li>
                <li className="pl-1"><strong>Transformer oil degradation (DGA):</strong> P-F interval months to years — sample annually for critical units</li>
                <li className="pl-1"><strong>Cable insulation (partial discharge):</strong> P-F interval months to years — test during shutdowns</li>
                <li className="pl-1"><strong>Contactor tip wear:</strong> P-F interval short — often managed by scheduled discard based on operations count</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Condition-based maintenance is only feasible when the P-F interval is long enough to allow detection and planned response. If the failure mode goes from detectable deterioration to functional failure in minutes or hours, condition monitoring is not practical — a different strategy (scheduled replacement, redesign, or run-to-failure) is needed.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Failure Consequences and Maintenance Strategy Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The consequence of failure is the single most important factor in determining the appropriate maintenance strategy. RCM uses a structured decision logic that categorises consequences and then selects maintenance tasks accordingly. This is fundamentally different from traditional approaches that base maintenance frequency on the probability of failure alone — RCM considers both the probability and the consequence.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">RCM Consequence Categories and Strategy Selection</p>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <h3 className="text-sm font-medium text-red-400 mb-1">Hidden Failure Consequences</h3>
                  <p className="text-sm text-white">Failure is not evident under normal conditions (protective devices, standby systems). Strategy: failure-finding task at an interval that provides the required availability. If no task is feasible, redesign is mandatory.</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
                  <h3 className="text-sm font-medium text-orange-400 mb-1">Safety and Environmental Consequences</h3>
                  <p className="text-sm text-white">Failure could injure or kill someone, or cause environmental damage. Strategy: a proactive task that reduces the probability of failure to a tolerable level. If no task is feasible, redesign is mandatory. Run-to-failure is never acceptable.</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <h3 className="text-sm font-medium text-blue-400 mb-1">Operational Consequences</h3>
                  <p className="text-sm text-white">Failure affects production, quality or service level. Strategy: a proactive task is worth doing if the total cost of the task over time is less than the total cost of the operational consequences over the same period. Otherwise, run-to-failure with planned response.</p>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <h3 className="text-sm font-medium text-green-400 mb-1">Non-Operational (Economic) Consequences</h3>
                  <p className="text-sm text-white">The only consequence is the direct cost of repair. Strategy: a proactive task is worth doing only if the cost of the task over time is less than the cost of repair over the same period. Run-to-failure is the default.</p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Example: Motor on a Packaging Line</p>
              <p className="text-sm text-white mb-2">Consider a 15 kW motor driving a packaging conveyor. Different failure modes have different consequences:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Bearing failure:</strong> Operational consequence (stops production). P-F interval 3-6 months. Strategy: condition-based (vibration monitoring monthly)</li>
                <li className="pl-1"><strong>Winding earth fault:</strong> Safety consequence (electric shock risk). P-F interval 6-12 months. Strategy: condition-based (insulation resistance testing six-monthly)</li>
                <li className="pl-1"><strong>Overload relay failure:</strong> Hidden failure (not evident until motor overloads). Strategy: failure-finding task (test relay operation every 6 months)</li>
                <li className="pl-1"><strong>Terminal box gasket degradation:</strong> Non-operational (moisture ingress risk, but contained by other protection). Strategy: scheduled discard at 5-year interval</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Proactive Task Types</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Condition-based:</strong> Monitor for deterioration (vibration, thermography, oil analysis, IR testing)</li>
                  <li className="pl-1"><strong>Scheduled restoration:</strong> Overhaul at fixed intervals (where age-related wear-out is evident)</li>
                  <li className="pl-1"><strong>Scheduled discard:</strong> Replace at fixed intervals (where restoration is not feasible)</li>
                  <li className="pl-1"><strong>Failure-finding:</strong> Periodic testing of hidden functions (trip tests, function tests)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Default Actions (No Suitable Proactive Task)</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Hidden failures:</strong> Redesign mandatory (must make failure evident or add redundancy)</li>
                  <li className="pl-1"><strong>Safety consequences:</strong> Redesign mandatory (must reduce risk to acceptable level)</li>
                  <li className="pl-1"><strong>Operational consequences:</strong> Run-to-failure may be acceptable if cost is tolerable</li>
                  <li className="pl-1"><strong>Non-operational:</strong> Run-to-failure is the default strategy</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> RCM does not mandate the most technically advanced maintenance approach — it mandates the most appropriate one. For some failure modes, the most appropriate strategy is run-to-failure. This is not neglect; it is a conscious, justified decision that the consequences of failure are acceptable and that proactive maintenance would cost more than it saves. Every maintenance task in an RCM programme earns its place.
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
                <p className="font-medium text-white mb-1">The Seven RCM Questions</p>
                <ul className="space-y-0.5">
                  <li>1. What are its functions?</li>
                  <li>2. How can it fail? (Functional failures)</li>
                  <li>3. What causes each failure? (Failure modes)</li>
                  <li>4. What happens? (Failure effects)</li>
                  <li>5. Does it matter? (Consequences)</li>
                  <li>6. Can we predict/prevent it? (Proactive tasks)</li>
                  <li>7. What if no task works? (Default actions)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">RCM Maintenance Strategies</p>
                <ul className="space-y-0.5">
                  <li>Condition-based — monitor for deterioration</li>
                  <li>Scheduled restoration — overhaul at fixed intervals</li>
                  <li>Scheduled discard — replace at fixed intervals</li>
                  <li>Failure-finding — test hidden functions periodically</li>
                  <li>Run-to-failure — repair when it breaks (justified)</li>
                  <li>Redesign — change the asset to eliminate the risk</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section7-2">
              Next: Balancing PPM and Corrective Maintenance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule4Section7_1;
