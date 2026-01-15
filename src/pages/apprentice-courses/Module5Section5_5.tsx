import { ArrowLeft, ArrowRight, Users, CheckCircle, Shield, Clock, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Attending Briefings, Toolbox Talks, and Site Meetings - Module 5.5.5 | Level 2 Electrical Course";
const DESCRIPTION = "Learn the importance of attending briefings, toolbox talks, and site meetings. Essential communication skills and responsibilities for electrical professionals.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the main purpose of a toolbox talk?",
    options: ["To discuss project delays", "To provide short, focused safety updates", "To plan lunch breaks", "To check attendance"],
    correctIndex: 1,
    explanation: "Toolbox talks are short sessions focused on safety topics to ensure everyone is aware of current hazards and safety procedures."
  },
  {
    id: 2,
    question: "True or False: Attendance at toolbox talks is optional.",
    options: ["True - they are just suggestions", "False", "True - only for supervisors", "True - if you've heard it before"],
    correctIndex: 1,
    explanation: "False - toolbox talks are mandatory safety briefings that all workers must attend."
  },
  {
    id: 3,
    question: "What should you do if instructions given in a meeting are unclear?",
    options: ["Guess what they mean", "Ask questions or confirm with your supervisor", "Ignore them and continue", "Wait until the next meeting"],
    correctIndex: 1,
    explanation: "You should always ask questions or confirm with your supervisor if instructions are unclear - never guess or assume."
  }
];

