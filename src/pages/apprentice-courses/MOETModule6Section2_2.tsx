import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Wiring Diagrams - MOET Module 6 Section 2.2";
const DESCRIPTION = "Interpreting wiring diagrams for electrical maintenance: single-line diagrams, power distribution schematics, switchgear representation, load schedules, network diagrams and cable interconnection drawings under BS EN 61082 and ST1426.";

const quickCheckQuestions = [
  {
    id: "sld-purpose-check",
    question: "What is the primary purpose of a single-line diagram (SLD)?",
    options: [
      "To show every individual wire in the installation",
      "To provide a simplified overview of the power distribution system, showing the main equipment and connections using single lines to represent three-phase circuits",
      "To show the physical layout of equipment in a building",
      "To list all the cable sizes used in the installation"
    ],
    correctIndex: 1,
    explanation: "A single-line diagram simplifies the representation of a power distribution system by using a single line to represent a three-phase (or multi-wire) circuit. This provides a clear overview of the entire distribution architecture — from the incoming supply through transformers, switchgear, and distribution boards to the final loads."
  },
  {
    id: "wiring-vs-circuit-check",
    question: "What is the key difference between a wiring diagram and a circuit (schematic) diagram?",
    options: [
      "They are exactly the same thing",
      "A wiring diagram shows physical connections with terminal numbers and wire references; a circuit diagram shows the logical function and operation of the circuit",
      "A wiring diagram only shows power circuits",
      "A circuit diagram shows cable colours, a wiring diagram does not"
    ],
    correctIndex: 1,
    explanation: "A circuit diagram shows how the circuit functions logically — the relationship between components in terms of operation. A wiring diagram shows how to physically build or maintain the circuit — which wire goes to which terminal, including terminal numbers, wire references, and often cable routes."
  },
  {
    id: "load-schedule-check",
    question: "What information does a load schedule provide alongside a single-line diagram?",
    options: [
      "Only the total cost of electricity",
      "A tabulated list of all connected loads showing their ratings, circuit references, cable sizes, and protective device details",
      "The physical weight of each item of equipment",
      "Only the voltage at each point"
    ],
    correctIndex: 1,
    explanation: "A load schedule is a companion document to the SLD that lists every connected load with details including: circuit reference, description, rated power, design current, cable type and size, protective device type and rating, and the distribution board it is connected to."
  },
  {
    id: "interconnection-drawing-check",
    question: "An interconnection wiring diagram is used to show:",
    options: [
      "The internal wiring within a single piece of equipment only",
      "The cable connections between separate items of equipment, showing terminal references at both ends",
      "The building floor plan only",
      "The manufacturer's assembly instructions"
    ],
    correctIndex: 1,
    explanation: "An interconnection (or inter-wiring) diagram shows the cabling between separate items of equipment — for example, between a motor control centre and a field motor, or between a control panel and its remote sensors. It identifies the cable type, core identification, and terminal references at both ends."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A single-line diagram uses one line to represent:",
    options: [
      "A single-phase circuit only",
      "All conductors of a circuit (including three-phase and neutral), simplifying the diagram",
      "The earth conductor only",
      "A communication cable"
    ],
    correctAnswer: 1,
    explanation: "The 'single line' represents all the conductors of a circuit — L1, L2, L3, and sometimes N and PE — as one line. Short diagonal strokes or numbers on the line may indicate the number of conductors. This simplification allows the entire distribution system to be shown on one or two sheets."
  },
  {
    id: 2,
    question: "On a single-line diagram, a transformer is typically shown as:",
    options: [
      "A rectangle with the letter T",
      "Two circles (or coils) with a core symbol between them, labelled with voltage ratio and rating",
      "A triangle",
      "A straight line with arrows"
    ],
    correctAnswer: 1,
    explanation: "Transformers on SLDs are shown using the standard symbol of two coils (primary and secondary) with a core. The voltage ratio (e.g., 11 kV/415 V), rated power (kVA or MVA), vector group, and impedance percentage are typically labelled."
  },
  {
    id: 3,
    question: "The hierarchy of a typical industrial power distribution system shown on an SLD is:",
    options: [
      "Loads first, then supply",
      "Incoming supply → main switchboard → sub-distribution boards → final circuits → loads",
      "All equipment shown at the same level",
      "Only the incoming supply is shown"
    ],
    correctAnswer: 1,
    explanation: "SLDs follow a hierarchical layout: the incoming supply (utility or generator) at the top, flowing down through the main switchboard, sub-distribution boards, and final circuits to individual loads. This hierarchy reflects the actual distribution architecture and protection coordination."
  },
  {
    id: 4,
    question: "Short diagonal strokes across a single line on an SLD indicate:",
    options: [
      "The line is broken",
      "The number of conductors in the circuit (e.g., three strokes for three-phase)",
      "The voltage level",
      "The cable is underground"
    ],
    correctAnswer: 1,
    explanation: "Short diagonal strokes (or a number) across the single line indicate the number of conductors. Three strokes indicate three conductors (three-phase without neutral); four strokes indicate three-phase plus neutral. This convention clarifies the circuit configuration at a glance."
  },
  {
    id: 5,
    question: "Wire numbering (ferrule marking) on control circuit wires serves to:",
    options: [
      "Make the wires easier to bend",
      "Uniquely identify every wire so it can be traced between its origin and destination terminals",
      "Indicate the wire colour",
      "Show the voltage rating of the wire"
    ],
    correctAnswer: 1,
    explanation: "Each wire in a control circuit is given a unique number (marked on ferrules at each end). This allows any wire to be traced from its origin terminal to its destination terminal, even in a complex cable loom with hundreds of wires. It is essential for fault-finding and reconnection after maintenance."
  },
  {
    id: 6,
    question: "A busbar on a single-line diagram is represented by:",
    options: [
      "A dashed line",
      "A thick horizontal line (or bar) from which multiple circuits are fed",
      "A circle",
      "An arrow pointing upwards"
    ],
    correctAnswer: 1,
    explanation: "Busbars are represented as thick horizontal lines (or bars) with the connected circuits branching off vertically. The busbar is labelled with its voltage, rating, and reference designation. Circuit breakers or fuse switches are shown at each connection point."
  },
  {
    id: 7,
    question: "BS EN 61082 provides standards for:",
    options: [
      "Fire alarm installation",
      "The preparation and presentation of documents used in electrotechnology, including wiring diagrams",
      "Concrete mix design",
      "Plumbing pipe sizing"
    ],
    correctAnswer: 1,
    explanation: "BS EN 61082 (Preparation of documents used in electrotechnology) provides the standard rules for preparing electrical documentation including single-line diagrams, circuit diagrams, wiring diagrams, and interconnection diagrams. Following this standard ensures consistency and readability."
  },
  {
    id: 8,
    question: "A standby generator shown on an SLD will typically include:",
    options: [
      "Only the generator symbol",
      "The generator symbol, automatic transfer switch (ATS), interlocking arrangements, and the circuits it supplies",
      "Just a note saying 'generator available'",
      "Only the fuel tank"
    ],
    correctAnswer: 1,
    explanation: "The generator arrangement on the SLD must show the generator with its rating, the automatic (or manual) transfer switch, mechanical and/or electrical interlocking to prevent parallel running with the mains (unless designed for it), and which circuits are designated as essential and supplied by the generator."
  },
  {
    id: 9,
    question: "What is the significance of fault levels shown on a single-line diagram?",
    options: [
      "They indicate the number of faults expected per year",
      "They indicate the maximum prospective fault current at key points, which determines the required breaking capacity of protective devices",
      "They show the quality of the installation",
      "They are purely theoretical with no practical application"
    ],
    correctAnswer: 1,
    explanation: "Fault levels (prospective short-circuit current in kA) shown at key points on the SLD determine the minimum breaking capacity required for circuit breakers and fuses at those points. If a protective device has insufficient breaking capacity for the available fault level, it cannot safely interrupt a fault — creating an explosion and fire risk."
  },
  {
    id: 10,
    question: "When reading a utility company's single-line diagram, the 'point of common coupling' (PCC) refers to:",
    options: [
      "Where two cables are joined together",
      "The electrical point where the utility supply connects to the customer's installation",
      "A type of cable connector",
      "The neutral-earth link"
    ],
    correctAnswer: 1,
    explanation: "The PCC is the point where the electricity utility's network meets the customer's installation. It defines the boundary of responsibility and is where supply characteristics (voltage, fault level, power quality) are specified."
  },
  {
    id: 11,
    question: "An interconnection diagram differs from an internal wiring diagram in that it shows:",
    options: [
      "Only the components inside one panel",
      "The cabling between separate items of equipment, with terminal references at each end",
      "Only the power supply wiring",
      "Nothing useful for maintenance"
    ],
    correctAnswer: 1,
    explanation: "An internal wiring diagram shows connections within a single panel or equipment item. An interconnection diagram shows the cabling between separate items — for example, a control panel and its field devices, or an MCC and remote motors. Both are needed for complete maintenance documentation."
  },
  {
    id: 12,
    question: "Why is a single-line diagram the first drawing a maintenance technician should consult when investigating a power supply problem?",
    options: [
      "Because it is the simplest drawing to read",
      "Because it provides the overall system architecture, showing the supply path from source to load, enabling the technician to identify which section of the distribution is affected",
      "Because it shows the cable colours",
      "Because it is always the first drawing in the O&M manual"
    ],
    correctAnswer: 1,
    explanation: "The SLD gives you the 'map' of the distribution system. When investigating a power loss, you can trace the supply path from the source to the affected load, identifying each switchgear point and protection device along the way. This allows you to systematically narrow down the fault location."
  }
];

