import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Electrical Symbols and Conventions - MOET Module 2 Section 1.5";
const DESCRIPTION = "Comprehensive guide to BS EN 60617 electrical symbols, circuit diagram conventions, schematic vs wiring diagrams, single-line notation, IEC vs ANSI symbols, terminal identification and reading manufacturer drawings for maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "symbol-standard",
    question: "Which international standard defines the graphical symbols used in electrical circuit diagrams?",
    options: [
      "BS 7671:2018",
      "BS EN 60617",
      "BS EN 61439",
      "BS EN 61008"
    ],
    correctIndex: 1,
    explanation: "BS EN 60617 (identical to IEC 60617) is the international standard for graphical symbols used in electrotechnical documentation. It defines symbols for components, connections, and devices used in circuit diagrams, schematic diagrams, and wiring diagrams. BS 7671 references these symbols but does not define them."
  },
  {
    id: "diagram-type",
    question: "What is the main difference between a schematic diagram and a wiring diagram?",
    options: [
      "A schematic uses symbols and a wiring diagram uses photographs",
      "A schematic shows the logical function of a circuit; a wiring diagram shows the physical connections and routing",
      "A schematic is for AC circuits and a wiring diagram is for DC circuits",
      "There is no difference — they are different names for the same thing"
    ],
    correctIndex: 1,
    explanation: "A schematic (circuit) diagram shows the logical function of a circuit using standardised symbols — it shows what the circuit does, not where the components physically are. A wiring diagram shows the physical connections, terminal numbers, cable routes, and how to actually wire the circuit. Both are essential for different stages of maintenance work."
  },
  {
    id: "single-line",
    question: "In a single-line (one-line) diagram, what does a single line typically represent?",
    options: [
      "Only the live conductor",
      "Only the neutral conductor",
      "All conductors of a circuit (live, neutral, and earth)",
      "The protective conductor only"
    ],
    correctIndex: 2,
    explanation: "In a single-line (one-line) diagram, a single line represents all the conductors of a circuit — including live, neutral, and earth (and all three phases in a three-phase system). This simplification allows complex distribution systems to be shown clearly on a single drawing. Hash marks or numbers on the line indicate the number of individual conductors."
  },
  {
    id: "terminal-id",
    question: "According to IEC 60445, which letter identifies the protective earth terminal on electrical equipment?",
    options: [
      "N",
      "L",
      "PE",
      "E"
    ],
    correctIndex: 2,
    explanation: "IEC 60445 designates the protective earth terminal as PE (Protective Earth). The neutral terminal is designated N, and line (live) terminals are designated L1, L2, L3 (or L for single-phase). While the letter 'E' is commonly used colloquially and on older equipment, PE is the correct current designation per IEC standards."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The BS EN 60617 symbol for a normally open (NO) contact is:",
    options: [
      "Two parallel lines with a diagonal line connecting them",
      "Two parallel lines with a gap (the moving contact shown open)",
      "A circle with a cross inside",
      "A rectangle with the letter 'K' inside"
    ],
    correctAnswer: 1,
    explanation: "A normally open contact is shown as two parallel lines (the fixed contacts) with a gap between them, indicating that the contact is open (not conducting) in its normal, de-energised state. When the coil or operating mechanism is energised, the contact closes. A normally closed contact shows the same symbol with a diagonal bridge connecting the two lines (indicating it conducts when de-energised)."
  },
  {
    id: 2,
    question: "On a circuit diagram, the symbol for a fuse is:",
    options: [
      "A circle with a sine wave inside",
      "A rectangle with a line through the centre",
      "A zigzag line",
      "Two semicircles back to back"
    ],
    correctAnswer: 1,
    explanation: "The BS EN 60617 symbol for a fuse is a rectangle (representing the fuse body) with a straight line through the centre (representing the fuse element). Some older drawings may use an 'S' shape inside the rectangle. The zigzag line represents a resistor, the circle with a sine wave represents an AC source, and two semicircles represent a thermal overload."
  },
  {
    id: 3,
    question: "An MCB (miniature circuit breaker) symbol differs from a simple switch symbol by the addition of:",
    options: [
      "A circle around the switch symbol",
      "A small rectangle (thermal element) and/or arc (magnetic element) at the contact",
      "The letters 'MCB' next to the symbol",
      "A dashed line from the switch to earth"
    ],
    correctAnswer: 1,
    explanation: "The MCB symbol is based on the basic switch symbol but with additional elements showing the tripping mechanisms: a small rectangle for the thermal (overload) trip element and/or a small arc or semicircle for the magnetic (short-circuit) trip element. This distinguishes it from a simple isolator or switch which has no automatic tripping capability."
  },
  {
    id: 4,
    question: "On a single-line diagram, a transformer is typically represented by:",
    options: [
      "Two coils side by side (or two circles with parallel lines between them)",
      "A rectangle with 'TX' inside",
      "A triangle with a circle inside",
      "Two parallel wavy lines"
    ],
    correctAnswer: 0,
    explanation: "The standard transformer symbol consists of two coils (represented by series of arcs or loops) placed side by side, representing the primary and secondary windings. Parallel lines between them represent the core. Different variations show whether the core is laminated (solid lines) or air-cored (no lines). On single-line diagrams, a simplified version with two circles may be used."
  },
  {
    id: 5,
    question: "The IEC symbol for an RCD (residual current device) includes:",
    options: [
      "A simple switch symbol with no additions",
      "A switch symbol with a test button and current-sensing element (toroid)",
      "A fuse symbol with the letters 'RCD'",
      "A circle with a lightning bolt inside"
    ],
    correctAnswer: 1,
    explanation: "The RCD symbol shows a switching mechanism (like a circuit breaker) with the addition of a current-sensing element (represented as a toroid or rectangular block through which the conductors pass) and a test button. This distinguishes it from a plain MCB or isolator and shows the residual current detection function."
  },
  {
    id: 6,
    question: "In electrical drawings, a dashed line typically represents:",
    options: [
      "A live conductor",
      "A neutral conductor",
      "A mechanical connection, future work, or a component boundary",
      "An earth conductor"
    ],
    correctAnswer: 2,
    explanation: "Dashed lines have several uses in electrical drawings: they can represent mechanical linkages (such as the shaft connecting multiple switch poles), boundaries of enclosures or panels, or future or proposed work. They are not used for active conductors. Earth conductors are typically shown as a solid line with the earth symbol at each end, or as a green/yellow coloured line on coloured drawings."
  },
  {
    id: 7,
    question: "Terminal marking L1, L2, L3 on a three-phase motor indicates:",
    options: [
      "Three different lamp connections",
      "Three line (phase) supply connections",
      "Three neutral connections",
      "Three earth connections"
    ],
    correctAnswer: 1,
    explanation: "L1, L2, L3 designate the three line (phase) supply connections per IEC 60445. On a motor, these are the terminals where the three-phase supply is connected. The old UK convention used R (red), Y (yellow), B (blue), which is now replaced by L1 (brown), L2 (black), L3 (grey) for conductor colours per BS 7671 Amendment 2."
  },
  {
    id: 8,
    question: "A motor symbol on a circuit diagram is typically shown as:",
    options: [
      "A rectangle with 'M' inside",
      "A circle with 'M' inside",
      "A triangle with 'M' inside",
      "A square with a lightning bolt inside"
    ],
    correctAnswer: 1,
    explanation: "The standard IEC symbol for a motor is a circle with the letter 'M' inside. Additional notation may indicate the motor type: 3~ for three-phase, 1~ for single-phase, or specific letters for DC motors. A generator uses the same circle symbol but with the letter 'G' inside."
  },
  {
    id: 9,
    question: "On a control circuit diagram, a relay coil is shown as:",
    options: [
      "A circle with 'K' inside",
      "A rectangle (or circle) with a diagonal line",
      "A rectangle representing the coil, labelled with the relay designation",
      "Two parallel lines"
    ],
    correctAnswer: 2,
    explanation: "A relay coil is shown as a rectangle (or sometimes a circle) representing the electromagnetic coil, labelled with the relay designation (e.g., K1, KA1, KM1). The contacts of the same relay are drawn separately in the circuit where they are used, with the same designation label to show the relationship. KM typically denotes a contactor (motor), KA an auxiliary relay, and KT a timer relay."
  },
  {
    id: 10,
    question: "What does the abbreviation 'NC' mean when applied to a relay contact?",
    options: [
      "Not Connected",
      "Normally Closed (contact is closed when the relay is de-energised)",
      "New Circuit",
      "Neutral Connection"
    ],
    correctAnswer: 1,
    explanation: "NC stands for Normally Closed — the contact is in the closed (conducting) position when the relay coil is de-energised. When the relay energises, the NC contact opens. The complementary term is NO (Normally Open) — the contact is open when de-energised and closes when the relay energises. The 'normal' state refers to the de-energised condition of the operating mechanism."
  },
  {
    id: 11,
    question: "IEC terminal designation for a motor star-delta starter typically includes:",
    options: [
      "Terminals marked 1-6 only",
      "Terminals U1, V1, W1 (start of windings) and U2, V2, W2 (end of windings)",
      "Terminals marked A, B, C and X, Y, Z",
      "Terminals marked R, S, T and U, V, W"
    ],
    correctAnswer: 1,
    explanation: "IEC 60034-8 designates motor winding terminals as U1, V1, W1 for the start of each phase winding and U2, V2, W2 for the end of each winding. This notation replaced the older system (U, V, W and X, Y, Z). For star connection, U2, V2, W2 are linked together. For delta connection, U1-W2, V1-U2, W1-V2 are linked. Understanding this is essential for reconnecting motors during maintenance."
  },
  {
    id: 12,
    question: "When reading a manufacturer's control panel drawing, 'cross-referencing' means:",
    options: [
      "Checking the drawing against the parts list",
      "Tracing a relay coil to its associated contacts by matching designation numbers shown on the drawing",
      "Comparing the drawing with a different manufacturer's diagram",
      "Verifying the drawing date against the installation date"
    ],
    correctAnswer: 1,
    explanation: "Cross-referencing on control panel drawings allows you to trace the relationship between a relay coil and all its associated contacts, which may appear on different pages or sections of the drawing. The relay designation (e.g., K1) appears at both the coil and its contacts. Many drawings include a contact cross-reference table showing the page/line number where each contact is used. This is essential for fault-finding in complex control circuits."
  }
];

