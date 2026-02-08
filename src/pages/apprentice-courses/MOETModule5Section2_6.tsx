import { ArrowLeft, Wrench, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Troubleshooting PLC Systems - MOET Module 5 Section 2.6";
const DESCRIPTION = "Comprehensive guide to PLC troubleshooting for electrical maintenance technicians. Systematic fault-finding, diagnostic tools, hardware and communication faults, preventive maintenance and documentation. ST1426 aligned.";

const quickCheckQuestions = [
  {
    id: "plc-systematic",
    question: "What is the first step in systematic PLC troubleshooting?",
    options: [
      "Replace the CPU module immediately",
      "Gather information: observe symptoms, check fault LEDs, read the diagnostic buffer",
      "Rewrite the entire PLC programme from scratch",
      "Switch the PLC off and on again without investigation"
    ],
    correctIndex: 1,
    explanation: "Always start by gathering information. Check status LEDs on the PLC and I/O modules, read the diagnostic buffer for error codes, observe the machine behaviour, and ask the operator what happened and when. This narrows down the fault area before any physical intervention."
  },
  {
    id: "plc-comm-fault",
    question: "A PLC communication fault is typically indicated by:",
    options: [
      "All output LEDs turning on simultaneously",
      "The COMM LED going off or flashing an error pattern, with loss of HMI and SCADA connectivity",
      "The RUN LED turning solid green",
      "An increase in the programme scan time only"
    ],
    correctIndex: 1,
    explanation: "Communication faults are indicated by COMM/NET LED errors and loss of connectivity to HMIs, SCADA, or remote I/O stations. Check cable connections, network switches, IP address settings, and communication parameters."
  },
  {
    id: "plc-battery",
    question: "A low battery warning on a PLC typically means:",
    options: [
      "The PLC needs a new mains power supply module",
      "The backup battery that maintains RAM contents during power loss needs replacing promptly",
      "The PLC firmware is out of date and needs updating",
      "An output fuse has blown on one of the I/O modules"
    ],
    correctIndex: 1,
    explanation: "Many PLCs use a lithium battery to maintain RAM data (retentive timers, counters, data registers, and sometimes the programme) during power loss. When the battery is low, this data may be lost on the next power cycle. Replace the battery promptly — some PLCs allow hot-swap if done within a few seconds."
  },
  {
    id: "plc-output-led",
    question: "A PLC output LED is ON but the field device connected to that output is not operating. The fault is most likely:",
    options: [
      "In the PLC programme logic — the wrong output is being energised",
      "In the field wiring, the output fuse, or the field device itself — downstream of the PLC output",
      "In the PLC CPU module — it needs replacing",
      "In the PLC power supply — insufficient voltage is available"
    ],
    correctIndex: 1,
    explanation: "If the output LED is ON, the PLC is driving the output correctly. The fault is downstream: check the output module fuse (if fitted), the wiring between the PLC and the field device, terminal connections, and the field device itself (contactor coil, solenoid valve, indicator lamp)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The PLC diagnostic buffer contains:",
    options: [
      "The complete ladder logic programme for the machine",
      "A chronological log of faults, errors and system events with timestamps",
      "Analogue input data trends from process instruments",
      "Motor run-time accumulation records"
    ],
    correctAnswer: 1,
    explanation: "The diagnostic buffer records timestamped fault events, error codes, and system changes. Reading it reveals what happened and when — this is essential for diagnosing intermittent faults and understanding the sequence of events leading to a failure."
  },
  {
    id: 2,
    question: "A PLC scan time that has suddenly increased may indicate:",
    options: [
      "Normal operation under varying production loads",
      "A programme fault causing excessive processing, a communication timeout, or added programme complexity",
      "The PLC is running at optimal performance",
      "The power supply voltage is slightly above nominal"
    ],
    correctAnswer: 1,
    explanation: "Scan time increases when the PLC has more to process — often due to programme errors (infinite loops, excessive data manipulation), communication timeouts waiting for unresponsive devices, or newly added programme sections. Excessive scan time can cause missed fast inputs and, in extreme cases, a watchdog timeout fault."
  },
  {
    id: 3,
    question: "To check if a PLC is executing its programme logic correctly, the primary tool is:",
    options: [
      "A multimeter measuring the power supply voltage",
      "Online monitoring in the PLC programming software to view programme execution in real time",
      "An insulation resistance tester on the I/O wiring",
      "A thermal imaging camera pointed at the PLC rack"
    ],
    correctAnswer: 1,
    explanation: "Online monitoring shows the live state of the programme — which contacts are active, which coils are energised, timer/counter values, and data register contents. This is the primary tool for logic-level fault diagnosis, revealing exactly where the programme logic departs from expected behaviour."
  },
  {
    id: 4,
    question: "A watchdog timer in a PLC:",
    options: [
      "Controls the timing of output signals to field devices",
      "Monitors the scan cycle duration and triggers a fault if it exceeds a configured limit",
      "Counts the number of input pulses from a proximity sensor",
      "Replaces the backup battery for data retention"
    ],
    correctAnswer: 1,
    explanation: "The watchdog timer monitors each scan cycle. If the scan takes longer than the configured watchdog limit (indicating a programme fault, infinite loop, or CPU issue), the PLC enters a fault state and typically de-energises all outputs for safety. The watchdog timeout value is set in the hardware configuration."
  },
  {
    id: 5,
    question: "When replacing a PLC CPU module, the critical steps include:",
    options: [
      "Simply swapping the module and powering on",
      "Backing up the programme, noting the hardware configuration, replacing the module, restoring the programme, and verifying operation",
      "Only replacing if the module is still under manufacturer warranty",
      "Waiting for the manufacturer's service engineer to attend site"
    ],
    correctAnswer: 1,
    explanation: "Before replacement: back up the current programme (if possible — the existing CPU may still allow upload). After replacement: restore the programme, verify the hardware configuration matches, check the diagnostic buffer for new errors, and test all I/O systematically before returning the machine to service."
  },
  {
    id: 6,
    question: "Electromagnetic interference (EMI) can cause PLC faults such as:",
    options: [
      "Mechanical wear on output relay contacts",
      "Spurious input signals, communication errors, and data corruption",
      "Output fuse failures due to overcurrent",
      "Low battery warnings on the CPU module"
    ],
    correctAnswer: 1,
    explanation: "EMI from variable frequency drives, welding equipment, and high-voltage switchgear can induce false signals on input wiring, corrupt serial communications, and cause intermittent data errors. Shielded cables, proper earthing, physical separation from power cables, and correctly installed EMC filters are the primary defences."
  },
  {
    id: 7,
    question: "A PLC in STOP mode:",
    options: [
      "Is executing the programme normally at reduced speed",
      "Has halted programme execution — outputs are typically de-energised or held in a configured safe state",
      "Is running a self-diagnostic test cycle",
      "Is updating its firmware automatically"
    ],
    correctAnswer: 1,
    explanation: "In STOP mode, the PLC halts programme execution. Outputs go to their configured default state (usually all OFF, but this is configurable). The PLC still communicates with the programming software, allowing programme upload, download, and hardware diagnostics."
  },
  {
    id: 8,
    question: "Preventive maintenance for a PLC system should include:",
    options: [
      "No maintenance at all — PLCs are maintenance-free for life",
      "Checking terminal connections, cleaning ventilation filters, monitoring temperature, verifying backups and testing the battery",
      "Replacing the CPU module annually as standard practice",
      "Rewriting the programme from scratch every year"
    ],
    correctAnswer: 1,
    explanation: "PLCs are highly reliable but benefit from periodic preventive maintenance: check terminal connections for tightness (especially on I/O modules), clean enclosure ventilation filters, monitor operating temperature against specifications, verify programme backups are current, and check the backup battery status."
  },
  {
    id: 9,
    question: "A bus fault on a PLC rack indicates:",
    options: [
      "A problem with the transport bus serving the factory",
      "A communication failure between modules on the PLC backplane bus",
      "An input signal exceeding the maximum voltage rating",
      "A syntax error in the programme that prevents compilation"
    ],
    correctAnswer: 1,
    explanation: "A bus fault indicates the internal communication between the CPU and I/O modules on the backplane has failed. Common causes include a faulty module, a module not fully seated in its slot, a damaged backplane connector, or an incompatible module type. Reseat modules firmly and check for physical damage."
  },
  {
    id: 10,
    question: "When a PLC programme is running but an output is not activating as expected, the logical diagnostic sequence is:",
    options: [
      "Replace the output module immediately without further investigation",
      "Check the programme logic online first, then check the output LED, then check field wiring and the field device",
      "Restart the PLC and hope the fault clears",
      "Check only the input devices — the fault must be upstream"
    ],
    correctAnswer: 1,
    explanation: "Start with the programme: is the output coil energised in the logic? If yes, check the module output LED. If the LED is ON, check downstream: output fuse, wiring, connections, field device. This inside-out approach systematically eliminates each possible fault location without wasting time."
  },
  {
    id: 11,
    question: "Intermittent PLC faults are best diagnosed by:",
    options: [
      "Replacing all modules simultaneously to eliminate the problem",
      "Using the diagnostic buffer timestamps, data logging, trend recording, and systematic environmental checks",
      "Waiting until the fault becomes permanent before investigating",
      "Ignoring them if production is not significantly affected"
    ],
    correctAnswer: 1,
    explanation: "Intermittent faults require systematic investigation: review diagnostic buffer timestamps for patterns, set up data logging or trending to capture the fault condition, check for thermal issues (does the fault occur when equipment is hot?), look for EMI correlations (does it happen when specific equipment operates?), and perform wiggle tests on connections with appropriate caution."
  },
  {
    id: 12,
    question: "Under ST1426, PLC troubleshooting competency includes:",
    options: [
      "Only the ability to replace hardware modules",
      "Systematic fault diagnosis, correct use of diagnostic tools, safe isolation, documentation and contribution to continuous improvement",
      "Only the ability to monitor the PLC online without intervention",
      "Only writing new programmes when the existing one fails"
    ],
    correctAnswer: 1,
    explanation: "ST1426 requires a comprehensive approach: systematic diagnosis following a structured methodology, correct use of programming software and test equipment, safe working practices including isolation and permits, accurate documentation of findings and corrective actions, and contribution to continuous improvement of maintenance processes."
  }
];

const faqs = [
  {
    question: "What are the most common PLC faults encountered in maintenance?",
    answer: "The most common faults are in the field, not the PLC itself: loose terminal connections, broken wires, failed field devices (sensors, contactors, solenoid valves), and power supply issues. Communication cable faults (damaged Ethernet cables, loose connectors) are also frequent. Environmental problems (excessive heat, moisture ingress, dust accumulation) cause gradual degradation. Actual PLC hardware failure (CPU module, I/O module) is relatively rare compared to field wiring issues."
  },
  {
    question: "How do I diagnose an intermittent PLC fault that cannot be reproduced on demand?",
    answer: "Use the diagnostic buffer to check for timestamps and patterns of fault events. Set up a data log or trend to capture process variables when the fault occurs. Check for loose connections by carefully inspecting terminals (a 'wiggle test' with appropriate caution and risk assessment). Investigate thermal issues — does the fault correlate with ambient temperature or equipment warm-up? Check for EMI sources — does the fault occur when specific equipment (VFDs, welders) is operating? Systematic elimination is key."
  },
  {
    question: "Should I keep spare PLC modules on site?",
    answer: "Yes, for critical plant. Recommended spares include: CPU module (with current programme backup stored alongside it), power supply module, and at least one of each I/O module type used in the installation. Label spares clearly, ensure they are configured to match the installed modules (firmware version, hardware revision), and store the current programme backup with the spare CPU. Having the right spare on the shelf dramatically reduces mean time to repair."
  },
  {
    question: "What causes a PLC to go into fault mode and how do I recover?",
    answer: "Common causes include: watchdog timeout (scan time exceeded the limit), hardware fault (module failure, backplane error), configuration mismatch (module type does not match the hardware configuration), memory error (programme corruption, data overflow), and in some PLCs, runtime errors such as division by zero or array out-of-bounds. Recovery: read the diagnostic buffer for the specific fault code, address the root cause, clear the fault, and transition from STOP to RUN. Some faults require a power cycle after correction."
  },
  {
    question: "How important is documentation when completing a PLC fault repair?",
    answer: "Documentation is essential and is a requirement under ST1426. Record: the fault symptoms as reported, the diagnostic steps you followed, the root cause identified, the corrective action taken, any parts replaced, the date and time, and your name. This information feeds into the maintenance history, supports future fault diagnosis of similar issues, identifies recurring problems that need engineering attention, and provides evidence of competent maintenance practice."
  }
];

const MOETModule5Section2_6 = () => {
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

        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Wrench className="h-4 w-4" />
            <span>Module 5.2.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Troubleshooting PLC Systems
          </h1>
          <p className="text-white/80">
            Diagnostic tools, systematic fault-finding and PLC system maintenance techniques
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Systematic:</strong> Observe, gather info, analyse, test, fix, verify</li>
              <li className="pl-1"><strong>LEDs:</strong> RUN, STOP, FAULT, COMM — first diagnostic indicator</li>
              <li className="pl-1"><strong>Diagnostic buffer:</strong> Timestamped fault history log</li>
              <li className="pl-1"><strong>Online monitoring:</strong> Real-time programme state verification</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Field faults:</strong> Wiring and device issues are the most common cause</li>
              <li className="pl-1"><strong>Spares:</strong> Keep critical CPU, PSU and I/O modules on site</li>
              <li className="pl-1"><strong>PM:</strong> Connections, cooling, battery status, backup verification</li>
              <li className="pl-1"><strong>ST1426:</strong> Systematic diagnosis and documentation competency</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply a systematic six-step fault-finding methodology to PLC systems",
              "Read and interpret PLC status LEDs and diagnostic buffer error codes",
              "Use online monitoring for programme-level fault diagnosis",
              "Identify common hardware, software and communication fault types",
              "Perform preventive maintenance on PLC installations and enclosures",
              "Document faults and corrective actions accurately per ST1426 requirements"
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
            Systematic Troubleshooting Approach
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective PLC troubleshooting follows a systematic process that avoids the common trap of rushing to replace hardware without proper diagnosis. A structured approach identifies the root cause efficiently, reduces mean time to repair, and avoids the costly mistake of replacing good components. The six-step methodology applies to every PLC fault, from a simple blown output fuse to a complex intermittent communication error.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Six-Step Diagnostic Process</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>1. Observe:</strong> Note the symptoms. Check all status LEDs on the PLC, I/O modules, power supply, and communication modules. Talk to the machine operator — what happened, when did it start, has anything changed recently?</li>
                <li className="pl-1"><strong>2. Gather information:</strong> Read the diagnostic buffer for timestamped error codes. Check HMI alarm history. Review recent maintenance records. Note any recent programme changes, hardware replacements, or production changes.</li>
                <li className="pl-1"><strong>3. Analyse:</strong> Categorise the fault — is it hardware (module failure, wiring), software (programme logic, data), communication (network, fieldbus), or environmental (heat, EMI, moisture)? Narrow down to the specific subsystem.</li>
                <li className="pl-1"><strong>4. Test:</strong> Use online monitoring to check programme logic. Use a multimeter to verify voltages, continuity, and insulation. Use substitution testing (swap with a known-good spare) where appropriate.</li>
                <li className="pl-1"><strong>5. Fix:</strong> Address the root cause — replace the faulty component, repair the wiring, correct the programme, or resolve the environmental issue. Do not just treat the symptom.</li>
                <li className="pl-1"><strong>6. Verify and document:</strong> Test the repair thoroughly. Clear any fault codes. Monitor for recurrence. Document the fault, diagnosis, and corrective action in the maintenance log.</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> Resist the temptation to skip straight to step 5 (fix). The most experienced maintenance technicians spend the majority of their time on steps 1-3 (observation and analysis). Thorough diagnosis before intervention saves time, avoids replacing good components, and identifies root causes that prevent recurrence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Hardware and Communication Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Hardware faults encompass power supply failure, I/O module damage, backplane bus errors, and battery depletion. Communication faults affect the links between the PLC and HMIs, SCADA systems, remote I/O racks, and other networked devices. Both categories have distinctive symptoms that help narrow down the fault location quickly.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Hardware Fault Indicators</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Power supply failure — no LEDs lit, check mains supply and fuses</li>
                  <li className="pl-1">I/O module failure — module fault LED, specific channel not responding</li>
                  <li className="pl-1">Backplane bus fault — CPU fault LED, modules not communicating</li>
                  <li className="pl-1">Low battery warning — BAT LED, risk of data loss on power cycle</li>
                  <li className="pl-1">Overheating — erratic behaviour, check enclosure ventilation and ambient temperature</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Communication Fault Indicators</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Damaged or loose Ethernet or serial cables — COMM LED error pattern</li>
                  <li className="pl-1">Incorrect IP address or subnet configuration — cannot connect online</li>
                  <li className="pl-1">Network switch failure — multiple devices lose connectivity simultaneously</li>
                  <li className="pl-1">EMI on communication cables — intermittent data errors and timeouts</li>
                  <li className="pl-1">Protocol mismatch — device added with wrong communication settings</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Status LED Interpretation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">LED</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Colour</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">RUN</td><td className="border border-white/10 px-3 py-2">Green (solid)</td><td className="border border-white/10 px-3 py-2">Programme executing normally</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">STOP</td><td className="border border-white/10 px-3 py-2">Amber/Yellow</td><td className="border border-white/10 px-3 py-2">Programme halted — outputs in default state</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">FAULT/ERROR</td><td className="border border-white/10 px-3 py-2">Red</td><td className="border border-white/10 px-3 py-2">Hardware or software error — read diagnostic buffer</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">COMM</td><td className="border border-white/10 px-3 py-2">Green (flashing)</td><td className="border border-white/10 px-3 py-2">Network communication active</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">BAT</td><td className="border border-white/10 px-3 py-2">Red/Amber</td><td className="border border-white/10 px-3 py-2">Backup battery low — replace promptly</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">FORCE</td><td className="border border-white/10 px-3 py-2">Amber</td><td className="border border-white/10 px-3 py-2">I/O forces active — investigate immediately</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Programme-Level Diagnosis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When hardware is confirmed working correctly (LEDs normal, modules responding, communications active), the fault may lie in the programme logic. Online monitoring reveals exactly where the logic fails to produce the expected output, allowing you to pinpoint whether the issue is a programme error, incorrect data, or a field device not providing the expected input signal.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Programme Diagnosis Techniques</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Online logic view:</strong> Trace power flow through ladder rungs — find the blocking contact that prevents the output from energising</li>
                <li className="pl-1"><strong>Watch tables:</strong> Monitor specific timer/counter values, analogue readings, and data registers in a focused list</li>
                <li className="pl-1"><strong>Cross-reference:</strong> Find every location where a specific address is used — trace the logic chain across programme sections</li>
                <li className="pl-1"><strong>Force I/O:</strong> Temporarily override an input or output for diagnostic testing — use with extreme caution and risk assessment</li>
                <li className="pl-1"><strong>Scan time monitoring:</strong> Check for abnormal increases that could indicate programme faults or communication bottlenecks</li>
                <li className="pl-1"><strong>Programme comparison:</strong> Compare the running programme against the backup to detect unauthorised or undocumented changes</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Warning: Forced I/O</p>
              <p className="text-sm text-white">
                Forcing an I/O point bypasses ALL programme logic including safety interlocks. A forced output will remain in its forced state regardless of what the programme logic dictates. Use forces only as a last resort for diagnostic purposes, with a proper risk assessment, with the machine in a safe state, and ALWAYS remove forces immediately after diagnosis. Check the force table before disconnecting from every PLC session. A forgotten force has been the root cause of fatal industrial accidents.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Preventive Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PLCs are highly reliable solid-state devices, but they operate in industrial environments that subject them to heat, dust, vibration, and electrical noise. A structured preventive maintenance programme extends PLC system life, reduces unexpected failures, and ensures that backup and recovery systems are ready when needed.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PLC Preventive Maintenance Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Terminal connections:</strong> Check tightness on all I/O terminals, power supply terminals, and communication connectors (annually or per site schedule)</li>
                <li className="pl-1"><strong>Enclosure cooling:</strong> Clean ventilation filters, verify fan operation, check enclosure door seals for damage</li>
                <li className="pl-1"><strong>Temperature:</strong> Verify the enclosure internal temperature is within the PLC operating specification (typically 0-55 degrees C)</li>
                <li className="pl-1"><strong>Battery:</strong> Check battery status LED and replace when indicated — note the battery type and keep spares</li>
                <li className="pl-1"><strong>Programme backup:</strong> Verify the stored backup matches the running programme by performing an online comparison</li>
                <li className="pl-1"><strong>Diagnostic log:</strong> Review the diagnostic buffer for recurring warnings that may indicate developing faults</li>
                <li className="pl-1"><strong>Force table:</strong> Check that no forces are inadvertently left active from previous maintenance sessions</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> During planned shutdowns, take the opportunity to perform a thorough PLC system check including uploading the programme for comparison with the backup, checking all module seating, verifying power supply output voltages, and inspecting cables for damage. These checks take minimal time but can prevent costly unplanned breakdowns.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Documentation and Continuous Improvement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thorough documentation of every PLC fault and repair is not just good practice — it is a requirement under ST1426 and a cornerstone of effective maintenance management. Good documentation transforms individual fault experiences into organisational knowledge, reducing future diagnosis times and identifying systemic issues that need engineering attention.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What to Document</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fault description:</strong> What were the symptoms? What was the machine doing (or not doing)?</li>
                <li className="pl-1"><strong>Diagnostic steps:</strong> What did you check? What tools did you use? What did each check reveal?</li>
                <li className="pl-1"><strong>Root cause:</strong> What was the actual cause of the fault? (Not just the symptom.)</li>
                <li className="pl-1"><strong>Corrective action:</strong> What did you do to fix it? Any parts replaced (include part numbers)?</li>
                <li className="pl-1"><strong>Verification:</strong> How did you confirm the repair was successful?</li>
                <li className="pl-1"><strong>Recommendations:</strong> Any follow-up actions needed? Design improvements? Spare parts to order?</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Continuous Improvement</p>
              <p className="text-sm text-white mb-3">
                Maintenance data analysis reveals patterns that drive improvement:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Repeat failures:</strong> If the same fault recurs, the root cause has not been properly addressed — escalate for engineering review</li>
                <li className="pl-1"><strong>Common failure modes:</strong> Identify I/O modules, sensors, or devices that fail frequently and investigate design improvements</li>
                <li className="pl-1"><strong>Environmental factors:</strong> Correlate faults with temperature, humidity, or specific production activities</li>
                <li className="pl-1"><strong>PM effectiveness:</strong> Review whether preventive maintenance tasks are catching issues before they cause breakdowns</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians are expected to demonstrate systematic fault diagnosis, correct use of diagnostic tools, safe working practices, accurate documentation of findings and actions, and contribution to continuous improvement of maintenance processes. These competencies are assessed both in the workplace and through the end-point assessment.
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
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section2-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: PLC Programming Software
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section2">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section2_6;
