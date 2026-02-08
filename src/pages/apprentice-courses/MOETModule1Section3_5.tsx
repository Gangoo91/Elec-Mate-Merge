import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Dynamic Risk Assessments - MOET Module 1 Section 3.5";
const DESCRIPTION = "Comprehensive guide to dynamic risk assessment for electrical maintenance technicians: when formal RA is not enough, SLAM technique, point-of-work assessment, when to stop work, escalation process and real-world electrical maintenance examples.";

const quickCheckQuestions = [
  {
    id: "dynamic-ra-definition",
    question: "A dynamic risk assessment is best described as:",
    options: [
      "A formal, written risk assessment completed in the office before work starts",
      "A continuous, mental process of assessing and responding to changing conditions at the point of work in real time",
      "A risk assessment that only applies to emergency situations",
      "A computer-based risk assessment tool"
    ],
    correctIndex: 1,
    explanation: "A dynamic risk assessment is a continuous, real-time process of observing conditions at the point of work, identifying new or changed hazards, evaluating the risk, and deciding on the appropriate response — including stopping work if necessary. It supplements (but does not replace) the formal written risk assessment and runs continuously throughout the task."
  },
  {
    id: "slam-technique",
    question: "What does the SLAM acronym stand for?",
    options: [
      "Stop, Look, Assess, Manage",
      "Survey, List, Act, Monitor",
      "Safety, Leadership, Awareness, Management",
      "Secure, Locate, Avoid, Mitigate"
    ],
    correctIndex: 0,
    explanation: "SLAM stands for Stop, Look, Assess, Manage. It is a simple, memorable technique for carrying out a dynamic risk assessment at the point of work. Stop what you are doing; Look at the task and surroundings; Assess the hazards and risks; Manage the situation by implementing controls, modifying the task, or stopping work if the risk is too high."
  },
  {
    id: "when-to-stop",
    question: "In which of the following situations should a maintenance technician stop work immediately?",
    options: [
      "When the tea break is due",
      "When a circuit that was confirmed dead is found to be live, or when an unexpected hazard is discovered that is not covered by the existing risk assessment",
      "When it starts to rain lightly during outdoor work",
      "When a colleague asks a question about the task"
    ],
    correctIndex: 1,
    explanation: "Work must stop immediately when conditions change to the point where the existing risk assessment and method statement are no longer valid — particularly when an unexpected, serious hazard is discovered. Finding a circuit live when it was supposed to be dead is a critical safety failure that requires immediate stop-work, withdrawal to a safe area, and investigation before any further activity."
  },
  {
    id: "documenting-dynamic-ra",
    question: "Should the findings of a dynamic risk assessment be documented?",
    options: [
      "No — dynamic risk assessments are purely mental processes that never need recording",
      "Yes — significant findings and decisions should be recorded, especially if work was stopped, modified or a new hazard was identified",
      "Only if the HSE is on site",
      "Only if someone is injured as a result"
    ],
    correctIndex: 1,
    explanation: "While dynamic risk assessment is a real-time mental process, significant findings should be documented. If you stopped work due to a new hazard, modified the work method, or identified a condition not covered by the formal risk assessment, this should be recorded. The record feeds back into the formal risk assessment system, triggering a review and update. It also provides evidence of competent decision-making if the decision is later questioned."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Dynamic risk assessment is needed because:",
    options: [
      "Written risk assessments are always wrong",
      "Workplace conditions can change after the formal risk assessment was written, and new hazards can emerge during the work",
      "It is a legal requirement to carry out a dynamic risk assessment for every task",
      "It replaces the need for any written documentation"
    ],
    correctAnswer: 1,
    explanation: "No written risk assessment can anticipate every possible condition or change that may occur during the work. Workplace conditions are dynamic — weather changes, other contractors begin nearby work, hidden hazards are revealed, equipment fails, and unexpected situations arise. Dynamic risk assessment enables workers to respond to these changes in real time, adjusting their approach to maintain safety."
  },
  {
    id: 2,
    question: "The SLAM technique should be applied:",
    options: [
      "Only at the start of the working day",
      "Continuously throughout the task, and whenever conditions change or something does not seem right",
      "Only when the supervisor is watching",
      "Only after an accident has occurred"
    ],
    correctAnswer: 1,
    explanation: "SLAM is a continuous process, not a one-off check. You should apply it throughout the task — particularly when transitioning between steps, when conditions change, when you feel uncertain about something, or when your instinct tells you something is not right. Effective dynamic risk assessment becomes a habit — an automatic mental process that runs alongside the physical work."
  },
  {
    id: 3,
    question: "During a cable installation, you discover what appears to be asbestos insulation board in the ceiling void. Your dynamic risk assessment response should be:",
    options: [
      "Continue working carefully and report it at the end of the day",
      "Stop work immediately, withdraw from the area, secure it to prevent others entering, and report to the supervisor — do not disturb the suspected material",
      "Break off a sample and take it for testing",
      "Cover it with dust sheets and carry on"
    ],
    correctAnswer: 1,
    explanation: "Discovery of suspected asbestos is a critical stop-work trigger. You must stop work immediately and withdraw from the area without disturbing the material (which could release fibres). Secure the area to prevent others entering, and report to your supervisor. Only licensed asbestos removal contractors can handle asbestos-containing materials. The formal risk assessment and method statement must be reviewed before work can resume."
  },
  {
    id: 4,
    question: "A 'point-of-work risk assessment' is:",
    options: [
      "A risk assessment carried out at the actual work location, verifying that the conditions match the formal risk assessment",
      "A risk assessment carried out at the company head office",
      "A risk assessment that only applies to sharp objects at the workstation",
      "A type of risk assessment used only in hospitals"
    ],
    correctAnswer: 0,
    explanation: "A point-of-work risk assessment is carried out at the actual work location, typically just before work begins. Its purpose is to verify that the conditions described in the formal risk assessment are actually present and that the planned controls are appropriate. It is the bridge between the written document (which may have been prepared days or weeks earlier) and the real-time conditions on site."
  },
  {
    id: 5,
    question: "Which of the following is an example of a changing condition that should trigger a dynamic risk assessment during electrical maintenance?",
    options: [
      "A colleague arriving with the correct tools",
      "Water beginning to leak into the switchroom from a burst pipe above",
      "The tea van arriving on site",
      "A sunny day becoming slightly cloudier"
    ],
    correctAnswer: 1,
    explanation: "Water leaking into a switchroom is a serious, changing condition that immediately increases the risk of electric shock and short circuit. This should trigger an immediate stop-work response, withdrawal to a safe area, and notification of the supervisor. The formal risk assessment did not anticipate this condition, so the existing controls are no longer adequate. The situation must be resolved (water stopped, switchroom dried out) before work can resume."
  },
  {
    id: 6,
    question: "The escalation process for a dynamic risk assessment finding means:",
    options: [
      "Fixing the problem yourself regardless of your competence",
      "Reporting the finding to your supervisor or the person in charge, so they can decide on the appropriate response, especially if the hazard is beyond your authority or competence to control",
      "Sending an email to head office and waiting for a reply",
      "Adding the hazard to next year's risk assessment review"
    ],
    correctAnswer: 1,
    explanation: "Escalation means reporting the finding up the management chain to someone with the authority and competence to deal with it. If you discover a hazard that is beyond your ability to control — for example, a structural concern, a suspected gas leak, or an asbestos find — you must stop work and escalate immediately. Do not attempt to manage hazards outside your competence. The person in charge can then decide on the appropriate response, which may involve specialist contractors, additional resources, or a formal reassessment."
  },
  {
    id: 7,
    question: "A maintenance technician is working on a distribution board and notices that a colleague on the same site has removed the lock from an isolator that forms part of their safe isolation. They should:",
    options: [
      "Assume the colleague has a good reason and continue working",
      "Stop work immediately, verify the status of their own isolation, and challenge the colleague — the integrity of the safe isolation system has been compromised",
      "Report it in the weekly safety report",
      "Put their own lock on a different isolator"
    ],
    correctAnswer: 1,
    explanation: "The removal of a lock from an isolation point is a critical safety event. The maintenance technician must stop work immediately because their safe isolation may have been compromised. They should verify that their circuit is still dead (prove dead again), and challenge the colleague to understand why the lock was removed. This situation must be resolved before any further work — it is a potential fatal hazard that demands immediate action, not a note in a report."
  },
  {
    id: 8,
    question: "Training for dynamic risk assessment should include:",
    options: [
      "Only classroom theory — practical experience is not needed",
      "Hazard recognition skills, the SLAM technique, decision-making frameworks, knowledge of when to stop work, and the escalation process",
      "Only how to fill in paperwork",
      "Training is not needed — dynamic risk assessment is instinctive"
    ],
    correctAnswer: 1,
    explanation: "Effective dynamic risk assessment requires training in hazard recognition (knowing what to look for), structured techniques like SLAM (knowing how to assess), decision-making frameworks (knowing what to do with the information), knowledge of stop-work authority (knowing when and how to stop), and the escalation process (knowing who to tell). While experience builds competence over time, formal training provides the foundation that makes dynamic assessment systematic rather than haphazard."
  },
  {
    id: 9,
    question: "Which of the following best describes the relationship between formal risk assessment and dynamic risk assessment?",
    options: [
      "Dynamic risk assessment replaces formal risk assessment",
      "Formal risk assessment replaces the need for dynamic risk assessment",
      "Formal risk assessment provides the planned safety framework; dynamic risk assessment runs continuously at the point of work to identify changes and respond to new conditions",
      "They are the same thing carried out by different people"
    ],
    correctAnswer: 2,
    explanation: "The two types of assessment are complementary. The formal risk assessment provides the planned framework — it identifies anticipated hazards, evaluates risks, and specifies controls before work begins. The dynamic risk assessment operates in real time at the point of work, monitoring actual conditions, identifying changes, and responding to situations that the formal assessment did not or could not anticipate. Both are needed for safe work."
  },
  {
    id: 10,
    question: "During live fault-finding on a control panel, the maintenance technician notices an unusual burning smell that was not present when work started. The correct response is:",
    options: [
      "Ignore it — burning smells are normal in electrical panels",
      "Apply SLAM: stop the current activity, look for the source of the smell, assess whether it indicates a new hazard (overheating, insulation failure), and manage by withdrawing if necessary, de-energising the panel if safe to do so, and reporting the finding",
      "Open the panel door wider to ventilate the smell",
      "Continue fault-finding but work faster to finish before anything happens"
    ],
    correctAnswer: 1,
    explanation: "A burning smell in an electrical panel indicates potential overheating, insulation breakdown, or an incipient fault — all serious hazards. The SLAM technique provides a structured response: Stop the current activity; Look for the source (visual inspection, thermal observation); Assess whether it represents a new or escalating hazard; Manage by withdrawing to a safe distance, de-energising the panel if it can be done safely, and reporting to the supervisor. Do not ignore unusual conditions — they are often early warning signs of serious failures."
  },
  {
    id: 11,
    question: "Every worker on site has the authority to:",
    options: [
      "Continue working regardless of conditions, as long as a risk assessment exists",
      "Stop work if they believe there is an imminent risk of serious injury — this is a fundamental right and duty",
      "Stop work only if they hold a management position",
      "Stop work only if they have completed a NEBOSH qualification"
    ],
    correctAnswer: 1,
    explanation: "Every worker has both the right and the duty to stop work if they believe there is an imminent risk of serious personal injury. This is established by the Management of Health and Safety at Work Regulations 1999 (Regulation 8) and reinforced by the Health and Safety at Work Act 1974 (Section 7). No qualification, job title or seniority is needed — if you believe the situation is dangerous, stop and report. No reputable employer will penalise a worker for stopping work on genuine safety grounds."
  },
  {
    id: 12,
    question: "Under ST1426, the ability to carry out dynamic risk assessment is part of which competence area?",
    options: [
      "Technical drawing interpretation",
      "Safe working practices and personal responsibility for health and safety",
      "Business improvement techniques",
      "Stock control and logistics"
    ],
    correctAnswer: 1,
    explanation: "ST1426 requires maintenance technicians to demonstrate competence in safe working practices, which includes the ability to assess risk dynamically at the point of work, make appropriate decisions about whether to proceed, and take personal responsibility for their own safety and the safety of others. This is assessed in the end-point assessment through the professional discussion (where you describe how you have applied dynamic risk assessment in practice) and the practical observation (where assessors observe your real-time safety awareness)."
  }
];

