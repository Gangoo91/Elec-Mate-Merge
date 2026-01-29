import { ArrowLeft, Droplets, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fluid Properties and Pressure - HNC Module 2 Section 2.1";
const DESCRIPTION = "Master fluid properties including density, viscosity, and pressure fundamentals for building services engineering. Covers Pascal's law and hydrostatic pressure calculations.";

const quickCheckQuestions = [
  {
    id: "water-density",
    question: "What is the approximate density of water at 20°C?",
    options: ["100 kg/m³", "500 kg/m³", "1000 kg/m³", "1500 kg/m³"],
    correctIndex: 2,
    explanation: "Water has a density of approximately 1000 kg/m³ (or 1 kg/litre) at 20°C. This value is fundamental to all hydraulic calculations in building services."
  },
  {
    id: "pressure-types",
    question: "If atmospheric pressure is 101.3 kPa and gauge pressure reads 150 kPa, what is the absolute pressure?",
    options: ["48.7 kPa", "150 kPa", "201.3 kPa", "251.3 kPa"],
    correctIndex: 3,
    explanation: "Absolute pressure = Gauge pressure + Atmospheric pressure. So 150 kPa + 101.3 kPa = 251.3 kPa. Most pressure gauges read gauge pressure (zero at atmospheric)."
  },
  {
    id: "pascal-law",
    question: "According to Pascal's law, pressure applied to a confined fluid:",
    options: ["Decreases with depth", "Is transmitted equally in all directions", "Only acts downward", "Creates turbulent flow"],
    correctIndex: 1,
    explanation: "Pascal's law states that pressure applied to a confined fluid is transmitted undiminished and equally in all directions. This principle enables hydraulic systems to multiply force."
  },
  {
    id: "hydrostatic-pressure",
    question: "A water tank is 8m high. What is the hydrostatic pressure at the bottom? (g = 9.81 m/s²)",
    options: ["7.85 kPa", "39.24 kPa", "78.48 kPa", "98.1 kPa"],
    correctIndex: 2,
    explanation: "P = ρgh = 1000 × 9.81 × 8 = 78,480 Pa = 78.48 kPa. This is approximately 0.78 bar or 7.85 metres head of water."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is density?",
    options: [
      "The volume per unit mass of a substance",
      "The mass per unit volume of a substance",
      "The weight of a substance",
      "The pressure exerted by a substance"
    ],
    correctAnswer: 1,
    explanation: "Density (ρ) is defined as mass per unit volume, expressed in kg/m³. It is a fundamental property used in all fluid mechanics calculations."
  },
  {
    id: 2,
    question: "Which property describes a fluid's resistance to flow?",
    options: ["Density", "Pressure", "Viscosity", "Compressibility"],
    correctAnswer: 2,
    explanation: "Viscosity (μ) describes a fluid's internal resistance to flow - essentially its 'thickness'. Higher viscosity fluids like oil flow more slowly than lower viscosity fluids like water."
  },
  {
    id: 3,
    question: "The SI unit of dynamic viscosity is:",
    options: ["kg/m³", "Pa·s (Pascal-seconds)", "m²/s", "N/m²"],
    correctAnswer: 1,
    explanation: "Dynamic viscosity (μ) is measured in Pascal-seconds (Pa·s) or equivalently kg/(m·s). Water at 20°C has a viscosity of approximately 0.001 Pa·s (1 mPa·s)."
  },
  {
    id: 4,
    question: "What is the relationship between kinematic viscosity (ν) and dynamic viscosity (μ)?",
    options: ["ν = μ × ρ", "ν = μ / ρ", "ν = ρ / μ", "ν = μ + ρ"],
    correctAnswer: 1,
    explanation: "Kinematic viscosity (ν) = Dynamic viscosity (μ) / Density (ρ). Units are m²/s. This relationship is important when using the Reynolds number formula."
  },
  {
    id: 5,
    question: "Standard atmospheric pressure at sea level is approximately:",
    options: ["10.13 kPa", "50 kPa", "101.3 kPa", "1013 kPa"],
    correctAnswer: 2,
    explanation: "Standard atmospheric pressure is 101.325 kPa (often rounded to 101.3 kPa), equivalent to 1.013 bar or 10.33 metres head of water."
  },
  {
    id: 6,
    question: "A pressure gauge reading of zero indicates:",
    options: ["Absolute vacuum", "Atmospheric pressure", "Maximum system pressure", "Pump failure"],
    correctAnswer: 1,
    explanation: "Gauge pressure uses atmospheric pressure as the reference point (zero). A gauge reading of zero means the actual (absolute) pressure equals atmospheric pressure."
  },
  {
    id: 7,
    question: "In a building's LPHW system, why does pressure increase at lower floor levels?",
    options: [
      "Due to pump operation",
      "Due to hydrostatic pressure from the water column above",
      "Due to pipe friction",
      "Due to temperature changes"
    ],
    correctAnswer: 1,
    explanation: "Hydrostatic pressure (P = ρgh) increases with depth. Each metre of water column adds approximately 9.81 kPa (0.1 bar) to the static pressure."
  },
  {
    id: 8,
    question: "What pressure is exerted at the base of a 25m tall building's heating system header tank? (Use ρ = 1000 kg/m³, g = 10 m/s²)",
    options: ["25 kPa", "100 kPa", "250 kPa", "2500 kPa"],
    correctAnswer: 2,
    explanation: "P = ρgh = 1000 × 10 × 25 = 250,000 Pa = 250 kPa = 2.5 bar. This static head must be considered when sizing components at lower levels."
  },
  {
    id: 9,
    question: "Pascal's law is the fundamental principle behind:",
    options: [
      "Centrifugal pumps",
      "Hydraulic lifts and presses",
      "Heat exchangers",
      "Cooling towers"
    ],
    correctAnswer: 1,
    explanation: "Pascal's law enables hydraulic systems to multiply force. A small force on a small piston creates equal pressure throughout the fluid, producing a larger force on a larger piston."
  },
  {
    id: 10,
    question: "How does water viscosity change as temperature increases?",
    options: [
      "Viscosity increases significantly",
      "Viscosity decreases significantly",
      "Viscosity remains constant",
      "Viscosity first increases then decreases"
    ],
    correctAnswer: 1,
    explanation: "Water viscosity decreases as temperature rises. At 20°C it's about 1.0 mPa·s, at 60°C it's about 0.47 mPa·s. This affects flow characteristics in heating systems."
  },
  {
    id: 11,
    question: "What is the specific gravity of a fluid with density 1200 kg/m³?",
    options: ["0.83", "1.0", "1.2", "1200"],
    correctAnswer: 2,
    explanation: "Specific gravity (SG) is the ratio of a fluid's density to water's density. SG = 1200/1000 = 1.2. This dimensionless number indicates the fluid is 20% denser than water."
  },
  {
    id: 12,
    question: "In HVAC applications, which fluid property most affects pump power requirements?",
    options: [
      "Colour",
      "Density and viscosity",
      "Thermal conductivity",
      "Surface tension"
    ],
    correctAnswer: 1,
    explanation: "Density affects the mass flow rate and static head, while viscosity affects friction losses. Both directly impact the power required to pump fluids through building systems."
  }
];

const faqs = [
  {
    question: "Why do heating systems use pressurisation units?",
    answer: "Pressurisation units maintain system pressure above atmospheric to prevent air ingress and cavitation, and above the saturation pressure at operating temperature to prevent boiling. They also compensate for water volume changes during heating/cooling cycles. Typical sealed systems operate at 1.5-3 bar gauge."
  },
  {
    question: "What's the difference between absolute and gauge pressure?",
    answer: "Absolute pressure is measured from a perfect vacuum (zero reference). Gauge pressure is measured from atmospheric pressure. Most instruments read gauge pressure, so you add atmospheric pressure (~101.3 kPa) to get absolute. Negative gauge pressure (vacuum) is below atmospheric."
  },
  {
    question: "Why does water viscosity matter in building services?",
    answer: "Viscosity affects friction losses in pipes and pressure drop across components. At higher temperatures (e.g., 80°C in heating systems), water flows more easily due to reduced viscosity. This is why LPHW systems have different flow characteristics to chilled water systems - they need to account for temperature-dependent viscosity."
  },
  {
    question: "How do I calculate the static pressure at different building levels?",
    answer: "Use P = ρgh where ρ = 1000 kg/m³ for water, g = 9.81 m/s², and h = height difference in metres. A useful rule of thumb: each metre of water height adds approximately 10 kPa (0.1 bar) of pressure. A 30m building has about 3 bar static pressure difference between top and bottom."
  },
  {
    question: "What is vapour pressure and why is it important?",
    answer: "Vapour pressure is the pressure at which liquid begins to boil at a given temperature. For water at 100°C, it's 101.3 kPa (1 atm). In pressurised systems, maintaining pressure above vapour pressure prevents cavitation and flash steam. This is critical at pump suctions and high points in systems."
  },
  {
    question: "How do glycol mixtures affect fluid properties?",
    answer: "Adding glycol (for freeze protection) increases density and viscosity compared to pure water. A 30% glycol solution has density ~1040 kg/m³ and significantly higher viscosity. This increases pump power requirements and reduces heat transfer efficiency, typically requiring 10-15% larger pumps and heat exchangers."
  }
];

const HNCModule2Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section2">
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
            <Droplets className="h-4 w-4" />
            <span>Module 2.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fluid Properties and Pressure
          </h1>
          <p className="text-white/80">
            Understanding the fundamental properties of fluids and pressure principles essential for hydraulic system design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Density (ρ):</strong> Mass per volume, water ≈ 1000 kg/m³</li>
              <li className="pl-1"><strong>Viscosity (μ):</strong> Resistance to flow, decreases with temperature</li>
              <li className="pl-1"><strong>Pressure:</strong> Force per area, measured in Pa, bar, or psi</li>
              <li className="pl-1"><strong>Hydrostatic:</strong> P = ρgh (pressure from fluid column)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>LPHW systems:</strong> Static head affects component ratings</li>
              <li className="pl-1"><strong>Chilled water:</strong> Viscosity affects pump sizing</li>
              <li className="pl-1"><strong>Pressurisation:</strong> Maintains system above vapour pressure</li>
              <li className="pl-1"><strong>Cold water:</strong> Mains pressure typically 2-4 bar</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define density, specific gravity, and viscosity with correct SI units",
              "Distinguish between absolute, gauge, and atmospheric pressure",
              "Apply Pascal's law to hydraulic system analysis",
              "Calculate hydrostatic pressure in building systems",
              "Understand how temperature affects fluid properties",
              "Apply fluid property knowledge to HVAC system design"
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

        {/* Section 1: Density and Specific Gravity */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Density and Specific Gravity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Density is the most fundamental fluid property - it describes how much mass is contained
              in a given volume. All hydraulic calculations in building services start with density.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key definitions:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Density (ρ):</strong> Mass per unit volume (kg/m³)</li>
                <li className="pl-1"><strong>Specific gravity (SG):</strong> Ratio of fluid density to water density (dimensionless)</li>
                <li className="pl-1"><strong>Specific volume:</strong> Volume per unit mass = 1/ρ (m³/kg)</li>
                <li className="pl-1"><strong>Specific weight:</strong> Weight per unit volume = ρg (N/m³)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Fluid Densities in Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Fluid</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Density (kg/m³)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Water (4°C)</td>
                      <td className="border border-white/10 px-3 py-2">1000</td>
                      <td className="border border-white/10 px-3 py-2">Reference standard</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Water (20°C)</td>
                      <td className="border border-white/10 px-3 py-2">998</td>
                      <td className="border border-white/10 px-3 py-2">Chilled water systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Water (80°C)</td>
                      <td className="border border-white/10 px-3 py-2">972</td>
                      <td className="border border-white/10 px-3 py-2">LPHW heating systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">30% glycol solution</td>
                      <td className="border border-white/10 px-3 py-2">1040</td>
                      <td className="border border-white/10 px-3 py-2">Frost protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air (20°C, 1 atm)</td>
                      <td className="border border-white/10 px-3 py-2">1.2</td>
                      <td className="border border-white/10 px-3 py-2">Ventilation systems</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Water density decreases as temperature rises. A system designed for 80°C water will have slightly different flow characteristics than at 20°C.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Viscosity */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Viscosity - Resistance to Flow
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Viscosity describes a fluid's internal friction - its resistance to flowing or being deformed.
              It directly affects pipe friction losses and pump power requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of viscosity:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Dynamic (absolute) viscosity (μ):</strong> Measured in Pa·s or kg/(m·s)</li>
                <li className="pl-1"><strong>Kinematic viscosity (ν):</strong> ν = μ/ρ, measured in m²/s or Stokes</li>
                <li className="pl-1">Kinematic viscosity is used in the Reynolds number formula</li>
                <li className="pl-1">Water viscosity decreases significantly with temperature</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Water Viscosity vs Temperature</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>10°C:</strong> μ = 1.31 mPa·s</li>
                  <li className="pl-1"><strong>20°C:</strong> μ = 1.00 mPa·s</li>
                  <li className="pl-1"><strong>40°C:</strong> μ = 0.65 mPa·s</li>
                  <li className="pl-1"><strong>60°C:</strong> μ = 0.47 mPa·s</li>
                  <li className="pl-1"><strong>80°C:</strong> μ = 0.35 mPa·s</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Implications</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Lower viscosity = less friction loss</li>
                  <li className="pl-1">LPHW systems have lower losses than CHW</li>
                  <li className="pl-1">Glycol increases viscosity significantly</li>
                  <li className="pl-1">Cold start-up has highest resistance</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Kinematic Viscosity Relationship</p>
              <p className="font-mono text-center text-lg mb-2">ν = μ / ρ</p>
              <p className="text-xs text-white/70 text-center">Where ν is in m²/s, μ in Pa·s, and ρ in kg/m³</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> When using glycol solutions, expect 15-25% higher friction losses and size pumps accordingly.
            </p>
          </div>
        </section>

        {/* Section 3: Pressure Fundamentals */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Pressure Types and Measurement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pressure is force per unit area. Understanding the different types of pressure and their
              relationships is crucial for specifying equipment and ensuring safe system operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pressure Relationships</p>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Absolute Pressure = Gauge Pressure + Atmospheric Pressure</p>
                  <p className="text-white/70 text-xs">P<sub>abs</sub> = P<sub>gauge</sub> + P<sub>atm</sub></p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pressure Units Conversion</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Unit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Value (1 atm)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pascal (Pa)</td>
                      <td className="border border-white/10 px-3 py-2">101,325</td>
                      <td className="border border-white/10 px-3 py-2">SI unit, calculations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Kilopascal (kPa)</td>
                      <td className="border border-white/10 px-3 py-2">101.325</td>
                      <td className="border border-white/10 px-3 py-2">HVAC specifications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bar</td>
                      <td className="border border-white/10 px-3 py-2">1.013</td>
                      <td className="border border-white/10 px-3 py-2">Industrial equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Metres head (mH₂O)</td>
                      <td className="border border-white/10 px-3 py-2">10.33</td>
                      <td className="border border-white/10 px-3 py-2">Pump specifications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PSI</td>
                      <td className="border border-white/10 px-3 py-2">14.7</td>
                      <td className="border border-white/10 px-3 py-2">American equipment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-white/5">
                <p className="font-bold text-white mb-1">Atmospheric</p>
                <p className="text-white/70 text-xs">101.3 kPa at sea level</p>
                <p className="text-white/70 text-xs">Reference for gauges</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-bold text-white mb-1">Gauge</p>
                <p className="text-white/70 text-xs">Relative to atmosphere</p>
                <p className="text-white/70 text-xs">Most common readings</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-bold text-white mb-1">Absolute</p>
                <p className="text-white/70 text-xs">From true zero (vacuum)</p>
                <p className="text-white/70 text-xs">Thermodynamic calcs</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Useful conversion:</strong> 1 bar ≈ 100 kPa ≈ 10 metres head of water (exact: 10.2 mH₂O)
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Pascal's Law and Hydrostatic Pressure */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Pascal's Law and Hydrostatic Pressure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pascal's law and hydrostatic pressure are fundamental principles that govern how pressure
              behaves in fluids. These principles are essential for understanding building services systems.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pascal's Law</p>
              <p className="text-sm mb-2">
                Pressure applied to a confined fluid is transmitted undiminished and equally in all directions
                throughout the fluid.
              </p>
              <p className="text-xs text-white/70">This enables hydraulic force multiplication: F₂/F₁ = A₂/A₁</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hydrostatic Pressure Equation</p>
              <p className="font-mono text-center text-lg mb-2">P = ρgh</p>
              <p className="text-xs text-white/70 text-center">Where P = pressure (Pa), ρ = density (kg/m³), g = 9.81 m/s², h = height (m)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hydrostatic Pressure in Buildings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Height</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Static Pressure</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Design Consideration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10 m (3 storey)</td>
                      <td className="border border-white/10 px-3 py-2">~1.0 bar</td>
                      <td className="border border-white/10 px-3 py-2">Standard equipment OK</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">30 m (10 storey)</td>
                      <td className="border border-white/10 px-3 py-2">~3.0 bar</td>
                      <td className="border border-white/10 px-3 py-2">Check valve/pipe ratings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">60 m (20 storey)</td>
                      <td className="border border-white/10 px-3 py-2">~6.0 bar</td>
                      <td className="border border-white/10 px-3 py-2">Consider pressure break tanks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100 m (high-rise)</td>
                      <td className="border border-white/10 px-3 py-2">~10 bar</td>
                      <td className="border border-white/10 px-3 py-2">Zoned systems required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Practical applications in building services:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Static head:</strong> Components at lower levels experience higher pressure</li>
                <li className="pl-1"><strong>Pressurisation:</strong> Systems maintained above atmospheric to prevent air ingress</li>
                <li className="pl-1"><strong>Cold water:</strong> Gravity-fed systems rely on hydrostatic head</li>
                <li className="pl-1"><strong>Expansion vessels:</strong> Pre-charge set to balance static head</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Rule of thumb:</strong> Each 10 metres of water column adds approximately 1 bar (100 kPa) of static pressure.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Static Pressure in a Tall Building</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 45m tall building has a header tank at roof level. Calculate the static pressure at ground floor level.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using P = ρgh</p>
                <p>P = 1000 kg/m³ × 9.81 m/s² × 45 m</p>
                <p>P = 441,450 Pa = <strong>441.45 kPa</strong></p>
                <p className="mt-2">Converting to bar: 441.45 / 100 = <strong>4.41 bar</strong></p>
                <p className="mt-2 text-white/60">→ Components must be rated for at least 6 bar working pressure</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Absolute vs Gauge Pressure</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A sealed heating system shows 2.5 bar on the pressure gauge. What is the absolute pressure?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Absolute = Gauge + Atmospheric</p>
                <p>P<sub>abs</sub> = 2.5 bar + 1.013 bar</p>
                <p>P<sub>abs</sub> = <strong>3.513 bar</strong> (absolute)</p>
                <p className="mt-2 text-white/60">→ This absolute pressure must exceed the vapour pressure at system temperature</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Kinematic Viscosity Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the kinematic viscosity of water at 60°C (μ = 0.47 mPa·s, ρ = 983 kg/m³).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>ν = μ / ρ</p>
                <p>ν = 0.47 × 10⁻³ Pa·s / 983 kg/m³</p>
                <p>ν = 4.78 × 10⁻⁷ m²/s</p>
                <p>ν = <strong>0.478 mm²/s</strong> (or 0.478 cSt)</p>
                <p className="mt-2 text-white/60">→ This value is used in Reynolds number calculations</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>ρ = m/V</strong> — Density (kg/m³)</li>
                <li className="pl-1"><strong>P = F/A</strong> — Pressure definition (Pa)</li>
                <li className="pl-1"><strong>P = ρgh</strong> — Hydrostatic pressure (Pa)</li>
                <li className="pl-1"><strong>ν = μ/ρ</strong> — Kinematic viscosity (m²/s)</li>
                <li className="pl-1"><strong>P<sub>abs</sub> = P<sub>gauge</sub> + P<sub>atm</sub></strong> — Pressure relationship</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Water density: <strong>~1000 kg/m³</strong></li>
                <li className="pl-1">Atmospheric pressure: <strong>101.3 kPa = 1.013 bar</strong></li>
                <li className="pl-1">10 m water column = <strong>~1 bar</strong></li>
                <li className="pl-1">Water viscosity at 20°C: <strong>1.0 mPa·s</strong></li>
                <li className="pl-1">g = <strong>9.81 m/s²</strong> (often use 10 for quick calcs)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Confusing gauge and absolute</strong> — Know which your gauge reads</li>
                <li className="pl-1"><strong>Forgetting temperature effects</strong> — Density and viscosity change with temperature</li>
                <li className="pl-1"><strong>Ignoring static head</strong> — Critical in tall buildings</li>
                <li className="pl-1"><strong>Using wrong viscosity type</strong> — Dynamic for shear, kinematic for Reynolds</li>
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
                <p className="font-medium text-white mb-1">Fluid Properties</p>
                <ul className="space-y-0.5">
                  <li>Density (ρ) - kg/m³ - Mass per volume</li>
                  <li>Viscosity (μ) - Pa·s - Resistance to flow</li>
                  <li>Kinematic visc (ν) - m²/s - μ/ρ</li>
                  <li>Specific gravity - Dimensionless - ρ/ρ<sub>water</sub></li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Pressure Values</p>
                <ul className="space-y-0.5">
                  <li>Atmospheric: 101.3 kPa = 1.013 bar</li>
                  <li>10 m head = 1 bar = 100 kPa</li>
                  <li>1 bar = 14.5 psi</li>
                  <li>Hydrostatic: P = ρgh</li>
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
            <Link to="../h-n-c-module2-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section2-2">
              Next: Flow Characteristics
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section2_1;