const faqs = [
  {
    question: "What is the difference between a single-line diagram and a schematic diagram?",
    answer: "A single-line diagram shows the power distribution architecture using simplified single-line representation — it is concerned with the 'what is connected where' of the distribution system. A schematic (circuit) diagram shows the detailed connections of individual circuits, including every conductor, contact, and component. The SLD gives you the overview; the schematic gives you the detail for a specific circuit."
  },
  {
    question: "Do all installations have a single-line diagram?",
    answer: "All well-documented installations should have an SLD, but in practice, many older or smaller installations may not. If no SLD exists, a survey should be carried out to create one. For maintenance purposes, an SLD is invaluable — even a hand-drawn version provides essential information about the distribution hierarchy and protection coordination."
  },
  {
    question: "How do I read the protection coordination from a single-line diagram?",
    answer: "The SLD shows the hierarchy of protective devices from the incoming supply down to the final circuit. Protection coordination (discrimination) means that the device nearest the fault operates first, without tripping upstream devices. The SLD shows the device types and ratings at each level, allowing you to verify that discrimination is maintained — essential for limiting the extent of supply disruption during a fault."
  },
  {
    question: "What should I do if the SLD does not match what I find on site?",
    answer: "Report the discrepancy immediately. An inaccurate SLD is a safety risk — it may lead to incorrect assumptions about supply paths, fault levels, or protection arrangements. Create a red-line markup of the SLD showing the actual arrangement and submit it for formal revision. Do not continue maintenance based on an inaccurate SLD without first verifying the actual arrangement."
  },
  {
    question: "What are cable schedule drawings and when are they used?",
    answer: "Cable schedule drawings (or cable block diagrams) show the cable routes between equipment items, with cable references, types, sizes, and route information. They are commonly used on large industrial sites where cable routes are complex. The cable schedule links to both the SLD (which shows the circuit) and the interconnection diagram (which shows the terminal connections)."
  }
];

