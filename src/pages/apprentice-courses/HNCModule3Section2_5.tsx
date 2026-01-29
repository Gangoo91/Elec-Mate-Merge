import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Power Factor Correction Methods - HNC Module 3 Section 2.5";
const DESCRIPTION = "Master power factor correction techniques for building services: capacitor bank sizing, automatic switching, star vs delta connections, individual vs group correction, APFC, harmonic considerations, and detuned reactors.";

const quickCheckQuestions = [
  {
    id: "capacitor-formula",
    question: "What is the formula for calculating the required reactive power for PFC?",
    options: ["Qc = P(cos phi1 - cos phi2)", "Qc = P(tan phi1 - tan phi2)", "Qc = P(sin phi1 - sin phi2)", "Qc = P x power factor"],
    correctIndex: 1,
    explanation: "The correct formula is Qc = P(tan phi1 - tan phi2), where P is the real power, phi1 is the original phase angle and phi2 is the target phase angle. This calculates the kVAr of capacitance needed."
  },
  {
    id: "automatic-vs-fixed",
    question: "When should automatic power factor correction be used instead of fixed capacitors?",
    options: ["When load is constant", "When load varies significantly", "When power factor is already 0.95", "When only lighting loads exist"],
    correctIndex: 1,
    explanation: "Automatic PFC systems are essential when loads vary significantly. The controller monitors power factor continuously and switches capacitor stages on/off to maintain target pf. Fixed capacitors risk leading power factor during light loads."
  },
  {
    id: "delta-connection",
    question: "What is the advantage of delta-connected capacitors over star-connected?",
    options: ["Lower cost", "Simpler wiring", "Each capacitor sees line voltage, providing 3x more kVAr per unit", "Better for single-phase loads"],
    correctIndex: 2,
    explanation: "Delta-connected capacitors see line voltage (400V) rather than phase voltage (230V). Since Q = V squared / Xc, the higher voltage means each capacitor provides approximately 3 times more reactive power than the same capacitor in star connection."
  },
  {
    id: "harmonic-detuning",
    question: "What is the purpose of detuned reactors in PFC systems?",
    options: ["Increase power factor", "Prevent harmonic resonance with capacitors", "Reduce capacitor voltage", "Improve switching speed"],
    correctIndex: 1,
    explanation: "Detuned reactors shift the resonant frequency of the capacitor bank below dominant harmonic frequencies (typically 189Hz or 135Hz). This prevents dangerous resonance that could amplify harmonics and damage capacitors in systems with significant harmonic content."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A factory has a 200kW load operating at 0.75 power factor. What capacitor bank size is needed to improve to 0.95 pf?",
    options: [
      "75 kVAr",
      "88 kVAr",
      "100 kVAr",
      "113 kVAr"
    ],
    correctAnswer: 3,
    explanation: "Qc = P(tan phi1 - tan phi2). At 0.75 pf, phi1 = 41.4 degrees, tan phi1 = 0.882. At 0.95 pf, phi2 = 18.2 degrees, tan phi2 = 0.329. Qc = 200 x (0.882 - 0.329) = 200 x 0.553 = 110.6 kVAr. Nearest standard size would be 112.5 or 120 kVAr, so 113 kVAr is the best answer."
  },
  {
    id: 2,
    question: "What is the relationship between kVAr rating of a capacitor connected in star versus delta?",
    options: ["Star provides more kVAr", "They are equal", "Delta provides approximately 3x more kVAr", "Delta provides approximately root3 x more kVAr"],
    correctAnswer: 2,
    explanation: "Q = V squared / Xc. In delta, capacitors see 400V; in star, they see 230V. (400/230) squared = 1.74 squared is approximately 3. Therefore delta connection provides approximately 3 times the reactive power for the same capacitor."
  },
  {
    id: 3,
    question: "What is the typical target power factor for commercial buildings in the UK?",
    options: ["0.85 lagging", "0.90 lagging", "0.95 lagging or better", "Unity (1.0)"],
    correctAnswer: 2,
    explanation: "UK DNOs (Distribution Network Operators) typically require 0.95 lagging or better to avoid reactive power charges. Over-correction to unity or leading is avoided as it can cause voltage rise issues."
  },
  {
    id: 4,
    question: "Individual motor correction involves:",
    options: [
      "One large capacitor bank at the main switchboard",
      "Capacitors fitted directly at each motor",
      "Capacitors at each distribution board",
      "External automatic PFC equipment"
    ],
    correctAnswer: 1,
    explanation: "Individual correction places capacitors directly at each motor, switched with the motor contactor. This provides the most effective correction as reactive current is reduced at source, minimising cable losses throughout the installation."
  },
  {
    id: 5,
    question: "Why might fixed capacitor banks cause problems with variable loads?",
    options: [
      "They are too expensive",
      "They can cause leading power factor during light load periods",
      "They generate harmonics",
      "They increase voltage drop"
    ],
    correctAnswer: 1,
    explanation: "Fixed capacitors provide constant reactive power. When loads reduce (light load periods), the capacitive kVAr may exceed the inductive kVAr, causing leading power factor. This can cause voltage rise and penalties from the DNO."
  },
  {
    id: 6,
    question: "What is the tuning frequency typically used for 7% detuned reactors?",
    options: ["50 Hz", "135 Hz", "189 Hz", "250 Hz"],
    correctAnswer: 2,
    explanation: "7% detuned reactors tune the capacitor circuit to 189Hz (50Hz x root(1/0.07) is approximately 189Hz). This is below the 5th harmonic (250Hz), preventing resonance with common harmonic frequencies in electrical systems."
  },
  {
    id: 7,
    question: "Active Power Factor Correction (APFC) in building services typically refers to:",
    options: [
      "Using active filters to inject compensating current",
      "Manual switching of capacitor banks",
      "Using synchronous condensers",
      "Fixed capacitor installations"
    ],
    correctAnswer: 0,
    explanation: "APFC in modern building services uses power electronics (active filters) to inject current that cancels reactive and harmonic currents. Unlike passive capacitors, active filters can correct power factor and eliminate harmonics simultaneously."
  },
  {
    id: 8,
    question: "For a 45kW motor with 0.8 power factor, what approximate capacitor size would correct to 0.95 pf?",
    options: ["10 kVAr", "15 kVAr", "20 kVAr", "25 kVAr"],
    correctAnswer: 2,
    explanation: "Qc = P(tan phi1 - tan phi2) = 45 x (tan 36.9 degrees - tan 18.2 degrees) = 45 x (0.75 - 0.329) = 45 x 0.421 = 19 kVAr. Nearest standard size is 20 kVAr."
  },
  {
    id: 9,
    question: "What is the main disadvantage of central power factor correction?",
    options: [
      "Higher cost than individual correction",
      "Reactive current still flows through all cables between loads and central capacitors",
      "Cannot achieve high power factor",
      "Requires larger capacitors"
    ],
    correctAnswer: 1,
    explanation: "Central correction only reduces reactive current from the incoming supply. Reactive current still flows through all cables from the central capacitor bank to the individual loads, maintaining I squared R losses in the internal distribution system."
  },
  {
    id: 10,
    question: "Fluorescent lighting with magnetic ballasts typically requires PFC capacitors rated at:",
    options: [
      "1-2 microF per lamp",
      "5-8 microF per 58W lamp",
      "15-20 microF per lamp",
      "No capacitor needed"
    ],
    correctAnswer: 1,
    explanation: "Traditional fluorescent fittings with magnetic ballasts have poor power factor (0.5-0.6). A 5-8 microF capacitor per 58W lamp typically improves this to 0.85-0.95. Modern electronic ballasts have built-in PFC and do not require additional capacitors."
  },
  {
    id: 11,
    question: "What percentage of total harmonic distortion (THD) typically indicates the need for detuned capacitors?",
    options: ["THD below 5%", "THD above 10-15%", "THD above 50%", "Any THD requires detuning"],
    correctAnswer: 1,
    explanation: "When THD exceeds 10-15%, standard capacitors risk resonance with harmonic frequencies. Detuned reactor-capacitor combinations should be specified to prevent harmonic amplification and capacitor damage."
  },
  {
    id: 12,
    question: "A building has 150kW lighting (pf 0.95), 100kW heating (pf 1.0), and 200kW motors (pf 0.8). What is the overall power factor?",
    options: ["0.85", "0.88", "0.91", "0.93"],
    correctAnswer: 2,
    explanation: "Total P = 450kW. Lighting Q = 150 x tan(18.2 degrees) = 49.4 kVAr. Heating Q = 0. Motors Q = 200 x tan(36.9 degrees) = 150 kVAr. Total Q = 199.4 kVAr. S = root(450 squared + 199.4 squared) = 492.2 kVA. Overall pf = 450/492.2 = 0.914 which rounds to 0.91"
  }
];

