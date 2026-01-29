import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Smart Lighting - HNC Module 7 Section 4.5";
const DESCRIPTION = "Master smart lighting systems for building services: IoT integration, wireless protocols (Bluetooth Mesh, Zigbee, Thread), app control, cloud platforms, data analytics, and predictive maintenance.";

const quickCheckQuestions = [
  {
    id: "iot-lighting-definition",
    question: "What distinguishes IoT-enabled lighting from traditional networked lighting control?",
    options: ["Higher wattage luminaires", "Bidirectional communication with cloud connectivity and data analytics", "Use of LED technology only", "Proprietary wiring systems"],
    correctIndex: 1,
    explanation: "IoT-enabled lighting features bidirectional communication capabilities, cloud connectivity for remote management, and the ability to collect and analyse operational data - going beyond simple on/off control to enable intelligent building management."
  },
  {
    id: "mesh-network-advantage",
    question: "What is the primary advantage of mesh networking in smart lighting?",
    options: ["Lower luminaire costs", "Self-healing networks with no single point of failure", "Faster dimming response", "Reduced cable requirements"],
    correctIndex: 1,
    explanation: "Mesh networks create self-healing topologies where each node can route messages through multiple paths. If one luminaire fails or is removed, the network automatically reconfigures, maintaining system reliability."
  },
  {
    id: "zigbee-frequency",
    question: "Which frequency band does Zigbee primarily operate in for lighting applications?",
    options: ["433 MHz", "868 MHz", "2.4 GHz", "5 GHz"],
    correctIndex: 2,
    explanation: "Zigbee operates primarily in the 2.4 GHz ISM band globally, providing a good balance of range, data rate, and worldwide regulatory compatibility for smart lighting applications."
  },
  {
    id: "predictive-maintenance-data",
    question: "What operational data is most valuable for predictive maintenance in LED lighting?",
    options: ["Colour temperature settings", "User preferences", "Operating hours, temperature, and current draw trends", "Room occupancy schedules"],
    correctIndex: 2,
    explanation: "Predictive maintenance algorithms analyse operating hours, junction temperatures, driver current draw, and lumen depreciation trends to forecast LED or driver failures before they occur, enabling proactive replacement."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which wireless protocol was specifically designed for IP-based smart home and building automation?",
    options: [
      "Zigbee",
      "Bluetooth Mesh",
      "Thread",
      "Z-Wave"
    ],
    correctAnswer: 2,
    explanation: "Thread was designed from the ground up as an IPv6-based mesh protocol, enabling direct IP addressing of devices. This simplifies integration with IT infrastructure and cloud services compared to protocols requiring translation gateways."
  },
  {
    id: 2,
    question: "In Bluetooth Mesh lighting, what is the role of a 'Friend' node?",
    options: ["Controls colour temperature", "Stores messages for low-power nodes", "Manages user authentication", "Provides internet connectivity"],
    correctAnswer: 1,
    explanation: "Friend nodes in Bluetooth Mesh store messages for associated Low Power Nodes (LPNs) that sleep most of the time. When the LPN wakes periodically, it retrieves any stored messages from its Friend, enabling battery-powered sensors to participate in the mesh."
  },
  {
    id: 3,
    question: "What is the maximum theoretical number of nodes in a Zigbee network?",
    options: ["256", "1,024", "32,767", "65,535"],
    correctAnswer: 3,
    explanation: "Zigbee uses 16-bit addressing, supporting up to 65,535 (2^16 - 1) nodes per network. This makes it highly scalable for large commercial and industrial lighting installations."
  },
  {
    id: 4,
    question: "Which cloud architecture model processes smart lighting data locally before sending summaries to the cloud?",
    options: ["Centralised cloud", "Edge computing", "Fog computing", "Distributed ledger"],
    correctAnswer: 1,
    explanation: "Edge computing processes data locally at or near the source (e.g., in a local gateway or luminaire), reducing latency, bandwidth requirements, and cloud dependency while maintaining cloud connectivity for analytics and remote management."
  },
  {
    id: 5,
    question: "For occupancy analytics in smart lighting, what sensor fusion approach provides the most accurate people counting?",
    options: [
      "Single PIR sensor",
      "Ultrasonic sensors only",
      "Combination of PIR, thermal imaging, and AI analysis",
      "Light level sensors alone"
    ],
    correctAnswer: 2,
    explanation: "Combining multiple sensor technologies (PIR for motion, thermal for heat signatures, and AI-based image processing) provides more accurate occupancy detection and people counting than any single technology, accounting for stationary occupants and distinguishing individuals."
  },
  {
    id: 6,
    question: "What authentication standard is commonly used for secure smart lighting app control?",
    options: [
      "WEP",
      "OAuth 2.0 with TLS",
      "Basic HTTP authentication",
      "Telnet access"
    ],
    correctAnswer: 1,
    explanation: "OAuth 2.0 with TLS encryption is the industry standard for secure app-based control, providing token-based authentication, granular permissions, and encrypted communication without exposing user credentials to third-party applications."
  },
  {
    id: 7,
    question: "Which data metric is essential for calculating energy savings in smart lighting systems?",
    options: [
      "Luminaire serial numbers",
      "kWh consumption correlated with occupancy patterns",
      "Installation date only",
      "Manufacturer warranty periods"
    ],
    correctAnswer: 1,
    explanation: "Correlating actual kWh consumption with occupancy patterns and daylight levels enables accurate calculation of energy savings from smart controls, demonstrating the value of occupancy-based dimming and daylight harvesting strategies."
  },
  {
    id: 8,
    question: "What is 'lumen depreciation' in the context of predictive maintenance?",
    options: [
      "Dimmer malfunction",
      "Gradual reduction in light output over LED lifetime",
      "Sensor calibration drift",
      "Network latency increase"
    ],
    correctAnswer: 1,
    explanation: "Lumen depreciation (L70, L80 ratings) describes the gradual reduction in LED light output over time. Smart systems can monitor this decline through photosensors and predict when replacement is needed to maintain specified illumination levels."
  },
  {
    id: 9,
    question: "Which cybersecurity measure prevents unauthorised firmware updates in smart luminaires?",
    options: [
      "MAC address filtering alone",
      "Cryptographic code signing and secure boot",
      "Password-protected Wi-Fi",
      "Physical access control only"
    ],
    correctAnswer: 1,
    explanation: "Cryptographic code signing ensures firmware updates are from authorised sources, while secure boot verifies the integrity of firmware before execution. Together, these prevent malicious code injection even if network access is compromised."
  },
  {
    id: 10,
    question: "What is the primary benefit of Thread's use of IPv6 addressing for smart lighting?",
    options: [
      "Faster dimming response",
      "Direct internet connectivity without translation gateways",
      "Lower power consumption",
      "Longer radio range"
    ],
    correctAnswer: 1,
    explanation: "Thread's native IPv6 addressing allows each device to have a routable IP address, enabling direct communication with cloud services and IT systems without requiring protocol translation gateways, simplifying system architecture."
  },
  {
    id: 11,
    question: "For GDPR compliance in occupancy analytics, what anonymisation technique is commonly applied?",
    options: [
      "Storing full video recordings",
      "Heat mapping and aggregated counting without personal identification",
      "Facial recognition databases",
      "Individual tracking logs"
    ],
    correctAnswer: 1,
    explanation: "GDPR-compliant occupancy analytics typically use heat mapping and aggregated counting that detect presence without identifying individuals. Thermal sensors and processed edge analytics avoid capturing personally identifiable information."
  },
  {
    id: 12,
    question: "Which commissioning approach is most efficient for large-scale Bluetooth Mesh lighting deployments?",
    options: [
      "Individual luminaire configuration via ladder access",
      "Smartphone-based mass provisioning with automatic addressing",
      "Manual DIP switch configuration",
      "Wired programming during manufacture only"
    ],
    correctAnswer: 1,
    explanation: "Modern Bluetooth Mesh systems support smartphone-based mass provisioning where luminaires are automatically discovered, assigned addresses, and grouped. This dramatically reduces commissioning time compared to individual configuration."
  }
];

