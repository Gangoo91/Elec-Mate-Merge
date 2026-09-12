/**
 * MOET · Module 4 · Section 6.1 · Subsection 1 — Identifying Underlying Failures
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
 *   Knowledge · "Electrical. Common electrical plant, equipment, and
 *                systems failure modes."
 *              · "Electrical. Problem solving and critical reasoning
 *                 techniques."
 *   Behaviour · "Continuous improvement (CI) systems and techniques."
 *
 * Numeric/technical detail (e.g. the "halves every 10°C" insulation-life
 * rule of thumb) is copied verbatim from the original page; the
 * bs7671_facets RAG holds regulation rules, not this kind of engineering
 * heuristic, so it could not be checked against it.
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

const TITLE = 'Identifying Underlying Failures - MOET Module 4.6.1';
const DESCRIPTION =
  'Comprehensive guide to identifying underlying failures in electrical maintenance: distinguishing root causes from symptoms, systematic investigation methods, failure categorisation and common failure patterns in electrical systems.';

const quickCheckQuestions = [
  {
    id: 'rca-symptom-vs-cause',
    question:
      'A motor repeatedly trips its overload relay after being reset. What does the tripping represent?',
    options: [
      'Proof that the overload relay is faulty and needs replacing',
      'A normal protective action that requires no further attention',
      'Confirmation that the motor is correctly rated for its load',
      'A symptom indicating an underlying problem that requires further investigation',
    ],
    correctIndex: 3,
    explanation:
      'The repeated tripping is a symptom — a visible indication that something is wrong. The root cause could be mechanical overload, bearing failure, supply voltage imbalance, a winding fault, or even an incorrectly set relay. Without further investigation, simply resetting the overload treats only the symptom and allows the underlying failure to persist or worsen.',
  },
  {
    id: 'rca-failure-categories',
    question: 'Which of the following is a human-factor failure rather than a technical failure?',
    options: [
      'Insulation breakdown due to thermal ageing',
      'A loose terminal caused by insufficient torque during installation',
      'Bearing failure from lack of lubrication due to a blocked grease nipple',
      'Capacitor failure from overvoltage transients',
    ],
    correctIndex: 1,
    explanation:
      'A loose terminal resulting from insufficient torque during installation is a human-factor failure — it stems from the actions (or inactions) of the person carrying out the work. Technical failures relate to component degradation or design issues, whereas human-factor failures involve errors in workmanship, procedural non-compliance, or training deficiencies.',
  },
  {
    id: 'rca-latent-failures',
    question: 'What is a latent failure in the context of root cause analysis?',
    options: [
      'An obvious physical defect that is found during every routine inspection',
      'The immediate operator action that directly triggers a failure event',
      'A hidden deficiency in the system, process or organisation that remains undetected until conditions trigger a failure event',
      'A failure that occurs only after the equipment has exceeded its rated lifetime',
    ],
    correctIndex: 2,
    explanation:
      'Latent failures are dormant weaknesses — they may exist for weeks, months or years without causing any visible problem. They become active failures only when certain conditions align. Examples include an untested standby system, an out-of-date procedure, or a missing protective device. RCA aims to uncover these hidden deficiencies before they contribute to a failure event.',
  },
  {
    id: 'rca-investigation-start',
    question:
      'What is the recommended first step when beginning a root cause investigation after an equipment failure?',
    options: [
      'Immediately replace the failed component to restore supply as quickly as possible',
      'Clean and reset the equipment so it can be retested under normal conditions',
      'Identify who was responsible so disciplinary action can be considered',
      'Preserve the failure scene, collect factual evidence and document the as-found condition before disturbing anything',
    ],
    correctIndex: 3,
    explanation:
      'Preserving the failure scene is critical. Once equipment is disturbed, repaired or cleaned, valuable evidence is lost. The as-found condition — including the position of switches, state of indicators, condition of components, any unusual smells or discolouration — provides the raw data from which root causes can be determined. Photographs, measurements and witness statements should all be captured before any remedial action.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Root cause analysis is best described as:',
    options: [
      'A method for quickly repairing failed equipment',
      'A systematic process for identifying the fundamental reasons why a failure occurred',
      'A quality control check performed during manufacturing',
      'A financial assessment of equipment replacement costs',
    ],
    correctAnswer: 1,
    explanation:
      'Root cause analysis (RCA) is a systematic, structured investigation process designed to identify the fundamental underlying reasons — the root causes — of a failure event. It goes beyond addressing symptoms to prevent recurrence by tackling the true origin of the problem.',
  },
  {
    id: 2,
    question: 'Which statement best distinguishes a root cause from a contributing factor?',
    options: [
      'A root cause is always a technical fault, whereas a contributing factor is always human error',
      'A contributing factor is found first in an investigation; the root cause is whatever is found last',
      'A root cause is the fundamental reason the failure occurred; a contributing factor increases the likelihood or severity but would not cause the failure alone',
      'A root cause affects only one piece of equipment, while a contributing factor affects the whole site',
    ],
    correctAnswer: 2,
    explanation:
      'The root cause is the fundamental deficiency that, if corrected, would prevent recurrence of the failure. Contributing factors are conditions that influence the outcome but are not the primary cause. For example, poor lighting (contributing factor) may have made it harder to see a loose connection (root cause), but improving lighting alone would not prevent loose connections.',
  },
  {
    id: 3,
    question:
      'A circuit breaker fails to trip during a fault condition. Investigation reveals the trip mechanism was never tested after installation five years ago. The root cause is most likely:',
    options: [
      'A manufacturing defect in the trip mechanism present from the day it was installed',
      'Insulation degradation of the breaker contacts caused by normal ageing',
      'An operator deliberately defeating the trip mechanism to keep the supply on',
      'A failure in the preventive maintenance programme to include functional testing of protective devices',
    ],
    correctAnswer: 3,
    explanation:
      'The absence of periodic functional testing represents a systemic failure in the maintenance programme. While the mechanism itself may have degraded, the root cause is that the organisation failed to implement testing that would have identified and corrected the problem before a critical failure occurred.',
  },
  {
    id: 4,
    question:
      'Which type of failure is typically the hardest to identify through routine inspection?',
    options: [
      'Latent organisational failures such as inadequate procedures or training gaps',
      'Corrosion of exposed terminals and busbar connections',
      'Mechanical wear on contactors and switchgear moving parts',
      'Overheating of cable terminations under load',
    ],
    correctAnswer: 0,
    explanation:
      'Latent organisational failures — such as outdated procedures, training deficiencies, or missing maintenance tasks — are invisible during routine physical inspections. They require systematic analysis of management systems, documentation, and work practices to uncover. Physical defects like loose connections or corrosion can be identified visually or through testing.',
  },
  {
    id: 5,
    question:
      'When documenting the as-found condition of a failed piece of equipment, which of the following should be recorded?',
    options: [
      'Only the final fault that stopped the equipment working',
      'The complete condition including position of controls, state of indicators, environmental conditions, any unusual observations, and photographs',
      'Just the maintenance records and the date of the last service visit',
      'Only the components that were replaced during the repair',
    ],
    correctAnswer: 1,
    explanation:
      'Comprehensive documentation of the as-found condition is essential. This includes everything observable: control positions, indicator states, environmental conditions (temperature, humidity, dust), unusual smells or discolouration, and photographic evidence. Recording only selective information introduces bias and may cause important evidence to be overlooked.',
  },
  {
    id: 6,
    question:
      'In electrical maintenance, which category of failure accounts for the highest proportion of incidents according to HSE data?',
    options: [
      'Random component failures occurring within their rated lifetime',
      'Environmental factors such as moisture, dust and corrosive atmospheres',
      'Human factors including poor workmanship, procedural violations, and inadequate training',
      'Manufacturing defects in newly installed equipment',
    ],
    correctAnswer: 2,
    explanation:
      'HSE data consistently shows that human factors are the largest contributor to electrical maintenance incidents. Poor workmanship (e.g., loose connections, incorrect cable selection), procedural violations (e.g., working live without authorisation), and inadequate training are recurring themes in incident investigation reports.',
  },
  {
    id: 7,
    question:
      'A transformer overheats and fails. The oil was last sampled three years ago despite a requirement for annual sampling. Dissolved gas analysis would have shown developing insulation degradation. This scenario illustrates:',
    options: [
      'An inherent design fault in the transformer that made overheating inevitable',
      'A workmanship error made during the original installation of the transformer',
      'An unforeseeable sudden failure that no monitoring could have predicted',
      'A failure to implement condition-based monitoring that would have provided early warning of deterioration',
    ],
    correctAnswer: 3,
    explanation:
      'This is a classic example of a maintenance programme failure. The condition monitoring tool (dissolved gas analysis) existed and would have detected the developing fault, but the required sampling schedule was not followed. The root cause lies in the management system that failed to ensure compliance with the monitoring programme, not in the transformer itself.',
  },
  {
    id: 8,
    question:
      'Which of the following is an example of treating the symptom rather than the root cause?',
    options: [
      'Replacing a repeatedly blowing fuse with a higher-rated fuse',
      'Installing a more sensitive protective device after a fault analysis',
      'Carrying out insulation resistance testing to identify the fault location',
      'Investigating why a fuse keeps blowing and correcting the overcurrent condition',
    ],
    correctAnswer: 0,
    explanation:
      'Replacing a fuse with a higher-rated one does not address why the fuse is blowing — it merely masks the symptom and introduces a new hazard by removing the intended protection. The underlying overcurrent condition (perhaps an overloaded circuit, a developing short circuit, or an earth fault) remains uncorrected and will likely lead to a more serious failure.',
  },
  {
    id: 9,
    question: 'What role does timeline analysis play in root cause investigation?',
    options: [
      'It calculates the financial cost of the downtime caused by the failure',
      'It establishes the sequence of events leading up to the failure, helping to identify causal relationships',
      'It assigns responsibility for the failure to a specific individual or team',
      'It determines how long the repair will take to complete',
    ],
    correctAnswer: 1,
    explanation:
      'Timeline analysis reconstructs the chronological sequence of events, conditions and actions leading up to and during the failure. By mapping what happened and when, investigators can identify causal relationships, determine which changes or actions preceded the failure, and distinguish between root causes and coincidental events.',
  },
  {
    id: 10,
    question: 'Under the ST1426 standard, maintenance technicians are expected to:',
    options: [
      'Replace faulty components quickly and leave fault investigation to engineers',
      'Carry out repairs strictly to written instructions without diagnosing causes',
      'Apply systematic approaches to identify the root cause of faults and recommend improvements to prevent recurrence',
      'Focus solely on planned preventive maintenance and avoid reactive work',
    ],
    correctAnswer: 2,
    explanation:
      'The ST1426 Maintenance and Operations Engineering Technician standard requires technicians to apply systematic fault-finding and diagnostic techniques, including the ability to identify root causes and recommend corrective and preventive actions. This is a core competency, not an optional activity.',
  },
  {
    id: 11,
    question: "Which of the following best describes the 'Swiss cheese model' of failure?",
    options: [
      'A diagram ranking failures from most to least frequent to prioritise action',
      'A method of asking "why" five times in succession to reach the root cause',
      'A chart mapping every possible cause of a failure onto branches like a fish skeleton',
      'A model showing how multiple layers of defence each have weaknesses, and failures occur when weaknesses in all layers align simultaneously',
    ],
    correctAnswer: 3,
    explanation:
      'The Swiss cheese model (developed by James Reason) illustrates how accidents occur when holes (weaknesses) in multiple layers of defence align. Each layer — design, procedures, training, supervision, protective devices — has imperfections. A failure event occurs when a hazard pathway passes through aligned holes in all layers simultaneously. RCA aims to identify and close these holes.',
  },
  {
    id: 12,
    question:
      'Why is it important to identify multiple root causes rather than stopping at the first cause found?',
    options: [
      'Because most failures result from a combination of technical, human and organisational factors, and addressing only one may not prevent recurrence',
      'Because finding more causes makes the investigation report appear more thorough to managers',
      'Because every failure is legally required to have at least three documented causes',
      'Because the first cause found is usually a coincidence and can be safely ignored',
    ],
    correctAnswer: 0,
    explanation:
      'Complex failures rarely have a single root cause. They typically result from the interaction of technical deficiencies, human errors, and organisational weaknesses. Identifying and addressing all contributing root causes provides robust protection against recurrence. Stopping at the first cause found often means deeper systemic issues remain unaddressed.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a fault and a failure?',
    answer:
      'A fault is an abnormal condition or defect in a component, subsystem or system that may lead to a failure. A failure is the inability of the equipment to perform its intended function. For example, insulation degradation is a fault; the resulting short circuit that stops the motor running is the failure. Identifying faults before they become failures is the goal of condition-based maintenance.',
  },
  {
    question: 'How deep should a root cause investigation go?',
    answer:
      "The investigation should continue until you reach a cause that is within the organisation's control to correct and that, if corrected, would prevent recurrence. If the investigation stops at a purely technical cause (e.g., 'the bearing failed'), it has not gone deep enough — you need to ask why the bearing failed and whether the maintenance programme, operating conditions, or specification were adequate.",
  },
  {
    question: 'Who should carry out root cause analysis in a maintenance team?',
    answer:
      "Ideally, RCA should involve the maintenance technicians who work on the equipment daily, supported by engineering and management as needed. Technicians bring hands-on knowledge of the equipment's behaviour and history. For significant failures, a cross-functional team including operations, engineering, safety and maintenance provides the broadest perspective.",
  },
  {
    question: 'Is root cause analysis required by law?',
    answer:
      'While there is no specific legal requirement to carry out formal RCA, the Health and Safety at Work Act 1974 (Section 2) requires employers to ensure, so far as reasonably practicable, the health and safety of employees. Investigating failures to prevent recurrence is part of this duty. Additionally, the Management of Health and Safety at Work Regulations 1999 require risk assessments to be reviewed after incidents — which inherently involves understanding root causes.',
  },
  {
    question: 'How does root cause analysis relate to the ST1426 apprenticeship standard?',
    answer:
      'The ST1426 Maintenance and Operations Engineering Technician standard specifically requires technicians to use diagnostic and fault-finding techniques to identify root causes, apply continuous improvement principles, and recommend preventive measures. Demonstrating competence in RCA is assessed through the end-point assessment and is a key differentiator between a competent technician and a basic fitter.',
  },
  {
    question: 'Can there be more than one root cause for a single failure?',
    answer:
      'Yes, most significant failures have multiple root causes operating at different levels. There may be a technical root cause (e.g., incorrect component specification), a human root cause (e.g., the technician was not trained on the correct specification), and an organisational root cause (e.g., the training programme did not cover component specification). Effective RCA identifies all levels.',
  },
];

const MOETModule4Section6_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.6 · Subsection 1"
        title="Identifying Underlying Failures"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Techniques for identifying root causes rather than symptoms in electrical maintenance.
          </p>

          <TLDR
            points={[
              'RCA: Systematic process to find why failures occur, not just what failed',
              'Categories: Technical, human-factor, and organisational failures',
              'Approach: Preserve evidence, gather data, analyse systematically',
              'Goal: Prevent recurrence, not just repair the immediate fault',
            ]}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Symptoms vs causes:</strong> Tripping breakers, blown fuses, overheating
              </li>
              <li>
                <strong>Common root causes:</strong> Poor workmanship, inadequate maintenance,
                design deficiency
              </li>
              <li>
                <strong>Evidence:</strong> As-found condition, operational history, maintenance
                records
              </li>
              <li>
                <strong>ST1426:</strong> Maps to fault diagnosis and continuous improvement KSBs
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Distinguish between symptoms, contributing factors and root causes of equipment failures',
              'Categorise failures as technical, human-factor or organisational in origin',
              'Explain the concept of latent failures and the Swiss cheese model of accident causation',
              'Describe the systematic steps for beginning a root cause investigation',
              'Apply evidence preservation and as-found documentation techniques',
              'Reference ST1426 requirements for fault diagnosis and continuous improvement',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What is root cause analysis?</ContentEyebrow>

          <ConceptBlock
            title="What Is Root Cause Analysis?"
            onSite="The danger of symptom treatment: Treating symptoms without identifying root causes is one of the most common — and most dangerous — practices in electrical maintenance. Replacing a fuse with a higher-rated one, resetting a tripping breaker without investigation, or bypassing a faulty interlock to keep production running are all examples of symptom treatment that can lead to catastrophic consequences. Each of these actions masks the underlying fault and removes a layer of protection that exists for a reason."
          >
            <p>
              Root cause analysis (RCA) is a structured, systematic approach to investigating
              failures and incidents that seeks to identify the fundamental underlying reasons — the
              root causes — rather than simply addressing the visible symptoms. In electrical
              maintenance, this distinction is critical: replacing a blown fuse resolves the
              immediate symptom, but without understanding why the fuse blew, the underlying fault
              remains, and the failure will recur.
            </p>
            <p>
              The principle behind RCA is straightforward: every failure has a cause, every cause
              has a cause, and this causal chain can be traced back to one or more root causes that,
              if corrected, would prevent the failure from happening again. The challenge lies in
              following this chain systematically without jumping to conclusions, assigning blame
              prematurely, or stopping the investigation too early.
            </p>
            <p>
              For maintenance technicians working to the ST1426 standard, RCA is not an abstract
              management exercise — it is a practical, daily skill. When you diagnose a fault, you
              are already performing the initial stages of root cause analysis. The difference
              between a competent technician and an exceptional one lies in the depth of
              investigation: the competent technician finds and fixes the fault; the exceptional
              technician finds the fault, identifies why it occurred, and recommends actions to
              prevent it happening again.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Symptoms vs Root Causes — Electrical Examples"
            headers={['Symptom (What You See)', 'Possible Root Cause (Why It Happened)']}
            rows={[
              [
                'Motor overload trips repeatedly',
                'Bearing failure causing increased mechanical load; supply voltage imbalance causing overcurrent in one phase',
              ],
              [
                'Cable overheating at termination',
                'Insufficient torque on terminal screws during installation (human factor); incorrect cable size for the load (design deficiency)',
              ],
              [
                'RCD nuisance tripping',
                'Accumulated earth leakage from ageing equipment on the circuit; moisture ingress into a junction box',
              ],
              [
                'Transformer oil discolouration',
                'Internal winding insulation breakdown due to sustained overloading beyond design rating',
              ],
              [
                'Frequent lamp failures in a lighting circuit',
                'Supply overvoltage from an incorrectly set transformer tap; excessive vibration from nearby plant',
              ],
            ]}
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Categories of failure</ContentEyebrow>

          <ConceptBlock title="Categories of Failure">
            <p>
              Understanding the different categories of failure is essential for directing the
              investigation towards the right areas. Failures in electrical systems can be broadly
              categorised into three types: technical failures, human-factor failures, and
              organisational failures. In practice, most significant failures involve elements from
              all three categories, which is why a thorough investigation must consider all of them.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Technical failures">
            <p>
              Technical failures relate to the physical degradation, design limitations, or material
              defects of equipment and components. These are often the most visible and easily
              identified category, but they should not be treated as the final answer without
              investigating why the technical failure occurred.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Wear and degradation:</strong> Insulation ageing, contact erosion, bearing
                wear, corrosion of connections — all are natural deterioration processes that should
                be managed through planned maintenance
              </li>
              <li>
                <strong>Design deficiency:</strong> Under-rated components, inadequate cooling, poor
                accessibility for maintenance, insufficient protection coordination
              </li>
              <li>
                <strong>Material defect:</strong> Manufacturing faults in components, substandard
                materials, counterfeit products entering the supply chain
              </li>
              <li>
                <strong>Environmental factors:</strong> Excessive heat, moisture, dust, vibration,
                chemical exposure beyond the equipment&apos;s design envelope
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Human-factor failures">
            <p>
              Human-factor failures result from the actions, decisions, or omissions of people
              involved in the design, installation, operation, or maintenance of the equipment. HSE
              research consistently identifies human factors as the largest contributor to
              maintenance-related incidents in the electrical sector.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Errors of commission:</strong> Incorrect actions — wrong torque setting,
                incorrect cable termination method, connecting to the wrong terminal
              </li>
              <li>
                <strong>Errors of omission:</strong> Missed steps — failure to tighten a connection,
                forgetting to replace a cover, not recording a test result
              </li>
              <li>
                <strong>Violations:</strong> Deliberate deviation from procedures — bypassing an
                interlock, working live without authorisation, skipping a test step
              </li>
              <li>
                <strong>Competence gaps:</strong> Insufficient training, lack of experience with
                specific equipment types, unfamiliarity with updated standards
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Organisational failures"
            onSite='Key point: When you identify a technical failure, always ask "why did this technical failure occur?" — the answer often leads to a human-factor or organisational root cause that, if addressed, will prevent not just this failure but similar failures across the site.'
          >
            <p>
              Organisational failures are systemic weaknesses in management systems, policies, and
              culture that create the conditions in which technical and human-factor failures can
              occur. They are the deepest level of root cause and often the most difficult to
              identify — but also the most impactful to correct.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inadequate maintenance strategy:</strong> No planned preventive maintenance
                programme, reactive-only approach, insufficient budget allocation
              </li>
              <li>
                <strong>Poor procedures:</strong> Outdated work instructions, ambiguous method
                statements, no standard operating procedures for critical tasks
              </li>
              <li>
                <strong>Training deficiencies:</strong> No structured training programme, no
                competence assessment, reliance on informal knowledge transfer
              </li>
              <li>
                <strong>Communication failures:</strong> Poor shift handover, inadequate safety
                briefings, no feedback mechanism for reporting concerns
              </li>
              <li>
                <strong>Resource pressures:</strong> Understaffing, time pressure to complete work,
                cost-cutting on spares or tools
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Latent failures and the Swiss cheese model</ContentEyebrow>

          <ConceptBlock title="Latent Failures and the Swiss Cheese Model">
            <p>
              One of the most important concepts in root cause analysis is the distinction between
              active failures and latent failures. Active failures are the immediate, visible
              actions or events that directly cause the failure — a wrong connection, an overloaded
              circuit, a missed isolation step. Latent failures, by contrast, are hidden weaknesses
              that may exist for extended periods without causing any visible problem, only becoming
              apparent when they combine with other factors to produce a failure event.
            </p>
            <p>
              Professor James Reason&apos;s Swiss cheese model provides a powerful visual metaphor
              for understanding how failures occur in complex systems. Imagine multiple slices of
              Swiss cheese stacked together, where each slice represents a layer of defence — design
              standards, protective devices, maintenance procedures, training, supervision, and so
              on. Each slice has holes (weaknesses or gaps), but because the holes in different
              slices are in different positions, the layers of defence normally prevent a hazard
              from reaching the point where it causes harm. A failure event occurs when, by chance
              or design, the holes in all slices align simultaneously, allowing a hazard pathway
              through all layers of defence.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Layers of defence in electrical maintenance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Design layer:</strong> Equipment rated for the application, protection
                coordination, redundancy in critical systems
              </li>
              <li>
                <strong>Maintenance layer:</strong> Planned preventive maintenance, condition
                monitoring, periodic testing and inspection
              </li>
              <li>
                <strong>Procedural layer:</strong> Safe systems of work, permit to work systems,
                method statements and risk assessments
              </li>
              <li>
                <strong>Training layer:</strong> Competent persons, ongoing CPD, assessed skills and
                knowledge
              </li>
              <li>
                <strong>Supervision layer:</strong> Quality checks on completed work, independent
                verification of critical tasks
              </li>
              <li>
                <strong>Protective device layer:</strong> Circuit breakers, RCDs, fuses, interlocks,
                emergency stops — the last line of defence
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Example: how latent failures combine"
            onSite="Practical implication: The Swiss cheese model teaches us that investigating only the active failure (what the technician did wrong) misses the deeper systemic issues. Effective RCA peels back the layers to expose the latent failures — the incorrect circuit directory, the inadequate procedure, the training gap — because these are the failures that, if left uncorrected, will contribute to future incidents across the entire organisation, not just on this specific piece of equipment."
          >
            <p>
              Consider a scenario where a maintenance technician receives an electric shock from a
              distribution board that should have been isolated:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Latent failure 1 (Design):</strong> The distribution board circuit directory
                was never updated after a modification two years ago, so circuit identification is
                incorrect
              </li>
              <li>
                <strong>Latent failure 2 (Procedure):</strong> The site isolation procedure does not
                require verification of circuit identification against as-built drawings
              </li>
              <li>
                <strong>Latent failure 3 (Training):</strong> The technician was not trained to
                challenge circuit directory accuracy or to prove dead at the point of work
              </li>
              <li>
                <strong>Active failure:</strong> The technician isolated the wrong circuit based on
                the incorrect directory and began work without proving dead
              </li>
            </ul>
            <p>
              No single failure caused the incident — it was the alignment of all four that created
              the hazard pathway. Correcting any one of these failures would have broken the chain
              and prevented the incident.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Starting a root cause investigation</ContentEyebrow>

          <ConceptBlock title="Starting a Root Cause Investigation">
            <p>
              The quality of a root cause investigation is largely determined by what happens in the
              first minutes and hours after a failure is discovered. Evidence is perishable — once
              equipment is disturbed, repaired, or cleaned, valuable information is permanently
              lost. A disciplined approach to the initial response sets the foundation for a
              thorough and accurate investigation.
            </p>
            <ol className="list-decimal space-y-3 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Make safe and preserve the scene.</strong> The first priority is always
                safety — ensure the failed equipment is in a safe condition and that no one is at
                risk. However, beyond making safe, resist the urge to immediately start repairing or
                cleaning. The as-found condition of the equipment is your most valuable evidence.
                Photograph everything: the position of switches and controls, the condition of
                terminals and connections, any discolouration or damage, indicator readings, and the
                general environment (temperature gauges, humidity, dust accumulation). Record the
                date, time, and environmental conditions.
              </li>
              <li>
                <strong>Gather factual data.</strong> Collect all available factual information
                about the failure event and the equipment&apos;s history: maintenance records (when
                was the equipment last maintained, inspected, or tested?), operational history (any
                recent changes in load, operating hours, or process conditions?), modification
                history (has the equipment or connected systems been modified?), previous failures
                (has this equipment or similar equipment failed before?), witness statements (what
                did operators or other personnel observe before, during, and after the failure?),
                and SCADA/BMS data (historical trend data for voltage, current, temperature,
                vibration).
              </li>
              <li>
                <strong>Construct a timeline.</strong> Build a chronological timeline of events
                leading up to the failure. Start from a point well before the failure event —
                perhaps the last successful maintenance activity — and work forwards. Include
                maintenance activities, operational changes, environmental events (storms,
                temperature extremes), and any anomalies reported by operators. The timeline helps
                identify changes or events that may have triggered or contributed to the failure.
              </li>
              <li>
                <strong>Examine the failed component.</strong> Physical examination of the failed
                component provides direct evidence of the failure mechanism. For electrical
                components, look for signs of thermal damage (discolouration, melting, charring),
                mechanical damage (cracks, deformation, wear), electrical damage (arcing marks,
                pitting on contacts), and environmental damage (corrosion, moisture ingress,
                contamination). Where possible, retain the failed component for further analysis —
                destructive testing, metallurgical examination, or manufacturer investigation may be
                warranted for critical failures.
              </li>
              <li>
                <strong>Identify potential causes.</strong> Based on the evidence gathered, develop
                a list of potential causes. At this stage, be inclusive — do not eliminate
                possibilities prematurely. Consider technical causes (component failure modes),
                human-factor causes (installation errors, operating mistakes, maintenance
                omissions), and organisational causes (procedural gaps, training deficiencies,
                resource constraints). Use structured techniques such as the 5 Whys and fishbone
                diagrams (covered in subsequent sections) to organise and analyse these potential
                causes systematically.
              </li>
            </ol>
            <p className="italic">
              <strong className="not-italic">ST1426 link:</strong> The ability to gather evidence,
              analyse failure data, and construct a logical investigation is directly assessed under
              the diagnostic and fault-finding competencies of the maintenance technician standard.
              Your end-point assessment may include a scenario requiring you to demonstrate a
              systematic approach to failure investigation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Common failure patterns in electrical systems</ContentEyebrow>

          <ConceptBlock title="Common Failure Patterns in Electrical Systems">
            <p>
              Experience and industry data reveal recurring failure patterns in electrical systems.
              Recognising these patterns helps maintenance technicians direct their investigations
              more efficiently and identify root causes more quickly. While every failure is unique
              in its specific circumstances, the underlying mechanisms often fall into
              well-established categories.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Loose connections — the silent killer">
            <p>
              Loose electrical connections are one of the most common root causes of electrical
              fires and equipment failures. A connection that is not properly tightened creates
              increased resistance at the contact point. This increased resistance generates heat,
              which causes the conductor and terminal to expand and contract with load cycles,
              progressively loosening the connection further. The cycle of heating, expansion,
              contraction, and loosening is self-reinforcing and will eventually lead to arcing,
              insulation failure, and fire.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Root cause:</strong> Often poor workmanship during installation —
                insufficient torque, wrong size ferrule, aluminium conductor in a terminal designed
                for copper
              </li>
              <li>
                <strong>Detection:</strong> Thermal imaging during load, periodic re-torquing,
                visual inspection for discolouration
              </li>
              <li>
                <strong>Prevention:</strong> Torque-controlled tightening to manufacturer&apos;s
                specification, use of correct termination methods, periodic thermographic surveys
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Insulation degradation">
            <p>
              All electrical insulation degrades over time. The rate of degradation depends on the
              operating conditions — temperature is the primary factor, with the life of organic
              insulation approximately halving for every 10°C increase in operating temperature
              above its rated value. Moisture, chemical contamination, mechanical stress, and UV
              exposure also accelerate degradation.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Root cause:</strong> Sustained operation above design temperature (often due
                to overloading or poor ventilation), inadequate environmental protection, or age
              </li>
              <li>
                <strong>Detection:</strong> Insulation resistance testing (trending over time is
                more valuable than single readings), partial discharge monitoring for HV equipment,
                visual inspection for cracking or discolouration
              </li>
              <li>
                <strong>Prevention:</strong> Ensure equipment operates within design parameters,
                maintain adequate ventilation, schedule periodic insulation testing with trend
                analysis
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Protection coordination failures">
            <p>
              When protective devices are not properly coordinated (discrimination), a fault can
              trip the wrong device — perhaps a main breaker instead of a final circuit MCB —
              causing widespread loss of supply instead of isolating just the faulty circuit. This
              is a design-level root cause that may not become apparent until a fault occurs.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Root cause:</strong> Inadequate protection study at design stage,
                modifications that changed fault levels without updating the protection scheme,
                incorrect device settings
              </li>
              <li>
                <strong>Detection:</strong> Protection coordination study, functional testing of
                protective devices, analysis of fault event records
              </li>
              <li>
                <strong>Prevention:</strong> Comprehensive protection coordination study at design
                stage and after any modification, periodic verification of device settings
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Environmental failures">
            <p>
              Equipment installed in environments that exceed its IP rating or designed
              environmental envelope will fail prematurely. This is particularly common where
              equipment specifications are based on normal indoor conditions but the actual
              installation environment includes moisture, dust, corrosive atmospheres, or extreme
              temperatures.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Root cause:</strong> Incorrect equipment specification for the environment,
                changes to the environment after installation (e.g., new process introducing
                moisture or chemicals), deterioration of environmental seals
              </li>
              <li>
                <strong>Detection:</strong> Visual inspection for corrosion, moisture, or
                contamination; comparison of equipment IP rating to actual environmental conditions
              </li>
              <li>
                <strong>Prevention:</strong> Accurate environmental assessment at specification
                stage, periodic review of environmental conditions, maintenance of seals and gaskets
              </li>
            </ul>
            <p className="italic">
              <strong className="not-italic">Note:</strong> Recognising these common patterns is a
              valuable skill, but it must not lead to assumptions. Every investigation should follow
              the evidence, not the investigator&apos;s expectations. Even a pattern that looks
              familiar may have an unusual root cause in the specific circumstances.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'RCA investigation steps: make safe and preserve the scene; gather factual data and records; construct a timeline of events; examine the failed component; identify and analyse potential causes; determine root cause(s) and recommend actions.',
              'Failure categories: technical (component, design, material, environment); human factor (errors, omissions, violations, competence); organisational (procedures, training, resources, culture); latent (hidden weaknesses awaiting trigger conditions); active (immediate actions causing the failure event).',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section6')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Root cause analysis
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section6-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  The Five Whys Technique
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section6_1;
