import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "modbus-simple",
    question: "Why is Modbus often described as simple compared to BACnet?",
    options: ["It runs faster than BACnet", "It uses basic data registers and simple addressing", "It's newer technology than BACnet"],
    correctIndex: 1,
    explanation: "Modbus is considered simple because it uses basic data registers and simple addressing schemes, without the complex object-oriented data structures found in BACnet."
  },
  {
    id: "modbus-devices",
    question: "How many devices can typically be supported on a single Modbus RTU segment?",
    options: ["16 devices", "32 devices", "127 devices"],
    correctIndex: 1,
    explanation: "A single Modbus RTU segment typically supports up to 32 devices (including the master). This can be extended with repeaters, but 32 is the standard practical limit."
  },
  {
    id: "modbus-tcp-advantage",
    question: "What is one advantage of Modbus TCP/IP over RTU?",
    options: ["It's cheaper to install", "Much faster communication and more scalable", "It's simpler to configure"],
    correctIndex: 1,
    explanation: "Modbus TCP/IP is much faster (100 Mbps vs 115 kbps) and more scalable than RTU, supporting many more devices and simultaneous connections."
  },
  {
    id: "modbus-equipment",
    question: "What type of building equipment commonly uses Modbus?",
    options: ["LED lighting controllers", "Energy meters", "Fire alarm panels"],
    correctIndex: 1,
    explanation: "Energy meters are one of the most common applications for Modbus in buildings. Other common examples include boilers, chillers, and Variable Speed Drives (VSDs)."
  }
];

const faqs = [
  {
    question: "Is Modbus secure for modern buildings?",
    answer: "Modbus has no built-in security. Use VLANs, firewalls, and network segregation to protect Modbus TCP/IP networks. For critical systems, consider VPN access for remote connections."
  },
  {
    question: "Can Modbus and BACnet work together?",
    answer: "Yes, using protocol gateways. These devices translate Modbus registers into BACnet objects, allowing Modbus devices to appear on a BACnet network."
  },
  {
    question: "What's the most common Modbus installation error?",
    answer: "Polarity reversal (swapping A and B wires) and missing termination resistors are the most common issues, followed by duplicate device addresses."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "Which Modbus function code would you use to read holding registers from an energy meter?",
  options: [
    "Function 01 - Read Coils",
    "Function 03 - Read Holding Registers",
    "Function 05 - Write Single Coil",
    "Function 15 - Write Multiple Coils"
  ],
  correctAnswer: 1,
  explanation: "Function code 03 (Read Holding Registers) is the most common function for reading data like energy values, temperatures, and other process variables from Modbus devices."
  }
];

