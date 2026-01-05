import { ArrowLeft, ArrowRight, Wrench, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Following Dimensions, Levels, and Tolerances - Module 4.2.3 | Level 2 Electrical Course";
const DESCRIPTION = "Master precision in electrical installation by following specified dimensions, levels, and tolerances for compliance and professional results.";

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "What is the typical tolerance for socket outlet heights?",
    options: ["±1 mm", "±3 mm", "±5 mm", "±10 mm"],
    correctAnswer: 1,
    explanation: "The typical tolerance for socket outlet heights is ±3 mm from the specified dimension."
  },
  {
    id: 2,
    question: "Can you measure from any convenient point, even if it's not the specified reference point?",
    options: ["True - convenience is important", "False - always use correct reference point", "Only for rough measurements", "Only if approved by supervisor"],
    correctAnswer: 1,
    explanation: "False - you must always measure from the correct specified reference point to maintain accuracy and consistency."
  },
  {
    id: 3,
    question: "Which tools can help maintain accurate levels?",
    options: ["Hammer and screwdriver", "Spirit level and laser level", "Tape measure and pencil", "Drill and bits"],
    correctAnswer: 1,
    explanation: "Spirit levels and laser levels are the primary tools for maintaining accurate horizontal and vertical alignment."
  },
  {
    id: 4,
    question: "Why should you recheck measurements on long runs?",
    options: ["It's not necessary", "To ensure accuracy and avoid cumulative errors", "Only if you're unsure", "To waste time"],
    correctAnswer: 1,
    explanation: "Rechecking measurements on long runs ensures accuracy and prevents drift caused by cumulative errors over distance."
  },
  {
    id: 5,
    question: "Which regulation covers correct positioning and support of installations?",
    options: ["BS 5839", "BS 7671", "BS EN 50200", "BS 5266"],
    correctAnswer: 1,
    explanation: "BS 7671 (IET Wiring Regulations) requires installations to be 'adequately supported and correctly positioned'."
  },
  {
    id: 6,
    question: "What does 'plumb' mean in relation to vertical installations?",
    options: ["Slightly angled", "Perfectly vertical", "Horizontally level", "Randomly positioned"],
    correctAnswer: 1,
    explanation: "'Plumb' means perfectly vertical, ensuring vertical runs are straight up and down."
  },
  {
    id: 7,
    question: "What is one consequence of exceeding project tolerances?",
    options: ["Better appearance", "Misalignment requiring rework", "Faster installation", "Lower costs"],
    correctAnswer: 1,
    explanation: "Exceeding tolerances can cause misalignment requiring rework, safety breaches, and failed inspections."
  },
  {
    id: 8,
    question: "In high-end projects, what might be different about tolerances?",
    options: ["They don't matter", "They may be tighter than standard", "They're always looser", "They're the same everywhere"],
    correctAnswer: 1,
    explanation: "High-end projects may require much tighter tolerances than standard builds, requiring more precision."
  }
];

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is meant by 'tolerance' in installation work?",
    options: ["Working slowly", "Allowable deviation from specified dimension", "Using any measurement", "Ignoring specifications"],
    correctIndex: 1,
    explanation: "Tolerance is the allowable deviation from the specified dimension, typically expressed as ± a certain amount."
  },
  {
    id: 2,
    question: "Name one tool that ensures vertical alignment.",
    options: ["Tape measure", "Spirit level", "Hammer", "Screwdriver"],
    correctIndex: 1,
    explanation: "A spirit level (or plumb line/laser level) ensures vertical alignment by indicating when something is perfectly plumb."
  },
  {
    id: 3,
    question: "Why is it important to use consistent reference points when measuring?",
    options: ["It's faster", "Prevents cumulative errors and maintains accuracy", "It's easier", "Saves materials"],
    correctIndex: 1,
    explanation: "Using consistent reference points prevents cumulative errors and maintains accuracy throughout the installation."
  }
];

// Understanding dimensions data
const dimensionPrinciples = [
  {
    principle: "Exact Measurements",
    description: "Dimensions specify precise measurements for positioning components",
    application: "Socket outlet heights, switch positions, containment runs",
    keyPoint: "Always verify if dimension is to centre point or edge of accessory"
  },
  {
    principle: "Reference Points",
    description: "All measurements must be taken from specified reference points",
    application: "Finished floor level, ceiling height, wall edges",
    keyPoint: "Use same reference point throughout installation for consistency"
  },
  {
    principle: "Double-Check Protocol",
    description: "Measure twice before marking or drilling to prevent errors",
    application: "All marking and drilling operations",
    keyPoint: "Second measurement confirms accuracy before irreversible actions"
  }
];

