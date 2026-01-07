import { ArrowLeft, ArrowRight, Package, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Types of Bends and When to Use Them - Module 4.3.1 | Level 2 Electrical Course";
const DESCRIPTION = "Learn about different types of conduit bends, their applications, and when to use each bend type for optimal cable routing and professional installation.";

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "What is the purpose of a 90-degree bend?",
    options: ["To pass over a small obstacle", "To make a sharp change in direction", "To align with a box"],
    correctAnswer: 1,
    explanation: "A 90-degree bend is used to make a sharp change in direction in either horizontal or vertical plane."
  },
  {
    id: 2,
    question: "Which bend type uses two small angles to move conduit sideways?",
    options: ["Offset bend", "Saddle bend", "Kick bend"],
    correctAnswer: 0,
    explanation: "An offset bend uses two small angles to move conduit out of line to align with fittings or avoid obstacles."
  },
  {
    id: 3,
    question: "Is a single saddle bend used for large obstructions?",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False - a single saddle bend is used for small obstructions, while double saddle bends are used for larger obstacles."
  },
  {
    id: 4,
    question: "What shape does a back-to-back bend form?",
    options: ["L shape", "U shape", "S shape", "Straight line"],
    correctAnswer: 1,
    explanation: "A back-to-back bend produces a 'U' shape for drops from ceilings or looping around structures."
  },
  {
    id: 5,
    question: "Why is bend radius important?",
    options: ["For appearance", "To prevent cable damage and maintain compliance", "To save materials", "To speed installation"],
    correctAnswer: 1,
    explanation: "Maintaining proper bend radius prevents cable damage and ensures compliance with BS 7671 requirements."
  },
  {
    id: 6,
    question: "Which bend is typically less than 30 degrees and used for fine alignment?",
    options: ["90-degree bend", "Offset bend", "Kick bend", "Saddle bend"],
    correctAnswer: 2,
    explanation: "A kick bend provides a small directional adjustment (usually &lt;30 degrees) for final alignment into boxes or accessories."
  },
  {
    id: 7,
    question: "What factor determines whether to use single or double saddle bend?",
    options: ["Cable type", "Size of the obstacle", "Material cost", "Installation speed"],
    correctAnswer: 1,
    explanation: "The size of the obstacle determines whether to use a single saddle (small obstacles) or double saddle (larger obstacles)."
  },
  {
    id: 8,
    question: "Which standard covers bend radius requirements?",
    options: ["BS 5839", "BS 7671", "BS EN 50200", "BS 5266"],
    correctAnswer: 1,
    explanation: "BS 7671 covers bend radius requirements and other installation standards for electrical conduit systems."
  }
];

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Which bend type would you use to pass over a medium-sized water pipe?",
    options: ["90-degree bend", "Double saddle bend", "Kick bend", "Offset bend"],
    correctIndex: 1,
    explanation: "A double saddle bend is used to pass over larger obstructions like medium-sized pipes while returning to the same line."
  },
  {
    id: 2,
    question: "What's the main purpose of a kick bend?",
    options: ["Pass over obstacles", "Provide small directional adjustment for final alignment", "Make sharp turns", "Connect multiple conduits"],
    correctIndex: 1,
    explanation: "A kick bend provides a small directional adjustment (usually &lt;30 degrees) for final alignment into boxes or accessories."
  },
  {
    id: 3,
    question: "Why is maintaining minimum bend radius important?",
    options: ["Saves materials", "Prevents cable damage and maintains compliance", "Looks better", "Easier to install"],
    correctIndex: 1,
    explanation: "Maintaining minimum bend radius prevents cable damage, ensures adequate internal space, and maintains compliance with BS 7671."
  }
];

