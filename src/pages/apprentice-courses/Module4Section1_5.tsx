import { ArrowLeft, ArrowRight, HardHat, Shield, Lightbulb, Eye, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const Module4Section1_5 = () => {
  useSEO(
    "Preparing the Work Area - Access, Safety, and Lighting | Level 2 Electrical",
    "Learn essential work area preparation including access considerations, safety measures, and lighting requirements for electrical installations."
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "Which regulation requires safe working environments?",
      options: [
        "BS 7671",
        "Work at Height Regulations", 
        "Health and Safety at Work Act 1974",
        "PPE Regulations"
      ],
      correctAnswer: 2,
      explanation: "The Health and Safety at Work Act 1974 is the primary legislation requiring employers to provide safe working environments for all workers."
    },
    {
      id: 2,
      question: "True or False: Lighting levels are only important during testing.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False - adequate lighting is important throughout all phases of electrical installation work to ensure safety, accuracy, and quality."
    },
    {
      id: 3,
      question: "Name one safety measure to protect people from overhead work.",
      options: [
        "Barriers and exclusion zones",
        "Working faster",
        "Using smaller tools",
        "Working alone"
      ],
      correctAnswer: 0,
      explanation: "Barriers, exclusion zones, and warning signs help protect people from falling objects during overhead work."
    },
    {
      id: 4,
      question: "What is the first step when preparing to work near live circuits?",
      options: [
        "Put on PPE",
        "Isolate and lock off power",
        "Set up lighting",
        "Check tools"
      ],
      correctAnswer: 1,
      explanation: "The first and most critical step is to isolate and lock off power to ensure no live circuits pose a danger during work."
    },
    {
      id: 5,
      question: "Give one reason why adequate lighting is important in electrical work.",
      options: [
        "Prevents mistakes and improves safety",
        "Saves electricity",
        "Looks professional",
        "Required by insurance"
      ],
      correctAnswer: 0,
      explanation: "Adequate lighting prevents mistakes, improves safety, and ensures quality work by allowing accurate installation and inspection."
    },
    {
      id: 6,
      question: "Which type of lighting is commonly used for temporary site lighting?",
      options: [
        "Halogen floodlight",
        "LED work light",
        "Candle lamp",
        "Neon tube"
      ],
      correctAnswer: 1,
      explanation: "LED work lights are commonly used for temporary site lighting due to their efficiency, durability, and bright output."
    },
    {
      id: 7,
      question: "Name one factor to check before bringing materials into the work area.",
      options: [
        "Available space and access routes",
        "Weather conditions",
        "Time of day",
        "Number of workers"
      ],
      correctAnswer: 0,
      explanation: "Available space and clear access routes must be checked to ensure materials can be safely transported and stored in the work area."
    },
    {
      id: 8,
      question: "Why should walkways be kept clear?",
      options: [
        "To prevent trips and ensure emergency access",
        "To save space",
        "To look tidy",
        "To reduce cleaning"
      ],
      correctAnswer: 0,
      explanation: "Clear walkways prevent trips and falls, and ensure emergency access routes remain available at all times."
    }
  ];

  // Inline knowledge checks
  const quickChecks = [
    {
      id: "access-check",
      question: "Why should trip hazards be removed before work begins?",
      options: ["To save space for materials", "To prevent accidents and ensure safe movement", "To make the area look tidy", "To reduce cleaning time"],
      correctIndex: 1,
      explanation: "Trip hazards must be removed to prevent accidents and ensure safe movement around the work area, maintaining clear access for workers and emergency services.",
    },
    {
      id: "lighting-check",
      question: "Name one method of providing temporary lighting.",
      options: ["Candles", "Mobile phone torch", "Portable LED work lights", "Opening curtains"],
      correctIndex: 2,
      explanation: "Portable LED work lights are commonly used to provide adequate lighting in areas where fixed lighting is insufficient.",
    },
    {
      id: "safety-check",
      question: "What must be done with live circuits before starting electrical work in that area?",
      options: ["Put up warning signs only", "Work carefully around them", "Isolate and lock off power", "Use insulated tools only"],
      correctIndex: 2,
      explanation: "Live circuits must be isolated and locked off using proper lockout procedures to ensure worker safety.",
    },
  ];

  const accessConsiderations = [
    {
      category: "Physical Access",
      description: "Essential checks for ensuring material and personnel access",
      factors: "Doorway dimensions, corridor clearance, scaffolding access points, material delivery routes",
      considerations: "Minimum clearances, lifting equipment requirements, route planning, temporary access provision",
      standards: "600mm minimum clearance, adequate headroom, emergency exit compliance, disability access"
    },
    {
      category: "Working Space",
      description: "Ensuring adequate space for safe and efficient working",
      factors: "Equipment clearance, tool storage space, movement areas, emergency access",
      considerations: "BS 7671 space requirements, workspace ergonomics, material handling space, ventilation",
      standards: "600mm around equipment, sufficient headroom, clear emergency routes, adequate ventilation"
    },
    {
      category: "Height Work Equipment",
      description: "Selection and setup of appropriate access equipment",
      factors: "Working height, duration of work, load requirements, ground conditions",
      considerations: "Equipment stability, weather conditions, competency requirements, inspection status",
      standards: "PASMA for towers, 3:1 ratio for ladders, guardrails above 2m, inspection certificates"
    },
  ];

  const safetyMeasures = [
    {
      measure: "Electrical Isolation",
      purpose: "Prevent electrical shock and ensure safe working conditions",
      procedure: "Isolate, lock off, test dead, post warning notices, retain keys",
      equipment: "Lockout devices, voltage testers, warning signs, isolation locks",
      compliance: "Electricity at Work Regulations, BS 7671, company procedures"
    },
    {
      measure: "Area Protection",
      purpose: "Protect workers and others from work-related hazards",
      procedure: "Establish exclusion zones, erect barriers, post warning signs, brief personnel",
      equipment: "Barriers, cones, warning tape, signage, high-visibility markers",
      compliance: "Health and Safety at Work Act, Construction Regulations, site rules"
    },
    {
      measure: "Hazard Control",
      purpose: "Identify and control potential hazards before work begins",
      procedure: "Survey work area, assess risks, implement controls, monitor effectiveness",
      equipment: "Detection equipment, protective barriers, warning devices, PPE",
      compliance: "Management of Health and Safety at Work Regulations, risk assessment"
    },
  ];

  const lightingRequirements = [
    {
      task: "General Installation",
      minLux: "200 lux",
      requirements: "Even distribution, minimal shadows, adequate coverage",
      equipment: "LED work lights, fluorescent units, portable floodlights",
      positioning: "Multiple angles to eliminate shadows, avoid glare, maintain clearance"
    },
    {
      task: "Fine Work (Terminations)",
      minLux: "500 lux", 
      requirements: "Directional lighting, good colour rendering, close proximity",
      equipment: "Adjustable LED lights, head torches, task lighting",
      positioning: "Close to work surface, adjustable direction, backup lighting available"
    },
    {
      task: "Testing and Inspection",
      minLux: "750 lux",
      requirements: "High-quality lighting, no glare, true colour representation",
      equipment: "High-output LED panels, inspection lamps, colour-corrected lighting",
      positioning: "Multiple sources, indirect lighting to reduce glare, full coverage"
    },
    {
      task: "Emergency Work",
      minLux: "50 lux minimum",
      requirements: "Portable, battery-powered, reliable operation",
      equipment: "Battery LED lights, emergency torches, rechargeable units",
      positioning: "Personal lighting, backup sources, easy access and deployment"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4.1
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
              <HardHat className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 4.1.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Preparing the Work Area
          </h1>
          <p className="text-muted-foreground">
            Master essential work area preparation including access, safety measures, and lighting requirements.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Check physical access and ensure adequate working space.</li>
                <li>Isolate electrical supplies and establish safety zones.</li>
                <li>Provide appropriate lighting for all phases of work.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Trip hazards, inadequate lighting, overhead services.</li>
                <li><strong>Use:</strong> Proper isolation procedures, adequate lighting, barriers.</li>
                <li><strong>Check:</strong> Access routes, lighting levels, safety measures.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Assess site access and working space requirements for the task.</li>
            <li>Implement safety measures to protect workers and others on site.</li>
            <li>Provide adequate lighting for safe and accurate installation.</li>
            <li>Identify hazards and take steps to control or eliminate them before starting work.</li>
            <li>Ensure compliance with health and safety regulations during preparation.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Access Considerations */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Access Considerations</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Proper access planning ensures materials, personnel, and equipment can reach the work area safely and efficiently.
              Poor access planning leads to delays, safety hazards, and increased costs.
            </p>
            
            <div className="space-y-4">
              {accessConsiderations.map((access, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">{access.category}</p>
                      <p className="text-xs sm:text-sm text-foreground mb-2">{access.description}</p>
                      <div className="text-xs text-foreground bg-background/50 p-2 rounded border mb-2">
                        <strong>Factors:</strong> {access.factors}
                      </div>
                      <div className="text-xs text-foreground bg-background/50 p-2 rounded border mb-2">
                        <strong>Considerations:</strong> {access.considerations}
                      </div>
                      <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                        <strong>Standards:</strong> {access.standards}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-6" />

          {/* Safety Preparation */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Safety Preparation</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Safety preparation involves implementing measures to protect workers and others from electrical, physical, 
              and environmental hazards present in the work area.
            </p>
            
            <div className="space-y-4">
              {safetyMeasures.map((safety, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-green-600 dark:text-green-400 mb-1">{safety.measure}</p>
                      <p className="text-xs sm:text-sm text-foreground mb-2">{safety.purpose}</p>
                      <div className="text-xs text-foreground bg-background/50 p-2 rounded border mb-2">
                        <strong>Procedure:</strong> {safety.procedure}
                      </div>
                      <div className="text-xs text-foreground bg-background/50 p-2 rounded border mb-2">
                        <strong>Equipment:</strong> {safety.equipment}
                      </div>
                      <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                        <strong>Compliance:</strong> {safety.compliance}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-6" />

          {/* Quick Knowledge Check 1 */}
          <div className="mb-6">
            <InlineCheck {...quickChecks[0]} />
          </div>

          <Separator className="my-6" />

          {/* Lighting Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Lighting Requirements</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Adequate lighting is essential for safe and accurate electrical work. Insufficient lighting leads to mistakes, 
              accidents, and poor quality installations that may fail inspection.
            </p>
            
            <div className="space-y-4">
              {lightingRequirements.map((lighting, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">{lighting.task}</p>
                      <p className="text-xs sm:text-sm text-foreground mb-2">Minimum level: {lighting.minLux}</p>
                      <div className="text-xs text-foreground bg-background/50 p-2 rounded border mb-2">
                        <strong>Requirements:</strong> {lighting.requirements}
                      </div>
                      <div className="text-xs text-foreground bg-background/50 p-2 rounded border mb-2">
                        <strong>Equipment:</strong> {lighting.equipment}
                      </div>
                      <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                        <strong>Positioning:</strong> {lighting.positioning}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-6" />

          {/* Quick Knowledge Check 2 */}
          <div className="mb-6">
            <InlineCheck {...quickChecks[1]} />
          </div>

          <Separator className="my-6" />

          {/* Hazard Identification and Control */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Hazard Identification and Control</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Systematic hazard identification and control is essential before starting any electrical work. 
              This involves surveying the work area and implementing appropriate control measures.
            </p>
            
            <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
              <h4 className="font-semibold text-orange-600 dark:text-emerald-400 mb-3">Common Hazards and Controls</h4>
              <div className="grid md:grid-cols-2 gap-4 text-xs text-foreground">
                <div className="space-y-2">
                  <div className="bg-background/50 p-2 rounded border">
                    <strong>Overhead Services:</strong> Survey and mark all overhead cables and pipes
                  </div>
                  <div className="bg-background/50 p-2 rounded border">
                    <strong>Sharp Edges:</strong> Use edge protection and appropriate PPE
                  </div>
                  <div className="bg-background/50 p-2 rounded border">
                    <strong>Unstable Structures:</strong> Assess and shore up before working
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-background/50 p-2 rounded border">
                    <strong>Damp Conditions:</strong> Use IP-rated equipment and RCD protection
                  </div>
                  <div className="bg-background/50 p-2 rounded border">
                    <strong>Confined Spaces:</strong> Follow confined space procedures
                  </div>
                  <div className="bg-background/50 p-2 rounded border">
                    <strong>Asbestos Materials:</strong> Stop work and report to supervisor
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Quick Knowledge Check 3 */}
          <div className="mb-6">
            <InlineCheck {...quickChecks[2]} />
          </div>

          <Separator className="my-6" />

          {/* Regulatory Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Regulatory Requirements</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Work area preparation must comply with relevant health and safety legislation and electrical regulations.
            </p>
            
            <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
              <h4 className="font-semibold text-red-600 dark:text-emerald-400 mb-3">Key Regulations</h4>
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-xs text-foreground">
                <div className="bg-background/50 p-3 rounded border">
                  <strong className="block mb-2">Health and Safety at Work Act 1974</strong>
                  <ul className="space-y-1">
                    <li>• Safe working environment</li>
                    <li>• Adequate welfare facilities</li>
                    <li>• Risk assessment requirements</li>
                    <li>• Information and training</li>
                  </ul>
                </div>
                <div className="bg-background/50 p-3 rounded border">
                  <strong className="block mb-2">Work at Height Regulations 2005</strong>
                  <ul className="space-y-1">
                    <li>• Avoid work at height where possible</li>
                    <li>• Use work equipment to prevent falls</li>
                    <li>• Minimise distance and consequences</li>
                    <li>• Competent person requirements</li>
                  </ul>
                </div>
                <div className="bg-background/50 p-3 rounded border">
                  <strong className="block mb-2">Electricity at Work Regulations 1989</strong>
                  <ul className="space-y-1">
                    <li>• Prevent danger from electrical systems</li>
                    <li>• Safe isolation procedures</li>
                    <li>• Competent persons only</li>
                    <li>• Regular inspection and testing</li>
                  </ul>
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
            During a refurbishment project, electricians worked in poorly lit areas without additional lighting. 
            As a result, several wiring errors occurred, leading to failed inspection and costly rework. 
            Proper lighting provision from the start would have avoided the issue.
          </p>
          <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded p-3">
            <p className="text-xs text-blue-800 dark:text-blue-200">
              <strong>Lesson:</strong> Adequate lighting is essential for quality work and passing inspections. 
              The cost of proper lighting setup is minimal compared to rework expenses.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-6 bg-card">
          <h3 className="font-semibold text-foreground mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-foreground mb-1">Q: Is portable lighting always needed?</p>
              <p className="text-muted-foreground">A: Not if existing lighting is adequate, but temporary lighting should be available for poorly lit areas.</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Q: Do I need barriers in domestic settings?</p>
              <p className="text-muted-foreground">A: If there's any risk to occupants or other trades, barriers or clear marking of the work zone should be used.</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Q: Can I work in damp areas without special precautions?</p>
              <p className="text-muted-foreground">A: No — use equipment with the correct IP rating and wear appropriate PPE.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h3 className="font-semibold text-foreground mb-3">Summary</h3>
          <p className="text-xs sm:text-sm text-foreground">
            Preparing the work area ensures safety, efficiency, and quality. Adequate access, safety measures, and lighting 
            must be in place before work starts, in line with health and safety regulations. Proper preparation prevents 
            accidents, improves work quality, and ensures regulatory compliance.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz 
          questions={quizQuestions}
          title="Test Your Knowledge: Preparing the Work Area"
        />

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" asChild>
            <Link to="../1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Planning Workflow
            </Link>
          </Button>
          <Button asChild>
            <Link to="../1-6">
              Next: Documentation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section1_5;