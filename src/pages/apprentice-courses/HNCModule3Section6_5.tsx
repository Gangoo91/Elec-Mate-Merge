/**
 * Module 3 · Section 6 · Subsection 5 — Smart Controls and Building Automation
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   BMS / BAS architectures, PID control, BACnet / Modbus / KNX / DALI protocols,
 *   integration of HVAC + lighting + security + metering. The control layer that
 *   turns a high-spec BSE installation into a high-performance building.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Smart Controls and Building Automation - HNC Module 3 Section 6.5';
const DESCRIPTION =
  'Comprehensive coverage of Building Management Systems (BMS), control strategies, network protocols, and integration for energy-efficient building services.';

const quickCheckQuestions = [
  {
    id: 'bms-primary-function',
    question: 'What is the primary function of a Building Management System (BMS)?',
    options: [
      'All results with explanation of methods used',
      'Monitor and control building services automatically',
      'Equal to the supply voltage on every branch',
      'A fracture of any bone other than a finger, thumb, or toe',
    ],
    correctIndex: 1,
    explanation:
      'A BMS monitors and automatically controls building services (HVAC, lighting, security) to optimise energy use, maintain comfort, and reduce operational costs.',
  },
  {
    id: 'pid-controller',
    question: "In PID control, what does the 'I' (Integral) component address?",
    options: [
      'Immediate response to error',
      'Accumulated error over time',
      'Rate of change of error',
      'Maximum setpoint limit',
    ],
    correctIndex: 1,
    explanation:
      'The Integral component addresses accumulated error over time, eliminating steady-state offset that proportional control alone cannot correct.',
  },
  {
    id: 'bacnet-protocol',
    question: 'What type of protocol is BACnet?',
    options: [
      'Proprietary manufacturer protocol',
      'Power line carrier protocol',
      'Residential-only protocol',
      'Open standard for building automation',
    ],
    correctIndex: 3,
    explanation:
      "BACnet (Building Automation and Control Networks) is an open, non-proprietary protocol specifically designed for building automation, enabling interoperability between different manufacturers' equipment.",
  },
  {
    id: 'optimum-start',
    question: 'What does optimum start control achieve?',
    options: [
      'Runs plant at full output the moment the building opens',
      'Starts heating at a fixed time every morning',
      'Keeps the building at setpoint continuously overnight',
      'Pre-heats building to reach setpoint exactly at occupancy time',
    ],
    correctIndex: 3,
    explanation:
      'Optimum start calculates the latest time to start heating/cooling so the building reaches the required temperature precisely when occupancy begins, avoiding wasted energy from starting too early.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What are the three main levels of a typical BMS architecture?',
    options: [
      'Sensor, actuator, and display',
      'Management, automation, and field level',
      'Input, processing, and output',
      'Local, regional, and national',
    ],
    correctAnswer: 1,
    explanation:
      'BMS architecture comprises: Management level (operator workstations, servers), Automation level (controllers, outstations), and Field level (sensors, actuators, final control elements).',
  },
  {
    id: 2,
    question:
      'A temperature sensor reads 18°C when the setpoint is 21°C. In a proportional controller with Kp = 2, what is the controller output percentage?',
    options: [
      '42%',
      '3%',
      '6%',
      'Cannot be calculated',
    ],
    correctAnswer: 2,
    explanation:
      'Error = Setpoint - Measured = 21 - 18 = 3°C. Proportional output = Kp × Error = 2 × 3 = 6%. The controller outputs 6% demand to the heating system.',
  },
  {
    id: 3,
    question: 'Which network protocol operates at 9600 baud and uses master-slave communication?',
    options: [
      'LonWorks',
      'BACnet IP',
      'KNX',
      'Modbus RTU',
    ],
    correctAnswer: 3,
    explanation:
      'Modbus RTU operates over RS-485 at 9600 baud (or higher) using master-slave communication, where only the master initiates data exchanges.',
  },
  {
    id: 4,
    question: 'What is the typical supply voltage for KNX bus systems?',
    options: [
      '29V DC (nominal 30V)',
      '12V DC',
      '5V DC',
      '230V AC',
    ],
    correctAnswer: 0,
    explanation:
      'KNX bus operates at 29V DC nominal (tolerance 21-30V). The bus provides both communication and power to devices, though high-power devices require separate mains supply.',
  },
  {
    id: 5,
    question: "In HVAC control, what is 'dead band'?",
    options: [
      'The maximum temperature the system can reach',
      'A temperature range where neither heating nor cooling operates',
      'The difference between supply and return air temperature',
      'The delay before a sensor responds to a change',
    ],
    correctAnswer: 1,
    explanation:
      'Dead band is a neutral zone between heating and cooling setpoints where neither operates, preventing rapid cycling. For example, heat below 20°C, cool above 24°C, dead band 20-24°C.',
  },
  {
    id: 6,
    question: 'What is the primary advantage of daylight harvesting in lighting control?',
    options: [
      'It increases lighting output during cloudy weather',
      'It switches all lighting off when the room is occupied',
      'Reduces artificial lighting when natural daylight is sufficient',
      'It raises the colour temperature of the luminaires',
    ],
    correctAnswer: 2,
    explanation:
      'Daylight harvesting uses photocells to measure available daylight and dims artificial lighting accordingly, reducing energy consumption by 20-60% in perimeter zones while maintaining required illuminance levels.',
  },
  {
    id: 7,
    question: 'Which commissioning activity verifies that a BMS point displays the correct value?',
    options: [
      'Loop testing',
      'Firmware update',
      'Trend logging',
      'Point-to-point testing',
    ],
    correctAnswer: 3,
    explanation:
      'Point-to-point testing verifies each BMS point by applying a known input (e.g., measured temperature) and confirming the BMS displays the correct value with proper engineering units and scaling.',
  },
  {
    id: 8,
    question: 'What does BEMS stand for and how does it differ from BMS?',
    options: [
      'Building Energy Management System - emphasises energy monitoring and optimisation',
      'Basic Emergency Management System - handles alarms only',
      'Building Electrical Management System - focuses on electrical only',
      'Broadband Energy Metering System - for utility billing',
    ],
    correctAnswer: 0,
    explanation:
      'BEMS (Building Energy Management System) emphasises energy monitoring, analysis, and optimisation features. While BMS focuses on control, BEMS adds energy dashboards, sub-metering, and analytics for energy reduction.',
  },
  {
    id: 9,
    question:
      'Which sensor technology is most suitable for detecting occupancy in an open-plan office?',
    options: [
      'A single ultrasonic sensor at the doorway',
      'Passive infrared (PIR) with microwave (dual-tech)',
      'A CO2 sensor used as the sole trigger',
      'A manual push-button at each desk',
    ],
    correctAnswer: 1,
    explanation:
      'Dual-technology sensors combining PIR (detects movement via heat) and microwave (detects movement via Doppler) provide reliable occupancy detection in open-plan areas, reducing false triggers from HVAC drafts or small movements.',
  },
  {
    id: 10,
    question: "What is the purpose of BACnet's 'COV' (Change of Value) service?",
    options: [
      'Continuous polling of every device once per second',
      'A scheduled report sent at fixed time intervals',
      'Event-driven notification when a value changes significantly',
      'A request to overwrite a value on a remote device',
    ],
    correctAnswer: 2,
    explanation:
      'COV (Change of Value) is an event-driven service where devices notify subscribers only when values change by a defined increment, reducing network traffic compared to continuous polling.',
  },
];

const faqs = [
  {
    question: 'What is the difference between BMS, BEMS, and BAS?',
    answer:
      'BMS (Building Management System) is the general term for automated building control systems. BEMS (Building Energy Management System) specifically emphasises energy monitoring and optimisation features. BAS (Building Automation System) is often used interchangeably with BMS, particularly in North America. All three describe systems that monitor and control HVAC, lighting, and other building services.',
  },
  {
    question: 'Why do some BMS installations use multiple protocols?',
    answer:
      'Legacy equipment may use older protocols (Modbus, LON) while newer devices support BACnet or KNX. Integration requires protocol gateways or multi-protocol controllers. Additionally, different subsystems may have evolved independently - lighting on DALI, HVAC on BACnet, security on proprietary protocols - requiring integration at the management level.',
  },
  {
    question: 'How do I select between BACnet MSTP and BACnet IP?',
    answer:
      'BACnet MS/TP uses RS-485 wiring (lower cost, limited distance/speed, up to 127 devices per segment), suitable for smaller installations or connecting field devices. BACnet IP uses Ethernet infrastructure (higher speed, unlimited distance with switches, leverages existing IT network), ideal for connecting controllers and management systems. Many installations use both: IP backbone with MS/TP field networks.',
  },
  {
    question: 'What commissioning documentation should be provided for a BMS?',
    answer:
      'Essential documentation includes: points list with all addresses and descriptions, control strategies and sequences of operation, network architecture diagrams, as-built schematics, commissioning test records, trend data proving control performance, operator training records, and maintenance procedures. BSRIA guides BG6 and BG49 provide detailed commissioning templates.',
  },
  {
    question: 'How does demand-controlled ventilation save energy?',
    answer:
      'Traditional ventilation runs at fixed rates regardless of occupancy. Demand-controlled ventilation uses CO2 sensors (proxy for occupancy) to modulate fresh air supply. In a meeting room occupied 4 hours daily, this can reduce ventilation energy by 60-80%. Combined with variable speed drives on fans, savings are substantial in commercial buildings.',
  },
  {
    question: 'What is the role of weather compensation in heating control?',
    answer:
      'Weather compensation adjusts heating water flow temperature based on external temperature. As outside temperature drops, flow temperature increases (and vice versa). This matches heat output to building heat loss, improving boiler efficiency (especially condensing boilers operating at lower return temperatures) and preventing overheating during mild weather.',
  },
];

const HNCModule3Section6_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6 · Subsection 5"
            title="Smart controls and building automation"
            description="Intelligent systems for optimising energy use, comfort, and operational efficiency in modern buildings"
            tone="purple"
          />

          <TLDR
            points={[
              'You design the BMS / BAS architecture in three layers &mdash; field (sensors / actuators), automation (controllers + PID loops), management (head-end + analytics) &mdash; for any modern BSE project.',
              'You specify open protocols (BACnet IP at management/automation, BACnet MS/TP or Modbus RTU at field, KNX or DALI for lighting) for vendor independence and lifecycle replaceability.',
              'You evaluate ASHRAE Guideline 36 / BSRIA BG-29 sequence-of-operation libraries on every new HVAC plant &mdash; supersedes bespoke sequences, enables better commissioning.',
              'You document the BMS controls strategy in CIBSE Commissioning Code C / TM39 framework so the building can be M&amp;V&rsquo;d, recommissioned and audited under ESOS.',
            ]}
          />

          <RegsCallout
            source="Building Regulations 2010 — Approved Document L Volume 2 (2021): Buildings other than dwellings — controls and commissioning"
            clause="Fixed building services should have effective controls so as to enable the achievement of reasonable standards of energy efficiency. The building services should be commissioned by testing and adjustment as necessary to ensure they use no more fuel and power than is reasonable in the circumstances and a notice giving particulars of the commissioning should be given to the building control body."
            meaning={
              <>
                Approved Document L 2021 makes BMS / BAS controls and commissioning
                evidence a Building Control submission item. As BSE designer you specify
                the controls and write the commissioning brief; the M&amp;V evidence
                feeds into the Part L log book and any subsequent EPC / DEC. Wrong /
                missing controls is one of the commonest reasons buildings underperform
                their design SBEM model in operation.
              </>
            }
            cite="Source: Building Regulations 2010 + Approved Document L Volume 2 (2021); CIBSE Commissioning Code C; CIBSE TM39 (energy metering); ASHRAE Guideline 36 (high-performance HVAC sequences); BSRIA BG-29 (commissioning); BS EN ISO 16484 (BACS)"
          />

          <SectionRule />

          <ConceptBlock title="In 30 seconds">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BMS:</strong> Centralised monitoring and control of building services</li>
              <li><strong>Control strategies:</strong> PID control, optimum start/stop, scheduling</li>
              <li><strong>Protocols:</strong> BACnet, Modbus, KNX, DALI for interoperability</li>
              <li><strong>Integration:</strong> HVAC, lighting, security unified management</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Energy savings:</strong> 15-30% reduction in operational costs</li>
              <li><strong>Compliance:</strong> Part L, BREEAM, NABERS requirements</li>
              <li><strong>Commissioning:</strong> Essential for achieving design performance</li>
              <li><strong>Maintenance:</strong> Fault detection and diagnostic capabilities</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Building Management Systems (BMS) Overview">
            <p>
              A Building Management System (BMS) is a computer-based control system that monitors
              and manages a building's mechanical and electrical equipment. Modern BMS installations
              integrate HVAC, lighting, fire systems, security, and energy metering into a unified
              management platform.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                BMS Architecture Levels
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Management</strong> — Workstations, servers, web interface — Operator interface, data storage, analytics, reporting</li>
              <li><strong>Automation</strong> — Controllers, outstations, DDC panels — Execute control strategies, local processing, network communication</li>
              <li><strong>Field</strong> — Sensors, actuators, valves, dampers — Measure conditions, execute control actions on plant</li>
            </ul>

              
                <p className="text-sm font-medium text-white">Key BMS Benefits</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Centralised monitoring and control</li>
                  <li>Automatic fault detection and alarms</li>
                  <li>Energy consumption tracking</li>
                  <li>Scheduled operation and optimisation</li>
                  <li>Historical trend logging and analysis</li>
                  <li>Remote access and management</li>
                </ul>

              
                <p className="text-sm font-medium text-white">Typical Systems Controlled</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>HVAC: AHUs, chillers, boilers, FCUs</li>
                  <li>Lighting: general, emergency, external</li>
                  <li>Metering: electricity, gas, water, heat</li>
                  <li>Fire: interface and status monitoring</li>
                  <li>Access control and security integration</li>
                  <li>Lifts and vertical transportation</li>
                </ul>

            

            <p>
              <strong>Industry standard:</strong> BSRIA Guide BG6 provides comprehensive guidance on
              BMS design, commissioning, and operation for UK building services.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <ConceptBlock title="Sensors: Temperature, Occupancy, Light Level">
            <p>
              Sensors provide the input data that BMS controllers use to make control decisions.
              Selecting appropriate sensors with correct accuracy, range, and response time is
              critical for effective building automation.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">Temperature Sensors</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Room sensor</strong> — NTC thermistor, Pt100/Pt1000 — Space temperature control — ±0.3°C to ±0.5°C</li>
              <li><strong>Duct sensor</strong> — Pt100 averaging element — Supply/return air temperature — ±0.2°C to ±0.5°C</li>
              <li><strong>Pipe sensor</strong> — Pt100 pocket or strap-on — CHW/HHW flow temperature — ±0.2°C to ±0.5°C</li>
              <li><strong>Outside air</strong> — Pt100/Pt1000 in housing — Weather compensation — ±0.5°C</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">Occupancy Sensors</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>PIR (Passive Infrared)</strong> — Body heat movement — Corridors, toilets, meeting rooms</li>
              <li><strong>Microwave</strong> — Doppler shift from movement — Areas requiring through-partition detection</li>
              <li><strong>Dual-tech (PIR + MW)</strong> — Both must trigger — Open-plan offices, reducing false triggers</li>
              <li><strong>Ultrasonic</strong> — Sound wave reflection — Partitioned spaces, cubicles</li>
              <li><strong>CO2 sensor (proxy)</strong> — Exhaled CO2 accumulation — Demand-controlled ventilation</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Light Level Sensors (Photocells)
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Ceiling-mounted:</strong> Measure combined daylight and artificial light
                  on working plane (typical 300-500 lux target)
                </li>
                <li>
                  <strong>External:</strong> Measure external daylight for facade or blind control
                  (0-100,000 lux range)
                </li>
                <li>
                  <strong>Spectral response:</strong> Should match human eye response (photopic) for
                  accurate lux measurement
                </li>
                <li>
                  <strong>Calibration:</strong> Regular verification against calibrated lux meter
                  recommended
                </li>
              </ul>

            <p>
              <strong>Sensor placement:</strong> Position temperature sensors away from heat
              sources, draughts, and direct sunlight. Mount occupancy sensors to cover the required
              detection zone without obstructions.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Control Strategies: PID, Optimum Start/Stop">
            <p>
              Control strategies determine how the BMS responds to sensor inputs to maintain desired
              conditions. Understanding these strategies is essential for specifying, commissioning,
              and optimising building automation systems.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">PID Control</p>
              <p>
                PID (Proportional-Integral-Derivative) control is the most widely used feedback
                control algorithm. It calculates an error value as the difference between measured
                value and setpoint, then applies correction based on three terms:
              </p>

                
                  <p className="font-bold text-elec-yellow mb-1">P - Proportional</p>
                  <p className="text-white text-xs">Output proportional to error</p>
                  <p className="text-white text-xs mt-1">
                    Responds immediately but leaves offset
                  </p>

                
                  <p className="font-bold text-elec-yellow mb-1">I - Integral</p>
                  <p className="text-white text-xs">Accumulates error over time</p>
                  <p className="text-white text-xs mt-1">Eliminates steady-state error</p>

                
                  <p className="font-bold text-elec-yellow mb-1">D - Derivative</p>
                  <p className="text-white text-xs">Rate of change of error</p>
                  <p className="text-white text-xs mt-1">Anticipates and dampens overshoot</p>

              

              <p className="text-sm font-medium text-elec-yellow/80">PID Tuning Parameters</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Proportional band (PB):</strong> Range over which output varies from
                  0-100%. Narrow PB = aggressive response
                </li>
                <li>
                  <strong>Integral time (Ti):</strong> Time to repeat proportional action. Shorter
                  Ti = faster error elimination
                </li>
                <li>
                  <strong>Derivative time (Td):</strong> Time to anticipate error change. Often set
                  to zero for HVAC (noise sensitivity)
                </li>
                <li>
                  <strong>Rule of thumb:</strong> Start with P-only, add I to eliminate offset, add
                  D only if oscillation persists
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Optimum Start/Stop Control
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Optimum Start</strong> — Calculates latest start time to reach setpoint at occupancy — Avoids over-early heating; adapts to thermal mass and weather</li>
              <li><strong>Optimum Stop</strong> — Shuts down plant before end of occupancy using thermal storage — Utilises building thermal mass; reduces run hours</li>
              <li><strong>Night Setback</strong> — Maintains minimum temperature (e.g., 12°C) overnight — Prevents frost damage; reduces morning preheat time</li>
              <li><strong>Free Cooling</strong> — Uses outside air for cooling when conditions permit — Reduces chiller operation; significant energy savings</li>
            </ul>

            <p>
              <strong>Adaptive control:</strong> Modern optimum start algorithms learn building
              thermal characteristics over time, automatically adjusting preheat periods based on
              historical performance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="Network Protocols: BACnet, Modbus, KNX">
            <p>
              Communication protocols enable devices from different manufacturers to exchange data
              and work together. Selecting appropriate protocols affects system flexibility, cost,
              and long-term maintainability.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">Protocol Comparison</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BACnet</strong> — Open standard (ASHRAE/ISO) — HVAC, BMS integration — Ethernet (IP), RS-485 (MS/TP)</li>
              <li><strong>Modbus</strong> — Open de facto standard — Metering, industrial equipment — RS-485 (RTU), Ethernet (TCP)</li>
              <li><strong>KNX</strong> — Open standard (ISO/IEC) — Lighting, blinds, room control — Twisted pair, IP, RF, PLC</li>
              <li><strong>DALI</strong> — Open standard (IEC 62386) — Lighting control — Two-wire bus (max 64 devices)</li>
              <li><strong>LonWorks</strong> — Open standard (ISO/IEC) — General building automation — Twisted pair, IP, power line</li>
            </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">BACnet Features</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    Object-oriented data model (analog input, binary output, schedule, etc.)
                  </li>
                  <li>
                    Standard services: read/write property, COV, alarms, scheduling
                  </li>
                  <li>Device interoperability profiles (BIBBs)</li>
                  <li>BTL certification for tested compliance</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Modbus Features</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Simple register-based data model</li>
                  <li>Master-slave communication</li>
                  <li>RTU: RS-485, up to 247 devices</li>
                  <li>TCP: Ethernet, port 502</li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">KNX System Overview</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Bus voltage:</strong> 29V DC (21-30V tolerance) supplied by KNX power
                  supply
                </li>
                <li>
                  <strong>Topology:</strong> Line, area, and backbone structure; 64 devices per
                  line, 15 lines per area
                </li>
                <li>
                  <strong>Addressing:</strong> Individual address (1.2.3) and group addresses for
                  functions
                </li>
                <li>
                  <strong>Programming:</strong> ETS (Engineering Tool Software) required for
                  configuration
                </li>
                <li>
                  <strong>Cable:</strong> Twisted pair, typically green LSZH sheathed, max 1000m per
                  line
                </li>
              </ul>

            <p>
              <strong>Specification tip:</strong> Always specify open protocols (BACnet, KNX, DALI)
              to avoid vendor lock-in and ensure long-term system flexibility and maintainability.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="HVAC Control Strategies">
            <p>
              HVAC systems represent the largest energy consumer in most commercial buildings.
              Effective control strategies can reduce HVAC energy consumption by 20-40% while
              maintaining or improving occupant comfort.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Air Handling Unit (AHU) Control
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Supply air temperature</strong> — Duct temperature sensor — Heating/cooling valve, mixing dampers</li>
              <li><strong>Supply air pressure</strong> — Duct pressure sensor — Supply fan VSD</li>
              <li><strong>Fresh air quantity</strong> — CO2 sensor, air flow station — Fresh air damper</li>
              <li><strong>Room temperature</strong> — Room sensor — VAV box damper, reheat coil</li>
              <li><strong>Humidity</strong> — Humidity sensor — Humidifier, cooling coil</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">Heating System Control</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Weather compensation:</strong> Adjusts flow temperature based on external
                  conditions
                </li>
                <li>
                  <strong>Sequencing:</strong> Stages multiple boilers to meet load efficiently
                </li>
                <li>
                  <strong>Return temperature limiting:</strong> Ensures condensing boiler operation
                </li>
                <li>
                  <strong>Frost protection:</strong> Maintains minimum temperatures to prevent
                  damage
                </li>
                <li>
                  <strong>DHW priority:</strong> Prioritises domestic hot water heating when
                  required
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Chilled Water System Control
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Load-based sequencing:</strong> Stages chillers to match building cooling
                  load
                </li>
                <li>
                  <strong>Supply temperature reset:</strong> Raises CHW temperature when full
                  cooling not needed
                </li>
                <li>
                  <strong>Free cooling:</strong> Uses cooling towers when wet bulb permits
                </li>
                <li>
                  <strong>Differential pressure control:</strong> Modulates pump speed to maintain
                  system delta-P
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Dead Band and Changeover
              </p>
              <p>
                Dead band prevents simultaneous heating and cooling (fighting), which wastes energy.
                Typical settings provide a 4°C neutral zone:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Heating setpoint:</strong> 20°C - heating enabled below this
                </li>
                <li>
                  <strong>Cooling setpoint:</strong> 24°C - cooling enabled above this
                </li>
                <li>
                  <strong>Dead band:</strong> 20-24°C - neither heating nor cooling operates
                </li>
              </ul>

            <p>
              <strong>Energy consideration:</strong> Every 1°C reduction in heating setpoint or
              increase in cooling setpoint saves approximately 8-10% on HVAC energy consumption.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <ConceptBlock title="Lighting Control Systems">
            <p>
              Lighting control can reduce lighting energy consumption by 30-60% through occupancy
              sensing, daylight harvesting, scheduling, and task tuning. Integration with the BMS
              enables coordinated control with HVAC and security systems.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                DALI (Digital Addressable Lighting Interface)
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Bus topology</strong> — Two-wire, polarity-independent, daisy-chain or star</li>
              <li><strong>Maximum devices</strong> — 64 addresses per DALI line (drivers, sensors, switches)</li>
              <li><strong>Dimming range</strong> — 0.1-100% with logarithmic curve (matches human perception)</li>
              <li><strong>Groups/scenes</strong> — 16 groups, 16 scenes per device</li>
              <li><strong>DALI-2</strong> — Enhanced standard with mandatory features, improved interoperability</li>
            </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Lighting Control Strategies
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Occupancy control:</strong> PIR/microwave sensors switch or dim lighting
                  </li>
                  <li>
                    <strong>Daylight harvesting:</strong> Photocells dim artificial lighting near
                    windows
                  </li>
                  <li>
                    <strong>Time scheduling:</strong> Automated on/off based on building occupancy
                    patterns
                  </li>
                  <li>
                    <strong>Task tuning:</strong> Set maximum output below 100% where full light not
                    needed
                  </li>
                  <li>
                    <strong>Scene control:</strong> Pre-set combinations for different activities
                  </li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Typical Energy Savings
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Occupancy sensing:</strong> 20-30% (offices), 40-60% (corridors/toilets)
                  </li>
                  <li>
                    <strong>Daylight harvesting:</strong> 20-40% (perimeter zones)
                  </li>
                  <li>
                    <strong>Time scheduling:</strong> 10-20% (depends on baseline)
                  </li>
                  <li>
                    <strong>Task tuning:</strong> 10-20% (when over-lit areas identified)
                  </li>
                  <li>
                    <strong>Combined strategies:</strong> 40-60% total reduction
                  </li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Emergency Lighting Integration
              </p>
              <p>
                DALI emergency luminaires (Type 1) provide addressable monitoring and testing:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  Automated function testing (monthly) and duration testing (annually)
                </li>
                <li>Battery and lamp status monitoring via DALI bus</li>
                <li>Automatic test logging for compliance documentation</li>
                <li>
                  Rest mode: extinguish in mains-healthy condition to extend battery life
                </li>
              </ul>

            <p>
              <strong>Compliance note:</strong> Part L requires lighting controls in new
              non-domestic buildings. BREEAM credits available for metering, zoning, and occupant
              controls.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Integration and Interoperability">
            <p>
              Modern buildings require integration between multiple systems - HVAC, lighting,
              security, fire, access control, and metering. Successful integration enables
              coordinated operation, unified monitoring, and enhanced energy management.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Integration Architecture
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Native protocol</strong> — Direct communication on same protocol — BACnet-to-BACnet device integration</li>
              <li><strong>Protocol gateway</strong> — Translates between protocols — Modbus meter to BACnet BMS</li>
              <li><strong>Hard-wired I/O</strong> — Volt-free contacts, 0-10V, 4-20mA — Fire alarm interface (status/trips)</li>
              <li><strong>API/middleware</strong> — Software integration layer — Building analytics platforms, IoT</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Typical System Integrations
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Fire alarm interface:</strong> BMS receives fire status, initiates smoke
                  control, releases doors, activates smoke extract
                </li>
                <li>
                  <strong>Security/access control:</strong> Occupancy data triggers HVAC and
                  lighting modes; after-hours access activates local services
                </li>
                <li>
                  <strong>Lighting and HVAC:</strong> Shared occupancy sensors; coordinated
                  scheduling; lighting scenes trigger temperature setpoints
                </li>
                <li>
                  <strong>Metering:</strong> Sub-metering data aggregated for tenant billing, energy
                  dashboards, and automated M&T reports
                </li>
                <li>
                  <strong>Lifts:</strong> Status monitoring, fault alarms, energy consumption
                  tracking
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Interoperability Considerations
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Protocol standardisation:</strong> Specify open protocols to enable
                  multi-vendor integration
                </li>
                <li>
                  <strong>Points list coordination:</strong> Define all integrated points,
                  addresses, and data formats in specification
                </li>
                <li>
                  <strong>Cybersecurity:</strong> Segment BMS networks; implement access control,
                  encryption, and monitoring
                </li>
                <li>
                  <strong>Testing:</strong> Factory acceptance testing (FAT) with simulated
                  integration; site witness testing
                </li>
                <li>
                  <strong>Documentation:</strong> System architecture diagrams, integration
                  matrices, data flow documentation
                </li>
              </ul>

            <p>
              <strong>Specification requirement:</strong> Include a detailed integration matrix in
              contract documents showing all system interfaces, protocols, responsible parties, and
              testing requirements.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Building Services: Commissioning BMS, Energy Monitoring">
            <p>
              Effective BMS commissioning is essential to achieve design energy performance. Studies
              show that 15-30% of building energy is wasted due to poor commissioning and inadequate
              ongoing monitoring.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                BMS Commissioning Stages
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pre-commissioning</strong> — Cable testing, power-on checks, software upload — Installation check sheets</li>
              <li><strong>Point-to-point</strong> — Verify each sensor/actuator displays/operates correctly — Points commissioning sheets</li>
              <li><strong>Loop testing</strong> — Verify control loops operate correctly (setpoint changes) — Control loop test records</li>
              <li><strong>Functional testing</strong> — Test sequences of operation, interlocks, alarms — Functional test scripts and results</li>
              <li><strong>Optimisation</strong> — Tune PID loops, adjust schedules, optimum start parameters — Trend logs, tuning records</li>
              <li><strong>Seasonal</strong> — Verify heating and cooling modes over full year — Seasonal commissioning reports</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Energy Monitoring Features
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Sub-metering:</strong> Separate meters for major end uses (HVAC, lighting,
                  small power, lifts, catering)
                </li>
                <li>
                  <strong>Automatic meter reading:</strong> BMS polls meters (typically Modbus) for
                  half-hourly data
                </li>
                <li>
                  <strong>Energy dashboards:</strong> Real-time and historical consumption display
                </li>
                <li>
                  <strong>Benchmarking:</strong> Compare performance against CIBSE TM46, DEC, NABERS
                  benchmarks
                </li>
                <li>
                  <strong>Automated M&T:</strong> Target setting, CUSUM analysis, exception
                  reporting
                </li>
                <li>
                  <strong>Tenant billing:</strong> Apportionment data for recoverable costs
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Key Performance Indicators (KPIs)
              </p>

                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Energy Use Intensity:</strong> kWh/m²/year
                  </li>
                  <li>
                    <strong>Carbon intensity:</strong> kgCO2/m²/year
                  </li>
                  <li>
                    <strong>Baseload ratio:</strong> Out-of-hours vs occupied consumption
                  </li>
                </ul>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Comfort compliance:</strong> % time within setpoint tolerance
                  </li>
                  <li>
                    <strong>System efficiency:</strong> COP, SEER for cooling plant
                  </li>
                  <li>
                    <strong>Run hours:</strong> Plant utilisation tracking
                  </li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Soft Landings and Aftercare
              </p>
              <p>
                BSRIA Soft Landings framework extends BMS commissioning with:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Extended aftercare:</strong> Design team involvement for first year of
                  operation
                </li>
                <li>
                  <strong>Post-occupancy evaluation:</strong> User satisfaction surveys and energy
                  analysis
                </li>
                <li>
                  <strong>Performance gap analysis:</strong> Compare predicted vs actual energy
                  consumption
                </li>
                <li>
                  <strong>Continuous improvement:</strong> Identify and implement energy saving
                  opportunities
                </li>
              </ul>

            <p>
              <strong>Industry guidance:</strong> BSRIA BG6 (BMS Design Guide), BG49 (Soft
              Landings), and CIBSE TM63 (Operational Energy) provide comprehensive commissioning and
              energy monitoring guidance.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
                Example 1: PID Controller Output Calculation
              </p>
              <p>
                <strong>Question:</strong> A room temperature controller has setpoint 21°C, measured
                temperature 19°C, proportional band 4°C, and integral time 300 seconds. Calculate
                the proportional output.
              </p>

                <p>
                  Error = Setpoint - Measured = 21 - 19 = <strong>2°C</strong>
                </p>
                <p>Proportional output = (Error / Proportional Band) × 100%</p>
                <p>
                  = (2 / 4) × 100% = <strong>50% output</strong>
                </p>
                <p>The heating valve opens to 50% position</p>
                <p className="text-white">
                  Integral action will gradually increase output if error persists
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 2: Daylight Harvesting Savings
              </p>
              <p>
                <strong>Question:</strong> A 200m² perimeter zone has lighting load of 12 W/m².
                Daylight harvesting achieves 35% average dimming over 2,500 occupied hours.
                Calculate annual energy saving.
              </p>

                <p>
                  Lighting load = 200m² × 12 W/m² = <strong>2,400W = 2.4kW</strong>
                </p>
                <p>Without dimming: 2.4kW × 2,500h = 6,000 kWh/year</p>
                <p>With 35% average dimming: 6,000 × (1 - 0.35) = 3,900 kWh/year</p>
                <p>
                  Annual saving = 6,000 - 3,900 = <strong>2,100 kWh/year</strong>
                </p>
                <p>At £0.30/kWh = £630 annual cost saving</p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 3: Optimum Start Time Calculation
              </p>
              <p>
                <strong>Question:</strong> Building requires 3 hours to preheat from 12°C to 21°C
                when outside temperature is 5°C. Occupancy starts at 08:00. When should heating
                start?
              </p>

                <p>
                  Required preheat time = <strong>3 hours</strong>
                </p>
                <p>Occupancy start = 08:00</p>
                <p>
                  Heating start time = 08:00 - 3h = <strong>05:00</strong>
                </p>
                <p>Adaptive algorithm adjusts based on:</p>
                <p className="text-white">
                  - Actual external temperature (warmer = later start)
                </p>
                <p className="text-white">- Previous day's performance data</p>
                <p className="text-white">- Building thermal mass characteristics</p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 4: CO2-Based Ventilation Saving
              </p>
              <p>
                <strong>Question:</strong> A meeting room designed for 20 people typically has
                average occupancy of 8. Fresh air rate is 10 l/s/person. Calculate the ventilation
                reduction with demand control.
              </p>

                <p>
                  Design fresh air = 20 people × 10 l/s = <strong>200 l/s</strong>
                </p>
                <p>
                  Average actual need = 8 people × 10 l/s = <strong>80 l/s</strong>
                </p>
                <p>
                  Reduction = (200 - 80) / 200 × 100% = <strong>60% reduction</strong>
                </p>
                <p>Plus fan energy savings (cube law):</p>
                <p className="text-white">Fan power at 40% = (0.4)³ = 6.4% of full power</p>
                <p className="text-white">Fan energy saving ≈ 93% during reduced occupancy</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">
                BMS Specification Checklist
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  Define open protocols (BACnet, KNX, DALI) for all major systems
                </li>
                <li>
                  Include detailed points list with addresses, descriptions, and engineering units
                </li>
                <li>Specify control sequences of operation for all plant</li>
                <li>
                  Define graphics requirements, alarm priorities, and trend logging
                </li>
                <li>Include integration matrix for all interfaced systems</li>
                <li>
                  Specify commissioning requirements including seasonal testing
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Energy Monitoring Best Practice
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  Sub-meter major end uses: HVAC, lighting, small power, lifts, catering
                </li>
                <li>
                  Collect half-hourly data minimum (15-minute for detailed analysis)
                </li>
                <li>Establish baselines and set reduction targets</li>
                <li>
                  Monitor baseload (out-of-hours) consumption as key efficiency indicator
                </li>
                <li>
                  Implement automated exception reporting for consumption anomalies
                </li>
              </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Quick Reference">
            <p className="text-sm font-medium text-elec-yellow/80">BMS Architecture</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Management level - workstations, servers</li>
                  <li>Automation level - controllers, outstations</li>
                  <li>Field level - sensors, actuators</li>
                  <li>Open protocols: BACnet, KNX, DALI, Modbus</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Control Strategies</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>PID: Proportional-Integral-Derivative</li>
                  <li>Optimum start/stop - adaptive preheat</li>
                  <li>Weather compensation - flow temp reset</li>
                  <li>Dead band - prevent heating/cooling conflict</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Protocol Selection</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>BACnet - HVAC, BMS backbone</li>
                  <li>KNX - lighting, room controls</li>
                  <li>DALI - addressable lighting</li>
                  <li>Modbus - metering, industrial</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Key Standards</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>BSRIA BG6 - BMS design guide</li>
                  <li>BSRIA BG49 - Soft Landings</li>
                  <li>CIBSE TM63 - Operational energy</li>
                  <li>IEC 62386 - DALI standard</li>
                </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="University lecture-block AHU sequence &mdash; ASHRAE Guideline 36 implementation"
            situation={
              <>
                A new university lecture-block has 6 dual-duct AHUs serving 18 lecture
                theatres. Original BMS contractor proposes a bespoke control sequence
                with PID loops on each AHU damper. The BSE consultant insists on
                ASHRAE Guideline 36 (G36) high-performance sequences instead.
              </>
            }
            whatToDo={
              <>
                G36 sequences are pre-engineered, peer-reviewed, energy-optimised
                templates for AHUs, VAVs, central plant. They include trim-and-respond
                static-pressure reset, demand-controlled outdoor air, supply-air
                temperature reset, fault detection and diagnostics &mdash; all of which
                routinely save 15&ndash;30 % energy over bespoke sequences with no
                trade-off in comfort. Specify G36 sequences with BACnet IP automation
                controllers; include FDD (fault detection &amp; diagnosis) modules;
                require the contractor to provide the M&amp;V evidence for
                comparison against the SBEM model.
              </>
            }
            whyItMatters={
              <>
                Bespoke BMS sequences are the source of most building underperformance
                vs design intent &mdash; the &ldquo;performance gap&rdquo; documented in
                CIBSE TM54. G36 (and the equivalent BSRIA BG29 in UK practice) closes
                the gap by encoding best-in-class control logic. The HNC engineer who
                insists on G36 unlocks the 20&ndash;30 % energy saving the SBEM model
                already promised but the building rarely delivers.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BMS / BAS three-layer architecture: field (sensors / actuators / VSDs) &rarr; automation (controllers + PID) &rarr; management (head-end + analytics).',
              'PID control: proportional + integral + derivative &mdash; tune for stability vs response on every modulating loop.',
              'Open protocols: BACnet IP (management/automation), BACnet MS/TP or Modbus RTU (field), KNX or DALI (lighting), MQTT / API (cloud).',
              'BS EN ISO 16484 (BACS): the umbrella standard for building automation and control systems.',
              'ASHRAE Guideline 36 / BSRIA BG-29: pre-engineered high-performance sequences that close the design vs operational performance gap.',
              'Optimum start / stop, trim-and-respond, demand-controlled OA, supply-air-temperature reset &mdash; the standard energy-saving sequences of modern BMS.',
              'CIBSE TM39 covers metering strategy &mdash; sub-meter at floor / department / system level for ESOS evidence.',
              'Approved Document L 2021 expects BMS controls + commissioning evidence in the Part L log book.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section6-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Energy-efficient motor and lighting design
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section6-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                BS 7671, CIBSE and Part L requirements for energy efficiency
              </div>
            </button>
          </div>

        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section6_5;
