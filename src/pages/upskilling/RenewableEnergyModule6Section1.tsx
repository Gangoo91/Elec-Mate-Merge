import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "EV Charging Fundamentals - Renewable Energy Module 6";
const DESCRIPTION =
  "Master the fundamentals of electric vehicle charging infrastructure including charging modes, connector types, power levels, and the role of EV charging in renewable energy systems.";

const quickCheckQuestions = [
  {
    id: "ev-fund-qc1",
    question: "What is the maximum power output for Mode 2 charging?",
    options: ["3.6 kW", "7.4 kW", "22 kW", "350 kW"],
    correctIndex: 0,
    explanation:
      "Mode 2 charging uses a standard domestic socket with an in-cable control box (IC-CPD) and is limited to 3.6 kW maximum for safety reasons.",
  },
  {
    id: "ev-fund-qc2",
    question: "Which connector type is the European standard for AC charging?",
    options: ["CHAdeMO", "CCS Combo 2", "Type 2 (Mennekes)", "Type 1 (J1772)"],
    correctIndex: 2,
    explanation:
      "The Type 2 (Mennekes) connector is the European standard for AC charging, supporting single-phase and three-phase power up to 43 kW.",
  },
  {
    id: "ev-fund-qc3",
    question: "What does EVSE stand for?",
    options: [
      "Electric Vehicle Supply Equipment",
      "Electric Voltage Supply Engineering",
      "Energy Vehicle System Electronics",
      "Electronic Vehicle Safety Equipment",
    ],
    correctIndex: 0,
    explanation:
      "EVSE stands for Electric Vehicle Supply Equipment, referring to the complete charging infrastructure including the charger, cable, and connector.",
  },
  {
    id: "ev-fund-qc4",
    question: "What is the typical charging efficiency of a modern EV charger?",
    options: ["75-80%", "80-85%", "90-95%", "98-99%"],
    correctIndex: 2,
    explanation:
      "Modern EV chargers typically achieve 90-95% efficiency, with losses occurring in the power electronics, cable resistance, and battery charging process.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Which charging mode requires no communication between the vehicle and the charging equipment?",
    options: ["Mode 1", "Mode 2", "Mode 3", "Mode 4"],
    correctAnswer: 0,
    explanation:
      "Mode 1 is basic charging from a standard domestic socket with no communication or safety features beyond standard circuit protection.",
  },
  {
    id: 2,
    question: "What is the primary advantage of three-phase charging over single-phase?",
    options: [
      "Lower installation cost",
      "Higher power delivery capability",
      "Simpler wiring requirements",
      "Better battery longevity",
    ],
    correctAnswer: 1,
    explanation:
      "Three-phase charging can deliver significantly higher power (up to 22 kW AC) compared to single-phase (typically 7.4 kW maximum), enabling faster charging times.",
  },
  {
    id: 3,
    question: "Which DC fast charging standard is most commonly used in Europe?",
    options: ["CHAdeMO", "CCS Combo 2", "Tesla Supercharger", "GB/T"],
    correctAnswer: 1,
    explanation:
      "CCS (Combined Charging System) Combo 2 is the dominant DC fast charging standard in Europe, combining the Type 2 AC connector with DC pins.",
  },
  {
    id: 4,
    question: "What is the purpose of the pilot signal in Mode 3 charging?",
    options: [
      "To measure energy consumption",
      "To communicate available current and charging status",
      "To provide emergency shutdown",
      "To balance three-phase loads",
    ],
    correctAnswer: 1,
    explanation:
      "The pilot signal (Control Pilot) enables communication between the EVSE and vehicle, indicating available current capacity and managing the charging session.",
  },
  {
    id: 5,
    question: "What typical power range do public DC rapid chargers operate at?",
    options: ["7-22 kW", "25-50 kW", "50-350 kW", "350-500 kW"],
    correctAnswer: 2,
    explanation:
      "Public DC rapid chargers typically operate between 50 kW and 350 kW, with ultra-rapid chargers at the higher end enabling charging to 80% in under 20 minutes.",
  },
  {
    id: 6,
    question: "Why is load management important for EV charging installations?",
    options: [
      "To reduce equipment costs",
      "To prevent supply overload and balance grid demand",
      "To increase charging speed",
      "To improve battery health",
    ],
    correctAnswer: 1,
    explanation:
      "Load management prevents overloading the electrical supply by dynamically adjusting charging power based on available capacity and other site loads.",
  },
  {
    id: 7,
    question: "What is the minimum IP rating typically required for outdoor EV chargers?",
    options: ["IP44", "IP54", "IP65", "IP67"],
    correctAnswer: 1,
    explanation:
      "IP54 is the minimum rating typically required for outdoor EVSE installations, providing protection against dust ingress and water splashing from any direction.",
  },
  {
    id: 8,
    question: "Which factor most significantly affects DC fast charging speed as the battery approaches full?",
    options: [
      "Ambient temperature",
      "Battery state of charge",
      "Cable length",
      "Grid voltage",
    ],
    correctAnswer: 1,
    explanation:
      "Battery state of charge significantly affects charging speed - most EVs reduce charging power above 80% SoC to protect battery health, making the last 20% much slower.",
  },
  {
    id: 9,
    question: "What is vehicle-to-grid (V2G) technology?",
    options: [
      "Using EV batteries to power the home",
      "Bidirectional charging allowing EVs to export power to the grid",
      "Smart charging based on grid signals",
      "Using solar power to charge vehicles",
    ],
    correctAnswer: 1,
    explanation:
      "V2G (Vehicle-to-Grid) enables bidirectional power flow, allowing EV batteries to export stored energy back to the electricity grid during peak demand periods.",
  },
  {
    id: 10,
    question: "What is the typical battery capacity range for modern electric vehicles?",
    options: ["10-30 kWh", "40-100 kWh", "100-150 kWh", "150-200 kWh"],
    correctAnswer: 1,
    explanation:
      "Modern EVs typically have battery capacities between 40-100 kWh, with smaller city cars at the lower end and larger vehicles and performance models at the higher end.",
  },
];