const BMSModule5Section3 = () => {
  useSEO({
    title: "Modbus RTU and TCP/IP Use Cases | BMS Course",
    description: "Learn Modbus protocol implementation and practical applications in building automation systems."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Modbus RTU and TCP/IP Use Cases
          </h1>
          <p className="text-white/80">
            Understanding Modbus protocol implementation for building automation
          </p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>RTU:</strong> RS-485 serial, 32 devices max, meters & sensors</li>
              <li><strong>TCP/IP:</strong> Ethernet, faster, more scalable, IT integration</li>
              <li><strong>Key rule:</strong> Master polls slaves - no unsolicited data</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> 2-wire RS-485 terminals = Modbus RTU</li>
              <li><strong>Spot:</strong> Port 502 in network config = Modbus TCP</li>
              <li><strong>Use:</strong> Energy meters, VSDs, chillers, boilers</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand Modbus master-slave architecture",
              "Compare RTU vs TCP/IP for different applications",
              "Identify common Modbus function codes",
              "Install and troubleshoot Modbus networks"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: What is Modbus? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Modbus?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modbus is a master-slave protocol where a central controller (master) polls devices (slaves) for information.
              Created in the 1970s for industrial automation, it has proven its reliability and simplicity over decades of use.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Simplicity</p>
                <p className="text-sm text-white">
                  Each device has an address, and the master requests data registers.
                  No complex configuration or protocol stacks required.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flexibility</p>
                <p className="text-sm text-white">
                  Works across many device types: meters, sensors, boilers, VSDs.
                  Almost universal support from manufacturers.
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Master-Slave Architecture:</p>
              <ul className="text-sm text-white/90 space-y-1 ml-4">
                <li>Master initiates all communication</li>
                <li>Slaves respond only when polled</li>
                <li>Simple request/response cycle</li>
                <li>Predictable network traffic patterns</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Simple to implement and troubleshoot</li>
                  <li>Reliable and proven technology</li>
                  <li>Low cost and wide device support</li>
                  <li>Minimal network overhead</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-orange-400/80 mb-2">Limitations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Limited data structure vs BACnet</li>
                  <li>Master must poll each device individually</li>
                  <li>No automatic device discovery</li>
                  <li>Limited error reporting capabilities</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Function Codes</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <ul className="text-white space-y-1">
                    <li><strong>01</strong> - Read Coils (digital outputs)</li>
                    <li><strong>02</strong> - Read Discrete Inputs</li>
                    <li><strong>03</strong> - Read Holding Registers</li>
                  </ul>
                </div>
                <div>
                  <ul className="text-white space-y-1">
                    <li><strong>04</strong> - Read Input Registers</li>
                    <li><strong>05</strong> - Write Single Coil</li>
                    <li><strong>06</strong> - Write Single Register</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-white/70 mt-2 italic">Function codes 03 and 04 are most commonly used for reading meter data and sensor values.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Modbus RTU (Serial) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Modbus RTU (Serial)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modbus RTU (Remote Terminal Unit) uses RS-485 serial communication. It's the most common form of Modbus
              in building automation, particularly for devices like energy meters and plant equipment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Technical Specifications</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-sm text-white space-y-1">
                  <li>Uses RS-485 twisted-pair cabling</li>
                  <li>Devices daisy-chained with unique addresses</li>
                  <li>Supports up to 32 devices per segment</li>
                </ul>
                <ul className="text-sm text-white space-y-1">
                  <li>Typical baud rates: 9600-115200 bps</li>
                  <li>Requires termination resistors at both ends</li>
                  <li>Maximum cable length: 1200m per segment</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Device Addressing</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Each device has a unique address (1-247)</li>
                <li>Address 0 reserved for broadcast messages</li>
                <li>Duplicate addresses cause communication failures</li>
                <li>Address configuration usually via DIP switches or software</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Example:</p>
              <p className="text-sm text-white/90">
                A row of electricity submeters in a distribution board, all connected to a Modbus RTU bus,
                reporting kWh readings back to the BMS every 30 seconds. Each meter has a unique address,
                and the BMS polls them sequentially for energy data.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Common Wiring Problems</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Reversed A/B polarity</li>
                  <li>Missing termination resistors</li>
                  <li>Star wiring instead of daisy-chain</li>
                  <li>Duplicate device addresses</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Solutions</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Check continuity and polarity</li>
                  <li>Install 120Ω resistors at both ends</li>
                  <li>Rewire as proper bus topology</li>
                  <li>Document and verify all addresses</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Signal Quality vs Distance</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>At 1200m: maximum 9600 bps for reliable communication</li>
                <li>At 100m: up to 115200 bps possible</li>
                <li>Electromagnetic interference can cause data corruption</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Modbus TCP/IP */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Modbus TCP/IP
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modbus TCP/IP encapsulates Modbus data within standard Ethernet frames, allowing it to run over
              IP networks. This provides significant advantages in speed, scalability, and integration with
              existing IT infrastructure.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Network Infrastructure</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Runs over Ethernet (Cat5e/6) cabling</li>
                <li>Each device has an IP address</li>
                <li>Uses standard TCP/IP port 502</li>
                <li>Can leverage existing IT network infrastructure</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Advantages</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Much faster than RTU (100 Mbps vs 115 kbps)</li>
                <li>Supports many more devices than RTU</li>
                <li>Simultaneous connections possible</li>
                <li>Better suited for real-time applications</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Practical Example:</p>
              <p className="text-sm text-white/90">
                A modern chiller communicates over Modbus TCP/IP, providing detailed operating data
                (temperatures, pressures, alarms, energy consumption) directly to the BMS without the
                speed and distance limitations of RS-485 serial communication.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Use TCP/IP for</p>
                <ul className="text-sm text-white space-y-1">
                  <li>High-speed data requirements</li>
                  <li>Large numbers of devices</li>
                  <li>Integration with IT systems</li>
                  <li>Remote monitoring capabilities</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-400/80 mb-2">Use RTU for</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Simple meter reading</li>
                  <li>Cost-sensitive applications</li>
                  <li>Standalone BMS networks</li>
                  <li>Harsh industrial environments</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Security Considerations</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Modbus TCP has no built-in security features</li>
                <li>Use VLANs to segregate BMS traffic from corporate networks</li>
                <li>Consider VPN connections for remote access</li>
                <li>Implement firewall rules to restrict access</li>
                <li>Monitor network traffic for unauthorised access attempts</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Typical BMS Use Cases */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Typical BMS Use Cases
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modbus is found throughout modern buildings in various applications. Understanding where and why
              it's used helps electricians plan installations and troubleshoot issues effectively.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Meters</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Application:</strong> Most electrical submeters use Modbus RTU or TCP/IP</li>
                <li><strong>Data:</strong> kWh consumption, power demand, voltage, current, power factor</li>
                <li><strong>Installation:</strong> Often daisy-chained in distribution boards</li>
                <li><strong>Benefits:</strong> Automated meter reading, energy monitoring, cost allocation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Plant Equipment</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Boilers:</strong> Temperature control, modulation, fault monitoring</li>
                <li><strong>Chillers:</strong> Capacity control, efficiency monitoring, diagnostics</li>
                <li><strong>VSDs:</strong> Speed control, motor monitoring, energy optimisation</li>
                <li><strong>Heat pumps:</strong> Operating modes, performance data, alarm status</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Integration Gateways</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Protocol conversion:</strong> Modbus devices linked into BACnet systems</li>
                <li><strong>Legacy integration:</strong> Connecting older Modbus equipment to modern BMS</li>
                <li><strong>Multi-protocol sites:</strong> Bridging different communication standards</li>
                <li><strong>Cloud connectivity:</strong> IoT gateways for remote monitoring</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common RTU Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Electricity submetering</li>
                  <li>Gas and water meters</li>
                  <li>Simple plant control</li>
                  <li>Temperature sensors</li>
                  <li>Basic I/O modules</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common TCP/IP Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Modern chillers and boilers</li>
                  <li>Advanced VSDs</li>
                  <li>Building analytics systems</li>
                  <li>Energy management platforms</li>
                  <li>Remote monitoring systems</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* FAQ Section */}
        <section className="mb-10 mt-10">
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Modbus RTU</p>
              <ul className="space-y-0.5">
                <li>RS-485 serial, 9600-115200 bps</li>
                <li>Max 32 devices, 1200m</li>
                <li>Addresses 1-247</li>
                <li>Best for: meters, sensors</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Modbus TCP/IP</p>
              <ul className="space-y-0.5">
                <li>Ethernet, port 502</li>
                <li>Scalable, high-speed</li>
                <li>Requires IT coordination</li>
                <li>Best for: chillers, analytics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="mb-10 mt-10">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-5-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: BACnet Devices
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-5-section-4">
              Next: KNX and LonWorks
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule5Section3;