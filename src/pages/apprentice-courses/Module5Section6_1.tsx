import { ArrowLeft, ArrowRight, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quizQuestions = [
  {
    id: 1,
    question: "Why is clear verbal communication important on site?",
    options: [
      "It prevents mistakes, improves coordination, and reduces risks of accidents",
      "It helps you finish work faster",
      "It impresses supervisors",
      "It's a legal requirement"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "What are the three key characteristics of professional communication?",
    options: [
      "Loud, fast, and technical",
      "Clarity, conciseness, and professionalism",
      "Formal, complex, and detailed",
      "Casual, friendly, and relaxed"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Give one example of technical jargon that might confuse a non-electrician.",
    options: [
      "Using 'cable' instead of 'wire'",
      "Using 'MCB' instead of saying 'circuit breaker'",
      "Using 'socket' instead of 'outlet'",
      "Using 'switch' instead of 'control'"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What should you do before giving verbal instructions?",
    options: [
      "Speak as quickly as possible",
      "Use lots of technical terms",
      "Plan what you need to say and structure it clearly",
      "Assume everyone understands"
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "What does it mean to be concise?",
    options: [
      "Using big words to sound professional",
      "Speaking very quietly",
      "Delivering your message quickly and directly, without unnecessary words",
      "Using only technical terminology"
    ],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "How can background noise affect communication?",
    options: [
      "It makes you sound more professional",
      "It can cause misheard instructions and mistakes",
      "It doesn't affect communication",
      "It helps focus attention"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "What is the purpose of repeating back instructions?",
    options: [
      "To waste time",
      "To show you're listening",
      "To confirm understanding and avoid errors",
      "To practice speaking"
    ],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "Give one example of professional body language.",
    options: [
      "Looking at your phone while listening",
      "Maintaining eye contact while giving instructions",
      "Crossing your arms",
      "Turning your back to the speaker"
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "What should you do if you don't understand an instruction?",
    options: [
      "Guess what they meant",
      "Ask for clarification immediately",
      "Ignore it and move on",
      "Ask someone else later"
    ],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "How does active listening help communication?",
    options: [
      "It makes you look busy",
      "It ensures you fully understand the message and can confirm it back",
      "It impresses your supervisor",
      "It saves time"
    ],
    correctAnswer: 1
  }
];

const quickCheckQuestions = [
  {
    id: "comm1",
    question: "What is one benefit of clear verbal communication on site?",
    options: [
      "It makes you sound professional",
      "It prevents mistakes and improves safety",
      "It saves time",
      "It impresses supervisors"
    ],
    correctIndex: 1,
    explanation: "Clear verbal communication prevents mistakes in installation and reduces risks of accidents caused by misheard instructions."
  },
  {
    id: "comm2",
    question: "Which is a barrier to effective communication on construction sites?",
    options: [
      "Using clear language",
      "Background noise",
      "Maintaining eye contact",
      "Asking questions"
    ],
    correctIndex: 1,
    explanation: "Background noise is common on construction sites and can cause misheard instructions and mistakes."
  },
  {
    id: "comm3",
    question: "What should you do when receiving important instructions?",
    options: [
      "Continue working while listening",
      "Stop what you're doing and give full attention",
      "Wait until later to ask questions",
      "Write it down without confirming"
    ],
    correctIndex: 1,
    explanation: "Active listening requires stopping your current task and giving full attention to ensure you understand the instructions correctly."
  },
  {
    id: "comm4",
    question: "What is the 'who, what, when, where' structure used for?",
    options: [
      "Writing reports",
      "Giving clear instructions",
      "Safety briefings only",
      "Client presentations"
    ],
    correctIndex: 1,
    explanation: "The 'who, what, when, where' structure helps ensure instructions are complete and clear, reducing the chance of misunderstandings."
  }
];

const Module5Section6_1 = () => {
  useSEO(
    "Verbal Communication: Being Clear, Concise, and Professional | Electrical Training",
    "Learn essential verbal communication skills for electricians, including clear instructions, professional tone, and active listening techniques for construction sites."
  );

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
              <span className="text-white/60">Section 6.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Verbal Communication: Being Clear, Concise, and Professional
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master essential communication skills for electrical work environments
            </p>
          </header>

          {/* Quick Reference */}
          <section className="mb-10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• Clear communication prevents installation mistakes</li>
                  <li>• Use simple language, avoid unnecessary jargon</li>
                  <li>• Always confirm understanding by repeating back</li>
                  <li>• Active listening prevents costly errors</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• <strong>Spot:</strong> Plan your words before speaking</li>
                  <li>• <strong>Use:</strong> Check understanding after giving instructions</li>
                  <li>• <strong>Check:</strong> Use "who, what, when, where" structure</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2 leading-relaxed">
              <li>• Explain why professional verbal communication is essential in electrical work</li>
              <li>• Identify common barriers to clear communication on site</li>
              <li>• Apply techniques for being concise and professional when speaking with others</li>
              <li>• Demonstrate active listening skills to ensure mutual understanding</li>
            </ul>
          </section>

          {/* Section 1 - Why Clear Verbal Communication Matters */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Why Clear Verbal Communication Matters
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Effective communication is the foundation of safe and efficient electrical work. Poor communication leads to serious consequences:
              </p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Safety Implications</p>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Prevents mistakes in installation (e.g., misunderstanding circuit layouts)</li>
                  <li>• Reduces risks of accidents caused by misheard instructions</li>
                  <li>• Ensures proper isolation procedures are communicated</li>
                  <li>• Prevents incorrect tool or material usage</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <p className="font-semibold text-green-400 mb-2">Project Efficiency</p>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Improves coordination with supervisors, clients, and other trades</li>
                  <li>• Reduces time wasted on clarification and rework</li>
                  <li>• Ensures materials and tools are available when needed</li>
                  <li>• Facilitates smooth handovers between shifts and trades</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 - Characteristics of Professional Communication */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Characteristics of Professional Communication
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Professional communication has four key characteristics that distinguish it from casual conversation:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Clarity</p>
                  <p className="text-sm text-white/70">Speak in straightforward language. Avoid unnecessary jargon unless everyone understands it. Use specific terms rather than vague descriptions.</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Conciseness</p>
                  <p className="text-sm text-white/70">Get to the point quickly. Deliver your message without rambling. Focus on essential information first.</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Professional Tone</p>
                  <p className="text-sm text-white/70">Maintain a respectful, calm, and confident manner. Show respect for all team members regardless of rank.</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Accuracy</p>
                  <p className="text-sm text-white/70">Use correct terminology. Reference specific locations, quantities, and specifications. Double-check facts before communicating them.</p>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />

          {/* Section 3 - Barriers to Effective Communication */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Barriers to Effective Communication
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Construction sites present unique challenges to clear communication. Understanding these barriers helps you overcome them:
              </p>

              <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
                <p className="font-semibold text-purple-400 mb-2">Common Barriers</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Environmental</p>
                    <p className="text-white/70">Background noise, distance, poor lighting, interference from machinery and tools.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Language and Cultural</p>
                    <p className="text-white/70">Technical jargon, language differences, varying levels of technical knowledge, regional terminology.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Personal</p>
                    <p className="text-white/70">Not actively listening, assumptions about what others know, stress, fear of asking questions.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />

          {/* Section 4 - Techniques for Clear and Professional Speech */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Techniques for Clear and Professional Speech
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Master these practical techniques to improve your verbal communication on site:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="font-semibold text-elec-yellow mb-2">Preparation Techniques</p>
                  <ul className="text-sm space-y-1 text-white/70">
                    <li>• Plan before you speak – think through what needs to be said</li>
                    <li>• Organise information logically (most important first)</li>
                    <li>• Consider your audience and their level of knowledge</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                  <p className="font-semibold text-green-400 mb-2">Delivery Techniques</p>
                  <ul className="text-sm space-y-1 text-white/70">
                    <li>• Use simple, short sentences – especially when giving instructions</li>
                    <li>• Speak clearly and at appropriate volume for the environment</li>
                    <li>• Pause between key points to allow processing</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
                  <p className="font-semibold text-blue-400 mb-2">Confirmation Techniques</p>
                  <ul className="text-sm space-y-1 text-white/70">
                    <li>• Check understanding – ask the listener to repeat back key instructions</li>
                    <li>• Use open questions: "What questions do you have?" not "Do you understand?"</li>
                    <li>• Watch for non-verbal cues that suggest confusion</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />

          {/* Section 5 - Active Listening Skills */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Active Listening Skills
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Active listening is just as important as speaking clearly. It ensures you fully understand instructions and can respond appropriately:
              </p>

              <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
                <p className="font-semibold text-cyan-400 mb-2">Active Listening Components</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Physical Attention</p>
                    <p className="text-white/70">Give full attention (don't keep working when someone's talking to you). Face the speaker and maintain appropriate eye contact.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Verbal and Non-Verbal Feedback</p>
                    <p className="text-white/70">Nod or give verbal cues ("yes," "I understand," "right"). Use appropriate facial expressions to show engagement.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Confirmation and Clarification</p>
                    <p className="text-white/70">Repeat or paraphrase key points to confirm understanding. Ask specific questions about unclear instructions.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[3]} />

          {/* Section 6 - Practical Application */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Practical Application: The "Who, What, When, Where" Structure
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Use this structured approach for giving clear instructions:
              </p>

              <div className="p-4 rounded-lg bg-indigo-500/5 border-l-2 border-indigo-500/50">
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">WHO: Address the person specifically</p>
                    <p className="text-white/70">Use the person's name to get their attention. Ensure they are ready to receive the instruction.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">WHAT: Describe the task clearly</p>
                    <p className="text-white/70">Be specific about materials (e.g., "2.5mm twin and earth cable"). Specify the method or standard required.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">WHEN: Set clear timescales</p>
                    <p className="text-white/70">Give specific deadlines ("before lunch," "by 3pm"). Indicate priority level if multiple tasks.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">WHERE: Specify exact locations</p>
                    <p className="text-white/70">Use specific references ("socket three on the north wall"). Reference drawings or room numbers where available.</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white/5 rounded border border-white/10">
                  <p className="text-sm text-white/80">
                    <strong className="text-white">Example:</strong> "John (WHO), I need you to run 2.5mm twin and earth cable from the consumer unit to socket three on the north wall (WHAT), and get it done before lunch (WHEN). The socket location is marked on drawing E-02 (WHERE)."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow" />
              Pocket Guide
            </h2>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <ul className="text-white/80 text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Be clear, concise, professional</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Speak with confidence and respect</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Avoid jargon unless everyone understands it</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Always check understanding (repeat back if needed)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Practice active listening – stop, focus, confirm</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Recap
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-white/80 text-sm mb-3">In this subsection, you've learned:</p>
              <ul className="text-white/80 text-sm space-y-1">
                <li>• Why clear and professional verbal communication is critical</li>
                <li>• Common barriers and how to overcome them</li>
                <li>• Techniques for giving instructions effectively</li>
                <li>• How to actively listen and confirm understanding</li>
              </ul>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz title="Test Your Knowledge: Verbal Communication" questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Section 6
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../6-2">
                Next: Written Instructions and Handovers
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section6_1;
