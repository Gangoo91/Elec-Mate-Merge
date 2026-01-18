import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Testing One Component or Section at a Time - Module 7.4.3 | Level 2 Electrical Course";
const DESCRIPTION = "Structured approach to fault diagnosis by testing individual components and circuit sections systematically.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Why should you test one component at a time instead of testing everything together?",
    options: ["It uses less equipment", "It prevents confusion and helps isolate faults logically", "It's faster overall", "It's required by regulations"],
    correctIndex: 1,
    explanation: "Testing one component at a time prevents confusion and allows you to isolate faults logically, building a clear picture of which sections are working correctly."
  },
  {
    id: 2,
    question: "In a socket ring final circuit, how should you test for continuity faults?",
    options: ["Test all sockets simultaneously", "Start at consumer unit and test individual accessories sequentially", "Test random sockets", "Replace all accessories first"],
    correctIndex: 1,
    explanation: "Start at the consumer unit and test individual accessories in sequence. If continuity is lost at a particular point, the fault lies between that accessory and the last one tested."
  },
  {
    id: 3,
    question: "What is the correct sequence for testing an industrial control system?",
    options: ["Motor → Control → Supply", "Supply → Control switches → Contactors → Motor windings", "Random component testing", "Replace everything systematically"],
    correctIndex: 1,
    explanation: "Test systematically: Supply → Control switches → Contactors → Motor windings. This logical progression helps quickly locate where the fault lies."
  },
  {
    id: 4,
    question: "What should you always do after completing each test?",
    options: ["Move to next component immediately", "Record results and build a clear picture", "Reset all equipment", "Replace the component"],
    correctIndex: 1,
    explanation: "Always record results after each test to build a clear picture of which sections are sound and which are not. This prevents confusion and guides the next steps."
  }
];

