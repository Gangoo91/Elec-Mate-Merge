import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Heat Recovery Systems - HNC Module 8 Section 2.4";
const DESCRIPTION = "Master heat recovery ventilation systems: plate heat exchangers, thermal wheels (rotary heat exchangers), run-around coils, heat pipe systems, efficiency calculations, frost protection, summer bypass, and Building Regulations Part L requirements for MVHR systems.";

const quickCheckQuestions = [
  {
    id: "mvhr-principle",
    question: "What is the primary function of an MVHR (Mechanical Ventilation with Heat Recovery) system?",
    options: ["To cool incoming air in summer", "To recover heat from exhaust air and transfer it to supply air", "To filter pollutants from outdoor air", "To provide humidity control only"],
    correctIndex: 1,
    explanation: "MVHR systems recover heat from warm exhaust air extracted from kitchens, bathrooms and wet rooms, and transfer this heat to the incoming fresh supply air. This reduces heating demand whilst maintaining good ventilation."
  },
  {
    id: "plate-exchanger-type",
    question: "In a cross-flow plate heat exchanger, the air streams:",
    options: ["Mix directly together", "Pass through each other at 90 degrees without mixing", "Flow in the same direction", "Share a common filter"],
    correctIndex: 1,
    explanation: "In cross-flow plate heat exchangers, the extract and supply air streams pass at 90 degrees to each other, separated by thin plates. Heat transfers through the plates by conduction, but the air streams never mix - maintaining indoor air quality."
  },
  {
    id: "thermal-wheel-operation",
    question: "How does a thermal wheel (rotary heat exchanger) transfer heat?",
    options: ["Through refrigerant pipes", "By rotating a matrix between exhaust and supply air streams", "Using a pumped water circuit", "Through direct air mixing"],
    correctIndex: 1,
    explanation: "A thermal wheel consists of a rotating matrix (typically aluminium honeycomb) that passes alternately through the warm exhaust air stream (absorbing heat) and the cool supply air stream (releasing heat). Rotation speed is typically 10-20 rpm."
  },
  {
    id: "run-around-efficiency",
    question: "Why do run-around coil systems typically have lower efficiency than plate heat exchangers?",
    options: ["They use more electricity", "Heat transfer occurs twice - air to liquid, then liquid to air", "They require larger ductwork", "They cannot operate in cold weather"],
    correctIndex: 1,
    explanation: "Run-around coils require double heat transfer: from exhaust air to the glycol solution, then from the glycol to supply air. Each transfer stage has associated losses, resulting in typical efficiencies of 45-55% compared to 70-90% for plate exchangers."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What minimum heat recovery efficiency does Building Regulations Part L typically require for new dwellings?",
    options: [
      "50%",
      "70%",
      "85%",
      "95%"
    ],
    correctAnswer: 1,
    explanation: "Building Regulations Approved Document L requires MVHR systems to achieve a minimum heat recovery efficiency of approximately 70% (varying by specific application) to meet energy efficiency targets. High-performance units can achieve 90%+ efficiency."
  },
  {
    id: 2,
    question: "Which type of heat recovery device can transfer both sensible and latent heat?",
    options: [
      "Cross-flow plate heat exchanger",
      "Counter-flow plate heat exchanger",
      "Thermal wheel with hygroscopic coating",
      "Run-around coil system"
    ],
    correctAnswer: 2,
    explanation: "Thermal wheels with hygroscopic (moisture-absorbing) coatings can transfer both sensible heat (temperature) and latent heat (moisture) between air streams. This is known as enthalpy recovery and can achieve total heat recovery efficiencies of 75-85%."
  },
  {
    id: 3,
    question: "What is the purpose of a summer bypass in an MVHR system?",
    options: [
      "To increase airflow in summer",
      "To prevent unwanted heat recovery when outdoor air is cooler than indoor air",
      "To reduce noise levels",
      "To filter pollen"
    ],
    correctAnswer: 1,
    explanation: "A summer bypass allows fresh air to enter directly without passing through the heat exchanger. This prevents the system from recovering heat when outdoor air is cooler than indoor air (free cooling opportunity), improving summer comfort and reducing cooling loads."
  },
  {
    id: 4,
    question: "At what outdoor temperature is frost protection typically required for heat recovery systems?",
    options: [
      "Below 10°C",
      "Below 5°C",
      "Below 0°C to -5°C",
      "Below -10°C only"
    ],
    correctAnswer: 2,
    explanation: "Frost protection is typically required when outdoor temperatures fall below 0°C to -5°C. At these temperatures, moisture in the warm exhaust air can condense and freeze on the cold surfaces of the heat exchanger, blocking airflow and reducing efficiency."
  },
  {
    id: 5,
    question: "Which frost protection method involves temporarily reducing supply airflow?",
    options: [
      "Pre-heater",
      "Defrost cycle",
      "Supply air modulation",
      "Recirculation"
    ],
    correctAnswer: 2,
    explanation: "Supply air modulation reduces the supply airflow temporarily, allowing the exhaust air to warm up the heat exchanger surfaces and melt any ice formation. This is energy-efficient but can temporarily reduce ventilation rates during cold periods."
  },
  {
    id: 6,
    question: "What is the typical specific fan power (SFP) limit for MVHR systems under Part L?",
    options: [
      "0.5 W/(l/s)",
      "1.0 W/(l/s)",
      "1.5 W/(l/s)",
      "2.0 W/(l/s)"
    ],
    correctAnswer: 1,
    explanation: "Building Regulations Part L typically limits specific fan power for MVHR systems to around 1.0 W/(l/s) for domestic installations. This ensures that the energy saved through heat recovery is not offset by excessive fan energy consumption."
  },
  {
    id: 7,
    question: "In a run-around coil system, what fluid is typically used in the connecting pipework?",
    options: [
      "Pure water",
      "Refrigerant R410A",
      "Water with glycol antifreeze",
      "Thermal oil"
    ],
    correctAnswer: 2,
    explanation: "Run-around coil systems use a water/glycol mixture (typically 30-40% glycol) to prevent freezing in cold weather. The glycol also provides corrosion protection for the pipework and coils."
  },
  {
    id: 8,
    question: "What is the main advantage of run-around coils over other heat recovery methods?",
    options: [
      "Higher efficiency",
      "Lower cost",
      "Ability to connect non-adjacent air streams with zero cross-contamination",
      "No moving parts"
    ],
    correctAnswer: 2,
    explanation: "Run-around coils can connect extract and supply air streams that are physically separated (different parts of a building) with absolutely no possibility of cross-contamination. This makes them ideal for hospitals, laboratories, and industrial applications."
  },
  {
    id: 9,
    question: "Counter-flow plate heat exchangers achieve higher efficiency than cross-flow because:",
    options: [
      "They have larger surface area",
      "The air streams maintain maximum temperature difference throughout",
      "They use thinner plates",
      "They operate at higher pressures"
    ],
    correctAnswer: 1,
    explanation: "In counter-flow arrangement, the hottest exhaust air meets the warmest supply air and the coolest exhaust meets the coldest supply. This maintains a consistent temperature difference throughout the exchanger, enabling theoretical efficiencies approaching 100%."
  },
  {
    id: 10,
    question: "Heat pipe heat exchangers operate on which principle?",
    options: [
      "Forced convection",
      "Evaporation and condensation of a working fluid",
      "Conduction through solid metal",
      "Natural convection only"
    ],
    correctAnswer: 1,
    explanation: "Heat pipes contain a working fluid that evaporates in the warm exhaust air stream (absorbing latent heat), rises to the supply air section, condenses (releasing heat), and returns by gravity or capillary action. This passive process is highly efficient."
  },
  {
    id: 11,
    question: "What commissioning test should verify MVHR heat recovery performance?",
    options: [
      "Sound level measurement only",
      "Supply and extract temperature measurement under steady-state conditions",
      "Duct leakage test only",
      "Filter pressure drop test"
    ],
    correctAnswer: 1,
    explanation: "Heat recovery efficiency is verified by measuring supply and extract air temperatures at the unit under steady-state conditions. The formula: Efficiency = (T_supply_out - T_supply_in) / (T_extract_in - T_supply_in) x 100%"
  },
  {
    id: 12,
    question: "What is cross-contamination in the context of heat recovery systems?",
    options: [
      "Mixing of supply and return ductwork",
      "Transfer of pollutants or odours from exhaust to supply air stream",
      "Incorrect wiring connections",
      "Filter blockage"
    ],
    correctAnswer: 1,
    explanation: "Cross-contamination occurs when pollutants, odours, or pathogens from the exhaust air stream leak or transfer into the supply air stream. Plate heat exchangers typically have very low leakage (<1%), while thermal wheels may have 2-5% carryover."
  },
  {
    id: 13,
    question: "For a dwelling with 100 l/s ventilation rate and MVHR at 85% efficiency, approximately how much heating power is saved when outdoor temperature is 0°C and indoor is 21°C?",
    options: [
      "1.0 kW",
      "2.1 kW",
      "3.0 kW",
      "4.5 kW"
    ],
    correctAnswer: 1,
    explanation: "Heat saved = Volume flow x Air density x Specific heat x Temperature difference x Efficiency. Q = 0.1 m³/s x 1.2 kg/m³ x 1.0 kJ/kgK x 21K x 0.85 = 2.14 kW. This represents significant heating energy savings."
  },
  {
    id: 14,
    question: "Which Building Regulation document covers ventilation requirements including MVHR?",
    options: [
      "Part E - Resistance to sound",
      "Part F - Ventilation",
      "Part J - Heat producing appliances",
      "Part M - Access"
    ],
    correctAnswer: 1,
    explanation: "Approved Document F covers ventilation requirements for buildings, including minimum ventilation rates, system types, and commissioning requirements. Part L covers the energy efficiency aspects including heat recovery efficiency requirements."
  }
];

