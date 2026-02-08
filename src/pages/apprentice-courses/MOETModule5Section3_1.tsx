import { ArrowLeft, Square, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Emergency Stop Circuits - MOET Module 5 Section 3.1";
const DESCRIPTION = "E-stop requirements, wiring methods and testing procedures for electrical maintenance technicians. BS EN ISO 13850, IEC 60204-1 compliance and safety circuit design. ST1426 aligned.";

const quickCheckQuestions = [
  {
    id: "estop-colour",
    question: "What colour and shape must an emergency stop actuator be?",
    options: [
      "Green circle",
      "Red mushroom-head on yellow background",
      "Blue square",
      "White triangle"
    ],
    correctIndex: 1,
    explanation: "BS EN ISO 13850 requires E-stop actuators to be red mushroom-head type on a yellow background. This ensures immediate recognition in an emergency. The actuator must be self-latching (stays engaged until manually reset)."
  },
  {
    id: "estop-nc",
    question: "Why must E-stop circuits use normally closed (NC) contacts?",
    options: [
      "NC contacts are cheaper",
      "NC contacts provide fail-safe operation — a broken wire or contact failure causes the circuit to open and stop the machine",
      "NC contacts are faster",
      "It is a personal preference"
    ],
    correctIndex: 1,
    explanation: "NC contacts ensure fail-safe behaviour. If a wire breaks, a connection fails, or a contact welds open, the safety circuit opens and the machine stops. NO contacts would fail dangerously — the machine would continue running despite a fault."
  },
  {
    id: "estop-cat",
    question: "Under IEC 60204-1, a Category 0 stop is:",
    options: [
      "A controlled deceleration",
      "An uncontrolled stop by immediately removing power to machine actuators",
      "A stop after completing the current cycle",
      "A gradual speed reduction"
    ],
    correctIndex: 1,
    explanation: "Category 0 is an uncontrolled stop — power is removed immediately from the machine actuators. This is the most common E-stop type. Category 1 provides controlled deceleration followed by power removal. Category 2 is a controlled stop with power maintained."
  },
  {
    id: "estop-reset",
    question: "What must happen when an E-stop button is reset?",
    options: [
      "The machine must automatically restart",
      "The safety circuit is re-enabled but a separate start command is needed to restart the machine",
      "All guards must be opened first",
      "The PLC must be rebooted"
    ],
    correctIndex: 1,
    explanation: "Resetting an E-stop must only re-enable the safety circuit — it must not restart the machine. A separate and deliberate start command is required to restart. This prevents unexpected restart and complies with IEC 60204-1 Section 9.2.5.4.5."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "BS EN ISO 13850 specifies that an E-stop must:",
    options: [
      "Only stop one motor",
      "Override all other functions and halt the machine immediately",
      "Be software-controlled only",
      "Be used only on mobile equipment"
    ],
    correctAnswer: 1,
    explanation: "The E-stop must override all operating modes and bring the machine to the safest possible stop as quickly as possible. No other command should be able to prevent or delay the E-stop function."
  },
  {
    id: 2,
    question: "An E-stop actuator must be:",
    options: [
      "Hidden to prevent accidental operation",
      "Self-latching — it stays engaged until manually reset",
      "Automatically resetting after 5 seconds",
      "Operated by key only"
    ],
    correctAnswer: 1,
    explanation: "Self-latching ensures the machine remains stopped until a deliberate reset action. Automatic reset would allow the machine to restart unexpectedly, creating a serious hazard. Reset must require a separate deliberate action."
  },
  {
    id: 3,
    question: "E-stop circuits in series (daisy-chained) means:",
    options: [
      "Only the last button works",
      "Any E-stop in the chain can stop the machine — pressing any one opens the circuit",
      "They must all be pressed simultaneously",
      "The circuit is redundant"
    ],
    correctAnswer: 1,
    explanation: "Series wiring means all NC contacts must be closed for the circuit to be complete. Pressing any single E-stop opens its contact, breaking the circuit and stopping the machine."
  },
  {
    id: 4,
    question: "The reset of an E-stop must:",
    options: [
      "Automatically restart the machine",
      "Only re-enable the safety circuit — a separate start command is needed to restart the machine",
      "Be done by the PLC automatically",
      "Bypass the safety relay"
    ],
    correctAnswer: 1,
    explanation: "Reset must only re-enable the safety circuit, not restart the machine. A separate and deliberate start command must be required. This prevents unexpected restart and complies with IEC 60204-1."
  },
  {
    id: 5,
    question: "Where should E-stops be positioned?",
    options: [
      "Only at the main control panel",
      "At every operator position and at points of access/egress to danger zones",
      "Hidden behind guards",
      "Only in the electrical panel"
    ],
    correctAnswer: 1,
    explanation: "E-stops must be readily accessible at every operator position and at all access/egress points to danger zones. The operator must be able to reach an E-stop without having to move past a hazard."
  },
  {
    id: 6,
    question: "IEC 60204-1 requires E-stop wiring to be:",
    options: [
      "Any colour",
      "Separate from control wiring and clearly identified, with no possibility of being bypassed",
      "Combined with power cables for convenience",
      "Wireless only"
    ],
    correctAnswer: 1,
    explanation: "E-stop wiring must be separate from normal control wiring, clearly identified, and routed to prevent damage. The circuit design must ensure it cannot be inadvertently bypassed or defeated."
  },
  {
    id: 7,
    question: "A dual-channel E-stop circuit provides:",
    options: [
      "Twice the stopping speed",
      "Redundancy — two independent channels monitor the E-stop, detecting single faults",
      "Two separate machines stopping",
      "Double the voltage"
    ],
    correctAnswer: 1,
    explanation: "Dual-channel (redundant) circuits use two independent paths. If one channel fails (e.g., welded contact), the other still functions. A monitoring safety relay detects the discrepancy and prevents restart."
  },
  {
    id: 8,
    question: "Testing an E-stop circuit should be performed:",
    options: [
      "Never — it might break the machine",
      "At regular intervals as specified in the maintenance schedule, verifying both the stop function and the reset/restart sequence",
      "Only during installation",
      "Only when an accident occurs"
    ],
    correctAnswer: 1,
    explanation: "Regular testing verifies the E-stop functions correctly. Test both the stop function (does it stop the machine?) and the restart prevention (does reset alone not restart the machine?). Record test results."
  },
  {
    id: 9,
    question: "A cable-pull (rope-pull) emergency stop is used:",
    options: [
      "Only on conveyor belts",
      "Along extended machinery where an E-stop button cannot be reached quickly",
      "To replace standard E-stop buttons",
      "Only outdoors"
    ],
    correctAnswer: 1,
    explanation: "Cable-pull E-stops are used along conveyor lines, long machines and production lines where operators may be at any point along the length. Pulling the cable at any point activates the E-stop."
  },
  {
    id: 10,
    question: "The safety relay in an E-stop circuit:",
    options: [
      "Is a standard contactor",
      "Monitors the E-stop circuit, provides force-guided contacts, and prevents restart if a fault is detected",
      "Is only needed for Category 2 stops",
      "Replaces the E-stop button"
    ],
    correctAnswer: 1,
    explanation: "Safety relays (e.g., Pilz PNOZ, Allen-Bradley MSR, Siemens 3SK) monitor the E-stop circuit with redundancy and self-checking. Force-guided contacts ensure that a welded contact is detected. They comply with the required performance level."
  },
  {
    id: 11,
    question: "Under the Machinery Directive 2006/42/EC, E-stop provision is:",
    options: [
      "Optional for all machines",
      "Mandatory for all machinery unless the E-stop would not reduce risk",
      "Only required for machines over 10 kW",
      "Only required in the UK"
    ],
    correctAnswer: 1,
    explanation: "The Machinery Directive requires E-stops on all machinery unless they would not reduce risk (e.g., hand-held power tools where release stops the machine). Exemptions are rare and must be justified by risk assessment."
  },
  {
    id: 12,
    question: "Under ST1426, a maintenance technician must be able to:",
    options: [
      "Design new E-stop circuits from scratch",
      "Test, maintain and verify the correct operation of E-stop circuits and document results",
      "Only observe E-stops during operation",
      "Override E-stops for production"
    ],
    correctAnswer: 1,
    explanation: "ST1426 requires technicians to test safety systems, verify correct operation, maintain them in working order, and document all test results and maintenance actions. Overriding safety circuits is never acceptable."
  }
];

const faqs = [
  {
    question: "Can I use a standard relay instead of a safety relay for E-stop circuits?",
    answer: "No. Standard relays do not have force-guided contacts and cannot detect internal faults. Safety relays are specifically designed and certified for safety functions, with redundant monitoring and fault detection. Using a standard relay would not meet the required performance level under ISO 13849."
  },
  {
    question: "How often should E-stops be tested?",
    answer: "Testing frequency depends on the risk assessment and the manufacturer's recommendations. Typical intervals range from weekly (high-risk machines) to monthly or quarterly. Some standards require testing at every shift change. The important thing is to establish a schedule, follow it consistently, and record all test results."
  },
  {
    question: "What do I do if an E-stop button feels stiff or does not latch properly?",
    answer: "Report it immediately and take the machine out of service until the E-stop is repaired or replaced. A malfunctioning E-stop is a critical safety defect. Do not attempt to lubricate or adjust the mechanism — replace the complete unit with a like-for-like part."
  },
  {
    question: "Can E-stop circuits be connected to the PLC?",
    answer: "The E-stop circuit must function independently of the PLC — it must be hardwired through safety-rated devices. However, the E-stop status can be monitored by the PLC (via an additional contact) for display, logging and interlocking purposes. The PLC must not be the sole means of achieving the E-stop function."
  },
  {
    question: "What is the difference between an E-stop and a normal stop?",
    answer: "An E-stop is a safety function that overrides all other commands and brings the machine to the safest possible stop as quickly as possible. A normal stop is an operational command that may complete the current cycle, decelerate smoothly, or maintain holding torque. E-stops must use hardwired safety-rated circuits; normal stops can be PLC-controlled."
  }
];

const MOETModule5Section3_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section3">
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
            <Square className="h-4 w-4" />
            <span>Module 5.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Emergency Stop Circuits
          </h1>
          <p className="text-white/80">
            E-stop requirements, wiring methods and testing procedures for safety-critical installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Colour:</strong> Red mushroom-head on yellow background (BS EN ISO 13850)</li>
              <li className="pl-1"><strong>Contacts:</strong> Normally closed (NC) for fail-safe operation — wire break stops the machine</li>
              <li className="pl-1"><strong>Self-latching:</strong> Stays engaged until manually reset; reset does not restart</li>
              <li className="pl-1"><strong>Stop categories:</strong> Cat 0 (immediate), Cat 1 (controlled), Cat 2 (maintained)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Testing:</strong> Regular verification of stop function and restart prevention</li>
              <li className="pl-1"><strong>Dual-channel:</strong> Redundant monitoring via safety relay with feedback loop</li>
              <li className="pl-1"><strong>Documentation:</strong> Record all test results with date, name and findings</li>
              <li className="pl-1"><strong>ST1426:</strong> Test, maintain and verify safety circuit operation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify E-stop requirements under BS EN ISO 13850 and IEC 60204-1",
              "Explain the purpose of NC contacts and fail-safe wiring principles",
              "Describe Category 0, 1 and 2 stop functions and their applications",
              "Design and verify dual-channel E-stop circuits with safety relays",
              "Perform E-stop testing and document results to ST1426 standards",
              "Apply E-stop principles to maintenance activities on industrial machinery"
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
            E-Stop Standards and Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency stop devices are the last line of defence when all other safety measures have failed. They are not a substitute for proper guarding, interlocking or safe-by-design principles — they are the final resort when something goes wrong unexpectedly. Two key standards define the requirements: BS EN ISO 13850 specifies the design principles and IEC 60204-1 specifies the electrical implementation for machinery.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Requirements (BS EN ISO 13850)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Appearance:</strong> Red mushroom-head actuator on a yellow background — universally recognised</li>
                <li className="pl-1"><strong>Override:</strong> Must override all other functions and operating modes without exception</li>
                <li className="pl-1"><strong>Self-latching:</strong> Must remain engaged until a deliberate manual reset action</li>
                <li className="pl-1"><strong>No restart on reset:</strong> Reset must only re-enable the safety circuit, not restart the machine</li>
                <li className="pl-1"><strong>Accessible:</strong> Positioned at every operator position and at all danger zone access/egress points</li>
                <li className="pl-1"><strong>Hardwired:</strong> Must function independently of the PLC, SCADA or any software-based control</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Stop Categories (IEC 60204-1)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Category 0</td>
                      <td className="border border-white/10 px-3 py-2">Immediate power removal — uncontrolled stop</td>
                      <td className="border border-white/10 px-3 py-2">Most common E-stop type for general machinery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Category 1</td>
                      <td className="border border-white/10 px-3 py-2">Controlled deceleration then power removal</td>
                      <td className="border border-white/10 px-3 py-2">High-inertia machines, robots, servo drives</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Category 2</td>
                      <td className="border border-white/10 px-3 py-2">Controlled stop with power maintained</td>
                      <td className="border border-white/10 px-3 py-2">Vertical axes, hoists (prevent dropping loads)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> The risk assessment determines which stop category is required. Most E-stops are Category 0, but always check the machine documentation. A Category 1 stop requires a controlled drive to manage deceleration before power removal, adding complexity to the circuit.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fail-Safe Wiring Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              E-stop circuits must be designed so that any single fault leads to a safe state — the machine stops. This fundamental principle is achieved by using normally closed (NC) contacts, series wiring, and monitoring by safety-rated devices. A properly designed E-stop circuit fails safe under every foreseeable fault condition.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Core Wiring Principles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>NC contacts:</strong> The E-stop contact is closed during normal operation and opens when pressed. A broken wire, loose terminal or contact failure also opens the circuit — fail-safe</li>
                <li className="pl-1"><strong>Series chain:</strong> Multiple E-stops are wired in series on each channel. Any single button press opens the circuit and stops the machine</li>
                <li className="pl-1"><strong>Dual-channel redundancy:</strong> Two independent wiring paths from each E-stop to the safety relay. A fault in one channel is detected</li>
                <li className="pl-1"><strong>Cross-monitoring:</strong> The safety relay checks that both channels switch within a defined time window (typically 0.5 to 4 seconds)</li>
                <li className="pl-1"><strong>Force-guided contacts:</strong> Mechanically linked NO and NC contacts in the safety relay ensure a welded contact is always detected</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wire Break Detection</p>
              <p className="text-sm text-white mb-3">
                The use of NC contacts provides inherent wire break detection. Consider the failure modes:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wire break:</strong> Circuit opens — machine stops (safe)</li>
                <li className="pl-1"><strong>Contact failure (spring broken):</strong> Contact opens — machine stops (safe)</li>
                <li className="pl-1"><strong>Terminal loose:</strong> Connection lost — circuit opens — machine stops (safe)</li>
                <li className="pl-1"><strong>Contact weld:</strong> Detected by the dual-channel safety relay at next demand — prevents restart</li>
                <li className="pl-1"><strong>Short circuit between channels:</strong> Detected by cross-fault monitoring — relay locks out</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Never Bypass an E-Stop</p>
              <p className="text-sm text-white">
                Bridging, bypassing or defeating an E-stop circuit is a criminal offence under the Health and Safety at Work Act 1974, the Provision and Use of Work Equipment Regulations (PUWER) 1998, and the Electricity at Work Regulations 1989. If an E-stop is causing nuisance trips, investigate and fix the root cause — do not bypass it. Report any bypassed safety circuits immediately to the responsible person.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Safety Relays and Dual-Channel Circuits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safety relays are the monitoring devices at the heart of E-stop circuits. They provide redundant switching, cross-fault detection and restart prevention — functions that standard control relays cannot achieve. A standard relay has no mechanism to detect its own contact failure; a safety relay does.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Relay Functions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Dual-channel input monitoring:</strong> Both channels must open within a detection window for a valid stop signal</li>
                <li className="pl-1"><strong>Cross-fault detection:</strong> Detects short circuits between the two input channels that could mask faults</li>
                <li className="pl-1"><strong>Force-guided contacts:</strong> NO safety outputs and NC monitoring contacts are mechanically linked</li>
                <li className="pl-1"><strong>Monitored manual reset:</strong> Requires a deliberate rising-edge reset signal — detects stuck buttons</li>
                <li className="pl-1"><strong>Feedback monitoring (EDM):</strong> Checks that external contactors have opened before allowing reset</li>
                <li className="pl-1"><strong>LED diagnostics:</strong> Indicate channel status, output state and fault conditions</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Safety Relay Manufacturers</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Pilz:</strong> PNOZ series — widely used in UK manufacturing</li>
                  <li className="pl-1"><strong>Allen-Bradley:</strong> MSR series (Guardmaster)</li>
                  <li className="pl-1"><strong>Siemens:</strong> 3SK1 series (SIRIUS)</li>
                  <li className="pl-1"><strong>Schneider:</strong> Preventa XPSA series</li>
                  <li className="pl-1"><strong>SICK:</strong> UE400 series</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Circuit Operation</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">E-stop released: Both channels closed</li>
                  <li className="pl-1">Safety relay energised: Safety outputs closed</li>
                  <li className="pl-1">Contactors energised: Machine can run</li>
                  <li className="pl-1">E-stop pressed: Channels open</li>
                  <li className="pl-1">Safety relay de-energises: Outputs open</li>
                  <li className="pl-1">Contactors drop out: Machine stops</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The feedback (EDM) loop is critical. Without it, a welded contactor would not be detected, and the machine could restart even though the main contactor has failed to open. Always verify that the feedback loop is correctly wired during commissioning and maintenance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Testing and Maintenance Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regular testing of E-stop circuits is a legal requirement under PUWER 1998 Regulation 5 (maintenance) and Regulation 11 (dangerous parts of machinery). It is also a core maintenance competency under the ST1426 apprenticeship standard. Testing must verify both the stop function and the restart prevention sequence.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">E-Stop Test Procedure</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Verify the machine is in a safe test condition with no personnel in the danger zone</li>
                <li className="pl-1"><strong>Step 2:</strong> Start the machine and confirm normal operation</li>
                <li className="pl-1"><strong>Step 3:</strong> Press the E-stop — confirm the machine stops immediately (or within the Category 1 deceleration time)</li>
                <li className="pl-1"><strong>Step 4:</strong> Attempt to restart without resetting the E-stop — confirm restart is prevented</li>
                <li className="pl-1"><strong>Step 5:</strong> Reset the E-stop button — confirm the circuit is re-enabled but the machine does not restart</li>
                <li className="pl-1"><strong>Step 6:</strong> Press the start button — confirm normal restart occurs</li>
                <li className="pl-1"><strong>Step 7:</strong> Repeat for every E-stop on the machine, testing each individually</li>
                <li className="pl-1"><strong>Step 8:</strong> Record results including date, tester name, machine ID, and any faults found</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable-Pull (Rope-Pull) E-Stops</p>
              <p className="text-sm text-white mb-3">
                Cable-pull emergency stops are used along extended machinery such as conveyor lines, production lines and long processing machines. They provide continuous E-stop access along the entire length of the machine.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">A tensioned wire rope runs along the machine, supported by guide pulleys</li>
                <li className="pl-1">Pulling or deflecting the rope at any point activates the switch unit</li>
                <li className="pl-1">The switch detects both pull and slack (broken rope) — fail-safe design</li>
                <li className="pl-1">Testing must verify operation from multiple points along the rope</li>
                <li className="pl-1">Rope tension and guide pulleys require periodic inspection and adjustment</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426:</strong> Testing and documenting safety circuit function is a core maintenance competency. Always use the correct test procedure, work to a permit-to-work where required, and record your findings in the maintenance management system. Never sign off a test that you have not personally witnessed.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Legal Framework and Key Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              E-stop requirements sit within a comprehensive legal and standards framework. As a maintenance technician, you do not need to design E-stop systems from scratch, but you must understand the standards that govern their installation, testing and maintenance so that you can verify compliance and identify deficiencies.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standards and Regulations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Standard / Regulation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Scope</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">BS EN ISO 13850</td><td className="border border-white/10 px-3 py-2">E-stop design principles — appearance, function, reset</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">IEC 60204-1 / BS EN 60204-1</td><td className="border border-white/10 px-3 py-2">Electrical safety of machinery — stop categories, wiring</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">ISO 13849-1</td><td className="border border-white/10 px-3 py-2">Safety-related control systems — Performance Levels</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Machinery Directive 2006/42/EC</td><td className="border border-white/10 px-3 py-2">Essential requirements — E-stop mandatory (with exceptions)</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">PUWER 1998</td><td className="border border-white/10 px-3 py-2">Maintenance, inspection and testing requirements</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">HASAWA 1974</td><td className="border border-white/10 px-3 py-2">General duty of care — bypassing safety is an offence</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">E-Stop and PLC Integration</p>
              <p className="text-sm text-white mb-3">
                A common question is whether E-stop circuits can be connected to the PLC. The answer is nuanced:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Primary circuit:</strong> Must be hardwired through safety-rated devices (safety relay or safety PLC). The standard PLC must not be the sole means of achieving the E-stop function</li>
                <li className="pl-1"><strong>Monitoring:</strong> The E-stop status can be fed to the standard PLC via additional auxiliary contacts for HMI display, alarm logging and interlocking</li>
                <li className="pl-1"><strong>Safety PLC:</strong> A certified safety PLC (e.g., Siemens F-CPU, Allen-Bradley GuardLogix) can replace hardwired safety relays for complex applications, but it must meet ISO 13849 / IEC 62061 requirements</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians are expected to understand the legal and regulatory framework for machine safety, test and maintain safety systems, and document all findings. You must be able to recognise non-compliant installations and report them through the correct channels.
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
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section3-2">
              Next: Guarding and Interlocking Devices
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section3_1;
