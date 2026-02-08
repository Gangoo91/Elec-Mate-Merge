import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Control System Troubleshooting - MOET Module 7 Section 2.4";
const DESCRIPTION = "PLC and control system fault diagnosis and resolution practice for EPA assessment: reading ladder logic, I/O checking, relay logic, motor starters and demonstrating systematic troubleshooting under ST1426.";

const quickCheckQuestions = [
  {
    id: "plc-io-check",
    question: "What is the first step when troubleshooting a PLC-controlled system that is not operating correctly?",
    options: [
      "Reprogram the PLC immediately",
      "Check the physical inputs and outputs — are the sensors detecting, are the actuators receiving signals?",
      "Replace the PLC",
      "Turn the system off and on again"
    ],
    correctIndex: 1,
    explanation: "Most PLC system faults are in the field wiring, sensors, or actuators — not in the PLC program itself. Checking physical I/O first (using LED indicators, measuring voltages at terminals, and observing sensor operation) eliminates the most common fault causes before considering the program."
  },
  {
    id: "ladder-logic-reading",
    question: "Why is the ability to read ladder logic diagrams important for a maintenance technician?",
    options: [
      "It is not important — only programmers need to understand ladder logic",
      "It allows you to understand the intended sequence of operation and identify where the control logic is not progressing, narrowing the fault location",
      "It helps you redesign the control system",
      "Ladder logic is obsolete and no longer used"
    ],
    correctIndex: 1,
    explanation: "Reading ladder logic allows you to trace the control sequence and identify where the programme is stuck. If a rung is not energising, you can check the corresponding physical input or internal condition. This significantly speeds up fault diagnosis and is a key skill assessed in the EPA for control system tasks."
  },
  {
    id: "relay-logic-fault",
    question: "In a relay-based control circuit, how do you determine if a relay coil has failed?",
    options: [
      "Replace it and see if the system works",
      "Measure the coil resistance with a multimeter — compare to the manufacturer's specification; an open circuit or significantly wrong reading indicates failure",
      "Listen for a clicking sound",
      "Visual inspection only"
    ],
    correctIndex: 1,
    explanation: "Measuring coil resistance is a definitive test. An open-circuit reading (OL) confirms a burnt-out coil. A reading significantly different from the manufacturer's specification suggests degradation. You should also check the coil supply voltage is present — a healthy coil with no supply voltage is not a coil fault but a supply fault."
  },
  {
    id: "forced-output-safety",
    question: "When using the PLC force function to test an output, what critical safety precaution must you observe?",
    options: [
      "No safety precautions are needed — forcing is a software function",
      "Ensure the area around the actuator is clear, the forced output will not create a hazardous movement, and all forces are removed after testing to prevent unexpected operation when normal control resumes",
      "Only force outputs during a power cut",
      "Only the PLC programmer should use the force function"
    ],
    correctIndex: 1,
    explanation: "Forcing a PLC output bypasses the normal control logic and directly activates the physical output device. This means safety interlocks in the programme are bypassed. You must ensure: the actuator area is clear of personnel, the forced movement will not cause damage or injury, and all forces are removed after testing. Leaving a force in place is extremely dangerous — it can cause unexpected operation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A PLC input LED is illuminated but the program does not recognise the input. The most likely cause is:",
    options: [
      "The sensor is faulty",
      "The input module or the connection between the input terminal and the PLC processor has a fault",
      "The output device is faulty",
      "The power supply is too low"
    ],
    correctAnswer: 1,
    explanation: "If the input LED illuminates, the physical signal is reaching the input terminal. If the program does not recognise it, the fault lies between the input terminal and the processor — possibly a faulty input module, a loose backplane connection, or an addressing error."
  },
  {
    id: 2,
    question: "When reading a ladder logic diagram, a normally open (NO) contact in series means:",
    options: [
      "The contact is always closed",
      "The rung will only be true (energised) when that input is active (ON)",
      "The contact has no function",
      "The rung is always energised"
    ],
    correctAnswer: 1,
    explanation: "A normally open contact in a ladder rung means that input condition must be TRUE (active/ON) for the rung to energise. If multiple NO contacts are in series, ALL must be true. Understanding this basic logic allows you to trace the sequence and identify which condition is preventing operation."
  },
  {
    id: 3,
    question: "A motor starter contactor chatters (rapidly opens and closes). The most likely cause is:",
    options: [
      "The motor is overloaded",
      "The coil supply voltage is too low, or there is an intermittent connection in the control circuit",
      "The motor has an earth fault",
      "The contactor is the wrong type"
    ],
    correctAnswer: 1,
    explanation: "Contactor chatter occurs when the coil receives insufficient voltage to hold the armature firmly. Common causes include: low control supply voltage, high-resistance connections in the control circuit, a faulty auxiliary contact in the hold-on circuit, or a failing coil."
  },
  {
    id: 4,
    question: "A star-delta motor starter fails to change from star to delta. The most likely area to investigate is:",
    options: [
      "The motor windings",
      "The changeover timer, the delta contactor, and the changeover auxiliary contacts",
      "The incoming power supply",
      "The motor bearings"
    ],
    correctAnswer: 1,
    explanation: "The star-to-delta changeover is controlled by a timer and interlocked contactors. If the changeover fails, check: the timer is operating and set correctly, the delta contactor coil is receiving a signal, the changeover auxiliary contacts are functioning, and the interlocking is correct."
  },
  {
    id: 5,
    question: "When checking PLC outputs, a forced output test is used to:",
    options: [
      "Permanently change the program",
      "Temporarily activate an output to verify the output module and field wiring are functioning, bypassing the program logic",
      "Test the input sensors",
      "Reset the PLC to factory defaults"
    ],
    correctAnswer: 1,
    explanation: "Forcing an output temporarily activates it regardless of the program logic. This tests the output module, wiring, and actuator independently of the control program. If the forced output works but the programme does not activate it, the fault is in the programme logic or input conditions. Always remove forces after testing."
  },
  {
    id: 6,
    question: "A safety interlock on a machine guard prevents the machine from operating when the guard is open. If the machine will not start with the guard closed, you should first:",
    options: [
      "Bypass the interlock to test",
      "Check that the interlock switch is making contact when the guard is closed — verify with a multimeter at the switch terminals",
      "Replace the machine guard",
      "Check the motor windings"
    ],
    correctAnswer: 1,
    explanation: "The interlock switch is the most likely fault point. Check physical operation (does the switch actuate when the guard closes?), measure continuity/voltage at the switch terminals, and verify the wiring to the control system. Never bypass safety interlocks — this is a serious safety violation and would be an automatic fail in the EPA."
  },
  {
    id: 7,
    question: "In a control panel, DIN rail-mounted terminal blocks serve which primary maintenance purpose?",
    options: [
      "Reducing the cost of the panel",
      "Providing accessible, organised connection points between field wiring and control devices, simplifying fault diagnosis",
      "Making the panel look more professional",
      "They have no specific maintenance purpose"
    ],
    correctAnswer: 1,
    explanation: "Terminal blocks provide organised, accessible connection points that simplify maintenance. Field wiring terminates at the terminal blocks, and internal panel wiring connects the other side to the control devices. This means you can disconnect and test field wiring without disturbing the control device connections."
  },
  {
    id: 8,
    question: "Checking for 'expected voltages' at test points during troubleshooting allows you to:",
    options: [
      "Practise using the multimeter",
      "Systematically verify that the correct signals are present at each stage of the circuit, identifying where the signal path is broken",
      "Record values for the maintenance log only",
      "Determine the electricity tariff"
    ],
    correctAnswer: 1,
    explanation: "Checking expected voltages at test points traces the signal path through the circuit. Where the expected voltage disappears, you have found the fault area. For example, if 24 V DC is present at a relay coil input terminal but not at the coil itself, the fault is in the connection between the terminal and the coil."
  },
  {
    id: 9,
    question: "A proximity sensor on a conveyor system is not detecting product. Your systematic approach would be:",
    options: [
      "Replace the sensor immediately",
      "Check the sensor LED indicator, verify supply voltage, check the sensing gap, clean the sensor face, test the output signal, then check wiring to the PLC",
      "Replace the PLC input module",
      "Adjust the conveyor speed"
    ],
    correctAnswer: 1,
    explanation: "A systematic approach works from the sensor outward: check the indicator LED, verify supply voltage is correct, check the sensing distance and alignment, clean the face, measure the output signal, and trace wiring to the PLC input. This eliminates causes in order of likelihood and accessibility."
  },
  {
    id: 10,
    question: "During the EPA, demonstrating control system troubleshooting competence means:",
    options: [
      "Showing you can reprogram PLCs",
      "Using a systematic approach, reading drawings and logic diagrams, safely testing signals, clearly explaining your reasoning, and documenting findings",
      "Working as fast as possible",
      "Knowing every PLC brand and model"
    ],
    correctAnswer: 1,
    explanation: "The EPA assesses your systematic approach, not your knowledge of specific PLC brands. Demonstrate: ability to read circuit diagrams and ladder logic, systematic signal tracing, safe testing practices, clear communication of your diagnostic reasoning, and proper documentation."
  },
  {
    id: 11,
    question: "When tracing a fault in a 24 V DC control circuit, you measure 24 V at the relay coil input terminal but 0 V across the coil. This indicates:",
    options: [
      "The relay coil is working correctly",
      "The connection between the input terminal and the coil has a fault — possibly a broken wire, loose connection, or failed terminal",
      "The 24 V DC power supply is faulty",
      "The relay contacts are welded"
    ],
    correctAnswer: 1,
    explanation: "If 24 V is present at the input terminal but does not reach the coil, the fault is in the path between them. This could be a broken conductor, a loose screw terminal, a corroded connection, or a failed intermediate connection. This is a classic example of signal tracing narrowing the fault to a specific section of the circuit."
  },
  {
    id: 12,
    question: "A control system uses both PLC-controlled and hardwired relay circuits. When troubleshooting, you should:",
    options: [
      "Only check the PLC section",
      "Identify which technology controls the faulty function by reading the drawings, then apply the appropriate diagnostic technique for that part of the system — I/O status for PLC, multimeter tracing for relay circuits",
      "Only check the relay section",
      "Replace all relays and reprogram the PLC"
    ],
    correctAnswer: 1,
    explanation: "Hybrid systems require you to identify which technology is responsible for the faulty function. Reading the control drawings tells you whether the function is PLC-controlled (check the I/O status and ladder logic) or relay-controlled (trace with a multimeter and circuit diagram). Applying the right technique to the right technology saves time and demonstrates understanding."
  }
];

