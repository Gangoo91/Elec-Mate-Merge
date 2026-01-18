import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "EFLI Testing of RCD-Protected Circuits - Module 5 Section 6";
const DESCRIPTION = "Special considerations for earth fault loop testing on circuits protected by RCDs.";

const quickCheckQuestions = [
  {
    id: "no-trip-method",
    question: "No-trip Zs testing works by:",
    options: [
      "Using higher voltage",
      "Using balanced currents that don't create net leakage",
      "Bypassing the RCD",
      "Testing only line-neutral"
    ],
    correctIndex: 1,
    explanation: "No-trip mode uses balanced test currents that cancel out, avoiding the earth leakage that would trip the RCD."
  },
  {
    id: "zs-still-required",
    question: "On RCD-protected circuits, Zs must still:",
    options: [
      "Not be tested at all",
      "Meet requirements for overcurrent device operation",
      "Be exactly 0Ω",
      "Exceed 10Ω"
    ],
    correctIndex: 1,
    explanation: "Zs must allow the overcurrent device (MCB) to operate. RCDs provide additional fast earth fault protection."
  },
  {
    id: "calculation-method",
    question: "The calculation method for Zs is:",
    options: [
      "Zs = Ze - R1+R2",
      "Zs = Ze + (R1+R2 × 1.2)",
      "Zs = Ze × R1+R2",
      "Zs = R1+R2 only"
    ],
    correctIndex: 1,
    explanation: "Zs = Ze + (R1+R2 × 1.2). This includes temperature correction factor."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Standard Zs testing may trip RCDs because:",
    options: [
      "The test voltage is too high",
      "The test creates earth leakage current",
      "The RCD is faulty",
      "The circuit is overloaded"
    ],
    correctAnswer: 1,
    explanation: "Zs testing routes current through earth, creating the imbalance RCDs are designed to detect."
  },
  {
    id: 2,
    question: "No-trip Zs testing works by:",
    options: [
      "Using higher voltage",
      "Using balanced currents that don't create net leakage",
      "Bypassing the RCD",
      "Testing only line-neutral"
    ],
    correctAnswer: 1,
    explanation: "No-trip mode uses balanced test currents that don't create net earth leakage, avoiding RCD operation."
  },
  {
    id: 3,
    question: "On RCD-protected circuits, Zs must still:",
    options: [
      "Not be tested at all",
      "Meet requirements for overcurrent device operation",
      "Be exactly 0Ω",
      "Exceed 10Ω"
    ],
    correctAnswer: 1,
    explanation: "Zs must allow the overcurrent device (MCB) to operate for sustained faults. RCDs handle fast earth fault disconnection."
  },
  {
    id: 4,
    question: "The calculation method for Zs is:",
    options: [
      "Zs = Ze - R1+R2",
      "Zs = Ze + (R1+R2 × 1.2)",
      "Zs = Ze × R1+R2",
      "Zs = R1+R2 only"
    ],
    correctAnswer: 1,
    explanation: "Zs = Ze + (R1+R2 × 1.2). Measure Ze at origin, R1+R2 on circuit, multiply by temperature factor."
  },
  {
    id: 5,
    question: "With RCD protection, which disconnection time applies?",
    options: [
      "0.4s from overcurrent device",
      "0.4s from RCD operation",
      "5s from RCD",
      "No time limit"
    ],
    correctAnswer: 1,
    explanation: "The RCD provides 0.4s (actually faster - 40ms typical) disconnection for earth faults above its rating."
  },
  {
    id: 6,
    question: "If using calculation method, Ze is measured:",
    options: [
      "At the furthest point",
      "At the origin, upstream of RCDs",
      "At each socket",
      "After the RCD"
    ],
    correctAnswer: 1,
    explanation: "Ze is measured at the origin with the main earth disconnected - this is upstream of any RCDs in the installation."
  },
  {
    id: 7,
    question: "The 2-wire (L-N) test avoids RCD tripping because:",
    options: [
      "It uses lower voltage",
      "It tests via neutral, not earth",
      "It's a dead test",
      "It uses DC"
    ],
    correctAnswer: 1,
    explanation: "L-N testing measures the loop via neutral, not earth, so no earth leakage occurs to trip the RCD."
  },
  {
    id: 8,
    question: "A 30mA RCD trips within:",
    options: ["5 seconds", "1 second", "300ms", "40ms (at 5× rated current)"],
    correctAnswer: 3,
    explanation: "At 5 times rated current (150mA), a 30mA RCD must trip within 40ms. At rated current, 300ms maximum."
  },
  {
    id: 9,
    question: "Why test Zs even with RCD protection?",
    options: [
      "RCDs don't work for all faults",
      "It's not required",
      "To trip the RCD",
      "Only for TT systems"
    ],
    correctAnswer: 0,
    explanation: "Very low earth faults (below RCD threshold) won't trip the RCD - overcurrent protection must handle these."
  },
  {
    id: 10,
    question: "Documenting RCD circuit tests should include:",
    options: [
      "Only RCD trip times",
      "Zs value (measured or calculated) and test method used",
      "Only insulation resistance",
      "Nothing special"
    ],
    correctAnswer: 1,
    explanation: "Record Zs value and specify whether measured directly (with no-trip) or calculated from Ze + R1+R2."
  }
];

