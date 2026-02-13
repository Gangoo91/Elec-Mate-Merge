import { ArrowLeft, CheckCircle, AlertTriangle, Wrench, Search, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "ld-5whys",
    question: "The 5 Whys technique is used primarily to:",
    options: [
      "Identify five possible solutions to a problem",
      "Get to the root cause of a problem by asking 'why' repeatedly",
      "Prioritise the five most important tasks each day",
      "Evaluate five different team members' performance"
    ],
    correctIndex: 1,
    explanation: "The 5 Whys technique, developed by Sakichi Toyoda for the Toyota Production System, is a root cause analysis method. By asking 'why' five times (or as many times as needed), you move beyond the obvious symptoms to uncover the underlying root cause. The goal is to find the systemic or process issue that, if fixed, will prevent the problem recurring."
  },
  {
    id: "ld-decide-model",
    question: "In the DECIDE model, the 'E' in the first position stands for:",
    options: [
      "Evaluate the results",
      "Execute the plan immediately",
      "Establish criteria for a good solution",
      "Examine the team's capacity"
    ],
    correctIndex: 2,
    explanation: "The DECIDE model is: D = Define the problem clearly, E = Establish criteria for a good solution, C = Consider all alternatives, I = Identify the best alternative, D = Develop and implement a plan, E = Evaluate and monitor. Establishing criteria early ensures you know what 'good' looks like before you start generating solutions."
  },
  {
    id: "ld-root-cause",
    question: "If cables keep failing megger tests and you replace the cables each time, you are:",
    options: [
      "Treating the root cause effectively",
      "Using the 5 Whys technique correctly",
      "Treating the symptom, not the root cause",
      "Applying the DECIDE model"
    ],
    correctIndex: 2,
    explanation: "Replacing cables that fail insulation resistance tests treats the symptom (failed test) rather than the root cause (which might be damp storage conditions, damage during installation, or incorrect cable specification). The 5 Whys or fishbone analysis would help identify why the cables keep failing, allowing you to fix the actual cause and prevent recurrence."
  }
];

