import { ArrowLeft, ArrowRight, FileText, Target, CheckCircle, AlertTriangle, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Maintaining Work Logs and Handover Sheets - Module 5.7.3 | Level 2 Electrical Course";
const DESCRIPTION = "Learn the importance of work logs and handover sheets for safety, accountability, and efficient project management in electrical installations.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of work logs?",
    options: ["To record tasks, progress, and responsibility", "To decorate the site office", "To reduce paperwork", "To replace verbal communication"],
    correctIndex: 0,
    explanation: "Work logs are essential for recording tasks, progress, and responsibility to ensure accountability and traceability."
  },
  {
    id: 2,
    question: "Which of the following should NOT be included in a work log?",
    options: ["Materials used", "Completed tasks", "Lunch break details", "Safety observations"],
    correctIndex: 2,
    explanation: "Work logs should focus on work-related activities, safety observations, and project progress, not personal break details."
  },
  {
    id: 3,
    question: "What key information must a handover sheet contain?",
    options: ["Outstanding tasks and safety notes", "Weather conditions", "Delivery schedules only", "Personal contact numbers"],
    correctIndex: 0,
    explanation: "Handover sheets must contain outstanding tasks and safety notes to ensure continuity and safety for the next team."
  }
];

export default function Module5Section7_3() {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    { id: 1, question: "What is the primary purpose of work logs?", options: ["To record tasks, progress, and responsibility", "To decorate the site office", "To reduce paperwork", "To replace verbal communication"], correctAnswer: 0 },
    { id: 2, question: "Which of the following should NOT be included in a work log?", options: ["Materials used", "Completed tasks", "Lunch break details", "Safety observations"], correctAnswer: 2 },
    { id: 3, question: "What key information must a handover sheet contain?", options: ["Outstanding tasks and safety notes", "Weather conditions", "Delivery schedules only", "Personal contact numbers"], correctAnswer: 0 },
    { id: 4, question: "Why are handover sheets important for safety?", options: ["They identify isolations and hazards for the next team", "They reduce writing needed", "They are optional under regulations", "They improve team morale"], correctAnswer: 0 },
    { id: 5, question: "In the real-world scenario, what caused the electrical fault?", options: ["Poor installation materials", "No handover notes left for the night shift", "Incorrect testing procedure", "Equipment failure"], correctAnswer: 1 },
    { id: 6, question: "What risk can arise from poor record keeping?", options: ["Missed hazards and duplicated work", "Increased energy efficiency", "Fewer site inspections", "Better team coordination"], correctAnswer: 0 },
    { id: 7, question: "When should work logs and handovers be completed?", options: ["At the end of each week", "At the end of every shift", "Only at project completion", "When the supervisor asks"], correctAnswer: 1 },
    { id: 8, question: "Why should standardised forms be used for logs and handovers?", options: ["To save money on printing", "To ensure consistency and clarity", "To reduce supervisors needed", "To make filing easier"], correctAnswer: 1 },
    { id: 9, question: "Where should work logs and handover sheets be stored?", options: ["In a safe, accessible location (physical or digital)", "Thrown away after use", "Kept in personal tool bags", "Left on the work bench"], correctAnswer: 0 },
    { id: 10, question: "Who should be made aware of handover details?", options: ["The next team, via toolbox talks or briefings", "Only the site manager", "Nobody, as long as it's written down", "Just the apprentices"], correctAnswer: 0 }
  ];

  const faqs = [
    { question: "What information should be included in work logs?", answer: "Work logs should include date and time, worker names, tasks completed, materials used, problems encountered, and health and safety observations." },
    { question: "How often should handover sheets be completed?", answer: "Handover sheets should be completed at the end of every shift to ensure continuity and safety for the incoming team." },
    { question: "What are the consequences of poor record keeping?", answer: "Poor record keeping can lead to missed safety hazards, duplicated work, disputes over progress or responsibility, and failed audits or inspections." },
    { question: "Can digital systems be used for work logs and handovers?", answer: "Yes, digital systems can be used as long as they provide secure storage, easy access for authorised personnel, and maintain proper backup procedures." },
    { question: "What should I do if I find incomplete handover information?", answer: "Contact the previous shift or responsible person immediately to clarify any missing or unclear information before starting work." }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 7.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Maintaining Work Logs and Handover Sheets
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding the importance of work logs and handover sheets for safety, accountability, and efficient project management
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Introduction
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-white/90">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Work logs and handover sheets track progress and ensure accountability</li>
                  <li>They provide critical safety information for incoming teams</li>
                  <li>Poor record keeping can lead to accidents and costly delays</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong>Spot:</strong> Work log books, handover sheets, shift briefings</li>
                  <li><strong>Use:</strong> Complete logs daily, note safety concerns, list outstanding tasks</li>
                  <li><strong>Check:</strong> Information is clear, complete, and accessible</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <FileText className="w-5 h-5 text-elec-yellow/80" />
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Explain the importance of work logs and handover sheets</li>
              <li>Identify key information that must be included in logs</li>
              <li>Understand how handover sheets improve safety and efficiency</li>
              <li>Apply best practices for maintaining accurate records</li>
              <li>Recognise how poor record keeping affects projects</li>
            </ul>
          </section>

          {/* Section 1 - Why Work Logs and Handover Sheets Matter */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Why Work Logs and Handover Sheets Matter
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Work logs and handover sheets are essential documents that ensure continuity, safety, and accountability on electrical projects:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Safety and Communication</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Identifies circuits that are isolated or energised</li>
                  <li>Records location of hazards or incomplete work</li>
                  <li>Documents safety concerns for incoming teams</li>
                  <li>Prevents accidents from miscommunication</li>
                  <li>Supports emergency response procedures</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Accountability</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Tracks individual and team responsibilities</li>
                  <li>Provides evidence of work completion</li>
                  <li>Supports quality control processes</li>
                  <li>Assists with progress monitoring</li>
                  <li>Helps resolve disputes or queries</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Efficiency</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Avoids repeating completed tasks</li>
                  <li>Identifies materials already used or needed</li>
                  <li>Highlights problems requiring attention</li>
                  <li>Facilitates better planning and scheduling</li>
                  <li>Improves coordination between trades</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm text-white/90"><strong className="text-red-400">Legal requirement:</strong> Proper documentation supports health and safety compliance and contractual obligations</p>
            </div>
          </section>

          <InlineCheck id="work-logs-purpose-check" question={quickCheckQuestions[0].question} options={quickCheckQuestions[0].options} correctIndex={quickCheckQuestions[0].correctIndex} explanation={quickCheckQuestions[0].explanation} />

          {/* Section 2 - What to Include */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              What to Include in Work Logs
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Comprehensive documentation requires specific information to be effective and useful:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Basic Information</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Date and time of work performed</li>
                  <li>Names of all operatives involved</li>
                  <li>Supervisor or responsible person</li>
                  <li>Work location or area reference</li>
                  <li>Shift information (day, night, weekend)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Work Details</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Detailed description of tasks completed</li>
                  <li>Materials and equipment used</li>
                  <li>Progress percentage or milestones achieved</li>
                  <li>Testing or inspection results</li>
                  <li>Problems encountered and solutions applied</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Safety Observations</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Safety concerns identified</li>
                  <li>Near misses or incidents</li>
                  <li>PPE used and condition</li>
                  <li>Environmental hazards noted</li>
                  <li>Safety briefings conducted</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck id="work-log-content-check" question={quickCheckQuestions[1].question} options={quickCheckQuestions[1].options} correctIndex={quickCheckQuestions[1].correctIndex} explanation={quickCheckQuestions[1].explanation} />

          {/* Section 3 - Handover Sheet Information */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Handover Sheet Information
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Handover sheets bridge the gap between shifts and teams, ensuring critical information is not lost:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Outstanding Tasks</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Tasks started but not completed</li>
                  <li>Priority order for outstanding work</li>
                  <li>Estimated time to complete tasks</li>
                  <li>Required materials or tools</li>
                  <li>Dependencies on other trades</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="font-medium text-white mb-2">Safety Information</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Circuits isolated and locked off</li>
                  <li>Location of isolation points and keys</li>
                  <li>Live circuits or equipment in area</li>
                  <li>Temporary safety measures in place</li>
                  <li>Access restrictions or permits required</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-2">Communication</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Responsible person contact details</li>
                  <li>Client or site manager updates needed</li>
                  <li>Coordination with other trades</li>
                  <li>Inspection or testing appointments</li>
                  <li>Any changes to original plans</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm text-white/90"><strong className="text-blue-400">Remember:</strong> Handover information must be communicated verbally as well as in writing</p>
            </div>
          </section>

          <InlineCheck id="handover-content-check" question={quickCheckQuestions[2].question} options={quickCheckQuestions[2].options} correctIndex={quickCheckQuestions[2].correctIndex} explanation={quickCheckQuestions[2].explanation} />

          {/* Section 4 - Risks of Poor Record Keeping */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Risks of Poor Record Keeping
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Inadequate documentation can have serious consequences for safety, efficiency, and project success:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="font-medium text-white mb-2">Safety Risks</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Missed safety hazards</li>
                  <li>Unaware of circuit isolations</li>
                  <li>Working on live circuits unknowingly</li>
                  <li>Inadequate risk assessments</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-2">Project Risks</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Work duplicated or left incomplete</li>
                  <li>Materials wasted or lost</li>
                  <li>Delays in project completion</li>
                  <li>Failed quality inspections</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
                <p className="font-medium text-white mb-2">Business Risks</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Disputes over progress</li>
                  <li>Failed audits or inspections</li>
                  <li>Legal liability issues</li>
                  <li>Reputation damage</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Financial Risks</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Increased labour costs</li>
                  <li>Equipment damage</li>
                  <li>Insurance claims</li>
                  <li>Penalty clauses</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Scenario */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Real-World Scenario
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-white mb-2">The Missing Handover</h3>
                  <p className="text-white/80 text-sm mb-3">
                    On a commercial installation, the day shift completed containment and partially wired lighting circuits but failed to record which circuits were live and which were still isolated. The night shift, unaware of this, attempted to energise a circuit that was incomplete, causing an electrical fault and damaging equipment.
                  </p>
                  <div className="bg-red-500/10 p-3 rounded-lg mb-3">
                    <p className="font-medium text-red-400 text-sm mb-1">Consequences:</p>
                    <ul className="text-white/70 list-disc ml-4 space-y-1 text-xs">
                      <li>£15,000 equipment damage</li>
                      <li>12-hour project delay</li>
                      <li>Safety investigation required</li>
                      <li>Client relationship damage</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-lg">
                    <p className="font-medium text-green-400 text-sm mb-1">Lesson Learned:</p>
                    <p className="text-white/70 text-xs">Proper handover notes identifying circuit status would have prevented the fault and ensured a safe, smooth transition between shifts.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Target className="w-5 h-5 text-elec-yellow/80" />
              Practical Guidance
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Best Practices
                </h3>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• Always complete logs and handovers at shift end</li>
                  <li>• Be specific – vague notes create confusion</li>
                  <li>• Use standard forms where possible</li>
                  <li>• Include sketches or photos when helpful</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-elec-yellow" />
                  Communication Tips
                </h3>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• Share handover sheets during toolbox talks</li>
                  <li>• Store documents securely (physical or digital)</li>
                  <li>• Ensure incoming team understands all points</li>
                  <li>• Follow up on critical safety information</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <div className="p-5 rounded-lg bg-gradient-to-br from-elec-yellow/10 to-amber-600/5 border border-elec-yellow/30">
              <div className="flex items-center gap-3 mb-4">
                <Clipboard className="w-5 h-5 text-elec-yellow" />
                <h2 className="text-xl font-semibold text-white">Pocket Guide</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <h3 className="font-medium text-white mb-2">Work Log Essentials</h3>
                  <ul className="text-white/70 space-y-1 text-xs">
                    <li>• Date, time, personnel</li>
                    <li>• Tasks completed</li>
                    <li>• Materials used</li>
                    <li>• Problems encountered</li>
                    <li>• Safety observations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-2">Handover Must-Haves</h3>
                  <ul className="text-white/70 space-y-1 text-xs">
                    <li>• Outstanding tasks</li>
                    <li>• Safety concerns</li>
                    <li>• Isolations in place</li>
                    <li>• Contact details</li>
                    <li>• Access issues</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-2">Key Reminders</h3>
                  <ul className="text-white/70 space-y-1 text-xs">
                    <li>• Complete at shift end</li>
                    <li>• Be specific and clear</li>
                    <li>• Communicate verbally too</li>
                    <li>• Store securely</li>
                    <li>• Follow up on critical items</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                  <h3 className="font-medium text-white mb-2">Q: {faq.question}</h3>
                  <p className="text-white/80 text-sm">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h2 className="text-xl font-semibold text-white">Recap</h2>
            </div>
            <p className="text-white/80 mb-4">
              In this subsection, you learned why maintaining work logs and handover sheets is critical for safety, accountability, and efficiency. Good documentation protects everyone and keeps projects running smoothly.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Work logs record tasks, progress, and responsibility</li>
              <li>Handover sheets ensure critical safety information is passed between teams</li>
              <li>Poor documentation causes safety risks, delays, and disputes</li>
              <li>Complete logs at the end of every shift using standardised forms</li>
            </ul>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Work Logs and Handover Sheets" />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
            <Button variant="outline" className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]" asChild>
              <Link to="../7-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Cable Labelling
              </Link>
            </Button>
            <Button className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]" asChild>
              <Link to="../7-4">
                Next: As-Built Drawings
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
}
