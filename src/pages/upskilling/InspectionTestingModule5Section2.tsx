import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Zs Testing Methods - Module 5 Section 2";
const DESCRIPTION = "Learn Zs measurement techniques including live testing, two-wire method, and interpretation of results.";

const quickCheckQuestions = [
  {
    id: "zs-live-test",
    question: "Zs testing is performed with the circuit:",
    options: ["Dead and isolated", "Live and energised", "Under load only", "With fuses removed"],
    correctIndex: 1,
    explanation: "Zs must be measured live because it includes Ze (external impedance), which requires connection to the supply."
  },
  {
    id: "rcd-trip-reason",
    question: "Why might RCDs trip during Zs testing?",
    options: [
      "The test current creates an earth leakage imbalance",
      "The test voltage is too high",
      "The RCD is faulty",
      "The circuit is overloaded"
    ],
    correctIndex: 0,
    explanation: "Zs testing deliberately creates earth leakage current. RCDs are designed to detect this imbalance and may trip."
  },
  {
    id: "temp-correction",
    question: "When calculating Zs from Ze + R1+R2, multiply R1+R2 by:",
    options: ["1.0", "1.1", "1.2", "1.5"],
    correctIndex: 2,
    explanation: "Multiply R1+R2 by 1.2 to account for increased resistance at maximum operating temperature."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Zs testing is performed with the circuit:",
    options: ["Dead and isolated", "Live and energised", "Under load only", "With all fuses removed"],
    correctAnswer: 1,
    explanation: "Zs must be measured live because it includes Ze (external impedance), which requires connection to the supply."
  },
  {
    id: 2,
    question: "A Zs tester works by:",
    options: [
      "Applying DC voltage",
      "Creating a brief controlled fault current",
      "Measuring insulation resistance",
      "Testing RCD operation"
    ],
    correctAnswer: 1,
    explanation: "The tester creates a momentary controlled fault, measures voltage drop and current, then calculates impedance."
  },
  {
    id: 3,
    question: "The standard Zs test connection is:",
    options: ["Line to Neutral", "Line to Earth", "Neutral to Earth", "Line to Line"],
    correctAnswer: 1,
    explanation: "Standard Zs test connects between line and earth (CPC), testing the actual fault path through the protective conductor."
  },
  {
    id: 4,
    question: "Why might RCDs trip during Zs testing?",
    options: [
      "The test current creates an earth leakage imbalance",
      "The test voltage is too high",
      "The RCD is faulty",
      "The circuit is overloaded"
    ],
    correctAnswer: 0,
    explanation: "Zs testing creates deliberate earth leakage. Sensitive RCDs may detect this imbalance and trip."
  },
  {
    id: 5,
    question: "The 2-wire (L-N) Zs test is useful when:",
    options: [
      "Testing SELV circuits",
      "RCDs trip during standard L-E testing",
      "The circuit has no earth",
      "Testing three-phase"
    ],
    correctAnswer: 1,
    explanation: "2-wire testing avoids earth leakage by testing L-N. Useful when sensitive RCDs keep tripping, though it doesn't test the CPC."
  },
  {
    id: 6,
    question: "When calculating Zs from Ze + R1+R2, apply factor:",
    options: ["1.0", "1.1", "1.2", "1.5"],
    correctAnswer: 2,
    explanation: "Multiply R1+R2 by 1.2 to account for conductor resistance increase at maximum operating temperature."
  },
  {
    id: 7,
    question: "If measured Zs exceeds maximum permitted:",
    options: [
      "The circuit passes",
      "Apply a larger correction factor",
      "The circuit fails - investigate and remediate",
      "Retest at a different time"
    ],
    correctAnswer: 2,
    explanation: "Exceeding maximum Zs means the protective device may not operate quickly enough. Investigate and fix before energising."
  },
  {
    id: 8,
    question: "Maximum Zs values are found in:",
    options: ["BS 7671 Chapter 41 tables", "The cable manufacturer data", "The meter manual", "Chapter 52"],
    correctAnswer: 0,
    explanation: "BS 7671 Chapter 41 provides maximum Zs tables for various protective devices and disconnection times."
  },
  {
    id: 9,
    question: "Direct Zs measurement at ambient temperature:",
    options: [
      "Needs temperature correction",
      "Is automatically at operating temperature",
      "Doesn't need correction as it measures actual impedance",
      "Always reads higher than calculated"
    ],
    correctAnswer: 2,
    explanation: "Direct measurement gives actual impedance at test temperature. It's already a 'worst case' compared to calculated values at operating temp."
  },
  {
    id: 10,
    question: "Before Zs testing, you should:",
    options: [
      "Isolate the circuit",
      "Verify the supply is on and circuit is accessible",
      "Remove all lamps",
      "Disconnect the earth"
    ],
    correctAnswer: 1,
    explanation: "Zs testing is live testing. Ensure the supply is on, circuit is accessible, and you have appropriate safety measures in place."
  }
];