const Module5Section5_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of a toolbox talk?",
      options: [
        "To discuss project timelines",
        "To provide short, focused safety updates",
        "To plan work schedules",
        "To check material deliveries"
      ],
      correctAnswer: 1,
      explanation: "Toolbox talks are short sessions focused on safety topics to ensure all workers are aware of current hazards and safety procedures."
    },
    {
      id: 2,
      question: "True or False: Attendance at toolbox talks is optional.",
      options: [
        "True - they are voluntary",
        "False",
        "True - only for new workers",
        "True - if you're experienced"
      ],
      correctAnswer: 1,
      explanation: "False - toolbox talks are mandatory safety briefings that all workers must attend as they are legal requirements for site safety."
    },
    {
      id: 3,
      question: "What should you do if instructions given in a meeting are unclear?",
      options: [
        "Guess what they mean and continue",
        "Ask questions or confirm with your supervisor",
        "Ignore unclear instructions",
        "Wait until someone else asks"
      ],
      correctAnswer: 1,
      explanation: "You should always ask questions or confirm with your supervisor if instructions are unclear - never guess or assume what is meant."
    },
    {
      id: 4,
      question: "Name one responsibility when attending a site meeting.",
      options: [
        "Bring your own refreshments",
        "Arrive on time and be prepared",
        "Take photos of the presentation",
        "Sit at the back"
      ],
      correctAnswer: 1,
      explanation: "Key responsibilities include arriving on time, being prepared, listening carefully, taking notes, and following up on actions."
    },
    {
      id: 5,
      question: "What is a common mistake to avoid in meetings?",
      options: [
        "Taking notes",
        "Not paying attention or ignoring instructions",
        "Asking questions",
        "Sitting near the front"
      ],
      correctAnswer: 1,
      explanation: "Not paying attention and missing key safety points or instructions is a serious mistake that can lead to accidents and delays."
    },
    {
      id: 6,
      question: "Who is responsible for acting on instructions from a briefing?",
      options: [
        "Only the supervisor",
        "Each individual worker",
        "Only senior tradespeople",
        "The safety officer"
      ],
      correctAnswer: 1,
      explanation: "Each individual worker is responsible for understanding and acting on instructions given in briefings and meetings."
    },
    {
      id: 7,
      question: "What might happen if you miss a toolbox talk?",
      options: [
        "Nothing - they're not important",
        "You could miss critical safety information and risk accidents",
        "You'll get a longer lunch break",
        "Someone will tell you later"
      ],
      correctAnswer: 1,
      explanation: "Missing toolbox talks means you could miss critical safety information about new hazards, procedures, or exclusion zones."
    },
    {
      id: 8,
      question: "Why are safety topics often repeated in meetings?",
      options: [
        "Supervisors forget what they've said",
        "To reinforce safe habits and update new workers",
        "To fill time in meetings",
        "Because workers don't listen"
      ],
      correctAnswer: 1,
      explanation: "Repetition reinforces safe habits and ensures new workers are updated on all safety procedures and requirements."
    },
    {
      id: 9,
      question: "What should you bring to a meeting to record details?",
      options: [
        "Your phone camera only",
        "Notebook or phone (if permitted)",
        "Voice recorder",
        "Nothing - just remember"
      ],
      correctAnswer: 1,
      explanation: "You should bring a notebook or use your phone (if permitted) to record key points and action items from meetings."
    },
    {
      id: 10,
      question: "Which type of meeting covers wider project progress and coordination?",
      options: [
        "Daily briefings",
        "Formal site meetings",
        "Toolbox talks",
        "Safety briefings"
      ],
      correctAnswer: 1,
      explanation: "Formal site meetings cover wider project progress, coordination between trades, and future planning beyond daily activities."
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
              Back to Section 5
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
              <span className="text-white/60">Section 5.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Attending Briefings, Toolbox Talks, and Site Meetings
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Essential communication and safety practices for professional electrical work on construction sites
            </p>
          </header>

          {/* Quick Reference */}
          <section className="mb-10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• Briefings keep everyone informed about site rules and safety</li>
                  <li>• Toolbox talks are mandatory safety sessions</li>
                  <li>• Active participation demonstrates professionalism</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• <strong>Spot:</strong> Meeting schedules, safety notices</li>
                  <li>• <strong>Use:</strong> Listen actively, take notes, ask questions</li>
                  <li>• <strong>Check:</strong> Attendance recorded, actions understood</li>
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
              <li>• Explain the purpose of briefings, toolbox talks, and site meetings</li>
              <li>• Recognise the importance of active participation</li>
              <li>• Apply communication and listening skills during meetings</li>
              <li>• Identify your responsibilities when attending</li>
              <li>• Use information from meetings to plan and carry out tasks effectively</li>
            </ul>
          </section>

          {/* Section 1 - Purpose of Site Meetings */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Purpose of Site Meetings
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Different types of meetings serve specific purposes in maintaining site coordination and safety:
              </p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Types of Site Communications</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Briefings</p>
                    <p className="text-white/70">Provide daily updates on site activities, progress, and immediate concerns including work priorities, site access changes, and material deliveries.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Toolbox Talks</p>
                    <p className="text-white/70">Short sessions focused on safety topics such as working at height, manual handling, specific hazards, and PPE requirements.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Formal Site Meetings</p>
                    <p className="text-white/70">Cover wider project progress, coordination between trades, quality standards, and future planning.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="meeting-purpose-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 2 - Why Attendance Matters */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Why Attendance Matters
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Regular attendance at briefings and meetings is crucial for safety, efficiency, and professionalism:
              </p>

              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <p className="font-semibold text-green-400 mb-2">Critical Benefits of Attendance</p>
                <ul className="text-sm space-y-2">
                  <li><strong className="text-white">Safety awareness:</strong> <span className="text-white/70">Keeps you informed about site rules, hazards, exclusion zones, and emergency procedures</span></li>
                  <li><strong className="text-white">Task clarity:</strong> <span className="text-white/70">Ensures you understand your tasks, responsibilities, and coordination requirements</span></li>
                  <li><strong className="text-white">Team coordination:</strong> <span className="text-white/70">Promotes awareness of other trades' activities and overall project progress</span></li>
                  <li><strong className="text-white">Professionalism:</strong> <span className="text-white/70">Demonstrates commitment to safety and quality, building trust with supervisors</span></li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50">
                <p className="font-semibold text-red-400 mb-2">Remember</p>
                <p className="text-sm text-white/70">Missing meetings can lead to accidents, mistakes, and missed opportunities — attendance is not optional.</p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="attendance-importance-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Section 3 - Responsibilities When Attending */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Responsibilities When Attending
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Active and professional participation requires understanding your responsibilities:
              </p>

              <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
                <p className="font-semibold text-purple-400 mb-2">Professional Meeting Behaviour</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Arrive on time and prepared</p>
                    <p className="text-white/70">Check meeting times, bring notebook and pen, review previous day's actions, have questions ready.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Listen carefully and take notes</p>
                    <p className="text-white/70">Focus on safety information, record specific tasks and deadlines, note any changes to procedures.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Ask questions if instructions are unclear</p>
                    <p className="text-white/70">Seek clarification immediately, don't assume or guess, confirm understanding by repeating back.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Follow up on actions</p>
                    <p className="text-white/70">Understand deadlines, report progress and problems, coordinate with other trades as required.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="responsibilities-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Section 4 - Common Mistakes to Avoid */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Common Mistakes to Avoid
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Understanding common pitfalls helps ensure professional behaviour and effective communication:
              </p>

              <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50">
                <p className="font-semibold text-red-400 mb-2">Behaviours That Undermine Safety and Professionalism</p>
                <ul className="text-sm space-y-2 text-white/70">
                  <li>• <strong className="text-white">Not paying attention:</strong> Using phone, side conversations, assuming you know what will be said</li>
                  <li>• <strong className="text-white">Causing distractions:</strong> Interrupting speakers, loud conversations, making jokes during safety discussions</li>
                  <li>• <strong className="text-white">Failing to act:</strong> Not following through on tasks, ignoring new procedures, forgetting deadlines</li>
                </ul>
                <p className="mt-3 text-sm font-medium text-red-300">Warning: These behaviours can lead to accidents, disciplinary action, and damage to professional reputation.</p>
              </div>
            </div>
          </section>

          {/* Section 5 - Legal Requirements */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Legal Requirements and Compliance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Health and Safety Legal Framework</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Health and Safety at Work Act 1974</p>
                    <p className="text-white/70">Employers must provide information, instruction, training and supervision. Employees have a duty to take care of their own and others' safety. Toolbox talks fulfil legal requirements for ongoing safety training.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Construction (Design and Management) Regulations 2015</p>
                    <p className="text-white/70">Principal contractors must ensure worker competence and training. Workers must report unsafe conditions. Induction and ongoing briefings are legal requirements.</p>
                  </div>
                </div>
                <p className="mt-3 text-sm font-medium text-amber-300">Legal warning: Failure to attend mandatory safety briefings or follow instructions can result in prosecution under health and safety legislation.</p>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
              <p className="font-semibold text-amber-400 mb-2">Case Study: The Importance of Attending Briefings</p>
              <p className="text-white/80 text-sm mb-3">
                <strong>Situation:</strong> At a refurbishment site, a toolbox talk highlighted a new exclusion zone due to overhead work. An electrician who missed the briefing entered the area and risked serious injury.
              </p>
              <p className="text-white/80 text-sm mb-3">
                <strong>Consequence:</strong> The near-miss required incident reporting, work stoppage for investigation, and additional safety training for all trades.
              </p>
              <p className="text-white/80 text-sm">
                <strong>Lesson:</strong> Attendance would have prevented the near-miss. This incident shows how missing briefings can lead to serious safety risks and project delays.
              </p>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Clipboard className="w-5 h-5 text-elec-yellow" />
              Pocket Guide
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-2">Meeting Essentials</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• <strong className="text-white">Always attend</strong> — safety depends on it</li>
                  <li>• <strong className="text-white">Arrive on time</strong> and prepared with notebook</li>
                  <li>• <strong className="text-white">Listen carefully</strong> and take notes</li>
                  <li>• <strong className="text-white">Ask questions</strong> if anything is unclear</li>
                  <li>• <strong className="text-white">Follow up</strong> on all agreed actions</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-2">Professional Behaviour</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Respect others by avoiding distractions</li>
                  <li>• Participate actively and constructively</li>
                  <li>• Take toolbox talks seriously</li>
                  <li>• Demonstrate commitment to safety and quality</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Recap
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="font-semibold text-elec-yellow mb-2">Key Learning Points</p>
              <ul className="text-white/80 text-sm space-y-1">
                <li>• Briefings, toolbox talks, and site meetings are vital for communication and safety</li>
                <li>• Different meeting types serve specific purposes and all require attendance</li>
                <li>• Active participation demonstrates professionalism and prevents accidents</li>
                <li>• Your responsibilities include punctuality, attention, and follow-through</li>
                <li>• Avoiding common mistakes protects safety and your professional reputation</li>
              </ul>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Avoiding Installation Conflicts
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Back to Section 5
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section5_5;
