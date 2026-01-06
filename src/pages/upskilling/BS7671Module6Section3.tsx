import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bs7671-m6s3-check1",
    question: "What must always be carried out before any electrical testing begins?",
    options: [
      "Circuit documentation",
      "Safe isolation of the installation",
      "Customer notification",
      "Equipment calibration check"
    ],
    correctIndex: 1,
    explanation: "Safe isolation must always be the first step. This includes switching off and locking off the supply, testing for absence of voltage using a proven voltage indicator, and ensuring the installation cannot be re-energised during testing. This protects the electrician from electric shock and ensures accurate test results."
  },
  {
    id: "bs7671-m6s3-check2",
    question: "Name two tests that are carried out while the installation is de-energised.",
    options: [
      "RCD testing and loop impedance",
      "Continuity and insulation resistance",
      "Prospective fault current and functional testing",
      "Phase sequence and voltage drop"
    ],
    correctIndex: 1,
    explanation: "Continuity of protective conductors and insulation resistance are both dead tests carried out while the installation is isolated and de-energised for safety. Other dead tests include ring circuit continuity and polarity verification."
  },
  {
    id: "bs7671-m6s3-check3",
    question: "What test confirms the effectiveness of protective devices under fault conditions?",
    options: [
      "Insulation resistance testing",
      "Polarity verification",
      "Earth fault loop impedance (Zs) testing",
      "Continuity testing"
    ],
    correctIndex: 2,
    explanation: "Earth fault loop impedance testing measures the total impedance of the earth fault loop, which determines whether protective devices will operate quickly enough to provide automatic disconnection in the event of an earth fault. This is fundamental to electrical safety."
  },
  {
    id: "bs7671-m6s3-check4",
    question: "Why must test results be recorded and compared to BS 7671 values?",
    options: [
      "For marketing purposes only",
      "To satisfy manufacturer requirements",
      "To provide documented evidence of compliance and safety",
      "Only required for commercial installations"
    ],
    correctIndex: 2,
    explanation: "Recording and comparing test results to BS 7671 values provides documented proof that the installation meets safety standards, creates a baseline for future inspections, satisfies legal requirements, and protects both the electrician and client."
  }
];

const faqs = [
  {
    question: "Can I perform live tests before completing all dead tests?",
    answer: "No. The test sequence exists for safety reasons. Dead tests must be completed satisfactorily before energising the installation for live testing. This ensures the installation is fundamentally safe before applying power."
  },
  {
    question: "What happens if a ring circuit continuity test fails?",
    answer: "A failed ring circuit test indicates a break or fault in the circuit. The circuit cannot be certified and must be investigated and repaired. Common causes include broken connections, incorrect wiring, or damaged cables."
  },
  {
    question: "How often should test instruments be calibrated?",
    answer: "Test instruments should be calibrated annually as a minimum, with calibration certificates maintained. Pre-use checks should be performed before each testing session to verify instrument accuracy."
  }
];

const quizQuestion = {
  question: "What is the correct order for electrical testing under BS 7671?",
  options: [
    "Live tests first, then dead tests",
    "Any order is acceptable",
    "Safe isolation, dead tests, then live tests",
    "Functional tests first, then verification tests"
  ],
  correctAnswer: 2,
  explanation: "BS 7671 mandates the sequence: safe isolation first, then dead tests (continuity, insulation resistance, polarity), and finally live tests (loop impedance, RCD operation, prospective fault current, functional tests). This order ensures safety and valid results."
};