const faqs = [
  {
    question: "What is the difference between IEC symbols and ANSI symbols?",
    answer: "IEC (International Electrotechnical Commission) symbols are used in the UK, Europe, and most of the world, standardised under IEC 60617. ANSI (American National Standards Institute) symbols are used primarily in North America and follow IEEE standards. The main differences are in the representation of logic gates, some relay symbols, and certain component symbols. As a UK maintenance technician, you will primarily use IEC symbols, but you may encounter ANSI symbols on American-manufactured equipment or when reading US technical documentation."
  },
  {
    question: "How do I identify the type of circuit breaker from its symbol on a drawing?",
    answer: "The base symbol is a switch contact. An MCB adds a thermal element (small rectangle) for overload protection and/or a magnetic element (arc or dot) for short-circuit protection. An MCCB uses the same additions but is typically drawn larger or labelled differently. An RCD adds a current-sensing toroid symbol. An RCBO combines the MCB and RCD symbols. An isolator (disconnector) uses a plain switch symbol with no automatic tripping elements, as it has no fault protection capability."
  },
  {
    question: "Why do control circuit diagrams show relay contacts separately from their coils?",
    answer: "In control circuits, a single relay may have its coil in one part of the circuit and its contacts distributed across multiple other circuits. Drawing the coil and contacts together would require complicated long-distance connections across the drawing. By drawing them separately (linked by the same designation code, e.g., K1), the circuit logic becomes much clearer. This is called 'detached representation' and is standard practice in control panel drawings per IEC 61082."
  },
  {
    question: "What do the numbers on relay contact terminals mean?",
    answer: "IEC 60947-5-1 defines contact terminal numbering: the first digit identifies the contact number (1, 2, 3...) and the second digit identifies the function. For NO contacts: terminals end in 3 and 4 (e.g., 13-14, 23-24). For NC contacts: terminals end in 1 and 2 (e.g., 11-12, 21-22). For changeover contacts: terminals end in 1, 2, and 4 (e.g., 11-12-14). The coil terminals are typically A1 and A2. Understanding this system allows you to identify contact types quickly on site."
  },
  {
    question: "How should I store and manage technical drawings for maintenance purposes?",
    answer: "Technical drawings should be kept up to date and readily accessible. Best practice includes: maintain a master set of 'as-built' drawings that reflect the actual installation (not just the original design); mark up any modifications in red and update the master drawings; store electronic copies securely with version control; keep a set of current drawings at or near the equipment for quick reference during fault-finding; and include drawing numbers and revision dates in maintenance records. Out-of-date drawings are worse than no drawings — they can lead to working on the wrong circuit."
  }
];

