import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Power Factor - Causes and Effects on Systems - HNC Module 3 Section 2.4";
const DESCRIPTION = "Understand power factor in AC circuits: true power, reactive power, apparent power, the power triangle, and the effects of poor power factor on building services electrical systems including DNO penalties.";

const quickCheckQuestions = [
  {
    id: "power-factor-definition",
    question: "What is the formula for power factor?",
    options: ["pf = S/P", "pf = Q/P", "pf = P/S", "pf = P/Q"],
    correctIndex: 2,
    explanation: "Power factor is the ratio of true power (P) to apparent power (S): pf = P/S = cos φ. It indicates how effectively current is being converted into useful work."
  },
  {
    id: "lagging-power-factor",
    question: "Which type of load causes a lagging power factor?",
    options: ["Resistive heaters", "Capacitor banks", "Induction motors", "LED drivers"],
    correctIndex: 2,
    explanation: "Induction motors cause a lagging power factor because current lags behind voltage due to their inductive nature. This is the most common cause of poor power factor in buildings."
  },
  {
    id: "power-triangle",
    question: "In the power triangle, what does the vertical side represent?",
    options: ["True power (P)", "Apparent power (S)", "Reactive power (Q)", "Power factor"],
    correctIndex: 2,
    explanation: "The power triangle shows P (true power) on the horizontal axis, Q (reactive power) on the vertical axis, and S (apparent power) as the hypotenuse. Q represents the power that oscillates between source and load."
  },
  {
    id: "poor-pf-effect",
    question: "What is a direct consequence of operating with a 0.7 power factor instead of unity?",
    options: ["Reduced cable heating", "Lower energy bills", "43% higher current for same power", "Faster motor operation"],
    correctIndex: 2,
    explanation: "At 0.7 pf, current is 1/0.7 = 1.43 times higher than at unity pf for the same real power. This 43% increase causes greater I²R losses, voltage drop, and requires larger cables."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is true power (P) measured in?",
    options: [
      "Volt-amperes (VA)",
      "Volt-amperes reactive (VAr)",
      "Watts (W)",
      "Power factor units"
    ],
    correctAnswer: 2,
    explanation: "True power (P) is measured in Watts (W) or kilowatts (kW). It represents the actual power doing useful work in the circuit."
  },
  {
    id: 2,
    question: "A motor draws 50kVA at 0.8 power factor. What is the true power?",
    options: ["62.5kW", "50kW", "40kW", "30kW"],
    correctAnswer: 2,
    explanation: "True power P = S × pf = 50kVA × 0.8 = 40kW. The remaining 30kVAr is reactive power."
  },
  {
    id: 3,
    question: "What causes leading power factor?",
    options: [
      "Induction motors",
      "Transformers at low load",
      "Capacitor banks or synchronous motors",
      "Incandescent lighting"
    ],
    correctAnswer: 2,
    explanation: "Capacitor banks and over-excited synchronous motors cause leading power factor, where current leads voltage. This is used for power factor correction."
  },
  {
    id: 4,
    question: "Using S² = P² + Q², calculate Q when S = 100kVA and P = 80kW.",
    options: ["20kVAr", "40kVAr", "60kVAr", "80kVAr"],
    correctAnswer: 2,
    explanation: "Q = √(S² - P²) = √(100² - 80²) = √(10000 - 6400) = √3600 = 60kVAr"
  },
  {
    id: 5,
    question: "What is the typical power factor of an unloaded induction motor?",
    options: ["0.95 lagging", "0.85 lagging", "0.3 to 0.4 lagging", "Unity"],
    correctAnswer: 2,
    explanation: "Unloaded induction motors have very poor power factor (0.3-0.4) because magnetising current is a large proportion of total current. This improves significantly when loaded."
  },
  {
    id: 6,
    question: "At what power factor do UK DNOs typically start charging reactive power penalties?",
    options: ["Below unity", "Below 0.95", "Below 0.90", "Below 0.85"],
    correctAnswer: 2,
    explanation: "Most UK DNOs charge reactive power penalties when power factor falls below 0.90. The charge is typically based on kVArh consumption above this threshold."
  },
  {
    id: 7,
    question: "How does poor power factor affect cable sizing?",
    options: [
      "No effect - cables are sized on true power only",
      "Larger cables needed due to higher current",
      "Smaller cables can be used",
      "Only affects three-phase cables"
    ],
    correctAnswer: 1,
    explanation: "Poor power factor means higher current for the same real power, requiring larger cables to carry the additional current without overheating or excessive voltage drop."
  },
  {
    id: 8,
    question: "What power factor do fluorescent luminaires with electronic control gear typically achieve?",
    options: ["0.5 lagging", "0.7 lagging", "0.85 lagging", "0.95 or better"],
    correctAnswer: 3,
    explanation: "Modern electronic control gear includes power factor correction, achieving 0.95 or better. Older magnetic ballasts typically operated at 0.5-0.6 power factor."
  },
  {
    id: 9,
    question: "If cable I²R losses are 2kW at unity power factor, what are they at 0.8 pf (same real power)?",
    options: ["1.6kW", "2.0kW", "2.5kW", "3.125kW"],
    correctAnswer: 3,
    explanation: "At 0.8 pf, current is 1.25× higher (1/0.8). Losses = I²R, so with 1.25× current: (1.25)² × 2kW = 1.5625 × 2 = 3.125kW - a 56% increase in losses."
  },
  {
    id: 10,
    question: "A building has 200kW load at 0.75 pf. What apparent power must the transformer supply?",
    options: ["150kVA", "200kVA", "267kVA", "300kVA"],
    correctAnswer: 2,
    explanation: "S = P / pf = 200kW / 0.75 = 267kVA. The transformer must be rated for apparent power, not just true power, hence poor pf requires larger transformers."
  },
  {
    id: 11,
    question: "What is the phase angle φ when power factor is 0.866?",
    options: ["15°", "30°", "45°", "60°"],
    correctAnswer: 1,
    explanation: "pf = cos φ, so φ = cos⁻¹(0.866) = 30°. This represents the phase difference between voltage and current waveforms."
  },
  {
    id: 12,
    question: "Which building services equipment typically has the worst power factor?",
    options: [
      "Electric resistance heaters",
      "LED lighting with drivers",
      "Lightly loaded induction motors",
      "Computer power supplies"
    ],
    correctAnswer: 2,
    explanation: "Lightly loaded induction motors can have power factors as low as 0.3, much worse than motors at full load (0.85). Variable speed drives can help by unloading motors efficiently."
  }
];

