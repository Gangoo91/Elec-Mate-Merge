import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Dynamic Risk Assessment - HNC Module 1 Section 2.6";
const DESCRIPTION = "Master dynamic risk assessment techniques for building services: SLAM, Take 5, stop work authority and real-time hazard management in changing workplace conditions.";

const quickCheckQuestions = [
  {
    id: "dra-definition",
    question: "What is the primary purpose of a dynamic risk assessment?",
    options: ["To replace written risk assessments", "To assess risks in real-time as conditions change", "To document hazards after an incident", "To satisfy HSE inspectors"],
    correctIndex: 1,
    explanation: "Dynamic risk assessment is the continuous process of identifying and managing risks in real-time as work conditions change. It supplements, not replaces, formal written risk assessments."
  },
  {
    id: "slam-meaning",
    question: "What does the 'A' stand for in the SLAM technique?",
    options: ["Act", "Assess", "Avoid", "Alert"],
    correctIndex: 1,
    explanation: "SLAM stands for Stop, Look, Assess, Manage. The Assess stage involves evaluating the hazards identified and determining if work can proceed safely."
  },
  {
    id: "stop-work-authority",
    question: "Who has the authority to stop work when an uncontrolled hazard is identified?",
    options: ["Only site managers", "Only the principal contractor", "Any worker who identifies the hazard", "Only health and safety officers"],
    correctIndex: 2,
    explanation: "Under UK health and safety law, any worker has the right and duty to stop work if they identify an immediate danger that cannot be controlled. This is known as stop work authority."
  },
  {
    id: "take-5-timing",
    question: "When should a Take 5 assessment typically be performed?",
    options: ["Only at the start of a shift", "Before starting each new task or when conditions change", "Only after an incident occurs", "Weekly as part of site meetings"],
    correctIndex: 1,
    explanation: "Take 5 assessments should be performed before starting each new task, when moving to a new work area, or when conditions change. The name refers to taking 5 minutes to assess the situation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What distinguishes a dynamic risk assessment from a formal written risk assessment?",
    options: [
      "Dynamic assessments are legally required while written ones are optional",
      "Dynamic assessments are performed in real-time to address changing conditions",
      "Dynamic assessments are only performed by managers",
      "Dynamic assessments do not require hazard identification"
    ],
    correctAnswer: 1,
    explanation: "Dynamic risk assessment is a continuous, real-time process that addresses changing conditions and unexpected hazards. Written risk assessments are pre-planned documents that may not cover all situations encountered on site."
  },
  {
    id: 2,
    question: "An electrician arrives to work on a distribution board and discovers the area is flooded. What is the FIRST step in the SLAM technique?",
    options: ["Look for alternative access routes", "Assess the depth of the water", "Stop work immediately", "Manage the situation by getting pumping equipment"],
    correctAnswer: 2,
    explanation: "The first step in SLAM is Stop. Before doing anything else, stop work to prevent exposure to the unexpected hazard. Only then proceed to Look, Assess, and Manage."
  },
  {
    id: 3,
    question: "During a Take 5 assessment, which of the following should be considered?",
    options: [
      "Only electrical hazards",
      "All hazards including environmental, physical, and work activity risks",
      "Only hazards listed in the method statement",
      "Only hazards that have caused previous incidents"
    ],
    correctAnswer: 1,
    explanation: "Take 5 requires consideration of ALL hazards present, not just those in your trade area. This includes environmental conditions, other trades working nearby, and any changes since the original risk assessment was written."
  },
  {
    id: 4,
    question: "When working in an occupied commercial building, which scenario would MOST likely require a dynamic risk assessment?",
    options: [
      "The building manager provides a permit to work",
      "Fire alarm testing begins unexpectedly during your installation work",
      "You are using the same tools as yesterday",
      "The weather forecast predicts rain"
    ],
    correctAnswer: 1,
    explanation: "Unexpected events like fire alarm testing create new conditions not covered in the original risk assessment. This requires real-time assessment of whether work can continue safely and what additional controls are needed."
  },
  {
    id: 5,
    question: "What action should be taken if a dynamic risk assessment identifies a hazard that cannot be adequately controlled?",
    options: [
      "Continue work while being extra careful",
      "Document the hazard and continue",
      "Stop work and report to the supervisor",
      "Ask another worker to take over the task"
    ],
    correctAnswer: 2,
    explanation: "If a hazard cannot be adequately controlled through the measures available, work must stop. Continuing would breach the duty to work safely. The situation should be reported so additional controls can be implemented."
  },
  {
    id: 6,
    question: "Which of the following is NOT a valid reason to invoke stop work authority?",
    options: [
      "Discovery of asbestos-containing materials",
      "Live electrical equipment where isolation was expected",
      "Disagreement with the foreman about break times",
      "Gas leak detected in the work area"
    ],
    correctAnswer: 2,
    explanation: "Stop work authority is for immediate safety concerns, not workplace disputes. Asbestos, unexpected live equipment, and gas leaks are all serious hazards requiring immediate work stoppage."
  },
  {
    id: 7,
    question: "During installation work in a hospital, a patient emergency is declared in an adjacent area. What is the appropriate response?",
    options: [
      "Continue working as it doesn't directly affect your area",
      "Stop work, assess the situation, and follow emergency protocols",
      "Speed up work to finish before any disruption",
      "Leave the building immediately"
    ],
    correctAnswer: 1,
    explanation: "In occupied buildings, especially critical facilities like hospitals, emergency situations require immediate dynamic assessment. You may need to stop work, move equipment, or provide clear access for emergency responders."
  },
  {
    id: 8,
    question: "What is the 'Look' phase of SLAM primarily concerned with?",
    options: [
      "Looking at the method statement",
      "Observing the work environment and identifying hazards",
      "Checking that all workers are looking at their tasks",
      "Looking for the supervisor to report"
    ],
    correctAnswer: 1,
    explanation: "The Look phase involves actively observing your surroundings to identify all hazards present. This includes the physical environment, other activities, equipment, and any changes from expected conditions."
  },
  {
    id: 9,
    question: "When should a dynamic risk assessment be documented?",
    options: [
      "Never - they are informal assessments",
      "Only if an incident occurs",
      "When significant hazards are identified or changes made to work methods",
      "Only at the end of the working day"
    ],
    correctAnswer: 2,
    explanation: "While dynamic assessments are often informal mental processes, significant findings should be documented. This includes newly identified hazards, changes to work methods, and situations where work was stopped."
  },
  {
    id: 10,
    question: "A building services engineer discovers that a supposedly isolated circuit is actually live during testing. According to dynamic risk assessment principles, what should happen FIRST?",
    options: [
      "Complete the test carefully",
      "Stop work immediately and make the area safe",
      "Report to the client",
      "Check if the permit to work is valid"
    ],
    correctAnswer: 1,
    explanation: "Discovery of unexpected live equipment is a serious hazard requiring immediate work stoppage. The first priority is to stop and make the area safe, preventing exposure to the electrical hazard. Reporting and investigation follow."
  }
];

