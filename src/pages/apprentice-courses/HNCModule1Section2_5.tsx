/**
 * Module 1 · Section 2 · Subsection 5 — Safe Systems of Work
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   The formal procedural framework that turns risk assessments into operational behaviour.
 *   Engineer-in-training perspective: how an HNC supervisor establishes, audits and
 *   continually improves the SSOW culture across a building services workforce.
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

const TITLE = 'Safe Systems of Work - HNC Module 1 Section 2.5';
const DESCRIPTION =
  'Comprehensive guide to developing, implementing and maintaining safe systems of work in building services engineering, including safe isolation procedures and permit-to-work systems.';

const quickCheckQuestions = [
  {
    id: 'ssow-definition',
    question: 'What is the primary purpose of a safe system of work?',
    options: [
      'To speed up work activities',
      'To identify hazards and implement controls to prevent harm',
      'To satisfy insurance requirements',
      'To reduce the number of workers needed',
    ],
    correctIndex: 1,
    explanation:
      'A safe system of work (SSOW) is a formal procedure resulting from systematic examination of a task to identify all the hazards and implement controls to eliminate or minimise the risk of harm.',
  },
  {
    id: 'hierarchy-controls',
    question:
      'According to the hierarchy of controls, what should be considered first when managing risks?',
    options: [
      'Personal protective equipment',
      'Administrative controls',
      'Elimination of the hazard',
      'Engineering controls',
    ],
    correctIndex: 2,
    explanation:
      'The hierarchy of controls prioritises elimination first, followed by substitution, engineering controls, administrative controls, and finally PPE as the last resort.',
  },
  {
    id: 'permit-work',
    question: 'When is a permit-to-work system typically required?',
    options: [
      'For all routine maintenance tasks',
      'For high-risk activities like live working or confined space entry',
      'Only when working in office environments',
      'Whenever more than two people are working together',
    ],
    correctIndex: 1,
    explanation:
      'Permit-to-work systems are formal documented procedures required for high-risk activities including live electrical work, confined space entry, hot work, and work at height.',
  },
  {
    id: 'safe-isolation',
    question: 'What is the correct sequence for safe isolation of electrical supplies?',
    options: [
      'Isolate - Lock off - Test - Post warning notices',
      'Test - Isolate - Lock off - Post warning notices',
      'Identify - Isolate - Lock off - Prove dead - Post warning notices',
      'Post warning notices - Isolate - Test',
    ],
    correctIndex: 2,
    explanation:
      'The correct safe isolation procedure is: Identify the circuit, Isolate at the point of supply, Lock off with personal lock, Prove dead using approved voltage indicator (tested before and after), then Post warning notices.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Under which legislation are employers required to provide safe systems of work?',
    options: [
      'The Electricity at Work Regulations 1989 only',
      'The Health and Safety at Work etc. Act 1974',
      'The Building Regulations 2010',
      'BS 7671 Requirements for Electrical Installations',
    ],
    correctAnswer: 1,
    explanation:
      'The Health and Safety at Work etc. Act 1974 Section 2 requires employers to provide and maintain safe systems of work so far as is reasonably practicable. This is supported by specific regulations like MHSWR 1999.',
  },
  {
    id: 2,
    question: 'What does the acronym SSOW stand for?',
    options: [
      'Safe Standard Operating Work',
      'Safety Systems of Work',
      'Safe System of Work',
      'Systematic Safety Operating Workflow',
    ],
    correctAnswer: 2,
    explanation:
      'SSOW stands for Safe System of Work - a formal procedure resulting from systematic examination of a task to identify hazards and implement control measures.',
  },
  {
    id: 3,
    question: 'Which of the following is NOT typically part of developing a safe system of work?',
    options: [
      'Task analysis and hazard identification',
      'Risk assessment and control selection',
      'Setting productivity targets',
      'Communication and training requirements',
    ],
    correctAnswer: 2,
    explanation:
      'Setting productivity targets is not part of developing a SSOW. The focus is on task analysis, hazard identification, risk assessment, selecting controls, and ensuring effective communication and training.',
  },
  {
    id: 4,
    question: 'In the hierarchy of controls, where does PPE (Personal Protective Equipment) sit?',
    options: [
      'First priority - always use PPE',
      'Second priority after elimination',
      'Equal priority with engineering controls',
      'Last resort when other controls are not reasonably practicable',
    ],
    correctAnswer: 3,
    explanation:
      'PPE is the last resort in the hierarchy of controls. More effective measures (elimination, substitution, engineering controls, administrative controls) should be considered first as PPE only protects the individual wearer.',
  },
  {
    id: 5,
    question: 'What is the main purpose of a permit-to-work system?',
    options: [
      'To satisfy regulatory paperwork requirements',
      'To record time spent on tasks',
      'To provide formal control for high-risk activities and ensure all precautions are taken',
      'To allocate work to contractors',
    ],
    correctAnswer: 2,
    explanation:
      'A permit-to-work system provides formal documented control for high-risk activities, ensuring all necessary precautions are identified, implemented and verified before work begins, with clear handover and sign-off procedures.',
  },
  {
    id: 6,
    question: 'Before testing a circuit dead, the voltage indicator must be:',
    options: [
      'Calibrated within the last 6 months',
      'Proved on a known live source before AND after use',
      'Of the same make as the installation',
      'Used only by a qualified electrician',
    ],
    correctAnswer: 1,
    explanation:
      'GS38 requires voltage indicators to be proved on a known live source immediately before and immediately after testing the circuit to confirm the instrument is working correctly throughout the test procedure.',
  },
  {
    id: 7,
    question: 'Who should hold the key to a personal safety lock during safe isolation?',
    options: [
      'The site supervisor',
      'The person who applied the lock',
      'The client or building owner',
      "The electrical contractor's office",
    ],
    correctAnswer: 1,
    explanation:
      "The person working on the isolated circuit must retain the key to their personal safety lock. This ensures only they can remove it when their work is complete and it's safe to re-energise.",
  },
  {
    id: 8,
    question: 'Which standard provides guidance on safe isolation procedures in the UK?',
    options: [
      'BS 7671 only',
      'HSE Guidance Note GS38',
      'Building Regulations Part P',
      'CIBSE Guide A',
    ],
    correctAnswer: 1,
    explanation:
      "HSE Guidance Note GS38 'Electrical test equipment for use on low voltage electrical systems' provides detailed guidance on safe isolation procedures and the equipment required.",
  },
  {
    id: 9,
    question: 'What should happen when a SSOW is found to be ineffective?',
    options: [
      'Continue working and report at the end of the day',
      'Stop work, report the issue and review/revise the system',
      'Increase supervision levels',
      'Reduce the scope of work',
    ],
    correctAnswer: 1,
    explanation:
      'If a SSOW is found ineffective, work should stop immediately and the issue reported. The system must be reviewed and revised before work continues. This is part of the continuous improvement cycle.',
  },
  {
    id: 10,
    question: "For electrical work, what does 'dead working' refer to?",
    options: [
      'Working on circuits that have been safely isolated and proved dead',
      'Working in areas with no electrical supply',
      'Emergency work following an incident',
      'Working outside normal hours',
    ],
    correctAnswer: 0,
    explanation:
      'Dead working means working on electrical systems that have been safely isolated and proved dead using approved test equipment. It is the preferred method as it eliminates the risk of electric shock.',
  },
  {
    id: 11,
    question: 'How often should safe systems of work be reviewed?',
    options: [
      'Only when an accident occurs',
      'Annually as a minimum',
      'Regularly, after incidents, and when circumstances change',
      'Every five years',
    ],
    correctAnswer: 2,
    explanation:
      'SSOW should be reviewed regularly as part of a planned schedule, after any incidents or near misses, when work methods or equipment change, and when new hazards are identified.',
  },
  {
    id: 12,
    question: "What is the purpose of a 'toolbox talk' in relation to safe systems of work?",
    options: [
      'To check that workers have the correct tools',
      'To communicate specific safety information before work begins',
      'To issue new PPE',
      'To record attendance on site',
    ],
    correctAnswer: 1,
    explanation:
      'Toolbox talks are short, focused safety briefings used to communicate specific hazards, control measures and safe working procedures to the workforce before they start a particular task or shift.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a safe system of work and a method statement?',
    answer:
      'A safe system of work (SSOW) is the overall formal procedure for carrying out work safely, developed from risk assessment. A method statement is a detailed written document describing how specific work will be carried out step-by-step, including the SSOW elements. Method statements are often required by principal contractors and form part of the SSOW documentation.',
  },
  {
    question: 'When can live electrical work be justified?',
    answer:
      'Live working should only be undertaken when it is unreasonable in all circumstances for the conductor to be dead (Regulation 14, Electricity at Work Regulations 1989). This might include essential diagnostic testing, or where isolation would cause unacceptable consequences. Even then, suitable precautions must be taken, competent persons must do the work, and a permit-to-work system should be used.',
  },
  {
    question: 'Who is responsible for ensuring safe systems of work are followed?',
    answer:
      'Employers have overall responsibility for providing SSOW under HASAWA 1974. However, supervisors must ensure systems are followed, and employees have a duty under Section 7 to cooperate with safety arrangements. In building services, this extends through the contracting chain - principal contractors, contractors and subcontractors all have responsibilities.',
  },
  {
    question: 'What should I do if I discover a hazard not covered by the existing SSOW?',
    answer:
      "Stop work immediately if there is imminent danger. Report the hazard to your supervisor and record it. The SSOW and risk assessment must be reviewed and updated before work continues. This 'stop the job' authority is essential for maintaining safety and should be supported by management.",
  },
  {
    question: 'How detailed should a safe system of work be?',
    answer:
      'The level of detail should be proportionate to the risk. Higher risk activities require more detailed, prescriptive procedures. For routine low-risk tasks, a brief SSOW may suffice. The key is that workers can understand and follow the system, and that all significant hazards and controls are addressed. Complex tasks may need separate method statements for each phase.',
  },
  {
    question: 'What training is required for safe isolation procedures?',
    answer:
      'All persons who isolate electrical equipment must be trained and competent in safe isolation procedures. This includes understanding GS38 requirements, correct use of approved voltage indicators and proving units, lock-off procedures, and the importance of verifying isolation. Training should be refreshed periodically and documented.',
  },
];

const HNCModule1Section2_5 = () => {
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
            eyebrow="Module 1.2.5"
            title="Safe Systems of Work"
            description="Developing, implementing and maintaining formal procedures to protect people from workplace hazards"
            tone="purple"
          />

          <TLDR
            points={[
              'You will treat &ldquo;safe system of work&rdquo; as the operational layer that sits between policy and the operative — RAMS, permits, safe-isolation procedures, lock-off/tag-out, briefings.',
              'You can break a complex task into discrete safe sequences and identify where engineering controls give way to procedural controls.',
              'You audit live SSOW compliance — not just the paperwork, but what is happening on the floor — and feed findings back into MHSWR Reg 5 monitoring.',
              'You apply the recognised UK safe-isolation procedure (HSE GS38, ENA G39) to every electrical intervention, no exceptions.',
            ]}
          />

          <RegsCallout
            source="HASAWA 1974 — Section 2(2)(a)"
            clause="The provision and maintenance of plant and systems of work that are, so far as is reasonably practicable, safe and without risks to health."
            meaning={
              <>
                A safe system of work is the legal expression of s.2(2)(a). Document the system,
                train people in it, monitor it and revise it after every incident. As an HNC
                supervisor, the SSOW is your day-to-day deliverable.
              </>
            }
            cite="Source: Health and Safety at Work etc. Act 1974, s.2(2)(a) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Define safe systems of work and explain their legal basis",
              "Describe the process for developing an effective SSOW",
              "Apply the hierarchy of controls to hazard management",
              "Explain permit-to-work systems and when they are required",
              "Demonstrate safe isolation procedures for electrical work",
              "Understand monitoring, supervision and review requirements",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>Definition and Legal Basis</ContentEyebrow>

          <ConceptBlock title="Definition and Legal Basis">
            <p>
            A safe system of work (SSOW) is a formal procedure which results from systematic
            examination of a task in order to identify all the hazards and implement control
            measures to eliminate or minimise the risk of harm. It defines how work should be
            carried out safely.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">Legal requirements for SSOW:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>HASAWA 1974 Section 2(2)(a):</strong> Duty to provide and maintain safe
            systems of work
            </li>
            <li>
            <strong>MHSWR 1999 Regulation 3:</strong> Risk assessment requirement - foundation
            of all SSOW
            </li>
            <li>
            <strong>MHSWR 1999 Regulation 4:</strong> Implement preventive and protective
            measures from assessment
            </li>
            <li>
            <strong>EAW 1989 Regulation 4:</strong> Systems of work to prevent electrical
            danger
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Key Elements of a Safe System of Work
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Task analysis</strong> — Description: Break down work into steps. Example: Each stage of cable installation</li>
            <li><strong>Hazard identification</strong> — Description: Find things that could cause harm. Example: Live conductors, work at height</li>
            <li><strong>Risk evaluation</strong> — Description: Assess likelihood and severity. Example: High risk = live HV work</li>
            <li><strong>Control measures</strong> — Description: Actions to reduce risk. Example: Isolation, PPE, barriers</li>
            <li><strong>Safe procedures</strong> — Description: Step-by-step safe method. Example: Isolation sequence</li>
            <li><strong>Competent persons</strong> — Description: Trained, qualified workers. Example: Authorised persons for HV</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Remember:</strong> A SSOW is only effective if it is communicated, understood,
            and followed. Documentation alone does not create safety.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Development Process</ContentEyebrow>

          <ConceptBlock title="Development Process">
            <p>
            Developing an effective safe system of work requires systematic analysis of the task,
            identification of hazards, and selection of appropriate controls using the hierarchy
            of controls.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Five-Stage Development Process
            </p>
            
            
            <p className="font-medium text-elec-yellow mb-1">Stage 1: Task Analysis</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Break the job into individual steps or phases</li>
            <li>Consider the sequence of operations</li>
            <li>
            Identify the people, plant, materials and environment involved
            </li>
            <li>Note any interfaces with other work activities</li>
            </ul>
            
            
            <p className="font-medium text-elec-yellow mb-1">
            Stage 2: Hazard Identification
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>For each step, identify what could cause harm</li>
            <li>
            Consider physical, chemical, biological, ergonomic and psychological hazards
            </li>
            <li>Review incident history and industry guidance</li>
            <li>Consult with workers who do the task</li>
            </ul>
            
            
            <p className="font-medium text-elec-yellow mb-1">Stage 3: Risk Evaluation</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Assess likelihood of harm occurring</li>
            <li>Evaluate potential severity of harm</li>
            <li>Consider who might be affected and how</li>
            <li>Prioritise risks requiring control measures</li>
            </ul>
            
            
            <p className="font-medium text-elec-yellow mb-1">
            Stage 4: Control Selection (Hierarchy)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Eliminate:</strong> Remove the hazard entirely
            </li>
            <li>
            <strong>Substitute:</strong> Replace with less hazardous alternative
            </li>
            <li>
            <strong>Engineering:</strong> Physical controls (guards, ventilation,
            isolation)
            </li>
            <li>
            <strong>Administrative:</strong> Procedures, training, signage, supervision
            </li>
            <li>
            <strong>PPE:</strong> Last resort - personal protective equipment
            </li>
            </ul>
            
            
            <p className="font-medium text-elec-yellow mb-1">Stage 5: Documentation</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Record the SSOW in appropriate format</li>
            <li>
            Include risk assessment, method statement, permits if required
            </li>
            <li>Specify competency requirements</li>
            <li>Define monitoring and review arrangements</li>
            </ul>
            
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hierarchy of Controls</p>
            <div className="relative">
            
            <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-sm">
            1
            </div>
            <div className="flex-1 p-2 rounded bg-green-500/10 border border-green-500/30">
            <p className="text-sm font-medium text-green-400">
            Eliminate - Most effective
            </p>
            <p className="text-xs text-white">Remove the hazard completely</p>
            </div>
            </div>
            <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-lime-500/20 flex items-center justify-center text-lime-400 font-bold text-sm">
            2
            </div>
            <div className="flex-1 p-2 rounded bg-lime-500/10 border border-lime-500/30">
            <p className="text-sm font-medium text-lime-400">Substitute</p>
            <p className="text-xs text-white">
            Replace with less hazardous alternative
            </p>
            </div>
            </div>
            <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-sm">
            3
            </div>
            <div className="flex-1 p-2 rounded bg-yellow-500/10 border border-yellow-500/30">
            <p className="text-sm font-medium text-yellow-400">Engineering Controls</p>
            <p className="text-xs text-white">Isolate people from the hazard</p>
            </div>
            </div>
            <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm">
            4
            </div>
            <div className="flex-1 p-2 rounded bg-orange-500/10 border border-orange-500/30">
            <p className="text-sm font-medium text-orange-400">Administrative Controls</p>
            <p className="text-xs text-white">Change the way people work</p>
            </div>
            </div>
            <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-sm">
            5
            </div>
            <div className="flex-1 p-2 rounded bg-red-500/10 border border-red-500/30">
            <p className="text-sm font-medium text-red-400">PPE - Last resort</p>
            <p className="text-xs text-white">Protect the individual worker</p>
            </div>
            </div>
            
            </div>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Key principle:</strong> Always start at the top of the hierarchy. Only move
            down when higher-level controls are not reasonably practicable.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Implementation and Communication</ContentEyebrow>

          <ConceptBlock title="Implementation and Communication">
            <p>
            A safe system of work is only effective if it is properly implemented, communicated to
            all relevant persons, and actively followed. This requires clear documentation,
            effective training, and ongoing supervision.
            </p>

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Documentation Requirements
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Risk assessment:</strong> Record significant findings
            </li>
            <li>
            <strong>Method statement:</strong> Step-by-step procedure
            </li>
            <li>
            <strong>Permits:</strong> For high-risk activities
            </li>
            <li>
            <strong>Training records:</strong> Competency evidence
            </li>
            <li>
            <strong>Briefing records:</strong> Who was informed
            </li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Communication Methods
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Induction:</strong> Site-specific hazards and rules
            </li>
            <li>
            <strong>Toolbox talks:</strong> Task-specific briefings
            </li>
            <li>
            <strong>Written procedures:</strong> Accessible on site
            </li>
            <li>
            <strong>Signage:</strong> Warnings and instructions
            </li>
            <li>
            <strong>Supervision:</strong> Ongoing guidance
            </li>
            </ul>
            </div>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Toolbox Talks - Effective Briefings
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Scope of work</strong> — Content: What task is being done, where, and when</li>
            <li><strong>Hazards</strong> — Content: Specific dangers for this task/location</li>
            <li><strong>Controls</strong> — Content: Measures in place and required actions</li>
            <li><strong>PPE</strong> — Content: Required equipment and standards</li>
            <li><strong>Emergency</strong> — Content: What to do if things go wrong</li>
            <li><strong>Questions</strong> — Content: Opportunity to clarify and raise concerns</li>
            </ul>
            
            

            <CommonMistake
            title="Critical Success Factors"
            whatHappens={<><ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Management commitment and visible leadership</li>
            <li>Worker involvement in developing systems</li>
            <li>Clear, understandable documentation</li>
            <li>Adequate resources (time, equipment, training)</li>
            <li>Positive safety culture that encourages reporting</li>
            </ul></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            <p className="text-sm text-elec-yellow/70">
            <strong>Remember:</strong> Workers who help develop SSOW are more likely to understand
            and follow them. Consultation is not just a legal requirement - it improves safety
            outcomes.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Monitoring, Supervision and Review</ContentEyebrow>

          <ConceptBlock title="Monitoring, Supervision and Review">
            <p>
            Effective monitoring ensures safe systems of work are being followed, while regular
            review ensures they remain effective as circumstances change. This is the 'check' and
            'act' part of the Plan-Do-Check-Act safety management cycle.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Monitoring</p>
            
            
            <p className="font-medium text-white mb-2">Active (Proactive) Monitoring</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Regular safety tours and inspections</li>
            <li>Observations of work practices</li>
            <li>Checking equipment and PPE</li>
            <li>Reviewing documentation compliance</li>
            <li>Auditing against standards</li>
            </ul>
            
            
            <p className="font-medium text-white mb-2">Reactive Monitoring</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Investigating accidents and incidents</li>
            <li>Analysing near-miss reports</li>
            <li>Reviewing ill-health records</li>
            <li>Tracking enforcement actions</li>
            <li>Learning from complaints</li>
            </ul>
            
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            When to Review Safe Systems of Work
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Regularly:</strong> As part of a planned review schedule (at least
            annually)
            </li>
            <li>
            <strong>After incidents:</strong> Following accidents, near misses, or dangerous
            occurrences
            </li>
            <li>
            <strong>When circumstances change:</strong> New equipment, processes, or personnel
            </li>
            <li>
            <strong>When new hazards identified:</strong> Previously unknown risks emerge
            </li>
            <li>
            <strong>When legislation changes:</strong> New legal requirements or guidance
            </li>
            <li>
            <strong>When monitoring shows deficiencies:</strong> Systems not being followed
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Supervision Requirements
            </p>
            <p className="text-sm text-white mb-3">
            The level of supervision required depends on the risk level and worker competence:
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>High-risk task, new worker</strong> — Supervision Level: Constant, direct supervision</li>
            <li><strong>High-risk task, experienced worker</strong> — Supervision Level: Regular checks, immediate availability</li>
            <li><strong>Low-risk task, competent worker</strong> — Supervision Level: Periodic monitoring</li>
            <li><strong>Permit-controlled work</strong> — Supervision Level: As specified in permit conditions</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Continuous improvement:</strong> Review outcomes should feed back into revised
            risk assessments and updated safe systems of work. Safety is a cycle, not a one-time
            activity.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Building Services SSOW Examples">
            {/* Safe Isolation */}
            
            <p><strong>Safe Isolation Procedure (GS38)</strong></p>
            <p className="text-sm text-white mb-4">
            Safe isolation is the fundamental SSOW for electrical work. It ensures conductors
            are dead before work begins and cannot be re-energised during work.
            </p>
            
            <div className="flex items-start gap-3 p-2 rounded bg-black/30">
            <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-xs flex-shrink-0">
            1
            </div>
            <div>
            <p className="text-sm font-medium text-white">Identify</p>
            <p className="text-xs text-white">
            Identify the circuit to be worked on from drawings, labels and tracing
            </p>
            </div>
            </div>
            <div className="flex items-start gap-3 p-2 rounded bg-black/30">
            <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-xs flex-shrink-0">
            2
            </div>
            <div>
            <p className="text-sm font-medium text-white">Isolate</p>
            <p className="text-xs text-white">
            Switch off at the point of supply using suitable means of isolation
            </p>
            </div>
            </div>
            <div className="flex items-start gap-3 p-2 rounded bg-black/30">
            <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-xs flex-shrink-0">
            3
            </div>
            <div>
            <p className="text-sm font-medium text-white">Lock Off</p>
            <p className="text-xs text-white">
            Secure isolation with personal safety lock - keep the key on your person
            </p>
            </div>
            </div>
            <div className="flex items-start gap-3 p-2 rounded bg-black/30">
            <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-xs flex-shrink-0">
            4
            </div>
            <div>
            <p className="text-sm font-medium text-white">Prove Dead</p>
            <p className="text-xs text-white">
            Test with approved voltage indicator (proved on known live source before AND
            after)
            </p>
            </div>
            </div>
            <div className="flex items-start gap-3 p-2 rounded bg-black/30">
            <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-xs flex-shrink-0">
            5
            </div>
            <div>
            <p className="text-sm font-medium text-white">Post Warning Notices</p>
            <p className="text-xs text-white">
            Display 'Danger - Do Not Switch On' signs at isolation point
            </p>
            </div>
            </div>
            
            

            <InlineCheck {...quickCheckQuestions[3]} />

            {/* Permit-to-Work */}
            <div className="p-4 rounded-lg bg-white/5 mt-6">
            <p><strong>Permit-to-Work Systems</strong></p>
            <p className="text-sm text-white mb-4">
            Permit-to-work (PTW) systems are formal documented procedures for controlling
            high-risk activities. They ensure all necessary precautions are taken before work
            begins.
            </p>
            <div className="overflow-x-auto mb-4">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Electrical (HV)</strong> — When Required: Work on high voltage systems. Key Controls: Isolation, earthing, access control</li>
            <li><strong>Hot Work</strong> — When Required: Welding, cutting, brazing. Key Controls: Fire watch, removal of combustibles</li>
            <li><strong>Confined Space</strong> — When Required: Entry to tanks, ducts, chambers. Key Controls: Atmosphere testing, rescue plan</li>
            <li><strong>Excavation</strong> — When Required: Groundwork near services. Key Controls: Service location, shoring</li>
            <li><strong>Breaking Containment</strong> — When Required: Opening pressurised systems. Key Controls: Depressurisation, drainage</li>
            </ul>
            </div>
            <div className="p-3 rounded bg-black/30">
            <p className="text-xs font-medium text-white mb-2">Essential PTW Elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Clear description of work to be done and location</li>
            <li>Time limits (start/finish, shift handover procedures)</li>
            <li>Hazards identified and precautions required</li>
            <li>Isolation details and testing requirements</li>
            <li>PPE and equipment requirements</li>
            <li>Emergency procedures and contacts</li>
            <li>Signatures: issue, receipt, clearance, cancellation</li>
            </ul>
            </div>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />

            {/* LOTO */}
            <div className="p-4 rounded-lg bg-white/5 mt-6">
            <p><strong>Lock-Out Tag-Out (LOTO) for Mechanical Systems</strong></p>
            <p className="text-sm text-white mb-4">
            LOTO procedures apply to mechanical systems with stored energy (rotating plant,
            hydraulics, pneumatics) as well as electrical systems. The principles are similar to
            electrical safe isolation.
            </p>
            
            <div>
            <p className="text-sm font-medium text-white mb-2">Energy Sources to Isolate</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Electrical supply</li>
            <li>Pneumatic (compressed air)</li>
            <li>Hydraulic (pressurised fluid)</li>
            <li>Mechanical (springs, flywheels)</li>
            <li>Thermal (steam, hot surfaces)</li>
            <li>Gravitational (suspended loads)</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-white mb-2">LOTO Key Points</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Each worker applies own lock</li>
            <li>Tags identify lock owner and purpose</li>
            <li>All energy sources must be addressed</li>
            <li>Stored energy must be dissipated</li>
            <li>Verify isolation before work begins</li>
            <li>Only lock owner removes their lock</li>
            </ul>
            </div>
            
            </div>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <div>
            <p><strong>SSOW Development Checklist</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Task broken down into logical steps</li>
            <li>All foreseeable hazards identified</li>
            <li>Risks evaluated using consistent methodology</li>
            <li>Controls selected using hierarchy approach</li>
            <li>Competency requirements defined</li>
            <li>Equipment and PPE specified</li>
            <li>Emergency procedures included</li>
            <li>Review triggers identified</li>
            </ul>
            </div>

            <div>
            <p><strong>Key Legislation and Guidance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>HASAWA 1974:</strong> Section 2 - safe systems of work requirement
            </li>
            <li>
            <strong>MHSWR 1999:</strong> Regulations 3, 4, 5 - risk assessment and controls
            </li>
            <li>
            <strong>EAW 1989:</strong> Regulations 4, 12, 13, 14 - electrical safety
            </li>
            <li>
            <strong>GS38:</strong> Electrical test equipment and safe isolation
            </li>
            <li>
            <strong>HSG65:</strong> Managing for health and safety
            </li>
            <li>
            <strong>HSG250:</strong> Guidance on permit-to-work systems
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Common Failures to Avoid</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Generic SSOW:</strong> Not tailored to specific task and location
            </li>
            <li>
            <strong>No worker consultation:</strong> Systems imposed without input
            </li>
            <li>
            <strong>Inadequate communication:</strong> Workers unaware of requirements
            </li>
            <li>
            <strong>No monitoring:</strong> Systems exist on paper only
            </li>
            <li>
            <strong>Static documents:</strong> Never reviewed or updated
            </li>
            <li>
            <strong>Complexity:</strong> Procedures too complicated to follow
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Establishing safe-isolation as the firm-wide SSOW"
            situation={
              <>
                You have just taken on a supervisory role at a building services contractor.
                You discover that operatives are using inconsistent isolation methods — some
                lock off, some just remove fuses, some rely on the foreman&rsquo;s word that the
                circuit is dead. There is no documented isolation procedure.
              </>
            }
            whatToDo={
              <>
                Establish the SSOW. Adopt HSE GS38 + the IET&rsquo;s recommended sequence:
                identify, switch off, prove voltage indicator on a known live source, prove
                dead at the point of work, prove voltage indicator again on the known live
                source, lock off and apply caution notice. Issue padlocks, multi-padlock hasps,
                personal danger tags, GS38 voltage indicators and proving units. Train every
                operative, record the briefing, audit weekly for the first quarter. Tie the
                procedure into the firm&rsquo;s permit-to-work system for all live or
                near-live work.
              </>
            }
            whyItMatters={
              <>
                Inconsistent isolation is the largest single cause of UK electrical fatalities
                in maintenance. A single firm-wide SSOW removes the variability and gives every
                operative the same defence under EAWR Reg 14.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Safe System of Work (SSOW) is the operational layer between policy and the operative — RAMS, permits, isolation procedures, briefings.',
              'HSWA s.2(2)(a) is the legal hook — &ldquo;safe systems of work&rdquo; is statutory language.',
              'Build the SSOW from the hazard register up — never copy a generic template without site-specific adaptation.',
              'GS38 + the IET safe-isolation sequence is the UK reference for electrical SSOW.',
              'Permit-to-work systems formalise the highest-risk SSOWs — live work, confined space, hot work, high-voltage.',
              'Monitoring under MHSWR Reg 5 is mandatory — audit the floor, not just the file.',
              'Briefing records (signed) are the primary evidence that the SSOW reached the operative.',
              'Continuous improvement — every near-miss and every incident must trigger an SSOW review.',
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
              onClick={() => navigate('../h-n-c-module1-section2-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 2.6
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section2_5;