const faqs = [
  {
    question: "What happens if power factor is over-corrected to leading?",
    answer: "Leading power factor (where capacitive kVAr exceeds inductive kVAr) causes voltage rise at the point of connection, potentially damaging equipment. DNOs may impose penalties for leading power factor as it can affect network stability. Automatic PFC systems prevent this by reducing capacitance as load decreases."
  },
  {
    question: "How do electronic LED drivers affect power factor correction?",
    answer: "Modern LED drivers typically include active PFC circuits achieving 0.95+ power factor. However, they also generate harmonic currents. While individual correction is not usually needed, buildings with large LED installations may require harmonic filters. Always check the driver specifications for power factor and THD values."
  },
  {
    question: "Why can't standard capacitors be used in systems with VFDs?",
    answer: "Variable Frequency Drives (VFDs) generate significant harmonic currents, particularly 5th and 7th harmonics. Standard capacitors can resonate with system inductance at harmonic frequencies, amplifying harmonics and causing capacitor failure or fire. Detuned reactors (typically 7% or 14%) must be used to shift resonance below the 5th harmonic."
  },
  {
    question: "What is the difference between kVAr and capacitance (microF)?",
    answer: "kVAr (reactive power) is the useful rating for PFC as it directly relates to power factor improvement. Capacitance (microF) depends on voltage: Qc = 2 x pi x f x C x V squared. A 25 kVAr capacitor at 400V has different microF than the same kVAr rating at 230V. Always specify PFC capacitors by kVAr rating at the system voltage."
  },
  {
    question: "When should synchronous motors be considered for power factor correction?",
    answer: "Large over-excited synchronous motors (typically above 500kW) can provide leading reactive power, acting as rotating capacitors. They are considered where: constant large loads exist, motor replacement is planned anyway, or harmonic-rich environments make capacitors problematic. The motor must be slightly oversized and run in over-excited mode."
  },
  {
    question: "How do I size an automatic PFC system?",
    answer: "Measure reactive power demand over a representative period (minimum one week) using a power quality analyser. Size the total kVAr for maximum demand plus 10-20% margin. Choose step sizes based on load variation - typically 6-12 steps. Smaller steps provide finer control but increase cost and complexity."
  }
];

