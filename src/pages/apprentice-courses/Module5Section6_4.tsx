import { ArrowLeft, ArrowRight, MessageCircle, Target, CheckCircle2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quizQuestions = [
  {
    id: 1,
    question: "What is a common cause of misunderstandings on site?",
    options: [
      "Poorly explained instructions",
      "Good teamwork",
      "Clear drawings",
      "Proper planning"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "Give two signs that a misunderstanding may have occurred.",
    options: [
      "Fast work completion and happy workers",
      "Confused expressions and work done incorrectly",
      "Clear instructions and good progress",
      "Quiet site and efficient work"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What should you do if you are unsure of an instruction?",
    options: [
      "Guess what is meant",
      "Stop and ask for clarification immediately",
      "Continue working and hope for the best",
      "Ask a colleague to guess"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Explain the 'Repeat Back' method.",
    options: [
      "Saying instructions louder",
      "Summarising instructions back to the supervisor to confirm accuracy",
      "Writing down everything said",
      "Asking someone else to repeat"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Why is it important to clarify conflicting instructions?",
    options: [
      "To waste time",
      "To avoid mistakes and ensure the correct task is carried out",
      "To show off knowledge",
      "To create more confusion"
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "What resource should you refer to if instructions are unclear?",
    options: [
      "Social media",
      "Site drawings, specifications, or BS 7671 regulations",
      "Personal opinion",
      "Previous job experience only"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "How can clarification improve teamwork?",
    options: [
      "It creates more work",
      "It builds trust and ensures everyone works to the same standard",
      "It slows down progress",
      "It causes arguments"
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "True or False: Asking questions shows you are inexperienced.",
    options: [
      "True - it shows weakness",
      "False — it shows professionalism and commitment to safety",
      "True - experienced workers never ask questions",
      "False - but only if asked quietly"
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "What is the risk of not asking for clarification?",
    options: [
      "Nothing happens",
      "Errors, rework, delays, and possible safety hazards",
      "Work gets completed faster",
      "Supervisors are impressed"
    ],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "What should you do if technical jargon is used and you don't understand it?",
    options: [
      "Pretend to understand",
      "Ask for simpler terms or request to see a drawing",
      "Ignore it completely",
      "Ask a random colleague"
    ],
    correctAnswer: 1
  }
];

const quickCheckQuestions = [
  {
    id: "clarify1",
    question: "What should you do if you receive unclear instructions?",
    options: [
      "Guess what is meant and start working",
      "Ask for clarification immediately before starting work",
      "Wait until you make a mistake then ask",
      "Ask a colleague to interpret"
    ],
    correctIndex: 1,
    explanation: "Always ask for clarification immediately if instructions are unclear. Guessing can lead to errors, rework, and potential safety hazards."
  },
  {
    id: "clarify2",
    question: "What is the 'Repeat Back' method?",
    options: [
      "Repeating instructions word for word",
      "Summarising instructions back to confirm understanding",
      "Writing down every instruction",
      "Asking someone else to repeat instructions"
    ],
    correctIndex: 1,
    explanation: "The 'Repeat Back' method involves summarising instructions in your own words to confirm you've understood correctly, helping prevent misunderstandings."
  },
  {
    id: "clarify3",
    question: "How should you respond if two supervisors give conflicting instructions?",
    options: [
      "Follow the first instruction received",
      "Politely explain the conflict and ask which should take priority",
      "Ignore both instructions",
      "Choose the easier instruction to follow"
    ],
    correctIndex: 1,
    explanation: "When instructions conflict, politely bring this to attention and ask for clarification on which takes priority to avoid mistakes and confusion."
  },
  {
    id: "clarify4",
    question: "Why is it professional to ask questions when unsure?",
    options: [
      "It shows you're not paying attention",
      "It demonstrates commitment to doing the job correctly and safely",
      "It proves you're inexperienced",
      "It wastes everyone's time"
    ],
    correctIndex: 1,
    explanation: "Asking questions when unsure shows professionalism, commitment to safety, and ensures work is done correctly the first time."
  }
];

const Module5Section6_4 = () => {
  useSEO(
    "Resolving Misunderstandings and Asking for Clarification | Electrical Training",
    "Learn how to spot and resolve misunderstandings and effectively ask for clarification in electrical work to ensure safety and accuracy."
  );

  const faqs = [
    {
      question: "Won't asking questions make me look inexperienced?",
      answer: "No — asking questions shows professionalism and a commitment to safety. Experienced professionals always clarify when unsure."
    },
    {
      question: "What if two supervisors give conflicting instructions?",
      answer: "Politely explain the conflict and ask which instruction should take priority. This prevents mistakes and shows good communication skills."
    },
    {
      question: "How do I clarify something if I don't understand technical jargon?",
      answer: "Ask for it to be explained in simpler terms or request to see a drawing. Most supervisors appreciate when workers ensure they understand correctly."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
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
              <span className="text-white/60">Section 6.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Resolving Misunderstandings and Asking for Clarification
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Essential skills for clear communication and preventing errors on site
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
                  <li>Always clarify if unsure — don't assume</li>
                  <li>Use the "Repeat Back" method to confirm instructions</li>
                  <li>Ask specific, polite questions</li>
                  <li>Stop work if instructions conflict or seem unsafe</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong>Spot:</strong> Confused expressions or hesitation from colleagues</li>
                  <li><strong>Use:</strong> "Repeat Back" method for confirmation</li>
                  <li><strong>Check:</strong> Against drawings and specifications when uncertain</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-elec-yellow/80" />
              Learning Outcomes
            </h2>
            <p className="text-white/90 mb-4">
              By the end of this subsection, you will be able to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Recognise signs of miscommunication on site</li>
              <li>Use effective techniques to ask for clarification</li>
              <li>Apply strategies to resolve misunderstandings quickly</li>
              <li>Appreciate the importance of clear communication to prevent errors and accidents</li>
            </ul>
          </section>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Causes of Misunderstandings
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              On construction sites, communication breakdowns can happen easily. Understanding the common causes helps prevent them:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Communication Issues:</p>
                <ul className="text-white/80 ml-4 list-disc space-y-1 text-sm">
                  <li>Poorly explained instructions or unclear technical language</li>
                  <li>Use of jargon without checking understanding</li>
                  <li>Assumptions made instead of checking facts</li>
                  <li>Information passed through multiple people</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Environmental Factors:</p>
                <ul className="text-white/80 ml-4 list-disc space-y-1 text-sm">
                  <li>Noise or distractions on site affecting concentration</li>
                  <li>Poor lighting making drawings difficult to read</li>
                  <li>Time pressure leading to rushed explanations</li>
                  <li>Multiple tasks being explained at once</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Personal Factors:</p>
                <ul className="text-white/80 ml-4 list-disc space-y-1 text-sm">
                  <li>Cultural or language differences affecting understanding</li>
                  <li>Different levels of experience and knowledge</li>
                  <li>Reluctance to admit not understanding</li>
                  <li>Fatigue affecting concentration and comprehension</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Spotting Signs of Misunderstanding
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Early recognition of misunderstandings prevents errors and accidents:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Verbal and Non-Verbal Signs:</p>
                <ul className="text-white/80 ml-4 list-disc space-y-1 text-sm">
                  <li>Confused expressions or hesitation from team members</li>
                  <li>Requests to repeat instructions multiple times</li>
                  <li>Vague responses like "I think so" or "probably"</li>
                  <li>Body language showing uncertainty or confusion</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-2">Work Performance Indicators:</p>
                <ul className="text-white/80 ml-4 list-disc space-y-1 text-sm">
                  <li>Work being done incorrectly or differently than instructed</li>
                  <li>Repeated questions on the same task</li>
                  <li>Lack of progress due to uncertainty</li>
                  <li>Unusual delays or apparent avoidance of tasks</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />

          {/* Section 3 */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Asking for Clarification Effectively
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Professional communication techniques ensure clarity and prevent mistakes:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">The "Repeat Back" Method:</p>
                <ul className="text-white/80 ml-4 list-disc space-y-1 text-sm">
                  <li>Summarise instructions in your own words for confirmation</li>
                  <li>Example: "Just to confirm, you want this conduit run along the ceiling and dropped into the riser?"</li>
                  <li>Helps identify misunderstandings before work begins</li>
                  <li>Shows active listening and professionalism</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Effective Questioning Techniques:</p>
                <ul className="text-white/80 ml-4 list-disc space-y-1 text-sm">
                  <li>Be polite and professional — avoid sounding confrontational</li>
                  <li>Ask for examples, drawings, or demonstrations if unsure</li>
                  <li>Confirm deadlines and priorities clearly</li>
                  <li>Request specific information rather than general explanations</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Professional Language:</p>
                <ul className="text-white/80 ml-4 list-disc space-y-1 text-sm">
                  <li>Use phrases like "Could you clarify..." rather than "I don't understand"</li>
                  <li>Focus on the task, not the person giving instructions</li>
                  <li>Keep questions short, clear, and specific</li>
                  <li>Thank supervisors for their time and clarification</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />

          {/* Section 4 */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Strategies for Resolving Misunderstandings
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              When misunderstandings occur, quick and effective resolution is essential:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-white mb-2">Immediate Actions:</p>
                <ul className="text-white/80 ml-4 list-disc space-y-1 text-sm">
                  <li>Stop work if unsure — mistakes cost time and can be unsafe</li>
                  <li>Acknowledge the misunderstanding without blaming anyone</li>
                  <li>Seek clarification from the original source of instructions</li>
                  <li>Document the clarification to prevent future confusion</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Reference Materials:</p>
                <ul className="text-white/80 ml-4 list-disc space-y-1 text-sm">
                  <li>Refer back to site drawings, specifications, or method statements</li>
                  <li>Check against BS 7671 Wiring Regulations when applicable</li>
                  <li>Use manufacturer's instructions for specific equipment</li>
                  <li>Consult site-specific safety procedures and protocols</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-teal-500/50">
                <p className="font-medium text-white mb-2">Escalation Procedures:</p>
                <ul className="text-white/80 ml-4 list-disc space-y-1 text-sm">
                  <li>If conflicting instructions are given, escalate to the foreman or manager</li>
                  <li>Ask supervisors or experienced colleagues for confirmation</li>
                  <li>Request written clarification for complex or critical tasks</li>
                  <li>Follow site hierarchy for decision-making</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />

          {/* Section 5 */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Benefits of Clarification
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Effective clarification provides multiple benefits for individuals, teams, and projects:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Safety and Quality Benefits:</p>
                <ul className="text-white/80 ml-4 list-disc space-y-1 text-sm">
                  <li>Prevents errors and rework, saving time and materials</li>
                  <li>Reduces the risk of accidents caused by misunderstandings</li>
                  <li>Ensures work meets specifications and quality standards</li>
                  <li>Improves compliance with safety regulations and procedures</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Professional and Team Benefits:</p>
                <ul className="text-white/80 ml-4 list-disc space-y-1 text-sm">
                  <li>Strengthens teamwork and trust between colleagues</li>
                  <li>Demonstrates professionalism and commitment to quality</li>
                  <li>Builds reputation for reliability and attention to detail</li>
                  <li>Creates a positive work environment where questions are welcomed</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Project Benefits:</p>
                <ul className="text-white/80 ml-4 list-disc space-y-1 text-sm">
                  <li>Saves time and reduces costs through fewer mistakes</li>
                  <li>Keeps projects on schedule and within budget</li>
                  <li>Improves client satisfaction with quality outcomes</li>
                  <li>Reduces stress and pressure on all team members</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[3]} />

          {/* Practical Guidance */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Target className="w-5 h-5 text-elec-yellow/80" />
              Practical Guidance
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p><strong className="text-white">If instructions are unclear, always ask immediately rather than guessing.</strong> Guessing can lead to costly errors and safety risks.</p>

              <p><strong className="text-white">Use the "Repeat Back" method:</strong> summarise instructions to confirm understanding. For example: "So you want me to install three sockets on this wall, with the cables run behind the plasterboard?"</p>

              <p><strong className="text-white">Keep questions short, clear, and specific.</strong> Instead of "I don't understand," ask "Could you show me exactly where this cable should terminate?"</p>

              <p><strong className="text-white">Avoid blaming language — focus on the task, not the person.</strong> Say "Could you clarify the connection sequence?" rather than "You didn't explain this properly."</p>

              <p><strong className="text-white">When in doubt, check against drawings or the BS 7671 Wiring Regulations.</strong> These provide authoritative guidance when verbal instructions are unclear.</p>
            </div>
          </section>

          {/* Real World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real World Example
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <h3 className="font-semibold text-red-400 mb-2">Communication Breakdown</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  An apprentice is told to "terminate the cable in the distribution board." He assumes this means connecting it to the main switch, but the supervisor intended it to be connected to an outgoing circuit breaker. Because he didn't clarify, the result was a wasted hour of rework and an unnecessary safety risk.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <h3 className="font-semibold text-green-400 mb-2">Successful Resolution</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  By simply repeating back the instruction for confirmation - "Just to confirm, you want me to connect this cable to the main switch in the board?" - the mistake would have been avoided. The supervisor could then clarify: "No, connect it to the spare MCB in position 6."
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
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

          {/* Pocket Guide */}
          <section className="mb-10">
            <div className="p-5 rounded-lg bg-gradient-to-br from-elec-yellow/10 to-amber-600/5 border border-elec-yellow/30">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-5 h-5 text-elec-yellow" />
                <h2 className="text-xl font-semibold text-white">Pocket Guide</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-white mb-2">Quick Clarification Steps:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-white/80 text-sm">
                    <li>Always clarify if unsure — don't assume</li>
                    <li>Use the "Repeat Back" method to confirm instructions</li>
                    <li>Ask specific, polite questions</li>
                    <li>Stop work if instructions conflict or seem unsafe</li>
                    <li>Check against drawings and specifications</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-2">Professional Phrases:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-white/80 text-sm">
                    <li>"Could you clarify..."</li>
                    <li>"Just to confirm..."</li>
                    <li>"Could you show me exactly where..."</li>
                    <li>"Is this correct..."</li>
                    <li>"Which should take priority..."</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <h2 className="text-xl font-semibold text-white">Recap</h2>
            </div>
            <p className="text-white/80 mb-4">In this subsection, you've learned:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Common causes and signs of misunderstandings on construction sites</li>
              <li>Effective ways to ask for clarification professionally and politely</li>
              <li>Strategies to resolve confusion quickly and safely before errors occur</li>
              <li>Why clarification is vital for saving time, avoiding rework, and ensuring safety</li>
            </ul>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Test Your Knowledge: Resolving Misunderstandings" />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../6-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Communicating Faults
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../../section7">
                Next: Section 7
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section6_4;
