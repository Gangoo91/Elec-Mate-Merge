import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Module6Section5_1 = () => {
  useSEO(
    "Purpose of Insulation Resistance Testing - Level 2 Electrical Testing & Inspection",
    "Understanding why insulation resistance testing is necessary for safety and compliance with BS 7671"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of insulation resistance testing?",
      options: ["To measure voltage", "To ensure insulation prevents leakage currents", "To test circuit breakers", "To check cable capacity"],
      correctAnswer: 1,
      explanation: "Insulation resistance testing ensures that the insulation on cables and equipment is sound and prevents dangerous leakage currents."
    },
    {
      id: 2,
      question: "What does a high insulation resistance reading mean?",
      options: ["Insulation is damaged", "Insulation is good and preventing current leakage", "Circuit is overloaded", "Test equipment is faulty"],
      correctAnswer: 1,
      explanation: "A high insulation resistance reading indicates that the insulation is in good condition and effectively preventing current leakage."
    },
    {
      id: 3,
      question: "What does a low reading indicate?",
      options: ["Good insulation", "Insulation has been damaged or is contaminated", "Normal operation", "High voltage"],
      correctAnswer: 1,
      explanation: "A low insulation resistance reading suggests that the insulation has been damaged, contaminated, or is beginning to fail."
    },
    {
      id: 4,
      question: "Which regulation requires electrical systems to be kept safe at all times?",
      options: ["BS 7671", "Electricity at Work Regulations 1989", "Health and Safety at Work Act", "Building Regulations"],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations 1989 make it a legal duty to ensure electrical systems are maintained in a safe condition."
    },
    {
      id: 5,
      question: "Which certificate records insulation resistance test results for new installations?",
      options: ["Minor Works Certificate", "Electrical Installation Certificate (EIC)", "EICR", "PAT Certificate"],
      correctAnswer: 1,
      explanation: "The Electrical Installation Certificate (EIC) is used to record test results for new electrical installations."
    },
    {
      id: 6,
      question: "True or False: Insulation resistance testing is optional on minor works.",
      options: ["True", "False", "Only sometimes", "Depends on the client"],
      correctAnswer: 1,
      explanation: "False. Even minor works must undergo insulation resistance testing to prove the system is safe and compliant."
    },
    {
      id: 7,
      question: "What instrument is typically used to carry out the test?",
      options: ["Multimeter", "Insulation resistance tester (megger)", "Oscilloscope", "Clamp meter"],
      correctAnswer: 1,
      explanation: "An insulation resistance tester, commonly called a 'megger', is used to apply high DC voltage and measure resistance."
    },
    {
      id: 8,
      question: "Why must sensitive equipment be disconnected before testing?",
      options: ["To save time", "To avoid damage from high test voltages", "It's not necessary", "To get accurate readings"],
      correctAnswer: 1,
      explanation: "Sensitive electronic equipment must be disconnected because the high test voltages used could damage delicate components."
    },
    {
      id: 9,
      question: "What must an electrician do if a test result is unsatisfactory?",
      options: ["Continue with energising", "Record and ignore", "Do not energise until fault is rectified", "Test again later"],
      correctAnswer: 2,
      explanation: "If test results are unsatisfactory, the circuit must not be energised until the fault has been identified and rectified."
    },
    {
      id: 10,
      question: "In the real-world example, what was the consequence of skipping insulation resistance testing?",
      options: ["Nothing happened", "Moisture caused nuisance tripping and fire", "Client was happy", "Work was completed faster"],
      correctAnswer: 1,
      explanation: "Skipping testing led to moisture ingress causing RCD tripping and eventual fire, plus reputational and financial damage."
    }
  ];

  const faqs = [
    {
      question: "Do you need to test every circuit?",
      answer: "Yes. All new or modified circuits must be tested to prove their safety and compliance with BS 7671."
    },
    {
      question: "Can insulation resistance testing damage equipment?",
      answer: "Yes. Sensitive devices such as dimmers, electronic controls, or IT equipment should be disconnected before the test to prevent damage from high test voltages."
    },
    {
      question: "Is insulation resistance testing required for minor works?",
      answer: "Yes. Even small alterations must be tested to prove the system is safe and meets regulatory requirements."
    },
    {
      question: "What voltage is typically used for insulation resistance testing?",
      answer: "Test voltages are typically 250V DC, 500V DC, or 1000V DC depending on the system voltage and BS 7671 requirements."
    },
    {
      question: "How often should insulation resistance testing be carried out?",
      answer: "Testing is required for all new work, alterations, and during periodic inspections. The frequency of periodic testing depends on the type of installation and environment."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.5.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Purpose of Insulation Resistance Testing
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding why insulation resistance testing is necessary for safety and compliance with BS 7671
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="text-white/90 text-sm leading-relaxed mb-3">
              <strong className="text-elec-yellow">In 30 seconds:</strong> IR testing prevents dangerous leakage currents. It's a legal requirement under BS 7671 and EAWR 1989. High readings = good insulation, low = damage. Must test before energising any circuit.
            </p>
            <ul className="text-white/80 text-sm space-y-1">
              <li>• <strong>Spot:</strong> Moisture damage, cable wear, poor installation</li>
              <li>• <strong>Use:</strong> Insulation resistance tester (megger), proper procedures</li>
              <li>• <strong>Check:</strong> Readings meet BS 7671 minimums, record results</li>
            </ul>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <div className="text-white/80 space-y-3 leading-relaxed">
              <p className="text-white/70 mb-4">By the end of this subsection, learners will be able to:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Explain why insulation resistance testing is necessary for safety and compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Describe what the test measures and what different results mean</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Understand how IR testing is linked to BS 7671 and the law</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Recognise the consequences of not carrying out or recording the test</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Introduction
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Insulation resistance (IR) testing is one of the most important checks in electrical installation work. It verifies that the insulation between conductors, and between conductors and earth, is in good condition and able to prevent leakage currents that could cause electric shock or fire. Without this test, defects may remain hidden within the system until they lead to a serious incident.
              </p>
            </div>
          </section>

          {/* Why IR Testing is Essential */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Why Insulation Resistance Testing is Essential
            </h2>
            <div className="text-white/80 space-y-6 leading-relaxed">
              <p>
                Insulation resistance testing is carried out to ensure that the insulation on cables and equipment is sound. Over time, insulation can deteriorate due to various factors including age, heat, moisture, mechanical damage, chemical contamination, or UV exposure.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Types of Insulation Failure</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Complete breakdown:</strong> Total failure creating a direct fault path</li>
                  <li>• <strong>Gradual deterioration:</strong> Slow reduction in insulation effectiveness</li>
                  <li>• <strong>Moisture ingress:</strong> Water penetration reducing insulation properties</li>
                  <li>• <strong>Mechanical damage:</strong> Physical damage from drilling, crushing, or rodent attack</li>
                  <li>• <strong>Thermal degradation:</strong> Heat damage from overloading or poor connections</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-red-400 mb-3">Consequences of Poor Insulation</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Electric shock:</strong> Leakage current can cause fatal electric shock</li>
                  <li>• <strong>Fire risk:</strong> High resistance faults can generate heat, leading to fire</li>
                  <li>• <strong>Equipment damage:</strong> Leakage currents can damage electronic equipment</li>
                  <li>• <strong>Nuisance tripping:</strong> RCDs may trip frequently due to earth leakage</li>
                  <li>• <strong>Energy waste:</strong> Leakage currents increase energy consumption</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <p className="text-sm font-medium text-elec-yellow">
                  It is not just a formality - it is a legal requirement under the Electricity at Work Regulations 1989 and a fundamental step in keeping people safe.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="essential-check"
            question="Why is it unsafe to energise a circuit without carrying out insulation resistance testing first?"
            options={["It wastes time", "Hidden insulation faults could cause fire or shock", "It's not required", "Equipment might not work"]}
            correctIndex={1}
            explanation="Without testing, hidden insulation faults could remain undetected, leading to dangerous leakage currents that could cause fire, electric shock, or injury when the circuit is energised."
          />

          {/* What the Test Measures */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              What the Test Measures
            </h2>
            <div className="text-white/80 space-y-6 leading-relaxed">
              <p>
                The insulation resistance test applies a high DC voltage, typically 250V, 500V, or 1000V depending on the circuit voltage. The instrument measures the resistance to current flow through the insulation material between conductors.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Test Combinations Required</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Line to Neutral:</strong> Tests insulation between live conductors</li>
                  <li>• <strong>Line to Earth:</strong> Tests insulation between live conductor and earth</li>
                  <li>• <strong>Neutral to Earth:</strong> Tests insulation between neutral and earth</li>
                  <li>• <strong>Line to Line:</strong> In three-phase systems, tests between phases</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h3 className="font-medium text-green-400 mb-3">Interpreting Results</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Good Insulation:</strong> Readings in hundreds of MΩ or higher</li>
                  <li>• <strong>Acceptable:</strong> Above minimum values specified in BS 7671</li>
                  <li>• <strong>Poor:</strong> Close to or below minimum acceptable values</li>
                  <li>• <strong>Failed:</strong> Below minimum values - circuit must not be energised</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="measures-check"
            question="What does a very low insulation resistance reading suggest about the condition of the cable?"
            options={["Cable is in perfect condition", "Insulation is damaged or contaminated", "Test equipment is working", "Voltage is correct"]}
            correctIndex={1}
            explanation="A very low insulation resistance reading indicates that the insulation has been damaged, contaminated with moisture, or is deteriorating and failing to prevent current leakage."
          />

          {/* Link to BS 7671 and Legal Requirements */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              BS 7671 and Legal Requirements
            </h2>
            <div className="text-white/80 space-y-6 leading-relaxed">
              <p>
                The requirement to carry out insulation resistance testing is clearly set out in BS 7671 (IET Wiring Regulations). Section 643 specifically covers insulation resistance testing and states that this test shall be applied to verify the insulation of electrical installations.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">When Testing is Required</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>New installations:</strong> All circuits before initial energisation</li>
                  <li>• <strong>Additions:</strong> New circuits added to existing installations</li>
                  <li>• <strong>Alterations:</strong> Modified circuits or significant changes</li>
                  <li>• <strong>Periodic inspections:</strong> Regular testing as part of EICR</li>
                  <li>• <strong>After maintenance:</strong> Following any work that could affect insulation</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <h3 className="font-medium text-orange-400 mb-3">Electricity at Work Regulations 1989</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Regulation 4:</strong> Systems shall be constructed, maintained and worked to prevent danger</li>
                  <li>• <strong>Regulation 14:</strong> No person shall work on equipment unless suitable precautions are taken</li>
                  <li>• <strong>Regulation 29:</strong> Defence to prove all reasonable steps were taken</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="legal-check"
            question="Which regulation requires employers and electricians to ensure that electrical systems remain safe at all times?"
            options={["BS 7671", "Electricity at Work Regulations 1989", "Health and Safety at Work Act", "Building Regulations"]}
            correctIndex={1}
            explanation="The Electricity at Work Regulations 1989 place a legal duty on employers and employees to ensure that electrical systems are maintained in a safe condition at all times."
          />

          {/* Consequences of Skipping IR Testing */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Consequences of Skipping IR Testing
            </h2>
            <div className="text-white/80 space-y-6 leading-relaxed">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-red-400 mb-3">Immediate Safety Risks</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Electric shock or electrocution:</strong> Compromised insulation can make surfaces live</li>
                  <li>• <strong>Fire hazards:</strong> High resistance faults generate heat, potentially igniting materials</li>
                  <li>• <strong>Equipment damage:</strong> Leakage currents can destroy electronic equipment</li>
                  <li>• <strong>System instability:</strong> RCDs may trip frequently, causing disruption</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Legal and Professional Consequences</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Criminal prosecution:</strong> Under the Electricity at Work Regulations 1989</li>
                  <li>• <strong>Civil liability:</strong> Compensation claims for injury or property damage</li>
                  <li>• <strong>Invalid insurance:</strong> Insurers may refuse claims for non-compliant work</li>
                  <li>• <strong>Professional sanctions:</strong> Disciplinary action by registration bodies</li>
                  <li>• <strong>Loss of competence status:</strong> Removal from approved contractor schemes</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="consequences-check"
            question="What are two possible consequences of not performing insulation resistance testing on an installation?"
            options={["Faster completion and happy clients", "Hidden faults leading to fire/shock and legal prosecution", "Better insulation and lower costs", "Improved performance and reliability"]}
            correctIndex={1}
            explanation="Not performing IR testing can lead to hidden faults causing fire or electric shock, and can result in legal prosecution for failing to meet statutory duties under EAWR 1989."
          />

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Always carry out insulation resistance tests before energising a new or modified circuit. Use the correct test instrument and follow the procedure in BS 7671. Sensitive equipment such as electronic devices should be disconnected before testing to avoid damage.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Key Testing Points</h3>
                <ul className="text-sm space-y-2">
                  <li>• Test between Line-Neutral, Line-Earth, and Neutral-Earth</li>
                  <li>• Use appropriate test voltage (250V, 500V, or 1000V DC)</li>
                  <li>• Disconnect sensitive equipment before testing</li>
                  <li>• Record actual measured values, not just pass/fail</li>
                  <li>• Ensure readings meet BS 7671 minimum requirements</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-white font-medium mb-3">Commercial Refurbishment Project</p>
              <div className="text-white/80 text-sm space-y-3 leading-relaxed">
                <p>
                  During a commercial refurbishment, a contractor assumed that new wiring installed by their team was in perfect condition and skipped the insulation resistance tests to save time. Weeks later, when the building was occupied, moisture from a roof leak seeped into a cable joint, lowering the insulation resistance dramatically.
                </p>
                <p>
                  This led to nuisance tripping of protective devices and an eventual small fire in a ceiling void. When the incident was investigated, the absence of recorded test results meant the contractor could not demonstrate compliance. They were forced to pay for retesting and repairs, as well as facing criticism from the client.
                </p>
                <p className="font-medium text-elec-yellow mt-3">
                  Lesson: Carrying out and recording insulation resistance tests protects lives, property, and professional credibility.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-white/10 rounded-lg px-4 bg-white/5"
                >
                  <AccordionTrigger className="text-white hover:text-elec-yellow text-left text-sm py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 text-sm pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Key Takeaways */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Key Takeaways
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <h3 className="font-medium text-elec-yellow mb-2 text-sm">Safety Purpose</h3>
                <p className="text-white/70 text-xs">IR testing ensures insulation prevents leakage currents that could cause fire, shock, or injury</p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h3 className="font-medium text-green-400 mb-2 text-sm">Legal Requirement</h3>
                <p className="text-white/70 text-xs">Required by BS 7671 and EAWR 1989. Results must be recorded on certificates</p>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h3 className="font-medium text-blue-400 mb-2 text-sm">Professional Protection</h3>
                <p className="text-white/70 text-xs">Proper testing protects from prosecution, invalid insurance, and reputation loss</p>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-red-400 mb-2 text-sm">Hidden Dangers</h3>
                <p className="text-white/70 text-xs">Without testing, dangerous faults remain hidden until causing fire, shock, or injury</p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Knowledge Check
            </h2>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Section 6.5
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-2">
                Next: Test Equipment & Safety
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section5_1;
