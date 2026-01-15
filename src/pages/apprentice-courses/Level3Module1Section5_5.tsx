import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What does PDCA stand for in the context of continual improvement?",
    options: [
      "Prevent, Detect, Control, Act",
      "Plan, Do, Check, Act",
      "Policy, Documentation, Compliance, Assessment",
      "Protect, Deliver, Communicate, Achieve"
    ],
    correctIndex: 1,
    explanation: "PDCA (Plan, Do, Check, Act) is the fundamental cycle of continual improvement. Plan what you want to achieve, Do (implement it), Check if it's working, and Act to standardise or correct. This cycle then repeats."
  },
  {
    id: "check-2",
    question: "Which is an example of a 'lagging' safety performance indicator?",
    options: [
      "Number of safety training sessions completed",
      "Percentage of risk assessments reviewed on time",
      "Number of accidents resulting in lost time",
      "Number of safety observations made"
    ],
    correctIndex: 2,
    explanation: "Lagging indicators measure outcomes after the fact - accidents, injuries, ill health. They tell you what has already happened. Number of accidents is a classic lagging indicator."
  },
  {
    id: "check-3",
    question: "Why is it important to review the effectiveness of control measures?",
    options: [
      "To satisfy insurance requirements only",
      "To ensure controls remain effective as circumstances change",
      "Only required after major accidents",
      "To reduce paperwork"
    ],
    correctIndex: 1,
    explanation: "Circumstances change - new processes, equipment, personnel, or regulations may make existing controls inadequate. Regular review ensures controls remain effective and are adjusted when needed."
  },
  {
    id: "check-4",
    question: "What should trigger a review of risk assessments?",
    options: [
      "Only when the HSE visits",
      "Annually regardless of circumstances",
      "After accidents, near misses, process changes, or if controls are found inadequate",
      "Only when workers request it"
    ],
    correctIndex: 2,
    explanation: "Risk assessments should be reviewed when they may no longer be valid: after accidents or near misses, when processes/equipment change, when new information about hazards emerges, or if current controls are found to be inadequate."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is 'continual improvement' in health and safety?",
    options: [
      "Making major changes once a year",
      "An ongoing process of enhancing safety performance through incremental improvements",
      "Only fixing problems when accidents occur",
      "Spending more money on safety equipment"
    ],
    correctAnswer: 1,
    explanation: "Continual improvement is an ongoing, cyclical process of identifying opportunities for enhancement and making incremental improvements to safety performance. It's about constant evolution, not one-off changes."
  },
  {
    id: 2,
    question: "What is the difference between 'leading' and 'lagging' indicators?",
    options: [
      "Leading indicators are more important than lagging",
      "Leading indicators predict/prevent harm; lagging indicators measure what has happened",
      "Lagging indicators are used first, then leading",
      "There is no real difference"
    ],
    correctAnswer: 1,
    explanation: "Leading indicators are proactive measures that predict or prevent harm (training completion, inspections done). Lagging indicators measure outcomes after the fact (accidents, injuries). Both types are needed for a complete picture."
  },
  {
    id: 3,
    question: "Which of the following is a 'leading' safety indicator?",
    options: [
      "Number of lost time injuries",
      "Days lost to workplace accidents",
      "Percentage of planned safety inspections completed",
      "Number of compensation claims"
    ],
    correctAnswer: 2,
    explanation: "Percentage of planned inspections completed is a leading indicator - it measures proactive safety activity that aims to prevent incidents. The other options all measure outcomes that have already occurred (lagging indicators)."
  },
  {
    id: 4,
    question: "What is the purpose of management review in a safety management system?",
    options: [
      "To discipline underperforming workers",
      "To ensure the system remains suitable, adequate, and effective",
      "To prepare for HSE inspections only",
      "To reduce safety spending"
    ],
    correctAnswer: 1,
    explanation: "Management review assesses whether the safety management system is suitable (right for the organisation), adequate (properly resourced), and effective (achieving its objectives). It drives strategic improvement."
  },
  {
    id: 5,
    question: "ISO 45001:2018 requires organisations to:",
    options: [
      "Never change their safety procedures",
      "Establish, implement, maintain and continually improve an OH&S management system",
      "Only comply when clients demand it",
      "Use the exact same approach as all other companies"
    ],
    correctAnswer: 1,
    explanation: "ISO 45001 is built on the principle of continual improvement. Organisations must establish a system, implement it, maintain it over time, and continually improve it. Static compliance is not sufficient."
  },
  {
    id: 6,
    question: "What role do workers play in continual improvement?",
    options: [
      "None - it's a management responsibility",
      "They should suggest improvements, report problems, and participate in reviews",
      "Only to follow procedures without question",
      "To approve management decisions"
    ],
    correctAnswer: 1,
    explanation: "Worker participation is essential for continual improvement. Workers have direct experience of hazards and controls, can suggest practical improvements, identify when procedures don't work, and are more likely to support changes they helped develop."
  },
  {
    id: 7,
    question: "What should happen after an accident investigation identifies root causes?",
    options: [
      "File the report and move on",
      "Blame the individuals involved",
      "Implement corrective actions and update systems to prevent recurrence",
      "Wait to see if it happens again"
    ],
    correctAnswer: 2,
    explanation: "The purpose of accident investigation is learning and prevention. Root causes should drive corrective actions - changes to procedures, training, equipment, or systems that prevent the same failure occurring again."
  },
  {
    id: 8,
    question: "How often should a health and safety policy be reviewed?",
    options: [
      "Never - once written it is permanent",
      "Only when the HSE requires it",
      "At least annually, or when significant changes occur",
      "Every 10 years"
    ],
    correctAnswer: 2,
    explanation: "Health and safety policies should be reviewed at least annually to ensure they remain current. Additionally, they should be reviewed after significant changes - new activities, organisational changes, incidents, or regulatory changes."
  },
  {
    id: 9,
    question: "What is a 'safety performance target'?",
    options: [
      "The maximum number of accidents allowed",
      "A specific, measurable goal for safety improvement",
      "A legal requirement set by HSE",
      "An insurance threshold"
    ],
    correctAnswer: 1,
    explanation: "Safety performance targets are specific, measurable goals for improvement - for example, 'complete 100% of planned inspections,' 'reduce lost time injuries by 25%,' or 'achieve zero prohibition notices.' They drive focused effort."
  },
  {
    id: 10,
    question: "What does HSG65 'Managing for Health and Safety' recommend for monitoring?",
    options: [
      "Only reactive monitoring after accidents",
      "Both active (proactive) and reactive monitoring",
      "No specific guidance on monitoring",
      "External monitoring by HSE only"
    ],
    correctAnswer: 1,
    explanation: "HSG65 recommends both active monitoring (inspections, audits, observations - checking before things go wrong) and reactive monitoring (investigating accidents, ill health, incidents - learning from failures). Both are essential."
  },
  {
    id: 11,
    question: "Why is trend analysis important in safety management?",
    options: [
      "It satisfies documentation requirements",
      "It identifies patterns that indicate systemic problems needing attention",
      "It is required by law",
      "It replaces the need for inspections"
    ],
    correctAnswer: 1,
    explanation: "Trend analysis looks at patterns over time - increasing near misses, recurring issues in one area, seasonal variations. Identifying trends helps focus resources on systemic problems rather than just individual incidents."
  },
  {
    id: 12,
    question: "What is 'benchmarking' in safety performance?",
    options: [
      "Setting up benches in the workplace",
      "Comparing your safety performance against others or standards",
      "Recording minimum acceptable standards",
      "A type of safety equipment"
    ],
    correctAnswer: 1,
    explanation: "Benchmarking compares your safety performance against similar organisations, industry averages, or recognised standards. It helps identify where you excel or lag behind and provides targets for improvement."
  }
];

