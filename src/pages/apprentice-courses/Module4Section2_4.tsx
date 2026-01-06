import { ArrowLeft, ArrowRight, Package, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
              <Package className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.2.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Avoiding Common Errors in Measurement and Positioning
          </h1>
          <p className="text-white">
            Learn to identify and prevent common measurement and positioning errors to ensure accuracy, compliance, and professional results.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Common errors: wrong reference points, reading mistakes, alignment issues.</li>
                <li>Golden rule: measure twice, cut/drill once for accuracy.</li>
                <li>Cross-check with second person and verify against drawings.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Error patterns, wrong reference points, alignment issues.</li>
                <li><strong>Use:</strong> Verification methods, consistent tools, proper lighting.</li>
                <li><strong>Check:</strong> Measurements twice, alignment before fixing, drawing compliance.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Identify common measurement and positioning errors in electrical work.</li>
            <li>Understand the causes and consequences of these errors.</li>
            <li>Apply best practices to avoid mistakes.</li>
            <li>Use tools and methods that ensure accurate placement of electrical components.</li>
            <li>Cross-check measurements before and after installation.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Common Measurement Errors */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Common Measurement Errors</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Understanding typical measurement mistakes helps prevent costly errors:
            </p>
            
            <div className="space-y-4">
              {measurementErrors.map((error, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">{error.error}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">{error.description}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                        <strong>Example:</strong> {error.example} - <strong>Prevention:</strong> {error.prevention}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Common Positioning Errors */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Common Positioning Errors</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Positioning mistakes affect both appearance and compliance:
            </p>
            
            <div className="space-y-4">
              {positioningErrors.map((error, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-green-600 dark:text-green-400 mb-1">{error.error}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">{error.description}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                        <strong>Impact:</strong> {error.impact} - <strong>Prevention:</strong> {error.prevention}
                      </div>
                    </div>
                  </div>
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
          <Separator className="my-6" />

          {/* Causes of Errors */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Causes of Errors</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Understanding root causes helps develop effective prevention strategies:
            </p>
            
            <div className="space-y-4">
              {errorCauses.map((cause, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-purple-600 text-elec-yellow mb-1">{cause.cause}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">{cause.description}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                        <strong>Consequences:</strong> {cause.consequences.join(', ')} - <strong>Solution:</strong> {cause.solution}
                      </div>
                    </div>
                  </div>
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
          <Separator className="my-6" />

          {/* Best Practices to Avoid Errors */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Best Practices to Avoid Errors</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Proven methods to maintain accuracy and prevent mistakes:
            </p>
            
            <div className="space-y-4">
              {bestPractices.map((practice, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-orange-600 text-elec-yellow mb-1">{practice.practice}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">{practice.description}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                        <strong>Application:</strong> {practice.application} - <strong>Benefit:</strong> {practice.benefit}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-transparent border border-border/30 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">Additional Tips</p>
              <p className="text-xs text-white">
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
          <Separator className="my-6" />

          {/* Cross-Checking and Verification */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <Search className="w-5 h-5" /> Cross-Checking and Verification
            </h3>
            
            <div className="space-y-4">
              {crossCheckingMethods.map((method, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-red-600 text-elec-yellow mb-1">{method.method}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">{method.description}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                        <strong>When:</strong> {method.when} - <strong>Effectiveness:</strong> {method.effectiveness}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Consequences of Poor Measurement */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Consequences of Poor Measurement
            </h3>
            
            <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
              <div className="flex items-start gap-3 mb-2">
                <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">!</span>
                <div className="flex-1">
                  <p className="font-semibold text-red-600 text-elec-yellow mb-1">Impact of Measurement Errors</p>
                  <div className="text-xs sm:text-sm text-white space-y-2">
                    <p>• <strong>Project delays</strong> due to rework requirements</p>
                    <p>• <strong>Failed inspections</strong> from non-compliance issues</p>
                    <p>• <strong>Increased costs</strong> from material waste and additional labour</p>
                    <p>• <strong>Safety hazards</strong> if equipment is incorrectly positioned</p>
                  </div>
                  <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border mt-3">
                    <strong>Prevention is key:</strong> The cost of verification is always less than the cost of correction.
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
            On a new office fit-out, an electrician measured socket positions from the subfloor rather than the final raised floor level. 
            When the flooring was installed, all sockets ended up 50 mm too low, requiring them to be removed and repositioned at a significant cost.
          </p>
          <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded p-3">
            <p className="text-xs text-blue-800 dark:text-blue-200">
              <strong>Lesson:</strong> Always confirm reference points from drawings and verify with site conditions. 
              Using the wrong datum point can cause systematic errors affecting the entire installation.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-6 bg-transparent border-white/20">
          <h3 className="font-semibold text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-white text-sm mb-1">
                Q: If I'm confident in my measuring skills, do I still need to double-check?
              </p>
              <p className="text-white text-sm">
                A: Yes — confidence is not a substitute for verification, especially on critical dimensions.
              </p>
            </div>
            <div>
              <p className="font-medium text-white text-sm mb-1">
                Q: Can I use different measuring tools on the same job?
              </p>
              <p className="text-white text-sm">
                A: It's best to stick to one tool type to avoid variations between devices.
              </p>
            </div>
            <div>
              <p className="font-medium text-white text-sm mb-1">
                Q: What should I do if the drawing measurement conflicts with on-site conditions?
              </p>
              <p className="text-white text-sm">
                A: Confirm with the site supervisor before making adjustments.
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
            Avoiding measurement and positioning errors comes down to preparation, precision, and verification. 
            Consistency in methods, adherence to drawings, and cross-checking will greatly reduce costly mistakes. 
            Remember: measure twice, cut once, and always verify critical measurements before installation.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Test Your Knowledge: Avoiding Common Errors in Measurement and Positioning" />

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Dimensions and Tolerances
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="..">
              Complete Section 2
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section2_4;