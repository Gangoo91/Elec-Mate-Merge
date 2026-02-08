import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safety Relays and Controllers - MOET Module 5 Section 3.3";
const DESCRIPTION = "Safety relay modules, configurable safety controllers, dual-channel monitoring, forced-guided contacts and diagnostic capabilities for machine safety circuits. ISO 13849, IEC 62061 compliance. ST1426 aligned.";

const quickCheckQuestions = [
  {
    id: "forced-guided",
    question: "What is the primary advantage of a safety relay module over a standard relay?",
    options: [
      "Lower cost",
      "Forced-guided contacts providing fault detection",
      "Faster switching speed",
      "Smaller physical size"
    ],
    correctIndex: 1,
    explanation: "Safety relays use forced-guided (positively-driven) contacts that mechanically ensure NO and NC contacts cannot both be closed simultaneously, enabling reliable fault detection. If an NO contact welds, the NC monitoring contact physically cannot close."
  },
  {
    id: "dual-channel",
    question: "What does dual-channel monitoring mean in a safety circuit?",
    options: [
      "Two operators monitor the machine",
      "Two independent signal paths monitor the same safety function",
      "The relay switches twice as fast",
      "Two machines share one safety circuit"
    ],
    correctIndex: 1,
    explanation: "Dual-channel monitoring uses two independent signal paths so that a single fault in one channel does not prevent the safety function from operating. The safety relay checks that both channels agree."
  },
  {
    id: "cross-fault",
    question: "What is cross-fault detection in a dual-channel safety relay?",
    options: [
      "Detecting faults between the two channels",
      "Detecting a short circuit between the two input channels that could mask a fault",
      "Detecting faults in the power supply",
      "Detecting cross-wiring errors during installation"
    ],
    correctIndex: 1,
    explanation: "Cross-fault detection identifies short circuits between the two channels that could prevent detection of an open-circuit fault in one channel. Without cross-fault detection, a short between channels would defeat the redundancy."
  },
  {
    id: "edm-purpose",
    question: "What is the purpose of the EDM (External Device Monitoring) feedback loop?",
    options: [
      "Monitoring the ambient temperature",
      "Confirming that external contactors have opened before allowing a reset",
      "Providing power to the safety relay",
      "Measuring the machine stopping time"
    ],
    correctIndex: 1,
    explanation: "The EDM feedback loop monitors the state of external switching devices (contactors). If a contactor welds closed, its feedback contact remains open, and the safety relay detects the fault and prevents a restart. This is essential for detecting welded contactor failures."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What standard specifies requirements for safety relay modules used in safety-related control systems?",
    options: [
      "BS 7671",
      "IEC 62061 and ISO 13849-1",
      "IEC 61131-3",
      "BS EN 60204-2"
    ],
    correctAnswer: 1,
    explanation: "Safety relay modules must meet the requirements of IEC 62061 (Safety Integrity Level) or ISO 13849-1 (Performance Level) for safety-related control systems of machinery."
  },
  {
    id: 2,
    question: "What are forced-guided contacts?",
    options: [
      "Contacts held closed by springs",
      "Contacts where NO and NC are mechanically linked so they cannot both be in the same state simultaneously",
      "Contacts operated by compressed air",
      "High-current contacts for motor starting"
    ],
    correctAnswer: 1,
    explanation: "Forced-guided contacts are mechanically linked so that if an NO contact welds closed, the NC contacts are physically prevented from closing, enabling fault detection. This principle is defined in IEC 61810-3."
  },
  {
    id: 3,
    question: "In a Category 3 architecture (ISO 13849-1), what happens if a single fault occurs?",
    options: [
      "The system shuts down immediately",
      "The safety function is still performed despite the fault",
      "The machine operates at reduced speed",
      "An alarm sounds but operation continues"
    ],
    correctAnswer: 1,
    explanation: "Category 3 requires that a single fault does not lead to loss of the safety function. The fault is detected at or before the next demand on the safety function. This is achieved through dual-channel redundancy."
  },
  {
    id: 4,
    question: "What is the feedback loop on a safety relay used for?",
    options: [
      "Providing power to the monitored device",
      "Confirming that external contactors have opened before allowing a reset",
      "Sending data to the PLC",
      "Monitoring the power supply voltage"
    ],
    correctAnswer: 1,
    explanation: "The feedback loop monitors the state of external contactors. If a contactor welds closed, the feedback loop detects this and prevents the safety relay from resetting, ensuring the fault is addressed before the machine can restart."
  },
  {
    id: 5,
    question: "What is the difference between automatic and monitored manual reset?",
    options: [
      "Automatic is faster",
      "Monitored manual reset requires a deliberate operator action and detects stuck reset buttons",
      "There is no difference for safety purposes",
      "Manual reset is only used for emergency stops"
    ],
    correctAnswer: 1,
    explanation: "Monitored manual reset requires the operator to release and then press the reset button. The relay monitors for a stuck button (permanent signal), preventing automatic restart. Automatic reset re-enables as soon as inputs are satisfied."
  },
  {
    id: 6,
    question: "What advantage does a configurable safety controller have over individual safety relay modules?",
    options: [
      "Lower SIL rating",
      "Can handle multiple safety functions in one device with logic configuration",
      "Does not require wiring",
      "Uses standard (non-safety) components"
    ],
    correctAnswer: 1,
    explanation: "Configurable safety controllers can monitor multiple safety devices and implement logic (AND, OR, muting, two-hand control) in a single device, reducing wiring complexity and panel space."
  },
  {
    id: 7,
    question: "What does the term 'safe state' mean for a machine safety system?",
    options: [
      "The machine is running at normal speed",
      "The state in which the machine presents no hazard to personnel",
      "The machine is switched off at the mains",
      "All guards are closed"
    ],
    correctAnswer: 1,
    explanation: "The safe state is the condition where the machine does not present a hazard. This may be stopped, or in some cases running at a safely reduced speed. The safe state is defined during the risk assessment."
  },
  {
    id: 8,
    question: "What is the purpose of pulse testing in safety input circuits?",
    options: [
      "Testing the machine cycle time",
      "Detecting short circuits and cross-faults in the input wiring by sending test pulses",
      "Measuring the response time of the operator",
      "Calibrating sensor sensitivity"
    ],
    correctAnswer: 1,
    explanation: "Pulse testing sends brief test pulses on the input channels to detect wiring faults such as short circuits between channels or to earth. The pulses are too brief to affect the safety function but long enough for the relay to detect faults."
  },
  {
    id: 9,
    question: "Why must safety relay wiring use separate cable runs from power wiring?",
    options: [
      "To reduce cable costs",
      "To prevent electromagnetic interference causing false safe signals",
      "For aesthetic reasons",
      "It is not actually required"
    ],
    correctAnswer: 1,
    explanation: "Separating safety wiring from power circuits prevents electromagnetic interference from inducing signals that could mask faults or cause false operation of safety devices."
  },
  {
    id: 10,
    question: "What does EDM stand for in the context of safety relays?",
    options: [
      "Electronic Device Management",
      "External Device Monitoring",
      "Emergency Disconnect Module",
      "Enhanced Diagnostic Mode"
    ],
    correctAnswer: 1,
    explanation: "EDM (External Device Monitoring) is the feedback circuit that monitors the state of external switching devices (contactors) to detect welded contacts and prevent restart after a fault."
  },
  {
    id: 11,
    question: "Which of these is an example of a configurable safety controller?",
    options: [
      "A standard PLC with safety firmware",
      "A Pilz PNOZmulti or Sick Flexi Classic programmed with graphical safety logic",
      "A bank of standard relays with timer modules",
      "A motor protection relay"
    ],
    correctAnswer: 1,
    explanation: "Products such as the Pilz PNOZmulti, Sick Flexi Classic/Soft and Siemens MSS 3RK3 are configurable safety controllers that allow multiple safety functions to be implemented with graphical logic software."
  },
  {
    id: 12,
    question: "A safety relay has locked out and the LED indicates a channel discrepancy fault. What is the most likely cause?",
    options: [
      "The power supply voltage is too high",
      "The two input channels did not change state within the defined time window, indicating a wiring fault or stuck contact",
      "The machine is running too fast",
      "The reset button is faulty"
    ],
    correctAnswer: 1,
    explanation: "A channel discrepancy means the two channels did not change state within the detection window. This could be caused by a broken wire, stuck contact or wiring fault on one channel. Investigate both channels and check all connections before resetting."
  }
];

