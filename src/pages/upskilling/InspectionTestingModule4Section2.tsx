import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Test Voltages and Applications - Module 4 Section 2";
const DESCRIPTION = "Learn which test voltages to use for different circuit types and why voltage selection matters for safe, accurate IR testing.";

const quickCheckQuestions = [
  {
    id: "selv-voltage",
    question: "What test voltage is used for SELV circuits?",
    options: ["500V DC", "250V DC", "1000V DC", "50V DC"],
    correctIndex: 1,
    explanation: "SELV and PELV circuits are tested at 250V DC to avoid damaging their lower-rated insulation."
  },
  {
    id: "three-phase-voltage",
    question: "What test voltage for a 400V three-phase supply?",
    options: ["250V DC", "400V DC", "500V DC", "1000V DC"],
    correctIndex: 2,
    explanation: "400V is below 500V, so 500V DC test voltage is appropriate for three-phase 400V systems."
  },
  {
    id: "undervoltage-test",
    question: "Using 250V DC on a standard 230V circuit would:",
    options: [
      "Give accurate results",
      "Not adequately stress the insulation",
      "Damage the circuit",
      "Be more accurate than 500V"
    ],
    correctIndex: 1,
    explanation: "250V doesn't stress 230V-rated insulation sufficiently. Weaknesses may not be revealed, giving false confidence in poor insulation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What test voltage should be used for a standard 230V domestic circuit?",
    options: ["250V DC", "500V DC", "1000V DC", "230V AC"],
    correctAnswer: 1,
    explanation: "230V circuits are tested at 500V DC per BS 7671 Table 6A. This applies to all LV circuits up to 500V nominal."
  },
  {
    id: 2,
    question: "SELV circuits should be tested at:",
    options: ["500V DC", "250V DC", "1000V DC", "12V DC"],
    correctAnswer: 1,
    explanation: "SELV and PELV circuits are tested at 250V DC to avoid damaging their lower-rated insulation."
  },
  {
    id: 3,
    question: "What is the test voltage for circuits between 500V and 1000V?",
    options: ["250V DC", "500V DC", "1000V DC", "2000V DC"],
    correctAnswer: 2,
    explanation: "Circuits with nominal voltage between 500V and 1000V are tested at 1000V DC per BS 7671."
  },
  {
    id: 4,
    question: "Why is the test voltage approximately double the circuit voltage?",
    options: [
      "To cause insulation breakdown",
      "To adequately stress insulation while being safe",
      "It's required by equipment design",
      "To trip protective devices"
    ],
    correctAnswer: 1,
    explanation: "The test voltage stresses insulation enough to reveal weaknesses, while not being high enough to damage good insulation."
  },
  {
    id: 5,
    question: "Using 500V DC on a SELV circuit could:",
    options: [
      "Give more accurate readings",
      "Have no effect",
      "Damage the insulation",
      "Improve insulation quality"
    ],
    correctAnswer: 2,
    explanation: "SELV circuit insulation is only rated for extra-low voltage. Applying 500V could permanently damage the insulation."
  },
  {
    id: 6,
    question: "A 400V three-phase motor circuit should be tested at:",
    options: ["250V DC", "400V DC", "500V DC", "1000V DC"],
    correctAnswer: 2,
    explanation: "400V is below the 500V threshold, so 500V DC test voltage is appropriate for three-phase 400V systems."
  },
  {
    id: 7,
    question: "Which BS 7671 table specifies test voltages?",
    options: ["Table 4A", "Table 5B", "Table 6A", "Table 7A"],
    correctAnswer: 2,
    explanation: "BS 7671 Table 6A specifies the DC test voltages for insulation resistance testing based on circuit nominal voltage."
  },
  {
    id: 8,
    question: "The minimum insulation resistance is:",
    options: [
      "Different for each test voltage",
      "1 MΩ regardless of test voltage",
      "Higher for lower test voltages",
      "Lower for lower test voltages"
    ],
    correctAnswer: 1,
    explanation: "The minimum acceptable insulation resistance of 1 MΩ applies regardless of which test voltage is used."
  },
  {
    id: 9,
    question: "What test voltage for a 24V control circuit?",
    options: ["250V DC", "500V DC", "24V DC", "50V DC"],
    correctAnswer: 0,
    explanation: "24V circuits (below 50V) are classified as extra-low voltage and tested at 250V DC."
  },
  {
    id: 10,
    question: "If an instrument only offers 500V, you:",
    options: [
      "Can test all circuits",
      "Cannot perform compliant tests on SELV circuits",
      "Should use the next highest setting",
      "Should connect two leads to increase voltage"
    ],
    correctAnswer: 1,
    explanation: "A 500V-only instrument cannot perform compliant insulation tests on SELV/PELV circuits, which require 250V."
  }
];

