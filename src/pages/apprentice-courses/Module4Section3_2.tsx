import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Using Conduit Bending Machines (PVC and Metal) - Module 4.3.2 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to operate conduit bending machines safely for PVC and metal conduit, including machine types, preparation, and accuracy checking for BS 7671 compliance.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Why must PVC conduit be heated before bending?",
    options: ["To change its colour", "To make it pliable and prevent collapse", "To make it easier to cut"],
    correctIndex: 1,
    explanation: "PVC conduit must be heated to make it pliable and prevent collapse during the bending process."
  },
  {
    id: 2,
    question: "Name one safety precaution when using a bending machine.",
    options: ["Check the weather first", "Ensure the machine is on a stable surface", "Use maximum force for best results"],
    correctIndex: 1,
    explanation: "Ensure the machine is on a stable surface before use, and wear appropriate PPE."
  },
  {
    id: 3,
    question: "What tool can you use to confirm a bend angle?",
    options: ["Protractor or angle gauge", "Spirit level only", "Tape measure"],
    correctIndex: 0,
    explanation: "A protractor or angle gauge measures angles accurately."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Why is heating PVC conduit before bending important?",
    options: [
      "To make it easier to cut",
      "To make it pliable and prevent collapse",
      "To change its colour"
    ],
    correctAnswer: 1,
    explanation: "Heating PVC conduit makes it pliable and prevents collapse during bending."
  },
  {
    id: 2,
    question: "Which bending method uses a bending spring?",
    options: [
      "Hydraulic bending",
      "PVC bending",
      "Electric bending"
    ],
    correctAnswer: 1,
    explanation: "PVC bending uses a bending spring to support the inside of the conduit."
  },
  {
    id: 3,
    question: "True or False: Metal conduit can be bent by hand without tools.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False. Metal conduit requires bending machines due to the force needed."
  },
  {
    id: 4,
    question: "What tool measures the accuracy of a bend angle?",
    options: [
      "Spirit level",
      "Protractor or angle gauge",
      "Tape measure"
    ],
    correctAnswer: 1,
    explanation: "A protractor or angle gauge is used to confirm bend angles."
  },
  {
    id: 5,
    question: "Name one type of machine suitable for heavy-wall steel conduit.",
    options: [
      "Hand-operated bending machine",
      "Hydraulic bending machine",
      "Basic lever machine"
    ],
    correctAnswer: 1,
    explanation: "Hydraulic bending machines provide the power needed for heavy-wall steel conduit."
  },
  {
    id: 6,
    question: "Why should you avoid excessive force when bending metal conduit?",
    options: [
      "It wastes energy",
      "It can cause kinks or damage to the conduit",
      "It's too noisy"
    ],
    correctAnswer: 1,
    explanation: "Excessive force can cause kinks or damage to the conduit structure."
  },
  {
    id: 7,
    question: "What's the risk of a bend radius smaller than recommended?",
    options: [
      "Cable damage and non-compliance with BS 7671",
      "Increased installation time",
      "Higher material costs"
    ],
    correctAnswer: 0,
    explanation: "Too tight bend radius can damage cables and breach BS 7671 requirements."
  },
  {
    id: 8,
    question: "What safety measure should be taken before operating a bending machine?",
    options: [
      "Check the weather",
      "Ensure it's on a stable, level surface",
      "Test with scrap material first"
    ],
    correctAnswer: 1,
    explanation: "The machine must be on a stable, level surface for safe operation."
  }
];

