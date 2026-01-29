import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "True, Reactive and Apparent Power in AC Systems - HNC Module 3 Section 3.6";
const DESCRIPTION = "Master AC power relationships for building services: true power (kW), reactive power (kVAr), apparent power (kVA), power factor, wattmeter measurement, and DNO billing implications.";

const quickCheckQuestions = [
  {
    id: "true-power-formula",
    question: "What is the formula for true (active) power in a single-phase AC circuit?",
    options: ["P = VI", "P = VI cos φ", "P = VI sin φ", "P = V/I"],
    correctIndex: 1,
    explanation: "True power P = VI cos φ, where cos φ is the power factor. This accounts for the phase angle between voltage and current in AC circuits. Only the in-phase component of current does useful work."
  },
  {
    id: "reactive-power-unit",
    question: "What is the unit of reactive power?",
    options: ["Watts (W)", "Volt-Amperes (VA)", "Volt-Amperes reactive (VAr)", "Joules (J)"],
    correctIndex: 2,
    explanation: "Reactive power is measured in Volt-Amperes reactive (VAr) or kVAr. This distinguishes it from true power (Watts) and apparent power (VA), even though all three have the same dimensional units."
  },
  {
    id: "power-factor-calculation",
    question: "A load draws 8kW at 10kVA. What is the power factor?",
    options: ["0.6", "0.8", "1.0", "1.25"],
    correctIndex: 1,
    explanation: "Power factor = P/S = 8kW ÷ 10kVA = 0.8. This means 80% of the apparent power is doing useful work. The remaining 20% is reactive power circulating in the circuit."
  },
  {
    id: "three-phase-power",
    question: "For a balanced three-phase load, which formula calculates true power?",
    options: ["P = VL × IL", "P = √3 × VL × IL", "P = √3 × VL × IL × cos φ", "P = 3 × VP × IP"],
    correctIndex: 2,
    explanation: "Three-phase true power P = √3 × VL × IL × cos φ, where VL is line voltage (400V) and IL is line current. The √3 factor accounts for the phase relationships in a three-phase system."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does true power represent in an AC circuit?",
    options: [
      "The total power supplied by the source",
      "The power stored in magnetic and electric fields",
      "The actual power consumed and converted to useful work",
      "The power returned to the supply"
    ],
    correctAnswer: 2,
    explanation: "True power (P) represents the actual power consumed by the load and converted to useful work such as heat, light, or mechanical energy. It is the only component that appears on energy bills."
  },
  {
    id: 2,
    question: "A motor draws 15A at 230V with a power factor of 0.85. What is the true power consumed?",
    options: ["2.93kW", "3.45kW", "4.06kW", "2.55kW"],
    correctAnswer: 0,
    explanation: "P = V × I × cos φ = 230 × 15 × 0.85 = 2932.5W = 2.93kW. The power factor reduces the true power below the apparent power (VA) value."
  },
  {
    id: 3,
    question: "What causes reactive power in an electrical system?",
    options: [
      "Resistance in cables",
      "Inductive and capacitive loads storing and releasing energy",
      "Poor electrical connections",
      "Overloaded circuits"
    ],
    correctAnswer: 1,
    explanation: "Reactive power arises from inductors (motors, transformers) and capacitors storing energy in magnetic and electric fields respectively, then returning it to the supply each half cycle."
  },
  {
    id: 4,
    question: "A building has a maximum demand of 500kVA with a power factor of 0.7. What true power is available?",
    options: ["350kW", "500kW", "714kW", "250kW"],
    correctAnswer: 0,
    explanation: "P = S × cos φ = 500kVA × 0.7 = 350kW. The poor power factor means only 70% of the supply capacity is available for useful work."
  },
  {
    id: 5,
    question: "Why do DNOs charge penalties for poor power factor?",
    options: [
      "Poor power factor damages transformers",
      "It increases cable losses and reduces network capacity",
      "It causes voltage fluctuations",
      "It increases harmonic distortion"
    ],
    correctAnswer: 1,
    explanation: "Poor power factor increases current for the same true power, causing greater I²R losses in distribution networks and reducing the capacity available for other customers."
  },
  {
    id: 6,
    question: "What type of instrument measures true power directly?",
    options: ["Ammeter", "Voltmeter", "Wattmeter", "VAr meter"],
    correctAnswer: 2,
    explanation: "A wattmeter measures true power by multiplying instantaneous voltage and current, automatically accounting for the phase angle. Digital power analysers extend this to include reactive and apparent power."
  },
  {
    id: 7,
    question: "Calculate the reactive power for a load with S = 100kVA and P = 80kW.",
    options: ["20kVAr", "40kVAr", "60kVAr", "80kVAr"],
    correctAnswer: 2,
    explanation: "Using the power triangle: Q = √(S² - P²) = √(100² - 80²) = √(10000 - 6400) = √3600 = 60kVAr"
  },
  {
    id: 8,
    question: "A three-phase motor draws 25A per phase at 400V with pf = 0.9. What is the true power?",
    options: ["10.4kW", "13.9kW", "15.6kW", "17.3kW"],
    correctAnswer: 2,
    explanation: "P = √3 × VL × IL × cos φ = 1.732 × 400 × 25 × 0.9 = 15,588W = 15.6kW"
  },
  {
    id: 9,
    question: "What is the typical power factor threshold below which DNOs apply surcharges?",
    options: ["0.95", "0.90", "0.85", "0.80"],
    correctAnswer: 1,
    explanation: "Most UK DNOs apply reactive power charges when the power factor falls below 0.9 (or kVAr exceeds approximately 0.484 per kW). This encourages customers to install power factor correction."
  },
  {
    id: 10,
    question: "An energy meter shows 50,000 kWh and a reactive meter shows 40,000 kVArh. What is the average power factor?",
    options: ["0.78", "0.80", "0.85", "0.89"],
    correctAnswer: 0,
    explanation: "kVAh = √(kWh² + kVArh²) = √(50000² + 40000²) = 64,031. Power factor = kWh/kVAh = 50000/64031 = 0.78"
  }
];

