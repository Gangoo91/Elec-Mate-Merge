import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "CHP and District Energy - HNC Module 6 Section 2.6";
const DESCRIPTION = "Master combined heat and power systems, district heating networks, energy centres, and system optimisation for building services engineering including prime movers, heat recovery, and baseload operation strategies.";

const quickCheckQuestions = [
  {
    id: "chp-definition",
    question: "What is the primary advantage of combined heat and power over separate heat and power generation?",
    options: ["Lower capital cost", "Higher overall efficiency by utilising waste heat", "Simpler maintenance requirements", "Reduced electrical output"],
    correctIndex: 1,
    explanation: "CHP achieves overall efficiencies of 70-90% by recovering waste heat that would otherwise be rejected to atmosphere in conventional power generation, where typical electrical efficiency is only 35-45%."
  },
  {
    id: "heat-to-power",
    question: "A CHP unit with a heat-to-power ratio of 1.5:1 produces 200 kWe. What is the thermal output?",
    options: ["133 kW", "200 kW", "300 kW", "500 kW"],
    correctIndex: 2,
    explanation: "Heat-to-power ratio = Heat output / Electrical output. With ratio 1.5:1 and 200 kWe electrical: Heat = 1.5 × 200 = 300 kWth."
  },
  {
    id: "district-heating",
    question: "What is the primary function of a heat interface unit (HIU) in a district heating system?",
    options: ["Generate electricity from heat", "Transfer heat from the district network to the building's heating system", "Pump water through the network", "Store thermal energy"],
    correctIndex: 1,
    explanation: "A heat interface unit (HIU) acts as the interface between the district heating primary network and the building's secondary heating and hot water systems, typically using plate heat exchangers for hydraulic separation."
  },
  {
    id: "baseload-operation",
    question: "Why is CHP typically sized for baseload operation rather than peak demand?",
    options: ["It cannot generate enough power for peak loads", "To maximise running hours and economic return", "Regulations prohibit peak operation", "It requires constant fuel supply"],
    correctIndex: 1,
    explanation: "Sizing CHP for baseload (continuous minimum demand) maximises annual running hours, typically 4,000-6,000+ hours, which is essential for economic viability. Peak-sized units would have excessive idle time and poor payback."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A gas engine CHP unit has an electrical efficiency of 38% and thermal efficiency of 50%. What is the overall efficiency?",
    options: [
      "38%",
      "50%",
      "88%",
      "44%"
    ],
    correctAnswer: 2,
    explanation: "Overall CHP efficiency = Electrical efficiency + Thermal efficiency = 38% + 50% = 88%. This demonstrates the significant efficiency gain compared to separate generation."
  },
  {
    id: 2,
    question: "Which prime mover technology is most suitable for a CHP system requiring frequent start-stop operation?",
    options: ["Steam turbine", "Gas turbine", "Reciprocating gas engine", "Combined cycle"],
    correctAnswer: 2,
    explanation: "Reciprocating gas engines have excellent part-load efficiency and can handle frequent start-stop cycles, typically reaching full output within 2-5 minutes. Gas turbines prefer continuous operation and take longer to reach operating temperature."
  },
  {
    id: 3,
    question: "A district heating network operates at 90°C flow and 60°C return. What is the temperature differential (ΔT)?",
    options: ["30 K", "60°C", "90°C", "150 K"],
    correctAnswer: 0,
    explanation: "Temperature differential (ΔT) = Flow temperature - Return temperature = 90°C - 60°C = 30 K (or 30°C). A higher ΔT allows more heat to be transferred per unit of water flow."
  },
  {
    id: 4,
    question: "What is the typical heat-to-power ratio for a gas engine CHP unit?",
    options: [
      "0.5:1",
      "1.0-1.5:1",
      "3:1",
      "5:1"
    ],
    correctAnswer: 1,
    explanation: "Gas engine CHP units typically have heat-to-power ratios of 1.0-1.5:1, meaning they produce slightly more heat than electricity. This suits buildings with moderate heating demands relative to electrical loads."
  },
  {
    id: 5,
    question: "A CHP unit consumes 500 kW of gas and produces 180 kWe. Calculate the electrical efficiency.",
    options: [
      "28%",
      "36%",
      "45%",
      "64%"
    ],
    correctAnswer: 1,
    explanation: "Electrical efficiency = (Electrical output / Fuel input) × 100 = (180 / 500) × 100 = 36%. This is typical for a medium-sized gas engine CHP."
  },
  {
    id: 6,
    question: "In a district heating system, what is the purpose of expansion vessels?",
    options: [
      "To increase system pressure",
      "To accommodate thermal expansion of water and maintain system pressure",
      "To filter impurities from the water",
      "To generate additional heat"
    ],
    correctAnswer: 1,
    explanation: "Expansion vessels accommodate the increased volume of water as it heats up (thermal expansion) and help maintain stable system pressure. Without them, pressure would rise dangerously or relief valves would discharge."
  },
  {
    id: 7,
    question: "What advantage does a gas turbine CHP have over a reciprocating engine for large-scale applications?",
    options: [
      "Better part-load efficiency",
      "Higher grade exhaust heat (typically 450-550°C)",
      "Lower maintenance costs",
      "Faster start-up times"
    ],
    correctAnswer: 1,
    explanation: "Gas turbines produce higher grade exhaust heat (450-550°C vs 80-120°C jacket water), making them suitable for steam generation and absorption chillers. However, they have poorer part-load efficiency than gas engines."
  },
  {
    id: 8,
    question: "A heat interface unit typically includes which components?",
    options: [
      "Boiler and pump only",
      "Plate heat exchangers, control valves, and energy meters",
      "CHP engine and alternator",
      "Cooling tower and condenser"
    ],
    correctAnswer: 1,
    explanation: "A typical HIU contains plate heat exchangers (for space heating and DHW), motorised control valves, circulation pumps, differential pressure control, heat meters for billing, and safety devices."
  },
  {
    id: 9,
    question: "For economic viability, what minimum annual running hours are typically required for CHP?",
    options: [
      "1,000-2,000 hours",
      "2,000-3,000 hours",
      "4,000-5,000+ hours",
      "8,000+ hours"
    ],
    correctAnswer: 2,
    explanation: "CHP typically requires 4,000-5,000+ annual running hours for economic viability. This represents approximately 45-60% capacity factor. Hospitals and hotels often exceed this; schools may struggle to achieve it."
  },
  {
    id: 10,
    question: "What is the purpose of a thermal store in a CHP installation?",
    options: [
      "To generate additional electricity",
      "To decouple heat production from demand, enabling longer CHP running hours",
      "To cool the CHP engine",
      "To supply fuel to the engine"
    ],
    correctAnswer: 1,
    explanation: "Thermal stores buffer between CHP heat production and building demand. This allows CHP to run continuously at optimal load while the store absorbs excess heat, which is later used when demand exceeds CHP output."
  },
  {
    id: 11,
    question: "In a three-phase synchronous generator, what determines the output frequency?",
    options: [
      "The voltage level",
      "The number of poles and rotational speed",
      "The load connected",
      "The fuel consumption rate"
    ],
    correctAnswer: 1,
    explanation: "Output frequency f = (n × p) / 120, where n is speed in RPM and p is number of poles. For 50 Hz output, a 4-pole generator runs at 1,500 RPM, or a 2-pole at 3,000 RPM."
  },
  {
    id: 12,
    question: "What is the primary benefit of variable flow in district heating networks?",
    options: [
      "Higher flow rates",
      "Reduced pumping energy while maintaining heat delivery",
      "Constant pressure throughout the system",
      "Simpler control systems"
    ],
    correctAnswer: 1,
    explanation: "Variable flow systems modulate pump speed to match demand, significantly reducing pumping energy (pump power varies with cube of flow). This can reduce pumping costs by 50-70% compared to constant flow systems."
  }
];

