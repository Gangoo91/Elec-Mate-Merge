import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Setting Realistic Timescales and Milestones - Module 5.3.2 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to set realistic timescales and milestones for electrical installations, ensuring quality work and avoiding delays.";

// Inline check questions
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
              <Clock className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 5.3.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Setting Realistic Timescales and Milestones
          </h1>
          <p className="text-white">
            Learn to set achievable timescales and milestones for electrical installations to ensure quality work without compromising safety.
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
                <li>Always allow extra time for unexpected delays.</li>
                <li>Set clear milestones to track project progress.</li>
                <li>Communicate timescale changes immediately.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Unrealistic deadlines causing rushed work.</li>
                <li><strong>Use:</strong> Gantt charts, buffer time, weekly reviews.</li>
                <li><strong>Check:</strong> Milestones met before moving to next phase.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            Timescales and milestones are essential in electrical installation projects. They provide structure, help manage resources, and ensure that work is completed on time without rushing or compromising quality. Unrealistic deadlines often lead to mistakes, poor workmanship, and safety risks. Setting achievable timescales ensures projects remain efficient and professional.
          </p>
          
          <div className="rounded-lg p-4 bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mt-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-elec-yellow dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 dark:text-elec-yellow mb-2">Why This Matters</p>
                <p className="text-xs sm:text-sm text-white">
                  Proper timescale planning in electrical projects reduces installation errors by up to 40% and prevents costly delays that can impact entire construction schedules.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <p className="text-base text-white">
              <strong>Real Impact:</strong> Projects with realistic timescales and clear milestones show 25% fewer rework instances and improved team satisfaction compared to rushed installations.
            </p>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded border border-emerald-200 dark:border-emerald-800">
              <p className="text-xs sm:text-sm text-white">
                <strong>Industry Standard:</strong> BS 7671 requires that electrical work be planned and executed with sufficient time to ensure safety standards and regulatory compliance.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">By the end of this subsection, you will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Explain the importance of timescales in electrical installations.</li>
            <li>Plan and set realistic deadlines for installation tasks.</li>
            <li>Identify key project milestones and their role in managing progress.</li>
            <li>Adjust timescales when unforeseen issues arise.</li>
            <li>Recognise the risks of unrealistic deadlines.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* What Are Timescales */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. What Are Timescales?</h3>
            <p className="text-base text-white mb-4">
              The planned duration for completing specific tasks or the whole project:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-3">Purpose of Timescales</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Helps organise:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Labour allocation and work schedules</li>
                          <li>Materials deliveries and equipment availability</li>
                          <li>Coordination with other trades and site activities</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Key Benefit</p>
                        <p className="text-xs sm:text-sm text-white">
                          Clear timescales provide structure and ensure all team members understand project expectations and deadlines.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What Are Milestones */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. What Are Milestones?</h3>
            <p className="text-base text-white mb-4">
              Key checkpoints in a project that show progress:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Milestone Examples</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Common Milestones:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <ul className="list-disc ml-4 space-y-1 text-xs sm:text-sm text-white">
                            <li><strong>Completion of containment</strong> - All trunking, conduit, and cable trays installed</li>
                            <li><strong>Cable installation</strong> - All cables run and routed correctly</li>
                            <li><strong>Final fix</strong> - All accessories and equipment installed</li>
                            <li><strong>Testing</strong> - Installation tested and verified safe</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* Setting Realistic Timescales */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Setting Realistic Timescales</h3>
            <p className="text-base text-white mb-4">
              Review installation drawings and specifications. Break tasks into smaller steps and estimate time needed. Allow extra time for potential delays:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-3">Planning Process</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Steps to set realistic timescales:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Review installation drawings and specifications thoroughly</li>
                          <li>Break tasks into smaller, manageable steps</li>
                          <li>Estimate time needed for each task based on experience</li>
                          <li>Allow extra time for delays (weather, late deliveries)</li>
                        </ul>
                      </div>

                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-800">
                        <p className="font-medium text-orange-700 dark:text-elec-yellow mb-2">Buffer Time Rule</p>
                        <p className="text-xs sm:text-sm text-white">
                          Always add 10-20% extra time to account for unexpected delays like weather, material shortages, or site access issues.
                        </p>
                      </div>
                    </div>
                  </div>
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
          <Separator className="my-6" />

          {/* Benefits and Risks */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Benefits of Realistic Timescales & Risks of Unrealistic Ones</h3>
            
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-lg p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <h4 className="font-medium text-green-700 dark:text-green-400 mb-3">Benefits of Realistic Timescales</h4>
                <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                  <li>Ensures steady progress without rushing</li>
                  <li>Improves quality and reduces errors</li>
                  <li>Makes workload manageable</li>
                  <li>Helps coordinate with other trades</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <h4 className="font-medium text-red-700 dark:text-elec-yellow mb-3">Risks of Unrealistic Timescales</h4>
                <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
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
          <Separator className="my-6" />

          {/* Adjusting Timescales */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">5. Adjusting Timescales</h3>
            <p className="text-base text-white mb-4">
              When issues arise, timescales may need adjustment:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-700 dark:text-elec-yellow mb-2">When to Adjust</h4>
                <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                  <li>Material shortage or late deliveries</li>
                  <li>Unforeseen site conditions discovered</li>
                  <li>Changes to project specifications</li>
                  <li>Weather delays affecting outdoor work</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <h4 className="font-medium text-purple-700 dark:text-elec-yellow mb-2">How to Adjust</h4>
                <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                  <li>Communicate changes with supervisors immediately</li>
                  <li>Adjust the programme with supervisor's approval</li>
                  <li>Reset milestones to reflect the revised plan</li>
                  <li>Inform all team members of the changes</li>
                </ul>
              </div>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          <div className="space-y-4">
            <ul className="list-disc pl-6 space-y-2 text-base text-white">
              <li>Use project programmes (like Gantt charts or site schedules) to track progress.</li>
              <li>Always add a buffer (extra time) for unexpected problems.</li>
              <li>Mark milestones clearly on site boards so everyone knows progress points.</li>
              <li>Be realistic about manpower – don't assume tasks will be finished quicker than normal.</li>
              <li>Reassess timescales weekly and make adjustments if needed.</li>
            </ul>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-8 p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <h2 className="text-lg sm:text-xl font-semibold text-amber-800 dark:text-amber-200 mb-4">Real-World Example</h2>
          <p className="text-amber-700 dark:text-amber-300">
            On a commercial office installation, the supervisor set an unrealistic deadline for cable pulling, giving only two days instead of the required four. The team rushed the job, leading to damaged cables and rework. The rework caused a week's delay, which could have been avoided by setting a realistic timescale.
          </p>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-l-elec-yellow pl-4">
                <p className="font-medium text-white mb-2">Q: {faq.question}</p>
                <p className="text-white">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
          <h2 className="text-lg sm:text-xl font-semibold text-emerald-800 dark:text-emerald-200 mb-4">Pocket Guide</h2>
          <div className="space-y-2 text-emerald-700 dark:text-elec-yellow">
            <p>• <strong>Timescales</strong> = planned duration for tasks.</p>
            <p>• <strong>Milestones</strong> = key checkpoints to track progress.</p>
            <p>• Always allow extra time for delays.</p>
            <p>• Unrealistic deadlines = mistakes and rework.</p>
            <p>• Communicate and adjust timescales when needed.</p>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <p className="text-base text-white">
            In this subsection, you learned about setting realistic timescales and milestones. You now understand how they keep projects on track, improve quality, and prevent unnecessary stress. You also explored how poor timescale planning can lead to mistakes, unsafe work, and costly delays.
          </p>
        </Card>

        {/* Knowledge Check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Knowledge Check</h2>
          </div>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8">
          <Button variant="outline" asChild>
            <Link to="module5-section3/subsection1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Job Breakdown
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="..">
              <ArrowRight className="w-4 h-4 ml-2" />
              Back to Section 3
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section3_2;