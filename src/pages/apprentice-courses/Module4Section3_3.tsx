import { ArrowLeft, ArrowRight, Package, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Manual Bending Tools and Techniques - Module 4.3.3 | Level 2 Electrical Course";
const DESCRIPTION = "Learn manual bending tools and techniques for conduit installation. Master hand benders, bending springs, and safe practices for PVC and metal conduit bending.";

const quickCheckQuestions = [
  {
    question: "What tool is inserted inside PVC conduit to prevent collapse during bending?",
    options: [
      "Heat gun",
      "Bending spring", 
      "Pipe vice",
      "Hickey bender"
    ],
    correctIndex: 1,
    explanation: "A bending spring (internal or external) is inserted into PVC conduit to maintain its shape and prevent collapse during the heating and bending process."
  },
  {
    question: "Which manual tool is best for small corrections in metal conduit?",
    options: [
      "Hand bender",
      "Hickey bender",
      "Pipe vice", 
      "Bending spring"
    ],
    correctIndex: 1,
    explanation: "A hickey bender is specifically designed for small adjustments and kick bends in metal conduit without damaging the material."
  },
  {
    question: "Why should bends be made slowly rather than quickly?",
    options: [
      "To save energy",
      "To avoid kinks, flattening, or cracking",
      "To reduce noise",
      "To meet regulations"
    ],
    correctIndex: 1,
    explanation: "Slow, controlled bending prevents damage such as kinks, flattening, or cracking that can occur when force is applied too quickly."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main purpose of a bending spring in PVC bending?",
    options: [
      "To measure the angle",
      "To prevent collapse during bending",
      "To heat the conduit"
    ],
    correctAnswer: 1,
    explanation: "A bending spring's primary function is to support the conduit walls and prevent collapse during the bending process."
  },
  {
    id: 2,
    question: "Which tool is used for small bend adjustments in metal conduit?",
    options: [
      "Hand bender", 
      "Hickey bender",
      "Pipe vice"
    ],
    correctAnswer: 1,
    explanation: "A hickey bender is specifically designed for making small corrections and adjustments in metal conduit."
  },
  {
    id: 3,
    question: "True or False: You can make sharp bends in PVC without heating.",
    options: [
      "True",
      "False"
    ],
    correctAnswer: 1,
    explanation: "False. Sharp bends in PVC require heating to soften the material and prevent cracking or collapse."
  },
  {
    id: 4,
    question: "Why should you bend conduit slowly when using manual tools?",
    options: [
      "To avoid kinks, flattening, or cracking",
      "To save time",
      "To reduce material cost"
    ],
    correctAnswer: 0,
    explanation: "Slow, controlled bending prevents damage that can occur from applying force too quickly."
  },
  {
    id: 5,
    question: "What tool helps hold conduit steady during manual bending?",
    options: [
      "Heat gun",
      "Pipe vice",
      "Bending spring"
    ],
    correctAnswer: 1,
    explanation: "A pipe vice securely holds the conduit in place during manual bending operations."
  },
  {
    id: 6,
    question: "Name one hazard of bending PVC with a heat gun.",
    options: [
      "Electric shock",
      "Burns from contact with heated material",
      "Tool breakage"
    ],
    correctAnswer: 1,
    explanation: "Burns from contact with heated PVC material is a significant hazard when using heat guns for bending."
  },
  {
    id: 7,
    question: "How can you check the accuracy of a bend angle?",
    options: [
      "Use a level or protractor",
      "Visual inspection only",
      "Use a ruler"
    ],
    correctAnswer: 0,
    explanation: "A level or protractor provides accurate measurement of bend angles to ensure they meet specifications."
  },
  {
    id: 8,
    question: "Why should repeated bending in the same spot be avoided?",
    options: [
      "It's too time consuming",
      "It can weaken the conduit and cause cracking or deformation",
      "It uses too much heat"
    ],
    correctAnswer: 1,
    explanation: "Repeated bending in the same location weakens the conduit material and can lead to cracking or permanent deformation."
  }
];

const Module4Section3_3 = () => {
  useSEO(TITLE, DESCRIPTION);

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
              <Package className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 4.3.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Manual Bending Tools and Techniques
          </h1>
          <p className="text-muted-foreground">
            Learn manual bending tools and techniques for conduit installation without heavy equipment.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Manual tools allow accurate bends on site without heavy equipment.</li>
                <li>Essential for smaller jobs, tight spaces, and quick adjustments.</li>
                <li>Proper technique produces clean, regulation-compliant bends.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Small jobs, tight spaces, quick adjustments needed.</li>
                <li><strong>Use:</strong> Hand benders, springs, heat guns, hickey benders.</li>
                <li><strong>Check:</strong> Bend radius, alignment, material integrity.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Identify different types of manual bending tools and their uses.</li>
            <li>Apply correct techniques for bending PVC and metal conduit manually.</li>
            <li>Avoid common bending faults when working without a machine.</li>
            <li>Check and adjust bends for accuracy.</li>
            <li>Work safely with manual bending equipment.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Common Manual Bending Tools */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Common Manual Bending Tools</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Manual bending tools provide flexibility and precision for on-site work:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Hand Bender (Conduit Bender)</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Lever-operated tool with a bending shoe and handle for small-diameter conduit (typically 16–25 mm).</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Best for:</strong> Standard bends in metal conduit, precise angle control
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Bending Spring</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Internal or external spring used to support PVC conduit during heating and bending.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Best for:</strong> PVC conduit support, preventing collapse during bending
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Pipe Vice and Former</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Used for holding and shaping conduit manually during bending operations.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Best for:</strong> Securing conduit, manual forming operations
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Hickey Bender</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Short-handled bender for small adjustments and kick bends in metal conduit.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Best for:</strong> Fine adjustments, small corrections, kick bends
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Manual Bending for PVC Conduit */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Manual Bending for PVC Conduit</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              PVC requires heating and proper support for successful manual bending:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Heating</p>
                    <p className="text-xs sm:text-sm text-foreground">Use a heat gun or bending box to soften PVC before bending. Apply heat evenly to avoid weak spots.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Support</p>
                    <p className="text-xs sm:text-sm text-foreground">Insert an internal bending spring to maintain shape and prevent collapse during the bending process.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Forming the Bend</p>
                    <p className="text-xs sm:text-sm text-foreground">Bend slowly to avoid kinks, checking alignment as you go. Apply steady, even pressure.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Cooling</p>
                    <p className="text-xs sm:text-sm text-foreground">Hold the bend until the PVC cools to retain the shape. Allow complete cooling before handling.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="tools-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Manual Bending for Metal Conduit */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Manual Bending for Metal Conduit</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Metal conduit requires precise marking and controlled force application:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Marking</p>
                    <p className="text-xs sm:text-sm text-foreground">Mark the start and end points of the bend before starting. Use a measuring tape and marker for accuracy.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Forming</p>
                    <p className="text-xs sm:text-sm text-foreground">Use a hand bender with smooth, steady pressure. Avoid jerky movements that can cause kinks.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Adjustment</p>
                    <p className="text-xs sm:text-sm text-foreground">Hickey benders can fine-tune bends without damaging the conduit. Make small corrections as needed.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Checks</p>
                    <p className="text-xs sm:text-sm text-foreground">Ensure bend radius meets BS 7671 requirements to protect cables and maintain installation integrity.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="metal-technique-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Safety Considerations */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Safety Considerations</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Manual bending requires attention to personal safety and equipment protection:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Personal Protection</p>
                    <p className="text-xs sm:text-sm text-foreground">Wear gloves to protect hands from sharp edges and heated PVC. Use safety glasses when using heat guns.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Work Position</p>
                    <p className="text-xs sm:text-sm text-foreground">Keep work at waist height for better control and reduced strain. Use proper lifting techniques.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Controlled Force</p>
                    <p className="text-xs sm:text-sm text-foreground">Avoid forcing bends too quickly — this can damage the conduit and tools, and cause injury.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Checking and Adjusting Bends */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Checking and Adjusting Bends</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Accurate measurement and adjustment ensure professional results:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">Angle Verification</p>
                    <p className="text-xs sm:text-sm text-foreground">Use a level or protractor to confirm the angle meets specifications.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">Symmetry Check</p>
                    <p className="text-xs sm:text-sm text-foreground">Check for symmetry in saddle bends and offsets to ensure professional appearance.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">Careful Adjustment</p>
                    <p className="text-xs sm:text-sm text-foreground">Small adjustments can be made, but avoid repeated bending in the same spot to prevent weakening.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="safety-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </Card>

        {/* Real-world example */}
        <Card className="mb-8 p-6 bg-background border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Example</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <p className="text-xs sm:text-sm text-foreground leading-relaxed mb-4">
                On a domestic job, an installer needed to route PVC conduit around a tight corner without access to a bending machine. The space was too restricted for standard equipment, and time was limited.
              </p>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed mb-4">
                Using a heat gun and bending spring, they formed a smooth bend that fitted perfectly, avoiding the need for multiple joins and keeping the installation neat. The key was taking time to heat the PVC evenly and using the spring to maintain the conduit's integrity.
              </p>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                This demonstrates how proper manual technique can deliver professional results even in challenging conditions.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-700 dark:text-green-300">Lesson Learned</span>
              </div>
              <p className="text-xs text-green-700 dark:text-green-300">
                Manual tools provide flexibility for site-specific challenges. Proper technique and patience deliver professional results without heavy equipment.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-foreground mb-2">Can I bend PVC conduit without heating?</h3>
              <p className="text-sm text-muted-foreground">Only for very shallow bends; heating is needed for sharper bends to avoid cracking or collapse.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">How do I know if my bend radius is correct?</h3>
              <p className="text-sm text-muted-foreground">Measure against a bend radius guide or follow the manufacturer's recommendations and BS 7671 requirements.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Are manual methods suitable for large-diameter conduit?</h3>
              <p className="text-sm text-muted-foreground">Not usually — larger diameters require machine bending for consistent results and to prevent damage.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-xs sm:text-sm text-foreground leading-relaxed">
            Manual bending tools are versatile and practical for smaller-scale or on-the-spot bending work. With the right technique, they produce professional results while maintaining compliance with regulations. Slow, controlled bending with correct support is key to avoiding faults.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" asChild>
            <Link to="../3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Machine Bending
            </Link>
          </Button>
          <Button asChild>
            <Link to="../3-4">
              Next Section
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section3_3;