const faqs = [
  {
    question: "How do you size a CHP system for a building?",
    answer: "CHP should be sized to meet the baseload heat demand - the minimum continuous thermal requirement - not the peak. Analyse half-hourly heat demand data over a full year to identify this baseload. The CHP should run for at least 4,000-5,000 hours annually to be economically viable. Typically, CHP is sized to meet 30-50% of peak heat demand but 70-80% of annual heat consumption. The remaining peak demand is met by conventional boilers."
  },
  {
    question: "What are the key differences between gas engine and gas turbine CHP?",
    answer: "Gas engines (reciprocating) offer higher electrical efficiency (35-45%), better part-load performance, lower grade waste heat (80-120°C jacket, 400°C exhaust), and suit smaller applications (50 kWe to 5 MWe). Gas turbines provide higher grade exhaust heat (450-550°C) ideal for steam generation, suit larger installations (500 kWe to 50+ MWe), but have poorer part-load efficiency and prefer continuous operation. Gas engines are more common in UK building services applications."
  },
  {
    question: "What is the difference between a 3rd and 4th generation district heating network?",
    answer: "3rd generation networks (current UK standard) operate at 70-90°C flow, 40-60°C return using pressurised water. 4th generation (emerging) uses lower temperatures (50-60°C flow, 25-35°C return), enabling use of low-grade heat sources such as data centres, industrial waste heat, and heat pumps. Lower temperatures reduce heat losses but require buildings with low-temperature heating systems such as underfloor heating."
  },
  {
    question: "How does CHP export electricity to the grid?",
    answer: "Grid-connected CHP requires a G99 (larger installations) or G98 (smaller) connection agreement with the DNO. The CHP synchronises with the grid (matching voltage, frequency, and phase) before connecting. A protection relay monitors grid conditions and disconnects if abnormalities occur (loss of mains, over/under voltage/frequency). Exported electricity earns revenue through power purchase agreements (PPAs) or deemed export tariffs."
  },
  {
    question: "What controls are needed for optimal CHP operation?",
    answer: "Effective CHP control requires: thermal demand monitoring to ensure heat can be absorbed; grid synchronisation and protection; thermal store management with charge/discharge logic; cascade control with backup boilers; spark spread monitoring to verify economic benefit (gas price vs electricity value); and load following to match electrical and thermal outputs to demand patterns."
  },
  {
    question: "What causes losses in district heating networks?",
    answer: "Main losses include: heat loss from distribution pipework (typically 5-15% for modern pre-insulated pipes, higher for older networks); pumping energy (1-3% of thermal energy delivered); standing losses from thermal stores and HIUs; and bypass flow at network extremities. Good design minimises losses through proper insulation specification, achieving high ΔT (reducing flow rates), and optimising network layout to minimise pipe runs."
  }
];

