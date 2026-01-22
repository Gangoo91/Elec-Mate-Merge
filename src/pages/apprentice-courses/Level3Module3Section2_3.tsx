/**
 * Level 3 Module 3 Section 2.3 - Pure Capacitance Circuits
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Pure Capacitance Circuits - Level 3 Module 3 Section 2.3";
const DESCRIPTION = "Master capacitive reactance calculations, understand energy storage in electric fields, and analyse charging/discharging behaviour in capacitor circuits.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "In a pure capacitive AC circuit, what is the phase relationship between voltage and current?",
    options: [
      "Current leads voltage by 90 degrees",
      "Voltage leads current by 90 degrees",
      "Voltage and current are in phase",
      "They are 180 degrees out of phase"
    ],
    correctIndex: 0,
    explanation: "In a pure capacitive circuit, current leads voltage by 90 degrees. This is because the capacitor must receive charge (current flow) before voltage can build up across it. The mnemonic 'ICE' (I leads E in Capacitor) helps remember this."
  },
  {
    id: "check-2",
    question: "Calculate the capacitive reactance of a 100 microfarad capacitor at 50Hz.",
    options: [
      "3.18 ohms",
      "31.8 ohms",
      "318 ohms",
      "0.318 ohms"
    ],
    correctIndex: 1,
    explanation: "Capacitive reactance XC = 1 / (2 x pi x f x C) = 1 / (2 x 3.142 x 50 x 0.0001) = 1 / 0.03142 = 31.8 ohms. Remember to convert microfarads to farads (divide by 1,000,000)."
  },
  {
    id: "check-3",
    question: "What happens to capacitive reactance if the supply frequency doubles?",
    options: [
      "It doubles",
      "It stays the same",
      "It halves",
      "It quadruples"
    ],
    correctIndex: 2,
    explanation: "Capacitive reactance is inversely proportional to frequency (XC = 1/(2 x pi x f x C)). If frequency doubles, XC halves. This is the opposite behaviour to inductive reactance, which is why capacitors block DC but pass AC increasingly well at higher frequencies."
  },
  {
    id: "check-4",
    question: "What is the power factor of a pure capacitive circuit?",
    options: [
      "1 (unity)",
      "0.5 leading",
      "0 lagging",
      "0 leading"
    ],
    correctIndex: 3,
    explanation: "In a pure capacitor, current leads voltage by 90 degrees. Power factor = cos(90) = 0. It is described as 'leading' because current leads voltage. Like inductors, pure capacitors dissipate no real power - only reactive power flows."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A 47 microfarad capacitor is connected to a 230V, 50Hz supply. What current flows?",
    options: [
      "3.40A",
      "0.34A",
      "34.0A",
      "0.034A"
    ],
    correctAnswer: 0,
    explanation: "First calculate XC = 1/(2 x pi x f x C) = 1/(2 x 3.142 x 50 x 0.000047) = 1/0.01476 = 67.7 ohms. Then I = V/XC = 230/67.7 = 3.40A. This current leads the voltage by 90 degrees."
  },
  {
    id: 2,
    question: "What is the capacitive reactance of a 22 microfarad capacitor at 60Hz?",
    options: [
      "120.6 ohms",
      "12.06 ohms",
      "1206 ohms",
      "1.206 ohms"
    ],
    correctAnswer: 0,
    explanation: "XC = 1/(2 x pi x f x C) = 1/(2 x 3.142 x 60 x 0.000022) = 1/0.00829 = 120.6 ohms. At higher frequencies, this reactance would decrease, allowing more current to flow."
  },
  {
    id: 3,
    question: "The phrase 'ELI the ICE man' helps remember phase relationships. What does 'ICE' represent?",
    options: [
      "Current leads voltage in inductive circuits",
      "Voltage leads current in capacitive circuits",
      "In a Capacitor, current (I) leads EMF/voltage (E)",
      "Impedance of capacitor equals reactance"
    ],
    correctAnswer: 2,
    explanation: "'ICE' means in a Capacitor (C), current (I) leads EMF/voltage (E). The capacitor must first receive charge (current flowing in) before voltage can develop across its plates. This is why current leads voltage by 90 degrees."
  },
  {
    id: 4,
    question: "How much energy is stored in a 1000 microfarad capacitor charged to 100V?",
    options: [
      "5J",
      "10J",
      "50J",
      "100J"
    ],
    correctAnswer: 0,
    explanation: "Energy stored in a capacitor E = 0.5 x C x V squared = 0.5 x 0.001 x 100 squared = 0.5 x 0.001 x 10000 = 5 Joules. This energy is stored in the electric field between the plates."
  },
  {
    id: 5,
    question: "A capacitor has a reactance of 100 ohms at 50Hz. What is its reactance at 200Hz?",
    options: [
      "400 ohms",
      "200 ohms",
      "50 ohms",
      "25 ohms"
    ],
    correctAnswer: 3,
    explanation: "Since XC is inversely proportional to frequency, quadrupling the frequency (50Hz to 200Hz) reduces reactance to one quarter: 100/4 = 25 ohms. Higher frequencies face less opposition from capacitors."
  },
  {
    id: 6,
    question: "What is the time constant of a circuit with 100 ohms resistance and 470 microfarads capacitance?",
    options: [
      "0.047 seconds",
      "0.47 seconds",
      "4.7 seconds",
      "47 seconds"
    ],
    correctAnswer: 0,
    explanation: "Time constant tau = R x C = 100 x 0.00047 = 0.047 seconds (47 milliseconds). In one time constant, the capacitor charges to 63.2% of the final voltage or discharges to 36.8% of the initial voltage."
  },
  {
    id: 7,
    question: "Which statement about capacitors in DC circuits is correct?",
    options: [
      "They conduct DC continuously",
      "They act as short circuits at steady state",
      "They block DC completely once fully charged",
      "They dissipate maximum power in DC"
    ],
    correctAnswer: 2,
    explanation: "Once a capacitor is fully charged, no more current flows - it acts as an open circuit to DC. The voltage across it equals the supply voltage, but current is zero. Only AC can flow through a capacitor continuously (as displacement current)."
  },
  {
    id: 8,
    question: "What reactive power flows in a circuit where a pure capacitor draws 2A from a 230V supply?",
    options: [
      "460W",
      "460 VAr",
      "0 VAr",
      "230 VAr"
    ],
    correctAnswer: 1,
    explanation: "For a pure capacitor, reactive power Q = V x I = 230 x 2 = 460 VAr (leading). Note the unit is VAr (volt-amperes reactive), not Watts. Real power is zero because current and voltage are 90 degrees out of phase."
  },
  {
    id: 9,
    question: "A 10 microfarad capacitor is in series with a 20 microfarad capacitor. What is the total capacitance?",
    options: [
      "30 microfarads",
      "6.67 microfarads",
      "15 microfarads",
      "200 microfarads"
    ],
    correctAnswer: 1,
    explanation: "For capacitors in series: 1/C_total = 1/C1 + 1/C2 = 1/10 + 1/20 = 0.1 + 0.05 = 0.15. Therefore C_total = 1/0.15 = 6.67 microfarads. Note: series capacitors add reciprocally (opposite to resistors)."
  },
  {
    id: 10,
    question: "At what point in the AC cycle is maximum energy stored in a capacitor?",
    options: [
      "When current is maximum",
      "When voltage is maximum",
      "When current is zero",
      "When voltage and current are equal"
    ],
    correctAnswer: 1,
    explanation: "Energy stored = 0.5 x C x V squared. Maximum energy occurs when voltage across the capacitor is at its peak (positive or negative maximum). At this instant, current through the capacitor is zero - energy storage is complete."
  },
  {
    id: 11,
    question: "What frequency would give a 100 microfarad capacitor a reactance of 15.9 ohms?",
    options: [
      "50Hz",
      "100Hz",
      "60Hz",
      "200Hz"
    ],
    correctAnswer: 1,
    explanation: "Rearranging XC = 1/(2 x pi x f x C) gives f = 1/(2 x pi x XC x C) = 1/(2 x 3.142 x 15.9 x 0.0001) = 1/0.01 = 100Hz. This calculation is useful for designing filter circuits."
  },
  {
    id: 12,
    question: "Why are capacitors used for power factor correction in installations with inductive loads?",
    options: [
      "Capacitors increase the total current",
      "Capacitor leading current cancels inductor lagging current",
      "Capacitors reduce the supply voltage",
      "Capacitors increase the reactive power"
    ],
    correctAnswer: 1,
    explanation: "Inductors cause lagging current; capacitors cause leading current. When sized correctly, the leading capacitor current cancels the lagging inductor current, bringing the net reactive current towards zero. This improves power factor towards unity."
  }
];

const faqs = [
  {
    question: "Why does current lead voltage in a capacitive circuit?",
    answer: "A capacitor stores charge on its plates. Before any voltage can appear across the capacitor, charge must flow onto the plates - meaning current must flow first. As current flows in, voltage builds up. When current reaches zero (no more charge flowing), voltage is at its maximum. This sequence means current reaches its peak before voltage does - current leads by 90 degrees."
  },
  {
    question: "What is the difference between capacitance and capacitive reactance?",
    answer: "Capacitance (C, measured in Farads) is a physical property of the capacitor determined by plate area, plate separation, and dielectric material - it does not change with frequency. Capacitive reactance (XC, measured in Ohms) is the opposition to AC current flow: XC = 1/(2 x pi x f x C). It depends on both capacitance AND frequency, decreasing with higher frequencies."
  },
  {
    question: "How does a capacitor store energy?",
    answer: "When voltage is applied, electrons are pulled from one plate and pushed onto the other, creating an electric field between the plates. Energy is stored in this electric field. The stored energy E = 0.5 x C x V squared (in Joules). When the circuit is connected, this stored energy can drive current flow as the capacitor discharges."
  },
  {
    question: "What is the RC time constant and why is it important?",
    answer: "The time constant tau = R x C (in seconds) describes how quickly a capacitor charges or discharges through a resistance. In one time constant, a charging capacitor reaches 63.2% of final voltage; a discharging capacitor falls to 36.8% of initial voltage. After 5 time constants (5 x tau), the process is considered complete (over 99%). This is crucial for timing circuits and filter design."
  },
  {
    question: "Why do capacitors block DC but pass AC?",
    answer: "In DC, once the capacitor is fully charged, no more current flows - it acts as an open circuit. In AC, the constantly changing voltage means the capacitor is continuously charging and discharging, allowing 'displacement current' to flow. Higher frequency AC changes faster, allowing more current flow, which is why XC decreases with increasing frequency."
  },
  {
    question: "How are capacitors used in power factor correction?",
    answer: "Industrial loads (motors, transformers) are typically inductive, causing current to lag voltage and resulting in poor power factor. Capacitors are connected in parallel to provide leading current that cancels the lagging inductive current. This reduces the total reactive current, improving power factor towards unity and reducing electricity costs and cable losses."
  }
];

const Level3Module3Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Phase relationship:</strong> Current leads voltage by 90 degrees</li>
              <li><strong>Key formula:</strong> XC = 1 / (2 x pi x f x C)</li>
              <li><strong>Power factor:</strong> Zero (0) leading</li>
              <li><strong>Energy storage:</strong> E = 0.5 x C x V squared (in electric field)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Remember: ELI the ICE man</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>I-C-E:</strong> In Capacitors, current (I) leads EMF (E)</li>
              <li><strong>XC inversely proportional to f:</strong> Higher frequency = less reactance</li>
              <li><strong>DC steady state:</strong> Capacitor acts as open circuit</li>
              <li><strong>Real power:</strong> Zero in pure capacitor (reactive only)</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01: What is Capacitance? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Capacitance?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Capacitance is the ability to store electrical charge and energy in an electric field. A capacitor consists of two conductive plates separated by an insulating material (dielectric). When voltage is applied, charge accumulates on the plates, creating an electric field between them. The capacitance value indicates how much charge can be stored per volt of applied potential.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Factors Affecting Capacitance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Plate area (A):</strong> Larger plates = more capacitance</li>
                <li><strong>Plate separation (d):</strong> Smaller gap = more capacitance</li>
                <li><strong>Dielectric material:</strong> Higher permittivity = more capacitance</li>
                <li><strong>Formula:</strong> C = epsilon x A / d</li>
              </ul>
            </div>

            <p>
              The fundamental relationship Q = CV shows that charge stored (Q in Coulombs) equals capacitance (C in Farads) multiplied by voltage (V in Volts). A 1 Farad capacitor stores 1 Coulomb of charge when 1 Volt is applied - this is a very large capacitance, so practical values are typically in microfarads (millionths of a Farad) or smaller.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Capacitance Values</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Power factor correction: 1-100 microfarads</li>
                  <li>Motor start capacitors: 50-400 microfarads</li>
                  <li>Smoothing capacitors: 100-10000 microfarads</li>
                  <li>Interference suppression: 0.01-1 microfarads</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Unit Conversions</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1 F = 1,000,000 microfarads (uF)</li>
                  <li>1 microfarad = 1,000 nF (nanofarads)</li>
                  <li>1 nF = 1,000 pF (picofarads)</li>
                  <li>Always convert to Farads for calculations</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Point:</strong> Unlike resistors, capacitors do not dissipate energy - they store it in the electric field and return it to the circuit. This makes them fundamentally different from resistors but similar to inductors (which store energy magnetically).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Capacitive Reactance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Capacitive Reactance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Capacitive reactance (XC) is the opposition that a capacitor presents to alternating current. Unlike inductive reactance, capacitive reactance decreases with increasing frequency - capacitors pass high frequencies more easily than low frequencies. The fundamental formula is:
            </p>

            <div className="my-6">
              <div className="p-4 rounded bg-white/5">
                <p className="font-medium text-elec-yellow/80 mb-2 text-center">XC = 1 / (2 x pi x f x C)</p>
                <p className="text-sm text-white/80 text-center">Where: XC = capacitive reactance (ohms), f = frequency (Hz), C = capacitance (F)</p>
              </div>
            </div>

            <p>
              This inverse relationship with frequency is the key difference from inductors. As frequency increases, the capacitor has less time to charge fully before the voltage reverses, so more current can flow. At DC (f = 0), the formula gives infinite reactance - the capacitor blocks DC completely.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Worked Example:</strong> Calculate the reactance of a 47 microfarad capacitor at 50Hz.
              XC = 1/(2 x pi x f x C) = 1/(2 x 3.142 x 50 x 0.000047) = 1/0.01476 = 67.7 ohms.
              At 100Hz: XC = 1/(2 x 3.142 x 100 x 0.000047) = 33.9 ohms (halved).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Frequency Dependence:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>DC (f = 0):</strong> XC = infinite - capacitor blocks DC (open circuit)</li>
                <li><strong>Low frequency:</strong> High reactance - limited current flow</li>
                <li><strong>High frequency:</strong> Low reactance - relatively easy current flow</li>
                <li><strong>Very high frequency:</strong> Approaches short circuit behaviour</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Capacitors block DC but pass AC, with better conduction at higher frequencies. This is the opposite of inductors, which pass DC but block high frequencies. This complementary behaviour is exploited in filter circuits.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Charging and Discharging */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Charging and Discharging
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When a capacitor is connected to a DC supply through a resistance, it does not charge instantly. The rate of charging (and discharging) is governed by the RC time constant, tau = R x C, measured in seconds. Understanding this behaviour is essential for timing circuits and transient analysis.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">1 Time Constant</p>
                <p className="text-white/90 text-xs">Charges to 63.2% of final voltage (or discharges to 36.8%)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">3 Time Constants</p>
                <p className="text-white/90 text-xs">Reaches 95% of final value - often considered 'practically complete'</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">5 Time Constants</p>
                <p className="text-white/90 text-xs">Reaches 99.3% of final value - theoretically complete</p>
              </div>
            </div>

            <p>
              During charging, current starts at maximum (V/R) and decays exponentially as the capacitor voltage builds up, opposing the supply. During discharging, the stored energy drives a decaying current in the opposite direction. The exponential curves are characteristic of first-order systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Time Constant Calculations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>tau = R x C</strong> (seconds, when R in ohms and C in farads)</li>
                <li>Charging voltage: V(t) = V_supply x (1 - e^(-t/tau))</li>
                <li>Discharging voltage: V(t) = V_initial x e^(-t/tau)</li>
                <li>Current: I(t) = I_initial x e^(-t/tau)</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Worked Example:</strong> A 100 microfarad capacitor charges through a 10 kilohm resistor. Time constant = R x C = 10000 x 0.0001 = 1 second. After 1 second, it reaches 63.2% of supply voltage. After 5 seconds, it is fully charged.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Phase Relationships and Power */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Phase Relationships and Power
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In a pure capacitive circuit, current leads voltage by exactly 90 degrees. This occurs because the capacitor must receive charge (current flowing in) before voltage can develop across it. When the supply voltage is at zero and beginning to increase, current is at its maximum - charge is flowing in most rapidly to build up the voltage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Power in Pure Capacitive Circuits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Real Power (P):</strong> P = VI x cos(90) = 0 Watts</li>
                <li><strong>Reactive Power (Q):</strong> Q = VI x sin(90) = VI VAr (leading)</li>
                <li><strong>Apparent Power (S):</strong> S = VI VA</li>
                <li><strong>Power Factor:</strong> cos(90) = 0 leading</li>
              </ul>
            </div>

            <p>
              Like inductors, pure capacitors dissipate no real power. Energy flows into the electric field during one quarter cycle, then back to the source during the next. However, capacitors provide leading reactive power, opposite to the lagging reactive power of inductors - this is why they are used for power factor correction.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Storage Cycle</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Voltage increasing: Energy absorbed from source</li>
                  <li>Voltage at peak: Maximum energy stored</li>
                  <li>Voltage decreasing: Energy returned to source</li>
                  <li>Voltage at zero: No energy stored</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Factor Correction</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Inductive loads: Current lags (lagging pf)</li>
                  <li>Capacitors added: Current leads (leading pf)</li>
                  <li>Effect: Lagging and leading currents cancel</li>
                  <li>Result: Net power factor improved towards unity</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Application:</strong> Power factor correction capacitors are sized to provide just enough leading reactive power to cancel the lagging reactive power of motors and other inductive loads. This reduces the total current drawn from the supply for the same real power delivered.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Capacitor Applications</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Power factor correction:</strong> Industrial capacitor banks reduce reactive power demand</li>
                <li><strong>Motor starting:</strong> Start capacitors provide phase-shifted current for single-phase motors</li>
                <li><strong>Smoothing:</strong> Large capacitors reduce ripple in DC power supplies</li>
                <li><strong>Interference suppression:</strong> Capacitors filter high-frequency noise</li>
                <li><strong>Timing circuits:</strong> RC time constants create delays and oscillations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Calculation Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always convert microfarads to Farads before using XC formula (divide by 1,000,000)</li>
                <li>XC = 1 / (2 x 3.142 x f x C) for quick calculations</li>
                <li>Current I = V / XC in a pure capacitive circuit</li>
                <li>Series capacitors: 1/C_total = 1/C1 + 1/C2 (opposite to resistors)</li>
                <li>Parallel capacitors: C_total = C1 + C2 (add directly)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Forgetting unit conversion:</strong> microfarads must become Farads for calculations</li>
                <li><strong>Wrong phase direction:</strong> Current LEADS voltage (ICE), not lags</li>
                <li><strong>Series/parallel confusion:</strong> Capacitors combine opposite to resistors</li>
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
                  <li>XC = 1 / (2 x pi x f x C) (ohms)</li>
                  <li>I = V / XC (amps)</li>
                  <li>E = 0.5 x C x V squared (joules)</li>
                  <li>tau = R x C (time constant, seconds)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Values</p>
                <ul className="space-y-0.5">
                  <li>Phase angle: 90 degrees (current leads)</li>
                  <li>Power factor: 0 leading</li>
                  <li>Real power: 0 Watts</li>
                  <li>5 tau = fully charged/discharged</li>
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
            <Link to="/study-centre/apprentice/level3-module3-section2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Pure Inductance
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section2-4">
              Next: RL, RC and RLC Combinations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module3Section2_3;
