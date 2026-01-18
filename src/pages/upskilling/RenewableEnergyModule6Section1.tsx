import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "EV Charging Fundamentals - Renewable Energy Module 6 Section 1";
const DESCRIPTION = "Master the fundamentals of electric vehicle charging infrastructure including charging modes, connector types, power levels, and the role of EV charging in renewable energy systems.";

const quickCheckQuestions = [
  {
    id: "ev-fund-qc1",
    question: "What is the maximum power output for Mode 2 charging?",
    options: ["3.6 kW", "7.4 kW", "22 kW", "350 kW"],
    correctIndex: 0,
    explanation: "Mode 2 charging uses a standard domestic socket with an in-cable control box (IC-CPD) and is limited to 3.6 kW maximum for safety reasons."
  },
  {
    id: "ev-fund-qc2",
    question: "Which connector type is the European standard for AC charging?",
    options: ["CHAdeMO", "CCS Combo 2", "Type 2 (Mennekes)", "Type 1 (J1772)"],
    correctIndex: 2,
    explanation: "The Type 2 (Mennekes) connector is the European standard for AC charging, supporting single-phase and three-phase power up to 43 kW."
  },
  {
    id: "ev-fund-qc3",
    question: "What does EVSE stand for?",
    options: [
      "Electric Vehicle Supply Equipment",
      "Electric Voltage Supply Engineering",
      "Energy Vehicle System Electronics",
      "Electronic Vehicle Safety Equipment"
    ],
    correctIndex: 0,
    explanation: "EVSE stands for Electric Vehicle Supply Equipment, referring to the complete charging infrastructure including the charger, cable, and connector."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which charging mode requires no communication between the vehicle and the charging equipment?",
    options: ["Mode 1", "Mode 2", "Mode 3", "Mode 4"],
    correctAnswer: 0,
    explanation: "Mode 1 is basic charging from a standard domestic socket with no communication or safety features beyond standard circuit protection."
  },
  {
    id: 2,
    question: "What is the primary advantage of three-phase charging over single-phase?",
    options: ["Lower installation cost", "Higher power delivery capability", "Simpler wiring requirements", "Better battery longevity"],
    correctAnswer: 1,
    explanation: "Three-phase charging can deliver significantly higher power (up to 22 kW AC) compared to single-phase (typically 7.4 kW maximum), enabling faster charging times."
  },
  {
    id: 3,
    question: "Which DC fast charging standard is most commonly used in Europe?",
    options: ["CHAdeMO", "CCS Combo 2", "Tesla Supercharger", "GB/T"],
    correctAnswer: 1,
    explanation: "CCS (Combined Charging System) Combo 2 is the dominant DC fast charging standard in Europe, combining the Type 2 AC connector with DC pins."
  },
  {
    id: 4,
    question: "What is the purpose of the pilot signal in Mode 3 charging?",
    options: ["To measure energy consumption", "To communicate available current and charging status", "To provide emergency shutdown", "To balance three-phase loads"],
    correctAnswer: 1,
    explanation: "The pilot signal (Control Pilot) enables communication between the EVSE and vehicle, indicating available current capacity and managing the charging session."
  },
  {
    id: 5,
    question: "What typical power range do public DC rapid chargers operate at?",
    options: ["7-22 kW", "25-50 kW", "50-350 kW", "350-500 kW"],
    correctAnswer: 2,
    explanation: "Public DC rapid chargers typically operate between 50 kW and 350 kW, with ultra-rapid chargers at the higher end enabling charging to 80% in under 20 minutes."
  },
  {
    id: 6,
    question: "Why is load management important for EV charging installations?",
    options: ["To reduce equipment costs", "To prevent supply overload and balance grid demand", "To increase charging speed", "To improve battery health"],
    correctAnswer: 1,
    explanation: "Load management prevents overloading the electrical supply by dynamically adjusting charging power based on available capacity and other site loads."
  },
  {
    id: 7,
    question: "What is the minimum IP rating typically required for outdoor EV chargers?",
    options: ["IP44", "IP54", "IP65", "IP67"],
    correctAnswer: 1,
    explanation: "IP54 is the minimum rating typically required for outdoor EVSE installations, providing protection against dust ingress and water splashing from any direction."
  },
  {
    id: 8,
    question: "Which factor most significantly affects DC fast charging speed as the battery approaches full?",
    options: ["Ambient temperature", "Battery state of charge", "Cable length", "Grid voltage"],
    correctAnswer: 1,
    explanation: "Battery state of charge significantly affects charging speed - most EVs reduce charging power above 80% SoC to protect battery health, making the last 20% much slower."
  },
  {
    id: 9,
    question: "What is vehicle-to-grid (V2G) technology?",
    options: ["Using EV batteries to power the home", "Bidirectional charging allowing EVs to export power to the grid", "Smart charging based on grid signals", "Using solar power to charge vehicles"],
    correctAnswer: 1,
    explanation: "V2G (Vehicle-to-Grid) enables bidirectional power flow, allowing EV batteries to export stored energy back to the electricity grid during peak demand periods."
  },
  {
    id: 10,
    question: "What is the typical battery capacity range for modern electric vehicles?",
    options: ["10-30 kWh", "40-100 kWh", "100-150 kWh", "150-200 kWh"],
    correctAnswer: 1,
    explanation: "Modern EVs typically have battery capacities between 40-100 kWh, with smaller city cars at the lower end and larger vehicles and performance models at the higher end."
  }
];

