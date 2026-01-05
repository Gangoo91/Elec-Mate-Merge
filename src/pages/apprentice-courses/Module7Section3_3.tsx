import { ArrowLeft, ArrowRight, Wrench, CheckCircle, AlertTriangle, FileText, Users, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Testing One Component or Section at a Time - Module 7.3.3 | Level 2 Electrical Course";
const DESCRIPTION = "Isolate and confirm faults efficiently with step-by-step testing methodology.";

// Inline check questions
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
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-0 text-sm sm:text-base" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card w-fit">
              <Wrench className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 w-fit">
              Section 7.3.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Testing One Component or Section at a Time
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Isolate and confirm faults efficiently with step-by-step testing
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Testing one section at a time prevents confusion and wasted effort.</li>
                <li>This structured method gradually narrows down fault locations.</li>
                <li>It prevents replacing working components while missing real faults.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-emerald-500/30">
              <p className="font-medium mb-2">Spot it / Use it / Check</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Circuit complexity that could cause confusion.</li>
                <li><strong>Use:</strong> Isolate one section, test thoroughly, record results.</li>
                <li><strong>Check:</strong> Confirm pass/fail status before moving to next section.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-foreground">
            <li>Explain why testing one part of a circuit at a time is effective for fault diagnosis.</li>
            <li>Describe how this method helps isolate faults in both simple and complex installations.</li>
            <li>Apply the principle systematically to different types of electrical circuits.</li>
            <li>Prevent wasted time and effort by focusing on actual fault locations.</li>
            <li>Build confidence through structured, logical testing approaches.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* Why testing one section at a time works */}
          <section className="mb-6">
            <div className="space-y-4">
              <div className="rounded-lg p-4 sm:p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Why Testing One Section at a Time Works</p>
                    <p className="text-sm sm:text-base text-foreground mb-2">This approach reduces variables and provides clear pass/fail results for each part of the circuit, building a logical picture of where faults lie.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Reduces complexity:</strong> Breaking circuits into manageable parts prevents overwhelm</li>
                      <li><strong>Clear results:</strong> Each test gives definitive pass/fail for that section</li>
                      <li><strong>Eliminates guesswork:</strong> Systematic approach prevents random testing</li>
                      <li><strong>Builds confidence:</strong> Confirmed good sections focus effort on problem areas</li>
                      <li><strong>Prevents damage:</strong> Avoids unnecessary work on functioning components</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Core principle:</strong> Isolate variables to identify the specific fault location accurately
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to break circuits into sections */}
          <section className="mb-6">
            <div className="space-y-4">
              <div className="rounded-lg p-4 sm:p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">How to Break Circuits into Sections</p>
                    <p className="text-sm sm:text-base text-foreground mb-2">Divide circuits into logical sections: supply, control, and load components, with clear test points between each section.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Supply section:</strong> Distribution board to first accessory or control</li>
                      <li><strong>Control section:</strong> Switches, contactors, and protection devices</li>
                      <li><strong>Load section:</strong> Final equipment and return paths</li>
                      <li><strong>Protection section:</strong> Earth paths and RCD circuits</li>
                      <li><strong>Interface points:</strong> Junction boxes, terminals, and connection points</li>
                    </ul>
                    <p className="text-sm sm:text-base text-foreground mb-2"><strong>Examples by circuit type:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Lighting:</strong> Supply → Switch → Lamp holder → Return</li>
                      <li><strong>Ring final:</strong> Supply → R1 → Accessories → R2 → Return</li>
                      <li><strong>Motor control:</strong> Supply → Control circuit → Contactor → Motor</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Logical division:</strong> Each section should have clear input/output points for testing
                    </div>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* Method: Isolate, test, record, conclude */}
          <section className="mb-6">
            <div className="space-y-4">
              <div className="rounded-lg p-4 sm:p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Method: Isolate, Test, Record, Conclude</p>
                    <p className="text-sm sm:text-base text-foreground mb-2">Follow a systematic four-step process for each section to ensure thorough and accurate fault diagnosis.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Isolate:</strong> Safely disconnect the section from rest of circuit</li>
                      <li><strong>Test:</strong> Apply appropriate tests (continuity, IR, polarity, functional)</li>
                      <li><strong>Record:</strong> Document results clearly with pass/fail status</li>
                      <li><strong>Conclude:</strong> Determine if fault is in this section or elsewhere</li>
                    </ul>
                    <p className="text-sm sm:text-base text-foreground mb-2"><strong>Test selection criteria:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Continuity:</strong> For cable runs and connections</li>
                      <li><strong>Insulation resistance:</strong> For cable and equipment integrity</li>
                      <li><strong>Polarity:</strong> For correct conductor identification</li>
                      <li><strong>Functional tests:</strong> For switches and control equipment</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Decision point:</strong> Only move to next section when current section status is confirmed
                    </div>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* Applications */}
          <section className="mb-6">
            <div className="space-y-4">
              <div className="rounded-lg p-4 sm:p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Practical Applications</p>
                    <p className="text-sm sm:text-base text-foreground mb-2">Apply systematic section testing to common circuit types with specific test points and procedures.</p>
                    
                    <div className="space-y-3">
                      <div className="bg-background/50 p-3 rounded border">
                        <p className="font-medium text-sm mb-1">Lighting Circuit Testing</p>
                        <ul className="text-xs text-foreground ml-4 list-disc space-y-1">
                          <li>Supply: Test voltage at distribution board MCB</li>
                          <li>Cable run: Continuity from board to switch</li>
                          <li>Switch: Operation and contact integrity</li>
                          <li>Switch to lamp: Continuity of switched live</li>
                          <li>Lamp holder: Connection integrity and function</li>
                          <li>Return path: Neutral continuity back to board</li>
                        </ul>
                      </div>
                      
                      <div className="bg-background/50 p-3 rounded border">
                        <p className="font-medium text-sm mb-1">Ring Final Circuit Testing</p>
                        <ul className="text-xs text-foreground ml-4 list-disc space-y-1">
                          <li>R1+R2 values: Test at each socket progressively</li>
                          <li>Ring continuity: Verify unbroken ring at each point</li>
                          <li>Cross connections: Check for leg transposition</li>
                          <li>Socket testing: Each outlet individually</li>
                          <li>Earth continuity: Verify CPC integrity throughout</li>
                          <li>Polarity verification: Correct L/N at each point</li>
                        </ul>
                      </div>
                      
                      <div className="bg-background/50 p-3 rounded border">
                        <p className="font-medium text-sm mb-1">Industrial Control Circuit Testing</p>
                        <ul className="text-xs text-foreground ml-4 list-disc space-y-1">
                          <li>Supply: Incoming power to control panel</li>
                          <li>Control circuit: Start/stop and interlock operation</li>
                          <li>Contactor: Coil operation and contact integrity</li>
                          <li>Motor supply: Power circuit from contactor to motor</li>
                          <li>Motor windings: Continuity and insulation resistance</li>
                          <li>Protection: Overload and earth fault systems</li>
                        </ul>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Progressive testing:</strong> Each confirmed section narrows focus to remaining possibilities
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Documentation and repeatability */}
          <section className="mb-6">
            <div className="space-y-4">
              <div className="rounded-lg p-4 sm:p-5 border-l-4 border-l-teal-500 bg-teal-500/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-teal-600 dark:text-teal-400 mb-1">Documentation and Repeatability</p>
                    <p className="text-sm sm:text-base text-foreground mb-2">Record results after each step to build a clear diagnostic picture and ensure the fault is properly resolved.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Test results:</strong> Record actual values, not just pass/fail</li>
                      <li><strong>Section status:</strong> Clear indication of good/faulty for each part</li>
                      <li><strong>Fault location:</strong> Precise identification of problem area</li>
                      <li><strong>Remedial action:</strong> What was done to correct the fault</li>
                      <li><strong>Verification testing:</strong> Confirm repair effectiveness</li>
                      <li><strong>Final checks:</strong> Ensure all sections now function correctly</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Professional standard:</strong> Comprehensive records demonstrate systematic competence and aid future maintenance
                    </div>
                  </div>
                </div>
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
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-6">Practical Guidance</h2>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="h-full">
              <div className="p-4 rounded-lg bg-card border border-green-400/30 h-full">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">Best Practice Approach</h3>
                    <ul className="text-sm space-y-2 text-foreground">
                      <li>• Keep tests focused and targeted on one section</li>
                      <li>• Record results after each test to build clear picture</li>
                      <li>• Don't skip sections even if fault seems obvious</li>
                      <li>• Use appropriate test methods for each section type</li>
                      <li>• Progress systematically through logical sequence</li>
                      <li>• Verify complete system operation after repair</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-full">
              <div className="p-4 rounded-lg bg-card border border-border/30 h-full">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-600 dark:text-emerald-400 mb-3">Common Mistakes to Avoid</h3>
                    <ul className="text-sm space-y-2 text-foreground">
                      <li>• Replacing parts without testing first</li>
                      <li>• Testing too many things at once</li>
                      <li>• Jumping around the circuit randomly</li>
                      <li>• Not recording results after each test</li>
                      <li>• Assuming sections are good without confirmation</li>
                      <li>• Stopping testing once fault seems identified</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-6">Real-World Examples</h2>
          
          <div className="space-y-6">
            <div className="p-4 rounded-lg border border-border/30 bg-card">
              <h3 className="font-semibold text-foreground mb-3">Domestic Lighting Circuit Fault</h3>
              <div className="grid sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium text-emerald-400 dark:text-emerald-400 mb-1">Situation</p>
                  <p className="text-foreground">Lighting circuit stopped working. Inexperienced worker immediately replaced ceiling rose without testing.</p>
                </div>
                <div>
                  <p className="font-medium text-orange-600 dark:text-emerald-400 mb-1">Tests Performed</p>
                  <p className="text-foreground">Structured electrician tested: supply at board (✓), then switch operation (✗), then lamp holder (not reached).</p>
                </div>
                <div>
                  <p className="font-medium text-green-600 dark:text-green-400 mb-1">Result</p>
                  <p className="text-foreground">Testing revealed loose line conductor at switch, interrupting circuit. Fixed within minutes.</p>
                </div>
                <div>
                  <p className="font-medium text-purple-600 dark:text-emerald-400 mb-1">Lesson</p>
                  <p className="text-foreground">Section-by-section testing located fault immediately without replacing working components.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border/30 bg-card">
              <h3 className="font-semibold text-foreground mb-3">Factory Machine Motor Fault</h3>
              <div className="grid sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium text-emerald-400 dark:text-emerald-400 mb-1">Situation</p>
                  <p className="text-foreground">Factory machine would not start. Staff prepared to replace entire motor assembly.</p>
                </div>
                <div>
                  <p className="font-medium text-orange-600 dark:text-emerald-400 mb-1">Tests Performed</p>
                  <p className="text-foreground">Systematic testing: supply to panel (✓), control circuit (✓), contactor operation (✓), motor windings (✗).</p>
                </div>
                <div>
                  <p className="font-medium text-green-600 dark:text-green-400 mb-1">Result</p>
                  <p className="text-foreground">Motor windings failed continuity checks. Only motor needed replacement, not entire system.</p>
                </div>
                <div>
                  <p className="font-medium text-purple-600 dark:text-emerald-400 mb-1">Lesson</p>
                  <p className="text-foreground">Section testing avoided unnecessary work on functioning control systems and panels.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/20 last:border-b-0 pb-4 last:pb-0">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-6">Recap</h2>
          
          {/* Mobile-friendly grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-card border border-border/30">
              <h3 className="font-semibold text-emerald-400 dark:text-emerald-400 mb-2">Systematic Isolation</h3>
              <p className="text-xs sm:text-sm text-foreground">Test one section at a time to isolate faults logically and efficiently.</p>
            </div>
            
            <div className="p-4 rounded-lg bg-card border border-green-400/30">
              <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">Record Everything</h3>
              <p className="text-xs sm:text-sm text-foreground">Document results after each test to build clear diagnostic picture.</p>
            </div>
            
            <div className="p-4 rounded-lg bg-card border border-border/30">
              <h3 className="font-semibold text-orange-600 dark:text-emerald-400 mb-2">Prevent Waste</h3>
              <p className="text-xs sm:text-sm text-foreground">Avoid replacing working components by confirming faults first.</p>
            </div>
            
            <div className="p-4 rounded-lg bg-card border border-border/30">
              <h3 className="font-semibold text-purple-600 dark:text-emerald-400 mb-2">Apply Universally</h3>
              <p className="text-xs sm:text-sm text-foreground">Method works for all systems from simple lighting to complex industrial.</p>
            </div>
            
            <div className="p-4 rounded-lg bg-teal-500/10 border border-teal-400/30">
              <h3 className="font-semibold text-teal-600 dark:text-teal-400 mb-2">Build Confidence</h3>
              <p className="text-xs sm:text-sm text-foreground">Structured approach provides certainty and professional competence.</p>
            </div>
            
            <div className="p-4 rounded-lg bg-card border border-border/30">
              <h3 className="font-semibold text-red-600 dark:text-emerald-400 mb-2">Stay Focused</h3>
              <p className="text-xs sm:text-sm text-foreground">Resist temptation to jump around - systematic progression saves time.</p>
            </div>
          </div>
          
          {/* Key Success Factors */}
          <div className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <h3 className="font-semibold text-emerald-400 mb-2">Key Success Factors</h3>
            <p className="text-xs sm:text-sm text-foreground">Master this disciplined testing approach - it transforms fault finding from guesswork into professional, efficient diagnosis.</p>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz 
          title="Knowledge Check: Testing One Component at a Time"
          questions={quizQuestions}
        />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <Button variant="outline" asChild>
            <Link to="../3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to 3.2 - Sequence of Operation
            </Link>
          </Button>
          <Button asChild>
            <Link to="../3-4">
              Next: 3.4 - Buzzing Sounds & Arcing
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section3_3;