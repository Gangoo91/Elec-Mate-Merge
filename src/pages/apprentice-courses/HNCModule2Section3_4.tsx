import { ArrowLeft, Thermometer, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Air Conditioning Processes - HNC Module 2 Section 3.4";
const DESCRIPTION = "Master sensible heating and cooling, humidification, dehumidification and air mixing processes for HVAC design with psychrometric chart plotting.";

const quickCheckQuestions = [
  {
    id: "sensible-heating",
    question: "During sensible heating, which property remains constant?",
    options: ["Dry bulb temperature", "Relative humidity", "Moisture content (g/kg)", "Enthalpy"],
    correctIndex: 2,
    explanation: "Sensible heating adds heat without adding or removing moisture. The moisture content (g/kg) stays constant while dry bulb temperature increases and RH decreases."
  },
  {
    id: "dehumidification",
    question: "What must happen for dehumidification to occur at a cooling coil?",
    options: [
      "Coil must be above room temperature",
      "Coil surface must be below the air's dew point",
      "Air velocity must exceed 3 m/s",
      "Refrigerant must be R410A"
    ],
    correctIndex: 1,
    explanation: "Dehumidification only occurs when the coil surface temperature is below the dew point of the incoming air, causing water vapour to condense on the coil surface."
  },
  {
    id: "adiabatic-humidification",
    question: "In adiabatic humidification (evaporative cooling), what happens to enthalpy?",
    options: [
      "Enthalpy increases significantly",
      "Enthalpy decreases significantly",
      "Enthalpy remains approximately constant",
      "Enthalpy becomes zero"
    ],
    correctIndex: 2,
    explanation: "In adiabatic humidification, sensible heat from the air provides the latent heat for evaporation. Total enthalpy remains nearly constant while dry bulb drops and moisture content rises."
  },
  {
    id: "mixing-ratio",
    question: "When mixing 2 kg/s of air at 30°C with 3 kg/s at 20°C, the mixed temperature is:",
    options: ["22°C", "24°C", "25°C", "26°C"],
    correctIndex: 1,
    explanation: "Mixed temperature = (2×30 + 3×20)/(2+3) = (60+60)/5 = 120/5 = 24°C. The mixture is weighted toward the larger mass flow."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Sensible heat transfer affects which property?",
    options: [
      "Only moisture content",
      "Only temperature",
      "Both temperature and moisture content",
      "Neither temperature nor moisture content"
    ],
    correctAnswer: 1,
    explanation: "Sensible heat transfer changes temperature only. It does not add or remove moisture from the air. Latent heat transfer changes moisture content."
  },
  {
    id: 2,
    question: "The sensible heat ratio (SHR) is defined as:",
    options: [
      "Latent heat / Total heat",
      "Sensible heat / Total heat",
      "Sensible heat / Latent heat",
      "Total heat / Sensible heat"
    ],
    correctAnswer: 1,
    explanation: "SHR = Sensible heat / Total heat = Qs / (Qs + QL). A high SHR (near 1.0) indicates mostly temperature change; a low SHR indicates significant moisture removal."
  },
  {
    id: 3,
    question: "On a psychrometric chart, sensible cooling appears as:",
    options: [
      "Vertical movement downward",
      "Horizontal movement to the left",
      "Diagonal movement toward saturation",
      "Circular path"
    ],
    correctAnswer: 1,
    explanation: "Sensible cooling moves the state point horizontally to the left (lower dry bulb, same moisture content). RH increases but no moisture is removed."
  },
  {
    id: 4,
    question: "Steam humidification on a psychrometric chart appears as:",
    options: [
      "Horizontal line to the right",
      "Vertical line upward (nearly)",
      "Diagonal along wet bulb line",
      "Horizontal line to the left"
    ],
    correctAnswer: 1,
    explanation: "Steam humidification adds moisture with minimal temperature change, appearing as a near-vertical line upward. Some sensible heat may be added depending on steam temperature."
  },
  {
    id: 5,
    question: "What is the primary advantage of adiabatic (evaporative) humidification?",
    options: [
      "No energy input required beyond fan power",
      "Adds heat to the air",
      "Works at any humidity level",
      "Removes contaminants"
    ],
    correctAnswer: 0,
    explanation: "Adiabatic humidification uses the air's sensible heat for evaporation, requiring no external heating energy. It is energy-efficient but limited by saturation."
  },
  {
    id: 6,
    question: "Cooling with dehumidification requires the coil to operate:",
    options: [
      "Above the air dew point",
      "Below the air dew point",
      "At exactly the air dew point",
      "At any temperature below dry bulb"
    ],
    correctAnswer: 1,
    explanation: "For dehumidification, the coil surface must be below the entering air's dew point. Only then will moisture condense from the air onto the coil."
  },
  {
    id: 7,
    question: "The sensible heat equation for air is:",
    options: [
      "Qs = ṁ × g × hfg",
      "Qs = ṁ × cp × ΔT",
      "Qs = ṁ × Δg",
      "Qs = V̇ × ΔP"
    ],
    correctAnswer: 1,
    explanation: "Qs = ṁ × cp × ΔT where ṁ is mass flow (kg/s), cp is specific heat (1.005 kJ/kg·K for air), and ΔT is temperature change (K or °C)."
  },
  {
    id: 8,
    question: "The latent heat equation for humidification/dehumidification is:",
    options: [
      "QL = ṁ × cp × ΔT",
      "QL = ṁ × Δg × hfg",
      "QL = V̇ × Δρ",
      "QL = ṁ × Δh"
    ],
    correctAnswer: 1,
    explanation: "QL = ṁ × Δg × hfg where Δg is change in moisture content (kg/kg) and hfg is latent heat of vaporisation (~2501 kJ/kg at 0°C, or ~2450 kJ/kg at typical conditions)."
  },
  {
    id: 9,
    question: "When two air streams mix, the mixture state lies:",
    options: [
      "At the higher enthalpy state",
      "On a straight line between the two states",
      "At the saturation curve",
      "At the lower temperature state"
    ],
    correctAnswer: 1,
    explanation: "Mixing produces a state on the straight line connecting the two original states. Position depends on mass flow ratio - closer to the larger flow."
  },
  {
    id: 10,
    question: "Chemical dehumidification (desiccant) differs from cooling coil dehumidification because:",
    options: [
      "It cools the air more",
      "It heats the air while removing moisture",
      "It does not change moisture content",
      "It requires lower energy"
    ],
    correctAnswer: 1,
    explanation: "Desiccant dehumidification absorbs moisture and releases the heat of absorption, warming the air. The process moves diagonally down-right on the chart (lower g, higher T)."
  },
  {
    id: 11,
    question: "Reheat after cooling coil dehumidification is used to:",
    options: [
      "Increase the moisture content",
      "Raise temperature without adding moisture",
      "Further reduce humidity",
      "Increase air velocity"
    ],
    correctAnswer: 1,
    explanation: "After dehumidification, air may be too cold for comfort. Reheat raises the dry bulb temperature (sensible heating) while maintaining the low moisture content achieved at the coil."
  },
  {
    id: 12,
    question: "An air conditioning process with SHR = 0.7 means:",
    options: [
      "70% of the load is latent",
      "70% of the load is sensible",
      "The air is 70% saturated",
      "Temperature change is 70°C"
    ],
    correctAnswer: 1,
    explanation: "SHR = 0.7 means 70% of the total cooling load is sensible (temperature reduction) and 30% is latent (moisture removal)."
  }
];

const faqs = [
  {
    question: "Why do cooling coils both cool and dehumidify?",
    answer: "When coil surface temperature is below the air's dew point, the air adjacent to the coil becomes saturated and moisture condenses. The coil removes both sensible heat (cooling) and latent heat (dehumidification). If the coil were above dew point, only sensible cooling would occur."
  },
  {
    question: "What determines the sensible heat ratio of a space?",
    answer: "SHR depends on the nature of heat gains. Sensible gains include solar radiation, lighting, equipment and conduction. Latent gains come from people (respiration/perspiration) and moisture-generating processes. Offices typically have SHR 0.8-0.9; kitchens and swimming pools have lower SHR due to high latent loads."
  },
  {
    question: "When is reheat necessary?",
    answer: "Reheat is needed when dehumidification cools air below the required supply temperature. This occurs when the room sensible heat ratio is higher than the coil's natural SHR, or when humidity control is more important than temperature. Reheat wastes energy but may be unavoidable for precise humidity control."
  },
  {
    question: "How does spray humidification differ from steam?",
    answer: "Spray (adiabatic) humidification uses water sprays or wetted media. Water evaporates using sensible heat from the air, so air cools as it humidifies - following a wet bulb line. Steam humidification adds both moisture and heat, causing near-vertical movement on the chart with slight temperature rise."
  },
  {
    question: "Why is mixing important in HVAC systems?",
    answer: "Most HVAC systems mix return air with fresh outside air for energy efficiency and ventilation. Understanding mixing calculations allows engineers to determine mixed air conditions for coil sizing, predict condensation risks, and optimise the fresh air fraction for different conditions."
  },
  {
    question: "Can you have cooling without dehumidification?",
    answer: "Yes, if the cooling coil surface stays above the air's dew point. This occurs with high coil water temperatures (typically above 12-14°C) or low inlet air humidity. Chilled beams and radiant cooling often provide sensible-only cooling, requiring separate dehumidification if needed."
  }
];

const HNCModule2Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section3">
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
          <div className="inline-flex items-center gap-2 text-cyan-400 text-sm mb-3">
            <Thermometer className="h-4 w-4" />
            <span>Module 2.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Air Conditioning Processes
          </h1>
          <p className="text-white/80">
            Understanding heating, cooling, humidification and dehumidification for HVAC system design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-400/5 border-l-2 border-cyan-400/50">
            <p className="text-cyan-400 text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Sensible:</strong> Temperature change only (Qs = ṁcpΔT)</li>
              <li className="pl-1"><strong>Latent:</strong> Moisture change only (QL = ṁΔghfg)</li>
              <li className="pl-1"><strong>Total:</strong> Qt = Qs + QL (or ṁΔh)</li>
              <li className="pl-1"><strong>SHR:</strong> Qs/Qt - defines process direction</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-400/5 border-l-2 border-cyan-400/50">
            <p className="text-cyan-400/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Heating coils:</strong> Sensible heating in winter</li>
              <li className="pl-1"><strong>Cooling coils:</strong> Cooling + dehumidification</li>
              <li className="pl-1"><strong>Humidifiers:</strong> Steam or spray types</li>
              <li className="pl-1"><strong>Mixing:</strong> Outside and return air</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate sensible and latent heat loads",
              "Plot heating and cooling processes on the psychrometric chart",
              "Understand humidification methods and their chart representation",
              "Analyse cooling with dehumidification processes",
              "Calculate mixed air conditions",
              "Determine sensible heat ratio for system design"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-cyan-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Sensible Heating and Cooling */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">01</span>
            Sensible Heating and Cooling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Sensible processes change only the temperature of air, without adding or removing moisture.
              On the psychrometric chart, these appear as horizontal lines.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Sensible Heat Equation</p>
              <p className="font-mono text-center text-lg mb-2">Q<sub>s</sub> = ṁ × c<sub>p</sub> × ΔT</p>
              <div className="text-xs text-white/70 text-center space-y-1">
                <p>Qs = sensible heat rate (kW)</p>
                <p>ṁ = mass flow rate (kg/s)</p>
                <p>cp = 1.005 kJ/kg·K (dry air)</p>
                <p>ΔT = temperature change (°C or K)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Sensible Process Characteristics</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Process</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Chart Direction</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Property Changes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sensible heating</td>
                      <td className="border border-white/10 px-3 py-2">Horizontal right →</td>
                      <td className="border border-white/10 px-3 py-2">T↑, RH↓, h↑, g constant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sensible cooling</td>
                      <td className="border border-white/10 px-3 py-2">Horizontal left ←</td>
                      <td className="border border-white/10 px-3 py-2">T↓, RH↑, h↓, g constant</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-cyan-400/80 mb-2">Heating Equipment</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">LTHW heating coils (70-80°C flow)</li>
                  <li className="pl-1">Electric heater batteries</li>
                  <li className="pl-1">Direct gas-fired heaters</li>
                  <li className="pl-1">Heat recovery coils</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-cyan-400/80 mb-2">Cooling Equipment</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Chilled water coils (6-12°C)</li>
                  <li className="pl-1">Direct expansion (DX) coils</li>
                  <li className="pl-1">Chilled beams (sensible only)</li>
                  <li className="pl-1">Free cooling coils</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Humidification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">02</span>
            Humidification Processes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Humidification adds water vapour to air to increase moisture content and relative humidity.
              The two main methods produce different paths on the psychrometric chart.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Humidification Methods Compared</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Chart Path</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Temperature Change</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Energy Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Steam injection</td>
                      <td className="border border-white/10 px-3 py-2">Near vertical ↑</td>
                      <td className="border border-white/10 px-3 py-2">Slight increase</td>
                      <td className="border border-white/10 px-3 py-2">Boiler/steam generator</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Adiabatic spray</td>
                      <td className="border border-white/10 px-3 py-2">Along wet bulb ↙</td>
                      <td className="border border-white/10 px-3 py-2">Decrease (cooling)</td>
                      <td className="border border-white/10 px-3 py-2">Air's sensible heat</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wetted media</td>
                      <td className="border border-white/10 px-3 py-2">Along wet bulb ↙</td>
                      <td className="border border-white/10 px-3 py-2">Decrease (cooling)</td>
                      <td className="border border-white/10 px-3 py-2">Air's sensible heat</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ultrasonic</td>
                      <td className="border border-white/10 px-3 py-2">Near vertical ↑</td>
                      <td className="border border-white/10 px-3 py-2">Very slight change</td>
                      <td className="border border-white/10 px-3 py-2">Electrical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Adiabatic Saturation Efficiency</p>
              <p className="font-mono text-center text-lg mb-2">η = (T<sub>1</sub> - T<sub>2</sub>) / (T<sub>1</sub> - T<sub>wb</sub>)</p>
              <p className="text-xs text-white/70 text-center">Efficiency typically 70-90% for spray/media systems</p>
            </div>

            <p className="text-sm text-cyan-400/70">
              <strong>Note:</strong> Adiabatic humidification has a natural limit at the wet bulb temperature
              (100% saturation efficiency would reach saturation at the wet bulb).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 3: Dehumidification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">03</span>
            Dehumidification Processes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Dehumidification removes moisture from air, essential for comfort cooling in humid conditions
              and for process applications requiring low humidity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Dehumidification Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Principle</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Chart Path</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cooling coil</td>
                      <td className="border border-white/10 px-3 py-2">Surface below dew point</td>
                      <td className="border border-white/10 px-3 py-2">Toward ADP</td>
                      <td className="border border-white/10 px-3 py-2">Most HVAC systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Desiccant</td>
                      <td className="border border-white/10 px-3 py-2">Moisture absorption</td>
                      <td className="border border-white/10 px-3 py-2">Down-right (g↓, T↑)</td>
                      <td className="border border-white/10 px-3 py-2">Low humidity needs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Latent Heat Equation</p>
              <p className="font-mono text-center text-lg mb-2">Q<sub>L</sub> = ṁ × Δg × h<sub>fg</sub></p>
              <div className="text-xs text-white/70 text-center space-y-1">
                <p>QL = latent heat rate (kW)</p>
                <p>Δg = moisture content change (kg/kg)</p>
                <p>hfg ≈ 2450 kJ/kg (at typical conditions)</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-cyan-400/80 mb-2">Cooling Coil Dehumidification</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Coil must be below air dew point</li>
                  <li className="pl-1">Process line aims toward ADP</li>
                  <li className="pl-1">Condensate must be drained</li>
                  <li className="pl-1">Often followed by reheat</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-cyan-400/80 mb-2">Total Cooling Load</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Qt = Qs + QL</li>
                  <li className="pl-1">Or: Qt = ṁ × Δh</li>
                  <li className="pl-1">SHR = Qs / Qt</li>
                  <li className="pl-1">Typical comfort: SHR 0.7-0.9</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Mixing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">04</span>
            Air Mixing Processes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Mixing occurs when two air streams combine, such as fresh outside air with recirculated
              return air. The mixed condition lies on a straight line between the two original states.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Mixing Equations</p>
              <div className="font-mono text-center text-sm space-y-2 mb-3">
                <p>T<sub>m</sub> = (ṁ<sub>1</sub>T<sub>1</sub> + ṁ<sub>2</sub>T<sub>2</sub>) / (ṁ<sub>1</sub> + ṁ<sub>2</sub>)</p>
                <p>g<sub>m</sub> = (ṁ<sub>1</sub>g<sub>1</sub> + ṁ<sub>2</sub>g<sub>2</sub>) / (ṁ<sub>1</sub> + ṁ<sub>2</sub>)</p>
                <p>h<sub>m</sub> = (ṁ<sub>1</sub>h<sub>1</sub> + ṁ<sub>2</sub>h<sub>2</sub>) / (ṁ<sub>1</sub> + ṁ<sub>2</sub>)</p>
              </div>
              <p className="text-xs text-white/70 text-center">All properties mix by mass-weighted average</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Graphical Mixing (Lever Rule)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">Plot both air states on the chart</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">Draw a straight line between them</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">Divide line by inverse mass ratio</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">Mixed state is closer to larger mass flow</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-cyan-400/70">
              <strong>Caution:</strong> If the mixing line crosses the saturation curve, fog or condensation
              may form in the mixing chamber. This can occur in cold climates when very cold dry air mixes
              with warm humid return air.
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
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 1: Heating Coil Capacity</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An AHU supplies 4.5 kg/s of air. Calculate the heating coil capacity to raise temperature from 10°C to 24°C.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given: ṁ = 4.5 kg/s, T₁ = 10°C, T₂ = 24°C</p>
                <p>cp = 1.005 kJ/kg·K</p>
                <p className="mt-2">Qs = ṁ × cp × ΔT</p>
                <p>Qs = 4.5 × 1.005 × (24 - 10)</p>
                <p>Qs = 4.5 × 1.005 × 14</p>
                <p>Qs = <strong>63.3 kW</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 2: Cooling with Dehumidification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Air at 28°C, 12 g/kg enters a cooling coil and leaves at 14°C, 9 g/kg. Calculate sensible, latent and total load for 3 kg/s.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Sensible: Qs = ṁ × cp × ΔT</p>
                <p>Qs = 3 × 1.005 × (28 - 14) = <strong>42.2 kW</strong></p>
                <p className="mt-2">Latent: QL = ṁ × Δg × hfg</p>
                <p>QL = 3 × (12-9)/1000 × 2450</p>
                <p>QL = 3 × 0.003 × 2450 = <strong>22.1 kW</strong></p>
                <p className="mt-2">Total: Qt = Qs + QL</p>
                <p>Qt = 42.2 + 22.1 = <strong>64.3 kW</strong></p>
                <p className="mt-2">SHR = 42.2/64.3 = <strong>0.66</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 3: Air Mixing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> 1.5 kg/s outside air (32°C, 18 g/kg) mixes with 4.5 kg/s return air (24°C, 10 g/kg). Find mixed conditions.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total flow: ṁt = 1.5 + 4.5 = 6.0 kg/s</p>
                <p className="mt-2">Mixed temperature:</p>
                <p>Tm = (1.5×32 + 4.5×24) / 6.0</p>
                <p>Tm = (48 + 108) / 6 = <strong>26°C</strong></p>
                <p className="mt-2">Mixed moisture content:</p>
                <p>gm = (1.5×18 + 4.5×10) / 6.0</p>
                <p>gm = (27 + 45) / 6 = <strong>12 g/kg</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 4: Steam Humidification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> How much steam (kg/h) is needed to raise 2 kg/s of air from 5 g/kg to 8 g/kg moisture content?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Moisture addition rate:</p>
                <p>Δg = 8 - 5 = 3 g/kg = 0.003 kg/kg</p>
                <p className="mt-2">Steam flow rate:</p>
                <p>ṁsteam = ṁair × Δg</p>
                <p>ṁsteam = 2 × 0.003 = 0.006 kg/s</p>
                <p className="mt-2">Converting to kg/h:</p>
                <p>ṁsteam = 0.006 × 3600 = <strong>21.6 kg/h</strong></p>
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
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Essential Equations</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Qs = ṁcpΔT</strong> — Sensible heat (kW)</li>
                <li className="pl-1"><strong>QL = ṁΔghfg</strong> — Latent heat (kW)</li>
                <li className="pl-1"><strong>Qt = ṁΔh</strong> — Total heat (kW)</li>
                <li className="pl-1"><strong>SHR = Qs/Qt</strong> — Sensible heat ratio</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Typical SHR Values</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Offices:</strong> 0.85-0.95 (mostly sensible)</li>
                <li className="pl-1"><strong>Retail:</strong> 0.80-0.90</li>
                <li className="pl-1"><strong>Restaurants:</strong> 0.70-0.80</li>
                <li className="pl-1"><strong>Swimming pools:</strong> 0.50-0.65 (high latent)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Units for Δg</strong> — Must be kg/kg in equation, not g/kg</li>
                <li className="pl-1"><strong>Forgetting reheat</strong> — After dehumidification if too cold</li>
                <li className="pl-1"><strong>Mixing by volume</strong> — Must use mass flow rates</li>
                <li className="pl-1"><strong>Assuming sensible only</strong> — Check if coil below dew point</li>
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
                <p className="font-medium text-white mb-1">Process Equations</p>
                <ul className="space-y-0.5">
                  <li>Sensible: Qs = ṁcpΔT</li>
                  <li>Latent: QL = ṁΔghfg</li>
                  <li>Total: Qt = ṁΔh</li>
                  <li>Mixing: Tm = Σ(ṁT)/Σṁ</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Values</p>
                <ul className="space-y-0.5">
                  <li>cp (air): 1.005 kJ/kg·K</li>
                  <li>hfg: ~2450 kJ/kg</li>
                  <li>Comfort SHR: 0.7-0.9</li>
                  <li>Office SHR: 0.85-0.95</li>
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
            <Link to="../h-n-c-module2-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Psychrometric Charts
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section3-5">
              Next: Cooling and Heating Coils
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section3_4;
