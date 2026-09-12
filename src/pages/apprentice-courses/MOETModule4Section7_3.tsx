/**
 * MOET · Module 4 · Section 7.3 · Subsection 3 — Criticality Analysis of Equipment
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
 *   Knowledge  · "Equipment life cycle considerations."
 *              · "Electrical. Problem solving and critical reasoning
 *                 techniques."
 *
 * Numeric detail (criticality scoring bands, RPN formula) is copied
 * verbatim from the original page; the bs7671_facets RAG holds regulation
 * rules, not this kind of maintenance-management scoring, so it could not
 * be checked against it. The page's own "5-yearly" periodic inspection
 * mention for a General-rated asset is presented as typical practice, not
 * as a mandated interval, and has been left as written.
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
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Criticality Analysis of Equipment - MOET Module 4 Section 7.3';
const DESCRIPTION =
  'Understanding how to assess and rank equipment criticality for maintenance prioritisation, including criticality matrices, risk-based ranking, consequence assessment, and how criticality drives maintenance strategy selection for electrical systems aligned to ST1426.';

const quickCheckQuestions = [
  {
    id: 'criticality-purpose',
    question: 'The primary purpose of criticality analysis in maintenance management is to:',
    options: [
      'Schedule every asset for the same fixed preventive maintenance interval to keep the programme simple',
      'Rank equipment by purchase cost so the most expensive assets always receive the most maintenance',
      'Eliminate the need for any condition monitoring by simply running all equipment to failure',
      'Rank equipment by failure consequence so effort goes to the most important assets first',
    ],
    correctIndex: 3,
    explanation:
      'Criticality analysis ranks equipment based on the impact that its failure would have on safety, the environment, production, quality and cost. This ranking enables the maintenance organisation to allocate its limited resources (technician time, condition monitoring, spare parts investment) to the assets where failure would have the greatest consequences. Critical assets receive the most comprehensive maintenance strategy, while non-critical assets may be maintained with simpler or less frequent tasks, or deliberately run to failure.',
  },
  {
    id: 'criticality-factors',
    question:
      'When assessing the criticality of a piece of electrical equipment, the key factors to consider include:',
    options: [
      'Only the physical size and weight of the equipment, since larger equipment is always more critical',
      'The failure consequences: safety, environment, production, repair time and redundancy',
      'Only the original purchase price and current depreciated book value of the asset',
      'Only the age of the equipment, since older equipment is always the most critical of all',
    ],
    correctIndex: 1,
    explanation:
      'Criticality is determined by the consequences of failure, not by the physical characteristics or cost of the equipment. A small, inexpensive relay that protects against a safety-critical failure may be more critical than a large, expensive motor that has a standby backup. The assessment considers: would a failure cause injury or death? Would it cause environmental harm? Would it stop production? How long would it take to repair? Is there redundancy? Each factor is scored and the overall criticality rating determines the maintenance strategy.',
  },
  {
    id: 'criticality-categories',
    question: 'A typical criticality classification system categorises equipment as:',
    options: [
      'New (A) — installed this year; Mid-life (B) — five years old; End-of-life (C) — due for replacement',
      'Mains (A) — supplied from the grid; Standby (B) — supplied from generator; Battery (C) — supplied from UPS',
      'Heavy (A) — over one tonne; Medium (B) — under one tonne; Light (C) — portable equipment',
      'Critical (A) — no redundancy; Important (B) — some mitigation; General (C) — low consequence',
    ],
    correctIndex: 3,
    explanation:
      'Most criticality systems use three or four categories. Critical (A) assets are those where failure would have serious safety, environmental or production consequences and where no backup or redundancy exists — these receive the most comprehensive maintenance. Important (B) assets have moderate consequences or have partial redundancy — they receive targeted preventive maintenance. General (C) assets have low failure consequences and are typically managed with basic inspection or run-to-failure. This ABC classification directly drives the maintenance strategy for each asset.',
  },
  {
    id: 'criticality-maintenance-link',
    question: 'The relationship between criticality and maintenance strategy is:',
    options: [
      'All equipment receives an identical maintenance strategy regardless of its criticality rating',
      'Higher criticality earns more proactive maintenance; lower criticality earns simpler strategies',
      'Higher-criticality equipment is deliberately run to failure to gather more reliability data',
      'Lower-criticality equipment receives the most condition monitoring because it fails most often',
    ],
    correctIndex: 1,
    explanation:
      'Criticality directly determines maintenance strategy. Critical (A) assets typically receive: condition-based monitoring (vibration, thermography, oil analysis), comprehensive PPM with shorter intervals, detailed FMEA, priority spare parts holding, and detailed failure investigation when breakdowns occur. Important (B) assets receive targeted PPM and selective condition monitoring. General (C) assets receive basic inspection or are managed on a run-to-failure basis. This ensures that maintenance effort is proportional to the consequences of failure.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Criticality analysis should be performed:',
    options: [
      'Only once, at the point of original installation, and never revisited afterwards at all',
      'Across all assets, and reviewed periodically or when conditions or failures change the picture',
      'Only on equipment that has already failed at least once during service on the site',
      'Only on the most expensive items of plant, ignoring small or cheap components entirely',
    ],
    correctAnswer: 1,
    explanation:
      'Criticality analysis should be a systematic, documented exercise covering all maintainable assets. It should be reviewed periodically (typically annually or as part of the maintenance review cycle) and updated when circumstances change: new equipment is installed, production requirements change, redundancy is added or removed, regulations change, or a failure reveals consequences that were not previously recognised. A criticality register that is never reviewed becomes outdated and ceases to drive appropriate maintenance decisions.',
  },
  {
    id: 2,
    question: 'A criticality matrix typically scores each asset against factors including:',
    options: [
      'The brand reputation of the manufacturer and the colour of the equipment housing',
      'The original purchase price and the current resale value of the asset only',
      'Safety, environment, production impact, failure frequency, detectability and repair time',
      'The number of cables connected and the physical weight of the whole asset only',
    ],
    correctAnswer: 2,
    explanation:
      'A criticality matrix scores each asset against multiple consequence dimensions. Common factors include: safety impact (from no impact to potential fatality), environmental impact (from none to reportable incident), production impact (from none to complete plant shutdown), failure frequency (how often the failure mode is expected to occur), detectability (how easily a developing fault can be detected), and repair time/cost (from quick replacement to extended rebuild). Each factor is scored on a numerical scale, and the scores are combined to produce an overall criticality rating.',
  },
  {
    id: 3,
    question:
      'In a criticality matrix, a motor on a critical production line with no standby backup would typically be rated:',
    options: [
      'Low criticality (C) because a single motor is a relatively inexpensive item to replace',
      'Medium criticality (B) because all motors are automatically Important whatever the context',
      'Not rated at all, because motors are routinely excluded from criticality analysis',
      'High criticality (A) because failure stops production and there is no redundancy',
    ],
    correctAnswer: 3,
    explanation:
      'The criticality of the motor is determined by the consequences of its failure in context, not by its inherent characteristics. A motor on a critical production line with no backup scores highly on production impact (line stops), repair time (may need specialist parts or winding), and lack of redundancy (no alternative path). This makes it a high-criticality (A) asset, warranting comprehensive maintenance: vibration monitoring, thermographic survey, insulation resistance testing, detailed PM schedule, and priority spare parts. The same model of motor in a non-critical application might be rated C.',
  },
  {
    id: 4,
    question: 'A standby generator used for emergency power in a hospital would be classified as:',
    options: [
      'High criticality (A) — failure when demanded has life-safety consequences despite low hours',
      'Low criticality (C) because it only runs for a few hours each year and is rarely used',
      'Medium criticality (B) because it is a backup system and backups are never more than Important',
      'Exempt from criticality classification because it is not part of the normal production process',
    ],
    correctAnswer: 0,
    explanation:
      "Criticality is based on the consequences of failure, not on how often the equipment runs. A standby generator in a hospital has extreme consequences if it fails when demanded — loss of power to operating theatres, life support equipment, and essential services. Despite running for only a few hours per year, it must be classified as critical (A) with a comprehensive maintenance and testing regime including regular load testing, fuel system maintenance, battery and starter checks, automatic transfer switch testing, and periodic full-load runs. This is an example of RCM's failure-finding task applied to equipment with hidden failure potential.",
  },
  {
    id: 5,
    question: "The concept of 'redundancy' affects criticality because:",
    options: [
      'Redundancy means the backup system never needs to be maintained or tested at all',
      'A working backup cuts the consequence of a single failure, but the backup must itself be maintained',
      'Redundancy always raises an asset to the highest criticality category automatically',
      'Redundancy has no effect on criticality, which is fixed by the equipment type alone',
    ],
    correctAnswer: 1,
    explanation:
      "Redundancy reduces the production consequence of a single failure — if Pump A fails, Pump B can take over. However, this does not mean Pump A or Pump B can be neglected. Each pump individually may be rated as important (B) rather than critical (A) because the other provides backup. But the system as a whole remains critical, and the backup pump must be maintained and tested to ensure it will actually work when called upon. A common failure is neglecting the standby unit because it is 'not running' — which defeats the purpose of having redundancy.",
  },
  {
    id: 6,
    question: 'A Risk Priority Number (RPN) is calculated by:',
    options: [
      'Adding Severity (S) and Occurrence (O) and subtracting Detection (D)',
      'Dividing the repair cost by the mean time between failures',
      'Multiplying Severity x Occurrence x Detection to rank each failure mode',
      'Multiplying the asset purchase price by its remaining service life',
    ],
    correctAnswer: 2,
    explanation:
      'The Risk Priority Number (RPN) is a tool from FMEA that combines three factors: Severity (how serious are the consequences of this failure mode — scored 1-10), Occurrence (how likely is this failure mode to occur — scored 1-10), and Detection (how likely is it that the failure will be detected before it causes the consequence — scored 1-10, where 10 means very hard to detect). RPN = S x O x D, giving a range from 1 to 1,000. Higher RPN values indicate failure modes that need priority attention. The RPN drives both criticality ranking and maintenance task selection.',
  },
  {
    id: 7,
    question:
      'When two assets have the same production impact but one has a safety consequence and the other does not, the asset with the safety consequence should:',
    options: [
      'Be ranked the same as the other asset, since the production impact is identical',
      'Be ranked lower, because safety issues are handled separately by the risk assessment',
      'Be ranked lower only if it happens to be cheaper to replace than the other asset',
      'Always be ranked higher, because safety takes priority over all other factors',
    ],
    correctAnswer: 3,
    explanation:
      'Safety always takes priority in criticality assessment. An asset whose failure could cause injury or death must be ranked as critical regardless of its production impact. This reflects the legal duty of care under the Health and Safety at Work etc. Act 1974 and the Electricity at Work Regulations 1989 — the employer must ensure that electrical systems are maintained so as to prevent danger. No economic argument can justify accepting a safety risk. The criticality assessment must reflect this hierarchy: safety first, then environmental, then operational, then economic.',
  },
  {
    id: 8,
    question: 'A criticality register should contain, as a minimum:',
    options: [
      'Asset ID, function, rating, the basis for it, the maintenance strategy and review date',
      'Only the asset tag number and its physical location, with no rating recorded at all',
      'Only the purchase date and the warranty expiry date of each individual asset',
      'Only a list of past breakdowns, with no rating or assigned maintenance strategy',
    ],
    correctAnswer: 0,
    explanation:
      "A useful criticality register documents: asset identification (tag number, description, location), the asset's function in the system, the criticality rating (A, B or C), the justification for the rating (what failure consequences were considered and scored), the maintenance strategy assigned based on the criticality (condition monitoring, PPM, run-to-failure), spare parts holding decision, and the date of last review. This documentation ensures that criticality decisions are traceable, reviewable and auditable — not based on individual opinion or tradition.",
  },
  {
    id: 9,
    question: 'A common mistake in criticality analysis is:',
    options: [
      'Involving operators and technicians who understand how the equipment actually fails',
      'Rating by cost or size instead of by the consequences of failure in context',
      'Reviewing the criticality register whenever the operating conditions change',
      'Recording the basis for each rating so the decision is traceable and auditable',
    ],
    correctAnswer: 1,
    explanation:
      'One of the most common mistakes is confusing asset value with asset criticality. A large, expensive transformer with a standby backup may be less critical than a small, cheap RCD that provides the sole means of earth fault protection for a socket circuit used by production staff. Criticality is about consequences of failure in context, not about the inherent value or complexity of the equipment. Other common mistakes include: not considering hidden failures (standby/protective devices), not accounting for secondary damage, and not reviewing the analysis when conditions change.',
  },
  {
    id: 10,
    question:
      'The maintenance strategy for a Critical (A) rated electrical panel would typically include:',
    options: [
      'A simple run-to-failure approach with replacement only when a fault is reported',
      'A single visual inspection every ten years with no testing at all in between',
      'Condition monitoring, detailed PPM, priority spares and failure investigation',
      'No planned maintenance at all, relying entirely on the manufacturer warranty',
    ],
    correctAnswer: 2,
    explanation:
      'Critical (A) assets warrant the most comprehensive maintenance approach: condition monitoring (thermographic surveys to detect hot joints, insulation resistance testing for busbar degradation, partial discharge monitoring for HV panels), comprehensive PPM (scheduled inspections with torque checks, cleaning, functional testing of protection devices), priority spare parts (key components held in stock or on guaranteed delivery), emergency response plan (documented procedure for rapid repair), and detailed investigation and root cause analysis following any failure.',
  },
  {
    id: 11,
    question:
      'For a General (C) rated asset such as a convenience socket outlet in a storage area, the appropriate maintenance strategy is typically:',
    options: [
      'Weekly functional testing and monthly thermographic surveys of the socket outlet',
      'Priority spare parts holding and a fully documented emergency response plan',
      'Comprehensive condition monitoring, detailed PPM and priority spares holding',
      'Periodic inspection per BS 7671, with repair on fault report — run-to-failure is acceptable',
    ],
    correctAnswer: 3,
    explanation:
      'General (C) assets have low consequences of failure and do not justify comprehensive proactive maintenance. A convenience socket outlet in a storage area would be inspected as part of the periodic inspection and testing programme required by BS 7671 (typically every 5 years for a commercial premises), and repaired or replaced when a fault is reported by the user. This is a run-to-failure strategy with basic statutory inspection — it is appropriate because the consequence of the socket failing is minimal (no safety, environmental or production impact beyond minor inconvenience).',
  },
  {
    id: 12,
    question:
      'In the context of ST1426, understanding criticality analysis enables the maintenance technician to:',
    options: [
      'Prioritise work by criticality, contribute to assessments, and explain why effort varies',
      'Ignore asset priorities and complete maintenance tasks strictly in the order they were raised',
      'Set criticality ratings alone without consulting any operations or engineering colleagues',
      'Treat all assets identically so that no single asset is ever given preferential maintenance',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 expects maintenance technicians to understand the rationale behind maintenance planning and contribute to continuous improvement. Understanding criticality enables the technician to: prioritise their own work (critical equipment first when multiple tasks compete for time), contribute practical knowledge to criticality assessments (they know which equipment causes the most problems), understand why some equipment gets more attention than others, and explain the maintenance strategy to operators and colleagues. This understanding is valued in the End Point Assessment professional discussion.',
  },
];

const faqs = [
  {
    question: 'Who should carry out the criticality analysis?',
    answer:
      'Criticality analysis should be a team exercise involving maintenance technicians, maintenance planners, production/operations staff, and the engineering manager. Technicians bring knowledge of failure modes and repair times, operators bring knowledge of the production impact of equipment failure, planners bring knowledge of maintenance costs and history, and the manager provides the strategic perspective. A team-based approach ensures the assessment is comprehensive and that the resulting maintenance strategies have buy-in from all stakeholders.',
  },
  {
    question: 'How often should criticality ratings be reviewed?',
    answer:
      'Criticality ratings should be reviewed at least annually as part of the maintenance programme review, and also when: new equipment is installed, production requirements change (an asset that was non-critical may become critical if production increases), redundancy is added or removed, a failure reveals consequences that were not previously recognised, regulations change, or the operating context changes significantly. A criticality register that is never reviewed becomes a historical document rather than a living management tool.',
  },
  {
    question: 'What is the difference between criticality analysis and risk assessment?',
    answer:
      "Criticality analysis and risk assessment are related but different exercises. Risk assessment (as required by the Management of Health and Safety at Work Regulations 1999) focuses on identifying hazards and evaluating the risk to people's health and safety. Criticality analysis is broader — it considers safety, environmental, operational and economic consequences of equipment failure. In practice, safety risk assessment should inform the safety dimension of the criticality analysis. An asset with a high safety risk will always be rated as critical.",
  },
  {
    question: 'Should I apply the same criticality framework to all types of equipment?',
    answer:
      'The same framework (same consequence categories, same scoring scale) should be applied to all assets to ensure consistency and comparability. However, the specific failure modes, consequences and probabilities will be different for different equipment types. A motor, a VSD, a distribution panel and a PLC each have different failure modes and different consequences. The framework provides a consistent basis for comparison, while the specific analysis is tailored to each asset type and its operating context.',
  },
  {
    question: 'What do I do if I disagree with the criticality rating assigned to an asset?',
    answer:
      'Raise it through the appropriate channel — typically at a maintenance review meeting or with your supervisor. If you believe an asset is rated too low (based on your experience of its failure consequences or frequency), provide specific evidence: describe the failures you have witnessed, the consequences that occurred, and why you believe the rating should be higher. Similarly, if you believe an asset is rated too high and is consuming excessive maintenance resources, present the evidence. Criticality analysis should be a living process, and practical feedback from technicians is essential to keeping it accurate.',
  },
];

const MOETModule4Section7_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.7 · Subsection 3"
        title="Criticality Analysis of Equipment"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section7"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Ranking assets by failure consequences to focus maintenance where it matters most.
          </p>

          <TLDR
            points={[
              'Consequence-based: Criticality reflects failure impact, not equipment cost or size',
              'ABC classification: Critical, Important, General — drives maintenance strategy',
              'Multi-factor: Safety, environment, production, repair time, redundancy',
              'Resource allocation: Focus maintenance effort on the assets that matter most',
            ]}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Work prioritisation:</strong> Critical assets take priority when tasks
                compete for time
              </li>
              <li>
                <strong>Practical input:</strong> Your failure mode knowledge improves criticality
                accuracy
              </li>
              <li>
                <strong>Strategy understanding:</strong> Explains why different assets have
                different PM schedules
              </li>
              <li>
                <strong>ST1426:</strong> Demonstrates understanding of maintenance planning and
                prioritisation
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the purpose of criticality analysis in maintenance management',
              'Identify the factors that determine equipment criticality',
              'Apply a criticality matrix to rank electrical equipment by failure consequence',
              'Describe how criticality ratings drive maintenance strategy selection',
              'Explain the role of redundancy in criticality assessment',
              'Contribute to criticality reviews using practical maintenance knowledge',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why criticality analysis matters</ContentEyebrow>

          <ConceptBlock
            title="Why Criticality Analysis Matters"
            onSite="Key point: Criticality is a property of the asset in its operating context, not a property of the equipment type. The same model of motor, VSD or panel can have different criticality ratings depending on what it does, where it is, and what happens if it fails."
          >
            <p>
              Every maintenance organisation has limited resources — there are never enough
              technicians, enough time, enough budget or enough shutdown windows to do everything
              perfectly. Criticality analysis provides a rational, documented basis for deciding
              where to focus those resources for maximum impact. Without it, maintenance effort
              tends to be distributed based on tradition, personal preference, or whoever shouts
              loudest when their equipment breaks down.
            </p>
            <p>
              The core principle is simple: not all equipment is equally important. A failure in a
              safety-critical protective system has fundamentally different consequences from a
              failure in a convenience socket outlet. The maintenance strategy should reflect this
              difference. A comprehensive condition monitoring programme on a critical production
              motor is money well spent. The same programme on a non-critical ventilation fan in a
              storage room would be wasteful.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The problem without criticality analysis">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Over-maintenance of non-critical assets:</strong> Technician time spent on
                equipment where failure has minimal consequences
              </li>
              <li>
                <strong>Under-maintenance of critical assets:</strong> Important equipment does not
                receive the attention it needs because resources are spread too thinly
              </li>
              <li>
                <strong>Reactive firefighting:</strong> Without prioritisation, every breakdown
                feels equally urgent, leading to constant firefighting
              </li>
              <li>
                <strong>Inefficient spare parts:</strong> Stock held for non-critical items while
                critical spares are not available
              </li>
              <li>
                <strong>No basis for investment:</strong> Difficult to justify condition monitoring
                or PM investment without documented criticality
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Practical example: two motors, same model"
            situation={
              <>
                <p>
                  Consider two identical 30 kW motors — same manufacturer, same model, same age:
                </p>
                <ul className="list-disc space-y-1.5 pl-5 marker:text-cyan-400/70">
                  <li>
                    <strong>Motor A:</strong> Drives the main production line conveyor. No standby.
                    Failure stops the entire factory. 8-hour repair time. Lost production cost is
                    very high per hour
                  </li>
                  <li>
                    <strong>Motor B:</strong> Drives a ventilation fan in the warehouse. Standby fan
                    available. Failure causes minor inconvenience. 4-hour repair time. No production
                    impact
                  </li>
                </ul>
              </>
            }
            whatToDo={
              <p>
                Same motor, entirely different criticality. Motor A is Critical (A) — full condition
                monitoring, comprehensive PM, priority spares. Motor B is General (C) — basic
                inspection, run-to-failure acceptable. This is criticality in action.
              </p>
            }
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>The criticality matrix</ContentEyebrow>

          <ConceptBlock title="The Criticality Matrix">
            <p>
              A criticality matrix provides a structured, repeatable method for assessing and
              scoring the criticality of each asset. By scoring multiple consequence factors on a
              consistent scale, the matrix produces an overall criticality rating that can be used
              to rank all assets and assign appropriate maintenance strategies. The matrix ensures
              that criticality decisions are based on objective criteria rather than subjective
              opinion.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Typical Criticality Scoring Matrix"
            headers={['Factor', 'Score 1 (Low)', 'Score 3 (Medium)', 'Score 5 (High)']}
            rows={[
              [
                'Safety',
                'No risk to people',
                'Minor injury possible',
                'Serious injury or fatality possible',
              ],
              [
                'Environment',
                'No environmental impact',
                'Minor contained release',
                'Reportable environmental incident',
              ],
              [
                'Production',
                'No impact on output',
                'Reduced output or quality',
                'Complete production stop',
              ],
              ['Repair Time', 'Under 1 hour', '1-8 hours', 'Over 8 hours'],
              [
                'Redundancy',
                'Full backup available',
                'Partial mitigation possible',
                'No redundancy at all',
              ],
            ]}
            notes="Total score: 5-9 = General (C), 10-17 = Important (B), 18-25 = Critical (A). Safety score of 5 automatically overrides to Critical (A) regardless of total."
          />

          <ConceptBlock
            title="Applying the matrix"
            onSite="Key point: Any asset with a safety score of 5 (serious injury or fatality possible) should automatically be rated Critical (A) regardless of the other scores. Safety consequences override all other considerations. This is a non-negotiable principle that reflects legal and ethical obligations."
          >
            <p>
              The matrix should be applied systematically to every asset in the maintenance
              register. The scoring is typically done by a small team that includes a maintenance
              technician (who knows how the equipment fails and how long repairs take), an operator
              (who knows the production impact), and a planner or manager (who has the overview of
              the system). The resulting scores are documented in the criticality register and
              linked to the CMMS asset record.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>From criticality to maintenance strategy</ContentEyebrow>

          <ConceptBlock
            title="From Criticality to Maintenance Strategy"
            onSite="Key point: The maintenance strategy must be proportional to the criticality. Applying a Critical (A) strategy to a General (C) asset wastes resources. Applying a General (C) strategy to a Critical (A) asset creates unacceptable risk. Getting this alignment right is one of the most important decisions in maintenance management."
          >
            <p>
              The criticality rating directly determines the maintenance strategy for each asset.
              This is the practical output of the analysis — it translates the criticality
              assessment into specific maintenance actions, frequencies, spare parts decisions, and
              failure response procedures. The link between criticality and strategy must be
              documented, understood and followed.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Critical (A) — comprehensive proactive strategy">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Full condition monitoring programme (vibration, thermography, IR testing, oil
                analysis as applicable)
              </li>
              <li>Comprehensive PPM schedule with shorter intervals</li>
              <li>Detailed FMEA to identify all significant failure modes</li>
              <li>Priority spare parts held in stock or on guaranteed rapid delivery</li>
              <li>Documented emergency response and repair procedures</li>
              <li>Root cause analysis mandatory for every unplanned failure</li>
              <li>Regular review of maintenance effectiveness</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Important (B) — targeted proactive strategy">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Selective condition monitoring (thermography, key measurements)</li>
              <li>Standard PPM schedule based on manufacturer recommendations and experience</li>
              <li>Key spare parts identified and sourced (not necessarily held in stock)</li>
              <li>Root cause analysis for repeated failures or significant events</li>
              <li>Periodic review of failure history to adjust strategy</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="General (C) — basic or reactive strategy">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Basic periodic inspection (as part of statutory requirements e.g. BS 7671)</li>
              <li>Run-to-failure acceptable for most failure modes</li>
              <li>Spare parts sourced when needed (standard supply chain)</li>
              <li>Repair on failure, no detailed investigation required</li>
              <li>Consider for replacement rather than expensive repair</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Practical example: distribution board hierarchy">
            <p>Consider three distribution boards in a manufacturing facility:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Main switchboard (MSB):</strong> Feeds the entire facility. Critical (A).
                Annual thermographic survey, 6-monthly insulation testing, trip test programme for
                all protection, spare MCCB held in stock
              </li>
              <li>
                <strong>Production sub-board (DB1):</strong> Feeds one production line. Standby
                changeover available. Important (B). Annual thermographic survey, annual inspection,
                key spares identified
              </li>
              <li>
                <strong>Office lighting board (DB7):</strong> Feeds office lighting only. General
                (C). 5-yearly periodic inspection per BS 7671, repair on fault report
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Implementing and maintaining the criticality register</ContentEyebrow>

          <ConceptBlock title="Implementing and Maintaining the Criticality Register">
            <p>
              A criticality register is only valuable if it is implemented effectively, kept
              current, and used to drive real maintenance decisions. Too often, organisations invest
              time in creating a criticality analysis but then fail to translate it into practice,
              or allow it to become outdated. The register must be a living document that actively
              shapes day-to-day maintenance priorities.
            </p>
            <ol className="list-decimal space-y-3 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Create the asset register.</strong> List all maintainable electrical assets:
                motors, drives, panels, transformers, generators, UPS systems, protection devices,
                control systems and instrumentation. Each asset should have a unique identifier (tag
                number) linked to the CMMS. Include the asset&apos;s function, location and the
                system it serves.
              </li>
              <li>
                <strong>Score each asset.</strong> Apply the criticality matrix to each asset as a
                team exercise. Score safety, environment, production, repair time and redundancy.
                Document the scores and the rationale. Identify any assets where the rating is
                uncertain and flag them for further review or discussion with operations.
              </li>
              <li>
                <strong>Assign maintenance strategies.</strong> Map each criticality category to a
                maintenance strategy template. Link the strategies to specific CMMS PM schedules,
                condition monitoring routes and spare parts lists. Ensure every Critical (A) asset
                has a comprehensive strategy, every Important (B) asset has a targeted strategy, and
                every General (C) asset has at minimum the statutory inspection requirements
                covered.
              </li>
              <li>
                <strong>Review and update.</strong> Schedule annual reviews of the criticality
                register. Update when: new assets are installed, assets are decommissioned,
                production requirements change, redundancy is added or removed, a failure reveals
                previously unrecognised consequences, or regulatory requirements change. Track
                changes to maintain an audit trail.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Signs of effective implementation">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Technicians know which assets are critical in their area</li>
              <li>PM schedules reflect criticality (more tasks on A, fewer on C)</li>
              <li>Spare parts stock aligns with criticality priorities</li>
              <li>Breakdown response prioritises critical equipment</li>
              <li>Criticality register is referenced in maintenance reviews</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common implementation failures">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Analysis done but not linked to CMMS or PM schedules</li>
              <li>Register created but never reviewed or updated</li>
              <li>Criticality not communicated to technicians and operators</li>
              <li>Same PM applied to all assets regardless of rating</li>
              <li>No process for challenging or updating ratings</li>
            </ul>
            <p className="italic">
              <strong className="not-italic">Note:</strong> Criticality analysis is not a one-off
              project — it is an ongoing management process. The initial analysis establishes the
              baseline, but the real value comes from using it daily to guide maintenance decisions,
              and updating it continuously as the organisation learns more about its assets and
              their failure behaviour. A well-maintained criticality register is one of the most
              valuable tools in the maintenance manager&apos;s toolkit.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Criticality assessment factors: safety impact (injury/fatality potential); environmental impact (release/contamination); production impact (output/quality/delivery); repair time and cost; redundancy and backup availability; failure frequency and detectability.',
              'ABC maintenance strategy: A (Critical) — full CBM, comprehensive PPM, priority spares; B (Important) — selective CBM, standard PPM, key spares; C (General) — basic inspection, run-to-failure, repair/replace. Safety score 5 = auto-Critical (A). Review annually and on change. Document rationale in the criticality register.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section7-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Balancing PPM and Corrective Maintenance
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section7-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Industry Best Practices in RCM
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section7_3;