const faqs = [
  {
    question: "Why are different test voltages specified?",
    answer: "Test voltages are approximately double the circuit's nominal voltage to stress the insulation adequately. This reveals weaknesses without being so high as to cause breakdown of good insulation. It's a balance between thorough testing and avoiding unnecessary stress."
  },
  {
    question: "Can I use 500V on SELV circuits?",
    answer: "No. SELV circuits operate at extra-low voltage (typically 12V or 24V) and their insulation may not withstand 500V test voltage. Use 250V DC maximum to avoid insulation damage on these circuits."
  },
  {
    question: "What if the instrument only has 500V?",
    answer: "For SELV/PELV circuits, you cannot perform a compliant test with a 500V-only instrument. Either use an instrument with 250V range, or record that the test couldn't be performed with appropriate voltage."
  },
  {
    question: "When would I use 1000V DC?",
    answer: "1000V DC is used for systems with nominal voltages between 500V and 1000V, such as 660V industrial motor circuits. It's also sometimes used for enhanced testing of HV cable insulation, though specialist equipment may be required."
  },
  {
    question: "Does higher test voltage give more accurate results?",
    answer: "Not necessarily. Using voltage higher than specified can stress insulation unnecessarily and may even cause breakdown, giving false 'fail' results. Always use the voltage appropriate for the circuit being tested."
  },
  {
    question: "What about testing 400V three-phase circuits?",
    answer: "400V three-phase systems are tested at 500V DC. The line-to-neutral voltage (230V) and line-to-line voltage (400V) are both below the 500V threshold, so 500V test voltage is appropriate."
  }
];

