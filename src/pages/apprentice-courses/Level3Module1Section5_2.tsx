import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "According to Heinrich's Triangle, for every serious injury, approximately how many near misses typically occur?",
    options: [
      "10 near misses",
      "29 near misses",
      "300 near misses",
      "600 near misses"
    ],
    correctIndex: 2,
    explanation: "Heinrich's Triangle suggests a 1:29:300 ratio - for every serious injury, there are approximately 29 minor injuries and 300 near misses/unsafe acts. This demonstrates why reporting near misses is so valuable for prevention."
  },
  {
    id: "check-2",
    question: "What is the most important characteristic of a positive safety culture?",
    options: [
      "Strict disciplinary procedures for safety violations",
      "Comprehensive written policies and procedures",
      "Open communication where workers feel safe reporting concerns",
      "High spending on safety equipment"
    ],
    correctIndex: 2,
    explanation: "A positive safety culture is primarily characterised by open communication where workers feel safe to report concerns, near misses, and mistakes without fear of blame or punishment. This encourages learning and prevention."
  },
  {
    id: "check-3",
    question: "You notice a trailing cable across a walkway that you had to step over. No one tripped. What should you do?",
    options: [
      "Nothing - no one was hurt",
      "Move the cable and forget about it",
      "Move the cable safely AND report it as a near miss",
      "Wait to see if someone trips first"
    ],
    correctIndex: 2,
    explanation: "You should both address the immediate hazard (move the cable safely) AND report it as a near miss. This allows investigation into why the cable was there and implementation of controls to prevent recurrence."
  },
  {
    id: "check-4",
    question: "What is 'just culture' in the context of workplace safety?",
    options: [
      "Everyone is treated equally regardless of position",
      "A balance between accountability and not blaming honest mistakes",
      "Workers decide their own punishments",
      "All safety violations result in disciplinary action"
    ],
    correctIndex: 1,
    explanation: "Just culture distinguishes between honest mistakes (which should be used for learning, not punishment), at-risk behaviour (which requires coaching), and reckless behaviour (which requires sanctions). This encourages reporting while maintaining accountability."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of near-miss reporting?",
    options: [
      "To discipline workers who make mistakes",
      "To create paperwork for compliance",
      "To identify hazards and prevent future accidents",
      "To satisfy insurance requirements"
    ],
    correctAnswer: 2,
    explanation: "Near-miss reporting identifies hazards before they cause injury. Each near miss represents an opportunity to learn and implement controls that could prevent a future accident."
  },
  {
    id: 2,
    question: "Which scenario best describes a 'near miss'?",
    options: [
      "An accident that caused minor injury",
      "An event that could have caused injury but did not",
      "A safety rule that was nearly broken",
      "A hazard that was identified during inspection"
    ],
    correctAnswer: 1,
    explanation: "A near miss is an unplanned event that did not result in injury, illness, or damage but had the potential to do so. It's essentially 'an accident that didn't happen' due to luck or circumstances."
  },
  {
    id: 3,
    question: "Why are near misses often called 'free lessons'?",
    options: [
      "Because they don't cost any money to investigate",
      "Because they reveal hazards without anyone being hurt",
      "Because they don't require formal reporting",
      "Because training on them is provided free"
    ],
    correctAnswer: 1,
    explanation: "Near misses are 'free lessons' because they expose hazards and system failures without the human cost of an actual injury. They provide the same learning opportunity as accidents but without harm."
  },
  {
    id: 4,
    question: "What is a 'blame culture' and why is it harmful to safety?",
    options: [
      "A culture where managers are blamed for all accidents",
      "A culture where workers fear punishment for reporting, so hazards go unreported",
      "A culture where blame is shared equally among all workers",
      "A culture where no one takes responsibility"
    ],
    correctAnswer: 1,
    explanation: "A blame culture creates fear of punishment for reporting mistakes or concerns. Workers hide problems rather than report them, meaning hazards go unaddressed until someone is injured. This is why positive safety culture is essential."
  },
  {
    id: 5,
    question: "An electrician notices that a GS38 approved test lead has damaged insulation. They replace it without telling anyone. What is wrong with this approach?",
    options: [
      "Nothing - they fixed the hazard",
      "They should have continued using the damaged lead",
      "The opportunity to investigate why it was damaged and prevent recurrence was lost",
      "They should have asked permission first"
    ],
    correctAnswer: 2,
    explanation: "While replacing the lead was correct, not reporting it means no investigation into why it was damaged. Was it the wrong lead for the task? Poor storage? Manufacturing defect? Without reporting, the underlying cause remains unaddressed."
  },
  {
    id: 6,
    question: "Which of the following is NOT a characteristic of a positive safety culture?",
    options: [
      "Workers freely report concerns and near misses",
      "Management acts on safety reports promptly",
      "Safety is seen as everyone's responsibility",
      "Safety discussions only happen after accidents"
    ],
    correctAnswer: 3,
    explanation: "In a positive safety culture, safety is discussed proactively, not just reactively after accidents. Regular safety discussions, toolbox talks, and open communication are characteristics of good safety culture."
  },
  {
    id: 7,
    question: "What should a near-miss report typically include?",
    options: [
      "Only the date and a brief description",
      "Date, location, description, potential consequences, and suggested actions",
      "The name of the person responsible",
      "A calculation of potential costs"
    ],
    correctAnswer: 1,
    explanation: "Effective near-miss reports include when and where it happened, what occurred, what could have happened (potential consequences), contributing factors, and suggestions for prevention. This enables proper investigation and action."
  },
  {
    id: 8,
    question: "How does the 'iceberg model' relate to workplace safety?",
    options: [
      "Serious injuries are just the tip - many more near misses occur beneath the surface",
      "Most hazards are hidden underwater",
      "Cold temperatures cause more accidents",
      "Large companies have more accidents than small ones"
    ],
    correctAnswer: 0,
    explanation: "The iceberg model illustrates that visible incidents (serious injuries) are just the tip. Below the surface are many more minor injuries, near misses, and unsafe conditions. Addressing these prevents the 'tip' from occurring."
  },
  {
    id: 9,
    question: "What should management do when they receive a near-miss report?",
    options: [
      "File it for future reference",
      "Investigate, take action, and provide feedback to the reporter",
      "Identify who was at fault",
      "Wait to see if similar events occur"
    ],
    correctAnswer: 1,
    explanation: "Management should investigate promptly, implement corrective actions, and importantly, provide feedback to the person who reported it. Feedback demonstrates that reports are valued and taken seriously, encouraging future reporting."
  },
  {
    id: 10,
    question: "Which behaviour would suggest a company has a NEGATIVE safety culture?",
    options: [
      "Safety is discussed at every site meeting",
      "Workers who report hazards are thanked publicly",
      "Production targets are prioritised over safety procedures",
      "Near-miss reports are investigated within 24 hours"
    ],
    correctAnswer: 2,
    explanation: "Prioritising production over safety is a clear indicator of negative safety culture. It sends the message that safety is secondary and discourages workers from raising concerns that might slow down work."
  },
  {
    id: 11,
    question: "You witness a near miss but the other person says 'don't report it, it'll make us look bad'. What should you do?",
    options: [
      "Respect their wishes and stay quiet",
      "Report it anonymously without telling them",
      "Explain the importance of reporting and submit the report",
      "Only report if asked directly by management"
    ],
    correctAnswer: 2,
    explanation: "You should explain why reporting is important (prevention, not blame) and submit the report. Near-miss reporting protects everyone, including the person who asked you not to report. Anonymous reporting is an option if needed."
  },
  {
    id: 12,
    question: "What is the main difference between proactive and reactive safety management?",
    options: [
      "Proactive costs more money",
      "Proactive identifies hazards before accidents; reactive responds after",
      "Reactive is more effective",
      "There is no real difference"
    ],
    correctAnswer: 1,
    explanation: "Proactive safety management identifies and addresses hazards before accidents occur (e.g., near-miss reporting, inspections, risk assessments). Reactive management only responds after incidents. Near-miss reporting is a key proactive tool."
  }
];

