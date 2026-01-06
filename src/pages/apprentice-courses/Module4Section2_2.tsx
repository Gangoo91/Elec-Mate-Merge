import { ArrowLeft, ArrowRight, FileText, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Setting Out for Conduit, Trunking, and Accessories - Module 4.2.2 | Level 2 Electrical Course";
const DESCRIPTION = "Master precise setting out techniques for conduit, trunking, and accessories to ensure aligned, level, and compliant electrical installations.";

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "Which tool provides a temporary visual guide without leaving marks?",
    options: ["Chalk line", "Laser level", "Tape measure", "Marker pen"],
    correctAnswer: 1,
    explanation: "A laser level provides a temporary visual guide without leaving any permanent marks on surfaces."
  },
  {
    id: 2,
    question: "Should you skip setting out if you've installed similar systems before?",
    options: ["True - experience is enough", "False - each site is different", "Only for simple installations", "Only if time is limited"],
    correctAnswer: 1,
    explanation: "False - each site is different and has unique conditions, obstructions, and requirements that must be assessed."
  },
  {
    id: 3,
    question: "What is the typical spacing for fixing trunking horizontally?",
    options: ["0.5-0.8m", "0.9-1.2m", "1.5-2.0m", "2.0-2.5m"],
    correctAnswer: 1,
    explanation: "Trunking should typically be fixed horizontally at intervals of 0.9-1.2m for adequate support."
  },
  {
    id: 4,
    question: "Why should you mark centre lines when setting out conduit runs?",
    options: ["It looks more professional", "To keep runs straight and symmetrical", "It's required by law", "To save materials"],
    correctAnswer: 1,
    explanation: "Marking centre lines helps maintain straight, symmetrical runs and ensures consistent alignment throughout the installation."
  },
  {
    id: 5,
    question: "Which regulation specifies safe zones for cable containment?",
    options: ["BS 7671", "BS 5839", "BS 5266", "BS EN 61439"],
    correctAnswer: 0,
    explanation: "BS 7671 (IET Wiring Regulations) specifies the requirements for safe zones and cable containment."
  },
  {
    id: 6,
    question: "What is one common mistake made when setting out accessory positions?",
    options: ["Using too many tools", "Working too slowly", "Measuring from different reference points", "Following drawings exactly"],
    correctAnswer: 2,
    explanation: "Measuring from different reference points or ignoring accessory size leads to misaligned installations."
  },
  {
    id: 7,
    question: "How do you ensure all socket outlets are aligned in a row?",
    options: ["Measure each individually", "Use a spirit or laser level", "Estimate by eye", "Use a tape measure only"],
    correctAnswer: 1,
    explanation: "Using a spirit or laser level ensures all socket outlets are aligned horizontally in a straight line."
  },
  {
    id: 8,
    question: "What should be checked before marking containment positions on site?",
    options: ["Only the weather", "Site measurements, obstructions, and surface suitability", "Just the tools available", "Only the time schedule"],
    correctAnswer: 1,
    explanation: "Site measurements, obstructions, and surface suitability must all be checked before marking positions."
  }
];

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the typical fixing spacing for horizontal conduit runs?",
    options: ["0.8-1.0m", "1.2-1.5m", "2.0-2.5m", "3.0m or more"],
    correctIndex: 1,
    explanation: "Horizontal conduit runs should typically be fixed every 1.2-1.5m to provide adequate support and prevent sagging."
  },
  {
    id: 2,
    question: "Why is it important to use a consistent reference point during setting out?",
    options: ["To save time", "To maintain alignment and accuracy", "It's not important", "To use fewer tools"],
    correctIndex: 1,
    explanation: "Using a consistent reference point ensures all measurements are accurate and all components align properly throughout the installation."
  },
  {
    id: 3,
    question: "Name two tools used for long, straight containment markings.",
    options: ["Hammer and screwdriver", "Chalk line and laser level", "Tape measure and pencil", "Spirit level and ruler"],
    correctIndex: 1,
    explanation: "Chalk lines and laser levels are the primary tools for creating long, straight reference lines for containment marking."
  }
];

