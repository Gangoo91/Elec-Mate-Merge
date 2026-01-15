import { ArrowLeft, ArrowRight, AlertTriangle, Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Avoiding Common Errors in Measurement and Positioning - Module 4.2.4 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to identify and prevent common measurement and positioning errors in electrical installation to ensure accuracy, compliance, and professional results.";

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "What is the main cause of parallax error?",
    options: ["Using the wrong tool", "Viewing the measurement scale at an angle", "Measuring in poor lighting", "Mixing units"],
    correctAnswer: 1,
    explanation: "Parallax error occurs when viewing the measurement scale at an angle rather than directly perpendicular to it."
  },
  {
    id: 2,
    question: "Is working from memory acceptable for short measurements?",
    options: ["True - memory is reliable for short distances", "False - always record measurements", "Only for experienced electricians", "Only in good lighting"],
    correctAnswer: 1,
    explanation: "False - working from memory is not acceptable even for short measurements as it increases the risk of errors."
  },
  {
    id: 3,
    question: "Which are common positioning errors in electrical installation?",
    options: ["Using correct tools", "Misaligned sockets and incorrect mounting heights", "Following drawings exactly", "Double-checking measurements"],
    correctAnswer: 1,
    explanation: "Misaligned sockets or switches in a row and incorrect mounting heights are common positioning errors."
  },
  {
    id: 4,
    question: "What is the best way to ensure accuracy before drilling holes?",
    options: ["Drill immediately", "Marking and cross-checking with verification", "Use any available tool", "Work quickly"],
    correctAnswer: 1,
    explanation: "Marking positions and cross-checking with a second person or using levels/lasers ensures accuracy before drilling."
  },
  {
    id: 5,
    question: "Which phrase summarises the best practice for avoiding measurement mistakes?",
    options: ["Cut first, measure later", "Measure twice, cut once", "Measure once, cut twice", "Guess and check"],
    correctAnswer: 1,
    explanation: "'Measure twice, cut once' is the golden rule that prevents costly measurement errors."
  },
  {
    id: 6,
    question: "Why should you use the same measuring tool throughout a project?",
    options: ["It's cheaper", "To maintain consistency and avoid variations", "It's faster", "It looks more professional"],
    correctAnswer: 1,
    explanation: "Using the same measuring tool maintains consistency and avoids small variations between different devices."
  },
  {
    id: 7,
    question: "What should you do if a drawing measurement doesn't match site conditions?",
    options: ["Ignore the drawing", "Verify with the site supervisor", "Use your best judgment", "Pick the easier option"],
    correctAnswer: 1,
    explanation: "Always verify with the site supervisor before making changes when drawings don't match site conditions."
  },
  {
    id: 8,
    question: "What is one financial consequence of poor measurement?",
    options: ["Lower wages", "Extra material costs from rework", "Better profit margins", "Faster completion"],
    correctAnswer: 1,
    explanation: "Poor measurement leads to extra material costs from rework, delays, and potential failed inspections."
  }
];

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is a parallax error?",
    options: ["Using wrong units", "Incorrect reading due to viewing scale at an angle", "Measuring too quickly", "Using broken tools"],
    correctIndex: 1,
    explanation: "Parallax error occurs when you view the measurement scale at an angle rather than directly perpendicular, causing misreadings."
  },
  {
    id: 2,
    question: "Why is it important to measure from the correct reference point?",
    options: ["It's faster", "Prevents cumulative errors and ensures accuracy", "It's easier", "Saves materials"],
    correctIndex: 1,
    explanation: "Using the correct reference point prevents cumulative errors and ensures all measurements are consistent and accurate."
  },
  {
    id: 3,
    question: "Name one method to verify measurements before fixing.",
    options: ["Work faster", "Have a second person verify measurements", "Use different tools", "Skip verification"],
    correctIndex: 1,
    explanation: "Having a second person verify critical measurements is an effective method to catch errors before installation."
  }
];

