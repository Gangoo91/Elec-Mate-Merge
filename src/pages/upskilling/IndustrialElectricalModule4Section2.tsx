import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Quiz from '@/components/apprentice-courses/Quiz';
import InlineCheck from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Cpu,
  Timer,
  Hash,
  GitBranch,
  Code,
  Zap,
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  ClipboardList
} from 'lucide-react';

const IndustrialElectricalModule4Section2: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Ladder Logic and Function Blocks | Industrial Electrical Module 4 Section 2 | Elec-Mate',
    description: 'Master IEC 61131-3 programming languages including ladder logic, function block diagrams, timers, counters, and structured text for PLC programming.',
    keywords: [
      'ladder logic',
      'function block diagram',
      'IEC 61131-3',
      'PLC programming',
      'timers TON TOF TP',
      'counters CTU CTD CTUD',
      'structured text',
      'industrial automation'
    ]
  });

  const quickCheckQuestions = [
    {
      id: 'iec-languages',
      question: 'How many programming languages are defined in the IEC 61131-3 standard?',
      options: ['3 languages', '4 languages', '5 languages', '6 languages'],
      correctIndex: 2,
      explanation: 'IEC 61131-3 defines 5 programming languages: Ladder Diagram (LD), Function Block Diagram (FBD), Structured Text (ST), Instruction List (IL), and Sequential Function Chart (SFC).'
    },
    {
      id: 'ton-timer',
      question: 'What does a TON (Timer On-Delay) timer do?',
      options: [
        'Turns output ON immediately when input is TRUE',
        'Delays turning output ON after input becomes TRUE',
        'Delays turning output OFF after input becomes FALSE',
        'Generates a fixed-width pulse'
      ],
      correctIndex: 1,
      explanation: 'A TON timer delays the activation of the output. When the input goes TRUE, the timer starts counting, and the output only turns ON after the preset time has elapsed while the input remains TRUE.'
    },
    {
      id: 'counter-type',
      question: 'Which counter type can count both up and down?',
      options: ['CTU', 'CTD', 'CTUD', 'CTP'],
      correctIndex: 2,
      explanation: 'CTUD (Counter Up/Down) can count in both directions. It has separate inputs for counting up (CU) and counting down (CD), plus a reset input, making it versatile for tracking quantities that can increase or decrease.'
    }
  ];

  const quizQuestions = [
    {
      question: 'In ladder logic, what symbol represents a Normally Open (NO) contact?',
      options: [
        '|/|',
        '| |',
        '( )',
        '(/)'
      ],
      correctAnswer: '| |'
    },
    {
      question: 'What is the output symbol in ladder logic called?',
      options: ['Contact', 'Coil', 'Rung', 'Rail'],
      correctAnswer: 'Coil'
    },
    {
      question: 'In a TOF (Timer Off-Delay) timer, when does the output turn OFF?',
      options: [
        'Immediately when input goes FALSE',
        'After preset time elapses following input going FALSE',
        'After preset time elapses following input going TRUE',
        'When the reset input is activated'
      ],
      correctAnswer: 'After preset time elapses following input going FALSE'
    },
    {
      question: 'What does the .DN bit indicate on a timer in ladder logic?',
      options: [
        'Timer is currently timing',
        'Timer has reached its preset value',
        'Timer input is enabled',
        'Timer has been reset'
      ],
      correctAnswer: 'Timer has reached its preset value'
    },
    {
      question: 'Which IEC 61131-3 language is most similar to traditional relay logic?',
      options: [
        'Structured Text (ST)',
        'Function Block Diagram (FBD)',
        'Ladder Diagram (LD)',
        'Sequential Function Chart (SFC)'
      ],
      correctAnswer: 'Ladder Diagram (LD)'
    },
    {
      question: 'What happens to a CTU counter when the CU input has a rising edge and CV < PV?',
      options: [
        'CV decrements by 1',
        'CV increments by 1',
        'CV resets to 0',
        'Q output turns ON'
      ],
      correctAnswer: 'CV increments by 1'
    },
    {
      question: 'In Function Block Diagram (FBD), how are logic operations represented?',
      options: [
        'As text-based IF-THEN statements',
        'As graphical blocks with input/output connections',
        'As vertical rungs with contacts',
        'As state transition diagrams'
      ],
      correctAnswer: 'As graphical blocks with input/output connections'
    },
    {
      question: 'Which programming language is best suited for complex mathematical calculations in PLCs?',
      options: [
        'Ladder Diagram (LD)',
        'Function Block Diagram (FBD)',
        'Structured Text (ST)',
        'Instruction List (IL)'
      ],
      correctAnswer: 'Structured Text (ST)'
    },
    {
      question: 'What is the purpose of the TP (Timer Pulse) function block?',
      options: [
        'To delay an output turning ON',
        'To delay an output turning OFF',
        'To generate a pulse of fixed duration',
        'To count input pulses'
      ],
      correctAnswer: 'To generate a pulse of fixed duration'
    },
    {
      question: 'In ladder logic, what does a branch (parallel path) represent?',
      options: [
        'AND logic operation',
        'OR logic operation',
        'NOT logic operation',
        'XOR logic operation'
      ],
      correctAnswer: 'OR logic operation'
    }
  ];

  const faqs = [
    {
      question: 'Why is ladder logic still widely used when more modern programming languages exist?',
      answer: 'Ladder logic remains popular because it directly mirrors the relay-based wiring diagrams that electricians and maintenance technicians already understand. This visual representation makes troubleshooting intuitive—technicians can trace current flow through the logic just like tracing wires in a control panel. Additionally, many existing industrial systems use ladder logic, creating a large base of legacy code. For simple discrete control (ON/OFF operations), ladder logic is often the most efficient and readable choice. Most PLCs also support real-time monitoring of ladder logic, showing which rungs are energized during operation.'
    },
    {
      question: 'How do I choose between using a timer and a counter for my application?',
      answer: 'Use timers when your control depends on elapsed time—delays before starting/stopping, pulse generation, or minimum run times. Use counters when your control depends on the number of events—counting products, batching operations, or tracking cycles. Sometimes both are needed together: for example, a packaging machine might use a counter to track items (CTU) while also using timers (TON) for conveyor delays between packages. The key question is: "Am I waiting for time to pass, or am I waiting for events to occur?"'
    },
    {
      question: 'What is the difference between retentive and non-retentive timers?',
      answer: 'Non-retentive timers (standard TON, TOF, TP) reset their accumulated value to zero whenever their enable input goes FALSE. If the input is interrupted before the timer reaches its preset, timing starts over from zero when re-enabled. Retentive timers (RTO - Retentive Timer On) maintain their accumulated value even when the input goes FALSE. The accumulated time is preserved until a separate reset input is activated. Use retentive timers when you need to track total accumulated time across multiple start/stop cycles, such as equipment run-time monitoring or total operation time for maintenance scheduling.'
    },
    {
      question: 'When should I use Function Block Diagram instead of Ladder Logic?',
      answer: 'Function Block Diagram (FBD) excels for continuous processes, analog signal processing, and complex data flow applications. Use FBD when your logic involves multiple function blocks whose outputs feed into other blocks (like PID loops, scaling, and calculations working together). FBD is also preferred for motion control, drives, and applications where signal flow is more important than ON/OFF states. Many engineers find FBD more intuitive for process control while ladder logic is better for discrete manufacturing. The IEC 61131-3 standard allows mixing languages, so you can use the best tool for each part of your program.'
    },
    {
      question: 'How do I prevent issues when converting between different PLC programming languages?',
      answer: 'First, understand that not all logic translates directly between languages—some constructs in one language have no direct equivalent in another. Document your logic thoroughly with comments before converting. Be especially careful with timing-dependent logic, as different languages may execute in different orders. When converting ladder logic to structured text, watch for implicit parallel execution in ladder (multiple rungs) versus sequential execution in text. Test thoroughly after conversion, paying special attention to edge cases and timing. Many PLC platforms offer automatic conversion tools, but always verify the converted code manually.'
    },
    {
      question: 'What are best practices for organizing complex ladder logic programs?',
      answer: 'Structure your program into logical sections: inputs processing, main control logic, outputs processing, and fault handling. Use meaningful tag names that describe function, not just I/O addresses (e.g., "Motor1_RunCmd" instead of "Q0.0"). Group related rungs using subroutines or program organization units (POUs). Add comments generously—explain the "why," not just the "what." Use consistent naming conventions throughout. Implement a clear fault-handling strategy with dedicated fault routines. Keep rungs simple; if a rung becomes too complex, break it into multiple rungs with intermediate bits. Regularly review and refactor code to maintain clarity as systems evolve.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-elec-yellow mb-2">
            <Cpu className="w-6 h-6" />
            <span className="text-sm font-medium">Module 4 • Section 2</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Ladder Logic and Function Blocks
          </h1>
          <p className="text-gray-300 text-lg">
            Master IEC 61131-3 programming languages for PLC automation, including ladder diagrams,
            timers, counters, and function block programming.
          </p>
        </div>

        {/* Section 1: IEC 61131-3 Overview */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">1</span>
            </div>
            <h2 className="text-2xl font-bold text-elec-yellow">IEC 61131-3 Programming Languages Overview</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              The <strong className="text-white">IEC 61131-3 standard</strong> defines five programming languages
              for programmable logic controllers, providing a common framework across different PLC manufacturers.
              This standardization allows programmers to apply their skills across various platforms and enables
              code portability between systems.
            </p>

            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-elec-yellow" />
              The Five IEC 61131-3 Languages
            </h3>

            <div className="space-y-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-elec-yellow">
                <h4 className="font-semibold text-white mb-2">1. Ladder Diagram (LD)</h4>
                <p className="text-gray-300 text-sm">
                  Graphical language resembling electrical relay schematics. Most widely used for discrete control.
                  Ideal for electricians and maintenance personnel familiar with relay logic.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-blue-500">
                <h4 className="font-semibold text-white mb-2">2. Function Block Diagram (FBD)</h4>
                <p className="text-gray-300 text-sm">
                  Graphical language using interconnected blocks representing functions. Excellent for continuous
                  processes, analog control, and complex data flow applications.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-green-500">
                <h4 className="font-semibold text-white mb-2">3. Structured Text (ST)</h4>
                <p className="text-gray-300 text-sm">
                  High-level text-based language similar to Pascal. Best for complex calculations, data manipulation,
                  and algorithm implementation. Preferred by programmers with software development backgrounds.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-purple-500">
                <h4 className="font-semibold text-white mb-2">4. Instruction List (IL)</h4>
                <p className="text-gray-300 text-sm">
                  Low-level text language similar to assembly code. Deprecated in IEC 61131-3 3rd edition but still
                  found in legacy systems. Offers compact code but lower readability.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-orange-500">
                <h4 className="font-semibold text-white mb-2">5. Sequential Function Chart (SFC)</h4>
                <p className="text-gray-300 text-sm">
                  Graphical language for organizing programs into steps and transitions. Ideal for batch processes,
                  machine sequences, and state-based control. Often combined with other languages.
                </p>
              </div>
            </div>

            <div className="mt-6 bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-400 mb-1">Language Selection Guide</h4>
                  <p className="text-gray-300 text-sm">
                    Modern PLC projects often combine multiple languages. Use LD for discrete I/O, FBD for PID
                    and analog processing, ST for calculations, and SFC for overall sequence coordination.
                    The best language depends on the application, team skills, and maintenance requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Ladder Logic Fundamentals */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">2</span>
            </div>
            <h2 className="text-2xl font-bold text-elec-yellow">Ladder Logic Fundamentals</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              Ladder logic uses a visual representation based on electrical relay circuits. Programs are
              organized into <strong className="text-white">rungs</strong> connected between two vertical
              <strong className="text-white"> rails</strong> representing power flow from left (L1) to right (L2/N).
            </p>

            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-elec-yellow" />
              Basic Ladder Elements
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-3">Input Contacts</h4>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-green-400 w-16">| |</span>
                    <span className="text-gray-300">Normally Open (NO) - TRUE when input is ON</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-red-400 w-16">|/|</span>
                    <span className="text-gray-300">Normally Closed (NC) - TRUE when input is OFF</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-blue-400 w-16">|P|</span>
                    <span className="text-gray-300">Positive Transition - TRUE on rising edge</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-purple-400 w-16">|N|</span>
                    <span className="text-gray-300">Negative Transition - TRUE on falling edge</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-3">Output Coils</h4>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-green-400 w-16">( )</span>
                    <span className="text-gray-300">Standard Coil - Energized when rung is TRUE</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-red-400 w-16">(/)</span>
                    <span className="text-gray-300">Negated Coil - Energized when rung is FALSE</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-blue-400 w-16">(S)</span>
                    <span className="text-gray-300">Set (Latch) - Sets bit ON, stays ON</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-purple-400 w-16">(R)</span>
                    <span className="text-gray-300">Reset (Unlatch) - Resets bit OFF</span>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">Logic Implementation</h3>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-green-400 mb-2">AND Logic (Series Contacts)</h4>
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`    |     Input_A      Input_B       Output    |
    |-------| |----------| |----------( )------|
    |                                          |

    Output = Input_A AND Input_B
    Both contacts must be TRUE for output to energize`}
              </pre>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-blue-400 mb-2">OR Logic (Parallel Branches)</h4>
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`    |     Input_A                    Output    |
    |-------| |------------------------( )------|
    |                                  |        |
    |     Input_B                      |        |
    |-------| |------------------------+        |
    |                                          |

    Output = Input_A OR Input_B
    Either contact TRUE will energize output`}
              </pre>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-purple-400 mb-2">Seal-In Circuit (Latch)</h4>
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`    |     Start_PB     Stop_PB       Motor     |
    |-------| |---------| |----------( )-------|
    |          |                      |         |
    |     Motor|                      |         |
    |-------| |------------------------+         |
    |                                           |

    Motor seals in after Start_PB pressed
    Motor drops out when Stop_PB pressed (NC contact opens)`}
              </pre>
            </div>

            <div className="mt-6 bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-1">Rung Execution Order</h4>
                  <p className="text-gray-300 text-sm">
                    PLCs execute ladder logic from top to bottom, left to right. Outputs are updated at the
                    end of each scan cycle. Be aware of the scan time when designing time-critical logic—the
                    output state reflects input conditions from the previous scan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <div className="mb-12">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 3: Timers */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">3</span>
            </div>
            <h2 className="text-2xl font-bold text-elec-yellow">Timers: TON, TOF, TP Types</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              Timers are essential function blocks for controlling time-based operations. IEC 61131-3 defines
              three standard timer types, each with specific behavior for different applications.
            </p>

            <div className="flex items-center gap-2 mb-4">
              <Timer className="w-5 h-5 text-elec-yellow" />
              <h3 className="text-xl font-semibold text-white">Standard Timer Types</h3>
            </div>

            {/* TON Timer */}
            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 border-l-4 border-green-500">
              <h4 className="font-semibold text-green-400 mb-2">TON - Timer On-Delay</h4>
              <p className="text-gray-300 text-sm mb-3">
                Delays turning the output ON. The timer starts when input (IN) goes TRUE. Output (Q) turns
                ON after preset time (PT) elapses. If IN goes FALSE before PT, timer resets.
              </p>
              <div className="bg-[#242424] rounded p-3 font-mono text-xs overflow-x-auto">
                <pre className="text-gray-300">
{`Input (IN)   _____|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|_____
                  |<---- PT ---->|
Output (Q)   _____________________|‾‾‾‾‾|_____
                                  ↑
                            Q turns ON after PT

ET (Elapsed Time) counts from 0 to PT while IN is TRUE`}
                </pre>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                <strong>Use case:</strong> Motor start delay, anti-short-cycle protection, debouncing inputs
              </p>
            </div>

            {/* TOF Timer */}
            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-400 mb-2">TOF - Timer Off-Delay</h4>
              <p className="text-gray-300 text-sm mb-3">
                Delays turning the output OFF. Output (Q) turns ON immediately when input (IN) goes TRUE.
                When IN goes FALSE, Q remains ON for the preset time (PT) before turning OFF.
              </p>
              <div className="bg-[#242424] rounded p-3 font-mono text-xs overflow-x-auto">
                <pre className="text-gray-300">
{`Input (IN)   _____|‾‾‾‾‾‾‾‾‾|_________________
                            |<---- PT ---->|
Output (Q)   _____|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|___
                            ↑              ↑
                    IN goes FALSE    Q turns OFF after PT

ET counts from 0 to PT after IN goes FALSE`}
                </pre>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                <strong>Use case:</strong> Exhaust fan run-on, cooling-down periods, keep-alive signals
              </p>
            </div>

            {/* TP Timer */}
            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-400 mb-2">TP - Timer Pulse</h4>
              <p className="text-gray-300 text-sm mb-3">
                Generates a pulse of fixed duration. When input (IN) has a rising edge, output (Q) turns ON
                for exactly the preset time (PT), regardless of input state changes during the pulse.
              </p>
              <div className="bg-[#242424] rounded p-3 font-mono text-xs overflow-x-auto">
                <pre className="text-gray-300">
{`Input (IN)   _____|‾‾|_____|‾‾‾‾‾‾‾‾‾‾‾‾|____
                  ↑       ↑ (ignored during pulse)
                  |<-PT-->|<----- PT ----->|
Output (Q)   _____|‾‾‾‾‾‾‾|___|‾‾‾‾‾‾‾‾‾‾‾‾|__

Pulse is non-retriggerable during active pulse`}
                </pre>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                <strong>Use case:</strong> One-shot operations, fixed injection times, trigger pulses
              </p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-4 mt-6">Timer Parameters</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-2 px-3 text-elec-yellow">Parameter</th>
                    <th className="text-left py-2 px-3 text-elec-yellow">Type</th>
                    <th className="text-left py-2 px-3 text-elec-yellow">Description</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-3 font-mono">IN</td>
                    <td className="py-2 px-3">BOOL</td>
                    <td className="py-2 px-3">Input - starts/controls timer operation</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-3 font-mono">PT</td>
                    <td className="py-2 px-3">TIME</td>
                    <td className="py-2 px-3">Preset Time - duration of delay or pulse</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-3 font-mono">Q</td>
                    <td className="py-2 px-3">BOOL</td>
                    <td className="py-2 px-3">Output - timer done/active status</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono">ET</td>
                    <td className="py-2 px-3">TIME</td>
                    <td className="py-2 px-3">Elapsed Time - current accumulated time</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-green-900/30 border border-green-500/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-400 mb-1">TIME Format</h4>
                  <p className="text-gray-300 text-sm">
                    IEC 61131-3 TIME format: <code className="bg-[#1a1a1a] px-1 rounded">T#5s</code> (5 seconds),
                    <code className="bg-[#1a1a1a] px-1 rounded">T#1m30s</code> (1 minute 30 seconds),
                    <code className="bg-[#1a1a1a] px-1 rounded">T#500ms</code> (500 milliseconds).
                    Resolution depends on PLC scan time and timer implementation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <div className="mb-12">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 4: Counters */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">4</span>
            </div>
            <h2 className="text-2xl font-bold text-elec-yellow">Counters: CTU, CTD, CTUD</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              Counters track the number of events or pulses. IEC 61131-3 defines three counter types for
              counting up, down, or both directions. Counters are edge-triggered—they respond to signal
              transitions, not continuous states.
            </p>

            <div className="flex items-center gap-2 mb-4">
              <Hash className="w-5 h-5 text-elec-yellow" />
              <h3 className="text-xl font-semibold text-white">Counter Types</h3>
            </div>

            {/* CTU Counter */}
            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 border-l-4 border-green-500">
              <h4 className="font-semibold text-green-400 mb-2">CTU - Counter Up</h4>
              <p className="text-gray-300 text-sm mb-3">
                Counts up on each rising edge of CU input. Output Q turns ON when current value (CV)
                reaches or exceeds preset value (PV). Reset input (R) clears CV to zero.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-semibold text-gray-400 mb-2">Inputs</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li><code className="text-green-400">CU</code> - Count Up (rising edge)</li>
                    <li><code className="text-green-400">R</code> - Reset (level TRUE)</li>
                    <li><code className="text-green-400">PV</code> - Preset Value (INT)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-400 mb-2">Outputs</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li><code className="text-blue-400">Q</code> - Done (CV ≥ PV)</li>
                    <li><code className="text-blue-400">CV</code> - Current Value</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                <strong>Use case:</strong> Counting parts, batch quantities, cycle counting
              </p>
            </div>

            {/* CTD Counter */}
            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-400 mb-2">CTD - Counter Down</h4>
              <p className="text-gray-300 text-sm mb-3">
                Counts down on each rising edge of CD input. Output Q turns ON when CV reaches zero
                or goes negative. Load input (LD) sets CV to preset value (PV).
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-semibold text-gray-400 mb-2">Inputs</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li><code className="text-green-400">CD</code> - Count Down (rising edge)</li>
                    <li><code className="text-green-400">LD</code> - Load PV into CV</li>
                    <li><code className="text-green-400">PV</code> - Preset Value (INT)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-400 mb-2">Outputs</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li><code className="text-blue-400">Q</code> - Done (CV ≤ 0)</li>
                    <li><code className="text-blue-400">CV</code> - Current Value</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                <strong>Use case:</strong> Remaining inventory, countdown sequences, magazine capacity
              </p>
            </div>

            {/* CTUD Counter */}
            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-400 mb-2">CTUD - Counter Up/Down</h4>
              <p className="text-gray-300 text-sm mb-3">
                Combines up and down counting. Separate inputs for counting up (CU) and down (CD).
                Two outputs indicate upper (QU: CV ≥ PV) and lower (QD: CV ≤ 0) limits reached.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-semibold text-gray-400 mb-2">Inputs</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li><code className="text-green-400">CU</code> - Count Up (rising edge)</li>
                    <li><code className="text-green-400">CD</code> - Count Down (rising edge)</li>
                    <li><code className="text-green-400">R</code> - Reset (CV = 0)</li>
                    <li><code className="text-green-400">LD</code> - Load (CV = PV)</li>
                    <li><code className="text-green-400">PV</code> - Preset Value</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-400 mb-2">Outputs</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li><code className="text-blue-400">QU</code> - Upper limit (CV ≥ PV)</li>
                    <li><code className="text-blue-400">QD</code> - Lower limit (CV ≤ 0)</li>
                    <li><code className="text-blue-400">CV</code> - Current Value</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                <strong>Use case:</strong> Buffer level tracking, parking garage capacity, bi-directional flow
              </p>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-elec-yellow mb-3">Counter Operation Example</h4>
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`CTU Counter with PV = 5

CU Input:  _|‾|_|‾|_|‾|_|‾|_|‾|_|‾|_________
              1   2   3   4   5   6 (ignored)

CV Value:   0  1  1  2  2  3  3  4  4  5  5
                                       ↑
Q Output:  __________________________|‾‾‾‾

           Q turns ON when CV reaches PV (5)
           Additional counts continue to increment CV`}
              </pre>
            </div>

            <div className="mt-6 bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-1">Counter Overflow</h4>
                  <p className="text-gray-300 text-sm">
                    Counter values are typically stored as signed integers (INT: -32768 to +32767) or
                    double integers (DINT). Always reset counters appropriately to prevent overflow.
                    Some PLCs have overflow/underflow flags; check your specific platform documentation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <div className="mb-12">
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </div>

        {/* Section 5: Function Block Diagram */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">5</span>
            </div>
            <h2 className="text-2xl font-bold text-elec-yellow">Function Block Diagram (FBD) Basics</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              Function Block Diagram (FBD) is a graphical programming language where functions are
              represented as rectangular blocks with inputs on the left and outputs on the right.
              Blocks are connected by lines showing data flow, similar to electronic circuit diagrams.
            </p>

            <div className="flex items-center gap-2 mb-4">
              <GitBranch className="w-5 h-5 text-elec-yellow" />
              <h3 className="text-xl font-semibold text-white">FBD Structure</h3>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-elec-yellow mb-3">Basic Function Block</h4>
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`                 ┌─────────────┐
    Input1 ──────┤             ├────── Output1
                 │  FUNCTION   │
    Input2 ──────┤   BLOCK     ├────── Output2
                 │             │
    Input3 ──────┤   (Name)    │
                 └─────────────┘

    • Inputs enter from the left
    • Outputs exit from the right
    • Block name indicates function (AND, OR, TON, etc.)
    • Lines connect outputs to next block's inputs`}
              </pre>
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">Standard Logic Blocks</h3>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2 text-center">AND Block</h4>
                <pre className="text-gray-300 text-xs">
{`      ┌─────┐
 A ───┤     │
      │ AND ├─── Q
 B ───┤     │
      └─────┘
Q = A AND B`}
                </pre>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2 text-center">OR Block</h4>
                <pre className="text-gray-300 text-xs">
{`      ┌─────┐
 A ───┤     │
      │ OR  ├─── Q
 B ───┤     │
      └─────┘
Q = A OR B`}
                </pre>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-2 text-center">NOT Block</h4>
                <pre className="text-gray-300 text-xs">
{`      ┌─────┐
      │     │
 A ───┤ NOT ├─── Q
      │     │
      └─────┘
Q = NOT A`}
                </pre>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-elec-yellow mb-3">Complex FBD Example: Motor Control with Timer</h4>
              <pre className="text-gray-300 text-xs overflow-x-auto">
{`
              ┌─────┐      ┌───────────────┐
 Start_PB ───┤     │      │               │
              │ OR  ├──────┤IN          Q  ├──────── Motor_Run
 Motor_Run ──┤     │      │     TON       │
              └─────┘  ┌───┤PT         ET  ├──────── Elapsed_Time
                       │   │               │
 Stop_PB ──────────────│───┤R              │
              ┌────┐   │   └───────────────┘
 T#5s ────────┤    ├───┘
              └────┘

Flow Description:
1. Start_PB OR Motor_Run feedback creates seal-in logic
2. OR block output feeds TON timer input
3. TON delays motor start by 5 seconds
4. Stop_PB resets timer and drops output
5. Motor_Run output feeds back to OR for latching`}
              </pre>
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">FBD vs Ladder Logic Comparison</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-2 px-3 text-elec-yellow">Aspect</th>
                    <th className="text-left py-2 px-3 text-elec-yellow">Function Block Diagram</th>
                    <th className="text-left py-2 px-3 text-elec-yellow">Ladder Diagram</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-3 font-semibold">Best for</td>
                    <td className="py-2 px-3">Analog, continuous processes</td>
                    <td className="py-2 px-3">Discrete, ON/OFF control</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-3 font-semibold">Data flow</td>
                    <td className="py-2 px-3">Left-to-right, block-to-block</td>
                    <td className="py-2 px-3">Top-to-bottom, rung-by-rung</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-3 font-semibold">Strengths</td>
                    <td className="py-2 px-3">PID loops, math, data manipulation</td>
                    <td className="py-2 px-3">Interlocks, sequences, boolean</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">User familiarity</td>
                    <td className="py-2 px-3">Process engineers, programmers</td>
                    <td className="py-2 px-3">Electricians, technicians</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-400 mb-1">Execution Order in FBD</h4>
                  <p className="text-gray-300 text-sm">
                    FBD blocks execute based on data dependencies. A block executes after all its input
                    values are available. Most PLCs evaluate FBD networks from left to right, but explicit
                    execution order can be defined if needed. Avoid feedback loops without memory elements
                    (like timers or latches) to prevent undefined behavior.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Structured Text */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">6</span>
            </div>
            <h2 className="text-2xl font-bold text-elec-yellow">Structured Text and When to Use It</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              Structured Text (ST) is a high-level programming language similar to Pascal or modern scripting
              languages. It offers powerful constructs for complex logic, mathematical operations, and data
              manipulation that would be cumbersome in graphical languages.
            </p>

            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-elec-yellow" />
              <h3 className="text-xl font-semibold text-white">ST Syntax Fundamentals</h3>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-green-400 mb-3">Basic ST Constructs</h4>
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`(* Variable assignment - use := operator *)
MotorSpeed := 1500;
IsRunning := TRUE;
TankLevel := SensorInput * 0.1;

(* IF-THEN-ELSE statement *)
IF Temperature > 80.0 THEN
    CoolingFan := TRUE;
    AlarmLight := TRUE;
ELSIF Temperature > 60.0 THEN
    CoolingFan := TRUE;
    AlarmLight := FALSE;
ELSE
    CoolingFan := FALSE;
    AlarmLight := FALSE;
END_IF;

(* CASE statement for multiple conditions *)
CASE MachineState OF
    0: Status := "Idle";
    1: Status := "Running";
    2: Status := "Paused";
    3: Status := "Fault";
ELSE
    Status := "Unknown";
END_CASE;`}
              </pre>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-blue-400 mb-3">Loops and Iterations</h4>
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`(* FOR loop - known number of iterations *)
Total := 0;
FOR i := 1 TO 10 DO
    Total := Total + DataArray[i];
END_FOR;
Average := Total / 10;

(* WHILE loop - condition-based iteration *)
Index := 0;
WHILE (Index < ArraySize) AND (SearchValue <> DataArray[Index]) DO
    Index := Index + 1;
END_WHILE;

(* REPEAT-UNTIL loop - execute at least once *)
REPEAT
    ProcessStep();
    StepCount := StepCount + 1;
UNTIL StepCount >= MaxSteps;`}
              </pre>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-purple-400 mb-3">Timer/Counter in Structured Text</h4>
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`(* Declaring timer instance *)
VAR
    StartDelayTimer : TON;
    PartCounter : CTU;
END_VAR

(* Using TON timer in ST *)
StartDelayTimer(
    IN := StartButton AND NOT Emergency,
    PT := T#5s
);
MotorRun := StartDelayTimer.Q;
TimeRemaining := StartDelayTimer.PT - StartDelayTimer.ET;

(* Using CTU counter in ST *)
PartCounter(
    CU := PartSensor,
    R := ResetButton,
    PV := 100
);
BatchComplete := PartCounter.Q;
PartsProduced := PartCounter.CV;`}
              </pre>
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">When to Choose Structured Text</h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Best Uses for ST
                </h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Complex mathematical calculations</li>
                  <li>• String manipulation and parsing</li>
                  <li>• Data array operations</li>
                  <li>• Recipe management systems</li>
                  <li>• Communication protocol handling</li>
                  <li>• Algorithm implementation</li>
                  <li>• State machine logic</li>
                </ul>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Consider Other Languages When
                </h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Simple ON/OFF control (use LD)</li>
                  <li>• Maintenance by electricians (use LD)</li>
                  <li>• Visual signal flow is important (use FBD)</li>
                  <li>• Sequential batch processes (use SFC)</li>
                  <li>• Real-time troubleshooting needed</li>
                  <li>• Code must match electrical prints</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-elec-yellow mb-3">Practical Example: PID Calculation in ST</h4>
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`(* Simple PID controller implementation *)
VAR
    SetPoint, ProcessValue, Output : REAL;
    Kp, Ki, Kd : REAL := 1.0;  (* Tuning parameters *)
    Error, LastError, Integral, Derivative : REAL;
    DeltaTime : REAL := 0.1;  (* Sample time in seconds *)
END_VAR

(* Calculate error *)
Error := SetPoint - ProcessValue;

(* Integral term with anti-windup *)
Integral := Integral + (Error * DeltaTime);
IF Integral > 100.0 THEN Integral := 100.0; END_IF;
IF Integral < -100.0 THEN Integral := -100.0; END_IF;

(* Derivative term *)
Derivative := (Error - LastError) / DeltaTime;
LastError := Error;

(* Calculate output *)
Output := (Kp * Error) + (Ki * Integral) + (Kd * Derivative);

(* Clamp output to valid range *)
IF Output > 100.0 THEN Output := 100.0; END_IF;
IF Output < 0.0 THEN Output := 0.0; END_IF;`}
              </pre>
            </div>

            <div className="mt-6 bg-green-900/30 border border-green-500/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-400 mb-1">Mixing Languages</h4>
                  <p className="text-gray-300 text-sm">
                    IEC 61131-3 allows mixing languages within a project. A common approach: use SFC for
                    overall sequence control, ST for calculations and data handling, and LD for I/O interface
                    and safety interlocks. This leverages each language's strengths while maintaining
                    readability for different maintenance personnel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-2xl font-bold text-elec-yellow">Quick Reference Card</h2>
          </div>

          <div className="bg-gradient-to-br from-[#242424] to-[#1a1a1a] rounded-lg p-6 border border-elec-yellow/30">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Ladder Logic Symbols */}
              <div>
                <h3 className="font-bold text-white mb-3 border-b border-gray-600 pb-2">
                  Ladder Logic Symbols
                </h3>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-300">| |</span>
                    <span className="text-gray-400">Normally Open Contact</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">|/|</span>
                    <span className="text-gray-400">Normally Closed Contact</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">( )</span>
                    <span className="text-gray-400">Output Coil</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">(S) (R)</span>
                    <span className="text-gray-400">Set / Reset Coil</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">|P| |N|</span>
                    <span className="text-gray-400">Rising / Falling Edge</span>
                  </div>
                </div>
              </div>

              {/* Timer Summary */}
              <div>
                <h3 className="font-bold text-white mb-3 border-b border-gray-600 pb-2">
                  Timer Types
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-400 font-semibold">TON</span>
                    <span className="text-gray-400">Delay output ON</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-400 font-semibold">TOF</span>
                    <span className="text-gray-400">Delay output OFF</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-400 font-semibold">TP</span>
                    <span className="text-gray-400">Fixed-width pulse</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-400 font-semibold">RTO</span>
                    <span className="text-gray-400">Retentive on-delay</span>
                  </div>
                </div>
              </div>

              {/* Counter Summary */}
              <div>
                <h3 className="font-bold text-white mb-3 border-b border-gray-600 pb-2">
                  Counter Types
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-400 font-semibold">CTU</span>
                    <span className="text-gray-400">Count Up (Q when CV≥PV)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-400 font-semibold">CTD</span>
                    <span className="text-gray-400">Count Down (Q when CV≤0)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-400 font-semibold">CTUD</span>
                    <span className="text-gray-400">Up/Down (QU and QD)</span>
                  </div>
                </div>
              </div>

              {/* IEC Languages */}
              <div>
                <h3 className="font-bold text-white mb-3 border-b border-gray-600 pb-2">
                  IEC 61131-3 Languages
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-elec-yellow font-semibold">LD</span>
                    <span className="text-gray-400">Ladder Diagram</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-elec-yellow font-semibold">FBD</span>
                    <span className="text-gray-400">Function Block Diagram</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-elec-yellow font-semibold">ST</span>
                    <span className="text-gray-400">Structured Text</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-elec-yellow font-semibold">IL</span>
                    <span className="text-gray-400">Instruction List (deprecated)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-elec-yellow font-semibold">SFC</span>
                    <span className="text-gray-400">Sequential Function Chart</span>
                  </div>
                </div>
              </div>

              {/* ST Operators */}
              <div>
                <h3 className="font-bold text-white mb-3 border-b border-gray-600 pb-2">
                  ST Key Operators
                </h3>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-300">:=</span>
                    <span className="text-gray-400">Assignment</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">AND OR NOT XOR</span>
                    <span className="text-gray-400">Boolean</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">= &lt;&gt; &lt; &gt; &lt;= &gt;=</span>
                    <span className="text-gray-400">Comparison</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">+ - * / MOD</span>
                    <span className="text-gray-400">Arithmetic</span>
                  </div>
                </div>
              </div>

              {/* TIME Format */}
              <div>
                <h3 className="font-bold text-white mb-3 border-b border-gray-600 pb-2">
                  TIME Format Examples
                </h3>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-300">T#100ms</span>
                    <span className="text-gray-400">100 milliseconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">T#5s</span>
                    <span className="text-gray-400">5 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">T#1m30s</span>
                    <span className="text-gray-400">1 min 30 sec</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">T#2h15m</span>
                    <span className="text-gray-400">2 hr 15 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-elec-yellow mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#242424] rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-12">
          <div className="bg-[#242424] rounded-lg p-6">
            <h2 className="text-2xl font-bold text-elec-yellow mb-4">Section Quiz</h2>
            <p className="text-gray-300 mb-6">
              Test your understanding of ladder logic, function blocks, timers, and counters with this
              10-question quiz.
            </p>
            {!showQuiz ? (
              <Button
                onClick={() => setShowQuiz(true)}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation active:scale-[0.98]"
              >
                Start Quiz
              </Button>
            ) : (
              <Quiz questions={quizQuestions} />
            )}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4">
          <Button
            onClick={() => navigate('/upskilling/industrial-electrical-module4-section1')}
            variant="outline"
            className="flex items-center justify-center gap-2 min-h-[44px] touch-manipulation active:scale-[0.98] border-gray-600 text-white hover:bg-[#242424]"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous: Section 1 - PLC Fundamentals</span>
          </Button>
          <Button
            onClick={() => navigate('/upskilling/industrial-electrical-module4-section3')}
            className="flex items-center justify-center gap-2 min-h-[44px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            <span>Next: Section 3 - HMI and SCADA</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule4Section2;
