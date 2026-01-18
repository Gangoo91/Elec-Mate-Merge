import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Ze Testing at Origin - Module 5 Section 3";
const DESCRIPTION = "Learn how to measure external earth fault loop impedance (Ze) at the installation origin.";

const quickCheckQuestions = [
  {
    id: "ze-tncs",
    question: "Typical Ze for TN-C-S (PME) is:",
    options: ["0.35 ohm or less", "0.8 ohm or less", "20-200 ohm", "more than 1000 ohm"],
    correctIndex: 0,
    explanation: "TN-C-S (PME) has low Ze (0.35 ohm or less) due to the metallic combined neutral/earth return path."
  },
  {
    id: "ze-disconnect",
    question: "To measure Ze, the main earthing conductor must be:",
    options: ["Left connected", "Disconnected", "Doubled up", "Extended"],
    correctIndex: 1,
    explanation: "Disconnect the earthing conductor to remove your installation from the measurement, isolating just the external impedance."
  },
  {
    id: "ze-design",
    question: "Why is Ze important for circuit design?",
    options: [
      "It determines lamp wattage",
      "Combined with R1+R2 it must not exceed max Zs",
      "It sets the supply voltage",
      "It determines cable colours"
    ],
    correctIndex: 1,
    explanation: "Zs = Ze + R1+R2. Knowing Ze allows calculation of maximum allowable R1+R2 (circuit length/cable size) to stay within Zs limits."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Ze represents impedance of:",
    options: [
      "Your installation only",
      "External supply only (outside your installation)",
      "The circuit being tested",
      "The earth electrode"
    ],
    correctAnswer: 1,
    explanation: "Ze is external earth fault loop impedance - everything outside your installation including supply transformer and cables."
  },
  {
    id: 2,
    question: "To measure Ze, the main earthing conductor must be:",
    options: ["Left connected", "Disconnected", "Doubled up", "Extended"],
    correctAnswer: 1,
    explanation: "Disconnect the earthing conductor to remove your installation's earth from the measurement, isolating just the external impedance."
  },
  {
    id: 3,
    question: "Ze testing is performed with:",
    options: [
      "Installation completely dead",
      "Installation on but main switch open",
      "Incoming supply present, installation isolated",
      "Everything fully energised"
    ],
    correctAnswer: 2,
    explanation: "The incoming supply must be present to measure Ze, but your installation should be isolated (main switch off, earthing disconnected)."
  },
  {
    id: 4,
    question: "Typical Ze for TN-C-S (PME) is:",
    options: ["0.35 ohm or less", "0.8 ohm or less", "20-200 ohm", "more than 1000 ohm"],
    correctAnswer: 0,
    explanation: "TN-C-S (PME) systems have low Ze due to the metallic return path via the combined neutral/earth."
  },
  {
    id: 5,
    question: "Typical Ze for TN-S is:",
    options: ["0.35 ohm or less", "0.8 ohm or less", "20-200 ohm", "more than 1000 ohm"],
    correctAnswer: 1,
    explanation: "TN-S has higher Ze than PME due to the separate earth conductor, but still relatively low."
  },
  {
    id: 6,
    question: "Higher than expected Ze could indicate:",
    options: [
      "Good supply quality",
      "Problems with supply earthing or cables",
      "Your installation is correctly wired",
      "Low fault current capability"
    ],
    correctAnswer: 1,
    explanation: "Unexpectedly high Ze suggests supply problems: deteriorated service cable, poor earthing connections, or DNO equipment issues."
  },
  {
    id: 7,
    question: "Ze measurement location is:",
    options: [
      "At the furthest socket",
      "At the consumer unit/origin",
      "At the meter",
      "Outside the building"
    ],
    correctAnswer: 1,
    explanation: "Ze is measured at the origin (consumer unit) between the incoming line and earth terminals."
  },
  {
    id: 8,
    question: "Why is Ze important for circuit design?",
    options: [
      "It determines lamp wattage",
      "Combined with R1+R2 it must not exceed max Zs",
      "It sets the supply voltage",
      "It determines cable colours"
    ],
    correctAnswer: 1,
    explanation: "Zs = Ze + R1+R2. Knowing Ze allows calculation of maximum allowable R1+R2 (circuit length/cable size) to meet Zs limits."
  },
  {
    id: 9,
    question: "TT systems have high Ze because:",
    options: [
      "The cables are longer",
      "They use earth electrodes instead of metallic return",
      "The supply voltage is higher",
      "The fuses are larger"
    ],
    correctAnswer: 1,
    explanation: "TT systems use earth electrodes (20-200 ohm typical) rather than a low-resistance metallic return path."
  },
  {
    id: 10,
    question: "Before Ze testing, you must:",
    options: [
      "Energise all circuits",
      "Isolate installation and disconnect main earth",
      "Connect additional earth rods",
      "Remove all fuses"
    ],
    correctAnswer: 1,
    explanation: "Isolate the installation (main switch off) and disconnect the main earthing conductor before testing Ze."
  }
];

