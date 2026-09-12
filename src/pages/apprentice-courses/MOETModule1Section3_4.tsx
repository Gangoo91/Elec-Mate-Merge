/**
 * MOET · Module 1 · Section 1.3 · Subsection 4 — Writing and Following Method
 * Statements
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
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Safe systems of work."
 *              · "Documentation requirements: documentation control,
 *                 auditable records."
 *   Skills     · "Apply health, safety, and environmental procedures in
 *                 compliance with regulations, standards, and guidance."
 *   Behaviours · "Prioritise safe working practices."
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
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Writing and Following Method Statements - MOET Module 1 Section 3.4';
const DESCRIPTION =
  'Comprehensive guide to method statements for electrical maintenance technicians: RAMS structure, step-by-step task breakdown, hazard identification per step, CDM 2015 requirements, construction phase plans and a worked example for electrical panel changeover.';

const quickCheckQuestions = [
  {
    id: 'method-statement-purpose',
    question: 'What is the primary purpose of a method statement?',
    options: [
      'To describe step-by-step how a task will be done safely, with hazards and controls per step',
      'To replace the separate risk assessment so only one document is needed',
      'To certify, as a legal record, that the finished installation is compliant',
      'To record the cost and materials used once the job has been completed',
    ],
    correctIndex: 0,
    explanation:
      'A method statement describes the step-by-step sequence of work activities, identifying the hazards associated with each step and the control measures that will be applied. It is a practical, operational document that translates the findings of the risk assessment into a workable plan that the team can follow on site. It complements but does not replace the risk assessment.',
  },
  {
    id: 'rams-meaning',
    question: 'What does the acronym RAMS stand for?',
    options: [
      'Risk Avoidance and Mitigation Strategy',
      'Regulatory Assessment Management Standard',
      'Risk Assessment Method Statement',
      'Risk Analysis and Management System',
    ],
    correctIndex: 2,
    explanation:
      'RAMS stands for Risk Assessment Method Statement. It is a combined document (or pair of documents) that includes both the risk assessment (identifying hazards and evaluating risks) and the method statement (describing how the work will be carried out safely). RAMS are commonly required on construction sites and for maintenance work in commercial and industrial premises.',
  },
  {
    id: 'cdm-2015-link',
    question:
      'Under the Construction (Design and Management) Regulations 2015, method statements are most closely linked to which CDM document?',
    options: [
      'The pre-construction information pack',
      'The construction phase plan',
      'The health and safety file',
      'The F10 notification',
    ],
    correctIndex: 1,
    explanation:
      'The construction phase plan is the CDM document that sets out how health and safety will be managed during the construction phase. Method statements form part of the construction phase plan, providing the detailed work procedures for specific tasks. The principal contractor is responsible for ensuring the construction phase plan is in place and that method statements from all contractors are coordinated.',
  },
  {
    id: 'method-statement-review',
    question: 'When should a method statement be reviewed and updated?',
    options: [
      'Once a year as part of the company audit cycle, regardless of site conditions',
      'Never, because once signed off a method statement is fixed and must not be changed',
      'Only after an accident has occurred on site and an investigation is opened',
      'Whenever the work method, conditions or personnel change, or the method proves inadequate',
    ],
    correctIndex: 3,
    explanation:
      'Method statements are living documents that must be reviewed and updated whenever circumstances change — including changes in the work method, site conditions, personnel, equipment, or when an incident or near-miss reveals that the original method statement is inadequate. They should also be reviewed at the point of work to confirm they accurately describe the actual conditions encountered.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A method statement should be prepared:',
    options: [
      'After the work is completed, as a record of what was done',
      'Before the work begins, as part of the planning process',
      'Only when the client specifically requests one',
      "Only for work classified as 'high risk' under RIDDOR",
    ],
    correctAnswer: 1,
    explanation:
      'Method statements must be prepared before work begins, as part of the planning process. They are forward-looking documents that describe how the work will be carried out safely. Preparing them after the work defeats their purpose — they are intended to plan and control the work, not merely record it.',
  },
  {
    id: 2,
    question: 'The key elements of a method statement include:',
    options: [
      "The supervisor's name, the start date and a general note to work carefully",
      "The company directors, their contact details and the firm's insurance policy number",
      'Task description, step-by-step sequence, hazards and controls per step, responsible persons, emergency arrangements and resources',
      'The final test results and the schedule of test results recorded after completion',
    ],
    correctAnswer: 2,
    explanation:
      'A comprehensive method statement includes: a clear description of the task, the step-by-step sequence of work, the hazards associated with each step, the control measures for each hazard, the persons responsible, the resources required (tools, equipment, materials, PPE), and the emergency arrangements. It should be sufficiently detailed that a competent person can follow it safely.',
  },
  {
    id: 3,
    question:
      'The relationship between a risk assessment and a method statement is best described as:',
    options: [
      'They are two names for exactly the same document',
      'The method statement must always be written before the risk assessment',
      'The risk assessment replaces the method statement on low-risk jobs',
      'The risk assessment identifies hazards and evaluates risks; the method statement describes how the work will be done safely, incorporating the controls identified in the risk assessment',
    ],
    correctAnswer: 3,
    explanation:
      'The risk assessment and method statement are complementary documents. The risk assessment identifies hazards, evaluates the level of risk, and determines the control measures required. The method statement then describes the practical, step-by-step work procedure that incorporates those control measures. Together they form the RAMS — the safety planning framework for the task.',
  },
  {
    id: 4,
    question: 'When briefing a work team on a method statement, the person in charge should:',
    options: [
      'Walk through it step by step, explain hazards and controls, take questions and confirm understanding before signing',
      'Hand out copies for signature without any discussion, to keep the briefing brief and save time',
      'Brief only the most senior team member and rely on them to pass it on to the others',
      'Read out only the emergency arrangements and leave the team to read the work steps themselves',
    ],
    correctAnswer: 0,
    explanation:
      "An effective briefing involves walking through the method statement step by step, explaining the hazards at each stage, describing the control measures, inviting questions and checking understanding. Signatures should only be obtained after the briefing — they confirm that each person has been briefed and understood the content. Simply handing out copies without discussion is a 'tick-box' exercise that provides no real safety benefit.",
  },
  {
    id: 5,
    question:
      'Under CDM 2015, who is responsible for ensuring that method statements are in place for construction work?',
    options: [
      'The client alone, who must personally write every method statement',
      'The principal contractor for the construction phase plan, and each contractor for their own work methods',
      'The Health and Safety Executive, who issue them to each site',
      'The individual worker, who decides whether one is needed',
    ],
    correctAnswer: 1,
    explanation:
      'Under CDM 2015, the principal contractor is responsible for the construction phase plan, which must include or reference the method statements for all work on the project. Each contractor is responsible for preparing method statements for their own work and ensuring their workers follow them. The client has overarching duties to ensure suitable arrangements are in place but does not write method statements.',
  },
  {
    id: 6,
    question: 'A method statement for an electrical panel changeover should include:',
    options: [
      'Only the isolation step in detail, treating the rest of the job as routine work',
      'Only the testing and commissioning carried out at the very end of the changeover',
      'The complete sequence: preparation, isolation, changeover, testing, commissioning, reinstatement and handover',
      'A general note that the changeover must be carried out safely by competent persons',
    ],
    correctAnswer: 2,
    explanation:
      'A method statement for a panel changeover must cover the entire task from start to finish: site preparation, notification of affected parties, isolation and proving dead, disconnection of the old panel, installation of the new panel, connection and termination, testing and commissioning, labelling, reinstatement and handover. Each step should identify the associated hazards and the specific control measures to be applied.',
  },
  {
    id: 7,
    question: 'Emergency arrangements in a method statement should include:',
    options: [
      'The name and signature of the author, with emergency response left to site rules',
      'A generic statement to dial 999, applicable to any incident on any project',
      'The list of tools and PPE required, from which the team can infer the response',
      'First aid provision, task-specific emergency procedures, rescue arrangements and the incident-reporting process',
    ],
    correctAnswer: 3,
    explanation:
      'Emergency arrangements must be specific to the task and the hazards identified. For electrical work, this should include the location of the nearest first aid kit and first aider, the procedure for dealing with electric shock (including how to safely disconnect the casualty), rescue plans for confined spaces or working at height if applicable, the procedure for reporting incidents, and contact numbers for emergency services and the site safety manager.',
  },
  {
    id: 8,
    question: 'A method statement sign-off sheet records:',
    options: [
      'The names of everyone briefed, confirming they understand the hazards, controls and their responsibilities',
      'The quantities of materials delivered to site and the supplier delivery note references',
      'The test results obtained after the installation has been energised and commissioned',
      'The daily weather conditions recorded on site throughout the project programme',
    ],
    correctAnswer: 0,
    explanation:
      "The sign-off sheet provides documentary evidence that each member of the work team has been briefed on the method statement and confirms their understanding. It typically records the date of briefing, the briefer's name and signature, and each attendee's name and signature. This is important both for safety (ensuring everyone is informed) and for compliance (providing an audit trail).",
  },
  {
    id: 9,
    question:
      'If conditions on site differ from those described in the method statement, you should:',
    options: [
      'Continue with the original method to avoid delaying the programme',
      'Stop work, assess the changed conditions, and update the method statement (and risk assessment if necessary) before proceeding',
      'Improvise a new method on the spot without recording it',
      'Carry on but skip the steps that no longer seem to apply',
    ],
    correctAnswer: 1,
    explanation:
      'If conditions on site differ from those described in the method statement, work must stop. The method statement was written for specific conditions — if those conditions have changed, the planned controls may no longer be adequate. The changed conditions must be assessed, and the method statement (and risk assessment) updated to reflect reality before work can proceed. This is a fundamental principle of safe working.',
  },
  {
    id: 10,
    question: "A 'step-by-step task breakdown' in a method statement means:",
    options: [
      'A single paragraph summarising the whole job and its main hazards in general terms',
      'A list of every tool needed for the task, set out in the order they are picked up',
      'Dividing the task into sequential steps, each with its specific activity, hazards and controls',
      'A timeline showing the planned start and finish times for each phase of the work',
    ],
    correctAnswer: 2,
    explanation:
      'A step-by-step task breakdown divides the entire work activity into individual, sequential steps. Each step describes what will be done, identifies the hazards that exist during that specific step, and specifies the control measures to be applied. This level of detail ensures that hazards are not overlooked and that controls are appropriate to each phase of the work — not just a generic list applied to the whole task.',
  },
  {
    id: 11,
    question: 'The construction phase plan under CDM 2015 must be in place:',
    options: [
      'Before the end of the construction phase',
      'Only if there is a principal designer appointed',
      'Only if the project is notifiable (lasting more than 30 working days with more than 20 workers)',
      'Before the construction phase begins',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 12 of CDM 2015 requires the construction phase plan to be drawn up before the construction phase begins. For projects with only one contractor, the contractor prepares it. For projects with more than one contractor, the principal contractor prepares it. The plan must be proportionate to the complexity of the project and the risks involved. Method statements form part of this plan.',
  },
  {
    id: 12,
    question: 'Under ST1426, maintenance technicians should be able to:',
    options: [
      'Contribute to method statements for their work, follow them on site and flag when they need updating',
      'Delegate all safety planning to the site manager and simply carry out the instructions given',
      'Work without method statements on routine tasks, provided they are sufficiently experienced',
      'Sign off method statements as briefed without needing to read the individual work steps',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 expects maintenance technicians to contribute to the preparation of RAMS for their work activities, drawing on their technical knowledge and practical experience. They must also follow method statements on site, identify when conditions differ from what was planned, and flag when updates are needed. This combination of planning, executing and reviewing is part of the continuous improvement behaviour assessed in the end-point assessment.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a method statement and a risk assessment?',
    answer:
      "A risk assessment identifies hazards, evaluates the level of risk (likelihood x severity), and determines what control measures are needed. A method statement describes the step-by-step work procedure, incorporating those control measures into the practical sequence of work. Think of the risk assessment as 'what could go wrong and how do we prevent it' and the method statement as 'here is how we will do the work safely'. Together they form the RAMS — the complete safety planning package.",
  },
  {
    question: 'Do I need a method statement for every electrical maintenance task?',
    answer:
      "Not necessarily — the need for a method statement depends on the complexity and risk level of the task. Simple, routine tasks covered by a generic safe system of work (such as replacing a light fitting on a confirmed dead circuit) may not require an individual method statement. However, complex, non-routine or high-risk tasks — such as a panel changeover, HV switching, or work in a confined space — should always have a task-specific method statement. Your employer's procedures will define the threshold.",
  },
  {
    question: 'Who should write the method statement?',
    answer:
      'Method statements should be written or significantly contributed to by someone with direct, practical knowledge of the work being described. For electrical maintenance, this means an electrically competent person — ideally the supervisor or lead technician who will oversee the work. They understand the practical realities, the sequence of operations, and the specific hazards involved. Method statements written by people who do not understand the work tend to be generic and ineffective.',
  },
  {
    question: 'How detailed should a method statement be?',
    answer:
      'Detailed enough that a competent person could follow it safely, but not so detailed that it becomes unreadable. The level of detail should be proportionate to the complexity and risk of the task. A simple task might have 6-8 steps; a complex panel changeover might have 20 or more. Each step should identify the activity, the hazards, and the controls. If you find a step has multiple significant hazards, consider breaking it into smaller sub-steps.',
  },
  {
    question: 'What happens if I discover a hazard on site that is not in the method statement?',
    answer:
      'Stop work immediately and assess the situation. If the hazard can be safely controlled by adding a control measure that is consistent with the overall safe system of work, update the method statement, brief the team, and proceed. If the hazard significantly changes the risk profile of the task — for example, discovering live conductors where the method statement assumes a dead circuit — stop work, withdraw from the area if necessary, and do not proceed until the method statement and risk assessment have been formally reviewed and updated.',
  },
];

const MOETModule1Section3_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.3 · Subsection 4"
        title="Writing and Following Method Statements"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Planning safe work through structured, step-by-step procedures.
          </p>

          <TLDR
            points={[
              'RAMS: Risk Assessment Method Statement — the combined safety plan.',
              'Structure: step-by-step with hazards and controls per step.',
              'Briefing: walk through before work; sign-off confirms understanding.',
              'Review: update when conditions change, not just once and file.',
              'CDM 2015: method statements form part of the construction phase plan.',
              'Isolation: each step of the safe isolation procedure should be a separate step.',
              'Testing: commissioning and testing steps need their own hazard analysis.',
              'ST1426: contribute to RAMS preparation and follow them on site.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the purpose and structure of a method statement',
              'Describe the relationship between risk assessments and method statements (RAMS)',
              'Break down a task into sequential steps with hazards and controls for each',
              'Understand CDM 2015 requirements for construction phase plans and method statements',
              'Apply method statement briefing and sign-off procedures',
              'Review and update method statements when conditions change',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What is a method statement and why does it matter?</ContentEyebrow>

          <ConceptBlock title="A safe work plan, not a record">
            <p>
              A method statement is a document that describes how a specific task or activity will
              be carried out safely. It provides a step-by-step sequence of work, identifying the
              hazards at each stage and the control measures that will be applied to manage them.
              Think of it as a safe work plan — it translates the findings of the risk assessment
              into a practical, actionable procedure that the work team can follow on site.
            </p>
            <p>
              Method statements are not just paperwork — they are planning tools. The process of
              writing a method statement forces you to think through the work in detail before you
              start. This thinking process often reveals hazards, conflicts and logistical problems
              that would not be apparent until work was under way. By identifying these issues in
              advance, you can plan appropriate controls and avoid reactive, improvised responses to
              problems on site.
            </p>
          </ConceptBlock>

          <ConceptBlock title="RAMS — the combined approach">
            <p>
              In practice, the risk assessment and method statement are often prepared together as a
              combined document known as a RAMS (Risk Assessment Method Statement). This ensures
              that the risk assessment directly informs the method of work and that the controls
              identified in the assessment are embedded in the work procedure. A RAMS package
              typically includes:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Risk assessment:</strong> Hazard identification, risk evaluation (using a
                risk matrix), existing and additional controls
              </li>
              <li>
                <strong>Method statement:</strong> Step-by-step work procedure incorporating all
                control measures
              </li>
              <li>
                <strong>Supporting documents:</strong> COSHH assessments, permit to work
                requirements, equipment inspection records, training records, site-specific
                information
              </li>
              <li>
                <strong>Sign-off sheet:</strong> Record of personnel who have been briefed on the
                RAMS
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="When is a method statement required?">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Construction work under CDM 2015:</strong> The construction phase plan must
                include or reference method statements for all significant work activities
              </li>
              <li>
                <strong>Complex or non-routine maintenance:</strong> Panel changeovers, switchgear
                upgrades, cable installations, major fault repairs
              </li>
              <li>
                <strong>High-risk activities:</strong> Work involving live electrical systems,
                confined spaces, working at height, hot work
              </li>
              <li>
                <strong>Client or principal contractor requirements:</strong> Many clients and main
                contractors require RAMS for all work on their sites
              </li>
              <li>
                <strong>Multi-trade coordination:</strong> When electrical work interfaces with
                other trades and the sequence must be planned
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A method statement is only useful if it is specific to the
              actual task and conditions. Generic method statements that are copied from job to job
              without being tailored to the specific site, equipment and personnel are dangerous —
              they create a false sense of security while failing to address the real hazards.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Structure and content of a method statement</ContentEyebrow>

          <ConceptBlock title="No prescribed format, but a common structure">
            <p>
              Although there is no legally prescribed format for a method statement, effective
              documents share a common structure. The following sections should be included to
              ensure the method statement is comprehensive and usable.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Header information">
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Document reference number and revision number</li>
              <li>Project/site name and address</li>
              <li>Client and principal contractor names</li>
              <li>Description of the task</li>
              <li>Prepared by (name, qualification, date)</li>
              <li>Approved by (name, date)</li>
              <li>Associated risk assessment reference number</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Scope and description">
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Clear description of the work to be carried out</li>
              <li>Location (building, floor, room, equipment designation)</li>
              <li>Start and anticipated completion dates/times</li>
              <li>Working hours and any restrictions</li>
              <li>Interfaces with other work activities</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Resources required">
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Personnel — number, roles, competence requirements</li>
              <li>Tools and equipment (including test equipment, voltage indicators)</li>
              <li>Materials and components</li>
              <li>PPE required for each stage</li>
              <li>Access equipment (scaffolding, MEWP, ladders)</li>
              <li>Welfare facilities</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Step-by-step work procedure — the core of the document">
            <p>
              This is the most important section. Each step should be presented in a table format:
            </p>
            <div className="overflow-x-auto">
              <table className="mt-2 w-full border-collapse text-left text-xs text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-2 py-1.5 text-left">Step</th>
                    <th className="border border-white/10 px-2 py-1.5 text-left">Activity</th>
                    <th className="border border-white/10 px-2 py-1.5 text-left">Hazards</th>
                    <th className="border border-white/10 px-2 py-1.5 text-left">Controls</th>
                    <th className="border border-white/10 px-2 py-1.5 text-left">Responsible</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-2 py-1.5">1</td>
                    <td className="border border-white/10 px-2 py-1.5">What is done</td>
                    <td className="border border-white/10 px-2 py-1.5">What could go wrong</td>
                    <td className="border border-white/10 px-2 py-1.5">How we prevent it</td>
                    <td className="border border-white/10 px-2 py-1.5">Who does it</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-2 py-1.5">2</td>
                    <td className="border border-white/10 px-2 py-1.5">...</td>
                    <td className="border border-white/10 px-2 py-1.5">...</td>
                    <td className="border border-white/10 px-2 py-1.5">...</td>
                    <td className="border border-white/10 px-2 py-1.5">...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Emergency arrangements">
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>First aid provision and nearest first aider location</li>
              <li>Electric shock emergency procedure (disconnect, CPR, call 999)</li>
              <li>Fire procedure and nearest extinguisher location</li>
              <li>Rescue plan for working at height or confined spaces</li>
              <li>Incident reporting procedure and contact numbers</li>
              <li>Nearest hospital with A&amp;E department</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Worked example — electrical panel changeover</ContentEyebrow>

          <ConceptBlock title="A non-routine, medium-to-high risk task">
            <p>
              To illustrate how a method statement works in practice, the following is an abridged
              example for a common electrical maintenance task: replacing a three-phase distribution
              board in a commercial building. This is a non-routine, medium-to-high risk task that
              requires detailed planning.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Example method statement — DB changeover (abridged)">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="w-10 border border-white/10 px-2 py-1.5 text-left">Step</th>
                    <th className="border border-white/10 px-2 py-1.5 text-left">Activity</th>
                    <th className="border border-white/10 px-2 py-1.5 text-left">Key hazards</th>
                    <th className="border border-white/10 px-2 py-1.5 text-left">
                      Control measures
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-2 py-1.5 font-bold">1</td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Site preparation — set up work area, install barriers
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Trips, public access, manual handling
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Barriers and signage; housekeeping; mechanical aids for heavy items
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-2 py-1.5 font-bold">2</td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Notify affected building occupants of planned shutdown
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Disruption, emergency lighting failure
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Written notification 48 hrs in advance; confirm emergency lighting
                      operational; temporary supplies where needed
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-2 py-1.5 font-bold">3</td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Isolate supply at upstream MCCB — safe isolation procedure
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Electric shock, arc flash
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Identify correct isolator from drawings; open MCCB; lock off with unique
                      padlock; prove dead with GS38 voltage indicator (tested before and after)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-2 py-1.5 font-bold">4</td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Disconnect outgoing circuits from old board
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Stored energy (capacitors), manual handling of cables
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Allow capacitors to discharge; label all circuits before disconnection;
                      support heavy cables; use correct tools
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-2 py-1.5 font-bold">5</td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Disconnect incoming supply cables from old board
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Heavy cables, sharp edges, possible back-feed
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Prove dead at incoming terminals; support cables; gloves for sharp edges;
                      two-person lift if needed
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-2 py-1.5 font-bold">6</td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Remove old board from wall
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Manual handling, falling objects, dust
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Two-person lift minimum; hard hats; dust mask if drilling; safe disposal of
                      old board
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-2 py-1.5 font-bold">7</td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Install new board and connect incoming supply
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Manual handling, drilling (noise, dust), cable damage
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Check cable avoidance before drilling; hearing protection; torque connections
                      to manufacturer spec
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-2 py-1.5 font-bold">8</td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Connect outgoing circuits to new board
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Incorrect termination, loose connections
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Match labelling to circuit schedule; torque all connections; visual inspection
                      before energising
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-2 py-1.5 font-bold">9</td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Testing and commissioning (dead tests first)
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Incorrect readings leading to unsafe energisation
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Insulation resistance, continuity and polarity tests before energising; record
                      results on schedule of test results
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-2 py-1.5 font-bold">10</td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Re-energise — remove lock, close MCCB
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Arc flash on energisation, fault on new board
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      All personnel clear of board; close MCCB from side position; arc flash PPE
                      worn during switching; confirm all outgoing MCBs off before main energisation
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-2 py-1.5 font-bold">11</td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Live tests — RCD trip times, voltage checks, phase rotation
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Electric shock, incorrect test procedure
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      GS38 compliant test equipment; competent person only; record all results
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-2 py-1.5 font-bold">12</td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Labelling, reinstatement and handover
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Incomplete labelling leading to future hazards
                    </td>
                    <td className="border border-white/10 px-2 py-1.5">
                      Label all circuits; update circuit chart; remove barriers; clean work area;
                      hand over to client with test certificates
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> This is an abridged example for educational purposes. A real
              method statement would include additional detail on specific tools, named responsible
              persons, detailed emergency procedures, and supporting documentation references. The
              level of detail should be proportionate to the complexity and risk of the task.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>CDM 2015 and the construction phase plan</ContentEyebrow>

          <ConceptBlock title="A key part of the safety management framework">
            <p>
              The Construction (Design and Management) Regulations 2015 (CDM 2015) apply to all
              construction work in Great Britain, including electrical installation and maintenance
              work on construction sites. Method statements form a key part of the safety management
              framework under CDM 2015.
            </p>
          </ConceptBlock>

          <ConceptBlock title="CDM 2015 duty holders">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Duty holder</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Method statement responsibility
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Client</td>
                    <td className="border border-white/10 px-3 py-2">
                      Ensure suitable arrangements for managing health and safety, including
                      provision of pre-construction information that informs method statements
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Principal designer
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Identify, eliminate and reduce design risks; provide information to
                      contractors to help them prepare effective method statements
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Principal contractor
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Prepare the construction phase plan; ensure method statements from all
                      contractors are adequate and coordinated; manage site-wide safety
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Contractor (your employer)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Prepare task-specific method statements for your work; ensure workers are
                      briefed; follow the method statements on site; update when conditions change
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Worker (you)</td>
                    <td className="border border-white/10 px-3 py-2">
                      Follow the method statement; report hazards not covered; cooperate with the
                      safety management system; attend briefings
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="The construction phase plan">
            <p>
              The construction phase plan (CPP) is the overarching document that sets out how health
              and safety will be managed during the construction phase. It must be prepared before
              construction work begins (Regulation 12). The CPP includes or references:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>A description of the project and the management structure</li>
              <li>Site rules and arrangements for welfare, first aid and emergency procedures</li>
              <li>
                Risk assessments and method statements (RAMS) for all significant work activities
              </li>
              <li>Arrangements for coordination between contractors</li>
              <li>Monitoring and review arrangements</li>
            </ul>
            <p>
              As an electrical maintenance technician working on a construction project, your method
              statements will form part of the principal contractor&apos;s construction phase plan.
              You must submit them in advance, usually as part of your RAMS package, and they must
              be accepted before work begins.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Does CDM 2015 apply to maintenance work?">
            <p>
              CDM 2015 applies to all &quot;construction work&quot;, which is defined broadly and
              includes installation, repair, maintenance and dismantling of electrical systems.
              However, the regulations apply proportionately — a simple like-for-like replacement of
              a socket outlet does not require the same level of documentation as a major rewire.
              The duty to plan, manage and monitor work safely applies regardless of project size,
              but the level of documentation should be proportionate to the complexity and risk.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Briefing, sign-off and ongoing review</ContentEyebrow>

          <ConceptBlock title="The critical link between the document and the work">
            <p>
              A method statement is only effective if the people doing the work understand it,
              follow it, and update it when conditions change. The briefing and sign-off process is
              the critical link between the document and the work — it ensures that the planned
              controls are actually communicated and understood by the work team.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Conducting an effective briefing">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Location:</strong> At or near the work area, so the team can see the
                conditions being described
              </li>
              <li>
                <strong>Timing:</strong> Before work begins — ideally on the same day, so conditions
                are current
              </li>
              <li>
                <strong>Content:</strong> Walk through each step of the method statement, explaining
                the activity, hazards and controls. Point out physical features on site that relate
                to the method statement
              </li>
              <li>
                <strong>Interaction:</strong> Encourage questions and concerns. Workers at the point
                of work often identify issues that the person writing the method statement has
                missed
              </li>
              <li>
                <strong>Confirmation:</strong> Check understanding — ask team members to describe
                key controls in their own words, not just nod
              </li>
              <li>
                <strong>Sign-off:</strong> Each person signs the sign-off sheet, confirming they
                have been briefed and understood the content
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="The 'sign and go' problem"
            whatHappens={
              <>
                One of the most common failures in method statement management is the &quot;sign and
                go&quot; approach — where workers are handed a document, asked to sign it, and sent
                to work without any meaningful briefing or discussion. This creates a paper trail
                without providing any real safety benefit.
              </>
            }
            doInstead={
              <>
                If you are ever asked to sign a method statement without being properly briefed, ask
                for a briefing. Your signature should confirm that you have been briefed and
                understood the content — not merely that you have seen the document.
              </>
            }
          />

          <ConceptBlock title="When to update the method statement">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Conditions on site differ from those described in the method statement</li>
              <li>
                A new hazard is discovered that was not anticipated (e.g., asbestos, unknown live
                cables)
              </li>
              <li>The planned work method proves impractical and needs to be changed</li>
              <li>
                Personnel change — a new team member needs to be briefed, or a change in competence
                levels
              </li>
              <li>An incident or near-miss occurs during the work</li>
              <li>The work scope changes — additional tasks or changed sequence</li>
              <li>Equipment or materials are different from what was planned</li>
            </ul>
            <p>
              Updates should be documented — mark the original method statement as revised, note the
              changes, re-brief the team, and obtain fresh signatures on the sign-off sheet for the
              revised version.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to
              follow safe systems of work (including method statements) and to identify when they
              need updating. You are expected to take personal responsibility for working safely,
              which includes reading and understanding the method statement before starting work,
              following it during the task, and reporting when it no longer reflects the actual
              conditions. This is assessed in the end-point assessment practical observation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A method statement is only useful if it is specific to the actual task and conditions. Generic method statements that are copied from job to job without being tailored to the specific site, equipment and personnel are dangerous.',
              'The step-by-step work procedure is the most important section of a method statement.',
              'This is an abridged example for educational purposes. A real method statement would include additional detail on specific tools, named responsible persons, detailed emergency procedures, and supporting documentation references — proportionate to the complexity and risk of the task.',
              'The duty to plan, manage and monitor work safely applies regardless of project size, but the level of documentation should be proportionate to the complexity and risk.',
              'The maintenance technician standard requires you to follow safe systems of work (including method statements) and to identify when they need updating.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Method statements knowledge check" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section3-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Hierarchy of Controls
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section3-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Dynamic Risk Assessments
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section3_4;
