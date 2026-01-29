import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Resonance in RLC Circuits and Practical Issues - HNC Module 3 Section 2.6";
const DESCRIPTION = "Master resonance phenomena in RLC circuits for building services: series and parallel resonance, quality factor Q, bandwidth, voltage and current magnification, capacitor switching transients, and harmonic resonance problems with PFC capacitors.";

const quickCheckQuestions = [
  {
    id: "resonant-frequency",
    question: "What is the resonant frequency of a circuit with L = 10mH and C = 100uF?",
    options: ["15.9 Hz", "50 Hz", "159 Hz", "500 Hz"],
    correctIndex: 2,
    explanation: "Using f0 = 1/(2pi x sqrt(LC)): f0 = 1/(2pi x sqrt(0.01 x 0.0001)) = 1/(2pi x 0.001) = 159 Hz. This is where XL = XC and the circuit is at resonance."
  },
  {
    id: "series-resonance-impedance",
    question: "At resonance in a series RLC circuit, the impedance equals:",
    options: ["Zero", "R only", "XL + XC", "Maximum value"],
    correctIndex: 1,
    explanation: "At series resonance, XL = XC and they cancel out (being 180 degrees out of phase), leaving only the resistance R. This gives minimum impedance and maximum current."
  },
  {
    id: "quality-factor",
    question: "A series RLC circuit has XL = 500 ohms at resonance and R = 10 ohms. What is the Q factor?",
    options: ["5", "50", "500", "5000"],
    correctIndex: 1,
    explanation: "Q = XL/R = 500/10 = 50. This high Q factor means the voltage across L or C will be 50 times the supply voltage at resonance - a significant magnification."
  },
  {
    id: "harmonic-resonance",
    question: "PFC capacitors are most at risk of failure when the system resonant frequency coincides with which harmonic?",
    options: ["Fundamental (50 Hz)", "3rd harmonic", "5th or 7th harmonic", "11th harmonic"],
    correctIndex: 2,
    explanation: "The 5th (250 Hz) and 7th (350 Hz) harmonics are typically the strongest in non-linear loads. If PFC capacitors tune the system to resonate at these frequencies, severe overcurrents and capacitor failure can result."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the formula for resonant frequency in an LC circuit?",
    options: [
      "f0 = 2pi x sqrt(LC)",
      "f0 = 1/(2pi x sqrt(LC))",
      "f0 = LC/(2pi)",
      "f0 = sqrt(L/C)"
    ],
    correctAnswer: 1,
    explanation: "The resonant frequency f0 = 1/(2pi x sqrt(LC)). At this frequency, the inductive reactance equals the capacitive reactance (XL = XC), creating resonance."
  },
  {
    id: 2,
    question: "In a series RLC circuit at resonance, what happens to the current?",
    options: [
      "Current is minimum",
      "Current is maximum",
      "Current is zero",
      "Current equals the voltage"
    ],
    correctAnswer: 1,
    explanation: "At series resonance, impedance is minimum (Z = R only), so current reaches its maximum value. This is why series resonance is sometimes called 'acceptor' resonance."
  },
  {
    id: 3,
    question: "What is the dynamic impedance of a parallel resonant circuit?",
    options: [
      "Zd = R",
      "Zd = L/(CR)",
      "Zd = LC/R",
      "Zd = R/(LC)"
    ],
    correctAnswer: 1,
    explanation: "The dynamic impedance Zd = L/(CR) represents the very high impedance at parallel resonance. For practical circuits, this can be several kilohms, making parallel resonance a 'rejector' circuit."
  },
  {
    id: 4,
    question: "A circuit has Q = 25 and resonant frequency 200 Hz. What is the bandwidth?",
    options: [
      "5 Hz",
      "8 Hz",
      "25 Hz",
      "50 Hz"
    ],
    correctAnswer: 1,
    explanation: "Bandwidth B = f0/Q = 200/25 = 8 Hz. The bandwidth extends from f1 to f2 where the response falls to 0.707 (-3dB) of its maximum value."
  },
  {
    id: 5,
    question: "In a series resonant circuit with Q = 30 and supply voltage 230V, what is the voltage across the capacitor at resonance?",
    options: [
      "230V",
      "2300V",
      "6900V",
      "7.67V"
    ],
    correctAnswer: 2,
    explanation: "At series resonance, VC = Q x VS = 30 x 230 = 6900V. This voltage magnification is why series resonance can be dangerous in power systems."
  },
  {
    id: 6,
    question: "What characterises parallel resonance in a practical circuit?",
    options: [
      "Maximum current from supply",
      "Minimum impedance",
      "Minimum current from supply (maximum impedance)",
      "Unity power factor"
    ],
    correctAnswer: 2,
    explanation: "Parallel resonance gives maximum impedance and minimum supply current. The circulating current between L and C can be Q times larger than the supply current."
  },
  {
    id: 7,
    question: "Why are detuning reactors used with PFC capacitor banks?",
    options: [
      "To increase power factor",
      "To reduce harmonic currents",
      "To prevent harmonic resonance by shifting the resonant frequency below dominant harmonics",
      "To increase the capacitance"
    ],
    correctAnswer: 2,
    explanation: "Detuning reactors (typically 7% or 14% of capacitor reactance) shift the system resonant frequency below the 5th harmonic (250 Hz), preventing dangerous amplification of harmonic currents."
  },
  {
    id: 8,
    question: "When capacitors are switched onto a supply, what causes the inrush current transient?",
    options: [
      "Power factor correction",
      "The capacitor charging through low source impedance with minimal damping",
      "Magnetic saturation",
      "Thermal effects"
    ],
    correctAnswer: 1,
    explanation: "The discharged capacitor acts as a short circuit initially, drawing high inrush current limited only by source impedance. Peak currents can be 20-30 times rated current without pre-insertion resistors."
  },
  {
    id: 9,
    question: "What is the relationship between Q factor and selectivity in a resonant circuit?",
    options: [
      "Higher Q means broader bandwidth",
      "Higher Q means sharper (narrower) frequency response",
      "Q has no effect on selectivity",
      "Lower Q means sharper frequency response"
    ],
    correctAnswer: 1,
    explanation: "Higher Q means narrower bandwidth (B = f0/Q), giving sharper frequency selectivity. In power systems, this means harmonic currents within a narrow band are heavily amplified."
  },
  {
    id: 10,
    question: "A 400V three-phase system has 200 kVAr PFC capacitors and transformer inductance creating a resonant frequency of 350 Hz. What is the risk?",
    options: [
      "No risk - 350 Hz is above supply frequency",
      "The system may resonate with 7th harmonic (350 Hz) causing capacitor overload",
      "The capacitors will improve power factor more efficiently",
      "Only a risk at fundamental frequency"
    ],
    correctAnswer: 1,
    explanation: "350 Hz is exactly the 7th harmonic (7 x 50 Hz). VSD drives and non-linear loads generate significant 7th harmonic current, which will be amplified by resonance, potentially destroying the capacitors."
  },
  {
    id: 11,
    question: "What is the half-power bandwidth of a resonant circuit?",
    options: [
      "The frequency range where power is maximum",
      "The frequency range between -3dB points (f2 - f1)",
      "Half the resonant frequency",
      "The frequency where Q = 0.5"
    ],
    correctAnswer: 1,
    explanation: "The half-power bandwidth is the frequency range between the points where power falls to half its maximum value (-3dB). These are the frequencies where current/voltage is 0.707 of maximum."
  },
  {
    id: 12,
    question: "In building services, which scenario most commonly leads to harmonic resonance problems?",
    options: [
      "Installing LED lighting",
      "Adding PFC capacitors to systems with VSD drives",
      "Using resistive heating loads",
      "Operating at unity power factor"
    ],
    correctAnswer: 1,
    explanation: "VSD drives generate significant 5th and 7th harmonics. Adding PFC capacitors can tune the system to resonate at these frequencies, causing severe harmonic current amplification and capacitor failure."
  }
];

