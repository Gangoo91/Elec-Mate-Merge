import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Schedule of Test Results - Module 8 Section 3";
const DESCRIPTION = "Learn to correctly complete the Schedule of Test Results, recording all electrical measurements from initial verification and periodic inspection.";

const quickCheckQuestions = [
  {
    id: "test-results-purpose",
    question: "What is the primary purpose of the Schedule of Test Results?",
    options: [
      "To list circuit descriptions only",
      "To record all measured electrical values from testing",
      "To show the installation cost",
      "To list equipment manufacturers"
    ],
    correctIndex: 1,
    explanation: "The Schedule of Test Results provides a permanent record of all electrical test values, enabling comparison with requirements and future inspections."
  },
  {
    id: "continuity-values",
    question: "For each circuit, what continuity values should be recorded?",
    options: [
      "Only R2",
      "R1+R2 (or R2 where applicable)",
      "Only the longest cable length",
      "No continuity values needed"
    ],
    correctIndex: 1,
    explanation: "R1+R2 should be recorded for each circuit as this value is used to calculate maximum Zs. Where R2 is measured separately for main bonding, this should also be recorded."
  },
  {
    id: "insulation-recording",
    question: "What insulation resistance value should be recorded for a circuit tested at 500V?",
    options: [
      "The applied voltage (500V)",
      "The measured resistance in megohms (MΩ)",
      "Just 'Pass' or 'Fail'",
      "The time taken to test"
    ],
    correctIndex: 1,
    explanation: "The actual measured insulation resistance in megohms should be recorded. If the reading exceeds the meter range (e.g., >200MΩ), record '>200MΩ' or similar."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of the Schedule of Test Results?",
    options: [
      "To list circuit descriptions only",
      "To record all measured electrical values from testing",
      "To show the installation cost",
      "To list equipment manufacturers"
    ],
    correctAnswer: 1,
    explanation: "The Schedule of Test Results provides a permanent record of all electrical test values, enabling comparison with requirements and future inspections."
  },
  {
    id: 2,
    question: "For each circuit, what continuity values should be recorded?",
    options: [
      "Only R2",
      "R1+R2 (or R2 where applicable)",
      "Only the longest cable length",
      "No continuity values needed"
    ],
    correctAnswer: 1,
    explanation: "R1+R2 should be recorded for each circuit as this value is used to calculate maximum Zs. Where R2 is measured separately for main bonding, this should also be recorded."
  },
  {
    id: 3,
    question: "What insulation resistance value should be recorded for a circuit tested at 500V?",
    options: [
      "The applied voltage (500V)",
      "The measured resistance in megohms (MΩ)",
      "Just 'Pass' or 'Fail'",
      "The time taken to test"
    ],
    correctAnswer: 1,
    explanation: "The actual measured insulation resistance in megohms should be recorded. If the reading exceeds the meter range (e.g., >200MΩ), record '>200MΩ' or similar."
  },
  {
    id: 4,
    question: "When recording RCD test results, which values should be shown?",
    options: [
      "Only whether it tripped",
      "Trip time at x1 IΔn and x5 IΔn, plus test at 1/2 IΔn",
      "Only the manufacturer's specification",
      "The RCD serial number only"
    ],
    correctAnswer: 1,
    explanation: "Record trip times at x1 IΔn (max 300ms) and x5 IΔn (max 40ms), plus confirmation of no trip at 1/2 IΔn. Both positive and negative half-cycle tests where applicable."
  },
  {
    id: 5,
    question: "How should earth fault loop impedance (Zs) be recorded?",
    options: [
      "In kilohms",
      "In ohms, with enough decimal places to show compliance",
      "Rounded to whole numbers only",
      "Just compared to maximum allowed"
    ],
    correctAnswer: 1,
    explanation: "Zs should be recorded in ohms to sufficient precision (typically 2 decimal places) to demonstrate compliance with maximum values in BS 7671 tables."
  },
  {
    id: 6,
    question: "What does 'n/a' or 'N/A' mean in a test results column?",
    options: [
      "Not allowed",
      "Not applicable - that test is not required for this circuit",
      "Not attempted - come back later",
      "Needs attention"
    ],
    correctAnswer: 1,
    explanation: "N/A indicates the test is not applicable to that circuit. For example, RCD tests don't apply to circuits not protected by an RCD."
  },
  {
    id: 7,
    question: "Circuit reference numbers on the Schedule should match:",
    options: [
      "A random numbering system",
      "The circuit chart at the distribution board",
      "Alphabetical order of rooms",
      "Installation date order"
    ],
    correctAnswer: 1,
    explanation: "Circuit references must match those on the distribution board circuit chart/schedule. This enables cross-referencing and identification for future work."
  },
  {
    id: 8,
    question: "If polarity is correct at all points tested, how is this recorded?",
    options: [
      "Write the word 'correct'",
      "A tick in the polarity column",
      "Leave blank",
      "Write the phase colour"
    ],
    correctAnswer: 1,
    explanation: "A tick indicates correct polarity was verified. Incorrect polarity requires detailed explanation in observations and appropriate coding."
  },
  {
    id: 9,
    question: "The maximum Zs column shows the limiting value for the circuit. Where does this come from?",
    options: [
      "Client's specification",
      "BS 7671 tables based on protective device type and rating",
      "Estimated by the tester",
      "Previous test results"
    ],
    correctAnswer: 1,
    explanation: "Maximum Zs values are taken from BS 7671 Chapter 41 tables, based on the protective device type (MCB curve B/C/D, fuse type) and rating."
  },
  {
    id: 10,
    question: "What should be done if a measured value doesn't meet requirements?",
    options: [
      "Leave that column blank",
      "Record the value, add to observations, and code appropriately",
      "Change the value to make it pass",
      "Only note it verbally to the client"
    ],
    correctAnswer: 1,
    explanation: "Record the actual measured value, add details to the observations section, and assign an appropriate defect code (C1, C2, or C3). Never falsify results."
  }
];

