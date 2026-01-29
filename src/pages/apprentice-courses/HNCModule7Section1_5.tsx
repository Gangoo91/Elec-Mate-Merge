import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Power Quality - HNC Module 7 Section 1.5";
const DESCRIPTION = "Master power quality concepts for electrical installations: harmonics, THD limits, voltage dips and swells, flicker, power factor correction, G5/5 compliance, and mitigation measures.";

const quickCheckQuestions = [
  {
    id: "thd-definition",
    question: "What does THD stand for in power quality?",
    options: ["Total Harmonic Detection", "Total Harmonic Distortion", "Thermal Harmonic Deviation", "Technical Harmonic Distribution"],
    correctIndex: 1,
    explanation: "THD stands for Total Harmonic Distortion - a measure of the harmonic content present in a waveform expressed as a percentage of the fundamental frequency component."
  },
  {
    id: "voltage-dip",
    question: "A voltage dip is defined as a temporary reduction in RMS voltage to:",
    options: ["Between 90% and 100% of nominal", "Between 1% and 90% of nominal", "Below 1% of nominal", "Above 110% of nominal"],
    correctIndex: 1,
    explanation: "According to EN 50160, a voltage dip is a temporary reduction in RMS voltage to between 1% and 90% of the nominal voltage, lasting from 10ms to 1 minute."
  },
  {
    id: "power-factor",
    question: "A lagging power factor is caused by:",
    options: ["Resistive loads", "Capacitive loads", "Inductive loads", "Linear loads"],
    correctIndex: 2,
    explanation: "Inductive loads such as motors, transformers, and fluorescent lighting ballasts cause a lagging power factor where current lags behind voltage."
  },
  {
    id: "harmonic-source",
    question: "Which equipment is a major source of harmonic distortion?",
    options: ["Incandescent lamps", "Resistance heaters", "Variable speed drives", "Synchronous motors"],
    correctIndex: 2,
    explanation: "Variable speed drives (VSDs), along with other non-linear loads like switched-mode power supplies and LED drivers, are major sources of harmonic distortion due to their rectifier front-ends."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to G5/5, what is the typical planning level for voltage THD at 400V?",
    options: [
      "3%",
      "5%",
      "8%",
      "10%"
    ],
    correctAnswer: 2,
    explanation: "The G5/5 planning level for voltage THD at 400V low voltage systems is 8%. Individual harmonic limits also apply, with lower limits for lower order harmonics."
  },
  {
    id: 2,
    question: "Which harmonic order is typically the largest in three-phase rectifier systems?",
    options: ["3rd harmonic", "5th harmonic", "7th harmonic", "11th harmonic"],
    correctAnswer: 1,
    explanation: "The 5th harmonic (250Hz) is typically the largest in six-pulse three-phase rectifier systems. The harmonic spectrum follows the pattern 6k±1 where k is an integer, giving 5th, 7th, 11th, 13th, etc."
  },
  {
    id: 3,
    question: "What is the effect of triplen harmonics (3rd, 9th, 15th) in a three-phase system?",
    options: [
      "They cancel out in the neutral",
      "They add arithmetically in the neutral",
      "They only affect phase conductors",
      "They reduce power factor"
    ],
    correctAnswer: 1,
    explanation: "Triplen harmonics (multiples of 3) are zero-sequence harmonics that add arithmetically in the neutral conductor, potentially causing neutral current to exceed phase current."
  },
  {
    id: 4,
    question: "A power factor of 0.8 lagging means:",
    options: [
      "80% of apparent power is reactive power",
      "80% of apparent power is real power",
      "Current leads voltage by 36.87°",
      "Voltage leads current by 53.13°"
    ],
    correctAnswer: 1,
    explanation: "Power factor is the ratio of real power (kW) to apparent power (kVA). A PF of 0.8 means 80% of the apparent power is converted to real power, with current lagging voltage by cos⁻¹(0.8) = 36.87°."
  },
  {
    id: 5,
    question: "Which mitigation measure is most effective for reducing 5th and 7th harmonics from VSDs?",
    options: [
      "Power factor correction capacitors",
      "Passive LC filters tuned to harmonic frequencies",
      "Increasing cable sizes",
      "Adding more transformers"
    ],
    correctAnswer: 1,
    explanation: "Passive LC filters tuned to specific harmonic frequencies provide a low-impedance path to divert harmonic currents away from the supply. Active filters can also be used for broader harmonic mitigation."
  },
  {
    id: 6,
    question: "Flicker is measured in units of:",
    options: [
      "Hertz (Hz)",
      "Percentage (%)",
      "Pst (short-term) and Plt (long-term)",
      "Volt-amperes reactive (VAr)"
    ],
    correctAnswer: 2,
    explanation: "Flicker severity is measured using Pst (short-term over 10 minutes) and Plt (long-term over 2 hours). A Pst value of 1.0 represents the threshold of irritability for most people."
  },
  {
    id: 7,
    question: "What is the typical voltage tolerance for LV supplies according to EN 50160?",
    options: [
      "±5% of nominal",
      "±10% of nominal",
      "±6% of nominal",
      "±15% of nominal"
    ],
    correctAnswer: 1,
    explanation: "EN 50160 specifies that under normal operating conditions, 95% of the 10-minute mean RMS voltage values should be within ±10% of nominal voltage (i.e., 207V to 253V for 230V systems)."
  },
  {
    id: 8,
    question: "What type of power factor correction is most suitable for installations with significant harmonic content?",
    options: [
      "Standard capacitor banks",
      "Detuned or harmonic-filtered capacitor banks",
      "Synchronous condensers only",
      "Oversized capacitors"
    ],
    correctAnswer: 1,
    explanation: "Detuned capacitor banks include series reactors (typically 7% or 14%) that shift the resonant frequency away from harmonic frequencies, preventing dangerous resonance and capacitor damage."
  },
  {
    id: 9,
    question: "A voltage swell is defined as a temporary increase in RMS voltage to:",
    options: [
      "Between 100% and 105% of nominal",
      "Between 105% and 110% of nominal",
      "Between 110% and 180% of nominal",
      "Above 180% of nominal"
    ],
    correctAnswer: 2,
    explanation: "A voltage swell is a temporary increase in RMS voltage to between 110% and 180% of nominal, typically lasting from 10ms to 1 minute. Swells often occur when large loads are switched off."
  },
  {
    id: 10,
    question: "Which document provides guidance on harmonic limits for connections to UK distribution networks?",
    options: [
      "BS 7671",
      "EN 50160",
      "Engineering Recommendation G5/5",
      "IEC 61000"
    ],
    correctAnswer: 2,
    explanation: "Engineering Recommendation G5/5 'Limits for Harmonics in the UK Electricity Supply System' provides planning levels and assessment procedures for harmonic emissions from customer installations."
  },
  {
    id: 11,
    question: "What is the displacement power factor?",
    options: [
      "The ratio of real power to apparent power at the fundamental frequency",
      "The total power factor including all harmonics",
      "The power factor of reactive components only",
      "The difference between leading and lagging power factors"
    ],
    correctAnswer: 0,
    explanation: "Displacement power factor (DPF) is the power factor at the fundamental frequency only (cosφ₁). Total power factor (TPF) includes the effect of harmonics and is always less than or equal to DPF."
  },
  {
    id: 12,
    question: "Active harmonic filters operate by:",
    options: [
      "Providing a low-impedance path for harmonic currents",
      "Injecting currents equal and opposite to the harmonic currents",
      "Blocking harmonic frequencies with high impedance",
      "Converting harmonics to heat energy"
    ],
    correctAnswer: 1,
    explanation: "Active harmonic filters measure the harmonic content in real-time and inject compensating currents that are equal in magnitude but opposite in phase, effectively cancelling the harmonic distortion."
  }
];

