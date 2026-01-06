import { ArrowLeft, Target, BookOpen, Wrench, AlertCircle, CheckCircle, Package, Zap, Settings, AlertTriangle, Clipboard, Hammer, Lightbulb, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Manual Handling and Tool Safety | Level 2 Electrical Course";
const DESCRIPTION = "Learn safe lifting techniques and tool safety practices for electrical work, including the TILE principle and equipment maintenance requirements.";

const Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions = [
    {
      id: "1",
      question: "What does TILE stand for in manual handling?",
      options: [
        "Task, Individual, Load, Environment", 
        "Time, Information, Location, Equipment",
        "Tools, Inspection, Lifting, Evaluation",
        "Training, Instructions, Labour, Execution"
      ],
      correctIndex: 0,
      explanation: "TILE stands for Task, Individual, Load, Environment - the four key factors to consider before any manual handling operation."
    },
    {
      id: "2",
      question: "When should tools be inspected?",
      options: [
        "Only when they break",
        "Once a month", 
        "Before each use",
        "At the end of each day"
      ],
      correctIndex: 2,
      explanation: "Tools should be inspected before each use to check for damage, wear, or defects that could cause injury."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What does TILE stand for in manual handling?",
      options: [
        "Task, Individual, Load, Environment",
        "Time, Information, Location, Equipment",
        "Tools, Inspection, Lifting, Evaluation", 
        "Training, Instructions, Labour, Execution"
      ],
      correctAnswer: 0,
      explanation: "TILE stands for Task, Individual, Load, Environment - the four key factors to consider before any manual handling operation."
    },
    {
      id: 2,
      question: "Name two risks of poor lifting technique.",
      options: [
        "Better fitness and stronger muscles",
        "Back strain and shoulder injuries",
        "Faster work completion and efficiency",
        "Improved tool handling and coordination"
      ],
      correctAnswer: 1,
      explanation: "Poor lifting technique can cause back strain, slipped discs, shoulder and wrist injuries, and long-term musculoskeletal disorders."
    },
    {
      id: 3,
      question: "When should tools be inspected?",
      options: [
        "Only when they break",
        "Once a month",
        "Before each use",
        "At the end of each day"
      ],
      correctAnswer: 2,
      explanation: "Tools should be inspected before each use to check for damage, wear, or defects that could cause injury."
    },
    {
      id: 4,
      question: "Why should cables be kept off the floor?",
      options: [
        "To keep them clean",
        "To prevent tripping hazards",
        "To make them last longer",
        "To look more professional"
      ],
      correctAnswer: 1,
      explanation: "Cables should be kept off the floor to prevent tripping hazards and reduce the risk of damage from foot traffic."
    },
    {
      id: 5,
      question: "True or False: It's okay to use damaged hand tools if you're careful.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Damaged tools should never be used as they can fail unexpectedly and cause serious injury, regardless of how careful you are."
    }
  ];

  const faqs = [
    {
      question: "What is the maximum weight I can lift manually?",
      answer: "There's no specific legal weight limit, but guidelines suggest 25kg for most adults under ideal conditions. However, factors like frequency, height, reach, and individual capability all affect safe lifting limits. Always assess each situation using the TILE principle."
    },
    {
      question: "How often should power tools be PAT tested?",
      answer: "Portable electrical tools should be PAT tested every 3-6 months in construction environments, or more frequently if heavily used. Always check your company's policy and follow manufacturer recommendations."
    },
    {
      question: "Can I use my personal tools on site?",
      answer: "This depends on site policy. If allowed, your personal tools must still meet safety standards, be properly maintained, and may need to be inspected before use. Some sites only allow company-provided tools for liability reasons."
    },
    {
      question: "What should I do if I injure myself while lifting?",
      answer: "Stop work immediately, report the injury to your supervisor, seek medical attention if needed, and complete an accident report. Don't try to 'work through' back or joint pain as it can worsen the injury."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Hammer className="h-8 w-8 text-elec-yellow" />
            <div>
              <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 4.4
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Manual Handling and Tool Safety
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mt-2">
                Safe lifting techniques and responsible tool use for electrical work
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Manual handling:</strong> Lifting, carrying, pushing, pulling with proper technique.</li>
                <li><strong>TILE principle:</strong> Task, Individual, Load, Environment assessment.</li>
                <li><strong>Tool safety:</strong> Inspect before use, maintain properly, use correctly.</li>
                <li><strong>Common risks:</strong> Back injuries, tool failures, poor technique.</li>
                <li><strong>Prevention:</strong> Training, equipment checks, safe practices.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Poor lifting posture, damaged tools, rushing tasks.</li>
                <li><strong>Use:</strong> TILE assessments, daily tool checks, safe techniques.</li>
                <li><strong>Apply:</strong> Team lifting, mechanical aids, maintenance schedules.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-muted-foreground mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-foreground">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Understand what manual handling includes</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Learn safe lifting techniques using TILE principle</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Identify good practices for tool use and maintenance</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Recognise common tool hazards and how to avoid them</span>
            </li>
          </ul>
        </Card>

        {/* What Is Manual Handling? */}
        <div className="mb-8 border-l-4 border-elec-yellow p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">What Is Manual Handling?</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-elec-yellow/5 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="font-medium text-blue-800 dark:text-blue-200 mb-3">
                Manual handling includes lifting, carrying, pushing, pulling, lowering or holding objects by hand or bodily force.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Package className="h-4 w-4 text-elec-yellow" />
                  Common Electrical Examples
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Moving 25kg cable drums</li>
                  <li>• Carrying ladders through buildings</li>
                  <li>• Lifting distribution boards onto walls</li>
                  <li>• Handling conduit and trunking</li>
                  <li>• Moving electrical panels and switchgear</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-red-800 dark:text-red-200">Risks of Poor Handling</h4>
                <ul className="text-red-700 dark:text-elec-yellow text-sm space-y-1">
                  <li>• Back strain or slipped discs</li>
                  <li>• Shoulder and wrist injuries</li>
                  <li>• Cuts or trapped fingers</li>
                  <li>• Long-term musculoskeletal disorders</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          id="tile-meaning"
          question="What does TILE stand for in manual handling?"
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Safe Lifting Techniques - The TILE Principle */}
        <div className="mb-8 border-l-4 border-elec-yellow p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Safe Lifting Techniques - The TILE Principle</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-elec-yellow/5 bg-elec-yellow/10 border border-elec-yellow/30 border-elec-yellow/20 rounded-lg p-4">
              <p className="font-medium text-elec-yellow dark:text-elec-yellow mb-3">
                Follow the TILE principle before any lifting operation to assess risks and plan safely.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-elec-yellow/5 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200 flex items-center gap-2">
                  <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">T</span>
                  Task
                </h4>
                <ul className="text-blue-700 dark:text-elec-yellow text-sm space-y-1">
                  <li>• Is help needed?</li>
                  <li>• Can mechanical aids be used?</li>
                  <li>• Is the lift awkward or unusual?</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200 flex items-center gap-2">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">I</span>
                  Individual
                </h4>
                <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
                  <li>• Are you fit and healthy?</li>
                  <li>• Do you have back problems?</li>
                  <li>• Are you wearing appropriate clothing?</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-purple-800 dark:text-purple-200 flex items-center gap-2">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">L</span>
                  Load
                </h4>
                <ul className="text-purple-700 dark:text-elec-yellow text-sm space-y-1">
                  <li>• Is it heavy, bulky, or sharp?</li>
                  <li>• Is it stable or could it shift?</li>
                  <li>• Can you get a good grip?</li>
                </ul>
              </div>

              <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-orange-800 dark:text-orange-200 flex items-center gap-2">
                  <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">E</span>
                  Environment
                </h4>
                <ul className="text-orange-700 dark:text-elec-yellow text-sm space-y-1">
                  <li>• Is there space to move safely?</li>
                  <li>• Are floors stable and level?</li>
                  <li>• Is lighting adequate?</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          id="tool-inspection"
          question="When should tools be inspected?"
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Step-by-Step Safe Lifting Technique */}
        <div className="mb-8 border-l-4 border-orange-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Step-by-Step Safe Lifting Technique</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <p className="font-medium text-orange-800 dark:text-orange-200 mb-3">
                Follow these steps for every manual lift to reduce injury risk:
              </p>
            </div>

            <div className="grid gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
                  Plan Your Lift
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Clear the route and check destination</li>
                  <li>• Test the weight - lift one corner first</li>
                  <li>• Decide if you need help or equipment</li>
                  <li>• Remove any obstacles from path</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
                  Position Yourself
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Stand close to the load</li>
                  <li>• Feet shoulder-width apart</li>
                  <li>• One foot slightly ahead of the other</li>
                  <li>• Face the direction you want to move</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
                  Get a Good Grip
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use both hands with secure hold</li>
                  <li>• Hook grip is stronger than fingertips</li>
                  <li>• Get as close to the load as possible</li>
                  <li>• Avoid holding at arm's length</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</span>
                  Lift Smoothly
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Keep back straight, bend knees</li>
                  <li>• Lift with leg muscles, not back</li>
                  <li>• Rise smoothly without jerking</li>
                  <li>• Keep load close to body</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">5</span>
                  Move and Place
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Move feet, don't twist spine</li>
                  <li>• Take small steps if needed</li>
                  <li>• Put load down by reversing lift</li>
                  <li>• Place, don't drop or throw</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">6</span>
                  After Lifting
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Straighten up slowly</li>
                  <li>• Check for any discomfort</li>
                  <li>• Report any strain or pain</li>
                  <li>• Rest if multiple lifts needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tool Safety Best Practices */}
        <div className="mb-8 border-l-4 border-purple-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Tool Safety Best Practices</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-elec-yellow" />
                  Before Use
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Inspect tools for damage or wear</li>
                  <li>• Check guards and safety features</li>
                  <li>• Ensure proper working order</li>
                  <li>• Verify you're trained on the tool</li>
                  <li>• Check electrical cords for damage</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Settings className="h-4 w-4 text-elec-yellow" />
                  During Use
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use the right tool for the job</li>
                  <li>• Maintain proper grip and control</li>
                  <li>• Keep tools away from live circuits</li>
                  <li>• Don't force tools beyond capacity</li>
                  <li>• Stop if you notice problems</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-elec-yellow" />
                  After Use
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Clean tools before storing</li>
                  <li>• Store in designated locations</li>
                  <li>• Report any damage immediately</li>
                  <li>• Disconnect power tools safely</li>
                  <li>• Account for all equipment</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-elec-yellow" />
                  Red Flags
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Damaged or frayed electrical cords</li>
                  <li>• Missing safety guards or shields</li>
                  <li>• Excessive vibration or noise</li>
                  <li>• Tools that spark or overheat</li>
                  <li>• Loose or damaged handles</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">Real World Example</h4>
              <p className="text-amber-700 dark:text-amber-300 text-sm mb-2">
                An electrician rushed to cut trunking using a blunt hacksaw with a cracked handle. The tool slipped and caused a deep cut to his hand.
              </p>
              <p className="text-amber-600 font-medium text-sm">
                This highlights the importance of daily tool inspection and maintaining equipment in good condition.
              </p>
            </div>
          </div>
        </div>

        {/* Specific Tool Categories */}
        <div className="mb-8 border-l-4 border-teal-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Electrical Tool Categories and Safety</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-lg p-4">
              <p className="font-medium text-teal-800 dark:text-teal-200 mb-3">
                Different tool types require specific safety considerations:
              </p>
            </div>

            <div className="grid gap-4">
              <div className="bg-elec-yellow/5 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Hand Tools</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm font-medium text-blue-700 dark:text-elec-yellow mb-1">Common Tools:</p>
                    <ul className="text-sm text-elec-yellow dark:text-elec-yellow space-y-0.5">
                      <li>• Screwdrivers (insulated)</li>
                      <li>• Wire strippers</li>
                      <li>• Pliers and cutters</li>
                      <li>• Spanners and keys</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-700 dark:text-elec-yellow mb-1">Safety Points:</p>
                    <ul className="text-sm text-elec-yellow dark:text-elec-yellow space-y-0.5">
                      <li>• Check insulation ratings</li>
                      <li>• Inspect for damage daily</li>
                      <li>• Keep cutting edges sharp</li>
                      <li>• Store in tool pouches</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-purple-800 dark:text-purple-200">Power Tools</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm font-medium text-purple-700 dark:text-elec-yellow mb-1">Common Tools:</p>
                    <ul className="text-sm text-purple-600 dark:text-elec-yellow space-y-0.5">
                      <li>• Drills and impact drivers</li>
                      <li>• Angle grinders</li>
                      <li>• Reciprocating saws</li>
                      <li>• Cable pulling systems</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-700 dark:text-elec-yellow mb-1">Safety Points:</p>
                    <ul className="text-sm text-purple-600 dark:text-elec-yellow space-y-0.5">
                      <li>• Check PAT test status</li>
                      <li>• Use RCD protection</li>
                      <li>• Inspect cords for damage</li>
                      <li>• Use appropriate PPE</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">Testing Equipment</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Common Tools:</p>
                    <ul className="text-sm text-green-600 dark:text-green-400 space-y-0.5">
                      <li>• Multimeters</li>
                      <li>• Insulation testers</li>
                      <li>• Socket testers</li>
                      <li>• Proving units</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Safety Points:</p>
                    <ul className="text-sm text-green-600 dark:text-green-400 space-y-0.5">
                      <li>• Calibration certificates current</li>
                      <li>• Test leads in good condition</li>
                      <li>• Use proving units before/after</li>
                      <li>• Follow safe isolation procedures</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-orange-800 dark:text-orange-200">Access Equipment</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm font-medium text-orange-700 dark:text-elec-yellow mb-1">Common Equipment:</p>
                    <ul className="text-sm text-orange-600 dark:text-elec-yellow space-y-0.5">
                      <li>• Step ladders</li>
                      <li>• Extension ladders</li>
                      <li>• Mobile towers</li>
                      <li>• Podium steps</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-700 dark:text-elec-yellow mb-1">Safety Points:</p>
                    <ul className="text-sm text-orange-600 dark:text-elec-yellow space-y-0.5">
                      <li>• Check stability and locks</li>
                      <li>• 4:1 angle rule for ladders</li>
                      <li>• Three points of contact</li>
                      <li>• Weight limits observed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Manual Handling Injuries */}
        <div className="mb-8 border-l-4 border-red-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Common Manual Handling Injuries</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="font-medium text-red-800 dark:text-red-200 mb-3">
                Understanding these injuries helps prevent them:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-elec-yellow" />
                  Back Injuries
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 mb-2">
                  <li>• Muscle strains from poor lifting</li>
                  <li>• Disc problems from twisting</li>
                  <li>• Cumulative damage from repetition</li>
                </ul>
                <p className="text-xs text-red-600 dark:text-elec-yellow font-medium">Prevention: Use legs, not back. Get help for heavy items.</p>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-elec-yellow" />
                  Shoulder/Arm Injuries
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 mb-2">
                  <li>• Rotator cuff strains</li>
                  <li>• Tennis elbow from repetitive actions</li>
                  <li>• Wrist injuries from awkward grips</li>
                </ul>
                <p className="text-xs text-red-600 dark:text-elec-yellow font-medium">Prevention: Keep loads close to body. Use proper grip.</p>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-elec-yellow" />
                  Crush Injuries
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 mb-2">
                  <li>• Fingers caught between objects</li>
                  <li>• Foot injuries from dropped items</li>
                  <li>• Hand injuries from poor grip</li>
                </ul>
                <p className="text-xs text-red-600 dark:text-elec-yellow font-medium">Prevention: Use appropriate PPE. Plan lifting route.</p>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-elec-yellow" />
                  Cuts and Lacerations
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 mb-2">
                  <li>• Sharp edges on materials</li>
                  <li>• Damaged tool handles</li>
                  <li>• Metal burrs and splinters</li>
                </ul>
                <p className="text-xs text-red-600 dark:text-elec-yellow font-medium">Prevention: Use cut-resistant gloves. Inspect materials first.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mechanical Aids */}
        <div className="mb-8 border-l-4 border-indigo-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">7</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Mechanical Aids and Team Lifting</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <p className="font-medium text-indigo-800 dark:text-indigo-200 mb-3">
                When manual lifting isn't safe or practical, use these alternatives:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Settings className="h-4 w-4 text-elec-yellow" />
                  Common Mechanical Aids
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Sack trucks for cable drums</li>
                  <li>• Trolleys for heavy equipment</li>
                  <li>• Cable pulling systems</li>
                  <li>• Lifting hoists for distribution boards</li>
                  <li>• Conveyor systems for materials</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Package className="h-4 w-4 text-elec-yellow" />
                  Team Lifting Guidelines
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Designate one person as leader</li>
                  <li>• Ensure all team members are similar height</li>
                  <li>• Use clear verbal commands</li>
                  <li>• Lift and move in unison</li>
                  <li>• Plan the route and destination</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow" />
                  Benefits of Mechanical Aids
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Reduces physical strain on workers</li>
                  <li>• Increases efficiency and speed</li>
                  <li>• Prevents damage to materials</li>
                  <li>• Reduces injury risk significantly</li>
                  <li>• Allows handling of heavier items</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Clipboard className="h-4 w-4 text-elec-yellow" />
                  When to Use Aids
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Items over 25kg for most people</li>
                  <li>• Bulky or awkward shaped objects</li>
                  <li>• Repetitive lifting tasks</li>
                  <li>• Long distance carrying required</li>
                  <li>• Poor environmental conditions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-b-0">
                <h3 className="font-semibold mb-2 text-elec-yellow">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <ul className="space-y-3 text-foreground">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Use TILE principle for all manual handling assessments</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Inspect all tools before each use to prevent injuries</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Proper techniques prevent most workplace injuries</span>
            </li>
          </ul>
        </Card>

        <Quiz questions={quizQuestions} />
      </div>
    </div>
  );
};

export default Section4_4;