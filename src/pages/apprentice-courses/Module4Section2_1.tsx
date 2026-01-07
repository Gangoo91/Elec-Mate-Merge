import { ArrowLeft, ArrowRight, Ruler, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Using Measurement Tools and Marking Equipment - Module 4.2.1 | Level 2 Electrical Course";
const DESCRIPTION = "Learn proper selection, use, and maintenance of electrical measurement and marking tools for accurate installations compliant with BS 7671.";

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "Which tool is best for marking on metal surfaces?",
    options: ["Pencil", "Chalk line", "Scriber", "Steel rule"],
    correctAnswer: 2,
    explanation: "A scriber is specifically designed for scoring marks on metal surfaces for cutting or drilling."
  },
  {
    id: 2,
    question: "Should you use different tape measures to cross-check measurements?",
    options: ["True - for better accuracy", "False - use the same tape measure", "Only for long measurements", "Only when working with others"],
    correctAnswer: 1,
    explanation: "False - you should use the same tape measure throughout a project to avoid calibration discrepancies between different tools."
  },
  {
    id: 3,
    question: "What is one advantage of a laser level over a spirit level?",
    options: ["More accurate readings", "Longer range and faster setup", "Cheaper to purchase", "No maintenance required"],
    correctAnswer: 1,
    explanation: "Laser levels provide longer range capability and faster setup for creating straight lines over long distances."
  },
  {
    id: 4,
    question: "Why is measuring twice important?",
    options: ["To double-check calculations", "Reduces risk of cutting or drilling errors", "Required by BS 7671", "To verify tool accuracy"],
    correctAnswer: 1,
    explanation: "Measuring twice before cutting or drilling reduces the risk of costly errors and material waste."
  },
  {
    id: 5,
    question: "Which marking tool is most suitable for creating temporary marks on plaster?",
    options: ["Scriber", "Pencil", "Marker pen", "Steel rule"],
    correctAnswer: 1,
    explanation: "Pencil is ideal for temporary marks on plaster as it can be easily erased and won't damage the surface."
  },
  {
    id: 6,
    question: "How can you check if a spirit level is accurate?",
    options: ["Drop test", "Reverse test on a level surface", "Check against tape measure", "Compare with a chalk line"],
    correctAnswer: 1,
    explanation: "The reverse test involves placing the level on a known level surface, noting the bubble position, then reversing the level 180 degrees. The bubble should be in the same position."
  },
  {
    id: 7,
    question: "What is one risk of using a damaged measuring tape?",
    options: ["Increased cost", "Inaccurate readings leading to misaligned installations", "Slower work progress", "Tool warranty void"],
    correctAnswer: 1,
    explanation: "A damaged measuring tape can give inaccurate readings, leading to misaligned installations and potential safety issues."
  },
  {
    id: 8,
    question: "According to BS 7671, why is accurate measurement critical?",
    options: ["Reduces material costs", "Ensures compliance with safe zones and spacing requirements", "Improves work speed", "Reduces tool wear"],
    correctAnswer: 1,
    explanation: "BS 7671 requires accurate installation placement for compliance with safety standards, safe zones, and spacing requirements."
  }
];

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Name two tools used for marking long straight lines.",
    options: ["Chalk line and laser level", "Pencil and marker", "Steel rule and tape measure", "Scriber and vernier calipers"],
    correctIndex: 0,
    explanation: "Chalk line and laser level are both excellent for creating long, straight marking lines across surfaces."
  },
  {
    id: 2,
    question: "Why should you use the same tape measure throughout a project?",
    options: ["To save money", "To avoid calibration discrepancies", "It's required by law", "For tool maintenance"],
    correctIndex: 1,
    explanation: "Using the same tape measure throughout a project avoids calibration discrepancies that can occur between different measuring tools."
  },
  {
    id: 3,
    question: "What is one method to check if a spirit level is still accurate?",
    options: ["Drop it from height", "Test against a known level surface", "Compare with a ruler", "Check the warranty date"],
    correctIndex: 1,
    explanation: "Testing a spirit level against a known level surface (reverse test) is the standard method to verify its accuracy."
  }
];