const faqs = [
  {
    question: "Do I need to know how to program a PLC for the EPA?",
    answer: "No. The MOET EPA assesses your ability to diagnose and resolve faults in control systems, not to programme them. You should be able to read and interpret ladder logic, use the PLC's I/O status display to check inputs and outputs, and understand basic control sequences. Programming is beyond the scope of the maintenance technician assessment."
  },
  {
    question: "What types of control system faults are most common in the EPA?",
    answer: "Common assessment faults include: faulty sensors (proximity, limit switches), failed relay/contactor coils, wiring faults (open circuits, loose connections), blown fuses in control circuits, incorrect timer settings, and stuck actuators. These are all faults you would encounter in real maintenance work and can be diagnosed with a systematic approach."
  },
  {
    question: "Should I touch the PLC during troubleshooting?",
    answer: "You can use the PLC's diagnostic features (I/O status display, fault indicators) to help with diagnosis. However, you should not modify the programme, change parameters, or physically remove modules unless specifically instructed. In the EPA, explain what information you are reading from the PLC display and how it informs your diagnosis."
  },
  {
    question: "How do I read a circuit diagram quickly under time pressure?",
    answer: "Focus on the fault area: identify the output that is not operating, trace backwards through the control circuit to find which input or condition is preventing operation. Do not try to understand the entire circuit — concentrate on the relevant rung or section. Practise reading drawings regularly so it becomes second nature."
  },
  {
    question: "What if the control system uses technology I have not seen before?",
    answer: "Apply the same systematic principles regardless of the specific technology. Inputs, outputs, power supplies and signal paths work the same way whether the controller is a PLC, a relay panel, or a bespoke control system. Explain to the assessor that you are applying systematic principles to an unfamiliar system — this demonstrates adaptability."
  },
  {
    question: "How do I demonstrate confidence with control panels during the EPA?",
    answer: "Confidence comes from familiarity. Before the EPA, practise opening control panels (with appropriate permissions and safe isolation), identifying components, tracing wiring, reading terminal markings, and using the PLC status display. During the assessment, take a moment to orientate yourself with the panel layout before starting diagnosis — this shows methodical thinking, not hesitation."
  }
];