const faqs = [
  {
    question: "What is the difference between AC and DC charging?",
    answer:
      "AC charging uses the vehicle's onboard charger to convert AC to DC for battery storage, limiting power to the onboard charger capacity (typically 7-22 kW). DC charging bypasses the onboard charger, delivering DC power directly to the battery at much higher rates (50-350 kW), enabling rapid charging.",
  },
  {
    question: "Can I install an EV charger on a single-phase supply?",
    answer:
      "Yes, single-phase EV chargers are common for domestic installations, typically providing up to 7.4 kW (32A). This is sufficient for overnight charging, adding approximately 25-30 miles of range per hour. Three-phase is only necessary for faster commercial charging requirements.",
  },
  {
    question: "Why do rapid chargers slow down as the battery fills?",
    answer:
      "Rapid chargers reduce power as the battery approaches full capacity to prevent damage to battery cells. High charging rates generate heat and stress, which could degrade battery health if continued at high state of charge. This is why charging to 80% is much faster than charging to 100%.",
  },
  {
    question: "What qualifications do I need to install EV chargers?",
    answer:
      "In the UK, you need to be a qualified electrician with current BS 7671 certification. For OZEV grant-funded installations, you must also be registered with an approved certification body and complete manufacturer-specific training for the equipment being installed.",
  },
  {
    question: "How does smart charging benefit EV owners?",
    answer:
      "Smart charging allows scheduling to take advantage of off-peak electricity rates, automatic load balancing to prevent supply overload, solar integration to maximise self-consumption, and participation in demand response programmes that can provide financial incentives.",
  },
  {
    question: "What is the lifespan of a typical EV charging unit?",
    answer:
      "Quality commercial EVSE typically lasts 10-15 years with proper maintenance. Domestic units generally have a 5-10 year lifespan. Key factors affecting longevity include usage frequency, environmental conditions, and regular maintenance of connectors and cables.",
  },
];

