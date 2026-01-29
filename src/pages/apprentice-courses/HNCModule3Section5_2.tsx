import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Transformer Theory, Losses and Efficiency - HNC Module 3 Section 5.2";
const DESCRIPTION = "Master transformer operation principles including turns ratio, voltage and current transformation, core and copper losses, efficiency calculations, voltage regulation and building services applications.";

const quickCheckQuestions = [
  {
    id: "turns-ratio",
    question: "A transformer has 1000 primary turns and 100 secondary turns. If the primary voltage is 11kV, what is the secondary voltage?",
    options: ["110V", "1100V", "11000V", "110kV"],
    correctIndex: 1,
    explanation: "Using V1/V2 = N1/N2: V2 = V1 x (N2/N1) = 11000 x (100/1000) = 1100V. The turns ratio of 10:1 steps down the voltage by a factor of 10."
  },
  {
    id: "current-transform",
    question: "A step-down transformer reduces voltage from 400V to 230V. If the secondary current is 50A, what is the primary current (assuming ideal transformer)?",
    options: ["28.8A", "50A", "86.9A", "100A"],
    correctIndex: 0,
    explanation: "For an ideal transformer, V1 x I1 = V2 x I2. Therefore I1 = (V2 x I2) / V1 = (230 x 50) / 400 = 28.75A. When voltage steps down, current steps up proportionally."
  },
  {
    id: "core-losses",
    question: "Which type of transformer loss remains essentially constant regardless of load?",
    options: ["Copper losses", "Stray losses", "Core losses (iron losses)", "Eddy current losses only"],
    correctIndex: 2,
    explanation: "Core losses (hysteresis and eddy current losses) depend on the flux in the core, which is determined by the applied voltage. As voltage remains constant, core losses are constant regardless of load current."
  },
  {
    id: "efficiency-calc",
    question: "A transformer delivers 45kW output with 2kW total losses. What is its efficiency?",
    options: ["91.5%", "95.7%", "97.8%", "100%"],
    correctIndex: 1,
    explanation: "Efficiency = Pout / (Pout + losses) = 45 / (45 + 2) = 45/47 = 0.957 = 95.7%. This can also be calculated as Pout/Pin = 45/47."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the fundamental principle upon which transformers operate?",
    options: [
      "Electrostatic induction",
      "Electromagnetic induction",
      "Electromechanical conversion",
      "Thermoelectric effect"
    ],
    correctAnswer: 1,
    explanation: "Transformers operate on the principle of electromagnetic induction, where a changing magnetic flux in the primary winding induces an EMF in the secondary winding."
  },
  {
    id: 2,
    question: "A transformer has a turns ratio of 20:1 (step-down). If connected to 11kV supply, what is the secondary voltage?",
    options: ["220V", "440V", "550V", "1100V"],
    correctAnswer: 2,
    explanation: "V2 = V1 / turns ratio = 11000 / 20 = 550V. For a step-down transformer, the secondary voltage equals the primary voltage divided by the turns ratio."
  },
  {
    id: 3,
    question: "In an ideal transformer with turns ratio 2:1, if primary current is 5A, what is the secondary current?",
    options: ["2.5A", "5A", "10A", "20A"],
    correctAnswer: 2,
    explanation: "Using I1/I2 = N2/N1 (inverse of voltage ratio): I2 = I1 x (N1/N2) = 5 x 2 = 10A. In a step-down transformer, current steps up by the same ratio."
  },
  {
    id: 4,
    question: "What causes hysteresis losses in a transformer core?",
    options: [
      "Resistance of the copper windings",
      "Molecular friction as magnetic domains realign each cycle",
      "Circulating currents in the core laminations",
      "Leakage flux between windings"
    ],
    correctAnswer: 1,
    explanation: "Hysteresis losses result from the energy required to continuously reverse the magnetic domains in the core material as the AC flux alternates 50 times per second."
  },
  {
    id: 5,
    question: "How are eddy current losses minimised in transformer cores?",
    options: [
      "Using thicker laminations",
      "Using solid iron cores",
      "Using thin laminations insulated from each other",
      "Increasing core cross-sectional area"
    ],
    correctAnswer: 2,
    explanation: "Thin laminations (typically 0.35mm-0.5mm) coated with insulating varnish break up the eddy current paths, significantly reducing I squared R losses in the core."
  },
  {
    id: 6,
    question: "A 100kVA transformer has full-load copper losses of 1.5kW and core losses of 1kW. What is its efficiency at full load with 0.8 power factor?",
    options: ["96.0%", "96.9%", "97.5%", "98.5%"],
    correctAnswer: 1,
    explanation: "Output power = 100 x 0.8 = 80kW. Total losses = 1.5 + 1 = 2.5kW. Efficiency = 80 / (80 + 2.5) = 80/82.5 = 96.97% which rounds to 96.9%"
  },
  {
    id: 7,
    question: "At what load does a transformer achieve maximum efficiency?",
    options: [
      "Always at full load",
      "When copper losses equal core losses",
      "When core losses are minimum",
      "Always at half load"
    ],
    correctAnswer: 1,
    explanation: "Maximum efficiency occurs when variable losses (copper losses) equal fixed losses (core losses). This typically occurs at 50-75% of full load for most transformers."
  },
  {
    id: 8,
    question: "A transformer has no-load voltage of 240V and full-load voltage of 230V at 0.8 pf lagging. What is the voltage regulation?",
    options: ["2.1%", "4.2%", "4.3%", "5.0%"],
    correctAnswer: 2,
    explanation: "Voltage regulation = (V no-load - V full-load) / V full-load x 100 = (240 - 230) / 230 x 100 = 4.35% which rounds to 4.3%"
  },
  {
    id: 9,
    question: "What is the typical percentage impedance for a 1000kVA distribution transformer?",
    options: ["2-3%", "4-6%", "8-10%", "12-15%"],
    correctAnswer: 1,
    explanation: "Distribution transformers typically have 4-6% impedance. Lower impedance allows higher fault currents but better voltage regulation; higher impedance limits fault current but increases voltage drop."
  },
  {
    id: 10,
    question: "Why are isolation transformers used in building services applications?",
    options: [
      "To step voltage up for long cable runs",
      "To provide galvanic isolation between circuits for safety",
      "To improve power factor",
      "To reduce harmonic distortion"
    ],
    correctAnswer: 1,
    explanation: "Isolation transformers provide galvanic separation between primary and secondary circuits, preventing direct electrical connection. This is essential for safety in applications like medical equipment, IT systems and bathrooms."
  }
];

