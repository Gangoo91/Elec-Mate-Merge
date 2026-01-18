import { ArrowLeft, ArrowRight, HardHat, Shield, Lightbulb, Eye, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      standards: "600mm minimum clearance, adequate headroom, emergency exit compliance, disability access"
    },
    {
      category: "Working Space",
      description: "Ensuring adequate space for safe and efficient working",
      factors: "Equipment clearance, tool storage space, movement areas, emergency access",
      standards: "600mm around equipment, sufficient headroom, clear emergency routes, adequate ventilation"
    },
    {
      category: "Height Work Equipment",
      description: "Selection and setup of appropriate access equipment",
      factors: "Working height, duration of work, load requirements, ground conditions",
      standards: "PASMA for towers, 3:1 ratio for ladders, guardrails above 2m, inspection certificates"
    },
  ];

  const safetyMeasures = [
    {
      measure: "Electrical Isolation",
      purpose: "Prevent electrical shock and ensure safe working conditions",
      procedure: "Isolate, lock off, test dead, post warning notices, retain keys",
      equipment: "Lockout devices, voltage testers, warning signs, isolation locks",
    },
    {
      measure: "Area Protection",
      purpose: "Protect workers and others from work-related hazards",
      procedure: "Establish exclusion zones, erect barriers, post warning signs, brief personnel",
      equipment: "Barriers, cones, warning tape, signage, high-visibility markers",
    },
    {
      measure: "Hazard Control",
      purpose: "Identify and control potential hazards before work begins",
      procedure: "Survey work area, assess risks, implement controls, monitor effectiveness",
      equipment: "Detection equipment, protective barriers, warning devices, PPE",
    },
  ];

  const lightingRequirements = [
    {
      task: "General Installation",
      minLux: "200 lux",
      requirements: "Even distribution, minimal shadows, adequate coverage",
      equipment: "LED work lights, fluorescent units, portable floodlights",
    },
    {
      task: "Fine Work (Terminations)",
      minLux: "500 lux",
      requirements: "Directional lighting, good colour rendering, close proximity",
      equipment: "Adjustable LED lights, head torches, task lighting",
    },
    {
      task: "Testing and Inspection",
      minLux: "750 lux",
      requirements: "High-quality lighting, no glare, true colour representation",
      equipment: "High-output LED panels, inspection lamps, colour-corrected lighting",
    },
    {
      task: "Emergency Work",
      minLux: "50 lux minimum",
      requirements: "Portable, battery-powered, reliable operation",
      equipment: "Battery LED lights, emergency torches, rechargeable units",
    },
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
              Back to Section 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 1.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Preparing the Work Area
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master essential work area preparation including access, safety measures, and lighting requirements.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Check physical access and ensure adequate working space.</li>
                  <li>Isolate electrical supplies and establish safety zones.</li>
                  <li>Provide appropriate lighting for all phases of work.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Spot:</strong> Trip hazards, inadequate lighting, overhead services.</li>
                  <li><strong>Use:</strong> Proper isolation procedures, adequate lighting, barriers.</li>
                  <li><strong>Check:</strong> Access routes, lighting levels, safety measures.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-white/90">
              <li>Assess site access and working space requirements for the task.</li>
              <li>Implement safety measures to protect workers and others on site.</li>
              <li>Provide adequate lighting for safe and accurate installation.</li>
              <li>Identify hazards and take steps to control or eliminate them before starting work.</li>
              <li>Ensure compliance with health and safety regulations during preparation.</li>
            </ul>
          </section>

          {/* Access Considerations */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              <HardHat className="w-5 h-5" /> Access Considerations
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Proper access planning ensures materials, personnel, and equipment can reach the work area safely and efficiently.
              Poor access planning leads to delays, safety hazards, and increased costs.
            </p>

            <div className="space-y-4">
              {accessConsiderations.map((access, i) => (
                <div key={i} className="rounded-lg p-4 border-l-2 border-elec-yellow/50 bg-white/5">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-elec-yellow mb-1">{access.category}</p>
                      <p className="text-sm text-white/80 mb-2">{access.description}</p>
                      <div className="text-xs text-white/70 bg-black/20 p-2 rounded mb-2">
                        <strong>Factors:</strong> {access.factors}
                      </div>
                      <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                        <strong>Standards:</strong> {access.standards}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck {...quickChecks[0]} />
          </div>

          {/* Safety Preparation */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              <Shield className="w-5 h-5" /> Safety Preparation
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Safety preparation involves implementing measures to protect workers and others from electrical, physical,
              and environmental hazards present in the work area.
            </p>

            <div className="space-y-4">
              {safetyMeasures.map((safety, i) => (
                <div key={i} className="rounded-lg p-4 border-l-2 border-green-500/50 bg-green-500/5">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-green-400 mb-1">{safety.measure}</p>
                      <p className="text-sm text-white/80 mb-2">{safety.purpose}</p>
                      <div className="text-xs text-white/70 bg-black/20 p-2 rounded mb-2">
                        <strong>Procedure:</strong> {safety.procedure}
                      </div>
                      <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                        <strong>Equipment:</strong> {safety.equipment}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck {...quickChecks[1]} />
          </div>

          {/* Lighting Requirements */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              <Lightbulb className="w-5 h-5" /> Lighting Requirements
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Adequate lighting is essential for safe and accurate electrical work. Insufficient lighting leads to mistakes,
              accidents, and poor quality installations that may fail inspection.
            </p>

            <div className="space-y-4">
              {lightingRequirements.map((lighting, i) => (
                <div key={i} className="rounded-lg p-4 border-l-2 border-purple-500/50 bg-purple-500/5">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-purple-400 mb-1">{lighting.task}</p>
                      <p className="text-sm text-white/80 mb-2">Minimum level: {lighting.minLux}</p>
                      <div className="text-xs text-white/70 bg-black/20 p-2 rounded mb-2">
                        <strong>Requirements:</strong> {lighting.requirements}
                      </div>
                      <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                        <strong>Equipment:</strong> {lighting.equipment}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck {...quickChecks[2]} />
          </div>

          {/* Hazard Identification and Control */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              <AlertTriangle className="w-5 h-5" /> Hazard Identification and Control
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Systematic hazard identification and control is essential before starting any electrical work.
              This involves surveying the work area and implementing appropriate control measures.
            </p>

            <div className="rounded-lg p-4 border-l-2 border-orange-500/50 bg-orange-500/5">
              <h4 className="font-semibold text-orange-400 mb-3">Common Hazards and Controls</h4>
              <div className="grid md:grid-cols-2 gap-4 text-xs text-white/80">
                <div className="space-y-2">
                  <div className="bg-black/20 p-2 rounded">
                    <strong>Overhead Services:</strong> Survey and mark all overhead cables and pipes
                  </div>
                  <div className="bg-black/20 p-2 rounded">
                    <strong>Sharp Edges:</strong> Use edge protection and appropriate PPE
                  </div>
                  <div className="bg-black/20 p-2 rounded">
                    <strong>Unstable Structures:</strong> Assess and shore up before working
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-black/20 p-2 rounded">
                    <strong>Damp Conditions:</strong> Use IP-rated equipment and RCD protection
                  </div>
                  <div className="bg-black/20 p-2 rounded">
                    <strong>Confined Spaces:</strong> Follow confined space procedures
                  </div>
                  <div className="bg-black/20 p-2 rounded">
                    <strong>Asbestos Materials:</strong> Stop work and report to supervisor
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Regulatory Requirements */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Regulatory Requirements
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Work area preparation must comply with relevant health and safety legislation and electrical regulations.
            </p>

            <div className="rounded-lg p-4 border-l-2 border-red-500/50 bg-red-500/5">
              <h4 className="font-semibold text-red-400 mb-3">Key Regulations</h4>
              <div className="grid md:grid-cols-3 gap-4 text-xs text-white/80">
                <div className="bg-black/20 p-3 rounded">
                  <strong className="block mb-2 text-white">Health and Safety at Work Act 1974</strong>
                  <ul className="space-y-1">
                    <li>• Safe working environment</li>
                    <li>• Adequate welfare facilities</li>
                    <li>• Risk assessment requirements</li>
                    <li>• Information and training</li>
                  </ul>
                </div>
                <div className="bg-black/20 p-3 rounded">
                  <strong className="block mb-2 text-white">Work at Height Regulations 2005</strong>
                  <ul className="space-y-1">
                    <li>• Avoid work at height where possible</li>
                    <li>• Use work equipment to prevent falls</li>
                    <li>• Minimise distance and consequences</li>
                    <li>• Competent person requirements</li>
                  </ul>
                </div>
                <div className="bg-black/20 p-3 rounded">
                  <strong className="block mb-2 text-white">Electricity at Work Regulations 1989</strong>
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

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              <Eye className="w-5 h-5" /> Real-World Example
            </h2>
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg border-l-2 border-l-red-500">
              <p className="text-sm text-white/80 mb-3">
                During a refurbishment project, electricians worked in poorly lit areas without additional lighting.
                As a result, several wiring errors occurred, leading to failed inspection and costly rework.
                Proper lighting provision from the start would have avoided the issue.
              </p>
              <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                <strong>Lesson:</strong> Adequate lighting is essential for quality work and passing inspections.
                The cost of proper lighting setup is minimal compared to rework expenses.
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-white/10 p-4">
                <p className="font-medium text-white mb-1">Is portable lighting always needed?</p>
                <p className="text-sm text-white/70">Not if existing lighting is adequate, but temporary lighting should be available for poorly lit areas.</p>
              </div>
              <div className="rounded-lg border border-white/10 p-4">
                <p className="font-medium text-white mb-1">Do I need barriers in domestic settings?</p>
                <p className="text-sm text-white/70">If there's any risk to occupants or other trades, barriers or clear marking of the work zone should be used.</p>
              </div>
              <div className="rounded-lg border border-white/10 p-4">
                <p className="font-medium text-white mb-1">Can I work in damp areas without special precautions?</p>
                <p className="text-sm text-white/70">No — use equipment with the correct IP rating and wear appropriate PPE.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-elec-yellow" /> Summary
              </h2>
              <p className="text-sm text-white/80">
                Preparing the work area ensures safety, efficiency, and quality. Adequate access, safety measures, and lighting
                must be in place before work starts, in line with health and safety regulations. Proper preparation prevents
                accidents, improves work quality, and ensures regulatory compliance.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Test your knowledge</h2>
            <Quiz
              questions={quizQuestions}
              title="Test Your Knowledge: Preparing the Work Area"
            />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Workflow Planning
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Back to Section 1
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section1_5;
