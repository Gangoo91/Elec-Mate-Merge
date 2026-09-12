/**
 * MOET · Module 1 · Section 1.3 · Subsection 5 — Dynamic Risk Assessments
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
 *              · "Individual maintenance technician's roles and
 *                 responsibilities. Escalation procedures."
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
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Dynamic Risk Assessments - MOET Module 1 Section 3.5';
const DESCRIPTION =
  'Comprehensive guide to dynamic risk assessment for electrical maintenance technicians: when formal RA is not enough, SLAM technique, point-of-work assessment, when to stop work, escalation process and real-world electrical maintenance examples.';

const quickCheckQuestions = [
  {
    id: 'dynamic-ra-definition',
    question: 'A dynamic risk assessment is best described as:',
    options: [
      'A written assessment completed by a manager before work begins and filed for the records',
      'A one-off inspection of the work area carried out only at the end of the task',
      'A continuous, mental process of assessing and responding to changing conditions at the point of work in real time',
      'A legally required document that replaces the formal written risk assessment',
    ],
    correctIndex: 2,
    explanation:
      'A dynamic risk assessment is a continuous, real-time process of observing conditions at the point of work, identifying new or changed hazards, evaluating the risk, and deciding on the appropriate response — including stopping work if necessary. It supplements (but does not replace) the formal written risk assessment and runs continuously throughout the task.',
  },
  {
    id: 'slam-technique',
    question: 'What does the SLAM acronym stand for?',
    options: [
      'Survey, List, Act, Monitor',
      'Secure, Locate, Avoid, Mitigate',
      'Safety, Leadership, Awareness, Management',
      'Stop, Look, Assess, Manage',
    ],
    correctIndex: 3,
    explanation:
      'SLAM stands for Stop, Look, Assess, Manage. It is a simple, memorable technique for carrying out a dynamic risk assessment at the point of work. Stop what you are doing; Look at the task and surroundings; Assess the hazards and risks; Manage the situation by implementing controls, modifying the task, or stopping work if the risk is too high.',
  },
  {
    id: 'when-to-stop',
    question:
      'In which of the following situations should a maintenance technician stop work immediately?',
    options: [
      'When a circuit confirmed dead is found live, or an unexpected hazard outside the risk assessment appears',
      'When the work is running slightly over the time allowed for it on the job sheet',
      'When a colleague on an unrelated task asks a question about a completely different job',
      "When the method statement names a tool that is not part of the technician's usual kit",
    ],
    correctIndex: 0,
    explanation:
      'Work must stop immediately when conditions change to the point where the existing risk assessment and method statement are no longer valid — particularly when an unexpected, serious hazard is discovered. Finding a circuit live when it was supposed to be dead is a critical safety failure that requires immediate stop-work, withdrawal to a safe area, and investigation before any further activity.',
  },
  {
    id: 'documenting-dynamic-ra',
    question: 'Should the findings of a dynamic risk assessment be documented?',
    options: [
      'No — it is a purely mental process and should never be written down anywhere',
      "Only the technician's personal opinion of how the job went needs to be recorded",
      'Yes — significant findings should be recorded, especially where work was stopped, modified or a hazard found',
      'Only if an injury actually occurred during the task and a report has to be filed',
    ],
    correctIndex: 2,
    explanation:
      'While dynamic risk assessment is a real-time mental process, significant findings should be documented. If you stopped work due to a new hazard, modified the work method, or identified a condition not covered by the formal risk assessment, this should be recorded. The record feeds back into the formal risk assessment system, triggering a review and update. It also provides evidence of competent decision-making if the decision is later questioned.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Dynamic risk assessment is needed because:',
    options: [
      'It is a legal substitute for producing a written risk assessment',
      'Workplace conditions can change after the formal risk assessment was written, and new hazards can emerge during the work',
      'It allows the formal risk assessment to be skipped on low-risk jobs',
      'It transfers responsibility for safety from the worker to the supervisor',
    ],
    correctAnswer: 1,
    explanation:
      'No written risk assessment can anticipate every possible condition or change that may occur during the work. Workplace conditions are dynamic — weather changes, other contractors begin nearby work, hidden hazards are revealed, equipment fails, and unexpected situations arise. Dynamic risk assessment enables workers to respond to these changes in real time, adjusting their approach to maintain safety.',
  },
  {
    id: 2,
    question: 'The SLAM technique should be applied:',
    options: [
      'Only once, immediately before starting the task',
      'Only when the supervisor specifically instructs it',
      'Continuously throughout the task, and whenever conditions change or something does not seem right',
      'Only after an incident or near-miss has already occurred',
    ],
    correctAnswer: 2,
    explanation:
      'SLAM is a continuous process, not a one-off check. You should apply it throughout the task — particularly when transitioning between steps, when conditions change, when you feel uncertain about something, or when your instinct tells you something is not right. Effective dynamic risk assessment becomes a habit — an automatic mental process that runs alongside the physical work.',
  },
  {
    id: 3,
    question:
      'During a cable installation, you discover what appears to be asbestos insulation board in the ceiling void. Your dynamic risk assessment response should be:',
    options: [
      'Carefully remove a small sample yourself and send it off to confirm whether it is asbestos',
      'Continue working but wear a dust mask as a precaution against any released fibres',
      'Cover the material over, carry on with the task, and note it in your report at the end',
      'Stop work, withdraw, secure the area to keep others out, and report it without disturbing the material',
    ],
    correctAnswer: 3,
    explanation:
      'Discovery of suspected asbestos is a critical stop-work trigger. You must stop work immediately and withdraw from the area without disturbing the material (which could release fibres). Secure the area to prevent others entering, and report to your supervisor. Only licensed asbestos removal contractors can handle asbestos-containing materials. The formal risk assessment and method statement must be reviewed before work can resume.',
  },
  {
    id: 4,
    question: "A 'point-of-work risk assessment' is:",
    options: [
      'A risk assessment carried out at the actual work location, verifying that the conditions match the formal risk assessment',
      "A generic assessment written in the office covering all the company's typical jobs",
      'A summary of accident statistics produced for the annual safety report',
      'A checklist completed only after the work has been finished and signed off',
    ],
    correctAnswer: 0,
    explanation:
      'A point-of-work risk assessment is carried out at the actual work location, typically just before work begins. Its purpose is to verify that the conditions described in the formal risk assessment are actually present and that the planned controls are appropriate. It is the bridge between the written document (which may have been prepared days or weeks earlier) and the real-time conditions on site.',
  },
  {
    id: 5,
    question:
      'Which of the following is an example of a changing condition that should trigger a dynamic risk assessment during electrical maintenance?',
    options: [
      'The job taking place during normal working hours as planned',
      'Water beginning to leak into the switchroom from a burst pipe above',
      'The correct tools being available and in good condition',
      'The formal risk assessment having been signed off by a manager',
    ],
    correctAnswer: 1,
    explanation:
      'Water leaking into a switchroom is a serious, changing condition that immediately increases the risk of electric shock and short circuit. This should trigger an immediate stop-work response, withdrawal to a safe area, and notification of the supervisor. The formal risk assessment did not anticipate this condition, so the existing controls are no longer adequate. The situation must be resolved (water stopped, switchroom dried out) before work can resume.',
  },
  {
    id: 6,
    question: 'The escalation process for a dynamic risk assessment finding means:',
    options: [
      'Attempting to deal with every hazard yourself first, before telling anyone else about it',
      'Recording the hazard in your report and returning to deal with it on your next site visit',
      'Reporting it to the person in charge to decide the response, especially if it is beyond your competence',
      'Carrying on with the work and only reporting the hazard later if it actually causes harm',
    ],
    correctAnswer: 2,
    explanation:
      'Escalation means reporting the finding up the management chain to someone with the authority and competence to deal with it. If you discover a hazard that is beyond your ability to control — for example, a structural concern, a suspected gas leak, or an asbestos find — you must stop work and escalate immediately. Do not attempt to manage hazards outside your competence. The person in charge can then decide on the appropriate response, which may involve specialist contractors, additional resources, or a formal reassessment.',
  },
  {
    id: 7,
    question:
      'A maintenance technician is working on a distribution board and notices that a colleague on the same site has removed the lock from an isolator that forms part of their safe isolation. They should:',
    options: [
      'Assume the colleague had a good reason for removing it and carry on with the work',
      'Quietly replace the lock and say nothing to the colleague, to avoid any confrontation',
      'Finish the current step of the task first, then raise it with the colleague afterwards',
      'Stop immediately, prove their circuit dead again, and challenge the colleague — isolation may be compromised',
    ],
    correctAnswer: 3,
    explanation:
      'The removal of a lock from an isolation point is a critical safety event. The maintenance technician must stop work immediately because their safe isolation may have been compromised. They should verify that their circuit is still dead (prove dead again), and challenge the colleague to understand why the lock was removed. This situation must be resolved before any further work — it is a potential fatal hazard that demands immediate action, not a note in a report.',
  },
  {
    id: 8,
    question: 'Training for dynamic risk assessment should include:',
    options: [
      'Hazard recognition, the SLAM technique, decision-making, when to stop work, and the escalation process',
      'Only the legal duties placed on the employer under health and safety legislation',
      'Only manual handling and working-at-height techniques relevant to maintenance work',
      'Only how to complete the company accident report form after an incident occurs',
    ],
    correctAnswer: 0,
    explanation:
      'Effective dynamic risk assessment requires training in hazard recognition (knowing what to look for), structured techniques like SLAM (knowing how to assess), decision-making frameworks (knowing what to do with the information), knowledge of stop-work authority (knowing when and how to stop), and the escalation process (knowing who to tell). While experience builds competence over time, formal training provides the foundation that makes dynamic assessment systematic rather than haphazard.',
  },
  {
    id: 9,
    question:
      'Which of the following best describes the relationship between formal risk assessment and dynamic risk assessment?',
    options: [
      'Dynamic risk assessment replaces the formal risk assessment as soon as work begins on site',
      'The formal assessment sets the planned framework; the dynamic one runs at the point of work to catch changes',
      'The formal risk assessment is only needed for high-risk work, and the dynamic one for low-risk work',
      'They are simply two different names for exactly the same single safety document',
    ],
    correctAnswer: 1,
    explanation:
      'The two types of assessment are complementary. The formal risk assessment provides the planned framework — it identifies anticipated hazards, evaluates risks, and specifies controls before work begins. The dynamic risk assessment operates in real time at the point of work, monitoring actual conditions, identifying changes, and responding to situations that the formal assessment did not or could not anticipate. Both are needed for safe work.',
  },
  {
    id: 10,
    question:
      'During live fault-finding on a control panel, the maintenance technician notices an unusual burning smell that was not present when work started. The correct response is:',
    options: [
      'Ignore the smell, treating burning odours as normal when working on live equipment',
      'Work faster to finish the task before the source of the smell can develop into a fault',
      'Apply SLAM: stop, find the source, assess the hazard, and manage by withdrawing, de-energising and reporting',
      'Open a window to clear the smell from the area and carry on without any further action',
    ],
    correctAnswer: 2,
    explanation:
      'A burning smell in an electrical panel indicates potential overheating, insulation breakdown, or an incipient fault — all serious hazards. The SLAM technique provides a structured response: Stop the current activity; Look for the source (visual inspection, thermal observation); Assess whether it represents a new or escalating hazard; Manage by withdrawing to a safe distance, de-energising the panel if it can be done safely, and reporting to the supervisor. Do not ignore unusual conditions — they are often early warning signs of serious failures.',
  },
  {
    id: 11,
    question: 'Every worker on site has the authority to:',
    options: [
      'Stop work only after first obtaining the prior written permission of the site manager',
      'Stop work only if they hold a recognised supervisory or management position on site',
      'Stop work only at the end of the shift, even if a hazard was first noticed much earlier',
      'Stop work if they believe there is an imminent risk of serious injury — a fundamental right and duty',
    ],
    correctAnswer: 3,
    explanation:
      'Every worker has both the right and the duty to stop work if they believe there is an imminent risk of serious personal injury. This is established by the Management of Health and Safety at Work Regulations 1999 (Regulation 8) and reinforced by the Health and Safety at Work Act 1974 (Section 7). No qualification, job title or seniority is needed — if you believe the situation is dangerous, stop and report. No reputable employer will penalise a worker for stopping work on genuine safety grounds.',
  },
  {
    id: 12,
    question:
      'Under ST1426, the ability to carry out dynamic risk assessment is part of which competence area?',
    options: [
      'Safe working practices and personal responsibility for health and safety',
      'Fault diagnosis and rectification on electrical systems',
      'Planning and scheduling of preventive maintenance activities',
      'Interpretation of engineering drawings and technical documentation',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 requires maintenance technicians to demonstrate competence in safe working practices, which includes the ability to assess risk dynamically at the point of work, make appropriate decisions about whether to proceed, and take personal responsibility for their own safety and the safety of others. This is assessed in the end-point assessment through the professional discussion (where you describe how you have applied dynamic risk assessment in practice) and the practical observation (where assessors observe your real-time safety awareness).',
  },
];

const faqs = [
  {
    question: 'Is a dynamic risk assessment the same as a formal risk assessment?',
    answer:
      'No. A formal risk assessment is a documented, structured process carried out before work begins. It identifies anticipated hazards, evaluates risks, and specifies control measures. A dynamic risk assessment is a continuous, real-time mental process carried out during the work — it monitors conditions, identifies changes, and responds to new hazards as they emerge. The dynamic assessment supplements the formal assessment; it does not replace it. You always need a formal risk assessment as the foundation, with dynamic assessment running on top during the work.',
  },
  {
    question: 'What is the SLAM technique and when should I use it?',
    answer:
      'SLAM stands for Stop, Look, Assess, Manage. It is a simple, memorable technique for carrying out a dynamic risk assessment at the point of work. You should use it: before starting each new step of a task, whenever conditions change, whenever something feels wrong or unusual, when you feel rushed or pressured, and whenever you are uncertain about whether it is safe to proceed. SLAM takes only a few seconds and should become a habitual part of your working practice.',
  },
  {
    question: 'Can I refuse to work if I believe the conditions are unsafe?',
    answer:
      'Yes. Under the Management of Health and Safety at Work Regulations 1999 (Regulation 8), an employer must establish procedures for workers to follow in the event of serious and imminent danger. Workers are entitled to stop work and move to a place of safety if they believe they are in serious and imminent danger. The Employment Rights Act 1996 provides protection against dismissal or detriment for refusing to work in dangerous conditions. If you believe conditions are unsafe, stop work, withdraw to a safe area, and report your concerns. A responsible employer will support this decision.',
  },
  {
    question: 'How do I develop my dynamic risk assessment skills?',
    answer:
      'Dynamic risk assessment is a skill that develops with training and experience. Start with formal training in hazard recognition and the SLAM technique. Then practise applying it consciously during every task — pause at each step, look around, check conditions. Over time it becomes more automatic. Learn from experienced colleagues, discuss near-misses and what-if scenarios, and reflect on situations where you have had to adapt your approach. Regular toolbox talks on dynamic risk assessment help reinforce the skill across the team.',
  },
  {
    question:
      'What should I do if my supervisor tells me to continue working when I believe the conditions are unsafe?',
    answer:
      'Your personal safety is paramount. If you genuinely believe the conditions are unsafe, you have the legal right to stop work regardless of what your supervisor says. Calmly explain your concerns, pointing to the specific hazard or changed condition. If the supervisor insists, do not resume work — escalate to the next level of management, the site safety officer, or your safety representative. Document the interaction. The Health and Safety at Work Act 1974 protects you from reprisal for acting on genuine safety concerns. No job is worth risking your life.',
  },
];

const MOETModule1Section3_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.3 · Subsection 5"
        title="Dynamic Risk Assessments"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Real-time hazard assessment and response when conditions change.
          </p>

          <TLDR
            points={[
              'Dynamic RA: continuous, real-time assessment at the point of work.',
              'SLAM: Stop, Look, Assess, Manage.',
              'Purpose: respond to conditions the formal RA did not anticipate.',
              'Authority: every worker can stop work for safety.',
              'Triggers: unexpected live conductors, water ingress, asbestos discovery.',
              'Response: stop, secure, withdraw, report, reassess.',
              'Escalation: report beyond your competence to supervisor/safety manager.',
              'ST1426: personal responsibility for safety in changing conditions.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain when and why dynamic risk assessment is needed alongside formal assessment',
              'Apply the SLAM technique at the point of work',
              'Carry out a point-of-work risk assessment before starting a task',
              'Recognise conditions that require you to stop work immediately',
              'Understand the escalation process for hazards beyond your competence',
              'Document dynamic risk assessment findings to feed back into formal assessment',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why dynamic risk assessment is needed</ContentEyebrow>

          <ConceptBlock title="The written risk assessment has inherent limitations">
            <p>
              A formal, written risk assessment is essential — but it has inherent limitations. It
              is prepared before the work begins, often by someone who may not be at the point of
              work when conditions change. It cannot anticipate every situation that may arise
              during a task. Workplace conditions are inherently dynamic: weather changes, other
              workers arrive, equipment fails, hidden hazards are revealed, and situations evolve in
              ways that no document could fully predict.
            </p>
            <p>
              Dynamic risk assessment bridges this gap. It is the continuous, real-time process of
              observing conditions at the point of work, identifying new or changed hazards,
              evaluating whether the existing controls are still adequate, and deciding on the
              appropriate response. It is not an alternative to formal risk assessment — it is the
              essential companion to it, running in parallel throughout the task.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Limitations of formal risk assessment that dynamic RA addresses">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Time lag:</strong> The formal RA may have been written days, weeks or even
                months before the work. Conditions on site may have changed significantly
              </li>
              <li>
                <strong>Incomplete information:</strong> The formal RA is based on the information
                available at the time of writing. Hidden hazards — concealed cables, asbestos,
                structural defects — only become apparent during the work
              </li>
              <li>
                <strong>Changing environment:</strong> Weather, temperature, lighting, noise levels,
                and the activities of other workers can all change during the task
              </li>
              <li>
                <strong>Unforeseen events:</strong> Equipment failure, spillages, power outages,
                emergencies on adjacent areas, unexpected personnel entering the work zone
              </li>
              <li>
                <strong>Human factors:</strong> Fatigue, distraction, stress, illness and changes in
                crew composition can all affect risk levels during the work
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title='The danger of "it&apos;s in the risk assessment"'
            whatHappens={
              <>
                One of the most dangerous phrases in safety management is &quot;it&apos;s in the
                risk assessment&quot; — used to justify proceeding with work when conditions have
                changed. A risk assessment is only valid for the conditions it was written for. If
                those conditions have changed, the assessment may be dangerously inadequate.
              </>
            }
            doInstead={
              <>
                Never assume the written document is still correct — always verify conditions at the
                point of work. If reality does not match the paperwork, stop and reassess.
              </>
            }
          />

          <ConceptBlock title="A safety net, not a replacement">
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Dynamic risk assessment is not a replacement for formal
              planning. It is the safety net that catches the hazards that formal assessment missed.
              The better the formal assessment, the fewer surprises the dynamic assessment will find
              — but some level of dynamic assessment is always necessary because no plan is perfect.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>The SLAM technique</ContentEyebrow>

          <ConceptBlock title="A mental framework you can apply in seconds">
            <p>
              SLAM is a simple, structured technique for carrying out dynamic risk assessment at the
              point of work. The acronym stands for Stop, Look, Assess, Manage. It provides a mental
              framework that can be applied quickly — in seconds — at any point during the work.
              With practice, it becomes a habitual part of your working routine.
            </p>
          </ConceptBlock>

          <ConceptBlock title="S — Stop">
            <p>
              Pause what you are doing. Take a moment to step back mentally from the task. This is
              not a long pause — even a few seconds of deliberate attention makes a difference. The
              purpose is to break the automatic flow of work and engage your conscious awareness of
              the environment.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Before starting each new step of the method statement</li>
              <li>Whenever you notice something has changed</li>
              <li>When transitioning between different activities</li>
              <li>When you feel rushed, tired or uncertain</li>
              <li>When your instinct tells you something is not right</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="L — Look">
            <p>
              Actively observe your surroundings. Look at the task itself, the immediate work area,
              and the wider environment. Use all your senses — sight, hearing, smell and touch can
              all provide information about hazards.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Look at the specific equipment or area you are about to work on</li>
              <li>
                Check for changes since you last assessed — new obstructions, different lighting,
                additional people
              </li>
              <li>Listen for unusual sounds — buzzing, arcing, machinery starting nearby</li>
              <li>Smell for burning, chemicals, or unfamiliar odours</li>
              <li>Look up, down and behind you — hazards can be in any direction</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="A — Assess">
            <p>
              Evaluate what you have observed. Are the conditions as expected? Are the controls
              still in place and effective? Has anything changed since the risk assessment was
              written? Is the risk level still acceptable?
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Do the conditions match the risk assessment and method statement?</li>
              <li>Are all the planned controls still in place? (locks, signs, barriers, PPE)</li>
              <li>Has a new hazard appeared that was not anticipated?</li>
              <li>
                Has the risk level changed? (e.g., water ingress, additional people, equipment
                failure)
              </li>
              <li>Am I competent to manage this situation, or do I need to escalate?</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="M — Manage">
            <p>
              Take action based on your assessment. There are four possible responses, in order of
              escalation:
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Proceed:</strong> Conditions are as expected, controls are in place —
                continue with the task
              </li>
              <li>
                <strong>Adapt:</strong> Minor changes needed — add an additional control, adjust
                your approach, take extra care
              </li>
              <li>
                <strong>Stop and seek advice:</strong> Conditions have changed significantly — stop
                work and consult your supervisor before proceeding
              </li>
              <li>
                <strong>Stop and withdraw:</strong> Immediate danger — stop all work, withdraw to a
                safe area, and report. Do not resume until the hazard is resolved
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> SLAM is not bureaucracy — it is a mental habit that takes
              seconds. The best maintenance technicians apply it automatically, almost
              unconsciously, throughout their work. It is the difference between working safely and
              working complacently.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Point-of-work risk assessment</ContentEyebrow>

          <ConceptBlock title="More formal than SLAM, less formal than a written RA">
            <p>
              A point-of-work risk assessment is a structured check carried out at the actual work
              location, typically just before work begins. It is more formal than the continuous
              SLAM process but less formal than a full written risk assessment. Its purpose is to
              verify that the conditions on site match those described in the formal risk assessment
              and that the planned controls are appropriate and in place.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The point-of-work check process">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Arrive at the work area:</strong> Before unpacking tools or starting work,
                walk the area and observe
              </li>
              <li>
                <strong>Compare with the RA/MS:</strong> Does the work area match what was described
                in the risk assessment and method statement? Are the expected conditions present?
              </li>
              <li>
                <strong>Check access routes:</strong> Are they clear and safe? Can you get out
                quickly in an emergency?
              </li>
              <li>
                <strong>Verify isolation:</strong> If the work requires safe isolation, verify that
                it is in place and effective before touching any equipment
              </li>
              <li>
                <strong>Check for new hazards:</strong> Are there any hazards that were not in the
                formal assessment? Other work activities? Changed environmental conditions?
              </li>
              <li>
                <strong>Confirm emergency arrangements:</strong> Where is the nearest first aid kit?
                Fire extinguisher? Emergency exit? How would you call for help?
              </li>
              <li>
                <strong>Brief the team:</strong> Share your findings with the work team before
                starting. If you have identified any differences from the planned conditions,
                discuss them and agree on how to proceed
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="When the check is clear">
            <p>
              If the point-of-work check confirms that conditions match the risk assessment and all
              controls are in place, proceed with the task as planned. Continue to apply SLAM
              throughout the work to monitor for changes.
            </p>
          </ConceptBlock>

          <ConceptBlock title="When the check reveals differences">
            <p>
              If conditions differ from the risk assessment, do not proceed with the original plan.
              Assess whether the differences can be managed with additional controls on site, or
              whether the risk assessment and method statement need formal revision. For significant
              differences — unexpected hazards, missing controls, changed conditions — stop and
              escalate before proceeding.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The mental model for dynamic assessment">
            <p>
              Experienced technicians develop an internal mental model — a picture of what
              &quot;normal&quot; and &quot;safe&quot; looks like for their work. This model is built
              through training, experience and reflection. When conditions match the mental model,
              work proceeds smoothly. When something deviates from the model — an unusual sight,
              sound, smell or feeling — the technician&apos;s awareness is triggered, and they
              instinctively apply SLAM.
            </p>
            <p>
              Building this mental model takes time and deliberate practice. As an apprentice or
              early-career technician, you can accelerate the process by: paying close attention
              during work, asking experienced colleagues why they do things a certain way, reviewing
              incidents and near-misses to understand what went wrong, and mentally rehearsing
              &quot;what if&quot; scenarios before starting work.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>When to stop work and the escalation process</ContentEyebrow>

          <ConceptBlock title="Both a right and a duty">
            <p>
              Knowing when to stop work is arguably the most important safety skill a maintenance
              technician can have. It requires both technical knowledge (to recognise danger) and
              personal courage (to act on that recognition, even under pressure to continue). Under
              the Management of Health and Safety at Work Regulations 1999 (Regulation 8), every
              worker has the right — and the duty — to stop work when they believe there is serious
              and imminent danger.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Stop-work triggers in electrical maintenance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-red-400/70">
              <li>
                <strong>Unexpected live conductors:</strong> A circuit that should be dead is found
                to be live — immediate withdrawal, re-verification of isolation, investigation
              </li>
              <li>
                <strong>Water ingress:</strong> Water entering an electrical enclosure or the work
                area — stop work, de-energise if safe, report the water source
              </li>
              <li>
                <strong>Suspected asbestos:</strong> Discovery of materials that may contain
                asbestos — stop work, do not disturb, withdraw, secure the area, report
              </li>
              <li>
                <strong>Structural concern:</strong> Crumbling walls, unstable floors or ceilings,
                particularly in old buildings where you are fixing equipment
              </li>
              <li>
                <strong>Gas smell:</strong> Any smell of gas requires immediate evacuation and
                emergency response — do not switch electrical equipment on or off (arc risk)
              </li>
              <li>
                <strong>Arc flash indicators:</strong> Scorching, melting, loud buzzing from
                switchgear — suggests an incipient arc fault; withdraw immediately
              </li>
              <li>
                <strong>Compromised isolation:</strong> Lock removed, isolation point found open,
                permit conditions breached
              </li>
              <li>
                <strong>Changed site conditions:</strong> New excavation near your cable route,
                scaffolding erected around your work area, other high-risk work starting nearby
              </li>
              <li>
                <strong>Personal incapacity:</strong> Feeling unwell, severely fatigued, or unable
                to concentrate safely
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The escalation process">
            <p>
              When you identify a hazard that is beyond your authority or competence to manage, you
              must escalate it to someone who can deal with it. The escalation process should be:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Immediate:</strong> For imminent danger — verbal alert to those in the
                vicinity, then immediate report to supervisor/site manager. If no supervisor
                available, call emergency services for life-threatening situations
              </li>
              <li>
                <strong>Urgent:</strong> For serious but not immediately life-threatening hazards —
                verbal report to supervisor as soon as practicable, followed by a written hazard
                report
              </li>
              <li>
                <strong>Routine:</strong> For hazards that need attention but do not require
                immediate action — written hazard report through the organisation&apos;s reporting
                system
              </li>
            </ul>
            <p>
              Always confirm that your escalation has been received and actioned. If the person you
              escalate to does not take appropriate action, escalate further up the management
              chain, or to the site safety officer or your safety representative.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Overcoming pressure to continue">
            <p>
              In practice, there can be significant pressure to continue working — from clients
              wanting to meet deadlines, from supervisors focused on productivity, and from your own
              desire to complete the job. This pressure is one of the biggest challenges to
              effective dynamic risk assessment. Remember: no job is worth risking a life. The
              Employment Rights Act 1996 protects you from dismissal or detriment for refusing to
              work in dangerous conditions. Any employer that penalises a worker for a genuine
              stop-work decision is acting unlawfully and unethically. If you encounter this, report
              it through your safety representative, trade union, or directly to the HSE.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Documenting findings and training requirements</ContentEyebrow>

          <ConceptBlock title="Three purposes for a mental process">
            <p>
              While dynamic risk assessment is primarily a real-time mental process, significant
              findings should be documented. Documentation serves three purposes: it creates an
              evidence trail of competent decision-making, it feeds information back into the formal
              risk assessment system, and it captures lessons learned that can prevent future
              incidents.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What to document">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stop-work decisions:</strong> Why work was stopped, what hazard was
                identified, what action was taken, who was notified
              </li>
              <li>
                <strong>Work method changes:</strong> Any deviation from the method statement — what
                was changed, why, and what additional controls were applied
              </li>
              <li>
                <strong>New hazards discovered:</strong> Hazards not covered by the formal risk
                assessment — description, location, immediate action taken, recommendation for
                formal RA update
              </li>
              <li>
                <strong>Near-misses:</strong> Situations where harm was narrowly avoided — the
                near-miss report feeds into the organisation&apos;s safety learning system
              </li>
              <li>
                <strong>Conditions different from RA:</strong> Where site conditions did not match
                the written risk assessment — what the difference was and how it was managed
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Feeding back into formal assessment">
            <p>
              The findings from dynamic risk assessment should trigger a review of the formal risk
              assessment. This creates a continuous improvement cycle:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Formal RA written</strong> — identifies anticipated hazards and controls
              </li>
              <li>
                <strong>Work begins</strong> — dynamic RA monitors actual conditions
              </li>
              <li>
                <strong>New hazards found</strong> — documented and reported
              </li>
              <li>
                <strong>Formal RA updated</strong> — incorporates new information
              </li>
              <li>
                <strong>Future work benefits</strong> — the next team has a better, more
                comprehensive formal RA
              </li>
            </ul>
            <p>
              This feedback loop is a key element of continuous improvement in safety management and
              is a behaviour that ST1426 expects maintenance technicians to demonstrate.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Training requirements for dynamic risk assessment">
            <p>
              Effective dynamic risk assessment requires a combination of knowledge, skills and
              behaviours that must be developed through formal training and practical experience:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Training area</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Hazard recognition
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Knowing what to look for — visual indicators, sounds, smells that signal
                      danger in electrical maintenance
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">SLAM technique</td>
                    <td className="border border-white/10 px-3 py-2">
                      Structured approach to continuous assessment — Stop, Look, Assess, Manage
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Decision-making
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Knowing when to proceed, adapt, seek advice or stop work — and having the
                      confidence to act
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Stop-work authority
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Understanding your legal right and duty to stop work; the escalation process;
                      protection from reprisal
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Scenario practice
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Practising dynamic RA through scenario exercises, toolbox talks, and post-task
                      debriefs
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Human factors</td>
                    <td className="border border-white/10 px-3 py-2">
                      Understanding how fatigue, stress, complacency and confirmation bias affect
                      your ability to recognise hazards
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Real-world electrical maintenance scenarios">
            <p>
              The following scenarios illustrate how dynamic risk assessment works in practice for
              electrical maintenance technicians:
            </p>
          </ConceptBlock>

          <Scenario
            title="Scenario 1: Unexpected live conductor"
            situation={
              <>
                While tracing a fault in a ceiling void, you discover a junction box that is not on
                any drawing. You suspect it may be live but connected to a different circuit from
                the one you have isolated.
              </>
            }
            whatToDo={
              <>
                Stop work immediately. Do not touch the junction box. Prove dead using your voltage
                indicator before any contact. If live, withdraw and investigate which circuit feeds
                it. Update the risk assessment to include this additional hazard. Do not resume
                until all circuits in the area are identified and appropriately isolated.
              </>
            }
          />

          <Scenario
            title="Scenario 2: Water ingress during work"
            situation={
              <>
                Midway through replacing components in a ground-floor distribution board, you notice
                water seeping under the switchroom door from a burst pipe in the corridor.
              </>
            }
            whatToDo={
              <>
                Stop work immediately. If the board is de-energised, secure your work and withdraw.
                If any part of the board is live, do not touch it with wet hands or while standing
                in water. Alert building management to the water leak. Do not resume electrical work
                until the water is cleared and the area is dry.
              </>
            }
          />

          <Scenario
            title="Scenario 3: Asbestos discovery"
            situation={
              <>
                While removing an old trunking run, you disturb what appears to be textured coating
                (Artex) on the wall behind. You know this building was constructed in the 1970s and
                may contain asbestos-containing materials.
              </>
            }
            whatToDo={
              <>
                Stop work immediately. Do not disturb the material further. Do not attempt to clean
                up any debris. Withdraw from the area. Seal the area if possible to prevent others
                entering. Report to the site manager and request the asbestos register. Work must
                not resume until a competent asbestos surveyor has assessed the material.
              </>
            }
          />

          <Scenario
            title="Scenario 4: Changed site conditions"
            situation={
              <>
                You arrive for the second day of a cable installation to find that scaffolding has
                been erected overnight directly over your cable route. Scaffolders are working
                above, and there is a risk of dropped objects into your work area.
              </>
            }
            whatToDo={
              <>
                Do not start work. The conditions have changed significantly from the risk
                assessment. Speak to the scaffolding foreman and the site manager to coordinate safe
                working. You may need to reschedule your work, install additional protection (debris
                netting, exclusion zone), or find an alternative cable route. Update the method
                statement before proceeding.
              </>
            }
          />

          <ConceptBlock title="Building your portfolio evidence">
            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard expects you to
              demonstrate personal responsibility for health and safety, including the ability to
              assess risk dynamically, make appropriate decisions, and take action to protect
              yourself and others. The end-point assessment professional discussion will explore how
              you have applied these skills in your real work experience. Building a portfolio of
              examples — including situations where you stopped work, adapted your approach or
              escalated a concern — provides strong evidence of competence.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Dynamic risk assessment is not a replacement for formal planning. It is the safety net that catches the hazards that formal assessment missed.',
              'SLAM is not bureaucracy — it is a mental habit that takes seconds. The best maintenance technicians apply it automatically, almost unconsciously, throughout their work.',
              'Any employer that penalises a worker for a genuine stop-work decision is acting unlawfully and unethically.',
              'This feedback loop is a key element of continuous improvement in safety management and is a behaviour that ST1426 expects maintenance technicians to demonstrate.',
              'The maintenance technician standard expects you to demonstrate personal responsibility for health and safety, including the ability to assess risk dynamically, make appropriate decisions, and take action to protect yourself and others.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Dynamic risk assessment knowledge check" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section3-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Writing and Following Method Statements
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section4-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Module 1, Section 4.1
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section3_5;