const faqs = [
  {
    question: "Is a dynamic risk assessment the same as a formal risk assessment?",
    answer: "No. A formal risk assessment is a documented, structured process carried out before work begins. It identifies anticipated hazards, evaluates risks, and specifies control measures. A dynamic risk assessment is a continuous, real-time mental process carried out during the work — it monitors conditions, identifies changes, and responds to new hazards as they emerge. The dynamic assessment supplements the formal assessment; it does not replace it. You always need a formal risk assessment as the foundation, with dynamic assessment running on top during the work."
  },
  {
    question: "What is the SLAM technique and when should I use it?",
    answer: "SLAM stands for Stop, Look, Assess, Manage. It is a simple, memorable technique for carrying out a dynamic risk assessment at the point of work. You should use it: before starting each new step of a task, whenever conditions change, whenever something feels wrong or unusual, when you feel rushed or pressured, and whenever you are uncertain about whether it is safe to proceed. SLAM takes only a few seconds and should become a habitual part of your working practice."
  },
  {
    question: "Can I refuse to work if I believe the conditions are unsafe?",
    answer: "Yes. Under the Management of Health and Safety at Work Regulations 1999 (Regulation 8), an employer must establish procedures for workers to follow in the event of serious and imminent danger. Workers are entitled to stop work and move to a place of safety if they believe they are in serious and imminent danger. The Employment Rights Act 1996 provides protection against dismissal or detriment for refusing to work in dangerous conditions. If you believe conditions are unsafe, stop work, withdraw to a safe area, and report your concerns. A responsible employer will support this decision."
  },
  {
    question: "How do I develop my dynamic risk assessment skills?",
    answer: "Dynamic risk assessment is a skill that develops with training and experience. Start with formal training in hazard recognition and the SLAM technique. Then practise applying it consciously during every task — pause at each step, look around, check conditions. Over time it becomes more automatic. Learn from experienced colleagues, discuss near-misses and what-if scenarios, and reflect on situations where you have had to adapt your approach. Regular toolbox talks on dynamic risk assessment help reinforce the skill across the team."
  },
  {
    question: "What should I do if my supervisor tells me to continue working when I believe the conditions are unsafe?",
    answer: "Your personal safety is paramount. If you genuinely believe the conditions are unsafe, you have the legal right to stop work regardless of what your supervisor says. Calmly explain your concerns, pointing to the specific hazard or changed condition. If the supervisor insists, do not resume work — escalate to the next level of management, the site safety officer, or your safety representative. Document the interaction. The Health and Safety at Work Act 1974 protects you from reprisal for acting on genuine safety concerns. No job is worth risking your life."
  }
];

