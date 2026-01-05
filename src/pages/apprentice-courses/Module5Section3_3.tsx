import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Planning Access and Working Platforms - Module 5.3.3 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to plan safe access routes and select appropriate working platforms for electrical installations while maintaining health and safety compliance.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Name two types of working platforms used in electrical installations.",
    options: ["Ladders and boxes", "Step ladders and podium steps", "Chairs and tables", "Ropes and planks"],
    correctIndex: 1,
    explanation: "Step ladders and podium steps are proper working platforms. Podium steps provide greater stability for longer-duration tasks."
  },
  {
    id: 2,
    question: "What regulation covers working at height?",
    options: ["Health and Safety at Work Act", "Work at Height Regulations 2005", "Electricity at Work Regulations", "COSHH Regulations"],
    correctIndex: 1,
    explanation: "The Work at Height Regulations 2005 specifically governs safe work at height and requires the use of appropriate access equipment."
  },
  {
    id: 3,
    question: "Why should access routes be kept clear?",
    options: ["To prevent trips and accidents", "To look tidy", "To save space", "To impress clients"],
    correctIndex: 0,
    explanation: "Clear access routes prevent trips and accidents, ensuring safe movement around the work area for all personnel."
  }
];

const Module5Section3_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of planning access routes?",
      options: ["To save time", "To ensure work is completed safely and efficiently", "To impress supervisors", "To use fewer materials"],
      correctAnswer: 1,
      explanation: "Planning access routes ensures work is completed safely and efficiently while preventing accidents and delays."
    },
    {
      id: 2,
      question: "True or False: Ladders are suitable for long-duration high-level tasks.",
      options: ["False", "True"],
      correctAnswer: 0,
      explanation: "False. Ladders should only be used for short-duration, low-risk work. Longer tasks require more stable platforms."
    },
    {
      id: 3,
      question: "Which regulation governs safe work at height?",
      options: ["Health and Safety at Work Act", "Work at Height Regulations 2005", "Electricity at Work Regulations", "COSHH Regulations"],
      correctAnswer: 1,
      explanation: "The Work at Height Regulations 2005 specifically covers requirements for safe work at height."
    },
    {
      id: 4,
      question: "Name one type of working platform that provides greater stability than ladders.",
      options: ["Boxes", "Podium steps", "Chairs", "Loose boards"],
      correctAnswer: 1,
      explanation: "Podium steps provide greater stability than ladders and are suitable for repetitive or longer-duration tasks."
    },
    {
      id: 5,
      question: "Who is responsible for inspecting scaffolds?",
      options: ["Anyone on site", "A competent person", "The client", "Only electricians"],
      correctAnswer: 1,
      explanation: "A competent person must inspect scaffolds regularly and after any changes to ensure safety."
    },
    {
      id: 6,
      question: "Why should walkways be kept clear of trailing cables?",
      options: ["To prevent trips and accidents", "To save space", "To look professional", "To use fewer cables"],
      correctAnswer: 0,
      explanation: "Clear walkways prevent trips and accidents from trailing cables and other obstacles."
    },
    {
      id: 7,
      question: "Give one example of a Mobile Elevating Work Platform (MEWP).",
      options: ["Step ladder", "Scissor lift", "Podium steps", "Scaffold tower"],
      correctAnswer: 1,
      explanation: "Scissor lifts and cherry pickers are examples of MEWPs used for high-level or difficult-to-reach areas."
    },
    {
      id: 8,
      question: "What should you do if access equipment is damaged?",
      options: ["Use it carefully", "Report it and do not use until repaired/replaced", "Fix it yourself", "Ignore the damage"],
      correctAnswer: 1,
      explanation: "Damaged equipment must be reported immediately and not used until properly repaired or replaced."
    },
    {
      id: 9,
      question: "Why is coordination with other trades important when planning access?",
      options: ["To make friends", "To avoid conflicts and ensure smooth site operations", "To share equipment", "To work faster"],
      correctAnswer: 1,
      explanation: "Coordination prevents conflicts, ensures efficient use of access routes, and maintains smooth site operations."
    },
    {
      id: 10,
      question: "What is the safest principle when considering working at height?",
      options: ["Use the highest platform available", "Avoid it where possible — complete work from ground level if feasible", "Always use a harness", "Work quickly to minimize time at height"],
      correctAnswer: 1,
      explanation: "The safest approach is to avoid working at height where possible and complete work from ground level when feasible."
    }
  ];

  const faqs = [
    {
      question: "Can I use a ladder for any job at height?",
      answer: "No. Ladders should only be used for short-duration, low-risk work. For extended or repetitive tasks, use more stable platforms like podium steps or scaffolds."
    },
    {
      question: "Who checks scaffolding before use?",
      answer: "A competent person must inspect scaffolds regularly and after any changes. This ensures the scaffold is safe and properly erected."
    },
    {
      question: "What if access equipment is damaged?",
      answer: "Report it immediately and do not use until repaired or replaced. Using damaged equipment puts you and others at serious risk."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
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
            <div className="p-2 rounded-lg bg-card">
              <Hammer className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 5.3.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Planning Access and Working Platforms
          </h1>
          <p className="text-muted-foreground">
            Learn to plan safe access routes and select appropriate working platforms for electrical installations while maintaining compliance.
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-foreground" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Introduction</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Plan safe access routes before starting work.</li>
                <li>Choose appropriate platforms: ladders, podiums, scaffolds, MEWPs.</li>
                <li>Follow Work at Height Regulations 2005.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Clear access routes, proper platforms, safety signage.</li>
                <li><strong>Use:</strong> Inspection checklists, platform selection guides.</li>
                <li><strong>Check:</strong> Equipment condition before use, coordination with trades.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <p className="text-base text-foreground mb-4">
            Safe and efficient access to work areas is critical in electrical installation. Poor planning of access can cause delays, create unsafe working conditions, and lead to accidents. By organising access and selecting the right working platforms, electricians can complete tasks more effectively while maintaining compliance with health and safety regulations.
          </p>
          
          <div className="rounded-lg p-4 bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mt-4">
            <div className="flex items-start gap-3">
              <Hammer className="w-5 h-5 text-emerald-400 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Why This Matters</p>
                <p className="text-xs sm:text-sm text-foreground">
                  Poor access planning is responsible for approximately 25% of construction site accidents, making proper planning essential for safe electrical installations.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <p className="text-base text-foreground">
              <strong>Real Impact:</strong> Well-planned access routes and platforms can reduce installation time by 15% and significantly decrease the risk of accidents and injuries.
            </p>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded border border-emerald-200 dark:border-emerald-800">
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Industry Standard:</strong> The Work at Height Regulations 2005 require that access planning prioritises the lowest-risk methods available for each task.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-base text-foreground mb-4">By the end of this subsection, you will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Explain why access planning is important on site.</li>
            <li>Identify common types of working platforms and their uses.</li>
            <li>Plan safe access routes and platforms for different tasks.</li>
            <li>Recognise safety requirements for working at height.</li>
            <li>Apply safe systems of work to prevent accidents.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* Why Access Planning Matters */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1. Why Access Planning Matters</h3>
            <p className="text-base text-foreground mb-4">
              Proper access planning is fundamental to safe and efficient electrical installations:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-3">Critical Safety Benefits</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Safety and Efficiency:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Ensures tasks can be completed safely and on time</li>
                          <li>Prevents accidents from poor access arrangements</li>
                          <li>Helps coordinate with other trades on site</li>
                          <li>Reduces fatigue and strain on workers</li>
                          <li>Minimises disruption to site operations</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Legal Compliance:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Meets Work at Height Regulations 2005 requirements</li>
                          <li>Satisfies CDM 2015 planning obligations</li>
                          <li>Ensures HSE compliance for site safety</li>
                          <li>Demonstrates duty of care to employees</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Economic Benefits:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Reduces project delays and associated costs</li>
                          <li>Minimises insurance claims from accidents</li>
                          <li>Improves productivity and efficiency</li>
                          <li>Prevents costly rework from rushed installations</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Industry Impact</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Sites with comprehensive access planning show 60% fewer accidents and 25% faster completion times compared to those with poor planning.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Risk Assessment for Access Planning */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1.1 Risk Assessment for Access Planning</h3>
            <p className="text-base text-foreground mb-4">
              Before selecting access methods, conduct thorough risk assessments:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Risk Assessment Process</h4>
                <div className="grid gap-3">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <div>
                      <p className="font-medium text-yellow-800 dark:text-yellow-200">Identify Hazards</p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">Falls from height, unstable surfaces, moving equipment, overhead hazards</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <div>
                      <p className="font-medium text-yellow-800 dark:text-yellow-200">Assess Risk Level</p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">Evaluate likelihood and severity of potential incidents</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <div>
                      <p className="font-medium text-yellow-800 dark:text-yellow-200">Control Measures</p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">Implement hierarchy of controls: eliminate, reduce, control, protect</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Types of Working Platforms */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">2. Types of Working Platforms - Detailed Analysis</h3>
            <p className="text-base text-foreground mb-4">
              Selecting the appropriate platform depends on task duration, height, stability requirements, and site conditions:
            </p>
            
            <div className="space-y-6">
              {/* Step Ladders */}
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">A</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Step Ladders</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Best Used For:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>Short-duration tasks (under 30 minutes)</li>
                            <li>Light work requiring minimal tools</li>
                            <li>Quick access for inspection or adjustment</li>
                            <li>Work up to 3 metres height</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Limitations:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>Limited working area</li>
                            <li>Requires three points of contact</li>
                            <li>Not suitable for heavy materials</li>
                            <li>Weather dependent for outdoor use</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Safety Requirements</p>
                        <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                          <li>Daily visual inspection before use</li>
                          <li>Angle ratio 4:1 (4 units up for every 1 unit out)</li>
                          <li>Secure top and bottom where possible</li>
                          <li>Never overreach - move the ladder instead</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Podium Steps */}
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">B</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-3">Podium Steps</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Advantages:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>Large, stable working platform</li>
                            <li>Guardrails provide fall protection</li>
                            <li>Tool tray for equipment storage</li>
                            <li>Suitable for repetitive tasks</li>
                            <li>Can work with both hands free</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Typical Applications:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>Cable pulling and routing</li>
                            <li>Lighting installation</li>
                            <li>Containment fixing</li>
                            <li>Longer duration tasks (1-4 hours)</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Safety Features</p>
                        <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                          <li>Built-in guardrails (minimum 950mm height)</li>
                          <li>Self-locking outriggers for stability</li>
                          <li>Non-slip platform surface</li>
                          <li>Lockable castors where fitted</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scaffold Towers */}
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">C</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-3">Scaffold Towers</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-base text-foreground mb-2"><strong>When to Use:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>Extended work periods (days/weeks)</li>
                            <li>Multiple workers on same platform</li>
                            <li>Heavy equipment and materials</li>
                            <li>Heights above 6 metres</li>
                            <li>Work requiring significant reach</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Types Available:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>Static tower scaffolds</li>
                            <li>Mobile tower scaffolds</li>
                            <li>Cantilever scaffolds</li>
                            <li>System scaffolds</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                        <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Inspection Requirements</p>
                        <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                          <li>Competent person inspection before first use</li>
                          <li>Weekly inspections during use</li>
                          <li>Inspection after substantial alteration</li>
                          <li>Inspection after adverse weather</li>
                          <li>Written records must be maintained</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* MEWPs */}
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">D</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-3">Mobile Elevating Work Platforms (MEWPs)</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Types and Applications:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li><strong>Scissor Lifts:</strong> Large platforms, up to 18m height</li>
                            <li><strong>Boom Lifts:</strong> Reach over obstacles, up to 40m+</li>
                            <li><strong>Cherry Pickers:</strong> Precise positioning, compact access</li>
                            <li><strong>Spider Lifts:</strong> Narrow access, outdoor/indoor use</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Operator Requirements:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>IPAF (International Powered Access Federation) certification</li>
                            <li>Category-specific training (3a, 3b, 1a, 1b)</li>
                            <li>Pre-use inspection competency</li>
                            <li>Understanding of ground conditions</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-800">
                        <p className="font-medium text-orange-700 dark:text-emerald-400 mb-2">Safety Considerations</p>
                        <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                          <li>Ground stability and load bearing assessment</li>
                          <li>Overhead hazard identification (power lines, structures)</li>
                          <li>Weather conditions (wind speed limits)</li>
                          <li>Fall protection equipment required</li>
                          <li>Emergency descent procedures</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="platforms-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Planning Safe Access Routes */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3. Planning Safe Access Routes - Comprehensive Guide</h3>
            <p className="text-base text-foreground mb-4">
              Effective access route planning requires systematic consideration of multiple factors:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-3">Route Planning Methodology</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Site Survey Requirements:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Measure available space for equipment and movement</li>
                          <li>Identify structural constraints and obstacles</li>
                          <li>Assess floor loading capacities</li>
                          <li>Check ceiling heights and overhead restrictions</li>
                          <li>Note existing services and utilities</li>
                          <li>Evaluate lighting and environmental conditions</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Traffic Management:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Separate pedestrian and vehicle routes where possible</li>
                          <li>Implement one-way systems in narrow areas</li>
                          <li>Provide passing places on longer routes</li>
                          <li>Install appropriate signage and barriers</li>
                          <li>Consider timing of material deliveries</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Emergency Considerations:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Maintain clear emergency evacuation routes</li>
                          <li>Ensure access for emergency services</li>
                          <li>Provide alternative routes if main route blocked</li>
                          <li>Install emergency communication systems</li>
                        </ul>
                      </div>

                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-800">
                        <p className="font-medium text-orange-700 dark:text-emerald-400 mb-2">Route Documentation</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          All access routes should be documented with plans showing dimensions, load limits, emergency procedures, and coordination with other trades' activities.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Environmental Factors */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3.1 Environmental and Site-Specific Factors</h3>
            <p className="text-base text-foreground mb-4">
              Environmental conditions significantly impact access planning decisions:
            </p>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-4 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800">
                  <h4 className="font-medium text-sky-800 dark:text-sky-200 mb-3">Weather Considerations</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                    <li><strong>Wind:</strong> Affects ladder stability and MEWP operation</li>
                    <li><strong>Rain:</strong> Creates slip hazards on platforms and routes</li>
                    <li><strong>Temperature:</strong> Affects material handling and worker comfort</li>
                    <li><strong>Visibility:</strong> Fog, dust, or poor lighting conditions</li>
                  </ul>
                </div>

                <div className="rounded-lg p-4 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800">
                  <h4 className="font-medium text-teal-800 dark:text-teal-200 mb-3">Ground Conditions</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                    <li><strong>Stability:</strong> Soft ground, excavations, underground services</li>
                    <li><strong>Level:</strong> Slopes affecting equipment setup</li>
                    <li><strong>Surface:</strong> Concrete, tarmac, grass, gravel conditions</li>
                    <li><strong>Drainage:</strong> Water accumulation and runoff</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="routes-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Working at Height Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">4. Working at Height Requirements - Legal Framework</h3>
            <p className="text-base text-foreground mb-4">
              The Work at Height Regulations 2005 establish a comprehensive legal framework for safe working at height:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <h4 className="font-medium text-red-700 dark:text-emerald-400 mb-3">Hierarchy of Controls</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <div>
                      <p className="font-medium text-red-700 dark:text-emerald-400">Avoid Work at Height</p>
                      <p className="text-xs sm:text-sm text-foreground">Where reasonably practicable, complete work from ground level</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <div>
                      <p className="font-medium text-red-700 dark:text-emerald-400">Prevent Falls</p>
                      <p className="text-xs sm:text-sm text-foreground">Use guardrails, barriers, and working platforms</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <div>
                      <p className="font-medium text-red-700 dark:text-emerald-400">Mitigate Fall Distance</p>
                      <p className="text-xs sm:text-sm text-foreground">Fall arrest systems, safety nets, air bags</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800">
                <h4 className="font-medium text-indigo-700 dark:text-indigo-400 mb-3">Key Legal Requirements</h4>
                <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                  <li>Work at height must be properly planned by a competent person</li>
                  <li>Risk assessments must be conducted and recorded</li>
                  <li>Equipment must be inspected before use</li>
                  <li>Workers must be competent or supervised</li>
                  <li>Emergency procedures must be established</li>
                  <li>Weather conditions must be considered</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <h4 className="font-medium text-purple-700 dark:text-emerald-400 mb-3">Personal Protective Equipment</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">When Required:</p>
                    <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                      <li>Work on MEWPs without adequate guardrails</li>
                      <li>Scaffold erection and dismantling</li>
                      <li>Work near unprotected edges</li>
                      <li>Emergency situations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Equipment Types:</p>
                    <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                      <li>Full body harnesses</li>
                      <li>Lanyards with shock absorbers</li>
                      <li>Fall arrest blocks</li>
                      <li>Anchor points and systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="regulations-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Coordination with Other Trades */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">5. Coordination with Other Trades - Best Practices</h3>
            <p className="text-base text-foreground mb-4">
              Effective coordination prevents conflicts, reduces delays, and ensures everyone's safety:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800">
                <h4 className="font-medium text-cyan-700 dark:text-cyan-400 mb-3">Communication Methods</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-cyan-700 dark:text-cyan-400 mb-2">Formal Communication:</p>
                    <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                      <li>Daily toolbox talks</li>
                      <li>Weekly coordination meetings</li>
                      <li>Written method statements</li>
                      <li>Access permits and notifications</li>
                      <li>Programme updates and changes</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-cyan-700 dark:text-cyan-400 mb-2">Visual Communication:</p>
                    <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                      <li>Site access plans and drawings</li>
                      <li>Barrier and signage systems</li>
                      <li>Colour-coded equipment identification</li>
                      <li>Progress tracking boards</li>
                      <li>Safety notice boards</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                <h4 className="font-medium text-emerald-700 dark:text-emerald-400 mb-3">Shared Resources Management</h4>
                <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                  <li><strong>Equipment Scheduling:</strong> Book scaffold towers, MEWPs, and major platforms in advance</li>
                  <li><strong>Space Allocation:</strong> Define working areas and storage zones for each trade</li>
                  <li><strong>Timeline Coordination:</strong> Sequence work to minimize conflicts and maximize efficiency</li>
                  <li><strong>Safety Systems:</strong> Shared fall protection and emergency procedures</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
                <h4 className="font-medium text-rose-700 dark:text-rose-400 mb-3">Conflict Resolution</h4>
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm text-foreground"><strong>When conflicts arise:</strong></p>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                    <li>Stop work immediately if safety is compromised</li>
                    <li>Escalate to site supervisor or project manager</li>
                    <li>Document the issue and agreed resolution</li>
                    <li>Update method statements and risk assessments</li>
                    <li>Communicate changes to all affected parties</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Equipment Inspection and Maintenance */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">6. Equipment Inspection and Maintenance</h3>
            <p className="text-base text-foreground mb-4">
              Regular inspection and maintenance ensures equipment remains safe and reliable:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Daily Pre-Use Inspections</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Visual Checks:</p>
                    <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                      <li>Structural damage or deformation</li>
                      <li>Loose or missing components</li>
                      <li>Wear patterns and corrosion</li>
                      <li>Labels and certification marks</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Functional Tests:</p>
                    <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                      <li>Locking mechanisms</li>
                      <li>Safety systems operation</li>
                      <li>Stability when loaded</li>
                      <li>Access and egress routes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-700 dark:text-emerald-400 mb-3">Formal Inspection Requirements</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-blue-700 dark:text-emerald-400">Weekly Inspections:</p>
                    <p className="text-xs sm:text-sm text-foreground">Required for scaffolds and towers in use, conducted by competent person with written records.</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-700 dark:text-emerald-400">Annual Inspections:</p>
                    <p className="text-xs sm:text-sm text-foreground">Thorough examination of all access equipment by qualified inspector with certification.</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-700 dark:text-emerald-400">Post-Incident Inspections:</p>
                    <p className="text-xs sm:text-sm text-foreground">Required after any incident, adverse weather, or substantial modification.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Advanced Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Advanced Practical Guidance</h2>
          <div className="space-y-6">
            
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-lg p-4 bg-slate-50 dark:bg-card/50 border border-slate-200 dark:border-slate-700">
                <h3 className="font-medium text-foreground mb-3">Daily Inspection Checklist</h3>
                <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
                  <li>Visual inspection for damage, wear, or deformation</li>
                  <li>Check all locking mechanisms and safety systems</li>
                  <li>Verify stability and levelness of platforms</li>
                  <li>Ensure guardrails and toe boards are secure</li>
                  <li>Test access and egress routes</li>
                  <li>Check ground conditions and weather suitability</li>
                  <li>Verify certification labels and inspection dates</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-slate-50 dark:bg-card/50 border border-slate-200 dark:border-slate-700">
                <h3 className="font-medium text-foreground mb-3">Setup Best Practices</h3>
                <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
                  <li>Establish exclusion zones around working areas</li>
                  <li>Position platforms to minimize reaching and stretching</li>
                  <li>Ensure adequate lighting for all work areas</li>
                  <li>Provide tool restraint systems to prevent drops</li>
                  <li>Install warning signs and barriers as required</li>
                  <li>Maintain clear emergency evacuation routes</li>
                  <li>Document setup with photos for reference</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <h3 className="font-medium text-amber-800 dark:text-amber-200 mb-3">Common Mistakes to Avoid</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-amber-800 dark:text-amber-200 mb-2">Equipment Selection:</p>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                    <li>Using step ladders for extended tasks</li>
                    <li>Overloading platforms beyond safe limits</li>
                    <li>Ignoring height restrictions for equipment</li>
                    <li>Selecting wrong type of MEWP for conditions</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-amber-800 dark:text-amber-200 mb-2">Setup Errors:</p>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                    <li>Inadequate ground preparation or assessment</li>
                    <li>Blocking emergency routes or exits</li>
                    <li>Poor coordination with other trades</li>
                    <li>Insufficient consideration of weather conditions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
              <h3 className="font-medium text-emerald-800 dark:text-emerald-200 mb-3">Technology and Innovation</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-emerald-800 dark:text-emerald-200">Digital Planning Tools:</p>
                  <p className="text-xs sm:text-sm text-foreground">3D modeling software, VR planning systems, and mobile apps for equipment selection and risk assessment.</p>
                </div>
                <div>
                  <p className="font-medium text-emerald-800 dark:text-emerald-200">Smart Equipment:</p>
                  <p className="text-xs sm:text-sm text-foreground">GPS-enabled MEWPs, IoT sensors for stability monitoring, and automated inspection systems.</p>
                </div>
                <div>
                  <p className="font-medium text-emerald-800 dark:text-emerald-200">Communication Systems:</p>
                  <p className="text-xs sm:text-sm text-foreground">Radio systems, emergency alarms, and digital coordination platforms for real-time updates.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Multiple Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Case Studies</h2>
          
          <div className="space-y-6">
            <div className="rounded-lg p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">Case Study 1: Warehouse Project Incident</h3>
              <p className="text-amber-700 dark:text-amber-300 mb-3">
                On a warehouse project, electricians used step ladders for extended cable installation at high level. The ladders were unstable, and one worker fell, injuring his arm. After review, podium steps and a scaffold tower were introduced, improving safety and efficiency.
              </p>
              <div className="bg-amber-100 dark:bg-amber-900/40 p-3 rounded">
                <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">Lessons Learned:</p>
                <ul className="list-disc pl-5 text-sm text-amber-700 dark:text-amber-300">
                  <li>Risk assessment identified inappropriate equipment selection</li>
                  <li>Proper platform selection improved both safety and productivity</li>
                  <li>Worker training emphasized equipment limitations</li>
                  <li>Site procedures updated to prevent similar incidents</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3">Case Study 2: Office Complex Success</h3>
              <p className="text-green-700 dark:text-green-300 mb-3">
                A 12-story office complex electrical installation used comprehensive access planning with coordinated scaffold systems, MEWPs, and podium steps. The project completed 2 weeks ahead of schedule with zero height-related incidents.
              </p>
              <div className="bg-green-100 dark:bg-green-900/40 p-3 rounded">
                <p className="font-medium text-green-800 dark:text-green-200 mb-1">Success Factors:</p>
                <ul className="list-disc pl-5 text-sm text-green-700 dark:text-green-300">
                  <li>Early planning phase included access strategy</li>
                  <li>Regular coordination meetings with all trades</li>
                  <li>Shared scaffold systems reduced costs</li>
                  <li>Proactive weather contingency planning</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Case Study 3: Hospital Renovation Challenges</h3>
              <p className="text-blue-700 dark:text-emerald-400 mb-3">
                Hospital electrical work required 24/7 access planning due to critical operations. Mobile platforms and carefully planned access routes maintained patient safety while enabling complex electrical installations.
              </p>
              <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded">
                <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">Key Strategies:</p>
                <ul className="list-disc pl-5 text-sm text-blue-700 dark:text-emerald-400">
                  <li>Quiet, compact equipment to minimize disruption</li>
                  <li>Emergency response integration with hospital systems</li>
                  <li>Flexible scheduling around patient needs</li>
                  <li>Enhanced safety measures due to occupied building</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-l-emerald-500 pl-4">
                <p className="font-medium text-foreground mb-2">Q: {faq.question}</p>
                <p className="text-muted-foreground">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
          <h2 className="text-lg sm:text-xl font-semibold text-emerald-800 dark:text-emerald-200 mb-4">Pocket Guide</h2>
          <div className="space-y-2 text-emerald-700 dark:text-emerald-400">
            <p>• Plan safe access routes before starting work.</p>
            <p>• Choose the right platform: step ladder, podium, scaffold, or MEWP.</p>
            <p>• Follow Work at Height Regulations 2005.</p>
            <p>• Never use makeshift access equipment.</p>
            <p>• Keep walkways clear and coordinate with other trades.</p>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-base text-foreground">
            In this subsection, you learned how to plan safe access and working platforms. You now know the types of platforms available, the importance of clear access routes, and the legal requirements for working at height. Proper planning ensures tasks are completed safely, efficiently, and without unnecessary risk.
          </p>
        </Card>

        {/* Knowledge Check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-foreground" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Knowledge Check</h2>
          </div>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8">
          <Button variant="outline" asChild>
            <Link to="module5-section3/subsection2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Timescales
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

export default Module5Section3_3;