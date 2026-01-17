/**
 * Level 3 Module 3 Section 6.4 - Cable Sizing for Voltage Drop
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
const TITLE = "Cable Sizing for Voltage Drop - Level 3 Module 3 Section 6.4";
const DESCRIPTION = "Master cable selection to meet voltage drop requirements. Learn systematic approaches to sizing cables for compliance with BS 7671 limits using mV/A/m tables.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "A 32A circuit runs 40m. What is the maximum mV/A/m value allowed to stay within 11.5V drop?",
    options: [
      "9.0",
      "11.5",
      "14.4",
      "8.98"
    ],
    correctIndex: 3,
    explanation: "Max mV/A/m = (Vd x 1000) / (I x L) = (11.5 x 1000) / (32 x 40) = 11500 / 1280 = 8.98. Need cable with mV/A/m of 8.98 or less."
  },
  {
    id: "check-2",
    question: "Current-carrying capacity requires 4mm sq, but voltage drop requires 6mm sq. Which size must you use?",
    options: [
      "4mm sq - current capacity is the priority",
      "5mm sq - the average of both",
      "6mm sq - must meet BOTH requirements",
      "Either size is acceptable"
    ],
    correctIndex: 2,
    explanation: "The cable must satisfy BOTH current-carrying capacity AND voltage drop requirements. Use the larger of the two calculated sizes - in this case 6mm sq."
  },
  {
    id: "check-3",
    question: "What is the first step in a systematic cable sizing procedure?",
    options: [
      "Calculate voltage drop",
      "Determine the design current (Ib)",
      "Select the cable type",
      "Look up mV/A/m values"
    ],
    correctIndex: 1,
    explanation: "Always start by determining the design current (Ib). This is needed for both current-carrying capacity calculations and voltage drop calculations."
  },
  {
    id: "check-4",
    question: "Why might voltage drop be the determining factor for cable size rather than current capacity?",
    options: [
      "Voltage drop is always more important",
      "Long cable runs increase voltage drop significantly",
      "Current capacity tables are less accurate",
      "Voltage drop limits are stricter than current limits"
    ],
    correctIndex: 1,
    explanation: "For long cable runs, voltage drop increases proportionally with length. A cable adequate for current capacity may still exceed voltage drop limits over long distances, requiring a larger conductor."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "The systematic cable sizing procedure requires checking both:",
    options: [
      "Voltage drop and cable colour",
      "Current-carrying capacity and voltage drop",
      "Cable length and diameter",
      "Insulation type and conductor material"
    ],
    correctAnswer: 1,
    explanation: "Cable selection must satisfy both current-carrying capacity (to prevent overheating) and voltage drop (to ensure equipment operates correctly). Both must be verified independently."
  },
  {
    id: 2,
    question: "To find minimum cable size for voltage drop, calculate the maximum acceptable mV/A/m as:",
    options: [
      "Vd max / (I x L)",
      "(Vd max x 1000) / (I x L)",
      "I x L x 1000 / Vd max",
      "(I x L) / (Vd max x 1000)"
    ],
    correctAnswer: 1,
    explanation: "Rearranging Vd = (mV/A/m x I x L) / 1000 gives max mV/A/m = (Vd max x 1000) / (I x L). Then select smallest cable with mV/A/m at or below this value."
  },
  {
    id: 3,
    question: "A 20A circuit is 35m long. For 5% max drop, the maximum mV/A/m value is:",
    options: [
      "16.4",
      "14.0",
      "11.5",
      "8.2"
    ],
    correctAnswer: 0,
    explanation: "Max mV/A/m = (11.5 x 1000) / (20 x 35) = 11500 / 700 = 16.4. Select cable with mV/A/m of 16.4 or less (2.5mm sq flat cable at 18 would NOT be acceptable)."
  },
  {
    id: 4,
    question: "When current capacity requires 2.5mm sq but voltage drop requires 4mm sq, the correct approach is:",
    options: [
      "Use 2.5mm sq as it saves cost",
      "Use 3mm sq as a compromise",
      "Use 4mm sq to satisfy both requirements",
      "Request a derogation for the voltage drop"
    ],
    correctAnswer: 2,
    explanation: "Both requirements must be met. The cable must be sized for whichever is more demanding. Here, voltage drop requires the larger cable, so 4mm sq is needed."
  },
  {
    id: 5,
    question: "The correction factor Cg is applied when:",
    options: [
      "Calculating voltage drop",
      "Cables are grouped together",
      "Ambient temperature exceeds 30 degrees C",
      "Using aluminium conductors"
    ],
    correctAnswer: 1,
    explanation: "Cg is the grouping correction factor applied to current-carrying capacity when cables are bunched or grouped together. It reduces the effective capacity due to mutual heating."
  },
  {
    id: 6,
    question: "For a domestic ring final circuit, 2.5mm sq cable is typically used because:",
    options: [
      "It is the cheapest option available",
      "Voltage drop is not important for ring circuits",
      "The parallel paths reduce effective resistance",
      "Regulations specifically require this size"
    ],
    correctAnswer: 2,
    explanation: "Ring circuits have two parallel current paths, effectively halving the resistance and voltage drop. Combined with the quarter-length worst case, 2.5mm sq is usually adequate for typical ring lengths."
  },
  {
    id: 7,
    question: "When sizing cables for motor circuits, the design current should be:",
    options: [
      "The motor starting current",
      "The motor full-load current",
      "Half the motor rating",
      "The motor nameplate current divided by efficiency"
    ],
    correctAnswer: 1,
    explanation: "Cable sizing uses motor full-load current (running current) as the design current. Starting current, though higher, is temporary and doesn't determine cable thermal requirements for continuous operation."
  },
  {
    id: 8,
    question: "The voltage drop tables in BS 7671 Appendix 4 give values at:",
    options: [
      "20 degrees C reference temperature",
      "Conductor operating temperature",
      "Maximum ambient temperature",
      "30 degrees C standard conditions"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Appendix 4 voltage drop values are given at conductor operating temperature (typically 70 degrees C for thermoplastic). No temperature correction is needed for voltage drop calculations."
  },
  {
    id: 9,
    question: "A cable's tabulated current-carrying capacity (It) must be greater than or equal to:",
    options: [
      "The design current directly",
      "Design current divided by all correction factors",
      "The protective device rating only",
      "Design current multiplied by correction factors"
    ],
    correctAnswer: 1,
    explanation: "It must be at least Ib / (Ca x Cg x Ci x Cc) where correction factors account for ambient temperature, grouping, thermal insulation, and any other relevant factors."
  },
  {
    id: 10,
    question: "If calculated cable size for voltage drop falls between standard sizes (e.g., 3.5mm sq), you should:",
    options: [
      "Round down to the nearest standard size",
      "Round up to the next standard size",
      "Use the average of two standard sizes",
      "Request a special cable to be manufactured"
    ],
    correctAnswer: 1,
    explanation: "Always round up to the next available standard cable size. Using a smaller size would mean exceeding the voltage drop limit, which is not permitted."
  },
  {
    id: 11,
    question: "For a three-phase circuit, the voltage drop limit applies to:",
    options: [
      "Each phase individually",
      "The neutral conductor only",
      "Line-to-line voltage",
      "Total of all three phases combined"
    ],
    correctAnswer: 2,
    explanation: "For three-phase circuits, the voltage drop percentage limit applies to the line-to-line voltage. For 400V three-phase, 5% = 20V maximum drop."
  },
  {
    id: 12,
    question: "When using cable selection software or apps, you should still:",
    options: [
      "Trust the software completely without checking",
      "Verify results with manual spot-checks",
      "Ignore the software and do manual calculations",
      "Only use software from cable manufacturers"
    ],
    correctAnswer: 1,
    explanation: "While software can speed up calculations, always verify results with manual spot-checks. Software can have bugs or be incorrectly configured. Understanding the manual method ensures you can validate results."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Should I always size for voltage drop first or current capacity first?",
    answer: "Calculate both independently and use whichever requires the larger cable. For short circuits, current capacity often determines size. For long circuits, voltage drop frequently requires a larger cable. Always verify both requirements are met."
  },
  {
    question: "Can I use a cable larger than required?",
    answer: "Yes, using a larger cable is always acceptable from a technical standpoint. It provides additional safety margin and allows for future load increases. The only considerations are cost and physical space for larger cables."
  },
  {
    question: "How do I handle cables that run through multiple installation conditions?",
    answer: "Apply the most onerous correction factors that apply to any part of the cable run. For example, if part of the cable is in thermal insulation, apply the thermal insulation factor to the entire cable length calculation."
  },
  {
    question: "What if my calculated mV/A/m falls exactly on a table value?",
    answer: "If your calculated maximum mV/A/m exactly matches a table value, that cable size is acceptable. However, there's no margin for error, so consider using the next size up if practical, especially for critical circuits."
  },
  {
    question: "Do aluminium cables have different voltage drop characteristics?",
    answer: "Yes, aluminium has higher resistivity than copper (approximately 1.6 times). This means aluminium cables have higher mV/A/m values for the same size, requiring larger conductors to achieve the same voltage drop performance."
  },
  {
    question: "How do I account for future load growth in cable sizing?",
    answer: "Good practice is to include a design margin (typically 20-30%) for future load growth. This may mean sizing cables based on anticipated future load rather than current load, especially for infrastructure circuits."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module3Section6_4 = () => {
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
            <span>Module 3.6.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cable Sizing for Voltage Drop
          </h1>
          <p className="text-white/80">
            Systematic approach to selecting cables that meet voltage drop requirements
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Max mV/A/m:</strong> (Vd limit x 1000) / (I x L)</li>
              <li><strong>Selection:</strong> Choose smallest cable meeting this value</li>
              <li><strong>Both:</strong> Verify current capacity AND voltage drop</li>
              <li><strong>Use larger:</strong> Of the two calculated sizes</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Long runs, high currents, distribution circuits</li>
              <li><strong>Use:</strong> BS 7671 Table 4D5 for mV/A/m lookup</li>
              <li><strong>Apply:</strong> Systematic 6-step sizing procedure</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply systematic cable sizing procedure for voltage drop",
              "Calculate maximum acceptable mV/A/m for a circuit",
              "Select minimum cable size from BS 7671 tables",
              "Balance current capacity and voltage drop requirements",
              "Document cable sizing decisions correctly",
              "Handle special cases including ring circuits and motors"
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
            Systematic Cable Sizing Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable sizing requires a systematic approach to ensure compliance with both current-carrying capacity and voltage drop requirements. Following a structured procedure ensures nothing is overlooked.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-white mb-3">Six-Step Cable Sizing Procedure:</p>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Step 1: Determine Design Current (Ib)</p>
                  <p className="text-white/80 mt-1">Calculate or determine the maximum current the circuit will carry under normal operating conditions.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Step 2: Select Protective Device Rating (In)</p>
                  <p className="text-white/80 mt-1">Choose protective device with rating at least equal to Ib. Must satisfy: Ib less than or equal to In.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Step 3: Calculate Minimum It for Current Capacity</p>
                  <p className="text-white/80 mt-1">Apply correction factors: It = In / (Ca x Cg x Ci x Cc). Find minimum tabulated current capacity needed.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Step 4: Calculate Maximum mV/A/m for Voltage Drop</p>
                  <p className="text-white/80 mt-1">Max mV/A/m = (Vd max x 1000) / (Ib x L). Determine maximum acceptable voltage drop per amp per metre.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Step 5: Select Cable Size from Tables</p>
                  <p className="text-white/80 mt-1">Choose smallest cable that satisfies BOTH current capacity (from Step 3) AND voltage drop (from Step 4).</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Step 6: Verify and Document</p>
                  <p className="text-white/80 mt-1">Calculate actual voltage drop with selected cable. Document both calculations in design records.</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Point:</strong> The cable must satisfy BOTH requirements. If current capacity requires 2.5mm sq but voltage drop requires 4mm sq, you must use 4mm sq.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Calculating Maximum Acceptable mV/A/m
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              To find the minimum cable size for voltage drop compliance, first calculate the maximum acceptable mV/A/m value. This tells you the highest resistance cable you can use while staying within limits.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-white mb-3">Maximum mV/A/m Formula:</p>
              <p className="text-xl text-white font-mono text-center mb-4">mV/A/m max = (Vd max x 1000) / (Ib x L)</p>
              <div className="text-sm text-white/80">
                <p>Where:</p>
                <ul className="ml-4 mt-1 space-y-1">
                  <li>Vd max = Maximum allowable voltage drop (6.9V lighting, 11.5V power)</li>
                  <li>Ib = Design current (amperes)</li>
                  <li>L = Cable length (metres)</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Worked Example: Finding Maximum mV/A/m</p>
              <p className="text-xs text-white/90 mb-2">A 25A power circuit runs 30m. What is the maximum acceptable mV/A/m?</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Given:</strong> Ib = 25A, L = 30m, Vd max = 11.5V (power circuit)</p>
                <p><strong>Calculate:</strong></p>
                <p className="ml-4">mV/A/m max = (11.5 x 1000) / (25 x 30)</p>
                <p className="ml-4">mV/A/m max = 11500 / 750</p>
                <p className="ml-4">mV/A/m max = 15.3</p>
                <p className="text-green-400 mt-2">Maximum acceptable mV/A/m = 15.3</p>
                <p className="text-white/60 mt-1">Must select cable with mV/A/m of 15.3 or LESS</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-2">Quick Reference - Typical mV/A/m Values (Flat 70 degrees C Cable):</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-elec-yellow/80">Cable Size (mm sq)</th>
                      <th className="text-left py-2 text-elec-yellow/80">mV/A/m</th>
                      <th className="text-left py-2 text-elec-yellow/80">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/5">
                      <td className="py-2">1.0</td>
                      <td className="py-2">44</td>
                      <td className="py-2">Lighting</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">1.5</td>
                      <td className="py-2">29</td>
                      <td className="py-2">Lighting</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">2.5</td>
                      <td className="py-2">18</td>
                      <td className="py-2">Sockets, small power</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">4.0</td>
                      <td className="py-2">11</td>
                      <td className="py-2">Cookers, showers</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">6.0</td>
                      <td className="py-2">7.3</td>
                      <td className="py-2">Large appliances</td>
                    </tr>
                    <tr>
                      <td className="py-2">10.0</td>
                      <td className="py-2">4.4</td>
                      <td className="py-2">Sub-mains</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Values from BS 7671 Table 4D5. Actual values depend on installation method.</p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Selection Rule:</strong> Find the smallest cable size with mV/A/m equal to or less than your calculated maximum. In the example above, with max 15.3, you would need at least 2.5mm sq (mV/A/m = 18 is too high) so 4.0mm sq (mV/A/m = 11) is the minimum acceptable.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Balancing Current Capacity and Voltage Drop
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Most cable sizing decisions require balancing two independent requirements: current-carrying capacity and voltage drop. Understanding when each is the determining factor helps you design efficiently.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current Capacity Determines Size When:</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Cable runs are short (under 20m)</li>
                  <li>Load currents are high</li>
                  <li>Adverse installation conditions exist</li>
                  <li>Grouping factors significantly reduce capacity</li>
                  <li>High ambient temperatures apply</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Drop Determines Size When:</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Cable runs are long (over 30-40m)</li>
                  <li>Moderate currents over distance</li>
                  <li>Distribution circuits to sub-boards</li>
                  <li>Outbuildings or external installations</li>
                  <li>Lighting circuits (stricter 3% limit)</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Complete Worked Example: Shower Circuit</p>
              <p className="text-xs text-white/90 mb-2">Size cable for 9.5kW shower (41A), 18m run, 45A MCB, flat cable clipped direct.</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Step 1: Design Current</strong></p>
                <p className="ml-4">Ib = 9500 / 230 = 41.3A</p>

                <p className="mt-2"><strong>Step 2: Protective Device</strong></p>
                <p className="ml-4">In = 45A MCB (satisfies Ib less than or equal to In)</p>

                <p className="mt-2"><strong>Step 3: Current Capacity Requirement</strong></p>
                <p className="ml-4">Ca = 1.0 (30 degrees C ambient), Cg = 1.0 (single cable)</p>
                <p className="ml-4">Minimum It = 45 / (1.0 x 1.0) = 45A</p>
                <p className="ml-4">From tables: 6mm sq = 47A, 10mm sq = 64A</p>
                <p className="ml-4">Current capacity requires: 6mm sq minimum</p>

                <p className="mt-2"><strong>Step 4: Voltage Drop Requirement</strong></p>
                <p className="ml-4">Max mV/A/m = (11.5 x 1000) / (41.3 x 18) = 15.5</p>
                <p className="ml-4">6mm sq mV/A/m = 7.3 (acceptable)</p>
                <p className="ml-4">Voltage drop requires: 6mm sq minimum</p>

                <p className="mt-2"><strong>Step 5: Selection</strong></p>
                <p className="ml-4">Both requirements satisfied by 6mm sq</p>

                <p className="mt-2"><strong>Step 6: Verification</strong></p>
                <p className="ml-4">Actual Vd = (7.3 x 41.3 x 18) / 1000 = 5.4V</p>
                <p className="text-green-400 mt-2">Selected cable: 6mm sq (5.4V drop, 47A capacity)</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design Note:</strong> Always document both calculations even when one clearly determines the size. This demonstrates compliance and provides a record for future reference.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Special Cases and Practical Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Several common situations require special consideration when sizing cables for voltage drop. Understanding these cases helps you handle real-world installations correctly.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Ring Final Circuits:</p>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm text-white/90">
                  Ring circuits provide two parallel paths for current, effectively halving resistance. For voltage drop calculation, use quarter of the total ring length as the effective length (worst case is load at mid-point). This is why 2.5mm sq cable is typically adequate for ring circuits up to 100m total length.
                </p>
                <p className="text-xs text-white/60 mt-2">
                  Example: 80m ring with 32A load: effective L = 80/4 = 20m for voltage drop calculation
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Distribution Circuits:</p>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm text-white/90">
                  Sub-main cables feeding distribution boards must allow headroom for final circuit voltage drops. Good practice is to limit distribution circuit drop to 1-2% maximum, leaving adequate margin for final circuits. Total drop (distribution + final) must not exceed the BS 7671 limit.
                </p>
                <p className="text-xs text-white/60 mt-2">
                  For a 5% total limit: 2% distribution + 3% final circuit is a typical design allocation
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Motor Circuits:</p>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm text-white/90">
                  Motors draw high starting currents (typically 6-8 times running current). While cable sizing uses running current, excessive starting voltage drop can cause problems. Large motors may need oversized cables or reduced-voltage starting methods.
                </p>
                <ul className="text-xs text-white/60 mt-2 space-y-1">
                  <li>Size cable for running current (full-load current)</li>
                  <li>Check that starting voltage drop is acceptable</li>
                  <li>Consider effect on other equipment during motor starting</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <p className="text-sm font-medium text-red-400 mb-2">Common Mistakes in Cable Sizing</p>
              <ul className="text-xs text-white/90 space-y-1">
                <li><strong>Checking only one requirement:</strong> Both current capacity AND voltage drop must be verified</li>
                <li><strong>Using cable route length:</strong> Use actual cable length, not shortest route</li>
                <li><strong>Ignoring distribution circuit drop:</strong> Total drop includes distribution + final</li>
                <li><strong>Wrong table selection:</strong> Use correct table for cable type and installation method</li>
                <li><strong>Forgetting correction factors:</strong> Current capacity needs Ca, Cg, Ci corrections</li>
                <li><strong>Rounding down:</strong> Always round up to next standard cable size</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Professional Practice:</strong> Create a standard calculation sheet that prompts you through all steps. This ensures consistency and provides documentation for every cable sizing decision.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Quick Sizing Checks</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Short runs (under 15m): Current capacity usually determines size</li>
                <li>Long runs (over 40m): Voltage drop usually determines size</li>
                <li>Distribution circuits: Always check voltage drop carefully</li>
                <li>Lighting circuits: Remember the stricter 3% limit</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Consider Larger Cable</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Anticipated future load increases</li>
                <li>Close to limits on current calculation</li>
                <li>Critical equipment requiring stable voltage</li>
                <li>Motor loads with high starting current</li>
                <li>Harmonic-rich loads (LED lighting, variable speed drives)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Documentation Requirements</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record design current, cable length, and installation method</li>
                <li>Document correction factors applied</li>
                <li>Show both current capacity and voltage drop calculations</li>
                <li>State selected cable size and actual voltage drop</li>
                <li>Reference BS 7671 tables used</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Cable Sizing</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Formulae</p>
                <ul className="space-y-0.5">
                  <li>Max mV/A/m = (Vd x 1000) / (I x L)</li>
                  <li>Min It = In / (Ca x Cg x Ci)</li>
                  <li>Vd = (mV/A/m x I x L) / 1000</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Sizing Procedure</p>
                <ul className="space-y-0.5">
                  <li>1. Determine Ib (design current)</li>
                  <li>2. Select In (device rating)</li>
                  <li>3. Calculate min It (current capacity)</li>
                  <li>4. Calculate max mV/A/m (voltage drop)</li>
                  <li>5. Select cable meeting BOTH</li>
                  <li>6. Verify and document</li>
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
            <Link to="/study-centre/apprentice/level3-module3-section6-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Voltage Drop Calculations
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section6-5">
              Next: Practical Voltage Drop Examples
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module3Section6_4;