const faqs = [
  {
    question: "What is the difference between AC and DC charging?",
    answer: "AC charging uses the vehicle's onboard charger to convert AC to DC for battery storage, limiting power to the onboard charger capacity (typically 7-22 kW). DC charging bypasses the onboard charger, delivering DC power directly to the battery at much higher rates (50-350 kW), enabling rapid charging."
  },
  {
    question: "Can I install an EV charger on a single-phase supply?",
    answer: "Yes, single-phase EV chargers are common for domestic installations, typically providing up to 7.4 kW (32A). This is sufficient for overnight charging, adding approximately 25-30 miles of range per hour. Three-phase is only necessary for faster commercial charging requirements."
  },
  {
    question: "Why do rapid chargers slow down as the battery fills?",
    answer: "Rapid chargers reduce power as the battery approaches full capacity to prevent damage to battery cells. High charging rates generate heat and stress, which could degrade battery health if continued at high state of charge. This is why charging to 80% is much faster than charging to 100%."
  },
  {
    question: "What qualifications do I need to install EV chargers?",
    answer: "In the UK, you need to be a qualified electrician with current BS 7671 certification. For OZEV grant-funded installations, you must also be registered with an approved certification body and complete manufacturer-specific training for the equipment being installed."
  },
  {
    question: "How does smart charging benefit EV owners?",
    answer: "Smart charging allows scheduling to take advantage of off-peak electricity rates, automatic load balancing to prevent supply overload, solar integration to maximise self-consumption, and participation in demand response programmes that can provide financial incentives."
  },
  {
    question: "What is the lifespan of a typical EV charging unit?",
    answer: "Quality commercial EVSE typically lasts 10-15 years with proper maintenance. Domestic units generally have a 5-10 year lifespan. Key factors affecting longevity include usage frequency, environmental conditions, and regular maintenance of connectors and cables."
  }
];