const Module7Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Why is it important to test one component or section at a time?",
      options: [
        "It uses less test equipment",
        "To isolate the fault logically and avoid confusion",
        "It's faster than other methods",
        "It reduces material costs"
      ],
      correctAnswer: 1,
      explanation: "Testing one component at a time helps isolate faults logically, prevents confusion, and builds a systematic understanding of which parts are working correctly."
    },
    {
      id: 2,
      question: "How does this method help isolate faults?",
      options: [
        "By replacing all components",
        "By confirming which sections work and which contain faults",
        "By using different test equipment",
        "By testing faster"
      ],
      correctAnswer: 1,
      explanation: "This method helps by confirming which sections of the circuit are working correctly and which contain faults, gradually narrowing down possibilities."
    },
    {
      id: 3,
      question: "In a ring final circuit, what would continuity testing reveal?",
      options: [
        "Voltage levels only",
        "The location where continuity is lost, indicating fault position",
        "Current flow patterns",
        "Insulation resistance values"
      ],
      correctAnswer: 1,
      explanation: "Continuity testing in a ring final circuit reveals where continuity is lost, indicating the fault must lie between that point and the last successful test location."
    },
    {
      id: 4,
      question: "Why is it risky to replace parts without testing first?",
      options: [
        "It's more expensive",
        "It may waste time replacing components that are not faulty",
        "It violates safety regulations",
        "It requires more tools"
      ],
      correctAnswer: 1,
      explanation: "Replacing parts without testing first may result in wasting time and money replacing components that are not actually faulty, while the real problem remains."
    },
    {
      id: 5,
      question: "How can this method be applied to a simple lighting circuit?",
      options: [
        "Test everything at once",
        "Test supply → switch → lamp holder in sequence",
        "Replace the lamp first",
        "Check only the consumer unit"
      ],
      correctAnswer: 1,
      explanation: "Apply the method by testing the lighting circuit in logical sequence: supply at the board → switch operation → lamp holder connections."
    },
    {
      id: 6,
      question: "True or False: Testing one section at a time is only useful in small circuits.",
      options: [
        "True - only for small domestic circuits",
        "False - it's essential for both small and large installations",
        "True - large circuits need different methods",
        "False - it's only for industrial systems"
      ],
      correctAnswer: 1,
      explanation: "False. Testing one section at a time is essential for both small domestic circuits and complex industrial systems - it's a fundamental diagnostic principle."
    },
    {
      id: 7,
      question: "How does this approach save time?",
      options: [
        "By using faster test equipment",
        "By preventing wasted effort on components that are not faulty",
        "By reducing documentation requirements",
        "By eliminating safety checks"
      ],
      correctAnswer: 1,
      explanation: "This approach saves time by preventing wasted effort on replacing or repairing components that are not faulty, focusing work only where needed."
    },
    {
      id: 8,
      question: "What should always be done after completing a test on one section?",
      options: [
        "Move immediately to the next section",
        "Record results and confirm whether that section is sound",
        "Replace the tested component",
        "Reset all test equipment"
      ],
      correctAnswer: 1,
      explanation: "Always record results and confirm whether that section is sound before moving on. This builds a clear picture of the system's condition."
    },
    {
      id: 9,
      question: "In the domestic example, what fault caused the lighting circuit to fail?",
      options: [
        "Faulty ceiling rose",
        "Line conductor loose at the switch",
        "Blown lamp",
        "Faulty consumer unit"
      ],
      correctAnswer: 1,
      explanation: "The fault was a loose line conductor at the switch, which was quickly identified by testing each section systematically rather than assuming the ceiling rose was faulty."
    },
    {
      id: 10,
      question: "In the factory example, what stage of testing revealed the motor windings had failed?",
      options: [
        "Supply testing stage",
        "Control circuit testing stage",
        "Motor continuity testing stage",
        "Protection device testing stage"
      ],
      correctAnswer: 2,
      explanation: "The motor continuity testing stage revealed the motor windings had failed. Testing in sequence confirmed supply and control were correct before identifying the motor fault."
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
              <span className="hidden sm:inline">Back to Section 4</span>
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
              <span className="text-white/60">Section 4.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Testing One Component or Section at a Time
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
              Structured approach to fault diagnosis by testing individual components and circuit sections systematically.
            </p>
          </header>

          {/* In 30 Seconds Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 space-y-1 text-sm">
              <li>• Testing one component at a time prevents confusion and wasted effort.</li>
              <li>• This method logically narrows down fault locations step by step.</li>
              <li>• It works effectively for both simple domestic and complex industrial circuits.</li>
            </ul>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2 leading-relaxed">
              <li>• Explain why testing one part of a circuit at a time is effective.</li>
              <li>• Describe how this method helps isolate faults systematically.</li>
              <li>• Apply the principle to both simple and more complex installations.</li>
              <li>• Demonstrate proper recording and progression techniques.</li>
              <li>• Identify when and where to apply component-by-component testing.</li>
            </ul>
          </section>

          {/* Section 1: Concept and Benefits */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Concept and Benefits of Component-by-Component Testing
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Testing one component or section at a time is a fundamental fault-finding principle that prevents confusion and builds confidence through systematic progression. This approach transforms complex circuit diagnosis into manageable, logical steps.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">Logical Progression</p>
                  <ul className="text-sm space-y-1">
                    <li>• Follow circuit path systematically</li>
                    <li>• Test in order of signal or power flow</li>
                    <li>• Confirm each stage before proceeding</li>
                    <li>• Build evidence progressively</li>
                    <li>• Avoid jumping between unrelated components</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">Fault Isolation Benefits</p>
                  <ul className="text-sm space-y-1">
                    <li>• Pinpoints exact fault location</li>
                    <li>• Prevents unnecessary component replacement</li>
                    <li>• Reduces diagnostic time significantly</li>
                    <li>• Eliminates guesswork and assumptions</li>
                    <li>• Builds technician confidence and competence</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Avoiding Common Diagnostic Pitfalls</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-sm mb-2">What NOT to Do</p>
                    <ul className="text-sm space-y-1">
                      <li>• Testing multiple components simultaneously</li>
                      <li>• Making assumptions about fault locations</li>
                      <li>• Replacing parts without confirmation</li>
                      <li>• Jumping around the circuit randomly</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-2">Systematic Approach</p>
                    <ul className="text-sm space-y-1">
                      <li>• Test one component completely before next</li>
                      <li>• Record all results systematically</li>
                      <li>• Confirm each stage is sound</li>
                      <li>• Follow logical circuit progression</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mt-6">
                <p className="text-sm">
                  <strong className="text-elec-yellow">Key principle:</strong> By testing components individually, electricians build a clear map of circuit condition, identifying exactly where normal operation breaks down and focusing repair efforts precisely where needed.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="m7-4-3-b1"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 2: Domestic Circuits */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Application to Domestic Circuits
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                In domestic installations, component-by-component testing prevents unnecessary work and quickly identifies faults in ring final circuits, lighting circuits, and consumer unit distribution systems.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10 my-6">
                <p className="font-medium text-white mb-3">Ring Final Circuit Testing Strategy</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-sm mb-2">Sequential Testing Steps</p>
                    <ol className="text-sm space-y-1 list-decimal pl-4">
                      <li>Test continuity at consumer unit first</li>
                      <li>Move to first socket outlet on circuit</li>
                      <li>Test continuity at each subsequent socket</li>
                      <li>Identify exact point where continuity fails</li>
                      <li>Fault location = between last good and first failed point</li>
                    </ol>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-2">Progressive Elimination</p>
                    <ul className="text-sm space-y-1">
                      <li>• Each successful test confirms that section is sound</li>
                      <li>• Failed test pinpoints fault to specific cable run</li>
                      <li>• Avoids testing entire ring unnecessarily</li>
                      <li>• Focuses investigation to precise location</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">Component Testing Order</p>
                  <ol className="text-sm space-y-1 list-decimal pl-4">
                    <li>Supply voltage at consumer unit</li>
                    <li>Switch operation and contacts</li>
                    <li>Cable continuity to fitting</li>
                    <li>Lamp holder connections</li>
                    <li>Neutral return path</li>
                  </ol>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">Avoiding Assumptions</p>
                  <ul className="text-sm space-y-1">
                    <li>• Don't assume lamp is faulty first</li>
                    <li>• Don't replace fitting without testing switch</li>
                    <li>• Test supply before changing components</li>
                    <li>• Verify each stage systematically</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mt-6">
                <p className="text-sm">
                  <strong className="text-elec-yellow">Practical tip:</strong> In domestic circuits, starting with supply verification at the consumer unit often saves time by confirming power availability before investigating downstream components.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="m7-4-3-b2"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Section 3: Industrial Control Systems */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Industrial Control Systems and Complex Installations
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                In industrial environments, staged testing of control systems prevents time wasted on complex diagnostics when simple faults exist. Testing follows the control logic sequence systematically.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10 my-6">
                <p className="font-medium text-white mb-3">Motor Control Circuit Testing Stages</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-sm mb-2">Stage 1: Supply Verification</p>
                    <ul className="text-sm space-y-1">
                      <li>• Three-phase supply voltage and balance</li>
                      <li>• Protective device operation</li>
                      <li>• Isolation switch functionality</li>
                      <li>• Supply quality and stability</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-2">Stage 2: Control Circuit Testing</p>
                    <ul className="text-sm space-y-1">
                      <li>• Control voltage supply</li>
                      <li>• Start/stop button operation</li>
                      <li>• Safety interlock verification</li>
                      <li>• Control circuit continuity</li>
                    </ul>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="font-medium text-sm mb-2">Stage 3: Contactor Operation</p>
                    <ul className="text-sm space-y-1">
                      <li>• Coil resistance and operation</li>
                      <li>• Contact condition and closure</li>
                      <li>• Auxiliary contact operation</li>
                      <li>• Mechanical operation verification</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-2">Stage 4: Motor Testing</p>
                    <ul className="text-sm space-y-1">
                      <li>• Winding continuity testing</li>
                      <li>• Insulation resistance verification</li>
                      <li>• Terminal connections inspection</li>
                      <li>• Mechanical coupling check</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Safety Considerations in Sequential Testing</p>
                <ul className="text-sm space-y-1">
                  <li>• Verify safe isolation before testing each stage</li>
                  <li>• Test safety interlocks before proceeding to power circuits</li>
                  <li>• Confirm emergency stop operation at each stage</li>
                  <li>• Use appropriate PPE for each testing phase</li>
                  <li>• Follow permit-to-work procedures for complex systems</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mt-6">
                <p className="text-sm">
                  <strong className="text-elec-yellow">Industrial insight:</strong> Sequential testing in industrial systems often reveals that complex-seeming faults are actually simple issues like loose connections or failed basic components, avoiding unnecessary downtime.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="m7-4-3-b3"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Section 4: Practical Guidance */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Practical Guidance and Time-Saving Techniques
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Effective component-by-component testing requires discipline, proper documentation, and systematic progression. These practical techniques maximise efficiency and prevent common mistakes.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">What to Record</p>
                  <ul className="text-sm space-y-1">
                    <li>• Test results for each component</li>
                    <li>• Component condition (pass/fail/partial)</li>
                    <li>• Measurements taken and values obtained</li>
                    <li>• Time and sequence of testing</li>
                    <li>• Any observations or anomalies noted</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">Recording Benefits</p>
                  <ul className="text-sm space-y-1">
                    <li>• Prevents retesting same components</li>
                    <li>• Builds clear fault location picture</li>
                    <li>• Provides evidence for repair decisions</li>
                    <li>• Helps with future maintenance planning</li>
                    <li>• Supports warranty and insurance claims</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Tools and Equipment for Efficient Testing</p>
                <ul className="text-sm space-y-1">
                  <li>• Multifunction tester with good leads and probes</li>
                  <li>• Clipboard or tablet for recording results systematically</li>
                  <li>• Circuit diagrams and component identification sheets</li>
                  <li>• Labelling materials to mark tested sections</li>
                  <li>• Camera for documenting component conditions and connections</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mt-6">
                <p className="text-sm">
                  <strong className="text-elec-yellow">Time-saving principle:</strong> Systematic component-by-component testing actually saves time in the long run by preventing repeated work, false diagnoses, and unnecessary component replacement.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="m7-4-3-b4"
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />

          {/* Real-World Examples */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Real-World Examples
            </h2>
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Case Study 1: Domestic Lighting Circuit Failure</p>
                <p className="text-sm mb-3">In a domestic property, a lighting circuit stopped working completely. An inexperienced worker immediately replaced the ceiling rose, assuming it was faulty, but the problem remained.</p>
                <div className="p-3 rounded bg-white/5 border border-white/10">
                  <p className="font-medium text-sm mb-2">Systematic Approach Applied:</p>
                  <ol className="text-sm space-y-1 list-decimal pl-4">
                    <li><strong>Step 1:</strong> Tested supply voltage at consumer unit - 230V present, MCB operational</li>
                    <li><strong>Step 2:</strong> Tested switch operation - no continuity when operated</li>
                    <li><strong>Step 3:</strong> Investigated switch connections - line conductor loose in terminal</li>
                    <li><strong>Result:</strong> Fault located without testing lamp holder unnecessarily</li>
                  </ol>
                </div>
                <div className="mt-4 p-3 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-sm"><strong className="text-elec-yellow">Learning:</strong> Testing in logical sequence (supply → switch → load) saved significant time and prevented unnecessary ceiling rose replacement.</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Case Study 2: Factory Machine Motor Failure</p>
                <p className="text-sm mb-3">A factory production machine would not start, causing production delays. Rather than dismantling the entire control system, the electrician applied systematic component testing.</p>
                <div className="p-3 rounded bg-white/5 border border-white/10">
                  <p className="font-medium text-sm mb-2">Sequential Testing Process:</p>
                  <ol className="text-sm space-y-1 list-decimal pl-4">
                    <li><strong>Stage 1:</strong> Supply testing - three-phase supply correct at control panel (415V balanced)</li>
                    <li><strong>Stage 2:</strong> Control circuit testing - 24V control supply present, start button operational</li>
                    <li><strong>Stage 3:</strong> Contactor testing - coil energising correctly, main contacts closing</li>
                    <li><strong>Stage 4:</strong> Motor testing - continuity test failed on motor windings</li>
                    <li><strong>Result:</strong> Motor windings burnt out, requiring motor replacement only</li>
                  </ol>
                </div>
                <div className="mt-4 p-3 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-sm"><strong className="text-elec-yellow">Learning:</strong> Avoided unnecessary work on control panel and contactors. Focused repair effort on the actual fault - motor windings.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                  <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                  <p className="text-sm text-white/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Recap
            </h2>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-white/80">
                Testing one component or section at a time is a disciplined way of narrowing down faults. Instead of guessing or replacing parts unnecessarily, electricians work step by step, confirming each stage of the circuit until the problem is found. This method is efficient, accurate, and suitable for everything from a single lighting circuit to an industrial control system.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} title="Test Your Knowledge: Component-by-Component Testing" />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full sm:w-auto text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="sm:hidden">Previous</span>
                <span className="hidden sm:inline">Previous: Sequence of Operation</span>
              </Link>
            </Button>
            <Button
              className="w-full sm:w-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-4">
                <span className="sm:hidden">Next</span>
                <span className="hidden sm:inline">Next: Dividing the Circuit into Zones</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section4_3;