const faqs = [
  {
    question: "Why must Zs be measured live?",
    answer: "The test measures actual impedance including the external supply (Ze), which is only present when connected to the live supply. Dead testing only measures R1+R2 - you need Ze to calculate total Zs."
  },
  {
    question: "How does the tester work?",
    answer: "The tester creates a brief, controlled fault current (typically for a few milliseconds) between line and earth. It measures the voltage drop and current, then calculates impedance using Ohm's law (Z=V/I)."
  },
  {
    question: "Will testing trip the RCD?",
    answer: "Modern testers use a 'no-trip' technique that balances the test current to avoid tripping RCDs. However, very sensitive RCDs may still trip. Some testers have a specific 'no-trip' or '2-wire' mode."
  },
  {
    question: "What's the 2-wire method?",
    answer: "Test between line and neutral instead of line-earth. This measures Zs via the neutral rather than CPC. Useful where RCDs trip during standard testing, but doesn't verify the CPC path."
  },
  {
    question: "When do I apply temperature correction?",
    answer: "When verifying Zs by calculation (Ze + R1+R2), multiply R1+R2 by 1.2 to account for conductor heating under fault conditions. Direct Zs measurement doesn't need correction - it's already at ambient."
  },
  {
    question: "What if measured Zs exceeds the maximum?",
    answer: "The circuit fails. Investigate: check connections are tight, verify correct cable size is installed, consider shorter cable run, or use a larger CPC. Re-test after any remedial work."
  }
];

