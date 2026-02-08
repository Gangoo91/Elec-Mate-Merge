import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Time Management and Organisation - MOET Module 7 Section 4.3";
const DESCRIPTION = "Developing effective time management and organisational skills for the engineering workplace and EPA: prioritisation, planning, meeting deadlines and managing workload as an engineering maintenance technician under ST1426.";

const quickCheckQuestions = [
  {
    id: "time-priority",
    question: "When you arrive at work with multiple maintenance tasks to complete, what is the most effective approach to prioritisation?",
    options: [
      "Start with the easiest task first",
      "Assess each task's urgency and impact — safety-critical and production-affecting faults take priority, followed by planned maintenance, then non-urgent improvements — and plan your day accordingly",
      "Work through them in the order they were reported",
      "Ask your supervisor to decide everything for you"
    ],
    correctIndex: 1,
    explanation: "Effective prioritisation considers both urgency and impact. Safety-critical issues always take priority. Production-affecting faults come next because downtime has direct commercial consequences. Planned maintenance and non-urgent work can be scheduled around these priorities. This risk-based approach is a key professional behaviour assessed in the EPA."
  },
  {
    id: "time-planning",
    question: "Why is planning your work sequence important for maintenance tasks?",
    options: [
      "It is not important — just start working",
      "Planning ensures you have the right tools, parts and permits before starting, minimises wasted time between tasks, and allows you to coordinate with production and other trades effectively",
      "It only matters for complex jobs",
      "Your supervisor handles all planning"
    ],
    correctIndex: 1,
    explanation: "Planning reduces inefficiency: gathering tools and parts in advance prevents multiple trips to stores, coordinating with production ensures equipment access, and sequencing tasks logically (e.g., completing all work in one area before moving to another) minimises travel time. Good planning is a professional skill the assessor looks for."
  },
  {
    id: "time-deadlines",
    question: "How should you handle a situation where you realise you cannot complete a maintenance task within the allocated time?",
    options: [
      "Rush to finish, cutting corners if necessary",
      "Communicate early with your supervisor, explain the situation and reasons for the delay, and agree a realistic revised timeline or arrange additional support",
      "Just keep working and hope no one notices",
      "Abandon the task and move to the next one"
    ],
    correctIndex: 1,
    explanation: "Early communication is essential. Rushing leads to errors and safety risks. Hiding delays causes bigger problems when they are eventually discovered. Professional technicians communicate proactively: explain what is causing the delay (unexpected findings, additional work required, parts needed), provide a realistic revised estimate, and agree the best course of action with their supervisor."
  },
  {
    id: "time-tracking",
    question: "What is the main benefit of using a tracking system (list, spreadsheet or CMMS) to manage your maintenance workload?",
    options: [
      "It impresses management during audits",
      "It prevents tasks from being forgotten, ensures deadlines are visible, allows you to review priorities when circumstances change, and provides evidence of your workload management for the EPA",
      "It is only useful for large teams, not individuals",
      "Tracking systems slow you down and add paperwork"
    ],
    correctIndex: 1,
    explanation: "A tracking system — whether a simple written list or a CMMS — ensures nothing falls through the gaps. When you are managing both reactive and planned work, it is easy to lose track of commitments. A single, regularly reviewed system gives you visibility of all tasks, their deadlines and their current status, and provides excellent EPA portfolio evidence of professional workload management."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Effective time management for a maintenance technician includes:",
    options: [
      "Working as fast as possible on every task",
      "Planning work sequences, gathering materials in advance, coordinating with other teams, communicating realistic timescales and adapting priorities when circumstances change",
      "Only working on one task at a time regardless of urgency",
      "Letting others manage your time entirely"
    ],
    correctAnswer: 1,
    explanation: "Time management in maintenance is about working efficiently, not just quickly. Planning, preparation, coordination and communication all reduce wasted time and improve outcomes. The ability to adapt when urgent issues arise — while still managing routine commitments — is a key professional skill."
  },
  {
    id: 2,
    question: "When planning a planned maintenance shutdown, the most important time management consideration is:",
    options: [
      "Starting as early as possible",
      "Sequencing tasks so that critical-path activities are completed first, ensuring all parts and tools are available before the shutdown begins, and allowing contingency time for unexpected findings",
      "Doing everything in alphabetical order",
      "Completing paperwork last"
    ],
    correctAnswer: 1,
    explanation: "Shutdown time is precious — every hour of downtime costs the business money. Identifying the critical path (tasks that must be completed before others can start), pre-staging materials, and allowing contingency for unexpected findings ensures the shutdown is completed efficiently and on time."
  },
  {
    id: 3,
    question: "A daily work plan should include:",
    options: [
      "Only the main task for the day",
      "Prioritised task list, estimated times, required tools and materials, permits needed, coordination requirements with other teams, and time for documentation and logging",
      "Just the start and finish times",
      "Only emergency call-out plans"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive daily plan covers all aspects of your work: what you need to do (prioritised), how long each task should take, what you need (tools, parts, permits), who you need to coordinate with, and time for documentation. Even 10 minutes of planning at the start of the day can save hours of wasted time."
  },
  {
    id: 4,
    question: "If an emergency breakdown interrupts your planned maintenance schedule, you should:",
    options: [
      "Ignore the emergency and continue with planned work",
      "Assess the emergency priority, secure any work in progress safely, respond to the emergency, then re-plan remaining scheduled work and communicate any impact to affected parties",
      "Panic and try to do everything simultaneously",
      "Wait for your supervisor to tell you what to do"
    ],
    correctAnswer: 1,
    explanation: "Emergency response requires quick but structured decision-making: assess the urgency, make your current work safe (do not leave live circuits exposed), respond to the emergency, then reassess your daily plan. Communicate any knock-on effects to your supervisor and affected parties promptly."
  },
  {
    id: 5,
    question: "Estimating task duration accurately is important because:",
    options: [
      "It impresses your supervisor",
      "It enables realistic planning, ensures adequate resources are allocated, allows coordination with production schedules, and builds trust in your professional judgement",
      "It only matters for quoted work",
      "Estimates are never accurate so there is no point"
    ],
    correctAnswer: 1,
    explanation: "Accurate time estimation is a skill that develops with experience. It enables: realistic planning (not overcommitting), resource allocation (ensuring parts and support are available when needed), production coordination (accurate shutdown windows), and trust-building (stakeholders rely on your estimates for their own planning)."
  },
  {
    id: 6,
    question: "Organisational skills for a maintenance technician include:",
    options: [
      "Having a tidy desk",
      "Maintaining organised tools and test equipment, keeping accurate records, filing documentation systematically, managing spare parts knowledge, and ensuring all work is properly signed off and closed out",
      "Only keeping your locker clean",
      "Organisation is not relevant to maintenance work"
    ],
    correctAnswer: 1,
    explanation: "Organisation in maintenance goes beyond tidiness: knowing where your tools are (saves time searching), keeping test equipment calibrated and accessible, maintaining accurate records (compliance and evidence), filing documentation properly (traceability), and ensuring work is closed out correctly (safety and audit requirements)."
  },
  {
    id: 7,
    question: "When managing multiple ongoing tasks with different deadlines, an effective approach is:",
    options: [
      "Focus only on the nearest deadline",
      "Use a tracking system (list, spreadsheet or app) to monitor all tasks, their deadlines and current status, reviewing and updating it regularly to ensure nothing is missed",
      "Remember everything mentally",
      "Only work on tasks when reminded by others"
    ],
    correctAnswer: 1,
    explanation: "A tracking system prevents tasks from being forgotten or deadlines missed. Whether a simple written list, a spreadsheet, or a digital task management tool, the key is having a single place where all commitments are recorded, prioritised and regularly reviewed. This is especially important when managing both reactive and planned work."
  },
  {
    id: 8,
    question: "Preparation before starting a maintenance task should include:",
    options: [
      "Just grabbing your toolbox",
      "Reviewing the job scope, checking availability of parts and materials, ensuring test equipment is calibrated and charged, obtaining necessary permits, informing production of the work window, and briefing any team members involved",
      "Reading the instruction manual only",
      "Preparation wastes time — just start working"
    ],
    correctAnswer: 1,
    explanation: "Thorough preparation prevents the most common time-wasters: missing parts requiring trips to stores, flat test equipment batteries, delayed permits holding up work, production not expecting you, and team members not briefed. Fifteen minutes of preparation can save an hour of delays during the task."
  },
  {
    id: 9,
    question: "Documentation and record-keeping as part of time management means:",
    options: [
      "Documentation can wait until you have free time",
      "Allocating specific time for completing documentation as part of the task — records are completed while information is fresh, ensuring accuracy and avoiding a backlog of paperwork",
      "Documenting only unusual events",
      "Documentation is someone else's responsibility"
    ],
    correctAnswer: 1,
    explanation: "Documentation is part of the task, not an addition to it. Completing records immediately after (or during) the work ensures accuracy and prevents a growing backlog that becomes increasingly difficult to complete. Allocate 10-15 minutes at the end of each task for documentation as standard practice."
  },
  {
    id: 10,
    question: "The EPA assessor may evaluate your time management through:",
    options: [
      "Timing how fast you work",
      "Evidence in your portfolio of planned approaches, prioritisation decisions, deadline management, and professional communication about timescales — demonstrated through activity logs, reflective accounts and witness statements",
      "A timed test",
      "They do not assess time management"
    ],
    correctAnswer: 1,
    explanation: "Time management is assessed as a professional behaviour throughout the EPA. Your portfolio should show evidence of planning, prioritisation and deadline management. During the professional discussion, you may be asked about how you manage your workload, handle competing priorities, or deal with unexpected changes to your schedule."
  },
  {
    id: 11,
    question: "If you consistently find you have too much work and not enough time, you should:",
    options: [
      "Just work longer hours",
      "Discuss workload with your supervisor, identify whether the issue is workload volume, task estimation, or efficiency, and agree adjustments such as re-prioritisation, additional support, or skills development",
      "Accept it as normal and say nothing",
      "Rush everything to get through the list"
    ],
    correctAnswer: 1,
    explanation: "Consistent overload is a management issue, not a personal failing. Discuss it professionally with your supervisor: is the workload genuinely too high? Are your time estimates unrealistic (perhaps needing more experience)? Could you work more efficiently (perhaps needing different tools or training)? Finding the root cause leads to a sustainable solution."
  },
  {
    id: 12,
    question: "When handing over incomplete work to the next shift, effective time management requires:",
    options: [
      "Just leaving the work area and going home",
      "Providing a clear, structured handover — what has been completed, what remains, what parts and tools are needed, any safety considerations, and the expected time to complete — so the next person can continue efficiently",
      "Sending a brief text message",
      "Handovers are not necessary if the CMMS is updated"
    ],
    correctAnswer: 1,
    explanation: "A structured handover prevents the next person from wasting time figuring out where you left off. Cover: work completed so far, remaining tasks, parts and tools needed (and where they are), any safety considerations (isolated circuits, open panels), and your estimate for completion. A good handover saves the next person significant time and reduces the risk of errors."
  }
];

const faqs = [
  {
    question: "How do I balance reactive (breakdown) work with planned maintenance?",
    answer: "This is one of the core challenges of maintenance work. The key is building flexibility into your planned schedule — do not fill every hour with planned tasks, leave buffer time for reactive work. When breakdowns occur, assess priority (safety-critical breakdowns always take precedence), secure your current work safely, respond to the emergency, then re-plan. Communicate any impact on planned work to your supervisor."
  },
  {
    question: "How should I handle being asked to do too many things at once?",
    answer: "Communicate clearly and professionally. List the tasks, explain the time each will realistically take, and ask your supervisor to help prioritise. 'I have tasks A, B and C to complete. I can do A and B by end of today, but C will need to move to tomorrow. Which is the priority?' This demonstrates professional communication and realistic assessment — both EPA behaviours."
  },
  {
    question: "Is time management really assessed in the EPA?",
    answer: "Yes. Time management falls under professional behaviours in the ST1426 standard. It is assessed through your portfolio evidence (do your activity logs show planning and organisation?), the practical observation (do you work efficiently and methodically?), and the professional discussion (can you describe how you manage your workload?). It is not a separate assessment but is evaluated throughout."
  },
  {
    question: "What tools or apps help with time management for maintenance work?",
    answer: "Many maintenance teams use CMMS (Computerised Maintenance Management Systems) for task scheduling and tracking. For personal organisation, simple tools work well: a daily task list (paper or phone), calendar reminders for deadlines, and a notebook for recording tasks as they arise. The best tool is the one you actually use consistently."
  },
  {
    question: "How do I improve my time estimation skills?",
    answer: "Track your actual times against estimates. After each task, note how long it actually took versus your estimate. Over time, patterns emerge: you may consistently underestimate certain types of work. Discuss estimates with experienced colleagues — they can help calibrate your expectations. Experience is the best teacher, but only if you actively track and reflect on your performance."
  }
];

const MOETModule7Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section4">
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
            <span>Module 7.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Time Management and Organisation
          </h1>
          <p className="text-white/80">
            Planning, prioritising and managing your workload effectively as a professional engineering technician
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Prioritisation:</strong> Safety-critical, production, planned, non-urgent</li>
              <li className="pl-1"><strong>Planning:</strong> Tools, parts, permits, coordination in advance</li>
              <li className="pl-1"><strong>Communication:</strong> Realistic timescales and early notification</li>
              <li className="pl-1"><strong>Adaptation:</strong> Responding to emergencies without losing control</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">EPA Assessment Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Professional behaviour:</strong> Assessed throughout all EPA components</li>
              <li className="pl-1"><strong>Practical observation:</strong> Efficient, methodical working approach</li>
              <li className="pl-1"><strong>Discussion:</strong> Describe how you manage competing priorities</li>
              <li className="pl-1"><strong>ST1426:</strong> Core professional behaviour requirement</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Prioritise maintenance tasks based on safety, production impact and urgency",
              "Plan work sequences to minimise wasted time and maximise efficiency",
              "Communicate realistic timescales and manage stakeholder expectations",
              "Handle interruptions and emergency work without losing control of planned tasks",
              "Use tracking systems to manage multiple ongoing commitments",
              "Demonstrate time management as a professional behaviour in the EPA"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Prioritisation in Maintenance Work
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maintenance technicians rarely have the luxury of working on one task at a time. You will have a
              planned maintenance schedule, reactive breakdown calls, improvement projects, and training
              commitments all competing for your time. Effective prioritisation is what separates a competent
              professional from someone who is always chasing their tail.
            </p>

            <p>
              The key to prioritisation is understanding both urgency and impact. A task might be urgent
              (it needs attention now) but low impact (the consequences of a short delay are minimal). Another
              task might not be urgent (it can wait) but high impact (if it is not done, there will be serious
              consequences). Professional technicians evaluate both dimensions before deciding what to work on first.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Priority Classification System</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Priority 1 — Safety critical:</strong> Immediate action required. Equipment failures that endanger people, electrical faults creating shock or fire risk, safety system failures. Drop everything and respond.</li>
                <li className="pl-1"><strong>Priority 2 — Production critical:</strong> Urgent response. Equipment breakdowns stopping or significantly affecting production. Respond promptly but safely — do not rush to the point of creating new hazards.</li>
                <li className="pl-1"><strong>Priority 3 — Planned maintenance:</strong> Scheduled work. Preventive maintenance, inspections, testing due within the planned window. Important but can usually be rescheduled if higher-priority work intervenes.</li>
                <li className="pl-1"><strong>Priority 4 — Non-urgent:</strong> Can be planned. Improvement projects, non-critical repairs, cosmetic issues, training activities. Schedule when capacity allows.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Urgency vs Impact Matrix</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left"></th>
                      <th className="border border-white/10 px-3 py-2 text-left">High Impact</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Low Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">High Urgency</td>
                      <td className="border border-white/10 px-3 py-2">Do immediately (P1/P2)</td>
                      <td className="border border-white/10 px-3 py-2">Do promptly but do not drop critical work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Low Urgency</td>
                      <td className="border border-white/10 px-3 py-2">Schedule soon — do not let it become urgent</td>
                      <td className="border border-white/10 px-3 py-2">Schedule when capacity allows (P4)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Prioritisation is a decision-making skill. Document your reasoning in
              your activity log — "I prioritised the AHU breakdown (P2) over the scheduled lamp replacement (P3)
              because the AHU failure was affecting the clean room temperature control." This demonstrates
              professional judgement to the assessor.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Planning and Preparation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The most productive maintenance technicians spend time planning before they start working.
              A few minutes of preparation prevents hours of delays — missing parts, unavailable access,
              wrong tools, flat batteries on test equipment. Preparation is not wasted time; it is the
              foundation of efficient work.
            </p>

            <p>
              The old engineering saying "proper preparation prevents poor performance" exists because it is
              consistently true. Technicians who jump straight into tasks without preparation often find
              themselves making multiple trips to stores, waiting for permits, or discovering they need
              equipment that is not charged or calibrated. Each interruption costs time and breaks
              concentration.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Task Planning Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Understand the scope:</strong> What exactly needs to be done? What is the expected outcome?</li>
                <li className="pl-1"><strong>Check drawings and manuals:</strong> Review relevant documentation before arriving at the equipment</li>
                <li className="pl-1"><strong>Gather tools and materials:</strong> Assemble everything needed before starting — avoid return trips to stores</li>
                <li className="pl-1"><strong>Verify test equipment:</strong> Batteries charged, calibration current, correct leads and probes</li>
                <li className="pl-1"><strong>Obtain permits:</strong> If needed, arrange permits to work, hot permits, or access permits in advance</li>
                <li className="pl-1"><strong>Coordinate access:</strong> Inform production, building management or clients when you will need access</li>
                <li className="pl-1"><strong>Brief the team:</strong> If working with others, ensure everyone knows the plan, their role, and the safety requirements</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Time-Wasters and How to Avoid Them</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Time-Waster</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Prevention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Missing parts — trip to stores mid-task</td>
                      <td className="border border-white/10 px-3 py-2">Check parts availability and gather before starting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flat test equipment batteries</td>
                      <td className="border border-white/10 px-3 py-2">Charge after every use; check before each job</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Waiting for permit to work</td>
                      <td className="border border-white/10 px-3 py-2">Arrange permits in advance, not at the point of work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Production cannot release equipment</td>
                      <td className="border border-white/10 px-3 py-2">Coordinate access windows in advance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wrong tools for the job</td>
                      <td className="border border-white/10 px-3 py-2">Review task requirements and check toolbox before leaving the workshop</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> "Proper preparation prevents poor performance." This engineering
              mantra exists because it is true. The time invested in preparation is always repaid in smoother,
              faster, safer execution.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Managing Deadlines and Expectations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Meeting deadlines and managing expectations are closely linked. If you communicate realistic
              timescales at the outset and provide early warning when problems arise, stakeholders can plan
              accordingly. Surprises are far more damaging than bad news delivered early.
            </p>

            <p>
              In maintenance, deadlines come in many forms: planned maintenance windows, shutdown schedules,
              equipment return-to-service commitments, compliance inspection dates, and project milestones.
              Each carries different consequences for missing the deadline, and understanding those consequences
              helps you prioritise and communicate effectively.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Deadline Management Principles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Estimate realistically:</strong> Include time for preparation, the task itself, testing, documentation and clearing up</li>
                <li className="pl-1"><strong>Add contingency:</strong> Allow 15-20% extra for unexpected findings — in maintenance, surprises are normal</li>
                <li className="pl-1"><strong>Communicate early:</strong> If you realise a deadline is at risk, inform stakeholders immediately — not when it is already missed</li>
                <li className="pl-1"><strong>Offer solutions:</strong> When communicating delays, also suggest solutions: "The repair will take longer because X. I can complete by Y, or if we bring in Z as support, we can meet the original deadline."</li>
                <li className="pl-1"><strong>Document commitments:</strong> Keep a record of agreed deadlines and report completion</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Never Compromise Safety to Meet a Deadline</p>
              <p className="text-sm text-white">
                Time pressure is one of the most common causes of accidents in maintenance work. If completing
                a task safely will take longer than the deadline allows, communicate this clearly. A professional
                technician never shortcuts safe isolation, skips testing, or rushes live working because of
                time pressure. The assessor will look for evidence that you maintain safety standards regardless
                of schedule pressure.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Under-promising and over-delivering is always better than
              over-promising and under-delivering. A realistic estimate that you meet builds far more trust
              than an optimistic estimate that you miss.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Organisation and Record-Keeping
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Organisation extends beyond time management to how you manage your tools, equipment,
              documentation and workspace. A well-organised technician works more efficiently, makes
              fewer errors, and presents a more professional image — all of which contribute to your EPA
              assessment.
            </p>

            <p>
              Employers consistently rate organisation as one of the top professional attributes they look
              for in maintenance technicians. It is not about being obsessively tidy — it is about having
              systems that work. Knowing where your tools are, keeping accurate records, filing documentation
              correctly, and closing out work properly are all practical skills that save time and reduce
              errors.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Organisational Best Practices</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Tool management:</strong> Keep tools clean, organised and accounted for. Use a tool inventory and check tools in and out of each job</li>
                <li className="pl-1"><strong>Test equipment:</strong> Maintain calibration records, charge batteries after use, and check leads for damage before each use</li>
                <li className="pl-1"><strong>Documentation:</strong> Complete records as you work, not retrospectively. File documents systematically in your portfolio</li>
                <li className="pl-1"><strong>Workspace:</strong> Leave work areas clean and safe after completing tasks. Good housekeeping is a safety and professional requirement</li>
                <li className="pl-1"><strong>Knowledge management:</strong> Keep a reference file of common fault codes, wiring diagrams and maintenance procedures for equipment you work on regularly</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation as a Time Management Tool</p>
              <p className="text-sm text-white mb-3">
                Good documentation actually saves time, even though it takes time to create. Here is why:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Completed records prevent having to revisit work to check what was done</li>
                <li className="pl-1">Accurate maintenance history speeds up future fault diagnosis on the same equipment</li>
                <li className="pl-1">Properly filed documents are found quickly when needed for audits or compliance checks</li>
                <li className="pl-1">Well-written handover notes prevent the next person from wasting time figuring out what happened</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Allocate 10-15 minutes at the end of each task specifically for
              documentation. Treating documentation as part of the task — not an addition to it — ensures
              records are completed while information is fresh.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Demonstrating Time Management in the EPA
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Time management and organisation are assessed as professional behaviours throughout the EPA.
              During the practical observation, the assessor will note your methodical approach, preparation
              and efficient use of time. In the professional discussion, you may be asked to describe how
              you manage your workload, handle competing priorities, or organise your work.
            </p>

            <p>
              The strongest evidence of time management comes from your daily practice throughout the
              apprenticeship, not from a single instance. Consistent evidence of planning, prioritisation,
              deadline management and professional communication builds a compelling picture of a well-organised
              professional.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building EPA Evidence of Time Management</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Activity logs:</strong> Include descriptions of how you planned and prioritised your work each day</li>
                <li className="pl-1"><strong>Reflective accounts:</strong> Write about situations where you had to re-prioritise due to emergencies and how you managed it</li>
                <li className="pl-1"><strong>Witness statements:</strong> Ask supervisors to comment on your organisational skills and reliability</li>
                <li className="pl-1"><strong>Practical observation:</strong> Work methodically — the assessor notices preparation, efficient use of time, and tidy close-out</li>
                <li className="pl-1"><strong>Discussion preparation:</strong> Prepare specific examples of prioritisation decisions, deadline management, and workload communication</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Discussion Preparation Example</p>
              <p className="text-sm text-white">
                "During a planned shutdown, I was asked to respond to an emergency breakdown on a separate
                production line. I secured my current work safely, assessed the emergency (a drive fault
                affecting the main packing line — P2 priority), and responded. I communicated the impact
                on my shutdown tasks to my supervisor, who arranged for a colleague to continue the
                planned work. I documented my decisions in my activity log." This type of specific,
                structured example demonstrates professional time management clearly.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Time management and organisation are woven into the fabric of
              professional engineering practice. The assessor does not give a separate grade for time
              management — they observe it as part of your overall professional competence. A technician
              who works methodically, communicates well, and manages their workload professionally
              demonstrates the behaviours the standard requires.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Reference</h2>
          <div className="p-4 rounded-lg bg-white/5">
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1">Safety-critical tasks always take top priority regardless of other commitments</li>
              <li className="pl-1">Plan and prepare before starting — 15 minutes of preparation saves hours of delays</li>
              <li className="pl-1">Communicate realistic timescales and provide early warning of any delays</li>
              <li className="pl-1">Never compromise safety to meet a deadline</li>
              <li className="pl-1">Use a tracking system to manage multiple tasks and deadlines</li>
              <li className="pl-1">Complete documentation as part of the task, not afterwards</li>
              <li className="pl-1">Document prioritisation decisions in your activity log for EPA evidence</li>
            </ul>
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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — Time Management"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Communication Skills
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section4-4">
              Next: Initiative and Problem-Solving
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section4_3;