const faqs = [
  {
    question: "Why does resonance only occur at one specific frequency?",
    answer: "Resonance occurs when XL = XC. Since XL = 2(pi)fL (increases with frequency) and XC = 1/(2(pi)fC) (decreases with frequency), they can only be equal at one frequency: f0 = 1/(2(pi)(sqrt)LC). Above this frequency XL > XC (inductive), below it XL < XC (capacitive)."
  },
  {
    question: "What is the difference between series and parallel resonance effects?",
    answer: "Series resonance gives minimum impedance and maximum current (acceptor circuit) - dangerous for power systems as it amplifies currents. Parallel resonance gives maximum impedance and minimum supply current (rejector circuit) - the circulating current between L and C can be very high even though supply current is low."
  },
  {
    question: "How do I know if my PFC installation is at risk of harmonic resonance?",
    answer: "Calculate the system resonant frequency: fr = f1 x sqrt(Ssc/Qc) where Ssc is the short-circuit power and Qc is the capacitor kVAr. If fr is close to 250 Hz (5th), 350 Hz (7th), or 550 Hz (11th), resonance risk exists. Use detuned capacitors or harmonic filters if VSD drives or non-linear loads are present."
  },
  {
    question: "Why do capacitor banks sometimes explode or fail prematurely?",
    answer: "Harmonic resonance amplifies harmonic currents through the capacitors, causing overheating. The capacitor dielectric is also stressed by high peak voltages. Additionally, capacitor switching transients create high inrush currents that stress the dielectric. These combined effects lead to premature ageing and potentially catastrophic failure."
  },
  {
    question: "What is a detuning reactor and how does it prevent resonance?",
    answer: "A detuning reactor is an inductor connected in series with PFC capacitors, typically sized at 7% or 14% of the capacitor reactance. This shifts the system resonant frequency below 200 Hz (below the 4th harmonic), ensuring no resonance with common harmonics (5th, 7th, 11th). The 7% reactor detunes to approximately 189 Hz, the 14% reactor to approximately 134 Hz."
  },
  {
    question: "How does Q factor affect the danger of resonance in power systems?",
    answer: "Higher Q means sharper resonance with greater current/voltage amplification. Power systems typically have Q values of 10-50. At Q = 30, harmonic currents at resonance are amplified 30 times, and voltages can reach 30 times the harmonic voltage. Lower resistance (higher Q) makes resonance more severe."
  }
];

