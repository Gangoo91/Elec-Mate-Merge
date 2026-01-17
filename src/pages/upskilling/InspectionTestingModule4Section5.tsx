import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Interpreting IR Results - Module 4 Section 5";
const DESCRIPTION = "Learn to interpret insulation resistance test results, understand minimum values, and assess installation condition.";

const quickCheckQuestions = [
  {
    id: "new-installation",
    question: "A new installation should typically read:",
    options: ["1-2 MΩ", "10-50 MΩ", ">100 MΩ or OL", "Exactly 1 MΩ"],
    correctIndex: 2,
    explanation: "New cable insulation has very high resistance. Readings exceeding 100 MΩ or showing OL (Over Limit) are normal for new installations."
  },
  {
    id: "cable-length",
    question: "As cable length increases, IR reading:",
    options: [
      "Increases proportionally",
      "Decreases (more parallel paths)",
      "Stays exactly the same",
      "Becomes unstable"
    ],
    correctIndex: 1,
    explanation: "Longer cables have more insulation in parallel, reducing overall measured IR. This is normal physics, not degradation."
  },
  {
    id: "below-minimum",
    question: "A reading of 0.8 MΩ indicates:",
    options: [
      "Excellent insulation",
      "Below minimum - investigation required",
      "Normal for older installations",
      "Meter fault"
    ],
    correctIndex: 1,
    explanation: "0.8 MΩ is below the 1.0 MΩ minimum. The circuit fails and cannot be energised until the problem is resolved."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The minimum acceptable IR for a 230V circuit is:",
    options: ["0.5 MΩ", "1.0 MΩ", "2.0 MΩ", "10 MΩ"],
    correctAnswer: 1,
    explanation: "BS 7671 specifies minimum 1.0 MΩ for circuits above 50V (LV). SELV/PELV circuits have a minimum of 0.5 MΩ."
  },
  {
    id: 2,
    question: "A new installation typically reads:",
    options: ["1-2 MΩ", "10-50 MΩ", ">100 MΩ or OL", "Exactly 1 MΩ"],
    correctAnswer: 2,
    explanation: "New cable insulation has very high resistance. Readings over 100 MΩ or exceeding meter range (OL) are normal for new work."
  },
  {
    id: 3,
    question: "A reading of 0.8 MΩ indicates:",
    options: [
      "Excellent insulation",
      "Below minimum - investigation required",
      "Normal for older installations",
      "Meter fault"
    ],
    correctAnswer: 1,
    explanation: "0.8 MΩ is below the 1.0 MΩ minimum. This circuit fails and requires investigation before it can be energised."
  },
  {
    id: 4,
    question: "As cable length increases, IR reading:",
    options: [
      "Increases proportionally",
      "Decreases (more parallel paths)",
      "Stays exactly the same",
      "Becomes unstable"
    ],
    correctAnswer: 1,
    explanation: "Longer cables have more insulation in parallel, reducing overall IR. This is normal - a 100m cable has roughly half the IR of a 50m cable of the same type."
  },
  {
    id: 5,
    question: "'OL' on an IR meter indicates:",
    options: [
      "Open circuit fault",
      "Overload condition",
      "Over Limit - excellent insulation",
      "Low battery"
    ],
    correctAnswer: 2,
    explanation: "OL (Over Limit) means resistance exceeds the meter's range. This indicates excellent insulation - the reading is too high to measure."
  },
  {
    id: 6,
    question: "A 5-year-old installation reading 50 MΩ is:",
    options: [
      "Failing",
      "Below minimum",
      "Still good - well above 1 MΩ",
      "Needs immediate attention"
    ],
    correctAnswer: 2,
    explanation: "50 MΩ is well above the 1.0 MΩ minimum. While lower than new, this indicates healthy insulation for a 5-year-old installation."
  },
  {
    id: 7,
    question: "Humidity affects IR readings by:",
    options: [
      "Having no effect",
      "Increasing readings",
      "Causing surface leakage, reducing readings",
      "Making readings unstable"
    ],
    correctAnswer: 2,
    explanation: "High humidity creates moisture films on insulation surfaces, allowing surface leakage current and reducing apparent IR."
  },
  {
    id: 8,
    question: "If L-E and N-E pass but L-N fails, the problem is:",
    options: [
      "Poor earth connection",
      "Insulation breakdown between line and neutral",
      "Disconnected neutral",
      "Wrong test voltage"
    ],
    correctAnswer: 1,
    explanation: "Passing L-E and N-E tests show both conductors are insulated from earth. The L-N failure indicates conductor-to-conductor insulation breakdown."
  },
  {
    id: 9,
    question: "An older installation reading 2 MΩ should be:",
    options: [
      "Failed immediately",
      "Monitored - acceptable but declining",
      "Ignored",
      "Tested at higher voltage"
    ],
    correctAnswer: 1,
    explanation: "2 MΩ is above the 1.0 MΩ minimum so is acceptable, but lower than expected. Note the value and monitor for further decline at next inspection."
  },
  {
    id: 10,
    question: "The minimum IR for SELV circuits is:",
    options: ["0.25 MΩ", "0.5 MΩ", "1.0 MΩ", "2.0 MΩ"],
    correctAnswer: 1,
    explanation: "SELV and PELV circuits (extra-low voltage) have a lower minimum of 0.5 MΩ, tested at 250V DC per BS 7671."
  }
];

