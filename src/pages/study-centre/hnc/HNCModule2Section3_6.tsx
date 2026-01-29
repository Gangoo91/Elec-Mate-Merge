import { ArrowLeft, Wind, Thermometer, Settings, Building2, Gauge, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Quiz from "@/components/educational/Quiz";
import { InlineCheck } from "@/components/educational/InlineCheck";
import { useSEO } from "@/hooks/useSEO";

const TITLE = "HVAC System Applications";
const DESCRIPTION = "Air handling unit processes, mixed air calculations, economiser cycles, reheat systems, and building services design for HVAC applications.";

const quickCheckQuestions = [
  {
    question: "What is the primary purpose of an economiser cycle in an AHU?",
    options: [
      "To increase heating capacity",
      "To reduce cooling energy by using outdoor air",
      "To improve filtration efficiency",
      "To increase fan speed"
    ],
    correctIndex: 1,
    explanation: "Economiser cycles use cool outdoor air to provide free cooling when ambient conditions are favourable, significantly reducing mechanical cooling energy consumption."
  },
  {
    question: "In mixed air calculations, what does the lever rule determine?",
    options: [
      "Fan pressure",
      "The resultant mixture state on the psychrometric chart",
      "Duct velocity",
      "Coil surface area"
    ],
    correctIndex: 1,
    explanation: "The lever rule locates the mixed air condition on a straight line between return and outdoor air states, positioned inversely proportional to the mass flow rates."
  },
  {
    question: "Why is reheat used in some HVAC systems?",
    options: [
      "To increase humidity",
      "To achieve humidity control after overcooling for dehumidification",
      "To reduce fan energy",
      "To filter air"
    ],
    correctIndex: 1,
    explanation: "Reheat warms air that has been cooled below the required supply temperature to achieve dehumidification while delivering air at the correct temperature for sensible cooling."
  },
  {
    question: "What minimum outdoor air percentage is typically required for ventilation?",
    options: [
      "0%",
      "5-10%",
      "10-25%",
      "50-75%"
    ],
    correctIndex: 2,
    explanation: "Building regulations and CIBSE guidance typically require 10-25% minimum outdoor air for adequate ventilation, depending on occupancy and activity levels."
  }
];

const quizQuestions = [
  {
    question: "An AHU mixes 2 kg/s of outdoor air at 5°C with 8 kg/s of return air at 22°C. What is the mixed air temperature?",
    options: ["15.0°C", "18.6°C", "13.5°C", "20.1°C"],
    correctIndex: 1,
    explanation: "Mixed temperature = (2×5 + 8×22)/(2+8) = (10 + 176)/10 = 186/10 = 18.6°C. The lever rule shows 20% outdoor air reduces return temperature by 20% of the difference."
  },
  {
    question: "When should an economiser cycle switch from free cooling to mechanical cooling?",
    options: [
      "When outdoor temperature exceeds return air temperature",
      "When outdoor enthalpy exceeds return air enthalpy",
      "When outdoor humidity exceeds 80%",
      "When fan speed reaches maximum"
    ],
    correctIndex: 1,
    explanation: "Enthalpy-based economiser control is more accurate than temperature alone, switching to mechanical cooling when outdoor enthalpy exceeds return air enthalpy."
  },
  {
    question: "In a reheat system supplying air at 13°C, the cooling coil outlet is 10°C. What is the reheat load for 5 kg/s airflow?",
    options: ["10 kW", "15 kW", "20 kW", "25 kW"],
    correctIndex: 1,
    explanation: "Reheat load = ṁ × cp × ΔT = 5 × 1.0 × (13 - 10) = 5 × 3 = 15 kW. This represents energy wasted but necessary for humidity control."
  },
  {
    question: "What is the typical supply air temperature for a VAV cooling system?",
    options: ["8-10°C", "12-14°C", "16-18°C", "20-22°C"],
    correctIndex: 1,
    explanation: "VAV systems typically supply air at 12-14°C, allowing variable volume control to match zone loads while maintaining adequate temperature differential."
  },
  {
    question: "A building requires 2.5 m³/s total supply air with 15% minimum outdoor air. What is the minimum fresh air rate?",
    options: ["0.25 m³/s", "0.375 m³/s", "0.50 m³/s", "0.625 m³/s"],
    correctIndex: 1,
    explanation: "Minimum outdoor air = 2.5 × 0.15 = 0.375 m³/s. This ensures adequate ventilation for occupants regardless of economiser operation."
  },
  {
    question: "What component controls the mixed air ratio in a typical AHU?",
    options: ["Supply fan", "Mixing dampers", "Cooling coil", "Filter bank"],
    correctIndex: 1,
    explanation: "Mixing dampers (outdoor air, return air, and exhaust dampers) modulate to control the proportion of outdoor and return air entering the AHU."
  },
  {
    question: "In a face and bypass coil arrangement, what happens when bypass increases?",
    options: [
      "Coil capacity increases",
      "Supply air temperature rises (heating coil) or falls less (cooling coil)",
      "Airflow rate decreases",
      "Coil pressure drop increases"
    ],
    correctIndex: 1,
    explanation: "Increasing bypass allows more air to avoid the coil, reducing the effective heat transfer and moderating the supply air temperature for part-load control."
  },
  {
    question: "What is the purpose of the preheat coil in a cold climate AHU?",
    options: [
      "To provide all heating",
      "To prevent freezing of downstream components",
      "To humidify the air",
      "To improve filtration"
    ],
    correctIndex: 1,
    explanation: "Preheat coils raise cold outdoor air temperature to prevent freezing of filters, cooling coils, and humidifiers, particularly in climates with sub-zero winters."
  },
  {
    question: "An economiser saves 150 kWh per day during 180 suitable days per year. At £0.15/kWh, what is the annual saving?",
    options: ["£2,700", £4,050", "£5,400", "£6,750"],
    correctIndex: 1,
    explanation: "Annual saving = 150 × 180 × 0.15 = 27,000 × 0.15 = £4,050. Economiser cycles provide significant energy savings in temperate climates."
  },
  {
    question: "What is the typical return air temperature in a comfort cooling application?",
    options: ["18-20°C", "22-24°C", "26-28°C", "30-32°C"],
    correctIndex: 1,
    explanation: "Return air at 22-24°C reflects typical room conditions in comfort applications, with the supply-return differential indicating the sensible cooling provided."
  },
  {
    question: "In a 100% outdoor air system, what additional component is essential compared to recirculation systems?",
    options: [
      "Larger cooling coil",
      "Heat recovery device",
      "Additional filter",
      "Larger supply fan"
    ],
    correctIndex: 1,
    explanation: "Heat recovery (run-around coils, plate exchangers, or thermal wheels) is essential in 100% OA systems to recover energy from exhaust air and reduce heating/cooling loads."
  },
  {
    question: "What does DOAS stand for in HVAC terminology?",
    options: [
      "Direct Outdoor Air Supply",
      "Dedicated Outdoor Air System",
      "Ducted Overhead Air System",
      "Dehumidified Outside Air Service"
    ],
    correctIndex: 1,
    explanation: "Dedicated Outdoor Air Systems handle ventilation air separately from room sensible loads, allowing optimised dehumidification and heat recovery."
  }
];

const faqs = [
  {
    question: "When should I specify an economiser cycle?",
    answer: "Economiser cycles are beneficial in climates with significant periods when outdoor conditions are cooler/drier than return air. In the UK, economisers typically provide 500-1500 hours of free cooling annually. Specify enthalpy-based control for humid climates and temperature-based for dry climates. Consider economisers when cooling loads exist for more than 2000 hours per year."
  },
  {
    question: "How do I size mixed air sections?",
    answer: "Mixed air sections must accommodate the maximum of either design outdoor air or full recirculation flow. Size dampers for 3-5 m/s face velocity with adequate mixing length (typically 1-2 equivalent duct diameters). Include access for damper maintenance and ensure proper sealing of outdoor air dampers when closed to prevent infiltration."
  },
  {
    question: "What are alternatives to reheat for humidity control?",
    answer: "Alternatives include: desiccant dehumidification (rotary or liquid), run-around coil heat recovery between cooling and supply, face-and-bypass cooling coil control, series cooling coils at different temperatures, and dedicated outdoor air systems (DOAS) that handle latent loads separately from sensible cooling."
  },
  {
    question: "How does heat recovery affect AHU design?",
    answer: "Heat recovery adds pressure drop (50-300 Pa depending on type), requires additional space, and introduces maintenance requirements. Design considerations include frost protection for plate exchangers, glycol concentration for run-around coils, and purge sections for thermal wheels. Effectiveness typically ranges from 50-80% depending on type and operating conditions."
  },
  {
    question: "What determines minimum outdoor air quantity?",
    answer: "Minimum outdoor air is determined by Building Regulations Part F, CIBSE Guide A occupancy rates (typically 10 L/s per person), contaminant dilution requirements, and pressurisation needs. Consider CO2-based demand control ventilation to optimise outdoor air based on actual occupancy while maintaining minimum rates for building pressurisation."
  }
];

export default function HNCModule2Section3_6() {
  useSEO({
    title: `${TITLE} | HNC Building Services`,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="../h-n-c-module2-section3">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400">Section 3.6</p>
            <h1 className="text-sm font-semibold text-white truncate">{TITLE}</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Title Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-4">
            <Building2 className="h-8 w-8 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">{TITLE}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{DESCRIPTION}</p>
        </div>

        {/* Quick Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
            <Wind className="h-5 w-5 text-purple-400 mb-2" />
            <p className="text-sm font-medium text-white">AHU Processes</p>
            <p className="text-xs text-gray-400">Mixing, heating, cooling, humidification sequences</p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <Thermometer className="h-5 w-5 text-blue-400 mb-2" />
            <p className="text-sm font-medium text-white">Economiser Cycles</p>
            <p className="text-xs text-gray-400">Free cooling strategies and control</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <Settings className="h-5 w-5 text-green-400 mb-2" />
            <p className="text-sm font-medium text-white">Reheat Systems</p>
            <p className="text-xs text-gray-400">Humidity control through reheat</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <Gauge className="h-5 w-5 text-amber-400 mb-2" />
            <p className="text-sm font-medium text-white">System Design</p>
            <p className="text-xs text-gray-400">Building services HVAC integration</p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            Learning Outcomes
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              Apply mixed air calculations using the lever rule on psychrometric charts
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              Design economiser cycles for energy-efficient building cooling
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              Analyse reheat system requirements for humidity control applications
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              Integrate psychrometric principles into complete HVAC system design
            </li>
          </ul>
        </div>

        {/* Section 1: Air Handling Unit Processes */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-bold">1</span>
            <h3 className="text-xl font-semibold text-white">Air Handling Unit Processes</h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
            <p className="text-gray-300">
              Air handling units (AHUs) combine multiple psychrometric processes in sequence to condition air from outdoor and return air sources to the required supply conditions. Understanding the sequence and interaction of these processes is essential for effective HVAC design.
            </p>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Typical AHU Process Sequence (Summer Cooling)</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p><span className="text-purple-400 font-medium">1. Mixing:</span> Outdoor air combines with return air at mixing dampers</p>
                <p><span className="text-purple-400 font-medium">2. Filtration:</span> Particulate removal (minimal psychrometric change, slight heating from fan)</p>
                <p><span className="text-purple-400 font-medium">3. Cooling:</span> Cooling coil reduces temperature and dehumidifies</p>
                <p><span className="text-purple-400 font-medium">4. Reheat:</span> Optional reheat for precise temperature control</p>
                <p><span className="text-purple-400 font-medium">5. Supply:</span> Fan adds small temperature rise (1-2°C typically)</p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Winter Heating Sequence</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p><span className="text-blue-400 font-medium">1. Preheat:</span> Prevents coil freezing in cold climates (raises air to ~5°C minimum)</p>
                <p><span className="text-blue-400 font-medium">2. Mixing:</span> Warm return air reduces heating load</p>
                <p><span className="text-blue-400 font-medium">3. Filtration:</span> Standard particulate removal</p>
                <p><span className="text-blue-400 font-medium">4. Main heating:</span> Heating coil raises temperature to supply setpoint</p>
                <p><span className="text-blue-400 font-medium">5. Humidification:</span> Steam or evaporative humidifier adds moisture if required</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h5 className="font-medium text-white mb-2">Component Pressure Drops</h5>
                <div className="space-y-1 text-sm text-gray-300">
                  <p>• Mixing section: 10-25 Pa</p>
                  <p>• Panel filters: 50-150 Pa (clean to dirty)</p>
                  <p>• Bag filters: 100-250 Pa</p>
                  <p>• HEPA filters: 250-500 Pa</p>
                  <p>• Cooling coil: 100-200 Pa</p>
                  <p>• Heating coil: 50-100 Pa</p>
                  <p>• Silencers: 25-75 Pa</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h5 className="font-medium text-white mb-2">Typical Fan Temperature Rise</h5>
                <div className="space-y-1 text-sm text-gray-300">
                  <p>Fan heat addition:</p>
                  <p className="font-mono bg-black/30 px-2 py-1 rounded">ΔT = (P × (1-η)) / (ṁ × cp)</p>
                  <p className="mt-2">Where:</p>
                  <p>• P = Fan power (kW)</p>
                  <p>• η = Motor efficiency (if motor in airstream)</p>
                  <p>• Typically 1-3°C for supply fans</p>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck
            question="In a summer cooling AHU, what is the purpose of the optional reheat coil?"
            hint="Consider what happens if the cooling coil must overcool to achieve dehumidification."
            answer="Reheat raises the supply air temperature after the cooling coil has overcooled the air for dehumidification, allowing precise temperature control while maintaining humidity requirements."
          />
        </section>

        {/* Section 2: Mixed Air Calculations */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold">2</span>
            <h3 className="text-xl font-semibold text-white">Mixed Air Calculations</h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
            <p className="text-gray-300">
              When outdoor air and return air mix in an AHU, the resulting mixed air condition lies on a straight line between the two states on the psychrometric chart. The lever rule determines the exact position based on the mass flow ratio.
            </p>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Lever Rule Equations</h4>
              <div className="space-y-3">
                <div className="bg-black/30 rounded-lg p-3">
                  <p className="text-sm text-gray-400 mb-1">Mixed air temperature:</p>
                  <p className="font-mono text-white">t_mix = (ṁ_oa × t_oa + ṁ_ra × t_ra) / (ṁ_oa + ṁ_ra)</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <p className="text-sm text-gray-400 mb-1">Mixed air moisture content:</p>
                  <p className="font-mono text-white">g_mix = (ṁ_oa × g_oa + ṁ_ra × g_ra) / (ṁ_oa + ṁ_ra)</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <p className="text-sm text-gray-400 mb-1">Mixed air enthalpy:</p>
                  <p className="font-mono text-white">h_mix = (ṁ_oa × h_oa + ṁ_ra × h_ra) / (ṁ_oa + ṁ_ra)</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Graphical Lever Rule</h4>
              <p className="text-sm text-gray-300 mb-3">
                On the psychrometric chart, the mixed air point M divides the line between outdoor air (O) and return air (R) inversely proportional to the mass flows:
              </p>
              <div className="bg-black/30 rounded-lg p-3 text-center">
                <p className="font-mono text-white">OM/MR = ṁ_ra/ṁ_oa</p>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                The mixed point is closer to the state with the higher mass flow rate.
              </p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Worked Example: Mixed Air Calculation</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Given:</strong></p>
                <p>• Outdoor air: 32°C DB, 24°C WB, 15.5 g/kg, h = 72 kJ/kg</p>
                <p>• Return air: 24°C DB, 17°C WB, 9.4 g/kg, h = 48 kJ/kg</p>
                <p>• Outdoor air flow: 1.5 kg/s (25%)</p>
                <p>• Return air flow: 4.5 kg/s (75%)</p>
                <p className="mt-3"><strong>Solution:</strong></p>
                <p>t_mix = (1.5 × 32 + 4.5 × 24) / 6.0 = (48 + 108) / 6.0 = <span className="text-green-400 font-medium">26°C</span></p>
                <p>g_mix = (1.5 × 15.5 + 4.5 × 9.4) / 6.0 = (23.25 + 42.3) / 6.0 = <span className="text-green-400 font-medium">10.9 g/kg</span></p>
                <p>h_mix = (1.5 × 72 + 4.5 × 48) / 6.0 = (108 + 216) / 6.0 = <span className="text-green-400 font-medium">54 kJ/kg</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h5 className="font-medium text-white mb-2">Minimum Outdoor Air</h5>
                <div className="space-y-1 text-sm text-gray-300">
                  <p>Ventilation requirements set minimum OA:</p>
                  <p>• Offices: 10 L/s per person</p>
                  <p>• Retail: 10-15 L/s per person</p>
                  <p>• Classrooms: 8 L/s per person</p>
                  <p>• Healthcare: 10-15 L/s per person</p>
                  <p>Plus building pressurisation (typically +25 Pa)</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h5 className="font-medium text-white mb-2">Maximum Outdoor Air</h5>
                <div className="space-y-1 text-sm text-gray-300">
                  <p>100% OA operation considerations:</p>
                  <p>• Heat recovery essential</p>
                  <p>• Larger heating/cooling coils</p>
                  <p>• No return air ductwork</p>
                  <p>• Better IAQ control</p>
                  <p>• Higher energy use without recovery</p>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck
            question="Why does the mixed air point lie closer to the return air condition in most comfort systems?"
            hint="Consider typical outdoor air percentages in recirculating systems."
            answer="Most comfort systems use 15-30% outdoor air, meaning 70-85% is return air. The lever rule positions the mixed point inversely to flow rates, so higher return air flow places the mix point closer to return air conditions."
          />
        </section>

        {/* Section 3: Economiser Cycles */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/20 text-green-400 font-bold">3</span>
            <h3 className="text-xl font-semibold text-white">Economiser Cycles</h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
            <p className="text-gray-300">
              Economiser cycles use outdoor air for "free cooling" when ambient conditions are favourable, reducing or eliminating mechanical cooling requirements. This is particularly effective in temperate climates like the UK where outdoor conditions frequently suit direct cooling.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Economiser Control Strategies</h4>
              <div className="space-y-3">
                <div className="bg-black/30 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-400">Temperature-Based Control (Dry Bulb)</p>
                  <p className="text-sm text-gray-300 mt-1">Enable economiser when: t_outdoor {"<"} t_return - 2°C</p>
                  <p className="text-xs text-gray-400 mt-1">Simple but ignores humidity effects. Best for dry climates.</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-400">Enthalpy-Based Control</p>
                  <p className="text-sm text-gray-300 mt-1">Enable economiser when: h_outdoor {"<"} h_return</p>
                  <p className="text-xs text-gray-400 mt-1">More accurate, accounts for latent loads. Preferred for humid climates.</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-400">Differential Enthalpy with Limits</p>
                  <p className="text-sm text-gray-300 mt-1">Enable when: h_outdoor {"<"} h_return AND t_outdoor {"<"} 24°C AND RH_outdoor {"<"} 80%</p>
                  <p className="text-xs text-gray-400 mt-1">Prevents issues with sensor drift and extreme conditions.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Economiser Operating Modes</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-white/10">
                      <th className="pb-2">Mode</th>
                      <th className="pb-2">OA Damper</th>
                      <th className="pb-2">Cooling</th>
                      <th className="pb-2">Condition</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-white/5">
                      <td className="py-2">Minimum OA</td>
                      <td>Minimum position</td>
                      <td>Mechanical</td>
                      <td>Hot outdoor conditions</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Partial Free</td>
                      <td>Modulating</td>
                      <td>Mixed</td>
                      <td>Moderate outdoor temps</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Full Free</td>
                      <td>100% open</td>
                      <td>None</td>
                      <td>Ideal outdoor conditions</td>
                    </tr>
                    <tr>
                      <td className="py-2">Heating</td>
                      <td>Minimum position</td>
                      <td>Heating on</td>
                      <td>Cold outdoor conditions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">UK Economiser Potential</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>In a typical UK office (24°C room, cooling from April-October):</p>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="bg-black/30 rounded-lg p-2">
                    <p className="text-amber-400 font-medium">Free Cooling Hours</p>
                    <p>800-1200 hrs/year</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-2">
                    <p className="text-amber-400 font-medium">Energy Saving</p>
                    <p>20-40% of cooling energy</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-2">
                    <p className="text-amber-400 font-medium">Best Months</p>
                    <p>April, May, September, October</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-2">
                    <p className="text-amber-400 font-medium">Payback</p>
                    <p>2-4 years typically</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Economiser Limitations</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• High outdoor humidity can increase latent loads even at moderate temperatures</li>
                <li>• Outdoor air pollution may limit economiser use in urban areas</li>
                <li>• Enthalpy sensors require regular calibration</li>
                <li>• Damper leakage at minimum position affects heating energy</li>
                <li>• Not suitable for spaces with strict humidity control (museums, data centres)</li>
              </ul>
            </div>
          </div>

          <InlineCheck
            question="Why is enthalpy-based economiser control preferred over temperature-only control in the UK?"
            hint="Consider the UK's climate characteristics and what affects cooling coil load."
            answer="The UK has variable humidity levels. Enthalpy control accounts for both sensible and latent heat, preventing situations where cool but humid outdoor air increases the total cooling load compared to drier return air."
          />
        </section>

        {/* Section 4: Reheat and System Integration */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold">4</span>
            <h3 className="text-xl font-semibold text-white">Reheat and System Integration</h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
            <p className="text-gray-300">
              Reheat systems intentionally overcool air to achieve dehumidification, then reheat to the required supply temperature. While energy-intensive, reheat remains essential for precise humidity control in many applications.
            </p>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">When Reheat is Necessary</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p><span className="text-amber-400 font-medium">High Latent Loads:</span> Spaces with high occupancy or moisture sources requiring dehumidification beyond sensible cooling needs</p>
                <p><span className="text-amber-400 font-medium">VAV Systems at Part Load:</span> When reduced airflow cannot meet sensible load at normal supply temperature</p>
                <p><span className="text-amber-400 font-medium">Zone Diversity:</span> Different zones requiring different supply temperatures from a central AHU</p>
                <p><span className="text-amber-400 font-medium">Critical Humidity Control:</span> Laboratories, museums, operating theatres with strict RH requirements</p>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Reheat Energy Calculation</h4>
              <div className="space-y-3">
                <div className="bg-black/30 rounded-lg p-3">
                  <p className="text-sm text-gray-400 mb-1">Reheat duty:</p>
                  <p className="font-mono text-white">Q_reheat = ṁ × cp × (t_supply - t_coil_off)</p>
                </div>
                <div className="text-sm text-gray-300">
                  <p><strong>Example:</strong> Supply air required at 16°C, cooling coil leaves air at 11°C</p>
                  <p>For 3 kg/s airflow: Q = 3 × 1.0 × (16 - 11) = <span className="text-green-400 font-medium">15 kW reheat</span></p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Energy-Efficient Alternatives to Reheat</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-black/30 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-400">Heat Recovery Reheat</p>
                  <p className="text-xs text-gray-300 mt-1">Use condenser heat or extract air heat via run-around coil to provide reheat energy</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-400">Face and Bypass</p>
                  <p className="text-xs text-gray-300 mt-1">Bypass portion of air around cooling coil to raise mixed supply temperature</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-400">Desiccant Systems</p>
                  <p className="text-xs text-gray-300 mt-1">Remove moisture without overcooling, reducing or eliminating reheat need</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-400">DOAS + Radiant</p>
                  <p className="text-xs text-gray-300 mt-1">Dedicated system handles latent loads; radiant panels provide sensible cooling</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Complete System Design Process</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p><span className="text-blue-400 font-medium">1. Load Calculation:</span> Determine sensible and latent loads for each zone (CIBSE Guide A)</p>
                <p><span className="text-blue-400 font-medium">2. Airflow Selection:</span> Size for peak sensible load considering supply-room ΔT</p>
                <p><span className="text-blue-400 font-medium">3. Supply Conditions:</span> Plot required supply state on psychrometric chart</p>
                <p><span className="text-blue-400 font-medium">4. Coil Selection:</span> Size cooling coil for total load including outdoor air</p>
                <p><span className="text-blue-400 font-medium">5. Economiser Strategy:</span> Determine control sequence and sensor requirements</p>
                <p><span className="text-blue-400 font-medium">6. Part Load Analysis:</span> Verify performance at 25%, 50%, 75% load conditions</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">System Selection Summary</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-white/10">
                      <th className="pb-2">Application</th>
                      <th className="pb-2">Recommended System</th>
                      <th className="pb-2">Key Feature</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-white/5">
                      <td className="py-2">Office (variable loads)</td>
                      <td>VAV with economiser</td>
                      <td>Energy efficiency</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Hospital ward</td>
                      <td>100% OA with heat recovery</td>
                      <td>Infection control</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Laboratory</td>
                      <td>CAV with reheat</td>
                      <td>Precise control</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Data centre</td>
                      <td>Precision cooling + economiser</td>
                      <td>Reliability + efficiency</td>
                    </tr>
                    <tr>
                      <td className="py-2">Retail</td>
                      <td>Rooftop units + economiser</td>
                      <td>Simplicity + cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <InlineCheck
            question="What makes heat recovery reheat more energy-efficient than electric or hot water reheat?"
            hint="Consider where the reheat energy comes from in each case."
            answer="Heat recovery reheat uses waste heat from the cooling system's condenser or exhaust air, energy that would otherwise be rejected. Electric or hot water reheat requires additional primary energy input, making the overall system less efficient."
          />
        </section>

        {/* Worked Examples */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Settings className="h-5 w-5 text-purple-400" />
            Worked Examples
          </h3>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Example 1: Complete AHU Sizing</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Given:</strong></p>
                <p>• Office space: 500 m², 50 occupants</p>
                <p>• Room conditions: 24°C, 50% RH</p>
                <p>• Sensible heat gain: 75 W/m² = 37.5 kW</p>
                <p>• Latent heat gain: 50 W per person = 2.5 kW</p>
                <p>• Design outdoor: 30°C DB, 20°C WB (CIBSE summer design)</p>
                <p>• Minimum outdoor air: 10 L/s × 50 = 500 L/s = 0.5 m³/s</p>

                <p className="mt-3"><strong>Solution:</strong></p>
                <p>1. Supply airflow for 10°C ΔT (24°C room, 14°C supply):</p>
                <p className="ml-4">ṁ = Q_sensible / (cp × ΔT) = 37.5 / (1.0 × 10) = 3.75 kg/s ≈ 3.2 m³/s</p>

                <p className="mt-2">2. Outdoor air percentage: 0.5/3.2 = 15.6% (meets minimum)</p>

                <p className="mt-2">3. Mixed air condition (using chart or calculations):</p>
                <p className="ml-4">15.6% at 30°C + 84.4% at 24°C = 24.9°C mixed air temperature</p>

                <p className="mt-2">4. Total cooling load:</p>
                <p className="ml-4">Room sensible: 37.5 kW</p>
                <p className="ml-4">Room latent: 2.5 kW</p>
                <p className="ml-4">Outdoor air sensible: 0.6 × 1.0 × (30-24) = 3.6 kW</p>
                <p className="ml-4">Outdoor air latent: from chart ≈ 2.4 kW</p>
                <p className="ml-4 text-green-400 font-medium">Total: 37.5 + 2.5 + 3.6 + 2.4 = 46 kW cooling coil duty</p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Example 2: Economiser Energy Saving</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Given:</strong></p>
                <p>• Cooling system COP = 3.0</p>
                <p>• Design cooling load = 50 kW</p>
                <p>• Annual cooling hours = 2000</p>
                <p>• Economiser available hours = 800 (average 60% capacity)</p>
                <p>• Electricity cost = £0.20/kWh</p>

                <p className="mt-3"><strong>Solution:</strong></p>
                <p>Without economiser:</p>
                <p className="ml-4">Electrical energy = (50 × 2000) / 3.0 = 33,333 kWh</p>
                <p className="ml-4">Annual cost = 33,333 × £0.20 = £6,667</p>

                <p className="mt-2">With economiser (800 hours at 60% free cooling):</p>
                <p className="ml-4">Free cooling saves: 50 × 0.6 × 800 = 24,000 kWh thermal</p>
                <p className="ml-4">Electrical saved: 24,000 / 3.0 = 8,000 kWh</p>
                <p className="ml-4 text-green-400 font-medium">Annual saving = 8,000 × £0.20 = £1,600/year</p>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Building2 className="h-5 w-5 text-green-400" />
            Practical Design Guidance
          </h3>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-white">AHU Selection Checklist</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>✓ Verify coil face velocity (2.0-2.5 m/s typical)</li>
                  <li>✓ Allow filter pressure drop growth (2× clean drop)</li>
                  <li>✓ Include fan temperature rise in supply temperature</li>
                  <li>✓ Size economiser dampers for low leakage</li>
                  <li>✓ Provide condensate drainage access</li>
                  <li>✓ Consider acoustic treatment requirements</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-white">Commissioning Points</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>✓ Verify economiser changeover setpoints</li>
                  <li>✓ Check minimum OA damper position</li>
                  <li>✓ Confirm mixed air temperature sensing</li>
                  <li>✓ Test reheat staging sequence</li>
                  <li>✓ Verify supply air temperature control</li>
                  <li>✓ Check enthalpy sensor calibration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="font-medium text-white mb-2">{faq.question}</h4>
                <p className="text-sm text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Quick Reference</h3>
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Key Equations</h4>
                <div className="space-y-1 text-gray-300 font-mono text-xs">
                  <p>t_mix = (ṁ₁t₁ + ṁ₂t₂)/(ṁ₁ + ṁ₂)</p>
                  <p>Q_reheat = ṁ × cp × ΔT</p>
                  <p>Economiser: h_OA {"<"} h_RA</p>
                  <p>Fan rise: ΔT = P(1-η)/(ṁ×cp)</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Typical Values</h4>
                <div className="space-y-1 text-gray-300 text-xs">
                  <p>• Min OA: 10-25% of supply</p>
                  <p>• Economiser savings: 20-40%</p>
                  <p>• Supply air: 12-16°C typical</p>
                  <p>• Coil face velocity: 2.0-2.5 m/s</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 3.6 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-white/10">
          <Link to="../h-n-c-module2-section3-5">
            <Button variant="outline" className="border-white/20 text-black bg-white/90 hover:bg-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous: Cooling and Heating Coils
            </Button>
          </Link>
          <Link to="../h-n-c-module2-section4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Next: Section 4
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
