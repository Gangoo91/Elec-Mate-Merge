import { ArrowLeft, ArrowRight, Search, CheckCircle, AlertTriangle, FileText, Users, Wrench, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Testing One Component or Section at a Time - Module 7.4.3 | Level 2 Electrical Course";
const DESCRIPTION = "Structured approach to fault diagnosis by testing individual components and circuit sections systematically.";

// Inline check questions
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
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white p-0 text-sm sm:text-base" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <div className="p-2 rounded-lg w-fit">
              <Search className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow w-fit">
              Section 7.4.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Testing One Component or Section at a Time
          </h1>
          <p className="text-white text-sm sm:text-base">
            Structured approach to fault diagnosis by testing individual components and circuit sections systematically
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Testing one component at a time prevents confusion and wasted effort.</li>
                <li>This method logically narrows down fault locations step by step.</li>
                <li>It works effectively for both simple domestic and complex industrial circuits.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
              <p className="font-medium mb-2">Spot it / Use it / Check</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Components that could be causing circuit failure.</li>
                <li><strong>Use:</strong> Systematic testing approach and result recording.</li>
                <li><strong>Check:</strong> Each component individually before moving to next.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-white">
            <li>Explain why testing one part of a circuit at a time is effective.</li>
            <li>Describe how this method helps isolate faults systematically.</li>
            <li>Apply the principle to both simple and more complex installations.</li>
            <li>Demonstrate proper recording and progression techniques.</li>
            <li>Identify when and where to apply component-by-component testing.</li>
          </ul>
        </Card>

        {/* Content - 4 main blocks with inline checks after each */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Content / Learning</h2>

          {/* Block 1: Concept and Benefits */}
          <section className="mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-elec-yellow ">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-elec-yellow dark:text-elec-yellow mb-4 text-base sm:text-lg">Concept and Benefits of Component-by-Component Testing</h3>
                  <p className="text-sm sm:text-base text-white mb-4">
                    Testing one component or section at a time is a fundamental fault-finding principle that prevents confusion and builds confidence through systematic progression. This approach transforms complex circuit diagnosis into manageable, logical steps.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-white mb-3">Core Principles of Sequential Testing</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">Logical Progression</p>
                          <ul className="text-xs text-white space-y-1">
                            <li>• Follow circuit path systematically</li>
                            <li>• Test in order of signal or power flow</li>
                            <li>• Confirm each stage before proceeding</li>
                            <li>• Build evidence progressively</li>
                            <li>• Avoid jumping between unrelated components</li>
                          </ul>
                        </div>
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">Fault Isolation Benefits</p>
                          <ul className="text-xs text-white space-y-1">
                            <li>• Pinpoints exact fault location</li>
                            <li>• Prevents unnecessary component replacement</li>
                            <li>• Reduces diagnostic time significantly</li>
                            <li>• Eliminates guesswork and assumptions</li>
                            <li>• Builds technician confidence and competence</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-white mb-3">Avoiding Common Diagnostic Pitfalls</p>
                      <div className="bg-[#121212]/30 p-4 rounded-lg">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-sm mb-2">What NOT to Do</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Testing multiple components simultaneously</li>
                              <li>• Making assumptions about fault locations</li>
                              <li>• Replacing parts without confirmation</li>
                              <li>• Jumping around the circuit randomly</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-sm mb-2">Systematic Approach</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Test one component completely before next</li>
                              <li>• Record all results systematically</li>
                              <li>• Confirm each stage is sound</li>
                              <li>• Follow logical circuit progression</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs sm:text-xs sm:text-sm text-white bg-[#121212]/50 p-3 rounded border mt-4">
                    <strong>Key principle:</strong> By testing components individually, electricians build a clear map of circuit condition, identifying exactly where normal operation breaks down and focusing repair efforts precisely where needed.
                  </div>
                </div>
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
          <Separator className="my-6 sm:my-8" />

          {/* Block 2: Domestic Circuits Application */}
          <section className="mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-green-500 ">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-600 dark:text-green-400 mb-4 text-base sm:text-lg">Application to Domestic Circuits</h3>
                  <p className="text-sm sm:text-base text-white mb-4">
                    In domestic installations, component-by-component testing prevents unnecessary work and quickly identifies faults in ring final circuits, lighting circuits, and consumer unit distribution systems.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-white mb-3">Ring Final Circuit Testing Strategy</p>
                      <div className="bg-[#121212]/30 p-4 rounded-lg">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-sm mb-2">Sequential Testing Steps</p>
                            <ol className="text-xs text-white space-y-1 list-decimal pl-4">
                              <li>Test continuity at consumer unit first</li>
                              <li>Move to first socket outlet on circuit</li>
                              <li>Test continuity at each subsequent socket</li>
                              <li>Identify exact point where continuity fails</li>
                              <li>Fault location = between last good and first failed point</li>
                            </ol>
                          </div>
                          <div>
                            <p className="font-medium text-sm mb-2">Progressive Elimination</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Each successful test confirms that section is sound</li>
                              <li>• Failed test pinpoints fault to specific cable run</li>
                              <li>• Avoids testing entire ring unnecessarily</li>
                              <li>• Focuses investigation to precise location</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-white mb-3">Lighting Circuit Systematic Approach</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">Component Testing Order</p>
                          <ol className="text-xs text-white space-y-1 list-decimal pl-4">
                            <li>Supply voltage at consumer unit</li>
                            <li>Switch operation and contacts</li>
                            <li>Cable continuity to fitting</li>
                            <li>Lamp holder connections</li>
                            <li>Neutral return path</li>
                          </ol>
                        </div>
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">Avoiding Assumptions</p>
                          <ul className="text-xs text-white space-y-1">
                            <li>• Don't assume lamp is faulty first</li>
                            <li>• Don't replace fitting without testing switch</li>
                            <li>• Test supply before changing components</li>
                            <li>• Verify each stage systematically</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs sm:text-xs sm:text-sm text-white bg-[#121212]/50 p-3 rounded border mt-4">
                    <strong>Practical tip:</strong> In domestic circuits, starting with supply verification at the consumer unit often saves time by confirming power availability before investigating downstream components.
                  </div>
                </div>
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
          <Separator className="my-6 sm:my-8" />

          {/* Block 3: Industrial Control Systems */}
          <section className="mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-orange-500 ">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-600 dark:text-elec-yellow mb-4 text-base sm:text-lg">Industrial Control Systems and Complex Installations</h3>
                  <p className="text-sm sm:text-base text-white mb-4">
                    In industrial environments, staged testing of control systems prevents time wasted on complex diagnostics when simple faults exist. Testing follows the control logic sequence systematically.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-white mb-3">Motor Control Circuit Testing Stages</p>
                      <div className="bg-[#121212]/30 p-4 rounded-lg">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-sm mb-2">Stage 1: Supply Verification</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Three-phase supply voltage and balance</li>
                              <li>• Protective device operation</li>
                              <li>• Isolation switch functionality</li>
                              <li>• Supply quality and stability</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-sm mb-2">Stage 2: Control Circuit Testing</p>
                            <ul className="text-xs text-white space-y-1">
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
                            <ul className="text-xs text-white space-y-1">
                              <li>• Coil resistance and operation</li>
                              <li>• Contact condition and closure</li>
                              <li>• Auxiliary contact operation</li>
                              <li>• Mechanical operation verification</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-sm mb-2">Stage 4: Motor Testing</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Winding continuity testing</li>
                              <li>• Insulation resistance verification</li>
                              <li>• Terminal connections inspection</li>
                              <li>• Mechanical coupling check</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-white mb-3">Safety Considerations in Sequential Testing</p>
                      <div className="bg-[#121212]/30 p-3 rounded-lg">
                        <ul className="text-xs text-white space-y-1">
                          <li>• Verify safe isolation before testing each stage</li>
                          <li>• Test safety interlocks before proceeding to power circuits</li>
                          <li>• Confirm emergency stop operation at each stage</li>
                          <li>• Use appropriate PPE for each testing phase</li>
                          <li>• Follow permit-to-work procedures for complex systems</li>
                          <li>• Verify lockout/tagout procedures before component testing</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs sm:text-xs sm:text-sm text-white bg-[#121212]/50 p-3 rounded border mt-4">
                    <strong>Industrial insight:</strong> Sequential testing in industrial systems often reveals that complex-seeming faults are actually simple issues like loose connections or failed basic components, avoiding unnecessary downtime.
                  </div>
                </div>
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
          <Separator className="my-6 sm:my-8" />

          {/* Block 4: Practical Guidance and Best Practices */}
          <section className="mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-purple-500 ">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-600 dark:text-elec-yellow mb-4 text-base sm:text-lg">Practical Guidance and Time-Saving Techniques</h3>
                  <p className="text-sm sm:text-base text-white mb-4">
                    Effective component-by-component testing requires discipline, proper documentation, and systematic progression. These practical techniques maximise efficiency and prevent common mistakes.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-white mb-3">Essential Documentation and Recording</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">What to Record</p>
                          <ul className="text-xs text-white space-y-1">
                            <li>• Test results for each component</li>
                            <li>• Component condition (pass/fail/partial)</li>
                            <li>• Measurements taken and values obtained</li>
                            <li>• Time and sequence of testing</li>
                            <li>• Any observations or anomalies noted</li>
                          </ul>
                        </div>
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">Recording Benefits</p>
                          <ul className="text-xs text-white space-y-1">
                            <li>• Prevents retesting same components</li>
                            <li>• Builds clear fault location picture</li>
                            <li>• Provides evidence for repair decisions</li>
                            <li>• Helps with future maintenance planning</li>
                            <li>• Supports warranty and insurance claims</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-white mb-3">Maintaining Systematic Discipline</p>
                      <div className="bg-[#121212]/30 p-4 rounded-lg">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-sm mb-2">Avoiding Temptation</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Resist urge to "jump around" circuit</li>
                              <li>• Don't skip steps even if fault seems obvious</li>
                              <li>• Avoid testing multiple components together</li>
                              <li>• Don't make assumptions about fault location</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-sm mb-2">Building Confidence</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Each successful test confirms system status</li>
                              <li>• Progressive elimination builds certainty</li>
                              <li>• Systematic approach reduces anxiety</li>
                              <li>• Documentation provides reference for complex systems</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-white mb-3">Tools and Equipment for Efficient Testing</p>
                      <div className="bg-[#121212]/30 p-3 rounded-lg">
                        <ul className="text-xs text-white space-y-1">
                          <li>• Multifunction tester with good leads and probes</li>
                          <li>• Clipboard or tablet for recording results systematically</li>
                          <li>• Circuit diagrams and component identification sheets</li>
                          <li>• Labelling materials to mark tested sections</li>
                          <li>• Camera for documenting component conditions and connections</li>
                          <li>• Basic hand tools for safe component access</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs sm:text-xs sm:text-sm text-white bg-[#121212]/50 p-3 rounded border mt-4">
                    <strong>Time-saving principle:</strong> Systematic component-by-component testing actually saves time in the long run by preventing repeated work, false diagnoses, and unnecessary component replacement.
                  </div>
                </div>
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
          <Separator className="my-6 sm:my-8" />
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Real-World Examples</h2>
          
          <div className="grid gap-6 sm:gap-8">
            {/* Case Study 1 */}
            <div className="rounded-lg p-4 sm:p-6 border border-white/10 bg-[#121212]/30">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg ">
                  <FileText className="w-5 h-5 text-elec-yellow" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base sm:text-lg">Case Study 1: Domestic Lighting Circuit Failure</h3>
                  <p className="text-sm text-white">Systematic testing reveals loose connection</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Scenario</h4>
                  <p className="text-xs sm:text-sm text-white">
                    In a domestic property, a lighting circuit stopped working completely. An inexperienced worker immediately replaced the ceiling rose, assuming it was faulty, but the problem remained.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Systematic Approach Applied</h4>
                  <div className="bg-[#121212]/50 p-3 rounded">
                    <ol className="text-xs sm:text-sm text-white space-y-1 list-decimal pl-4">
                      <li><strong>Step 1:</strong> Tested supply voltage at consumer unit - 230V present, MCB operational</li>
                      <li><strong>Step 2:</strong> Tested switch operation - no continuity when operated</li>
                      <li><strong>Step 3:</strong> Investigated switch connections - line conductor loose in terminal</li>
                      <li><strong>Result:</strong> Fault located without testing lamp holder unnecessarily</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Learning Points</h4>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-6">
                    <li>Replacing components without testing wastes time and money</li>
                    <li>Systematic testing quickly identified the actual fault location</li>
                    <li>The ceiling rose replacement was completely unnecessary</li>
                    <li>Testing in logical sequence (supply → switch → load) saved significant time</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="rounded-lg p-4 sm:p-6 border border-white/10 bg-[#121212]/30">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg ">
                  <Wrench className="w-5 h-5 text-elec-yellow" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base sm:text-lg">Case Study 2: Factory Machine Motor Failure</h3>
                  <p className="text-sm text-white">Sequential testing prevents unnecessary system dismantling</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Scenario</h4>
                  <p className="text-xs sm:text-sm text-white">
                    A factory production machine would not start, causing production delays. Rather than dismantling the entire control system, the electrician applied systematic component testing.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Sequential Testing Process</h4>
                  <div className="bg-[#121212]/50 p-3 rounded">
                    <ol className="text-xs sm:text-sm text-white space-y-1 list-decimal pl-4">
                      <li><strong>Stage 1:</strong> Supply testing - three-phase supply correct at control panel (415V balanced)</li>
                      <li><strong>Stage 2:</strong> Control circuit testing - 24V control supply present, start button operational</li>
                      <li><strong>Stage 3:</strong> Contactor testing - coil energising correctly, main contacts closing</li>
                      <li><strong>Stage 4:</strong> Motor testing - continuity test failed on motor windings</li>
                      <li><strong>Result:</strong> Motor windings burnt out, requiring motor replacement only</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Outcome and Benefits</h4>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-6">
                    <li>Avoided unnecessary work on control panel and contactors</li>
                    <li>Focused repair effort on the actual fault - motor windings</li>
                    <li>Minimised production downtime by targeting exact problem</li>
                    <li>Prevented costly replacement of functional control components</li>
                    <li>Provided clear evidence for warranty claim on motor failure</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-medium text-white mb-2 text-sm sm:text-base">{faq.question}</h3>
                <p className="text-white text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Key Takeaways */}
        <Card className="mb-8 p-4 sm:p-6 border border-border/40">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-sm sm:text-base text-white mb-4">
            Testing one component or section at a time is a disciplined way of narrowing down faults. Instead of guessing or replacing parts unnecessarily, electricians work step by step, confirming each stage of the circuit until the problem is found. This method is efficient, accurate, and suitable for everything from a single lighting circuit to an industrial control system.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Test Your Knowledge: Component-by-Component Testing" />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-white/10">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="sm:hidden">Previous</span>
              <span className="hidden sm:inline">Previous: Understanding the Sequence of Operation</span>
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../4-4">
              <span className="sm:hidden">Next</span>
              <span className="hidden sm:inline">Next: Dividing the Circuit into Zones</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section4_3;