const faqs = [
  {
    question: "Why do transformers only work with AC and not DC?",
    answer: "Transformers rely on electromagnetic induction, which requires a changing magnetic flux to induce voltage in the secondary winding. DC produces a constant flux with no change, so no EMF is induced. The 50Hz AC supply creates flux that changes 100 times per second (twice per cycle), enabling continuous energy transfer."
  },
  {
    question: "What is the difference between core-type and shell-type transformers?",
    answer: "In core-type transformers, the windings surround the core limbs; in shell-type, the core surrounds the windings. Core-type is common for high-voltage distribution transformers due to easier insulation. Shell-type provides better mechanical strength and is often used in smaller power transformers."
  },
  {
    question: "How does the percentage impedance affect fault current?",
    answer: "Fault current is inversely proportional to percentage impedance: I fault = (100 / Z%) x I rated. A 5% impedance transformer will pass 20 times rated current during a short circuit. Higher impedance limits fault current but increases voltage drop under load."
  },
  {
    question: "Why is oil used in large distribution transformers?",
    answer: "Transformer oil serves two purposes: cooling and insulation. It transfers heat from the windings and core to the tank/radiators for dissipation, whilst providing excellent electrical insulation between windings and between windings and tank. Oil-filled transformers can handle much higher ratings than dry-type."
  },
  {
    question: "What causes humming noise in transformers?",
    answer: "Transformer hum is caused by magnetostriction - the core laminations physically expand and contract slightly as the magnetic flux alternates. This 100Hz vibration (twice the 50Hz supply frequency) produces the characteristic hum. Loose laminations or mounting can amplify the noise."
  },
  {
    question: "When would you choose a dry-type transformer over oil-filled?",
    answer: "Dry-type transformers are preferred indoors, in fire-sensitive locations (hospitals, high-rise buildings), and where environmental concerns preclude oil. They are self-extinguishing and require no fire suppression. However, they are limited to around 2.5MVA and are more expensive per kVA than oil-filled units."
  }
];

