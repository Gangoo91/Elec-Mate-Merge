import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Calculations of Three-Phase Power (kW, kVA, PF) - HNC Module 3 Section 4.4";
const DESCRIPTION = "Master three-phase power calculations including real power (kW), apparent power (kVA), reactive power (kVAr), power factor correction, and practical measurement techniques for building services design.";

const quickCheckQuestions = [
  {
    id: "three-phase-power-formula",
    question: "What is the formula for three-phase real power?",
    options: ["P = VL × IL", "P = 3 × VL × IL", "P = √3 × VL × IL × cos φ", "P = VL × IL × cos φ"],
    correctIndex: 2,
    explanation: "Three-phase real power P = √3 × VL × IL × cos φ, where VL is line voltage, IL is line current, and cos φ is the power factor. The √3 factor accounts for the 120° phase displacement between phases."
  },
  {
    id: "apparent-power",
    question: "A three-phase load draws 100A at 400V. What is the apparent power?",
    options: ["40 kVA", "69.3 kVA", "120 kVA", "173 kVA"],
    correctIndex: 1,
    explanation: "Apparent power S = √3 × VL × IL = 1.732 × 400 × 100 = 69,280 VA = 69.3 kVA. This is the total power supplied, before considering power factor."
  },
  {
    id: "power-factor-meaning",
    question: "What does a power factor of 0.8 lagging indicate?",
    options: [
      "The load is purely resistive",
      "Current leads voltage by 36.87°",
      "Current lags voltage by 36.87° (inductive load)",
      "20% of power is wasted as heat"
    ],
    correctIndex: 2,
    explanation: "A power factor of 0.8 lagging means cos φ = 0.8, so φ = 36.87°. 'Lagging' indicates an inductive load where current lags behind voltage - typical of motors and transformers."
  },
  {
    id: "two-wattmeter-reading",
    question: "In the two-wattmeter method, if W1 = 50kW and W2 = 30kW, what is the total power?",
    options: ["20 kW", "40 kW", "80 kW", "150 kW"],
    correctIndex: 2,
    explanation: "Total three-phase power P = W1 + W2 = 50 + 30 = 80 kW. The two-wattmeter method gives total power as the algebraic sum of both readings."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the relationship between apparent power (S), real power (P), and reactive power (Q)?",
    options: [
      "S = P + Q",
      "S² = P² + Q²",
      "S = P × Q",
      "S = P - Q"
    ],
    correctAnswer: 1,
    explanation: "The power triangle relationship is S² = P² + Q², or S = √(P² + Q²). Apparent power is the vector sum of real and reactive power, not their arithmetic sum."
  },
  {
    id: 2,
    question: "A 75kW three-phase motor operates at 0.85 power factor on 400V. What is the line current?",
    options: ["108A", "127A", "150A", "220A"],
    correctAnswer: 1,
    explanation: "Using P = √3 × VL × IL × cos φ: IL = P / (√3 × VL × cos φ) = 75,000 / (1.732 × 400 × 0.85) = 75,000 / 588.9 = 127.4A"
  },
  {
    id: 3,
    question: "What is the reactive power drawn by a load with 100kVA apparent power and 0.8 power factor?",
    options: ["20 kVAr", "60 kVAr", "80 kVAr", "125 kVAr"],
    correctAnswer: 1,
    explanation: "Using S² = P² + Q²: P = S × pf = 100 × 0.8 = 80kW. Q = √(S² - P²) = √(100² - 80²) = √3600 = 60 kVAr"
  },
  {
    id: 4,
    question: "Why do electricity suppliers penalise consumers with poor power factor?",
    options: [
      "Poor power factor causes more harmonics",
      "It increases the current for a given real power, stressing infrastructure",
      "It causes voltage spikes in the network",
      "Low power factor increases energy consumption"
    ],
    correctAnswer: 1,
    explanation: "Poor power factor means higher current is required to deliver the same real power. This increases I²R losses in cables and transformers, and requires larger capacity infrastructure - costs the supplier bears."
  },
  {
    id: 5,
    question: "In the two-wattmeter method, what does it indicate if one wattmeter reads negative?",
    options: [
      "The wattmeter is faulty",
      "Power factor is below 0.5",
      "The load is unbalanced",
      "There is a phase reversal"
    ],
    correctAnswer: 1,
    explanation: "When power factor drops below 0.5 (φ > 60°), one wattmeter reads negative. Total power is still W1 + W2 (algebraic sum). This is a useful diagnostic for very poor power factor loads."
  },
  {
    id: 6,
    question: "A commercial building has a maximum demand of 250kVA. If the power factor is improved from 0.7 to 0.95, what is the new kVA demand for the same kW load?",
    options: ["184 kVA", "238 kVA", "175 kVA", "263 kVA"],
    correctAnswer: 0,
    explanation: "Original kW = 250 × 0.7 = 175kW. With improved pf: New kVA = 175 / 0.95 = 184.2 kVA. Power factor correction reduces apparent power demand by 26%."
  },
  {
    id: 7,
    question: "What is the power factor of a purely resistive three-phase load?",
    options: ["0", "0.85", "1.0", "1.732"],
    correctAnswer: 2,
    explanation: "A purely resistive load has no reactive component - current and voltage are in phase. Therefore cos φ = cos 0° = 1.0 (unity power factor)."
  },
  {
    id: 8,
    question: "A 500kVA transformer supplies a building at 0.8 power factor. What is the maximum real power available?",
    options: ["400 kW", "500 kW", "625 kW", "300 kW"],
    correctAnswer: 0,
    explanation: "Real power P = S × pf = 500 × 0.8 = 400kW. The transformer is rated in kVA because it must handle both real and reactive power - the actual kW depends on the load's power factor."
  },
  {
    id: 9,
    question: "What is the formula for calculating power factor from two-wattmeter readings?",
    options: [
      "pf = W1 / W2",
      "pf = (W1 - W2) / (W1 + W2)",
      "tan φ = √3(W1 - W2) / (W1 + W2)",
      "pf = (W1 + W2) / √3"
    ],
    correctAnswer: 2,
    explanation: "The power factor angle can be found from tan φ = √3(W1 - W2) / (W1 + W2). Then pf = cos φ. This allows power factor measurement without separate instrumentation."
  },
  {
    id: 10,
    question: "A factory's maximum demand is 800kW at 0.75 power factor. How much capacitive kVAr is needed to improve pf to 0.95?",
    options: ["350 kVAr", "440 kVAr", "530 kVAr", "266 kVAr"],
    correctAnswer: 0,
    explanation: "Original Q1 = P × tan(cos⁻¹ 0.75) = 800 × 0.882 = 705.6 kVAr. Target Q2 = 800 × tan(cos⁻¹ 0.95) = 800 × 0.329 = 263.2 kVAr. Capacitor kVAr = 705.6 - 263.2 = 442.4 kVAr ≈ 440 kVAr"
  }
];

