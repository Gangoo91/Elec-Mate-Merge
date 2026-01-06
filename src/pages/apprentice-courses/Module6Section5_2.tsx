import { ArrowLeft, Target, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section5_2 = () => {
  useSEO(
    "Test Equipment and Safety Considerations - Level 2 Electrical Testing & Inspection",
    "Understanding the correct equipment and safety precautions for insulation resistance testing"
  );

  // Quiz questions
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
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white p-0 text-sm sm:text-base" asChild>
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
            <div className="p-1.5 sm:p-2 rounded-lg ">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 6.5.2
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Test Equipment and Safety Considerations
          </h1>
          <p className="text-white text-sm sm:text-base">
            Understanding the correct equipment and safety precautions for insulation resistance testing
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 sm:mb-3">In 30 seconds</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Use insulation resistance tester (megger)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Always isolate and prove dead first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Disconnect sensitive equipment before testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Discharge circuit after testing</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Spot:</strong> Calibrated tester, good test leads, warning lights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> Correct test voltage (250V/500V/1000V DC)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> Circuit isolated, equipment disconnected, PPE worn</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-white mb-4">
            Before carrying out insulation resistance (IR) testing, electricians must be familiar with the correct equipment and understand the safety precautions involved. Using the wrong instrument, or failing to follow safe procedures, can result in inaccurate readings, damage to sensitive equipment, or even personal injury. This subsection explains the types of test instruments used, how to prepare for safe testing, and the key considerations that protect both the electrician and the installation.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-white mb-3 sm:mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Identify the correct instruments used for insulation resistance testing</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand how to set up and use the equipment safely</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Recognise the importance of isolating and preparing circuits before testing</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Apply safe working practices to prevent accidents or equipment damage</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Content / Learning</h2>

          {/* 1. Test Instruments Used for Insulation Resistance Testing */}
          <section className="mb-4 sm:mb-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-2 sm:mb-3 text-sm sm:text-base">Test Instruments Used for Insulation Resistance Testing</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs sm:text-sm text-white mb-3">
                          The main instrument used is the insulation resistance tester, often referred to as a "megger." This device applies a high DC voltage (commonly 250 V, 500 V, or 1000 V depending on the installation being tested) across the conductors and measures the resistance to current flow. A high resistance reading indicates good insulation, while a low resistance suggests damage, contamination, or deterioration.
                        </p>
                        <p className="text-xs sm:text-sm text-white">
                          Modern testers are digital, lightweight, and include additional functions such as continuity testing. However, electricians must ensure the instrument is properly calibrated and rated for the voltage being tested.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="instruments-check"
            question="What is the typical instrument used to carry out insulation resistance testing?"
            options={["Multimeter", "Insulation resistance tester (megger)", "Oscilloscope", "Clamp meter"]}
            correctIndex={1}
            explanation="An insulation resistance tester, commonly called a 'megger', is the specific instrument designed to apply high DC voltages and measure insulation resistance."
          />

          {/* 2. Preparing for Safe Testing */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3 text-base">Preparing for Safe Testing</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        Before connecting the tester, the circuit must be isolated and proved dead. This involves switching off the supply, locking it off where possible, and verifying with a suitable voltage indicator that no voltage is present. All appliances, electronic devices, and sensitive equipment should be disconnected from the circuit to prevent damage from the test voltage. Failure to do this could result in equipment being permanently damaged or giving false readings.
                      </p>
                      <p className="text-xs sm:text-sm text-white">
                        It is also important to ensure that the circuit is free from temporary connections, such as borrowed neutrals, which could interfere with the test.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="preparation-check"
            question="Why must sensitive equipment such as computers be disconnected before insulation resistance testing?"
            options={["To save time", "To prevent damage from high test voltages", "It's not necessary", "To get faster results"]}
            correctIndex={1}
            explanation="Sensitive electronic equipment must be disconnected because the high DC test voltages (250V-1000V) can permanently damage delicate electronic components."
          />

          {/* 3. Safe Use of the Test Equipment */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-3 text-base">Safe Use of the Test Equipment</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        When using an insulation resistance tester, always connect the leads securely to the conductors under test. The tester will generate a high DC voltage, so it should only be applied once all persons are clear of the circuit and informed that testing is about to begin. Many testers include a warning light to show that a test voltage is present. Once the test is complete, the circuit must be discharged to earth to remove any stored charge before it is reconnected.
                      </p>
                      <p className="text-xs sm:text-sm text-white">
                        Electricians should also follow the manufacturer's operating instructions and wear suitable PPE such as insulated gloves when required.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="safety-use-check"
            question="What should be done to a circuit after an insulation resistance test has been completed?"
            options={["Nothing", "Discharge it to earth", "Test it again", "Leave it isolated"]}
            correctIndex={1}
            explanation="The circuit must be discharged to earth after testing to remove any stored energy that could cause shock or interfere with subsequent tests."
          />

          {/* 4. Risks and Safety Considerations */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-3 text-base">Risks and Safety Considerations</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        The main risks during insulation resistance testing are accidental contact with the test voltage and damage to connected equipment. Although the current output from the tester is low, the voltage is high enough to cause discomfort or harm if mishandled. There is also the risk of recording misleading results if the circuit has not been properly prepared. To minimise these risks, electricians must follow safe isolation procedures, double-check all disconnections, and ensure test leads are in good condition. Maintaining concentration during testing is vital to avoid mistakes that could compromise safety.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="risks-check"
            question="What are two risks associated with insulation resistance testing if safety procedures are not followed?"
            options={["Faster testing and better results", "Accidental contact with test voltage and equipment damage", "Lower readings and more work", "No risks at all"]}
            correctIndex={1}
            explanation="The main risks are accidental contact with high test voltages (causing shock) and damage to sensitive connected equipment that wasn't properly disconnected."
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Practical Guidance</h2>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Always verify that the circuit is isolated before connecting the tester</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Use the correct test voltage: typically 500 V DC for most low-voltage circuits, but 250 V DC may be used where sensitive equipment is involved</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Check the condition and calibration of the tester before use</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Discharge the circuit after testing to remove stored energy</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Never bypass safe isolation steps, even for "quick" tests</span>
            </li>
          </ul>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Real-World Example</h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base text-white">
              On a commercial site, an apprentice connected an insulation resistance tester to a circuit without disconnecting several computers still plugged into sockets. The 500 V DC test voltage damaged the computers' power supplies, costing the contractor several thousand pounds in replacement equipment. The incident could have been avoided by isolating properly, disconnecting all sensitive equipment, and confirming the circuit was safe to test.
            </p>
            <div className="p-3 sm:p-4 bg-transparent border border-green-500/20 rounded-lg">
              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                ✅ <strong>Lesson:</strong> Preparing the circuit correctly before testing is just as important as carrying out the test itself.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-2 border-l-primary/20 pl-4">
                <p className="font-medium text-white mb-2 text-sm sm:text-base">
                  <strong>Q:</strong> {faq.question}
                </p>
                <p className="text-white text-sm">
                  <strong>A:</strong> {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">📋 Pocket Guide: IR Testing Equipment & Safety</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h3 className="font-medium text-white">Essential Equipment:</h3>
              <ul className="space-y-1 text-white">
                <li>• Insulation resistance tester (megger)</li>
                <li>• Voltage indicator</li>
                <li>• Test leads in good condition</li>
                <li>• Lock-off devices</li>
                <li>• PPE (insulated gloves)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-white">Safety Checklist:</h3>
              <ul className="space-y-1 text-white">
                <li>• Isolate and prove dead</li>
                <li>• Disconnect sensitive equipment</li>
                <li>• Check test lead condition</li>
                <li>• Clear all persons from circuit</li>
                <li>• Discharge after testing</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-lg border border-elec-yellow/20">
              <h3 className="font-medium text-blue-700 text-elec-yellow mb-2 text-sm">Equipment</h3>
              <p className="text-xs text-white">Use calibrated insulation resistance tester (megger) with correct test voltage ratings</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg border border-green-500/20">
              <h3 className="font-medium text-green-700 dark:text-green-300 mb-2 text-sm">Preparation</h3>
              <p className="text-xs text-white">Always isolate, prove dead, and disconnect sensitive equipment before testing</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg border border-orange-500/20">
              <h3 className="font-medium text-orange-700 text-elec-yellow mb-2 text-sm">Safety</h3>
              <p className="text-xs text-white">Follow manufacturer instructions, use PPE, and clear all personnel before testing</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg border border-red-500/20">
              <h3 className="font-medium text-red-700 text-elec-yellow mb-2 text-sm">After Testing</h3>
              <p className="text-xs text-white">Discharge circuit to earth to remove stored energy before reconnection</p>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <Quiz
            title="Test Equipment and Safety Considerations Quiz"
            questions={quizQuestions}
          />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Button variant="outline" className="order-2 sm:order-1" asChild>
            <Link to="../5-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Purpose of IR Testing
            </Link>
          </Button>
          <Button className="order-1 sm:order-2" asChild>
            <Link to="../5-3">
              Next: Performing the Test
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section5_2;