import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Electrical Drawings - HNC Module 4 Section 6.2";
const DESCRIPTION = "Master electrical drawing types for building services: single-line diagrams, schematic diagrams, layout drawings, CAD standards and BS EN 61082 compliance.";

const quickCheckQuestions = [
  {
    id: "single-line-purpose",
    question: "What is the primary purpose of a single-line diagram?",
    options: ["Show exact cable routes", "Represent the power distribution hierarchy", "Detail individual circuit wiring", "Show equipment dimensions"],
    correctIndex: 1,
    explanation: "Single-line diagrams represent the power distribution hierarchy from intake to final circuits, showing the relationship between distribution boards, protective devices and loads."
  },
  {
    id: "schematic-use",
    question: "When would you use a schematic diagram rather than a layout drawing?",
    options: ["To show equipment locations", "To explain control logic and circuit operation", "To calculate cable lengths", "To coordinate with architects"],
    correctIndex: 1,
    explanation: "Schematic diagrams explain how circuits work and the logical connections between components, particularly useful for control systems, rather than physical locations."
  },
  {
    id: "bs-en-61082",
    question: "What does BS EN 61082 cover?",
    options: ["Cable sizing calculations", "Preparation of documents in electrotechnology", "Earthing requirements", "Emergency lighting design"],
    correctIndex: 1,
    explanation: "BS EN 61082 covers the preparation of documents used in electrotechnology, including drawing standards, symbols, and documentation practices."
  },
  {
    id: "cad-layers",
    question: "Why is layer management important in CAD electrical drawings?",
    options: ["It makes drawings look better", "It organises information for coordination and output control", "It is only required for BIM projects", "It reduces file size"],
    correctIndex: 1,
    explanation: "Layer management organises different types of information (circuits, equipment, annotations) allowing selective display, coordination with other disciplines, and controlled output."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What information is typically shown on a single-line diagram?",
    options: [
      "Physical cable routes and containment",
      "Protective device ratings, cable sizes and distribution hierarchy",
      "Individual socket outlet locations",
      "Luminaire mounting heights"
    ],
    correctAnswer: 1,
    explanation: "Single-line diagrams show the electrical distribution hierarchy including protective devices, cable sizes, and the relationship between main switchboard, distribution boards and final circuits."
  },
  {
    id: 2,
    question: "Which standard governs graphical symbols for electrical diagrams?",
    options: ["BS 7671", "BS EN 60617", "BS 5266", "BS EN 12464"],
    correctAnswer: 1,
    explanation: "BS EN 60617 (IEC 60617) provides graphical symbols for use in electrical diagrams, ensuring consistent representation across the industry."
  },
  {
    id: 3,
    question: "What is the purpose of a layout drawing?",
    options: [
      "Show circuit theory",
      "Show the physical location of equipment on floor plans",
      "Calculate fault currents",
      "Define specification clauses"
    ],
    correctAnswer: 1,
    explanation: "Layout drawings show the physical location of electrical equipment (socket outlets, luminaires, distribution boards) on floor plans, coordinated with architectural backgrounds."
  },
  {
    id: 4,
    question: "What scale is typically used for electrical layout drawings?",
    options: ["1:10", "1:50 or 1:100", "1:500", "1:1"],
    correctAnswer: 1,
    explanation: "Electrical layout drawings typically use 1:50 or 1:100 scale, matching architectural plans for coordination. Larger scales (1:20, 1:10) may be used for plant rooms."
  },
  {
    id: 5,
    question: "What does a wiring diagram show that a schematic does not?",
    options: [
      "Circuit logic",
      "Terminal numbers and actual wire connections",
      "Equipment ratings",
      "Design philosophy"
    ],
    correctAnswer: 1,
    explanation: "Wiring diagrams show actual connections including terminal numbers and wire identification, providing the detail needed for installation and maintenance."
  },
  {
    id: 6,
    question: "Which CAD layer naming convention is commonly used in UK construction?",
    options: [
      "Random abbreviations",
      "BS 1192 / AEC (UK) layer naming",
      "American AIA standards",
      "Manufacturer-specific names"
    ],
    correctAnswer: 1,
    explanation: "BS 1192 and AEC (UK) guidelines provide standardised layer naming conventions ensuring consistency and enabling coordination across disciplines."
  },
  {
    id: 7,
    question: "What is the purpose of the drawing title block?",
    options: [
      "Decorative purposes only",
      "Provide project, drawing identification, revision and approval information",
      "Show the company logo",
      "List material quantities"
    ],
    correctAnswer: 1,
    explanation: "The title block provides essential drawing information including project details, drawing number, revision status, scale, date, and approval signatures."
  },
  {
    id: 8,
    question: "How should revisions be managed on electrical drawings?",
    options: [
      "Delete old information completely",
      "Use revision clouds, updated revision table, and maintain drawing history",
      "Issue new drawing numbers each time",
      "Only update the date"
    ],
    correctAnswer: 1,
    explanation: "Revisions should be clearly marked with clouds, logged in a revision table with descriptions, and previous versions archived for audit trail."
  },
  {
    id: 9,
    question: "What is a reflected ceiling plan (RCP)?",
    options: [
      "A plan showing floor details",
      "A plan showing ceiling-mounted items as if looking up",
      "A 3D model view",
      "A section through the ceiling"
    ],
    correctAnswer: 1,
    explanation: "A reflected ceiling plan shows ceiling-mounted items (luminaires, detectors) as if looking up at a mirror on the floor, maintaining correct orientation relative to floor plans."
  },
  {
    id: 10,
    question: "Why should electrical drawings reference the specification?",
    options: [
      "It is a legal requirement",
      "To link graphical information to quality and performance requirements",
      "To reduce the number of drawings",
      "To eliminate the need for schedules"
    ],
    correctAnswer: 1,
    explanation: "Cross-referencing ensures users understand that drawings show 'what and where', while specifications define 'how and to what standard', working together as a complete package."
  }
];

