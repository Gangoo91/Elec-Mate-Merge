/**
 * Module 7 · Section 4 · Subsection 6 — BMS Integration
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Lighting control interfaces, communication protocols, scheduling, energy monitoring, and system optimisation
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

const TITLE = 'BMS Integration - HNC Module 7 Section 4.6';
const DESCRIPTION =
  'Master BMS integration for lighting control systems: communication protocols (BACnet, Modbus, KNX), scheduling strategies, demand response, energy monitoring, and system optimisation techniques.';

const quickCheckQuestions = [
  {
    id: 'bms-purpose',
    question: 'What is the primary function of a Building Management System (BMS)?',
    options: [
      'To replace manual light switches',
      'To centralise monitoring and control of building services',
      'To generate electricity for the building',
      'To provide emergency lighting only',
    ],
    correctIndex: 1,
    explanation:
      'A BMS centralises monitoring and control of building services including HVAC, lighting, fire systems, and security, enabling optimised operation, energy management, and maintenance planning.',
  },
  {
    id: 'bacnet-purpose',
    question: 'BACnet is primarily used in building automation for:',
    options: [
      'Connecting domestic appliances to WiFi',
      "Interoperability between different manufacturers' equipment",
      'High-speed video streaming',
      'Mobile phone integration only',
    ],
    correctIndex: 1,
    explanation:
      "BACnet (Building Automation and Control Networks) is an open protocol that enables interoperability between different manufacturers' building automation equipment, avoiding proprietary lock-in.",
  },
  {
    id: 'demand-response',
    question: 'What is demand response in the context of BMS lighting control?',
    options: [
      'Lights responding to motion detection',
      'Reducing lighting load during peak electricity demand periods',
      'Increasing light levels when requested by users',
      'Automatic lamp replacement scheduling',
    ],
    correctIndex: 1,
    explanation:
      'Demand response involves automatically reducing lighting load during peak electricity demand periods, typically in response to signals from the grid operator or based on tariff structures.',
  },
  {
    id: 'modbus-registers',
    question: "In Modbus protocol, what are 'registers' used for?",
    options: [
      'User login credentials',
      'Storing and exchanging data values between devices',
      'Physical cable connections',
      'Emergency backup power',
    ],
    correctIndex: 1,
    explanation:
      'Modbus registers are memory locations used for storing and exchanging data values (such as dimming levels, status, or sensor readings) between the master controller and slave devices.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which protocol is specifically designed for building automation and uses object-oriented data modelling?',
    options: ['Modbus RTU', 'BACnet', 'DMX512', 'Ethernet/IP'],
    correctAnswer: 1,
    explanation:
      'BACnet uses object-oriented data modelling where each device contains objects (analogue inputs, binary outputs, schedules) with properties, making it highly suitable for building automation applications.',
  },
  {
    id: 2,
    question: 'What is the typical BACnet object type used for a dimmable lighting circuit?',
    options: [
      'Binary Output (BO)',
      'Analogue Output (AO)',
      'Binary Input (BI)',
      'Multi-State Value (MSV)',
    ],
    correctAnswer: 1,
    explanation:
      'An Analogue Output (AO) object is typically used for dimmable lighting as it provides a variable output value (0-100%) rather than simple on/off control provided by Binary Outputs.',
  },
  {
    id: 3,
    question: 'Modbus RTU communicates over which physical medium?',
    options: ['Fibre optic only', 'RS-485 serial connection', 'WiFi only', 'Power line carrier'],
    correctAnswer: 1,
    explanation:
      'Modbus RTU (Remote Terminal Unit) uses RS-485 serial connection, providing robust two-wire communication suitable for industrial and building environments with distances up to 1200 metres.',
  },
  {
    id: 4,
    question: "In a KNX system, what is the function of a 'coupler'?",
    options: [
      'To power the bus cable',
      'To connect different lines or areas of the KNX network',
      'To dim lighting fixtures',
      'To detect occupancy',
    ],
    correctAnswer: 1,
    explanation:
      'KNX couplers (line couplers, area couplers) connect different segments of the KNX network, managing traffic between areas and providing electrical isolation whilst enabling system-wide communication.',
  },
  {
    id: 5,
    question: "What is 'trending' in BMS terminology?",
    options: [
      'Following popular building designs',
      'Recording historical data values over time for analysis',
      'Predicting future equipment failures',
      'Adjusting setpoints based on weather',
    ],
    correctAnswer: 1,
    explanation:
      'Trending refers to the BMS function of recording historical data values (energy consumption, temperatures, occupancy) over time, enabling performance analysis, fault diagnosis, and optimisation.',
  },
  {
    id: 6,
    question:
      'Which scheduling strategy allows different lighting scenes for different days of the week?',
    options: [
      'Exception scheduling',
      'Calendar-based scheduling',
      'Override scheduling',
      'Demand scheduling',
    ],
    correctAnswer: 1,
    explanation:
      'Calendar-based scheduling allows different operational profiles for different days (weekdays vs weekends), holidays, and special events, providing flexibility for varying building usage patterns.',
  },
  {
    id: 7,
    question: 'What is the primary benefit of integrating DALI lighting with BACnet BMS?',
    options: [
      'Eliminating the need for any wiring',
      'Enabling enterprise-level monitoring whilst maintaining detailed luminaire control',
      'Reducing the number of luminaires required',
      'Automatic emergency lighting testing only',
    ],
    correctAnswer: 1,
    explanation:
      'DALI-BACnet integration enables the BMS to monitor and control lighting at enterprise level whilst DALI provides detailed individual luminaire addressing and control, combining the strengths of both systems.',
  },
  {
    id: 8,
    question: "In demand response applications, what is 'load shedding'?",
    options: [
      'Removing old luminaires',
      'Temporarily reducing non-essential loads during peak demand',
      'Upgrading to more efficient lighting',
      'Installing additional circuits',
    ],
    correctAnswer: 1,
    explanation:
      'Load shedding involves temporarily reducing or switching off non-essential electrical loads (including lighting in unoccupied areas) during peak demand periods to reduce overall building consumption.',
  },
  {
    id: 9,
    question: 'What data would a BMS typically collect for lighting energy analysis?',
    options: [
      'Lamp colour temperature only',
      'kWh consumption, operating hours, and occupancy correlation',
      'Luminaire weight and dimensions',
      'Installation contractor details',
    ],
    correctAnswer: 1,
    explanation:
      'For lighting energy analysis, BMS collects kWh consumption, operating hours, dimming levels, and correlates this with occupancy data to identify optimisation opportunities and verify savings.',
  },
  {
    id: 10,
    question: "What is 'commissioning override' in BMS lighting control?",
    options: [
      'Bypassing safety interlocks permanently',
      'Temporary manual control mode for system setup and testing',
      'Automatic fault correction',
      'Emergency lighting activation',
    ],
    correctAnswer: 1,
    explanation:
      'Commissioning override provides temporary manual control of lighting circuits during system setup and testing, allowing engineers to verify operation before returning to automatic BMS control.',
  },
  {
    id: 11,
    question: 'Which optimisation strategy adjusts lighting based on available daylight?',
    options: ['Demand response', 'Daylight harvesting', 'Task tuning', 'Absence detection'],
    correctAnswer: 1,
    explanation:
      'Daylight harvesting uses photocells to measure ambient light levels and automatically dims artificial lighting to maintain target illuminance, reducing energy consumption when natural light is available.',
  },
  {
    id: 12,
    question: "What is the purpose of a BMS 'alarm' for lighting systems?",
    options: [
      'To wake up sleeping occupants',
      'To alert operators to faults, failures, or abnormal conditions',
      'To schedule regular maintenance',
      'To activate emergency lighting only',
    ],
    correctAnswer: 1,
    explanation:
      'BMS alarms notify building operators of lighting system faults (lamp failures, communication errors, energy anomalies), enabling prompt maintenance response and maintaining system performance.',
  },
];

const faqs = [
  {
    question: 'What is the difference between BMS and BEMS?',
    answer:
      'A Building Management System (BMS) focuses on controlling building services (HVAC, lighting, security). A Building Energy Management System (BEMS) specifically emphasises energy monitoring, analysis, and optimisation. Modern systems often combine both functions, providing integrated control and energy management. The distinction is becoming less clear as energy efficiency becomes central to all building automation.',
  },
  {
    question: 'Can different protocol systems (BACnet, Modbus, KNX) work together?',
    answer:
      'Yes, through protocol gateways or converters. A BACnet/Modbus gateway translates between protocols, allowing a BACnet BMS to communicate with Modbus lighting controllers. Multi-protocol gateways can bridge several systems. Modern BMS platforms often support multiple protocols natively. Integration requires careful point mapping and testing to ensure reliable communication.',
  },
  {
    question: 'How does BMS integration affect lighting maintenance?',
    answer:
      'BMS integration significantly improves maintenance by providing lamp failure alarms, operating hours tracking for proactive replacement, energy consumption anomaly detection indicating faults, and historical data for failure pattern analysis. Condition-based maintenance replaces fixed schedules, reducing costs whilst improving reliability. Remote diagnostics reduce site visits.',
  },
  {
    question: 'What cybersecurity considerations apply to BMS lighting integration?',
    answer:
      'BMS networks require security measures including network segmentation (separating BMS from IT networks), strong authentication for user access, encrypted communications where possible, regular firmware updates, and access logging. Building automation systems have been targets for cyber attacks, making security essential. Follow NCSC guidance for operational technology security.',
  },
  {
    question: 'How do I specify BMS integration requirements for a lighting project?',
    answer:
      'Specify: protocol requirements (BACnet IP, Modbus TCP), point list (all data points to be monitored/controlled), alarm requirements, trending requirements, interface with existing BMS, commissioning and testing procedures, and documentation deliverables. Include network architecture drawings and confirm compatibility with existing BMS platform. Reference BSRIA BG 6 for commissioning guidance.',
  },
  {
    question: 'What is the typical commissioning process for BMS-integrated lighting?',
    answer:
      'Commissioning follows a structured process: point-to-point verification (each control point operates correctly), sequence testing (schedules, overrides, interlocks work as designed), integration testing (communication with BMS headend), performance verification (energy monitoring accuracy), and documentation (as-built point schedules, graphics, user training). Allow adequate time - BMS commissioning is often underestimated.',
  },
];

const HNCModule7Section4_6 = () => {
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
            eyebrow="Module 7 · Section 4 · Subsection 6"
            title="BMS Integration"
            description="Lighting control interfaces, communication protocols, scheduling, energy monitoring, and system optimisation"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Explain BMS/BEMS functions and architecture for lighting systems",
              "Compare BACnet, Modbus, and KNX communication protocols",
              "Design scheduling strategies for energy-efficient operation",
              "Implement demand response and load management",
              "Configure energy monitoring and performance analysis",
              "Apply system optimisation techniques for lighting control",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="BMS/BEMS Fundamentals">
            <p>A Building Management System (BMS) provides centralised monitoring and control of building services, enabling efficient operation, energy management, and maintenance. When emphasising energy functions, the system is often termed a Building Energy Management System (BEMS).</p>
            <p><strong>BMS Architecture Layers:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Field level:</strong> Sensors, actuators, luminaires, and local controllers</li>
              <li><strong>Automation level:</strong> Area controllers processing field data and executing control logic</li>
              <li><strong>Management level:</strong> Supervisory workstations, databases, and user interfaces</li>
              <li><strong>Enterprise level:</strong> Integration with IT systems, analytics, and cloud services</li>
            </ul>
            <p><strong>BMS Functions for Lighting</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Monitoring:</strong> Real-time status of all lighting circuits — Visibility of building-wide operation</li>
              <li><strong>Control:</strong> Remote on/off and dimming commands — Centralised management without site visits</li>
              <li><strong>Scheduling:</strong> Time-based automatic operation — Consistent operation, energy savings</li>
              <li><strong>Alarming:</strong> Notification of faults and failures — Rapid maintenance response</li>
              <li><strong>Trending:</strong> Historical data logging and analysis — Performance optimisation, M&amp;V</li>
            </ul>
            <p><strong>Integration approach:</strong> Lighting typically connects to BMS via protocol gateways (DALI-BACnet) or native BACnet/Modbus controllers, enabling enterprise-level management whilst maintaining local control.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Communication Protocols">
            <p>Building automation relies on standardised communication protocols to enable interoperability between different manufacturers' equipment. The main protocols for lighting integration are BACnet, Modbus, and KNX, each with distinct characteristics.</p>
            <p><strong>BACnet</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>ASHRAE/ISO standard</li>
              <li>Object-oriented model</li>
              <li>IP or MS/TP physical layer</li>
              <li>Best for enterprise systems</li>
            </ul>
            <p><strong>Modbus</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Simple master-slave</li>
              <li>Register-based data</li>
              <li>RTU (RS-485) or TCP/IP</li>
              <li>Widely supported, low cost</li>
            </ul>
            <p><strong>KNX</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>European standard (EN 50090)</li>
              <li>Decentralised peer-to-peer</li>
              <li>Twisted pair, powerline, RF</li>
              <li>Strong in lighting/blinds</li>
            </ul>
            <p><strong>Protocol Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Data model:</strong> Objects &amp; properties — Registers &amp; coils — Datapoints &amp; groups</li>
              <li><strong>Topology:</strong> Client-server — Master-slave — Peer-to-peer</li>
              <li><strong>Discovery:</strong> Automatic (Who-Is) — Manual configuration — ETS software</li>
              <li><strong>Complexity:</strong> Medium-high — Low — Medium</li>
              <li><strong>Typical use:</strong> Large commercial — Industrial, retrofit — Premium residential, commercial</li>
            </ul>
            <p><strong>BACnet Object Types for Lighting</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Binary Output (BO):</strong> On/off switching control</li>
              <li><strong>Analogue Output (AO):</strong> Dimming level (0-100%)</li>
              <li><strong>Binary Input (BI):</strong> Switch/sensor status</li>
              <li><strong>Analogue Input (AI):</strong> Light level sensor (lux)</li>
              <li><strong>Schedule:</strong> Time-based automation</li>
              <li><strong>Notification Class:</strong> Alarm routing</li>
            </ul>
            <p><strong>Integration tip:</strong> Protocol gateways (e.g., DALI-BACnet) enable DALI lighting systems to communicate with BMS platforms, translating between protocols whilst maintaining full functionality.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Scheduling and Control Strategies">
            <p>Effective scheduling is fundamental to energy-efficient lighting operation. BMS scheduling combines time-based automation with demand response, occupancy integration, and manual override capabilities to balance energy savings with occupant needs.</p>
            <p><strong>Scheduling Types</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Weekly schedule:</strong> Standard operating hours (e.g., 07:00-19:00 Mon-Fri)</li>
              <li><strong>Calendar schedule:</strong> Different profiles for holidays, special events</li>
              <li><strong>Exception schedule:</strong> One-off overrides for specific dates</li>
              <li><strong>Astronomical schedule:</strong> Sunrise/sunset-based for external lighting</li>
            </ul>
            <p><strong>Control Hierarchy</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1 (Highest):</strong> Life safety — Emergency lighting activation — Until reset</li>
              <li><strong>2:</strong> Critical override — Security incident response — Manual release</li>
              <li><strong>3:</strong> Demand response — Grid signal load reduction — Event duration</li>
              <li><strong>4:</strong> BMS operator — Facilities manager override — Timed (e.g., 2 hours)</li>
              <li><strong>5:</strong> Local user — Wall switch or app — Timed (e.g., 30 mins)</li>
              <li><strong>6 (Lowest):</strong> Schedule — Time-based automation — Continuous</li>
            </ul>
            <p><strong>Demand Response Integration</strong></p>
            <p>Demand response enables automatic load reduction during peak grid demand:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>OpenADR:</strong> Standard protocol for automated demand response signals</li>
              <li><strong>Load shedding:</strong> Turn off non-critical lighting (car parks, corridors)</li>
              <li><strong>Load shifting:</strong> Reduce dimming levels building-wide (e.g., 100% &gt; 80%)</li>
              <li><strong>Pre-cooling/heating:</strong> Coordinate with HVAC for thermal mass strategies</li>
            </ul>
            <p><strong>Best practice:</strong> Always include timed auto-revert for manual overrides to prevent lights being left on indefinitely after occupant intervention.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Energy Monitoring and System Optimisation">
            <p>BMS-integrated energy monitoring provides the data foundation for continuous optimisation. Effective systems combine sub-metering, trending, analytics, and automated control adjustments to minimise energy consumption whilst maintaining comfort and productivity.</p>
            <p><strong>Energy Monitoring Components</strong></p>
            <p><strong>Sub-metering</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lighting circuit kWh meters</li>
              <li>Zone or floor-level metering</li>
              <li>CT-based power monitoring</li>
              <li>Pulse counting integration</li>
              <li>Real-time power (kW) and energy (kWh)</li>
            </ul>
            <p><strong>Data Analysis</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Baseline establishment</li>
              <li>Consumption trending</li>
              <li>Occupancy correlation</li>
              <li>Anomaly detection</li>
              <li>M&amp;V (measurement and verification)</li>
            </ul>
            <p><strong>Optimisation Strategies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Daylight harvesting:</strong> Photocell-based dimming to maintain lux target — 20-40% perimeter zones</li>
              <li><strong>Occupancy control:</strong> PIR/ultrasonic detection with timeout — 30-50% intermittent spaces</li>
              <li><strong>Task tuning:</strong> Reduce maximum output to actual requirement — 10-20% over-lit areas</li>
              <li><strong>Schedule optimisation:</strong> Align schedules with actual occupancy patterns — 10-30% after-hours</li>
              <li><strong>Demand limiting:</strong> Cap maximum power during peak periods — Peak demand reduction</li>
            </ul>
            <p><strong>Key Performance Indicators (KPIs)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lighting Power Density:</strong> W/m² (target &lt; 10 W/m² for offices)</li>
              <li><strong>Operating hours:</strong> Actual vs scheduled hours</li>
              <li><strong>Occupancy ratio:</strong> Occupied hours / lit hours</li>
              <li><strong>Energy per m²:</strong> kWh/m²/year for benchmarking</li>
              <li><strong>Demand factor:</strong> Peak demand / connected load</li>
            </ul>
            <p><strong>Continuous Commissioning</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fault detection:</strong> Automatic identification of stuck dampers, failed sensors, or control errors</li>
              <li><strong>Performance monitoring:</strong> Track energy consumption against baselines and targets</li>
              <li><strong>Schedule verification:</strong> Confirm actual operation matches intended schedules</li>
              <li><strong>Sensor calibration:</strong> Detect drift in lux sensors or occupancy detectors</li>
            </ul>
            <p><strong>Measurement and verification (M&amp;V):</strong> Use IPMVP (International Performance Measurement and Verification Protocol) methodologies to quantify energy savings from optimisation measures.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: DALI-BACnet Gateway Integration</strong>
            </p>
            <p><strong>Scenario:</strong> Integrate a DALI lighting system with a BACnet BMS in a commercial office.</p>
            <p>System Architecture:</p>
            <p>BMS Workstation (BACnet IP)</p>
            <p>|</p>
            <p>Ethernet Switch</p>
            <p>|</p>
            <p>DALI-BACnet Gateway</p>
            <p>|</p>
            <p>DALI Bus (64 devices max)</p>
            <p>├── Luminaires (addressed 1-50)</p>
            <p>├── PIR sensors (addressed 51-55)</p>
            <p>└── Lux sensors (addressed 56-58)</p>
            <p>BACnet Point Mapping:</p>
            <p>- AO1: Zone 1 dimming level (0-100%)</p>
            <p>- BI1: Zone 1 occupancy status</p>
            <p>- AI1: Zone 1 lux level</p>
            <p>- Schedule-1: Zone 1 weekly schedule</p>
            <p>Result: Full BMS visibility and control of DALI lighting</p>
            <p>
              <strong>Example 2: Demand Response Configuration</strong>
            </p>
            <p><strong>Scenario:</strong> Configure lighting load shedding for grid demand response events.</p>
            <p>Demand Response Levels:</p>
            <p>Level 0 (Normal): All lighting at normal control</p>
            <p>Level 1 (Moderate): Reduce common areas to 80%</p>
            <p>Level 2 (High): Reduce all non-critical to 60%</p>
            <p>Level 3 (Critical): Non-essential lighting OFF</p>
            <p>Priority Classification:</p>
            <p>Essential: Reception, circulation (no reduction)</p>
            <p>Important: Open-plan offices (reduce to 80% max)</p>
            <p>Non-essential: Car park, plant rooms (can shed)</p>
            <p>Trigger Source:</p>
            <p>OpenADR signal from grid operator</p>
            <p>OR building peak demand &gt; 500 kW</p>
            <p>OR electricity tariff &gt; 30p/kWh</p>
            <p>Expected reduction: 40 kW during Level 3 events</p>
            <p>
              <strong>Example 3: Energy Monitoring Point Schedule</strong>
            </p>
            <p><strong>Scenario:</strong> Specify BMS points for lighting energy monitoring on a floor plate.</p>
            <p>Point Schedule - Level 3 Lighting:</p>
            <p>| Point ID | Description | Type | Units | Trend |</p>
            <p>|----------|-------------|------|-------|-------|</p>
            <p>| L3-kW | Floor 3 lighting power | AI | kW | 15min |</p>
            <p>| L3-kWh | Floor 3 lighting energy | AI | kWh | Daily |</p>
            <p>| L3-Occ | Floor 3 occupancy count | AI | No. | 15min |</p>
            <p>| L3-Lux | Average daylight level | AI | lux | 15min |</p>
            <p>| L3-Dim | Average dimming level | AI | % | 15min |</p>
            <p>| L3-OpHrs | Operating hours today | AI | hrs | Daily |</p>
            <p>Calculated Values:</p>
            <p>- W/m² = L3-kW × 1000 / floor area</p>
            <p>- Occupancy ratio = occupied hours / lit hours</p>
            <p>Enables detailed energy analysis and optimisation</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>BMS Integration Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Confirm protocol compatibility (BACnet revision, Modbus function codes)</li>
              <li>Define complete point list with naming convention</li>
              <li>Specify alarm priorities and routing</li>
              <li>Document trending requirements and retention periods</li>
              <li>Plan network architecture and IP addressing</li>
              <li>Allow adequate commissioning time for integration testing</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BACnet device instance: <strong>Unique 22-bit number</strong></li>
              <li>Modbus RTU max devices: <strong>247 per bus</strong></li>
              <li>KNX line: <strong>64 devices maximum</strong></li>
              <li>Trending interval: <strong>15 minutes typical</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Incomplete point lists</strong> - Always specify all required points before installation</li>
                <li><strong>Missing override timeouts</strong> - Manual overrides should auto-revert</li>
                <li><strong>No baseline data</strong> - Establish consumption baseline before optimisation</li>
                <li><strong>Insufficient commissioning</strong> - Test all control sequences, not just individual points</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section4-5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Smart lighting
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Energy efficient solutions
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section4_6;
