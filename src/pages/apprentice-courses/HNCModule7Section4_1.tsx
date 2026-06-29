/**
 * Module 7 · Section 4 · Subsection 1 — DALI Systems
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Digital Addressable Lighting Interface: protocol fundamentals, addressing, grouping, gateways, and system architecture
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

const TITLE = 'DALI Systems - HNC Module 7 Section 4.1';
const DESCRIPTION =
  'Master Digital Addressable Lighting Interface (DALI) systems: protocol fundamentals, addressing, grouping, scenes, gateways, DALI-2 features, system architecture, wiring requirements, and commissioning for building services projects.';

const quickCheckQuestions = [
  {
    id: 'dali-definition',
    question: 'What does DALI stand for and what is its primary purpose?',
    options: [
      'Digital Analogue Lighting Interface - converts signals',
      'Digital Addressable Lighting Interface - individual luminaire control',
      'Direct Access Lighting Integration - network lighting',
      'Digital Automated Lighting Installation - automated dimming',
    ],
    correctIndex: 1,
    explanation:
      'DALI stands for Digital Addressable Lighting Interface. It is an international standard (IEC 62386) protocol that enables individual addressable control of luminaires and control gear in lighting systems.',
  },
  {
    id: 'dali-addresses',
    question: 'How many individual addresses can be assigned on a single DALI bus?',
    options: [
      '32 addresses',
      '64 addresses',
      '48 addresses',
      '128 addresses',
    ],
    correctIndex: 1,
    explanation:
      'A single DALI bus supports up to 64 individually addressable devices (addresses 0-63). This allows independent control of up to 64 luminaires or control gear units on one bus segment.',
  },
  {
    id: 'dali-groups',
    question: 'How many groups can luminaires be assigned to on a DALI system?',
    options: [
      '64 groups',
      '8 groups',
      '32 groups',
      '16 groups',
    ],
    correctIndex: 3,
    explanation:
      'DALI supports 16 groups (numbered 0-15). Each luminaire can belong to multiple groups simultaneously, allowing flexible control scenarios such as zone control, task lighting, and daylight-linked groups.',
  },
  {
    id: 'dali-voltage',
    question: 'What is the nominal voltage level on a DALI bus?',
    options: [
      '24V DC (12V-30V range)',
      '12V DC (5V-18V range)',
      '16V DC (9.5V-22.5V range)',
      '48V DC (36V-57V range)',
    ],
    correctIndex: 2,
    explanation:
      'The DALI bus operates at a nominal 16V DC with an acceptable range of 9.5V to 22.5V. This voltage is supplied by the DALI power supply unit (PSU) which also provides the bus communication power.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which international standard defines the DALI protocol?',
    options: [
      'IEC 61000',
      'IEC 62386',
      'IEC 60364',
      'IEC 61439',
    ],
    correctAnswer: 1,
    explanation:
      'IEC 62386 is the international standard that defines the DALI protocol. It covers control gear, control devices, and application controllers, ensuring interoperability between manufacturers.',
  },
  {
    id: 2,
    question: 'What is the maximum cable length for a DALI bus?',
    options: [
      '500 metres',
      '100 metres',
      '300 metres',
      '200 metres',
    ],
    correctAnswer: 2,
    explanation:
      'The maximum DALI bus length is 300 metres. This limit ensures reliable communication and accounts for voltage drop. For longer distances, DALI bridges or routers must be used.',
  },
  {
    id: 3,
    question: 'How many scenes can be stored in each DALI control gear device?',
    options: [
      '8 scenes',
      '4 scenes',
      '32 scenes',
      '16 scenes',
    ],
    correctAnswer: 3,
    explanation:
      'Each DALI control gear can store 16 scenes (numbered 0-15). Scenes store predefined lighting levels that can be recalled instantly, enabling rapid switching between lighting configurations.',
  },
  {
    id: 4,
    question: 'What is the maximum current allowed on a DALI bus?',
    options: [
      '250mA',
      '100mA',
      '500mA',
      '1A',
    ],
    correctAnswer: 0,
    explanation:
      'The maximum current on a DALI bus is 250mA. This current is shared between all devices on the bus. Typical DALI drivers draw 2mA standby current, allowing approximately 64 devices per bus.',
  },
  {
    id: 5,
    question: 'In DALI-2, what is the purpose of device type 8 (DT8)?',
    options: [
      'Emergency lighting battery monitoring',
      'Colour temperature and RGB control',
      'Single-channel switched (non-dimmable) output',
      'Mains-frequency phase-cut dimming control',
    ],
    correctAnswer: 1,
    explanation:
      'Device Type 8 (DT8) in DALI-2 enables colour control including tuneable white (colour temperature adjustment) and full RGB/RGBW colour mixing, supporting circadian lighting and colour-changing applications.',
  },
  {
    id: 6,
    question: 'What is the function of a DALI gateway?',
    options: [
      'To supply the 16V DC bus power to all control gear',
      'To assign short addresses to each driver during commissioning',
      'To interface DALI with other protocols like BACnet, KNX, or Modbus',
      'To boost the bus voltage so cable runs can exceed 300 metres',
    ],
    correctAnswer: 2,
    explanation:
      'A DALI gateway provides protocol translation between DALI and building management systems using protocols such as BACnet, KNX, Modbus, or Ethernet. This enables integration with wider building automation.',
  },
  {
    id: 7,
    question: 'What cable type is typically used for DALI wiring?',
    options: [
      'Coaxial cable with a characteristic impedance of 75 ohms',
      'Screened twisted-pair data cable terminated at both ends',
      'Fibre-optic cable to provide complete electrical isolation',
      'Standard 1.5mm² mains cable or dedicated 5-core DALI cable',
    ],
    correctAnswer: 3,
    explanation:
      'DALI can use standard mains-rated cable (1.5mm²) as it operates at SELV voltages. Dedicated 5-core cable provides L, N, E plus two DALI control cores. Polarity of DALI cores is not critical.',
  },
  {
    id: 8,
    question: 'What is the data transmission rate of DALI?',
    options: [
      '1,200 bits/second',
      '9,600 bits/second',
      '100 bits/second',
      '115,200 bits/second',
    ],
    correctAnswer: 0,
    explanation:
      'DALI operates at 1,200 bits/second. While this is slow compared to other protocols, it is sufficient for lighting control and provides excellent noise immunity and reliability.',
  },
  {
    id: 9,
    question: 'What advantage does DALI-2 offer over DALI-1?',
    options: [
      'A higher bus voltage allowing longer cable runs',
      'Standardised control devices (sensors, switches) and push button input',
      'Support for up to 128 addresses on a single bus',
      'A faster data rate of 9,600 bits per second',
    ],
    correctAnswer: 1,
    explanation:
      'DALI-2 standardises control devices (input devices) such as sensors and switches, plus introduces push button input device types. DALI-1 only standardised control gear (drivers/ballasts).',
  },
  {
    id: 10,
    question: 'During commissioning, what is the purpose of DALI addressing?',
    options: [
      'To set the physical location of luminaires',
      'To set emergency lighting duration',
      'To assign unique short addresses (0-63) to each control gear',
      'To configure the mains supply connection',
    ],
    correctAnswer: 2,
    explanation:
      'DALI addressing assigns unique short addresses (0-63) to each control gear device on the bus. This enables individual control and monitoring of each luminaire in the system.',
  },
  {
    id: 11,
    question: 'What is broadcast mode in DALI?',
    options: [
      'A fault condition where all lights turn on',
      'A method of addressing more than 64 devices',
      'A wireless extension of the DALI protocol',
      'Sending commands to all devices on the bus simultaneously',
    ],
    correctAnswer: 3,
    explanation:
      'Broadcast mode sends commands to all devices on the DALI bus simultaneously without addressing individual units. It is useful for all-on, all-off, or system-wide dimming commands.',
  },
  {
    id: 12,
    question: 'What is the purpose of fade time in DALI?',
    options: [
      'To set the time for luminaires to transition between light levels',
      'To set how long a scene is held before reverting to default',
      'To delay a luminaire switching on after a command is sent',
      'To limit the maximum brightness a luminaire can reach',
    ],
    correctAnswer: 0,
    explanation:
      'Fade time sets the duration for luminaires to smoothly transition between light levels. DALI supports fade times from 0 (instant) to 90.5 seconds, enabling smooth dimming effects and comfortable visual transitions.',
  },
];

const faqs = [
  {
    question: 'Can DALI control be wired in the same cable as mains supply?',
    answer:
      'Yes, DALI operates at SELV (Separated Extra Low Voltage) levels and the protocol specifies that DALI control wires can be run in the same cable or conduit as mains supply conductors. This significantly reduces installation costs compared to separate control cabling. Typical installations use 5-core cable (L, N, E, DALI+, DALI-) or standard 1.5mm² twin and earth for the DALI bus run separately.',
  },
  {
    question: 'What happens if a DALI driver fails?',
    answer:
      'DALI systems are designed for resilience. If a driver fails, only that luminaire is affected - other devices continue operating normally. The controller can detect the failure through query commands and report it for maintenance. Failed drivers typically default to either full on or off depending on manufacturer settings. DALI-2 enhances fault reporting with more detailed diagnostic information.',
  },
  {
    question: 'How do I expand beyond 64 addresses?',
    answer:
      'For systems requiring more than 64 devices, multiple DALI buses can be used. A multi-channel DALI controller or application controller can manage multiple buses (commonly 4, 8, or 16 buses). DALI routers can also link buses while maintaining isolation. Each bus operates independently with its own 64 addresses, groups, and scenes.',
  },
  {
    question: 'What is the difference between a DALI PSU and a DALI driver?',
    answer:
      'A DALI PSU (Power Supply Unit) provides the 16V DC bus power for communication and is required once per bus. A DALI driver (control gear) is the device within each luminaire that receives commands and controls the LED or lamp output. The PSU powers the communication bus; drivers power and dim the lamps. Some controllers include integrated PSU functionality.',
  },
  {
    question: 'Can existing luminaires be retrofitted with DALI?',
    answer:
      'Yes, many luminaires can be retrofitted by replacing the existing driver with a DALI-compatible driver. LED luminaires are particularly suited to retrofit. However, factors to consider include driver compatibility, physical space for the new driver, and whether existing wiring can accommodate DALI control cores. For fluorescent fittings, DALI ballasts can replace standard HF ballasts.',
  },
  {
    question: 'How do DALI sensors integrate with the system?',
    answer:
      'DALI-2 standardised input devices including presence detectors and light sensors. These devices connect to the DALI bus and can directly control luminaires through application controller programming, or report data to a central controller. Sensors typically use instance addressing (multiple instances per physical device) to handle different functions like presence, light level, and hold time.',
  },
];

const HNCModule7Section4_1 = () => {
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
            eyebrow="Module 7 · Section 4 · Subsection 1"
            title="DALI Systems"
            description="Digital Addressable Lighting Interface: protocol fundamentals, addressing, grouping, gateways, and system architecture"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Explain DALI protocol fundamentals and IEC 62386 standard",
              "Apply addressing schemes for individual and group control",
              "Configure scenes and fade times for lighting applications",
              "Design DALI system architecture including gateways and buses",
              "Specify wiring requirements and installation best practices",
              "Commission DALI systems including addressing and programming",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="DALI Protocol Fundamentals">
            <p>DALI (Digital Addressable Lighting Interface) is the international standard protocol for digital lighting control, defined by IEC 62386. It provides a robust, two-wire digital interface enabling individual addressable control of luminaires with features including dimming, switching, status monitoring, and scene control.</p>
            <p><strong>Key DALI characteristics:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Two-wire digital bus:</strong> Simple wiring, polarity independent</li>
              <li><strong>SELV operation:</strong> Safe extra low voltage (16V DC nominal)</li>
              <li><strong>Bidirectional:</strong> Commands sent, status returned</li>
              <li><strong>Multi-master:</strong> Multiple controllers can share bus</li>
            </ul>
            <p><strong>DALI Protocol Specifications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Standard:</strong> IEC 62386 — Multi-part international standard</li>
              <li><strong>Bus voltage:</strong> 16V DC (9.5V-22.5V) — SELV, supplied by bus PSU</li>
              <li><strong>Data rate:</strong> 1,200 bits/second — Manchester encoded</li>
              <li><strong>Maximum current:</strong> 250mA — Total bus current limit</li>
              <li><strong>Maximum length:</strong> 300m — Single bus segment</li>
              <li><strong>Dimming range:</strong> 0.1% to 100% — Logarithmic curve (254 steps)</li>
            </ul>
            <p><strong>DALI vs Analogue Dimming (1-10V)</strong></p>
            <p><strong>DALI advantages:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Individual addressable control (not just circuits)</li>
              <li>Bidirectional - can query lamp status, faults, runtime</li>
              <li>No separate dimming circuit per luminaire</li>
              <li>Scene storage in each driver - instant recall</li>
              <li>Polarity independent - easier installation</li>
            </ul>
            <p><strong>Design principle:</strong> DALI provides granular control at the luminaire level whilst maintaining simple two-wire installation comparable to traditional switching.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Addressing, Groups and Scenes">
            <p>DALI's power lies in its addressing structure. Each bus supports 64 individual addresses, 16 groups for collective control, and 16 scenes for preset configurations. This enables flexible, efficient lighting control without complex wiring changes.</p>
            <p><strong>Individual Addressing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>64 short addresses (0-63)</li>
              <li>Unique ID per control gear</li>
              <li>Individual dimming control</li>
              <li>Status query per luminaire</li>
            </ul>
            <p><strong>Group Control</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>16 groups (0-15)</li>
              <li>Luminaires can join multiple groups</li>
              <li>Single command controls group</li>
              <li>Ideal for zone/area control</li>
            </ul>
            <p><strong>Scene Control</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>16 scenes (0-15)</li>
              <li>Stored in each driver</li>
              <li>Instant recall - one command</li>
              <li>Different level per luminaire</li>
            </ul>
            <p><strong>Addressing Modes Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Individual:</strong> Specific luminaire control — Address 15: dim to 50%</li>
              <li><strong>Group:</strong> Zone/area control — Group 3: recall scene 2</li>
              <li><strong>Broadcast:</strong> All luminaires on bus — All: off</li>
              <li><strong>Scene:</strong> Preset configurations — Scene 5: meeting room presentation</li>
            </ul>
            <p><strong>Typical Group Assignment Example</strong></p>
            <p><strong>Open plan office floor:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Group 0:</strong> All general lighting (master control)</li>
              <li><strong>Group 1:</strong> Perimeter luminaires (daylight linking)</li>
              <li><strong>Group 2:</strong> Window row (blind integration)</li>
              <li><strong>Group 3:</strong> Desk zone A (presence detection)</li>
              <li><strong>Group 4:</strong> Desk zone B (presence detection)</li>
              <li><strong>Group 5:</strong> Meeting pod area (local switch)</li>
            </ul>
            <p>Note: Perimeter luminaires belong to Groups 0, 1, and 2 simultaneously</p>
            <p><strong>Best practice:</strong> Plan group assignments during design to align with control requirements - presence zones, daylight zones, switch zones, and cleaning circuits.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="System Architecture and Gateways">
            <p>DALI system architecture ranges from simple standalone controllers to sophisticated multi-bus installations integrated with building management systems. Understanding the hierarchy of components enables appropriate system specification for project requirements.</p>
            <p><strong>DALI System Hierarchy</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Level 4:</strong> BMS / Supervisory System</li>
            </ul>
            <p>↓ BACnet/IP, Modbus TCP, KNX</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Level 3:</strong> DALI Gateway / Router</li>
            </ul>
            <p>↓ Protocol translation</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Level 2:</strong> Application Controller</li>
            </ul>
            <p>↓ DALI bus (multiple)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Level 1:</strong> Control Gear (Drivers) + Input Devices (Sensors/Switches)</li>
            </ul>
            <p><strong>Key System Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>DALI PSU:</strong> Provides 16V DC bus power - one per bus (unless integrated in controller)</li>
              <li><strong>Control gear:</strong> DALI drivers in luminaires - receive commands, dim LEDs</li>
              <li><strong>Input devices:</strong> Sensors, switches, push buttons (DALI-2) - generate commands</li>
              <li><strong>Application controller:</strong> Manages one or more buses, stores logic and schedules</li>
              <li><strong>Gateway:</strong> Protocol translator to BACnet, KNX, Modbus, Ethernet</li>
            </ul>
            <p><strong>Gateway Integration Options</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BACnet/IP:</strong> Building Management Systems — Full status and control</li>
              <li><strong>KNX:</strong> European building automation — Seamless integration</li>
              <li><strong>Modbus RTU/TCP:</strong> Industrial/process control — Register-based access</li>
              <li><strong>Ethernet/IP:</strong> IT network integration — Web interface, API</li>
              <li><strong>DMX512:</strong> Theatrical/entertainment — Bridge for effects lighting</li>
            </ul>
            <p><strong>Multi-Bus Architecture Design</strong></p>
            <p><strong>When to use multiple buses:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>&gt;64 luminaires requiring individual control</li>
              <li>Separate areas requiring isolated control (tenancies)</li>
              <li>Cable length exceeds 300m</li>
              <li>Bus current would exceed 250mA</li>
            </ul>
            <p><strong>Multi-bus controller selection:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>4-bus controller: Small to medium commercial</li>
              <li>8-bus controller: Large commercial floors</li>
              <li>16+ bus systems: Major buildings, require network architecture</li>
            </ul>
            <p><strong>Integration tip:</strong> Early coordination with BMS consultant is essential - agree gateway requirements, point schedules, and network architecture during design stage.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Wiring, DALI-2, and Commissioning">
            <p>DALI installation requires attention to wiring topology, cable selection, and systematic commissioning. DALI-2 extends the standard with new device types and enhanced features that improve interoperability and functionality.</p>
            <p><strong>DALI Wiring Requirements</strong></p>
            <p><strong>Cable Specifications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Minimum 1.5mm² for runs up to 300m</li>
              <li>Voltage drop: max 2V at 250mA</li>
              <li>5-core cable: L, N, E, DA+, DA-</li>
              <li>Polarity independent (DA wires)</li>
              <li>Can share conduit with mains</li>
              <li>No screening required</li>
            </ul>
            <p><strong>Topology Rules</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Bus, star, tree, or mixed topology</li>
              <li>No loops (not a ring network)</li>
              <li>One PSU per bus segment</li>
              <li>Branches permitted</li>
              <li>T-connections allowed</li>
              <li>Total length including branches &lt;300m</li>
            </ul>
            <p><strong>DALI-2 Enhancements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Control gear:</strong> Standardised — Enhanced, DT8 colour</li>
              <li><strong>Input devices:</strong> Not standardised — Fully standardised (Part 301-304)</li>
              <li><strong>Push buttons:</strong> Proprietary — Standardised instance types</li>
              <li><strong>Sensors:</strong> Basic support — Full presence/light sensor support</li>
              <li><strong>Interoperability:</strong> Control gear only — Full system interoperability</li>
              <li><strong>Certification:</strong> Self-declaration — Third-party certification (DiiA)</li>
            </ul>
            <p><strong>Commissioning Procedure</strong></p>
            <p><strong>Step 1 - Physical verification:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify all luminaires powered and DALI wired</li>
              <li>Check bus continuity and voltage (16V DC)</li>
              <li>Confirm no short circuits on DALI lines</li>
            </ul>
            <p><strong>Step 2 - Device discovery:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Connect commissioning tool/software</li>
              <li>Run auto-discover to identify all control gear</li>
              <li>Verify count matches installation drawings</li>
            </ul>
            <p><strong>Step 3 - Addressing:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Assign short addresses (manual or automatic)</li>
              <li>Identify luminaires using flash function</li>
              <li>Document address allocation</li>
            </ul>
            <p><strong>Step 4 - Groups and scenes:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Assign luminaires to groups per design</li>
              <li>Program scene levels for each scene number</li>
              <li>Configure fade times as required</li>
            </ul>
            <p><strong>Step 5 - Testing and handover:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Test all control scenarios (switch, dim, scene)</li>
              <li>Verify sensor operation if applicable</li>
              <li>Produce commissioning record and as-built data</li>
            </ul>
            <p><strong>Commissioning tools:</strong> Use manufacturer commissioning software or universal DALI tools (handheld programmers, USB interfaces) for addressing and programming.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: DALI Bus Current Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate if 48 LED luminaires can share a single DALI bus.</p>
            <p>Given:</p>
            <p>- 48 DALI LED drivers</p>
            <p>- Each driver: 2mA standby current (typical)</p>
            <p>- Maximum bus current: 250mA</p>
            <p>Calculation:</p>
            <p>Total bus current = 48 × 2mA = 96mA</p>
            <p>96mA &lt; 250mA maximum</p>
            <p>Result: 48 drivers can operate on single bus with 154mA headroom</p>
            <p>Note: Also within 64 address limit (48 &lt; 64)</p>
            <p>
              <strong>Example 2: Multi-Bus System Design</strong>
            </p>
            <p><strong>Scenario:</strong> Design DALI architecture for 180 luminaires across 3 floors.</p>
            <p>Requirements:</p>
            <p>- Floor 1: 62 luminaires</p>
            <p>- Floor 2: 58 luminaires</p>
            <p>- Floor 3: 60 luminaires</p>
            <p>- Individual control required</p>
            <p>- BMS integration via BACnet/IP</p>
            <p>Solution:</p>
            <p>- 3 DALI buses (one per floor)</p>
            <p>- 4-channel DALI controller (spare capacity)</p>
            <p>- BACnet/IP gateway integrated</p>
            <p>- One PSU per bus</p>
            <p>Bus allocation:</p>
            <p>Bus 1: Addresses 0-61 (Floor 1)</p>
            <p>Bus 2: Addresses 0-57 (Floor 2)</p>
            <p>Bus 3: Addresses 0-59 (Floor 3)</p>
            <p>All floors within 64-address limit per bus</p>
            <p>
              <strong>Example 3: Scene Programming for Meeting Room</strong>
            </p>
            <p><strong>Scenario:</strong> Programme 4 scenes for a meeting room with 8 luminaires.</p>
            <p>Luminaire arrangement:</p>
            <p>- 4 downlights over table (Addr 0-3)</p>
            <p>- 2 wall washers at screen end (Addr 4-5)</p>
            <p>- 2 perimeter luminaires (Addr 6-7)</p>
            <p>Scene programming (DALI level 0-254):</p>
            <p>Scene 0 - Full brightness:</p>
            <p>All luminaires: 254 (100%)</p>
            <p>Scene 1 - Presentation:</p>
            <p>Downlights (0-3): 127 (50%)</p>
            <p>Wall washers (4-5): 0 (Off)</p>
            <p>Perimeter (6-7): 76 (30%)</p>
            <p>Scene 2 - Video conference:</p>
            <p>Downlights (0-3): 178 (70%)</p>
            <p>Wall washers (4-5): 127 (50%)</p>
            <p>Perimeter (6-7): 127 (50%)</p>
            <p>Scene 3 - Cleaning:</p>
            <p>All luminaires: 254 (100%)</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>DALI Installation Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify luminaire DALI compatibility before procurement</li>
              <li>Calculate bus current (typically 2mA per driver)</li>
              <li>Check total bus length including all branches (&lt;300m)</li>
              <li>Install bus PSU at optimal location for voltage distribution</li>
              <li>Label DALI wiring clearly throughout installation</li>
              <li>Test bus voltage before connecting luminaires</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Addresses per bus: <strong>64</strong> (0-63)</li>
              <li>Groups per bus: <strong>16</strong> (0-15)</li>
              <li>Scenes per device: <strong>16</strong> (0-15)</li>
              <li>Bus voltage: <strong>16V DC</strong> (9.5V-22.5V)</li>
              <li>Maximum current: <strong>250mA</strong></li>
              <li>Maximum length: <strong>300m</strong></li>
              <li>Data rate: <strong>1,200 bps</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Exceeding 64 addresses</strong> - check device count before specifying single bus</li>
                <li><strong>Forgetting bus PSU</strong> - every bus needs dedicated power supply</li>
                <li><strong>Creating loops</strong> - DALI is not a ring topology, no closed loops</li>
                <li><strong>Mixing DALI-1 and DALI-2</strong> - older devices may not respond to DALI-2 commands</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Lighting controls
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section4-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Occupancy sensing
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section4_1;
