import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Touch Current and Leakage Testing - PAT Testing Course";
const DESCRIPTION = "Learn about touch current and leakage current testing methods for advanced PAT testing scenarios.";

const quickCheckQuestions = [
  {
    id: "m4s4-check1",
    question: "What is the maximum acceptable protective earth conductor current for a Class I appliance?",
    options: ["0.25mA", "0.75mA", "3.5mA", "10mA"],
    correctIndex: 2,
    explanation: "The maximum acceptable protective earth conductor current for Class I appliances is 3.5mA. Values higher than this indicate excessive leakage through the earth path."
  },
  {
    id: "m4s4-check2",
    question: "What is the maximum acceptable touch current for a Class II appliance?",
    options: ["0.25mA", "0.75mA", "3.5mA", "5mA"],
    correctIndex: 0,
    explanation: "Class II appliances have a stricter limit of 0.25mA touch current because they have no earth connection - all protection comes from insulation."
  },
  {
    id: "m4s4-check3",
    question: "Why is leakage testing sometimes preferred over insulation resistance testing?",
    options: ["It is faster to perform", "It tests under operating voltage conditions", "It requires cheaper equipment", "It does not require disconnection"],
    correctIndex: 1,
    explanation: "Leakage testing is performed at or near operating voltage, which more accurately represents real-world conditions. Insulation that passes at 500V DC might have different characteristics under AC operating conditions."
  }
];

const quizQuestions = [
  { id: 1, question: "What does touch current testing measure?", options: ["Current through the live conductor", "Current that could flow through a person touching the appliance", "Current through the neutral", "Total power consumption"], correctAnswer: 1, explanation: "Touch current measures the current that could flow through a person touching the appliance." },
  { id: 2, question: "Maximum protective earth conductor current for Class I is:", options: ["0.25mA", "0.75mA", "3.5mA", "10mA"], correctAnswer: 2, explanation: "The maximum protective earth conductor current for Class I is 3.5mA." },
  { id: 3, question: "Maximum touch current for Class II appliances is:", options: ["0.25mA", "0.75mA", "3.5mA", "5mA"], correctAnswer: 0, explanation: "Class II appliances have a stricter 0.25mA touch current limit." },
  { id: 4, question: "Why is touch current testing valuable for Class II appliances?", options: ["They have no insulation resistance test", "There is no earth to measure earth leakage", "It is required by law", "It is faster than other tests"], correctAnswer: 1, explanation: "Class II appliances have no earth, so touch current is the relevant measurement." },
  { id: 5, question: "At what voltage is leakage testing typically performed?", options: ["500V DC", "40V AC", "Mains operating voltage (230V AC)", "1000V DC"], correctAnswer: 2, explanation: "Leakage testing is performed at mains operating voltage (230V AC)." },
  { id: 6, question: "High leakage current could indicate:", options: ["A well-insulated appliance", "Moisture ingress or insulation breakdown", "The appliance is energy efficient", "Normal operation"], correctAnswer: 1, explanation: "High leakage current typically indicates moisture or insulation problems." },
  { id: 7, question: "Which test provides results closest to real operating conditions?", options: ["Earth continuity", "Insulation resistance at 500V", "Touch current at operating voltage", "Visual inspection"], correctAnswer: 2, explanation: "Touch current testing at operating voltage provides the most realistic conditions." },
  { id: 8, question: "Substitute leakage testing is useful for:", options: ["All appliances", "Class I appliances that cannot be powered on", "Class II appliances only", "Extension leads only"], correctAnswer: 1, explanation: "Substitute leakage testing is used when the appliance cannot be safely powered on." },
  { id: 9, question: "The lethal threshold of electric current is approximately:", options: ["1mA", "10mA", "30mA", "100mA"], correctAnswer: 2, explanation: "Around 30mA is considered potentially lethal, which is why RCDs trip at this level." },
  { id: 10, question: "Touch current limits are stricter for Class II because:", options: ["They use more power", "They have no earth protection backup", "They are always hand-held", "Regulations require it"], correctAnswer: 1, explanation: "Class II has no earth backup, so stricter limits are needed for insulation protection." }
];

const faqs = [
  { question: "Why are there different limits for Class I and Class II?", answer: "Class I appliances have earth as backup protection - if insulation fails, the earth carries fault current. Class II has no earth, so stricter limits ensure insulation alone provides adequate protection." },
  { question: "When should I use leakage testing instead of insulation resistance?", answer: "Leakage testing is preferred when testing at operating voltage is important, for medical equipment, or when insulation resistance testing at 500V might damage sensitive electronics." },
  { question: "Can high leakage current cause RCD tripping?", answer: "Yes. If leakage current exceeds 30mA (typical RCD sensitivity), it can cause nuisance tripping. Multiple appliances with moderate leakage on one circuit can also cause trips." },
  { question: "What is substitute leakage testing?", answer: "A method where the appliance is not powered from mains. The tester applies voltage between shorted L-N and earth to measure leakage. Useful for appliances that cannot be safely powered on." },
  { question: "Is 3.5mA dangerous?", answer: "While 3.5mA can be felt and is uncomfortable, it is below the typical let-go threshold (around 10mA). However, it indicates significant insulation deterioration requiring investigation." },
  { question: "Do I need to test touch current on all appliances?", answer: "Touch current testing is particularly valuable for Class II appliances and IT equipment. Many PAT testing schedules use insulation resistance for general testing and reserve touch current for specific applications." }
];

