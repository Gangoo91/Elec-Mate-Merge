import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "modbus-conflict",
    question: "What happens if two devices are given the same Modbus address?",
    options: [
      "They automatically negotiate unique addresses",
      "Communication conflicts occur, causing data corruption",
      "The BMS ignores both devices",
      "Only the first device installed works"
    ],
    correctIndex: 1,
    explanation: "When two devices share the same address, communication conflicts occur. The BMS receives corrupted data or cannot communicate properly with either device."
  },
  {
    id: "mapping-importance",
    question: "Why is device mapping critical for BMS dashboards and trend logs?",
    options: [
      "It sets the device power requirements",
      "It determines network communication speed",
      "It ensures sensor values display correctly and actuators respond properly",
      "It controls device installation locations"
    ],
    correctIndex: 2,
    explanation: "Proper device mapping ensures sensor values appear correctly on dashboards and in trend logs, and that actuators respond to the right commands from the BMS."
  },
  {
    id: "testing-stage",
    question: "At what stage is communication testing carried out: before or after device mapping?",
    options: [
      "Before device mapping",
      "During address assignment",
      "After device mapping",
      "Only during commissioning"
    ],
    correctIndex: 2,
    explanation: "Communication testing is step 4 in the workflow, carried out after addressing, wiring, and mapping are complete. This confirms data appears in the BMS and outputs respond correctly."
  }
];

const faqs = [
  {
    question: "What happens if I accidentally assign the same address to two devices?",
    answer: "Communication conflicts will occur, and the BMS will either see data from only one device or receive corrupted data. Both devices must be reconfigured with unique addresses."
  },
  {
    question: "How do I know which addressing method to use?",
    answer: "The addressing method depends on the communication protocol: BACnet uses Device IDs, Modbus uses numeric addresses (1-247), and KNX uses physical addresses in Area.Line.Device format."
  },
  {
    question: "Why is device mapping separate from addressing?",
    answer: "Addressing identifies the device on the network, while mapping connects the physical I/O points to their software representation. Both are needed for proper BMS operation."
  },
  {
    question: "What's the difference between physical and logical addresses in KNX?",
    answer: "Physical addresses (Area.Line.Device format) identify where the device is physically located on the network. Logical group addresses link devices together for control functions."
  }
];

const quizQuestion = {
  question: "In a commercial tower block project, why could the BMS only read one Modbus submeter during commissioning?",
  options: [
    "The meters were faulty from the factory",
    "Network cables were incorrectly terminated",
    "Multiple meters had the same default address causing conflicts",
    "The BMS software was not configured correctly"
  ],
  correctAnswer: 2,
  explanation: "Multiple Modbus submeters were left at their factory default address of '1', causing communication conflicts. Only one meter could respond while others clashed, delaying handover by two weeks until electricians assigned unique addresses."
};