const faqs = [
  {
    question: "Why do RCDs trip during Zs testing?",
    answer: "Standard Zs testers create a deliberate imbalance between line and neutral by routing test current through earth. RCDs are designed to detect exactly this condition and trip - it's doing its job."
  },
  {
    question: "What is no-trip Zs testing?",
    answer: "No-trip testers inject balanced test currents that don't create net earth leakage, avoiding RCD operation. The test measures impedance without triggering the RCD's protection function."
  },
  {
    question: "Is Zs testing required if there's an RCD?",
    answer: "Yes. The RCD provides fast disconnection for earth faults, but Zs must still allow the overcurrent device (MCB) to operate for sustained or high-current faults. Zs should meet at least 5s requirements."
  },
  {
    question: "Can I just calculate Zs instead of measuring?",
    answer: "Yes. Measure Ze at the origin (upstream of RCD) and R1+R2 on the circuit (dead test). Calculate: Zs = Ze + (R1+R2 × 1.2). This avoids RCD interference entirely."
  },
  {
    question: "What if my instrument doesn't have no-trip mode?",
    answer: "Options: use calculation method (Ze + R1+R2), briefly bypass the RCD (only with appropriate authorisation and precautions), or use a 2-wire L-N test (measures loop but not via earth)."
  },
  {
    question: "Do RCDs guarantee 0.4s protection?",
    answer: "For faults above their rated current (typically 30mA), yes - RCDs trip within 40ms (0.04s). But very low earth faults below 30mA won't trip the RCD, so the overcurrent device must still provide protection."
  }
];

