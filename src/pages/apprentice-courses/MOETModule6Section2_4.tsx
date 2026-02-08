import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Labelling and Numbering Standards - MOET Module 6 Section 2.4";
const DESCRIPTION = "Component labelling conventions, wire numbering systems, terminal identification, cable marking standards, BS EN 81346 and IEC 60750 for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "label-purpose-check",
    question: "What is the primary purpose of a standardised labelling system in an electrical installation?",
    options: [
      "To make the installation look tidy for inspections",
      "To enable any competent technician to identify components, circuits and connections unambiguously, reducing error risk during maintenance",
      "To satisfy the client's branding requirements",
      "To reduce the cost of installation materials"
    ],
    correctIndex: 1,
    explanation: "Standardised labelling ensures that any competent technician can positively identify components, circuits, wires and terminals without ambiguity. This is critical for safety — incorrect identification during maintenance could mean working on the wrong circuit, leading to electric shock or equipment damage."
  },
  {
    id: "wire-numbering-check",
    question: "In a control panel, wire 24 is found at terminal strip TS3 terminal 7. Another end of the same wire connects to contactor KM1 terminal A1. What stays constant along the entire wire length?",
    options: [
      "The terminal number",
      "The wire number (24) — it is the same at both ends and everywhere along the wire",
      "The component designation",
      "The cable colour"
    ],
    correctIndex: 1,
    explanation: "A wire number identifies a unique electrical point (node) in the circuit. The same wire number appears at every termination point of that wire. This allows technicians to trace continuity through the installation — if wire 24 is disconnected from terminal A1 of KM1, you know it must be reconnected to the same terminal, not elsewhere."
  },
  {
    id: "bs-en-81346-check",
    question: "Under BS EN 81346, the prefix letter 'Q' designates which type of component?",
    options: [
      "A resistor",
      "A switching device for power circuits, such as a circuit breaker or isolator",
      "A relay or contactor",
      "A measuring instrument"
    ],
    correctIndex: 1,
    explanation: "BS EN 81346 (replacing the older BS 3939 letter codes) assigns 'Q' to switching devices in power circuits — circuit breakers, isolators, disconnectors and similar devices. 'K' is used for relays and contactors, 'R' for resistors, and 'P' for measuring instruments."
  },
  {
    id: "cable-marking-check",
    question: "Which standard governs cable identification and marking in UK electrical installations?",
    options: [
      "BS 7671 only",
      "BS EN 62491 (Cable and core identification) together with BS 7671 requirements for conductor identification",
      "There is no standard — each installer uses their own system",
      "ISO 9001"
    ],
    correctIndex: 1,
    explanation: "BS EN 62491 provides the standard for cable and core identification marking. BS 7671 (Chapter 51, Regulation 514) sets requirements for conductor identification by colour and labelling. Together, these ensure consistent cable marking across UK installations."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which BS EN standard provides the reference designation system for industrial components (replacing the older letter code systems)?",
    options: [
      "BS EN 60617",
      "BS EN 81346",
      "BS EN 62491",
      "BS EN 61082"
    ],
    correctAnswer: 1,
    explanation: "BS EN 81346 'Industrial systems, installations and equipment and industrial products — Structuring principles and reference designations' provides the standardised system for designating components. It replaced the older DIN 40719 and BS 3939 letter code systems."
  },
  {
    id: 2,
    question: "In the designation KM3, what does the 'K' represent?",
    options: [
      "A circuit breaker",
      "A contactor or relay",
      "A motor",
      "A transformer"
    ],
    correctAnswer: 1,
    explanation: "Under BS EN 81346, the letter 'K' designates contactors and relays. 'M' stands for motor, 'Q' for switching device (circuit breaker/isolator), and 'T' for transformer. KM3 therefore identifies the third contactor in the system."
  },
  {
    id: 3,
    question: "A wire numbered '415' appears on a wiring diagram at four different terminal points. This means:",
    options: [
      "There are four separate wires, each numbered 415",
      "All four termination points are at the same electrical potential — they are all on the same node in the circuit",
      "The wire carries 415 volts",
      "The wire is 415 mm long"
    ],
    correctAnswer: 1,
    explanation: "A wire number identifies an electrical node. Every termination point sharing the same wire number is at the same electrical potential in the circuit. This is fundamental to wire numbering systems — the number follows the electrical potential, not the physical wire."
  },
  {
    id: 4,
    question: "Terminal strips in a control panel are typically labelled with:",
    options: [
      "Random numbers chosen by the installer",
      "A sequential terminal strip designator (e.g., X1, X2) followed by individual terminal numbers",
      "The contractor's company name",
      "The date of installation"
    ],
    correctAnswer: 1,
    explanation: "Terminal strips use a designator (commonly X1, X2, X3, etc.) followed by sequential terminal numbers. For example, X1:7 means terminal strip X1, terminal number 7. This unambiguous identification is essential for maintenance and fault-finding."
  },
  {
    id: 5,
    question: "According to BS 7671 Regulation 514.8, every circuit at the distribution board must be provided with:",
    options: [
      "A spare fuse",
      "A durable label or marking identifying its purpose",
      "A copy of the test certificate",
      "An isolation switch"
    ],
    correctAnswer: 1,
    explanation: "Regulation 514.8 requires that every circuit be identified with a durable label at the distribution board. The label must indicate the circuit purpose and be arranged so that the identification is clear. This is a fundamental requirement for safe maintenance."
  },
  {
    id: 6,
    question: "Cable identification ferrules are typically fitted:",
    options: [
      "Only at the midpoint of each cable run",
      "At each end of every wire or conductor, close to the termination point",
      "Only on three-phase cables",
      "Only on cables longer than 10 metres"
    ],
    correctAnswer: 1,
    explanation: "Cable ferrules (also called wire markers or end sleeves) are fitted at both ends of each conductor, close to the termination. This allows a technician to identify the wire at either end without needing to trace the full length — essential in complex panels with hundreds of wires."
  },
  {
    id: 7,
    question: "In a motor control centre, the designation '-Q1' on a device indicates:",
    options: [
      "The first motor in the system",
      "The main switching device (e.g., MCCB or isolator) for that motor feeder",
      "A power factor correction capacitor",
      "An emergency stop button"
    ],
    correctAnswer: 1,
    explanation: "The 'Q' prefix designates a switching device for power circuits. '-Q1' typically refers to the main circuit breaker or isolator in a motor feeder. This standardised naming means maintenance technicians across different sites can immediately identify the device function."
  },
  {
    id: 8,
    question: "What is the purpose of a 'cable schedule' in an electrical installation?",
    options: [
      "To record the delivery dates of cable orders",
      "To provide a comprehensive list linking cable references to their routes, sizes, types, origins and destinations",
      "To calculate the total weight of cables installed",
      "To record cable test results only"
    ],
    correctAnswer: 1,
    explanation: "A cable schedule is a document that lists every cable in the installation with its unique reference, type, size, number of cores, origin, destination, route, and sometimes length. It is an essential maintenance document that links the physical cable to the drawings."
  },
  {
    id: 9,
    question: "When a maintenance technician discovers that a label is missing or illegible, the correct action is to:",
    options: [
      "Ignore it and continue working",
      "Report it, arrange for a replacement label to be fitted, and update the records",
      "Remove all other labels to match",
      "Write the information on the wall with a marker pen"
    ],
    correctAnswer: 1,
    explanation: "Missing or illegible labels are a safety hazard — they could lead to working on the wrong circuit. The correct action is to report the deficiency, fit a replacement label using the approved labelling system, and update any maintenance records or drawings to reflect the correction."
  },
  {
    id: 10,
    question: "The colour coding of three-phase conductors in the UK under BS 7671 is:",
    options: [
      "Red, yellow, blue",
      "Brown (L1), black (L2), grey (L3)",
      "Brown, blue, green/yellow",
      "Black, red, blue"
    ],
    correctAnswer: 1,
    explanation: "Since the harmonisation to IEC standards adopted in BS 7671:2008 onwards, UK three-phase conductor colours are brown (L1), black (L2) and grey (L3). The older red, yellow, blue system may still be found in existing installations and must be identified accordingly."
  },
  {
    id: 11,
    question: "In a PLC-based control system, I/O addresses such as I0.3 and Q2.1 serve as:",
    options: [
      "The physical size of the PLC module",
      "Unique labels identifying specific input and output points, linking the field device wiring to the PLC programme",
      "The serial number of the PLC",
      "The cost code for the PLC module"
    ],
    correctAnswer: 1,
    explanation: "PLC I/O addresses are the labelling system that connects physical wiring to the control programme. I0.3 identifies input byte 0, bit 3; Q2.1 identifies output byte 2, bit 1. These addresses appear on wiring diagrams, the PLC programme, and the field device labels, providing full traceability."
  },
  {
    id: 12,
    question: "Engraved phenolic labels are preferred over adhesive labels in switchgear because:",
    options: [
      "They are cheaper to produce",
      "They are durable, heat-resistant, and will not fall off or become illegible over the life of the installation",
      "They are easier to remove",
      "They come in more colours"
    ],
    correctAnswer: 1,
    explanation: "Engraved phenolic (Traffolyte) labels are the industry standard for switchgear identification because they withstand heat, cleaning chemicals, UV light and mechanical wear without becoming illegible. Adhesive labels may peel, fade, or melt in the environment around switchgear, making them unreliable for long-term identification."
  }
];

