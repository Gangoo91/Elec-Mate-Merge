import { ArrowLeft, Network, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Communication Protocols - HNC Module 8 Section 5.4";
const DESCRIPTION = "Master BMS communication protocols: BACnet (IP, MS/TP), Modbus (RTU, TCP), LonWorks, KNX, M-Bus for metering, protocol gateways, open vs proprietary systems, and multi-vendor integration strategies.";

const quickCheckQuestions = [
  {
    id: "bacnet-transport",
    question: "Which BACnet transport layer is most commonly used for backbone communications in large commercial buildings?",
    options: ["BACnet MS/TP", "BACnet/IP", "BACnet ARCNET", "BACnet PTP"],
    correctIndex: 1,
    explanation: "BACnet/IP uses standard Ethernet and IP infrastructure, providing high speed (100 Mbps+), native IT integration, and leverages existing building network cabling. MS/TP is used for field-level device communications."
  },
  {
    id: "modbus-difference",
    question: "What is the key difference between Modbus RTU and Modbus TCP?",
    options: [
      "RTU supports more devices than TCP",
      "TCP uses Ethernet, RTU uses serial RS-485",
      "RTU is faster than TCP",
      "TCP requires proprietary software"
    ],
    correctIndex: 1,
    explanation: "Modbus RTU uses serial communication (typically RS-485), whilst Modbus TCP encapsulates the Modbus protocol within TCP/IP packets for Ethernet networks. Both use the same register-based data model."
  },
  {
    id: "knx-topology",
    question: "What is the maximum number of devices per KNX line segment?",
    options: ["32 devices", "64 devices", "127 devices", "256 devices"],
    correctIndex: 1,
    explanation: "A KNX line segment supports up to 64 devices. Lines can be connected via line couplers to form areas, and areas via backbone couplers, creating a hierarchical topology supporting thousands of devices."
  },
  {
    id: "gateway-purpose",
    question: "What is the primary function of a protocol gateway in a BMS installation?",
    options: [
      "To increase communication speed",
      "To translate between different protocols enabling interoperability",
      "To provide backup communications",
      "To encrypt data transmissions"
    ],
    correctIndex: 1,
    explanation: "Protocol gateways translate messages between different protocols (e.g., Modbus to BACnet), enabling devices from different manufacturers to communicate within an integrated BMS."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which organisation developed and maintains the BACnet standard?",
    options: [
      "International Electrotechnical Commission (IEC)",
      "ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers)",
      "European Committee for Standardization (CEN)",
      "Building Automation and Control Networks Association"
    ],
    correctAnswer: 1,
    explanation: "BACnet was developed by ASHRAE and is published as ANSI/ASHRAE Standard 135. It is also adopted internationally as ISO 16484-5."
  },
  {
    id: 2,
    question: "What baud rate is typically used for BACnet MS/TP communications?",
    options: ["9600 bps", "19200 bps", "38400 or 76800 bps", "115200 bps"],
    correctAnswer: 2,
    explanation: "BACnet MS/TP commonly operates at 38400 or 76800 bps over RS-485. Higher baud rates (76800) are preferred for larger networks to improve response times."
  },
  {
    id: 3,
    question: "In Modbus protocol, what is the function code for reading holding registers?",
    options: ["01 (Read Coils)", "02 (Read Discrete Inputs)", "03 (Read Holding Registers)", "04 (Read Input Registers)"],
    correctAnswer: 2,
    explanation: "Function code 03 reads holding registers, which are typically used for setpoints, configuration data, and read/write values. Function code 04 reads input registers (read-only sensor values)."
  },
  {
    id: 4,
    question: "What physical medium does standard KNX TP (Twisted Pair) use?",
    options: [
      "Cat 6 Ethernet cable",
      "Dedicated green KNX bus cable (twisted pair)",
      "Coaxial cable",
      "Fibre optic cable"
    ],
    correctAnswer: 1,
    explanation: "KNX TP uses dedicated bus cable (typically green) with a twisted pair for communication. The same cable carries both data and 30V DC bus power for devices."
  },
  {
    id: 5,
    question: "What is the maximum cable length for a single RS-485 segment used in Modbus RTU?",
    options: ["100 metres", "500 metres", "1200 metres", "2000 metres"],
    correctAnswer: 2,
    explanation: "RS-485 supports cable lengths up to 1200 metres (4000 feet) at lower baud rates. This long distance capability makes it ideal for industrial and building automation applications."
  },
  {
    id: 6,
    question: "Which protocol was specifically designed for utility metering applications?",
    options: ["BACnet", "LonWorks", "M-Bus (Meter Bus)", "KNX"],
    correctAnswer: 2,
    explanation: "M-Bus was specifically designed for remote reading of utility meters (gas, water, electricity, heat). It uses a two-wire bus with master-slave communication and supports long cable runs."
  },
  {
    id: 7,
    question: "What does PICS stand for in BACnet terminology?",
    options: [
      "Protocol Interface Communication Standard",
      "Protocol Implementation Conformance Statement",
      "Primary Integration Communication System",
      "Programmable Interface Control Specification"
    ],
    correctAnswer: 1,
    explanation: "PICS (Protocol Implementation Conformance Statement) documents exactly which BACnet objects, services, and data link layers a device supports, enabling specifiers to verify interoperability."
  },
  {
    id: 8,
    question: "In a LonWorks network, what is the function of a router?",
    options: [
      "To provide power to network devices",
      "To connect subnets and manage message routing between domains",
      "To store historical data",
      "To provide a user interface"
    ],
    correctAnswer: 1,
    explanation: "LonWorks routers connect subnets within or between domains, managing message routing and limiting local traffic to its origin subnet. They enable large, hierarchical network topologies."
  },
  {
    id: 9,
    question: "Which statement about open protocols versus proprietary systems is correct?",
    options: [
      "Proprietary systems always perform better than open protocols",
      "Open protocols guarantee multi-vendor interoperability without testing",
      "Open protocols enable competitive procurement and reduce vendor lock-in",
      "Proprietary systems are always less expensive to maintain"
    ],
    correctAnswer: 2,
    explanation: "Open protocols (BACnet, Modbus, KNX) enable competitive procurement by allowing products from multiple vendors. This reduces vendor lock-in and typically lowers lifecycle costs."
  },
  {
    id: 10,
    question: "What is BACnet Broadcast Management Device (BBMD) used for?",
    options: [
      "Managing device alarms",
      "Routing BACnet/IP messages across different IP subnets",
      "Storing trend data",
      "Providing time synchronisation"
    ],
    correctAnswer: 1,
    explanation: "BBMD enables BACnet/IP devices on different IP subnets to discover and communicate with each other by forwarding broadcast messages. Essential for large multi-subnet installations."
  },
  {
    id: 11,
    question: "What is the typical polling interval recommended for energy monitoring points in a BMS?",
    options: [
      "Every second",
      "Every 5-15 minutes",
      "Once per hour",
      "Once per day"
    ],
    correctAnswer: 1,
    explanation: "Energy monitoring typically uses 5-15 minute intervals, balancing granularity for analysis against network traffic. Critical control points may poll more frequently (1-5 seconds)."
  },
  {
    id: 12,
    question: "When integrating a third-party chiller with a BMS, what information is essential from the chiller manufacturer?",
    options: [
      "Marketing brochures and case studies",
      "Points list, protocol details, and communication parameters",
      "Installation photographs",
      "Warranty documentation only"
    ],
    correctAnswer: 1,
    explanation: "Integration requires a detailed points list (available data points), protocol specification (BACnet PICS, Modbus register map), and communication parameters (baud rate, addressing, IP settings)."
  }
];

const faqs = [
  {
    question: "Should I specify BACnet or Modbus for a new BMS installation?",
    answer: "For new commercial BMS installations, BACnet is generally preferred as it was purpose-designed for building automation with rich object types, standardised services, and built-in interoperability features. Modbus remains common for integrating industrial equipment, meters, and legacy devices due to its simplicity and widespread support. Many installations use both: BACnet for HVAC control and Modbus for utility meters and specialist equipment, connected via protocol gateways."
  },
  {
    question: "How do I ensure true interoperability when specifying open protocols?",
    answer: "Request BACnet PICS (Protocol Implementation Conformance Statement) from all vendors to verify supported objects and services match your requirements. Specify conformance to specific BACnet device profiles (e.g., B-BC for Building Controller). Include integration testing as part of commissioning with all devices on the same test network. Consider third-party certification such as BACnet Testing Laboratory (BTL) listing for critical devices."
  },
  {
    question: "What are the cybersecurity considerations for BMS communication protocols?",
    answer: "Traditional BMS protocols (BACnet, Modbus, LonWorks) were designed without security features. For secure installations: isolate BMS networks from corporate IT using VLANs and firewalls; use BACnet Secure Connect (BACnet/SC) for encrypted communications; implement role-based access control at the head-end; regularly update device firmware; and monitor network traffic for anomalies. Document all network access points in the O&M manual."
  },
  {
    question: "When should I use protocol gateways versus native protocol devices?",
    answer: "Native protocol devices are preferred as they eliminate gateway costs, reduce points of failure, and simplify maintenance. However, gateways are necessary when: integrating legacy equipment with fixed protocols; connecting specialist equipment only available with proprietary protocols; bridging BACnet/IP backbone to MS/TP field devices; or integrating utility meters (M-Bus) with the main BMS. Always budget for gateway configuration and testing time during commissioning."
  },
  {
    question: "How many devices can I connect on a single Modbus RTU network?",
    answer: "Modbus RTU supports up to 247 device addresses (1-247) on a single RS-485 bus. However, practical limits are lower due to cable length, baud rate, and polling requirements. For responsive control, limit segments to 20-30 devices. Use multiple bus segments with separate serial ports or Modbus TCP with individual IP addresses for larger installations. Consider response time requirements when planning network topology."
  },
  {
    question: "What documentation should I request for a multi-protocol BMS integration?",
    answer: "Essential documentation includes: network architecture diagram showing all protocols and gateways; points list for every integrated device with point names, addresses, and engineering units; protocol specifications (PICS for BACnet, register maps for Modbus); gateway configuration files; IP addressing scheme and VLAN assignments; and commissioning test records proving point-to-point verification. This documentation is critical for ongoing maintenance and future modifications."
  }
];

const HNCModule8Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section5">
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
            <Network className="h-4 w-4" />
            <span>Module 8.5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Communication Protocols
          </h1>
          <p className="text-white/80">
            BACnet, Modbus, LonWorks, KNX, protocol gateways and multi-vendor integration
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BACnet:</strong> Purpose-built for building automation, ASHRAE standard</li>
              <li className="pl-1"><strong>Modbus:</strong> Simple, widely supported, industrial heritage</li>
              <li className="pl-1"><strong>KNX:</strong> European standard for building control, distributed intelligence</li>
              <li className="pl-1"><strong>Gateways:</strong> Enable multi-protocol integration</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Open protocols:</strong> Reduce vendor lock-in, enable competition</li>
              <li className="pl-1"><strong>Integration:</strong> Connect chillers, AHUs, meters, lighting</li>
              <li className="pl-1"><strong>Cybersecurity:</strong> Network isolation and access control</li>
              <li className="pl-1"><strong>Documentation:</strong> Points lists and PICS essential</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare BACnet, Modbus, LonWorks and KNX protocol characteristics",
              "Understand BACnet transport layers: IP vs MS/TP applications",
              "Differentiate Modbus RTU and TCP for integration projects",
              "Explain the role of protocol gateways in multi-vendor systems",
              "Evaluate open versus proprietary system implications",
              "Apply protocol selection criteria for building services projects"
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

        {/* Section 1: BACnet Protocol */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BACnet - Building Automation and Control Network
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BACnet is an open protocol specifically designed for building automation, developed by ASHRAE
              and published as ANSI/ASHRAE Standard 135. It provides a standardised method for building
              automation devices to communicate, regardless of manufacturer, enabling true interoperability
              in commercial building systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BACnet Transport Layers</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Transport</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Physical Layer</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Speed</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BACnet/IP</td>
                      <td className="border border-white/10 px-3 py-2">Ethernet (UDP/IP)</td>
                      <td className="border border-white/10 px-3 py-2">100 Mbps - 1 Gbps</td>
                      <td className="border border-white/10 px-3 py-2">Backbone, head-end, supervisory</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BACnet MS/TP</td>
                      <td className="border border-white/10 px-3 py-2">RS-485</td>
                      <td className="border border-white/10 px-3 py-2">9.6 - 76.8 kbps</td>
                      <td className="border border-white/10 px-3 py-2">Field devices, controllers, sensors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BACnet/SC</td>
                      <td className="border border-white/10 px-3 py-2">WebSocket/TLS</td>
                      <td className="border border-white/10 px-3 py-2">Network dependent</td>
                      <td className="border border-white/10 px-3 py-2">Secure communications, cloud connectivity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BACnet Ethernet</td>
                      <td className="border border-white/10 px-3 py-2">Ethernet (802.3)</td>
                      <td className="border border-white/10 px-3 py-2">10/100 Mbps</td>
                      <td className="border border-white/10 px-3 py-2">Legacy installations (now rare)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BACnet Object Model</p>
              <p className="text-sm text-white mb-3">
                BACnet uses an object-oriented approach where all data is organised into standardised objects
                with defined properties. This enables consistent access to data across different manufacturers.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Object Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Analog Input (AI)</td>
                      <td className="border border-white/10 px-3 py-2">Sensor readings (temperature, pressure)</td>
                      <td className="border border-white/10 px-3 py-2">Room temperature sensor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Analog Output (AO)</td>
                      <td className="border border-white/10 px-3 py-2">Modulating control outputs</td>
                      <td className="border border-white/10 px-3 py-2">Valve position command</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Binary Input (BI)</td>
                      <td className="border border-white/10 px-3 py-2">On/off status readings</td>
                      <td className="border border-white/10 px-3 py-2">Fan running status</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Binary Output (BO)</td>
                      <td className="border border-white/10 px-3 py-2">On/off control outputs</td>
                      <td className="border border-white/10 px-3 py-2">Pump start/stop command</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Schedule</td>
                      <td className="border border-white/10 px-3 py-2">Time-based control schedules</td>
                      <td className="border border-white/10 px-3 py-2">AHU operating times</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Trend Log</td>
                      <td className="border border-white/10 px-3 py-2">Historical data storage</td>
                      <td className="border border-white/10 px-3 py-2">Temperature logging</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Notification Class</td>
                      <td className="border border-white/10 px-3 py-2">Alarm routing configuration</td>
                      <td className="border border-white/10 px-3 py-2">Critical alarm distribution</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BACnet Device Profiles (ASHRAE 135.1)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>B-AWS:</strong> Advanced Workstation - full graphical interface capability</li>
                <li className="pl-1"><strong>B-OWS:</strong> Operator Workstation - operator interface functions</li>
                <li className="pl-1"><strong>B-BC:</strong> Building Controller - DDC controller with multiple control loops</li>
                <li className="pl-1"><strong>B-AAC:</strong> Advanced Application Controller - complex control applications</li>
                <li className="pl-1"><strong>B-ASC:</strong> Application Specific Controller - single application (e.g., VAV box)</li>
                <li className="pl-1"><strong>B-SS:</strong> Smart Sensor - intelligent sensor with network interface</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Specification tip:</strong> Always request the BACnet PICS (Protocol Implementation Conformance
              Statement) from vendors. This document details exactly which objects, services, and profiles the device
              supports, enabling verification of interoperability before procurement.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Modbus Protocol */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Modbus - Industrial Communication Standard
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modbus is a serial communication protocol originally developed by Modicon in 1979 for
              programmable logic controllers. Despite its age, it remains extremely popular in building
              services for integrating meters, chillers, boilers, and industrial equipment due to its
              simplicity and widespread support.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modbus Variants Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Modbus RTU</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Modbus ASCII</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Modbus TCP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Physical layer</td>
                      <td className="border border-white/10 px-3 py-2">RS-485 / RS-232</td>
                      <td className="border border-white/10 px-3 py-2">RS-485 / RS-232</td>
                      <td className="border border-white/10 px-3 py-2">Ethernet (TCP/IP)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data encoding</td>
                      <td className="border border-white/10 px-3 py-2">Binary (compact)</td>
                      <td className="border border-white/10 px-3 py-2">ASCII (human readable)</td>
                      <td className="border border-white/10 px-3 py-2">Binary in TCP frame</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Max devices</td>
                      <td className="border border-white/10 px-3 py-2">247 per bus</td>
                      <td className="border border-white/10 px-3 py-2">247 per bus</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited (IP-based)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Speed</td>
                      <td className="border border-white/10 px-3 py-2">Up to 115.2 kbps</td>
                      <td className="border border-white/10 px-3 py-2">Up to 19.2 kbps</td>
                      <td className="border border-white/10 px-3 py-2">10/100/1000 Mbps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable length</td>
                      <td className="border border-white/10 px-3 py-2">1200m (RS-485)</td>
                      <td className="border border-white/10 px-3 py-2">1200m (RS-485)</td>
                      <td className="border border-white/10 px-3 py-2">100m per segment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Error checking</td>
                      <td className="border border-white/10 px-3 py-2">CRC-16</td>
                      <td className="border border-white/10 px-3 py-2">LRC</td>
                      <td className="border border-white/10 px-3 py-2">TCP checksum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Common use</td>
                      <td className="border border-white/10 px-3 py-2">Field devices, meters</td>
                      <td className="border border-white/10 px-3 py-2">Legacy systems</td>
                      <td className="border border-white/10 px-3 py-2">Modern installations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modbus Data Model</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Register Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Address Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Access</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Coils</td>
                      <td className="border border-white/10 px-3 py-2">00001-09999</td>
                      <td className="border border-white/10 px-3 py-2">Read/Write</td>
                      <td className="border border-white/10 px-3 py-2">Digital outputs (on/off commands)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Discrete Inputs</td>
                      <td className="border border-white/10 px-3 py-2">10001-19999</td>
                      <td className="border border-white/10 px-3 py-2">Read Only</td>
                      <td className="border border-white/10 px-3 py-2">Digital inputs (status)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Input Registers</td>
                      <td className="border border-white/10 px-3 py-2">30001-39999</td>
                      <td className="border border-white/10 px-3 py-2">Read Only</td>
                      <td className="border border-white/10 px-3 py-2">Analog inputs (sensor values)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Holding Registers</td>
                      <td className="border border-white/10 px-3 py-2">40001-49999</td>
                      <td className="border border-white/10 px-3 py-2">Read/Write</td>
                      <td className="border border-white/10 px-3 py-2">Setpoints, configuration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Function Codes</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>01 (0x01):</strong> Read Coils - read multiple digital outputs</li>
                <li className="pl-1"><strong>02 (0x02):</strong> Read Discrete Inputs - read multiple digital inputs</li>
                <li className="pl-1"><strong>03 (0x03):</strong> Read Holding Registers - read setpoints and configuration</li>
                <li className="pl-1"><strong>04 (0x04):</strong> Read Input Registers - read sensor values</li>
                <li className="pl-1"><strong>05 (0x05):</strong> Write Single Coil - write one digital output</li>
                <li className="pl-1"><strong>06 (0x06):</strong> Write Single Register - write one holding register</li>
                <li className="pl-1"><strong>16 (0x10):</strong> Write Multiple Registers - write block of registers</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">RS-485 Wiring Best Practice</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Use shielded twisted pair cable (STP) with shield grounded at one end only</li>
                <li className="pl-1">Daisy-chain topology (not star) - cable from device to device</li>
                <li className="pl-1">Install 120 ohm termination resistors at both ends of the bus</li>
                <li className="pl-1">Keep cable runs under 1200m total; reduce speed for longer distances</li>
                <li className="pl-1">Avoid cable runs parallel to power cables to minimise interference</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Integration tip:</strong> Always obtain the Modbus register map from the equipment
              manufacturer. This document lists all available registers, their addresses, data types
              (integer, float, scaled), and engineering units - essential for correct integration.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: LonWorks, KNX and M-Bus */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            LonWorks, KNX and M-Bus Protocols
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond BACnet and Modbus, several other protocols play important roles in building
              automation. LonWorks and KNX are complete building control systems with distributed
              intelligence, whilst M-Bus is specifically designed for utility metering applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">LonWorks (Local Operating Network)</p>
              <p className="text-sm text-white mb-3">
                LonWorks is a networking platform specifically designed for building and industrial
                control applications, developed by Echelon Corporation and now maintained by LonMark International.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">LonWorks Specification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standard</td>
                      <td className="border border-white/10 px-3 py-2">ISO/IEC 14908 (LonTalk protocol)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Physical layers</td>
                      <td className="border border-white/10 px-3 py-2">TP/FT-10 (twisted pair), IP, power line</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TP/FT-10 speed</td>
                      <td className="border border-white/10 px-3 py-2">78 kbps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Max devices per segment</td>
                      <td className="border border-white/10 px-3 py-2">64 per subnet (128 with repeaters)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Architecture</td>
                      <td className="border border-white/10 px-3 py-2">Peer-to-peer (no master required)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Intelligence</td>
                      <td className="border border-white/10 px-3 py-2">Distributed - each device has Neuron chip</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Interoperability</td>
                      <td className="border border-white/10 px-3 py-2">LonMark certified profiles</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">KNX (Konnex)</p>
              <p className="text-sm text-white mb-3">
                KNX is the worldwide standard for home and building control, combining three previous
                European standards (EIB, EHS, BatiBUS). It is particularly strong in lighting control,
                blind/shutter control, and HVAC room control applications.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">KNX Specification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standard</td>
                      <td className="border border-white/10 px-3 py-2">ISO/IEC 14543-3 (EN 50090, EN 13321-1)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Physical layers</td>
                      <td className="border border-white/10 px-3 py-2">TP (twisted pair), PL (power line), RF (radio), IP</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TP speed</td>
                      <td className="border border-white/10 px-3 py-2">9.6 kbps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Topology</td>
                      <td className="border border-white/10 px-3 py-2">Line &gt; Area &gt; Backbone (hierarchical)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Devices per line</td>
                      <td className="border border-white/10 px-3 py-2">64 devices maximum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lines per area</td>
                      <td className="border border-white/10 px-3 py-2">15 lines maximum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Areas per system</td>
                      <td className="border border-white/10 px-3 py-2">15 areas maximum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Max system size</td>
                      <td className="border border-white/10 px-3 py-2">57,375 devices (15 x 15 x 255)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bus power</td>
                      <td className="border border-white/10 px-3 py-2">29V DC carried on bus cable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">M-Bus (Meter Bus)</p>
              <p className="text-sm text-white mb-3">
                M-Bus is a European standard (EN 13757) specifically designed for remote reading of
                utility meters. It is commonly used for heat meters, water meters, gas meters, and
                electricity sub-meters in commercial buildings.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">M-Bus Specification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standard</td>
                      <td className="border border-white/10 px-3 py-2">EN 13757-2 (physical), EN 13757-3 (application)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Physical layer</td>
                      <td className="border border-white/10 px-3 py-2">Two-wire bus (polarity independent)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Speed</td>
                      <td className="border border-white/10 px-3 py-2">300 to 9600 bps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Max devices</td>
                      <td className="border border-white/10 px-3 py-2">250 per segment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable length</td>
                      <td className="border border-white/10 px-3 py-2">Up to 1000m (baud rate dependent)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power</td>
                      <td className="border border-white/10 px-3 py-2">Bus powered (meters draw from bus)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Architecture</td>
                      <td className="border border-white/10 px-3 py-2">Master-slave (master polls slaves)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use KNX</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Lighting control systems</li>
                  <li className="pl-1">Blind and shutter automation</li>
                  <li className="pl-1">Room-level HVAC control</li>
                  <li className="pl-1">Hotel room management</li>
                  <li className="pl-1">Residential smart home applications</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use M-Bus</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Tenant sub-metering systems</li>
                  <li className="pl-1">Heat and cooling meter networks</li>
                  <li className="pl-1">Water consumption monitoring</li>
                  <li className="pl-1">Energy management systems</li>
                  <li className="pl-1">Billing and cost allocation</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Integration consideration:</strong> Both KNX and M-Bus commonly require gateways to
              integrate with BACnet or Modbus-based BMS systems. Ensure gateway capacity and points are
              specified correctly, and budget for gateway configuration during commissioning.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Protocol Gateways and System Integration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Protocol Gateways and Multi-Vendor Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern buildings typically contain equipment from multiple manufacturers using different
              communication protocols. Protocol gateways are essential devices that translate between
              protocols, enabling a unified BMS to monitor and control all building systems regardless
              of their native communication standards.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Gateway Types and Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Gateway Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">From</th>
                      <th className="border border-white/10 px-3 py-2 text-left">To</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Modbus to BACnet</td>
                      <td className="border border-white/10 px-3 py-2">Modbus RTU/TCP</td>
                      <td className="border border-white/10 px-3 py-2">BACnet/IP</td>
                      <td className="border border-white/10 px-3 py-2">Chillers, boilers, meters to BMS</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">M-Bus to BACnet</td>
                      <td className="border border-white/10 px-3 py-2">M-Bus</td>
                      <td className="border border-white/10 px-3 py-2">BACnet/IP</td>
                      <td className="border border-white/10 px-3 py-2">Heat meters, utility sub-metering</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">KNX to BACnet</td>
                      <td className="border border-white/10 px-3 py-2">KNX TP</td>
                      <td className="border border-white/10 px-3 py-2">BACnet/IP</td>
                      <td className="border border-white/10 px-3 py-2">Lighting control, blinds to BMS</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BACnet router</td>
                      <td className="border border-white/10 px-3 py-2">BACnet MS/TP</td>
                      <td className="border border-white/10 px-3 py-2">BACnet/IP</td>
                      <td className="border border-white/10 px-3 py-2">Field devices to IP backbone</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LonWorks to BACnet</td>
                      <td className="border border-white/10 px-3 py-2">LonWorks</td>
                      <td className="border border-white/10 px-3 py-2">BACnet/IP</td>
                      <td className="border border-white/10 px-3 py-2">Legacy LonWorks integration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DALI to BACnet</td>
                      <td className="border border-white/10 px-3 py-2">DALI</td>
                      <td className="border border-white/10 px-3 py-2">BACnet/IP</td>
                      <td className="border border-white/10 px-3 py-2">Lighting control integration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Gateway Selection Criteria</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Point capacity:</strong> Number of data points that can be translated (allow 20% spare)</li>
                <li className="pl-1"><strong>Polling speed:</strong> How quickly data can be refreshed (critical for control applications)</li>
                <li className="pl-1"><strong>Configuration interface:</strong> Web-based preferred for ease of maintenance</li>
                <li className="pl-1"><strong>Diagnostic features:</strong> Communication statistics, error logging, troubleshooting</li>
                <li className="pl-1"><strong>Redundancy:</strong> Failover options for critical applications</li>
                <li className="pl-1"><strong>Vendor support:</strong> Configuration services, firmware updates, technical support</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Open vs Proprietary Systems</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Open Protocols</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Proprietary Systems</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Vendor choice</td>
                      <td className="border border-white/10 px-3 py-2">Multiple vendors, competitive tendering</td>
                      <td className="border border-white/10 px-3 py-2">Single vendor, limited competition</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Long-term support</td>
                      <td className="border border-white/10 px-3 py-2">Alternative suppliers available</td>
                      <td className="border border-white/10 px-3 py-2">Dependent on original vendor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lifecycle cost</td>
                      <td className="border border-white/10 px-3 py-2">Lower through competition</td>
                      <td className="border border-white/10 px-3 py-2">Higher due to vendor lock-in</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Initial integration</td>
                      <td className="border border-white/10 px-3 py-2">May require more configuration</td>
                      <td className="border border-white/10 px-3 py-2">Often simpler within system</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Feature set</td>
                      <td className="border border-white/10 px-3 py-2">Standardised, may lag innovation</td>
                      <td className="border border-white/10 px-3 py-2">May offer unique features</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Interoperability</td>
                      <td className="border border-white/10 px-3 py-2">Designed for multi-vendor</td>
                      <td className="border border-white/10 px-3 py-2">Limited to vendor ecosystem</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Multi-Vendor Integration Best Practice</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Specification:</strong> Mandate open protocols (BACnet, Modbus) in tender documents</li>
                <li className="pl-1"><strong>Points list:</strong> Require detailed points lists from all equipment suppliers early</li>
                <li className="pl-1"><strong>Integration testing:</strong> Allocate time for point-to-point verification during commissioning</li>
                <li className="pl-1"><strong>Single integrator:</strong> Appoint one party responsible for all protocol integration</li>
                <li className="pl-1"><strong>Documentation:</strong> Require network diagrams, gateway configurations, and register maps</li>
                <li className="pl-1"><strong>Training:</strong> Ensure FM team understands all integrated systems</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Commercial Building Integration Architecture</h3>
              <div className="text-sm text-white/90 font-mono bg-black/30 p-3 rounded">
                <p className="mb-2">BMS Head-End (BACnet/IP) ──┬── BACnet/IP Backbone</p>
                <p className="mb-2">                          │</p>
                <p className="mb-2">├── AHU Controllers (BACnet/IP native)</p>
                <p className="mb-2">├── VAV Controllers (BACnet MS/TP via router)</p>
                <p className="mb-2">├── Chiller (Modbus TCP via gateway)</p>
                <p className="mb-2">├── Boiler Plant (Modbus RTU via gateway)</p>
                <p className="mb-2">├── Lighting Control (KNX via gateway)</p>
                <p className="mb-2">├── Energy Meters (M-Bus via gateway)</p>
                <p className="mb-2">└── Fire Alarm Panel (Modbus TCP via gateway)</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Project success factor:</strong> Early engagement with all equipment suppliers to
              obtain points lists and protocol specifications is critical. Integration issues discovered
              late in a project are expensive and time-consuming to resolve.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Protocol Selection Guide</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>BACnet:</strong> Primary choice for new commercial BMS installations</li>
                <li className="pl-1"><strong>Modbus:</strong> Industrial equipment, meters, chillers, boilers integration</li>
                <li className="pl-1"><strong>KNX:</strong> Lighting control, blinds, room-level automation</li>
                <li className="pl-1"><strong>M-Bus:</strong> Utility metering, sub-metering, energy monitoring</li>
                <li className="pl-1"><strong>LonWorks:</strong> Legacy systems, specific applications</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">BACnet MS/TP: <strong>38,400 or 76,800 bps</strong> over RS-485</li>
                <li className="pl-1">Modbus RTU: <strong>247 addresses</strong> maximum per bus</li>
                <li className="pl-1">RS-485 cable: <strong>1200m</strong> maximum length</li>
                <li className="pl-1">KNX line: <strong>64 devices</strong> maximum</li>
                <li className="pl-1">M-Bus segment: <strong>250 meters</strong> maximum</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Integration Mistakes</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Missing points lists</strong> - Obtain early from all equipment suppliers</li>
                <li className="pl-1"><strong>Assuming interoperability</strong> - Always verify with PICS/register maps</li>
                <li className="pl-1"><strong>Inadequate commissioning time</strong> - Integration testing takes longer than expected</li>
                <li className="pl-1"><strong>No gateway spare capacity</strong> - Allow 20% spare points for future changes</li>
                <li className="pl-1"><strong>Poor documentation</strong> - Network diagrams and configurations essential for FM</li>
              </ul>
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
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Protocol Characteristics</p>
                <ul className="space-y-0.5">
                  <li>BACnet - purpose-built, object model, PICS</li>
                  <li>Modbus - simple, register-based, widely supported</li>
                  <li>KNX - distributed intelligence, lighting/blinds</li>
                  <li>M-Bus - utility metering, bus-powered</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Integration Essentials</p>
                <ul className="space-y-0.5">
                  <li>Obtain points lists and PICS early</li>
                  <li>Specify open protocols in tenders</li>
                  <li>Allow gateway spare capacity (20%)</li>
                  <li>Budget for integration testing time</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

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
            <Link to="../h-n-c-module8-section5-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Actuators and Output Devices
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section5-5">
              Next: Control Strategies
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section5_4;