const HNCModule3Section2_6 = () => {
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
            <span>Module 3.2.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Resonance in RLC Circuits and Practical Issues
          </h1>
          <p className="text-white/80">
            Understanding resonance phenomena and avoiding dangerous conditions in building electrical systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Resonant frequency:</strong> f0 = 1/(2pi x sqrt(LC)) where XL = XC</li>
              <li className="pl-1"><strong>Series resonance:</strong> Minimum impedance, maximum current</li>
              <li className="pl-1"><strong>Parallel resonance:</strong> Maximum impedance, minimum current</li>
              <li className="pl-1"><strong>Q factor:</strong> Determines sharpness and magnification</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>PFC hazards:</strong> Harmonic resonance with capacitor banks</li>
              <li className="pl-1"><strong>VSD drives:</strong> Generate harmonics that excite resonance</li>
              <li className="pl-1"><strong>Detuning reactors:</strong> Prevent dangerous resonance</li>
              <li className="pl-1"><strong>Switching transients:</strong> Capacitor inrush protection</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate resonant frequency using f0 = 1/(2pi x sqrt(LC))",
              "Distinguish between series and parallel resonance effects",
              "Apply Q factor to determine bandwidth and magnification",
              "Understand voltage magnification dangers in series resonance",
              "Analyse harmonic resonance risks with PFC capacitors",
              "Specify detuning reactors to avoid resonance problems"
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

        {/* Section 1: Series Resonance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Series Resonance - The Acceptor Circuit
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Series resonance occurs when a resistor, inductor, and capacitor are connected in series and the
              supply frequency matches the circuit's natural resonant frequency. At resonance, the inductive
              and capacitive reactances are equal and opposite, leaving only resistance to limit current.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Resonant Frequency Formula</p>
              <p className="font-mono text-center text-xl mb-2">f<sub>0</sub> = 1 / (2pi x sqrt(LC))</p>
              <p className="text-xs text-white/70 text-center">Where L is inductance (H) and C is capacitance (F)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">At series resonance:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>XL = XC</strong> - Reactances are equal and cancel</li>
                <li className="pl-1"><strong>Z = R</strong> - Impedance is minimum (purely resistive)</li>
                <li className="pl-1"><strong>I = V/R</strong> - Current is maximum</li>
                <li className="pl-1"><strong>Phase angle = 0 degrees</strong> - Voltage and current in phase (unity pf)</li>
                <li className="pl-1"><strong>VL = VC</strong> - Equal voltages across L and C (but 180 degrees opposed)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Series Resonance Characteristics</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Below Resonance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">At Resonance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Above Resonance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Circuit behaviour</td>
                      <td className="border border-white/10 px-3 py-2">Capacitive (XC &gt; XL)</td>
                      <td className="border border-white/10 px-3 py-2">Resistive (XL = XC)</td>
                      <td className="border border-white/10 px-3 py-2">Inductive (XL &gt; XC)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Impedance</td>
                      <td className="border border-white/10 px-3 py-2">Higher than R</td>
                      <td className="border border-white/10 px-3 py-2">Minimum = R</td>
                      <td className="border border-white/10 px-3 py-2">Higher than R</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Current</td>
                      <td className="border border-white/10 px-3 py-2">Less than maximum</td>
                      <td className="border border-white/10 px-3 py-2">Maximum = V/R</td>
                      <td className="border border-white/10 px-3 py-2">Less than maximum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase angle</td>
                      <td className="border border-white/10 px-3 py-2">Current leads voltage</td>
                      <td className="border border-white/10 px-3 py-2">0 degrees (in phase)</td>
                      <td className="border border-white/10 px-3 py-2">Current lags voltage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Warning: Voltage Magnification</p>
              <p className="text-sm text-white">
                At series resonance, the voltage across the inductor or capacitor can be many times greater
                than the supply voltage: <strong>VL = VC = Q x VS</strong>. With Q factors of 20-50 common
                in power circuits, a 230V supply can create over 10,000V across components, causing insulation
                breakdown and catastrophic failure.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Series resonance is called the "acceptor" circuit because at resonance
              it readily accepts current (minimum opposition). This makes it dangerous in power systems where
              harmonic currents can be greatly amplified.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Parallel Resonance and Quality Factor */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Parallel Resonance and Quality Factor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Parallel resonance occurs when an inductor and capacitor are connected in parallel. At resonance,
              the circuit presents maximum impedance to the supply, drawing minimum current. However, a large
              circulating current flows between the inductor and capacitor internally.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dynamic Impedance (Parallel Resonance)</p>
              <p className="font-mono text-center text-xl mb-2">Z<sub>d</sub> = L / (CR)</p>
              <p className="text-xs text-white/70 text-center">Where R is the coil resistance (the capacitor is assumed ideal)</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Parallel Resonance Characteristics</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Impedance is maximum (Zd)</li>
                  <li className="pl-1">Supply current is minimum</li>
                  <li className="pl-1">Power factor is unity</li>
                  <li className="pl-1">Circulating current = Q x supply current</li>
                  <li className="pl-1">Also called "rejector" circuit</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Values</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Zd can reach several kilohms</li>
                  <li className="pl-1">Power system Q: typically 10-50</li>
                  <li className="pl-1">Radio frequency Q: can exceed 100</li>
                  <li className="pl-1">Higher Q = sharper resonance</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Factor (Q)</p>
              <p className="text-sm text-white mb-4">
                The quality factor Q indicates how "sharp" or selective the resonance is. Higher Q means narrower
                bandwidth and greater magnification of voltages or currents at resonance.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Q Factor Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Expression</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">From reactance</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">Q = XL/R = XC/R</td>
                      <td className="border border-white/10 px-3 py-2">At resonance (XL = XC)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">From L and C</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">Q = (1/R) x sqrt(L/C)</td>
                      <td className="border border-white/10 px-3 py-2">Component values known</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">From resonance</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">Q = omega0 x L/R = 1/(omega0 x CR)</td>
                      <td className="border border-white/10 px-3 py-2">Angular frequency known</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">From bandwidth</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">Q = f0/B</td>
                      <td className="border border-white/10 px-3 py-2">Bandwidth measured</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bandwidth and Selectivity</p>
              <p className="font-mono text-center text-lg mb-2">Bandwidth B = f<sub>0</sub>/Q = f<sub>2</sub> - f<sub>1</sub></p>
              <p className="text-xs text-white/70 text-center mb-3">Where f1 and f2 are the half-power (-3dB) frequencies</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Q = 10</p>
                  <p className="text-white/70 text-xs">B = 5 Hz (at 50 Hz)</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Q = 25</p>
                  <p className="text-white/70 text-xs">B = 2 Hz (at 50 Hz)</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Q = 50</p>
                  <p className="text-white/70 text-xs">B = 1 Hz (at 50 Hz)</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design insight:</strong> High Q circuits are more selective but also more dangerous - they
              amplify signals within a very narrow frequency band by a very large factor. In power systems, we
              generally want lower Q to reduce the risk of severe resonance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Voltage and Current Magnification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Voltage and Current Magnification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              One of the most important and potentially dangerous aspects of resonance is magnification.
              At resonance, voltages or currents within the circuit can be many times larger than the
              source values - a critical consideration for power system design.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Series Resonance: Voltage Magnification</p>
                <p className="font-mono text-center text-lg mb-2">V<sub>L</sub> = V<sub>C</sub> = Q x V<sub>S</sub></p>
                <p className="text-xs text-white/70 text-center">Voltage across L or C is Q times supply voltage</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Parallel Resonance: Current Magnification</p>
                <p className="font-mono text-center text-lg mb-2">I<sub>L</sub> = I<sub>C</sub> = Q x I<sub>S</sub></p>
                <p className="text-xs text-white/70 text-center">Circulating current is Q times supply current</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Magnification Examples</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Q Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Supply (230V)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Component Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Q = 10</td>
                      <td className="border border-white/10 px-3 py-2">230V</td>
                      <td className="border border-white/10 px-3 py-2">2,300V</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Moderate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Q = 25</td>
                      <td className="border border-white/10 px-3 py-2">230V</td>
                      <td className="border border-white/10 px-3 py-2">5,750V</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">High</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Q = 50</td>
                      <td className="border border-white/10 px-3 py-2">230V</td>
                      <td className="border border-white/10 px-3 py-2">11,500V</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Extreme</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Q = 30</td>
                      <td className="border border-white/10 px-3 py-2">400V (3-ph)</td>
                      <td className="border border-white/10 px-3 py-2">12,000V</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Extreme</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why magnification is dangerous in power systems:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Insulation breakdown:</strong> Component voltages exceed design ratings</li>
                <li className="pl-1"><strong>Capacitor failure:</strong> Dielectric stress causes premature ageing or explosion</li>
                <li className="pl-1"><strong>Overcurrent:</strong> Harmonic currents amplified beyond conductor ratings</li>
                <li className="pl-1"><strong>Heating:</strong> I squared R losses increase dramatically at elevated currents</li>
                <li className="pl-1"><strong>Protection maloperation:</strong> Unexpected tripping or failure to trip</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Harmonic Magnification</p>
              <p className="text-sm text-white">
                When a system resonates at a harmonic frequency, that specific harmonic is amplified by the
                Q factor. A 5th harmonic voltage of just 5V could become 5V x 30 = 150V if Q = 30. This adds
                to the fundamental, distorting the waveform and stressing equipment.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical point:</strong> Always check if the system resonant frequency coincides with
              any significant harmonic present in the installation. Even small harmonic sources can cause
              major problems when amplified by resonance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Practical Resonance Issues in Building Services */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical Resonance Issues in Building Services
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building electrical systems face several resonance-related challenges, particularly where
              power factor correction capacitors interact with transformer and cable inductance in the
              presence of harmonic-producing loads like VSD drives and LED drivers.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Resonant Frequency Calculation</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-mono text-center text-lg mb-2">f<sub>r</sub> = f<sub>1</sub> x sqrt(S<sub>sc</sub> / Q<sub>c</sub>)</p>
                <p className="text-xs text-white/70 text-center mb-3">
                  Where f1 = 50 Hz, Ssc = short-circuit power (MVA), Qc = capacitor rating (MVAr)
                </p>
                <p className="text-sm text-white">
                  <strong>Example:</strong> With Ssc = 25 MVA and Qc = 0.5 MVAr:
                  fr = 50 x sqrt(25/0.5) = 50 x sqrt(50) = 50 x 7.07 = <strong>354 Hz</strong> (near 7th harmonic!)
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Harmonic Sources in Buildings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Dominant Harmonics</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequencies (Hz)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VSD drives (6-pulse)</td>
                      <td className="border border-white/10 px-3 py-2">5th, 7th, 11th, 13th</td>
                      <td className="border border-white/10 px-3 py-2">250, 350, 550, 650</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UPS systems</td>
                      <td className="border border-white/10 px-3 py-2">5th, 7th, 11th</td>
                      <td className="border border-white/10 px-3 py-2">250, 350, 550</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED drivers</td>
                      <td className="border border-white/10 px-3 py-2">3rd, 5th, 7th</td>
                      <td className="border border-white/10 px-3 py-2">150, 250, 350</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Computer loads</td>
                      <td className="border border-white/10 px-3 py-2">3rd, 5th</td>
                      <td className="border border-white/10 px-3 py-2">150, 250</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fluorescent lighting</td>
                      <td className="border border-white/10 px-3 py-2">3rd</td>
                      <td className="border border-white/10 px-3 py-2">150</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Capacitor Switching Transients</p>
              <p className="text-sm text-white mb-3">
                Switching PFC capacitors onto a supply creates severe transient conditions that can damage
                equipment and disturb sensitive loads.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Inrush current:</strong> Can reach 20-30x rated current without limiting</li>
                <li className="pl-1"><strong>Voltage transients:</strong> Up to 2x peak voltage on energisation</li>
                <li className="pl-1"><strong>Back-to-back switching:</strong> Even worse when switching with other capacitors online</li>
                <li className="pl-1"><strong>High frequency oscillation:</strong> kHz-range transients stress insulation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Solutions: Detuning Reactors</p>
              <p className="text-sm text-white mb-3">
                Detuning reactors prevent harmonic resonance by shifting the system resonant frequency below
                the lowest significant harmonic.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Reactor Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Tuning Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7% reactor</td>
                      <td className="border border-white/10 px-3 py-2">189 Hz (3.78th)</td>
                      <td className="border border-white/10 px-3 py-2">Standard - below 5th harmonic</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">14% reactor</td>
                      <td className="border border-white/10 px-3 py-2">134 Hz (2.68th)</td>
                      <td className="border border-white/10 px-3 py-2">Heavy harmonics - below 3rd</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5.67% reactor</td>
                      <td className="border border-white/10 px-3 py-2">210 Hz (4.2th)</td>
                      <td className="border border-white/10 px-3 py-2">Low harmonics - just below 5th</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use Detuned Capacitors</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">VSD drives exceed 20% of transformer capacity</li>
                <li className="pl-1">Total harmonic distortion (THD) exceeds 5%</li>
                <li className="pl-1">LED lighting forms a significant load</li>
                <li className="pl-1">UPS systems or data centre loads present</li>
                <li className="pl-1">Previous capacitor failures or nuisance tripping</li>
                <li className="pl-1">Capacitor bank total exceeds 30% of transformer kVA</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Real-World Failure Scenario</p>
              <p className="text-sm text-white">
                A commercial building installed 150 kVAr of standard (non-detuned) PFC capacitors. With VSD
                drives on the HVAC system, the 5th harmonic current was amplified by resonance. Within 6 months,
                all capacitors failed due to overheating. The solution required detuned capacitors with 7%
                reactors, at 40% higher cost but with reliable operation thereafter.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Always conduct a harmonic study before installing PFC capacitors
              in buildings with significant non-linear loads. The cost of detuned capacitors is far less than
              the cost of failures and replacements.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Series Resonant Frequency</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the resonant frequency of a series circuit with L = 50mH and C = 20uF.
                Also determine the Q factor if R = 5 ohms.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Calculate resonant frequency</p>
                <p>f0 = 1/(2pi x sqrt(LC))</p>
                <p>f0 = 1/(2pi x sqrt(0.05 x 0.00002))</p>
                <p>f0 = 1/(2pi x sqrt(0.000001))</p>
                <p>f0 = 1/(2pi x 0.001) = 1/0.00628</p>
                <p>f0 = <strong>159.2 Hz</strong></p>
                <p className="mt-2">Step 2: Calculate XL at resonance</p>
                <p>XL = 2pi x f0 x L = 2pi x 159.2 x 0.05 = <strong>50 ohms</strong></p>
                <p className="mt-2">Step 3: Calculate Q factor</p>
                <p>Q = XL/R = 50/5 = <strong>Q = 10</strong></p>
                <p className="mt-2 text-white/60">Bandwidth B = f0/Q = 159.2/10 = 15.9 Hz</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Voltage Magnification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A series RLC circuit has Q = 25 and is connected to a 230V supply at resonance.
                Calculate the voltage across the capacitor and assess the risk.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Voltage magnification at resonance:</p>
                <p>VC = Q x VS</p>
                <p>VC = 25 x 230V</p>
                <p>VC = <strong>5,750V</strong></p>
                <p className="mt-2">Assessment:</p>
                <p>- This voltage far exceeds LV ratings</p>
                <p>- Standard capacitors rated 400-450V would fail</p>
                <p>- Insulation breakdown likely</p>
                <p className="mt-2 text-red-400">EXTREME RISK - resonance must be avoided</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: System Resonance with PFC</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 1000 kVA transformer has Uk = 6% and supplies 200 kVAr of PFC capacitors.
                Calculate the system resonant frequency and assess the risk.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Calculate short-circuit power</p>
                <p>Ssc = S x (100/Uk%) = 1000 x (100/6)</p>
                <p>Ssc = <strong>16,667 kVA = 16.67 MVA</strong></p>
                <p className="mt-2">Step 2: Calculate resonant frequency</p>
                <p>fr = f1 x sqrt(Ssc/Qc)</p>
                <p>fr = 50 x sqrt(16667/200)</p>
                <p>fr = 50 x sqrt(83.3) = 50 x 9.13</p>
                <p>fr = <strong>456 Hz</strong></p>
                <p className="mt-2">Step 3: Assess harmonic risk</p>
                <p>456 Hz / 50 Hz = 9.1 (near 9th harmonic)</p>
                <p className="mt-2 text-yellow-400">MODERATE RISK - 9th harmonic is less common</p>
                <p className="text-white/60">but if VSD drives present, use detuned capacitors</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Detuning Reactor Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 100 kVAr capacitor bank operates at 400V. Size a 7% detuning reactor
                and verify the tuning frequency.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Calculate capacitor current</p>
                <p>IC = Qc/(sqrt(3) x V) = 100,000/(1.732 x 400)</p>
                <p>IC = <strong>144.3 A</strong></p>
                <p className="mt-2">Step 2: Calculate capacitive reactance</p>
                <p>XC = V/(sqrt(3) x IC) = 400/(1.732 x 144.3)</p>
                <p>XC = <strong>1.60 ohms per phase</strong></p>
                <p className="mt-2">Step 3: Calculate reactor reactance (7%)</p>
                <p>XL = 0.07 x XC = 0.07 x 1.60</p>
                <p>XL = <strong>0.112 ohms</strong></p>
                <p className="mt-2">Step 4: Verify tuning frequency</p>
                <p>Tuning factor p = sqrt(XL/XC) = sqrt(0.07) = 0.265</p>
                <p>fr = f1/p = 50/0.265 = <strong>189 Hz</strong></p>
                <p className="mt-2 text-green-400">Safely below 5th harmonic (250 Hz)</p>
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
                <li className="pl-1"><strong>f0 = 1/(2pi x sqrt(LC))</strong> - Resonant frequency</li>
                <li className="pl-1"><strong>Q = XL/R = XC/R</strong> - Quality factor</li>
                <li className="pl-1"><strong>B = f0/Q</strong> - Bandwidth</li>
                <li className="pl-1"><strong>VL = VC = Q x VS</strong> - Series voltage magnification</li>
                <li className="pl-1"><strong>Zd = L/(CR)</strong> - Parallel dynamic impedance</li>
                <li className="pl-1"><strong>fr = f1 x sqrt(Ssc/Qc)</strong> - System resonant frequency</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">5th harmonic: <strong>250 Hz</strong> (most common)</li>
                <li className="pl-1">7th harmonic: <strong>350 Hz</strong> (significant with VSDs)</li>
                <li className="pl-1">7% reactor tunes to: <strong>189 Hz</strong></li>
                <li className="pl-1">14% reactor tunes to: <strong>134 Hz</strong></li>
                <li className="pl-1">Power system Q: typically <strong>10-50</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">PFC Capacitor Selection Guidelines</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Standard capacitors:</strong> Only for linear loads (resistive heating, incandescent)</li>
                <li className="pl-1"><strong>7% detuned:</strong> VSDs less than 40% of load, moderate harmonics</li>
                <li className="pl-1"><strong>14% detuned:</strong> VSDs greater than 40% of load, high harmonics, LED lighting</li>
                <li className="pl-1"><strong>Active filters:</strong> Very high harmonic content, strict THD limits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Installing standard PFC with VSD loads</strong> - Resonance risk</li>
                <li className="pl-1"><strong>Ignoring harmonic assessment</strong> - Required before PFC installation</li>
                <li className="pl-1"><strong>Undersizing detuning reactors</strong> - Must handle harmonic currents</li>
                <li className="pl-1"><strong>Wrong units in calculations</strong> - L in Henrys, C in Farads</li>
                <li className="pl-1"><strong>Forgetting capacitor voltage rating</strong> - Must be higher with detuning</li>
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
                <p className="font-medium text-white mb-1">Series Resonance</p>
                <ul className="space-y-0.5">
                  <li>Impedance minimum (Z = R)</li>
                  <li>Current maximum (I = V/R)</li>
                  <li>Voltage magnification (VL = VC = Q x V)</li>
                  <li>"Acceptor" circuit</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Parallel Resonance</p>
                <ul className="space-y-0.5">
                  <li>Impedance maximum (Zd = L/CR)</li>
                  <li>Supply current minimum</li>
                  <li>Current magnification (IL = IC = Q x IS)</li>
                  <li>"Rejector" circuit</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Harmonic Frequencies</p>
                <ul className="space-y-0.5">
                  <li>3rd: 150 Hz (triplen)</li>
                  <li>5th: 250 Hz (VSD dominant)</li>
                  <li>7th: 350 Hz (VSD)</li>
                  <li>11th: 550 Hz</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Detuning Solutions</p>
                <ul className="space-y-0.5">
                  <li>7% reactor: fr = 189 Hz</li>
                  <li>14% reactor: fr = 134 Hz</li>
                  <li>Capacitor rating: increase by reactor %</li>
                  <li>Always for VSD greater than 20% load</li>
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
            <Link to="../h-n-c-module3-section2-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Power in AC Circuits
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section2-7">
              Next: AC Circuit Analysis
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section2_6;
