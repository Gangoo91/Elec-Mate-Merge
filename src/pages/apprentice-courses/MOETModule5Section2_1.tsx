import { ArrowLeft, Cpu, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "PLC Hardware and Architecture - MOET Module 5 Section 2.1";
const DESCRIPTION = "Comprehensive guide to PLC hardware and architecture for electrical maintenance technicians: CPU modules, memory types, power supplies, rack systems, modular and compact PLCs. ST1426 aligned.";

const quickCheckQuestions = [
  {
    id: "plc-cpu-role",
    question: "What is the primary function of the CPU module in a PLC?",
    options: [
      "To provide power to all I/O modules",
      "To execute the stored program by reading inputs, processing logic and updating outputs",
      "To convert analogue signals to digital",
      "To display the process status on a screen"
    ],
    correctIndex: 1,
    explanation: "The CPU is the brain of the PLC. It continuously executes the scan cycle: reading all inputs, processing the program logic, and updating the outputs. This cycle typically takes between 1 and 100 milliseconds depending on program complexity and CPU speed."
  },
  {
    id: "plc-memory-types",
    question: "Which type of PLC memory retains its contents when power is removed?",
    options: [
      "RAM (Random Access Memory)",
      "The output image table",
      "Flash memory or EEPROM (non-volatile memory)",
      "The input image table"
    ],
    correctIndex: 2,
    explanation: "Flash memory and EEPROM are non-volatile — they retain data when power is removed. The PLC program is stored in non-volatile memory so it is not lost during a power failure. RAM is used for the working data (input/output image tables, timers, counters) and is volatile, meaning it is cleared when power is lost."
  },
  {
    id: "plc-scan-cycle",
    question: "The correct order of the PLC scan cycle is:",
    options: [
      "Update outputs, read inputs, execute program",
      "Execute program, update outputs, read inputs",
      "Read inputs, execute program, update outputs",
      "Read inputs, update outputs, execute program"
    ],
    correctIndex: 2,
    explanation: "The PLC scan cycle follows a fixed sequence: (1) Read all inputs into the input image table, (2) Execute the program logic using the input image table data, (3) Update all physical outputs from the output image table. This cycle then repeats continuously. The scan time is the total time for one complete cycle."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A PLC is best described as:",
    options: [
      "A general-purpose desktop computer used in offices",
      "A ruggedised industrial computer designed to control machines and processes using a stored program",
      "A type of variable speed drive for motors",
      "A network switch for industrial communications"
    ],
    correctAnswer: 1,
    explanation: "A Programmable Logic Controller (PLC) is a purpose-built industrial computer designed to withstand harsh environments (vibration, temperature, electrical noise) while reliably controlling machines and processes. It replaces hardwired relay logic with a flexible, reprogrammable system."
  },
  {
    id: 2,
    question: "In a modular PLC system, what is the purpose of the backplane?",
    options: [
      "To mount the PLC on a wall",
      "To provide the communication bus and power distribution between the CPU and I/O modules",
      "To protect the PLC from dust",
      "To connect the PLC to the internet"
    ],
    correctAnswer: 1,
    explanation: "The backplane (or rack) provides the physical mounting for modules and the electrical connections between them. It carries the data bus (for communication between CPU and I/O modules), the address bus (for module identification), and the power bus (for distributing the PSU output to all modules)."
  },
  {
    id: 3,
    question: "The PLC scan time is affected by:",
    options: [
      "The colour of the indicator LEDs",
      "The length of the program, the number of I/O points and the CPU processing speed",
      "The brand of cable used for field wiring",
      "The ambient temperature of the control panel"
    ],
    correctAnswer: 1,
    explanation: "Scan time depends on: the number of instructions in the program (longer programs take more time to execute), the number of I/O points (more points take longer to read/write), and the CPU speed (faster processors complete each instruction more quickly). Typical scan times range from 1 ms for small programs to 100 ms for very large systems."
  },
  {
    id: 4,
    question: "What happens to the PLC outputs if the CPU detects a fatal error during program execution?",
    options: [
      "All outputs remain in their last state indefinitely",
      "The CPU enters FAULT mode and all outputs are switched off (de-energised) for safety",
      "The program restarts from the beginning",
      "The outputs switch on and off randomly"
    ],
    correctAnswer: 1,
    explanation: "When a fatal error is detected (such as a watchdog timer timeout, memory fault or hardware failure), the CPU enters FAULT mode and de-energises all outputs. This is a fundamental safety feature — the PLC defaults to a safe state rather than leaving outputs in an unpredictable condition. The fault must be diagnosed and cleared before the PLC can be restarted."
  },
  {
    id: 5,
    question: "The watchdog timer in a PLC is used to:",
    options: [
      "Keep track of the time of day for scheduling",
      "Detect if the scan cycle takes longer than expected, indicating a program or hardware fault",
      "Count the number of times an input is activated",
      "Time the duration of output pulses"
    ],
    correctAnswer: 1,
    explanation: "The watchdog timer monitors the scan cycle duration. If a scan takes longer than the configured maximum (indicating the program is stuck in a loop or the CPU has a fault), the watchdog triggers a fault and shuts down the outputs. This prevents the PLC from running in an uncontrolled state."
  },
  {
    id: 6,
    question: "A compact (fixed) PLC differs from a modular PLC in that:",
    options: [
      "It cannot be programmed",
      "The CPU, power supply and a fixed number of I/O points are all in one unit",
      "It can only be used for temperature control",
      "It is always more expensive than a modular system"
    ],
    correctAnswer: 1,
    explanation: "Compact PLCs integrate the CPU, power supply and a fixed set of I/O in a single housing. They are cost-effective for small applications but offer limited expandability. Modular PLCs use separate modules for CPU, PSU and I/O, mounted on a rack, allowing flexible configuration and easy expansion."
  },
  {
    id: 7,
    question: "The input image table in a PLC stores:",
    options: [
      "The program instructions",
      "A snapshot of all input states taken at the start of each scan cycle",
      "The physical wiring diagram of the inputs",
      "Alarm messages for the operator"
    ],
    correctAnswer: 1,
    explanation: "At the start of each scan, the PLC reads all physical inputs and stores their states (ON/OFF for digital, numerical values for analogue) in the input image table. The program then uses this table rather than reading the physical inputs directly. This ensures consistent data throughout the scan — inputs do not change mid-scan."
  },
  {
    id: 8,
    question: "When replacing a PLC CPU module, the maintenance technician should:",
    options: [
      "Simply swap the module and power on — no other action needed",
      "Isolate the power, note the firmware version, transfer the program, verify configuration and test before returning to service",
      "Replace all I/O modules at the same time",
      "Only replace it during a full plant shutdown"
    ],
    correctAnswer: 1,
    explanation: "Replacing a CPU requires: isolating power (safe isolation procedure), recording the firmware version and configuration of the old CPU, downloading the correct program to the new CPU, verifying all configuration parameters (IP address, I/O mapping, communication settings), and performing a thorough test of all I/O and program functions before returning to service."
  },
  {
    id: 9,
    question: "Battery-backed RAM in a PLC is used to:",
    options: [
      "Power the output modules during mains failure",
      "Retain program data, timer values and counter values during short power outages",
      "Charge the operator's mobile phone",
      "Provide emergency lighting in the control room"
    ],
    correctAnswer: 1,
    explanation: "Battery-backed RAM retains volatile data (such as timer accumulated values, counter values, retentive data registers and sometimes the program) during power failures. The battery is typically a lithium cell with a life of 3-5 years. Low battery warnings should be acted upon promptly to prevent data loss."
  },
  {
    id: 10,
    question: "A PLC power supply module typically provides:",
    options: [
      "230 V AC to all I/O modules",
      "Regulated DC voltages (commonly 5 V for the backplane logic and 24 V for I/O) from the mains supply",
      "Three-phase power for motor drives",
      "110 V DC for field instruments"
    ],
    correctAnswer: 1,
    explanation: "The PLC PSU converts the incoming supply (typically 110/230 V AC or 24 V DC) into the regulated DC voltages needed by the system. The backplane logic typically runs on 5 V DC, while I/O modules and field devices commonly use 24 V DC. The PSU must be rated to supply the total current demand of all installed modules."
  }
];

const faqs = [
  {
    question: "What is the difference between a PLC and a PAC?",
    answer: "A PAC (Programmable Automation Controller) is an evolution of the PLC that combines traditional PLC functionality with features more commonly found in PCs — such as advanced data processing, multiple programming languages, database connectivity and built-in networking. In practice, the boundary between PLCs and PACs has become blurred, with modern PLCs offering many PAC-like features. The maintenance approach is fundamentally the same."
  },
  {
    question: "How often should PLC batteries be replaced?",
    answer: "Most PLC manufacturers recommend replacing the backup battery every 2-3 years, regardless of whether a low battery alarm has been triggered. Many organisations include battery replacement in their planned preventive maintenance schedule. Always replace the battery with the PLC powered on (if the manufacturer's instructions allow this) to prevent data loss during the changeover."
  },
  {
    question: "Can I hot-swap I/O modules on a running PLC?",
    answer: "Some modern PLC platforms support hot-swapping of I/O modules — removing and replacing a module without shutting down the CPU. However, this is not universal and depends on the PLC manufacturer and model. Always check the manufacturer's documentation before attempting a hot-swap. Even where supported, a risk assessment should be carried out to consider the effect of temporarily losing the affected I/O points."
  },
  {
    question: "What environmental conditions should a PLC be installed in?",
    answer: "PLCs are designed for industrial environments but still have operating limits. Typical specifications include: ambient temperature 0-60 degrees C, relative humidity 5-95% non-condensing, no corrosive gases, and installation in a suitable enclosure (typically IP54 or better). The enclosure should provide adequate ventilation or cooling if heat dissipation from the PLC and other panel components is significant."
  }
];

const MOETModule5Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Cpu className="h-4 w-4" />
            <span>Module 5.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            PLC Hardware and Architecture
          </h1>
          <p className="text-white/80">
            CPU modules, memory types, power supplies and system architecture
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>PLC:</strong> Ruggedised industrial computer for machine/process control</li>
              <li className="pl-1"><strong>Scan cycle:</strong> Read inputs, execute program, update outputs (repeat)</li>
              <li className="pl-1"><strong>Architecture:</strong> CPU, PSU, I/O modules on a backplane/rack</li>
              <li className="pl-1"><strong>Memory:</strong> Non-volatile (program storage) + RAM (working data)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fault LEDs:</strong> CPU status, module faults, communication errors</li>
              <li className="pl-1"><strong>Battery:</strong> Replace every 2-3 years to protect retentive data</li>
              <li className="pl-1"><strong>Program backup:</strong> Always maintain current backup before maintenance</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to control systems and automation KSBs</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the main hardware components of a PLC system",
              "Explain the function of the CPU, PSU and backplane",
              "Describe the PLC scan cycle and its significance for maintenance",
              "Distinguish between volatile and non-volatile memory in PLCs",
              "Compare compact and modular PLC architectures",
              "Apply safe maintenance procedures when working on PLC hardware"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is a PLC?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A Programmable Logic Controller (PLC) is a purpose-built industrial computer designed to control
              manufacturing processes, machines and other automated systems. Developed in the late 1960s to replace
              hardwired relay panels, PLCs offer the flexibility of software-based control with the reliability and
              ruggedness needed for industrial environments.
            </p>
            <p>
              Unlike general-purpose computers, PLCs are designed to operate in harsh conditions: temperature
              extremes, vibration, electrical noise, dust and humidity. They use specialised input/output (I/O)
              modules to interface directly with field devices such as sensors, switches, motors, valves and
              indicator lights.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key PLC Characteristics</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Deterministic operation:</strong> The scan cycle executes in a predictable, repeatable time</li>
                <li className="pl-1"><strong>Real-time control:</strong> Outputs respond to input changes within the scan time (typically milliseconds)</li>
                <li className="pl-1"><strong>Rugged construction:</strong> Designed for industrial environments with wide temperature ranges and high vibration</li>
                <li className="pl-1"><strong>Modular design:</strong> I/O capacity can be expanded by adding modules to the rack</li>
                <li className="pl-1"><strong>Multiple programming languages:</strong> Ladder logic, function block, structured text, instruction list, sequential function chart (IEC 61131-3)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            PLC System Architecture
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A typical modular PLC system consists of several key components mounted on a rack or baseplate. Understanding
              the function of each component is essential for effective maintenance and fault diagnosis.
            </p>
            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Maintenance Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Rack / Backplane</td>
                      <td className="border border-white/10 px-3 py-2">Physical mounting and electrical interconnection of all modules</td>
                      <td className="border border-white/10 px-3 py-2">Check for corrosion on bus connectors; ensure modules are fully seated</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Power Supply (PSU)</td>
                      <td className="border border-white/10 px-3 py-2">Converts mains supply to regulated DC for all modules</td>
                      <td className="border border-white/10 px-3 py-2">Check output voltage, verify current capacity for installed modules</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">CPU Module</td>
                      <td className="border border-white/10 px-3 py-2">Executes the stored program, manages communications</td>
                      <td className="border border-white/10 px-3 py-2">Monitor LED indicators, check battery status, maintain program backups</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">I/O Modules</td>
                      <td className="border border-white/10 px-3 py-2">Interface between field devices and the CPU</td>
                      <td className="border border-white/10 px-3 py-2">Check LED status indicators, verify terminal connections, test with known inputs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Communication Modules</td>
                      <td className="border border-white/10 px-3 py-2">Provide network connectivity (Ethernet/IP, Profinet, Modbus)</td>
                      <td className="border border-white/10 px-3 py-2">Check link LEDs, verify IP addresses, monitor error counters</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Compact PLCs</h3>
                <p className="text-sm text-white">
                  All-in-one units with CPU, PSU and a fixed number of I/O points in a single housing. Ideal for
                  small applications (typically 10-40 I/O points). Lower cost but limited expandability. Examples
                  include the Siemens S7-1200 and Allen-Bradley Micro800 series.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Modular PLCs</h3>
                <p className="text-sm text-white">
                  Separate modules for CPU, PSU and I/O mounted on a rack. Highly flexible and expandable — modules
                  can be added, removed or changed to suit the application. Used for medium to large systems (hundreds
                  to thousands of I/O points). Examples include Siemens S7-1500 and Allen-Bradley ControlLogix.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            The PLC Scan Cycle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The scan cycle is the fundamental operating principle of every PLC. Understanding it is critical for
              both programming and maintenance, as it determines how quickly the PLC responds to input changes and
              how program logic is executed.
            </p>
            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">The Three Phases</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Phase 1 — Input scan:</strong> The CPU reads the state of all physical inputs and stores them in the input image table (a block of memory). All program decisions during this scan are based on this snapshot.</li>
                  <li className="pl-1"><strong>Phase 2 — Program execution:</strong> The CPU executes the program from the first instruction to the last, using the input image table for input data and writing results to the output image table.</li>
                  <li className="pl-1"><strong>Phase 3 — Output update:</strong> The CPU writes the entire output image table to the physical outputs simultaneously. All outputs change at the same moment.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <p className="text-sm font-medium text-orange-400 mb-2">Scan Time and Response</p>
                <p className="text-sm text-white">
                  A very short input pulse (shorter than one scan cycle) could be missed entirely because the input
                  might be ON between scans. For critical fast inputs, PLCs offer high-speed counter inputs and
                  interrupt-driven routines that operate outside the normal scan cycle. When fault-finding, remember
                  that the PLC only 'sees' what was present during the input scan phase.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Memory Types and Program Storage
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PLC memory is divided into several areas, each serving a different purpose. Understanding memory
              architecture is important for maintenance, particularly when backing up programs, replacing CPUs
              or diagnosing data-related faults.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Memory Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Volatile?</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Contents</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flash / EEPROM</td>
                      <td className="border border-white/10 px-3 py-2">Non-volatile</td>
                      <td className="border border-white/10 px-3 py-2">Program storage, firmware, configuration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RAM (battery-backed)</td>
                      <td className="border border-white/10 px-3 py-2">Volatile (battery protected)</td>
                      <td className="border border-white/10 px-3 py-2">Working program, retentive data registers, timer/counter values</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RAM (non-backed)</td>
                      <td className="border border-white/10 px-3 py-2">Volatile</td>
                      <td className="border border-white/10 px-3 py-2">Input/output image tables, temporary data, system overhead</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Memory card slot</td>
                      <td className="border border-white/10 px-3 py-2">Non-volatile (removable)</td>
                      <td className="border border-white/10 px-3 py-2">Program backup, data logging, recipe storage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> Always maintain a current backup of the PLC program on a memory card
              and/or on a secure network location. Before performing any maintenance that involves powering down the
              PLC or replacing hardware, verify that the backup is current and can be restored.
            </p>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

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

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">PLC Scan Cycle</p>
                <ul className="space-y-0.5">
                  <li>1. Read all inputs to image table</li>
                  <li>2. Execute program logic</li>
                  <li>3. Update all outputs from image table</li>
                  <li>4. Housekeeping and communications</li>
                  <li>5. Repeat continuously</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">CPU Status LEDs</p>
                <ul className="space-y-0.5">
                  <li>RUN (green) — Program executing normally</li>
                  <li>STOP (amber) — Program halted</li>
                  <li>FAULT (red) — Fatal error detected</li>
                  <li>COMM (flashing) — Communication active</li>
                  <li>BAT (amber) — Low battery warning</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section2-2">
              Next: Input/Output Devices
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule5Section2_1;
