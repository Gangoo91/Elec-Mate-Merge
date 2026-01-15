import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
              Back to Section 3
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 3.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Manual Bending Tools and Techniques
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learn manual bending tools and techniques for conduit installation without heavy equipment.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/80">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Manual tools allow accurate bends on site without heavy equipment</li>
                  <li>Essential for smaller jobs, tight spaces, and quick adjustments</li>
                  <li>Proper technique produces clean, regulation-compliant bends</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Spot:</strong> Small jobs, tight spaces, quick adjustments needed</li>
                  <li><strong>Use:</strong> Hand benders, springs, heat guns, hickey benders</li>
                  <li><strong>Check:</strong> Bend radius, alignment, material integrity</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-white/80">
              <li>Identify different types of manual bending tools and their uses</li>
              <li>Apply correct techniques for bending PVC and metal conduit manually</li>
              <li>Avoid common bending faults when working without a machine</li>
              <li>Check and adjust bends for accuracy</li>
              <li>Work safely with manual bending equipment</li>
            </ul>
          </section>

          {/* Common Manual Bending Tools */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Common Manual Bending Tools
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Manual bending tools provide flexibility and precision for on-site work:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Hand Bender (Conduit Bender)</p>
                <p className="text-sm text-white/80 mb-2">Lever-operated tool with a bending shoe and handle for small-diameter conduit (typically 16-25mm).</p>
                <div className="text-xs text-white/60">
                  <strong>Best for:</strong> Standard bends in metal conduit, precise angle control
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Bending Spring</p>
                <p className="text-sm text-white/80 mb-2">Internal or external spring used to support PVC conduit during heating and bending.</p>
                <div className="text-xs text-white/60">
                  <strong>Best for:</strong> PVC conduit support, preventing collapse during bending
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Pipe Vice and Former</p>
                <p className="text-sm text-white/80 mb-2">Used for holding and shaping conduit manually during bending operations.</p>
                <div className="text-xs text-white/60">
                  <strong>Best for:</strong> Securing conduit, manual forming operations
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Hickey Bender</p>
                <p className="text-sm text-white/80 mb-2">Short-handled bender for small adjustments and kick bends in metal conduit.</p>
                <div className="text-xs text-white/60">
                  <strong>Best for:</strong> Fine adjustments, small corrections, kick bends
                </div>
              </div>
            </div>
          </section>

          {/* Manual Bending for PVC Conduit */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Manual Bending for PVC Conduit
            </h2>
            <p className="text-sm text-white/80 mb-4">
              PVC requires heating and proper support for successful manual bending:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-green-400 mb-2">1. Heating</p>
                <p className="text-sm text-white/80">Use a heat gun or bending box to soften PVC before bending. Apply heat evenly to avoid weak spots.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-green-400 mb-2">2. Support</p>
                <p className="text-sm text-white/80">Insert an internal bending spring to maintain shape and prevent collapse during the bending process.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-green-400 mb-2">3. Forming the Bend</p>
                <p className="text-sm text-white/80">Bend slowly to avoid kinks, checking alignment as you go. Apply steady, even pressure.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-green-400 mb-2">4. Cooling</p>
                <p className="text-sm text-white/80">Hold the bend until the PVC cools to retain the shape. Allow complete cooling before handling.</p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="tools-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>

          {/* Manual Bending for Metal Conduit */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Manual Bending for Metal Conduit
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Metal conduit requires precise marking and controlled force application:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-purple-400 mb-2">1. Marking</p>
                <p className="text-sm text-white/80">Mark the start and end points of the bend before starting. Use a measuring tape and marker for accuracy.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-purple-400 mb-2">2. Forming</p>
                <p className="text-sm text-white/80">Use a hand bender with smooth, steady pressure. Avoid jerky movements that can cause kinks.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-purple-400 mb-2">3. Adjustment</p>
                <p className="text-sm text-white/80">Hickey benders can fine-tune bends without damaging the conduit. Make small corrections as needed.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-purple-400 mb-2">4. Checks</p>
                <p className="text-sm text-white/80">Ensure bend radius meets BS 7671 requirements to protect cables and maintain installation integrity.</p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="metal-technique-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>

          {/* Safety Considerations */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Safety Considerations
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Manual bending requires attention to personal safety and equipment protection:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-orange-400 mb-2">Personal Protection</p>
                <p className="text-sm text-white/80">Wear gloves to protect hands from sharp edges and heated PVC. Use safety glasses when using heat guns.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-orange-400 mb-2">Work Position</p>
                <p className="text-sm text-white/80">Keep work at waist height for better control and reduced strain. Use proper lifting techniques.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-orange-400 mb-2">Controlled Force</p>
                <p className="text-sm text-white/80">Avoid forcing bends too quickly - this can damage the conduit and tools, and cause injury.</p>
              </div>
            </div>
          </section>

          {/* Checking and Adjusting Bends */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Checking and Adjusting Bends
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Accurate measurement and adjustment ensure professional results:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-red-400 mb-2">Angle Verification</p>
                <p className="text-sm text-white/80">Use a level or protractor to confirm the angle meets specifications.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-red-400 mb-2">Symmetry Check</p>
                <p className="text-sm text-white/80">Check for symmetry in saddle bends and offsets to ensure professional appearance.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-red-400 mb-2">Careful Adjustment</p>
                <p className="text-sm text-white/80">Small adjustments can be made, but avoid repeated bending in the same spot to prevent weakening.</p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="safety-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-500/50">
              <p className="text-sm text-white/80 mb-4">
                On a domestic job, an installer needed to route PVC conduit around a tight corner without access to a bending machine. The space was too restricted for standard equipment, and time was limited.
              </p>
              <p className="text-sm text-white/80 mb-4">
                Using a heat gun and bending spring, they formed a smooth bend that fitted perfectly, avoiding the need for multiple joins and keeping the installation neat. The key was taking time to heat the PVC evenly and using the spring to maintain the conduit's integrity.
              </p>
              <div className="flex items-start gap-2 p-3 rounded bg-green-500/10 border-l-2 border-green-500/50">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-white/70">
                  <strong className="text-green-400">Lesson Learned:</strong> Manual tools provide flexibility for site-specific challenges. Proper technique and patience deliver professional results without heavy equipment.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-1">Q: Can I bend PVC conduit without heating?</p>
                <p className="text-sm text-white/70">A: Only for very shallow bends; heating is needed for sharper bends to avoid cracking or collapse.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-1">Q: How do I know if my bend radius is correct?</p>
                <p className="text-sm text-white/70">A: Measure against a bend radius guide or follow the manufacturer's recommendations and BS 7671 requirements.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-1">Q: Are manual methods suitable for large-diameter conduit?</p>
                <p className="text-sm text-white/70">A: Not usually - larger diameters require machine bending for consistent results and to prevent damage.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Summary
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white/80">
                Manual bending tools are versatile and practical for smaller-scale or on-the-spot bending work. With the right technique, they produce professional results while maintaining compliance with regulations. Slow, controlled bending with correct support is key to avoiding faults.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Bending Machines
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-4">
                Next: Cutting and Preparing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section3_3;