const faqs = [
  {
    question: "Why are transformers rated in kVA rather than kW?",
    answer: "Transformers must handle the total current flowing through them, regardless of power factor. A transformer rated at 500kVA can supply 500kW at unity pf, but only 400kW at 0.8pf - the same current in both cases. Rating in kVA ensures the transformer isn't overloaded regardless of the connected load's power factor."
  },
  {
    question: "What causes lagging power factor in buildings?",
    answer: "Inductive loads cause lagging power factor: motors (HVAC, lifts, pumps), transformers, fluorescent lamp ballasts (older magnetic types), and induction heating. Motors are the primary cause in most commercial buildings, drawing magnetising current that lags the voltage."
  },
  {
    question: "How is power factor correction achieved?",
    answer: "Capacitor banks are connected in parallel with inductive loads. Capacitors draw leading current that partially cancels the lagging current from motors. Correction can be individual (at each motor), group (at distribution boards), or bulk (at the main switchboard). Target pf is typically 0.95-0.98."
  },
  {
    question: "Why not correct power factor to unity (1.0)?",
    answer: "Correcting to exactly 1.0 risks over-correction when loads vary, which can cause leading power factor and voltage rise. Additionally, capacitors may resonate with system inductance at certain frequencies. A target of 0.95-0.98 provides good efficiency without these risks."
  },
  {
    question: "What is the difference between displacement and distortion power factor?",
    answer: "Displacement power factor (cos φ) relates to the phase angle between fundamental voltage and current - what we've discussed here. Distortion power factor accounts for harmonic currents from non-linear loads (VFDs, LED drivers, IT equipment). True power factor combines both: PFtrue = PFdisplacement × PFdistortion."
  },
  {
    question: "How do I interpret my electricity bill's kVA maximum demand charge?",
    answer: "Suppliers measure your peak kVA demand over each billing period (often in 30-minute intervals). If your power factor is poor, you pay for kVA you can't use productively. For example, at pf = 0.7, you pay for 100kVA but only get 70kW of useful power. Improving pf reduces your maximum demand charges."
  }
];

