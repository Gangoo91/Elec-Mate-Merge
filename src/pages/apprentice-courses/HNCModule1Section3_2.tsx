import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safety Culture and Leadership - HNC Module 1 Section 3.2";
const DESCRIPTION = "Understand behavioural safety, visible leadership, worker engagement, and the indicators of a positive safety culture in building services organisations.";

const quickCheckQuestions = [
  {
    id: "safety-culture-def",
    question: "What best describes safety culture?",
    options: ["Written procedures and policies", "Shared values, beliefs and behaviours regarding safety", "Safety equipment and PPE", "Training certificates held"],
    correctIndex: 1,
    explanation: "Safety culture is the shared values, attitudes, beliefs, and behaviours that characterise how safety is prioritised and managed within an organisation - 'the way we do things around here'."
  },
  {
    id: "visible-leadership",
    question: "Which action best demonstrates visible safety leadership?",
    options: ["Sending safety emails", "Managers regularly walking the site discussing safety", "Displaying safety posters", "Delegating all safety to the safety officer"],
    correctIndex: 1,
    explanation: "Visible leadership means managers actively engaging with workers on safety matters - visiting sites, discussing hazards, listening to concerns, and demonstrating personal commitment to safe practices."
  },
  {
    id: "behavioural-safety",
    question: "What is the primary focus of behavioural safety programmes?",
    options: ["Installing safety equipment", "Observing and modifying at-risk behaviours", "Writing more procedures", "Increasing penalties for unsafe acts"],
    correctIndex: 1,
    explanation: "Behavioural safety focuses on observing work practices, identifying at-risk behaviours, understanding why they occur, and working with employees to develop safer alternatives."
  },
  {
    id: "positive-indicator",
    question: "Which is a positive indicator of good safety culture?",
    options: ["Low accident rate only", "Workers voluntarily reporting near misses", "Managers never visiting site", "Safety discussed only after accidents"],
    correctIndex: 1,
    explanation: "High voluntary near-miss reporting indicates a mature safety culture where workers feel comfortable reporting without fear, and understand the value of learning from near misses."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Who first used the term 'safety culture' in the context of organisational safety?",
    options: [
      "UK Health and Safety Executive",
      "International Nuclear Safety Advisory Group (post-Chernobyl)",
      "Construction Industry Training Board",
      "European Agency for Safety and Health"
    ],
    correctAnswer: 1,
    explanation: "The term 'safety culture' was coined by the International Nuclear Safety Advisory Group (INSAG) in their 1986 report on the Chernobyl disaster, identifying poor safety culture as a root cause."
  },
  {
    id: 2,
    question: "What are the three levels of culture according to Schein's model?",
    options: [
      "Rules, procedures, practices",
      "Artefacts, espoused values, basic assumptions",
      "Policies, behaviours, outcomes",
      "Individual, team, organisation"
    ],
    correctAnswer: 1,
    explanation: "Schein's model identifies three levels: Artefacts (visible elements like PPE), Espoused Values (stated beliefs), and Basic Assumptions (unconscious, taken-for-granted beliefs that truly drive behaviour)."
  },
  {
    id: 3,
    question: "What characterises a 'generative' safety culture according to Westrum's typology?",
    options: [
      "Messengers are shot - safety issues hidden",
      "Safety is primarily the responsibility of safety department",
      "Safety is actively sought out and embedded in everything",
      "Safety information is tolerated but not acted upon"
    ],
    correctAnswer: 2,
    explanation: "A generative culture actively seeks safety information, rewards reporting, shares responsibility, and treats failures as opportunities to improve. Safety is integrated into all activities."
  },
  {
    id: 4,
    question: "Which behaviour is most indicative of effective safety leadership?",
    options: [
      "Focusing solely on production targets",
      "Balancing safety with production and never compromising on safety",
      "Delegating all safety decisions to subordinates",
      "Only discussing safety after incidents occur"
    ],
    correctAnswer: 1,
    explanation: "Effective safety leaders demonstrate that safety is not negotiable, even when facing production pressures. They model safe behaviour, allocate resources, and personally engage with safety."
  },
  {
    id: 5,
    question: "What is 'just culture' in safety management?",
    options: [
      "Punishing all errors equally",
      "Never holding anyone accountable",
      "Distinguishing between honest errors and reckless behaviour",
      "Only investigating serious accidents"
    ],
    correctAnswer: 2,
    explanation: "A just culture creates an atmosphere of trust where honest errors and near misses are reported without fear, while clearly distinguishing acceptable from unacceptable behaviour and holding people accountable for recklessness."
  },
  {
    id: 6,
    question: "How does behavioural safety complement traditional safety management?",
    options: [
      "It replaces all other safety measures",
      "It focuses on human factors alongside engineering controls",
      "It only applies to high-risk industries",
      "It removes the need for risk assessments"
    ],
    correctAnswer: 1,
    explanation: "Behavioural safety complements traditional approaches by addressing the human factors that contribute to incidents. It works alongside engineering controls, procedures, and PPE to create comprehensive protection."
  },
  {
    id: 7,
    question: "What is the purpose of safety observation programmes?",
    options: [
      "To catch workers making mistakes for disciplinary action",
      "To identify at-risk behaviours and reinforce safe practices",
      "To replace safety inspections",
      "To reduce the need for safety training"
    ],
    correctAnswer: 1,
    explanation: "Safety observation programmes aim to identify at-risk behaviours, understand their causes, reinforce safe practices, and engage workers in improving safety - not to catch people out for punishment."
  },
  {
    id: 8,
    question: "Which factor most strongly influences safety culture?",
    options: [
      "Amount spent on safety equipment",
      "Number of safety procedures",
      "Management commitment and leadership behaviour",
      "Frequency of safety training courses"
    ],
    correctAnswer: 2,
    explanation: "Management commitment, demonstrated through visible leadership behaviour, resource allocation, and personal involvement, is the strongest influence on safety culture. Workers follow what leaders do, not just what they say."
  },
  {
    id: 9,
    question: "What is worker engagement in the context of safety culture?",
    options: [
      "Workers attending mandatory training",
      "Workers actively participating in identifying and solving safety issues",
      "Workers wearing required PPE",
      "Workers following written procedures"
    ],
    correctAnswer: 1,
    explanation: "True engagement means workers are actively involved in safety decisions, contribute ideas, report concerns, participate in risk assessments, and feel ownership of safety outcomes."
  },
  {
    id: 10,
    question: "Which metric is a lagging indicator of safety performance?",
    options: [
      "Number of safety observations conducted",
      "Percentage of safety training completed",
      "Lost time injury frequency rate",
      "Number of hazards reported and closed out"
    ],
    correctAnswer: 2,
    explanation: "Lost time injury frequency rate is a lagging indicator - it measures past failures. Leading indicators (observations, training, hazard reporting) predict future performance and allow proactive intervention."
  },
  {
    id: 11,
    question: "How should safety conversations be conducted for maximum effectiveness?",
    options: [
      "In formal meetings only with written records",
      "As informal, two-way discussions focused on understanding",
      "Only when problems are observed",
      "By supervisors issuing instructions to workers"
    ],
    correctAnswer: 1,
    explanation: "Effective safety conversations are informal, two-way discussions that focus on understanding why people work the way they do, exploring barriers to safe work, and collaboratively finding solutions."
  },
  {
    id: 12,
    question: "What characterises a 'blame culture' in safety management?",
    options: [
      "High reporting of near misses",
      "Open discussion of errors and learning",
      "Focus on individual fault rather than system failures",
      "Strong leadership commitment to safety"
    ],
    correctAnswer: 2,
    explanation: "A blame culture focuses on finding and punishing individuals when things go wrong, rather than understanding systemic factors. This discourages reporting and prevents learning from incidents."
  }
];

