import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "BMS Integration - HNC Module 7 Section 4.6";
const DESCRIPTION = "Master BMS integration for lighting control systems: communication protocols (BACnet, Modbus, KNX), scheduling strategies, demand response, energy monitoring, and system optimisation techniques.";

const quickCheckQuestions = [
  {
    id: "bms-purpose",
    question: "What is the primary function of a Building Management System (BMS)?",
    options: ["To replace manual light switches", "To centralise monitoring and control of building services", "To generate electricity for the building", "To provide emergency lighting only"],
    correctIndex: 1,
    explanation: "A BMS centralises monitoring and control of building services including HVAC, lighting, fire systems, and security, enabling optimised operation, energy management, and maintenance planning."
  },
  {
    id: "bacnet-purpose",
    question: "BACnet is primarily used in building automation for:",
    options: ["Connecting domestic appliances to WiFi", "Interoperability between different manufacturers' equipment", "High-speed video streaming", "Mobile phone integration only"],
    correctIndex: 1,
    explanation: "BACnet (Building Automation and Control Networks) is an open protocol that enables interoperability between different manufacturers' building automation equipment, avoiding proprietary lock-in."
  },
  {
    id: "demand-response",
    question: "What is demand response in the context of BMS lighting control?",
    options: ["Lights responding to motion detection", "Reducing lighting load during peak electricity demand periods", "Increasing light levels when requested by users", "Automatic lamp replacement scheduling"],
    correctIndex: 1,
    explanation: "Demand response involves automatically reducing lighting load during peak electricity demand periods, typically in response to signals from the grid operator or based on tariff structures."
  },
  {
    id: "modbus-registers",
    question: "In Modbus protocol, what are 'registers' used for?",
    options: ["User login credentials", "Storing and exchanging data values between devices", "Physical cable connections", "Emergency backup power"],
    correctIndex: 1,
    explanation: "Modbus registers are memory locations used for storing and exchanging data values (such as dimming levels, status, or sensor readings) between the master controller and slave devices."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which protocol is specifically designed for building automation and uses object-oriented data modelling?",
    options: [
      "Modbus RTU",
      "BACnet",
      "DMX512",
      "Ethernet/IP"
    ],
    correctAnswer: 1,
    explanation: "BACnet uses object-oriented data modelling where each device contains objects (analogue inputs, binary outputs, schedules) with properties, making it highly suitable for building automation applications."
  },
  {
    id: 2,
    question: "What is the typical BACnet object type used for a dimmable lighting circuit?",
    options: ["Binary Output (BO)", "Analogue Output (AO)", "Binary Input (BI)", "Multi-State Value (MSV)"],
    correctAnswer: 1,
    explanation: "An Analogue Output (AO) object is typically used for dimmable lighting as it provides a variable output value (0-100%) rather than simple on/off control provided by Binary Outputs."
  },
  {
    id: 3,
    question: "Modbus RTU communicates over which physical medium?",
    options: [
      "Fibre optic only",
      "RS-485 serial connection",
      "WiFi only",
      "Power line carrier"
    ],
    correctAnswer: 1,
    explanation: "Modbus RTU (Remote Terminal Unit) uses RS-485 serial connection, providing robust two-wire communication suitable for industrial and building environments with distances up to 1200 metres."
  },
  {
    id: 4,
    question: "In a KNX system, what is the function of a 'coupler'?",
    options: [
      "To power the bus cable",
      "To connect different lines or areas of the KNX network",
      "To dim lighting fixtures",
      "To detect occupancy"
    ],
    correctAnswer: 1,
    explanation: "KNX couplers (line couplers, area couplers) connect different segments of the KNX network, managing traffic between areas and providing electrical isolation whilst enabling system-wide communication."
  },
  {
    id: 5,
    question: "What is 'trending' in BMS terminology?",
    options: [
      "Following popular building designs",
      "Recording historical data values over time for analysis",
      "Predicting future equipment failures",
      "Adjusting setpoints based on weather"
    ],
    correctAnswer: 1,
    explanation: "Trending refers to the BMS function of recording historical data values (energy consumption, temperatures, occupancy) over time, enabling performance analysis, fault diagnosis, and optimisation."
  },
  {
    id: 6,
    question: "Which scheduling strategy allows different lighting scenes for different days of the week?",
    options: [
      "Exception scheduling",
      "Calendar-based scheduling",
      "Override scheduling",
      "Demand scheduling"
    ],
    correctAnswer: 1,
    explanation: "Calendar-based scheduling allows different operational profiles for different days (weekdays vs weekends), holidays, and special events, providing flexibility for varying building usage patterns."
  },
  {
    id: 7,
    question: "What is the primary benefit of integrating DALI lighting with BACnet BMS?",
    options: [
      "Eliminating the need for any wiring",
      "Enabling enterprise-level monitoring whilst maintaining detailed luminaire control",
      "Reducing the number of luminaires required",
      "Automatic emergency lighting testing only"
    ],
    correctAnswer: 1,
    explanation: "DALI-BACnet integration enables the BMS to monitor and control lighting at enterprise level whilst DALI provides detailed individual luminaire addressing and control, combining the strengths of both systems."
  },
  {
    id: 8,
    question: "In demand response applications, what is 'load shedding'?",
    options: [
      "Removing old luminaires",
      "Temporarily reducing non-essential loads during peak demand",
      "Upgrading to more efficient lighting",
      "Installing additional circuits"
    ],
    correctAnswer: 1,
    explanation: "Load shedding involves temporarily reducing or switching off non-essential electrical loads (including lighting in unoccupied areas) during peak demand periods to reduce overall building consumption."
  },
  {
    id: 9,
    question: "What data would a BMS typically collect for lighting energy analysis?",
    options: [
      "Lamp colour temperature only",
      "kWh consumption, operating hours, and occupancy correlation",
      "Luminaire weight and dimensions",
      "Installation contractor details"
    ],
    correctAnswer: 1,
    explanation: "For lighting energy analysis, BMS collects kWh consumption, operating hours, dimming levels, and correlates this with occupancy data to identify optimisation opportunities and verify savings."
  },
  {
    id: 10,
    question: "What is 'commissioning override' in BMS lighting control?",
    options: [
      "Bypassing safety interlocks permanently",
      "Temporary manual control mode for system setup and testing",
      "Automatic fault correction",
      "Emergency lighting activation"
    ],
    correctAnswer: 1,
    explanation: "Commissioning override provides temporary manual control of lighting circuits during system setup and testing, allowing engineers to verify operation before returning to automatic BMS control."
  },
  {
    id: 11,
    question: "Which optimisation strategy adjusts lighting based on available daylight?",
    options: [
      "Demand response",
      "Daylight harvesting",
      "Task tuning",
      "Absence detection"
    ],
    correctAnswer: 1,
    explanation: "Daylight harvesting uses photocells to measure ambient light levels and automatically dims artificial lighting to maintain target illuminance, reducing energy consumption when natural light is available."
  },
  {
    id: 12,
    question: "What is the purpose of a BMS 'alarm' for lighting systems?",
    options: [
      "To wake up sleeping occupants",
      "To alert operators to faults, failures, or abnormal conditions",
      "To schedule regular maintenance",
      "To activate emergency lighting only"
    ],
    correctAnswer: 1,
    explanation: "BMS alarms notify building operators of lighting system faults (lamp failures, communication errors, energy anomalies), enabling prompt maintenance response and maintaining system performance."
  }
];

