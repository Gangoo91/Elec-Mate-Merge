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

const Module6Section5_2 = () => {
  useSEO(
    "Test Equipment and Safety Considerations - Level 2 Electrical Testing & Inspection",
    "Understanding the correct equipment and safety precautions for insulation resistance testing"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What instrument is used to perform insulation resistance tests?",
      options: ["Multimeter", "Insulation resistance tester (megger)", "Oscilloscope", "Clamp meter"],
      correctAnswer: 1,
      explanation: "An insulation resistance tester, commonly called a 'megger', is the specific instrument used to perform insulation resistance tests."
    },
    {
      id: 2,
      question: "What voltages are commonly used during insulation resistance testing?",
      options: ["12V, 24V, 48V", "110V, 230V, 400V", "250V, 500V, 1000V DC", "50V, 100V, 200V"],
      correctAnswer: 2,
      explanation: "Test voltages of 250V DC, 500V DC, or 1000V DC are commonly used depending on the installation voltage and BS 7671 requirements."
    },
    {
      id: 3,
      question: "Why must circuits be isolated before testing?",
      options: ["To save battery power", "To ensure safety and accurate readings", "It's not necessary", "To speed up testing"],
      correctAnswer: 1,
      explanation: "Circuits must be isolated to ensure safety of personnel and equipment, and to obtain accurate test readings without interference from live circuits."
    },
    {
      id: 4,
      question: "Why should sensitive equipment be disconnected before testing?",
      options: ["To save time", "To prevent damage from high test voltages", "It makes no difference", "To get faster results"],
      correctAnswer: 1,
      explanation: "Sensitive electronic equipment must be disconnected because the high DC test voltages can permanently damage delicate electronic components."
    },
    {
      id: 5,
      question: "What does a warning light on a tester usually indicate?",
      options: ["Low battery", "Test voltage is present", "Test complete", "Equipment fault"],
      correctAnswer: 1,
      explanation: "The warning light indicates that test voltage is present and warns that the circuit is dangerous to touch during testing."
    },
    {
      id: 6,
      question: "True or False: It is safe to test a live circuit with an insulation resistance tester.",
      options: ["True", "False", "Sometimes", "Only at low voltage"],
      correctAnswer: 1,
      explanation: "False. It is never safe to test a live circuit with an insulation resistance tester. The circuit must always be isolated first."
    },
    {
      id: 7,
      question: "What must be done to a circuit after insulation resistance testing?",
      options: ["Nothing", "Discharge it to earth", "Test it again", "Leave it isolated"],
      correctAnswer: 1,
      explanation: "The circuit must be discharged to earth after testing to remove any stored energy that could cause shock or false readings."
    },
    {
      id: 8,
      question: "Name one risk of carrying out an IR test incorrectly.",
      options: ["Taking too long", "Damage to connected equipment", "Better accuracy", "Faster results"],
      correctAnswer: 1,
      explanation: "Incorrect IR testing can damage connected equipment, especially sensitive electronic devices that weren't disconnected before testing."
    },
    {
      id: 9,
      question: "Who is responsible for ensuring safe testing procedures are followed?",
      options: ["The client", "The electrician performing the test", "The supervisor only", "No one specific"],
      correctAnswer: 1,
      explanation: "The electrician performing the test is responsible for ensuring all safety procedures are followed correctly."
    },
    {
      id: 10,
      question: "In the real-world example, what mistake led to damage of computer equipment?",
      options: ["Wrong test voltage", "Testing without disconnecting sensitive equipment", "Faulty tester", "Testing too quickly"],
      correctAnswer: 1,
      explanation: "The apprentice tested without disconnecting computers, and the 500V DC test voltage damaged the computer power supplies."
    }
  ];

  const faqs = [
    {
      question: "What voltage is typically used for insulation resistance testing on standard low-voltage circuits?",
      answer: "500 V DC is typically used for most low-voltage circuits, though 250 V DC may be used where sensitive equipment is involved."
    },
    {
      question: "Can you carry out an insulation resistance test without isolating the supply?",
      answer: "No, the circuit must always be isolated and proved dead first. Testing live circuits is extremely dangerous and will give false readings."
    },
    {
      question: "Why must circuits be discharged after testing?",
      answer: "To remove any stored energy left in the insulation or equipment, which could otherwise give shocks or false readings in subsequent tests."
    },
    {
      question: "What safety equipment should be worn during IR testing?",
      answer: "Appropriate PPE including insulated gloves when required, and ensure all safety procedures are followed according to manufacturer's instructions."
    },
    {
      question: "How do you know if the test equipment is working correctly?",
      answer: "Check the instrument is properly calibrated, test leads are in good condition, and follow manufacturer's operational checks before use."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
              <span className="text-white/60">Section 6.5.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Test Equipment and Safety Considerations
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding the correct equipment and safety precautions for insulation resistance testing
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="text-white/90 text-sm leading-relaxed mb-3">
              <strong className="text-elec-yellow">In 30 seconds:</strong> Use insulation resistance tester (megger). Always isolate and prove dead first. Disconnect sensitive equipment before testing. Discharge circuit after testing.
            </p>
            <ul className="text-white/80 text-sm space-y-1">
              <li>• <strong>Spot:</strong> Calibrated tester, good test leads, warning lights</li>
              <li>• <strong>Use:</strong> Correct test voltage (250V/500V/1000V DC)</li>
              <li>• <strong>Check:</strong> Circuit isolated, equipment disconnected, PPE worn</li>
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
                  <span>Identify the correct instruments used for insulation resistance testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Understand how to set up and use the equipment safely</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Recognise the importance of isolating and preparing circuits before testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Apply safe working practices to prevent accidents or equipment damage</span>
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
                Before carrying out insulation resistance (IR) testing, electricians must be familiar with the correct equipment and understand the safety precautions involved. Using the wrong instrument, or failing to follow safe procedures, can result in inaccurate readings, damage to sensitive equipment, or even personal injury.
              </p>
            </div>
          </section>

          {/* Test Instruments */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Test Instruments for IR Testing
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                The main instrument used is the insulation resistance tester, often referred to as a "megger." This device applies a high DC voltage (commonly 250V, 500V, or 1000V depending on the installation being tested) across the conductors and measures the resistance to current flow.
              </p>
              <p>
                Modern testers are digital, lightweight, and include additional functions such as continuity testing. However, electricians must ensure the instrument is properly calibrated and rated for the voltage being tested.
              </p>
            </div>
          </section>

          <InlineCheck
            id="instruments-check"
            question="What is the typical instrument used to carry out insulation resistance testing?"
            options={["Multimeter", "Insulation resistance tester (megger)", "Oscilloscope", "Clamp meter"]}
            correctIndex={1}
            explanation="An insulation resistance tester, commonly called a 'megger', is the specific instrument designed to apply high DC voltages and measure insulation resistance."
          />

          {/* Preparing for Safe Testing */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Preparing for Safe Testing
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Before connecting the tester, the circuit must be isolated and proved dead. This involves switching off the supply, locking it off where possible, and verifying with a suitable voltage indicator that no voltage is present.
              </p>
              <p>
                All appliances, electronic devices, and sensitive equipment should be disconnected from the circuit to prevent damage from the test voltage. Failure to do this could result in equipment being permanently damaged or giving false readings.
              </p>
              <p>
                It is also important to ensure that the circuit is free from temporary connections, such as borrowed neutrals, which could interfere with the test.
              </p>
            </div>
          </section>

          <InlineCheck
            id="preparation-check"
            question="Why must sensitive equipment such as computers be disconnected before insulation resistance testing?"
            options={["To save time", "To prevent damage from high test voltages", "It's not necessary", "To get faster results"]}
            correctIndex={1}
            explanation="Sensitive electronic equipment must be disconnected because the high DC test voltages (250V-1000V) can permanently damage delicate electronic components."
          />

          {/* Safe Use of Test Equipment */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Safe Use of Test Equipment
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                When using an insulation resistance tester, always connect the leads securely to the conductors under test. The tester will generate a high DC voltage, so it should only be applied once all persons are clear of the circuit and informed that testing is about to begin.
              </p>
              <p>
                Many testers include a warning light to show that a test voltage is present. Once the test is complete, the circuit must be discharged to earth to remove any stored charge before it is reconnected.
              </p>
              <p>
                Electricians should also follow the manufacturer's operating instructions and wear suitable PPE such as insulated gloves when required.
              </p>
            </div>
          </section>

          <InlineCheck
            id="safety-use-check"
            question="What should be done to a circuit after an insulation resistance test has been completed?"
            options={["Nothing", "Discharge it to earth", "Test it again", "Leave it isolated"]}
            correctIndex={1}
            explanation="The circuit must be discharged to earth after testing to remove any stored energy that could cause shock or interfere with subsequent tests."
          />

          {/* Risks and Safety Considerations */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Risks and Safety Considerations
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-red-400 mb-3">Main Risks During IR Testing</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Accidental contact:</strong> Contact with test voltage can cause discomfort or harm</li>
                  <li>• <strong>Equipment damage:</strong> Connected equipment can be damaged by test voltages</li>
                  <li>• <strong>Misleading results:</strong> Poor preparation can produce invalid readings</li>
                  <li>• <strong>Stored charge:</strong> Capacitive charge can cause shocks after testing</li>
                </ul>
              </div>
              <p>
                To minimise these risks, electricians must follow safe isolation procedures, double-check all disconnections, and ensure test leads are in good condition. Maintaining concentration during testing is vital to avoid mistakes that could compromise safety.
              </p>
            </div>
          </section>

          <InlineCheck
            id="risks-check"
            question="What are two risks associated with insulation resistance testing if safety procedures are not followed?"
            options={["Faster testing and better results", "Accidental contact with test voltage and equipment damage", "Lower readings and more work", "No risks at all"]}
            correctIndex={1}
            explanation="The main risks are accidental contact with high test voltages (causing shock) and damage to sensitive connected equipment that wasn't properly disconnected."
          />

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance
            </h2>
            <div className="text-white/80 space-y-3 leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>Always verify that the circuit is isolated before connecting the tester</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>Use the correct test voltage: typically 500V DC for most LV circuits</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>Check the condition and calibration of the tester before use</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>Discharge the circuit after testing to remove stored energy</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>Never bypass safe isolation steps, even for "quick" tests</span>
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
              <p className="text-white font-medium mb-3">Commercial Site - Equipment Damage</p>
              <div className="text-white/80 text-sm space-y-3 leading-relaxed">
                <p>
                  On a commercial site, an apprentice connected an insulation resistance tester to a circuit without disconnecting several computers still plugged into sockets. The 500V DC test voltage damaged the computers' power supplies, costing the contractor several thousand pounds in replacement equipment.
                </p>
                <p>
                  The incident could have been avoided by isolating properly, disconnecting all sensitive equipment, and confirming the circuit was safe to test.
                </p>
                <p className="font-medium text-green-400 mt-3">
                  Lesson: Preparing the circuit correctly before testing is just as important as carrying out the test itself.
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
                <h3 className="font-medium text-elec-yellow mb-2 text-sm">Equipment</h3>
                <p className="text-white/70 text-xs">Use calibrated insulation resistance tester with correct voltage ratings</p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h3 className="font-medium text-green-400 mb-2 text-sm">Preparation</h3>
                <p className="text-white/70 text-xs">Always isolate, prove dead, and disconnect sensitive equipment</p>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h3 className="font-medium text-blue-400 mb-2 text-sm">Safety</h3>
                <p className="text-white/70 text-xs">Follow manufacturer instructions, use PPE, clear all personnel</p>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-red-400 mb-2 text-sm">After Testing</h3>
                <p className="text-white/70 text-xs">Discharge circuit to earth to remove stored energy</p>
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
              <Link to="../5-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Purpose of IR Testing
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-3">
                Next: Performing the Test
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section5_2;
