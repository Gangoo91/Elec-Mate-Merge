import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Testing One Component or Section at a Time - Module 7.3.3 | Level 2 Electrical Course";
const DESCRIPTION = "Isolate and confirm faults efficiently with step-by-step testing methodology.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Why is it important to test one component or section at a time?",
    options: ["It's faster", "To isolate the fault logically and avoid confusion", "It uses less equipment", "It's required by regulations"],
    correctIndex: 1,
    explanation: "Testing one section at a time allows systematic isolation of faults and prevents confusion from testing multiple variables simultaneously."
  },
  {
    id: 2,
    question: "In a ring final circuit, what would continuity testing reveal?",
    options: ["Power consumption", "Where continuity is lost indicating the fault location", "Voltage levels", "Current ratings"],
    correctIndex: 1,
    explanation: "Continuity testing in a ring final circuit reveals exactly where the circuit path is broken, indicating the fault location."
  },
  {
    id: 3,
    question: "Why is it risky to replace parts without testing first?",
    options: ["It's expensive", "You may replace working components and miss the real fault", "It takes longer", "It's against regulations"],
    correctIndex: 1,
    explanation: "Replacing parts without testing can result in replacing components that are actually working correctly while the real fault remains unfixed."
  }
];

const Module7Section3_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Why is it important to test one component or section at a time?",
      options: [
        "It uses less test equipment",
        "To isolate the fault logically and avoid confusion",
        "It's required by BS 7671",
        "It's faster than other methods"
      ],
      correctAnswer: 1,
      explanation: "Testing one section at a time allows systematic fault isolation and prevents the confusion that comes from testing multiple variables simultaneously."
    },
    {
      id: 2,
      question: "How does this method help isolate faults?",
      options: [
        "By testing everything at once",
        "By gradually narrowing down possibilities until the cause is identified",
        "By replacing components randomly",
        "By increasing test voltages"
      ],
      correctAnswer: 1,
      explanation: "This method systematically narrows down possibilities by confirming which sections work correctly and which contain faults."
    },
    {
      id: 3,
      question: "In a ring final circuit, what would continuity testing reveal?",
      options: [
        "Power consumption levels",
        "Exactly where continuity is lost, indicating fault location",
        "Voltage drop characteristics",
        "Load balancing effectiveness"
      ],
      correctAnswer: 1,
      explanation: "Continuity testing in a ring final progressively reveals where the circuit path is broken, pinpointing the fault location."
    },
    {
      id: 4,
      question: "Why is it risky to replace parts without testing first?",
      options: [
        "It increases costs unnecessarily",
        "You may replace working components and miss the real fault",
        "It violates warranty terms",
        "It requires special tools"
      ],
      correctAnswer: 1,
      explanation: "Without proper testing, you risk replacing components that are actually functioning correctly while the real fault source remains unaddressed."
    },
    {
      id: 5,
      question: "How can this method be applied to a simple lighting circuit?",
      options: [
        "Test all components simultaneously",
        "Test supply, then switch, then lamp holder in sequence",
        "Replace the lamp first",
        "Check only the distribution board"
      ],
      correctAnswer: 1,
      explanation: "In lighting circuits, test systematically: supply at board, then switch operation, then lamp holder, isolating each stage."
    },
    {
      id: 6,
      question: "True or False: Testing one section at a time is only useful in small circuits.",
      options: [
        "True - only for domestic circuits",
        "False - essential for both small domestic and complex industrial systems",
        "True - only for lighting circuits",
        "False - only for large installations"
      ],
      correctAnswer: 1,
      explanation: "This systematic approach is essential for all electrical systems, from simple domestic circuits to complex industrial installations."
    },
    {
      id: 7,
      question: "How does this approach save time?",
      options: [
        "By using faster test equipment",
        "By preventing wasted effort on replacing or repairing non-faulty components",
        "By reducing documentation requirements",
        "By eliminating the need for testing"
      ],
      correctAnswer: 1,
      explanation: "Systematic testing prevents time wasted on unnecessary component replacement and ensures effort focuses on actual faults."
    },
    {
      id: 8,
      question: "What should always be done after completing a test on one section?",
      options: [
        "Move immediately to the next section",
        "Record results and confirm whether that section is sound",
        "Replace any suspect components",
        "Reset all protective devices"
      ],
      correctAnswer: 1,
      explanation: "Always record test results and confirm the status of each section to build a clear picture of circuit condition."
    },
    {
      id: 9,
      question: "In the domestic example, what fault caused the lighting circuit to fail?",
      options: [
        "Faulty ceiling rose",
        "Loose line conductor at the switch",
        "Blown lamp",
        "Faulty distribution board"
      ],
      correctAnswer: 1,
      explanation: "Systematic testing revealed the loose line conductor at the switch was interrupting the circuit before reaching the lamp."
    },
    {
      id: 10,
      question: "In the factory example, what stage of testing revealed the motor windings had failed?",
      options: [
        "Initial visual inspection",
        "After confirming supply and control circuits were correct",
        "During control panel testing",
        "Before any testing began"
      ],
      correctAnswer: 1,
      explanation: "Only after systematically confirming the supply and control circuits were functioning correctly did motor winding testing reveal the actual fault."
    }
  ];

  const faqs = [
    {
      question: "Why test one section at a time?",
      answer: "To isolate the fault logically and avoid confusion."
    },
    {
      question: "Does this method save time?",
      answer: "Yes. It prevents wasted effort on replacing or repairing components that are not faulty."
    },
    {
      question: "Can it be used on large installations?",
      answer: "Yes. It is essential for both small domestic circuits and complex industrial systems."
    },
    {
      question: "What is important to do after each test?",
      answer: "Record results and confirm whether that section is sound."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Section 3</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Title Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 7</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 3.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Testing One Component or Section at a Time
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
              Isolate and confirm faults efficiently with step-by-step testing.
            </p>
          </header>

          {/* In 30 Seconds Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 space-y-1 text-sm list-disc pl-4">
              <li>Testing one section at a time prevents confusion and wasted effort.</li>
              <li>This structured method gradually narrows down fault locations.</li>
              <li>It prevents replacing working components while missing real faults.</li>
            </ul>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2 text-sm list-disc pl-4">
              <li>Explain why testing one part of a circuit at a time is effective for fault diagnosis.</li>
              <li>Describe how this method helps isolate faults in both simple and complex installations.</li>
              <li>Apply the principle systematically to different types of electrical circuits.</li>
              <li>Prevent wasted time and effort by focusing on actual fault locations.</li>
              <li>Build confidence through structured, logical testing approaches.</li>
            </ul>
          </section>

          {/* Why Testing One Section at a Time Works */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Why Testing One Section at a Time Works
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                This approach reduces variables and provides clear pass/fail results for each part of the circuit, building a logical picture of where faults lie.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Key Benefits</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li><strong className="text-white">Reduces complexity:</strong> Breaking circuits into manageable parts prevents overwhelm</li>
                  <li><strong className="text-white">Clear results:</strong> Each test gives definitive pass/fail for that section</li>
                  <li><strong className="text-white">Eliminates guesswork:</strong> Systematic approach prevents random testing</li>
                  <li><strong className="text-white">Builds confidence:</strong> Confirmed good sections focus effort on problem areas</li>
                  <li><strong className="text-white">Prevents damage:</strong> Avoids unnecessary work on functioning components</li>
                </ul>
              </div>

              <div className="p-3 rounded bg-white/5 text-sm">
                <strong className="text-white">Core principle:</strong> Isolate variables to identify the specific fault location accurately.
              </div>
            </div>
          </section>

          {/* How to Break Circuits into Sections */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              How to Break Circuits into Sections
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Divide circuits into logical sections: supply, control, and load components, with clear test points between each section.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Circuit Sections</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li><strong className="text-white">Supply section:</strong> Distribution board to first accessory or control</li>
                  <li><strong className="text-white">Control section:</strong> Switches, contactors, and protection devices</li>
                  <li><strong className="text-white">Load section:</strong> Final equipment and return paths</li>
                  <li><strong className="text-white">Protection section:</strong> Earth paths and RCD circuits</li>
                  <li><strong className="text-white">Interface points:</strong> Junction boxes, terminals, and connection points</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Examples by Circuit Type</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li><strong className="text-white">Lighting:</strong> Supply → Switch → Lamp holder → Return</li>
                  <li><strong className="text-white">Ring final:</strong> Supply → R1 → Accessories → R2 → Return</li>
                  <li><strong className="text-white">Motor control:</strong> Supply → Control circuit → Contactor → Motor</li>
                </ul>
              </div>

              <div className="p-3 rounded bg-white/5 text-sm">
                <strong className="text-white">Logical division:</strong> Each section should have clear input/output points for testing.
              </div>
            </div>
          </section>

          <InlineCheck
            id="testing-sections-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Method: Isolate, Test, Record, Conclude */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Method: Isolate, Test, Record, Conclude
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Follow a systematic four-step process for each section to ensure thorough and accurate fault diagnosis.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-2">Four-Step Process</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li><strong className="text-white">Isolate:</strong> Safely disconnect the section from rest of circuit</li>
                  <li><strong className="text-white">Test:</strong> Apply appropriate tests (continuity, IR, polarity, functional)</li>
                  <li><strong className="text-white">Record:</strong> Document results clearly with pass/fail status</li>
                  <li><strong className="text-white">Conclude:</strong> Determine if fault is in this section or elsewhere</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Test Selection Criteria</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li><strong className="text-white">Continuity:</strong> For cable runs and connections</li>
                  <li><strong className="text-white">Insulation resistance:</strong> For cable and equipment integrity</li>
                  <li><strong className="text-white">Polarity:</strong> For correct conductor identification</li>
                  <li><strong className="text-white">Functional tests:</strong> For switches and control equipment</li>
                </ul>
              </div>

              <div className="p-3 rounded bg-white/5 text-sm">
                <strong className="text-white">Decision point:</strong> Only move to next section when current section status is confirmed.
              </div>
            </div>
          </section>

          <InlineCheck
            id="ring-final-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Practical Applications */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Practical Applications
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Apply systematic section testing to common circuit types with specific test points and procedures.
              </p>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5">
                  <p className="font-medium text-white text-sm mb-2">Lighting Circuit Testing</p>
                  <ul className="text-xs list-disc pl-4 space-y-1">
                    <li>Supply: Test voltage at distribution board MCB</li>
                    <li>Cable run: Continuity from board to switch</li>
                    <li>Switch: Operation and contact integrity</li>
                    <li>Switch to lamp: Continuity of switched live</li>
                    <li>Lamp holder: Connection integrity and function</li>
                    <li>Return path: Neutral continuity back to board</li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-white/5">
                  <p className="font-medium text-white text-sm mb-2">Ring Final Circuit Testing</p>
                  <ul className="text-xs list-disc pl-4 space-y-1">
                    <li>R1+R2 values: Test at each socket progressively</li>
                    <li>Ring continuity: Verify unbroken ring at each point</li>
                    <li>Cross connections: Check for leg transposition</li>
                    <li>Socket testing: Each outlet individually</li>
                    <li>Earth continuity: Verify CPC integrity throughout</li>
                    <li>Polarity verification: Correct L/N at each point</li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-white/5">
                  <p className="font-medium text-white text-sm mb-2">Industrial Control Circuit Testing</p>
                  <ul className="text-xs list-disc pl-4 space-y-1">
                    <li>Supply: Incoming power to control panel</li>
                    <li>Control circuit: Start/stop and interlock operation</li>
                    <li>Contactor: Coil operation and contact integrity</li>
                    <li>Motor supply: Power circuit from contactor to motor</li>
                    <li>Motor windings: Continuity and insulation resistance</li>
                    <li>Protection: Overload and earth fault systems</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded bg-white/5 text-sm">
                <strong className="text-white">Progressive testing:</strong> Each confirmed section narrows focus to remaining possibilities.
              </div>
            </div>
          </section>

          {/* Documentation and Repeatability */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Documentation and Repeatability
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Record results after each step to build a clear diagnostic picture and ensure the fault is properly resolved.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-teal-500/50">
                <p className="font-medium text-white mb-2">Documentation Requirements</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li><strong className="text-white">Test results:</strong> Record actual values, not just pass/fail</li>
                  <li><strong className="text-white">Section status:</strong> Clear indication of good/faulty for each part</li>
                  <li><strong className="text-white">Fault location:</strong> Precise identification of problem area</li>
                  <li><strong className="text-white">Remedial action:</strong> What was done to correct the fault</li>
                  <li><strong className="text-white">Verification testing:</strong> Confirm repair effectiveness</li>
                  <li><strong className="text-white">Final checks:</strong> Ensure all sections now function correctly</li>
                </ul>
              </div>

              <div className="p-3 rounded bg-white/5 text-sm">
                <strong className="text-white">Professional standard:</strong> Comprehensive records demonstrate systematic competence and aid future maintenance.
              </div>
            </div>
          </section>

          <InlineCheck
            id="replacement-risk-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Practical Guidance */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Best Practice Approach</p>
                <ul className="text-sm list-disc pl-4 space-y-1 text-white/80">
                  <li>Keep tests focused and targeted on one section</li>
                  <li>Record results after each test to build clear picture</li>
                  <li>Don't skip sections even if fault seems obvious</li>
                  <li>Use appropriate test methods for each section type</li>
                  <li>Progress systematically through logical sequence</li>
                  <li>Verify complete system operation after repair</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-amber-500/50">
                <p className="font-medium text-amber-400 mb-2">Common Mistakes to Avoid</p>
                <ul className="text-sm list-disc pl-4 space-y-1 text-white/80">
                  <li>Replacing parts without testing first</li>
                  <li>Testing too many things at once</li>
                  <li>Jumping around the circuit randomly</li>
                  <li>Not recording results after each test</li>
                  <li>Assuming sections are good without confirmation</li>
                  <li>Stopping testing once fault seems identified</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Examples
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Domestic Lighting Circuit Fault</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div>
                    <p className="text-elec-yellow font-medium mb-1">Situation</p>
                    <p>Lighting circuit stopped working. Inexperienced worker immediately replaced ceiling rose without testing.</p>
                  </div>
                  <div>
                    <p className="text-orange-400 font-medium mb-1">Tests Performed</p>
                    <p>Structured electrician tested: supply at board (✓), then switch operation (✗), then lamp holder (not reached).</p>
                  </div>
                  <div>
                    <p className="text-green-400 font-medium mb-1">Result</p>
                    <p>Testing revealed loose line conductor at switch, interrupting circuit. Fixed within minutes.</p>
                  </div>
                  <div>
                    <p className="text-purple-400 font-medium mb-1">Lesson</p>
                    <p>Section-by-section testing located fault immediately without replacing working components.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Factory Machine Motor Fault</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div>
                    <p className="text-elec-yellow font-medium mb-1">Situation</p>
                    <p>Factory machine would not start. Staff prepared to replace entire motor assembly.</p>
                  </div>
                  <div>
                    <p className="text-orange-400 font-medium mb-1">Tests Performed</p>
                    <p>Systematic testing: supply to panel (✓), control circuit (✓), contactor operation (✓), motor windings (✗).</p>
                  </div>
                  <div>
                    <p className="text-green-400 font-medium mb-1">Result</p>
                    <p>Motor windings failed continuity checks. Only motor needed replacement, not entire system.</p>
                  </div>
                  <div>
                    <p className="text-purple-400 font-medium mb-1">Lesson</p>
                    <p>Section testing avoided unnecessary work on functioning control systems and panels.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                  <p className="font-medium text-white mb-2">{faq.question}</p>
                  <p className="text-white/70 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Recap
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-white/5">
                <p className="font-medium text-elec-yellow text-sm mb-1">Systematic Isolation</p>
                <p className="text-xs text-white/70">Test one section at a time to isolate faults logically and efficiently.</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="font-medium text-green-400 text-sm mb-1">Record Everything</p>
                <p className="text-xs text-white/70">Document results after each test to build clear diagnostic picture.</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="font-medium text-orange-400 text-sm mb-1">Prevent Waste</p>
                <p className="text-xs text-white/70">Avoid replacing working components by confirming faults first.</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="font-medium text-purple-400 text-sm mb-1">Apply Universally</p>
                <p className="text-xs text-white/70">Method works for all systems from simple lighting to complex industrial.</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="font-medium text-teal-400 text-sm mb-1">Build Confidence</p>
                <p className="text-xs text-white/70">Structured approach provides certainty and professional competence.</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="font-medium text-red-400 text-sm mb-1">Stay Focused</p>
                <p className="text-xs text-white/70">Resist temptation to jump around - systematic progression saves time.</p>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="font-medium text-elec-yellow mb-1 text-sm">Key Success Factors</p>
              <p className="text-xs text-white/70">Master this disciplined testing approach - it transforms fault finding from guesswork into professional, efficient diagnosis.</p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz
              title="Knowledge Check: Testing One Component at a Time"
              questions={quizQuestions}
            />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full sm:w-auto text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back: Sequence of Operation
              </Link>
            </Button>
            <Button
              className="w-full sm:w-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-4">
                Next: Buzzing, Arcing & Sparking
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section3_3;