const faqs = [
  {
    question: "What is the difference between BMS and BEMS?",
    answer: "A Building Management System (BMS) focuses on controlling building services (HVAC, lighting, security). A Building Energy Management System (BEMS) specifically emphasises energy monitoring, analysis, and optimisation. Modern systems often combine both functions, providing integrated control and energy management. The distinction is becoming less clear as energy efficiency becomes central to all building automation."
  },
  {
    question: "Can different protocol systems (BACnet, Modbus, KNX) work together?",
    answer: "Yes, through protocol gateways or converters. A BACnet/Modbus gateway translates between protocols, allowing a BACnet BMS to communicate with Modbus lighting controllers. Multi-protocol gateways can bridge several systems. Modern BMS platforms often support multiple protocols natively. Integration requires careful point mapping and testing to ensure reliable communication."
  },
  {
    question: "How does BMS integration affect lighting maintenance?",
    answer: "BMS integration significantly improves maintenance by providing lamp failure alarms, operating hours tracking for proactive replacement, energy consumption anomaly detection indicating faults, and historical data for failure pattern analysis. Condition-based maintenance replaces fixed schedules, reducing costs whilst improving reliability. Remote diagnostics reduce site visits."
  },
  {
    question: "What cybersecurity considerations apply to BMS lighting integration?",
    answer: "BMS networks require security measures including network segmentation (separating BMS from IT networks), strong authentication for user access, encrypted communications where possible, regular firmware updates, and access logging. Building automation systems have been targets for cyber attacks, making security essential. Follow NCSC guidance for operational technology security."
  },
  {
    question: "How do I specify BMS integration requirements for a lighting project?",
    answer: "Specify: protocol requirements (BACnet IP, Modbus TCP), point list (all data points to be monitored/controlled), alarm requirements, trending requirements, interface with existing BMS, commissioning and testing procedures, and documentation deliverables. Include network architecture drawings and confirm compatibility with existing BMS platform. Reference BSRIA BG 6 for commissioning guidance."
  },
  {
    question: "What is the typical commissioning process for BMS-integrated lighting?",
    answer: "Commissioning follows a structured process: point-to-point verification (each control point operates correctly), sequence testing (schedules, overrides, interlocks work as designed), integration testing (communication with BMS headend), performance verification (energy monitoring accuracy), and documentation (as-built point schedules, graphics, user training). Allow adequate time - BMS commissioning is often underestimated."
  }
];

