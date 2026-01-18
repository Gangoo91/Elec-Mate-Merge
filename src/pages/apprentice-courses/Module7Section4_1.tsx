import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Systematic Fault Diagnosis - Module 7.4.1 | Level 2 Electrical Course";
const DESCRIPTION = "Professional approach to electrical fault finding using systematic methods and testing procedures according to BS 7671.";

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
              <span className="text-white/60">Section 4.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Systematic Approach to Fault Diagnosis
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
              Professional methodology for electrical fault finding using systematic testing procedures and logical analysis.
            </p>
          </header>

          {/* In 30 Seconds Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 space-y-1 text-sm">
              <li>• Systematic fault diagnosis follows a logical sequence to identify electrical problems efficiently.</li>
              <li>• Always start with user questioning, then isolate, test systematically, and verify repairs.</li>
              <li>• Random 'shotgun' approaches waste time and can create additional safety hazards.</li>
            </ul>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2 leading-relaxed">
              <li>• Apply systematic methodology to electrical fault diagnosis in logical sequence.</li>
              <li>• Demonstrate safe isolation procedures and appropriate testing techniques for fault finding.</li>
              <li>• Use circuit subdivision methods to efficiently locate faults in complex installations.</li>
              <li>• Select and use appropriate test instruments for different fault-finding scenarios.</li>
              <li>• Document fault-finding activities and verify repair effectiveness before re-energisation.</li>
            </ul>
          </section>

          {/* Section 1: Information Gathering */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Information Gathering and Initial Assessment
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Effective fault diagnosis begins with thorough information gathering. Understanding the circumstances and symptoms guides the entire diagnostic process and often reveals the fault location before any testing begins.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">Fault Circumstances</p>
                  <ul className="text-sm space-y-1">
                    <li>• When did the problem first occur?</li>
                    <li>• Was the failure sudden or gradual?</li>
                    <li>• What was in use when it happened?</li>
                    <li>• Any unusual sounds, smells, or visual signs?</li>
                    <li>• Weather conditions at time of fault?</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">System History</p>
                  <ul className="text-sm space-y-1">
                    <li>• Has there been recent electrical work?</li>
                    <li>• Any new appliances or equipment added?</li>
                    <li>• Previous similar problems experienced?</li>
                    <li>• Recent maintenance or modifications?</li>
                    <li>• Changes in usage patterns?</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Documentation Review</p>
                <ul className="text-sm space-y-1">
                  <li>• Circuit diagrams and installation certificates</li>
                  <li>• Previous test results and inspection reports</li>
                  <li>• Manufacturer specifications and manuals</li>
                  <li>• Maintenance records and modification history</li>
                  <li>• Operating instructions and safety procedures</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mt-6">
                <p className="text-sm">
                  <strong className="text-elec-yellow">Professional approach:</strong> Spend adequate time on information gathering - it's often more valuable than immediate testing and can save hours of unnecessary work. Good questioning can reveal 70% of fault locations before any instruments are used.
                </p>
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

          {/* Section 2: Safe Isolation */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Safe Isolation and Testing Preparation
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Safety is paramount in fault finding. Proper isolation protects both the electrician and allows accurate testing without interference from other circuits or live conductors.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10 my-6">
                <p className="font-medium text-white mb-3">Safe Isolation Procedure (Prove-Dead Process)</p>
                <ol className="text-sm space-y-2 list-decimal pl-4">
                  <li><strong>Identify</strong> the correct circuit and isolation point using circuit diagrams</li>
                  <li><strong>Test</strong> voltage indicator on known live source to verify operation</li>
                  <li><strong>Isolate</strong> the circuit at the appropriate point (MCB, isolator, or main switch)</li>
                  <li><strong>Secure</strong> isolation with lock-off devices and warning notices</li>
                  <li><strong>Test</strong> for absence of voltage at the work location</li>
                  <li><strong>Retest</strong> voltage indicator on known live source to confirm operation</li>
                </ol>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">Essential Test Instruments</p>
                  <ul className="text-sm space-y-1">
                    <li>• Voltage indicator (LED/lamp type)</li>
                    <li>• Low resistance ohmmeter</li>
                    <li>• Insulation resistance tester</li>
                    <li>• Digital multimeter</li>
                    <li>• Continuity tester with audible indicator</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">Calibration and Checks</p>
                  <ul className="text-sm space-y-1">
                    <li>• Verify calibration certificates are current</li>
                    <li>• Check battery levels and operation</li>
                    <li>• Test leads for continuity and insulation</li>
                    <li>• Confirm appropriate measurement ranges</li>
                    <li>• Function test on known good circuits</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mt-6">
                <p className="text-sm">
                  <strong className="text-elec-yellow">Safety reminder:</strong> Never compromise on isolation procedures. A few extra minutes for proper isolation can prevent serious injury or death. Always verify isolation at the point of work, not just at the distribution board.
                </p>
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

          {/* Section 3: Systematic Testing */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Systematic Testing and Circuit Subdivision
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Once safety is established, systematic testing locates faults efficiently using logical subdivision methods rather than random testing approaches.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10 my-6">
                <p className="font-medium text-white mb-3">Half-Split Method</p>
                <p className="text-sm mb-2">The most efficient systematic approach for locating faults:</p>
                <ol className="text-sm space-y-1 list-decimal pl-4">
                  <li>Test at the midpoint of the circuit to eliminate half the possibilities</li>
                  <li>Based on results, focus on the faulty half and repeat the process</li>
                  <li>Continue subdivision until the fault is precisely located</li>
                  <li>Each test eliminates 50% of remaining possibilities</li>
                </ol>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">Lighting Circuits</p>
                  <ul className="text-sm space-y-1">
                    <li>• Check supply at distribution board</li>
                    <li>• Test switch line at first switch</li>
                    <li>• Check continuity to each light point</li>
                    <li>• Verify neutral return path</li>
                    <li>• Test earth continuity if applicable</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">Socket Circuits</p>
                  <ul className="text-sm space-y-1">
                    <li>• Verify supply at origin</li>
                    <li>• Test ring continuity (if ring final)</li>
                    <li>• Check live, neutral, and earth paths</li>
                    <li>• Test insulation resistance</li>
                    <li>• Verify polarity at outlets</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mt-6">
                <p className="text-sm">
                  <strong className="text-elec-yellow">Efficiency principle:</strong> Systematic subdivision can locate most faults within 3-4 tests, while random testing might require dozens of measurements to find the same problem.
                </p>
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

          {/* Section 4: Verification and Documentation */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Verification and Documentation
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Completing the fault diagnosis process requires proper verification of repairs and comprehensive documentation for safety, compliance, and future reference.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10 my-6">
                <p className="font-medium text-white mb-3">Repair Verification Tests</p>
                <p className="text-sm mb-2">Before re-energising any circuit:</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Repeat the original test that identified the fault to confirm it's resolved</li>
                  <li>Perform additional tests to ensure repair hasn't affected other circuits</li>
                  <li>Check all connections are secure and properly terminated</li>
                  <li>Verify compliance with BS 7671 requirements for the repair method used</li>
                  <li>Test protective device operation if relevant to the fault</li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">Fault Finding Record</p>
                  <ul className="text-sm space-y-1">
                    <li>• Date, time, and location of fault</li>
                    <li>• Symptoms and circumstances reported</li>
                    <li>• Test procedures and results obtained</li>
                    <li>• Fault location and cause identified</li>
                    <li>• Repair method and materials used</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">Compliance Documentation</p>
                  <ul className="text-sm space-y-1">
                    <li>• Verification test results</li>
                    <li>• BS 7671 regulation compliance</li>
                    <li>• Certificate of completion</li>
                    <li>• Recommendations for future prevention</li>
                    <li>• Customer notification and instruction</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mt-6">
                <p className="text-sm">
                  <strong className="text-elec-yellow">Professional standard:</strong> Thorough documentation protects both electrician and customer, provides evidence of competent work, and creates valuable records for future maintenance and compliance audits.
                </p>
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

          {/* Real-World Example */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="font-medium text-white mb-3">Case Study: Intermittent Kitchen Socket Fault</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white/90 mb-2">Reported Symptoms:</p>
                  <ul className="space-y-1 list-disc pl-4">
                    <li>Socket outlets in kitchen working intermittently</li>
                    <li>Problem occurs mainly during wet weather</li>
                    <li>RCD trips occasionally when using certain appliances</li>
                    <li>Started after recent kitchen renovation work</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white/90 mb-2">Systematic Approach:</p>
                  <ul className="space-y-1 list-disc pl-4">
                    <li>Questioned user about renovation work details</li>
                    <li>Isolated circuit and tested insulation resistance</li>
                    <li>Found low reading - used half-split method</li>
                    <li>Located damaged cable where wall was drilled</li>
                    <li>Repaired cable and verified with full testing</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm"><strong className="text-elec-yellow">Key learning:</strong> Information gathering revealed the renovation work connection, guiding tests toward recently disturbed areas and saving significant diagnostic time.</p>
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
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Key Takeaways</h3>
                <ul className="text-sm text-white/70 space-y-2">
                  <li>• Systematic fault diagnosis follows a logical sequence that improves efficiency and safety</li>
                  <li>• Information gathering often reveals fault locations before testing begins</li>
                  <li>• Safe isolation procedures are mandatory for all fault-finding work</li>
                  <li>• Circuit subdivision methods locate faults faster than random testing</li>
                  <li>• Proper verification and documentation complete the professional process</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Remember</h3>
                <ul className="text-sm text-white/70 space-y-2">
                  <li>• Never compromise on safety procedures</li>
                  <li>• Document everything as you work</li>
                  <li>• Verify repairs before re-energisation</li>
                  <li>• Seek help when faced with unfamiliar faults</li>
                  <li>• Explain findings clearly to customers</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} title="Knowledge Check: Systematic Fault Diagnosis" />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full sm:w-auto text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="sm:hidden">Back</span>
                <span className="hidden sm:inline">Back to Section 4</span>
              </Link>
            </Button>
            <Button
              className="w-full sm:w-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-2">
                <span className="sm:hidden">Next</span>
                <span className="hidden sm:inline">Next: Sequence of Operation</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section4_1;