const MOETModule1Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 1.3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Dynamic Risk Assessments
          </h1>
          <p className="text-white/80">
            Real-time hazard assessment and response when conditions change
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Dynamic RA:</strong> Continuous, real-time assessment at the point of work</li>
              <li className="pl-1"><strong>SLAM:</strong> Stop, Look, Assess, Manage</li>
              <li className="pl-1"><strong>Purpose:</strong> Respond to conditions the formal RA did not anticipate</li>
              <li className="pl-1"><strong>Authority:</strong> Every worker can stop work for safety</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Triggers:</strong> Unexpected live conductors, water ingress, asbestos discovery</li>
              <li className="pl-1"><strong>Response:</strong> Stop, secure, withdraw, report, reassess</li>
              <li className="pl-1"><strong>Escalation:</strong> Report beyond your competence to supervisor/safety manager</li>
              <li className="pl-1"><strong>ST1426:</strong> Personal responsibility for safety in changing conditions</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain when and why dynamic risk assessment is needed alongside formal assessment",
              "Apply the SLAM technique at the point of work",
              "Carry out a point-of-work risk assessment before starting a task",
              "Recognise conditions that require you to stop work immediately",
              "Understand the escalation process for hazards beyond your competence",
              "Document dynamic risk assessment findings to feed back into formal assessment"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Dynamic Risk Assessment Is Needed */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Dynamic Risk Assessment Is Needed
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A formal, written risk assessment is essential — but it has inherent limitations. It is prepared
              before the work begins, often by someone who may not be at the point of work when conditions change.
              It cannot anticipate every situation that may arise during a task. Workplace conditions are inherently
              dynamic: weather changes, other workers arrive, equipment fails, hidden hazards are revealed, and
              situations evolve in ways that no document could fully predict.
            </p>

            <p>
              Dynamic risk assessment bridges this gap. It is the continuous, real-time process of observing
              conditions at the point of work, identifying new or changed hazards, evaluating whether the existing
              controls are still adequate, and deciding on the appropriate response. It is not an alternative to
              formal risk assessment — it is the essential companion to it, running in parallel throughout the task.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Limitations of Formal Risk Assessment That Dynamic RA Addresses</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Time lag:</strong> The formal RA may have been written days, weeks or even months before the work. Conditions on site may have changed significantly</li>
                <li className="pl-1"><strong>Incomplete information:</strong> The formal RA is based on the information available at the time of writing. Hidden hazards — concealed cables, asbestos, structural defects — only become apparent during the work</li>
                <li className="pl-1"><strong>Changing environment:</strong> Weather, temperature, lighting, noise levels, and the activities of other workers can all change during the task</li>
                <li className="pl-1"><strong>Unforeseen events:</strong> Equipment failure, spillages, power outages, emergencies on adjacent areas, unexpected personnel entering the work zone</li>
                <li className="pl-1"><strong>Human factors:</strong> Fatigue, distraction, stress, illness and changes in crew composition can all affect risk levels during the work</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Danger of "It's in the Risk Assessment"</p>
              <p className="text-sm text-white">
                One of the most dangerous phrases in safety management is "it's in the risk assessment" — used to
                justify proceeding with work when conditions have changed. A risk assessment is only valid for the
                conditions it was written for. If those conditions have changed, the assessment may be dangerously
                inadequate. Never assume the written document is still correct — always verify conditions at the
                point of work. If reality does not match the paperwork, stop and reassess.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Dynamic risk assessment is not a replacement for formal planning. It is
              the safety net that catches the hazards that formal assessment missed. The better the formal assessment,
              the fewer surprises the dynamic assessment will find — but some level of dynamic assessment is always
              necessary because no plan is perfect.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: The SLAM Technique */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The SLAM Technique
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              SLAM is a simple, structured technique for carrying out dynamic risk assessment at the point of work.
              The acronym stands for Stop, Look, Assess, Manage. It provides a mental framework that can be applied
              quickly — in seconds — at any point during the work. With practice, it becomes a habitual part of
              your working routine.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                <h3 className="text-base font-bold text-elec-yellow mb-2">S — Stop</h3>
                <p className="text-sm text-white mb-2">
                  Pause what you are doing. Take a moment to step back mentally from the task. This is not a
                  long pause — even a few seconds of deliberate attention makes a difference. The purpose is to
                  break the automatic flow of work and engage your conscious awareness of the environment.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Before starting each new step of the method statement</li>
                  <li className="pl-1">Whenever you notice something has changed</li>
                  <li className="pl-1">When transitioning between different activities</li>
                  <li className="pl-1">When you feel rushed, tired or uncertain</li>
                  <li className="pl-1">When your instinct tells you something is not right</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                <h3 className="text-base font-bold text-elec-yellow mb-2">L — Look</h3>
                <p className="text-sm text-white mb-2">
                  Actively observe your surroundings. Look at the task itself, the immediate work area, and the
                  wider environment. Use all your senses — sight, hearing, smell and touch can all provide
                  information about hazards.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Look at the specific equipment or area you are about to work on</li>
                  <li className="pl-1">Check for changes since you last assessed — new obstructions, different lighting, additional people</li>
                  <li className="pl-1">Listen for unusual sounds — buzzing, arcing, machinery starting nearby</li>
                  <li className="pl-1">Smell for burning, chemicals, or unfamiliar odours</li>
                  <li className="pl-1">Look up, down and behind you — hazards can be in any direction</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                <h3 className="text-base font-bold text-elec-yellow mb-2">A — Assess</h3>
                <p className="text-sm text-white mb-2">
                  Evaluate what you have observed. Are the conditions as expected? Are the controls still in place
                  and effective? Has anything changed since the risk assessment was written? Is the risk level
                  still acceptable?
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Do the conditions match the risk assessment and method statement?</li>
                  <li className="pl-1">Are all the planned controls still in place? (locks, signs, barriers, PPE)</li>
                  <li className="pl-1">Has a new hazard appeared that was not anticipated?</li>
                  <li className="pl-1">Has the risk level changed? (e.g., water ingress, additional people, equipment failure)</li>
                  <li className="pl-1">Am I competent to manage this situation, or do I need to escalate?</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                <h3 className="text-base font-bold text-elec-yellow mb-2">M — Manage</h3>
                <p className="text-sm text-white mb-2">
                  Take action based on your assessment. There are four possible responses, in order of escalation:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Proceed:</strong> Conditions are as expected, controls are in place — continue with the task</li>
                  <li className="pl-1"><strong>Adapt:</strong> Minor changes needed — add an additional control, adjust your approach, take extra care</li>
                  <li className="pl-1"><strong>Stop and seek advice:</strong> Conditions have changed significantly — stop work and consult your supervisor before proceeding</li>
                  <li className="pl-1"><strong>Stop and withdraw:</strong> Immediate danger — stop all work, withdraw to a safe area, and report. Do not resume until the hazard is resolved</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> SLAM is not bureaucracy — it is a mental habit that takes seconds. The
              best maintenance technicians apply it automatically, almost unconsciously, throughout their work. It
              is the difference between working safely and working complacently.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Point-of-Work Risk Assessment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Point-of-Work Risk Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A point-of-work risk assessment is a structured check carried out at the actual work location, typically
              just before work begins. It is more formal than the continuous SLAM process but less formal than a
              full written risk assessment. Its purpose is to verify that the conditions on site match those described
              in the formal risk assessment and that the planned controls are appropriate and in place.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">The Point-of-Work Check Process</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Arrive at the work area:</strong> Before unpacking tools or starting work, walk the area and observe</li>
                <li className="pl-1"><strong>Compare with the RA/MS:</strong> Does the work area match what was described in the risk assessment and method statement? Are the expected conditions present?</li>
                <li className="pl-1"><strong>Check access routes:</strong> Are they clear and safe? Can you get out quickly in an emergency?</li>
                <li className="pl-1"><strong>Verify isolation:</strong> If the work requires safe isolation, verify that it is in place and effective before touching any equipment</li>
                <li className="pl-1"><strong>Check for new hazards:</strong> Are there any hazards that were not in the formal assessment? Other work activities? Changed environmental conditions?</li>
                <li className="pl-1"><strong>Confirm emergency arrangements:</strong> Where is the nearest first aid kit? Fire extinguisher? Emergency exit? How would you call for help?</li>
                <li className="pl-1"><strong>Brief the team:</strong> Share your findings with the work team before starting. If you have identified any differences from the planned conditions, discuss them and agree on how to proceed</li>
              </ul>
            </div>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When the Check Is Clear</h3>
                <p className="text-sm text-white">
                  If the point-of-work check confirms that conditions match the risk assessment and all controls
                  are in place, proceed with the task as planned. Continue to apply SLAM throughout the work to
                  monitor for changes.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When the Check Reveals Differences</h3>
                <p className="text-sm text-white">
                  If conditions differ from the risk assessment, do not proceed with the original plan. Assess
                  whether the differences can be managed with additional controls on site, or whether the risk
                  assessment and method statement need formal revision. For significant differences — unexpected
                  hazards, missing controls, changed conditions — stop and escalate before proceeding.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">The Mental Model for Dynamic Assessment</h3>
              <p className="text-sm text-white mb-3">
                Experienced technicians develop an internal mental model — a picture of what "normal" and "safe"
                looks like for their work. This model is built through training, experience and reflection. When
                conditions match the mental model, work proceeds smoothly. When something deviates from the model —
                an unusual sight, sound, smell or feeling — the technician's awareness is triggered, and they
                instinctively apply SLAM.
              </p>
              <p className="text-sm text-white">
                Building this mental model takes time and deliberate practice. As an apprentice or early-career
                technician, you can accelerate the process by: paying close attention during work, asking experienced
                colleagues why they do things a certain way, reviewing incidents and near-misses to understand what
                went wrong, and mentally rehearsing "what if" scenarios before starting work.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: When to Stop Work and Escalation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            When to Stop Work and the Escalation Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Knowing when to stop work is arguably the most important safety skill a maintenance technician can
              have. It requires both technical knowledge (to recognise danger) and personal courage (to act on
              that recognition, even under pressure to continue). Under the Management of Health and Safety at
              Work Regulations 1999 (Regulation 8), every worker has the right — and the duty — to stop work
              when they believe there is serious and imminent danger.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Stop-Work Triggers in Electrical Maintenance</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Unexpected live conductors:</strong> A circuit that should be dead is found to be live — immediate withdrawal, re-verification of isolation, investigation</li>
                <li className="pl-1"><strong>Water ingress:</strong> Water entering an electrical enclosure or the work area — stop work, de-energise if safe, report the water source</li>
                <li className="pl-1"><strong>Suspected asbestos:</strong> Discovery of materials that may contain asbestos — stop work, do not disturb, withdraw, secure the area, report</li>
                <li className="pl-1"><strong>Structural concern:</strong> Crumbling walls, unstable floors or ceilings, particularly in old buildings where you are fixing equipment</li>
                <li className="pl-1"><strong>Gas smell:</strong> Any smell of gas requires immediate evacuation and emergency response — do not switch electrical equipment on or off (arc risk)</li>
                <li className="pl-1"><strong>Arc flash indicators:</strong> Scorching, melting, loud buzzing from switchgear — suggests an incipient arc fault; withdraw immediately</li>
                <li className="pl-1"><strong>Compromised isolation:</strong> Lock removed, isolation point found open, permit conditions breached</li>
                <li className="pl-1"><strong>Changed site conditions:</strong> New excavation near your cable route, scaffolding erected around your work area, other high-risk work starting nearby</li>
                <li className="pl-1"><strong>Personal incapacity:</strong> Feeling unwell, severely fatigued, or unable to concentrate safely</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">The Escalation Process</h3>
              <p className="text-sm text-white mb-3">
                When you identify a hazard that is beyond your authority or competence to manage, you must escalate
                it to someone who can deal with it. The escalation process should be:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Immediate:</strong> For imminent danger — verbal alert to those in the vicinity, then immediate report to supervisor/site manager. If no supervisor available, call emergency services for life-threatening situations</li>
                <li className="pl-1"><strong>Urgent:</strong> For serious but not immediately life-threatening hazards — verbal report to supervisor as soon as practicable, followed by a written hazard report</li>
                <li className="pl-1"><strong>Routine:</strong> For hazards that need attention but do not require immediate action — written hazard report through the organisation's reporting system</li>
              </ul>
              <p className="text-sm text-white mt-3">
                Always confirm that your escalation has been received and actioned. If the person you escalate to
                does not take appropriate action, escalate further up the management chain, or to the site safety
                officer or your safety representative.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Overcoming Pressure to Continue</p>
              <p className="text-sm text-white">
                In practice, there can be significant pressure to continue working — from clients wanting to meet
                deadlines, from supervisors focused on productivity, and from your own desire to complete the job.
                This pressure is one of the biggest challenges to effective dynamic risk assessment. Remember: no
                job is worth risking a life. The Employment Rights Act 1996 protects you from dismissal or
                detriment for refusing to work in dangerous conditions. Any employer that penalises a worker for
                a genuine stop-work decision is acting unlawfully and unethically. If you encounter this, report
                it through your safety representative, trade union, or directly to the HSE.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Documenting and Training */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Documenting Findings and Training Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While dynamic risk assessment is primarily a real-time mental process, significant findings should be
              documented. Documentation serves three purposes: it creates an evidence trail of competent
              decision-making, it feeds information back into the formal risk assessment system, and it captures
              lessons learned that can prevent future incidents.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">What to Document</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stop-work decisions:</strong> Why work was stopped, what hazard was identified, what action was taken, who was notified</li>
                <li className="pl-1"><strong>Work method changes:</strong> Any deviation from the method statement — what was changed, why, and what additional controls were applied</li>
                <li className="pl-1"><strong>New hazards discovered:</strong> Hazards not covered by the formal risk assessment — description, location, immediate action taken, recommendation for formal RA update</li>
                <li className="pl-1"><strong>Near-misses:</strong> Situations where harm was narrowly avoided — the near-miss report feeds into the organisation's safety learning system</li>
                <li className="pl-1"><strong>Conditions different from RA:</strong> Where site conditions did not match the written risk assessment — what the difference was and how it was managed</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Feeding Back Into Formal Assessment</h3>
              <p className="text-sm text-white mb-3">
                The findings from dynamic risk assessment should trigger a review of the formal risk assessment.
                This creates a continuous improvement cycle:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Formal RA written</strong> — identifies anticipated hazards and controls</li>
                <li className="pl-1"><strong>Work begins</strong> — dynamic RA monitors actual conditions</li>
                <li className="pl-1"><strong>New hazards found</strong> — documented and reported</li>
                <li className="pl-1"><strong>Formal RA updated</strong> — incorporates new information</li>
                <li className="pl-1"><strong>Future work benefits</strong> — the next team has a better, more comprehensive formal RA</li>
              </ul>
              <p className="text-sm text-white mt-3">
                This feedback loop is a key element of continuous improvement in safety management and is a
                behaviour that ST1426 expects maintenance technicians to demonstrate.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Training Requirements for Dynamic Risk Assessment</h3>
              <p className="text-sm text-white mb-3">
                Effective dynamic risk assessment requires a combination of knowledge, skills and behaviours that
                must be developed through formal training and practical experience:
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Training Area</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Hazard recognition</td>
                      <td className="border border-white/10 px-3 py-2">Knowing what to look for — visual indicators, sounds, smells that signal danger in electrical maintenance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">SLAM technique</td>
                      <td className="border border-white/10 px-3 py-2">Structured approach to continuous assessment — Stop, Look, Assess, Manage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Decision-making</td>
                      <td className="border border-white/10 px-3 py-2">Knowing when to proceed, adapt, seek advice or stop work — and having the confidence to act</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Stop-work authority</td>
                      <td className="border border-white/10 px-3 py-2">Understanding your legal right and duty to stop work; the escalation process; protection from reprisal</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Scenario practice</td>
                      <td className="border border-white/10 px-3 py-2">Practising dynamic RA through scenario exercises, toolbox talks, and post-task debriefs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Human factors</td>
                      <td className="border border-white/10 px-3 py-2">Understanding how fatigue, stress, complacency and confirmation bias affect your ability to recognise hazards</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Real-World Electrical Maintenance Scenarios</h3>
              <p className="text-sm text-white mb-3">
                The following scenarios illustrate how dynamic risk assessment works in practice for electrical
                maintenance technicians:
              </p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-white mb-1">Scenario 1: Unexpected Live Conductor</p>
                  <p className="text-xs text-white/80">
                    While tracing a fault in a ceiling void, you discover a junction box that is not on any drawing.
                    You suspect it may be live but connected to a different circuit from the one you have isolated.
                    <strong> Response:</strong> Stop work immediately. Do not touch the junction box. Prove dead using
                    your voltage indicator before any contact. If live, withdraw and investigate which circuit feeds
                    it. Update the risk assessment to include this additional hazard. Do not resume until all circuits
                    in the area are identified and appropriately isolated.
                  </p>
                </div>
                <div className="p-3 rounded bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-white mb-1">Scenario 2: Water Ingress During Work</p>
                  <p className="text-xs text-white/80">
                    Midway through replacing components in a ground-floor distribution board, you notice water seeping
                    under the switchroom door from a burst pipe in the corridor.
                    <strong> Response:</strong> Stop work immediately. If the board is de-energised, secure your work
                    and withdraw. If any part of the board is live, do not touch it with wet hands or while standing
                    in water. Alert building management to the water leak. Do not resume electrical work until the
                    water is cleared and the area is dry.
                  </p>
                </div>
                <div className="p-3 rounded bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-white mb-1">Scenario 3: Asbestos Discovery</p>
                  <p className="text-xs text-white/80">
                    While removing an old trunking run, you disturb what appears to be textured coating (Artex)
                    on the wall behind. You know this building was constructed in the 1970s and may contain
                    asbestos-containing materials.
                    <strong> Response:</strong> Stop work immediately. Do not disturb the material further. Do not
                    attempt to clean up any debris. Withdraw from the area. Seal the area if possible to prevent
                    others entering. Report to the site manager and request the asbestos register. Work must not
                    resume until a competent asbestos surveyor has assessed the material.
                  </p>
                </div>
                <div className="p-3 rounded bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-white mb-1">Scenario 4: Changed Site Conditions</p>
                  <p className="text-xs text-white/80">
                    You arrive for the second day of a cable installation to find that scaffolding has been erected
                    overnight directly over your cable route. Scaffolders are working above, and there is a risk of
                    dropped objects into your work area.
                    <strong> Response:</strong> Do not start work. The conditions have changed significantly from the
                    risk assessment. Speak to the scaffolding foreman and the site manager to coordinate safe working.
                    You may need to reschedule your work, install additional protection (debris netting, exclusion
                    zone), or find an alternative cable route. Update the method statement before proceeding.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard expects you to demonstrate personal
              responsibility for health and safety, including the ability to assess risk dynamically, make
              appropriate decisions, and take action to protect yourself and others. The end-point assessment
              professional discussion will explore how you have applied these skills in your real work experience.
              Building a portfolio of examples — including situations where you stopped work, adapted your approach
              or escalated a concern — provides strong evidence of competence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* FAQs */}
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section3-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Method Statements
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section3">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section3_5;