const MOETModule6Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.2
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
            <span>Module 6.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Wiring Diagrams
          </h1>
          <p className="text-white/80">
            Single-line diagrams, power distribution schematics, load schedules and interconnection drawings
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>SLD:</strong> Single line represents all conductors of a circuit</li>
              <li className="pl-1"><strong>Hierarchy:</strong> Supply → main switchboard → DBs → final circuits</li>
              <li className="pl-1"><strong>Switchgear:</strong> Standard symbols with ratings and designations</li>
              <li className="pl-1"><strong>Interconnection:</strong> Cable links between separate equipment items</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fault-finding:</strong> SLD is the first reference for supply problems</li>
              <li className="pl-1"><strong>Isolation planning:</strong> Identify all supply paths before isolating</li>
              <li className="pl-1"><strong>Protection:</strong> Understand discrimination hierarchy</li>
              <li className="pl-1"><strong>ST1426:</strong> Power distribution interpretation competence</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose and conventions of single-line diagrams for power distribution",
              "Interpret switchgear symbols and their ratings on SLDs to BS EN 60617",
              "Trace power flow from supply source through distribution to loads",
              "Read and use load schedules as companion documents to SLDs",
              "Interpret interconnection wiring diagrams for cable routes between equipment",
              "Use wiring diagrams for isolation planning and fault-finding"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Single-Line Diagrams — Purpose and Conventions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A single-line diagram (SLD), also known as a one-line diagram, is the most important drawing for
              understanding any electrical distribution system. It provides a simplified but comprehensive
              overview of the entire power distribution architecture — from the point of supply through every
              level of distribution down to the major loads.
            </p>
            <p>
              The key simplification is that a single line represents all conductors of a circuit. A
              three-phase, four-wire circuit (L1, L2, L3, N) is shown as one line rather than four. Short
              diagonal strokes across the line indicate the number of conductors. This allows the entire
              distribution system to be represented on one or two drawing sheets, providing a clear overview
              that would be impossible if every conductor were drawn individually.
            </p>
            <p>
              SLDs are prepared in accordance with BS EN 61082 (Preparation of documents used in
              electrotechnology) and use symbols from BS EN 60617. The layout follows the power flow hierarchy:
              incoming supply at the top, flowing downward through each level of distribution to the loads at
              the bottom.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What an SLD Shows</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Incoming supply:</strong> Utility connection, voltage, available fault level</li>
                <li className="pl-1"><strong>Transformers:</strong> Voltage ratio, rating (kVA/MVA), vector group, impedance</li>
                <li className="pl-1"><strong>Main switchgear:</strong> Type (ACB/MCCB), rating, breaking capacity</li>
                <li className="pl-1"><strong>Busbars:</strong> Voltage, rated current, section switches</li>
                <li className="pl-1"><strong>Distribution boards:</strong> Location, circuits fed, protection</li>
                <li className="pl-1"><strong>Standby generation:</strong> Generator, ATS, essential circuits</li>
                <li className="pl-1"><strong>Major loads:</strong> Motors, UPS systems, large fixed equipment</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Maintenance Priority</p>
              <p className="text-sm text-white">
                The SLD is the first drawing you should consult when investigating any power supply problem.
                It gives you the complete supply path from source to load, enabling systematic fault location.
                Always start with the SLD before moving to detailed circuit or wiring diagrams.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Switchgear Representation and Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every item of switchgear on the SLD is represented by its standard symbol (BS EN 60617) and
              annotated with key technical data. Understanding these annotations is essential for maintenance
              technicians, as they define the protection hierarchy and the capability of the distribution
              system. When replacing a protective device, the SLD tells you exactly what rating, type and
              breaking capacity is required.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Device</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Annotations</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Maintenance Relevance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ACB (Air Circuit Breaker)</td>
                      <td className="border border-white/10 px-3 py-2">In/Icu/Ics, trip settings</td>
                      <td className="border border-white/10 px-3 py-2">Main incomer protection; trip settings must match design</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCCB</td>
                      <td className="border border-white/10 px-3 py-2">Frame size, trip unit, breaking capacity</td>
                      <td className="border border-white/10 px-3 py-2">Sub-main protection; replacement must match ratings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCB</td>
                      <td className="border border-white/10 px-3 py-2">Type (B/C/D), rated current</td>
                      <td className="border border-white/10 px-3 py-2">Final circuit protection; type affects motor starting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fuse switch</td>
                      <td className="border border-white/10 px-3 py-2">Rated current, fuse type, breaking capacity</td>
                      <td className="border border-white/10 px-3 py-2">Fuse replacement must be like-for-like</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCD/RCBO</td>
                      <td className="border border-white/10 px-3 py-2">Rated current, sensitivity (mA), type</td>
                      <td className="border border-white/10 px-3 py-2">Regular testing and trip time verification required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              Reference designations on the SLD follow BS EN 81346, providing a unique identifier for every
              item of equipment. For example, a circuit breaker might be designated -Q1 (switching device),
              a transformer -T1, or a motor -M101. These designations link the SLD to all other documentation
              — wiring diagrams, maintenance records, and spare parts lists.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Load Schedules and Power Flow
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A load schedule is the companion document to the SLD. While the SLD shows the distribution
              architecture graphically, the load schedule provides the detailed numerical data for every circuit
              in the installation. Together, they provide a complete picture of the power distribution system.
              During fault-finding or circuit tracing, the load schedule tells you exactly what each circuit
              supplies, what cable is used, and what protection is installed.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Load Schedule Columns</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Circuit reference:</strong> DB designation and way number (e.g., DB-A/1)</li>
                <li className="pl-1"><strong>Load description:</strong> What the circuit supplies (e.g., "AHU-1 Supply Fan Motor")</li>
                <li className="pl-1"><strong>Rated power:</strong> Connected load in kW or VA</li>
                <li className="pl-1"><strong>Design current:</strong> Calculated design current in amps</li>
                <li className="pl-1"><strong>Protective device:</strong> Type and rating (e.g., "32 A Type C MCB")</li>
                <li className="pl-1"><strong>Cable:</strong> Type, size, and installation method (e.g., "4C 6 mm² SWA")</li>
                <li className="pl-1"><strong>Earth:</strong> CPC size</li>
              </ul>
            </div>

            <p>
              Power flow on the SLD is understood by reading from top to bottom. The total connected load
              at each distribution board can be cross-referenced with the load schedule to verify that
              protective devices and cables are correctly rated. During maintenance, if a protective device
              trips, the load schedule tells you which loads are affected and what to check.
            </p>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Cross-Reference Always</p>
              <p className="text-sm text-white">
                Always cross-reference the SLD with the load schedule for complete information. The SLD
                shows you where in the hierarchy a circuit sits; the load schedule gives you the specific
                technical data. Using one without the other can lead to incomplete understanding of the
                distribution system.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Interconnection and Cable Wiring Diagrams
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While SLDs show the distribution architecture, interconnection wiring diagrams show the physical
              cable connections between separate items of equipment. These are essential for maintenance tasks
              that involve tracing cables, reconnecting equipment after repair, or verifying that field wiring
              matches the design documentation.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Interconnection Diagrams Show</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Cable type, size and identification</li>
                  <li className="pl-1">Terminal references at each end</li>
                  <li className="pl-1">Core identification (colour or number)</li>
                  <li className="pl-1">Equipment at each end of the cable</li>
                  <li className="pl-1">Cable gland and entry details</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Schedule Content</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Unique cable reference number</li>
                  <li className="pl-1">From/to equipment references</li>
                  <li className="pl-1">Cable type and specification</li>
                  <li className="pl-1">Route description and length</li>
                  <li className="pl-1">Installation method (tray, trunking, buried)</li>
                </ul>
              </div>
            </div>

            <p>
              On large industrial sites, a separate cable schedule drawing provides a comprehensive list of
              all cables with their routes, types and termination points. This is invaluable for maintenance
              planning — when you need to isolate a cable for repair, the cable schedule tells you exactly
              where it runs and where both ends are terminated.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Network Diagrams and Utility Interfaces
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              On larger sites — industrial estates, hospital campuses, university sites — the power distribution
              extends beyond a single building. Network diagrams show the interconnections between substations,
              ring mains, radial feeders, and major supply points across the entire site. Understanding these
              diagrams is essential for maintenance technicians working on campus-wide or industrial
              distribution systems.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Network Diagram Features</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ring main:</strong> Closed loop feeding multiple substations — resilient supply</li>
                <li className="pl-1"><strong>Radial feeder:</strong> Single feed from one point — simpler but less resilient</li>
                <li className="pl-1"><strong>Bus-section switch:</strong> Allows splitting or joining busbars for maintenance</li>
                <li className="pl-1"><strong>Normally open points:</strong> Points where the ring is broken for operational purposes</li>
                <li className="pl-1"><strong>Alternative feeds:</strong> Backup supply paths available if the primary fails</li>
                <li className="pl-1"><strong>PCC (Point of Common Coupling):</strong> Boundary between utility and customer</li>
              </ul>
            </div>

            <p>
              When working on interconnected systems, the network diagram is essential for planning safe
              isolation. A maintenance technician must be able to identify all possible supply paths to
              equipment before beginning work. Without understanding the network topology, there is a risk
              of back-feeds from alternative supply routes that the SLD for a single building might not show.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Understanding the distribution network is essential for planning safe
              isolation on interconnected systems. Wiring diagram interpretation — from SLDs through to
              interconnection drawings — is a core competence for the maintenance and operations engineering
              technician.
            </p>
          </div>
        </section>

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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Drawing Types</p>
                <ul className="space-y-0.5">
                  <li>SLD — overall distribution architecture</li>
                  <li>Load schedule — circuit technical data</li>
                  <li>Interconnection — cables between equipment</li>
                  <li>Cable schedule — all cables with routes</li>
                  <li>Network diagram — site-wide distribution</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BS EN 61082 — document preparation</li>
                  <li>BS EN 60617 — graphical symbols</li>
                  <li>BS EN 81346 — reference designations</li>
                  <li>BS 7671 — wiring regulations</li>
                  <li>ST1426 — technician competence</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Circuit Diagrams
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section2-3">
              Next: P&amp;ID Diagrams
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule6Section2_2;
