import { ArrowLeft, ClipboardList, Clock, CheckCircle, AlertTriangle, Wrench, HelpCircle, ChevronRight, ChevronLeft, List, FileText, Camera, Layers, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';
import useSEO from '@/hooks/useSEO';

const TITLE = "Test Sequence and Documentation - Inspection & Testing";
const DESCRIPTION = "Learn the correct sequence for electrical tests and how to properly document results including schedules of test results and certification requirements.";

const quickCheckQuestions = [
  {
    question: "What type of tests should always be completed before live tests?",
    options: ["RCD tests", "Loop impedance tests", "Dead tests (continuity, insulation)", "Functional tests"],
    correctAnswer: 2,
    explanation: "Dead tests (continuity and insulation resistance) must be completed before live tests to ensure the installation is safe before energising."
  },
  {
    question: "Why must visual inspection be done before testing?",
    options: ["It's quicker to do first", "To identify obvious faults that could make testing dangerous", "Testing equipment requires it", "It's optional"],
    correctAnswer: 1,
    explanation: "Visual inspection identifies obvious defects, damage, or dangerous conditions that could make testing hazardous. It must be done before energising for testing."
  },
  {
    question: "What certificate is used for periodic inspection of existing installations?",
    options: ["Electrical Installation Certificate", "Minor Works Certificate", "Electrical Installation Condition Report", "Test Results Schedule"],
    correctAnswer: 2,
    explanation: "An EICR (Electrical Installation Condition Report) is used for periodic inspection of existing installations to report on their condition."
  }
];

const quizQuestions = [
  {
    question: "The correct sequence for electrical testing is:",
    options: ["Live tests, dead tests, visual inspection", "Dead tests, visual inspection, live tests", "Visual inspection, dead tests, live tests", "Any order is acceptable"],
    correctAnswer: 2,
    explanation: "Visual inspection must be done first (with supply off), then dead tests, then live tests. This ensures safety at each stage."
  },
  {
    question: "Continuity testing should be performed:",
    options: ["With the supply connected", "Before insulation resistance testing", "After RCD testing", "Only on new installations"],
    correctAnswer: 1,
    explanation: "Continuity testing is a dead test performed before insulation resistance testing, with the supply isolated."
  },
  {
    question: "Why is test sequence important for safety?",
    options: ["It makes paperwork easier", "It ensures faults are found before the circuit is energised", "Test equipment requires it", "It's just a recommendation"],
    correctAnswer: 1,
    explanation: "Following the correct sequence means potential faults are identified by dead tests before the circuit is energised for live tests."
  },
  {
    question: "A Schedule of Test Results records:",
    options: ["Only failed test results", "Only passed test results", "All measured values and test outcomes", "Estimated values"],
    correctAnswer: 2,
    explanation: "The Schedule of Test Results records all measured values from tests, providing a record of the installation's condition at the time of testing."
  },
  {
    question: "The Schedule of Inspections records:",
    options: ["Only test results", "Items checked during visual inspection", "Equipment serial numbers", "Client contact details"],
    correctAnswer: 1,
    explanation: "The Schedule of Inspections records the items checked during visual inspection and their condition/compliance."
  },
  {
    question: "Which document confirms a new installation complies with BS 7671?",
    options: ["EICR", "Electrical Installation Certificate (EIC)", "Building Control Certificate", "Test Equipment Certificate"],
    correctAnswer: 1,
    explanation: "An Electrical Installation Certificate (EIC) confirms that a new installation meets the requirements of BS 7671."
  },
  {
    question: "A Minor Works Certificate is appropriate when:",
    options: ["Installing a new consumer unit", "Adding a socket to an existing circuit", "Installing a new circuit", "Periodic inspection"],
    correctAnswer: 1,
    explanation: "Minor Works Certificates are for minor additions/alterations that don't involve a new circuit, such as adding a socket to an existing circuit."
  },
  {
    question: "Test results should be recorded:",
    options: ["From memory at the end of the day", "At the time of testing", "Only if they fail", "Only for new installations"],
    correctAnswer: 1,
    explanation: "Test results must be recorded at the time of testing to ensure accuracy and prevent errors from relying on memory."
  },
  {
    question: "What should be done with photographs taken during inspection?",
    options: ["Delete after the job", "Keep as part of the documentation", "Only take if defects are found", "Post on social media"],
    correctAnswer: 1,
    explanation: "Photographs provide valuable evidence and should be kept as part of the inspection documentation, especially for defects and observations."
  },
  {
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
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center h-[56px] px-4 max-w-4xl mx-auto">
          <Button variant="ios-ghost" size="ios-small" asChild className="gap-1">
            <Link to="../module1">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 1</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 5</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
            <ClipboardList className="h-7 w-7 text-elec-yellow" />
          </div>
          <span className="text-[11px] font-medium text-elec-yellow uppercase tracking-wide">
            Module 1 • Section 5
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Test Sequence and Documentation
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed">
          Understanding the correct order of tests and how to properly record and certify your findings.
        </p>
      </section>

      {/* In 30 Seconds */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios-elevated" className="border-elec-yellow/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              In 30 Seconds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Test sequence: Visual inspection → Dead tests → Live tests - this order is critical for safety</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Record all test results at the time of testing - not just pass/fail but actual measured values</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Use correct certification: EIC for new work, EICR for existing installations, Minor Works for small jobs</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <h2 className="text-[22px] font-semibold text-white mb-4">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Understand the correct test sequence",
            "Explain why sequence matters for safety",
            "Document test results correctly",
            "Complete schedule of test results",
            "Record observations during inspection",
            "Use appropriate certification forms"
          ].map((outcome, i) => (
            <Card key={i} variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-elec-yellow/10 flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-elec-yellow" />
                </div>
                <p className="text-[15px] text-white/80">{outcome}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Content Section 01 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">01</span>
          <h2 className="text-[22px] font-semibold text-white">The Test Sequence</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              The test sequence specified in BS 7671 and GN3 is designed for <strong className="text-white">safety</strong>. Each stage confirms the installation is safe before proceeding to tests that require energisation.
            </p>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/20">
              <p className="text-white font-semibold mb-2">Why Sequence Matters</p>
              <p className="text-white/80">
                Dead tests identify faults like short circuits and insulation failures that could cause danger when the supply is connected. If you skip to live tests without completing dead tests, unidentified faults could cause shock or fire.
              </p>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">The Three Stages</h3>
            <div className="space-y-3">
              <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Stage 1: Visual Inspection</p>
                    <p className="text-[14px] text-white/70 mt-1">Supply OFF. Check for obvious defects, damage, non-compliance, and anything that would make testing dangerous.</p>
                  </div>
                </div>
              </div>
              <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
                <div className="flex items-start gap-3">
                  <List className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Stage 2: Dead Tests</p>
                    <p className="text-[14px] text-white/70 mt-1">Supply ISOLATED. Continuity of protective conductors, ring final circuits, insulation resistance, polarity.</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                <div className="flex items-start gap-3">
                  <Layers className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Stage 3: Live Tests</p>
                    <p className="text-[14px] text-white/70 mt-1">Supply CONNECTED. Earth fault loop impedance, prospective fault current, RCD operation, functional testing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Content Section 02 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">02</span>
          <h2 className="text-[22px] font-semibold text-white">Visual Inspection Requirements</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              Visual inspection is a thorough examination of the installation without using test instruments. It should identify non-compliance, damage, and potential hazards.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Key Items to Check (Regulation 641)</h3>
            <ul className="space-y-2 ml-4">
              <li>• Correct selection and erection of equipment for the environment</li>
              <li>• Presence of fire barriers and seals</li>
              <li>• Conductors correctly identified (colours)</li>
              <li>• Connections secure and correctly made</li>
              <li>• Presence of protective devices and correct rating</li>
              <li>• Presence of appropriate circuit identification and warning notices</li>
              <li>• Accessibility of equipment for operation and maintenance</li>
              <li>• Condition of insulation, enclosures and mechanical protection</li>
            </ul>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Documenting Visual Inspection</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <FileText className="h-5 w-5 text-elec-yellow mb-2" />
                <p className="text-white font-semibold">Schedule of Inspections</p>
                <p className="text-[13px] text-white/60">Records all items checked and their compliance status</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Camera className="h-5 w-5 text-elec-yellow mb-2" />
                <p className="text-white font-semibold">Photographs</p>
                <p className="text-[13px] text-white/60">Visual evidence of defects, hazards, and notable observations</p>
              </div>
            </div>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20 mt-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/80">
                  Visual inspection must be done <strong className="text-white">before energising</strong> for testing. Defects found may need to be addressed before testing can proceed safely.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* InlineCheck 1 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <InlineCheck question={quickCheckQuestions[0]} />
      </section>

      {/* Content Section 03 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">03</span>
          <h2 className="text-[22px] font-semibold text-white">Dead Testing Sequence</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              Dead tests are performed with the installation isolated from the supply. They verify the integrity of conductors and insulation.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Dead Tests in Sequence</h3>
            <ol className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold flex-shrink-0">1</span>
                <div>
                  <p className="text-white font-semibold">Continuity of Protective Conductors</p>
                  <p className="text-[14px] text-white/70">Test R1+R2 or R2 values. Confirms protective conductors provide a path for fault current.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold flex-shrink-0">2</span>
                <div>
                  <p className="text-white font-semibold">Continuity of Ring Final Circuits</p>
                  <p className="text-[14px] text-white/70">Verify ring is complete, no interconnections or broken rings.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold flex-shrink-0">3</span>
                <div>
                  <p className="text-white font-semibold">Insulation Resistance</p>
                  <p className="text-[14px] text-white/70">Test between conductors and to earth at 500V DC. Minimum 1MΩ (typical values much higher).</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold flex-shrink-0">4</span>
                <div>
                  <p className="text-white font-semibold">Polarity</p>
                  <p className="text-[14px] text-white/70">Verify phase and neutral are correctly connected at all points. Can be done dead or live.</p>
                </div>
              </li>
            </ol>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Why This Order?</h3>
            <p>
              Continuity is tested first because insulation resistance testing at 500V could damage certain equipment. The continuity test at low voltage confirms the installation is safe for IR testing.
            </p>
          </div>
        </Card>
      </section>

      {/* Content Section 04 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">04</span>
          <h2 className="text-[22px] font-semibold text-white">Live Testing Sequence</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              Live tests can only proceed after dead tests have confirmed the installation is safe. The supply must be connected for these tests.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Live Tests in Sequence</h3>
            <ol className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400 font-bold flex-shrink-0">5</span>
                <div>
                  <p className="text-white font-semibold">Earth Electrode Resistance (TT Systems)</p>
                  <p className="text-[14px] text-white/70">Test the resistance of the earth electrode where applicable.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400 font-bold flex-shrink-0">6</span>
                <div>
                  <p className="text-white font-semibold">Earth Fault Loop Impedance</p>
                  <p className="text-[14px] text-white/70">Measure Ze at the origin and Zs at each circuit. Compare to maximum values.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400 font-bold flex-shrink-0">7</span>
                <div>
                  <p className="text-white font-semibold">Prospective Fault Current</p>
                  <p className="text-[14px] text-white/70">Measure or calculate IPFC at the origin. Verify protective devices are rated appropriately.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400 font-bold flex-shrink-0">8</span>
                <div>
                  <p className="text-white font-semibold">RCD Operation</p>
                  <p className="text-[14px] text-white/70">Test trip times at rated current (×1), ×5, and ×0.5 where applicable.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400 font-bold flex-shrink-0">9</span>
                <div>
                  <p className="text-white font-semibold">Functional Testing</p>
                  <p className="text-[14px] text-white/70">Verify operation of assemblies, switchgear, controls, and interlocks.</p>
                </div>
              </li>
            </ol>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20 mt-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/80">
                  <strong className="text-white">Safety note:</strong> Live tests present shock hazard. Use GS38 compliant test equipment, appropriate PPE, and follow safe working practices. Two-person rule may apply.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* InlineCheck 2 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <InlineCheck question={quickCheckQuestions[1]} />
      </section>

      {/* Content Section 05 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">05</span>
          <h2 className="text-[22px] font-semibold text-white">Recording Results</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              Test results must be recorded systematically on the <strong className="text-white">Schedule of Test Results</strong>. This provides a permanent record of the installation's condition.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">What to Record</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[14px]">
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
                    <td>✓ (tick) to confirm correct</td>
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

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Recording Tips</h3>
            <ul className="space-y-2 ml-4">
              <li>• Record values at the time of testing - don't rely on memory</li>
              <li>• Record actual measured values, not just pass/fail</li>
              <li>• Use appropriate units (Ω, MΩ, ms, kA)</li>
              <li>• Note any circuits not tested and the reason</li>
              <li>• Digital recording direct from tester reduces errors</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Content Section 06 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">06</span>
          <h2 className="text-[22px] font-semibold text-white">Certification Overview</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              Different types of certification are required depending on the nature of the work. Using the correct form is essential for compliance.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Types of Certification</h3>
            <div className="space-y-3">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                <p className="text-green-400 font-semibold">Electrical Installation Certificate (EIC)</p>
                <p className="text-white/80 mt-1"><strong className="text-white">Use for:</strong> New installations, additions to installations, alterations</p>
                <p className="text-white/80 mt-1"><strong className="text-white">Includes:</strong> Design details, Schedule of Inspections, Schedule of Test Results</p>
                <p className="text-white/80 mt-1"><strong className="text-white">Signed by:</strong> Designer, constructor, and inspector (may be same person)</p>
              </div>

              <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                <p className="text-blue-400 font-semibold">Electrical Installation Condition Report (EICR)</p>
                <p className="text-white/80 mt-1"><strong className="text-white">Use for:</strong> Periodic inspection of existing installations</p>
                <p className="text-white/80 mt-1"><strong className="text-white">Includes:</strong> Observations with classification codes, Schedule of Test Results</p>
                <p className="text-white/80 mt-1"><strong className="text-white">Signed by:</strong> Inspector only</p>
              </div>

              <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
                <p className="text-orange-400 font-semibold">Minor Electrical Installation Works Certificate</p>
                <p className="text-white/80 mt-1"><strong className="text-white">Use for:</strong> Minor work not involving a new circuit</p>
                <p className="text-white/80 mt-1"><strong className="text-white">Examples:</strong> Adding socket to existing circuit, replacing consumer unit like-for-like</p>
                <p className="text-white/80 mt-1"><strong className="text-white">Signed by:</strong> Person carrying out the work</p>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">When to Use Each Form</h3>
            <ul className="space-y-2 ml-4">
              <li>• <strong className="text-white">New circuit?</strong> → EIC required</li>
              <li>• <strong className="text-white">Addition to existing circuit?</strong> → Minor Works may be sufficient</li>
              <li>• <strong className="text-white">Periodic inspection?</strong> → EICR required</li>
              <li>• <strong className="text-white">Not sure?</strong> → EIC is never wrong (more comprehensive)</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* InlineCheck 3 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <InlineCheck question={quickCheckQuestions[2]} />
      </section>

      {/* Practical Guidance */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <Card variant="ios-elevated" className="border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-[17px] font-semibold flex items-center gap-2">
              <Wrench className="h-5 w-5 text-elec-yellow" />
              Practical Guidance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-white font-semibold mb-2">Documentation Tips</h4>
              <ul className="space-y-2 text-[15px] text-white/80">
                <li>• Fill in forms as you go - don't leave it until the end</li>
                <li>• Take photographs of defects and observations</li>
                <li>• Number circuits consistently between schedule and distribution board</li>
                <li>• Write legibly or use electronic recording</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Common Mistakes</h4>
              <ul className="space-y-2 text-[15px] text-white/80">
                <li>• Recording estimated rather than measured values</li>
                <li>• Using the wrong type of certificate</li>
                <li>• Failing to record limitations to the inspection</li>
                <li>• Not completing all sections of the form</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Best Practice</h4>
              <ul className="space-y-2 text-[15px] text-white/80">
                <li>• Use electronic test result download where available</li>
                <li>• Retain copies of all certificates issued</li>
                <li>• Provide clear descriptions of any defects</li>
                <li>• Explain any observations to the client in plain language</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQs */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <h2 className="text-[22px] font-semibold text-white mb-4 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Card key={i} variant="ios" className="p-4">
              <h3 className="text-[17px] font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-[15px] text-white/70 leading-relaxed">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Reference Card */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <UnitsPocketCard
          title="Test Sequence Reference"
          items={referenceItems}
        />
      </section>

      {/* Quiz */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <Quiz
          questions={quizQuestions}
          title="Section 5 Quiz"
          description="Test your knowledge of test sequence and documentation"
        />
      </section>

      {/* Navigation */}
      <footer className="px-4 pb-safe pt-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="flex gap-3">
          <Button variant="ios-secondary" size="ios-default" className="flex-1" asChild>
            <Link to="../section4">
              <ChevronLeft className="h-5 w-5 mr-1" />
              Previous
            </Link>
          </Button>
          <Button variant="ios-primary" size="ios-default" className="flex-1" asChild>
            <Link to="../../module2">
              Module 2
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default InspectionTestingModule1Section5;