const PATTestingModule4Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
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
            <span>Module 4 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Touch Current and Leakage Testing
          </h1>
          <p className="text-white/80">
            Advanced current measurement techniques for safety testing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Measure current that could flow through a person</li>
              <li><strong>Class I limit:</strong> 3.5mA earth conductor current</li>
              <li><strong>Class II limit:</strong> 0.25mA touch current</li>
              <li><strong>Test voltage:</strong> Operating voltage (230V AC)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Class II:</strong> Touch current is the key test</li>
              <li><strong>Electronics:</strong> Less stress than 500V insulation test</li>
              <li><strong>RCD:</strong> Consider cumulative leakage on circuits</li>
              <li><strong>Substitute:</strong> For appliances that cannot power on</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the difference between earth leakage and touch current",
              "State maximum acceptable current values for each class",
              "Describe when leakage testing is preferred",
              "Perform touch current measurements safely",
              "Interpret leakage test results",
              "Understand the relationship between leakage and RCD operation"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Understanding Leakage Current */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Leakage Current
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              All electrical appliances have some level of leakage current - small currents that flow through insulation, filters, and surge suppressors. This is normal, but excessive leakage indicates problems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Normal Sources:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>EMC filters in electronics</li>
                <li>Surge protection components</li>
                <li>Capacitive coupling</li>
                <li>Minor insulation imperfections</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Abnormal Sources:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Moisture contamination</li>
                <li>Insulation breakdown</li>
                <li>Carbon tracking</li>
                <li>Component failure</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Types of Leakage Tests */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Types of Leakage Tests
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Protective Earth Conductor Current (Class I):</p>
              <p className="text-sm text-white ml-4 mb-2">
                Measures current flowing through the earth conductor when the appliance is operating. This is the current that would flow to earth during a fault.
              </p>
              <p className="text-sm text-white ml-4"><strong>Maximum: 3.5mA</strong></p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Touch Current (Class II and accessible parts):</p>
              <p className="text-sm text-white ml-4 mb-2">
                Measures current that would flow through a person touching the appliance. Critical for Class II where there is no earth protection.
              </p>
              <p className="text-sm text-white ml-4"><strong>Maximum: 0.25mA (Class II) / 0.75mA (Class I accessible parts)</strong></p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Substitute Leakage Test:</p>
              <p className="text-sm text-white ml-4">
                Used when the appliance cannot be powered on. Tests leakage by applying voltage between shorted L-N and earth without mains power. Useful for damaged appliances or initial fault finding.
              </p>
            </div>
          </div>
        </section>

        {/* Section 03: Current Limits and Safety */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Current Limits and Safety
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Maximum Limits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Class I earth conductor current:</strong> 3.5mA</li>
                <li><strong>Class I touch current:</strong> 0.75mA</li>
                <li><strong>Class II touch current:</strong> 0.25mA</li>
                <li><strong>Substitute leakage (Class I):</strong> 3.5mA</li>
                <li><strong>Substitute leakage (Class II):</strong> 0.25mA</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Human Sensitivity to Current:</strong>
              </p>
              <ul className="text-sm text-white space-y-1 mt-2">
                <li><strong>0.5mA:</strong> Threshold of perception</li>
                <li><strong>1-2mA:</strong> Slight tingling sensation</li>
                <li><strong>5-10mA:</strong> Painful but can let go</li>
                <li><strong>10-30mA:</strong> Muscular contraction - may not be able to let go</li>
                <li><strong>30mA+:</strong> RCD trip threshold - potentially dangerous</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: When to Use Leakage Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            When to Use Leakage Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Leakage testing is preferred in certain situations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Use Leakage Testing For:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Class II appliances (touch current)</li>
                <li>IT equipment with EMC filters</li>
                <li>Medical/dental equipment</li>
                <li>Equipment sensitive to 500V DC</li>
                <li>When RCD compatibility is important</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Benefits Over Insulation Test:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Tests at real operating voltage</li>
                <li>Includes EMC filter effects</li>
                <li>More realistic for electronics</li>
                <li>Relates to RCD operation</li>
                <li>Lower stress on components</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use touch current testing for Class II appliances</li>
                <li>Consider leakage testing for sensitive electronics</li>
                <li>Use substitute test when appliance cannot be powered</li>
                <li>Consider total leakage when multiple items share an RCD</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring high leakage</strong> - that is still within limits</li>
                <li><strong>Not considering cumulative leakage</strong> - on circuits</li>
                <li><strong>Using only insulation test</strong> - for Class II equipment</li>
                <li><strong>Applying Class I limits</strong> - to Class II appliances</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Leakage Limits</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">CLASS I LIMITS</p>
                <ul className="space-y-0.5">
                  <li>Earth conductor: 3.5mA max</li>
                  <li>Touch current: 0.75mA max</li>
                  <li>Substitute leakage: 3.5mA max</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">CLASS II LIMITS</p>
                <ul className="space-y-0.5">
                  <li>Touch current: 0.25mA max</li>
                  <li>Substitute leakage: 0.25mA max</li>
                  <li>Stricter due to no earth protection</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">RCD CONSIDERATION</p>
                <ul className="space-y-0.5">
                  <li>30mA RCD threshold</li>
                  <li>Consider cumulative leakage</li>
                  <li>Multiple items add up</li>
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
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default PATTestingModule4Section4;