const HNCModule3Section2_5 = () => {
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
            <span>Module 3.2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Power Factor Correction Methods
          </h1>
          <p className="text-white/80">
            Techniques for improving power factor in commercial and industrial installations using capacitors, automatic systems, and active correction
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Capacitor sizing:</strong> Qc = P(tan phi1 - tan phi2) in kVAr</li>
              <li className="pl-1"><strong>Connection:</strong> Delta gives 3x kVAr vs star</li>
              <li className="pl-1"><strong>Automatic PFC:</strong> Essential for variable loads</li>
              <li className="pl-1"><strong>Harmonics:</strong> Use detuned reactors with VFDs</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Target pf:</strong> 0.95 lagging minimum for UK DNOs</li>
              <li className="pl-1"><strong>Motors:</strong> Individual or group correction</li>
              <li className="pl-1"><strong>Lighting:</strong> Electronic ballasts have built-in PFC</li>
              <li className="pl-1"><strong>HVAC:</strong> Detuned PFC for VFD chillers/AHUs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate capacitor bank sizing using Qc = P(tan phi1 - tan phi2)",
              "Compare fixed versus automatic switching capacitor banks",
              "Understand star and delta capacitor connections",
              "Apply individual, group, and central correction strategies",
              "Specify active power factor correction systems",
              "Design PFC systems for harmonic-rich environments"
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

        {/* Section 1: Capacitor Bank Sizing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Capacitor Bank Sizing and Calculation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power factor correction capacitors provide leading reactive power (kVAr) to offset the lagging
              reactive power drawn by inductive loads. The key to effective PFC is calculating the correct
              capacitor size to achieve the target power factor without over-correction.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Fundamental PFC Formula</p>
              <p className="font-mono text-center text-lg mb-2">Q<sub>c</sub> = P (tan phi<sub>1</sub> - tan phi<sub>2</sub>)</p>
              <div className="text-xs text-white/70 text-center space-y-1">
                <p>Q<sub>c</sub> = required capacitor reactive power (kVAr)</p>
                <p>P = real power (kW)</p>
                <p>phi<sub>1</sub> = original phase angle (cos inverse of original pf)</p>
                <p>phi<sub>2</sub> = target phase angle (cos inverse of target pf)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Factor Conversion Table</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Power Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Phase Angle (phi)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">tan phi</th>
                      <th className="border border-white/10 px-3 py-2 text-left">kVAr/kW</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.70</td>
                      <td className="border border-white/10 px-3 py-2">45.6 degrees</td>
                      <td className="border border-white/10 px-3 py-2">1.020</td>
                      <td className="border border-white/10 px-3 py-2">1.020</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.75</td>
                      <td className="border border-white/10 px-3 py-2">41.4 degrees</td>
                      <td className="border border-white/10 px-3 py-2">0.882</td>
                      <td className="border border-white/10 px-3 py-2">0.882</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.80</td>
                      <td className="border border-white/10 px-3 py-2">36.9 degrees</td>
                      <td className="border border-white/10 px-3 py-2">0.750</td>
                      <td className="border border-white/10 px-3 py-2">0.750</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.85</td>
                      <td className="border border-white/10 px-3 py-2">31.8 degrees</td>
                      <td className="border border-white/10 px-3 py-2">0.620</td>
                      <td className="border border-white/10 px-3 py-2">0.620</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.90</td>
                      <td className="border border-white/10 px-3 py-2">25.8 degrees</td>
                      <td className="border border-white/10 px-3 py-2">0.484</td>
                      <td className="border border-white/10 px-3 py-2">0.484</td>
                    </tr>
                    <tr className="bg-elec-yellow/10">
                      <td className="border border-white/10 px-3 py-2 font-medium">0.95 (target)</td>
                      <td className="border border-white/10 px-3 py-2">18.2 degrees</td>
                      <td className="border border-white/10 px-3 py-2">0.329</td>
                      <td className="border border-white/10 px-3 py-2">0.329</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1.00</td>
                      <td className="border border-white/10 px-3 py-2">0 degrees</td>
                      <td className="border border-white/10 px-3 py-2">0.000</td>
                      <td className="border border-white/10 px-3 py-2">0.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key sizing considerations:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Standard capacitor sizes: 5, 10, 12.5, 15, 20, 25, 30, 50, 75, 100 kVAr</li>
                <li className="pl-1">Select the nearest standard size above calculated value</li>
                <li className="pl-1">Avoid over-sizing - leading pf causes voltage rise issues</li>
                <li className="pl-1">Consider demand variation when sizing - measure over representative period</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>UK DNO requirement:</strong> Most Distribution Network Operators require power factor of 0.95 lagging or better. Below 0.95, reactive power charges apply.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Fixed vs Automatic Switching */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fixed vs Automatic Switching Capacitor Banks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The choice between fixed and automatic PFC systems depends on load characteristics. Fixed
              capacitors suit constant loads, while variable loads demand automatic switching to prevent
              over-correction during light load periods.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fixed Capacitor Banks</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Single kVAr value, always connected</li>
                  <li className="pl-1">Lowest cost installation</li>
                  <li className="pl-1">No control equipment needed</li>
                  <li className="pl-1">Suitable for constant loads (base load)</li>
                  <li className="pl-1">Risk of leading pf at light loads</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 italic">
                  Typical use: Individual motor correction, continuous process loads
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Automatic Switching Banks</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Multiple stages switched by controller</li>
                  <li className="pl-1">PF relay monitors and controls steps</li>
                  <li className="pl-1">Maintains target pf across load range</li>
                  <li className="pl-1">Prevents leading power factor</li>
                  <li className="pl-1">Higher capital cost, lower running cost</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 italic">
                  Typical use: Main switchboard, variable industrial loads
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Automatic PFC Controller Features</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Setting</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Target pf (cos phi)</td>
                      <td className="border border-white/10 px-3 py-2">Desired power factor setpoint</td>
                      <td className="border border-white/10 px-3 py-2">0.95 - 0.98 lag</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">C/k ratio</td>
                      <td className="border border-white/10 px-3 py-2">Step size relative to CT ratio</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturer specific</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Switching delay</td>
                      <td className="border border-white/10 px-3 py-2">Time between step changes</td>
                      <td className="border border-white/10 px-3 py-2">30-60 seconds</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Discharge time</td>
                      <td className="border border-white/10 px-3 py-2">Capacitor discharge before reconnection</td>
                      <td className="border border-white/10 px-3 py-2">60-90 seconds</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Number of steps</td>
                      <td className="border border-white/10 px-3 py-2">Stages of capacitor banks</td>
                      <td className="border border-white/10 px-3 py-2">6-12 typical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Step configurations:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Equal steps:</strong> All stages same kVAr (e.g., 6 x 25 kVAr = 150 kVAr)</li>
                <li className="pl-1"><strong>Binary steps:</strong> 1:2:4:8 ratio for fine control (e.g., 12.5, 25, 50, 100 = 187.5 kVAr in 15 combinations)</li>
                <li className="pl-1"><strong>Mixed steps:</strong> Smaller first stage for fine tuning (e.g., 10, 25, 25, 50, 50 kVAr)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Capacitor switching:</strong> Contactors must be rated for capacitor duty (high inrush current). Use special capacitor-switching contactors or current-limiting reactors.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Connection Methods and Correction Strategies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Connection Methods and Correction Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Capacitors can be connected in star or delta configurations, each with distinct advantages.
              The location of correction - individual, group, or central - affects both efficiency and cost.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Star vs Delta Connection</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Star (Y) Connection</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Capacitors see phase voltage (230V)</li>
                    <li className="pl-1">Lower voltage stress on capacitors</li>
                    <li className="pl-1">Less kVAr per capacitor</li>
                    <li className="pl-1">Neutral required</li>
                    <li className="pl-1">Safer for maintenance</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Delta (triangle) Connection</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Capacitors see line voltage (400V)</li>
                    <li className="pl-1">3x kVAr per capacitor (V squared relationship)</li>
                    <li className="pl-1">More economical for same kVAr</li>
                    <li className="pl-1">No neutral needed</li>
                    <li className="pl-1">Higher fault current if capacitor fails</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-white/60 mt-3">
                Q = V squared / Xc. Since (400/230) squared is approximately 3, delta provides approximately 3x the kVAr for the same capacitor.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Correction Strategies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Advantages</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Disadvantages</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Individual</td>
                      <td className="border border-white/10 px-3 py-2">At each load (motor terminals)</td>
                      <td className="border border-white/10 px-3 py-2">Maximum cable loss reduction, precise correction</td>
                      <td className="border border-white/10 px-3 py-2">Highest cost, maintenance at multiple locations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Group</td>
                      <td className="border border-white/10 px-3 py-2">Distribution board level</td>
                      <td className="border border-white/10 px-3 py-2">Good balance of cost and efficiency</td>
                      <td className="border border-white/10 px-3 py-2">Reactive current in final circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Central</td>
                      <td className="border border-white/10 px-3 py-2">Main switchboard / intake</td>
                      <td className="border border-white/10 px-3 py-2">Lowest capital cost, easy maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Reactive current flows throughout building</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Hybrid</td>
                      <td className="border border-white/10 px-3 py-2">Combination of above</td>
                      <td className="border border-white/10 px-3 py-2">Optimised for specific installation</td>
                      <td className="border border-white/10 px-3 py-2">More complex design</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Individual motor correction:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Capacitor switched with motor contactor (parallel connection)</li>
                <li className="pl-1">Size capacitor to correct no-load magnetising current only</li>
                <li className="pl-1">Typically 30-40% of motor kVA rating</li>
                <li className="pl-1"><strong>Never exceed motor no-load magnetising current</strong> - risk of self-excitation on DOL start</li>
                <li className="pl-1">For soft-start or VFD motors, use separate capacitor switching</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Combine central automatic PFC for bulk correction with individual capacitors on large constant-running motors for maximum efficiency.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Active PFC and Harmonic Considerations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Active PFC and Harmonic Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern building services increasingly use Variable Frequency Drives (VFDs), LED drivers, and
              other non-linear loads that generate harmonics. Standard capacitors can resonate with system
              inductance at harmonic frequencies, requiring detuned solutions or active filtering.
            </p>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">Harmonic Resonance Warning</p>
              <p className="text-sm text-white">
                Capacitors reduce system impedance at resonant frequency fr = 1/(2 x pi x root(LC)). If fr coincides with
                a harmonic frequency (250Hz, 350Hz, etc.), harmonics are amplified dramatically. This causes
                capacitor overheating, failure, and potentially fire. Always assess harmonic content before
                specifying standard capacitors.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Detuned Reactor-Capacitor Systems</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Detuning Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Resonant Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5.67% (p = 0.0567)</td>
                      <td className="border border-white/10 px-3 py-2">210 Hz (4.2 x 50Hz)</td>
                      <td className="border border-white/10 px-3 py-2">Light harmonic pollution</td>
                    </tr>
                    <tr className="bg-elec-yellow/10">
                      <td className="border border-white/10 px-3 py-2 font-medium">7% (p = 0.07)</td>
                      <td className="border border-white/10 px-3 py-2">189 Hz (3.78 x 50Hz)</td>
                      <td className="border border-white/10 px-3 py-2">Standard for VFD applications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">14% (p = 0.14)</td>
                      <td className="border border-white/10 px-3 py-2">134 Hz (2.68 x 50Hz)</td>
                      <td className="border border-white/10 px-3 py-2">Heavy harmonic pollution (DC drives)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">
                Resonant frequency: fr = fn / root(p) where fn = 50Hz and p = detuning factor
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Active Power Factor Correction (APFC)</p>
              <p className="text-sm text-white mb-3">
                Active filters use power electronics to inject compensating current, cancelling both reactive
                and harmonic currents. They offer advantages in challenging environments but at higher cost.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Advantages</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Corrects pf and harmonics simultaneously</li>
                    <li className="pl-1">Fast response to load changes</li>
                    <li className="pl-1">No resonance risk</li>
                    <li className="pl-1">Compact compared to passive filters</li>
                    <li className="pl-1">Programmable for different targets</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Considerations</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Higher capital cost than passive</li>
                    <li className="pl-1">Standing losses (power electronics)</li>
                    <li className="pl-1">More complex maintenance</li>
                    <li className="pl-1">Limited to rated current capacity</li>
                    <li className="pl-1">Requires specialist commissioning</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical pf</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Harmonic Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PFC Solution</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DOL induction motors</td>
                      <td className="border border-white/10 px-3 py-2">0.75-0.85</td>
                      <td className="border border-white/10 px-3 py-2">Low</td>
                      <td className="border border-white/10 px-3 py-2">Standard capacitors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VFD-controlled motors</td>
                      <td className="border border-white/10 px-3 py-2">0.95+ (VFD input)</td>
                      <td className="border border-white/10 px-3 py-2">High (5th, 7th)</td>
                      <td className="border border-white/10 px-3 py-2">7% detuned or active filter</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fluorescent (magnetic)</td>
                      <td className="border border-white/10 px-3 py-2">0.5-0.6</td>
                      <td className="border border-white/10 px-3 py-2">Moderate (3rd)</td>
                      <td className="border border-white/10 px-3 py-2">Individual capacitors (5-8 microF)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED drivers (with PFC)</td>
                      <td className="border border-white/10 px-3 py-2">0.90-0.98</td>
                      <td className="border border-white/10 px-3 py-2">Low-Moderate</td>
                      <td className="border border-white/10 px-3 py-2">Usually not required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UPS systems</td>
                      <td className="border border-white/10 px-3 py-2">0.80-0.95</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">Active filter or input filter</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chillers (VFD)</td>
                      <td className="border border-white/10 px-3 py-2">0.95+</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">7% detuned at main DB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Harmonic assessment:</strong> Conduct power quality survey before specifying PFC. If THD exceeds 10-15%, use detuned reactors. If THD exceeds 20% or critical systems involved, consider active filters.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Central PFC Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A commercial building has measured demand of 350kW at 0.78 power factor. Calculate the capacitor bank required to achieve 0.95 pf.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Find phase angles</p>
                <p>phi1 = cos inverse(0.78) = 38.7 degrees</p>
                <p>phi2 = cos inverse(0.95) = 18.2 degrees</p>
                <p className="mt-2">Step 2: Calculate tan values</p>
                <p>tan phi1 = tan(38.7 degrees) = 0.802</p>
                <p>tan phi2 = tan(18.2 degrees) = 0.329</p>
                <p className="mt-2">Step 3: Apply formula</p>
                <p>Qc = P(tan phi1 - tan phi2)</p>
                <p>Qc = 350 x (0.802 - 0.329)</p>
                <p>Qc = 350 x 0.473 = <strong>165.6 kVAr</strong></p>
                <p className="mt-2 text-white/60">Specify 175 kVAr automatic PFC bank (next standard size)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Individual Motor Correction</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 30kW motor operates at 0.82 power factor. Calculate the capacitor size for individual correction to 0.95 pf. Verify the capacitor does not exceed the motor's magnetising current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Calculate required kVAr</p>
                <p>tan phi1 = tan(cos inverse 0.82) = tan(34.9 degrees) = 0.698</p>
                <p>tan phi2 = tan(cos inverse 0.95) = tan(18.2 degrees) = 0.329</p>
                <p>Qc = 30 x (0.698 - 0.329) = 30 x 0.369 = <strong>11.1 kVAr</strong></p>
                <p className="mt-2">Step 2: Verify against magnetising current</p>
                <p>Motor kVA = 30 / 0.82 = 36.6 kVA</p>
                <p>Max capacitor = 30-40% of motor kVA</p>
                <p>Max = 0.35 x 36.6 = 12.8 kVAr</p>
                <p className="mt-2 text-green-400">11.1 kVAr is less than 12.8 kVAr - safe for individual correction</p>
                <p className="mt-2 text-white/60">Specify 12.5 kVAr capacitor (nearest standard)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Automatic PFC Stepped Bank Design</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Design an automatic PFC system for a site with demand varying between 100kW and 400kW. Existing pf is 0.75, target is 0.95.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Calculate kVAr range</p>
                <p>tan phi1 = 0.882, tan phi2 = 0.329</p>
                <p>At minimum (100kW): Qc = 100 x 0.553 = 55.3 kVAr</p>
                <p>At maximum (400kW): Qc = 400 x 0.553 = 221.2 kVAr</p>
                <p className="mt-2">Step 2: Design step configuration</p>
                <p>Total required: 225 kVAr (with margin)</p>
                <p>Minimum step: approximately 55 kVAr for base load</p>
                <p className="mt-2">Option A - Equal steps:</p>
                <p>9 x 25 kVAr = 225 kVAr</p>
                <p className="mt-2">Option B - Mixed steps (recommended):</p>
                <p>1 x 12.5 kVAr + 2 x 25 kVAr + 4 x 37.5 kVAr = 212.5 kVAr</p>
                <p className="mt-2 text-white/60">Option B provides finer control at low loads</p>
                <p className="text-white/60">Use 7% detuned if VFDs present</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Star vs Delta kVAr Comparison</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 50 microF capacitor is available. Calculate its kVAr rating when connected in star and delta on a 400V three-phase system.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Capacitor reactance: Xc = 1/(2 x pi x f x C)</p>
                <p>Xc = 1/(2 x pi x 50 x 50 x 10 to power -6) = 63.7 ohms</p>
                <p className="mt-2"><strong>Star connection:</strong></p>
                <p>Voltage across each capacitor = 400 / root3 = 230V</p>
                <p>Q per capacitor = V squared / Xc = 230 squared / 63.7 = 830 VAr</p>
                <p>Total Q (3 capacitors) = 3 x 830 = <strong>2.49 kVAr</strong></p>
                <p className="mt-2"><strong>Delta connection:</strong></p>
                <p>Voltage across each capacitor = 400V</p>
                <p>Q per capacitor = V squared / Xc = 400 squared / 63.7 = 2,512 VAr</p>
                <p>Total Q (3 capacitors) = 3 x 2,512 = <strong>7.54 kVAr</strong></p>
                <p className="mt-2 text-white/60">Delta provides 7.54 / 2.49 = 3.03x the kVAr</p>
                <p className="text-white/60">This confirms the (400/230) squared is approximately 3 relationship</p>
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
                <li className="pl-1"><strong>Qc = P(tan phi1 - tan phi2)</strong> - Required capacitor kVAr</li>
                <li className="pl-1"><strong>Q = V squared / Xc = 2 x pi x f x C x V squared</strong> - Capacitor reactive power</li>
                <li className="pl-1"><strong>fr = fn / root(p)</strong> - Detuned resonant frequency</li>
                <li className="pl-1"><strong>Delta kVAr is approximately 3 x Star kVAr</strong> - Connection comparison</li>
                <li className="pl-1"><strong>Max motor cap = 0.35 x motor kVA</strong> - Individual correction limit</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Specification Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Survey load profile before sizing - minimum one week data</li>
                <li className="pl-1">Measure THD% - if above 10%, specify detuned reactors</li>
                <li className="pl-1">Check for VFDs, UPS, large LED installations - harmonic sources</li>
                <li className="pl-1">Verify supply transformer short-circuit level for resonance calculation</li>
                <li className="pl-1">Allow 10-20% margin on total kVAr capacity</li>
                <li className="pl-1">Specify discharge resistors (50V in 1 minute per IEC)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Requirements</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Capacitor-rated contactors for automatic switching</li>
                <li className="pl-1">HRC fuses sized for inrush (typically 1.5x capacitor current)</li>
                <li className="pl-1">Ventilation - capacitors generate heat, especially detuned types</li>
                <li className="pl-1">CT location - current measurement upstream of capacitor connection</li>
                <li className="pl-1">Cable sizing for harmonic currents if detuned/filtered</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Oversizing individual motor capacitors</strong> - causes self-excitation and overvoltage</li>
                <li className="pl-1"><strong>Standard capacitors with VFDs</strong> - harmonic resonance risk</li>
                <li className="pl-1"><strong>Fixed capacitors on variable loads</strong> - leading pf at light load</li>
                <li className="pl-1"><strong>Ignoring discharge time</strong> - reconnecting before 50V causes voltage transients</li>
                <li className="pl-1"><strong>Wrong CT connection</strong> - controller measures wrong current direction</li>
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
                <p className="font-medium text-white mb-1">PFC Formulas</p>
                <ul className="space-y-0.5">
                  <li>Qc = P(tan phi1 - tan phi2) kVAr</li>
                  <li>Q = V squared / Xc = 2 x pi x f x C x V squared</li>
                  <li>Delta is approximately 3x Star kVAr</li>
                  <li>Motor cap max = 35% of kVA</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Values</p>
                <ul className="space-y-0.5">
                  <li>Target pf: 0.95 lagging</li>
                  <li>tan(0.95 pf) = 0.329</li>
                  <li>7% detuning: 189Hz resonance</li>
                  <li>THD trigger: above 10-15%</li>
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
            <Link to="../h-n-c-module3-section2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 2.4
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section2-6">
              Next: Section 2.6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section2_5;