// Common measurement errors
const measurementErrors = [
  {
    error: "Incorrect Reference Point",
    description: "Measuring from the wrong datum point",
    example: "Using unfinished floor level instead of finished floor level",
    prevention: "Always confirm reference points from drawings and site conditions"
  },
  {
    error: "Reading Errors",
    description: "Misreading measurement scales or mixing units",
    example: "Confusing metric and imperial units, misreading tape markings",
    prevention: "Use consistent units and read scales carefully at eye level"
  },
  {
    error: "Parallax Error",
    description: "Incorrect reading due to viewing scale at an angle",
    example: "Reading tape measure from side angle causing false readings",
    prevention: "Always view measurement scales directly perpendicular"
  },
  {
    error: "Cumulative Error",
    description: "Small mistakes that compound over long runs",
    example: "1mm errors adding up to 15mm over 15 measurements",
    prevention: "Use consistent reference points and recheck at intervals"
  }
];

// Common positioning errors
const positioningErrors = [
  {
    error: "Misaligned Accessories",
    description: "Sockets or switches not aligned in rows",
    impact: "Poor appearance and unprofessional finish",
    prevention: "Use spirit levels and string lines for alignment"
  },
  {
    error: "Incorrect Mounting Heights",
    description: "Accessories installed at wrong heights",
    impact: "Regulation breaches and accessibility issues",
    prevention: "Follow drawings and verify heights with supervisor"
  },
  {
    error: "Wrong Location Drilling",
    description: "Drilling holes in incorrect positions",
    impact: "Wall damage and costly repairs",
    prevention: "Mark positions clearly and double-check before drilling"
  },
  {
    error: "Outside Safe Zones",
    description: "Installing accessories outside cable safe zones",
    impact: "BS 7671 non-compliance and safety risks",
    prevention: "Understand safe zone requirements and verify positions"
  }
];

// Causes of errors
const errorCauses = [
  {
    cause: "Rushing Without Checking",
    description: "Working too quickly without verification",
    consequences: ["Measurement errors", "Positioning mistakes", "Rework requirements"],
    solution: "Build verification time into work schedule"
  },
  {
    cause: "Working from Memory",
    description: "Relying on memory rather than recorded measurements",
    consequences: ["Forgotten dimensions", "Inconsistent measurements", "Accumulating errors"],
    solution: "Always record and refer to written measurements"
  },
  {
    cause: "Poor Working Conditions",
    description: "Inadequate lighting or difficult access",
    consequences: ["Reading errors", "Marking mistakes", "Safety risks"],
    solution: "Ensure adequate lighting and safe working conditions"
  },
  {
    cause: "Tool Condition",
    description: "Using worn or inaccurate measuring equipment",
    consequences: ["Systematic errors", "Inconsistent readings", "Compounding mistakes"],
    solution: "Maintain tools in good condition and calibrate regularly"
  }
];

// Best practices
const bestPractices = [
  {
    practice: "Measure Twice, Cut Once",
    description: "The golden rule for avoiding costly mistakes",
    application: "All cutting and drilling operations",
    benefit: "Prevents material waste and rework"
  },
  {
    practice: "Work from Confirmed Drawings",
    description: "Always use verified drawings and site measurements",
    application: "All positioning and measurement tasks",
    benefit: "Ensures compliance with design intent"
  },
  {
    practice: "Use Consistent Equipment",
    description: "Same measuring tools throughout the project",
    application: "All measurement operations",
    benefit: "Avoids variations between different tools"
  },
  {
    practice: "Mark Before Action",
    description: "Clearly mark all positions before cutting or drilling",
    application: "All installation work",
    benefit: "Visual verification prevents errors"
  },
  {
    practice: "Maintain Tool Condition",
    description: "Keep measuring tools accurate and in good repair",
    application: "Daily tool checks and maintenance",
    benefit: "Ensures consistent accuracy"
  }
];

