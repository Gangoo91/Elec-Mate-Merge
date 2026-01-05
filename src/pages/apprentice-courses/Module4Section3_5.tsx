import { ArrowLeft, ArrowRight, AlertTriangle, Target, CheckCircle, Eye, TrendingUp, Shield, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Common Bending Faults and How to Correct Them - Module 4.3.5 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to identify, correct, and prevent common conduit bending faults including kinking, flattening, and misalignment. Master troubleshooting techniques for BS 7671 compliance.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the main cause of kinking when bending conduit?",
    options: ["Using wrong size conduit", "Bending too quickly without support", "Measuring incorrectly"],
    correctIndex: 1,
    explanation: "Kinking occurs when excessive force is applied too quickly without proper support, causing the conduit to buckle internally."
  },
  {
    id: 2,
    question: "How should over-bending be corrected?",
    options: ["Start again with new conduit", "Gently re-bend in opposite direction", "Apply more force"],
    correctIndex: 1,
    explanation: "Over-bending can be corrected by gently applying counter-pressure, but avoid repeated bending in the same location."
  },
  {
    id: 3,
    question: "Why is bend radius critical per BS 7671?",
    options: ["For visual appearance", "To protect cable insulation", "To save materials"],
    correctIndex: 1,
    explanation: "Correct bend radius prevents cable stress and insulation damage, ensuring electrical safety and compliance."
  }
];