const InspectionTestingModule4Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
            <span>Module 4 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Test Voltages and Applications
          </h1>
          <p className="text-white/80">
            Learn which test voltages to use for different circuit types and why selection matters
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>SELV/PELV:</strong> 250V DC test voltage</li>
              <li><strong>Up to 500V:</strong> 500V DC test voltage</li>
              <li><strong>500V-1000V:</strong> 1000V DC test voltage</li>
              <li><strong>Reference:</strong> BS 7671 Table 6A</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Points</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Match:</strong> Voltage to circuit rating</li>
              <li><strong>Protect:</strong> Don't damage equipment</li>
              <li><strong>Document:</strong> Record voltage used</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select correct test voltage for each circuit",
              "Understand why voltage levels are specified",
              "Protect equipment from overvoltage damage",
              "Know BS 7671 requirements",
              "Test SELV/PELV circuits correctly",
              "Handle three-phase systems"
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

        {/* Section 1: BS 7671 Table 6A */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BS 7671 Table 6A
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Test voltages are specified in BS 7671 Table 6A based on circuit nominal voltage:
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">Circuit Voltage</th>
                    <th className="text-center py-2 text-white/60">Test Voltage</th>
                    <th className="text-right py-2 text-white/60">Min IR</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-3">SELV & PELV</td>
                    <td className="text-center font-mono text-elec-yellow">250V DC</td>
                    <td className="text-right">&ge;0.5 MΩ</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3">Up to 500V (inc. 230V, 400V)</td>
                    <td className="text-center font-mono text-elec-yellow">500V DC</td>
                    <td className="text-right">&ge;1.0 MΩ</td>
                  </tr>
                  <tr>
                    <td className="py-3">500V to 1000V</td>
                    <td className="text-center font-mono text-elec-yellow">1000V DC</td>
                    <td className="text-right">&ge;1.0 MΩ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 2: SELV/PELV Circuits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            SELV/PELV Circuits (250V)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10">
              <p className="text-elec-yellow font-semibold">250V DC Test Voltage</p>
              <p className="text-white/60 text-sm">For extra-low voltage circuits</p>
            </div>

            <p>
              <strong className="text-white">SELV</strong> (Separated Extra-Low Voltage) and <strong className="text-white">PELV</strong> (Protective
              Extra-Low Voltage) circuits operate at 50V AC or 120V DC maximum.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Examples</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Bathroom shaver supplies</li>
                <li>Garden lighting transformers</li>
                <li>Bell circuits</li>
                <li>Some LED drivers</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Warning:</strong> Using 500V on these circuits risks damaging insulation not rated for higher voltages.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Standard LV Circuits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Standard LV Circuits (500V)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10">
              <p className="text-elec-yellow font-semibold">500V DC Test Voltage</p>
              <p className="text-white/60 text-sm">For circuits up to 500V nominal</p>
            </div>

            <p>
              This covers the vast majority of domestic and commercial installations:
            </p>

            <div className="my-6">
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>230V single-phase lighting and power</li>
                <li>400V three-phase supplies</li>
                <li>All standard socket outlets</li>
                <li>Fixed equipment connections</li>
                <li>Distribution board circuits</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Higher Voltage Circuits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Higher Voltage Circuits (1000V)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 p-4 rounded-lg bg-red-500/10">
              <p className="text-red-400 font-semibold">1000V DC Test Voltage</p>
              <p className="text-white/60 text-sm">For circuits 500V to 1000V nominal</p>
            </div>

            <p>
              Used primarily in industrial installations:
            </p>

            <div className="my-6">
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>660V motor circuits</li>
                <li>Industrial control systems</li>
                <li>Large process equipment</li>
                <li>Mining and offshore installations</li>
              </ul>
            </div>

            <p className="text-sm text-white/70">
              Most domestic electricians rarely encounter circuits requiring 1000V testing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Why the 2x Ratio */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Why the 2x Ratio?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Test voltages are approximately twice the circuit voltage because:
            </p>

            <div className="space-y-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Adequate Stress</p>
                <p className="text-sm text-white/80">Double voltage stresses insulation enough to reveal developing weaknesses that might not show at normal operating voltage.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Safety Margin</p>
                <p className="text-sm text-white/80">Good insulation easily withstands 2x voltage. If it fails at 2x, it may fail in service under transient overvoltages.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Not Too High</p>
                <p className="text-sm text-white/80">Higher than 2x would risk damaging good insulation and cause unnecessary failures.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Common Mistakes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Common Mistakes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="space-y-4 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-1">Using 500V on SELV</p>
                <p className="text-sm text-white/80">Damages insulation rated for extra-low voltage. Always check circuit type first.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-1">Using 250V on LV</p>
                <p className="text-sm text-white/80">Doesn't adequately stress insulation. May pass circuits that would fail at correct voltage.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-1">Not Checking Instrument</p>
                <p className="text-sm text-white/80">Always verify selected voltage before testing. Some instruments default to 500V.</p>
              </div>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Check Voltage First</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Before each test, verify instrument is set to correct voltage for the circuit type</li>
                <li>Many instruments default to 500V - check before testing SELV/PELV circuits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Label SELV Circuits</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Mark SELV/PELV circuits clearly so they're not inadvertently tested at 500V</li>
                <li>Check circuit documentation before testing unknown circuits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Document Settings</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record the test voltage used on certificates - it's a requirement</li>
                <li>Note any deviations from standard test voltage and reasons</li>
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
                <p className="font-medium text-white mb-1">Test Voltages</p>
                <ul className="space-y-0.5">
                  <li>SELV/PELV: 250V DC &rarr; &ge;0.5 MΩ</li>
                  <li>Up to 500V: 500V DC &rarr; &ge;1.0 MΩ</li>
                  <li>500V-1000V: 1000V DC &rarr; &ge;1.0 MΩ</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Points</p>
                <ul className="space-y-0.5">
                  <li>Reference: BS 7671 Table 6A</li>
                  <li>Voltage ratio: ~2x circuit voltage</li>
                  <li>Always record test voltage used</li>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-4/section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-4/section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule4Section2;
