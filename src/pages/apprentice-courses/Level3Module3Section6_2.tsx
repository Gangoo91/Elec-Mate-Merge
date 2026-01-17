/**
 * Level 3 Module 3 Section 6.2 - Resistance and Voltage Drop
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Resistance and Voltage Drop - Level 3 Module 3 Section 6.2";
const DESCRIPTION = "Understand the relationship between conductor resistance and voltage drop in electrical circuits. Learn how Ohm's law applies to cable voltage drop and why it matters.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "A 10A current flows through a cable with 0.5 ohms resistance. What is the voltage drop?",
    options: [
      "0.5V",
      "5V",
      "20V",
      "50V"
    ],
    correctIndex: 1,
    explanation: "Using Ohm's law: Voltage Drop = I x R = 10 x 0.5 = 5V. The voltage at the load will be 5V less than at the supply."
  },
  {
    id: "check-2",
    question: "Why does voltage drop in cables matter for electrical installations?",
    options: [
      "It affects the cable's weight",
      "It can cause equipment to malfunction due to insufficient voltage",
      "It changes the cable colour",
      "It only matters for DC circuits"
    ],
    correctIndex: 1,
    explanation: "Excessive voltage drop means equipment receives less than rated voltage, potentially causing motors to overheat, lights to dim, or electronic equipment to malfunction. BS 7671 sets maximum voltage drop limits to ensure adequate voltage at the load."
  },
  {
    id: "check-3",
    question: "According to BS 7671, the maximum voltage drop for lighting circuits is:",
    options: [
      "3% of supply voltage",
      "5% of supply voltage",
      "10% of supply voltage",
      "15% of supply voltage"
    ],
    correctIndex: 0,
    explanation: "BS 7671 Appendix 4 states voltage drop should not exceed 3% for lighting circuits and 5% for other uses. For a 230V supply: lighting max = 6.9V, power max = 11.5V."
  },
  {
    id: "check-4",
    question: "A circuit has 0.2 ohms total cable resistance (line + neutral). With 15A load, what voltage reaches the equipment if supply is 230V?",
    options: [
      "227V",
      "230V",
      "233V",
      "215V"
    ],
    correctIndex: 0,
    explanation: "Voltage drop = I x R = 15 x 0.2 = 3V. Voltage at equipment = 230 - 3 = 227V. This is within the 5% limit (11.5V) for power circuits."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "The voltage drop in a cable is calculated using:",
    options: [
      "V = I x R (Ohm's law)",
      "V = I / R",
      "V = R / I",
      "V = I + R"
    ],
    correctAnswer: 0,
    explanation: "Voltage drop follows Ohm's law: V = I x R. The current flowing through the cable's resistance causes a voltage drop proportional to both the current and resistance."
  },
  {
    id: 2,
    question: "For a single-phase circuit, voltage drop occurs in:",
    options: [
      "The line conductor only",
      "The neutral conductor only",
      "Both line and neutral conductors",
      "The earth conductor"
    ],
    correctAnswer: 2,
    explanation: "In a single-phase circuit, current flows out through the line conductor and returns through the neutral. Both conductors have resistance, so voltage drop occurs in both. Total voltage drop = current x (R line + R neutral)."
  },
  {
    id: 3,
    question: "The mV/A/m values in cable tables represent:",
    options: [
      "Millivolts per ampere per metre of cable",
      "Maximum voltage per ampere",
      "Minimum voltage per metre",
      "Motor voltage rating"
    ],
    correctAnswer: 0,
    explanation: "mV/A/m is the voltage drop in millivolts for each ampere of current per metre of cable length. This allows quick calculation: Vd = (mV/A/m x I x L) / 1000 volts."
  },
  {
    id: 4,
    question: "BS 7671 maximum voltage drop of 3% for a 230V lighting circuit equals:",
    options: [
      "3V",
      "6.9V",
      "11.5V",
      "23V"
    ],
    correctAnswer: 1,
    explanation: "3% of 230V = 0.03 x 230 = 6.9V maximum voltage drop for lighting circuits. The lamps must receive at least 223.1V."
  },
  {
    id: 5,
    question: "Why do longer cable runs require larger conductor sizes?",
    options: [
      "Longer cables are heavier",
      "To keep voltage drop within limits despite greater resistance",
      "Building regulations require it",
      "Longer cables need more insulation"
    ],
    correctAnswer: 1,
    explanation: "Longer cables have more resistance (R = rho x L/A), causing more voltage drop. To keep drop within limits while supplying the required current, conductor cross-sectional area must increase to reduce resistance."
  },
  {
    id: 6,
    question: "A 2.5mm squared cable has mV/A/m of 18. A 30m circuit carrying 20A has voltage drop of:",
    options: [
      "10.8V",
      "1.08V",
      "108V",
      "0.108V"
    ],
    correctAnswer: 0,
    explanation: "Voltage drop = (mV/A/m x I x L) / 1000 = (18 x 20 x 30) / 1000 = 10800 / 1000 = 10.8V. This exceeds the 6.9V limit for lighting but is within 11.5V for power circuits."
  },
  {
    id: 7,
    question: "Power loss in a cable due to resistance is calculated as:",
    options: [
      "P = I x R",
      "P = I squared x R",
      "P = V x R",
      "P = V squared / I"
    ],
    correctAnswer: 1,
    explanation: "Power loss = I squared x R. This is why current is so critical - doubling current increases losses four times. This power is dissipated as heat in the cable."
  },
  {
    id: 8,
    question: "For a three-phase balanced circuit, voltage drop is calculated using:",
    options: [
      "Line current and single conductor resistance",
      "Phase current and two conductor resistances",
      "Line voltage and impedance per phase",
      "The same method as single-phase"
    ],
    correctAnswer: 0,
    explanation: "For balanced three-phase circuits, neutral current is zero, so only line conductor resistance matters. Voltage drop = root 3 x I x R x cos phi for three-phase circuits."
  },
  {
    id: 9,
    question: "If voltage drop is excessive, the first solution to consider is:",
    options: [
      "Increasing the supply voltage",
      "Using a larger conductor cross-sectional area",
      "Reducing the circuit length",
      "Accepting the voltage drop"
    ],
    correctAnswer: 1,
    explanation: "Increasing conductor size reduces resistance, reducing voltage drop. This is the most practical solution in most cases. Reducing circuit length or splitting into multiple circuits are alternatives where feasible."
  },
  {
    id: 10,
    question: "The voltage at equipment affects its:",
    options: [
      "Colour only",
      "Weight",
      "Performance, efficiency, and lifespan",
      "Installation method"
    ],
    correctAnswer: 2,
    explanation: "Under-voltage causes motors to draw more current, overheat, and fail prematurely. Lighting output reduces. Electronic equipment may malfunction or reset. This is why voltage drop limits are specified."
  },
  {
    id: 11,
    question: "Distribution circuits have more restrictive voltage drop limits because:",
    options: [
      "They carry more current",
      "Final circuits add further voltage drop",
      "They use smaller cables",
      "They are shorter"
    ],
    correctAnswer: 1,
    explanation: "The total voltage drop from source to load includes both distribution and final circuits. If a distribution circuit uses 3% and a final circuit uses 3%, total is 6% - exceeding limits. Distribution circuit drop should be minimised."
  },
  {
    id: 12,
    question: "At higher temperatures, voltage drop in cables:",
    options: [
      "Decreases",
      "Increases",
      "Stays the same",
      "Becomes negligible"
    ],
    correctAnswer: 1,
    explanation: "Higher temperature increases conductor resistance, which increases voltage drop for the same current. This is another reason why cable operating temperature matters and why voltage drop calculations should consider operating conditions."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "What is the difference between voltage drop and volt loss?",
    answer: "They refer to the same thing - the reduction in voltage between the supply and the load due to cable resistance. Voltage drop is the preferred technical term. The dropped voltage is converted to heat in the cable (power loss = I squared x R)."
  },
  {
    question: "Why are there different voltage drop limits for lighting and power?",
    answer: "Lighting is more sensitive to voltage changes - a 10% reduction in voltage can reduce light output by 30%. Motors and other power equipment can tolerate slightly lower voltages. The 3% lighting / 5% power limits ensure acceptable performance."
  },
  {
    question: "How do I calculate voltage drop for a ring final circuit?",
    answer: "For a ring circuit with load connected at the mid-point (worst case), the effective cable length is quarter of the ring length and conductors work in parallel. For socket outlets positioned elsewhere, specific calculations are needed. The IET On-Site Guide provides guidance."
  },
  {
    question: "Does voltage drop affect the neutral conductor differently?",
    answer: "In single-phase circuits, the neutral carries the same current as the line, so has equal voltage drop. In three-phase balanced systems, neutral current is zero, so neutral voltage drop is zero. Unbalanced three-phase loads will have neutral current and associated voltage drop."
  },
  {
    question: "Can voltage drop ever be beneficial?",
    answer: "While excessive voltage drop is problematic, some applications deliberately use cable resistance for current limiting (e.g., battery charging circuits). However, in normal installations, voltage drop represents wasted energy and should be minimised within practical limits."
  },
  {
    question: "What if my calculated voltage drop exceeds the limit?",
    answer: "Options include: increasing conductor size (most common), reducing circuit length (if possible), using multiple circuits to share the load, or accepting higher voltage drop with customer agreement (documented in design). For motor circuits, consider starting current impact."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module3Section6_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* MAIN ARTICLE CONTENT */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* HEADER */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.6.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Resistance and Voltage Drop
          </h1>
          <p className="text-white/80">
            Understanding the relationship between cable resistance and voltage loss
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Cause:</strong> Current flowing through cable resistance</li>
              <li><strong>Formula:</strong> Vd = I x R (Ohm's law)</li>
              <li><strong>Limits:</strong> 3% lighting, 5% power (BS 7671)</li>
              <li><strong>Solution:</strong> Increase conductor size or reduce length</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Dimming lights at end of long circuits</li>
              <li><strong>Use:</strong> mV/A/m values from BS 7671 tables</li>
              <li><strong>Apply:</strong> Vd = (mV/A/m x I x L) / 1000</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand why voltage drop occurs in cables",
              "Apply Ohm's law to calculate voltage drop",
              "Know the BS 7671 voltage drop limits",
              "Use mV/A/m values for practical calculations",
              "Understand the effects of excessive voltage drop",
              "Select appropriate solutions for voltage drop problems"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Voltage Drop Occurs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every conductor has resistance, no matter how good the material. When current flows through this resistance, some voltage is dropped across the cable, leaving less voltage available for the connected equipment. This is a direct application of Ohm's law.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-white mb-3">The Voltage Drop Equation:</p>
              <p className="text-2xl text-white font-mono text-center mb-4">Vd = I x R</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow/80 mb-1">Where:</p>
                  <ul className="text-white/80 space-y-1">
                    <li>Vd = Voltage drop (volts)</li>
                    <li>I = Current (amperes)</li>
                    <li>R = Cable resistance (ohms)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow/80 mb-1">Remember:</p>
                  <ul className="text-white/80 space-y-1">
                    <li>Voltage at load = Supply - Drop</li>
                    <li>Include both line AND neutral resistance</li>
                    <li>Higher current = higher drop</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-2">Circuit Diagram Concept:</p>
              <div className="text-xs text-white/80 font-mono space-y-2 p-3 bg-white/5 rounded">
                <p>Supply (230V) ----[R line]---- Load ----[R neutral]---- Supply Return</p>
                <p className="mt-2">Voltage at Load = 230V - (I x R line) - (I x R neutral)</p>
                <p>Voltage at Load = 230V - I x (R line + R neutral)</p>
              </div>
              <p className="text-xs text-white/60 mt-2">For single-phase, total cable R = R line + R neutral</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Point:</strong> The dropped voltage is not lost - it is converted to heat in the cable. This represents wasted energy and contributes to cable heating.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            BS 7671 Voltage Drop Limits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 specifies maximum permissible voltage drop to ensure equipment receives adequate voltage for proper operation. The limits are expressed as percentages of the nominal supply voltage and differ for lighting and other circuits.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-sm font-medium text-yellow-400 mb-2">Lighting Circuits</p>
                <p className="text-2xl font-bold text-white mb-1">3%</p>
                <p className="text-xs text-white/80">of supply voltage</p>
                <p className="text-lg font-mono text-white mt-2">= 6.9V (for 230V)</p>
                <p className="text-xs text-white/60 mt-2">Lighting is sensitive to voltage - even small reductions significantly affect light output</p>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm font-medium text-blue-400 mb-2">Other Circuits (Power)</p>
                <p className="text-2xl font-bold text-white mb-1">5%</p>
                <p className="text-xs text-white/80">of supply voltage</p>
                <p className="text-lg font-mono text-white mt-2">= 11.5V (for 230V)</p>
                <p className="text-xs text-white/60 mt-2">Motors and other equipment can tolerate slightly greater voltage variation</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <p className="text-sm font-medium text-red-400 mb-2">Important: Combined Voltage Drop</p>
              <p className="text-xs text-white/90">
                The limits apply to the total voltage drop from the origin of the installation to the point of use. If an installation has distribution circuits feeding final circuits, the combined drop must not exceed the limit. For example: if a distribution circuit has 2% drop and a final circuit has 2% drop, total is 4% - within the 5% power limit but exceeding the 3% lighting limit.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Reference:</strong> BS 7671 Appendix 4 provides the voltage drop requirements and the mV/A/m values for different cable types and sizes.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Using mV/A/m Values
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable tables in BS 7671 provide mV/A/m values - the voltage drop in millivolts per ampere of current per metre of cable. This simplifies calculations by combining the cable's resistance characteristics into a single value.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-white mb-3">Voltage Drop Formula Using mV/A/m:</p>
              <p className="text-xl text-white font-mono text-center mb-4">Vd = (mV/A/m x Ib x L) / 1000</p>
              <div className="text-sm text-white/80">
                <p>Where:</p>
                <ul className="ml-4 mt-1 space-y-1">
                  <li>Vd = Voltage drop (volts)</li>
                  <li>mV/A/m = Value from cable tables</li>
                  <li>Ib = Design current (amperes)</li>
                  <li>L = Cable length (metres)</li>
                  <li>Divide by 1000 to convert millivolts to volts</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-2">Sample mV/A/m Values (2-core flat cable, copper):</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-elec-yellow/80">Size (mm sq)</th>
                      <th className="text-left py-2 text-elec-yellow/80">mV/A/m</th>
                      <th className="text-left py-2 text-elec-yellow/80">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/5">
                      <td className="py-2">1.5</td>
                      <td className="py-2">29</td>
                      <td className="py-2">Lighting circuits</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">2.5</td>
                      <td className="py-2">18</td>
                      <td className="py-2">Socket outlets</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">4.0</td>
                      <td className="py-2">11</td>
                      <td className="py-2">Cookers, showers</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">6.0</td>
                      <td className="py-2">7.3</td>
                      <td className="py-2">Higher power circuits</td>
                    </tr>
                    <tr>
                      <td className="py-2">10.0</td>
                      <td className="py-2">4.4</td>
                      <td className="py-2">Sub-mains, large loads</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Values from BS 7671 Table 4D5 for flat twin cable, method C</p>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Worked Example</p>
              <p className="text-xs text-white/90 mb-2">A 20m lighting circuit uses 1.5mm sq cable. Design current is 8A. Calculate voltage drop.</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Given:</strong> mV/A/m = 29, Ib = 8A, L = 20m</p>
                <p><strong>Calculate:</strong></p>
                <p className="ml-4">Vd = (29 x 8 x 20) / 1000</p>
                <p className="ml-4">Vd = 4640 / 1000</p>
                <p className="ml-4">Vd = 4.64V</p>
                <p className="text-green-400 mt-2">4.64V is within the 6.9V (3%) limit for lighting - ACCEPTABLE</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> The mV/A/m values account for both line and neutral resistance - no need to double them for single-phase circuits.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Effects of Excessive Voltage Drop
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When voltage drop exceeds acceptable limits, equipment performance suffers. Different types of equipment respond differently to under-voltage conditions, but all are negatively affected.
            </p>

            <div className="my-6 space-y-3">
              <div className="p-3 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-white">Lighting</p>
                <p className="text-xs text-white/70 mt-1">Light output varies approximately as the cube of voltage. A 10% voltage drop can reduce light output by about 30%. Incandescent lamps are most affected; LED drivers may compensate but have limits.</p>
              </div>
              <div className="p-3 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-white">Motors</p>
                <p className="text-xs text-white/70 mt-1">Motor torque varies as voltage squared. Under-voltage causes higher current draw, overheating, and reduced life. Starting current increases and the motor may fail to start under load.</p>
              </div>
              <div className="p-3 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-white">Heating Elements</p>
                <p className="text-xs text-white/70 mt-1">Power output varies as voltage squared. A 10% voltage reduction gives approximately 19% less heat output, requiring longer heating times.</p>
              </div>
              <div className="p-3 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-white">Electronic Equipment</p>
                <p className="text-xs text-white/70 mt-1">Power supplies have minimum input voltage requirements. Below this, equipment may malfunction, reset, or shut down. Computer equipment is particularly sensitive.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <p className="text-sm font-medium text-red-400 mb-2">Signs of Voltage Drop Problems</p>
              <ul className="text-xs text-white/90 space-y-1">
                <li>Lights dimming when large loads start</li>
                <li>Motors running hot or failing to start</li>
                <li>Electronic equipment resetting or behaving erratically</li>
                <li>Heating elements taking longer to heat</li>
                <li>Measured voltage at outlets significantly below supply voltage</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Energy Loss:</strong> Power lost in cables = I squared x R. This wasted energy appears as heat and must be paid for. Minimising voltage drop also minimises energy waste.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* PRACTICAL GUIDANCE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Checking Voltage Drop Compliance</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Calculate design current (Ib) for the circuit</li>
                <li>Measure or calculate circuit length accurately</li>
                <li>Find mV/A/m from tables for cable type and size</li>
                <li>Apply formula: Vd = (mV/A/m x Ib x L) / 1000</li>
                <li>Compare with limit: 6.9V lighting, 11.5V power</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Solutions for Excessive Voltage Drop</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Increase conductor size</strong> - most common solution</li>
                <li><strong>Reduce circuit length</strong> - relocate distribution board closer</li>
                <li><strong>Split the load</strong> - use multiple circuits</li>
                <li><strong>Use higher voltage</strong> - three-phase instead of single-phase</li>
                <li><strong>Review design current</strong> - is diversity correctly applied?</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Using route length, not cable length (cables rarely run in straight lines)</li>
                <li>Forgetting to add distribution circuit voltage drop to final circuit drop</li>
                <li>Using wrong mV/A/m column for installation method</li>
                <li>Not allowing for future load increases</li>
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

        {/* QUICK REFERENCE */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent border border-elec-yellow/20">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Voltage Drop Limits (230V)</p>
                <ul className="space-y-0.5">
                  <li>Lighting: 3% = 6.9V max</li>
                  <li>Power: 5% = 11.5V max</li>
                  <li>Combined dist. + final circuits</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Calculation</p>
                <ul className="space-y-0.5">
                  <li>Vd = I x R (basic)</li>
                  <li>Vd = (mV/A/m x I x L) / 1000</li>
                  <li>Voltage at load = Supply - Vd</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* NAVIGATION */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section6-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Conductor Resistance
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section6-3">
              Next: Voltage Drop Calculations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module3Section6_2;
