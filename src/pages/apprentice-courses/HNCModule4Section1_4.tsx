import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Harmonic Assessment - HNC Module 4 Section 1.4";
const DESCRIPTION = "Master harmonic assessment for building services: THD measurement, neutral conductor effects, cable derating, Engineering Recommendation G5/4-1 limits, and VSD harmonic mitigation.";

const quickCheckQuestions = [
  {
    id: "thd-definition",
    question: "Total Harmonic Distortion (THD) measures:",
    options: ["Total power consumption", "Distortion of waveform from pure sine wave", "Cable temperature rise", "Voltage drop percentage"],
    correctIndex: 1,
    explanation: "THD measures how much a waveform deviates from a pure sinusoidal shape, expressed as a percentage. Higher THD indicates more harmonic content."
  },
  {
    id: "third-harmonic",
    question: "In a three-phase system, where do triplen harmonics (3rd, 9th, etc.) accumulate?",
    options: ["In the phase conductors", "In the earth conductor", "In the neutral conductor", "In the transformer"],
    correctIndex: 2,
    explanation: "Triplen harmonics (multiples of 3) are in phase across all three phases and add together in the neutral conductor, potentially causing it to carry more current than the phases."
  },
  {
    id: "g5-4-reference",
    question: "Engineering Recommendation G5/4-1 sets limits for:",
    options: ["Cable installation methods", "Harmonic voltage and current emissions", "Earth fault loop impedance", "RCD sensitivity"],
    correctIndex: 1,
    explanation: "G5/4-1 is the UK standard that sets planning levels for harmonic voltage distortion and emission limits for harmonic currents from customer installations."
  },
  {
    id: "vsd-harmonics",
    question: "A standard 6-pulse VSD primarily produces which harmonics?",
    options: ["2nd, 4th, 6th", "3rd, 9th, 15th", "5th, 7th, 11th, 13th", "All odd harmonics equally"],
    correctIndex: 2,
    explanation: "6-pulse drives produce harmonics of order 6n±1 (5th, 7th, 11th, 13th...). The 5th and 7th are typically largest at around 20-30% of fundamental current."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What causes harmonic currents in building electrical systems?",
    options: [
      "Resistive loads like heaters",
      "Non-linear loads with rectifiers or switching power supplies",
      "Motor starting current",
      "Cable capacitance"
    ],
    correctAnswer: 1,
    explanation: "Non-linear loads (VSDs, SMPS, LED drivers, UPS) draw current in pulses rather than sinusoidally, creating harmonic currents that distort the supply waveform."
  },
  {
    id: 2,
    question: "The 5th harmonic current has a frequency of:",
    options: ["50Hz", "150Hz", "250Hz", "350Hz"],
    correctAnswer: 2,
    explanation: "Harmonic frequency = harmonic order × fundamental frequency. 5th harmonic = 5 × 50Hz = 250Hz"
  },
  {
    id: 3,
    question: "Why is neutral conductor sizing critical in harmonic-rich environments?",
    options: [
      "Neutral carries less current with harmonics",
      "Triplen harmonics add in the neutral, potentially exceeding phase current",
      "Harmonics only flow in the neutral",
      "Neutral conductors filter harmonics"
    ],
    correctAnswer: 1,
    explanation: "Third harmonics and their multiples (triplen) are in phase across all three phases. They add rather than cancel in the neutral, potentially causing neutral current to exceed phase currents."
  },
  {
    id: 4,
    question: "What is the G5/4-1 planning level for THD voltage at LV?",
    options: ["3%", "5%", "8%", "10%"],
    correctAnswer: 1,
    explanation: "G5/4-1 sets the planning level for total harmonic voltage distortion at 5% for LV systems, with individual harmonic limits varying by order."
  },
  {
    id: 5,
    question: "Cable derating for harmonics is required because:",
    options: [
      "Harmonic currents flow to earth",
      "Harmonics cause additional heating due to skin and proximity effects",
      "Harmonics reduce cable insulation rating",
      "It is a BS 7671 regulation requirement"
    ],
    correctAnswer: 1,
    explanation: "Higher frequency harmonics experience increased skin and proximity effects, causing additional heating. Cables must be derated or oversized to handle this extra heat."
  },
  {
    id: 6,
    question: "An active harmonic filter works by:",
    options: [
      "Absorbing harmonics in resistors",
      "Injecting equal and opposite harmonic currents",
      "Blocking harmonics with inductors",
      "Converting harmonics to heat"
    ],
    correctAnswer: 1,
    explanation: "Active filters measure harmonic content and inject compensating currents that are equal in magnitude but opposite in phase, effectively cancelling the harmonics."
  },
  {
    id: 7,
    question: "Which equipment is most sensitive to harmonic voltage distortion?",
    options: [
      "Resistive heaters",
      "Capacitor banks for power factor correction",
      "Incandescent lighting",
      "Manual motor starters"
    ],
    correctAnswer: 1,
    explanation: "Capacitors are very sensitive to harmonics as capacitive reactance decreases with frequency. Harmonic currents can cause overheating and premature failure of PFC capacitors."
  },
  {
    id: 8,
    question: "A 12-pulse VSD compared to 6-pulse produces:",
    options: [
      "The same harmonics but at higher magnitude",
      "Lower magnitude 5th and 7th harmonics",
      "Only even harmonics",
      "No harmonics at all"
    ],
    correctAnswer: 1,
    explanation: "12-pulse drives use two 6-pulse bridges with 30° phase shift, cancelling 5th and 7th harmonics. First significant harmonics are 11th and 13th at reduced levels."
  },
  {
    id: 9,
    question: "BS 7671 requires oversized neutral conductors when:",
    options: [
      "Always in three-phase systems",
      "Third harmonic content exceeds 15-33% depending on cable type",
      "Power factor is below 0.9",
      "Cables exceed 25m in length"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Appendix 11 requires consideration of neutral oversizing when third harmonic content exceeds certain thresholds. The neutral may need to be larger than phase conductors."
  },
  {
    id: 10,
    question: "What is the K-factor rating for transformers?",
    options: [
      "A measure of transformer efficiency",
      "A derating factor for harmonic loads",
      "The transformer's power factor",
      "The short-circuit capacity"
    ],
    correctAnswer: 1,
    explanation: "K-factor is a transformer rating that indicates its ability to handle harmonic load currents. Higher K-factor (K4, K13, K20) means better harmonic tolerance without derating."
  }
];

const faqs = [
  {
    question: "How do I know if my installation has a harmonic problem?",
    answer: "Signs include: overheating neutral conductors, premature capacitor failure, transformer overheating, flickering lights, electronic equipment malfunction. Power quality monitoring with a harmonic analyser confirms the issue by measuring THD and individual harmonic magnitudes."
  },
  {
    question: "What is the difference between passive and active harmonic filters?",
    answer: "Passive filters use tuned LC circuits to absorb specific harmonics - they're simple and robust but fixed to certain frequencies. Active filters use power electronics to inject compensating currents in real-time - more expensive but can adapt to changing harmonic profiles and filter multiple harmonics simultaneously."
  },
  {
    question: "Do LED lights cause harmonic problems?",
    answer: "LED drivers contain rectifiers and can have poor power factor and high harmonic content (especially 3rd harmonic) unless designed with PFC circuits. Quality commercial LED luminaires typically have >0.9 power factor and <20% THDi, but cheap products may be worse. The cumulative effect of many LED lights can be significant."
  },
  {
    question: "Why do VSDs create harmonics and how can I reduce them?",
    answer: "Standard VSDs have a 6-pulse diode rectifier front end that draws current in pulses, creating 5th, 7th, 11th, 13th harmonics. Mitigation options include: line reactors (3-5% impedance), DC link chokes, 12 or 18-pulse drives, active front-end (AFE) drives, or passive/active harmonic filters."
  },
  {
    question: "How do I size a neutral conductor for harmonic loads?",
    answer: "BS 7671 Appendix 11 provides guidance. For circuits with >33% third harmonic, the neutral must be sized for the harmonic current, which may exceed phase current. As a minimum, use equal size neutral to phase. For high harmonic loads (>50% THD), double neutral size may be needed."
  },
  {
    question: "What happens if I exceed G5/4-1 emission limits?",
    answer: "DNOs can require customers to reduce harmonic emissions. This may involve installing harmonic filters, upgrading to lower-harmonic equipment (AFE drives), or agreeing increased emission limits with network reinforcement charges. Non-compliance can result in connection refusal or disconnection."
  }
];

const HNCModule4Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section1">
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
            <span>Module 4.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Harmonic Assessment
          </h1>
          <p className="text-white/80">
            Understanding harmonic distortion effects and mitigation in modern building services installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Harmonics:</strong> Integer multiples of 50Hz fundamental</li>
              <li className="pl-1"><strong>Cause:</strong> Non-linear loads (VSDs, SMPS, LEDs)</li>
              <li className="pl-1"><strong>THD:</strong> Total Harmonic Distortion percentage</li>
              <li className="pl-1"><strong>G5/4-1:</strong> UK emission limits standard</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>VSDs:</strong> 5th, 7th harmonics significant</li>
              <li className="pl-1"><strong>LED lighting:</strong> 3rd harmonic from drivers</li>
              <li className="pl-1"><strong>Neutral sizing:</strong> May exceed phase current</li>
              <li className="pl-1"><strong>Transformers:</strong> K-rated for harmonic loads</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand harmonic generation by non-linear loads",
              "Calculate THD and individual harmonic magnitudes",
              "Apply G5/4-1 emission limits and planning levels",
              "Assess neutral conductor sizing for triplen harmonics",
              "Apply cable derating factors for harmonic loads",
              "Select appropriate harmonic mitigation techniques"
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

        {/* Section 1: Harmonic Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Harmonic Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Harmonics are voltages or currents at frequencies that are integer multiples of the
              fundamental supply frequency (50Hz in the UK). They are produced by non-linear loads
              that draw current in a non-sinusoidal pattern.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Harmonic Orders and Frequencies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Harmonic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Sequence</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1st (fundamental)</td>
                      <td className="border border-white/10 px-3 py-2">50Hz</td>
                      <td className="border border-white/10 px-3 py-2">Positive</td>
                      <td className="border border-white/10 px-3 py-2">Normal operation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3rd (triplen)</td>
                      <td className="border border-white/10 px-3 py-2">150Hz</td>
                      <td className="border border-white/10 px-3 py-2">Zero</td>
                      <td className="border border-white/10 px-3 py-2">Adds in neutral</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5th</td>
                      <td className="border border-white/10 px-3 py-2">250Hz</td>
                      <td className="border border-white/10 px-3 py-2">Negative</td>
                      <td className="border border-white/10 px-3 py-2">Motor heating, reverse torque</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7th</td>
                      <td className="border border-white/10 px-3 py-2">350Hz</td>
                      <td className="border border-white/10 px-3 py-2">Positive</td>
                      <td className="border border-white/10 px-3 py-2">Motor heating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">9th (triplen)</td>
                      <td className="border border-white/10 px-3 py-2">450Hz</td>
                      <td className="border border-white/10 px-3 py-2">Zero</td>
                      <td className="border border-white/10 px-3 py-2">Adds in neutral</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">11th</td>
                      <td className="border border-white/10 px-3 py-2">550Hz</td>
                      <td className="border border-white/10 px-3 py-2">Negative</td>
                      <td className="border border-white/10 px-3 py-2">General heating</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Total Harmonic Distortion (THD)</p>
              <p className="font-mono text-center text-lg mb-2">THD = √(I₃² + I₅² + I₇² + ... + Iₙ²) / I₁ × 100%</p>
              <p className="text-xs text-white/70 text-center">Where I₁ = fundamental current, Iₙ = nth harmonic current</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common harmonic sources in buildings:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Variable speed drives (VSDs):</strong> 5th, 7th, 11th, 13th harmonics</li>
                <li className="pl-1"><strong>UPS systems:</strong> Depends on design, typically 5th, 7th</li>
                <li className="pl-1"><strong>LED drivers:</strong> 3rd harmonic primarily</li>
                <li className="pl-1"><strong>IT equipment (SMPS):</strong> 3rd, 5th harmonics</li>
                <li className="pl-1"><strong>Discharge lighting:</strong> 3rd harmonic from magnetic ballasts</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Odd harmonics dominate in power systems; triplen harmonics (3rd, 9th, 15th) are particularly problematic in three-phase systems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Effects on Neutral Conductors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Effects on Neutral Conductors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In a balanced three-phase system with linear loads, phase currents cancel in the neutral.
              However, triplen harmonics are zero-sequence and add together, potentially causing the
              neutral current to exceed the phase current.
            </p>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Critical Warning</p>
              <p className="text-sm text-white">
                A circuit with 50% third harmonic per phase can have neutral current equal to 1.5 times the phase current.
                Standard neutral sizing (equal to or smaller than phase) is inadequate for high harmonic loads.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Neutral Current with Harmonics</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">3rd Harmonic %</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Neutral Current</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Neutral Sizing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0-15%</td>
                      <td className="border border-white/10 px-3 py-2">≤45% of phase</td>
                      <td className="border border-white/10 px-3 py-2">Standard (= phase or 50%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">15-33%</td>
                      <td className="border border-white/10 px-3 py-2">45-100% of phase</td>
                      <td className="border border-white/10 px-3 py-2">Equal to phase minimum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">33-45%</td>
                      <td className="border border-white/10 px-3 py-2">100-135% of phase</td>
                      <td className="border border-white/10 px-3 py-2">Larger than phase</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt;45%</td>
                      <td className="border border-white/10 px-3 py-2">&gt;135% of phase</td>
                      <td className="border border-white/10 px-3 py-2">Significantly larger/separate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Requirements (Appendix 11)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Consider harmonic content when sizing neutrals</li>
                <li className="pl-1">For single-core cables, neutral may need to be larger than phase</li>
                <li className="pl-1">For multicore cables, phase derating may be required</li>
                <li className="pl-1">Third harmonic content &gt;15% requires consideration</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design practice:</strong> For circuits serving IT equipment or LED lighting, size neutral equal to or larger than phase conductors.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: G5/4-1 Limits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Engineering Recommendation G5/4-1
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              G5/4-1 is the UK standard (issued by ENA - Energy Networks Association) that sets limits
              for harmonic voltage distortion and customer emission limits. It applies to all installations
              connected to the public distribution network.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage THD Planning Levels</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">THD Limit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Individual Odd</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Individual Even</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LV (400V)</td>
                      <td className="border border-white/10 px-3 py-2">5%</td>
                      <td className="border border-white/10 px-3 py-2">4%</td>
                      <td className="border border-white/10 px-3 py-2">2%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HV (11kV)</td>
                      <td className="border border-white/10 px-3 py-2">4%</td>
                      <td className="border border-white/10 px-3 py-2">3%</td>
                      <td className="border border-white/10 px-3 py-2">1.5%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EHV (33kV+)</td>
                      <td className="border border-white/10 px-3 py-2">3%</td>
                      <td className="border border-white/10 px-3 py-2">2%</td>
                      <td className="border border-white/10 px-3 py-2">1%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Stage Assessment Process</p>
              <div className="space-y-2">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Stage 1 - Simplified Assessment</p>
                  <p className="text-sm text-white/80">For small loads: if total harmonic-producing load is &lt;25% of supply capacity and individual equipment meets EN standards, no further assessment needed.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Stage 2 - Detailed Assessment</p>
                  <p className="text-sm text-white/80">Calculate harmonic currents from equipment data, apply to network impedance, check against emission limits.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Stage 3 - Network Study</p>
                  <p className="text-sm text-white/80">Full harmonic penetration study using power system analysis software. Required for large or complex installations.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment Emission Standards</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>IEC 61000-3-2:</strong> Equipment ≤16A per phase</li>
                <li className="pl-1"><strong>IEC 61000-3-12:</strong> Equipment 16-75A per phase</li>
                <li className="pl-1"><strong>G5/4-1:</strong> Large installations and custom equipment</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>DNO interface:</strong> For installations &gt;1MVA or with significant non-linear loads, early engagement with DNO is essential.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: VSD Harmonics and Mitigation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            VSD Harmonics and Mitigation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Variable Speed Drives are major harmonic sources in building services. Understanding their
              harmonic signature and mitigation options is essential for modern HVAC system design.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical VSD Harmonic Current Spectrum (6-Pulse)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Harmonic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical % of I₁</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5th</td>
                      <td className="border border-white/10 px-3 py-2">25-40%</td>
                      <td className="border border-white/10 px-3 py-2">250Hz</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7th</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                      <td className="border border-white/10 px-3 py-2">350Hz</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">11th</td>
                      <td className="border border-white/10 px-3 py-2">8-12%</td>
                      <td className="border border-white/10 px-3 py-2">550Hz</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">13th</td>
                      <td className="border border-white/10 px-3 py-2">5-10%</td>
                      <td className="border border-white/10 px-3 py-2">650Hz</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">THDi (typical)</td>
                      <td className="border border-white/10 px-3 py-2">35-80%</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Harmonic Mitigation Options</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">THDi Achieved</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cost</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standard 6-pulse</td>
                      <td className="border border-white/10 px-3 py-2">35-80%</td>
                      <td className="border border-white/10 px-3 py-2">Base</td>
                      <td className="border border-white/10 px-3 py-2">Small drives, weak networks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line reactor (3%)</td>
                      <td className="border border-white/10 px-3 py-2">35-45%</td>
                      <td className="border border-white/10 px-3 py-2">Low</td>
                      <td className="border border-white/10 px-3 py-2">Moderate improvement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DC choke</td>
                      <td className="border border-white/10 px-3 py-2">30-40%</td>
                      <td className="border border-white/10 px-3 py-2">Low</td>
                      <td className="border border-white/10 px-3 py-2">Built into many drives</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">12-pulse</td>
                      <td className="border border-white/10 px-3 py-2">10-15%</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">Large drives &gt;100kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">18-pulse</td>
                      <td className="border border-white/10 px-3 py-2">5-8%</td>
                      <td className="border border-white/10 px-3 py-2">Very high</td>
                      <td className="border border-white/10 px-3 py-2">Critical applications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Active front end (AFE)</td>
                      <td className="border border-white/10 px-3 py-2">3-5%</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">Best harmonic performance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Passive filter</td>
                      <td className="border border-white/10 px-3 py-2">8-15%</td>
                      <td className="border border-white/10 px-3 py-2">Medium</td>
                      <td className="border border-white/10 px-3 py-2">Central installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Active filter</td>
                      <td className="border border-white/10 px-3 py-2">&lt;5%</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">Central, adaptive</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Selection Guidance</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Small drives (&lt;30kW):</strong> Standard with DC choke usually acceptable</li>
                <li className="pl-1"><strong>Medium drives (30-100kW):</strong> Line reactor or passive filter</li>
                <li className="pl-1"><strong>Large drives (&gt;100kW):</strong> 12-pulse, 18-pulse, or AFE</li>
                <li className="pl-1"><strong>Multiple drives:</strong> Central active filter often most economical</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> Always check G5/4-1 compliance for total VSD installation, not individual drives.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: THD Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A VSD draws 100A fundamental with 30A 5th and 20A 7th harmonic. Calculate THDi.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>THDi = √(I₅² + I₇²) / I₁ × 100%</p>
                <p>THDi = √(30² + 20²) / 100 × 100%</p>
                <p>THDi = √(900 + 400) / 100 × 100%</p>
                <p>THDi = √1300 / 100 × 100%</p>
                <p>THDi = 36.1 / 100 × 100% = <strong>36.1%</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Neutral Current</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Three phases each carry 50A with 40% third harmonic. Calculate neutral current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Third harmonic per phase = 50A × 0.4 = 20A</p>
                <p>Third harmonics add in neutral (zero sequence):</p>
                <p>Neutral 3rd harmonic = 3 × 20A = 60A</p>
                <p className="mt-2">Fundamental currents cancel (balanced load):</p>
                <p>Neutral fundamental ≈ 0A</p>
                <p className="mt-2">Total neutral current ≈ <strong>60A</strong></p>
                <p className="text-orange-400">Neutral current exceeds phase current (50A)!</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Filter Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Total VSD load is 200kW at 0.95 pf. THDi is 40%. Size an active filter to achieve &lt;8% THDi.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Fundamental current: I₁ = 200kW / (√3 × 400V × 0.95) = 304A</p>
                <p>Total harmonic current: Ih = 304A × 0.40 = 122A</p>
                <p className="mt-2">Target harmonic current for 8% THDi:</p>
                <p>Ih_target = 304A × 0.08 = 24A</p>
                <p className="mt-2">Filter capacity needed:</p>
                <p>Filter = 122A - 24A = 98A harmonic current</p>
                <p className="mt-2">Filter kVA ≈ √3 × 400 × 98 = <strong>68 kVA active filter</strong></p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Harmonic Assessment Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify all non-linear loads (VSDs, UPS, IT, LED)</li>
                <li className="pl-1">Calculate total harmonic-producing load as % of supply</li>
                <li className="pl-1">Assess against G5/4-1 Stage 1 criteria</li>
                <li className="pl-1">Check neutral conductor sizing for triplen harmonics</li>
                <li className="pl-1">Consider cable derating if THD &gt;10%</li>
                <li className="pl-1">Specify mitigation if limits exceeded</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">G5/4-1 voltage THD limit (LV): <strong>5%</strong></li>
                <li className="pl-1">6-pulse VSD typical THDi: <strong>35-80%</strong></li>
                <li className="pl-1">Neutral sizing trigger: <strong>&gt;15% 3rd harmonic</strong></li>
                <li className="pl-1">Stage 1 simplified limit: <strong>&lt;25% of supply</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ignoring cumulative effect</strong> — Many small loads add up</li>
                <li className="pl-1"><strong>Undersized neutrals</strong> — Can overheat with triplen harmonics</li>
                <li className="pl-1"><strong>PFC capacitors without detuning</strong> — Can amplify harmonics</li>
                <li className="pl-1"><strong>Late assessment</strong> — Retrofitting filters is expensive</li>
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
                <p className="font-medium text-white mb-1">Harmonic Basics</p>
                <ul className="space-y-0.5">
                  <li>THD = √(ΣIh²)/I₁ × 100%</li>
                  <li>Triplen (3,9,15): Add in neutral</li>
                  <li>6-pulse VSD: 5,7,11,13 harmonics</li>
                  <li>G5/4-1 THD limit: 5% (LV)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Mitigation</p>
                <ul className="space-y-0.5">
                  <li>Line reactor: Moderate reduction</li>
                  <li>12-pulse: 10-15% THDi</li>
                  <li>AFE drive: 3-5% THDi</li>
                  <li>Active filter: Adaptive, &lt;5%</li>
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
            <Link to="../h-n-c-module4-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Power Factor
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section1-5">
              Next: Future Load Allowances
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section1_4;
