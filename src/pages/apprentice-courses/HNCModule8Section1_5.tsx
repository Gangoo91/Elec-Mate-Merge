/**
 * Module 8 · Section 1 · Subsection 5 — Heating Controls
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Weather compensation, optimum start, zone control, BMS integration and smart heating technologies
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

const TITLE = 'Heating Controls - HNC Module 8 Section 1.5';
const DESCRIPTION =
  'Master heating control systems: weather compensation, optimum start/stop algorithms, zone control strategies, OpenTherm protocol, BMS integration, Building Regulations Part L, and Boiler Plus legislation.';

const quickCheckQuestions = [
  {
    id: 'weather-compensation',
    question: 'What does a weather compensator adjust based on outdoor temperature?',
    options: [
      'Boiler flow temperature',
      'Room thermostat setpoint',
      'Hot water cylinder temperature',
      'Pump speed only',
    ],
    correctIndex: 0,
    explanation:
      'Weather compensation adjusts the boiler flow temperature based on outdoor temperature. As it gets colder outside, the flow temperature increases; as it gets warmer, the flow temperature decreases. This reduces cycling and improves efficiency.',
  },
  {
    id: 'optimum-start',
    question: 'What is the primary purpose of optimum start control?',
    options: [
      'Achieve discrimination with downstream RCDs',
      'Efficiency levels achieved with automation (A to D)',
      'Different power factors affecting total current',
      'To ensure the building reaches setpoint at occupancy time',
    ],
    correctIndex: 3,
    explanation:
      'Optimum start calculates the latest time to start the heating system so the building reaches the desired temperature exactly when occupancy begins, saving energy by avoiding unnecessary pre-heating.',
  },
  {
    id: 'boiler-plus',
    question:
      'Which of the following is a requirement of the Boiler Plus legislation for combi boilers?',
    options: [
      'Without slip, there would be no relative motion between rotor and field, so no induced current',
      'To allow safe isolation for maintenance and emergencies',
      'VOC content below specified limits or certified low-emission products',
      'Weather compensation OR load compensation OR smart thermostat with automation',
    ],
    correctIndex: 3,
    explanation:
      'Boiler Plus (England, from April 2018) requires combi boilers to have one of: weather compensation, load compensation, flue gas heat recovery, or a smart thermostat with automation and optimisation.',
  },
  {
    id: 'opentherm',
    question: 'What advantage does OpenTherm communication provide over on/off control?',
    options: [
      'A visible bend, crack, dent or missing locking mechanism',
      'Modulating control allowing variable boiler output',
      'Reassess escape route lighting coverage',
      'Insulation damage and conductor contact',
    ],
    correctIndex: 1,
    explanation:
      'OpenTherm is a communication protocol that enables modulating control between the thermostat and boiler. Instead of on/off operation, the boiler can modulate its output to match demand, reducing cycling and improving comfort and efficiency.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A heating curve relates outdoor temperature to:',
    options: [
      'Open loop control without feedback',
      'Boiler flow temperature setpoint',
      'The MEP coordinator or BIM manager',
      'Terminal loosening and overheating',
    ],
    correctAnswer: 1,
    explanation:
      'The heating curve (or weather compensation curve) defines the relationship between outdoor temperature and the required boiler flow temperature. Steeper curves are used for poorly insulated buildings.',
  },
  {
    id: 2,
    question: 'What factors does an optimum start controller typically consider?',
    options: [
      'To prevent the boiler from firing when there is no demand',
      'Learning occupant behaviour and adjusting schedules automatically',
      'Indoor temperature, outdoor temperature, and historical data',
      '5-10 degrees Celsius below occupied setpoint',
    ],
    correctAnswer: 2,
    explanation:
      'Modern optimum start controllers use indoor temperature, outdoor temperature, and historical data about how the building responds to heating to calculate the optimal start time.',
  },
  {
    id: 3,
    question:
      'According to Building Regulations Part L, what is required for new heating systems in dwellings?',
    options: [
      'One cable in, one out, no branches',
      'Fixed equipment with exposed metalwork',
      'Building Energy Management System',
      'Zone control with at least 2 zones',
    ],
    correctAnswer: 3,
    explanation:
      'Part L requires new and replacement heating systems to have independent time and temperature control of space heating and hot water, with zoning typically requiring at least 2 zones (living areas and bedrooms).',
  },
  {
    id: 4,
    question: 'What is load compensation in heating controls?',
    options: [
      'Adjusting flow temperature based on difference between room and setpoint temperature',
      'Indoor temperature, outdoor temperature, and historical data',
      'Learning occupant behaviour and adjusting schedules automatically',
      'The controller adapts its algorithms based on building response history',
    ],
    correctAnswer: 0,
    explanation:
      'Load compensation adjusts the boiler flow temperature based on the difference between actual room temperature and the setpoint. As the room approaches setpoint, flow temperature reduces, preventing overshoot.',
  },
  {
    id: 5,
    question: 'TRVs (Thermostatic Radiator Valves) provide:',
    options: [
      'Time control of heating',
      'Individual room temperature control',
      'Weather compensation',
      'Boiler interlock function',
    ],
    correctAnswer: 1,
    explanation:
      'TRVs provide individual room temperature control by modulating the flow of hot water to each radiator based on room temperature. They do not provide time control or boiler interlock.',
  },
  {
    id: 6,
    question: 'What is the purpose of boiler interlock in a heating system?',
    options: [
      'To prevent simultaneous heating and hot water',
      'To lock out the boiler during maintenance',
      'To prevent the boiler from firing when there is no demand',
      'To limit maximum flow temperature',
    ],
    correctAnswer: 2,
    explanation:
      "Boiler interlock ensures the boiler and pump only operate when there is a genuine heat demand. It's achieved by wiring controls so the boiler cannot fire unless a room thermostat, programmer, or zone valve calls for heat.",
  },
  {
    id: 7,
    question: 'Which BMS protocol uses a twisted pair cable for communication?',
    options: [
      'BACnet/IP',
      'Modbus TCP',
      'LonWorks IP',
      'BACnet MS/TP',
    ],
    correctAnswer: 3,
    explanation:
      'BACnet MS/TP (Master-Slave/Token-Passing) uses RS-485 twisted pair cabling. BACnet/IP and Modbus TCP use Ethernet infrastructure, while LonWorks can use various media.',
  },
  {
    id: 8,
    question: 'What is the typical setback temperature reduction for optimum stop control?',
    options: [
      '5-10 degrees Celsius below occupied setpoint',
      'Down to 10 degrees Celsius minimum',
      '1-2 degrees Celsius below occupied setpoint',
      'No setback - heating stops completely',
    ],
    correctAnswer: 0,
    explanation:
      'Optimum stop typically allows the temperature to drift down 5-10 degrees Celsius to an unoccupied setpoint. The building thermal mass maintains reasonable temperatures while saving energy.',
  },
  {
    id: 9,
    question: 'Smart heating controls with automation and optimisation must be capable of:',
    options: [
      'That zone\\\\\\\\\\\\\\\'s valve closes but other zones continue',
      'Learning occupant behaviour and adjusting schedules automatically',
      'Indoor temperature, outdoor temperature, and historical data',
      'To prevent the boiler from firing when there is no demand',
    ],
    correctAnswer: 1,
    explanation:
      'To qualify under Boiler Plus, smart thermostats must have automation (learning schedules, geofencing) and optimisation (adjusting start times and temperatures to minimise energy use while maintaining comfort).',
  },
  {
    id: 10,
    question: 'In a zoned heating system, what happens when one zone reaches setpoint?',
    options: [
      'The boiler turns off completely',
      'The pump stops for that zone only',
      "That zone's valve closes but other zones continue",
      'All zones reduce to setback temperature',
    ],
    correctAnswer: 2,
    explanation:
      'In a properly designed zoned system, when one zone reaches setpoint, its zone valve closes but other zones continue to receive heat if needed. The boiler only stops when all zones are satisfied.',
  },
  {
    id: 11,
    question: 'What is the typical heating curve gradient for a well-insulated modern building?',
    options: [
      '2.5-3.0 (very steep curve)',
      '1.0 (moderate curve)',
      '1.5-2.0 (steep curve)',
      '0.5 (shallow curve)',
    ],
    correctAnswer: 3,
    explanation:
      'Well-insulated buildings require lower flow temperatures and have shallower heating curves (0.5-0.8). Poorly insulated buildings need steeper curves (1.5-2.0) to deliver more heat at low outdoor temperatures.',
  },
  {
    id: 12,
    question: 'Which organisation developed the OpenTherm communication protocol?',
    options: [
      'OpenTherm Association',
      'British Standards Institution',
      'ASHRAE',
      'CIBSE',
    ],
    correctAnswer: 0,
    explanation:
      "The OpenTherm protocol was developed by the OpenTherm Association, a consortium of heating equipment manufacturers. It's an open standard for communication between thermostats and boilers.",
  },
  {
    id: 13,
    question: "What is 'self-learning' in optimum start controllers?",
    options: [
      'The controller learns occupant preferences for temperature',
      'The controller adapts its algorithms based on building response history',
      'The controller connects to weather forecasts',
      'The controller automatically updates its firmware',
    ],
    correctAnswer: 1,
    explanation:
      'Self-learning optimum start controllers record how the building responds to heating under different conditions and use this data to refine their start time calculations, becoming more accurate over time.',
  },
  {
    id: 14,
    question: 'Under Part L, what minimum control is required for hot water systems?',
    options: [
      'Learning occupant behaviour and adjusting schedules automatically',
      'Indoor temperature, outdoor temperature, and historical data',
      'Cylinder thermostat and programmer with independent timing',
      'To prevent the boiler from firing when there is no demand',
    ],
    correctAnswer: 2,
    explanation:
      'Part L requires hot water systems to have a cylinder thermostat (typically set at 60 degrees Celsius for Legionella control) and a programmer allowing independent timing of heating and hot water.',
  },
];

const faqs = [
  {
    question: 'What is the difference between weather compensation and load compensation?',
    answer:
      'Weather compensation adjusts boiler flow temperature based on outdoor temperature only - as outdoor temperature drops, flow temperature increases according to a heating curve. Load compensation adjusts flow temperature based on the difference between actual room temperature and setpoint - as the room approaches setpoint, flow temperature reduces to prevent overshoot. Some advanced controls combine both methods for optimal efficiency.',
  },
  {
    question: 'Do I need both TRVs and a room thermostat?',
    answer:
      "Yes, for Part L compliance and proper system operation. TRVs provide individual room temperature control, but you need at least one room thermostat in a reference room (usually the living room) without a TRV to provide boiler interlock. The room thermostat ensures the boiler only fires when there's demand, while TRVs regulate individual rooms.",
  },
  {
    question: 'How do I choose the correct heating curve for weather compensation?',
    answer:
      "The heating curve depends on building insulation level, emitter sizing, and design flow/return temperatures. Start with the manufacturer's recommended curve for your building type. Well-insulated buildings with correctly sized radiators need shallow curves (0.5-0.8). Older, poorly insulated buildings need steeper curves (1.5-2.0). Fine-tune by observing performance in cold weather - if rooms overheat, reduce the curve gradient.",
  },
  {
    question: 'What are the benefits of BMS integration for heating systems?',
    answer:
      'BMS integration provides centralised monitoring and control, energy logging and analysis, automatic fault detection and alerts, coordination with other building systems (ventilation, lighting), remote access and adjustment, trend logging for optimisation, and compliance reporting. For larger buildings, BMS integration typically delivers 10-20% energy savings through improved control strategies and identification of inefficiencies.',
  },
  {
    question: 'Is OpenTherm compatible with all boilers?',
    answer:
      'No, OpenTherm requires both the boiler and the thermostat to support the protocol. Many modern condensing boilers support OpenTherm, but older or basic models may only accept on/off control. Check boiler specifications for OpenTherm compatibility. If using an incompatible boiler, a relay can provide on/off control from an OpenTherm thermostat, but modulating benefits are lost.',
  },
  {
    question: 'What happens if the outdoor sensor fails on a weather compensation system?',
    answer:
      'Most weather compensation controllers have a fail-safe mode. They typically revert to a fixed flow temperature (often 60-70 degrees Celsius) or use a default outdoor temperature assumption. The system will continue to operate but less efficiently. Some controllers can use an estimated outdoor temperature based on return water temperature. Always replace faulty sensors promptly to restore efficient operation.',
  },
];

const HNCModule8Section1_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section1")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 1 · Subsection 5"
            title="Heating Controls"
            description="Weather compensation, optimum start, zone control, BMS integration and smart heating technologies"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Explain weather compensation principles and heating curve selection",
              "Design optimum start/stop control strategies for buildings",
              "Apply Building Regulations Part L requirements for heating controls",
              "Understand Boiler Plus legislation and compliant solutions",
              "Implement zone control strategies for energy efficiency",
              "Integrate heating systems with BMS using standard protocols",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Weather Compensation and Load Compensation">
            <p>Compensated control systems adjust boiler flow temperature to match actual heating demand, rather than operating at a fixed high temperature. This reduces boiler cycling, improves condensing operation, and can deliver 10-15% energy savings compared to fixed temperature control.</p>
            <p><strong>Weather Compensation Principles</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Outdoor sensor:</strong> Measures external temperature, typically mounted on north-facing wall</li>
              <li><strong>Heating curve:</strong> Defines relationship between outdoor temp and flow temp setpoint</li>
              <li><strong>Lower flow temps:</strong> Enable condensing boiler to operate in condensing mode more often</li>
              <li><strong>Reduced cycling:</strong> Continuous modulation replaces on/off operation</li>
            </ul>
            <p><strong>Heating Curve Selection</strong></p>
            <p><strong>Curve Gradient:</strong> Determines how flow temp responds to outdoor temp</p>
            <p>Building Type | Typical Curve Gradient</p>
            <p>Well-insulated modern: 0.5 - 0.8</p>
            <p>Standard insulation: 0.8 - 1.2</p>
            <p>Poor insulation/oversized rads: 1.2 - 1.8</p>
            <p>Very poor insulation: 1.8 - 2.5</p>
            <p>Example: At -5°C outdoor, curve 1.0 might set 55°C flow</p>
            <p>Same conditions, curve 1.5 might set 70°C flow</p>
            <p><strong>Load Compensation (Room Compensation)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Adjusts flow temperature based on room temperature feedback</li>
              <li>As room approaches setpoint, flow temperature reduces</li>
              <li>Prevents temperature overshoot and improves comfort</li>
              <li>Can be combined with weather compensation for optimal control</li>
            </ul>
            <p><strong>OpenTherm Protocol</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Boiler modulation:</strong> No - full power or off — Yes - variable output</li>
              <li><strong>Flow temp control:</strong> Fixed at boiler — Controlled by thermostat</li>
              <li><strong>Cycling frequency:</strong> High - frequent on/off — Low - continuous operation</li>
              <li><strong>Condensing efficiency:</strong> Lower - high temps — Higher - lower temps</li>
              <li><strong>Diagnostic info:</strong> None — Yes - fault codes, temps</li>
            </ul>
            <p><strong>Efficiency gain:</strong> OpenTherm with weather compensation can improve seasonal efficiency by 10-15% compared to basic on/off control with a fixed flow temperature.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Optimum Start/Stop and Time Control">
            <p>Optimum start control calculates the latest time to start the heating system so the building reaches the desired temperature at the beginning of the occupancy period. This avoids wasting energy by starting heating too early, while ensuring comfort when occupants arrive.</p>
            <p><strong>Optimum Start Factors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Current indoor temperature</li>
              <li>Required setpoint temperature</li>
              <li>Outdoor temperature</li>
              <li>Building thermal mass</li>
              <li>Heating system capacity</li>
              <li>Historical performance data</li>
            </ul>
            <p><strong>Optimum Stop Benefits</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heating stops before end of occupancy</li>
              <li>Building thermal mass maintains comfort</li>
              <li>Typical stop 30-60 minutes early</li>
              <li>Temperature drifts to setback level</li>
              <li>Significant energy savings</li>
              <li>Reduces peak demand</li>
            </ul>
            <p><strong>Optimum Start Calculation Example</strong></p>
            <p>Building parameters:</p>
            <p>Occupancy starts: 08:00</p>
            <p>Required temp: 21°C</p>
            <p>Current indoor: 16°C</p>
            <p>Outdoor temp: 2°C</p>
            <p>Building heat-up rate: 1.5°C per hour (learned)</p>
            <p>Temperature rise needed: 21 - 16 = 5°C</p>
            <p>Preheat time: 5 ÷ 1.5 = 3.3 hours</p>
            <p>Optimum start time: 08:00 - 3h 20min = 04:40</p>
            <p>Without optimum start, might have started at 06:00 (fixed)</p>
            <p><strong>Self-Learning Algorithms</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Controller records actual heat-up times under different conditions</li>
              <li>Builds a model of building thermal response</li>
              <li>Adapts to seasonal changes and building modifications</li>
              <li>Typically requires 2-4 weeks to optimise fully</li>
              <li>May use weather forecasts for predictive control</li>
            </ul>
            <p><strong>Time Control Requirements (Part L)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Space heating:</strong> Programmer with on/off times — 7-day programming with optimum start</li>
              <li><strong>Hot water:</strong> Independent timing from heating — Separate programmer, cylinder stat</li>
              <li><strong>Zones:</strong> Independent time control per zone — Zone programmers or multi-zone controller</li>
            </ul>
            <p><strong>Energy saving:</strong> Optimum start/stop typically saves 5-10% of heating energy compared to fixed time schedules, with greater savings in heavyweight buildings.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Zone Control and Building Regulations">
            <p>Zone control divides a building into areas with independent temperature and time control. Building Regulations Part L requires new and replacement heating systems to include zoning, typically separating living areas from bedrooms, or different floors.</p>
            <p><strong>Building Regulations Part L Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Minimum 2 zones:</strong> For dwellings over 150m², separate heating zones required</li>
              <li><strong>Independent control:</strong> Each zone needs independent time and temperature control</li>
              <li><strong>Room thermostats:</strong> At least one in a zone without TRVs</li>
              <li><strong>TRVs:</strong> Required on all radiators except in rooms with room thermostats</li>
              <li><strong>Boiler interlock:</strong> Wiring must prevent boiler firing when no demand</li>
              <li><strong>Hot water:</strong> Separate timing from space heating with cylinder thermostat</li>
            </ul>
            <p><strong>Boiler Plus Legislation (England from April 2018)</strong></p>
            <p><strong>Applies to:</strong> All gas and oil boiler installations in existing dwellings</p>
            <p><strong>Combi boilers must have one of:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Weather compensation</li>
              <li>Load compensation</li>
              <li>Flue gas heat recovery system</li>
              <li>Smart thermostat with automation and optimisation features</li>
            </ul>
            <p><strong>System/regular boilers:</strong> Not currently required but recommended</p>
            <p>Note: Scotland has its own Building Standards; Wales follows England</p>
            <p><strong>Zone Valve Types and Selection</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>2-port motorised:</strong> Open/closed, one per zone — Standard zone control, 22mm/28mm</li>
              <li><strong>3-port mid-position:</strong> A only, B only, or A+B — Heating/hot water selection</li>
              <li><strong>3-port diverter:</strong> A only or B only (not both) — Priority DHW systems</li>
              <li><strong>Thermostatic radiator valve:</strong> Modulates on room temp — Individual radiator control</li>
            </ul>
            <p><strong>Wiring Centre Functions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Central connection point for heating controls</li>
              <li>Provides boiler interlock through switched live circuit</li>
              <li>Coordinates zone valves, thermostats, and programmer</li>
              <li>Ensures pump runs only when zone valve is open</li>
              <li>Common types: 5-wire and 8-wire systems for S and Y plans</li>
            </ul>
            <p><strong>S Plan (2 x 2-port valves)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Separate valve for heating and hot water</li>
              <li>Full independent control</li>
              <li>Easy to expand with additional zones</li>
              <li>Preferred for larger systems</li>
            </ul>
            <p><strong>Y Plan (3-port mid-position)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single valve controls both circuits</li>
              <li>Simpler installation</li>
              <li>Mid-position allows simultaneous operation</li>
              <li>Limited expansion options</li>
            </ul>
            <p><strong>Compliance note:</strong> Always check local Building Control requirements. Replacement boilers must meet current Part L and Boiler Plus standards, even if the original system was compliant at installation.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="BMS Integration and Smart Controls">
            <p>Building Management Systems (BMS) provide centralised monitoring and control of heating alongside other building services. Smart controls use connectivity and data analytics to optimise comfort and efficiency, meeting Boiler Plus requirements when properly specified.</p>
            <p><strong>BMS Communication Protocols</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BACnet/IP:</strong> Ethernet (Cat5e/6) — Building-wide HVAC control</li>
              <li><strong>BACnet MS/TP:</strong> RS-485 twisted pair — Field device connection</li>
              <li><strong>Modbus RTU:</strong> RS-485 twisted pair — Equipment monitoring</li>
              <li><strong>Modbus TCP:</strong> Ethernet — Plant room integration</li>
              <li><strong>KNX:</strong> TP/RF/IP variants — Building automation</li>
              <li><strong>OpenTherm:</strong> 2-wire connection — Thermostat-boiler interface</li>
            </ul>
            <p><strong>BMS Functions for Heating Systems</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Monitoring:</strong> Temperatures, valve positions, boiler status, energy consumption</li>
              <li><strong>Control:</strong> Setpoints, schedules, optimum start, weather compensation</li>
              <li><strong>Alarming:</strong> Fault detection, temperature excursions, equipment failures</li>
              <li><strong>Trending:</strong> Historical data logging for analysis and reporting</li>
              <li><strong>Integration:</strong> Coordination with ventilation, lighting, fire systems</li>
              <li><strong>Remote access:</strong> Web interface, mobile apps, cloud connectivity</li>
            </ul>
            <p><strong>Smart Thermostat Features (Boiler Plus Compliant)</strong></p>
            <p><strong>Automation features:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Learning algorithms that adapt to occupant behaviour</li>
              <li>Geofencing using smartphone location</li>
              <li>Occupancy detection via sensors</li>
              <li>Integration with calendars and schedules</li>
            </ul>
            <p><strong>Optimisation features:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Weather-adjusted heating curves</li>
              <li>Self-learning optimum start</li>
              <li>Energy usage reporting and insights</li>
              <li>OpenTherm modulation control</li>
            </ul>
            <p>Examples: Nest, Hive, tado, Honeywell T6R</p>
            <p><strong>Wireless Protocols</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Z-Wave (mesh)</li>
              <li>Zigbee (mesh)</li>
              <li>WiFi (direct)</li>
              <li>RF (433/868MHz)</li>
              <li>Thread/Matter</li>
            </ul>
            <p><strong>Cloud Services</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Remote access</li>
              <li>Data storage</li>
              <li>Firmware updates</li>
              <li>Voice control</li>
              <li>IFTTT integration</li>
            </ul>
            <p><strong>Energy Efficiency</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Demand response</li>
              <li>Load shifting</li>
              <li>Grid services</li>
              <li>Tariff optimisation</li>
              <li>Solar integration</li>
            </ul>
            <p><strong>Cybersecurity Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Secure network segmentation for BMS systems</li>
              <li>Regular firmware updates and patching</li>
              <li>Strong authentication and access control</li>
              <li>Encrypted communications (TLS/SSL)</li>
              <li>GDPR compliance for occupancy/usage data</li>
            </ul>
            <p><strong>Integration tip:</strong> When specifying BMS integration, ensure heating equipment has the required communication interfaces. Many modern boilers support BACnet, Modbus, or OpenTherm natively; older equipment may need gateway devices.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Heating Curve Selection</strong>
            </p>
            <p><strong>Scenario:</strong> Select the heating curve for a 1990s semi-detached house with standard insulation and correctly sized radiators.</p>
            <p>Building characteristics:</p>
            <p>Construction: 1990s cavity wall with partial fill</p>
            <p>Insulation: Reasonable but not modern standards</p>
            <p>Radiators: Sized for 75/65/20°C (flow/return/room)</p>
            <p>Design outdoor temp: -3°C</p>
            <p>Curve selection:</p>
            <p>Standard insulation building: Curve gradient 0.8 - 1.2</p>
            <p>Select: <strong>Curve 1.0</strong> as starting point</p>
            <p>Expected performance:</p>
            <p>At -3°C outdoor: Flow temp ~55-60°C</p>
            <p>At +10°C outdoor: Flow temp ~35-40°C</p>
            <p>Adjust based on observation:</p>
            <p>If rooms too cool in cold weather: Increase to 1.2</p>
            <p>If rooms overheat: Decrease to 0.8</p>
            <p>
              <strong>Example 2: Zone Valve Sizing</strong>
            </p>
            <p><strong>Scenario:</strong> Size zone valves for a domestic S-plan system with heating and hot water zones.</p>
            <p>System data:</p>
            <p>Heating load: 15kW</p>
            <p>Hot water cylinder: Indirect 180L</p>
            <p>Boiler flow rate: 1200 L/hr at delta-T 20K</p>
            <p>Heating zone flow calculation:</p>
            <p>Flow = Power / (4.2 x delta-T)</p>
            <p>Flow = 15000 / (4.2 x 20) = 179 L/hr</p>
            <p>Add 20% margin: 215 L/hr = 3.6 L/min</p>
            <p>Valve selection:</p>
            <p>Heating zone: 22mm 2-port valve (Kv = 2.5 to 4.0)</p>
            <p>Check pressure drop at 3.6 L/min is acceptable (&lt;10 kPa)</p>
            <p>Hot water zone:</p>
            <p>Coil load typically 3kW for 180L cylinder</p>
            <p>22mm valve adequate; 28mm if high recovery rate needed</p>
            <p>Result: 2 x 22mm zone valves (S-plan wiring)</p>
            <p>
              <strong>Example 3: Boiler Plus Compliance</strong>
            </p>
            <p><strong>Scenario:</strong> Specify compliant controls for a combi boiler installation in England.</p>
            <p>Installation requirements:</p>
            <p>Boiler: 30kW combi with OpenTherm</p>
            <p>Property: 3-bed semi, single heating zone</p>
            <p>Customer request: Smart phone control</p>
            <p>Boiler Plus options:</p>
            <p>1. Weather compensation built into boiler</p>
            <p>2. Load compensating thermostat</p>
            <p>3. Smart thermostat with automation + optimisation</p>
            <p>Selected solution:</p>
            <p>Smart thermostat (e.g., tado, Nest, Hive)</p>
            <p>Verification checklist:</p>
            <p>Has automation: Learning schedule/geofencing</p>
            <p>Has optimisation: Weather-adjusted start times</p>
            <p>OpenTherm compatible: Yes - modulating control</p>
            <p>Part L compliant: Room stat + TRVs + boiler interlock</p>
            <p>Document compliance on certificate/handover</p>
            <p>
              <strong>Example 4: BMS Integration Specification</strong>
            </p>
            <p><strong>Scenario:</strong> Specify BMS connection for a commercial boiler plant room.</p>
            <p>Plant room equipment:</p>
            <p>2 x 200kW cascade boilers</p>
            <p>4 x Variable speed pumps</p>
            <p>Weather compensation controller</p>
            <p>8 x Zone control valves</p>
            <p>BMS requirements:</p>
            <p>Protocol: BACnet/IP at supervisory level</p>
            <p>Protocol: Modbus RTU for boiler interface</p>
            <p>Protocol: BACnet MS/TP for zone controllers</p>
            <p>Points list (per boiler):</p>
            <p>AI: Flow temp, return temp, outdoor temp, flue temp</p>
            <p>DI: Boiler run status, fault status, flame status</p>
            <p>AO: Flow temp setpoint, modulation demand</p>
            <p>DO: Enable/disable, reset</p>
            <p>Network architecture:</p>
            <p>Boilers &gt; Gateway (Modbus to BACnet)</p>
            <p>Gateway &gt; Building controller (BACnet/IP)</p>
            <p>Zone controllers &gt; MS/TP network &gt; Router &gt; BACnet/IP</p>
            <p>Specify: Graphics, trending, alarms, schedules, reports</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Control System Selection Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Confirm boiler communication capability (OpenTherm, on/off, Modbus)</li>
              <li>Check Part L zone control requirements for building size</li>
              <li>Verify Boiler Plus compliance option for combi installations</li>
              <li>Assess customer smartphone/smart home preferences</li>
              <li>Consider future BMS or smart home integration requirements</li>
              <li>Specify compatible wiring centre for zone valve configuration</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Weather compensation saves: <strong>10-15%</strong> vs fixed temperature</li>
              <li>Optimum start saves: <strong>5-10%</strong> vs fixed schedules</li>
              <li>Part L minimum zones: <strong>2 zones</strong> for &gt;150m² dwellings</li>
              <li>Cylinder thermostat setting: <strong>60°C</strong> (Legionella control)</li>
              <li>Heating curve for modern builds: <strong>0.5-0.8</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>No boiler interlock:</strong> Boiler fires even when no demand - wire controls correctly</li>
                <li><strong>TRV in thermostat room:</strong> Causes control conflict - leave thermostat room without TRV</li>
                <li><strong>Wrong heating curve:</strong> Too steep = overheating; too shallow = underheating</li>
                <li><strong>Outdoor sensor location:</strong> Not north-facing or affected by sun/heat sources</li>
                <li><strong>Ignoring Boiler Plus:</strong> Installations without compliant controls fail inspection</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section1-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Radiator systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section1-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                System commissioning
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section1_5;