const faqs = [
  {
    question: "How do I know when I have found the real root cause using the 5 Whys?",
    answer: "You have found the root cause when the final 'why' leads you to a process, system, or management failure rather than a person or a symptom. If you can say 'if we fix this one thing, the problem should not recur,' you are likely at the root cause. The root cause is typically something you can change — a missing process, inadequate training, wrong specification, unclear communication. If your final answer is 'because Dave made a mistake,' keep asking why — what allowed the mistake to happen? Was there no checking process? Was the instruction unclear? Was the training inadequate?"
  },
  {
    question: "When should I use the DECIDE model instead of the 5 Whys?",
    answer: "The 5 Whys is a diagnostic tool — it helps you understand what caused a problem. The DECIDE model is a solution tool — it helps you choose the best course of action. Use the 5 Whys first to identify the root cause, then use DECIDE to work through the options for fixing it. For simple, single-cause problems, the 5 Whys alone may be sufficient. For complex problems with multiple possible solutions, trade-offs, and constraints (budget, programme, safety), the DECIDE model provides the structured approach you need to choose the best option."
  },
  {
    question: "What is a fishbone diagram and when should I use one?",
    answer: "A fishbone diagram (also called an Ishikawa diagram, after its creator Kaoru Ishikawa) is a visual tool for brainstorming the possible causes of a problem. The problem is the 'head' of the fish, and the 'bones' represent categories of potential causes — typically People, Process, Equipment, Materials, Environment, and Management. Under each category, you list specific potential causes. It is particularly useful for complex problems where the cause is not obvious and there may be multiple contributing factors. For example, if you have recurring quality issues with terminations, the fishbone might reveal causes across training (People), inspection frequency (Process), tool condition (Equipment), cable type (Materials), lighting (Environment), and supervision level (Management)."
  },
  {
    question: "How do I handle problems that are caused by people rather than technical issues?",
    answer: "People problems require different tools from technical problems. Do not try to use the 5 Whys or fishbone analysis to diagnose a personality clash or a motivation issue. For skill gaps, use coaching (the GROW model: Goal, Reality, Options, Will). For giving feedback on specific behaviours, use the SBI model (Situation, Behaviour, Impact). For difficult conversations, use the DESC framework (Describe, Express, Specify, Consequence). The key principle is that people problems need empathy, listening, and structured conversation — not engineering analysis. Section 3 of this module covers managing conflict in detail."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The 5 Whys technique was developed by Sakichi Toyoda as part of the:",
    options: [
      "British Standards Institution",
      "Toyota Production System",
      "ISO 9001 quality framework",
      "Six Sigma methodology"
    ],
    correctAnswer: 1,
    explanation: "The 5 Whys technique was developed by Sakichi Toyoda and became a core tool within the Toyota Production System. It is a simple but powerful root cause analysis method that involves asking 'why' repeatedly until the underlying cause is identified."
  },
  {
    id: 2,
    question: "In root cause analysis, the most common problem-solving mistake is:",
    options: [
      "Asking too many questions before acting",
      "Involving too many people in the analysis",
      "Treating the symptom instead of the root cause",
      "Using too many frameworks simultaneously"
    ],
    correctAnswer: 2,
    explanation: "The most common mistake in problem-solving is treating the symptom rather than the root cause. This provides a temporary fix but the problem keeps recurring. For example, replacing cables that fail tests treats the symptom, while fixing the damp storage that caused the failures treats the root cause."
  },
  {
    id: 3,
    question: "The six steps of the DECIDE model in order are:",
    options: [
      "Define, Evaluate, Consider, Implement, Develop, Execute",
      "Define, Establish criteria, Consider alternatives, Identify best, Develop plan, Evaluate",
      "Discuss, Establish, Consult, Investigate, Decide, Evaluate",
      "Define, Examine, Choose, Implement, Document, Evaluate"
    ],
    correctAnswer: 1,
    explanation: "The DECIDE model follows six steps: Define the problem clearly, Establish criteria for a good solution, Consider all alternatives, Identify the best alternative, Develop and implement a plan, and Evaluate and monitor the results."
  },
  {
    id: 4,
    question: "A fishbone (Ishikawa) diagram categorises potential causes into which typical groups?",
    options: [
      "Safety, Quality, Cost, Programme, Environment, Welfare",
      "Who, What, When, Where, Why, How",
      "People, Process, Equipment, Materials, Environment, Management",
      "Design, Build, Test, Commission, Handover, Maintenance"
    ],
    correctAnswer: 2,
    explanation: "A fishbone diagram typically categorises potential causes into six groups: People, Process, Equipment, Materials, Environment, and Management. These categories provide a structured framework for brainstorming all possible contributing factors to a problem."
  },
  {
    id: 5,
    question: "When a problem on site is caused by a personality clash between team members, the most appropriate approach is:",
    options: [
      "Apply the 5 Whys technique to find the root cause",
      "Use a fishbone diagram to categorise the contributing factors",
      "Use coaching (GROW), feedback (SBI), or conversation (DESC) models",
      "Apply the DECIDE model to choose the best technical solution"
    ],
    correctAnswer: 2,
    explanation: "People problems require people tools — not technical analysis tools. The GROW model (Goal, Reality, Options, Will) works for coaching, the SBI model (Situation, Behaviour, Impact) works for giving feedback, and the DESC framework (Describe, Express, Specify, Consequence) works for difficult conversations. These require empathy and listening, not engineering analysis."
  },
  {
    id: 6,
    question: "In the DECIDE model, why is 'Establish criteria' the second step?",
    options: [
      "Because criteria help you define the problem more clearly",
      "Because knowing what 'good' looks like helps you evaluate alternatives objectively",
      "Because the team needs to agree on criteria before the leader can decide",
      "Because criteria must be documented for contractual purposes"
    ],
    correctAnswer: 1,
    explanation: "Establishing criteria early ensures you know what a good solution looks like before you start generating and evaluating options. Without clear criteria (for example: no safety compromise, budget increase under 5%, achievable this week), you have no objective basis for comparing alternatives and risk choosing based on gut feeling alone."
  },
  {
    id: 7,
    question: "Using the 5 Whys, if your final answer is 'because the electrician made a mistake,' you should:",
    options: [
      "Discipline the electrician and move on",
      "Accept this as the root cause and implement training",
      "Keep asking why — what allowed the mistake to happen?",
      "Start again with a fishbone diagram instead"
    ],
    correctAnswer: 2,
    explanation: "If your final 'why' points to a person making a mistake, you have not reached the root cause. Keep asking: Why did they make the mistake? Was the instruction unclear? Was there no checking process? Was the training inadequate? The root cause should be a systemic or process issue that you can fix to prevent the mistake recurring, not an individual failing."
  },
  {
    id: 8,
    question: "A systematic approach to problem-solving is better than gut instinct because:",
    options: [
      "It completely eliminates the possibility of making mistakes",
      "It produces more consistent, better results across different types of problems",
      "It always takes less time than intuitive decision-making",
      "It removes the need for experience and professional judgement"
    ],
    correctAnswer: 1,
    explanation: "Systematic methods produce more consistent, better results because they ensure you consider all factors, identify root causes rather than symptoms, evaluate alternatives objectively, and learn from outcomes. Gut instinct still has a role — especially for experienced supervisors — but relying on it alone leads to inconsistent results and repeated mistakes."
  }
];

