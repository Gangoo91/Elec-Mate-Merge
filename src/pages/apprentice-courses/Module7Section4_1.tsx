import { ArrowLeft, ArrowRight, Settings, Target, CheckCircle, AlertTriangle, FileText, Users, Wrench, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Systematic Fault Diagnosis - Module 7.4.1 | Level 2 Electrical Course";
const DESCRIPTION = "Professional approach to electrical fault finding using systematic methods and testing procedures according to BS 7671.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the first step in systematic fault diagnosis?",
    options: ["Test the circuit", "Question the user", "Replace components", "Check voltage"],
    correctIndex: 1,
    explanation: "Always begin by questioning the user to understand what happened, when the fault occurred, and any relevant circumstances."
  },
  {
    id: 2,
    question: "Why is isolation essential before fault finding?",
    options: ["To save electricity", "To ensure safety during testing", "To reset protective devices", "To improve test accuracy"],
    correctIndex: 1,
    explanation: "Isolation ensures safety by preventing electric shock and allows accurate testing without interference from other circuits."
  },
  {
    id: 3,
    question: "What should you do if initial tests don't reveal the fault?",
    options: ["Replace all components", "Apply systematic subdivision", "Give up", "Guess the problem"],
    correctIndex: 1,
    explanation: "Use systematic subdivision to break the circuit into smaller sections and test each part methodically."
  },
  {
    id: 4,
    question: "When should you verify repairs are effective?",
    options: ["Next week", "Before re-energising the circuit", "After the customer pays", "Only if problems persist"],
    correctIndex: 1,
    explanation: "Always verify repairs through appropriate testing before re-energising circuits to ensure safety and effectiveness."
  }
];

