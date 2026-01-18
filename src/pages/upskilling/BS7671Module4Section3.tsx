import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "socket-disconnection",
    question: "What is the maximum disconnection time for a socket circuit in a TN system?",
    options: [
      "0.1 seconds",
      "0.4 seconds",
      "1.0 seconds",
      "5.0 seconds"
    ],
    correctIndex: 1,
    explanation: "For socket circuits in TN systems, BS 7671 requires disconnection within 0.4 seconds to ensure safety against electric shock. This applies to all final circuits ≤32A where direct contact during a fault is likely."
  },
  {
    id: "zs-purpose",
    question: "What is the purpose of testing Zs?",
    options: [
      "To measure insulation resistance",
      "To verify earth fault loop impedance is low enough for protective device operation",
      "To check polarity",
      "To measure voltage drop"
    ],
    correctIndex: 1,
    explanation: "Testing Zs (earth fault loop impedance) verifies that the impedance is sufficiently low to allow protective devices to disconnect within the required time limits during an earth fault. Low Zs = high fault current = fast disconnection."
  },
  {
    id: "tt-rcd-requirement",
    question: "Why are RCDs essential in TT systems?",
    options: [
      "They provide overload protection",
      "High earth electrode resistance makes fast disconnection with overcurrent devices difficult",
      "They prevent voltage drop",
      "They are required by law in all systems"
    ],
    correctIndex: 1,
    explanation: "In TT systems, the high resistance of the earth electrode path (typically 20-200Ω) means overcurrent devices alone cannot generate sufficient fault current for fast disconnection. RCDs detect the small imbalance current and disconnect rapidly."
  }
];

const faqs = [
  {
    question: "What is the 80% rule for Zs testing?",
    answer: "Measured Zs values should not exceed 80% of the tabulated maximum values in BS 7671. This allows for conductor temperature rise under fault conditions—cables heat up during a fault, increasing resistance and Zs. Example: If tabulated Zs limit is 2.30Ω, measured value should not exceed 1.84Ω (2.30 × 0.8)."
  },
  {
    question: "Why do socket outlets have stricter disconnection times than fixed equipment?",
    answer: "Socket outlets present higher risk: they're accessible to anyone, used with portable equipment held by hand, more likely to experience cord damage, and may be used in wet conditions. The 0.4-second maximum ensures rapid disconnection before dangerous currents cause harm to people holding equipment."
  },
  {
    question: "What components make up the fault path?",
    answer: "The complete fault path includes: source transformer winding → line conductor to fault point → fault itself → CPC back to installation → main earthing terminal → earthing conductor → earth electrode (TT) or PEN conductor (TN-C-S) → source neutral. Any high resistance or break prevents adequate fault current."
  },
  {
    question: "How do Amendment 3 requirements affect EV charging installations?",
    answer: "Amendment 3 requires Type B RCDs (or equivalent) for EV charging points to detect DC fault currents up to 6mA DC. Standard Type A RCDs cannot detect DC faults. Enhanced disconnection time requirements and DC fault monitoring ensure safety during vehicle charging."
  }
];

const quizQuestion = {
  question: "How does temperature affect Zs values?",
  options: [
    "Temperature has no effect on Zs",
    "Higher temperatures increase conductor resistance and Zs values",
    "Higher temperatures decrease Zs values",
    "Temperature only affects AC measurements"
  ],
  correctAnswer: 1,
  explanation: "As conductor temperature increases, resistance increases (copper has a positive temperature coefficient). Under fault conditions, cables heat up rapidly, increasing Zs beyond the cold measurement. The 80% rule accounts for this temperature rise."
};