const faqs = [
  {
    question: "Why does poor power factor increase electricity costs?",
    answer: "Poor power factor increases costs in two ways: (1) DNOs charge reactive power penalties (typically above kVArh allowances) to recover costs of supplying reactive current, and (2) higher currents cause greater I²R losses in your own cables, so more energy is wasted as heat. Commercial users with maximum demand tariffs pay for kVA capacity, making poor pf directly expensive."
  },
  {
    question: "Can power factor be too high (leading)?",
    answer: "Yes, excessive leading power factor (from over-compensation with capacitors) can cause problems including voltage rise, potential resonance with system inductance, and additional losses. Most installations aim for 0.95-0.98 lagging rather than unity, providing a safety margin against leading pf conditions."
  },
  {
    question: "How do variable speed drives affect power factor?",
    answer: "Modern variable speed drives (VSDs) typically have power factor correction built in, achieving 0.95 or better regardless of motor loading. This is a major advantage over direct-on-line motors which have poor pf at light loads. However, older or basic VSDs may introduce harmonic distortion which affects power quality differently."
  },
  {
    question: "What's the difference between displacement and distortion power factor?",
    answer: "Displacement power factor (cos φ) relates to the phase shift between fundamental voltage and current waveforms. Distortion power factor accounts for harmonic content in non-sinusoidal waveforms. True power factor is the product of both. Non-linear loads like VSDs and LED drivers may have good displacement pf but poor distortion pf due to harmonics."
  },
  {
    question: "How is reactive power billed by UK DNOs?",
    answer: "UK DNOs typically allow reactive power consumption up to a certain percentage of active power (often equivalent to 0.90 pf). Consumption above this threshold is charged per kVArh, with rates varying by DNO and time of use. Half-hourly metered sites face the most significant charges, making power factor correction economically attractive."
  },
  {
    question: "Why do transformers have poor power factor at light load?",
    answer: "Transformers draw magnetising current to maintain the magnetic field in the core regardless of load. At light load, this reactive magnetising current is a large proportion of total current, resulting in poor power factor. At full load, the resistive load current dominates and pf improves typically to 0.85-0.95."
  }
];