// Common bend types
const bendTypes = [
  {
    type: "90-Degree Bend (Right-Angle Bend)",
    purpose: "Sharp change in direction in horizontal or vertical plane",
    applications: ["Corner turns", "Changes between floor and wall", "Wall to ceiling transitions"],
    considerations: "Maintain minimum bend radius to avoid cable damage",
    icon: "↻"
  },
  {
    type: "Offset Bend",
    purpose: "Moves conduit out of line to align with fitting or avoid obstacle",
    applications: ["Aligning with socket boxes on uneven walls", "Small obstacle avoidance"],
    considerations: "Often uses two bends of 10–22.5 degrees",
    icon: "⤴"
  },
  {
    type: "Single Saddle Bend",
    purpose: "Passes over small obstructions",
    applications: ["Crossing small pipes", "Avoiding minor obstacles"],
    considerations: "Returns to original line after obstacle",
    icon: "∩"
  },
  {
    type: "Double Saddle Bend",
    purpose: "Passes over larger obstructions while returning to same line",
    applications: ["Crossing larger services", "Major obstacle avoidance"],
    considerations: "More complex than single saddle but maintains alignment",
    icon: "∪∩"
  },
  {
    type: "Back-to-Back Bend",
    purpose: "Produces a 'U' shape for tight directional changes",
    applications: ["Drops from ceilings", "Looping around structures", "Space-limited areas"],
    considerations: "Useful where space is restricted",
    icon: "⊃"
  },
  {
    type: "Kick Bend",
    purpose: "Small directional adjustment (usually &lt;30 degrees)",
    applications: ["Final adjustment into boxes", "Minor alignment corrections"],
    considerations: "Fine-tuning tool for neat terminations",
    icon: "⤷"
  }
];

// Factors influencing bend selection
const selectionFactors = [
  {
    factor: "Cable Size and Type",
    description: "Larger cables require gentler bend radii",
    consideration: "Check cable specifications for minimum bend radius",
    impact: "Incorrect radius can damage cable insulation"
  },
  {
    factor: "Conduit Material",
    description: "Different materials have different bending capabilities",
    consideration: "PVC allows tighter bends than steel conduit",
    impact: "Steel requires careful radius maintenance"
  },
  {
    factor: "Space Constraints",
    description: "Available space dictates possible bend types",
    consideration: "Tight spaces may limit bend options",
    impact: "May require specific bend combinations"
  },
  {
    factor: "Obstacle Type and Size",
    description: "Nature of obstruction determines saddle bend choice",
    consideration: "Small pipes need single saddle, large ducts need double",
    impact: "Wrong choice leads to poor routing"
  },
  {
    factor: "Aesthetic Requirements",
    description: "Visible runs must look professional and uniform",
    consideration: "Maintain consistent angles and alignment",
    impact: "Poor appearance affects client satisfaction"
  }
];

// Best practices
const bestPractices = [
  {
    practice: "Measure and Mark First",
    description: "Always measure and mark conduit before bending",
    application: "All bending operations",
    benefit: "Prevents waste and ensures accuracy"
  },
  {
    practice: "Use Correct Tools",
    description: "Select appropriate bending tool for conduit size and type",
    application: "Tool selection for each job",
    benefit: "Produces clean, accurate bends"
  },
  {
    practice: "Avoid Damage",
    description: "Prevent kinks, flattening, or over-bending",
    application: "During bending process",
    benefit: "Maintains conduit integrity and cable protection"
  },
  {
    practice: "Maintain Consistency",
    description: "Keep bends consistent in angle and radius",
    application: "Multiple bends on same installation",
    benefit: "Professional appearance and uniform performance"
  },
  {
    practice: "Check Before Fixing",
    description: "Verify alignment before permanent installation",
    application: "Before final securing",
    benefit: "Avoids rework and ensures proper fit"
  }
];

