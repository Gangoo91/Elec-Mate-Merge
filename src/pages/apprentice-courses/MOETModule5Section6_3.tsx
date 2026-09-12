/**
 * MOET · Module 5 · Section 6 · Subsection 3 — Wireless and IoT in Industry
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. The conversion brief for this course does not list a Module 5
 * KSB set, so only a statement that already appears verbatim in the brief's
 * verified lists for other modules — and that genuinely fits this page's
 * content — is used here.
 *   Knowledge  · "Industry 4.0 - the integration of physical systems with
 *                 internet connectivity and cloud computing: technologies,
 *                 systems, and benefits."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt. The original
 * page had no "Quick Reference" block (unlike some sibling pages), so
 * KeyTakeaways here condenses facts already stated in the body prose rather
 * than a separate summary box.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Wireless and IoT in Industry - MOET Module 5 Section 6.3';
const DESCRIPTION =
  'Comprehensive guide to industrial wireless and IIoT for maintenance technicians: WirelessHART, ISA100.11a, mesh networking, MQTT, edge computing, cloud platforms, digital twins, predictive maintenance, and security considerations. ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'wirelesshart-definition',
    question:
      'What is WirelessHART and what makes it suitable for industrial process environments?',
    options: [
      'A high-bandwidth video protocol used for CCTV and operator terminals on the plant floor',
      'A wired fieldbus standard that replaces the 4-20 mA current loop on every instrument',
      'A wireless mesh networking protocol based on the HART standard, designed for process instrumentation with self-healing redundancy and security',
      'A consumer wireless standard adapted from home automation with no encryption or redundancy',
    ],
    correctIndex: 2,
    explanation:
      'WirelessHART (IEC 62591) is a wireless mesh protocol designed specifically for process instrumentation. It uses IEEE 802.15.4 radio at 2.4 GHz with TDMA and frequency hopping, providing self-healing mesh redundancy that automatically routes around failed nodes or blocked signal paths.',
  },
  {
    id: 'iiot-definition',
    question: 'What is the Industrial Internet of Things (IIoT)?',
    options: [
      'A consumer network of smart home devices such as thermostats and doorbells',
      'A replacement for PLCs that performs all real-time safety-critical control directly',
      'The connection of industrial equipment and sensors to networks and cloud platforms for data collection, analysis, and optimisation',
      'A single wireless protocol that all industrial sensors are required to use',
    ],
    correctIndex: 2,
    explanation:
      'The IIoT connects industrial devices, sensors, and systems to digital networks (local and cloud), enabling data-driven optimisation, predictive maintenance, remote monitoring, and digital transformation of industrial operations.',
  },
  {
    id: 'edge-computing-role',
    question: 'What is an edge computing device in an industrial IoT architecture?',
    options: [
      'A cloud server located in a remote data centre that stores all plant data',
      'A wireless field transmitter that measures a single process variable',
      'A local processing device that analyses data near the source before sending selected information to the cloud, reducing latency and bandwidth',
      'A handheld terminal used by operators to acknowledge alarms on the plant floor',
    ],
    correctIndex: 2,
    explanation:
      'Edge devices process data locally at or near the data source, enabling fast local decisions and reducing the bandwidth required to the cloud. Only selected, summarised, or exception data is transmitted to cloud platforms, whilst the edge continues to function even when cloud connectivity is interrupted.',
  },
  {
    id: 'mqtt-protocol',
    question: 'What is MQTT and why is it widely used in IIoT systems?',
    options: [
      'A wireless radio standard operating in the 2.4 GHz band for field instruments',
      'A high-power cabling system for distributing supplies to industrial sensors',
      'A lightweight publish/subscribe messaging protocol ideal for IoT communication between devices, gateways, and cloud platforms',
      'A database format used to archive historical process data in the cloud',
    ],
    correctIndex: 2,
    explanation:
      'MQTT (Message Queuing Telemetry Transport) is a lightweight protocol using a publish/subscribe model — devices publish data to named topics and interested applications subscribe to receive updates via a central broker. It is designed for constrained devices and unreliable networks, making it ideal for IIoT deployments.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What wireless protocol is designed specifically for process instrumentation in industrial environments?',
    options: [
      'Bluetooth Low Energy',
      'WirelessHART (IEC 62591)',
      'Wi-Fi 6',
      'Zigbee for home automation',
    ],
    correctAnswer: 1,
    explanation:
      'WirelessHART is designed specifically for process industry instrumentation, providing mesh networking, time-synchronised communication via TDMA and frequency hopping, AES-128 encryption, and battery lifetimes of 5-10 years suitable for industrial environments.',
  },
  {
    id: 2,
    question: 'What is ISA100.11a and how does it relate to WirelessHART?',
    options: [
      'A licensed long-range cellular standard that competes with 5G rather than with WirelessHART',
      'A wired fieldbus standard that WirelessHART devices fall back to when the radio link drops',
      'An industrial wireless standard similar to WirelessHART but with more flexible network architecture options and protocol tunnelling',
      'A consumer Wi-Fi profile that WirelessHART gateways use to reach the cloud',
    ],
    correctAnswer: 2,
    explanation:
      'ISA100.11a (IEC 62734) is an industrial wireless standard for process automation providing flexible network architectures (mesh and star), backbone routing via wired infrastructure, and tunnelling of other protocols (HART, Foundation Fieldbus, Profibus). It complements WirelessHART with additional architectural flexibility.',
  },
  {
    id: 3,
    question:
      'What advantage does a mesh network topology provide for industrial wireless communication?',
    options: [
      'It removes the need for a wireless gateway by letting every node talk directly to the cloud',
      'It guarantees deterministic real-time control, making it suitable for safety-critical loops',
      'It allows devices to run mains-powered only, eliminating the need for battery management',
      'Self-healing capability — if one node fails or a signal path is blocked, data automatically routes via alternative paths through neighbouring nodes',
    ],
    correctAnswer: 3,
    explanation:
      'Mesh networks provide redundant communication paths between nodes. If a node fails or a signal path is obstructed by metal structures or process equipment, data is automatically rerouted through alternative nodes, greatly improving reliability in industrial environments where RF conditions are unpredictable.',
  },
  {
    id: 4,
    question: 'What is a wireless gateway in an industrial system?',
    options: [
      'A device that bridges between the wireless sensor network and the wired control system (DCS, PLC, or SCADA)',
      'A battery-powered field transmitter that measures a single process variable wirelessly',
      'A repeater node whose only function is to extend the range of the wireless mesh network',
      'A handheld configurator used by technicians to commission individual wireless transmitters',
    ],
    correctAnswer: 0,
    explanation:
      'The wireless gateway connects the wireless sensor network to the wired infrastructure, translating between the wireless protocol (WirelessHART, ISA100.11a) and wired protocols (HART-IP, Modbus, OPC UA). It also manages the wireless network, handles security keys, and coordinates device joining.',
  },
  {
    id: 5,
    question: 'What is the typical battery life of a WirelessHART field transmitter?',
    options: [
      '3-6 months, requiring frequent scheduled replacement',
      '5-10 years depending on update rate and configuration',
      '20-30 years, lasting the full life of the plant',
      '24-48 hours before mains recharging is required',
    ],
    correctAnswer: 1,
    explanation:
      'WirelessHART transmitters typically achieve 5-10 year battery life using low-power design and configurable update rates (e.g., every 8-60 seconds). Battery life depends on the reporting frequency, network routing activity, and ambient temperature. Devices with faster update rates consume more power.',
  },
  {
    id: 6,
    question: 'What is a digital twin in the context of industrial IoT?',
    options: [
      'A redundant backup transmitter installed alongside each critical sensor for failover',
      'A duplicate copy of the cloud database held on an edge device for offline resilience',
      'A virtual model of a physical asset continuously updated with real-time sensor data, enabling simulation and optimisation',
      'A second identical machine kept running in parallel so production never stops during maintenance',
    ],
    correctAnswer: 2,
    explanation:
      'A digital twin is a virtual replica of a physical asset or process, continuously updated with live sensor data. It enables simulation, what-if analysis, predictive maintenance modelling, and performance optimisation without affecting the real system. It is a key enabler of data-driven industrial operations.',
  },
  {
    id: 7,
    question: 'What security concern is specific to industrial wireless networks?',
    options: [
      'Wireless devices draw so much current that they overload the supply, creating a fire risk',
      'Wireless data rates are too high for managed switches to inspect, hiding malware in traffic',
      'Wireless transmitters cannot be encrypted because AES interferes with the radio frequency',
      'Wireless signals can be intercepted or jammed; industrial wireless protocols must include encryption, authentication, and intrusion detection',
    ],
    correctAnswer: 3,
    explanation:
      'Wireless signals are accessible to anyone within range, making encryption (AES-128 for WirelessHART and ISA100.11a), device authentication, key management, and monitoring for signal jamming or interference essential for securing industrial wireless networks.',
  },
  {
    id: 8,
    question: 'What is LoRaWAN used for in industrial applications?',
    options: [
      'Long-range, low-power wide-area networking for monitoring applications covering large areas such as remote sites, pipelines, and utilities',
      'High-bandwidth video streaming from CCTV cameras across the plant floor to operator stations',
      'Deterministic real-time motion control of coordinated multi-axis servo drives on production lines',
      'Short-range, high-data-rate links between a PLC and its local I/O modules inside a panel',
    ],
    correctAnswer: 0,
    explanation:
      'LoRaWAN provides long-range communication (up to 15 km line of sight) with low power consumption, suitable for monitoring applications where the data rate is low and battery life is critical — such as remote asset monitoring, pipeline leak detection, and environmental sensing across large geographical areas.',
  },
  {
    id: 9,
    question: 'What is the role of cloud platforms in industrial IoT deployments?',
    options: [
      'Performing the real-time safety-critical control loops in place of the plant PLCs and DCS',
      'Providing scalable data storage, analytics, machine learning, dashboarding, and remote access for industrial data collected from edge devices',
      'Supplying the AES-128 encryption keys directly to each wireless field transmitter',
      'Generating the radio frequency-hopping schedule used by the wireless mesh network',
    ],
    correctAnswer: 1,
    explanation:
      'Cloud platforms (AWS IoT, Azure IoT, Siemens MindSphere, ABB Ability) provide the computing power, storage, and analytical tools for processing large volumes of industrial data. They enable insights, predictions, trend analysis, and enterprise-wide visibility — but do not replace the real-time control function of PLCs and DCSs.',
  },
  {
    id: 10,
    question: 'What four layers make up a typical IIoT architecture?',
    options: [
      'Power layer, control layer, safety layer, and display layer',
      'Input layer, processing layer, output layer, and storage layer',
      'Sensor/device layer, edge layer, network layer, and cloud/platform layer',
      'Physical layer, data link layer, transport layer, and session layer',
    ],
    correctAnswer: 2,
    explanation:
      'A typical IIoT architecture consists of: the sensor/device layer (smart sensors, wireless transmitters), the edge layer (gateways and edge computing), the network layer (wired, wireless, cellular connectivity), and the cloud/platform layer (data storage, analytics, dashboards, and enterprise integration).',
  },
  {
    id: 11,
    question: 'Why is OT/IT network separation essential when deploying industrial IoT?',
    options: [
      'OT and IT networks use incompatible IP addressing that prevents them sharing the same switch',
      'Separation is only needed to stop office staff seeing confidential production figures',
      'It allows the control network to run at a higher data rate than the office network allows',
      'IoT data must be extracted from the OT network via one-way data diodes or secured gateways in a DMZ, never by bridging the control network directly to the internet',
    ],
    correctAnswer: 3,
    explanation:
      'Maintaining clear separation between the OT (control) network and any IoT/IT network is essential. IoT data should be extracted via one-way data diodes, secured gateways in a DMZ, or published via OPC UA servers — never by directly connecting the control network to the internet or cloud services, which would expose it to cyber threats.',
  },
  {
    id: 12,
    question: 'Is private 5G technology relevant for industrial automation applications?',
    options: [
      'Yes — private 5G networks offer ultra-low latency, high bandwidth, and massive device density, making them attractive for mobile robots, AGVs, and flexible manufacturing',
      'No — 5G is a consumer mobile-phone technology that has no role on an industrial site',
      'No — 5G operates only in licensed bands that industrial plants are not permitted to use',
      'No — 5G cannot penetrate metal structures, so it is unusable inside any factory building',
    ],
    correctAnswer: 0,
    explanation:
      'Private 5G networks offer ultra-low latency, high bandwidth, and support for massive numbers of connected devices, making them attractive for applications such as mobile robots, automated guided vehicles (AGVs), augmented reality maintenance, and flexible manufacturing. The technology is maturing but is not yet widely deployed for safety-critical control.',
  },
];

const faqs = [
  {
    question: 'Can wireless replace wired instrumentation for process control?',
    answer:
      'For most control loops, wired instrumentation remains preferred due to guaranteed deterministic response, continuous power supply, and proven reliability. Wireless is ideal for monitoring, condition-based maintenance, remote or difficult-to-reach locations, and temporary measurements. Some non-critical control loops use wireless transmitters, but safety-critical control should remain wired.',
  },
  {
    question: 'How do I perform a wireless site survey before deploying WirelessHART?',
    answer:
      'A site survey assesses the RF environment before deployment. It involves: mapping the physical environment (metal structures, sources of interference), measuring ambient RF noise levels at 2.4 GHz, identifying potential obstacles and reflectors, determining optimal gateway and repeater locations, and planning device placement to ensure adequate mesh coverage with redundant communication paths.',
  },
  {
    question:
      'What is the difference between edge computing and cloud computing for industrial data?',
    answer:
      'Edge computing processes data locally (low latency, works offline, immediate response). Cloud computing provides massive storage, advanced analytics, machine learning, and enterprise-wide access. Most IIoT architectures use both: edge for real-time local processing and immediate decisions, cloud for long-term trend analysis, machine learning model training, and enterprise dashboards.',
  },
  {
    question: 'Is 5G relevant for industrial automation?',
    answer:
      'Private 5G networks offer ultra-low latency, high bandwidth, and massive device density, making them attractive for applications such as mobile robots, AGVs, AR/VR-assisted maintenance, and flexible manufacturing cells. Several industrial 5G solutions are emerging from major vendors, but the technology is still maturing for safety-critical control applications.',
  },
  {
    question: 'How do I maintain battery-powered wireless transmitters?',
    answer:
      'Monitor battery levels via the wireless gateway or asset management system. Plan battery replacements during scheduled maintenance windows before levels become critical. Most WirelessHART devices provide months of advance warning. Keep spare batteries in stock. When replacing batteries, verify the device rejoins the mesh network successfully and resumes reporting at the correct update rate.',
  },
];

const MOETModule5Section6_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.6 · Subsection 3"
        title="Wireless and IoT in Industry"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Industrial wireless protocols, IIoT architecture, edge computing, and cloud-connected
            monitoring.
          </p>

          <TLDR
            points={[
              'WirelessHART is the leading process wireless standard — mesh topology with 5-10 year battery life.',
              'IIoT connects sensors and equipment to edge and cloud platforms for data-driven optimisation.',
              'MQTT is the dominant IoT messaging protocol using publish/subscribe.',
              'Edge computing processes data locally; cloud provides analytics and enterprise visibility.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe industrial wireless protocols: WirelessHART, ISA100.11a, and industrial Wi-Fi',
              'Explain mesh networking topology and its self-healing capability',
              'Outline IIoT architecture: sensors, gateways, edge computing, and cloud platforms',
              'Identify IIoT communication protocols including MQTT and OPC UA',
              'Describe digital twin concepts and predictive maintenance applications',
              'Assess security requirements for industrial wireless and IoT deployments',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Predictive maintenance:</strong> vibration, thermal, and condition
                monitoring via wireless sensors.
              </li>
              <li>
                <strong>Remote monitoring:</strong> accessing plant data from anywhere for
                troubleshooting and support.
              </li>
              <li>
                <strong>Battery management:</strong> monitoring and planning replacement of wireless
                device batteries.
              </li>
              <li>
                <strong>ST1426:</strong> maps to emerging technology awareness and digital skills
                requirements.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Industrial wireless protocols</ContentEyebrow>

          <ConceptBlock
            title="Industrial wireless protocols"
            onSite="When deploying wireless devices, always conduct a site survey first to assess the RF environment. Metal structures, process vessels, and other equipment create unpredictable reflections and dead spots that can affect mesh coverage. Plan gateway and repeater locations based on the survey results, not assumptions."
          >
            <p>
              Industrial wireless communication has matured significantly over the past decade, with
              purpose-built protocols designed for the reliability, security, and environmental
              challenges of process and factory environments. These are not consumer wireless
              technologies — they are engineered specifically for industrial use with features that
              address the unique demands of plant operations.
            </p>
          </ConceptBlock>

          <ConceptBlock title="WirelessHART (IEC 62591)">
            <p>
              WirelessHART is the most widely deployed industrial wireless standard for process
              instrumentation:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Radio:</strong> IEEE 802.15.4 at 2.4 GHz with 15 channels.
              </li>
              <li>
                <strong>Access method:</strong> TDMA (Time Division Multiple Access) with frequency
                hopping for interference avoidance.
              </li>
              <li>
                <strong>Topology:</strong> self-healing mesh — each device can route data for
                neighbouring devices.
              </li>
              <li>
                <strong>Security:</strong> AES-128 encryption, device authentication, and key
                management.
              </li>
              <li>
                <strong>Battery life:</strong> 5-10 years with configurable update rates (typically
                8-60 seconds).
              </li>
              <li>
                <strong>Compatibility:</strong> uses the same HART command structure as wired HART
                devices.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="ISA100.11a (IEC 62734)">
            <p>
              ISA100.11a provides similar capabilities to WirelessHART with additional architectural
              flexibility:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Topology:</strong> supports both mesh and star configurations.
              </li>
              <li>
                <strong>Backbone routing:</strong> can route traffic via wired infrastructure
                between wireless clusters.
              </li>
              <li>
                <strong>Protocol tunnelling:</strong> can tunnel HART, Foundation Fieldbus, and
                Profibus data over the wireless network.
              </li>
              <li>
                <strong>Flexibility:</strong> particularly strong in applications requiring
                integration with diverse existing systems.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Industrial Wi-Fi">
            <p>
              Industrial Wi-Fi (IEEE 802.11) is used for high-bandwidth applications rather than
              process instrumentation:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Applications:</strong> video surveillance, mobile operator terminals, AGV
                communication, AR/VR.
              </li>
              <li>
                <strong>Hardware:</strong> ruggedised access points for harsh environments with
                IP65/67 ratings.
              </li>
              <li>
                <strong>Roaming:</strong> industrial access points support seamless roaming for
                mobile devices.
              </li>
              <li>
                <strong>Limitation:</strong> not typically used for real-time control due to
                non-deterministic nature.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>IIoT architecture and platforms</ContentEyebrow>

          <ConceptBlock title="IIoT architecture and platforms">
            <p>
              The Industrial Internet of Things connects plant-floor sensors and equipment to
              digital platforms for data collection, analysis, and optimisation. Unlike the
              traditional control system architecture (which is focused on real-time process
              control), the IIoT architecture is focused on extracting value from the vast amounts
              of data generated by industrial operations.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The four-layer IIoT architecture">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sensor/device layer:</strong> smart sensors, wireless transmitters,
                vibration monitors, power meters, and existing instrumentation with digital outputs.
              </li>
              <li>
                <strong>Edge layer:</strong> gateways and edge computing devices that aggregate,
                filter, and pre-process data locally before transmission.
              </li>
              <li>
                <strong>Network layer:</strong> wired (Ethernet, fibre), wireless (Wi-Fi, cellular
                4G/5G), and LPWAN (LoRaWAN, NB-IoT) connectivity.
              </li>
              <li>
                <strong>Cloud/platform layer:</strong> data storage, analytics, machine learning,
                dashboards, and enterprise integration (ERP, MES).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="MQTT protocol">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Lightweight publish/subscribe model.</li>
              <li>Devices publish data to named topics.</li>
              <li>Applications subscribe via a central broker.</li>
              <li>Quality-of-service levels (0, 1, 2).</li>
              <li>Designed for constrained devices and unreliable networks.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="OPC UA for integration">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Rich information modelling (not just values).</li>
              <li>Built-in security (authentication, encryption).</li>
              <li>Platform independent (any OS).</li>
              <li>Vendor neutral — supported by all major vendors.</li>
              <li>Plant-to-enterprise vertical integration.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Major IIoT platforms">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Siemens MindSphere:</strong> industrial IoT platform with connectivity to
                Siemens and third-party equipment.
              </li>
              <li>
                <strong>AWS IoT:</strong> Amazon&apos;s scalable cloud IoT services with machine
                learning capabilities.
              </li>
              <li>
                <strong>Microsoft Azure IoT:</strong> enterprise-integrated IoT platform with
                digital twin services.
              </li>
              <li>
                <strong>ABB Ability:</strong> industrial platform focused on electrification and
                automation analytics.
              </li>
              <li>
                <strong>Honeywell Forge:</strong> enterprise performance management platform for
                process industries.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Edge computing and data processing</ContentEyebrow>

          <ConceptBlock
            title="Edge computing and data processing"
            onSite="Most effective IIoT architectures combine edge and cloud processing. The edge handles time-critical local decisions and data reduction, whilst the cloud provides long-term storage, advanced analytics, machine learning model training, and enterprise-wide dashboards."
          >
            <p>
              Edge computing is a critical component of the IIoT architecture. Rather than sending
              all raw data to the cloud (which would require enormous bandwidth and introduce
              latency), edge devices process data locally and send only the results, summaries, or
              exceptions to the cloud. This approach provides faster local response, reduced
              bandwidth costs, and continued operation when cloud connectivity is interrupted.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Edge vs cloud processing">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Characteristic</th>
                    <th className="py-2 pr-4 font-medium text-white">Edge computing</th>
                    <th className="py-2 font-medium text-white">Cloud computing</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Latency</td>
                    <td className="py-2 pr-4">Very low (milliseconds)</td>
                    <td className="py-2">Higher (depends on connectivity)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Bandwidth</td>
                    <td className="py-2 pr-4">Minimal (sends summaries)</td>
                    <td className="py-2">High (receives raw or processed data)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Offline capability</td>
                    <td className="py-2 pr-4">Continues to function</td>
                    <td className="py-2">Unavailable without connectivity</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Storage</td>
                    <td className="py-2 pr-4">Limited local storage</td>
                    <td className="py-2">Virtually unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Analytics</td>
                    <td className="py-2 pr-4">Real-time, simple models</td>
                    <td className="py-2">Advanced ML, historical trends</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Practical applications and digital twins</ContentEyebrow>

          <ConceptBlock title="Practical applications and digital twins">
            <p>
              Industrial wireless and IoT technologies are enabling new maintenance strategies and
              operational improvements that were previously impractical or uneconomical.
              Understanding these applications helps maintenance technicians appreciate the value of
              the data they work with and the systems they maintain.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key IIoT applications">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Predictive maintenance:</strong> vibration analysis, thermal monitoring, oil
                condition sensing, and motor current analysis to predict failures before they occur
                — shifting from time-based to condition-based maintenance.
              </li>
              <li>
                <strong>Energy management:</strong> real-time monitoring and optimisation of energy
                consumption across the plant, identifying waste and enabling demand response.
              </li>
              <li>
                <strong>Remote monitoring:</strong> accessing plant data from anywhere for
                troubleshooting, expert support, and reduced site visits to remote locations.
              </li>
              <li>
                <strong>Environmental monitoring:</strong> emissions, noise, water quality, and
                weather data for compliance and environmental management.
              </li>
              <li>
                <strong>Asset tracking:</strong> locating mobile equipment, tools, and containers
                using RFID, BLE beacons, or UWB positioning.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Digital twins">
            <p>
              A digital twin is a virtual representation of a physical asset or process,
              continuously updated with real-time sensor data:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Simulation:</strong> test changes to process parameters or control
                strategies virtually before applying them to the real system.
              </li>
              <li>
                <strong>Predictive analytics:</strong> use historical and real-time data to predict
                equipment behaviour and remaining useful life.
              </li>
              <li>
                <strong>Training:</strong> provide realistic training environments for operators and
                maintenance technicians without risk to the real plant.
              </li>
              <li>
                <strong>Optimisation:</strong> continuously compare actual performance against the
                digital model to identify inefficiencies and improvement opportunities.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Practical maintenance note">
            <p>
              Wireless sensors for predictive maintenance are often added to existing equipment
              without modifying the control system — they operate independently, reporting data to a
              separate analytics platform. When installing wireless vibration or temperature
              sensors, ensure correct mounting position and orientation per the manufacturer&apos;s
              instructions, as poor mounting significantly reduces measurement accuracy.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Security for industrial wireless and IoT</ContentEyebrow>

          <ConceptBlock
            title="Security for industrial wireless and IoT"
            onSite="Under ST1426, maintenance technicians are expected to have awareness of emerging technologies including wireless instrumentation and IoT, understand the basic architecture and security requirements, and recognise the role of these technologies in modern maintenance strategies such as condition-based and predictive maintenance."
          >
            <p>
              Security is not optional for industrial wireless and IoT deployments. Every wireless
              device and every cloud connection represents a potential attack surface. The
              consequences of a security breach in an industrial environment can include physical
              damage, safety incidents, and environmental harm — far beyond the data theft risks of
              typical IT breaches.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Wireless security measures">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Encryption:</strong> AES-128 for WirelessHART and ISA100.11a;
                WPA3-Enterprise for industrial Wi-Fi.
              </li>
              <li>
                <strong>Authentication:</strong> device authentication before joining the network;
                certificate-based where possible.
              </li>
              <li>
                <strong>Key management:</strong> regular key rotation and secure key distribution.
              </li>
              <li>
                <strong>Jamming detection:</strong> monitoring for RF interference that could
                indicate a deliberate denial-of-service attack.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="IIoT security principles">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>OT/IT separation:</strong> never bridge the control network directly to the
                internet or cloud — use DMZ gateways.
              </li>
              <li>
                <strong>Secure boot:</strong> devices should verify firmware integrity before
                starting.
              </li>
              <li>
                <strong>Encrypted communication:</strong> TLS/DTLS for all data in transit between
                devices, gateways, and cloud platforms.
              </li>
              <li>
                <strong>Firmware updates:</strong> secure, authenticated firmware update mechanisms
                for edge and field devices.
              </li>
              <li>
                <strong>IEC 62443 compliance:</strong> follow the industrial cybersecurity standard
                for all IoT deployments.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Safety consideration">
            <p>
              IoT data extraction from the OT environment must always flow through a properly
              secured boundary — ideally using one-way data diodes for the most critical systems, or
              secured OPC UA gateways in a DMZ for bidirectional communication. Never allow external
              cloud services or IoT platforms to have direct inbound access to the control network.
              A compromised IoT device must not provide a pathway into the control system.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'WirelessHART (IEC 62591): 802.15.4 mesh at 2.4 GHz, AES-128, 5-10 year battery life. ISA100.11a (IEC 62734) adds mesh/star flexibility and protocol tunnelling.',
              'A four-layer IIoT architecture: sensor/device, edge, network, cloud/platform.',
              'MQTT is a lightweight publish/subscribe protocol built for constrained devices and unreliable networks.',
              'Edge computing processes data locally for low latency and offline resilience; cloud computing provides scale, storage and advanced analytics.',
              'A digital twin is a live virtual model of a physical asset used for simulation, prediction, training and optimisation.',
              'OT/IT separation is essential: extract IoT data via data diodes or secured DMZ gateways, never by bridging the control network to the internet.',
              'IEC 62443 governs industrial cybersecurity for wireless and IoT deployments.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section6-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Industrial Ethernet
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section6-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Cybersecurity in Industrial Networks
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section6_3;