const faqs = [
  {
    question: "What is the difference between a wire number and a cable reference?",
    answer: "A wire number identifies a single electrical node (point of equal potential) within a circuit. Every connection at that node shares the same wire number. A cable reference identifies a physical multicore cable — a cable may contain many individually numbered wires. For example, cable C45 might contain wires 201, 202, 203, and E. The cable reference appears on cable schedules and route drawings; wire numbers appear on schematic and wiring diagrams."
  },
  {
    question: "Do I need to know BS EN 81346 for the ST1426 end-point assessment?",
    answer: "You need to understand the principles of component designation and labelling systems rather than memorise every letter code. The key requirement is that you can read and interpret labels on drawings and equipment, understand what they mean, and apply consistent labelling when carrying out work. Familiarity with common designations (K for contactors, Q for circuit breakers, M for motors, F for fuses) is expected."
  },
  {
    question: "What should I do if labels in an existing installation use the old colour code system?",
    answer: "Many existing installations still use the old UK colour codes (red/yellow/blue for three-phase, red/black for single-phase). These are perfectly legal for existing installations. However, when carrying out additions or alterations, the new harmonised colours (brown/black/grey for three-phase, brown/blue for single-phase) must be used, and a warning label must be fitted at the distribution board indicating that two colour systems are present. BS 7671 Regulation 514.14 covers this requirement."
  },
  {
    question: "How do I label circuits in a domestic consumer unit?",
    answer: "BS 7671 Regulation 514.8 requires that every circuit in a consumer unit be identified with a durable label. Best practice is to use the chart provided inside the consumer unit cover or door, clearly stating the circuit number, protective device rating, circuit purpose (e.g., 'Ring — Ground Floor Sockets', 'Radial — Cooker'), and the cable size. Labels should be legible, durable, and secured so they remain in place throughout the life of the installation."
  },
  {
    question: "What is a ferrule in the context of wire identification?",
    answer: "A ferrule is a small sleeve, typically made of PVC or nylon, that slides over the end of a wire and displays the wire number. Ferrules are printed or engraved with the wire number and are fitted close to each termination point. In modern installations, heat-shrink markers and printed wrap-around labels serve the same purpose. The key requirement is that the identification is durable, legible, and positioned where it can be read during maintenance."
  }
];