const faqs = [
  {
    question: "What is the difference between voltage THD and current THD?",
    answer: "Voltage THD measures harmonic distortion in the voltage waveform at a point in the system, typically limited to 8% in LV systems. Current THD measures harmonic distortion in the current drawn by loads and can be much higher (often 30-80% for non-linear loads). Current harmonics flowing through system impedance create voltage harmonics, so limiting current THD helps maintain voltage quality."
  },
  {
    question: "Why do we need detuned capacitor banks rather than standard PFC capacitors?",
    answer: "Standard capacitors can create resonance with system inductance at harmonic frequencies, amplifying harmonics and potentially damaging the capacitors. Detuned banks include series reactors (typically 7% or 14%) that lower the resonant frequency below the lowest significant harmonic (usually the 5th at 250Hz), preventing amplification while still providing reactive power compensation."
  },
  {
    question: "How do I know if power quality issues are affecting my installation?",
    answer: "Signs include unexplained equipment failures, overheating of neutral conductors or transformers, nuisance tripping of protection devices, flickering lights, interference with IT equipment, and higher-than-expected energy bills. Power quality analysers can measure THD, power factor, voltage variations, and flicker to diagnose specific issues."
  },
  {
    question: "What causes voltage dips and how can they be mitigated?",
    answer: "Voltage dips are typically caused by faults on the supply network, large motor starting currents, or switching of large loads. Mitigation measures include soft starters or VSDs for motors, uninterruptible power supplies (UPS) for sensitive equipment, dynamic voltage restorers (DVRs), and ensuring adequate supply capacity for starting loads."
  },
  {
    question: "When is an active filter preferred over a passive filter?",
    answer: "Active filters are preferred when: the harmonic spectrum varies (mixed non-linear loads), multiple harmonic orders need addressing simultaneously, space is limited, or the load pattern changes frequently. Passive filters are more economical for fixed loads with predictable harmonic content, particularly when only one or two dominant harmonics need filtering."
  }
];

