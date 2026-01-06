import { ArrowLeft, ArrowRight, Clock, CheckCircle, AlertTriangle, Target, Settings, BookOpen, Timer, Lightbulb, Square, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module3Section6 = () => {
  useSEO(
    "Managing Time During Installation | AM2 Module 3 Section 6",
    "Time management strategies, pacing techniques and scheduling for AM2 assessment success"
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "incomplete-vs-unsafe",
      question: "What's worse in AM2 — leaving a section incomplete but safe, or rushing and leaving unsafe work?",
      options: [
        "Incomplete work is worse",
        "Unsafe work is worse - unsafe = fail",
        "Both are equally bad",
        "Neither affects the assessment"
      ],
      correctIndex: 1,
      explanation: "Incomplete but safe work is better than unsafe work. Unsafe work results in automatic failure, while incomplete work loses marks but may still allow a pass."
    },
    {
      id: "time-pressure-response",
      question: "What does the assessor do if you run out of time and leave circuits half-finished?",
      options: [
        "Give extra time to complete",
        "Mark only what's complete - incomplete = lost marks",
        "Automatically fail the candidate",
        "Allow completion the next day"
      ],
      correctIndex: 1,
      explanation: "Assessors mark only what's complete. Unfinished work automatically loses marks, often resulting in failure to meet pass requirements."
    },
    {
      id: "extra-time-request",
      question: "Can you ask for extra time if you're running behind schedule?",
      options: [
        "Yes, if you explain the reason",
        "Yes, but only 30 minutes maximum",
        "No - the schedule is fixed",
        "Only for technical difficulties"
      ],
      correctIndex: 2,
      explanation: "No extra time is available. The AM2 schedule is fixed and candidates must complete all work within the allocated timeframe."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Roughly how long is allocated for the composite installation in AM2?",
      options: ["6 hours", "8.5 hours", "10 hours", "12 hours"],
      correctAnswer: 1,
      explanation: "The AM2 composite installation is allocated around 8.5 hours, requiring careful time management to complete all requirements."
    },
    {
      id: 2,
      question: "Which is better if time is running out — incomplete or unsafe work?",
      options: ["Incomplete work", "Unsafe work", "Both are equally bad", "Neither matters"],
      correctAnswer: 0,
      explanation: "Incomplete but safe work is always better than unsafe work. Unsafe work results in automatic failure."
    },
    {
      id: 3,
      question: "What's the danger of spending too long on one bend?",
      options: ["Nothing - perfection matters", "Running out of time for critical terminations", "Using too much material", "Assessor gets impatient"],
      correctAnswer: 1,
      explanation: "Spending excessive time on details like conduit bends can leave insufficient time for critical tasks like terminations."
    },
    {
      id: 4,
      question: "What happens if circuits are left incomplete at the end?",
      options: ["Automatic failure", "Marks lost for incomplete work", "Given extra time", "Marked as if complete"],
      correctAnswer: 1,
      explanation: "Incomplete circuits lose marks automatically. Only completed work can be assessed and credited."
    },
    {
      id: 5,
      question: "Name one way to set milestones for installation:",
      options: ["Work randomly", "Set time targets for each stage", "Focus on speed only", "Wait until the end"],
      correctAnswer: 1,
      explanation: "Setting time targets for each stage (containment by 11:00, cables by lunch, etc.) helps maintain progress."
    },
    {
      id: 6,
      question: "Why should test results be recorded as you go?",
      options: ["Legal requirement", "Prevents rushed paperwork at the end", "Assessor prefers it", "Saves materials"],
      correctAnswer: 1,
      explanation: "Recording results as you progress prevents rushed, incomplete paperwork that can fail the documentation section."
    },
    {
      id: 7,
      question: "What do assessors expect if you're running behind schedule?",
      options: ["Rush to catch up", "Continue working methodically and safely", "Ask for help", "Skip safety checks"],
      correctAnswer: 1,
      explanation: "Assessors expect continued methodical, safe work. Rushing leads to mistakes and unsafe conditions."
    },
    {
      id: 8,
      question: "True or false: You can ask for extra time in AM2.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False - the AM2 schedule is fixed with no provision for extra time regardless of circumstances."
    },
    {
      id: 9,
      question: "Give one example of a time-related mistake candidates make:",
      options: ["Working too slowly", "Perfecting one detail while neglecting others", "Finishing too early", "Taking breaks"],
      correctAnswer: 1,
      explanation: "Spending excessive time perfecting one detail (like a perfect bend) while leaving insufficient time for other critical tasks."
    },
    {
      id: 10,
      question: "What's the golden rule of time management in AM2?",
      options: ["Speed over quality", "Plan, pace, and deliver methodically", "Rush everything", "Focus on one circuit"],
      correctAnswer: 1,
      explanation: "Plan your approach, pace yourself appropriately, and deliver professional standards across all work methodically."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-card/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 3
              </Link>
            </Button>
            <Button variant="ghost" className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
              <Link to="..">
                Module 4
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        {/* Title Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-elec-yellow/10 text-elec-yellow text-sm font-medium rounded-full mb-4">
            <Clock className="w-4 h-4" />
            Module 3 – Section 6
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Managing Time During Installation
          </h1>
          <p className="text-base text-white mb-8 leading-relaxed">
            Time management strategies, pacing techniques and scheduling for AM2 assessment success - complete professional installations within strict timeframes.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-8">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  CRITICAL: Time Management Determines AM2 Success
                </h3>
                <p className="text-sm text-red-700 dark:text-elec-yellow mb-3">
                  The AM2 composite installation is long (around 8.5 hours) and intense. Time management is critical: you need to pace yourself so you finish all circuits to specification, without rushing and making safety or neatness errors. Many candidates fail not from lack of skill but from incomplete work.
                </p>
                <p className="text-sm text-red-700 dark:text-elec-yellow font-medium">
                  Assessors observe whether you can plan, organise, and complete a job on time, just as you'd be expected to do on-site. Rushing causes failures.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Learning Outcomes
            </h2>
            <p className="text-sm text-white mb-4">
              By the end of this section, you should be able to:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Break down the installation into clear stages with realistic time targets
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Prioritise accuracy and safety under time pressure without compromising standards
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Avoid rushing and cutting corners that cause marks to be lost or failures
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Apply practical strategies to stay on schedule during AM2 assessment
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Recognise what assessors expect regarding time management and pacing
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Develop professional time management skills for real-world electrical work
              </li>
            </ul>
          </div>
        </Card>

        {/* Why Time Management Matters */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Timer className="w-5 h-5" />
              1. Why Time Management Matters in AM2
            </h2>
            
            <div className="space-y-4">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Critical Impact on Assessment Outcome</h4>
                <ul className="space-y-2 text-sm text-white">
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">•</span>
                    <div>
                      <strong>Installation section heavily weighted in marking</strong>
                      <p className="text-xs mt-1">The practical installation carries the highest mark allocation - incomplete work severely impacts overall score</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">•</span>
                    <div>
                      <strong>Many candidates fail from incomplete work, not lack of skill</strong>
                      <p className="text-xs mt-1">Technical competence is often present, but poor time management prevents completion</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">•</span>
                    <div>
                      <strong>Rushing causes multiple failure points</strong>
                      <p className="text-xs mt-1">Untidy workmanship, missed terminations, unsafe energisation - all lose marks or cause failure</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">Real-World Professional Expectations</h4>
                <ul className="space-y-1 text-sm text-orange-700 dark:text-elec-yellow">
                  <li>• <strong>Job completion within deadlines</strong> - Essential professional skill</li>
                  <li>• <strong>Quality maintained under pressure</strong> - Client expectations don't change</li>
                  <li>• <strong>Safety never compromised for speed</strong> - Legal and ethical requirements</li>
                  <li>• <strong>Systematic approach to complex tasks</strong> - Professional competence demonstration</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Typical Time Allocation */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              2. Typical Time Allocation Guidance
            </h2>
            
            <div className="space-y-4">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Recommended Phase Breakdown (8.5 hour total)</h4>
                <div className="space-y-3">
                  <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 rounded p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium text-white">Phase 1: Marking Out & Containment</h5>
                      <span className="text-sm font-medium text-elec-yellow dark:text-elec-yellow">~2 hours</span>
                    </div>
                    <ul className="space-y-1 text-xs text-white">
                      <li>• Reading specifications and drawings thoroughly</li>
                      <li>• Marking out all accessory positions accurately</li>
                      <li>• Installing trunking, conduit, and containment systems</li>
                      <li>• Ensuring all measurements match specification exactly</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950/20 rounded p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium text-white">Phase 2: Cable Pulling & Dressing</h5>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">~2 hours</span>
                    </div>
                    <ul className="space-y-1 text-xs text-white">
                      <li>• Running all cables through containment systems</li>
                      <li>• Proper cable identification and labelling</li>
                      <li>• Cable dressing and support installation</li>
                      <li>• Initial cable preparation at termination points</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium text-white">Phase 3: Terminations & Connections</h5>
                      <span className="text-sm font-medium text-elec-yellow dark:text-elec-yellow">~2.5 hours</span>
                    </div>
                    <ul className="space-y-1 text-xs text-white">
                      <li>• All accessory terminations and connections</li>
                      <li>• Distribution board wiring and labelling</li>
                      <li>• CPC sleeving and conductor identification</li>
                      <li>• Final connection verification and checking</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-950/20 rounded p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium text-white">Phase 4: Testing & Documentation</h5>
                      <span className="text-sm font-medium text-purple-600 dark:text-elec-yellow">~2 hours</span>
                    </div>
                    <ul className="space-y-1 text-xs text-white">
                      <li>• Complete electrical testing sequence</li>
                      <li>• Recording all test results accurately</li>
                      <li>• Final safety checks and verification</li>
                      <li>• Paperwork completion for handover</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-transparent border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Important Time Management Notes</h4>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Times vary between candidates - use as guidance only</li>
                  <li>• Must pace yourself to cover all essential tasks</li>
                  <li>• Allow buffer time for unexpected complications</li>
                  <li>• Quality standards must be maintained regardless of time pressure</li>
                  <li>• Regular progress checks against planned milestones essential</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Common Time-Related Mistakes */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              3. Common Time-Related Mistakes
            </h2>
            
            <div className="space-y-4">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Critical Time Management Errors</h4>
                <ol className="space-y-2 text-sm text-white">
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[30px]">1.</span>
                    <div>
                      <strong>Perfectionism on containment details</strong>
                      <p className="text-xs mt-1">Spending too long making perfect bends in conduit/trunking, then running out of time for critical terminations</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[30px]">2.</span>
                    <div>
                      <strong>End-phase rushing syndrome</strong>
                      <p className="text-xs mt-1">Rushing final stages leads to untidy DB wiring, missed CPC sleeving, exposed copper - causing failures</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[30px]">3.</span>
                    <div>
                      <strong>Delayed documentation approach</strong>
                      <p className="text-xs mt-1">Not recording test results during installation, leading to rushed and incomplete paperwork</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[30px]">4.</span>
                    <div>
                      <strong>Single-problem fixation</strong>
                      <p className="text-xs mt-1">Over-focusing on one tricky bend or fault instead of moving on and maintaining overall progress</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[30px]">5.</span>
                    <div>
                      <strong>No milestone monitoring</strong>
                      <p className="text-xs mt-1">Working without time checkpoints, only realising time pressure when it's too late to recover</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Real Assessment Consequences</h4>
                <ul className="space-y-2 text-sm text-red-700 dark:text-elec-yellow">
                  <li><strong>Incomplete circuits:</strong> Automatic mark loss for unfinished work, often below pass threshold</li>
                  <li><strong>Rushed terminations:</strong> Safety failures from exposed copper or loose connections</li>
                  <li><strong>Poor documentation:</strong> Incomplete test sheets fail the paperwork section entirely</li>
                  <li><strong>Stress-induced errors:</strong> Time pressure causes basic mistakes in normally competent areas</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Assessor Expectations */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              4. Assessor Expectations on Time Management
            </h2>
            
            <div className="space-y-4">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Professional Working Standards Expected</h4>
                <ul className="space-y-2 text-sm text-white">
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">•</span>
                    <div>
                      <strong>Steady, methodical work pace</strong>
                      <p className="text-xs mt-1">Assessors expect consistent professional pace, not rushed panic or excessive slowness</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">•</span>
                    <div>
                      <strong>Understanding of nervous impact</strong>
                      <p className="text-xs mt-1">Assessors know nerves slow candidates down, but major incomplete sections still lose marks</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">•</span>
                    <div>
                      <strong>Completion within timeframe</strong>
                      <p className="text-xs mt-1">Time runs out = assessment stops. Only completed work can be marked and credited</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">•</span>
                    <div>
                      <strong>Safety priority maintained</strong>
                      <p className="text-xs mt-1">No compromise on safety standards acceptable, regardless of time pressure</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Assessment Reality Check</h4>
                <div className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <p><strong>Fixed Schedule:</strong> No extensions available regardless of circumstances or reasons</p>
                  <p><strong>Completion Requirement:</strong> Unfinished work cannot be assessed or credited towards pass mark</p>
                  <p><strong>Quality Expectations:</strong> Professional standards must be maintained despite time constraints</p>
                  <p><strong>Real-World Simulation:</strong> Mirrors actual job site expectations for deadline management</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Practical Strategies */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              5. Practical Strategies for Time Management
            </h2>
            
            <div className="space-y-4">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Pre-Installation Planning Phase</h4>
                <ol className="space-y-2 text-sm text-white">
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">1.</span>
                    <div>
                      <strong>Detailed specification review (15-20 minutes)</strong>
                      <p className="text-xs mt-1">Read specifications thoroughly, mark key requirements, identify potential challenges before starting</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">2.</span>
                    <div>
                      <strong>Position marking and layout planning</strong>
                      <p className="text-xs mt-1">Mark all accessory positions accurately, plan cable routes, visualise installation sequence</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">3.</span>
                    <div>
                      <strong>Work sequence optimisation</strong>
                      <p className="text-xs mt-1">Plan logical progression through phases, identify dependencies, prepare for efficient workflow</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">During Installation Strategies</h4>
                <ol className="space-y-2 text-sm text-white" start={4}>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">4.</span>
                    <div>
                      <strong>Milestone-based progress monitoring</strong>
                      <p className="text-xs mt-1">Set specific time targets (containment complete by 11:00, cables pulled by lunch, terminations by 3:00)</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">5.</span>
                    <div>
                      <strong>Professional standard focus</strong>
                      <p className="text-xs mt-1">Work to consistent professional standard across all areas rather than seeking perfection in one area</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">6.</span>
                    <div>
                      <strong>Continuous documentation approach</strong>
                      <p className="text-xs mt-1">Record test results and complete labels circuit by circuit, not all at the end</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">7.</span>
                    <div>
                      <strong>Quality verification checkpoints</strong>
                      <p className="text-xs mt-1">30-second recheck saves 30-minute rework - verify before moving to next phase</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">8.</span>
                    <div>
                      <strong>Stress management techniques</strong>
                      <p className="text-xs mt-1">Stay calm under pressure - nervous candidates rush and make mistakes, breathe and work methodically</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Time Recovery Strategies</h4>
                <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                  <li>• <strong>Identify non-critical refinements</strong> - Focus on essential requirements first</li>
                  <li>• <strong>Prioritise safety-critical tasks</strong> - Never compromise on electrical safety</li>
                  <li>• <strong>Streamline processes</strong> - Eliminate unnecessary steps while maintaining quality</li>
                  <li>• <strong>Maintain professional standards</strong> - Better to complete less work safely than rush dangerously</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Real-World Examples */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Square className="w-5 h-5" />
              6. Real-World Examples and Case Studies
            </h2>
            
            <div className="space-y-4">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">AM2 Assessment Case Studies</h4>
                <div className="space-y-3">
                  <div className="bg-red-50 dark:bg-red-950/20 rounded p-3">
                    <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">Failure Example 1: Perfectionist Approach</h5>
                    <p className="text-sm text-red-700 dark:text-elec-yellow mb-2">
                      <strong>Scenario:</strong> Candidate spent 90 minutes perfecting a conduit bend, pursuing absolute perfection.
                    </p>
                    <p className="text-sm text-red-700 dark:text-elec-yellow mb-2">
                      <strong>Consequence:</strong> Ran out of time, left cooker circuit completely un-terminated.
                    </p>
                    <p className="text-sm text-red-700 dark:text-elec-yellow">
                      <strong>Result:</strong> Failed section - incomplete critical circuit despite perfect containment.
                    </p>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-950/20 rounded p-3">
                    <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">Failure Example 2: Documentation Delay</h5>
                    <p className="text-sm text-red-700 dark:text-elec-yellow mb-2">
                      <strong>Scenario:</strong> Candidate completed installation but left only 5 minutes for paperwork.
                    </p>
                    <p className="text-sm text-red-700 dark:text-elec-yellow mb-2">
                      <strong>Consequence:</strong> Test sheets rushed, incomplete, several results missing.
                    </p>
                    <p className="text-sm text-red-700 dark:text-elec-yellow">
                      <strong>Result:</strong> Failed paperwork section despite good practical work.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950/20 rounded p-3">
                    <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Success Example: Planned Approach</h5>
                    <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                      <strong>Scenario:</strong> Candidate set personal time targets, monitored progress, stayed calm throughout.
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                      <strong>Execution:</strong> Completed all circuits neatly, documented as progress was made.
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      <strong>Result:</strong> Passed first attempt with high marks across all sections.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Real-World Professional Parallel</h4>
                <div className="bg-orange-50 dark:bg-orange-950/20 rounded p-3">
                  <h5 className="font-medium text-orange-800 dark:text-orange-200 mb-2">Industry Example: Contract Deadline Management</h5>
                  <p className="text-sm text-orange-700 dark:text-elec-yellow mb-2">
                    A contractor missed a crucial project deadline because they spent excessive time reworking one cable run to absolute perfection.
                  </p>
                  <p className="text-sm text-orange-700 dark:text-elec-yellow mb-2">
                    <strong>Consequence:</strong> Client rejected the entire job due to delayed completion, despite excellent quality work.
                  </p>
                  <p className="text-sm text-orange-700 dark:text-elec-yellow">
                    <strong>Lesson:</strong> Professional standards must be balanced with practical deadline management - same principle applies in AM2.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary and Key Takeaways */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Section Summary - Time Management Mastery
            </h2>
            
            <div className="space-y-4">
              <div className="bg-transparent border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Golden Rule of AM2 Time Management</h4>
                <p className="text-sm text-white italic mb-3">
                  "Plan, pace, and deliver methodically. Incomplete but safe is better than unsafe. Professional standards maintained throughout."
                </p>
                <p className="text-sm text-white">
                  Time management in AM2 is about working methodically, safely, and steadily to complete the whole installation within professional standards.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">What Assessors Want to See</h4>
                <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                  <li>• <strong>Planned, organised approach</strong> - Evidence of systematic working methods</li>
                  <li>• <strong>Professional standard across all circuits</strong> - Consistent quality throughout</li>
                  <li>• <strong>Safety and neatness prioritised over speed</strong> - No compromises on standards</li>
                  <li>• <strong>Circuits finished, tested, and documented</strong> - Complete professional handover</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Essential Success Strategies</h4>
                <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                  <li>• Break installation into clear phases with time targets</li>
                  <li>• Monitor progress regularly against planned milestones</li>
                  <li>• Maintain professional standards under time pressure</li>
                  <li>• Document and label as you progress, not at the end</li>
                  <li>• Remember: professional competence includes deadline management</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Knowledge Check Quiz */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Knowledge Check - Time Management Strategies
            </h2>
            <p className="text-sm text-white mb-6">
              Test your understanding of time management principles and strategies for AM2 success. This quiz covers planning, pacing, and professional deadline management.
            </p>
            
            <Quiz 
              questions={quizQuestions}
              title="Time Management Assessment"
            />
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../section5" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous:</span>
              <span>Accuracy & Neatness</span>
            </Link>
          </Button>
          
          <div className="flex items-center gap-2 text-sm text-white">
            <span className="hidden sm:inline">Section 6 of 6</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
            </div>
          </div>

          <Button className="w-full sm:w-auto" asChild>
            <Link to=".." className="flex items-center gap-2">
              <span className="hidden sm:inline">Next:</span>
              <span>Module 4</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module3Section6;