const faqs = [
  {
    question: "When should I use a safety relay versus a safety PLC?",
    answer: "Safety relays are ideal for simple applications with one or a few safety functions (e.g., single E-stop, one guard interlock). Safety PLCs or configurable controllers are better for complex applications with multiple safety devices, logic requirements (muting, zone control), or where frequent changes to the safety configuration are expected."
  },
  {
    question: "Can I series-connect multiple E-stop buttons to one safety relay?",
    answer: "Yes, multiple E-stop buttons can be connected in series on each channel of a dual-channel safety relay. However, this means any E-stop activation stops the entire machine. For zone-specific control, separate safety relays or a safety controller with individual monitoring may be required."
  },
  {
    question: "How do I verify the safety relay is working correctly?",
    answer: "Perform regular proof tests as defined in the safety validation plan. This includes activating each safety device and confirming the machine stops, checking the feedback loop by simulating a welded contactor, verifying LED diagnostic indicators, and documenting test results with dates and findings."
  },
  {
    question: "What is the typical response time of a safety relay?",
    answer: "Most safety relay modules have response times between 10 ms and 30 ms from input signal change to output contact opening. This must be included in the overall stopping time calculation when determining safety distances per BS EN ISO 13855."
  },
  {
    question: "Can a standard PLC be used to control safety functions?",
    answer: "No. A standard PLC does not have the redundancy, diagnostics, or certified reliability required for safety functions. Only certified safety PLCs (e.g., Siemens F-CPU, Allen-Bradley GuardLogix) or dedicated safety devices can be used. The standard PLC can monitor safety status for display and logging purposes only."
  }
];

