import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Insulation Resistance Testing - PAT Testing Course";
const DESCRIPTION = "Learn insulation resistance testing procedures for Class I and Class II appliances to verify electrical safety.";

const quickCheckQuestions = [
  {
    id: "m4s2-check1",
    question: "What test voltage is typically used for insulation resistance testing on 230V appliances?",
    options: ["50V DC", "250V DC", "500V DC", "1000V DC"],
    correctIndex: 2,
    explanation: "500V DC is the standard test voltage for insulation resistance testing on 230V mains appliances. This provides adequate stress on the insulation without causing damage."
  },
  {
    id: "m4s2-check2",
    question: "What is the minimum acceptable insulation resistance for a Class I appliance?",
    options: ["0.1 megohms", "1.0 megohm", "2.0 megohms", "10 megohms"],
    correctIndex: 1,
    explanation: "The minimum acceptable insulation resistance for Class I appliances is 1.0 megohm (1 million ohms). However, new appliances typically read much higher, often 10 megohms or more."
  },
  {
    id: "m4s2-check3",
    question: "What is the minimum acceptable insulation resistance for a Class II appliance?",
    options: ["0.5 megohms", "1.0 megohm", "2.0 megohms", "5.0 megohms"],
    correctIndex: 2,
    explanation: "Class II appliances require a minimum of 2.0 megohms because they rely entirely on insulation for protection (no earth connection). The higher standard provides additional safety margin."
  }
];

const quizQuestions = [
  { id: 1, question: "What does insulation resistance testing measure?", options: ["Current flow through the appliance", "Resistance of the earth conductor", "Resistance between live parts and accessible metal/earth", "Voltage at the plug terminals"], correctAnswer: 2, explanation: "Insulation resistance testing measures the resistance between live conductors and accessible metalwork or earth." },
  { id: 2, question: "The standard test voltage for 230V appliances is:", options: ["230V AC", "250V DC", "500V DC", "1000V DC"], correctAnswer: 2, explanation: "500V DC is the standard test voltage for insulation resistance testing on 230V appliances." },
  { id: 3, question: "What is the minimum acceptable IR for Class I appliances?", options: ["0.5 megohms", "1.0 megohm", "2.0 megohms", "5.0 megohms"], correctAnswer: 1, explanation: "Class I appliances require a minimum of 1.0 megohm insulation resistance." },
  { id: 4, question: "What is the minimum acceptable IR for Class II appliances?", options: ["0.5 megohms", "1.0 megohm", "2.0 megohms", "5.0 megohms"], correctAnswer: 2, explanation: "Class II appliances require a minimum of 2.0 megohms due to reliance on insulation alone." },
  { id: 5, question: "A reading showing infinity or OL typically indicates:", options: ["A short circuit", "Good insulation", "A fault to earth", "The test has failed"], correctAnswer: 1, explanation: "Infinity or OL indicates the insulation resistance is very high - good condition." },
  { id: 6, question: "Low insulation resistance readings can be caused by:", options: ["New insulation materials", "Moisture contamination", "Proper manufacturing", "Normal ageing"], correctAnswer: 1, explanation: "Moisture contamination is a common cause of low insulation resistance readings." },
  { id: 7, question: "Why is DC used for insulation resistance testing?", options: ["It is safer than AC", "It does not charge capacitors", "It gives a true resistance reading without capacitive effects", "It is required by regulations"], correctAnswer: 2, explanation: "DC voltage gives a true resistance reading without interference from capacitive charging effects." },
  { id: 8, question: "Which terminals are connected for insulation testing on Class I?", options: ["Live to neutral only", "Live and neutral connected together, tested to earth", "Earth to live only", "Neutral to earth only"], correctAnswer: 1, explanation: "For Class I, live and neutral are connected together and tested to earth." },
  { id: 9, question: "Before insulation testing, you should:", options: ["Connect the appliance to mains", "Ensure the appliance is switched ON", "Ensure the appliance is disconnected from mains", "Test the socket outlet first"], correctAnswer: 2, explanation: "Always ensure the appliance is disconnected from mains supply before testing." },
  { id: 10, question: "A gradual decrease in IR over time suggests:", options: ["Normal operation", "Insulation degradation requiring monitoring", "The appliance is being used correctly", "No action needed"], correctAnswer: 1, explanation: "Gradual decrease indicates insulation degradation that should be monitored." }
];