// Data for measurement tools
const measurementTools = [
  {
    name: "Tape Measure",
    purpose: "General length measurement in metric units",
    applications: ["Room dimensions", "Cable runs", "Containment spacing"],
    keyFeatures: ["Retractable steel tape", "Metric markings", "Locking mechanism"],
    bestPractices: ["Keep straight during use", "Use same tape throughout project", "Check for wear regularly"]
  },
  {
    name: "Steel Rule",
    purpose: "Short, precise measurements",
    applications: ["Component spacing", "Small dimensions", "Precision work"],
    keyFeatures: ["Rigid steel construction", "Fine graduated markings", "Corrosion resistant"],
    bestPractices: ["Keep clean and dry", "Store flat to prevent bending", "Use for measurements under 1m"]
  },
  {
    name: "Spirit Level",
    purpose: "Checking horizontal and vertical alignment",
    applications: ["Conduit installation", "Panel mounting", "Accessory positioning"],
    keyFeatures: ["Multiple bubble vials", "Robust frame", "End caps for protection"],
    bestPractices: ["Check accuracy regularly", "Store horizontally", "Avoid dropping"]
  },
  {
    name: "Laser Level",
    purpose: "Long-distance levelling and straight lines",
    applications: ["Large installations", "Multi-room projects", "Ceiling work"],
    keyFeatures: ["Self-levelling", "Multiple beam options", "Long range capability"],
    bestPractices: ["Calibrate as per manufacturer", "Protect from vibration", "Check battery level"]
  },
  {
    name: "Vernier Calipers",
    purpose: "Precision component measurements",
    applications: ["Cable diameter", "Component sizing", "Tolerance checking"],
    keyFeatures: ["High precision", "Internal/external measurement", "Digital/analogue options"],
    bestPractices: ["Clean before use", "Store in protective case", "Zero before measurement"]
  }
];

// Data for marking equipment
const markingEquipment = [
  {
    name: "Pencils",
    purpose: "Marking on wood, plaster, or soft surfaces",
    applications: ["Temporary marks", "Planning layouts", "Non-permanent marking"],
    advantages: ["Erasable", "Clean lines", "Suitable for most surfaces"],
    limitations: ["Not visible on dark surfaces", "Can fade over time"]
  },
  {
    name: "Permanent Markers",
    purpose: "Marking on conduit, trunking, or metal",
    applications: ["Cable identification", "Component labelling", "Permanent marking"],
    advantages: ["Weather resistant", "High visibility", "Quick application"],
    limitations: ["Difficult to remove", "Can fade in UV light"]
  },
  {
    name: "Chalk Line",
    purpose: "Long, straight marking lines across surfaces",
    applications: ["Layout lines", "Alignment references", "Large area marking"],
    advantages: ["Very long lines", "Temporary marking", "Fast application"],
    limitations: ["Can be blown away", "Not suitable for vertical surfaces"]
  },
  {
    name: "Scriber",
    purpose: "Scoring marks on metal for cutting or drilling",
    applications: ["Metal marking", "Precise positioning", "Permanent reference marks"],
    advantages: ["Precise marking", "Permanent on metal", "Professional finish"],
    limitations: ["Only suitable for metal", "Requires steady hand"]
  }
];

// Best practices data
const bestPractices = [
  {
    practice: "Always measure twice before cutting or drilling",
    reason: "Prevents costly errors and material waste",
    application: "All cutting and drilling operations",
    compliance: "Good workmanship standards"
  },
  {
    practice: "Use the same tape measure for a project",
    reason: "Avoids calibration discrepancies between tools",
    application: "Consistent measurement throughout project",
    compliance: "Quality assurance requirements"
  },
  {
    practice: "Keep tools clean and free from debris",
    reason: "Ensures precise readings and tool longevity",
    application: "Daily tool maintenance routine",
    compliance: "Professional standards"
  },
  {
    practice: "Avoid bending the tape measure during use",
    reason: "Maintains accuracy and prevents damage",
    application: "All tape measure operations",
    compliance: "Tool care guidelines"
  },
  {
    practice: "Use templates or jigs for repetitive measurements",
    reason: "Improves speed and consistency",
    application: "Multiple identical installations",
    compliance: "Efficiency best practices"
  }
];

// Maintenance requirements
const maintenanceRequirements = [
  {
    aspect: "Storage Conditions",
    requirement: "Store tools in dry, clean conditions",
    purpose: "Prevent corrosion and damage",
    frequency: "Daily after use",
    standard: "Tool manufacturer specifications"
  },
  {
    aspect: "Spirit Level Accuracy",
    requirement: "Check against known level surface periodically",
    purpose: "Ensure continued accuracy",
    frequency: "Monthly or after impact",
    standard: "Measurement accuracy standards"
  },
  {
    aspect: "Tape Measure Condition",
    requirement: "Replace worn or damaged measuring tapes",
    purpose: "Maintain measurement precision",
    frequency: "When wear is visible",
    standard: "Professional tool standards"
  },
  {
    aspect: "Laser Level Calibration",
    requirement: "Recalibrate as per manufacturer guidance",
    purpose: "Ensure measurement accuracy",
    frequency: "As specified by manufacturer",
    standard: "Calibration certificates"
  }
];

