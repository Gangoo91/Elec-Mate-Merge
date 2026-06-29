/**
 * Module 1 · Section 2 · Subsection 6 — Dynamic Risk Assessment
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   Real-time hazard assessment when conditions change mid-task — STAR / SLAM / Take 5.
 *   Engineer-in-training perspective: how an HNC supervisor coaches operatives to make
 *   defendable, in-the-moment safety decisions and escalate when the planned RA no
 *   longer fits the situation.
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

const TITLE = 'Dynamic Risk Assessment - HNC Module 1 Section 2.6';
const DESCRIPTION =
  'Master dynamic risk assessment techniques for building services: SLAM, Take 5, stop work authority and real-time hazard management in changing workplace conditions.';

const quickCheckQuestions = [
  {
    id: 'dra-definition',
    question: 'What is the primary purpose of a dynamic risk assessment?',
    options: [
      'To assess risks in real-time as conditions change',
      'To replace the need for a written risk assessment',
      'To record the cost of controls before work starts',
      'To assign blame after an accident has occurred',
    ],
    correctIndex: 0,
    explanation:
      'Dynamic risk assessment is the continuous process of identifying and managing risks in real-time as work conditions change. It supplements, not replaces, formal written risk assessments.',
  },
  {
    id: 'slam-meaning',
    question: "What does the 'A' stand for in the SLAM technique?",
    options: [
      'Avoid',
      'Alert',
      'Assess',
      'Act',
    ],
    correctIndex: 2,
    explanation:
      'SLAM stands for Stop, Look, Assess, Manage. The Assess stage involves evaluating the hazards identified and determining if work can proceed safely.',
  },
  {
    id: 'stop-work-authority',
    question: 'Who has the authority to stop work when an uncontrolled hazard is identified?',
    options: [
      'Only the principal contractor',
      'Any worker who identifies the hazard',
      'Only health and safety officers',
      'Only site managers',
    ],
    correctIndex: 1,
    explanation:
      'Under UK health and safety law, any worker has the right and duty to stop work if they identify an immediate danger that cannot be controlled. This is known as stop work authority.',
  },
  {
    id: 'take-5-timing',
    question: 'When should a Take 5 assessment typically be performed?',
    options: [
      'Only at the very end of the working day',
      'Before starting each new task or when conditions change',
      'Only once a week during the toolbox talk',
      'Only when the supervisor specifically requests it',
    ],
    correctIndex: 1,
    explanation:
      'Take 5 assessments should be performed before starting each new task, when moving to a new work area, or when conditions change. The name refers to taking 5 minutes to assess the situation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What distinguishes a dynamic risk assessment from a formal written risk assessment?',
    options: [
      'Dynamic assessments are legally required while written ones are optional',
      'Dynamic assessments are performed in real-time to address changing conditions',
      'Dynamic assessments are only performed by managers',
      'Dynamic assessments do not require hazard identification',
    ],
    correctAnswer: 1,
    explanation:
      'Dynamic risk assessment is a continuous, real-time process that addresses changing conditions and unexpected hazards. Written risk assessments are pre-planned documents that may not cover all situations encountered on site.',
  },
  {
    id: 2,
    question:
      'An electrician arrives to work on a distribution board and discovers the area is flooded. What is the FIRST step in the SLAM technique?',
    options: [
      'Manage the situation by getting pumping equipment',
      'Look for alternative access routes',
      'Stop work immediately',
      'Assess the depth of the water',
    ],
    correctAnswer: 2,
    explanation:
      'The first step in SLAM is Stop. Before doing anything else, stop work to prevent exposure to the unexpected hazard. Only then proceed to Look, Assess, and Manage.',
  },
  {
    id: 3,
    question: 'During a Take 5 assessment, which of the following should be considered?',
    options: [
      'Only the electrical hazards within your own trade',
      'Only the hazards listed in the written method statement',
      'Only hazards that have caused accidents before',
      'All hazards including environmental, physical, and work activity risks',
    ],
    correctAnswer: 3,
    explanation:
      'Take 5 requires consideration of ALL hazards present, not just those in your trade area. This includes environmental conditions, other trades working nearby, and any changes since the original risk assessment was written.',
  },
  {
    id: 4,
    question:
      'When working in an occupied commercial building, which scenario would MOST likely require a dynamic risk assessment?',
    options: [
      'Fire alarm testing begins unexpectedly during your installation work',
      'You complete the task exactly as the method statement describes',
      'You finish early and tidy your tools away',
      'The building manager signs off your completed work',
    ],
    correctAnswer: 0,
    explanation:
      'Unexpected events like fire alarm testing create new conditions not covered in the original risk assessment. This requires real-time assessment of whether work can continue safely and what additional controls are needed.',
  },
  {
    id: 5,
    question:
      'What action should be taken if a dynamic risk assessment identifies a hazard that cannot be adequately controlled?',
    options: [
      'Document the hazard and continue',
      'Stop work and report to the supervisor',
      'Ask another worker to take over the task',
      'Continue work while being extra careful',
    ],
    correctAnswer: 1,
    explanation:
      'If a hazard cannot be adequately controlled through the measures available, work must stop. Continuing would breach the duty to work safely. The situation should be reported so additional controls can be implemented.',
  },
  {
    id: 6,
    question: 'Which of the following is NOT a valid reason to invoke stop work authority?',
    options: [
      'Discovery of asbestos-containing materials',
      'Live electrical equipment where isolation was expected',
      'Disagreement with the foreman about break times',
      'Gas leak detected in the work area',
    ],
    correctAnswer: 2,
    explanation:
      'Stop work authority is for immediate safety concerns, not workplace disputes. Asbestos, unexpected live equipment, and gas leaks are all serious hazards requiring immediate work stoppage.',
  },
  {
    id: 7,
    question:
      'During installation work in a hospital, a patient emergency is declared in an adjacent area. What is the appropriate response?',
    options: [
      'Continue working, as the emergency is not in your area',
      'Pack away all tools before doing anything else',
      'Wait for a supervisor to tell you what to do',
      'Stop work, assess the situation, and follow emergency protocols',
    ],
    correctAnswer: 3,
    explanation:
      'In occupied buildings, especially critical facilities like hospitals, emergency situations require immediate dynamic assessment. You may need to stop work, move equipment, or provide clear access for emergency responders.',
  },
  {
    id: 8,
    question: "What is the 'Look' phase of SLAM primarily concerned with?",
    options: [
      'Observing the work environment and identifying hazards',
      'Checking that all workers are looking at their tasks',
      'Looking at the method statement',
      'Looking for the supervisor to report',
    ],
    correctAnswer: 0,
    explanation:
      'The Look phase involves actively observing your surroundings to identify all hazards present. This includes the physical environment, other activities, equipment, and any changes from expected conditions.',
  },
  {
    id: 9,
    question: 'When should a dynamic risk assessment be documented?',
    options: [
      'Only at the end of the project for the handover file',
      'When significant hazards are identified or changes made to work methods',
      'Only if an accident actually results from the hazard',
      'Never, as dynamic assessments are always informal',
    ],
    correctAnswer: 1,
    explanation:
      'While dynamic assessments are often informal mental processes, significant findings should be documented. This includes newly identified hazards, changes to work methods, and situations where work was stopped.',
  },
  {
    id: 10,
    question:
      'A building services engineer discovers that a supposedly isolated circuit is actually live during testing. According to dynamic risk assessment principles, what should happen FIRST?',
    options: [
      'Carry on testing to confirm which circuit is live',
      'Note the finding and continue with extra caution',
      'Stop work immediately and make the area safe',
      'Re-check the drawings before taking any action',
    ],
    correctAnswer: 2,
    explanation:
      'Discovery of unexpected live equipment is a serious hazard requiring immediate work stoppage. The first priority is to stop and make the area safe, preventing exposure to the electrical hazard. Reporting and investigation follow.',
  },
];

const faqs = [
  {
    question:
      'How does dynamic risk assessment relate to the formal risk assessment in a method statement?',
    answer:
      "Dynamic risk assessment supplements formal written assessments. The method statement covers foreseeable hazards, but conditions on site can change. Dynamic assessment bridges the gap by enabling workers to identify and manage hazards in real-time that weren't anticipated or have changed since the original assessment.",
  },
  {
    question: 'Can I be disciplined for using stop work authority?',
    answer:
      'No. Under UK law (Health and Safety at Work Act 1974 and Management of Health and Safety at Work Regulations), workers have a legal right to stop work when facing serious and imminent danger. Any employer who disciplines a worker for legitimate use of stop work authority would be in breach of employment law.',
  },
  {
    question: "What's the difference between Take 5 and SLAM?",
    answer:
      'Both are dynamic risk assessment tools with similar purposes. Take 5 is a more structured approach, often using a card or checklist covering five key areas of hazard. SLAM (Stop, Look, Assess, Manage) is a four-step mental process that can be applied instantly. Many organisations use both - Take 5 before starting work and SLAM throughout the day.',
  },
  {
    question: 'Do I need training to perform dynamic risk assessments?',
    answer:
      'While formal training is beneficial, the principles are straightforward enough for any competent worker to apply. However, employers should ensure workers understand the process through toolbox talks, induction, and supervision. More complex environments may require specific training in hazard recognition.',
  },
  {
    question: 'How do I document a dynamic risk assessment?',
    answer:
      'Documentation can be simple - a note in a site diary, a completed Take 5 card, or a verbal report to a supervisor who records it. The key is capturing what hazard was identified, what action was taken, and any changes to work methods. Many companies provide pocket cards or apps for this purpose.',
  },
  {
    question: 'What if my supervisor disagrees with my dynamic risk assessment?',
    answer:
      "Discuss your concerns openly, explaining the hazards you've identified. If you still believe there's an uncontrolled risk, you have the right to refuse to undertake the work. The matter should be escalated to site management or the principal contractor. Never allow pressure to override genuine safety concerns.",
  },
];

const HNCModule1Section2_6 = () => {
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
            eyebrow="Module 1.2.6"
            title="Dynamic Risk Assessment"
            description="Real-time hazard identification and management in changing workplace conditions"
            tone="purple"
          />

          <TLDR
            points={[
              'You will treat dynamic risk assessment (DRA) as the bridge between the written RA and the reality on the floor — never as a substitute for it.',
              'You can coach operatives in STAR (Stop, Think, Act, Review), SLAM (Stop, Look, Assess, Manage) or Take 5 — pick one and use it consistently.',
              'You define the trigger points where DRA is mandatory — start of task, change of condition, change of personnel, return after a break, and any unforeseen hazard.',
              'You record material DRA outcomes in the day log so the audit trail survives the shift.',
            ]}
          />

          <RegsCallout
            source="MHSWR 1999 — Regulation 3(3)"
            clause="Any assessment such as is referred to in paragraph (1) or (2) shall be reviewed by the employer or self-employed person who made it if—(a) there is reason to suspect that it is no longer valid; or (b) there has been a significant change in the matters to which it relates."
            meaning={
              <>
                Reg 3(3) is the legal anchor for dynamic risk assessment. The moment conditions
                change, the written RA may no longer be valid — the operative on the floor is
                the duty-holder for that moment, until the supervisor revises the formal RA.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999, Reg 3(3) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Define dynamic risk assessment and explain when it applies",
              "Apply the SLAM technique to real-world scenarios",
              "Conduct Take 5 assessments before starting work",
              "Understand stop work authority and when to use it",
              "Recognise situations requiring dynamic assessment in building services",
              "Document and communicate dynamic risk assessment findings",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>Definition and Purpose of Dynamic Risk Assessment</ContentEyebrow>

          <ConceptBlock title="Definition and Purpose of Dynamic Risk Assessment">
            <p>
            Dynamic risk assessment (DRA) is the continuous process of identifying hazards,
            assessing risks, and implementing controls in real-time as work conditions change.
            Unlike formal written risk assessments prepared before work begins, dynamic assessment
            happens throughout the working day.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">
            Key characteristics of dynamic risk assessment:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Continuous:</strong> Ongoing throughout the work activity, not a one-time
            exercise
            </li>
            <li>
            <strong>Real-time:</strong> Responds immediately to changing conditions
            </li>
            <li>
            <strong>Worker-led:</strong> Performed by those doing the work, not just
            supervisors
            </li>
            <li>
            <strong>Supplementary:</strong> Works alongside formal risk assessments, not
            instead of them
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Why Dynamic Assessment is Essential
            </p>
            <p className="text-sm text-white mb-3">
            Formal risk assessments cannot predict every situation. Building services work
            involves:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Multiple trades working in the same space with changing activities
            </li>
            <li>
            Occupied buildings where building users create unpredictable situations
            </li>
            <li>
            Discovery of unexpected hazards (asbestos, live services, structural issues)
            </li>
            <li>
            Weather changes affecting work in exposed or partially completed areas
            </li>
            <li>
            Equipment breakdowns or unavailability requiring work method changes
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Legal Foundation</p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>HSWA 1974 s.2</strong> — Relevance to DRA: Employer duty to ensure health and safety so far as reasonably practicable</li>
            <li><strong>HSWA 1974 s.7</strong> — Relevance to DRA: Employee duty to take reasonable care for themselves and others</li>
            <li><strong>MHSWR Reg.3</strong> — Relevance to DRA: Requirement for suitable and sufficient risk assessment</li>
            <li><strong>CDM 2015 Reg.15</strong> — Relevance to DRA: Duty to report anything likely to endanger health or safety</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Remember:</strong> Dynamic risk assessment is a legal duty under Regulation 3
            of MHSWR - risk assessments must remain 'suitable and sufficient', which requires
            ongoing review as conditions change.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>When to Apply Dynamic Risk Assessment</ContentEyebrow>

          <ConceptBlock title="When to Apply Dynamic Risk Assessment">
            <p>
            Dynamic risk assessment should be a continuous mental process, but certain triggers
            require particularly focused attention. Recognising these situations is essential for
            safe working.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">
            Triggers requiring dynamic risk assessment:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Changing conditions:</strong> Weather, lighting, temperature, noise levels
            </li>
            <li>
            <strong>Unexpected hazards:</strong> Discovery of asbestos, live services,
            structural damage
            </li>
            <li>
            <strong>New activities:</strong> Other trades starting work in your area
            </li>
            <li>
            <strong>Equipment issues:</strong> Breakdown, unavailability, or different
            equipment being used
            </li>
            <li>
            <strong>Personnel changes:</strong> Different workers, visitors, or building
            occupants present
            </li>
            <li>
            <strong>Emergency situations:</strong> Fire alarms, evacuations, medical
            emergencies
            </li>
            </ul>
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Planned Work vs Reality
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Method statement says 'isolated' but circuit is live</li>
            <li>Drawings show clear access but area is obstructed</li>
            <li>Work scheduled in unoccupied area but occupants present</li>
            <li>
            Expected ceiling void access but asbestos insulation discovered
            </li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Questions to Ask Yourself
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Has anything changed since I last looked?</li>
            <li>What could go wrong with what I'm about to do?</li>
            <li>Do I have the right equipment and training?</li>
            <li>Who else might be affected by my work?</li>
            </ul>
            </div>
            

            <CommonMistake
            title="Warning Signs Requiring Immediate Assessment"
            whatHappens={<><ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Unusual smells (gas, burning, chemicals)</li>
            <li>Unexpected sounds (alarms, hissing, structural movement)</li>
            <li>
            Visual anomalies (smoke, water, sparking, structural cracks)
            </li>
            <li>People behaving unusually (evacuation movements, distress)</li>
            <li>
            Equipment behaving abnormally (overheating, tripping, vibration)
            </li>
            </ul></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            <p className="text-sm text-elec-yellow/70">
            <strong>Key principle:</strong> If something doesn't look right, feel right, or seem
            right - STOP and assess. Your instincts are often detecting hazards before you
            consciously recognise them.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>SLAM Technique and Take 5</ContentEyebrow>

          <ConceptBlock title="SLAM Technique and Take 5">
            <p>
            SLAM and Take 5 are structured approaches to dynamic risk assessment. Both provide a
            systematic way to identify and control hazards, ensuring nothing is overlooked.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-3">The SLAM Technique</p>
            <div className="grid gap-3">
            <div className="p-4 rounded-lg bg-white/5 border-l-4 border-red-500">
            <p className="font-bold text-red-400 mb-1">S - STOP</p>
            <p className="text-sm">
            Pause before starting or continuing work. Create a mental break to engage your
            risk awareness. If something unexpected has occurred, stop immediately before
            proceeding.
            </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border-l-4 border-yellow-500">
            <p className="font-bold text-yellow-400 mb-1">L - LOOK</p>
            <p className="text-sm">
            Actively observe your surroundings. Look up, down, and around. Identify all
            hazards present including the environment, equipment, other people, and
            activities. Use all your senses.
            </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border-l-4 border-blue-500">
            <p className="font-bold text-blue-400 mb-1">A - ASSESS</p>
            <p className="text-sm">
            Evaluate the risks from hazards identified. Consider likelihood and severity.
            Determine whether existing controls are adequate or if additional measures are
            needed.
            </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border-l-4 border-green-500">
            <p className="font-bold text-green-400 mb-1">M - MANAGE</p>
            <p className="text-sm">
            Implement controls to manage the risks. This may mean proceeding with additional
            precautions, modifying the work method, or stopping work and escalating if risks
            cannot be controlled.
            </p>
            </div>
            </div>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Take 5 Assessment</p>
            <p className="text-sm text-white mb-3">
            Take 5 is a more structured approach, typically using a card or checklist. The name
            comes from taking 5 minutes before starting work. Common Take 5 categories include:
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>1. Task</strong> — What to Check: Do I understand the job? Do I have the right skills and training?</li>
            <li><strong>2. Environment</strong> — What to Check: Weather, lighting, access, confined spaces, heights, other workers</li>
            <li><strong>3. Equipment</strong> — What to Check: Right tools? Good condition? Tested/inspected? PPE available?</li>
            <li><strong>4. Hazards</strong> — What to Check: Electrical, mechanical, chemical, biological, ergonomic hazards</li>
            <li><strong>5. Controls</strong> — What to Check: Are existing controls sufficient? What additional controls are needed?</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Other Dynamic Assessment Tools
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Point of Work Risk Assessment (POWRA):</strong> More detailed card-based
            system with specific prompts
            </li>
            <li>
            <strong>Last Minute Risk Assessment (LMRA):</strong> Final check immediately
            before starting hazardous activities
            </li>
            <li>
            <strong>Stepback 5x5:</strong> Five steps back, five seconds to observe before
            acting
            </li>
            <li>
            <strong>Job Safety Analysis (JSA):</strong> Breaking tasks into steps and
            assessing each step
            </li>
            </ul>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Best practice:</strong> Use Take 5 before starting work each day or when
            moving to a new area. Apply SLAM continuously throughout the day, especially when
            conditions change.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Decision Making and Stop Work Authority</ContentEyebrow>

          <ConceptBlock title="Decision Making and Stop Work Authority">
            <p>
            The outcome of a dynamic risk assessment is a decision: proceed, proceed with
            additional controls, or stop work. Understanding when to stop and having the
            confidence to exercise that authority is critical for preventing serious incidents.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Decision Framework</p>
            <div className="grid gap-3">
            <div className="p-3 rounded bg-green-500/10 border border-green-500/30">
            <p className="font-medium text-green-400 text-sm">PROCEED</p>
            <p className="text-sm text-white">
            All hazards identified, existing controls adequate, no unexpected conditions
            </p>
            </div>
            <div className="p-3 rounded bg-yellow-500/10 border border-yellow-500/30">
            <p className="font-medium text-yellow-400 text-sm">
            PROCEED WITH ADDITIONAL CONTROLS
            </p>
            <p className="text-sm text-white">
            Hazards identified, additional measures required but achievable, work can
            continue safely with modifications
            </p>
            </div>
            <div className="p-3 rounded bg-red-500/10 border border-red-500/30">
            <p className="font-medium text-red-400 text-sm">STOP WORK</p>
            <p className="text-sm text-white">
            Hazards cannot be adequately controlled, immediate danger exists, situation
            needs escalation
            </p>
            </div>
            </div>
            

            
            <p className="text-sm font-medium text-white mb-2">
            Stop Work Authority - Your Right and Duty
            </p>
            <p className="text-sm text-white mb-3">
            Under UK law, every worker has both the right and the duty to stop work when facing
            serious and imminent danger. This is not just a company policy - it is a legal
            protection.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>HSWA s.7:</strong> Duty to take reasonable care - includes stopping unsafe
            work
            </li>
            <li>
            <strong>MHSWR Reg.8:</strong> Procedures for serious and imminent danger
            </li>
            <li>
            <strong>ERA 1996 s.44:</strong> Protection from detriment for raising health and
            safety concerns
            </li>
            <li>
            <strong>CDM Reg.15:</strong> Duty to report dangerous conditions
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            When to Use Stop Work Authority
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Discovery of unexpected live electrical equipment</li>
            <li>Suspected or confirmed asbestos-containing materials</li>
            <li>Gas leaks or suspicious odours</li>
            <li>Structural instability or collapse risk</li>
            <li>
            Missing or defective safety equipment (harnesses, barriers, permits)
            </li>
            <li>
            Weather conditions making work dangerous (lightning, high winds, flooding)
            </li>
            <li>Workers impaired by fatigue, illness, or intoxication</li>
            <li>Any situation where someone could be seriously injured</li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Stop Work Process</p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>1. Stop</strong> — Action: Cease work immediately. Warn others in the area.</li>
            <li><strong>2. Secure</strong> — Action: Make the area safe. Isolate hazards where possible.</li>
            <li><strong>3. Report</strong> — Action: Inform supervisor and site management immediately.</li>
            <li><strong>4. Document</strong> — Action: Record what was found, actions taken, and who was informed.</li>
            <li><strong>5. Await</strong> — Action: Do not resume until authorised and hazard is controlled.</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Remember:</strong> No one should ever be criticised for stopping work due to
            genuine safety concerns. If you are uncertain, it is always better to stop and check
            than to continue and cause an incident.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Building Services Scenarios">
            <p><strong>Scenario 1: Live Plant Discovery</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Situation:</strong> You arrive to work on a distribution board that should
            be isolated per the permit to work. Upon opening the panel and testing, you find the
            busbar is still live.
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p>
            <strong>STOP:</strong> Close the panel immediately. Move away from the equipment.
            </p>
            <p className="mt-2">
            <strong>LOOK:</strong> Check isolation point - is the isolator actually off? Is
            there a second supply?
            </p>
            <p className="mt-2">
            <strong>ASSESS:</strong> This is a serious failure of the isolation procedure.
            Work cannot proceed.
            </p>
            <p className="mt-2">
            <strong>MANAGE:</strong> Barrier the area. Report to site manager and permit
            issuer. Do not proceed until correct isolation is proven dead and permit reissued.
            </p>
            <p className="mt-2 text-red-400">
            This is a near-miss that must be formally reported and investigated.
            </p>
            </div>
            

            
            <p><strong>Scenario 2: Occupied Building - Fire Alarm Activation</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Situation:</strong> While installing containment in a functioning office
            building, the fire alarm activates. You are on a mobile tower working at height.
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p>
            <strong>STOP:</strong> Stop work immediately. Do not assume it is a false alarm or
            drill.
            </p>
            <p className="mt-2">
            <strong>LOOK:</strong> Check for signs of actual fire (smoke, flames). Note your
            escape routes.
            </p>
            <p className="mt-2">
            <strong>ASSESS:</strong> Can you descend safely and quickly? Is your equipment
            blocking evacuation routes?
            </p>
            <p className="mt-2">
            <strong>MANAGE:</strong> Descend immediately. Leave tools secure but do not delay
            evacuation to secure equipment. Follow building evacuation procedures. Account for
            all your team at the assembly point.
            </p>
            <p className="mt-2 text-yellow-400">
            Before resuming work, verify with building management that it is safe to return.
            </p>
            </div>
            

            
            <p><strong>Scenario 3: Unexpected Asbestos Discovery</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Situation:</strong> While pulling cable through a ceiling void, you disturb
            material that appears to be asbestos insulation board around old pipework. This was
            not identified in the refurbishment survey.
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p>
            <strong>STOP:</strong> Stop work immediately. Do not disturb the material further.
            </p>
            <p className="mt-2">
            <strong>LOOK:</strong> Assess the extent of material visible. Note if any appears
            damaged or friable.
            </p>
            <p className="mt-2">
            <strong>ASSESS:</strong> This is a potential asbestos exposure. The area must be
            treated as contaminated until proven otherwise.
            </p>
            <p className="mt-2">
            <strong>MANAGE:</strong> Leave the area calmly. Prevent others from entering.
            Report to site manager immediately. The area must be sealed and material tested
            before any work continues. Record your potential exposure.
            </p>
            <p className="mt-2 text-red-400">
            This triggers legal duties under CAR 2012. Work cannot resume until a licensed
            asbestos survey is completed.
            </p>
            </div>
            

            
            <p><strong>Scenario 4: Multi-Trade Conflict</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Situation:</strong> You are testing emergency lighting circuits when a
            mechanical contractor begins hot works (welding) in the same plantroom. This was not
            coordinated in the site meeting.
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p>
            <strong>STOP:</strong> Pause your testing. Do not assume the hot works permit
            covers your presence.
            </p>
            <p className="mt-2">
            <strong>LOOK:</strong> Check for fire hazards near your work area. Is there
            adequate ventilation? Fire watch in place?
            </p>
            <p className="mt-2">
            <strong>ASSESS:</strong> Hot works create additional hazards (fire, fumes, UV).
            Your emergency lighting test may affect the mechanical contractor's work too.
            </p>
            <p className="mt-2">
            <strong>MANAGE:</strong> Communicate with the other contractor. Agree safe working
            arrangements or work in different areas at different times. Inform both
            supervisors of the coordination issue.
            </p>
            <p className="mt-2 text-yellow-400">
            This is a site coordination failure that should be raised at the next site
            meeting.
            </p>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <div>
            <p><strong>SLAM Quick Reference</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>S - Stop:</strong> Create a mental pause before acting
            </li>
            <li>
            <strong>L - Look:</strong> Use all senses to identify hazards
            </li>
            <li>
            <strong>A - Assess:</strong> Evaluate risk and control adequacy
            </li>
            <li>
            <strong>M - Manage:</strong> Implement controls or stop work
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Take 5 Checklist Summary</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Task:</strong> Understand the work and your competence
            </li>
            <li>
            <strong>Environment:</strong> Check conditions around you
            </li>
            <li>
            <strong>Equipment:</strong> Right tools in good condition
            </li>
            <li>
            <strong>Hazards:</strong> Identify all potential harm sources
            </li>
            <li>
            <strong>Controls:</strong> Ensure adequate protection measures
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Stop Work Authority Triggers</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Unexpected live electrical equipment</li>
            <li>Suspected asbestos or other hazardous materials</li>
            <li>Gas or chemical leaks</li>
            <li>Structural concerns</li>
            <li>Missing or defective safety equipment</li>
            <li>Any immediate danger to people</li>
            </ul>
            </div>

            <div>
            <p><strong>Common Mistakes to Avoid</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Complacency:</strong> "I've done this job hundreds of times"
            </li>
            <li>
            <strong>Time pressure:</strong> "I'll just crack on, nearly finished"
            </li>
            <li>
            <strong>Assuming:</strong> "Someone else will have checked that"
            </li>
            <li>
            <strong>Not reporting:</strong> "It turned out okay so no need to tell anyone"
            </li>
            <li>
            <strong>Peer pressure:</strong> "No one else has stopped work"
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Cable installation interrupted by an unmarked live service"
            situation={
              <>
                Your team is pulling LV cabling through a ceiling void following a written RAMS.
                Mid-task they discover a live, unmarked, single-insulated cable they had not
                been briefed on. The original RA does not cover this hazard.
              </>
            }
            whatToDo={
              <>
                Stop the task. Apply STAR. Step out, isolate where possible, photograph the
                cable, identify the source. Update the written RA before resuming. If the source
                cannot be identified, treat as live and mandate exclusion. Brief the team and
                record the dynamic decision in the day log. Escalate to the principal contractor
                so all other trades are warned.
              </>
            }
            whyItMatters={
              <>
                Continuing the task on the basis of the original RA would be both an EAWR Reg
                14 breach and an MHSWR Reg 3(3) breach. The DRA is the legal mechanism that
                lets the operative pause and re-set without becoming the duty-holder for an
                avoidable injury.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Dynamic risk assessment is the in-the-moment review when conditions change — bridge between the written RA and operational reality.',
              'STAR (Stop, Think, Act, Review), SLAM (Stop, Look, Assess, Manage), Take 5 — adopt one method and train consistently.',
              'MHSWR Reg 3(3) is the legal anchor — the moment the RA is no longer valid, the duty-holder must review it.',
              'Trigger points: start of task, change of condition, change of personnel, return after a break, any new hazard.',
              'DRA never replaces the written RA — it supplements and triggers an update.',
              'Material DRA decisions go in the day log, near-miss report or safety observation system — leaving an audit trail.',
              'Coach the workforce — confidence to stop work is a culture issue, not a procedural one.',
              'Escalate when the new hazard exceeds the team&rsquo;s competence — supervisor first, principal contractor next, designer if a fundamental design change is needed.',
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
              onClick={() => navigate('../h-n-c-module1-section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 3
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section2_6;