const BMSModule7Section3 = () => {
  useSEO({
    title: "Addressing and Device Mapping | BMS Module 7.3",
    description: "Learn device configuration and network addressing for BMS communication including BACnet, Modbus, and KNX protocols."
  });

  const outcomes = [
    "Explain the purpose of addressing in BMS networks",
    "Describe how device mapping links physical I/O to software",
    "Identify addressing methods for BACnet, Modbus, and KNX devices",
    "Apply best practices for labelling and testing addressed devices"
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Addressing and Device Mapping
          </h1>
          <p className="text-white/80">
            Device configuration and network addressing for BMS communication
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Addressing:</strong> Gives each device a unique identity on the network</li>
              <li><strong>Mapping:</strong> Links physical I/O signals to BMS software</li>
              <li><strong>Protocols:</strong> BACnet, Modbus, and KNX each have unique addressing methods</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Device labels with addresses, IO lists, network diagrams</li>
              <li><strong>Use:</strong> Assign unique addresses, verify mapping, test communication</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {outcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Introduction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Addressing and Mapping Matter
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In a Building Management System (BMS), every device — whether it's a sensor, actuator, controller, or gateway — must have a unique identity. Without correct addressing and mapping, devices cannot communicate with each other or the BMS supervisor.
            </p>
            <p>
              <strong>Addressing</strong> ensures each device is uniquely recognised on the network. <strong>Mapping</strong> links each input/output (I/O) point to the correct device and function in the BMS software. For electricians, this means more than just plugging things in: it's about checking addresses, labelling devices, and verifying that physical connections match the software configuration.
            </p>
          </div>
        </section>

        {/* Section 02: Protocol-Specific Addressing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Addressing by Protocol
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Each BMS protocol has its own addressing rules:</p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BACnet</p>
                <p className="text-sm text-white">
                  Devices have a Device ID and may also use IP addresses (for BACnet/IP) or node IDs (for BACnet MSTP). Each Device ID must be unique across the entire BACnet network.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modbus</p>
                <p className="text-sm text-white">
                  Devices have numeric addresses (1-247). Each register stores specific data (e.g., temperature = Register 30001). No two devices on the same RS485 segment can share an address.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">KNX</p>
                <p className="text-sm text-white">
                  Devices use physical addresses in Area.Line.Device format (e.g., 1.1.12). Logical group addresses then link devices for control functions.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400/80 mb-2">Key Rule</p>
              <p className="text-sm text-white">
                No two devices on the same network segment can share the same address — otherwise, communication conflicts occur.
              </p>
            </div>

            <InlineCheck {...quickCheckQuestions[0]} />
          </div>
        </section>

        {/* Section 03: Device Mapping */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Device Mapping
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Mapping links real-world signals to their representation in the BMS software. A CO2 sensor wired to Analog Input 3 on a controller must be mapped in software as "Room 101 CO2 Sensor" — not left as a generic "AI-3."
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Input Mapping</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Ensures sensor values appear correctly in dashboards</li>
                  <li>Links physical sensors to trend logs and alarms</li>
                  <li>Matches wiring to software configuration</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Output Mapping</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Ensures actuators respond to the right commands</li>
                  <li>Links control outputs to correct physical devices</li>
                  <li>Prevents valves/dampers operating incorrectly</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[1]} />
          </div>
        </section>

        {/* Section 04: Workflow */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Addressing and Mapping Workflow
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>The correct sequence for addressing and mapping:</p>

            <div className="my-6 space-y-3">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-transparent border border-white/10">
                <span className="bg-elec-yellow text-[#1a1a1a] rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
                <div>
                  <p className="font-medium text-white">Assign addresses</p>
                  <p className="text-sm text-white/80">Each device is configured with a unique ID before installation</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-transparent border border-white/10">
                <span className="bg-elec-yellow text-[#1a1a1a] rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
                <div>
                  <p className="font-medium text-white">Wire devices correctly</p>
                  <p className="text-sm text-white/80">Ensure polarity and bus terminations are correct</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-transparent border border-white/10">
                <span className="bg-elec-yellow text-[#1a1a1a] rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">3</span>
                <div>
                  <p className="font-medium text-white">Map I/O points in software</p>
                  <p className="text-sm text-white/80">Link each signal to the correct controller channel with descriptive names</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-transparent border border-white/10">
                <span className="bg-elec-yellow text-[#1a1a1a] rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">4</span>
                <div>
                  <p className="font-medium text-white">Test communication</p>
                  <p className="text-sm text-white/80">Confirm data appears in the BMS and outputs respond correctly</p>
                </div>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />
          </div>
        </section>

        {/* Section 05: Advanced Topics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Multi-Protocol Systems and Network Diagnostics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern BMS installations often require connecting devices using different communication protocols. Gateways bridge between protocols, requiring careful addressing coordination.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Multi-Protocol System Example:</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">BACnet/IP</p>
                  <p className="text-white/90 text-xs">Main controllers<br/>Device IDs: 100001+</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Modbus RTU</p>
                  <p className="text-white/90 text-xs">Energy meters<br/>Addresses: 1-247</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">KNX</p>
                  <p className="text-white/90 text-xs">Lighting control<br/>Area.Line.Device</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Common Addressing Problems:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Duplicate addresses:</strong> Multiple devices respond, causing data corruption</li>
                <li><strong>Address gaps:</strong> Missing devices cause polling delays</li>
                <li><strong>Wrong subnets:</strong> IP devices can't communicate with controllers</li>
                <li><strong>Mapping errors:</strong> Physical points show incorrect data</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Diagnostic Tools:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Network scanners:</strong> Discover active devices and identify conflicts</li>
                <li><strong>Protocol analysers:</strong> Monitor traffic for communication errors</li>
                <li><strong>Ping tests:</strong> Verify IP device connectivity</li>
                <li><strong>Data validation:</strong> Compare BMS readings with field measurements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 06: Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practices for Addressing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Assign addresses systematically (e.g., Modbus meters numbered sequentially)</li>
                <li>Label each device with its address (permanent sticker or engraved tag)</li>
                <li>Keep an addressing register in the O&M manuals</li>
                <li>For IP devices, request static IPs from IT to avoid conflicts</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practices for Device Mapping</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Follow the IO list strictly when mapping points</li>
                <li>Use clear naming conventions ("Room 201 Temp Sensor," not "AI-2")</li>
                <li>Test each point during commissioning — don't assume wiring matches documentation</li>
                <li>Confirm alarm and trend configurations match the mapped points</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Leaving factory defaults:</strong> Always assign unique addresses during installation</li>
                <li><strong>Missing labels:</strong> Unlabelled devices cause confusion during maintenance</li>
                <li><strong>Skipping communication tests:</strong> Always verify data flows correctly</li>
                <li><strong>Ignoring security:</strong> Change default passwords and avoid predictable addressing patterns</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Real World Example</h2>
          <div className="p-4 rounded-lg bg-transparent border border-white/10">
            <h3 className="text-sm font-medium text-red-400/80 mb-2">Commercial Tower Block Project</h3>
            <p className="text-sm text-white leading-relaxed mb-3">
              On a commercial tower block project, several Modbus submeters were left at their factory default address of "1." When commissioning started, the BMS could only read one meter — the others clashed.
            </p>
            <p className="text-sm text-white leading-relaxed mb-3">
              Electricians had to revisit every meter, assign unique addresses, and relabel them, delaying handover by two weeks.
            </p>
            <div className="mt-4 p-3 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-1">Lesson Learned</p>
              <p className="text-xs text-white">
                Always verify and set unique device addresses during installation, not during commissioning. This prevents costly delays and ensures smooth handover.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quick Reference Card */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Protocol Address Formats</p>
              <ul className="space-y-0.5">
                <li>BACnet: Device ID + IP/Node ID</li>
                <li>Modbus: 1-247 numeric</li>
                <li>KNX: Area.Line.Device</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Workflow Steps</p>
              <ul className="space-y-0.5">
                <li>1. Assign addresses</li>
                <li>2. Wire devices correctly</li>
                <li>3. Map I/O points in software</li>
                <li>4. Test communication</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="my-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-7-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Programming Methods
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-7-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule7Section3;
