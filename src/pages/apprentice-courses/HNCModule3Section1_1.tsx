import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Voltage, Current, Resistance and Power - HNC Module 3 Section 1.1";
const DESCRIPTION = "Master fundamental electrical quantities for building services: voltage, current, resistance and power calculations with practical applications in commercial installations.";

const quickCheckQuestions = [
  {
    id: "uk-voltage",
    question: "What is the standard UK single-phase supply voltage (RMS)?",
    options: ["220V", "230V", "240V", "250V"],
    correctIndex: 1,
    explanation: "UK single-phase supply is 230V AC RMS (±10% tolerance). This was harmonised with European standards, though historically the UK used 240V."
  },
  {
    id: "power-formula",
    question: "Which formula correctly relates power, voltage and current?",
    options: ["P = V/I", "P = V × I", "P = V + I", "P = I/V"],
    correctIndex: 1,
    explanation: "Power (in Watts) equals Voltage (in Volts) multiplied by Current (in Amps): P = V × I. This fundamental relationship is essential for all load calculations."
  },
  {
    id: "heater-current",
    question: "A 3kW heater operates at 230V. What current does it draw?",
    options: ["7.5A", "10A", "13A", "16A"],
    correctIndex: 2,
    explanation: "Using I = P/V: I = 3000W ÷ 230V = 13.04A ≈ 13A. This is why 3kW heaters typically require a 16A or 20A circuit."
  },
  {
    id: "resistance-unit",
    question: "What is the SI unit of electrical resistance?",
    options: ["Ampere", "Volt", "Ohm", "Watt"],
    correctIndex: 2,
    explanation: "Resistance is measured in Ohms (Ω), named after Georg Ohm who discovered the relationship between voltage, current and resistance."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is voltage?",
    options: [
      "The rate of flow of electric charge",
      "The opposition to current flow",
      "The electrical potential difference between two points",
      "The rate of energy transfer"
    ],
    correctAnswer: 2,
    explanation: "Voltage (V) is the electrical potential difference between two points, measured in Volts. It represents the 'pressure' that pushes electrons through a circuit."
  },
  {
    id: 2,
    question: "If a circuit has a resistance of 46Ω and draws 5A, what is the voltage across it?",
    options: ["9.2V", "23V", "41V", "230V"],
    correctAnswer: 3,
    explanation: "Using Ohm's Law: V = I × R = 5A × 46Ω = 230V"
  },
  {
    id: 3,
    question: "What is the relationship between power, current and resistance?",
    options: ["P = I/R", "P = I²R", "P = R/I²", "P = IR"],
    correctAnswer: 1,
    explanation: "P = I²R is one of the power equations derived from combining P = VI and V = IR. Power increases with the square of current, which is why cable sizing is critical."
  },
  {
    id: 4,
    question: "A commercial building has 50 LED luminaires each rated at 45W. What is the total lighting load?",
    options: ["1125W", "2250W", "2.25kW", "Both B and C are correct"],
    correctAnswer: 3,
    explanation: "Total power = 50 × 45W = 2250W = 2.25kW. Both answers represent the same value in different units."
  },
  {
    id: 5,
    question: "What maximum voltage is permitted for SELV circuits in bathrooms?",
    options: ["12V AC", "24V DC", "50V AC or 120V DC", "230V with RCD protection"],
    correctAnswer: 2,
    explanation: "SELV (Separated Extra-Low Voltage) is limited to 50V AC or 120V DC ripple-free. This provides protection against electric shock in wet environments."
  },
  {
    id: 6,
    question: "A 2.5mm² cable has a resistance of 7.41mΩ/m. What is the total resistance of 30m of this cable (go and return)?",
    options: ["0.222Ω", "0.444Ω", "0.111Ω", "7.41Ω"],
    correctAnswer: 1,
    explanation: "Total length = 30m × 2 (go and return) = 60m. Total R = 60m × 7.41mΩ/m = 444.6mΩ = 0.445Ω ≈ 0.444Ω"
  },
  {
    id: 7,
    question: "What is the typical power density (W/m²) used for general office lighting calculations?",
    options: ["5 W/m²", "10-12 W/m²", "25-30 W/m²", "50 W/m²"],
    correctAnswer: 1,
    explanation: "Modern LED office lighting typically uses 10-12 W/m² to achieve 300-500 lux. This has reduced significantly from the 15-20 W/m² common with fluorescent lighting."
  },
  {
    id: 8,
    question: "A three-phase supply delivers 100kW at 400V line voltage with 0.85 power factor. What is the line current?",
    options: ["144A", "170A", "250A", "295A"],
    correctAnswer: 1,
    explanation: "Using P = √3 × VL × IL × cosφ: IL = P / (√3 × VL × cosφ) = 100000 / (1.732 × 400 × 0.85) = 170A"
  },
  {
    id: 9,
    question: "Why is P = I²R particularly important for cable sizing?",
    options: [
      "Higher current cables are cheaper",
      "Power loss increases with the square of current, causing heating",
      "It determines the cable colour coding",
      "It is required for certification"
    ],
    correctAnswer: 1,
    explanation: "P = I²R shows that power loss (heat) in cables increases with the square of current. Doubling the current quadruples the heat generated, which is why cable sizing must account for current capacity."
  },
  {
    id: 10,
    question: "What energy does a 3kW immersion heater consume in 4 hours?",
    options: ["0.75 kWh", "3 kWh", "12 kWh", "12000 J"],
    correctAnswer: 2,
    explanation: "Energy = Power × Time = 3kW × 4h = 12 kWh. This is the unit measured by electricity meters for billing purposes."
  }
];

