import { ArrowLeft, ArrowRight, Clipboard, Clock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";
import { useState } from "react";

const TITLE = "Job Breakdown and Task Sequencing - Module 5.3.1 | Level 2 Electrical Course";
const DESCRIPTION = "Break down installation work into logical tasks, sequence them efficiently, and coordinate on-site to avoid rework and delays.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is job breakdown?",
    options: ["Making jobs harder", "Splitting large jobs into smaller, manageable tasks", "Working alone", "Avoiding responsibility"],
    correctIndex: 1,
    explanation: "Job breakdown is the method of dividing large electrical installation projects into smaller, manageable tasks."
  },
  {
    id: 2,
    question: "Why should work be sequenced logically?",
    options: ["To look professional", "To prevent rework and avoid clashes with other trades", "To work faster", "To use fewer materials"],
    correctIndex: 1,
    explanation: "Logical sequencing prevents rework, avoids clashes with other trades, and ensures safe, efficient installations."
  },
  {
    id: 3,
    question: "Give one risk of poor sequencing.",
    options: ["Better teamwork", "Wasted time and materials", "Faster completion", "Lower costs"],
    correctIndex: 1,
    explanation: "Poor sequencing leads to wasted time and materials, increased accidents, delays from rework, and non-compliance with schedules."
  }
];