const faqs = [
  {
    question: "What software is commonly used for electrical drawings?",
    answer: "AutoCAD and Revit are the most common platforms in UK building services. AutoCAD is used for traditional 2D drawings, while Revit enables BIM with intelligent 3D models. Other packages include MicroStation and various electrical-specific tools like Amtech or Trimble."
  },
  {
    question: "How do electrical drawings coordinate with other disciplines?",
    answer: "Coordination occurs through shared architectural backgrounds, overlay comparisons, and in BIM projects through federated models. Regular coordination meetings review clashes and resolve conflicts. Layer management and drawing references ensure changes are tracked across disciplines."
  },
  {
    question: "What is the difference between 'for construction' and 'as-built' drawings?",
    answer: "For construction drawings show the design intent before installation. As-built (or record) drawings are updated during and after construction to show what was actually installed, including any variations. As-built drawings are essential for O&M manuals and future maintenance."
  },
  {
    question: "Should cable routes be shown on layout drawings?",
    answer: "It depends on project requirements. Some designers show indicative routes, others leave routing to the contractor. If routes are critical (avoiding certain areas, specific containment requirements), they should be shown. Complex routes may need separate containment drawings."
  },
  {
    question: "How detailed should control schematics be?",
    answer: "Control schematics should show all components, their interconnections, terminal references, and sufficient detail for commissioning and fault-finding. They should include interlocks with other systems, status indication, and interface points with BMS or fire systems."
  }
];