// Levelling tools and techniques
const levellingTools = [
  {
    tool: "Spirit Level",
    purpose: "Manual checking of horizontal and vertical alignment",
    applications: ["Short runs", "Individual accessories", "Local alignment checks"],
    advantages: ["Simple to use", "No power required", "Highly accurate"]
  },
  {
    tool: "Laser Level",
    purpose: "Long-distance levelling and alignment over large areas",
    applications: ["Long containment runs", "Multi-room installations", "Height transfer"],
    advantages: ["Long range", "Self-levelling", "Visible reference line"]
  },
  {
    tool: "Plumb Line",
    purpose: "Establishing true vertical reference lines",
    applications: ["Vertical conduit runs", "Riser installations", "Transfer of points"],
    advantages: ["Simple", "Accurate", "Works in any conditions"]
  }
];

// Tolerance standards
const toleranceStandards = [
  {
    component: "Accessory Height",
    tolerance: "±3 mm",
    reason: "Maintains consistent appearance and accessibility",
    impact: "Visual alignment and ergonomic function"
  },
  {
    component: "Trunking/Conduit Alignment",
    tolerance: "±2 mm per metre",
    reason: "Prevents noticeable deviation over long runs",
    impact: "Professional appearance and structural integrity"
  },
  {
    component: "Switch/Socket Alignment",
    tolerance: "±2 mm horizontally",
    reason: "Ensures visual consistency in banks of accessories",
    impact: "Aesthetic quality and user satisfaction"
  },
  {
    component: "Conduit Bends",
    tolerance: "±5° from specified angle",
    reason: "Maintains cable pulling capabilities and appearance",
    impact: "Installation function and professional finish"
  }
];

// Accuracy maintenance techniques
const accuracyTechniques = [
  {
    technique: "Consistent Reference Points",
    description: "Use same datum points throughout installation",
    application: "All measurements and positioning",
    benefit: "Prevents cumulative errors and maintains alignment"
  },
  {
    technique: "Regular Rechecking",
    description: "Verify measurements at regular intervals on long runs",
    application: "Containment runs over 10m",
    benefit: "Catches drift before it becomes problematic"
  },
  {
    technique: "Two-Person Measurement",
    description: "Work in pairs for large-scale measurements",
    application: "Long distance measurements, heavy components",
    benefit: "Reduces tape sag errors and improves accuracy"
  },
  {
    technique: "Progressive Checking",
    description: "Check each section before moving to next",
    application: "Multi-section installations",
    benefit: "Prevents error accumulation over distance"
  }
];

// Consequences of poor control
const consequences = [
  {
    issue: "Misaligned Accessories",
    impact: "Affects usability and professional appearance",
    cost: "Rework time and materials",
    prevention: "Use proper measuring tools and reference points"
  },
  {
    issue: "Regulation Breaches",
    impact: "Non-compliance with BS 7671 and Building Regulations",
    cost: "Failed inspections and potential legal issues",
    prevention: "Follow specified tolerances and standards"
  },
  {
    issue: "Functional Problems",
    impact: "Poor cable pulling, containment stress, joint issues",
    cost: "Ongoing maintenance and early failure",
    prevention: "Maintain accuracy throughout installation process"
  }
];