const RenewableEnergyModule6Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-6">
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
            <Zap className="h-4 w-4" />
            <span>Module 6 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            EV Charging Fundamentals
          </h1>
          <p className="text-white/80">
            Charging Modes, Connectors &amp; Technology
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Modes:</strong> 1-4 define charging configurations and safety</li>
              <li><strong>Connectors:</strong> Type 2 for AC, CCS Combo 2 for DC in Europe</li>
              <li><strong>Power:</strong> 3.6-22 kW AC, 50-350 kW DC rapid</li>
              <li><strong>Integration:</strong> Smart charging enables renewable synergy</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Connector types, charging mode indicators, power ratings</li>
              <li><strong>Use:</strong> Matching charger to vehicle and application requirements</li>
              <li><strong>Apply:</strong> Specifying appropriate solutions for customers</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the four EV charging modes and their applications",
              "Identify connector types and their power capabilities",
              "Explain the difference between AC and DC charging",
              "Describe the role of EVSE communication protocols",
              "Understand power requirements for different charging scenarios",
              "Recognise the integration of EV charging with renewable energy"
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

        {/* Section 1: EV Charging Modes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            EV Charging Modes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The IEC 61851 standard defines four charging modes, each with different power levels, safety features, and communication requirements. Understanding these modes is fundamental to specifying appropriate charging solutions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mode 1 - Basic AC Charging</p>
              <p className="text-sm text-white">
                Direct connection to a standard domestic socket without any dedicated protection or communication. Limited to 16A single-phase (3.6 kW). This mode is not permitted in the UK due to safety concerns and is primarily used in some developing markets.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mode 2 - AC Charging with IC-CPD</p>
              <p className="text-sm text-white">
                Uses a standard domestic socket with an In-Cable Control and Protection Device (IC-CPD). The IC-CPD provides residual current protection and basic communication with the vehicle. Limited to 3.6 kW for safety, this mode serves as a backup or temporary charging solution.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mode 3 - Dedicated AC Charging</p>
              <p className="text-sm text-white">
                The standard for home and workplace charging, using a dedicated EVSE with full communication via the Control Pilot signal. Supports single-phase (up to 7.4 kW) or three-phase (up to 22 kW for AC, 43 kW for some systems). Includes load management capability and smart charging features.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mode 4 - DC Fast Charging</p>
              <p className="text-sm text-white">
                High-power DC charging with the charger converting AC to DC externally. Power ranges from 50 kW to 350 kW or higher. Communication uses CAN bus or PLC for precise control of voltage and current. Primarily used for public rapid charging infrastructure.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Connector Types and Standards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Connector Types and Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Multiple connector standards exist globally, with Europe standardising on Type 2 for AC and CCS Combo 2 for DC charging. Installers must understand connector capabilities and compatibility.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Type 2 (Mennekes)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>European standard for AC charging (IEC 62196-2)</li>
                  <li>7-pin connector supporting single and three-phase</li>
                  <li>Power capability up to 43 kW AC</li>
                  <li>Mandatory for new vehicles in Europe since 2014</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">CCS Combo 2</p>
                <ul className="text-sm text-white space-y-1">
                  <li>European and UK standard for DC fast charging</li>
                  <li>Combines Type 2 AC pins with DC power pins</li>
                  <li>Supports 50 kW to 350 kW+</li>
                  <li>Uses PLC communication (ISO 15118)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CHAdeMO</p>
              <p className="text-sm text-white">
                Japanese DC fast charging standard, declining in Europe but still present at many sites. Supports up to 62.5 kW and notably supports bidirectional charging (V2G/V2H) from early versions.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: AC vs DC Charging Technology */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            AC vs DC Charging Technology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the fundamental difference between AC and DC charging is essential for specifying appropriate solutions and advising customers on their charging needs.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">AC Charging</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Vehicle's onboard charger converts AC to DC</li>
                  <li>Limited by onboard charger capacity (7-22 kW)</li>
                  <li>Lower infrastructure cost</li>
                  <li>Ideal for home and workplace charging</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DC Charging</p>
                <ul className="text-sm text-white space-y-1">
                  <li>External charger supplies DC directly to battery</li>
                  <li>High power levels (50-350 kW)</li>
                  <li>Higher infrastructure cost</li>
                  <li>Ideal for public rapid charging</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Communication and Control Protocols */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Communication and Control Protocols
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern EV charging relies on communication between the vehicle and charging equipment to ensure safe operation and enable smart features.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Control Pilot States (IEC 61851):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>State A: Not connected (12V)</li>
                <li>State B: Connected, not ready (9V)</li>
                <li>State C: Charging (6V)</li>
                <li>State D: Charging with ventilation required (3V)</li>
                <li>State E/F: Error conditions</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ISO 15118 - Plug &amp; Charge</p>
              <p className="text-sm text-white">
                Advanced communication protocol enabling automatic authentication, dynamic tariff information, and bidirectional power transfer. Uses Power Line Communication (PLC) over the charging cable.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: EV Charging and Renewable Integration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            EV Charging and Renewable Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electric vehicles represent both a challenge and opportunity for renewable energy integration. Smart charging strategies can align EV demand with renewable generation, while V2G technology enables vehicles to support grid stability.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Smart Charging Strategies</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Time-of-use optimisation:</strong> Scheduling charging during off-peak periods</li>
                <li><strong>Solar matching:</strong> Adjusting charge rate to match generation</li>
                <li><strong>Demand response:</strong> Reducing or shifting load on grid signals</li>
                <li><strong>Load balancing:</strong> Managing multiple EVs within site capacity</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 my-6">
              <p className="text-elec-yellow text-sm font-medium">
                Key Insight: With average EV batteries of 50-70 kWh and typical daily driving requiring only 10-15 kWh, significant capacity is available for grid services.
              </p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Assessing Customer Requirements</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Determine daily mileage and available charging time</li>
                <li>Check vehicle onboard charger capacity</li>
                <li>Assess existing electrical supply capacity</li>
                <li>Discuss interest in smart/solar integration features</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Matching Charger to Application</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Home with overnight charging: 7 kW single-phase typically sufficient</li>
                <li>Workplace charging: 7-22 kW depending on dwell time</li>
                <li>Public destination: 22 kW AC for medium dwell times</li>
                <li>En-route charging: DC rapid capability required</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Overselling reliability</strong> - be honest about intermittency</li>
                <li><strong>Ignoring onboard charger limits</strong> - AC charging limited by vehicle</li>
                <li><strong>Underestimating supply requirements</strong> - always check capacity</li>
                <li><strong>Forgetting future-proofing</strong> - consider larger cable sizes</li>
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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default RenewableEnergyModule6Section1;
