import { ArrowLeft, ArrowRight, FileText, MapPin, Shield, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
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
              Back to Section 2
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
              <span className="text-white/60">Section 2.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Setting Out for Conduit, Trunking, and Accessories
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master precise setting out techniques to ensure aligned, level, and compliant electrical installations
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2 text-sm">In 30 Seconds</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li>Set out from consistent reference points for accuracy</li>
                  <li>Use correct spacing: conduit 1.2-1.5m, trunking 0.9-1.2m</li>
                  <li>Check for obstructions and mark centre lines for alignment</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2 text-sm">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li><strong>Spot:</strong> Reference points, fixing positions, potential obstructions</li>
                  <li><strong>Use:</strong> Levels for alignment, chalk lines for marking</li>
                  <li><strong>Check:</strong> Measurements, alignment, compliance with drawings</li>
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
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <ul className="text-white/80 text-sm space-y-2 list-disc pl-4">
                <li>Explain the importance of accurate setting out in electrical installations</li>
                <li>Mark out positions for conduit, trunking, and accessories using correct tools</li>
                <li>Apply spacing and alignment standards as per BS 7671 and site requirements</li>
                <li>Identify potential obstructions and adapt setting out to site conditions</li>
                <li>Work systematically to improve efficiency and accuracy</li>
              </ul>
            </div>
          </section>

          {/* Preparation Before Setting Out */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              <FileText className="w-5 h-5" />
              Preparation Before Setting Out
            </h2>
            <p className="text-white/70 text-sm mb-4">
              Thorough preparation prevents errors and ensures efficient, accurate installation:
            </p>
            <div className="space-y-3">
              {preparationSteps.map((step, i) => (
                <div key={i} className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                  <p className="font-medium text-elec-yellow mb-1">{step.step}</p>
                  <p className="text-white/70 text-sm mb-2">{step.description}</p>
                  <p className="text-white/60 text-xs">
                    <strong>Importance:</strong> {step.importance} — Tools: {step.tools.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Tools for Setting Out */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-green-400/80 text-sm font-normal">04</span>
              Tools for Setting Out
            </h2>
            <p className="text-white/70 text-sm mb-4">
              Selecting and using the correct tools ensures accurate and efficient setting out:
            </p>
            <div className="space-y-3">
              {settingOutTools.map((tool, i) => (
                <div key={i} className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                  <p className="font-medium text-green-400 mb-1">{tool.name}</p>
                  <p className="text-white/70 text-sm mb-2">{tool.purpose}</p>
                  <p className="text-white/60 text-xs">
                    <strong>Applications:</strong> {tool.applications.join(', ')} — {tool.bestPractice}
                  </p>
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

          {/* Setting Out Containment Runs */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-purple-400/80 text-sm font-normal">05</span>
              <MapPin className="w-5 h-5" />
              Setting Out Containment Runs
            </h2>
            <p className="text-white/70 text-sm mb-4">
              Systematic approach to marking containment positions for professional results:
            </p>
            <div className="space-y-3">
              {spacingRequirements.map((req, i) => (
                <div key={i} className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                  <p className="font-medium text-purple-400 mb-1">{req.type}</p>
                  <p className="text-white/70 text-sm mb-2">
                    Spacing: <strong>{req.spacing}</strong> — {req.reason}
                  </p>
                  <p className="text-white/60 text-xs">
                    <strong>Considerations:</strong> {req.considerations.join(', ')}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm font-medium text-white mb-1">Setting Out Process</p>
              <p className="text-white/60 text-xs">
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

          {/* Avoiding Common Errors */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-orange-400/80 text-sm font-normal">06</span>
              Avoiding Common Errors
            </h2>
            <p className="text-white/70 text-sm mb-4">
              Learn from typical mistakes to ensure accurate and efficient setting out:
            </p>
            <div className="space-y-3">
              {commonErrors.map((error, i) => (
                <div key={i} className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                  <p className="font-medium text-orange-400 mb-1">{error.error}</p>
                  <p className="text-white/70 text-sm mb-2">Consequence: {error.consequence}</p>
                  <p className="text-white/60 text-xs">
                    <strong>Prevention:</strong> {error.prevention}
                  </p>
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

          {/* Regulatory Requirements */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-red-400/80 text-sm font-normal">07</span>
              <Shield className="w-5 h-5" />
              Regulatory Requirements
            </h2>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="font-medium text-red-400 mb-2">BS 7671 Requirements</p>
                <p className="text-white/70 text-sm mb-2">Containment must be installed in safe zones with correct support spacing.</p>
                <p className="text-white/60 text-xs">
                  <strong>Compliance areas:</strong> Safe zones, support spacing, cable segregation, and protection methods.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="font-medium text-red-400 mb-2">Building Regulations Part M</p>
                <p className="text-white/70 text-sm mb-2">May dictate accessory mounting heights for accessibility.</p>
                <p className="text-white/60 text-xs">
                  <strong>Considerations:</strong> Switch heights, socket positions, accessibility requirements, and ergonomic guidelines.
                </p>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-blue-400/80 text-sm font-normal">08</span>
              <Eye className="w-5 h-5" />
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-500/50">
              <p className="text-white/80 text-sm mb-3">
                On a large office fit-out, the containment was set out without checking for overhead ducting. This meant that
                several trunking runs clashed with HVAC systems and had to be re-routed at extra cost.
              </p>
              <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
                <p className="text-blue-300 text-xs">
                  <strong>Lesson:</strong> Pre-installation checks would have prevented this costly mistake.
                  Always verify site conditions and check for services before setting out.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-white/40 text-sm font-normal">09</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white text-sm mb-1">
                  Q: Can I set out directly from the floor plan dimensions?
                </p>
                <p className="text-white/70 text-sm">
                  A: Only if you've verified the building matches the plan — actual site measurements may differ.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white text-sm mb-1">
                  Q: Is a chalk line better than a laser line?
                </p>
                <p className="text-white/70 text-sm">
                  A: Chalk lines are quicker for marking physical reference lines, while laser lines are better for temporary guides without marking surfaces.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white text-sm mb-1">
                  Q: Should I mark every fixing point?
                </p>
                <p className="text-white/70 text-sm">
                  A: Yes, especially in complex or high-visibility installations, to maintain accuracy.
                </p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-white/40 text-sm font-normal">10</span>
              Summary
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-white/80 text-sm">
                Accurate setting out ensures neat, aligned, and compliant installations. By using the correct tools,
                following plans, and considering site conditions, you can avoid costly mistakes and deliver a professional finish.
                Remember to work from consistent reference points and always verify site conditions before marking.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Test Your Knowledge: Setting Out for Conduit, Trunking, and Accessories" />

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Measurement Tools
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-3">
                Next: Dimensions & Tolerances
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section2_2;
