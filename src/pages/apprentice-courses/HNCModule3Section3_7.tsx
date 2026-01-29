import { ArrowLeft, Triangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Power Triangle and Efficiency - HNC Module 3 Section 3.7";
const DESCRIPTION = "Master the power triangle relationship between real, reactive and apparent power. Learn efficiency calculations for motors, transformers and building services systems including IE ratings and Part L compliance.";

const quickCheckQuestions = [
  {
    id: "power-triangle-relationship",
    question: "In a power triangle, what is the relationship between S, P and Q?",
    options: ["S = P + Q", "S² = P² + Q²", "S = P × Q", "S = P - Q"],
    correctIndex: 1,
    explanation: "The power triangle follows Pythagoras' theorem: S² = P² + Q². Apparent power (S) is the hypotenuse, with real power (P) as the adjacent side and reactive power (Q) as the opposite side."
  },
  {
    id: "efficiency-formula",
    question: "What is the correct formula for efficiency?",
    options: ["η = Pin / Pout × 100%", "η = Pout / Pin × 100%", "η = (Pin - Pout) × 100%", "η = Pout + losses"],
    correctIndex: 1,
    explanation: "Efficiency η = Pout / Pin × 100%. This represents the percentage of input power that is converted to useful output power. The remainder is lost as heat, noise, or other forms."
  },
  {
    id: "ie3-motor",
    question: "What IE efficiency class is mandatory for most new motors in the EU/UK since 2017?",
    options: ["IE1 Standard", "IE2 High", "IE3 Premium", "IE4 Super Premium"],
    correctIndex: 2,
    explanation: "IE3 Premium efficiency motors became mandatory for most applications (0.75kW to 375kW) from 2017. IE4 is increasingly required for certain applications from 2023."
  },
  {
    id: "transformer-efficiency",
    question: "A transformer has 500W iron losses and 800W copper losses at full load. With 50kW output, what is its efficiency?",
    options: ["96.5%", "97.4%", "98.7%", "99.2%"],
    correctIndex: 1,
    explanation: "η = Pout / (Pout + losses) = 50000 / (50000 + 500 + 800) = 50000 / 51300 = 0.9746 = 97.4%. Transformer efficiency is typically very high at 95-99%."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In a power triangle, which power component forms the horizontal (adjacent) side?",
    options: [
      "Reactive power (Q)",
      "Apparent power (S)",
      "Real power (P)",
      "Power factor"
    ],
    correctAnswer: 2,
    explanation: "Real power (P) in kW forms the horizontal (adjacent) side of the power triangle. Reactive power (Q) is vertical (opposite), and apparent power (S) is the hypotenuse."
  },
  {
    id: 2,
    question: "A motor draws 50kVA at 0.8 power factor lagging. What is the reactive power?",
    options: ["30 kVAr", "40 kVAr", "50 kVAr", "62.5 kVAr"],
    correctAnswer: 0,
    explanation: "Using Q = S × sin φ, where sin φ = √(1 - cos²φ) = √(1 - 0.64) = 0.6. Therefore Q = 50 × 0.6 = 30 kVAr. Alternatively, P = 50 × 0.8 = 40kW, then Q = √(50² - 40²) = 30 kVAr."
  },
  {
    id: 3,
    question: "What does the angle φ (phi) represent in the power triangle?",
    options: [
      "The efficiency of the system",
      "The phase angle between voltage and current",
      "The power loss percentage",
      "The harmonic distortion"
    ],
    correctAnswer: 1,
    explanation: "The angle φ represents the phase angle between voltage and current. Its cosine (cos φ) gives the power factor. A larger angle means more reactive power and lower power factor."
  },
  {
    id: 4,
    question: "A 15kW motor operates at 92% efficiency. What is the input power required?",
    options: ["13.8kW", "15kW", "16.3kW", "17.4kW"],
    correctAnswer: 2,
    explanation: "Pin = Pout / η = 15kW / 0.92 = 16.3kW. The motor requires more input power than its output rating due to internal losses."
  },
  {
    id: 5,
    question: "Which losses occur in a transformer regardless of load?",
    options: ["Copper losses only", "Iron (core) losses only", "Both copper and iron losses", "Neither - all losses are load-dependent"],
    correctAnswer: 1,
    explanation: "Iron (core) losses occur whenever the transformer is energised, regardless of load. They include hysteresis and eddy current losses. Copper (I²R) losses vary with load current."
  },
  {
    id: 6,
    question: "An IE4 motor compared to an IE2 motor of the same rating typically offers:",
    options: [
      "2-3% higher efficiency",
      "5-10% higher efficiency",
      "The same efficiency but longer life",
      "Lower efficiency but lower cost"
    ],
    correctAnswer: 0,
    explanation: "IE4 Super Premium motors typically offer 2-3% higher efficiency than IE2 High efficiency motors. While this seems small, over years of operation, the energy savings are substantial."
  },
  {
    id: 7,
    question: "For a system with two components in series (η₁ = 95%, η₂ = 90%), what is the overall efficiency?",
    options: ["185%", "92.5%", "85.5%", "90%"],
    correctAnswer: 2,
    explanation: "For series components, multiply efficiencies: η_total = η₁ × η₂ = 0.95 × 0.90 = 0.855 = 85.5%. Each stage reduces overall efficiency."
  },
  {
    id: 8,
    question: "Building Regulations Part L requires consideration of which aspect related to power and efficiency?",
    options: [
      "Power factor correction only",
      "Motor starting currents only",
      "Energy efficiency of fixed building services",
      "Harmonic distortion levels"
    ],
    correctAnswer: 2,
    explanation: "Part L requires consideration of energy efficiency for fixed building services including HVAC, lighting, and hot water systems. High-efficiency equipment helps achieve compliance."
  },
  {
    id: 9,
    question: "At what load condition does a transformer typically achieve maximum efficiency?",
    options: [
      "No load",
      "When copper losses equal iron losses",
      "Full load",
      "150% overload"
    ],
    correctAnswer: 1,
    explanation: "Transformer efficiency is maximum when variable (copper) losses equal constant (iron) losses. This typically occurs at 50-75% of full load, making transformers most efficient at typical operating loads."
  },
  {
    id: 10,
    question: "A building has 200kW of motor loads at average 90% efficiency running 3000 hours/year. If motors are upgraded to 95% efficiency, what is the annual energy saving?",
    options: ["5,263 kWh", "11,696 kWh", "31,579 kWh", "35,088 kWh"],
    correctAnswer: 2,
    explanation: "Original input: 200/0.90 = 222.2kW. New input: 200/0.95 = 210.5kW. Saving: (222.2 - 210.5) × 3000 = 11.7kW × 3000 = 35,100 kWh, closest to 35,088 kWh."
  }
];

const faqs = [
  {
    question: "Why is the power triangle important in building services design?",
    answer: "The power triangle helps engineers understand the relationship between real power (kW - what does useful work), reactive power (kVAr - circulates in the system), and apparent power (kVA - what must be supplied). Cables, transformers and switchgear must be sized for apparent power (kVA), while energy bills are based on real power (kWh). Poor power factor means oversized equipment and potentially reactive power charges."
  },
  {
    question: "How do I calculate efficiency losses in a complete system?",
    answer: "For components in series (e.g., VSD feeding a motor driving a pump), multiply individual efficiencies: η_total = η_VSD × η_motor × η_pump. For a 97% efficient VSD, 92% motor, and 75% pump: 0.97 × 0.92 × 0.75 = 67% overall. Always start from the load and work back to determine required input power."
  },
  {
    question: "What are the main sources of motor losses?",
    answer: "Motor losses include: stator copper losses (I²R in windings), rotor copper losses, iron/core losses (hysteresis and eddy currents), mechanical losses (friction and windage), and stray load losses. Higher IE-class motors reduce these through better materials, tighter tolerances, and optimised electromagnetic design."
  },
  {
    question: "When should I specify an IE4 motor instead of IE3?",
    answer: "Specify IE4 for motors with high running hours (>4000 hours/year), constant load applications, and where payback calculations justify the premium. From July 2023, IE4 became mandatory for certain motor types (75-200kW, 2, 4, and 6 pole). The 2-3% efficiency gain compounds significantly over a motor's 15-20 year life."
  },
  {
    question: "How does Part L affect equipment selection?",
    answer: "Building Regulations Part L requires energy-efficient fixed building services. This affects selection of motors (minimum IE3/IE4), lighting (efficacy requirements), HVAC equipment (SEER/SCOP ratings), pumps, and fans. Compliance is demonstrated through BRUKL calculations and actual equipment specifications must match or exceed design assumptions."
  },
  {
    question: "What is the difference between iron losses and copper losses in transformers?",
    answer: "Iron (core) losses are constant whenever the transformer is energised - they don't depend on load. They include hysteresis losses (energy to magnetise/demagnetise the core each cycle) and eddy current losses (circulating currents in the core). Copper losses (I²R) vary with the square of load current and occur in the windings. At light loads, iron losses dominate; at heavy loads, copper losses dominate."
  }
];

const HNCModule3Section3_7 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section3">
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
            <Triangle className="h-4 w-4" />
            <span>Module 3.3.7</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Power Triangle and Efficiency
          </h1>
          <p className="text-white/80">
            Graphical representation of power relationships and system efficiency calculations for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Power triangle:</strong> P, Q, S form right-angled triangle</li>
              <li className="pl-1"><strong>Pythagoras:</strong> S² = P² + Q² (fundamental relationship)</li>
              <li className="pl-1"><strong>Efficiency:</strong> η = Pout/Pin × 100% (always &lt;100%)</li>
              <li className="pl-1"><strong>System efficiency:</strong> Multiply individual efficiencies</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Motor IE ratings:</strong> IE3 minimum, IE4 for high hours</li>
              <li className="pl-1"><strong>Transformer losses:</strong> Iron + copper losses</li>
              <li className="pl-1"><strong>Part L compliance:</strong> Energy efficiency requirements</li>
              <li className="pl-1"><strong>Energy audits:</strong> Identify efficiency improvements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Construct and interpret the power triangle for AC circuits",
              "Apply Pythagoras' theorem to calculate P, Q and S",
              "Calculate efficiency for motors, transformers and systems",
              "Understand motor IE efficiency classifications",
              "Analyse transformer losses and efficiency conditions",
              "Apply efficiency calculations to Part L compliance"
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

        {/* Section 1: Power Triangle Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Power Triangle - P, Q, S Relationship
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The power triangle is a graphical representation of the relationship between real power (P),
              reactive power (Q) and apparent power (S) in AC circuits. It provides an intuitive way to
              visualise how these three power components relate to each other and to power factor.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Power Triangle Components:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Real Power (P):</strong> Horizontal side - measured in kW - does useful work</li>
                <li className="pl-1"><strong>Reactive Power (Q):</strong> Vertical side - measured in kVAr - energy storage in L and C</li>
                <li className="pl-1"><strong>Apparent Power (S):</strong> Hypotenuse - measured in kVA - total power supplied</li>
                <li className="pl-1"><strong>Phase Angle (φ):</strong> Angle between P and S - determines power factor</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Power Triangle Diagram</p>
              <div className="bg-black/30 p-4 rounded font-mono text-sm text-center">
                <pre className="text-white/90 inline-block text-left">
{`           S (kVA)
          /|
         / |
        /  | Q (kVAr)
       /   |
      /φ   |
     /_____|
       P (kW)

  S = Apparent Power (hypotenuse)
  P = Real Power (adjacent)
  Q = Reactive Power (opposite)
  φ = Phase angle
  cos φ = Power Factor = P/S`}
                </pre>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Relationships</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">P = S × cos φ</p>
                  <p className="text-white/70 text-xs">Real power</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Q = S × sin φ</p>
                  <p className="text-white/70 text-xs">Reactive power</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">cos φ = P / S</p>
                  <p className="text-white/70 text-xs">Power factor</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">tan φ = Q / P</p>
                  <p className="text-white/70 text-xs">Q/P ratio</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> For inductive loads (motors, transformers), Q is positive (lagging). For capacitive loads, Q is negative (leading). The triangle helps visualise the effect of power factor correction.
            </p>
          </div>
        </section>

        {/* Section 2: Pythagoras and the Power Triangle */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Pythagoras' Theorem: S² = P² + Q²
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Since the power triangle is a right-angled triangle, Pythagoras' theorem applies directly.
              This fundamental relationship allows calculation of any unknown power component when two are known.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Fundamental Equation</p>
              <p className="font-mono text-center text-xl mb-2">S² = P² + Q²</p>
              <p className="text-xs text-white/70 text-center">Apparent power squared equals real power squared plus reactive power squared</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Rearranged Forms:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">To Find</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Apparent Power (S)</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">S = √(P² + Q²)</td>
                      <td className="border border-white/10 px-3 py-2">√(40² + 30²) = 50 kVA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Real Power (P)</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">P = √(S² - Q²)</td>
                      <td className="border border-white/10 px-3 py-2">√(50² - 30²) = 40 kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reactive Power (Q)</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">Q = √(S² - P²)</td>
                      <td className="border border-white/10 px-3 py-2">√(50² - 40²) = 30 kVAr</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Alternative Using Power Factor</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>S = P / cos φ</strong> — Calculate S when P and pf are known</li>
                <li className="pl-1"><strong>Q = P × tan φ</strong> — Calculate Q when P and pf are known</li>
                <li className="pl-1"><strong>sin φ = √(1 - cos²φ)</strong> — Convert power factor to sin for Q calculations</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Equipment (cables, transformers, switchgear) must be rated for apparent power S, not real power P. A 100kW load at 0.8 pf requires 125kVA capacity.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Graphical Representation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Graphical Representation and Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The power triangle provides valuable visual insight into system behaviour and the effects
              of power factor correction. Understanding these graphical relationships is essential for
              building services design.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Factor Correction Visualised</p>
              <div className="bg-black/30 p-4 rounded font-mono text-sm">
                <pre className="text-white/90">
{`Before PFC (pf = 0.7):        After PFC (pf = 0.95):

    S₁=143kVA                    S₂=105kVA
      /|                           /|
     / |                          / |
    /  | Q₁=102kVAr              /  | Q₂=33kVAr
   /   |                        /   |
  /45° |                       /18° |
 /_____|                      /_____|
  P=100kW                      P=100kW

Capacitor added: Qc = 102 - 33 = 69 kVAr
Result: 27% reduction in apparent power (S)`}
                </pre>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">What the Triangle Shows:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Angle φ:</strong> Larger angle = lower power factor = more reactive power</li>
                <li className="pl-1"><strong>PFC effect:</strong> Reduces Q, therefore reduces S while P stays constant</li>
                <li className="pl-1"><strong>Capacity release:</strong> Lower S means existing cables/transformers can serve more real load</li>
                <li className="pl-1"><strong>Unity pf:</strong> Triangle collapses to a line (Q = 0, S = P)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Power Factor Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Load Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical pf</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Phase Angle φ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Resistive (heaters, incandescent)</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">0°</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED drivers (with PFC)</td>
                      <td className="border border-white/10 px-3 py-2">0.90-0.95</td>
                      <td className="border border-white/10 px-3 py-2">18-26°</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Induction motors (full load)</td>
                      <td className="border border-white/10 px-3 py-2">0.80-0.90</td>
                      <td className="border border-white/10 px-3 py-2">26-37°</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Induction motors (light load)</td>
                      <td className="border border-white/10 px-3 py-2">0.40-0.60</td>
                      <td className="border border-white/10 px-3 py-2">53-66°</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Welding equipment</td>
                      <td className="border border-white/10 px-3 py-2">0.50-0.70</td>
                      <td className="border border-white/10 px-3 py-2">45-60°</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Practical note:</strong> Most DNOs and large suppliers charge reactive power penalties when power factor falls below 0.95 lagging. The power triangle helps calculate the capacitor kVAr needed for correction.
            </p>
          </div>
        </section>

        {/* Section 4: Efficiency Fundamentals */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Efficiency - η = Pout/Pin × 100%
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Efficiency measures how effectively a device converts input power to useful output power.
              In building services, understanding efficiency is critical for equipment selection, energy
              calculations and regulatory compliance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Efficiency Equation</p>
              <p className="font-mono text-center text-xl mb-2">η = (P<sub>out</sub> / P<sub>in</sub>) × 100%</p>
              <p className="text-xs text-white/70 text-center">Efficiency equals output power divided by input power, expressed as a percentage</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Alternative Forms:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>η = Pout / Pin</strong> — Basic ratio (as decimal)</li>
                    <li className="pl-1"><strong>η = (Pin - Losses) / Pin</strong> — Using losses</li>
                    <li className="pl-1"><strong>Losses = Pin - Pout</strong> — Power dissipated</li>
                  </ul>
                </div>
                <div>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Pin = Pout / η</strong> — Input from output</li>
                    <li className="pl-1"><strong>Pout = Pin × η</strong> — Output from input</li>
                    <li className="pl-1"><strong>Losses = Pin × (1 - η)</strong> — Loss calculation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Efficiency in Energy Terms</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Energy efficiency over time:</p>
                <p className="mt-2">η = E<sub>out</sub> / E<sub>in</sub> = (P<sub>out</sub> × t) / (P<sub>in</sub> × t)</p>
                <p className="mt-2">Annual energy loss = P<sub>in</sub> × (1 - η) × operating hours</p>
                <p className="mt-2 text-white/60">Example: 50kW motor at 92% efficiency, 4000 hrs/year</p>
                <p>Input = 50/0.92 = 54.3kW, Losses = 4.3kW</p>
                <p>Annual loss = 4.3 × 4000 = 17,200 kWh</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Efficiency is always less than 100% due to unavoidable losses. Even small efficiency improvements yield significant savings over equipment lifetime.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Motor Efficiency and IE Ratings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Motor Efficiency and IE Classifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electric motors consume approximately 45% of global electricity. The International Efficiency
              (IE) classification system standardises motor efficiency ratings, with minimum requirements
              set by EU Ecodesign regulations applicable in the UK.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IE Efficiency Classes (IEC 60034-30-1)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Class</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Name</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical η (11kW, 4-pole)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IE1</td>
                      <td className="border border-white/10 px-3 py-2">Standard</td>
                      <td className="border border-white/10 px-3 py-2">87.6%</td>
                      <td className="border border-white/10 px-3 py-2">Not permitted (new)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IE2</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">89.8%</td>
                      <td className="border border-white/10 px-3 py-2">With VSD only</td>
                    </tr>
                    <tr className="bg-elec-yellow/10">
                      <td className="border border-white/10 px-3 py-2">IE3</td>
                      <td className="border border-white/10 px-3 py-2">Premium</td>
                      <td className="border border-white/10 px-3 py-2">91.4%</td>
                      <td className="border border-white/10 px-3 py-2">Minimum (DOL)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IE4</td>
                      <td className="border border-white/10 px-3 py-2">Super Premium</td>
                      <td className="border border-white/10 px-3 py-2">92.6%</td>
                      <td className="border border-white/10 px-3 py-2">Required 75-200kW (2023)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IE5</td>
                      <td className="border border-white/10 px-3 py-2">Ultra Premium</td>
                      <td className="border border-white/10 px-3 py-2">93.9%</td>
                      <td className="border border-white/10 px-3 py-2">Best available</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Current UK/EU Regulations (from July 2023):</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>0.75-1000kW:</strong> IE3 minimum for direct-on-line starting</li>
                <li className="pl-1"><strong>0.75-1000kW with VSD:</strong> IE2 minimum permitted</li>
                <li className="pl-1"><strong>75-200kW (2,4,6 pole):</strong> IE4 mandatory</li>
                <li className="pl-1"><strong>Exemptions:</strong> ATEX, high altitude, specific duty applications</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Loss Categories</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stator copper losses:</strong> I²R losses in stator windings (largest component)</li>
                <li className="pl-1"><strong>Rotor copper losses:</strong> I²R losses in rotor (induction motors)</li>
                <li className="pl-1"><strong>Iron/core losses:</strong> Hysteresis and eddy currents in laminations</li>
                <li className="pl-1"><strong>Mechanical losses:</strong> Bearing friction and windage (fan cooling)</li>
                <li className="pl-1"><strong>Stray load losses:</strong> Leakage flux and harmonic effects</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection guidance:</strong> For motors running &gt;4000 hours/year at &gt;75% load, IE4 typically pays back within 2-3 years despite higher purchase cost.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: Transformer Efficiency */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Transformer Efficiency
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Transformers are highly efficient devices (typically 95-99%), but given their continuous
              operation and the large powers involved, even small efficiency improvements translate to
              significant energy and cost savings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transformer Losses</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Iron (Core) Losses - Constant</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Occur whenever energised</li>
                    <li>Independent of load</li>
                    <li>Hysteresis losses (magnetisation)</li>
                    <li>Eddy current losses</li>
                    <li>Also called "no-load losses"</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Copper (Winding) Losses - Variable</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Vary with load current</li>
                    <li>Proportional to I² (load squared)</li>
                    <li>I²R losses in windings</li>
                    <li>Also called "load losses"</li>
                    <li>Quadruple if load doubles</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transformer Efficiency Formula</p>
              <p className="font-mono text-center mb-2">η = P<sub>out</sub> / (P<sub>out</sub> + P<sub>iron</sub> + P<sub>copper</sub>) × 100%</p>
              <p className="text-xs text-white/70 text-center">Or equivalently: η = P<sub>out</sub> / P<sub>in</sub> × 100%</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Condition for Maximum Efficiency:</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Maximum efficiency occurs when:</p>
                <p className="text-elec-yellow mt-2">Iron losses = Copper losses</p>
                <p className="mt-2">Since copper losses = P<sub>Cu(FL)</sub> × (Load fraction)²</p>
                <p>And iron losses are constant...</p>
                <p className="mt-2">Load for max η = √(P<sub>iron</sub> / P<sub>Cu(FL)</sub>) × Full load</p>
                <p className="mt-2 text-white/60">Typically occurs at 50-75% of rated load</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Transformer Efficiencies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100 kVA</td>
                      <td className="border border-white/10 px-3 py-2">Oil-filled distribution</td>
                      <td className="border border-white/10 px-3 py-2">98.0-98.5%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">500 kVA</td>
                      <td className="border border-white/10 px-3 py-2">Oil-filled distribution</td>
                      <td className="border border-white/10 px-3 py-2">98.5-99.0%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1000 kVA</td>
                      <td className="border border-white/10 px-3 py-2">Dry-type (cast resin)</td>
                      <td className="border border-white/10 px-3 py-2">98.0-98.5%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10-50 kVA</td>
                      <td className="border border-white/10 px-3 py-2">Control/isolation</td>
                      <td className="border border-white/10 px-3 py-2">95.0-97.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>EU Ecodesign:</strong> Regulation 2019/1783 sets minimum efficiency (Tier 2 from July 2021) for distribution transformers 50kVA - 40MVA. Specify compliant transformers for new installations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 7: System Efficiency Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            System Efficiency Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Real building services systems comprise multiple components in series. Understanding how
              to calculate overall system efficiency is essential for accurate energy modelling and
              equipment sizing.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Series Efficiency Rule</p>
              <p className="font-mono text-center text-lg mb-2">η<sub>total</sub> = η<sub>1</sub> × η<sub>2</sub> × η<sub>3</sub> × ... × η<sub>n</sub></p>
              <p className="text-xs text-white/70 text-center">For components in series, multiply individual efficiencies</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example: Variable Speed Pump System</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Components in series:</p>
                <p className="mt-2">Transformer: η = 98.5%</p>
                <p>Variable Speed Drive: η = 97%</p>
                <p>Motor (IE3, 15kW): η = 92%</p>
                <p>Pump: η = 75%</p>
                <p className="mt-3">Overall efficiency:</p>
                <p>η<sub>total</sub> = 0.985 × 0.97 × 0.92 × 0.75</p>
                <p className="text-elec-yellow">η<sub>total</sub> = 0.659 = 65.9%</p>
                <p className="mt-3 text-white/60">To deliver 10kW hydraulic power:</p>
                <p>Electrical input = 10 / 0.659 = 15.2 kW</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical System Component Efficiencies:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution transformer</td>
                      <td className="border border-white/10 px-3 py-2">98-99%</td>
                      <td className="border border-white/10 px-3 py-2">Higher for larger units</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Variable Speed Drive</td>
                      <td className="border border-white/10 px-3 py-2">95-98%</td>
                      <td className="border border-white/10 px-3 py-2">Lower at low speeds</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IE3 Motor (11-90kW)</td>
                      <td className="border border-white/10 px-3 py-2">90-94%</td>
                      <td className="border border-white/10 px-3 py-2">At rated load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Centrifugal pump</td>
                      <td className="border border-white/10 px-3 py-2">60-85%</td>
                      <td className="border border-white/10 px-3 py-2">At BEP; lower off-design</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Centrifugal fan</td>
                      <td className="border border-white/10 px-3 py-2">65-85%</td>
                      <td className="border border-white/10 px-3 py-2">At BEP; lower off-design</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Belt drive</td>
                      <td className="border border-white/10 px-3 py-2">95-98%</td>
                      <td className="border border-white/10 px-3 py-2">Direct drive avoids this</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gearbox</td>
                      <td className="border border-white/10 px-3 py-2">95-98%</td>
                      <td className="border border-white/10 px-3 py-2">Per stage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design insight:</strong> The lowest-efficiency component dominates system performance. Improving pump efficiency from 70% to 80% saves more energy than improving a 95% motor to 97%.
            </p>
          </div>
        </section>

        {/* Section 8: Building Services Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services: Equipment Efficiency and Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding efficiency is essential for building services engineers to select appropriate
              equipment, demonstrate regulatory compliance, and identify opportunities for energy savings
              through audits and upgrades.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Regulations Part L Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fixed building services:</strong> Must meet minimum efficiency standards</li>
                <li className="pl-1"><strong>HVAC systems:</strong> SEER (cooling) and SCOP (heating) ratings apply</li>
                <li className="pl-1"><strong>Lighting:</strong> Luminous efficacy and control requirements</li>
                <li className="pl-1"><strong>Motors and drives:</strong> IE class requirements as per Ecodesign</li>
                <li className="pl-1"><strong>BRUKL compliance:</strong> As-built specifications must match or exceed design</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Audits - Key Efficiency Checks</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Efficiency Indicators</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Improvement Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motors</td>
                      <td className="border border-white/10 px-3 py-2">IE class, loading factor, running hours</td>
                      <td className="border border-white/10 px-3 py-2">Upgrade to IE4, right-size, add VSD</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformers</td>
                      <td className="border border-white/10 px-3 py-2">No-load losses, loading pattern</td>
                      <td className="border border-white/10 px-3 py-2">Low-loss cores, right-sizing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">Luminous efficacy (lm/W), controls</td>
                      <td className="border border-white/10 px-3 py-2">LED retrofit, presence/daylight sensing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC</td>
                      <td className="border border-white/10 px-3 py-2">SEER, SCOP, fan/pump efficiency</td>
                      <td className="border border-white/10 px-3 py-2">High-efficiency chillers, VSDs on AHUs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power factor</td>
                      <td className="border border-white/10 px-3 py-2">Site pf, reactive power charges</td>
                      <td className="border border-white/10 px-3 py-2">PFC capacitors, active filters</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Life Cycle Cost Analysis</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Comparing IE3 vs IE4 motor (15kW, 4000 hrs/year, 12p/kWh):</p>
                <p className="mt-2">IE3: η = 91.5%, Input = 15/0.915 = 16.39 kW</p>
                <p>IE4: η = 93.0%, Input = 15/0.930 = 16.13 kW</p>
                <p className="mt-2">Annual saving = (16.39 - 16.13) × 4000 × 0.12</p>
                <p className="text-elec-yellow">Annual saving = 0.26 × 4000 × 0.12 = £125/year</p>
                <p className="mt-2 text-white/60">If IE4 premium is £300, payback = 2.4 years</p>
                <p className="text-white/60">Over 15-year motor life: £1,875 net saving</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">ESOS and Energy Auditing Requirements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>ESOS (Energy Savings Opportunity Scheme):</strong> Large organisations must conduct energy audits every 4 years</li>
                <li className="pl-1"><strong>ISO 50001:</strong> Energy management certification (ESOS alternative)</li>
                <li className="pl-1"><strong>DEC (Display Energy Certificate):</strong> Public buildings must display energy performance</li>
                <li className="pl-1"><strong>MEES (Minimum Energy Efficiency Standards):</strong> EPC rating requirements for lettings</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Professional practice:</strong> Always document equipment efficiencies in design reports. This supports Part L compliance, future audits, and maintenance decisions.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Power Triangle Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A three-phase motor draws 75kVA at 0.85 power factor lagging. Calculate P, Q and verify using Pythagoras.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given: S = 75 kVA, cos φ = 0.85 (lagging)</p>
                <p className="mt-2">Real power: P = S × cos φ</p>
                <p>P = 75 × 0.85 = <strong>63.75 kW</strong></p>
                <p className="mt-2">Find sin φ: sin φ = √(1 - cos²φ) = √(1 - 0.7225) = 0.527</p>
                <p className="mt-2">Reactive power: Q = S × sin φ</p>
                <p>Q = 75 × 0.527 = <strong>39.5 kVAr</strong> (lagging)</p>
                <p className="mt-2">Verify: S² = P² + Q²</p>
                <p>75² = 63.75² + 39.5²</p>
                <p>5625 = 4064 + 1560 = 5624 (rounding)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Motor Efficiency and Running Costs</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 22kW IE3 motor (93% efficiency) runs 5000 hours/year. Calculate annual energy consumption and cost at 15p/kWh.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Shaft output power: P<sub>out</sub> = 22 kW</p>
                <p>Efficiency: η = 93% = 0.93</p>
                <p className="mt-2">Electrical input power:</p>
                <p>P<sub>in</sub> = P<sub>out</sub> / η = 22 / 0.93 = <strong>23.66 kW</strong></p>
                <p className="mt-2">Annual energy consumption:</p>
                <p>E = P<sub>in</sub> × hours = 23.66 × 5000 = <strong>118,300 kWh</strong></p>
                <p className="mt-2">Annual cost:</p>
                <p>Cost = 118,300 × £0.15 = <strong>£17,745/year</strong></p>
                <p className="mt-2 text-white/60">Power losses = 23.66 - 22 = 1.66 kW (dissipated as heat)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Transformer Efficiency at Part Load</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 500kVA transformer has 1.2kW iron losses and 6kW copper losses at full load. Calculate efficiency at full load and 50% load.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>At full load (assuming unity pf, so P<sub>out</sub> = 500kW):</strong></p>
                <p>Total losses = 1.2 + 6.0 = 7.2 kW</p>
                <p>η = 500 / (500 + 7.2) × 100 = <strong>98.58%</strong></p>
                <p className="mt-3"><strong>At 50% load (P<sub>out</sub> = 250kW):</strong></p>
                <p>Iron losses = 1.2 kW (constant)</p>
                <p>Copper losses = 6.0 × (0.5)² = 6.0 × 0.25 = 1.5 kW</p>
                <p>Total losses = 1.2 + 1.5 = 2.7 kW</p>
                <p>η = 250 / (250 + 2.7) × 100 = <strong>98.93%</strong></p>
                <p className="mt-2 text-green-400">Note: Higher efficiency at part load as iron is approximately equal to copper losses</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Complete Pump System Efficiency</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A HVAC pump system requires 8kW hydraulic power. Calculate the electrical input given: VSD 96%, motor 91%, pump 72%.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Required hydraulic output: P<sub>hydraulic</sub> = 8 kW</p>
                <p className="mt-2">System efficiency (series):</p>
                <p>η<sub>system</sub> = η<sub>VSD</sub> × η<sub>motor</sub> × η<sub>pump</sub></p>
                <p>η<sub>system</sub> = 0.96 × 0.91 × 0.72 = <strong>0.629 = 62.9%</strong></p>
                <p className="mt-2">Electrical input required:</p>
                <p>P<sub>elec</sub> = P<sub>hydraulic</sub> / η<sub>system</sub></p>
                <p>P<sub>elec</sub> = 8 / 0.629 = <strong>12.72 kW</strong></p>
                <p className="mt-2 text-white/60">Losses breakdown:</p>
                <p className="text-white/60">VSD: 12.72 × 0.04 = 0.51 kW</p>
                <p className="text-white/60">Motor: (12.72 - 0.51) × 0.09 = 1.10 kW</p>
                <p className="text-white/60">Pump: (12.72 - 0.51 - 1.10) × 0.28 = 3.11 kW</p>
                <p className="text-white/60">Total: 4.72 kW losses (37.1% of input)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulae</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>S² = P² + Q²</strong> — Pythagoras for power triangle</li>
                <li className="pl-1"><strong>P = S × cos φ</strong> — Real power from apparent</li>
                <li className="pl-1"><strong>Q = S × sin φ</strong> — Reactive power from apparent</li>
                <li className="pl-1"><strong>η = Pout / Pin × 100%</strong> — Efficiency definition</li>
                <li className="pl-1"><strong>η<sub>total</sub> = η₁ × η₂ × η₃</strong> — Series efficiency</li>
                <li className="pl-1"><strong>Pin = Pout / η</strong> — Input from output and efficiency</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">IE3 motor typical efficiency: <strong>90-94%</strong> (depends on size)</li>
                <li className="pl-1">Distribution transformer efficiency: <strong>98-99%</strong></li>
                <li className="pl-1">VSD efficiency: <strong>95-98%</strong> at rated speed</li>
                <li className="pl-1">Centrifugal pump BEP efficiency: <strong>70-85%</strong></li>
                <li className="pl-1">Target site power factor: <strong>&gt;0.95</strong> (avoid charges)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Adding efficiencies:</strong> Series efficiencies multiply, not add</li>
                <li className="pl-1"><strong>Confusing kW and kVA:</strong> Size equipment for kVA, pay for kWh</li>
                <li className="pl-1"><strong>Ignoring part-load:</strong> Equipment often runs at 30-70% load</li>
                <li className="pl-1"><strong>Full-load efficiency only:</strong> Efficiency varies with loading</li>
                <li className="pl-1"><strong>Forgetting copper loss varies:</strong> Copper losses are proportional to load² for transformers</li>
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
                <p className="font-medium text-white mb-1">Power Triangle</p>
                <ul className="space-y-0.5">
                  <li>P (kW) - Real power - horizontal</li>
                  <li>Q (kVAr) - Reactive power - vertical</li>
                  <li>S (kVA) - Apparent power - hypotenuse</li>
                  <li>cos φ = P/S = power factor</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Efficiency Standards</p>
                <ul className="space-y-0.5">
                  <li>IE3 Premium - minimum for DOL motors</li>
                  <li>IE4 Super Premium - 75-200kW from 2023</li>
                  <li>Part L - building services efficiency</li>
                  <li>ESOS - large org energy audits</li>
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
            <Link to="../h-n-c-module3-section3-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: True, Reactive and Apparent Power
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section4">
              Next: Section 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section3_7;
