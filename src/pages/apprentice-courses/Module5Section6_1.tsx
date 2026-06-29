import { ArrowLeft, ArrowRight, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quizQuestions = [
  {
    id: 1,
    question: 'Why is clear verbal communication important on site?',
    options: [
      'It removes the need to keep written records of instructions',
      'It prevents mistakes, improves coordination, and reduces risks of accidents',
      'It allows work to proceed without supervisor approval',
      'It guarantees the job will always finish ahead of programme',
    ],
    correctAnswer: 1,
    explanation:
      'Clear verbal communication prevents installation mistakes, improves coordination between trades, and reduces the risk of accidents caused by misheard instructions.',
  },
  {
    id: 2,
    question: 'What are the three key characteristics of professional communication?',
    options: [
      'Formal, complex, and detailed',
      'Loud, fast, and technical',
      'Clarity, conciseness, and professionalism',
      'Casual, friendly, and relaxed',
    ],
    correctAnswer: 2,
    explanation:
      'Professional communication is built on clarity (easy to understand), conciseness (to the point), and professionalism (respectful and accurate).',
  },
  {
    id: 3,
    question: 'Give one example of technical jargon that might confuse a non-electrician.',
    options: [
      "Saying 'power point' when you mean a socket-outlet",
      "Saying 'mains' when you mean the incoming supply",
      "Saying 'spur' when you mean a single outlet",
      "Using 'MCB' instead of saying 'circuit breaker'",
    ],
    correctAnswer: 3,
    explanation:
      "Abbreviations such as 'MCB' are everyday terms to electricians but are technical jargon that can confuse a client, so plain language like 'circuit breaker' is clearer.",
  },
  {
    id: 4,
    question: 'What should you do before giving verbal instructions?',
    options: [
      'Plan what you need to say and structure it clearly',
      'Start speaking immediately so no time is wasted',
      'Assume the listener already knows the background',
      'Wait until the task is half-finished before explaining',
    ],
    correctAnswer: 0,
    explanation:
      'Planning your message and structuring it clearly before speaking helps you deliver complete, unambiguous instructions that are less likely to be misunderstood.',
  },
  {
    id: 5,
    question: 'What does it mean to be concise?',
    options: [
      'Adding extra detail so nothing can be missed',
      'Delivering your message directly, without unnecessary words',
      'Speaking as loudly as possible over site noise',
      'Repeating the instruction several times to be safe',
    ],
    correctAnswer: 1,
    explanation:
      'Being concise means getting to the point and giving the essential information first, without rambling or padding the message with unnecessary words.',
  },
  {
    id: 6,
    question: 'How can background noise affect communication?',
    options: [
      'It improves concentration on the task in hand',
      'It has no real effect once you raise your voice',
      'It can cause misheard instructions and mistakes',
      'It makes written instructions unnecessary',
    ],
    correctAnswer: 2,
    explanation:
      'Background noise from machinery and tools is common on site and can lead to instructions being misheard, causing errors and safety risks.',
  },
  {
    id: 7,
    question: 'What is the purpose of repeating back instructions?',
    options: [
      'To show the speaker you were paying attention only',
      'To slow the work down so mistakes are caught later',
      'To avoid having to ask any follow-up questions',
      'To confirm understanding and avoid errors',
    ],
    correctAnswer: 3,
    explanation:
      'Repeating or paraphrasing key instructions back confirms that you have understood them correctly and lets the speaker correct any misunderstanding before work starts.',
  },
  {
    id: 8,
    question: 'Give one example of professional body language.',
    options: [
      'Maintaining eye contact while giving instructions',
      'Folding your arms and looking away while listening',
      'Checking your phone while someone is speaking',
      'Turning your back to the speaker to carry on working',
    ],
    correctAnswer: 0,
    explanation:
      'Facing the speaker and maintaining appropriate eye contact shows you are engaged and listening, which is part of professional, respectful communication.',
  },
  {
    id: 9,
    question: "What should you do if you don't understand an instruction?",
    options: [
      'Make a reasonable assumption and start the work',
      'Ask for clarification immediately',
      'Carry on with a different task instead',
      'Wait until the end of the day to raise it',
    ],
    correctAnswer: 1,
    explanation:
      'If an instruction is unclear, ask for clarification straight away. Guessing or delaying risks doing the wrong work and creating safety hazards.',
  },
  {
    id: 10,
    question: 'How does active listening help communication?',
    options: [
      'It lets you continue working while half-listening',
      'It removes the need to make eye contact',
      'It ensures you fully understand the message and can confirm it back',
      'It speeds the conversation up by interrupting the speaker',
    ],
    correctAnswer: 2,
    explanation:
      'Active listening means giving full attention and paraphrasing key points, so you fully understand the message and can confirm it back to avoid errors.',
  },
];

const quickCheckQuestions = [
  {
    id: 'comm1',
    question: 'What is one benefit of clear verbal communication on site?',
    options: [
      'It prevents mistakes and improves safety',
      'Plan what you need to say and structure it clearly',
      'Maintaining eye contact while giving instructions',
      'Ask for clarification immediately',
    ],
    correctIndex: 0,
    explanation:
      'Clear verbal communication prevents mistakes in installation and reduces risks of accidents caused by misheard instructions.',
  },
  {
    id: 'comm2',
    question: 'Which is a barrier to effective communication on construction sites?',
    options: [
      'Maintaining eye contact',
      'Background noise',
      'Using clear language',
      'Asking questions',
    ],
    correctIndex: 1,
    explanation:
      'Background noise is common on construction sites and can cause misheard instructions and mistakes.',
  },
  {
    id: 'comm3',
    question: 'What should you do when receiving important instructions?',
    options: [
      'Write it down without confirming',
      'Continue working while listening',
      "Stop what you're doing and give full attention",
      'Wait until later to ask questions',
    ],
    correctIndex: 2,
    explanation:
      'Active listening requires stopping your current task and giving full attention to ensure you understand the instructions correctly.',
  },
  {
    id: 'comm4',
    question: "What is the 'who, what, when, where' structure used for?",
    options: [
      'Writing reports',
      'Client presentations',
      'Safety briefings only',
      'Giving clear instructions',
    ],
    correctIndex: 3,
    explanation:
      "The 'who, what, when, where' structure helps ensure instructions are complete and clear, reducing the chance of misunderstandings.",
  },
];

const Module5Section6_1 = () => {
  useSEO(
    'Verbal Communication: Being Clear, Concise, and Professional | Electrical Training',
    'Learn essential verbal communication skills for electricians, including clear instructions, professional tone, and active listening techniques for construction sites.'
  );

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
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
        <div className="max-w-4xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white">•</span>
              <span className="text-white">Section 6.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Verbal Communication: Being Clear, Concise, and Professional
            </h1>
            <p className="text-white text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master essential communication skills for electrical work environments
            </p>
          </header>

          {/* Quick Reference */}
          <section className="mb-10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="text-white text-sm space-y-1">
                  <li>• Clear communication prevents installation mistakes</li>
                  <li>• Use simple language, avoid unnecessary jargon</li>
                  <li>• Always confirm understanding by repeating back</li>
                  <li>• Active listening prevents costly errors</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="text-white text-sm space-y-1">
                  <li>
                    • <strong>Spot:</strong> Plan your words before speaking
                  </li>
                  <li>
                    • <strong>Use:</strong> Check understanding after giving instructions
                  </li>
                  <li>
                    • <strong>Check:</strong> Use "who, what, when, where" structure
                  </li>
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
            <ul className="text-white space-y-2 leading-relaxed">
              <li>
                • Explain why professional verbal communication is essential in electrical work
              </li>
              <li>• Identify common barriers to clear communication on site</li>
              <li>
                • Apply techniques for being concise and professional when speaking with others
              </li>
              <li>• Demonstrate active listening skills to ensure mutual understanding</li>
            </ul>
          </section>

          {/* Section 1 - Why Clear Verbal Communication Matters */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Why Clear Verbal Communication Matters
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Effective communication is the foundation of safe and efficient electrical work.
                Poor communication leads to serious consequences:
              </p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Safety Implications</p>
                <ul className="text-sm space-y-1 text-white">
                  <li>
                    • Prevents mistakes in installation (e.g., misunderstanding circuit layouts)
                  </li>
                  <li>• Reduces risks of accidents caused by misheard instructions</li>
                  <li>• Ensures proper isolation procedures are communicated</li>
                  <li>• Prevents incorrect tool or material usage</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <p className="font-semibold text-green-400 mb-2">Project Efficiency</p>
                <ul className="text-sm space-y-1 text-white">
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
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Professional communication has four key characteristics that distinguish it from
                casual conversation:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Clarity</p>
                  <p className="text-sm text-white">
                    Speak in straightforward language. Avoid unnecessary jargon unless everyone
                    understands it. Use specific terms rather than vague descriptions.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Conciseness</p>
                  <p className="text-sm text-white">
                    Get to the point quickly. Deliver your message without rambling. Focus on
                    essential information first.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Professional Tone</p>
                  <p className="text-sm text-white">
                    Maintain a respectful, calm, and confident manner. Show respect for all team
                    members regardless of rank.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Accuracy</p>
                  <p className="text-sm text-white">
                    Use correct terminology. Reference specific locations, quantities, and
                    specifications. Double-check facts before communicating them.
                  </p>
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
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction sites present unique challenges to clear communication. Understanding
                these barriers helps you overcome them:
              </p>

              <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
                <p className="font-semibold text-purple-400 mb-2">Common Barriers</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Environmental</p>
                    <p className="text-white">
                      Background noise, distance, poor lighting, interference from machinery and
                      tools.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Language and Cultural</p>
                    <p className="text-white">
                      Technical jargon, language differences, varying levels of technical knowledge,
                      regional terminology.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Personal</p>
                    <p className="text-white">
                      Not actively listening, assumptions about what others know, stress, fear of
                      asking questions.
                    </p>
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
            <div className="text-white space-y-4 leading-relaxed">
              <p>Master these practical techniques to improve your verbal communication on site:</p>

              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="font-semibold text-elec-yellow mb-2">Preparation Techniques</p>
                  <ul className="text-sm space-y-1 text-white">
                    <li>• Plan before you speak – think through what needs to be said</li>
                    <li>• Organise information logically (most important first)</li>
                    <li>• Consider your audience and their level of knowledge</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                  <p className="font-semibold text-green-400 mb-2">Delivery Techniques</p>
                  <ul className="text-sm space-y-1 text-white">
                    <li>• Use simple, short sentences – especially when giving instructions</li>
                    <li>• Speak clearly and at appropriate volume for the environment</li>
                    <li>• Pause between key points to allow processing</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
                  <p className="font-semibold text-blue-400 mb-2">Confirmation Techniques</p>
                  <ul className="text-sm space-y-1 text-white">
                    <li>
                      • Check understanding – ask the listener to repeat back key instructions
                    </li>
                    <li>
                      • Use open questions: "What questions do you have?" not "Do you understand?"
                    </li>
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
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Active listening is just as important as speaking clearly. It ensures you fully
                understand instructions and can respond appropriately:
              </p>

              <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
                <p className="font-semibold text-cyan-400 mb-2">Active Listening Components</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Physical Attention</p>
                    <p className="text-white">
                      Give full attention (don't keep working when someone's talking to you). Face
                      the speaker and maintain appropriate eye contact.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Verbal and Non-Verbal Feedback</p>
                    <p className="text-white">
                      Nod or give verbal cues ("yes," "I understand," "right"). Use appropriate
                      facial expressions to show engagement.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Confirmation and Clarification</p>
                    <p className="text-white">
                      Repeat or paraphrase key points to confirm understanding. Ask specific
                      questions about unclear instructions.
                    </p>
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
            <div className="text-white space-y-4 leading-relaxed">
              <p>Use this structured approach for giving clear instructions:</p>

              <div className="p-4 rounded-lg bg-indigo-500/5 border-l-2 border-indigo-500/50">
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">
                      WHO: Address the person specifically
                    </p>
                    <p className="text-white">
                      Use the person's name to get their attention. Ensure they are ready to receive
                      the instruction.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">WHAT: Describe the task clearly</p>
                    <p className="text-white">
                      Be specific about materials (e.g., "2.5mm twin and earth cable"). Specify the
                      method or standard required.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">WHEN: Set clear timescales</p>
                    <p className="text-white">
                      Give specific deadlines ("before lunch," "by 3pm"). Indicate priority level if
                      multiple tasks.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">WHERE: Specify exact locations</p>
                    <p className="text-white">
                      Use specific references ("socket three on the north wall"). Reference drawings
                      or room numbers where available.
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white/5 rounded border border-white/10">
                  <p className="text-sm text-white">
                    <strong className="text-white">Example:</strong> "John (WHO), I need you to run
                    2.5mm twin and earth cable from the consumer unit to socket three on the north
                    wall (WHAT), and get it done before lunch (WHEN). The socket location is marked
                    on drawing E-02 (WHERE)."
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
              <ul className="text-white text-sm space-y-2">
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
              <p className="text-white text-sm mb-3">In this subsection, you've learned:</p>
              <ul className="text-white text-sm space-y-1">
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
