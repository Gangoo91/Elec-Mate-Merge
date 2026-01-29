import { ArrowLeft, Cpu, CheckCircle, Network, Server, Layers, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "BMS Fundamentals - HNC Module 8 Section 5.1";
const DESCRIPTION = "Master Building Management System fundamentals: system architecture, field level, automation level, management level, outstations, controllers, head-end software, network topologies, points schedules and integration with other building systems.";

const quickCheckQuestions = [
  {
    id: "bms-levels",
    question: "Which level of a BMS architecture directly interfaces with sensors and actuators?",
    options: ["Management level", "Automation level", "Field level", "Enterprise level"],
    correctIndex: 2,
    explanation: "The field level is the lowest tier of the BMS hierarchy and directly interfaces with sensors, actuators, and other field devices. It collects data from the physical environment and executes control commands."
  },
  {
    id: "outstation-function",
    question: "What is the primary function of a BMS outstation?",
    options: ["Display graphical user interfaces", "Provide local control and data acquisition", "Store historical trend data", "Generate energy reports"],
    correctIndex: 1,
    explanation: "Outstations (also called controllers or field controllers) provide local control and data acquisition. They can operate autonomously even if communication with the head-end is lost, ensuring continuous building control."
  },
  {
    id: "network-topology",
    question: "Which network topology provides the greatest resilience for critical BMS applications?",
    options: ["Star topology", "Bus topology", "Ring topology", "Daisy chain topology"],
    correctIndex: 2,
    explanation: "Ring topology provides redundant communication paths - if one segment fails, data can still reach its destination via the alternative path. This makes it ideal for critical applications where communication must be maintained."
  },
  {
    id: "head-end-role",
    question: "What is the primary role of the BMS head-end system?",
    options: ["Direct control of field devices", "Physical connection of sensors", "Centralised monitoring and supervision", "Power distribution to outstations"],
    correctIndex: 2,
    explanation: "The head-end provides centralised monitoring, supervision, and management of the entire BMS. It offers graphical interfaces, alarm management, trend logging, scheduling, and reporting capabilities for building operators."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does BMS stand for in building services engineering?",
    options: [
      "Building Mechanical Systems",
      "Building Management System",
      "Basic Monitoring Service",
      "Building Maintenance Schedule"
    ],
    correctAnswer: 1,
    explanation: "BMS stands for Building Management System - a computer-based control system that monitors and manages a building's mechanical, electrical, and electromechanical services."
  },
  {
    id: 2,
    question: "Which of the following is NOT typically a function of a BMS?",
    options: [
      "HVAC control",
      "Lighting control",
      "Structural load monitoring",
      "Energy management"
    ],
    correctAnswer: 2,
    explanation: "Structural load monitoring is typically handled by separate structural health monitoring systems. BMS focuses on building services including HVAC, lighting, access control, fire detection, and energy management."
  },
  {
    id: 3,
    question: "At which level of BMS architecture does the operator workstation reside?",
    options: [
      "Field level",
      "Automation level",
      "Management level",
      "Integration level"
    ],
    correctAnswer: 2,
    explanation: "Operator workstations with their graphical user interfaces, alarm displays, and reporting functions reside at the management level - the top tier of the BMS hierarchy."
  },
  {
    id: 4,
    question: "What is a points schedule in BMS terminology?",
    options: [
      "A maintenance timetable",
      "A list of all monitored and controlled points",
      "A time-based control sequence",
      "A sensor calibration record"
    ],
    correctAnswer: 1,
    explanation: "A points schedule is a comprehensive list documenting all physical and virtual points in the BMS, including point names, descriptions, addresses, engineering units, and alarm parameters."
  },
  {
    id: 5,
    question: "Which communication medium typically connects field devices to outstations?",
    options: [
      "Fibre optic cable",
      "Wireless 4G/5G",
      "Twisted pair cable",
      "Coaxial cable"
    ],
    correctAnswer: 2,
    explanation: "Twisted pair cable (often screened/shielded) is the most common medium for connecting field devices to outstations due to its cost-effectiveness, noise immunity, and ease of installation."
  },
  {
    id: 6,
    question: "What happens to a BMS outstation if communication with the head-end is lost?",
    options: [
      "All connected equipment shuts down immediately",
      "The outstation continues operating using its local program",
      "Manual control is required at each device",
      "Emergency alarms are triggered automatically"
    ],
    correctAnswer: 1,
    explanation: "Outstations are designed to operate autonomously. They contain their own programs and can maintain local control even when communication with the head-end is lost, ensuring building services continue to operate."
  },
  {
    id: 7,
    question: "What type of point represents a temperature setpoint that can be changed by the operator?",
    options: [
      "Analogue input (AI)",
      "Analogue output (AO)",
      "Analogue value (AV)",
      "Digital output (DO)"
    ],
    correctAnswer: 2,
    explanation: "An Analogue Value (AV) is a software point that stores adjustable values such as setpoints, timers, or calculated values. It can be modified by operators or the control program."
  },
  {
    id: 8,
    question: "Which topology uses a central switch or hub to connect all devices?",
    options: [
      "Bus topology",
      "Star topology",
      "Ring topology",
      "Mesh topology"
    ],
    correctAnswer: 1,
    explanation: "Star topology connects all devices to a central switch or hub. While easy to install and troubleshoot, it creates a single point of failure at the central device."
  },
  {
    id: 9,
    question: "Integration with fire alarm systems typically requires what type of interface?",
    options: [
      "Volt-free contacts only",
      "Analogue 4-20mA signals",
      "Gateway or protocol converter",
      "Direct sensor wiring"
    ],
    correctAnswer: 2,
    explanation: "Fire alarm systems are typically separate certified systems. Integration usually requires a gateway or protocol converter that can communicate with both the BMS and fire alarm panel protocols."
  },
  {
    id: 10,
    question: "What is the purpose of trending in a BMS?",
    options: [
      "To predict future equipment failures",
      "To record historical data for analysis",
      "To display real-time graphics",
      "To generate control commands"
    ],
    correctAnswer: 1,
    explanation: "Trending records historical data (temperatures, pressures, status changes) over time. This data is essential for performance analysis, fault diagnosis, energy management, and compliance verification."
  },
  {
    id: 11,
    question: "Which building system is commonly integrated with BMS for demand response?",
    options: [
      "Structural monitoring",
      "Electrical metering and distribution",
      "Wastewater treatment",
      "Window cleaning systems"
    ],
    correctAnswer: 1,
    explanation: "Electrical metering and distribution systems are commonly integrated to enable demand response - automatically reducing electrical load during peak periods or when grid stress is high."
  },
  {
    id: 12,
    question: "What advantage does IP-based BMS communication offer over traditional protocols?",
    options: [
      "Lower installation costs",
      "Better noise immunity",
      "Remote access and integration capabilities",
      "Faster response times"
    ],
    correctAnswer: 2,
    explanation: "IP-based BMS communication enables remote access via standard networks and easier integration with IT systems, enterprise applications, and cloud services. This supports modern smart building requirements."
  }
];

const faqs = [
  {
    question: "What is the difference between a BMS and BEMS?",
    answer: "A Building Management System (BMS) controls and monitors building services like HVAC, lighting, and access control. A Building Energy Management System (BEMS) specifically focuses on energy monitoring, analysis, and optimisation. In practice, modern systems often combine both functions, with BEMS being an integral part of the BMS software capabilities."
  },
  {
    question: "How do outstations communicate with the head-end?",
    answer: "Outstations typically communicate via a building-wide network using protocols such as BACnet, Modbus, or LonWorks. The physical medium can be twisted pair cable, Ethernet, fibre optic, or even wireless. Data is exchanged continuously or on change-of-value, with the head-end polling outstations or receiving unsolicited reports."
  },
  {
    question: "What happens during a BMS network failure?",
    answer: "During network failure, outstations continue operating autonomously using their local programs. They maintain control of connected equipment based on the last known parameters and schedules. Alarms and data are stored locally until communication is restored, then uploaded to the head-end. Critical systems should have redundant communication paths."
  },
  {
    question: "Why is proper points scheduling important during BMS installation?",
    answer: "A comprehensive points schedule documents every monitored and controlled point, ensuring nothing is missed during commissioning. It provides a reference for maintenance, troubleshooting, and future modifications. It also helps with software development, operator training, and system handover. Poor points documentation leads to system inefficiency and difficult fault-finding."
  },
  {
    question: "How does BMS integration benefit building operations?",
    answer: "Integration allows systems to share information and work together intelligently. For example, access control can inform HVAC when zones are unoccupied, fire systems can override ventilation during emergencies, and lighting can respond to daylight levels. This coordination improves energy efficiency, occupant comfort, safety, and operational efficiency."
  },
  {
    question: "What qualifications are needed to work on BMS systems?",
    answer: "BMS work typically requires competence in both electrical installation (often an electrical qualification) and IT/networking. Manufacturer-specific training is usually needed for programming and commissioning. In the UK, relevant qualifications include Level 3 Electrotechnical, plus specific BMS certifications from manufacturers like Trend, Siemens, Honeywell, or Schneider Electric."
  }
];

const HNCModule8Section5_1 = () => {
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
            <Cpu className="h-4 w-4" />
            <span>Module 8.5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BMS Fundamentals
          </h1>
          <p className="text-white/80">
            Understanding building management system architecture, components and integration
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Three levels:</strong> Field, Automation, Management</li>
              <li className="pl-1"><strong>Outstations:</strong> Local control and data acquisition</li>
              <li className="pl-1"><strong>Head-end:</strong> Centralised monitoring and supervision</li>
              <li className="pl-1"><strong>Integration:</strong> HVAC, lighting, fire, access, metering</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Energy savings:</strong> 10-30% through optimised control</li>
              <li className="pl-1"><strong>Comfort:</strong> Consistent environment for occupants</li>
              <li className="pl-1"><strong>Maintenance:</strong> Predictive rather than reactive</li>
              <li className="pl-1"><strong>Compliance:</strong> Building regulations and standards</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the three-tier architecture of modern BMS",
              "Explain the role and function of BMS outstations",
              "Describe head-end software functions and capabilities",
              "Identify common network topologies for BMS",
              "Understand points schedules and point types",
              "Explain integration with other building systems",
              "Describe the benefits of integrated building management"
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

        {/* Section 1: BMS Architecture Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BMS Architecture Overview
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A Building Management System (BMS) is a computer-based control system that monitors and manages
              a building's mechanical, electrical, and electromechanical services. Modern BMS architecture
              follows a hierarchical three-tier model that provides flexibility, resilience, and scalability.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Tier BMS Architecture</p>
              <div className="grid gap-4">
                <div className="p-3 rounded bg-white/5 border-l-2 border-blue-400/50">
                  <p className="font-medium text-blue-300 mb-1">Management Level (Top Tier)</p>
                  <p className="text-sm text-white/80">Head-end servers, operator workstations, enterprise integration</p>
                </div>
                <div className="p-3 rounded bg-white/5 border-l-2 border-green-400/50">
                  <p className="font-medium text-green-300 mb-1">Automation Level (Middle Tier)</p>
                  <p className="text-sm text-white/80">Outstations, controllers, local area networks</p>
                </div>
                <div className="p-3 rounded bg-white/5 border-l-2 border-orange-400/50">
                  <p className="font-medium text-orange-300 mb-1">Field Level (Bottom Tier)</p>
                  <p className="text-sm text-white/80">Sensors, actuators, meters, field devices</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key architecture principles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Distributed intelligence:</strong> Control logic resides at the automation level, not centrally</li>
                <li className="pl-1"><strong>Autonomous operation:</strong> Outstations continue working if network fails</li>
                <li className="pl-1"><strong>Scalability:</strong> Easy to add new devices, zones, or buildings</li>
                <li className="pl-1"><strong>Standardisation:</strong> Open protocols enable multi-vendor systems</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BMS vs Traditional Controls</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Traditional Controls</th>
                      <th className="border border-white/10 px-3 py-2 text-left">BMS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control location</td>
                      <td className="border border-white/10 px-3 py-2">Local at each plant</td>
                      <td className="border border-white/10 px-3 py-2">Distributed with central monitoring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Visibility</td>
                      <td className="border border-white/10 px-3 py-2">Manual inspection required</td>
                      <td className="border border-white/10 px-3 py-2">Real-time graphics and alarms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data logging</td>
                      <td className="border border-white/10 px-3 py-2">Manual or none</td>
                      <td className="border border-white/10 px-3 py-2">Automatic trending</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Scheduling</td>
                      <td className="border border-white/10 px-3 py-2">Time clocks at each location</td>
                      <td className="border border-white/10 px-3 py-2">Centralised, flexible schedules</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Integration</td>
                      <td className="border border-white/10 px-3 py-2">Standalone systems</td>
                      <td className="border border-white/10 px-3 py-2">Coordinated multi-system operation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Industry trend:</strong> Modern BMS increasingly uses IP-based networks and cloud connectivity, enabling remote monitoring and integration with smart building platforms.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Field Level Components */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Field Level: Sensors, Actuators and Points
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The field level comprises all the physical devices that interface with the building environment.
              These devices are connected to outstations and provide the inputs and outputs necessary for
              monitoring and control.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Point Types in BMS</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Hardware Points (Physical)</p>
                  <ul className="text-white/80 space-y-1">
                    <li><strong>AI</strong> - Analogue Input (temperature, pressure)</li>
                    <li><strong>AO</strong> - Analogue Output (valve position)</li>
                    <li><strong>DI</strong> - Digital Input (switch status)</li>
                    <li><strong>DO</strong> - Digital Output (pump on/off)</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Software Points (Virtual)</p>
                  <ul className="text-white/80 space-y-1">
                    <li><strong>AV</strong> - Analogue Value (setpoints, timers)</li>
                    <li><strong>BV</strong> - Binary Value (enable flags)</li>
                    <li><strong>MV</strong> - Multistate Value (mode selection)</li>
                    <li><strong>Calculated</strong> - Derived from other points</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common field devices:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Temperature sensors:</strong> Room, duct, pipe, outside air (PT100, NTC, thermocouples)</li>
                <li className="pl-1"><strong>Humidity sensors:</strong> Capacitive or resistive elements for %RH measurement</li>
                <li className="pl-1"><strong>Pressure sensors:</strong> Duct static, differential, water pressure</li>
                <li className="pl-1"><strong>CO2 sensors:</strong> For demand-controlled ventilation</li>
                <li className="pl-1"><strong>Valve actuators:</strong> Modulating or on/off control of water flow</li>
                <li className="pl-1"><strong>Damper actuators:</strong> Air flow control in ductwork</li>
                <li className="pl-1"><strong>Variable speed drives:</strong> Fan and pump speed control</li>
                <li className="pl-1"><strong>Meters:</strong> Electricity, gas, water, heat consumption</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Signal Types and Ranges</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Signal Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4-20mA</td>
                      <td className="border border-white/10 px-3 py-2">4mA = 0%, 20mA = 100%</td>
                      <td className="border border-white/10 px-3 py-2">Transmitters, actuators</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0-10V DC</td>
                      <td className="border border-white/10 px-3 py-2">0V = 0%, 10V = 100%</td>
                      <td className="border border-white/10 px-3 py-2">Actuators, VSDs, dimmers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Resistance</td>
                      <td className="border border-white/10 px-3 py-2">PT100, PT1000, NTC</td>
                      <td className="border border-white/10 px-3 py-2">Temperature sensors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Volt-free contact</td>
                      <td className="border border-white/10 px-3 py-2">Open/Closed</td>
                      <td className="border border-white/10 px-3 py-2">Status, alarms, interlocks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pulse</td>
                      <td className="border border-white/10 px-3 py-2">Count per unit</td>
                      <td className="border border-white/10 px-3 py-2">Meters (kWh, m³)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Points Schedule Example</p>
              <div className="overflow-x-auto">
                <table className="text-xs text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-1 text-left">Point Name</th>
                      <th className="border border-white/10 px-2 py-1 text-left">Type</th>
                      <th className="border border-white/10 px-2 py-1 text-left">Description</th>
                      <th className="border border-white/10 px-2 py-1 text-left">Units</th>
                      <th className="border border-white/10 px-2 py-1 text-left">Alarm</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-1">AHU1_SAT</td>
                      <td className="border border-white/10 px-2 py-1">AI</td>
                      <td className="border border-white/10 px-2 py-1">Supply air temp</td>
                      <td className="border border-white/10 px-2 py-1">°C</td>
                      <td className="border border-white/10 px-2 py-1">HI: 35, LO: 5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1">AHU1_SF_CMD</td>
                      <td className="border border-white/10 px-2 py-1">DO</td>
                      <td className="border border-white/10 px-2 py-1">Supply fan command</td>
                      <td className="border border-white/10 px-2 py-1">On/Off</td>
                      <td className="border border-white/10 px-2 py-1">-</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1">AHU1_HCV</td>
                      <td className="border border-white/10 px-2 py-1">AO</td>
                      <td className="border border-white/10 px-2 py-1">Heating valve</td>
                      <td className="border border-white/10 px-2 py-1">%</td>
                      <td className="border border-white/10 px-2 py-1">-</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1">AHU1_SAT_SP</td>
                      <td className="border border-white/10 px-2 py-1">AV</td>
                      <td className="border border-white/10 px-2 py-1">Supply air setpoint</td>
                      <td className="border border-white/10 px-2 py-1">°C</td>
                      <td className="border border-white/10 px-2 py-1">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Use consistent naming conventions for points. A typical format is: System_Equipment_Point (e.g., HVAC_AHU01_SupplyTemp).
            </p>
          </div>
        </section>

        {/* Section 3: Outstations and Controllers */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Outstations and Controllers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Outstations (also called controllers, field controllers, or DDC controllers) form the automation
              level of the BMS. They provide local intelligence, execute control programs, and communicate with
              both field devices and the management level.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Outstation Functions</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Primary Functions</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Execute control programs (PID, sequences)</li>
                    <li className="pl-1">Process sensor inputs and generate outputs</li>
                    <li className="pl-1">Implement time schedules locally</li>
                    <li className="pl-1">Generate and store alarms</li>
                    <li className="pl-1">Log trend data</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Communication Functions</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Report to head-end system</li>
                    <li className="pl-1">Peer-to-peer with other outstations</li>
                    <li className="pl-1">Interface with field bus devices</li>
                    <li className="pl-1">Accept operator commands</li>
                    <li className="pl-1">Upload/download programs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Outstation types:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Unitary controllers:</strong> Fixed I/O for specific applications (FCU, VAV)</li>
                <li className="pl-1"><strong>Programmable controllers:</strong> Flexible I/O, custom programming</li>
                <li className="pl-1"><strong>Expansion modules:</strong> Add I/O capacity to existing controllers</li>
                <li className="pl-1"><strong>Network controllers:</strong> Manage communication between networks</li>
                <li className="pl-1"><strong>Plant controllers:</strong> High I/O count for central plant</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Controller Specifications to Consider</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Specification</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Values</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">I/O capacity</td>
                      <td className="border border-white/10 px-3 py-2">8-64 points base, expandable</td>
                      <td className="border border-white/10 px-3 py-2">Allow 20% spare capacity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Input types</td>
                      <td className="border border-white/10 px-3 py-2">Universal or dedicated</td>
                      <td className="border border-white/10 px-3 py-2">Universal offers flexibility</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Program memory</td>
                      <td className="border border-white/10 px-3 py-2">256KB - 4MB</td>
                      <td className="border border-white/10 px-3 py-2">Complex sequences need more</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Trend storage</td>
                      <td className="border border-white/10 px-3 py-2">10,000 - 500,000 samples</td>
                      <td className="border border-white/10 px-3 py-2">Battery-backed or flash</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Network ports</td>
                      <td className="border border-white/10 px-3 py-2">RS-485, Ethernet, wireless</td>
                      <td className="border border-white/10 px-3 py-2">Match system architecture</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Autonomous Operation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Control continues if head-end fails</li>
                  <li className="pl-1">Local schedules maintained</li>
                  <li className="pl-1">Alarms stored for later upload</li>
                  <li className="pl-1">Battery backup preserves program</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Suitable enclosure (IP rating)</li>
                  <li className="pl-1">Clean 24V AC/DC power supply</li>
                  <li className="pl-1">Cable termination space</li>
                  <li className="pl-1">Environmental conditions met</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Locate outstations close to the plant they control to minimise cable runs and improve response times.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Head-End and Network Topology */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Head-End Systems and Network Topology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The head-end system provides the management level interface between operators and the BMS.
              It offers centralised monitoring, supervision, and data management capabilities. The network
              topology determines how all system components communicate.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Head-End Software Functions</p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <Monitor className="h-5 w-5 text-blue-400 mb-2" />
                  <p className="font-medium text-white mb-1">Visualisation</p>
                  <ul className="text-white/70 space-y-0.5 text-xs">
                    <li>Dynamic graphics</li>
                    <li>Floor plans</li>
                    <li>Schematic diagrams</li>
                    <li>Dashboard displays</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <Server className="h-5 w-5 text-green-400 mb-2" />
                  <p className="font-medium text-white mb-1">Data Management</p>
                  <ul className="text-white/70 space-y-0.5 text-xs">
                    <li>Historical trending</li>
                    <li>Alarm logging</li>
                    <li>Report generation</li>
                    <li>Data archiving</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <Layers className="h-5 w-5 text-purple-400 mb-2" />
                  <p className="font-medium text-white mb-1">Supervision</p>
                  <ul className="text-white/70 space-y-0.5 text-xs">
                    <li>Global scheduling</li>
                    <li>Alarm management</li>
                    <li>User access control</li>
                    <li>System configuration</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Head-end system components:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Server:</strong> Database, communications, application services</li>
                <li className="pl-1"><strong>Workstations:</strong> Operator interface, graphics, alarm display</li>
                <li className="pl-1"><strong>Web server:</strong> Browser-based remote access</li>
                <li className="pl-1"><strong>Historian:</strong> Long-term data storage and retrieval</li>
                <li className="pl-1"><strong>Report server:</strong> Scheduled and ad-hoc report generation</li>
                <li className="pl-1"><strong>Integration server:</strong> Links to other enterprise systems</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Network Topologies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Topology</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Advantages</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Disadvantages</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bus</td>
                      <td className="border border-white/10 px-3 py-2">Single cable, devices tap in</td>
                      <td className="border border-white/10 px-3 py-2">Simple, low cable cost</td>
                      <td className="border border-white/10 px-3 py-2">Single point failure affects all</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Star</td>
                      <td className="border border-white/10 px-3 py-2">Central hub/switch</td>
                      <td className="border border-white/10 px-3 py-2">Easy troubleshooting</td>
                      <td className="border border-white/10 px-3 py-2">Hub failure stops network</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ring</td>
                      <td className="border border-white/10 px-3 py-2">Circular connection</td>
                      <td className="border border-white/10 px-3 py-2">Redundant path</td>
                      <td className="border border-white/10 px-3 py-2">More complex installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mesh</td>
                      <td className="border border-white/10 px-3 py-2">Multiple interconnections</td>
                      <td className="border border-white/10 px-3 py-2">Highest resilience</td>
                      <td className="border border-white/10 px-3 py-2">Most expensive</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Tree/Hierarchical</td>
                      <td className="border border-white/10 px-3 py-2">Multiple levels of stars</td>
                      <td className="border border-white/10 px-3 py-2">Scalable, organised</td>
                      <td className="border border-white/10 px-3 py-2">Backbone critical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical BMS Network Architecture</p>
              <div className="space-y-3 text-sm text-white/90">
                <p><strong>Level 3 (Enterprise):</strong> Corporate LAN, IT integration, cloud services</p>
                <p className="pl-4">↓ Firewall / Gateway</p>
                <p><strong>Level 2 (Supervision):</strong> Head-end server, workstations - Ethernet TCP/IP</p>
                <p className="pl-4">↓ Router / Gateway</p>
                <p><strong>Level 1 (Automation):</strong> Outstations - BACnet/IP, BACnet MS/TP, LonWorks</p>
                <p className="pl-4">↓ Controller I/O</p>
                <p><strong>Level 0 (Field):</strong> Sensors, actuators - Hardwired, Modbus, M-Bus</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wired Media Options</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Twisted pair:</strong> RS-485, field level, low cost</li>
                  <li className="pl-1"><strong>Ethernet:</strong> Cat5e/Cat6, automation level up</li>
                  <li className="pl-1"><strong>Fibre optic:</strong> Long distances, EMI immunity</li>
                  <li className="pl-1"><strong>Powerline:</strong> Uses existing electrical wiring</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wireless Options</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Wi-Fi:</strong> Standard IT infrastructure</li>
                  <li className="pl-1"><strong>ZigBee:</strong> Low power mesh networks</li>
                  <li className="pl-1"><strong>EnOcean:</strong> Energy harvesting sensors</li>
                  <li className="pl-1"><strong>LoRaWAN:</strong> Long range, low power</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Security note:</strong> BMS networks should be segregated from general IT networks using firewalls and VLANs to prevent cyber security risks.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Additional Section: Integration with Other Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Integration with Other Building Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A key benefit of modern BMS is the ability to integrate with other building systems.
              This enables coordinated operation, improved efficiency, and a single point of monitoring
              for building operators.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Systems Commonly Integrated with BMS</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Integration Benefits</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Interface</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire alarm</td>
                      <td className="border border-white/10 px-3 py-2">HVAC shutdown, smoke control, status display</td>
                      <td className="border border-white/10 px-3 py-2">Volt-free contacts, protocol gateway</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Access control</td>
                      <td className="border border-white/10 px-3 py-2">Occupancy-based HVAC, lighting control</td>
                      <td className="border border-white/10 px-3 py-2">BACnet, OPC, API</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting control</td>
                      <td className="border border-white/10 px-3 py-2">Coordinated scenes, daylight harvesting</td>
                      <td className="border border-white/10 px-3 py-2">DALI gateway, KNX, BACnet</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical metering</td>
                      <td className="border border-white/10 px-3 py-2">Energy monitoring, demand response</td>
                      <td className="border border-white/10 px-3 py-2">Modbus, BACnet, M-Bus</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lifts</td>
                      <td className="border border-white/10 px-3 py-2">Status monitoring, fault alarms</td>
                      <td className="border border-white/10 px-3 py-2">Volt-free contacts, serial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Security/CCTV</td>
                      <td className="border border-white/10 px-3 py-2">Event correlation, lighting response</td>
                      <td className="border border-white/10 px-3 py-2">IP integration, contacts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Solar PV</td>
                      <td className="border border-white/10 px-3 py-2">Generation monitoring, load shifting</td>
                      <td className="border border-white/10 px-3 py-2">Modbus, SunSpec</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Integration Example: Fire Alarm Interface</p>
              <div className="space-y-2 text-sm text-white/90">
                <p><strong>Fire alarm panel</strong> &gt; <strong>Volt-free contacts</strong> &gt; <strong>BMS controller DI</strong></p>
                <p className="mt-2">When fire alarm activates:</p>
                <ul className="text-white/80 space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">BMS receives fire alarm signal on digital input</li>
                  <li className="pl-1">AHU fans commanded to smoke control mode or shutdown</li>
                  <li className="pl-1">Fire dampers confirmed closed via end-switch feedback</li>
                  <li className="pl-1">Stairwell pressurisation activated</li>
                  <li className="pl-1">Lifts recalled to ground floor (separate system)</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Integration Methods</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Hardwired:</strong> Volt-free contacts, simple and reliable</li>
                  <li className="pl-1"><strong>Serial:</strong> RS-232/485, Modbus RTU</li>
                  <li className="pl-1"><strong>Network:</strong> BACnet/IP, Modbus TCP, LonWorks</li>
                  <li className="pl-1"><strong>Gateway:</strong> Protocol conversion between systems</li>
                  <li className="pl-1"><strong>API:</strong> Web services, REST, JSON</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Integration Considerations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Define clear scope and responsibilities</li>
                  <li className="pl-1">Agree data exchange requirements</li>
                  <li className="pl-1">Consider cyber security implications</li>
                  <li className="pl-1">Document interface specifications</li>
                  <li className="pl-1">Plan integration testing</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Benefits of integrated building management:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Energy efficiency:</strong> Systems respond to actual occupancy and conditions</li>
                <li className="pl-1"><strong>Improved comfort:</strong> Coordinated control of temperature, lighting, blinds</li>
                <li className="pl-1"><strong>Enhanced safety:</strong> Automatic response to fire and security events</li>
                <li className="pl-1"><strong>Reduced maintenance:</strong> Single system to monitor and maintain</li>
                <li className="pl-1"><strong>Better reporting:</strong> Consolidated data for analysis and compliance</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Life safety systems (fire, smoke control) must maintain their independent certification and should not rely solely on BMS for critical functions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Outstation Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An AHU requires control of: 1 supply fan, 1 extract fan, heating valve, cooling valve, mixing dampers (3 actuators), plus monitoring of supply/extract temperatures, filter differential pressure, and supply air humidity. How many I/O points are needed?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="mb-2">Counting I/O points:</p>
                <p><strong>Digital Outputs (DO):</strong></p>
                <p>- Supply fan start/stop: 1</p>
                <p>- Extract fan start/stop: 1</p>
                <p>Total DO: <strong>2</strong></p>
                <p className="mt-2"><strong>Analogue Outputs (AO):</strong></p>
                <p>- Heating valve 0-10V: 1</p>
                <p>- Cooling valve 0-10V: 1</p>
                <p>- Damper actuators 0-10V: 3</p>
                <p>Total AO: <strong>5</strong></p>
                <p className="mt-2"><strong>Analogue Inputs (AI):</strong></p>
                <p>- Supply air temp: 1</p>
                <p>- Extract air temp: 1</p>
                <p>- Filter DP: 1</p>
                <p>- Supply humidity: 1</p>
                <p>Total AI: <strong>4</strong></p>
                <p className="mt-3 text-white/60">Minimum: 2 DO + 5 AO + 4 AI = 11 points</p>
                <p className="text-white/60">With 20% spare: Select controller with at least 14 points</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Network Design</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A three-storey office building has 4 AHUs, 40 FCUs, and central boiler/chiller plant. Design an appropriate BMS network topology.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="mb-2">Recommended architecture:</p>
                <p><strong>Management Level:</strong></p>
                <p>- Head-end server with redundancy</p>
                <p>- 2x operator workstations</p>
                <p>- Ethernet backbone (gigabit)</p>
                <p className="mt-2"><strong>Automation Level:</strong></p>
                <p>- Plant controller for boiler/chiller (high I/O)</p>
                <p>- 4x AHU controllers (medium I/O)</p>
                <p>- 4-5x FCU controllers per floor (40 FCUs = ~10 per controller)</p>
                <p>- BACnet/IP on Ethernet to head-end</p>
                <p>- BACnet MS/TP trunk per floor for FCU controllers</p>
                <p className="mt-2"><strong>Field Level:</strong></p>
                <p>- Direct wiring to controller I/O</p>
                <p>- Energy meters on M-Bus or Modbus</p>
                <p className="mt-3 text-white/60">Topology: Tree/hierarchical with star switches per floor</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Points Schedule Entry</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Create a points schedule entry for monitoring boiler flow temperature with high and low alarms.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90 overflow-x-auto">
                <table className="text-xs w-full">
                  <tbody>
                    <tr><td className="pr-4">Point Name:</td><td>BLR1_FLOW_TEMP</td></tr>
                    <tr><td className="pr-4">Point Type:</td><td>AI (Analogue Input)</td></tr>
                    <tr><td className="pr-4">Description:</td><td>Boiler 1 Flow Temperature</td></tr>
                    <tr><td className="pr-4">Controller:</td><td>CTRL-PLANTROOM-01</td></tr>
                    <tr><td className="pr-4">Address:</td><td>AI-04</td></tr>
                    <tr><td className="pr-4">Sensor Type:</td><td>PT1000</td></tr>
                    <tr><td className="pr-4">Range:</td><td>0-100°C</td></tr>
                    <tr><td className="pr-4">Engineering Units:</td><td>°C</td></tr>
                    <tr><td className="pr-4">High Alarm:</td><td>85°C (Priority 2)</td></tr>
                    <tr><td className="pr-4">High-High Alarm:</td><td>90°C (Priority 1)</td></tr>
                    <tr><td className="pr-4">Low Alarm:</td><td>40°C (Priority 3)</td></tr>
                    <tr><td className="pr-4">Trend Interval:</td><td>5 minutes</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key BMS Terminology</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>DDC:</strong> Direct Digital Control - computer-based control replacing pneumatic/electric</li>
                <li className="pl-1"><strong>Outstation:</strong> Local controller with autonomous operation capability</li>
                <li className="pl-1"><strong>Head-end:</strong> Central server and operator workstations</li>
                <li className="pl-1"><strong>Point:</strong> Single monitored or controlled value (hardware or software)</li>
                <li className="pl-1"><strong>Trending:</strong> Recording historical data for analysis</li>
                <li className="pl-1"><strong>Graphics:</strong> Visual representation of building systems</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Selection Criteria</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Open protocols:</strong> BACnet, Modbus for multi-vendor flexibility</li>
                <li className="pl-1"><strong>Scalability:</strong> Easy to expand for future requirements</li>
                <li className="pl-1"><strong>Local support:</strong> Manufacturer/integrator presence in region</li>
                <li className="pl-1"><strong>Cybersecurity:</strong> Built-in security features, regular updates</li>
                <li className="pl-1"><strong>User interface:</strong> Intuitive graphics, mobile access</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Inadequate I/O:</strong> Not allowing spare capacity for changes</li>
                <li className="pl-1"><strong>Poor documentation:</strong> Incomplete points schedules cause commissioning delays</li>
                <li className="pl-1"><strong>Network security:</strong> Connecting BMS directly to corporate networks</li>
                <li className="pl-1"><strong>Single vendor lock-in:</strong> Proprietary protocols limiting future options</li>
                <li className="pl-1"><strong>Insufficient testing:</strong> Not testing all alarm and integration scenarios</li>
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
                <p className="font-medium text-white mb-1">BMS Architecture Levels</p>
                <ul className="space-y-0.5">
                  <li>Management: Head-end, workstations, servers</li>
                  <li>Automation: Outstations, controllers, networks</li>
                  <li>Field: Sensors, actuators, meters</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Common Point Types</p>
                <ul className="space-y-0.5">
                  <li>AI: Analogue Input (sensors)</li>
                  <li>AO: Analogue Output (actuators)</li>
                  <li>DI: Digital Input (status)</li>
                  <li>DO: Digital Output (commands)</li>
                  <li>AV/BV: Software values</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Network Topologies</p>
                <ul className="space-y-0.5">
                  <li>Bus: Simple, single cable</li>
                  <li>Star: Central hub/switch</li>
                  <li>Ring: Redundant path</li>
                  <li>Tree: Scalable hierarchy</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Integration Interfaces</p>
                <ul className="space-y-0.5">
                  <li>Volt-free contacts: Simple status</li>
                  <li>Modbus: Serial/TCP protocol</li>
                  <li>BACnet: Building automation standard</li>
                  <li>Gateway: Protocol conversion</li>
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
            <Link to="../h-n-c-module8-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section5-2">
              Next: Sensors and Measurement
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section5_1;