const faqs = [
  {
    question: "What if reading is exactly 1.0 MΩ?",
    answer: "1.0 MΩ is the minimum acceptable value. While technically compliant, it's borderline and suggests degradation. Investigate the cause - on new work this indicates a problem; on older installations monitor for further decline."
  },
  {
    question: "Why do new installations read >100 MΩ?",
    answer: "Modern cable insulation materials have extremely high resistance when new. Readings of several hundred megohms or showing 'OL' (over limit) are normal. Low readings on new work always indicate a problem."
  },
  {
    question: "What's the relationship between cable length and IR?",
    answer: "IR reading decreases as cable length increases (parallel insulation paths). A 100m circuit has approximately half the IR of a 50m circuit. This is normal physics, not degradation. Assess values relative to circuit length."
  },
  {
    question: "Do weather conditions affect readings?",
    answer: "Yes significantly. Humidity increases surface leakage. Cold weather causing condensation can dramatically reduce readings. Test in stable, dry conditions where possible, or account for conditions in your assessment."
  },
  {
    question: "How do I record readings that exceed the meter range?",
    answer: "Record as '>200 MΩ' or '>500 MΩ' depending on your instrument's maximum display. Many modern meters show 'OL' (Over Limit) for values beyond range. This indicates excellent insulation."
  },
  {
    question: "What if only one test (e.g., L-N) fails?",
    answer: "Each test measures different insulation paths. A single failure identifies the specific problem area. For example, L-N failure with L-E and N-E passing suggests insulation breakdown between conductors, not to earth."
  }
];

