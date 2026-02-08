import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Piping and Instrumentation Diagrams (P&ID) - MOET Module 6 Section 2.3";
const DESCRIPTION = "Interpreting piping and instrumentation diagrams for electrical maintenance: P&ID symbols, instrument identification, control loops, valve and actuator representation, ISA/BS EN standards and cross-referencing with electrical documentation.";

const quickCheckQuestions = [
  {
    id: "pid-purpose-check",
    question: "What is the primary purpose of a piping and instrumentation diagram (P&ID)?",
    options: [
      "To show the physical layout of pipes in a building",
      "To show the functional relationship between piping, instrumentation and control equipment in a process system",
      "To list all the pipe sizes in the installation",
      "To show only the electrical wiring"
    ],
    correctIndex: 1,
    explanation: "A P&ID shows the functional relationship between all the process equipment (vessels, pumps, heat exchangers), the piping that connects them, and the instrumentation and controls that monitor and regulate the process. It is the primary reference document for understanding how a process system operates."
  },
  {
    id: "instrument-tag-check",
    question: "An instrument tag number such as 'TT-101' on a P&ID indicates:",
    options: [
      "A telephone terminal in area 101",
      "A temperature transmitter, identified as loop number 101",
      "A test terminal on panel 101",
      "A timer with 101-second delay"
    ],
    correctIndex: 1,
    explanation: "Instrument tag numbers follow the ISA 5.1 / BS EN 62424 convention. The first letter indicates the measured variable (T = temperature), the second letter indicates the function (T = transmit). The number identifies the specific control loop (101). So TT-101 is a temperature transmitter in loop 101."
  },
  {
    id: "control-valve-check",
    question: "On a P&ID, a control valve with a pneumatic actuator is shown with:",
    options: [
      "A simple line across the pipe",
      "A valve symbol with an actuator symbol on top, indicating the actuator type (pneumatic, electric, hydraulic) and failure mode",
      "A circle only",
      "No symbol — it is listed in a table"
    ],
    correctIndex: 1,
    explanation: "Control valves on P&IDs are shown with the valve body symbol plus the actuator type above it. The failure mode (fail-open, fail-closed, fail-in-place) is indicated by notation such as FC (fail-closed) or FO (fail-open). This is essential for understanding what happens during a power or air supply failure."
  },
  {
    id: "pid-electrical-link",
    question: "How does a P&ID relate to the electrical maintenance technician's work?",
    options: [
      "It does not — P&IDs are only for process engineers",
      "The P&ID identifies all instrumentation, actuators and control equipment that the electrician must maintain, and links to the electrical drawings via instrument tag numbers",
      "It shows the cable routes for instrumentation cables",
      "It replaces the need for electrical single-line diagrams"
    ],
    correctIndex: 1,
    explanation: "For a maintenance technician, the P&ID identifies every instrument, actuator and motor in the process system. The tag numbers on the P&ID cross-reference to instrument datasheets, loop diagrams, electrical drawings and the CMMS. When fault-finding a process issue, the P&ID shows which instruments and actuators are involved."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The letters in an ISA 5.1 instrument tag identify:",
    options: [
      "The physical location of the instrument",
      "The measured variable and the instrument function (e.g., FT = flow transmitter, PI = pressure indicator)",
      "The manufacturer and model number",
      "The cable type connected to the instrument"
    ],
    correctAnswer: 1,
    explanation: "ISA 5.1 uses a letter code where the first letter identifies the measured variable (F = flow, T = temperature, P = pressure, L = level) and subsequent letters identify the function (T = transmit, I = indicate, C = control, A = alarm). So FT = flow transmitter, PI = pressure indicator, LIC = level indicating controller."
  },
  {
    id: 2,
    question: "On a P&ID, a circle with a horizontal line through the middle represents:",
    options: [
      "A pump",
      "An instrument mounted in the field (below the line) vs in the control room (above the line)",
      "A pipe cap",
      "A drain point"
    ],
    correctAnswer: 1,
    explanation: "The circle (balloon) symbol represents an instrument. A horizontal line through the middle indicates the instrument is mounted on the main control panel. A circle without a line indicates a field-mounted instrument. A dashed line indicates mounting on a local panel. This tells the maintenance technician where to find the instrument."
  },
  {
    id: 3,
    question: "A dashed line on a P&ID typically represents:",
    options: [
      "A process pipe",
      "An electrical signal, pneumatic signal, or instrument connection (depending on the line style)",
      "A structural beam",
      "A fence or boundary"
    ],
    correctAnswer: 1,
    explanation: "P&IDs use different line styles to distinguish between process piping (solid heavy lines), electrical signals (dashed lines), pneumatic signals (lines with crosses), and hydraulic signals (dashed lines with dots). Understanding these line conventions is essential for tracing signal paths from instruments to controllers."
  },
  {
    id: 4,
    question: "The term 'control loop' on a P&ID refers to:",
    options: [
      "A circular pipe route",
      "The complete system of sensor, controller and final control element that measures a process variable, compares it to a setpoint, and adjusts the process accordingly",
      "A wire loop for testing",
      "A maintenance inspection route"
    ],
    correctAnswer: 1,
    explanation: "A control loop consists of: a sensor/transmitter (measures the process variable), a controller (compares measurement to setpoint and calculates correction), and a final control element (typically a control valve or VSD-driven motor) that adjusts the process. The P&ID shows all these elements and their connections."
  },
  {
    id: 5,
    question: "A motor-operated valve (MOV) on a P&ID is important for electrical maintenance because:",
    options: [
      "It does not require any electrical maintenance",
      "The electrician must maintain the electric actuator, its power supply, control wiring, limit switches and position feedback signals",
      "It only needs mechanical maintenance",
      "MOVs are not shown on P&IDs"
    ],
    correctAnswer: 1,
    explanation: "Motor-operated valves have electric actuators requiring maintenance of: the motor and gearbox, power supply wiring, control signals (open/close commands), limit switches (open/closed position), torque switches, position feedback signals, and local/remote selection switches. All of these are the electrician's responsibility."
  },
  {
    id: 6,
    question: "A P&ID shows a pump with the tag 'P-201A/B'. This indicates:",
    options: [
      "Two different types of pump",
      "A duty/standby pump arrangement where P-201A is the duty pump and P-201B is the standby, providing redundancy",
      "A pump that runs at two speeds",
      "A pump in building A connected to a pump in building B"
    ],
    correctAnswer: 1,
    explanation: "The A/B suffix indicates a duty/standby arrangement — two identical pumps where one runs (duty) and the other is on standby, ready to start automatically if the duty pump fails. This is common for critical process services. The electrician maintains both pump motors and the auto-changeover control system."
  },
  {
    id: 7,
    question: "An interlock shown on a P&ID (e.g., low oil pressure trips the compressor) is relevant to electrical maintenance because:",
    options: [
      "Interlocks are purely mechanical",
      "The interlock logic is implemented through electrical/electronic circuits that the maintenance technician must understand, test and maintain",
      "Interlocks are only relevant during commissioning",
      "The P&ID does not show interlocks"
    ],
    correctAnswer: 1,
    explanation: "Process interlocks are typically implemented through electrical/electronic circuits — hardwired safety relays, PLC logic, or safety instrumented systems (SIS). The P&ID shows what the interlock does functionally; the electrical drawings and PLC programmes show how it is implemented. The maintenance technician must understand both for effective fault-finding and testing."
  },
  {
    id: 8,
    question: "When fault-finding a process control issue, the P&ID is used to:",
    options: [
      "Identify the cable sizes involved",
      "Understand the process flow, identify which instruments and control elements are involved, and determine the expected cause-and-effect relationships",
      "Calculate the pipe pressure",
      "Determine the maintenance budget"
    ],
    correctAnswer: 1,
    explanation: "The P&ID shows you the complete picture: what the process should be doing, which instruments are measuring it, which controller is regulating it, and which actuator is adjusting it. When a process variable is out of range, the P&ID helps you identify every element in the control loop that could be causing the problem."
  },
  {
    id: 9,
    question: "BS EN 62424 relates to:",
    options: [
      "Electrical wiring regulations",
      "Representation of process control engineering in P&ID diagrams, including instrument identification and graphic symbols",
      "Fire alarm system design",
      "Structural steelwork specifications"
    ],
    correctAnswer: 1,
    explanation: "BS EN 62424 (based on IEC 62424) provides the standard for representing process control engineering in P&ID diagrams. It defines the graphic symbols, letter codes, and identification methods used for instruments and control equipment. It complements ISA 5.1 which is also widely used in the UK."
  },
  {
    id: 10,
    question: "A safety instrumented function (SIF) shown on a P&ID with an 'SIL' rating indicates:",
    options: [
      "A standard instrument loop",
      "A safety-critical function with a defined Safety Integrity Level, requiring specific testing and maintenance procedures",
      "A simple indicator light",
      "A spare instrument location"
    ],
    correctAnswer: 1,
    explanation: "Safety instrumented functions (SIFs) are safety-critical loops with a defined SIL (Safety Integrity Level) rating per BS EN 61511. They have mandatory proof-test intervals, specific maintenance requirements, and documented test procedures. As a maintenance technician, you must follow these procedures exactly and record all test results."
  },
  {
    id: 11,
    question: "A loop diagram differs from a P&ID in that it shows:",
    options: [
      "The complete process plant layout",
      "The detailed wiring connections for a single instrument loop, including terminal numbers, cable references, and junction box details",
      "All the instruments on the site",
      "Only the process piping"
    ],
    correctAnswer: 1,
    explanation: "A loop diagram (or instrument loop drawing) shows the complete wiring detail for one specific instrument loop — from the field instrument through junction boxes, cable marshalling, to the control system I/O. It includes terminal numbers, cable references, and signal types. It is the instrument equivalent of an electrical wiring diagram."
  },
  {
    id: 12,
    question: "Understanding P&IDs is important for an electrical maintenance technician under ST1426 because:",
    options: [
      "P&IDs are only for chemical engineers",
      "Maintenance technicians must be able to interpret technical drawings including process diagrams to understand the systems they maintain",
      "It is not relevant to ST1426",
      "Only to satisfy academic requirements"
    ],
    correctAnswer: 1,
    explanation: "ST1426 requires maintenance technicians to interpret technical drawings and documentation relevant to their work. In process industries (manufacturing, water treatment, HVAC, food production), P&IDs are fundamental documents. Understanding them enables effective fault-finding, safe isolation planning, and informed communication with process engineers."
  }
];