const faqs = [
  {
    question: "How do smart lighting systems ensure reliable operation during internet outages?",
    answer: "Well-designed smart lighting systems maintain local control capability when cloud connectivity is lost. The local gateway or controller stores schedules, scenes, and automation rules, executing them independently. Mesh networks continue operating autonomously, and occupancy sensors maintain local response. Cloud features (remote access, analytics dashboards) become unavailable, but lighting remains fully functional for occupants."
  },
  {
    question: "What is the typical battery life for wireless occupancy sensors in smart lighting systems?",
    answer: "Battery-powered wireless occupancy sensors in Bluetooth Mesh or Zigbee systems typically achieve 3-5 years on a single coin cell battery. This is enabled by low-duty-cycle operation (sleeping most of the time), low-power radio protocols, and Friend/sleepy end-device mechanisms that allow the sensor to poll for messages periodically rather than constantly listening."
  },
  {
    question: "Can different wireless protocols coexist in the same lighting installation?",
    answer: "Yes, multi-protocol gateways can integrate Zigbee, Bluetooth Mesh, Thread, and Wi-Fi devices into a unified management system. However, devices on different protocols cannot communicate directly with each other - they communicate through the gateway. Some manufacturers now include multi-protocol radios in luminaires, and Matter certification aims to provide a unifying application layer across Thread, Wi-Fi, and Ethernet devices."
  },
  {
    question: "How do smart lighting systems handle firmware updates across hundreds of luminaires?",
    answer: "Over-the-air (OTA) firmware updates are distributed through the mesh network, typically scheduled during unoccupied periods to avoid disruption. Updates are segmented and transmitted incrementally, with each luminaire verifying the complete image before applying. Rollback capability ensures that if an update fails, the luminaire reverts to the previous working firmware."
  },
  {
    question: "What cybersecurity certifications should smart lighting systems meet?",
    answer: "Smart lighting systems should comply with relevant security standards including ETSI EN 303 645 (IoT security baseline), IEC 62443 for industrial systems, and manufacturer-specific certifications. For UK installations, products should meet the requirements of the Product Security and Telecommunications Infrastructure Act (PSTI) which mandates minimum security standards for connected devices."
  },
  {
    question: "How accurate is energy prediction based on smart lighting analytics?",
    answer: "Modern smart lighting analytics can predict energy consumption within 5-10% accuracy when trained on 3-6 months of historical data. Accuracy improves with occupancy pattern recognition, weather data integration for daylight predictions, and machine learning models that account for seasonal variations. This enables reliable budgeting and measurement of energy saving initiatives."
  }
];