const faqs = [
  {
    question: "How do I know if our safety management is improving?",
    answer: "Look at multiple indicators: Are accident rates declining? Are near misses being reported and resolved? Are inspections finding fewer issues? Are workers more engaged in safety? Is training completion high? Don't rely on one measure - improving performance shows across multiple indicators consistently over time."
  },
  {
    question: "What if continual improvement feels overwhelming?",
    answer: "Focus on small, manageable steps rather than major overhauls. The PDCA cycle works best with regular small improvements rather than occasional big changes. Prioritise based on risk - tackle the biggest hazards first. Celebrate progress to maintain momentum."
  },
  {
    question: "How often should we review our safety performance?",
    answer: "Regular reviews at multiple levels: daily/weekly for operational matters (inspections, observations), monthly for team performance metrics, quarterly for management review of system effectiveness, and annually for strategic review of policy and objectives. More frequent reviews for higher-risk activities."
  },
  {
    question: "What should trigger an immediate review outside the normal schedule?",
    answer: "Serious accidents or near misses, significant changes to processes or equipment, new legislation or guidance, feedback from workers highlighting problems, failed audits, enforcement action by HSE, or when monitoring reveals controls aren't working."
  },
  {
    question: "How do we get workers engaged in improvement?",
    answer: "Involve them from the start - ask for their input on problems and solutions. Respond visibly when they raise concerns. Give feedback on how their suggestions were used. Recognise contributions. Make improvement part of everyone's job, not just management's. Workers are more likely to support changes they helped create."
  },
  {
    question: "What's the link between ISO 45001 and continual improvement?",
    answer: "ISO 45001 is built on the PDCA cycle - the entire standard is structured around Plan (clauses 4-6), Do (clauses 7-8), Check (clause 9), and Act (clause 10). Continual improvement isn't just one requirement - it's the fundamental principle underlying the whole system."
  }
];

