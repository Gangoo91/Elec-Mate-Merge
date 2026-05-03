/**
 * Module 8 · Section 5 · Subsection 1 — BMS Fundamentals
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Understanding building management system architecture, components and integration
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

const TITLE = 'BMS Fundamentals - HNC Module 8 Section 5.1';
const DESCRIPTION =
  'Master Building Management System fundamentals: system architecture, field level, automation level, management level, outstations, controllers, head-end software, network topologies, points schedules and integration with other building systems.';

const quickCheckQuestions = [
  {
    id: 'bms-levels',
    question: 'Which level of a BMS architecture directly interfaces with sensors and actuators?',
    options: ['Management level', 'Automation level', 'Field level', 'Enterprise level'],
    correctIndex: 2,
    explanation:
      'The field level is the lowest tier of the BMS hierarchy and directly interfaces with sensors, actuators, and other field devices. It collects data from the physical environment and executes control commands.',
  },
  {
    id: 'outstation-function',
    question: 'What is the primary function of a BMS outstation?',
    options: [
      'Display graphical user interfaces',
      'Provide local control and data acquisition',
      'Store historical trend data',
      'Generate energy reports',
    ],
    correctIndex: 1,
    explanation:
      'Outstations (also called controllers or field controllers) provide local control and data acquisition. They can operate autonomously even if communication with the head-end is lost, ensuring continuous building control.',
  },
  {
    id: 'network-topology',
    question:
      'Which network topology provides the greatest resilience for critical BMS applications?',
    options: ['Star topology', 'Bus topology', 'Ring topology', 'Daisy chain topology'],
    correctIndex: 2,
    explanation:
      'Ring topology provides redundant communication paths - if one segment fails, data can still reach its destination via the alternative path. This makes it ideal for critical applications where communication must be maintained.',
  },
  {
    id: 'head-end-role',
    question: 'What is the primary role of the BMS head-end system?',
    options: [
      'Direct control of field devices',
      'Physical connection of sensors',
      'Centralised monitoring and supervision',
      'Power distribution to outstations',
    ],
    correctIndex: 2,
    explanation:
      'The head-end provides centralised monitoring, supervision, and management of the entire BMS. It offers graphical interfaces, alarm management, trend logging, scheduling, and reporting capabilities for building operators.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does BMS stand for in building services engineering?',
    options: [
      'Building Mechanical Systems',
      'Building Management System',
      'Basic Monitoring Service',
      'Building Maintenance Schedule',
    ],
    correctAnswer: 1,
    explanation:
      "BMS stands for Building Management System - a computer-based control system that monitors and manages a building's mechanical, electrical, and electromechanical services.",
  },
  {
    id: 2,
    question: 'Which of the following is NOT typically a function of a BMS?',
    options: [
      'HVAC control',
      'Lighting control',
      'Structural load monitoring',
      'Energy management',
    ],
    correctAnswer: 2,
    explanation:
      'Structural load monitoring is typically handled by separate structural health monitoring systems. BMS focuses on building services including HVAC, lighting, access control, fire detection, and energy management.',
  },
  {
    id: 3,
    question: 'At which level of BMS architecture does the operator workstation reside?',
    options: ['Field level', 'Automation level', 'Management level', 'Integration level'],
    correctAnswer: 2,
    explanation:
      'Operator workstations with their graphical user interfaces, alarm displays, and reporting functions reside at the management level - the top tier of the BMS hierarchy.',
  },
  {
    id: 4,
    question: 'What is a points schedule in BMS terminology?',
    options: [
      'A maintenance timetable',
      'A list of all monitored and controlled points',
      'A time-based control sequence',
      'A sensor calibration record',
    ],
    correctAnswer: 1,
    explanation:
      'A points schedule is a comprehensive list documenting all physical and virtual points in the BMS, including point names, descriptions, addresses, engineering units, and alarm parameters.',
  },
  {
    id: 5,
    question: 'Which communication medium typically connects field devices to outstations?',
    options: ['Fibre optic cable', 'Wireless 4G/5G', 'Twisted pair cable', 'Coaxial cable'],
    correctAnswer: 2,
    explanation:
      'Twisted pair cable (often screened/shielded) is the most common medium for connecting field devices to outstations due to its cost-effectiveness, noise immunity, and ease of installation.',
  },
  {
    id: 6,
    question: 'What happens to a BMS outstation if communication with the head-end is lost?',
    options: [
      'All connected equipment shuts down immediately',
      'The outstation continues operating using its local program',
      'Manual control is required at each device',
      'Emergency alarms are triggered automatically',
    ],
    correctAnswer: 1,
    explanation:
      'Outstations are designed to operate autonomously. They contain their own programs and can maintain local control even when communication with the head-end is lost, ensuring building services continue to operate.',
  },
  {
    id: 7,
    question:
      'What type of point represents a temperature setpoint that can be changed by the operator?',
    options: [
      'Analogue input (AI)',
      'Analogue output (AO)',
      'Analogue value (AV)',
      'Digital output (DO)',
    ],
    correctAnswer: 2,
    explanation:
      'An Analogue Value (AV) is a software point that stores adjustable values such as setpoints, timers, or calculated values. It can be modified by operators or the control program.',
  },
  {
    id: 8,
    question: 'Which topology uses a central switch or hub to connect all devices?',
    options: ['Bus topology', 'Star topology', 'Ring topology', 'Mesh topology'],
    correctAnswer: 1,
    explanation:
      'Star topology connects all devices to a central switch or hub. While easy to install and troubleshoot, it creates a single point of failure at the central device.',
  },
  {
    id: 9,
    question: 'Integration with fire alarm systems typically requires what type of interface?',
    options: [
      'Volt-free contacts only',
      'Analogue 4-20mA signals',
      'Gateway or protocol converter',
      'Direct sensor wiring',
    ],
    correctAnswer: 2,
    explanation:
      'Fire alarm systems are typically separate certified systems. Integration usually requires a gateway or protocol converter that can communicate with both the BMS and fire alarm panel protocols.',
  },
  {
    id: 10,
    question: 'What is the purpose of trending in a BMS?',
    options: [
      'To predict future equipment failures',
      'To record historical data for analysis',
      'To display real-time graphics',
      'To generate control commands',
    ],
    correctAnswer: 1,
    explanation:
      'Trending records historical data (temperatures, pressures, status changes) over time. This data is essential for performance analysis, fault diagnosis, energy management, and compliance verification.',
  },
  {
    id: 11,
    question: 'Which building system is commonly integrated with BMS for demand response?',
    options: [
      'Structural monitoring',
      'Electrical metering and distribution',
      'Wastewater treatment',
      'Window cleaning systems',
    ],
    correctAnswer: 1,
    explanation:
      'Electrical metering and distribution systems are commonly integrated to enable demand response - automatically reducing electrical load during peak periods or when grid stress is high.',
  },
  {
    id: 12,
    question: 'What advantage does IP-based BMS communication offer over traditional protocols?',
    options: [
      'Lower installation costs',
      'Better noise immunity',
      'Remote access and integration capabilities',
      'Faster response times',
    ],
    correctAnswer: 2,
    explanation:
      'IP-based BMS communication enables remote access via standard networks and easier integration with IT systems, enterprise applications, and cloud services. This supports modern smart building requirements.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a BMS and BEMS?',
    answer:
      'A Building Management System (BMS) controls and monitors building services like HVAC, lighting, and access control. A Building Energy Management System (BEMS) specifically focuses on energy monitoring, analysis, and optimisation. In practice, modern systems often combine both functions, with BEMS being an integral part of the BMS software capabilities.',
  },
  {
    question: 'How do outstations communicate with the head-end?',
    answer:
      'Outstations typically communicate via a building-wide network using protocols such as BACnet, Modbus, or LonWorks. The physical medium can be twisted pair cable, Ethernet, fibre optic, or even wireless. Data is exchanged continuously or on change-of-value, with the head-end polling outstations or receiving unsolicited reports.',
  },
  {
    question: 'What happens during a BMS network failure?',
    answer:
      'During network failure, outstations continue operating autonomously using their local programs. They maintain control of connected equipment based on the last known parameters and schedules. Alarms and data are stored locally until communication is restored, then uploaded to the head-end. Critical systems should have redundant communication paths.',
  },
  {
    question: 'Why is proper points scheduling important during BMS installation?',
    answer:
      'A comprehensive points schedule documents every monitored and controlled point, ensuring nothing is missed during commissioning. It provides a reference for maintenance, troubleshooting, and future modifications. It also helps with software development, operator training, and system handover. Poor points documentation leads to system inefficiency and difficult fault-finding.',
  },
  {
    question: 'How does BMS integration benefit building operations?',
    answer:
      'Integration allows systems to share information and work together intelligently. For example, access control can inform HVAC when zones are unoccupied, fire systems can override ventilation during emergencies, and lighting can respond to daylight levels. This coordination improves energy efficiency, occupant comfort, safety, and operational efficiency.',
  },
  {
    question: 'What qualifications are needed to work on BMS systems?',
    answer:
      'BMS work typically requires competence in both electrical installation (often an electrical qualification) and IT/networking. Manufacturer-specific training is usually needed for programming and commissioning. In the UK, relevant qualifications include Level 3 Electrotechnical, plus specific BMS certifications from manufacturers like Trend, Siemens, Honeywell, or Schneider Electric.',
  },
];

const HNCModule8Section5_1 = () => {
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
            eyebrow="Module 8 · Section 5 · Subsection 1"
            title="BMS Fundamentals"
            description="Understanding building management system architecture, components and integration"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Describe the three-tier architecture of modern BMS",
              "Explain the role and function of BMS outstations",
              "Describe head-end software functions and capabilities",
              "Identify common network topologies for BMS",
              "Understand points schedules and point types",
              "Explain integration with other building systems",
              "Describe the benefits of integrated building management",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="BMS Architecture Overview">
            <p>A Building Management System (BMS) is a computer-based control system that monitors and manages a building's mechanical, electrical, and electromechanical services. Modern BMS architecture follows a hierarchical three-tier model that provides flexibility, resilience, and scalability.</p>
            <p><strong>Three-Tier BMS Architecture</strong></p>
            <p>Management Level (Top Tier)</p>
            <p>Head-end servers, operator workstations, enterprise integration</p>
            <p>Automation Level (Middle Tier)</p>
            <p>Outstations, controllers, local area networks</p>
            <p>Field Level (Bottom Tier)</p>
            <p>Sensors, actuators, meters, field devices</p>
            <p><strong>Key architecture principles:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Distributed intelligence:</strong> Control logic resides at the automation level, not centrally</li>
              <li><strong>Autonomous operation:</strong> Outstations continue working if network fails</li>
              <li><strong>Scalability:</strong> Easy to add new devices, zones, or buildings</li>
              <li><strong>Standardisation:</strong> Open protocols enable multi-vendor systems</li>
            </ul>
            <p><strong>BMS vs Traditional Controls</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Control location:</strong> Local at each plant — Distributed with central monitoring</li>
              <li><strong>Visibility:</strong> Manual inspection required — Real-time graphics and alarms</li>
              <li><strong>Data logging:</strong> Manual or none — Automatic trending</li>
              <li><strong>Scheduling:</strong> Time clocks at each location — Centralised, flexible schedules</li>
              <li><strong>Integration:</strong> Standalone systems — Coordinated multi-system operation</li>
            </ul>
            <p><strong>Industry trend:</strong> Modern BMS increasingly uses IP-based networks and cloud connectivity, enabling remote monitoring and integration with smart building platforms.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Field Level: Sensors, Actuators and Points">
            <p>The field level comprises all the physical devices that interface with the building environment. These devices are connected to outstations and provide the inputs and outputs necessary for monitoring and control.</p>
            <p><strong>Point Types in BMS</strong></p>
            <p><strong>Hardware Points (Physical)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>AI</strong> - Analogue Input (temperature, pressure)</li>
              <li><strong>AO</strong> - Analogue Output (valve position)</li>
              <li><strong>DI</strong> - Digital Input (switch status)</li>
              <li><strong>DO</strong> - Digital Output (pump on/off)</li>
            </ul>
            <p><strong>Software Points (Virtual)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>AV</strong> - Analogue Value (setpoints, timers)</li>
              <li><strong>BV</strong> - Binary Value (enable flags)</li>
              <li><strong>MV</strong> - Multistate Value (mode selection)</li>
              <li><strong>Calculated</strong> - Derived from other points</li>
            </ul>
            <p><strong>Common field devices:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Temperature sensors:</strong> Room, duct, pipe, outside air (PT100, NTC, thermocouples)</li>
              <li><strong>Humidity sensors:</strong> Capacitive or resistive elements for %RH measurement</li>
              <li><strong>Pressure sensors:</strong> Duct static, differential, water pressure</li>
              <li><strong>CO2 sensors:</strong> For demand-controlled ventilation</li>
              <li><strong>Valve actuators:</strong> Modulating or on/off control of water flow</li>
              <li><strong>Damper actuators:</strong> Air flow control in ductwork</li>
              <li><strong>Variable speed drives:</strong> Fan and pump speed control</li>
              <li><strong>Meters:</strong> Electricity, gas, water, heat consumption</li>
            </ul>
            <p><strong>Signal Types and Ranges</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>4-20mA:</strong> 4mA = 0%, 20mA = 100% — Transmitters, actuators</li>
              <li><strong>0-10V DC:</strong> 0V = 0%, 10V = 100% — Actuators, VSDs, dimmers</li>
              <li><strong>Resistance:</strong> PT100, PT1000, NTC — Temperature sensors</li>
              <li><strong>Volt-free contact:</strong> Open/Closed — Status, alarms, interlocks</li>
              <li><strong>Pulse:</strong> Count per unit — Meters (kWh, m³)</li>
            </ul>
            <p><strong>Points Schedule Example</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>AHU1_SAT:</strong> AI — Supply air temp — °C — HI: 35, LO: 5</li>
              <li><strong>AHU1_SF_CMD:</strong> DO — Supply fan command — On/Off — -</li>
              <li><strong>AHU1_HCV:</strong> AO — Heating valve — % — -</li>
              <li><strong>AHU1_SAT_SP:</strong> AV — Supply air setpoint — °C — -</li>
            </ul>
            <p><strong>Best practice:</strong> Use consistent naming conventions for points. A typical format is: System_Equipment_Point (e.g., HVAC_AHU01_SupplyTemp).</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Outstations and Controllers">
            <p>Outstations (also called controllers, field controllers, or DDC controllers) form the automation level of the BMS. They provide local intelligence, execute control programs, and communicate with both field devices and the management level.</p>
            <p><strong>Outstation Functions</strong></p>
            <p><strong>Primary Functions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Execute control programs (PID, sequences)</li>
              <li>Process sensor inputs and generate outputs</li>
              <li>Implement time schedules locally</li>
              <li>Generate and store alarms</li>
              <li>Log trend data</li>
            </ul>
            <p><strong>Communication Functions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Report to head-end system</li>
              <li>Peer-to-peer with other outstations</li>
              <li>Interface with field bus devices</li>
              <li>Accept operator commands</li>
              <li>Upload/download programs</li>
            </ul>
            <p><strong>Outstation types:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Unitary controllers:</strong> Fixed I/O for specific applications (FCU, VAV)</li>
              <li><strong>Programmable controllers:</strong> Flexible I/O, custom programming</li>
              <li><strong>Expansion modules:</strong> Add I/O capacity to existing controllers</li>
              <li><strong>Network controllers:</strong> Manage communication between networks</li>
              <li><strong>Plant controllers:</strong> High I/O count for central plant</li>
            </ul>
            <p><strong>Controller Specifications to Consider</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>I/O capacity:</strong> 8-64 points base, expandable — Allow 20% spare capacity</li>
              <li><strong>Input types:</strong> Universal or dedicated — Universal offers flexibility</li>
              <li><strong>Program memory:</strong> 256KB - 4MB — Complex sequences need more</li>
              <li><strong>Trend storage:</strong> 10,000 - 500,000 samples — Battery-backed or flash</li>
              <li><strong>Network ports:</strong> RS-485, Ethernet, wireless — Match system architecture</li>
            </ul>
            <p><strong>Autonomous Operation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Control continues if head-end fails</li>
              <li>Local schedules maintained</li>
              <li>Alarms stored for later upload</li>
              <li>Battery backup preserves program</li>
            </ul>
            <p><strong>Installation Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Suitable enclosure (IP rating)</li>
              <li>Clean 24V AC/DC power supply</li>
              <li>Cable termination space</li>
              <li>Environmental conditions met</li>
            </ul>
            <p><strong>Design tip:</strong> Locate outstations close to the plant they control to minimise cable runs and improve response times.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Head-End Systems and Network Topology">
            <p>The head-end system provides the management level interface between operators and the BMS. It offers centralised monitoring, supervision, and data management capabilities. The network topology determines how all system components communicate.</p>
            <p><strong>Head-End Software Functions</strong></p>
            <p><strong>Visualisation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Dynamic graphics</li>
              <li>Floor plans</li>
              <li>Schematic diagrams</li>
              <li>Dashboard displays</li>
            </ul>
            <p><strong>Data Management</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Historical trending</li>
              <li>Alarm logging</li>
              <li>Report generation</li>
              <li>Data archiving</li>
            </ul>
            <p><strong>Supervision</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Global scheduling</li>
              <li>Alarm management</li>
              <li>User access control</li>
              <li>System configuration</li>
            </ul>
            <p><strong>Head-end system components:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Server:</strong> Database, communications, application services</li>
              <li><strong>Workstations:</strong> Operator interface, graphics, alarm display</li>
              <li><strong>Web server:</strong> Browser-based remote access</li>
              <li><strong>Historian:</strong> Long-term data storage and retrieval</li>
              <li><strong>Report server:</strong> Scheduled and ad-hoc report generation</li>
              <li><strong>Integration server:</strong> Links to other enterprise systems</li>
            </ul>
            <p><strong>Network Topologies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Bus:</strong> Single cable, devices tap in — Simple, low cable cost — Single point failure affects all</li>
              <li><strong>Star:</strong> Central hub/switch — Easy troubleshooting — Hub failure stops network</li>
              <li><strong>Ring:</strong> Circular connection — Redundant path — More complex installation</li>
              <li><strong>Mesh:</strong> Multiple interconnections — Highest resilience — Most expensive</li>
              <li><strong>Tree/Hierarchical:</strong> Multiple levels of stars — Scalable, organised — Backbone critical</li>
            </ul>
            <p><strong>Typical BMS Network Architecture</strong></p>
            <p><strong>Level 3 (Enterprise):</strong> Corporate LAN, IT integration, cloud services</p>
            <p>↓ Firewall / Gateway</p>
            <p><strong>Level 2 (Supervision):</strong> Head-end server, workstations - Ethernet TCP/IP</p>
            <p>↓ Router / Gateway</p>
            <p><strong>Level 1 (Automation):</strong> Outstations - BACnet/IP, BACnet MS/TP, LonWorks</p>
            <p>↓ Controller I/O</p>
            <p><strong>Level 0 (Field):</strong> Sensors, actuators - Hardwired, Modbus, M-Bus</p>
            <p><strong>Wired Media Options</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Twisted pair:</strong> RS-485, field level, low cost</li>
              <li><strong>Ethernet:</strong> Cat5e/Cat6, automation level up</li>
              <li><strong>Fibre optic:</strong> Long distances, EMI immunity</li>
              <li><strong>Powerline:</strong> Uses existing electrical wiring</li>
            </ul>
            <p><strong>Wireless Options</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Wi-Fi:</strong> Standard IT infrastructure</li>
              <li><strong>ZigBee:</strong> Low power mesh networks</li>
              <li><strong>EnOcean:</strong> Energy harvesting sensors</li>
              <li><strong>LoRaWAN:</strong> Long range, low power</li>
            </ul>
            <p><strong>Security note:</strong> BMS networks should be segregated from general IT networks using firewalls and VLANs to prevent cyber security risks.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Integration with Other Building Systems">
            <p>A key benefit of modern BMS is the ability to integrate with other building systems. This enables coordinated operation, improved efficiency, and a single point of monitoring for building operators.</p>
            <p><strong>Systems Commonly Integrated with BMS</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fire alarm:</strong> HVAC shutdown, smoke control, status display — Volt-free contacts, protocol gateway</li>
              <li><strong>Access control:</strong> Occupancy-based HVAC, lighting control — BACnet, OPC, API</li>
              <li><strong>Lighting control:</strong> Coordinated scenes, daylight harvesting — DALI gateway, KNX, BACnet</li>
              <li><strong>Electrical metering:</strong> Energy monitoring, demand response — Modbus, BACnet, M-Bus</li>
              <li><strong>Lifts:</strong> Status monitoring, fault alarms — Volt-free contacts, serial</li>
              <li><strong>Security/CCTV:</strong> Event correlation, lighting response — IP integration, contacts</li>
              <li><strong>Solar PV:</strong> Generation monitoring, load shifting — Modbus, SunSpec</li>
            </ul>
            <p><strong>Integration Example: Fire Alarm Interface</strong></p>
            <p><strong>Fire alarm panel</strong> &gt; <strong>Volt-free contacts</strong> &gt;  <strong>BMS controller DI</strong></p>
            <p>When fire alarm activates:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BMS receives fire alarm signal on digital input</li>
              <li>AHU fans commanded to smoke control mode or shutdown</li>
              <li>Fire dampers confirmed closed via end-switch feedback</li>
              <li>Stairwell pressurisation activated</li>
              <li>Lifts recalled to ground floor (separate system)</li>
            </ul>
            <p><strong>Integration Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Hardwired:</strong> Volt-free contacts, simple and reliable</li>
              <li><strong>Serial:</strong> RS-232/485, Modbus RTU</li>
              <li><strong>Network:</strong> BACnet/IP, Modbus TCP, LonWorks</li>
              <li><strong>Gateway:</strong> Protocol conversion between systems</li>
              <li><strong>API:</strong> Web services, REST, JSON</li>
            </ul>
            <p><strong>Integration Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Define clear scope and responsibilities</li>
              <li>Agree data exchange requirements</li>
              <li>Consider cyber security implications</li>
              <li>Document interface specifications</li>
              <li>Plan integration testing</li>
            </ul>
            <p><strong>Benefits of integrated building management:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Energy efficiency:</strong> Systems respond to actual occupancy and conditions</li>
              <li><strong>Improved comfort:</strong> Coordinated control of temperature, lighting, blinds</li>
              <li><strong>Enhanced safety:</strong> Automatic response to fire and security events</li>
              <li><strong>Reduced maintenance:</strong> Single system to monitor and maintain</li>
              <li><strong>Better reporting:</strong> Consolidated data for analysis and compliance</li>
            </ul>
            <p><strong>Important:</strong> Life safety systems (fire, smoke control) must maintain their independent certification and should not rely solely on BMS for critical functions.</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Outstation Sizing</strong>
            </p>
            <p><strong>Question:</strong> An AHU requires control of: 1 supply fan, 1 extract fan, heating valve, cooling valve, mixing dampers (3 actuators), plus monitoring of supply/extract temperatures, filter differential pressure, and supply air humidity. How many I/O points are needed?</p>
            <p>Counting I/O points:</p>
            <p><strong>Digital Outputs (DO):</strong></p>
            <p>- Supply fan start/stop: 1</p>
            <p>- Extract fan start/stop: 1</p>
            <p>Total DO: <strong>2</strong></p>
            <p><strong>Analogue Outputs (AO):</strong></p>
            <p>- Heating valve 0-10V: 1</p>
            <p>- Cooling valve 0-10V: 1</p>
            <p>- Damper actuators 0-10V: 3</p>
            <p>Total AO: <strong>5</strong></p>
            <p><strong>Analogue Inputs (AI):</strong></p>
            <p>- Supply air temp: 1</p>
            <p>- Extract air temp: 1</p>
            <p>- Filter DP: 1</p>
            <p>- Supply humidity: 1</p>
            <p>Total AI: <strong>4</strong></p>
            <p>Minimum: 2 DO + 5 AO + 4 AI = 11 points</p>
            <p>With 20% spare: Select controller with at least 14 points</p>
            <p>
              <strong>Example 2: Network Design</strong>
            </p>
            <p><strong>Question:</strong> A three-storey office building has 4 AHUs, 40 FCUs, and central boiler/chiller plant. Design an appropriate BMS network topology.</p>
            <p>Recommended architecture:</p>
            <p><strong>Management Level:</strong></p>
            <p>- Head-end server with redundancy</p>
            <p>- 2x operator workstations</p>
            <p>- Ethernet backbone (gigabit)</p>
            <p><strong>Automation Level:</strong></p>
            <p>- Plant controller for boiler/chiller (high I/O)</p>
            <p>- 4x AHU controllers (medium I/O)</p>
            <p>- 4-5x FCU controllers per floor (40 FCUs = ~10 per controller)</p>
            <p>- BACnet/IP on Ethernet to head-end</p>
            <p>- BACnet MS/TP trunk per floor for FCU controllers</p>
            <p><strong>Field Level:</strong></p>
            <p>- Direct wiring to controller I/O</p>
            <p>- Energy meters on M-Bus or Modbus</p>
            <p>Topology: Tree/hierarchical with star switches per floor</p>
            <p>
              <strong>Example 3: Points Schedule Entry</strong>
            </p>
            <p><strong>Question:</strong> Create a points schedule entry for monitoring boiler flow temperature with high and low alarms.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Point Name::</strong> BLR1_FLOW_TEMP</li>
              <li><strong>Point Type::</strong> AI (Analogue Input)</li>
              <li><strong>Description::</strong> Boiler 1 Flow Temperature</li>
              <li><strong>Controller::</strong> CTRL-PLANTROOM-01</li>
              <li><strong>Address::</strong> AI-04</li>
              <li><strong>Sensor Type::</strong> PT1000</li>
              <li><strong>Range::</strong> 0-100°C</li>
              <li><strong>Engineering Units::</strong> °C</li>
              <li><strong>High Alarm::</strong> 85°C (Priority 2)</li>
              <li><strong>High-High Alarm::</strong> 90°C (Priority 1)</li>
              <li><strong>Low Alarm::</strong> 40°C (Priority 3)</li>
              <li><strong>Trend Interval::</strong> 5 minutes</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Key BMS Terminology:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>DDC:</strong> Direct Digital Control - computer-based control replacing pneumatic/electric</li>
              <li><strong>Outstation:</strong> Local controller with autonomous operation capability</li>
              <li><strong>Head-end:</strong> Central server and operator workstations</li>
              <li><strong>Point:</strong> Single monitored or controlled value (hardware or software)</li>
              <li><strong>Trending:</strong> Recording historical data for analysis</li>
              <li><strong>Graphics:</strong> Visual representation of building systems</li>
            </ul>
            <p>
              <strong>BMS Selection Criteria:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Open protocols:</strong> BACnet, Modbus for multi-vendor flexibility</li>
              <li><strong>Scalability:</strong> Easy to expand for future requirements</li>
              <li><strong>Local support:</strong> Manufacturer/integrator presence in region</li>
              <li><strong>Cybersecurity:</strong> Built-in security features, regular updates</li>
              <li><strong>User interface:</strong> Intuitive graphics, mobile access</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Inadequate I/O:</strong> Not allowing spare capacity for changes</li>
                <li><strong>Poor documentation:</strong> Incomplete points schedules cause commissioning delays</li>
                <li><strong>Network security:</strong> Connecting BMS directly to corporate networks</li>
                <li><strong>Single vendor lock-in:</strong> Proprietary protocols limiting future options</li>
                <li><strong>Insufficient testing:</strong> Not testing all alarm and integration scenarios</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                BMS integration
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section5-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Sensors and measurement
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section5_1;