const MOETModule5Section3_3 = () => {
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
            <Shield className="h-4 w-4" />
            <span>Module 5.3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safety Relays and Controllers
          </h1>
          <p className="text-white/80">
            Forced-guided contacts, dual-channel monitoring, feedback loops and configurable safety controllers
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Forced-guided contacts:</strong> Mechanically linked NO/NC ensure fault detection</li>
              <li className="pl-1"><strong>Dual-channel:</strong> Two independent paths — single fault does not defeat safety</li>
              <li className="pl-1"><strong>EDM feedback:</strong> Confirms contactor state before allowing reset</li>
              <li className="pl-1"><strong>Response time:</strong> Typically 10-30 ms for safety relay modules</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Diagnostics:</strong> LED indicators show channel status and fault codes</li>
              <li className="pl-1"><strong>Proof testing:</strong> Verify stop function, feedback loop and reset sequence</li>
              <li className="pl-1"><strong>Replacement:</strong> Match manufacturer, model and wiring configuration exactly</li>
              <li className="pl-1"><strong>ST1426:</strong> Test, maintain and document safety relay systems</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the operating principles of safety relay modules with forced-guided contacts",
              "Describe dual-channel monitoring architecture and its fault tolerance",
              "Identify the purpose and operation of the feedback (EDM) loop",
              "Differentiate between automatic reset, manual reset and monitored manual reset",
              "Compare safety relay modules with configurable safety controllers",
              "Apply diagnostic testing procedures to verify safety relay operation"
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
            Safety Relay Module Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A safety relay module is a purpose-built device that monitors safety inputs (E-stops, guard interlocks, light curtains) and controls safety outputs (contactors, valves) in accordance with the required safety integrity. Unlike standard control relays, safety relays incorporate forced-guided contacts that are mechanically linked to ensure reliable fault detection.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Forced-Guided Contacts (IEC 61810-3)</p>
              <p className="text-sm text-white mb-3">
                The fundamental difference between a safety relay and a standard relay lies in the contact mechanism:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Mechanical linkage:</strong> NO (safety output) and NC (monitoring) contacts are mechanically linked — they cannot both be closed simultaneously</li>
                <li className="pl-1"><strong>Weld detection:</strong> If an NO contact welds closed, the corresponding NC contact is physically prevented from closing. The safety relay detects this discrepancy and locks out</li>
                <li className="pl-1"><strong>Certified reliability:</strong> Force-guided contacts are manufactured and tested to IEC 61810-3, with documented failure mode data for PL/SIL calculations</li>
                <li className="pl-1"><strong>No self-repair:</strong> Once a fault is detected, the relay locks out and requires investigation — it does not automatically recover</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Safety Relay Manufacturers</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pilz:</strong> PNOZ series — widely used in UK manufacturing, comprehensive range for all safety functions</li>
                <li className="pl-1"><strong>SICK:</strong> UE400 series — compact modules with integrated diagnostics</li>
                <li className="pl-1"><strong>Allen-Bradley:</strong> Guardmaster MSR series — common in automotive and process industries</li>
                <li className="pl-1"><strong>Siemens:</strong> SIRIUS 3SK series — integrates with Siemens control ecosystems</li>
                <li className="pl-1"><strong>Schneider:</strong> Preventa XPSA series — used in packaging and general manufacturing</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> Safety relays are DIN-rail mounted, typically 22.5-45 mm wide, with LED diagnostics on the front face. Always check the LED status during routine inspections — a flashing or amber LED typically indicates a fault condition requiring investigation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Dual-Channel Architecture
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safety relays use dual-channel (redundant) monitoring where two independent signal paths monitor the same safety device. Each channel has its own input circuit, and both must agree for the safety relay to permit machine operation. If one channel detects a fault, the safety outputs are de-energised regardless of the other channel's state.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">How Dual-Channel Works</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Two paths:</strong> Each safety device (E-stop, guard switch) has two sets of contacts, one feeding each channel of the safety relay</li>
                <li className="pl-1"><strong>Fault tolerance:</strong> If Channel 1 develops an open circuit, Channel 2 still detects the safety demand and triggers the stop</li>
                <li className="pl-1"><strong>Discrepancy monitoring:</strong> The relay monitors the time difference between channel state changes — if they do not change within a window (typically 0.5-4 seconds), a discrepancy fault is declared</li>
                <li className="pl-1"><strong>Cross-fault detection:</strong> The relay checks for short circuits between the two channels using test pulses. A cross-fault would defeat redundancy by making both channels appear identical</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Equivalent Mode</h3>
                <p className="text-sm text-white">
                  Both channels must change state within a defined time window. Used with dual-channel safety devices (E-stops with two NC contacts, dual-contact guard switches). The most common mode for E-stop and guard interlock monitoring.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Non-Equivalent Mode</h3>
                <p className="text-sm text-white">
                  The channels alternate states — used with single-channel devices where the relay provides the second channel internally by alternating the test voltage. Less common, used for specific device types.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Wiring Rule</p>
              <p className="text-sm text-white">
                The two channels must be wired separately — never route both channels in the same cable. If the cable is damaged (crushed, cut, exposed to heat), a common-mode fault could affect both channels simultaneously, defeating the redundancy. Route Channel 1 and Channel 2 in separate cables, ideally on different cable routes.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Feedback Loop (EDM) and Reset Modes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The External Device Monitoring (EDM) feedback loop is a critical feature of safety relay circuits. It monitors the actual state of the external switching devices (typically contactors) controlled by the safety relay outputs. Without EDM, a welded contactor would not be detected, and the machine could restart even though the safety output has opened.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EDM Operation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wiring:</strong> A normally closed auxiliary contact from each contactor is wired back to the safety relay's feedback input</li>
                <li className="pl-1"><strong>Normal operation:</strong> When contactors are energised (running), the NC feedback contacts are open. When the safety relay de-energises, the contactors drop out and the feedback contacts close, confirming the stop</li>
                <li className="pl-1"><strong>Fault detection:</strong> If a contactor welds closed, its feedback contact remains open. The safety relay detects this and prevents a restart — the fault must be investigated and repaired</li>
                <li className="pl-1"><strong>Multiple contactors:</strong> Feedback contacts from multiple contactors can be series-connected into the EDM input</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reset Modes</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Automatic reset:</strong> The safety outputs re-enable as soon as the safety inputs are satisfied. Used for devices with frequent cycling (light curtains, safety mats) where manual reset would impede production</li>
                <li className="pl-1"><strong>Manual reset:</strong> The operator must press a reset button after the safety condition is restored. Used for E-stops and guard interlocks where deliberate acknowledgement is required</li>
                <li className="pl-1"><strong>Monitored manual reset:</strong> Requires a rising edge on the reset input — the relay checks that the button is not permanently pressed (taped down or stuck). ISO 13849-1 specifies which mode is appropriate based on the risk assessment</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Always verify the reset mode setting during commissioning. A safety relay configured for automatic reset on an E-stop circuit would be a serious non-compliance — E-stops must always use manual or monitored manual reset.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Configurable Safety Controllers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For applications requiring multiple safety functions, configurable safety controllers offer a compact alternative to banks of individual safety relay modules. These devices combine the monitoring capability of multiple safety relays into a single unit with graphical logic programming.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Products</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pilz PNOZmulti:</strong> The industry standard configurable controller — drag-and-drop function blocks in PNOZmulti Configurator software</li>
                <li className="pl-1"><strong>SICK Flexi Classic/Soft:</strong> Modular system with graphical configuration via Flexi Soft Designer</li>
                <li className="pl-1"><strong>Siemens MSS 3RK3:</strong> Modular safety system integrated with the SIRIUS range</li>
                <li className="pl-1"><strong>Allen-Bradley SmartGuard 600:</strong> Compact controller with DeviceNet/EtherNet IP integration</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Configuration Process</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Function blocks:</strong> Drag-and-drop blocks for E-stop, guard monitoring, two-hand control, muting, enabling switches</li>
                <li className="pl-1"><strong>Logic connections:</strong> AND, OR, timer and counter blocks link safety inputs to outputs</li>
                <li className="pl-1"><strong>Verification:</strong> The software compiles and verifies the configuration, generating a CRC checksum to prevent unauthorised modification</li>
                <li className="pl-1"><strong>Download:</strong> The verified configuration is downloaded to the controller and locked</li>
                <li className="pl-1"><strong>Modification control:</strong> Any change requires re-verification, re-validation and documentation — maintaining safety integrity</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages over Individual Relays</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Reduced panel space — one controller replaces multiple relays</li>
                <li className="pl-1">Less wiring — safety devices connect directly to the controller I/O</li>
                <li className="pl-1">Enhanced diagnostics — network connections for diagnostic data to PLC/SCADA</li>
                <li className="pl-1">Expandable — additional I/O modules can be added as needed</li>
                <li className="pl-1">Achieves up to PL e / SIL 3 for safety functions</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Diagnostic Testing and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safety relays require regular proof testing to verify that all safety functions operate correctly. This is a legal requirement under PUWER 1998 and a core competency under ST1426. The proof test interval is determined during the safety system design and documented in the maintenance schedule.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Proof Test Procedure</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Check the safety relay LED diagnostics — record the current status</li>
                <li className="pl-1"><strong>Step 2:</strong> Activate each safety device individually (press each E-stop, open each guard) and confirm the machine stops</li>
                <li className="pl-1"><strong>Step 3:</strong> Verify restart prevention — confirm the machine does not restart when the safety device is reset without pressing start</li>
                <li className="pl-1"><strong>Step 4:</strong> Test the feedback loop — simulate a welded contactor (if safe to do so) and confirm the relay locks out</li>
                <li className="pl-1"><strong>Step 5:</strong> Verify the reset function — confirm monitored manual reset requires a rising edge</li>
                <li className="pl-1"><strong>Step 6:</strong> Document all results including date, tester, machine ID, safety relay serial number and any faults found</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Fault Indications</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Channel discrepancy: Wiring fault or stuck contact</li>
                  <li className="pl-1">EDM fault: Welded contactor or feedback wiring</li>
                  <li className="pl-1">Cross-fault: Short between input channels</li>
                  <li className="pl-1">No output: Check power supply and input conditions</li>
                  <li className="pl-1">Intermittent: Loose terminals or damaged cable</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Replacement Considerations</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Must be like-for-like (same model, same PL/SIL)</li>
                  <li className="pl-1">Verify wiring against the circuit diagram</li>
                  <li className="pl-1">Check DIP switch settings match the original</li>
                  <li className="pl-1">Re-test all functions after replacement</li>
                  <li className="pl-1">Update maintenance records with new serial number</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must be able to test safety relay systems, interpret diagnostic indicators, carry out like-for-like replacements, and document all maintenance actions. Never substitute a safety relay with a standard relay or a different model without engineering review and re-validation.
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
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Guarding and Interlocking
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section3-4">
              Next: Category and Performance Levels
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section3_3;