const Module4Section3_1 = () => {
  useSEO(TITLE, DESCRIPTION);

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
              <Package className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.3.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Types of Bends and When to Use Them
          </h1>
          <p className="text-white">
            Learn about different types of conduit bends, their applications, and when to use each bend type for optimal cable routing.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Six main bend types: 90-degree, offset, saddle, back-to-back, kick bends.</li>
                <li>Each bend serves specific purposes: direction changes, obstacle avoidance, alignment.</li>
                <li>Selection depends on cable size, material, space, and aesthetic requirements.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Route requirements, obstacles, space constraints, alignment needs.</li>
                <li><strong>Use:</strong> Appropriate bend type, correct tools, proper technique.</li>
                <li><strong>Check:</strong> Bend radius, alignment, consistency, cable protection.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Identify the main bend types used in electrical conduit installations.</li>
            <li>Understand the applications and benefits of each bend type.</li>
            <li>Apply correct bend selection to various site conditions.</li>
            <li>Recognise the implications of incorrect bending on safety and compliance.</li>
            <li>Follow best practice for producing accurate, regulation-compliant bends.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Common Bend Types */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Common Bend Types and Applications</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Understanding the different bend types and their specific applications:
            </p>
            
            <div className="space-y-4">
              {bendTypes.map((bend, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">{bend.type}</p>
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Purpose:</strong> {bend.purpose}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border mb-2">
                        <strong>Applications:</strong> {bend.applications.join(", ")}
                      </div>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                        <strong>Considerations:</strong> {bend.considerations}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Factors Influencing Selection */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Factors Influencing Bend Selection</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Multiple factors determine the most appropriate bend type for each situation:
            </p>
            
            <div className="space-y-4">
              {selectionFactors.map((factor, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-green-600 dark:text-green-400 mb-1">{factor.factor}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">{factor.description}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                        <strong>Consideration:</strong> {factor.consideration} - <strong>Impact:</strong> {factor.impact}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <InlineCheck
            id="bend-selection-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Best Practice in Bend Production */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Best Practice in Bend Production</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Following best practices ensures professional results and compliance:
            </p>
            
            <div className="space-y-4">
              {bestPractices.map((practice, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-purple-600 text-elec-yellow mb-1">{practice.practice}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">{practice.description}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                        <strong>Application:</strong> {practice.application} - <strong>Benefit:</strong> {practice.benefit}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <InlineCheck
            id="kick-bend-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          <InlineCheck
            id="bend-radius-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </Card>

        {/* Real-world example */}
        <Card className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-800 dark:text-white mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Real-World Example
          </h3>
          <p className="text-sm text-blue-700 text-elec-yellow">
            During an office refit, the electrical team had to run conduit above suspended ceilings, with multiple water pipes crossing the planned route. Instead of rerouting the entire run, the installer used double saddle bends, maintaining neatness and avoiding unnecessary joints. The run was installed in half the time compared to an alternative route.
          </p>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-6 bg-transparent border-white/20">
          <h3 className="font-semibold text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-white mb-1">Q: Can I form bends by hand without tools?</p>
              <p className="text-xs sm:text-sm text-white">A: Only with small adjustments in flexible conduit. Rigid steel or PVC conduit requires bending tools.</p>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Q: What happens if I bend conduit too tightly?</p>
              <p className="text-xs sm:text-sm text-white">A: It can damage the cable insulation, reduce internal space, and breach BS 7671 requirements.</p>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Q: How can I make sure my bends match?</p>
              <p className="text-xs sm:text-sm text-white">A: Use consistent measurement marks and the same tool settings each time.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h3 className="font-semibold text-white mb-3">Summary</h3>
          <p className="text-xs sm:text-sm text-white">
            Each bend type serves a specific function. Selecting the correct bend based on site conditions, obstacles, and design requirements is key to efficiency, safety, and compliance. Accurate bending keeps cables safe, maintains installation standards, and creates a professional finish.
          </p>
        </Card>

        {/* Quiz */}
        <Card className="mb-8 bg-transparent border-white/20">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-lg sm:text-xl font-semibold text-white">Quiz</h3>
            <p className="text-sm text-white mt-2">Test your knowledge of conduit bend types</p>
          </div>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="module4-section3/subsection2">
              Next: Subsection 2
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section3_1;