const InspectionTestingModule5Section6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5 Section 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            RCD-Protected Circuit Testing
          </h1>
          <p className="text-white/80">
            Special considerations for EFLI testing on RCD-protected circuits
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Problem:</strong> Standard Zs testing trips RCDs</li>
              <li><strong>Solution 1:</strong> Use no-trip/RCD mode on tester</li>
              <li><strong>Solution 2:</strong> Calculate from Ze + R1+R2</li>
              <li><strong>Still needed:</strong> Zs for overcurrent device operation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Methods</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>No-Trip:</strong> Balanced currents avoid RCD</li>
              <li><strong>Calculate:</strong> Zs = Ze + (R1+R2 × 1.2)</li>
              <li><strong>2-Wire:</strong> L-N test (no earth leakage)</li>
              <li><strong>Document:</strong> State method used</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand why RCDs trip during Zs testing",
              "Use no-trip testing modes effectively",
              "Calculate Zs using the alternative method",
              "Know what Zs requirements still apply",
              "Apply practical solutions for RCD circuits",
              "Document RCD circuit tests correctly"
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

        {/* Section 1: The RCD Tripping Problem */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The RCD Tripping Problem
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Standard Zs testing creates a <strong>deliberate earth leakage</strong> - exactly
              what RCDs are designed to detect:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-amber-400 mb-2">What Happens:</p>
              <ul className="text-sm text-white/70 space-y-1 ml-4">
                <li>Tester connects load between Line and Earth</li>
                <li>Current flows through earth, not returning via neutral</li>
                <li>RCD detects imbalance (exactly its purpose)</li>
                <li>RCD trips, interrupting the test</li>
              </ul>
            </div>

            <p className="text-sm text-white/60">
              The RCD is doing its job - it's not a fault, just an inconvenience for testing.
            </p>
          </div>
        </section>

        {/* Section 2: No-Trip Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            No-Trip Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern testers include a <strong>no-trip</strong> or <strong>RCD mode</strong>:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-emerald-400 mb-2">How It Works</p>
              <p className="text-sm text-white/70">
                The tester uses balanced test currents that cancel out, creating no net earth leakage.
                The RCD sees no imbalance and doesn't trip, allowing the Zs measurement to complete.
              </p>
            </div>

            <ul className="text-sm text-white space-y-1 my-6">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Select 'No-Trip', 'RCD', or 'Low Current' mode
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Test may take slightly longer
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Results are equivalent to standard testing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Check your meter's manual for specific instructions
              </li>
            </ul>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Calculation Method */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Calculation Method
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An alternative that completely avoids RCD interference:
            </p>

            <div className="my-6 text-center">
              <p className="text-xl font-mono text-elec-yellow mb-2">Zs = Ze + (R1+R2 × 1.2)</p>
            </div>

            <div className="my-6">
              <ol className="text-sm text-white space-y-2 ml-4">
                {[
                  { step: 1, text: "Measure Ze at origin (upstream of RCDs)", note: "See Section 3" },
                  { step: 2, text: "Measure R1+R2 on circuit (dead test)", note: "No RCD issue" },
                  { step: 3, text: "Multiply R1+R2 by 1.2 for temperature", note: "" },
                  { step: 4, text: "Add Ze + corrected R1+R2", note: "" },
                  { step: 5, text: "Compare calculated Zs to maximum", note: "" }
                ].map((item) => (
                  <li key={item.step} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <span className="text-white/80">{item.text}</span>
                      {item.note && <span className="text-white/40 text-sm ml-2">({item.note})</span>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Section 4: Why Zs Still Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Why Zs Still Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Even with RCD protection, Zs verification is still necessary:
            </p>

            <div className="my-6 space-y-3">
              <div>
                <p className="text-sm font-medium text-blue-400 mb-1">Low-Level Faults</p>
                <p className="text-sm text-white/70">Faults below 30mA won't trip the RCD. The overcurrent device must still protect against these.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-purple-400 mb-1">RCD Failure</p>
                <p className="text-sm text-white/70">If the RCD fails, backup protection relies on EFLI. Zs should meet at least 5s requirements.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-amber-400 mb-1">High-Current Faults</p>
                <p className="text-sm text-white/70">Sustained high-current faults need the MCB to operate. EFLI ensures adequate fault current.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: 2-Wire Alternative */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            2-Wire (L-N) Alternative
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Testing Line to Neutral avoids RCD tripping entirely:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">How It Works</p>
              <p className="text-sm text-white/70">
                The test measures loop impedance via the neutral return path instead of earth.
                No earth leakage occurs, so the RCD is not affected.
              </p>
            </div>

            <p className="text-sm text-amber-300">
              <strong>Limitation:</strong> This doesn't verify the CPC (earth) path. Use in combination
              with R1+R2 testing to confirm earth conductor continuity.
            </p>
          </div>
        </section>

        {/* Section 6: Documentation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When recording Zs for RCD-protected circuits:
            </p>

            <ul className="text-sm text-white space-y-2 my-6">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Record the Zs value obtained
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Indicate method: 'No-trip measurement' or 'Calculated'
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                If calculated, show workings or reference
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Confirm value meets 5s requirement as minimum
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Note any issues encountered during testing
              </li>
            </ul>

            <div className="my-6">
              <p className="text-sm font-semibold text-emerald-400">Example Entry:</p>
              <p className="text-sm text-white/70 mt-1">
                "Zs: 0.85Ω (calculated from Ze 0.32Ω + R1+R2 0.44Ω × 1.2)"
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Use No-Trip When Available</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>It's the quickest method and gives direct measurement</li>
                <li>Most modern MFTs have this feature</li>
                <li>Check your instrument's capabilities</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Have Calculation Ready</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Know Ze value before testing circuits</li>
                <li>Quick calculation is your backup if no-trip fails</li>
                <li>Keep formula accessible on site</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Test RCDs Separately</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>RCD operation testing (trip times) is separate from Zs testing</li>
                <li>Do both for complete verification</li>
                <li>See Module 6 for RCD testing details</li>
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

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard
            title="RCD Circuit Testing Reference"
            items={[
              { term: "Problem", definition: "RCDs trip during Zs test" },
              { term: "Solution 1", definition: "No-trip / RCD mode" },
              { term: "Solution 2", definition: "Calculate Ze + (R1+R2 × 1.2)" },
              { term: "Solution 3", definition: "2-wire L-N test" },
              { term: "Still Required", definition: "Zs for MCB operation" },
              { term: "Documentation", definition: "State method used" }
            ]}
          />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Testing Methods</p>
                <ul className="space-y-0.5">
                  <li>No-trip mode (preferred)</li>
                  <li>Calculation method</li>
                  <li>2-wire L-N test</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Points</p>
                <ul className="space-y-0.5">
                  <li>Zs still required for MCB</li>
                  <li>Document method used</li>
                  <li>Apply 1.2 temp factor</li>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-5/section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-6">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule5Section6;
