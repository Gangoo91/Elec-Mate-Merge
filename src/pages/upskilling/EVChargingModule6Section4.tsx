import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m6s4-check1",
    question: "What is the maximum operating time for a 30mA RCD at five times rated current (150mA)?",
    options: ["200ms", "100ms", "40ms", "300ms"],
    correctIndex: 2,
    explanation: "At five times rated current (5×IΔn), an RCD must operate within 40ms. This faster trip time ensures rapid disconnection during high fault currents."
  },
  {
    id: "evcharging-m6s4-check2",
    question: "Which RCD type is required for DC fault detection in Mode 3 EV charging?",
    options: ["Type AC", "Type A", "Type B", "Type F"],
    correctIndex: 2,
    explanation: "Type B RCDs can detect smooth DC residual currents, which can be produced by EV charger electronics. Type A only detects pulsating DC up to 6mA, insufficient for DC charging applications."
  },
  {
    id: "evcharging-m6s4-check3",
    question: "During RCD testing, what should happen at half-rated current (15mA for a 30mA RCD)?",
    options: ["Trip within 300ms", "Trip within 40ms", "NOT trip", "Trip after 1 second"],
    correctIndex: 2,
    explanation: "At half-rated current (0.5×IΔn), the RCD should NOT trip. This test verifies the RCD won't cause nuisance tripping during normal operation with minor earth leakage."
  }
];

const faqs = [
  {
    question: "Why do EV chargers need Type B RCDs instead of Type A?",
    answer: "EV charger electronics (inverters, DC-DC converters) can produce smooth DC fault currents that would saturate a Type A RCD's core, preventing it from tripping. Type B RCDs use different detection technology that remains effective with DC components."
  },
  {
    question: "What causes nuisance tripping on EV charging circuits?",
    answer: "Common causes include high cumulative earth leakage from EMI filters, capacitive coupling in long cable runs, VFD harmonics, and multiple loads on the same RCD. Individual circuit testing can identify the source."
  },
  {
    question: "How often should RCDs be tested on EV charging installations?",
    answer: "Manual test button operation should be performed monthly by the user. Full instrument testing is required at initial verification and periodic inspection (typically 1-5 years depending on installation type)."
  },
  {
    question: "Can Type A RCDs ever be used for EV charging?",
    answer: "Type A RCDs can be used for Mode 1 and Mode 2 charging (domestic socket or ICCB), but Mode 3 dedicated chargepoints require either Type B RCDs or Type A with a 6mA DC detection device built into the charger."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "An EV charger RCD trips intermittently during charging but passes all standard tests. What is the most likely cause?",
  options: [
    "Faulty RCD requiring replacement",
    "Cumulative earth leakage from charger EMI filters",
    "Incorrect RCD rating installed",
    "Vehicle battery fault"
  ],
  correctAnswer: 1,
  explanation: "Intermittent tripping with passing tests often indicates cumulative earth leakage approaching the trip threshold. EV charger EMI filters can contribute 3-5mA leakage per charger. A clamp meter on the earth conductor during charging can confirm this."
  }
];