const faqs = [
  {
    question: "Why should I report a near miss if no one was hurt?",
    answer: "Because next time, someone might be hurt. Every near miss is a warning that a hazard exists. Reporting allows investigation and control measures to be implemented. Studies show that the same conditions that cause near misses also cause accidents - it's often just luck that determines the outcome."
  },
  {
    question: "Will I get in trouble for reporting a near miss I was involved in?",
    answer: "In a good safety culture, no. The purpose of near-miss reporting is prevention, not punishment. Companies want you to report so they can fix problems. If your company has a blame culture, this is a safety management problem that needs addressing. Many companies offer anonymous reporting options."
  },
  {
    question: "How detailed should a near-miss report be?",
    answer: "Detailed enough that someone who wasn't there can understand what happened and investigate properly. Include: what happened, when, where, who was involved or nearby, what could have happened, and any ideas for prevention. Too brief and investigation is difficult; too lengthy and key points get lost."
  },
  {
    question: "What's the difference between a near miss and an unsafe condition?",
    answer: "An unsafe condition is a hazard that exists (e.g., a missing guard, damaged cable). A near miss is an event where that hazard nearly caused harm (e.g., someone nearly touched the unguarded live part). Both should be reported, but near misses indicate the hazard has already come close to causing injury."
  },
  {
    question: "How can I encourage my colleagues to report near misses?",
    answer: "Lead by example - report near misses yourself and talk openly about them. Share positive outcomes where reporting led to improvements. Reassure colleagues about non-blame culture. If someone mentions a near miss, encourage them to report it formally. Recognise and thank people who report."
  },
  {
    question: "What if my company doesn't have a near-miss reporting system?",
    answer: "Suggest implementing one - it's a sign of good safety practice. In the meantime, report near misses through whatever system exists (verbal to supervisor, safety committee, suggestion box). Even informal reporting is better than none. If serious hazards are being ignored, you can contact the HSE."
  }
];