const HNCModule6Section2_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section2">
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
            <span>Module 6.2.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            CHP and District Energy
          </h1>
          <p className="text-white/80">
            Combined heat and power systems, district heating networks, energy centres, and system optimisation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CHP:</strong> Simultaneous generation of electricity and useful heat</li>
              <li className="pl-1"><strong>Efficiency:</strong> 70-90% overall vs 35-45% for power stations</li>
              <li className="pl-1"><strong>District heating:</strong> Centralised heat distribution via pipe networks</li>
              <li className="pl-1"><strong>Baseload sizing:</strong> Target 4,000-5,000+ running hours annually</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Applications:</strong> Hospitals, hotels, campuses, residential estates</li>
              <li className="pl-1"><strong>Prime movers:</strong> Gas engines (common), gas turbines (large scale)</li>
              <li className="pl-1"><strong>Heat recovery:</strong> Jacket water, exhaust gas, oil cooling</li>
              <li className="pl-1"><strong>Integration:</strong> Thermal stores, backup boilers, HIUs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain CHP principles, efficiency gains, and heat-to-power ratios",
              "Compare prime mover technologies: gas engines, gas turbines, and fuel cells",
              "Design district heating networks with appropriate flow and return temperatures",
              "Specify heat interface units and their components",
              "Size CHP for baseload operation and calculate economic viability",
              "Integrate thermal stores and backup plant for system optimisation"
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

        {/* Section 1: CHP Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            CHP Fundamentals and Efficiency
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Combined heat and power (CHP), also known as cogeneration, is the simultaneous generation of
              electricity and useful heat from a single fuel source. By capturing and utilising the heat
              that would otherwise be wasted in conventional power generation, CHP systems achieve overall
              efficiencies of 70-90% compared to 35-45% for grid electricity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">CHP efficiency compared to separate generation:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Conventional power station:</strong> 35-45% electrical efficiency; remaining 55-65% lost as waste heat</li>
                <li className="pl-1"><strong>Gas engine CHP:</strong> 35-42% electrical + 45-50% thermal = 80-88% overall</li>
                <li className="pl-1"><strong>Gas turbine CHP:</strong> 25-40% electrical + 40-50% thermal = 70-85% overall</li>
                <li className="pl-1"><strong>Fuel cell CHP:</strong> 40-60% electrical + 30-40% thermal = 80-90% overall</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heat-to-Power Ratio</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Prime Mover</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Heat:Power Ratio</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Size Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gas engine</td>
                      <td className="border border-white/10 px-3 py-2">1.0-1.5:1</td>
                      <td className="border border-white/10 px-3 py-2">50 kWe - 5 MWe</td>
                      <td className="border border-white/10 px-3 py-2">Buildings, district heating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gas turbine</td>
                      <td className="border border-white/10 px-3 py-2">1.5-2.5:1</td>
                      <td className="border border-white/10 px-3 py-2">500 kWe - 50+ MWe</td>
                      <td className="border border-white/10 px-3 py-2">Large industrial, utilities</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Micro-CHP (Stirling)</td>
                      <td className="border border-white/10 px-3 py-2">6-10:1</td>
                      <td className="border border-white/10 px-3 py-2">1-3 kWe</td>
                      <td className="border border-white/10 px-3 py-2">Domestic, small commercial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fuel cell</td>
                      <td className="border border-white/10 px-3 py-2">0.5-1.0:1</td>
                      <td className="border border-white/10 px-3 py-2">1 kWe - 2 MWe</td>
                      <td className="border border-white/10 px-3 py-2">High electrical demand sites</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Efficiency Calculation</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Overall efficiency:</span> <span className="text-white">η = (Pelec + Qheat) / Qfuel × 100%</span></p>
                <p><span className="text-white/60">Electrical efficiency:</span> <span className="text-white">ηe = Pelec / Qfuel × 100%</span></p>
                <p><span className="text-white/60">Thermal efficiency:</span> <span className="text-white">ηth = Qheat / Qfuel × 100%</span></p>
                <p className="mt-2"><span className="text-white/60">Example:</span> <span className="text-white">500 kW gas input, 180 kWe electrical, 250 kWth heat</span></p>
                <p><span className="text-white/60">Overall:</span> <span className="text-green-400">(180 + 250) / 500 × 100 = 86%</span></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> CHP only saves energy when all generated heat is usefully absorbed. Dumping heat via dry coolers negates the efficiency advantage.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Prime Movers and Heat Recovery */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Prime Movers and Heat Recovery
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The prime mover is the engine or turbine that converts fuel energy into mechanical power,
              which drives the electrical generator. Each technology has distinct characteristics affecting
              its suitability for different applications.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reciprocating Gas Engine</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Spark ignition (natural gas) or compression (dual fuel)</li>
                  <li className="pl-1">High electrical efficiency: 35-45%</li>
                  <li className="pl-1">Good part-load performance (down to 50%)</li>
                  <li className="pl-1">Fast start-up: 2-5 minutes</li>
                  <li className="pl-1">Heat recovery: jacket water (80-90°C), exhaust (450°C)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Gas Turbine</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Combustion turbine driving generator</li>
                  <li className="pl-1">Lower electrical efficiency: 25-40%</li>
                  <li className="pl-1">Poor part-load efficiency (avoid below 75%)</li>
                  <li className="pl-1">Slower start-up: 10-30 minutes</li>
                  <li className="pl-1">High grade exhaust heat: 450-550°C for steam</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heat Recovery Systems</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Heat Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Temperature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Recovery Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">% of Heat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Jacket water (engine)</td>
                      <td className="border border-white/10 px-3 py-2">80-95°C</td>
                      <td className="border border-white/10 px-3 py-2">Plate heat exchanger</td>
                      <td className="border border-white/10 px-3 py-2">25-30%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Exhaust gas</td>
                      <td className="border border-white/10 px-3 py-2">400-550°C</td>
                      <td className="border border-white/10 px-3 py-2">Exhaust heat exchanger</td>
                      <td className="border border-white/10 px-3 py-2">20-25%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lubricating oil</td>
                      <td className="border border-white/10 px-3 py-2">70-85°C</td>
                      <td className="border border-white/10 px-3 py-2">Oil cooler heat exchanger</td>
                      <td className="border border-white/10 px-3 py-2">5-8%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Intercooler (turbo)</td>
                      <td className="border border-white/10 px-3 py-2">40-60°C</td>
                      <td className="border border-white/10 px-3 py-2">Low-grade heat recovery</td>
                      <td className="border border-white/10 px-3 py-2">3-5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Generation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Synchronous generator:</strong> Three-phase alternator producing 400V or 11kV output</li>
                <li className="pl-1"><strong>Frequency:</strong> f = (n × p) / 120 where n = RPM, p = poles (typically 1500 RPM, 4-pole for 50 Hz)</li>
                <li className="pl-1"><strong>Grid synchronisation:</strong> Voltage, frequency, phase angle must match before paralleling</li>
                <li className="pl-1"><strong>Protection:</strong> G99/G98 compliant interface protection relay for grid connection</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> Gas engines suit variable loads and are more common in UK building services. Gas turbines suit large, continuous loads with steam requirements.
            </p>
          </div>
        </section>

        {/* Section 3: District Heating Networks */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            District Heating Networks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              District heating distributes heat from a central source to multiple buildings via insulated
              underground pipework. The UK has over 14,000 heat networks serving approximately 480,000
              customers, with significant growth anticipated under net zero targets.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Network Temperature Generations</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">3rd Generation (current):</span> <span className="text-white">Flow 70-90°C, Return 40-60°C, ΔT 30 K</span></p>
                <p><span className="text-white/60">4th Generation (emerging):</span> <span className="text-white">Flow 50-60°C, Return 25-35°C, ΔT 25 K</span></p>
                <p><span className="text-white/60">5th Generation (ambient):</span> <span className="text-white">Flow 10-25°C with building-level heat pumps</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Network Components</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Specification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pre-insulated pipe</td>
                      <td className="border border-white/10 px-3 py-2">Heat distribution</td>
                      <td className="border border-white/10 px-3 py-2">Steel carrier, PUR insulation, PE casing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Expansion loops</td>
                      <td className="border border-white/10 px-3 py-2">Thermal expansion accommodation</td>
                      <td className="border border-white/10 px-3 py-2">U-bends, L-bends, or expansion joints</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Isolation valves</td>
                      <td className="border border-white/10 px-3 py-2">Section isolation for maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Ball or butterfly valves, typically PN16</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution pumps</td>
                      <td className="border border-white/10 px-3 py-2">Circulate water through network</td>
                      <td className="border border-white/10 px-3 py-2">Variable speed for flow modulation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pressurisation set</td>
                      <td className="border border-white/10 px-3 py-2">Maintain system pressure</td>
                      <td className="border border-white/10 px-3 py-2">Typically 3-6 bar depending on height</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heat Interface Units (HIUs)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Direct connection:</strong> Network water enters building system (rare, no hydraulic separation)</li>
                <li className="pl-1"><strong>Indirect connection:</strong> Plate heat exchangers provide hydraulic separation (standard approach)</li>
                <li className="pl-1"><strong>Space heating:</strong> PHE sized for design load, typically 40-60°C secondary flow</li>
                <li className="pl-1"><strong>DHW production:</strong> Instantaneous PHE or storage options, Legionella compliance essential</li>
                <li className="pl-1"><strong>Heat metering:</strong> MID-approved meter for billing, typically ultrasonic type</li>
                <li className="pl-1"><strong>DPVC:</strong> Differential pressure control valve maintains stable ΔP across HIU</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Network efficiency:</strong> Achieving high ΔT (30 K+) is crucial - higher temperature differential means lower flow rates and reduced pumping energy.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Energy Centre Design and Optimisation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Energy Centre Design and Optimisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The energy centre houses all heat generation plant and is the heart of a district heating
              system. Design must balance CHP baseload operation, peak load coverage from boilers, and
              thermal storage to maximise efficiency and economic return.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">CHP Sizing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Size for baseload demand</li>
                  <li className="pl-1">Target 4,000-6,000+ hours/year</li>
                  <li className="pl-1">Typically 30-50% of peak load</li>
                  <li className="pl-1">Meet 70-80% annual demand</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Backup Boilers</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Cover peak loads above CHP</li>
                  <li className="pl-1">N+1 redundancy typical</li>
                  <li className="pl-1">Gas-fired condensing</li>
                  <li className="pl-1">Cascade control with CHP</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Store</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Buffer heat production/demand</li>
                  <li className="pl-1">Enable continuous CHP run</li>
                  <li className="pl-1">Typically 2-6 hours capacity</li>
                  <li className="pl-1">Stratified tank design</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Spark Spread Analysis</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Calculation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Spark spread</td>
                      <td className="border border-white/10 px-3 py-2">Electricity price - (Gas price / ηe)</td>
                      <td className="border border-white/10 px-3 py-2">15p - (3p / 0.38) = 7.1p/kWh</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heat credit</td>
                      <td className="border border-white/10 px-3 py-2">Avoided boiler gas × ηboiler</td>
                      <td className="border border-white/10 px-3 py-2">3p × 0.90 = 2.7p/kWh saved</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Operating margin</td>
                      <td className="border border-white/10 px-3 py-2">Spark spread + heat credit - costs</td>
                      <td className="border border-white/10 px-3 py-2">Must exceed maintenance cost</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Break-even hours</td>
                      <td className="border border-white/10 px-3 py-2">Capital cost / annual saving</td>
                      <td className="border border-white/10 px-3 py-2">Target payback 5-7 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Strategy Hierarchy</p>
              <div className="text-sm space-y-2">
                <p><strong>1. Heat demand signal:</strong> Network return temperature and flow rate determine total heat demand</p>
                <p><strong>2. CHP priority:</strong> Run CHP at optimal load when spark spread positive and heat absorbable</p>
                <p><strong>3. Thermal store management:</strong> Charge when CHP output exceeds demand; discharge to extend CHP off-periods</p>
                <p><strong>4. Boiler cascade:</strong> Stage boilers to meet demand above CHP + store capacity</p>
                <p><strong>5. Network pump control:</strong> Variable speed to maintain ΔP at index HIU</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Centre Plant Schedule (Typical 5 MW Peak)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Plant Item</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Capacity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Quantity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gas engine CHP</td>
                      <td className="border border-white/10 px-3 py-2">500 kWe / 600 kWth</td>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">Lead/lag baseload operation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gas boiler</td>
                      <td className="border border-white/10 px-3 py-2">2,000 kW</td>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">Peak and backup, N+1</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermal store</td>
                      <td className="border border-white/10 px-3 py-2">50,000 litres</td>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">~2 hours at average load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution pump</td>
                      <td className="border border-white/10 px-3 py-2">150 m³/h @ 6 bar</td>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">Variable speed, duty/standby</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Optimisation goal:</strong> Maximise CHP running hours while ensuring all generated heat is utilised - unused heat negates the efficiency benefit.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: CHP Efficiency Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A gas engine CHP consumes 1,200 kW of natural gas and produces 450 kWe electrical and 550 kWth thermal output. Calculate all efficiencies.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given:</p>
                <p className="ml-4">Fuel input (Qfuel) = 1,200 kW</p>
                <p className="ml-4">Electrical output (Pelec) = 450 kW</p>
                <p className="ml-4">Thermal output (Qheat) = 550 kW</p>
                <p className="mt-2">Electrical efficiency:</p>
                <p className="ml-4">ηe = Pelec / Qfuel × 100</p>
                <p className="ml-4">ηe = 450 / 1,200 × 100 = <span className="text-green-400">37.5%</span></p>
                <p className="mt-2">Thermal efficiency:</p>
                <p className="ml-4">ηth = Qheat / Qfuel × 100</p>
                <p className="ml-4">ηth = 550 / 1,200 × 100 = <span className="text-green-400">45.8%</span></p>
                <p className="mt-2">Overall efficiency:</p>
                <p className="ml-4">ηoverall = (Pelec + Qheat) / Qfuel × 100</p>
                <p className="ml-4">ηoverall = (450 + 550) / 1,200 × 100 = <span className="text-green-400">83.3%</span></p>
                <p className="mt-2">Heat-to-power ratio:</p>
                <p className="ml-4">H:P = 550 / 450 = <span className="text-green-400">1.22:1</span></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: District Heating Flow Rate</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A district heating network must deliver 3 MW of heat. Flow temperature is 85°C, return temperature is 55°C. Calculate the required flow rate.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given:</p>
                <p className="ml-4">Heat load (Q) = 3,000 kW</p>
                <p className="ml-4">Flow temp (Tf) = 85°C</p>
                <p className="ml-4">Return temp (Tr) = 55°C</p>
                <p className="ml-4">ΔT = 85 - 55 = 30 K</p>
                <p className="ml-4">Specific heat (Cp) = 4.18 kJ/kg·K</p>
                <p className="mt-2">Heat transfer equation:</p>
                <p className="ml-4">Q = ṁ × Cp × ΔT</p>
                <p className="ml-4">ṁ = Q / (Cp × ΔT)</p>
                <p className="ml-4">ṁ = 3,000 / (4.18 × 30)</p>
                <p className="ml-4">ṁ = 3,000 / 125.4 = <span className="text-green-400">23.9 kg/s</span></p>
                <p className="mt-2">Volume flow rate:</p>
                <p className="ml-4">V̇ = 23.9 / 1,000 × 3,600 = <span className="text-green-400">86 m³/h</span></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: CHP Economic Analysis (Spark Spread)</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Evaluate CHP viability with electricity at 18p/kWh, gas at 4p/kWh, electrical efficiency 38%, and CHP output of 500 kWe.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: Calculate gas consumption</p>
                <p className="ml-4">Gas input = 500 kWe / 0.38 = 1,316 kW</p>
                <p className="mt-2 text-white/60">Step 2: Calculate spark spread</p>
                <p className="ml-4">Cost of gas per kWh electrical:</p>
                <p className="ml-4">= Gas price / ηe = 4p / 0.38 = 10.5p/kWh</p>
                <p className="ml-4">Spark spread = Electricity price - gas cost per kWhe</p>
                <p className="ml-4">= 18p - 10.5p = <span className="text-green-400">7.5p/kWh positive</span></p>
                <p className="mt-2 text-white/60">Step 3: Annual electrical savings (5,000 hrs)</p>
                <p className="ml-4">= 500 kWe × 5,000 hrs × 7.5p/kWh</p>
                <p className="ml-4">= <span className="text-green-400">£187,500/year electrical benefit</span></p>
                <p className="mt-2 text-white/60">Step 4: Add heat credit (600 kWth at 90% boiler efficiency)</p>
                <p className="ml-4">Avoided boiler gas = 600 / 0.90 = 667 kW</p>
                <p className="ml-4">Heat credit = 667 × 5,000 × 4p = <span className="text-green-400">£133,400/year</span></p>
                <p className="mt-2 text-white/60">Total annual benefit:</p>
                <p className="ml-4"><span className="text-green-400">£320,900/year (before maintenance)</span></p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">CHP Feasibility Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Establish baseload heat demand from metered data or heat loss calculations</li>
                <li className="pl-1">Confirm 4,000+ annual running hours are achievable</li>
                <li className="pl-1">Verify spark spread is positive (typically 3p/kWh minimum margin)</li>
                <li className="pl-1">Check gas and electrical connection capacity</li>
                <li className="pl-1">Assess space requirements for plant room and acoustic treatment</li>
                <li className="pl-1">Consider grid export potential and G99/G98 connection requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Gas engine electrical efficiency: <strong>35-42%</strong></li>
                <li className="pl-1">CHP overall efficiency target: <strong>80%+</strong></li>
                <li className="pl-1">Minimum viable running hours: <strong>4,000-5,000/year</strong></li>
                <li className="pl-1">District heating ΔT target: <strong>30 K or higher</strong></li>
                <li className="pl-1">Water specific heat capacity: <strong>4.18 kJ/kg·K</strong></li>
                <li className="pl-1">Typical payback period: <strong>5-7 years</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Oversizing CHP</strong> - leads to excessive cycling and poor economics</li>
                <li className="pl-1"><strong>Ignoring summer loads</strong> - CHP needs year-round heat demand</li>
                <li className="pl-1"><strong>Poor ΔT design</strong> - low temperature differential increases pumping costs</li>
                <li className="pl-1"><strong>Inadequate thermal storage</strong> - forces CHP cycling instead of continuous operation</li>
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
                <p className="font-medium text-white mb-1">CHP Efficiencies</p>
                <ul className="space-y-0.5">
                  <li>Gas engine electrical: 35-42%</li>
                  <li>Gas engine thermal: 45-50%</li>
                  <li>Gas turbine electrical: 25-40%</li>
                  <li>Overall CHP target: 80-90%</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">District Heating</p>
                <ul className="space-y-0.5">
                  <li>3rd gen: 70-90°C flow, 40-60°C return</li>
                  <li>4th gen: 50-60°C flow, 25-35°C return</li>
                  <li>Target ΔT: 30 K minimum</li>
                  <li>Network losses: 5-15% typical</li>
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
            <Link to="../h-n-c-module6-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section3-1">
              Next: Section 3.1
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section2_6;
