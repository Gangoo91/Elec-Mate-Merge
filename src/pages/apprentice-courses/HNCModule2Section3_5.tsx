import { ArrowLeft, Snowflake, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cooling and Heating Coils - HNC Module 2 Section 3.5";
const DESCRIPTION = "Master cooling coil selection, apparatus dew point (ADP), contact factor, sensible and latent loads and heating coil sizing for HVAC systems.";

const quickCheckQuestions = [
  {
    id: "adp-definition",
    question: "What is the Apparatus Dew Point (ADP)?",
    options: [
      "The air dew point before the coil",
      "The effective surface temperature of an ideal cooling coil",
      "The chilled water supply temperature",
      "The air temperature leaving the coil"
    ],
    correctIndex: 1,
    explanation: "The ADP is the theoretical saturation temperature that represents the effective coil surface temperature. If a coil were 100% effective, all air would leave at the ADP (saturated)."
  },
  {
    id: "contact-factor",
    question: "A cooling coil with a contact factor of 0.85 means:",
    options: [
      "85% of the air bypasses the coil",
      "85% of the air contacts the coil surface effectively",
      "The coil is 85°C",
      "85% of the load is sensible"
    ],
    correctIndex: 1,
    explanation: "Contact factor (CF) represents the proportion of air that is fully treated by contacting the coil surface. CF = 0.85 means 85% contacts the coil, 15% bypasses (bypass factor = 0.15)."
  },
  {
    id: "chw-temps",
    question: "Typical chilled water flow and return temperatures for comfort cooling are:",
    options: ["4°C/8°C", "6°C/12°C", "10°C/16°C", "12°C/18°C"],
    correctIndex: 1,
    explanation: "Standard chilled water temperatures for comfort cooling are 6°C flow / 12°C return, giving a 6K temperature difference. This allows dehumidification while maintaining reasonable efficiency."
  },
  {
    id: "rows-depth",
    question: "Why do cooling coils typically have 4-8 rows while heating coils have 1-2 rows?",
    options: [
      "Heating coils use larger tubes",
      "Cooling involves larger temperature differences and dehumidification",
      "Heating coils are more expensive",
      "Air flows faster through heating coils"
    ],
    correctIndex: 1,
    explanation: "Cooling coils need more surface area because: (1) cooling temperature differences are smaller, (2) latent heat removal requires surface below dew point, (3) heat transfer from air to water is less efficient than water to air."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The contact factor (CF) and bypass factor (BF) are related by:",
    options: [
      "CF + BF = 0",
      "CF + BF = 1",
      "CF × BF = 1",
      "CF = 2 × BF"
    ],
    correctAnswer: 1,
    explanation: "CF + BF = 1. If contact factor is 0.85, bypass factor is 0.15. The total air equals contacted air plus bypassed air."
  },
  {
    id: 2,
    question: "On a psychrometric chart, the coil process line extends from:",
    options: [
      "Room condition to supply condition",
      "Entering air condition toward the ADP",
      "Outside air to return air",
      "Dew point to dry bulb"
    ],
    correctAnswer: 1,
    explanation: "The coil process line is drawn from the entering air condition toward the ADP. The off-coil condition lies on this line, at a position determined by the contact factor."
  },
  {
    id: 3,
    question: "If entering air is 26°C and ADP is 10°C with CF = 0.80, the off-coil temperature is:",
    options: ["12.0°C", "13.2°C", "14.8°C", "16.0°C"],
    correctAnswer: 1,
    explanation: "T_off = ADP + BF × (T_in - ADP) = 10 + 0.20 × (26 - 10) = 10 + 3.2 = 13.2°C. Or: T_off = T_in - CF × (T_in - ADP) = 26 - 0.80 × 16 = 13.2°C."
  },
  {
    id: 4,
    question: "The chilled water temperature rise across a cooling coil is typically:",
    options: ["2-3K", "4-5K", "5-6K", "8-10K"],
    correctAnswer: 2,
    explanation: "Standard chilled water systems operate with 5-6K rise (6/12°C). This balances heat transfer effectiveness with reasonable water flow rates and pumping energy."
  },
  {
    id: 5,
    question: "What determines whether a cooling coil operates 'wet' or 'dry'?",
    options: [
      "The chilled water flow rate",
      "Whether the coil surface is below the entering air dew point",
      "The number of coil rows",
      "The air velocity across the coil"
    ],
    correctAnswer: 1,
    explanation: "A 'wet' coil has surface temperatures below the air dew point, causing condensation (dehumidification). A 'dry' coil operates above dew point, providing sensible cooling only."
  },
  {
    id: 6,
    question: "Increasing the number of coil rows generally:",
    options: [
      "Decreases contact factor",
      "Increases contact factor",
      "Has no effect on contact factor",
      "Increases bypass factor"
    ],
    correctAnswer: 1,
    explanation: "More rows increase the surface area and air contact time, increasing the contact factor (more air is effectively treated) and reducing bypass factor."
  },
  {
    id: 7,
    question: "The 'grand sensible heat factor' (GSHF) for a coil is:",
    options: [
      "The room SHR",
      "The ratio of sensible to total coil load",
      "The contact factor",
      "The bypass factor"
    ],
    correctAnswer: 1,
    explanation: "GSHF = sensible coil load / total coil load. It represents the slope of the coil condition line on the psychrometric chart and must be compatible with the room SHR."
  },
  {
    id: 8,
    question: "For a heating coil, the air-side temperature rise is calculated using:",
    options: [
      "ΔT = Q / (ṁ × hfg)",
      "ΔT = Q / (ṁ × cp)",
      "ΔT = Q × cp × ṁ",
      "ΔT = ṁ / (Q × cp)"
    ],
    correctAnswer: 1,
    explanation: "ΔT = Q / (ṁ × cp) where Q is heat transfer rate (kW), ṁ is mass flow (kg/s), and cp is specific heat (1.005 kJ/kg·K). Rearranged from Q = ṁ × cp × ΔT."
  },
  {
    id: 9,
    question: "LTHW heating coils typically operate with flow/return temperatures of:",
    options: ["40/30°C", "60/50°C", "82/71°C", "120/100°C"],
    correctAnswer: 2,
    explanation: "Traditional LTHW (Low Temperature Hot Water) systems use 82/71°C (180/160°F). Modern systems may use lower temperatures (70/50°C) for heat pump compatibility."
  },
  {
    id: 10,
    question: "Face velocity across a cooling coil is typically limited to:",
    options: ["1.0-1.5 m/s", "2.0-3.0 m/s", "4.0-5.0 m/s", "6.0-8.0 m/s"],
    correctAnswer: 1,
    explanation: "Cooling coil face velocities are typically 2.0-3.0 m/s. Higher velocities risk moisture carryover (water droplets blown off the coil); lower velocities require larger coils."
  },
  {
    id: 11,
    question: "The log mean temperature difference (LMTD) for a coil is used to:",
    options: [
      "Calculate air humidity",
      "Determine the effective temperature driving force for heat transfer",
      "Measure air velocity",
      "Calculate pressure drop"
    ],
    correctAnswer: 1,
    explanation: "LMTD accounts for the varying temperature difference along the coil length. It provides the effective ΔT for heat transfer calculations: Q = U × A × LMTD."
  },
  {
    id: 12,
    question: "A 'direct expansion' (DX) coil differs from a chilled water coil because:",
    options: [
      "It uses hot water",
      "Refrigerant evaporates inside the coil tubes",
      "It cannot dehumidify",
      "It has fewer rows"
    ],
    correctAnswer: 1,
    explanation: "In DX coils, liquid refrigerant evaporates inside the tubes, directly absorbing heat from the air. This eliminates the chilled water system but requires the coil to be part of a refrigeration circuit."
  }
];

const faqs = [
  {
    question: "How do I select the right ADP for a project?",
    answer: "ADP is selected to achieve the required off-coil moisture content. For comfort cooling, ADP is typically 8-12°C. Lower ADP gives more dehumidification but requires colder chilled water. The ADP must be achievable with available chilled water temperatures (ADP is typically 2-3K above CHW flow temperature)."
  },
  {
    question: "Why does contact factor matter for coil selection?",
    answer: "Contact factor determines how closely the off-coil air approaches the ADP. Higher CF means better dehumidification and lower off-coil temperature, but requires more coil rows or slower air velocity. Typical CFs range from 0.75 to 0.95 depending on coil depth and design."
  },
  {
    question: "What causes moisture carryover from cooling coils?",
    answer: "Moisture carryover occurs when air velocity is too high (>3 m/s) or condensate drainage is poor. Water droplets are blown off the coil into the ductwork. Eliminate droppers help, but the main control is appropriate face velocity and proper coil inclination for drainage."
  },
  {
    question: "How do chilled beam coils differ from AHU cooling coils?",
    answer: "Chilled beams use higher chilled water temperatures (14-16°C vs 6°C) to avoid condensation on the beam surface. They provide sensible cooling only. This requires separate dehumidification (typically in a dedicated outdoor air system) if humidity control is needed."
  },
  {
    question: "Why are heating coils simpler than cooling coils?",
    answer: "Heating coils only perform sensible heating (no moisture change), use higher temperature differences (easier heat transfer), and have no condensate to manage. One or two rows typically suffice. The main concerns are frost protection and stratification at low flows."
  },
  {
    question: "What is the purpose of a preheat coil?",
    answer: "Preheat coils protect downstream equipment (filters, cooling coils, humidifiers) from freezing in cold weather. They raise outside air temperature to a safe level (typically 5-10°C). Preheat coils are often controlled from off-coil temperature with frost protection."
  }
];

const HNCModule2Section3_5 = () => {
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
            <Snowflake className="h-4 w-4" />
            <span>Module 2.3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cooling and Heating Coils
          </h1>
          <p className="text-white/80">
            Understanding coil selection, apparatus dew point and contact factor for HVAC design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-400/5 border-l-2 border-cyan-400/50">
            <p className="text-cyan-400 text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>ADP:</strong> Effective coil surface temperature</li>
              <li className="pl-1"><strong>Contact factor:</strong> CF = 0.75-0.95 typical</li>
              <li className="pl-1"><strong>Bypass factor:</strong> BF = 1 - CF</li>
              <li className="pl-1"><strong>CHW temps:</strong> 6/12°C standard</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-400/5 border-l-2 border-cyan-400/50">
            <p className="text-cyan-400/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Cooling coils:</strong> 4-8 rows, wet operation</li>
              <li className="pl-1"><strong>Heating coils:</strong> 1-2 rows, LTHW 82/71°C</li>
              <li className="pl-1"><strong>Face velocity:</strong> 2.0-3.0 m/s cooling</li>
              <li className="pl-1"><strong>DX coils:</strong> Direct expansion alternative</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define and calculate apparatus dew point (ADP)",
              "Apply contact factor and bypass factor concepts",
              "Plot coil processes on the psychrometric chart",
              "Size cooling coils for sensible and latent loads",
              "Understand heating coil selection criteria",
              "Compare chilled water and DX coil systems"
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

        {/* Section 1: Apparatus Dew Point */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">01</span>
            Apparatus Dew Point (ADP)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Apparatus Dew Point represents the effective surface temperature of a cooling coil.
              It is the condition air would reach if 100% of it contacted the coil surface.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">ADP Concept</p>
              <div className="text-sm text-white/90 space-y-2">
                <p>• ADP lies on the saturation curve of the psychrometric chart</p>
                <p>• It is the point where the coil process line intersects saturation</p>
                <p>• Air leaving an ideal (100% contact) coil would be at ADP</p>
                <p>• Real coils have contact factors &lt; 1, so off-coil air is above ADP</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Typical ADP Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">ADP Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">CHW Flow Temp</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Comfort cooling</td>
                      <td className="border border-white/10 px-3 py-2">8-12°C</td>
                      <td className="border border-white/10 px-3 py-2">6°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High latent loads</td>
                      <td className="border border-white/10 px-3 py-2">6-8°C</td>
                      <td className="border border-white/10 px-3 py-2">4-5°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Process cooling</td>
                      <td className="border border-white/10 px-3 py-2">4-6°C</td>
                      <td className="border border-white/10 px-3 py-2">2-4°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sensible only (chilled beam)</td>
                      <td className="border border-white/10 px-3 py-2">14-16°C</td>
                      <td className="border border-white/10 px-3 py-2">14°C</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-cyan-400/70">
              <strong>Rule of thumb:</strong> ADP is typically 2-3K above the chilled water flow temperature.
              Lower ADP provides more dehumidification but requires colder water and more energy.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Contact Factor */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">02</span>
            Contact Factor and Bypass Factor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Contact factor (CF) represents the effectiveness of air contact with the coil surface.
              Bypass factor (BF) represents air that passes through without effective treatment.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Contact Factor Equations</p>
              <div className="font-mono text-center text-sm space-y-2 mb-3">
                <p>CF + BF = 1</p>
                <p>CF = (T<sub>in</sub> - T<sub>off</sub>) / (T<sub>in</sub> - ADP)</p>
                <p>T<sub>off</sub> = ADP + BF × (T<sub>in</sub> - ADP)</p>
              </div>
              <p className="text-xs text-white/70 text-center">Same equations apply for moisture content (g)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Factors Affecting Contact Factor</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect on CF</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">More rows</td>
                      <td className="border border-white/10 px-3 py-2">Increases CF</td>
                      <td className="border border-white/10 px-3 py-2">4-8 rows typical for cooling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lower face velocity</td>
                      <td className="border border-white/10 px-3 py-2">Increases CF</td>
                      <td className="border border-white/10 px-3 py-2">More contact time</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Closer fin spacing</td>
                      <td className="border border-white/10 px-3 py-2">Increases CF</td>
                      <td className="border border-white/10 px-3 py-2">But increases pressure drop</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Higher water velocity</td>
                      <td className="border border-white/10 px-3 py-2">Increases CF</td>
                      <td className="border border-white/10 px-3 py-2">Better water-side transfer</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-cyan-400/80 mb-2">Typical Contact Factors</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>4-row coil:</strong> CF ≈ 0.75-0.85</li>
                  <li className="pl-1"><strong>6-row coil:</strong> CF ≈ 0.85-0.92</li>
                  <li className="pl-1"><strong>8-row coil:</strong> CF ≈ 0.92-0.97</li>
                  <li className="pl-1"><strong>Deep coil (10+):</strong> CF ≈ 0.95-0.98</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-cyan-400/80 mb-2">Design Implications</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Higher CF = lower off-coil temperature</li>
                  <li className="pl-1">Higher CF = more dehumidification</li>
                  <li className="pl-1">Higher CF = larger, more expensive coil</li>
                  <li className="pl-1">Higher CF = greater pressure drop</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Cooling Coil Selection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">03</span>
            Cooling Coil Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cooling coil selection involves matching the coil characteristics to the required
              sensible and latent loads while achieving the design off-coil condition.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Cooling Coil Parameters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Selection Criteria</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Face velocity</td>
                      <td className="border border-white/10 px-3 py-2">2.0-3.0 m/s</td>
                      <td className="border border-white/10 px-3 py-2">Max 3 m/s to prevent carryover</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Number of rows</td>
                      <td className="border border-white/10 px-3 py-2">4-8 rows</td>
                      <td className="border border-white/10 px-3 py-2">Based on required CF</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fin spacing</td>
                      <td className="border border-white/10 px-3 py-2">8-14 fins/inch</td>
                      <td className="border border-white/10 px-3 py-2">Closer for more capacity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Water velocity</td>
                      <td className="border border-white/10 px-3 py-2">1.0-2.5 m/s</td>
                      <td className="border border-white/10 px-3 py-2">Turbulent flow preferred</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CHW ΔT</td>
                      <td className="border border-white/10 px-3 py-2">5-6K</td>
                      <td className="border border-white/10 px-3 py-2">Affects water flow rate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Coil Load Calculation</p>
              <div className="font-mono text-sm space-y-2">
                <p>Total load: Q<sub>t</sub> = ṁ × (h<sub>in</sub> - h<sub>off</sub>)</p>
                <p>Sensible load: Q<sub>s</sub> = ṁ × c<sub>p</sub> × (T<sub>in</sub> - T<sub>off</sub>)</p>
                <p>Latent load: Q<sub>L</sub> = ṁ × (g<sub>in</sub> - g<sub>off</sub>) × h<sub>fg</sub></p>
                <p className="text-xs text-white/70 mt-2">Check: Qt = Qs + QL</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Heating Coils */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">04</span>
            Heating Coil Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Heating coils are simpler than cooling coils as they only perform sensible heating.
              Selection focuses on capacity, temperature rise, and frost protection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Heating Coil Types and Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Medium</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Temps</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LTHW</td>
                      <td className="border border-white/10 px-3 py-2">Hot water</td>
                      <td className="border border-white/10 px-3 py-2">82/71°C or 70/50°C</td>
                      <td className="border border-white/10 px-3 py-2">Main heating, preheat</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MTHW</td>
                      <td className="border border-white/10 px-3 py-2">Hot water</td>
                      <td className="border border-white/10 px-3 py-2">100-120°C</td>
                      <td className="border border-white/10 px-3 py-2">High capacity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Steam</td>
                      <td className="border border-white/10 px-3 py-2">Steam</td>
                      <td className="border border-white/10 px-3 py-2">100-180°C</td>
                      <td className="border border-white/10 px-3 py-2">Fast response, high temp</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electric</td>
                      <td className="border border-white/10 px-3 py-2">Electricity</td>
                      <td className="border border-white/10 px-3 py-2">N/A</td>
                      <td className="border border-white/10 px-3 py-2">Reheat, terminal units</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-cyan-400/80 mb-2">Heating Coil Sizing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">1-2 rows typically sufficient</li>
                  <li className="pl-1">Face velocity 3-5 m/s acceptable</li>
                  <li className="pl-1">Water velocity 0.5-2.0 m/s</li>
                  <li className="pl-1">ΔT water typically 10-20K</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-cyan-400/80 mb-2">Frost Protection</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Preheat coil for outside air</li>
                  <li className="pl-1">Frost stat on off-coil air</li>
                  <li className="pl-1">Minimum water flow at all times</li>
                  <li className="pl-1">Glycol if freezing possible</li>
                </ul>
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
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 1: Off-Coil Temperature from Contact Factor</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Air enters a cooling coil at 28°C. The ADP is 10°C and the coil contact factor is 0.82. Calculate the off-coil temperature.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given: T_in = 28°C, ADP = 10°C, CF = 0.82</p>
                <p>BF = 1 - CF = 1 - 0.82 = 0.18</p>
                <p className="mt-2">Method 1: T_off = ADP + BF × (T_in - ADP)</p>
                <p>T_off = 10 + 0.18 × (28 - 10)</p>
                <p>T_off = 10 + 0.18 × 18 = 10 + 3.24 = <strong>13.2°C</strong></p>
                <p className="mt-2">Method 2: T_off = T_in - CF × (T_in - ADP)</p>
                <p>T_off = 28 - 0.82 × 18 = 28 - 14.76 = <strong>13.2°C</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 2: Determining ADP from Conditions</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Air at 26°C, 11 g/kg enters a cooling coil and leaves at 14°C, 9 g/kg. Find the ADP and contact factor.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Draw line from entry (26°C, 11 g/kg) through exit (14°C, 9 g/kg)</p>
                <p>Step 2: Extend to saturation curve to find ADP</p>
                <p>From psychrometric chart: <strong>ADP ≈ 9°C</strong></p>
                <p className="mt-2">Step 3: Calculate contact factor</p>
                <p>CF = (T_in - T_off) / (T_in - ADP)</p>
                <p>CF = (26 - 14) / (26 - 9) = 12/17 = <strong>0.71</strong></p>
                <p className="mt-2 text-white/60">Verify with moisture: CF = (11-9)/(11-8.5) = 2/2.5 = 0.8</p>
                <p className="text-white/60">(Slight difference due to chart reading)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 3: Cooling Coil Load Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A coil handles 5 kg/s. Entry: 28°C, 12 g/kg, h = 58 kJ/kg. Exit: 14°C, 9 g/kg, h = 37 kJ/kg. Calculate loads.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total load: Qt = ṁ × Δh</p>
                <p>Qt = 5 × (58 - 37) = 5 × 21 = <strong>105 kW</strong></p>
                <p className="mt-2">Sensible load: Qs = ṁ × cp × ΔT</p>
                <p>Qs = 5 × 1.005 × (28 - 14) = 5 × 1.005 × 14 = <strong>70.4 kW</strong></p>
                <p className="mt-2">Latent load: QL = ṁ × Δg × hfg</p>
                <p>QL = 5 × 0.003 × 2450 = <strong>36.8 kW</strong></p>
                <p className="mt-2">Check: Qs + QL = 70.4 + 36.8 = 107.2 kW ≈ 105 kW ✓</p>
                <p className="mt-2">SHR = 70.4/105 = <strong>0.67</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 4: Chilled Water Flow Rate</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 120 kW cooling coil uses chilled water at 6/12°C. Calculate the required water flow rate.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Q = ṁw × cpw × ΔTw</p>
                <p>120 = ṁw × 4.19 × 6</p>
                <p>ṁw = 120 / (4.19 × 6) = 120 / 25.14</p>
                <p>ṁw = <strong>4.77 kg/s</strong></p>
                <p className="mt-2">In l/s (water density ≈ 1 kg/l):</p>
                <p>V̇w = <strong>4.77 l/s</strong></p>
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
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Key Equations</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>CF + BF = 1</strong> — Contact and bypass factors</li>
                <li className="pl-1"><strong>T_off = ADP + BF(T_in - ADP)</strong> — Off-coil temperature</li>
                <li className="pl-1"><strong>Q = ṁ × Δh</strong> — Total coil load</li>
                <li className="pl-1"><strong>Q = ṁw × cpw × ΔTw</strong> — Water-side load</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Design Guidelines</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Cooling coil face velocity: <strong>2.0-3.0 m/s</strong></li>
                <li className="pl-1">Chilled water: <strong>6/12°C</strong> standard</li>
                <li className="pl-1">ADP typically 2-3K above CHW flow</li>
                <li className="pl-1">LTHW: <strong>82/71°C</strong> or <strong>70/50°C</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Assuming CF = 1</strong> — Real coils have BF &gt; 0</li>
                <li className="pl-1"><strong>Ignoring water-side capacity</strong> — Must balance air and water</li>
                <li className="pl-1"><strong>Excess face velocity</strong> — Causes moisture carryover</li>
                <li className="pl-1"><strong>Frost protection</strong> — Essential for preheat coils</li>
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
                <p className="font-medium text-white mb-1">Cooling Coils</p>
                <ul className="space-y-0.5">
                  <li>CF = 0.75-0.95 typical</li>
                  <li>CHW: 6/12°C (5-6K rise)</li>
                  <li>Face velocity: 2-3 m/s</li>
                  <li>Rows: 4-8 for wet coils</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Heating Coils</p>
                <ul className="space-y-0.5">
                  <li>LTHW: 82/71°C or 70/50°C</li>
                  <li>Rows: 1-2 typical</li>
                  <li>Face velocity: 3-5 m/s OK</li>
                  <li>Frost protection essential</li>
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
            <Link to="../h-n-c-module2-section3-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: AC Processes
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section3-6">
              Next: HVAC System Applications
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section3_5;