const Module4Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
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
            <div className="p-2 rounded-lg bg-card">
              <Wrench className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 4.2.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Following Dimensions, Levels, and Tolerances
          </h1>
          <p className="text-muted-foreground">
            Master precision in electrical installation by following specified dimensions, levels, and tolerances for compliance and professional results.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Follow specified dimensions exactly, checking centre vs edge.</li>
                <li>Maintain tolerances: ±3mm for accessories, ±2mm/m for alignment.</li>
                <li>Use consistent reference points and recheck long runs.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Reference points, tolerance requirements, specification details.</li>
                <li><strong>Use:</strong> Spirit/laser levels, consistent measuring, double-checking.</li>
                <li><strong>Check:</strong> Accuracy against drawings, compliance with tolerances.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Interpret dimensions and tolerances from technical drawings and specifications.</li>
            <li>Use levels and measuring equipment to achieve accuracy.</li>
            <li>Apply appropriate tolerances in different installation scenarios.</li>
            <li>Recognise the implications of exceeding tolerances.</li>
            <li>Work to industry standards for accuracy and compliance.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Understanding Dimensions */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Understanding Dimensions</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Precise interpretation and application of dimensions ensures accurate positioning:
            </p>
            
            <div className="space-y-4">
              {dimensionPrinciples.map((principle, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">{principle.principle}</p>
                      <p className="text-xs sm:text-sm text-foreground mb-2">{principle.description}</p>
                      <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                        <strong>Application:</strong> {principle.application} - {principle.keyPoint}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Levels */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <Ruler className="w-5 h-5" /> Levels and Alignment Tools
            </h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Proper levelling ensures professional appearance and functional integrity:
            </p>
            
            <div className="space-y-4">
              {levellingTools.map((tool, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-green-600 dark:text-green-400 mb-1">{tool.tool}</p>
                      <p className="text-xs sm:text-sm text-foreground mb-2">{tool.purpose}</p>
                      <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                        <strong>Applications:</strong> {tool.applications.join(', ')} - Advantages: {tool.advantages.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-card border border-green-400/30 rounded-lg">
              <p className="text-sm font-medium text-foreground mb-1">Levelling Requirements</p>
              <p className="text-xs text-foreground">
                Horizontal runs (trunking) must be straight for appearance and function. 
                Vertical runs (risers) should be perfectly plumb unless specified otherwise.
              </p>
            </div>
          </section>

          <InlineCheck
            id="tolerance-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Tolerances */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Tolerance Standards</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Understanding and applying appropriate tolerances ensures quality and compliance:
            </p>
            
            <div className="space-y-4">
              {toleranceStandards.map((standard, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">{standard.component}</p>
                      <p className="text-xs sm:text-sm text-foreground mb-2">Tolerance: <strong>{standard.tolerance}</strong> - {standard.reason}</p>
                      <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                        <strong>Impact:</strong> {standard.impact}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-card border border-border/30 rounded-lg">
              <p className="text-sm font-medium text-foreground mb-1">Project-Specific Tolerances</p>
              <p className="text-xs text-foreground">
                Always follow project specifications as high-end projects may require much tighter tolerances than standard builds.
              </p>
            </div>
          </section>

          <InlineCheck
            id="vertical-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Maintaining Accuracy on Site */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Maintaining Accuracy on Site</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Systematic approaches to maintaining precision throughout installation:
            </p>
            
            <div className="space-y-4">
              {accuracyTechniques.map((technique, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">{technique.technique}</p>
                      <p className="text-xs sm:text-sm text-foreground mb-2">{technique.description}</p>
                      <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                        <strong>Application:</strong> {technique.application} - <strong>Benefit:</strong> {technique.benefit}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <InlineCheck
            id="reference-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Consequences of Poor Dimensional Control */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Consequences of Poor Dimensional Control
            </h3>
            
            <div className="space-y-4">
              {consequences.map((consequence, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">!</span>
                    <div className="flex-1">
                      <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">{consequence.issue}</p>
                      <p className="text-xs sm:text-sm text-foreground mb-2">Impact: {consequence.impact}</p>
                      <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                        <strong>Cost:</strong> {consequence.cost} - <strong>Prevention:</strong> {consequence.prevention}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Regulatory Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Regulatory Requirements
            </h3>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">BS 7671 Requirements</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Requires installations to be "adequately supported and correctly positioned".</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Implications:</strong> All dimensional and positional requirements must be met for compliance.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">Building Regulations Part M</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2">Stipulates specific mounting heights for accessibility compliance.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Requirements:</strong> Switch and socket heights must meet accessibility standards for disabled access.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-8 p-6 bg-emerald-50 dark:bg-emerald-950/20 border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Real-World Example
          </h3>
          <p className="text-blue-900 dark:text-blue-100 text-sm mb-3">
            On a retail fit-out, a run of sockets was installed 20 mm too high compared to the specified height. 
            The deviation broke compliance with accessibility requirements, leading to all the outlets being reinstalled at additional cost.
          </p>
          <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded p-3">
            <p className="text-xs text-blue-800 dark:text-blue-200">
              <strong>Lesson:</strong> Even small deviations can have serious consequences. 
              Always work within specified tolerances and verify measurements before installation.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-6 bg-card border-border/20">
          <h3 className="font-semibold text-foreground mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-foreground text-sm mb-1">
                Q: Can I adjust a dimension slightly if it looks better visually?
              </p>
              <p className="text-muted-foreground text-sm">
                A: Only if it's within tolerance and approved by the supervisor or client.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground text-sm mb-1">
                Q: Are tolerances the same for all projects?
              </p>
              <p className="text-muted-foreground text-sm">
                A: No, high-specification projects may require much tighter tolerances than standard builds.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground text-sm mb-1">
                Q: How do I measure accurately over long distances?
              </p>
              <p className="text-muted-foreground text-sm">
                A: Use a laser level or two-person measurement method to reduce errors.
              </p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Summary
          </h3>
          <p className="text-muted-foreground text-sm">
            Working within the specified dimensions, levels, and tolerances ensures compliance, safety, and a professional finish. 
            Precision protects the integrity of the installation and avoids costly rework. Remember to use consistent reference points, 
            maintain appropriate tolerances, and always verify measurements before installation.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Test Your Knowledge: Following Dimensions, Levels, and Tolerances" />

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="../2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Setting Out
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="../2-4">
              Next: Avoiding Common Errors
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section2_3;