// Preparation data
const preparationSteps = [
  {
    step: "Review Installation Drawings",
    description: "Study drawings and specifications to understand routing and positioning requirements",
    importance: "Prevents errors and ensures compliance with design intent",
    tools: ["Installation drawings", "Specifications", "Site plans"]
  },
  {
    step: "Check Site Conditions",
    description: "Ensure surfaces are suitable for fixing and containment installation",
    importance: "Identifies potential problems before installation begins",
    tools: ["Visual inspection", "Surface testing", "Structural assessment"]
  },
  {
    step: "Identify Hazards and Obstructions",
    description: "Locate pipes, structural beams, ventilation ducts, and other obstacles",
    importance: "Prevents clashes and ensures safe working conditions",
    tools: ["Cable detectors", "Building plans", "Site survey"]
  }
];

// Setting out tools
const settingOutTools = [
  {
    name: "Tape Measure / Laser Measure",
    purpose: "Measuring distances accurately for positioning",
    applications: ["Distance measurement", "Spacing calculations", "Dimensional verification"],
    bestPractice: "Use same measuring tool throughout project for consistency"
  },
  {
    name: "Spirit or Laser Level",
    purpose: "Ensuring straight and level runs of containment",
    applications: ["Horizontal alignment", "Vertical alignment", "Level verification"],
    bestPractice: "Check calibration regularly and protect from damage"
  },
  {
    name: "Chalk Line",
    purpose: "Marking long runs accurately with visible lines",
    applications: ["Long containment runs", "Reference lines", "Alignment guides"],
    bestPractice: "Use appropriate chalk colour for surface visibility"
  },
  {
    name: "Marker or Pencil",
    purpose: "Marking visible fixing points and positions",
    applications: ["Fixing point marking", "Position marking", "Reference points"],
    bestPractice: "Choose marking tool appropriate for surface type"
  }
];

// Containment spacing requirements
const spacingRequirements = [
  {
    type: "Conduit (Horizontal)",
    spacing: "1.2-1.5m",
    reason: "Prevents sagging and maintains alignment",
    considerations: ["Cable weight", "Conduit diameter", "Environmental conditions"]
  },
  {
    type: "Conduit (Vertical)",
    spacing: "1.0-1.2m",
    reason: "Supports weight and prevents movement",
    considerations: ["Cable pulling forces", "Conduit material", "Wall fixing type"]
  },
  {
    type: "Trunking (Horizontal)",
    spacing: "0.9-1.2m",
    reason: "Supports trunking weight and prevents deflection",
    considerations: ["Trunking size", "Cable load", "Manufacturer specifications"]
  },
  {
    type: "Trunking (Vertical)",
    spacing: "0.8-1.0m",
    reason: "Handles additional weight from vertical cable runs",
    considerations: ["Total cable weight", "Trunking material", "Wall structure"]
  }
];

// Common errors
const commonErrors = [
  {
    error: "Skipping the use of levels",
    consequence: "Results in slanted runs and poor appearance",
    prevention: "Always use spirit or laser levels for alignment"
  },
  {
    error: "Measuring from inconsistent reference points",
    consequence: "Causes cumulative errors and misalignment",
    prevention: "Establish and maintain consistent datum points"
  },
  {
    error: "Failing to account for accessory size",
    consequence: "Accessories don't fit properly or clash with containment",
    prevention: "Consider accessory dimensions during marking"
  },
  {
    error: "Not allowing space for expansion",
    consequence: "No room for future cables or thermal movement",
    prevention: "Plan for expansion joints and spare capacity"
  }
];

