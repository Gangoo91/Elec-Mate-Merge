import { ArrowLeft, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Timers, Counters and Sequencing - MOET Module 5 Section 2.4";
const DESCRIPTION = "Comprehensive guide to PLC timers, counters and sequential control for electrical maintenance technicians. TON, TOF, TP timers, CTU/CTD counters, GRAFCET and sequencer design. IEC 61131-3 and ST1426 aligned.";

const quickCheckQuestions = [
  {
    id: "timer-ton",
    question: "What does a TON (Timer On-Delay) instruction do?",
    options: [
      "Turns the output ON immediately and OFF after the preset time",
      "Delays turning the output ON for a preset time after the input becomes TRUE",
      "Counts the number of input pulses received",
      "Generates a fixed-frequency pulse output continuously"
    ],
    correctIndex: 1,
    explanation: "A TON starts timing when its input (enable) becomes TRUE. After the preset time elapses, the done bit turns ON. If the input goes FALSE before the preset is reached, the timer resets to zero. This is the most common timer type in industrial PLC programmes."
  },
  {
    id: "counter-ctu",
    question: "How does a CTU (Count Up) counter increment its value?",
    options: [
      "Continuously while the input remains TRUE",
      "By one each time the count input transitions from FALSE to TRUE (rising edge)",
      "By counting the duration in seconds that the input is held",
      "By one on every PLC scan cycle regardless of input state"
    ],
    correctIndex: 1,
    explanation: "A CTU increments its accumulated value by one on each rising edge (FALSE-to-TRUE transition) of the count input. When the accumulated value reaches the preset, the done bit turns ON. A separate reset input returns the accumulated value to zero."
  },
  {
    id: "sequencer-purpose",
    question: "What is the main purpose of a sequencer in PLC programming?",
    options: [
      "Sort data values into alphabetical or numerical order",
      "Control a process that must follow defined steps in a fixed order with transition conditions",
      "Speed up the PLC scan cycle for faster execution",
      "Replace all timers and counters with a single instruction"
    ],
    correctIndex: 1,
    explanation: "A sequencer controls a process that executes steps in a defined order, with transitions between steps triggered by specific conditions (sensor signals, timer completion, operator input). Examples include packaging machines, conveyor sorting systems, and batch mixing processes."
  },
  {
    id: "retentive-timer",
    question: "How does a retentive timer differ from a standard TON timer?",
    options: [
      "A retentive timer runs faster than a standard timer",
      "A retentive timer remembers its accumulated time if the input goes FALSE, resuming when TRUE returns",
      "A retentive timer can only be used with analogue outputs",
      "A retentive timer does not need a preset value to be configured"
    ],
    correctIndex: 1,
    explanation: "A retentive timer (TONR) retains its accumulated value when the input goes FALSE. Timing resumes from where it left off when the input returns TRUE. This is useful for tracking total run-time across intermittent operation. A separate reset instruction is required to clear the accumulated value."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A TOF (Timer Off-Delay) keeps an output ON for:",
    options: [
      "A preset time before the input becomes TRUE",
      "A preset time after the input goes FALSE",
      "The exact duration the input is held TRUE",
      "An unlimited time until manually reset"
    ],
    correctAnswer: 1,
    explanation: "A TOF starts timing when the input goes FALSE. The output remains ON during the timing period and turns OFF when the preset elapses. Common application: cooling fan run-on after a motor stops to allow heat dissipation."
  },
  {
    id: 2,
    question: "The time base of a PLC timer determines:",
    options: [
      "The maximum number of timers that can run simultaneously",
      "The resolution — for example, 1 ms, 10 ms, 100 ms or 1 s per count increment",
      "The maximum number of outputs the timer can control",
      "The voltage level of the timer output signal"
    ],
    correctAnswer: 1,
    explanation: "The time base sets the timer resolution. A 100 ms base means each count increment represents 100 ms, so a preset of 50 gives 5 seconds. Faster time bases provide greater precision; slower bases allow longer delays without large preset values."
  },
  {
    id: 3,
    question: "A TP (Timer Pulse) instruction produces:",
    options: [
      "Continuous oscillation at a fixed frequency",
      "A single pulse of fixed duration regardless of how long the input is held",
      "A delayed OFF output after the input goes FALSE",
      "A retentive time accumulation across multiple activations"
    ],
    correctAnswer: 1,
    explanation: "A TP generates a single pulse of preset duration on the rising edge of the input. The pulse runs to completion even if the input goes FALSE before the preset time. Used for fixed-duration operations such as solenoid activation pulses."
  },
  {
    id: 4,
    question: "A CTD (Count Down) counter starts counting from:",
    options: [
      "Zero, incrementing upwards",
      "The preset value, decrementing towards zero",
      "The maximum integer value of the PLC data type",
      "Always from 100 regardless of configuration"
    ],
    correctAnswer: 1,
    explanation: "A CTD loads the preset value and decrements by one on each count pulse. The done bit turns ON when the accumulated value reaches zero. Used for dispensing fixed quantities, batch counting remaining items, and cycle-limited operations."
  },
  {
    id: 5,
    question: "In a sequential programme, the transition from Step 3 to Step 4 occurs when:",
    options: [
      "The PLC scan cycle naturally reaches Step 4 in the programme",
      "The transition condition between the two steps evaluates to TRUE",
      "A fixed universal time delay expires between all steps",
      "The operator presses any button on the control panel"
    ],
    correctAnswer: 1,
    explanation: "Transitions are controlled by specific defined conditions. The active step remains active until its transition condition is satisfied. Conditions can include sensor signals, timer done bits, counter targets, operator inputs, or logical combinations of these."
  },
  {
    id: 6,
    question: "The difference between the accumulated value and the preset value in a timer is:",
    options: [
      "They are identical in all timer types",
      "The preset is the target time; the accumulated is the current elapsed time counting towards that target",
      "The accumulated value is always larger than the preset",
      "The preset is calculated automatically from the accumulated value"
    ],
    correctAnswer: 1,
    explanation: "The preset (PV/PT) is the target value set by the programmer. The accumulated (CV/ET) is the current elapsed time since the timer started. When the accumulated reaches the preset, the done bit turns ON. The accumulated resets to zero when a non-retentive timer resets."
  },
  {
    id: 7,
    question: "Cascaded timers are used when:",
    options: [
      "Faster timing resolution is needed for high-speed processes",
      "The total required delay exceeds the maximum value of a single timer instruction",
      "Counting and timing must occur simultaneously on the same signal",
      "Multiple motors need to start with the same delay"
    ],
    correctAnswer: 1,
    explanation: "Cascading connects one timer's done bit to the next timer's enable input. The total delay equals the sum of all presets in the cascade. This technique is used when the required delay exceeds the maximum value a single timer can represent."
  },
  {
    id: 8,
    question: "For counting bottles passing a photoelectric sensor on a conveyor, the correct instruction is:",
    options: [
      "A TON timer measuring the duration between bottles",
      "A CTU counter with the sensor signal connected as the count input",
      "A TOF timer holding the output after each bottle passes",
      "An analogue input scaling the sensor output to a count value"
    ],
    correctAnswer: 1,
    explanation: "A CTU counter with the photoelectric sensor as the count input increments by one each time a bottle breaks and remakes the beam (rising edge). The done bit triggers the next operation (e.g., box closure) when the batch preset count is reached."
  },
  {
    id: 9,
    question: "A GRAFCET diagram is:",
    options: [
      "An electrical wiring diagram showing cable routes and terminal numbers",
      "A graphical method for designing sequential control processes, standardised in IEC 60848",
      "A PLC memory allocation chart showing address ranges",
      "A calibration record format for instruments and sensors"
    ],
    correctAnswer: 1,
    explanation: "GRAFCET (IEC 60848) defines steps, transitions, actions, and control flow graphically. It is widely used to design and document sequential programmes before coding in ladder logic, structured text, or SFC. It provides a clear, unambiguous representation of the intended sequence."
  },
  {
    id: 10,
    question: "A timer that is not reaching its preset is most likely caused by:",
    options: [
      "A corrupt timer instruction that needs to be deleted and re-entered",
      "The enable input going FALSE before the preset is reached, causing the timer to reset",
      "The PLC system clock running slower than its specification",
      "A short circuit on the output module driven by the timer"
    ],
    correctAnswer: 1,
    explanation: "For non-retentive timers (TON), if the enable input goes FALSE before the preset is reached, the accumulated value resets to zero. Check via online monitoring for intermittent input dropout — the input may be flickering due to a loose connection or noisy sensor signal."
  },
  {
    id: 11,
    question: "A high-speed counter (HSC) differs from a standard counter because it:",
    options: [
      "Counts in larger increments to save processing time",
      "Counts input pulses via dedicated hardware, independent of the PLC scan cycle",
      "Can only count down, not up",
      "Requires an analogue input module instead of a digital one"
    ],
    correctAnswer: 1,
    explanation: "High-speed counters use dedicated hardware inputs that count independently of the scan cycle. Standard counters can miss pulses that occur faster than the scan time. HSCs are essential for encoder feedback, flow meter pulses, and any application with pulse rates exceeding the scan frequency."
  },
  {
    id: 12,
    question: "Under ST1426, timers and counters are important because:",
    options: [
      "They are only used in robotic applications that maintenance does not service",
      "They form the basis of most automated sequences and process control in industrial machinery",
      "They are not relevant to electrical maintenance technicians",
      "They are only found in domestic heating control systems"
    ],
    correctAnswer: 1,
    explanation: "Timers and counters are fundamental building blocks in virtually every automated process. Maintenance technicians encounter them daily in motor start delays, batch counting, cooling fan run-on, sequential operations, and production monitoring. Understanding their operation is essential for efficient fault diagnosis."
  }
];

const faqs = [
  {
    question: "How do I find a timer's time base in different PLC brands?",
    answer: "Check the timer instruction properties in the programming software. Siemens S7-1200/1500 uses TIME data type (1 ms resolution). Allen-Bradley CompactLogix/ControlLogix uses a 1 ms base by default. Mitsubishi FX series has dedicated timer types (T for 100 ms, ST for 10 ms). Older Siemens S5 uses S5TIME with selectable bases (10 ms, 100 ms, 1 s, 10 s). The project documentation should also specify timer configurations."
  },
  {
    question: "Can a timer and counter share the same number in a PLC?",
    answer: "This depends on the PLC manufacturer and model. Older Mitsubishi FX series PLCs share memory between timers and counters, so T0 and C0 cannot both be used — they would conflict. Modern PLCs (Siemens S7-1200, Allen-Bradley CompactLogix) use separate data blocks or tags for each instruction, so there is no possibility of conflict. Always check the hardware manual for your specific PLC model."
  },
  {
    question: "What is the maximum duration a PLC timer can handle?",
    answer: "This varies by PLC model and data type. A 16-bit timer with a 1-second time base can count up to 32,767 seconds (approximately 9 hours). For longer durations, use retentive timers, cascade multiple timers, or programme a counter that counts minutes or hours using a 1-minute timer pulse. Always check the hardware manual for maximum values and consider using DINT (32-bit) timer data types where available."
  },
  {
    question: "How do I troubleshoot a counter that is not counting correctly?",
    answer: "Systematic checks: (1) Is the count input signal clean — noisy or bouncing signals cause double-counting or missed counts. (2) Is the input transitioning cleanly with definite edges — counters count edges, not levels. (3) Has the counter been inadvertently reset by another part of the programme — use cross-referencing to check. (4) Has the counter overflowed past its maximum integer value. (5) Is the pulse rate exceeding the scan time — if so, a high-speed counter input is needed."
  },
  {
    question: "What is the difference between SFC and GRAFCET?",
    answer: "GRAFCET (IEC 60848) is a design methodology — a graphical specification and documentation tool for sequential processes. SFC (Sequential Function Chart, part of IEC 61131-3) is a PLC programming language that implements the concepts of GRAFCET in actual PLC code. You design the sequence using GRAFCET notation, then implement it in SFC (or translate it into ladder logic or structured text). GRAFCET defines what the sequence should do; SFC is how you programme it."
  }
];

const MOETModule5Section2_4 = () => {
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
            <Clock className="h-4 w-4" />
            <span>Module 5.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Timers, Counters and Sequencing
          </h1>
          <p className="text-white/80">
            Programming timers, counters and sequential control operations in industrial PLC systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>TON:</strong> Delays output ON by preset time after enable</li>
              <li className="pl-1"><strong>TOF:</strong> Keeps output ON for preset time after input goes OFF</li>
              <li className="pl-1"><strong>CTU/CTD:</strong> Count up/down on rising edge of count input</li>
              <li className="pl-1"><strong>Sequencer:</strong> Step-by-step control with transition conditions</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Diagnosis:</strong> Check accumulated vs preset values via online monitoring</li>
              <li className="pl-1"><strong>Run-time tracking:</strong> Retentive timers for maintenance scheduling</li>
              <li className="pl-1"><strong>Batch control:</strong> Counters for production counting and dispensing</li>
              <li className="pl-1"><strong>ST1426:</strong> Understand automated sequences for fault diagnosis</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain TON, TOF and TP timer operations and their industrial applications",
              "Configure CTU and CTD counters for production counting and batch control",
              "Distinguish between retentive and non-retentive timer behaviour",
              "Design basic sequential control using step-transition logic and GRAFCET",
              "Diagnose timer and counter faults using online monitoring techniques",
              "Apply cascaded timers and high-speed counters for advanced applications"
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
            PLC Timer Instructions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Timers are among the most frequently used PLC instructions, controlling delays, pulse durations, and timed sequences throughout industrial processes. Every automated machine uses timers — from simple motor start delays to complex multi-stage process timing. Understanding how each timer type works is essential for diagnosing why a machine is not advancing, why an output stays on too long, or why a sequence is stuck.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Timer</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reset Behaviour</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">TON</td><td className="border border-white/10 px-3 py-2">Output ON after preset; resets when input FALSE</td><td className="border border-white/10 px-3 py-2">Non-retentive (resets to zero)</td><td className="border border-white/10 px-3 py-2">Motor start delay, debounce</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">TOF</td><td className="border border-white/10 px-3 py-2">Output stays ON for preset time after input FALSE</td><td className="border border-white/10 px-3 py-2">Non-retentive</td><td className="border border-white/10 px-3 py-2">Cooling fan run-on, light delay</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">TP</td><td className="border border-white/10 px-3 py-2">Fixed-duration pulse on rising edge</td><td className="border border-white/10 px-3 py-2">Runs to completion</td><td className="border border-white/10 px-3 py-2">Solenoid pulse, signal shaping</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">TONR</td><td className="border border-white/10 px-3 py-2">Accumulates time; retains when input FALSE</td><td className="border border-white/10 px-3 py-2">Retentive (requires explicit reset)</td><td className="border border-white/10 px-3 py-2">Total run-time, maintenance alerts</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Timer Data Structure</p>
              <p className="text-sm text-white mb-3">
                Every timer instruction has the same fundamental data elements, regardless of PLC brand:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Preset (PT/PV):</strong> The target time value set by the programmer — the duration before the done bit activates</li>
                <li className="pl-1"><strong>Elapsed (ET/CV):</strong> The current elapsed time since the timer started counting — this increments while the timer is running</li>
                <li className="pl-1"><strong>Done bit (Q/DN):</strong> Turns ON when the elapsed time reaches the preset — this is the output used in programme logic</li>
                <li className="pl-1"><strong>Enable (IN/EN):</strong> The input that starts timing — the timer runs while this is TRUE (for TON/TONR)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> When diagnosing a timer issue online, check the elapsed value (ET) against the preset (PT). If ET is counting but never reaches PT, the enable input is dropping out before completion. If ET stays at zero, the enable input is never going TRUE. If ET has reached PT but the expected action has not occurred, the done bit may be blocked by downstream logic.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Counter Instructions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Counters track discrete events — sensor pulses, machine cycles, products produced, parts dispensed. Unlike timers which measure duration, counters respond to signal transitions (edges) and increment or decrement their accumulated value by one per event. They are fundamental to batch control, production monitoring, and any application that requires a specific number of events before the next action.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">CTU -- Count Up</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Starts at zero, increments by one on each rising edge</li>
                  <li className="pl-1">Done bit turns ON when accumulated reaches preset</li>
                  <li className="pl-1">Reset input clears accumulated to zero</li>
                  <li className="pl-1">Continues counting past preset unless reset</li>
                  <li className="pl-1">Example: counting bottles into a box</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">CTD -- Count Down</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Starts at preset value, decrements on each pulse</li>
                  <li className="pl-1">Done bit turns ON when accumulated reaches zero</li>
                  <li className="pl-1">Load input resets accumulated to preset value</li>
                  <li className="pl-1">Useful for "remaining items" displays</li>
                  <li className="pl-1">Example: dispensing a fixed quantity of fasteners</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CTUD -- Bidirectional Counter</p>
              <p className="text-sm text-white mb-3">
                A CTUD (Count Up/Down) has separate count-up and count-down inputs and can track both additions and removals. This is useful for:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Tracking items entering and leaving a buffer zone on a conveyor</li>
                <li className="pl-1">Monitoring parking space availability (entry sensor counts up, exit counts down)</li>
                <li className="pl-1">Stock level monitoring in automated warehousing</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Counter Input Bounce</p>
              <p className="text-sm text-white">
                Mechanical switches and some sensors produce contact bounce — multiple rapid transitions when they change state. This causes the counter to register multiple counts for a single event. Solutions include: hardware debouncing (RC filter on the input), using sensors with clean electronic outputs (e.g., photoelectric rather than mechanical), or adding a software debounce timer before the counter input. Always verify the count accuracy during commissioning.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Sequential Control and GRAFCET
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Many industrial processes follow fixed sequences: fill a vessel, heat to temperature, mix for a duration, cool, drain, and repeat. Sequential programmes manage these step-by-step operations, ensuring each action occurs in the correct order and only when the previous step has completed successfully. Understanding sequential control is essential for diagnosing "stuck machine" faults — the most common complaint in automated manufacturing.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Elements of Sequential Control</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Steps:</strong> Each step represents a state of the machine with specific outputs active and actions being performed</li>
                <li className="pl-1"><strong>Transitions:</strong> Conditions that must be satisfied to advance from one step to the next</li>
                <li className="pl-1"><strong>Actions:</strong> The outputs and operations associated with each step (e.g., open valve, start motor, energise heater)</li>
                <li className="pl-1"><strong>Initial step:</strong> The starting point of the sequence after reset or power-up — typically an "idle" or "home position" state</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Implementation Methods</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Bit-based (flag method):</strong> Uses individual memory bits (M-bits) as step flags. Only one step bit is active at any time. The transition logic sets the next step bit and resets the current one.</li>
                <li className="pl-1"><strong>Integer-based (step register):</strong> A single integer variable holds the current step number. Transition logic increments (or sets) the step number. CASE or comparison instructions select the active step's outputs.</li>
                <li className="pl-1"><strong>SFC (Sequential Function Chart):</strong> A dedicated IEC 61131-3 graphical programming language purpose-built for sequential control. Steps and transitions are drawn graphically; actions within each step can be written in any IEC language.</li>
                <li className="pl-1"><strong>GRAFCET (IEC 60848):</strong> A design methodology and documentation standard for sequential processes. Used to design the sequence before coding. GRAFCET diagrams define steps, transitions, parallel branches (simultaneous sequences), and selection branches (alternative paths).</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> When a machine is stuck and not advancing to the next step, identify the active step (check step flags or the step register value online) and then examine the transition condition for that step. The machine is waiting for that specific condition to become TRUE. The fault is almost always in the field — a sensor not detecting, a limit switch not reaching, or a process condition not being met.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical Fault Diagnosis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Efficient diagnosis of timer, counter, and sequencer faults directly reduces maintenance response time and improves plant availability. The PLC programming software provides all the tools needed — online monitoring, watch tables, and cross-referencing — to systematically identify why a timed or counted operation is not behaving as expected.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Timer Faults</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Timer not reaching preset (enable input intermittent)</li>
                  <li className="pl-1">Timer reaching preset but output not activating (downstream logic blocking)</li>
                  <li className="pl-1">Timer running too fast or slow (wrong time base configured)</li>
                  <li className="pl-1">Retentive timer never resetting (reset condition not met)</li>
                  <li className="pl-1">Timer preset changed by HMI to incorrect value</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Counter Faults</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Counter double-counting (input bounce or noise)</li>
                  <li className="pl-1">Counter missing counts (pulse rate exceeds scan time)</li>
                  <li className="pl-1">Counter not resetting (reset logic fault or timing)</li>
                  <li className="pl-1">Counter overflowing past maximum integer value</li>
                  <li className="pl-1">Incorrect preset value loaded by operator</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Online Diagnosis Steps</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>1.</strong> Go online and navigate to the timer or counter instruction in the programme</li>
                <li className="pl-1"><strong>2.</strong> Check the accumulated value (ET/CV) — is it counting? Is it stuck at zero? Has it reached the preset?</li>
                <li className="pl-1"><strong>3.</strong> Verify the enable/count input is stable — watch for flickering or intermittent dropout</li>
                <li className="pl-1"><strong>4.</strong> Check the done bit status — if it is ON, follow the logic downstream to find why the expected action is not happening</li>
                <li className="pl-1"><strong>5.</strong> Verify the reset condition — use cross-referencing to find what resets the timer/counter and check if it is activating unexpectedly</li>
                <li className="pl-1"><strong>6.</strong> Compare the preset value with documentation — it may have been changed by an operator or during previous maintenance</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Advanced Timer and Counter Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond basic timing and counting, these instructions are combined in sophisticated ways to create complex automated behaviour. Understanding these advanced patterns helps you diagnose more complex faults and appreciate why machines behave the way they do.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cascaded Timers</p>
              <p className="text-sm text-white mb-3">
                When the required delay exceeds the maximum value of a single timer, multiple timers are cascaded — the done bit of one timer enables the next. The total delay is the sum of all presets.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Timer 1: 30,000 seconds (done bit enables Timer 2)</li>
                <li className="pl-1">Timer 2: 6,000 seconds (total = 36,000 seconds = 10 hours)</li>
                <li className="pl-1">Also used to create multiple timed events within one operation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Oscillating Timer (Flasher)</p>
              <p className="text-sm text-white mb-3">
                Two TON timers can be cross-connected to create an oscillating output (flasher). Timer 1's done bit enables Timer 2 and resets Timer 1. Timer 2's done bit resets Timer 2 and restarts Timer 1. The result is a continuously toggling output with independently adjustable ON and OFF periods.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Used for warning beacons, intermittent lubrication, and cyclic operations</li>
                <li className="pl-1">ON time and OFF time can be set independently via the two presets</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">High-Speed Counters</p>
              <p className="text-sm text-white mb-3">
                Standard PLC counters are limited by the scan cycle — if pulses arrive faster than the scan time, counts are missed. High-speed counter (HSC) inputs use dedicated hardware that counts independently:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Encoder feedback:</strong> Incremental encoders on motors, conveyors, and positioning systems</li>
                <li className="pl-1"><strong>Flow measurement:</strong> Turbine flow meters generating pulses proportional to flow rate</li>
                <li className="pl-1"><strong>Frequency measurement:</strong> Converting pulse frequency to speed or rate values</li>
                <li className="pl-1">Typical HSC capability: 10 kHz to 200 kHz depending on PLC model</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians are expected to understand the operation of timers, counters, and sequential control as used in industrial automation. This includes diagnosing faults in timed and counted operations, understanding sequence progression, and using online monitoring to identify stuck steps and failed transitions.
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
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Ladder Logic Basics
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section2-5">
              Next: PLC Programming Software
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section2_4;
