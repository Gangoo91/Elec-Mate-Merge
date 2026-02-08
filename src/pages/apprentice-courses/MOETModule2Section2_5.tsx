import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Reactance, Impedance and Power Factor - MOET Module 2.2.5";
const DESCRIPTION = "Comprehensive guide to reactance, impedance and power factor for maintenance technicians: inductive reactance (XL=2πfL), capacitive reactance (XC=1/2πfC), impedance (Z), the power triangle (P, Q, S), power factor (cos φ), leading vs lagging, power factor correction, PFC capacitors, penalties for low PF, measurement and maintenance under BS 7671 and ST1426.";

const quickCheckQuestions = [
  {
    id: "inductive-reactance",
    question: "A 0.1 H inductor is connected to a 50 Hz supply. What is its inductive reactance?",
    options: [
      "5 Ω",
      "31.4 Ω",
      "50 Ω",
      "314 Ω"
    ],
    correctIndex: 1,
    explanation: "Inductive reactance XL = 2πfL = 2π x 50 x 0.1 = 31.4 Ω. The reactance is directly proportional to both frequency and inductance — doubling either would double the reactance. At DC (f = 0), the inductive reactance is zero, meaning an inductor appears as a short circuit to DC (only its winding resistance limits current)."
  },
  {
    id: "power-triangle",
    question: "A motor draws 10 kVA from the supply at a power factor of 0.8 lagging. What is the real power consumed?",
    options: [
      "6 kW",
      "8 kW",
      "10 kW",
      "12.5 kW"
    ],
    correctIndex: 1,
    explanation: "Real power P = S x cos φ = 10 x 0.8 = 8 kW. The remaining 6 kVAr (Q = S x sin φ = 10 x 0.6 = 6 kVAr) is reactive power — it flows back and forth between the supply and the motor's magnetic field without doing useful work but still causes current to flow in the supply conductors."
  },
  {
    id: "pfc-purpose",
    question: "The primary purpose of power factor correction is to:",
    options: [
      "Increase the supply voltage",
      "Reduce the reactive current drawn from the supply, allowing more real power to be delivered",
      "Convert AC to DC",
      "Increase the supply frequency"
    ],
    correctIndex: 1,
    explanation: "Power factor correction reduces the reactive current component drawn from the supply by providing the reactive power locally (typically via capacitors) rather than drawing it from the supply transformer and cables. This frees up capacity in the supply infrastructure for real power, reduces I²R losses in cables, and improves voltage regulation. It does not change the actual power consumed by the load."
  },
  {
    id: "impedance-calc",
    question: "A series circuit has a resistance of 30 Ω and an inductive reactance of 40 Ω. What is the impedance?",
    options: [
      "10 Ω",
      "50 Ω",
      "70 Ω",
      "1200 Ω"
    ],
    correctIndex: 1,
    explanation: "In a series R-L circuit, impedance Z = √(R² + XL²) = √(30² + 40²) = √(900 + 1600) = √2500 = 50 Ω. Note that impedance is NOT the arithmetic sum of R and X (which would give 70 Ω) — it is the vector sum, calculated using Pythagoras' theorem because R and X are at 90 degrees to each other on the impedance triangle."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Inductive reactance (XL) is calculated using the formula:",
    options: [
      "XL = 1/(2πfL)",
      "XL = 2πfL",
      "XL = 2πfC",
      "XL = R x L"
    ],
    correctAnswer: 1,
    explanation: "Inductive reactance XL = 2πfL, where f is the frequency in hertz and L is the inductance in henries. XL is measured in ohms and increases with both frequency and inductance. At 50 Hz, a 100 mH inductor has XL = 2π x 50 x 0.1 = 31.4 Ω."
  },
  {
    id: 2,
    question: "Capacitive reactance (XC) is calculated using the formula:",
    options: [
      "XC = 2πfC",
      "XC = 1/(2πfC)",
      "XC = 2πfL",
      "XC = R / C"
    ],
    correctAnswer: 1,
    explanation: "Capacitive reactance XC = 1/(2πfC), where f is the frequency in hertz and C is the capacitance in farads. Unlike inductive reactance, XC decreases with increasing frequency and capacitance. At DC (f = 0), XC is infinite — a capacitor blocks DC completely. At high frequencies, XC approaches zero — a capacitor passes high frequencies easily."
  },
  {
    id: 3,
    question: "In an AC circuit, impedance (Z) is defined as:",
    options: [
      "The sum of resistance and reactance",
      "The opposition to current flow in a DC circuit",
      "The total opposition to current flow, combining resistance and reactance vectorially",
      "The power consumed by the circuit"
    ],
    correctAnswer: 2,
    explanation: "Impedance is the total opposition to current flow in an AC circuit, combining resistance (R) and reactance (X) as a vector sum: Z = √(R² + X²) for a series circuit. It is measured in ohms but unlike pure resistance, impedance has both magnitude and phase angle. The current in the circuit is determined by V/Z (Ohm's law for AC)."
  },
  {
    id: 4,
    question: "The power factor of a circuit is defined as:",
    options: [
      "The ratio of voltage to current",
      "The cosine of the phase angle between voltage and current (cos φ)",
      "The frequency of the supply divided by 50",
      "The ratio of reactive power to apparent power"
    ],
    correctAnswer: 1,
    explanation: "Power factor = cos φ, where φ is the phase angle between the voltage and current waveforms. It can also be expressed as the ratio of real power to apparent power: PF = P/S = kW/kVA. A power factor of 1.0 (unity) means all current is doing useful work. A power factor of 0.5 means only half the current is doing useful work — the rest is reactive."
  },
  {
    id: 5,
    question: "A 'lagging' power factor is caused by:",
    options: [
      "Resistive loads (heaters, incandescent lamps)",
      "Capacitive loads (PFC capacitors, long cable runs)",
      "Inductive loads (motors, transformers, solenoids)",
      "Non-linear loads (VSDs, LED drivers)"
    ],
    correctAnswer: 2,
    explanation: "A lagging power factor occurs when the current lags behind the voltage — this is caused by inductive loads. Motors, transformers, solenoids, fluorescent lighting with magnetic ballasts and induction heaters all have lagging power factors. The majority of industrial loads are inductive, which is why most industrial installations have a lagging power factor and require power factor correction."
  },
  {
    id: 6,
    question: "An installation draws 100 kVA at a power factor of 0.7 lagging. After PFC is installed, the power factor improves to 0.95. The new apparent power demand is approximately:",
    options: [
      "70 kVA",
      "73.7 kVA",
      "95 kVA",
      "100 kVA"
    ],
    correctAnswer: 1,
    explanation: "The real power remains the same: P = 100 x 0.7 = 70 kW. With the improved power factor: S = P / cos φ = 70 / 0.95 = 73.7 kVA. The apparent power demand has been reduced from 100 kVA to 73.7 kVA — a 26.3% reduction. This means 26.3% less current flowing through the supply cables and transformer, reducing losses and freeing up capacity."
  },
  {
    id: 7,
    question: "The three components of the power triangle are:",
    options: [
      "Voltage, current and resistance",
      "Real power (kW), reactive power (kVAr) and apparent power (kVA)",
      "Frequency, period and wavelength",
      "Inductance, capacitance and resistance"
    ],
    correctAnswer: 1,
    explanation: "The power triangle represents the relationship between real power P (kW — the power that does useful work), reactive power Q (kVAr — the power that flows back and forth supporting magnetic and electric fields), and apparent power S (kVA — the total power delivered by the supply). They are related by: S² = P² + Q², and the power factor = P/S = cos φ."
  },
  {
    id: 8,
    question: "Power factor correction capacitors are connected in:",
    options: [
      "Series with the load",
      "Parallel with the load",
      "Series with the neutral conductor",
      "Between the line and earth conductors"
    ],
    correctAnswer: 1,
    explanation: "PFC capacitors are always connected in parallel with the load (or the supply bus). This allows the capacitor to supply the reactive current locally, reducing the reactive current drawn from the supply. The capacitor current leads the voltage by 90 degrees, opposing the lagging current drawn by inductive loads. Connecting capacitors in series would reduce the voltage to the load and is not used for power factor correction."
  },
  {
    id: 9,
    question: "A UK electricity supplier typically applies financial penalties when the power factor falls below:",
    options: [
      "1.0",
      "0.95",
      "0.90 or 0.85 (varies by supplier)",
      "0.70"
    ],
    correctAnswer: 2,
    explanation: "Most UK electricity suppliers apply reactive power charges when the power factor falls below a threshold, typically 0.90 or 0.85 (the exact value varies by supplier and tariff). The charge is based on the amount of reactive energy consumed (measured in kVArh by a reactive energy meter). The penalty can be substantial for large industrial consumers with poor power factor."
  },
  {
    id: 10,
    question: "At resonance in a series RLC circuit, what happens to the impedance?",
    options: [
      "Impedance becomes infinite",
      "Impedance equals the resistance only (XL and XC cancel)",
      "Impedance equals zero",
      "Impedance doubles"
    ],
    correctAnswer: 1,
    explanation: "At the resonant frequency, the inductive reactance (XL) equals the capacitive reactance (XC), and they cancel each other out. The impedance of the series circuit reduces to the resistance alone: Z = R. This means maximum current flows at resonance. In power systems, series resonance between PFC capacitors and transformer inductance can amplify harmonic currents to dangerous levels — a critical design consideration."
  },
  {
    id: 11,
    question: "Which instrument is used to measure power factor on site?",
    options: [
      "An insulation resistance tester",
      "A power quality analyser or power factor meter",
      "A continuity tester",
      "An earth loop impedance tester"
    ],
    correctAnswer: 1,
    explanation: "Power factor is measured using a power quality analyser (which measures voltage, current and their phase relationship simultaneously) or a dedicated power factor meter. Clamp-on power meters that measure voltage and current can also calculate power factor. For accurate results, the meter must be a true-RMS type, as average-responding meters give incorrect power factor readings on non-sinusoidal waveforms."
  },
  {
    id: 12,
    question: "The reactive power (Q) in an AC circuit is measured in:",
    options: [
      "Watts (W)",
      "Volt-amperes (VA)",
      "Volt-amperes reactive (VAr)",
      "Ohms (Ω)"
    ],
    correctAnswer: 2,
    explanation: "Reactive power is measured in volt-amperes reactive (VAr), or more commonly kVAr (kilovolt-amperes reactive). Real power is measured in watts (W or kW), and apparent power is measured in volt-amperes (VA or kVA). The distinction is important: reactive power does no useful work but still causes current to flow, contributing to I²R losses in the supply infrastructure."
  }
];