const faqs = [
  {
    question: "Do I need to understand the full chemical process to read a P&ID?",
    answer: "No. As an electrical maintenance technician, you need to understand the instrumentation, control equipment and electrical components shown on the P&ID, not the detailed chemistry or process engineering. Focus on: what instruments are present, what they measure, how they connect to the control system, and what actuators/motors are involved. Your process engineering colleagues can explain the process context."
  },
  {
    question: "What is the difference between a P&ID and a PFD (Process Flow Diagram)?",
    answer: "A Process Flow Diagram (PFD) is a simplified overview showing the major equipment, main process flows, and key operating conditions (temperatures, pressures, flow rates). A P&ID is much more detailed, showing every pipe, valve, instrument, and control element. The PFD gives you the 'big picture'; the P&ID gives you the detail needed for maintenance and fault-finding."
  },
  {
    question: "How do I cross-reference a P&ID with electrical drawings?",
    answer: "The instrument tag number is the key cross-reference. An instrument shown as TT-101 on the P&ID will appear on the loop diagram for loop 101, the instrument datasheet for TT-101, the electrical cable schedule, and the CMMS asset record. Always use the tag number as your link between the P&ID and all other documentation."
  },
  {
    question: "Are P&IDs updated when changes are made to the plant?",
    answer: "They should be, under the management of change (MOC) procedure. However, in practice, P&IDs are not always kept up to date. If you discover that the P&ID does not match the actual installation, report the discrepancy through your site's documentation control process. Working from an inaccurate P&ID can lead to incorrect fault-finding or unsafe isolation."
  },
  {
    question: "What is a cause-and-effect diagram and how does it relate to the P&ID?",
    answer: "A cause-and-effect (C&E) diagram or matrix shows the logical relationships between process inputs (causes) and safety/control actions (effects). For example: 'high level in tank T-101 (cause) → close inlet valve XV-101 (effect)'. The C&E diagram implements the safety interlocks shown on the P&ID and is essential for testing safety instrumented systems."
  }
];

