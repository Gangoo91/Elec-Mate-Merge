import { ArrowLeft, Wind, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Air Infiltration and Ventilation - HNC Module 2 Section 5.4";
const DESCRIPTION = "Understanding air changes per hour, air permeability testing, natural ventilation, stack effect, and wind pressure in building design.";

const quickCheckQuestions = [
  {
    id: "ach-definition",
    question: "What does an air change rate of 1.5 ach mean?",
    options: [
      "1.5m³ of air enters per hour",
      "The room volume is replaced 1.5 times per hour",
      "Air moves at 1.5 m/s",
      "Air pressure changes 1.5 times per hour"
    ],
    correctIndex: 1,
    explanation: "Air changes per hour (ach) means the entire room volume is theoretically replaced that many times each hour. 1.5 ach means the volume equivalent enters/leaves 1.5 times per hour."
  },
  {
    id: "part-l-permeability",
    question: "What is the maximum air permeability permitted for new dwellings under Part L 2021?",
    options: [
      "3 m³/(h.m²) @ 50Pa",
      "5 m³/(h.m²) @ 50Pa",
      "8 m³/(h.m²) @ 50Pa",
      "10 m³/(h.m²) @ 50Pa"
    ],
    correctIndex: 2,
    explanation: "Part L 2021 requires maximum 8 m³/(h.m²) at 50Pa for new dwellings. Better than 5 is needed for good energy performance, and Passivhaus requires less than 0.6 ach at 50Pa."
  },
  {
    id: "stack-effect",
    question: "When does stack effect ventilation work most effectively?",
    options: [
      "When internal and external temperatures are equal",
      "When there is a significant temperature difference between inside and outside",
      "Only during windy conditions",
      "Only in single-storey buildings"
    ],
    correctIndex: 1,
    explanation: "Stack effect relies on buoyancy from temperature difference. Warm air inside rises and exits at high level, drawing in cooler air below. Greater temperature difference = stronger stack effect."
  },
  {
    id: "wind-pressure",
    question: "On which face of a building is wind pressure typically positive (pushing air in)?",
    options: [
      "Leeward (downwind) face",
      "Windward (upwind) face",
      "Roof only",
      "All faces equally"
    ],
    correctIndex: 1,
    explanation: "Wind creates positive pressure (pushing in) on the windward face and negative pressure (suction) on leeward and side faces. This pressure difference drives cross-ventilation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the difference between infiltration and ventilation?",
    options: [
      "Infiltration is intentional, ventilation is unintentional",
      "Infiltration is unintentional air leakage, ventilation is controlled air supply",
      "They are the same thing",
      "Infiltration only occurs in winter"
    ],
    correctAnswer: 1,
    explanation: "Infiltration is uncontrolled air leakage through cracks and gaps (unintentional). Ventilation is the planned provision of fresh air through openings, ducts, or mechanical systems (intentional)."
  },
  {
    id: 2,
    question: "How do you convert air permeability (m³/h/m²@50Pa) to typical infiltration rate?",
    options: [
      "Divide by 10",
      "Divide by 20",
      "Multiply by 2",
      "No conversion needed"
    ],
    correctAnswer: 1,
    explanation: "As a rule of thumb, divide q50 by 20 to estimate typical infiltration rate (ach). A building with 5 m³/h/m²@50Pa would have approximately 0.25 ach infiltration under normal conditions."
  },
  {
    id: 3,
    question: "What ventilation rate does Building Regulations Approved Document F require for an office?",
    options: [
      "5 l/s per person",
      "8 l/s per person",
      "10 l/s per person",
      "15 l/s per person"
    ],
    correctAnswer: 2,
    explanation: "ADF requires minimum 10 l/s per person for offices and similar workplaces. This provides adequate fresh air for CO2 dilution and general air quality."
  },
  {
    id: 4,
    question: "What is the primary driving force for stack effect ventilation?",
    options: [
      "Wind speed",
      "Density difference between warm and cool air",
      "Mechanical fans",
      "Solar radiation"
    ],
    correctAnswer: 1,
    explanation: "Stack effect is driven by buoyancy - warm air is less dense than cool air. The density difference creates pressure difference, causing warm air to rise and exit at height while cool air enters at low level."
  },
  {
    id: 5,
    question: "A room is 4m × 5m × 3m high with 2 ach. What is the volumetric flow rate?",
    options: [
      "30 m³/h",
      "60 m³/h",
      "120 m³/h",
      "240 m³/h"
    ],
    correctAnswer: 2,
    explanation: "Volume = 4 × 5 × 3 = 60 m³. Flow rate = Volume × ach = 60 × 2 = 120 m³/h."
  },
  {
    id: 6,
    question: "What wind pressure coefficient (Cp) would you expect on a windward face?",
    options: [
      "-0.5 to -0.8",
      "0",
      "+0.5 to +0.8",
      "+2.0"
    ],
    correctAnswer: 2,
    explanation: "Windward faces typically have Cp values of +0.5 to +0.8, indicating positive pressure. Leeward faces have negative values (-0.3 to -0.5). Cp depends on building shape and wind angle."
  },
  {
    id: 7,
    question: "For natural ventilation design, what is the approximate neutral pressure level?",
    options: [
      "Ground floor",
      "Approximately mid-height of the ventilated space",
      "Top floor",
      "Roof level"
    ],
    correctAnswer: 1,
    explanation: "The neutral pressure level (NPL) is where internal and external pressures are equal, typically at mid-height of a naturally ventilated space. Air enters below NPL and exits above."
  },
  {
    id: 8,
    question: "What is the purpose of a background ventilator (trickle vent)?",
    options: [
      "Emergency smoke ventilation",
      "Rapid purge ventilation",
      "Continuous background fresh air when windows are closed",
      "Mechanical ventilation backup"
    ],
    correctAnswer: 2,
    explanation: "Background ventilators (trickle vents) provide continuous low-level fresh air ventilation when windows are closed, preventing build-up of moisture and pollutants. Part F requires minimum equivalent areas."
  },
  {
    id: 9,
    question: "Which building orientation maximises cross-ventilation potential?",
    options: [
      "Narrow plan perpendicular to prevailing wind",
      "Deep plan parallel to prevailing wind",
      "Square plan with single aspect",
      "Orientation doesn't affect cross-ventilation"
    ],
    correctAnswer: 0,
    explanation: "Narrow plan buildings perpendicular to prevailing wind enable effective cross-ventilation. Wind enters windward openings and exits leeward. Maximum depth for effective cross-ventilation is typically 12-15m."
  },
  {
    id: 10,
    question: "What is the heat loss due to ventilation for a room with 100 l/s fresh air and 20K temperature difference?",
    options: [
      "1.2 kW",
      "2.4 kW",
      "4.8 kW",
      "12 kW"
    ],
    correctAnswer: 1,
    explanation: "Q = ρ × cp × V × ΔT = 1.2 × 1.0 × 0.1 × 20 = 2.4 kW. Or use Q = 1.2 × V(l/s) × ΔT(K) = 1.2 × 100 × 20 / 1000 = 2.4 kW."
  },
  {
    id: 11,
    question: "What is meant by 'equivalent area' of a ventilation opening?",
    options: [
      "The actual measured area of the opening",
      "The theoretical area that would pass the same airflow with no resistance",
      "Half the opening area",
      "The frame area plus glass area"
    ],
    correctAnswer: 1,
    explanation: "Equivalent area is the theoretical sharp-edged orifice area that would pass the same flow. Real openings have discharge coefficients (typically 0.6-0.7) reducing effective area below geometric area."
  },
  {
    id: 12,
    question: "For a naturally ventilated building, what minimum floor-to-ceiling height helps stack effect?",
    options: [
      "2.4m",
      "2.7m",
      "3.0m or greater",
      "Height doesn't affect stack effect"
    ],
    correctAnswer: 2,
    explanation: "Greater floor-to-ceiling height increases stack effect pressure (ΔP ∝ height). Minimum 3.0m is often recommended for naturally ventilated offices. Atria and voids further enhance stack height."
  }
];

const faqs = [
  {
    question: "What is the relationship between air permeability test results and actual infiltration?",
    answer: "Air permeability tests at 50Pa provide a standardised comparison between buildings, but actual infiltration occurs at much lower pressures (1-10Pa). Divide q50 by approximately 20 to estimate typical infiltration. The actual factor varies with building exposure, height, and climate."
  },
  {
    question: "How do I calculate ventilation heat loss for a building?",
    answer: "Use Qv = 0.33 × n × V × ΔT (Watts), where n = air changes per hour, V = room volume (m³), ΔT = temperature difference (K). Or Qv = 1.2 × q × ΔT where q = volumetric flow rate (l/s). The 0.33 and 1.2 factors come from ρ × cp for air."
  },
  {
    question: "When should I use mechanical ventilation rather than natural?",
    answer: "Use mechanical when: building is too deep for cross-ventilation (>12-15m), noise or pollution prevents opening windows, consistent year-round ventilation is needed, heat recovery is required, or specific pressurisation is needed (cleanrooms, kitchens). Part F gives hierarchical preference for ventilation solutions."
  },
  {
    question: "How do wind and stack effects interact?",
    answer: "They can reinforce or oppose each other. In winter (high ΔT), stack effect dominates. In summer (low ΔT, higher wind), wind becomes dominant. Good design uses both: wind-driven cross-ventilation in summer, stack-effect displacement in winter. Combined effect is not simply additive."
  },
  {
    question: "What air permeability should I target for energy efficiency?",
    answer: "Part L 2021 maximum is 8 m³/h/m²@50Pa but target lower: 5 for good practice, 3 for excellent, 1 for near-Passivhaus. Very airtight buildings (below 3) require mechanical ventilation with heat recovery (MVHR) as infiltration cannot provide adequate fresh air."
  },
  {
    question: "How does single-sided ventilation differ from cross-ventilation?",
    answer: "Single-sided relies on wind turbulence and local pressure variations through openings on one facade only - effective depth limited to ~2× ceiling height (~6m for 3m ceiling). Cross-ventilation uses pressure difference between opposite facades - effective to 12-15m depth or 5× ceiling height."
  }
];

const HNCModule2Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section5">
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
            <Wind className="h-4 w-4" />
            <span>Module 2.5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Air Infiltration and Ventilation
          </h1>
          <p className="text-white/80">
            Air movement in buildings: infiltration, natural ventilation, and driving forces
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Infiltration:</strong> Uncontrolled air leakage through gaps</li>
              <li className="pl-1"><strong>Ventilation:</strong> Controlled fresh air supply</li>
              <li className="pl-1"><strong>Stack effect:</strong> Buoyancy-driven flow (warm air rises)</li>
              <li className="pl-1"><strong>Wind effect:</strong> Pressure-driven cross-flow</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Part F:</strong> Minimum ventilation requirements</li>
              <li className="pl-1"><strong>Part L:</strong> Airtightness testing (max 8 m³/h/m²)</li>
              <li className="pl-1"><strong>Heat loss:</strong> Ventilation often 30-50% of total</li>
              <li className="pl-1"><strong>IAQ:</strong> CO2, moisture, pollutant control</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate ventilation rates and air change rates",
              "Understand air permeability testing and Part L requirements",
              "Apply stack effect and wind pressure principles",
              "Determine ventilation heat losses",
              "Design natural ventilation openings using equivalent area",
              "Select appropriate ventilation strategies for different buildings"
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

        {/* Section 1: Air Changes and Permeability */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Air Changes and Air Permeability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Air change rate describes how often the room air is replaced, while air permeability measures
              building envelope leakage. Both affect energy use and indoor air quality.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key definitions:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Air change rate (ach):</strong> Volume changes per hour (V/h ÷ Room volume)</li>
                <li className="pl-1"><strong>Air permeability (q50):</strong> m³/h per m² envelope at 50Pa pressure</li>
                <li className="pl-1"><strong>n50:</strong> Air changes at 50Pa (alternative airtightness metric)</li>
                <li className="pl-1"><strong>Infiltration:</strong> Unintentional leakage through fabric</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ventilation Rate Calculation</p>
              <p className="font-mono text-center text-sm mb-2">V̇ = n × Volume</p>
              <p className="text-xs text-white/70 text-center">Where V̇ = flow rate (m³/h), n = air changes per hour, Volume = room volume (m³)</p>
              <p className="text-xs text-white/70 text-center mt-2">To convert: m³/h ÷ 3.6 = l/s</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Air Permeability Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Maximum q50</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Part L 2021 (dwellings)</td>
                      <td className="border border-white/10 px-3 py-2">8 m³/(h.m²)</td>
                      <td className="border border-white/10 px-3 py-2">Design value for SAP</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Part L 2021 (other)</td>
                      <td className="border border-white/10 px-3 py-2">8 m³/(h.m²)</td>
                      <td className="border border-white/10 px-3 py-2">With MVHR: 5 recommended</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Best practice</td>
                      <td className="border border-white/10 px-3 py-2">3-5 m³/(h.m²)</td>
                      <td className="border border-white/10 px-3 py-2">Good energy performance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Passivhaus</td>
                      <td className="border border-white/10 px-3 py-2">≤0.6 ach @ 50Pa</td>
                      <td className="border border-white/10 px-3 py-2">Different metric (n50)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Rule of thumb:</strong> Divide q50 by 20 to estimate normal infiltration rate. A building testing at 5 m³/h/m² would have ~0.25 ach infiltration under typical conditions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Stack Effect */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Stack Effect - Buoyancy-Driven Ventilation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Stack effect occurs because warm air is less dense than cool air. In heated buildings,
              warm air rises and exits at high level, creating negative pressure that draws in cooler
              air at low level. This natural buoyancy can provide significant ventilation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Stack Pressure Formula</p>
              <p className="font-mono text-center text-sm mb-2">ΔP = ρ × g × h × (T<sub>i</sub> - T<sub>o</sub>) / T<sub>o</sub></p>
              <p className="text-xs text-white/70 text-center">Simplified: ΔP ≈ 0.04 × h × ΔT (Pa) for typical conditions</p>
              <p className="text-xs text-white/70 text-center mt-2">Where h = height between openings (m), ΔT = temperature difference (K)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Stack effect principles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Neutral pressure level:</strong> Mid-height where inside = outside pressure</li>
                <li className="pl-1"><strong>Below NPL:</strong> Air enters (positive stack pressure outside)</li>
                <li className="pl-1"><strong>Above NPL:</strong> Air exits (negative stack pressure outside)</li>
                <li className="pl-1"><strong>Height effect:</strong> Taller buildings have stronger stack effect</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Stack Pressures</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Height (m)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">ΔT = 10K</th>
                      <th className="border border-white/10 px-3 py-2 text-left">ΔT = 20K</th>
                      <th className="border border-white/10 px-3 py-2 text-left">ΔT = 30K</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3m (single storey)</td>
                      <td className="border border-white/10 px-3 py-2">1.2 Pa</td>
                      <td className="border border-white/10 px-3 py-2">2.4 Pa</td>
                      <td className="border border-white/10 px-3 py-2">3.6 Pa</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10m (3 storey)</td>
                      <td className="border border-white/10 px-3 py-2">4 Pa</td>
                      <td className="border border-white/10 px-3 py-2">8 Pa</td>
                      <td className="border border-white/10 px-3 py-2">12 Pa</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">30m (atrium)</td>
                      <td className="border border-white/10 px-3 py-2">12 Pa</td>
                      <td className="border border-white/10 px-3 py-2">24 Pa</td>
                      <td className="border border-white/10 px-3 py-2">36 Pa</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design application:</strong> Stack effect is strongest in winter (high ΔT) but may be needed most in summer (low ΔT). Atria and chimneys increase effective height to enhance stack ventilation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 3: Wind Pressure */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Wind Pressure - Cross-Ventilation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Wind creates pressure differences around buildings that can drive ventilation. The windward
              face experiences positive pressure (pushing air in), while leeward and side faces experience
              suction (pulling air out). This pressure difference enables cross-ventilation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wind Pressure Formula</p>
              <p className="font-mono text-center text-sm mb-2">P<sub>wind</sub> = ½ × ρ × C<sub>p</sub> × v²</p>
              <p className="text-xs text-white/70 text-center">Where ρ = air density (1.2 kg/m³), Cp = pressure coefficient, v = wind speed (m/s)</p>
              <p className="text-xs text-white/70 text-center mt-2">Simplified: P ≈ 0.6 × Cp × v² (Pa)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pressure coefficients (Cp):</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Face</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Cp</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Windward (upwind)</td>
                      <td className="border border-white/10 px-3 py-2">+0.5 to +0.8</td>
                      <td className="border border-white/10 px-3 py-2">Positive pressure (in)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Leeward (downwind)</td>
                      <td className="border border-white/10 px-3 py-2">-0.3 to -0.5</td>
                      <td className="border border-white/10 px-3 py-2">Suction (out)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Side walls</td>
                      <td className="border border-white/10 px-3 py-2">-0.4 to -0.7</td>
                      <td className="border border-white/10 px-3 py-2">Suction (out)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flat roof</td>
                      <td className="border border-white/10 px-3 py-2">-0.5 to -0.8</td>
                      <td className="border border-white/10 px-3 py-2">Suction (up and out)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cross-Ventilation Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Openings on opposite facades</li>
                  <li className="pl-1">Maximum depth ~12-15m or 5× height</li>
                  <li className="pl-1">Clear air path across space</li>
                  <li className="pl-1">Perpendicular to prevailing wind</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Single-Sided Ventilation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Relies on wind turbulence</li>
                  <li className="pl-1">Maximum depth ~2× ceiling height</li>
                  <li className="pl-1">~6m for 3m ceiling</li>
                  <li className="pl-1">Less predictable/reliable</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Combined effect:</strong> Total ventilation pressure = stack + wind, but they don't simply add. On windward side with high-level exhaust, they can reinforce; on leeward inlet, they may oppose.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 4: Ventilation Heat Loss */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Ventilation Heat Loss Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ventilation and infiltration are significant heat loss pathways, often accounting for
              30-50% of total building heat loss. As buildings become better insulated, the relative
              importance of ventilation loss increases.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ventilation Heat Loss Formulas</p>
              <p className="font-mono text-center text-sm mb-2">Q<sub>v</sub> = 0.33 × n × V × ΔT (Watts)</p>
              <p className="text-xs text-white/70 text-center">Where n = ach, V = volume (m³), ΔT = temp diff (K)</p>
              <p className="font-mono text-center text-sm mt-3 mb-2">Q<sub>v</sub> = 1.2 × q × ΔT (Watts)</p>
              <p className="text-xs text-white/70 text-center">Where q = flow rate (l/s), ΔT = temp diff (K)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Ventilation heat loss coefficient:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>H<sub>v</sub> = 0.33 × n × V</strong> (W/K) - heat loss per degree difference</li>
                <li className="pl-1">Compare with fabric: H<sub>f</sub> = ΣUA (W/K)</li>
                <li className="pl-1">Total: H<sub>total</sub> = H<sub>f</sub> + H<sub>v</sub></li>
                <li className="pl-1">Annual loss = H × degree-days × 24 (Wh)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Ventilation Rates (Part F)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Space Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rate</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office</td>
                      <td className="border border-white/10 px-3 py-2">10 l/s per person</td>
                      <td className="border border-white/10 px-3 py-2">Occupancy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Classroom</td>
                      <td className="border border-white/10 px-3 py-2">8 l/s per person</td>
                      <td className="border border-white/10 px-3 py-2">Occupancy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Kitchen (commercial)</td>
                      <td className="border border-white/10 px-3 py-2">25-40 l/s per m²</td>
                      <td className="border border-white/10 px-3 py-2">Floor area</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">WC</td>
                      <td className="border border-white/10 px-3 py-2">6 l/s per WC pan</td>
                      <td className="border border-white/10 px-3 py-2">Fixture count</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dwelling (whole house)</td>
                      <td className="border border-white/10 px-3 py-2">0.3-0.5 ach</td>
                      <td className="border border-white/10 px-3 py-2">Air change rate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Heat recovery:</strong> MVHR can recover 70-90% of ventilation heat loss while maintaining fresh air supply. Essential for very airtight buildings where infiltration alone cannot provide adequate ventilation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Air Change Rate</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An office (8m × 10m × 3m) requires 400 l/s ventilation. What is the air change rate?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Volume = 8 × 10 × 3 = 240 m³</p>
                <p>Flow rate = 400 l/s = 400 × 3.6 = 1440 m³/h</p>
                <p className="mt-2">ach = 1440 / 240 = <strong>6 air changes per hour</strong></p>
                <p className="mt-2 text-white/60">This is high for standard conditioning; check if cooling load driven</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Ventilation Heat Loss</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the ventilation heat loss for a 500m³ room with 1.5 ach,
                internal temperature 21°C, external -2°C.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>ΔT = 21 - (-2) = 23K</p>
                <p>Qv = 0.33 × n × V × ΔT</p>
                <p>Qv = 0.33 × 1.5 × 500 × 23</p>
                <p>Qv = <strong>5693W ≈ 5.7kW</strong></p>
                <p className="mt-2 text-white/60">This must be added to fabric losses for total heating load</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Stack Effect Pressure</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An atrium has inlet at ground and outlet 20m above. Internal temp 22°C,
                external 10°C. Calculate the stack pressure.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using simplified formula: ΔP ≈ 0.04 × h × ΔT</p>
                <p>ΔP = 0.04 × 20 × (22-10)</p>
                <p>ΔP = 0.04 × 20 × 12 = <strong>9.6 Pa</strong></p>
                <p className="mt-2 text-white/60">Sufficient to drive significant natural ventilation flow</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Wind Pressure</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Wind speed is 5 m/s. Calculate pressure on windward face (Cp = +0.6)
                and leeward face (Cp = -0.4). What is the cross-ventilation driving pressure?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>P = 0.6 × Cp × v²</p>
                <p>Windward: P = 0.6 × (+0.6) × 5² = +9 Pa</p>
                <p>Leeward: P = 0.6 × (-0.4) × 5² = -6 Pa</p>
                <p className="mt-2">Driving pressure = 9 - (-6) = <strong>15 Pa</strong></p>
                <p className="mt-2 text-white/60">This drives airflow from windward to leeward openings</p>
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
                <li className="pl-1"><strong>ach = V̇ / Volume:</strong> Air changes from flow rate</li>
                <li className="pl-1"><strong>Qv = 0.33 × n × V × ΔT:</strong> Ventilation heat loss (W)</li>
                <li className="pl-1"><strong>ΔP = 0.04 × h × ΔT:</strong> Stack pressure (Pa)</li>
                <li className="pl-1"><strong>P = 0.6 × Cp × v²:</strong> Wind pressure (Pa)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Part L max permeability: <strong>8 m³/h/m² @ 50Pa</strong></li>
                <li className="pl-1">Office ventilation: <strong>10 l/s per person</strong></li>
                <li className="pl-1">Cross-ventilation depth: <strong>12-15m max</strong></li>
                <li className="pl-1">Single-sided depth: <strong>2× ceiling height</strong></li>
                <li className="pl-1">q50 to infiltration: <strong>divide by 20</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Forgetting infiltration:</strong> Add to designed ventilation</li>
                <li className="pl-1"><strong>Ignoring wind direction:</strong> Inlets should face prevailing wind</li>
                <li className="pl-1"><strong>Summer stack:</strong> Low ΔT = weak stack effect</li>
                <li className="pl-1"><strong>Oversizing openings:</strong> Too large = poor control</li>
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
                <p className="font-medium text-white mb-1">Ventilation Rates</p>
                <ul className="space-y-0.5">
                  <li>Office: 10 l/s per person</li>
                  <li>Classroom: 8 l/s per person</li>
                  <li>Dwelling: 0.3-0.5 ach whole house</li>
                  <li>Convert: m³/h ÷ 3.6 = l/s</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Natural Ventilation</p>
                <ul className="space-y-0.5">
                  <li>Stack: ΔP = 0.04 × h × ΔT</li>
                  <li>Wind: P = 0.6 × Cp × v²</li>
                  <li>Cross-vent depth: 12-15m</li>
                  <li>Single-sided: 2× height</li>
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
            <Link to="../h-n-c-module2-section5-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section5-5">
              Next: Thermal Comfort
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section5_4;
