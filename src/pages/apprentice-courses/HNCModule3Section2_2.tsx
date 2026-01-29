import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Reactance and Impedance in AC Circuits - HNC Module 3 Section 2.2";
const DESCRIPTION = "Master inductive and capacitive reactance calculations, complex impedance analysis, and practical applications in building services including motor circuits, transformer equivalent circuits, and cable impedance.";

const quickCheckQuestions = [
  {
    id: "inductive-reactance",
    question: "What is the inductive reactance of a 50mH inductor at 50Hz?",
    options: ["7.85\u03a9", "15.7\u03a9", "31.4\u03a9", "157\u03a9"],
    correctIndex: 1,
    explanation: "X\u2097 = 2\u03c0fL = 2\u03c0 \u00d7 50 \u00d7 0.050 = 15.7\u03a9. Remember to convert mH to H (50mH = 0.050H) before calculating."
  },
  {
    id: "capacitive-reactance",
    question: "A 100\u00b5F capacitor has what reactance at 50Hz?",
    options: ["15.9\u03a9", "31.8\u03a9", "63.7\u03a9", "318\u03a9"],
    correctIndex: 1,
    explanation: "X\u1d04 = 1/(2\u03c0fC) = 1/(2\u03c0 \u00d7 50 \u00d7 0.0001) = 31.8\u03a9. Note X\u1d04 decreases as capacitance increases."
  },
  {
    id: "impedance-magnitude",
    question: "A circuit has R = 30\u03a9 and X\u2097 = 40\u03a9. What is the impedance magnitude?",
    options: ["10\u03a9", "35\u03a9", "50\u03a9", "70\u03a9"],
    correctIndex: 2,
    explanation: "|Z| = \u221a(R\u00b2 + X\u00b2) = \u221a(30\u00b2 + 40\u00b2) = \u221a(900 + 1600) = \u221a2500 = 50\u03a9. This is a classic 3-4-5 Pythagorean triangle."
  },
  {
    id: "phase-angle",
    question: "For R = 100\u03a9 and X\u2097 = 100\u03a9, what is the phase angle?",
    options: ["30\u00b0", "45\u00b0", "60\u00b0", "90\u00b0"],
    correctIndex: 1,
    explanation: "\u03b8 = arctan(X/R) = arctan(100/100) = arctan(1) = 45\u00b0. When X = R, the phase angle is always 45\u00b0."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is reactance?",
    options: [
      "The resistance of a DC circuit",
      "Opposition to AC current due to energy storage in electric or magnetic fields",
      "The total opposition to current in any circuit",
      "The power dissipated in a resistor"
    ],
    correctAnswer: 1,
    explanation: "Reactance is the opposition to AC current flow caused by inductors (magnetic field energy storage) and capacitors (electric field energy storage). Unlike resistance, reactance does not dissipate power."
  },
  {
    id: 2,
    question: "How does inductive reactance change with frequency?",
    options: [
      "Decreases as frequency increases",
      "Increases proportionally with frequency",
      "Remains constant regardless of frequency",
      "Increases with the square of frequency"
    ],
    correctAnswer: 1,
    explanation: "X\u2097 = 2\u03c0fL shows that inductive reactance is directly proportional to frequency. Doubling the frequency doubles the reactance. This is why inductors block high frequencies."
  },
  {
    id: 3,
    question: "A motor winding has L = 0.1H. What is its reactance at 50Hz?",
    options: ["15.7\u03a9", "31.4\u03a9", "50\u03a9", "314\u03a9"],
    correctAnswer: 1,
    explanation: "X\u2097 = 2\u03c0fL = 2\u03c0 \u00d7 50 \u00d7 0.1 = 31.4\u03a9"
  },
  {
    id: 4,
    question: "How does capacitive reactance change with frequency?",
    options: [
      "Increases proportionally with frequency",
      "Decreases as frequency increases",
      "Remains constant regardless of frequency",
      "Increases with the square of frequency"
    ],
    correctAnswer: 1,
    explanation: "X\u1d04 = 1/(2\u03c0fC) shows that capacitive reactance is inversely proportional to frequency. Higher frequencies encounter less opposition, which is why capacitors pass high frequencies."
  },
  {
    id: 5,
    question: "What is the unit of impedance?",
    options: ["Henrys", "Farads", "Ohms", "Siemens"],
    correctAnswer: 2,
    explanation: "Impedance, like resistance and reactance, is measured in Ohms (\u03a9). It represents the total opposition to AC current flow."
  },
  {
    id: 6,
    question: "In the complex impedance Z = R + jX, what does 'j' represent?",
    options: [
      "Current density",
      "The imaginary unit (\u221a-1), indicating 90\u00b0 phase shift",
      "Joule heating factor",
      "Junction temperature"
    ],
    correctAnswer: 1,
    explanation: "In electrical engineering, j represents \u221a-1 (called i in pure mathematics). It indicates that the reactive component is 90\u00b0 out of phase with the resistive component."
  },
  {
    id: 7,
    question: "A circuit has Z = 40 + j30 \u03a9. What is the impedance magnitude?",
    options: ["10\u03a9", "35\u03a9", "50\u03a9", "70\u03a9"],
    correctAnswer: 2,
    explanation: "|Z| = \u221a(R\u00b2 + X\u00b2) = \u221a(40\u00b2 + 30\u00b2) = \u221a(1600 + 900) = \u221a2500 = 50\u03a9"
  },
  {
    id: 8,
    question: "Two impedances of 10\u03a9 each are connected in series. What is the total impedance?",
    options: ["5\u03a9", "10\u03a9", "20\u03a9", "100\u03a9"],
    correctAnswer: 2,
    explanation: "In series, impedances add directly: Z\u209c = Z\u2081 + Z\u2082 = 10 + 10 = 20\u03a9. This is the same rule as for resistances in series."
  },
  {
    id: 9,
    question: "What is the phase angle of an impedance Z = 50 + j50\u221a3 \u03a9?",
    options: ["30\u00b0", "45\u00b0", "60\u00b0", "90\u00b0"],
    correctAnswer: 2,
    explanation: "\u03b8 = arctan(X/R) = arctan(50\u221a3/50) = arctan(\u221a3) = 60\u00b0"
  },
  {
    id: 10,
    question: "A power factor correction capacitor reduces motor circuit impedance magnitude. Why?",
    options: [
      "It increases the resistance",
      "The capacitive reactance partially cancels the inductive reactance",
      "It reduces the supply voltage",
      "It increases the motor speed"
    ],
    correctAnswer: 1,
    explanation: "Motors have inductive reactance (+jX\u2097). Adding capacitance (-jX\u1d04) reduces the net reactance. Since |Z| = \u221a(R\u00b2 + X\u2099\u2091\u209c\u00b2), reducing X\u2099\u2091\u209c reduces impedance magnitude."
  },
  {
    id: 11,
    question: "At what frequency does a 10mH inductor have X\u2097 = 100\u03a9?",
    options: ["159Hz", "318Hz", "500Hz", "1.59kHz"],
    correctAnswer: 3,
    explanation: "Rearranging X\u2097 = 2\u03c0fL: f = X\u2097/(2\u03c0L) = 100/(2\u03c0 \u00d7 0.01) = 100/0.0628 = 1592Hz \u2248 1.59kHz"
  },
  {
    id: 12,
    question: "Two 20\u03a9 impedances in parallel give what total impedance?",
    options: ["10\u03a9", "20\u03a9", "40\u03a9", "400\u03a9"],
    correctAnswer: 0,
    explanation: "For equal impedances in parallel: Z\u209c = Z/n = 20/2 = 10\u03a9. Alternatively: 1/Z\u209c = 1/20 + 1/20 = 2/20, so Z\u209c = 10\u03a9"
  }
];

