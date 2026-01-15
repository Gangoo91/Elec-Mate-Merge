import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";
import { useState } from "react";

const TITLE = "Reading Basic Electrical Installation Drawings - Module 5.1.2 | Level 2 Electrical Course";
const DESCRIPTION = "Master electrical drawing interpretation - understand symbols, scales, circuits and layouts. Essential skills for accurate installation work and BS 7671 compliance.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What does a circle with a cross usually represent?",
    options: ["A socket outlet", "A ceiling light", "A switch", "A distribution board"],
    correctIndex: 1,
    explanation: "A circle with a cross is the standard BS symbol for a ceiling light or luminaire fitting."
  },
  {
    id: 2,
    question: "What must always be checked for site-specific symbols?",
    options: ["The scale", "The legend", "The date", "The title"],
    correctIndex: 1,
    explanation: "The legend must always be checked as symbols may vary between drawings or projects, even when following BS standards."
  },
  {
    id: 3,
    question: "Why is scale important in installation drawings?",
    options: ["To make drawings look professional", "To ensure accurate positioning of equipment", "To save paper", "To meet BS 7671 requirements"],
    correctIndex: 1,
    explanation: "Scale ensures accurate positioning when setting out work - knowing that 1:50 means 1 unit on drawing equals 50 units in real life is essential for correct installation."
  }
];