const MOETModule6Section2_3 = () => {
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
            <span>Module 6.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Piping and Instrumentation Diagrams
          </h1>
          <p className="text-white/80">
            P&amp;ID symbols, instrument identification, control loops and cross-referencing with electrical documentation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>P&amp;ID:</strong> Shows process equipment, piping, instruments and controls</li>
              <li className="pl-1"><strong>Tag numbers:</strong> ISA 5.1 letter code identifies variable and function</li>
              <li className="pl-1"><strong>Control loops:</strong> Sensor → controller → final control element</li>
              <li className="pl-1"><strong>Cross-reference:</strong> Tag numbers link to electrical drawings and CMMS</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Instruments:</strong> Transmitters, switches, analysers to maintain</li>
              <li className="pl-1"><strong>Actuators:</strong> Electric valve actuators and VSD-driven motors</li>
              <li className="pl-1"><strong>Safety systems:</strong> SIL-rated loops with mandatory proof testing</li>
              <li className="pl-1"><strong>ST1426:</strong> Technical drawing interpretation competence</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose and content of piping and instrumentation diagrams",
              "Interpret ISA 5.1 / BS EN 62424 instrument identification and tag numbering",
              "Identify common P&ID symbols for valves, actuators, instruments and equipment",
              "Trace control loops from sensor through controller to final control element",
              "Cross-reference P&ID instrument tags with electrical drawings and loop diagrams",
              "Understand the relevance of P&IDs for electrical fault-finding and safe isolation"
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
            Purpose and Content of P&amp;IDs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A piping and instrumentation diagram (P&amp;ID) is the definitive reference document for any
              process system. It shows the functional relationship between all the equipment in a process —
              vessels, pumps, heat exchangers, compressors — connected by piping, and controlled by
              instrumentation and control systems. For maintenance technicians working in process industries
              (manufacturing, water treatment, HVAC, food production, pharmaceuticals), the P&amp;ID is as
              important as the electrical single-line diagram.
            </p>
            <p>
              Unlike a process flow diagram (PFD) which shows a simplified overview, the P&amp;ID shows every
              pipe, valve, instrument, and control element. Every item has a unique tag number that links it
              to datasheets, maintenance records, spare parts lists, and electrical drawings. The P&amp;ID is
              prepared to BS EN 62424 (IEC 62424) and uses symbols from ISA 5.1 and BS EN ISO 10628.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What a P&amp;ID Shows</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Process equipment:</strong> Vessels, tanks, pumps, compressors, heat exchangers</li>
                <li className="pl-1"><strong>Piping:</strong> All process and utility piping with sizes and specifications</li>
                <li className="pl-1"><strong>Valves:</strong> Manual, control, safety, isolation — with type and tag</li>
                <li className="pl-1"><strong>Instrumentation:</strong> All sensors, transmitters, controllers, indicators</li>
                <li className="pl-1"><strong>Control systems:</strong> DCS/PLC connections, safety systems (SIS)</li>
                <li className="pl-1"><strong>Interlocks:</strong> Safety trips and permissive conditions</li>
                <li className="pl-1"><strong>Line identification:</strong> Pipe size, fluid, specification class</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Why Electricians Need P&amp;IDs</p>
              <p className="text-sm text-white">
                The P&amp;ID identifies every electrical and electronic device in the process: motors, actuators,
                transmitters, switches, analysers, and control equipment. When a process problem occurs, the
                P&amp;ID tells you which instruments and actuators are involved, enabling you to focus your
                electrical fault-finding on the relevant equipment.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Instrument Identification and Tag Numbers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every instrument on a P&amp;ID has a unique tag number following the ISA 5.1 (ANSI/ISA-5.1) or
              BS EN 62424 convention. The tag number is your key for cross-referencing between the P&amp;ID
              and all other documentation — electrical drawings, loop diagrams, datasheets, calibration
              records, and CMMS records. Understanding the tag numbering system is essential.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">First Letter (Variable)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common Functions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">F</td>
                      <td className="border border-white/10 px-3 py-2">Flow</td>
                      <td className="border border-white/10 px-3 py-2">FT (transmitter), FI (indicator), FIC (indicating controller)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">T</td>
                      <td className="border border-white/10 px-3 py-2">Temperature</td>
                      <td className="border border-white/10 px-3 py-2">TT (transmitter), TI (indicator), TSH (switch high)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">P</td>
                      <td className="border border-white/10 px-3 py-2">Pressure</td>
                      <td className="border border-white/10 px-3 py-2">PT (transmitter), PI (indicator), PSL (switch low)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">L</td>
                      <td className="border border-white/10 px-3 py-2">Level</td>
                      <td className="border border-white/10 px-3 py-2">LT (transmitter), LIC (indicating controller), LAH (alarm high)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">A</td>
                      <td className="border border-white/10 px-3 py-2">Analysis</td>
                      <td className="border border-white/10 px-3 py-2">AT (transmitter), AE (element/sensor), AIC (indicating controller)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              The loop number following the letters uniquely identifies the control loop. For example, FT-301
              is the flow transmitter in loop 301, and FV-301 is the flow control valve in the same loop. This
              consistent numbering allows you to quickly identify all the components that make up a single
              control loop.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Control Loops and Signal Paths
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A control loop is the complete system that maintains a process variable at its desired setpoint.
              The P&amp;ID shows every element of the control loop: the sensing element, the transmitter, the
              signal path to the controller, the controller itself, and the final control element (usually a
              valve or motor). Understanding how these elements connect is essential for systematic fault-finding.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Loop Elements</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow/80 text-xs font-mono mt-0.5">01</span>
                  <div>
                    <p className="text-sm font-medium">Sensing Element</p>
                    <p className="text-sm text-white/70">Measures the process variable (e.g., thermocouple, pressure tapping, orifice plate)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow/80 text-xs font-mono mt-0.5">02</span>
                  <div>
                    <p className="text-sm font-medium">Transmitter</p>
                    <p className="text-sm text-white/70">Converts measurement to a standard signal (4-20 mA, HART, fieldbus)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow/80 text-xs font-mono mt-0.5">03</span>
                  <div>
                    <p className="text-sm font-medium">Controller</p>
                    <p className="text-sm text-white/70">Compares measurement to setpoint, calculates correction (PID algorithm)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow/80 text-xs font-mono mt-0.5">04</span>
                  <div>
                    <p className="text-sm font-medium">Final Control Element</p>
                    <p className="text-sm text-white/70">Adjusts the process (control valve, VSD motor, damper actuator)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Signal Line Conventions</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Solid line:</strong> Process piping</li>
                <li className="pl-1"><strong>Dashed line:</strong> Electrical signal</li>
                <li className="pl-1"><strong>Line with crosses:</strong> Pneumatic signal (compressed air)</li>
                <li className="pl-1"><strong>Dashed line with dots:</strong> Hydraulic signal</li>
                <li className="pl-1"><strong>Triple dash:</strong> Software/data link (DCS/PLC internal)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Valves, Actuators and Motors on P&amp;IDs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Valves and actuators are among the most common items of equipment maintained by electrical
              technicians in process environments. The P&amp;ID shows every valve, its type, its actuator
              type, and its failure mode. Understanding these symbols allows you to identify the full scope
              of electrical maintenance required for the process system.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Valve Types</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Gate valve — on/off isolation</li>
                  <li className="pl-1">Globe valve — throttling/control</li>
                  <li className="pl-1">Ball valve — quarter-turn on/off</li>
                  <li className="pl-1">Butterfly valve — large pipe control</li>
                  <li className="pl-1">Check valve — non-return (no actuator)</li>
                  <li className="pl-1">Relief valve — overpressure safety</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Actuator Types</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Electric (MOV) — motor-driven, position feedback</li>
                  <li className="pl-1">Pneumatic — air-operated, positioner</li>
                  <li className="pl-1">Hydraulic — high-force applications</li>
                  <li className="pl-1">Solenoid — small, fast on/off</li>
                  <li className="pl-1">Manual — handwheel or lever</li>
                  <li className="pl-1">Failure mode: FC, FO, or FIP</li>
                </ul>
              </div>
            </div>

            <p>
              Motors driving pumps, compressors, fans and conveyors are also shown on the P&amp;ID with their
              tag numbers. The motor tag links to the electrical drawings showing the motor control circuit,
              power supply, and protection. Variable speed drives (VSDs) are indicated where applicable,
              as these require specific electrical maintenance procedures.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Cross-Referencing P&amp;IDs with Electrical Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The P&amp;ID does not stand alone — it is part of a documentation hierarchy. For effective
              maintenance, you must be able to cross-reference between the P&amp;ID, loop diagrams,
              electrical drawings, instrument datasheets, and the CMMS. The instrument tag number is the
              golden thread that links all these documents together.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Cross-References</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>P&amp;ID → Loop diagram:</strong> Tag number links to detailed wiring for that loop</li>
                <li className="pl-1"><strong>P&amp;ID → Instrument datasheet:</strong> Tag number links to specifications, ranges, calibration data</li>
                <li className="pl-1"><strong>P&amp;ID → Electrical SLD:</strong> Motor tags appear on both drawings</li>
                <li className="pl-1"><strong>P&amp;ID → Cable schedule:</strong> Tag number links to cable reference and route</li>
                <li className="pl-1"><strong>P&amp;ID → CMMS:</strong> Tag number is the asset identifier for maintenance records</li>
                <li className="pl-1"><strong>P&amp;ID → Cause &amp; effect:</strong> Interlocks shown on P&amp;ID are detailed in C&amp;E matrix</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Safety Instrumented Systems</p>
              <p className="text-sm text-white">
                P&amp;IDs identify safety instrumented functions (SIFs) with their SIL ratings per BS EN 61511.
                These loops have mandatory proof-test intervals and specific maintenance procedures. As a
                maintenance technician, you must follow SIS test procedures exactly, record all results, and
                never bypass or defeat a safety function without formal authorisation through the management
                of change process.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The ability to interpret P&amp;IDs and cross-reference with electrical
              documentation demonstrates the technical drawing competence required by the maintenance
              and operations engineering technician standard. This skill is essential for working effectively
              in any process-based industry.
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
                <p className="font-medium text-white mb-1">ISA 5.1 First Letters</p>
                <ul className="space-y-0.5">
                  <li>F — Flow</li>
                  <li>T — Temperature</li>
                  <li>P — Pressure</li>
                  <li>L — Level</li>
                  <li>A — Analysis (composition)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">ISA 5.1 Function Letters</p>
                <ul className="space-y-0.5">
                  <li>T — Transmitter</li>
                  <li>I — Indicator</li>
                  <li>C — Controller</li>
                  <li>V — Valve (final element)</li>
                  <li>S — Switch, A — Alarm, H — High, L — Low</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Wiring Diagrams
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section2-4">
              Next: Labelling Standards
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule6Section2_3;
