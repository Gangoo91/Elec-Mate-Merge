/**
 * Module 7 · Section 4 · Subsection 5 — Smart Lighting
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   IoT integration, wireless protocols, app control, data analytics, and predictive maintenance for intelligent lighting systems
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Smart Lighting - HNC Module 7 Section 4.5';
const DESCRIPTION =
  'Master smart lighting systems for building services: IoT integration, wireless protocols (Bluetooth Mesh, Zigbee, Thread), app control, cloud platforms, data analytics, and predictive maintenance.';

const quickCheckQuestions = [
  {
    id: 'iot-lighting-definition',
    question:
      'What distinguishes IoT-enabled lighting from traditional networked lighting control?',
    options: [
      'Bidirectional communication with cloud connectivity and data analytics',
      'It guarantees the project would not have happened without offset funding',
      'Higher resistance than copper and thermal expansion issues',
      'Reduced operational energy with residual emissions offset',
    ],
    correctIndex: 0,
    explanation:
      'IoT-enabled lighting features bidirectional communication capabilities, cloud connectivity for remote management, and the ability to collect and analyse operational data - going beyond simple on/off control to enable intelligent building management.',
  },
  {
    id: 'mesh-network-advantage',
    question: 'What is the primary advantage of mesh networking in smart lighting?',
    options: [
      'Light output reduction over time due to dirt, lamp ageing, room dirt',
      'Conduct a detailed baseline carbon assessment',
      'To receive and distribute the incoming electrical supply',
      'Self-healing networks with no single point of failure',
    ],
    correctIndex: 3,
    explanation:
      'Mesh networks create self-healing topologies where each node can route messages through multiple paths. If one luminaire fails or is removed, the network automatically reconfigures, maintaining system reliability.',
  },
  {
    id: 'zigbee-frequency',
    question: 'Which frequency band does Zigbee primarily operate in for lighting applications?',
    options: [
      '2.4 GHz',
      '433 MHz',
      '5 GHz',
      '868 MHz',
    ],
    correctIndex: 0,
    explanation:
      'Zigbee operates primarily in the 2.4 GHz ISM band globally, providing a good balance of range, data rate, and worldwide regulatory compatibility for smart lighting applications.',
  },
  {
    id: 'predictive-maintenance-data',
    question: 'What operational data is most valuable for predictive maintenance in LED lighting?',
    options: [
      'Single-point grounding, typically at the patch panel end',
      'Operating hours, temperature, and current draw trends',
      'Building Regulations Approved Document P',
      'Interoperability issues between different manufacturer systems',
    ],
    correctIndex: 1,
    explanation:
      'Predictive maintenance algorithms analyse operating hours, junction temperatures, driver current draw, and lumen depreciation trends to forecast LED or driver failures before they occur, enabling proactive replacement.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which wireless protocol was specifically designed for IP-based smart home and building automation?',
    options: [
      'Zigbee',
      'Thread',
      'Bluetooth Mesh',
      'Z-Wave',
    ],
    correctAnswer: 1,
    explanation:
      'Thread was designed from the ground up as an IPv6-based mesh protocol, enabling direct IP addressing of devices. This simplifies integration with IT infrastructure and cloud services compared to protocols requiring translation gateways.',
  },
  {
    id: 2,
    question: "In Bluetooth Mesh lighting, what is the role of a 'Friend' node?",
    options: [
      'Manages user authentication',
      'Controls colour temperature',
      'Stores messages for low-power nodes',
      'Provides internet connectivity',
    ],
    correctAnswer: 2,
    explanation:
      'Friend nodes in Bluetooth Mesh store messages for associated Low Power Nodes (LPNs) that sleep most of the time. When the LPN wakes periodically, it retrieves any stored messages from its Friend, enabling battery-powered sensors to participate in the mesh.',
  },
  {
    id: 3,
    question: 'What is the maximum theoretical number of nodes in a Zigbee network?',
    options: [
      '32,767',
      '256',
      '1,024',
      '65,535',
    ],
    correctAnswer: 3,
    explanation:
      'Zigbee uses 16-bit addressing, supporting up to 65,535 (2^16 - 1) nodes per network. This makes it highly scalable for large commercial and industrial lighting installations.',
  },
  {
    id: 4,
    question:
      'Which cloud architecture model processes smart lighting data locally before sending summaries to the cloud?',
    options: [
      'Edge computing',
      'Centralised cloud',
      'Fog computing',
      'Distributed ledger',
    ],
    correctAnswer: 0,
    explanation:
      'Edge computing processes data locally at or near the source (e.g., in a local gateway or luminaire), reducing latency, bandwidth requirements, and cloud dependency while maintaining cloud connectivity for analytics and remote management.',
  },
  {
    id: 5,
    question:
      'For occupancy analytics in smart lighting, what sensor fusion approach provides the most accurate people counting?',
    options: [
      'kWh consumption correlated with occupancy patterns',
      'Combination of PIR, thermal imaging, and AI analysis',
      'Smartphone-based mass provisioning with automatic addressing',
      'Gradual reduction in light output over LED lifetime',
    ],
    correctAnswer: 1,
    explanation:
      'Combining multiple sensor technologies (PIR for motion, thermal for heat signatures, and AI-based image processing) provides more accurate occupancy detection and people counting than any single technology, accounting for stationary occupants and distinguishing individuals.',
  },
  {
    id: 6,
    question:
      'What authentication standard is commonly used for secure smart lighting app control?',
    options: [
      'WEP',
      'Basic HTTP authentication',
      'OAuth 2.0 with TLS',
      'Telnet access',
    ],
    correctAnswer: 2,
    explanation:
      'OAuth 2.0 with TLS encryption is the industry standard for secure app-based control, providing token-based authentication, granular permissions, and encrypted communication without exposing user credentials to third-party applications.',
  },
  {
    id: 7,
    question:
      'Which data metric is essential for calculating energy savings in smart lighting systems?',
    options: [
      'Smartphone-based mass provisioning with automatic addressing',
      'Stores messages for low-power nodes',
      'Combination of PIR, thermal imaging, and AI analysis',
      'kWh consumption correlated with occupancy patterns',
    ],
    correctAnswer: 3,
    explanation:
      'Correlating actual kWh consumption with occupancy patterns and daylight levels enables accurate calculation of energy savings from smart controls, demonstrating the value of occupancy-based dimming and daylight harvesting strategies.',
  },
  {
    id: 8,
    question: "What is 'lumen depreciation' in the context of predictive maintenance?",
    options: [
      'Gradual reduction in light output over LED lifetime',
      'Cryptographic code signing and secure boot',
      'Direct internet connectivity without translation gateways',
      'Smartphone-based mass provisioning with automatic addressing',
    ],
    correctAnswer: 0,
    explanation:
      'Lumen depreciation (L70, L80 ratings) describes the gradual reduction in LED light output over time. Smart systems can monitor this decline through photosensors and predict when replacement is needed to maintain specified illumination levels.',
  },
  {
    id: 9,
    question:
      'Which cybersecurity measure prevents unauthorised firmware updates in smart luminaires?',
    options: [
      'MAC address filtering alone',
      'Cryptographic code signing and secure boot',
      'Password-protected Wi-Fi',
      'Physical access control only',
    ],
    correctAnswer: 1,
    explanation:
      'Cryptographic code signing ensures firmware updates are from authorised sources, while secure boot verifies the integrity of firmware before execution. Together, these prevent malicious code injection even if network access is compromised.',
  },
  {
    id: 10,
    question: "What is the primary benefit of Thread's use of IPv6 addressing for smart lighting?",
    options: [
      'kWh consumption correlated with occupancy patterns',
      'Gradual reduction in light output over LED lifetime',
      'Direct internet connectivity without translation gateways',
      'Combination of PIR, thermal imaging, and AI analysis',
    ],
    correctAnswer: 2,
    explanation:
      "Thread's native IPv6 addressing allows each device to have a routable IP address, enabling direct communication with cloud services and IT systems without requiring protocol translation gateways, simplifying system architecture.",
  },
  {
    id: 11,
    question:
      'For GDPR compliance in occupancy analytics, what anonymisation technique is commonly applied?',
    options: [
      'Smartphone-based mass provisioning with automatic addressing',
      'Gradual reduction in light output over LED lifetime',
      'Direct internet connectivity without translation gateways',
      'Heat mapping and aggregated counting without personal identification',
    ],
    correctAnswer: 3,
    explanation:
      'GDPR-compliant occupancy analytics typically use heat mapping and aggregated counting that detect presence without identifying individuals. Thermal sensors and processed edge analytics avoid capturing personally identifiable information.',
  },
  {
    id: 12,
    question:
      'Which commissioning approach is most efficient for large-scale Bluetooth Mesh lighting deployments?',
    options: [
      'Smartphone-based mass provisioning with automatic addressing',
      'Cryptographic code signing and secure boot',
      'Combination of PIR, thermal imaging, and AI analysis',
      'kWh consumption correlated with occupancy patterns',
    ],
    correctAnswer: 0,
    explanation:
      'Modern Bluetooth Mesh systems support smartphone-based mass provisioning where luminaires are automatically discovered, assigned addresses, and grouped. This dramatically reduces commissioning time compared to individual configuration.',
  },
];

const faqs = [
  {
    question: 'How do smart lighting systems ensure reliable operation during internet outages?',
    answer:
      'Well-designed smart lighting systems maintain local control capability when cloud connectivity is lost. The local gateway or controller stores schedules, scenes, and automation rules, executing them independently. Mesh networks continue operating autonomously, and occupancy sensors maintain local response. Cloud features (remote access, analytics dashboards) become unavailable, but lighting remains fully functional for occupants.',
  },
  {
    question:
      'What is the typical battery life for wireless occupancy sensors in smart lighting systems?',
    answer:
      'Battery-powered wireless occupancy sensors in Bluetooth Mesh or Zigbee systems typically achieve 3-5 years on a single coin cell battery. This is enabled by low-duty-cycle operation (sleeping most of the time), low-power radio protocols, and Friend/sleepy end-device mechanisms that allow the sensor to poll for messages periodically rather than constantly listening.',
  },
  {
    question: 'Can different wireless protocols coexist in the same lighting installation?',
    answer:
      'Yes, multi-protocol gateways can integrate Zigbee, Bluetooth Mesh, Thread, and Wi-Fi devices into a unified management system. However, devices on different protocols cannot communicate directly with each other - they communicate through the gateway. Some manufacturers now include multi-protocol radios in luminaires, and Matter certification aims to provide a unifying application layer across Thread, Wi-Fi, and Ethernet devices.',
  },
  {
    question:
      'How do smart lighting systems handle firmware updates across hundreds of luminaires?',
    answer:
      'Over-the-air (OTA) firmware updates are distributed through the mesh network, typically scheduled during unoccupied periods to avoid disruption. Updates are segmented and transmitted incrementally, with each luminaire verifying the complete image before applying. Rollback capability ensures that if an update fails, the luminaire reverts to the previous working firmware.',
  },
  {
    question: 'What cybersecurity certifications should smart lighting systems meet?',
    answer:
      'Smart lighting systems should comply with relevant security standards including ETSI EN 303 645 (IoT security baseline), IEC 62443 for industrial systems, and manufacturer-specific certifications. For UK installations, products should meet the requirements of the Product Security and Telecommunications Infrastructure Act (PSTI) which mandates minimum security standards for connected devices.',
  },
  {
    question: 'How accurate is energy prediction based on smart lighting analytics?',
    answer:
      'Modern smart lighting analytics can predict energy consumption within 5-10% accuracy when trained on 3-6 months of historical data. Accuracy improves with occupancy pattern recognition, weather data integration for daylight predictions, and machine learning models that account for seasonal variations. This enables reliable budgeting and measurement of energy saving initiatives.',
  },
];

const HNCModule7Section4_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section4")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 4 · Subsection 5"
            title="Smart Lighting"
            description="IoT integration, wireless protocols, app control, data analytics, and predictive maintenance for intelligent lighting systems"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Explain IoT architectures for smart lighting systems",
              "Compare wireless protocols: Bluetooth Mesh, Zigbee, and Thread",
              "Design smartphone and cloud-based lighting control systems",
              "Implement data analytics for energy and occupancy insights",
              "Apply predictive maintenance strategies using lighting data",
              "Address cybersecurity requirements for connected lighting",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="IoT Lighting Fundamentals">
            <p>Internet of Things (IoT) enabled lighting transforms luminaires from simple light sources into intelligent networked devices capable of bidirectional communication, data collection, and integration with building management ecosystems.</p>
            <p><strong>IoT Lighting Architecture Components:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Smart luminaires:</strong> LED drivers with embedded wireless radios and sensors</li>
              <li><strong>Gateways/bridges:</strong> Protocol translation between lighting network and IP infrastructure</li>
              <li><strong>Cloud platform:</strong> Data storage, analytics, remote management, and API access</li>
              <li><strong>Edge processing:</strong> Local intelligence for latency-sensitive operations</li>
            </ul>
            <p><strong>IoT vs Traditional Lighting Control</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Communication:</strong> Unidirectional (command only) — Bidirectional (command + feedback)</li>
              <li><strong>Remote access:</strong> Requires on-site presence — Cloud-based anywhere access</li>
              <li><strong>Data collection:</strong> Manual meter readings — Continuous automated logging</li>
              <li><strong>Firmware updates:</strong> Physical replacement — Over-the-air (OTA)</li>
              <li><strong>Integration:</strong> Proprietary protocols — Open APIs, IT system integration</li>
            </ul>
            <p><strong>Key principle:</strong> IoT lighting creates value beyond illumination through the data it generates and the systems it enables.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Wireless Protocols for Smart Lighting">
            <p>Modern smart lighting relies on low-power wireless protocols optimised for mesh networking. The three dominant protocols - Bluetooth Mesh, Zigbee, and Thread - each offer distinct advantages for different application requirements.</p>
            <p><strong>Protocol Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Frequency:</strong> 2.4 GHz — 2.4 GHz / 868 MHz — 2.4 GHz</li>
              <li><strong>Max nodes:</strong> 32,767 — 65,535 — ~250 per network</li>
              <li><strong>IP-based:</strong> No (requires gateway) — No (requires gateway) — Yes (native IPv6)</li>
              <li><strong>Smartphone access:</strong> Direct (no hub needed) — Via hub/gateway — Via border router</li>
              <li><strong>Typical range:</strong> 10-30m per hop — 10-100m per hop — 10-30m per hop</li>
              <li><strong>Best for:</strong> Retrofit, smartphone control — Large-scale commercial — IT-integrated smart buildings</li>
            </ul>
            <p><strong>Bluetooth Mesh</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Managed flood messaging</li>
              <li>Friend/LPN for battery devices</li>
              <li>Smartphone commissioning</li>
              <li>Proxy nodes for app access</li>
            </ul>
            <p><strong>Zigbee</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Coordinator-router-end device</li>
              <li>Zigbee Light Link (ZLL) profile</li>
              <li>Mature ecosystem</li>
              <li>Zigbee 3.0 unified standard</li>
            </ul>
            <p><strong>Thread</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Native IPv6 addressing</li>
              <li>No single point of failure</li>
              <li>Border router to IP network</li>
              <li>Matter application layer</li>
            </ul>
            <p><strong>Matter Standard</strong></p>
            <p>Matter (formerly CHIP) provides a unified application layer running over Thread, Wi-Fi, and Ethernet. Matter-certified devices interoperate regardless of manufacturer, addressing the fragmentation that previously limited smart home adoption. Major lighting manufacturers now offer Matter-compatible products.</p>
            <p><strong>Selection guidance:</strong> Choose Bluetooth Mesh for retrofit simplicity, Zigbee for proven large-scale commercial deployments, and Thread for new builds prioritising IT integration.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="App Control and Cloud Platforms">
            <p>Smartphone applications and cloud platforms transform how lighting systems are commissioned, controlled, and managed. Modern platforms provide intuitive interfaces for end users while enabling sophisticated management capabilities for facilities teams.</p>
            <p><strong>App Control Capabilities:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Commissioning:</strong> Automatic device discovery, grouping, and scene programming</li>
              <li><strong>Real-time control:</strong> Dimming, colour temperature, scene selection, scheduling</li>
              <li><strong>Personalisation:</strong> User preferences, circadian profiles, workspace settings</li>
              <li><strong>Voice integration:</strong> Amazon Alexa, Google Assistant, Apple HomeKit</li>
            </ul>
            <p><strong>Cloud Platform Architecture</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Device layer:</strong> Luminaires, sensors, switches — Bluetooth/Zigbee/Thread mesh</li>
              <li><strong>Gateway layer:</strong> Protocol translation, local processing — Edge computing devices</li>
              <li><strong>Connectivity layer:</strong> Secure cloud connection — MQTT, HTTPS, WebSocket</li>
              <li><strong>Platform layer:</strong> Data storage, processing, APIs — AWS IoT, Azure IoT Hub</li>
              <li><strong>Application layer:</strong> User interfaces, dashboards — Mobile apps, web portals</li>
            </ul>
            <p><strong>API Integration Examples</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Calendar integration:</strong> Automatic lighting scenes based on room bookings</li>
              <li><strong>Access control:</strong> Lights activate when authorised badge detected</li>
              <li><strong>HVAC coordination:</strong> Synchronised occupancy-based control</li>
              <li><strong>Energy management:</strong> Demand response during peak tariff periods</li>
            </ul>
            <p><strong>Best practice:</strong> Implement local fallback control to ensure lighting remains operational during cloud or internet outages.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Data Analytics and Predictive Maintenance">
            <p>Smart lighting systems generate continuous streams of operational data. Properly analysed, this data enables energy optimisation, space utilisation insights, and predictive maintenance strategies that reduce costs and improve building performance.</p>
            <p><strong>Energy Analytics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Real-time power consumption</li>
              <li>kWh trending and forecasting</li>
              <li>Daylight harvesting effectiveness</li>
              <li>Occupancy-based savings calculation</li>
              <li>Carbon footprint reporting</li>
            </ul>
            <p><strong>Occupancy Analytics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Space utilisation heat maps</li>
              <li>Occupancy pattern recognition</li>
              <li>People counting and flow</li>
              <li>Peak usage identification</li>
              <li>Desk/room booking optimisation</li>
            </ul>
            <p><strong>Predictive Maintenance Data Points</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Operating hours:</strong> Progress toward rated lifetime — Schedule replacement at L70</li>
              <li><strong>Junction temperature:</strong> Thermal stress, accelerated ageing — Improve ventilation, derate output</li>
              <li><strong>Driver current trend:</strong> Component degradation — Predict driver failure window</li>
              <li><strong>Light output (lux):</strong> Lumen depreciation rate — Increase output or schedule replacement</li>
              <li><strong>Communication errors:</strong> Network or hardware issues — Investigate interference or faults</li>
            </ul>
            <p><strong>Machine Learning Applications</strong></p>
            <p>Advanced analytics platforms apply machine learning algorithms to lighting data:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Anomaly detection identifies failing luminaires before complete failure</li>
              <li>Pattern recognition optimises schedules based on actual usage</li>
              <li>Regression models correlate energy use with weather and occupancy</li>
              <li>Classification algorithms categorise space usage for facility planning</li>
            </ul>
            <p><strong>Cybersecurity Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Encryption:</strong> TLS 1.3 for cloud communication, AES-128 for mesh networks</li>
              <li><strong>Authentication:</strong> OAuth 2.0 for apps, certificate-based for devices</li>
              <li><strong>Firmware security:</strong> Cryptographic code signing, secure boot</li>
              <li><strong>Network segmentation:</strong> Separate VLAN for IoT devices</li>
              <li><strong>PSTI compliance:</strong> No default passwords, vulnerability disclosure policy</li>
            </ul>
            <p><strong>GDPR compliance:</strong> Occupancy analytics must anonymise data. Use heat mapping and aggregated counting rather than individual tracking. Conduct Data Protection Impact Assessments for any personal data processing.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Protocol Selection for Office Retrofit</strong>
            </p>
            <p><strong>Scenario:</strong> A 3-floor office building requires smart lighting retrofit without rewiring. 150 luminaires, smartphone control required, moderate IT integration.</p>
            <p>Evaluation criteria:</p>
            <p>Retrofit capability: No new wiring &gt; Wireless essential</p>
            <p>Smartphone commissioning: Direct access &gt; Bluetooth Mesh advantage</p>
            <p>Scale: 150 nodes &gt; All protocols support this</p>
            <p>IT integration: Moderate &gt; Gateway acceptable</p>
            <p>Cost: Retrofit budget &gt; Bluetooth Mesh lower gateway cost</p>
            <p>Recommendation: Bluetooth Mesh</p>
            <p>Justification: Smartphone-based commissioning, no hub</p>
            <p>required for basic operation, easy installer adoption</p>
            <p>
              <strong>Example 2: Energy Savings Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate annual energy savings from smart lighting controls in an open-plan office.</p>
            <p>Baseline consumption (no controls):</p>
            <p>100 luminaires x 40W x 12 hours/day x 260 days</p>
            <p>= 12,480 kWh/year</p>
            <p>Smart control savings:</p>
            <p>Occupancy sensing: 30% reduction = 3,744 kWh</p>
            <p>Daylight harvesting: 20% reduction = 2,496 kWh</p>
            <p>Task tuning: 10% reduction = 1,248 kWh</p>
            <p>Total savings: 7,488 kWh (60% reduction)</p>
            <p>At £0.28/kWh = £2,097/year energy cost saving</p>
            <p>Carbon reduction: 7,488 x 0.207 = 1,550 kg CO2e</p>
            <p>
              <strong>Example 3: Predictive Maintenance Alert</strong>
            </p>
            <p><strong>Scenario:</strong> Analytics platform flags a luminaire for investigation. Interpret the data.</p>
            <p>Luminaire: LUM-3F-042</p>
            <p>Operating hours: 38,500 (rated L70 @ 50,000h)</p>
            <p>Anomaly indicators:</p>
            <p>Junction temperature: +12°C above fleet average</p>
            <p>Driver current: +8% above nominal</p>
            <p>Light output: -18% from commissioning baseline</p>
            <p>Analysis:</p>
            <p>Elevated temperature accelerates LED depreciation</p>
            <p>Increased current suggests driver compensation</p>
            <p>Lumen output declining faster than expected</p>
            <p>Prediction: Driver failure in 2,000-4,000 operating hours</p>
            <p>Action: Schedule replacement in next maintenance cycle</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Smart Lighting Design Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Select protocol based on scale, integration requirements, and retrofit constraints</li>
              <li>Ensure adequate mesh density (typically 1 router per 5-10 end devices)</li>
              <li>Plan gateway placement for optimal coverage and IT room access</li>
              <li>Specify cybersecurity requirements in procurement documents</li>
              <li>Define data analytics requirements and reporting dashboards</li>
              <li>Document commissioning procedures for mass provisioning</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Zigbee frequency: <strong>2.4 GHz</strong> (global), 868 MHz (Europe)</li>
              <li>Bluetooth Mesh max nodes: <strong>32,767</strong> devices</li>
              <li>Thread addressing: <strong>IPv6 native</strong></li>
              <li>Typical energy savings: <strong>40-70%</strong> with smart controls</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Insufficient mesh density</strong> - Message failures in sparse areas</li>
                <li><strong>No local fallback</strong> - System fails during cloud outages</li>
                <li><strong>Ignoring cybersecurity</strong> - Vulnerable to attacks and non-compliant</li>
                <li><strong>Over-collecting data</strong> - GDPR violations with personal data</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section4-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Scene setting
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section4-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                BMS integration
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section4_5;
