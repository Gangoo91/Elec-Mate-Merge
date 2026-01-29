import { ArrowLeft, Wind, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Air Composition and Properties - HNC Module 2 Section 3.1";
const DESCRIPTION = "Master the composition of dry air and water vapour mixtures, ideal gas laws, air density calculations and specific heat capacity for HVAC system design.";

const quickCheckQuestions = [
  {
    id: "air-nitrogen",
    question: "What is the approximate percentage of nitrogen in dry air by volume?",
    options: ["21%", "58%", "78%", "99%"],
    correctIndex: 2,
    explanation: "Dry air is approximately 78% nitrogen by volume. Oxygen makes up about 21%, with the remaining 1% being argon, carbon dioxide and trace gases."
  },
  {
    id: "ideal-gas",
    question: "Which gas constant (R) is used for dry air in ideal gas calculations?",
    options: ["8.314 J/mol·K", "287 J/kg·K", "461 J/kg·K", "1005 J/kg·K"],
    correctIndex: 1,
    explanation: "The specific gas constant for dry air is 287 J/kg·K. This is derived from the universal gas constant (8.314 J/mol·K) divided by the molar mass of air (0.02897 kg/mol)."
  },
  {
    id: "air-density",
    question: "What is the approximate density of dry air at 20°C and atmospheric pressure?",
    options: ["0.8 kg/m³", "1.0 kg/m³", "1.2 kg/m³", "1.5 kg/m³"],
    correctIndex: 2,
    explanation: "Dry air at 20°C (293K) and 101.325 kPa has a density of approximately 1.2 kg/m³. Using ρ = P/(RT) = 101325/(287 × 293) = 1.205 kg/m³."
  },
  {
    id: "specific-heat",
    question: "What is the specific heat capacity of dry air at constant pressure (cp)?",
    options: ["287 J/kg·K", "718 J/kg·K", "1005 J/kg·K", "1860 J/kg·K"],
    correctIndex: 2,
    explanation: "The specific heat capacity of dry air at constant pressure is approximately 1005 J/kg·K (or 1.005 kJ/kg·K). This value is essential for sensible heat calculations in HVAC."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which component makes up approximately 21% of dry air by volume?",
    options: [
      "Nitrogen",
      "Oxygen",
      "Argon",
      "Carbon dioxide"
    ],
    correctAnswer: 1,
    explanation: "Oxygen makes up approximately 21% of dry air by volume. This is essential for combustion and respiration processes considered in building ventilation design."
  },
  {
    id: 2,
    question: "The ideal gas law equation is PV = mRT. What does 'R' represent?",
    options: [
      "Universal gas constant",
      "Specific gas constant for the gas",
      "Resistance to flow",
      "Ratio of specific heats"
    ],
    correctAnswer: 1,
    explanation: "In the form PV = mRT, R is the specific gas constant for the particular gas. For dry air, R = 287 J/kg·K."
  },
  {
    id: 3,
    question: "Calculate the density of air at 25°C and 101.325 kPa using ρ = P/(RT).",
    options: ["1.084 kg/m³", "1.184 kg/m³", "1.284 kg/m³", "1.384 kg/m³"],
    correctAnswer: 1,
    explanation: "ρ = P/(RT) = 101325/(287 × 298) = 101325/85526 = 1.184 kg/m³. Note: Temperature must be in Kelvin (25 + 273 = 298K)."
  },
  {
    id: 4,
    question: "Why does moist air have a lower density than dry air at the same temperature and pressure?",
    options: [
      "Water vapour is heavier than air",
      "Water vapour molecules displace heavier nitrogen and oxygen molecules",
      "Moisture increases air pressure",
      "Water vapour has a higher gas constant"
    ],
    correctAnswer: 1,
    explanation: "Water vapour (M = 18 g/mol) is lighter than nitrogen (M = 28 g/mol) and oxygen (M = 32 g/mol). When water vapour displaces these heavier molecules, the mixture becomes less dense."
  },
  {
    id: 5,
    question: "What is the specific gas constant for water vapour?",
    options: ["287 J/kg·K", "378 J/kg·K", "461 J/kg·K", "718 J/kg·K"],
    correctAnswer: 2,
    explanation: "The specific gas constant for water vapour is 461 J/kg·K. This higher value (compared to dry air's 287 J/kg·K) reflects water's lower molecular mass."
  },
  {
    id: 6,
    question: "Atmospheric pressure at sea level is approximately:",
    options: ["100 kPa", "101.325 kPa", "1013.25 kPa", "10.1325 kPa"],
    correctAnswer: 1,
    explanation: "Standard atmospheric pressure at sea level is 101.325 kPa (or 1013.25 mbar, or 760 mmHg). This is the reference pressure for most HVAC calculations."
  },
  {
    id: 7,
    question: "How does air density change with increasing altitude?",
    options: [
      "Density increases",
      "Density decreases",
      "Density remains constant",
      "Density first increases then decreases"
    ],
    correctAnswer: 1,
    explanation: "Air density decreases with altitude because atmospheric pressure decreases. At 1500m elevation, air density is approximately 15% lower than at sea level."
  },
  {
    id: 8,
    question: "The ratio of specific heats (γ = cp/cv) for air is approximately:",
    options: ["1.0", "1.2", "1.4", "1.6"],
    correctAnswer: 2,
    explanation: "For dry air, γ = cp/cv = 1005/718 = 1.4. This ratio is important for compressible flow calculations and understanding adiabatic processes."
  },
  {
    id: 9,
    question: "What is the molecular mass of dry air?",
    options: ["18 g/mol", "28 g/mol", "29 g/mol", "32 g/mol"],
    correctAnswer: 2,
    explanation: "Dry air has an effective molecular mass of approximately 29 g/mol (28.97 g/mol), weighted by the proportions of nitrogen, oxygen and other gases."
  },
  {
    id: 10,
    question: "An air handling unit supplies 5000 litres/s of air at 20°C. What is the mass flow rate?",
    options: ["5.0 kg/s", "5.5 kg/s", "6.0 kg/s", "6.5 kg/s"],
    correctAnswer: 2,
    explanation: "At 20°C, air density ≈ 1.2 kg/m³. Volume flow = 5000 l/s = 5 m³/s. Mass flow = ρ × V̇ = 1.2 × 5 = 6.0 kg/s."
  },
  {
    id: 11,
    question: "Which factor does NOT affect air density?",
    options: [
      "Temperature",
      "Pressure",
      "Humidity",
      "Air velocity"
    ],
    correctAnswer: 3,
    explanation: "Air velocity does not affect density - it affects the kinetic energy and pressure distribution in moving air, but not the mass per unit volume."
  },
  {
    id: 12,
    question: "The specific heat at constant volume (cv) for dry air is approximately:",
    options: ["287 J/kg·K", "718 J/kg·K", "1005 J/kg·K", "1860 J/kg·K"],
    correctAnswer: 1,
    explanation: "cv for dry air is approximately 718 J/kg·K. The relationship cp - cv = R gives: 1005 - 718 = 287 J/kg·K (the gas constant)."
  }
];

const faqs = [
  {
    question: "Why do we treat air as an ideal gas in HVAC calculations?",
    answer: "At typical HVAC operating conditions (atmospheric pressure, -10°C to 50°C), air behaves very close to an ideal gas with less than 1% deviation. This simplification allows us to use straightforward equations like PV = mRT without significant error, making calculations practical for engineering design."
  },
  {
    question: "How does humidity affect air density?",
    answer: "Contrary to intuition, humid air is less dense than dry air at the same temperature and pressure. Water vapour molecules (H₂O, M = 18) are lighter than nitrogen (N₂, M = 28) and oxygen (O₂, M = 32). When water vapour displaces these heavier molecules, the overall air density decreases."
  },
  {
    question: "Why is the 1.2 kg/m³ value commonly used for air density?",
    answer: "The value 1.2 kg/m³ is a convenient approximation for standard conditions (20°C, 101.325 kPa, 50% RH). It is accurate enough for most HVAC preliminary calculations and equipment sizing. For precise work, calculate density using actual conditions."
  },
  {
    question: "What is the difference between mass flow rate and volume flow rate?",
    answer: "Volume flow rate (m³/s or l/s) measures the volume of air passing a point per unit time. Mass flow rate (kg/s) measures the actual mass of air. Because air density changes with temperature and pressure, mass flow rate is preferred for heat transfer calculations as it remains constant through a system regardless of temperature changes."
  },
  {
    question: "Why is cp used instead of cv in most HVAC calculations?",
    answer: "In HVAC systems, air flows through open systems where pressure remains approximately constant (atmospheric). Under constant pressure conditions, the specific heat at constant pressure (cp = 1005 J/kg·K) applies. cv is used for closed systems with constant volume, which is rare in HVAC."
  },
  {
    question: "How do I convert between different pressure units?",
    answer: "Common conversions: 1 bar = 100 kPa = 1000 mbar. 1 atm = 101.325 kPa = 1013.25 mbar = 760 mmHg. For HVAC work in the UK, kPa and mbar are most commonly used, with Pascal (Pa) for smaller pressure differences."
  }
];

const HNCModule2Section3_1 = () => {
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
            <Wind className="h-4 w-4" />
            <span>Module 2.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Air Composition and Properties
          </h1>
          <p className="text-white/80">
            Understanding the fundamental properties of air for HVAC system design and psychrometric analysis
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-400/5 border-l-2 border-cyan-400/50">
            <p className="text-cyan-400 text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Dry air:</strong> 78% N₂, 21% O₂, 1% other gases</li>
              <li className="pl-1"><strong>Ideal gas law:</strong> PV = mRT (R = 287 J/kg·K)</li>
              <li className="pl-1"><strong>Air density:</strong> ~1.2 kg/m³ at standard conditions</li>
              <li className="pl-1"><strong>Specific heat:</strong> cp = 1005 J/kg·K</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-400/5 border-l-2 border-cyan-400/50">
            <p className="text-cyan-400/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Air handling:</strong> Mass flow for heat calculations</li>
              <li className="pl-1"><strong>Ductwork:</strong> Volume flow for sizing</li>
              <li className="pl-1"><strong>Fan selection:</strong> Density affects fan performance</li>
              <li className="pl-1"><strong>Altitude:</strong> Corrections for elevated sites</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "State the composition of dry atmospheric air",
              "Apply the ideal gas law to air property calculations",
              "Calculate air density at various conditions",
              "Understand the effect of moisture on air properties",
              "Convert between mass and volume flow rates",
              "Apply specific heat values to heat transfer calculations"
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

        {/* Section 1: Dry Air Composition */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">01</span>
            Composition of Dry Air
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Dry air is a mixture of gases that exists naturally in the atmosphere. Understanding its
              composition is fundamental to psychrometric calculations and HVAC system design.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Dry Air Composition by Volume</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Gas</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Chemical Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">% by Volume</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Molecular Mass (g/mol)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Nitrogen</td>
                      <td className="border border-white/10 px-3 py-2">N₂</td>
                      <td className="border border-white/10 px-3 py-2">78.09%</td>
                      <td className="border border-white/10 px-3 py-2">28.01</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Oxygen</td>
                      <td className="border border-white/10 px-3 py-2">O₂</td>
                      <td className="border border-white/10 px-3 py-2">20.95%</td>
                      <td className="border border-white/10 px-3 py-2">32.00</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Argon</td>
                      <td className="border border-white/10 px-3 py-2">Ar</td>
                      <td className="border border-white/10 px-3 py-2">0.93%</td>
                      <td className="border border-white/10 px-3 py-2">39.95</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Carbon dioxide</td>
                      <td className="border border-white/10 px-3 py-2">CO₂</td>
                      <td className="border border-white/10 px-3 py-2">0.04%</td>
                      <td className="border border-white/10 px-3 py-2">44.01</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Trace gases</td>
                      <td className="border border-white/10 px-3 py-2">Ne, He, etc.</td>
                      <td className="border border-white/10 px-3 py-2">&lt;0.01%</td>
                      <td className="border border-white/10 px-3 py-2">Various</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-cyan-400/70">
              <strong>Key point:</strong> The effective molecular mass of dry air is 28.97 g/mol (often rounded to 29 g/mol),
              calculated from the weighted average of its components.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Ideal Gas Laws */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">02</span>
            Ideal Gas Laws for Air
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              At typical HVAC operating conditions, air behaves as an ideal gas. This allows us to use
              simple equations relating pressure, volume, temperature and mass.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">The Ideal Gas Equation</p>
              <p className="font-mono text-center text-lg mb-2">PV = mRT</p>
              <div className="text-xs text-white/70 text-center space-y-1">
                <p>P = absolute pressure (Pa)</p>
                <p>V = volume (m³)</p>
                <p>m = mass (kg)</p>
                <p>R = specific gas constant (J/kg·K)</p>
                <p>T = absolute temperature (K)</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-cyan-400/80 mb-2">Gas Constants</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Dry air:</strong> R = 287 J/kg·K</li>
                  <li className="pl-1"><strong>Water vapour:</strong> R = 461 J/kg·K</li>
                  <li className="pl-1"><strong>Universal:</strong> R̄ = 8.314 J/mol·K</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-cyan-400/80 mb-2">Alternative Forms</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">ρ = P / (RT) — for density</li>
                  <li className="pl-1">Pv = RT — specific volume form</li>
                  <li className="pl-1">P₁V₁/T₁ = P₂V₂/T₂ — process form</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-cyan-400/70">
              <strong>Remember:</strong> Always use absolute temperature (Kelvin) and absolute pressure (Pa or kPa) in gas law calculations.
              K = °C + 273.15
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Air Density Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">03</span>
            Air Density Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Air density is crucial for converting between volume and mass flow rates, fan selection,
              and understanding buoyancy effects in buildings.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Density Equation</p>
              <p className="font-mono text-center text-lg mb-2">ρ = P / (R × T)</p>
              <p className="text-xs text-white/70 text-center">where ρ is density in kg/m³</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Air Density at Various Temperatures (at 101.325 kPa)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Temperature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Density (kg/m³)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Specific Volume (m³/kg)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0°C (273K)</td>
                      <td className="border border-white/10 px-3 py-2">1.293</td>
                      <td className="border border-white/10 px-3 py-2">0.773</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10°C (283K)</td>
                      <td className="border border-white/10 px-3 py-2">1.247</td>
                      <td className="border border-white/10 px-3 py-2">0.802</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">20°C (293K)</td>
                      <td className="border border-white/10 px-3 py-2">1.205</td>
                      <td className="border border-white/10 px-3 py-2">0.830</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25°C (298K)</td>
                      <td className="border border-white/10 px-3 py-2">1.184</td>
                      <td className="border border-white/10 px-3 py-2">0.845</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">30°C (303K)</td>
                      <td className="border border-white/10 px-3 py-2">1.165</td>
                      <td className="border border-white/10 px-3 py-2">0.858</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Factors affecting air density:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Temperature:</strong> Higher temperature = lower density (inverse relationship)</li>
                <li className="pl-1"><strong>Pressure:</strong> Higher pressure = higher density (direct relationship)</li>
                <li className="pl-1"><strong>Humidity:</strong> More moisture = lower density (water vapour is lighter)</li>
                <li className="pl-1"><strong>Altitude:</strong> Higher altitude = lower pressure = lower density</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Specific Heat and Energy */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">04</span>
            Specific Heat Capacity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Specific heat capacity determines how much energy is required to change the temperature of air.
              This is fundamental to all HVAC heating and cooling calculations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Specific Heat Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Property</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Dry Air</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Water Vapour</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Specific heat (const. pressure)</td>
                      <td className="border border-white/10 px-3 py-2">cp</td>
                      <td className="border border-white/10 px-3 py-2">1005 J/kg·K</td>
                      <td className="border border-white/10 px-3 py-2">1860 J/kg·K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Specific heat (const. volume)</td>
                      <td className="border border-white/10 px-3 py-2">cv</td>
                      <td className="border border-white/10 px-3 py-2">718 J/kg·K</td>
                      <td className="border border-white/10 px-3 py-2">1399 J/kg·K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ratio of specific heats</td>
                      <td className="border border-white/10 px-3 py-2">γ = cp/cv</td>
                      <td className="border border-white/10 px-3 py-2">1.40</td>
                      <td className="border border-white/10 px-3 py-2">1.33</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gas constant</td>
                      <td className="border border-white/10 px-3 py-2">R</td>
                      <td className="border border-white/10 px-3 py-2">287 J/kg·K</td>
                      <td className="border border-white/10 px-3 py-2">461 J/kg·K</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-cyan-400/80 mb-2">Sensible Heat Equation</p>
              <p className="font-mono text-center text-lg mb-2">Q̇ = ṁ × cp × ΔT</p>
              <div className="text-xs text-white/70 text-center space-y-1">
                <p>Q̇ = heat transfer rate (W or kW)</p>
                <p>ṁ = mass flow rate (kg/s)</p>
                <p>cp = specific heat (J/kg·K or kJ/kg·K)</p>
                <p>ΔT = temperature change (K or °C)</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> For moist air, the effective specific heat is slightly higher due to the water vapour content.
              A typical value of 1.02 kJ/kg·K is often used for humid air in HVAC calculations.
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
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 1: Calculating Air Density</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the density of dry air at 35°C and 101.325 kPa.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given: T = 35°C = 308K, P = 101325 Pa, R = 287 J/kg·K</p>
                <p className="mt-2">Using: ρ = P / (R × T)</p>
                <p className="mt-2">ρ = 101325 / (287 × 308)</p>
                <p>ρ = 101325 / 88396</p>
                <p>ρ = <strong>1.146 kg/m³</strong></p>
                <p className="mt-2 text-white/60">Note: Lower than 1.2 kg/m³ due to higher temperature</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 2: Mass Flow Rate Conversion</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An AHU delivers 8500 l/s at 15°C. Calculate the mass flow rate.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Calculate air density at 15°C</p>
                <p>T = 15 + 273 = 288K</p>
                <p>ρ = 101325 / (287 × 288) = 1.226 kg/m³</p>
                <p className="mt-2">Step 2: Convert volume flow to m³/s</p>
                <p>V̇ = 8500 l/s = 8.5 m³/s</p>
                <p className="mt-2">Step 3: Calculate mass flow</p>
                <p>ṁ = ρ × V̇ = 1.226 × 8.5 = <strong>10.42 kg/s</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 3: Heating Coil Capacity</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the heating capacity required to raise 5 kg/s of air from 10°C to 22°C.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given: ṁ = 5 kg/s, T₁ = 10°C, T₂ = 22°C</p>
                <p>cp = 1.005 kJ/kg·K</p>
                <p className="mt-2">Using: Q̇ = ṁ × cp × ΔT</p>
                <p className="mt-2">Q̇ = 5 × 1.005 × (22 - 10)</p>
                <p>Q̇ = 5 × 1.005 × 12</p>
                <p>Q̇ = <strong>60.3 kW</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Example 4: Altitude Correction</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A building is at 600m elevation where pressure is 94.3 kPa. Calculate air density at 20°C.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given: P = 94300 Pa, T = 293K, R = 287 J/kg·K</p>
                <p className="mt-2">ρ = P / (R × T)</p>
                <p>ρ = 94300 / (287 × 293)</p>
                <p>ρ = 94300 / 84091</p>
                <p>ρ = <strong>1.121 kg/m³</strong></p>
                <p className="mt-2 text-white/60">This is 7% less than sea level (1.205 kg/m³)</p>
                <p className="text-white/60">Fan capacity must be increased accordingly</p>
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
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>PV = mRT</strong> — Ideal gas law</li>
                <li className="pl-1"><strong>ρ = P/(RT)</strong> — Air density</li>
                <li className="pl-1"><strong>ṁ = ρV̇</strong> — Mass flow rate</li>
                <li className="pl-1"><strong>Q̇ = ṁcpΔT</strong> — Sensible heat</li>
                <li className="pl-1"><strong>K = °C + 273</strong> — Temperature conversion</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-cyan-400/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Dry air R = <strong>287 J/kg·K</strong></li>
                <li className="pl-1">Dry air cp = <strong>1005 J/kg·K</strong></li>
                <li className="pl-1">Standard density = <strong>1.2 kg/m³</strong> (at 20°C)</li>
                <li className="pl-1">Standard pressure = <strong>101.325 kPa</strong></li>
                <li className="pl-1">Air composition = <strong>78% N₂, 21% O₂</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using °C in gas law</strong> — Always convert to Kelvin</li>
                <li className="pl-1"><strong>Wrong units</strong> — Pa not kPa, J not kJ in base formula</li>
                <li className="pl-1"><strong>Ignoring altitude</strong> — Significant above 500m elevation</li>
                <li className="pl-1"><strong>Confusing cp and cv</strong> — Use cp for open flow systems</li>
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
                <p className="font-medium text-white mb-1">Air Properties</p>
                <ul className="space-y-0.5">
                  <li>Molecular mass: 28.97 g/mol</li>
                  <li>R (dry air): 287 J/kg·K</li>
                  <li>cp: 1005 J/kg·K</li>
                  <li>cv: 718 J/kg·K</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Standard Conditions</p>
                <ul className="space-y-0.5">
                  <li>Pressure: 101.325 kPa</li>
                  <li>Density at 20°C: 1.205 kg/m³</li>
                  <li>Composition: 78% N₂, 21% O₂</li>
                  <li>γ (ratio): 1.40</li>
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
            <Link to="../h-n-c-module2-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section3-2">
              Next: Humidity and Moisture Content
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section3_1;