const faqs = [
  {
    question: "Why does a low power factor cost money?",
    answer: "A low power factor means a higher proportion of the total current is reactive — flowing back and forth between the supply and the load without doing useful work. This reactive current still causes I²R losses in supply cables and transformers, occupies capacity in the distribution system, and causes voltage drop. Electricity suppliers charge for this wasted capacity through reactive power charges (kVArh metering). A factory drawing 100 kW at PF 0.7 requires 143 kVA of supply capacity; at PF 0.95 it requires only 105 kVA — a 26% reduction."
  },
  {
    question: "Can power factor be greater than 1?",
    answer: "No. Power factor (cos φ) can only range from 0 to 1. A value of 1 (unity) means voltage and current are perfectly in phase and all power is real (useful). A value of 0 means voltage and current are 90 degrees apart and all power is reactive (no useful work). In practice, power factors below about 0.6 are rare in normal installations. Note that 'displacement power factor' (cos φ) and 'true power factor' (P/S including harmonics) may differ — distortion from harmonics can reduce the true power factor even when the displacement power factor is good."
  },
  {
    question: "What is the difference between kW, kVA and kVAr?",
    answer: "These are the three types of power in AC circuits. kW (kilowatts) is real (active) power — the power that does useful work (turning motors, producing heat, producing light). kVAr (kilovolt-amperes reactive) is reactive power — the power that flows back and forth supporting magnetic fields in motors and transformers. kVA (kilovolt-amperes) is apparent power — the total power delivered by the supply (the vector sum of kW and kVAr). The supply transformer, cables and switchgear must all be rated for the apparent power (kVA), which is always greater than or equal to the real power (kW) unless power factor is unity."
  },
  {
    question: "How do I size PFC capacitors for an installation?",
    answer: "To size PFC capacitors: 1) Measure the existing power factor and real power demand (kW) using a power quality analyser. 2) Determine the target power factor (typically 0.95 for UK installations). 3) Calculate the required kVAr: Q_cap = P x (tan φ₁ - tan φ₂), where φ₁ is the existing angle and φ₂ is the target angle. For example, to correct 100 kW from PF 0.7 to 0.95: Q_cap = 100 x (tan(45.6°) - tan(18.2°)) = 100 x (1.02 - 0.33) = 69 kVAr. Consider automatic (stepped) PFC for variable loads to avoid leading power factor when load is light."
  },
  {
    question: "What maintenance is required for PFC capacitor banks?",
    answer: "PFC capacitor banks require regular maintenance: thermographic survey annually (look for hot connections, overheated capacitors), visual inspection quarterly (swelling, leaking, discolouration), power factor measurement monthly (verify correction is working), harmonic current check annually (ensure capacitors are not absorbing excessive harmonic currents), contact inspection on switching contactors (arc damage reduces life), and capacitance measurement annually (capacitance drop of more than 5% indicates degradation). Also check discharge resistors are functioning — capacitors must discharge to below 50 V within one minute of disconnection per BS EN 60831."
  }
];

