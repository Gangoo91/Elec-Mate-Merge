import { ArrowLeft, ArrowRight, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const quickCheckQuestions = [
  {
    question: "What is the turns ratio of a transformer with 2400 primary turns and 120 secondary turns?",
    options: ["20:1 step-up", "20:1 step-down", "1:20 step-up", "1:20 step-down"],
    correctIndex: 1,
    explanation: "Turns ratio = Np/Ns = 2400/120 = 20:1. Since primary has more turns, secondary voltage is lower - this is a step-down transformer."
  },
  {
    question: "A transformer has 400V primary and 50V secondary. If secondary current is 16A, what is primary current (ideal transformer)?",
    options: ["2 A", "128 A", "0.5 A", "8 A"],
    correctIndex: 0,
    explanation: "For an ideal transformer: Vp x Ip = Vs x Is. So Ip = (Vs x Is) / Vp = (50 x 16) / 400 = 800 / 400 = 2 A."
  },
  {
    question: "Which losses in a transformer are load-dependent?",
    options: ["Core losses only", "Copper losses only", "Both core and copper losses", "Neither - all losses are constant"],
    correctIndex: 1,
    explanation: "Copper losses (I squared R in windings) vary with load current squared. Core losses (hysteresis and eddy current) depend on voltage/frequency and remain approximately constant."
  },
  {
    question: "What is the purpose of laminating transformer cores?",
    options: ["Increase flux density", "Reduce copper losses", "Reduce eddy current losses", "Increase permeability"],
    correctIndex: 2,
    explanation: "Laminations (thin sheets with insulating coating) break up eddy current paths. Eddy current losses are proportional to thickness squared, so thinner laminations give lower losses."
  }
];

const quizQuestions = [
  {
    question: "An ideal transformer has 500 primary turns. For a 10:1 step-down ratio, how many secondary turns are needed?",
    options: ["50", "5000", "5", "500"],
    correctIndex: 0,
    explanation: "For 10:1 step-down: Np/Ns = 10/1, so Ns = Np/10 = 500/10 = 50 turns."
  },
  {
    question: "A 11kV/400V transformer supplies a 50 kVA load at unity power factor. What is the secondary full-load current?",
    options: ["125 A", "72.2 A", "4.55 A", "200 A"],
    correctIndex: 1,
    explanation: "S = V x I for single phase, so Is = S / Vs = 50000 / (400 x sqrt(3)) = 50000 / 693 = 72.2 A for 3-phase (or 125 A if single phase)."
  },
  {
    question: "A transformer has core loss of 500 W and copper loss of 1200 W at full load. What is the efficiency at full load (50 kVA)?",
    options: ["96.7%", "94.5%", "97.6%", "92.4%"],
    correctIndex: 0,
    explanation: "Output = Input - Losses. Eff = Output/Input = (50000)/(50000 + 500 + 1200) = 50000/51700 = 96.7%."
  },
  {
    question: "At what load does maximum efficiency occur in a transformer?",
    options: ["Full load", "No load", "When core losses equal copper losses", "Half load"],
    correctIndex: 2,
    explanation: "Maximum efficiency occurs when variable losses (copper losses) equal fixed losses (core losses). This is typically at 50-75% of full load."
  },
  {
    question: "What is the voltage regulation of a transformer if no-load voltage is 240V and full-load voltage is 230V?",
    options: ["4.17%", "4.35%", "10%", "2.17%"],
    correctIndex: 0,
    explanation: "Voltage regulation = ((Vno-load - Vfull-load) / Vfull-load) x 100 = ((240 - 230) / 240) x 100 = 4.17%."
  },
  {
    question: "An auto-transformer has 400 turns with a tap at 300 turns. If input is 230V, what is the output voltage?",
    options: ["172.5 V", "306.7 V", "100 V", "130 V"],
    correctIndex: 0,
    explanation: "Output voltage = Input voltage x (output turns / input turns) = 230 x (300/400) = 230 x 0.75 = 172.5 V."
  },
  {
    question: "What determines the no-load current of a transformer?",
    options: ["Secondary load", "Core magnetising requirements", "Copper resistance", "Frequency only"],
    correctIndex: 1,
    explanation: "No-load current is primarily the magnetising current needed to establish flux in the core, plus a small component for core losses. It's typically 2-5% of full-load current."
  },
  {
    question: "Why are 3-phase transformers rated in kVA rather than kW?",
    options: ["It's an industry convention only", "kVA indicates both voltage and current capacity regardless of power factor", "kW would be too large a number", "kVA is easier to calculate"],
    correctIndex: 1,
    explanation: "Transformer heating depends on V x I (apparent power in VA), not actual power. The load power factor doesn't affect transformer heating, so kVA rating is appropriate."
  },
  {
    question: "A transformer has percentage impedance of 5%. If a fault occurs on the secondary, what is the fault current as a multiple of full-load current?",
    options: ["5 times", "20 times", "0.05 times", "95 times"],
    correctIndex: 1,
    explanation: "Fault current = Full-load current / (% impedance / 100) = FLC / 0.05 = 20 x FLC. Lower impedance means higher fault current."
  },
  {
    question: "Which transformer connection provides a neutral point: Delta-Star or Star-Delta?",
    options: ["Delta-Star", "Star-Delta", "Both", "Neither"],
    correctIndex: 0,
    explanation: "In Delta-Star (Dy) connection, the star-connected secondary provides a neutral point. This is common for distribution transformers where a neutral is needed for single-phase loads."
  },
  {
    question: "What causes transformer hum?",
    options: ["Loose windings", "Magnetostriction of the core", "High load current", "Cooling fan operation"],
    correctIndex: 1,
    explanation: "Magnetostriction is the slight change in core dimensions as it is magnetised and demagnetised at 50 Hz. This causes vibration at 100 Hz (twice per cycle) producing the characteristic hum."
  },
  {
    question: "A current transformer has a ratio of 200/5. If the primary carries 150A, what is the secondary current?",
    options: ["3.75 A", "6000 A", "40 A", "1.5 A"],
    correctIndex: 0,
    explanation: "CT ratio means 200A primary gives 5A secondary. For 150A: Is = Ip x (5/200) = 150 x 0.025 = 3.75 A."
  }
];

const faqItems = [
  {
    question: "Why can transformers only work with AC, not DC?",
    answer: "Transformers rely on electromagnetic induction, which requires a changing magnetic flux. AC naturally provides continuous flux change as current alternates. DC creates a constant flux that induces no EMF in the secondary once established. The only EMF induced with DC occurs during switch-on and switch-off transients."
  },
  {
    question: "What is the difference between power transformers and distribution transformers?",
    answer: "Power transformers operate at transmission voltages (33kV-400kV), are large, efficient at high loads, and typically located in substations. Distribution transformers operate at lower voltages (11kV/400V), are smaller, designed for varying loads, and located closer to consumers. Distribution transformers have higher iron-to-copper ratio for efficiency at lighter loads."
  },
  {
    question: "Why do transformers have a no-load current?",
    answer: "Even with no load connected, the transformer needs current to establish the magnetic flux in the core (magnetising current) and to supply core losses (hysteresis and eddy currents). This no-load current is typically 2-5% of full-load current and is mostly reactive (low power factor)."
  },
  {
    question: "What is percentage impedance and why is it important?",
    answer: "Percentage impedance (%Z) is the percentage of rated voltage needed to circulate rated current through the short-circuited transformer. It determines fault current magnitude (Ifault = Irated / %Z) and voltage regulation. Typical values are 4-6% for distribution transformers. Higher %Z means lower fault current but poorer regulation."
  },
  {
    question: "How do I parallel transformers correctly?",
    answer: "To parallel transformers: same voltage ratio and phase displacement (vector group), same percentage impedance (within 10%), correct phase sequence, and proper synchronisation. Unequal impedances cause unequal load sharing; wrong vector group causes circulating currents that could damage the transformers."
  },
  {
    question: "What protection is required for transformers?",
    answer: "Common protections include: overcurrent relays (backup protection), differential relays (internal faults), Buchholz relay (gas/oil-flow detection for oil-filled types), temperature monitoring (winding and oil), pressure relief devices, and earth fault protection. BS 7671 requires overcurrent protection on the primary or secondary side."
  }
];

const Level3Module3Section3_4 = () => {
  useSEO(
    "Transformers - Theory and Applications - Level 3 Electrical Science | Elec-Mate",
    "Master transformer principles including turns ratio, efficiency, losses, voltage regulation and construction. Essential knowledge for power systems in City & Guilds Level 3 qualifications."
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module3-section3">
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
          3.4 Transformers - Theory and Applications
        </h1>
        <p className="text-xl text-white/70 mb-8">
          Understanding transformer principles, construction, efficiency and practical applications in electrical systems
        </p>

        {/* Quick Summary Box */}
        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Summary
          </h3>
          <ul className="text-white/80 space-y-2">
            <li>Turns ratio: Vp/Vs = Np/Ns = Is/Ip (ideal transformer)</li>
            <li>Power conservation: Vp x Ip = Vs x Is (ignoring losses)</li>
            <li>Losses: Core (fixed) + Copper (variable with load squared)</li>
            <li>Maximum efficiency: when core losses = copper losses</li>
            <li>Voltage regulation: (Vno-load - Vfull-load) / Vno-load x 100%</li>
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Learning Outcomes</h3>
          <ul className="text-white/80 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Explain the operating principle of transformers using electromagnetic induction
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Apply the turns ratio to calculate voltages, currents and power
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Identify and calculate transformer losses and efficiency
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Explain voltage regulation and its causes
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Describe different transformer types and their applications
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Understand 3-phase transformer connections and vector groups
            </li>
          </ul>
        </div>

        {/* Main Content Sections */}
        <div className="prose prose-invert max-w-none">
          {/* Section 1 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
              Transformer Principles
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                A <strong>transformer</strong> transfers electrical energy between circuits using electromagnetic induction. AC current in the primary winding creates a changing magnetic flux in the core, which induces an EMF in the secondary winding.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">The Ideal Transformer</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3">For an ideal transformer (no losses, perfect coupling):</p>
                <p className="text-green-400 font-mono mb-2">Voltage ratio: Vp / Vs = Np / Ns = n</p>
                <p className="text-green-400 font-mono mb-2">Current ratio: Ip / Is = Ns / Np = 1/n</p>
                <p className="text-green-400 font-mono mb-2">Power: Vp x Ip = Vs x Is</p>
                <p className="text-white/80 text-sm mt-3">Where n = turns ratio, p = primary, s = secondary</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Step-Down Transformer</h5>
                  <p className="text-white/70 text-sm">Np greater than Ns: reduces voltage, increases current. Used in distribution (11kV to 400V).</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Step-Up Transformer</h5>
                  <p className="text-white/70 text-sm">Ns greater than Np: increases voltage, reduces current. Used at power stations for transmission.</p>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">EMF Equation</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">E = 4.44 x f x N x Phi(max)</p>
                <p className="text-white/80 text-sm">Where E = RMS EMF, f = frequency (Hz), N = turns, Phi(max) = peak flux (Wb)</p>
              </div>

              <InlineCheck
                question="A 230V/12V transformer has 920 primary turns. How many secondary turns?"
                options={["48", "17,667", "24", "460"]}
                correctIndex={0}
                explanation="Np/Ns = Vp/Vs, so Ns = Np x (Vs/Vp) = 920 x (12/230) = 920 x 0.052 = 48 turns."
              />
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
              Transformer Losses and Efficiency
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                Real transformers have losses that reduce efficiency below 100%. Understanding these losses is essential for sizing, cooling and efficiency calculations.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Types of Losses</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Core Losses (Iron Losses)</h5>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li><strong>Hysteresis:</strong> Energy to reverse magnetic domains each cycle</li>
                    <li><strong>Eddy currents:</strong> Circulating currents in the core</li>
                    <li>Approximately constant (depend on voltage and frequency)</li>
                    <li>Reduced by: laminations, grain-oriented steel</li>
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Copper Losses (I squared R)</h5>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>Resistive heating in primary and secondary windings</li>
                    <li>Proportional to current squared</li>
                    <li>Vary with load (zero at no-load)</li>
                    <li>Reduced by: larger conductors, better cooling</li>
                  </ul>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Efficiency Calculation</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-green-400 font-mono mb-2">Efficiency = Output / Input = Output / (Output + Losses)</p>
                <p className="text-green-400 font-mono mb-2">Efficiency = (S x pf) / (S x pf + Pcore + x squared x Pcu)</p>
                <p className="text-white/80 text-sm mt-3">Where S = apparent power (VA), pf = power factor, x = fraction of full load, Pcu = copper loss at full load</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Maximum Efficiency</h4>
              <p className="text-white/80 mb-4">
                Maximum efficiency occurs when variable losses (copper) equal fixed losses (core):
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">x squared x Pcu = Pcore</p>
                <p className="text-green-400 font-mono">x = sqrt(Pcore / Pcu)</p>
                <p className="text-white/80 text-sm mt-2">This typically occurs at 50-75% of full load</p>
              </div>

              <InlineCheck
                question="A transformer has core loss 400W, copper loss 1600W at full load. At what fraction of full load is efficiency maximum?"
                options={["25%", "50%", "75%", "100%"]}
                correctIndex={1}
                explanation="x = sqrt(Pcore/Pcu) = sqrt(400/1600) = sqrt(0.25) = 0.5 = 50% of full load."
              />
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
              Voltage Regulation and Impedance
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <h4 className="text-lg font-semibold text-green-400 mb-3">Voltage Regulation</h4>
              <p className="text-white/80 mb-4">
                <strong>Voltage regulation</strong> is the change in secondary voltage from no-load to full-load, expressed as a percentage.
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">Regulation % = ((V(no-load) - V(full-load)) / V(no-load)) x 100</p>
                <p className="text-white/80 text-sm">Good regulation is typically 2-4% for distribution transformers</p>
              </div>

              <p className="text-white/80 mb-4">
                Voltage drop under load is caused by:
              </p>
              <ul className="text-white/80 space-y-2 mb-4">
                <li><strong>Winding resistance:</strong> Creates in-phase voltage drop (I x R)</li>
                <li><strong>Leakage reactance:</strong> Creates quadrature voltage drop (I x X)</li>
                <li>Effect depends on load power factor</li>
              </ul>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Percentage Impedance</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3"><strong>Percentage impedance (%Z)</strong> is the percentage of rated voltage needed to circulate rated current with secondary short-circuited:</p>
                <p className="text-green-400 font-mono mb-2">%Z = (Vsc / Vrated) x 100</p>
                <p className="text-white/80 text-sm">Typical values: 4-6% for distribution transformers</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Fault Current</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3">%Z determines prospective short-circuit current:</p>
                <p className="text-green-400 font-mono mb-2">I(fault) = I(rated) / (%Z / 100) = I(rated) x (100 / %Z)</p>
                <p className="text-white/80 text-sm">Example: 5% Z means fault current = 20 x rated current</p>
              </div>

              <InlineCheck
                question="A 100 kVA, 400V transformer has 4% impedance. What is the prospective fault current?"
                options={["144 A", "3610 A", "6250 A", "25 A"]}
                correctIndex={1}
                explanation="Rated current = 100000 / (400 x sqrt(3)) = 144 A. Fault current = 144 x (100/4) = 144 x 25 = 3600 A."
              />
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
              Transformer Types and Construction
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <h4 className="text-lg font-semibold text-green-400 mb-3">Core Types</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Core Type</h5>
                  <p className="text-white/70 text-sm">Windings on two legs of rectangular core. Good for high voltage - windings easy to insulate. Common in power transformers.</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Shell Type</h5>
                  <p className="text-white/70 text-sm">Windings on central leg, surrounded by core. Better magnetic coupling, lower leakage. Common in distribution transformers.</p>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Special Transformer Types</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <ul className="text-white/80 space-y-3">
                  <li><strong>Auto-transformer:</strong> Single winding with taps. Smaller and cheaper for small ratios but no isolation. Used for motor starting and voltage adjustment.</li>
                  <li><strong>Current transformer (CT):</strong> Steps down current for measurement. Secondary must never be open-circuited. Primary often a single turn (bus bar).</li>
                  <li><strong>Voltage transformer (VT/PT):</strong> Steps down voltage for measurement. High accuracy, low burden. Must not be short-circuited.</li>
                  <li><strong>Isolation transformer:</strong> 1:1 ratio providing galvanic isolation. Used for safety and noise reduction.</li>
                </ul>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">3-Phase Connections</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3">Common vector groups (primary-secondary):</p>
                <ul className="text-white/70 text-sm space-y-2">
                  <li><strong>Dyn11:</strong> Delta-Star, 30 degree phase shift. Most common for HV/LV distribution. Star secondary provides neutral.</li>
                  <li><strong>Yy0:</strong> Star-Star, no phase shift. Simple but has 3rd harmonic issues without delta tertiary.</li>
                  <li><strong>Dd0:</strong> Delta-Delta, no phase shift. No neutral available. Used for special applications.</li>
                  <li><strong>Yd1:</strong> Star-Delta, 30 degree phase shift. Used for step-up at generators.</li>
                </ul>
              </div>

              <InlineCheck
                question="Which transformer connection is most commonly used for 11kV/400V distribution?"
                options={["Yy0", "Dd0", "Dyn11", "Yd1"]}
                correctIndex={2}
                explanation="Dyn11 (Delta-Star) is standard for HV/LV distribution. Delta primary handles unbalanced loads and 3rd harmonics; Star secondary provides the neutral needed for single-phase loads."
              />
            </div>
          </div>

          {/* Practical Guidance */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Practical Guidance</h2>
            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-yellow-400 mb-3">Installation and Safety</h4>
              <ul className="text-white/80 space-y-2">
                <li><strong>Transformer rating:</strong> Must exceed maximum load plus diversity factor. Consider future expansion and starting currents of motors.</li>
                <li><strong>Cooling:</strong> Oil-filled (ONAN, ONAF) for large outdoor units. Dry-type (AN, AF) for indoor installation. Adequate ventilation essential.</li>
                <li><strong>Protection:</strong> Overcurrent and earth fault protection per BS 7671. Oil-filled transformers need Buchholz relay and pressure relief.</li>
                <li><strong>Paralleling:</strong> Same vector group, similar %Z (within 10%), correct phase sequence. Test with reduced voltage before full connection.</li>
                <li><strong>Earthing:</strong> LV neutral solidly earthed (TN-S, TN-C-S). Transformer tank must be earthed. Follow BS 7671 Part 4.</li>
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
                    <li>Vp/Vs = Np/Ns = Is/Ip</li>
                    <li>E = 4.44 x f x N x Phi</li>
                    <li>Eff = Output/(Output + losses)</li>
                    <li>Reg% = (Vnl - Vfl)/Vnl x 100</li>
                    <li>Ifault = Irated x (100/%Z)</li>
                    <li>Max eff: x = sqrt(Pc/Pcu)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Typical Values</h4>
                  <ul className="text-white/70 text-sm space-y-2">
                    <li>Efficiency: 95-99%</li>
                    <li>Voltage regulation: 2-4%</li>
                    <li>%Z: 4-6% (distribution)</li>
                    <li>No-load current: 2-5% FLC</li>
                    <li>Core loss: 0.1-0.3% rating</li>
                    <li>Copper loss at FL: 0.5-1% rating</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
          <p className="text-white/70 mb-4">Complete this quiz to check your understanding of transformer theory:</p>
          <Quiz questions={quizQuestions} moduleId="L3M3S3.4" />
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
            <Link to="../level3-module3-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Self and Mutual Inductance
            </Link>
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
            <Link to="../level3-module3-section3-5">
              Next: Motors and Generators
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Level3Module3Section3_4;