const faqs = [
  {
    question: "Why do I need to record actual values rather than just pass/fail?",
    answer: "Actual values provide baseline data for future inspections, demonstrate compliance margins, and help diagnose problems. A value just within limits now might fail next time - trending data helps predict issues."
  },
  {
    question: "Should I test and record every circuit individually?",
    answer: "Yes. Each circuit should be tested and recorded separately. This identifies which specific circuits have issues and provides comprehensive data for future reference. Group testing doesn't provide adequate information."
  },
  {
    question: "What if my meter shows '>200MΩ' for insulation resistance?",
    answer: "Record '>200MΩ' (or your meter's maximum displayed value). This indicates excellent insulation well above the minimum requirement of 1.0MΩ. The exact value above the display limit isn't significant."
  },
  {
    question: "How do I record ring final circuit continuity?",
    answer: "Record r1, rn, and r2 values from the three-step test. Also record the R1+R2 value at the furthest point. Some schedules have specific columns for ring circuits; otherwise use the remarks column."
  },
  {
    question: "Do I need to record Ze separately from Zs?",
    answer: "Ze (external earth fault loop impedance) should be measured and recorded, typically on the main form or the first page of results. Zs values for individual circuits build on this Ze value."
  },
  {
    question: "What units should be used throughout?",
    answer: "Use standard units: ohms for impedance and resistance, megohms (MΩ) for insulation resistance, milliseconds (ms) for RCD trip times, milliamps (mA) for RCD ratings, amps (A) for device ratings."
  }
];