const Level3Module1Section5_5 = () => {
  useSEO(
    "5.5 Monitoring & Continual Improvement - Level 3 Health & Safety",
    "Performance monitoring, PDCA cycle, leading and lagging indicators, and continual improvement in UK workplace safety management"
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Section Header */}
      <div className="sticky top-0 z-30 w-full bg-elec-yellow shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-3 px-4 sm:px-6 py-3">
          <Link
            to="/apprentice-courses/level-3-health-safety/module-1/section-5"
            className="text-black hover:underline font-semibold text-sm flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </Link>
          <span className="text-black/50">/</span>
          <span className="font-bold text-black text-lg">5.5 Monitoring & Continual Improvement</span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-gray-200">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Monitoring & Continual Improvement
          </h1>
          <p className="text-lg text-gray-300">
            Using performance data to drive ongoing enhancement of health and safety management.
          </p>
        </header>

        {/* Quick Summary Box */}
        <div className="bg-[#222] border-l-4 border-elec-yellow rounded p-5 mb-8">
          <h2 className="text-lg font-bold flex items-center gap-2 text-elec-yellow mb-2">
            <Zap className="h-5 w-5" /> Quick Summary
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>PDCA (Plan-Do-Check-Act) is the foundation of continual improvement</li>
            <li>Leading indicators predict/prevent; lagging indicators measure outcomes</li>
            <li>Both proactive and reactive monitoring are essential</li>
            <li>Regular review ensures the system remains effective</li>
            <li>Worker participation is key to successful improvement</li>
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-[#282828] rounded-lg p-5 mb-8">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" /> Learning Outcomes
          </h2>
          <p className="text-gray-300 mb-3">By the end of this section, you will be able to:</p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">1.</span>
              <span>Explain the PDCA cycle and its application to safety management</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">2.</span>
              <span>Distinguish between leading and lagging safety indicators</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">3.</span>
              <span>Describe how to use monitoring data to drive improvement</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">4.</span>
              <span>Understand the importance of regular review and worker participation</span>
            </li>
          </ul>
        </div>

        {/* Section 01: The PDCA Cycle */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">1</span>
            The PDCA Cycle
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              The <strong className="text-white">Plan-Do-Check-Act (PDCA)</strong> cycle, also known as the Deming cycle, is the foundation of continual improvement. It provides a systematic framework for making improvements and ensuring they stick.
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-4 text-center">The PDCA Cycle:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-medium text-blue-400">PLAN</p>
                  <p className="text-sm">Identify what you want to improve. Set objectives. Determine how you will achieve them. Identify resources needed.</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium text-green-400">DO</p>
                  <p className="text-sm">Implement the plan. Put the improvement into practice. Collect data on results. Start small if possible.</p>
                </div>
                <div className="border-l-4 border-elec-yellow pl-4">
                  <p className="font-medium text-elec-yellow">CHECK</p>
                  <p className="text-sm">Review results against objectives. Did the improvement work? What went well? What didn't? Analyse the data.</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-medium text-red-400">ACT</p>
                  <p className="text-sm">If successful, standardise the change. If not, learn and adjust. Start the cycle again for the next improvement.</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-elec-yellow mb-2">Electrical Example</p>
              <p className="text-sm">
                <strong>Plan:</strong> Too many near misses involving isolation - aim to reduce by 50%<br />
                <strong>Do:</strong> Implement new lock-out/tag-out procedure with verification steps<br />
                <strong>Check:</strong> Review near-miss reports after 3 months - down 60%<br />
                <strong>Act:</strong> Make new procedure standard, train all staff, move to next improvement
              </p>
            </div>

            <p>
              <strong className="text-white">Why PDCA works:</strong> It prevents ad-hoc changes that may not be effective. By checking results before standardising, you ensure improvements actually work. The cycle then repeats - improvement never stops.
            </p>
          </div>
        </section>

        {/* InlineCheck 1 */}
        <div className="my-8">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 02: Performance Indicators */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">2</span>
            Performance Indicators
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              To improve safety performance, you need to measure it. Safety indicators are metrics that tell you how well your safety management is working. There are two main types: <strong className="text-white">leading</strong> and <strong className="text-white">lagging</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="bg-green-900/30 border border-green-600/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Leading Indicators (Proactive)</h4>
                <p className="text-sm mb-2">Measure activities that PREVENT incidents:</p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>% of inspections completed on time</li>
                  <li>% of workers trained to standard</li>
                  <li>Number of safety observations made</li>
                  <li>% of risk assessments current</li>
                  <li>Near-miss reporting rates</li>
                  <li>Safety meeting attendance</li>
                  <li>PPE compliance rates</li>
                </ul>
              </div>
              <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-2">Lagging Indicators (Reactive)</h4>
                <p className="text-sm mb-2">Measure OUTCOMES that have occurred:</p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Lost time injury frequency rate (LTIFR)</li>
                  <li>Total recordable incident rate (TRIR)</li>
                  <li>Days lost to injury/illness</li>
                  <li>Number of RIDDOR reports</li>
                  <li>Compensation claims</li>
                  <li>Enforcement notices received</li>
                  <li>Occupational disease cases</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Why Both Types Matter:</h4>
              <p className="text-sm mb-3">Lagging indicators tell you what has happened - they're the outcomes you want to prevent. But by the time you measure them, the harm has occurred.</p>
              <p className="text-sm">Leading indicators are predictive - if you complete training and inspections, maintain equipment, and address hazards promptly, you can expect fewer accidents. They let you intervene BEFORE harm occurs.</p>
              <p className="text-sm mt-3 italic">Think of it like driving: lagging indicators are crash statistics; leading indicators are seatbelt usage, speed compliance, and vehicle maintenance.</p>
            </div>

            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-blue-400 mb-2">Setting SMART Targets</p>
              <p className="text-sm">Safety targets should be SMART: Specific, Measurable, Achievable, Relevant, Time-bound. "Improve safety" is not SMART. "Reduce LTIFR from 5.0 to 3.0 within 12 months through enhanced isolation procedures" is SMART.</p>
            </div>
          </div>
        </section>

        {/* InlineCheck 2 */}
        <div className="my-8">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 03: Review and Learning */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">3</span>
            Review and Learning
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              Collecting data is pointless without review and action. Regular review processes ensure that monitoring leads to actual improvement.
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Levels of Review:</h4>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-elec-yellow">Operational Review (Daily/Weekly)</p>
                  <p className="text-sm">Review of immediate issues - inspection findings, near misses, day-to-day hazards. Quick action on urgent matters. Toolbox talk topics.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Tactical Review (Monthly)</p>
                  <p className="text-sm">Review of performance metrics, trends, action completion rates. Team-level analysis. Identify patterns needing attention.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Management Review (Quarterly/Annually)</p>
                  <p className="text-sm">Strategic review of system effectiveness. Policy review. Resource allocation. Objective setting. Required by ISO 45001.</p>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">What to Review:</h4>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Performance data:</strong> Are targets being met? What are the trends?</li>
              <li><strong>Incident analysis:</strong> What happened? Why? Have corrective actions worked?</li>
              <li><strong>Audit/inspection findings:</strong> Are issues being addressed? Recurring themes?</li>
              <li><strong>Worker feedback:</strong> What concerns are being raised? Suggestions?</li>
              <li><strong>Regulatory changes:</strong> New legislation? Updated guidance?</li>
              <li><strong>Organisational changes:</strong> New processes? Equipment? Personnel?</li>
            </ul>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">HSG65 Managing for Health and Safety</h4>
              <p className="text-sm mb-3">The HSE's guidance document HSG65 describes the 'Plan, Do, Check, Act' approach:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><strong>Plan:</strong> Determine your policy, plan for implementation</li>
                <li><strong>Do:</strong> Profile risks, organise, implement your plan</li>
                <li><strong>Check:</strong> Measure performance (active & reactive monitoring)</li>
                <li><strong>Act:</strong> Review performance, learn lessons, act on them</li>
              </ul>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-elec-yellow mb-2">Learning from Incidents</p>
              <p className="text-sm">Every incident, near miss, and complaint is an opportunity to learn. The key questions are: What failed? Why? What will we do differently? Has the action been effective? Share lessons - if it happened here, it could happen elsewhere.</p>
            </div>
          </div>
        </section>

        {/* InlineCheck 3 */}
        <div className="my-8">
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </div>

        {/* Section 04: Worker Participation */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">4</span>
            Worker Participation in Improvement
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              Continual improvement cannot be imposed from above - it requires active worker participation. Workers have unique insights into how work is actually done and where hazards really exist.
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Why Worker Participation Matters:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>Knowledge:</strong> Workers know where the real hazards are, what controls work, and what doesn't</li>
                <li><strong>Practicality:</strong> Workers can identify when proposed solutions won't work in practice</li>
                <li><strong>Buy-in:</strong> People support what they help create - involvement increases compliance</li>
                <li><strong>Legal:</strong> Consultation with workers is legally required under SRSC Regulations 1977</li>
                <li><strong>Culture:</strong> Participation demonstrates that safety is everyone's responsibility</li>
              </ul>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">How Workers Can Contribute:</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Report hazards, near misses, and concerns promptly</li>
              <li>Suggest improvements based on practical experience</li>
              <li>Participate in risk assessments for their work activities</li>
              <li>Join safety committees or support safety representatives</li>
              <li>Provide feedback on proposed changes before implementation</li>
              <li>Help develop and review procedures</li>
              <li>Participate in incident investigations</li>
            </ul>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Suggestion and Feedback Systems:</h4>
              <p className="text-sm mb-3">Effective improvement systems include mechanisms for workers to contribute ideas:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Safety suggestion schemes (formal or informal)</li>
                <li>Regular team discussions on safety improvements</li>
                <li>Anonymous reporting channels for sensitive issues</li>
                <li>Safety committee representation</li>
                <li>Post-task debriefs identifying what could be better</li>
              </ul>
            </div>

            <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-green-400 mb-2">Closing the Loop</p>
              <p className="text-sm">The most important thing is responding to worker input. When workers raise concerns or suggest improvements, they need to see action - or at least get feedback explaining why action wasn't possible. Nothing kills participation faster than being ignored.</p>
            </div>
          </div>
        </section>

        {/* InlineCheck 4 */}
        <div className="my-8">
          <InlineCheck
            id={quickCheckQuestions[3].id}
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />
        </div>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4">Practical Guidance for Electricians</h2>
          <div className="bg-[#282828] border border-gray-700 rounded-lg p-5">
            <h4 className="font-semibold text-white mb-3">Contributing to Continual Improvement:</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">1.</span>
                <span><strong>Observe:</strong> Notice what works well and what doesn't in your daily work</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">2.</span>
                <span><strong>Report:</strong> All hazards, near misses, and concerns - even if they seem minor</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">3.</span>
                <span><strong>Suggest:</strong> Practical improvements based on your experience</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">4.</span>
                <span><strong>Participate:</strong> Engage in toolbox talks, risk assessments, safety meetings</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">5.</span>
                <span><strong>Feedback:</strong> Tell your supervisor when procedures don't work in practice</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">6.</span>
                <span><strong>Support:</strong> Help implement changes positively, even if initially sceptical</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#282828] border border-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-white mb-2">Q: {faq.question}</h4>
                <p className="text-gray-300 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4">Quick Reference</h2>
          <div className="bg-[#282828] border border-gray-700 rounded-lg p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <p className="font-semibold text-white mb-2">PDCA Cycle:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Plan: Identify improvement</li>
                  <li>Do: Implement change</li>
                  <li>Check: Review results</li>
                  <li>Act: Standardise or adjust</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Key Guidance Documents:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>HSG65: Managing for H&S</li>
                  <li>ISO 45001:2018</li>
                  <li>INDG417: Leading health & safety</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Section 5.5 Knowledge Check"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <Link to="/apprentice-courses/level-3-health-safety/module-1/section-5/5-4">
            <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2 bg-[#333] border-gray-700 hover:bg-gray-700 text-white">
              <ArrowLeft className="h-4 w-4" /> Previous: 5.4 Audits & Inspections
            </Button>
          </Link>
          <Link to="/apprentice-courses/level-3-health-safety/module-1/section-5/5-6">
            <Button className="w-full sm:w-auto flex items-center gap-2 bg-elec-yellow hover:bg-elec-yellow text-black font-semibold">
              Next: 5.6 Emergency Planning <ArrowLeft className="h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default Level3Module1Section5_5;