const faqs = [
  {
    question: "What is the difference between reactance and impedance?",
    answer: "Reactance (X) is the opposition to AC current caused only by inductors or capacitors - it involves energy storage, not dissipation. Impedance (Z) is the total opposition to AC current, combining both resistance (R) and reactance (X). Impedance is expressed as Z = R + jX in complex form, or |Z| = \u221a(R\u00b2 + X\u00b2) as a magnitude."
  },
  {
    question: "Why do we use 'j' instead of 'i' for the imaginary unit in electrical engineering?",
    answer: "Electrical engineers use 'j' because 'i' is already the standard symbol for current. Using j = \u221a-1 avoids confusion in circuit equations. The j operator indicates a 90\u00b0 phase shift: +j for inductive reactance (current lags voltage) and -j for capacitive reactance (current leads voltage)."
  },
  {
    question: "How does cable impedance affect building electrical systems?",
    answer: "Cable impedance (Z = R + jX) affects voltage drop, fault current levels, and system losses. The reactive component (mainly inductive for larger cables) becomes significant for long cable runs. BS 7671 provides cable impedance values (mV/A/m and m\u03a9/m) for voltage drop and fault loop calculations. Higher frequencies increase cable impedance due to skin effect."
  },
  {
    question: "Why is motor impedance important for building services?",
    answer: "Motor impedance determines starting current (typically 6-8 times running current), running current, power factor, and system voltage drop. During starting, motor impedance is low (near locked-rotor value), causing high inrush current. Understanding motor impedance is essential for sizing cables, protection devices, and power factor correction equipment."
  },
  {
    question: "How do transformers affect impedance in building electrical systems?",
    answer: "Transformer impedance (typically 4-6% for distribution transformers) limits fault current and causes voltage drop under load. The impedance is expressed as a percentage of rated voltage: a 5% impedance transformer drops 5% of rated voltage at full load. Lower impedance gives better voltage regulation but higher fault currents."
  },
  {
    question: "What happens to circuit impedance at resonance?",
    answer: "At resonance, inductive and capacitive reactances are equal and cancel out (X\u2097 = X\u1d04). In a series RLC circuit, this minimises impedance to just R, maximising current. In a parallel RLC circuit, impedance becomes maximum. Resonance is used in filters and can cause problems if harmonics excite resonant frequencies in building systems."
  }
];

