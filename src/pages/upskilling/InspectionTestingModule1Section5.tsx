import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Test Sequence and Documentation - Inspection & Testing";
const DESCRIPTION = "Learn the correct sequence for electrical tests and how to properly document results including schedules of test results and certification requirements.";

const quickCheckQuestions = [
  {
    id: "dead-tests-first",
    question: "What type of tests should always be completed before live tests?",
    options: ["RCD tests", "Loop impedance tests", "Dead tests (continuity, insulation)", "Functional tests"],
    correctIndex: 2,
    explanation: "Dead tests (continuity and insulation resistance) must be completed before live tests to ensure the installation is safe before energising."
  },
  {
    id: "visual-inspection",
    question: "Why must visual inspection be done before testing?",
    options: ["It's quicker to do first", "To identify obvious faults that could make testing dangerous", "Testing equipment requires it", "It's optional"],
    correctIndex: 1,
    explanation: "Visual inspection identifies obvious defects, damage, or dangerous conditions that could make testing hazardous. It must be done before energising for testing."
  },
  {
    id: "eicr-use",
    question: "What certificate is used for periodic inspection of existing installations?",
    options: ["Electrical Installation Certificate", "Minor Works Certificate", "Electrical Installation Condition Report", "Test Results Schedule"],
    correctIndex: 2,
    explanation: "An EICR (Electrical Installation Condition Report) is used for periodic inspection of existing installations to report on their condition."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The correct sequence for electrical testing is:",
    options: ["Live tests, dead tests, visual inspection", "Dead tests, visual inspection, live tests", "Visual inspection, dead tests, live tests", "Any order is acceptable"],
    correctAnswer: 2,
    explanation: "Visual inspection must be done first (with supply off), then dead tests, then live tests. This ensures safety at each stage."
  },
  {
    id: 2,
    question: "Continuity testing should be performed:",
    options: ["With the supply connected", "Before insulation resistance testing", "After RCD testing", "Only on new installations"],
    correctAnswer: 1,
    explanation: "Continuity testing is a dead test performed before insulation resistance testing, with the supply isolated."
  },
  {
    id: 3,
    question: "Why is test sequence important for safety?",
    options: ["It makes paperwork easier", "It ensures faults are found before the circuit is energised", "Test equipment requires it", "It's just a recommendation"],
    correctAnswer: 1,
    explanation: "Following the correct sequence means potential faults are identified by dead tests before the circuit is energised for live tests."
  },
  {
    id: 4,
    question: "A Schedule of Test Results records:",
    options: ["Only failed test results", "Only passed test results", "All measured values and test outcomes", "Estimated values"],
    correctAnswer: 2,
    explanation: "The Schedule of Test Results records all measured values from tests, providing a record of the installation's condition at the time of testing."
  },
  {
    id: 5,
    question: "The Schedule of Inspections records:",
    options: ["Only test results", "Items checked during visual inspection", "Equipment serial numbers", "Client contact details"],
    correctAnswer: 1,
    explanation: "The Schedule of Inspections records the items checked during visual inspection and their condition/compliance."
  },
  {
    id: 6,
    question: "Which document confirms a new installation complies with BS 7671?",
    options: ["EICR", "Electrical Installation Certificate (EIC)", "Building Control Certificate", "Test Equipment Certificate"],
    correctAnswer: 1,
    explanation: "An Electrical Installation Certificate (EIC) confirms that a new installation meets the requirements of BS 7671."
  },
  {
    id: 7,
    question: "A Minor Works Certificate is appropriate when:",
    options: ["Installing a new consumer unit", "Adding a socket to an existing circuit", "Installing a new circuit", "Periodic inspection"],
    correctAnswer: 1,
    explanation: "Minor Works Certificates are for minor additions/alterations that don't involve a new circuit, such as adding a socket to an existing circuit."
  },
  {
    id: 8,
    question: "Test results should be recorded:",
    options: ["From memory at the end of the day", "At the time of testing", "Only if they fail", "Only for new installations"],
    correctAnswer: 1,
    explanation: "Test results must be recorded at the time of testing to ensure accuracy and prevent errors from relying on memory."
  },
  {
    id: 9,
    question: "What should be done with photographs taken during inspection?",
    options: ["Delete after the job", "Keep as part of the documentation", "Only take if defects are found", "Post on social media"],
    correctAnswer: 1,
    explanation: "Photographs provide valuable evidence and should be kept as part of the inspection documentation, especially for defects and observations."
  },
  {
    id: 10,
    question: "How long should electrical certificates and test results be retained?",
    options: ["1 year", "Until next inspection", "At least until the next inspection interval", "Forever"],
    correctAnswer: 2,
    explanation: "Records should be retained at least until the next inspection (and longer is better). They provide evidence of the installation's history and condition."
  }
];