const BS7671Module4Section3 = () => {
  useSEO({
    title: "Disconnection Times & Fault Path Integrity | BS 7671 Module 4.3",
    description: "Learn about required disconnection times, Zs testing, the 80% rule, and fault path integrity requirements per BS 7671."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/bs7671-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Disconnection Times & Fault Path Integrity
          </h1>
          <p className="text-white/80">
            Ensuring rapid disconnection and reliable fault clearance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Socket circuits (TN):</strong> 0.4s maximum disconnection</li>
              <li><strong>Distribution circuits:</strong> 5s maximum</li>
              <li><strong>TT systems:</strong> RCD essential (high earth resistance)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Zs test:</strong> Verifies fault path can operate device in time</li>
              <li><strong>80% rule:</strong> Measured Zs must be ≤80% of limit</li>
              <li><strong>Fault path:</strong> Must be continuous and low impedance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand required disconnection times for TN and TT systems",
              "Apply the 80% rule for Zs verification",
              "Identify fault path components and verify integrity",
              "Interpret Zs test results and take corrective action",
              "Apply Amendment 3 requirements for EV and energy storage",
              "Design fault paths with adequate current capacity"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Disconnection Time Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Disconnection Time Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different circuits and systems have different disconnection time requirements based on their risk level and likelihood of human contact during fault conditions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">TN Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Final circuits ≤32A:</strong> 0.4s maximum</li>
                  <li><strong>Socket outlets:</strong> Always 0.4s</li>
                  <li><strong>Distribution circuits:</strong> 5s maximum</li>
                  <li><strong>Fixed equipment &gt;32A:</strong> 5s (with conditions)</li>
                </ul>
                <p className="text-xs text-white/70 mt-2">Low Zs allows MCBs to achieve these times</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">TT Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>RCD protection essential</strong></li>
                  <li><strong>High earth electrode resistance:</strong> 20-200Ω typical</li>
                  <li><strong>Low fault current:</strong> Insufficient for MCB operation</li>
                  <li><strong>30mA RCD:</strong> Achieves &lt;0.3s typically</li>
                </ul>
                <p className="text-xs text-white/70 mt-2">RCDs detect small imbalance, disconnect rapidly</p>
              </div>
            </div>

            <div className="p-5 rounded-lg bg-white/5 my-6">
              <h3 className="text-sm font-medium text-elec-yellow mb-3">Why 0.4 Seconds?</h3>
              <p className="text-sm text-white mb-2">
                Research shows that the human body can tolerate certain current levels for limited durations:
              </p>
              <ul className="text-sm text-white/90 space-y-1">
                <li>• 30mA for unlimited duration (threshold of sensation)</li>
                <li>• 100mA for 0.4s (ventricular fibrillation threshold)</li>
                <li>• Higher currents require faster disconnection</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[0]} />
        </div>

        {/* Section 2: Zs Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Earth Fault Loop Impedance (Zs) Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Zs testing verifies that the earth fault loop impedance is low enough to allow protective devices to disconnect within required time limits during an earth fault.
            </p>

            <div className="p-5 rounded-lg bg-white/5 my-6">
              <h3 className="text-sm font-medium text-elec-yellow mb-3">The 80% Rule</h3>
              <div className="text-center mb-4">
                <p className="text-lg font-mono text-white">Measured Zs ≤ 0.8 × Tabulated Maximum</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">Why 80%?</p>
                  <ul className="text-white/90 space-y-1">
                    <li>• Cables measured cold during testing</li>
                    <li>• Under fault conditions, cables heat rapidly</li>
                    <li>• Copper resistance increases with temperature</li>
                    <li>• 80% factor provides safety margin</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Example Calculation:</p>
                  <ul className="text-white/90 space-y-1">
                    <li>32A Type B MCB: Limit = 1.37Ω</li>
                    <li>80% of 1.37Ω = 1.10Ω</li>
                    <li>Measured Zs must be ≤1.10Ω</li>
                    <li>If 1.25Ω measured: investigate/remediate</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">Zs Testing Process:</p>
              <ol className="text-sm text-white space-y-2 ml-4">
                <li><strong>1.</strong> Connect test instrument between line and earth at furthest point</li>
                <li><strong>2.</strong> Ensure circuit is live and other parallel paths are considered</li>
                <li><strong>3.</strong> Record measured Zs value</li>
                <li><strong>4.</strong> Apply 80% factor to tabulated limit</li>
                <li><strong>5.</strong> Compare measured value against corrected limit</li>
                <li><strong>6.</strong> Document results on schedule of test results</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[1]} />
        </div>

        {/* Section 3: Fault Path Integrity */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Fault Path Integrity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For protective devices to operate correctly, there must be a continuous, low-impedance path for fault current from the point of fault back to the source. Any break or high resistance compromises safety.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fault Path Components</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Circuit protective conductors (CPCs)</li>
                  <li>• Main earthing terminal (MET)</li>
                  <li>• Earthing conductor</li>
                  <li>• Earth electrode (TT) or PEN (TN-C-S)</li>
                  <li>• Source transformer winding</li>
                  <li>• Protective bonding conductors</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Common Fault Path Problems</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Loose connections at terminals</li>
                  <li>• Corrosion of metallic paths</li>
                  <li>• Damaged cable armour or CPC</li>
                  <li>• Missing or inadequate bonding</li>
                  <li>• High resistance joints</li>
                  <li>• Undersized conductors</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Verification Methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Continuity testing:</strong> Verify all connections intact using low-ohm tester</li>
                <li><strong>Zs testing:</strong> Overall earth fault loop impedance verification</li>
                <li><strong>Visual inspection:</strong> Check for damage, corrosion, loose connections</li>
                <li><strong>R1+R2 measurement:</strong> Calculate expected Zs from Ze + (R1+R2)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[2]} />
        </div>

        {/* Section 4: Amendment 3 Updates */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Amendment 3 Updates
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Amendment 3 introduced significant updates for modern installations including EV charging, energy storage, and smart devices.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">EV Charging Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Type B RCD mandatory (or equivalent)</li>
                  <li>• 6mA DC fault detection capability</li>
                  <li>• Standard Type A RCDs inadequate</li>
                  <li>• Enhanced disconnection monitoring</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Storage Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• DC isolation requirements</li>
                  <li>• Battery management system integration</li>
                  <li>• Emergency disconnection procedures</li>
                  <li>• Thermal runaway protection</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20 my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Arc Fault Protection</p>
              <p className="text-sm text-white">
                Amendment 3 recommends AFDD protection for final circuits in sleeping accommodation and locations with combustible materials. AFDDs detect dangerous arc faults that traditional protection cannot sense, providing enhanced fire protection.
              </p>
            </div>
          </div>
        </section>

        {/* Real World Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Real World Scenario</h2>
          <div className="p-5 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
            <h3 className="text-sm font-medium text-elec-yellow mb-3">Commercial Building Zs Testing</h3>
            <p className="text-sm text-white mb-3">
              Socket circuits protected by 20A Type B MCBs in a TN-C-S system. Tabulated Zs limit = 2.30Ω.
            </p>
            <div className="grid grid-cols-3 gap-2 text-sm mb-3">
              <div className="p-2 rounded bg-green-500/10 border border-green-500/20">
                <p className="text-green-400 font-medium">Circuit 1: 1.65Ω</p>
                <p className="text-xs text-white/70">✓ Satisfactory (&lt;1.84Ω)</p>
              </div>
              <div className="p-2 rounded bg-orange-500/10 border border-orange-500/20">
                <p className="text-orange-400 font-medium">Circuit 2: 2.10Ω</p>
                <p className="text-xs text-white/70">⚠ Marginal (investigate)</p>
              </div>
              <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 font-medium">Circuit 3: 2.45Ω</p>
                <p className="text-xs text-white/70">✗ Non-compliant</p>
              </div>
            </div>
            <p className="text-xs text-white/70">
              80% of 2.30Ω = 1.84Ω. Circuit 3 exceeds even the tabulated limit—requires investigation for high resistance connections, damaged CPC, or undersized conductors.
            </p>
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-elec-yellow mb-1">Disconnection Times</p>
              <ul className="space-y-0.5 text-white/90">
                <li>Socket circuits TN: 0.4s</li>
                <li>Distribution TN: 5s</li>
                <li>TT systems: RCD required</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow mb-1">Zs Testing</p>
              <ul className="space-y-0.5 text-white/90">
                <li>Apply 80% rule to limits</li>
                <li>Test at furthest point</li>
                <li>Document all results</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="my-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
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
            <Link to="/study-centre/upskilling/bs7671-module-4-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-4-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module4Section3;
