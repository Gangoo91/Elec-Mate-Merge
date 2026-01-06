import { ArrowLeft, ArrowRight, Search, CheckCircle, AlertTriangle, FileText, Users, Wrench, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Understanding the Sequence of Operation - Module 7.4.2 | Level 2 Electrical Course";
const DESCRIPTION = "Analysing how electrical circuits should function normally to identify where faults occur.";

// Inline check questions
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
              Section 7.4.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Understanding the Sequence of Operation
          </h1>
          <p className="text-white text-sm sm:text-base">
            Analysing how electrical circuits should function normally to identify where faults occur
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Understanding normal circuit operation is essential for effective fault diagnosis.</li>
                <li>Sequence of operation describes how electrical systems should function step-by-step.</li>
                <li>Faults interrupt normal sequences, making deviations key diagnostic indicators.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
              <p className="font-medium mb-2">Spot it / Use it / Check</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Deviations from expected operational flow.</li>
                <li><strong>Use:</strong> Circuit diagrams and operational documentation.</li>
                <li><strong>Check:</strong> Each stage of sequence against normal operation.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-white">
            <li>Explain what sequence of operation means in electrical systems.</li>
            <li>Describe how understanding normal operation aids fault diagnosis.</li>
            <li>Analyse simple and complex circuit operational sequences.</li>
            <li>Identify where faults interrupt normal operational flow.</li>
            <li>Apply sequence analysis to systematic fault-finding approaches.</li>
          </ul>
        </Card>

        {/* Content - 4 main blocks with inline checks after 1 and 4 */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Content / Learning</h2>

          {/* Block 1: Core concepts */}
          <section className="mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-elec-yellow ">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-elec-yellow dark:text-elec-yellow mb-4 text-base sm:text-lg">Understanding Sequence of Operation</h3>
                  <p className="text-sm sm:text-base text-white mb-4">
                    The sequence of operation describes the intended flow of electrical events in a circuit, from initial energisation through normal operation to controlled shutdown. This understanding forms the foundation of effective fault diagnosis.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-white mb-3">Fundamental Components of Operational Sequence</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">Temporal Elements</p>
                          <ul className="text-xs text-white space-y-1">
                            <li>• Chronological order of events</li>
                            <li>• Time delays and sequencing</li>
                            <li>• Startup and shutdown procedures</li>
                            <li>• Emergency response timing</li>
                            <li>• Maintenance windows and schedules</li>
                          </ul>
                        </div>
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">Functional Dependencies</p>
                          <ul className="text-xs text-white space-y-1">
                            <li>• Component interdependencies</li>
                            <li>• Control signal pathways</li>
                            <li>• Feedback loops and monitoring</li>
                            <li>• Conditional logic operations</li>
                            <li>• System state transitions</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-white mb-3">Control Logic and Decision Making</p>
                      <div className="bg-[#121212]/30 p-4 rounded-lg">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-sm mb-2">Input Processing</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Sensor data interpretation (temperature, pressure, position)</li>
                              <li>• Digital and analogue signal processing</li>
                              <li>• User interface inputs and commands</li>
                              <li>• External communication signals</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-sm mb-2">Decision Algorithms</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Boolean logic operations (AND, OR, NOT)</li>
                              <li>• Conditional statements and branches</li>
                              <li>• Priority management and arbitration</li>
                              <li>• Error handling and recovery procedures</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-white mb-3">Safety Integration and Protection</p>
                      <div className="bg-[#121212]/30 p-3 rounded-lg">
                        <ul className="text-xs text-white space-y-1">
                          <li>• Safety interlock verification before operation commencement</li>
                          <li>• Protective device coordination and selectivity principles</li>
                          <li>• Emergency stop sequences and safe shutdown procedures</li>
                          <li>• Fail-safe design principles and redundancy systems</li>
                          <li>• Alarm generation, escalation, and notification protocols</li>
                          <li>• Integration with fire safety and building management systems</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs sm:text-xs sm:text-sm text-white bg-[#121212]/50 p-3 rounded border mt-4">
                    <strong>Critical insight:</strong> Every electrical system tells an operational story. Understanding this narrative enables electricians to identify precisely where faults disrupt normal function and guides systematic diagnostic approaches.
                  </div>
                </div>
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
          <Separator className="my-6 sm:my-8" />

          {/* Block 2: Simple circuits */}
          <section className="mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-green-500 ">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-600 dark:text-green-400 mb-4 text-base sm:text-lg">Simple Circuit Operational Sequences</h3>
                  <p className="text-sm sm:text-base text-white mb-4">
                    Basic circuits follow predictable sequences that form the foundation for understanding complex systems. Mastering these fundamental patterns enables effective diagnosis of sophisticated installations.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-white mb-3">Detailed Lighting Circuit Analysis</p>
                      <div className="bg-[#121212]/30 p-4 rounded-lg">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-sm mb-2">Normal Operational Flow</p>
                            <ol className="text-xs text-white space-y-1 list-decimal pl-4">
                              <li>Supply voltage present at distribution board (230V ±10%)</li>
                              <li>Current flows through protective device (MCB rating matched to load)</li>
                              <li>Switch operation completes circuit path to luminaire</li>
                              <li>Current energises lamp (LED driver, fluorescent ballast, or filament)</li>
                              <li>Return current flows via neutral conductor to supply transformer</li>
                              <li>Earth conductor provides safety path but carries no current normally</li>
                            </ol>
                          </div>
                          <div>
                            <p className="font-medium text-sm mb-2">Fault Manifestations</p>
                            <ul className="text-xs text-white space-y-1 list-disc pl-4">
                              <li>Complete failure = open circuit in live or neutral path</li>
                              <li>Reduced brightness = high resistance joints or connections</li>
                              <li>Flickering = loose connections causing intermittent contact</li>
                              <li>MCB tripping = overload condition or short circuit fault</li>
                              <li>Multiple lamps affected = fault in common supply section</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium text-white mb-3">Socket Circuit Comprehensive Analysis</p>
                      <div className="space-y-3">
                        <div className="bg-[#121212]/30 p-4 rounded-lg">
                          <p className="font-medium text-sm mb-2">Ring Final Circuit Sequence</p>
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div>
                              <p className="text-xs font-medium mb-1">Normal Operation:</p>
                              <ol className="text-xs text-white space-y-1 list-decimal pl-4">
                                <li>Ring energised from both ends at distribution board</li>
                                <li>Live and neutral rings provide parallel paths</li>
                                <li>Load current divides according to cable resistances</li>
                                <li>All socket outlets maintain equal voltage</li>
                                <li>Earth ring ensures protective conductor continuity</li>
                                <li>RCD monitors current balance for safety</li>
                              </ol>
                            </div>
                            <div>
                              <p className="text-xs font-medium mb-1">Fault Indicators:</p>
                              <ul className="text-xs text-white space-y-1 list-disc pl-4">
                                <li>Voltage drop = high resistance or open neutral</li>
                                <li>Some sockets dead = break in ring continuity</li>
                                <li>RCD tripping = earth leakage or N-E fault</li>
                                <li>Overheating = loose connections or overload</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#121212]/30 p-4 rounded-lg">
                          <p className="font-medium text-sm mb-2">Radial Circuit Sequence</p>
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div>
                              <p className="text-xs font-medium mb-1">Sequential Flow:</p>
                              <ol className="text-xs text-white space-y-1 list-decimal pl-4">
                                <li>Single supply cable feeds first socket outlet</li>
                                <li>Current flows through each outlet in sequence</li>
                                <li>Each socket depends on integrity of previous connections</li>
                                <li>Cumulative voltage drop increases along circuit</li>
                                <li>Earth continuity relies on unbroken chain</li>
                                <li>Protection device sized for total connected load</li>
                              </ol>
                            </div>
                            <div>
                              <p className="text-xs font-medium mb-1">Characteristics:</p>
                              <ul className="text-xs text-white space-y-1 list-disc pl-4">
                                <li>Single point failure affects all downstream outlets</li>
                                <li>Higher current density than ring circuits</li>
                                <li>Simpler fault location due to linear topology</li>
                                <li>More susceptible to voltage drop issues</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-white mb-3">Advanced Switching Arrangements</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">Two-Way Switching Logic</p>
                          <ul className="text-xs text-white space-y-1">
                            <li>• Common terminal maintains permanent live connection</li>
                            <li>• L1 and L2 terminals provide alternative switched paths</li>
                            <li>• Switch positions determine circuit completion logic</li>
                            <li>• Neutral connects directly to load, independent of switching</li>
                            <li>• Either switch can control the load from its location</li>
                          </ul>
                        </div>
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">Intermediate Switching</p>
                          <ul className="text-xs text-white space-y-1">
                            <li>• Intermediate switches perform cross-connection of L1 and L2</li>
                            <li>• Each operation reverses the connection polarity</li>
                            <li>• Multiple intermediate switches can be cascaded in series</li>
                            <li>• Fault in any switch affects entire switching arrangement</li>
                            <li>• Complex fault diagnosis requires systematic testing approach</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs sm:text-xs sm:text-sm text-white bg-[#121212]/50 p-3 rounded border mt-4">
                    <strong>Diagnostic principle:</strong> Understanding these basic sequences allows electricians to identify exactly where normal operation breaks down, enabling efficient fault location without extensive testing.
                  </div>
                </div>
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
          <Separator className="my-6 sm:my-8" />

          {/* Block 3: Complex systems */}
          <section className="mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-orange-500 ">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-600 dark:text-elec-yellow mb-4 text-base sm:text-lg">Complex Control System Sequences</h3>
                  <p className="text-sm sm:text-base text-white mb-4">
                    Industrial and commercial systems involve intricate sequences with multiple decision points, safety interlocks, and coordinated operations that require systematic analysis for effective fault diagnosis.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-white mb-3">Motor Control System Analysis</p>
                      <div className="bg-[#121212]/30 p-4 rounded-lg">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-sm mb-2">Startup Sequence</p>
                            <ol className="text-xs text-white space-y-1 list-decimal pl-4">
                              <li>Safety interlock verification (guards, stops, permissions)</li>
                              <li>Control signal validation and processing</li>
                              <li>Auxiliary contactor energisation for control circuits</li>
                              <li>Main contactor operation to connect motor to supply</li>
                              <li>Motor acceleration monitoring and protection</li>
                              <li>Running condition feedback and status indication</li>
                              <li>Load monitoring and performance verification</li>
                            </ol>
                          </div>
                          <div>
                            <p className="font-medium text-sm mb-2">Protection Integration</p>
                            <ul className="text-xs text-white space-y-1 list-disc pl-4">
                              <li>Overload protection monitors current and temperature</li>
                              <li>Short circuit protection provides rapid disconnection</li>
                              <li>Phase failure detection prevents single-phasing</li>
                              <li>Under-voltage protection ensures adequate supply</li>
                              <li>Emergency stop systems provide immediate shutdown</li>
                              <li>Thermal protection prevents overheating damage</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-white mb-3">HVAC Control System Operations</p>
                      <div className="bg-[#121212]/30 p-4 rounded-lg">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-sm mb-2">Temperature Control Sequence</p>
                            <ol className="text-xs text-white space-y-1 list-decimal pl-4">
                              <li>Temperature sensor monitoring and signal conditioning</li>
                              <li>Setpoint comparison and deviation calculation</li>
                              <li>Control algorithm processing (PID control logic)</li>
                              <li>Output signal generation for actuators and valves</li>
                              <li>Equipment staging based on load requirements</li>
                              <li>Feedback monitoring and adjustment cycles</li>
                            </ol>
                          </div>
                          <div>
                            <p className="font-medium text-sm mb-2">System Coordination</p>
                            <ul className="text-xs text-white space-y-1 list-disc pl-4">
                              <li>Multiple zone coordination and prioritisation</li>
                              <li>Time-based scheduling and occupancy sensing</li>
                              <li>Energy optimisation and demand management</li>
                              <li>Alarm generation and maintenance notifications</li>
                              <li>Integration with building management systems</li>
                              <li>Remote monitoring and control capabilities</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-white mb-3">Fire Safety and Emergency Systems</p>
                      <div className="bg-[#121212]/30 p-4 rounded-lg">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-sm mb-2">Detection and Alarm Sequence</p>
                            <ol className="text-xs text-white space-y-1 list-decimal pl-4">
                              <li>Smoke/heat detector activation and signal transmission</li>
                              <li>Fire alarm panel processing and zone identification</li>
                              <li>Audible and visual alarm activation throughout building</li>
                              <li>Automatic fire brigade notification systems</li>
                              <li>Smoke extraction and fire damper operation</li>
                              <li>Emergency lighting and exit sign illumination</li>
                            </ol>
                          </div>
                          <div>
                            <p className="font-medium text-sm mb-2">Safety System Integration</p>
                            <ul className="text-xs text-white space-y-1 list-disc pl-4">
                              <li>Lift recall to ground floor and service shutdown</li>
                              <li>Air conditioning system shutdown to prevent smoke spread</li>
                              <li>Fire door release and automatic closure systems</li>
                              <li>Sprinkler system activation and water flow monitoring</li>
                              <li>Gas isolation and electrical system selective shutdown</li>
                              <li>Communication with emergency services and building control</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-white mb-3">Industrial Process Control</p>
                      <div className="bg-[#121212]/30 p-3 rounded-lg">
                        <ul className="text-xs text-white space-y-1">
                          <li>• Multi-stage process sequencing with precise timing control</li>
                          <li>• Sensor feedback integration for closed-loop process control</li>
                          <li>• Quality control monitoring and automatic adjustment systems</li>
                          <li>• Material handling coordination and inventory management</li>
                          <li>• Production line synchronisation and bottleneck prevention</li>
                          <li>• Data logging and performance analysis for continuous improvement</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs sm:text-xs sm:text-sm text-white bg-[#121212]/50 p-3 rounded border mt-4">
                    <strong>Complex system principle:</strong> Even the most sophisticated control systems can be broken down into simple, logical sequences. Understanding these building blocks enables systematic fault diagnosis of complex installations.
                  </div>
                </div>
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
          <Separator className="my-6 sm:my-8" />

          {/* Block 4: Application to fault finding */}
          <section className="mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-purple-500 ">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-600 dark:text-elec-yellow mb-4 text-base sm:text-lg">Applying Sequence Analysis to Fault Finding</h3>
                  <p className="text-sm sm:text-base text-white mb-4">
                    Understanding normal sequences allows systematic identification of where faults interrupt expected operation.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-[#121212]/30 p-4 rounded-lg">
                      <p className="font-medium text-sm mb-2">Systematic Approach</p>
                      <ol className="text-xs text-white space-y-1 list-decimal pl-4">
                        <li>Map the expected operational sequence</li>
                        <li>Identify where the sequence breaks down</li>
                        <li>Test systematically from that point</li>
                        <li>Verify repair restores normal sequence</li>
                      </ol>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="bg-[#121212]/30 p-3 rounded-lg">
                        <p className="font-medium text-sm mb-2">Documentation Sources</p>
                        <ul className="text-xs text-white space-y-1">
                          <li>• Circuit diagrams</li>
                          <li>• Control schematics</li>
                          <li>• Operation manuals</li>
                          <li>• Previous test records</li>
                        </ul>
                      </div>
                      <div className="bg-[#121212]/30 p-3 rounded-lg">
                        <p className="font-medium text-sm mb-2">Benefits</p>
                        <ul className="text-xs text-white space-y-1">
                          <li>• Faster fault location</li>
                          <li>• Logical test progression</li>
                          <li>• Prevents missed faults</li>
                          <li>• Improves safety</li>
                        </ul>
                      </div>
                    </div>
                  </div>
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
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Real-World Examples</h2>
          
          <div className="space-y-8">
            <div className="bg-card rounded-lg p-4 sm:p-6 border border-border/10">
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-lg border border-border/30">
                    <HardHat className="w-6 h-6 text-elec-yellow" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white mb-4 text-base sm:text-lg">Case Study 1: Manufacturing Conveyor System Failure</h3>
                  <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 text-sm">
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium mb-2 text-white">Reported Problem:</p>
                        <ul className="text-white space-y-1 list-disc pl-4">
                          <li>Conveyor belt stops randomly during operation</li>
                          <li>No obvious pattern to failures - sometimes works for hours</li>
                          <li>Emergency stop button seems functional</li>
                          <li>Motor starter shows no obvious signs of fault</li>
                          <li>Production line experiencing significant downtime</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="font-medium mb-2 text-white">Expected Normal Sequence:</p>
                        <ol className="text-white space-y-1 list-decimal pl-4">
                          <li>Safety guards verified closed and locked</li>
                          <li>Emergency stop circuit continuity confirmed</li>
                          <li>Start button pressed, control signal sent</li>
                          <li>Motor contactor energised, auxiliary contacts close</li>
                          <li>Motor starts and reaches operating speed</li>
                          <li>Speed sensor confirms belt movement</li>
                          <li>System enters normal running mode</li>
                        </ol>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium mb-2 text-white">Sequence Analysis Application:</p>
                        <ol className="text-white space-y-1 list-decimal pl-4">
                          <li><strong>Step 1:</strong> Traced expected sequence from start to stop</li>
                          <li><strong>Step 2:</strong> Identified sequence broke at safety guard verification</li>
                          <li><strong>Step 3:</strong> Found intermittent guard switch operation</li>
                          <li><strong>Step 4:</strong> Vibration causing micro-switch to lose contact</li>
                          <li><strong>Step 5:</strong> Replaced faulty switch and adjusted mounting</li>
                        </ol>
                      </div>
                      
                      <div className="bg-[#121212]/50 p-3 rounded border">
                        <p className="font-medium mb-2 text-white">Result and Learning:</p>
                        <p className="text-white mb-2">By following the operational sequence rather than random testing, the fault was located in 20 minutes instead of potentially hours of motor and control system diagnostics.</p>
                        <p className="text-xs text-white"><strong>Key insight:</strong> Safety interlocks are often overlooked but critical in the operational sequence.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 sm:p-6 border border-border/10">
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-lg border border-green-400/30">
                    <Wrench className="w-6 h-6 text-green-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white mb-4 text-base sm:text-lg">Case Study 2: Office Building HVAC Control Malfunction</h3>
                  <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 text-sm">
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium mb-2 text-white">Symptoms Reported:</p>
                        <ul className="text-white space-y-1 list-disc pl-4">
                          <li>No heating in east wing despite thermostat calling for heat</li>
                          <li>Boiler operates normally and shows no faults</li>
                          <li>Other zones in building heat correctly</li>
                          <li>Pump for east wing appears to run but no heat transfer</li>
                          <li>Problem started after weekend shutdown</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="font-medium mb-2 text-white">Normal HVAC Control Sequence:</p>
                        <ol className="text-white space-y-1 list-decimal pl-4">
                          <li>Zone thermostat detects temperature below setpoint</li>
                          <li>Control signal sent to building management system</li>
                          <li>BMS validates demand and checks system status</li>
                          <li>Boiler start signal sent (if required)</li>
                          <li>Zone pump start signal issued</li>
                          <li>Pump operates, circulating heated water</li>
                          <li>Heat exchange occurs, temperature rises</li>
                          <li>Thermostat satisfied, pump stops</li>
                        </ol>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium mb-2 text-white">Sequence-Based Diagnosis:</p>
                        <div className="space-y-2">
                          <div className="bg-[#121212]/30 p-3 rounded">
                            <p className="font-medium text-xs mb-1">Investigation Steps:</p>
                            <ol className="text-white space-y-1 list-decimal pl-4 text-xs">
                              <li>Verified thermostat operation and setpoint</li>
                              <li>Confirmed BMS receiving demand signal</li>
                              <li>Checked boiler operation - confirmed running</li>
                              <li>Verified pump electrical supply and operation</li>
                              <li>Discovered pump running but no water flow</li>
                              <li>Found isolation valve closed after maintenance</li>
                            </ol>
                          </div>
                          
                          <div className="bg-[#121212]/30 p-3 rounded">
                            <p className="font-medium text-xs mb-1">Root Cause:</p>
                            <p className="text-white text-xs">Maintenance team had isolated the east wing pump during weekend work but failed to reopen the flow isolation valve. The sequence helped identify this quickly as pump was running but no heat transfer occurred.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-[#121212]/50 p-3 rounded border">
                        <p className="font-medium mb-2 text-white">Professional Outcome:</p>
                        <p className="text-white mb-2">Following the heating sequence revealed the issue within 15 minutes. Without sequence analysis, extensive boiler and pump diagnostics would have been performed unnecessarily.</p>
                        <p className="text-xs text-white"><strong>Learning point:</strong> Always verify the complete operational path, not just electrical operation.</p>
                      </div>
                    </div>
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
                <li>• Sequence of operation describes how systems should function normally</li>
                <li>• Understanding normal flow helps identify where faults occur</li>
                <li>• Simple circuits provide foundation for complex system analysis</li>
                <li>• Documentation and observation reveal operational sequences</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-3">Remember</h3>
              <ul className="text-sm sm:text-base text-white space-y-2">
                <li>• Map sequences before starting fault diagnosis</li>
                <li>• Follow logical progression through systems</li>
                <li>• Any deviation indicates potential fault location</li>
                <li>• Complex systems break into simple sequences</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <Quiz questions={quizQuestions} title="Knowledge Check: Sequence of Operation" />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-white/10">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="sm:hidden">Previous</span>
              <span className="hidden sm:inline">Previous: Systematic Approach</span>
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../4-3">
              <span className="sm:hidden">Next</span>
              <span className="hidden sm:inline">Next: Testing One Component at a Time</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section4_2;