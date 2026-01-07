import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  Zap,
  AlertTriangle,
  BookOpen,
  Target,
  Clock,
  Shield,
  Lightbulb,
  Wrench,
  Activity,
  CheckCircle2,
  XCircle,
  GitBranch
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Quick Check Questions for InlineCheck component
const quickCheckQuestions = [
  {
    id: 'qc-fault-1',
    question: 'When using the half-split technique on a 10-stage control circuit, how many tests would you typically need to locate a fault?',
    options: ['10 tests', '5 tests', '3-4 tests', '1 test'],
    correctIndex: 2,
    explanation: 'The half-split technique works on a binary search principle. For 10 stages, you would need approximately log₂(10) ≈ 3-4 tests to isolate the fault. Each test eliminates half of the remaining circuit, making it far more efficient than sequential testing.'
  },
  {
    id: 'qc-fault-2',
    question: 'According to GS38, what is the maximum exposed metal probe tip length for test leads used on live systems?',
    options: ['10mm', '4mm', '2mm', '6mm'],
    correctIndex: 2,
    explanation: 'GS38 specifies a maximum 2mm exposed probe tip to minimize the risk of accidental short circuits and arc flash when testing live equipment. The probes should also be fused and have finger guards positioned to prevent accidental contact with live parts.'
  },
  {
    id: 'qc-fault-3',
    question: 'Before testing a suspected faulty contactor coil, what should you verify first?',
    options: ['The coil resistance', 'Control voltage is present at the coil terminals', 'The contact condition', 'Motor winding resistance'],
    correctIndex: 1,
    explanation: 'Always verify that control voltage is actually reaching the component before condemning it. Many "faulty" contactors are actually fine - the problem lies upstream in the control circuit. This systematic approach prevents unnecessary parts replacement and identifies the true root cause.'
  }
];

// Quiz Questions
const quizQuestions = [
  {
    question: 'A motor fails to start. The overload is not tripped, and the start button gives no response. Using logical fault-finding, what should you check first?',
    options: [
      'Motor winding resistance',
      'Control circuit supply voltage',
      'Contactor coil resistance',
      'Cable insulation resistance'
    ],
    correctAnswer: 'Control circuit supply voltage'
  },
  {
    question: 'When applying the half-split technique to a series control circuit with 8 components, where should you take your first measurement?',
    options: [
      'At component 1 (start)',
      'At component 8 (end)',
      'At component 4 (middle)',
      'At the control transformer'
    ],
    correctAnswer: 'At component 4 (middle)'
  },
  {
    question: 'A PLC output shows "ON" on the HMI, but the connected solenoid valve does not operate. What does this indicate?',
    options: [
      'PLC program fault',
      'Input sensor failure',
      'Fault between PLC output and solenoid',
      'Power supply failure'
    ],
    correctAnswer: 'Fault between PLC output and solenoid'
  },
  {
    question: 'According to safe isolation procedures, after locking off and proving dead, what additional step is required before working on equipment?',
    options: [
      'Inform the supervisor',
      'Apply a caution notice only',
      'Attempt to restart the equipment',
      'Check the proving unit on a known live source'
    ],
    correctAnswer: 'Check the proving unit on a known live source'
  },
  {
    question: 'An intermittent fault occurs on a conveyor system only during production. What is the most effective diagnostic approach?',
    options: [
      'Replace all contactors preventatively',
      'Wait for the fault to become permanent',
      'Monitor with data logging during operation',
      'Megger test all cables immediately'
    ],
    correctAnswer: 'Monitor with data logging during operation'
  },
  {
    question: 'When reading a control circuit diagram under time pressure, which element should you identify first?',
    options: [
      'All auxiliary contacts',
      'The power supply rails and their voltage',
      'Every component label',
      'Cable sizes'
    ],
    correctAnswer: 'The power supply rails and their voltage'
  },
  {
    question: 'A three-phase motor runs but trips on overload within 30 seconds. Single-phasing is suspected. What quick test confirms this?',
    options: [
      'Measure insulation resistance',
      'Check current draw on all three phases',
      'Measure motor temperature',
      'Check earth continuity'
    ],
    correctAnswer: 'Check current draw on all three phases'
  },
  {
    question: 'GS38 compliant test leads should include which safety feature?',
    options: [
      'Extra-long probe tips for deep access',
      'Unfused leads for maximum sensitivity',
      'Fused leads with shrouded connectors',
      'Bare metal probe shanks'
    ],
    correctAnswer: 'Fused leads with shrouded connectors'
  },
  {
    question: 'In a star-delta starter, the motor starts but fails to transition to delta. The timer has timed out. What is the most likely fault?',
    options: [
      'Main contactor failure',
      'Star contactor welded closed',
      'Motor winding fault',
      'Overload setting too low'
    ],
    correctAnswer: 'Star contactor welded closed'
  },
  {
    question: 'When documenting a fault repair, which information is MOST valuable for preventing future occurrences?',
    options: [
      'Time taken to repair',
      'Root cause analysis and corrective action',
      'Parts cost',
      'Names of personnel involved'
    ],
    correctAnswer: 'Root cause analysis and corrective action'
  }
];

