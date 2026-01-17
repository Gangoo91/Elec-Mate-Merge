import { ArrowLeft, ArrowRight, BookOpen, Zap, Calculator, AlertTriangle, Lightbulb, CheckCircle2, HelpCircle, Info, Target, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const TITLE = "Harmonics and Waveform Distortion - Level 3 Electrical Science";
const DESCRIPTION = "Master harmonic content, THD calculations and the effects of non-linear loads for City & Guilds electrical science Level 3.";

const quickCheckQuestions = [
  {
    id: "qc1",
    question: "The 3rd harmonic in a 50 Hz system has a frequency of:",
    options: ["100 Hz", "150 Hz", "200 Hz", "250 Hz"],
    correctIndex: 1,
    explanation: "The nth harmonic frequency = n times fundamental. Third harmonic = 3 times 50 = 150 Hz."
  },
  {
    id: "qc2",
    question: "Which harmonic is most problematic in three-phase systems with neutral?",
    options: ["2nd harmonic", "3rd harmonic", "5th harmonic", "7th harmonic"],
    correctIndex: 1,
    explanation: "Triple-n harmonics (3rd, 9th, 15th) are zero-sequence and add up in the neutral conductor, potentially causing overloading."
  },
  {
    id: "qc3",
    question: "A waveform has THD of 25%. This means the harmonic content is:",
    options: ["25% of fundamental voltage", "25% of total voltage", "75% of fundamental voltage", "25 times fundamental"],
    correctIndex: 0,
    explanation: "THD is the ratio of total harmonic content to the fundamental, expressed as a percentage. 25% THD means harmonics equal 25% of fundamental magnitude."
  },
  {
    id: "qc4",
    question: "Which type of load typically causes harmonic distortion?",
    options: ["Resistive heaters", "Incandescent lamps", "Variable speed drives", "Kettles"],
    correctIndex: 2,
    explanation: "Variable speed drives, LED drivers, and switched-mode power supplies are non-linear loads that draw non-sinusoidal current, creating harmonics."
  }
];

const quizQuestions = [
  {
    id: "q1",
    question: "What is the fundamental frequency of the UK mains supply?",
    options: ["60 Hz", "50 Hz", "100 Hz", "25 Hz"],
    correctAnswer: "50 Hz",
    explanation: "The UK mains supply operates at 50 Hz, which is the fundamental or first harmonic frequency."
  },
  {
    id: "q2",
    question: "The 5th harmonic in a 50 Hz system has a frequency of:",
    options: ["200 Hz", "250 Hz", "300 Hz", "350 Hz"],
    correctAnswer: "250 Hz",
    explanation: "Fifth harmonic = 5 times 50 Hz = 250 Hz. Each harmonic is a multiple of the fundamental."
  },
  {
    id: "q3",
    question: "Odd harmonics are significant because they:",
    options: ["Cancel out in three-phase", "Are produced by symmetrical loads", "Only affect capacitors", "Have no practical effect"],
    correctAnswer: "Are produced by symmetrical loads",
    explanation: "Symmetrical non-linear loads produce odd harmonics because positive and negative half-cycles are identical, cancelling even harmonics."
  },
  {
    id: "q4",
    question: "THD stands for:",
    options: ["Total Harmonic Difference", "True Harmonic Distortion", "Total Harmonic Distortion", "Theoretical Harmonic Deviation"],
    correctAnswer: "Total Harmonic Distortion",
    explanation: "THD (Total Harmonic Distortion) quantifies the total harmonic content relative to the fundamental frequency."
  },
  {
    id: "q5",
    question: "What is the formula for calculating THD?",
    options: ["THD = V1 / Vh x 100%", "THD = sqrt(V2 squared + V3 squared + ...) / V1 x 100%", "THD = (V2 + V3 + V4) / V1 x 100%", "THD = Vh / Vtotal x 100%"],
    correctAnswer: "THD = sqrt(V2 squared + V3 squared + ...) / V1 x 100%",
    explanation: "THD is calculated as the RMS sum of all harmonics divided by the fundamental, expressed as a percentage."
  },
  {
    id: "q6",
    question: "Triple-n harmonics (3rd, 9th, 15th) in three-phase systems:",
    options: ["Cancel in the neutral", "Add in the neutral", "Only affect phase conductors", "Have no effect"],
    correctAnswer: "Add in the neutral",
    explanation: "Triple-n harmonics are zero-sequence and sum arithmetically in the neutral, potentially causing neutral currents higher than phase currents."
  },
  {
    id: "q7",
    question: "BS 7671 requires neutral conductor sizing to consider harmonics when:",
    options: ["Never required", "Third harmonic exceeds 15% of fundamental", "Any harmonics present", "Only for industrial installations"],
    correctAnswer: "Third harmonic exceeds 15% of fundamental",
    explanation: "Regulation 523.6.3 requires increased neutral sizing when third harmonic current exceeds 15% of fundamental phase current."
  },
  {
    id: "q8",
    question: "Which equipment is most susceptible to harmonic damage?",
    options: ["LED lamps", "Capacitors", "Resistive heaters", "Incandescent lamps"],
    correctAnswer: "Capacitors",
    explanation: "Capacitor reactance decreases with frequency, so harmonics cause increased current flow, leading to overheating and premature failure."
  },
  {
    id: "q9",
    question: "A detuned reactor is used in power factor correction to:",
    options: ["Increase harmonics", "Prevent resonance with harmonics", "Generate harmonics", "Filter the fundamental"],
    correctAnswer: "Prevent resonance with harmonics",
    explanation: "Detuned reactors shift the resonant frequency below dominant harmonics, preventing dangerous resonance that could amplify harmonic currents."
  },
  {
    id: "q10",
    question: "Skin effect at harmonic frequencies causes:",
    options: ["Reduced cable resistance", "Increased cable resistance", "No change in resistance", "Improved current flow"],
    correctAnswer: "Increased cable resistance",
    explanation: "Higher frequency harmonics concentrate current flow near the conductor surface (skin effect), increasing effective resistance and heating."
  },
  {
    id: "q11",
    question: "The typical THD limit for voltage at the point of common coupling is:",
    options: ["5%", "8%", "15%", "25%"],
    correctAnswer: "8%",
    explanation: "Engineering Recommendation G5/5 typically limits voltage THD to 8% at points of common coupling to protect other consumers."
  },
  {
    id: "q12",
    question: "An active harmonic filter works by:",
    options: ["Blocking all frequencies", "Injecting anti-phase harmonics", "Absorbing harmonic energy", "Converting harmonics to heat"],
    correctAnswer: "Injecting anti-phase harmonics",
    explanation: "Active filters measure harmonic content and inject equal but opposite harmonic currents to cancel distortion at the source."
  }
];

const faqs = [
  {
    question: "What are electrical harmonics?",
    answer: "Harmonics are voltages or currents at frequencies that are integer multiples of the fundamental supply frequency. In the UK, the fundamental is 50 Hz, so the 2nd harmonic is 100 Hz, 3rd is 150 Hz, and so on. They are caused by non-linear loads that draw current in pulses rather than smooth sine waves."
  },
  {
    question: "Why are harmonics a problem in electrical installations?",
    answer: "Harmonics cause multiple problems: overheating of cables and transformers due to skin effect, increased neutral current in three-phase systems, resonance with capacitors, interference with sensitive equipment, increased losses, and potential failure of power factor correction equipment. They also increase magnetic losses in motors and transformers."
  },
  {
    question: "How do I measure harmonics on site?",
    answer: "Use a power quality analyser or harmonic analyser clamp meter. These instruments use Fast Fourier Transform (FFT) to separate the waveform into its harmonic components. Measure both voltage and current THD, and individual harmonic levels up to at least the 25th harmonic. Record measurements under typical load conditions."
  },
  {
    question: "What is the difference between voltage and current THD?",
    answer: "Voltage THD measures distortion of the supply voltage waveform at a point. Current THD measures distortion of the current drawn by a load. Current THD is typically higher as it reflects the characteristics of the non-linear load. Voltage THD depends on the supply impedance and affects all connected equipment."
  },
  {
    question: "How can harmonics be reduced or eliminated?",
    answer: "Solutions include: passive filters tuned to specific harmonic frequencies, active filters that inject cancelling currents, multi-pulse rectifiers (12, 18 or 24 pulse) in drives, isolation transformers with delta windings to trap triple-n harmonics, K-rated transformers designed for harmonic loads, and oversized neutrals per BS 7671."
  },
  {
    question: "Why does BS 7671 require larger neutrals for harmonic loads?",
    answer: "In balanced three-phase systems, fundamental currents cancel in the neutral. However, triple-n harmonics (3rd, 9th, 15th) are zero-sequence and add arithmetically, potentially causing neutral current to exceed phase current by up to 1.73 times. Regulation 523.6.3 requires increased neutral sizing when third harmonic exceeds 15%."
  }
];

const Level3Module3Section4_6 = () => {
  useSEO(TITLE, DESCRIPTION);
  const [showQuickReference, setShowQuickReference] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
      <div className="bg-gradient-to-b from-purple-900/20 to-transparent border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-purple-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-purple-400 font-medium">Section 4.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Harmonics and Waveform Distortion
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Harmonic content, THD calculations and the effects of non-linear loads on electrical installations
          </p>
        </div>
      </div>

      {/* Quick Summary Boxes */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">Harmonic Frequency</span>
              </div>
              <p className="text-sm text-white/70">f_n = n times f_1 (nth harmonic = n times 50 Hz)</p>
            </CardContent>
          </Card>
          <Card className="bg-amber-500/10 border-amber-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Calculator className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">THD Formula</span>
              </div>
              <p className="text-sm text-white/70">THD = sqrt(sum of Vn squared) / V1 x 100%</p>
            </CardContent>
          </Card>
          <Card className="bg-red-500/10 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">Neutral Overload</span>
              </div>
              <p className="text-sm text-white/70">Triple-n harmonics add in neutral - up to 1.73x phase current</p>
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
                    <span>Explain the origin and characteristics of harmonic frequencies in AC systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <span>Calculate Total Harmonic Distortion and interpret measurement results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <span>Identify the effects of harmonics on cables, transformers and power factor correction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <span>Apply BS 7671 requirements for neutral sizing with harmonic loads</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="prose prose-invert max-w-none">
          {/* Section 1: What Are Harmonics */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">Understanding Harmonics</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              Harmonics are sinusoidal voltages or currents at frequencies that are integer multiples of the
              fundamental supply frequency. In the UK, the fundamental is 50 Hz. Harmonics are created by
              non-linear loads that draw current in non-sinusoidal patterns, distorting the supply waveform.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Harmonic Frequencies in 50 Hz Systems</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-2 text-white">Harmonic</th>
                        <th className="text-left p-2 text-white">Frequency</th>
                        <th className="text-left p-2 text-white">Sequence</th>
                        <th className="text-left p-2 text-white">Effects</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70">
                      <tr className="border-b border-white/10">
                        <td className="p-2">1st (Fundamental)</td>
                        <td className="p-2">50 Hz</td>
                        <td className="p-2">Positive</td>
                        <td className="p-2">Normal operation</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-2">3rd</td>
                        <td className="p-2">150 Hz</td>
                        <td className="p-2 text-red-400">Zero</td>
                        <td className="p-2">Adds in neutral</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-2">5th</td>
                        <td className="p-2">250 Hz</td>
                        <td className="p-2 text-amber-400">Negative</td>
                        <td className="p-2">Motor heating, torque pulsation</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-2">7th</td>
                        <td className="p-2">350 Hz</td>
                        <td className="p-2 text-green-400">Positive</td>
                        <td className="p-2">Motor heating</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-2">9th</td>
                        <td className="p-2">450 Hz</td>
                        <td className="p-2 text-red-400">Zero</td>
                        <td className="p-2">Adds in neutral</td>
                      </tr>
                      <tr>
                        <td className="p-2">11th</td>
                        <td className="p-2">550 Hz</td>
                        <td className="p-2 text-amber-400">Negative</td>
                        <td className="p-2">Skin effect losses</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-500/10 border-amber-500/20 my-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-amber-400 font-medium mb-2">Common Harmonic Sources</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="text-white/80">
                        <p className="font-medium text-white mb-1">Non-Linear Loads:</p>
                        <ul className="space-y-1">
                          <li>Variable speed drives (VSDs)</li>
                          <li>Switch-mode power supplies</li>
                          <li>LED drivers</li>
                          <li>Fluorescent lighting with electronic ballasts</li>
                        </ul>
                      </div>
                      <div className="text-white/80">
                        <p className="font-medium text-white mb-1">Other Sources:</p>
                        <ul className="space-y-1">
                          <li>UPS systems</li>
                          <li>Battery chargers</li>
                          <li>Welding equipment</li>
                          <li>Computer equipment</li>
                        </ul>
                      </div>
                    </div>
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

          {/* Section 2: THD Calculations */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Calculator className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">Total Harmonic Distortion (THD)</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              THD quantifies the total harmonic content of a waveform as a percentage of the fundamental.
              It is calculated as the RMS sum of all harmonic components divided by the fundamental component.
              THD can be measured for both voltage and current.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">THD Calculation</h3>
                <div className="bg-gradient-to-r from-amber-500/10 to-transparent p-4 rounded-lg border-l-4 border-amber-500 mb-4">
                  <p className="text-white font-medium mb-2">THD Formula:</p>
                  <p className="text-amber-300 font-mono text-lg mb-2">THD% = sqrt(V2 squared + V3 squared + V4 squared + ... + Vn squared) / V1 x 100</p>
                  <p className="text-white/70 text-sm">Where V1 is fundamental and V2, V3, etc. are harmonic magnitudes</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Worked Example</h4>
                  <p className="text-white/70 text-sm mb-3">
                    A waveform has: V1 = 230V, V3 = 23V, V5 = 15V, V7 = 10V. Calculate THD.
                  </p>
                  <div className="space-y-2 text-sm font-mono">
                    <p className="text-white/80">Harmonic RMS = sqrt(23 squared + 15 squared + 10 squared)</p>
                    <p className="text-white/80">= sqrt(529 + 225 + 100) = sqrt(854) = 29.2V</p>
                    <p className="text-white/80">THD = 29.2 / 230 x 100 = 12.7%</p>
                    <p className="text-green-400 mt-2">This exceeds the typical 8% voltage THD limit</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-500/10 border-blue-500/20 my-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-blue-400 font-medium mb-2">THD Limits and Standards</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="text-white/80">
                        <p className="font-medium text-white mb-1">Voltage THD Limits (G5/5):</p>
                        <ul className="space-y-1">
                          <li>LV systems: 8% maximum</li>
                          <li>Individual harmonics: vary by order</li>
                          <li>5th harmonic: 6% typical limit</li>
                          <li>Higher harmonics: lower limits</li>
                        </ul>
                      </div>
                      <div className="text-white/80">
                        <p className="font-medium text-white mb-1">Current THD Considerations:</p>
                        <ul className="space-y-1">
                          <li>Often 30-50% for electronic loads</li>
                          <li>Affects cable and equipment sizing</li>
                          <li>No fixed limit but consider effects</li>
                          <li>High current THD causes voltage THD</li>
                        </ul>
                      </div>
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

          {/* Section 3: Effects on Installations */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">Effects on Electrical Installations</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              Harmonics cause a range of problems in electrical installations, from increased losses and
              overheating to equipment malfunction and premature failure. Understanding these effects is
              essential for designing robust installations.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Harmonic Effects on Equipment</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                    <h4 className="text-red-400 font-medium mb-2">Neutral Conductor Overload</h4>
                    <p className="text-white/80 text-sm">
                      In a balanced three-phase system, fundamental currents cancel in the neutral.
                      However, triple-n harmonics (3rd, 9th, 15th) are zero-sequence and add
                      arithmetically. With high 3rd harmonic content, neutral current can exceed
                      phase current by up to 1.73 times (173%).
                    </p>
                  </div>
                  <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <h4 className="text-amber-400 font-medium mb-2">Transformer Heating</h4>
                    <p className="text-white/80 text-sm">
                      Harmonics increase eddy current and hysteresis losses in transformer cores.
                      Higher frequency harmonics cause greater skin effect in windings. Standard
                      transformers may need derating; K-rated transformers are designed for harmonic loads.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <h4 className="text-purple-400 font-medium mb-2">Capacitor Damage</h4>
                    <p className="text-white/80 text-sm">
                      Capacitor reactance decreases with frequency (Xc = 1/2 pi fC). Harmonic currents
                      are amplified, causing overheating. Resonance between capacitors and system
                      inductance at harmonic frequencies can cause dangerous current magnification.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <h4 className="text-blue-400 font-medium mb-2">Cable Derating</h4>
                    <p className="text-white/80 text-sm">
                      Skin effect increases conductor resistance at higher frequencies. Harmonic
                      currents cause additional I squared R losses. Cables may need to be oversized
                      to account for total harmonic current, particularly the neutral.
                    </p>
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

          {/* Section 4: BS 7671 and Mitigation */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Lightbulb className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">BS 7671 Requirements and Mitigation</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              BS 7671 specifically addresses harmonic currents in Regulation 523.6.3, requiring increased
              neutral sizing when third harmonic content exceeds 15% of fundamental. Various mitigation
              techniques are available depending on the severity of the harmonic problem.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">BS 7671 Neutral Sizing for Harmonics</h3>
                <div className="bg-gradient-to-r from-green-500/10 to-transparent p-4 rounded-lg border-l-4 border-green-500 mb-4">
                  <p className="text-white font-medium mb-2">Regulation 523.6.3 Requirements:</p>
                  <div className="text-white/80 text-sm space-y-2">
                    <p>Where third harmonic content exceeds 15% and up to 33%:</p>
                    <p className="font-mono text-green-300">Neutral sized equal to phase conductors</p>
                    <p className="mt-2">Where third harmonic content exceeds 33%:</p>
                    <p className="font-mono text-green-300">Neutral sized larger than phase - use Table 4G1A</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-2 text-white">Third Harmonic %</th>
                        <th className="text-left p-2 text-white">Cable Selection Factor</th>
                        <th className="text-left p-2 text-white">Based On</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70">
                      <tr className="border-b border-white/10">
                        <td className="p-2">0 - 15%</td>
                        <td className="p-2">1.0</td>
                        <td className="p-2">Phase current</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-2">15 - 33%</td>
                        <td className="p-2">0.86</td>
                        <td className="p-2">Phase current</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-2">33 - 45%</td>
                        <td className="p-2">1.0</td>
                        <td className="p-2">Neutral current</td>
                      </tr>
                      <tr>
                        <td className="p-2">Above 45%</td>
                        <td className="p-2">Calculated</td>
                        <td className="p-2">Neutral current</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-500/10 border-blue-500/20 my-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-blue-400 font-medium mb-2">Harmonic Mitigation Methods</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="text-white/80">
                        <p className="font-medium text-white mb-1">Passive Solutions:</p>
                        <ul className="space-y-1">
                          <li>Passive harmonic filters (tuned LC)</li>
                          <li>Detuned reactors with PFC</li>
                          <li>K-rated transformers</li>
                          <li>Delta-star transformers (trap 3rd)</li>
                        </ul>
                      </div>
                      <div className="text-white/80">
                        <p className="font-medium text-white mb-1">Active Solutions:</p>
                        <ul className="space-y-1">
                          <li>Active harmonic filters</li>
                          <li>Multi-pulse drives (12/18/24)</li>
                          <li>Active front end drives</li>
                          <li>Phase-shifting transformers</li>
                        </ul>
                      </div>
                    </div>
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
                        <h4 className="text-green-400 font-medium mb-2">When to Suspect Harmonics</h4>
                        <ul className="text-sm text-white/80 space-y-1">
                          <li>Overheating neutrals or transformers</li>
                          <li>Premature capacitor failure</li>
                          <li>Unexplained circuit breaker tripping</li>
                          <li>Flickering or buzzing in equipment</li>
                          <li>Large proportion of VSD or LED loads</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="text-green-400 font-medium mb-2">Best Practice</h4>
                        <ul className="text-sm text-white/80 space-y-1">
                          <li>Measure THD before adding PFC capacitors</li>
                          <li>Use detuned reactors for harmonic-rich sites</li>
                          <li>Specify K-rated transformers for data centres</li>
                          <li>Size neutral per BS 7671 Appendix 4</li>
                          <li>Consider separate neutral for lighting circuits</li>
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
                Quick Reference - Harmonics
              </span>
              <span>{showQuickReference ? '−' : '+'}</span>
            </Button>

            {showQuickReference && (
              <Card className="mt-4 bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Key Harmonic Frequencies</h4>
                      <div className="space-y-2 text-sm text-white/80">
                        <p>3rd harmonic: 150 Hz (zero sequence)</p>
                        <p>5th harmonic: 250 Hz (negative sequence)</p>
                        <p>7th harmonic: 350 Hz (positive sequence)</p>
                        <p>9th harmonic: 450 Hz (zero sequence)</p>
                        <p>11th harmonic: 550 Hz (negative sequence)</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">THD Limits</h4>
                      <div className="space-y-2 text-sm text-white/80">
                        <p>Voltage THD at PCC: less than 8%</p>
                        <p>Individual harmonics: per G5/5</p>
                        <p>BS 7671 neutral sizing: greater than 15% 3rd</p>
                        <p>Oversize neutral: greater than 33% 3rd</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Neutral Current Formula</h4>
                      <div className="space-y-2 text-sm font-mono text-white/80">
                        <p>I_N = 3 x I_3rd (for balanced loads)</p>
                        <p>Max I_N = 1.73 x I_phase</p>
                        <p>At 33% third harmonic</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Equipment Effects</h4>
                      <div className="space-y-2 text-sm text-white/80">
                        <p>Transformers: increased losses, derating</p>
                        <p>Capacitors: overheating, resonance</p>
                        <p>Cables: skin effect, additional losses</p>
                        <p>Motors: torque pulsation, heating</p>
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
            title="Harmonics and Waveform Distortion Quiz"
            description="Test your understanding of harmonics, THD and their effects on installations."
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
          <Button variant="outline" className="text-white border-white/20 hover:bg-white/10" asChild>
            <Link to="/study-centre/apprentice/level3-module3-section4-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Power in AC Circuits
            </Link>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
            <Link to="/study-centre/apprentice/level3-module3-section5-1">
              Next: Power Equations
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Level3Module3Section4_6;
