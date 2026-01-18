import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Understanding the Sequence of Operation - Module 7.4.2 | Level 2 Electrical Course";
const DESCRIPTION = "Analysing how electrical circuits should function normally to identify where faults occur.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the sequence of operation in electrical fault diagnosis?",
    options: ["Random testing order", "The normal operational flow of the circuit", "Installation sequence", "Testing equipment order"],
    correctIndex: 1,
    explanation: "Sequence of operation refers to understanding how the circuit should work normally, which helps identify where faults interrupt this flow."
  },
  {
    id: 2,
    question: "Why is understanding normal operation important for fault finding?",
    options: ["It's required by regulations", "It helps identify where the normal sequence breaks down", "It reduces costs", "It speeds up installation"],
    correctIndex: 1,
    explanation: "Understanding normal operation helps electricians identify exactly where the expected sequence is interrupted by a fault."
  },
  {
    id: 3,
    question: "In a motor control circuit, what should happen before the motor starts?",
    options: ["Motor runs immediately", "Safety interlocks must be satisfied and control signals activated", "Only power is needed", "Nothing special required"],
    correctIndex: 1,
    explanation: "Motor control circuits have specific sequences including safety interlocks, control signals, and protective systems that must operate correctly."
  },
  {
    id: 4,
    question: "How does sequence analysis help with complex systems?",
    options: ["It makes them simpler", "It breaks them into logical, testable stages", "It reduces components", "It eliminates documentation"],
    correctIndex: 1,
    explanation: "Sequence analysis helps break complex systems into manageable, logical stages that can be tested systematically."
  }
];