// Cross-checking methods
const crossCheckingMethods = [
  {
    method: "Second Person Verification",
    description: "Have colleague verify critical measurements",
    when: "Important dimensions and positions",
    effectiveness: "Catches most human errors"
  },
  {
    method: "Drawing Comparison",
    description: "Compare markings against drawings before work",
    when: "Before cutting or drilling",
    effectiveness: "Ensures design compliance"
  },
  {
    method: "Visual and Level Checking",
    description: "Check alignment visually and with levels",
    when: "Before final fixing",
    effectiveness: "Confirms proper positioning"
  },
  {
    method: "Progressive Verification",
    description: "Check measurements at regular intervals",
    when: "Long runs and complex installations",
    effectiveness: "Prevents cumulative errors"
  }
];

const Module4Section2_4 = () => {
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
              <span className="text-white/60">Section 2.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Avoiding Common Errors in Measurement and Positioning
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learn to identify and prevent common measurement and positioning errors for accuracy and professional results
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
                  <li>Common errors: wrong reference points, reading mistakes, alignment issues</li>
                  <li>Golden rule: measure twice, cut/drill once for accuracy</li>
                  <li>Cross-check with second person and verify against drawings</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2 text-sm">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li><strong>Spot:</strong> Error patterns, wrong reference points, alignment issues</li>
                  <li><strong>Use:</strong> Verification methods, consistent tools, proper lighting</li>
                  <li><strong>Check:</strong> Measurements twice, alignment before fixing</li>
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
                <li>Identify common measurement and positioning errors in electrical work</li>
                <li>Understand the causes and consequences of these errors</li>
                <li>Apply best practices to avoid mistakes</li>
                <li>Use tools and methods that ensure accurate placement of electrical components</li>
                <li>Cross-check measurements before and after installation</li>
              </ul>
            </div>
          </section>

          {/* Common Measurement Errors */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Common Measurement Errors
            </h2>
            <p className="text-white/70 text-sm mb-4">
              Understanding typical measurement mistakes helps prevent costly errors:
            </p>
            <div className="space-y-3">
              {measurementErrors.map((error, i) => (
                <div key={i} className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                  <p className="font-medium text-elec-yellow mb-1">{error.error}</p>
                  <p className="text-white/70 text-sm mb-2">{error.description}</p>
                  <p className="text-white/60 text-xs">
                    <strong>Example:</strong> {error.example} — <strong>Prevention:</strong> {error.prevention}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Common Positioning Errors */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-green-400/80 text-sm font-normal">04</span>
              Common Positioning Errors
            </h2>
            <p className="text-white/70 text-sm mb-4">
              Positioning mistakes affect both appearance and compliance:
            </p>
            <div className="space-y-3">
              {positioningErrors.map((error, i) => (
                <div key={i} className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                  <p className="font-medium text-green-400 mb-1">{error.error}</p>
                  <p className="text-white/70 text-sm mb-2">{error.description}</p>
                  <p className="text-white/60 text-xs">
                    <strong>Impact:</strong> {error.impact} — <strong>Prevention:</strong> {error.prevention}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <InlineCheck
            id="parallax-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Causes of Errors */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-purple-400/80 text-sm font-normal">05</span>
              Causes of Errors
            </h2>
            <p className="text-white/70 text-sm mb-4">
              Understanding root causes helps develop effective prevention strategies:
            </p>
            <div className="space-y-3">
              {errorCauses.map((cause, i) => (
                <div key={i} className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                  <p className="font-medium text-purple-400 mb-1">{cause.cause}</p>
                  <p className="text-white/70 text-sm mb-2">{cause.description}</p>
                  <p className="text-white/60 text-xs">
                    <strong>Consequences:</strong> {cause.consequences.join(', ')} — <strong>Solution:</strong> {cause.solution}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <InlineCheck
            id="reference-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Best Practices to Avoid Errors */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-orange-400/80 text-sm font-normal">06</span>
              Best Practices to Avoid Errors
            </h2>
            <p className="text-white/70 text-sm mb-4">
              Proven methods to maintain accuracy and prevent mistakes:
            </p>
            <div className="space-y-3">
              {bestPractices.map((practice, i) => (
                <div key={i} className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                  <p className="font-medium text-orange-400 mb-1">{practice.practice}</p>
                  <p className="text-white/70 text-sm mb-2">{practice.description}</p>
                  <p className="text-white/60 text-xs">
                    <strong>Application:</strong> {practice.application} — <strong>Benefit:</strong> {practice.benefit}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm font-medium text-white mb-1">Additional Tips</p>
              <p className="text-white/60 text-xs">
                Keep drawings nearby and mark off completed checks. Work in pairs for large-scale measurements
                to avoid tape sag errors and provide verification.
              </p>
            </div>
          </section>

          <InlineCheck
            id="verification-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Cross-Checking and Verification */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-red-400/80 text-sm font-normal">07</span>
              <Search className="w-5 h-5" />
              Cross-Checking and Verification
            </h2>
            <div className="space-y-3">
              {crossCheckingMethods.map((method, i) => (
                <div key={i} className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                  <p className="font-medium text-red-400 mb-1">{method.method}</p>
                  <p className="text-white/70 text-sm mb-2">{method.description}</p>
                  <p className="text-white/60 text-xs">
                    <strong>When:</strong> {method.when} — <strong>Effectiveness:</strong> {method.effectiveness}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Consequences of Poor Measurement */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-red-400/80 text-sm font-normal">08</span>
              <AlertTriangle className="w-5 h-5" />
              Consequences of Poor Measurement
            </h2>
            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="font-medium text-red-400 mb-2">Impact of Measurement Errors</p>
              <div className="text-white/80 text-sm space-y-2">
                <p>• <strong>Project delays</strong> due to rework requirements</p>
                <p>• <strong>Failed inspections</strong> from non-compliance issues</p>
                <p>• <strong>Increased costs</strong> from material waste and additional labour</p>
                <p>• <strong>Safety hazards</strong> if equipment is incorrectly positioned</p>
              </div>
              <div className="mt-3 p-3 rounded bg-red-500/10 border border-red-500/20">
                <p className="text-red-300 text-xs">
                  <strong>Prevention is key:</strong> The cost of verification is always less than the cost of correction.
                </p>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-blue-400/80 text-sm font-normal">09</span>
              <Eye className="w-5 h-5" />
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-500/50">
              <p className="text-white/80 text-sm mb-3">
                On a new office fit-out, an electrician measured socket positions from the subfloor rather than the final raised floor level.
                When the flooring was installed, all sockets ended up 50 mm too low, requiring them to be removed and repositioned at a significant cost.
              </p>
              <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
                <p className="text-blue-300 text-xs">
                  <strong>Lesson:</strong> Always confirm reference points from drawings and verify with site conditions.
                  Using the wrong datum point can cause systematic errors affecting the entire installation.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-white/40 text-sm font-normal">10</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white text-sm mb-1">
                  Q: If I'm confident in my measuring skills, do I still need to double-check?
                </p>
                <p className="text-white/70 text-sm">
                  A: Yes — confidence is not a substitute for verification, especially on critical dimensions.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white text-sm mb-1">
                  Q: Can I use different measuring tools on the same job?
                </p>
                <p className="text-white/70 text-sm">
                  A: It's best to stick to one tool type to avoid variations between devices.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white text-sm mb-1">
                  Q: What should I do if the drawing measurement conflicts with on-site conditions?
                </p>
                <p className="text-white/70 text-sm">
                  A: Confirm with the site supervisor before making adjustments.
                </p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-white/40 text-sm font-normal">11</span>
              Summary
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-white/80 text-sm">
                Avoiding measurement and positioning errors comes down to preparation, precision, and verification.
                Consistency in methods, adherence to drawings, and cross-checking will greatly reduce costly mistakes.
                Remember: measure twice, cut once, and always verify critical measurements before installation.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Test Your Knowledge: Avoiding Common Errors in Measurement and Positioning" />

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Dimensions & Tolerances
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Complete Section 2
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section2_4;