const HNCModule4Section6_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.6.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electrical Drawings
          </h1>
          <p className="text-white/80">
            Understanding drawing types, standards and CAD practices for building services documentation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Single-line:</strong> Power distribution hierarchy</li>
              <li className="pl-1"><strong>Schematic:</strong> Circuit logic and control</li>
              <li className="pl-1"><strong>Layout:</strong> Equipment locations on plans</li>
              <li className="pl-1"><strong>Standard:</strong> BS EN 61082 for documentation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Coordination:</strong> Work with architectural backgrounds</li>
              <li className="pl-1"><strong>Scales:</strong> Typically 1:50 or 1:100</li>
              <li className="pl-1"><strong>Symbols:</strong> BS EN 60617 graphical symbols</li>
              <li className="pl-1"><strong>CAD:</strong> BS 1192 layer standards</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify different types of electrical drawings and their purposes",
              "Apply BS EN 61082 and BS EN 60617 standards",
              "Create single-line diagrams showing distribution hierarchy",
              "Develop layout drawings coordinated with architecture",
              "Apply CAD standards and layer management",
              "Manage drawing revisions and coordination"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Single-Line Diagrams */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Single-Line Diagrams
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Single-line diagrams (also called one-line diagrams) represent the electrical distribution
              system using simplified notation. Each line represents a circuit regardless of the
              actual number of conductors, showing the hierarchy from supply intake to final circuits.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Information shown on single-line diagrams:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Supply characteristics (voltage, phases, fault level)</li>
                <li className="pl-1">Main switchgear and distribution board references</li>
                <li className="pl-1">Protective device types and ratings (MCB, MCCB, RCD)</li>
                <li className="pl-1">Cable sizes, types and lengths</li>
                <li className="pl-1">Metering and monitoring points</li>
                <li className="pl-1">Essential/standby power arrangements</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Single-Line Diagram Structure</p>
              <div className="bg-white/5 p-4 rounded text-sm font-mono">
                <p className="text-white mb-2">DNO Supply → Main Switchboard</p>
                <p className="text-white/70 ml-4">↓</p>
                <p className="text-white ml-4">Sub-distribution boards</p>
                <p className="text-white/70 ml-8">↓</p>
                <p className="text-white ml-8">Final distribution boards</p>
                <p className="text-white/70 ml-12">↓</p>
                <p className="text-white ml-12">Final circuits (lighting, power, etc.)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Notation on Single-Line</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example Notation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Incomer</td>
                      <td className="border border-white/10 px-3 py-2">800A MCCB</td>
                      <td className="border border-white/10 px-3 py-2">800 Amp moulded case circuit breaker</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable</td>
                      <td className="border border-white/10 px-3 py-2">4c 95mm² XLPE/SWA</td>
                      <td className="border border-white/10 px-3 py-2">4-core 95mm² XLPE insulated, steel wire armoured</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Outgoing way</td>
                      <td className="border border-white/10 px-3 py-2">32A Type B MCB</td>
                      <td className="border border-white/10 px-3 py-2">32 Amp Type B miniature circuit breaker</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCD</td>
                      <td className="border border-white/10 px-3 py-2">100A 30mA RCCB</td>
                      <td className="border border-white/10 px-3 py-2">100A residual current device, 30mA sensitivity</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Single-line diagrams are essential for understanding system architecture and for fault calculations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Schematic Diagrams */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Schematic and Wiring Diagrams
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Schematic diagrams show how circuits function logically, while wiring diagrams show
              the actual connections for installation. Both are essential for control systems,
              motor circuits and complex installations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Schematic Diagram Features</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Shows circuit logic and operation</li>
                  <li className="pl-1">Uses standard symbols (BS EN 60617)</li>
                  <li className="pl-1">Components arranged for clarity</li>
                  <li className="pl-1">Includes interlocks and controls</li>
                  <li className="pl-1">Essential for commissioning</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wiring Diagram Features</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Shows actual wire connections</li>
                  <li className="pl-1">Includes terminal references</li>
                  <li className="pl-1">Wire numbering and colours</li>
                  <li className="pl-1">Cable gland positions</li>
                  <li className="pl-1">Essential for installation</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Schematic Shows</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Wiring Shows</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor starter</td>
                      <td className="border border-white/10 px-3 py-2">Control logic, interlocks</td>
                      <td className="border border-white/10 px-3 py-2">Terminal connections</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting control</td>
                      <td className="border border-white/10 px-3 py-2">Switching arrangement</td>
                      <td className="border border-white/10 px-3 py-2">Switch wiring detail</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire alarm interface</td>
                      <td className="border border-white/10 px-3 py-2">Cause and effect logic</td>
                      <td className="border border-white/10 px-3 py-2">Interface connections</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS interface</td>
                      <td className="border border-white/10 px-3 py-2">Monitoring/control points</td>
                      <td className="border border-white/10 px-3 py-2">I/O module wiring</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Cross-reference schematic and wiring diagrams with unique component tags.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Layout Drawings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Layout Drawings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Layout drawings show the physical location of electrical equipment on floor plans.
              They are produced on architectural backgrounds and coordinated with other building
              services and structural elements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of layout drawings:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lighting layouts:</strong> Luminaire positions, switching zones, emergency lighting</li>
                <li className="pl-1"><strong>Power layouts:</strong> Socket outlets, FCUs, isolators, equipment connections</li>
                <li className="pl-1"><strong>Containment layouts:</strong> Cable tray, trunking, conduit routes</li>
                <li className="pl-1"><strong>Reflected ceiling plans:</strong> Ceiling-mounted equipment</li>
                <li className="pl-1"><strong>Plant room layouts:</strong> Detailed equipment positioning</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Layout Drawing Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Scale</td>
                      <td className="border border-white/10 px-3 py-2">1:50 general, 1:20 or 1:10 plant rooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Background</td>
                      <td className="border border-white/10 px-3 py-2">Current architectural xref</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Equipment</td>
                      <td className="border border-white/10 px-3 py-2">Standard symbols with tags</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dimensions</td>
                      <td className="border border-white/10 px-3 py-2">From gridlines or walls as appropriate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Annotations</td>
                      <td className="border border-white/10 px-3 py-2">Equipment types, circuit references</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Considerations</p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li>Check luminaire positions against ceiling grid and services</li>
                <li>Verify socket heights against furniture layouts</li>
                <li>Coordinate containment routes with structural openings</li>
                <li>Avoid clashes with HVAC, sprinklers and other services</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical:</strong> Always use the latest architectural background and coordinate changes promptly.
            </p>
          </div>
        </section>

        {/* Section 4: CAD Standards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            CAD Standards and BS EN 61082
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Consistent CAD standards ensure drawings are clear, coordinated and professionally
              presented. BS EN 61082 provides the overarching standard for electrotechnical
              documentation, complemented by UK-specific CAD conventions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS EN 61082 Key Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Document identification and structure</li>
                <li className="pl-1">Reference designation systems (BS EN 81346)</li>
                <li className="pl-1">Graphical symbols (BS EN 60617)</li>
                <li className="pl-1">Signal and connection presentation</li>
                <li className="pl-1">Documentation classification</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CAD Layer Naming (BS 1192 / AEC UK)</p>
              <div className="bg-white/5 p-4 rounded text-sm font-mono">
                <p className="text-white mb-2">Example: A-E-Lighting-M-Layout</p>
                <ul className="text-white/70 space-y-1 ml-4">
                  <li>A = Discipline (Architecture)</li>
                  <li>E = Sub-discipline (Electrical)</li>
                  <li>Lighting = Element</li>
                  <li>M = Model/Drawing type</li>
                  <li>Layout = Presentation</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Line Types</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Continuous - Equipment, containment</li>
                  <li className="pl-1">Dashed - Hidden items</li>
                  <li className="pl-1">Centre line - Centre lines, symmetry</li>
                  <li className="pl-1">Phantom - Future work, options</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Text Standards</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Title: 5mm (1:50), 3.5mm (1:100)</li>
                  <li className="pl-1">Body: 2.5mm (1:50), 2mm (1:100)</li>
                  <li className="pl-1">Sans serif font (Arial, Simplex)</li>
                  <li className="pl-1">Consistent capitalisation</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Drawing Title Block Information</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Project name and number</li>
                <li className="pl-1">Drawing title and number</li>
                <li className="pl-1">Scale and paper size</li>
                <li className="pl-1">Revision status and history</li>
                <li className="pl-1">Drawn/checked/approved signatures and dates</li>
                <li className="pl-1">Status (preliminary, for construction, as-built)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Quality control:</strong> All drawings should be checked against CAD standards before issue.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Drawing Set Organisation</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Use logical drawing numbering (E-001, E-002...)</li>
                <li className="pl-1">Group by type: Schematic, Layout, Details</li>
                <li className="pl-1">Include drawing register and index</li>
                <li className="pl-1">Maintain consistent title block across set</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Revision Management</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Use revision clouds to highlight changes</li>
                <li className="pl-1">Update revision table with description</li>
                <li className="pl-1">Issue superseded drawings are archived</li>
                <li className="pl-1">Track revisions in document control system</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Outdated backgrounds</strong> - Using old architectural xrefs</li>
                <li className="pl-1"><strong>Missing cross-references</strong> - Not linking between drawings</li>
                <li className="pl-1"><strong>Inconsistent symbols</strong> - Using non-standard notation</li>
                <li className="pl-1"><strong>Poor layer discipline</strong> - Mixing information on layers</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Drawing Types</p>
                <ul className="space-y-0.5">
                  <li>Single-line - Distribution hierarchy</li>
                  <li>Schematic - Circuit logic</li>
                  <li>Wiring - Actual connections</li>
                  <li>Layout - Equipment locations</li>
                  <li>RCP - Ceiling-mounted items</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BS EN 61082 - Documentation</li>
                  <li>BS EN 60617 - Symbols</li>
                  <li>BS EN 81346 - Designations</li>
                  <li>BS 1192 - CAD/BIM conventions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section6-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section6-3">
              Next: Schedules and Data Sheets
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section6_2;
