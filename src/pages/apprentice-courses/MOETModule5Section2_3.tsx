import { ArrowLeft, Grid, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Ladder Logic Basics - MOET Module 5 Section 2.3";
const DESCRIPTION = "Comprehensive guide to ladder logic for maintenance technicians: contacts, coils, AND/OR logic, latching circuits, scan order, online monitoring and fault-finding techniques. IEC 61131-3 and ST1426 aligned.";

const quickCheckQuestions = [
  {
    id: "no-contact",
    question: "A normally open (NO) contact passes power when:",
    options: [
      "The associated input is OFF",
      "The associated input or coil is ON (energised)",
      "It always passes power regardless of state",
      "The rung is disabled by the programme"
    ],
    correctIndex: 1,
    explanation: "A NO contact closes and passes power when its associated bit is ON, mirroring a physical NO relay contact. When the bit is OFF, the contact is open and blocks power flow through the rung."
  },
  {
    id: "series-logic",
    question: "Two contacts in series on a ladder logic rung represent:",
    options: [
      "OR logic — either contact can activate the output",
      "AND logic — both must be true for the output to energise",
      "NOT logic — one inverts the other",
      "A timer function with two stages"
    ],
    correctIndex: 1,
    explanation: "Series contacts create AND logic — power can only flow through the rung if ALL series contacts are closed (true). This directly mirrors series-connected relay contacts in traditional hard-wired circuits."
  },
  {
    id: "latch-use",
    question: "A latching circuit keeps an output ON after:",
    options: [
      "The input signal remains continuously held",
      "A momentary input pulse, requiring a separate input to turn OFF",
      "A fixed time delay expires automatically",
      "The PLC restarts from a power cycle"
    ],
    correctIndex: 1,
    explanation: "A latch (seal-in) keeps the output energised after a momentary start press. The output remains ON until a separate stop input breaks the circuit. This is the fundamental start/stop motor control pattern."
  },
  {
    id: "scan-order",
    question: "If the same output coil appears on two different rungs, what happens?",
    options: [
      "Both rungs control the output equally",
      "Only the last rung scanned determines the final output state",
      "The PLC generates a compilation error and will not run",
      "The output alternates between the two rung states each scan"
    ],
    correctIndex: 1,
    explanation: "The PLC scans top to bottom. Each rung writes to the output, but only the last rung scanned determines the final state written to the output image table. This 'double coil' condition is a common programming error flagged by most PLC software."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Ladder logic was originally designed to resemble:",
    options: [
      "A flowchart with decision diamonds",
      "A ladder with two power rails and horizontal rungs containing contacts and coils",
      "A spreadsheet with rows and columns of data",
      "A wiring loom diagram used in automotive manufacturing"
    ],
    correctAnswer: 1,
    explanation: "Ladder logic uses two vertical power rails with horizontal rungs — designed to look like the relay wiring diagrams that electricians already understood, making the transition from hard-wired relay panels to PLC programming intuitive."
  },
  {
    id: 2,
    question: "A normally closed (NC) contact passes power when:",
    options: [
      "The associated input is ON (energised)",
      "The associated input is OFF (de-energised)",
      "The PLC is in STOP mode",
      "A timer has expired"
    ],
    correctAnswer: 1,
    explanation: "NC contacts are closed by default, passing power when their associated bit is OFF. They open when the bit turns ON. NC contacts are used for stop buttons and safety interlocks to provide fail-safe operation."
  },
  {
    id: 3,
    question: "Parallel contacts on a ladder logic rung create:",
    options: [
      "AND logic — all contacts must be true",
      "OR logic — any one contact being true activates the output",
      "NAND logic — output is ON unless all contacts are true",
      "XOR logic — output is ON if exactly one contact is true"
    ],
    correctAnswer: 1,
    explanation: "Parallel (branched) contacts create OR logic — power can flow through any one of the parallel paths. If ANY parallel contact is closed, the output coil is energised."
  },
  {
    id: 4,
    question: "The stop button in a motor start/stop circuit should use:",
    options: [
      "A normally open (NO) contact",
      "A normally closed (NC) contact for fail-safe design per BS EN 60204-1",
      "An analogue input scaled from 0 to 100 %",
      "A timer contact with a 2-second delay"
    ],
    correctAnswer: 1,
    explanation: "NC stop buttons are fail-safe: if the wire breaks, the connection fails, or the contact welds open, the circuit opens and the motor stops. This is a mandatory requirement under BS EN 60204-1."
  },
  {
    id: 5,
    question: "A PLC scans its ladder logic rungs in which order?",
    options: [
      "Randomly, depending on processor load",
      "Top to bottom, left to right, starting from rung 1",
      "Bottom to top, to prioritise the last-written logic",
      "Only the rungs with active inputs are scanned"
    ],
    correctAnswer: 1,
    explanation: "The PLC executes ladder logic sequentially from top to bottom, evaluating each rung from left to right. This scan order affects when coil states update and is important for understanding programme behaviour."
  },
  {
    id: 6,
    question: "An internal relay (memory bit) in a PLC programme is used to:",
    options: [
      "Drive physical output terminals directly",
      "Store intermediate logic states without driving physical outputs",
      "Read physical input values from sensors",
      "Count the number of scan cycles per second"
    ],
    correctAnswer: 1,
    explanation: "Memory bits (internal relays, M-bits) are virtual coils in PLC memory used for intermediate logic, sequencing flags, and conditional states. They have no physical output but can be used as contacts throughout the programme."
  },
  {
    id: 7,
    question: "Emergency stop functions in machinery should be:",
    options: [
      "NO contacts that energise a stop coil when pressed",
      "NC hardwired contacts that break safety circuits directly, not relying solely on PLC logic",
      "Software-only functions handled entirely within the PLC programme",
      "Analogue inputs that gradually reduce motor speed to zero"
    ],
    correctAnswer: 1,
    explanation: "E-stop circuits must use hardwired NC contacts per BS EN 60204-1 and BS EN ISO 13850. They must function independently of the PLC. The PLC may monitor E-stop status but must not be the sole means of achieving the safety function."
  },
  {
    id: 8,
    question: "Online monitoring in PLC software helps maintenance by:",
    options: [
      "Only displaying output states with no input information",
      "Displaying live contact and coil states so you can trace exactly which condition blocks an output",
      "Automatically deleting faulty rungs from the programme",
      "Replacing failed field devices without physical access"
    ],
    correctAnswer: 1,
    explanation: "Online monitoring highlights energised elements in real time, showing power flow through each rung. You can see exactly which contacts are satisfied and which are blocking, making it the most powerful diagnostic tool for PLC fault-finding."
  },
  {
    id: 9,
    question: "Cross-referencing in PLC software allows you to:",
    options: [
      "Connect two different PLC brands together",
      "Find every location in the programme where a specific address is used",
      "Convert between ladder logic and structured text automatically",
      "Identify unused cable routes in the installation"
    ],
    correctAnswer: 1,
    explanation: "Cross-referencing lists every rung where a given address appears — essential for tracing how a condition in one part of the programme affects logic elsewhere. It is a fundamental diagnostic tool when investigating why an output is not behaving as expected."
  },
  {
    id: 10,
    question: "A seal-in (latch) contact in a motor start circuit is:",
    options: [
      "An external physical relay connected in the starter panel",
      "An NO contact of the output coil wired in parallel with the start button to maintain the circuit",
      "A timer that holds the output ON for a fixed period",
      "A safety contact that prevents motor reversal"
    ],
    correctAnswer: 1,
    explanation: "The seal-in contact is an NO contact of the motor output coil itself, placed in parallel with the momentary start button. Once the start button is pressed and the coil energises, the seal-in contact closes and maintains the circuit after the button is released."
  },
  {
    id: 11,
    question: "A one-shot (edge detection) instruction in ladder logic is used to:",
    options: [
      "Permanently lock an output ON",
      "Produce a single scan pulse on the rising or falling edge of an input transition",
      "Count the total number of input activations",
      "Generate a continuous oscillating output"
    ],
    correctAnswer: 1,
    explanation: "A one-shot (OSR/OSF, P/N trigger) produces a single-scan pulse when the input transitions from OFF to ON (rising edge) or ON to OFF (falling edge). This is essential for counting, toggling, and triggering single events from maintained signals."
  },
  {
    id: 12,
    question: "Under ST1426, a maintenance technician is expected to:",
    options: [
      "Write complete PLC programmes from scratch for new machinery",
      "Read and interpret ladder logic, use online monitoring for fault diagnosis, and understand programme structure",
      "Only replace PLC hardware modules without understanding the programme",
      "Design safety circuits independently of the controls engineer"
    ],
    correctAnswer: 1,
    explanation: "ST1426 expects maintenance technicians to understand programme structure, read ladder logic diagrams, use online monitoring for systematic fault diagnosis, and communicate effectively with controls engineers. Full programme design is typically the controls engineer's role."
  }
];

const faqs = [
  {
    question: "Is ladder logic still widely used in modern industrial control?",
    answer: "Yes, ladder logic (LD) remains the most popular PLC programming language worldwide, especially for discrete manufacturing and machine control. Its similarity to traditional relay circuit diagrams makes it intuitive for electricians. However, other IEC 61131-3 languages such as Structured Text and Function Block Diagram are increasingly used for complex calculations and process control applications."
  },
  {
    question: "What is the difference between a contact and a coil in ladder logic?",
    answer: "Contacts test conditions — they either pass or block power flow based on the state of their associated bit. Coils are outputs that are energised when the rung logic evaluates to true. Contacts are placed on the left side of the rung (condition side) and coils on the right (output side). A single rung can have multiple contacts but typically has only one output coil."
  },
  {
    question: "How do I systematically read an unfamiliar ladder logic programme?",
    answer: "Start with the I/O list to understand what physical devices are connected. Find the main output coils you are interested in. Trace backwards through the contacts to understand what conditions must be met. Use cross-referencing to find where conditions are controlled elsewhere in the programme. Read any comments or rung descriptions. Work systematically through one output at a time rather than trying to understand the entire programme at once."
  },
  {
    question: "What is online monitoring and how does it help with fault-finding?",
    answer: "Online monitoring connects a programming laptop to the running PLC and displays real-time states of all programme elements. Energised contacts and coils are typically highlighted in green or bold. You can see exactly which conditions are met and which are blocking an output. This allows you to pinpoint whether a fault is in the field wiring (PLC shows correct input state but field device disagrees) or in the programme logic."
  },
  {
    question: "Can I make changes to a running PLC programme during online monitoring?",
    answer: "Most PLC software allows online edits, but this must NEVER be done without proper authorisation, risk assessment, and safe working procedures. Changes to a running programme can cause unexpected machine movements. Under ST1426, maintenance technicians use online monitoring primarily for diagnostics — programme modifications are typically the responsibility of the controls engineer following a formal management-of-change process."
  }
];

const MOETModule5Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section2">
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
            <Grid className="h-4 w-4" />
            <span>Module 5.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Ladder Logic Basics
          </h1>
          <p className="text-white/80">
            Relay logic concepts, contacts, coils and fundamental programming elements for PLC control
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Structure:</strong> Two power rails with horizontal rungs containing contacts and coils</li>
              <li className="pl-1"><strong>Contacts:</strong> NO (passes when ON) and NC (passes when OFF) test conditions</li>
              <li className="pl-1"><strong>Logic:</strong> Series = AND, Parallel = OR, NC contact = NOT</li>
              <li className="pl-1"><strong>Scan:</strong> Top to bottom, left to right every scan cycle</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Online monitoring:</strong> See live contact and coil states for fault diagnosis</li>
              <li className="pl-1"><strong>Cross-reference:</strong> Find every location where an address is used</li>
              <li className="pl-1"><strong>Latching:</strong> Start/stop motor control is the fundamental pattern</li>
              <li className="pl-1"><strong>ST1426:</strong> Read and interpret PLC programmes for maintenance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Read and interpret ladder logic diagrams with contacts, coils and branches",
              "Explain AND, OR and NOT logic functions using series and parallel contacts",
              "Describe latching (seal-in) circuits for motor start/stop control",
              "Understand PLC scan order and how it affects programme execution",
              "Use online monitoring and cross-referencing for systematic fault diagnosis",
              "Apply fail-safe design principles using NC contacts for stop and E-stop functions"
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
            Ladder Logic Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ladder logic was created in the late 1960s so that electricians could programme PLCs using a format they already understood — relay circuit diagrams. Each rung of the ladder represents a circuit path between two vertical power rails, with contacts (conditions) on the left and coils (outputs) on the right. The PLC evaluates each rung sequentially from top to bottom during every scan cycle, typically completing the entire programme in 1-50 milliseconds.
            </p>
            <p>
              The visual format makes the logic straightforward to understand: if all series contacts in a path are closed (AND condition) or any parallel contacts are closed (OR condition), the output coil at the end of the rung energises. This directly mirrors how physical relay circuits work, which is why ladder logic remains the most widely used PLC language in discrete manufacturing and machine control worldwide.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Basic Ladder Elements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>NO contact --| |--:</strong> Passes power when its associated bit is ON (energised). Used for start buttons, sensor inputs, and internal flags.</li>
                <li className="pl-1"><strong>NC contact --|/|--:</strong> Passes power when its associated bit is OFF (de-energised). Used for stop buttons, safety interlocks, and fault conditions.</li>
                <li className="pl-1"><strong>Output coil --( )--:</strong> Energises when rung logic evaluates to true. Drives physical outputs or internal memory bits.</li>
                <li className="pl-1"><strong>Set (latch) --(S)--:</strong> Turns the output ON and it stays ON until explicitly reset — survives loss of rung power.</li>
                <li className="pl-1"><strong>Reset (unlatch) --(R)--:</strong> Turns OFF a latched output. Must be used with a corresponding Set instruction.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The PLC Scan Cycle</p>
              <p className="text-sm text-white mb-3">
                The PLC operates in a continuous repeating cycle with three main phases:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Input scan:</strong> Reads all physical input states into the input image table (a snapshot of inputs at that moment)</li>
                <li className="pl-1"><strong>Programme execution:</strong> Evaluates every rung from top to bottom, left to right, writing results to the output image table</li>
                <li className="pl-1"><strong>Output update:</strong> Writes the output image table to the physical outputs simultaneously</li>
              </ul>
              <p className="text-sm text-white mt-3">
                This means that inputs are only read once per scan, and outputs are only updated once per scan. A very fast input pulse (shorter than the scan time) could be missed entirely — this is important for high-speed counting applications.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> Understanding the scan cycle explains why forcing an input in the PLC software may not produce the same result as operating the physical switch. The forced value bypasses the input scan and directly writes to the input image table.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Logic Functions in Ladder Diagrams
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              All digital logic can be constructed from the basic ladder elements. The physical arrangement of contacts on the rung — series, parallel, or combinations — determines the logic function. Understanding these patterns is essential for reading any ladder programme, from a simple motor starter to a complex automated production line.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Arrangement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Output ON When</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">AND</td>
                      <td className="border border-white/10 px-3 py-2">Contacts in series</td>
                      <td className="border border-white/10 px-3 py-2">ALL contacts true</td>
                      <td className="border border-white/10 px-3 py-2">Guard closed AND start pressed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">OR</td>
                      <td className="border border-white/10 px-3 py-2">Contacts in parallel</td>
                      <td className="border border-white/10 px-3 py-2">ANY contact true</td>
                      <td className="border border-white/10 px-3 py-2">Start button 1 OR start button 2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">NOT</td>
                      <td className="border border-white/10 px-3 py-2">NC contact</td>
                      <td className="border border-white/10 px-3 py-2">Associated bit is OFF</td>
                      <td className="border border-white/10 px-3 py-2">Run if fault flag is NOT set</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">NAND</td>
                      <td className="border border-white/10 px-3 py-2">NC contacts in parallel</td>
                      <td className="border border-white/10 px-3 py-2">NOT all inputs true</td>
                      <td className="border border-white/10 px-3 py-2">Alarm if NOT both sensors active</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">NOR</td>
                      <td className="border border-white/10 px-3 py-2">NC contacts in series</td>
                      <td className="border border-white/10 px-3 py-2">NONE of the inputs true</td>
                      <td className="border border-white/10 px-3 py-2">Idle if no call for operation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              Complex logic is built by combining these patterns. For example, a motor may require: (Stop NC in series) AND (Guard interlock NC in series) AND (Start button NO in parallel with seal-in contact NO). This creates a rung where the motor runs only when stop is not pressed, the guard is closed, and either the start button is pressed or the motor is already running.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Internal Relays (Memory Bits)</p>
              <p className="text-sm text-white mb-3">
                Internal relays (M-bits, flags) are virtual coils in PLC memory. They do not drive physical outputs but can be used as contacts anywhere in the programme. They are essential for:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Intermediate logic:</strong> Breaking complex conditions into manageable stages</li>
                <li className="pl-1"><strong>Sequencing:</strong> Step flags for sequential machine operations</li>
                <li className="pl-1"><strong>One-shot triggers:</strong> Edge detection for counting and toggling</li>
                <li className="pl-1"><strong>Fault flags:</strong> Recording fault conditions for diagnostics</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Latching Circuits and Motor Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The start/stop motor circuit is the most fundamental ladder logic pattern and the one you will encounter most frequently in industrial maintenance. Understanding this circuit thoroughly gives you the foundation for reading virtually any ladder programme, because the same latching principle is used throughout industrial control for pumps, valves, conveyors, and process sequences.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Start/Stop Circuit Elements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stop button:</strong> NC contact in series — breaks the rung when pressed. Uses NC because a broken wire also opens the contact, providing fail-safe behaviour as required by BS EN 60204-1.</li>
                <li className="pl-1"><strong>Start button:</strong> NO contact in parallel with the seal-in contact. Momentary — pressed to start, then released.</li>
                <li className="pl-1"><strong>Seal-in contact:</strong> An NO contact of the output coil itself, placed in parallel with the start button. When the coil energises, this contact closes and maintains the circuit after the start button is released.</li>
                <li className="pl-1"><strong>Overload contact:</strong> NC contact in series (from the thermal overload relay). Opens if the motor draws excessive current, stopping the motor and requiring manual reset.</li>
                <li className="pl-1"><strong>Output coil:</strong> Drives the motor contactor. When energised, the motor runs. When de-energised, the motor stops.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Fail-Safe Design Principle</p>
              <p className="text-sm text-white">
                Stop and E-stop buttons always use NC contacts. If the wire breaks, the circuit opens and the machine stops — this is fail-safe behaviour. If NO contacts were used for the stop function, a broken wire would prevent the operator from stopping the machine. This is not optional — it is a legal requirement under the Machinery Directive and BS EN 60204-1. Emergency stops must also be hardwired through safety-rated devices (safety relays) and must not rely solely on PLC logic (BS EN ISO 13850).
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Set/Reset vs Seal-In</p>
              <p className="text-sm text-white mb-3">
                There are two ways to create latching behaviour in ladder logic:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Seal-in contact:</strong> The output coil maintains itself via its own NO contact in parallel with start. The stop button breaks the seal-in. This is the traditional method, most similar to hard-wired relay circuits.</li>
                <li className="pl-1"><strong>Set/Reset instructions:</strong> Separate Set (S) and Reset (R) coils latch and unlatch the output. The output retains its state between scans without needing a seal-in path. Note: if both Set and Reset are active in the same scan, the instruction processed last wins.</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Reading Ladder Diagrams for Fault-Finding
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Online monitoring transforms ladder diagrams from static documentation into powerful real-time diagnostic tools. By connecting the programming laptop to the running PLC, every contact and coil displays its live state — typically highlighted in green when true and unhighlighted when false. This allows you to trace the logic flow from left to right and immediately identify which condition is preventing an output from operating.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Systematic Diagnostic Steps</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>1. Identify the fault:</strong> Determine which output is not operating (or is operating unexpectedly).</li>
                <li className="pl-1"><strong>2. Find the output coil:</strong> Use cross-referencing to locate the rung containing the output coil in the programme.</li>
                <li className="pl-1"><strong>3. Go online:</strong> Connect to the running PLC and observe the rung in real time.</li>
                <li className="pl-1"><strong>4. Trace power flow:</strong> Follow the rung from left to right. Power should flow from the left rail through closed contacts to the coil. Find where power flow stops — that is the blocking condition.</li>
                <li className="pl-1"><strong>5. Evaluate the blocking contact:</strong> Is the blocking condition genuine (e.g., a guard is genuinely open) or is it a fault (e.g., the PLC shows the guard open but the physical guard is closed)?</li>
                <li className="pl-1"><strong>6. Check field wiring:</strong> If the PLC state does not match the physical device state, the fault is in the field wiring, the sensor, or the input module — not in the programme.</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cross-Referencing</h3>
                <p className="text-sm text-white mb-2">
                  Cross-referencing shows every rung where a specific address (input, output, or memory bit) is used. This is essential because:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">A blocking contact may be controlled by logic on a different rung</li>
                  <li className="pl-1">An output may be referenced in multiple locations</li>
                  <li className="pl-1">A condition chain may span several programme sections</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Watch Tables</h3>
                <p className="text-sm text-white mb-2">
                  Watch tables allow you to monitor specific addresses in a list format:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Group related addresses for a particular machine section</li>
                  <li className="pl-1">Monitor timer and counter current values</li>
                  <li className="pl-1">View analogue input/output values in engineering units</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> Always use cross-referencing to check if a blocking contact is controlled by logic elsewhere in the programme. The fault may be in a completely different section — for example, a safety interlock in the housekeeping routines may be preventing the output you are investigating.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Good Programming Practice and Common Errors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While maintenance technicians are not typically expected to write PLC programmes from scratch, understanding good programming practice helps you read programmes more effectively, identify potential issues, and communicate precisely with controls engineers when modifications are needed.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Programming Errors to Watch For</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Double coil:</strong> The same output address used on two or more rungs. Only the last rung scanned determines the final state, making the earlier rungs ineffective. Most PLC software flags this as a warning.</li>
                <li className="pl-1"><strong>Missing seal-in:</strong> An output that should latch but has no seal-in contact or Set instruction. The output only stays ON while the start button is physically held — releasing it drops the output.</li>
                <li className="pl-1"><strong>NO stop button:</strong> Using a normally open contact for a stop function. If the wire breaks, the machine cannot be stopped — a serious safety violation.</li>
                <li className="pl-1"><strong>No overload protection in logic:</strong> Omitting the overload contact from the motor rung. Even if the physical overload trips the contactor, the PLC output remains ON, which can cause repeated attempts to restart against a tripped overload.</li>
                <li className="pl-1"><strong>Race conditions:</strong> Logic where the output depends on the order of evaluation within the same scan. Rearranging rungs could change the machine behaviour.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Programme Documentation</p>
              <p className="text-sm text-white mb-3">
                Well-documented programmes are far easier to maintain. Look for (and request from controls engineers) the following:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Symbolic names:</strong> Descriptive names instead of raw addresses (e.g., "GuardInterlock" instead of "I0.3")</li>
                <li className="pl-1"><strong>Rung comments:</strong> Descriptions of what each rung or group of rungs does</li>
                <li className="pl-1"><strong>I/O list:</strong> A complete list mapping every physical I/O point to its tag name and field device</li>
                <li className="pl-1"><strong>Programme structure:</strong> Logical grouping into sections (e.g., safety, motor control, sequencing, HMI interface)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Safety Reminder</p>
              <p className="text-sm text-white">
                Never force an output or override a safety interlock in the PLC without a proper risk assessment and permit to work. Forced outputs bypass all programme logic including safety interlocks. A forgotten force has caused fatal accidents in industry. Always document any forces applied and remove them immediately after diagnosis. Check the force table before leaving the PLC.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians are expected to read and interpret ladder logic programmes, use online monitoring for systematic fault diagnosis, understand programme structure and documentation, and communicate findings to controls engineers. These skills are fundamental to efficient reactive and planned maintenance of automated machinery.
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
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Input/Output Devices
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section2-4">
              Next: Timers, Counters and Sequencing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section2_3;
