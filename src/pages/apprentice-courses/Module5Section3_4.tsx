import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Minimising Disruption to Other Site Activities - Module 5.3.4 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to coordinate electrical work with other trades, prevent clashes, and maintain smooth site operations through effective planning and communication.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Why is minimising disruption to other trades important?",
    options: ["To finish work faster", "To keep projects on schedule and reduce conflict", "To use fewer materials", "To work alone"],
    correctIndex: 1,
    explanation: "Minimising disruption keeps projects on schedule, prevents rework, reduces safety risks, and builds positive working relationships."
  },
  {
    id: 2,
    question: "Give one example of a common clash between electrical and another trade.",
    options: ["Working in different areas", "Electricians running cables while plastering is ongoing", "Using different tools", "Working different hours"],
    correctIndex: 1,
    explanation: "Common clashes include electricians running cables while plastering is ongoing, which can damage both trades' work."
  },
  {
    id: 3,
    question: "How can electricians protect socket boxes during plastering?",
    options: ["Remove them", "Use temporary covers", "Paint them", "Move them"],
    correctIndex: 1,
    explanation: "Temporary covers protect socket boxes from being filled with plaster or other materials during wet trades."
  }
];

const Module5Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Why is minimising disruption to other trades important?",
      options: ["To finish work faster", "To keep projects on schedule and reduce conflict", "To use fewer materials", "To work independently"],
      correctAnswer: 1,
      explanation: "Minimising disruption keeps projects on schedule, prevents rework, reduces safety risks, and maintains good professional relationships."
    },
    {
      id: 2,
      question: "Name one trade that often clashes with electricians during first fix.",
      options: ["Landscapers", "Plasterers", "Roofers", "Security guards"],
      correctAnswer: 1,
      explanation: "Plasterers often work in the same areas as electricians during first fix, creating potential for clashes and damage."
    },
    {
      id: 3,
      question: "What site document shows when each trade is scheduled to work?",
      options: ["Health and safety file", "The site programme", "Material delivery notes", "Tool inventory"],
      correctAnswer: 1,
      explanation: "The site programme shows the scheduled timing for all trades and activities on the construction project."
    },
    {
      id: 4,
      question: "True or False: Electrical accessories should be installed after plastering is complete.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "True. Electrical accessories are typically installed during second fix after plastering and other wet trades are complete."
    },
    {
      id: 5,
      question: "What can be used to protect socket boxes during plastering?",
      options: ["Plastic bags", "Temporary covers", "Newspaper", "Nothing needed"],
      correctAnswer: 1,
      explanation: "Temporary covers specifically designed for electrical boxes protect them from plaster and other materials."
    },
    {
      id: 6,
      question: "Who leads coordination between trades on site?",
      options: ["The electrician", "The site manager", "The client", "The delivery driver"],
      correctAnswer: 1,
      explanation: "The site manager oversees coordination between trades, though each trade must take responsibility for communication."
    },
    {
      id: 7,
      question: "What is a consequence of poor coordination?",
      options: ["Better quality work", "Rework, delays, or damaged installations", "Lower costs", "Faster completion"],
      correctAnswer: 1,
      explanation: "Poor coordination leads to rework, delays, damaged installations, and conflicts between trades."
    },
    {
      id: 8,
      question: "Why should electricians attend site meetings?",
      options: ["To get paid", "To plan work alongside other trades", "To take breaks", "To avoid work"],
      correctAnswer: 1,
      explanation: "Site meetings enable electricians to coordinate their work with other trades and avoid clashes."
    },
    {
      id: 9,
      question: "What should you do if another trade damages your installation?",
      options: ["Ignore it", "Report it to the supervisor immediately", "Fix it yourself quietly", "Blame the other trade"],
      correctAnswer: 1,
      explanation: "Damage should be reported immediately to the supervisor so proper procedures can be followed for repairs."
    },
    {
      id: 10,
      question: "Give one way to reduce disruption during multi-trade work in confined spaces.",
      options: ["Work faster", "Agree work times/areas with other trades", "Use more workers", "Work overtime"],
      correctAnswer: 1,
      explanation: "Coordinating work times and areas with other trades prevents conflicts and safety issues in confined spaces."
    }
  ];

  const faqs = [
    {
      question: "What if another trade damages my installation?",
      answer: "Report it immediately to your supervisor. Rework may be chargeable to that trade if poor coordination caused it. Document the damage with photos and ensure proper procedures are followed."
    },
    {
      question: "Who is responsible for site coordination?",
      answer: "The site manager oversees coordination, but each trade must take responsibility for communicating their requirements and attending coordination meetings."
    },
    {
      question: "Can electrical work be delayed to suit other trades?",
      answer: "Yes — sequencing often requires flexibility to keep overall progress smooth. Sometimes it's better to delay than to create conflicts or safety issues."
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
              <UserCheck className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 5.3.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Minimising Disruption to Other Site Activities
          </h1>
          <p className="text-muted-foreground">
            Learn to coordinate electrical work with other trades, prevent clashes, and maintain smooth site operations through effective planning.
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
                <li>Review site programme to understand other trades' schedules.</li>
                <li>Sequence work to avoid clashes (first fix, second fix phases).</li>
                <li>Protect installations from damage during wet trades.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Overlapping work areas, unprotected installations.</li>
                <li><strong>Use:</strong> Coordination meetings, protective covers, clear markings.</li>
                <li><strong>Check:</strong> Site programme updated, all trades informed.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <p className="text-base text-foreground mb-4">
            Construction projects involve multiple trades working alongside each other. Electrical installation must be carefully planned to avoid disrupting others, such as plasterers, carpenters, plumbers, or decorators. Poor coordination can cause delays, damage to work, and safety hazards. Minimising disruption ensures smoother progress for all trades and helps maintain good professional relationships.
          </p>
          
          <div className="rounded-lg p-4 bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mt-4">
            <div className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-emerald-400 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Why This Matters</p>
                <p className="text-xs sm:text-sm text-foreground">
                  Poor trade coordination is responsible for up to 30% of construction delays and 20% of cost overruns, making effective collaboration essential for project success.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <p className="text-base text-foreground">
              <strong>Real Impact:</strong> Well-coordinated projects show 40% fewer defects, 25% faster completion times, and significantly improved relationships between trades.
            </p>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded border border-emerald-200 dark:border-emerald-800">
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Industry Standard:</strong> CDM 2015 regulations require effective coordination between trades to ensure health, safety, and quality throughout construction projects.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-base text-foreground mb-4">By the end of this subsection, you will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Explain why minimising disruption to other trades is essential.</li>
            <li>Identify common clashes between electrical and other site activities.</li>
            <li>Apply planning methods to reduce disruption.</li>
            <li>Communicate effectively with other trades on site.</li>
            <li>Recognise the consequences of poor coordination.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* Why Minimising Disruption Matters */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1. Why Minimising Disruption Matters - Strategic Importance</h3>
            <p className="text-base text-foreground mb-4">
              Effective coordination between trades is fundamental to successful construction projects:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-3">Project Management Benefits</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Schedule Management:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Keeps projects on schedule by preventing trade conflicts</li>
                          <li>Reduces time lost to coordination delays</li>
                          <li>Enables efficient resource utilisation across trades</li>
                          <li>Prevents cascading delays affecting project completion</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Quality Assurance:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Prevents rework and damage to finished work</li>
                          <li>Maintains installation integrity throughout construction</li>
                          <li>Reduces defects from rushed or compromised work</li>
                          <li>Ensures compliance with specifications and standards</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Safety and Risk Reduction:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Reduces safety risks from overlapping tasks</li>
                          <li>Prevents hazardous working conditions</li>
                          <li>Minimises accidents from conflicting activities</li>
                          <li>Ensures proper safety protocols are maintained</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Professional Relationships:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Builds positive working relationships on site</li>
                          <li>Establishes trust and cooperation between trades</li>
                          <li>Creates a collaborative working environment</li>
                          <li>Improves future project opportunities</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Economic Impact</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Effective trade coordination can reduce project costs by 15-20% through reduced rework, faster completion, and improved efficiency.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Site Programme Integration */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1.1 Site Programme Integration and Analysis</h3>
            <p className="text-base text-foreground mb-4">
              Understanding and integrating with the overall site programme is crucial for coordination:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Programme Analysis Process</h4>
                <div className="grid gap-3">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <div>
                      <p className="font-medium text-yellow-800 dark:text-yellow-200">Review Master Programme</p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">Understand overall project timeline and critical path activities</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <div>
                      <p className="font-medium text-yellow-800 dark:text-yellow-200">Identify Trade Dependencies</p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">Map which trades depend on electrical work and vice versa</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <div>
                      <p className="font-medium text-yellow-800 dark:text-yellow-200">Plan Resource Allocation</p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">Coordinate labour and equipment requirements with other trades</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Common Trade Clashes */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">2. Common Trade Clashes - Detailed Analysis</h3>
            <p className="text-base text-foreground mb-4">
              Understanding typical conflict points helps prevent problems before they occur:
            </p>
            
            <div className="space-y-6">
              {/* Electrical vs Plastering */}
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">A</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Electrical vs Plastering Conflicts</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Common Issues:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>Electricians running cables while plastering is ongoing</li>
                            <li>Socket boxes filled with plaster</li>
                            <li>Cable routes blocked by wet plaster</li>
                            <li>Dust contamination of electrical equipment</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Prevention Methods:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>Complete first fix before plastering starts</li>
                            <li>Use protective covers on all outlets</li>
                            <li>Mark cable routes clearly</li>
                            <li>Coordinate access timing</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Best Practice Timing</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Complete all electrical first fix work 24-48 hours before plasterers begin. This allows time for any adjustments and ensures no wet trades interfere with electrical installations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Electrical vs Mechanical Services */}
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">B</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-3">Electrical vs Mechanical Services</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Conflict Areas:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>Containment clashing with ductwork routes</li>
                            <li>Cable trays interfering with pipework</li>
                            <li>Plant room space allocation conflicts</li>
                            <li>Ceiling void congestion issues</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Coordination Solutions:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>Joint planning sessions for routes</li>
                            <li>3D coordination drawings</li>
                            <li>Agreed service hierarchy protocols</li>
                            <li>Shared plant room layouts</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Service Hierarchy</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Establish clear service hierarchy: gravity drainage (highest), pressurised water, HVAC ducts, cable trays, then individual cables (lowest). This prevents later conflicts over route priority.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Electrical vs Carpentry/Decoration */}
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">C</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-3">Electrical vs Carpentry and Decoration</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Typical Clashes:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>Socket outlets fitted before carpentry complete</li>
                            <li>Lighting installation clashing with ceiling work</li>
                            <li>Paint damage to new electrical fittings</li>
                            <li>Trim work covering cable routes</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-base text-foreground mb-2"><strong>Sequencing Solutions:</strong></p>
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li>Install accessories after carpentry/decoration</li>
                            <li>Coordinate lighting with ceiling installers</li>
                            <li>Protect finished work during painting</li>
                            <li>Mark outlet positions for trim work</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                        <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Second Fix Coordination</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Schedule electrical second fix after major carpentry and before final decoration. This minimises damage to finished work while ensuring electrical installations are properly integrated.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="clashes-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Planning to Avoid Disruption */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3. Planning to Avoid Disruption - Strategic Approaches</h3>
            <p className="text-base text-foreground mb-4">
              Proactive planning prevents conflicts before they occur:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-3">Comprehensive Planning Framework</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Programme Analysis and Integration:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Review the site programme to understand other trades' schedules</li>
                          <li>Identify critical path activities and dependencies</li>
                          <li>Map electrical work phases to construction sequence</li>
                          <li>Plan resource allocation to avoid conflicts</li>
                          <li>Build in contingency time for coordination issues</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Task Sequencing Strategy:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Carry out task sequencing to avoid clashes</li>
                          <li>Plan first fix before any wet trades begin</li>
                          <li>Schedule second fix after decoration preparation</li>
                          <li>Coordinate testing phases with project milestones</li>
                          <li>Plan commissioning around handover requirements</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Phased Work Implementation:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Work in phases coordinated with construction progress</li>
                          <li>Complete work by zones or floors systematically</li>
                          <li>Handover completed areas to following trades</li>
                          <li>Maintain access for later phases without disruption</li>
                        </ul>
                      </div>

                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-800">
                        <p className="font-medium text-orange-700 dark:text-emerald-400 mb-2">Digital Planning Tools</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Modern planning software with 4D scheduling capabilities can help visualise trade interactions over time, identifying potential conflicts before they occur on site.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Zone-Based Planning */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3.1 Zone-Based Planning and Work Sequencing</h3>
            <p className="text-base text-foreground mb-4">
              Implementing zone-based approaches improves coordination and reduces conflicts:
            </p>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-4 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800">
                  <h4 className="font-medium text-sky-800 dark:text-sky-200 mb-3">Zone Definition Strategies</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                    <li><strong>Floor-by-Floor:</strong> Complete each floor before moving up</li>
                    <li><strong>Wing/Section:</strong> Work in building sections to allow parallel activities</li>
                    <li><strong>Room Types:</strong> Group similar spaces for efficient working</li>
                    <li><strong>Service Routes:</strong> Follow logical service distribution paths</li>
                  </ul>
                </div>

                <div className="rounded-lg p-4 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800">
                  <h4 className="font-medium text-teal-800 dark:text-teal-200 mb-3">Handover Protocols</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                    <li><strong>Quality Checks:</strong> Complete inspection before handover</li>
                    <li><strong>Documentation:</strong> Provide as-built information</li>
                    <li><strong>Protection:</strong> Install temporary protection systems</li>
                    <li><strong>Access:</strong> Maintain essential access routes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="disruption-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Communication and Coordination */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">4. Communication and Coordination - Best Practices</h3>
            <p className="text-base text-foreground mb-4">
              Effective communication is the foundation of successful trade coordination:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800">
                <h4 className="font-medium text-cyan-700 dark:text-cyan-400 mb-3">Formal Communication Channels</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-cyan-700 dark:text-cyan-400 mb-2">Regular Meetings:</p>
                    <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                      <li>Daily toolbox talks and coordination briefings</li>
                      <li>Weekly trade coordination meetings</li>
                      <li>Monthly progress and planning reviews</li>
                      <li>Ad-hoc meetings for urgent coordination issues</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-cyan-700 dark:text-cyan-400 mb-2">Documentation Systems:</p>
                    <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                      <li>Updated site drawings and specifications</li>
                      <li>Work permit and notification systems</li>
                      <li>Progress tracking and reporting</li>
                      <li>Issue logs and resolution tracking</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800">
                <h4 className="font-medium text-indigo-700 dark:text-indigo-400 mb-3">Practical Coordination Methods</h4>
                <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                  <li><strong>Site Drawings:</strong> Use current drawings to check changes and coordinate activities</li>
                  <li><strong>Work Area Agreements:</strong> Define and agree work areas and times with other trades</li>
                  <li><strong>Resource Sharing:</strong> Coordinate use of shared equipment and facilities</li>
                  <li><strong>Progress Updates:</strong> Provide regular updates on completion status</li>
                  <li><strong>Issue Escalation:</strong> Clear procedures for resolving conflicts quickly</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Consequences of Poor Coordination */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">5. Consequences of Poor Coordination - Risk Analysis</h3>
            <p className="text-base text-foreground mb-4">
              Understanding the full impact of poor coordination helps emphasise its importance:
            </p>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <h4 className="font-medium text-red-700 dark:text-emerald-400 mb-3">Direct Consequences</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                    <li><strong>Time Delays:</strong> Project schedule disruption and overruns</li>
                    <li><strong>Cost Increases:</strong> Rework, materials waste, extended site costs</li>
                    <li><strong>Quality Issues:</strong> Damage to installed work requiring repair</li>
                    <li><strong>Safety Risks:</strong> Unsafe working conditions from conflicting activities</li>
                  </ul>
                </div>

                <div className="rounded-lg p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                  <h4 className="font-medium text-orange-700 dark:text-emerald-400 mb-3">Indirect Consequences</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                    <li><strong>Relationship Damage:</strong> Frustration and conflict between trades</li>
                    <li><strong>Reputation Impact:</strong> Reduced future work opportunities</li>
                    <li><strong>Team Morale:</strong> Stress and job satisfaction issues</li>
                    <li><strong>Client Relations:</strong> Reduced confidence and satisfaction</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg p-4 bg-gray-50 dark:bg-card/50 border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-foreground mb-3">Financial Impact Analysis</h4>
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm text-foreground"><strong>Typical Cost Increases from Poor Coordination:</strong></p>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                    <li>Rework costs: 5-15% of affected work value</li>
                    <li>Schedule delays: £500-2000 per day extended site costs</li>
                    <li>Material waste: 10-20% additional material requirements</li>
                    <li>Labour inefficiency: 20-30% reduced productivity</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="protection-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />
        </Card>

        {/* Advanced Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Advanced Practical Guidance</h2>
          <div className="space-y-6">
            
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-lg p-4 bg-slate-50 dark:bg-card/50 border border-slate-200 dark:border-slate-700">
                <h3 className="font-medium text-foreground mb-3">Protection Systems and Methods</h3>
                <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
                  <li>Mark out containment and accessory positions clearly for other trades</li>
                  <li>Install temporary covers to protect accessories during wet trades</li>
                  <li>Use clear signage ("Do Not Cover" tags on back boxes)</li>
                  <li>Apply protective film to finished installations</li>
                  <li>Establish exclusion zones around sensitive equipment</li>
                  <li>Document protection requirements for handover</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-slate-50 dark:bg-card/50 border border-slate-200 dark:border-slate-700">
                <h3 className="font-medium text-foreground mb-3">Conflict Resolution Strategies</h3>
                <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
                  <li>Avoid working in confined spaces with multiple trades unless coordinated</li>
                  <li>Be flexible — adjust jobs to allow others to complete work first</li>
                  <li>Establish clear escalation procedures for disputes</li>
                  <li>Use mediation through site management when needed</li>
                  <li>Document agreements and changes in writing</li>
                  <li>Focus on project success rather than individual trade interests</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
              <h3 className="font-medium text-emerald-800 dark:text-emerald-200 mb-3">Digital Coordination Tools</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-emerald-800 dark:text-emerald-200">Mobile Apps and Platforms:</p>
                  <p className="text-xs sm:text-sm text-foreground">Real-time communication tools, shared calendars, and progress tracking applications improve coordination efficiency.</p>
                </div>
                <div>
                  <p className="font-medium text-emerald-800 dark:text-emerald-200">BIM (Building Information Modeling):</p>
                  <p className="text-xs sm:text-sm text-foreground">3D models help visualise trade interactions and identify conflicts before they occur on site.</p>
                </div>
                <div>
                  <p className="font-medium text-emerald-800 dark:text-emerald-200">Digital Documentation:</p>
                  <p className="text-xs sm:text-sm text-foreground">Cloud-based systems ensure all trades have access to current drawings, schedules, and updates.</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
              <h3 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Quality Assurance in Multi-Trade Environments</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-purple-800 dark:text-purple-200 mb-2">Inspection Protocols:</p>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                    <li>Joint inspections with other trades</li>
                    <li>Photographic records of completed work</li>
                    <li>Signed handover certificates</li>
                    <li>Defect reporting and tracking systems</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-purple-800 dark:text-purple-200 mb-2">Protection Maintenance:</p>
                  <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-foreground">
                    <li>Regular checks of protective systems</li>
                    <li>Replacement of damaged protection</li>
                    <li>Clear responsibility for protection maintenance</li>
                    <li>Final protection removal procedures</li>
                  </ul>
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
              <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">Case Study 1: Housing Site Protection Failure</h3>
              <p className="text-amber-700 dark:text-amber-300 mb-3">
                On a housing site, electricians installed socket boxes before plastering without protective covers. Plasterers filled in the boxes, requiring electricians to dig them out later. This wasted hours of work and created friction between trades. Proper coordination and use of protective covers would have prevented the issue.
              </p>
              <div className="bg-amber-100 dark:bg-amber-900/40 p-3 rounded">
                <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">Lessons Learned:</p>
                <ul className="list-disc pl-5 text-sm text-amber-700 dark:text-amber-300">
                  <li>Always use appropriate protective covers for electrical boxes</li>
                  <li>Clear communication needed about protection requirements</li>
                  <li>Cost of prevention far less than cost of remedial work</li>
                  <li>Document protection requirements in method statements</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3">Case Study 2: Commercial Office Coordination Success</h3>
              <p className="text-green-700 dark:text-green-300 mb-3">
                A large commercial office project implemented weekly coordination meetings and shared digital planning tools. All trades worked from synchronized schedules with clear handover points. The project completed on time with minimal rework and excellent relationships between all trades.
              </p>
              <div className="bg-green-100 dark:bg-green-900/40 p-3 rounded">
                <p className="font-medium text-green-800 dark:text-green-200 mb-1">Success Factors:</p>
                <ul className="list-disc pl-5 text-sm text-green-700 dark:text-green-300">
                  <li>Regular formal coordination meetings</li>
                  <li>Shared digital tools for real-time updates</li>
                  <li>Clear work zone definitions and handover procedures</li>
                  <li>Strong site management leadership in coordination</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Case Study 3: Hospital Renovation Multi-Trade Challenge</h3>
              <p className="text-blue-700 dark:text-emerald-400 mb-3">
                During a hospital renovation, electrical, mechanical, and decoration trades needed to work simultaneously in occupied areas. Detailed hour-by-hour scheduling and noise control measures enabled work to continue without disrupting patient care or creating conflicts.
              </p>
              <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded">
                <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">Key Strategies:</p>
                <ul className="list-disc pl-5 text-sm text-blue-700 dark:text-emerald-400">
                  <li>Hour-by-hour detailed scheduling coordination</li>
                  <li>Noise and disruption control measures</li>
                  <li>Flexible working arrangements around patient needs</li>
                  <li>Enhanced communication with facility management</li>
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
            <p>✅ Review site programme regularly.</p>
            <p>✅ Sequence work with other trades.</p>
            <p>✅ Use coordination meetings to plan access.</p>
            <p>✅ Protect electrical work from damage.</p>
            <p>✅ Stay flexible to avoid delays and conflict.</p>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-base text-foreground">
            In this subsection, you learned how to minimise disruption to other site activities by understanding common trade clashes, sequencing tasks properly, and communicating effectively. You saw the risks of poor coordination and explored practical methods like protective covers, clear markings, and flexible scheduling to avoid problems.
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
            <Link to="module5-section3/subsection3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Access Planning
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

export default Module5Section3_4;