const RenewableEnergyModule6Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to=".."
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Module Overview
          </Link>
          <span className="text-sm text-white">Module 6 • Section 1</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-elec-yellow/10 px-4 py-1.5 text-sm font-medium text-elec-yellow">
              <Zap className="h-4 w-4" />
              EV Charging Infrastructure
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              EV Charging Fundamentals
            </h1>
            <p className="text-lg text-white sm:text-xl">
              Understanding electric vehicle charging technology, modes, connectors, and integration with renewable energy systems.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Charging Modes</h3>
              <p className="text-sm text-white">
                Mode 1-4 define charging configurations from basic domestic sockets to high-power DC rapid charging, each with specific safety and communication requirements.
              </p>
            </div>
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Connector Standards</h3>
              <p className="text-sm text-white">
                Type 2 is the European AC standard, while CCS Combo 2 dominates DC fast charging. Understanding connectors is essential for installation planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">Learning Outcomes</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Understand the four EV charging modes and their applications",
                "Identify connector types and their power capabilities",
                "Explain the difference between AC and DC charging",
                "Describe the role of EVSE communication protocols",
                "Understand power requirements for different charging scenarios",
                "Recognise the integration of EV charging with renewable energy",
              ].map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-elec-yellow" />
                  <span className="text-sm text-white">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Section 01 */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                01
              </span>
              <h2 className="text-2xl font-bold text-white">EV Charging Modes</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                The IEC 61851 standard defines four charging modes, each with different power levels, safety features, and communication requirements. Understanding these modes is fundamental to specifying appropriate charging solutions.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Mode 1 - Basic AC Charging</h4>
                <p className="mb-2">
                  Direct connection to a standard domestic socket without any dedicated protection or communication. Limited to 16A single-phase (3.6 kW). This mode is not permitted in the UK due to safety concerns and is primarily used in some developing markets.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Mode 2 - AC Charging with IC-CPD</h4>
                <p className="mb-2">
                  Uses a standard domestic socket with an In-Cable Control and Protection Device (IC-CPD). The IC-CPD provides residual current protection and basic communication with the vehicle. Limited to 3.6 kW for safety, this mode serves as a backup or temporary charging solution.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Mode 3 - Dedicated AC Charging</h4>
                <p className="mb-2">
                  The standard for home and workplace charging, using a dedicated EVSE with full communication via the Control Pilot signal. Supports single-phase (up to 7.4 kW) or three-phase (up to 22 kW for AC, 43 kW for some systems). Includes load management capability and smart charging features.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Mode 4 - DC Fast Charging</h4>
                <p className="mb-2">
                  High-power DC charging with the charger converting AC to DC externally. Power ranges from 50 kW to 350 kW or higher. Communication uses CAN bus or PLC for precise control of voltage and current. Primarily used for public rapid charging infrastructure.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 02 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                02
              </span>
              <h2 className="text-2xl font-bold text-white">Connector Types and Standards</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Multiple connector standards exist globally, with Europe standardising on Type 2 for AC and CCS Combo 2 for DC charging. Installers must understand connector capabilities and compatibility.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Type 2 (Mennekes)</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>European standard for AC charging (IEC 62196-2)</li>
                  <li>7-pin connector supporting single and three-phase</li>
                  <li>Power capability up to 43 kW AC (though typically 7.4-22 kW)</li>
                  <li>Includes Control Pilot and Proximity Pilot signals</li>
                  <li>Mandatory for new vehicles in Europe since 2014</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">CCS Combo 2 (Combined Charging System)</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>European and UK standard for DC fast charging</li>
                  <li>Combines Type 2 AC pins with two DC power pins</li>
                  <li>Supports power levels from 50 kW to 350 kW+</li>
                  <li>Uses PLC communication (ISO 15118) for advanced features</li>
                  <li>Enables Plug & Charge authentication</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">CHAdeMO</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Japanese DC fast charging standard</li>
                  <li>Declining in Europe but still present at many sites</li>
                  <li>Supports up to 62.5 kW (400V x 125A)</li>
                  <li>Uses CAN bus communication protocol</li>
                  <li>Supports bidirectional charging (V2G/V2H)</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Section 03 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                03
              </span>
              <h2 className="text-2xl font-bold text-white">AC vs DC Charging Technology</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Understanding the fundamental difference between AC and DC charging is essential for specifying appropriate solutions and advising customers on their charging needs.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">AC Charging Architecture</h4>
                <p className="mb-2">
                  In AC charging, the vehicle's onboard charger converts AC mains power to DC for battery storage. The onboard charger capacity determines maximum charging speed, typically 7 kW (single-phase) or 11-22 kW (three-phase). The EVSE simply provides AC power safely with appropriate protection and communication.
                </p>
                <p>
                  Advantages include lower infrastructure cost, simpler installation requirements, and compatibility with any EV. The limitation is charging speed, governed by the onboard charger capacity.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">DC Fast Charging Architecture</h4>
                <p className="mb-2">
                  DC chargers incorporate powerful AC-DC converters that supply DC directly to the battery, bypassing the onboard charger entirely. This enables much higher power levels, from 50 kW to 350 kW or more with ultra-rapid chargers.
                </p>
                <p>
                  The charger communicates directly with the battery management system to control voltage and current precisely throughout the charging session. This requires sophisticated power electronics and careful thermal management.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="py-2 text-left text-white">Parameter</th>
                      <th className="py-2 text-left text-white">AC Charging</th>
                      <th className="py-2 text-left text-white">DC Charging</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-white/10">
                      <td className="py-2">Typical Power</td>
                      <td className="py-2">3.6-22 kW</td>
                      <td className="py-2">50-350 kW</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Infrastructure Cost</td>
                      <td className="py-2">Lower</td>
                      <td className="py-2">Higher</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Installation Complexity</td>
                      <td className="py-2">Simple</td>
                      <td className="py-2">Complex</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Use Case</td>
                      <td className="py-2">Home, Workplace</td>
                      <td className="py-2">Public, Fleet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Section 04 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                04
              </span>
              <h2 className="text-2xl font-bold text-white">Communication and Control Protocols</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Modern EV charging relies on communication between the vehicle and charging equipment to ensure safe operation and enable smart features. Several protocols work together to manage charging sessions.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Control Pilot (IEC 61851)</h4>
                <p className="mb-2">
                  The Control Pilot is a PWM (Pulse Width Modulation) signal that communicates between the EVSE and vehicle. The duty cycle indicates available current capacity (e.g., 16% duty cycle = 10A available). Different voltage states indicate connection status and charging readiness.
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>State A: Not connected (12V)</li>
                  <li>State B: Connected, not ready (9V)</li>
                  <li>State C: Charging (6V)</li>
                  <li>State D: Charging with ventilation required (3V)</li>
                  <li>State E/F: Error conditions</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">ISO 15118 - Plug & Charge</h4>
                <p className="mb-2">
                  Advanced communication protocol enabling features like automatic authentication, dynamic tariff information, and bidirectional power transfer. Uses Power Line Communication (PLC) over the charging cable.
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Plug & Charge: Automatic authentication without cards or apps</li>
                  <li>Smart Charging: Dynamic power adjustment based on grid signals</li>
                  <li>V2G Communication: Bidirectional energy transfer protocols</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">OCPP - Open Charge Point Protocol</h4>
                <p className="mb-2">
                  Backend communication protocol connecting chargers to central management systems. OCPP enables remote monitoring, firmware updates, tariff management, and smart charging orchestration. Current versions include OCPP 1.6 and OCPP 2.0.1.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />

          {/* Section 05 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                05
              </span>
              <h2 className="text-2xl font-bold text-white">EV Charging and Renewable Integration</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Electric vehicles represent both a challenge and opportunity for renewable energy integration. Smart charging strategies can align EV demand with renewable generation, while V2G technology enables vehicles to support grid stability.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Solar-EV Integration</h4>
                <p className="mb-2">
                  Combining solar PV with EV charging maximises self-consumption and reduces grid dependency. Smart chargers can modulate power based on solar generation, prioritising renewable energy. Typical home systems might generate 3-4 kW peak, well-matched to single-phase EV charging.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Vehicle-to-Grid (V2G)</h4>
                <p className="mb-2">
                  Bidirectional charging enables EVs to export stored energy back to the grid during peak demand. With average EV batteries of 50-70 kWh and typical daily driving requiring only 10-15 kWh, significant capacity is available for grid services.
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Peak shaving: Reducing demand during high-price periods</li>
                  <li>Frequency regulation: Rapid response to grid imbalances</li>
                  <li>Emergency backup: Providing power during outages</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Smart Charging Strategies</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Time-of-use optimisation:</strong> Scheduling charging during off-peak periods</li>
                  <li><strong>Solar matching:</strong> Adjusting charge rate to match generation</li>
                  <li><strong>Demand response:</strong> Reducing or shifting load on grid operator signals</li>
                  <li><strong>Load balancing:</strong> Managing multiple EVs within site capacity</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-12 mt-12">
            <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/5 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">Practical Guidance</h2>
              <div className="space-y-4 text-white">
                <div>
                  <h4 className="font-semibold text-elec-yellow">Assessing Customer Requirements</h4>
                  <p className="mt-1 text-sm">
                    Key questions include: daily mileage and charging time available, vehicle onboard charger capacity, existing electrical supply capacity, future vehicle plans, and interest in smart/solar integration features.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Matching Charger to Application</h4>
                  <p className="mt-1 text-sm">
                    For home use with overnight charging, 7 kW single-phase is typically sufficient. Workplace charging might require 7-22 kW depending on dwell time. Public destination charging benefits from 22 kW, while en-route charging requires DC rapid capability.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Future-Proofing Installations</h4>
                  <p className="mt-1 text-sm">
                    Consider installing larger cable sizes for potential future upgrades, positioning chargers to accommodate multiple vehicles, and selecting OCPP-compliant equipment for smart charging capability.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="mb-2 font-semibold text-elec-yellow">{faq.question}</h3>
                  <p className="text-sm text-white">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12">
            <Quiz
              title="EV Charging Fundamentals Quiz"
              questions={quizQuestions}
              onComplete={(score) => console.log("Quiz completed with score:", score)}
            />
          </section>

          {/* Navigation */}
          <nav className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
            <Link to="/upskilling/renewable-energy/module-5/section-6">
              <Button variant="outline" className="w-full gap-2 border-white/20 text-white hover:bg-white/10 sm:w-auto">
                <ArrowLeft className="h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/upskilling/renewable-energy/module-6/section-2">
              <Button className="w-full gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 sm:w-auto">
                Next Section
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule6Section1;
