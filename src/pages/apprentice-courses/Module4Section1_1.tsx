import { ArrowLeft, ArrowRight, FileText, Eye, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const Module4Section1_1 = () => {
  useSEO(
    "Reading Installation Drawings and Specifications | Level 2 Electrical",
    "Interpret drawings, symbols and specifications to deliver compliant installations to BS 7671."
  );

  // Quiz (end of page)
  const quizQuestions = [
    {
      id: 1,
      question: "Which type of drawing shows the physical layout of devices and containment?",
      options: ["Schematic diagram", "Layout drawing", "Single-line diagram", "Circuit schedule"],
      correctAnswer: 1,
      explanation:
        "Layout drawings show the physical location of equipment, wiring routes and containment systems.",
    },
    {
      id: 2,
      question: "True or False: Specifications only cover materials, not installation methods.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False – specifications cover materials and installation methods, including workmanship standards.",
    },
    {
      id: 3,
      question: "What information is found in a title block?",
      options: [
        "Only the project name",
        "Project name, drawing number, scale, date, and issue number",
        "Just the drawing number",
        "Only the scale and date",
      ],
      correctAnswer: 1,
      explanation:
        "The title block contains essential information such as project name, drawing number, scale, date and issue.",
    },
    {
      id: 4,
      question: "Why is version control important when working from drawings?",
      options: [
        "It's not important",
        "Prevents working from outdated or incorrect information",
        "Only for legal purposes",
        "To track who drew the plans",
      ],
      correctAnswer: 1,
      explanation: "It ensures you work from the latest, accurate information and avoid costly errors.",
    },
    {
      id: 5,
      question: "What does a single-line diagram represent?",
      options: [
        "Physical layout of equipment",
        "A simplified representation of main electrical connections",
        "Cable containment routes",
        "Earth bonding arrangements",
      ],
      correctAnswer: 1,
      explanation:
        "Single-line diagrams provide a simplified overview of the main electrical connections in a system.",
    },
    {
      id: 6,
      question: "Which is an example of a symbol you might find on an electrical drawing?",
      options: ["Traffic light symbol", "Socket outlet symbol", "Car parking symbol", "Fire exit symbol"],
      correctAnswer: 1,
      explanation:
        "Socket outlet, lighting and earth symbols are common on electrical drawings and in their legends.",
    },
    {
      id: 7,
      question: "Which document describes performance requirements and workmanship standards?",
      options: ["The drawing only", "The specification", "BS 7671 only", "The contract"],
      correctAnswer: 1,
      explanation: "The specification covers performance, quality and workmanship requirements.",
    },
    {
      id: 8,
      question:
        "If there's a conflict between a drawing and a specification, what should you do?",
      options: [
        "Follow the drawing",
        "Follow the specification",
        "Seek clarification from the designer or supervisor",
        "Ignore both",
      ],
      correctAnswer: 2,
      explanation:
        "Always seek clarification from the designer or supervisor before proceeding with the work.",
    },
  ];

  // Inline knowledge checks
  const quickChecks = [
    {
      id: "purpose-check",
      question: "What is the purpose of a schematic diagram?",
      options: [
        "To show physical layout",
        "To show electrical connections and functional relationships",
        "To list cable sizes",
        "To show containment routes",
      ],
      correctIndex: 1,
      explanation:
        "Schematic diagrams show electrical connections and functional relationships between components.",
    },
    {
      id: "legend-check",
      question: "Why is the legend on a drawing important?",
      options: ["It's just decoration", "It helps interpret symbols correctly", "It shows the scale", "It shows the date"],
      correctIndex: 1,
      explanation: "The legend ensures symbols are interpreted consistently across the project.",
    },
    {
      id: "version-check",
      question: "Name one risk of using an outdated drawing.",
      options: ["Nothing happens", "Incorrect installation requiring rework", "Better results", "Faster installation"],
      correctIndex: 1,
      explanation:
        "Using outdated drawings can lead to incorrect installations, costly rework and safety issues.",
    },
  ];

  const drawingTypes = [
    {
      type: "Layout Drawings",
      description: "Show the physical location of equipment, wiring routes and containment.",
      use: "Installation positioning and routing",
    },
    {
      type: "Schematic Diagrams",
      description: "Show electrical connections and functional relationships between components.",
      use: "Understanding circuit operation",
    },
    {
      type: "Single-Line Diagrams",
      description: "Simplified representation showing only main connections.",
      use: "System overview and main distribution",
    },
    {
      type: "Schedules",
      description:
        "Tabulated data including circuit details, cable sizes and protective device ratings.",
      use: "Component specifications and ratings",
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
              <span className="text-white/60">Section 1.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Reading Installation Drawings and Specifications
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learn to read drawings, symbols and specifications to deliver safe, compliant work to BS 7671.
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
                  <li>Drawings = routes, devices, containment; specs = materials and workmanship.</li>
                  <li>Understand symbols, title block and scale before starting.</li>
                  <li>Always work from the latest issue to avoid rework and safety risks.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Spot:</strong> Title block, key/legend, symbol list, schedules.</li>
                  <li><strong>Use:</strong> Trace circuits, follow containment, confirm specs.</li>
                  <li><strong>Check:</strong> Scale, issue/version, manufacturer instructions vs BS 7671.</li>
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
              <li>Identify common symbols used in electrical drawings.</li>
              <li>Interpret wiring diagrams, schematic layouts and schedules.</li>
              <li>Understand the relationship between the drawing and written specifications.</li>
              <li>Cross‑reference drawings with regulations and manufacturer requirements.</li>
              <li>Recognise the importance of version control and drawing updates.</li>
            </ul>
          </section>

          {/* Purpose of Installation Drawings */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Purpose of Installation Drawings
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-lg p-4 bg-white/5 border border-white/10 text-center">
                <Eye className="w-8 h-8 text-elec-yellow mx-auto mb-2" />
                <p className="font-semibold text-white">Visual Representation</p>
                <p className="text-sm text-white/70">Shows the electrical system layout</p>
              </div>
              <div className="rounded-lg p-4 bg-white/5 border border-white/10 text-center">
                <CheckCircle className="w-8 h-8 text-elec-yellow mx-auto mb-2" />
                <p className="font-semibold text-white">Clear Indication</p>
                <p className="text-sm text-white/70">Routes, connection points, containment, device locations</p>
              </div>
              <div className="rounded-lg p-4 bg-white/5 border border-white/10 text-center">
                <AlertTriangle className="w-8 h-8 text-elec-yellow mx-auto mb-2" />
                <p className="font-semibold text-white">Compliance Assurance</p>
                <p className="text-sm text-white/70">Helps meet design intent and regulations</p>
              </div>
            </div>
          </section>

          {/* Types of Electrical Drawings */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Types of Electrical Drawings
            </h2>
            <div className="space-y-3">
              {drawingTypes.map((d, i) => (
                <div key={i} className="rounded-lg p-4 border-l-2 border-elec-yellow/50 bg-white/5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <p className="font-semibold text-elec-yellow">{d.type}</p>
                    <p className="text-sm text-white/80 flex-1">{d.description}</p>
                    <span className="text-xs px-2 py-1 bg-white/10 rounded text-white/70 w-fit">{d.use}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Common Symbols and Notations */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Common Symbols and Notations
            </h2>
            <div className="rounded-lg p-4 bg-elec-yellow/5 border-l-2 border-elec-yellow/50 text-sm text-white/90">
              <ul className="list-disc pl-5 space-y-1">
                <li>Socket outlets, light fittings, switches, distribution boards.</li>
                <li>Cable types and containment symbols.</li>
                <li>Earth and bonding symbols.</li>
                <li>Always use the key/legend for consistent interpretation.</li>
              </ul>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck {...quickChecks[0]} />
          </div>

          {/* Understanding Specifications */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Understanding Specifications
            </h2>
            <div className="rounded-lg p-4 bg-white/5 border border-white/10 text-sm text-white/90 space-y-2">
              <p>Written documents that describe materials, workmanship and standards to follow.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Include performance requirements, quality standards and installation methods.</li>
                <li>May refer to BS 7671, building regulations or manufacturer instructions.</li>
              </ul>
            </div>
          </section>

          {/* How to Read Drawings Effectively */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              How to Read Drawings Effectively
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Follow this systematic approach to ensure accurate interpretation of electrical drawings:
            </p>

            <div className="space-y-4">
              <div className="rounded-lg p-4 border-l-2 border-elec-yellow/50 bg-elec-yellow/5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow mb-1">Check the Title Block</p>
                    <p className="text-sm text-white/80 mb-2">Project name, drawing number, scale and date.</p>
                    <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                      <strong>What to look for:</strong> Drawing number for reference, revision letter/number,
                      scale (e.g., 1:50), issue date, project name and client details. Always verify you have the latest revision.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-2 border-elec-yellow/50 bg-elec-yellow/5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow mb-1">Understand the Scale</p>
                    <p className="text-sm text-white/80 mb-2">Ensure accurate measurement and placement.</p>
                    <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                      <strong>Key considerations:</strong> Scale affects cable lengths, containment routes and positioning.
                      Common scales: 1:50 (general layouts), 1:20 (detailed areas), 1:100 (site plans). Use a scale ruler for accurate measurements.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-2 border-elec-yellow/50 bg-elec-yellow/5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow mb-1">Review the Key/Legend</p>
                    <p className="text-sm text-white/80 mb-2">Interpret symbols correctly.</p>
                    <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                      <strong>Essential symbols:</strong> Socket outlets (13A, 20A), lighting points, switches (1-way, 2-way),
                      distribution boards, cable types (T&E, SWA), containment (conduit, trunking). Keep the legend visible while working.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-2 border-elec-yellow/50 bg-elec-yellow/5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow mb-1">Follow the Circuit</p>
                    <p className="text-sm text-white/80 mb-2">Trace wiring routes and connections.</p>
                    <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                      <strong>Systematic approach:</strong> Start from the distribution board, follow circuit numbers,
                      trace cable routes through containment, identify connection points. Note cable sizes, protective device ratings and switching arrangements.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-2 border-elec-yellow/50 bg-elec-yellow/5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow mb-1">Cross-Reference with Specifications</p>
                    <p className="text-sm text-white/80 mb-2">Confirm compliance with written requirements.</p>
                    <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                      <strong>Check against:</strong> Cable specifications, equipment schedules, installation methods,
                      BS 7671 requirements, manufacturer instructions. Resolve any conflicts before starting work.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-2 border-elec-yellow/50 bg-white/5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow mb-1">Verify Dimensions and Levels</p>
                    <p className="text-sm text-white/80 mb-2">Check heights, depths and positioning requirements.</p>
                    <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                      <strong>Critical measurements:</strong> Socket heights (450mm above floor), switch heights (1200mm),
                      distribution board positions, cable entry points. Cross-check with building drawings and site conditions.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">Pro Tip</p>
              <p className="text-xs text-white/80">
                Always keep a copy of the drawing with you on site. Mark up any discrepancies or clarifications
                needed and report them before proceeding. Take photos of existing conditions that might affect the installation.
              </p>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck {...quickChecks[1]} />
          </div>

          {/* Version Control */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Version Control
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-lg p-4 bg-white/5 border border-white/10 text-center">
                <AlertTriangle className="w-8 h-8 text-elec-yellow mx-auto mb-2" />
                <p className="font-semibold text-white">Latest Issue</p>
                <p className="text-sm text-white/70">Always work from the latest drawing issue</p>
              </div>
              <div className="rounded-lg p-4 bg-white/5 border border-white/10 text-center">
                <FileText className="w-8 h-8 text-elec-yellow mx-auto mb-2" />
                <p className="font-semibold text-white">Remove Superseded</p>
                <p className="text-sm text-white/70">Remove superseded drawings from the work area</p>
              </div>
              <div className="rounded-lg p-4 bg-white/5 border border-white/10 text-center">
                <FileText className="w-8 h-8 text-elec-yellow mx-auto mb-2" />
                <p className="font-semibold text-white">Raise Discrepancies</p>
                <p className="text-sm text-white/70">Raise any discrepancies with your supervisor or designer</p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck {...quickChecks[2]} />
          </div>

          {/* Real‑World Example */}
          <section className="mb-10">
            <div className="rounded-lg p-4 bg-white/5 border border-white/10">
              <p className="font-semibold text-white mb-2">Real‑World Example</p>
              <p className="text-sm text-white/80">
                An installer used an outdated layout drawing showing a distribution board in the wrong location.
                Result: 15 metres of cable installed incorrectly, requiring removal and rework — costing time and money.
              </p>
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
                <p className="font-medium text-white mb-1">What if a symbol on a drawing is unfamiliar?</p>
                <p className="text-sm text-white/70">Refer to the legend; if unclear, ask the designer or supervisor.</p>
              </div>
              <div className="rounded-lg border border-white/10 p-4">
                <p className="font-medium text-white mb-1">Do I need to understand scale for electrical work?</p>
                <p className="text-sm text-white/70">Yes — scale affects containment lengths, cable sizes and positioning accuracy.</p>
              </div>
              <div className="rounded-lg border border-white/10 p-4">
                <p className="font-medium text-white mb-1">Who issues the latest drawings?</p>
                <p className="text-sm text-white/70">The project manager or site supervisor; installers must still check they have the latest version.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-elec-yellow" /> Summary
              </h2>
              <p className="text-white/80 text-sm">
                Reading installation drawings and specifications ensures accurate, compliant and efficient work. By understanding
                symbols, diagrams and written requirements, electricians deliver to the correct standard without costly errors.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Test your knowledge</h2>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Section 1
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-2">
                Next: Cable Routes
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section1_1;