const Module7Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What does 'sequence of operation' mean in electrical systems?",
      options: [
        "The order components were installed",
        "The normal operational flow and timing of circuit functions",
        "The testing procedure order",
        "The maintenance schedule"
      ],
      correctAnswer: 1,
      explanation: "Sequence of operation describes how a circuit should function normally, including the order and timing of electrical events."
    },
    {
      id: 2,
      question: "How does understanding sequence help in fault diagnosis?",
      options: [
        "It eliminates the need for testing",
        "It helps identify where the normal operational flow is interrupted",
        "It speeds up installation",
        "It reduces material costs"
      ],
      correctAnswer: 1,
      explanation: "By understanding normal operation, electricians can identify exactly where faults interrupt the expected sequence of events."
    },
    {
      id: 3,
      question: "In a lighting circuit, what is the normal sequence of operation?",
      options: [
        "Lamp → Switch → Supply",
        "Supply → Protection → Switch → Lamp → Neutral return",
        "Switch → Lamp → Supply",
        "Protection → Lamp → Switch"
      ],
      correctAnswer: 1,
      explanation: "Normal lighting sequence: supply voltage → protective device → switch → lamp → neutral return path."
    },
    {
      id: 4,
      question: "What happens if the neutral connection fails in this sequence?",
      options: [
        "Lamp works normally",
        "Circuit cannot complete and lamp will not illuminate",
        "Only lamp brightness is affected",
        "Switch becomes faulty"
      ],
      correctAnswer: 1,
      explanation: "Without a proper neutral return path, the circuit cannot complete and the lamp will not function."
    },
    {
      id: 5,
      question: "In motor control systems, what typically happens first in the sequence?",
      options: [
        "Motor starts immediately",
        "Safety interlocks and permits are checked",
        "Overload protection activates",
        "Motor runs at full speed"
      ],
      correctAnswer: 1,
      explanation: "Motor control sequences typically begin with safety interlock verification before any other operations can proceed."
    },
    {
      id: 6,
      question: "Why should fault finding follow the operational sequence?",
      options: [
        "It's faster than random testing",
        "It provides logical progression and prevents missing faults",
        "It uses less equipment",
        "It's required by BS 7671"
      ],
      correctAnswer: 1,
      explanation: "Following the operational sequence ensures logical, systematic fault finding and prevents missing interconnected problems."
    },
    {
      id: 7,
      question: "What should you do if a circuit deviates from expected sequence?",
      options: [
        "Ignore minor deviations",
        "Investigate the deviation point as potential fault location",
        "Continue with normal testing",
        "Replace all components"
      ],
      correctAnswer: 1,
      explanation: "Any deviation from expected sequence indicates a potential fault location that requires investigation."
    },
    {
      id: 8,
      question: "How does sequence analysis help with complex control systems?",
      options: [
        "It eliminates the need for documentation",
        "It breaks complex systems into logical, testable stages",
        "It reduces the number of components",
        "It simplifies wiring requirements"
      ],
      correctAnswer: 1,
      explanation: "Sequence analysis helps break complex systems into manageable, logical stages that can be tested systematically."
    },
    {
      id: 9,
      question: "What documentation helps understand circuit sequences?",
      options: [
        "Only installation certificates",
        "Circuit diagrams, control schematics, and operational manuals",
        "Only test results",
        "Material lists only"
      ],
      correctAnswer: 1,
      explanation: "Circuit diagrams, control schematics, and operational manuals provide essential information about intended operational sequences."
    },
    {
      id: 10,
      question: "When should sequence analysis be performed?",
      options: [
        "Only after faults occur",
        "Before starting any fault diagnosis work",
        "Only during installation",
        "Only during maintenance"
      ],
      correctAnswer: 1,
      explanation: "Sequence analysis should be performed before starting fault diagnosis to understand how the system should work normally."
    }
  ];

  const faqs = [
    {
      question: "How do you determine the correct sequence of operation?",
      answer: "Review circuit diagrams, manufacturer documentation, and observe normal system operation. For complex systems, trace the control logic from start to finish."
    },
    {
      question: "What if documentation is missing for sequence analysis?",
      answer: "Carefully observe system operation when working, trace control circuits visually, and consult manufacturer resources. Document your findings for future reference."
    },
    {
      question: "Can sequence analysis prevent some fault diagnosis work?",
      answer: "Yes, understanding normal operation often reveals obvious deviations that point directly to fault locations, reducing extensive testing requirements."
    },
    {
      question: "How detailed should sequence analysis be?",
      answer: "Detail level depends on system complexity. Simple circuits need basic sequence understanding, while complex control systems require detailed operational flow analysis."
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
              <span className="text-white/60">Section 4.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Understanding the Sequence of Operation
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
              Analysing how electrical circuits should function normally to identify where faults occur.
            </p>
          </header>

          {/* In 30 Seconds Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 space-y-1 text-sm">
              <li>• Understanding normal circuit operation is essential for effective fault diagnosis.</li>
              <li>• Sequence of operation describes how electrical systems should function step-by-step.</li>
              <li>• Faults interrupt normal sequences, making deviations key diagnostic indicators.</li>
            </ul>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2 leading-relaxed">
              <li>• Explain what sequence of operation means in electrical systems.</li>
              <li>• Describe how understanding normal operation aids fault diagnosis.</li>
              <li>• Analyse simple and complex circuit operational sequences.</li>
              <li>• Identify where faults interrupt normal operational flow.</li>
              <li>• Apply sequence analysis to systematic fault-finding approaches.</li>
            </ul>
          </section>

          {/* Section 1: Understanding Sequence */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Understanding Sequence of Operation
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                The sequence of operation describes the intended flow of electrical events in a circuit, from initial energisation through normal operation to controlled shutdown. This understanding forms the foundation of effective fault diagnosis.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">Temporal Elements</p>
                  <ul className="text-sm space-y-1">
                    <li>• Chronological order of events</li>
                    <li>• Time delays and sequencing</li>
                    <li>• Startup and shutdown procedures</li>
                    <li>• Emergency response timing</li>
                    <li>• Maintenance windows and schedules</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">Functional Dependencies</p>
                  <ul className="text-sm space-y-1">
                    <li>• Component interdependencies</li>
                    <li>• Control signal pathways</li>
                    <li>• Feedback loops and monitoring</li>
                    <li>• Conditional logic operations</li>
                    <li>• System state transitions</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Safety Integration and Protection</p>
                <ul className="text-sm space-y-1">
                  <li>• Safety interlock verification before operation commencement</li>
                  <li>• Protective device coordination and selectivity principles</li>
                  <li>• Emergency stop sequences and safe shutdown procedures</li>
                  <li>• Fail-safe design principles and redundancy systems</li>
                  <li>• Alarm generation, escalation, and notification protocols</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mt-6">
                <p className="text-sm">
                  <strong className="text-elec-yellow">Critical insight:</strong> Every electrical system tells an operational story. Understanding this narrative enables electricians to identify precisely where faults disrupt normal function and guides systematic diagnostic approaches.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="sequence-basics"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 2: Simple Circuit Sequences */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Simple Circuit Operational Sequences
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Basic circuits follow predictable sequences that form the foundation for understanding complex systems. Mastering these fundamental patterns enables effective diagnosis of sophisticated installations.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10 my-6">
                <p className="font-medium text-white mb-3">Lighting Circuit Analysis</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-sm mb-2">Normal Operational Flow</p>
                    <ol className="text-sm space-y-1 list-decimal pl-4">
                      <li>Supply voltage present at distribution board (230V ±10%)</li>
                      <li>Current flows through protective device (MCB rating matched to load)</li>
                      <li>Switch operation completes circuit path to luminaire</li>
                      <li>Current energises lamp (LED driver, fluorescent ballast, or filament)</li>
                      <li>Return current flows via neutral conductor</li>
                    </ol>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-2">Fault Manifestations</p>
                    <ul className="text-sm space-y-1 list-disc pl-4">
                      <li>Complete failure = open circuit in live or neutral path</li>
                      <li>Reduced brightness = high resistance joints</li>
                      <li>Flickering = loose connections causing intermittent contact</li>
                      <li>MCB tripping = overload condition or short circuit</li>
                      <li>Multiple lamps affected = fault in common supply section</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">Two-Way Switching Logic</p>
                  <ul className="text-sm space-y-1">
                    <li>• Common terminal maintains permanent live connection</li>
                    <li>• L1 and L2 terminals provide alternative switched paths</li>
                    <li>• Switch positions determine circuit completion logic</li>
                    <li>• Neutral connects directly to load</li>
                    <li>• Either switch can control the load from its location</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">Intermediate Switching</p>
                  <ul className="text-sm space-y-1">
                    <li>• Intermediate switches perform cross-connection of L1 and L2</li>
                    <li>• Each operation reverses the connection polarity</li>
                    <li>• Multiple intermediate switches can be cascaded</li>
                    <li>• Fault in any switch affects entire arrangement</li>
                    <li>• Complex fault diagnosis requires systematic testing</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mt-6">
                <p className="text-sm">
                  <strong className="text-elec-yellow">Diagnostic principle:</strong> Understanding these basic sequences allows electricians to identify exactly where normal operation breaks down, enabling efficient fault location without extensive testing.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="simple-circuits-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Section 3: Complex Systems */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Complex Control System Sequences
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Industrial and commercial systems involve intricate sequences with multiple decision points, safety interlocks, and coordinated operations that require systematic analysis for effective fault diagnosis.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10 my-6">
                <p className="font-medium text-white mb-3">Motor Control System Analysis</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-sm mb-2">Startup Sequence</p>
                    <ol className="text-sm space-y-1 list-decimal pl-4">
                      <li>Safety interlock verification (guards, stops, permissions)</li>
                      <li>Control signal validation and processing</li>
                      <li>Auxiliary contactor energisation for control circuits</li>
                      <li>Main contactor operation to connect motor to supply</li>
                      <li>Motor acceleration monitoring and protection</li>
                      <li>Running condition feedback and status indication</li>
                    </ol>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-2">Protection Integration</p>
                    <ul className="text-sm space-y-1 list-disc pl-4">
                      <li>Overload protection monitors current and temperature</li>
                      <li>Short circuit protection provides rapid disconnection</li>
                      <li>Phase failure detection prevents single-phasing</li>
                      <li>Under-voltage protection ensures adequate supply</li>
                      <li>Emergency stop systems provide immediate shutdown</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">HVAC Control System Operations</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-sm mb-2">Temperature Control Sequence</p>
                    <ol className="text-sm space-y-1 list-decimal pl-4">
                      <li>Temperature sensor monitoring and signal conditioning</li>
                      <li>Setpoint comparison and deviation calculation</li>
                      <li>Control algorithm processing (PID control logic)</li>
                      <li>Output signal generation for actuators and valves</li>
                      <li>Equipment staging based on load requirements</li>
                    </ol>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-2">System Coordination</p>
                    <ul className="text-sm space-y-1 list-disc pl-4">
                      <li>Multiple zone coordination and prioritisation</li>
                      <li>Time-based scheduling and occupancy sensing</li>
                      <li>Energy optimisation and demand management</li>
                      <li>Alarm generation and maintenance notifications</li>
                      <li>Integration with building management systems</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mt-6">
                <p className="text-sm">
                  <strong className="text-elec-yellow">Complex system principle:</strong> Even the most sophisticated control systems can be broken down into simple, logical sequences. Understanding these building blocks enables systematic fault diagnosis of complex installations.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="complex-systems-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Section 4: Application to Fault Finding */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Applying Sequence Analysis to Fault Finding
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Understanding normal sequences allows systematic identification of where faults interrupt expected operation.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10 my-6">
                <p className="font-medium text-white mb-3">Systematic Approach</p>
                <ol className="text-sm space-y-1 list-decimal pl-4">
                  <li>Map the expected operational sequence</li>
                  <li>Identify where the sequence breaks down</li>
                  <li>Test systematically from that point</li>
                  <li>Verify repair restores normal sequence</li>
                </ol>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">Documentation Sources</p>
                  <ul className="text-sm space-y-1">
                    <li>• Circuit diagrams</li>
                    <li>• Control schematics</li>
                    <li>• Operation manuals</li>
                    <li>• Previous test records</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-3">Benefits</p>
                  <ul className="text-sm space-y-1">
                    <li>• Faster fault location</li>
                    <li>• Logical test progression</li>
                    <li>• Prevents missed faults</li>
                    <li>• Improves safety</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="sequence-application"
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
              <p className="font-medium text-white mb-3">Case Study: Manufacturing Conveyor System Failure</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white/90 mb-2">Reported Problem:</p>
                  <ul className="space-y-1 list-disc pl-4">
                    <li>Conveyor belt stops randomly during operation</li>
                    <li>No obvious pattern to failures</li>
                    <li>Emergency stop button seems functional</li>
                    <li>Motor starter shows no obvious signs of fault</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white/90 mb-2">Sequence Analysis Applied:</p>
                  <ol className="space-y-1 list-decimal pl-4">
                    <li>Traced expected sequence from start to stop</li>
                    <li>Identified sequence broke at safety guard verification</li>
                    <li>Found intermittent guard switch operation</li>
                    <li>Vibration causing micro-switch to lose contact</li>
                    <li>Replaced faulty switch and adjusted mounting</li>
                  </ol>
                </div>
              </div>
              <div className="mt-4 p-3 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm"><strong className="text-elec-yellow">Key insight:</strong> By following the operational sequence rather than random testing, the fault was located in 20 minutes instead of potentially hours of motor and control system diagnostics.</p>
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
                  <li>• Sequence of operation describes how systems should function normally</li>
                  <li>• Understanding normal flow helps identify where faults occur</li>
                  <li>• Simple circuits provide foundation for complex system analysis</li>
                  <li>• Documentation and observation reveal operational sequences</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Remember</h3>
                <ul className="text-sm text-white/70 space-y-2">
                  <li>• Map sequences before starting fault diagnosis</li>
                  <li>• Follow logical progression through systems</li>
                  <li>• Any deviation indicates potential fault location</li>
                  <li>• Complex systems break into simple sequences</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} title="Knowledge Check: Sequence of Operation" />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full sm:w-auto text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="sm:hidden">Previous</span>
                <span className="hidden sm:inline">Previous: Systematic Approach</span>
              </Link>
            </Button>
            <Button
              className="w-full sm:w-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-3">
                <span className="sm:hidden">Next</span>
                <span className="hidden sm:inline">Next: Testing One Component at a Time</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section4_2;
