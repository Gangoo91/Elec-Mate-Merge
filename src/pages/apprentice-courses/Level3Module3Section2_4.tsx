/**
 * Level 3 Module 3 Section 2.4 - RL, RC and RLC Combinations
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "RL, RC and RLC Combinations - Level 3 Module 3 Section 2.4";
const DESCRIPTION = "Master impedance calculations for series and parallel RL, RC and RLC circuits, including phasor diagrams and practical applications in electrical installations.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "In a series RL circuit, how is the total impedance calculated?",
    options: [
      "Z = R + XL",
      "Z = R x XL",
      "Z = square root of (R squared + XL squared)",
      "Z = R - XL"
    ],
    correctIndex: 2,
    explanation: "In a series RL circuit, resistance and inductive reactance are at 90 degrees to each other in the phasor diagram. They combine using Pythagoras: Z = square root of (R squared + XL squared). This is the vector sum, not the arithmetic sum."
  },
  {
    id: "check-2",
    question: "A series RC circuit has R = 30 ohms and XC = 40 ohms. What is the impedance?",
    options: [
      "70 ohms",
      "50 ohms",
      "10 ohms",
      "35 ohms"
    ],
    correctIndex: 1,
    explanation: "Using Z = square root of (R squared + XC squared) = square root of (30 squared + 40 squared) = square root of (900 + 1600) = square root of 2500 = 50 ohms. This is a classic 3-4-5 right triangle."
  },
  {
    id: "check-3",
    question: "In an RLC series circuit, when XL = XC, what happens to the impedance?",
    options: [
      "Impedance becomes infinite",
      "Impedance equals zero",
      "Impedance equals R (minimum value)",
      "Impedance equals XL + XC"
    ],
    correctIndex: 2,
    explanation: "When XL = XC, the inductive and capacitive reactances cancel each other (XL - XC = 0). The total impedance reduces to just R. This condition is called resonance, and it produces minimum impedance in a series RLC circuit."
  },
  {
    id: "check-4",
    question: "What does the power factor of a series RL circuit depend on?",
    options: [
      "Only the resistance value",
      "Only the inductance value",
      "The ratio of R to Z (cos phi = R/Z)",
      "The supply voltage"
    ],
    correctIndex: 2,
    explanation: "Power factor = cos(phi) = R/Z. It depends on the ratio of resistance to total impedance. A high R relative to XL gives power factor close to 1; if XL dominates, power factor approaches 0 lagging."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A series RL circuit has R = 40 ohms and L = 0.1H. At 50Hz, what is the impedance?",
    options: [
      "71.4 ohms",
      "51.4 ohms",
      "31.4 ohms",
      "91.4 ohms"
    ],
    correctAnswer: 0,
    explanation: "First calculate XL = 2 x pi x f x L = 2 x 3.142 x 50 x 0.1 = 31.42 ohms. Then Z = square root of (R squared + XL squared) = square root of (40 squared + 31.42 squared) = square root of (1600 + 987) = square root of 2587 = 50.9 ohms. Closest answer is 51.4 ohms."
  },
  {
    id: 2,
    question: "In a series RC circuit with R = 100 ohms and C = 50 microfarads at 50Hz, what current flows from a 230V supply?",
    options: [
      "1.15A",
      "2.02A",
      "0.72A",
      "3.45A"
    ],
    correctAnswer: 1,
    explanation: "XC = 1/(2 x pi x f x C) = 1/(2 x 3.142 x 50 x 0.00005) = 63.7 ohms. Z = square root of (100 squared + 63.7 squared) = square root of (10000 + 4058) = 118.5 ohms. I = V/Z = 230/118.5 = 1.94A, closest to 2.02A."
  },
  {
    id: 3,
    question: "A coil has resistance of 15 ohms and inductance of 50mH. At 50Hz, what is its impedance?",
    options: [
      "15.7 ohms",
      "30.7 ohms",
      "21.2 ohms",
      "46.4 ohms"
    ],
    correctAnswer: 2,
    explanation: "XL = 2 x pi x 50 x 0.05 = 15.7 ohms. Z = square root of (15 squared + 15.7 squared) = square root of (225 + 246.5) = square root of 471.5 = 21.7 ohms, closest to 21.2 ohms."
  },
  {
    id: 4,
    question: "What is the phase angle in a series RL circuit where R = 50 ohms and XL = 50 ohms?",
    options: [
      "30 degrees",
      "45 degrees",
      "60 degrees",
      "90 degrees"
    ],
    correctAnswer: 1,
    explanation: "Phase angle tan(phi) = XL/R = 50/50 = 1. Therefore phi = arctan(1) = 45 degrees. When R equals XL, the phase angle is always 45 degrees and the power factor is cos(45) = 0.707."
  },
  {
    id: 5,
    question: "An RLC series circuit has R = 20 ohms, XL = 50 ohms, and XC = 20 ohms. What is the net reactance?",
    options: [
      "70 ohms inductive",
      "30 ohms inductive",
      "30 ohms capacitive",
      "70 ohms capacitive"
    ],
    correctAnswer: 1,
    explanation: "Net reactance X = XL - XC = 50 - 20 = 30 ohms inductive. Since XL is greater than XC, the circuit behaves inductively overall. The impedance Z = square root of (20 squared + 30 squared) = 36.1 ohms."
  },
  {
    id: 6,
    question: "For a series RL circuit, the power factor is 0.8 lagging. What is the phase angle?",
    options: [
      "36.9 degrees",
      "53.1 degrees",
      "60 degrees",
      "45 degrees"
    ],
    correctAnswer: 0,
    explanation: "Power factor = cos(phi), so phi = arccos(0.8) = 36.9 degrees. The 'lagging' indicates current lags voltage, confirming it is an inductive circuit. This is a common industrial power factor."
  },
  {
    id: 7,
    question: "In a parallel RL circuit, the total current is found by:",
    options: [
      "Adding IR and IL directly",
      "Vector sum: I = square root of (IR squared + IL squared)",
      "Dividing supply voltage by total resistance",
      "Multiplying voltage by total admittance"
    ],
    correctAnswer: 1,
    explanation: "In parallel circuits, voltages are equal but currents differ. The resistor current IR is in phase with voltage, while inductor current IL lags by 90 degrees. They combine as vectors: I = square root of (IR squared + IL squared)."
  },
  {
    id: 8,
    question: "What happens to the current in a series RLC circuit as frequency increases from well below resonance?",
    options: [
      "Current continuously increases",
      "Current increases to maximum at resonance, then decreases",
      "Current continuously decreases",
      "Current remains constant"
    ],
    correctAnswer: 1,
    explanation: "Below resonance, XC is greater than XL, limiting current. As frequency rises towards resonance, XL increases while XC decreases until they are equal (minimum impedance, maximum current). Above resonance, XL dominates and current decreases again."
  },
  {
    id: 9,
    question: "A 230V supply feeds a series circuit with Z = 46 ohms and power factor 0.8 lagging. What is the real power?",
    options: [
      "920W",
      "1150W",
      "736W",
      "460W"
    ],
    correctAnswer: 0,
    explanation: "Current I = V/Z = 230/46 = 5A. Real power P = V x I x cos(phi) = 230 x 5 x 0.8 = 920W. The power factor accounts for the phase difference between voltage and current in this inductive circuit."
  },
  {
    id: 10,
    question: "In a series RLC circuit at resonance, which statement is true?",
    options: [
      "The current is at its minimum value",
      "The voltage across L equals the voltage across C (but opposite phase)",
      "The power factor is zero",
      "The impedance is at its maximum value"
    ],
    correctAnswer: 1,
    explanation: "At resonance, XL = XC but they are 180 degrees out of phase, so VL = VC in magnitude but opposite in sign - they cancel. Current is maximum (Z = R only), and power factor is unity (purely resistive behaviour)."
  },
  {
    id: 11,
    question: "Calculate the impedance of a series circuit with R = 60 ohms, XL = 100 ohms, and XC = 60 ohms.",
    options: [
      "220 ohms",
      "72.1 ohms",
      "100 ohms",
      "40 ohms"
    ],
    correctAnswer: 1,
    explanation: "Net reactance X = XL - XC = 100 - 60 = 40 ohms (inductive). Z = square root of (R squared + X squared) = square root of (60 squared + 40 squared) = square root of (3600 + 1600) = square root of 5200 = 72.1 ohms."
  },
  {
    id: 12,
    question: "A fluorescent lamp fitting has a power factor of 0.5 lagging. To improve it to 0.9 lagging, what must be added?",
    options: [
      "A resistor in series",
      "An inductor in parallel",
      "A capacitor in parallel",
      "A capacitor in series"
    ],
    correctAnswer: 2,
    explanation: "The low power factor is caused by the inductive ballast. Adding a capacitor in parallel provides leading current that partially cancels the lagging inductor current, improving the net power factor. This is standard power factor correction practice."
  }
];

const faqs = [
  {
    question: "Why do R and X combine using Pythagoras rather than simple addition?",
    answer: "Resistance and reactance represent different types of opposition to current and are 90 degrees out of phase in their effects. R causes voltage in phase with current; XL causes voltage 90 degrees ahead of current; XC causes voltage 90 degrees behind. Since they are at right angles in the phasor diagram, they combine as the hypotenuse of a right triangle: Z = square root of (R squared + X squared)."
  },
  {
    question: "What is the significance of the impedance triangle?",
    answer: "The impedance triangle shows the relationship between R, X and Z graphically. R is the horizontal side (in-phase component), X is the vertical side (reactive component), and Z is the hypotenuse (total impedance). The angle between R and Z is the phase angle. This triangle directly gives power factor as cos(phi) = R/Z."
  },
  {
    question: "How does a practical coil differ from a pure inductor?",
    answer: "A practical coil (such as a motor winding or transformer primary) has both inductance AND resistance - the wire itself has resistance. This creates an RL circuit even in a single component. The impedance is Z = square root of (R squared + XL squared), and the power factor is less than unity but greater than zero."
  },
  {
    question: "Why do XL and XC subtract rather than add in an RLC circuit?",
    answer: "XL and XC have opposite effects on phase - inductive reactance causes voltage to lead current while capacitive reactance causes voltage to lag current. They are 180 degrees apart in the phasor diagram. When combined, they partially or fully cancel each other. The net reactance is X = XL - XC (positive if inductive, negative if capacitive)."
  },
  {
    question: "What determines whether an RLC circuit is inductive or capacitive overall?",
    answer: "If XL is greater than XC, the net reactance is positive (inductive) and current lags voltage - the circuit behaves inductively. If XC is greater than XL, the net reactance is negative (capacitive) and current leads voltage - the circuit behaves capacitively. At resonance (XL = XC), the circuit is purely resistive."
  },
  {
    question: "How are RL and RC circuits used in practical electrical work?",
    answer: "RL circuits appear in motors, transformers, contactors, and any coil-based equipment. RC circuits are used in timing circuits, filters, power supplies, and power factor correction. Understanding their behaviour helps with troubleshooting, protection coordination, and power factor management in installations."
  }
];

const Level3Module3Section2_4 = () => {
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
            <Link to="../level3-module3-section2">
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
            <span>Module 3.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            RL, RC and RLC Combinations
          </h1>
          <p className="text-white/80">
            Series and parallel combinations of resistance, inductance, and capacitance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Impedance formula:</strong> Z = square root of (R squared + X squared)</li>
              <li><strong>Net reactance:</strong> X = XL - XC (RLC circuits)</li>
              <li><strong>Power factor:</strong> cos(phi) = R / Z</li>
              <li><strong>Phase angle:</strong> tan(phi) = X / R</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Impedance Triangle</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Horizontal:</strong> Resistance R (in-phase)</li>
              <li><strong>Vertical:</strong> Reactance X (90 degrees out of phase)</li>
              <li><strong>Hypotenuse:</strong> Impedance Z (total opposition)</li>
              <li><strong>Angle:</strong> Phase angle phi between V and I</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate impedance of series RL, RC and RLC circuits",
              "Draw and interpret impedance triangles",
              "Determine phase angles and power factors for reactive circuits",
              "Understand how XL and XC combine in RLC circuits",
              "Calculate current and power in combined circuits",
              "Apply these concepts to practical electrical equipment"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Series RL Circuits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Series RL Circuits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When resistance and inductance are connected in series, the total opposition to current flow is called impedance (Z), measured in Ohms. However, R and XL cannot simply be added arithmetically because they have different phase relationships with the current - they must be combined as vectors.
            </p>

            <div className="my-6">
              <div className="p-4 rounded bg-white/5">
                <p className="font-medium text-elec-yellow/80 mb-2 text-center">Z = square root of (R squared + XL squared)</p>
                <p className="text-sm text-white/80 text-center">Series RL impedance using Pythagoras theorem</p>
              </div>
            </div>

            <p>
              In a series RL circuit, the voltage across R (VR) is in phase with the current, while the voltage across L (VL) leads the current by 90 degrees. The supply voltage is the vector sum of VR and VL. The current is common throughout the series circuit and lags behind the supply voltage by the phase angle phi.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Formulas for Series RL</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Z = square root of (R squared + XL squared)</li>
                  <li>I = V / Z</li>
                  <li>VR = I x R (in phase with I)</li>
                  <li>VL = I x XL (leads I by 90 degrees)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phase Angle and Power Factor</p>
                <ul className="text-sm text-white space-y-1">
                  <li>tan(phi) = XL / R</li>
                  <li>cos(phi) = R / Z = power factor</li>
                  <li>sin(phi) = XL / Z</li>
                  <li>Current lags voltage (lagging pf)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Worked Example:</strong> A coil has R = 30 ohms and XL = 40 ohms. Find Z, I, and pf for 230V supply.
              Z = square root of (30 squared + 40 squared) = square root of (900 + 1600) = 50 ohms.
              I = 230 / 50 = 4.6A. Power factor = R/Z = 30/50 = 0.6 lagging.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Series RC Circuits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Series RC Circuits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Series RC circuits combine resistance with capacitive reactance. The same impedance calculation applies, but the phase relationships are opposite to RL circuits - in an RC circuit, the current leads the voltage.
            </p>

            <div className="my-6">
              <div className="p-4 rounded bg-white/5">
                <p className="font-medium text-elec-yellow/80 mb-2 text-center">Z = square root of (R squared + XC squared)</p>
                <p className="text-sm text-white/80 text-center">Series RC impedance using Pythagoras theorem</p>
              </div>
            </div>

            <p>
              In the phasor diagram for a series RC circuit, the resistor voltage VR is in phase with current, while the capacitor voltage VC lags the current by 90 degrees. The supply voltage is again the vector sum. The current leads the supply voltage by the phase angle, giving a leading power factor.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">RL Circuit</p>
                <p className="text-white/90 text-xs">Current LAGS voltage (lagging pf). VL leads I by 90 degrees.</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">RC Circuit</p>
                <p className="text-white/90 text-xs">Current LEADS voltage (leading pf). VC lags I by 90 degrees.</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Same Impedance Formula</p>
                <p className="text-white/90 text-xs">Z = square root of (R squared + X squared) applies to both</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Worked Example:</strong> R = 40 ohms, C = 100 microfarads, f = 50Hz, V = 230V.
              XC = 1/(2 x pi x 50 x 0.0001) = 31.8 ohms.
              Z = square root of (40 squared + 31.8 squared) = 51.1 ohms.
              I = 230/51.1 = 4.5A. Power factor = 40/51.1 = 0.78 leading.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Series RLC Circuits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Series RLC Circuits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When all three components are in series, the inductive and capacitive reactances partially cancel each other because they are 180 degrees out of phase. The net reactance X = XL - XC determines whether the circuit behaves inductively or capacitively overall.
            </p>

            <div className="my-6">
              <div className="p-4 rounded bg-white/5">
                <p className="font-medium text-elec-yellow/80 mb-2 text-center">Z = square root of (R squared + (XL - XC) squared)</p>
                <p className="text-sm text-white/80 text-center">Series RLC impedance with net reactance</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Circuit Behaviour Based on Reactance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>If XL is greater than XC:</strong> Circuit is inductive, current lags voltage (lagging pf)</li>
                <li><strong>If XC is greater than XL:</strong> Circuit is capacitive, current leads voltage (leading pf)</li>
                <li><strong>If XL = XC:</strong> Circuit is at resonance, purely resistive (unity pf)</li>
              </ul>
            </div>

            <p>
              The minimum impedance in a series RLC circuit occurs at resonance, where XL = XC and they cancel completely. At this frequency, Z = R only, and maximum current flows. The resonant frequency can be calculated from the L and C values.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Worked Example:</strong> R = 25 ohms, XL = 60 ohms, XC = 20 ohms.
              Net reactance = XL - XC = 60 - 20 = 40 ohms (inductive).
              Z = square root of (25 squared + 40 squared) = square root of (625 + 1600) = 47.2 ohms.
              Power factor = 25/47.2 = 0.53 lagging.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Parallel Combinations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Parallel Combinations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In parallel circuits, the voltage is common across all components, but currents differ. The resistor current is in phase with voltage, inductor current lags by 90 degrees, and capacitor current leads by 90 degrees. Branch currents combine as vectors to give total current.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Parallel RL Circuit:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>IR = V / R (in phase with V)</li>
                <li>IL = V / XL (lags V by 90 degrees)</li>
                <li>I_total = square root of (IR squared + IL squared)</li>
                <li>Phase angle: tan(phi) = IL / IR</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Parallel RC Circuit:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>IR = V / R (in phase with V)</li>
                <li>IC = V / XC (leads V by 90 degrees)</li>
                <li>I_total = square root of (IR squared + IC squared)</li>
                <li>Phase angle: tan(phi) = IC / IR</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Series vs Parallel Summary</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Series:</strong> Current same, voltages add as vectors</li>
                  <li><strong>Series:</strong> Z = square root of (R squared + X squared)</li>
                  <li><strong>Parallel:</strong> Voltage same, currents add as vectors</li>
                  <li><strong>Parallel:</strong> Combine using admittance or current vectors</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Motors: Parallel RL (winding + resistance)</li>
                  <li>PFC capacitors: Added in parallel with load</li>
                  <li>Filter circuits: Series or parallel LC combinations</li>
                  <li>Transformers: Parallel RL behaviour at no-load</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Power Factor Correction:</strong> In industrial installations, capacitors are connected in parallel with inductive loads. The leading capacitor current IC partially cancels the lagging inductor current IL, reducing the total current and improving power factor.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Real-World RL Circuits</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Motor windings:</strong> Significant R and L - calculate impedance for current prediction</li>
                <li><strong>Contactor coils:</strong> RL behaviour affects inrush and holding current</li>
                <li><strong>Fluorescent ballasts:</strong> Designed RL characteristic limits lamp current</li>
                <li><strong>Cable impedance:</strong> Long cables have both R and L affecting fault calculations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Calculation Steps</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Step 1: Calculate XL = 2 x pi x f x L and/or XC = 1/(2 x pi x f x C)</li>
                <li>Step 2: Find net reactance X = XL - XC (for RLC)</li>
                <li>Step 3: Calculate Z = square root of (R squared + X squared)</li>
                <li>Step 4: Find current I = V / Z</li>
                <li>Step 5: Calculate power factor = R / Z</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Adding R and X directly:</strong> Must use Pythagoras (vector addition)</li>
                <li><strong>Forgetting phase direction:</strong> RL is lagging, RC is leading</li>
                <li><strong>Ignoring coil resistance:</strong> Real inductors have both R and L</li>
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
                <p className="font-medium text-white mb-1">Key Formulas</p>
                <ul className="space-y-0.5">
                  <li>Z = square root of (R squared + X squared)</li>
                  <li>X = XL - XC (net reactance)</li>
                  <li>cos(phi) = R / Z (power factor)</li>
                  <li>tan(phi) = X / R (phase angle)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Relationships</p>
                <ul className="space-y-0.5">
                  <li>RL: Current lags (lagging pf)</li>
                  <li>RC: Current leads (leading pf)</li>
                  <li>RLC at resonance: pf = 1</li>
                  <li>P = VI x cos(phi) = I squared R</li>
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
            <Link to="../level3-module3-section2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Pure Capacitance
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module3-section2-5">
              Next: Phase Angle and Power Factor
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module3Section2_4;