const faqs = [
  {
    question: "What is the difference between sensible and total (enthalpy) heat recovery?",
    answer: "Sensible heat recovery transfers only temperature (dry heat) between air streams - this is what standard plate heat exchangers achieve. Total or enthalpy heat recovery also transfers moisture (latent heat), recovering additional energy from the humidity in exhaust air. Thermal wheels with hygroscopic coatings and some membrane-based plate exchangers can achieve enthalpy recovery. In humid climates or applications with high moisture loads (swimming pools, commercial kitchens), enthalpy recovery can significantly improve overall efficiency."
  },
  {
    question: "How do I size an MVHR system for a dwelling?",
    answer: "MVHR sizing starts with calculating the required ventilation rate per Building Regulations Part F - typically based on number of wet rooms (kitchens, bathrooms, utility) with minimum extract rates of 13-30 l/s per room. The supply rate should balance or slightly exceed extract rate. Select a unit that can deliver the required airflow at acceptable pressure and noise levels. Ductwork must be sized for velocities below 3 m/s (ideally 2-2.5 m/s) to minimise noise. Consider boost rates for kitchens (typically 3x background rate)."
  },
  {
    question: "Why might an MVHR system underperform in practice?",
    answer: "Common causes of MVHR underperformance include: poor airtightness allowing uncontrolled air infiltration (bypassing heat recovery); dirty or blocked filters increasing pressure drop; incorrectly balanced supply and extract rates; excessive duct lengths or poor duct installation creating high resistance; inadequate commissioning; summer bypass not functioning correctly; and frost protection activating too frequently. Regular maintenance and proper commissioning are essential."
  },
  {
    question: "Can MVHR systems provide cooling as well as heating energy recovery?",
    answer: "Yes, in summer when outdoor air is warmer than indoor air, MVHR can recover 'coolth' - the heat exchanger transfers heat from warm incoming air to cooler exhaust air, reducing the temperature of supply air. However, the summer bypass should activate when outdoor temperature is lower than indoor temperature to allow free cooling. Some MVHR units can also integrate with air source heat pumps or cooling coils for active cooling."
  },
  {
    question: "What maintenance does an MVHR system require?",
    answer: "MVHR maintenance includes: filter replacement every 3-12 months depending on environment (some units have washable filters); annual cleaning of heat exchanger (many are removable and dishwasher-safe); checking and cleaning condensate drains; inspecting ductwork for damage or disconnection; verifying fan operation and airflow rates; checking controls and sensors; and cleaning external grilles and terminals. Most manufacturers recommend professional servicing annually."
  },
  {
    question: "How does building airtightness affect MVHR effectiveness?",
    answer: "MVHR systems rely on controlled ventilation through the unit to recover heat effectively. In leaky buildings (air permeability &gt;5 m³/h.m² at 50Pa), significant uncontrolled air infiltration bypasses the heat recovery system entirely, reducing its effectiveness and wasting energy. Building Regulations typically require air permeability &lt;5 m³/h.m² for MVHR to be effective, with best practice being &lt;3 m³/h.m². Very airtight Passivhaus buildings (&lt;0.6 ACH at 50Pa) achieve maximum benefit from MVHR."
  }
];