const faqs = [
  {
    question: "Why is apparent power measured in VA rather than Watts?",
    answer: "Although VA and Watts have the same dimensional units (voltage × current), using different names distinguishes their roles. Apparent power (VA) represents the total power that must be supplied by the source and determines equipment sizing. True power (W) represents actual energy consumption and appears on bills. Using distinct units prevents confusion in specifications and calculations."
  },
  {
    question: "Can power factor exceed 1.0?",
    answer: "No, power factor cannot exceed 1.0 (unity). A power factor of 1.0 means voltage and current are perfectly in phase - all supplied power is doing useful work. Values above 1.0 would violate conservation of energy. However, over-correction with capacitors can cause a leading power factor, which also wastes energy and may incur penalties."
  },
  {
    question: "What is the difference between kWh and kVAh billing?",
    answer: "Domestic and small commercial customers typically pay only for kWh (true energy consumed). Large commercial and industrial customers may face kVAh or maximum demand (kVA) charges that include reactive power consumption. This reflects the additional infrastructure costs of supplying reactive current even though it does no useful work."
  },
  {
    question: "Why do motors have poor power factor at light loads?",
    answer: "Induction motors draw magnetising current to create the rotating magnetic field regardless of mechanical load. At full load, this reactive component is a small proportion of total current, giving good power factor (0.85-0.9). At light loads, the magnetising current dominates, reducing power factor to 0.3-0.5. Variable speed drives can improve this by reducing voltage at light loads."
  },
  {
    question: "How does power factor correction affect cable sizing?",
    answer: "Improving power factor reduces current for the same true power (I = P / V cos φ). This can allow smaller cables, reduce voltage drop, and free up capacity in existing installations. However, cables must still be sized for the actual current drawn, and correction capacitors should be installed close to inductive loads for maximum benefit."
  },
  {
    question: "What is the two-wattmeter method for three-phase power measurement?",
    answer: "The two-wattmeter method uses two wattmeters to measure total three-phase power in a balanced or unbalanced system without a neutral connection. Total power equals the algebraic sum of both readings. The method also allows power factor calculation: tan φ = √3 × (W1 - W2) / (W1 + W2). This is standard practice for three-wire three-phase installations."
  }
];