const InspectionTestingModule5Section2 = () => {
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
            <span>Module 5 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Zs Testing Methods
          </h1>
          <p className="text-white/80">
            Learn how to measure earth fault loop impedance safely and accurately
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Live Test:</strong> Zs is measured with circuit energised</li>
              <li><strong>Method:</strong> Tester creates brief controlled fault</li>
              <li><strong>Compare:</strong> Results must not exceed BS 7671 max values</li>
              <li><strong>RCDs:</strong> May trip - use no-trip mode</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Test Connections</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Standard:</strong> Line to Earth (L-E)</li>
              <li><strong>Alternative:</strong> Line to Neutral (L-N) 2-wire</li>
              <li><strong>Location:</strong> Furthest point of circuit</li>
              <li><strong>Correction:</strong> x1.2 for calculations</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand how Zs testers work",
              "Apply safety precautions for live testing",
              "Know where to connect test probes",
              "Interpret test readings correctly",
              "Apply temperature correction factor",
              "Document Zs values properly"
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

        {/* Section 1: How Zs Testers Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            How Zs Testers Work
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A Zs tester creates a momentary, controlled fault current and measures the resulting impedance:
            </p>

            <div className="my-6">
              <ol className="text-sm text-white space-y-2 ml-4">
                {[
                  "Tester connects load between Line and Earth",
                  "A brief (millisecond) current pulse flows",
                  "Voltage drop across the loop is measured",
                  "Current is measured",
                  "Impedance calculated: Z = V / I"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Section 2: Safety Considerations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Safety Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-red-400 mb-2">Live Testing Hazards</p>
              <ul className="text-sm text-white/70 space-y-1 ml-4">
                <li>Circuit is energised during testing</li>
                <li>Risk of electric shock if probes slip</li>
                <li>Ensure proper PPE and insulated probes</li>
                <li>Keep others away from test area</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-emerald-400 mb-2">Safety Requirements</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use GS38 compliant test leads</li>
                <li>Check test equipment calibration</li>
                <li>Ensure firm probe contact</li>
                <li>Be aware of RCD tripping possibility</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Test Connections */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Test Connections
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Standard Method: Line-Earth (L-E)</p>
              <p className="text-sm text-white/70 mb-4">
                Connect between line terminal and earth (CPC). Tests the actual fault path.
                This is the primary test method.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-blue-400 mb-2">Alternative: Line-Neutral (L-N)</p>
              <p className="text-sm text-white/70 mb-4">
                2-wire test avoiding earth. Useful when RCDs trip on L-E test.
                Doesn't verify CPC path.
              </p>
            </div>

            <p className="text-sm text-white/60">
              Test at the furthest point of the circuit for worst-case values.
            </p>
          </div>
        </section>

        {/* Section 4: RCD Considerations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            RCD Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Standard Zs testing may trip RCDs because the test creates deliberate earth leakage:
            </p>

            <div className="my-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-amber-400 mb-1">No-Trip Mode</p>
                <p className="text-sm text-white/70">Modern testers have modes that balance current to avoid tripping. Select 'No-Trip' or 'RCD' mode if available.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-400 mb-1">2-Wire Method</p>
                <p className="text-sm text-white/70">Test L-N instead of L-E. No earth leakage occurs, so RCD won't trip. Limited as doesn't test CPC.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-purple-400 mb-1">Calculation Method</p>
                <p className="text-sm text-white/70">Measure Ze at origin (upstream of RCD) and R1+R2 dead. Calculate: Zs = Ze + (R1+R2 x 1.2)</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Temperature Correction */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Temperature Correction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 text-center">
              <p className="text-lg font-mono text-elec-yellow mb-2">Zs = Ze + (R1+R2 x 1.2)</p>
              <p className="text-sm text-white/60">When calculating from measured values</p>
            </div>

            <p>
              The 1.2 multiplier accounts for conductor resistance increase when operating at maximum temperature (70 degrees C for thermoplastic).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Direct measurement note:</p>
              <p className="text-sm text-white/70">
                If Zs is measured directly (not calculated), the reading is at ambient temperature - already lower than worst-case operating conditions, so no correction needed for comparison.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: Recording Results */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Recording Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>For each circuit, record:</p>

            <ul className="text-sm text-white space-y-2 ml-4">
              <li>Measured Zs value in ohms</li>
              <li>Maximum permitted Zs for the device</li>
              <li>Whether calculated or measured directly</li>
              <li>Test location (usually furthest point)</li>
              <li>Any factors affecting the test</li>
            </ul>

            <div className="my-6">
              <p className="text-sm font-medium text-emerald-400 mb-1">Pass Criteria:</p>
              <p className="text-sm text-white/70">
                Measured Zs must be less than or equal to maximum Zs from BS 7671 tables
              </p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Test at Furthest Point</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always test at the end of the circuit for worst-case impedance</li>
                <li>Closer points will have lower, better values</li>
                <li>The furthest point determines if the circuit passes</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Check Supply Voltage</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Low supply voltage affects Zs readings</li>
                <li>Note the voltage and consider if it affects results</li>
                <li>Some testers compensate automatically</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Compare Similar Circuits</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Circuits of similar length should have similar Zs</li>
                <li>A significant outlier indicates a problem</li>
                <li>Investigate any unexpected readings</li>
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
            title="Zs Testing Reference"
            items={[
              { term: "Test Type", definition: "Live testing" },
              { term: "Standard Connection", definition: "Line to Earth (CPC)" },
              { term: "Alternative", definition: "Line to Neutral (2-wire)" },
              { term: "Temp Correction", definition: "x1.2 for calculations" },
              { term: "Test Location", definition: "Furthest point" },
              { term: "Max Zs Source", definition: "BS 7671 Chapter 41" }
            ]}
          />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Test Methods</p>
                <ul className="space-y-0.5">
                  <li>Standard: L-E connection</li>
                  <li>No-trip: for RCD circuits</li>
                  <li>2-wire: L-N alternative</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Points</p>
                <ul className="space-y-0.5">
                  <li>Test at furthest point</li>
                  <li>Compare to max Zs</li>
                  <li>Document method used</li>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-5/section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-5/section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule5Section2;
