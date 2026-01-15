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

const Module6Section5_3 = () => {
  useSEO(
    "Performing the Insulation Resistance Test - Level 2 Electrical Testing & Inspection",
    "Step-by-step procedures for conducting accurate insulation resistance tests"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What must be done before starting an insulation resistance test?",
      options: ["Start testing immediately", "Isolate circuit and prove dead", "Just switch off the lights", "Check the weather"],
      correctAnswer: 1,
      explanation: "The circuit must be safely isolated and proved dead before any insulation resistance testing can begin."
    },
    {
      id: 2,
      question: "Which instrument is used for insulation resistance testing?",
      options: ["Multimeter", "Insulation resistance tester (megger)", "Oscilloscope", "Clamp meter"],
      correctAnswer: 1,
      explanation: "An insulation resistance tester, commonly called a 'megger', is the specific instrument used for this type of testing."
    },
    {
      id: 3,
      question: "Which conductors are tested in a single-phase circuit?",
      options: ["Only line to earth", "Line to neutral, line to earth, neutral to earth", "Only neutral to earth", "Just the main cable"],
      correctAnswer: 1,
      explanation: "In a single-phase circuit, tests must be carried out between line and neutral, line and earth, and neutral and earth."
    },
    {
      id: 4,
      question: "What is the standard test voltage for insulation resistance tests on a 230 V circuit?",
      options: ["230 V", "500 V DC", "250 V", "1000 V"],
      correctAnswer: 1,
      explanation: "500 V DC is the standard test voltage for most low-voltage circuits including 230V installations."
    },
    {
      id: 5,
      question: "What does a high resistance reading indicate?",
      options: ["Faulty insulation", "Good insulation condition", "Low voltage", "Circuit overload"],
      correctAnswer: 1,
      explanation: "A high resistance reading indicates that the insulation is in good condition and effectively preventing current leakage."
    },
    {
      id: 6,
      question: "What does a low resistance reading suggest?",
      options: ["Perfect insulation", "Possible insulation damage or contamination", "High voltage", "Normal operation"],
      correctAnswer: 1,
      explanation: "A low resistance reading suggests potential insulation damage, contamination, moisture ingress, or deterioration."
    },
    {
      id: 7,
      question: "What should be done if an IR test result is below the required minimum?",
      options: ["Ignore it", "Investigate and rectify before energising", "Test again later", "Energise anyway"],
      correctAnswer: 1,
      explanation: "If results are below minimum requirements, the fault must be investigated and rectified before the circuit can be safely energised."
    },
    {
      id: 8,
      question: "True or False: Insulation resistance testing can be carried out on a live circuit.",
      options: ["True", "False", "Sometimes", "Only at low voltage"],
      correctAnswer: 1,
      explanation: "False. Insulation resistance testing must never be carried out on live circuits. The circuit must always be isolated first."
    },
    {
      id: 9,
      question: "Why is it important to record results immediately after testing?",
      options: ["It's not important", "To avoid forgetting or mixing up readings", "To impress the client", "To save time"],
      correctAnswer: 1,
      explanation: "Recording results immediately prevents confusion, ensures accuracy, and maintains proper documentation for compliance."
    },
    {
      id: 10,
      question: "In the real-world example, what caused the electrician to misinterpret the results?",
      options: ["Faulty equipment", "Bad weather", "Borrowed neutrals not properly isolated", "Wrong test voltage"],
      correctAnswer: 2,
      explanation: "The electrician failed to properly isolate borrowed neutrals between circuits, which affected the test readings and led to false conclusions."
    }
  ];

  const faqs = [
    {
      question: "Can a low reading always be assumed to mean damaged insulation?",
      answer: "No. Sometimes parallel connections, moisture, or testing errors can give misleading results. Always investigate before concluding."
    },
    {
      question: "What is the minimum acceptable insulation resistance according to BS 7671?",
      answer: "Generally 1 MΩ for most low-voltage circuits, but higher readings are expected in practice."
    },
    {
      question: "Should insulation resistance tests be carried out on live circuits?",
      answer: "Never. The circuit must always be isolated before testing."
    },
    {
      question: "How long should the test voltage be applied?",
      answer: "Typically for 60 seconds or until the reading stabilises, following the instrument manufacturer's instructions."
    },
    {
      question: "What environmental factors can affect test results?",
      answer: "Temperature, humidity, moisture, and contamination can all affect insulation resistance readings."
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
              <span className="text-white/60">Section 6.5.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Performing the Insulation Resistance Test
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Step-by-step procedures for conducting accurate insulation resistance tests
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="text-white/90 text-sm leading-relaxed mb-3">
              <strong className="text-elec-yellow">In 30 seconds:</strong> Isolate, prove dead, disconnect equipment. Test all conductor combinations. Use correct voltage (usually 500V DC). Record results immediately.
            </p>
            <ul className="text-white/80 text-sm space-y-1">
              <li>• <strong>Spot:</strong> Circuit isolation, equipment disconnection</li>
              <li>• <strong>Use:</strong> Correct test sequence and voltage</li>
              <li>• <strong>Check:</strong> Readings ≥1MΩ, investigate if low</li>
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
                  <span>Prepare a circuit correctly for insulation resistance testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Carry out the test in the correct sequence using a recognised procedure</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Interpret insulation resistance readings accurately</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Identify when results are satisfactory and when remedial action is required</span>
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
                Performing an insulation resistance (IR) test is a step-by-step process that requires accuracy, patience, and attention to safety. A rushed or poorly conducted test can produce misleading results, potentially leaving dangerous faults undiscovered.
              </p>
            </div>
          </section>

          {/* Preparing the Circuit */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Preparing the Circuit for Testing
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Before the test begins, the circuit must be safely isolated and confirmed dead. Any connected equipment, such as electronic controls, dimmer switches, or computers, must be disconnected or protected, as the test voltage could damage them.
              </p>
              <p>
                Neutrals should be disconnected if required to avoid parallel paths affecting the readings. This careful preparation ensures the test is valid and prevents harm to people or equipment.
              </p>
            </div>
          </section>

          <InlineCheck
            id="preparation-check"
            question="Why is it important to disconnect sensitive equipment before starting an insulation resistance test?"
            options={["To save time", "To prevent damage from high test voltages", "It's not necessary", "To get faster results"]}
            correctIndex={1}
            explanation="Sensitive electronic equipment must be disconnected because the high DC test voltages can permanently damage delicate electronic components."
          />

          {/* Connecting the Tester */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Connecting the Tester
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                The insulation resistance tester is connected between the conductors under examination. For a single-phase circuit, this means testing between line and neutral, line and earth, and neutral and earth.
              </p>
              <p>
                For three-phase systems, tests should be carried out between all line conductors and between each line and earth. The test leads must be securely connected, and care should be taken to avoid contact with exposed parts while the tester is operating.
              </p>
            </div>
          </section>

          <InlineCheck
            id="connection-check"
            question="What conductor combinations should be tested in a single-phase circuit?"
            options={["Only line to earth", "Line to neutral, line to earth, neutral to earth", "Only neutral to earth", "Just the main cable"]}
            correctIndex={1}
            explanation="In a single-phase circuit, all three combinations must be tested: line to neutral, line to earth, and neutral to earth to ensure complete insulation integrity."
          />

          {/* Carrying Out the Test */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Carrying Out the Test
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Once everything is prepared, the tester is set to the correct voltage - usually 500V DC for most circuits. The "test" button is pressed, and the instrument applies the voltage across the conductors. The display shows the insulation resistance in megaohms (MΩ).
              </p>
              <p>
                A good reading should be high, often well above the minimum values required by BS 7671 (generally 1MΩ or higher). The test should be repeated for each conductor combination, with the results recorded immediately.
              </p>
            </div>
          </section>

          <InlineCheck
            id="testing-check"
            question="What is the usual test voltage for insulation resistance testing on a standard 230 V circuit?"
            options={["230 V", "500 V DC", "250 V", "1000 V"]}
            correctIndex={1}
            explanation="500 V DC is the standard test voltage for most low-voltage circuits including standard 230V installations."
          />

          {/* Interpreting Results */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Interpreting the Results
            </h2>
            <div className="text-white/80 space-y-6 leading-relaxed">
              <p>
                A high resistance reading means that the insulation is sound and the circuit is safe to energise. A reading that is close to or below the minimum value indicates a potential fault such as moisture, contamination, or physical damage to the cable.
              </p>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-red-400 mb-3">If Results Are Unsatisfactory</h3>
                <ul className="text-sm space-y-2">
                  <li>• Repeat the test to confirm the result</li>
                  <li>• Investigate further before energising the circuit</li>
                  <li>• Never leave a circuit with unsatisfactory results connected</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="interpretation-check"
            question="What action must be taken if an insulation resistance reading falls below the required minimum value?"
            options={["Ignore it", "Investigate and rectify before energising", "Test again later", "Energise anyway"]}
            correctIndex={1}
            explanation="If readings are below minimum requirements, the circuit must not be energised until the fault has been investigated and rectified to ensure safety."
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
                <span>Always label circuits being tested to avoid confusion when recording results</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>Use insulated test leads in good condition and check them for damage</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>Record results as you go rather than relying on memory</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>If unexpected results appear, double-check the setup before assuming the circuit is faulty</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>Never ignore borderline readings - investigate until you are certain the circuit is safe</span>
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
              <p className="text-white font-medium mb-3">School Refurbishment - Borrowed Neutral Issue</p>
              <div className="text-white/80 text-sm space-y-3 leading-relaxed">
                <p>
                  On a school refurbishment project, an electrician performed IR tests but failed to properly isolate borrowed neutrals between two lighting circuits. As a result, the readings were lower than expected, but he assumed the insulation was defective and began rewiring part of the system unnecessarily.
                </p>
                <p>
                  Later, another electrician identified the borrowed neutral issue, corrected it, and repeated the test, which gave satisfactory readings. The mistake wasted time, materials, and money for the contractor.
                </p>
                <p className="font-medium text-green-400 mt-3">
                  Lesson: Careful preparation and correct testing procedure are essential to avoid false readings and unnecessary work.
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
                <h3 className="font-medium text-elec-yellow mb-2 text-sm">Preparation</h3>
                <p className="text-white/70 text-xs">Isolate circuit, prove dead, and disconnect all sensitive equipment</p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h3 className="font-medium text-green-400 mb-2 text-sm">Connection</h3>
                <p className="text-white/70 text-xs">Test all conductor combinations with secure test lead connections</p>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h3 className="font-medium text-blue-400 mb-2 text-sm">Testing</h3>
                <p className="text-white/70 text-xs">Apply correct voltage (usually 500V DC) and record results immediately</p>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-red-400 mb-2 text-sm">Interpretation</h3>
                <p className="text-white/70 text-xs">High readings = good insulation, low readings require investigation</p>
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
              <Link to="../5-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Equipment & Safety
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-4">
                Next: Interpreting Results
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section5_3;