const faqs = [
  {
    question: "How long does it take to change safety culture?",
    answer: "Culture change typically takes 3-5 years of sustained effort. It requires consistent leadership behaviour, clear communication, systematic changes to processes, and continuous reinforcement. Quick fixes don't work - culture is deeply embedded in 'how we do things here'."
  },
  {
    question: "Can small contractors have a positive safety culture?",
    answer: "Absolutely. Small firms often have advantages: closer relationships, clearer communication, and more direct leadership influence. The key elements - management commitment, worker involvement, learning from incidents - apply regardless of size."
  },
  {
    question: "How do you measure safety culture?",
    answer: "Safety culture can be measured through perception surveys, behavioural observations, analysis of reporting rates (especially near misses), review of safety meeting quality, assessment of management actions, and external audits. Multiple measures give the best picture."
  },
  {
    question: "What's the difference between safety culture and safety climate?",
    answer: "Safety climate is the surface manifestation of culture - what people perceive about safety at a point in time. Safety culture is the deeper, underlying values and assumptions. Climate can change relatively quickly; culture changes slowly and influences climate."
  },
  {
    question: "How do subcontractors fit into safety culture?",
    answer: "Principal contractors should select subcontractors partly based on safety culture alignment, include cultural expectations in contracts, provide thorough inductions that explain expected behaviours, and actively involve subcontractors in safety initiatives and consultation."
  },
  {
    question: "Why do workers sometimes not follow safe procedures they know about?",
    answer: "Common reasons include time pressure, inadequate equipment, procedures that don't match reality, peer pressure, lack of supervision, normalised deviance (everyone does it), and not understanding the risk. Behavioural safety explores these factors rather than assuming workers are careless."
  }
];