const HNCModule3Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section4">
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
            <span>Module 3.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Calculations of Three-Phase Power
          </h1>
          <p className="text-white/80">
            Real power (kW), apparent power (kVA), reactive power (kVAr), and power factor in three-phase systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Real power (P):</strong> √3 × VL × IL × cos φ (kW)</li>
              <li className="pl-1"><strong>Apparent power (S):</strong> √3 × VL × IL (kVA)</li>
              <li className="pl-1"><strong>Reactive power (Q):</strong> √3 × VL × IL × sin φ (kVAr)</li>
              <li className="pl-1"><strong>Power factor:</strong> P/S = cos φ (0 to 1)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Transformer sizing:</strong> Based on kVA not kW</li>
              <li className="pl-1"><strong>Maximum demand:</strong> Typically 0.8-0.9 pf assumed</li>
              <li className="pl-1"><strong>Supply agreements:</strong> kVA charges for poor pf</li>
              <li className="pl-1"><strong>PF correction:</strong> Capacitors to reduce kVA demand</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate three-phase real, apparent, and reactive power",
              "Apply the power triangle to solve practical problems",
              "Understand the two-wattmeter method for power measurement",
              "Determine power factor from measurements",
              "Size transformers and main supplies for buildings",
              "Calculate power factor correction requirements"
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

        {/* Section 1: Three-Phase Power Formula */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Three-Phase Real Power Formula
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Three-phase real power (also called true power or active power) represents the actual
              work done by the electrical system - the power that drives motors, heats elements,
              and produces light. It is measured in kilowatts (kW) or watts (W).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fundamental Three-Phase Power Equation</p>
              <p className="font-mono text-center text-lg mb-2">P = √3 × V<sub>L</sub> × I<sub>L</sub> × cos φ</p>
              <div className="text-xs text-white/70 text-center space-y-1">
                <p>P = Real power (watts)</p>
                <p>VL = Line voltage (400V in UK)</p>
                <p>IL = Line current (amps)</p>
                <p>cos φ = Power factor</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why √3 (1.732)?</p>
              <p className="text-sm text-white/90">
                The √3 factor arises from the 120° phase displacement between the three phases.
                In a balanced three-phase system, power is delivered continuously (unlike single-phase
                which pulsates). The mathematical derivation shows that total instantaneous power
                equals √3 × VL × IL × cos φ at all times.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Alternative Forms</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Uses</th>
                      <th className="border border-white/10 px-3 py-2 text-left">When to Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">P = √3 × VL × IL × cos φ</td>
                      <td className="border border-white/10 px-3 py-2">Line values</td>
                      <td className="border border-white/10 px-3 py-2">Most common - direct measurement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">P = 3 × VP × IP × cos φ</td>
                      <td className="border border-white/10 px-3 py-2">Phase values</td>
                      <td className="border border-white/10 px-3 py-2">When phase values are known</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">P = 3 × IP² × R</td>
                      <td className="border border-white/10 px-3 py-2">Current and resistance</td>
                      <td className="border border-white/10 px-3 py-2">Resistive loads, cable losses</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> For a balanced load, the power in each phase is P/3. The √3 factor converts between line and phase quantities automatically.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Apparent Power */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Apparent Power (kVA)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Apparent power represents the total power supplied to the circuit - the combination
              of real power that does useful work and reactive power that sustains magnetic and
              electric fields. It determines the current flowing and hence the capacity required
              for cables, switchgear, and transformers.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Apparent Power Formula</p>
              <p className="font-mono text-center text-lg mb-2">S = √3 × V<sub>L</sub> × I<sub>L</sub></p>
              <p className="text-xs text-white/70 text-center">Unit: Volt-Amperes (VA) or kilovolt-amperes (kVA)</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why kVA Matters</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Transformers are rated in kVA</li>
                  <li className="pl-1">Generators are rated in kVA</li>
                  <li className="pl-1">Supply agreements specify kVA</li>
                  <li className="pl-1">Cable sizing based on current (hence kVA)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">kVA vs kW</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">kVA = kW only at unity pf</li>
                  <li className="pl-1">kVA {'>'} kW for all other loads</li>
                  <li className="pl-1">kW/kVA = power factor</li>
                  <li className="pl-1">Poor pf means higher kVA for same kW</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Equipment Ratings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rated In</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformers</td>
                      <td className="border border-white/10 px-3 py-2">kVA</td>
                      <td className="border border-white/10 px-3 py-2">Must handle total current regardless of pf</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Generators</td>
                      <td className="border border-white/10 px-3 py-2">kVA</td>
                      <td className="border border-white/10 px-3 py-2">Alternator heating depends on current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UPS systems</td>
                      <td className="border border-white/10 px-3 py-2">kVA</td>
                      <td className="border border-white/10 px-3 py-2">Inverter capacity is current-limited</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motors</td>
                      <td className="border border-white/10 px-3 py-2">kW</td>
                      <td className="border border-white/10 px-3 py-2">Mechanical output is real power</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heaters</td>
                      <td className="border border-white/10 px-3 py-2">kW</td>
                      <td className="border border-white/10 px-3 py-2">Heat output is real power (pf ≈ 1)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> When specifying transformers, use kVA and assume the load power factor. A 500kVA transformer at pf = 0.8 delivers only 400kW of useful power.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Reactive Power */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Reactive Power (kVAr)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Reactive power is the power that oscillates between the source and the reactive
              components (inductors and capacitors) of the load. It does no useful work but is
              essential for establishing magnetic fields in motors and transformers.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reactive Power Formula</p>
              <p className="font-mono text-center text-lg mb-2">Q = √3 × V<sub>L</sub> × I<sub>L</sub> × sin φ</p>
              <p className="text-xs text-white/70 text-center">Unit: Volt-Amperes Reactive (VAr) or kilovolt-amperes reactive (kVAr)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Power Triangle</p>
              <div className="p-4 bg-black/30 rounded text-center">
                <pre className="text-sm font-mono text-white/90">
{`              S (kVA)
             /|
            / |
           /  |
          /   | Q (kVAr)
         /    |
        /φ    |
       /______|
         P (kW)

S² = P² + Q²
tan φ = Q/P
cos φ = P/S (Power Factor)`}
                </pre>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of Reactive Power</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Sign Convention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Inductive (QL)</td>
                      <td className="border border-white/10 px-3 py-2">Motors, transformers</td>
                      <td className="border border-white/10 px-3 py-2">Current lags voltage</td>
                      <td className="border border-white/10 px-3 py-2">+Q (consumed)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Capacitive (QC)</td>
                      <td className="border border-white/10 px-3 py-2">Capacitors, long cables</td>
                      <td className="border border-white/10 px-3 py-2">Current leads voltage</td>
                      <td className="border border-white/10 px-3 py-2">-Q (supplied)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Net reactive power:</strong> Q<sub>net</sub> = Q<sub>L</sub> - Q<sub>C</sub>. Power factor correction adds capacitive kVAr to cancel inductive kVAr.
            </p>
          </div>
        </section>

        {/* Section 4: Two-Wattmeter Method */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Two-Wattmeter Method for Power Measurement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The two-wattmeter method is a practical technique for measuring total power in a
              three-phase, three-wire system. It works for both balanced and unbalanced loads
              and can also determine the power factor.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Connection Arrangement</p>
              <div className="p-4 bg-black/30 rounded">
                <pre className="text-sm font-mono text-white/90">
{`Three-Phase Supply          Load
     L1 ────────┬─────────────┐
                │             │
           W1 [===]           │
                │             │
     L2 ────────┼─────────────┼──
                │             │
           W2 [===]           │
                │             │
     L3 ────────┴─────────────┘

W1: Current coil in L1, voltage coil L1-L2
W2: Current coil in L3, voltage coil L3-L2`}
                </pre>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Two-Wattmeter Equations</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-mono text-center mb-1">P<sub>total</sub> = W<sub>1</sub> + W<sub>2</sub></p>
                  <p className="text-xs text-white/70 text-center">Total real power</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-mono text-center mb-1">tan φ = √3 × (W<sub>1</sub> - W<sub>2</sub>) / (W<sub>1</sub> + W<sub>2</sub>)</p>
                  <p className="text-xs text-white/70 text-center">Power factor angle</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Interpreting Wattmeter Readings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Power Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">W1 Reading</th>
                      <th className="border border-white/10 px-3 py-2 text-left">W2 Reading</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Relationship</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1.0 (unity)</td>
                      <td className="border border-white/10 px-3 py-2">Positive</td>
                      <td className="border border-white/10 px-3 py-2">Positive</td>
                      <td className="border border-white/10 px-3 py-2">W1 = W2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.866</td>
                      <td className="border border-white/10 px-3 py-2">Positive</td>
                      <td className="border border-white/10 px-3 py-2">Positive</td>
                      <td className="border border-white/10 px-3 py-2">W1 = 2 × W2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.5</td>
                      <td className="border border-white/10 px-3 py-2">Positive</td>
                      <td className="border border-white/10 px-3 py-2">Zero</td>
                      <td className="border border-white/10 px-3 py-2">W2 = 0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">{'<'} 0.5</td>
                      <td className="border border-white/10 px-3 py-2">Positive</td>
                      <td className="border border-white/10 px-3 py-2">Negative</td>
                      <td className="border border-white/10 px-3 py-2">W1 + (-W2) = P</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> Modern three-phase power analysers use digital sampling and FFT, but the two-wattmeter principle is still useful for understanding readings and verification.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 5: Power Factor in Three-Phase Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Power Factor in Three-Phase Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power factor is the ratio of real power to apparent power. It indicates how
              effectively the electrical power is being converted into useful work output.
              A poor power factor means the supply must provide more current (and hence more kVA)
              to deliver the same amount of useful power.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Factor Definition</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">pf = P / S</p>
                  <p className="text-white/70 text-xs">Basic definition</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">pf = cos φ</p>
                  <p className="text-white/70 text-xs">Phase angle method</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">pf = kW / kVA</p>
                  <p className="text-white/70 text-xs">Practical form</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Power Factors by Load Type</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Load Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Power Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Nature</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Resistive heaters</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">Unity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Incandescent lamps</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">Unity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fluorescent lamps (electronic)</td>
                      <td className="border border-white/10 px-3 py-2">0.95-0.98</td>
                      <td className="border border-white/10 px-3 py-2">Lagging (corrected)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED drivers</td>
                      <td className="border border-white/10 px-3 py-2">0.90-0.95</td>
                      <td className="border border-white/10 px-3 py-2">Varies (often corrected)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Induction motors (full load)</td>
                      <td className="border border-white/10 px-3 py-2">0.80-0.90</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Induction motors (light load)</td>
                      <td className="border border-white/10 px-3 py-2">0.30-0.50</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Variable frequency drives</td>
                      <td className="border border-white/10 px-3 py-2">0.95-0.98</td>
                      <td className="border border-white/10 px-3 py-2">Near unity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Welding equipment</td>
                      <td className="border border-white/10 px-3 py-2">0.50-0.70</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Economic impact:</strong> Improving power factor from 0.7 to 0.95 reduces the current (and hence kVA demand) by 26% for the same kW output.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: kW vs kVA in Specifications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            kW vs kVA in Specifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding when to use kW and when to use kVA is crucial for correct specification
              of electrical equipment. Using the wrong unit can lead to under-sized or over-sized
              equipment, with cost and performance implications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use Each Unit</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Specify in kW when:</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Describing mechanical output (motors)</li>
                    <li className="pl-1">Calculating energy consumption (kWh)</li>
                    <li className="pl-1">Specifying heating loads</li>
                    <li className="pl-1">Determining electricity costs</li>
                    <li className="pl-1">Comparing equipment efficiency</li>
                  </ul>
                </div>
                <div className="p-4 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Specify in kVA when:</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Sizing transformers</li>
                    <li className="pl-1">Specifying generators</li>
                    <li className="pl-1">Sizing UPS systems</li>
                    <li className="pl-1">Determining cable sizes</li>
                    <li className="pl-1">Agreeing supply capacity with DNO</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Conversion Between kW and kVA</p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-mono mb-1">kVA = kW / pf</p>
                  <p className="text-xs text-white/70">kW to kVA</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-mono mb-1">kW = kVA × pf</p>
                  <p className="text-xs text-white/70">kVA to kW</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example: Sizing a Transformer</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Building load: 200kW at 0.8 power factor</p>
                <p className="mt-2">Required kVA = 200 / 0.8 = <strong>250 kVA</strong></p>
                <p className="mt-2">Select transformer: <strong>315 kVA</strong> (next standard size)</p>
                <p className="mt-2 text-white/60">This provides ~25% spare capacity for growth</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Common error:</strong> Specifying a 200kW generator for a 200kW load. At 0.8pf, this load requires 250kVA, so a 250kVA (200kW) generator would be fully loaded.
            </p>
          </div>
        </section>

        {/* Section 7: Maximum Demand Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Maximum Demand Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maximum demand (MD) is the highest load expected to occur at any one time.
              It determines the capacity of the incoming supply, main cables, and distribution
              equipment. Accurate MD assessment is essential for cost-effective design.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maximum Demand Calculation Process</p>
              <div className="p-4 rounded bg-white/5">
                <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                  <li className="pl-1">List all connected loads with their ratings</li>
                  <li className="pl-1">Apply diversity factors from BS 7671 Appendix 1 or experience</li>
                  <li className="pl-1">Sum the diversified loads</li>
                  <li className="pl-1">Apply an overall building diversity factor if appropriate</li>
                  <li className="pl-1">Convert to kVA using expected power factor</li>
                  <li className="pl-1">Add margin for future growth (typically 20-25%)</li>
                </ol>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Diversity Factors</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Load Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Diversity Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">0.90-1.00</td>
                      <td className="border border-white/10 px-3 py-2">High for offices, lower for warehouses</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Socket outlets (commercial)</td>
                      <td className="border border-white/10 px-3 py-2">0.30-0.50</td>
                      <td className="border border-white/10 px-3 py-2">Depends on usage pattern</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC</td>
                      <td className="border border-white/10 px-3 py-2">0.80-1.00</td>
                      <td className="border border-white/10 px-3 py-2">Seasonal peaks considered</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lifts</td>
                      <td className="border border-white/10 px-3 py-2">0.60-0.80</td>
                      <td className="border border-white/10 px-3 py-2">Not all running simultaneously</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cooking equipment</td>
                      <td className="border border-white/10 px-3 py-2">0.60-0.80</td>
                      <td className="border border-white/10 px-3 py-2">Thermostatic control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IT equipment</td>
                      <td className="border border-white/10 px-3 py-2">0.70-0.90</td>
                      <td className="border border-white/10 px-3 py-2">Varies with occupancy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Factor Assumptions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Office buildings:</strong> 0.85-0.90 (mixed lighting, IT, HVAC)</li>
                <li className="pl-1"><strong>Industrial:</strong> 0.75-0.85 (heavy motor loads)</li>
                <li className="pl-1"><strong>Retail:</strong> 0.90-0.95 (mainly lighting, some HVAC)</li>
                <li className="pl-1"><strong>Data centres:</strong> 0.95-0.98 (UPS with pf correction)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>DNO requirements:</strong> Electricity distributors require power factor of 0.95 or better. Consumers with poor pf may face kVA-based maximum demand charges.
            </p>
          </div>
        </section>

        {/* Section 8: Building Services Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services: Transformer Sizing and Supply Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building services engineers must correctly size electrical infrastructure to meet
              the building's power requirements safely, efficiently, and economically. This
              involves understanding the relationship between connected load, maximum demand,
              and supply capacity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transformer Sizing Methodology</p>
              <div className="bg-black/30 p-4 rounded text-sm text-white/90">
                <ol className="space-y-2 list-decimal list-outside ml-5">
                  <li className="pl-1">Calculate maximum demand (kW) with diversity</li>
                  <li className="pl-1">Divide by expected power factor: kVA = kW / pf</li>
                  <li className="pl-1">Add allowance for future growth (typically 20-25%)</li>
                  <li className="pl-1">Select next standard transformer size</li>
                  <li className="pl-1">Verify transformer can handle starting currents (motor loads)</li>
                </ol>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard UK Transformer Ratings (Oil-Filled)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">kVA Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Full Load Current (A)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100</td>
                      <td className="border border-white/10 px-3 py-2">144</td>
                      <td className="border border-white/10 px-3 py-2">Small retail, workshops</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">200</td>
                      <td className="border border-white/10 px-3 py-2">289</td>
                      <td className="border border-white/10 px-3 py-2">Medium commercial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">315</td>
                      <td className="border border-white/10 px-3 py-2">455</td>
                      <td className="border border-white/10 px-3 py-2">Small office blocks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">500</td>
                      <td className="border border-white/10 px-3 py-2">722</td>
                      <td className="border border-white/10 px-3 py-2">Medium office, retail</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">800</td>
                      <td className="border border-white/10 px-3 py-2">1155</td>
                      <td className="border border-white/10 px-3 py-2">Large commercial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1000</td>
                      <td className="border border-white/10 px-3 py-2">1443</td>
                      <td className="border border-white/10 px-3 py-2">Multi-storey, industrial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1600</td>
                      <td className="border border-white/10 px-3 py-2">2309</td>
                      <td className="border border-white/10 px-3 py-2">Large industrial</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Note: Full load current calculated at 400V three-phase: I = kVA × 1000 / (√3 × 400)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Supply Agreement Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Agreed supply capacity (ASC):</strong> The kVA the DNO agrees to provide</li>
                <li className="pl-1"><strong>Available capacity:</strong> What the local network can support</li>
                <li className="pl-1"><strong>Connection charge:</strong> Based on capacity and distance to network</li>
                <li className="pl-1"><strong>Reactive power charges:</strong> Applied if pf {'<'} 0.95</li>
                <li className="pl-1"><strong>Maximum demand indicator:</strong> Records peak kVA for billing</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Cost optimisation:</strong> Accurately sizing supply capacity avoids paying for unused capacity while ensuring sufficient headroom for operational peaks and future growth.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Three-Phase Motor Power Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A three-phase induction motor draws 45A at 400V with a power factor of 0.85. Calculate the real, apparent, and reactive power.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Apparent power: S = √3 × VL × IL</p>
                <p>S = 1.732 × 400 × 45 = <strong>31,176 VA = 31.2 kVA</strong></p>
                <p className="mt-2">Real power: P = S × cos φ</p>
                <p>P = 31.2 × 0.85 = <strong>26.5 kW</strong></p>
                <p className="mt-2">Reactive power: Q = S × sin φ</p>
                <p>sin φ = sin(cos⁻¹ 0.85) = 0.527</p>
                <p>Q = 31.2 × 0.527 = <strong>16.4 kVAr</strong></p>
                <p className="mt-2 text-white/60">Check: √(26.5² + 16.4²) = √(702 + 269) = √971 = 31.2 kVA ✓</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Two-Wattmeter Method</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Two wattmeters connected to a balanced three-phase load read 42kW and 18kW. Calculate the total power and power factor.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total power: P = W1 + W2</p>
                <p>P = 42 + 18 = <strong>60 kW</strong></p>
                <p className="mt-2">Power factor angle: tan φ = √3 × (W1 - W2) / (W1 + W2)</p>
                <p>tan φ = 1.732 × (42 - 18) / (42 + 18)</p>
                <p>tan φ = 1.732 × 24 / 60 = 0.693</p>
                <p>φ = tan⁻¹(0.693) = 34.7°</p>
                <p className="mt-2">Power factor: pf = cos φ = cos(34.7°) = <strong>0.82 lagging</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Building Maximum Demand</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the transformer size for an office building with: Lighting 80kW, Small power 120kW, HVAC 200kW, Lifts 60kW. Apply appropriate diversity.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Apply diversity factors:</p>
                <p>Lighting: 80 × 0.95 = 76 kW</p>
                <p>Small power: 120 × 0.40 = 48 kW</p>
                <p>HVAC: 200 × 0.85 = 170 kW</p>
                <p>Lifts: 60 × 0.70 = 42 kW</p>
                <p className="mt-2">Total diversified load = 76 + 48 + 170 + 42 = <strong>336 kW</strong></p>
                <p className="mt-2">At pf = 0.85: kVA = 336 / 0.85 = <strong>395 kVA</strong></p>
                <p className="mt-2">Add 20% growth: 395 × 1.2 = <strong>474 kVA</strong></p>
                <p className="mt-2 text-green-400">Select: <strong>500 kVA transformer</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Power Factor Correction</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A factory has a load of 500kW at 0.7 power factor. Calculate the capacitor kVAr required to improve pf to 0.95.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Original reactive power:</p>
                <p>φ1 = cos⁻¹(0.7) = 45.57°</p>
                <p>Q1 = P × tan φ1 = 500 × tan(45.57°) = 500 × 1.02 = <strong>510 kVAr</strong></p>
                <p className="mt-2">Target reactive power:</p>
                <p>φ2 = cos⁻¹(0.95) = 18.19°</p>
                <p>Q2 = 500 × tan(18.19°) = 500 × 0.329 = <strong>164 kVAr</strong></p>
                <p className="mt-2">Capacitor kVAr required = Q1 - Q2</p>
                <p>QC = 510 - 164 = <strong>346 kVAr</strong></p>
                <p className="mt-2 text-white/60">This reduces kVA from 714 to 526 - a 26% reduction in demand</p>
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
                <li className="pl-1"><strong>P = √3 × VL × IL × cos φ</strong> — Three-phase real power (kW)</li>
                <li className="pl-1"><strong>S = √3 × VL × IL</strong> — Apparent power (kVA)</li>
                <li className="pl-1"><strong>Q = √3 × VL × IL × sin φ</strong> — Reactive power (kVAr)</li>
                <li className="pl-1"><strong>S² = P² + Q²</strong> — Power triangle relationship</li>
                <li className="pl-1"><strong>pf = P / S = cos φ</strong> — Power factor</li>
                <li className="pl-1"><strong>P = W1 + W2</strong> — Two-wattmeter total power</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">√3 = <strong>1.732</strong></li>
                <li className="pl-1">UK three-phase line voltage: <strong>400V</strong></li>
                <li className="pl-1">Typical motor pf (full load): <strong>0.85</strong></li>
                <li className="pl-1">DNO target power factor: <strong>0.95</strong></li>
                <li className="pl-1">Transformer sizing margin: <strong>20-25%</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Confusing kW and kVA</strong> — Transformers need kVA rating, not kW</li>
                <li className="pl-1"><strong>Forgetting √3</strong> — Three-phase formulas require this factor</li>
                <li className="pl-1"><strong>Ignoring power factor</strong> — Same kW needs more current at low pf</li>
                <li className="pl-1"><strong>No diversity</strong> — Not all loads operate simultaneously</li>
                <li className="pl-1"><strong>No growth margin</strong> — Always allow for future expansion</li>
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
                  <li>Real (P) - kW - Does useful work</li>
                  <li>Apparent (S) - kVA - Total supplied</li>
                  <li>Reactive (Q) - kVAr - Sustains fields</li>
                  <li>Power factor = kW / kVA</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Building Services</p>
                <ul className="space-y-0.5">
                  <li>Transformers rated in kVA</li>
                  <li>Target pf: 0.95 or better</li>
                  <li>Apply diversity factors</li>
                  <li>Allow 20-25% growth margin</li>
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
            <Link to="../h-n-c-module3-section4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Balanced and Unbalanced Loads
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section4-5">
              Next: Cable Sizing and Voltage Drop
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section4_4;