export default function LeadershipModule4Section2() {
  useSEO({
    title: "Problem-Solving on Site | Leadership Module 4.2",
    description: "The 5 Whys, DECIDE model, root cause analysis, fishbone diagrams, and handling people problems for site supervisors.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-4-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Wrench className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Problem-Solving on Site
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Systematic methods for diagnosing root causes, choosing the best solution, and knowing when the problem is people rather than process
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Diagnosis:</strong> The 5 Whys &mdash; ask why five times to find root cause</li>
              <li><strong>Solution:</strong> The DECIDE model &mdash; six steps to the best option</li>
              <li><strong>Visual tool:</strong> Fishbone diagrams for complex, multi-cause problems</li>
              <li><strong>Key rule:</strong> Treat the cause, not the symptom</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">For Site Leaders</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Reality:</strong> Problems are constant &mdash; late deliveries, clashes, defects</li>
              <li><strong>Difference:</strong> Systematic beats gut instinct for consistency</li>
              <li><strong>People problems:</strong> Need different tools &mdash; GROW, SBI, DESC</li>
              <li><strong>Prevention:</strong> Fix the process, not just the immediate issue</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Apply the 5 Whys technique to identify root causes of site problems",
              "Use the DECIDE model to structure decision-making for complex problems",
              "Distinguish between symptoms and root causes in practical scenarios",
              "Construct a fishbone diagram to analyse multi-factor problems",
              "Recognise when a problem is about people and select the appropriate tool",
              "Explain why systematic problem-solving produces better results than intuition alone"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Systematic Problem-Solving Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Why Systematic Problem-Solving Matters
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                On a construction site, problems are constant &mdash; late deliveries, design clashes,
                defects, weather delays, personnel issues, material shortages, programme conflicts.
                The difference between a good supervisor and a struggling one is often not their
                technical knowledge but their <strong>approach to problem-solving</strong>.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Problem with Gut Instinct Alone</p>
                <p className="text-sm text-white/80">
                  Experienced supervisors develop strong intuition, and this has value. But gut instinct
                  alone is not enough &mdash; it produces inconsistent results, is prone to bias, and
                  often leads to treating symptoms rather than causes. Systematic methods produce
                  <strong className="text-white"> better, more consistent results</strong> because they
                  force you to gather evidence, consider alternatives, and test your assumptions.
                </p>
              </div>

              <p>
                The frameworks in this section are not academic exercises &mdash; they are practical
                tools used daily by effective site leaders across the construction industry. They work
                because they impose structure on what would otherwise be reactive, ad hoc
                decision-making. When you face a problem, these frameworks give you a reliable
                process to follow, even when you are tired, stressed, or under pressure.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Reactive Trap</p>
                </div>
                <p className="text-sm text-white/80">
                  Without systematic methods, supervisors tend to fall into a <strong className="text-white">
                  reactive pattern</strong>: problem appears, immediate fix applied, move on, same
                  problem appears again next week. This firefighting approach feels productive because
                  you are always busy solving problems &mdash; but you are solving the same problems
                  repeatedly. Systematic methods break this cycle by addressing the underlying causes
                  rather than the surface symptoms.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Site Problems That Need Systematic Solving</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Programme Problems</p>
                    <p>Tasks running behind, clashes with other trades, resources in the wrong place, unrealistic deadlines, weather delays cascading through the programme.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Quality Problems</p>
                    <p>Recurring defects, failed tests, snagging issues, workmanship complaints, specification misunderstandings, material substitution problems.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Supply Problems</p>
                    <p>Late deliveries, wrong materials, damaged goods, long lead times, supplier failures, specification changes after ordering.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">People Problems</p>
                    <p>Skill gaps, motivation issues, personality clashes, absence, poor communication, disputes between team members or trades.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The 5 Whys Technique */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The 5 Whys Technique
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Developed by <strong>Sakichi Toyoda</strong> for the Toyota Production System, the 5
                Whys is one of the simplest and most effective root cause analysis tools available.
                The principle is straightforward: ask &ldquo;why&rdquo; five times (or as many times
                as needed) to move from the obvious symptom to the underlying root cause.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">5 Whys &mdash; Electrical Example</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white"><strong>Problem:</strong> The RCD tripped during testing</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white"><strong>Why 1:</strong> Because there is a fault on the circuit</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white"><strong>Why 2:</strong> Because there is water ingress in the junction box</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white"><strong>Why 3:</strong> Because the IP rating is wrong for the environment</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white"><strong>Why 4:</strong> Because nobody checked the specification before ordering</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-rose-500/30">
                    <p className="text-white"><strong>Why 5:</strong> Because there is no sign-off process for material orders</p>
                    <p className="text-rose-400 text-xs mt-1 font-medium">ROOT CAUSE = Process gap, not the immediate symptom</p>
                  </div>
                </div>
              </div>

              <p>
                Notice how the root cause is a <strong>process gap</strong> (no sign-off for material
                orders), not the immediate symptom (RCD tripping). Fixing the junction box treats the
                symptom for that one circuit. Implementing a material order sign-off process prevents
                the same type of error across every future job. This is the power of root cause
                analysis &mdash; it leads to systemic improvements, not one-off fixes.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Second Example &mdash; Programme Delay</p>
                <div className="space-y-2 text-sm">
                  <div className="bg-white/5 rounded-lg p-2">
                    <p className="text-white"><strong>Problem:</strong> Second-fix electrical is consistently running behind programme</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <p className="text-white"><strong>Why 1:</strong> Because the electricians cannot start on time each morning</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <p className="text-white"><strong>Why 2:</strong> Because they are waiting for access to the rooms</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <p className="text-white"><strong>Why 3:</strong> Because the decorators are still finishing in those rooms</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <p className="text-white"><strong>Why 4:</strong> Because the decorators are working to a different sequence than the electrical programme</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 border border-rose-500/30">
                    <p className="text-white"><strong>Why 5:</strong> Because the trades are not coordinating their sequences at the weekly meeting</p>
                    <p className="text-rose-400 text-xs mt-1 font-medium">ROOT CAUSE = Coordination failure, not a lazy team</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Tips for Effective 5 Whys Analysis</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Write it down</strong> &mdash; document each question and answer to maintain clarity and prevent circular reasoning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Five is a guide, not a rule</strong> &mdash; you may reach the root cause in three whys or need seven depending on the complexity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Avoid blame</strong> &mdash; if your final answer is a person, keep asking why the system allowed the error to occur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Involve the right people</strong> &mdash; those closest to the problem have the best information about what actually happened</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Look for process, not people</strong> &mdash; the root cause should be something you can change in the system to prevent recurrence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Test your conclusion</strong> &mdash; ask &ldquo;if we fix this, will the problem stop recurring?&rdquo; If the answer is no, dig deeper</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The DECIDE Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The DECIDE Model
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The DECIDE model provides a structured, six-step approach to choosing the best
                solution when you face a complex problem with multiple options. It ensures you
                define the problem clearly, establish what &ldquo;good&rdquo; looks like, consider
                all alternatives, and monitor the results.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">The Six Steps of DECIDE</p>
                <div className="space-y-2 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-lg font-bold text-rose-400 mb-1">D &mdash; Define the Problem</p>
                    <p className="text-white/80">Be specific. &ldquo;We are behind programme&rdquo; is too vague. &ldquo;Second-fix in Zone B is two days behind because the plastering overran&rdquo; is actionable.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-lg font-bold text-rose-400 mb-1">E &mdash; Establish Criteria</p>
                    <p className="text-white/80">What does a good solution look like? Example: no safety compromise, budget increase under 5%, achievable this week, acceptable to the client.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-lg font-bold text-rose-400 mb-1">C &mdash; Consider Alternatives</p>
                    <p className="text-white/80">Generate all viable options. Overtime? Extra labour? Resequence other tasks? Negotiate a programme extension? Do not evaluate yet &mdash; just list them.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-lg font-bold text-rose-400 mb-1">I &mdash; Identify the Best</p>
                    <p className="text-white/80">Evaluate each alternative against your criteria. Which option best satisfies the constraints you established in step two?</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-lg font-bold text-rose-400 mb-1">D &mdash; Develop and Implement</p>
                    <p className="text-white/80">Create a clear plan with specific actions, responsibilities, and timescales. Communicate it to everyone affected and execute.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-lg font-bold text-rose-400 mb-1">E &mdash; Evaluate and Monitor</p>
                    <p className="text-white/80">Is it working? Check at defined intervals. If results are not as expected, cycle back through the model with updated information.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">DECIDE in Practice &mdash; Programme Recovery</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Define:</strong> Second-fix electrical in Zone B is two days behind; handover is next Friday</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Establish:</strong> No safety shortcuts, budget overspend under &pound;2,000, must meet Friday handover</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Consider:</strong> (1) Overtime Saturday and Sunday, (2) Bring in two extra electricians, (3) Resequence to do Zone C first and negotiate Zone B extension, (4) Partial handover</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Identify:</strong> Option 2 &mdash; extra labour at &pound;1,600 meets all criteria; overtime risks fatigue and errors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Develop:</strong> Two electricians from agency, starting Wednesday, supervised by senior on site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Evaluate:</strong> Check progress Thursday lunchtime; if not on track, activate overtime backup plan</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Root Cause vs Symptom */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Root Cause vs Symptom
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The most common problem-solving mistake on construction sites is <strong>treating the
                symptom instead of the cause</strong>. Symptoms are what you see on the surface &mdash;
                the immediate problem. Root causes are the underlying reasons why the problem occurred.
                Fix the symptom and it comes back. Fix the root cause and it does not.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Symptom vs Root Cause &mdash; Examples</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-red-400 text-xs font-semibold mb-1">Symptom Treatment</p>
                    <p className="text-white/80 text-xs">Cables keep failing megger tests &rarr; replace the cables each time. The problem keeps recurring because the root cause (damp storage) is never addressed.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-green-400 text-xs font-semibold mb-1">Root Cause Treatment</p>
                    <p className="text-white/80 text-xs">Cables keep failing megger tests &rarr; investigate storage conditions &rarr; find damp in the compound &rarr; fix the storage &rarr; problem stops recurring.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-red-400 text-xs font-semibold mb-1">Symptom Treatment</p>
                    <p className="text-white/80 text-xs">Apprentice keeps making termination errors &rarr; redo the terminations each time. The problem recurs because the root cause (inadequate supervision) persists.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-green-400 text-xs font-semibold mb-1">Root Cause Treatment</p>
                    <p className="text-white/80 text-xs">Apprentice keeps making errors &rarr; investigate supervision arrangements &rarr; pair with experienced electrician for coaching &rarr; quality improves permanently.</p>
                  </div>
                </div>
              </div>

              <p>
                For complex problems with multiple potential causes, use a <strong>fishbone
                (Ishikawa) diagram</strong>. The problem sits at the &ldquo;head&rdquo; of the fish,
                and the &ldquo;bones&rdquo; represent six categories of potential causes:
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">Fishbone Diagram Categories</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-white font-medium">People</p>
                    <p className="text-white/80 text-xs mt-1">Skills, training, supervision, fatigue, competence</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-white font-medium">Process</p>
                    <p className="text-white/80 text-xs mt-1">Methods, procedures, inspections, approvals, sequences</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-white font-medium">Equipment</p>
                    <p className="text-white/80 text-xs mt-1">Tool condition, calibration, suitability, availability</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-white font-medium">Materials</p>
                    <p className="text-white/80 text-xs mt-1">Specification, quality, storage, supply, compatibility</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-white font-medium">Environment</p>
                    <p className="text-white/80 text-xs mt-1">Temperature, humidity, lighting, access, noise</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-white font-medium">Management</p>
                    <p className="text-white/80 text-xs mt-1">Planning, communication, resources, priorities, oversight</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Recurring Problem Test</p>
                </div>
                <p className="text-sm text-white/80">
                  If you keep solving the same problem, you are treating symptoms. Every time a
                  problem recurs, it is a signal that you have not found and fixed the root cause.
                  Step back, use the 5 Whys or a fishbone diagram, and look deeper. The root cause
                  is almost always a <strong className="text-white">process, system, or management
                  issue</strong> &mdash; not an individual failing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: When the Problem Is People */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            When the Problem Is People
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not all problems are technical. Sometimes the problem is poor communication,
                personality clashes, skill gaps, or motivation issues. These require fundamentally
                different tools &mdash; you cannot use the 5 Whys on a personality clash or apply
                a fishbone diagram to a motivation problem.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">People Problem-Solving Frameworks</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">GROW Model (Coaching)</p>
                    <p className="text-white/80"><strong className="text-white">G</strong>oal &mdash; what does the person want to achieve? <strong className="text-white">R</strong>eality &mdash; where are they now? <strong className="text-white">O</strong>ptions &mdash; what could they do? <strong className="text-white">W</strong>ill &mdash; what will they commit to? Use for skill gaps, development conversations, and performance improvement.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">SBI Model (Feedback)</p>
                    <p className="text-white/80"><strong className="text-white">S</strong>ituation &mdash; when and where did it happen? <strong className="text-white">B</strong>ehaviour &mdash; what specifically did they do? <strong className="text-white">I</strong>mpact &mdash; what was the effect? Use for giving constructive feedback on specific observed behaviours.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">DESC Script (Difficult Conversations)</p>
                    <p className="text-white/80"><strong className="text-white">D</strong>escribe the behaviour objectively. <strong className="text-white">E</strong>xpress how it affects the team or work. <strong className="text-white">S</strong>pecify what you need to change. <strong className="text-white">C</strong>onsequence &mdash; what happens if it does or does not change. Use for conversations about unacceptable behaviour or persistent issues.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Key principle:</strong> Do not try to use
                  technical problem-solving on people problems. A fishbone diagram will not fix a
                  personality clash. The 5 Whys will not address a motivation issue. People problems
                  need empathy, active listening, and structured conversation &mdash; not engineering
                  analysis. The next section on Managing Conflict covers these situations in detail.
                </p>
              </div>

              <p>
                The most important diagnostic question when a problem appears is: <strong>is this
                fundamentally a technical or process issue, or is it a people issue?</strong> If
                materials keep arriving late, that is a supply chain process problem &mdash; use the
                5 Whys. If two electricians keep arguing about methods, that is a relationship
                problem &mdash; use coaching or conflict resolution. Getting this classification
                right saves time and prevents applying the wrong solution.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Recognising People Problems vs Technical Problems</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 text-xs font-semibold mb-1">Signs of a Technical/Process Problem</p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>The problem occurs regardless of who is doing the work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>There is a clear physical or procedural cause</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>The same issue affects multiple team members</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 text-xs font-semibold mb-1">Signs of a People Problem</p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>The problem is specific to one person or relationship</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Emotions, attitudes, or behaviour are central</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Others doing the same task do not have the issue</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Systematic problem-solving is a core leadership skill. The frameworks in this section
                give you reliable tools for diagnosing causes and choosing solutions, even under
                pressure. Your practical problem-solving toolkit:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">5 Whys:</strong> Ask &ldquo;why&rdquo; repeatedly to move from symptom to root cause &mdash; look for process gaps, not people to blame</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">DECIDE model:</strong> Six structured steps for choosing the best solution to complex problems with multiple options</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Root cause vs symptom:</strong> If the problem keeps recurring, you are treating the symptom &mdash; dig deeper</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Fishbone diagrams:</strong> Categorise causes into People, Process, Equipment, Materials, Environment, and Management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">People problems:</strong> Use GROW for coaching, SBI for feedback, DESC for difficult conversations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Systematic beats gut:</strong> Structured methods produce more consistent, better results than intuition alone</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Next:</strong> In Section 3, we tackle managing
                  conflict on site &mdash; Thomas-Kilmann&rsquo;s five conflict modes, de-escalation
                  techniques, the ACAS approach, and how to handle the most common site disputes
                  constructively.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 2 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-4-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-4-section-3">
              Next: Managing Conflict
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