const Module7Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the first step in systematic fault diagnosis?",
      options: [
        "Start testing immediately",
        "Question the user about circumstances",
        "Replace suspected faulty components",
        "Check the consumer unit"
      ],
      correctAnswer: 1,
      explanation: "Always begin by questioning the user to understand what happened, when the fault occurred, and any circumstances that may help identify the cause."
    },
    {
      id: 2,
      question: "Why must circuits be isolated before fault finding?",
      options: [
        "To save electricity costs",
        "To ensure safety and accurate testing",
        "To reset protective devices",
        "To comply with manufacturer instructions"
      ],
      correctAnswer: 1,
      explanation: "Isolation ensures safety from electric shock and allows accurate testing without interference from parallel paths or live conductors."
    },
    {
      id: 3,
      question: "What is systematic subdivision in fault finding?",
      options: [
        "Testing everything at once",
        "Breaking the circuit into smaller testable sections",
        "Replacing components one by one",
        "Using multiple test instruments"
      ],
      correctAnswer: 1,
      explanation: "Systematic subdivision involves breaking the circuit into smaller sections and testing each part methodically to locate the fault."
    },
    {
      id: 4,
      question: "Which test instrument is most appropriate for checking continuity?",
      options: [
        "Voltmeter",
        "Low resistance ohmmeter",
        "Clamp meter",
        "Insulation tester"
      ],
      correctAnswer: 1,
      explanation: "A low resistance ohmmeter provides accurate continuity measurements and can detect high resistance joints that other instruments might miss."
    },
    {
      id: 5,
      question: "What should you verify before re-energising after repair?",
      options: [
        "Only that the repair looks good",
        "Test results confirm the fault is cleared",
        "The customer is satisfied",
        "All tools are packed away"
      ],
      correctAnswer: 1,
      explanation: "Always verify through appropriate testing that the fault has been completely resolved before restoring power to the circuit."
    },
    {
      id: 6,
      question: "Why is documentation important in fault finding?",
      options: [
        "It's required by law",
        "Provides evidence of work done and aids future maintenance",
        "Customers always request it",
        "Insurance companies demand it"
      ],
      correctAnswer: 1,
      explanation: "Documentation provides evidence of professional work, helps with future maintenance, and demonstrates compliance with safety standards."
    },
    {
      id: 7,
      question: "What is the danger of 'shotgun' fault finding?",
      options: [
        "It takes too long",
        "May cause additional faults and safety risks",
        "It's too expensive",
        "Customers don't like it"
      ],
      correctAnswer: 1,
      explanation: "Random testing and component replacement can introduce new faults, create safety hazards, and waste time and money."
    },
    {
      id: 8,
      question: "How should you handle a fault you cannot identify?",
      options: [
        "Keep trying different approaches",
        "Seek help from experienced colleagues or specialists",
        "Tell the customer it's unfixable",
        "Replace everything until it works"
      ],
      correctAnswer: 1,
      explanation: "Professional practice involves recognising your limitations and seeking appropriate help rather than continuing with unsuccessful methods."
    },
    {
      id: 9,
      question: "What should be checked if a circuit worked before but fails after modification?",
      options: [
        "The original installation only",
        "The modification work and its effect on existing circuits",
        "Just the new components",
        "The consumer unit"
      ],
      correctAnswer: 1,
      explanation: "When faults occur after modifications, check both the new work and how it may have affected existing circuits."
    },
    {
      id: 10,
      question: "Why is the 'half-split' method effective for fault finding?",
      options: [
        "It's the fastest method",
        "Eliminates half the circuit with each test",
        "It requires fewer test instruments",
        "It's easier to explain to customers"
      ],
      correctAnswer: 1,
      explanation: "The half-split method efficiently narrows down the fault location by eliminating half the remaining circuit with each test."
    }
  ];

  const faqs = [
    {
      question: "Should you always start with the same test when fault finding?",
      answer: "No. The first test should be chosen based on the symptoms described and the most likely cause. However, safety checks and isolation should always come first."
    },
    {
      question: "Is it acceptable to energise circuits to test for faults?",
      answer: "Only when using appropriate test procedures and equipment designed for live testing. Most fault finding should be done on isolated circuits for safety."
    },
    {
      question: "How do you avoid creating additional faults during diagnosis?",
      answer: "Use systematic methods, appropriate test instruments, avoid forcing connections, and don't dismantle more than necessary. Plan your approach before starting."
    },
    {
      question: "What if the fault is intermittent?",
      answer: "Intermittent faults require patience and may need monitoring over time. Check for loose connections, thermal effects, and conditions that trigger the fault."
    },
    {
      question: "Should customers be present during fault finding?",
      answer: "It's often helpful as they can provide information about when and how the fault occurs. However, ensure they stay in safe areas and don't interfere with testing."
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
              <Settings className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow w-fit">
              Section 7.4.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Systematic Approach to Fault Diagnosis
          </h1>
          <p className="text-white text-sm sm:text-base">
            Professional methodology for electrical fault finding using systematic testing procedures and logical analysis.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Systematic fault diagnosis follows a logical sequence to identify electrical problems efficiently.</li>
                <li>Always start with user questioning, then isolate, test systematically, and verify repairs.</li>
                <li>Random 'shotgun' approaches waste time and can create additional safety hazards.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
              <p className="font-medium mb-2">Spot it / Use it / Check</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Circuit faults, symptoms, patterns, environmental factors.</li>
                <li><strong>Use:</strong> Systematic testing, appropriate instruments, logical subdivision.</li>
                <li><strong>Check:</strong> Test results, safety compliance, repair effectiveness.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-white">
            <li>Apply systematic methodology to electrical fault diagnosis in logical sequence.</li>
            <li>Demonstrate safe isolation procedures and appropriate testing techniques for fault finding.</li>
            <li>Use circuit subdivision methods to efficiently locate faults in complex installations.</li>
            <li>Select and use appropriate test instruments for different fault-finding scenarios.</li>
            <li>Document fault-finding activities and verify repair effectiveness before re-energisation.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Content / Learning</h2>

          {/* Content Block 1: Information Gathering and Initial Assessment */}
          <section className="mb-8">
            <div className="space-y-4">
              <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-elec-yellow dark:text-elec-yellow mb-4 text-base sm:text-lg">Information Gathering and Initial Assessment</h3>
                    
                    <p className="text-sm sm:text-base text-white mb-4">
                      Effective fault diagnosis begins with thorough information gathering. Understanding the circumstances and symptoms guides the entire diagnostic process and often reveals the fault location before any testing begins.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-white mb-3">Essential User Questioning</p>
                        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-[#121212]/30 p-3 rounded-lg">
                            <p className="font-medium text-sm mb-2">Fault Circumstances</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• When did the problem first occur?</li>
                              <li>• Was the failure sudden or gradual?</li>
                              <li>• What was in use when it happened?</li>
                              <li>• Any unusual sounds, smells, or visual signs?</li>
                              <li>• Weather conditions at time of fault?</li>
                            </ul>
                          </div>
                          <div className="bg-[#121212]/30 p-3 rounded-lg">
                            <p className="font-medium text-sm mb-2">System History</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Has there been recent electrical work?</li>
                              <li>• Any new appliances or equipment added?</li>
                              <li>• Previous similar problems experienced?</li>
                              <li>• Recent maintenance or modifications?</li>
                              <li>• Changes in usage patterns?</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-white mb-3">Pattern and Symptom Analysis</p>
                        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-[#121212]/30 p-3 rounded-lg">
                            <p className="font-medium text-sm mb-2">Occurrence Patterns</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Specific times of day or conditions?</li>
                              <li>• Related to particular appliances?</li>
                              <li>• Environmental triggers present?</li>
                              <li>• Frequency changes over time?</li>
                              <li>• Load-dependent behaviour?</li>
                            </ul>
                          </div>
                          <div className="bg-[#121212]/30 p-3 rounded-lg">
                            <p className="font-medium text-sm mb-2">Visual Indicators</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Signs of overheating or burning</li>
                              <li>• Physical damage to equipment</li>
                              <li>• Loose or corroded connections</li>
                              <li>• Moisture ingress evidence</li>
                              <li>• Protective device positions</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-white mb-3">Documentation Review</p>
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <ul className="text-xs text-white space-y-1">
                            <li>• Circuit diagrams and installation certificates</li>
                            <li>• Previous test results and inspection reports</li>
                            <li>• Manufacturer specifications and manuals</li>
                            <li>• Maintenance records and modification history</li>
                            <li>• Operating instructions and safety procedures</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs sm:text-xs sm:text-sm text-white bg-[#121212]/50 p-3 rounded border mt-4">
                      <strong>Professional approach:</strong> Spend adequate time on information gathering - it's often more valuable than immediate testing and can save hours of unnecessary work. Good questioning can reveal 70% of fault locations before any instruments are used.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="fault-diagnosis-start-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6 sm:my-8" />

          {/* Content Block 2: Safe Isolation and Testing Preparation */}
          <section className="mb-8">
            <div className="space-y-4">
              <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-600 dark:text-green-400 mb-4 text-base sm:text-lg">Safe Isolation and Testing Preparation</h3>
                    
                    <p className="text-sm sm:text-base text-white mb-4">
                      Safety is paramount in fault finding. Proper isolation protects both the electrician and allows accurate testing without interference from other circuits or live conductors.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-white mb-3">Safe Isolation Procedure (Prove-Dead Process)</p>
                        <div className="bg-[#121212]/30 p-4 rounded-lg">
                          <ol className="text-xs sm:text-sm text-white space-y-2 list-decimal pl-4">
                            <li><strong>Identify</strong> the correct circuit and isolation point using circuit diagrams</li>
                            <li><strong>Test</strong> voltage indicator on known live source to verify operation</li>
                            <li><strong>Isolate</strong> the circuit at the appropriate point (MCB, isolator, or main switch)</li>
                            <li><strong>Secure</strong> isolation with lock-off devices and warning notices</li>
                            <li><strong>Test</strong> for absence of voltage at the work location</li>
                            <li><strong>Retest</strong> voltage indicator on known live source to confirm operation</li>
                          </ol>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-white mb-3">Testing Equipment Preparation</p>
                        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-[#121212]/30 p-3 rounded-lg">
                            <p className="font-medium text-sm mb-2">Essential Test Instruments</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Voltage indicator (LED/lamp type)</li>
                              <li>• Low resistance ohmmeter</li>
                              <li>• Insulation resistance tester</li>
                              <li>• Digital multimeter</li>
                              <li>• Continuity tester with audible indicator</li>
                            </ul>
                          </div>
                          <div className="bg-[#121212]/30 p-3 rounded-lg">
                            <p className="font-medium text-sm mb-2">Calibration and Checks</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Verify calibration certificates are current</li>
                              <li>• Check battery levels and operation</li>
                              <li>• Test leads for continuity and insulation</li>
                              <li>• Confirm appropriate measurement ranges</li>
                              <li>• Function test on known good circuits</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-white mb-3">Work Environment Safety</p>
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <ul className="text-xs text-white space-y-1">
                            <li>• Ensure adequate lighting and ventilation in work area</li>
                            <li>• Remove or secure any potential hazards (water, debris, sharp edges)</li>
                            <li>• Position warning signs and barriers to prevent interference</li>
                            <li>• Establish communication procedures with other workers</li>
                            <li>• Have emergency procedures and first aid readily available</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs sm:text-xs sm:text-sm text-white bg-[#121212]/50 p-3 rounded border mt-4">
                      <strong>Safety reminder:</strong> Never compromise on isolation procedures. A few extra minutes for proper isolation can prevent serious injury or death. Always verify isolation at the point of work, not just at the distribution board.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="safe-isolation-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6 sm:my-8" />

          {/* Content Block 3: Systematic Testing and Circuit Subdivision */}
          <section className="mb-8">
            <div className="space-y-4">
              <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-orange-600 dark:text-elec-yellow mb-4 text-base sm:text-lg">Systematic Testing and Circuit Subdivision</h3>
                    
                    <p className="text-sm sm:text-base text-white mb-4">
                      Once safety is established, systematic testing locates faults efficiently using logical subdivision methods rather than random testing approaches.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-white mb-3">Half-Split Method</p>
                        <div className="bg-[#121212]/30 p-4 rounded-lg">
                          <p className="text-xs sm:text-sm text-white mb-2">The most efficient systematic approach for locating faults:</p>
                          <ol className="text-xs sm:text-sm text-white space-y-1 list-decimal pl-4">
                            <li>Test at the midpoint of the circuit to eliminate half the possibilities</li>
                            <li>Based on results, focus on the faulty half and repeat the process</li>
                            <li>Continue subdivision until the fault is precisely located</li>
                            <li>Each test eliminates 50% of remaining possibilities</li>
                          </ol>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-white mb-3">Testing Sequence by Circuit Type</p>
                        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-[#121212]/30 p-3 rounded-lg">
                            <p className="font-medium text-sm mb-2">Lighting Circuits</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Check supply at distribution board</li>
                              <li>• Test switch line at first switch</li>
                              <li>• Check continuity to each light point</li>
                              <li>• Verify neutral return path</li>
                              <li>• Test earth continuity if applicable</li>
                            </ul>
                          </div>
                          <div className="bg-[#121212]/30 p-3 rounded-lg">
                            <p className="font-medium text-sm mb-2">Socket Circuits</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Verify supply at origin</li>
                              <li>• Test ring continuity (if ring final)</li>
                              <li>• Check live, neutral, and earth paths</li>
                              <li>• Test insulation resistance</li>
                              <li>• Verify polarity at outlets</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-white mb-3">Common Fault Locations and Tests</p>
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-sm mb-2">Connection Points</p>
                              <ul className="text-xs text-white space-y-1">
                                <li>• Junction boxes and connectors</li>
                                <li>• Switch and socket terminals</li>
                                <li>• Distribution board connections</li>
                                <li>• Appliance connection points</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-sm mb-2">Cable Damage Points</p>
                              <ul className="text-xs text-white space-y-1">
                                <li>• Where cables pass through structure</li>
                                <li>• Points of mechanical stress</li>
                                <li>• Areas exposed to moisture</li>
                                <li>• Recent building work locations</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs sm:text-xs sm:text-sm text-white bg-[#121212]/50 p-3 rounded border mt-4">
                      <strong>Efficiency principle:</strong> Systematic subdivision can locate most faults within 3-4 tests, while random testing might require dozens of measurements to find the same problem.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="systematic-testing-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6 sm:my-8" />

          {/* Content Block 4: Verification and Documentation */}
          <section className="mb-8">
            <div className="space-y-4">
              <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-purple-600 dark:text-elec-yellow mb-4 text-base sm:text-lg">Verification and Documentation</h3>
                    
                    <p className="text-sm sm:text-base text-white mb-4">
                      Completing the fault diagnosis process requires proper verification of repairs and comprehensive documentation for safety, compliance, and future reference.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-white mb-3">Repair Verification Tests</p>
                        <div className="bg-[#121212]/30 p-4 rounded-lg">
                          <p className="text-xs sm:text-sm text-white mb-2">Before re-energising any circuit:</p>
                          <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                            <li>Repeat the original test that identified the fault to confirm it's resolved</li>
                            <li>Perform additional tests to ensure repair hasn't affected other circuits</li>
                            <li>Check all connections are secure and properly terminated</li>
                            <li>Verify compliance with BS 7671 requirements for the repair method used</li>
                            <li>Test protective device operation if relevant to the fault</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-white mb-3">Essential Documentation Requirements</p>
                        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-[#121212]/30 p-3 rounded-lg">
                            <p className="font-medium text-sm mb-2">Fault Finding Record</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Date, time, and location of fault</li>
                              <li>• Symptoms and circumstances reported</li>
                              <li>• Test procedures and results obtained</li>
                              <li>• Fault location and cause identified</li>
                              <li>• Repair method and materials used</li>
                            </ul>
                          </div>
                          <div className="bg-[#121212]/30 p-3 rounded-lg">
                            <p className="font-medium text-sm mb-2">Compliance Documentation</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Verification test results</li>
                              <li>• BS 7671 regulation compliance</li>
                              <li>• Certificate of completion</li>
                              <li>• Recommendations for future prevention</li>
                              <li>• Customer notification and instruction</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-white mb-3">Re-energisation Procedure</p>
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <ol className="text-xs sm:text-sm text-white space-y-1 list-decimal pl-4">
                            <li>Remove all test equipment and temporary connections</li>
                            <li>Ensure all personnel are clear of the work area</li>
                            <li>Remove warning notices and lock-off devices</li>
                            <li>Restore circuit protection (MCBs, fuses) gradually</li>
                            <li>Test circuit operation under normal load conditions</li>
                            <li>Monitor for any immediate issues or abnormal operation</li>
                          </ol>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-white mb-3">Quality Assurance</p>
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <ul className="text-xs text-white space-y-1">
                            <li>• Confirm customer satisfaction with repair and explanation provided</li>
                            <li>• Verify all tools and equipment accounted for and removed</li>
                            <li>• Leave installation in a safe and compliant condition</li>
                            <li>• Provide appropriate certificates and documentation to customer</li>
                            <li>• Schedule follow-up if required for complex or intermittent faults</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs sm:text-xs sm:text-sm text-white bg-[#121212]/50 p-3 rounded border mt-4">
                      <strong>Professional standard:</strong> Thorough documentation protects both electrician and customer, provides evidence of competent work, and creates valuable records for future maintenance and compliance audits.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="fault-diagnosis-end-check"
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
                <h3 className="font-medium text-emerald-600 dark:text-elec-yellow mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Best Practices
                </h3>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• Always follow the systematic sequence - resist shortcuts</li>
                  <li>• Document everything as you work, not afterwards</li>
                  <li>• Use appropriate test instruments for each measurement</li>
                  <li>• Take photographs of complex fault locations</li>
                  <li>• Explain findings clearly to customers in simple terms</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <h3 className="font-medium text-red-600 dark:text-elec-yellow mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Common Mistakes
                </h3>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• Rushing to test without proper information gathering</li>
                  <li>• Assuming similar symptoms mean identical faults</li>
                  <li>• Testing while circuits remain energised</li>
                  <li>• Replacing components without confirming the actual fault</li>
                  <li>• Inadequate verification testing after repairs</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Real-World Examples</h2>
          
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-4 sm:p-6 border border-border/10">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-lg border border-border/30">
                    <HardHat className="w-6 h-6 text-elec-yellow" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white mb-3">Case Study 1: Intermittent Kitchen Socket Fault</h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium mb-2">Reported Symptoms:</p>
                      <ul className="text-white space-y-1 list-disc pl-4">
                        <li>Socket outlets in kitchen working intermittently</li>
                        <li>Problem occurs mainly during wet weather</li>
                        <li>RCD trips occasionally when using certain appliances</li>
                        <li>Started after recent kitchen renovation work</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Systematic Approach:</p>
                      <ul className="text-white space-y-1 list-disc pl-4">
                        <li>Questioned user about renovation work details</li>
                        <li>Isolated circuit and tested insulation resistance</li>
                        <li>Found low reading - used half-split method</li>
                        <li>Located damaged cable where wall was drilled</li>
                        <li>Repaired cable and verified with full testing</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-[#121212]/50 rounded border">
                    <p className="text-xs sm:text-sm text-white"><strong>Key learning:</strong> Information gathering revealed the renovation work connection, guiding tests toward recently disturbed areas and saving significant diagnostic time.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 sm:p-6 border border-border/10">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-lg border border-green-400/30">
                    <Wrench className="w-6 h-6 text-green-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white mb-3">Case Study 2: Office Lighting Circuit Dead</h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium mb-2">Initial Findings:</p>
                      <ul className="text-white space-y-1 list-disc pl-4">
                        <li>Entire lighting circuit not working</li>
                        <li>MCB tripped and won't reset</li>
                        <li>No obvious signs of damage</li>
                        <li>Cleaners reported 'pop' sound previous evening</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Diagnostic Process:</p>
                      <ul className="text-white space-y-1 list-disc pl-4">
                        <li>Isolated circuit properly with lock-off</li>
                        <li>Tested insulation resistance - found fault to earth</li>
                        <li>Used systematic subdivision at junction boxes</li>
                        <li>Located fault in ceiling rose with damaged neutral</li>
                        <li>Replaced damaged wiring and verified repair</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-[#121212]/50 rounded border">
                    <p className="text-xs sm:text-sm text-white"><strong>Key learning:</strong> The systematic subdivision approach quickly narrowed down the fault location, while proper isolation procedures ensured safety throughout the process.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 sm:p-6 border border-border/10">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-lg border border-border/30">
                    <AlertTriangle className="w-6 h-6 text-elec-yellow" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white mb-3">Case Study 3: Workshop Power Issues</h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium mb-2">Complex Symptoms:</p>
                      <ul className="text-white space-y-1 list-disc pl-4">
                        <li>Some machines working, others not</li>
                        <li>Voltage fluctuations reported</li>
                        <li>Problem seems to worsen under load</li>
                        <li>Recent addition of new heavy machinery</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Investigation Results:</p>
                      <ul className="text-white space-y-1 list-disc pl-4">
                        <li>Voltage drop testing revealed issue</li>
                        <li>High resistance in main earth connections</li>
                        <li>Corroded connections in distribution board</li>
                        <li>Inadequate cable sizing for new loads</li>
                        <li>Comprehensive upgrade and testing completed</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-[#121212]/50 rounded border">
                    <p className="text-xs sm:text-sm text-white"><strong>Key learning:</strong> Load-related problems required voltage and current measurements under operating conditions, demonstrating the importance of selecting appropriate test methods for specific symptoms.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-sm sm:text-base text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-8 p-4 sm:p-6 border border-border/40">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="font-medium text-white mb-3">Key Takeaways</h3>
              <ul className="text-sm sm:text-base text-white space-y-2">
                <li>• Systematic fault diagnosis follows a logical sequence that improves efficiency and safety</li>
                <li>• Information gathering often reveals fault locations before testing begins</li>
                <li>• Safe isolation procedures are mandatory for all fault-finding work</li>
                <li>• Circuit subdivision methods locate faults faster than random testing</li>
                <li>• Proper verification and documentation complete the professional process</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-3">Remember</h3>
              <ul className="text-sm sm:text-base text-white space-y-2">
                <li>• Never compromise on safety procedures</li>
                <li>• Document everything as you work</li>
                <li>• Verify repairs before re-energisation</li>
                <li>• Seek help when faced with unfamiliar faults</li>
                <li>• Explain findings clearly to customers</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <Quiz questions={quizQuestions} title="Knowledge Check: Systematic Fault Diagnosis" />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-white/10">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="sm:hidden">Back</span>
              <span className="hidden sm:inline">Back to Section 4</span>
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../4-2">
              <span className="sm:hidden">Next</span>
              <span className="hidden sm:inline">Next: Understanding the Sequence of Operation</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section4_1;