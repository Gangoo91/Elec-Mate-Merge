import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Battery Storage Systems - HNC Module 6 Section 2.5";
const DESCRIPTION = "Master battery storage systems for renewable energy: battery technologies, system sizing, charge controllers, battery management systems, safety requirements, and grid services.";

const quickCheckQuestions = [
  {
    id: "battery-dod",
    question: "What does Depth of Discharge (DoD) indicate for a battery system?",
    options: ["The charging speed of the battery", "The percentage of battery capacity that has been discharged", "The maximum voltage the battery can reach", "The number of cells in the battery pack"],
    correctIndex: 1,
    explanation: "Depth of Discharge (DoD) indicates the percentage of battery capacity that has been discharged relative to the total capacity. A higher DoD means more energy has been extracted, which affects battery lifespan."
  },
  {
    id: "lithium-advantage",
    question: "What is a key advantage of lithium-ion batteries over lead-acid for domestic storage?",
    options: ["Lower initial cost", "Higher cycle life and deeper discharge capability", "No battery management system required", "Simpler installation requirements"],
    correctIndex: 1,
    explanation: "Lithium-ion batteries offer significantly higher cycle life (4,000-10,000 cycles vs 500-1,500) and can be discharged to 80-90% DoD compared to 50% for lead-acid, making them more suitable for daily cycling applications."
  },
  {
    id: "bms-function",
    question: "What is the primary function of a Battery Management System (BMS)?",
    options: ["To increase battery capacity", "To monitor and protect battery cells from damage", "To convert DC to AC power", "To connect the battery to the grid"],
    correctIndex: 1,
    explanation: "The BMS monitors individual cell voltages, temperatures, and state of charge, and protects the battery by preventing overcharging, over-discharging, and thermal runaway."
  },
  {
    id: "grid-services",
    question: "Which grid service involves batteries absorbing excess renewable generation?",
    options: ["Frequency response", "Peak shaving", "Grid balancing and absorption", "Voltage regulation"],
    correctIndex: 2,
    explanation: "Grid balancing involves batteries absorbing excess generation (often from solar or wind) when supply exceeds demand, and releasing it later when demand increases or generation drops."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A lithium iron phosphate (LiFePO4) battery has a nominal voltage of 3.2V per cell. How many cells are needed for a 48V nominal system?",
    options: [
      "12 cells",
      "15 cells",
      "16 cells",
      "20 cells"
    ],
    correctAnswer: 1,
    explanation: "48V ÷ 3.2V = 15 cells. LiFePO4 batteries use 3.2V nominal per cell, so 15 cells in series provide 48V nominal (range approximately 40V-54.6V depending on state of charge)."
  },
  {
    id: 2,
    question: "What is the typical round-trip efficiency of a modern lithium-ion battery system?",
    options: ["70-75%", "80-85%", "90-95%", "98-99%"],
    correctAnswer: 2,
    explanation: "Modern lithium-ion battery systems achieve 90-95% round-trip efficiency, meaning 90-95% of energy stored can be retrieved. Lead-acid systems typically achieve 80-85%."
  },
  {
    id: 3,
    question: "For a domestic property with 10kWh daily consumption and 80% self-consumption target, what minimum usable battery capacity is appropriate?",
    options: ["4kWh", "6kWh", "8kWh", "10kWh"],
    correctAnswer: 2,
    explanation: "With 10kWh daily consumption and 80% self-consumption target, approximately 8kWh usable capacity is needed. This accounts for the portion of consumption occurring during non-generation hours."
  },
  {
    id: 4,
    question: "What is the C-rate of a 10kWh battery discharging at 5kW?",
    options: ["C/2 (0.5C)", "1C", "2C", "5C"],
    correctAnswer: 0,
    explanation: "C-rate = Power ÷ Capacity = 5kW ÷ 10kWh = 0.5C or C/2. This means the battery would fully discharge in 2 hours. Higher C-rates reduce battery lifespan."
  },
  {
    id: 5,
    question: "Which battery technology is most suitable for applications requiring very high cycle counts with minimal degradation?",
    options: [
      "Lead-acid AGM",
      "Lithium-ion NMC",
      "Lithium iron phosphate (LiFePO4)",
      "Nickel-cadmium"
    ],
    correctAnswer: 2,
    explanation: "LiFePO4 offers the highest cycle life (6,000-10,000 cycles at 80% DoD) with minimal degradation, excellent thermal stability, and is considered the safest lithium chemistry for stationary storage."
  },
  {
    id: 6,
    question: "According to BS EN 62619, what is required for lithium battery installations in domestic premises?",
    options: [
      "Installation in any convenient location",
      "Fire-rated enclosure or separation from occupied spaces",
      "Outdoor installation only",
      "Installation in the loft space"
    ],
    correctAnswer: 1,
    explanation: "BS EN 62619 requires lithium batteries in domestic premises to have appropriate fire protection, typically a fire-rated enclosure or 30-minute fire separation from occupied spaces, with adequate ventilation."
  },
  {
    id: 7,
    question: "What function does an MPPT charge controller provide that a PWM controller cannot?",
    options: [
      "Battery protection from overcharge",
      "Optimal power point tracking to maximise PV harvest",
      "Load disconnection at low voltage",
      "Temperature compensation"
    ],
    correctAnswer: 1,
    explanation: "MPPT (Maximum Power Point Tracking) controllers actively find and maintain the optimal operating point of the PV array, harvesting 15-30% more energy than PWM controllers, especially in cold conditions or when PV voltage differs significantly from battery voltage."
  },
  {
    id: 8,
    question: "A battery system is rated at 10kWh with 80% depth of discharge and 90% inverter efficiency. What usable AC energy is available?",
    options: ["7.2kWh", "8.0kWh", "8.1kWh", "9.0kWh"],
    correctAnswer: 0,
    explanation: "Usable AC energy = Capacity × DoD × Inverter efficiency = 10kWh × 0.80 × 0.90 = 7.2kWh. Both DoD limit and conversion losses must be considered for actual available energy."
  },
  {
    id: 9,
    question: "What is 'calendar ageing' in battery degradation?",
    options: [
      "Degradation from excessive cycling",
      "Degradation that occurs over time regardless of use",
      "Degradation from high discharge rates",
      "Degradation from temperature cycling"
    ],
    correctAnswer: 1,
    explanation: "Calendar ageing is capacity loss that occurs over time due to chemical processes within the battery, regardless of whether the battery is being used. It's influenced by storage temperature and state of charge."
  },
  {
    id: 10,
    question: "For frequency response grid services, what characteristic is most important in a battery system?",
    options: [
      "Maximum energy capacity",
      "Fast response time and high power capability",
      "Lowest cost per kWh",
      "Longest calendar life"
    ],
    correctAnswer: 1,
    explanation: "Frequency response requires fast reaction times (typically under 1 second) and sufficient power capability to rapidly inject or absorb energy. Energy capacity is secondary to power and response speed."
  },
  {
    id: 11,
    question: "What safety device is required between a battery bank and the inverter according to BS 7671?",
    options: [
      "SPD only",
      "Fuse or circuit breaker suitable for DC fault current",
      "Residual current device",
      "Earth leakage relay"
    ],
    correctAnswer: 1,
    explanation: "A suitable DC-rated fuse or circuit breaker must be installed between the battery and inverter, capable of safely interrupting the high fault currents batteries can deliver. AC-rated devices are not suitable for DC circuits."
  },
  {
    id: 12,
    question: "What is the primary advantage of flow batteries over lithium-ion for grid-scale storage?",
    options: [
      "Higher energy density",
      "Lower initial cost",
      "Decoupled power and energy scaling with very long duration",
      "Faster response time"
    ],
    correctAnswer: 2,
    explanation: "Flow batteries allow independent scaling of power (stack size) and energy (tank size), making them ideal for long-duration storage (4-12+ hours). Energy capacity can be increased simply by adding more electrolyte."
  }
];