const faqs = [
  {
    question: "Can I do tests in a different order if I'm pressed for time?",
    answer: "No - the test sequence is determined by safety requirements, not convenience. Dead tests must be completed before live tests to identify faults before energising. Visual inspection must be done first. Shortcuts can put you at risk."
  },
  {
    question: "What if some tests can't be completed?",
    answer: "Document which tests couldn't be completed and why. Note any limitations in the certificate. The client should be informed of any areas that couldn't be tested. Some tests may need to be completed later when access is available."
  },
  {
    question: "Do I need to record test results for circuits that pass?",
    answer: "Yes - all test results must be recorded, not just failures. The schedule provides a baseline for future inspections and demonstrates that proper testing was carried out. It also shows the margin from limits."
  },
  {
    question: "Can test results be recorded electronically?",
    answer: "Yes - electronic recording is acceptable and has advantages (automatic calculations, neater records, backup capability). The format should match model forms. Many testers can download results directly."
  },
  {
    question: "Who keeps the original certificates?",
    answer: "The original certificate should be given to the person ordering the work (usually the client/property owner). The contractor should retain a copy. For competent person scheme work, the scheme operator also receives copies."
  },
  {
    question: "What's the difference between observations and defects?",
    answer: "On an EICR, observations describe departures from current standards or items that may need attention. Defects (coded C1, C2, or C3) indicate items that don't meet safety requirements. All observations and defects should be clearly described."
  }
];

const referenceItems = [
  { label: "Step 1", value: "Visual Inspection" },
  { label: "Step 2", value: "Continuity (R1+R2)" },
  { label: "Step 3", value: "Ring Continuity" },
  { label: "Step 4", value: "Insulation Resistance" },
  { label: "Step 5", value: "Polarity" },
  { label: "Step 6", value: "Earth Electrode (if TT)" },
  { label: "Step 7", value: "Loop Impedance (Ze, Zs)" },
  { label: "Step 8", value: "Prospective Fault Current" },
  { label: "Step 9", value: "RCD Operation" },
  { label: "Step 10", value: "Functional Testing" },
];

