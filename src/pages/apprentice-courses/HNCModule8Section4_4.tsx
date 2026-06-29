/**
 * Module 8 · Section 4 · Subsection 4 — Motor Protection
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Comprehensive protection systems for HVAC motors: overload, phase failure, earth fault and thermistor protection
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

const TITLE = 'Motor Protection - HNC Module 8 Section 4.4 | HVAC Systems';
const DESCRIPTION =
  'Master motor protection systems for HVAC applications: thermal overload relays, electronic protection, phase failure detection, earth fault protection and motor protection relay functions to BS 7671.';

const quickCheckQuestions = [
  {
    id: 'overload-class',
    question: 'What does an overload relay Class 10 rating indicate?',
    options: [
      '10 minute cooling time',
      'Maximum current rating of 10A',
      'Trips within 10 seconds at 7.2× FLC',
      '10% tolerance on settings',
    ],
    correctIndex: 2,
    explanation:
      'Class 10 indicates the relay will trip within 10 seconds when exposed to 7.2 times full load current. This is standard for general motor applications. Class 20 and 30 provide longer trip times for motors with heavy starting loads.',
  },
  {
    id: 'phase-failure',
    question: 'What is single-phasing and why is it dangerous for motors?',
    options: [
      'Running a three-phase motor on a single-phase supply by design',
      'A momentary voltage dip that causes the motor to slow briefly',
      'Connecting the three phases in the wrong rotation sequence',
      'Loss of one phase causing remaining windings to carry excess current',
    ],
    correctIndex: 3,
    explanation:
      'Single-phasing occurs when one phase is lost. The motor attempts to continue running on two phases, causing the remaining windings to carry up to 173% of normal current. This rapidly overheats the motor and can cause winding failure within minutes.',
  },
  {
    id: 'thermistor-type',
    question: 'How does a PTC thermistor respond to rising temperature?',
    options: [
      'Resistance remains constant until failure',
      'Resistance increases sharply above trip point',
      'Resistance decreases linearly',
      'Resistance oscillates with temperature',
    ],
    correctIndex: 1,
    explanation:
      'PTC (Positive Temperature Coefficient) thermistors exhibit a sharp increase in resistance when they reach their designed switching temperature. This characteristic makes them ideal for motor winding protection as they can trigger a relay when the winding temperature becomes dangerous.',
  },
  {
    id: 'earth-fault',
    question: 'What is the purpose of earth fault protection on a motor circuit?',
    options: [
      'To limit the starting current drawn by the motor windings',
      'To prevent the motor running in the wrong direction',
      'To detect current flowing to earth indicating insulation failure',
      'To balance the load evenly across all three phases',
    ],
    correctIndex: 2,
    explanation:
      'Earth fault protection detects current flowing to earth, which indicates insulation breakdown. This is critical for safety as it prevents electric shock hazards and fires. BS 7671 requires earth fault protection for motor circuits, typically using RCDs or dedicated earth fault relays.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What type of overload relay uses a bimetallic strip mechanism?',
    options: [
      'Electronic overload relay',
      'Thermal overload relay',
      'Magnetic overload relay',
      'Solid-state overload relay',
    ],
    correctAnswer: 1,
    explanation:
      'Thermal overload relays use bimetallic strips that bend when heated by motor current. The strip deflection trips the relay contacts when current exceeds the set value for sufficient time. They provide an inherent time-delay characteristic similar to motor heating.',
  },
  {
    id: 2,
    question: 'What is the advantage of electronic overload relays over thermal types?',
    options: [
      'They do not require any upstream short-circuit protection',
      'They provide instantaneous interruption of fault currents',
      'Adjustable trip class and more accurate protection',
      'They allow the motor to start without drawing inrush current',
    ],
    correctAnswer: 2,
    explanation:
      'Electronic overload relays offer adjustable trip class (10, 20, 30), more accurate current measurement, phase loss detection, ground fault protection, and communication capabilities. They provide superior protection customisation for different motor applications.',
  },
  {
    id: 3,
    question: 'What current level typically trips a Class 10 overload relay within 10 seconds?',
    options: [
      '1.5 times FLC',
      '1.05 times FLC',
      '10 times FLC',
      '7.2 times FLC',
    ],
    correctAnswer: 3,
    explanation:
      "Class 10 relays trip within 10 seconds at 7.2 times full load current. At lower overload levels, trip times are longer - for example, at 1.5× FLC, a Class 10 relay may take several minutes to trip, matching the motor's thermal capacity.",
  },
  {
    id: 4,
    question: 'Why is phase sequence (rotation) protection important for some motor applications?',
    options: [
      'It ensures correct rotation direction for pumps, fans and conveyors',
      'It prevents the motor from drawing excessive starting current',
      'It detects the loss of one supply phase during running',
      'It limits the winding temperature during sustained overload',
    ],
    correctAnswer: 0,
    explanation:
      'Phase sequence protection ensures the motor rotates in the correct direction. Incorrect rotation can damage pumps (running dry), fans (reversed airflow), lifts (dangerous operation), and conveyors (product damage). Phase sequence relays prevent starting if phases are incorrectly connected.',
  },
  {
    id: 5,
    question: 'What is the typical response temperature for PTC thermistors in motor windings?',
    options: [
      '80°C - 100°C',
      '120°C - 155°C',
      '180°C - 200°C',
      '50°C - 70°C',
    ],
    correctAnswer: 1,
    explanation:
      "PTC thermistors for motor protection typically have response temperatures between 120°C and 155°C, matched to the motor's insulation class. Class F insulation (155°C max) motors use 150°C thermistors to provide protection before insulation damage occurs.",
  },
  {
    id: 6,
    question:
      'How many thermistors are typically embedded in a three-phase motor for winding protection?',
    options: [
      '1 (single sensor)',
      '2 (for redundancy)',
      '3 (one per phase winding)',
      '6 (two per phase)',
    ],
    correctAnswer: 2,
    explanation:
      'Three-phase motors typically have three PTC thermistors embedded in the stator windings, one per phase. These are connected in series to a thermistor relay. If any winding overheats, its thermistor resistance increases sharply, triggering the protection relay.',
  },
  {
    id: 7,
    question: 'What is the difference between NTC and PTC thermistors in motor protection?',
    options: [
      'NTC measures current while PTC measures winding voltage',
      'NTC is fitted externally while PTC is embedded in the windings',
      'Both have identical resistance characteristics with temperature',
      'NTC resistance decreases with temperature, PTC increases sharply at trip point',
    ],
    correctAnswer: 3,
    explanation:
      'NTC (Negative Temperature Coefficient) thermistors have decreasing resistance as temperature rises - used for continuous temperature monitoring. PTC thermistors have sharply increasing resistance at a specific trip point - used for over-temperature protection switching.',
  },
  {
    id: 8,
    question:
      'Which earth fault setting typically provides fire protection for a fixed motor circuit?',
    options: [
      '100-300 mA',
      '6-10 mA',
      '30 mA',
      '1-3 A',
    ],
    correctAnswer: 0,
    explanation:
      'Earth fault settings vary by application: 30 mA provides personnel protection, while 100-300 mA is typically used to provide fire protection for fixed equipment such as motors. Higher settings may be used where nuisance tripping must be avoided.',
  },
  {
    id: 9,
    question: 'What protection does a motor protection relay (MPR) typically NOT provide?',
    options: [
      'Overload protection',
      'Short-circuit protection',
      'Phase failure protection',
      'Stall protection',
    ],
    correctAnswer: 1,
    explanation:
      'Motor protection relays typically provide overload, phase failure, phase imbalance, earth fault, and stall protection, but NOT short-circuit protection. Short-circuit protection requires fast-acting fuses or MCCBs rated for fault current interruption upstream of the MPR.',
  },
  {
    id: 10,
    question: 'What indicates a motor is stalling according to protection relay criteria?',
    options: [
      'Current falling below the no-load value with the motor running',
      'A loss of one supply phase while the motor is at full speed',
      'Current at or above locked rotor current for extended period',
      'A rise in winding resistance measured by the thermistor relay',
    ],
    correctAnswer: 2,
    explanation:
      'A stalled motor draws locked rotor current (typically 6-8× FLC) but produces no rotation. Stall protection detects this condition - high current with no speed signal or extended high current duration - and trips the motor before thermal damage occurs.',
  },
  {
    id: 11,
    question:
      'According to BS 7671, what type of protective device is required for motor circuits?',
    options: [
      'A Type B MCB sized exactly to the motor full load current',
      'A 30 mA RCD as the sole means of overcurrent protection',
      'A semi-enclosed rewireable fuse rated below the running current',
      'A device suitable for the motor starting current characteristics',
    ],
    correctAnswer: 3,
    explanation:
      "BS 7671 requires protective devices suitable for the motor's characteristics. This includes type D MCBs or motor-rated MCCBs that can withstand starting currents (typically 6-8× FLC) without nuisance tripping, combined with separate overload protection.",
  },
  {
    id: 12,
    question: 'What is the purpose of the manual reset function on overload relays?',
    options: [
      'To force investigation of the trip cause before restart',
      'To allow the motor to restart automatically once it has cooled',
      'To reduce the trip class while the motor is starting',
      'To bypass the overload protection during commissioning',
    ],
    correctAnswer: 0,
    explanation:
      'Manual reset requires an operator to physically reset the relay before the motor can restart. This forces investigation of why the overload occurred, preventing automatic restart that could damage an overheated motor or indicate a persistent fault condition.',
  },
];

const faqs = [
  {
    question: 'Why do motors need both overload AND short-circuit protection?',
    answer:
      'Overload relays have intentional time delays to allow normal starting currents (6-8× FLC) without tripping. They cannot interrupt high fault currents quickly enough to prevent damage. Short-circuit protection (fuses or MCCBs) provides instantaneous interruption of fault currents. Together they provide complete protection - the short-circuit device handles faults, while the overload relay protects against sustained overcurrent conditions.',
  },
  {
    question: 'How do I select the correct overload class for a motor application?',
    answer:
      'Class 10 suits most HVAC applications with standard starting times (under 10 seconds). Use Class 20 for motors with moderate inertia loads requiring 10-20 second starts, and Class 30 for high inertia applications like large fans or centrifugal equipment. If unsure, start with Class 10 - if nuisance tripping occurs during starting, move to a higher class.',
  },
  {
    question: 'Can I use an RCD for motor earth fault protection?',
    answer:
      'Yes, but with caution. Standard 30mA RCDs may nuisance trip due to motor capacitive leakage currents, especially with VSDs. Use time-delayed RCDs (Type S) or higher current ratings (100-300mA) for motor circuits. Some VSD applications require special RCD types (Type B) due to DC fault current components. Always verify RCD compatibility with the specific motor and drive combination.',
  },
  {
    question: 'What happens if thermistor protection wiring is damaged?',
    answer:
      'PTC thermistor circuits are designed fail-safe. If wiring is open-circuit, the thermistor relay sees infinite resistance (as if all thermistors are hot) and trips the motor. This prevents motor operation without functioning temperature protection. Always verify thermistor circuit integrity during commissioning and periodic maintenance.',
  },
  {
    question: 'How often should motor protection devices be tested?',
    answer:
      'BS 7671 requires periodic inspection and testing at intervals appropriate to the installation type. For commercial HVAC, annual testing is typical. Test overload relays by secondary injection, verify thermistor circuit continuity, check earth fault device operation with test buttons, and confirm phase failure relay response. Document all test results for compliance records.',
  },
  {
    question: 'Why do some motors have both embedded thermistors AND external overload relays?',
    answer:
      'Embedded thermistors measure actual winding temperature directly but have slow response to rapid overloads. External overload relays respond quickly to current increases but estimate temperature from current. Using both provides comprehensive protection: thermistors catch slow thermal build-up and ambient issues, while overload relays catch rapid overcurrent events before they damage windings.',
  },
];

const HNCModule8Section4_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section4")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 4 · Subsection 4"
            title="Motor Protection"
            description="Comprehensive protection systems for HVAC motors: overload, phase failure, earth fault and thermistor protection"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Explain thermal and electronic overload relay operation",
              "Select appropriate overload class for motor applications",
              "Understand phase failure and phase reversal protection",
              "Apply thermistor protection using PTC and NTC sensors",
              "Design earth fault protection for motor circuits",
              "Specify motor protection relays to BS 7671 requirements",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Overload Protection">
            <p>Overload protection prevents motor damage from sustained overcurrent conditions that cause excessive winding temperatures. Unlike short-circuit protection, overload devices have intentional time delays to permit normal motor starting currents.</p>
            <p><strong>Thermal Overload Relays</strong></p>
            <p>Thermal overload relays use bimetallic strips heated by motor current. As current increases, the strips bend until they trip the relay contacts. This provides an inverse-time characteristic that matches motor heating patterns.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Operation:</strong> Bimetallic strips bend proportionally to I²t heating</li>
              <li><strong>Reset:</strong> Manual or automatic after cooling period</li>
              <li><strong>Adjustment:</strong> Current dial typically 0.8-1.0× motor FLC</li>
              <li><strong>Temperature compensation:</strong> Ambient compensated types available</li>
              <li><strong>Limitations:</strong> Fixed trip class, no phase loss detection</li>
            </ul>
            <p><strong>Electronic Overload Relays</strong></p>
            <p>Electronic overload relays use current transformers and microprocessor control to provide accurate, adjustable protection with additional features not possible with thermal types.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Current measurement:</strong> True RMS via current transformers</li>
              <li><strong>Trip class:</strong> Adjustable Class 5, 10, 15, 20, 30</li>
              <li><strong>Phase loss:</strong> Built-in single-phasing detection</li>
              <li><strong>Ground fault:</strong> Optional earth leakage monitoring</li>
              <li><strong>Communications:</strong> Modbus, Profibus for BMS integration</li>
              <li><strong>Diagnostics:</strong> Trip history, current display, fault logs</li>
            </ul>
            <p><strong>Overload Trip Classes</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Class 5:</strong> &lt; 5 seconds — Submersible pumps, quick-start motors</li>
              <li><strong>Class 10:</strong> &lt; 10 seconds — General purpose, most HVAC applications</li>
              <li><strong>Class 20:</strong> &lt; 20 seconds — Moderate inertia loads, larger fans</li>
              <li><strong>Class 30:</strong> &lt; 30 seconds — High inertia, heavy flywheel loads</li>
            </ul>
            <p><strong>Setting Overload Relays</strong></p>
            <p>Set the overload current to the motor nameplate full load current (FLC), not the cable or circuit breaker rating. If the motor FLC is between dial settings, set to the next highest value. Never exceed 1.0× FLC setting unless motor is underloaded.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Phase Failure and Reversal Protection">
            <p>Three-phase motors are vulnerable to supply faults that can cause rapid overheating or incorrect operation. Phase monitoring relays detect these conditions and prevent motor damage.</p>
            <p><strong>Single-Phasing (Phase Failure)</strong></p>
            <p>Single-phasing occurs when one supply phase is lost due to a blown fuse, loose connection, or supply fault. The motor attempts to continue running on two phases with severe consequences.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Effect:</strong> Remaining windings carry up to 173% normal current</li>
              <li><strong>Heating:</strong> Localised hotspots cause rapid insulation degradation</li>
              <li><strong>Torque:</strong> Reduced to approximately 50% of normal</li>
              <li><strong>Starting:</strong> Motor will not start from rest on two phases</li>
              <li><strong>Detection:</strong> Current imbalance or negative sequence monitoring</li>
            </ul>
            <p><strong>Phase Imbalance</strong></p>
            <p>Even small voltage imbalances between phases cause disproportionate current imbalances and additional motor heating. Phase monitoring relays can detect this condition.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1%:</strong> 6-10% — +2%</li>
              <li><strong>2%:</strong> 12-20% — +8%</li>
              <li><strong>3%:</strong> 18-30% — +18%</li>
              <li><strong>5%:</strong> 30-50% — +50%</li>
            </ul>
            <p>Motors should be derated or protected if supply imbalance exceeds 2%</p>
            <p><strong>Phase Sequence (Reversal) Protection</strong></p>
            <p>Phase sequence relays ensure the motor rotates in the correct direction by detecting the order of phase voltages. Incorrect sequence prevents the motor from starting.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pumps:</strong> Reverse rotation causes cavitation or dry running</li>
              <li><strong>Fans:</strong> Incorrect airflow direction, reduced efficiency</li>
              <li><strong>Lifts:</strong> Dangerous incorrect travel direction</li>
              <li><strong>Conveyors:</strong> Product damage, safety hazards</li>
              <li><strong>Compressors:</strong> Oil pump failure, bearing damage</li>
            </ul>
            <p><strong>Phase Monitoring Relay Functions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Phase failure (single-phasing)</li>
              <li>Phase sequence (rotation direction)</li>
              <li>Phase imbalance (voltage asymmetry)</li>
              <li>Under/over voltage protection</li>
              <li>Under/over frequency detection</li>
            </ul>
            <p><strong>Typical Settings</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Phase loss: Instant trip</li>
              <li>Phase imbalance: 5-10% threshold</li>
              <li>Undervoltage: 85-90% nominal</li>
              <li>Overvoltage: 105-110% nominal</li>
              <li>Trip delay: 0.1-10 seconds adjustable</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Thermistor Protection (PTC and NTC)">
            <p>Thermistors embedded in motor windings provide direct temperature measurement, detecting overheating regardless of the cause - overload, blocked ventilation, high ambient, or phase imbalance. This is the most reliable form of winding protection.</p>
            <p><strong>PTC Thermistors (Positive Temperature Coefficient)</strong></p>
            <p>PTC thermistors exhibit a sharp resistance increase at a specific temperature. Below this point, resistance is low (typically 100-250Ω). Above the switching temperature, resistance increases rapidly to several thousand ohms.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Normal operation:</strong> Low resistance (50-250Ω per sensor)</li>
              <li><strong>Trip point:</strong> Sharp increase at rated temperature</li>
              <li><strong>Tripped state:</strong> High resistance (&gt;3000Ω)</li>
              <li><strong>Connection:</strong> Three sensors in series to relay</li>
              <li><strong>Response time:</strong> Relatively slow (seconds to minutes)</li>
            </ul>
            <p><strong>PTC Temperature Ratings by Insulation Class</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Class B:</strong> 130°C — 120°C - 125°C</li>
              <li><strong>Class F:</strong> 155°C — 145°C - 150°C</li>
              <li><strong>Class H:</strong> 180°C — 170°C - 175°C</li>
            </ul>
            <p>PTC sensors trip 5-10°C below maximum to prevent insulation damage</p>
            <p><strong>NTC Thermistors (Negative Temperature Coefficient)</strong></p>
            <p>NTC thermistors have gradually decreasing resistance as temperature rises, providing continuous analogue temperature measurement rather than a switching function.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Characteristic:</strong> Smooth resistance decrease with temperature</li>
              <li><strong>Use:</strong> Temperature monitoring and display</li>
              <li><strong>Advantage:</strong> Continuous measurement, trend analysis</li>
              <li><strong>Application:</strong> BMS integration, predictive maintenance</li>
              <li><strong>Typical values:</strong> 10kΩ at 25°C, 1-2kΩ at 100°C</li>
            </ul>
            <p><strong>Thermistor Relay Operation</strong></p>
            <p>The thermistor relay monitors total resistance of the series-connected sensors:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Normal:</strong> Total R typically 300-750Ω (3 × 100-250Ω)</li>
              <li><strong>Pre-warning:</strong> Optional alarm at 1500Ω</li>
              <li><strong>Trip:</strong> Relay operates above 3000-3600Ω</li>
              <li><strong>Open circuit:</strong> Infinite R = trips (fail-safe)</li>
              <li><strong>Short circuit:</strong> Very low R = may trip or alarm</li>
            </ul>
            <p><strong>Best practice:</strong> Use thermistor protection in combination with overload relays for comprehensive coverage - thermistors catch slow thermal build-up, overloads catch rapid current increases.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Earth Fault Protection and Motor Protection Relays">
            <p>Earth fault protection detects insulation breakdown allowing current to flow to earth. Motor protection relays (MPRs) combine multiple protection functions in a single device for comprehensive motor circuit protection.</p>
            <p><strong>Earth Fault Protection Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>RCDs (Residual Current Devices):</strong> <span> Detect imbalance between line and neutral currents indicating earth leakage. Standard 30mA for personnel protection, 100-300mA for equipment protection. May nuisance trip with VSD harmonic currents. </span></li>
              <li><strong>Core Balance CT (CBCT):</strong> <span> All phase and neutral conductors pass through a single CT. Any earth fault current creates an imbalance detected by the relay. More suitable for motor circuits than standard RCDs. </span></li>
              <li><strong>Zero Sequence CT:</strong> <span> Measures the sum of three phase currents. In a balanced system this equals zero. Earth faults create a non-zero sum current proportional to fault severity. </span></li>
            </ul>
            <p><strong>BS 7671 Earth Fault Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Personnel protection:</strong> 30mA / 40ms — Socket outlets, portable equipment</li>
              <li><strong>Fixed equipment:</strong> 100-300mA — Fire protection, motors</li>
              <li><strong>TT system motors:</strong> ≤1A typically — Based on Ra value</li>
              <li><strong>VSD applications:</strong> Type B RCD — DC sensitive type required</li>
            </ul>
            <p><strong>Motor Protection Relay (MPR) Functions</strong></p>
            <p>Modern MPRs combine multiple protection functions with programmable settings, fault logging, and communication interfaces. They provide comprehensive motor protection in a single device.</p>
            <p><strong>Standard Protection Functions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Thermal overload (49)</li>
              <li>Phase failure (47)</li>
              <li>Phase imbalance (46)</li>
              <li>Earth fault (50N/51N)</li>
              <li>Undercurrent (37)</li>
              <li>Stall/locked rotor (51LR)</li>
            </ul>
            <p><strong>Advanced Features</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Thermistor input (RTD/PTC)</li>
              <li>Motor thermal model</li>
              <li>Starts per hour limiting</li>
              <li>Power measurement (kW)</li>
              <li>Modbus/Profibus comms</li>
              <li>Event and fault logging</li>
            </ul>
            <p><strong>Short-Circuit Protection Required</strong></p>
            <p>Motor protection relays and overload devices do NOT provide short-circuit protection. Fast-acting fuses or MCCBs with adequate breaking capacity must be installed upstream to interrupt fault currents. Verify coordination between short-circuit device and overload relay for proper protection discrimination.</p>
            <p><strong>Complete Motor Circuit Protection</strong></p>
            <p>A properly protected motor circuit includes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Isolator:</strong> For safe maintenance isolation (lockable)</li>
              <li><strong>Short-circuit protection:</strong> Fuses or MCCB rated for Isc</li>
              <li><strong>Contactor:</strong> For motor switching, rated for AC-3 duty</li>
              <li><strong>Overload relay:</strong> Thermal, electronic, or MPR</li>
              <li><strong>Earth fault:</strong> RCD, CBCT, or built-in to MPR</li>
              <li><strong>Thermistor protection:</strong> For critical motors</li>
              <li><strong>Phase monitoring:</strong> Where rotation critical</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Overload Relay Selection</strong>
            </p>
            <p><strong>Question:</strong> An AHU supply fan motor is rated 11kW, 400V, FLC 21A, Class F insulation. The fan has moderate inertia and takes 12 seconds to reach full speed. Select appropriate overload protection.</p>
            <p>Motor FLC: 21A</p>
            <p>Starting time: 12 seconds (exceeds Class 10 limit)</p>
            <p>Selection:</p>
            <p>• Trip class: <strong>Class 20</strong> (allows up to 20s at 7.2× FLC)</p>
            <p>• Current setting: <strong>21A</strong> (match motor nameplate)</p>
            <p>• Reset type: Manual (investigate before restart)</p>
            <p>Consider electronic relay for:</p>
            <p>• Phase loss detection</p>
            <p>• BMS communication</p>
            <p>• Adjustable class if starting varies</p>
            <p>
              <strong>Example 2: Thermistor Circuit Verification</strong>
            </p>
            <p><strong>Question:</strong> A motor has three PTC thermistors connected in series. During commissioning, the thermistor relay shows total circuit resistance of 720Ω. Is this acceptable?</p>
            <p>Given: Total resistance = 720Ω with 3 sensors</p>
            <p>Per sensor: 720 ÷ 3 = <strong>240Ω per thermistor</strong></p>
            <p>Typical PTC values at ambient:</p>
            <p>• Normal range: 100-250Ω per sensor</p>
            <p>• Total normal: 300-750Ω</p>
            <p>✓ 720Ω is within normal range</p>
            <p>Warning levels to monitor:</p>
            <p>• Pre-alarm: {'>'}1500Ω total</p>
            <p>• Trip: {'>'}3000Ω total</p>
            <p>Record baseline value for future comparison</p>
            <p>
              <strong>Example 3: Earth Fault Setting Calculation</strong>
            </p>
            <p><strong>Question:</strong> A 22kW motor on a TT system has earth electrode resistance Ra = 20Ω. What maximum earth fault current setting will ensure disconnection within 0.4s?</p>
            <p>BS 7671 requirement: Ra × Ia ≤ 50V</p>
            <p>Where Ia = operating current of protective device</p>
            <p>Rearranging: Ia ≤ 50V ÷ Ra</p>
            <p>Ia ≤ 50 ÷ 20 = <strong>2.5A maximum</strong></p>
            <p>Selection:</p>
            <p>• Use 300mA RCD (provides safety margin)</p>
            <p>• Or CBCT with 500mA setting</p>
            <p>• Verify 0.4s disconnection at calculated current</p>
            <p>Consider time-delayed RCD to avoid VSD nuisance trips</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Motor Protection Selection Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Overload:</strong> Set to motor FLC, select class for starting time</li>
              <li><strong>Phase failure:</strong> Required for all three-phase motors</li>
              <li><strong>Phase sequence:</strong> Required where rotation direction critical</li>
              <li><strong>Earth fault:</strong> Based on system type and application</li>
              <li><strong>Thermistors:</strong> Recommended for critical motors, required for some</li>
              <li><strong>Short-circuit:</strong> Always required upstream of overload device</li>
            </ul>
            <p>
              <strong>Commissioning Checks:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify overload current matches motor nameplate FLC</li>
              <li>Confirm trip class appropriate for motor starting time</li>
              <li>Test phase failure relay by disconnecting one phase (motor stopped)</li>
              <li>Measure thermistor circuit resistance and record baseline</li>
              <li>Test RCD/earth fault device using test button</li>
              <li>Verify phase sequence for correct rotation direction</li>
              <li>Document all settings and test results</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Wrong current setting:</strong> Using cable or CB rating instead of motor FLC</li>
                <li><strong>Class too low:</strong> Nuisance trips during normal motor starting</li>
                <li><strong>No phase protection:</strong> Single-phasing causes rapid motor failure</li>
                <li><strong>Ignoring thermistors:</strong> Not connecting available motor sensors</li>
                <li><strong>Wrong RCD type:</strong> Standard RCD with VSD causes nuisance trips</li>
                <li><strong>Auto reset enabled:</strong> Motor restarts without fault investigation</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section4-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Variable speed drives
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section4-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Energy efficiency
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section4_4;