const HNCModule3Section2_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section2">
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
            <span>Module 3.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Power Factor - Causes and Effects on Systems
          </h1>
          <p className="text-white/80">
            Understanding how reactive loads affect power delivery, efficiency, and costs in building services installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>True power (P):</strong> Watts - actual work done</li>
              <li className="pl-1"><strong>Reactive power (Q):</strong> VAr - oscillates, does no work</li>
              <li className="pl-1"><strong>Apparent power (S):</strong> VA - total power supplied</li>
              <li className="pl-1"><strong>Power factor:</strong> pf = P/S = cos φ (0 to 1)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Impact</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Motors:</strong> Largest cause of poor pf in buildings</li>
              <li className="pl-1"><strong>Cables:</strong> Larger sizes needed for same kW</li>
              <li className="pl-1"><strong>Transformers:</strong> Must be rated for kVA, not kW</li>
              <li className="pl-1"><strong>DNO charges:</strong> Penalties below 0.90 pf</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define true, reactive and apparent power with correct units",
              "Calculate power factor from the power triangle relationship",
              "Distinguish between leading and lagging power factor",
              "Identify causes of poor power factor in building services",
              "Quantify effects on current, cable losses and voltage drop",
              "Understand UK DNO reactive power charging mechanisms"
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

        {/* Section 1: True, Reactive and Apparent Power */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            True, Reactive and Apparent Power
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In AC circuits with reactive components, the power relationships become more complex than simple P = VI.
              Three distinct power quantities must be understood to properly analyse and design electrical systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">The Three Power Types</p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                  <p className="font-medium text-green-400 mb-1">True Power (P) - Watts</p>
                  <p className="text-sm text-white/90">
                    Also called active or real power. This is the power that actually does useful work - turning motors,
                    producing heat, or generating light. Measured in Watts (W) or kilowatts (kW). This is what you pay for
                    on your electricity bill (kWh consumption).
                  </p>
                  <p className="text-sm font-mono mt-2 text-green-400/80">P = V × I × cos φ</p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                  <p className="font-medium text-blue-400 mb-1">Reactive Power (Q) - Volt-Amperes Reactive</p>
                  <p className="text-sm text-white/90">
                    Power that oscillates between the source and the load, doing no useful work. Required to establish
                    magnetic fields in motors and transformers. Measured in VAr or kVAr. Though it does no work,
                    it still requires current to flow, increasing conductor loading.
                  </p>
                  <p className="text-sm font-mono mt-2 text-blue-400/80">Q = V × I × sin φ</p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                  <p className="font-medium text-purple-400 mb-1">Apparent Power (S) - Volt-Amperes</p>
                  <p className="text-sm text-white/90">
                    The total power that must be supplied by the source - the vector sum of true and reactive power.
                    Measured in VA or kVA. Transformers, generators and cables must be rated for apparent power,
                    not just true power. This is why poor power factor requires larger equipment.
                  </p>
                  <p className="text-sm font-mono mt-2 text-purple-400/80">S = V × I (total current)</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Relationships</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Quantity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Unit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Single-Phase Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Three-Phase Formula</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">True power</td>
                      <td className="border border-white/10 px-3 py-2">P</td>
                      <td className="border border-white/10 px-3 py-2">W, kW</td>
                      <td className="border border-white/10 px-3 py-2">V × I × cos φ</td>
                      <td className="border border-white/10 px-3 py-2">√3 × VL × IL × cos φ</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reactive power</td>
                      <td className="border border-white/10 px-3 py-2">Q</td>
                      <td className="border border-white/10 px-3 py-2">VAr, kVAr</td>
                      <td className="border border-white/10 px-3 py-2">V × I × sin φ</td>
                      <td className="border border-white/10 px-3 py-2">√3 × VL × IL × sin φ</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Apparent power</td>
                      <td className="border border-white/10 px-3 py-2">S</td>
                      <td className="border border-white/10 px-3 py-2">VA, kVA</td>
                      <td className="border border-white/10 px-3 py-2">V × I</td>
                      <td className="border border-white/10 px-3 py-2">√3 × VL × IL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key relationship:</strong> S² = P² + Q² — apparent power is the hypotenuse of the power triangle.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Power Factor and the Power Triangle */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Power Factor and the Power Triangle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power factor is the ratio of true power to apparent power, indicating how effectively current is being
              converted to useful work. It ranges from 0 (purely reactive) to 1 (purely resistive, also called unity).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Power Factor Definition</p>
              <div className="text-center">
                <p className="font-mono text-xl mb-2">pf = P / S = cos φ</p>
                <p className="text-sm text-white/70">Where φ is the phase angle between voltage and current</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Power Triangle</p>
              <div className="p-4 rounded-lg bg-black/30">
                <div className="text-center mb-4">
                  <pre className="text-sm font-mono text-white/90 inline-block text-left">
{`                    S (kVA)
                   /|
                  / |
                 /  |
                /   | Q (kVAr)
               /    |
              /φ    |
             /______|
            P (kW)
`}
                  </pre>
                </div>
                <div className="grid sm:grid-cols-3 gap-3 text-sm">
                  <div className="text-center">
                    <p className="text-green-400 font-medium">Horizontal: P (kW)</p>
                    <p className="text-white/70 text-xs">True power - work done</p>
                  </div>
                  <div className="text-center">
                    <p className="text-blue-400 font-medium">Vertical: Q (kVAr)</p>
                    <p className="text-white/70 text-xs">Reactive power - oscillating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-purple-400 font-medium">Hypotenuse: S (kVA)</p>
                    <p className="text-white/70 text-xs">Apparent power - total supplied</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Triangle Relationships</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">S² = P² + Q²</p>
                  <p className="text-white/70 text-xs">Pythagorean</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">pf = P / S</p>
                  <p className="text-white/70 text-xs">Power factor</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">cos φ = P / S</p>
                  <p className="text-white/70 text-xs">From triangle</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">tan φ = Q / P</p>
                  <p className="text-white/70 text-xs">Q from P and φ</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Leading vs Lagging Power Factor</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                  <p className="font-medium text-orange-400 mb-2">Lagging Power Factor</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Current lags voltage (inductive)</li>
                    <li className="pl-1">Caused by motors, transformers, reactors</li>
                    <li className="pl-1">Most common in building services</li>
                    <li className="pl-1">Q is positive (consuming VAr)</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-cyan-500/50">
                  <p className="font-medium text-cyan-400 mb-2">Leading Power Factor</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Current leads voltage (capacitive)</li>
                    <li className="pl-1">Caused by capacitors, over-excited synchronous motors</li>
                    <li className="pl-1">Used for power factor correction</li>
                    <li className="pl-1">Q is negative (generating VAr)</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Convention:</strong> Always state whether power factor is leading or lagging - "0.85 lagging" for motors, "0.95 leading" would indicate over-correction.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 3: Causes of Poor Power Factor */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Causes of Poor Power Factor in Building Services
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Poor power factor in building services is predominantly caused by inductive loads - equipment that
              requires magnetic fields to operate. Understanding the specific causes helps target correction measures.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Power Factors of Building Services Equipment</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical pf</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-red-500/5">
                      <td className="border border-white/10 px-3 py-2">Induction motors (unloaded)</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">0.30 - 0.40</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                      <td className="border border-white/10 px-3 py-2">Worst case - avoid running unloaded</td>
                    </tr>
                    <tr className="bg-orange-500/5">
                      <td className="border border-white/10 px-3 py-2">Induction motors (50% load)</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">0.70 - 0.80</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                      <td className="border border-white/10 px-3 py-2">Common operating condition</td>
                    </tr>
                    <tr className="bg-yellow-500/5">
                      <td className="border border-white/10 px-3 py-2">Induction motors (full load)</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">0.85 - 0.90</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                      <td className="border border-white/10 px-3 py-2">Best motor pf but still requires correction</td>
                    </tr>
                    <tr className="bg-orange-500/5">
                      <td className="border border-white/10 px-3 py-2">Transformers (light load)</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">0.50 - 0.70</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                      <td className="border border-white/10 px-3 py-2">Magnetising current dominates</td>
                    </tr>
                    <tr className="bg-yellow-500/5">
                      <td className="border border-white/10 px-3 py-2">Transformers (full load)</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">0.85 - 0.95</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                      <td className="border border-white/10 px-3 py-2">Load current improves pf</td>
                    </tr>
                    <tr className="bg-red-500/5">
                      <td className="border border-white/10 px-3 py-2">Fluorescent (magnetic ballast)</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">0.50 - 0.60</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                      <td className="border border-white/10 px-3 py-2">Legacy equipment - replace with LED</td>
                    </tr>
                    <tr className="bg-green-500/5">
                      <td className="border border-white/10 px-3 py-2">Fluorescent (HF electronic)</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">0.95+</td>
                      <td className="border border-white/10 px-3 py-2">Near unity</td>
                      <td className="border border-white/10 px-3 py-2">Built-in pf correction</td>
                    </tr>
                    <tr className="bg-green-500/5">
                      <td className="border border-white/10 px-3 py-2">LED luminaires (quality drivers)</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">0.90 - 0.98</td>
                      <td className="border border-white/10 px-3 py-2">Near unity</td>
                      <td className="border border-white/10 px-3 py-2">Varies by manufacturer</td>
                    </tr>
                    <tr className="bg-green-500/5">
                      <td className="border border-white/10 px-3 py-2">Resistance heaters</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">1.00</td>
                      <td className="border border-white/10 px-3 py-2">Unity</td>
                      <td className="border border-white/10 px-3 py-2">Purely resistive - no reactive component</td>
                    </tr>
                    <tr className="bg-green-500/5">
                      <td className="border border-white/10 px-3 py-2">Modern VSDs</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">0.95+</td>
                      <td className="border border-white/10 px-3 py-2">Near unity</td>
                      <td className="border border-white/10 px-3 py-2">Active front end with pf correction</td>
                    </tr>
                    <tr className="bg-yellow-500/5">
                      <td className="border border-white/10 px-3 py-2">Welding equipment</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">0.50 - 0.70</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                      <td className="border border-white/10 px-3 py-2">Transformer-based</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Primary Causes in Buildings</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">HVAC Systems</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">AHU fan motors (often 50-70% loaded)</li>
                    <li className="pl-1">Chiller compressor motors</li>
                    <li className="pl-1">Pump motors for CHW/condenser water</li>
                    <li className="pl-1">Cooling tower fan motors</li>
                    <li className="pl-1">FCU fan motors throughout building</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Other Building Loads</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Lift motors (highly variable loading)</li>
                    <li className="pl-1">Escalator drives</li>
                    <li className="pl-1">Distribution transformers</li>
                    <li className="pl-1">Legacy discharge lighting</li>
                    <li className="pl-1">UPS systems (varies by type)</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Motor loading significantly affects power factor - a motor running at 25% load may have pf of 0.55, while the same motor at 100% load achieves 0.88. Right-sizing motors is essential.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Effects of Poor Power Factor */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Effects on Electrical Systems and DNO Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Poor power factor has significant technical and commercial consequences for building electrical systems.
              The effects compound throughout the installation from individual circuits to the DNO connection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Technical Effects</p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                  <p className="font-medium text-red-400 mb-2">Increased Current</p>
                  <p className="text-sm text-white/90 mb-2">
                    For the same real power (kW), poor pf requires higher current. Current increases by factor 1/pf.
                  </p>
                  <div className="bg-black/30 p-3 rounded text-sm font-mono">
                    <p>At 0.7 pf: Current = 1/0.7 = 1.43× higher than unity pf</p>
                    <p>At 0.8 pf: Current = 1/0.8 = 1.25× higher than unity pf</p>
                    <p>At 0.9 pf: Current = 1/0.9 = 1.11× higher than unity pf</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                  <p className="font-medium text-orange-400 mb-2">Increased Cable Losses (I²R)</p>
                  <p className="text-sm text-white/90 mb-2">
                    Power loss in conductors is proportional to current squared. Poor pf dramatically increases losses.
                  </p>
                  <div className="bg-black/30 p-3 rounded text-sm font-mono">
                    <p>At 0.7 pf: Losses = (1/0.7)² = 2.04× higher</p>
                    <p>At 0.8 pf: Losses = (1/0.8)² = 1.56× higher</p>
                    <p>At 0.9 pf: Losses = (1/0.9)² = 1.23× higher</p>
                  </div>
                  <p className="text-sm text-white/70 mt-2">This wasted energy appears as heat in cables, transformers and switchgear.</p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-yellow-500/50">
                  <p className="font-medium text-yellow-400 mb-2">Increased Voltage Drop</p>
                  <p className="text-sm text-white/90 mb-2">
                    Higher current causes proportionally greater voltage drop along cables (Vd = I × R × L × 2).
                    May require larger cables to meet the 5% voltage drop limit for power circuits.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                  <p className="font-medium text-purple-400 mb-2">Oversized Equipment Required</p>
                  <p className="text-sm text-white/90">
                    Transformers, generators, cables and switchgear must be rated for apparent power (kVA).
                    A 100kW load at 0.7 pf requires 143kVA capacity - 43% larger than at unity pf.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DNO Requirements and Charges</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">UK Typical Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Minimum power factor</td>
                      <td className="border border-white/10 px-3 py-2">0.90 lagging or better</td>
                      <td className="border border-white/10 px-3 py-2">Below this, reactive charges apply</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reactive power charge</td>
                      <td className="border border-white/10 px-3 py-2">p/kVArh (varies by DNO)</td>
                      <td className="border border-white/10 px-3 py-2">Charged on excess kVArh above 0.90 pf equivalent</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maximum demand charge</td>
                      <td className="border border-white/10 px-3 py-2">Based on kVA not kW</td>
                      <td className="border border-white/10 px-3 py-2">Poor pf increases MD charges</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Connection agreement</td>
                      <td className="border border-white/10 px-3 py-2">May specify pf requirement</td>
                      <td className="border border-white/10 px-3 py-2">Breach may result in penalty or disconnection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Measurement</td>
                      <td className="border border-white/10 px-3 py-2">Half-hourly metering</td>
                      <td className="border border-white/10 px-3 py-2">kWh and kVArh recorded for each HH period</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Commercial Impact Example</p>
              <p className="text-sm text-white/90">
                A 500kW commercial building at 0.75 pf draws 667kVA apparent power. This requires:
              </p>
              <ul className="text-sm text-white/90 mt-2 space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">33% larger transformer capacity (667kVA vs 500kVA at unity)</li>
                <li className="pl-1">78% higher I²R losses in all distribution cables</li>
                <li className="pl-1">Reactive power charges on 441kVArh per hour of operation</li>
                <li className="pl-1">Higher maximum demand charges based on kVA reading</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Target:</strong> Most installations should aim for 0.95 lagging power factor, providing margin above the 0.90 penalty threshold while avoiding over-correction to leading pf.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Power Triangle Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A three-phase motor draws 45kW at 0.82 power factor lagging. Calculate the reactive power (Q) and apparent power (S).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given: P = 45kW, pf = cos φ = 0.82</p>
                <p className="mt-2">Step 1: Find apparent power</p>
                <p>S = P / pf = 45 / 0.82 = <strong>54.9kVA</strong></p>
                <p className="mt-2">Step 2: Find phase angle</p>
                <p>φ = cos⁻¹(0.82) = 34.9°</p>
                <p className="mt-2">Step 3: Find reactive power</p>
                <p>Q = S × sin φ = 54.9 × sin(34.9°) = 54.9 × 0.572</p>
                <p>Q = <strong>31.4kVAr</strong></p>
                <p className="mt-2 text-white/60">Check: S² = P² + Q² → 54.9² = 45² + 31.4² → 3014 ≈ 2025 + 986 ✓</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Current Comparison at Different Power Factors</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 30kW three-phase load operates at 400V. Compare the line current at (a) unity pf, (b) 0.85 pf, and (c) 0.70 pf.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using: I = P / (√3 × V × pf)</p>
                <p className="mt-2">(a) At unity pf (1.0):</p>
                <p>I = 30000 / (1.732 × 400 × 1.0) = <strong>43.3A</strong></p>
                <p className="mt-2">(b) At 0.85 pf:</p>
                <p>I = 30000 / (1.732 × 400 × 0.85) = <strong>50.9A</strong> (18% increase)</p>
                <p className="mt-2">(c) At 0.70 pf:</p>
                <p>I = 30000 / (1.732 × 400 × 0.70) = <strong>61.9A</strong> (43% increase)</p>
                <p className="mt-2 text-red-400">At 0.70 pf, current is 43% higher, losses are 104% higher (2.04×)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Transformer Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A building has 200kW of load at 0.75 pf and 100kW of resistive heating. What transformer kVA rating is required?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Heating load (unity pf)</p>
                <p>S₁ = P₁ / pf = 100 / 1.0 = 100kVA</p>
                <p>Q₁ = 0kVAr (resistive)</p>
                <p className="mt-2">Step 2: Motor/inductive load</p>
                <p>S₂ = P₂ / pf = 200 / 0.75 = 266.7kVA</p>
                <p>Q₂ = √(S₂² - P₂²) = √(266.7² - 200²) = 176.8kVAr</p>
                <p className="mt-2">Step 3: Total power</p>
                <p>P_total = 100 + 200 = 300kW</p>
                <p>Q_total = 0 + 176.8 = 176.8kVAr</p>
                <p className="mt-2">Step 4: Total apparent power</p>
                <p>S_total = √(300² + 176.8²) = √(90000 + 31258)</p>
                <p>S_total = √121258 = <strong>348.2kVA</strong></p>
                <p className="mt-2">Combined pf = 300/348.2 = 0.86 lagging</p>
                <p className="mt-2 text-white/60">→ Select 400kVA transformer (next standard size)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: DNO Reactive Power Charges</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A factory operates at 150kW average load, 0.78 pf, for 2000 hours per year. If the DNO charges 0.45p/kVArh for reactive power above 0.90 pf equivalent, calculate the annual reactive charge.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Actual reactive power at 0.78 pf</p>
                <p>S = 150/0.78 = 192.3kVA</p>
                <p>Q_actual = √(192.3² - 150²) = 120.4kVAr</p>
                <p className="mt-2">Step 2: Allowable reactive power at 0.90 pf</p>
                <p>S_allowed = 150/0.90 = 166.7kVA</p>
                <p>Q_allowed = √(166.7² - 150²) = 72.6kVAr</p>
                <p className="mt-2">Step 3: Excess reactive power</p>
                <p>Q_excess = 120.4 - 72.6 = 47.8kVAr</p>
                <p className="mt-2">Step 4: Annual excess kVArh</p>
                <p>Annual kVArh = 47.8 × 2000 = 95,600 kVArh</p>
                <p className="mt-2">Step 5: Annual charge</p>
                <p>Charge = 95,600 × 0.45p = <strong>43,020p = £430.20</strong></p>
                <p className="mt-2 text-green-400">This does not include additional losses and MD charges - total savings from pf correction would be significantly higher</p>
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
                <li className="pl-1"><strong>pf = P/S = cos φ</strong> — Power factor definition</li>
                <li className="pl-1"><strong>S² = P² + Q²</strong> — Power triangle (Pythagoras)</li>
                <li className="pl-1"><strong>P = V × I × cos φ</strong> — True power (single-phase)</li>
                <li className="pl-1"><strong>Q = V × I × sin φ</strong> — Reactive power (single-phase)</li>
                <li className="pl-1"><strong>P = √3 × VL × IL × cos φ</strong> — True power (three-phase)</li>
                <li className="pl-1"><strong>I₂/I₁ = pf₁/pf₂</strong> — Current ratio at different power factors</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">DNO penalty threshold: typically <strong>0.90 lagging</strong></li>
                <li className="pl-1">Target power factor: <strong>0.95 lagging</strong></li>
                <li className="pl-1">Induction motor (full load): <strong>0.85-0.90</strong></li>
                <li className="pl-1">Induction motor (no load): <strong>0.30-0.40</strong></li>
                <li className="pl-1">Modern LED drivers: <strong>0.90-0.98</strong></li>
                <li className="pl-1">Resistance heaters: <strong>1.00 (unity)</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Impact Reference</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Power Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Current Increase</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Loss Increase (I²R)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">kVA for 100kW</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1.00 (unity)</td>
                      <td className="border border-white/10 px-3 py-2">0%</td>
                      <td className="border border-white/10 px-3 py-2">0%</td>
                      <td className="border border-white/10 px-3 py-2">100kVA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.95</td>
                      <td className="border border-white/10 px-3 py-2">+5%</td>
                      <td className="border border-white/10 px-3 py-2">+11%</td>
                      <td className="border border-white/10 px-3 py-2">105kVA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.90</td>
                      <td className="border border-white/10 px-3 py-2">+11%</td>
                      <td className="border border-white/10 px-3 py-2">+23%</td>
                      <td className="border border-white/10 px-3 py-2">111kVA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.85</td>
                      <td className="border border-white/10 px-3 py-2">+18%</td>
                      <td className="border border-white/10 px-3 py-2">+38%</td>
                      <td className="border border-white/10 px-3 py-2">118kVA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.80</td>
                      <td className="border border-white/10 px-3 py-2">+25%</td>
                      <td className="border border-white/10 px-3 py-2">+56%</td>
                      <td className="border border-white/10 px-3 py-2">125kVA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.70</td>
                      <td className="border border-white/10 px-3 py-2">+43%</td>
                      <td className="border border-white/10 px-3 py-2">+104%</td>
                      <td className="border border-white/10 px-3 py-2">143kVA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Confusing P and S</strong> — Transformers and cables are rated for kVA, not kW</li>
                <li className="pl-1"><strong>Forgetting direction</strong> — Always state lagging or leading power factor</li>
                <li className="pl-1"><strong>Adding kVA directly</strong> — Must use vector addition (P and Q separately)</li>
                <li className="pl-1"><strong>Ignoring motor loading</strong> — Lightly loaded motors have much worse pf</li>
                <li className="pl-1"><strong>Over-correcting</strong> — Leading pf can cause resonance and voltage issues</li>
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
                  <li>True power (P) - Watts - useful work</li>
                  <li>Reactive power (Q) - VAr - oscillating</li>
                  <li>Apparent power (S) - VA - total supplied</li>
                  <li>Power factor = P/S = cos φ (0-1)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Building Services</p>
                <ul className="space-y-0.5">
                  <li>DNO threshold: 0.90 lagging</li>
                  <li>Target pf: 0.95 lagging</li>
                  <li>Motors: 0.85-0.90 (loaded)</li>
                  <li>Losses: increase as (1/pf)²</li>
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
            <Link to="../h-n-c-module3-section2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 2.3
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section2-5">
              Next: Section 2.5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section2_4;