const HNCModule1Section3_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section3">
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
            <span>Module 1.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safety Culture and Leadership
          </h1>
          <p className="text-white/80">
            Understanding the human factors that shape safety performance in organisations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Safety culture:</strong> Shared values and beliefs about safety</li>
              <li className="pl-1"><strong>Leadership:</strong> Visible commitment driving cultural change</li>
              <li className="pl-1"><strong>Behavioural safety:</strong> Understanding why people act unsafely</li>
              <li className="pl-1"><strong>Engagement:</strong> Workers actively participating in safety</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Multi-site working:</strong> Maintaining culture across locations</li>
              <li className="pl-1"><strong>Contractor interface:</strong> Aligning different company cultures</li>
              <li className="pl-1"><strong>Production pressure:</strong> Balancing deadlines with safety</li>
              <li className="pl-1"><strong>Competence:</strong> Skilled workforce taking ownership</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define safety culture and explain its importance to safety performance",
              "Describe the characteristics of positive and negative safety cultures",
              "Explain the role of leadership in shaping and maintaining safety culture",
              "Understand behavioural safety principles and observation techniques",
              "Identify methods for engaging workers in safety improvement",
              "Recognise leading and lagging indicators of safety culture"
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

        {/* Section 1: Understanding Safety Culture */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Safety Culture
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safety culture describes the shared attitudes, values, beliefs and behaviours relating to
              health and safety within an organisation. It's often described as "the way we do things
              around here" when no one is watching.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key components of safety culture:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Values:</strong> What the organisation truly prioritises (not just what it says)</li>
                <li className="pl-1"><strong>Beliefs:</strong> Assumptions about risk, control, and responsibility</li>
                <li className="pl-1"><strong>Behaviours:</strong> How people actually act day-to-day</li>
                <li className="pl-1"><strong>Norms:</strong> Unwritten rules about acceptable conduct</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Westrum's Culture Typology</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Culture Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristics</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Response to Safety Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Pathological</td>
                      <td className="border border-white/10 px-3 py-2">Power-oriented, low cooperation</td>
                      <td className="border border-white/10 px-3 py-2">Messengers are "shot"</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-amber-400">Bureaucratic</td>
                      <td className="border border-white/10 px-3 py-2">Rule-oriented, modest cooperation</td>
                      <td className="border border-white/10 px-3 py-2">Messengers are tolerated</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Generative</td>
                      <td className="border border-white/10 px-3 py-2">Performance-oriented, high cooperation</td>
                      <td className="border border-white/10 px-3 py-2">Messengers are trained and rewarded</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>HSE research:</strong> Organisations with positive safety cultures have significantly
              fewer accidents than those with poor cultures, even when using similar equipment and procedures.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Safety Leadership */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Safety Leadership
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Leadership is the single most influential factor in shaping safety culture. What leaders
              pay attention to, measure, and reward signals to everyone what really matters. Actions
              speak louder than policies.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Visible Leadership Behaviours</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Behaviour</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Regular site visits and safety conversations</td>
                      <td className="border border-white/10 px-3 py-2">Demonstrates personal commitment and interest</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Always wearing correct PPE on site</td>
                      <td className="border border-white/10 px-3 py-2">Models expected behaviour - "walk the talk"</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stopping unsafe work immediately</td>
                      <td className="border border-white/10 px-3 py-2">Shows safety is not negotiable for production</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Allocating resources for safety</td>
                      <td className="border border-white/10 px-3 py-2">Proves commitment beyond words</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Recognising and rewarding safe behaviour</td>
                      <td className="border border-white/10 px-3 py-2">Reinforces what is valued</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Acting on safety suggestions and concerns</td>
                      <td className="border border-white/10 px-3 py-2">Builds trust and encourages reporting</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Leadership Don'ts</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Walking past hazards without acting</li>
                  <li className="pl-1">Prioritising production over safety</li>
                  <li className="pl-1">Blaming individuals without system review</li>
                  <li className="pl-1">Ignoring safety suggestions</li>
                  <li className="pl-1">"Do as I say, not as I do" behaviour</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Just Culture Principles</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Honest errors are learning opportunities</li>
                  <li className="pl-1">At-risk behaviour needs coaching</li>
                  <li className="pl-1">Reckless behaviour requires accountability</li>
                  <li className="pl-1">System failures are addressed systemically</li>
                  <li className="pl-1">Trust is built through consistent fairness</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Workers observe what leaders do under pressure. If deadlines
              lead to safety shortcuts, the message is clear regardless of what the policy says.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Behavioural Safety */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Behavioural Safety
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Behavioural safety recognises that human behaviour is the final link in most accident chains.
              By observing work practices, understanding why people act as they do, and positively reinforcing
              safe behaviours, we can reduce at-risk acts.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The ABC Model of Behaviour:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Antecedents:</strong> Factors that trigger behaviour (training, procedures, equipment)</li>
                <li className="pl-1"><strong>Behaviour:</strong> The observable actions of the worker</li>
                <li className="pl-1"><strong>Consequences:</strong> What happens after the behaviour (positive or negative reinforcement)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Observation Process</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Observe</td>
                      <td className="border border-white/10 px-3 py-2">Watch work activity without interrupting</td>
                      <td className="border border-white/10 px-3 py-2">See how work is actually done</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Record</td>
                      <td className="border border-white/10 px-3 py-2">Note safe and at-risk behaviours</td>
                      <td className="border border-white/10 px-3 py-2">Gather data for analysis</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Engage</td>
                      <td className="border border-white/10 px-3 py-2">Have a conversation with the worker</td>
                      <td className="border border-white/10 px-3 py-2">Understand the 'why'</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Reinforce</td>
                      <td className="border border-white/10 px-3 py-2">Recognise safe practices observed</td>
                      <td className="border border-white/10 px-3 py-2">Encourage continuation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Analyse</td>
                      <td className="border border-white/10 px-3 py-2">Review trends and patterns</td>
                      <td className="border border-white/10 px-3 py-2">Identify systemic issues</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6. Act</td>
                      <td className="border border-white/10 px-3 py-2">Address root causes identified</td>
                      <td className="border border-white/10 px-3 py-2">Make lasting improvements</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common At-Risk Behaviours in Building Services</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Not isolating before working on circuits</li>
                  <li className="pl-1">Working from ladders instead of proper platforms</li>
                  <li className="pl-1">PPE not worn or worn incorrectly</li>
                </ul>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Taking shortcuts on permit procedures</li>
                  <li className="pl-1">Poor manual handling techniques</li>
                  <li className="pl-1">Rushing to meet deadlines</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Behavioural safety is not about blame. It's about understanding
              why people take risks (often due to system failures) and making safe behaviour easier.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Worker Engagement and Culture Indicators */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Worker Engagement and Culture Indicators
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A positive safety culture requires genuine worker engagement - not just compliance, but
              active participation in identifying hazards, developing solutions, and taking ownership
              of safety outcomes.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Engagement Methods</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Safety committees with worker representation</li>
                  <li className="pl-1">Involvement in risk assessment development</li>
                  <li className="pl-1">Safety suggestion schemes with feedback</li>
                  <li className="pl-1">Peer-to-peer safety observation</li>
                  <li className="pl-1">Safety improvement teams</li>
                  <li className="pl-1">Regular safety conversations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Barriers to Engagement</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Fear of blame or punishment</li>
                  <li className="pl-1">Suggestions ignored in the past</li>
                  <li className="pl-1">Time pressure and workload</li>
                  <li className="pl-1">Poor relationship with supervisor</li>
                  <li className="pl-1">Language and communication barriers</li>
                  <li className="pl-1">"That's not my job" attitude</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Positive Safety Culture Indicators</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Leading Indicators</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Lagging Indicators</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-green-400">High near-miss reporting rate</td>
                      <td className="border border-white/10 px-3 py-2">Accident frequency rates</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Safety training completion rates</td>
                      <td className="border border-white/10 px-3 py-2">Days lost to injury</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Safety observation frequency</td>
                      <td className="border border-white/10 px-3 py-2">Workers' compensation costs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Hazard reporting and close-out rates</td>
                      <td className="border border-white/10 px-3 py-2">Enforcement notices received</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Safety meeting attendance/quality</td>
                      <td className="border border-white/10 px-3 py-2">Civil claims and costs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Mature culture sign:</strong> Workers stop their own unsafe acts and those of colleagues -
              not because of rules, but because they genuinely care about everyone going home safely.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Application</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Improving Near-Miss Reporting</h3>
              <p className="text-sm text-white mb-2">
                <strong>Problem:</strong> An electrical contractor has very few near-miss reports despite many minor incidents.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p><strong>Analysis:</strong> Workers fear blame; previous reports led to investigations focused on finding fault.</p>
                <p className="mt-2"><strong>Culture Change Actions:</strong></p>
                <p className="ml-4">1. MD commits publicly to learning not blaming</p>
                <p className="ml-4">2. Anonymous reporting option introduced</p>
                <p className="ml-4">3. Weekly recognition of reporters (not named, but thanked)</p>
                <p className="ml-4">4. Visible action taken on reported hazards</p>
                <p className="ml-4">5. Supervisors trained in supportive responses</p>
                <p className="mt-2 text-green-400">Result: Reporting increased 400% within 6 months, enabling proactive hazard control</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Leadership Safety Walks</h3>
              <p className="text-sm text-white mb-2">
                <strong>Objective:</strong> Demonstrate visible leadership commitment across multiple sites.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p><strong>Programme Structure:</strong></p>
                <p className="ml-4">- Directors visit each site quarterly minimum</p>
                <p className="ml-4">- Structured walk covering all work areas</p>
                <p className="ml-4">- Informal conversations with workers at the face</p>
                <p className="ml-4">- PPE worn correctly throughout visit</p>
                <p className="ml-4">- Actions logged and followed up within 7 days</p>
                <p className="mt-2"><strong>Conversation Topics:</strong></p>
                <p className="ml-4">- "What's the biggest safety challenge here?"</p>
                <p className="ml-4">- "What would make your job safer?"</p>
                <p className="ml-4">- "Have you reported any near misses recently?"</p>
                <p className="mt-2 text-elec-yellow/70">Key: Listen more than talk; act on feedback</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Key Points Summary</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Culture Change Essentials</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Culture change starts at the top - leadership must model desired behaviours</li>
                <li className="pl-1">Actions speak louder than words - what you do under pressure matters most</li>
                <li className="pl-1">Build trust through consistent, fair responses to safety issues</li>
                <li className="pl-1">Engage workers as partners, not just rule-followers</li>
                <li className="pl-1">Focus on learning from incidents, not blaming individuals</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Behavioural Safety Principles</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Observe to understand, not to catch people out</li>
                <li className="pl-1">Focus on behaviours that can be observed and changed</li>
                <li className="pl-1">Positive reinforcement is more effective than punishment</li>
                <li className="pl-1">Look for system causes of at-risk behaviour</li>
                <li className="pl-1">Involve workers in developing solutions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Warning Signs of Poor Culture</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Low reporting:</strong> Few near misses or hazards reported</li>
                <li className="pl-1"><strong>Blame focus:</strong> Investigations look for someone at fault</li>
                <li className="pl-1"><strong>Disconnect:</strong> Procedures don't match how work is done</li>
                <li className="pl-1"><strong>Silence:</strong> Workers don't raise safety concerns</li>
                <li className="pl-1"><strong>Normalised risk:</strong> "We've always done it this way"</li>
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
                <p className="font-medium text-white mb-1">Culture Models</p>
                <ul className="space-y-0.5">
                  <li>Westrum: Pathological → Bureaucratic → Generative</li>
                  <li>Schein: Artefacts, Values, Assumptions</li>
                  <li>Just Culture: Error vs Violation vs Recklessness</li>
                  <li>ABC: Antecedent → Behaviour → Consequence</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Leadership Actions</p>
                <ul className="space-y-0.5">
                  <li>Visible site presence and engagement</li>
                  <li>Model correct behaviour always</li>
                  <li>Stop unsafe work without hesitation</li>
                  <li>Act on feedback and suggestions</li>
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
            <Link to="../h-n-c-module1-section3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Safety Policy
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section3-3">
              Next: Permit to Work Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section3_2;