const faqs = [
  {
    question: "What's the difference between AC and DC voltage?",
    answer: "DC (Direct Current) maintains constant polarity - electrons flow in one direction. AC (Alternating Current) periodically reverses polarity at 50Hz in the UK. Most building supplies are AC, but many control systems use DC (typically 24V DC for BMS sensors and actuators)."
  },
  {
    question: "Why does the UK use 230V when many countries use 110V?",
    answer: "Higher voltage allows the same power to be delivered with lower current (P = VI), reducing cable sizes and I²R losses. 110V systems require larger cables or accept greater losses. The UK harmonised from 240V to 230V (±10%) to align with European standards."
  },
  {
    question: "What is the difference between kW and kVA?",
    answer: "kW (kilowatts) measures real power - the actual work done. kVA (kilovolt-amperes) measures apparent power - the total power supplied. In AC circuits with inductive loads (motors), kVA is greater than kW due to reactive power. The ratio kW/kVA is the power factor."
  },
  {
    question: "How do I calculate cable size for a given load?",
    answer: "First calculate current (I = P/V for single-phase, or I = P/(√3 × V × pf) for three-phase). Then select a cable with adequate current capacity from BS 7671 tables, considering installation method, ambient temperature, and grouping. Finally, verify voltage drop is within limits (typically 5% for power circuits)."
  },
  {
    question: "Why is insulation resistance measured in megohms?",
    answer: "Good insulation should allow virtually no current to flow. Even at 500V test voltage, the leakage current through good insulation (say 200MΩ) is only 2.5µA - a tiny amount. Values below 1MΩ indicate degraded insulation that could allow dangerous fault currents."
  },
  {
    question: "What does 'diversity' mean in load calculations?",
    answer: "Diversity accounts for the fact that not all loads operate simultaneously at full capacity. BS 7671 Appendix 1 provides diversity factors - for example, socket outlets in dwellings have diversity factors meaning a 32A ring can serve many sockets without overloading, as they won't all be used at once."
  }
];

