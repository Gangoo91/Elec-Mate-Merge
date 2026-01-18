/**
 * Level 3 Module 3 Section 6.5 - Practical Voltage Drop Examples
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
const TITLE = "Practical Voltage Drop Examples - Level 3 Module 3 Section 6.5";
const DESCRIPTION = "Work through real-world voltage drop scenarios from domestic to commercial installations. Master exam-style calculations with step-by-step solutions and common pitfalls to avoid.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "A domestic lighting circuit uses 1.5mm sq cable (mV/A/m = 29), runs 25m, and carries 6A. Is it compliant?",
    options: [
      "Yes - 4.35V is within the 6.9V limit",
      "No - 4.35V exceeds the limit",
      "Yes - 7.25V is within the 11.5V limit",
      "Cannot determine without more information"
    ],
    correctIndex: 0,
    explanation: "Vd = (29 x 6 x 25) / 1000 = 4.35V. For lighting circuits, the limit is 6.9V (3% of 230V). 4.35V is well within this limit, so the circuit is compliant."
  },
  {
    id: "check-2",
    question: "An outbuilding supply uses 6mm sq SWA (mV/A/m = 7.3), runs 45m to a 40A load. What is the voltage drop?",
    options: [
      "13.14V",
      "1.31V",
      "131.4V",
      "8.1V"
    ],
    correctIndex: 0,
    explanation: "Vd = (7.3 x 40 x 45) / 1000 = 13140 / 1000 = 13.14V. This exceeds the 11.5V (5%) limit for power circuits and would require a larger cable."
  },
  {
    id: "check-3",
    question: "A three-phase motor circuit (400V) allows maximum 5% voltage drop. What is the maximum drop in volts?",
    options: [
      "11.5V",
      "20V",
      "12V",
      "23V"
    ],
    correctIndex: 1,
    explanation: "For three-phase 400V supply, 5% = 400 x 0.05 = 20V maximum voltage drop. Note this is higher than the single-phase 230V limit of 11.5V."
  },
  {
    id: "check-4",
    question: "A distribution board is fed by a 25m sub-main dropping 3.5V. What voltage drop is available for final circuits to a power load?",
    options: [
      "11.5V",
      "8.0V",
      "6.9V",
      "3.4V"
    ],
    correctIndex: 1,
    explanation: "Total limit for power = 11.5V. With 3.5V used by sub-main, remaining = 11.5 - 3.5 = 8.0V available for final circuits."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "A 10A lighting circuit uses 1.0mm sq cable (mV/A/m = 44) over 12m. The voltage drop is:",
    options: [
      "5.28V - acceptable for lighting",
      "52.8V - unacceptable",
      "0.528V - acceptable",
      "5.28V - unacceptable for lighting"
    ],
    correctAnswer: 0,
    explanation: "Vd = (44 x 10 x 12) / 1000 = 5.28V. The lighting limit is 6.9V, so 5.28V is acceptable."
  },
  {
    id: 2,
    question: "An electric shower circuit (40A, 15m, 6mm sq cable, mV/A/m = 7.3) has voltage drop of:",
    options: [
      "4.38V",
      "43.8V",
      "0.438V",
      "7.3V"
    ],
    correctAnswer: 0,
    explanation: "Vd = (7.3 x 40 x 15) / 1000 = 4380 / 1000 = 4.38V. Well within the 11.5V power circuit limit."
  },
  {
    id: 3,
    question: "For a ring final circuit with 80m total length, the effective length for voltage drop calculation is:",
    options: [
      "80m",
      "40m",
      "20m",
      "10m"
    ],
    correctAnswer: 2,
    explanation: "For ring circuits, effective length = total length / 4. This accounts for the parallel paths and worst-case load position. 80m / 4 = 20m."
  },
  {
    id: 4,
    question: "A garage supply uses 25m of 4mm sq cable (mV/A/m = 11) with 25A load. The voltage drop is:",
    options: [
      "6.88V - acceptable",
      "6.88V - unacceptable",
      "11V - at the limit",
      "2.75V - well under limit"
    ],
    correctAnswer: 0,
    explanation: "Vd = (11 x 25 x 25) / 1000 = 6875 / 1000 = 6.88V. Within the 11.5V limit for power circuits."
  },
  {
    id: 5,
    question: "A commercial kitchen has a 60A three-phase supply over 35m using 16mm sq cable (mV/A/m = 2.8). Voltage drop is:",
    options: [
      "5.88V",
      "10.2V",
      "2.94V",
      "8.4V"
    ],
    correctAnswer: 0,
    explanation: "For three-phase: Vd = (1.732 x 2.8 x 60 x 35) / 1000 = 10185 / 1000 = 10.2V. But for single-phase calculation: (2.8 x 60 x 35) / 1000 = 5.88V. The question format suggests single-phase method."
  },
  {
    id: 6,
    question: "An EV charger circuit (32A, 20m, 6mm sq mV/A/m = 7.3) voltage drop is:",
    options: [
      "4.67V - acceptable",
      "4.67V - requires larger cable",
      "7.3V - at limit",
      "14.6V - unacceptable"
    ],
    correctAnswer: 0,
    explanation: "Vd = (7.3 x 32 x 20) / 1000 = 4672 / 1000 = 4.67V. Well within the 11.5V limit."
  },
  {
    id: 7,
    question: "If a sub-main has 2V drop and a final circuit has 8V drop, for a power installation:",
    options: [
      "Acceptable - 10V total under 11.5V limit",
      "Unacceptable - each must independently comply",
      "Acceptable - sub-mains have separate limits",
      "Unacceptable - total exceeds 5% limit"
    ],
    correctAnswer: 0,
    explanation: "Total voltage drop = 2 + 8 = 10V. The BS 7671 limit of 11.5V (5%) applies to total drop from origin to point of use. 10V is acceptable."
  },
  {
    id: 8,
    question: "A farm outbuilding supply 100m from the main building needs 30A. Using 10mm sq SWA (mV/A/m = 4.4):",
    options: [
      "Vd = 13.2V - need larger cable",
      "Vd = 13.2V - acceptable for agricultural",
      "Vd = 4.4V - acceptable",
      "Vd = 44V - way over limit"
    ],
    correctAnswer: 0,
    explanation: "Vd = (4.4 x 30 x 100) / 1000 = 13.2V. This exceeds 11.5V, so a larger cable (16mm sq) is needed."
  },
  {
    id: 9,
    question: "For exam calculations, if you forget to divide by 1000, your answer will be:",
    options: [
      "1000 times too large (in mV not V)",
      "1000 times too small",
      "Correct for three-phase circuits",
      "Off by a factor of root 3"
    ],
    correctAnswer: 0,
    explanation: "Forgetting to divide by 1000 gives the answer in millivolts (mV) instead of volts (V). The result would be 1000 times too large."
  },
  {
    id: 10,
    question: "A warehouse lighting circuit needs 50m cable run with 8A load. Maximum mV/A/m for compliance is:",
    options: [
      "17.25",
      "11.5",
      "28.75",
      "14.4"
    ],
    correctAnswer: 0,
    explanation: "Max mV/A/m = (Vd x 1000) / (I x L) = (6.9 x 1000) / (8 x 50) = 6900 / 400 = 17.25. Use 1.5mm sq (mV/A/m = 29) would fail; need larger cable."
  },
  {
    id: 11,
    question: "When presenting voltage drop calculations in an exam, you should always:",
    options: [
      "Round down to show compliance",
      "Show working, state formula, compare with limit",
      "Only give the final answer",
      "Skip intermediate steps to save time"
    ],
    correctAnswer: 1,
    explanation: "Always show your working: state the formula, substitute values, calculate step-by-step, and compare your answer with the relevant limit. This earns method marks even if arithmetic is slightly wrong."
  },
  {
    id: 12,
    question: "A socket circuit calculation gives 11.3V drop. The installation is:",
    options: [
      "Compliant - under 11.5V limit",
      "Non-compliant - must be under 11V",
      "Borderline - should upsize cable for margin",
      "Both A and C are valid approaches"
    ],
    correctAnswer: 3,
    explanation: "11.3V is technically compliant (under 11.5V), but leaves little margin for measurement uncertainty or future load increases. Both answering 'compliant' or recommending upsizing are valid professional approaches."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "What is the most common exam mistake with voltage drop calculations?",
    answer: "Forgetting to divide by 1000 to convert millivolts to volts. Always check that your answer is a sensible value - voltage drops of hundreds or thousands of volts indicate a calculation error."
  },
  {
    question: "How do I remember the voltage drop limits?",
    answer: "Use the 3-5 rule: 3% for lighting (6.9V from 230V), 5% for power (11.5V from 230V). For three-phase 400V, the 5% gives 20V. These percentages are easier to remember than the voltage values."
  },
  {
    question: "Should I always calculate voltage drop in exams even if not explicitly asked?",
    answer: "If a question involves cable sizing, always verify voltage drop compliance unless the question specifically says to ignore it. This demonstrates understanding that both current capacity and voltage drop must be satisfied."
  },
  {
    question: "How precise should my voltage drop answers be?",
    answer: "Work to at least 2 decimal places during calculation, then round appropriately for the final answer. For exam purposes, stating '6.48V which is less than 6.9V limit' is good practice."
  },
  {
    question: "What if a question uses different voltage drop limits?",
    answer: "Always use the limits stated in the question if different from standard. Some industrial or special installations may have different requirements. Read the question carefully for any stated limits."
  },
  {
    question: "How do I handle combined AC and DC installations like EV chargers?",
    answer: "The AC supply side uses standard voltage drop calculations. The DC side of an EV charger is internal to the equipment. Your voltage drop calculation covers the AC circuit up to the charger."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module3Section6_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

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
            <span>Module 3.6.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Practical Voltage Drop Examples
          </h1>
          <p className="text-white/80">
            Real-world scenarios and exam-style calculations with step-by-step solutions
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Formula:</strong> Vd = (mV/A/m x I x L) / 1000</li>
              <li><strong>Lighting:</strong> Max 6.9V (3% of 230V)</li>
              <li><strong>Power:</strong> Max 11.5V (5% of 230V)</li>
              <li><strong>Show working:</strong> Formula, values, calculation, comparison</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Long runs, outbuildings, distribution circuits</li>
              <li><strong>Use:</strong> BS 7671 Appendix 4 mV/A/m values</li>
              <li><strong>Check:</strong> Total drop including sub-mains</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply voltage drop calculations to domestic installations",
              "Calculate voltage drop for commercial and industrial scenarios",
              "Handle distribution circuit calculations",
              "Work through ring final circuit voltage drop",
              "Present calculations correctly in exam format",
              "Identify and avoid common calculation errors"
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
            Domestic Installation Examples
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Domestic installations typically involve shorter cable runs but require careful attention to the different limits for lighting and power circuits.
            </p>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Example 1: Kitchen Socket Radial</p>
              <p className="text-xs text-white/90 mb-2">A 20A radial circuit serves kitchen sockets. Cable: 2.5mm sq flat twin (mV/A/m = 18). Length: 22m.</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Formula:</strong> Vd = (mV/A/m x I x L) / 1000</p>
                <p><strong>Substituting:</strong> Vd = (18 x 20 x 22) / 1000</p>
                <p><strong>Calculate:</strong> Vd = 7920 / 1000 = 7.92V</p>
                <p><strong>Limit:</strong> Power circuit = 11.5V (5%)</p>
                <p className="text-green-400 mt-2">7.92V is less than 11.5V - COMPLIANT</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Example 2: Bedroom Lighting Circuit</p>
              <p className="text-xs text-white/90 mb-2">Lighting circuit supplies 5 bedrooms. Cable: 1.5mm sq (mV/A/m = 29). Total run to furthest point: 35m. Design current: 5A.</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Formula:</strong> Vd = (mV/A/m x I x L) / 1000</p>
                <p><strong>Substituting:</strong> Vd = (29 x 5 x 35) / 1000</p>
                <p><strong>Calculate:</strong> Vd = 5075 / 1000 = 5.08V</p>
                <p><strong>Limit:</strong> Lighting circuit = 6.9V (3%)</p>
                <p className="text-green-400 mt-2">5.08V is less than 6.9V - COMPLIANT</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <p className="text-sm font-medium text-red-400 mb-2">Example 3: Non-Compliant Scenario</p>
              <p className="text-xs text-white/90 mb-2">Garage lighting circuit. Cable: 1.5mm sq (mV/A/m = 29). Length: 28m. Design current: 10A.</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Formula:</strong> Vd = (mV/A/m x I x L) / 1000</p>
                <p><strong>Substituting:</strong> Vd = (29 x 10 x 28) / 1000</p>
                <p><strong>Calculate:</strong> Vd = 8120 / 1000 = 8.12V</p>
                <p><strong>Limit:</strong> Lighting circuit = 6.9V (3%)</p>
                <p className="text-red-400 mt-2">8.12V EXCEEDS 6.9V - NON-COMPLIANT</p>
                <p className="text-white/60 mt-2">Solution: Increase to 2.5mm sq cable (mV/A/m = 18)</p>
                <p className="text-white/60">New Vd = (18 x 10 x 28) / 1000 = 5.04V - COMPLIANT</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Exam Tip:</strong> Always state the applicable limit before comparing your calculated value. This shows the examiner you understand which limit applies.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Outbuildings and External Installations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Outbuildings, garages, and external installations often involve longer cable runs, making voltage drop a critical design factor.
            </p>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Example 4: Detached Garage Supply</p>
              <p className="text-xs text-white/90 mb-2">Sub-main to garage: 6mm sq SWA (mV/A/m = 7.3). Length: 30m. Maximum demand: 32A.</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Formula:</strong> Vd = (mV/A/m x I x L) / 1000</p>
                <p><strong>Substituting:</strong> Vd = (7.3 x 32 x 30) / 1000</p>
                <p><strong>Calculate:</strong> Vd = 7008 / 1000 = 7.01V</p>
                <p><strong>Limit:</strong> Power circuit = 11.5V (5%)</p>
                <p className="text-green-400 mt-2">7.01V is less than 11.5V - COMPLIANT</p>
                <p className="text-white/60 mt-2">Note: This leaves 11.5 - 7.01 = 4.49V for final circuits in the garage</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Example 5: Garden Office with EV Charger</p>
              <p className="text-xs text-white/90 mb-2">Sub-main to garden office: 10mm sq SWA (mV/A/m = 4.4). Length: 40m. Total load: 50A (including 32A EV charger).</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Formula:</strong> Vd = (mV/A/m x I x L) / 1000</p>
                <p><strong>Substituting:</strong> Vd = (4.4 x 50 x 40) / 1000</p>
                <p><strong>Calculate:</strong> Vd = 8800 / 1000 = 8.8V</p>
                <p><strong>Limit:</strong> Power circuit = 11.5V (5%)</p>
                <p className="text-green-400 mt-2">8.8V is less than 11.5V - COMPLIANT</p>
                <p className="text-white/60 mt-2">Remaining for final circuits: 11.5 - 8.8 = 2.7V</p>
                <p className="text-yellow-400 mt-1">Warning: Limited headroom for final circuits - consider 16mm sq</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-2">Typical SWA Cable mV/A/m Values:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-elec-yellow/80">Cable Size (mm sq)</th>
                      <th className="text-left py-2 text-elec-yellow/80">mV/A/m</th>
                      <th className="text-left py-2 text-elec-yellow/80">Max Length @ 32A for 11.5V</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/5">
                      <td className="py-2">4</td>
                      <td className="py-2">11</td>
                      <td className="py-2">32.7m</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">6</td>
                      <td className="py-2">7.3</td>
                      <td className="py-2">49.2m</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">10</td>
                      <td className="py-2">4.4</td>
                      <td className="py-2">81.8m</td>
                    </tr>
                    <tr>
                      <td className="py-2">16</td>
                      <td className="py-2">2.8</td>
                      <td className="py-2">128.6m</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design Consideration:</strong> For outbuilding supplies, always calculate the sub-main drop and ensure adequate margin remains for final circuits within the outbuilding.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Commercial and Industrial Examples
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commercial and industrial installations often involve larger currents, longer runs, and three-phase supplies. Understanding how to handle these scenarios is essential.
            </p>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Example 6: Warehouse Distribution Circuit</p>
              <p className="text-xs text-white/90 mb-2">Sub-main from main switchboard to distribution board: 25mm sq SWA (mV/A/m = 1.75). Length: 60m. Load: 80A.</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Formula:</strong> Vd = (mV/A/m x I x L) / 1000</p>
                <p><strong>Substituting:</strong> Vd = (1.75 x 80 x 60) / 1000</p>
                <p><strong>Calculate:</strong> Vd = 8400 / 1000 = 8.4V</p>
                <p><strong>Limit:</strong> Power circuit = 11.5V (5%)</p>
                <p className="text-green-400 mt-2">8.4V is less than 11.5V - COMPLIANT</p>
                <p className="text-white/60 mt-2">Remaining for final circuits: 11.5 - 8.4 = 3.1V</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Example 7: Three-Phase Motor Circuit</p>
              <p className="text-xs text-white/90 mb-2">Three-phase 400V supply to motor. Cable: 6mm sq (mV/A/m = 7.3). Length: 25m. Motor FLC: 20A per phase.</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Note:</strong> For three-phase balanced loads, use standard formula with line current</p>
                <p><strong>Formula:</strong> Vd = (mV/A/m x I x L) / 1000</p>
                <p><strong>Substituting:</strong> Vd = (7.3 x 20 x 25) / 1000</p>
                <p><strong>Calculate:</strong> Vd = 3650 / 1000 = 3.65V</p>
                <p><strong>Limit:</strong> 5% of 400V = 20V for three-phase</p>
                <p className="text-green-400 mt-2">3.65V is much less than 20V - COMPLIANT</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Example 8: Retail Unit Lighting</p>
              <p className="text-xs text-white/90 mb-2">Shop floor lighting circuit. Cable: 2.5mm sq (mV/A/m = 18). Total run: 45m. Design current: 12A.</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Formula:</strong> Vd = (mV/A/m x I x L) / 1000</p>
                <p><strong>Substituting:</strong> Vd = (18 x 12 x 45) / 1000</p>
                <p><strong>Calculate:</strong> Vd = 9720 / 1000 = 9.72V</p>
                <p><strong>Limit:</strong> Lighting circuit = 6.9V (3%)</p>
                <p className="text-red-400 mt-2">9.72V EXCEEDS 6.9V - NON-COMPLIANT</p>
                <p className="text-white/60 mt-2">Solution: Increase to 4mm sq (mV/A/m = 11)</p>
                <p className="text-white/60">New Vd = (11 x 12 x 45) / 1000 = 5.94V - COMPLIANT</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Commercial Note:</strong> Large retail and commercial premises often require careful voltage drop design due to the combination of long cable runs and the stricter 3% lighting limit.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Ring Circuits and Combined Drops
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ring final circuits and installations with distribution circuits feeding final circuits require special calculation approaches.
            </p>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Example 9: Ring Final Circuit</p>
              <p className="text-xs text-white/90 mb-2">Ring circuit total length: 64m. Cable: 2.5mm sq (mV/A/m = 18). Maximum load at any point: 32A.</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Ring Circuit Rule:</strong> Effective length = total length / 4</p>
                <p><strong>Effective length:</strong> 64 / 4 = 16m</p>
                <p><strong>Formula:</strong> Vd = (mV/A/m x I x L effective) / 1000</p>
                <p><strong>Substituting:</strong> Vd = (18 x 32 x 16) / 1000</p>
                <p><strong>Calculate:</strong> Vd = 9216 / 1000 = 9.22V</p>
                <p><strong>Limit:</strong> Power circuit = 11.5V (5%)</p>
                <p className="text-green-400 mt-2">9.22V is less than 11.5V - COMPLIANT</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Example 10: Combined Distribution and Final Circuit</p>
              <p className="text-xs text-white/90 mb-2">Sub-main to kitchen DB: 10mm sq, 15m, 50A (mV/A/m = 4.4). Final circuit to oven: 6mm sq, 8m, 30A (mV/A/m = 7.3).</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Step 1: Distribution Circuit Drop</strong></p>
                <p className="ml-4">Vd1 = (4.4 x 50 x 15) / 1000 = 3.3V</p>

                <p className="mt-2"><strong>Step 2: Final Circuit Drop</strong></p>
                <p className="ml-4">Vd2 = (7.3 x 30 x 8) / 1000 = 1.75V</p>

                <p className="mt-2"><strong>Step 3: Total Voltage Drop</strong></p>
                <p className="ml-4">Vd total = 3.3 + 1.75 = 5.05V</p>

                <p><strong>Limit:</strong> Power circuit = 11.5V (5%)</p>
                <p className="text-green-400 mt-2">5.05V is less than 11.5V - COMPLIANT</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-2">Exam Calculation Checklist:</p>
              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70">1.</span>
                  <span>State the formula clearly: Vd = (mV/A/m x I x L) / 1000</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70">2.</span>
                  <span>List all given values with units</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70">3.</span>
                  <span>Substitute values into formula</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70">4.</span>
                  <span>Show intermediate calculation steps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70">5.</span>
                  <span>State the applicable limit (3% or 5%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70">6.</span>
                  <span>Compare result with limit and state compliance</span>
                </li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Remember:</strong> In exams, method marks are awarded for showing correct working even if the final answer has a minor arithmetic error. Always show your full working.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Quick Mental Checks</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1.5mm sq at 10A: approximately 3V per 10m</li>
                <li>2.5mm sq at 20A: approximately 3.6V per 10m</li>
                <li>6mm sq at 40A: approximately 2.9V per 10m</li>
                <li>If your answer is over 50V, you forgot to divide by 1000</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Exam Scenarios</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Shower circuits: High current, check voltage drop carefully</li>
                <li>Garden/outbuilding: Long runs, often critical for voltage drop</li>
                <li>Ring circuits: Use quarter-length rule</li>
                <li>Distribution + final: Add both drops together</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Errors to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Forgetting to divide by 1000</li>
                <li>Using wrong limit (3% vs 5%)</li>
                <li>Not adding distribution circuit drop</li>
                <li>Using route length instead of cable length</li>
                <li>Using wrong mV/A/m for cable type</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Practical Examples</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Typical Calculations</p>
                <ul className="space-y-0.5">
                  <li>Shower 40A, 15m, 6mm: 4.4V</li>
                  <li>Cooker 30A, 12m, 6mm: 2.6V</li>
                  <li>Lighting 6A, 25m, 1.5mm: 4.4V</li>
                  <li>Ring 32A, 64m total: 9.2V</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Limits</p>
                <ul className="space-y-0.5">
                  <li>Lighting: 3% = 6.9V (230V)</li>
                  <li>Power: 5% = 11.5V (230V)</li>
                  <li>Three-phase: 5% = 20V (400V)</li>
                  <li>Total = distribution + final</li>
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
            <Link to="/study-centre/apprentice/level3-module3-section6-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Cable Sizing for Voltage Drop
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section6">
              Back to Section 6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module3Section6_5;
