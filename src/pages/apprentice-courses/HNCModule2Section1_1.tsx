import { ArrowLeft, Thermometer, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Conduction - HNC Module 2 Section 1.1";
const DESCRIPTION = "Master heat transfer by conduction for building services: Fourier's Law, thermal conductivity, composite walls, and practical applications in pipe insulation and wall construction.";

const quickCheckQuestions = [
  {
    id: "fouriers-law",
    question: "In Fourier's Law (Q = -kA dT/dx), what does the negative sign indicate?",
    options: ["Heat loss to surroundings", "Heat flows from cold to hot", "Heat flows from hot to cold", "Thermal resistance"],
    correctIndex: 2,
    explanation: "The negative sign indicates that heat flows in the direction of decreasing temperature - from hot to cold regions. This is consistent with the Second Law of Thermodynamics."
  },
  {
    id: "thermal-conductivity",
    question: "Which material has the highest thermal conductivity?",
    options: ["Brick (0.8 W/m·K)", "Mineral wool (0.035 W/m·K)", "Copper (385 W/m·K)", "Concrete (1.4 W/m·K)"],
    correctIndex: 2,
    explanation: "Copper has an extremely high thermal conductivity of 385 W/m·K, making it excellent for heat exchangers but poor as an insulator. Mineral wool's low k-value (0.035 W/m·K) makes it an effective insulator."
  },
  {
    id: "composite-wall",
    question: "For a composite wall with layers in series, how are thermal resistances combined?",
    options: ["R_total = R1 × R2 × R3", "R_total = R1 + R2 + R3", "1/R_total = 1/R1 + 1/R2 + 1/R3", "R_total = (R1 + R2)/2"],
    correctIndex: 1,
    explanation: "For layers in series, thermal resistances add directly: R_total = R1 + R2 + R3. This is analogous to electrical resistors in series. The same heat flow passes through each layer."
  },
  {
    id: "steady-state",
    question: "What characterises steady-state conduction?",
    options: ["Temperature varies with time", "Heat flow rate varies with position", "Temperature is constant at any given point over time", "Heat accumulates in the material"],
    correctIndex: 2,
    explanation: "In steady-state conduction, temperatures remain constant at any given point over time. Heat entering equals heat leaving - no energy is stored. This simplifies calculations and is the basis of most building services thermal analysis."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the SI unit for thermal conductivity (k)?",
    options: [
      "W/m²·K",
      "W/m·K",
      "m²·K/W",
      "J/kg·K"
    ],
    correctAnswer: 1,
    explanation: "Thermal conductivity is measured in Watts per metre per Kelvin (W/m·K). It represents the rate of heat transfer through a material per unit thickness per unit temperature difference."
  },
  {
    id: 2,
    question: "A 220mm brick wall (k = 0.84 W/m·K) has inner and outer surface temperatures of 18°C and 5°C. What is the heat flux?",
    options: ["49.6 W/m²", "59.2 W/m²", "39.5 W/m²", "69.8 W/m²"],
    correctAnswer: 0,
    explanation: "Using q = k × ΔT/L = 0.84 × (18-5)/0.22 = 0.84 × 13/0.22 = 49.6 W/m². This is the rate of heat loss per square metre of wall area."
  },
  {
    id: 3,
    question: "What is the thermal resistance (R-value) of 100mm of mineral wool insulation (k = 0.035 W/m·K)?",
    options: ["2.86 m²·K/W", "0.35 m²·K/W", "3.50 m²·K/W", "0.0035 m²·K/W"],
    correctAnswer: 0,
    explanation: "R = L/k = 0.1/0.035 = 2.86 m²·K/W. Higher R-values indicate better insulation. This is why mineral wool is widely used in building construction."
  },
  {
    id: 4,
    question: "A wall comprises 100mm brick (k=0.84), 50mm cavity insulation (k=0.035), and 100mm blockwork (k=0.19). What is the total thermal resistance of the masonry layers?",
    options: ["1.48 m²·K/W", "1.96 m²·K/W", "2.07 m²·K/W", "0.69 m²·K/W"],
    correctAnswer: 2,
    explanation: "R_brick = 0.1/0.84 = 0.119, R_insulation = 0.05/0.035 = 1.43, R_block = 0.1/0.19 = 0.526. Total R = 0.119 + 1.43 + 0.526 = 2.07 m²·K/W. The cavity insulation contributes most of the thermal resistance."
  },
  {
    id: 5,
    question: "In parallel heat paths, which statement is correct?",
    options: [
      "Heat flow is the same through each path",
      "Temperature drop is the same across each path",
      "Thermal resistances add directly",
      "Heat always takes the longest path"
    ],
    correctAnswer: 1,
    explanation: "For parallel paths, the temperature difference is the same across each path, but heat flow divides according to the thermal conductance of each path. This is analogous to parallel electrical resistors."
  },
  {
    id: 6,
    question: "A steel pipe (k = 50 W/m·K) with 25mm wall thickness has a thermal bridge factor compared to 25mm pipe insulation (k = 0.035 W/m·K) of approximately:",
    options: ["50 times worse", "1430 times worse", "35 times worse", "Similar performance"],
    correctAnswer: 1,
    explanation: "Ratio = k_steel/k_insulation = 50/0.035 = 1429. Uninsulated steel pipes conduct heat approximately 1430 times faster than insulated pipes - hence the critical importance of pipe insulation."
  },
  {
    id: 7,
    question: "What causes a thermal bridge in building construction?",
    options: [
      "A gap in the insulation layer",
      "A material with higher thermal conductivity penetrating the insulation",
      "Poor workmanship in installation",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Thermal bridges occur when the insulation layer is compromised - whether by gaps, structural elements (steel lintels, mortar joints), or installation defects. All allow increased heat flow and can cause condensation."
  },
  {
    id: 8,
    question: "For a 50mm diameter hot water pipe at 60°C in a 20°C ambient, adding 25mm of pipe insulation (k = 0.035 W/m·K) typically reduces heat loss by approximately:",
    options: ["50%", "75%", "90%", "99%"],
    correctAnswer: 2,
    explanation: "Pipe insulation typically reduces heat loss by 85-95%. The exact reduction depends on pipe size, temperature difference, and insulation thickness, but 90% is a reasonable estimate for 25mm insulation on LPHW pipework."
  },
  {
    id: 9,
    question: "What is the U-value of a wall with total thermal resistance R_total = 3.5 m²·K/W?",
    options: ["3.5 W/m²·K", "0.29 W/m²·K", "0.35 W/m²·K", "2.86 W/m²·K"],
    correctAnswer: 1,
    explanation: "U = 1/R_total = 1/3.5 = 0.286 ≈ 0.29 W/m²·K. U-value is the overall heat transfer coefficient and is the reciprocal of total thermal resistance. Lower U-values indicate better insulation."
  },
  {
    id: 10,
    question: "During transient conduction, which property determines how quickly a material responds to temperature changes?",
    options: ["Thermal conductivity only", "Density only", "Thermal diffusivity (α = k/ρc)", "Specific heat capacity only"],
    correctAnswer: 2,
    explanation: "Thermal diffusivity α = k/(ρc) determines the rate of temperature change. It combines conductivity (how fast heat moves), density and specific heat (how much energy is stored). High α means rapid temperature response."
  },
  {
    id: 11,
    question: "Building Regulations Approved Document L requires new build walls to achieve a maximum U-value of:",
    options: ["0.55 W/m²·K", "0.35 W/m²·K", "0.26 W/m²·K", "0.18 W/m²·K"],
    correctAnswer: 2,
    explanation: "Approved Document L (Conservation of fuel and power) requires walls in new dwellings to achieve U ≤ 0.26 W/m²·K. This drives the need for substantial wall insulation in modern construction."
  },
  {
    id: 12,
    question: "Why is the internal surface resistance (R_si) typically higher than the external surface resistance (R_se)?",
    options: [
      "Internal walls are thicker",
      "Internal air movement is lower, reducing convective heat transfer",
      "External walls have better insulation",
      "It's the same - this statement is incorrect"
    ],
    correctAnswer: 1,
    explanation: "Internal surface resistance (R_si ≈ 0.13 m²·K/W) is higher than external (R_se ≈ 0.04 m²·K/W) because internal air is relatively still, while external surfaces experience wind-driven convection that increases heat transfer."
  }
];

const faqs = [
  {
    question: "What's the difference between thermal conductivity (k) and thermal resistance (R)?",
    answer: "Thermal conductivity (k, in W/m·K) is a material property - it tells you how well a material conducts heat regardless of thickness. Thermal resistance (R, in m²·K/W) depends on both material properties AND thickness: R = L/k. A 100mm layer of mineral wool has twice the R-value of a 50mm layer of the same material."
  },
  {
    question: "Why do we use U-values instead of R-values in building regulations?",
    answer: "U-values (W/m²·K) directly give the heat loss per unit area per degree temperature difference, making heat loss calculations simpler: Q = U × A × ΔT. U-values also include surface resistances (internal and external), giving a more complete picture of real-world performance. U = 1/R_total."
  },
  {
    question: "How do thermal bridges affect building performance?",
    answer: "Thermal bridges can increase heat loss by 10-30% beyond what simple U-value calculations predict. More critically, they create cold spots where condensation forms, leading to mould growth and structural damage. Modern design uses thermal break materials and careful detailing to minimise bridging."
  },
  {
    question: "Why is pipe insulation thickness specified differently for different pipe sizes?",
    answer: "Heat loss from pipes is proportional to surface area, which increases with diameter. However, the ratio of insulation volume to pipe surface area improves with larger pipes, so proportionally less insulation is needed. BS 5422 provides minimum insulation thicknesses based on pipe diameter, operating temperature, and environmental conditions."
  },
  {
    question: "What's the practical difference between steady-state and transient conduction?",
    answer: "Steady-state assumes temperatures have stabilised - useful for calculating design heat loads. Transient analysis considers warm-up/cool-down periods and is important for intermittent heating systems, thermal mass calculations, and understanding how buildings respond to changing conditions. Building services heating calculations typically use steady-state for sizing."
  },
  {
    question: "How does moisture affect thermal conductivity?",
    answer: "Water has a thermal conductivity of about 0.6 W/m·K - roughly 17 times higher than still air (0.025 W/m·K). When insulation becomes wet, water replaces air in the pores, dramatically increasing conductivity and reducing effectiveness. This is why vapour barriers and proper drainage details are essential in building construction."
  }
];

const HNCModule2Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section1">
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
            <Thermometer className="h-4 w-4" />
            <span>Module 2.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Conduction
          </h1>
          <p className="text-white/80">
            Heat transfer through solid materials - the foundation of building thermal analysis and insulation design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Conduction:</strong> Heat transfer through direct molecular contact</li>
              <li className="pl-1"><strong>Fourier's Law:</strong> Q = -kA(dT/dx) governs heat flow rate</li>
              <li className="pl-1"><strong>Thermal conductivity (k):</strong> Material property in W/m·K</li>
              <li className="pl-1"><strong>R-value:</strong> Thermal resistance = thickness / conductivity</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Wall U-values:</strong> Building Regs require 0.26 W/m²·K</li>
              <li className="pl-1"><strong>Pipe insulation:</strong> Reduces heat loss by ~90%</li>
              <li className="pl-1"><strong>Thermal bridges:</strong> Cold spots cause condensation</li>
              <li className="pl-1"><strong>Composite walls:</strong> Resistances add in series</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply Fourier's Law to calculate conductive heat transfer",
              "Use thermal conductivity values for common building materials",
              "Distinguish between steady-state and transient conduction",
              "Calculate thermal resistance of composite walls",
              "Analyse parallel heat paths and thermal bridges",
              "Specify pipe insulation for building services applications"
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

        {/* Section 1: Fourier's Law */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fourier's Law of Conduction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Conduction is heat transfer through a material by direct molecular contact. Molecules in hotter
              regions vibrate more energetically, transferring kinetic energy to adjacent cooler molecules.
              This process continues until thermal equilibrium is reached.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fourier's Law - The Fundamental Equation</p>
              <p className="font-mono text-center text-lg mb-2">Q = -kA(dT/dx)</p>
              <div className="text-xs text-white/70 space-y-1 mt-3">
                <p><strong>Q</strong> = Heat transfer rate (W)</p>
                <p><strong>k</strong> = Thermal conductivity (W/m·K)</p>
                <p><strong>A</strong> = Cross-sectional area perpendicular to heat flow (m²)</p>
                <p><strong>dT/dx</strong> = Temperature gradient (K/m or °C/m)</p>
                <p><strong>-ve sign</strong> = Heat flows from hot to cold (decreasing T)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">For a flat wall of thickness L:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Heat flux: <strong>q = Q/A = k(T1 - T2)/L</strong> (W/m²)</li>
                <li className="pl-1">Total heat flow: <strong>Q = kA(T1 - T2)/L</strong> (W)</li>
                <li className="pl-1">T1 = hot face temperature, T2 = cold face temperature</li>
                <li className="pl-1">Heat flux (q) is heat flow per unit area</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: Wall Heat Loss</p>
              <p className="text-sm text-white mb-2">
                A 215mm solid brick wall (k = 0.77 W/m·K) separates a room at 20°C from outside at 0°C.
                Calculate the heat flux through the wall.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>q = k x dT / L</p>
                <p>q = 0.77 x (20 - 0) / 0.215</p>
                <p>q = 0.77 x 20 / 0.215</p>
                <p>q = <strong>71.6 W/m²</strong></p>
                <p className="mt-2 text-white/60">For a 10m² wall: Q = 71.6 x 10 = 716W heat loss</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Heat flow is proportional to temperature difference and inversely
              proportional to thickness. Doubling wall thickness halves heat loss.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Thermal Conductivity */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Thermal Conductivity of Materials
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thermal conductivity (k) is an intrinsic material property that quantifies how readily
              heat flows through a material. Low k-values indicate good insulators; high k-values
              indicate good thermal conductors.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Conductivity of Common Building Materials</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Material</th>
                      <th className="border border-white/10 px-3 py-2 text-left">k (W/m·K)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Classification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-red-900/10">
                      <td className="border border-white/10 px-3 py-2">Copper</td>
                      <td className="border border-white/10 px-3 py-2">385</td>
                      <td className="border border-white/10 px-3 py-2">Excellent conductor</td>
                    </tr>
                    <tr className="bg-red-900/10">
                      <td className="border border-white/10 px-3 py-2">Aluminium</td>
                      <td className="border border-white/10 px-3 py-2">205</td>
                      <td className="border border-white/10 px-3 py-2">Excellent conductor</td>
                    </tr>
                    <tr className="bg-red-900/10">
                      <td className="border border-white/10 px-3 py-2">Steel</td>
                      <td className="border border-white/10 px-3 py-2">50</td>
                      <td className="border border-white/10 px-3 py-2">Good conductor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dense concrete</td>
                      <td className="border border-white/10 px-3 py-2">1.4</td>
                      <td className="border border-white/10 px-3 py-2">Moderate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Brick (facing)</td>
                      <td className="border border-white/10 px-3 py-2">0.77</td>
                      <td className="border border-white/10 px-3 py-2">Moderate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lightweight block</td>
                      <td className="border border-white/10 px-3 py-2">0.19</td>
                      <td className="border border-white/10 px-3 py-2">Poor conductor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plasterboard</td>
                      <td className="border border-white/10 px-3 py-2">0.21</td>
                      <td className="border border-white/10 px-3 py-2">Poor conductor</td>
                    </tr>
                    <tr className="bg-green-900/10">
                      <td className="border border-white/10 px-3 py-2">Glass wool/mineral wool</td>
                      <td className="border border-white/10 px-3 py-2">0.035</td>
                      <td className="border border-white/10 px-3 py-2">Good insulator</td>
                    </tr>
                    <tr className="bg-green-900/10">
                      <td className="border border-white/10 px-3 py-2">Expanded polystyrene (EPS)</td>
                      <td className="border border-white/10 px-3 py-2">0.038</td>
                      <td className="border border-white/10 px-3 py-2">Good insulator</td>
                    </tr>
                    <tr className="bg-green-900/10">
                      <td className="border border-white/10 px-3 py-2">Polyurethane foam (PUR)</td>
                      <td className="border border-white/10 px-3 py-2">0.025</td>
                      <td className="border border-white/10 px-3 py-2">Excellent insulator</td>
                    </tr>
                    <tr className="bg-green-900/10">
                      <td className="border border-white/10 px-3 py-2">Phenolic foam</td>
                      <td className="border border-white/10 px-3 py-2">0.020</td>
                      <td className="border border-white/10 px-3 py-2">Excellent insulator</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Still air</td>
                      <td className="border border-white/10 px-3 py-2">0.025</td>
                      <td className="border border-white/10 px-3 py-2">Reference value</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Factors Affecting k-value</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Density:</strong> Denser materials typically conduct better</li>
                  <li className="pl-1"><strong>Moisture:</strong> Wet insulation conducts ~17x better</li>
                  <li className="pl-1"><strong>Temperature:</strong> k generally increases with temperature</li>
                  <li className="pl-1"><strong>Porosity:</strong> Air pockets reduce conductivity</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Insulators Work</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Trap still air (k = 0.025 W/m·K)</li>
                  <li className="pl-1">Fibrous/cellular structure limits convection</li>
                  <li className="pl-1">Low density reduces solid conduction paths</li>
                  <li className="pl-1">Must remain dry to maintain performance</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design note:</strong> When selecting insulation, consider not just k-value but also
              moisture resistance, fire performance, compressive strength, and long-term stability.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Steady-State vs Transient */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Steady-State vs Transient Conduction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Conduction problems are classified as either steady-state (temperatures constant over time)
              or transient (temperatures changing with time). Building services design typically uses
              steady-state analysis for sizing, but transient effects influence real-world performance.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Steady-State Conduction</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Temperature at any point is constant over time</li>
                  <li className="pl-1">Heat in = Heat out (no storage)</li>
                  <li className="pl-1">dT/dt = 0 (no time variation)</li>
                  <li className="pl-1">Used for design heat loss calculations</li>
                  <li className="pl-1">Simpler mathematics: Q = kAdT/L</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Transient Conduction</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Temperature varies with both position and time</li>
                  <li className="pl-1">Heat may be stored in the material</li>
                  <li className="pl-1">dT/dt does not equal 0 (time-dependent)</li>
                  <li className="pl-1">Warm-up periods, intermittent heating</li>
                  <li className="pl-1">Requires: dT/dt = a(d²T/dx²)</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Diffusivity</p>
              <p className="font-mono text-center text-lg mb-2">a = k / (p x c)</p>
              <div className="text-xs text-white/70 space-y-1 mt-3">
                <p><strong>a</strong> = Thermal diffusivity (m²/s)</p>
                <p><strong>k</strong> = Thermal conductivity (W/m·K)</p>
                <p><strong>p</strong> = Density (kg/m³)</p>
                <p><strong>c</strong> = Specific heat capacity (J/kg·K)</p>
              </div>
              <p className="text-sm text-white/90 mt-3">
                High a means rapid temperature response; low a means slow response (high thermal mass).
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Building Services Implications:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Thermal mass:</strong> Heavy construction smooths temperature swings</li>
                <li className="pl-1"><strong>Warm-up time:</strong> Heavyweight buildings need earlier heating start</li>
                <li className="pl-1"><strong>Intermittent heating:</strong> Transient effects affect efficiency</li>
                <li className="pl-1"><strong>Design loads:</strong> Steady-state used for peak load sizing</li>
                <li className="pl-1"><strong>Energy simulation:</strong> Dynamic modelling considers transient effects</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> For HNC calculations, assume steady-state unless told otherwise.
              Real building energy analysis uses dynamic simulation software that handles transient effects.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 4: Composite Walls and Thermal Resistance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Composite Walls, Series Resistance and Parallel Heat Paths
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Real walls comprise multiple layers, each with different thermal properties. The thermal
              resistance concept allows us to analyse these composite structures systematically, using
              methods analogous to electrical circuit analysis.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Resistance (R-value)</p>
              <div className="grid grid-cols-2 gap-3 text-center text-sm mb-4">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">R = L / k</p>
                  <p className="text-white/70 text-xs">For a solid layer</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Unit: m²·K/W</p>
                  <p className="text-white/70 text-xs">Higher = better insulation</p>
                </div>
              </div>
              <p className="text-sm text-white/90">
                Thermal resistance is the 'opposition' to heat flow. It's the thermal equivalent of electrical resistance.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Layers in Series (Typical Wall)</p>
              <p className="text-sm text-white mb-2">
                For layers stacked together (heat flows through each in turn):
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90 mb-3">
                <p>R_total = R_si + R1 + R2 + R3 + ... + R_se</p>
                <p className="mt-1 text-white/60">Where R_si = internal surface resistance (0.13 m²·K/W)</p>
                <p className="text-white/60">R_se = external surface resistance (0.04 m²·K/W)</p>
              </div>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Same heat flows through all layers</li>
                <li className="pl-1">Temperature drops across each layer proportional to its R-value</li>
                <li className="pl-1">Total dT = sum of individual dT values</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: Cavity Wall U-value</h3>
              <p className="text-sm text-white mb-2">
                Calculate the U-value of a cavity wall: 102mm brick (k=0.77), 50mm insulated cavity (k=0.035),
                100mm lightweight block (k=0.19), 13mm plaster (k=0.57).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>R_si = 0.13 m²·K/W (internal surface)</p>
                <p>R_brick = 0.102/0.77 = 0.132 m²·K/W</p>
                <p>R_cavity = 0.050/0.035 = 1.429 m²·K/W</p>
                <p>R_block = 0.100/0.19 = 0.526 m²·K/W</p>
                <p>R_plaster = 0.013/0.57 = 0.023 m²·K/W</p>
                <p>R_se = 0.04 m²·K/W (external surface)</p>
                <p className="mt-2">R_total = 0.13 + 0.132 + 1.429 + 0.526 + 0.023 + 0.04</p>
                <p>R_total = <strong>2.28 m²·K/W</strong></p>
                <p className="mt-2">U = 1/R_total = 1/2.28 = <strong>0.44 W/m²·K</strong></p>
                <p className="mt-2 text-orange-400">Note: Does not meet Building Regs (0.26) - needs more insulation</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Parallel Heat Paths (Thermal Bridges)</p>
              <p className="text-sm text-white mb-2">
                When heat can take alternative routes (e.g., through mortar joints or steel beams):
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90 mb-3">
                <p>1/R_total = (A1/R1 + A2/R2) / A_total</p>
                <p className="mt-1 text-white/60">Or for conductances: U_avg = (A1 x U1 + A2 x U2) / A_total</p>
              </div>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Same temperature difference across parallel paths</li>
                <li className="pl-1">Heat flow divides according to conductance</li>
                <li className="pl-1">More heat flows through lower resistance path</li>
                <li className="pl-1">Steel lintels, mortar joints, wall ties act as thermal bridges</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Thermal Bridges in Buildings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Bridge Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cause</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Mitigation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Steel lintel</td>
                      <td className="border border-white/10 px-3 py-2">Steel k approx 50 W/m·K vs insulation</td>
                      <td className="border border-white/10 px-3 py-2">Insulated lintels, thermal breaks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Window reveals</td>
                      <td className="border border-white/10 px-3 py-2">Insulation discontinuity at openings</td>
                      <td className="border border-white/10 px-3 py-2">Return insulation into reveals</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wall ties</td>
                      <td className="border border-white/10 px-3 py-2">Metal penetrating cavity</td>
                      <td className="border border-white/10 px-3 py-2">Stainless/plastic ties, thermal clips</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Floor edge</td>
                      <td className="border border-white/10 px-3 py-2">Concrete slab bridging wall</td>
                      <td className="border border-white/10 px-3 py-2">Perimeter insulation, thermal blocks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mortar joints</td>
                      <td className="border border-white/10 px-3 py-2">Mortar k approx 0.8 vs block k approx 0.19</td>
                      <td className="border border-white/10 px-3 py-2">Thin-joint systems, insulated mortar</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical point:</strong> Thermal bridges can cause localised cold spots where surface
              temperatures drop below dewpoint, leading to condensation, mould growth, and structural damage.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Building Services Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Building Services Applications</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pipe Insulation</h3>
              <p className="text-sm text-white mb-3">
                Pipe insulation is essential for LPHW/MTHW systems to minimise distribution losses
                and maintain water temperatures. BS 5422 specifies minimum insulation thicknesses.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Pipe OD (mm)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Hot Water (min)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Chilled Water (min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">15-22</td>
                      <td className="border border-white/10 px-3 py-2">20mm</td>
                      <td className="border border-white/10 px-3 py-2">13mm + VCL</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">28-42</td>
                      <td className="border border-white/10 px-3 py-2">25mm</td>
                      <td className="border border-white/10 px-3 py-2">19mm + VCL</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">54-76</td>
                      <td className="border border-white/10 px-3 py-2">30mm</td>
                      <td className="border border-white/10 px-3 py-2">25mm + VCL</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">89-114</td>
                      <td className="border border-white/10 px-3 py-2">35mm</td>
                      <td className="border border-white/10 px-3 py-2">32mm + VCL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">
                VCL = Vapour Control Layer (essential for chilled water to prevent condensation)
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example: Pipe Heat Loss Calculation</h3>
              <p className="text-sm text-white mb-2">
                Calculate the heat loss per metre from a 42mm OD LPHW pipe at 80°C in a 20°C plantroom,
                with and without 25mm insulation (k = 0.035 W/m·K).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Uninsulated (using simplified formula for bare pipe):</p>
                <p>q approx pi x D x h x dT approx 3.14 x 0.042 x 10 x 60</p>
                <p>q approx <strong>79 W/m</strong></p>
                <p className="mt-3 text-white/60">Insulated (cylindrical coordinates):</p>
                <p>R_ins = ln(r2/r1) / (2 x pi x k) = ln(46/21) / (2 x 3.14 x 0.035)</p>
                <p>R_ins = 0.784 / 0.22 = 3.56 m·K/W</p>
                <p>q = dT / R_ins = 60 / 3.56 = <strong>16.8 W/m</strong></p>
                <p className="mt-2 text-green-400">Heat loss reduction: 79% (typical for 25mm insulation)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Wall Construction for Building Regulations</h3>
              <p className="text-sm text-white mb-3">
                To achieve U of 0.26 W/m²·K or less (Building Regs Part L), typical constructions require:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Full-fill cavity:</strong> 100-150mm mineral wool in 150mm cavity</li>
                <li className="pl-1"><strong>Partial fill + PIR:</strong> 50mm PIR boards + 50mm clear cavity</li>
                <li className="pl-1"><strong>External insulation:</strong> 80-100mm EPS/phenolic on masonry</li>
                <li className="pl-1"><strong>Timber frame:</strong> 140mm studs fully filled + service void</li>
              </ul>
              <p className="text-sm text-white/90 mt-3">
                Remember to include thermal bridging allowances - typically add 10-15% to U-value calculations.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>q = k x dT/L</strong> - Heat flux (W/m²)</li>
                <li className="pl-1"><strong>Q = k x A x dT/L</strong> - Total heat flow (W)</li>
                <li className="pl-1"><strong>R = L/k</strong> - Thermal resistance of a layer</li>
                <li className="pl-1"><strong>R_total = sum of R</strong> - Series resistances add</li>
                <li className="pl-1"><strong>U = 1/R_total</strong> - Overall U-value</li>
                <li className="pl-1"><strong>a = k/(p x c)</strong> - Thermal diffusivity</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">R_si (internal surface): <strong>0.13 m²·K/W</strong></li>
                <li className="pl-1">R_se (external surface): <strong>0.04 m²·K/W</strong></li>
                <li className="pl-1">Mineral wool k: <strong>0.035 W/m·K</strong></li>
                <li className="pl-1">PIR/PUR k: <strong>0.022-0.025 W/m·K</strong></li>
                <li className="pl-1">Building Regs wall U-value: <strong>0.26 W/m²·K or less</strong></li>
                <li className="pl-1">Building Regs floor U-value: <strong>0.18 W/m²·K or less</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Unit confusion:</strong> Convert mm to m for thickness (100mm = 0.1m)</li>
                <li className="pl-1"><strong>Forgetting surface resistances:</strong> Always include R_si and R_se</li>
                <li className="pl-1"><strong>Ignoring thermal bridges:</strong> Can add 10-30% to heat loss</li>
                <li className="pl-1"><strong>Using dry k-values for wet conditions:</strong> Wet insulation fails</li>
                <li className="pl-1"><strong>U vs R confusion:</strong> U = 1/R (they're reciprocals)</li>
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
                <p className="font-medium text-white mb-1">Conduction Fundamentals</p>
                <ul className="space-y-0.5">
                  <li>Fourier's Law: Q = -kA(dT/dx)</li>
                  <li>Heat flux: q = k x dT/L (W/m²)</li>
                  <li>R-value: R = L/k (m²·K/W)</li>
                  <li>U-value: U = 1/R_total (W/m²·K)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Building Services Values</p>
                <ul className="space-y-0.5">
                  <li>Wall U-value limit: 0.26 W/m²·K or less</li>
                  <li>R_si = 0.13, R_se = 0.04 m²·K/W</li>
                  <li>Insulation k: 0.020-0.040 W/m·K</li>
                  <li>Pipe insulation saves ~90% heat loss</li>
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
            <Link to="../h-n-c-module2-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section1-2">
              Next: Convection
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section1_1;
