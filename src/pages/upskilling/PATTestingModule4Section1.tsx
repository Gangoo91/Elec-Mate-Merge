import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Earth Continuity Testing - PAT Testing Course";
const DESCRIPTION = "Learn the principles and procedures for testing earth continuity in Class I appliances to ensure protective earthing is effective.";

const quickCheckQuestions = [
  {
    id: "m4s1-check1",
    question: "What is the maximum acceptable earth continuity resistance for a Class I appliance with a 5m cable?",
    options: ["0.1 + 0.1 ohms = 0.2 ohms", "0.1 + (5 x 0.1) = 0.6 ohms maximum", "1.0 ohms for all cable lengths", "No maximum - any reading is acceptable"],
    correctIndex: 1,
    explanation: "The maximum acceptable resistance is 0.1 ohms plus 0.1 ohms per metre of cable. For a 5m cable: 0.1 + (5 x 0.1) = 0.6 ohms maximum."
  },
  {
    id: "m4s1-check2",
    question: "Why is a test current of at least 200mA (or higher) used for earth continuity testing?",
    options: ["To check if the fuse will blow", "To verify the connection can carry significant current, not just make contact", "To test the insulation at the same time", "Because lower currents are dangerous"],
    correctIndex: 1,
    explanation: "A substantial test current (200mA minimum, often 10A or 25A) ensures the earth path can actually carry protective current, not just make superficial contact. This reveals loose or corroded connections."
  },
  {
    id: "m4s1-check3",
    question: "When testing earth continuity, where should the test lead be connected on a kettle?",
    options: ["The heating element terminals", "Any exposed metal part that should be earthed", "The live terminal in the plug", "The cable outer sheath"],
    correctIndex: 1,
    explanation: "The test lead connects to any exposed metal part that should be earthed - this verifies the earth bonding throughout the appliance, not just at the plug."
  }
];

const quizQuestions = [
  { id: 1, question: "What is the primary purpose of earth continuity testing?", options: ["To check the cable is long enough", "To verify the protective earth path has low resistance", "To test insulation resistance", "To measure leakage current"], correctAnswer: 1, explanation: "Earth continuity testing verifies that the protective earth path has sufficiently low resistance to carry fault current safely." },
  { id: 2, question: "The formula for maximum acceptable earth continuity resistance is:", options: ["0.5 ohms for all appliances", "1.0 ohms + cable length", "0.1 ohms + (0.1 ohms x cable length in metres)", "Depends on the appliance wattage"], correctAnswer: 2, explanation: "The formula is 0.1 ohms plus 0.1 ohms per metre of cable length." },
  { id: 3, question: "Class I appliances rely on which safety mechanism?", options: ["Double insulation only", "Reduced voltage supply", "Protective earth connection", "Sealed construction"], correctAnswer: 2, explanation: "Class I appliances rely on a protective earth connection as their primary safety mechanism." },
  { id: 4, question: "What test current is typically used for earth continuity testing?", options: ["10-25A DC or AC", "1mA test signal", "230V mains voltage", "Variable depending on fuse rating"], correctAnswer: 0, explanation: "Professional PAT testers typically use 10A or 25A test currents for earth continuity testing." },
  { id: 5, question: "A high earth continuity reading could indicate:", options: ["The appliance is safe to use", "A loose or corroded earth connection", "The insulation is damaged", "The fuse needs replacing"], correctAnswer: 1, explanation: "High readings typically indicate loose, corroded, or damaged earth connections." },
  { id: 6, question: "Which appliances require earth continuity testing?", options: ["Class I appliances only", "Class II appliances only", "All portable appliances", "Only appliances over 1kW"], correctAnswer: 0, explanation: "Only Class I appliances require earth continuity testing as they rely on the earth connection for safety." },
  { id: 7, question: "Where should the earth probe be placed during testing?", options: ["On the live terminal", "On the neutral terminal", "On exposed metalwork that should be earthed", "On the cable outer sheath"], correctAnswer: 2, explanation: "The probe should be placed on exposed metalwork that should be connected to earth." },
  { id: 8, question: "If an earth reading is 0.15 ohms on a 2m cable, the result is:", options: ["Fail - too high", "Pass - within acceptable limits", "Borderline - needs investigation", "Cannot determine without more information"], correctAnswer: 1, explanation: "For a 2m cable, the maximum is 0.1 + (0.1 x 2) = 0.3 ohms. A reading of 0.15 ohms is a clear pass." },
  { id: 9, question: "The test current for earth continuity must be:", options: ["Less than 1mA for safety", "At least 200mA (typically 10A or 25A)", "Equal to the fuse rating", "Exactly 230V"], correctAnswer: 1, explanation: "A substantial test current of at least 200mA is required, with most professional testers using 10A or 25A." },
  { id: 10, question: "What should you check before performing earth continuity test?", options: ["That the appliance is plugged in and switched on", "That the appliance is disconnected from mains supply", "That the room is well ventilated", "That you are wearing rubber gloves"], correctAnswer: 1, explanation: "Always ensure the appliance is disconnected from the mains supply before testing." }
];