const HNCModule3Section3_6 = () => {
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
            <Zap className="h-4 w-4" />
            <span>Module 3.3.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            True, Reactive and Apparent Power in AC Systems
          </h1>
          <p className="text-white/80">
            Understanding power relationships essential for equipment sizing, energy management and DNO compliance in building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>True power P (kW):</strong> Actual power doing useful work</li>
              <li className="pl-1"><strong>Reactive power Q (kVAr):</strong> Power oscillating in magnetic/electric fields</li>
              <li className="pl-1"><strong>Apparent power S (kVA):</strong> Total power supplied = VI</li>
              <li className="pl-1"><strong>Power factor:</strong> cos φ = P/S (typically 0.8-0.95)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Equipment sizing:</strong> Transformers, generators rated in kVA</li>
              <li className="pl-1"><strong>DNO charges:</strong> Penalties for pf below 0.9</li>
              <li className="pl-1"><strong>Cable sizing:</strong> Current depends on apparent power</li>
              <li className="pl-1"><strong>Energy monitoring:</strong> kWh vs kVAh metering</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define true, reactive and apparent power with correct units",
              "Calculate power factor from measured values",
              "Apply single-phase and three-phase power formulae",
              "Understand wattmeter operation and power measurement",
              "Explain DNO billing structures and reactive power charges",
              "Specify power monitoring systems for building services"
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

        {/* Section 1: True (Active) Power */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            True (Active) Power - P
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              True power, also called active or real power, represents the actual electrical energy converted
              to useful work such as heat, light, or mechanical motion. This is the only power component
              that appears on electricity bills for most customers.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">True Power Formulae</p>
              <div className="grid sm:grid-cols-2 gap-4 text-center text-sm">
                <div className="p-3 rounded bg-black/30">
                  <p className="text-xs text-white/60 mb-1">Single-phase</p>
                  <p className="font-bold text-elec-yellow text-lg">P = V × I × cos φ</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="text-xs text-white/60 mb-1">Three-phase</p>
                  <p className="font-bold text-elec-yellow text-lg">P = √3 × V<sub>L</sub> × I<sub>L</sub> × cos φ</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key characteristics of true power:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Measured in Watts (W) or kilowatts (kW)</li>
                <li className="pl-1">Represents energy actually consumed per second</li>
                <li className="pl-1">Cannot be negative - always flows from source to load</li>
                <li className="pl-1">Equals apparent power only when pf = 1 (purely resistive)</li>
                <li className="pl-1">Determines energy consumption: Energy (kWh) = P × time</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical True Power Values in Buildings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Load Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Power</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Power Factor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED lighting (per fitting)</td>
                      <td className="border border-white/10 px-3 py-2">20-60W</td>
                      <td className="border border-white/10 px-3 py-2">0.90-0.95</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Desktop computer</td>
                      <td className="border border-white/10 px-3 py-2">150-300W</td>
                      <td className="border border-white/10 px-3 py-2">0.60-0.90</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small AHU motor (7.5kW)</td>
                      <td className="border border-white/10 px-3 py-2">7.5kW</td>
                      <td className="border border-white/10 px-3 py-2">0.85</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chiller compressor (100kW)</td>
                      <td className="border border-white/10 px-3 py-2">100kW</td>
                      <td className="border border-white/10 px-3 py-2">0.88-0.92</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Resistive heater</td>
                      <td className="border border-white/10 px-3 py-2">1-3kW</td>
                      <td className="border border-white/10 px-3 py-2">1.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> True power is what you pay for on standard domestic tariffs - it represents actual energy consumed.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Reactive Power */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Reactive Power - Q
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Reactive power represents energy that oscillates between the source and the load without
              being consumed. Inductors (motors, transformers) store energy in magnetic fields, while
              capacitors store energy in electric fields - both returning this energy to the supply each cycle.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reactive Power Formula</p>
              <div className="grid sm:grid-cols-2 gap-4 text-center text-sm">
                <div className="p-3 rounded bg-black/30">
                  <p className="text-xs text-white/60 mb-1">Single-phase</p>
                  <p className="font-bold text-elec-yellow text-lg">Q = V × I × sin φ</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="text-xs text-white/60 mb-1">Three-phase</p>
                  <p className="font-bold text-elec-yellow text-lg">Q = √3 × V<sub>L</sub> × I<sub>L</sub> × sin φ</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Understanding reactive power:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Measured in Volt-Amperes reactive (VAr) or kVAr</li>
                <li className="pl-1"><strong>Inductive loads (motors):</strong> Q is positive (lagging current)</li>
                <li className="pl-1"><strong>Capacitive loads:</strong> Q is negative (leading current)</li>
                <li className="pl-1">Does no useful work but increases current in conductors</li>
                <li className="pl-1">Causes additional I²R losses in cables and transformers</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sources of Inductive Reactive Power</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Induction motors (largest source)</li>
                  <li className="pl-1">Transformers (magnetising current)</li>
                  <li className="pl-1">Fluorescent lamp ballasts</li>
                  <li className="pl-1">Welding equipment</li>
                  <li className="pl-1">Induction heaters</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effects of Excess Reactive Power</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Increased cable current and losses</li>
                  <li className="pl-1">Larger cable sizes required</li>
                  <li className="pl-1">Reduced transformer capacity</li>
                  <li className="pl-1">Greater voltage drop</li>
                  <li className="pl-1">DNO penalty charges</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Capacitors can supply reactive power to inductive loads locally, reducing the reactive power drawn from the supply (power factor correction).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Apparent Power */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Apparent Power - S
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Apparent power is the total power that must be supplied by the source - the product of
              RMS voltage and RMS current. It determines the sizing of cables, transformers, generators,
              and switchgear regardless of power factor.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Apparent Power Formula</p>
              <div className="grid sm:grid-cols-2 gap-4 text-center text-sm">
                <div className="p-3 rounded bg-black/30">
                  <p className="text-xs text-white/60 mb-1">Single-phase</p>
                  <p className="font-bold text-elec-yellow text-lg">S = V × I</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="text-xs text-white/60 mb-1">Three-phase</p>
                  <p className="font-bold text-elec-yellow text-lg">S = √3 × V<sub>L</sub> × I<sub>L</sub></p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Power Triangle Relationship</p>
              <div className="bg-black/30 p-4 rounded text-sm font-mono text-center">
                <p className="mb-2">S² = P² + Q²</p>
                <p className="text-white/60 text-xs">or equivalently:</p>
                <p>S = √(P² + Q²)</p>
              </div>
              <p className="text-xs text-white/70 mt-2 text-center">
                Apparent power is the vector sum of true and reactive power
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why apparent power matters:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Measured in Volt-Amperes (VA) or kilovolt-amperes (kVA)</li>
                <li className="pl-1">Transformers rated in kVA (not kW) because they must carry total current</li>
                <li className="pl-1">Generators rated in kVA - true power output depends on load pf</li>
                <li className="pl-1">Cable sizing based on current, which depends on S, not P</li>
                <li className="pl-1">Maximum demand charges often based on kVA</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment Ratings in Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rating Unit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution transformer</td>
                      <td className="border border-white/10 px-3 py-2">kVA</td>
                      <td className="border border-white/10 px-3 py-2">Heating depends on total current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standby generator</td>
                      <td className="border border-white/10 px-3 py-2">kVA</td>
                      <td className="border border-white/10 px-3 py-2">Alternator limited by current capacity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UPS system</td>
                      <td className="border border-white/10 px-3 py-2">kVA</td>
                      <td className="border border-white/10 px-3 py-2">Inverter limited by current output</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor</td>
                      <td className="border border-white/10 px-3 py-2">kW (shaft)</td>
                      <td className="border border-white/10 px-3 py-2">Mechanical output is useful work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cables</td>
                      <td className="border border-white/10 px-3 py-2">Amperes</td>
                      <td className="border border-white/10 px-3 py-2">Heating depends on I²R</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> When specifying a generator for a building with pf = 0.8, a 100kVA generator can only deliver 80kW of true power to the load.
            </p>
          </div>
        </section>

        {/* Section 4: Power Factor */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Power Factor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power factor is the ratio of true power to apparent power, indicating how efficiently
              electrical power is being used. It equals the cosine of the phase angle between voltage
              and current waveforms.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Factor Definitions</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">pf = P/S</p>
                  <p className="text-white/70 text-xs">From power values</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">pf = cos φ</p>
                  <p className="text-white/70 text-xs">From phase angle</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">pf = R/Z</p>
                  <p className="text-white/70 text-xs">From impedance</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Factor Classifications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Power Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Classification</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example Loads</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.95-1.00</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Excellent</td>
                      <td className="border border-white/10 px-3 py-2">Resistive heaters, corrected loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.85-0.95</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Good</td>
                      <td className="border border-white/10 px-3 py-2">Motors at full load, modern lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.70-0.85</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">Poor</td>
                      <td className="border border-white/10 px-3 py-2">Lightly loaded motors, old equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&lt;0.70</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Very Poor</td>
                      <td className="border border-white/10 px-3 py-2">Uncorrected welding, idle motors</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lagging Power Factor</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Current lags voltage (inductive loads)</li>
                  <li className="pl-1">Most common in buildings (motors)</li>
                  <li className="pl-1">Corrected with parallel capacitors</li>
                  <li className="pl-1">Positive reactive power (Q)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Leading Power Factor</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Current leads voltage (capacitive loads)</li>
                  <li className="pl-1">Occurs with over-correction</li>
                  <li className="pl-1">Can cause voltage rise problems</li>
                  <li className="pl-1">Negative reactive power (Q)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Target:</strong> Most building services aim for pf = 0.95 lagging or better to avoid DNO charges whilst not over-correcting.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Power Measurement */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Power Measurement with Wattmeters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Wattmeters measure true power by multiplying instantaneous voltage and current, automatically
              accounting for the phase angle. Modern digital power analysers extend this to provide comprehensive
              power quality data.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wattmeter Operating Principle</p>
              <div className="bg-black/30 p-4 rounded text-sm">
                <p className="text-white/90 mb-2">
                  An electrodynamic wattmeter contains a current coil (in series with load) and a voltage coil
                  (in parallel with load). The torque produced is proportional to the instantaneous product of
                  V and I, giving a deflection proportional to average (true) power.
                </p>
                <p className="font-mono text-elec-yellow text-center">
                  Reading = (1/T) × ∫ v(t) × i(t) dt = V × I × cos φ = P
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Power measurement methods:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Single-phase:</strong> One wattmeter measures total power directly</li>
                <li className="pl-1"><strong>Three-phase (balanced):</strong> One wattmeter × 3 gives total power</li>
                <li className="pl-1"><strong>Three-phase (any load):</strong> Two-wattmeter method for 3-wire systems</li>
                <li className="pl-1"><strong>Three-phase with neutral:</strong> Three wattmeters, sum all readings</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Two-Wattmeter Method (Three-Phase)</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total Power: P<sub>total</sub> = W<sub>1</sub> + W<sub>2</sub></p>
                <p className="mt-2">Power Factor: tan φ = √3 × (W<sub>1</sub> - W<sub>2</sub>) / (W<sub>1</sub> + W<sub>2</sub>)</p>
                <p className="mt-2 text-white/60 text-xs">Note: One reading may be negative at low power factors</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modern Power Analyser Functions</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">True power</td>
                      <td className="border border-white/10 px-3 py-2">P (kW)</td>
                      <td className="border border-white/10 px-3 py-2">Energy billing, load assessment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reactive power</td>
                      <td className="border border-white/10 px-3 py-2">Q (kVAr)</td>
                      <td className="border border-white/10 px-3 py-2">PFC sizing, DNO compliance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Apparent power</td>
                      <td className="border border-white/10 px-3 py-2">S (kVA)</td>
                      <td className="border border-white/10 px-3 py-2">Equipment sizing, cable selection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power factor</td>
                      <td className="border border-white/10 px-3 py-2">pf / cos φ</td>
                      <td className="border border-white/10 px-3 py-2">System efficiency, correction needs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Harmonics (THD)</td>
                      <td className="border border-white/10 px-3 py-2">THD%</td>
                      <td className="border border-white/10 px-3 py-2">Power quality, filter requirements</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Site tip:</strong> Clamp-on power analysers can measure power without disconnection, making them ideal for building energy audits and fault-finding.
            </p>
          </div>
        </section>

        {/* Section 6: Single-Phase vs Three-Phase Power */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Single-Phase vs Three-Phase Power
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the differences between single-phase and three-phase power calculations is
              essential for correctly sizing equipment and calculating loads in building services installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Formulae Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Power Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Single-Phase (230V)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Three-Phase (400V)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Apparent (S)</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">S = V × I</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">S = √3 × V<sub>L</sub> × I<sub>L</sub></td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">True (P)</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">P = V × I × cos φ</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">P = √3 × V<sub>L</sub> × I<sub>L</sub> × cos φ</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reactive (Q)</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">Q = V × I × sin φ</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">Q = √3 × V<sub>L</sub> × I<sub>L</sub> × sin φ</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Current</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">I = P / (V × cos φ)</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">I = P / (√3 × V<sub>L</sub> × cos φ)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Single-Phase Applications</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">General socket outlets (13A)</li>
                  <li className="pl-1">Lighting circuits</li>
                  <li className="pl-1">Small heaters up to 3kW</li>
                  <li className="pl-1">Domestic appliances</li>
                  <li className="pl-1">Single-phase air conditioning units</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Phase Applications</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Motors above 2.2kW (typical)</li>
                  <li className="pl-1">Large HVAC equipment</li>
                  <li className="pl-1">Commercial kitchens</li>
                  <li className="pl-1">Main distribution boards</li>
                  <li className="pl-1">Data centre power distribution</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why √3 in Three-Phase Formulae?</p>
              <p className="text-sm text-white/90">
                In a three-phase system, line voltage (400V) is √3 times phase voltage (230V). The √3 factor
                (1.732) converts between line and phase values. For balanced loads, total power equals
                3 × phase power, but using line values: P = √3 × V<sub>L</sub> × I<sub>L</sub> × cos φ.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Three-phase delivers √3 times more power than single-phase for the same current, making it more efficient for large loads.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 7: kWh vs kVAh Billing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            kWh vs kVAh Billing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding how electricity is metered and billed is essential for managing building
              energy costs. Different customer categories face different charging structures based on
              their consumption patterns and power factor.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Metering Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Meter Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Measures</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">kWh meter</td>
                      <td className="border border-white/10 px-3 py-2">True energy consumed</td>
                      <td className="border border-white/10 px-3 py-2">Domestic, small commercial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">kVArh meter</td>
                      <td className="border border-white/10 px-3 py-2">Reactive energy</td>
                      <td className="border border-white/10 px-3 py-2">Large commercial/industrial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MD meter</td>
                      <td className="border border-white/10 px-3 py-2">Maximum demand (kW or kVA)</td>
                      <td className="border border-white/10 px-3 py-2">HV customers, large sites</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Half-hourly meter</td>
                      <td className="border border-white/10 px-3 py-2">30-minute profiles</td>
                      <td className="border border-white/10 px-3 py-2">Profile class 00 (100kW+)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Understanding energy calculations:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>kWh (kilowatt-hours):</strong> True energy = P × t (billed to all customers)</li>
                <li className="pl-1"><strong>kVArh (kilovolt-ampere reactive hours):</strong> Reactive energy = Q × t</li>
                <li className="pl-1"><strong>kVAh (kilovolt-ampere hours):</strong> Total energy = S × t = √(kWh² + kVArh²)</li>
                <li className="pl-1"><strong>Average power factor:</strong> pf = kWh / kVAh over billing period</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Billing Components</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Standing charge (p/day)</li>
                  <li className="pl-1">Unit rate (p/kWh)</li>
                  <li className="pl-1">Climate Change Levy</li>
                  <li className="pl-1">VAT (5% or 20%)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Additional Charges (Large Users)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Maximum demand (£/kVA/month)</li>
                  <li className="pl-1">Reactive power (p/kVArh)</li>
                  <li className="pl-1">Capacity charges</li>
                  <li className="pl-1">Transmission network use (TNUoS)</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: Annual Energy Cost Impact of Power Factor</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Site: 500kW average load, 8760 hours/year</p>
                <p className="mt-2">At pf = 0.75:</p>
                <p className="ml-4">kVA = 500 / 0.75 = 667 kVA</p>
                <p className="ml-4">Reactive = √(667² - 500²) = 441 kVAr</p>
                <p className="ml-4">kVArh = 441 × 8760 = 3,863,160 kVArh</p>
                <p className="mt-2">At pf = 0.95:</p>
                <p className="ml-4">kVA = 500 / 0.95 = 526 kVA</p>
                <p className="ml-4">Reactive = √(526² - 500²) = 164 kVAr</p>
                <p className="ml-4">kVArh = 164 × 8760 = 1,436,640 kVArh</p>
                <p className="mt-2 text-green-400">Savings: 2,426,520 kVArh @ 0.5p = £12,133/year</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Financial impact:</strong> Poor power factor increases both reactive power charges and maximum demand charges, significantly affecting operating costs.
            </p>
          </div>
        </section>

        {/* Section 8: Building Services - DNO Charges and Power Monitoring */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services: DNO Charges and Power Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Distribution Network Operators (DNOs) apply specific charges related to power factor and
              maximum demand. Understanding these charges is essential for designing cost-effective
              building electrical systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DNO Reactive Power Charges</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Threshold</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Trigger</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Charge</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power factor below 0.9</td>
                      <td className="border border-white/10 px-3 py-2">kVArh exceeds 0.484 × kWh</td>
                      <td className="border border-white/10 px-3 py-2">0.3-0.8p per excess kVArh</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maximum demand</td>
                      <td className="border border-white/10 px-3 py-2">Peak kVA in billing period</td>
                      <td className="border border-white/10 px-3 py-2">£2-5 per kVA per month</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Excess capacity</td>
                      <td className="border border-white/10 px-3 py-2">Demand exceeds agreed supply</td>
                      <td className="border border-white/10 px-3 py-2">Penalty rates apply</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why DNOs charge for reactive power:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Reactive current increases I²R losses in network cables and transformers</li>
                <li className="pl-1">Reduces available capacity for other customers</li>
                <li className="pl-1">Requires larger transformers and cables in distribution network</li>
                <li className="pl-1">Causes voltage regulation problems at end of long feeders</li>
                <li className="pl-1">Encourages customers to install power factor correction</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Monitoring Systems</p>
              <p className="text-sm text-white/90 mb-3">
                Modern buildings use sophisticated power monitoring to optimise energy use and costs:
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Parameters Monitored</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Main incomer</td>
                      <td className="border border-white/10 px-3 py-2">Multi-function meter, CT/VT</td>
                      <td className="border border-white/10 px-3 py-2">kW, kVA, kVAr, pf, V, I, THD</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sub-distribution</td>
                      <td className="border border-white/10 px-3 py-2">Smart MCCBs, energy meters</td>
                      <td className="border border-white/10 px-3 py-2">kWh, max demand, current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Final circuits</td>
                      <td className="border border-white/10 px-3 py-2">CT clamps, pulse output</td>
                      <td className="border border-white/10 px-3 py-2">kWh for tenant billing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS integration</td>
                      <td className="border border-white/10 px-3 py-2">Modbus/BACnet gateway</td>
                      <td className="border border-white/10 px-3 py-2">Real-time data to EMS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Benefits of Power Monitoring</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Identify poor power factor loads</li>
                  <li className="pl-1">Track energy consumption trends</li>
                  <li className="pl-1">Verify billing accuracy</li>
                  <li className="pl-1">Detect equipment faults early</li>
                  <li className="pl-1">Support ISO 50001 compliance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Automatic PFC Systems</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Measure reactive power continuously</li>
                  <li className="pl-1">Switch capacitor banks as needed</li>
                  <li className="pl-1">Maintain target pf (typically 0.95)</li>
                  <li className="pl-1">Protect against over-correction</li>
                  <li className="pl-1">Include detuning reactors for harmonics</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Install power monitoring at main incomer as minimum. For buildings over 1MVA, sub-metering by floor or tenant enables accurate cost allocation and identifies problem areas.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Single-Phase Power Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A single-phase motor draws 8.5A at 230V with a power factor of 0.82. Calculate P, Q, and S.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Apparent power: S = V × I = 230 × 8.5 = <strong>1955 VA = 1.96 kVA</strong></p>
                <p className="mt-2">True power: P = S × cos φ = 1955 × 0.82 = <strong>1603W = 1.60 kW</strong></p>
                <p className="mt-2">Reactive power: Q = S × sin φ</p>
                <p className="ml-4">sin φ = √(1 - cos²φ) = √(1 - 0.82²) = 0.572</p>
                <p className="ml-4">Q = 1955 × 0.572 = <strong>1118 VAr = 1.12 kVAr</strong></p>
                <p className="mt-2 text-white/60">Check: S² = P² + Q² → 1955² = 1603² + 1118² ✓</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Three-Phase Load Current</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An AHU has a 22kW motor with power factor 0.88 on 400V three-phase. What current does it draw?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using: P = √3 × V<sub>L</sub> × I<sub>L</sub> × cos φ</p>
                <p className="mt-2">Rearranging: I<sub>L</sub> = P / (√3 × V<sub>L</sub> × cos φ)</p>
                <p className="mt-2">I<sub>L</sub> = 22000 / (1.732 × 400 × 0.88)</p>
                <p>I<sub>L</sub> = 22000 / 609.7 = <strong>36.1A per phase</strong></p>
                <p className="mt-2 text-white/60">→ Select 40A protective device and appropriate cable</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Power Factor from Two Wattmeters</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Two-wattmeter method gives W1 = 45kW and W2 = 25kW. Find total power and power factor.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total power: P = W<sub>1</sub> + W<sub>2</sub> = 45 + 25 = <strong>70 kW</strong></p>
                <p className="mt-2">tan φ = √3 × (W<sub>1</sub> - W<sub>2</sub>) / (W<sub>1</sub> + W<sub>2</sub>)</p>
                <p>tan φ = 1.732 × (45 - 25) / (45 + 25)</p>
                <p>tan φ = 1.732 × 20 / 70 = 0.495</p>
                <p className="mt-2">φ = arctan(0.495) = 26.3°</p>
                <p>cos φ = cos(26.3°) = <strong>0.896 ≈ 0.90</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Capacitor Sizing for PFC</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 150kW load at pf = 0.75 needs correction to pf = 0.95. What capacitor kVAr is required?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>At pf = 0.75: φ₁ = arccos(0.75) = 41.4°, tan φ₁ = 0.882</p>
                <p>Q₁ = P × tan φ₁ = 150 × 0.882 = 132.3 kVAr</p>
                <p className="mt-2">At pf = 0.95: φ₂ = arccos(0.95) = 18.2°, tan φ₂ = 0.329</p>
                <p>Q₂ = P × tan φ₂ = 150 × 0.329 = 49.4 kVAr</p>
                <p className="mt-2">Capacitor required: Q<sub>c</sub> = Q₁ - Q₂ = 132.3 - 49.4 = <strong>82.9 kVAr</strong></p>
                <p className="mt-2 text-white/60">→ Specify 90kVAr automatic PFC panel with steps</p>
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
                <li className="pl-1"><strong>P = VI cos φ</strong> — True power (single-phase)</li>
                <li className="pl-1"><strong>Q = VI sin φ</strong> — Reactive power (single-phase)</li>
                <li className="pl-1"><strong>S = VI</strong> — Apparent power (single-phase)</li>
                <li className="pl-1"><strong>S² = P² + Q²</strong> — Power triangle relationship</li>
                <li className="pl-1"><strong>pf = P/S = cos φ</strong> — Power factor</li>
                <li className="pl-1"><strong>P = √3 × V<sub>L</sub> × I<sub>L</sub> × cos φ</strong> — Three-phase true power</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">√3 = <strong>1.732</strong> (three-phase factor)</li>
                <li className="pl-1">DNO threshold: pf = <strong>0.9</strong> (kVAr ≤ 0.484 × kW)</li>
                <li className="pl-1">Motor full load pf: typically <strong>0.85-0.90</strong></li>
                <li className="pl-1">Target corrected pf: <strong>0.95</strong> (lagging)</li>
                <li className="pl-1">Unity power factor: <strong>1.0</strong> (resistive loads only)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Confusing P and S</strong> — Generators rated in kVA, not kW</li>
                <li className="pl-1"><strong>Forgetting √3</strong> — Essential for all three-phase calculations</li>
                <li className="pl-1"><strong>Using P = VI</strong> — Only correct for unity power factor</li>
                <li className="pl-1"><strong>Over-correcting PFC</strong> — Leading pf also causes problems</li>
                <li className="pl-1"><strong>Ignoring harmonics</strong> — Can distort readings and damage capacitors</li>
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
                <p className="font-medium text-white mb-1">Power Types</p>
                <ul className="space-y-0.5">
                  <li>True power P (kW) - actual work done</li>
                  <li>Reactive power Q (kVAr) - energy oscillating</li>
                  <li>Apparent power S (kVA) - total supplied</li>
                  <li>Power factor pf = P/S = cos φ</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Building Services</p>
                <ul className="space-y-0.5">
                  <li>DNO threshold: pf ≥ 0.9</li>
                  <li>Target corrected: pf = 0.95</li>
                  <li>Transformers/generators: rated in kVA</li>
                  <li>Energy bills: based on kWh consumed</li>
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
            <Link to="../h-n-c-module3-section3-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Harmonics
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section3-7">
              Next: Power Triangle and Efficiency
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section3_6;
