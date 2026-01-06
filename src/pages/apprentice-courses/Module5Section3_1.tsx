import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

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
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Clipboard className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 5.3.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Job Breakdown and Task Sequencing
          </h1>
          <p className="text-white">
            Learn to divide large electrical projects into manageable tasks and sequence them for efficient, safe completion.
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Introduction</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Break large jobs into smaller, manageable tasks.</li>
                <li>Sequence logically: containment → cabling → terminations → testing.</li>
                <li>Coordinate with other trades to avoid clashes and rework.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Logical phases - groundwork first, accessories last.</li>
                <li><strong>Use:</strong> Gantt charts, task lists, daily standups.</li>
                <li><strong>Check:</strong> Dependencies met before starting next phase.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            Large electrical installation projects can feel overwhelming if approached all at once. Job breakdown and sequencing is the method of dividing tasks into smaller, logical steps and planning them in the most efficient order. This ensures work is completed safely, efficiently, and without unnecessary delays or clashes with other trades.
          </p>
          
          <div className="rounded-lg p-4 bg-elec-yellow/5 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mt-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-elec-yellow text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 text-elec-yellow mb-2">Why This Matters</p>
                <p className="text-xs sm:text-sm text-white">
                  In the electrical industry, poor planning and sequencing account for approximately 30% of project delays and cost overruns. 
                  Mastering these skills will make you a valuable team member and help ensure project success.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <p className="text-base text-white">
              <strong>Real Impact:</strong> A well-sequenced electrical installation on a typical commercial project can save 15-20% in labour costs 
              and reduce project completion time by 1-2 weeks compared to poorly planned work.
            </p>
            
            <div className="bg-elec-yellow/5 bg-elec-yellow/10 p-3 rounded border border-elec-yellow/30 border-elec-yellow/20">
              <p className="text-xs sm:text-sm text-white">
                <strong>Industry Standard:</strong> BS 7671 emphasises the importance of proper installation planning and sequencing 
                to ensure electrical safety and compliance throughout the construction process.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">By the end of this subsection, you will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Break down electrical installation work into manageable tasks.</li>
            <li>Understand the importance of logical sequencing in planning.</li>
            <li>Apply sequencing to real-world electrical jobs.</li>
            <li>Identify risks of poor planning and disorderly task execution.</li>
            <li>Work in alignment with project schedules and site requirements.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* What is Job Breakdown */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. What is Job Breakdown?</h3>
            <p className="text-base text-white mb-4">
              Job breakdown is the process of:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-3">Breaking Down Large Projects</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Splitting Large Jobs:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Dividing a large job (e.g., wiring a floor of offices) into smaller, specific tasks</li>
                          <li>Examples: setting out containment, running cables, installing accessories, testing</li>
                          <li>Each task becomes manageable and clearly defined</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Clear Responsibilities:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Makes responsibilities clear for each team member</li>
                          <li>Reduces errors and confusion on site</li>
                          <li>Enables better progress tracking and quality control</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Key Benefit</p>
                        <p className="text-xs sm:text-sm text-white">
                          Breaking down large jobs makes complex projects manageable and reduces the risk of overlooking important tasks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="job-breakdown-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Sequencing Work */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. Sequencing Work</h3>
            <p className="text-base text-white mb-4">
              Sequencing means completing tasks in a logical order to avoid rework or safety issues:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Logical Task Ordering</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Typical Electrical Sequence:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <ol className="list-decimal ml-4 space-y-1 text-xs sm:text-sm text-white">
                            <li><strong>Groundwork:</strong> First fix, cable routes, containment positioning</li>
                            <li><strong>Containment:</strong> Install trunking, conduit, cable trays</li>
                            <li><strong>Cabling:</strong> Run cables through containment systems</li>
                            <li><strong>Terminations:</strong> Connect cables to accessories and equipment</li>
                            <li><strong>Testing:</strong> Inspect and test the completed installation</li>
                          </ol>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Example of Poor Sequencing:</strong></p>
                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                          <p className="text-xs sm:text-sm text-white">
                            <strong>Wrong:</strong> Installing socket outlets before containment and cables are in place - 
                            you would not install accessories before containment and cables are ready.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="sequencing-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Steps in Task Sequencing */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Steps in Task Sequencing</h3>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-3">Systematic Planning Process</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-3"><strong>Essential Planning Steps:</strong></p>
                        <ol className="list-decimal ml-4 space-y-3 text-base text-white">
                          <li>
                            <strong>Review installation drawings and specifications</strong>
                            <p className="text-sm text-white mt-1">Study electrical layouts, cable schedules, and equipment specifications thoroughly</p>
                          </li>
                          <li>
                            <strong>List all required tasks</strong>
                            <p className="text-sm text-white mt-1">Break down into specific, measurable activities with clear deliverables</p>
                          </li>
                          <li>
                            <strong>Order them logically</strong>
                            <p className="text-sm text-white mt-1">Follow the sequence: groundwork → containment → cabling → terminations → testing</p>
                          </li>
                          <li>
                            <strong>Factor in dependencies</strong>
                            <p className="text-sm text-white mt-1">Consider other trades - wait for walls to be plastered before fixing accessories</p>
                          </li>
                          <li>
                            <strong>Estimate timeframes</strong>
                            <p className="text-sm text-white mt-1">Allocate realistic time for each task including potential delays</p>
                          </li>
                          <li>
                            <strong>Identify critical path</strong>
                            <p className="text-sm text-white mt-1">Determine which tasks, if delayed, would affect the overall project timeline</p>
                          </li>
                        </ol>
                      </div>

                      <div className="bg-[#121212]/50 p-4 rounded border">
                        <p className="font-medium text-white mb-2">Example Task Breakdown - Office Floor Installation:</p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium mb-2">Week 1 - Preparation:</p>
                            <ul className="list-disc ml-4 space-y-1 text-white">
                              <li>Set out cable routes</li>
                              <li>Mark containment positions</li>
                              <li>Coordinate with building services</li>
                              <li>Order materials and equipment</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium mb-2">Week 2 - First Fix:</p>
                            <ul className="list-disc ml-4 space-y-1 text-white">
                              <li>Install cable containment systems</li>
                              <li>Run main distribution cables</li>
                              <li>Install back boxes and mounting systems</li>
                              <li>First fix inspection</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-elec-yellow/5 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-blue-700 text-elec-yellow mb-2">Dependencies Example</p>
                        <p className="text-xs sm:text-sm text-white">
                          You cannot install socket outlets until: containment is secure, cables are pulled, 
                          plastering is complete, and wall surfaces are ready for fixing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Sequencing Matters */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Why Sequencing Matters</h3>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-3">Benefits of Proper Sequencing</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-3"><strong>Key Benefits:</strong></p>
                        <ul className="list-disc ml-4 space-y-2 text-base text-white">
                          <li><strong>Prevents rework and wasted labour</strong> - work is done right the first time</li>
                          <li><strong>Avoids clashes with other trades</strong> - coordinate with plasterers, carpenters, etc.</li>
                          <li><strong>Helps meet deadlines and milestones</strong> - keeps project on schedule</li>
                          <li><strong>Improves safety and organisation on site</strong> - reduces hazards and confusion</li>
                          <li><strong>Optimises resource allocation</strong> - tools and materials are available when needed</li>
                          <li><strong>Maintains quality standards</strong> - proper sequence prevents damage and ensures compliance</li>
                        </ul>
                      </div>

                      <div className="bg-[#121212]/50 p-4 rounded border">
                        <p className="font-medium text-white mb-2">Cost Impact Analysis:</p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium mb-2 text-green-600 dark:text-green-400">Proper Sequencing:</p>
                            <ul className="list-disc ml-4 space-y-1 text-white">
                              <li>5-10% faster completion</li>
                              <li>Reduced material waste</li>
                              <li>Lower labour costs</li>
                              <li>Fewer site accidents</li>
                              <li>Better client satisfaction</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium mb-2 text-red-600 text-elec-yellow">Poor Sequencing:</p>
                            <ul className="list-disc ml-4 space-y-1 text-white">
                              <li>20-30% increased costs</li>
                              <li>Extended project timelines</li>
                              <li>Higher accident rates</li>
                              <li>Client complaints</li>
                              <li>Reputation damage</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-800">
                        <p className="font-medium text-orange-700 text-elec-yellow mb-2">Industry Insight</p>
                        <p className="text-xs sm:text-sm text-white">
                          Studies show that electrical contractors who implement structured sequencing and planning 
                          complete projects 15% faster and with 25% fewer defects than those who don't.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Risks of Poor Breakdown/Sequencing */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">5. Risks of Poor Breakdown/Sequencing</h3>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">!</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-3">Consequences of Poor Planning</p>
                    
                    <ul className="list-disc ml-4 space-y-2 text-base text-white">
                      <li><strong>Wasted time and materials</strong> - rework costs money and delays completion</li>
                      <li><strong>Increased accidents or unsafe conditions</strong> - rushing or working around problems</li>
                      <li><strong>Delays caused by rework or obstruction of other trades</strong> - knock-on effects</li>
                      <li><strong>Non-compliance with project schedule</strong> - penalties and damage to reputation</li>
                    </ul>
                  </div>
                </div>
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
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Practical Guidance</h2>
          </div>
          
          <div className="space-y-4">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <h3 className="font-semibold text-elec-yellow text-elec-yellow mb-3">On-Site Best Practices</h3>
              <ul className="list-disc pl-6 space-y-2 text-base text-white">
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
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Real-World Example</h2>
          </div>
          
          <div className="rounded-lg p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <h3 className="font-semibold text-amber-700 dark:text-amber-400 mb-3">School Refurbishment Project</h3>
            <p className="text-base text-white mb-3">
              On a school refurbishment project, an electrical team installed socket outlets before plastering was finished. 
              The plasterers damaged several sockets while working, forcing the electricians to remove and reinstall them.
            </p>
            <p className="text-base text-white mb-3">
              <strong>Result:</strong> This led to wasted materials, extra costs, and project delays.
            </p>
            <p className="text-base text-white">
              <strong>Solution:</strong> If the work had been sequenced correctly, the accessories would have been installed 
              after plastering, saving time and money.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg p-4 bg-muted/30 border border-border/50">
                <h3 className="font-medium text-white mb-2">Q: {faq.question}</h3>
                <p className="text-sm text-white"><strong>A:</strong> {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Pocket Guide</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
                <h3 className="font-semibold text-elec-yellow text-elec-yellow mb-3">Quick Task Breakdown</h3>
                <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                  <li>Break down big jobs into smaller, manageable tasks</li>
                  <li>Sequence logically: containment → cabling → terminations → testing</li>
                  <li>Always check site conditions before starting</li>
                  <li>Work with other trades to avoid clashes</li>
                  <li>Review and adjust sequencing daily</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <h3 className="font-semibold text-elec-yellow text-elec-yellow mb-3">Planning Tools</h3>
                <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                  <li>Use Gantt charts for complex projects</li>
                  <li>Create task lists with dependencies</li>
                  <li>Hold daily coordination meetings</li>
                  <li>Monitor progress against planned sequence</li>
                  <li>Document changes and communicate them</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-base text-white">
            In this subsection, you learned how to break down jobs into smaller tasks, sequence them in a logical order, 
            and avoid risks of poor planning. You've seen how sequencing prevents delays, reduces rework, and ensures 
            safe, efficient installations. Remember: good planning and sequencing at the start saves time, money, and 
            frustration throughout the project.
          </p>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Knowledge Check</h2>
          <Quiz 
            questions={quizQuestions}
          />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to=".." className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../3-2" className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section3_1;