const HNCModule7Section4_5 = () => {
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
            <span>Module 7.4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Smart Lighting
          </h1>
          <p className="text-white/80">
            IoT integration, wireless protocols, app control, data analytics, and predictive maintenance for intelligent lighting systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>IoT lighting:</strong> Bidirectional cloud-connected luminaires</li>
              <li className="pl-1"><strong>Wireless protocols:</strong> Bluetooth Mesh, Zigbee, Thread</li>
              <li className="pl-1"><strong>Data analytics:</strong> Energy, occupancy, and performance insights</li>
              <li className="pl-1"><strong>Predictive maintenance:</strong> AI-driven failure forecasting</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Integration:</strong> BMS, HVAC, access control systems</li>
              <li className="pl-1"><strong>Standards:</strong> Matter, DALI-2, KNX compatibility</li>
              <li className="pl-1"><strong>Security:</strong> Encrypted communications, firmware signing</li>
              <li className="pl-1"><strong>Compliance:</strong> GDPR, PSTI Act, energy regulations</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain IoT architectures for smart lighting systems",
              "Compare wireless protocols: Bluetooth Mesh, Zigbee, and Thread",
              "Design smartphone and cloud-based lighting control systems",
              "Implement data analytics for energy and occupancy insights",
              "Apply predictive maintenance strategies using lighting data",
              "Address cybersecurity requirements for connected lighting"
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

        {/* Section 1: IoT Lighting Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            IoT Lighting Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Internet of Things (IoT) enabled lighting transforms luminaires from simple light sources
              into intelligent networked devices capable of bidirectional communication, data collection,
              and integration with building management ecosystems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">IoT Lighting Architecture Components:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Smart luminaires:</strong> LED drivers with embedded wireless radios and sensors</li>
                <li className="pl-1"><strong>Gateways/bridges:</strong> Protocol translation between lighting network and IP infrastructure</li>
                <li className="pl-1"><strong>Cloud platform:</strong> Data storage, analytics, remote management, and API access</li>
                <li className="pl-1"><strong>Edge processing:</strong> Local intelligence for latency-sensitive operations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IoT vs Traditional Lighting Control</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Traditional Control</th>
                      <th className="border border-white/10 px-3 py-2 text-left">IoT-Enabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Communication</td>
                      <td className="border border-white/10 px-3 py-2">Unidirectional (command only)</td>
                      <td className="border border-white/10 px-3 py-2">Bidirectional (command + feedback)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Remote access</td>
                      <td className="border border-white/10 px-3 py-2">Requires on-site presence</td>
                      <td className="border border-white/10 px-3 py-2">Cloud-based anywhere access</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data collection</td>
                      <td className="border border-white/10 px-3 py-2">Manual meter readings</td>
                      <td className="border border-white/10 px-3 py-2">Continuous automated logging</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Firmware updates</td>
                      <td className="border border-white/10 px-3 py-2">Physical replacement</td>
                      <td className="border border-white/10 px-3 py-2">Over-the-air (OTA)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Integration</td>
                      <td className="border border-white/10 px-3 py-2">Proprietary protocols</td>
                      <td className="border border-white/10 px-3 py-2">Open APIs, IT system integration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> IoT lighting creates value beyond illumination through the data it generates and the systems it enables.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Wireless Protocols */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Wireless Protocols for Smart Lighting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern smart lighting relies on low-power wireless protocols optimised for mesh networking.
              The three dominant protocols - Bluetooth Mesh, Zigbee, and Thread - each offer distinct
              advantages for different application requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protocol Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Bluetooth Mesh</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Zigbee</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Thread</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Frequency</td>
                      <td className="border border-white/10 px-3 py-2">2.4 GHz</td>
                      <td className="border border-white/10 px-3 py-2">2.4 GHz / 868 MHz</td>
                      <td className="border border-white/10 px-3 py-2">2.4 GHz</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Max nodes</td>
                      <td className="border border-white/10 px-3 py-2">32,767</td>
                      <td className="border border-white/10 px-3 py-2">65,535</td>
                      <td className="border border-white/10 px-3 py-2">~250 per network</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IP-based</td>
                      <td className="border border-white/10 px-3 py-2">No (requires gateway)</td>
                      <td className="border border-white/10 px-3 py-2">No (requires gateway)</td>
                      <td className="border border-white/10 px-3 py-2">Yes (native IPv6)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Smartphone access</td>
                      <td className="border border-white/10 px-3 py-2">Direct (no hub needed)</td>
                      <td className="border border-white/10 px-3 py-2">Via hub/gateway</td>
                      <td className="border border-white/10 px-3 py-2">Via border router</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical range</td>
                      <td className="border border-white/10 px-3 py-2">10-30m per hop</td>
                      <td className="border border-white/10 px-3 py-2">10-100m per hop</td>
                      <td className="border border-white/10 px-3 py-2">10-30m per hop</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Best for</td>
                      <td className="border border-white/10 px-3 py-2">Retrofit, smartphone control</td>
                      <td className="border border-white/10 px-3 py-2">Large-scale commercial</td>
                      <td className="border border-white/10 px-3 py-2">IT-integrated smart buildings</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bluetooth Mesh</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Managed flood messaging</li>
                  <li className="pl-1">Friend/LPN for battery devices</li>
                  <li className="pl-1">Smartphone commissioning</li>
                  <li className="pl-1">Proxy nodes for app access</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Zigbee</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Coordinator-router-end device</li>
                  <li className="pl-1">Zigbee Light Link (ZLL) profile</li>
                  <li className="pl-1">Mature ecosystem</li>
                  <li className="pl-1">Zigbee 3.0 unified standard</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thread</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Native IPv6 addressing</li>
                  <li className="pl-1">No single point of failure</li>
                  <li className="pl-1">Border router to IP network</li>
                  <li className="pl-1">Matter application layer</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Matter Standard</p>
              <p className="text-sm text-white">
                Matter (formerly CHIP) provides a unified application layer running over Thread, Wi-Fi, and Ethernet.
                Matter-certified devices interoperate regardless of manufacturer, addressing the fragmentation
                that previously limited smart home adoption. Major lighting manufacturers now offer Matter-compatible products.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection guidance:</strong> Choose Bluetooth Mesh for retrofit simplicity, Zigbee for proven large-scale commercial deployments, and Thread for new builds prioritising IT integration.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: App Control and Cloud Platforms */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            App Control and Cloud Platforms
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smartphone applications and cloud platforms transform how lighting systems are commissioned,
              controlled, and managed. Modern platforms provide intuitive interfaces for end users while
              enabling sophisticated management capabilities for facilities teams.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">App Control Capabilities:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Commissioning:</strong> Automatic device discovery, grouping, and scene programming</li>
                <li className="pl-1"><strong>Real-time control:</strong> Dimming, colour temperature, scene selection, scheduling</li>
                <li className="pl-1"><strong>Personalisation:</strong> User preferences, circadian profiles, workspace settings</li>
                <li className="pl-1"><strong>Voice integration:</strong> Amazon Alexa, Google Assistant, Apple HomeKit</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cloud Platform Architecture</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Layer</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Technology</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Device layer</td>
                      <td className="border border-white/10 px-3 py-2">Luminaires, sensors, switches</td>
                      <td className="border border-white/10 px-3 py-2">Bluetooth/Zigbee/Thread mesh</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gateway layer</td>
                      <td className="border border-white/10 px-3 py-2">Protocol translation, local processing</td>
                      <td className="border border-white/10 px-3 py-2">Edge computing devices</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Connectivity layer</td>
                      <td className="border border-white/10 px-3 py-2">Secure cloud connection</td>
                      <td className="border border-white/10 px-3 py-2">MQTT, HTTPS, WebSocket</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Platform layer</td>
                      <td className="border border-white/10 px-3 py-2">Data storage, processing, APIs</td>
                      <td className="border border-white/10 px-3 py-2">AWS IoT, Azure IoT Hub</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Application layer</td>
                      <td className="border border-white/10 px-3 py-2">User interfaces, dashboards</td>
                      <td className="border border-white/10 px-3 py-2">Mobile apps, web portals</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">API Integration Examples</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Calendar integration:</strong> Automatic lighting scenes based on room bookings</li>
                <li className="pl-1"><strong>Access control:</strong> Lights activate when authorised badge detected</li>
                <li className="pl-1"><strong>HVAC coordination:</strong> Synchronised occupancy-based control</li>
                <li className="pl-1"><strong>Energy management:</strong> Demand response during peak tariff periods</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Implement local fallback control to ensure lighting remains operational during cloud or internet outages.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Data Analytics and Predictive Maintenance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Data Analytics and Predictive Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart lighting systems generate continuous streams of operational data. Properly analysed,
              this data enables energy optimisation, space utilisation insights, and predictive maintenance
              strategies that reduce costs and improve building performance.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Analytics</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Real-time power consumption</li>
                  <li className="pl-1">kWh trending and forecasting</li>
                  <li className="pl-1">Daylight harvesting effectiveness</li>
                  <li className="pl-1">Occupancy-based savings calculation</li>
                  <li className="pl-1">Carbon footprint reporting</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Occupancy Analytics</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Space utilisation heat maps</li>
                  <li className="pl-1">Occupancy pattern recognition</li>
                  <li className="pl-1">People counting and flow</li>
                  <li className="pl-1">Peak usage identification</li>
                  <li className="pl-1">Desk/room booking optimisation</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Predictive Maintenance Data Points</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Data Point</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What It Indicates</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Maintenance Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Operating hours</td>
                      <td className="border border-white/10 px-3 py-2">Progress toward rated lifetime</td>
                      <td className="border border-white/10 px-3 py-2">Schedule replacement at L70</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Junction temperature</td>
                      <td className="border border-white/10 px-3 py-2">Thermal stress, accelerated ageing</td>
                      <td className="border border-white/10 px-3 py-2">Improve ventilation, derate output</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Driver current trend</td>
                      <td className="border border-white/10 px-3 py-2">Component degradation</td>
                      <td className="border border-white/10 px-3 py-2">Predict driver failure window</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Light output (lux)</td>
                      <td className="border border-white/10 px-3 py-2">Lumen depreciation rate</td>
                      <td className="border border-white/10 px-3 py-2">Increase output or schedule replacement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Communication errors</td>
                      <td className="border border-white/10 px-3 py-2">Network or hardware issues</td>
                      <td className="border border-white/10 px-3 py-2">Investigate interference or faults</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Machine Learning Applications</p>
              <p className="text-sm text-white">
                Advanced analytics platforms apply machine learning algorithms to lighting data:
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5 mt-2">
                <li className="pl-1">Anomaly detection identifies failing luminaires before complete failure</li>
                <li className="pl-1">Pattern recognition optimises schedules based on actual usage</li>
                <li className="pl-1">Regression models correlate energy use with weather and occupancy</li>
                <li className="pl-1">Classification algorithms categorise space usage for facility planning</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Cybersecurity Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Encryption:</strong> TLS 1.3 for cloud communication, AES-128 for mesh networks</li>
                <li className="pl-1"><strong>Authentication:</strong> OAuth 2.0 for apps, certificate-based for devices</li>
                <li className="pl-1"><strong>Firmware security:</strong> Cryptographic code signing, secure boot</li>
                <li className="pl-1"><strong>Network segmentation:</strong> Separate VLAN for IoT devices</li>
                <li className="pl-1"><strong>PSTI compliance:</strong> No default passwords, vulnerability disclosure policy</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>GDPR compliance:</strong> Occupancy analytics must anonymise data. Use heat mapping and aggregated counting rather than individual tracking. Conduct Data Protection Impact Assessments for any personal data processing.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Protocol Selection for Office Retrofit</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A 3-floor office building requires smart lighting retrofit without rewiring. 150 luminaires, smartphone control required, moderate IT integration.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Evaluation criteria:</p>
                <p className="mt-2">Retrofit capability: No new wiring &gt; Wireless essential</p>
                <p>Smartphone commissioning: Direct access &gt; Bluetooth Mesh advantage</p>
                <p>Scale: 150 nodes &gt; All protocols support this</p>
                <p>IT integration: Moderate &gt; Gateway acceptable</p>
                <p>Cost: Retrofit budget &gt; Bluetooth Mesh lower gateway cost</p>
                <p className="mt-2 text-green-400">Recommendation: Bluetooth Mesh</p>
                <p className="text-white/60 mt-2">Justification: Smartphone-based commissioning, no hub</p>
                <p className="text-white/60">required for basic operation, easy installer adoption</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Energy Savings Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate annual energy savings from smart lighting controls in an open-plan office.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Baseline consumption (no controls):</p>
                <p className="ml-4">100 luminaires x 40W x 12 hours/day x 260 days</p>
                <p className="ml-4">= 12,480 kWh/year</p>
                <p className="mt-2">Smart control savings:</p>
                <p className="ml-4">Occupancy sensing: 30% reduction = 3,744 kWh</p>
                <p className="ml-4">Daylight harvesting: 20% reduction = 2,496 kWh</p>
                <p className="ml-4">Task tuning: 10% reduction = 1,248 kWh</p>
                <p className="mt-2">Total savings: 7,488 kWh (60% reduction)</p>
                <p className="text-green-400 mt-2">At £0.28/kWh = £2,097/year energy cost saving</p>
                <p className="text-white/60">Carbon reduction: 7,488 x 0.207 = 1,550 kg CO2e</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Predictive Maintenance Alert</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Analytics platform flags a luminaire for investigation. Interpret the data.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Luminaire: LUM-3F-042</p>
                <p>Operating hours: 38,500 (rated L70 @ 50,000h)</p>
                <p className="mt-2">Anomaly indicators:</p>
                <p className="ml-4 text-yellow-400">Junction temperature: +12°C above fleet average</p>
                <p className="ml-4 text-yellow-400">Driver current: +8% above nominal</p>
                <p className="ml-4 text-yellow-400">Light output: -18% from commissioning baseline</p>
                <p className="mt-2">Analysis:</p>
                <p className="ml-4">Elevated temperature accelerates LED depreciation</p>
                <p className="ml-4">Increased current suggests driver compensation</p>
                <p className="ml-4">Lumen output declining faster than expected</p>
                <p className="mt-2 text-red-400">Prediction: Driver failure in 2,000-4,000 operating hours</p>
                <p className="text-green-400">Action: Schedule replacement in next maintenance cycle</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Smart Lighting Design Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Select protocol based on scale, integration requirements, and retrofit constraints</li>
                <li className="pl-1">Ensure adequate mesh density (typically 1 router per 5-10 end devices)</li>
                <li className="pl-1">Plan gateway placement for optimal coverage and IT room access</li>
                <li className="pl-1">Specify cybersecurity requirements in procurement documents</li>
                <li className="pl-1">Define data analytics requirements and reporting dashboards</li>
                <li className="pl-1">Document commissioning procedures for mass provisioning</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Zigbee frequency: <strong>2.4 GHz</strong> (global), 868 MHz (Europe)</li>
                <li className="pl-1">Bluetooth Mesh max nodes: <strong>32,767</strong> devices</li>
                <li className="pl-1">Thread addressing: <strong>IPv6 native</strong></li>
                <li className="pl-1">Typical energy savings: <strong>40-70%</strong> with smart controls</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Insufficient mesh density</strong> - Message failures in sparse areas</li>
                <li className="pl-1"><strong>No local fallback</strong> - System fails during cloud outages</li>
                <li className="pl-1"><strong>Ignoring cybersecurity</strong> - Vulnerable to attacks and non-compliant</li>
                <li className="pl-1"><strong>Over-collecting data</strong> - GDPR violations with personal data</li>
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
                <p className="font-medium text-white mb-1">Protocol Selection</p>
                <ul className="space-y-0.5">
                  <li>Bluetooth Mesh - retrofit, smartphone commissioning</li>
                  <li>Zigbee - large commercial, mature ecosystem</li>
                  <li>Thread - IT integration, IPv6 native</li>
                  <li>Matter - cross-protocol interoperability</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Cybersecurity Essentials</p>
                <ul className="space-y-0.5">
                  <li>TLS 1.3 for cloud communication</li>
                  <li>Cryptographic firmware signing</li>
                  <li>No default passwords (PSTI Act)</li>
                  <li>Network segmentation for IoT</li>
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
            <Link to="../h-n-c-module7-section4-6">
              Next: Section 4.6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section4_5;
