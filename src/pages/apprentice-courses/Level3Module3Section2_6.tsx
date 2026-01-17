import { ArrowLeft, ArrowRight, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const quickCheckQuestions = [
  {
    question: "At resonance in a series RLC circuit, what is the relationship between XL and XC?",
    options: ["XL &gt; XC", "XL &lt; XC", "XL = XC", "XL + XC = R"],
    correctIndex: 2,
    explanation: "At resonance, inductive reactance equals capacitive reactance (XL = XC). They cancel each other out, leaving only resistance to limit current flow."
  },
  {
    question: "What happens to impedance at series resonance?",
    options: ["Impedance is maximum", "Impedance equals zero", "Impedance equals R (minimum)", "Impedance equals XL + XC"],
    correctIndex: 2,
    explanation: "At series resonance, XL and XC cancel (X = 0), so impedance Z = sqrt(R^2 + 0^2) = R. This is the minimum possible impedance, causing maximum current."
  },
  {
    question: "Calculate the resonant frequency for L = 100 mH and C = 10 microfarads.",
    options: ["159 Hz", "318 Hz", "50 Hz", "100 Hz"],
    correctIndex: 0,
    explanation: "f0 = 1 / (2 x pi x sqrt(LC)) = 1 / (2 x 3.142 x sqrt(0.1 x 0.00001)) = 1 / (2 x 3.142 x 0.001) = 159 Hz."
  },
  {
    question: "In a parallel resonant circuit, what happens to the line current at resonance?",
    options: ["Current is maximum", "Current is minimum", "Current equals zero", "Current equals supply voltage"],
    correctIndex: 1,
    explanation: "At parallel resonance, the impedance is maximum and the line current is minimum. The circulating current between L and C can be much higher than the line current."
  }
];

const quizQuestions = [
  {
    question: "What is the resonant frequency of a circuit with L = 50 mH and C = 20 microfarads?",
    options: ["159 Hz", "225 Hz", "318 Hz", "100 Hz"],
    correctIndex: 0,
    explanation: "f0 = 1 / (2 x pi x sqrt(LC)) = 1 / (2 x 3.142 x sqrt(0.05 x 0.00002)) = 1 / (6.284 x 0.001) = 159 Hz."
  },
  {
    question: "A series RLC circuit has R = 10 ohms, L = 0.1 H and C = 100 microfarads. What is the Q-factor?",
    options: ["1", "3.16", "10", "31.6"],
    correctIndex: 1,
    explanation: "Q = (1/R) x sqrt(L/C) = (1/10) x sqrt(0.1/0.0001) = 0.1 x sqrt(1000) = 0.1 x 31.6 = 3.16. Alternatively Q = XL/R at resonance."
  },
  {
    question: "At series resonance, if the supply voltage is 100V and R = 20 ohms, what is the current?",
    options: ["2 A", "5 A", "0 A", "Cannot be determined"],
    correctIndex: 1,
    explanation: "At series resonance, Z = R. Therefore I = V/Z = V/R = 100/20 = 5 A. The reactances cancel, leaving only resistance."
  },
  {
    question: "What is the bandwidth of a series resonant circuit with f0 = 1000 Hz and Q = 50?",
    options: ["20 Hz", "50 Hz", "100 Hz", "500 Hz"],
    correctIndex: 0,
    explanation: "Bandwidth BW = f0 / Q = 1000 / 50 = 20 Hz. This is the frequency range between the half-power points."
  },
  {
    question: "In a highly selective (high Q) tuned circuit, which statement is true?",
    options: ["Bandwidth is wide", "Response curve is flat", "Bandwidth is narrow", "Q-factor is low"],
    correctIndex: 2,
    explanation: "High Q means high selectivity - the circuit responds strongly to a narrow range of frequencies. Higher Q gives narrower bandwidth (BW = f0/Q)."
  },
  {
    question: "What is the dynamic impedance of a parallel resonant circuit with L = 100 mH, C = 100 microfarads and R = 5 ohms?",
    options: ["100 ohms", "200 ohms", "1000 ohms", "5 ohms"],
    correctIndex: 1,
    explanation: "Dynamic impedance Zd = L / (CR) = 0.1 / (0.0001 x 5) = 0.1 / 0.0005 = 200 ohms. This is the impedance at parallel resonance."
  },
  {
    question: "Which application uses series resonance to pass a specific frequency?",
    options: ["Rejector circuit", "Tank circuit", "Acceptor circuit", "Filter circuit"],
    correctIndex: 2,
    explanation: "Series resonant circuits are called acceptor circuits because they have minimum impedance at resonance, allowing maximum current at that frequency to pass."
  },
  {
    question: "At what frequency does a 2 H inductor have the same reactance as a 50 microfarad capacitor?",
    options: ["15.9 Hz", "50 Hz", "100 Hz", "159 Hz"],
    correctIndex: 0,
    explanation: "At resonance XL = XC, so f0 = 1 / (2 x pi x sqrt(LC)) = 1 / (2 x 3.142 x sqrt(2 x 0.00005)) = 1 / (6.284 x 0.01) = 15.9 Hz."
  },
  {
    question: "The Q-factor of a parallel resonant circuit is 40 and the resonant frequency is 2 kHz. What are the half-power frequencies?",
    options: ["1975 Hz and 2025 Hz", "1950 Hz and 2050 Hz", "1900 Hz and 2100 Hz", "1800 Hz and 2200 Hz"],
    correctIndex: 1,
    explanation: "BW = f0/Q = 2000/40 = 50 Hz. Half-power frequencies are f0 +/- BW/2 = 2000 +/- 25 = 1975 Hz and 2025 Hz. Actually BW/2 = 25 Hz each side."
  },
  {
    question: "Why are parallel resonant circuits called rejector circuits?",
    options: ["They reject all frequencies", "They have maximum impedance at resonance, rejecting that frequency", "They reject DC", "They reject harmonics only"],
    correctIndex: 1,
    explanation: "At parallel resonance, impedance is maximum, so current at the resonant frequency is minimum (rejected). Frequencies away from resonance pass more easily."
  },
  {
    question: "If the capacitance in a tuned circuit is increased, what happens to the resonant frequency?",
    options: ["Increases", "Decreases", "Stays the same", "Becomes zero"],
    correctIndex: 1,
    explanation: "f0 = 1 / (2 x pi x sqrt(LC)). Increasing C increases sqrt(LC), which decreases f0. Resonant frequency is inversely proportional to sqrt(C)."
  },
  {
    question: "A series resonant circuit has a bandwidth of 100 Hz and resonant frequency of 5 kHz. What is the Q-factor?",
    options: ["20", "50", "100", "500"],
    correctIndex: 1,
    explanation: "Q = f0 / BW = 5000 / 100 = 50. The Q-factor indicates how selective or 'sharp' the resonance peak is."
  }
];

const faqItems = [
  {
    question: "What causes resonance in AC circuits?",
    answer: "Resonance occurs when inductive reactance (XL) equals capacitive reactance (XC) at a specific frequency. At this point, energy oscillates between the inductor's magnetic field and the capacitor's electric field. The frequency at which this occurs depends only on the values of L and C, not on the resistance in the circuit."
  },
  {
    question: "What is the difference between series and parallel resonance?",
    answer: "In series resonance, impedance is minimum (equal to R) and current is maximum - these are called acceptor circuits. In parallel resonance, impedance is maximum and line current is minimum - these are called rejector circuits. Both occur at the same frequency for given L and C values, but their effects on circuit behaviour are opposite."
  },
  {
    question: "What is Q-factor and why is it important?",
    answer: "Q-factor (Quality factor) indicates how 'sharp' or selective a resonant circuit is. High Q means narrow bandwidth and sharp frequency response - the circuit responds strongly only to frequencies very close to resonance. Q is the ratio of reactive power to resistive power, or XL/R at resonance. It affects bandwidth (BW = f0/Q) and voltage magnification in series circuits."
  },
  {
    question: "How is resonance used in practical applications?",
    answer: "Resonance is fundamental to radio and TV tuning (selecting specific frequencies), filters (passing or blocking frequency ranges), oscillators (generating specific frequencies), wireless power transfer, and metal detectors. In power systems, resonance can be dangerous if it occurs at harmonic frequencies, causing voltage amplification and equipment damage."
  },
  {
    question: "What is voltage magnification at series resonance?",
    answer: "At series resonance, the voltage across the inductor or capacitor can be much greater than the supply voltage. The voltage magnification factor equals Q, so VL = VC = Q x VS. For example, with Q = 50 and 10V supply, the voltage across L or C could be 500V. This is why high-Q circuits require careful voltage rating of components."
  },
  {
    question: "How can unwanted resonance be prevented in electrical installations?",
    answer: "Unwanted resonance can be prevented by: avoiding combinations of capacitance and inductance that resonate at harmonic frequencies, using detuned power factor correction capacitors, installing harmonic filters, and ensuring adequate damping (resistance) in the circuit. In switchgear, ferroresonance with voltage transformers must be considered."
  }
];

const Level3Module3Section2_6 = () => {
  useSEO(
    "Resonance in AC Circuits - Level 3 Electrical Science | Elec-Mate",
    "Master series and parallel resonance, resonant frequency calculations, Q-factor and bandwidth concepts. Understand practical applications of tuned circuits for City & Guilds Level 3 electrical qualifications."
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/level3-module3-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
          <span className="text-sm font-bold text-white bg-green-600 rounded-full px-3 py-1">
            Level 3 Module 3
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
          2.6 Resonance in AC Circuits
        </h1>
        <p className="text-xl text-white/70 mb-8">
          Understanding the phenomenon of resonance, where energy oscillates between inductance and capacitance at a specific frequency
        </p>

        {/* Quick Summary Box */}
        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Summary
          </h3>
          <ul className="text-white/80 space-y-2">
            <li>Resonance occurs when XL = XC, at frequency f0 = 1 / (2 x pi x sqrt(LC))</li>
            <li>Series resonance: minimum impedance (Z = R), maximum current - acceptor circuit</li>
            <li>Parallel resonance: maximum impedance, minimum current - rejector circuit</li>
            <li>Q-factor determines selectivity and bandwidth: BW = f0 / Q</li>
            <li>Voltage magnification at series resonance: VL = VC = Q x VS</li>
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Learning Outcomes</h3>
          <ul className="text-white/80 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Explain the conditions required for resonance to occur in AC circuits
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Calculate resonant frequency from inductance and capacitance values
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Distinguish between series resonance (acceptor) and parallel resonance (rejector) circuits
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Determine Q-factor, bandwidth and selectivity of resonant circuits
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Apply resonance principles to practical applications including tuning and filtering
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Identify potential hazards from unwanted resonance in electrical installations
            </li>
          </ul>
        </div>

        {/* Main Content Sections */}
        <div className="prose prose-invert max-w-none">
          {/* Section 1 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
              The Resonance Phenomenon
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                <strong>Resonance</strong> is a special condition in AC circuits containing both inductance and capacitance where the inductive reactance (XL) equals the capacitive reactance (XC). At this specific frequency, energy continuously oscillates between the magnetic field of the inductor and the electric field of the capacitor.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Resonant Frequency Formula</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">f0 = 1 / (2 x pi x sqrt(L x C))</p>
                <p className="text-white/80 text-sm">Where f0 = resonant frequency (Hz), L = inductance (H), C = capacitance (F)</p>
              </div>

              <p className="text-white/80 mb-4">
                This formula is derived from setting XL = XC:
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-2">At resonance: 2 x pi x f x L = 1 / (2 x pi x f x C)</p>
                <p className="text-white/80 mb-2">Rearranging: (2 x pi x f)^2 = 1 / (L x C)</p>
                <p className="text-white/80">Therefore: f = 1 / (2 x pi x sqrt(LC))</p>
              </div>

              <p className="text-white/80 mb-4">
                Key characteristics of resonance:
              </p>
              <ul className="text-white/80 space-y-2 mb-4">
                <li>Resonant frequency depends only on L and C values, not on resistance</li>
                <li>At resonance, voltage and current are in phase (unity power factor)</li>
                <li>Energy oscillates between inductor and capacitor at twice the resonant frequency</li>
                <li>The amplitude of oscillation depends on how much resistance (damping) is present</li>
              </ul>

              <InlineCheck
                question="A tuned circuit has L = 200 mH and C = 50 nF. What is the resonant frequency?"
                options={["1,592 Hz", "15.92 Hz", "159.2 Hz", "50 Hz"]}
                correctIndex={0}
                explanation="f0 = 1 / (2 x pi x sqrt(0.2 x 50 x 10^-9)) = 1 / (2 x 3.142 x sqrt(10^-8)) = 1 / (6.284 x 10^-4) = 1,592 Hz."
              />
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
              Series Resonance - Acceptor Circuits
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                In a <strong>series RLC circuit</strong> at resonance, the inductive and capacitive reactances cancel each other out (XL - XC = 0), leaving only the resistance to limit current flow.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Characteristics at Series Resonance</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Impedance Minimum</h5>
                  <p className="text-white/70 text-sm mb-2">Z = sqrt(R^2 + (XL - XC)^2) = sqrt(R^2 + 0) = R</p>
                  <p className="text-white/70 text-sm">Impedance equals resistance only - its minimum possible value.</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Current Maximum</h5>
                  <p className="text-white/70 text-sm mb-2">I = V / Z = V / R</p>
                  <p className="text-white/70 text-sm">Current is limited only by R, reaching its maximum value.</p>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Voltage Magnification</h4>
              <p className="text-white/80 mb-4">
                At series resonance, the voltage across the inductor or capacitor can be much greater than the supply voltage. This is called <strong>voltage magnification</strong>.
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-green-400 font-mono mb-2">VL = VC = I x XL = (V/R) x XL = Q x V</p>
                <p className="text-white/80 text-sm">Where Q = XL/R is the magnification factor (Q-factor)</p>
              </div>

              <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 mb-4">
                <h5 className="font-semibold text-yellow-400 mb-2">Warning: High Voltage Hazard</h5>
                <p className="text-white/80 text-sm">
                  With a Q-factor of 100 and a 230V supply, the voltage across L or C could reach 23,000V! Components must be rated for these magnified voltages, not just the supply voltage.
                </p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Why "Acceptor Circuit"?</h4>
              <p className="text-white/80 mb-4">
                Series resonant circuits are called <strong>acceptor circuits</strong> because they have minimum impedance at the resonant frequency, allowing maximum current to flow - they "accept" the resonant frequency while impeding others. This property is used in radio tuning to select specific stations.
              </p>

              <InlineCheck
                question="A series circuit has R = 5 ohms, XL = XC = 100 ohms at resonance. With 10V supply, what is VL?"
                options={["10 V", "100 V", "200 V", "500 V"]}
                correctIndex={2}
                explanation="At resonance, I = V/R = 10/5 = 2A. VL = I x XL = 2 x 100 = 200V. The Q-factor = XL/R = 100/5 = 20, so VL = Q x V = 20 x 10 = 200V."
              />
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
              Parallel Resonance - Rejector Circuits
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                In a <strong>parallel resonant circuit</strong> (also called a tank circuit), the inductor and capacitor are connected in parallel. At resonance, the behaviour is opposite to series resonance - impedance is maximum and line current is minimum.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Characteristics at Parallel Resonance</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Impedance Maximum</h5>
                  <p className="text-white/70 text-sm mb-2">Dynamic Impedance Zd = L / (C x R)</p>
                  <p className="text-white/70 text-sm">Impedance reaches its maximum value at resonance.</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Line Current Minimum</h5>
                  <p className="text-white/70 text-sm mb-2">IL = V / Zd (minimum)</p>
                  <p className="text-white/70 text-sm">Current drawn from supply is minimum at resonance.</p>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Circulating Current</h4>
              <p className="text-white/80 mb-4">
                Although line current is minimum, a large <strong>circulating current</strong> flows between the inductor and capacitor. This current can be Q times the line current:
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-green-400 font-mono mb-2">Circulating current = Q x Line current</p>
                <p className="text-white/80 text-sm">Energy oscillates between L and C without being drawn from the supply</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Why "Rejector Circuit"?</h4>
              <p className="text-white/80 mb-4">
                Parallel resonant circuits are called <strong>rejector circuits</strong> because they have maximum impedance at the resonant frequency, blocking or rejecting current at that frequency while allowing other frequencies to pass. They are used in filters to remove unwanted frequencies.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Practical Parallel Resonant Circuit</h4>
              <p className="text-white/80 mb-4">
                In practical circuits, the inductor has resistance that affects the resonant behaviour. For a practical parallel circuit with inductor resistance r:
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-2"><strong>Dynamic impedance:</strong> Zd = L / (C x r)</p>
                <p className="text-white/80 mb-2"><strong>Resonant frequency:</strong> f0 = (1 / 2pi) x sqrt(1/LC - r^2/L^2)</p>
                <p className="text-white/70 text-sm">When r is small compared to sqrt(L/C), the simple formula f0 = 1/(2pi x sqrt(LC)) applies</p>
              </div>

              <InlineCheck
                question="A parallel resonant circuit has L = 50 mH, C = 20 microfarads and r = 10 ohms. What is the dynamic impedance?"
                options={["25 ohms", "250 ohms", "2,500 ohms", "50 ohms"]}
                correctIndex={1}
                explanation="Zd = L / (C x r) = 0.05 / (0.00002 x 10) = 0.05 / 0.0002 = 250 ohms. This is the impedance presented at resonance."
              />
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
              Q-Factor and Bandwidth
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                The <strong>Quality factor (Q)</strong> of a resonant circuit indicates its selectivity - how sharply it responds to frequencies near resonance. A high Q circuit has a narrow, sharp response; a low Q circuit has a broad, flat response.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Q-Factor Formulas</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-2"><strong>Series resonant circuit:</strong></p>
                <p className="text-green-400 font-mono mb-3">Q = XL / R = (2 x pi x f0 x L) / R = (1 / R) x sqrt(L / C)</p>
                <p className="text-white/80 mb-2"><strong>Parallel resonant circuit:</strong></p>
                <p className="text-green-400 font-mono">Q = R / XL = R x sqrt(C / L)</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Bandwidth</h4>
              <p className="text-white/80 mb-4">
                <strong>Bandwidth (BW)</strong> is the range of frequencies between the two half-power points - where the power falls to half its maximum value (or current/voltage to 0.707 of maximum):
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">Bandwidth = f0 / Q</p>
                <p className="text-white/80 text-sm">Also: BW = f2 - f1 where f1 and f2 are the half-power frequencies</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">High Q (Sharp Tuning)</h5>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>Narrow bandwidth</li>
                    <li>High selectivity</li>
                    <li>High voltage/current magnification</li>
                    <li>Used for precise frequency selection</li>
                    <li>Example: Radio tuner (Q = 100+)</li>
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Low Q (Broad Tuning)</h5>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>Wide bandwidth</li>
                    <li>Low selectivity</li>
                    <li>Lower magnification</li>
                    <li>Less affected by component tolerances</li>
                    <li>Example: Audio circuits (Q = 1-10)</li>
                  </ul>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Half-Power Frequencies</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-2">For a series resonant circuit:</p>
                <p className="text-green-400 font-mono mb-2">f1 = f0 - BW/2 (lower half-power frequency)</p>
                <p className="text-green-400 font-mono mb-2">f2 = f0 + BW/2 (upper half-power frequency)</p>
                <p className="text-white/80 text-sm mt-3">At f1 and f2: Current = 0.707 x I(max), Power = 0.5 x P(max)</p>
              </div>

              <InlineCheck
                question="A resonant circuit has f0 = 500 kHz and Q = 100. What is the bandwidth?"
                options={["5 Hz", "50 Hz", "500 Hz", "5 kHz"]}
                correctIndex={3}
                explanation="BW = f0 / Q = 500,000 / 100 = 5,000 Hz = 5 kHz. The half-power frequencies would be at 497.5 kHz and 502.5 kHz."
              />
            </div>
          </div>

          {/* Practical Guidance */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Practical Guidance</h2>
            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-yellow-400 mb-3">Applications and Hazards</h4>
              <ul className="text-white/80 space-y-2">
                <li><strong>Radio/TV tuning:</strong> Variable capacitor adjusts resonant frequency to select stations. Series resonance for maximum signal at desired frequency.</li>
                <li><strong>Filter circuits:</strong> Band-pass filters use series resonance, band-stop filters use parallel resonance to pass or reject specific frequency ranges.</li>
                <li><strong>Harmonic resonance:</strong> If PFC capacitors resonate with system inductance at a harmonic frequency, dangerous voltage magnification can occur. Use detuned capacitors (typically 7% reactor).</li>
                <li><strong>Ferroresonance:</strong> Non-linear resonance between transformer magnetising inductance and cable capacitance can cause overvoltages. Common issue with voltage transformers.</li>
                <li><strong>Induction heating:</strong> High-frequency resonant circuits generate heat in metal workpieces for hardening and welding applications.</li>
              </ul>
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className="bg-[#242424] rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">{faq.question}</h4>
                  <p className="text-white/70 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Reference */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Reference</h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Essential Formulas</h4>
                  <ul className="text-white/70 text-sm space-y-2 font-mono">
                    <li>f0 = 1 / (2 x pi x sqrt(LC))</li>
                    <li>At resonance: XL = XC</li>
                    <li>Q = XL / R (series)</li>
                    <li>Bandwidth = f0 / Q</li>
                    <li>VL = VC = Q x VS (series)</li>
                    <li>Zd = L / (CR) (parallel)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Key Comparisons</h4>
                  <table className="text-white/70 text-sm w-full">
                    <thead>
                      <tr>
                        <th className="text-left pb-2">Property</th>
                        <th className="text-left pb-2">Series</th>
                        <th className="text-left pb-2">Parallel</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Impedance</td>
                        <td>Minimum</td>
                        <td>Maximum</td>
                      </tr>
                      <tr>
                        <td>Current</td>
                        <td>Maximum</td>
                        <td>Minimum</td>
                      </tr>
                      <tr>
                        <td>Name</td>
                        <td>Acceptor</td>
                        <td>Rejector</td>
                      </tr>
                      <tr>
                        <td>Application</td>
                        <td>Pass freq</td>
                        <td>Block freq</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
          <p className="text-white/70 mb-4">Complete this quiz to check your understanding of resonance in AC circuits:</p>
          <Quiz questions={quizQuestions} moduleId="L3M3S2.6" />
        </div>

        {/* Quick Check Questions */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Check Questions</h2>
          <div className="space-y-4">
            {quickCheckQuestions.map((q, index) => (
              <InlineCheck
                key={index}
                question={q.question}
                options={q.options}
                correctIndex={q.correctIndex}
                explanation={q.explanation}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Button variant="outline" className="text-white border-white/30 hover:bg-white/10" asChild>
            <Link to="/study-centre/apprentice/level3-module3-section2-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Phase Angle and Power Factor
            </Link>
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
            <Link to="/study-centre/apprentice/level3-module3-section3">
              Next: Section 3 - Electromagnetism
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Level3Module3Section2_6;