const MOETModule7Section2_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section2">
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
            <span>Module 7.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Control System Troubleshooting
          </h1>
          <p className="text-white/80">
            PLC and relay logic fault diagnosis, signal tracing and systematic resolution for EPA readiness
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Start physical:</strong> Check sensors, actuators and wiring first</li>
              <li className="pl-1"><strong>Read logic:</strong> Trace ladder diagrams to find stuck conditions</li>
              <li className="pl-1"><strong>Signal trace:</strong> Follow voltages through the control path</li>
              <li className="pl-1"><strong>Communicate:</strong> Explain your reasoning throughout</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">EPA Assessment Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Drawings:</strong> Must read circuit and ladder diagrams</li>
              <li className="pl-1"><strong>Safety:</strong> Never bypass interlocks or safety devices</li>
              <li className="pl-1"><strong>PLC I/O:</strong> Use status displays for diagnosis</li>
              <li className="pl-1"><strong>ST1426:</strong> Control system maintenance competence</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Systematically troubleshoot PLC-controlled and relay-based control systems",
              "Read and interpret ladder logic diagrams to trace control sequences",
              "Check physical inputs, outputs and field devices using test instruments",
              "Trace signal paths through control circuits to locate fault positions",
              "Diagnose common motor starter and contactor faults methodically",
              "Demonstrate control system competence to the EPA assessor with clear communication"
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
            Understanding Control System Architecture
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before you can troubleshoot a control system, you need to understand its architecture. Industrial control
              systems in electrical maintenance typically fall into three categories: relay-based (hardwired), PLC-based,
              or hybrid systems that combine both. Regardless of the technology, the fundamental principles of inputs,
              processing, and outputs remain the same.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control System Building Blocks</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Input devices:</strong> Push buttons, limit switches, proximity sensors, thermostats, pressure switches — these detect conditions and provide signals to the controller</li>
                <li className="pl-1"><strong>Controller/processor:</strong> The PLC, relay logic, or combination that processes input signals according to the programme or circuit design</li>
                <li className="pl-1"><strong>Output devices:</strong> Contactors, solenoid valves, indicator lamps, motors, heaters — these carry out the physical actions</li>
                <li className="pl-1"><strong>Power supply:</strong> Provides the correct voltage for control circuits (typically 24 V DC for PLC I/O, 110 V or 230 V AC for relay circuits)</li>
                <li className="pl-1"><strong>Safety circuits:</strong> Emergency stops, guard interlocks, safety relays — these override all other functions</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Relay vs PLC Control — Key Differences for Maintenance</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Relay Logic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PLC Control</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fault location</td>
                      <td className="border border-white/10 px-3 py-2">Physical components and wiring</td>
                      <td className="border border-white/10 px-3 py-2">Field devices, wiring, I/O modules or programme</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Diagnosis tools</td>
                      <td className="border border-white/10 px-3 py-2">Multimeter, circuit diagrams</td>
                      <td className="border border-white/10 px-3 py-2">Multimeter, I/O status display, ladder logic</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Modification</td>
                      <td className="border border-white/10 px-3 py-2">Requires physical rewiring</td>
                      <td className="border border-white/10 px-3 py-2">Programme change (not maintenance scope)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Documentation</td>
                      <td className="border border-white/10 px-3 py-2">Wiring diagrams, circuit schematics</td>
                      <td className="border border-white/10 px-3 py-2">Wiring diagrams plus ladder logic printouts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fault indication</td>
                      <td className="border border-white/10 px-3 py-2">Physical relay position, indicator lamps</td>
                      <td className="border border-white/10 px-3 py-2">I/O LED status, fault codes, HMI messages</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Understanding the architecture before diving into testing prevents wasted time.
              Spend a few minutes reviewing the drawings and understanding how the system should work before you start measuring voltages.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Reading Ladder Logic and Circuit Diagrams
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The ability to read control circuit diagrams and ladder logic is essential for systematic troubleshooting.
              Without this skill, you are reduced to random testing — which is time-consuming, unreliable, and does not
              demonstrate competence. In the EPA, you will be provided with drawings and expected to use them effectively.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ladder Logic Fundamentals</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Rungs:</strong> Each horizontal line represents one control function — like a sentence in the control story</li>
                <li className="pl-1"><strong>NO contact (| |):</strong> Normally open — must be activated (TRUE) for current to flow through</li>
                <li className="pl-1"><strong>NC contact (|/|):</strong> Normally closed — current flows until the condition is activated, then it opens</li>
                <li className="pl-1"><strong>Coil ( ):</strong> The output — energised when all conditions in the rung are met</li>
                <li className="pl-1"><strong>Series contacts:</strong> AND logic — all must be true for the rung to energise</li>
                <li className="pl-1"><strong>Parallel contacts:</strong> OR logic — any one being true energises the rung</li>
                <li className="pl-1"><strong>Timers/counters:</strong> Add time delays or counting functions to the control logic</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Tracing a Fault Using Ladder Logic</p>
              <p className="text-sm text-white">
                When a PLC output is not energising, look at the corresponding rung in the ladder logic. Identify each
                input condition on that rung. Using the PLC's I/O status display, check which conditions are met and
                which are not. The unmet condition is either the correct state (e.g., a guard interlock correctly preventing
                operation) or a fault (e.g., a sensor not detecting when it should). This narrows the fault to a specific
                input device, which you then test physically.
              </p>
            </div>

            <p>
              When reading circuit diagrams for relay-based systems, the same principle applies but the tools are different.
              You trace the circuit on paper, identifying each contact and component in the current path. Then you use a
              multimeter to verify the actual state of each component matches the expected state. Where the actual and
              expected states differ, you have found the fault area.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Practise reading ladder logic diagrams before the EPA. The more familiar you
              are with the symbols and logic, the faster you can trace faults during the assessment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Systematic Signal Tracing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Signal tracing is the practical technique of following the electrical signal path through a control circuit,
              measuring voltages at each point to find where the signal is lost. This is the core troubleshooting skill for
              both relay and PLC-based systems, and it is what the assessor is primarily looking for during the EPA.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Signal Tracing Procedure</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Start at the supply:</strong> Confirm the control circuit power supply is present and at the correct voltage</li>
                <li className="pl-1"><strong>Identify the output:</strong> Which output device is not operating? This is your endpoint</li>
                <li className="pl-1"><strong>Trace forward:</strong> From the supply, measure voltage at each connection point along the control path</li>
                <li className="pl-1"><strong>Find the dropout:</strong> Where the expected voltage disappears is the fault area</li>
                <li className="pl-1"><strong>Investigate:</strong> Check the component or connection at the dropout point</li>
                <li className="pl-1"><strong>Verify:</strong> After repair, confirm the signal path is complete and the output operates</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Control Circuit Faults</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Blown control fuse:</strong> No supply to the entire control circuit — check the control transformer secondary fuse</li>
                <li className="pl-1"><strong>Failed relay coil:</strong> Voltage present at the coil but no mechanical operation — measure coil resistance</li>
                <li className="pl-1"><strong>Worn relay contacts:</strong> Relay operates but the contact does not make — check contact condition</li>
                <li className="pl-1"><strong>Loose terminal:</strong> Intermittent or high-resistance connection — check and re-torque</li>
                <li className="pl-1"><strong>Broken conductor:</strong> Open circuit in the wiring — continuity test end-to-end</li>
                <li className="pl-1"><strong>Failed sensor:</strong> No output signal despite the target being present — check supply and alignment</li>
                <li className="pl-1"><strong>Corroded connections:</strong> High resistance causing voltage drop — clean and re-terminate</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> During signal tracing, explain to the assessor what voltage you expect at each
              point and what the actual reading tells you. This demonstrates that you understand the circuit, not just that
              you can operate a multimeter.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Motor Starter and Contactor Diagnostics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Motor control circuits are among the most common control systems you will encounter in maintenance work and
              the EPA. Understanding DOL (direct on-line), star-delta, and soft starter circuits allows you to diagnose
              faults efficiently. The key is understanding how the control circuit governs the power circuit.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DOL Starter Fault Diagnosis</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Motor will not start:</strong> Check control supply, start button, safety interlocks, overload reset, contactor coil</li>
                <li className="pl-1"><strong>Motor starts but will not hold:</strong> Check the hold-on auxiliary contact — is it making? Check for voltage drop</li>
                <li className="pl-1"><strong>Overload trips immediately:</strong> Check motor current, mechanical binding, overload setting, thermal element</li>
                <li className="pl-1"><strong>Contactor chatters:</strong> Low coil voltage, intermittent control circuit, failing coil</li>
                <li className="pl-1"><strong>Motor runs in wrong direction:</strong> Two phases swapped — check at the contactor output terminals</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Safety: Never Bypass Safety Devices</p>
              <p className="text-sm text-white">
                During troubleshooting, you may be tempted to bypass safety interlocks, overloads, or emergency stops to
                test if the system operates. This is never acceptable — in the workplace it creates a serious safety hazard,
                and in the EPA it is an automatic fail. Always diagnose by testing the safety device itself, not by bypassing it.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Star-Delta Starter Troubleshooting</h3>
              <p className="text-sm text-white mb-3">
                Star-delta starters use a timed changeover between star and delta configurations to reduce starting current.
                Understanding the sequence is essential for diagnosis: the main and star contactors energise first, the timer
                runs, the star contactor drops out, and the delta contactor pulls in.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fails to start in star:</strong> Check main and star contactor control circuits, interlocks, and the timer enable signal</li>
                <li className="pl-1"><strong>Does not change to delta:</strong> Check timer operation, delta contactor coil supply, and changeover auxiliary contacts</li>
                <li className="pl-1"><strong>Trips during changeover:</strong> Check the changeover timing (typically 5-15 seconds), and that both star and delta contactors are not energising simultaneously</li>
                <li className="pl-1"><strong>Mechanical interlock:</strong> Star and delta contactors must be mechanically interlocked to prevent simultaneous operation — check the interlock mechanism</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Control system troubleshooting is a core practical competence in the MOET standard.
              The EPA practical observation will include control system fault diagnosis, assessed on your systematic approach,
              safe working, use of drawings, and clear communication.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Communicating Your Diagnostic Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In the EPA, the assessor cannot see what is happening inside your head. If you work in silence, they
              can only assess the outcome — not the reasoning that led to it. Explaining your diagnostic process as
              you work is the single most effective way to demonstrate control system competence and achieve higher
              grades.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What to Communicate During Diagnosis</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Your hypothesis:</strong> "Based on the symptoms, I suspect the input sensor is not detecting — I will check the PLC I/O status first"</li>
                <li className="pl-1"><strong>What you are testing:</strong> "I am measuring the supply voltage at the sensor terminals to confirm it is receiving 24 V DC"</li>
                <li className="pl-1"><strong>Expected vs actual:</strong> "I expected 24 V here but I am reading 0 V, which tells me the fault is upstream of this point"</li>
                <li className="pl-1"><strong>Your reasoning:</strong> "Because the PLC input LED is off, the fault is likely in the field wiring or sensor rather than the PLC itself"</li>
                <li className="pl-1"><strong>Safety awareness:</strong> "Before I open the panel, I need to confirm whether the control circuit is at 24 V DC or 230 V AC"</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Mistakes When Communicating</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Working in silence:</strong> The assessor cannot give credit for reasoning they cannot observe</li>
                <li className="pl-1"><strong>Over-narrating:</strong> Describing every hand movement is distracting — explain your thinking, not your physical actions</li>
                <li className="pl-1"><strong>Using jargon incorrectly:</strong> Use technical terms accurately — misusing terminology suggests gaps in understanding</li>
                <li className="pl-1"><strong>Not explaining changes of plan:</strong> If your first hypothesis is wrong, explain why you are changing approach</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Practise Speaking While Working</p>
              <p className="text-sm text-white">
                Explaining your work while performing it is a skill that requires practice. In your workplace, start
                explaining your diagnostic reasoning to a colleague or supervisor as you troubleshoot real faults.
                This builds the habit so it feels natural during the EPA rather than forced or awkward. Ask your
                training provider to include communication practice in your mock assessments.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Communication is a key differentiator between pass and distinction grades.
              A candidate who diagnoses a fault correctly in silence may achieve a pass. A candidate who diagnoses
              the same fault while clearly explaining their reasoning, referencing drawings, and demonstrating safety
              awareness throughout is far more likely to achieve a distinction.
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
          <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
            <h3 className="text-sm font-semibold text-elec-yellow mb-3">Quick Reference — Control System Troubleshooting</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-white/70 mb-1.5">Systematic Approach</p>
                <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                  <li>Review drawings before testing</li>
                  <li>Check power supply first</li>
                  <li>Use PLC I/O status display</li>
                  <li>Trace signals from supply to output</li>
                  <li>Test one variable at a time</li>
                  <li>Verify the repair before sign-off</li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium text-white/70 mb-1.5">Key Safety Rules</p>
                <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                  <li>Never bypass safety interlocks</li>
                  <li>Check control voltage before touching</li>
                  <li>Remove all PLC forces after testing</li>
                  <li>Clear area before forcing outputs</li>
                  <li>Use GS38-compliant test equipment</li>
                  <li>Safe isolate before any physical work</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — Control Systems"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Component Replacement
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section2-5">
              Next: Work to Industry Standards
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section2_4;
