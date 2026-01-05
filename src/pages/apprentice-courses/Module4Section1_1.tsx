import { ArrowLeft, ArrowRight, FileText, Eye, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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

  const readingSteps = [
    { step: "1. Check the Title Block", detail: "Project name, drawing number, scale and date." },
    { step: "2. Understand the Scale", detail: "Ensure accurate measurement and placement." },
    { step: "3. Review the Key/Legend", detail: "Interpret symbols correctly." },
    { step: "4. Follow the Circuit", detail: "Trace wiring routes and connections." },
    { step: "5. Cross‑Reference with Specs", detail: "Confirm compliance with written requirements." },
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
        {/* Header (matches Module 3.4.3 style) */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <FileText className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 4.1.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Reading Installation Drawings and Specifications
          </h1>
          <p className="text-muted-foreground">
            Learn to read drawings, symbols and specifications to deliver safe, compliant work to BS 7671.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Drawings = routes, devices, containment; specs = materials and workmanship.</li>
                <li>Understand symbols, title block and scale before starting.</li>
                <li>Always work from the latest issue to avoid rework and safety risks.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Title block, key/legend, symbol list, schedules.</li>
                <li><strong>Use:</strong> Trace circuits, follow containment, confirm specs.</li>
                <li><strong>Check:</strong> Scale, issue/version, manufacturer instructions vs BS 7671.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Identify common symbols used in electrical drawings.</li>
            <li>Interpret wiring diagrams, schematic layouts and schedules.</li>
            <li>Understand the relationship between the drawing and written specifications.</li>
            <li>Cross‑reference drawings with regulations and manufacturer requirements.</li>
            <li>Recognise the importance of version control and drawing updates.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Purpose of Installation Drawings */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Purpose of Installation Drawings
            </h3>
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30 text-center">
                <Eye className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="font-semibold">Visual Representation</p>
                <p className="text-sm text-muted-foreground">Shows the electrical system layout</p>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-emerald-500/30 text-center">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="font-semibold">Clear Indication</p>
                <p className="text-sm text-muted-foreground">Routes, connection points, containment, device locations</p>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30 text-center">
                <AlertTriangle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="font-semibold">Compliance Assurance</p>
                <p className="text-sm text-muted-foreground">Helps meet design intent and regulations</p>
              </div>
            </div>
          </section>

          {/* Types of Electrical Drawings */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3">Types of Electrical Drawings</h3>
            <div className="space-y-3">
              {drawingTypes.map((d, i) => (
                <div key={i} className="rounded-lg p-4 border-l-4 border-l-emerald-500 bg-card">
                  <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                    <p className="font-semibold text-emerald-400">{d.type}</p>
                    <p className="text-sm text-muted-foreground">{d.description}</p>
                    <Badge variant="secondary" className="w-fit text-xs">{d.use}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Common Symbols and Notations */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3">Common Symbols and Notations</h3>
            <div className="rounded-lg p-4 bg-emerald-500/10 border border-emerald-500/30 text-sm">
              <ul className="list-disc pl-6 space-y-1">
                <li>Socket outlets, light fittings, switches, distribution boards.</li>
                <li>Cable types and containment symbols.</li>
                <li>Earth and bonding symbols.</li>
                <li>Always use the key/legend for consistent interpretation.</li>
              </ul>
            </div>
          </section>

          <InlineCheck {...quickChecks[0]} />
          <Separator className="my-6" />

          {/* Understanding Specifications */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3">Understanding Specifications</h3>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30 text-sm space-y-2">
              <p>Written documents that describe materials, workmanship and standards to follow.</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Include performance requirements, quality standards and installation methods.</li>
                <li>May refer to BS 7671, building regulations or manufacturer instructions.</li>
              </ul>
            </div>
          </section>

          {/* How to Read Drawings Effectively */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">How to Read Drawings Effectively</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Follow this systematic approach to ensure accurate interpretation of electrical drawings:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Check the Title Block</p>
                    <p className="text-sm text-muted-foreground mb-2">Project name, drawing number, scale and date.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>What to look for:</strong> Drawing number for reference, revision letter/number, 
                      scale (e.g., 1:50), issue date, project name and client details. Always verify you have the latest revision.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Understand the Scale</p>
                    <p className="text-sm text-muted-foreground mb-2">Ensure accurate measurement and placement.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key considerations:</strong> Scale affects cable lengths, containment routes and positioning. 
                      Common scales: 1:50 (general layouts), 1:20 (detailed areas), 1:100 (site plans). Use a scale ruler for accurate measurements.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Review the Key/Legend</p>
                    <p className="text-sm text-muted-foreground mb-2">Interpret symbols correctly.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Essential symbols:</strong> Socket outlets (13A, 20A), lighting points, switches (1-way, 2-way), 
                      distribution boards, cable types (T&E, SWA), containment (conduit, trunking). Keep the legend visible while working.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Follow the Circuit</p>
                    <p className="text-sm text-muted-foreground mb-2">Trace wiring routes and connections.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Systematic approach:</strong> Start from the distribution board, follow circuit numbers, 
                      trace cable routes through containment, identify connection points. Note cable sizes, protective device ratings and switching arrangements.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-emerald-500/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Cross-Reference with Specifications</p>
                    <p className="text-sm text-muted-foreground mb-2">Confirm compliance with written requirements.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Check against:</strong> Cable specifications, equipment schedules, installation methods, 
                      BS 7671 requirements, manufacturer instructions. Resolve any conflicts before starting work.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Verify Dimensions and Levels</p>
                    <p className="text-sm text-muted-foreground mb-2">Check heights, depths and positioning requirements.</p>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Critical measurements:</strong> Socket heights (450mm above floor), switch heights (1200mm), 
                      distribution board positions, cable entry points. Cross-check with building drawings and site conditions.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <p className="text-sm font-medium text-foreground mb-1">Pro Tip</p>
              <p className="text-xs text-foreground/90">
                Always keep a copy of the drawing with you on site. Mark up any discrepancies or clarifications 
                needed and report them before proceeding. Take photos of existing conditions that might affect the installation.
              </p>
            </div>
          </section>

          <InlineCheck {...quickChecks[1]} />
          <Separator className="my-6" />

          {/* Version Control */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3">Version Control</h3>
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30 text-center">
                <AlertTriangle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="font-semibold">Latest Issue</p>
                <p className="text-sm text-muted-foreground">Always work from the latest drawing issue</p>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30 text-center">
                <FileText className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="font-semibold">Remove Superseded</p>
                <p className="text-sm text-muted-foreground">Remove superseded drawings from the work area</p>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30 text-center">
                <FileText className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="font-semibold">Raise Discrepancies</p>
                <p className="text-sm text-muted-foreground">Raise any discrepancies with your supervisor or designer</p>
              </div>
            </div>
          </section>

          <InlineCheck {...quickChecks[2]} />
          <Separator className="my-6" />

          {/* Real‑World Example */}
          <section className="mb-2">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="font-semibold mb-1">Real‑World Example</p>
              <p className="text-xs sm:text-sm text-foreground">
                An installer used an outdated layout drawing showing a distribution board in the wrong location.
                Result: 15 metres of cable installed incorrectly, requiring removal and rework — costing time and money.
              </p>
            </div>
          </section>
        </Card>

        {/* FAQs */}
        <div className="space-y-4 mb-8">
          <div className="rounded-lg bg-card border border-border/20 p-4">
            <p className="font-medium mb-1">What if a symbol on a drawing is unfamiliar?</p>
            <p className="text-sm">Refer to the legend; if unclear, ask the designer or supervisor.</p>
          </div>
          <div className="rounded-lg bg-card border border-border/20 p-4">
            <p className="font-medium mb-1">Do I need to understand scale for electrical work?</p>
            <p className="text-sm">Yes — scale affects containment lengths, cable sizes and positioning accuracy.</p>
          </div>
          <div className="rounded-lg bg-card border border-border/20 p-4">
            <p className="font-medium mb-1">Who issues the latest drawings?</p>
            <p className="text-sm">The project manager or site supervisor; installers must still check they have the latest version.</p>
          </div>
        </div>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border border-emerald-500/30">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Summary
          </h2>
          <p className="text-foreground/90 text-sm">
            Reading installation drawings and specifications ensures accurate, compliant and efficient work. By understanding
            symbols, diagrams and written requirements, electricians deliver to the correct standard without costly errors.
          </p>
        </Card>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Test your knowledge</h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../1-2">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section1_1;