const faqs = [
  {
    question: "Why disconnect the earthing conductor?",
    answer: "With the installation earth connected, you measure Zs (total), not Ze. Disconnecting removes your installation from the measurement, leaving only the external supply impedance. This requires the installation to be isolated first."
  },
  {
    question: "Is Ze testing safe?",
    answer: "Ze testing is live testing but with your installation isolated. The meter connects to incoming supply terminals. Work carefully - the supply side remains live. Use appropriate PPE and GS38 leads."
  },
  {
    question: "What if Ze is higher than expected?",
    answer: "Higher Ze limits circuit lengths and may indicate supply problems. Check: service cable condition, main earth connection, DNO equipment. Report unusually high Ze to the DNO if persistent."
  },
  {
    question: "Can I measure Ze with main switch off?",
    answer: "No - the incoming supply must be present to measure Ze. Isolate your installation by opening the main switch, but the supply to the switch must be on. The test is between incoming L and E terminals."
  },
  {
    question: "Why is TT Ze much higher?",
    answer: "TT relies on earth electrode resistance (often 20-200 ohm) rather than a metallic return. This inherently high Ze is why TT systems always need RCD protection - EFLI alone can't provide fast enough disconnection."
  },
  {
    question: "How often should Ze be measured?",
    answer: "At every periodic inspection, and whenever supply conditions may have changed. Also measure if you suspect supply problems or before designing installations requiring low EFLI."
  }
];

