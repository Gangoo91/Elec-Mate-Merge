/**
 * Level 3 Module 3 Section 4.4 - Impedance and Admittance
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Impedance and Admittance - Level 3 Module 3 Section 4.4";
const DESCRIPTION = "Master complex impedance calculations, understand reactance in AC circuits, and learn admittance concepts for parallel circuit analysis.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the formula for inductive reactance?",
    options: [
      "XL = L / (2 pi f)",
      "XL = 2 pi f L",
      "XL = f / (2 pi L)",
      "XL = 2 pi / (f L)"
    ],
    correctIndex: 1,
    explanation: "Inductive reactance XL = 2 pi f L, where f is frequency in Hz and L is inductance in Henrys. Reactance increases with frequency because the inductor opposes changes in current, and faster changes (higher frequency) are opposed more strongly."
  },
  {
    id: "check-2",
    question: "In an RL series circuit, impedance Z is calculated as:",
    options: [
      "Z = R + XL",
      "Z = R - XL",
      "Z = sqrt(R squared + XL squared)",
      "Z = R x XL"
    ],
    correctIndex: 2,
    explanation: "Impedance is calculated using Pythagoras: Z = sqrt(R squared + XL squared) because resistance and reactance are at 90 degrees to each other on an impedance diagram. They cannot simply be added arithmetically."
  },
  {
    id: "check-3",
    question: "What happens to capacitive reactance as frequency increases?",
    options: [
      "It increases proportionally",
      "It decreases inversely",
      "It remains constant",
      "It doubles"
    ],
    correctIndex: 1,
    explanation: "Capacitive reactance XC = 1 / (2 pi f C) decreases as frequency increases. At higher frequencies, the capacitor charges and discharges more rapidly, offering less opposition to current flow."
  },
  {
    id: "check-4",
    question: "Admittance is the reciprocal of:",
    options: [
      "Resistance",
      "Reactance",
      "Impedance",
      "Conductance"
    ],
    correctIndex: 2,
    explanation: "Admittance Y = 1/Z (measured in Siemens). Just as conductance is the reciprocal of resistance, admittance is the reciprocal of impedance. Admittance is particularly useful for analysing parallel AC circuits."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Calculate the impedance of a circuit with R = 30 ohms and XL = 40 ohms in series.",
    options: [
      "70 ohms",
      "50 ohms",
      "10 ohms",
      "35 ohms"
    ],
    correctAnswer: 1,
    explanation: "Z = sqrt(R squared + XL squared) = sqrt(30 squared + 40 squared) = sqrt(900 + 1600) = sqrt(2500) = 50 ohms. This is a classic 3-4-5 triangle scaled by 10."
  },
  {
    id: 2,
    question: "A 100 microfarad capacitor is connected to a 50 Hz supply. What is its reactance?",
    options: [
      "3.18 ohms",
      "31.8 ohms",
      "318 ohms",
      "0.318 ohms"
    ],
    correctAnswer: 1,
    explanation: "XC = 1 / (2 pi f C) = 1 / (2 x 3.14159 x 50 x 0.0001) = 1 / 0.0314 = 31.8 ohms. Remember to convert microfarads to farads (divide by 1,000,000)."
  },
  {
    id: 3,
    question: "What is the phase angle for a circuit with R = 100 ohms and XC = 100 ohms?",
    options: [
      "0 degrees",
      "45 degrees leading",
      "45 degrees lagging",
      "90 degrees"
    ],
    correctAnswer: 1,
    explanation: "Phase angle = arctan(XC/R) = arctan(100/100) = arctan(1) = 45 degrees. Since this is capacitive, current leads voltage by 45 degrees."
  },
  {
    id: 4,
    question: "In an RLC series circuit, the total reactance is:",
    options: [
      "XL + XC",
      "XL - XC (taking the larger value as positive)",
      "XL x XC",
      "sqrt(XL squared + XC squared)"
    ],
    correctAnswer: 1,
    explanation: "Net reactance X = XL - XC (or XC - XL). Inductive and capacitive reactances are 180 degrees out of phase and partially cancel. If XL &gt; XC, the circuit is net inductive; if XC &gt; XL, it is net capacitive."
  },
  {
    id: 5,
    question: "At resonance in an RLC series circuit:",
    options: [
      "Impedance is maximum",
      "XL = XC and impedance equals R",
      "Current is minimum",
      "Power factor is zero"
    ],
    correctAnswer: 1,
    explanation: "At resonance, XL = XC, so they cancel completely. Total impedance Z = R only, giving minimum impedance and maximum current. Power factor = 1 (purely resistive). This is the principle behind tuned circuits."
  },
  {
    id: 6,
    question: "The unit of admittance is:",
    options: [
      "Ohms",
      "Henrys",
      "Farads",
      "Siemens"
    ],
    correctAnswer: 3,
    explanation: "Admittance is measured in Siemens (S), the reciprocal of ohms. 1 S = 1/ohm. The old unit name was 'mho' (ohm spelled backwards), which some still use. Conductance (G) and susceptance (B) are also measured in Siemens."
  },
  {
    id: 7,
    question: "An inductor of 0.1 H is connected to a 50 Hz supply. Calculate its reactance.",
    options: [
      "5 ohms",
      "15.7 ohms",
      "31.4 ohms",
      "50 ohms"
    ],
    correctAnswer: 2,
    explanation: "XL = 2 pi f L = 2 x 3.14159 x 50 x 0.1 = 31.4 ohms. At 50 Hz with 0.1 H, this is the reactance that opposes current flow due to the inductor's self-induced EMF."
  },
  {
    id: 8,
    question: "In complex notation, the impedance of a circuit with R = 4 ohms and XL = 3 ohms is:",
    options: [
      "4 + j3 ohms",
      "4 - j3 ohms",
      "3 + j4 ohms",
      "7 + j0 ohms"
    ],
    correctAnswer: 0,
    explanation: "Impedance Z = R + jXL = 4 + j3 ohms for an inductive circuit. Inductive reactance is positive (+jXL), capacitive reactance is negative (-jXC). The j indicates the 90-degree phase difference."
  },
  {
    id: 9,
    question: "What is susceptance?",
    options: [
      "The real part of admittance",
      "The imaginary part of admittance",
      "The reciprocal of resistance",
      "The same as reactance"
    ],
    correctAnswer: 1,
    explanation: "Susceptance (B) is the imaginary part of admittance (Y = G + jB). Just as reactance is the imaginary part of impedance, susceptance is the imaginary part of admittance. B = -X/Z squared for series circuits."
  },
  {
    id: 10,
    question: "Calculate the resonant frequency of a circuit with L = 10 mH and C = 100 microfarads.",
    options: [
      "159 Hz",
      "318 Hz",
      "500 Hz",
      "1 kHz"
    ],
    correctAnswer: 0,
    explanation: "f = 1 / (2 pi sqrt(LC)) = 1 / (2 x 3.14159 x sqrt(0.01 x 0.0001)) = 1 / (6.28 x 0.001) = 159 Hz. At this frequency, XL = XC and the circuit appears purely resistive."
  },
  {
    id: 11,
    question: "For a parallel RL circuit, which method is most convenient for analysis?",
    options: [
      "Adding impedances directly",
      "Using admittance (Y = 1/Z)",
      "Converting to an equivalent series circuit",
      "Using power equations"
    ],
    correctAnswer: 1,
    explanation: "Admittances add directly in parallel circuits, just as conductances add in DC parallel resistor circuits. This makes Y = Y1 + Y2 + ... much simpler than combining impedances using the product-over-sum rule."
  },
  {
    id: 12,
    question: "The magnitude of impedance is 100 ohms at a phase angle of 60 degrees. What is the resistance?",
    options: [
      "50 ohms",
      "86.6 ohms",
      "100 ohms",
      "57.7 ohms"
    ],
    correctAnswer: 0,
    explanation: "R = Z cos(theta) = 100 x cos(60) = 100 x 0.5 = 50 ohms. The resistance is the horizontal (real) component of impedance. The reactance would be X = Z sin(60) = 86.6 ohms."
  }
];

const faqs = [
  {
    question: "Why do we need impedance rather than just resistance?",
    answer: "In AC circuits, inductors and capacitors oppose current flow but do not dissipate power like resistors. This opposition (reactance) is frequency-dependent and involves a phase shift between voltage and current. Impedance combines resistance and reactance into a single quantity that fully describes how a circuit opposes AC current flow, including both magnitude and phase effects."
  },
  {
    question: "What is the practical significance of reactance being frequency-dependent?",
    answer: "Frequency-dependent reactance enables many practical applications: filters that pass some frequencies while blocking others, tuned circuits in radio receivers, power factor correction that works at specific frequencies, and protection circuits. It also explains why cables have different characteristics at different frequencies and why high-frequency effects must be considered in some installations."
  },
  {
    question: "How does impedance affect current in an AC circuit?",
    answer: "Ohm's law applies with impedance replacing resistance: I = V/Z. Current magnitude equals voltage divided by impedance magnitude. However, the current will be out of phase with voltage by the impedance phase angle. For purely resistive loads, phase shift is zero; for reactive loads, current either leads (capacitive) or lags (inductive) the voltage."
  },
  {
    question: "When should I use admittance instead of impedance?",
    answer: "Use admittance for parallel circuit analysis. Admittances add directly in parallel (Y_total = Y1 + Y2 + ...), making calculations much simpler than combining parallel impedances. Admittance is also useful in power system analysis and when working with transmission line models. The choice between Z and Y is purely practical - they describe the same circuit behaviour."
  },
  {
    question: "What happens at series resonance?",
    answer: "At the resonant frequency, XL = XC exactly, so they cancel. Total impedance equals R only, giving minimum impedance and maximum current for a given voltage. The circuit appears purely resistive with power factor = 1. At resonance, large voltages can develop across L and C individually (the Q-factor effect), even though the net reactive voltage is zero."
  },
  {
    question: "How is impedance measured in practice?",
    answer: "Impedance can be measured using an LCR meter (inductance-capacitance-resistance meter), which applies an AC test signal and measures the response. For installed circuits, impedance is often calculated from voltage and current measurements including phase angle. Earth fault loop impedance testers measure Zs by momentarily applying a load and measuring the resulting voltage drop."
  }
];

const Level3Module3Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module3-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Impedance and Admittance
          </h1>
          <p className="text-white/80">
            Complex impedance calculations and AC circuit analysis
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Impedance Z:</strong> Total opposition to AC (ohms)</li>
              <li><strong>Reactance:</strong> Opposition from L or C</li>
              <li><strong>Z = sqrt(R squared + X squared)</strong></li>
              <li><strong>Admittance Y = 1/Z</strong> (Siemens)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Formulas</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>XL = 2 pi f L</strong> (inductive)</li>
              <li><strong>XC = 1 / (2 pi f C)</strong> (capacitive)</li>
              <li><strong>Z = R + jX</strong> (complex form)</li>
              <li><strong>f res = 1 / (2 pi sqrt LC)</strong></li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate inductive and capacitive reactance",
              "Determine impedance magnitude and phase angle",
              "Apply Ohm's law to AC circuits using impedance",
              "Use complex notation for impedance calculations",
              "Understand and apply admittance concepts",
              "Calculate resonant frequency of LC circuits"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Reactance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Reactance: Inductive and Capacitive
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Reactance is the opposition to AC current flow caused by inductors and capacitors. Unlike resistance, reactance does not dissipate power - it stores energy and releases it back to the circuit. Reactance is measured in ohms but causes a 90-degree phase shift between voltage and current.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inductive Reactance (XL)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Formula:</strong> XL = 2 pi f L ohms</li>
                  <li>Increases with frequency</li>
                  <li>Current lags voltage by 90 deg</li>
                  <li>Energy stored in magnetic field</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Capacitive Reactance (XC)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Formula:</strong> XC = 1 / (2 pi f C) ohms</li>
                  <li>Decreases with frequency</li>
                  <li>Current leads voltage by 90 deg</li>
                  <li>Energy stored in electric field</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Inductors oppose changes in current (high reactance at high frequency). Capacitors oppose changes in voltage (low reactance at high frequency - they charge/discharge easily at high rates).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Impedance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Impedance: The Complete Picture
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Impedance (Z) is the total opposition to current flow in an AC circuit, combining resistance and reactance. Because resistance and reactance are 90 degrees out of phase, they combine using Pythagoras rather than simple addition. Impedance is a complex quantity with both magnitude and phase angle.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Impedance calculations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Magnitude:</strong> |Z| = sqrt(R squared + X squared) ohms</li>
                <li><strong>Phase angle:</strong> theta = arctan(X/R)</li>
                <li><strong>Complex form:</strong> Z = R + jX (inductive) or Z = R - jX (capacitive)</li>
                <li><strong>Ohm's law:</strong> V = I x Z, I = V/Z</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Worked Example:</strong> A circuit has R = 30 ohms and XL = 40 ohms.
              <br />
              |Z| = sqrt(30 squared + 40 squared) = sqrt(900 + 1600) = sqrt(2500) = 50 ohms
              <br />
              theta = arctan(40/30) = arctan(1.33) = 53.1 degrees lagging
              <br />
              Complex form: Z = 30 + j40 ohms
            </p>

            <p>
              The impedance triangle is the graphical representation: resistance on the horizontal axis, reactance on the vertical axis, and impedance as the hypotenuse. This mirrors the voltage triangle and power triangle for the same circuit.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: RLC Circuits and Resonance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            RLC Circuits and Resonance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When inductance and capacitance are both present in a circuit, their reactances partially cancel because they are 180 degrees out of phase. At the resonant frequency, they cancel completely, leaving only resistance to limit current flow.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Net Reactance</p>
                <p className="text-white/90 text-xs">X = XL - XC</p>
                <p className="text-white/90 text-xs">(taking positive as inductive)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">At Resonance</p>
                <p className="text-white/90 text-xs">XL = XC, X = 0</p>
                <p className="text-white/90 text-xs">Z = R (minimum)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Resonant Frequency</p>
                <p className="text-white/90 text-xs">f = 1/(2 pi sqrt LC)</p>
                <p className="text-white/90 text-xs">I = V/R (maximum)</p>
              </div>
            </div>

            <p>
              Series resonance is used in tuned circuits and filters. At resonance, even though individual voltages across L and C can be very large (multiplied by the Q-factor), the net reactive voltage is zero. This selectivity allows radio receivers to tune to specific frequencies.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> Power factor correction uses the principle that inductive and capacitive reactances cancel. Adding capacitors to an inductive load reduces the net reactance, bringing the power factor closer to unity.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Admittance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Admittance and Parallel Circuits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Admittance (Y) is the reciprocal of impedance, measured in Siemens (S). Just as conductance simplifies parallel resistor calculations in DC, admittance simplifies parallel AC circuit analysis. Admittances add directly in parallel: Y_total = Y1 + Y2 + Y3.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Components of admittance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Admittance:</strong> Y = 1/Z (Siemens)</li>
                <li><strong>Conductance:</strong> G = R/|Z| squared (real part)</li>
                <li><strong>Susceptance:</strong> B = -X/|Z| squared (imaginary part)</li>
                <li><strong>Complex form:</strong> Y = G + jB</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Two branches in parallel have Z1 = 10 ohms and Z2 = 20 ohms.
              <br />
              Y1 = 1/10 = 0.1 S, Y2 = 1/20 = 0.05 S
              <br />
              Y_total = 0.1 + 0.05 = 0.15 S
              <br />
              Z_total = 1/0.15 = 6.67 ohms
            </p>

            <p>
              Susceptance is the reactive component of admittance. Capacitive susceptance is positive (BC = omega C = 2 pi f C), inductive susceptance is negative (BL = -1/(omega L)). This is the opposite convention to reactance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Series vs Parallel Analysis</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Series circuits:</strong> Use impedance Z - add impedances directly</li>
                <li><strong>Parallel circuits:</strong> Use admittance Y - add admittances directly</li>
                <li>For mixed circuits, work from the simplest combinations outward</li>
                <li>Keep track of signs: +jXL, -jXC for impedance; +jBC, -jBL for admittance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Power Factor from Impedance</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Power factor = cos(theta) = R/|Z|</li>
                <li>If X is positive (inductive), current lags - lagging power factor</li>
                <li>If X is negative (capacitive), current leads - leading power factor</li>
                <li>Use this to calculate real power: P = V I cos(theta) = I squared R</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Calculation Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Adding R and X directly:</strong> Must use Pythagoras - they are at 90 degrees</li>
                <li><strong>Unit confusion:</strong> Convert mH to H, microF to F before calculating</li>
                <li><strong>Wrong sign for XC:</strong> Capacitive reactance has negative imaginary component</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Reactance Formulas</p>
                <ul className="space-y-0.5">
                  <li>XL = 2 pi f L ohms</li>
                  <li>XC = 1/(2 pi f C) ohms</li>
                  <li>X_net = XL - XC</li>
                  <li>f_res = 1/(2 pi sqrt LC)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Impedance/Admittance</p>
                <ul className="space-y-0.5">
                  <li>|Z| = sqrt(R sq + X sq)</li>
                  <li>theta = arctan(X/R)</li>
                  <li>Y = 1/Z Siemens</li>
                  <li>Y = G + jB</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module3-section4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Phasor Diagrams and Vectors
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module3-section4-5">
              Next: Power in AC Circuits
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module3Section4_4;
