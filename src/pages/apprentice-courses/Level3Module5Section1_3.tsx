import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Sequence of Inspection and Testing (GN3 Guidance) - Level 3 Module 5 Section 1.3";
const DESCRIPTION = "Following the correct sequence for inspection and testing as outlined in Guidance Note 3, including dead tests before live tests.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What must always be completed before any testing begins?",
    options: [
      "Connection to the supply",
      "Visual inspection",
      "RCD testing",
      "Earth fault loop impedance measurement"
    ],
    correctIndex: 1,
    explanation: "Visual inspection must always precede testing. This identifies obvious defects and hazards before instruments are connected, protecting both the tester and equipment from potential damage or injury."
  },
  {
    id: "check-2",
    question: "Why must dead tests be carried out before live tests?",
    options: [
      "To save time",
      "Because the regulations say so",
      "To confirm the circuit is safe before energisation",
      "To satisfy the client"
    ],
    correctIndex: 2,
    explanation: "Dead tests (continuity, insulation resistance) confirm the circuit is safe to energise. If you performed live tests first on a circuit with a fault, you could damage equipment, cause fire, or suffer electric shock."
  },
  {
    id: "check-3",
    question: "What is the correct test voltage for insulation resistance testing on a 230V circuit?",
    options: [
      "250V DC",
      "500V DC",
      "1000V DC",
      "230V AC"
    ],
    correctIndex: 1,
    explanation: "For circuits rated above 50V up to and including 500V (which includes standard 230V circuits), the test voltage is 500V DC. This provides adequate stress to reveal insulation weaknesses without damaging good insulation."
  },
  {
    id: "check-4",
    question: "When should RCD testing be carried out in the sequence?",
    options: [
      "First, before any other tests",
      "After dead tests but before earth fault loop impedance",
      "After earth fault loop impedance testing",
      "At any point in the sequence"
    ],
    correctIndex: 2,
    explanation: "RCD testing is carried out after earth fault loop impedance testing. The sequence is: dead tests first (continuity, insulation resistance, polarity), then live tests (Zs, then RCD). This ensures the circuit is safe before applying test currents."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to GN3, what is the first test in the recommended sequence?",
    options: [
      "Earth fault loop impedance",
      "Continuity of protective conductors",
      "RCD operation",
      "Insulation resistance"
    ],
    correctAnswer: 1,
    explanation: "Continuity of protective conductors is the first test in the sequence. This confirms that the earth path is continuous before any other tests are performed, which is fundamental to electrical safety."
  },
  {
    id: 2,
    question: "At what point in the sequence is polarity verified?",
    options: [
      "Before continuity testing",
      "After insulation resistance testing",
      "After earth fault loop impedance",
      "Last, after RCD testing"
    ],
    correctAnswer: 1,
    explanation: "Polarity is verified after insulation resistance testing. While some polarity verification occurs during continuity testing using the R1+R2 method, formal polarity confirmation comes after insulation resistance testing in the dead test sequence."
  },
  {
    id: 3,
    question: "Why is the test sequence important for safety?",
    options: [
      "It makes paperwork easier",
      "It ensures faults are detected before energisation",
      "It speeds up the testing process",
      "It reduces the number of tests needed"
    ],
    correctAnswer: 1,
    explanation: "The sequence ensures that potentially dangerous faults are detected before the circuit is energised. Performing dead tests first means any faults are discovered when the circuit is safe, not when live test current is flowing."
  },
  {
    id: 4,
    question: "What should be done if insulation resistance is below the minimum acceptable value?",
    options: [
      "Proceed with live tests anyway",
      "Record the value and issue a certificate",
      "Investigate and rectify before continuing",
      "Reduce the test voltage and retest"
    ],
    correctAnswer: 2,
    explanation: "If insulation resistance is below the minimum (1 megohm for a 500V test), you must not energise the circuit. The fault must be investigated and rectified before live tests can proceed. Energising a circuit with poor insulation risks fire and electric shock."
  },
  {
    id: 5,
    question: "During initial verification, what minimum insulation resistance is acceptable for circuits tested at 500V DC?",
    options: [
      "0.5 megohms",
      "1 megohm",
      "2 megohms",
      "10 megohms"
    ],
    correctAnswer: 1,
    explanation: "The minimum acceptable insulation resistance for circuits tested at 500V DC is 1 megohm (1 M ohm). While higher values are desirable and common in new installations, 1 M ohm is the minimum threshold below which investigation is required."
  },
  {
    id: 6,
    question: "What is the purpose of the ring circuit continuity test?",
    options: [
      "To measure earth fault loop impedance",
      "To verify the ring is complete and correctly connected",
      "To test RCD operation",
      "To measure prospective fault current"
    ],
    correctAnswer: 1,
    explanation: "Ring circuit continuity testing verifies that the ring is complete with no breaks or cross-connections. It confirms both ends of each conductor (line, neutral, and cpc) are correctly connected at the consumer unit and that the ring has not been interconnected."
  },
  {
    id: 7,
    question: "When testing ring circuit continuity, what indicates a correctly wired ring?",
    options: [
      "Zero reading on all tests",
      "Cross-connected readings at mid-point approximately equal to end-to-end divided by 4",
      "High resistance readings throughout",
      "Identical readings at all socket outlets"
    ],
    correctAnswer: 1,
    explanation: "A correctly wired ring shows end-to-end readings for each conductor, and when cross-connected, readings at each socket should be approximately one quarter of the end-to-end value. The mid-point socket should show the highest R1+R2 value."
  },
  {
    id: 8,
    question: "What test instrument setting is used for continuity testing?",
    options: [
      "500V insulation test",
      "Low resistance ohmmeter",
      "Earth fault loop tester",
      "RCD tester"
    ],
    correctAnswer: 1,
    explanation: "Continuity testing uses a low resistance ohmmeter, typically providing a test current of at least 200mA. This function measures resistance in ohms and is used for protective conductor continuity and ring circuit testing."
  },
  {
    id: 9,
    question: "Why must voltage-sensitive equipment be disconnected before insulation resistance testing?",
    options: [
      "To improve accuracy",
      "To prevent damage from the 500V test voltage",
      "To speed up testing",
      "To comply with client requests"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance testing applies 500V DC (or higher for some circuits). Electronic equipment, RCDs, surge protective devices, and dimmer switches can be damaged by this voltage and must be disconnected before testing."
  },
  {
    id: 10,
    question: "What documentation should be completed as testing proceeds?",
    options: [
      "Only the certificate at the end",
      "Test results as each test is completed",
      "A summary after all work is finished",
      "Only failed test results"
    ],
    correctAnswer: 1,
    explanation: "Test results should be recorded as each test is completed. This ensures accuracy, provides evidence of the sequence followed, and prevents values being forgotten or transposed. The schedule of test results is completed progressively during testing."
  }
];