const Module4Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main cause of kinking in conduit?",
      options: [
        "Overheating PVC",
        "Using too much force without support",
        "Cutting too short"
      ],
      correctAnswer: 1,
      explanation: "Kinking occurs when excessive force is applied without proper support, causing the conduit walls to buckle inward."
    },
    {
      id: 2,
      question: "Which fault occurs when the bend angle is too shallow?",
      options: [
        "Over-bending",
        "Under-bending",
        "Flattening"
      ],
      correctAnswer: 1,
      explanation: "Under-bending results in angles that are too shallow, causing poor alignment and unprofessional appearance."
    },
    {
      id: 3,
      question: "True or False: Misalignment is usually caused by poor marking or positioning.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "True. Most misalignment issues stem from inaccurate marking or incorrect positioning in the bending tool."
    },
    {
      id: 4,
      question: "How can you correct over-bending?",
      options: [
        "Cut out and start again",
        "Gently re-bend in the opposite direction",
        "Apply more force"
      ],
      correctAnswer: 1,
      explanation: "Over-bending can often be corrected by carefully applying counter-pressure, but avoid repeated working of the same area."
    },
    {
      id: 5,
      question: "What happens if the bend radius is too tight?",
      options: [
        "Better cable protection",
        "Risk of cable damage and non-compliance",
        "Faster installation"
      ],
      correctAnswer: 1,
      explanation: "Tight bend radii can damage cable insulation through excessive stress and violate BS 7671 requirements."
    },
    {
      id: 6,
      question: "Name one prevention method for flattening.",
      options: [
        "Use bigger conduit",
        "Use the correct former and steady pressure",
        "Work faster"
      ],
      correctAnswer: 1,
      explanation: "Using the correct size former with steady, controlled pressure prevents the conduit from deforming during bending."
    },
    {
      id: 7,
      question: "Which regulation covers bend radius requirements?",
      options: [
        "BS 7671",
        "Building Regulations",
        "Health & Safety at Work Act"
      ],
      correctAnswer: 0,
      explanation: "BS 7671 (IET Wiring Regulations) specifies minimum bend radii to protect cables from mechanical damage."
    },
    {
      id: 8,
      question: "Why should you avoid repeated bending in the same spot?",
      options: [
        "It takes too long",
        "It weakens the conduit and can cause cracks",
        "It looks untidy"
      ],
      correctAnswer: 1,
      explanation: "Repeated bending work-hardens the material, creating stress points that can lead to cracking and failure."
    }
  ];

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
              <AlertTriangle className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 4.3.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Common Bending Faults and How to Correct Them
          </h1>
          <p className="text-muted-foreground">
            Learn to identify, diagnose, and correct common conduit bending faults to maintain quality installations and BS 7671 compliance.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Common faults: kinking, flattening, over-bending, under-bending, misalignment.</li>
                <li>Most faults are preventable with correct technique and preparation.</li>
                <li>Quick identification and correction saves time and materials.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Visible deformation, measurement discrepancies, poor alignment.</li>
                <li><strong>Use:</strong> Correction techniques, preventive measures, quality checks.</li>
                <li><strong>Check:</strong> Compliance with drawings, cable protection maintained.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Identify common bending faults through visual inspection and measurement.</li>
            <li>Understand the root causes of each type of bending fault.</li>
            <li>Apply appropriate corrective techniques for different fault types.</li>
            <li>Implement preventive measures to avoid faults during initial bending.</li>
            <li>Assess bend quality against BS 7671 standards and installation drawings.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Fault Identification and Diagnosis */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Fault Identification and Diagnosis</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Quick identification of bending faults is crucial for efficient correction and quality control. Use this systematic approach:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Kinking Faults - Complete Assessment</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Visual symptoms:</strong> Visible inward buckle, sharp crease in conduit wall, localised compression.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Physical test:</strong> Run cable draw wire through - any resistance indicates internal diameter reduction.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Root causes breakdown:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Excessive force applied too quickly (most common - 60% of cases)</li>
                      <li>Inadequate support - conduit not properly secured during bending</li>
                      <li>Wrong bending tool - using general purpose instead of conduit-specific former</li>
                      <li>Cold weather making PVC brittle (below 5°C)</li>
                      <li>Pre-existing stress cracks or damage in conduit</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Professional tip:</strong> Always perform "coin test" - a 5p coin should slide freely through the bend
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Flattening Faults - Measurement Protocol</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Visual indicators:</strong> Oval cross-section, reduced height dimension, compression marks on sides.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Measurement process:</strong></p>
                    <ol className="text-xs text-foreground ml-4 mb-2 list-decimal space-y-1">
                      <li>Measure diameter at 3 points: start, middle, and end of bend</li>
                      <li>Compare to original conduit diameter (measure undamaged section)</li>
                      <li>Calculate percentage reduction: (Original - Current) ÷ Original × 100</li>
                      <li>Record measurements for quality documentation</li>
                    </ol>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Flattening causes and percentages:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Wrong former size (40% of cases) - using size smaller than conduit</li>
                      <li>Excessive clamping force in hydraulic benders (30%)</li>
                      <li>Over-tight bend radius - less than 2.5 × diameter (20%)</li>
                      <li>Material fatigue from repeated attempts (10%)</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>BS 7671 compliance:</strong> &gt;5% reduction = monitoring required, &gt;10% = mandatory replacement
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Angular Faults - Precision Troubleshooting</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Over-bending identification:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Angle exceeds drawing specification by &gt;2°</li>
                      <li>Poor alignment with accessories or trunking</li>
                      <li>Conduit end doesn't meet wall/ceiling square</li>
                      <li>Multiple bends in run don't align properly</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Under-bending problems:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Insufficient clearance around obstacles</li>
                      <li>Unprofessional appearance - looks "lazy"</li>
                      <li>May not meet minimum separation requirements</li>
                      <li>Difficult to achieve neat cable terminations</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Measurement standard:</strong> ±2° tolerance for commercial work, ±1° for high-end installations
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Misalignment Faults - 3D Assessment</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Types of misalignment:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Horizontal twist:</strong> Conduit rotated about its axis during bending</li>
                      <li><strong>Vertical sag:</strong> Insufficient support causing drooping between fixing points</li>
                      <li><strong>Side drift:</strong> Bend not square to intended direction</li>
                      <li><strong>Compound error:</strong> Multiple misalignments creating complex correction needs</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Detection methods:</strong></p>
                    <ol className="text-xs text-foreground ml-4 mb-2 list-decimal space-y-1">
                      <li>String line test for horizontal alignment</li>
                      <li>Spirit level check on multiple planes</li>
                      <li>Laser level for long runs (&gt;3m)</li>
                      <li>Plumb bob test for vertical sections</li>
                    </ol>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Industry standard:</strong> Maximum 5mm deviation per 3m run, 15mm total for entire installation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="fault-identification-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Correction Techniques */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Professional Correction Techniques</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Effective correction methods can salvage most bending faults when applied correctly. Follow these proven procedures:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Kink Correction - Step-by-Step Process</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Emergency field repair (temporary):</strong></p>
                    <ol className="text-xs text-foreground ml-4 mb-2 list-decimal space-y-1">
                      <li>Mark 50mm either side of kink with permanent marker</li>
                      <li>Cut out damaged section using hacksaw - ensure square cuts</li>
                      <li>Deburr both cut ends thoroughly</li>
                      <li>Install appropriate coupling (threaded for metal, solvent for PVC)</li>
                      <li>Test cable pull - should be smooth with no resistance</li>
                    </ol>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Heat correction (PVC only - controlled environment):</strong></p>
                    <ol className="text-xs text-foreground ml-4 mb-2 list-decimal space-y-1">
                      <li>Insert internal mandrel (wooden dowel or proper tool)</li>
                      <li>Apply gentle heat (60-80°C) using heat gun on low setting</li>
                      <li>Work gradually - never rush the heating process</li>
                      <li>Allow to cool completely before removing mandrel</li>
                      <li>Check internal diameter with gauge or coin test</li>
                    </ol>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Safety critical:</strong> Never attempt to straighten severe kinks (&gt;30° compression) - material integrity is compromised
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Angular Correction - Precision Methods</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Over-bending correction:</strong></p>
                    <ol className="text-xs text-foreground ml-4 mb-2 list-decimal space-y-1">
                      <li>Measure current angle with digital protractor</li>
                      <li>Calculate required correction angle</li>
                      <li>Apply gentle counter-pressure by hand first</li>
                      <li>If insufficient, use bender with minimal force</li>
                      <li>Work in 2° increments - check after each adjustment</li>
                      <li>Stop immediately if material shows stress signs</li>
                    </ol>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Under-bending correction:</strong></p>
                    <ol className="text-xs text-foreground ml-4 mb-2 list-decimal space-y-1">
                      <li>Reposition conduit in original bender orientation</li>
                      <li>Continue bend slowly to required angle</li>
                      <li>Use angle finder for real-time feedback</li>
                      <li>Stop at exact target - over-correction is harder to fix</li>
                    </ol>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Material limit:</strong> Maximum 2-3 correction attempts before work-hardening makes material brittle
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Misalignment Correction - Advanced Techniques</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Horizontal twist correction:</strong></p>
                    <ol className="text-xs text-foreground ml-4 mb-2 list-decimal space-y-1">
                      <li>Secure one end of conduit run firmly</li>
                      <li>Use pipe grips to rotate free end gradually</li>
                      <li>Check alignment with string line every 15° of rotation</li>
                      <li>Support intermediate points to prevent sagging</li>
                    </ol>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Vertical/horizontal drift correction:</strong></p>
                    <ol className="text-xs text-foreground ml-4 mb-2 list-decimal space-y-1">
                      <li>Install temporary adjustable supports at 1m intervals</li>
                      <li>Use laser level or string line as reference</li>
                      <li>Adjust each support point incrementally</li>
                      <li>Work from fixed end towards free end</li>
                      <li>Install permanent fixings once alignment is correct</li>
                    </ol>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Tolerance check:</strong> Maximum 5mm deviation per 3m run - use this as go/no-go gauge
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Flattening Recovery - When Possible</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Minor flattening (&lt;5% reduction):</strong></p>
                    <ol className="text-xs text-foreground ml-4 mb-2 list-decimal space-y-1">
                      <li>Insert appropriate size mandrel (metal rod or wooden dowel)</li>
                      <li>For PVC: Apply gentle heat while supporting mandrel</li>
                      <li>For metal: Use internal hydraulic expander if available</li>
                      <li>Work gradually - never force the expansion</li>
                      <li>Cool completely before removing mandrel</li>
                      <li>Re-measure to confirm diameter recovery</li>
                    </ol>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>When to abandon correction:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>&gt;10% diameter reduction (replacement mandatory)</li>
                      <li>Visible cracking or material damage</li>
                      <li>Multiple correction attempts already made</li>
                      <li>Long sections affected (&gt;300mm)</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Cost analysis:</strong> Correction time &gt;15 minutes usually exceeds replacement cost
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="correction-technique-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Advanced Prevention Methods */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Advanced Prevention Methods</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Prevention is always more cost-effective than correction. Master these comprehensive prevention techniques:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Pre-Bending Preparation Checklist</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Material assessment:</strong></p>
                    <ol className="text-xs text-foreground ml-4 mb-2 list-decimal space-y-1">
                      <li>Check conduit for pre-existing damage, stress marks, or defects</li>
                      <li>Verify material temperature (PVC should be &gt;5°C, metal can be any temperature)</li>
                      <li>Confirm conduit size matches bender former specifications</li>
                      <li>Check material certificate matches job specification</li>
                    </ol>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Tool setup verification:</strong></p>
                    <ol className="text-xs text-foreground ml-4 mb-2 list-decimal space-y-1">
                      <li>Confirm bender calibration with test piece</li>
                      <li>Check former condition - no damage or wear marks</li>
                      <li>Verify hydraulic pressure settings (if applicable)</li>
                      <li>Test safety mechanisms and stops</li>
                    </ol>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Time saver:</strong> 5 minutes of preparation prevents 30 minutes of correction work
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Bending Technique Mastery</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Force application principles:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Start with minimal force - gradually increase as needed</li>
                      <li>Maintain steady, consistent pressure throughout the bend</li>
                      <li>Never jerk or apply sudden force changes</li>
                      <li>Support the full length of conduit during bending</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Speed control methodology:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>20mm conduit: 10-15 seconds per 90° bend minimum</li>
                      <li>25mm conduit: 15-20 seconds per 90° bend minimum</li>
                      <li>32mm conduit: 20-30 seconds per 90° bend minimum</li>
                      <li>Larger sizes: Add 5 seconds per size increase</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Environmental adaptations:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Cold weather (&lt;5°C): Warm PVC with heat gun before bending</li>
                      <li>Hot weather (&gt;25°C): Allow metal to cool, work in shade when possible</li>
                      <li>Windy conditions: Provide additional support to prevent movement</li>
                      <li>Wet conditions: Ensure secure grip and stable footing</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Professional standard:</strong> Experienced benders achieve 95%+ success rate using these methods
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Real-Time Quality Monitoring</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Progressive checking during bending:</strong></p>
                    <ol className="text-xs text-foreground ml-4 mb-2 list-decimal space-y-1">
                      <li>Check angle at 30°, 60°, and 90° intervals</li>
                      <li>Feel for any resistance or unusual feedback</li>
                      <li>Watch for material stress indicators (whitening in PVC, surface marks in metal)</li>
                      <li>Monitor alignment throughout the bending process</li>
                    </ol>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Early warning signs to stop immediately:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Any cracking sounds or visible stress marks</li>
                      <li>Excessive resistance from the bending tool</li>
                      <li>Conduit starting to twist or slip in former</li>
                      <li>Visible flattening developing during bend</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Recovery tip:</strong> Stop at first sign of problems - early intervention prevents major faults
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Template and Jig Systems</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Creating bending templates for repetitive work:</strong></p>
                    <ol className="text-xs text-foreground ml-4 mb-2 list-decimal space-y-1">
                      <li>Use first successful bend as template pattern</li>
                      <li>Mark key measurement points on template board</li>
                      <li>Include angle references and support positions</li>
                      <li>Label template with conduit size and project details</li>
                    </ol>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Quality benefits of template system:</strong></p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Eliminates measurement errors on repeated bends</li>
                      <li>Reduces skill dependency - junior staff can achieve consistent results</li>
                      <li>Speeds up production by 40-60% for multiple identical bends</li>
                      <li>Provides quality reference for inspection</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Investment payback:</strong> Template creation pays for itself after 5-10 identical bends
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="prevention-methods-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Quality Assessment and Standards */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Quality Assessment and Standards</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Systematic quality checks ensure compliance and prevent installation problems:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Dimensional Checks</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Verify bend angles with protractor, check radius against BS 7671 minimums, measure internal diameter retention.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>BS 7671:</strong> Minimum bend radius = 2.5 × external diameter for most cables
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Visual Inspection</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Check for cracks, kinks, excessive flattening, surface damage, professional appearance against installation drawings.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Reject criteria:</strong> Any visible crack or kink, &gt;10% diameter reduction
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Functional Testing</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Test cable pull through bent sections, check fitting alignment, verify accessibility for maintenance.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Pull test:</strong> Cables should draw smoothly without snagging or resistance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-world example */}
        <Card className="mb-8 p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-world example</h2>
          <div className="space-y-4 text-xs sm:text-sm text-foreground">
            <p>
              On a commercial lighting project, an installer was rushing to complete conduit runs before the end of shift. Multiple bends showed flattening due to using an incorrectly sized former. During cable installation, several cables snagged on the deformed sections, causing insulation damage.
            </p>
            <p>
              The electrical test revealed insulation resistance failures, requiring complete removal of affected cables and conduit replacement. The installation had to be dismantled, re-bent correctly, and re-pulled, costing an entire day of labour plus materials.
            </p>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-emerald-500/30">
              <p className="font-medium mb-2">Lesson learned</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Always use the correct former size for your conduit diameter</li>
                <li>Check bend quality before proceeding to the next bend</li>
                <li>A few minutes of preparation prevents hours of rework</li>
                <li>Quality checks during bending save time and materials</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">FAQs</h2>
          <div className="space-y-4 text-xs sm:text-sm text-foreground">
            <div>
              <p className="font-medium mb-2">Q: Can flattened bends be fixed without replacing the conduit?</p>
              <p>A: Minor flattening (less than 5% diameter reduction) can sometimes be improved with careful reshaping using internal mandrels, but significant deformation usually requires replacement to ensure cable protection.</p>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-2">Q: How many times can you re-bend the same section of metal conduit?</p>
              <p>A: Ideally only once. Repeated bending work-hardens the material, creating stress concentrations that can lead to cracking. If multiple corrections are needed, replace the section.</p>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-2">Q: How do I prevent misalignment when bending?</p>
              <p>A: Always mark the conduit clearly with permanent marker, ensure proper seating in the bender, and check alignment against a string line or laser level before and during bending.</p>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-2">Q: Is it worth trying to correct minor kinks?</p>
              <p>A: No. Any visible kink compromises cable protection and installation integrity. Cut out the affected section and rejoin with a coupling - it's faster and safer than attempted repairs.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <div className="text-xs sm:text-sm text-foreground space-y-2">
            <p>
              Bending faults are common but largely preventable with proper technique and preparation. Understanding the causes helps prevent occurrence, while knowing correction methods saves time when faults do occur. Prevention through correct tool selection, proper technique, and quality checks is always more efficient than correction.
            </p>
            <p>
              Regular quality assessment against BS 7671 standards ensures both compliance and professional installation quality. Remember: when in doubt about a bend quality, replace rather than risk cable damage or installation failure.
            </p>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" asChild>
            <Link to="module4-section3/subsection4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Cutting & Preparing
            </Link>
          </Button>
          <Button asChild>
            <Link to="module4-section3/subsection6">
              Next: Installation Planning
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section3_5;