const Module5Section3_1 = () => {
  useSEO(TITLE, DESCRIPTION);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the purpose of job breakdown?",
      options: ["To make work harder", "To divide large jobs into smaller, manageable tasks", "To work alone", "To avoid planning"],
      correctAnswer: 1,
      explanation: "Job breakdown divides large electrical installation projects into smaller, manageable tasks to ensure work is completed safely and efficiently."
    },
    {
      id: 2,
      question: "What is meant by sequencing in electrical installation?",
      options: ["Working randomly", "Arranging tasks in the correct, logical order", "Working quickly", "Using expensive tools"],
      correctAnswer: 1,
      explanation: "Sequencing means arranging tasks in the correct, logical order to avoid rework and safety issues."
    },
    {
      id: 3,
      question: "Which comes first: installing accessories or containment?",
      options: ["Accessories", "Containment", "Both at the same time", "It doesn't matter"],
      correctAnswer: 1,
      explanation: "Containment must be installed first, then cables, then accessories. This logical sequence prevents rework and damage."
    },
    {
      id: 4,
      question: "Name one tool that can be used for sequencing tasks.",
      options: ["Screwdriver", "Gantt chart", "Cable stripper", "Voltmeter"],
      correctAnswer: 1,
      explanation: "Gantt charts and task lists are useful tools for tracking work stages and sequencing tasks."
    },
    {
      id: 5,
      question: "True or False: Poor sequencing can cause rework and wasted time.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "True. Poor sequencing leads to wasted time, materials, increased accidents, and project delays."
    },
    {
      id: 6,
      question: "Who usually sets the task sequence on site?",
      options: ["Apprentice", "Site supervisor or project manager", "Customer", "Delivery driver"],
      correctAnswer: 1,
      explanation: "The site supervisor or project manager usually decides the sequence, but electricians must understand and follow it."
    },
    {
      id: 7,
      question: "Give one example of poor sequencing.",
      options: ["Installing containment first", "Installing sockets before plastering is complete", "Testing after terminations", "Planning the work"],
      correctAnswer: 1,
      explanation: "Installing sockets before plastering is complete is poor sequencing that can lead to damage and rework."
    },
    {
      id: 8,
      question: "Why is coordination with other trades important in sequencing?",
      options: ["To make friends", "To avoid clashes and rework", "To work slower", "To use more materials"],
      correctAnswer: 1,
      explanation: "Coordination with other trades prevents clashes, reduces rework, and ensures smooth project progression."
    },
    {
      id: 9,
      question: "What should you do if unforeseen issues affect the sequence?",
      options: ["Continue as planned", "Adjust with supervisor's approval and communicate changes", "Stop work", "Work around the problem alone"],
      correctAnswer: 1,
      explanation: "Adjust the sequence with supervisor's approval and communicate changes to the team to maintain safety and efficiency."
    },
    {
      id: 10,
      question: "Which stage usually comes just before testing?",
      options: ["Containment", "Cabling", "Terminations", "Planning"],
      correctAnswer: 2,
      explanation: "Terminations come just before testing in the typical sequence: containment → cabling → terminations → testing."
    }
  ];

  const faqs = [
    {
      question: "Can tasks overlap?",
      answer: "Yes, but only if they don't interfere with each other or cause safety risks. For example, you might run cables in one area while another team installs containment in a different area."
    },
    {
      question: "Who decides the sequence of tasks?",
      answer: "Usually the site supervisor or project manager decides the overall sequence, but electricians must understand and follow it. Input from experienced tradespeople is often considered."
    },
    {
      question: "How do I handle last-minute changes?",
      answer: "Adjust the sequence with your supervisor's approval and communicate with your team immediately. Document any changes and their reasons for future reference."
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
              <span className="text-white/60">Section 5.3.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Job Breakdown and Task Sequencing
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learn to divide large electrical projects into manageable tasks and sequence them for efficient, safe completion.
            </p>
          </header>

          {/* In 30 Seconds */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              In 30 Seconds
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Key Points</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li>Break large jobs into smaller, manageable tasks</li>
                  <li>Sequence logically: containment → cabling → terminations → testing</li>
                  <li>Coordinate with other trades to avoid clashes and rework</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li><strong>Spot:</strong> Logical phases - groundwork first, accessories last</li>
                  <li><strong>Use:</strong> Gantt charts, task lists, daily standups</li>
                  <li><strong>Check:</strong> Dependencies met before starting next phase</li>
                </ul>
              </div>
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
                Large electrical installation projects can feel overwhelming if approached all at once. Job breakdown and sequencing is the method of dividing tasks into smaller, logical steps and planning them in the most efficient order. This ensures work is completed safely, efficiently, and without unnecessary delays or clashes with other trades.
              </p>

              <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-400/50">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-blue-400 mb-1">Why This Matters</p>
                    <p className="text-sm text-white/70">
                      In the electrical industry, poor planning and sequencing account for approximately 30% of project delays and cost overruns. Mastering these skills will make you a valuable team member and help ensure project success.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                <strong className="text-white">Real Impact:</strong> A well-sequenced electrical installation on a typical commercial project can save 15-20% in labour costs and reduce project completion time by 1-2 weeks compared to poorly planned work.
              </p>

              <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                <p className="text-sm text-white/70">
                  <strong className="text-elec-yellow">Industry Standard:</strong> BS 7671 emphasises the importance of proper installation planning and sequencing to ensure electrical safety and compliance throughout the construction process.
                </p>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <p className="text-white/80 mb-3">By the end of this subsection, you will be able to:</p>
            <ul className="text-white/80 space-y-2 list-disc pl-6">
              <li>Break down electrical installation work into manageable tasks</li>
              <li>Understand the importance of logical sequencing in planning</li>
              <li>Apply sequencing to real-world electrical jobs</li>
              <li>Identify risks of poor planning and disorderly task execution</li>
              <li>Work in alignment with project schedules and site requirements</li>
            </ul>
          </section>

          {/* What is Job Breakdown */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              What is Job Breakdown?
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Job breakdown is the process of:</p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-3">Breaking Down Large Projects</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-white font-medium mb-2">Splitting Large Jobs:</p>
                    <ul className="text-sm text-white/70 list-disc pl-4 space-y-1">
                      <li>Dividing a large job (e.g., wiring a floor of offices) into smaller, specific tasks</li>
                      <li>Examples: setting out containment, running cables, installing accessories, testing</li>
                      <li>Each task becomes manageable and clearly defined</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Clear Responsibilities:</p>
                    <ul className="text-sm text-white/70 list-disc pl-4 space-y-1">
                      <li>Makes responsibilities clear for each team member</li>
                      <li>Reduces errors and confusion on site</li>
                      <li>Enables better progress tracking and quality control</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-medium text-green-400 mb-1">Key Benefit</p>
                <p className="text-sm text-white/70">
                  Breaking down large jobs makes complex projects manageable and reduces the risk of overlooking important tasks.
                </p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="job-breakdown-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>

          {/* Sequencing Work */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Sequencing Work
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Sequencing means completing tasks in a logical order to avoid rework or safety issues:</p>

              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-400/50">
                <p className="font-medium text-green-400 mb-3">Logical Task Ordering</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-white font-medium mb-2">Typical Electrical Sequence:</p>
                    <ol className="text-sm text-white/70 list-decimal pl-4 space-y-1">
                      <li><strong>Groundwork:</strong> First fix, cable routes, containment positioning</li>
                      <li><strong>Containment:</strong> Install trunking, conduit, cable trays</li>
                      <li><strong>Cabling:</strong> Run cables through containment systems</li>
                      <li><strong>Terminations:</strong> Connect cables to accessories and equipment</li>
                      <li><strong>Testing:</strong> Inspect and test the completed installation</li>
                    </ol>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                    <p className="font-medium text-red-400 mb-1">Example of Poor Sequencing</p>
                    <p className="text-sm text-white/70">
                      <strong>Wrong:</strong> Installing socket outlets before containment and cables are in place — you would not install accessories before containment and cables are ready.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="sequencing-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>

          {/* Steps in Task Sequencing */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Steps in Task Sequencing
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-400/50">
                <p className="font-medium text-purple-400 mb-3">Systematic Planning Process</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-white font-medium mb-2">Essential Planning Steps:</p>
                    <ol className="text-sm text-white/70 list-decimal pl-4 space-y-2">
                      <li>
                        <strong>Review installation drawings and specifications</strong>
                        <p className="mt-1">Study electrical layouts, cable schedules, and equipment specifications thoroughly</p>
                      </li>
                      <li>
                        <strong>List all required tasks</strong>
                        <p className="mt-1">Break down into specific, measurable activities with clear deliverables</p>
                      </li>
                      <li>
                        <strong>Order them logically</strong>
                        <p className="mt-1">Follow the sequence: groundwork → containment → cabling → terminations → testing</p>
                      </li>
                      <li>
                        <strong>Factor in dependencies</strong>
                        <p className="mt-1">Consider other trades — wait for walls to be plastered before fixing accessories</p>
                      </li>
                      <li>
                        <strong>Estimate timeframes</strong>
                        <p className="mt-1">Allocate realistic time for each task including potential delays</p>
                      </li>
                      <li>
                        <strong>Identify critical path</strong>
                        <p className="mt-1">Determine which tasks, if delayed, would affect the overall project timeline</p>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Example Task Breakdown — Office Floor Installation:</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-white mb-2">Week 1 — Preparation:</p>
                    <ul className="list-disc pl-4 space-y-1 text-white/70">
                      <li>Set out cable routes</li>
                      <li>Mark containment positions</li>
                      <li>Coordinate with building services</li>
                      <li>Order materials and equipment</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Week 2 — First Fix:</p>
                    <ul className="list-disc pl-4 space-y-1 text-white/70">
                      <li>Install cable containment systems</li>
                      <li>Run main distribution cables</li>
                      <li>Install back boxes and mounting systems</li>
                      <li>First fix inspection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Sequencing Matters */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Why Sequencing Matters
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-400/50">
                <p className="font-medium text-orange-400 mb-3">Benefits of Proper Sequencing</p>
                <ul className="text-sm text-white/70 list-disc pl-4 space-y-2">
                  <li><strong>Prevents rework and wasted labour</strong> — work is done right the first time</li>
                  <li><strong>Avoids clashes with other trades</strong> — coordinate with plasterers, carpenters, etc.</li>
                  <li><strong>Helps meet deadlines and milestones</strong> — keeps project on schedule</li>
                  <li><strong>Improves safety and organisation on site</strong> — reduces hazards and confusion</li>
                  <li><strong>Optimises resource allocation</strong> — tools and materials are available when needed</li>
                  <li><strong>Maintains quality standards</strong> — proper sequence prevents damage and ensures compliance</li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <p className="font-medium text-green-400 mb-2">Proper Sequencing:</p>
                  <ul className="list-disc pl-4 space-y-1 text-white/70">
                    <li>5-10% faster completion</li>
                    <li>Reduced material waste</li>
                    <li>Lower labour costs</li>
                    <li>Fewer site accidents</li>
                    <li>Better client satisfaction</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="font-medium text-red-400 mb-2">Poor Sequencing:</p>
                  <ul className="list-disc pl-4 space-y-1 text-white/70">
                    <li>20-30% increased costs</li>
                    <li>Extended project timelines</li>
                    <li>Higher accident rates</li>
                    <li>Client complaints</li>
                    <li>Reputation damage</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Risks of Poor Breakdown/Sequencing */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Risks of Poor Breakdown/Sequencing
            </h2>
            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-400/50">
              <p className="font-medium text-red-400 mb-3">Consequences of Poor Planning</p>
              <ul className="text-sm text-white/70 list-disc pl-4 space-y-2">
                <li><strong>Wasted time and materials</strong> — rework costs money and delays completion</li>
                <li><strong>Increased accidents or unsafe conditions</strong> — rushing or working around problems</li>
                <li><strong>Delays caused by rework or obstruction of other trades</strong> — knock-on effects</li>
                <li><strong>Non-compliance with project schedule</strong> — penalties and damage to reputation</li>
              </ul>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="risks-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Practical Guidance
            </h2>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="font-medium text-elec-yellow mb-3">On-Site Best Practices</p>
              <ul className="text-sm text-white/70 list-disc pl-4 space-y-2">
                <li><strong>Use planning tools:</strong> Task lists or Gantt charts to track work stages and dependencies</li>
                <li><strong>Coordinate daily:</strong> Don't run cables if ductwork or plastering is due in that area</li>
                <li><strong>Safety first sequencing:</strong> Ensure containment is secure before pulling cables</li>
                <li><strong>Clear communication:</strong> Brief team members about their specific tasks and timing</li>
                <li><strong>Daily progress reviews:</strong> Check progress and adjust sequence if unexpected issues arise</li>
                <li><strong>Trade coordination:</strong> Regular liaison with other trades to avoid conflicts</li>
                <li><strong>Material staging:</strong> Ensure materials arrive when needed, not too early or late</li>
                <li><strong>Quality checkpoints:</strong> Build in inspection points at key sequence stages</li>
              </ul>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-400/50">
              <p className="font-medium text-amber-400 mb-3">School Refurbishment Project</p>
              <p className="text-white/80 text-sm mb-3">
                On a school refurbishment project, an electrical team installed socket outlets before plastering was finished. The plasterers damaged several sockets while working, forcing the electricians to remove and reinstall them.
              </p>
              <p className="text-white/80 text-sm mb-3">
                <strong className="text-white">Result:</strong> This led to wasted materials, extra costs, and project delays.
              </p>
              <p className="text-white/80 text-sm">
                <strong className="text-white">Solution:</strong> If the work had been sequenced correctly, the accessories would have been installed after plastering, saving time and money.
              </p>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation active:scale-[0.99]"
                  >
                    <span className="font-medium text-white text-sm">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4">
                      <p className="text-white/70 text-sm">{faq.answer}</p>
                    </div>
                  )}
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
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/30">
                <p className="font-medium text-elec-yellow mb-3">Quick Task Breakdown</p>
                <ul className="text-sm text-white/70 list-disc pl-4 space-y-1">
                  <li>Break down big jobs into smaller, manageable tasks</li>
                  <li>Sequence logically: containment → cabling → terminations → testing</li>
                  <li>Always check site conditions before starting</li>
                  <li>Work with other trades to avoid clashes</li>
                  <li>Review and adjust sequencing daily</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-elec-yellow mb-3">Planning Tools</p>
                <ul className="text-sm text-white/70 list-disc pl-4 space-y-1">
                  <li>Use Gantt charts for complex projects</li>
                  <li>Create task lists with dependencies</li>
                  <li>Hold daily coordination meetings</li>
                  <li>Monitor progress against planned sequence</li>
                  <li>Document changes and communicate them</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Recap */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <h3 className="font-semibold text-white mb-2">Recap</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              In this subsection, you learned how to break down jobs into smaller tasks, sequence them in a logical order, and avoid risks of poor planning. You've seen how sequencing prevents delays, reduces rework, and ensures safe, efficient installations. Remember: good planning and sequencing at the start saves time, money, and frustration throughout the project.
            </p>
          </div>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">12</span>
              Knowledge Check
            </h2>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Section 5.3
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-2">
                Next: Setting Timescales
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section3_1;