const Level3Module1Section5_2 = () => {
  useSEO(
    "5.2 Near-miss Reporting and Safety Culture - Level 3 Health & Safety",
    "Understanding near-miss reporting importance and building positive safety culture in the UK electrical industry"
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
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
          <span className="font-bold text-black text-lg">5.2 Near-Miss Reporting & Safety Culture</span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-gray-200">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Near-Miss Reporting and Safety Culture
          </h1>
          <p className="text-lg text-gray-300">
            Understanding why reporting near misses is essential for preventing accidents and how safety culture determines organisational safety performance.
          </p>
        </header>

        {/* Quick Summary Box */}
        <div className="bg-[#222] border-l-4 border-elec-yellow rounded p-5 mb-8">
          <h2 className="text-lg font-bold flex items-center gap-2 text-elec-yellow mb-2">
            <Zap className="h-5 w-5" /> Quick Summary
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>Near misses are 'free lessons' - they reveal hazards without injury</li>
            <li>Heinrich's Triangle: 300 near misses for every serious injury</li>
            <li>Safety culture determines whether workers feel safe to report</li>
            <li>Blame culture suppresses reporting and allows hazards to persist</li>
            <li>Just culture balances learning from mistakes with accountability</li>
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
              <span>Explain why near-miss reporting is essential for accident prevention</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">2.</span>
              <span>Describe the characteristics of positive and negative safety cultures</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">3.</span>
              <span>Identify barriers to reporting and how to overcome them</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">4.</span>
              <span>Contribute to building a positive safety culture in the workplace</span>
            </li>
          </ul>
        </div>

        {/* Section 01: Understanding Near Misses */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">1</span>
            Understanding Near Misses
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              A <strong className="text-white">near miss</strong> (also called a 'close call' or 'near hit') is an unplanned event that did not result in injury, illness, or damage but had the potential to do so. It's essentially an accident where, by chance, no one was hurt.
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Examples of Near Misses in Electrical Work:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>A live cable was cut but the circuit breaker tripped before shock could occur</li>
                <li>A ladder slipped but the electrician managed to grab a support and avoid falling</li>
                <li>A tool fell from height but missed workers below</li>
                <li>A worker tested a circuit that was supposed to be isolated - it was still live but they weren't touching it</li>
                <li>A distribution board cover was left off and someone nearly touched the busbars</li>
                <li>A trailing lead was in a walkway and someone tripped but didn't fall</li>
              </ul>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Heinrich's Triangle (Safety Pyramid)</h4>
            <p>
              Research by H.W. Heinrich in the 1930s (and confirmed by later studies) established that workplace incidents follow a predictable pattern:
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <div className="text-center space-y-2">
                <div className="bg-red-600/30 border border-red-500 rounded py-2 px-4 mx-auto max-w-xs">
                  <p className="font-bold text-white">1 Serious Injury</p>
                </div>
                <div className="bg-orange-600/30 border border-orange-500 rounded py-2 px-4 mx-auto max-w-sm">
                  <p className="font-bold text-white">29 Minor Injuries</p>
                </div>
                <div className="bg-yellow-600/30 border border-elec-yellow rounded py-2 px-4 mx-auto max-w-md">
                  <p className="font-bold text-white">300 Near Misses / Unsafe Acts</p>
                </div>
              </div>
              <p className="text-sm text-center mt-4">The 1:29:300 ratio shows that near misses outnumber serious injuries 300:1</p>
            </div>

            <p>
              <strong className="text-white">Why this matters:</strong> The conditions that cause near misses are the same conditions that cause accidents. Whether someone is hurt is often down to luck - timing, position, reaction speed. By addressing near misses, we remove hazards before luck runs out.
            </p>

            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-elec-yellow mb-2">Free Lessons</p>
              <p className="text-sm">Near misses are called 'free lessons' because they provide all the information needed to prevent an accident without the human cost of an actual injury. Each near miss is an opportunity to learn and improve - but only if it's reported.</p>
            </div>
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

        {/* Section 02: Safety Culture */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">2</span>
            Understanding Safety Culture
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              <strong className="text-white">Safety culture</strong> is the collection of values, attitudes, perceptions, and behaviours that determine how safety is managed in an organisation. It's often described as "the way we do things around here" regarding safety.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="bg-green-900/30 border border-green-600/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Positive Safety Culture</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Safety is a core value, not just a priority</li>
                  <li>Open communication - concerns raised freely</li>
                  <li>Management leads by example</li>
                  <li>Near misses are reported and investigated</li>
                  <li>Workers feel empowered to stop unsafe work</li>
                  <li>Learning from mistakes, not blaming</li>
                  <li>Safety integrated into all decisions</li>
                </ul>
              </div>
              <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-2">Negative Safety Culture</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Safety seen as obstacle to productivity</li>
                  <li>Fear of blame prevents reporting</li>
                  <li>'Do as I say, not as I do' management</li>
                  <li>Near misses hidden or ignored</li>
                  <li>Pressure to 'get on with it' unsafely</li>
                  <li>Blame individuals, not fix systems</li>
                  <li>Safety only discussed after accidents</li>
                </ul>
              </div>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Signs of Safety Culture</h4>
            <p>You can assess an organisation's safety culture by observing:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong>How management responds to safety concerns</strong> - Prompt action or dismissal?</li>
              <li><strong>What happens when near misses are reported</strong> - Thanks or criticism?</li>
              <li><strong>Whether safety is discussed in meetings</strong> - Regular item or afterthought?</li>
              <li><strong>How workers talk about safety</strong> - Seriously or sarcastically?</li>
              <li><strong>Whether procedures are followed</strong> - Always, or only when watched?</li>
            </ul>

            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-blue-400 mb-2">The Importance of Leadership</p>
              <p className="text-sm">Safety culture starts at the top. When management visibly prioritises safety, provides resources, responds to concerns, and follows procedures themselves, workers are more likely to do the same. Conversely, if management cuts corners, workers will too.</p>
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

        {/* Section 03: Barriers to Reporting */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">3</span>
            Barriers to Near-Miss Reporting
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              Despite the value of near-miss reporting, many incidents go unreported. Understanding why helps us overcome these barriers.
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Common Barriers:</h4>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-elec-yellow">Fear of Blame</p>
                  <p className="text-sm">Workers fear punishment, embarrassment, or being seen as incompetent. In blame cultures, this is the biggest barrier.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">"No One Was Hurt"</p>
                  <p className="text-sm">Failure to recognise the value of near-miss data. People think if no harm occurred, there's nothing to report.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Time and Effort</p>
                  <p className="text-sm">Complex reporting systems or belief that paperwork is pointless discourages reporting.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Previous Bad Experience</p>
                  <p className="text-sm">If reports were ignored, criticised, or used against the reporter before, people stop reporting.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Normalisation</p>
                  <p className="text-sm">"It always happens" - hazards become accepted as normal when they shouldn't be.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Peer Pressure</p>
                  <p className="text-sm">Colleagues may discourage reporting, viewing it as causing trouble or slowing work.</p>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Overcoming Barriers:</h4>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Implement non-punitive reporting:</strong> Make clear that honest reports won't result in discipline</li>
              <li><strong>Provide feedback:</strong> Show reporters what action was taken - this validates their effort</li>
              <li><strong>Simplify reporting:</strong> Quick, easy systems encourage participation</li>
              <li><strong>Offer anonymity:</strong> Anonymous options help those fearful of identification</li>
              <li><strong>Recognise reporters:</strong> Thank people who report, publicly if appropriate</li>
              <li><strong>Lead by example:</strong> Managers should report their own near misses</li>
              <li><strong>Educate on value:</strong> Help workers understand why near misses matter</li>
            </ul>

            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-red-400 mb-2">The Cost of Not Reporting</p>
              <p className="text-sm">When near misses go unreported, hazards remain unaddressed. The same conditions that caused the near miss will eventually cause an accident. The question isn't IF but WHEN. Every unreported near miss is a missed opportunity to prevent injury.</p>
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

        {/* Section 04: Just Culture */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">4</span>
            Just Culture and Accountability
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              <strong className="text-white">Just culture</strong> is an approach that balances accountability with creating an environment where people feel safe to report. It recognises that not all errors are equal.
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">The Just Culture Model:</h4>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium text-green-400">Human Error (Honest Mistakes)</p>
                  <p className="text-sm">Unintentional slips, lapses, or mistakes despite best intentions. Example: Forgetting a step in a familiar procedure.</p>
                  <p className="text-sm mt-1"><strong>Response:</strong> Console, learn, fix the system that allowed the error</p>
                </div>
                <div className="border-l-4 border-elec-yellow pl-4">
                  <p className="font-medium text-elec-yellow">At-Risk Behaviour</p>
                  <p className="text-sm">Taking shortcuts that seem reasonable, often due to workload or normalised deviation. Example: Not wearing safety glasses "just for a quick job."</p>
                  <p className="text-sm mt-1"><strong>Response:</strong> Coach, address why the shortcut seemed acceptable</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-medium text-red-400">Reckless Behaviour</p>
                  <p className="text-sm">Conscious disregard of substantial and unjustifiable risk. Example: Deliberately working on live equipment without isolation.</p>
                  <p className="text-sm mt-1"><strong>Response:</strong> Sanction - disciplinary action is appropriate</p>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Why Just Culture Works:</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Encourages reporting by protecting those who make honest mistakes</li>
              <li>Maintains accountability for genuinely reckless behaviour</li>
              <li>Focuses on system improvements rather than individual blame</li>
              <li>Recognises that most accidents involve system failures, not just individual errors</li>
              <li>Creates trust between workers and management</li>
            </ul>

            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-elec-yellow mb-2">Applying Just Culture</p>
              <p className="text-sm">When investigating an incident, ask: "Would another reasonable, competent person in the same situation make the same mistake?" If yes, the problem is the system, not the individual. If no, consider whether the behaviour was at-risk (requiring coaching) or reckless (requiring sanction).</p>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Your Role in Safety Culture:</h4>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Report:</strong> Near misses, hazards, and concerns - every time</li>
              <li><strong>Support:</strong> Colleagues who report, never criticise them</li>
              <li><strong>Follow:</strong> Procedures and safe systems of work</li>
              <li><strong>Speak up:</strong> If you see unsafe behaviour or conditions</li>
              <li><strong>Learn:</strong> From incidents and share lessons with colleagues</li>
              <li><strong>Lead:</strong> Demonstrate good safety behaviour to others</li>
            </ul>
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
            <h4 className="font-semibold text-white mb-3">Writing an Effective Near-Miss Report:</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">1.</span>
                <span><strong>What happened:</strong> Clear description of the event</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">2.</span>
                <span><strong>When and where:</strong> Date, time, specific location</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">3.</span>
                <span><strong>Who was involved:</strong> Not for blame, but for witness/follow-up</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">4.</span>
                <span><strong>What could have happened:</strong> Potential consequences</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">5.</span>
                <span><strong>Contributing factors:</strong> What conditions allowed this to happen</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">6.</span>
                <span><strong>Suggestions:</strong> Ideas for preventing recurrence</span>
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
                <p className="font-semibold text-white mb-2">Heinrich's Triangle:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>1 serious injury</li>
                  <li>29 minor injuries</li>
                  <li>300 near misses</li>
                  <li>Addressing near misses prevents injuries</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Just Culture Responses:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Human error: Console, learn, fix system</li>
                  <li>At-risk behaviour: Coach</li>
                  <li>Reckless behaviour: Sanction</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Section 5.2 Knowledge Check"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <Link to="/apprentice-courses/level-3-health-safety/module-1/section-5/5-1">
            <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2 bg-[#333] border-gray-700 hover:bg-gray-700 text-white">
              <ArrowLeft className="h-4 w-4" /> Previous: 5.1 Accident Reporting
            </Button>
          </Link>
          <Link to="/apprentice-courses/level-3-health-safety/module-1/section-5/5-3">
            <Button className="w-full sm:w-auto flex items-center gap-2 bg-elec-yellow hover:bg-elec-yellow text-black font-semibold">
              Next: 5.3 Toolbox Talks <ArrowLeft className="h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default Level3Module1Section5_2;