const InspectionTestingModule1Section5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-1">
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
            <span>Module 1 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Test Sequence and Documentation
          </h1>
          <p className="text-white/80">
            Understanding the correct order of tests and how to properly record and certify your findings
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Sequence:</strong> Visual inspection, dead tests, live tests</li>
              <li><strong>Record:</strong> All values at time of testing</li>
              <li><strong>Safety:</strong> Order prevents dangerous energisation</li>
              <li><strong>Documents:</strong> EIC, EICR, or Minor Works</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Documents</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>EIC:</strong> New installations</li>
              <li><strong>EICR:</strong> Periodic inspection</li>
              <li><strong>Minor Works:</strong> Small additions</li>
              <li><strong>Schedule:</strong> All test results</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the correct test sequence",
              "Explain why sequence matters for safety",
              "Document test results correctly",
              "Complete schedule of test results",
              "Record observations during inspection",
              "Use appropriate certification forms"
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

        {/* Section 01: The Test Sequence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Test Sequence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The test sequence specified in BS 7671 and GN3 is designed for <strong>safety</strong>. Each stage confirms the installation is safe before proceeding to tests that require energisation.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 my-6">
              <p className="text-white font-semibold mb-2">Why Sequence Matters</p>
              <p className="text-sm text-white/80">
                Dead tests identify faults like short circuits and insulation failures that could cause danger when the supply is connected. If you skip to live tests without completing dead tests, unidentified faults could cause shock or fire.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Three Stages</p>
              <div className="space-y-3">
                <div>
                  <p className="text-blue-400 font-semibold text-sm">Stage 1: Visual Inspection</p>
                  <p className="text-sm text-white/70">Supply OFF. Check for obvious defects, damage, non-compliance, and anything that would make testing dangerous.</p>
                </div>
                <div>
                  <p className="text-orange-400 font-semibold text-sm">Stage 2: Dead Tests</p>
                  <p className="text-sm text-white/70">Supply ISOLATED. Continuity of protective conductors, ring final circuits, insulation resistance, polarity.</p>
                </div>
                <div>
                  <p className="text-green-400 font-semibold text-sm">Stage 3: Live Tests</p>
                  <p className="text-sm text-white/70">Supply CONNECTED. Earth fault loop impedance, prospective fault current, RCD operation, functional testing.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Visual Inspection Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Visual Inspection Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Visual inspection is a thorough examination of the installation without using test instruments. It should identify non-compliance, damage, and potential hazards.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Items to Check (Regulation 641)</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Correct selection and erection of equipment for the environment</li>
                <li>Presence of fire barriers and seals</li>
                <li>Conductors correctly identified (colours)</li>
                <li>Connections secure and correctly made</li>
                <li>Presence of protective devices and correct rating</li>
                <li>Presence of appropriate circuit identification and warning notices</li>
                <li>Accessibility of equipment for operation and maintenance</li>
                <li>Condition of insulation, enclosures and mechanical protection</li>
              </ul>
            </div>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Schedule of Inspections</p>
                <p className="text-sm text-white/70">Records all items checked and their compliance status</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Photographs</p>
                <p className="text-sm text-white/70">Visual evidence of defects, hazards, and notable observations</p>
              </div>
            </div>

            <p className="text-sm text-orange-400/90">
              <strong>Important:</strong> Visual inspection must be done <strong>before energising</strong> for testing. Defects found may need to be addressed before testing can proceed safely.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Dead Testing Sequence */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Dead Testing Sequence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Dead tests are performed with the installation isolated from the supply. They verify the integrity of conductors and insulation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dead Tests in Sequence</p>
              <ol className="text-sm text-white space-y-2 ml-4">
                <li><span className="text-elec-yellow">1.</span> <strong>Continuity of Protective Conductors</strong> - Test R1+R2 or R2 values. Confirms protective conductors provide a path for fault current.</li>
                <li><span className="text-elec-yellow">2.</span> <strong>Continuity of Ring Final Circuits</strong> - Verify ring is complete, no interconnections or broken rings.</li>
                <li><span className="text-elec-yellow">3.</span> <strong>Insulation Resistance</strong> - Test between conductors and to earth at 500V DC. Minimum 1MΩ (typical values much higher).</li>
                <li><span className="text-elec-yellow">4.</span> <strong>Polarity</strong> - Verify phase and neutral are correctly connected at all points. Can be done dead or live.</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why This Order?</p>
              <p className="text-sm text-white/80">
                Continuity is tested first because insulation resistance testing at 500V could damage certain equipment. The continuity test at low voltage confirms the installation is safe for IR testing.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Live Testing Sequence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Live Testing Sequence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Live tests can only proceed after dead tests have confirmed the installation is safe. The supply must be connected for these tests.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Live Tests in Sequence</p>
              <ol className="text-sm text-white space-y-2 ml-4">
                <li><span className="text-green-400">5.</span> <strong>Earth Electrode Resistance (TT Systems)</strong> - Test the resistance of the earth electrode where applicable.</li>
                <li><span className="text-green-400">6.</span> <strong>Earth Fault Loop Impedance</strong> - Measure Ze at the origin and Zs at each circuit. Compare to maximum values.</li>
                <li><span className="text-green-400">7.</span> <strong>Prospective Fault Current</strong> - Measure or calculate IPFC at the origin. Verify protective devices are rated appropriately.</li>
                <li><span className="text-green-400">8.</span> <strong>RCD Operation</strong> - Test trip times at rated current (×1), ×5, and ×0.5 where applicable.</li>
                <li><span className="text-green-400">9.</span> <strong>Functional Testing</strong> - Verify operation of assemblies, switchgear, controls, and interlocks.</li>
              </ol>
            </div>

            <p className="text-sm text-orange-400/90">
              <strong>Safety note:</strong> Live tests present shock hazard. Use GS38 compliant test equipment, appropriate PPE, and follow safe working practices. Two-person rule may apply.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Recording Results */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Recording Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Test results must be recorded systematically on the <strong>Schedule of Test Results</strong>. This provides a permanent record of the installation's condition.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What to Record</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-white">Test</th>
                      <th className="text-left py-2 text-white/80">Values to Record</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/5">
                      <td className="py-2 text-elec-yellow">Continuity</td>
                      <td>R1+R2 or R2 values in ohms</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 text-elec-yellow">Ring continuity</td>
                      <td>r1, rn, r2 and measured (r1+r2)/4 values</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 text-elec-yellow">Insulation resistance</td>
                      <td>IR value in MΩ</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 text-elec-yellow">Polarity</td>
                      <td>Tick to confirm correct</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 text-elec-yellow">Loop impedance</td>
                      <td>Zs in ohms</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 text-elec-yellow">RCD</td>
                      <td>Trip time in ms at each test current</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-elec-yellow">PFC</td>
                      <td>Prospective fault current in kA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recording Tips</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record values at the time of testing - don't rely on memory</li>
                <li>Record actual measured values, not just pass/fail</li>
                <li>Use appropriate units (Ω, MΩ, ms, kA)</li>
                <li>Note any circuits not tested and the reason</li>
                <li>Digital recording direct from tester reduces errors</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 06: Certification Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Certification Overview
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different types of certification are required depending on the nature of the work. Using the correct form is essential for compliance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Certification</p>
              <div className="space-y-4">
                <div>
                  <p className="text-green-400 font-semibold text-sm">Electrical Installation Certificate (EIC)</p>
                  <p className="text-sm text-white/70"><strong>Use for:</strong> New installations, additions to installations, alterations</p>
                  <p className="text-sm text-white/70"><strong>Includes:</strong> Design details, Schedule of Inspections, Schedule of Test Results</p>
                  <p className="text-sm text-white/70"><strong>Signed by:</strong> Designer, constructor, and inspector (may be same person)</p>
                </div>
                <div>
                  <p className="text-blue-400 font-semibold text-sm">Electrical Installation Condition Report (EICR)</p>
                  <p className="text-sm text-white/70"><strong>Use for:</strong> Periodic inspection of existing installations</p>
                  <p className="text-sm text-white/70"><strong>Includes:</strong> Observations with classification codes, Schedule of Test Results</p>
                  <p className="text-sm text-white/70"><strong>Signed by:</strong> Inspector only</p>
                </div>
                <div>
                  <p className="text-orange-400 font-semibold text-sm">Minor Electrical Installation Works Certificate</p>
                  <p className="text-sm text-white/70"><strong>Use for:</strong> Minor work not involving a new circuit</p>
                  <p className="text-sm text-white/70"><strong>Examples:</strong> Adding socket to existing circuit, replacing consumer unit like-for-like</p>
                  <p className="text-sm text-white/70"><strong>Signed by:</strong> Person carrying out the work</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use Each Form</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>New circuit?</strong> EIC required</li>
                <li><strong>Addition to existing circuit?</strong> Minor Works may be sufficient</li>
                <li><strong>Periodic inspection?</strong> EICR required</li>
                <li><strong>Not sure?</strong> EIC is never wrong (more comprehensive)</li>
              </ul>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Fill in forms as you go - don't leave it until the end</li>
                <li>Take photographs of defects and observations</li>
                <li>Number circuits consistently between schedule and distribution board</li>
                <li>Write legibly or use electronic recording</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Recording estimated rather than measured values</li>
                <li>Using the wrong type of certificate</li>
                <li>Failing to record limitations to the inspection</li>
                <li>Not completing all sections of the form</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use electronic test result download where available</li>
                <li>Retain copies of all certificates issued</li>
                <li>Provide clear descriptions of any defects</li>
                <li>Explain any observations to the client in plain language</li>
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

        {/* Reference Card */}
        <section className="mb-10">
          <UnitsPocketCard
            title="Test Sequence Reference"
            items={referenceItems}
          />
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
            <Link to="/study-centre/upskilling/inspection-testing/module-1/section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-2">
              Next: Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule1Section5;