const HNCModule7Section4_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section4">
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
            <Zap className="h-4 w-4" />
            <span>Module 7.4.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BMS Integration
          </h1>
          <p className="text-white/80">
            Lighting control interfaces, communication protocols, scheduling, energy monitoring, and system optimisation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BMS:</strong> Centralised building services control</li>
              <li className="pl-1"><strong>Protocols:</strong> BACnet, Modbus, KNX for interoperability</li>
              <li className="pl-1"><strong>Scheduling:</strong> Time-based and calendar control</li>
              <li className="pl-1"><strong>Optimisation:</strong> Demand response and energy management</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Integration Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>DALI-BMS:</strong> Gateway integration common</li>
              <li className="pl-1"><strong>Energy:</strong> Sub-metering and trending</li>
              <li className="pl-1"><strong>Control:</strong> Hierarchical override strategy</li>
              <li className="pl-1"><strong>Monitoring:</strong> Alarms and fault detection</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain BMS/BEMS functions and architecture for lighting systems",
              "Compare BACnet, Modbus, and KNX communication protocols",
              "Design scheduling strategies for energy-efficient operation",
              "Implement demand response and load management",
              "Configure energy monitoring and performance analysis",
              "Apply system optimisation techniques for lighting control"
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

        {/* Section 1: BMS Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BMS/BEMS Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A Building Management System (BMS) provides centralised monitoring and control of building services,
              enabling efficient operation, energy management, and maintenance. When emphasising energy functions,
              the system is often termed a Building Energy Management System (BEMS).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BMS Architecture Layers:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Field level:</strong> Sensors, actuators, luminaires, and local controllers</li>
                <li className="pl-1"><strong>Automation level:</strong> Area controllers processing field data and executing control logic</li>
                <li className="pl-1"><strong>Management level:</strong> Supervisory workstations, databases, and user interfaces</li>
                <li className="pl-1"><strong>Enterprise level:</strong> Integration with IT systems, analytics, and cloud services</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Functions for Lighting</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Monitoring</td>
                      <td className="border border-white/10 px-3 py-2">Real-time status of all lighting circuits</td>
                      <td className="border border-white/10 px-3 py-2">Visibility of building-wide operation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control</td>
                      <td className="border border-white/10 px-3 py-2">Remote on/off and dimming commands</td>
                      <td className="border border-white/10 px-3 py-2">Centralised management without site visits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Scheduling</td>
                      <td className="border border-white/10 px-3 py-2">Time-based automatic operation</td>
                      <td className="border border-white/10 px-3 py-2">Consistent operation, energy savings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Alarming</td>
                      <td className="border border-white/10 px-3 py-2">Notification of faults and failures</td>
                      <td className="border border-white/10 px-3 py-2">Rapid maintenance response</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Trending</td>
                      <td className="border border-white/10 px-3 py-2">Historical data logging and analysis</td>
                      <td className="border border-white/10 px-3 py-2">Performance optimisation, M&amp;V</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Integration approach:</strong> Lighting typically connects to BMS via protocol gateways (DALI-BACnet) or native BACnet/Modbus controllers, enabling enterprise-level management whilst maintaining local control.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Communication Protocols */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Communication Protocols
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building automation relies on standardised communication protocols to enable interoperability
              between different manufacturers' equipment. The main protocols for lighting integration are
              BACnet, Modbus, and KNX, each with distinct characteristics.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BACnet</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">ASHRAE/ISO standard</li>
                  <li className="pl-1">Object-oriented model</li>
                  <li className="pl-1">IP or MS/TP physical layer</li>
                  <li className="pl-1">Best for enterprise systems</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modbus</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Simple master-slave</li>
                  <li className="pl-1">Register-based data</li>
                  <li className="pl-1">RTU (RS-485) or TCP/IP</li>
                  <li className="pl-1">Widely supported, low cost</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">KNX</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">European standard (EN 50090)</li>
                  <li className="pl-1">Decentralised peer-to-peer</li>
                  <li className="pl-1">Twisted pair, powerline, RF</li>
                  <li className="pl-1">Strong in lighting/blinds</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protocol Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">BACnet</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Modbus</th>
                      <th className="border border-white/10 px-3 py-2 text-left">KNX</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data model</td>
                      <td className="border border-white/10 px-3 py-2">Objects &amp; properties</td>
                      <td className="border border-white/10 px-3 py-2">Registers &amp; coils</td>
                      <td className="border border-white/10 px-3 py-2">Datapoints &amp; groups</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Topology</td>
                      <td className="border border-white/10 px-3 py-2">Client-server</td>
                      <td className="border border-white/10 px-3 py-2">Master-slave</td>
                      <td className="border border-white/10 px-3 py-2">Peer-to-peer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Discovery</td>
                      <td className="border border-white/10 px-3 py-2">Automatic (Who-Is)</td>
                      <td className="border border-white/10 px-3 py-2">Manual configuration</td>
                      <td className="border border-white/10 px-3 py-2">ETS software</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Complexity</td>
                      <td className="border border-white/10 px-3 py-2">Medium-high</td>
                      <td className="border border-white/10 px-3 py-2">Low</td>
                      <td className="border border-white/10 px-3 py-2">Medium</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical use</td>
                      <td className="border border-white/10 px-3 py-2">Large commercial</td>
                      <td className="border border-white/10 px-3 py-2">Industrial, retrofit</td>
                      <td className="border border-white/10 px-3 py-2">Premium residential, commercial</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">BACnet Object Types for Lighting</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Binary Output (BO):</span> <span className="text-white">On/off switching control</span></p>
                <p><span className="text-white/60">Analogue Output (AO):</span> <span className="text-white">Dimming level (0-100%)</span></p>
                <p><span className="text-white/60">Binary Input (BI):</span> <span className="text-white">Switch/sensor status</span></p>
                <p><span className="text-white/60">Analogue Input (AI):</span> <span className="text-white">Light level sensor (lux)</span></p>
                <p><span className="text-white/60">Schedule:</span> <span className="text-white">Time-based automation</span></p>
                <p><span className="text-white/60">Notification Class:</span> <span className="text-white">Alarm routing</span></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Integration tip:</strong> Protocol gateways (e.g., DALI-BACnet) enable DALI lighting systems to communicate with BMS platforms, translating between protocols whilst maintaining full functionality.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Scheduling and Control Strategies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Scheduling and Control Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective scheduling is fundamental to energy-efficient lighting operation. BMS scheduling
              combines time-based automation with demand response, occupancy integration, and manual
              override capabilities to balance energy savings with occupant needs.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scheduling Types</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Weekly schedule:</strong> Standard operating hours (e.g., 07:00-19:00 Mon-Fri)</li>
                <li className="pl-1"><strong>Calendar schedule:</strong> Different profiles for holidays, special events</li>
                <li className="pl-1"><strong>Exception schedule:</strong> One-off overrides for specific dates</li>
                <li className="pl-1"><strong>Astronomical schedule:</strong> Sunrise/sunset-based for external lighting</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Hierarchy</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Priority</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1 (Highest)</td>
                      <td className="border border-white/10 px-3 py-2">Life safety</td>
                      <td className="border border-white/10 px-3 py-2">Emergency lighting activation</td>
                      <td className="border border-white/10 px-3 py-2">Until reset</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">Critical override</td>
                      <td className="border border-white/10 px-3 py-2">Security incident response</td>
                      <td className="border border-white/10 px-3 py-2">Manual release</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">Demand response</td>
                      <td className="border border-white/10 px-3 py-2">Grid signal load reduction</td>
                      <td className="border border-white/10 px-3 py-2">Event duration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">BMS operator</td>
                      <td className="border border-white/10 px-3 py-2">Facilities manager override</td>
                      <td className="border border-white/10 px-3 py-2">Timed (e.g., 2 hours)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">Local user</td>
                      <td className="border border-white/10 px-3 py-2">Wall switch or app</td>
                      <td className="border border-white/10 px-3 py-2">Timed (e.g., 30 mins)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6 (Lowest)</td>
                      <td className="border border-white/10 px-3 py-2">Schedule</td>
                      <td className="border border-white/10 px-3 py-2">Time-based automation</td>
                      <td className="border border-white/10 px-3 py-2">Continuous</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Demand Response Integration</p>
              <p className="text-sm text-white mb-3">
                Demand response enables automatic load reduction during peak grid demand:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>OpenADR:</strong> Standard protocol for automated demand response signals</li>
                <li className="pl-1"><strong>Load shedding:</strong> Turn off non-critical lighting (car parks, corridors)</li>
                <li className="pl-1"><strong>Load shifting:</strong> Reduce dimming levels building-wide (e.g., 100% &gt; 80%)</li>
                <li className="pl-1"><strong>Pre-cooling/heating:</strong> Coordinate with HVAC for thermal mass strategies</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Always include timed auto-revert for manual overrides to prevent lights being left on indefinitely after occupant intervention.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Energy Monitoring and Optimisation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Energy Monitoring and System Optimisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BMS-integrated energy monitoring provides the data foundation for continuous optimisation.
              Effective systems combine sub-metering, trending, analytics, and automated control
              adjustments to minimise energy consumption whilst maintaining comfort and productivity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Monitoring Components</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Sub-metering</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Lighting circuit kWh meters</li>
                    <li>Zone or floor-level metering</li>
                    <li>CT-based power monitoring</li>
                    <li>Pulse counting integration</li>
                    <li>Real-time power (kW) and energy (kWh)</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Data Analysis</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Baseline establishment</li>
                    <li>Consumption trending</li>
                    <li>Occupancy correlation</li>
                    <li>Anomaly detection</li>
                    <li>M&amp;V (measurement and verification)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Optimisation Strategies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Daylight harvesting</td>
                      <td className="border border-white/10 px-3 py-2">Photocell-based dimming to maintain lux target</td>
                      <td className="border border-white/10 px-3 py-2">20-40% perimeter zones</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Occupancy control</td>
                      <td className="border border-white/10 px-3 py-2">PIR/ultrasonic detection with timeout</td>
                      <td className="border border-white/10 px-3 py-2">30-50% intermittent spaces</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Task tuning</td>
                      <td className="border border-white/10 px-3 py-2">Reduce maximum output to actual requirement</td>
                      <td className="border border-white/10 px-3 py-2">10-20% over-lit areas</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Schedule optimisation</td>
                      <td className="border border-white/10 px-3 py-2">Align schedules with actual occupancy patterns</td>
                      <td className="border border-white/10 px-3 py-2">10-30% after-hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Demand limiting</td>
                      <td className="border border-white/10 px-3 py-2">Cap maximum power during peak periods</td>
                      <td className="border border-white/10 px-3 py-2">Peak demand reduction</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Key Performance Indicators (KPIs)</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Lighting Power Density:</span> <span className="text-white">W/m² (target &lt; 10 W/m² for offices)</span></p>
                <p><span className="text-white/60">Operating hours:</span> <span className="text-white">Actual vs scheduled hours</span></p>
                <p><span className="text-white/60">Occupancy ratio:</span> <span className="text-white">Occupied hours / lit hours</span></p>
                <p><span className="text-white/60">Energy per m²:</span> <span className="text-white">kWh/m²/year for benchmarking</span></p>
                <p><span className="text-white/60">Demand factor:</span> <span className="text-white">Peak demand / connected load</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Continuous Commissioning</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fault detection:</strong> Automatic identification of stuck dampers, failed sensors, or control errors</li>
                <li className="pl-1"><strong>Performance monitoring:</strong> Track energy consumption against baselines and targets</li>
                <li className="pl-1"><strong>Schedule verification:</strong> Confirm actual operation matches intended schedules</li>
                <li className="pl-1"><strong>Sensor calibration:</strong> Detect drift in lux sensors or occupancy detectors</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Measurement and verification (M&amp;V):</strong> Use IPMVP (International Performance Measurement and Verification Protocol) methodologies to quantify energy savings from optimisation measures.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: DALI-BACnet Gateway Integration</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Integrate a DALI lighting system with a BACnet BMS in a commercial office.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">System Architecture:</p>
                <p className="mt-2">BMS Workstation (BACnet IP)</p>
                <p className="ml-4">|</p>
                <p className="ml-4">Ethernet Switch</p>
                <p className="ml-4">|</p>
                <p className="ml-4">DALI-BACnet Gateway</p>
                <p className="ml-4">|</p>
                <p className="ml-4">DALI Bus (64 devices max)</p>
                <p className="ml-4">├── Luminaires (addressed 1-50)</p>
                <p className="ml-4">├── PIR sensors (addressed 51-55)</p>
                <p className="ml-4">└── Lux sensors (addressed 56-58)</p>
                <p className="mt-2 text-white/60">BACnet Point Mapping:</p>
                <p>- AO1: Zone 1 dimming level (0-100%)</p>
                <p>- BI1: Zone 1 occupancy status</p>
                <p>- AI1: Zone 1 lux level</p>
                <p>- Schedule-1: Zone 1 weekly schedule</p>
                <p className="mt-2 text-green-400">Result: Full BMS visibility and control of DALI lighting</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Demand Response Configuration</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Configure lighting load shedding for grid demand response events.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Demand Response Levels:</p>
                <p className="mt-2">Level 0 (Normal): All lighting at normal control</p>
                <p>Level 1 (Moderate): Reduce common areas to 80%</p>
                <p>Level 2 (High): Reduce all non-critical to 60%</p>
                <p>Level 3 (Critical): Non-essential lighting OFF</p>
                <p className="mt-2 text-white/60">Priority Classification:</p>
                <p>Essential: Reception, circulation (no reduction)</p>
                <p>Important: Open-plan offices (reduce to 80% max)</p>
                <p>Non-essential: Car park, plant rooms (can shed)</p>
                <p className="mt-2 text-white/60">Trigger Source:</p>
                <p>OpenADR signal from grid operator</p>
                <p>OR building peak demand &gt; 500 kW</p>
                <p>OR electricity tariff &gt; 30p/kWh</p>
                <p className="mt-2 text-green-400">Expected reduction: 40 kW during Level 3 events</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Energy Monitoring Point Schedule</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify BMS points for lighting energy monitoring on a floor plate.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Point Schedule - Level 3 Lighting:</p>
                <p className="mt-2">| Point ID | Description | Type | Units | Trend |</p>
                <p>|----------|-------------|------|-------|-------|</p>
                <p>| L3-kW | Floor 3 lighting power | AI | kW | 15min |</p>
                <p>| L3-kWh | Floor 3 lighting energy | AI | kWh | Daily |</p>
                <p>| L3-Occ | Floor 3 occupancy count | AI | No. | 15min |</p>
                <p>| L3-Lux | Average daylight level | AI | lux | 15min |</p>
                <p>| L3-Dim | Average dimming level | AI | % | 15min |</p>
                <p>| L3-OpHrs | Operating hours today | AI | hrs | Daily |</p>
                <p className="mt-2 text-white/60">Calculated Values:</p>
                <p>- W/m² = L3-kW × 1000 / floor area</p>
                <p>- Occupancy ratio = occupied hours / lit hours</p>
                <p className="mt-2 text-green-400">Enables detailed energy analysis and optimisation</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Integration Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Confirm protocol compatibility (BACnet revision, Modbus function codes)</li>
                <li className="pl-1">Define complete point list with naming convention</li>
                <li className="pl-1">Specify alarm priorities and routing</li>
                <li className="pl-1">Document trending requirements and retention periods</li>
                <li className="pl-1">Plan network architecture and IP addressing</li>
                <li className="pl-1">Allow adequate commissioning time for integration testing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">BACnet device instance: <strong>Unique 22-bit number</strong></li>
                <li className="pl-1">Modbus RTU max devices: <strong>247 per bus</strong></li>
                <li className="pl-1">KNX line: <strong>64 devices maximum</strong></li>
                <li className="pl-1">Trending interval: <strong>15 minutes typical</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Incomplete point lists</strong> - Always specify all required points before installation</li>
                <li className="pl-1"><strong>Missing override timeouts</strong> - Manual overrides should auto-revert</li>
                <li className="pl-1"><strong>No baseline data</strong> - Establish consumption baseline before optimisation</li>
                <li className="pl-1"><strong>Insufficient commissioning</strong> - Test all control sequences, not just individual points</li>
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
                <p className="font-medium text-white mb-1">Communication Protocols</p>
                <ul className="space-y-0.5">
                  <li>BACnet - Object-oriented, enterprise systems</li>
                  <li>Modbus - Simple registers, widely supported</li>
                  <li>KNX - Decentralised, strong in Europe</li>
                  <li>Gateways bridge different protocols</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Optimisation Strategies</p>
                <ul className="space-y-0.5">
                  <li>Daylight harvesting (20-40% savings)</li>
                  <li>Occupancy control (30-50% savings)</li>
                  <li>Task tuning (10-20% savings)</li>
                  <li>Schedule optimisation (10-30% savings)</li>
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
            <Link to="../h-n-c-module7-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section5-1">
              Next: Section 5.1
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section4_6;
