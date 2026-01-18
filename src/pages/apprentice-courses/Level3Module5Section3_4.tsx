/**
 * Level 3 Module 5 Section 3.4 - Earth Fault Loop Impedance Testing
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Earth Fault Loop Impedance Testing - Level 3 Module 5 Section 3.4";
const DESCRIPTION = "Master Zs and Ze testing procedures, maximum permitted values, and the relationship between earth fault loop impedance and protective device disconnection times.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the relationship between Zs (earth fault loop impedance) and protective device disconnection time?",
    options: [
      "Higher Zs means faster disconnection",
      "Lower Zs means faster disconnection due to higher fault current",
      "Zs has no effect on disconnection time",
      "Disconnection time is only determined by the RCD"
    ],
    correctIndex: 1,
    explanation: "Lower Zs means lower circuit impedance, so a higher fault current flows during an earth fault. Higher fault current causes the overcurrent protective device to operate faster. This is critical for achieving the required disconnection times in BS 7671 Table 41.1."
  },
  {
    id: "check-2",
    question: "What is the formula relating Ze, R1, R2, and Zs?",
    options: [
      "Zs = Ze - (R1 + R2)",
      "Zs = Ze x (R1 + R2)",
      "Zs = Ze + (R1 + R2)",
      "Zs = R1 + R2 only"
    ],
    correctIndex: 2,
    explanation: "Earth fault loop impedance Zs = Ze (external earth fault loop impedance) + R1 (line conductor resistance) + R2 (protective conductor resistance). This formula allows Zs to be calculated from dead test results when live testing is not possible."
  },
  {
    id: "check-3",
    question: "Why should Zs measurements be compared against 80% of the maximum tabulated values?",
    options: [
      "To account for instrument accuracy only",
      "To account for temperature increase during operation",
      "Because the tables are based on old data",
      "Only required for commercial installations"
    ],
    correctIndex: 1,
    explanation: "Conductor resistance increases with temperature. The 80% rule (or applying a 0.8 multiplier to your measurement) accounts for the conductor being at its maximum operating temperature during a fault, when resistance is higher. This ensures disconnection even in worst-case conditions."
  },
  {
    id: "check-4",
    question: "What does Ze (external earth fault loop impedance) represent?",
    options: [
      "The impedance of the installation only",
      "The impedance of the DNO supply and external earth path",
      "The protective conductor resistance",
      "The insulation resistance of the circuit"
    ],
    correctIndex: 1,
    explanation: "Ze is the impedance of the earth fault loop external to the installation - from the transformer through the supply cables, the DNO earth path, and back to the origin. It's measured at the consumer unit with main bonding disconnected. Typical values: TN-S 0.35 ohms, TN-C-S 0.35 ohms, TT varies."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS 7671 Table 41.1, what is the maximum disconnection time for a 32A final circuit in a TN system?",
    options: [
      "5 seconds",
      "0.4 seconds",
      "0.2 seconds",
      "1 second"
    ],
    correctAnswer: 1,
    explanation: "For TN systems, final circuits not exceeding 32A must disconnect within 0.4 seconds. Distribution circuits and circuits over 32A may have a 5-second disconnection time, unless they supply portable equipment outdoors or in special locations."
  },
  {
    id: 2,
    question: "You measure Zs at 1.2 ohms on a circuit protected by a 20A Type B MCB. The maximum permitted Zs from the tables is 1.84 ohms. Is this acceptable?",
    options: [
      "Yes - 1.2 is less than 1.84",
      "No - you should compare to 80% of 1.84 (1.47 ohms)",
      "Cannot determine without knowing Ze",
      "Only acceptable if RCD protected"
    ],
    correctAnswer: 0,
    explanation: "The measured Zs of 1.2 ohms is less than even 80% of 1.84 (which is 1.47 ohms). This gives good margin for temperature effects. The circuit complies with disconnection time requirements."
  },
  {
    id: 3,
    question: "What type of test is Zs measurement - live or dead?",
    options: [
      "Dead test only",
      "Can be either live or calculated from dead tests",
      "Live test only",
      "Neither - it's a visual check"
    ],
    correctAnswer: 1,
    explanation: "Zs can be measured live using a loop impedance tester, or calculated from dead tests: Zs = Ze + (R1+R2). Both methods are acceptable. The calculated method is often used during initial verification before energisation."
  },
  {
    id: 4,
    question: "For a TT system, what additional protective measure is required due to typically high Zs values?",
    options: [
      "Double insulation",
      "Lower current MCBs",
      "RCD protection",
      "Thicker cables"
    ],
    correctAnswer: 2,
    explanation: "TT systems have high external impedance (earth electrode resistance) meaning fault currents may be too low for MCBs to disconnect quickly. RCD protection is required because RCDs operate on residual current, not fault current magnitude, and can achieve fast disconnection even with high Zs."
  },
  {
    id: 5,
    question: "When measuring Ze at the origin, what must be disconnected?",
    options: [
      "All circuit breakers",
      "The main bonding conductors",
      "All loads",
      "The meter tails"
    ],
    correctAnswer: 1,
    explanation: "To measure true external earth fault loop impedance (Ze), main bonding must be disconnected. Otherwise, parallel paths through gas and water services can give a misleadingly low reading. After the test, bonding must be immediately reconnected."
  },
  {
    id: 6,
    question: "A 6A Type B MCB has a maximum Zs of 7.67 ohms at 0.4s. You measure 8.2 ohms. What is your conclusion?",
    options: [
      "Acceptable - close enough",
      "Unacceptable - Zs exceeds maximum permitted value",
      "Acceptable if RCD protected",
      "Need to check at 5 second disconnection time"
    ],
    correctAnswer: 1,
    explanation: "8.2 ohms exceeds the maximum of 7.67 ohms for 0.4s disconnection. The circuit does not comply. Solutions include: reducing cable length, increasing cable size, or adding RCD protection (which provides an alternative disconnection mechanism)."
  },
  {
    id: 7,
    question: "Why might a 2-pole Zs test give different results to a 3-pole (L-N-E) test?",
    options: [
      "It shouldn't - they're the same test",
      "The 3-pole test can account for loose neutral connections",
      "2-pole tests are more accurate",
      "Only 2-pole tests should be used"
    ],
    correctAnswer: 1,
    explanation: "A 3-pole (L-N-E) test creates a test current path through L-N and measures the voltage between L-E. A loose or high-resistance neutral can cause the test to fail or give high readings, revealing issues a 2-pole (L-E) test might miss. Both have their applications."
  },
  {
    id: 8,
    question: "What effect does a high Ze have on the maximum cable length that can be used?",
    options: [
      "No effect - cable length is independent of Ze",
      "Higher Ze allows longer cables",
      "Higher Ze limits cable length due to overall Zs constraints",
      "Only affects three-phase installations"
    ],
    correctAnswer: 2,
    explanation: "Zs = Ze + (R1+R2). If Ze is high, less 'allowance' remains for R1+R2 before hitting the maximum Zs. Since R1+R2 increases with cable length, a higher Ze limits how long circuits can be while still achieving required disconnection times."
  },
  {
    id: 9,
    question: "You are testing Zs on an RCD-protected circuit. The RCD trips during the test. What should you do?",
    options: [
      "The circuit has failed the test",
      "Use a non-trip loop tester or calculate Zs from R1+R2",
      "Remove the RCD and retest",
      "Record 'unable to test'"
    ],
    correctAnswer: 1,
    explanation: "RCDs may trip during high-current loop testing. Options include: using a non-tripping loop tester (lower test current), calculating Zs from Ze + (R1+R2) using dead test results, or using the 2-wire no-trip measurement if available on your instrument."
  },
  {
    id: 10,
    question: "For verification purposes, at what point in the circuit should Zs be measured?",
    options: [
      "At the distribution board only",
      "At the most distant point from the origin",
      "At any convenient point",
      "At the midpoint of the circuit"
    ],
    correctAnswer: 1,
    explanation: "Zs must be measured at the most distant point from the origin because this is where the impedance (and therefore Zs) is highest. If Zs complies at the furthest point, it will comply everywhere else on the circuit."
  },
  {
    id: 11,
    question: "What is typical Ze for a TN-C-S (PME) supply in the UK?",
    options: [
      "Less than 0.1 ohms",
      "Around 0.35 ohms maximum",
      "Around 2 ohms",
      "Over 100 ohms"
    ],
    correctAnswer: 1,
    explanation: "The DNO maximum Ze for TN-C-S supplies is typically 0.35 ohms. Actual measured values are often lower. This low Ze allows good fault currents and is why PME systems are common. Always measure - never assume the maximum."
  },
  {
    id: 12,
    question: "Why is Zs testing often performed after insulation resistance testing in the test sequence?",
    options: [
      "No particular reason - order doesn't matter",
      "Because Zs testing is a live test and IR testing confirms safe insulation first",
      "Because IR testers can measure Zs",
      "Zs testing should always be done first"
    ],
    correctAnswer: 1,
    explanation: "The test sequence in BS 7671 places dead tests (continuity, IR) before live tests (Zs, RCD). This ensures the installation has adequate insulation before energisation. Zs is a live test (or calculated from dead tests) and follows IR verification."
  }
];

const faqs = [
  {
    question: "What is the difference between Zs and Ze?",
    answer: "Ze is the external earth fault loop impedance - the supply side only, measured at the origin with main bonding disconnected. Zs is the total earth fault loop impedance including Ze plus the installation's circuit conductors (R1+R2). Zs = Ze + (R1 + R2)."
  },
  {
    question: "Why do I get different Zs readings at different times of day?",
    answer: "Network loading affects Ze. During peak demand, the supply system carries more current, conductors are warmer, and resistance is higher. Early morning readings may be lower than afternoon readings. Consider this when margins are tight."
  },
  {
    question: "Can I use the maximum tabulated Zs values directly or must I apply the 0.8 correction?",
    answer: "You should either multiply your measured value by 1.2 then compare to the table, or multiply the table value by 0.8 then compare to your measurement. Either approach accounts for conductor temperature rise. Some tables (like IET On-Site Guide) already have 0.8 applied."
  },
  {
    question: "My calculated Zs is higher than my measured Zs - which do I use?",
    answer: "Use the higher (worst-case) value. Differences can occur due to parallel earth paths, temperature variations, or measurement conditions. Always record both if both are taken. A higher calculated value might indicate an issue worth investigating."
  },
  {
    question: "What if Zs is too high but the circuit has RCD protection?",
    answer: "RCD protection provides an alternative disconnection mechanism. For 30mA RCDs, the maximum Zs is based on limiting touch voltage to 50V: Zs x I-delta-n less than 50V, so Zs less than 1667 ohms for 30mA. This is much more lenient than overcurrent requirements, but the RCD must trip within required times."
  },
  {
    question: "How do I measure Ze safely?",
    answer: "Isolate supply, disconnect main bonding, prove dead, then briefly restore supply to measure Ze with the loop tester. Work quickly and safely. Alternatively, the DNO-declared maximum Ze can be used for design, with actual measurement for verification. Always reconnect bonding immediately after."
  }
];

const Level3Module5Section3_4 = () => {
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
            <Link to="/study-centre/apprentice/level3-module5-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Earth Fault Loop Impedance Testing
          </h1>
          <p className="text-white/80">
            Measuring Zs and Ze to verify protective device disconnection times
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Formula:</strong> Zs = Ze + (R1 + R2)</li>
              <li><strong>Purpose:</strong> Verify ADS will operate in time</li>
              <li><strong>Lower Zs:</strong> Higher fault current, faster trip</li>
              <li><strong>Apply 0.8:</strong> Account for temperature rise</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Typical Ze Values</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>TN-S:</strong> Maximum 0.8 ohms (often 0.35)</li>
              <li><strong>TN-C-S (PME):</strong> Maximum 0.35 ohms</li>
              <li><strong>TT:</strong> Varies widely (electrode dependent)</li>
              <li><strong>Always measure:</strong> Don't assume maximum</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the earth fault loop and its components",
              "Measure Ze and Zs using appropriate methods",
              "Calculate Zs from dead test results",
              "Compare results against maximum permitted values",
              "Apply temperature correction factors",
              "Identify when Zs is too high and determine solutions"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Earth Fault Loop */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Earth Fault Loop
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The earth fault loop is the complete circuit that fault current follows during an earth fault. Understanding this path is essential for verifying that automatic disconnection of supply will operate within the required times specified in BS 7671 Table 41.1.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The earth fault loop path (TN system):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1.</strong> Transformer secondary winding</li>
                <li><strong>2.</strong> Supply line conductor to installation</li>
                <li><strong>3.</strong> Circuit line conductor (R1) to fault point</li>
                <li><strong>4.</strong> The fault itself (at exposed-conductive-part)</li>
                <li><strong>5.</strong> Circuit protective conductor (R2) back to DB</li>
                <li><strong>6.</strong> Earthing conductor to means of earthing</li>
                <li><strong>7.</strong> External earth path back to transformer star point</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ze Components (External)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Transformer winding impedance</li>
                  <li>DNO supply cables</li>
                  <li>Service cable to meter</li>
                  <li>External earth return path</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">R1+R2 Components (Internal)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Line conductor resistance (R1)</li>
                  <li>Protective conductor resistance (R2)</li>
                  <li>Connection resistances</li>
                  <li>From DB to furthest point</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Zs = Ze + (R1 + R2). Both external and internal components determine total loop impedance. High Ze or high R1+R2 can cause non-compliance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 02: Measuring Ze */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Measuring External Earth Fault Loop Impedance (Ze)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ze is measured at the origin of the installation to determine the external contribution to the earth fault loop. This must be done with main bonding disconnected to prevent parallel paths giving a falsely low reading.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Ze measurement procedure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Notify client - supply will be interrupted briefly</li>
                <li><strong>Step 2:</strong> Isolate supply at main switch</li>
                <li><strong>Step 3:</strong> Disconnect main bonding conductors from MET</li>
                <li><strong>Step 4:</strong> Prove dead, then briefly restore supply</li>
                <li><strong>Step 5:</strong> Measure Ze between line and earth at origin</li>
                <li><strong>Step 6:</strong> Isolate supply immediately after measurement</li>
                <li><strong>Step 7:</strong> Reconnect main bonding - critical safety step</li>
                <li><strong>Step 8:</strong> Restore supply and test RCD operates</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">TN-S</p>
                <p className="text-white/90 text-xs">Max 0.8 ohms (typically 0.35-0.5)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">TN-C-S (PME)</p>
                <p className="text-white/90 text-xs">Max 0.35 ohms (often 0.2-0.3)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">TT</p>
                <p className="text-white/90 text-xs">Varies greatly (electrode Ra)</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Safety critical:</strong> Never leave main bonding disconnected after testing. This removes the safety earth path. If in doubt about procedure, use the enquired or declared Ze from the DNO for calculation purposes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 03: Measuring and Calculating Zs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Measuring and Calculating Zs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Zs can be obtained by live measurement or calculation from dead tests. Both methods are acceptable for verification. Calculation is often used during initial verification before energisation; live measurement is common during periodic inspection.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Live Measurement</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Use loop impedance tester</li>
                  <li>Test at furthest point on circuit</li>
                  <li>May trip RCDs - use no-trip mode</li>
                  <li>Records actual impedance</li>
                  <li>Affected by network loading</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculation Method</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Zs = Ze + (R1 + R2)</li>
                  <li>Use measured or declared Ze</li>
                  <li>Use R1+R2 from continuity test</li>
                  <li>Safe - done with supply off</li>
                  <li>May give conservative (higher) result</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Comparing results to maximum values:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Method 1:</strong> Measured Zs x 1.2 must be less than table maximum</li>
                <li><strong>Method 2:</strong> Measured Zs must be less than table maximum x 0.8</li>
                <li><strong>Example:</strong> Table says 1.44 ohms max, so measured must be less than 1.15 ohms</li>
                <li>The 0.8 factor accounts for conductor temperature rise during fault</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Always test at the furthest point from the distribution board. This is where Zs is highest. If it complies there, it will comply everywhere on the circuit.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: Interpreting Results */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Interpreting Results and Taking Action
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Once Zs is measured or calculated, compare it to the maximum permitted values in BS 7671 or the IET On-Site Guide. Consider the protective device type, rating, and required disconnection time. Take appropriate action if values are too high.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Maximum Zs examples (Type B MCB, 0.4s):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>6A Type B:</strong> 7.67 ohms (apply 0.8 = 6.14 ohms target)</li>
                <li><strong>16A Type B:</strong> 2.87 ohms (apply 0.8 = 2.30 ohms target)</li>
                <li><strong>32A Type B:</strong> 1.44 ohms (apply 0.8 = 1.15 ohms target)</li>
                <li><strong>40A Type B:</strong> 1.15 ohms (apply 0.8 = 0.92 ohms target)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">If Zs is Acceptable</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Record on schedule of test results</li>
                  <li>Note whether measured or calculated</li>
                  <li>No further action required</li>
                  <li>Circuit complies with ADS requirements</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">If Zs is Too High</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Increase cable size to reduce R1+R2</li>
                  <li>Reduce circuit length</li>
                  <li>Add RCD protection (alternative ADS)</li>
                  <li>Check for loose connections</li>
                  <li>Record as non-compliant if not corrected</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>RCD solution:</strong> For a 30mA RCD, maximum Zs is 50V/0.03A = 1667 ohms. This is much higher than overcurrent requirements, making RCDs effective where high impedance exists.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test at furthest point - highest Zs</li>
                <li>For RCD circuits, use no-trip mode or calculate</li>
                <li>Record whether measured or calculated</li>
                <li>Consider time of day for live measurements</li>
                <li>Compare to both table values and 0.8 adjusted values</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Zs Exceeds Maximum</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>First check for loose or high-resistance connections</li>
                <li>Verify conductor sizes match design</li>
                <li>Check cable route length is as expected</li>
                <li>Consider RCD protection as compliant solution</li>
                <li>For new work, redesign circuit if necessary</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Not applying 0.8:</strong> Comparing directly to table values</li>
                <li><strong>Wrong test point:</strong> Testing near DB instead of far end</li>
                <li><strong>Bonding still connected:</strong> Gives false low Ze</li>
                <li><strong>Ignoring RCD trips:</strong> Use no-trip or calculate</li>
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
                <p className="font-medium text-white mb-1">BS 7671 Requirements</p>
                <ul className="space-y-0.5">
                  <li>Regulation 612.9 - Zs testing</li>
                  <li>Table 41.1 - Max disconnection times</li>
                  <li>Table 41.2/41.3 - Max Zs values</li>
                  <li>0.4s for final circuits up to 32A</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Calculations</p>
                <ul className="space-y-0.5">
                  <li>Zs = Ze + (R1 + R2)</li>
                  <li>Measured Zs x 1.2 vs table max</li>
                  <li>Or measured Zs vs (table x 0.8)</li>
                  <li>If = U0/Zs (fault current)</li>
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
            <Link to="/study-centre/apprentice/level3-module5-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section3-3-5">
              Next: RCD Testing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section3_4;