// FAQ Data
const faqData = [
  {
    question: 'How do I approach a fault when I have no circuit diagrams available?',
    answer: 'Start by identifying the system type and tracing power flow visually. Document what you find as you go - create your own sketch. Use cable colours and terminal markings as guides. Check for any labels on components or inside panel doors. Many PLCs have I/O labels that help identify circuits. If time permits, contact the equipment manufacturer for documentation. Always prioritize safety - if you cannot verify the circuit, do not proceed with live testing.'
  },
  {
    question: 'What is the safest approach to live fault-finding when it cannot be avoided?',
    answer: 'Live testing should be a last resort after exhausting dead testing options. Use GS38 compliant test equipment with fused leads and shrouded probes. Wear appropriate PPE including safety glasses and insulated gloves rated for the voltage. Work with a competent colleague who can isolate in emergency. Use one-hand technique where possible. Ensure adequate lighting and a stable working position. Never work live when tired or under excessive time pressure. Complete a dynamic risk assessment before proceeding.'
  },
  {
    question: 'How can I quickly identify whether a fault is electrical or mechanical?',
    answer: 'Check if the motor/actuator receives the correct electrical supply - measure voltage at the load. If voltage is present but the load does not operate, disconnect the electrical supply and try to move the mechanism manually. Listen for unusual sounds during operation attempts. Check for seized bearings, broken couplings, or jammed mechanisms. On motors, a high current draw with no rotation indicates mechanical seizure. Thermal imaging can reveal mechanical friction. Always isolate before physical inspection of moving parts.'
  },
  {
    question: 'When should I use insulation resistance testing versus continuity testing?',
    answer: 'Use continuity testing to verify complete circuits, check for open conductors, test protective conductors, and confirm switch/contact operation. Use insulation resistance (IR) testing to check for cable breakdown, moisture ingress, contamination, or insulation deterioration between conductors or to earth. IR testing requires the circuit to be isolated and discharged. Never IR test electronic components directly. Continuity testing uses low voltage (typically under 50V) while IR testing uses 250V, 500V, or 1000V depending on circuit voltage rating.'
  },
  {
    question: 'How do I efficiently fault-find intermittent problems?',
    answer: 'Intermittent faults require patience and systematic monitoring. Install data loggers to capture events. Check all terminations for tightness - loose connections often cause intermittent issues. Flex cables while monitoring to reveal breakdown. Check for thermal-related faults by monitoring during temperature changes. Review maintenance history for patterns. Consider environmental factors: vibration, humidity, temperature cycles. Use thermal imaging during operation. Document conditions when fault occurs - time, temperature, load state, recent events. Often the most valuable clue comes from the operator who experiences the fault.'
  },
  {
    question: 'What are the most common causes of motor starter failures I should check first?',
    answer: 'The most common causes are: 1) Overload relay tripped - check and reset if appropriate after investigating cause. 2) Control circuit fuse blown - often indicates a coil or wiring fault. 3) Emergency stop or safety interlock open - check all safety devices in the circuit. 4) Loose terminations - particularly on contactors subject to vibration. 5) Contactor coil failure - measure coil resistance and check for burning smell. 6) Auxiliary contact failure - contacts wear and may need cleaning or replacement. 7) Control transformer failure on larger starters. 8) PLC output failure if applicable. Always start with the simplest, most common causes before investigating complex possibilities.'
  }
];

