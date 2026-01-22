/**
 * Level 3 Module 3 Section 6.3 - Voltage Drop Calculations
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
const TITLE = "Voltage Drop Calculations - Level 3 Module 3 Section 6.3";
const DESCRIPTION = "Master voltage drop calculations for circuit design. Learn step-by-step methods using BS 7671 tables and mV/A/m values for single-phase and three-phase circuits.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "A 15m circuit uses 2.5mm sq cable (mV/A/m = 18) with design current 18A. What is the voltage drop?",
    options: [
      "4.86V",
      "48.6V",
      "0.486V",
      "486V"
    ],
    correctIndex: 0,
    explanation: "Vd = (mV/A/m x I x L) / 1000 = (18 x 18 x 15) / 1000 = 4860 / 1000 = 4.86V. This is within the 11.5V (5%) limit for power circuits."
  },
  {
    id: "check-2",
    question: "For the calculation above (4.86V drop), would this be acceptable for a lighting circuit?",
    options: [
      "Yes, it's within the 6.9V limit",
      "No, it exceeds the 3% limit for lighting",
      "Yes, all circuits have the same limit",
      "Cannot be determined"
    ],
    correctIndex: 0,
    explanation: "The 4.86V voltage drop is within the 6.9V (3% of 230V) limit for lighting circuits. This cable and circuit length combination would be acceptable for either lighting or power use."
  },
  {
    id: "check-3",
    question: "What is the maximum cable length for a 20A circuit using 2.5mm sq cable (mV/A/m = 18) if voltage drop must not exceed 11.5V?",
    options: [
      "31.9m",
      "11.5m",
      "20m",
      "63.9m"
    ],
    correctIndex: 0,
    explanation: "Rearranging: L = (Vd x 1000) / (mV/A/m x I) = (11.5 x 1000) / (18 x 20) = 11500 / 360 = 31.9m maximum length."
  },
  {
    id: "check-4",
    question: "A distribution circuit drops 3V and feeds a final circuit that drops 5V. Is this acceptable for a power circuit?",
    options: [
      "Yes, 8V total is within the 11.5V limit",
      "No, each circuit must independently meet limits",
      "Yes, final circuits have separate limits",
      "No, distribution circuits cannot have any drop"
    ],
    correctIndex: 0,
    explanation: "Total voltage drop = 3V + 5V = 8V, which is within the 11.5V (5%) limit for power circuits. BS 7671 limits apply to total drop from origin to point of use."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "The voltage drop formula using mV/A/m values is:",
    options: [
      "Vd = mV/A/m x I x L",
      "Vd = (mV/A/m x I x L) / 1000",
      "Vd = (mV/A/m x I) / L",
      "Vd = mV/A/m / (I x L)"
    ],
    correctAnswer: 1,
    explanation: "The formula is Vd = (mV/A/m x I x L) / 1000. The division by 1000 converts millivolts to volts. mV/A/m is the value from tables, I is design current, L is cable length."
  },
  {
    id: 2,
    question: "To find maximum cable length for a given voltage drop limit, rearrange to:",
    options: [
      "L = Vd x mV/A/m x I",
      "L = (Vd x 1000) / (mV/A/m x I)",
      "L = mV/A/m / (Vd x I)",
      "L = (mV/A/m x I) / Vd"
    ],
    correctAnswer: 1,
    explanation: "Rearranging Vd = (mV/A/m x I x L) / 1000 gives L = (Vd x 1000) / (mV/A/m x I). This is useful for determining maximum circuit length for a given cable size."
  },
  {
    id: 3,
    question: "A 40m circuit with 10A load uses 1.5mm sq cable (mV/A/m = 29). The voltage drop is:",
    options: [
      "11.6V",
      "1.16V",
      "116V",
      "0.116V"
    ],
    correctAnswer: 0,
    explanation: "Vd = (29 x 10 x 40) / 1000 = 11600 / 1000 = 11.6V. This exceeds the 6.9V lighting limit and marginally exceeds the 11.5V power limit."
  },
  {
    id: 4,
    question: "If the calculated voltage drop is too high, the most common solution is:",
    options: [
      "Reduce the load current",
      "Use a larger conductor cross-sectional area",
      "Accept the higher voltage drop",
      "Increase the supply voltage"
    ],
    correctAnswer: 1,
    explanation: "Using a larger conductor reduces the mV/A/m value, directly reducing voltage drop. This is the most practical solution in most situations where circuit length and load are fixed."
  },
  {
    id: 5,
    question: "For a three-phase balanced load, the voltage drop formula includes:",
    options: [
      "A factor of 2 for line and neutral",
      "A factor of root 3 (1.732)",
      "A factor of 3 for three phases",
      "The same calculation as single-phase"
    ],
    correctAnswer: 1,
    explanation: "Three-phase voltage drop = (root 3 x mV/A/m x I x L) / 1000 for line-to-line voltage. The root 3 factor relates line-to-neutral and line-to-line voltages in balanced three-phase systems."
  },
  {
    id: 6,
    question: "When using BS 7671 Appendix 4 voltage drop tables, the values are given at:",
    options: [
      "Operating temperature (70 degrees C)",
      "Reference temperature (20 degrees C)",
      "Maximum conductor temperature",
      "Ambient temperature"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 Appendix 4 voltage drop values are given at conductor operating temperature, unlike resistance tables which are at 20 degrees C. No temperature correction is needed for voltage drop calculations."
  },
  {
    id: 7,
    question: "A circuit has mV/A/m = 11. To achieve maximum 5V drop with 25A load, maximum length is:",
    options: [
      "18.2m",
      "1.82m",
      "182m",
      "137.5m"
    ],
    correctAnswer: 0,
    explanation: "L = (Vd x 1000) / (mV/A/m x I) = (5 x 1000) / (11 x 25) = 5000 / 275 = 18.18m, approximately 18.2m maximum."
  },
  {
    id: 8,
    question: "For a ring final circuit, voltage drop is calculated using:",
    options: [
      "Full ring length",
      "Half the ring length",
      "Quarter the ring length for worst-case",
      "Longest route around the ring"
    ],
    correctAnswer: 2,
    explanation: "For a ring circuit with load at the mid-point (worst case), effective length is quarter of total ring length because current splits and conductors work in parallel. This gives the worst-case voltage drop scenario."
  },
  {
    id: 9,
    question: "If a distribution circuit uses 2% of supply voltage and a final circuit must not exceed 3% total, the final circuit limit is:",
    options: [
      "3%",
      "1%",
      "5%",
      "2%"
    ],
    correctAnswer: 1,
    explanation: "Total allowable is 3% (lighting). If distribution uses 2%, only 1% remains for the final circuit. Total drop from origin to point of use must not exceed the BS 7671 limit."
  },
  {
    id: 10,
    question: "The reactance component of voltage drop is significant for:",
    options: [
      "All cable sizes",
      "Cables 25mm sq and larger",
      "Only very short circuits",
      "Low power factor loads only"
    ],
    correctAnswer: 1,
    explanation: "For conductors 25mm sq and larger, cable reactance becomes significant and the mV/A/m values include both resistive and reactive components. Separate columns may be provided for different power factors."
  },
  {
    id: 11,
    question: "To find minimum conductor size for a given voltage drop limit, you should:",
    options: [
      "Calculate required mV/A/m and find smallest cable meeting it",
      "Always use the largest available cable",
      "Use the same size as the protective device rating",
      "Ignore voltage drop for cables under 10mm sq"
    ],
    correctAnswer: 0,
    explanation: "Calculate the maximum acceptable mV/A/m: max mV/A/m = (Vd x 1000) / (I x L). Then select the smallest cable size with mV/A/m equal to or less than this value."
  },
  {
    id: 12,
    question: "A 230V supply feeds a 25m circuit. For 5% max drop, the maximum voltage at the load is:",
    options: [
      "230V",
      "218.5V",
      "241.5V",
      "225V"
    ],
    correctAnswer: 1,
    explanation: "5% of 230V = 11.5V drop. Minimum voltage at load = 230 - 11.5 = 218.5V. Equipment connected must be able to operate satisfactorily at this voltage."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Do I need to calculate voltage drop for every circuit?",
    answer: "Voltage drop should be verified for all circuits during design. Short domestic circuits with standard cable sizes typically comply. Long runs, high current circuits, or non-standard situations require explicit calculation. When in doubt, calculate."
  },
  {
    question: "What if I need both current-carrying capacity AND voltage drop to comply?",
    answer: "Calculate both requirements independently and use whichever requires the larger conductor. Often for long circuits, voltage drop is the determining factor even though current-carrying capacity would permit a smaller cable."
  },
  {
    question: "How do I handle voltage drop for motor circuits with high starting current?",
    answer: "Motor starting current (typically 6-8 times running current) causes temporary voltage drop. While BS 7671 limits apply to running current, excessive starting drop can affect other equipment. Consider this in the design, especially for direct-on-line starting of large motors."
  },
  {
    question: "Are the mV/A/m values the same for all installation methods?",
    answer: "BS 7671 tables provide values for different installation methods. While resistance-based voltage drop is similar, the operating temperature (and therefore resistance) can vary with installation method. Use the appropriate table column for your installation method."
  },
  {
    question: "How do I account for harmonics in voltage drop calculations?",
    answer: "Harmonics, particularly third harmonics, can increase neutral current in three-phase systems. For installations with significant non-linear loads, neutral current may exceed phase current, requiring voltage drop to be calculated based on actual neutral current."
  },
  {
    question: "Can I use diversity in voltage drop calculations?",
    answer: "Generally, use the actual expected load current (design current Ib) which may include diversity. However, for circuits where maximum load is likely (such as dedicated equipment circuits), use full load current. Conservative calculations use full rated load."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module3Section6_3 = () => {
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
        

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Formula:</strong> Vd = (mV/A/m x I x L) / 1000</li>
              <li><strong>Max Length:</strong> L = (Vd x 1000) / (mV/A/m x I)</li>
              <li><strong>Limits:</strong> 6.9V lighting, 11.5V power (230V supply)</li>
              <li><strong>Tables:</strong> BS 7671 Appendix 4 for mV/A/m values</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Long cable runs, high current circuits</li>
              <li><strong>Use:</strong> BS 7671 Table 4D5 for flat cable mV/A/m</li>
              <li><strong>Apply:</strong> Add distribution + final circuit drops</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        

        

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Standard Voltage Drop Calculation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The standard method for calculating voltage drop uses mV/A/m values from BS 7671 Appendix 4 tables. This method is straightforward and accurate for most single-phase and three-phase circuits.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-white mb-3">Step-by-Step Calculation Method:</p>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Step 1: Gather Information</p>
                  <ul className="text-white/80 mt-1 space-y-1">
                    <li>Design current (Ib) in amperes</li>
                    <li>Circuit length (L) in metres</li>
                    <li>Cable type and size</li>
                    <li>Circuit type (lighting or power)</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Step 2: Find mV/A/m Value</p>
                  <p className="text-white/80 mt-1">Look up mV/A/m from BS 7671 Appendix 4 for your cable type, size, and installation method.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Step 3: Calculate Voltage Drop</p>
                  <p className="text-white font-mono mt-1">Vd = (mV/A/m x Ib x L) / 1000</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Step 4: Compare with Limit</p>
                  <p className="text-white/80 mt-1">Lighting: max 6.9V (3% of 230V)<br/>Power: max 11.5V (5% of 230V)</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Worked Example: Socket Outlet Circuit</p>
              <p className="text-xs text-white/90 mb-2">Calculate voltage drop for a 20A radial circuit, 18m long, using 2.5mm sq flat cable.</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Step 1:</strong> Ib = 20A, L = 18m, 2.5mm sq flat cable</p>
                <p><strong>Step 2:</strong> From Table 4D5 (method C), mV/A/m = 18</p>
                <p><strong>Step 3:</strong> Vd = (18 x 20 x 18) / 1000 = 6480 / 1000 = 6.48V</p>
                <p><strong>Step 4:</strong> 6.48V is less than 11.5V limit for power circuits</p>
                <p className="text-green-400 mt-2">Voltage drop = 6.48V - ACCEPTABLE for power circuit</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> The mV/A/m values in BS 7671 Appendix 4 are given at conductor operating temperature, so no temperature correction is needed for voltage drop calculations.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Maximum Length Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Sometimes you need to find the maximum cable length that will keep voltage drop within limits. This is useful when planning cable routes or determining if a particular cable size can reach the intended load location.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-white mb-3">Maximum Length Formula:</p>
              <p className="text-xl text-white font-mono text-center mb-4">L max = (Vd max x 1000) / (mV/A/m x Ib)</p>
              <div className="text-sm text-white/80">
                <p>Where:</p>
                <ul className="ml-4 mt-1 space-y-1">
                  <li>L max = Maximum cable length (metres)</li>
                  <li>Vd max = Maximum allowable voltage drop (volts)</li>
                  <li>mV/A/m = Value from cable tables</li>
                  <li>Ib = Design current (amperes)</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Worked Example: Maximum Length for Lighting Circuit</p>
              <p className="text-xs text-white/90 mb-2">What is the maximum length for a 6A lighting circuit using 1.5mm sq cable (mV/A/m = 29)?</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Given:</strong> Ib = 6A, mV/A/m = 29, Vd max = 6.9V (lighting)</p>
                <p><strong>Calculate:</strong></p>
                <p className="ml-4">L max = (6.9 x 1000) / (29 x 6)</p>
                <p className="ml-4">L max = 6900 / 174</p>
                <p className="ml-4">L max = 39.7m</p>
                <p className="text-green-400 mt-2">Maximum cable length = 39.7m for this circuit</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-2">Quick Reference - Maximum Lengths (Power Circuits, 11.5V limit):</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-elec-yellow/80">Cable (mm sq)</th>
                      <th className="text-left py-2 text-elec-yellow/80">mV/A/m</th>
                      <th className="text-left py-2 text-elec-yellow/80">10A Max L</th>
                      <th className="text-left py-2 text-elec-yellow/80">20A Max L</th>
                      <th className="text-left py-2 text-elec-yellow/80">32A Max L</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/5">
                      <td className="py-2">1.5</td>
                      <td className="py-2">29</td>
                      <td className="py-2">39.7m</td>
                      <td className="py-2">19.8m</td>
                      <td className="py-2">12.4m</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">2.5</td>
                      <td className="py-2">18</td>
                      <td className="py-2">63.9m</td>
                      <td className="py-2">31.9m</td>
                      <td className="py-2">19.9m</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">4.0</td>
                      <td className="py-2">11</td>
                      <td className="py-2">104.5m</td>
                      <td className="py-2">52.3m</td>
                      <td className="py-2">32.7m</td>
                    </tr>
                    <tr>
                      <td className="py-2">6.0</td>
                      <td className="py-2">7.3</td>
                      <td className="py-2">157.5m</td>
                      <td className="py-2">78.8m</td>
                      <td className="py-2">49.2m</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Based on flat cable, method C. Halve values approximately for 3% lighting limit.</p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Practical Tip:</strong> When planning installations, check maximum lengths early to ensure your proposed cable routes are feasible with standard cable sizes.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Minimum Conductor Size Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When circuit length and current are known, you can calculate the maximum acceptable mV/A/m value, then select the smallest cable size that meets this requirement.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-white mb-3">Maximum mV/A/m Formula:</p>
              <p className="text-xl text-white font-mono text-center mb-4">mV/A/m max = (Vd max x 1000) / (Ib x L)</p>
              <div className="text-sm text-white/80">
                <p>Then select the smallest cable with mV/A/m less than or equal to this value.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Worked Example: Selecting Cable Size for Voltage Drop</p>
              <p className="text-xs text-white/90 mb-2">Select minimum cable size for a 25m, 30A power circuit using flat cable.</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Step 1:</strong> Calculate max mV/A/m</p>
                <p className="ml-4">mV/A/m max = (11.5 x 1000) / (30 x 25)</p>
                <p className="ml-4">mV/A/m max = 11500 / 750 = 15.3</p>
                <p className="mt-2"><strong>Step 2:</strong> Find cable with mV/A/m less than or equal to 15.3</p>
                <p className="ml-4">1.5mm sq: 29 - too high</p>
                <p className="ml-4">2.5mm sq: 18 - too high</p>
                <p className="ml-4">4.0mm sq: 11 - acceptable</p>
                <p className="text-green-400 mt-2">Minimum cable size for voltage drop = 4.0mm sq</p>
                <p className="text-white/60 mt-1">(Also check current-carrying capacity - may require larger)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <p className="text-sm font-medium text-red-400 mb-2">Important: Both Requirements Must Be Met</p>
              <p className="text-xs text-white/90">
                A cable must satisfy BOTH current-carrying capacity AND voltage drop requirements. Calculate each independently and use the larger cable. For short circuits with high current, current-carrying capacity usually determines size. For long circuits with moderate current, voltage drop often requires a larger cable than current-carrying capacity alone would need.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design Process:</strong> Always calculate both requirements and compare. Document both calculations in your design to show compliance with BS 7671.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Combined Distribution and Final Circuit Drop
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When an installation includes distribution circuits feeding final circuits, the total voltage drop from the origin to the point of use is the sum of both. Both must be calculated and the combined total must not exceed the BS 7671 limit.
            </p>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-2">Total Voltage Drop:</p>
              <div className="p-3 bg-white/5 rounded font-mono text-sm">
                <p>Vd total = Vd distribution + Vd final</p>
                <p className="mt-2 text-white/70">Where both drops are calculated using their respective cable sizes and lengths</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Worked Example: Combined Voltage Drop</p>
              <p className="text-xs text-white/90 mb-2">A distribution circuit (10mm sq, 30m, 60A) feeds a DB. A final circuit (2.5mm sq, 15m, 20A) runs from that DB. Calculate total drop.</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Distribution Circuit:</strong></p>
                <p className="ml-4">mV/A/m = 4.4 (10mm sq)</p>
                <p className="ml-4">Vd dist = (4.4 x 60 x 30) / 1000 = 7.92V</p>
                <p className="mt-2"><strong>Final Circuit:</strong></p>
                <p className="ml-4">mV/A/m = 18 (2.5mm sq)</p>
                <p className="ml-4">Vd final = (18 x 20 x 15) / 1000 = 5.4V</p>
                <p className="mt-2"><strong>Total:</strong></p>
                <p className="ml-4">Vd total = 7.92 + 5.4 = 13.32V</p>
                <p className="text-red-400 mt-2">13.32V exceeds 11.5V limit - NOT ACCEPTABLE</p>
                <p className="text-white/60 mt-1">Solution: Increase distribution cable to reduce its voltage drop</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Good Practice</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Keep distribution circuit drop to 1-2%</li>
                  <li>Leave headroom for final circuits</li>
                  <li>Document both calculations</li>
                  <li>Consider future load growth</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When Limits Exceeded</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Increase distribution cable size</li>
                  <li>Relocate DB closer to main supply</li>
                  <li>Increase final circuit cable size</li>
                  <li>Split into multiple distribution circuits</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Remember:</strong> The BS 7671 limits apply to the total voltage drop from origin to point of use, not to each circuit independently.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Calculation Procedure Summary</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Determine design current (Ib) and circuit length (L)</li>
                <li>2. Look up mV/A/m from BS 7671 Appendix 4</li>
                <li>3. Calculate: Vd = (mV/A/m x Ib x L) / 1000</li>
                <li>4. Add distribution circuit drop if applicable</li>
                <li>5. Compare total with limit (6.9V or 11.5V)</li>
                <li>6. Increase cable size if necessary and recalculate</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Quick Estimation Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Going up one cable size roughly halves mV/A/m</li>
                <li>1.5mm sq at 10A has about 3V drop per 10m</li>
                <li>2.5mm sq at 20A has about 3.6V drop per 10m</li>
                <li>For quick checks, multiply A x m and compare to limits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Calculation Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Forgetting to divide by 1000 (gives millivolts not volts)</li>
                <li>Using cable route length instead of actual cable length</li>
                <li>Ignoring distribution circuit contribution</li>
                <li>Using wrong mV/A/m column for installation method</li>
                <li>Not verifying both current capacity AND voltage drop</li>
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
                <p className="font-medium text-white mb-1">Key Formulae</p>
                <ul className="space-y-0.5">
                  <li>Vd = (mV/A/m x I x L) / 1000</li>
                  <li>L max = (Vd x 1000) / (mV/A/m x I)</li>
                  <li>mV/A/m max = (Vd x 1000) / (I x L)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Limits (230V)</p>
                <ul className="space-y-0.5">
                  <li>Lighting: 3% = 6.9V</li>
                  <li>Power: 5% = 11.5V</li>
                  <li>Total from origin to point of use</li>
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
            <Link to="/study-centre/apprentice/level3-module3-section6-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Resistance and Voltage Drop
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section6-4">
              Next: Cable Sizing for Voltage Drop
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module3Section6_3;