const HNCModule3Section2_2 = () => {
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
            <span>Module 3.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Reactance and Impedance in AC Circuits
          </h1>
          <p className="text-white/80">
            Understanding opposition to AC current flow in reactive circuits and building services applications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Inductive reactance:</strong> X<sub>L</sub> = 2&pi;fL (increases with frequency)</li>
              <li className="pl-1"><strong>Capacitive reactance:</strong> X<sub>C</sub> = 1/(2&pi;fC) (decreases with frequency)</li>
              <li className="pl-1"><strong>Impedance:</strong> Z = R + jX (complex number)</li>
              <li className="pl-1"><strong>Magnitude:</strong> |Z| = &radic;(R&sup2; + X&sup2;)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Motor circuits:</strong> Inductive loads, starting current</li>
              <li className="pl-1"><strong>Power factor correction:</strong> Capacitor sizing</li>
              <li className="pl-1"><strong>Cable impedance:</strong> Voltage drop, fault calculations</li>
              <li className="pl-1"><strong>Transformers:</strong> Equivalent circuit impedance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate inductive reactance using X\u2097 = 2\u03c0fL",
              "Calculate capacitive reactance using X\u1d04 = 1/(2\u03c0fC)",
              "Understand how frequency affects reactance values",
              "Express impedance in complex form Z = R + jX",
              "Calculate impedance magnitude and phase angle",
              "Apply series and parallel impedance combinations",
              "Analyse motor and transformer equivalent circuits"
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

        {/* Section 1: Inductive Reactance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Inductive Reactance (X<sub>L</sub>)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Inductive reactance is the opposition to AC current flow caused by an inductor. When AC current flows
              through an inductor, the changing magnetic field induces a back-EMF that opposes the change in current.
              This opposition increases with both frequency and inductance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inductive Reactance Formula</p>
              <p className="font-mono text-center text-lg mb-2">X<sub>L</sub> = 2&pi;fL = &omega;L</p>
              <p className="text-xs text-white/70 text-center">Where: f = frequency (Hz), L = inductance (H), &omega; = 2&pi;f (rad/s)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key characteristics:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">X<sub>L</sub> is measured in Ohms (&Omega;)</li>
                <li className="pl-1">Directly proportional to frequency - doubles if frequency doubles</li>
                <li className="pl-1">Directly proportional to inductance</li>
                <li className="pl-1">Current lags voltage by 90&deg; in a pure inductor</li>
                <li className="pl-1">No power is dissipated (energy stored and returned)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Inductance Values in Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical L</th>
                      <th className="border border-white/10 px-3 py-2 text-left">X<sub>L</sub> at 50Hz</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small single-phase motor</td>
                      <td className="border border-white/10 px-3 py-2">50-100mH</td>
                      <td className="border border-white/10 px-3 py-2">15.7-31.4&Omega;</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Three-phase motor (per phase)</td>
                      <td className="border border-white/10 px-3 py-2">10-50mH</td>
                      <td className="border border-white/10 px-3 py-2">3.14-15.7&Omega;</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fluorescent ballast</td>
                      <td className="border border-white/10 px-3 py-2">0.5-2H</td>
                      <td className="border border-white/10 px-3 py-2">157-628&Omega;</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Choke/reactor</td>
                      <td className="border border-white/10 px-3 py-2">1-10mH</td>
                      <td className="border border-white/10 px-3 py-2">0.31-3.14&Omega;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Building services note:</strong> Motor windings are primarily inductive. At 50Hz, a typical
              motor winding inductance of 50mH gives X<sub>L</sub> = 15.7&Omega;, but this varies with motor loading.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Capacitive Reactance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Capacitive Reactance (X<sub>C</sub>)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Capacitive reactance is the opposition to AC current flow caused by a capacitor. Capacitors store
              energy in an electric field between their plates. The opposition decreases as frequency increases
              because higher frequencies allow less time for charge to accumulate.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Capacitive Reactance Formula</p>
              <p className="font-mono text-center text-lg mb-2">X<sub>C</sub> = 1/(2&pi;fC) = 1/(&omega;C)</p>
              <p className="text-xs text-white/70 text-center">Where: f = frequency (Hz), C = capacitance (F), &omega; = 2&pi;f (rad/s)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key characteristics:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">X<sub>C</sub> is measured in Ohms (&Omega;)</li>
                <li className="pl-1">Inversely proportional to frequency - halves if frequency doubles</li>
                <li className="pl-1">Inversely proportional to capacitance</li>
                <li className="pl-1">Current leads voltage by 90&deg; in a pure capacitor</li>
                <li className="pl-1">No power is dissipated (energy stored and returned)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Factor Correction Capacitors</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Capacitor Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Capacitance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">X<sub>C</sub> at 50Hz</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5 kVAr (230V)</td>
                      <td className="border border-white/10 px-3 py-2">95&mu;F</td>
                      <td className="border border-white/10 px-3 py-2">33.5&Omega;</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10 kVAr (400V)</td>
                      <td className="border border-white/10 px-3 py-2">50&mu;F</td>
                      <td className="border border-white/10 px-3 py-2">63.7&Omega;</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25 kVAr (400V)</td>
                      <td className="border border-white/10 px-3 py-2">125&mu;F</td>
                      <td className="border border-white/10 px-3 py-2">25.5&Omega;</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50 kVAr (400V)</td>
                      <td className="border border-white/10 px-3 py-2">250&mu;F</td>
                      <td className="border border-white/10 px-3 py-2">12.7&Omega;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Frequency Dependence Comparison</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Inductive (X<sub>L</sub>)</p>
                  <ul className="text-white/70 space-y-0.5">
                    <li>50Hz: X<sub>L</sub> = 31.4&Omega;</li>
                    <li>100Hz: X<sub>L</sub> = 62.8&Omega;</li>
                    <li>150Hz: X<sub>L</sub> = 94.2&Omega;</li>
                  </ul>
                  <p className="text-xs mt-1 text-white/50">(L = 100mH)</p>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Capacitive (X<sub>C</sub>)</p>
                  <ul className="text-white/70 space-y-0.5">
                    <li>50Hz: X<sub>C</sub> = 31.8&Omega;</li>
                    <li>100Hz: X<sub>C</sub> = 15.9&Omega;</li>
                    <li>150Hz: X<sub>C</sub> = 10.6&Omega;</li>
                  </ul>
                  <p className="text-xs mt-1 text-white/50">(C = 100&mu;F)</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Harmonic consideration:</strong> Capacitive reactance decreases at harmonic frequencies,
              which can cause capacitors to absorb excessive harmonic currents, leading to overheating.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Complex Impedance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Complex Impedance (Z = R + jX)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Impedance combines resistance and reactance into a single quantity that describes the total opposition
              to AC current. Because resistance and reactance are 90&deg; out of phase, they must be combined using
              complex numbers or the Pythagorean theorem.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Complex Impedance Form</p>
              <p className="font-mono text-center text-lg mb-2">Z = R + jX</p>
              <p className="text-xs text-white/70 text-center mb-3">Where: R = resistance, X = net reactance (X<sub>L</sub> - X<sub>C</sub>), j = &radic;-1</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-center">
                <div className="p-2 rounded bg-black/20">
                  <p className="text-white/90">Inductive: Z = R + jX<sub>L</sub></p>
                  <p className="text-xs text-white/50">Current lags voltage</p>
                </div>
                <div className="p-2 rounded bg-black/20">
                  <p className="text-white/90">Capacitive: Z = R - jX<sub>C</sub></p>
                  <p className="text-xs text-white/50">Current leads voltage</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Impedance Magnitude and Phase Angle</p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Magnitude</p>
                  <p className="font-mono">|Z| = &radic;(R&sup2; + X&sup2;)</p>
                  <p className="text-white/70 text-xs mt-1">Total opposition in Ohms</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Phase Angle</p>
                  <p className="font-mono">&theta; = arctan(X/R)</p>
                  <p className="text-white/70 text-xs mt-1">Angle between V and I</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Understanding the j operator:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>j = &radic;-1</strong> represents a 90&deg; phase shift</li>
                <li className="pl-1"><strong>+jX</strong> means reactance leads resistance (inductive)</li>
                <li className="pl-1"><strong>-jX</strong> means reactance lags resistance (capacitive)</li>
                <li className="pl-1">Electrical engineers use j (not i) because i represents current</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Impedance Triangle</p>
              <div className="p-4 rounded bg-black/30 text-center">
                <pre className="text-sm text-white/90 font-mono">
{`              |Z|
           /|
          / |
         /  | X (reactance)
        /   |
       /____|
         R (resistance)

|Z| = √(R² + X²)
θ = arctan(X/R)`}
                </pre>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Power factor link:</strong> cos(&theta;) = R/|Z| = power factor. A phase angle of 0&deg;
              means purely resistive (pf = 1), while 90&deg; means purely reactive (pf = 0).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Series and Parallel Impedance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Series and Parallel Impedance Combinations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Impedances combine using the same rules as resistances, but with complex arithmetic. This is essential
              for analysing practical circuits with multiple components, including motor equivalent circuits and
              transformer models.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Series Impedance</p>
              <p className="font-mono text-center text-lg mb-2">Z<sub>T</sub> = Z<sub>1</sub> + Z<sub>2</sub> + Z<sub>3</sub> + ...</p>
              <p className="text-xs text-white/70 text-center">Add complex impedances directly: (R<sub>1</sub> + jX<sub>1</sub>) + (R<sub>2</sub> + jX<sub>2</sub>) = (R<sub>1</sub> + R<sub>2</sub>) + j(X<sub>1</sub> + X<sub>2</sub>)</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Parallel Impedance</p>
              <p className="font-mono text-center text-lg mb-2">1/Z<sub>T</sub> = 1/Z<sub>1</sub> + 1/Z<sub>2</sub> + 1/Z<sub>3</sub> + ...</p>
              <p className="text-xs text-white/70 text-center">For two impedances: Z<sub>T</sub> = (Z<sub>1</sub> &times; Z<sub>2</sub>)/(Z<sub>1</sub> + Z<sub>2</sub>)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Configuration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Impedance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor circuit (cable + motor)</td>
                      <td className="border border-white/10 px-3 py-2">Series</td>
                      <td className="border border-white/10 px-3 py-2">Z<sub>cable</sub> + Z<sub>motor</sub></td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PFC capacitor with motor</td>
                      <td className="border border-white/10 px-3 py-2">Parallel</td>
                      <td className="border border-white/10 px-3 py-2">Reduces net reactive component</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Parallel loads on busbar</td>
                      <td className="border border-white/10 px-3 py-2">Parallel</td>
                      <td className="border border-white/10 px-3 py-2">Combined load impedance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fault loop (source + cable)</td>
                      <td className="border border-white/10 px-3 py-2">Series</td>
                      <td className="border border-white/10 px-3 py-2">Z<sub>s</sub> = Z<sub>e</sub> + Z<sub>cable</sub></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Impedance (BS 7671)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Cable Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">R (m&Omega;/m)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">X (m&Omega;/m)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">|Z| (m&Omega;/m)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2.5mm&sup2;</td>
                      <td className="border border-white/10 px-3 py-2">7.41</td>
                      <td className="border border-white/10 px-3 py-2">0.1</td>
                      <td className="border border-white/10 px-3 py-2">7.41</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25mm&sup2;</td>
                      <td className="border border-white/10 px-3 py-2">0.727</td>
                      <td className="border border-white/10 px-3 py-2">0.08</td>
                      <td className="border border-white/10 px-3 py-2">0.73</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">95mm&sup2;</td>
                      <td className="border border-white/10 px-3 py-2">0.193</td>
                      <td className="border border-white/10 px-3 py-2">0.075</td>
                      <td className="border border-white/10 px-3 py-2">0.21</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">300mm&sup2;</td>
                      <td className="border border-white/10 px-3 py-2">0.0601</td>
                      <td className="border border-white/10 px-3 py-2">0.07</td>
                      <td className="border border-white/10 px-3 py-2">0.09</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/50 mt-2">Note: For larger cables, reactance becomes more significant relative to resistance.</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design note:</strong> For small cables (&lt;25mm&sup2;), reactance is negligible and Z &asymp; R.
              For larger cables, especially long runs, include reactance in voltage drop calculations.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Motor Circuit Impedance</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A single-phase motor has winding resistance R = 8&Omega; and inductance L = 50mH.
                Calculate the impedance at 50Hz and the current drawn from 230V supply.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Calculate inductive reactance</p>
                <p>X<sub>L</sub> = 2&pi;fL = 2&pi; &times; 50 &times; 0.050 = <strong>15.7&Omega;</strong></p>
                <p className="mt-2">Step 2: Calculate impedance magnitude</p>
                <p>|Z| = &radic;(R&sup2; + X<sub>L</sub>&sup2;) = &radic;(8&sup2; + 15.7&sup2;)</p>
                <p>|Z| = &radic;(64 + 246.5) = &radic;310.5 = <strong>17.6&Omega;</strong></p>
                <p className="mt-2">Step 3: Calculate current</p>
                <p>I = V/|Z| = 230/17.6 = <strong>13.1A</strong></p>
                <p className="mt-2">Step 4: Calculate phase angle</p>
                <p>&theta; = arctan(X/R) = arctan(15.7/8) = <strong>63&deg;</strong> lagging</p>
                <p className="mt-2 text-white/60">&rarr; Power factor = cos(63&deg;) = 0.45</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Power Factor Correction</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A motor draws 20A at 0.7 power factor lagging from 230V supply.
                Calculate the capacitor reactance needed to improve power factor to 0.95.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Calculate motor impedance</p>
                <p>|Z| = V/I = 230/20 = 11.5&Omega;</p>
                <p>&theta;<sub>1</sub> = arccos(0.7) = 45.6&deg;</p>
                <p className="mt-2">Step 2: Find R and X<sub>L</sub></p>
                <p>R = |Z| &times; cos(&theta;) = 11.5 &times; 0.7 = 8.05&Omega;</p>
                <p>X<sub>L</sub> = |Z| &times; sin(&theta;) = 11.5 &times; 0.714 = 8.21&Omega;</p>
                <p className="mt-2">Step 3: Calculate new target reactance</p>
                <p>&theta;<sub>2</sub> = arccos(0.95) = 18.2&deg;</p>
                <p>X<sub>new</sub> = R &times; tan(&theta;<sub>2</sub>) = 8.05 &times; 0.329 = 2.65&Omega;</p>
                <p className="mt-2">Step 4: Calculate required X<sub>C</sub></p>
                <p>X<sub>C</sub> = X<sub>L</sub> - X<sub>new</sub> = 8.21 - 2.65 = <strong>5.56&Omega;</strong></p>
                <p className="mt-2">Step 5: Calculate capacitance</p>
                <p>C = 1/(2&pi;fX<sub>C</sub>) = 1/(2&pi; &times; 50 &times; 5.56) = <strong>573&mu;F</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Transformer Equivalent Circuit</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 100kVA transformer has 4% impedance with X/R ratio of 10.
                Calculate the equivalent resistance and reactance referred to the 400V secondary.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Calculate base impedance</p>
                <p>Z<sub>base</sub> = V&sup2;/S = 400&sup2;/100000 = 1.6&Omega;</p>
                <p className="mt-2">Step 2: Calculate transformer impedance</p>
                <p>Z<sub>T</sub> = 4% &times; Z<sub>base</sub> = 0.04 &times; 1.6 = <strong>0.064&Omega;</strong></p>
                <p className="mt-2">Step 3: Calculate R and X from X/R ratio</p>
                <p>Given X/R = 10, and |Z| = &radic;(R&sup2; + X&sup2;)</p>
                <p>|Z|&sup2; = R&sup2; + (10R)&sup2; = 101R&sup2;</p>
                <p>R = |Z|/&radic;101 = 0.064/10.05 = <strong>0.0064&Omega; (6.4m&Omega;)</strong></p>
                <p>X = 10R = <strong>0.064&Omega; (64m&Omega;)</strong></p>
                <p className="mt-2 text-white/60">&rarr; Z = 0.0064 + j0.064 &Omega;</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Fault Loop Impedance</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A circuit has external earth fault loop impedance Z<sub>e</sub> = 0.35&Omega;
                and uses 30m of 4mm&sup2; cable (R = 4.61m&Omega;/m, X = 0.1m&Omega;/m). Calculate total Z<sub>s</sub>.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Calculate cable impedance (line + CPC)</p>
                <p>R<sub>cable</sub> = 30m &times; 2 &times; 4.61m&Omega;/m = 0.277&Omega;</p>
                <p>X<sub>cable</sub> = 30m &times; 2 &times; 0.1m&Omega;/m = 0.006&Omega;</p>
                <p className="mt-2">Step 2: Assuming Z<sub>e</sub> is resistive (worst case)</p>
                <p>R<sub>total</sub> = 0.35 + 0.277 = 0.627&Omega;</p>
                <p>X<sub>total</sub> = 0.006&Omega;</p>
                <p className="mt-2">Step 3: Calculate total impedance</p>
                <p>|Z<sub>s</sub>| = &radic;(0.627&sup2; + 0.006&sup2;) = <strong>0.627&Omega;</strong></p>
                <p className="mt-2 text-white/60">&rarr; For 4mm&sup2; cable, X is negligible</p>
                <p className="mt-2">Step 4: Calculate prospective fault current</p>
                <p>I<sub>pf</sub> = U<sub>0</sub>/Z<sub>s</sub> = 230/0.627 = <strong>367A</strong></p>
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
                <li className="pl-1"><strong>X<sub>L</sub> = 2&pi;fL</strong> &mdash; Inductive reactance</li>
                <li className="pl-1"><strong>X<sub>C</sub> = 1/(2&pi;fC)</strong> &mdash; Capacitive reactance</li>
                <li className="pl-1"><strong>Z = R + jX</strong> &mdash; Complex impedance</li>
                <li className="pl-1"><strong>|Z| = &radic;(R&sup2; + X&sup2;)</strong> &mdash; Impedance magnitude</li>
                <li className="pl-1"><strong>&theta; = arctan(X/R)</strong> &mdash; Phase angle</li>
                <li className="pl-1"><strong>cos &theta; = R/|Z|</strong> &mdash; Power factor</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">2&pi; &times; 50Hz = <strong>314.16 rad/s</strong></li>
                <li className="pl-1">At 50Hz: X<sub>L</sub> = 314L (L in henrys)</li>
                <li className="pl-1">At 50Hz: X<sub>C</sub> = 3183/C (C in &mu;F gives X in &Omega;)</li>
                <li className="pl-1">Cables &lt;25mm&sup2;: X &asymp; 0, use R only</li>
                <li className="pl-1">Cables &gt;95mm&sup2;: Include X in calculations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Applications</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Motor starting:</strong> Low speed = low back-EMF = low impedance = high current</li>
                <li className="pl-1"><strong>PFC capacitors:</strong> Size to cancel motor inductive reactance</li>
                <li className="pl-1"><strong>Transformer sizing:</strong> % impedance determines fault current and Vdrop</li>
                <li className="pl-1"><strong>Harmonic filters:</strong> Tuned LC circuits at specific frequencies</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Adding R and X directly</strong> &mdash; Must use Pythagorean theorem</li>
                <li className="pl-1"><strong>Wrong units</strong> &mdash; mH to H, &mu;F to F before calculating</li>
                <li className="pl-1"><strong>Forgetting frequency</strong> &mdash; Reactance depends on frequency</li>
                <li className="pl-1"><strong>Sign errors</strong> &mdash; X<sub>L</sub> is +j, X<sub>C</sub> is -j</li>
                <li className="pl-1"><strong>Ignoring cable X</strong> &mdash; Important for large cables</li>
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
                <p className="font-medium text-white mb-1">Reactance Formulas</p>
                <ul className="space-y-0.5">
                  <li>Inductive: X<sub>L</sub> = 2&pi;fL = &omega;L</li>
                  <li>Capacitive: X<sub>C</sub> = 1/(2&pi;fC) = 1/&omega;C</li>
                  <li>X<sub>L</sub> increases with f, X<sub>C</sub> decreases</li>
                  <li>At resonance: X<sub>L</sub> = X<sub>C</sub></li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Impedance Calculations</p>
                <ul className="space-y-0.5">
                  <li>Complex: Z = R + jX</li>
                  <li>Magnitude: |Z| = &radic;(R&sup2; + X&sup2;)</li>
                  <li>Phase: &theta; = arctan(X/R)</li>
                  <li>Power factor: pf = cos&theta; = R/|Z|</li>
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
            <Link to="../h-n-c-module3-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Inductance & Capacitance
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section2-3">
              Next: Phase Angle & Phasors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section2_2;