const Module4Section3_2 = () => {
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
              <span className="text-white/60">Section 3.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Using Conduit Bending Machines (PVC and Metal)
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learn to operate conduit bending machines safely for PVC and metal conduit, including machine types, preparation, and accuracy checking.
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
                  <li>Three machine types: hand-operated, hydraulic, and electric</li>
                  <li>PVC requires heating and support; metal requires force and accuracy</li>
                  <li>Safety first: stable surface, PPE, proper machine ratings</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Spot:</strong> Conduit material, diameter, bend requirements</li>
                  <li><strong>Use:</strong> Correct machine type, proper preparation, accurate operation</li>
                  <li><strong>Check:</strong> Bend angle, radius compliance, visual inspection</li>
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
              <li>Identify the different types of conduit bending machines and their uses</li>
              <li>Select the correct machine settings for PVC and metal conduit</li>
              <li>Prepare conduit for bending to avoid faults</li>
              <li>Operate bending machines safely and effectively</li>
              <li>Check and verify bends for accuracy and compliance</li>
            </ul>
          </section>

          {/* Types of Conduit Bending Machines */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Types of Conduit Bending Machines
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Different machine types are suited to different conduit sizes and applications:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Hand-operated Bending Machines</p>
                <p className="text-sm text-white/80 mb-2">Lever-operated, suitable for small-diameter conduit (usually up to 25mm).</p>
                <div className="text-xs text-white/60">
                  <strong>Best for:</strong> Small domestic installations, light commercial work
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Hydraulic Bending Machines</p>
                <p className="text-sm text-white/80 mb-2">Powered assistance for larger diameters or heavy-wall conduit.</p>
                <div className="text-xs text-white/60">
                  <strong>Best for:</strong> Heavy-duty industrial applications, steel conduit over 25mm
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Electric Bending Machines</p>
                <p className="text-sm text-white/80 mb-2">Used in high-volume fabrication workshops for speed and consistency.</p>
                <div className="text-xs text-white/60">
                  <strong>Best for:</strong> Workshop fabrication, repetitive bending operations
                </div>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="machine-type-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>

          {/* Bending PVC Conduit */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Bending PVC Conduit
            </h2>
            <p className="text-sm text-white/80 mb-4">
              PVC conduit requires careful preparation and technique to avoid damage:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-green-400 mb-2">1. Heating</p>
                <p className="text-sm text-white/80 mb-2">PVC conduit requires gentle heat to make it pliable before bending. Use a heat bender or bending spring with a heat gun.</p>
                <div className="text-xs text-white/60">
                  <strong>Temperature:</strong> 70-80°C - <strong>Warning:</strong> Overheating causes damage
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-green-400 mb-2">2. Support</p>
                <p className="text-sm text-white/80 mb-2">Always support the inside of the conduit with a bending spring to prevent collapse.</p>
                <div className="text-xs text-white/60">
                  <strong>Critical:</strong> Spring prevents oval deformation and maintains internal diameter
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-green-400 mb-2">3. Cooling</p>
                <p className="text-sm text-white/80 mb-2">Hold the bend in position until it has cooled to retain shape.</p>
                <div className="text-xs text-white/60">
                  <strong>Time:</strong> Allow 2-3 minutes cooling time for permanent set
                </div>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="safety-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>

          {/* Bending Metal Conduit */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Bending Metal Conduit
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Metal conduit requires more force and precision to achieve accurate bends:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-purple-400 mb-2">1. Machine Selection</p>
                <p className="text-sm text-white/80 mb-2">Requires more force - a fixed-former bending machine is essential.</p>
                <div className="text-xs text-white/60">
                  <strong>Rule:</strong> Match machine capacity to conduit size and wall thickness
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-purple-400 mb-2">2. Setup and Alignment</p>
                <p className="text-sm text-white/80 mb-2">Align the conduit with the former and guide roller before bending.</p>
                <div className="text-xs text-white/60">
                  <strong>Key:</strong> Proper alignment prevents twisted or uneven bends
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-purple-400 mb-2">3. Bending Technique</p>
                <p className="text-sm text-white/80 mb-2">Use smooth, steady pressure to avoid kinks. Mark start and finish points for accuracy.</p>
                <div className="text-xs text-white/60">
                  <strong>Important:</strong> Always check bend radius meets BS 7671 requirements
                </div>
              </div>
            </div>
          </section>

          {/* Safety Considerations */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Safety Considerations
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Safe operation prevents injury and produces better results:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-orange-400 mb-2">Personal Protection</p>
                <p className="text-sm text-white/80 mb-2">Wear gloves when handling heated PVC or freshly bent metal conduit (edges may be sharp).</p>
                <div className="text-xs text-white/60">
                  <strong>PPE Required:</strong> Heat-resistant gloves, safety glasses, protective clothing
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-orange-400 mb-2">Machine Safety</p>
                <p className="text-sm text-white/80 mb-2">Keep hands and clothing clear of moving parts. Ensure stable surface before use.</p>
                <div className="text-xs text-white/60">
                  <strong>Never:</strong> Exceed machine ratings or force operations beyond capacity
                </div>
              </div>
            </div>
          </section>

          {/* Checking Accuracy */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Checking Accuracy
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Verification ensures compliance and quality workmanship:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-red-400 mb-2">Angle Verification</p>
                <p className="text-sm text-white/80 mb-2">Use a protractor or angle gauge to confirm bend angles.</p>
                <div className="text-xs text-white/60">
                  <strong>Tolerance:</strong> ±2 degrees is typically acceptable for most installations
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-red-400 mb-2">Radius and Quality Check</p>
                <p className="text-sm text-white/80 mb-2">Check bend radius with template. Visually inspect for flattening or twisting.</p>
                <div className="text-xs text-white/60">
                  <strong>BS 7671:</strong> Minimum bend radius must be maintained for cable protection
                </div>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="accuracy-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Eye className="w-5 h-5 text-blue-400" />
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-500/50">
              <p className="font-medium text-blue-400 mb-2">Warehouse Installation Project</p>
              <p className="text-sm text-white/80 mb-3">
                On a warehouse project, installers used an undersized bending machine for 32mm steel conduit. The excessive force caused kinks in multiple lengths, resulting in waste and a two-day delay. Switching to a hydraulic bender designed for the conduit size resolved the issue and produced perfect bends.
              </p>
              <div className="p-3 rounded bg-elec-yellow/10 border-l-2 border-elec-yellow/50">
                <p className="text-xs text-white/70">
                  <strong className="text-elec-yellow">Lesson learned:</strong> Always match machine capacity to conduit specifications. The cost of hiring the correct equipment was far less than the material waste and project delay.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-1">Q: Can I bend PVC conduit without heat?</p>
                <p className="text-sm text-white/70">A: Only for very shallow bends - deeper bends require heating to prevent collapse.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-1">Q: What happens if the bend radius is too tight?</p>
                <p className="text-sm text-white/70">A: It can damage the cable insulation during pulling and make installation non-compliant.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-1">Q: Can the same machine be used for both PVC and metal conduit?</p>
                <p className="text-sm text-white/70">A: Some machines can, but settings and accessories may differ - check manufacturer guidance.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Summary
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white/80">
                Using the correct bending machine for PVC and metal conduit ensures accuracy, protects cables, and produces a professional finish. Proper preparation, safe operation, and checking your work are essential for compliance and quality. Remember: match machine to material, follow safety procedures, and verify all bends meet BS 7671 requirements.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz
              questions={quizQuestions}
              title="Knowledge Check: Using Conduit Bending Machines"
            />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Types of Bends
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-3">
                Next: Manual Bending Tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section3_2;
