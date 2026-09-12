/**
 * MOET · Module 4 · Section 7.1 · Subsection 1 — Principles of Reliability-Centred Maintenance
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not
 * invent codes here.
 *   Knowledge  · "Maintenance strategies: planned preventative maintenance
 *                 (PPM), condition-based maintenance (CBM), scheduled
 *                 maintenance, total productive maintenance (TPM),
 *                 breakdown and run to failure maintenance."
 *              · "Equipment life cycle considerations."
 *
 * Numeric detail (failure-pattern percentages, P-F interval examples) is
 * copied verbatim from the original page; the bs7671_facets RAG holds
 * regulation rules, not this kind of reliability-engineering data, so it
 * could not be checked against it. The P-F curve ASCII diagram is the
 * original page's own rendering, kept as-is.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Principles of Reliability-Centred Maintenance (RCM) - MOET Module 4 Section 7.1';
const DESCRIPTION =
  'Understanding the core principles of reliability-centred maintenance (RCM), including its origin, the seven questions framework, failure modes and effects analysis (FMEA), and how RCM determines the most appropriate maintenance strategy for each asset in electrical engineering, aligned to ST1426.';

const quickCheckQuestions = [
  {
    id: 'rcm-primary-goal',
    question: 'The primary goal of reliability-centred maintenance (RCM) is to:',
    options: [
      'Overhaul every asset at fixed time intervals to keep all equipment in as-new condition',
      'Minimise maintenance spending by carrying out the fewest possible tasks on every asset',
      'Select the right maintenance strategy for each asset from its function and failure consequences',
      'Eliminate all equipment breakdowns by replacing components before they reach end of life',
    ],
    correctIndex: 2,
    explanation:
      "RCM is a structured process for determining the maintenance requirements of any physical asset in its operating context. Rather than applying a blanket maintenance strategy, RCM analyses each asset's functions, how those functions can fail, the consequences of each failure mode, and then selects the most cost-effective maintenance task that manages the risk. This ensures maintenance effort is focused where it delivers the greatest benefit.",
  },
  {
    id: 'rcm-seven-questions',
    question: 'The RCM process is built around how many fundamental questions about each asset?',
    options: ['Ten', 'Seven', 'Three', 'Five'],
    correctIndex: 1,
    explanation:
      'The RCM process centres on seven questions: (1) What are the functions of the asset? (2) In what ways can it fail to fulfil those functions? (3) What causes each functional failure? (4) What happens when each failure occurs? (5) In what way does each failure matter? (6) What can be done to predict or prevent each failure? (7) What should be done if no suitable proactive task can be found? These questions systematically build from understanding the asset to selecting the right maintenance strategy.',
  },
  {
    id: 'rcm-fmea',
    question: 'In RCM, a Failure Modes and Effects Analysis (FMEA) is used to:',
    options: [
      'Schedule every asset for overhaul on a fixed calendar interval regardless of its condition',
      'Calculate the purchase cost and depreciation of each asset over its full working life',
      'Rank technicians by the number of breakdowns they have repaired during the year',
      'Document how an asset can fail, the cause of each mode, and its effects and consequences',
    ],
    correctIndex: 3,
    explanation:
      'FMEA is a core analytical tool within the RCM process. It systematically identifies every failure mode (the specific way a component or system can fail), determines the cause of each failure mode (wear, overload, contamination, etc.), describes the effect of the failure (what happens and what the operator notices), and assesses the consequences (safety, environmental, operational and economic). This information drives the selection of the appropriate maintenance strategy.',
  },
  {
    id: 'rcm-hidden-failure',
    question: "A 'hidden failure' in RCM terminology is a failure that:",
    options: [
      'Occurs inside a sealed enclosure and can only be seen by fully dismantling the equipment',
      'Is deliberately concealed by an operator to avoid having to report a breakdown',
      'Develops so slowly that it is never detectable by any condition monitoring technique',
      'Is not evident in normal operation and only shows when a demand is placed on the system',
    ],
    correctIndex: 3,
    explanation:
      'Hidden failures are a critical concept in RCM. A hidden failure is one that will not become evident under normal operating conditions — it only reveals itself when the system is called upon to perform a specific function. Classic examples include protective relay failures (only evident when the relay needs to trip), standby pump failures (only evident when the duty pump fails), and emergency lighting failures (only evident during a power cut). RCM identifies hidden failures and assigns failure-finding tasks to detect them before they matter.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Reliability-centred maintenance was originally developed in the:',
    options: [
      'UK rail industry in the 1950s to manage steam locomotive overhauls',
      'US commercial aviation industry in the late 1960s and 1970s, led by engineers at United Airlines',
      'Japanese automotive industry in the 1980s as part of total productive maintenance',
      'European power generation sector in the 1990s following several major blackouts',
    ],
    correctAnswer: 1,
    explanation:
      "RCM was developed by Stanley Nowlan and Howard Heap at United Airlines in the late 1960s and 1970s. Their work, published as the landmark report 'Reliability-Centered Maintenance' in 1978, was commissioned by the US Department of Defense. It revolutionised maintenance thinking by demonstrating that time-based overhaul was not the most effective strategy for most equipment, and that maintenance strategy should be driven by the consequences of failure, not simply the probability of failure.",
  },
  {
    id: 2,
    question:
      "The first question in the RCM process — 'What are the functions of the asset?' — is important because:",
    options: [
      'The asset is unable to fulfil one or more of its required functions to the performance standard expected by the user in its operating context',
      'A specific event or process that causes a functional failure, described in enough detail to enable an appropriate maintenance strategy to be selected',
      'Maintenance exists to preserve the functions that the user requires of the asset, so the functions must be clearly defined before failure analysis can begin',
      'The failure mode has a detectable deterioration period (P-F interval) long enough to allow a planned response before functional failure occurs',
    ],
    correctAnswer: 2,
    explanation:
      "RCM is function-focused. The purpose of maintenance is not to prevent all failures — it is to preserve the functions that the asset is required to perform. Defining functions precisely (including performance standards) is essential because a 'failure' in RCM terms means a loss of function — the asset can no longer do what the user requires. For example, a motor's primary function might be 'to drive conveyor C1 at 1.5 m/s continuously during production hours'. Any condition that prevents this constitutes a functional failure.",
  },
  {
    id: 3,
    question: "A 'functional failure' in RCM terminology means:",
    options: [
      'Only a complete breakdown where the asset stops working entirely and cannot run at all',
      'Any cosmetic or appearance defect that does not affect how the asset actually performs',
      'The point at which the asset reaches the end of its designed working life on the register',
      'The asset can no longer meet the performance standard the user requires in its context',
    ],
    correctAnswer: 3,
    explanation:
      'A functional failure occurs when the asset cannot meet the performance standard required by the user. This is broader than a complete breakdown — it includes partial failures and performance degradation. For example, if a ventilation fan is required to deliver 2,000 litres per second but can only deliver 1,500, it has suffered a functional failure even though it is still running. RCM analyses each function separately, so an asset can experience a functional failure in one function whilst still performing others.',
  },
  {
    id: 4,
    question: 'A failure mode in RCM is defined as:',
    options: [
      'A specific event or process that causes a functional failure',
      'The loss of a function the user requires of the asset in its operating context',
      'The consequence the failure has on safety, the environment or production output',
      'The maintenance task chosen to manage a particular cause of failure',
    ],
    correctAnswer: 0,
    explanation:
      "A failure mode is a specific cause of a functional failure. It should be described precisely enough to identify what maintenance task would manage it. 'Motor bearing fails' is too vague — 'motor bearing fails due to lubricant degradation from excessive operating temperature' is more useful because it points towards specific maintenance actions (temperature monitoring, lubricant analysis, cooling system checks). RCM typically identifies between 3 and 20 failure modes per function.",
  },
  {
    id: 5,
    question:
      'In the RCM failure consequence framework, the correct order of consequence categories from most to least critical is:',
    options: [
      'Economic, operational, safety, hidden',
      'Hidden (safety), safety, operational, non-operational (economic)',
      'Safety, hidden, economic, operational',
      'Operational, economic, safety, hidden',
    ],
    correctAnswer: 1,
    explanation:
      'RCM categorises failure consequences into four groups: (1) Hidden failure consequences — where the failure is not evident and a combination of failures could have safety or environmental consequences; (2) Safety and environmental consequences — where the failure directly affects safety or causes environmental damage; (3) Operational consequences — where the failure affects production output, quality, service or operating costs; (4) Non-operational (economic) consequences — where the only consequence is the cost of repair. This hierarchy ensures safety is always prioritised.',
  },
  {
    id: 6,
    question:
      "RCM demonstrated that the traditional assumption 'the older an item, the more likely it is to fail' applies to:",
    options: [
      'Every failure mode in complex equipment, confirming the value of fixed-interval overhaul',
      'About two thirds of failure modes, which follow a clear wear-out pattern with age',
      'Only about 11% of failure modes — most show no age-related rise in failure probability',
      'No failure modes at all, since equipment failure is always completely and purely random',
    ],
    correctAnswer: 2,
    explanation:
      "One of the most significant findings of the original RCM research was that only about 11% of failure modes showed an age-related increase in failure probability (the classic 'bathtub curve' or 'wear-out' pattern). The remaining 89% of failure modes showed either random failure patterns or even a higher probability of failure when new (infant mortality). This finding fundamentally challenged the practice of time-based overhaul — if age does not predict failure for most failure modes, then fixed-interval replacement is not the most effective strategy.",
  },
  {
    id: 7,
    question: 'A condition-based maintenance task in RCM is appropriate when:',
    options: [
      'The failure happens instantly with no detectable warning before functional failure',
      'The consequences of failure are purely economic and very low cost to put right',
      'The asset has a clear age-related wear-out pattern best managed by scheduled replacement',
      'The failure has a detectable P-F interval long enough to allow a planned response',
    ],
    correctAnswer: 3,
    explanation:
      'Condition-based maintenance (on-condition tasks) is the preferred proactive maintenance strategy in RCM. It requires that the failure mode has a detectable progression from the point of potential failure (P) to functional failure (F) — the P-F interval. The condition monitoring interval must be shorter than the P-F interval to ensure the deterioration is detected in time to take planned action. Examples include vibration monitoring for bearings (P-F interval typically months), thermography for loose connections (P-F interval weeks to months), and insulation resistance testing for motor windings (P-F interval months to years).',
  },
  {
    id: 8,
    question: 'A scheduled restoration or discard task in RCM is appropriate when:',
    options: [
      'The failure mode has a clear age-related wear-out pattern with a definable safe-life interval',
      'The failure mode is random with no relationship between age and probability of failure',
      'The failure is hidden and only revealed when the protective device is called upon to act',
      'There is a long, detectable P-F interval that makes condition monitoring straightforward',
    ],
    correctAnswer: 0,
    explanation:
      'Scheduled restoration (overhaul at a fixed interval) or scheduled discard (replacement at a fixed interval) is appropriate when the failure mode has a clear age-related failure pattern — that is, the probability of failure increases significantly after a specific age or usage. The restoration or replacement interval must be set at a point before the probability of failure becomes unacceptable. Examples include replacing contactor tips every 100,000 operations, replacing motor bearings every 5 years, or overhauling gearboxes at specified intervals.',
  },
  {
    id: 9,
    question:
      'When RCM determines that no proactive maintenance task is technically feasible or worth doing, the default strategy is:',
    options: [
      'Always overhaul the asset at a fixed interval as a general fall-back precaution',
      'Run-to-failure if consequences are acceptable, otherwise redesign the asset',
      'Increase the frequency of condition monitoring until some feasible task is found',
      'Remove the asset from service permanently to avoid any further risk of failure',
    ],
    correctAnswer: 1,
    explanation:
      'If no condition-based or scheduled task is technically feasible and worth doing, RCM allows run-to-failure as a deliberate, justified strategy — provided the failure consequences are acceptable (typically non-operational economic consequences only). If the consequences are not acceptable (safety, environmental or significant operational impact), and no proactive task works, then the asset must be redesigned to change the failure characteristics. Run-to-failure in RCM is a conscious, documented decision, not a failure of the maintenance programme.',
  },
  {
    id: 10,
    question: 'A failure-finding task in RCM is specifically designed to:',
    options: [
      'Restore a worn component to as-new condition at a fixed calendar interval',
      'Monitor a gradually deteriorating component using vibration or thermography',
      'Periodically test protective devices and standby systems to find hidden failures',
      'Decide whether a particular failure mode should simply be run to failure',
    ],
    correctAnswer: 2,
    explanation:
      'Failure-finding tasks are unique to RCM and address hidden failures — failures that are not evident under normal operating conditions. These are typically protective devices (RCDs, overload relays, emergency stop circuits, fire detection systems) and standby equipment (standby generators, backup pumps). The failure-finding task periodically tests the device to confirm it can still perform its protective or standby function. The frequency of the test is calculated based on the required availability of the protective function.',
  },
  {
    id: 11,
    question: 'The international standard that defines the requirements for an RCM process is:',
    options: [
      'BS 7671 — Requirements for Electrical Installations',
      'ISO 9001 — Quality Management Systems',
      'BS EN 60204 — Safety of Machinery: Electrical Equipment',
      'SAE JA1011 — Evaluation Criteria for RCM Processes',
    ],
    correctAnswer: 3,
    explanation:
      'SAE JA1011, published by the Society of Automotive Engineers (now SAE International), defines the minimum criteria that any process must meet to be called RCM. It requires that the process addresses all seven RCM questions, uses a structured decision logic, and results in documented maintenance strategies. The companion standard SAE JA1012 provides a guide to the RCM standard. Any process that claims to be RCM but does not comply with JA1011 is, strictly speaking, not genuine RCM.',
  },
  {
    id: 12,
    question:
      'In the context of ST1426, understanding RCM principles enables the maintenance technician to:',
    options: [
      'Understand why strategies differ, contribute to RCM reviews, and prioritise by consequence',
      'Avoid all planned maintenance and rely entirely on repairing equipment after it breaks down',
      'Apply a single fixed-interval overhaul to every asset to keep the maintenance plan simple',
      'Leave all maintenance strategy decisions to managers without contributing technical knowledge',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 requires maintenance technicians to understand maintenance strategies and contribute to continuous improvement. RCM knowledge enables the technician to understand the rationale behind different maintenance approaches (why some equipment is condition-monitored, some is replaced on a schedule, and some is run to failure), participate meaningfully in FMEA and RCM reviews, make informed decisions about maintenance priorities, and contribute to the development of maintenance plans that are both effective and cost-efficient.',
  },
];

const faqs = [
  {
    question: 'Is RCM only used in aviation and military applications?',
    answer:
      'No. Although RCM was originally developed for commercial aviation, it has been adopted across virtually all asset-intensive industries: power generation and distribution, oil and gas, manufacturing, water and wastewater, rail transport, building services, and defence. The principles are universal because they apply to any physical asset that has functions, can fail, and where the consequences of failure matter. Many electrical maintenance organisations use RCM principles to develop their planned preventive maintenance programmes.',
  },
  {
    question: 'Does RCM eliminate all breakdowns?',
    answer:
      'No, and it does not attempt to. RCM recognises that some failures are best managed by allowing them to occur and repairing them when they happen (run-to-failure), provided the consequences are acceptable. RCM aims to focus maintenance effort where it delivers the greatest benefit — preventing failures with significant safety, environmental or operational consequences while accepting that low-consequence failures can be managed reactively. The result is a maintenance programme that is both more effective and more efficient than one based on time-based overhaul alone.',
  },
  {
    question: 'What is the difference between RCM and planned preventive maintenance (PPM)?',
    answer:
      'PPM is a maintenance strategy — it involves performing tasks at fixed time or usage intervals. RCM is a process for deciding which maintenance strategy to apply to each failure mode. RCM may result in PPM tasks for some failure modes, condition-based tasks for others, failure-finding tasks for protective devices, and run-to-failure for the remainder. PPM is one possible outcome of the RCM process, not an alternative to it. The key difference is that RCM provides a rigorous justification for every maintenance task.',
  },
  {
    question: 'How long does an RCM analysis take?',
    answer:
      'A full classical RCM analysis of a complex system can take significant time — typically weeks to months for a team of 4-6 people working part-time. This is why RCM is usually applied to the most critical assets first. Streamlined versions of RCM exist that reduce the analysis time by focusing on the most significant failure modes, but these must still comply with the principles of SAE JA1011 to be considered genuine RCM. For an apprentice, the important thing is to understand the principles and be able to contribute to RCM reviews.',
  },
  {
    question: 'How does the P-F interval relate to maintenance task frequency?',
    answer:
      'The P-F interval is the time between the point at which a failure starts to become detectable (the potential failure point, P) and the point at which it becomes a functional failure (F). For a condition-based task to be effective, the monitoring interval must be shorter than the P-F interval — typically half the P-F interval or less. For example, if bearing vibration becomes detectable 3 months before catastrophic failure, the vibration monitoring interval should be no more than 6 weeks. This ensures the deterioration is always detected in time to plan a repair.',
  },
];

const MOETModule4Section7_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.7 · Subsection 1"
        title="Principles of Reliability-Centred Maintenance (RCM)"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section7"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            A structured process for determining the right maintenance strategy for every asset.
          </p>

          <TLDR
            points={[
              'Function-focused: Maintenance exists to preserve asset functions, not just prevent breakdowns',
              'Seven questions: Structured framework covering functions, failures, consequences and tasks',
              'Consequence-driven: Maintenance strategy depends on what happens when a failure occurs',
              'Evidence-based: Every maintenance task must be technically feasible and worth doing',
            ]}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Rationale:</strong> Explains why different assets have different maintenance
                approaches
              </li>
              <li>
                <strong>FMEA:</strong> Technicians contribute failure mode knowledge to RCM reviews
              </li>
              <li>
                <strong>P-F interval:</strong> Determines how often condition monitoring should be
                performed
              </li>
              <li>
                <strong>ST1426:</strong> Demonstrates understanding of maintenance strategy and
                continuous improvement
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the origin and purpose of reliability-centred maintenance (RCM)',
              "Apply the seven RCM questions to analyse an asset's maintenance requirements",
              'Describe the role of failure modes and effects analysis (FMEA) within the RCM process',
              'Classify failure consequences using the RCM consequence framework',
              'Explain the P-F curve and how it determines condition monitoring intervals',
              'Select appropriate maintenance strategies based on failure mode characteristics and consequences',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Origins and purpose of RCM</ContentEyebrow>

          <ConceptBlock
            title="Origins and Purpose of RCM"
            onSite="Key point: RCM does not eliminate maintenance — it rationalises it. The result is a maintenance programme where every task has a clear justification based on the failure mode it manages and the consequence it prevents. Tasks that do not meet this criterion are eliminated, freeing resources for tasks that do."
          >
            <p>
              Reliability-centred maintenance (RCM) is a structured, systematic process for
              determining the maintenance requirements of any physical asset in its operating
              context. It was developed in the late 1960s and 1970s by Stanley Nowlan and Howard
              Heap at United Airlines, commissioned by the US Department of Defense. Their landmark
              1978 report fundamentally changed how the world thinks about maintenance.
            </p>
            <p>
              Before RCM, the prevailing assumption was that all equipment had a &apos;right&apos;
              overhaul interval — that components wore out predictably, and that regular time-based
              overhaul was the best way to maintain reliability. Nowlan and Heap&apos;s research,
              based on the analysis of hundreds of thousands of components in commercial aircraft,
              showed that this assumption was wrong for the vast majority of failure modes. Only
              about 11% of failure modes showed an age-related increase in failure probability. The
              remaining 89% showed either random failure patterns or a higher probability of failure
              immediately after maintenance (infant mortality).
            </p>
          </ConceptBlock>

          <ConceptBlock title="The six failure patterns">
            <p>RCM research identified six distinct failure patterns:</p>
            <ul className="list-none space-y-2 pl-0">
              <li>
                <strong className="font-mono text-elec-yellow/80">A</strong> — Bathtub curve — high
                infant mortality, then constant, then wear-out (4% of failure modes)
              </li>
              <li>
                <strong className="font-mono text-elec-yellow/80">B</strong> — Constant failure rate
                then wear-out — no infant mortality phase (2% of failure modes)
              </li>
              <li>
                <strong className="font-mono text-elec-yellow/80">C</strong> — Gradually increasing
                failure rate — no identifiable wear-out age (5% of failure modes)
              </li>
              <li>
                <strong className="font-mono text-elec-yellow/80">D</strong> — Low when new, then
                rapid increase to constant — initial low reliability (7% of failure modes)
              </li>
              <li>
                <strong className="font-mono text-elec-yellow/80">E</strong> — Random — constant
                probability of failure at any age (14% of failure modes)
              </li>
              <li>
                <strong className="font-mono text-elec-yellow/80">F</strong> — Infant mortality then
                constant — highest failure rate when new, then random (68% of failure modes)
              </li>
            </ul>
            <p className="text-[13px]">
              Pattern F (infant mortality then random) accounted for 68% of all failure modes
              studied. This means that for the majority of failures, overhauling equipment at a
              fixed interval actually increases the failure rate by reintroducing infant mortality.
            </p>
            <p>
              This finding had profound implications. If time-based overhaul does not reduce the
              failure rate for most failure modes, then a different approach is needed. RCM provides
              that approach: instead of asking &quot;how often should we overhaul this
              equipment?&quot;, it asks &quot;what must we do to manage the consequences of each
              failure mode?&quot; This shifts the focus from calendar-driven maintenance to
              consequence-driven maintenance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>The seven RCM questions</ContentEyebrow>

          <ConceptBlock
            title="The Seven RCM Questions"
            onSite="Key point: The seven questions must be answered in sequence. Skipping to maintenance task selection without first understanding functions, functional failures, failure modes, failure effects and consequences leads to maintenance programmes that are either wasteful (doing too much) or ineffective (doing the wrong things)."
          >
            <p>
              The RCM process is built around seven fundamental questions that are asked about each
              asset in its operating context. These questions follow a logical sequence: first
              understanding what the asset does, then how it can fail, and finally what should be
              done about each failure. Working through all seven questions ensures a complete and
              rigorous analysis.
            </p>
            <ol className="list-decimal space-y-3 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>
                  What are the functions and associated performance standards of the asset in its
                  present operating context?
                </strong>{' '}
                Define every function the asset performs, including primary functions (the reason it
                was acquired) and secondary functions (safety, containment, appearance,
                environmental compliance). Each function must include a performance standard.
                Example: &quot;Supply 415V three-phase power to distribution board DB3 continuously
                during production hours, within +10%/-6% voltage tolerance.&quot;
              </li>
              <li>
                <strong>
                  In what ways can it fail to fulfil its functions? (Functional Failures)
                </strong>{' '}
                For each function, identify all the ways the asset can fail to meet the performance
                standard. A functional failure can be total (complete loss of function) or partial
                (function degraded below the required standard). Example: &quot;Total loss of supply
                to DB3&quot; and &quot;Voltage to DB3 outside tolerance limits&quot; are both
                functional failures of the function above.
              </li>
              <li>
                <strong>What causes each functional failure? (Failure Modes)</strong> For each
                functional failure, identify all the failure modes — the specific events or
                processes that cause it. Failure modes should be described precisely enough to
                enable appropriate maintenance task selection. Example: &quot;Transformer winding
                insulation breakdown due to moisture ingress&quot; is a failure mode that points to
                specific monitoring tasks (insulation resistance testing, dissolved gas analysis).
              </li>
              <li>
                <strong>What happens when each failure occurs? (Failure Effects)</strong> Describe
                what happens when each failure mode occurs: what evidence does the operator see,
                hear or smell? What does the failure do to production, safety or the environment?
                How long does it take to repair? What secondary damage occurs? This information is
                essential for assessing consequences in the next question.
              </li>
              <li>
                <strong>In what way does each failure matter? (Failure Consequences)</strong>{' '}
                Classify the consequences of each failure mode: hidden failure (not evident under
                normal conditions), safety or environmental, operational (affects production), or
                non-operational (economic cost only). The consequence category determines which
                maintenance strategies are acceptable and how much effort is justified.
              </li>
              <li>
                <strong>
                  What can be done to predict or prevent each failure? (Proactive Tasks)
                </strong>{' '}
                For each failure mode, identify whether a proactive maintenance task is technically
                feasible and worth doing. Options include: condition-based tasks (monitoring for
                deterioration), scheduled restoration (overhaul at fixed intervals), scheduled
                discard (replacement at fixed intervals), and failure-finding tasks (periodic
                testing of hidden functions).
              </li>
              <li>
                <strong>
                  What should be done if no suitable proactive task can be found? (Default Actions)
                </strong>{' '}
                If no proactive task is technically feasible and worth doing: for hidden failures
                and safety consequences, redesign is mandatory; for operational consequences,
                run-to-failure may be acceptable if the economic impact is tolerable; for
                non-operational consequences, run-to-failure is the default. Every failure mode must
                have a documented strategy.
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>FMEA and the P-F curve</ContentEyebrow>

          <ConceptBlock title="FMEA and the P-F Curve">
            <p>
              Failure modes and effects analysis (FMEA) is the analytical engine of the RCM process.
              It provides the structured framework for answering questions 2 through 5 — identifying
              functional failures, failure modes, failure effects and failure consequences. The FMEA
              document becomes the permanent record of the analysis and the foundation for the
              maintenance programme.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="FMEA Information Sheet — Typical Structure"
            headers={['Column', 'Content']}
            rows={[
              ['Function', 'What the asset is required to do, with performance standard'],
              ['Functional Failure', 'How the function can be lost (total or partial)'],
              ['Failure Mode', 'The specific cause of the functional failure'],
              [
                'Failure Effect',
                'What happens when the failure mode occurs (evidence, impact, repair time)',
              ],
              ['Consequence', 'Hidden, safety/environmental, operational, or non-operational'],
            ]}
          />

          <ConceptBlock
            title="The P-F curve"
            onSite="Key point: Condition-based maintenance is only feasible when the P-F interval is long enough to allow detection and planned response. If the failure mode goes from detectable deterioration to functional failure in minutes or hours, condition monitoring is not practical — a different strategy (scheduled replacement, redesign, or run-to-failure) is needed."
          >
            <p>
              The P-F curve is a fundamental concept in RCM that determines whether condition-based
              maintenance is feasible for a given failure mode. &quot;P&quot; represents the point
              of potential failure — the earliest point at which deterioration can be detected using
              a monitoring technique. &quot;F&quot; represents the point of functional failure —
              where the asset can no longer perform its required function. The time between P and F
              is the P-F interval.
            </p>
            <div className="space-y-1 rounded bg-white/5 p-3 font-mono text-sm text-white">
              <p>Condition</p>
              <p>&nbsp;&nbsp;&nbsp;|</p>
              <p>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;Normal operating condition</p>
              <p>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;================================</p>
              <p>
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                P (Potential failure)
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                &lt;-- P-F interval --&gt;
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F
                (Functional failure)
              </p>
              <p>&nbsp;&nbsp;&nbsp;+------------------------------------------&gt; Time</p>
            </div>
            <p className="text-[13px]">
              The monitoring interval must be shorter than the P-F interval (typically half or less)
              to ensure deterioration is always detected before functional failure.
            </p>
          </ConceptBlock>

          <ConceptBlock title="P-F intervals for common electrical failure modes">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motor bearing vibration:</strong> P-F interval typically 1-9 months —
                monitor vibration monthly
              </li>
              <li>
                <strong>Loose electrical connections (thermography):</strong> P-F interval weeks to
                months — thermal survey quarterly
              </li>
              <li>
                <strong>Motor winding insulation (IR testing):</strong> P-F interval months to years
                — test annually or six-monthly
              </li>
              <li>
                <strong>Transformer oil degradation (DGA):</strong> P-F interval months to years —
                sample annually for critical units
              </li>
              <li>
                <strong>Cable insulation (partial discharge):</strong> P-F interval months to years
                — test during shutdowns
              </li>
              <li>
                <strong>Contactor tip wear:</strong> P-F interval short — often managed by scheduled
                discard based on operations count
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Failure consequences and maintenance strategy selection</ContentEyebrow>

          <ConceptBlock title="Failure Consequences and Maintenance Strategy Selection">
            <p>
              The consequence of failure is the single most important factor in determining the
              appropriate maintenance strategy. RCM uses a structured decision logic that
              categorises consequences and then selects maintenance tasks accordingly. This is
              fundamentally different from traditional approaches that base maintenance frequency on
              the probability of failure alone — RCM considers both the probability and the
              consequence.
            </p>
          </ConceptBlock>

          <ConceptBlock title="RCM consequence categories and strategy selection">
            <ul className="list-disc space-y-2.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hidden failure consequences.</strong> Failure is not evident under normal
                conditions (protective devices, standby systems). Strategy: failure-finding task at
                an interval that provides the required availability. If no task is feasible,
                redesign is mandatory.
              </li>
              <li>
                <strong>Safety and environmental consequences.</strong> Failure could injure or kill
                someone, or cause environmental damage. Strategy: a proactive task that reduces the
                probability of failure to a tolerable level. If no task is feasible, redesign is
                mandatory. Run-to-failure is never acceptable.
              </li>
              <li>
                <strong>Operational consequences.</strong> Failure affects production, quality or
                service level. Strategy: a proactive task is worth doing if the total cost of the
                task over time is less than the total cost of the operational consequences over the
                same period. Otherwise, run-to-failure with planned response.
              </li>
              <li>
                <strong>Non-operational (economic) consequences.</strong> The only consequence is
                the direct cost of repair. Strategy: a proactive task is worth doing only if the
                cost of the task over time is less than the cost of repair over the same period.
                Run-to-failure is the default.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Practical example: motor on a packaging line">
            <p>
              Consider a 15 kW motor driving a packaging conveyor. Different failure modes have
              different consequences:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Bearing failure:</strong> Operational consequence (stops production). P-F
                interval 3-6 months. Strategy: condition-based (vibration monitoring monthly)
              </li>
              <li>
                <strong>Winding earth fault:</strong> Safety consequence (electric shock risk). P-F
                interval 6-12 months. Strategy: condition-based (insulation resistance testing
                six-monthly)
              </li>
              <li>
                <strong>Overload relay failure:</strong> Hidden failure (not evident until motor
                overloads). Strategy: failure-finding task (test relay operation every 6 months)
              </li>
              <li>
                <strong>Terminal box gasket degradation:</strong> Non-operational (moisture ingress
                risk, but contained by other protection). Strategy: scheduled discard at 5-year
                interval
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Proactive task types">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Condition-based:</strong> Monitor for deterioration (vibration,
                thermography, oil analysis, IR testing)
              </li>
              <li>
                <strong>Scheduled restoration:</strong> Overhaul at fixed intervals (where
                age-related wear-out is evident)
              </li>
              <li>
                <strong>Scheduled discard:</strong> Replace at fixed intervals (where restoration is
                not feasible)
              </li>
              <li>
                <strong>Failure-finding:</strong> Periodic testing of hidden functions (trip tests,
                function tests)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Default actions (no suitable proactive task)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hidden failures:</strong> Redesign mandatory (must make failure evident or
                add redundancy)
              </li>
              <li>
                <strong>Safety consequences:</strong> Redesign mandatory (must reduce risk to
                acceptable level)
              </li>
              <li>
                <strong>Operational consequences:</strong> Run-to-failure may be acceptable if cost
                is tolerable
              </li>
              <li>
                <strong>Non-operational:</strong> Run-to-failure is the default strategy
              </li>
            </ul>
            <p className="italic">
              <strong className="not-italic">Note:</strong> RCM does not mandate the most
              technically advanced maintenance approach — it mandates the most appropriate one. For
              some failure modes, the most appropriate strategy is run-to-failure. This is not
              neglect; it is a conscious, justified decision that the consequences of failure are
              acceptable and that proactive maintenance would cost more than it saves. Every
              maintenance task in an RCM programme earns its place.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'The seven RCM questions: what are its functions?; how can it fail? (functional failures); what causes each failure? (failure modes); what happens? (failure effects); does it matter? (consequences); can we predict/prevent it? (proactive tasks); what if no task works? (default actions).',
              'RCM maintenance strategies: condition-based (monitor for deterioration); scheduled restoration (overhaul at fixed intervals); scheduled discard (replace at fixed intervals); failure-finding (test hidden functions periodically); run-to-failure (repair when it breaks, justified); redesign (change the asset to eliminate the risk).',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section7')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Reliability-centred maintenance
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section7-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Balancing PPM and Corrective Maintenance
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section7_1;