const MOETModule2Section2_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 2.2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Reactance, Impedance and Power Factor
          </h1>
          <p className="text-white/80">
            Understanding reactive components, impedance calculations and power factor correction for electrical maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>XL = 2πfL</strong> — inductive reactance increases with frequency</li>
              <li className="pl-1"><strong>XC = 1/(2πfC)</strong> — capacitive reactance decreases with frequency</li>
              <li className="pl-1"><strong>Z = √(R² + X²)</strong> — impedance is the vector sum</li>
              <li className="pl-1"><strong>PF = cos φ = kW/kVA</strong> — target 0.95 for UK installations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Power Triangle</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>P (kW):</strong> Real power — does useful work</li>
              <li className="pl-1"><strong>Q (kVAr):</strong> Reactive power — supports fields</li>
              <li className="pl-1"><strong>S (kVA):</strong> Apparent power — total supply demand</li>
              <li className="pl-1"><strong>S² = P² + Q²</strong> — Pythagoras applies</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate inductive reactance (XL = 2πfL) and capacitive reactance (XC = 1/2πfC)",
              "Calculate impedance in series and parallel AC circuits",
              "Explain the power triangle and the relationship between P, Q and S",
              "Define power factor and distinguish between leading and lagging",
              "Describe power factor correction using capacitors and explain its benefits",
              "Carry out power factor measurement and maintain PFC equipment"
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

        {/* Section 01: Reactance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Inductive and Capacitive Reactance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In DC circuits, only resistance opposes the flow of current. In AC circuits, inductors and
              capacitors also oppose current flow — but in a fundamentally different way. This opposition
              is called reactance. Unlike resistance, which dissipates energy as heat, reactance stores
              energy temporarily in magnetic fields (inductors) or electric fields (capacitors) and returns
              it to the circuit during each cycle. Reactance depends on frequency — a critical distinction
              from resistance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inductive Reactance (XL)</p>
              <div className="p-3 rounded bg-white/5 font-mono text-sm text-center mb-3">
                XL = 2πfL = ωL
              </div>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Unit:</strong> Ohms (Ω)</li>
                <li className="pl-1"><strong>Behaviour:</strong> Increases linearly with frequency — higher frequency means more opposition</li>
                <li className="pl-1"><strong>At DC (f = 0):</strong> XL = 0 — inductor appears as a short circuit (only winding resistance limits current)</li>
                <li className="pl-1"><strong>At high frequency:</strong> XL approaches infinity — inductor blocks high-frequency signals</li>
                <li className="pl-1"><strong>Phase effect:</strong> Current lags voltage by 90° in a pure inductor</li>
                <li className="pl-1"><strong>Example:</strong> Motor winding L = 50 mH at 50 Hz: XL = 2π x 50 x 0.05 = 15.7 Ω</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Capacitive Reactance (XC)</p>
              <div className="p-3 rounded bg-white/5 font-mono text-sm text-center mb-3">
                XC = 1/(2πfC) = 1/(ωC)
              </div>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Unit:</strong> Ohms (Ω)</li>
                <li className="pl-1"><strong>Behaviour:</strong> Decreases with increasing frequency — higher frequency means less opposition</li>
                <li className="pl-1"><strong>At DC (f = 0):</strong> XC = infinity — capacitor blocks DC completely (open circuit)</li>
                <li className="pl-1"><strong>At high frequency:</strong> XC approaches zero — capacitor passes high frequencies easily</li>
                <li className="pl-1"><strong>Phase effect:</strong> Current leads voltage by 90° in a pure capacitor</li>
                <li className="pl-1"><strong>Example:</strong> PFC capacitor C = 100 μF at 50 Hz: XC = 1/(2π x 50 x 100x10⁻⁶) = 31.8 Ω</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Reactance vs Resistance — Key Differences</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Property</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Resistance (R)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reactance (X)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy</td>
                      <td className="border border-white/10 px-3 py-2">Dissipates energy as heat</td>
                      <td className="border border-white/10 px-3 py-2">Stores and returns energy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Frequency</td>
                      <td className="border border-white/10 px-3 py-2">Independent of frequency</td>
                      <td className="border border-white/10 px-3 py-2">Changes with frequency</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase</td>
                      <td className="border border-white/10 px-3 py-2">V and I in phase (0°)</td>
                      <td className="border border-white/10 px-3 py-2">V and I 90° apart</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power</td>
                      <td className="border border-white/10 px-3 py-2">Consumes real power (kW)</td>
                      <td className="border border-white/10 px-3 py-2">Consumes no real power (kVAr only)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> In practical AC circuits, components have both resistance and reactance.
              A motor winding has resistance (from the copper wire) and inductance (from the magnetic circuit).
              A cable has resistance, inductance and capacitance. The total opposition to current is called impedance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Impedance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Impedance and the Impedance Triangle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Impedance (Z) is the total opposition to current flow in an AC circuit. It combines resistance (R)
              and reactance (X) as a vector sum — not an arithmetic sum. This is because resistance and reactance
              are 90 degrees apart in their effect on the circuit (resistance is in phase with current, reactance
              is 90 degrees out of phase). The impedance triangle is the graphical representation of this relationship.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Impedance Calculations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Series R-L circuit:</strong> Z = √(R² + XL²), phase angle φ = arctan(XL/R)</li>
                <li className="pl-1"><strong>Series R-C circuit:</strong> Z = √(R² + XC²), phase angle φ = arctan(XC/R)</li>
                <li className="pl-1"><strong>Series R-L-C circuit:</strong> Z = √(R² + (XL - XC)²), X_net = XL - XC</li>
                <li className="pl-1"><strong>If XL &gt; XC:</strong> Circuit is net inductive (current lags voltage)</li>
                <li className="pl-1"><strong>If XC &gt; XL:</strong> Circuit is net capacitive (current leads voltage)</li>
                <li className="pl-1"><strong>If XL = XC:</strong> Series resonance — Z = R (minimum impedance, maximum current)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ohm's Law for AC Circuits</p>
              <p className="text-sm text-white mb-3">
                The AC version of Ohm's law uses impedance instead of resistance:
              </p>
              <div className="p-3 rounded bg-white/5 font-mono text-sm text-center mb-3">
                V = I x Z &nbsp;&nbsp;|&nbsp;&nbsp; I = V / Z &nbsp;&nbsp;|&nbsp;&nbsp; Z = V / I
              </div>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">All values are RMS unless stated otherwise</li>
                <li className="pl-1">V, I and Z are all phasor quantities (magnitude and angle)</li>
                <li className="pl-1"><strong>Example:</strong> 230 V supply, Z = 46 Ω, then I = 230/46 = 5 A</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Resonance — A Critical Concept</p>
              <p className="text-sm text-white mb-3">
                Resonance occurs when XL = XC — the inductive and capacitive reactances are equal. The resonant
                frequency is:
              </p>
              <div className="p-3 rounded bg-white/5 font-mono text-sm text-center mb-3">
                f₀ = 1 / (2π√(LC))
              </div>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Series resonance:</strong> Impedance falls to R only. Current reaches maximum. Dangerous in power systems — can cause overcurrents through PFC capacitors</li>
                <li className="pl-1"><strong>Parallel resonance:</strong> Impedance rises to maximum. Current from supply falls to minimum. Can amplify harmonic voltages at the resonant frequency</li>
                <li className="pl-1"><strong>In PFC systems:</strong> Resonance between PFC capacitors and transformer inductance at a harmonic frequency can amplify that harmonic to dangerous levels. This is why PFC must be designed with harmonic content in mind</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> Earth fault loop impedance (Zs) measured during testing is an AC
              impedance, not just resistance. It includes the resistance and reactance of the supply transformer,
              cables and earth path. At 50 Hz, the reactive component is significant for larger cable sizes and
              longer runs, which is why measured Zs may differ from calculated values based on resistance alone.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 03: Power Triangle and Power Factor */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            The Power Triangle and Power Factor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In AC circuits with reactance, not all the power delivered by the supply does useful work.
              The power triangle describes the relationship between the three types of AC power: real (active)
              power, reactive power, and apparent power. Power factor is the crucial ratio that indicates how
              efficiently the supply current is being used.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Three Types of AC Power</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Real power P (kW):</strong> The power that does useful work — turns motors, produces heat, produces light. P = V x I x cos φ. Measured by a wattmeter. The only type of power you pay for directly (kWh meter)</li>
                <li className="pl-1"><strong>Reactive power Q (kVAr):</strong> The power that flows back and forth between the supply and the reactive components (inductors, capacitors) without doing useful work. Q = V x I x sin φ. Essential for maintaining magnetic fields in motors and transformers but causes additional current to flow</li>
                <li className="pl-1"><strong>Apparent power S (kVA):</strong> The total power delivered by the supply — the product of RMS voltage and RMS current. S = V x I. The supply infrastructure (transformer, cables, switchgear) must be rated for the apparent power, not just the real power</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Factor — Leading and Lagging</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Power factor = cos φ = P/S = kW/kVA</strong></li>
                <li className="pl-1"><strong>Unity (PF = 1.0):</strong> Purely resistive load. V and I in phase. All current does useful work. Maximum efficiency</li>
                <li className="pl-1"><strong>Lagging (0 &lt; PF &lt; 1):</strong> Inductive load. Current lags voltage. Caused by motors, transformers, solenoids. The dominant condition in industrial installations</li>
                <li className="pl-1"><strong>Leading (0 &lt; PF &lt; 1):</strong> Capacitive load. Current leads voltage. Caused by PFC capacitors, long lightly loaded cables. Usually only seen when PFC overcorrects</li>
                <li className="pl-1"><strong>Zero PF (PF = 0):</strong> Purely reactive load. No real power consumed. All power is reactive. Theoretical limit — not encountered in practice</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Power Factors</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Load Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical PF</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Resistive heaters</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">Unity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Incandescent lighting</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">Unity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Induction motors (full load)</td>
                      <td className="border border-white/10 px-3 py-2">0.80-0.90</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Induction motors (no load)</td>
                      <td className="border border-white/10 px-3 py-2">0.15-0.30</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fluorescent lighting (magnetic ballast)</td>
                      <td className="border border-white/10 px-3 py-2">0.50-0.60</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED lighting (with PFC)</td>
                      <td className="border border-white/10 px-3 py-2">0.90-0.99</td>
                      <td className="border border-white/10 px-3 py-2">Leading or lagging</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Welding sets</td>
                      <td className="border border-white/10 px-3 py-2">0.40-0.60</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VSDs (with input PFC)</td>
                      <td className="border border-white/10 px-3 py-2">0.95-0.98</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The most common cause of poor power factor in industrial installations
              is induction motors — especially those running at less than full load. A motor running at 50% load
              draws nearly the same reactive current as at full load but only half the real current, causing the
              power factor to deteriorate significantly. Oversized motors are a major contributor to poor power factor.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Power Factor Correction */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Power Factor Correction and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power factor correction (PFC) is the process of reducing the reactive current drawn from the
              supply by providing the reactive power locally — typically using capacitors. PFC capacitors supply
              the leading reactive current that partially or fully cancels the lagging reactive current drawn by
              inductive loads. This reduces the total current from the supply, freeing up capacity, reducing
              losses and avoiding financial penalties.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PFC Methods</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Individual correction:</strong> Capacitor fitted directly to each motor or large inductive load. The capacitor is switched with the load. Simple and effective but requires many capacitors. Often used for large motors (&gt;15 kW)</li>
                <li className="pl-1"><strong>Group correction:</strong> A capacitor bank connected to a distribution board to correct a group of loads. Partially compensates for the varying load profiles of multiple loads</li>
                <li className="pl-1"><strong>Central automatic correction:</strong> An automatically switched capacitor bank at the main switchboard. A PFC controller monitors the power factor in real time and switches capacitor stages in and out to maintain the target PF. The most common solution for industrial installations</li>
                <li className="pl-1"><strong>Static VAr compensators:</strong> Thyristor-controlled reactors used for fast, precise PFC in applications with rapidly varying loads (arc furnaces, welding bays)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Benefits of Power Factor Correction</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Reduced electricity costs:</strong> Avoidance of reactive power charges (kVArh penalties). Typical payback period for PFC equipment: 12-18 months</li>
                <li className="pl-1"><strong>Freed-up capacity:</strong> Reducing the current from 100 kVA to 74 kVA (PF 0.7 to 0.95) frees 26 kVA of transformer and cable capacity for additional load</li>
                <li className="pl-1"><strong>Reduced I²R losses:</strong> Lower current means proportionally lower copper losses in cables and transformers. Energy savings of 2-5% are typical</li>
                <li className="pl-1"><strong>Improved voltage regulation:</strong> Less current means less voltage drop. Voltage at the load terminals improves, benefiting motor performance and equipment life</li>
                <li className="pl-1"><strong>Reduced cable heating:</strong> Lower current reduces cable operating temperature, extending insulation life</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">PFC Hazards and Safety</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stored energy:</strong> PFC capacitors retain a charge after disconnection. Discharge resistors should reduce the voltage to below 50 V within one minute (BS EN 60831). Always verify discharge before handling</li>
                <li className="pl-1"><strong>Overcorrection:</strong> If the PFC bank supplies more reactive power than the load demands, the power factor becomes leading. This can cause voltage rise, generator instability and problems with some protection devices. Automatic PFC controllers prevent this</li>
                <li className="pl-1"><strong>Harmonic resonance:</strong> PFC capacitors can resonate with the system inductance at harmonic frequencies, amplifying harmonics and causing capacitor overheating and failure. Detuning reactors (typically 5.67% or 7% impedance) are used to shift the resonant frequency below the lowest significant harmonic</li>
                <li className="pl-1"><strong>Inrush current:</strong> Switching large capacitor banks can cause significant inrush current, causing contact wear and voltage transients. Pre-insertion resistors or controlled switching can mitigate this</li>
                <li className="pl-1"><strong>Self-excitation:</strong> Do not leave PFC capacitors connected to motors that may be disconnected from the supply — the motor can self-excite as a generator, producing dangerous voltages</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires understanding of power
              factor, its effects on the electrical system, and the operation and maintenance of power factor
              correction equipment. PFC systems are a common maintenance responsibility in industrial and
              commercial installations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — Reactance, Impedance and PF"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Frequency and Waveforms
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section2-6">
              Next: Capacitors and Inductors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule2Section2_5;