const faqs = [
  {
    question: "How does dynamic risk assessment relate to the formal risk assessment in a method statement?",
    answer: "Dynamic risk assessment supplements formal written assessments. The method statement covers foreseeable hazards, but conditions on site can change. Dynamic assessment bridges the gap by enabling workers to identify and manage hazards in real-time that weren't anticipated or have changed since the original assessment."
  },
  {
    question: "Can I be disciplined for using stop work authority?",
    answer: "No. Under UK law (Health and Safety at Work Act 1974 and Management of Health and Safety at Work Regulations), workers have a legal right to stop work when facing serious and imminent danger. Any employer who disciplines a worker for legitimate use of stop work authority would be in breach of employment law."
  },
  {
    question: "What's the difference between Take 5 and SLAM?",
    answer: "Both are dynamic risk assessment tools with similar purposes. Take 5 is a more structured approach, often using a card or checklist covering five key areas of hazard. SLAM (Stop, Look, Assess, Manage) is a four-step mental process that can be applied instantly. Many organisations use both - Take 5 before starting work and SLAM throughout the day."
  },
  {
    question: "Do I need training to perform dynamic risk assessments?",
    answer: "While formal training is beneficial, the principles are straightforward enough for any competent worker to apply. However, employers should ensure workers understand the process through toolbox talks, induction, and supervision. More complex environments may require specific training in hazard recognition."
  },
  {
    question: "How do I document a dynamic risk assessment?",
    answer: "Documentation can be simple - a note in a site diary, a completed Take 5 card, or a verbal report to a supervisor who records it. The key is capturing what hazard was identified, what action was taken, and any changes to work methods. Many companies provide pocket cards or apps for this purpose."
  },
  {
    question: "What if my supervisor disagrees with my dynamic risk assessment?",
    answer: "Discuss your concerns openly, explaining the hazards you've identified. If you still believe there's an uncontrolled risk, you have the right to refuse to undertake the work. The matter should be escalated to site management or the principal contractor. Never allow pressure to override genuine safety concerns."
  }
];