const HNCModule8Section2_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 8.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Heat Recovery Systems
          </h1>
          <p className="text-white/80">
            Plate heat exchangers, thermal wheels, run-around coils, efficiency calculations, and control strategies for building ventilation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>MVHR:</strong> Mechanical ventilation with heat recovery</li>
              <li className="pl-1"><strong>Efficiency:</strong> 70-95% heat recovery achievable</li>
              <li className="pl-1"><strong>Part L requirement:</strong> Minimum 70% efficiency</li>
              <li className="pl-1"><strong>SFP limit:</strong> Typically 1.0 W/(l/s) maximum</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Heat Recovery Types</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Plate exchangers:</strong> 70-95% efficiency, no moving parts</li>
              <li className="pl-1"><strong>Thermal wheels:</strong> 75-85% efficiency, enthalpy recovery</li>
              <li className="pl-1"><strong>Run-around coils:</strong> 45-55% efficiency, zero cross-contamination</li>
              <li className="pl-1"><strong>Heat pipes:</strong> 50-70% efficiency, passive operation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand MVHR principles and Building Regulations requirements",
              "Compare different heat recovery technologies and their applications",
              "Calculate heat recovery efficiency and energy savings",
              "Specify frost protection and summer bypass strategies",
              "Design and commission heat recovery systems effectively",
              "Maintain MVHR systems for optimal long-term performance"
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

        {/* Section 1: MVHR Principles and Regulations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            MVHR Principles and Building Regulations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Mechanical Ventilation with Heat Recovery (MVHR) systems provide controlled ventilation whilst
              recovering heat from exhaust air. This significantly reduces heating energy demand in well-insulated,
              airtight buildings - making MVHR essential for meeting modern Building Regulations energy targets.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">How MVHR Works</p>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-blue-400 mb-2">Extract Side</p>
                    <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                      <li className="pl-1">Warm, stale air extracted from wet rooms</li>
                      <li className="pl-1">Kitchens: 13-30 l/s continuous</li>
                      <li className="pl-1">Bathrooms: 8-15 l/s continuous</li>
                      <li className="pl-1">Utility rooms: 8 l/s continuous</li>
                      <li className="pl-1">Heat recovered before discharge</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-green-400 mb-2">Supply Side</p>
                    <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                      <li className="pl-1">Fresh outdoor air drawn in</li>
                      <li className="pl-1">Filtered to remove pollutants</li>
                      <li className="pl-1">Pre-heated by recovered energy</li>
                      <li className="pl-1">Supplied to living/bedroom spaces</li>
                      <li className="pl-1">Typically 18-20°C delivery temperature</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Regulations Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Part F (Ventilation)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Part L (Energy)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ventilation rate</td>
                      <td className="border border-white/10 px-3 py-2">Based on wet room count</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heat recovery efficiency</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">&gt;70% (typical requirement)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Specific fan power</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">&lt;1.0 W/(l/s) domestic</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Airtightness</td>
                      <td className="border border-white/10 px-3 py-2">Required for System 4</td>
                      <td className="border border-white/10 px-3 py-2">&lt;5 m³/h.m² at 50Pa</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commissioning</td>
                      <td className="border border-white/10 px-3 py-2">Airflow measurement required</td>
                      <td className="border border-white/10 px-3 py-2">Performance verification</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Energy Savings Potential</p>
              <p className="text-sm text-white/90">
                A well-designed MVHR system recovering 85% of exhaust heat can save 2,000-4,000 kWh/year
                in a typical UK dwelling - equivalent to £200-400 annually at current energy prices. The
                system also improves indoor air quality by filtering incoming air and removing moisture,
                reducing condensation and mould risk.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key requirement:</strong> MVHR only works effectively in airtight buildings. Uncontrolled air leakage bypasses the heat recovery system entirely.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Plate Heat Exchangers */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Plate Heat Exchangers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Plate heat exchangers are the most common heat recovery technology in MVHR systems.
              They use thin metal or plastic plates to separate the extract and supply air streams,
              allowing heat transfer by conduction without air mixing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Types of Plate Heat Exchangers</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                  <p className="font-medium text-blue-400 mb-2">Cross-Flow Exchanger</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Air streams cross at 90 degrees</li>
                    <li className="pl-1">Typical efficiency: 50-75%</li>
                    <li className="pl-1">Compact, simple construction</li>
                    <li className="pl-1">Lower pressure drop</li>
                    <li className="pl-1">Common in smaller units</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                  <p className="font-medium text-green-400 mb-2">Counter-Flow Exchanger</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Air streams flow in opposite directions</li>
                    <li className="pl-1">Typical efficiency: 75-95%</li>
                    <li className="pl-1">Maximum temperature differential maintained</li>
                    <li className="pl-1">Higher pressure drop</li>
                    <li className="pl-1">Required for high-efficiency systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Plate Heat Exchanger Specifications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cross-Flow</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Counter-Flow</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heat recovery efficiency</td>
                      <td className="border border-white/10 px-3 py-2">50-75%</td>
                      <td className="border border-white/10 px-3 py-2">75-95%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plate material</td>
                      <td className="border border-white/10 px-3 py-2">Aluminium or plastic</td>
                      <td className="border border-white/10 px-3 py-2">Aluminium or polystyrene</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pressure drop</td>
                      <td className="border border-white/10 px-3 py-2">50-150 Pa</td>
                      <td className="border border-white/10 px-3 py-2">100-250 Pa</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cross-contamination</td>
                      <td className="border border-white/10 px-3 py-2">&lt;1% (leakage)</td>
                      <td className="border border-white/10 px-3 py-2">&lt;1% (leakage)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Moisture transfer</td>
                      <td className="border border-white/10 px-3 py-2">Sensible only (standard)</td>
                      <td className="border border-white/10 px-3 py-2">Enthalpy (membrane types)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Washable, annual clean</td>
                      <td className="border border-white/10 px-3 py-2">Washable, annual clean</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Efficiency Calculation</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Heat Recovery Efficiency (η) = (T_supply_out - T_supply_in) / (T_extract_in - T_supply_in) × 100%</p>
                <p className="mt-2 text-white/60">Where:</p>
                <p className="text-white/60">T_supply_out = Temperature of supply air leaving exchanger</p>
                <p className="text-white/60">T_supply_in = Temperature of outdoor supply air entering</p>
                <p className="text-white/60">T_extract_in = Temperature of extract air entering exchanger</p>
                <p className="mt-2">Example: Supply in 0°C, Extract in 21°C, Supply out 17°C</p>
                <p>η = (17 - 0) / (21 - 0) × 100% = <strong>81%</strong></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection tip:</strong> Counter-flow exchangers are essential to meet Part L efficiency requirements. Plastic plate exchangers offer better frost resistance than aluminium.
            </p>
          </div>
        </section>

        {/* Section 3: Thermal Wheels and Run-Around Coils */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Thermal Wheels and Run-Around Coils
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Alternative heat recovery technologies offer advantages for specific applications.
              Thermal wheels provide enthalpy recovery, while run-around coils enable heat recovery
              between physically separated air streams with zero cross-contamination.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Thermal Wheels (Rotary Heat Exchangers)</p>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-purple-400 mb-2">Operating Principle</p>
                <p className="text-sm text-white/90 mb-3">
                  A thermal wheel consists of a rotating matrix (typically aluminium honeycomb structure)
                  that passes alternately through the warm exhaust and cool supply air streams. The matrix
                  absorbs heat from the exhaust air and releases it to the supply air as it rotates.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-1">Advantages</p>
                    <ul className="text-white/80 space-y-1 list-disc list-outside ml-5">
                      <li className="pl-1">Enthalpy recovery (sensible + latent)</li>
                      <li className="pl-1">75-85% total efficiency achievable</li>
                      <li className="pl-1">Self-cleaning action</li>
                      <li className="pl-1">Lower frost risk (hygroscopic types)</li>
                      <li className="pl-1">Good for humid applications</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Limitations</p>
                    <ul className="text-white/80 space-y-1 list-disc list-outside ml-5">
                      <li className="pl-1">2-5% cross-contamination (carryover)</li>
                      <li className="pl-1">Moving parts require maintenance</li>
                      <li className="pl-1">Air streams must be adjacent</li>
                      <li className="pl-1">Motor and drive belt wear</li>
                      <li className="pl-1">Not suitable for fume extraction</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Run-Around Coils</p>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-orange-400 mb-2">System Components</p>
                <p className="text-sm text-white/90 mb-3">
                  Run-around coil systems use two finned-tube coils (one in extract, one in supply)
                  connected by pipework carrying a water/glycol solution. A pump circulates the fluid,
                  which absorbs heat from exhaust air and releases it to supply air.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-1">Advantages</p>
                    <ul className="text-white/80 space-y-1 list-disc list-outside ml-5">
                      <li className="pl-1">Zero cross-contamination</li>
                      <li className="pl-1">Air streams can be remote</li>
                      <li className="pl-1">Ideal for hospitals, labs</li>
                      <li className="pl-1">Easy to retrofit</li>
                      <li className="pl-1">Simple control (pump on/off)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Limitations</p>
                    <ul className="text-white/80 space-y-1 list-disc list-outside ml-5">
                      <li className="pl-1">Lower efficiency (45-55%)</li>
                      <li className="pl-1">Double heat transfer loss</li>
                      <li className="pl-1">Pump energy consumption</li>
                      <li className="pl-1">Pipework and glycol costs</li>
                      <li className="pl-1">Freeze protection required</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heat Recovery Technology Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Technology</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Efficiency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cross-Contamination</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Counter-flow plate</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">75-95%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">&lt;1%</td>
                      <td className="border border-white/10 px-3 py-2">Dwellings, offices</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cross-flow plate</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">50-75%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">&lt;1%</td>
                      <td className="border border-white/10 px-3 py-2">Compact installations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermal wheel</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">75-85%</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">2-5%</td>
                      <td className="border border-white/10 px-3 py-2">Swimming pools, humid spaces</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Run-around coils</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">45-55%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">0%</td>
                      <td className="border border-white/10 px-3 py-2">Hospitals, laboratories</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heat pipes</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">50-70%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">0%</td>
                      <td className="border border-white/10 px-3 py-2">Process exhaust, passive systems</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Heat Pipe Systems</p>
              <p className="text-sm text-white/90">
                Heat pipes are sealed tubes containing a working fluid (typically refrigerant) that evaporates
                in the warm air stream and condenses in the cool air stream. They are completely passive (no
                moving parts or pumps) and provide zero cross-contamination. Common in industrial exhaust
                applications where reliability and simplicity are paramount.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection guidance:</strong> Choose plate exchangers for most comfort applications. Use run-around coils where contamination must be avoided. Consider thermal wheels for high-humidity applications requiring moisture recovery.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Efficiency, Control and Frost Protection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Efficiency, Control and Frost Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective control strategies are essential to maximise heat recovery benefits whilst
              protecting equipment and maintaining comfort. This includes frost protection in winter,
              summer bypass for free cooling, and demand-controlled ventilation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Frost Protection Methods</p>
              <p className="text-sm text-white/80 mb-3">
                When outdoor temperatures fall below approximately -5°C, moisture in warm exhaust air
                can freeze on the cold heat exchanger surfaces, blocking airflow and damaging equipment.
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                  <p className="font-medium text-blue-400 mb-1">Pre-Heater</p>
                  <p className="text-sm text-white/90">
                    Electric or LPHW coil heats incoming air to above freezing point before entering
                    exchanger. Simple and effective but uses energy, partially offsetting heat recovery savings.
                    Typically activates below -5°C outdoor temperature.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                  <p className="font-medium text-green-400 mb-1">Supply Air Modulation</p>
                  <p className="text-sm text-white/90">
                    Temporarily reduces supply airflow, allowing warm exhaust air to defrost the exchanger.
                    Energy-efficient but temporarily reduces ventilation. Often combined with recirculation
                    to maintain air movement within the building.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                  <p className="font-medium text-orange-400 mb-1">Defrost Cycle</p>
                  <p className="text-sm text-white/90">
                    Periodically bypasses heat recovery or reverses airflow to melt ice. Can cause
                    temporary discomfort as cold air enters. Some systems use exhaust air recirculation
                    during defrost periods.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                  <p className="font-medium text-purple-400 mb-1">Earth Tube Pre-Heating</p>
                  <p className="text-sm text-white/90">
                    Outdoor air passes through buried tubes, pre-tempered by ground heat (8-12°C year-round).
                    Passive, zero-energy frost protection but requires significant excavation. Also provides
                    summer pre-cooling benefit.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Summer Bypass Operation</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-white/90 mb-3">
                  When outdoor temperature is lower than indoor temperature, heat recovery is undesirable -
                  it would heat incoming air that is already cooler than required. A summer bypass allows
                  fresh air to enter directly, providing free cooling.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-1">Bypass Activation Conditions</p>
                    <ul className="text-white/80 space-y-1 list-disc list-outside ml-5">
                      <li className="pl-1">Outdoor temp &lt; Indoor temp</li>
                      <li className="pl-1">No heating demand</li>
                      <li className="pl-1">Typically above 12-15°C outdoor</li>
                      <li className="pl-1">Hysteresis prevents hunting</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Bypass Methods</p>
                    <ul className="text-white/80 space-y-1 list-disc list-outside ml-5">
                      <li className="pl-1">Motorised damper around exchanger</li>
                      <li className="pl-1">100% bypass or modulating</li>
                      <li className="pl-1">Automatic based on temperature</li>
                      <li className="pl-1">Can be manually overridden</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Demand-Controlled Ventilation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Control Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Sensor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CO₂-based</td>
                      <td className="border border-white/10 px-3 py-2">CO₂ sensor (target 800-1000 ppm)</td>
                      <td className="border border-white/10 px-3 py-2">Offices, schools, meeting rooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Humidity-based</td>
                      <td className="border border-white/10 px-3 py-2">RH sensor (target 40-60%)</td>
                      <td className="border border-white/10 px-3 py-2">Bathrooms, kitchens, wet rooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Occupancy-based</td>
                      <td className="border border-white/10 px-3 py-2">PIR, CO₂, or schedule</td>
                      <td className="border border-white/10 px-3 py-2">Variable occupancy spaces</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Boost mode</td>
                      <td className="border border-white/10 px-3 py-2">Manual switch or automatic</td>
                      <td className="border border-white/10 px-3 py-2">Cooking, showering events</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Requirements</p>
              <div className="p-4 rounded-lg bg-white/5">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Airflow measurement:</strong> Verify supply and extract rates at each terminal</li>
                  <li className="pl-1"><strong>Balance check:</strong> Supply within ±10% of extract rate</li>
                  <li className="pl-1"><strong>Temperature test:</strong> Measure heat recovery efficiency under steady-state</li>
                  <li className="pl-1"><strong>Filter pressure:</strong> Record clean filter pressure drop baseline</li>
                  <li className="pl-1"><strong>Controls verification:</strong> Test boost, bypass, frost protection functions</li>
                  <li className="pl-1"><strong>Noise measurement:</strong> Verify compliance with design criteria</li>
                  <li className="pl-1"><strong>Documentation:</strong> Record all settings and provide to building owner</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Commissioning Issues</p>
              <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Unbalanced airflow:</strong> Extract exceeding supply creates negative pressure</li>
                <li className="pl-1"><strong>Dirty filters:</strong> Pre-commissioning filters left in place</li>
                <li className="pl-1"><strong>Duct leakage:</strong> Reducing actual delivered airflow</li>
                <li className="pl-1"><strong>Incorrect wiring:</strong> Fans running at wrong speed or direction</li>
                <li className="pl-1"><strong>Bypass stuck:</strong> Always open or always closed</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Part L compliance:</strong> Commissioning results must be recorded and submitted as part of Building Regulations compliance evidence. Include measured SFP, heat recovery efficiency, and airflow rates.
            </p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Heat Recovery Efficiency Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An MVHR unit is tested with outdoor air at -2°C, extract air at 20°C, and supply air leaving the exchanger at 15.5°C. Calculate the heat recovery efficiency.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given: T_supply_in = -2°C, T_extract_in = 20°C, T_supply_out = 15.5°C</p>
                <p className="mt-2">Heat Recovery Efficiency Formula:</p>
                <p>η = (T_supply_out - T_supply_in) / (T_extract_in - T_supply_in) × 100%</p>
                <p className="mt-2">Calculation:</p>
                <p>η = (15.5 - (-2)) / (20 - (-2)) × 100%</p>
                <p>η = (15.5 + 2) / (20 + 2) × 100%</p>
                <p>η = 17.5 / 22 × 100%</p>
                <p>η = <strong>79.5%</strong></p>
                <p className="mt-2 text-green-400">This exceeds the Part L minimum of 70% - compliant</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Annual Energy Savings Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate annual heating energy saved by an MVHR system with 80% efficiency, 50 l/s airflow, operating 8,760 hours/year, average heating season ΔT of 15°C for 5,000 hours.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given: η = 80%, Q = 50 l/s = 0.05 m³/s, ΔT = 15°C, t = 5000 hours</p>
                <p className="mt-2">Heat Recovery Power:</p>
                <p>P = Q × ρ × Cp × ΔT × η</p>
                <p>P = 0.05 m³/s × 1.2 kg/m³ × 1.0 kJ/kgK × 15K × 0.80</p>
                <p>P = 0.72 kW recovered heat</p>
                <p className="mt-2">Annual Energy Saved:</p>
                <p>E = P × t = 0.72 kW × 5000 h</p>
                <p>E = <strong>3,600 kWh/year</strong></p>
                <p className="mt-2">At £0.10/kWh gas, annual saving ≈ £360</p>
                <p className="text-green-400">Plus reduced boiler wear and improved comfort</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Specific Fan Power Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An MVHR unit has two fans each consuming 45W to deliver 60 l/s. Calculate the specific fan power and assess Part L compliance.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given: Total fan power = 2 × 45W = 90W, Airflow = 60 l/s</p>
                <p className="mt-2">Specific Fan Power Formula:</p>
                <p>SFP = Total Fan Power / Airflow</p>
                <p className="mt-2">Calculation:</p>
                <p>SFP = 90W / 60 l/s</p>
                <p>SFP = <strong>1.5 W/(l/s)</strong></p>
                <p className="mt-2 text-red-400">This exceeds the Part L limit of 1.0 W/(l/s)</p>
                <p className="text-white/60">Solutions: Reduce duct resistance, larger ductwork,</p>
                <p className="text-white/60">more efficient fans, or lower airflow if compliant</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Dwelling MVHR Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Size an MVHR system for a 3-bedroom dwelling with 1 kitchen, 2 bathrooms, and 1 utility room. Determine the minimum continuous ventilation rate.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Part F Ventilation Rates (System 4 - Continuous MVHR):</p>
                <p className="mt-2">Extract Requirements:</p>
                <p>Kitchen: 13 l/s (minimum continuous)</p>
                <p>Bathroom 1: 8 l/s</p>
                <p>Bathroom 2: 8 l/s</p>
                <p>Utility: 8 l/s</p>
                <p className="mt-2">Total Extract = 13 + 8 + 8 + 8 = <strong>37 l/s</strong></p>
                <p className="mt-2">Whole dwelling rate check:</p>
                <p>Minimum = 0.3 l/s per m² floor area</p>
                <p>For 100m² dwelling: 0.3 × 100 = 30 l/s</p>
                <p className="mt-2">Design rate = MAX(37, 30) = <strong>37 l/s continuous</strong></p>
                <p className="mt-2 text-white/60">Boost rates: Kitchen 30 l/s, Bathrooms 15 l/s each</p>
                <p className="text-green-400">Select unit capable of 60+ l/s for boost capacity</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Heat recovery efficiency:</strong> η = (T_supply_out - T_supply_in) / (T_extract_in - T_supply_in) × 100%</li>
                <li className="pl-1"><strong>Recovered heat:</strong> Q = V̇ × ρ × Cp × ΔT × η (where V̇ = volume flow rate)</li>
                <li className="pl-1"><strong>Specific fan power:</strong> SFP = Total fan power (W) / Airflow (l/s)</li>
                <li className="pl-1"><strong>Air density:</strong> ρ ≈ 1.2 kg/m³ at standard conditions</li>
                <li className="pl-1"><strong>Specific heat of air:</strong> Cp ≈ 1.0 kJ/kgK</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Design Values</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Part L heat recovery efficiency: <strong>&gt;70%</strong></li>
                <li className="pl-1">Part L SFP limit (domestic): <strong>≤1.0 W/(l/s)</strong></li>
                <li className="pl-1">Duct velocity limit (noise): <strong>2-3 m/s</strong></li>
                <li className="pl-1">Airtightness for MVHR: <strong>&lt;5 m³/h.m² at 50Pa</strong></li>
                <li className="pl-1">Frost protection activation: <strong>-5°C to 0°C</strong></li>
                <li className="pl-1">Summer bypass activation: <strong>12-15°C outdoor</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Best Practice</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Locate MVHR unit centrally to minimise duct runs</li>
                <li className="pl-1">Use rigid ductwork where possible (lower resistance than flexible)</li>
                <li className="pl-1">Insulate all ductwork in unheated spaces</li>
                <li className="pl-1">Seal all duct joints with appropriate tape</li>
                <li className="pl-1">Provide condensate drain with trap</li>
                <li className="pl-1">Ensure filter access for maintenance</li>
                <li className="pl-1">Separate supply and extract terminals by minimum 2m</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Design Errors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Excessive duct lengths:</strong> Increases pressure drop and SFP</li>
                <li className="pl-1"><strong>Undersized ductwork:</strong> Causes noise and high resistance</li>
                <li className="pl-1"><strong>Poor airtightness:</strong> Renders heat recovery ineffective</li>
                <li className="pl-1"><strong>Missing frost protection:</strong> Leads to ice damage in cold spells</li>
                <li className="pl-1"><strong>No summer bypass:</strong> Overheating in warm weather</li>
                <li className="pl-1"><strong>Inaccessible filters:</strong> Leads to poor maintenance</li>
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
                <p className="font-medium text-white mb-1">Heat Recovery Types</p>
                <ul className="space-y-0.5">
                  <li>Counter-flow plate: 75-95% efficiency</li>
                  <li>Cross-flow plate: 50-75% efficiency</li>
                  <li>Thermal wheel: 75-85% (enthalpy)</li>
                  <li>Run-around coils: 45-55% (zero contamination)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Part L Requirements</p>
                <ul className="space-y-0.5">
                  <li>Heat recovery: &gt;70% efficiency</li>
                  <li>SFP: ≤1.0 W/(l/s) domestic</li>
                  <li>Airtightness: &lt;5 m³/h.m² at 50Pa</li>
                  <li>Commissioning: Recorded results required</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Control Functions</p>
                <ul className="space-y-0.5">
                  <li>Frost protection: Below -5°C to 0°C</li>
                  <li>Summer bypass: Outdoor &lt; indoor temp</li>
                  <li>Boost mode: 2-3× background rate</li>
                  <li>Demand control: CO₂ or humidity based</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Maintenance Schedule</p>
                <ul className="space-y-0.5">
                  <li>Filter check: Monthly visual</li>
                  <li>Filter replacement: 3-12 months</li>
                  <li>Heat exchanger clean: Annually</li>
                  <li>Full service: Annually by competent person</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

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
            <Link to="../h-n-c-module8-section2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Fan Selection
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section2-5">
              Next: Ductwork Design
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section2_4;
