import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Thermometer, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Motor Protection - HNC Module 8 Section 4.4 | HVAC Systems";
const DESCRIPTION = "Master motor protection systems for HVAC applications: thermal overload relays, electronic protection, phase failure detection, earth fault protection and motor protection relay functions to BS 7671.";

const quickCheckQuestions = [
  {
    id: "overload-class",
    question: "What does an overload relay Class 10 rating indicate?",
    options: ["Maximum current rating of 10A", "Trips within 10 seconds at 7.2× FLC", "10% tolerance on settings", "10 minute cooling time"],
    correctIndex: 1,
    explanation: "Class 10 indicates the relay will trip within 10 seconds when exposed to 7.2 times full load current. This is standard for general motor applications. Class 20 and 30 provide longer trip times for motors with heavy starting loads."
  },
  {
    id: "phase-failure",
    question: "What is single-phasing and why is it dangerous for motors?",
    options: ["Loss of neutral connection causing overvoltage", "Loss of one phase causing remaining windings to carry excess current", "Phase reversal causing motor to run backwards", "Phase imbalance of less than 5%"],
    correctIndex: 1,
    explanation: "Single-phasing occurs when one phase is lost. The motor attempts to continue running on two phases, causing the remaining windings to carry up to 173% of normal current. This rapidly overheats the motor and can cause winding failure within minutes."
  },
  {
    id: "thermistor-type",
    question: "How does a PTC thermistor respond to rising temperature?",
    options: ["Resistance decreases linearly", "Resistance increases sharply above trip point", "Resistance remains constant until failure", "Resistance oscillates with temperature"],
    correctIndex: 1,
    explanation: "PTC (Positive Temperature Coefficient) thermistors exhibit a sharp increase in resistance when they reach their designed switching temperature. This characteristic makes them ideal for motor winding protection as they can trigger a relay when the winding temperature becomes dangerous."
  },
  {
    id: "earth-fault",
    question: "What is the purpose of earth fault protection on a motor circuit?",
    options: ["To protect against overloading", "To detect current flowing to earth indicating insulation failure", "To prevent phase reversal", "To monitor supply voltage"],
    correctIndex: 1,
    explanation: "Earth fault protection detects current flowing to earth, which indicates insulation breakdown. This is critical for safety as it prevents electric shock hazards and fires. BS 7671 requires earth fault protection for motor circuits, typically using RCDs or dedicated earth fault relays."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What type of overload relay uses a bimetallic strip mechanism?",
    options: [
      "Electronic overload relay",
      "Thermal overload relay",
      "Magnetic overload relay",
      "Solid-state overload relay"
    ],
    correctAnswer: 1,
    explanation: "Thermal overload relays use bimetallic strips that bend when heated by motor current. The strip deflection trips the relay contacts when current exceeds the set value for sufficient time. They provide an inherent time-delay characteristic similar to motor heating."
  },
  {
    id: 2,
    question: "What is the advantage of electronic overload relays over thermal types?",
    options: [
      "Lower cost",
      "Simpler installation",
      "Adjustable trip class and more accurate protection",
      "No power supply required"
    ],
    correctAnswer: 2,
    explanation: "Electronic overload relays offer adjustable trip class (10, 20, 30), more accurate current measurement, phase loss detection, ground fault protection, and communication capabilities. They provide superior protection customisation for different motor applications."
  },
  {
    id: 3,
    question: "What current level typically trips a Class 10 overload relay within 10 seconds?",
    options: [
      "1.05 times FLC",
      "1.5 times FLC",
      "7.2 times FLC",
      "10 times FLC"
    ],
    correctAnswer: 2,
    explanation: "Class 10 relays trip within 10 seconds at 7.2 times full load current. At lower overload levels, trip times are longer - for example, at 1.5× FLC, a Class 10 relay may take several minutes to trip, matching the motor's thermal capacity."
  },
  {
    id: 4,
    question: "Why is phase sequence (rotation) protection important for some motor applications?",
    options: [
      "It prevents overloading",
      "It ensures correct rotation direction for pumps, fans and conveyors",
      "It reduces starting current",
      "It improves power factor"
    ],
    correctAnswer: 1,
    explanation: "Phase sequence protection ensures the motor rotates in the correct direction. Incorrect rotation can damage pumps (running dry), fans (reversed airflow), lifts (dangerous operation), and conveyors (product damage). Phase sequence relays prevent starting if phases are incorrectly connected."
  },
  {
    id: 5,
    question: "What is the typical response temperature for PTC thermistors in motor windings?",
    options: [
      "50°C - 70°C",
      "80°C - 100°C",
      "120°C - 155°C",
      "180°C - 200°C"
    ],
    correctAnswer: 2,
    explanation: "PTC thermistors for motor protection typically have response temperatures between 120°C and 155°C, matched to the motor's insulation class. Class F insulation (155°C max) motors use 150°C thermistors to provide protection before insulation damage occurs."
  },
  {
    id: 6,
    question: "How many thermistors are typically embedded in a three-phase motor for winding protection?",
    options: [
      "1 (single sensor)",
      "2 (for redundancy)",
      "3 (one per phase winding)",
      "6 (two per phase)"
    ],
    correctAnswer: 2,
    explanation: "Three-phase motors typically have three PTC thermistors embedded in the stator windings, one per phase. These are connected in series to a thermistor relay. If any winding overheats, its thermistor resistance increases sharply, triggering the protection relay."
  },
  {
    id: 7,
    question: "What is the difference between NTC and PTC thermistors in motor protection?",
    options: [
      "NTC resistance increases with temperature, PTC decreases",
      "NTC resistance decreases with temperature, PTC increases sharply at trip point",
      "NTC is for AC motors, PTC is for DC motors",
      "NTC provides faster response than PTC"
    ],
    correctAnswer: 1,
    explanation: "NTC (Negative Temperature Coefficient) thermistors have decreasing resistance as temperature rises - used for continuous temperature monitoring. PTC thermistors have sharply increasing resistance at a specific trip point - used for over-temperature protection switching."
  },
  {
    id: 8,
    question: "What is the typical earth fault current setting for motor circuits in commercial installations?",
    options: [
      "30mA (personnel protection)",
      "100mA - 300mA (fire protection)",
      "500mA - 1A (equipment protection)",
      "All of the above may apply depending on requirements"
    ],
    correctAnswer: 3,
    explanation: "Earth fault settings vary by application: 30mA provides personnel protection, 100-300mA provides fire protection for fixed equipment, and higher settings may be used where nuisance tripping must be avoided. BS 7671 specifies requirements based on circuit type and location."
  },
  {
    id: 9,
    question: "What protection does a motor protection relay (MPR) typically NOT provide?",
    options: [
      "Overload protection",
      "Phase failure protection",
      "Short-circuit protection",
      "Stall protection"
    ],
    correctAnswer: 2,
    explanation: "Motor protection relays typically provide overload, phase failure, phase imbalance, earth fault, and stall protection, but NOT short-circuit protection. Short-circuit protection requires fast-acting fuses or MCCBs rated for fault current interruption upstream of the MPR."
  },
  {
    id: 10,
    question: "What indicates a motor is stalling according to protection relay criteria?",
    options: [
      "Current below 50% FLC",
      "Current at or above locked rotor current for extended period",
      "Speed above synchronous speed",
      "Power factor above 0.95"
    ],
    correctAnswer: 1,
    explanation: "A stalled motor draws locked rotor current (typically 6-8× FLC) but produces no rotation. Stall protection detects this condition - high current with no speed signal or extended high current duration - and trips the motor before thermal damage occurs."
  },
  {
    id: 11,
    question: "According to BS 7671, what type of protective device is required for motor circuits?",
    options: [
      "Only MCBs are permitted",
      "Only fuses are permitted",
      "A device suitable for the motor starting current characteristics",
      "RCDs only"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 requires protective devices suitable for the motor's characteristics. This includes type D MCBs or motor-rated MCCBs that can withstand starting currents (typically 6-8× FLC) without nuisance tripping, combined with separate overload protection."
  },
  {
    id: 12,
    question: "What is the purpose of the manual reset function on overload relays?",
    options: [
      "To test the relay operation",
      "To force investigation of the trip cause before restart",
      "To reduce relay cost",
      "To provide faster motor restart"
    ],
    correctAnswer: 1,
    explanation: "Manual reset requires an operator to physically reset the relay before the motor can restart. This forces investigation of why the overload occurred, preventing automatic restart that could damage an overheated motor or indicate a persistent fault condition."
  }
];

const faqs = [
  {
    question: "Why do motors need both overload AND short-circuit protection?",
    answer: "Overload relays have intentional time delays to allow normal starting currents (6-8× FLC) without tripping. They cannot interrupt high fault currents quickly enough to prevent damage. Short-circuit protection (fuses or MCCBs) provides instantaneous interruption of fault currents. Together they provide complete protection - the short-circuit device handles faults, while the overload relay protects against sustained overcurrent conditions."
  },
  {
    question: "How do I select the correct overload class for a motor application?",
    answer: "Class 10 suits most HVAC applications with standard starting times (under 10 seconds). Use Class 20 for motors with moderate inertia loads requiring 10-20 second starts, and Class 30 for high inertia applications like large fans or centrifugal equipment. If unsure, start with Class 10 - if nuisance tripping occurs during starting, move to a higher class."
  },
  {
    question: "Can I use an RCD for motor earth fault protection?",
    answer: "Yes, but with caution. Standard 30mA RCDs may nuisance trip due to motor capacitive leakage currents, especially with VSDs. Use time-delayed RCDs (Type S) or higher current ratings (100-300mA) for motor circuits. Some VSD applications require special RCD types (Type B) due to DC fault current components. Always verify RCD compatibility with the specific motor and drive combination."
  },
  {
    question: "What happens if thermistor protection wiring is damaged?",
    answer: "PTC thermistor circuits are designed fail-safe. If wiring is open-circuit, the thermistor relay sees infinite resistance (as if all thermistors are hot) and trips the motor. This prevents motor operation without functioning temperature protection. Always verify thermistor circuit integrity during commissioning and periodic maintenance."
  },
  {
    question: "How often should motor protection devices be tested?",
    answer: "BS 7671 requires periodic inspection and testing at intervals appropriate to the installation type. For commercial HVAC, annual testing is typical. Test overload relays by secondary injection, verify thermistor circuit continuity, check earth fault device operation with test buttons, and confirm phase failure relay response. Document all test results for compliance records."
  },
  {
    question: "Why do some motors have both embedded thermistors AND external overload relays?",
    answer: "Embedded thermistors measure actual winding temperature directly but have slow response to rapid overloads. External overload relays respond quickly to current increases but estimate temperature from current. Using both provides comprehensive protection: thermistors catch slow thermal build-up and ambient issues, while overload relays catch rapid overcurrent events before they damage windings."
  }
];

const HNCModule8Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 8.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Motor Protection
          </h1>
          <p className="text-white/80">
            Comprehensive protection systems for HVAC motors: overload, phase failure, earth fault and thermistor protection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Overload:</strong> Thermal or electronic relays prevent winding damage</li>
              <li className="pl-1"><strong>Phase failure:</strong> Detects single-phasing before motor overheats</li>
              <li className="pl-1"><strong>Earth fault:</strong> RCDs or dedicated relays for insulation failure</li>
              <li className="pl-1"><strong>Thermistors:</strong> Direct winding temperature monitoring</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">HVAC Applications</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>AHU fans:</strong> Class 10-20 overload, phase monitoring</li>
              <li className="pl-1"><strong>Chiller compressors:</strong> Comprehensive MPR protection</li>
              <li className="pl-1"><strong>Pumps:</strong> Dry-running and overload protection</li>
              <li className="pl-1"><strong>Cooling towers:</strong> Phase sequence for correct rotation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain thermal and electronic overload relay operation",
              "Select appropriate overload class for motor applications",
              "Understand phase failure and phase reversal protection",
              "Apply thermistor protection using PTC and NTC sensors",
              "Design earth fault protection for motor circuits",
              "Specify motor protection relays to BS 7671 requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Overload Protection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Overload Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Overload protection prevents motor damage from sustained overcurrent conditions that cause
              excessive winding temperatures. Unlike short-circuit protection, overload devices have
              intentional time delays to permit normal motor starting currents.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Overload Relays</p>
              <p className="text-sm text-white/90 mb-3">
                Thermal overload relays use bimetallic strips heated by motor current. As current increases,
                the strips bend until they trip the relay contacts. This provides an inverse-time characteristic
                that matches motor heating patterns.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Operation:</strong> Bimetallic strips bend proportionally to I²t heating</li>
                <li className="pl-1"><strong>Reset:</strong> Manual or automatic after cooling period</li>
                <li className="pl-1"><strong>Adjustment:</strong> Current dial typically 0.8-1.0× motor FLC</li>
                <li className="pl-1"><strong>Temperature compensation:</strong> Ambient compensated types available</li>
                <li className="pl-1"><strong>Limitations:</strong> Fixed trip class, no phase loss detection</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electronic Overload Relays</p>
              <p className="text-sm text-white/90 mb-3">
                Electronic overload relays use current transformers and microprocessor control to provide
                accurate, adjustable protection with additional features not possible with thermal types.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Current measurement:</strong> True RMS via current transformers</li>
                <li className="pl-1"><strong>Trip class:</strong> Adjustable Class 5, 10, 15, 20, 30</li>
                <li className="pl-1"><strong>Phase loss:</strong> Built-in single-phasing detection</li>
                <li className="pl-1"><strong>Ground fault:</strong> Optional earth leakage monitoring</li>
                <li className="pl-1"><strong>Communications:</strong> Modbus, Profibus for BMS integration</li>
                <li className="pl-1"><strong>Diagnostics:</strong> Trip history, current display, fault logs</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Overload Trip Classes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Class</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Trip Time at 7.2× FLC</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class 5</td>
                      <td className="border border-white/10 px-3 py-2">&lt; 5 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Submersible pumps, quick-start motors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class 10</td>
                      <td className="border border-white/10 px-3 py-2">&lt; 10 seconds</td>
                      <td className="border border-white/10 px-3 py-2">General purpose, most HVAC applications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class 20</td>
                      <td className="border border-white/10 px-3 py-2">&lt; 20 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Moderate inertia loads, larger fans</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class 30</td>
                      <td className="border border-white/10 px-3 py-2">&lt; 30 seconds</td>
                      <td className="border border-white/10 px-3 py-2">High inertia, heavy flywheel loads</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-300 mb-1">Setting Overload Relays</p>
                  <p className="text-sm text-white/80">
                    Set the overload current to the motor nameplate full load current (FLC), not the
                    cable or circuit breaker rating. If the motor FLC is between dial settings, set to
                    the next highest value. Never exceed 1.0× FLC setting unless motor is underloaded.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Phase Failure and Reversal Protection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Phase Failure and Reversal Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Three-phase motors are vulnerable to supply faults that can cause rapid overheating or
              incorrect operation. Phase monitoring relays detect these conditions and prevent motor damage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Single-Phasing (Phase Failure)</p>
              <p className="text-sm text-white/90 mb-3">
                Single-phasing occurs when one supply phase is lost due to a blown fuse, loose connection,
                or supply fault. The motor attempts to continue running on two phases with severe consequences.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Effect:</strong> Remaining windings carry up to 173% normal current</li>
                <li className="pl-1"><strong>Heating:</strong> Localised hotspots cause rapid insulation degradation</li>
                <li className="pl-1"><strong>Torque:</strong> Reduced to approximately 50% of normal</li>
                <li className="pl-1"><strong>Starting:</strong> Motor will not start from rest on two phases</li>
                <li className="pl-1"><strong>Detection:</strong> Current imbalance or negative sequence monitoring</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phase Imbalance</p>
              <p className="text-sm text-white/90 mb-3">
                Even small voltage imbalances between phases cause disproportionate current imbalances
                and additional motor heating. Phase monitoring relays can detect this condition.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage Imbalance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Current Imbalance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Temperature Rise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1%</td>
                      <td className="border border-white/10 px-3 py-2">6-10%</td>
                      <td className="border border-white/10 px-3 py-2">+2%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2%</td>
                      <td className="border border-white/10 px-3 py-2">12-20%</td>
                      <td className="border border-white/10 px-3 py-2">+8%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3%</td>
                      <td className="border border-white/10 px-3 py-2">18-30%</td>
                      <td className="border border-white/10 px-3 py-2">+18%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5%</td>
                      <td className="border border-white/10 px-3 py-2">30-50%</td>
                      <td className="border border-white/10 px-3 py-2">+50%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Motors should be derated or protected if supply imbalance exceeds 2%</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phase Sequence (Reversal) Protection</p>
              <p className="text-sm text-white/90 mb-3">
                Phase sequence relays ensure the motor rotates in the correct direction by detecting
                the order of phase voltages. Incorrect sequence prevents the motor from starting.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pumps:</strong> Reverse rotation causes cavitation or dry running</li>
                <li className="pl-1"><strong>Fans:</strong> Incorrect airflow direction, reduced efficiency</li>
                <li className="pl-1"><strong>Lifts:</strong> Dangerous incorrect travel direction</li>
                <li className="pl-1"><strong>Conveyors:</strong> Product damage, safety hazards</li>
                <li className="pl-1"><strong>Compressors:</strong> Oil pump failure, bearing damage</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phase Monitoring Relay Functions</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Phase failure (single-phasing)</li>
                  <li className="pl-1">Phase sequence (rotation direction)</li>
                  <li className="pl-1">Phase imbalance (voltage asymmetry)</li>
                  <li className="pl-1">Under/over voltage protection</li>
                  <li className="pl-1">Under/over frequency detection</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Settings</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Phase loss: Instant trip</li>
                  <li className="pl-1">Phase imbalance: 5-10% threshold</li>
                  <li className="pl-1">Undervoltage: 85-90% nominal</li>
                  <li className="pl-1">Overvoltage: 105-110% nominal</li>
                  <li className="pl-1">Trip delay: 0.1-10 seconds adjustable</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Thermistor Protection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Thermistor Protection (PTC and NTC)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thermistors embedded in motor windings provide direct temperature measurement, detecting
              overheating regardless of the cause - overload, blocked ventilation, high ambient, or
              phase imbalance. This is the most reliable form of winding protection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PTC Thermistors (Positive Temperature Coefficient)</p>
              <p className="text-sm text-white/90 mb-3">
                PTC thermistors exhibit a sharp resistance increase at a specific temperature. Below
                this point, resistance is low (typically 100-250Ω). Above the switching temperature,
                resistance increases rapidly to several thousand ohms.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Normal operation:</strong> Low resistance (50-250Ω per sensor)</li>
                <li className="pl-1"><strong>Trip point:</strong> Sharp increase at rated temperature</li>
                <li className="pl-1"><strong>Tripped state:</strong> High resistance (&gt;3000Ω)</li>
                <li className="pl-1"><strong>Connection:</strong> Three sensors in series to relay</li>
                <li className="pl-1"><strong>Response time:</strong> Relatively slow (seconds to minutes)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PTC Temperature Ratings by Insulation Class</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Insulation Class</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Max Winding Temp</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PTC Trip Temperature</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class B</td>
                      <td className="border border-white/10 px-3 py-2">130°C</td>
                      <td className="border border-white/10 px-3 py-2">120°C - 125°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class F</td>
                      <td className="border border-white/10 px-3 py-2">155°C</td>
                      <td className="border border-white/10 px-3 py-2">145°C - 150°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Class H</td>
                      <td className="border border-white/10 px-3 py-2">180°C</td>
                      <td className="border border-white/10 px-3 py-2">170°C - 175°C</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">PTC sensors trip 5-10°C below maximum to prevent insulation damage</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">NTC Thermistors (Negative Temperature Coefficient)</p>
              <p className="text-sm text-white/90 mb-3">
                NTC thermistors have gradually decreasing resistance as temperature rises, providing
                continuous analogue temperature measurement rather than a switching function.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Characteristic:</strong> Smooth resistance decrease with temperature</li>
                <li className="pl-1"><strong>Use:</strong> Temperature monitoring and display</li>
                <li className="pl-1"><strong>Advantage:</strong> Continuous measurement, trend analysis</li>
                <li className="pl-1"><strong>Application:</strong> BMS integration, predictive maintenance</li>
                <li className="pl-1"><strong>Typical values:</strong> 10kΩ at 25°C, 1-2kΩ at 100°C</li>
              </ul>
            </div>

            <div className="my-6">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5">
                <Thermometer className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white mb-2">Thermistor Relay Operation</p>
                  <p className="text-sm text-white/80 mb-2">
                    The thermistor relay monitors total resistance of the series-connected sensors:
                  </p>
                  <ul className="text-sm text-white/70 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Normal:</strong> Total R typically 300-750Ω (3 × 100-250Ω)</li>
                    <li className="pl-1"><strong>Pre-warning:</strong> Optional alarm at 1500Ω</li>
                    <li className="pl-1"><strong>Trip:</strong> Relay operates above 3000-3600Ω</li>
                    <li className="pl-1"><strong>Open circuit:</strong> Infinite R = trips (fail-safe)</li>
                    <li className="pl-1"><strong>Short circuit:</strong> Very low R = may trip or alarm</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Use thermistor protection in combination with overload relays
              for comprehensive coverage - thermistors catch slow thermal build-up, overloads catch rapid
              current increases.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Earth Fault Protection and Motor Protection Relays */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Earth Fault Protection and Motor Protection Relays
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Earth fault protection detects insulation breakdown allowing current to flow to earth.
              Motor protection relays (MPRs) combine multiple protection functions in a single device
              for comprehensive motor circuit protection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Earth Fault Protection Methods</p>
              <ul className="text-sm text-white space-y-2 list-none ml-0">
                <li className="pl-0 p-3 rounded bg-white/5">
                  <strong className="text-elec-yellow/90">RCDs (Residual Current Devices):</strong>
                  <span className="text-white/80 block mt-1">Detect imbalance between line and neutral currents indicating earth leakage. Standard 30mA for personnel protection, 100-300mA for equipment protection. May nuisance trip with VSD harmonic currents.</span>
                </li>
                <li className="pl-0 p-3 rounded bg-white/5">
                  <strong className="text-elec-yellow/90">Core Balance CT (CBCT):</strong>
                  <span className="text-white/80 block mt-1">All phase and neutral conductors pass through a single CT. Any earth fault current creates an imbalance detected by the relay. More suitable for motor circuits than standard RCDs.</span>
                </li>
                <li className="pl-0 p-3 rounded bg-white/5">
                  <strong className="text-elec-yellow/90">Zero Sequence CT:</strong>
                  <span className="text-white/80 block mt-1">Measures the sum of three phase currents. In a balanced system this equals zero. Earth faults create a non-zero sum current proportional to fault severity.</span>
                </li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Earth Fault Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Max Earth Fault Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Personnel protection</td>
                      <td className="border border-white/10 px-3 py-2">30mA / 40ms</td>
                      <td className="border border-white/10 px-3 py-2">Socket outlets, portable equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fixed equipment</td>
                      <td className="border border-white/10 px-3 py-2">100-300mA</td>
                      <td className="border border-white/10 px-3 py-2">Fire protection, motors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TT system motors</td>
                      <td className="border border-white/10 px-3 py-2">≤1A typically</td>
                      <td className="border border-white/10 px-3 py-2">Based on Ra value</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VSD applications</td>
                      <td className="border border-white/10 px-3 py-2">Type B RCD</td>
                      <td className="border border-white/10 px-3 py-2">DC sensitive type required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Protection Relay (MPR) Functions</p>
              <p className="text-sm text-white/90 mb-3">
                Modern MPRs combine multiple protection functions with programmable settings, fault
                logging, and communication interfaces. They provide comprehensive motor protection
                in a single device.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Standard Protection Functions</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Thermal overload (49)</li>
                    <li className="pl-1">Phase failure (47)</li>
                    <li className="pl-1">Phase imbalance (46)</li>
                    <li className="pl-1">Earth fault (50N/51N)</li>
                    <li className="pl-1">Undercurrent (37)</li>
                    <li className="pl-1">Stall/locked rotor (51LR)</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Advanced Features</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Thermistor input (RTD/PTC)</li>
                    <li className="pl-1">Motor thermal model</li>
                    <li className="pl-1">Starts per hour limiting</li>
                    <li className="pl-1">Power measurement (kW)</li>
                    <li className="pl-1">Modbus/Profibus comms</li>
                    <li className="pl-1">Event and fault logging</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="flex gap-3">
                <Zap className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-300 mb-1">Short-Circuit Protection Required</p>
                  <p className="text-sm text-white/80">
                    Motor protection relays and overload devices do NOT provide short-circuit protection.
                    Fast-acting fuses or MCCBs with adequate breaking capacity must be installed upstream
                    to interrupt fault currents. Verify coordination between short-circuit device and
                    overload relay for proper protection discrimination.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Complete Motor Circuit Protection</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-white/80 mb-3">A properly protected motor circuit includes:</p>
                <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                  <li className="pl-1"><strong>Isolator:</strong> For safe maintenance isolation (lockable)</li>
                  <li className="pl-1"><strong>Short-circuit protection:</strong> Fuses or MCCB rated for Isc</li>
                  <li className="pl-1"><strong>Contactor:</strong> For motor switching, rated for AC-3 duty</li>
                  <li className="pl-1"><strong>Overload relay:</strong> Thermal, electronic, or MPR</li>
                  <li className="pl-1"><strong>Earth fault:</strong> RCD, CBCT, or built-in to MPR</li>
                  <li className="pl-1"><strong>Thermistor protection:</strong> For critical motors</li>
                  <li className="pl-1"><strong>Phase monitoring:</strong> Where rotation critical</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Overload Relay Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An AHU supply fan motor is rated 11kW, 400V, FLC 21A, Class F insulation.
                The fan has moderate inertia and takes 12 seconds to reach full speed. Select appropriate overload protection.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Motor FLC: 21A</p>
                <p>Starting time: 12 seconds (exceeds Class 10 limit)</p>
                <p className="mt-2">Selection:</p>
                <p>• Trip class: <strong>Class 20</strong> (allows up to 20s at 7.2× FLC)</p>
                <p>• Current setting: <strong>21A</strong> (match motor nameplate)</p>
                <p>• Reset type: Manual (investigate before restart)</p>
                <p className="mt-2">Consider electronic relay for:</p>
                <p>• Phase loss detection</p>
                <p>• BMS communication</p>
                <p>• Adjustable class if starting varies</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Thermistor Circuit Verification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A motor has three PTC thermistors connected in series. During commissioning,
                the thermistor relay shows total circuit resistance of 720Ω. Is this acceptable?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given: Total resistance = 720Ω with 3 sensors</p>
                <p>Per sensor: 720 ÷ 3 = <strong>240Ω per thermistor</strong></p>
                <p className="mt-2">Typical PTC values at ambient:</p>
                <p>• Normal range: 100-250Ω per sensor</p>
                <p>• Total normal: 300-750Ω</p>
                <p className="mt-2 text-green-400">✓ 720Ω is within normal range</p>
                <p className="mt-2">Warning levels to monitor:</p>
                <p>• Pre-alarm: {'>'}1500Ω total</p>
                <p>• Trip: {'>'}3000Ω total</p>
                <p className="mt-2 text-white/60">Record baseline value for future comparison</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Earth Fault Setting Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 22kW motor on a TT system has earth electrode resistance Ra = 20Ω.
                What maximum earth fault current setting will ensure disconnection within 0.4s?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>BS 7671 requirement: Ra × Ia ≤ 50V</p>
                <p>Where Ia = operating current of protective device</p>
                <p className="mt-2">Rearranging: Ia ≤ 50V ÷ Ra</p>
                <p>Ia ≤ 50 ÷ 20 = <strong>2.5A maximum</strong></p>
                <p className="mt-2">Selection:</p>
                <p>• Use 300mA RCD (provides safety margin)</p>
                <p>• Or CBCT with 500mA setting</p>
                <p>• Verify 0.4s disconnection at calculated current</p>
                <p className="mt-2 text-white/60">Consider time-delayed RCD to avoid VSD nuisance trips</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Protection Selection Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Overload:</strong> Set to motor FLC, select class for starting time</li>
                <li className="pl-1"><strong>Phase failure:</strong> Required for all three-phase motors</li>
                <li className="pl-1"><strong>Phase sequence:</strong> Required where rotation direction critical</li>
                <li className="pl-1"><strong>Earth fault:</strong> Based on system type and application</li>
                <li className="pl-1"><strong>Thermistors:</strong> Recommended for critical motors, required for some</li>
                <li className="pl-1"><strong>Short-circuit:</strong> Always required upstream of overload device</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Checks</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify overload current matches motor nameplate FLC</li>
                <li className="pl-1">Confirm trip class appropriate for motor starting time</li>
                <li className="pl-1">Test phase failure relay by disconnecting one phase (motor stopped)</li>
                <li className="pl-1">Measure thermistor circuit resistance and record baseline</li>
                <li className="pl-1">Test RCD/earth fault device using test button</li>
                <li className="pl-1">Verify phase sequence for correct rotation direction</li>
                <li className="pl-1">Document all settings and test results</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wrong current setting:</strong> Using cable or CB rating instead of motor FLC</li>
                <li className="pl-1"><strong>Class too low:</strong> Nuisance trips during normal motor starting</li>
                <li className="pl-1"><strong>No phase protection:</strong> Single-phasing causes rapid motor failure</li>
                <li className="pl-1"><strong>Ignoring thermistors:</strong> Not connecting available motor sensors</li>
                <li className="pl-1"><strong>Wrong RCD type:</strong> Standard RCD with VSD causes nuisance trips</li>
                <li className="pl-1"><strong>Auto reset enabled:</strong> Motor restarts without fault investigation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Overload Classes</p>
                <ul className="space-y-0.5">
                  <li>Class 10: General HVAC, &lt;10s start</li>
                  <li>Class 20: Moderate inertia, 10-20s start</li>
                  <li>Class 30: High inertia, 20-30s start</li>
                  <li>Set current: Motor nameplate FLC</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Thermistor Values</p>
                <ul className="space-y-0.5">
                  <li>PTC normal: 100-250Ω per sensor</li>
                  <li>Trip threshold: &gt;3000Ω total</li>
                  <li>Class F motor: 145-150°C trip</li>
                  <li>Open circuit: Fail-safe (trips)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Motor Protection Knowledge Check"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Variable Speed Drives
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section4-5">
              Next: Energy Efficiency
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section4_4;