const HNCModule7Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section1">
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
            <span>Module 7.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Power Quality
          </h1>
          <p className="text-white/80">
            Harmonics, voltage variations, flicker, power factor, and mitigation measures for electrical installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>THD limit:</strong> 8% voltage THD at LV (G5/5)</li>
              <li className="pl-1"><strong>Voltage tolerance:</strong> ±10% of nominal (EN 50160)</li>
              <li className="pl-1"><strong>Power factor:</strong> Target &gt;0.95 to avoid penalties</li>
              <li className="pl-1"><strong>Flicker:</strong> Pst ≤1.0 threshold of irritability</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Standards</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>G5/5:</strong> UK harmonic limits and assessment</li>
              <li className="pl-1"><strong>EN 50160:</strong> Voltage characteristics</li>
              <li className="pl-1"><strong>IEC 61000:</strong> EMC and immunity levels</li>
              <li className="pl-1"><strong>BS EN 61642:</strong> Capacitor bank protection</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define power quality parameters and their effects on equipment",
              "Calculate THD and apply G5/5 harmonic limits",
              "Analyse voltage dips, swells, and interruptions",
              "Understand flicker measurement and mitigation",
              "Design power factor correction systems for harmonic-rich environments",
              "Select appropriate mitigation measures for power quality issues"
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

        {/* Section 1: Power Quality Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Power Quality Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power quality refers to the characteristics of the electrical supply that determine whether
              equipment operates correctly without interference or damage. Poor power quality can cause
              equipment malfunction, reduced efficiency, overheating, and premature failure.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key power quality parameters:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Voltage magnitude:</strong> Steady-state level compared to nominal (230V/400V)</li>
                <li className="pl-1"><strong>Frequency:</strong> Deviation from nominal 50Hz (typically ±1%)</li>
                <li className="pl-1"><strong>Waveform distortion:</strong> Deviation from ideal sinusoidal (harmonics)</li>
                <li className="pl-1"><strong>Voltage variations:</strong> Dips, swells, interruptions, flicker</li>
                <li className="pl-1"><strong>Voltage unbalance:</strong> Asymmetry between phases (typically &lt;2%)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EN 50160 Voltage Characteristics</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Normal Limit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Measurement Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Supply voltage</td>
                      <td className="border border-white/10 px-3 py-2">±10% of Uₙ (207V-253V)</td>
                      <td className="border border-white/10 px-3 py-2">95% of 10-min values/week</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Frequency</td>
                      <td className="border border-white/10 px-3 py-2">±1% (49.5Hz-50.5Hz)</td>
                      <td className="border border-white/10 px-3 py-2">99.5% of year</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage THD</td>
                      <td className="border border-white/10 px-3 py-2">≤8%</td>
                      <td className="border border-white/10 px-3 py-2">95% of 10-min values/week</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage unbalance</td>
                      <td className="border border-white/10 px-3 py-2">≤2%</td>
                      <td className="border border-white/10 px-3 py-2">95% of 10-min values/week</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flicker Plt</td>
                      <td className="border border-white/10 px-3 py-2">≤1.0</td>
                      <td className="border border-white/10 px-3 py-2">95% of week</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Industry impact:</strong> Power quality issues cost UK industry an estimated £150-200 million annually through equipment damage, downtime, and reduced productivity.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Harmonic Distortion */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Harmonic Distortion
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Harmonics are sinusoidal voltages or currents at frequencies that are integer multiples of
              the fundamental supply frequency (50Hz). They are generated by non-linear loads that draw
              current in pulses rather than smoothly throughout the cycle.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Harmonic Sources</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Variable speed drives</li>
                  <li className="pl-1">Switch-mode power supplies</li>
                  <li className="pl-1">LED drivers</li>
                  <li className="pl-1">UPS systems</li>
                  <li className="pl-1">Rectifiers and DC drives</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effects of Harmonics</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Overheating of transformers</li>
                  <li className="pl-1">Neutral conductor overload</li>
                  <li className="pl-1">Capacitor bank failure</li>
                  <li className="pl-1">Motor vibration/noise</li>
                  <li className="pl-1">Interference with equipment</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Harmonic Orders</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">3rd = 150Hz (triplen)</li>
                  <li className="pl-1">5th = 250Hz (dominant)</li>
                  <li className="pl-1">7th = 350Hz</li>
                  <li className="pl-1">11th = 550Hz</li>
                  <li className="pl-1">13th = 650Hz</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Total Harmonic Distortion (THD) Calculation</p>
              <div className="font-mono text-sm space-y-2">
                <p className="text-white">THD = √(V₂² + V₃² + V₄² + ... + Vₙ²) / V₁ × 100%</p>
                <p className="text-white/60 mt-2">Where V₁ = fundamental, V₂, V₃... = harmonic magnitudes</p>
                <p className="mt-3 text-white"><strong>Example:</strong> If V₁=230V, V₅=12V, V₇=8V, V₁₁=4V:</p>
                <p className="text-white">THD = √(12² + 8² + 4²) / 230 × 100%</p>
                <p className="text-white">THD = √(144 + 64 + 16) / 230 × 100%</p>
                <p className="text-green-400">THD = 6.5% (within 8% limit)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">G5/5 Individual Harmonic Limits at 400V</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Harmonic Order</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Planning Level (%)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Compatibility Level (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3rd</td>
                      <td className="border border-white/10 px-3 py-2">150Hz</td>
                      <td className="border border-white/10 px-3 py-2">4%</td>
                      <td className="border border-white/10 px-3 py-2">5%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5th</td>
                      <td className="border border-white/10 px-3 py-2">250Hz</td>
                      <td className="border border-white/10 px-3 py-2">5%</td>
                      <td className="border border-white/10 px-3 py-2">6%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7th</td>
                      <td className="border border-white/10 px-3 py-2">350Hz</td>
                      <td className="border border-white/10 px-3 py-2">4%</td>
                      <td className="border border-white/10 px-3 py-2">5%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">11th</td>
                      <td className="border border-white/10 px-3 py-2">550Hz</td>
                      <td className="border border-white/10 px-3 py-2">3%</td>
                      <td className="border border-white/10 px-3 py-2">3.5%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Total THD</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">8%</td>
                      <td className="border border-white/10 px-3 py-2">8%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Triplen harmonics:</strong> The 3rd, 9th, 15th harmonics are zero-sequence and add in the neutral conductor - neutral current can exceed phase current in single-phase non-linear loads.
            </p>
          </div>
        </section>

        {/* Section 3: Voltage Variations and Flicker */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Voltage Variations and Flicker
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Voltage variations include dips, swells, and interruptions that can cause equipment
              malfunction or damage. Flicker is rapid voltage fluctuation that causes visible light
              flickering and can affect sensitive equipment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Variation Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Definition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Cause</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage dip (sag)</td>
                      <td className="border border-white/10 px-3 py-2">1% to 90% of Uₙ</td>
                      <td className="border border-white/10 px-3 py-2">Faults, large motor starting</td>
                      <td className="border border-white/10 px-3 py-2">10ms to 1 minute</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage swell</td>
                      <td className="border border-white/10 px-3 py-2">110% to 180% of Uₙ</td>
                      <td className="border border-white/10 px-3 py-2">Large load switching off, SLG faults</td>
                      <td className="border border-white/10 px-3 py-2">10ms to 1 minute</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Interruption</td>
                      <td className="border border-white/10 px-3 py-2">&lt;1% of Uₙ</td>
                      <td className="border border-white/10 px-3 py-2">Faults, protection operation</td>
                      <td className="border border-white/10 px-3 py-2">10ms to 3 minutes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Undervoltage</td>
                      <td className="border border-white/10 px-3 py-2">&lt;90% of Uₙ sustained</td>
                      <td className="border border-white/10 px-3 py-2">Overloaded circuits, long cables</td>
                      <td className="border border-white/10 px-3 py-2">&gt;1 minute</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Overvoltage</td>
                      <td className="border border-white/10 px-3 py-2">&gt;110% of Uₙ sustained</td>
                      <td className="border border-white/10 px-3 py-2">Incorrect tap settings, light load</td>
                      <td className="border border-white/10 px-3 py-2">&gt;1 minute</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flicker Measurement</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pst (short-term):</strong> Measured over 10 minutes, Pst ≤1.0 required</li>
                <li className="pl-1"><strong>Plt (long-term):</strong> Calculated from 12 consecutive Pst values over 2 hours</li>
                <li className="pl-1"><strong>Flicker sources:</strong> Arc furnaces, welders, large motor starting, wind turbines</li>
                <li className="pl-1"><strong>Human perception:</strong> Most sensitive to voltage changes at 8.8Hz frequency</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Dip Classification (ITIC/CBEMA)</p>
              <div className="text-sm space-y-2">
                <p><strong>Region A:</strong> Equipment should operate without interruption</p>
                <p><strong>Region B:</strong> Equipment may malfunction but should not be damaged</p>
                <p><strong>Region C:</strong> Equipment may be damaged</p>
                <p className="mt-2 text-white/70">Example: A 70% dip lasting 100ms falls in Region B - computers may reset but should not be damaged.</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Sensitive equipment:</strong> PLCs, variable speed drives, and IT equipment are particularly sensitive to voltage dips and may require UPS protection or voltage conditioning.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Power Factor and Mitigation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Power Factor and Mitigation Measures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power factor is the ratio of real power (kW) to apparent power (kVA). A low power factor
              means more current is required to deliver the same real power, increasing losses, requiring
              larger equipment, and potentially attracting utility penalties.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Power Factor Relationships</p>
              <div className="font-mono text-sm space-y-2">
                <p className="text-white">Power Factor (PF) = P / S = kW / kVA = cosφ</p>
                <p className="text-white">Reactive Power: Q = S × sinφ (kVAr)</p>
                <p className="text-white">Apparent Power: S = √(P² + Q²)</p>
                <p className="mt-3 text-white"><strong>Example:</strong> 100kW load at PF 0.8 lagging:</p>
                <p className="text-white">S = 100 / 0.8 = 125 kVA</p>
                <p className="text-white">Q = 125 × 0.6 = 75 kVAr lagging</p>
                <p className="text-green-400">To correct to PF 0.95: Need 100/0.95 = 105.3 kVA</p>
                <p className="text-green-400">New Q = 105.3 × 0.312 = 32.8 kVAr</p>
                <p className="text-green-400">Capacitor required = 75 - 32.8 = 42.2 kVAr</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mitigation Measures Summary</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Issue</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Mitigation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Low power factor</td>
                      <td className="border border-white/10 px-3 py-2">Capacitor banks, synchronous motors</td>
                      <td className="border border-white/10 px-3 py-2">Central or distributed PFC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Harmonics</td>
                      <td className="border border-white/10 px-3 py-2">Passive filters, active filters, 12/18-pulse drives</td>
                      <td className="border border-white/10 px-3 py-2">At source or central</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage dips</td>
                      <td className="border border-white/10 px-3 py-2">UPS, DVR, soft starters</td>
                      <td className="border border-white/10 px-3 py-2">Sensitive equipment protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flicker</td>
                      <td className="border border-white/10 px-3 py-2">SVCs, STATCOMs, dedicated feeders</td>
                      <td className="border border-white/10 px-3 py-2">Large fluctuating loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Neutral overload</td>
                      <td className="border border-white/10 px-3 py-2">Oversized neutral, zig-zag transformer</td>
                      <td className="border border-white/10 px-3 py-2">Single-phase non-linear loads</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Passive Harmonic Filters</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">LC circuits tuned to specific frequencies</li>
                  <li className="pl-1">Typically 4.7%, 7%, or 14% reactor</li>
                  <li className="pl-1">Lower cost, simpler design</li>
                  <li className="pl-1">Fixed compensation only</li>
                  <li className="pl-1">Risk of resonance if misapplied</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Active Harmonic Filters</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Inject compensating currents</li>
                  <li className="pl-1">Adapt to changing loads</li>
                  <li className="pl-1">Address multiple harmonics</li>
                  <li className="pl-1">Higher cost, more complex</li>
                  <li className="pl-1">No resonance risk</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Quality Monitoring Equipment</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Power quality analysers:</strong> Fluke 435-II, Hioki PQ3100, Dranetz</li>
                <li className="pl-1"><strong>Parameters measured:</strong> V, I, P, Q, S, PF, THD, harmonics, dips/swells, flicker</li>
                <li className="pl-1"><strong>Standards compliance:</strong> Class A to IEC 61000-4-30 for contractual measurements</li>
                <li className="pl-1"><strong>Monitoring period:</strong> Minimum 7 days recommended for baseline assessment</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Detuned capacitors:</strong> In harmonic-rich environments, always use detuned capacitor banks (7% or 14% reactor) to prevent resonance amplification of harmonics at the capacitor bank.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: THD Compliance Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Assess whether a measured harmonic spectrum complies with G5/5 limits.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Measured values at 400V LV board:</p>
                <p className="mt-2">Fundamental (50Hz): V₁ = 400V</p>
                <p>3rd harmonic: V₃ = 14V (3.5%)</p>
                <p>5th harmonic: V₅ = 18V (4.5%)</p>
                <p>7th harmonic: V₇ = 10V (2.5%)</p>
                <p>11th harmonic: V₁₁ = 6V (1.5%)</p>
                <p className="mt-2">THD calculation:</p>
                <p>THD = √(14² + 18² + 10² + 6²) / 400 × 100%</p>
                <p>THD = √(196 + 324 + 100 + 36) / 400 × 100%</p>
                <p>THD = √656 / 400 × 100% = 6.4%</p>
                <p className="mt-2 text-green-400">Individual harmonics: All within limits</p>
                <p className="text-green-400">Total THD: 6.4% &lt; 8% limit - COMPLIANT</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Power Factor Correction Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate capacitor bank size to improve power factor from 0.75 to 0.95.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Installation data:</p>
                <p>Real power demand: P = 200 kW</p>
                <p>Current power factor: PF₁ = 0.75 lagging</p>
                <p>Target power factor: PF₂ = 0.95 lagging</p>
                <p className="mt-2">Step 1: Calculate angles</p>
                <p>φ₁ = cos⁻¹(0.75) = 41.4°, tanφ₁ = 0.882</p>
                <p>φ₂ = cos⁻¹(0.95) = 18.2°, tanφ₂ = 0.329</p>
                <p className="mt-2">Step 2: Calculate reactive power</p>
                <p>Q₁ = P × tanφ₁ = 200 × 0.882 = 176.4 kVAr</p>
                <p>Q₂ = P × tanφ₂ = 200 × 0.329 = 65.8 kVAr</p>
                <p className="mt-2">Step 3: Capacitor required</p>
                <p>Qc = Q₁ - Q₂ = 176.4 - 65.8 = 110.6 kVAr</p>
                <p className="mt-2 text-green-400">Select: 125 kVAr detuned capacitor bank</p>
                <p className="text-white/60">(Use detuned type due to likely VSD loads)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Neutral Current with Triplen Harmonics</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate neutral current for balanced single-phase non-linear loads.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Each phase draws 50A with 30% 3rd harmonic:</p>
                <p className="mt-2">Fundamental current: I₁ = 50A per phase</p>
                <p>3rd harmonic current: I₃ = 50 × 0.30 = 15A per phase</p>
                <p className="mt-2">Fundamental in neutral (balanced):</p>
                <p>IN₁ = 0A (cancel in balanced system)</p>
                <p className="mt-2">3rd harmonic in neutral:</p>
                <p>IN₃ = 3 × I₃ = 3 × 15A = 45A</p>
                <p className="text-white/60">(Triplen harmonics add arithmetically)</p>
                <p className="mt-2">Phase current: Iph = √(50² + 15²) = 52.2A</p>
                <p className="text-red-400 mt-2">Neutral current (45A) approaches phase current!</p>
                <p className="text-green-400">Solution: Oversize neutral to 150% of phase size</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Power Quality Assessment Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Install power quality analyser for minimum 7-day monitoring period</li>
                <li className="pl-1">Record voltage THD, current THD, and individual harmonics</li>
                <li className="pl-1">Measure power factor at various load conditions</li>
                <li className="pl-1">Log voltage dips/swells with magnitude and duration</li>
                <li className="pl-1">Assess flicker Pst and Plt values</li>
                <li className="pl-1">Compare results against G5/5 and EN 50160 limits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Voltage THD limit: <strong>8%</strong> at LV (G5/5)</li>
                <li className="pl-1">Voltage tolerance: <strong>±10%</strong> of nominal (EN 50160)</li>
                <li className="pl-1">Target power factor: <strong>&gt;0.95</strong> to avoid penalties</li>
                <li className="pl-1">Flicker limit: <strong>Pst ≤1.0</strong></li>
                <li className="pl-1">5th harmonic limit: <strong>5%</strong> planning level</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Standard capacitors with VSDs</strong> - Always use detuned banks to prevent resonance</li>
                <li className="pl-1"><strong>Undersized neutrals</strong> - Size for triplen harmonics in single-phase loads</li>
                <li className="pl-1"><strong>Ignoring displacement vs total PF</strong> - Harmonics reduce total power factor</li>
                <li className="pl-1"><strong>Over-correction of PF</strong> - Can cause leading power factor and voltage rise</li>
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
                <p className="font-medium text-white mb-1">Power Quality Limits</p>
                <ul className="space-y-0.5">
                  <li>Voltage THD: ≤8% at LV</li>
                  <li>Voltage tolerance: ±10% of Uₙ</li>
                  <li>Frequency: 50Hz ±1%</li>
                  <li>Flicker Plt: ≤1.0</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Mitigation Solutions</p>
                <ul className="space-y-0.5">
                  <li>PFC: Detuned capacitor banks</li>
                  <li>Harmonics: Passive/active filters</li>
                  <li>Dips: UPS, DVR protection</li>
                  <li>Neutral: 150% sizing for triplens</li>
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
            <Link to="../h-n-c-module7-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section1-6">
              Next: Section 1.6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section1_5;