const faqs = [
  {
    question: "How do I size a battery for maximum self-consumption with solar PV?",
    answer: "Analyse the property's load profile and PV generation data. Calculate the energy consumed during non-generation hours (evening and overnight load). The battery should cover this period - typically 50-80% of daily consumption. For a home using 10kWh daily with 4kWh overnight, a 6-8kWh usable capacity battery would maximise self-consumption. Consider seasonal variation and that oversizing provides diminishing returns."
  },
  {
    question: "What are the main fire safety considerations for domestic battery installations?",
    answer: "Key considerations include: location away from escape routes and occupied spaces; fire-rated enclosure or 30-minute separation; adequate ventilation for thermal management and gas dispersal; smoke detection in the installation area; accessible isolation for emergency services; and compliance with manufacturer installation requirements. LiFePO4 chemistry has inherently lower fire risk than NMC chemistries."
  },
  {
    question: "Can batteries be installed in garages or outbuildings?",
    answer: "Yes, garages and outbuildings are often preferred locations due to natural fire separation from the dwelling. Requirements include: frost protection for the battery and electronics; adequate ventilation; protection from flooding and moisture; secure access; and appropriate cable routes back to the property's electrical installation. Temperature extremes reduce battery performance and lifespan."
  },
  {
    question: "What is the difference between AC-coupled and DC-coupled battery systems?",
    answer: "DC-coupled systems connect the battery to the PV array via a shared charge controller/inverter, converting DC to AC once. This is more efficient (95-98%) but requires compatible equipment. AC-coupled systems use separate inverters for PV and battery, converting DC-AC-DC-AC, reducing efficiency to 85-90% but offering flexibility to retrofit to existing PV systems and mix equipment brands."
  },
  {
    question: "How do grid services like frequency response work with domestic batteries?",
    answer: "Aggregators combine many domestic batteries into a 'virtual power plant' that can respond to grid operator signals. When grid frequency drops (excess demand), batteries discharge to support the grid. When frequency rises (excess supply), batteries charge. Homeowners receive payments for participation while still prioritising their own energy needs. Response times must be under 1 second for dynamic frequency response services."
  },
  {
    question: "What warranty considerations apply to battery systems?",
    answer: "Battery warranties typically guarantee minimum retained capacity (often 60-70%) after a specified period (10-15 years) or cycle count (3,000-10,000 cycles). Key factors affecting warranty claims include: operating within specified temperature range; not exceeding maximum charge/discharge rates; proper installation by certified personnel; and maintaining required state of charge limits. Always verify warranty terms before purchase."
  }
];