const Module4Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header (matches Module 4.2.1 style) */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.2.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Setting Out for Conduit, Trunking, and Accessories
          </h1>
          <p className="text-white">
            Master precise setting out techniques to ensure aligned, level, and compliant electrical installations.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Set out from consistent reference points for accuracy.</li>
                <li>Use correct spacing: conduit 1.2-1.5m, trunking 0.9-1.2m.</li>
                <li>Check for obstructions and mark centre lines for alignment.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Reference points, fixing positions, potential obstructions.</li>
                <li><strong>Use:</strong> Levels for alignment, chalk lines for marking, correct spacing.</li>
                <li><strong>Check:</strong> Measurements, alignment, compliance with drawings.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Explain the importance of accurate setting out in electrical installations.</li>
            <li>Mark out positions for conduit, trunking, and accessories using correct tools.</li>
            <li>Apply spacing and alignment standards as per BS 7671 and site requirements.</li>
            <li>Identify potential obstructions and adapt setting out to site conditions.</li>
            <li>Work systematically to improve efficiency and accuracy.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Preparation Before Setting Out */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Preparation Before Setting Out</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Thorough preparation prevents errors and ensures efficient, accurate installation:
            </p>
            
            <div className="space-y-4">
              {preparationSteps.map((step, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">{step.step}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">{step.description}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                        <strong>Importance:</strong> {step.importance} - Tools: {step.tools.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tools for Setting Out */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Tools for Setting Out</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Selecting and using the correct tools ensures accurate and efficient setting out:
            </p>
            
            <div className="space-y-4">
              {settingOutTools.map((tool, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-green-600 dark:text-green-400 mb-1">{tool.name}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">{tool.purpose}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                        <strong>Applications:</strong> {tool.applications.join(', ')} - {tool.bestPractice}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <InlineCheck
            id="spacing-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Setting Out Containment Runs */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Setting Out Containment Runs
            </h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Systematic approach to marking containment positions for professional results:
            </p>
            
            <div className="space-y-4">
              {spacingRequirements.map((req, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-purple-600 text-elec-yellow mb-1">{req.type}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">Spacing: <strong>{req.spacing}</strong> - {req.reason}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                        <strong>Considerations:</strong> {req.considerations.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-transparent border border-border/30 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">Setting Out Process</p>
              <p className="text-xs text-white">
                Start from known reference points, mark centre lines for symmetry, use consistent spacing between fixing points, 
                and allow for bends, junctions, and expansion where necessary.
              </p>
            </div>
          </section>

          <InlineCheck
            id="reference-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Avoiding Common Errors */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Avoiding Common Errors</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Learn from typical mistakes to ensure accurate and efficient setting out:
            </p>
            
            <div className="space-y-4">
              {commonErrors.map((error, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">!</span>
                    <div className="flex-1">
                      <p className="font-semibold text-orange-600 text-elec-yellow mb-1">{error.error}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">Consequence: {error.consequence}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                        <strong>Prevention:</strong> {error.prevention}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <InlineCheck
            id="tools-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Regulatory Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Regulatory Requirements
            </h3>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-1">BS 7671 Requirements</p>
                    <p className="text-xs sm:text-sm text-white mb-2">Containment must be installed in safe zones with correct support spacing.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Compliance areas:</strong> Safe zones, support spacing, cable segregation, and protection methods.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-1">Building Regulations Part M</p>
                    <p className="text-xs sm:text-sm text-white mb-2">May dictate accessory mounting heights for accessibility.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Considerations:</strong> Switch heights, socket positions, accessibility requirements, and ergonomic guidelines.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-8 p-6 bg-elec-yellow/5 dark:bg-elec-yellow/10 border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Real-World Example
          </h3>
          <p className="text-blue-900 dark:text-blue-100 text-sm mb-3">
            On a large office fit-out, the containment was set out without checking for overhead ducting. This meant that 
            several trunking runs clashed with HVAC systems and had to be re-routed at extra cost.
          </p>
          <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded p-3">
            <p className="text-xs text-blue-800 dark:text-blue-200">
              <strong>Lesson:</strong> Pre-installation checks would have prevented this costly mistake. 
              Always verify site conditions and check for services before setting out.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-6 bg-transparent border-white/20">
          <h3 className="font-semibold text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-white text-sm mb-1">
                Q: Can I set out directly from the floor plan dimensions?
              </p>
              <p className="text-white text-sm">
                A: Only if you've verified the building matches the plan — actual site measurements may differ.
              </p>
            </div>
            <div>
              <p className="font-medium text-white text-sm mb-1">
                Q: Is a chalk line better than a laser line?
              </p>
              <p className="text-white text-sm">
                A: Chalk lines are quicker for marking physical reference lines, while laser lines are better for temporary guides without marking surfaces.
              </p>
            </div>
            <div>
              <p className="font-medium text-white text-sm mb-1">
                Q: Should I mark every fixing point?
              </p>
              <p className="text-white text-sm">
                A: Yes, especially in complex or high-visibility installations, to maintain accuracy.
              </p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Summary
          </h3>
          <p className="text-white text-sm">
            Accurate setting out ensures neat, aligned, and compliant installations. By using the correct tools, 
            following plans, and considering site conditions, you can avoid costly mistakes and deliver a professional finish. 
            Remember to work from consistent reference points and always verify site conditions before marking.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Test Your Knowledge: Setting Out for Conduit, Trunking, and Accessories" />

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Measurement Tools
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="../2-3">
              Next: Following Dimensions and Tolerances
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section2_2;