const HNCModule3Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section1">
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
            <Zap className="h-4 w-4" />
            <span>Module 3.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Voltage, Current, Resistance and Power
          </h1>
          <p className="text-white/80">
            The fundamental electrical quantities that underpin all circuit analysis and building services design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Voltage (V):</strong> Electrical 'pressure' pushing charge through circuits</li>
              <li className="pl-1"><strong>Current (I):</strong> Rate of charge flow, measured in Amperes</li>
              <li className="pl-1"><strong>Resistance (R):</strong> Opposition to current, measured in Ohms</li>
              <li className="pl-1"><strong>Power (P):</strong> Rate of energy transfer: P = V × I</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>UK supplies:</strong> 230V single-phase, 400V three-phase</li>
              <li className="pl-1"><strong>Load calculations:</strong> Lighting, heating, HVAC</li>
              <li className="pl-1"><strong>Cable sizing:</strong> Based on current and voltage drop</li>
              <li className="pl-1"><strong>Energy billing:</strong> kWh consumption calculations</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define voltage, current, resistance and power with correct SI units",
              "Apply the power equations P = VI, P = I²R and P = V²/R",
              "Calculate current, voltage drop and power for single and three-phase",
              "Understand UK supply voltages in building services",
              "Apply power density calculations for lighting design",
              "Calculate energy consumption for load assessment"
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

        {/* Section 1: Voltage */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Voltage - Electrical Potential Difference
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Voltage is the electrical 'pressure' that drives current through a circuit. It represents
              the energy available per unit charge and is always measured between two points.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key facts about voltage:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">1 Volt = 1 Joule per Coulomb (1V = 1 J/C)</li>
                <li className="pl-1">Voltage is always measured between two points (potential difference)</li>
                <li className="pl-1">Higher voltage can deliver more power with the same current</li>
                <li className="pl-1">Symbol: V, Unit: Volts (V)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK Building Services Voltages</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Single-phase supply</td>
                      <td className="border border-white/10 px-3 py-2">230V AC</td>
                      <td className="border border-white/10 px-3 py-2">±10% tolerance (207V-253V)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Three-phase (line)</td>
                      <td className="border border-white/10 px-3 py-2">400V AC</td>
                      <td className="border border-white/10 px-3 py-2">Between phases</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Three-phase (phase)</td>
                      <td className="border border-white/10 px-3 py-2">230V AC</td>
                      <td className="border border-white/10 px-3 py-2">Phase to neutral</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SELV (bathrooms)</td>
                      <td className="border border-white/10 px-3 py-2">≤50V AC / ≤120V DC</td>
                      <td className="border border-white/10 px-3 py-2">Extra-low voltage protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS controls</td>
                      <td className="border border-white/10 px-3 py-2">24V DC</td>
                      <td className="border border-white/10 px-3 py-2">Sensors, actuators, controls</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Construction site tools</td>
                      <td className="border border-white/10 px-3 py-2">110V AC</td>
                      <td className="border border-white/10 px-3 py-2">CTE (centre-tapped earth)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> 400V ÷ √3 = 230V - this is the relationship between line and phase voltages in a three-phase system.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Current */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Current - Flow of Electric Charge
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Current is the rate at which electric charge flows through a conductor. It determines
              cable sizes, protective device ratings, and heat generation in circuits.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key facts about current:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">1 Ampere = 1 Coulomb per second (1A = 1 C/s)</li>
                <li className="pl-1">Current is the same at all points in a series circuit</li>
                <li className="pl-1">Current divides between parallel branches</li>
                <li className="pl-1">Symbol: I, Unit: Amperes (A)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current Calculations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Single-phase:</strong> I = P / V = P / 230</li>
                  <li className="pl-1"><strong>Three-phase:</strong> I = P / (√3 × VL × pf)</li>
                  <li className="pl-1">Cable Iz must exceed design current Ib</li>
                  <li className="pl-1">Device rating In must be ≥ Ib and ≤ Iz</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Load Currents (230V)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>LED luminaire (45W):</strong> 0.2A</li>
                  <li className="pl-1"><strong>Desktop computer:</strong> 0.9A</li>
                  <li className="pl-1"><strong>3kW heater:</strong> 13A</li>
                  <li className="pl-1"><strong>9.5kW shower:</strong> 41A</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Ib ≤ In ≤ Iz (design current ≤ protective device ≤ cable capacity)
            </p>
          </div>
        </section>

        {/* Section 3: Resistance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Resistance - Opposition to Current Flow
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Resistance determines how much current flows for a given voltage. In building services,
              cable resistance causes voltage drop and power losses that must be accounted for in design.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key facts about resistance:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">1 Ohm = 1 Volt per Ampere (1Ω = 1 V/A)</li>
                <li className="pl-1">R = ρL/A (resistivity × length / area)</li>
                <li className="pl-1">Resistance increases with temperature</li>
                <li className="pl-1">Symbol: R, Unit: Ohms (Ω)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Resistance (Copper at 20°C)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Cable Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Resistance (mΩ/m)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1.5mm²</td>
                      <td className="border border-white/10 px-3 py-2">12.1</td>
                      <td className="border border-white/10 px-3 py-2">Lighting circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2.5mm²</td>
                      <td className="border border-white/10 px-3 py-2">7.41</td>
                      <td className="border border-white/10 px-3 py-2">Ring finals, radials</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4mm²</td>
                      <td className="border border-white/10 px-3 py-2">4.61</td>
                      <td className="border border-white/10 px-3 py-2">Cookers, showers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6mm²</td>
                      <td className="border border-white/10 px-3 py-2">3.08</td>
                      <td className="border border-white/10 px-3 py-2">Showers, small motors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10mm²</td>
                      <td className="border border-white/10 px-3 py-2">1.83</td>
                      <td className="border border-white/10 px-3 py-2">Sub-mains, large loads</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Temperature effect:</strong> Copper resistance increases ~0.4% per °C rise. Use correction factor 1.2 for cables operating at 70°C.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 4: Power */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Power - Rate of Energy Transfer
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power calculations are fundamental to building services design - from sizing individual
              circuits to specifying transformers and generators for entire buildings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Power Equations</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">P = V × I</p>
                  <p className="text-white/70 text-xs">Basic power</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">P = I² × R</p>
                  <p className="text-white/70 text-xs">Power from current</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">P = V² / R</p>
                  <p className="text-white/70 text-xs">Power from voltage</p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Phase Power</p>
              <p className="font-mono text-center text-lg mb-2">P = √3 × V<sub>L</sub> × I<sub>L</sub> × cos φ</p>
              <p className="text-xs text-white/70 text-center">Where VL = line voltage (400V), cos φ = power factor</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Density for Lighting (W/m²)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Space Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">W/m² (LED)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Target Lux</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General office</td>
                      <td className="border border-white/10 px-3 py-2">10-12</td>
                      <td className="border border-white/10 px-3 py-2">300-500</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Corridors</td>
                      <td className="border border-white/10 px-3 py-2">5-8</td>
                      <td className="border border-white/10 px-3 py-2">100</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail</td>
                      <td className="border border-white/10 px-3 py-2">15-20</td>
                      <td className="border border-white/10 px-3 py-2">300-500</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Warehouse</td>
                      <td className="border border-white/10 px-3 py-2">5-8</td>
                      <td className="border border-white/10 px-3 py-2">150-200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Energy calculation:</strong> E = P × t (kWh = kW × hours) - this is what electricity meters measure for billing.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Lighting Circuit Load</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An office floor (500m²) requires lighting at 12 W/m². Calculate the total load and circuit current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total power = Area × Power density</p>
                <p>P = 500m² × 12 W/m² = <strong>6000W = 6kW</strong></p>
                <p className="mt-2">Current at 230V:</p>
                <p>I = P / V = 6000 / 230 = <strong>26.1A</strong></p>
                <p className="mt-2 text-white/60">→ Requires multiple circuits or single 32A circuit</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Cable Voltage Drop</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 3kW heater is supplied by 25m of 2.5mm² cable. Calculate the voltage drop.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Current: I = P / V = 3000 / 230 = 13A</p>
                <p>Cable resistance: R = 25m × 2 × 7.41mΩ/m = 0.37Ω</p>
                <p className="text-white/60">(×2 for go and return conductors)</p>
                <p className="mt-2">Voltage drop: V = I × R = 13 × 0.37 = <strong>4.8V</strong></p>
                <p className="mt-2">As percentage: (4.8 / 230) × 100 = <strong>2.1%</strong></p>
                <p className="mt-2 text-green-400">✓ Within 5% limit for power circuits</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Three-Phase Motor</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 15kW AHU motor operates at 0.85 power factor on 400V three-phase. Calculate the line current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using: P = √3 × VL × IL × cos φ</p>
                <p className="mt-2">Rearranging: IL = P / (√3 × VL × cos φ)</p>
                <p className="mt-2">IL = 15000 / (1.732 × 400 × 0.85)</p>
                <p>IL = 15000 / 588.9 = <strong>25.5A per phase</strong></p>
                <p className="mt-2 text-white/60">→ 32A MCB and 4mm² cable suitable</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>V = I × R</strong> — Ohm's Law</li>
                <li className="pl-1"><strong>P = V × I</strong> — Power (single-phase)</li>
                <li className="pl-1"><strong>P = √3 × VL × IL × cos φ</strong> — Three-phase power</li>
                <li className="pl-1"><strong>Vd = I × R × 2</strong> — Voltage drop (single-phase)</li>
                <li className="pl-1"><strong>E = P × t</strong> — Energy consumption</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">UK single-phase: <strong>230V</strong> (±10%)</li>
                <li className="pl-1">UK three-phase line: <strong>400V</strong></li>
                <li className="pl-1">√3 = <strong>1.732</strong> (three-phase factor)</li>
                <li className="pl-1">Voltage drop limit (power): <strong>5%</strong></li>
                <li className="pl-1">Voltage drop limit (lighting): <strong>3%</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Forgetting ×2</strong> — Cable voltage drop needs both conductors</li>
                <li className="pl-1"><strong>Wrong units</strong> — mΩ/m must convert to Ω for calculations</li>
                <li className="pl-1"><strong>Ignoring power factor</strong> — Motor loads need pf in calculations</li>
                <li className="pl-1"><strong>Temperature</strong> — Cable R at operating temp is ~20% higher</li>
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
                <p className="font-medium text-white mb-1">Fundamental Quantities</p>
                <ul className="space-y-0.5">
                  <li>Voltage (V) - Volts - Potential difference</li>
                  <li>Current (I) - Amperes - Charge flow rate</li>
                  <li>Resistance (R) - Ohms - Opposition to flow</li>
                  <li>Power (P) - Watts - Energy transfer rate</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Building Services</p>
                <ul className="space-y-0.5">
                  <li>Single-phase: 230V, P = VI</li>
                  <li>Three-phase: 400V, P = √3·VL·IL·pf</li>
                  <li>Power circuits: max 5% Vd</li>
                  <li>Lighting: max 3% Vd</li>
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
            <Link to="../h-n-c-module3-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section1-2">
              Next: Ohm's Law
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section1_1;