const InspectionTestingModule8Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../module-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 8
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
            <span>Module 8 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Schedule of Test Results
          </h1>
          <p className="text-white/80">
            Record all measured electrical values accurately to demonstrate compliance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Record:</strong> Actual measured values, not just pass/fail</li>
              <li><strong>Test:</strong> Every circuit tested separately</li>
              <li><strong>Units:</strong> Ohms, MΩ, ms, mA, A</li>
              <li><strong>Match:</strong> Circuit references to distribution board</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Columns</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Continuity:</strong> R1+R2 in ohms</li>
              <li><strong>Insulation:</strong> MΩ (min 1.0MΩ)</li>
              <li><strong>Zs:</strong> Ohms (compare to max)</li>
              <li><strong>RCD:</strong> Trip times in ms</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the purpose of the Schedule of Test Results",
              "Complete all columns correctly",
              "Record measured values in appropriate units",
              "Cross-reference with circuit schedules",
              "Identify when values indicate defects",
              "Verify completeness before signing"
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

        {/* Section 1: Purpose of the Schedule */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Purpose of the Schedule
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Schedule of Test Results is a vital document that records all electrical measurements from testing. It serves multiple purposes:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Functions</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Demonstrates compliance with BS 7671 requirements</li>
                <li>Provides baseline data for future periodic inspections</li>
                <li>Aids fault diagnosis by showing normal values</li>
                <li>Forms part of the electrical installation certificate</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The schedule must accompany every EIC and EICR - it's not optional documentation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Key Columns Explained */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Key Columns Explained
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding each column ensures complete and accurate recording:
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Circuit Details</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Circuit number/reference</li>
                  <li>Circuit description</li>
                  <li>Protective device type and rating</li>
                  <li>Cable size (mm2)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Results</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Continuity: R1+R2 (Ohms)</li>
                  <li>Insulation resistance (MΩ)</li>
                  <li>Polarity (tick or defect code)</li>
                  <li>Earth fault loop impedance: Zs (Ohms)</li>
                  <li>RCD operating times (ms)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reference Values</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Maximum Zs from BS 7671 tables</li>
                  <li>RCD rating (IΔn in mA)</li>
                  <li>Maximum operating times required</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Recording Continuity Results */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Recording Continuity Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Continuity test results confirm protective conductor integrity and enable Zs calculation:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What to Record</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>R1+R2:</strong> Value in ohms (e.g., 0.45 Ohms)</li>
                <li><strong>R2 (bonding):</strong> Value in ohms (e.g., 0.12 Ohms)</li>
                <li><strong>Ring circuit:</strong> r1, rn, r2 values</li>
              </ul>
            </div>

            <p className="text-sm text-amber-400/80">
              <strong>Important:</strong> Remember to subtract test lead resistance from readings, or null leads before testing.
            </p>
          </div>
        </section>

        {/* Section 4: Recording Insulation Resistance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Recording Insulation Resistance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulation resistance values demonstrate conductor insulation integrity:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recording Format</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Minimum acceptable:</strong> 1.0 MΩ</li>
                <li><strong>Typical new installation:</strong> &gt;200 MΩ</li>
                <li><strong>Test voltage (SELV/LV):</strong> 250V / 500V</li>
              </ul>
            </div>

            <p>
              If your meter shows &gt;200MΩ or similar, record this. For values near the limit (1-2 MΩ), record the exact value as this may warrant investigation or observation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Recording RCD Test Results */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Recording RCD Test Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              RCD test results require multiple values to be recorded:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Test Values</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>x1 IΔn trip time:</strong> Value in ms (max 300ms)</li>
                <li><strong>x5 IΔn trip time:</strong> Value in ms (max 40ms)</li>
                <li><strong>1/2 IΔn:</strong> &gt;200ms or 'NT' (no trip)</li>
                <li><strong>Test button:</strong> Tick (operates)</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Some schedules require positive (+) and negative (-) half-cycle tests. Record both values where applicable.
            </p>
          </div>
        </section>

        {/* Section 6: Completeness Checks */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Completeness Checks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before signing off, verify the schedule is complete:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Final Checklist</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>All circuits tested and recorded</li>
                <li>No blank columns (use N/A where appropriate)</li>
                <li>Circuit references match distribution board</li>
                <li>Values within acceptable limits or coded</li>
                <li>Defects cross-referenced to observations</li>
                <li>Page numbers and signature on each page</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Incomplete schedules are unprofessional and may not be accepted by building control or scheme providers.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Good Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record values immediately as you test - don't rely on memory</li>
                <li>Many test instruments download results directly - cleaner and faster</li>
                <li>Double-check circuit references match the board</li>
                <li>Review the schedule before leaving site</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Recording Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use consistent units throughout</li>
                <li>Record the maximum Zs value alongside measured value</li>
                <li>Note any unusual readings for investigation</li>
                <li>Use N/A for non-applicable tests, not blank spaces</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Never falsify results</strong> — inaccurate records are professional misconduct and dangerous</li>
                <li><strong>Don't leave blanks</strong> — use N/A where tests don't apply</li>
                <li><strong>Don't round excessively</strong> — precision demonstrates compliance</li>
                <li><strong>Don't forget test lead resistance</strong> — affects continuity readings</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Test Results Units Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Resistance/Impedance</p>
                <ul className="space-y-0.5">
                  <li>Continuity (R1+R2) = Ohms</li>
                  <li>Loop impedance (Ze, Zs) = Ohms</li>
                  <li>Insulation = MΩ (megohms)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">RCD/Current</p>
                <ul className="space-y-0.5">
                  <li>RCD trip time = ms</li>
                  <li>RCD rating = mA</li>
                  <li>Device rating = A</li>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-8/section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-8/section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule8Section3;
