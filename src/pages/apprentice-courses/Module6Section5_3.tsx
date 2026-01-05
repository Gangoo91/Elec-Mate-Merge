import { ArrowLeft, ArrowRight, Target, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section5_3 = () => {
  useSEO(
    "Performing the Insulation Resistance Test - Level 2 Electrical Testing & Inspection",
    "Step-by-step procedures for conducting accurate insulation resistance tests"
  );

  // Quiz questions
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
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-0 text-sm sm:text-base" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 rounded-lg bg-card">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs sm:text-sm">
              Section 6.5.3
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Performing the Insulation Resistance Test
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Step-by-step procedures for conducting accurate insulation resistance tests
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="font-medium mb-2 sm:mb-3">In 30 seconds</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Isolate, prove dead, disconnect equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Test all conductor combinations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Use correct voltage (usually 500V DC)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Record results immediately</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-emerald-500/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Spot:</strong> Circuit isolation, equipment disconnection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Use:</strong> Correct test sequence and voltage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Check:</strong> Readings ≥1MΩ, investigate if low</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-foreground mb-4">
            Performing an insulation resistance (IR) test is a step-by-step process that requires accuracy, patience, and attention to safety. A rushed or poorly conducted test can produce misleading results, potentially leaving dangerous faults undiscovered. This subsection explains how to carry out the test correctly, from preparing the circuit through to interpreting the readings, ensuring compliance with BS 7671 and professional standards.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-foreground mb-3 sm:mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Prepare a circuit correctly for insulation resistance testing</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Carry out the test in the correct sequence using a recognised procedure</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Interpret insulation resistance readings accurately</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Identify when results are satisfactory and when remedial action is required</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Content / Learning</h2>

          {/* 1. Preparing the Circuit for Testing */}
          <section className="mb-4 sm:mb-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-2 sm:mb-3 text-sm sm:text-base">Preparing the Circuit for Testing</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Before the test begins, the circuit must be safely isolated and confirmed dead. Any connected equipment, such as electronic controls, dimmer switches, or computers, must be disconnected or protected, as the test voltage could damage them. Neutrals should be disconnected if required to avoid parallel paths affecting the readings. This careful preparation ensures the test is valid and prevents harm to people or equipment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="preparation-check"
            question="Why is it important to disconnect sensitive equipment before starting an insulation resistance test?"
            options={["To save time", "To prevent damage from high test voltages", "It's not necessary", "To get faster results"]}
            correctIndex={1}
            explanation="Sensitive electronic equipment must be disconnected because the high DC test voltages can permanently damage delicate electronic components."
          />

          {/* 2. Connecting the Tester */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3 text-base">Connecting the Tester</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        The insulation resistance tester is connected between the conductors under examination. For a single-phase circuit, this means testing between line and neutral, line and earth, and neutral and earth. For three-phase systems, tests should be carried out between all line conductors and between each line and earth. The test leads must be securely connected, and care should be taken to avoid contact with exposed parts while the tester is operating.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="connection-check"
            question="What conductor combinations should be tested in a single-phase circuit?"
            options={["Only line to earth", "Line to neutral, line to earth, neutral to earth", "Only neutral to earth", "Just the main cable"]}
            correctIndex={1}
            explanation="In a single-phase circuit, all three combinations must be tested: line to neutral, line to earth, and neutral to earth to ensure complete insulation integrity."
          />

          {/* 3. Carrying Out the Test */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-3 text-base">Carrying Out the Test</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Once everything is prepared, the tester is set to the correct voltage — usually 500 V DC for most circuits, though 250 V may be used for sensitive equipment. The "test" button is pressed, and the instrument applies the voltage across the conductors. The display then shows the insulation resistance in megaohms (MΩ). A good reading should be high, often well above the minimum values required by BS 7671 (generally 1 MΩ or higher depending on the installation type). The test should be repeated for each conductor combination, with the results recorded immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="testing-check"
            question="What is the usual test voltage for insulation resistance testing on a standard 230 V circuit?"
            options={["230 V", "500 V DC", "250 V", "1000 V"]}
            correctIndex={1}
            explanation="500 V DC is the standard test voltage for most low-voltage circuits including standard 230V installations."
          />

          {/* 4. Interpreting the Results */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-3 text-base">Interpreting the Results</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        A high resistance reading means that the insulation is sound and the circuit is safe to energise. A reading that is close to or below the minimum value in BS 7671 indicates a potential fault such as moisture, contamination, or physical damage to the cable. If this occurs, the test should be repeated to confirm the result, and further investigation should be carried out before energising the circuit. Under no circumstances should a circuit with unsatisfactory results be left connected.
                      </p>
                    </div>
                  </div>
                </div>
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
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Practical Guidance</h2>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Always label circuits being tested to avoid confusion when recording results</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Use insulated test leads in good condition and check them for damage before starting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Record results as you go rather than relying on memory afterwards</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>If unexpected results appear, double-check the setup before assuming the circuit is faulty</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Never ignore borderline readings — investigate until you are certain the circuit is safe</span>
            </li>
          </ul>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Real-World Example</h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base text-foreground">
              On a school refurbishment project, an electrician performed IR tests but failed to properly isolate borrowed neutrals between two lighting circuits. As a result, the readings were lower than expected, but he assumed the insulation was defective and began rewiring part of the system unnecessarily. Later, another electrician identified the borrowed neutral issue, corrected it, and repeated the test, which gave satisfactory readings. The mistake wasted time, materials, and money for the contractor.
            </p>
            <div className="p-3 sm:p-4 bg-card border border-green-500/20 rounded-lg">
              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                ✅ <strong>Lesson:</strong> Careful preparation and correct testing procedure are essential to avoid false readings and unnecessary work.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-2 border-l-primary/20 pl-4">
                <p className="font-medium text-foreground mb-2 text-sm sm:text-base">
                  <strong>Q:</strong> {faq.question}
                </p>
                <p className="text-muted-foreground text-sm">
                  <strong>A:</strong> {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4">📋 Pocket Guide: IR Testing Procedure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Test Sequence:</h3>
              <ul className="space-y-1 text-foreground">
                <li>• 1. Isolate and prove dead</li>
                <li>• 2. Disconnect equipment</li>
                <li>• 3. Connect test leads</li>
                <li>• 4. Set correct voltage</li>
                <li>• 5. Perform tests</li>
                <li>• 6. Record results</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Single-Phase Tests:</h3>
              <ul className="space-y-1 text-foreground">
                <li>• Line to Neutral</li>
                <li>• Line to Earth</li>
                <li>• Neutral to Earth</li>
                <li>• Minimum: 1MΩ</li>
                <li>• Test voltage: 500V DC</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4">Recap</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-lg bg-card border border-emerald-500/20">
              <h3 className="font-medium text-blue-700 dark:text-emerald-400 mb-2 text-sm">Preparation</h3>
              <p className="text-xs text-foreground">Isolate circuit, prove dead, and disconnect all sensitive equipment</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg bg-card border border-green-500/20">
              <h3 className="font-medium text-green-700 dark:text-green-300 mb-2 text-sm">Connection</h3>
              <p className="text-xs text-foreground">Test all conductor combinations with secure test lead connections</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg bg-card border border-orange-500/20">
              <h3 className="font-medium text-orange-700 dark:text-emerald-400 mb-2 text-sm">Testing</h3>
              <p className="text-xs text-foreground">Apply correct voltage (usually 500V DC) and record results immediately</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg bg-card border border-red-500/20">
              <h3 className="font-medium text-red-700 dark:text-emerald-400 mb-2 text-sm">Interpretation</h3>
              <p className="text-xs text-foreground">High readings = good insulation, low readings require investigation</p>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <Quiz
            title="Performing the Insulation Resistance Test Quiz"
            questions={quizQuestions}
          />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button variant="outline" className="flex-1" asChild>
            <Link to="../5-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Equipment & Safety
            </Link>
          </Button>
          
          <Button className="flex-1" asChild>
            <Link to="..">
              Back to Section Overview
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section5_3;