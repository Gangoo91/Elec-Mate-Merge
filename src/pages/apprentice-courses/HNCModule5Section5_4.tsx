/**
 * Module 5 · Section 5 · Subsection 4 — BMS Commissioning
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Point-to-point verification, functional performance testing, graphics testing and integration — proving the BMS controls the building as designed.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'BMS Commissioning - HNC Module 5 Section 5.4';
const DESCRIPTION =
  'Master BMS commissioning procedures for building services: point-to-point verification, functional performance testing, graphics testing, alarm testing, trend logging, and system integration checks.';

const quickCheckQuestions = [
  {
    id: 'point-to-point-def',
    question: 'What is the primary purpose of point-to-point verification in BMS commissioning?',
    options: [
      'To test network connectivity',
      'To verify each field device connects to the correct controller address',
      'To calibrate all sensors',
      'To test the graphics interface',
    ],
    correctIndex: 1,
    explanation:
      'Point-to-point verification confirms that each field device (sensor, actuator, switch) is correctly wired to its designated controller input/output address as per the points schedule.',
  },
  {
    id: 'actuator-stroke',
    question: 'What does actuator stroke testing verify?',
    options: [
      'The speed of actuator movement only',
      'Full travel from 0-100% and correct direction of operation',
      'Only the electrical connections',
      'The firmware version of the actuator',
    ],
    correctIndex: 1,
    explanation:
      'Actuator stroke testing verifies full travel range (0-100%), correct direction (opening/closing), smooth operation without sticking, and accurate position feedback to the BMS.',
  },
  {
    id: 'graphics-testing',
    question: 'During graphics testing, what must be verified for each displayed value?',
    options: [
      'Only that it appears on screen',
      'Correct value, units, and real-time update from field devices',
      'The colour scheme only',
      'Only the font size',
    ],
    correctIndex: 1,
    explanation:
      'Graphics testing must verify that each displayed value shows the correct live data, appropriate engineering units, updates in real-time, and matches the actual field device reading.',
  },
  {
    id: 'trend-logging',
    question:
      'What is the typical minimum data retention period for BMS trend logs in commercial buildings?',
    options: ['1 week', '1 month', '3-12 months', '5 years'],
    correctIndex: 2,
    explanation:
      'Commercial buildings typically require 3-12 months of trend data retention for energy analysis, fault diagnosis, and compliance verification. Critical systems may require longer retention.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What document is essential for conducting point-to-point verification?',
    options: [
      'The building floor plans',
      'The points schedule with controller addresses',
      'The electrical schematic only',
      'The architectural drawings',
    ],
    correctAnswer: 1,
    explanation:
      'The points schedule lists every field device, its controller address, signal type, and engineering range. This is essential for verifying correct wiring and addressing.',
  },
  {
    id: 2,
    question: 'When testing a temperature sensor during commissioning, what should be verified?',
    options: [
      'Only that it displays a value',
      'Reading accuracy, response time, and correct scaling',
      'Only the wiring connections',
      'Only the physical mounting',
    ],
    correctAnswer: 1,
    explanation:
      'Temperature sensor verification includes checking reading accuracy against a reference, verifying correct scaling (e.g., 4-20mA to 0-50°C), response time to changes, and appropriate filtering.',
  },
  {
    id: 3,
    question:
      'A control valve actuator should close when receiving what signal in a fail-safe heating application?',
    options: ['Maximum signal (100%)', 'No signal (0%)', '50% signal', 'Pulsed signal'],
    correctAnswer: 1,
    explanation:
      'In fail-safe heating applications, control valves should close on loss of signal (0%) to prevent overheating. This is tested by removing the control signal and verifying the valve closes.',
  },
  {
    id: 4,
    question:
      'During functional performance testing of an AHU, what sequence should be tested first?',
    options: [
      'Cooling sequence',
      'Safety interlocks and fan proving',
      'Humidity control',
      'Scheduling',
    ],
    correctAnswer: 1,
    explanation:
      'Safety interlocks must be tested first to ensure protective functions work correctly. This includes fire damper proving, filter differential pressure trips, and fan status proving.',
  },
  {
    id: 5,
    question: 'What is the purpose of alarm testing in BMS commissioning?',
    options: [
      'To annoy the building occupants',
      'To verify alarms activate at correct setpoints and route to appropriate recipients',
      'To test the speakers only',
      'To check the network bandwidth',
    ],
    correctAnswer: 1,
    explanation:
      'Alarm testing verifies that each alarm activates at the correct setpoint, displays the correct priority and message, routes to appropriate recipients, and can be acknowledged and reset.',
  },
  {
    id: 6,
    question:
      'When integrating a BMS with a fire alarm system, what protocol is commonly used in the UK?',
    options: ['BACnet only', 'Modbus only', 'Volt-free contacts or BACnet/Modbus', 'WiFi'],
    correctAnswer: 2,
    explanation:
      'Fire alarm integration typically uses volt-free contacts for critical signals (fire mode, damper control) with BACnet or Modbus for monitoring. This ensures fail-safe operation.',
  },
  {
    id: 7,
    question: 'What should be verified during BMS network commissioning?',
    options: [
      'Only the IP addresses',
      'Network topology, addressing, communication speeds, and redundancy failover',
      'Only the cable colours',
      'Only the patch panel layout',
    ],
    correctAnswer: 1,
    explanation:
      'Network commissioning verifies correct topology, unique addressing, appropriate communication speeds, segment loading, and redundancy failover where specified.',
  },
  {
    id: 8,
    question:
      'A trend log shows a temperature oscillating rapidly between 18°C and 22°C. This likely indicates:',
    options: [
      'Normal operation',
      'A tuning problem with the PID controller',
      'A faulty trend log',
      'Correct setpoint operation',
    ],
    correctAnswer: 1,
    explanation:
      'Rapid oscillation around setpoint indicates poor PID tuning - typically too much proportional or integral gain. The controller needs retuning for stable operation.',
  },
  {
    id: 9,
    question: 'What documentation must be provided at BMS handover?',
    options: [
      'Only the user manual',
      'As-built drawings, points schedule, O&M manuals, and training records',
      'Only the training certificates',
      'Only the warranty information',
    ],
    correctAnswer: 1,
    explanation:
      'BMS handover requires comprehensive documentation: as-built drawings, points schedule, control strategies, O&M manuals, software backups, training records, and commissioning certificates.',
  },
  {
    id: 10,
    question:
      'During system integration testing, what must be verified between the BMS and lighting control system?',
    options: [
      'Only that lights can be switched',
      'Bi-directional communication, status feedback, and coordinated sequences',
      'Only the dimming levels',
      'Only the switch positions',
    ],
    correctAnswer: 1,
    explanation:
      'Integration testing verifies bi-directional communication (commands and feedback), correct status reporting, coordinated sequences (e.g., occupancy-based control), and failure mode behaviour.',
  },
];

const faqs = [
  {
    question: 'What is the difference between static and dynamic commissioning?',
    answer:
      'Static commissioning verifies individual components in isolation - checking wiring, addressing, and basic function of each device. Dynamic commissioning tests the system under actual operating conditions with varying loads, weather, and occupancy. Both are essential: static commissioning finds installation errors, while dynamic commissioning verifies control performance and system interactions.',
  },
  {
    question: 'How long should BMS commissioning take for a typical office building?',
    answer:
      'As a guideline, allow 1-2 days per AHU for full functional testing, plus time for each subsystem (lighting, metering, plant). A 10,000m² office might require 3-4 weeks of dedicated commissioning. Seasonal commissioning (testing heating and cooling modes) requires revisits. Rushing commissioning leads to ongoing operational issues.',
  },
  {
    question: "What should I do if a control sequence doesn't work as specified?",
    answer:
      'First, verify the points are reading correctly (sensor values, actuator feedback). Check the controller programming matches the control strategy document. Review any interlock conditions that might be blocking operation. If hardware is correct, the issue is likely software logic or tuning. Document any deviations and get design engineer approval for changes.',
  },
  {
    question: 'How do I test BMS integration with third-party systems?',
    answer:
      'Obtain protocol documentation and points lists from both systems. Verify physical connections (network/serial). Test basic communication first - can systems see each other? Then test individual points for correct mapping and scaling. Finally, test coordinated sequences and failure modes. Document all integration points and their behaviour.',
  },
];

const HNCModule5Section5_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5 · Subsection 4"
            title="BMS Commissioning"
            description="Point-to-point verification, functional performance testing, graphics testing, and system integration checks."
            tone="purple"
          />

          <TLDR
            points={[
              "BMS commissioning sequence: point-to-point → functional performance → graphics → integration → tuning → witness.",
              "Point-to-point: every input reads correctly, every output operates correctly — typically 2,000–10,000 points on a commercial building.",
              "Functional performance testing: each control loop and sequence verified against the cause-and-effect schedule.",
              "Graphics testing: every screen, every value, every navigation path checked — what the operator will see in service.",
              "Integration testing: BMS to fire alarm, security, lifts, metering — interfaces are where most defects hide.",
            ]}
          />

          <RegsCallout
            source="CIBSE Commissioning Code C: Automatic Controls"
            clause="CIBSE Code C provides guidance on the commissioning of automatic controls in building services including pre-commissioning checks, point-to-point testing, functional performance testing, sequence verification and seasonal commissioning."
            meaning={
              <>
                Code C is the technical reference for BMS commissioning. The cause-and-effect schedule is the heart of functional testing — every sequence stated, every condition tested. A BMS commissioned without C-style discipline will work in default state but fail unpredictably under control sequences.
              </>
            }
            cite="Source: CIBSE Commissioning Code C (refer to CIBSE published text for verbatim clauses)."
          />


          <LearningOutcomes
            outcomes={[
              'Execute systematic point-to-point verification procedures',
              'Calibrate sensors and verify actuator stroke operation',
              'Conduct functional performance testing of control sequences',
              'Test graphics displays for accuracy and real-time updates',
              'Verify alarm configuration and notification routing',
              'Commission trend logging and data archival systems',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Point-to-Point Verification">
            <p>
              Point-to-point verification is the foundation of BMS commissioning. This systematic
              process confirms that every field device is correctly wired to its designated
              controller input or output, with accurate signal conditioning and engineering unit
              scaling.
            </p>
            <p>
              <strong>Point-to-point testing procedure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> Obtain the points schedule with controller addresses
              </li>
              <li>
                <strong>Step 2:</strong> Verify physical connection at field device and controller
              </li>
              <li>
                <strong>Step 3:</strong> Apply known input and verify controller reading
              </li>
              <li>
                <strong>Step 4:</strong> Check engineering unit scaling and range
              </li>
              <li>
                <strong>Step 5:</strong> Document results and any discrepancies
              </li>
            </ul>
            <p>
              <strong>Input types and verification methods:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>4-20mA analogue:</strong> Inject 4mA, 12mA, 20mA with calibrator — Reading
                within ±2% of full scale
              </li>
              <li>
                <strong>0-10V analogue:</strong> Apply 0V, 5V, 10V reference — Reading within ±2% of
                full scale
              </li>
              <li>
                <strong>PT100/PT1000 RTD:</strong> Use decade box or reference probe — Reading
                within ±0.5°C
              </li>
              <li>
                <strong>Digital input:</strong> Force open/closed states — Correct state indication
              </li>
              <li>
                <strong>Pulse counter:</strong> Generate known pulse count — Count matches, units
                correct
              </li>
            </ul>
            <p>
              <strong>Sensor calibration — temperature sensors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Compare against calibrated reference thermometer</li>
              <li>Check at ambient and elevated temperature</li>
              <li>Verify response time (typically &lt;60 seconds)</li>
              <li>Confirm correct 2/3/4-wire configuration</li>
            </ul>
            <p>
              <strong>Sensor calibration — pressure sensors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Check zero offset with isolation valve closed</li>
              <li>Verify span against calibrated gauge</li>
              <li>Confirm correct pressure type (gauge/differential)</li>
              <li>Test at 25%, 50%, 75% of range</li>
            </ul>
            <p>
              <strong>Quality tip:</strong> Record all point-to-point results on signed test sheets.
              This documentation is essential for handover and future fault diagnosis.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Actuator Testing and Control Sequence Verification">
            <p>
              Actuator stroke testing confirms that control valves and dampers operate correctly
              across their full range. Functional performance testing then verifies complete control
              sequences under realistic operating conditions.
            </p>
            <p>
              <strong>Actuator stroke test procedure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Full stroke:</strong> Command 0% to 100% and back, verify full travel
              </li>
              <li>
                <strong>Direction:</strong> Confirm opening/closing matches design intent
              </li>
              <li>
                <strong>Position feedback:</strong> Verify feedback signal matches command
              </li>
              <li>
                <strong>Fail position:</strong> Remove signal, confirm correct fail-safe state
              </li>
              <li>
                <strong>Smooth operation:</strong> Check for sticking, hunting, or noise
              </li>
            </ul>
            <p>
              <strong>Common actuator types and fail modes:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>LTHW heating valve:</strong> Spring return, 0-10V — Closed (prevent
                overheating)
              </li>
              <li>
                <strong>CHW cooling valve:</strong> Spring return, 0-10V — Closed (prevent
                undercooling)
              </li>
              <li>
                <strong>Fresh air damper:</strong> Spring return modulating — Closed (weather
                protection)
              </li>
              <li>
                <strong>Fire/smoke damper:</strong> Spring return on/off — Closed (fire compartment)
              </li>
              <li>
                <strong>Bypass damper:</strong> Electric modulating — Application dependent
              </li>
            </ul>
            <p>
              <strong>Functional performance test — AHU example. For an air handling unit, test the
              following sequences in order:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Safety interlocks:</strong> Fire alarm input, smoke detection, filter DP
                trip
              </li>
              <li>
                <strong>Start/stop sequence:</strong> Damper opening, fan start delay, proving
              </li>
              <li>
                <strong>Heating sequence:</strong> Frost protection, pre-heat control, modulation
              </li>
              <li>
                <strong>Cooling sequence:</strong> Free cooling, mechanical cooling staging
              </li>
              <li>
                <strong>Economy cycle:</strong> Mixed air temperature control, damper modulation
              </li>
              <li>
                <strong>Humidity control:</strong> Humidification/dehumidification sequences
              </li>
              <li>
                <strong>Setback/unoccupied:</strong> Night setback, weekend operation
              </li>
            </ul>
            <p>
              <strong>Testing tip:</strong> Use temporary setpoint overrides to force control
              sequences. Reset to design values after testing and document all changes.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Graphics Testing and Alarm Verification">
            <p>
              The BMS graphical interface is the operator's primary interaction with building
              systems. Graphics testing ensures accurate display of system status, while alarm
              testing verifies that abnormal conditions are detected and communicated appropriately.
            </p>
            <p>
              <strong>Graphics test checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>All points display correct live values</li>
              <li>Engineering units shown correctly (°C, Pa, l/s)</li>
              <li>Decimal places appropriate for resolution</li>
              <li>Update rate acceptable (&lt;5 seconds typical)</li>
              <li>Equipment status symbols change correctly</li>
              <li>Colour coding follows site standard</li>
              <li>Navigation between screens logical</li>
              <li>All hyperlinks and buttons functional</li>
            </ul>
            <p>
              <strong>Operator controls testing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Setpoint adjustment within limits works</li>
              <li>Manual override commands execute</li>
              <li>Schedule editing saves correctly</li>
              <li>User access levels correctly restrict functions</li>
              <li>Trend graph displays historical data</li>
              <li>Report generation functions work</li>
              <li>System backup can be created</li>
              <li>Logout/timeout works correctly</li>
            </ul>
            <p>
              <strong>Alarm testing methodology:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>High/low limit:</strong> Adjust setpoint or simulate value — Alarm at
                correct threshold
              </li>
              <li>
                <strong>Equipment fault:</strong> Simulate run command/status mismatch — Fault
                detected within delay time
              </li>
              <li>
                <strong>Communication loss:</strong> Disconnect controller network cable — Offline
                alarm generated
              </li>
              <li>
                <strong>Fire mode:</strong> Trigger fire alarm interface — Correct system response
              </li>
              <li>
                <strong>Security breach:</strong> Open monitored door/panel — Alarm with correct
                location
              </li>
            </ul>
            <p>
              <strong>Alarm routing and escalation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Priority 1 (Critical):</strong> Immediate notification - SMS, auto-dialler,
                on-screen flash
              </li>
              <li>
                <strong>Priority 2 (Urgent):</strong> Within 15 minutes - Email, workstation alert
              </li>
              <li>
                <strong>Priority 3 (Non-urgent):</strong> Logged for review - Alarm summary, daily
                report
              </li>
              <li>
                <strong>Test each notification path:</strong> Confirm SMS delivery, email receipt,
                escalation timing
              </li>
            </ul>
            <p>
              <strong>Best practice:</strong> Involve the building operator in graphics testing.
              Their feedback on usability is invaluable for optimising the interface.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Trend Logging and System Integration">
            <p>
              Trend logging captures historical data essential for energy analysis, fault diagnosis,
              and performance verification. System integration testing ensures the BMS communicates
              correctly with all connected building systems.
            </p>
            <p>
              <strong>Trend logging configuration:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Energy meters:</strong> 15-30 minutes — 2-5 years (billing data)
              </li>
              <li>
                <strong>Zone temperatures:</strong> 5-15 minutes — 3-12 months
              </li>
              <li>
                <strong>Plant status:</strong> Change of value — 3-12 months
              </li>
              <li>
                <strong>Control outputs:</strong> 1-5 minutes (tuning) — 1-3 months
              </li>
              <li>
                <strong>External conditions:</strong> 15-30 minutes — 12 months+
              </li>
            </ul>
            <p>
              <strong>Trend logging verification tests:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Data capture:</strong> Verify values are being logged at specified intervals
              </li>
              <li>
                <strong>Timestamp accuracy:</strong> Confirm time synchronisation across all
                controllers
              </li>
              <li>
                <strong>Storage capacity:</strong> Calculate required storage, verify archival
                process
              </li>
              <li>
                <strong>Data export:</strong> Test CSV/Excel export for external analysis
              </li>
              <li>
                <strong>Graph display:</strong> Verify historical trends display correctly
              </li>
            </ul>
            <p>
              <strong>Fire alarm integration:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fire mode signal stops AHUs</li>
              <li>Smoke dampers close on zone alarm</li>
              <li>Stairwell pressurisation activates</li>
              <li>Lift recall to ground floor</li>
              <li>Status displayed on BMS graphics</li>
            </ul>
            <p>
              <strong>Lighting control integration:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Occupancy status from DALI/KNX</li>
              <li>Scene selection commands</li>
              <li>Daylight dimming feedback</li>
              <li>Emergency lighting status</li>
              <li>After-hours override requests</li>
            </ul>
            <p>
              <strong>Common integration protocols:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BACnet IP/MSTP:</strong> Primary BMS network — Device discovery, point
                mapping
              </li>
              <li>
                <strong>Modbus TCP/RTU:</strong> Meters, VFDs, chillers — Register addresses,
                scaling factors
              </li>
              <li>
                <strong>DALI:</strong> Lighting control — Group addressing, scene recall
              </li>
              <li>
                <strong>KNX:</strong> Lighting, blinds, HVAC terminals — Group addresses, telegram
                routing
              </li>
              <li>
                <strong>M-Bus:</strong> Heat/water/gas meters — Primary address, data format
              </li>
            </ul>
            <p>
              <strong>Integration tip:</strong> Always test failure modes. What happens if
              communication is lost? Verify systems fail to a safe state and generate appropriate
              alarms.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Point-to-point verification:</strong> Verify a duct temperature
              sensor wired to controller input AI-03, scaled 0-50°C on 4-20mA.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Identify sensor location and verify wiring to AI-03 terminals</li>
              <li>2. Connect 4-20mA calibrator in series with sensor</li>
              <li>3. Inject 4mA → Controller should read 0°C (±1°C)</li>
              <li>4. Inject 12mA → Controller should read 25°C (±1°C)</li>
              <li>5. Inject 20mA → Controller should read 50°C (±1°C)</li>
              <li>
                <strong>Result:</strong> All readings within tolerance - PASS
              </li>
              <li>Document on test sheet with date, tester, and readings</li>
            </ul>
            <p>
              <strong>Example 2 — Actuator stroke test:</strong> Test a heating valve actuator
              (spring return, fail closed) with 0-10V position feedback.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Command 0% → Valve closes, feedback reads 0V (0%)</li>
              <li>2. Command 50% → Valve opens to mid-position, feedback ~5V</li>
              <li>3. Command 100% → Valve fully open, feedback reads 10V (100%)</li>
              <li>4. Remove control signal → Valve returns to closed (spring return)</li>
              <li>Full stroke time: 45 seconds (within specification)</li>
              <li>No sticking or noise during travel</li>
              <li>Feedback tracks within ±5% of command</li>
              <li>
                <strong>Result:</strong> Actuator operation correct - PASS
              </li>
            </ul>
            <p>
              <strong>Example 3 — Alarm test procedure:</strong> Test high temperature alarm for
              server room (setpoint 25°C, alarm at 28°C).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Current room temperature: 22°C (normal operation)</li>
              <li>2. Lower alarm setpoint temporarily to 21°C</li>
              <li>3. Verify alarm generates within 30 seconds:</li>
              <li>On-screen: Red flashing indicator, audible alert</li>
              <li>Email notification: Received by FM team</li>
              <li>SMS: Received by on-call engineer</li>
              <li>4. Acknowledge alarm → Flashing stops, remains red</li>
              <li>5. Reset alarm setpoint to 28°C → Alarm clears</li>
              <li>
                <strong>Result:</strong> Alarm routing correct - PASS
              </li>
              <li>Note: Reset all setpoints to design values</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Commissioning preparation checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Obtain latest points schedule and control strategy documents</li>
              <li>Verify all controllers powered and communicating</li>
              <li>Confirm plant is safe to operate (mechanical completion)</li>
              <li>Coordinate with other trades for access and isolation</li>
              <li>Prepare test equipment: calibrator, multimeter, laptop</li>
              <li>Have blank test sheets ready for documentation</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Analogue input accuracy: <strong>±2% of full scale</strong>
              </li>
              <li>
                Temperature sensor tolerance: <strong>±0.5°C</strong>
              </li>
              <li>
                Actuator position feedback: <strong>±5% of command</strong>
              </li>
              <li>
                Graphics update rate: <strong>&lt;5 seconds</strong>
              </li>
              <li>
                Trend log retention: <strong>3-12 months minimum</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common commissioning faults"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Swapped wiring:</strong> Sensors connected to wrong controller addresses
                </li>
                <li>
                  <strong>Incorrect scaling:</strong> 4-20mA range configured as 0-20mA
                </li>
                <li>
                  <strong>Reversed actuators:</strong> Valve opens when it should close
                </li>
                <li>
                  <strong>Missing interlocks:</strong> Safety functions not programmed
                </li>
                <li>
                  <strong>Network conflicts:</strong> Duplicate IP addresses or device IDs
                </li>
              </ul>
            }
            doInstead="Run point-to-point against the points schedule signal-by-signal, verify scaling at three injection points, prove fail-safe direction on every actuator, test interlocks before live sequences, and check device addressing for duplicates before commissioning."
          />

          <SectionRule />

          <Scenario
            title="BMS handed over without integration testing — fire alarm fails to isolate"
            situation={
              <>
                A new commercial building handover. BMS commissioned standalone, fire alarm commissioned standalone, integration "to be done at site" but never properly executed. Six weeks after handover, a fire alarm activation fails to shut down the supply AHUs. Investigation: the BMS does not act on the fire alarm signal — the integration was never tested.
              </>
            }
            whatToDo={
              <>
                Integration testing is mandatory before handover. The cause-and-effect schedule lists every interface: fire→AHU shutdown, fire→damper close, fire→lift recall, security→access lock, BMS→meter→main. Test each combination. Witness with the client. Document the result. Any failure prevents handover. Update commissioning programme to allow time — typically 1–2 weeks for integration testing on a commercial building, longer on a hospital.
              </>
            }
            whyItMatters={
              <>
                Integration is where commissioning lives or dies. A standalone-commissioned BMS may pass its own tests but fail in service when the building behaves as a system. Integration testing is what proves the building works as designed, not just that the components work in isolation.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Sequence: point-to-point → functional → graphics → integration → tuning → witness.",
              "Point-to-point: every input/output verified — 2,000–10,000 points on a commercial building.",
              "Functional performance testing against cause-and-effect schedule.",
              "Graphics testing: operator screens, values, navigation — what the FM team will see.",
              "Integration testing with fire, security, lifts, metering — most defects hide here.",
              "CIBSE Code C is the technical reference.",
              "Tuning post-occupancy as building loads stabilise.",
              "Witness testing with operator attendance — they need to see the building they will run.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Commissioning and handover
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section5-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Witness testing
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section5_4;
