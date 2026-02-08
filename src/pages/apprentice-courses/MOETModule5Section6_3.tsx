import { ArrowLeft, Wifi, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Wireless and IoT in Industry - MOET Module 5 Section 6.3";
const DESCRIPTION = "Comprehensive guide to industrial wireless and IIoT for maintenance technicians: WirelessHART, ISA100.11a, mesh networking, MQTT, edge computing, cloud platforms, digital twins, predictive maintenance, and security considerations. ST1426 aligned.";

const quickCheckQuestions = [
  {
    id: "wirelesshart-definition",
    question: "What is WirelessHART and what makes it suitable for industrial process environments?",
    options: [
      "A wireless heart rate monitor used in medical equipment",
      "A wireless mesh networking protocol based on the HART standard, designed for process instrumentation with self-healing redundancy and security",
      "A Bluetooth variant for connecting laptops to PLCs",
      "A Wi-Fi standard for office networks adapted for factory use"
    ],
    correctIndex: 1,
    explanation: "WirelessHART (IEC 62591) is a wireless mesh protocol designed specifically for process instrumentation. It uses IEEE 802.15.4 radio at 2.4 GHz with TDMA and frequency hopping, providing self-healing mesh redundancy that automatically routes around failed nodes or blocked signal paths."
  },
  {
    id: "iiot-definition",
    question: "What is the Industrial Internet of Things (IIoT)?",
    options: [
      "A brand name for a specific PLC manufacturer's products",
      "The connection of industrial equipment and sensors to networks and cloud platforms for data collection, analysis, and optimisation",
      "A type of programmable logic controller with internet connectivity",
      "A safety standard for internet-connected machines"
    ],
    correctIndex: 1,
    explanation: "The IIoT connects industrial devices, sensors, and systems to digital networks (local and cloud), enabling data-driven optimisation, predictive maintenance, remote monitoring, and digital transformation of industrial operations."
  },
  {
    id: "edge-computing-role",
    question: "What is an edge computing device in an industrial IoT architecture?",
    options: [
      "A computer placed at the physical edge of a desk for ergonomic reasons",
      "A local processing device that analyses data near the source before sending selected information to the cloud, reducing latency and bandwidth",
      "A standard PLC with an Ethernet port",
      "A Wi-Fi router installed at the perimeter of a building"
    ],
    correctIndex: 1,
    explanation: "Edge devices process data locally at or near the data source, enabling fast local decisions and reducing the bandwidth required to the cloud. Only selected, summarised, or exception data is transmitted to cloud platforms, whilst the edge continues to function even when cloud connectivity is interrupted."
  },
  {
    id: "mqtt-protocol",
    question: "What is MQTT and why is it widely used in IIoT systems?",
    options: [
      "A motor quality testing methodology",
      "A lightweight publish/subscribe messaging protocol ideal for IoT communication between devices, gateways, and cloud platforms",
      "A type of industrial sensor calibration method",
      "A high-speed fieldbus protocol for real-time control"
    ],
    correctIndex: 1,
    explanation: "MQTT (Message Queuing Telemetry Transport) is a lightweight protocol using a publish/subscribe model — devices publish data to named topics and interested applications subscribe to receive updates via a central broker. It is designed for constrained devices and unreliable networks, making it ideal for IIoT deployments."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What wireless protocol is designed specifically for process instrumentation in industrial environments?",
    options: [
      "Bluetooth Low Energy",
      "WirelessHART (IEC 62591)",
      "Wi-Fi 6",
      "Zigbee for home automation"
    ],
    correctAnswer: 1,
    explanation: "WirelessHART is designed specifically for process industry instrumentation, providing mesh networking, time-synchronised communication via TDMA and frequency hopping, AES-128 encryption, and battery lifetimes of 5-10 years suitable for industrial environments."
  },
  {
    id: 2,
    question: "What is ISA100.11a and how does it relate to WirelessHART?",
    options: [
      "A safety standard for wireless installations",
      "An industrial wireless standard similar to WirelessHART but with more flexible network architecture options and protocol tunnelling",
      "A cable specification for wireless antenna connections",
      "A PLC programming standard for wireless communication"
    ],
    correctAnswer: 1,
    explanation: "ISA100.11a (IEC 62734) is an industrial wireless standard for process automation providing flexible network architectures (mesh and star), backbone routing via wired infrastructure, and tunnelling of other protocols (HART, Foundation Fieldbus, Profibus). It complements WirelessHART with additional architectural flexibility."
  },
  {
    id: 3,
    question: "What advantage does a mesh network topology provide for industrial wireless communication?",
    options: [
      "Lower cost hardware than point-to-point links",
      "Self-healing capability — if one node fails or a signal path is blocked, data automatically routes via alternative paths through neighbouring nodes",
      "Higher speed than wired Ethernet networks",
      "No need for a gateway to connect to the control system"
    ],
    correctAnswer: 1,
    explanation: "Mesh networks provide redundant communication paths between nodes. If a node fails or a signal path is obstructed by metal structures or process equipment, data is automatically rerouted through alternative nodes, greatly improving reliability in industrial environments where RF conditions are unpredictable."
  },
  {
    id: 4,
    question: "What is a wireless gateway in an industrial system?",
    options: [
      "A standard router for office internet access",
      "A device that bridges between the wireless sensor network and the wired control system (DCS, PLC, or SCADA)",
      "A laptop used for wireless device configuration",
      "A firewall device for wireless security"
    ],
    correctAnswer: 1,
    explanation: "The wireless gateway connects the wireless sensor network to the wired infrastructure, translating between the wireless protocol (WirelessHART, ISA100.11a) and wired protocols (HART-IP, Modbus, OPC UA). It also manages the wireless network, handles security keys, and coordinates device joining."
  },
  {
    id: 5,
    question: "What is the typical battery life of a WirelessHART field transmitter?",
    options: [
      "1 month",
      "1 year",
      "5-10 years depending on update rate and configuration",
      "Indefinite — all devices harvest energy from the environment"
    ],
    correctAnswer: 2,
    explanation: "WirelessHART transmitters typically achieve 5-10 year battery life using low-power design and configurable update rates (e.g., every 8-60 seconds). Battery life depends on the reporting frequency, network routing activity, and ambient temperature. Devices with faster update rates consume more power."
  },
  {
    id: 6,
    question: "What is a digital twin in the context of industrial IoT?",
    options: [
      "A duplicate PLC running the same programme in parallel",
      "A virtual model of a physical asset continuously updated with real-time sensor data, enabling simulation and optimisation",
      "A backup server storing identical copies of all data",
      "Two identical sensors installed on the same process measurement point"
    ],
    correctAnswer: 1,
    explanation: "A digital twin is a virtual replica of a physical asset or process, continuously updated with live sensor data. It enables simulation, what-if analysis, predictive maintenance modelling, and performance optimisation without affecting the real system. It is a key enabler of data-driven industrial operations."
  },
  {
    id: 7,
    question: "What security concern is specific to industrial wireless networks?",
    options: [
      "None — wireless is inherently secure due to encryption",
      "Wireless signals can be intercepted or jammed; industrial wireless protocols must include encryption, authentication, and intrusion detection",
      "Wireless only works indoors so external threats are not a concern",
      "Battery theft is the only security risk"
    ],
    correctAnswer: 1,
    explanation: "Wireless signals are accessible to anyone within range, making encryption (AES-128 for WirelessHART and ISA100.11a), device authentication, key management, and monitoring for signal jamming or interference essential for securing industrial wireless networks."
  },
  {
    id: 8,
    question: "What is LoRaWAN used for in industrial applications?",
    options: [
      "High-speed real-time control communication between PLCs",
      "Long-range, low-power wide-area networking for monitoring applications covering large areas such as remote sites, pipelines, and utilities",
      "Local area network communication within a single control panel",
      "Safety-critical control of rotating machinery"
    ],
    correctAnswer: 1,
    explanation: "LoRaWAN provides long-range communication (up to 15 km line of sight) with low power consumption, suitable for monitoring applications where the data rate is low and battery life is critical — such as remote asset monitoring, pipeline leak detection, and environmental sensing across large geographical areas."
  },
  {
    id: 9,
    question: "What is the role of cloud platforms in industrial IoT deployments?",
    options: [
      "Replacing the DCS and PLC for real-time process control",
      "Providing scalable data storage, analytics, machine learning, dashboarding, and remote access for industrial data collected from edge devices",
      "Only providing email services to maintenance technicians",
      "Directly controlling safety instrumented systems"
    ],
    correctAnswer: 1,
    explanation: "Cloud platforms (AWS IoT, Azure IoT, Siemens MindSphere, ABB Ability) provide the computing power, storage, and analytical tools for processing large volumes of industrial data. They enable insights, predictions, trend analysis, and enterprise-wide visibility — but do not replace the real-time control function of PLCs and DCSs."
  },
  {
    id: 10,
    question: "What four layers make up a typical IIoT architecture?",
    options: [
      "PLC, HMI, SCADA, historian",
      "Sensor/device layer, edge layer, network layer, and cloud/platform layer",
      "Hardware, software, firmware, and database",
      "Input, processing, output, and storage"
    ],
    correctAnswer: 1,
    explanation: "A typical IIoT architecture consists of: the sensor/device layer (smart sensors, wireless transmitters), the edge layer (gateways and edge computing), the network layer (wired, wireless, cellular connectivity), and the cloud/platform layer (data storage, analytics, dashboards, and enterprise integration)."
  },
  {
    id: 11,
    question: "Why is OT/IT network separation essential when deploying industrial IoT?",
    options: [
      "It is not essential — connecting everything to one network is simpler",
      "IoT data must be extracted from the OT network via one-way data diodes or secured gateways in a DMZ, never by bridging the control network directly to the internet",
      "Only wireless networks need separation from wired networks",
      "Separation is only required for safety-critical plants"
    ],
    correctAnswer: 1,
    explanation: "Maintaining clear separation between the OT (control) network and any IoT/IT network is essential. IoT data should be extracted via one-way data diodes, secured gateways in a DMZ, or published via OPC UA servers — never by directly connecting the control network to the internet or cloud services, which would expose it to cyber threats."
  },
  {
    id: 12,
    question: "Is private 5G technology relevant for industrial automation applications?",
    options: [
      "No — 5G is only for mobile phones",
      "Yes — private 5G networks offer ultra-low latency, high bandwidth, and massive device density, making them attractive for mobile robots, AGVs, and flexible manufacturing",
      "5G has already replaced all wired industrial networks",
      "5G is only suitable for office environments"
    ],
    correctAnswer: 1,
    explanation: "Private 5G networks offer ultra-low latency, high bandwidth, and support for massive numbers of connected devices, making them attractive for applications such as mobile robots, automated guided vehicles (AGVs), augmented reality maintenance, and flexible manufacturing. The technology is maturing but is not yet widely deployed for safety-critical control."
  }
];

const faqs = [
  {
    question: "Can wireless replace wired instrumentation for process control?",
    answer: "For most control loops, wired instrumentation remains preferred due to guaranteed deterministic response, continuous power supply, and proven reliability. Wireless is ideal for monitoring, condition-based maintenance, remote or difficult-to-reach locations, and temporary measurements. Some non-critical control loops use wireless transmitters, but safety-critical control should remain wired."
  },
  {
    question: "How do I perform a wireless site survey before deploying WirelessHART?",
    answer: "A site survey assesses the RF environment before deployment. It involves: mapping the physical environment (metal structures, sources of interference), measuring ambient RF noise levels at 2.4 GHz, identifying potential obstacles and reflectors, determining optimal gateway and repeater locations, and planning device placement to ensure adequate mesh coverage with redundant communication paths."
  },
  {
    question: "What is the difference between edge computing and cloud computing for industrial data?",
    answer: "Edge computing processes data locally (low latency, works offline, immediate response). Cloud computing provides massive storage, advanced analytics, machine learning, and enterprise-wide access. Most IIoT architectures use both: edge for real-time local processing and immediate decisions, cloud for long-term trend analysis, machine learning model training, and enterprise dashboards."
  },
  {
    question: "Is 5G relevant for industrial automation?",
    answer: "Private 5G networks offer ultra-low latency, high bandwidth, and massive device density, making them attractive for applications such as mobile robots, AGVs, AR/VR-assisted maintenance, and flexible manufacturing cells. Several industrial 5G solutions are emerging from major vendors, but the technology is still maturing for safety-critical control applications."
  },
  {
    question: "How do I maintain battery-powered wireless transmitters?",
    answer: "Monitor battery levels via the wireless gateway or asset management system. Plan battery replacements during scheduled maintenance windows before levels become critical. Most WirelessHART devices provide months of advance warning. Keep spare batteries in stock. When replacing batteries, verify the device rejoins the mesh network successfully and resumes reporting at the correct update rate."
  }
];

const MOETModule5Section6_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section6">
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
            <Wifi className="h-4 w-4" />
            <span>Module 5.6.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Wireless and IoT in Industry
          </h1>
          <p className="text-white/80">
            Industrial wireless protocols, IIoT architecture, edge computing, and cloud-connected monitoring
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>WirelessHART</strong> is the leading process wireless standard — mesh topology with 5-10 year battery life</li>
              <li className="pl-1"><strong>IIoT</strong> connects sensors and equipment to edge and cloud platforms for data-driven optimisation</li>
              <li className="pl-1"><strong>MQTT</strong> is the dominant IoT messaging protocol using publish/subscribe</li>
              <li className="pl-1"><strong>Edge computing</strong> processes data locally; cloud provides analytics and enterprise visibility</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Predictive maintenance:</strong> Vibration, thermal, and condition monitoring via wireless sensors</li>
              <li className="pl-1"><strong>Remote monitoring:</strong> Accessing plant data from anywhere for troubleshooting and support</li>
              <li className="pl-1"><strong>Battery management:</strong> Monitoring and planning replacement of wireless device batteries</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to emerging technology awareness and digital skills requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe industrial wireless protocols: WirelessHART, ISA100.11a, and industrial Wi-Fi",
              "Explain mesh networking topology and its self-healing capability",
              "Outline IIoT architecture: sensors, gateways, edge computing, and cloud platforms",
              "Identify IIoT communication protocols including MQTT and OPC UA",
              "Describe digital twin concepts and predictive maintenance applications",
              "Assess security requirements for industrial wireless and IoT deployments"
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
            Industrial Wireless Protocols
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industrial wireless communication has matured significantly over the past decade, with purpose-built protocols designed for the reliability, security, and environmental challenges of process and factory environments. These are not consumer wireless technologies — they are engineered specifically for industrial use with features that address the unique demands of plant operations.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">WirelessHART (IEC 62591)</p>
              <p className="text-sm text-white mb-3">
                WirelessHART is the most widely deployed industrial wireless standard for process instrumentation:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Radio:</strong> IEEE 802.15.4 at 2.4 GHz with 15 channels</li>
                <li className="pl-1"><strong>Access method:</strong> TDMA (Time Division Multiple Access) with frequency hopping for interference avoidance</li>
                <li className="pl-1"><strong>Topology:</strong> Self-healing mesh — each device can route data for neighbouring devices</li>
                <li className="pl-1"><strong>Security:</strong> AES-128 encryption, device authentication, and key management</li>
                <li className="pl-1"><strong>Battery life:</strong> 5-10 years with configurable update rates (typically 8-60 seconds)</li>
                <li className="pl-1"><strong>Compatibility:</strong> Uses the same HART command structure as wired HART devices</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ISA100.11a (IEC 62734)</p>
              <p className="text-sm text-white mb-3">
                ISA100.11a provides similar capabilities to WirelessHART with additional architectural flexibility:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Topology:</strong> Supports both mesh and star configurations</li>
                <li className="pl-1"><strong>Backbone routing:</strong> Can route traffic via wired infrastructure between wireless clusters</li>
                <li className="pl-1"><strong>Protocol tunnelling:</strong> Can tunnel HART, Foundation Fieldbus, and Profibus data over the wireless network</li>
                <li className="pl-1"><strong>Flexibility:</strong> Particularly strong in applications requiring integration with diverse existing systems</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Industrial Wi-Fi</p>
              <p className="text-sm text-white mb-3">
                Industrial Wi-Fi (IEEE 802.11) is used for high-bandwidth applications rather than process instrumentation:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Applications:</strong> Video surveillance, mobile operator terminals, AGV communication, AR/VR</li>
                <li className="pl-1"><strong>Hardware:</strong> Ruggedised access points for harsh environments with IP65/67 ratings</li>
                <li className="pl-1"><strong>Roaming:</strong> Industrial access points support seamless roaming for mobile devices</li>
                <li className="pl-1"><strong>Limitation:</strong> Not typically used for real-time control due to non-deterministic nature</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> When deploying wireless devices, always conduct a site survey first to assess the RF environment. Metal structures, process vessels, and other equipment create unpredictable reflections and dead spots that can affect mesh coverage. Plan gateway and repeater locations based on the survey results, not assumptions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            IIoT Architecture and Platforms
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Industrial Internet of Things connects plant-floor sensors and equipment to digital platforms for data collection, analysis, and optimisation. Unlike the traditional control system architecture (which is focused on real-time process control), the IIoT architecture is focused on extracting value from the vast amounts of data generated by industrial operations.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Four-Layer IIoT Architecture</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Sensor/device layer:</strong> Smart sensors, wireless transmitters, vibration monitors, power meters, and existing instrumentation with digital outputs</li>
                <li className="pl-1"><strong>Edge layer:</strong> Gateways and edge computing devices that aggregate, filter, and pre-process data locally before transmission</li>
                <li className="pl-1"><strong>Network layer:</strong> Wired (Ethernet, fibre), wireless (Wi-Fi, cellular 4G/5G), and LPWAN (LoRaWAN, NB-IoT) connectivity</li>
                <li className="pl-1"><strong>Cloud/platform layer:</strong> Data storage, analytics, machine learning, dashboards, and enterprise integration (ERP, MES)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">MQTT Protocol</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Lightweight publish/subscribe model</li>
                  <li className="pl-1">Devices publish data to named topics</li>
                  <li className="pl-1">Applications subscribe via a central broker</li>
                  <li className="pl-1">Quality-of-service levels (0, 1, 2)</li>
                  <li className="pl-1">Designed for constrained devices and unreliable networks</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">OPC UA for Integration</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Rich information modelling (not just values)</li>
                  <li className="pl-1">Built-in security (authentication, encryption)</li>
                  <li className="pl-1">Platform independent (any OS)</li>
                  <li className="pl-1">Vendor neutral — supported by all major vendors</li>
                  <li className="pl-1">Plant-to-enterprise vertical integration</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Major IIoT Platforms</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Siemens MindSphere:</strong> Industrial IoT platform with connectivity to Siemens and third-party equipment</li>
                <li className="pl-1"><strong>AWS IoT:</strong> Amazon's scalable cloud IoT services with machine learning capabilities</li>
                <li className="pl-1"><strong>Microsoft Azure IoT:</strong> Enterprise-integrated IoT platform with digital twin services</li>
                <li className="pl-1"><strong>ABB Ability:</strong> Industrial platform focused on electrification and automation analytics</li>
                <li className="pl-1"><strong>Honeywell Forge:</strong> Enterprise performance management platform for process industries</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Edge Computing and Data Processing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Edge computing is a critical component of the IIoT architecture. Rather than sending all raw data to the cloud (which would require enormous bandwidth and introduce latency), edge devices process data locally and send only the results, summaries, or exceptions to the cloud. This approach provides faster local response, reduced bandwidth costs, and continued operation when cloud connectivity is interrupted.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Edge vs Cloud Processing</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Edge Computing</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cloud Computing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Latency</td><td className="border border-white/10 px-3 py-2">Very low (milliseconds)</td><td className="border border-white/10 px-3 py-2">Higher (depends on connectivity)</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Bandwidth</td><td className="border border-white/10 px-3 py-2">Minimal (sends summaries)</td><td className="border border-white/10 px-3 py-2">High (receives raw or processed data)</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Offline capability</td><td className="border border-white/10 px-3 py-2">Continues to function</td><td className="border border-white/10 px-3 py-2">Unavailable without connectivity</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Storage</td><td className="border border-white/10 px-3 py-2">Limited local storage</td><td className="border border-white/10 px-3 py-2">Virtually unlimited</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Analytics</td><td className="border border-white/10 px-3 py-2">Real-time, simple models</td><td className="border border-white/10 px-3 py-2">Advanced ML, historical trends</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Most effective IIoT architectures combine edge and cloud processing. The edge handles time-critical local decisions and data reduction, whilst the cloud provides long-term storage, advanced analytics, machine learning model training, and enterprise-wide dashboards.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical Applications and Digital Twins
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industrial wireless and IoT technologies are enabling new maintenance strategies and operational improvements that were previously impractical or uneconomical. Understanding these applications helps maintenance technicians appreciate the value of the data they work with and the systems they maintain.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key IIoT Applications</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Predictive maintenance:</strong> Vibration analysis, thermal monitoring, oil condition sensing, and motor current analysis to predict failures before they occur — shifting from time-based to condition-based maintenance</li>
                <li className="pl-1"><strong>Energy management:</strong> Real-time monitoring and optimisation of energy consumption across the plant, identifying waste and enabling demand response</li>
                <li className="pl-1"><strong>Remote monitoring:</strong> Accessing plant data from anywhere for troubleshooting, expert support, and reduced site visits to remote locations</li>
                <li className="pl-1"><strong>Environmental monitoring:</strong> Emissions, noise, water quality, and weather data for compliance and environmental management</li>
                <li className="pl-1"><strong>Asset tracking:</strong> Locating mobile equipment, tools, and containers using RFID, BLE beacons, or UWB positioning</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Digital Twins</p>
              <p className="text-sm text-white mb-3">
                A digital twin is a virtual representation of a physical asset or process, continuously updated with real-time sensor data:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Simulation:</strong> Test changes to process parameters or control strategies virtually before applying them to the real system</li>
                <li className="pl-1"><strong>Predictive analytics:</strong> Use historical and real-time data to predict equipment behaviour and remaining useful life</li>
                <li className="pl-1"><strong>Training:</strong> Provide realistic training environments for operators and maintenance technicians without risk to the real plant</li>
                <li className="pl-1"><strong>Optimisation:</strong> Continuously compare actual performance against the digital model to identify inefficiencies and improvement opportunities</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Practical Maintenance Note</p>
              <p className="text-sm text-white">
                Wireless sensors for predictive maintenance are often added to existing equipment without modifying the control system — they operate independently, reporting data to a separate analytics platform. When installing wireless vibration or temperature sensors, ensure correct mounting position and orientation per the manufacturer's instructions, as poor mounting significantly reduces measurement accuracy.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Security for Industrial Wireless and IoT
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Security is not optional for industrial wireless and IoT deployments. Every wireless device and every cloud connection represents a potential attack surface. The consequences of a security breach in an industrial environment can include physical damage, safety incidents, and environmental harm — far beyond the data theft risks of typical IT breaches.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wireless Security Measures</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Encryption:</strong> AES-128 for WirelessHART and ISA100.11a; WPA3-Enterprise for industrial Wi-Fi</li>
                <li className="pl-1"><strong>Authentication:</strong> Device authentication before joining the network; certificate-based where possible</li>
                <li className="pl-1"><strong>Key management:</strong> Regular key rotation and secure key distribution</li>
                <li className="pl-1"><strong>Jamming detection:</strong> Monitoring for RF interference that could indicate a deliberate denial-of-service attack</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IIoT Security Principles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>OT/IT separation:</strong> Never bridge the control network directly to the internet or cloud — use DMZ gateways</li>
                <li className="pl-1"><strong>Secure boot:</strong> Devices should verify firmware integrity before starting</li>
                <li className="pl-1"><strong>Encrypted communication:</strong> TLS/DTLS for all data in transit between devices, gateways, and cloud platforms</li>
                <li className="pl-1"><strong>Firmware updates:</strong> Secure, authenticated firmware update mechanisms for edge and field devices</li>
                <li className="pl-1"><strong>IEC 62443 compliance:</strong> Follow the industrial cybersecurity standard for all IoT deployments</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Safety Consideration</p>
              <p className="text-sm text-white">
                IoT data extraction from the OT environment must always flow through a properly secured boundary — ideally using one-way data diodes for the most critical systems, or secured OPC UA gateways in a DMZ for bidirectional communication. Never allow external cloud services or IoT platforms to have direct inbound access to the control network. A compromised IoT device must not provide a pathway into the control system.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians are expected to have awareness of emerging technologies including wireless instrumentation and IoT, understand the basic architecture and security requirements, and recognise the role of these technologies in modern maintenance strategies such as condition-based and predictive maintenance.
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
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section6-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Industrial Ethernet
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section6-4">
              Next: Cybersecurity in Industrial Networks
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section6_3;