const MOETModule6Section2_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section2">
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
            <span>Module 6.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Labelling and Numbering Standards
          </h1>
          <p className="text-white/80">
            Component designation, wire numbering and identification systems for electrical maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Labels:</strong> Unambiguous identification of every component, cable and circuit</li>
              <li className="pl-1"><strong>Wire numbers:</strong> Identify electrical nodes — same number at every connection point on that node</li>
              <li className="pl-1"><strong>Standards:</strong> BS EN 81346 for component designation, BS EN 62491 for cable marking</li>
              <li className="pl-1"><strong>BS 7671:</strong> Regulation 514 covers conductor and circuit identification requirements</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fault-finding:</strong> Correct labels enable rapid circuit tracing</li>
              <li className="pl-1"><strong>Safety:</strong> Wrong identification = working on the wrong circuit</li>
              <li className="pl-1"><strong>Compliance:</strong> Labelling deficiencies are common C2 observations on EICR</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to documentation and technical drawing KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose and importance of standardised labelling systems",
              "Interpret component designations using BS EN 81346 letter codes",
              "Describe wire numbering systems and their relationship to circuit nodes",
              "Apply terminal strip identification conventions in control panels",
              "Identify cable marking requirements under BS EN 62491 and BS 7671",
              "Maintain and replace labels during routine maintenance activities"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Labelling and Numbering Matter
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every electrical installation — from a domestic consumer unit to an industrial motor control centre — relies
              on labelling to ensure that maintenance, fault-finding and modifications can be carried out safely and
              efficiently. Labels are not an afterthought; they are a fundamental safety feature of the installation.
            </p>
            <p>
              Without correct, legible labels, a maintenance technician may isolate the wrong circuit, disconnect the
              wrong wire, or test the wrong component. In high-voltage environments, such errors can be fatal. Even in
              low-voltage installations, incorrect identification leads to wasted time, incorrect repairs, and potentially
              dangerous situations.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Labelling Chain</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Design drawings:</strong> Components, cables and circuits are designated during the design phase</li>
                <li className="pl-1"><strong>Panel build:</strong> Components are physically labelled to match the drawings during manufacture</li>
                <li className="pl-1"><strong>Site installation:</strong> Cables are labelled at both ends, circuits identified at distribution boards</li>
                <li className="pl-1"><strong>Commissioning:</strong> Labels are verified against drawings and corrected if necessary</li>
                <li className="pl-1"><strong>Maintenance:</strong> Technicians rely on labels for safe identification throughout the installation life</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Regulatory Requirement</p>
              <p className="text-sm text-white">
                BS 7671 Regulation 514.1.1 states that identification labels shall be durable and legible. Regulation 514.8.1
                requires that every distribution board circuit be identified with a durable label. Failure to provide adequate
                labelling is a non-compliance that will be recorded on an Electrical Installation Condition Report (EICR) —
                often as a C3 (improvement recommended) or C2 (potentially dangerous) observation if the absence of labels
                could lead to incorrect identification of circuits.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Labelling is not optional. It is a regulatory requirement under BS 7671 and a
              fundamental safety measure. The maintenance technician has a responsibility to maintain, replace, and report
              missing or illegible labels during every site visit.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Component Designation Systems (BS EN 81346)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS EN 81346 provides the international standard for structuring and designating components within industrial
              systems. It replaces older national standards and provides a consistent framework used across Europe and
              increasingly worldwide. For maintenance technicians, understanding these designations is essential for
              reading drawings and identifying components on site.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Component Designation Letters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Letter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Component Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">K</td>
                      <td className="border border-white/10 px-3 py-2">Contactors and relays</td>
                      <td className="border border-white/10 px-3 py-2">KM1 (contactor 1), KA3 (auxiliary relay 3)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Q</td>
                      <td className="border border-white/10 px-3 py-2">Switching devices (power circuits)</td>
                      <td className="border border-white/10 px-3 py-2">Q1 (isolator), QF2 (circuit breaker 2)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">F</td>
                      <td className="border border-white/10 px-3 py-2">Protective devices</td>
                      <td className="border border-white/10 px-3 py-2">F1 (fuse 1), FA1 (overload relay 1)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">M</td>
                      <td className="border border-white/10 px-3 py-2">Motors</td>
                      <td className="border border-white/10 px-3 py-2">M1 (motor 1), M2 (motor 2)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">T</td>
                      <td className="border border-white/10 px-3 py-2">Transformers</td>
                      <td className="border border-white/10 px-3 py-2">T1 (transformer 1)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">S</td>
                      <td className="border border-white/10 px-3 py-2">Switches (control circuits)</td>
                      <td className="border border-white/10 px-3 py-2">S1 (push button 1), SA1 (selector switch 1)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">H</td>
                      <td className="border border-white/10 px-3 py-2">Signalling devices</td>
                      <td className="border border-white/10 px-3 py-2">H1 (indicator lamp 1), HA1 (alarm horn 1)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">X</td>
                      <td className="border border-white/10 px-3 py-2">Terminal strips and connectors</td>
                      <td className="border border-white/10 px-3 py-2">X1 (terminal strip 1), XP1 (plug connector 1)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">R</td>
                      <td className="border border-white/10 px-3 py-2">Resistors</td>
                      <td className="border border-white/10 px-3 py-2">R1 (resistor 1), RV1 (variable resistor 1)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">P</td>
                      <td className="border border-white/10 px-3 py-2">Measuring instruments</td>
                      <td className="border border-white/10 px-3 py-2">P1 (ammeter), PV1 (voltmeter)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hierarchical Designation</p>
              <p className="text-sm text-white mb-2">
                BS EN 81346 uses a hierarchical structure to locate components within a system. A full designation might read:
              </p>
              <p className="text-sm text-white font-mono bg-white/5 p-2 rounded mb-2">
                =MCC1+DR3-KM1
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>=MCC1:</strong> System level — Motor Control Centre 1</li>
                <li className="pl-1"><strong>+DR3:</strong> Location level — Drawer 3</li>
                <li className="pl-1"><strong>-KM1:</strong> Component level — Contactor 1</li>
              </ul>
              <p className="text-sm text-white mt-2">
                This structured approach means a technician can navigate from the system level down to the specific component,
                even in a facility with hundreds of similar devices.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When you encounter a designation on site that you do not recognise, always
              cross-reference it with the as-built drawings. Do not guess — incorrect identification of components is a
              common cause of maintenance errors.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Wire Numbering Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Wire numbering is arguably the most critical labelling system in a control panel or complex installation.
              Every wire in a control circuit is assigned a unique number that identifies the electrical node it belongs
              to. This number stays the same at every termination point along the wire, allowing technicians to trace
              circuits and verify correct connections during maintenance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Wire Numbering Principles</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Node-based:</strong> A wire number identifies an electrical node (point of equal potential), not a physical wire</li>
                <li className="pl-1"><strong>Consistent:</strong> The same number appears at every termination point on that node — the wire number does not change when it passes through a terminal strip</li>
                <li className="pl-1"><strong>Unique:</strong> Each node has a unique number within the circuit or panel</li>
                <li className="pl-1"><strong>Sequential:</strong> Numbers are typically assigned sequentially, often grouped by circuit function (e.g., 100-series for control, 200-series for interlocks)</li>
                <li className="pl-1"><strong>Physically marked:</strong> Wire ferrules or labels display the number at each end of every wire</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Numbering Conventions</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Number Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1-99</td>
                      <td className="border border-white/10 px-3 py-2">Power circuit connections (L1, L2, L3, N, E)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100-199</td>
                      <td className="border border-white/10 px-3 py-2">Control circuit — main control functions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">200-299</td>
                      <td className="border border-white/10 px-3 py-2">Interlock and safety circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">300-399</td>
                      <td className="border border-white/10 px-3 py-2">Indication and alarm circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">400-499</td>
                      <td className="border border-white/10 px-3 py-2">Analogue signal circuits (4-20 mA, 0-10 V)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-white/70 mt-2">
                Note: These ranges are conventional, not mandatory. Always refer to the project-specific numbering schedule.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">When Wire Numbers Change</p>
              <p className="text-sm text-white">
                A wire number changes when the electrical potential changes — i.e., when the wire passes through a
                component that changes its state or voltage. For example, on one side of a contactor coil the wire number
                might be 101; on the other side it will be a different number (e.g., 102) because the electrical potential
                is different. Through a terminal strip (which does not change the electrical state), the wire number stays
                the same.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> Before disconnecting any wire during maintenance, always note the wire
              number on both the wire ferrule and the drawing. When reconnecting, verify the wire number matches the
              drawing. This simple discipline prevents the vast majority of reconnection errors.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Terminal Strip and Cable Identification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Terminal strips are the interface between internal panel wiring and external field cables. They provide a
              structured, accessible point for testing, disconnection and reconnection. Correct identification of terminal
              strips and the cables connected to them is essential for efficient and safe maintenance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Terminal Strip Conventions</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Designation:</strong> Terminal strips are labelled X1, X2, X3, etc. (using the 'X' prefix from BS EN 81346)</li>
                <li className="pl-1"><strong>Terminal numbers:</strong> Individual terminals are numbered sequentially: X1:1, X1:2, X1:3, etc.</li>
                <li className="pl-1"><strong>Grouping:</strong> Terminals are often grouped by circuit function — power, control, earth, spare</li>
                <li className="pl-1"><strong>Marking:</strong> Each terminal position has a permanent label strip showing the terminal number</li>
                <li className="pl-1"><strong>Separation:</strong> Earth terminals are typically on a separate rail, often identified with green/yellow marking</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Identification (BS EN 62491)</h3>
              <p className="text-sm text-white mb-2">
                BS EN 62491 establishes the requirements for cable and core identification. Key requirements include:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Unique cable reference:</strong> Every cable has a unique alphanumeric designation (e.g., C001, MC-45)</li>
                <li className="pl-1"><strong>Both ends marked:</strong> Cable labels must be fitted at both origin and destination</li>
                <li className="pl-1"><strong>Core identification:</strong> Individual cores are identified by colour coding (per BS 7671) and additionally by ferrules where multiple cables terminate on the same equipment</li>
                <li className="pl-1"><strong>Durability:</strong> Labels must be resistant to the environment — heat, moisture, UV, chemicals</li>
                <li className="pl-1"><strong>Legibility:</strong> Text size and contrast must allow reading under normal maintenance conditions</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Conductor Colour Identification (BS 7671)</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Conductor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Current (Harmonised)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Old UK</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line (single phase)</td>
                      <td className="border border-white/10 px-3 py-2">Brown</td>
                      <td className="border border-white/10 px-3 py-2">Red</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Neutral</td>
                      <td className="border border-white/10 px-3 py-2">Blue</td>
                      <td className="border border-white/10 px-3 py-2">Black</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">L1 (three phase)</td>
                      <td className="border border-white/10 px-3 py-2">Brown</td>
                      <td className="border border-white/10 px-3 py-2">Red</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">L2 (three phase)</td>
                      <td className="border border-white/10 px-3 py-2">Black</td>
                      <td className="border border-white/10 px-3 py-2">Yellow</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">L3 (three phase)</td>
                      <td className="border border-white/10 px-3 py-2">Grey</td>
                      <td className="border border-white/10 px-3 py-2">Blue</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Earth (CPC)</td>
                      <td className="border border-white/10 px-3 py-2">Green/yellow</td>
                      <td className="border border-white/10 px-3 py-2">Green/yellow</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> When both old and new colour systems are present in the same installation, a
              warning label must be fitted at the distribution board (BS 7671 Regulation 514.14). This situation is very
              common in maintenance work on existing buildings.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Maintaining Labels in Practice
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As a maintenance technician, you will encounter labelling issues on almost every site. Labels fade, fall off,
              or were never fitted in the first place. Part of your professional responsibility is to maintain the labelling
              system as part of routine maintenance activities.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Label Maintenance Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Visual check:</strong> During every maintenance visit, check that labels are present, legible, and correctly positioned</li>
                <li className="pl-1"><strong>Record deficiencies:</strong> Note missing or illegible labels in the maintenance report or job card</li>
                <li className="pl-1"><strong>Replace immediately:</strong> Where possible, replace damaged labels during the visit rather than leaving it for another time</li>
                <li className="pl-1"><strong>Use correct materials:</strong> Replace labels with the same type and quality — engraved phenolic for switchgear, printed ferrules for wire ends</li>
                <li className="pl-1"><strong>Update records:</strong> If any labels are replaced or corrected, update the as-built drawings and cable schedules accordingly</li>
                <li className="pl-1"><strong>Verify accuracy:</strong> When replacing a label, verify the information is correct by cross-referencing with drawings — do not simply copy a faded label that might itself have been wrong</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Label Types and Applications</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Label Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Durability</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Engraved phenolic (Traffolyte)</td>
                      <td className="border border-white/10 px-3 py-2">Switchgear, distribution boards, control panels</td>
                      <td className="border border-white/10 px-3 py-2">Excellent — 25+ years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Printed ferrules</td>
                      <td className="border border-white/10 px-3 py-2">Wire identification at termination points</td>
                      <td className="border border-white/10 px-3 py-2">Good — 10-15 years inside panels</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heat-shrink markers</td>
                      <td className="border border-white/10 px-3 py-2">Cable identification, harsh environments</td>
                      <td className="border border-white/10 px-3 py-2">Excellent — moisture and chemical resistant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wrap-around labels</td>
                      <td className="border border-white/10 px-3 py-2">Cable identification at terminations and along routes</td>
                      <td className="border border-white/10 px-3 py-2">Good — self-laminating types best</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Adhesive labels (printed)</td>
                      <td className="border border-white/10 px-3 py-2">Circuit charts, temporary identification</td>
                      <td className="border border-white/10 px-3 py-2">Fair — may peel in heat or moisture</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Labelling Defects</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Missing circuit chart at distribution board</li>
                  <li className="pl-1">Faded or illegible cable labels in plant rooms</li>
                  <li className="pl-1">Wire ferrules missing inside control panels</li>
                  <li className="pl-1">Incorrect labels from previous modifications</li>
                  <li className="pl-1">No dual-colour warning label on mixed installations</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice Actions</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Carry a portable label printer on maintenance visits</li>
                  <li className="pl-1">Photograph labels before and after replacement</li>
                  <li className="pl-1">Use the client's labelling convention, not your own</li>
                  <li className="pl-1">Report systemic labelling failures to the responsible person</li>
                  <li className="pl-1">Include labelling checks in maintenance checklists</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires competence in maintaining
              documentation and records. Labelling maintenance is a direct practical application of this requirement —
              keeping the physical installation aligned with its documentation.
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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Control Circuit Wiring
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section2">
              Back to Section 6.2 Hub
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule6Section2_4;
