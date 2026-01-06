import { ArrowLeft, ArrowRight, Lightbulb, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

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
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 5.1.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Reading Basic Electrical Installation Drawings
          </h1>
          <p className="text-white">
            Master the interpretation of electrical drawings - essential technical documents that guide safe and accurate installation work.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Electrical drawings show locations, circuits, and routing of electrical installations.</li>
                <li>They use standardised symbols following BS 7671 and BS EN conventions.</li>
                <li>Drawings are technical documents with legal and contractual significance.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Symbols, scales, legends, dimensions, circuit references, notes.</li>
                <li><strong>Use:</strong> Layout drawings for positioning, schematics for connections, legends for symbols.</li>
                <li><strong>Check:</strong> Scale, dimensions, site conditions, conflicts with specs.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Identify different types of electrical installation drawings and their purposes.</li>
            <li>Recognise symbols, scales, and conventions used in electrical drawings.</li>
            <li>Accurately interpret electrical layouts, circuits, and containment systems.</li>
            <li>Apply drawings to set out installation work correctly on site.</li>
            <li>Understand the link between drawings, specifications, and site conditions.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* Types of Electrical Drawings */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Types of Electrical Drawings</h3>
            <p className="text-base text-white mb-4">
              Different types of electrical drawings serve specific purposes in communicating design intent:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Drawing Types and Applications</p>
                    <p className="text-base text-white mb-2"><strong>Layout drawings:</strong> Show physical positions of electrical equipment.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Positions of sockets, switches, luminaires, and distribution boards</li>
                      <li>Containment systems (trunking, conduit, cable tray routes)</li>
                      <li>Heights and spacing dimensions for accurate installation</li>
                      <li>Room references and equipment identification numbers</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Circuit diagrams (schematic):</strong> Show electrical connections between components.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>How components are electrically connected in circuits</li>
                      <li>Protection devices and their relationships to loads</li>
                      <li>Control circuits and interlocking arrangements</li>
                      <li>System operation and electrical relationships</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Wiring diagrams:</strong> Detail cable cores, terminals, and specific connections.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Individual cable cores and their connections</li>
                      <li>Terminal identification and numbering</li>
                      <li>Cable specifications and conductor identification</li>
                      <li>Detailed connection information for complex equipment</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Block diagrams:</strong> Simplified system overview.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Overall system architecture and main components</li>
                      <li>Signal flow and system interfaces</li>
                      <li>Simplified representation without detailed connections</li>
                      <li>Useful for understanding system concepts and troubleshooting</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Selection guide:</strong> Use layout drawings for installation, schematics for understanding circuits, wiring diagrams for connections
                    </div>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* Reading Symbols and Conventions */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Reading Symbols and Conventions</h3>
            <p className="text-base text-white mb-4">
              Electrical symbols follow standardised conventions to ensure universal understanding:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Standard Symbols and Their Meanings</p>
                    <p className="text-base text-white mb-2"><strong>BS 7671 and BS EN standards:</strong> Provide consistent symbol definitions.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Circle with cross = ceiling light or luminaire</li>
                      <li>Double circle = socket outlet (power point)</li>
                      <li>"S" in a square = single-pole switch</li>
                      <li>Rectangle with diagonal lines = distribution board</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Common electrical symbols:</strong> Essential symbols for everyday installation work.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Triangle = earth/ground connection point</li>
                      <li>Zigzag line = resistor or heating element</li>
                      <li>Parallel lines = capacitor</li>
                      <li>Coil symbol = inductor or transformer winding</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Legend importance:</strong> Always check for site-specific variations.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Different designers may use slight symbol variations</li>
                      <li>Special equipment may require unique symbols</li>
                      <li>Legends explain any non-standard or modified symbols</li>
                      <li>Abbreviations and reference codes are defined in legends</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Drawing conventions:</strong> Standard practices for clear communication.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Line weights indicate hierarchy (thick for mains, thin for controls)</li>
                      <li>Dashed lines show hidden or future installations</li>
                      <li>Text annotations provide additional information</li>
                      <li>Reference numbers link to schedules and specifications</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Best practice:</strong> Always check the legend first - never assume symbol meanings
                    </div>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* Scales and Dimensions */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Scales and Dimensions</h3>
            <p className="text-base text-white mb-4">
              Understanding scales and dimensions is crucial for accurate installation work:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Scale Interpretation and Application</p>
                    <p className="text-base text-white mb-2"><strong>Common drawing scales:</strong> Understanding scale ratios and their applications.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>1:50 - detailed room layouts and equipment positioning</li>
                      <li>1:100 - floor plans and general arrangements</li>
                      <li>1:200 - site plans and building overviews</li>
                      <li>1:1 - full size detail drawings and templates</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Scale calculation:</strong> Converting drawing measurements to real dimensions.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>1:50 means 1 unit on drawing = 50 units in reality</li>
                      <li>20mm on 1:50 drawing = 20 × 50 = 1000mm (1m) on site</li>
                      <li>Use scale rulers for quick and accurate measurement</li>
                      <li>Always double-check critical dimensions using given measurements</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Dimensional information:</strong> Precise measurements for accurate installation.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Heights above finished floor level (AFFL)</li>
                      <li>Spacing between outlets and equipment</li>
                      <li>Clearance dimensions for access and maintenance</li>
                      <li>Critical dimensions that override scaled measurements</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Setting out accuracy:</strong> Ensuring precise positioning on site.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Use given dimensions in preference to scaled measurements</li>
                      <li>Mark out positions before cutting or drilling</li>
                      <li>Check running dimensions and accumulating tolerances</li>
                      <li>Verify positions with other trades and services</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Accuracy rule:</strong> Dimensions always take precedence over scaled measurements
                    </div>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* Interpreting Circuit Information */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Interpreting Circuit Information</h3>
            <p className="text-base text-white mb-4">
              Understanding how circuits are represented and organised in electrical drawings:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Circuit Organisation and Identification</p>
                    <p className="text-base text-white mb-2"><strong>Circuit grouping:</strong> How circuits are organised and distributed.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Circuits grouped by function (lighting, power, heating)</li>
                      <li>Distribution board schedules showing circuit allocation</li>
                      <li>Load calculations and diversity factors</li>
                      <li>Circuit protection and discrimination requirements</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Cable and conductor identification:</strong> Understanding coding systems.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>L1, L2, L3 = line conductors (live phases)</li>
                      <li>N = neutral conductor</li>
                      <li>CPC = circuit protective conductor (earth/ground)</li>
                      <li>Cable references and specifications linked to schedules</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Protective devices:</strong> Understanding protection schemes.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>MCBs (Miniature Circuit Breakers) for overcurrent protection</li>
                      <li>RCDs (Residual Current Devices) for additional protection</li>
                      <li>RCBOs combining overcurrent and residual current protection</li>
                      <li>Coordination and discrimination between protection devices</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Circuit routing:</strong> Understanding cable paths and installation methods.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Containment systems and cable routing paths</li>
                      <li>Segregation requirements for different services</li>
                      <li>Access points and joint locations</li>
                      <li>Installation method references and constraints</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Key principle:</strong> Follow circuit references to link drawings with specifications and schedules
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Applying Drawings on Site */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Applying Drawings on Site</h3>
            <p className="text-base text-white mb-4">
              Practical application of drawing information during installation work:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-cyan-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-cyan-600 dark:text-cyan-400 mb-1">Site Application and Verification</p>
                    <p className="text-base text-white mb-2"><strong>Integration with specifications:</strong> Using drawings and specs together.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Drawings show WHERE to install equipment and routes</li>
                      <li>Specifications define HOW to install and what materials to use</li>
                      <li>Cross-reference drawing notes with specification clauses</li>
                      <li>Both documents are essential for complete installation instructions</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Site verification:</strong> Checking actual conditions against drawings.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Buildings may differ slightly from design drawings</li>
                      <li>Check for structural changes, new obstacles, or services</li>
                      <li>Verify room layouts and door/window positions</li>
                      <li>Confirm ceiling heights and floor levels match drawings</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Conflict resolution:</strong> Managing discrepancies and unclear information.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Stop work if drawings are unclear or conflicts exist</li>
                      <li>Document issues with photographs and written descriptions</li>
                      <li>Seek clarification from supervisor or project manager</li>
                      <li>Obtain written confirmation before proceeding with changes</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Quality control:</strong> Ensuring accuracy throughout installation.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Mark out positions before cutting or drilling</li>
                      <li>Use drawings as ongoing reference throughout work</li>
                      <li>Check installed work matches drawing requirements</li>
                      <li>Update drawings with any approved changes or variations</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Safety note:</strong> Never assume - always verify site conditions match drawing information
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Common Errors When Reading Drawings */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Common Errors When Reading Drawings</h3>
            <p className="text-base text-white mb-4">
              Understanding and avoiding typical mistakes in drawing interpretation:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-1">Avoiding Common Drawing Interpretation Errors</p>
                    <p className="text-base text-white mb-2"><strong>Scale and dimension errors:</strong> Measurement and positioning mistakes.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Misreading scale ratios leading to wrong positioning</li>
                      <li>Using scaled measurements instead of given dimensions</li>
                      <li>Accumulating tolerances causing alignment problems</li>
                      <li>Not accounting for actual wall thicknesses and structural elements</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Symbol interpretation errors:</strong> Misunderstanding drawing symbols.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Ignoring the drawing legend and assuming standard symbols</li>
                      <li>Mixing up similar symbols (e.g., different switch types)</li>
                      <li>Not recognising modified or project-specific symbols</li>
                      <li>Misinterpreting line weights and drawing conventions</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Information oversight:</strong> Missing important drawing details.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Ignoring notes, amendments, and revision information</li>
                      <li>Not checking all relevant drawing sheets</li>
                      <li>Missing reference numbers linking to schedules</li>
                      <li>Overlooking height information and section references</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Site assumption errors:</strong> Not verifying actual conditions.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Assuming site conditions exactly match drawings</li>
                      <li>Not checking for other services and structural constraints</li>
                      <li>Ignoring changes made by other trades during construction</li>
                      <li>Not verifying room layouts and architectural features</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Prevention strategy:</strong> Systematic checking, careful verification, and clear communication prevent most errors
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example</h2>
          <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white mb-2">School Refurbishment Symbol Mix-Up</p>
                <p className="text-xs sm:text-sm text-white mb-3">
                  On a school refurbishment project, an apprentice was installing light switches throughout the building. 
                  Without checking the drawing legend, they assumed all switch symbols were standard single-pole switches.
                </p>
                <p className="text-xs sm:text-sm text-white mb-3">
                  The drawings actually used different symbols for different switch types:
                </p>
                <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1 mb-3">
                  <li>Standard "S" symbol for single switches</li>
                  <li>"S2" symbol for two-way switches at corridor ends</li>
                  <li>"SI" symbol for intermediate switches in long corridors</li>
                  <li>"SD" symbol for dimmer switches in classrooms</li>
                </ul>
                <p className="text-xs sm:text-sm text-white mb-3">
                  The apprentice installed single switches throughout, including locations that required two-way and intermediate switching. 
                  When the lighting was tested, multiple corridors had lights that could only be controlled from one end, creating safety issues for evacuation routes.
                </p>
                <p className="text-xs sm:text-sm text-white mb-3">
                  The consequences included:
                </p>
                <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1 mb-3">
                  <li>Rewiring 15 switch positions with correct switching arrangements</li>
                  <li>Additional materials costing £800</li>
                  <li>2 days delay to the project completion</li>
                  <li>Failed Building Control inspection due to inadequate emergency lighting control</li>
                </ul>
                <p className="text-xs sm:text-sm text-white font-medium">
                  <strong>Lesson learned:</strong> Always check the legend first - never assume symbol meanings, even for apparently "standard" symbols.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-2 border-l-blue-200 pl-4">
                <p className="font-medium text-white mb-2">Q: {faq.question}</p>
                <p className="text-sm text-white">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Guide: Reading Electrical Drawings</h2>
          <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
            <ul className="space-y-2 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Always read</strong> the title block (project name, date, scale).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Check</strong> the legend for symbols and abbreviations.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Identify</strong> the type of drawing (layout, schematic, wiring).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Cross-check</strong> against specifications and site conditions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Use drawings</strong> as a live reference — not just at the start of the job.</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-base text-white mb-4">In this subsection, you learned:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>The different types of electrical drawings and their specific purposes.</li>
            <li>How to read symbols, scales, and legends correctly.</li>
            <li>How to interpret circuits and containment layouts accurately.</li>
            <li>Common errors in drawing interpretation and how to avoid them.</li>
            <li>The importance of checking drawings against actual site conditions.</li>
          </ul>
          <p className="text-base text-white mt-4">
            Accurate drawing interpretation ensures safe, compliant, and efficient installations whilst preventing costly errors and rework.
          </p>
        </Card>

        {/* Quiz */}
        <div className="mb-8">
          <Quiz 
            title="Test Your Knowledge: Reading Electrical Drawings"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../1-3">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section1_2;