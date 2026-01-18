import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m6s3-check1",
    question: "What test voltage is used for insulation resistance testing on circuits up to 500V?",
    options: ["250V DC", "500V DC", "1000V DC", "1500V DC"],
    correctIndex: 1,
    explanation: "For circuits up to 500V, a 500V DC test voltage is used. The minimum acceptable insulation resistance is 1MΩ for new installations."
  },
  {
    id: "evcharging-m6s3-check2",
    question: "What is the maximum Zs value for a 32A Type B MCB protecting a single-phase EV charger?",
    options: ["0.72Ω", "1.15Ω", "1.44Ω", "2.88Ω"],
    correctIndex: 2,
    explanation: "For a 32A Type B MCB, the maximum Zs is 1.44Ω. This ensures the protective device will disconnect within 0.4 seconds during a fault."
  },
  {
    id: "evcharging-m6s3-check3",
    question: "What is the minimum test current for continuity testing of protective conductors?",
    options: ["50mA", "100mA", "200mA", "500mA"],
    correctIndex: 2,
    explanation: "A minimum 200mA test current is required for continuity testing to ensure accurate resistance measurements and detect high-resistance connections."
  }
];

const faqs = [
  {
    question: "Can I test earth fault loop impedance with RCDs in circuit?",
    answer: "Use the no-trip method (calculate Zs = Ze + R1+R2) or temporarily isolate the RCD. Some modern testers have no-trip test modes specifically for RCD-protected circuits."
  },
  {
    question: "What if insulation resistance is below 1MΩ?",
    answer: "Investigate the cause - check for moisture ingress, damaged insulation, or faulty equipment. Disconnect loads to isolate the issue. The circuit cannot be energised until the fault is resolved."
  },
  {
    question: "How do I verify polarity on three-phase EV chargers?",
    answer: "Use a phase rotation meter to confirm correct L1-L2-L3 sequence. Incorrect rotation can damage motors and may cause charger malfunction."
  },
  {
    question: "What documentation is required after testing?",
    answer: "Complete an Electrical Installation Certificate (EIC) for new installations, including Schedule of Test Results. Minor Works Certificate is not suitable for EV charging installations."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "An EV charging circuit has measured Zs of 1.2Ω with a 32A Type B MCB. What is the correct assessment?",
  options: [
    "Fail - Zs exceeds maximum permitted value",
    "Pass - Zs is within maximum permitted value",
    "Cannot determine - need more information",
    "Marginal - recommend cable upgrade"
  ],
  correctAnswer: 1,
  explanation: "The maximum Zs for a 32A Type B MCB is 1.44Ω. The measured value of 1.2Ω is within this limit, so the circuit passes. However, applying the 0.8 multiplier for conductor temperature (1.2 ÷ 0.8 = 1.5Ω) may exceed the limit at elevated temperatures."
  }
];

const EVChargingModule6Section3 = () => {
  useSEO({
    title: "BS 7671 Part 722 Testing Procedures | EV Charging Module 6.3",
    description: "Master BS 7671 Part 722 testing procedures for EV charging installations, including verification methods and compliance standards."
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
            <Link to="/electrician/upskilling/ev-charging-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BS 7671 Part 722 Testing Procedures
          </h1>
          <p className="text-white/80">
            Comprehensive testing and verification for EV installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>IR test:</strong> 500V DC, minimum 1MΩ</li>
              <li><strong>Continuity:</strong> 200mA test current</li>
              <li><strong>Zs (32A Type B):</strong> Maximum 1.44Ω</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Test records, EIC certificates</li>
              <li><strong>Use:</strong> Multifunction tester, calibration cert</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand BS 7671 Part 722 requirements",
              "Perform initial verification testing",
              "Execute continuity and IR testing",
              "Conduct earth fault loop impedance tests",
              "Verify protective device operation",
              "Complete certification documentation"
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
            Initial Verification Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Initial verification confirms the installation is safe before energisation
              and complies with BS 7671 requirements for EV charging circuits.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Test Checks</p>
                <ul className="text-sm text-white space-y-1">
                  <li>All connections secure and correct</li>
                  <li>Protective devices correctly rated</li>
                  <li>Correct polarity verified</li>
                  <li>Equipment properly labelled</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Sequence</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>1.</strong> Continuity of conductors</li>
                  <li><strong>2.</strong> Insulation resistance</li>
                  <li><strong>3.</strong> Polarity verification</li>
                  <li><strong>4.</strong> Earth fault loop impedance</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Continuity Testing Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Test current:</strong> Minimum 200mA</li>
                <li><strong>Socket outlet circuits:</strong> R1+R2 method</li>
                <li><strong>Protective conductors:</strong> Direct measurement to MET</li>
                <li><strong>Main bonding:</strong> Verify integrity of connections</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Earth Fault Loop Impedance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Earth fault loop impedance (Zs) must be low enough to ensure protective
              devices disconnect within required times during fault conditions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maximum Zs Values</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>32A Type B:</strong> 1.44Ω</li>
                  <li><strong>40A Type B:</strong> 1.15Ω</li>
                  <li><strong>32A Type C:</strong> 0.72Ω</li>
                  <li><strong>40A Type C:</strong> 0.58Ω</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Methods</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Direct:</strong> Live measurement at circuit end</li>
                  <li><strong>No-trip:</strong> Calculate Zs = Ze + (R1+R2)</li>
                  <li><strong>0.8 factor:</strong> Temperature correction</li>
                  <li><strong>Record:</strong> All values on test schedule</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">0.4s</p>
                <p className="text-white text-xs">Max disconnect time</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">0.8</p>
                <p className="text-white text-xs">Temperature factor</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">5×In</p>
                <p className="text-white text-xs">Type B trip current</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Insulation Resistance Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulation resistance testing verifies the integrity of cable and equipment
              insulation, detecting deterioration or damage before it becomes dangerous.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Voltage:</strong> 500V DC (up to 500V circuits)</li>
                  <li><strong>Duration:</strong> Minimum 60 seconds</li>
                  <li><strong>Minimum:</strong> 1MΩ for new installations</li>
                  <li><strong>Acceptable:</strong> ≥0.5MΩ for periodic</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Sequence</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Disconnect sensitive equipment</li>
                  <li>Test L-E, N-E, L-N</li>
                  <li>Connect neutrals together if testing L-E</li>
                  <li>Record all readings</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Important Precautions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Isolate circuit completely before testing</li>
                <li>Disconnect EV charger before IR testing (damage risk)</li>
                <li>Allow capacitive discharge after testing</li>
                <li>Test charger supply cable separately</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Calibrated test equipment with valid certificate</li>
                <li>Correct test leads (GS38 compliant)</li>
                <li>Isolation verified before dead tests</li>
                <li>All results recorded on test schedule</li>
                <li>EIC completed with all required information</li>
                <li>Customer provided with all certificates</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Testing Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>No temperature correction:</strong> — Zs may exceed limits at operating temperature</li>
                <li><strong>Testing with loads connected:</strong> — IR test may damage equipment</li>
                <li><strong>Wrong test voltage:</strong> — invalid IR results</li>
                <li><strong>Incomplete documentation:</strong> — certificate invalid</li>
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Test Values</p>
              <ul className="space-y-0.5">
                <li>IR: 500V DC, ≥1MΩ</li>
                <li>Continuity: 200mA, low Ω</li>
                <li>Disconnect: ≤0.4s</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Documentation</p>
              <ul className="space-y-0.5">
                <li>EIC for new installations</li>
                <li>Schedule of test results</li>
                <li>Circuit diagram/schedule</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-6-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-6-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule6Section3;