const faqs = [
  {
    question: "Can I change the test sequence if it suits my workflow better?",
    answer: "No. The sequence specified in BS 7671 and GN3 must be followed. Dead tests must precede live tests for safety reasons. Changing the sequence could result in testing a faulty circuit while energised, creating danger for you and others."
  },
  {
    question: "What is the difference between GN3 and BS 7671 Part 6?",
    answer: "BS 7671 Part 6 specifies the requirements - what must be done. Guidance Note 3 (GN3) provides practical guidance on how to do it, including detailed test procedures, instrument settings, and worked examples. Both should be used together."
  },
  {
    question: "How do I handle circuits where I cannot disconnect loads for testing?",
    answer: "Some situations require modified procedures. For example, emergency lighting circuits may need testing during quiet periods. Socket circuits can often be tested with loads removed. Document any limitations and ensure safety is not compromised."
  },
  {
    question: "What should I do if I find a fault during testing?",
    answer: "Stop and investigate immediately. Do not continue to the next test until the fault is understood and rectified. A fault found during dead testing prevents you from safely proceeding to live tests. Record all findings and rectification actions."
  },
  {
    question: "Is there a different sequence for periodic inspection compared to initial verification?",
    answer: "The test sequence is essentially the same - visual inspection, then dead tests, then live tests. However, periodic inspection may include assessment of existing conditions that would not apply to new work, and sampling may be appropriate in some circumstances."
  }
];