const InspectionTestingModule5Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-5">
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
            <span>Module 5 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Ze Testing at Origin
          </h1>
          <p className="text-white/80">
            Measuring external earth fault loop impedance at the installation origin
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Ze:</strong> External impedance outside your installation</li>
              <li><strong>Test:</strong> Measured with main earth disconnected</li>
              <li><strong>Purpose:</strong> Essential for circuit design calculations</li>
              <li><strong>Fixed:</strong> You cannot change Ze - it's the supply</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Typical Ze Values</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>TN-C-S (PME):</strong> 0.35 ohm or less</li>
              <li><strong>TN-S:</strong> 0.8 ohm or less</li>
              <li><strong>TT:</strong> 20-200 ohm (varies)</li>
              <li><strong>Location:</strong> At origin/consumer unit</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand what external impedance means",
              "Follow the correct test procedure safely",
              "Know typical Ze values for each earthing system",
              "Understand why earthing must be disconnected",
              "Apply Ze values to circuit calculations",
              "Document findings correctly"
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

        {/* Section 1: What is Ze? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Ze?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Ze</strong> (External earth fault loop impedance) is the impedance of the
              earth fault loop <strong>outside</strong> your installation:
            </p>

            <ul className="text-sm text-white space-y-2 ml-4 my-6">
              <li>Supply transformer winding impedance</li>
              <li>DNO service cable (phase conductor)</li>
              <li>Return path via earthing system</li>
              <li>Service head connections</li>
            </ul>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Key point:</p>
              <p className="text-sm text-white/70">
                Ze is fixed by the supply - you cannot change it. It determines the "headroom" available for your circuit wiring (R1+R2).
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Typical Ze Values */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Typical Ze Values
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">System</th>
                    <th className="text-center py-2 text-white/60">Typical Ze</th>
                    <th className="text-right py-2 text-white/60">Max (ESQCR)</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-3 font-semibold text-elec-yellow">TN-C-S (PME)</td>
                    <td className="text-center font-mono">0.35 ohm</td>
                    <td className="text-right">0.35 ohm</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 font-semibold text-blue-400">TN-S</td>
                    <td className="text-center font-mono">0.8 ohm</td>
                    <td className="text-right">0.8 ohm</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-purple-400">TT</td>
                    <td className="text-center font-mono">20-200 ohm</td>
                    <td className="text-right">Varies</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-amber-300 mt-4">
              If measured Ze significantly exceeds typical values, investigate supply problems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Test Procedure */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Test Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <ol className="text-sm text-white space-y-2 ml-4">
                {[
                  { text: "Isolate the installation - open main switch", warn: false },
                  { text: "Disconnect main earthing conductor from MET", warn: true },
                  { text: "Verify incoming supply is still present", warn: false },
                  { text: "Connect tester between incoming L and E terminals", warn: false },
                  { text: "Take Ze reading and record", warn: false },
                  { text: "Reconnect earthing conductor securely", warn: true },
                  { text: "Re-energise installation", warn: false }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`w-6 h-6 rounded-full ${item.warn ? 'bg-amber-500/20 text-amber-400' : 'bg-orange-500/20 text-orange-400'} text-sm font-bold flex items-center justify-center flex-shrink-0`}>
                      {i + 1}
                    </span>
                    <span className="text-white/80">{item.text}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400 mb-1">Critical:</p>
              <p className="text-sm text-white/70">
                Never leave the earthing conductor disconnected. Reconnect and tighten before re-energising.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Why Disconnect Earth? */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Why Disconnect Earth?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              With the installation earth connected, you measure <strong>Zs</strong> (total impedance),
              not just <strong>Ze</strong>.
            </p>

            <div className="grid grid-cols-2 gap-3 my-6 text-center">
              <div className="p-4 rounded bg-transparent">
                <p className="text-orange-400 font-bold mb-1">Earth Connected</p>
                <p className="text-white/60 text-sm">Measures Zs (Ze + installation)</p>
              </div>
              <div className="p-4 rounded bg-transparent">
                <p className="text-emerald-400 font-bold mb-1">Earth Disconnected</p>
                <p className="text-white/60 text-sm">Measures Ze (external only)</p>
              </div>
            </div>

            <p className="text-sm text-white/70">
              Disconnecting removes your installation's earth path from the measurement circuit, leaving only the external supply impedance.
            </p>
          </div>
        </section>

        {/* Section 5: Using Ze Values */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Using Ze Values
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Ze determines how much "headroom" you have for circuit wiring:</p>

            <div className="my-6 text-center">
              <p className="text-lg font-mono text-elec-yellow mb-2">Max R1+R2 = (Max Zs - Ze) / 1.2</p>
              <p className="text-sm text-white/60">Maximum circuit impedance allowed</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Example Calculation:</p>
              <p className="text-sm text-white/70 font-mono">
                Max Zs = 1.09 ohm (32A Type B MCB)<br />
                Ze = 0.35 ohm (TN-C-S)<br />
                Max R1+R2 = (1.09 - 0.35) / 1.2 = 0.62 ohm
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: High Ze Issues */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            High Ze Issues
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>If measured Ze is higher than expected:</p>

            <div className="my-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-amber-400 mb-1">Check Main Earth</p>
                <p className="text-sm text-white/70">Verify the main earthing terminal and connections are secure.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-400 mb-1">Inspect Service</p>
                <p className="text-sm text-white/70">Check service head connections and cable condition where visible.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400 mb-1">Report to DNO</p>
                <p className="text-sm text-white/70">If Ze exceeds ESQCR limits consistently, report to the Distribution Network Operator.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Record on Every Inspection</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ze should be measured at every periodic inspection</li>
                <li>Changes may indicate deteriorating supply</li>
                <li>Compare to previous results if available</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Compare to Previous</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Compare current Ze to previous results</li>
                <li>Significant increase warrants investigation</li>
                <li>Document any changes in supply conditions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Design Margin</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Allow margin in circuit design - Ze may vary</li>
                <li>Don't design to exact limits</li>
                <li>Consider worst-case Ze for new installations</li>
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
          <UnitsPocketCard
            title="Ze Testing Reference"
            items={[
              { term: "TN-C-S (PME)", definition: "0.35 ohm or less typical" },
              { term: "TN-S", definition: "0.8 ohm or less typical" },
              { term: "TT", definition: "20-200 ohm (varies)" },
              { term: "Test Location", definition: "At origin/consumer unit" },
              { term: "Earth Status", definition: "Disconnected for test" },
              { term: "Purpose", definition: "Determine circuit headroom" }
            ]}
          />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Test Procedure</p>
                <ul className="space-y-0.5">
                  <li>Isolate installation</li>
                  <li>Disconnect main earth</li>
                  <li>Test L-E at origin</li>
                  <li>Reconnect earth</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Points</p>
                <ul className="space-y-0.5">
                  <li>Ze is fixed by supply</li>
                  <li>Determines circuit headroom</li>
                  <li>High Ze = investigation</li>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-5/section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-5/section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule5Section3;
