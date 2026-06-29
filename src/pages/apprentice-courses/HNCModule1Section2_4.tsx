/**
 * Module 1 · Section 2 · Subsection 4 — Method Statements
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   Documenting the safe sequence of work — sequence, controls, competence, equipment,
 *   sign-off. Engineer-in-training perspective: how to write a method statement that an
 *   operative will actually use, not file under &ldquo;paperwork&rdquo;.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  ContentEyebrow,
  SectionRule,
  LearningOutcomes,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Method Statements - HNC Module 1 Section 2.4';
const DESCRIPTION =
  'Comprehensive guide to method statements in building services: purpose, content, task sequencing, control measures, emergency procedures, and practical examples for electrical installations.';

const quickCheckQuestions = [
  {
    id: 'method-purpose',
    question: 'What is the primary purpose of a method statement?',
    options: [
      'To list the materials and their costs for the job',
      'To record the qualifications held by each operative',
      'To set out the project programme and completion dates',
      'To document safe systems of work for specific tasks',
    ],
    correctIndex: 3,
    explanation:
      'A method statement documents the safe system of work for a specific task, detailing how work will be carried out safely, step by step, with identified hazards and control measures.',
  },
  {
    id: 'method-author',
    question: 'Who is typically responsible for preparing a method statement?',
    options: [
      'The contractor undertaking the work',
      'The building\'s end users or occupants',
      'The Health and Safety Executive inspector',
      'The client\'s insurance company',
    ],
    correctIndex: 0,
    explanation:
      'The contractor undertaking the work is responsible for preparing method statements. They have the technical knowledge of the tasks and must demonstrate competence to the principal contractor.',
  },
  {
    id: 'method-review',
    question: 'When should a method statement be reviewed?',
    options: [
      'Only once the work has been fully completed',
      'Only at the annual company safety audit',
      'Only if an enforcement notice is served',
      'Before work begins and when conditions change',
    ],
    correctIndex: 3,
    explanation:
      'Method statements must be reviewed before work begins and whenever conditions change, new hazards emerge, or the scope of work is altered. They are living documents that must remain current.',
  },
  {
    id: 'sequence-importance',
    question: 'Why is task sequencing important in method statements?',
    options: [
      'To reduce the overall cost of the materials used',
      'To ensure safe progression and identify dependencies',
      'To allow more workers to be assigned to the task',
      'To shorten the time the job takes to complete',
    ],
    correctIndex: 1,
    explanation:
      'Task sequencing ensures work progresses safely with proper dependencies identified. For example, isolation must occur before cable work, and testing must complete before energisation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does a method statement primarily document?',
    options: [
      'The cost of materials and labour',
      'The safe system of work for a specific task',
      'The qualifications of workers',
      "The client's project requirements",
    ],
    correctAnswer: 1,
    explanation:
      'A method statement documents the safe system of work for a specific task, providing step-by-step instructions on how the work will be carried out safely with appropriate control measures.',
  },
  {
    id: 2,
    question: 'Under CDM 2015, when must method statements be provided?',
    options: [
      'For domestic work only, never for commercial projects',
      'Only after an accident has already occurred on site',
      'For notifiable projects and when requested by the principal contractor',
      'Only for projects lasting longer than twelve months',
    ],
    correctAnswer: 2,
    explanation:
      'Under CDM 2015, method statements must be provided for notifiable projects and whenever requested by the principal contractor as part of demonstrating competence and safe working practices.',
  },
  {
    id: 3,
    question: 'What is the relationship between risk assessments and method statements?',
    options: [
      'They are two names for exactly the same document',
      'Method statements identify hazards; risk assessments describe the work steps',
      'A risk assessment is only needed if a method statement is unavailable',
      'Risk assessments identify hazards; method statements describe how to control them',
    ],
    correctAnswer: 3,
    explanation:
      'Risk assessments identify hazards and evaluate risks, while method statements describe the practical steps and control measures to safely carry out the work. They work together as complementary documents.',
  },
  {
    id: 4,
    question:
      'Which of the following should be included in a method statement for electrical isolation?',
    options: [
      'Lock-off procedures and verification testing',
      'The cost of replacement components',
      'The manufacturer\'s warranty details',
      'The expected lifespan of the equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Method statements for electrical isolation must include lock-off procedures (LOTO), verification testing using approved voltage indicators, permit-to-work requirements, and safe reinstatement procedures.',
  },
  {
    id: 5,
    question: "What does 'task breakdown' mean in a method statement?",
    options: [
      'Estimating the labour cost of each part of the job',
      'Dividing work into logical, sequential steps',
      'Listing the tools required for the whole project',
      'Splitting the work between different subcontractors',
    ],
    correctAnswer: 1,
    explanation:
      'Task breakdown means dividing the overall work into logical, sequential steps that can be clearly communicated, each with its own hazards, controls, and responsible persons identified.',
  },
  {
    id: 6,
    question: 'Who should sign off a method statement before work commences?',
    options: [
      'The client and their architect only',
      'The Health and Safety Executive',
      'The supervisor/manager and those undertaking the work',
      'The materials supplier and wholesaler',
    ],
    correctAnswer: 2,
    explanation:
      'Method statements should be signed by the supervisor/manager who prepared or approved it and by those undertaking the work to confirm they have read, understood, and will follow the documented procedures.',
  },
  {
    id: 7,
    question: 'What is the purpose of the emergency procedures section in a method statement?',
    options: [
      'To list the emergency contact numbers for material suppliers',
      'To record the warranty terms for installed equipment',
      'To set out the schedule for routine maintenance visits',
      'To ensure rapid, appropriate response to incidents',
    ],
    correctAnswer: 3,
    explanation:
      'The emergency procedures section ensures everyone knows how to respond rapidly and appropriately to incidents, including first aid arrangements, emergency contacts, evacuation procedures, and incident reporting.',
  },
  {
    id: 8,
    question: 'For cable installation in an occupied building, which control measure is essential?',
    options: [
      'Segregation, barriers, and dust control to protect occupants',
      'Working only at weekends regardless of the task',
      'Using the cheapest available cable to reduce waste',
      'Completing all paperwork before any survey is done',
    ],
    correctAnswer: 0,
    explanation:
      'When working in occupied buildings, segregation barriers, dust control (e.g., dust sheets, extraction), and appropriate signage are essential to protect occupants from hazards and minimise disruption.',
  },
  {
    id: 9,
    question:
      'What should happen if site conditions differ from those described in the method statement?',
    options: [
      'Continue working and note the difference for later',
      'Stop work, reassess, and update the method statement',
      'Ask the client whether it is acceptable to proceed',
      'Carry on, since the method statement is only a guide',
    ],
    correctAnswer: 1,
    explanation:
      'If conditions differ from those documented, work should stop, a reassessment conducted, and the method statement updated before proceeding. Working outside the documented safe system creates uncontrolled risks.',
  },
  {
    id: 10,
    question:
      'Which document typically accompanies a method statement when submitted to a principal contractor?',
    options: [
      'Company annual accounts',
      'Marketing brochures',
      'Risk assessment (RAMS)',
      'Employee payroll records',
    ],
    correctAnswer: 2,
    explanation:
      'Method statements are typically submitted alongside risk assessments as RAMS (Risk Assessment and Method Statement). Together they demonstrate the hazards identified and the controls that will be implemented.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a method statement and a risk assessment?',
    answer:
      "A risk assessment identifies hazards and evaluates the level of risk, while a method statement describes the practical steps to carry out work safely. The risk assessment asks 'what could go wrong?', while the method statement answers 'how will we do this safely?'. Together they form RAMS - Risk Assessment and Method Statement.",
  },
  {
    question: 'How detailed should a method statement be?',
    answer:
      "A method statement should be detailed enough that someone unfamiliar with the specific task could understand how to complete it safely. It should cover all significant steps, hazards, and controls without being so lengthy that workers won't read it. Use clear, simple language and bullet points for readability.",
  },
  {
    question: 'Do I need a method statement for every task?',
    answer:
      'Not every minor task requires a formal method statement, but all work with significant risk should have documented safe systems of work. Principal contractors typically require method statements for any work involving electrical systems, working at height, hot works, confined spaces, or activities affecting building occupants.',
  },
  {
    question: 'Can I use a generic method statement template?',
    answer:
      "Templates provide a useful starting point, but method statements must be site-specific. Generic statements that aren't tailored to actual site conditions, specific hazards, and the actual work being done are insufficient. Always adapt templates to reflect the real working environment and task requirements.",
  },
  {
    question: 'How long should method statements be retained?',
    answer:
      'Method statements should be retained for at least the duration of the project plus the limitation period for civil claims (typically 6 years, or 12 years for contracts under seal). Many organisations retain safety documentation for longer. Digital storage makes long-term retention practical.',
  },
  {
    question: 'Who needs to read and sign the method statement?',
    answer:
      'All workers involved in the task should read (or have read to them) and sign the method statement before work begins. This confirms understanding and acceptance of the safe system of work. Supervisors should also sign to confirm the statement is adequate and workers have been briefed.',
  },
];

const HNCModule1Section2_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../h-n-c-module1-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 1.2.4"
            title="Method Statements"
            description="Documenting safe systems of work for building services installations"
            tone="purple"
          />

          <TLDR
            points={[
              'You will write method statements that an operative can pick up cold and follow safely — sequence, equipment, competence, controls, sign-off.',
              'You pair every method statement with the supporting risk assessment (RAMS) and reject either if it cites the wrong revision of the other.',
              'You use the briefing record (signed acknowledgement) as the primary evidence of MHSWR Reg 13 (capabilities and training).',
              'You revise the MS when anything changes — never let an out-of-date statement remain in circulation.',
            ]}
          />

          <RegsCallout
            source="HASAWA 1974 — Section 2(2)(a)"
            clause="The provision and maintenance of plant and systems of work that are, so far as is reasonably practicable, safe and without risks to health."
            meaning={
              <>
                A method statement is the documented expression of a &ldquo;safe system of
                work&rdquo;. As an HNC engineer the legal hook for issuing one (and the
                consequence of not having one) traces straight to s.2(2)(a).
              </>
            }
            cite="Source: Health and Safety at Work etc. Act 1974, s.2(2)(a) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Understand the purpose and legal requirements for method statements",
              "Identify essential content and format requirements",
              "Break down complex tasks into logical sequences",
              "Define appropriate control measures and responsibilities",
              "Include effective emergency procedures",
              "Apply method statement principles to building services work",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>Purpose and Scope of Method Statements</ContentEyebrow>

          <ConceptBlock title="Purpose and Scope of Method Statements">
            <p>
            A method statement is a document that describes how a task or process will be carried
            out safely. It provides a step-by-step guide that identifies hazards and specifies the
            control measures needed to manage risks throughout the work activity.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">
            Key purposes of method statements:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Document the safe system of work for specific tasks</li>
            <li>Communicate procedures to all workers involved</li>
            <li>
            Demonstrate competence to principal contractors and clients
            </li>
            <li>Provide a reference document during work execution</li>
            <li>Support training and induction of personnel</li>
            <li>Create an audit trail for compliance verification</li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Legal Framework</p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>HASAWA 1974</strong> — Requirement: Duty to provide safe systems of work (Section 2)</li>
            <li><strong>MHSWR 1999</strong> — Requirement: Implement preventive and protective measures from risk assessments</li>
            <li><strong>CDM 2015</strong> — Requirement: Contractors must plan, manage, and monitor work safely</li>
            <li><strong>EAWR 1989</strong> — Requirement: Safe systems for electrical work, especially Regulation 14</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            RAMS - Risk Assessment and Method Statement
            </p>
            <p className="text-sm text-white">
            Method statements are typically combined with risk assessments to form RAMS. The
            risk assessment identifies <strong>what</strong> could go wrong, while the method
            statement describes <strong>how</strong>
            work will be done safely. Together they provide comprehensive documentation of
            hazard identification and control implementation.
            </p>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Remember:</strong> A method statement is not a substitute for proper training
            - it documents procedures for competent workers who have the skills to carry out the
            work safely.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Content and Format Requirements</ContentEyebrow>

          <ConceptBlock title="Content and Format Requirements">
            <p>
            An effective method statement follows a logical structure that covers all aspects of
            the work activity. While formats vary between organisations, certain elements are
            essential for comprehensive documentation.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Essential Content Elements
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Header Information</strong> — Content Required: Project name, location, date, revision number, author, approver</li>
            <li><strong>Scope of Work</strong> — Content Required: Clear description of what work is covered, boundaries, exclusions</li>
            <li><strong>Personnel</strong> — Content Required: Roles, responsibilities, competence requirements, supervision</li>
            <li><strong>Equipment/Materials</strong> — Content Required: Tools, PPE, materials, inspection requirements</li>
            <li><strong>Sequence of Operations</strong> — Content Required: Step-by-step work instructions in logical order</li>
            <li><strong>Hazards and Controls</strong> — Content Required: Identified risks and specific control measures for each</li>
            <li><strong>Emergency Procedures</strong> — Content Required: First aid, emergency contacts, evacuation, incident reporting</li>
            <li><strong>Sign-off</strong> — Content Required: Signatures confirming reading and understanding</li>
            </ul>
            
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Format Best Practice</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Use clear, simple language - avoid jargon</li>
            <li>Number steps sequentially</li>
            <li>Use bullet points for readability</li>
            <li>Include diagrams where helpful</li>
            <li>Keep to essential information</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Document Control</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Unique reference number</li>
            <li>Version/revision tracking</li>
            <li>Issue and review dates</li>
            <li>Approval signatures</li>
            <li>Distribution list if required</li>
            </ul>
            </div>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Tip:</strong> Method statements should be long enough to be comprehensive but
            short enough that workers will actually read them. Focus on the critical safety
            points.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Task Breakdown and Sequencing</ContentEyebrow>

          <ConceptBlock title="Task Breakdown and Sequencing">
            <p>
            Breaking work into logical steps is fundamental to effective method statements. Each
            step should be clearly defined, with associated hazards and controls identified. The
            sequence must reflect dependencies and ensure safe progression through the work.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Principles of Task Breakdown
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Preparation phase:</strong> Site access, permits, equipment checks,
            isolation
            </li>
            <li>
            <strong>Execution phase:</strong> Main work activities in logical sequence
            </li>
            <li>
            <strong>Completion phase:</strong> Testing, reinstatement, handover,
            demobilisation
            </li>
            <li>
            <strong>Dependencies:</strong> Identify tasks that must complete before others
            begin
            </li>
            <li>
            <strong>Hold points:</strong> Stages requiring inspection or approval before
            proceeding
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Example: Cable Installation Task Sequence
            </p>
            <div className="text-sm text-white space-y-2">
            <p>
            <strong>1. Preparation</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Obtain permit to work and confirm isolation</li>
            <li>Review drawings and verify cable route</li>
            <li>Inspect containment systems are complete</li>
            <li>Check cable drums, tools, and PPE</li>
            </ul>
            <p className="mt-3">
            <strong>2. Installation</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Position cable drums and pulling equipment</li>
            <li>Feed cable through containment sections</li>
            <li>Maintain bend radii per manufacturer specifications</li>
            <li>Apply fire stopping at compartment penetrations</li>
            <li>Label cables at both ends</li>
            </ul>
            <p className="mt-3">
            <strong>3. Completion</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Conduct insulation resistance tests</li>
            <li>Record test results</li>
            <li>Clear work area and remove waste</li>
            <li>Update as-built drawings</li>
            </ul>
            </div>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Common Dependencies in Electrical Work
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Isolation and lock-off</strong> — Before This Can Start: Any work on circuits</li>
            <li><strong>Containment installation</strong> — Before This Can Start: Cable pulling</li>
            <li><strong>Cable installation</strong> — Before This Can Start: Terminations</li>
            <li><strong>Dead testing</strong> — Before This Can Start: Energisation</li>
            <li><strong>Visual inspection</strong> — Before This Can Start: Live testing</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Key principle:</strong> Never allow work to proceed beyond a dependency point
            until the prerequisite task is verified complete. Use hold points for critical
            transitions.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Control Measures, Responsibilities and Emergency Procedures</ContentEyebrow>

          <ConceptBlock title="Control Measures, Responsibilities and Emergency Procedures">
            <p>
            Control measures translate the findings of risk assessments into practical actions.
            Each hazard identified must have corresponding controls specified in the method
            statement, following the hierarchy of controls.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hierarchy of Controls</p>
            <div className="space-y-2 text-sm">
            <div className="p-2 rounded bg-green-500/10 border-l-2 border-green-500">
            <strong>1. Elimination</strong> - Remove the hazard entirely (most effective)
            </div>
            <div className="p-2 rounded bg-blue-500/10 border-l-2 border-blue-500">
            <strong>2. Substitution</strong> - Replace with less hazardous alternative
            </div>
            <div className="p-2 rounded bg-purple-500/10 border-l-2 border-purple-500">
            <strong>3. Engineering</strong> - Physical barriers, isolation, interlocks
            </div>
            <div className="p-2 rounded bg-yellow-500/10 border-l-2 border-yellow-500">
            <strong>4. Administrative</strong> - Procedures, permits, training, signage
            </div>
            <div className="p-2 rounded bg-red-500/10 border-l-2 border-red-500">
            <strong>5. PPE</strong> - Personal protective equipment (least effective alone)
            </div>
            </div>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Typical Control Measures for Electrical Work
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Electric shock</strong> — Control Measures: Isolation, LOTO, proving dead, permit to work, insulated tools</li>
            <li><strong>Arc flash</strong> — Control Measures: De-energise where possible, arc-rated PPE, approach boundaries</li>
            <li><strong>Working at height</strong> — Control Measures: MEWP, scaffolding, edge protection, harness systems</li>
            <li><strong>Manual handling</strong> — Control Measures: Mechanical aids, team lifts, correct techniques, weight limits</li>
            <li><strong>Dust/debris</strong> — Control Measures: Local exhaust ventilation, dust sheets, RPE, wet cutting</li>
            </ul>
            
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Defining Responsibilities
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Site supervisor:</strong> Overall work coordination
            </li>
            <li>
            <strong>Authorised person:</strong> Isolation control
            </li>
            <li>
            <strong>Competent person:</strong> Task execution
            </li>
            <li>
            <strong>First aider:</strong> Emergency response
            </li>
            <li>
            <strong>All workers:</strong> Follow procedures, report issues
            </li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Emergency Procedures Must Include
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Emergency contact numbers</li>
            <li>Location of first aid facilities</li>
            <li>Evacuation routes and assembly points</li>
            <li>Electrical emergency isolation points</li>
            <li>Incident reporting procedures</li>
            </ul>
            </div>
            

            <CommonMistake
            title="Electrical Emergency Response"
            whatHappens={<><ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Electric shock:</strong> Isolate supply safely (do not touch victim until
            isolated), call 999, commence CPR if trained and required
            </li>
            <li>
            <strong>Electrical fire:</strong> Isolate supply if safe, evacuate area, use CO2
            extinguisher only if trained and safe to do so
            </li>
            <li>
            <strong>Arc flash:</strong> Do not approach until supply confirmed isolated, treat
            burns, call emergency services
            </li>
            </ul></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            <p className="text-sm text-elec-yellow/70">
            <strong>Critical:</strong> Emergency procedures must be communicated to all workers
            before work begins, not buried in documentation that may not be read under stress.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Building Services Method Statement Examples">
            <p><strong>Example 1: Electrical Isolation Method Statement</strong></p>
            <div className="text-sm text-white space-y-3">
            <p>
            <strong>Scope:</strong> Safe isolation of distribution board DB-L2-01 for circuit
            modifications
            </p>
            <div className="bg-black/30 p-3 rounded">
            <p className="font-medium mb-2">Sequence of Operations:</p>
            <ol className="list-decimal list-outside ml-5 space-y-1">
            <li>Obtain permit to work from authorised person</li>
            <li>Notify affected building users of planned isolation</li>
            <li>Identify correct circuit(s) from drawings and labelling</li>
            <li>Test voltage indicator on known live source (proving unit)</li>
            <li>Switch off and lock off isolator with personal padlock</li>
            <li>Attach danger tags with name, date, and contact details</li>
            <li>Prove dead at point of work using approved voltage indicator</li>
            <li>Re-test voltage indicator on known live source</li>
            <li>Apply temporary earths if required for the work</li>
            <li>Proceed with permitted work activities</li>
            </ol>
            <p className="mt-3 text-white">
            <strong>Key controls:</strong> LOTO procedure, proving dead sequence, permit
            system
            </p>
            </div>
            </div>
            

            
            <p><strong>Example 2: Cable Installation in Occupied Building</strong></p>
            <div className="text-sm text-white space-y-3">
            <p>
            <strong>Scope:</strong> Installation of 3-core SWA submain through office areas
            </p>
            <div className="bg-black/30 p-3 rounded">
            <p className="font-medium mb-2">Key Steps and Controls:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Access:</strong> Coordinate with building manager, work during
            low-occupancy periods
            </li>
            <li>
            <strong>Segregation:</strong> Erect barriers and signage around work areas
            </li>
            <li>
            <strong>Dust control:</strong> Use dust sheets, local extraction when core
            drilling
            </li>
            <li>
            <strong>Noise:</strong> Notify occupants, use low-noise tools where possible
            </li>
            <li>
            <strong>Cable handling:</strong> Use drum stands, winches; minimum 2-person
            team for heavy cables
            </li>
            <li>
            <strong>Fire stopping:</strong> Maintain compartmentation at all penetrations
            </li>
            <li>
            <strong>Testing:</strong> IR test before leaving each day to confirm no damage
            </li>
            <li>
            <strong>Housekeeping:</strong> Clear debris, secure cables, remove trip
            hazards at end of shift
            </li>
            </ul>
            </div>
            </div>
            

            
            <p><strong>Example 3: Commissioning Method Statement</strong></p>
            <div className="text-sm text-white space-y-3">
            <p>
            <strong>Scope:</strong> Commissioning of new lighting installation in retail unit
            </p>
            <div className="bg-black/30 p-3 rounded">
            <p className="font-medium mb-2">Commissioning Sequence:</p>
            <ol className="list-decimal list-outside ml-5 space-y-1">
            <li>
            Verify all dead testing complete and recorded (IR, continuity, polarity)
            </li>
            <li>Visual inspection confirming installation matches design</li>
            <li>Confirm area clear of personnel and tools before energisation</li>
            <li>Energise circuit via RCD-protected supply</li>
            <li>Verify correct operation of all luminaires</li>
            <li>Test switching and dimming controls</li>
            <li>Verify emergency lighting function (simulated mains failure)</li>
            <li>Measure Zs values and confirm within design limits</li>
            <li>RCD trip testing (within 40ms at I∆n)</li>
            <li>Complete commissioning records and handover documentation</li>
            </ol>
            <p className="mt-3 text-white">
            <strong>Hold point:</strong> Energisation requires supervisor authorisation
            after dead test verification
            </p>
            </div>
            </div>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <div>
            <p><strong>Writing Effective Method Statements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Visit the site before writing - understand actual conditions
            </li>
            <li>Involve workers who will do the job in the development</li>
            <li>
            Use active verbs: "isolate the supply" not "the supply should be isolated"
            </li>
            <li>
            Be specific about controls: "use 1100mm barriers" not "use barriers"
            </li>
            <li>Include photographs or diagrams for complex procedures</li>
            </ul>
            </div>

            <div>
            <p><strong>Common Mistakes to Avoid</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Generic statements:</strong> Not site-specific or task-specific
            </li>
            <li>
            <strong>Too lengthy:</strong> Workers won't read 20+ pages of text
            </li>
            <li>
            <strong>Missing sign-off:</strong> No evidence workers have read and understood
            </li>
            <li>
            <strong>Not updated:</strong> Conditions change but documents don't
            </li>
            <li>
            <strong>Vague controls:</strong> "Take appropriate precautions" is not a control
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Review and Update Triggers</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Site conditions differ from those documented</li>
            <li>Scope of work changes</li>
            <li>New hazards identified during work</li>
            <li>Near miss or incident occurs</li>
            <li>Regulatory or client requirements change</li>
            <li>Periodic review (typically annually for ongoing work)</li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Cable pull through a riser shaft serving an occupied building"
            situation={
              <>
                Your team must pull a 240 mm² four-core SWA up a 12-storey riser shaft to feed
                a new tenant&rsquo;s LV switchboard. The building is occupied, the shaft also
                carries fire-rated penetrations, and the existing services include lit life-safety
                cabling that must remain energised throughout.
              </>
            }
            whatToDo={
              <>
                Write the MS as a numbered sequence: pre-task brief, cable preparation, riser
                access permit, exclusion zones at each landing, lifting plan to LOLER 1998
                (cable winch, pulleys, rated fixings), communications protocol, fire-stopping
                reinstatement at each penetration to BS 476-20, post-pull continuity check, sign
                off. Reference the parent risk assessment, the lifting plan, the permit-to-work
                and the COSHH assessment for the cable lubricant. Brief and sign in every
                operative.
              </>
            }
            whyItMatters={
              <>
                Riser pulls combine work at height, manual handling, lifting, fire-stopping
                and live electrical risks. A vague MS lets each risk fall through the gap
                between trades. A specific MS catches them.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Method statement = documented safe sequence of work; risk assessment = identification and evaluation of hazards. Together they form RAMS.',
              'A good MS answers: who, what, where, when, how, and what if it goes wrong.',
              'MS sequence: pre-task brief → preparation → controlled execution → post-task checks → sign-off.',
              'Reference the parent RA, supporting permits, COSHH/LOLER documents and competence records — every MS sits inside a paper trail.',
              'Briefing records (signed by every operative) are the primary MHSWR Reg 13 evidence.',
              'Revisions: any change to scope, equipment, location, personnel or time triggers a re-issue and a re-brief.',
              'Generic MS templates are a starting point — site-specific detail is the duty of the duty-holder.',
              'A method statement nobody reads is worse than no method statement at all — write for the operative, not the lawyer.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../h-n-c-module1-section2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 2
              </div>
            </button>
            <button
              onClick={() => navigate('../h-n-c-module1-section2-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 2.5
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section2_4;