const Level3Module5Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Sequence of Inspection and Testing
          </h1>
          <p className="text-white/80">
            Following the correct sequence as outlined in Guidance Note 3
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>First:</strong> Visual inspection (always before testing)</li>
              <li><strong>Dead tests:</strong> Continuity, insulation resistance, polarity</li>
              <li><strong>Live tests:</strong> Zs, PFC, RCD testing</li>
              <li><strong>Why:</strong> Ensures safety before energisation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Complete dead tests before energising</li>
              <li><strong>Use:</strong> GN3 sequence for all testing work</li>
              <li><strong>Apply:</strong> Record results progressively</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "The correct sequence for inspection and testing",
              "Why dead tests must precede live tests",
              "Individual test purposes and requirements",
              "How to handle faults found during testing",
              "Recording results as testing proceeds",
              "GN3 practical guidance application"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Complete Test Sequence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The test sequence is not arbitrary - it is designed to protect you, the installation, and anyone who might be affected by the work. Each test builds on the previous one, progressively confirming that the installation is safe before moving to the next stage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The complete sequence is:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Visual Inspection</strong> - Before any testing begins</li>
                <li><strong>2. Continuity of protective conductors</strong> - Including main and supplementary bonding</li>
                <li><strong>3. Continuity of ring final circuit conductors</strong> - For ring circuits</li>
                <li><strong>4. Insulation resistance</strong> - Between live conductors and earth</li>
                <li><strong>5. Polarity</strong> - Verification of correct connections</li>
                <li><strong>6. Earth fault loop impedance (Zs)</strong> - Live test</li>
                <li><strong>7. Prospective fault current (PFC)</strong> - Usually measured with Zs</li>
                <li><strong>8. RCD operation</strong> - Trip times and trip current</li>
                <li><strong>9. Functional testing</strong> - Switches, controls, interlocks</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Tests 1-5 are carried out with the installation dead (isolated from supply). Tests 6-9 require the circuit to be energised. Never perform live tests until all dead tests have passed.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Dead Tests Explained
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Dead tests are performed with the circuit isolated from the supply. They are inherently safer because there is no live voltage present. These tests confirm fundamental safety requirements before any power is applied.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Continuity Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Uses low resistance ohmmeter</li>
                  <li>Test current at least 200mA</li>
                  <li>Verifies earth path is complete</li>
                  <li>R1+R2 values for Zs calculation</li>
                  <li>Ring circuit integrity verification</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Insulation Resistance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>500V DC test for 230V circuits</li>
                  <li>Minimum 1 megohm acceptable</li>
                  <li>Tests L-E, N-E, L-N</li>
                  <li>Disconnect sensitive equipment</li>
                  <li>Reveals insulation breakdown</li>
                </ul>
              </div>
            </div>

            <p>
              Polarity testing confirms that line and neutral are correctly connected throughout - that switches break the line conductor, that socket outlets are correctly wired, and that centre contacts of Edison screw lampholders are connected to line. This can be done using continuity testing or dedicated polarity checks.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> When testing a ring circuit, you first verify end-to-end continuity of L, N, and cpc. Then cross-connect L-N at the consumer unit and verify readings at each socket. The highest reading should be at the mid-point of the ring. This confirms the ring is complete with no breaks or interconnections.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Live Tests Explained
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Live tests require the circuit to be energised. They can only proceed once all dead tests have confirmed the circuit is safe to energise. These tests verify the protective devices will operate correctly under fault conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Earth Fault Loop Impedance (Zs):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Measures total impedance of the earth fault loop</li>
                <li>Comprises Ze (external) + R1+R2 (circuit)</li>
                <li>Must be low enough to operate protective device in required time</li>
                <li>Compared against maximum values in BS 7671 tables</li>
                <li>Temperature correction may be required (0.8 multiplier for comparison)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">RCD Testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Tests at rated residual current (e.g., 30mA)</li>
                <li>Must trip within 300ms at rated current</li>
                <li>Must trip within 40ms at 5x rated current (for additional protection)</li>
                <li>50% rated current test should NOT trip the device</li>
                <li>Test button operation must also be verified</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Live testing creates risk. Ensure the area is clear, that you are using GS38 compliant test leads, and that you understand what the test instrument will do when connected. Never test alone in hazardous environments.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Handling Failures and Recording Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When a test fails, you must stop and investigate. Do not simply re-test hoping for a better result, and never proceed to the next test until the current test passes. A failed test means there is a problem that must be understood and fixed.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Failed Continuity</p>
                <p className="text-white/90 text-xs">Check connections, look for breaks or loose terminations</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Failed IR</p>
                <p className="text-white/90 text-xs">Do not energise - investigate insulation fault</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">High Zs</p>
                <p className="text-white/90 text-xs">Check connections, conductor sizes, circuit length</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Recording results as you go:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Write down each reading immediately after the test</li>
                <li>Include circuit identification and test point location</li>
                <li>Note any anomalies or concerns even if the test passes</li>
                <li>Record instrument serial number for traceability</li>
                <li>Keep working notes even if transferring to final schedule later</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> You test insulation resistance on a lighting circuit and get 0.8 megohms - below the 1 megohm minimum. You must not energise this circuit. Investigation reveals a damaged cable where it passes through a metal stud. After repair and re-test showing 150 megohms, you can proceed to polarity testing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Starting Testing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete all visual inspection first - never test before inspecting</li>
                <li>Ensure safe isolation is in place and proven for dead tests</li>
                <li>Check instrument calibration is current and leads are GS38 compliant</li>
                <li>Have test schedules ready to record results immediately</li>
                <li>Disconnect voltage-sensitive equipment before insulation testing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Testing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Follow the sequence without exception</li>
                <li>Record each result before moving to the next test</li>
                <li>Stop and investigate any unexpected readings</li>
                <li>Re-verify safe isolation before each dead test</li>
                <li>Warn others before energising for live tests</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping visual inspection</strong> - Always inspect before testing</li>
                <li><strong>Testing out of sequence</strong> - Dead tests must precede live tests</li>
                <li><strong>Ignoring marginal results</strong> - Investigate anything close to limits</li>
                <li><strong>Not recording immediately</strong> - Write results down as you test</li>
              </ul>
            </div>
          </div>
        </section>

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

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Dead Tests (Isolated)</p>
                <ul className="space-y-0.5">
                  <li>1. Continuity of protective conductors</li>
                  <li>2. Ring circuit continuity</li>
                  <li>3. Insulation resistance (500V DC)</li>
                  <li>4. Polarity verification</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Live Tests (Energised)</p>
                <ul className="space-y-0.5">
                  <li>5. Earth fault loop impedance (Zs)</li>
                  <li>6. Prospective fault current (PFC)</li>
                  <li>7. RCD operation and timing</li>
                  <li>8. Functional testing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section1-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: BS 7671 Part 6
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section1-4">
              Next: Safety Precautions
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module5Section1_3;