const faqs = [
  { question: "Why is the minimum for Class II higher than Class I?", answer: "Class II appliances have no earth connection - they rely entirely on insulation for protection. The higher 2.0 megohm minimum provides additional safety margin since there is no backup protection." },
  { question: "Can insulation testing damage electronic equipment?", answer: "The 500V test can potentially damage sensitive electronic components. Some testers offer a 250V option for electronics. Always check manufacturer guidance for sensitive equipment." },
  { question: "What causes low insulation resistance readings?", answer: "Common causes include moisture ingress, contamination (dust, oil, chemicals), physical damage to insulation, overheating damage, and natural degradation over time." },
  { question: "How long should I apply the test voltage?", answer: "Most PAT testers apply voltage for a few seconds - long enough to get a stable reading. Very long application times are unnecessary and may stress insulation." },
  { question: "What if the reading fluctuates during testing?", answer: "Fluctuating readings may indicate marginal insulation condition, moisture, or poor test connections. Allow time for the reading to stabilise and investigate further if unstable." },
  { question: "Should I test Class III equipment?", answer: "Class III (SELV) equipment operates at safety extra-low voltage and may not require the same testing. Check the specific requirements and manufacturer guidance." }
];

const PATTestingModule4Section2 = () => {
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
            <span>Module 4 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Insulation Resistance Testing
          </h1>
          <p className="text-white/80">
            Testing insulation integrity in Class I and II appliances
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Verify insulation integrity</li>
              <li><strong>Test voltage:</strong> 500V DC (250V for electronics)</li>
              <li><strong>Class I minimum:</strong> 1.0 megohm</li>
              <li><strong>Class II minimum:</strong> 2.0 megohms</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>L-N connected:</strong> Tested to earth (Class I)</li>
              <li><strong>Switch ON:</strong> Include switch in test circuit</li>
              <li><strong>New appliances:</strong> Typically 10+ megohms</li>
              <li><strong>Monitor:</strong> Declining values over time</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose of insulation resistance testing",
              "Describe test procedures for Class I and II appliances",
              "State minimum acceptable values for each class",
              "Identify common causes of low IR readings",
              "Interpret test results correctly",
              "Recognise limitations and precautions"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Purpose of Insulation Resistance Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Purpose of Insulation Resistance Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulation resistance testing verifies that the insulation separating live conductors from accessible parts and earth is in good condition. Healthy insulation should have very high resistance - millions of ohms (megohms).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The test detects:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Breakdown:</strong> Deterioration of insulation materials</li>
                <li><strong>Moisture:</strong> Condensation inside the appliance</li>
                <li><strong>Contamination:</strong> Dust, oil, or chemical deposits</li>
                <li><strong>Physical damage:</strong> Cracked or worn insulation</li>
                <li><strong>Heat damage:</strong> From overloading or poor ventilation</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Safety Critical:</strong> Low insulation resistance can allow leakage current to flow through unintended paths, creating shock hazards and potential fire risks.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Test Procedure - Class I Appliances */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Test Procedure - Class I Appliances
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For Class I appliances, insulation is tested between the live conductors (live and neutral connected together) and earth.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Step-by-Step Procedure:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Step 1 - Preparation:</strong> Disconnect from mains. Switch the appliance ON to include the switch in the test. Insert plug into tester.</li>
                <li><strong>Step 2 - Connection:</strong> The tester internally connects live and neutral together. The test measures resistance between this combined L-N and earth.</li>
                <li><strong>Step 3 - Apply Test Voltage:</strong> The tester applies 500V DC and measures the resulting current flow. From this, it calculates the insulation resistance.</li>
                <li><strong>Step 4 - Record Result:</strong> Reading should be at least 1.0 megohm. Higher is better. New appliances typically show 10+ megohms or display infinity/OL.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Why 500V DC?</strong> DC voltage is used because AC would charge any capacitance in the circuit, affecting readings. 500V provides adequate stress without damaging modern insulation materials.
              </p>
            </div>
          </div>
        </section>

        {/* Section 03: Test Procedure - Class II Appliances */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Test Procedure - Class II Appliances
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Class II appliances have no earth conductor, so the test is performed differently.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Class II Test Method:</p>
              <p className="text-sm text-white ml-4">
                A test probe is applied to accessible conductive parts while 500V DC is applied between L-N combined and the probe. This tests insulation to any point a user might touch.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Minimum Requirement:</p>
              <p className="text-sm text-white ml-4">
                Class II appliances must achieve at least 2.0 megohms - higher than Class I because there is no earth backup protection.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Test Points:</p>
              <p className="text-sm text-white ml-4">
                Apply probe to any accessible metal parts, decorative trim, screws, or other points that might become conductive.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Minimum Acceptable Values */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Minimum Acceptable Values
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Minimum Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Class I:</strong> 1.0 megohm minimum (has earth connection as backup)</li>
                <li><strong>Class II:</strong> 2.0 megohms minimum (no earth - relies entirely on insulation)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Interpretation Guide:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Infinity/OL:</strong> Excellent - insulation is in very good condition</li>
                <li><strong>&gt;10 megohms:</strong> Good - typical for new or well-maintained appliances</li>
                <li><strong>2-10 megohms:</strong> Acceptable but monitor for decline</li>
                <li><strong>1-2 megohms:</strong> Marginal for Class I, fail for Class II</li>
                <li><strong>&lt;1 megohm:</strong> Fail - appliance should not be used</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Common Causes of Low Readings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Common Causes of Low Readings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When insulation resistance is lower than acceptable, investigate these causes:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Moisture:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Condensation inside appliance</li>
                <li>Use in humid environments</li>
                <li>Water ingress from spills</li>
                <li>Storage in damp conditions</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Contamination:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Dust and dirt accumulation</li>
                <li>Oil or grease contamination</li>
                <li>Chemical exposure</li>
                <li>Carbon deposits</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Physical Damage:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Cracked or broken insulation</li>
                <li>Cable damage</li>
                <li>Internal wiring faults</li>
                <li>Impact damage</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Thermal Damage:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Overheating from overload</li>
                <li>Poor ventilation</li>
                <li>Aged insulation breakdown</li>
                <li>Heat damage near elements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Switch appliance ON before testing to include the switch in the circuit</li>
                <li>Allow reading to stabilise before recording</li>
                <li>Use 250V test for sensitive electronic equipment</li>
                <li>Compare results to previous tests to identify trends</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Testing with appliance switched OFF</strong> - may miss switch faults</li>
                <li><strong>Using 500V on sensitive electronics</strong> - may cause damage</li>
                <li><strong>Accepting marginal readings</strong> - without further investigation</li>
                <li><strong>Not testing Class II to accessible parts</strong> - incomplete test</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Insulation Resistance</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">TEST PARAMETERS</p>
                <ul className="space-y-0.5">
                  <li>Test voltage: 500V DC (250V for electronics)</li>
                  <li>L and N connected together</li>
                  <li>Measured to earth (Class I) or probe</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">MINIMUM VALUES</p>
                <ul className="space-y-0.5">
                  <li>Class I: 1.0 megohm minimum</li>
                  <li>Class II: 2.0 megohms minimum</li>
                  <li>New appliances: 10+ megohms typical</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">LOW READING CAUSES</p>
                <ul className="space-y-0.5">
                  <li>Moisture/contamination</li>
                  <li>Physical damage</li>
                  <li>Heat damage</li>
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
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default PATTestingModule4Section2;