const Module4Section2_1 = () => {
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
        {/* Header (matches Module 4.1.2 style) */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Ruler className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.2.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Using Measurement Tools and Marking Equipment
          </h1>
          <p className="text-white">
            Master the foundation of precise electrical installations through proper tool selection, use, and maintenance.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Always measure twice before cutting or drilling.</li>
                <li>Use the same tape measure throughout a project for consistency.</li>
                <li>Keep tools clean and check accuracy regularly for precision.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Measurement requirements, marking surfaces, tool condition.</li>
                <li><strong>Use:</strong> Appropriate tools for task, correct marking method, proper maintenance.</li>
                <li><strong>Check:</strong> Tool accuracy, measurement consistency, BS 7671 compliance.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Identify common measurement and marking tools used in electrical installation.</li>
            <li>Select the right tool for specific measurement tasks.</li>
            <li>Use tools correctly to achieve accurate measurements and markings.</li>
            <li>Maintain tools to ensure ongoing accuracy.</li>
            <li>Apply measurement skills in a real-world installation context.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Common Measurement Tools */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Common Measurement Tools</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Proper tool selection ensures accurate measurement and professional results:
            </p>
            
            <div className="space-y-4">
              {measurementTools.map((tool, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">{tool.name}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">{tool.purpose}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                        <strong>Applications:</strong> {tool.applications.join(', ')} - {tool.bestPractices[0]}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-transparent border border-border/30 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">Tool Selection Tips</p>
              <p className="text-xs text-white">
                Choose tools based on precision requirements: tape measures for general work, steel rules for precision, 
                spirit levels for alignment, laser levels for long distances, and calipers for component measurement.
              </p>
            </div>
          </section>

          {/* Marking Equipment */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Marking Equipment</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Selecting appropriate marking tools ensures clear, lasting reference points:
            </p>
            
            <div className="space-y-4">
              {markingEquipment.map((equipment, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-green-600 dark:text-green-400 mb-1">{equipment.name}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">{equipment.purpose}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                        <strong>Best for:</strong> {equipment.applications.join(', ')} - {equipment.advantages[0]}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <InlineCheck
            id="measurement-tools-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Best Practices for Accurate Measurement */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Best Practices for Accurate Measurement</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Following proven practices ensures consistent accuracy and professional results:
            </p>
            
            <div className="space-y-4">
              {bestPractices.map((practice, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-purple-600 text-elec-yellow mb-1">{practice.practice}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">{practice.reason}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                        <strong>Application:</strong> {practice.application} - {practice.compliance}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <InlineCheck
            id="consistency-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Maintaining Accuracy */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Maintaining Accuracy</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Regular maintenance ensures tools remain accurate and reliable:
            </p>
            
            <div className="space-y-4">
              {maintenanceRequirements.map((requirement, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-orange-600 text-elec-yellow mb-1">{requirement.aspect}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">{requirement.requirement}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                        <strong>Frequency:</strong> {requirement.frequency} - {requirement.purpose}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <InlineCheck
            id="accuracy-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Regulatory Considerations */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Regulatory Considerations (BS 7671)
            </h3>
            
            <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
              <div className="flex items-start gap-3 mb-2">
                <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">!</span>
                <div className="flex-1">
                  <p className="font-semibold text-red-600 text-elec-yellow mb-1">BS 7671 Compliance Requirements</p>
                  <p className="text-xs sm:text-sm text-white mb-2">Accurate measurement is essential for safety and regulatory compliance.</p>
                  <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                    <strong>Critical areas:</strong> Safe zone compliance, spacing requirements, and professional workmanship standards. 
                    Poor measurement can create safety hazards and regulation breaches.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-8 p-6 bg-elec-yellow/5 dark:bg-elec-yellow/10 border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-800 dark:text-white mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Real-World Example
          </h3>
          <p className="text-blue-900 dark:text-blue-100 text-sm mb-3">
            On a commercial lighting installation, incorrect marking of containment led to the trunking being 10mm 
            off alignment over a 15m run. The misalignment meant that the ceiling panels would not fit correctly, 
            leading to a full day of rework.
          </p>
          <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded p-3">
            <p className="text-xs text-blue-800 dark:text-white">
              <strong>Lesson:</strong> Accurate marking from the start would have prevented the problem. 
              The cost of proper measurement tools and techniques is minimal compared to rework expenses.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-6 bg-transparent border-white/20">
          <h3 className="font-semibold text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-white text-sm mb-1">
                Q: Can I use a pen instead of a pencil for marking?
              </p>
              <p className="text-white text-sm">
                A: Yes, but ensure the mark is visible and appropriate for the surface. Pencil is preferred 
                for surfaces where permanent marks are not desired.
              </p>
            </div>
            <div>
              <p className="font-medium text-white text-sm mb-1">
                Q: Are laser levels worth the investment?
              </p>
              <p className="text-white text-sm">
                A: For larger projects, yes. They save time and improve accuracy over long distances.
              </p>
            </div>
            <div>
              <p className="font-medium text-white text-sm mb-1">
                Q: Should I trust measurements on pre-marked building plans?
              </p>
              <p className="text-white text-sm">
                A: Always verify on-site before cutting or fixing. Plans may not reflect actual conditions.
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
            Accurate measurement and marking underpin every successful electrical installation. Using the correct tools, 
            maintaining them properly, and applying best practices ensures precision, compliance, and a professional finish. 
            Remember: measure twice, cut once, and always verify your work against BS 7671 requirements.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Test Your Knowledge: Measurement Tools and Marking Equipment" />

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../1-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Planning Workflow
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="../2-2">
              Next: Setting Out for Conduit and Trunking
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section2_1;