const HNCModule3Section5_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section5">
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
            <span>Module 3.5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Transformer Theory, Losses and Efficiency
          </h1>
          <p className="text-white/80">
            Understanding voltage transformation, losses and efficiency calculations for building services distribution systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Turns ratio:</strong> V1/V2 = N1/N2 (voltage transformation)</li>
              <li className="pl-1"><strong>Current:</strong> I1/I2 = N2/N1 (inverse relationship)</li>
              <li className="pl-1"><strong>Losses:</strong> Core (constant) + Copper (load-dependent)</li>
              <li className="pl-1"><strong>Efficiency:</strong> Output / (Output + Losses) x 100%</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Distribution:</strong> 11kV/400V substations</li>
              <li className="pl-1"><strong>Isolation:</strong> IT systems, medical locations</li>
              <li className="pl-1"><strong>Efficiency:</strong> Typically 97-99% for modern units</li>
              <li className="pl-1"><strong>Ratings:</strong> kVA, impedance, tap positions</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the ideal transformer equations for voltage and current",
              "Calculate turns ratio for step-up and step-down applications",
              "Distinguish between core losses and copper losses",
              "Calculate transformer efficiency at various load conditions",
              "Determine voltage regulation and its practical implications",
              "Understand transformer ratings, impedance and applications"
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

        {/* Section 1: Ideal Transformer */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Ideal Transformer
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A transformer transfers electrical energy between circuits through electromagnetic induction,
              with no direct electrical connection between primary and secondary windings. An ideal transformer
              has no losses and 100% efficiency.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Fundamental Transformer Equation</p>
              <div className="text-center">
                <p className="font-mono text-xl mb-2">V<sub>1</sub> / V<sub>2</sub> = N<sub>1</sub> / N<sub>2</sub></p>
                <p className="text-xs text-white/70">Primary voltage : Secondary voltage = Primary turns : Secondary turns</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key ideal transformer relationships:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Voltage ratio:</strong> V1/V2 = N1/N2 = a (turns ratio)</li>
                <li className="pl-1"><strong>Current ratio:</strong> I1/I2 = N2/N1 = 1/a (inverse of voltage ratio)</li>
                <li className="pl-1"><strong>Power:</strong> V1 x I1 = V2 x I2 (power in = power out)</li>
                <li className="pl-1"><strong>Impedance ratio:</strong> Z1/Z2 = (N1/N2)squared = a squared</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transformer Types by Voltage Ratio</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Turns Ratio</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Current</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Step-down</td>
                      <td className="border border-white/10 px-3 py-2">N1 &gt; N2</td>
                      <td className="border border-white/10 px-3 py-2">V2 &lt; V1</td>
                      <td className="border border-white/10 px-3 py-2">I2 &gt; I1</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Step-up</td>
                      <td className="border border-white/10 px-3 py-2">N1 &lt; N2</td>
                      <td className="border border-white/10 px-3 py-2">V2 &gt; V1</td>
                      <td className="border border-white/10 px-3 py-2">I2 &lt; I1</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Isolation (1:1)</td>
                      <td className="border border-white/10 px-3 py-2">N1 = N2</td>
                      <td className="border border-white/10 px-3 py-2">V2 = V1</td>
                      <td className="border border-white/10 px-3 py-2">I2 = I1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> In a step-down transformer, voltage decreases but current increases proportionally, maintaining constant power (V x I).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Turns Ratio and Current Transformation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Turns Ratio and Current Transformation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The turns ratio determines both the voltage and current transformation. Understanding this
              relationship is essential for sizing cables, protection devices and ensuring proper load matching.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Current Transformation</p>
              <div className="text-center">
                <p className="font-mono text-xl mb-2">I<sub>1</sub> / I<sub>2</sub> = N<sub>2</sub> / N<sub>1</sub></p>
                <p className="text-xs text-white/70">Current ratio is the inverse of the turns ratio</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Step-Down Example (11kV/400V)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Turns ratio: 11000/400 = 27.5:1</li>
                  <li className="pl-1">Primary current: Lower (HV side)</li>
                  <li className="pl-1">Secondary current: 27.5x higher</li>
                  <li className="pl-1">HV cables: Smaller CSA</li>
                  <li className="pl-1">LV cables: Much larger CSA</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Implications</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">HV transmission: High V, low I = small cables</li>
                  <li className="pl-1">LV distribution: Low V, high I = large cables</li>
                  <li className="pl-1">CT sizing: Based on secondary current</li>
                  <li className="pl-1">Protection settings: Match transformer ratio</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Distribution Transformer Ratios</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Primary</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Secondary</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Grid to distribution</td>
                      <td className="border border-white/10 px-3 py-2">33kV</td>
                      <td className="border border-white/10 px-3 py-2">11kV</td>
                      <td className="border border-white/10 px-3 py-2">3:1</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Substation (UK)</td>
                      <td className="border border-white/10 px-3 py-2">11kV</td>
                      <td className="border border-white/10 px-3 py-2">400V</td>
                      <td className="border border-white/10 px-3 py-2">27.5:1</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building intake</td>
                      <td className="border border-white/10 px-3 py-2">400V</td>
                      <td className="border border-white/10 px-3 py-2">230V</td>
                      <td className="border border-white/10 px-3 py-2">1.74:1</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control circuits</td>
                      <td className="border border-white/10 px-3 py-2">400V</td>
                      <td className="border border-white/10 px-3 py-2">110V</td>
                      <td className="border border-white/10 px-3 py-2">3.64:1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> When sizing cables at the secondary, remember current increases by the turns ratio. A 100A HV feeder to a 27.5:1 transformer delivers up to 2750A on the LV side.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Core Losses */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Core Losses (Iron Losses)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Core losses occur in the magnetic circuit and are present whenever the transformer is energised,
              regardless of load. They consist of hysteresis losses and eddy current losses, both of which
              generate heat and reduce efficiency.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hysteresis Losses</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cause:</strong> Energy required to reverse magnetic domains each cycle</li>
                <li className="pl-1"><strong>Formula:</strong> Ph = kh x f x Bmax to the power 1.6 x Volume</li>
                <li className="pl-1"><strong>Depends on:</strong> Frequency, flux density, core material</li>
                <li className="pl-1"><strong>Reduction:</strong> Use grain-oriented silicon steel (low hysteresis)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Eddy Current Losses</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cause:</strong> Circulating currents induced in core by changing flux</li>
                <li className="pl-1"><strong>Formula:</strong> Pe = ke x f squared x Bmax squared x t squared</li>
                <li className="pl-1"><strong>Depends on:</strong> Frequency (squared), lamination thickness (t)</li>
                <li className="pl-1"><strong>Reduction:</strong> Thin laminations (0.35-0.5mm) with insulating coating</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Characteristics of Core Losses</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white/80 mb-1">Constant Losses</p>
                  <p className="text-xs text-white/70">
                    Core losses depend on applied voltage (which determines flux), not on load current.
                    A transformer on no-load still experiences full core losses.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/80 mb-1">Measured by No-Load Test</p>
                  <p className="text-xs text-white/70">
                    Open-circuit test at rated voltage measures core losses directly, as copper losses
                    are negligible with no secondary current flowing.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Core Loss Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Rating (kVA)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Core Loss</th>
                      <th className="border border-white/10 px-3 py-2 text-left">% of Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100</td>
                      <td className="border border-white/10 px-3 py-2">300-400W</td>
                      <td className="border border-white/10 px-3 py-2">0.3-0.4%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">500</td>
                      <td className="border border-white/10 px-3 py-2">900-1200W</td>
                      <td className="border border-white/10 px-3 py-2">0.18-0.24%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1000</td>
                      <td className="border border-white/10 px-3 py-2">1500-2000W</td>
                      <td className="border border-white/10 px-3 py-2">0.15-0.2%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> Amorphous metal cores can reduce core losses by 70-80% compared to silicon steel, making them ideal for distribution transformers that operate continuously.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Copper Losses */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Copper Losses (Load Losses)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Copper losses occur in the transformer windings due to the resistance of the conductors.
              Unlike core losses, copper losses vary with the square of the load current, making them
              the dominant loss component at high loads.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Copper Loss Formula</p>
              <div className="text-center">
                <p className="font-mono text-xl mb-2">P<sub>cu</sub> = I<sub>1</sub> squared R<sub>1</sub> + I<sub>2</sub> squared R<sub>2</sub></p>
                <p className="text-xs text-white/70">Total copper loss = Primary I squared R loss + Secondary I squared R loss</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Characteristics</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Proportional to I squared (quadruples if current doubles)</li>
                  <li className="pl-1">Zero at no-load</li>
                  <li className="pl-1">Maximum at full load</li>
                  <li className="pl-1">Measured by short-circuit test</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reduction Methods</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Larger conductor cross-section</li>
                  <li className="pl-1">Shorter winding lengths</li>
                  <li className="pl-1">Better cooling (lower temperature rise)</li>
                  <li className="pl-1">Transposed conductors (reduce eddy effects)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load-Dependent Nature of Copper Losses</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Load (%)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Current (p.u.)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Copper Loss (% of FL)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25%</td>
                      <td className="border border-white/10 px-3 py-2">0.25</td>
                      <td className="border border-white/10 px-3 py-2">6.25%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50%</td>
                      <td className="border border-white/10 px-3 py-2">0.50</td>
                      <td className="border border-white/10 px-3 py-2">25%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">75%</td>
                      <td className="border border-white/10 px-3 py-2">0.75</td>
                      <td className="border border-white/10 px-3 py-2">56.25%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">1.00</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Practical note:</strong> Full-load copper losses are typically 1-2% of transformer rating. For a 1000kVA transformer, expect 10-20kW copper loss at full load.
            </p>
          </div>
        </section>

        {/* Section 5: Efficiency Calculation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Efficiency Calculation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Transformer efficiency represents the ratio of output power to input power. Modern distribution
              transformers achieve efficiencies of 97-99%, but even small percentage losses represent
              significant energy costs over the transformer's lifetime.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Efficiency Formulae</p>
              <div className="space-y-3 text-center">
                <div>
                  <p className="font-mono text-lg">Efficiency = P<sub>out</sub> / P<sub>in</sub> x 100%</p>
                </div>
                <div>
                  <p className="font-mono text-lg">Efficiency = P<sub>out</sub> / (P<sub>out</sub> + P<sub>core</sub> + P<sub>cu</sub>) x 100%</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Efficiency at Partial Load</p>
              <p className="text-sm text-white mb-3">
                Since copper losses vary with load squared whilst core losses remain constant, efficiency varies with load:
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>At fraction 'x' of full load:</p>
                <p className="mt-2">P<sub>out</sub> = x x S x cos phi (where S = rated kVA)</p>
                <p>P<sub>cu</sub> = x squared x P<sub>cu(FL)</sub></p>
                <p>P<sub>core</sub> = constant</p>
                <p className="mt-2">eta = (x x S x cos phi) / (x x S x cos phi + x squared x P<sub>cu(FL)</sub> + P<sub>core</sub>)</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">Maximum Efficiency Condition</p>
              <p className="text-sm text-white">
                Maximum efficiency occurs when <strong>copper losses equal core losses</strong>. This typically
                happens at 50-70% of full load for most transformers, making them most efficient under normal
                operating conditions rather than at full rated capacity.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">All-Day (Energy) Efficiency</p>
              <p className="text-sm text-white mb-3">
                For transformers that operate at varying loads throughout the day, energy efficiency is more relevant:
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>eta<sub>all-day</sub> = Energy output / Energy input x 100%</p>
                <p className="mt-2">= Output kWh / (Output kWh + Loss kWh) x 100%</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Energy cost:</strong> A 1000kVA transformer operating 8760 hours/year with 2% average losses wastes 175,200 kWh annually - approximately GBP 35,000 at 20p/kWh.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 6: Voltage Regulation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Voltage Regulation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Voltage regulation describes how much the secondary voltage drops from no-load to full-load
              conditions. It is a critical parameter for distribution transformers, affecting the quality
              of supply to connected loads.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Voltage Regulation Formula</p>
              <div className="text-center">
                <p className="font-mono text-xl mb-2">VR = (V<sub>no-load</sub> - V<sub>full-load</sub>) / V<sub>full-load</sub> x 100%</p>
                <p className="text-xs text-white/70">Expressed as a percentage of full-load voltage</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Factors affecting voltage regulation:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Winding resistance:</strong> Causes IR voltage drop</li>
                <li className="pl-1"><strong>Leakage reactance:</strong> Causes IX voltage drop</li>
                <li className="pl-1"><strong>Load power factor:</strong> Lagging pf increases regulation, leading pf decreases it</li>
                <li className="pl-1"><strong>Load current:</strong> Higher current = more voltage drop</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Voltage Regulation Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Transformer Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical VR</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small distribution (&lt;100kVA)</td>
                      <td className="border border-white/10 px-3 py-2">2-4%</td>
                      <td className="border border-white/10 px-3 py-2">Lower impedance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Medium distribution (100-1000kVA)</td>
                      <td className="border border-white/10 px-3 py-2">3-5%</td>
                      <td className="border border-white/10 px-3 py-2">Balanced design</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Large power (&gt;1MVA)</td>
                      <td className="border border-white/10 px-3 py-2">5-8%</td>
                      <td className="border border-white/10 px-3 py-2">Higher impedance for fault limitation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tap Changers</p>
              <p className="text-sm text-white mb-2">
                Tap changers adjust the turns ratio to compensate for voltage variations:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Off-load tap changer:</strong> Manual adjustment when de-energised (typical: plus/minus 5% in 2.5% steps)</li>
                <li className="pl-1"><strong>On-load tap changer (OLTC):</strong> Automatic adjustment under load (typical: plus/minus 10% in 1.25% steps)</li>
                <li className="pl-1"><strong>Building services:</strong> Usually off-load taps set during commissioning</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>BS 7671 context:</strong> Transformer voltage regulation must be considered as part of overall voltage drop calculations - the 5% limit applies from transformer to load.
            </p>
          </div>
        </section>

        {/* Section 7: Transformer Ratings and Impedance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Transformer Ratings and Impedance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding transformer nameplate ratings and percentage impedance is essential for system
              design, protection coordination and fault level calculations in building services installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Nameplate Information</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>kVA rating:</strong> Maximum apparent power at rated voltage and frequency</li>
                <li className="pl-1"><strong>Voltage ratio:</strong> Primary/secondary voltages (e.g., 11000/400V)</li>
                <li className="pl-1"><strong>Frequency:</strong> 50Hz in UK</li>
                <li className="pl-1"><strong>Percentage impedance (Z%):</strong> Short-circuit voltage as percentage of rated</li>
                <li className="pl-1"><strong>Vector group:</strong> Winding connections and phase displacement (e.g., Dyn11)</li>
                <li className="pl-1"><strong>Cooling method:</strong> ONAN, ONAF, AN, AF, etc.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Percentage Impedance</p>
              <div className="text-center mb-3">
                <p className="font-mono text-lg">Z% = (V<sub>sc</sub> / V<sub>rated</sub>) x 100%</p>
                <p className="text-xs text-white/70 mt-1">Voltage required to circulate rated current with secondary shorted</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white/80 mb-1">Low Z% (3-4%)</p>
                  <ul className="text-xs text-white/70 space-y-0.5">
                    <li>+ Better voltage regulation</li>
                    <li>- Higher fault currents</li>
                    <li>Used for: Small distribution</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white/80 mb-1">High Z% (6-8%)</p>
                  <ul className="text-xs text-white/70 space-y-0.5">
                    <li>+ Lower fault currents</li>
                    <li>- Poorer voltage regulation</li>
                    <li>Used for: Large substations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fault Current Calculation</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Short-circuit current at secondary:</p>
                <p className="mt-2">I<sub>sc</sub> = (100 / Z%) x I<sub>rated</sub></p>
                <p className="mt-2">Example: 1000kVA, 400V, Z% = 5%</p>
                <p>I<sub>rated</sub> = 1000000 / (root 3 x 400) = 1443A</p>
                <p>I<sub>sc</sub> = (100 / 5) x 1443 = <strong>28,860A (28.9kA)</strong></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Vector Groups</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Vector Group</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Primary</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Secondary</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Phase Shift</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dyn11</td>
                      <td className="border border-white/10 px-3 py-2">Delta</td>
                      <td className="border border-white/10 px-3 py-2">Star (neutral)</td>
                      <td className="border border-white/10 px-3 py-2">-30 degrees</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Yyn0</td>
                      <td className="border border-white/10 px-3 py-2">Star</td>
                      <td className="border border-white/10 px-3 py-2">Star (neutral)</td>
                      <td className="border border-white/10 px-3 py-2">0 degrees</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dzn0</td>
                      <td className="border border-white/10 px-3 py-2">Delta</td>
                      <td className="border border-white/10 px-3 py-2">Zigzag (neutral)</td>
                      <td className="border border-white/10 px-3 py-2">0 degrees</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Building services:</strong> Dyn11 is the most common vector group for distribution transformers in the UK, providing a secondary neutral for single-phase loads.
            </p>
          </div>
        </section>

        {/* Section 8: Building Services Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Transformers are essential components in building electrical systems, providing voltage
              transformation, galvanic isolation and supply resilience for various applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Distribution Transformers</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Package substations:</strong> 11kV/400V transformers serving large buildings</li>
                <li className="pl-1"><strong>Ratings:</strong> Typically 500kVA-2000kVA for commercial buildings</li>
                <li className="pl-1"><strong>Location:</strong> Dedicated transformer room or external compound</li>
                <li className="pl-1"><strong>Considerations:</strong> Fire rating, ventilation, access, noise, oil containment</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Isolation Transformers</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>IT systems:</strong> 1:1 ratio transformers for medical locations (Group 2)</li>
                <li className="pl-1"><strong>Data centres:</strong> Isolation for sensitive electronic equipment</li>
                <li className="pl-1"><strong>Control circuits:</strong> 400V/110V for industrial controls</li>
                <li className="pl-1"><strong>Purpose:</strong> Galvanic separation, noise filtering, earth fault tolerance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Transformer Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Transformer Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Main intake</td>
                      <td className="border border-white/10 px-3 py-2">11kV/400V oil-filled</td>
                      <td className="border border-white/10 px-3 py-2">High efficiency, OLTC for voltage control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Indoor substation</td>
                      <td className="border border-white/10 px-3 py-2">Dry-type cast resin</td>
                      <td className="border border-white/10 px-3 py-2">Fire safety, no oil, reduced clearances</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Medical IT system</td>
                      <td className="border border-white/10 px-3 py-2">1:1 isolation</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 61558-2-15, IMD monitoring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SELV lighting</td>
                      <td className="border border-white/10 px-3 py-2">230V/12V safety</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 61558-2-6, double insulation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS controls</td>
                      <td className="border border-white/10 px-3 py-2">400V/24V control</td>
                      <td className="border border-white/10 px-3 py-2">Low power, galvanic isolation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Site tools</td>
                      <td className="border border-white/10 px-3 py-2">230V/110V CTE</td>
                      <td className="border border-white/10 px-3 py-2">Centre-tapped earth, max 55V to earth</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">Selection Criteria</p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Load assessment:</strong> Calculate maximum demand with diversity</li>
                <li className="pl-1"><strong>Location:</strong> Indoor (dry-type) vs outdoor (oil-filled)</li>
                <li className="pl-1"><strong>Efficiency:</strong> Consider Tier 2 Ecodesign requirements (2021)</li>
                <li className="pl-1"><strong>Impedance:</strong> Balance fault level vs voltage regulation</li>
                <li className="pl-1"><strong>Future expansion:</strong> Allow 20-30% spare capacity</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Regulation:</strong> EU Ecodesign Regulation 2019/1783 sets minimum efficiency requirements for distribution transformers. Tier 2 (from 2021) requires peak efficiency of 98.25% for 400kVA units.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Transformer Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A commercial building has a maximum demand of 650kW at 0.85 power factor. What minimum transformer kVA rating is required?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Apparent power S = P / cos phi</p>
                <p>S = 650 / 0.85 = 764.7 kVA</p>
                <p className="mt-2">Standard sizes: 500, 750, 1000, 1250 kVA</p>
                <p className="mt-2">Select: <strong>1000 kVA</strong></p>
                <p className="text-white/60 mt-2">Provides 31% spare capacity for future growth</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Efficiency Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 500kVA transformer has core losses of 1.1kW and full-load copper losses of 5.5kW. Calculate efficiency at 75% load with 0.8 power factor.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Output power = 0.75 x 500 x 0.8 = 300 kW</p>
                <p className="mt-2">Copper losses at 75% load:</p>
                <p>P<sub>cu</sub> = 0.75 squared x 5.5 = 0.5625 x 5.5 = 3.09 kW</p>
                <p className="mt-2">Core losses = 1.1 kW (constant)</p>
                <p className="mt-2">Total losses = 3.09 + 1.1 = 4.19 kW</p>
                <p className="mt-2">Efficiency = 300 / (300 + 4.19) x 100</p>
                <p>eta = <strong>98.62%</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Fault Level Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the prospective fault current at the secondary terminals of an 800kVA, 11kV/400V transformer with 5.5% impedance.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Full-load secondary current:</p>
                <p>I<sub>FL</sub> = S / (root 3 x V) = 800000 / (1.732 x 400) = 1155A</p>
                <p className="mt-2">Fault current:</p>
                <p>I<sub>sc</sub> = (100 / Z%) x I<sub>FL</sub></p>
                <p>I<sub>sc</sub> = (100 / 5.5) x 1155 = 18.18 x 1155</p>
                <p>I<sub>sc</sub> = <strong>21 kA</strong></p>
                <p className="text-white/60 mt-2">Switchgear must be rated at least 21kA fault withstand</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Load for Maximum Efficiency</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A transformer has core losses of 2kW and full-load copper losses of 8kW. At what percentage of full load does maximum efficiency occur?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Maximum efficiency when: x squared x P<sub>cu(FL)</sub> = P<sub>core</sub></p>
                <p className="mt-2">x squared x 8 = 2</p>
                <p>x squared = 2/8 = 0.25</p>
                <p>x = root of 0.25 = 0.5 = <strong>50% load</strong></p>
                <p className="text-white/60 mt-2">This transformer is most efficient at half load</p>
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
                <li className="pl-1"><strong>V1/V2 = N1/N2</strong> - Voltage ratio equals turns ratio</li>
                <li className="pl-1"><strong>I1/I2 = N2/N1</strong> - Current ratio is inverse of turns ratio</li>
                <li className="pl-1"><strong>eta = Pout / (Pout + Pcore + Pcu)</strong> - Efficiency</li>
                <li className="pl-1"><strong>VR = (Vno-load - Vfull-load) / Vfull-load x 100%</strong> - Regulation</li>
                <li className="pl-1"><strong>Isc = (100/Z%) x Irated</strong> - Fault current</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">UK distribution ratio: <strong>11kV/400V = 27.5:1</strong></li>
                <li className="pl-1">Typical impedance: <strong>4-6%</strong> for distribution transformers</li>
                <li className="pl-1">Modern efficiency: <strong>97-99%</strong> at rated load</li>
                <li className="pl-1">Max efficiency: When <strong>Pcu = Pcore</strong></li>
                <li className="pl-1">Core losses: <strong>Constant</strong> (voltage dependent)</li>
                <li className="pl-1">Copper losses: <strong>Vary with I squared</strong> (load dependent)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Confusing kW and kVA</strong> - Transformers rated in kVA; include power factor for kW</li>
                <li className="pl-1"><strong>Current ratio direction</strong> - Current steps UP in a step-DOWN transformer</li>
                <li className="pl-1"><strong>Copper loss at part load</strong> - Varies with I squared, not linearly with load</li>
                <li className="pl-1"><strong>Ignoring power factor</strong> - Affects both output power and regulation</li>
                <li className="pl-1"><strong>Z% interpretation</strong> - Lower Z% means HIGHER fault current</li>
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
                <p className="font-medium text-white mb-1">Transformer Equations</p>
                <ul className="space-y-0.5">
                  <li>Voltage: V1/V2 = N1/N2 = a</li>
                  <li>Current: I1/I2 = N2/N1 = 1/a</li>
                  <li>Power: V1I1 = V2I2 (ideal)</li>
                  <li>Impedance: Z1/Z2 = a squared</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Losses and Efficiency</p>
                <ul className="space-y-0.5">
                  <li>Core: Constant (hysteresis + eddy)</li>
                  <li>Copper: I squared R (load dependent)</li>
                  <li>eta = Pout / (Pout + losses)</li>
                  <li>Max eta when Pcu = Pcore</li>
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
            <Link to="../h-n-c-module3-section5-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Electromagnetic Induction
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section5-3">
              Next: AC Machines
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section5_2;
