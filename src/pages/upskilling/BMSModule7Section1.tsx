import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "io-list-critical",
    question: "Why is an IO list critical before installation begins?",
    options: [
      "It looks professional in documentation",
      "It ensures all required signals are identified, prevents missing devices, and supports commissioning",
      "It's only needed for large projects"
    ],
    correctIndex: 1,
    explanation: "The IO list ensures all required signals are identified, prevents missing devices, guides cable routing and panel design, supports procurement decisions, and provides the foundation for commissioning. Without it, costly site changes are inevitable."
  },
  {
    id: "schematic-vs-io",
    question: "What do schematics provide that IO lists do not?",
    options: [
      "More detailed device descriptions",
      "Physical and logical connections between devices, control sequences, and wiring methods",
      "Alarm setpoints and priorities"
    ],
    correctIndex: 1,
    explanation: "Schematics show the physical and logical connections between devices, control sequences, wiring methods, and spatial relationships. While IO lists identify what signals exist, schematics show how they're connected."
  },
  {
    id: "bacnet-ip-topology",
    question: "Which topology is typically used for BACnet/IP networks?",
    options: [
      "Bus topology",
      "Star topology",
      "Ring topology"
    ],
    correctIndex: 1,
    explanation: "Star topology is used for BACnet/IP networks because they run over Ethernet infrastructure, where devices connect to a central switch. This provides better reliability and easier fault isolation compared to bus topologies."
  }
];

const faqs = [
  {
    question: "What's the difference between digital and analog inputs?",
    answer: "Digital inputs provide simple on/off or high/low signals (like switches). Analog inputs provide variable signals representing measured values like temperature using standards like 0-10V or 4-20mA."
  },
  {
    question: "Why must mains cables be segregated from LV control wiring?",
    answer: "Mains voltage cables can induce electromagnetic interference in low voltage control circuits, causing signal errors or equipment malfunction. Segregation also provides safety separation between voltage bands."
  },
  {
    question: "What spare capacity should be left in trunking?",
    answer: "40% spare capacity should be maintained to avoid overcrowding, allow future additions, maintain proper heat dissipation, and facilitate cable installation and maintenance."
  },
  {
    question: "Why are ferrules used on stranded conductors?",
    answer: "Ferrules prevent individual strands from breaking away and causing short circuits. They ensure all strands are captured in the termination, providing a secure and reliable connection."
  }
];

const quizQuestion = {
  question: "CO2 sensors in a building gave unstable readings. Investigation found their 0-10V cables were run in the same trunking as 230V fan power supplies. What caused the problem?",
  options: [
    "Faulty sensors",
    "Incorrect power supply voltage",
    "Electromagnetic interference from nearby mains cables",
    "Poor network connectivity"
  ],
  correctAnswer: 2,
  explanation: "The electromagnetic interference from mains cables caused noise in the analog signals. This is why communications and analog signal cables must be segregated from power cables in separate containment systems."
};