const IndustrialElectricalModule5Section1: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showQuickRef, setShowQuickRef] = useState(false);

  // SEO Configuration
  useSEO({
    title: 'Fault-Finding Strategies & Logic Flow | Industrial Electrical Module 5',
    description: 'Master systematic fault-finding methodology, half-split technique, circuit diagram interpretation, safe testing procedures, and time-saving troubleshooting strategies for industrial electrical systems.',
    keywords: [
      'electrical fault finding',
      'troubleshooting methodology',
      'half-split technique',
      'circuit diagram interpretation',
      'GS38 test equipment',
      'industrial maintenance',
      'logic flow analysis',
      'safe isolation procedures',
      'control circuit faults',
      'electrical diagnostics'
    ],
    canonicalUrl: '/upskilling/industrial-electrical/module-5/section-1',
    ogType: 'article'
  });

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-elec-yellow mb-2">
            <Search className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Module 5 - Section 1</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Fault-Finding Strategies and Logic Flow
          </h1>
          <p className="text-gray-400 text-lg">
            Systematic approaches to electrical troubleshooting in industrial environments
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Introduction */}
        <div className="bg-[#242424] rounded-xl p-6 mb-8 border border-gray-800">
          <div className="flex items-start gap-4">
            <div className="bg-elec-yellow/20 p-3 rounded-lg">
              <Target className="w-6 h-6 text-elec-yellow" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Learning Objectives</h2>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Apply systematic fault-finding methodology to reduce diagnostic time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Master the half-split technique for efficient circuit diagnosis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Interpret circuit diagrams effectively under time pressure</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Select and use test equipment safely in accordance with GS38</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 1: Systematic Fault-Finding Methodology */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h2 className="text-2xl font-bold">Systematic Fault-Finding Methodology</h2>
          </div>

          <div className="bg-[#242424] rounded-xl p-6 border border-gray-800 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Effective fault-finding is not about luck or intuition alone - it requires a structured approach that
              minimizes diagnostic time while maximizing safety. The systematic methodology follows a logical sequence
              that experienced maintenance electricians apply instinctively.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                The Six-Step Fault-Finding Process
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-white">Gather Information</h4>
                    <p className="text-gray-400 text-sm">Interview operators, review alarm logs, check maintenance history, note any recent changes or work carried out</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-white">Analyse Symptoms</h4>
                    <p className="text-gray-400 text-sm">Identify what works and what does not work. This immediately narrows down the search area</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-white">Study Documentation</h4>
                    <p className="text-gray-400 text-sm">Review circuit diagrams, operation manuals, and identify the relevant circuits before testing</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold text-white">Plan Your Tests</h4>
                    <p className="text-gray-400 text-sm">Develop a logical test sequence, starting with the most likely causes and safest access points</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                  <div>
                    <h4 className="font-semibold text-white">Execute Tests Systematically</h4>
                    <p className="text-gray-400 text-sm">Perform tests in sequence, recording results. Use the half-split method to efficiently isolate fault location</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">6</div>
                  <div>
                    <h4 className="font-semibold text-white">Verify and Document</h4>
                    <p className="text-gray-400 text-sm">After repair, test the system thoroughly. Document the fault, cause, and repair for future reference</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-900/30 border border-amber-600/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-400">Common Mistake</h4>
                  <p className="text-gray-300 text-sm">
                    Rushing to test without gathering information first wastes time. Five minutes spent talking to
                    the operator can save an hour of unnecessary testing. The operator often holds the key clue -
                    "It was working fine until..." is valuable diagnostic information.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">Symptom Analysis Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 px-3 text-elec-yellow">Symptom</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Likely Area</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">First Check</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-2 px-3">Complete system dead</td>
                      <td className="py-2 px-3">Main supply/fuses</td>
                      <td className="py-2 px-3">Incoming voltage</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 px-3">Motor runs, no control</td>
                      <td className="py-2 px-3">Control circuit</td>
                      <td className="py-2 px-3">Control transformer</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 px-3">Control works, motor dead</td>
                      <td className="py-2 px-3">Power circuit</td>
                      <td className="py-2 px-3">Overload/contactor</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 px-3">Intermittent operation</td>
                      <td className="py-2 px-3">Connections/contacts</td>
                      <td className="py-2 px-3">Terminations</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Trips immediately</td>
                      <td className="py-2 px-3">Short circuit</td>
                      <td className="py-2 px-3">Insulation resistance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Half-Split Technique */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h2 className="text-2xl font-bold">Half-Split Technique for Efficient Diagnosis</h2>
          </div>

          <div className="bg-[#242424] rounded-xl p-6 border border-gray-800 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              The half-split (or binary search) technique is the most efficient method for locating faults in
              series circuits. Instead of testing each component sequentially from start to finish, you test at
              the midpoint to eliminate half the circuit with each measurement.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4 flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Half-Split Method Explained
              </h3>

              <div className="space-y-4">
                <div className="bg-[#2a2a2a] rounded-lg p-4">
                  <p className="text-gray-300 mb-3">
                    Consider a control circuit with 8 series components (switches, contacts, etc.). The fault
                    causes an open circuit - the contactor will not energise.
                  </p>

                  <div className="flex items-center justify-center gap-2 py-4 overflow-x-auto">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <React.Fragment key={num}>
                        <div className={`w-10 h-10 rounded flex items-center justify-center text-sm font-bold ${
                          num === 5 ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'
                        }`}>
                          {num}
                        </div>
                        {num < 8 && <div className="w-4 h-0.5 bg-gray-600" />}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="text-center text-sm text-gray-400">
                    Component 5 has failed (shown in red) - but we do not know this yet
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-[#2a2a2a] p-3 rounded-lg">
                    <div className="bg-elec-yellow text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                    <div>
                      <p className="text-white font-medium">Test at midpoint (between 4 and 5)</p>
                      <p className="text-gray-400 text-sm">Voltage present = fault is in components 5-8. No voltage = fault is in 1-4</p>
                      <p className="text-green-400 text-sm mt-1">Result: Voltage present - fault in right half</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#2a2a2a] p-3 rounded-lg">
                    <div className="bg-elec-yellow text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                    <div>
                      <p className="text-white font-medium">Test at midpoint of right half (between 6 and 7)</p>
                      <p className="text-gray-400 text-sm">Now testing components 5-8 only</p>
                      <p className="text-green-400 text-sm mt-1">Result: No voltage - fault in 5-6</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#2a2a2a] p-3 rounded-lg">
                    <div className="bg-elec-yellow text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                    <div>
                      <p className="text-white font-medium">Test between 5 and 6</p>
                      <p className="text-gray-400 text-sm">Final test to isolate the faulty component</p>
                      <p className="text-green-400 text-sm mt-1">Result: Voltage present at input of 5, no voltage at output = Component 5 is faulty</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-900/30 border border-green-600/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Half-Split Efficiency
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- 8 components: 3 tests needed</li>
                  <li>- 16 components: 4 tests needed</li>
                  <li>- 32 components: 5 tests needed</li>
                  <li>- Sequential would need up to 8, 16, or 32 tests</li>
                </ul>
              </div>

              <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  When NOT to Use Half-Split
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- Very short circuits (3 or fewer components)</li>
                  <li>- When one component is obviously suspect</li>
                  <li>- Parallel circuit branches</li>
                  <li>- When access points are limited</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 3: Reading Circuit Diagrams Under Pressure */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h2 className="text-2xl font-bold">Reading Circuit Diagrams Under Pressure</h2>
          </div>

          <div className="bg-[#242424] rounded-xl p-6 border border-gray-800 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              When production is stopped and management is asking for updates, the pressure to diagnose quickly
              can lead to mistakes. Developing a systematic approach to circuit diagram interpretation helps
              maintain accuracy under stress.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Rapid Diagram Interpretation Strategy
              </h3>

              <div className="space-y-4">
                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="font-semibold text-white">Step 1: Identify Supply Rails</h4>
                  <p className="text-gray-400 text-sm">
                    Find L and N (or +/-) rails first. Note the voltage - this tells you what readings to expect.
                    Control circuits typically run at 24V DC, 24V AC, 110V AC, or 230V AC.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="font-semibold text-white">Step 2: Locate the Load</h4>
                  <p className="text-gray-400 text-sm">
                    Find the component that is not operating (contactor coil, solenoid, indicator).
                    This is your target - work backwards from here.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="font-semibold text-white">Step 3: Trace the Path</h4>
                  <p className="text-gray-400 text-sm">
                    Follow the circuit from supply, through all series components, to the load, and back to
                    neutral. Every component in this path must be working for the load to operate.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="font-semibold text-white">Step 4: Note Cross-References</h4>
                  <p className="text-gray-400 text-sm">
                    Auxiliary contacts are cross-referenced to their main device. If contact K1/2 does not close,
                    check why contactor K1 is not energised - the problem may be in a different part of the circuit.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-600/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-400">Pro Tip: Use Your Finger</h4>
                  <p className="text-gray-300 text-sm">
                    Physically trace the circuit path with your finger on the diagram. This prevents your eye
                    from jumping across the page and missing components. Mark your starting point and trace
                    slowly. For complex diagrams, use a highlighter to mark the relevant circuit path.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">Common Diagram Symbols Reference</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="bg-[#2a2a2a] p-3 rounded text-center">
                  <div className="text-2xl mb-1">—/—</div>
                  <p className="text-gray-400">N/O Contact</p>
                </div>
                <div className="bg-[#2a2a2a] p-3 rounded text-center">
                  <div className="text-2xl mb-1">—|/|—</div>
                  <p className="text-gray-400">N/C Contact</p>
                </div>
                <div className="bg-[#2a2a2a] p-3 rounded text-center">
                  <div className="text-2xl mb-1">⬭</div>
                  <p className="text-gray-400">Coil</p>
                </div>
                <div className="bg-[#2a2a2a] p-3 rounded text-center">
                  <div className="text-2xl mb-1">▷|</div>
                  <p className="text-gray-400">Overload</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Using Meters and Test Equipment Safely */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              4
            </div>
            <h2 className="text-2xl font-bold">Using Meters and Test Equipment Safely</h2>
          </div>

          <div className="bg-[#242424] rounded-xl p-6 border border-gray-800 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Test equipment is your primary diagnostic tool, but incorrect use can damage equipment, give false
              readings, or cause serious injury. Understanding GS38 requirements and proper test procedures is
              essential for safe and accurate fault-finding.
            </p>

            <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-400">GS38 Compliant Test Equipment Requirements</h4>
                  <ul className="text-gray-300 text-sm mt-2 space-y-1">
                    <li>- Maximum 2mm exposed probe tip length</li>
                    <li>- Fused test leads (typically 500mA or 1A fuse)</li>
                    <li>- Shrouded connectors to prevent accidental contact</li>
                    <li>- Finger guards on probes at least 50mm from tip</li>
                    <li>- Leads rated for the voltage being measured</li>
                    <li>- Category rating appropriate for application (CAT III/IV for industrial)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Safe Proving Unit Procedure
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-4 bg-[#2a2a2a] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">1</div>
                  <div>
                    <p className="text-white font-medium">Prove on Known Live</p>
                    <p className="text-gray-400 text-sm">Test your proving unit on a known live source to confirm it is working correctly</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-[#2a2a2a] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">2</div>
                  <div>
                    <p className="text-white font-medium">Test the Circuit</p>
                    <p className="text-gray-400 text-sm">Test all conductors to earth and between phases/poles to confirm dead</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-[#2a2a2a] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">3</div>
                  <div>
                    <p className="text-white font-medium">Re-prove on Known Live</p>
                    <p className="text-gray-400 text-sm">Test again on the known live source to confirm the proving unit did not fail during testing</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow" />
                  Multimeter Best Practice
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- Start on highest range, work down</li>
                  <li>- Never switch range while connected</li>
                  <li>- Check leads before each use</li>
                  <li>- Use correct input terminals</li>
                  <li>- Verify CAT rating for application</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-elec-yellow" />
                  Clamp Meter Advantages
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- Measure current without breaking circuit</li>
                  <li>- Safe for high-current measurements</li>
                  <li>- Quick checks on motor currents</li>
                  <li>- Identify unbalanced phases easily</li>
                  <li>- No contact with live conductors</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 5: Logic Flow Analysis for Control Circuits */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              5
            </div>
            <h2 className="text-2xl font-bold">Logic Flow Analysis for Control Circuits</h2>
          </div>

          <div className="bg-[#242424] rounded-xl p-6 border border-gray-800 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Understanding the logical sequence of control circuits helps predict expected states and identify
              where the logic breaks down. This is particularly important when troubleshooting complex automated
              systems with multiple interlocks and sequences.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4">Control Circuit Logic Elements</h3>

              <div className="space-y-4">
                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">AND Logic (Series Contacts)</h4>
                  <p className="text-gray-400 text-sm mb-2">
                    All conditions must be true for the output to energise. Common in safety circuits where
                    multiple guards must be closed.
                  </p>
                  <div className="bg-[#1a1a1a] p-2 rounded text-center font-mono text-sm">
                    Guard 1 AND Guard 2 AND E-Stop OK = Motor Can Start
                  </div>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">OR Logic (Parallel Contacts)</h4>
                  <p className="text-gray-400 text-sm mb-2">
                    Any one condition being true will energise the output. Common for multiple start stations
                    or alternative triggers.
                  </p>
                  <div className="bg-[#1a1a1a] p-2 rounded text-center font-mono text-sm">
                    Local Start OR Remote Start OR Auto Signal = Start Command
                  </div>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">NOT Logic (N/C Contacts)</h4>
                  <p className="text-gray-400 text-sm mb-2">
                    The output is blocked when the condition is true. Used for stops, trips, and interlocks.
                  </p>
                  <div className="bg-[#1a1a1a] p-2 rounded text-center font-mono text-sm">
                    NOT Overload Tripped AND NOT E-Stop Pressed = Run Permitted
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4">Sequence Analysis Example: Star-Delta Starter</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-20 text-right text-gray-500">T=0</div>
                  <div className="flex-1 bg-blue-600/30 p-2 rounded">
                    <span className="text-blue-400">START pressed:</span>
                    <span className="text-gray-300"> Main + Star contactors energise, timer starts</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-20 text-right text-gray-500">T=0 to T=x</div>
                  <div className="flex-1 bg-green-600/30 p-2 rounded">
                    <span className="text-green-400">RUNNING (Star):</span>
                    <span className="text-gray-300"> Motor accelerates at reduced voltage (58%)</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-20 text-right text-gray-500">T=x</div>
                  <div className="flex-1 bg-amber-600/30 p-2 rounded">
                    <span className="text-amber-400">TRANSITION:</span>
                    <span className="text-gray-300"> Timer times out, Star drops, Delta energises</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-20 text-right text-gray-500">T=x+</div>
                  <div className="flex-1 bg-green-600/30 p-2 rounded">
                    <span className="text-green-400">RUNNING (Delta):</span>
                    <span className="text-gray-300"> Motor runs at full voltage, full speed</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-900/30 border border-amber-600/50 rounded">
                <p className="text-sm text-gray-300">
                  <span className="text-amber-400 font-semibold">Fault Analysis: </span>
                  If the motor starts but never transitions to delta, check: 1) Timer operation,
                  2) Star contactor auxiliary contact (must open to allow delta), 3) Delta contactor coil,
                  4) Interlock between star and delta.
                </p>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-600/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-400">PLC Troubleshooting Tip</h4>
                  <p className="text-gray-300 text-sm">
                    When fault-finding PLC-controlled systems, use the programming software to monitor I/O status
                    live. If an input shows ON but the field device is clearly OFF (or vice versa), you have found
                    a wiring or input card fault. If logic shows output ON but the load does not operate, the fault
                    is between the PLC output and the load.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Time-Saving Strategies for Common Faults */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              6
            </div>
            <h2 className="text-2xl font-bold">Time-Saving Strategies for Common Faults</h2>
          </div>

          <div className="bg-[#242424] rounded-xl p-6 border border-gray-800 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Experience teaches that certain faults occur repeatedly. Knowing the common failure points for
              different equipment types allows you to check the most likely causes first, significantly reducing
              diagnostic time.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Quick Checks for Common Scenarios
              </h3>

              <div className="space-y-4">
                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <span className="text-red-500">Motor Will Not Start</span>
                  </h4>
                  <ol className="text-gray-300 text-sm mt-2 space-y-1 list-decimal list-inside">
                    <li>Check overload trip flag/indicator - reset if tripped (investigate cause)</li>
                    <li>Check emergency stops in circuit - all must be released and reset</li>
                    <li>Check control fuse - blown fuse indicates control circuit fault</li>
                    <li>Verify control voltage at contactor coil terminals</li>
                    <li>Check safety interlocks (guards, pressure switches, level switches)</li>
                  </ol>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <span className="text-amber-500">Motor Runs But Trips on Overload</span>
                  </h4>
                  <ol className="text-gray-300 text-sm mt-2 space-y-1 list-decimal list-inside">
                    <li>Check current on all three phases - unbalance indicates single-phasing</li>
                    <li>Compare running current to motor nameplate FLC</li>
                    <li>Check overload setting matches motor rating</li>
                    <li>Check for mechanical binding - disconnect and turn by hand</li>
                    <li>Check ambient temperature around motor and starter</li>
                  </ol>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <span className="text-blue-500">Intermittent Operation</span>
                  </h4>
                  <ol className="text-gray-300 text-sm mt-2 space-y-1 list-decimal list-inside">
                    <li>Check all terminations for tightness - loose connections are the top cause</li>
                    <li>Inspect contactor contacts for pitting or burning</li>
                    <li>Check for vibration affecting connections</li>
                    <li>Look for thermal effects - does fault correlate with temperature?</li>
                    <li>Flex cables while monitoring - reveals intermittent breaks</li>
                  </ol>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <span className="text-purple-500">Complete System Dead</span>
                  </h4>
                  <ol className="text-gray-300 text-sm mt-2 space-y-1 list-decimal list-inside">
                    <li>Check incoming supply at main isolator - upstream fault?</li>
                    <li>Check main fuses or MCCB - look for trip flags</li>
                    <li>Check control transformer primary and secondary fuses</li>
                    <li>Look for any signs of burning or damage</li>
                    <li>Check if other equipment on same supply is affected</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-green-900/30 border border-green-600/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-400">The 80/20 Rule of Fault-Finding</h4>
                  <p className="text-gray-300 text-sm">
                    80% of faults are caused by 20% of possible causes. In industrial settings, the most
                    common causes are: loose connections, worn contacts, tripped protective devices, blown
                    fuses, and failed sensors. Always check these first before investigating complex causes.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">Documentation Saves Future Time</h3>
              <p className="text-gray-300 text-sm mb-3">
                Recording fault details creates a valuable resource for future troubleshooting:
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-[#2a2a2a] p-3 rounded">
                  <p className="text-elec-yellow font-medium">Record:</p>
                  <ul className="text-gray-400 mt-1 space-y-1">
                    <li>- Equipment identification</li>
                    <li>- Symptoms observed</li>
                    <li>- Root cause found</li>
                    <li>- Repair action taken</li>
                  </ul>
                </div>
                <div className="bg-[#2a2a2a] p-3 rounded">
                  <p className="text-elec-yellow font-medium">Benefits:</p>
                  <ul className="text-gray-400 mt-1 space-y-1">
                    <li>- Identifies recurring faults</li>
                    <li>- Speeds future diagnosis</li>
                    <li>- Enables predictive maintenance</li>
                    <li>- Supports parts stocking decisions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </div>

        {/* Quick Reference Card */}
        <div className="mb-10">
          <Button
            onClick={() => setShowQuickRef(!showQuickRef)}
            className="w-full bg-[#242424] hover:bg-[#2a2a2a] text-white border border-gray-700 min-h-[44px] touch-manipulation"
          >
            <BookOpen className="w-5 h-5 mr-2 text-elec-yellow" />
            Quick Reference Card
            {showQuickRef ? (
              <ChevronUp className="w-5 h-5 ml-auto" />
            ) : (
              <ChevronDown className="w-5 h-5 ml-auto" />
            )}
          </Button>

          {showQuickRef && (
            <div className="mt-4 bg-gradient-to-br from-[#242424] to-[#1a1a1a] rounded-xl p-6 border-2 border-elec-yellow/30">
              <h3 className="text-xl font-bold text-elec-yellow mb-4 text-center">
                Fault-Finding Quick Reference
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-2 border-b border-gray-700 pb-1">
                    The Six-Step Process
                  </h4>
                  <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                    <li>Gather information</li>
                    <li>Analyse symptoms</li>
                    <li>Study documentation</li>
                    <li>Plan tests</li>
                    <li>Execute systematically</li>
                    <li>Verify and document</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2 border-b border-gray-700 pb-1">
                    GS38 Requirements
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>- 2mm max probe tip</li>
                    <li>- Fused test leads</li>
                    <li>- Shrouded connectors</li>
                    <li>- Finger guards 50mm from tip</li>
                    <li>- Appropriate CAT rating</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2 border-b border-gray-700 pb-1">
                    Half-Split Formula
                  </h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Tests needed ≈ log₂(components)
                  </p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>- 8 components = 3 tests</li>
                    <li>- 16 components = 4 tests</li>
                    <li>- 32 components = 5 tests</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2 border-b border-gray-700 pb-1">
                    Proving Unit Sequence
                  </h4>
                  <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                    <li>Test on known live source</li>
                    <li>Test circuit (all conductors)</li>
                    <li>Re-test on known live source</li>
                  </ol>
                </div>

                <div className="md:col-span-2">
                  <h4 className="font-semibold text-white mb-2 border-b border-gray-700 pb-1">
                    Common Fault Causes (Check First)
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-300">
                    <div>- Loose connections</div>
                    <div>- Tripped overloads</div>
                    <div>- Blown fuses</div>
                    <div>- E-stops engaged</div>
                    <div>- Worn contacts</div>
                    <div>- Failed sensors</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FAQs Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-elec-yellow" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-[#242424] rounded-xl border border-gray-800 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 text-left flex items-center justify-between min-h-[44px] touch-manipulation hover:bg-[#2a2a2a] transition-colors"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>

                {expandedFaq === index && (
                  <div className="px-4 pb-4 border-t border-gray-800">
                    <p className="text-gray-300 pt-4 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-10">
          <Quiz
            questions={quizQuestions}
            title="Test Your Knowledge: Fault-Finding Strategies"
            passingScore={70}
          />
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-800">
          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-4')}
            variant="outline"
            className="w-full sm:w-auto min-h-[44px] touch-manipulation bg-transparent border-gray-600 text-white hover:bg-gray-800 hover:text-elec-yellow"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous: Module 4
          </Button>

          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-5/section-2')}
            className="w-full sm:w-auto min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-yellow-500"
          >
            Next: Section 2
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Industrial Electrical Module 5 - Section 1 of 6</p>
          <p className="mt-1">Complete all sections to master fault-finding strategies</p>
        </div>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule5Section1;