const EVChargingModule6Section4 = () => {
  useSEO({
    title: "RCD and Functional Testing | EV Charging Module 6.4",
    description: "Learn RCD testing procedures for EV charging installations. Master Type A, Type B, and EV-RCD testing for safe charging systems."
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
            <Link to="../ev-charging-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            RCD and Functional Testing
          </h1>
          <p className="text-white/80">
            Testing protective devices and EV-specific safety equipment
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Type A:</strong> AC faults + pulsating DC up to 6mA</li>
              <li><strong>Type B:</strong> All Type A + smooth DC detection</li>
              <li><strong>Trip times:</strong> ≤300ms at IΔn, ≤40ms at 5×IΔn</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Requirements</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Mode 3:</strong> Type B or Type A + DC detection</li>
              <li><strong>Half-rated test:</strong> Must NOT trip</li>
              <li><strong>Manual test:</strong> Monthly user operation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand RCD types for EV charging applications",
              "Perform Type A RCD testing procedures",
              "Execute Type B RCD functional tests",
              "Test EV-specific RCD protection systems",
              "Verify trip times and pass/fail criteria",
              "Diagnose common RCD faults on EV circuits"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            RCD Types for EV Charging
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EV charger electronics can produce different types of fault currents that require
              appropriate RCD protection. Understanding which RCD type is needed depends on
              the charging mode and charger design.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Type A RCD</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Sinusoidal AC residual currents</li>
                  <li>• Pulsating DC up to 6mA</li>
                  <li>• Mode 1/2 charging only</li>
                  <li>• Trip current: 30mA typical</li>
                  <li>• Operating time: ≤300ms</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Type B RCD</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• All Type A capabilities plus</li>
                  <li>• Smooth DC residual currents</li>
                  <li>• AC up to 1kHz frequency</li>
                  <li>• Required for Mode 3/DC</li>
                  <li>• Higher cost justified</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">EV-RCD</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Specialized EV applications</li>
                  <li>• Built-in DC 6mA detection</li>
                  <li>• Communication capability</li>
                  <li>• Self-testing functions</li>
                  <li>• Smart charging systems</li>
                </ul>
              </div>
            </div>

            <p>
              BS 7671 Regulation 722.531.2 requires either a Type B RCD or a Type A RCD
              combined with equipment providing equivalent DC fault protection (typically
              built into the charger) for Mode 3 charging installations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Type A RCD Testing Sequence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Standard RCD testing follows a specific sequence to verify correct operation
              at different fault current levels. Each test has specific pass/fail criteria.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Sequence</p>
                <ol className="text-sm text-white space-y-1 ml-4">
                  <li>1. Manual test button verification</li>
                  <li>2. Half-rated current (15mA): NO trip</li>
                  <li>3. Full-rated current (30mA): ≤300ms</li>
                  <li>4. 5× rated current (150mA): ≤40ms</li>
                  <li>5. Test 0° and 180° phase angles</li>
                  <li>6. Record all trip times</li>
                </ol>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pass Criteria</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>0.5×IΔn (15mA):</strong> Must NOT trip</li>
                  <li><strong>1×IΔn (30mA):</strong> ≤300ms general, ≤40ms socket</li>
                  <li><strong>5×IΔn (150mA):</strong> ≤40ms all applications</li>
                  <li><strong>Test button:</strong> Must operate correctly</li>
                  <li><strong>Reset:</strong> Must function properly</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why test both phase angles?</p>
              <p className="text-sm text-white/80">
                RCDs can have slightly different operating characteristics at 0° and 180° of the
                AC waveform. Testing both angles (using the instrument's phase selector) ensures
                the RCD operates correctly regardless of when in the cycle the fault occurs.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Type B RCD Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Type B RCDs require additional testing beyond standard Type A tests to verify
              their DC fault detection capabilities. Specialist test equipment is required.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">AC Testing</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Standard Type A sequence</li>
                  <li>• 50Hz sinusoidal current</li>
                  <li>• All phase combinations</li>
                  <li>• Trip time verification</li>
                  <li>• Reset functionality</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DC Testing</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Smooth DC test current</li>
                  <li>• 6mA DC threshold check</li>
                  <li>• +ve and -ve DC polarity</li>
                  <li>• Trip time verification</li>
                  <li>• Saturation immunity</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Specialist Tests</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• High-frequency AC (1kHz)</li>
                  <li>• Composite waveforms</li>
                  <li>• DC offset immunity</li>
                  <li>• Harmonic response</li>
                  <li>• Requires Type B tester</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Important: Test Equipment</p>
              <p className="text-sm text-white/80">
                Standard multifunction testers cannot test Type B RCD DC functions. A dedicated
                Type B RCD tester is required for full verification. If not available, verify
                the charger's built-in DC detection device is operational.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Fault Diagnosis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              RCD problems on EV charging circuits often have specific causes related to
              the charger electronics and installation environment.
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-elec-yellow/80 font-medium">Symptom</th>
                    <th className="text-left py-2 text-elec-yellow/80 font-medium">Likely Cause</th>
                    <th className="text-left py-2 text-elec-yellow/80 font-medium">Solution</th>
                  </tr>
                </thead>
                <tbody className="text-white/90">
                  <tr className="border-b border-white/10">
                    <td className="py-2">Won't trip at rated current</td>
                    <td className="py-2">Parallel earth paths</td>
                    <td className="py-2">Check wiring, eliminate parallels</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Nuisance tripping</td>
                    <td className="py-2">Cumulative leakage, EMI</td>
                    <td className="py-2">Measure earth leakage, check EMI</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Slow trip time</td>
                    <td className="py-2">High Zs, worn contacts</td>
                    <td className="py-2">Check Zs values, replace RCD</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Won't reset</td>
                    <td className="py-2">Persistent fault, mechanism</td>
                    <td className="py-2">Locate fault, check mechanism</td>
                  </tr>
                  <tr>
                    <td className="py-2">Trips during charging only</td>
                    <td className="py-2">DC component, charger fault</td>
                    <td className="py-2">Verify Type B/DC detection</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Earth Leakage Assessment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Use clamp meter on CPC during charging</li>
                  <li>• Typical charger leakage: 3-5mA</li>
                  <li>• 30mA RCD margin: 50% for safety</li>
                  <li>• Max recommended: 10mA per circuit</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Diagnostic Approach</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Instrument test all parameters</li>
                  <li>• Monitor during live charging</li>
                  <li>• Check for DC component with scope</li>
                  <li>• Review installation history</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always test at both 0° and 180° phase angles</li>
                <li>Record the worst-case trip time for documentation</li>
                <li>Verify Type B function if charger has no DC detection</li>
                <li>Check earth leakage with charger operating</li>
                <li>Test manual button monthly — advise customer</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Type A for Mode 3:</strong> — only valid with charger DC detection</li>
                <li><strong>Ignoring leakage:</strong> — cumulative leakage causes nuisance trips</li>
                <li><strong>No DC testing:</strong> — Type B requires specialist verification</li>
                <li><strong>Single phase angle:</strong> — always test both 0° and 180°</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Trip Time Limits</p>
              <ul className="space-y-0.5">
                <li>0.5×IΔn: Must NOT trip</li>
                <li>1×IΔn: ≤300ms (≤40ms sockets)</li>
                <li>5×IΔn: ≤40ms all applications</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Mode 3 Requirements</p>
              <ul className="space-y-0.5">
                <li>Type B RCD, or</li>
                <li>Type A + DC 6mA detection device</li>
                <li>BS 7671 Reg 722.531.2</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ev-charging-module-6-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ev-charging-module-6-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule6Section4;