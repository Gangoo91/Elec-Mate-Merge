/**
 * Module 8 · Section 5 · Subsection 4 — Communication Protocols
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   BACnet, Modbus, LonWorks, KNX, protocol gateways and multi-vendor integration
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

const TITLE = 'Communication Protocols - HNC Module 8 Section 5.4';
const DESCRIPTION =
  'Master BMS communication protocols: BACnet (IP, MS/TP), Modbus (RTU, TCP), LonWorks, KNX, M-Bus for metering, protocol gateways, open vs proprietary systems, and multi-vendor integration strategies.';

const quickCheckQuestions = [
  {
    id: 'bacnet-transport',
    question:
      'Which BACnet transport layer is most commonly used for backbone communications in large commercial buildings?',
    options: [
      'BACnet/IP',
      'BACnet MS/TP',
      'BACnet PTP',
      'BACnet ARCNET',
    ],
    correctIndex: 0,
    explanation:
      'BACnet/IP uses standard Ethernet and IP infrastructure, providing high speed (100 Mbps+), native IT integration, and leverages existing building network cabling. MS/TP is used for field-level device communications.',
  },
  {
    id: 'modbus-difference',
    question: 'What is the key difference between Modbus RTU and Modbus TCP?',
    options: [
      'TCP requires proprietary software',
      'TCP uses Ethernet, RTU uses serial RS-485',
      'RTU is faster than TCP',
      'RTU supports more devices than TCP',
    ],
    correctIndex: 1,
    explanation:
      'Modbus RTU uses serial communication (typically RS-485), whilst Modbus TCP encapsulates the Modbus protocol within TCP/IP packets for Ethernet networks. Both use the same register-based data model.',
  },
  {
    id: 'knx-topology',
    question: 'What is the maximum number of devices per KNX line segment?',
    options: [
      '256 devices',
      '127 devices',
      '64 devices',
      '32 devices',
    ],
    correctIndex: 2,
    explanation:
      'A KNX line segment supports up to 64 devices. Lines can be connected via line couplers to form areas, and areas via backbone couplers, creating a hierarchical topology supporting thousands of devices.',
  },
  {
    id: 'gateway-purpose',
    question: 'What is the primary function of a protocol gateway in a BMS installation?',
    options: [
      'Rate of heat transfer through a building element (thermal transmittance)',
      'BS 88, BS 3036, BS EN 60898, BS EN 60947-2 or BS EN 61009-1 RCBO at 30 A or 32 A',
      'To translate between different protocols enabling interoperability',
      'Central point connecting all earthing and bonding conductors',
    ],
    correctIndex: 2,
    explanation:
      'Protocol gateways translate messages between different protocols (e.g., Modbus to BACnet), enabling devices from different manufacturers to communicate within an integrated BMS.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which organisation developed and maintains the BACnet standard?',
    options: [
      'The sum of EMFs equals the sum of voltage drops (algebraic sum = 0)',
      'ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers)',
      'Identify the terminal with the lowest percentage of design flow',
      'Stop, Take a breath, Observe what you are feeling, Proceed with awareness',
    ],
    correctAnswer: 1,
    explanation:
      'BACnet was developed by ASHRAE and is published as ANSI/ASHRAE Standard 135. It is also adopted internationally as ISO 16484-5.',
  },
  {
    id: 2,
    question: 'What baud rate is typically used for BACnet MS/TP communications?',
    options: [
      '115200 bps',
      '9600 bps',
      '38400 or 76800 bps',
      '19200 bps',
    ],
    correctAnswer: 2,
    explanation:
      'BACnet MS/TP commonly operates at 38400 or 76800 bps over RS-485. Higher baud rates (76800) are preferred for larger networks to improve response times.',
  },
  {
    id: 3,
    question: 'In Modbus protocol, what is the function code for reading holding registers?',
    options: [
      '02 (Read Discrete Inputs)',
      '01 (Read Coils)',
      '04 (Read Input Registers)',
      '03 (Read Holding Registers)',
    ],
    correctAnswer: 3,
    explanation:
      'Function code 03 reads holding registers, which are typically used for setpoints, configuration data, and read/write values. Function code 04 reads input registers (read-only sensor values).',
  },
  {
    id: 4,
    question: 'What physical medium does standard KNX TP (Twisted Pair) use?',
    options: [
      'Dedicated green KNX bus cable (twisted pair)',
      'Identify all hazards and required isolation points',
      'Mechanical stress and flexing damage assessment',
      'The scheduled maintenance date being overdue',
    ],
    correctAnswer: 0,
    explanation:
      'KNX TP uses dedicated bus cable (typically green) with a twisted pair for communication. The same cable carries both data and 30V DC bus power for devices.',
  },
  {
    id: 5,
    question: 'What is the maximum cable length for a single RS-485 segment used in Modbus RTU?',
    options: [
      '500 metres',
      '1200 metres',
      '2000 metres',
      '100 metres',
    ],
    correctAnswer: 1,
    explanation:
      'RS-485 supports cable lengths up to 1200 metres (4000 feet) at lower baud rates. This long distance capability makes it ideal for industrial and building automation applications.',
  },
  {
    id: 6,
    question: 'Which protocol was specifically designed for utility metering applications?',
    options: [
      'BACnet',
      'LonWorks',
      'M-Bus (Meter Bus)',
      'KNX',
    ],
    correctAnswer: 2,
    explanation:
      'M-Bus was specifically designed for remote reading of utility meters (gas, water, electricity, heat). It uses a two-wire bus with master-slave communication and supports long cable runs.',
  },
  {
    id: 7,
    question: 'What does PICS stand for in BACnet terminology?',
    options: [
      'Protocol Interface Communication Standard',
      'Programmable Interface Control Specification',
      'Primary Integration Communication System',
      'Protocol Implementation Conformance Statement',
    ],
    correctAnswer: 3,
    explanation:
      'PICS (Protocol Implementation Conformance Statement) documents exactly which BACnet objects, services, and data link layers a device supports, enabling specifiers to verify interoperability.',
  },
  {
    id: 8,
    question: 'In a LonWorks network, what is the function of a router?',
    options: [
      'To connect subnets and manage message routing between domains',
      'Open protocols enable competitive procurement and reduce vendor lock-in',
      'Protocol Implementation Conformance Statement',
      'Dedicated green KNX bus cable (twisted pair)',
    ],
    correctAnswer: 0,
    explanation:
      'LonWorks routers connect subnets within or between domains, managing message routing and limiting local traffic to its origin subnet. They enable large, hierarchical network topologies.',
  },
  {
    id: 9,
    question: 'Which statement about open protocols versus proprietary systems is correct?',
    options: [
      'Proprietary systems always perform better than open protocols',
      'Open protocols enable competitive procurement and reduce vendor lock-in',
      'Open protocols guarantee multi-vendor interoperability without testing',
      'Proprietary systems are always less expensive to maintain',
    ],
    correctAnswer: 1,
    explanation:
      'Open protocols (BACnet, Modbus, KNX) enable competitive procurement by allowing products from multiple vendors. This reduces vendor lock-in and typically lowers lifecycle costs.',
  },
  {
    id: 10,
    question: 'What is BACnet Broadcast Management Device (BBMD) used for?',
    options: [
      'To connect subnets and manage message routing between domains',
      'Points list, protocol details, and communication parameters',
      'Routing BACnet/IP messages across different IP subnets',
      'Dedicated green KNX bus cable (twisted pair)',
    ],
    correctAnswer: 2,
    explanation:
      'BBMD enables BACnet/IP devices on different IP subnets to discover and communicate with each other by forwarding broadcast messages. Essential for large multi-subnet installations.',
  },
  {
    id: 11,
    question:
      'What is the typical polling interval recommended for energy monitoring points in a BMS?',
    options: [
      'Every second',
      'Once per day',
      'Once per hour',
      'Every 5-15 minutes',
    ],
    correctAnswer: 3,
    explanation:
      'Energy monitoring typically uses 5-15 minute intervals, balancing granularity for analysis against network traffic. Critical control points may poll more frequently (1-5 seconds).',
  },
  {
    id: 12,
    question:
      'When integrating a third-party chiller with a BMS, what information is essential from the chiller manufacturer?',
    options: [
      'Points list, protocol details, and communication parameters',
      'To connect subnets and manage message routing between domains',
      'Protocol Implementation Conformance Statement',
      'Routing BACnet/IP messages across different IP subnets',
    ],
    correctAnswer: 0,
    explanation:
      'Integration requires a detailed points list (available data points), protocol specification (BACnet PICS, Modbus register map), and communication parameters (baud rate, addressing, IP settings).',
  },
];

const faqs = [
  {
    question: 'Should I specify BACnet or Modbus for a new BMS installation?',
    answer:
      'For new commercial BMS installations, BACnet is generally preferred as it was purpose-designed for building automation with rich object types, standardised services, and built-in interoperability features. Modbus remains common for integrating industrial equipment, meters, and legacy devices due to its simplicity and widespread support. Many installations use both: BACnet for HVAC control and Modbus for utility meters and specialist equipment, connected via protocol gateways.',
  },
  {
    question: 'How do I ensure true interoperability when specifying open protocols?',
    answer:
      'Request BACnet PICS (Protocol Implementation Conformance Statement) from all vendors to verify supported objects and services match your requirements. Specify conformance to specific BACnet device profiles (e.g., B-BC for Building Controller). Include integration testing as part of commissioning with all devices on the same test network. Consider third-party certification such as BACnet Testing Laboratory (BTL) listing for critical devices.',
  },
  {
    question: 'What are the cybersecurity considerations for BMS communication protocols?',
    answer:
      'Traditional BMS protocols (BACnet, Modbus, LonWorks) were designed without security features. For secure installations: isolate BMS networks from corporate IT using VLANs and firewalls; use BACnet Secure Connect (BACnet/SC) for encrypted communications; implement role-based access control at the head-end; regularly update device firmware; and monitor network traffic for anomalies. Document all network access points in the O&M manual.',
  },
  {
    question: 'When should I use protocol gateways versus native protocol devices?',
    answer:
      'Native protocol devices are preferred as they eliminate gateway costs, reduce points of failure, and simplify maintenance. However, gateways are necessary when: integrating legacy equipment with fixed protocols; connecting specialist equipment only available with proprietary protocols; bridging BACnet/IP backbone to MS/TP field devices; or integrating utility meters (M-Bus) with the main BMS. Always budget for gateway configuration and testing time during commissioning.',
  },
  {
    question: 'How many devices can I connect on a single Modbus RTU network?',
    answer:
      'Modbus RTU supports up to 247 device addresses (1-247) on a single RS-485 bus. However, practical limits are lower due to cable length, baud rate, and polling requirements. For responsive control, limit segments to 20-30 devices. Use multiple bus segments with separate serial ports or Modbus TCP with individual IP addresses for larger installations. Consider response time requirements when planning network topology.',
  },
  {
    question: 'What documentation should I request for a multi-protocol BMS integration?',
    answer:
      'Essential documentation includes: network architecture diagram showing all protocols and gateways; points list for every integrated device with point names, addresses, and engineering units; protocol specifications (PICS for BACnet, register maps for Modbus); gateway configuration files; IP addressing scheme and VLAN assignments; and commissioning test records proving point-to-point verification. This documentation is critical for ongoing maintenance and future modifications.',
  },
];

const HNCModule8Section5_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section5")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 5 · Subsection 4"
            title="Communication Protocols"
            description="BACnet, Modbus, LonWorks, KNX, protocol gateways and multi-vendor integration"
            tone="purple"
          />

          <ConceptBlock title="BACnet - Building Automation and Control Network">
            <p>BACnet is an open protocol specifically designed for building automation, developed by ASHRAE and published as ANSI/ASHRAE Standard 135. It provides a standardised method for building automation devices to communicate, regardless of manufacturer, enabling true interoperability in commercial building systems.</p>
            <p><strong>BACnet Transport Layers</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BACnet/IP:</strong> Ethernet (UDP/IP) — 100 Mbps - 1 Gbps — Backbone, head-end, supervisory</li>
              <li><strong>BACnet MS/TP:</strong> RS-485 — 9.6 - 76.8 kbps — Field devices, controllers, sensors</li>
              <li><strong>BACnet/SC:</strong> WebSocket/TLS — Network dependent — Secure communications, cloud connectivity</li>
              <li><strong>BACnet Ethernet:</strong> Ethernet (802.3) — 10/100 Mbps — Legacy installations (now rare)</li>
            </ul>
            <p><strong>BACnet Object Model</strong></p>
            <p>BACnet uses an object-oriented approach where all data is organised into standardised objects with defined properties. This enables consistent access to data across different manufacturers.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Analog Input (AI):</strong> Sensor readings (temperature, pressure) — Room temperature sensor</li>
              <li><strong>Analog Output (AO):</strong> Modulating control outputs — Valve position command</li>
              <li><strong>Binary Input (BI):</strong> On/off status readings — Fan running status</li>
              <li><strong>Binary Output (BO):</strong> On/off control outputs — Pump start/stop command</li>
              <li><strong>Schedule:</strong> Time-based control schedules — AHU operating times</li>
              <li><strong>Trend Log:</strong> Historical data storage — Temperature logging</li>
              <li><strong>Notification Class:</strong> Alarm routing configuration — Critical alarm distribution</li>
            </ul>
            <p><strong>BACnet Device Profiles (ASHRAE 135.1)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>B-AWS:</strong> Advanced Workstation - full graphical interface capability</li>
              <li><strong>B-OWS:</strong> Operator Workstation - operator interface functions</li>
              <li><strong>B-BC:</strong> Building Controller - DDC controller with multiple control loops</li>
              <li><strong>B-AAC:</strong> Advanced Application Controller - complex control applications</li>
              <li><strong>B-ASC:</strong> Application Specific Controller - single application (e.g., VAV box)</li>
              <li><strong>B-SS:</strong> Smart Sensor - intelligent sensor with network interface</li>
            </ul>
            <p><strong>Specification tip:</strong> Always request the BACnet PICS (Protocol Implementation Conformance Statement) from vendors. This document details exactly which objects, services, and profiles the device supports, enabling verification of interoperability before procurement.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Modbus - Industrial Communication Standard">
            <p>Modbus is a serial communication protocol originally developed by Modicon in 1979 for programmable logic controllers. Despite its age, it remains extremely popular in building services for integrating meters, chillers, boilers, and industrial equipment due to its simplicity and widespread support.</p>
            <p><strong>Modbus Variants Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Physical layer:</strong> RS-485 / RS-232 — RS-485 / RS-232 — Ethernet (TCP/IP)</li>
              <li><strong>Data encoding:</strong> Binary (compact) — ASCII (human readable) — Binary in TCP frame</li>
              <li><strong>Max devices:</strong> 247 per bus — 247 per bus — Unlimited (IP-based)</li>
              <li><strong>Speed:</strong> Up to 115.2 kbps — Up to 19.2 kbps — 10/100/1000 Mbps</li>
              <li><strong>Cable length:</strong> 1200m (RS-485) — 1200m (RS-485) — 100m per segment</li>
              <li><strong>Error checking:</strong> CRC-16 — LRC — TCP checksum</li>
              <li><strong>Common use:</strong> Field devices, meters — Legacy systems — Modern installations</li>
            </ul>
            <p><strong>Modbus Data Model</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Coils:</strong> 00001-09999 — Read/Write — Digital outputs (on/off commands)</li>
              <li><strong>Discrete Inputs:</strong> 10001-19999 — Read Only — Digital inputs (status)</li>
              <li><strong>Input Registers:</strong> 30001-39999 — Read Only — Analog inputs (sensor values)</li>
              <li><strong>Holding Registers:</strong> 40001-49999 — Read/Write — Setpoints, configuration</li>
            </ul>
            <p><strong>Common Function Codes</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>01 (0x01):</strong> Read Coils - read multiple digital outputs</li>
              <li><strong>02 (0x02):</strong> Read Discrete Inputs - read multiple digital inputs</li>
              <li><strong>03 (0x03):</strong> Read Holding Registers - read setpoints and configuration</li>
              <li><strong>04 (0x04):</strong> Read Input Registers - read sensor values</li>
              <li><strong>05 (0x05):</strong> Write Single Coil - write one digital output</li>
              <li><strong>06 (0x06):</strong> Write Single Register - write one holding register</li>
              <li><strong>16 (0x10):</strong> Write Multiple Registers - write block of registers</li>
            </ul>
            <p><strong>RS-485 Wiring Best Practice</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use shielded twisted pair cable (STP) with shield grounded at one end only</li>
              <li>Daisy-chain topology (not star) - cable from device to device</li>
              <li>Install 120 ohm termination resistors at both ends of the bus</li>
              <li>Keep cable runs under 1200m total; reduce speed for longer distances</li>
              <li>Avoid cable runs parallel to power cables to minimise interference</li>
            </ul>
            <p><strong>Integration tip:</strong> Always obtain the Modbus register map from the equipment manufacturer. This document lists all available registers, their addresses, data types (integer, float, scaled), and engineering units - essential for correct integration.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="LonWorks, KNX and M-Bus Protocols">
            <p>Beyond BACnet and Modbus, several other protocols play important roles in building automation. LonWorks and KNX are complete building control systems with distributed intelligence, whilst M-Bus is specifically designed for utility metering applications.</p>
            <p><strong>LonWorks (Local Operating Network)</strong></p>
            <p>LonWorks is a networking platform specifically designed for building and industrial control applications, developed by Echelon Corporation and now maintained by LonMark International.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Standard:</strong> ISO/IEC 14908 (LonTalk protocol)</li>
              <li><strong>Physical layers:</strong> TP/FT-10 (twisted pair), IP, power line</li>
              <li><strong>TP/FT-10 speed:</strong> 78 kbps</li>
              <li><strong>Max devices per segment:</strong> 64 per subnet (128 with repeaters)</li>
              <li><strong>Architecture:</strong> Peer-to-peer (no master required)</li>
              <li><strong>Intelligence:</strong> Distributed - each device has Neuron chip</li>
              <li><strong>Interoperability:</strong> LonMark certified profiles</li>
            </ul>
            <p><strong>KNX (Konnex)</strong></p>
            <p>KNX is the worldwide standard for home and building control, combining three previous European standards (EIB, EHS, BatiBUS). It is particularly strong in lighting control, blind/shutter control, and HVAC room control applications.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Standard:</strong> ISO/IEC 14543-3 (EN 50090, EN 13321-1)</li>
              <li><strong>Physical layers:</strong> TP (twisted pair), PL (power line), RF (radio), IP</li>
              <li><strong>TP speed:</strong> 9.6 kbps</li>
              <li><strong>Topology:</strong> Line &gt; Area &gt; Backbone (hierarchical)</li>
              <li><strong>Devices per line:</strong> 64 devices maximum</li>
              <li><strong>Lines per area:</strong> 15 lines maximum</li>
              <li><strong>Areas per system:</strong> 15 areas maximum</li>
              <li><strong>Max system size:</strong> 57,375 devices (15 x 15 x 255)</li>
              <li><strong>Bus power:</strong> 29V DC carried on bus cable</li>
            </ul>
            <p><strong>M-Bus (Meter Bus)</strong></p>
            <p>M-Bus is a European standard (EN 13757) specifically designed for remote reading of utility meters. It is commonly used for heat meters, water meters, gas meters, and electricity sub-meters in commercial buildings.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Standard:</strong> EN 13757-2 (physical), EN 13757-3 (application)</li>
              <li><strong>Physical layer:</strong> Two-wire bus (polarity independent)</li>
              <li><strong>Speed:</strong> 300 to 9600 bps</li>
              <li><strong>Max devices:</strong> 250 per segment</li>
              <li><strong>Cable length:</strong> Up to 1000m (baud rate dependent)</li>
              <li><strong>Power:</strong> Bus powered (meters draw from bus)</li>
              <li><strong>Architecture:</strong> Master-slave (master polls slaves)</li>
            </ul>
            <p><strong>When to Use KNX</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lighting control systems</li>
              <li>Blind and shutter automation</li>
              <li>Room-level HVAC control</li>
              <li>Hotel room management</li>
              <li>Residential smart home applications</li>
            </ul>
            <p><strong>When to Use M-Bus</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Tenant sub-metering systems</li>
              <li>Heat and cooling meter networks</li>
              <li>Water consumption monitoring</li>
              <li>Energy management systems</li>
              <li>Billing and cost allocation</li>
            </ul>
            <p><strong>Integration consideration:</strong> Both KNX and M-Bus commonly require gateways to integrate with BACnet or Modbus-based BMS systems. Ensure gateway capacity and points are specified correctly, and budget for gateway configuration during commissioning.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Protocol Gateways and Multi-Vendor Integration">
            <p>Modern buildings typically contain equipment from multiple manufacturers using different communication protocols. Protocol gateways are essential devices that translate between protocols, enabling a unified BMS to monitor and control all building systems regardless of their native communication standards.</p>
            <p><strong>Gateway Types and Applications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Modbus to BACnet:</strong> Modbus RTU/TCP — BACnet/IP — Chillers, boilers, meters to BMS</li>
              <li><strong>M-Bus to BACnet:</strong> M-Bus — BACnet/IP — Heat meters, utility sub-metering</li>
              <li><strong>KNX to BACnet:</strong> KNX TP — BACnet/IP — Lighting control, blinds to BMS</li>
              <li><strong>BACnet router:</strong> BACnet MS/TP — BACnet/IP — Field devices to IP backbone</li>
              <li><strong>LonWorks to BACnet:</strong> LonWorks — BACnet/IP — Legacy LonWorks integration</li>
              <li><strong>DALI to BACnet:</strong> DALI — BACnet/IP — Lighting control integration</li>
            </ul>
            <p><strong>Gateway Selection Criteria</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Point capacity:</strong> Number of data points that can be translated (allow 20% spare)</li>
              <li><strong>Polling speed:</strong> How quickly data can be refreshed (critical for control applications)</li>
              <li><strong>Configuration interface:</strong> Web-based preferred for ease of maintenance</li>
              <li><strong>Diagnostic features:</strong> Communication statistics, error logging, troubleshooting</li>
              <li><strong>Redundancy:</strong> Failover options for critical applications</li>
              <li><strong>Vendor support:</strong> Configuration services, firmware updates, technical support</li>
            </ul>
            <p><strong>Open vs Proprietary Systems</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Vendor choice:</strong> Multiple vendors, competitive tendering — Single vendor, limited competition</li>
              <li><strong>Long-term support:</strong> Alternative suppliers available — Dependent on original vendor</li>
              <li><strong>Lifecycle cost:</strong> Lower through competition — Higher due to vendor lock-in</li>
              <li><strong>Initial integration:</strong> May require more configuration — Often simpler within system</li>
              <li><strong>Feature set:</strong> Standardised, may lag innovation — May offer unique features</li>
              <li><strong>Interoperability:</strong> Designed for multi-vendor — Limited to vendor ecosystem</li>
            </ul>
            <p><strong>Multi-Vendor Integration Best Practice</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Specification:</strong> Mandate open protocols (BACnet, Modbus) in tender documents</li>
              <li><strong>Points list:</strong> Require detailed points lists from all equipment suppliers early</li>
              <li><strong>Integration testing:</strong> Allocate time for point-to-point verification during commissioning</li>
              <li><strong>Single integrator:</strong> Appoint one party responsible for all protocol integration</li>
              <li><strong>Documentation:</strong> Require network diagrams, gateway configurations, and register maps</li>
              <li><strong>Training:</strong> Ensure FM team understands all integrated systems</li>
            </ul>
            <p><strong>Typical Commercial Building Integration Architecture</strong></p>
            <p>BMS Head-End (BACnet/IP) ──┬── BACnet/IP Backbone</p>
            <p>│</p>
            <p>├── AHU Controllers (BACnet/IP native)</p>
            <p>├── VAV Controllers (BACnet MS/TP via router)</p>
            <p>├── Chiller (Modbus TCP via gateway)</p>
            <p>├── Boiler Plant (Modbus RTU via gateway)</p>
            <p>├── Lighting Control (KNX via gateway)</p>
            <p>├── Energy Meters (M-Bus via gateway)</p>
            <p>└── Fire Alarm Panel (Modbus TCP via gateway)</p>
            <p><strong>Project success factor:</strong> Early engagement with all equipment suppliers to obtain points lists and protocol specifications is critical. Integration issues discovered late in a project are expensive and time-consuming to resolve.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Protocol Selection Guide:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BACnet:</strong> Primary choice for new commercial BMS installations</li>
              <li><strong>Modbus:</strong> Industrial equipment, meters, chillers, boilers integration</li>
              <li><strong>KNX:</strong> Lighting control, blinds, room-level automation</li>
              <li><strong>M-Bus:</strong> Utility metering, sub-metering, energy monitoring</li>
              <li><strong>LonWorks:</strong> Legacy systems, specific applications</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BACnet MS/TP: <strong>38,400 or 76,800 bps</strong> over RS-485</li>
              <li>Modbus RTU: <strong>247 addresses</strong> maximum per bus</li>
              <li>RS-485 cable: <strong>1200m</strong> maximum length</li>
              <li>KNX line: <strong>64 devices</strong> maximum</li>
              <li>M-Bus segment: <strong>250 meters</strong> maximum</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Missing points lists</strong> - Obtain early from all equipment suppliers</li>
                <li><strong>Assuming interoperability</strong> - Always verify with PICS/register maps</li>
                <li><strong>Inadequate commissioning time</strong> - Integration testing takes longer than expected</li>
                <li><strong>No gateway spare capacity</strong> - Allow 20% spare points for future changes</li>
                <li><strong>Poor documentation</strong> - Network diagrams and configurations essential for FM</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section5-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Actuators and output devices
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section5-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Control strategies
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section5_4;