const faqs = [
  { question: "Why do some testers use 10A or 25A test current?", answer: "Higher test currents more effectively reveal high-resistance joints, loose connections, or corroded terminals that might pass with lower currents. The brief high current simulates fault conditions." },
  { question: "Can I test earth continuity with a multimeter?", answer: "A standard multimeter can give a basic resistance reading, but it uses very low test current. Professional PAT testers use higher currents (200mA-25A) which more reliably detect poor connections." },
  { question: "What if the appliance has a two-core cable?", answer: "If the appliance has only two-core cable (live and neutral, no earth), it is likely a Class II double-insulated appliance and does not require earth continuity testing." },
  { question: "Why is 0.1 ohms per metre used in the calculation?", answer: "This figure accounts for the resistance of the conductor in typical flexible cables. Longer cables naturally have higher resistance, so the calculation allows for this proportionally." },
  { question: "What causes a high earth continuity reading?", answer: "Common causes include: loose terminal screws, corroded connections, damaged conductors, poor crimping, dirty contact surfaces, or a break in the earth path within the appliance." },
  { question: "Should I test earth continuity if the plug earth pin is plastic?", answer: "A plastic earth pin indicates a Class II appliance (double insulated). These do not require earth continuity testing as they have no protective earth conductor." }
];

const PATTestingModule4Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/pat-testing-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Earth Continuity Testing
          </h1>
          <p className="text-white/80">
            Testing earth connections in Class I appliances
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Verify earth path has low resistance</li>
              <li><strong>Formula:</strong> Max = 0.1 + (0.1 x cable length) ohms</li>
              <li><strong>Test current:</strong> 200mA minimum (10A/25A typical)</li>
              <li><strong>Applies to:</strong> Class I appliances only</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Connect:</strong> Tester to earth pin and exposed metal</li>
              <li><strong>Check:</strong> Multiple metal points on large appliances</li>
              <li><strong>Record:</strong> Reading and cable length</li>
              <li><strong>Skip:</strong> Class II (plastic earth pin) appliances</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why earth continuity testing is essential for Class I appliances",
              "Describe the test procedure and connection points",
              "Calculate maximum acceptable resistance values",
              "Identify common causes of high resistance readings",
              "Interpret test results correctly",
              "Recognise when earth continuity testing is not required"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Earth Continuity Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Earth Continuity Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Class I appliances rely on a protective earth connection as their primary safety mechanism. If an internal fault causes the metal casing to become live, the earth connection provides a low-resistance path for fault current to flow, causing the protective device (fuse or MCB) to operate quickly.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Safety Critical:</strong> A high-resistance earth connection may not allow enough fault current to flow to operate protective devices quickly. This could leave a user in contact with a dangerous voltage for an extended period.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Earth continuity testing verifies that:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Earth conductor intact:</strong> The earth conductor in the cable is intact and correctly connected</li>
                <li><strong>Metalwork bonded:</strong> All exposed metalwork is properly bonded to earth</li>
                <li><strong>Low resistance:</strong> The resistance is low enough to allow sufficient fault current</li>
                <li><strong>Secure connections:</strong> Connections are secure, not loose or corroded</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Test Procedure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Test Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The earth continuity test measures the resistance of the earth path from the plug earth pin to exposed metalwork on the appliance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Step-by-Step Procedure:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Step 1 - Preparation:</strong> Ensure the appliance is disconnected from mains supply. Visually inspect the plug, cable, and appliance for obvious damage.</li>
                <li><strong>Step 2 - Connect the Tester:</strong> Insert the plug into the PAT tester socket. Connect the test probe lead to the tester if required.</li>
                <li><strong>Step 3 - Apply Test Probe:</strong> Touch the test probe to exposed metal parts that should be earthed (casing, handles, control panels). The tester applies current and measures resistance.</li>
                <li><strong>Step 4 - Record Results:</strong> Note the resistance reading. Test multiple points if the appliance has several exposed metal areas.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Test Current:</strong> Professional PAT testers use test currents of 10A or 25A (for a short duration) or a minimum of 200mA. Higher currents more effectively reveal poor connections that might pass with low-current testing.
              </p>
            </div>
          </div>
        </section>

        {/* Section 03: Acceptable Resistance Values */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Acceptable Resistance Values
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The maximum acceptable earth continuity resistance depends on the cable length.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Maximum Resistance Formula:</strong> R(max) = 0.1 + (0.1 x L) ohms, where L = cable length in metres
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Quick Reference Table:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1 metre cable:</strong> Maximum 0.2 ohms (0.1 + 0.1 x 1)</li>
                <li><strong>2 metres cable:</strong> Maximum 0.3 ohms (0.1 + 0.1 x 2)</li>
                <li><strong>5 metres cable:</strong> Maximum 0.6 ohms (0.1 + 0.1 x 5)</li>
                <li><strong>10 metres cable:</strong> Maximum 1.1 ohms (0.1 + 0.1 x 10)</li>
                <li><strong>15 metres cable:</strong> Maximum 1.6 ohms (0.1 + 0.1 x 15)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Practical Tip:</p>
              <p className="text-sm text-white ml-4">
                Most household appliances with short cables (1-2m) should read well under 0.3 ohms. Readings above this for short cables indicate a problem that needs investigation.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Common Causes of High Readings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Common Causes of High Readings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When earth continuity readings are higher than expected, investigate these common causes:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Connection Problems:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Loose terminal screws in plug</li>
                <li>Corroded connections</li>
                <li>Poor crimping of terminals</li>
                <li>Damaged conductor strands</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable Issues:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Partially broken earth conductor</li>
                <li>Internal damage not visible externally</li>
                <li>Wrong cable type for application</li>
                <li>Excessively long cable run</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Appliance Faults:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Internal earth connection broken</li>
                <li>Bonding wire disconnected</li>
                <li>Corrosion on earth points</li>
                <li>Manufacturing defect</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Testing Errors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Poor probe contact</li>
                <li>Paint or coating on test point</li>
                <li>Dirty contact surfaces</li>
                <li>Faulty test leads</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05: When Testing is Not Required */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            When Earth Continuity Testing is Not Required
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Not all appliances require earth continuity testing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Class II (Double Insulated) Appliances:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Have two-core cables and plastic earth pins</li>
                <li>Rely on double insulation rather than earth protection</li>
                <li>Identified by the double square symbol on the rating plate</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Class III (SELV) Appliances:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Operate at safety extra-low voltage (typically via a transformer)</li>
                <li>Do not require earth protection</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Quick Identification:</strong> Metal earth pin on plug = Class I = Requires earth test. Plastic earth pin on plug = Class II = No earth test needed. Three-core cable = Class I. Two-core cable = Usually Class II.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test multiple points on appliances with large metal areas</li>
                <li>Ensure good probe contact - clean test points if necessary</li>
                <li>Measure cable length accurately for resistance calculation</li>
                <li>Record the reading and cable length for reference</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Testing on painted surfaces</strong> - without cleaning first</li>
                <li><strong>Incorrect cable length</strong> - in the calculation</li>
                <li><strong>Testing Class II appliances</strong> - for earth continuity</li>
                <li><strong>Ignoring borderline readings</strong> - without investigation</li>
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

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Earth Continuity Testing</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">TEST REQUIREMENTS</p>
                <ul className="space-y-0.5">
                  <li>Test current: 200mA min (10A/25A typical)</li>
                  <li>Apply to exposed metalwork</li>
                  <li>Test from plug earth pin</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">MAXIMUM RESISTANCE</p>
                <ul className="space-y-0.5">
                  <li>Formula: 0.1 + (0.1 x L) ohms</li>
                  <li>L = cable length in metres</li>
                  <li>Short cables: typically under 0.3 ohms</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">CLASS I IDENTIFICATION</p>
                <ul className="space-y-0.5">
                  <li>Metal earth pin in plug</li>
                  <li>Three-core cable</li>
                  <li>Metal casing or parts</li>
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

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/pat-testing-module-3-section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default PATTestingModule4Section1;
