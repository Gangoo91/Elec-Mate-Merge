import { ArrowLeft, ArrowRight, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const quickCheckQuestions = [
  {
    question: "What is self-inductance?",
    options: ["Inductance between two separate coils", "The property of a coil to oppose changes in its own current", "The resistance of an inductor", "The capacitance of a coil"],
    correctIndex: 1,
    explanation: "Self-inductance is the property of a coil whereby a changing current induces an EMF in itself that opposes the change. It is measured in Henrys (H)."
  },
  {
    question: "A coil has inductance of 0.5 H. If current changes by 4A in 0.1s, what is the induced EMF?",
    options: ["2 V", "20 V", "0.2 V", "200 V"],
    correctIndex: 1,
    explanation: "e = L x (dI/dt) = 0.5 x (4/0.1) = 0.5 x 40 = 20 V. The induced EMF opposes the change in current."
  },
  {
    question: "What does the coefficient of coupling (k) represent?",
    options: ["Turns ratio between coils", "Fraction of flux from one coil linking another", "Total flux in the magnetic circuit", "Power transfer efficiency"],
    correctIndex: 1,
    explanation: "The coefficient of coupling k indicates what fraction of the magnetic flux from one coil links with another coil. k = 1 means perfect coupling, k = 0 means no coupling."
  },
  {
    question: "Two coils have L1 = 4H and L2 = 9H with k = 0.5. What is the mutual inductance?",
    options: ["3 H", "6.5 H", "13 H", "1.5 H"],
    correctIndex: 0,
    explanation: "M = k x sqrt(L1 x L2) = 0.5 x sqrt(4 x 9) = 0.5 x sqrt(36) = 0.5 x 6 = 3 H."
  }
];

const quizQuestions = [
  {
    question: "Calculate the inductance of a coil that stores 0.5 J of energy when carrying 2A.",
    options: ["0.125 H", "0.25 H", "0.5 H", "1 H"],
    correctIndex: 1,
    explanation: "Energy W = 0.5 x L x I squared. Therefore L = 2W / I squared = 2 x 0.5 / 4 = 0.25 H."
  },
  {
    question: "What is the time constant of a circuit with L = 2H and R = 40 ohms?",
    options: ["80 s", "20 s", "0.05 s", "0.02 s"],
    correctIndex: 2,
    explanation: "Time constant tau = L / R = 2 / 40 = 0.05 s = 50 ms. Current reaches 63.2% of final value in this time."
  },
  {
    question: "If mutual inductance between two coils is 0.2 H and current in one changes by 5A in 10ms, what EMF is induced in the other?",
    options: ["1 V", "10 V", "100 V", "0.1 V"],
    correctIndex: 2,
    explanation: "e = M x (dI/dt) = 0.2 x (5/0.01) = 0.2 x 500 = 100 V."
  },
  {
    question: "Two inductors of 3H and 6H are connected in series with aiding mutual inductance of 2H. What is the total inductance?",
    options: ["9 H", "11 H", "13 H", "5 H"],
    correctIndex: 2,
    explanation: "For series aiding: L(total) = L1 + L2 + 2M = 3 + 6 + 2(2) = 3 + 6 + 4 = 13 H."
  },
  {
    question: "An inductor has 500 turns, carries 2A and produces 0.01 Wb of flux. What is its inductance?",
    options: ["2.5 H", "25 H", "0.25 H", "5 H"],
    correctIndex: 0,
    explanation: "L = N x Phi / I = 500 x 0.01 / 2 = 5 / 2 = 2.5 H."
  },
  {
    question: "What happens to the coefficient of coupling when an air gap is introduced between coils?",
    options: ["Increases", "Decreases", "Stays the same", "Becomes unity"],
    correctIndex: 1,
    explanation: "An air gap increases leakage flux and reduces the flux linking both coils, decreasing the coefficient of coupling k."
  },
  {
    question: "After how many time constants does the current in an RL circuit reach approximately 99% of its final value?",
    options: ["3 time constants", "4 time constants", "5 time constants", "1 time constant"],
    correctIndex: 2,
    explanation: "After 5 time constants, current reaches 99.3% of final value. The 63.2% point is at 1 time constant, 86.5% at 2, 95% at 3, 98.2% at 4."
  },
  {
    question: "Two identical coils with L = 4H each have coupling coefficient k = 0.8. What is M?",
    options: ["3.2 H", "6.4 H", "1.6 H", "8 H"],
    correctIndex: 0,
    explanation: "M = k x sqrt(L1 x L2) = 0.8 x sqrt(4 x 4) = 0.8 x 4 = 3.2 H."
  },
  {
    question: "The same two 4H coils are connected in series opposing. What is the total inductance?",
    options: ["8 H", "14.4 H", "1.6 H", "0.8 H"],
    correctIndex: 2,
    explanation: "For series opposing: L(total) = L1 + L2 - 2M = 4 + 4 - 2(3.2) = 8 - 6.4 = 1.6 H."
  },
  {
    question: "What is the primary purpose of iron cores in inductors?",
    options: ["Reduce resistance", "Increase capacitance", "Increase inductance by concentrating flux", "Reduce weight"],
    correctIndex: 2,
    explanation: "Iron cores have high permeability, concentrating the magnetic flux and greatly increasing inductance compared to air-cored coils."
  },
  {
    question: "Calculate the energy stored in a 50 mH inductor carrying 10A.",
    options: ["0.25 J", "2.5 J", "25 J", "250 J"],
    correctIndex: 1,
    explanation: "W = 0.5 x L x I squared = 0.5 x 0.05 x 100 = 2.5 J."
  },
  {
    question: "Why do inductors oppose sudden changes in current?",
    options: ["High resistance", "Self-induced EMF opposes the change (Lenz's Law)", "Capacitive effects", "Core saturation"],
    correctIndex: 1,
    explanation: "By Lenz's Law, the self-induced EMF opposes changes in current. An increasing current induces EMF opposing the increase, and vice versa."
  }
];

const faqItems = [
  {
    question: "What is the difference between self-inductance and mutual inductance?",
    answer: "Self-inductance (L) is the property of a single coil to oppose changes in its own current by inducing an EMF in itself. Mutual inductance (M) is the property between two coils where changing current in one induces an EMF in the other. Self-inductance depends on the coil's own properties, while mutual inductance depends on how well the two coils are magnetically coupled."
  },
  {
    question: "How does core material affect inductance?",
    answer: "Inductance is proportional to permeability. An iron or ferrite core with high relative permeability (mu_r = 1000-10000) dramatically increases inductance compared to an air core (mu_r = 1). This is why power inductors use iron cores. However, iron cores can saturate at high currents, limiting the maximum useful inductance at high current levels."
  },
  {
    question: "What is magnetic coupling and why is it important?",
    answer: "Magnetic coupling describes how well the magnetic flux from one coil links with another. High coupling (k approaching 1) means most flux is shared, as in transformers with well-designed cores. Low coupling means significant leakage flux that doesn't link both coils. Coupling affects energy transfer efficiency in transformers and the degree of interaction between nearby inductors."
  },
  {
    question: "How does the RL time constant affect circuit behaviour?",
    answer: "The time constant tau = L/R determines how quickly current can change in an RL circuit. Large inductance or low resistance gives a long time constant (slow response). Current takes about 5 time constants to reach final value. This affects motor starting (initial current surge), relay operation times, and filter response in power supplies."
  },
  {
    question: "Why is energy stored in an inductor important?",
    answer: "The energy stored (W = 0.5 x L x I squared) in an inductor's magnetic field must go somewhere when current is interrupted. This can cause dangerous voltage spikes across opening contacts. Understanding stored energy helps in designing snubber circuits, flyback converters, and protection for inductive loads. It's also fundamental to switched-mode power supplies."
  },
  {
    question: "What are practical applications of mutual inductance?",
    answer: "Mutual inductance is the operating principle of transformers (power transformation), current transformers (measurement), wireless charging systems, induction heating, RFID systems, and medical devices like pacemaker charging. Understanding mutual inductance is essential for designing any system where energy or signals transfer magnetically between circuits."
  }
];

const Level3Module3Section3_3 = () => {
  useSEO(
    "Self and Mutual Inductance - Level 3 Electrical Science | Elec-Mate",
    "Master self-inductance, mutual inductance and magnetic coupling. Learn to calculate inductance, stored energy and time constants for City & Guilds Level 3 electrical qualifications."
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/level3-module3-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
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
          3.3 Self and Mutual Inductance
        </h1>
        <p className="text-xl text-white/70 mb-8">
          Understanding inductance in single circuits and the magnetic interaction between coupled circuits
        </p>

        {/* Quick Summary Box */}
        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Summary
          </h3>
          <ul className="text-white/80 space-y-2">
            <li>Self-inductance L = N x Phi / I, measured in Henrys (H)</li>
            <li>Self-induced EMF: e = -L x (dI/dt) - opposes current change</li>
            <li>Mutual inductance M = k x sqrt(L1 x L2), depends on coupling</li>
            <li>Energy stored: W = 0.5 x L x I squared (Joules)</li>
            <li>Time constant: tau = L / R (seconds)</li>
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Learning Outcomes</h3>
          <ul className="text-white/80 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Define self-inductance and calculate its value for simple coils
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Calculate self-induced EMF from rate of current change
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Explain mutual inductance and the coefficient of coupling
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Determine total inductance for series-aiding and series-opposing connections
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Calculate energy stored in an inductor and understand its implications
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Apply the RL time constant to analyse transient behaviour
            </li>
          </ul>
        </div>

        {/* Main Content Sections */}
        <div className="prose prose-invert max-w-none">
          {/* Section 1 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
              Self-Inductance
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                <strong>Self-inductance (L)</strong> is the property of a circuit, particularly a coil, that opposes any change in current through it. When current changes, the resulting change in magnetic flux induces an EMF that opposes the change - this is self-induction.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Definition and Units</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-2"><strong>Symbol:</strong> L</p>
                <p className="text-white/80 mb-2"><strong>Unit:</strong> Henry (H) = Wb/A = V.s/A</p>
                <p className="text-white/70 text-sm">A circuit has an inductance of 1 Henry if a current change of 1 A/s induces an EMF of 1 V.</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Formulas for Self-Inductance</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-green-400 font-mono mb-2">L = N x Phi / I</p>
                <p className="text-white/80 text-sm mb-3">Inductance equals flux linkage per ampere</p>
                <p className="text-green-400 font-mono mb-2">L = (N squared x mu x A) / l</p>
                <p className="text-white/80 text-sm">For a coil: N = turns, mu = permeability, A = cross-sectional area, l = magnetic path length</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Self-Induced EMF</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">e = -L x (dI / dt)</p>
                <p className="text-white/80 text-sm">The negative sign indicates opposition to current change (Lenz's Law)</p>
              </div>

              <p className="text-white/80 mb-4">
                The larger the inductance, the greater the opposition to current change. This is why:
              </p>
              <ul className="text-white/80 space-y-2 mb-4">
                <li>More turns = higher inductance (proportional to N squared)</li>
                <li>Higher permeability core = higher inductance</li>
                <li>Larger cross-sectional area = higher inductance</li>
                <li>Shorter magnetic path = higher inductance</li>
              </ul>

              <InlineCheck
                question="A coil of 400 turns produces 5 mWb of flux when carrying 2.5A. What is its inductance?"
                options={["0.8 H", "2 H", "0.5 H", "50 H"]}
                correctIndex={0}
                explanation="L = N x Phi / I = 400 x 0.005 / 2.5 = 2 / 2.5 = 0.8 H."
              />
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
              Mutual Inductance
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                <strong>Mutual inductance (M)</strong> exists between two magnetically coupled circuits. When current in one coil changes, some of its flux links with the second coil, inducing an EMF in it.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Mutual Inductance Formula</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">M = k x sqrt(L1 x L2)</p>
                <p className="text-white/80 text-sm">Where k = coefficient of coupling (0 to 1), L1 and L2 are self-inductances</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Coefficient of Coupling</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3">The coefficient of coupling k indicates how much of the flux from one coil links with the other:</p>
                <ul className="text-white/70 text-sm space-y-2">
                  <li><strong>k = 1 (unity):</strong> Perfect coupling - all flux links both coils (theoretical ideal)</li>
                  <li><strong>k = 0.95 - 0.99:</strong> Tightly coupled - iron-cored transformers</li>
                  <li><strong>k = 0.5 - 0.7:</strong> Loosely coupled - some air gap or separate cores</li>
                  <li><strong>k approaching 0:</strong> Very weak coupling - coils far apart or at right angles</li>
                </ul>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Mutually Induced EMF</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">e2 = -M x (dI1 / dt)</p>
                <p className="text-white/80 text-sm">EMF induced in coil 2 by rate of current change in coil 1</p>
              </div>

              <p className="text-white/80 mb-4">
                Key applications of mutual inductance:
              </p>
              <ul className="text-white/80 space-y-2 mb-4">
                <li><strong>Transformers:</strong> High k transfers energy efficiently between windings</li>
                <li><strong>Inductive charging:</strong> Moderate k allows wireless power transfer</li>
                <li><strong>Isolation:</strong> Low k provides electrical isolation while transferring signals</li>
              </ul>

              <InlineCheck
                question="Two coils have self-inductances of 100 mH and 400 mH with k = 0.8. What is M?"
                options={["160 mH", "200 mH", "400 mH", "80 mH"]}
                correctIndex={0}
                explanation="M = k x sqrt(L1 x L2) = 0.8 x sqrt(0.1 x 0.4) = 0.8 x sqrt(0.04) = 0.8 x 0.2 = 0.16 H = 160 mH."
              />
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
              Energy Storage and Time Constant
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <h4 className="text-lg font-semibold text-green-400 mb-3">Energy Stored in an Inductor</h4>
              <p className="text-white/80 mb-4">
                An inductor stores energy in its magnetic field when current flows through it. This energy is released when the current decreases.
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">W = 0.5 x L x I squared</p>
                <p className="text-white/80 text-sm">Where W = energy (Joules), L = inductance (H), I = current (A)</p>
              </div>

              <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 mb-4">
                <h5 className="font-semibold text-yellow-400 mb-2">Warning: Stored Energy</h5>
                <p className="text-white/80 text-sm">
                  When an inductive circuit is interrupted, the stored energy must go somewhere. This can cause dangerous voltage spikes across opening contacts. A 10H inductor carrying 10A stores 500J - enough to cause serious arcing or equipment damage.
                </p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">The RL Time Constant</h4>
              <p className="text-white/80 mb-4">
                When a DC voltage is applied to an RL circuit, current doesn't change instantly. The <strong>time constant (tau)</strong> characterises how quickly current can change.
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">tau = L / R</p>
                <p className="text-white/80 text-sm">Where tau = time constant (s), L = inductance (H), R = resistance (ohms)</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Current Growth and Decay</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3"><strong>Current growth</strong> (switch on):</p>
                <p className="text-green-400 font-mono mb-3">i = I(final) x (1 - e^(-t/tau))</p>
                <p className="text-white/80 mb-3"><strong>Current decay</strong> (switch off):</p>
                <p className="text-green-400 font-mono mb-3">i = I(initial) x e^(-t/tau)</p>
                <table className="w-full text-white/80 text-sm mt-4">
                  <thead>
                    <tr>
                      <th className="text-left pb-2">Time</th>
                      <th className="text-left pb-2">Growth %</th>
                      <th className="text-left pb-2">Decay %</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>1 tau</td><td>63.2%</td><td>36.8%</td></tr>
                    <tr><td>2 tau</td><td>86.5%</td><td>13.5%</td></tr>
                    <tr><td>3 tau</td><td>95.0%</td><td>5.0%</td></tr>
                    <tr><td>5 tau</td><td>99.3%</td><td>0.7%</td></tr>
                  </tbody>
                </table>
              </div>

              <InlineCheck
                question="An inductor L = 500 mH in series with R = 25 ohms is connected to DC. How long to reach 95% of final current?"
                options={["20 ms", "60 ms", "100 ms", "500 ms"]}
                correctIndex={1}
                explanation="tau = L/R = 0.5/25 = 0.02 s = 20 ms. 95% is reached at 3 tau = 3 x 20 = 60 ms."
              />
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
              Inductors in Series and Parallel
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <h4 className="text-lg font-semibold text-green-400 mb-3">Series Connection</h4>
              <p className="text-white/80 mb-4">
                When inductors are connected in series, their effects add. However, if they are magnetically coupled, mutual inductance must be considered:
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-2"><strong>No coupling (or far apart):</strong></p>
                <p className="text-green-400 font-mono mb-3">L(total) = L1 + L2</p>
                <p className="text-white/80 mb-2"><strong>Series aiding</strong> (fluxes in same direction):</p>
                <p className="text-green-400 font-mono mb-3">L(total) = L1 + L2 + 2M</p>
                <p className="text-white/80 mb-2"><strong>Series opposing</strong> (fluxes in opposite directions):</p>
                <p className="text-green-400 font-mono">L(total) = L1 + L2 - 2M</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Parallel Connection</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-2"><strong>No mutual coupling:</strong></p>
                <p className="text-green-400 font-mono mb-3">1/L(total) = 1/L1 + 1/L2</p>
                <p className="text-green-400 font-mono mb-3">Or: L(total) = (L1 x L2) / (L1 + L2)</p>
                <p className="text-white/70 text-sm">With mutual coupling, the formulas become more complex and depend on the orientation of windings.</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Practical Applications</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Series Aiding</h5>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>Auto-transformers (boost)</li>
                    <li>Increased inductance</li>
                    <li>Higher voltage rating</li>
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Series Opposing</h5>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>Auto-transformers (buck)</li>
                    <li>Reduced inductance</li>
                    <li>Used to find M by measurement</li>
                  </ul>
                </div>
              </div>

              <InlineCheck
                question="Two 6H inductors with M = 2H are connected series opposing. What is L(total)?"
                options={["8 H", "12 H", "16 H", "4 H"]}
                correctIndex={0}
                explanation="L(total) = L1 + L2 - 2M = 6 + 6 - 2(2) = 12 - 4 = 8 H."
              />
            </div>
          </div>

          {/* Practical Guidance */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Practical Guidance</h2>
            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-yellow-400 mb-3">Installation Considerations</h4>
              <ul className="text-white/80 space-y-2">
                <li><strong>Suppression:</strong> Use flywheel diodes across DC inductors, snubbers across AC coils to absorb stored energy when switching off.</li>
                <li><strong>Contact ratings:</strong> Switches and contactors for inductive loads need DC ratings (AC-11) or inductive AC ratings (AC-12/AC-15). Standard AC ratings don't apply.</li>
                <li><strong>Motor starters:</strong> The RL time constant affects motor starting current duration. Star-delta starting reduces locked-rotor current.</li>
                <li><strong>Transformer inrush:</strong> Initial magnetising current can be 10-20 times steady-state. Protection must not trip on normal inrush.</li>
                <li><strong>Cable separation:</strong> Mutual inductance between parallel cables can affect performance. BS 7671 Appendix 4 gives derating factors.</li>
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
                    <li>L = N x Phi / I</li>
                    <li>e = -L x (dI/dt)</li>
                    <li>M = k x sqrt(L1 x L2)</li>
                    <li>W = 0.5 x L x I squared</li>
                    <li>tau = L / R</li>
                    <li>L(aiding) = L1 + L2 + 2M</li>
                    <li>L(opposing) = L1 + L2 - 2M</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Key Values</h4>
                  <ul className="text-white/70 text-sm space-y-2">
                    <li>1 tau = 63.2% of final</li>
                    <li>3 tau = 95% of final</li>
                    <li>5 tau = 99.3% of final</li>
                    <li>k = 1: perfect coupling</li>
                    <li>k = 0.95-0.99: iron-core xfmr</li>
                    <li>1 H = 1 Wb/A = 1 V.s/A</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
          <p className="text-white/70 mb-4">Complete this quiz to check your understanding of self and mutual inductance:</p>
          <Quiz questions={quizQuestions} moduleId="L3M3S3.3" />
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
            <Link to="/study-centre/apprentice/level3-module3-section3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Electromagnetic Induction
            </Link>
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
            <Link to="/study-centre/apprentice/level3-module3-section3-4">
              Next: Transformers
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Level3Module3Section3_3;