const BMSModule7Section1 = () => {
  useSEO({
    title: "BMS Design: IO Lists, Schematics, Network Topology | Module 7.1",
    description: "Learn essential BMS design documentation including IO lists, control schematics, and network topology planning for Building Management Systems."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bms-module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BMS Design Documentation
          </h1>
          <p className="text-white">
            IO lists, schematics, and network topology planning
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>IO List:</strong> Master document of all inputs/outputs</li>
              <li><strong>Schematics:</strong> How devices are wired and controlled</li>
              <li><strong>Topology:</strong> Network structure and device connections</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Tag numbers like AHU-01-T01</li>
              <li><strong>Use:</strong> IO list for procurement and installation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the purpose and content of IO lists",
              "Interpret BMS schematics and control diagrams",
              "Identify different network topologies and their applications",
              "Apply design documentation in installation and commissioning"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: IO Lists */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding IO Lists
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An IO list is the <strong>master document that records every input and output</strong> the BMS must manage. It serves as the foundation for system design, procurement, installation, and commissioning.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm font-medium text-blue-300 mb-2">Digital Inputs</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Flow switches (water/air detection)</li>
                  <li>Fire alarm interface signals</li>
                  <li>Door contacts (plant room security)</li>
                  <li>Status feedback (pump/fan run)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-300 mb-2">Analog Inputs</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Temperature sensors (0-10V, 4-20mA)</li>
                  <li>Pressure sensors (duct and pipe)</li>
                  <li>CO2 sensors (air quality)</li>
                  <li>Energy meters (kWh tracking)</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="text-sm font-medium text-orange-300 mb-2">Digital Outputs</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Relays (switching pumps, fans)</li>
                  <li>Solenoids (on/off valve control)</li>
                  <li>Dampers (open/close actuators)</li>
                  <li>Alarms (beacons, sounders)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="text-sm font-medium text-purple-300 mb-2">Analog Outputs</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Modulating valves (0-10V, 4-20mA)</li>
                  <li>VSDs (variable speed drives)</li>
                  <li>Damper positioning signals</li>
                  <li>Lighting dimming (0-10V)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential IO List Information:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Tag number:</strong> Unique identifier (e.g., AHU-01-T01)</li>
                <li><strong>Device name:</strong> Clear description of equipment</li>
                <li><strong>Signal type:</strong> Digital/analog, input/output</li>
                <li><strong>Engineering units:</strong> °C, ppm, bar, kW, etc.</li>
                <li><strong>Alarm information:</strong> Critical limits and priorities</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Schematics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            BMS Schematics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Schematics illustrate <strong>how devices are wired and controlled</strong>. They link physical connections to logical control sequences, providing the roadmap for installation and commissioning.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm font-medium text-blue-300 mb-2">Control Panel Wiring</p>
                <ul className="text-sm text-white space-y-1">
                  <li>I/O module connections</li>
                  <li>Terminal block layouts</li>
                  <li>Power distribution</li>
                  <li>Fusing and protection</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-300 mb-2">Field Device Wiring</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Sensor connections</li>
                  <li>Actuator wiring</li>
                  <li>Cable specifications</li>
                  <li>Junction box details</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="text-sm font-medium text-purple-300 mb-2">Control Logic</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Control sequences</li>
                  <li>Interlocks and safety</li>
                  <li>Alarm conditions</li>
                  <li>Override functions</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-2">Boiler Control Loop Example</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
                <div>
                  <p className="font-medium mb-1">Input Side:</p>
                  <ul className="space-y-0.5 ml-2">
                    <li>Flow temperature sensor (4-20mA)</li>
                    <li>Return temperature sensor</li>
                    <li>Boiler run status (DI)</li>
                    <li>Safety interlock signals</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Output Side:</p>
                  <ul className="space-y-0.5 ml-2">
                    <li>Gas valve modulation (0-10V)</li>
                    <li>Pump start/stop (relay)</li>
                    <li>Fault alarm signal</li>
                    <li>Network communication</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Network Topology */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Network Topology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Network topology defines <strong>how BMS devices are connected to share data</strong>. The chosen topology affects system reliability, cable requirements, and troubleshooting methods.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm font-medium text-blue-300 mb-2">Bus Topology</p>
                <ul className="text-sm text-white space-y-1">
                  <li>RS-485 Modbus networks</li>
                  <li>BACnet MSTP</li>
                  <li>Devices in series</li>
                  <li>Requires termination resistors</li>
                  <li>Lower cable costs</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-300 mb-2">Star Topology</p>
                <ul className="text-sm text-white space-y-1">
                  <li>BACnet/IP networks</li>
                  <li>Ethernet-based systems</li>
                  <li>Central switch connection</li>
                  <li>Higher reliability</li>
                  <li>Easy fault isolation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="text-sm font-medium text-purple-300 mb-2">Tree/Hybrid</p>
                <ul className="text-sm text-white space-y-1">
                  <li>KNX installations</li>
                  <li>Large BACnet networks</li>
                  <li>Combines bus and star</li>
                  <li>Hierarchical structure</li>
                  <li>Scalable architecture</li>
                </ul>
              </div>
            </div>

            {/* Network Limits Table */}
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 px-3 text-elec-yellow">Protocol</th>
                    <th className="text-left py-2 px-3 text-elec-yellow">Max Devices</th>
                    <th className="text-left py-2 px-3 text-elec-yellow">Max Distance</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/10">
                    <td className="py-2 px-3">Modbus RTU</td>
                    <td className="py-2 px-3">32 per segment</td>
                    <td className="py-2 px-3">1200m</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 px-3">BACnet MSTP</td>
                    <td className="py-2 px-3">127 per segment</td>
                    <td className="py-2 px-3">1200m</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 px-3">BACnet/IP</td>
                    <td className="py-2 px-3">Virtually unlimited</td>
                    <td className="py-2 px-3">100m per segment</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">KNX/EIB</td>
                    <td className="py-2 px-3">64 per line</td>
                    <td className="py-2 px-3">1000m</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Installation Best Practices */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Installation Best Practices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Planning Phase</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Segment limits:</strong> Avoid overloading networks</li>
                  <li><strong>Cable routing:</strong> Segregate comms from power</li>
                  <li><strong>Future expansion:</strong> Allow spare capacity</li>
                  <li><strong>Redundancy:</strong> Backup routes for critical devices</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Phase</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Device addressing:</strong> Label with network address</li>
                  <li><strong>Cable quality:</strong> Use specified types</li>
                  <li><strong>Terminations:</strong> Install and test resistors</li>
                  <li><strong>Testing:</strong> Verify before commissioning</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-300 mb-2">Common Mistakes to Avoid</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Mixed containment:</strong> Running signal cables with mains power</li>
                <li><strong>Reversed polarity:</strong> Incorrect analog signal wiring</li>
                <li><strong>Missing terminations:</strong> RS-485 bus without end resistors</li>
                <li><strong>Overcrowded trunking:</strong> Less than 40% spare capacity</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Case Study: EMI Problems</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-300 mb-2">Problem</p>
              <p className="text-sm text-white">CO2 sensors in an office building gave unstable, fluctuating readings despite being new and properly calibrated.</p>
            </div>
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-300 mb-2">Investigation</p>
              <p className="text-sm text-white">The 0-10V signal cables had been run in the same trunking as 230V fan power supplies, violating cable segregation rules.</p>
            </div>
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm font-medium text-green-300 mb-2">Solution</p>
              <p className="text-sm text-white">Signal cables were re-routed through separate containment. Readings immediately stabilized and matched expected values.</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Design Documents</p>
              <ul className="space-y-0.5">
                <li>IO list: All inputs/outputs with details</li>
                <li>Schematics: Wiring and control logic</li>
                <li>Topology: Network structure and limits</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Standards</p>
              <ul className="space-y-0.5">
                <li>BS 7671: Electrical safety for wiring</li>
                <li>40% spare capacity in trunking</li>
                <li>Segregate signal cables from power</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="mb-10 mt-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bms-module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-7-section-2">
              Next: Commissioning and Testing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule7Section1;
