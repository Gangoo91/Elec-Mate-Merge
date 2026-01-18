import { ArrowLeft, ArrowRight, BookOpen, Zap, Calculator, AlertTriangle, Lightbulb, CheckCircle2, HelpCircle, Info, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const TITLE = "Power in AC Circuits - Level 3 Electrical Science";
const DESCRIPTION = "Master true power, reactive power, apparent power and power factor for City & Guilds electrical science Level 3.";

const quickCheckQuestions = [
  {
    id: "qc1",
    question: "A circuit draws 2 kW true power and 1.5 kVAr reactive power. What is the apparent power?",
    options: ["2.5 kVA", "3.5 kVA", "2.0 kVA", "0.5 kVA"],
    correctIndex: 0,
    explanation: "S = sqrt(P squared + Q squared) = sqrt(2 squared + 1.5 squared) = sqrt(4 + 2.25) = sqrt(6.25) = 2.5 kVA."
  },
  {
    id: "qc2",
    question: "What is the power factor of a purely resistive load?",
    options: ["0", "0.5", "0.85", "1.0"],
    correctIndex: 3,
    explanation: "In a purely resistive circuit, current and voltage are in phase (0 degree phase angle), so power factor = cos(0) = 1.0."
  },
  {
    id: "qc3",
    question: "A motor has apparent power of 10 kVA and power factor of 0.8. What is the true power?",
    options: ["12.5 kW", "8 kW", "6 kW", "10 kW"],
    correctIndex: 1,
    explanation: "P = S times pf = 10 times 0.8 = 8 kW. True power is apparent power multiplied by power factor."
  },
  {
    id: "qc4",
    question: "Reactive power in an inductive circuit is measured in:",
    options: ["Watts", "Volt-amperes", "VAr (lagging)", "VAr (leading)"],
    correctIndex: 2,
    explanation: "Inductive circuits cause current to lag voltage, producing lagging VAr. Capacitive circuits produce leading VAr."
  }
];

const quizQuestions = [
  {
    id: "q1",
    question: "The power consumed by a resistor in an AC circuit is called:",
    options: ["Reactive power", "Apparent power", "True power", "Complex power"],
    correctAnswer: "True power",
    explanation: "True power (P) measured in watts is the actual power consumed by resistive elements and converted to heat or work."
  },
  {
    id: "q2",
    question: "What causes reactive power in an AC circuit?",
    options: ["Resistance only", "Inductors and capacitors", "Poor connections", "Cable length"],
    correctAnswer: "Inductors and capacitors",
    explanation: "Reactive components (inductors and capacitors) store and return energy each cycle, creating reactive power without consuming energy."
  },
  {
    id: "q3",
    question: "A single-phase motor draws 15 A at 230 V with power factor 0.75. What is the true power?",
    options: ["3450 W", "2587.5 W", "4600 W", "1725 W"],
    correctAnswer: "2587.5 W",
    explanation: "P = V times I times pf = 230 times 15 times 0.75 = 2587.5 W."
  },
  {
    id: "q4",
    question: "The power triangle relates which three quantities?",
    options: ["Voltage, current, resistance", "True, reactive, apparent power", "RMS, peak, average values", "Frequency, period, amplitude"],
    correctAnswer: "True, reactive, apparent power",
    explanation: "The power triangle shows the relationship between P (true), Q (reactive), and S (apparent) power using Pythagoras."
  },
  {
    id: "q5",
    question: "Power factor correction typically uses:",
    options: ["Inductors", "Resistors", "Capacitors", "Transformers"],
    correctAnswer: "Capacitors",
    explanation: "Capacitors provide leading VAr to cancel the lagging VAr from inductive loads, improving power factor."
  },
  {
    id: "q6",
    question: "If a circuit has power factor 0.6 lagging, the phase angle between voltage and current is approximately:",
    options: ["36.87 degrees", "53.13 degrees", "60 degrees", "30 degrees"],
    correctAnswer: "53.13 degrees",
    explanation: "Phase angle = arccos(0.6) = 53.13 degrees. The current lags voltage by this angle in an inductive circuit."
  },
  {
    id: "q7",
    question: "A 3-phase motor draws 50 A per phase at 400 V line voltage with pf 0.85. What is the true power?",
    options: ["29.4 kW", "34.6 kW", "17 kW", "58.9 kW"],
    correctAnswer: "29.4 kW",
    explanation: "For 3-phase: P = sqrt(3) times V_L times I times pf = 1.732 times 400 times 50 times 0.85 = 29.4 kW."
  },
  {
    id: "q8",
    question: "What is the relationship between kW, kVAr and kVA?",
    options: ["kVA = kW + kVAr", "kVA = kW minus kVAr", "kVA squared = kW squared + kVAr squared", "kVA = kW times kVAr"],
    correctAnswer: "kVA squared = kW squared + kVAr squared",
    explanation: "The power triangle gives S squared = P squared + Q squared, or kVA squared = kW squared + kVAr squared."
  },
  {
    id: "q9",
    question: "A lagging power factor indicates:",
    options: ["Capacitive load", "Resistive load", "Inductive load", "Unity power factor"],
    correctAnswer: "Inductive load",
    explanation: "Lagging power factor means current lags voltage, which occurs in inductive loads like motors and transformers."
  },
  {
    id: "q10",
    question: "Why do electricity suppliers penalise low power factor?",
    options: ["Uses more energy", "Requires higher current for same power", "Causes voltage rise", "Reduces frequency"],
    correctAnswer: "Requires higher current for same power",
    explanation: "Low pf means higher current for the same true power, requiring larger cables and transformers without delivering more useful power."
  },
  {
    id: "q11",
    question: "A factory has 200 kW load at 0.7 pf. To correct to 0.95 pf, the required kVAr correction is approximately:",
    options: ["102 kVAr", "152 kVAr", "204 kVAr", "50 kVAr"],
    correctAnswer: "102 kVAr",
    explanation: "Initial Q1 = P times tan(arccos(0.7)) = 200 times 1.02 = 204 kVAr. Final Q2 = 200 times tan(arccos(0.95)) = 200 times 0.33 = 66 kVAr. Correction = 204 minus 66 = 138 kVAr approximately 102 kVAr with standard capacitor values."
  },
  {
    id: "q12",
    question: "In a purely capacitive circuit, the power factor is:",
    options: ["1.0 lagging", "0 lagging", "0 leading", "1.0 unity"],
    correctAnswer: "0 leading",
    explanation: "A pure capacitor stores and returns all energy each cycle (no real power consumed), so pf = 0, and current leads voltage hence leading."
  }
];

const faqs = [
  {
    question: "What is the difference between kW and kVA?",
    answer: "kW (kilowatts) measures true power - the actual power doing useful work. kVA (kilovolt-amperes) measures apparent power - the total power the supply must provide. The difference is due to reactive power from inductors and capacitors. For a resistive load they are equal, but motors and other inductive loads have kVA greater than kW."
  },
  {
    question: "Why is power factor important in electrical installations?",
    answer: "Power factor affects cable sizing, transformer capacity, and electricity costs. Low power factor means higher currents for the same useful power, requiring larger cables and causing more losses. Many commercial tariffs include power factor penalties below 0.9. BS 7671 requires consideration of power factor for maximum demand calculations."
  },
  {
    question: "How do capacitors improve power factor?",
    answer: "Capacitors provide leading reactive power (kVAr) that cancels the lagging reactive power from inductive loads. This reduces the total reactive power, improving power factor. Capacitors are installed in parallel with loads and sized to achieve the target power factor, typically 0.95 or above."
  },
  {
    question: "What is reactive power and why doesnt it do useful work?",
    answer: "Reactive power represents energy stored in magnetic fields (inductors) or electric fields (capacitors) each quarter cycle, then returned to the supply. While it flows back and forth, no net energy is transferred. However, it still requires current flow, loading cables and transformers without doing useful work."
  },
  {
    question: "How do I calculate power factor from voltage and current readings?",
    answer: "Measure true power with a wattmeter (P in watts), and calculate apparent power from V times I (S in VA). Power factor equals P divided by S. Alternatively, measure phase angle with a phase meter and calculate pf equals cos(phase angle). Most modern power analysers display power factor directly."
  },
  {
    question: "What is the typical power factor of common electrical loads?",
    answer: "Incandescent lamps and heaters have pf approximately 1.0. LED drivers and electronics typically 0.5 to 0.95. Induction motors unloaded around 0.2 to 0.4, loaded around 0.8 to 0.9. Discharge lamps without correction around 0.5. Welders around 0.5 to 0.7. Modern equipment often includes power factor correction to achieve 0.9 or better."
  }
];

const Level3Module3Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);
  const [showQuickReference, setShowQuickReference] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-b from-blue-900/20 to-transparent border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-blue-400 font-medium">Section 4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Power in AC Circuits
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            True power, reactive power, apparent power and power factor - understanding the power triangle for electrical design
          </p>
        </div>
      </div>

      {/* Quick Summary Boxes */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">True Power</span>
              </div>
              <p className="text-sm text-white/70">P = VI cos(phi) measured in Watts - actual work done</p>
            </CardContent>
          </Card>
          <Card className="bg-amber-500/10 border-amber-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Calculator className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">Reactive Power</span>
              </div>
              <p className="text-sm text-white/70">Q = VI sin(phi) measured in VAr - stored energy</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">Apparent Power</span>
              </div>
              <p className="text-sm text-white/70">S = VI measured in VA - total supply power</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Learning Outcomes */}
        <Card className="bg-blue-500/10 border-blue-500/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
                <Target className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white mb-3">Learning Outcomes</h2>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <span>Distinguish between true, reactive and apparent power in AC circuits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <span>Calculate power factor and understand its significance for electrical installations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <span>Apply the power triangle to solve single-phase and three-phase power problems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <span>Design power factor correction using capacitors for industrial installations</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="prose prose-invert max-w-none">
          {/* Section 1: Types of Power */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">True, Reactive and Apparent Power</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              In AC circuits containing reactive components, power is not simply voltage multiplied by current.
              The phase difference between voltage and current means energy flows in both directions during
              each cycle. Understanding the three types of power is essential for electrical design and
              calculating maximum demand.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">The Three Power Components</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <h4 className="text-green-400 font-medium mb-2">True Power (P) - Watts</h4>
                    <p className="text-white/80 text-sm mb-2">
                      The actual power consumed and converted to useful work or heat. Only resistive elements
                      consume true power. Also called active power or real power.
                    </p>
                    <code className="text-green-300 text-lg">P = V x I x cos(phi) = I squared x R</code>
                  </div>
                  <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <h4 className="text-amber-400 font-medium mb-2">Reactive Power (Q) - VAr</h4>
                    <p className="text-white/80 text-sm mb-2">
                      Power stored in and released by reactive components each cycle. Inductors store
                      energy in magnetic fields, capacitors in electric fields. No net energy is consumed.
                    </p>
                    <code className="text-amber-300 text-lg">Q = V x I x sin(phi) = I squared x X</code>
                  </div>
                  <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <h4 className="text-purple-400 font-medium mb-2">Apparent Power (S) - VA</h4>
                    <p className="text-white/80 text-sm mb-2">
                      The total power that must be supplied by the source, combining true and reactive power.
                      Used for sizing cables, transformers and switchgear.
                    </p>
                    <code className="text-purple-300 text-lg">S = V x I = sqrt(P squared + Q squared)</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            <InlineCheck
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </section>

          {/* Section 2: Power Factor */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Calculator className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">Power Factor and Phase Angle</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              Power factor is the ratio of true power to apparent power, indicating how efficiently
              the supply delivers useful power. It equals the cosine of the phase angle between
              voltage and current, ranging from 0 to 1.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Power Factor Fundamentals</h3>
                <div className="bg-gradient-to-r from-amber-500/10 to-transparent p-4 rounded-lg border-l-4 border-amber-500 mb-4">
                  <p className="text-white font-mono text-lg mb-2">pf = cos(phi) = P / S = True Power / Apparent Power</p>
                  <p className="text-white/70 text-sm">Where phi is the phase angle between voltage and current</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-white font-medium mb-2">Lagging Power Factor</p>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>Current lags voltage</li>
                      <li>Inductive loads (motors, transformers)</li>
                      <li>Most common in industrial settings</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-white font-medium mb-2">Leading Power Factor</p>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>Current leads voltage</li>
                      <li>Capacitive loads</li>
                      <li>Rare in practice, used for correction</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-500/10 border-blue-500/20 my-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-blue-400 font-medium mb-2">Power Factor Values in Practice</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="text-white/80">
                        <p className="font-medium text-white mb-1">Typical Load Power Factors:</p>
                        <ul className="space-y-1">
                          <li>Resistive heaters: 1.0</li>
                          <li>Incandescent lamps: 1.0</li>
                          <li>LED drivers: 0.9 to 0.95</li>
                          <li>Fluorescent (compensated): 0.9</li>
                        </ul>
                      </div>
                      <div className="text-white/80">
                        <p className="font-medium text-white mb-1">Motor Power Factors:</p>
                        <ul className="space-y-1">
                          <li>Full load: 0.8 to 0.9</li>
                          <li>Half load: 0.6 to 0.75</li>
                          <li>No load: 0.2 to 0.4</li>
                          <li>Starting: very low</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <InlineCheck
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </section>

          {/* Section 3: Power Triangle */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">The Power Triangle</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              The power triangle is a graphical representation showing the relationship between
              true, reactive and apparent power. It is derived from the impedance triangle and
              uses the same angle phi. This is an essential tool for power calculations.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Power Triangle Relationships</h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-500/10 to-transparent p-4 rounded-lg border-l-4 border-purple-500">
                    <p className="text-white font-medium mb-3">Key Formulae from the Power Triangle:</p>
                    <div className="grid md:grid-cols-2 gap-4 font-mono text-sm">
                      <div className="space-y-2">
                        <p className="text-purple-300">S = sqrt(P squared + Q squared)</p>
                        <p className="text-purple-300">P = S x cos(phi)</p>
                        <p className="text-purple-300">Q = S x sin(phi)</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-purple-300">tan(phi) = Q / P</p>
                        <p className="text-purple-300">cos(phi) = P / S = pf</p>
                        <p className="text-purple-300">sin(phi) = Q / S</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Worked Example</h4>
                    <p className="text-white/70 text-sm mb-3">
                      A motor draws 5 kW at 0.8 power factor lagging. Find Q and S.
                    </p>
                    <div className="space-y-2 text-sm font-mono">
                      <p className="text-white/80">S = P / pf = 5 / 0.8 = 6.25 kVA</p>
                      <p className="text-white/80">phi = arccos(0.8) = 36.87 degrees</p>
                      <p className="text-white/80">Q = S x sin(36.87) = 6.25 x 0.6 = 3.75 kVAr lagging</p>
                      <p className="text-green-400 mt-2">Check: sqrt(5 squared + 3.75 squared) = sqrt(25 + 14.0625) = 6.25 kVA Correct</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <InlineCheck
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </section>

          {/* Section 4: Power Factor Correction */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Lightbulb className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">Power Factor Correction</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              Power factor correction (PFC) improves efficiency by reducing reactive power demand.
              Capacitors are connected in parallel with inductive loads to supply reactive power
              locally, reducing the current drawn from the supply.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Calculating Correction Capacitors</h3>
                <div className="bg-gradient-to-r from-blue-500/10 to-transparent p-4 rounded-lg border-l-4 border-blue-500 mb-4">
                  <p className="text-white font-medium mb-2">Required kVAr Correction:</p>
                  <p className="text-blue-300 font-mono mb-2">Qc = P x (tan(phi1) - tan(phi2))</p>
                  <p className="text-white/70 text-sm">Where phi1 is original angle, phi2 is target angle</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Worked Example: Industrial Installation</h4>
                  <p className="text-white/70 text-sm mb-3">
                    A factory has 150 kW load at 0.7 pf. Calculate capacitor kVAr to correct to 0.95 pf.
                  </p>
                  <div className="space-y-2 text-sm font-mono">
                    <p className="text-white/80">Original: phi1 = arccos(0.7) = 45.57 degrees, tan(phi1) = 1.02</p>
                    <p className="text-white/80">Target: phi2 = arccos(0.95) = 18.19 degrees, tan(phi2) = 0.329</p>
                    <p className="text-white/80">Qc = 150 x (1.02 - 0.329) = 150 x 0.691 = 103.7 kVAr</p>
                    <p className="text-green-400 mt-2">Install 100 kVAr or 110 kVAr capacitor bank (standard sizes)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-500/10 border-amber-500/20 my-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-amber-400 font-medium mb-2">Power Factor Correction Considerations</h4>
                    <ul className="text-white/80 text-sm space-y-2">
                      <li><strong>Avoid over-correction:</strong> Leading power factor can cause voltage rise and resonance</li>
                      <li><strong>Harmonics:</strong> Non-linear loads can cause capacitor overheating - use detuned reactors</li>
                      <li><strong>Switching transients:</strong> Large capacitor banks need contactors rated for capacitive switching</li>
                      <li><strong>Discharge time:</strong> Capacitors retain charge - allow discharge before reconnection</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <InlineCheck
              question={quickCheckQuestions[3].question}
              options={quickCheckQuestions[3].options}
              correctIndex={quickCheckQuestions[3].correctIndex}
              explanation={quickCheckQuestions[3].explanation}
            />
          </section>

          {/* Practical Guidance */}
          <section className="mb-12">
            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-500/20 rounded-lg shrink-0">
                    <BookOpen className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="w-full">
                    <h3 className="text-lg font-semibold text-white mb-4">Practical Guidance for Electricians</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="text-green-400 font-medium mb-2">Three-Phase Power Calculations</h4>
                        <div className="text-sm text-white/80 space-y-2">
                          <p className="font-mono">P = sqrt(3) x V_L x I_L x pf</p>
                          <p className="font-mono">P = 3 x V_ph x I_ph x pf</p>
                          <p className="font-mono">S = sqrt(3) x V_L x I_L</p>
                          <p className="text-white/60 mt-2">V_L = line voltage (400V), V_ph = phase voltage (230V)</p>
                        </div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="text-green-400 font-medium mb-2">BS 7671 Requirements</h4>
                        <ul className="text-sm text-white/80 space-y-1">
                          <li>Maximum demand assessment must consider power factor</li>
                          <li>Diversity factors apply to apparent power (kVA)</li>
                          <li>Cable sizing uses design current including pf effect</li>
                          <li>Regulation 314.1 - assessment of general characteristics</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <HelpCircle className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <h3 className="text-white font-medium mb-2 flex items-start gap-2">
                      <span className="text-blue-400 font-bold shrink-0">Q:</span>
                      {faq.question}
                    </h3>
                    <p className="text-white/70 text-sm ml-6">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Quick Reference Toggle */}
          <section className="mb-12">
            <Button
              variant="outline"
              className="w-full justify-between text-white border-white/20 hover:bg-white/10"
              onClick={() => setShowQuickReference(!showQuickReference)}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Quick Reference - Power Formulae
              </span>
              <span>{showQuickReference ? '−' : '+'}</span>
            </Button>

            {showQuickReference && (
              <Card className="mt-4 bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Single-Phase Power</h4>
                      <div className="space-y-2 text-sm font-mono text-white/80">
                        <p>P = V x I x cos(phi) [Watts]</p>
                        <p>Q = V x I x sin(phi) [VAr]</p>
                        <p>S = V x I [VA]</p>
                        <p>pf = P / S = cos(phi)</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Three-Phase Power</h4>
                      <div className="space-y-2 text-sm font-mono text-white/80">
                        <p>P = sqrt(3) x V_L x I_L x pf</p>
                        <p>S = sqrt(3) x V_L x I_L</p>
                        <p>Q = sqrt(3) x V_L x I_L x sin(phi)</p>
                        <p>sqrt(3) = 1.732</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Power Triangle</h4>
                      <div className="space-y-2 text-sm font-mono text-white/80">
                        <p>S squared = P squared + Q squared</p>
                        <p>tan(phi) = Q / P</p>
                        <p>Qc = P x (tan(phi1) - tan(phi2))</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Common Power Factor Values</h4>
                      <div className="space-y-2 text-sm text-white/80">
                        <p>Unity (resistive): 1.0</p>
                        <p>Industrial target: 0.95</p>
                        <p>Penalty threshold: 0.9</p>
                        <p>Motor full load: 0.8-0.9</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>
        </div>

        {/* Quiz Section */}
        <section className="mb-12">
          <Quiz
            questions={quizQuestions}
            title="Power in AC Circuits Quiz"
            description="Test your understanding of power types, power factor and power calculations."
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
          <Button variant="outline" className="text-white border-white/20 hover:bg-white/10" asChild>
            <Link to="/study-centre/apprentice/level3-module3-section4-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Impedance and Admittance
            </Link>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
            <Link to="/study-centre/apprentice/level3-module3-section4-6">
              Next: Harmonics and Waveform Distortion
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Level3Module3Section4_5;