const InspectionTestingModule4Section5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-4">
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
            <span>Module 4 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Interpreting IR Results
          </h1>
          <p className="text-white/80">
            Understand what IR readings mean and when to take action
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Minimum LV:</strong> 1.0 MΩ (0.5 MΩ for SELV)</li>
              <li><strong>New work:</strong> &gt;100 MΩ expected</li>
              <li><strong>Low reading:</strong> Requires investigation</li>
              <li><strong>OL display:</strong> Excellent insulation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Interpretation Guide</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>&gt;100 MΩ:</strong> Excellent - no action</li>
              <li><strong>10-100 MΩ:</strong> Good - acceptable</li>
              <li><strong>2-10 MΩ:</strong> Monitor trend</li>
              <li><strong>&lt;1 MΩ:</strong> FAIL - remedial action</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Know BS 7671 minimum values",
              "Understand expected readings by age",
              "Interpret low readings correctly",
              "Account for factors affecting results",
              "Record and document findings properly",
              "Know when to take action"
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

        {/* Section 1: Minimum Values */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Minimum Values
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">Circuit Type</th>
                    <th className="text-center py-2 text-white/60">Test V</th>
                    <th className="text-right py-2 text-white/60">Min IR</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-3">SELV/PELV</td>
                    <td className="text-center font-mono">250V</td>
                    <td className="text-right font-mono text-elec-yellow">&ge;0.5 MΩ</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3">LV up to 500V</td>
                    <td className="text-center font-mono">500V</td>
                    <td className="text-right font-mono text-elec-yellow">&ge;1.0 MΩ</td>
                  </tr>
                  <tr>
                    <td className="py-3">500V to 1000V</td>
                    <td className="text-center font-mono">1000V</td>
                    <td className="text-right font-mono text-elec-yellow">&ge;1.0 MΩ</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> These are minimum values. New installations should read much higher.
            </p>
          </div>
        </section>

        {/* Section 2: Expected Readings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Expected Readings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="space-y-3 my-6">
              <div className="p-3 rounded-lg bg-emerald-500/10">
                <p className="text-emerald-400 font-medium text-sm">New Installation</p>
                <p className="text-white/70 text-sm">&gt;100 MΩ or OL (Over Limit). Modern cables have excellent insulation when new.</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <p className="text-blue-400 font-medium text-sm">5-10 Years Old</p>
                <p className="text-white/70 text-sm">20-100 MΩ typical. Some degradation is normal with age.</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10">
                <p className="text-amber-400 font-medium text-sm">15-25 Years Old</p>
                <p className="text-white/70 text-sm">5-50 MΩ typical. Monitor for continued decline.</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10">
                <p className="text-red-400 font-medium text-sm">&gt;25 Years / Poor Environment</p>
                <p className="text-white/70 text-sm">May approach minimum values. Consider replacement if declining.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Interpreting Results */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Interpreting Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">Reading</th>
                    <th className="text-left py-2 text-white/60">Assessment</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-mono">&gt;100 MΩ / OL</td>
                    <td className="py-2 text-emerald-400">Excellent - no action needed</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-mono">10-100 MΩ</td>
                    <td className="py-2 text-emerald-400">Good - acceptable</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-mono">2-10 MΩ</td>
                    <td className="py-2 text-amber-400">Acceptable - monitor trend</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-mono">1-2 MΩ</td>
                    <td className="py-2 text-amber-400">Marginal - investigate cause</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono">&lt;1 MΩ</td>
                    <td className="py-2 text-red-400">FAIL - remedial action required</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 4: Factors Affecting Readings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Factors Affecting Readings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid grid-cols-2 gap-3 my-6">
              {[
                { factor: "Cable Length", effect: "Longer = lower reading" },
                { factor: "Temperature", effect: "Higher = lower reading" },
                { factor: "Humidity", effect: "Higher = lower reading" },
                { factor: "Age", effect: "Older = lower reading" },
                { factor: "Environment", effect: "Harsh = lower reading" },
                { factor: "Cable Type", effect: "Varies by insulation" }
              ].map((item, i) => (
                <div key={i} className="text-sm">
                  <p className="text-elec-yellow/80 font-medium">{item.factor}</p>
                  <p className="text-white/80">{item.effect}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-white/70">
              <strong className="text-elec-yellow">Note:</strong> Consider all factors when assessing results. A 10 MΩ reading on a 200m industrial circuit is very different from 10 MΩ on a 10m domestic circuit.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Individual Test Analysis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Individual Test Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different test failures indicate different problems:
            </p>

            <div className="space-y-4 my-6">
              <div className="border-l-2 border-elec-yellow pl-4">
                <p className="text-elec-yellow font-medium text-sm">L-E Fails</p>
                <p className="text-white/70 text-sm">Phase insulation to earth compromised. Risk of earth leakage and shock.</p>
              </div>
              <div className="border-l-2 border-blue-400 pl-4">
                <p className="text-blue-400 font-medium text-sm">N-E Fails</p>
                <p className="text-white/70 text-sm">Neutral to earth insulation problem. May indicate N-E fault or shared neutral issue.</p>
              </div>
              <div className="border-l-2 border-purple-400 pl-4">
                <p className="text-purple-400 font-medium text-sm">L-N Fails</p>
                <p className="text-white/70 text-sm">Conductor-to-conductor breakdown. High risk of short circuit if energised.</p>
              </div>
              <div className="border-l-2 border-red-400 pl-4">
                <p className="text-red-400 font-medium text-sm">All Three Fail</p>
                <p className="text-white/70 text-sm">Severe insulation breakdown or contamination. Likely water ingress or major damage.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Recording and Reporting */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Recording and Reporting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Record all readings accurately:
            </p>

            <div className="my-6">
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record actual values in MΩ (not just PASS/FAIL)</li>
                <li>Use '&gt;200 MΩ' for readings exceeding meter range</li>
                <li>Note test voltage used</li>
                <li>Record any equipment disconnected</li>
                <li>Include observations (age, conditions, concerns)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10">
              <p className="text-elec-yellow text-sm font-semibold">Trending</p>
              <p className="text-white/70 text-sm mt-1">
                Comparing IR values between periodic inspections reveals degradation trends and helps predict when replacement will be needed.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Compare Similar Circuits</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Circuits of similar length and age should have similar readings</li>
                <li>An outlier suggests a specific problem with that circuit</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Re-test Low Readings</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>If a reading seems wrong, verify probes are connected properly</li>
                <li>Moisture may dry during testing - re-test after a few minutes</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Document Context</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Note weather conditions, building occupancy, whether heating was on</li>
                <li>This helps interpret borderline results accurately</li>
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
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Minimum Values</p>
                <ul className="space-y-0.5">
                  <li>LV circuits: &ge;1.0 MΩ</li>
                  <li>SELV/PELV: &ge;0.5 MΩ</li>
                  <li>OL display: Excellent</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Expected by Age</p>
                <ul className="space-y-0.5">
                  <li>New: &gt;100 MΩ or OL</li>
                  <li>5-10 years: 20-100 MΩ</li>
                  <li>&lt;1 MΩ: FAIL</li>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-4/section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-4/section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule4Section5;