const BS7671Module6Section3 = () => {
  useSEO({
    title: "Sequence of Tests and Testing Procedures | BS7671 Module 6.3",
    description: "Learn the correct order of electrical tests required by BS 7671, including safe isolation, dead tests, and live tests."
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
            <Link to="../bs7671-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Sequence of Tests and Testing Procedures
          </h1>
          <p className="text-white/80">
            The correct order for BS 7671 electrical testing and why sequence matters
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Always:</strong> Safe isolation → Dead tests → Live tests</li>
              <li><strong>Dead Tests:</strong> Continuity, insulation resistance, polarity</li>
              <li><strong>Live Tests:</strong> Loop impedance, RCD, PFC, functional</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Testing out of sequence can mask faults and create hazards</li>
              <li><strong>Use:</strong> Follow BS 7671 Regulation 612 sequence every time</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Recall the correct order of tests as required by BS 7671",
              "Understand why sequence is important for safety and accuracy",
              "Apply testing procedures step by step in real-world installations",
              "Identify what each test confirms in relation to compliance"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Safe Isolation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Safe Isolation and Preliminary Checks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before testing, confirm safe isolation of the installation using proven safe isolation procedures.
              This is fundamental to electrician safety during verification.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safe Isolation Procedure</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Switch off and lock off the supply</li>
                  <li>2. Test voltage indicator on a known live source</li>
                  <li>3. Test for absence of voltage on all conductors</li>
                  <li>4. Re-test voltage indicator on known live source</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Preliminary Checks</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Visual inspection completed (Section 2)</li>
                  <li>Supply characteristics confirmed (voltage, earthing)</li>
                  <li>Protective devices correctly rated and installed</li>
                  <li>All equipment to be tested is accessible</li>
                </ul>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 2: Dead Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Dead Testing (Before Energisation)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Dead testing is performed on de-energised installations to verify basic safety and integrity
              before the installation is energised for live testing.
            </p>

            <div className="space-y-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">A. Continuity of Protective Conductors</p>
                <p className="text-sm text-white/80 mb-2">
                  Including main and supplementary bonding conductors. Ensures all metalwork is properly earthed.
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Use low-resistance ohmmeter with test current ≥200mA</li>
                  <li>Test between main earthing terminal and all exposed conductive parts</li>
                  <li>Record R1 + R2 values for each circuit</li>
                  <li>Maximum values depend on circuit protection and cable CSA</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">B. Continuity of Ring Final Circuit Conductors</p>
                <p className="text-sm text-white/80 mb-2">
                  For 32A ring circuits only. Verifies ring integrity and calculates R1 + R2 values.
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Measure end-to-end resistance of each conductor</li>
                  <li>Cross-connect and test from each socket outlet</li>
                  <li>Values should be (R1+R2)/4 for a perfect ring</li>
                  <li>Identify any interconnections or spur connections</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">C. Insulation Resistance</p>
                <p className="text-sm text-white/80 mb-2">
                  Tests insulation between conductors and between conductors and earth.
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Test at 500V DC for circuits up to 500V nominal</li>
                  <li>Minimum 1MΩ for most installations</li>
                  <li>Test line to neutral, line to earth, neutral to earth</li>
                  <li>Remove/disconnect sensitive equipment before testing</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">D. Polarity</p>
                <p className="text-sm text-white/80 mb-2">
                  Checking correct connection of line, neutral, and circuit protective conductor.
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Verify line conductor connects to correct terminals</li>
                  <li>Check switches are in line conductor only</li>
                  <li>Confirm correct connections at accessories</li>
                  <li>Essential for safety and correct operation</li>
                </ul>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 3: Live Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Live Testing (After Energisation)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Live testing is performed after the installation has been safely energised and all dead tests
              have been completed satisfactorily.
            </p>

            <div className="space-y-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">A. Earth Fault Loop Impedance (Zs)</p>
                <p className="text-sm text-white/80 mb-2">
                  Confirms effectiveness of protective devices under earth fault conditions.
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Measured from line conductor to earth at each point</li>
                  <li>Must be low enough to ensure automatic disconnection</li>
                  <li>Compare results with maximum values in BS 7671</li>
                  <li>Critical for safety in fault conditions</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">B. RCD Testing</p>
                <p className="text-sm text-white/80 mb-2">
                  Tests residual current devices for correct operation and trip times.
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Test at half rated current (should not trip)</li>
                  <li>Test at rated current (should trip within time limits)</li>
                  <li>Test at 5 times rated current for instantaneous trip</li>
                  <li>Verify correct operation of test button</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">C. Prospective Fault Current (PFC/PSC)</p>
                <p className="text-sm text-white/80 mb-2">
                  Measures maximum fault currents to ensure protective devices can safely interrupt.
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Measured at origin of installation</li>
                  <li>Both prospective short circuit and earth fault current</li>
                  <li>Must not exceed breaking capacity of protective devices</li>
                  <li>Essential for confirming protective device ratings</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">D. Functional Testing</p>
                <p className="text-sm text-white/80 mb-2">
                  Ensures all switches, controls, and protective devices operate correctly.
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Test all switching devices and controls</li>
                  <li>Verify correct sequence of operation</li>
                  <li>Check interlocks and safety systems</li>
                  <li>Confirm proper labelling and identification</li>
                </ul>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 4: Recording Results */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Order and Recording of Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The order prevents unsafe energisation and ensures accuracy of results. Proper documentation
              is essential for compliance and future reference.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Sequence Matters</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Dead tests first ensure installation is safe to energise</li>
                  <li>Each test builds upon results of previous tests</li>
                  <li>Prevents exposure to hazardous conditions</li>
                  <li>Ensures accurate and meaningful results</li>
                  <li>Compliance with BS 7671 legal requirements</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recording Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Results recorded on relevant certificate (EIC/MEIWC)</li>
                  <li>Results compared against BS 7671 maximum values</li>
                  <li>Clear circuit identification and referencing</li>
                  <li>Signatures and dates from competent persons</li>
                  <li>Copies provided to client and building control</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Assurance</p>
              <ul className="text-sm text-white space-y-1">
                <li>Use calibrated test instruments within certification period</li>
                <li>Cross-check unexpected results with alternative methods</li>
                <li>Ensure environmental conditions don't affect readings</li>
                <li>Document any limitations or departures from standard procedures</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[3]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Practical Guidance Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Testing Protocols</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Conduct thorough risk assessment before starting any work</li>
                <li>Ensure all test equipment is calibrated and within certification</li>
                <li>Verify safe isolation procedures are understood by all team members</li>
                <li>Confirm client understands testing will cause temporary power loss</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Sequence Management</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always follow the dead tests first, live tests second rule</li>
                <li>Use properly calibrated instruments for valid results</li>
                <li>Double-check polarity and insulation resistance before energising</li>
                <li>Keep detailed records during testing, not just final results</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Pitfalls to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping tests:</strong> Never skip tests even under time pressure - safety is paramount</li>
                <li><strong>Parallel paths:</strong> Be aware of parallel paths affecting continuity measurements</li>
                <li><strong>Temperature effects:</strong> Consider temperature effects on resistance measurements</li>
                <li><strong>Voltage drop:</strong> Account for voltage drop in long cable runs</li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Real World Example</h2>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
            <p className="text-sm font-medium text-elec-yellow mb-2">Housing Development Testing Error</p>
            <p className="text-sm text-white mb-3">
              An electrician testing a new housing development with 47 properties skipped the continuity of
              ring final circuits before energising the installation. The testing schedule was tight, and
              pressure was mounting to complete certification for handover.
            </p>
            <p className="text-sm font-medium text-white mb-2">What Went Wrong:</p>
            <ul className="text-sm text-white space-y-1 ml-4 mb-3">
              <li>Ring circuit continuity test omitted due to time pressure</li>
              <li>Installation energised based on other successful dead tests</li>
              <li>Three weeks later, several properties experienced nuisance MCB tripping</li>
            </ul>
            <p className="text-sm font-medium text-white mb-2">Consequences:</p>
            <ul className="text-sm text-white space-y-1 ml-4 mb-3">
              <li>Broken ring circuit in House 23 causing overload on one leg</li>
              <li>32A MCB protecting a cable effectively operating as 20A radial</li>
              <li>Potential fire risk from cable overload</li>
              <li>Complete re-test required - time and cost far exceeded initial testing</li>
            </ul>
            <p className="text-sm text-elec-yellow/80">
              <strong>Lesson:</strong> BS 7671 test sequence exists for good reasons - it cannot be abbreviated.
            </p>
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

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

        {/* Quick Reference Card */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Test Sequence</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Step 1: Safe Isolation</p>
              <ul className="space-y-0.5">
                <li>Lock off supply</li>
                <li>Prove dead with tested GVI</li>
                <li>Confirm isolation secure</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Step 2: Dead Tests</p>
              <ul className="space-y-0.5">
                <li>Continuity (R1+R2)</li>
                <li>Ring circuit continuity</li>
                <li>Insulation resistance</li>
                <li>Polarity</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Step 3: Live Tests</p>
              <ul className="space-y-0.5">
                <li>Earth fault loop (Zs)</li>
                <li>RCD operation</li>
                <li>Prospective fault current</li>
                <li>Functional testing</li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-white/5 my-12" />

        {/* Quiz Section */}
        <section className="mb-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
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
            <Link to="../bs7671-module-6-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../bs7671-module-6-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module6Section3;