const Module5Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const quizQuestions = [
    {
      id: 1,
      question: "What type of drawing shows the physical locations of sockets and lights?",
      options: [
        "Circuit diagram",
        "Layout drawing",
        "Wiring diagram",
        "Block diagram"
      ],
      correctAnswer: 1,
      explanation: "Layout drawings show the physical positions of sockets, switches, luminaires, and containment systems within the building."
    },
    {
      id: 2,
      question: "True or False: A schematic shows how components are physically placed in a building.",
      options: [
        "True - it shows physical locations",
        "False - it shows how they are electrically connected",
        "True - but only for large installations",
        "False - it shows cable routes only"
      ],
      correctAnswer: 1,
      explanation: "Schematics (circuit diagrams) show electrical connections between components, not their physical locations in the building."
    },
    {
      id: 3,
      question: "What does '1:50' mean on a drawing?",
      options: [
        "50 components per circuit",
        "1 unit on the drawing equals 50 units in real life",
        "Drawing revision 1 of 50",
        "1 metre equals 50 centimetres"
      ],
      correctAnswer: 1,
      explanation: "1:50 scale means 1 unit of measurement on the drawing represents 50 units in reality (e.g., 1cm on drawing = 50cm on site)."
    },
    {
      id: 4,
      question: "Which drawing type details cable cores and terminals?",
      options: [
        "Layout drawing",
        "Wiring diagram",
        "Block diagram",
        "Site plan"
      ],
      correctAnswer: 1,
      explanation: "Wiring diagrams provide detailed information about cable cores, terminals, and specific connection points."
    },
    {
      id: 5,
      question: "What does the double circle symbol usually represent?",
      options: [
        "A ceiling light",
        "A socket outlet",
        "A switch",
        "A junction box"
      ],
      correctAnswer: 1,
      explanation: "A double circle is the standard BS symbol for a socket outlet or power point."
    },
    {
      id: 6,
      question: "Why should the legend always be checked?",
      options: [
        "It's a legal requirement",
        "Because symbols may vary between drawings or projects",
        "To find the drawing date",
        "To check the scale"
      ],
      correctAnswer: 1,
      explanation: "Legends must be checked because symbols can vary between different projects or designers, even when following BS standards."
    },
    {
      id: 7,
      question: "What information might be found in circuit coding (e.g., L1, N, CPC)?",
      options: [
        "Room numbers",
        "Identification of live, neutral, and protective conductors",
        "Cable lengths",
        "Installation dates"
      ],
      correctAnswer: 1,
      explanation: "Circuit coding identifies different conductors: L1/L2/L3 (live), N (neutral), CPC (circuit protective conductor/earth)."
    },
    {
      id: 8,
      question: "True or False: You can ignore dimensions on drawings if they look right on-site.",
      options: [
        "True - visual estimation is sufficient",
        "False - always follow dimensions",
        "True - if approved by supervisor",
        "False - only for major dimensions"
      ],
      correctAnswer: 1,
      explanation: "Dimensions must always be followed exactly - they ensure correct positioning, clearances, and compliance with regulations."
    },
    {
      id: 9,
      question: "What is a common error when reading installation drawings?",
      options: [
        "Using the correct scale",
        "Misreading scale or ignoring notes",
        "Checking the legend",
        "Following dimensions exactly"
      ],
      correctAnswer: 1,
      explanation: "Common errors include misreading the scale, ignoring important notes, mixing up symbols, and not checking legends."
    },
    {
      id: 10,
      question: "Drawings and specifications must be used together. Why?",
      options: [
        "It's company policy",
        "Because drawings show where to install, and specifications explain how",
        "To increase project costs",
        "Only for complex installations"
      ],
      correctAnswer: 1,
      explanation: "Drawings show the location and layout, whilst specifications explain the methods, materials and standards - both are essential for complete information."
    }
  ];

  const faqs = [
    {
      question: "Are electrical drawings the same as architectural drawings?",
      answer: "No - architectural drawings show building layout, structure, and general arrangements. Electrical drawings focus specifically on circuits, containment, equipment positions, and electrical connections."
    },
    {
      question: "What if site conditions differ from the drawing?",
      answer: "Stop work and confirm with the supervisor or project manager before making any changes. Document the difference and obtain written approval for any modifications to avoid disputes later."
    },
    {
      question: "Do all drawings use the same symbols?",
      answer: "Most follow BS standards, but there can be variations. Always check the legend and symbol key for each set of drawings as different designers may use slight variations or additional symbols."
    },
    {
      question: "How do I know which drawing to use for different tasks?",
      answer: "Layout drawings for positioning equipment, circuit diagrams for understanding electrical connections, wiring diagrams for detailed connections, and block diagrams for overall system understanding."
    },
    {
      question: "What should I do if a drawing is unclear or seems to contain errors?",
      answer: "Don't guess or make assumptions. Raise the issue immediately with your supervisor, document your concerns in writing, and obtain clarification before proceeding with the work."
    }
  ];

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
              Back to Section 5.1
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 5.1.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Reading Basic Electrical Installation Drawings
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master the interpretation of electrical drawings - essential technical documents that guide safe and accurate installation work.
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-5 space-y-1 text-white/80 text-sm">
                  <li>Electrical drawings show locations, circuits, and routing of electrical installations.</li>
                  <li>They use standardised symbols following BS 7671 and BS EN conventions.</li>
                  <li>Drawings are technical documents with legal and contractual significance.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1 text-white/80 text-sm">
                  <li><strong>Spot:</strong> Symbols, scales, legends, dimensions, circuit references, notes.</li>
                  <li><strong>Use:</strong> Layout drawings for positioning, schematics for connections, legends for symbols.</li>
                  <li><strong>Check:</strong> Scale, dimensions, site conditions, conflicts with specs.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Identify different types of electrical installation drawings and their purposes.</li>
              <li>Recognise symbols, scales, and conventions used in electrical drawings.</li>
              <li>Accurately interpret electrical layouts, circuits, and containment systems.</li>
              <li>Apply drawings to set out installation work correctly on site.</li>
              <li>Understand the link between drawings, specifications, and site conditions.</li>
            </ul>
          </section>

          {/* Types of Electrical Drawings */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Types of Electrical Drawings
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Different types of electrical drawings serve specific purposes in communicating design intent:
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-3">Drawing Types and Applications</p>

                <p className="mb-2"><strong className="text-white">Layout drawings:</strong> Show physical positions of electrical equipment.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Positions of sockets, switches, luminaires, and distribution boards</li>
                  <li>Containment systems (trunking, conduit, cable tray routes)</li>
                  <li>Heights and spacing dimensions for accurate installation</li>
                  <li>Room references and equipment identification numbers</li>
                </ul>

                <p className="mb-2"><strong className="text-white">Circuit diagrams (schematic):</strong> Show electrical connections between components.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>How components are electrically connected in circuits</li>
                  <li>Protection devices and their relationships to loads</li>
                  <li>Control circuits and interlocking arrangements</li>
                  <li>System operation and electrical relationships</li>
                </ul>

                <p className="mb-2"><strong className="text-white">Wiring diagrams:</strong> Detail cable cores, terminals, and specific connections.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Individual cable cores and their connections</li>
                  <li>Terminal identification and numbering</li>
                  <li>Cable specifications and conductor identification</li>
                  <li>Detailed connection information for complex equipment</li>
                </ul>

                <p className="mb-2"><strong className="text-white">Block diagrams:</strong> Simplified system overview.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Overall system architecture and main components</li>
                  <li>Signal flow and system interfaces</li>
                  <li>Simplified representation without detailed connections</li>
                  <li>Useful for understanding system concepts and troubleshooting</li>
                </ul>

                <p className="text-sm text-white/60 mt-3">
                  <strong>Selection guide:</strong> Use layout drawings for installation, schematics for understanding circuits, wiring diagrams for connections
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="drawing-types-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Reading Symbols and Conventions */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Reading Symbols and Conventions
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Electrical symbols follow standardised conventions to ensure universal understanding:
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-3">Standard Symbols and Their Meanings</p>

                <p className="mb-2"><strong className="text-white">BS 7671 and BS EN standards:</strong> Provide consistent symbol definitions.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Circle with cross = ceiling light or luminaire</li>
                  <li>Double circle = socket outlet (power point)</li>
                  <li>"S" in a square = single-pole switch</li>
                  <li>Rectangle with diagonal lines = distribution board</li>
                </ul>

                <p className="mb-2"><strong className="text-white">Common electrical symbols:</strong> Essential symbols for everyday installation work.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Triangle = earth/ground connection point</li>
                  <li>Zigzag line = resistor or heating element</li>
                  <li>Parallel lines = capacitor</li>
                  <li>Coil symbol = inductor or transformer winding</li>
                </ul>

                <p className="mb-2"><strong className="text-white">Legend importance:</strong> Always check for site-specific variations.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Different designers may use slight symbol variations</li>
                  <li>Special equipment may require unique symbols</li>
                  <li>Legends explain any non-standard or modified symbols</li>
                  <li>Abbreviations and reference codes are defined in legends</li>
                </ul>

                <p className="text-sm text-white/60 mt-3">
                  <strong>Best practice:</strong> Always check the legend first - never assume symbol meanings
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="symbols-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Scales and Dimensions */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Scales and Dimensions
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Understanding scales and dimensions is crucial for accurate installation work:
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-3">Scale Interpretation and Application</p>

                <p className="mb-2"><strong className="text-white">Common drawing scales:</strong> Understanding scale ratios and their applications.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>1:50 - detailed room layouts and equipment positioning</li>
                  <li>1:100 - floor plans and general arrangements</li>
                  <li>1:200 - site plans and building overviews</li>
                  <li>1:1 - full size detail drawings and templates</li>
                </ul>

                <p className="mb-2"><strong className="text-white">Scale calculation:</strong> Converting drawing measurements to real dimensions.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>1:50 means 1 unit on drawing = 50 units in reality</li>
                  <li>20mm on 1:50 drawing = 20 × 50 = 1000mm (1m) on site</li>
                  <li>Use scale rulers for quick and accurate measurement</li>
                  <li>Always double-check critical dimensions using given measurements</li>
                </ul>

                <p className="mb-2"><strong className="text-white">Dimensional information:</strong> Precise measurements for accurate installation.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Heights above finished floor level (AFFL)</li>
                  <li>Spacing between outlets and equipment</li>
                  <li>Clearance dimensions for access and maintenance</li>
                  <li>Critical dimensions that override scaled measurements</li>
                </ul>

                <p className="text-sm text-white/60 mt-3">
                  <strong>Accuracy rule:</strong> Dimensions always take precedence over scaled measurements
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="scale-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Interpreting Circuit Information */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Interpreting Circuit Information
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Understanding how circuits are represented and organised in electrical drawings:
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-3">Circuit Organisation and Identification</p>

                <p className="mb-2"><strong className="text-white">Circuit grouping:</strong> How circuits are organised and distributed.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Circuits grouped by function (lighting, power, heating)</li>
                  <li>Distribution board schedules showing circuit allocation</li>
                  <li>Load calculations and diversity factors</li>
                  <li>Circuit protection and discrimination requirements</li>
                </ul>

                <p className="mb-2"><strong className="text-white">Cable and conductor identification:</strong> Understanding coding systems.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>L1, L2, L3 = line conductors (live phases)</li>
                  <li>N = neutral conductor</li>
                  <li>CPC = circuit protective conductor (earth/ground)</li>
                  <li>Cable references and specifications linked to schedules</li>
                </ul>

                <p className="mb-2"><strong className="text-white">Protective devices:</strong> Understanding protection schemes.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>MCBs (Miniature Circuit Breakers) for overcurrent protection</li>
                  <li>RCDs (Residual Current Devices) for additional protection</li>
                  <li>RCBOs combining overcurrent and residual current protection</li>
                  <li>Coordination and discrimination between protection devices</li>
                </ul>

                <p className="text-sm text-white/60 mt-3">
                  <strong>Key principle:</strong> Follow circuit references to link drawings with specifications and schedules
                </p>
              </div>
            </div>
          </section>

          <div className="border-t border-white/10 my-8" />

          {/* Applying Drawings on Site */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Applying Drawings on Site
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Practical application of drawing information during installation work:
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-cyan-500/50">
                <p className="font-medium text-white mb-3">Site Application and Verification</p>

                <p className="mb-2"><strong className="text-white">Integration with specifications:</strong> Using drawings and specs together.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Drawings show WHERE to install equipment and routes</li>
                  <li>Specifications define HOW to install and what materials to use</li>
                  <li>Cross-reference drawing notes with specification clauses</li>
                  <li>Both documents are essential for complete installation instructions</li>
                </ul>

                <p className="mb-2"><strong className="text-white">Site verification:</strong> Checking actual conditions against drawings.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Buildings may differ slightly from design drawings</li>
                  <li>Check for structural changes, new obstacles, or services</li>
                  <li>Verify room layouts and door/window positions</li>
                  <li>Confirm ceiling heights and floor levels match drawings</li>
                </ul>

                <p className="mb-2"><strong className="text-white">Conflict resolution:</strong> Managing discrepancies and unclear information.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Stop work if drawings are unclear or conflicts exist</li>
                  <li>Document issues with photographs and written descriptions</li>
                  <li>Seek clarification from supervisor or project manager</li>
                  <li>Obtain written confirmation before proceeding with changes</li>
                </ul>

                <p className="text-sm text-white/60 mt-3">
                  <strong>Safety note:</strong> Never assume - always verify site conditions match drawing information
                </p>
              </div>
            </div>
          </section>

          <div className="border-t border-white/10 my-8" />

          {/* Common Errors */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Common Errors When Reading Drawings
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Understanding and avoiding typical mistakes in drawing interpretation:
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-white mb-3">Avoiding Common Drawing Interpretation Errors</p>

                <p className="mb-2"><strong className="text-white">Scale and dimension errors:</strong> Measurement and positioning mistakes.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Misreading scale ratios leading to wrong positioning</li>
                  <li>Using scaled measurements instead of given dimensions</li>
                  <li>Accumulating tolerances causing alignment problems</li>
                  <li>Not accounting for actual wall thicknesses and structural elements</li>
                </ul>

                <p className="mb-2"><strong className="text-white">Symbol interpretation errors:</strong> Misunderstanding drawing symbols.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Ignoring the drawing legend and assuming standard symbols</li>
                  <li>Mixing up similar symbols (e.g., different switch types)</li>
                  <li>Not recognising modified or project-specific symbols</li>
                  <li>Misinterpreting line weights and drawing conventions</li>
                </ul>

                <p className="mb-2"><strong className="text-white">Information oversight:</strong> Missing important drawing details.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Ignoring notes, amendments, and revision information</li>
                  <li>Not checking all relevant drawing sheets</li>
                  <li>Missing reference numbers linking to schedules</li>
                  <li>Overlooking height information and section references</li>
                </ul>

                <p className="text-sm text-white/60 mt-3">
                  <strong>Prevention strategy:</strong> Systematic checking, careful verification, and clear communication prevent most errors
                </p>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-white/80">
                  <p className="font-medium text-white mb-2">School Refurbishment Symbol Mix-Up</p>
                  <p className="text-sm mb-3">
                    On a school refurbishment project, an apprentice was installing light switches throughout the building.
                    Without checking the drawing legend, they assumed all switch symbols were standard single-pole switches.
                  </p>
                  <p className="text-sm mb-3">
                    The drawings actually used different symbols for different switch types:
                  </p>
                  <ul className="text-sm list-disc ml-4 space-y-1 mb-3">
                    <li>Standard "S" symbol for single switches</li>
                    <li>"S2" symbol for two-way switches at corridor ends</li>
                    <li>"SI" symbol for intermediate switches in long corridors</li>
                    <li>"SD" symbol for dimmer switches in classrooms</li>
                  </ul>
                  <p className="text-sm mb-3">
                    The apprentice installed single switches throughout, including locations that required two-way and intermediate switching.
                    When the lighting was tested, multiple corridors had lights that could only be controlled from one end, creating safety issues for evacuation routes.
                  </p>
                  <p className="text-sm mb-3">
                    The consequences included:
                  </p>
                  <ul className="text-sm list-disc ml-4 space-y-1 mb-3">
                    <li>Rewiring 15 switch positions with correct switching arrangements</li>
                    <li>Additional materials costing £800</li>
                    <li>2 days delay to the project completion</li>
                    <li>Failed Building Control inspection due to inadequate emergency lighting control</li>
                  </ul>
                  <p className="text-sm font-medium text-white">
                    <strong>Lesson learned:</strong> Always check the legend first - never assume symbol meanings, even for apparently "standard" symbols.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-4 text-left min-h-[48px] touch-manipulation active:bg-white/5"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-medium text-white pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-white/60 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-white/70 text-sm border-t border-white/10 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Pocket Guide
            </h2>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Always read</strong> the title block (project name, date, scale).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Check</strong> the legend for symbols and abbreviations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Identify</strong> the type of drawing (layout, schematic, wiring).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Cross-check</strong> against specifications and site conditions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Use drawings</strong> as a live reference — not just at the start of the job.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Recap
            </h2>
            <div className="text-white/80 space-y-4">
              <p>In this subsection, you learned:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The different types of electrical drawings and their specific purposes.</li>
                <li>How to read symbols, scales, and legends correctly.</li>
                <li>How to interpret circuits and containment layouts accurately.</li>
                <li>Common errors in drawing interpretation and how to avoid them.</li>
                <li>The importance of checking drawings against actual site conditions.</li>
              </ul>
              <p className="mt-4 font-medium text-elec-yellow">
                Accurate drawing interpretation ensures safe, compliant, and efficient installations whilst preventing costly errors and rework.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <div className="mb-10">
            <Quiz
              title="Test Your Knowledge: Reading Electrical Drawings"
              questions={quizQuestions}
            />
          </div>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-3">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section1_2;
