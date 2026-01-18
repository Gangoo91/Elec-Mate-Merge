import { ArrowLeft, ArrowRight, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Setting Realistic Timescales and Milestones - Module 5.3.2 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to set realistic timescales and milestones for electrical installations, ensuring quality work and avoiding delays.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What is a milestone in project planning?",
    options: ["A stone marker", "A key checkpoint showing project progress", "A deadline", "A problem"],
    correctIndex: 1,
    explanation: "A milestone is a key checkpoint that shows project progress and helps track completion of important phases."
  },
  {
    id: 2,
    question: "Why should timescales allow extra time for delays?",
    options: ["To waste time", "To account for unexpected delays", "To look professional", "To charge more"],
    correctIndex: 1,
    explanation: "Timescales should include buffer time to account for unexpected delays like weather, material shortages, or unforeseen issues."
  },
  {
    id: 3,
    question: "Give one risk of setting unrealistic deadlines.",
    options: ["Better quality work", "Mistakes and unsafe working practices", "Higher profits", "Faster completion"],
    correctIndex: 1,
    explanation: "Unrealistic deadlines lead to rushing, which causes mistakes, unsafe working practices, and often results in costly rework."
  }
];

const Module5Section3_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is a timescale in project planning?",
      options: ["The cost of materials", "The planned duration to complete tasks", "The number of workers", "The safety requirements"],
      correctAnswer: 1,
      explanation: "A timescale is the planned duration for completing specific tasks or the whole project."
    },
    {
      id: 2,
      question: "What is a milestone?",
      options: ["A budget review", "A key checkpoint showing project progress", "A tool inspection", "A safety meeting"],
      correctAnswer: 1,
      explanation: "A milestone is a key checkpoint in a project that shows progress towards completion."
    },
    {
      id: 3,
      question: "Give one example of a milestone in electrical installation.",
      options: ["Ordering materials", "Completion of containment", "Tool inspection", "Site handover"],
      correctAnswer: 1,
      explanation: "Examples of milestones include completion of containment, cable installation, final fix, or testing."
    },
    {
      id: 4,
      question: "Why should you allow extra time in timescales?",
      options: ["To account for unexpected delays", "To work slower", "To increase costs", "To confuse workers"],
      correctAnswer: 0,
      explanation: "Extra time accounts for potential delays like weather, late deliveries, or unforeseen site conditions."
    },
    {
      id: 5,
      question: "True or False: Unrealistic deadlines improve efficiency.",
      options: ["False", "True"],
      correctAnswer: 0,
      explanation: "False. Unrealistic deadlines lead to rushing, mistakes, and poor quality work."
    },
    {
      id: 6,
      question: "Name one risk of setting unrealistic timescales.",
      options: ["Better quality", "Mistakes and rework", "Lower costs", "Happy workers"],
      correctAnswer: 1,
      explanation: "Unrealistic timescales can lead to mistakes, unsafe work, stress, or costly rework."
    },
    {
      id: 7,
      question: "How often should timescales be reassessed?",
      options: ["Never", "Weekly or as needed", "Only at project end", "Once a year"],
      correctAnswer: 1,
      explanation: "Timescales should be reassessed weekly and adjusted when site conditions change."
    },
    {
      id: 8,
      question: "Who usually sets project timescales?",
      options: ["Individual electricians", "Site manager or supervisor", "The client only", "Material suppliers"],
      correctAnswer: 1,
      explanation: "Project timescales are usually set by the site manager or supervisor based on project requirements."
    },
    {
      id: 9,
      question: "What should you do if you know a milestone cannot be met?",
      options: ["Ignore it", "Inform the supervisor immediately", "Work overtime alone", "Wait until deadline"],
      correctAnswer: 1,
      explanation: "You should inform your supervisor immediately so adjustments can be made to the project plan."
    },
    {
      id: 10,
      question: "How do milestones help manage progress?",
      options: ["They reduce costs", "They provide checkpoints to track and measure progress", "They eliminate delays", "They guarantee success"],
      correctAnswer: 1,
      explanation: "Milestones provide clear checkpoints to track and measure progress throughout the project."
    }
  ];

  const faqs = [
    {
      question: "Who sets the timescales for a project?",
      answer: "Usually the site manager or supervisor, but electricians should understand and follow them. Good communication between all team members ensures realistic and achievable timescales."
    },
    {
      question: "What if I can't meet a milestone?",
      answer: "Inform your supervisor early so adjustments can be made. It's better to communicate delays in advance than to miss deadlines without warning."
    },
    {
      question: "Can milestones change once set?",
      answer: "Yes, milestones should be flexible to reflect real site conditions. Project plans must adapt to unforeseen circumstances while maintaining safety and quality standards."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
              Back to Section 5.3
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 5.3.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Setting Realistic Timescales and Milestones
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learn to set achievable timescales and milestones for electrical installations to ensure quality work without compromising safety.
            </p>
          </header>

          {/* In 30 Seconds */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              In 30 Seconds
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <ul className="text-white/80 space-y-2 list-disc pl-4">
                <li>Always allow extra time for unexpected delays.</li>
                <li>Set clear milestones to track project progress.</li>
                <li>Communicate timescale changes immediately.</li>
              </ul>
            </div>
          </section>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Timescales and milestones are essential in electrical installation projects. They provide structure, help manage resources, and ensure that work is completed on time without rushing or compromising quality. Unrealistic deadlines often lead to mistakes, poor workmanship, and safety risks. Setting achievable timescales ensures projects remain efficient and professional.
              </p>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-elec-yellow mb-2">Why This Matters</p>
                    <p className="text-white/70 text-sm">
                      Proper timescale planning in electrical projects reduces installation errors by up to 40% and prevents costly delays that can impact entire construction schedules.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                <strong className="text-white">Real Impact:</strong> Projects with realistic timescales and clear milestones show 25% fewer rework instances and improved team satisfaction compared to rushed installations.
              </p>
              <p className="text-sm p-3 rounded bg-white/5 border border-white/10">
                <strong className="text-white">Industry Standard:</strong> BS 7671 requires that electrical work be planned and executed with sufficient time to ensure safety standards and regulatory compliance.
              </p>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <div className="text-white/80 space-y-2 leading-relaxed">
              <p className="mb-3">By the end of this subsection, you will be able to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Explain the importance of timescales in electrical installations.</li>
                <li>Plan and set realistic deadlines for installation tasks.</li>
                <li>Identify key project milestones and their role in managing progress.</li>
                <li>Adjust timescales when unforeseen issues arise.</li>
                <li>Recognise the risks of unrealistic deadlines.</li>
              </ul>
            </div>
          </section>

          {/* What Are Timescales */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              What Are Timescales?
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>The planned duration for completing specific tasks or the whole project:</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-elec-yellow mb-3">Purpose of Timescales</p>
                <p className="mb-2"><strong className="text-white">Helps organise:</strong></p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Labour allocation and work schedules</li>
                  <li>Materials deliveries and equipment availability</li>
                  <li>Coordination with other trades and site activities</li>
                </ul>
                <div className="mt-4 p-3 rounded bg-green-500/10 border border-green-500/20">
                  <p className="font-medium text-green-400 mb-1">Key Benefit</p>
                  <p className="text-sm text-white/70">
                    Clear timescales provide structure and ensure all team members understand project expectations and deadlines.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What Are Milestones */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              What Are Milestones?
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Key checkpoints in a project that show progress:</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-green-400 mb-3">Milestone Examples</p>
                <p className="mb-2"><strong className="text-white">Common Milestones:</strong></p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong className="text-white">Completion of containment</strong> - All trunking, conduit, and cable trays installed</li>
                  <li><strong className="text-white">Cable installation</strong> - All cables run and routed correctly</li>
                  <li><strong className="text-white">Final fix</strong> - All accessories and equipment installed</li>
                  <li><strong className="text-white">Testing</strong> - Installation tested and verified safe</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="milestones-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Setting Realistic Timescales */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Setting Realistic Timescales
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Review installation drawings and specifications. Break tasks into smaller steps and estimate time needed. Allow extra time for potential delays:</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-amber-400 mb-3">Planning Process</p>
                <p className="mb-2"><strong className="text-white">Steps to set realistic timescales:</strong></p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Review installation drawings and specifications thoroughly</li>
                  <li>Break tasks into smaller, manageable steps</li>
                  <li>Estimate time needed for each task based on experience</li>
                  <li>Allow extra time for delays (weather, late deliveries)</li>
                </ul>
                <div className="mt-4 p-3 rounded bg-orange-500/10 border border-orange-500/20">
                  <p className="font-medium text-elec-yellow mb-1">Buffer Time Rule</p>
                  <p className="text-sm text-white/70">
                    Always add 10-20% extra time to account for unexpected delays like weather, material shortages, or site access issues.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="timescales-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Benefits and Risks */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Benefits of Realistic Timescales & Risks of Unrealistic Ones
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h3 className="font-medium text-green-400 mb-3">Benefits of Realistic Timescales</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm text-white/80">
                  <li>Ensures steady progress without rushing</li>
                  <li>Improves quality and reduces errors</li>
                  <li>Makes workload manageable</li>
                  <li>Helps coordinate with other trades</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-red-400 mb-3">Risks of Unrealistic Timescales</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm text-white/80">
                  <li>Increased mistakes and rework</li>
                  <li>Unsafe working practices from rushing</li>
                  <li>Low morale and stress for workers</li>
                  <li>Project delays if milestones are missed</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="risks-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Adjusting Timescales */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Adjusting Timescales
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>When issues arise, timescales may need adjustment:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-medium text-elec-yellow mb-2">When to Adjust</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Material shortage or late deliveries</li>
                    <li>Unforeseen site conditions discovered</li>
                    <li>Changes to project specifications</li>
                    <li>Weather delays affecting outdoor work</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-medium text-elec-yellow mb-2">How to Adjust</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Communicate changes with supervisors immediately</li>
                    <li>Adjust the programme with supervisor's approval</li>
                    <li>Reset milestones to reflect the revised plan</li>
                    <li>Inform all team members of the changes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Practical Guidance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li>Use project programmes (like Gantt charts or site schedules) to track progress.</li>
                <li>Always add a buffer (extra time) for unexpected problems.</li>
                <li>Mark milestones clearly on site boards so everyone knows progress points.</li>
                <li>Be realistic about manpower — don't assume tasks will be finished quicker than normal.</li>
                <li>Reassess timescales weekly and make adjustments if needed.</li>
              </ul>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-amber-300">
                On a commercial office installation, the supervisor set an unrealistic deadline for cable pulling, giving only two days instead of the required four. The team rushed the job, leading to damaged cables and rework. The rework caused a week's delay, which could have been avoided by setting a realistic timescale.
              </p>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                  <p className="font-medium text-white mb-2">Q: {faq.question}</p>
                  <p className="text-white/70 text-sm">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Pocket Guide
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <div className="space-y-2 text-elec-yellow">
                <p>• <strong>Timescales</strong> = planned duration for tasks.</p>
                <p>• <strong>Milestones</strong> = key checkpoints to track progress.</p>
                <p>• Always allow extra time for delays.</p>
                <p>• Unrealistic deadlines = mistakes and rework.</p>
                <p>• Communicate and adjust timescales when needed.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">12</span>
              Summary
            </h2>
            <div className="text-white/80 leading-relaxed">
              <p>
                In this subsection, you learned about setting realistic timescales and milestones. You now understand how they keep projects on track, improve quality, and prevent unnecessary stress. You also explored how poor timescale planning can lead to mistakes, unsafe work, and costly delays.
              </p>
            </div>
          </section>

          {/* Knowledge Check */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-elec-yellow" />
              <h2 className="text-xl font-semibold text-white">Knowledge Check</h2>
            </div>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-3">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section3_2;