const HNCModule1Section2_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.2.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Dynamic Risk Assessment
          </h1>
          <p className="text-white/80">
            Real-time hazard identification and management in changing workplace conditions
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Dynamic RA:</strong> Continuous, real-time risk assessment</li>
              <li className="pl-1"><strong>SLAM:</strong> Stop, Look, Assess, Manage</li>
              <li className="pl-1"><strong>Take 5:</strong> Five-minute pre-task safety check</li>
              <li className="pl-1"><strong>Stop work:</strong> Authority for all workers to halt unsafe work</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Live plant:</strong> Assessing unexpected energised equipment</li>
              <li className="pl-1"><strong>Occupied buildings:</strong> Managing public and tenant interactions</li>
              <li className="pl-1"><strong>Emergencies:</strong> Responding to fire alarms, evacuations</li>
              <li className="pl-1"><strong>Multi-trade:</strong> Coordinating with changing site conditions</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define dynamic risk assessment and explain when it applies",
              "Apply the SLAM technique to real-world scenarios",
              "Conduct Take 5 assessments before starting work",
              "Understand stop work authority and when to use it",
              "Recognise situations requiring dynamic assessment in building services",
              "Document and communicate dynamic risk assessment findings"
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

        {/* Section 1: Definition and Purpose */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Definition and Purpose of Dynamic Risk Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Dynamic risk assessment (DRA) is the continuous process of identifying hazards, assessing risks,
              and implementing controls in real-time as work conditions change. Unlike formal written risk
              assessments prepared before work begins, dynamic assessment happens throughout the working day.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key characteristics of dynamic risk assessment:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Continuous:</strong> Ongoing throughout the work activity, not a one-time exercise</li>
                <li className="pl-1"><strong>Real-time:</strong> Responds immediately to changing conditions</li>
                <li className="pl-1"><strong>Worker-led:</strong> Performed by those doing the work, not just supervisors</li>
                <li className="pl-1"><strong>Supplementary:</strong> Works alongside formal risk assessments, not instead of them</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Dynamic Assessment is Essential</p>
              <p className="text-sm text-white mb-3">
                Formal risk assessments cannot predict every situation. Building services work involves:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Multiple trades working in the same space with changing activities</li>
                <li className="pl-1">Occupied buildings where building users create unpredictable situations</li>
                <li className="pl-1">Discovery of unexpected hazards (asbestos, live services, structural issues)</li>
                <li className="pl-1">Weather changes affecting work in exposed or partially completed areas</li>
                <li className="pl-1">Equipment breakdowns or unavailability requiring work method changes</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Legal Foundation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Regulation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Relevance to DRA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HSWA 1974 s.2</td>
                      <td className="border border-white/10 px-3 py-2">Employer duty to ensure health and safety so far as reasonably practicable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HSWA 1974 s.7</td>
                      <td className="border border-white/10 px-3 py-2">Employee duty to take reasonable care for themselves and others</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MHSWR Reg.3</td>
                      <td className="border border-white/10 px-3 py-2">Requirement for suitable and sufficient risk assessment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CDM 2015 Reg.15</td>
                      <td className="border border-white/10 px-3 py-2">Duty to report anything likely to endanger health or safety</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Dynamic risk assessment is a legal duty under Regulation 3 of MHSWR - risk assessments must remain
              'suitable and sufficient', which requires ongoing review as conditions change.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: When to Apply Dynamic Risk Assessment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            When to Apply Dynamic Risk Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Dynamic risk assessment should be a continuous mental process, but certain triggers require
              particularly focused attention. Recognising these situations is essential for safe working.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Triggers requiring dynamic risk assessment:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Changing conditions:</strong> Weather, lighting, temperature, noise levels</li>
                <li className="pl-1"><strong>Unexpected hazards:</strong> Discovery of asbestos, live services, structural damage</li>
                <li className="pl-1"><strong>New activities:</strong> Other trades starting work in your area</li>
                <li className="pl-1"><strong>Equipment issues:</strong> Breakdown, unavailability, or different equipment being used</li>
                <li className="pl-1"><strong>Personnel changes:</strong> Different workers, visitors, or building occupants present</li>
                <li className="pl-1"><strong>Emergency situations:</strong> Fire alarms, evacuations, medical emergencies</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Planned Work vs Reality</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Method statement says 'isolated' but circuit is live</li>
                  <li className="pl-1">Drawings show clear access but area is obstructed</li>
                  <li className="pl-1">Work scheduled in unoccupied area but occupants present</li>
                  <li className="pl-1">Expected ceiling void access but asbestos insulation discovered</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Questions to Ask Yourself</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Has anything changed since I last looked?</li>
                  <li className="pl-1">What could go wrong with what I'm about to do?</li>
                  <li className="pl-1">Do I have the right equipment and training?</li>
                  <li className="pl-1">Who else might be affected by my work?</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Warning Signs Requiring Immediate Assessment</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Unusual smells (gas, burning, chemicals)</li>
                <li className="pl-1">Unexpected sounds (alarms, hissing, structural movement)</li>
                <li className="pl-1">Visual anomalies (smoke, water, sparking, structural cracks)</li>
                <li className="pl-1">People behaving unusually (evacuation movements, distress)</li>
                <li className="pl-1">Equipment behaving abnormally (overheating, tripping, vibration)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> If something doesn't look right, feel right, or seem right - STOP and assess.
              Your instincts are often detecting hazards before you consciously recognise them.
            </p>
          </div>
        </section>

        {/* Section 3: SLAM Technique and Take 5 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            SLAM Technique and Take 5
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              SLAM and Take 5 are structured approaches to dynamic risk assessment. Both provide a systematic
              way to identify and control hazards, ensuring nothing is overlooked.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">The SLAM Technique</p>
              <div className="grid gap-3">
                <div className="p-4 rounded-lg bg-white/5 border-l-4 border-red-500">
                  <p className="font-bold text-red-400 mb-1">S - STOP</p>
                  <p className="text-sm">Pause before starting or continuing work. Create a mental break to engage your risk awareness.
                  If something unexpected has occurred, stop immediately before proceeding.</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border-l-4 border-yellow-500">
                  <p className="font-bold text-yellow-400 mb-1">L - LOOK</p>
                  <p className="text-sm">Actively observe your surroundings. Look up, down, and around. Identify all hazards present
                  including the environment, equipment, other people, and activities. Use all your senses.</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border-l-4 border-blue-500">
                  <p className="font-bold text-blue-400 mb-1">A - ASSESS</p>
                  <p className="text-sm">Evaluate the risks from hazards identified. Consider likelihood and severity.
                  Determine whether existing controls are adequate or if additional measures are needed.</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border-l-4 border-green-500">
                  <p className="font-bold text-green-400 mb-1">M - MANAGE</p>
                  <p className="text-sm">Implement controls to manage the risks. This may mean proceeding with additional precautions,
                  modifying the work method, or stopping work and escalating if risks cannot be controlled.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Take 5 Assessment</p>
              <p className="text-sm text-white mb-3">
                Take 5 is a more structured approach, typically using a card or checklist. The name comes from taking
                5 minutes before starting work. Common Take 5 categories include:
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What to Check</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Task</td>
                      <td className="border border-white/10 px-3 py-2">Do I understand the job? Do I have the right skills and training?</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Environment</td>
                      <td className="border border-white/10 px-3 py-2">Weather, lighting, access, confined spaces, heights, other workers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Equipment</td>
                      <td className="border border-white/10 px-3 py-2">Right tools? Good condition? Tested/inspected? PPE available?</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Hazards</td>
                      <td className="border border-white/10 px-3 py-2">Electrical, mechanical, chemical, biological, ergonomic hazards</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Controls</td>
                      <td className="border border-white/10 px-3 py-2">Are existing controls sufficient? What additional controls are needed?</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Other Dynamic Assessment Tools</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Point of Work Risk Assessment (POWRA):</strong> More detailed card-based system with specific prompts</li>
                <li className="pl-1"><strong>Last Minute Risk Assessment (LMRA):</strong> Final check immediately before starting hazardous activities</li>
                <li className="pl-1"><strong>Stepback 5x5:</strong> Five steps back, five seconds to observe before acting</li>
                <li className="pl-1"><strong>Job Safety Analysis (JSA):</strong> Breaking tasks into steps and assessing each step</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Use Take 5 before starting work each day or when moving to a new area.
              Apply SLAM continuously throughout the day, especially when conditions change.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Decision Making and Stop Work Authority */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Decision Making and Stop Work Authority
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The outcome of a dynamic risk assessment is a decision: proceed, proceed with additional controls,
              or stop work. Understanding when to stop and having the confidence to exercise that authority is
              critical for preventing serious incidents.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Decision Framework</p>
              <div className="grid gap-3">
                <div className="p-3 rounded bg-green-500/10 border border-green-500/30">
                  <p className="font-medium text-green-400 text-sm">PROCEED</p>
                  <p className="text-sm text-white">All hazards identified, existing controls adequate, no unexpected conditions</p>
                </div>
                <div className="p-3 rounded bg-yellow-500/10 border border-yellow-500/30">
                  <p className="font-medium text-yellow-400 text-sm">PROCEED WITH ADDITIONAL CONTROLS</p>
                  <p className="text-sm text-white">Hazards identified, additional measures required but achievable, work can continue safely with modifications</p>
                </div>
                <div className="p-3 rounded bg-red-500/10 border border-red-500/30">
                  <p className="font-medium text-red-400 text-sm">STOP WORK</p>
                  <p className="text-sm text-white">Hazards cannot be adequately controlled, immediate danger exists, situation needs escalation</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Stop Work Authority - Your Right and Duty</p>
              <p className="text-sm text-white mb-3">
                Under UK law, every worker has both the right and the duty to stop work when facing serious
                and imminent danger. This is not just a company policy - it is a legal protection.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>HSWA s.7:</strong> Duty to take reasonable care - includes stopping unsafe work</li>
                <li className="pl-1"><strong>MHSWR Reg.8:</strong> Procedures for serious and imminent danger</li>
                <li className="pl-1"><strong>ERA 1996 s.44:</strong> Protection from detriment for raising health and safety concerns</li>
                <li className="pl-1"><strong>CDM Reg.15:</strong> Duty to report dangerous conditions</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use Stop Work Authority</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Discovery of unexpected live electrical equipment</li>
                <li className="pl-1">Suspected or confirmed asbestos-containing materials</li>
                <li className="pl-1">Gas leaks or suspicious odours</li>
                <li className="pl-1">Structural instability or collapse risk</li>
                <li className="pl-1">Missing or defective safety equipment (harnesses, barriers, permits)</li>
                <li className="pl-1">Weather conditions making work dangerous (lightning, high winds, flooding)</li>
                <li className="pl-1">Workers impaired by fatigue, illness, or intoxication</li>
                <li className="pl-1">Any situation where someone could be seriously injured</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Stop Work Process</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Stop</td>
                      <td className="border border-white/10 px-3 py-2">Cease work immediately. Warn others in the area.</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Secure</td>
                      <td className="border border-white/10 px-3 py-2">Make the area safe. Isolate hazards where possible.</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Report</td>
                      <td className="border border-white/10 px-3 py-2">Inform supervisor and site management immediately.</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Document</td>
                      <td className="border border-white/10 px-3 py-2">Record what was found, actions taken, and who was informed.</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Await</td>
                      <td className="border border-white/10 px-3 py-2">Do not resume until authorised and hazard is controlled.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> No one should ever be criticised for stopping work due to genuine safety concerns.
              If you are uncertain, it is always better to stop and check than to continue and cause an incident.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Building Services Scenarios */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Building Services Scenarios</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Scenario 1: Live Plant Discovery</h3>
              <p className="text-sm text-white mb-2">
                <strong>Situation:</strong> You arrive to work on a distribution board that should be isolated per the permit to work.
                Upon opening the panel and testing, you find the busbar is still live.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p><strong>STOP:</strong> Close the panel immediately. Move away from the equipment.</p>
                <p className="mt-2"><strong>LOOK:</strong> Check isolation point - is the isolator actually off? Is there a second supply?</p>
                <p className="mt-2"><strong>ASSESS:</strong> This is a serious failure of the isolation procedure. Work cannot proceed.</p>
                <p className="mt-2"><strong>MANAGE:</strong> Barrier the area. Report to site manager and permit issuer.
                Do not proceed until correct isolation is proven dead and permit reissued.</p>
                <p className="mt-2 text-red-400">This is a near-miss that must be formally reported and investigated.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Scenario 2: Occupied Building - Fire Alarm Activation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Situation:</strong> While installing containment in a functioning office building, the fire alarm activates.
                You are on a mobile tower working at height.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p><strong>STOP:</strong> Stop work immediately. Do not assume it is a false alarm or drill.</p>
                <p className="mt-2"><strong>LOOK:</strong> Check for signs of actual fire (smoke, flames). Note your escape routes.</p>
                <p className="mt-2"><strong>ASSESS:</strong> Can you descend safely and quickly? Is your equipment blocking evacuation routes?</p>
                <p className="mt-2"><strong>MANAGE:</strong> Descend immediately. Leave tools secure but do not delay evacuation to secure equipment.
                Follow building evacuation procedures. Account for all your team at the assembly point.</p>
                <p className="mt-2 text-yellow-400">Before resuming work, verify with building management that it is safe to return.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Scenario 3: Unexpected Asbestos Discovery</h3>
              <p className="text-sm text-white mb-2">
                <strong>Situation:</strong> While pulling cable through a ceiling void, you disturb material that appears to be
                asbestos insulation board around old pipework. This was not identified in the refurbishment survey.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p><strong>STOP:</strong> Stop work immediately. Do not disturb the material further.</p>
                <p className="mt-2"><strong>LOOK:</strong> Assess the extent of material visible. Note if any appears damaged or friable.</p>
                <p className="mt-2"><strong>ASSESS:</strong> This is a potential asbestos exposure. The area must be treated as contaminated until proven otherwise.</p>
                <p className="mt-2"><strong>MANAGE:</strong> Leave the area calmly. Prevent others from entering. Report to site manager immediately.
                The area must be sealed and material tested before any work continues. Record your potential exposure.</p>
                <p className="mt-2 text-red-400">This triggers legal duties under CAR 2012. Work cannot resume until a licensed asbestos survey is completed.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Scenario 4: Multi-Trade Conflict</h3>
              <p className="text-sm text-white mb-2">
                <strong>Situation:</strong> You are testing emergency lighting circuits when a mechanical contractor begins hot works
                (welding) in the same plantroom. This was not coordinated in the site meeting.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p><strong>STOP:</strong> Pause your testing. Do not assume the hot works permit covers your presence.</p>
                <p className="mt-2"><strong>LOOK:</strong> Check for fire hazards near your work area. Is there adequate ventilation? Fire watch in place?</p>
                <p className="mt-2"><strong>ASSESS:</strong> Hot works create additional hazards (fire, fumes, UV). Your emergency lighting test may
                affect the mechanical contractor's work too.</p>
                <p className="mt-2"><strong>MANAGE:</strong> Communicate with the other contractor. Agree safe working arrangements or work in different
                areas at different times. Inform both supervisors of the coordination issue.</p>
                <p className="mt-2 text-yellow-400">This is a site coordination failure that should be raised at the next site meeting.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">SLAM Quick Reference</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>S - Stop:</strong> Create a mental pause before acting</li>
                <li className="pl-1"><strong>L - Look:</strong> Use all senses to identify hazards</li>
                <li className="pl-1"><strong>A - Assess:</strong> Evaluate risk and control adequacy</li>
                <li className="pl-1"><strong>M - Manage:</strong> Implement controls or stop work</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Take 5 Checklist Summary</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Task:</strong> Understand the work and your competence</li>
                <li className="pl-1"><strong>Environment:</strong> Check conditions around you</li>
                <li className="pl-1"><strong>Equipment:</strong> Right tools in good condition</li>
                <li className="pl-1"><strong>Hazards:</strong> Identify all potential harm sources</li>
                <li className="pl-1"><strong>Controls:</strong> Ensure adequate protection measures</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Stop Work Authority Triggers</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Unexpected live electrical equipment</li>
                <li className="pl-1">Suspected asbestos or other hazardous materials</li>
                <li className="pl-1">Gas or chemical leaks</li>
                <li className="pl-1">Structural concerns</li>
                <li className="pl-1">Missing or defective safety equipment</li>
                <li className="pl-1">Any immediate danger to people</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Complacency:</strong> "I've done this job hundreds of times"</li>
                <li className="pl-1"><strong>Time pressure:</strong> "I'll just crack on, nearly finished"</li>
                <li className="pl-1"><strong>Assuming:</strong> "Someone else will have checked that"</li>
                <li className="pl-1"><strong>Not reporting:</strong> "It turned out okay so no need to tell anyone"</li>
                <li className="pl-1"><strong>Peer pressure:</strong> "No one else has stopped work"</li>
              </ul>
            </div>
          </div>
        </section>

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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Dynamic RA Principles</p>
                <ul className="space-y-0.5">
                  <li>Continuous, real-time process</li>
                  <li>Supplements formal assessments</li>
                  <li>Worker-led at point of work</li>
                  <li>Respond to changing conditions</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Legal Duties</p>
                <ul className="space-y-0.5">
                  <li>HSWA s.7 - reasonable care</li>
                  <li>MHSWR Reg.3 - suitable assessment</li>
                  <li>CDM Reg.15 - duty to report</li>
                  <li>ERA s.44 - protection from detriment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

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
            <Link to="../h-n-c-module1-section2-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 2.5
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section3">
              Next: Section 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section2_6;