const MOETModule2Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 2.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electrical Symbols and Conventions
          </h1>
          <p className="text-white/80">
            Reading and interpreting circuit diagrams, symbols and technical drawings for maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Standard:</strong> BS EN 60617 (IEC 60617) defines graphical symbols</li>
              <li className="pl-1"><strong>Diagram types:</strong> Schematic (logical), wiring (physical), single-line (overview)</li>
              <li className="pl-1"><strong>Components:</strong> Standardised symbols for all common components</li>
              <li className="pl-1"><strong>Terminals:</strong> IEC 60445 — L1/L2/L3, N, PE designations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fault-finding:</strong> Read schematics to trace circuit logic</li>
              <li className="pl-1"><strong>Wiring:</strong> Follow wiring diagrams for physical connections</li>
              <li className="pl-1"><strong>Relay cross-ref:</strong> Trace coils to contacts by designation codes</li>
              <li className="pl-1"><strong>ST1426:</strong> Technical drawing interpretation KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify common electrical symbols per BS EN 60617 for circuit components",
              "Distinguish between schematic diagrams, wiring diagrams and single-line diagrams",
              "Read single-line distribution diagrams for commercial and industrial installations",
              "Interpret relay and contactor cross-referencing in control circuit drawings",
              "Apply IEC terminal identification conventions (L, N, PE, U1-W2)",
              "Navigate manufacturer technical drawings for fault-finding and maintenance"
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

        {/* Section 01: BS EN 60617 Symbol Standard */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BS EN 60617 — The Symbol Standard
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS EN 60617 (identical to IEC 60617) is the international standard for graphical symbols
              used in diagrams for electrotechnical documentation. It provides a comprehensive library
              of standardised symbols that enable electrical engineers, designers, and maintenance
              technicians across the world to read and understand each other's drawings without ambiguity.
            </p>

            <p>
              The standard is organised into parts covering different categories of components and devices.
              As a maintenance technician, you need to be familiar with the symbols you will encounter
              most frequently — passive components, switches, protective devices, motors, transformers,
              and control devices.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Passive Component Symbols</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Maintenance Relevance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Resistor (fixed)</td>
                      <td className="border border-white/10 px-3 py-2">Rectangle (IEC) or zigzag line (older/US)</td>
                      <td className="border border-white/10 px-3 py-2">Heating elements, current limiting, voltage dividers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Variable resistor</td>
                      <td className="border border-white/10 px-3 py-2">Rectangle with diagonal arrow through it</td>
                      <td className="border border-white/10 px-3 py-2">Speed controls, dimmer circuits, calibration pots</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Capacitor (fixed)</td>
                      <td className="border border-white/10 px-3 py-2">Two parallel lines (one straight, one curved for polarised)</td>
                      <td className="border border-white/10 px-3 py-2">PFC capacitors, motor start/run, filtering</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Inductor/coil</td>
                      <td className="border border-white/10 px-3 py-2">Series of loops or arcs</td>
                      <td className="border border-white/10 px-3 py-2">Relay coils, chokes, transformer windings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformer</td>
                      <td className="border border-white/10 px-3 py-2">Two coils with parallel lines (core) between</td>
                      <td className="border border-white/10 px-3 py-2">Power transformers, control transformers, CTs, VTs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Switching and Protection Device Symbols</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Device</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Feature</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Isolator (disconnector)</td>
                      <td className="border border-white/10 px-3 py-2">Simple switch contact (open position shown)</td>
                      <td className="border border-white/10 px-3 py-2">No tripping capability — manual operation only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fuse</td>
                      <td className="border border-white/10 px-3 py-2">Rectangle with line through centre</td>
                      <td className="border border-white/10 px-3 py-2">Single-shot protection — must be replaced</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCB</td>
                      <td className="border border-white/10 px-3 py-2">Switch with thermal (rectangle) and/or magnetic (arc) trip</td>
                      <td className="border border-white/10 px-3 py-2">Overload and short-circuit protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCCB</td>
                      <td className="border border-white/10 px-3 py-2">Similar to MCB, often with adjustable trip shown</td>
                      <td className="border border-white/10 px-3 py-2">Higher breaking capacity, adjustable settings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCD</td>
                      <td className="border border-white/10 px-3 py-2">Switch with current-sensing toroid and test button</td>
                      <td className="border border-white/10 px-3 py-2">Earth fault protection — detects residual current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCBO</td>
                      <td className="border border-white/10 px-3 py-2">Combined MCB and RCD symbols</td>
                      <td className="border border-white/10 px-3 py-2">Overcurrent + earth fault protection combined</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Contactor</td>
                      <td className="border border-white/10 px-3 py-2">Switch symbol with coil designation</td>
                      <td className="border border-white/10 px-3 py-2">Electromagnetically operated — remote switching</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor and Generator Symbols</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Motor:</strong> Circle with 'M' inside. Additions: 3~ (three-phase AC), 1~ (single-phase AC), = (DC)</li>
                <li className="pl-1"><strong>Generator:</strong> Circle with 'G' inside. Same phase/type additions as motors</li>
                <li className="pl-1"><strong>Transformer:</strong> Two coils with core lines. Variations for auto, current (CT), and voltage (VT) transformers</li>
                <li className="pl-1"><strong>Battery:</strong> Long and short parallel lines alternating (long = positive, short = negative)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> While you do not need to memorise every symbol in BS EN 60617,
              you must be able to recognise the common symbols listed above. Most drawings include a
              symbol legend or key — always check this first when reading an unfamiliar drawing, as some
              manufacturers use slight variations or additional notation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Types of Electrical Diagrams */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Types of Electrical Diagrams
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different types of electrical diagrams serve different purposes. As a maintenance technician,
              you will use several types depending on whether you are understanding the system overview,
              tracing a circuit fault, or making a physical wiring connection. Knowing which diagram to
              use for which task is a key skill.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Schematic (Circuit) Diagram</h3>
                <p className="text-sm text-white mb-2">
                  Shows the <strong>logical function</strong> of a circuit using standardised symbols.
                  Components are arranged for clarity of understanding, not according to their physical
                  position. This is the most useful diagram for understanding how a circuit works and
                  for systematic fault-finding.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Shows the electrical connections between components</li>
                  <li className="pl-1">Components arranged for logical clarity, not physical layout</li>
                  <li className="pl-1">Best for understanding circuit operation and fault-finding</li>
                  <li className="pl-1">Used for control circuits, power circuits, and electronic circuits</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Wiring Diagram (Connection Diagram)</h3>
                <p className="text-sm text-white mb-2">
                  Shows the <strong>physical connections</strong> and wiring between components. Components
                  are shown in approximately their physical positions, and terminal numbers, cable
                  identifications, and routing information are included.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Shows terminal numbers and cable identifications</li>
                  <li className="pl-1">Components shown in approximate physical positions</li>
                  <li className="pl-1">Best for making or checking physical connections</li>
                  <li className="pl-1">Essential for wiring control panels and distribution boards</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Single-Line (One-Line) Diagram</h3>
                <p className="text-sm text-white mb-2">
                  Shows the <strong>overall arrangement</strong> of an electrical distribution system in
                  simplified form. A single line represents all conductors of a circuit (live, neutral,
                  earth, and all phases).
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Simplifies complex distribution systems to a readable overview</li>
                  <li className="pl-1">Shows the hierarchy: incoming supply, transformers, switchboards, distribution boards</li>
                  <li className="pl-1">Includes protective device ratings, cable sizes, and circuit designations</li>
                  <li className="pl-1">Best for understanding the overall system and planning maintenance work</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Block Diagram</h3>
                <p className="text-sm text-white mb-2">
                  Shows the major functional blocks of a system and the relationships between them,
                  without detailed circuit information. Useful for understanding the overall system
                  architecture before diving into detailed drawings.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Shows major system components as labelled blocks</li>
                  <li className="pl-1">Arrows show signal or power flow direction</li>
                  <li className="pl-1">Best for initial system understanding and overview</li>
                  <li className="pl-1">Often used in manufacturer technical manuals as an introduction</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Choosing the Right Diagram</p>
              <p className="text-sm text-white">
                For fault-finding a control circuit, start with the schematic diagram to understand the
                circuit logic, then use the wiring diagram to locate the physical connections you need
                to test. For planning isolation before maintenance, use the single-line diagram to
                identify the distribution hierarchy and the protective devices you need to lock off.
                Using the wrong diagram for the task wastes time and increases the risk of error.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance application:</strong> Always verify that the drawings you are using
              are current and reflect the actual installation. Modifications made since the original
              installation may not be shown on older drawings. If you discover discrepancies between
              the drawing and the actual installation, record them and request that the drawings are
              updated. Working from inaccurate drawings is a significant safety risk.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Single-Line Diagrams */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Reading Single-Line Distribution Diagrams
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Single-line diagrams are the most common type of drawing you will encounter for power
              distribution systems. They provide a clear overview of how the electrical supply is
              distributed throughout a building or site, from the incoming supply through to the
              final circuits. Learning to read these diagrams fluently is essential for maintenance
              planning, isolation, and fault investigation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Elements on Single-Line Diagrams</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Incoming supply:</strong> Shown at the top or left, with details of supply type, voltage, number of phases, and earthing arrangement (TN-S, TN-C-S, TT)</li>
                <li className="pl-1"><strong>Main switchboard (MSB):</strong> Central distribution point with main switch/MCCB, bus-section switches, and outgoing ways</li>
                <li className="pl-1"><strong>Sub-distribution boards:</strong> Fed from the MSB, each with its own incoming isolator and outgoing circuits</li>
                <li className="pl-1"><strong>Protective devices:</strong> MCBs, MCCBs, fuses, RCDs — shown with their ratings (e.g., 32A Type B MCB)</li>
                <li className="pl-1"><strong>Cable details:</strong> Size, type, and number of cores (e.g., 4c 25mm² XLPE/SWA)</li>
                <li className="pl-1"><strong>Circuit designations:</strong> Unique reference numbers for each circuit</li>
                <li className="pl-1"><strong>Metering:</strong> kWh meters, CT metering, maximum demand indicators</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Notation Conventions on Single-Line Diagrams</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Hash marks:</strong> Short diagonal lines across a conductor indicate the number of individual conductors (e.g., three hash marks = three-phase, three conductors)</li>
                <li className="pl-1"><strong>Dot notation:</strong> A dot at a junction indicates an electrical connection; crossing lines without a dot are not connected</li>
                <li className="pl-1"><strong>Bus bars:</strong> Shown as thick horizontal or vertical lines representing the distribution busbars</li>
                <li className="pl-1"><strong>Earth symbol:</strong> Three horizontal lines of decreasing length, or a single line to a ground symbol</li>
                <li className="pl-1"><strong>Numbering:</strong> Circuits are numbered sequentially from the supply end</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Earthing System Designations on Diagrams</h3>
              <p className="text-sm text-white mb-2">
                Single-line diagrams show the earthing arrangement using standard BS 7671 designations:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>TN-S:</strong> Separate neutral and earth conductors from the supply transformer — the earth is via the cable sheath</li>
                <li className="pl-1"><strong>TN-C-S (PME):</strong> Combined neutral-earth in the supply cable, separated at the consumer's installation — protective multiple earthing</li>
                <li className="pl-1"><strong>TT:</strong> No earth from the supply — the installation relies on its own earth electrode</li>
                <li className="pl-1"><strong>IT:</strong> Isolated or impedance-earthed supply — used in specialist applications</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When planning maintenance work, always start with the single-line
              diagram to understand the supply hierarchy. Identify which protective device you need to
              isolate, trace the circuit back to the supply, and check for alternative feeds (such as
              standby generators or bus-section switches) that could re-energise the circuit from an
              unexpected source.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Control Circuit Conventions and Cross-Referencing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Control Circuit Conventions and Cross-Referencing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Control circuit drawings are more detailed than single-line diagrams and require
              specific conventions to manage the complexity of multi-page drawings with numerous
              relay coils, contacts, timers, and interlocks. Understanding these conventions is
              essential for fault-finding in motor control centres, automated systems, and BMS panels.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Device Designation Codes (IEC 61346 / EN 81346)</p>
              <p className="text-sm text-white mb-3">
                Control devices are identified by letter codes that indicate their function:
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Code</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Device Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">KM</td>
                      <td className="border border-white/10 px-3 py-2">Contactor (motor)</td>
                      <td className="border border-white/10 px-3 py-2">KM1 — main motor contactor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">KA</td>
                      <td className="border border-white/10 px-3 py-2">Auxiliary relay</td>
                      <td className="border border-white/10 px-3 py-2">KA3 — interlock relay</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">KT</td>
                      <td className="border border-white/10 px-3 py-2">Timer relay</td>
                      <td className="border border-white/10 px-3 py-2">KT1 — star-delta timer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">SB</td>
                      <td className="border border-white/10 px-3 py-2">Push button</td>
                      <td className="border border-white/10 px-3 py-2">SB1 — start button, SB0 — stop button</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">SA</td>
                      <td className="border border-white/10 px-3 py-2">Selector switch</td>
                      <td className="border border-white/10 px-3 py-2">SA1 — auto/manual selector</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">QF</td>
                      <td className="border border-white/10 px-3 py-2">Circuit breaker</td>
                      <td className="border border-white/10 px-3 py-2">QF1 — motor circuit breaker</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">FR</td>
                      <td className="border border-white/10 px-3 py-2">Thermal overload relay</td>
                      <td className="border border-white/10 px-3 py-2">FR1 — motor overload</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">HL</td>
                      <td className="border border-white/10 px-3 py-2">Indicator lamp</td>
                      <td className="border border-white/10 px-3 py-2">HL1 — run lamp (green), HL2 — trip lamp (red)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contact Cross-Referencing</p>
              <p className="text-sm text-white mb-3">
                In complex control drawings, a relay coil and its contacts appear in different places
                on the drawing. Cross-referencing links them together:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">The relay coil (e.g., KM1) is drawn in the control circuit where it is energised</li>
                <li className="pl-1">Each contact of KM1 is drawn in the circuit where it performs its function, labelled 'KM1'</li>
                <li className="pl-1">Adjacent to the coil, a cross-reference table lists the page/line numbers where each contact is drawn</li>
                <li className="pl-1">Contacts are shown in their de-energised (normal) state — NO contacts open, NC contacts closed</li>
                <li className="pl-1">When tracing a fault, identify the coil, check it is energised, then trace each contact to verify it has changed state</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contact Terminal Numbering (IEC 60947-5-1)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Coil terminals:</strong> A1 (positive) and A2 (negative/common)</li>
                <li className="pl-1"><strong>NO contacts:</strong> Terminals ending in 3-4 (e.g., 13-14, 23-24, 33-34)</li>
                <li className="pl-1"><strong>NC contacts:</strong> Terminals ending in 1-2 (e.g., 11-12, 21-22, 31-32)</li>
                <li className="pl-1"><strong>Changeover contacts:</strong> Terminals ending in 1-2-4 (e.g., 11-12-14)</li>
                <li className="pl-1"><strong>Main contacts (contactors):</strong> 1-2, 3-4, 5-6 for three-phase power contacts</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance application:</strong> When fault-finding a control circuit, use the
              cross-reference system systematically. Start at the output (what is not working — e.g., motor
              not running). Trace back to the contactor coil — is it energised? If not, trace back through
              the control circuit, checking each contact, button, and interlock along the way. The
              designation codes tell you exactly which device to check and the terminal numbers tell you
              exactly where to put your test probes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: Terminal Identification and Labelling */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Terminal Identification and Labelling Conventions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct terminal identification is a fundamental safety requirement. Connecting to the
              wrong terminal can cause equipment damage, protection failure, or danger to persons.
              IEC 60445 and BS 7671 define standard conventions for identifying terminals on electrical
              equipment and in installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Terminal Designations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Terminal</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Designation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Conductor Colour (BS 7671)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line (single-phase)</td>
                      <td className="border border-white/10 px-3 py-2">L</td>
                      <td className="border border-white/10 px-3 py-2">Brown</td>
                      <td className="border border-white/10 px-3 py-2">Previously 'phase' or 'live' (red)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line 1 (three-phase)</td>
                      <td className="border border-white/10 px-3 py-2">L1</td>
                      <td className="border border-white/10 px-3 py-2">Brown</td>
                      <td className="border border-white/10 px-3 py-2">Previously R (red)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line 2 (three-phase)</td>
                      <td className="border border-white/10 px-3 py-2">L2</td>
                      <td className="border border-white/10 px-3 py-2">Black</td>
                      <td className="border border-white/10 px-3 py-2">Previously Y (yellow)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line 3 (three-phase)</td>
                      <td className="border border-white/10 px-3 py-2">L3</td>
                      <td className="border border-white/10 px-3 py-2">Grey</td>
                      <td className="border border-white/10 px-3 py-2">Previously B (blue)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Neutral</td>
                      <td className="border border-white/10 px-3 py-2">N</td>
                      <td className="border border-white/10 px-3 py-2">Blue</td>
                      <td className="border border-white/10 px-3 py-2">Previously black</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Protective earth</td>
                      <td className="border border-white/10 px-3 py-2">PE</td>
                      <td className="border border-white/10 px-3 py-2">Green-and-yellow</td>
                      <td className="border border-white/10 px-3 py-2">Never used for any other purpose</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Winding Terminal Designations (IEC 60034-8)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Phase U winding:</strong> U1 (start) and U2 (end)</li>
                <li className="pl-1"><strong>Phase V winding:</strong> V1 (start) and V2 (end)</li>
                <li className="pl-1"><strong>Phase W winding:</strong> W1 (start) and W2 (end)</li>
                <li className="pl-1"><strong>Star connection:</strong> Link U2-V2-W2 together. Supply to U1, V1, W1</li>
                <li className="pl-1"><strong>Delta connection:</strong> Link U1-W2, V1-U2, W1-V2. Supply to U1, V1, W1</li>
                <li className="pl-1"><strong>Star-delta starting:</strong> All six terminals must be accessible for the starter to reconfigure the connections during starting</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Old vs New Colour Codes</p>
              <p className="text-sm text-white">
                During maintenance, you will encounter both the old and new conductor colour codes.
                The change was introduced in BS 7671:2008 (17th Edition). Old installations use:
                Red (L1), Yellow (L2), Blue (L3), Black (N). New installations use: Brown (L1),
                Black (L2), Grey (L3), Blue (N). Particular care is needed where old and new systems
                meet — blue was previously L3 but is now N, and black was previously N but is now L2.
                Always verify by testing, never assume based on colour alone. Conversion labels per
                BS 7671 Appendix 7 should be applied at interface points.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Labelling Best Practice for Maintenance</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">All circuits must be clearly labelled at the distribution board with a durable circuit chart per BS 7671 Reg 514.9</li>
                <li className="pl-1">Cables should be labelled at both ends with the circuit designation</li>
                <li className="pl-1">Terminal blocks in control panels should be numbered sequentially and match the wiring diagram</li>
                <li className="pl-1">Warning and caution labels must be provided where multiple supplies feed equipment</li>
                <li className="pl-1">Labels must be durable, legible, and fixed securely — handwritten temporary labels should be replaced with permanent labels during maintenance</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The ability to read and interpret technical drawings, identify
              electrical symbols, and follow wiring conventions is a core competence for the maintenance
              technician standard. You will be expected to demonstrate these skills during the end-point
              assessment and in everyday maintenance practice. Maintaining accurate, up-to-date drawings
              and labelling is also part of good maintenance practice, contributing to the safety of
              everyone who works on the installation in the future.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
                <p className="font-medium text-white mb-1">Diagram Types</p>
                <ul className="space-y-0.5">
                  <li>Schematic — logical function (fault-finding)</li>
                  <li>Wiring — physical connections (installation)</li>
                  <li>Single-line — system overview (planning)</li>
                  <li>Block — functional overview (orientation)</li>
                </ul>
                <p className="font-medium text-white mb-1 mt-2">Contact Terminals</p>
                <ul className="space-y-0.5">
                  <li>NO contacts: x3-x4 (13-14, 23-24)</li>
                  <li>NC contacts: x1-x2 (11-12, 21-22)</li>
                  <li>Coil: A1, A2</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BS EN 60617 — Graphical symbols</li>
                  <li>IEC 60445 — Terminal marking</li>
                  <li>IEC 60034-8 — Motor terminal designations</li>
                  <li>IEC 60947-5-1 — Contact terminal numbering</li>
                  <li>IEC 61082 — Documentation conventions</li>
                  <li>BS 7671 Reg 514.9 — Circuit labelling</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Units and Measurement
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section1">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule2Section1_5;