const HNCModule6Section2_5 = () => {
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
            <span>Module 6.2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Battery Storage Systems
          </h1>
          <p className="text-white/80">
            Battery technologies, system sizing, charge controllers, safety requirements, and grid services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>LiFePO4:</strong> Preferred for safety and cycle life</li>
              <li className="pl-1"><strong>DoD:</strong> Depth of discharge affects lifespan</li>
              <li className="pl-1"><strong>BMS:</strong> Essential for cell protection and balancing</li>
              <li className="pl-1"><strong>Grid services:</strong> Frequency response and peak shaving</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Specifications</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Round-trip efficiency:</strong> 90-95% lithium-ion</li>
              <li className="pl-1"><strong>Cycle life:</strong> 4,000-10,000 cycles LiFePO4</li>
              <li className="pl-1"><strong>Usable DoD:</strong> 80-90% lithium, 50% lead-acid</li>
              <li className="pl-1"><strong>Fire rating:</strong> 30-minute separation required</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare battery technologies: lithium-ion, lead-acid, and flow batteries",
              "Calculate system sizing for self-consumption and backup applications",
              "Understand BMS functions, cell balancing, and protection",
              "Apply safety requirements including fire separation and ventilation",
              "Design appropriate charge controller selection (MPPT vs PWM)",
              "Evaluate grid service opportunities: frequency response and peak shaving"
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

        {/* Section 1: Battery Technologies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Battery Technologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern energy storage systems utilise various battery chemistries, each with distinct characteristics
              suited to different applications. Understanding these technologies enables appropriate selection for
              residential, commercial, and grid-scale installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Lithium-Ion Technologies:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lithium Iron Phosphate (LiFePO4):</strong> Safest chemistry, excellent cycle life (6,000-10,000), lower energy density, preferred for stationary storage</li>
                <li className="pl-1"><strong>Lithium Nickel Manganese Cobalt (NMC):</strong> Higher energy density, good cycle life (3,000-5,000), requires more sophisticated thermal management</li>
                <li className="pl-1"><strong>Lithium Titanate (LTO):</strong> Very fast charging, exceptional cycle life (15,000+), lower energy density, higher cost</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Battery Technology Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Technology</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cycle Life</th>
                      <th className="border border-white/10 px-3 py-2 text-left">DoD</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Efficiency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LiFePO4</td>
                      <td className="border border-white/10 px-3 py-2">6,000-10,000</td>
                      <td className="border border-white/10 px-3 py-2">80-90%</td>
                      <td className="border border-white/10 px-3 py-2">92-98%</td>
                      <td className="border border-white/10 px-3 py-2">Domestic, commercial storage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">NMC</td>
                      <td className="border border-white/10 px-3 py-2">3,000-5,000</td>
                      <td className="border border-white/10 px-3 py-2">80-90%</td>
                      <td className="border border-white/10 px-3 py-2">90-95%</td>
                      <td className="border border-white/10 px-3 py-2">High energy density needs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lead-Acid AGM</td>
                      <td className="border border-white/10 px-3 py-2">500-1,500</td>
                      <td className="border border-white/10 px-3 py-2">50%</td>
                      <td className="border border-white/10 px-3 py-2">80-85%</td>
                      <td className="border border-white/10 px-3 py-2">Low-cost backup, off-grid</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Vanadium Flow</td>
                      <td className="border border-white/10 px-3 py-2">20,000+</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">65-80%</td>
                      <td className="border border-white/10 px-3 py-2">Grid-scale, long duration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Flow Battery Characteristics</p>
              <p className="text-sm text-white/90">
                Flow batteries store energy in liquid electrolytes in external tanks. Power output is determined by
                the cell stack size, while energy capacity depends on tank volume. This allows independent scaling of
                power (kW) and energy (kWh) - ideal for long-duration storage applications where 4-12 hours of
                discharge is required.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key consideration:</strong> LiFePO4 has become the dominant technology for UK residential and commercial installations due to its safety profile, cycle life, and competitive pricing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Capacity, Power, and System Sizing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Capacity, Power, and System Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct battery sizing requires understanding the relationship between capacity (kWh), power (kW),
              depth of discharge, and the specific application requirements - whether maximising self-consumption,
              providing backup power, or participating in grid services.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Capacity (kWh)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Total stored energy</li>
                  <li className="pl-1">Determines runtime</li>
                  <li className="pl-1">Usable = Total × DoD</li>
                  <li className="pl-1">Typical domestic: 5-15kWh</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Rating (kW)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Maximum charge/discharge rate</li>
                  <li className="pl-1">Continuous vs peak ratings</li>
                  <li className="pl-1">Affects C-rate and lifespan</li>
                  <li className="pl-1">Typical domestic: 3-5kW</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">C-Rate</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Discharge rate relative to capacity</li>
                  <li className="pl-1">1C = full discharge in 1 hour</li>
                  <li className="pl-1">Lower C-rate extends life</li>
                  <li className="pl-1">Most domestic: 0.5C typical</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Self-Consumption Sizing Method</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Calculation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Daily consumption</td>
                      <td className="border border-white/10 px-3 py-2">Annual kWh ÷ 365</td>
                      <td className="border border-white/10 px-3 py-2">3,650kWh ÷ 365 = 10kWh/day</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Evening/night load</td>
                      <td className="border border-white/10 px-3 py-2">Consumption 4pm-8am</td>
                      <td className="border border-white/10 px-3 py-2">Typically 50-70% = 6kWh</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Target self-consumption</td>
                      <td className="border border-white/10 px-3 py-2">Evening load × target %</td>
                      <td className="border border-white/10 px-3 py-2">6kWh × 80% = 4.8kWh needed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Account for DoD</td>
                      <td className="border border-white/10 px-3 py-2">Required ÷ DoD</td>
                      <td className="border border-white/10 px-3 py-2">4.8kWh ÷ 0.8 = 6kWh nominal</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Account for efficiency</td>
                      <td className="border border-white/10 px-3 py-2">Nominal ÷ efficiency</td>
                      <td className="border border-white/10 px-3 py-2">6kWh ÷ 0.9 = 6.7kWh system</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Worked Example: Domestic System Sizing</p>
              <div className="text-sm text-white/90 space-y-2">
                <p><strong>Property:</strong> 4-bed house, 4,000kWh annual consumption, 4kWp PV system</p>
                <p><strong>Daily consumption:</strong> 4,000 ÷ 365 = 11kWh</p>
                <p><strong>Evening/overnight load:</strong> 65% × 11kWh = 7.15kWh</p>
                <p><strong>Excess PV available:</strong> Analysis shows ~5kWh surplus on typical summer day</p>
                <p><strong>Usable capacity needed:</strong> Minimum 5kWh to capture surplus</p>
                <p><strong>Nominal capacity (80% DoD):</strong> 5 ÷ 0.8 = 6.25kWh</p>
                <p><strong>Recommendation:</strong> 6-8kWh system with 3kW continuous power rating</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Oversizing batteries provides diminishing returns - a larger battery may never fully charge in winter when PV output is low.
            </p>
          </div>
        </section>

        {/* Section 3: Charge Controllers and BMS */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Charge Controllers and Battery Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Charge controllers regulate energy flow between the PV array and batteries, while the Battery
              Management System (BMS) monitors and protects individual cells. Both are essential for safe,
              efficient, and long-lasting battery operation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">MPPT vs PWM Charge Controllers</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/90">
                <div>
                  <p className="font-medium mb-1">PWM (Pulse Width Modulation)</p>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>Direct connection - PV voltage must match battery</li>
                    <li>70-80% typical efficiency</li>
                    <li>Lower cost, simpler design</li>
                    <li>Best for small systems with matched voltages</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">MPPT (Maximum Power Point Tracking)</p>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>DC-DC conversion - any PV voltage to battery</li>
                    <li>95-99% typical efficiency</li>
                    <li>15-30% more energy harvest</li>
                    <li>Essential for larger systems, high-voltage strings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Battery Management System Functions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cell voltage monitoring:</strong> Tracks individual cell voltages to detect imbalance or failing cells</li>
                <li className="pl-1"><strong>Cell balancing:</strong> Equalises charge across cells - passive (dissipative) or active (energy transfer)</li>
                <li className="pl-1"><strong>Temperature monitoring:</strong> Multiple sensors detect hotspots and trigger cooling or shutdown</li>
                <li className="pl-1"><strong>Over-charge protection:</strong> Disconnects charging when cells reach maximum voltage (4.2V NMC, 3.65V LiFePO4)</li>
                <li className="pl-1"><strong>Over-discharge protection:</strong> Disconnects load at minimum voltage (2.5V NMC, 2.5V LiFePO4)</li>
                <li className="pl-1"><strong>Short circuit protection:</strong> Fast-acting disconnection for fault currents</li>
                <li className="pl-1"><strong>State of Charge (SoC):</strong> Calculates remaining capacity using coulomb counting and voltage correlation</li>
                <li className="pl-1"><strong>State of Health (SoH):</strong> Tracks capacity degradation over time</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Charge Controller Sizing</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Calculation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Safety Factor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maximum PV voltage</td>
                      <td className="border border-white/10 px-3 py-2">Voc × number of series modules</td>
                      <td className="border border-white/10 px-3 py-2">Apply cold temperature coefficient</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maximum PV current</td>
                      <td className="border border-white/10 px-3 py-2">Isc × number of parallel strings</td>
                      <td className="border border-white/10 px-3 py-2">× 1.25 for irradiance peaks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Controller current rating</td>
                      <td className="border border-white/10 px-3 py-2">PV power ÷ battery voltage</td>
                      <td className="border border-white/10 px-3 py-2">Select next size up</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Communication protocols:</strong> Modern BMS units communicate via CAN bus, RS485, or Modbus with inverters and monitoring systems, enabling real-time data logging and remote diagnostics.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Safety Requirements and Grid Services */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Safety Requirements and Grid Services
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Battery installations must comply with stringent safety requirements covering fire protection,
              ventilation, and electrical safety. Beyond self-consumption, grid-connected batteries can
              provide valuable services to the electricity network.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Safety Requirements (BS EN 62619, BS 7671)</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Location Requirements</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>30-minute fire separation from occupied spaces</li>
                    <li>Away from escape routes</li>
                    <li>Not in loft spaces (heat accumulation)</li>
                    <li>Accessible for emergency services</li>
                    <li>Fire-rated enclosure if in dwelling</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Ventilation Requirements</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Natural or mechanical ventilation</li>
                    <li>Prevent gas accumulation (hydrogen from lead-acid)</li>
                    <li>Thermal management airflow</li>
                    <li>Low-level inlet, high-level outlet</li>
                    <li>Minimum 50cm clearance around unit</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Safety Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>DC isolation:</strong> Accessible DC isolator between battery and inverter rated for DC fault current</li>
                <li className="pl-1"><strong>Overcurrent protection:</strong> DC-rated fuses or MCBs suitable for battery short-circuit current (can exceed 10kA)</li>
                <li className="pl-1"><strong>Earthing:</strong> Compliant with BS 7671 requirements for PV and battery systems</li>
                <li className="pl-1"><strong>Labelling:</strong> Warning labels indicating battery presence, voltages, and isolation points</li>
                <li className="pl-1"><strong>G98/G99 compliance:</strong> Grid connection requirements for import/export functionality</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Thermal Runaway Prevention</p>
              <p className="text-sm text-white/90">
                Thermal runaway occurs when a cell overheats, triggering an exothermic reaction that spreads to
                adjacent cells. Prevention measures include: operating within specified temperature range (typically
                0-45°C); adequate ventilation; BMS thermal monitoring with automatic shutdown; appropriate spacing
                between cells; and fire-resistant enclosures. LiFePO4 chemistry is inherently more resistant to
                thermal runaway than NMC.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Grid Services Overview</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Service</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Frequency Response</td>
                      <td className="border border-white/10 px-3 py-2">Rapid power injection/absorption to stabilise grid frequency</td>
                      <td className="border border-white/10 px-3 py-2">&lt;1 second response, high power capability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Peak Shaving</td>
                      <td className="border border-white/10 px-3 py-2">Reduce demand during peak periods (typically 4-7pm)</td>
                      <td className="border border-white/10 px-3 py-2">Predictable load profiles, time-of-use tariffs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Grid Balancing</td>
                      <td className="border border-white/10 px-3 py-2">Absorb excess renewable generation, release during low generation</td>
                      <td className="border border-white/10 px-3 py-2">Large capacity, aggregation platform</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage Support</td>
                      <td className="border border-white/10 px-3 py-2">Reactive power provision for local voltage regulation</td>
                      <td className="border border-white/10 px-3 py-2">Inverter capable of reactive power control</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Revenue stacking:</strong> Domestic batteries can generate additional income through grid services while still prioritising self-consumption - typical earnings range from £50-200 per year depending on capacity and services enrolled.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Usable Energy Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate the usable AC energy from a 13.5kWh battery system with 90% DoD and 95% inverter efficiency.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given:</p>
                <p className="ml-4">Nominal capacity = 13.5kWh</p>
                <p className="ml-4">Depth of Discharge = 90%</p>
                <p className="ml-4">Inverter efficiency = 95%</p>
                <p className="mt-2">Calculation:</p>
                <p className="ml-4">Usable DC energy = 13.5kWh × 0.90 = 12.15kWh</p>
                <p className="ml-4">Usable AC energy = 12.15kWh × 0.95 = 11.54kWh</p>
                <p className="mt-2 text-green-400">Result: 11.54kWh available for AC loads</p>
                <p className="text-white/60 mt-2">Note: This represents 85.5% of nominal capacity as usable AC energy</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Battery Cycle Life Estimation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A LiFePO4 battery is rated for 6,000 cycles at 80% DoD. If cycled once daily, estimate the calendar life.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given:</p>
                <p className="ml-4">Rated cycles = 6,000 at 80% DoD</p>
                <p className="ml-4">Usage pattern = 1 cycle per day</p>
                <p className="mt-2">Calculation:</p>
                <p className="ml-4">Cycle life in years = 6,000 cycles ÷ 365 days/year</p>
                <p className="ml-4">Cycle life = 16.4 years</p>
                <p className="mt-2 text-green-400">Result: ~16 years before reaching cycle life limit</p>
                <p className="text-white/60 mt-2">Note: Calendar ageing may limit actual life to 10-15 years regardless of cycles</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: C-Rate and Discharge Time</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A 10kWh battery system is discharging at 2.5kW. Calculate the C-rate and expected discharge time.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given:</p>
                <p className="ml-4">Battery capacity = 10kWh</p>
                <p className="ml-4">Discharge power = 2.5kW</p>
                <p className="mt-2">C-Rate Calculation:</p>
                <p className="ml-4">C-rate = Power ÷ Capacity</p>
                <p className="ml-4">C-rate = 2.5kW ÷ 10kWh = 0.25C (or C/4)</p>
                <p className="mt-2">Discharge Time:</p>
                <p className="ml-4">Time = Capacity ÷ Power = 10kWh ÷ 2.5kW = 4 hours</p>
                <p className="mt-2 text-green-400">Result: C/4 rate with 4-hour discharge time</p>
                <p className="text-white/60 mt-2">Note: Lower C-rates extend battery lifespan significantly</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: MPPT Controller Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size an MPPT controller for a 4kWp PV array (10 × 400W panels in 2 strings of 5) with 48V battery system.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Panel specifications (example):</p>
                <p className="ml-4">Voc = 49.5V, Vmp = 41.5V, Isc = 10.2A, Imp = 9.65A</p>
                <p className="mt-2">Array Configuration (2 strings × 5 panels):</p>
                <p className="ml-4">String Voc = 49.5V × 5 = 247.5V</p>
                <p className="ml-4">String Vmp = 41.5V × 5 = 207.5V</p>
                <p className="ml-4">Total Isc = 10.2A × 2 = 20.4A</p>
                <p className="mt-2">Cold temperature adjustment (−10°C, +0.3%/°C):</p>
                <p className="ml-4">Max Voc = 247.5V × 1.09 = 269.8V</p>
                <p className="mt-2">Controller Requirements:</p>
                <p className="ml-4">Minimum voltage rating: 270V (select 300V+ for margin)</p>
                <p className="ml-4">Current rating: 4000W ÷ 48V = 83.3A (select 100A)</p>
                <p className="mt-2 text-green-400">Result: 300V/100A MPPT controller suitable</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify location meets fire separation and ventilation requirements</li>
                <li className="pl-1">Confirm mounting surface can support battery weight (typically 100-150kg)</li>
                <li className="pl-1">Install DC-rated isolation and overcurrent protection</li>
                <li className="pl-1">Ensure BMS communication with inverter is configured</li>
                <li className="pl-1">Apply appropriate warning labels at all isolation points</li>
                <li className="pl-1">Complete G98/G99 notification for grid-connected systems</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">LiFePO4 cell voltage: <strong>3.2V nominal</strong> (2.5V-3.65V range)</li>
                <li className="pl-1">NMC cell voltage: <strong>3.7V nominal</strong> (2.5V-4.2V range)</li>
                <li className="pl-1">Typical round-trip efficiency: <strong>90-95%</strong> lithium-ion</li>
                <li className="pl-1">Recommended DoD: <strong>80%</strong> for optimal lifespan</li>
                <li className="pl-1">Fire separation: <strong>30 minutes</strong> minimum</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Oversizing batteries</strong> - May never fully charge in winter, wasting investment</li>
                <li className="pl-1"><strong>Ignoring temperature range</strong> - Reduces capacity and lifespan outside 10-35°C</li>
                <li className="pl-1"><strong>Using AC-rated protection</strong> - DC faults require DC-rated devices</li>
                <li className="pl-1"><strong>Poor ventilation</strong> - Causes thermal stress and potential fire risk</li>
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
                <p className="font-medium text-white mb-1">Battery Selection Criteria</p>
                <ul className="space-y-0.5">
                  <li>LiFePO4: Safety, cycle life priority</li>
                  <li>NMC: Energy density priority</li>
                  <li>Lead-acid: Low-cost backup only</li>
                  <li>Flow: Grid-scale, long duration</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">System Sizing Factors</p>
                <ul className="space-y-0.5">
                  <li>Daily consumption profile</li>
                  <li>PV generation surplus</li>
                  <li>Depth of discharge limit</li>
                  <li>Round-trip efficiency losses</li>
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
            <Link to="../h-n-c-module6-section2-6">
              Next: Section 2.6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section2_5;
