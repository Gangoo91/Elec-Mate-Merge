import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  AlertOctagon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Shield,
  Lock,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Info,
  BookOpen,
  Settings,
  Zap
} from 'lucide-react';

const IndustrialElectricalModule2Section4: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Emergency Stop and Interlock Logic | Industrial Electrical Module 2 Section 4',
    description: 'Master emergency stop categories (0, 1, 2) per BS EN ISO 13850, safety relay modules, interlock circuits for guards and doors, performance levels (PL), SIL ratings, and testing requirements under the Machinery Directive.',
    keywords: [
      'emergency stop',
      'E-stop categories',
      'BS EN ISO 13850',
      'BS EN ISO 13849-1',
      'safety relay modules',
      'interlock circuits',
      'performance levels',
      'SIL ratings',
      'Machinery Directive',
      'positive-opening contacts',
      'dual-channel monitoring'
    ],
    canonicalUrl: '/upskilling/industrial-electrical/module-2/section-4'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-s4-estop-categories',
      question: 'What is the key difference between a Category 0 and Category 1 emergency stop?',
      options: [
        'Category 0 uses two channels, Category 1 uses one channel',
        'Category 0 removes power immediately, Category 1 allows controlled stop then removes power',
        'Category 0 is for pneumatic systems only, Category 1 is for electrical systems',
        'Category 0 requires manual reset, Category 1 resets automatically'
      ],
      correctIndex: 1,
      explanation: 'Category 0 is an uncontrolled stop that removes power immediately from machine actuators. Category 1 is a controlled stop where power is available to achieve the stop, then power is removed once standstill is achieved. Category 1 is preferred where sudden power removal could create hazards.'
    },
    {
      id: 'qc2-s4-positive-contacts',
      question: 'What does "positive-opening contacts" (IEC 60947-5-1) mean in safety circuit design?',
      options: [
        'Contacts that open quickly with a positive snap action',
        'Contacts that require a positive voltage to operate',
        'Contacts mechanically linked to actuator so they cannot fail to open',
        'Contacts that provide a positive feedback signal when opened'
      ],
      correctIndex: 2,
      explanation: 'Positive-opening contacts (also called direct-opening action) have a mechanical link between the actuator and contacts ensuring that when the actuator is operated, the contacts MUST open even if welded or stuck. This is a critical safety requirement - the contacts cannot fail in a closed state.'
    },
    {
      id: 'qc3-s4-performance-level',
      question: 'According to BS EN ISO 13849-1, which Performance Level (PL) requires the highest reliability for safety functions?',
      options: [
        'PL a (lowest)',
        'PL c (medium)',
        'PL d (high)',
        'PL e (highest)'
      ],
      correctIndex: 3,
      explanation: 'Performance Levels range from PL a (lowest) to PL e (highest). PL e requires the highest reliability with a probability of dangerous failure per hour (PFHd) of less than 10^-7. PL e is typically required for high-risk applications where severe or fatal injuries could result from safety function failure.'
    }
  ];

  const quizQuestions = [
    {
      question: 'According to BS EN ISO 13850, what colour must an emergency stop actuator be?',
      options: [
        'Red on any background',
        'Red on a yellow background',
        'Red on a white background',
        'Orange on a black background'
      ],
      correctAnswer: 'Red on a yellow background'
    },
    {
      question: 'What type of operation must emergency stop devices have according to BS EN ISO 13850?',
      options: [
        'Momentary push-to-make',
        'Key-operated release',
        'Latching (maintained) with manual reset',
        'Automatic reset after 5 seconds'
      ],
      correctAnswer: 'Latching (maintained) with manual reset'
    },
    {
      question: 'In a dual-channel safety circuit, what is the purpose of cross-monitoring?',
      options: [
        'To increase the switching speed',
        'To detect discrepancies between channels indicating a fault',
        'To provide backup power during emergencies',
        'To reduce wiring costs'
      ],
      correctAnswer: 'To detect discrepancies between channels indicating a fault'
    },
    {
      question: 'What does SIL stand for in functional safety?',
      options: [
        'Safety Interlock Level',
        'System Integrity Level',
        'Safety Integrity Level',
        'Secure Installation Level'
      ],
      correctAnswer: 'Safety Integrity Level'
    },
    {
      question: 'Which standard specifically covers the safety of machinery through safety-related control systems?',
      options: [
        'BS 7671',
        'BS EN ISO 13849-1',
        'BS EN 60204-1',
        'BS EN 50110'
      ],
      correctAnswer: 'BS EN ISO 13849-1'
    },
    {
      question: 'What minimum IP rating is typically required for E-stop devices in industrial environments?',
      options: [
        'IP20',
        'IP44',
        'IP54',
        'IP65'
      ],
      correctAnswer: 'IP65'
    },
    {
      question: 'How often should safety-related control systems be functionally tested according to best practice?',
      options: [
        'Only during initial commissioning',
        'Annually or as determined by risk assessment',
        'Every 5 years',
        'Only after an incident'
      ],
      correctAnswer: 'Annually or as determined by risk assessment'
    },
    {
      question: 'What is the purpose of a guard interlock with guard locking?',
      options: [
        'To prevent the guard from being painted',
        'To prevent guard opening until dangerous conditions have ceased',
        'To allow guard opening during machine operation',
        'To eliminate the need for E-stop buttons'
      ],
      correctAnswer: 'To prevent guard opening until dangerous conditions have ceased'
    },
    {
      question: 'In Category 2 stop function, what happens to power to machine actuators?',
      options: [
        'Power is removed immediately',
        'Power is removed after controlled stop',
        'Power remains available during and after stopping',
        'Power is reduced to 50%'
      ],
      correctAnswer: 'Power remains available during and after stopping'
    },
    {
      question: 'What documentation must be maintained for safety-related control systems under the Machinery Directive?',
      options: [
        'Only the manufacturer\'s data sheets',
        'Functional safety assessment, validation records, and test documentation',
        'Just the installation certificate',
        'Only wiring diagrams'
      ],
      correctAnswer: 'Functional safety assessment, validation records, and test documentation'
    }
  ];

  const faqs = [
    {
      question: 'When should I use Category 0 vs Category 1 emergency stop?',
      answer: 'Category 0 (immediate power removal) is used when instant stopping is safe and necessary, such as on simple machines where coasting to stop poses no additional hazard. Category 1 (controlled stop then power removal) is required where sudden power loss could create hazards - for example, machines with heavy rotating masses that need controlled deceleration, vertical axes that could fall, or processes where uncontrolled stop could damage product or equipment. The risk assessment determines which category is appropriate for each application.'
    },
    {
      question: 'What is the difference between Performance Level (PL) and Safety Integrity Level (SIL)?',
      answer: 'Both PL (from BS EN ISO 13849-1) and SIL (from IEC 62061) measure the reliability of safety functions but use different methodologies. PL uses categories (a to e) and is route-based considering architecture, component reliability, and diagnostic coverage. SIL uses levels 1-3 (rarely 4) and is calculation-based on probability of dangerous failure. For machinery, PL d roughly corresponds to SIL 2, and PL e to SIL 3. The choice of standard depends on the safety function complexity - 13849-1 suits simpler systems while 62061 suits complex programmable systems.'
    },
    {
      question: 'How do I determine the required Performance Level for a safety function?',
      answer: 'Required PL (PLr) is determined through risk assessment using three parameters from BS EN ISO 13849-1 Annex A: Severity of injury (S1 slight/reversible or S2 serious/fatal), Frequency of exposure (F1 seldom/short or F2 frequent/long), and Possibility of avoiding hazard (P1 possible or P2 impossible). Using the risk graph, these combine to give PLr from a to e. For example, S2+F2+P2 (worst case) requires PLe. The achieved PL must equal or exceed the PLr.'
    },
    {
      question: 'Why are positive-opening (direct opening action) contacts mandatory for safety circuits?',
      answer: 'Positive-opening contacts ensure that NC contacts will definitively open when actuated, even if contact welding has occurred. The mechanical linkage between actuator and contacts means the opening action is forced - unlike conventional contacts which rely on spring return and can fail welded-closed. This is specified in IEC 60947-5-1 and is mandatory for any contact used in safety-critical applications. Look for the standardised symbol (circle with arrow) on devices confirming positive-opening operation.'
    },
    {
      question: 'What testing and documentation is required for safety-related control systems?',
      answer: 'Under the Machinery Directive and PUWER, you must maintain: 1) Risk assessment documenting hazards and required PLr/SIL, 2) Functional safety design documentation showing how PLr is achieved, 3) Validation test records proving safety functions operate correctly, 4) Regular proof test records at intervals determined by manufacturer/risk assessment (typically annual), 5) Modification and maintenance records, 6) Training records for operators and maintainers. This documentation must be available throughout the machine lifecycle and updated when modifications occur.'
    },
    {
      question: 'Can I use a standard PLC for safety functions instead of a safety relay?',
      answer: 'Standard PLCs should NOT be used for safety functions as they cannot achieve the required Performance Level. Safety PLCs (like Siemens F-CPU or Allen-Bradley GuardLogix) are specifically designed and certified for safety applications with features including redundant processors, diverse hardware, diagnostic monitoring, and certified function blocks. Safety relays remain appropriate for simpler applications and offer advantages of lower cost, simplicity, and established reliability. The choice depends on system complexity - safety relays for discrete E-stops and interlocks, safety PLCs for complex, configurable safety systems.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertOctagon className="h-8 w-8 text-elec-yellow" />
            <span className="text-elec-yellow font-semibold">Module 2 - Section 4</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Emergency Stop and Interlock Logic
          </h1>
          <p className="text-gray-400 text-lg">
            Safety-critical control systems, E-stop categories, and functional safety requirements
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Introduction */}
        <div className="bg-[#242424] rounded-lg p-6 mb-8 border border-gray-700">
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Section Overview</h2>
              <p className="text-gray-300">
                Emergency stop and interlock systems are the last line of defence against machinery hazards.
                This section covers the legal requirements under the Machinery Directive, the technical
                standards BS EN ISO 13850 and BS EN ISO 13849-1, and the practical implementation of
                safety-related control systems. You will learn to select appropriate E-stop categories,
                design safety circuits with the correct Performance Level, and maintain compliance through
                proper testing and documentation.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Emergency Stop Categories */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h2 className="text-2xl font-bold">Emergency Stop Categories (BS EN ISO 13850)</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <AlertOctagon className="h-5 w-5" />
              Stop Categories 0, 1, and 2
            </h3>

            <div className="space-y-6">
              <p className="text-gray-300">
                BS EN ISO 13850 (Emergency stop function - Principles for design) defines the requirements
                for emergency stop devices and their integration into machinery safety systems. The standard
                works alongside BS EN 60204-1 which defines the three stop categories.
              </p>

              <div className="grid md:grid-cols-1 gap-4">
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center font-bold text-white">0</div>
                    <h4 className="font-semibold text-red-400 text-lg">Category 0 - Uncontrolled Stop</h4>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Immediate removal of power to machine actuators. The machine coasts to a stop
                    without controlled deceleration.
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1 ml-4">
                    <li><strong>How it works:</strong> Direct disconnection of mains power</li>
                    <li><strong>Stopping method:</strong> Free-running/coasting</li>
                    <li><strong>Use when:</strong> Immediate power removal is safe; simple machines</li>
                    <li><strong>Example:</strong> Conveyor belt, simple drill press</li>
                  </ul>
                </div>

                <div className="bg-orange-900/20 border border-orange-700 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center font-bold text-white">1</div>
                    <h4 className="font-semibold text-orange-400 text-lg">Category 1 - Controlled Stop</h4>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Power remains available to achieve a controlled stop. Once stopped, power is
                    then removed from actuators.
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1 ml-4">
                    <li><strong>How it works:</strong> Active braking/deceleration, then power removal</li>
                    <li><strong>Stopping method:</strong> Controlled deceleration to standstill</li>
                    <li><strong>Use when:</strong> Sudden stop creates hazard; heavy inertia loads</li>
                    <li><strong>Example:</strong> CNC machine spindle, centrifuge, vertical axis</li>
                  </ul>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center font-bold text-white">2</div>
                    <h4 className="font-semibold text-yellow-400 text-lg">Category 2 - Controlled Stop (Power Maintained)</h4>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Power remains available during and after stopping. Machine held at standstill
                    by continuous power application.
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1 ml-4">
                    <li><strong>How it works:</strong> Controlled stop with power remaining on</li>
                    <li><strong>Stopping method:</strong> Active holding at standstill</li>
                    <li><strong>Use when:</strong> Position must be maintained; gravity loads</li>
                    <li><strong>Example:</strong> Robot arm, press brake (holding up position)</li>
                    <li className="text-amber-400"><strong>Note:</strong> NOT permitted for emergency stop - use Cat 0 or 1</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                <h4 className="font-semibold text-elec-yellow mb-3">Key Requirements for Emergency Stop (BS EN ISO 13850)</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Colour:</strong> Red actuator on yellow background</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Type:</strong> Mushroom-head or palm-operated</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Operation:</strong> Latching (maintained) - must stay actuated</span>
                    </li>
                  </ul>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Reset:</strong> Manual reset only (deliberate action required)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Restart:</strong> Reset must not restart machine automatically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Priority:</strong> Must override all other functions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 2: E-stop Device Selection and Placement */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h2 className="text-2xl font-bold">E-stop Device Selection and Placement</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Device Types and Positioning
            </h3>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-elec-yellow mb-3">E-stop Device Types</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li><strong>Mushroom head:</strong> Standard 40mm or 60mm diameter</li>
                    <li><strong>Palm-operated:</strong> Large area for quick operation</li>
                    <li><strong>Pull-wire (rope):</strong> For extended protection zones</li>
                    <li><strong>Foot-operated:</strong> When hands are occupied</li>
                    <li><strong>Enabling devices:</strong> 3-position for hold-to-run</li>
                  </ul>
                </div>

                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-elec-yellow mb-3">Contact Requirements</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li><strong>Positive-opening:</strong> Mandatory for safety circuits</li>
                    <li><strong>Contact rating:</strong> Appropriate for safety relay input</li>
                    <li><strong>Redundancy:</strong> Dual NC contacts for dual-channel</li>
                    <li><strong>Marking:</strong> IEC 60947-5-1 compliance symbol</li>
                    <li><strong>IP rating:</strong> Minimum IP65 for industrial use</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Placement Guidelines</h4>
                <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold text-amber-400 mb-2">Location Requirements</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>At each operator station and control panel</li>
                        <li>At all entry/exit points to danger zones</li>
                        <li>Within reach (maximum 15m travel distance to device)</li>
                        <li>Visible and unobstructed at all times</li>
                        <li>Additional devices at machine loading/unloading points</li>
                        <li>Pull-wire systems: maximum 50m span per device</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-elec-yellow font-medium mb-2">Mounting Heights</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>Standard mushroom head: 0.8m - 1.4m above floor</li>
                      <li>Optimal height: 1.0m - 1.2m</li>
                      <li>Pull-wire: 1.1m nominal, 0.3m - 1.8m range</li>
                      <li>Consider wheelchair access (0.8m max)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-elec-yellow font-medium mb-2">Environmental Considerations</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>IP65 minimum (dust-tight, water jets)</li>
                      <li>IP67 for washdown areas</li>
                      <li>Corrosion resistance for harsh environments</li>
                      <li>Operating temperature range verification</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                <h4 className="font-semibold text-elec-yellow mb-3">Wiring Best Practices</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <p className="font-medium text-white mb-2">Series Connection (Preferred):</p>
                    <ul className="space-y-1">
                      <li>All E-stops in series for each channel</li>
                      <li>Any device stops the machine</li>
                      <li>Simple, reliable architecture</li>
                      <li>Easy fault finding (one device at fault)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Dual-Channel Monitoring:</p>
                    <ul className="space-y-1">
                      <li>Channel A and Channel B independently wired</li>
                      <li>Cross-monitoring detects single channel faults</li>
                      <li>Both channels must agree for restart</li>
                      <li>Required for PL d and above</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 3: Safety Relay Modules */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h2 className="text-2xl font-bold">Safety Relay Modules and Their Functions</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Certified Safety Control Devices
            </h3>

            <div className="space-y-6">
              <p className="text-gray-300">
                Safety relay modules are certified devices that monitor safety input devices (E-stops,
                interlocks, light curtains) and provide safe switching of machine actuators. They
                incorporate redundancy, self-monitoring, and diagnostic functions to achieve the
                required Performance Level.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-elec-yellow mb-3">Key Functions</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Input monitoring:</strong> Dual-channel input evaluation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Cross-monitoring:</strong> Detects discrepancies between channels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>EDM:</strong> External Device Monitoring of contactors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Reset control:</strong> Manual/automatic restart options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Fault detection:</strong> Self-test at each operation</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-elec-yellow mb-3">Output Types</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li><strong>Safety outputs:</strong> Force-guided relay contacts</li>
                    <li><strong>Redundant outputs:</strong> 2 or 3 NO contacts for actuators</li>
                    <li><strong>Auxiliary contacts:</strong> For diagnostics/PLC feedback</li>
                    <li><strong>Delayed outputs:</strong> For controlled stop sequences</li>
                    <li><strong>Current rating:</strong> Typically 6A per contact at 250V AC</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Common Safety Relay Applications</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 text-elec-yellow">Application</th>
                      <th className="text-left py-2 text-elec-yellow">Input Type</th>
                      <th className="text-left py-2 text-elec-yellow">Relay Type</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Emergency stop</td>
                      <td className="py-2">NC contacts (dual)</td>
                      <td className="py-2">E-stop relay module</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Guard interlock</td>
                      <td className="py-2">Safety switch contacts</td>
                      <td className="py-2">Guard monitoring relay</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Light curtain</td>
                      <td className="py-2">OSSD outputs</td>
                      <td className="py-2">OSSD monitoring relay</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Two-hand control</td>
                      <td className="py-2">Synchronous inputs</td>
                      <td className="py-2">Two-hand control relay</td>
                    </tr>
                    <tr>
                      <td className="py-2">Speed monitoring</td>
                      <td className="py-2">Encoder/proximity inputs</td>
                      <td className="py-2">Speed monitoring relay</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-semibold text-green-400 mb-2">Force-Guided Contacts</h5>
                    <p className="text-gray-300 text-sm">
                      Safety relays use force-guided (mechanically linked) contacts ensuring that NO and
                      NC contacts cannot be closed simultaneously. This allows fault detection - if the NC
                      contact used for feedback doesn't open when the NO contacts close, a fault is detected.
                      This is essential for External Device Monitoring (EDM) of contactors.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Major Manufacturers</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-300">
                  <div className="bg-[#1a1a1a] p-3 rounded border border-gray-600 text-center">
                    <p className="font-medium text-white">Pilz</p>
                    <p className="text-xs">PNOZ series</p>
                  </div>
                  <div className="bg-[#1a1a1a] p-3 rounded border border-gray-600 text-center">
                    <p className="font-medium text-white">Sick</p>
                    <p className="text-xs">Flexi Soft</p>
                  </div>
                  <div className="bg-[#1a1a1a] p-3 rounded border border-gray-600 text-center">
                    <p className="font-medium text-white">Allen-Bradley</p>
                    <p className="text-xs">GuardMaster</p>
                  </div>
                  <div className="bg-[#1a1a1a] p-3 rounded border border-gray-600 text-center">
                    <p className="font-medium text-white">Siemens</p>
                    <p className="text-xs">SIRIUS 3SK</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Interlock Circuits */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              4
            </div>
            <h2 className="text-2xl font-bold">Interlock Circuits for Guards and Doors</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Guard Interlocking Systems
            </h3>

            <div className="space-y-6">
              <p className="text-gray-300">
                Guard interlocks prevent access to hazardous areas while machinery is operating. BS EN ISO 14119
                specifies the design principles for interlocking devices associated with guards. The choice
                of interlock type depends on the risk level and required Performance Level.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-elec-yellow mb-3">Type 1: Guard Interlocking</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Simple interlock that stops machine when guard is opened. Machine can coast to stop.
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li><strong>Application:</strong> Low-risk machinery</li>
                    <li><strong>Run-down time:</strong> Less than access time</li>
                    <li><strong>Types:</strong> Magnetic, mechanical, RFID coded</li>
                    <li><strong>Typical PL:</strong> PL c to PL d</li>
                  </ul>
                </div>

                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-elec-yellow mb-3">Type 2: Guard Locking</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Guard is locked closed until hazard has ceased (e.g., spindle stopped, press at top).
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li><strong>Application:</strong> High-risk, long run-down time</li>
                    <li><strong>Unlock condition:</strong> Zero speed/safe position verified</li>
                    <li><strong>Types:</strong> Solenoid lock, trapped key</li>
                    <li><strong>Typical PL:</strong> PL d to PL e</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Interlock Switch Types (BS EN ISO 14119)</h4>
                <div className="space-y-3">
                  <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-white">Mechanical Cam/Tongue Switches</h5>
                      <span className="text-xs bg-gray-700 px-2 py-1 rounded">Coding: Type 1</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Traditional positive-opening switches with mechanical actuator. Low coding level
                      (easily defeated). Suitable for low-risk applications where deliberate defeat is unlikely.
                    </p>
                  </div>

                  <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-white">Magnetic Safety Switches</h5>
                      <span className="text-xs bg-gray-700 px-2 py-1 rounded">Coding: Type 2-3</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Non-contact operation with coded magnetic actuator. Higher coding level (harder to
                      defeat with simple magnet). Good for harsh environments.
                    </p>
                  </div>

                  <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-white">RFID Coded Switches</h5>
                      <span className="text-xs bg-gray-700 px-2 py-1 rounded">Coding: Type 4</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Highest coding level using unique RFID transponders. Virtually impossible to defeat.
                      Required for high-risk applications where deliberate circumvention is foreseeable.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-semibold text-amber-400 mb-2">Defeat Prevention (BS EN ISO 14119)</h5>
                    <p className="text-gray-300 text-sm mb-2">
                      The standard requires assessment of the motivation to defeat interlocks. Consider:
                    </p>
                    <ul className="text-gray-300 text-sm space-y-1 ml-4">
                      <li>Is there production pressure to bypass guards?</li>
                      <li>Does the interlock impede normal operation?</li>
                      <li>How difficult is it to defeat the coding?</li>
                      <li>What are the consequences of defeat?</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Trapped Key Interlocking</h4>
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <p className="text-gray-300 text-sm mb-3">
                    Trapped key systems provide a procedural sequence using mechanical key transfer.
                    No electrical connection required between locations.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-elec-yellow font-medium mb-2">Typical Sequence:</p>
                      <ol className="text-gray-300 space-y-1 list-decimal list-inside">
                        <li>Isolate power - key released</li>
                        <li>Key unlocks access gate</li>
                        <li>Key trapped in gate lock while open</li>
                        <li>Close gate - key released</li>
                        <li>Key restores power isolator</li>
                      </ol>
                    </div>
                    <div>
                      <p className="text-elec-yellow font-medium mb-2">Applications:</p>
                      <ul className="text-gray-300 space-y-1">
                        <li>Electrical switchgear access</li>
                        <li>Large machine guarding</li>
                        <li>Multi-location isolation</li>
                        <li>Process interlocks</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Performance Levels and SIL Ratings */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              5
            </div>
            <h2 className="text-2xl font-bold">Performance Levels (PL) and SIL Ratings</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" />
              Functional Safety Assessment (BS EN ISO 13849-1)
            </h3>

            <div className="space-y-6">
              <p className="text-gray-300">
                BS EN ISO 13849-1 provides a methodology for designing safety-related control systems
                to achieve the required Performance Level (PL). The PL represents the probability
                of dangerous failure per hour (PFHd) of the safety function.
              </p>

              <div>
                <h4 className="font-semibold text-lg mb-3">Performance Level Definitions</h4>
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-2 text-elec-yellow">PL</th>
                        <th className="text-left py-2 text-elec-yellow">PFHd Range (per hour)</th>
                        <th className="text-left py-2 text-elec-yellow">Typical Application</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium">PL a</td>
                        <td className="py-2">{"≥"}10<sup>-5</sup> to {"<"}10<sup>-4</sup></td>
                        <td className="py-2">Minor risk, reversible injuries</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium">PL b</td>
                        <td className="py-2">{"≥"}3x10<sup>-6</sup> to {"<"}10<sup>-5</sup></td>
                        <td className="py-2">Low risk applications</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium">PL c</td>
                        <td className="py-2">{"≥"}10<sup>-6</sup> to {"<"}3x10<sup>-6</sup></td>
                        <td className="py-2">Moderate risk, guard interlocks</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium text-orange-400">PL d</td>
                        <td className="py-2">{"≥"}10<sup>-7</sup> to {"<"}10<sup>-6</sup></td>
                        <td className="py-2">High risk, most E-stop systems</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-red-400">PL e</td>
                        <td className="py-2">{"≥"}10<sup>-8</sup> to {"<"}10<sup>-7</sup></td>
                        <td className="py-2">Highest risk, potential fatality</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Determining Required PL (PLr)</h4>
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <p className="text-gray-300 text-sm mb-4">
                    Use the risk graph from BS EN ISO 13849-1 Annex A with three parameters:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-elec-yellow font-medium mb-2">S - Severity</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li><strong>S1:</strong> Slight (reversible)</li>
                        <li><strong>S2:</strong> Serious (irreversible/fatal)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-elec-yellow font-medium mb-2">F - Frequency</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li><strong>F1:</strong> Seldom/short exposure</li>
                        <li><strong>F2:</strong> Frequent/long exposure</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-elec-yellow font-medium mb-2">P - Possibility</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li><strong>P1:</strong> Avoidance possible</li>
                        <li><strong>P2:</strong> Avoidance impossible</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-[#242424] rounded">
                    <p className="text-sm text-gray-300">
                      <strong className="text-elec-yellow">Example:</strong> Press brake with serious crush hazard (S2),
                      frequent operation (F2), impossible to avoid (P2) = <strong className="text-red-400">PLr = e</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">PL vs SIL Comparison</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                    <h5 className="text-elec-yellow font-medium mb-2">BS EN ISO 13849-1 (PL)</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>Route-based methodology</li>
                      <li>Categories (B, 1, 2, 3, 4)</li>
                      <li>Suited to simpler systems</li>
                      <li>Five levels: PL a to PL e</li>
                    </ul>
                  </div>
                  <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                    <h5 className="text-elec-yellow font-medium mb-2">IEC 62061 (SIL)</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>Calculation-based methodology</li>
                      <li>Subsystem approach</li>
                      <li>Suited to complex/programmable systems</li>
                      <li>Four levels: SIL 1 to SIL 3 (rarely 4)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-blue-900/20 border border-blue-700 rounded-lg p-3">
                  <p className="text-sm text-gray-300">
                    <strong className="text-blue-400">Approximate correlation:</strong> PL c {"≈"} SIL 1, PL d {"≈"} SIL 2, PL e {"≈"} SIL 3
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Achieving the Required PL</h4>
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <p className="text-gray-300 text-sm mb-3">
                    The achieved PL depends on system architecture (Category), component reliability (MTTFd),
                    diagnostic coverage (DC), and common cause failure protection (CCF):
                  </p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-2 text-elec-yellow">Category</th>
                        <th className="text-left py-2 text-elec-yellow">Structure</th>
                        <th className="text-left py-2 text-elec-yellow">Max Achievable PL</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Cat B</td>
                        <td className="py-2">Single channel, basic components</td>
                        <td className="py-2">PL b</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Cat 1</td>
                        <td className="py-2">Single channel, well-tried components</td>
                        <td className="py-2">PL c</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Cat 2</td>
                        <td className="py-2">Single channel with periodic testing</td>
                        <td className="py-2">PL d</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Cat 3</td>
                        <td className="py-2">Dual channel, single fault tolerant</td>
                        <td className="py-2">PL d/e</td>
                      </tr>
                      <tr>
                        <td className="py-2">Cat 4</td>
                        <td className="py-2">Dual channel, accumulation tolerant</td>
                        <td className="py-2">PL e</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </div>

        {/* Section 6: Testing and Documentation */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              6
            </div>
            <h2 className="text-2xl font-bold">Testing and Documentation Requirements</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Compliance and Verification
            </h3>

            <div className="space-y-6">
              <p className="text-gray-300">
                The Machinery Directive (2006/42/EC) and PUWER (Provision and Use of Work Equipment
                Regulations) require that safety-related control systems are properly designed, validated,
                documented, and maintained throughout their lifecycle.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-elec-yellow mb-3">Validation Testing</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Functional testing of all safety functions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Response time measurement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Fault injection testing where practical</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Environmental condition verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>EMC immunity confirmation</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-elec-yellow mb-3">Proof Testing (Ongoing)</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li><strong>Frequency:</strong> Annual or per risk assessment</li>
                    <li><strong>E-stop test:</strong> Actuate and verify stop function</li>
                    <li><strong>Interlock test:</strong> Open guard, verify stop</li>
                    <li><strong>Reset test:</strong> Verify manual reset required</li>
                    <li><strong>Light curtain:</strong> Break beam, verify response</li>
                    <li><strong>Record:</strong> Date, tester, results, remedial actions</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Required Documentation</h4>
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-elec-yellow font-medium mb-2">Design Documentation:</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>Risk assessment (identifying hazards, PLr)</li>
                        <li>Safety function specifications</li>
                        <li>Block diagrams of safety circuits</li>
                        <li>PL/SIL calculation (SISTEMA output)</li>
                        <li>Component specifications and certificates</li>
                        <li>Wiring diagrams and schematics</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-elec-yellow font-medium mb-2">Operational Documentation:</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>Validation test reports</li>
                        <li>Commissioning records</li>
                        <li>Proof test schedule and records</li>
                        <li>Maintenance procedures</li>
                        <li>Modification log</li>
                        <li>Training records</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-semibold text-red-400 mb-2">Modification Control</h5>
                    <p className="text-gray-300 text-sm">
                      Any modification to a safety-related control system requires re-validation. Under PUWER,
                      the employer must ensure the machine remains safe after modification. Changes must be
                      documented, PL/SIL recalculated if architecture changes, and validation testing repeated.
                      Failure to properly manage modifications can result in prosecution if an incident occurs.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">SISTEMA Software Tool</h4>
                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                  <p className="text-gray-300 text-sm mb-3">
                    SISTEMA (Safety Integrity Software Tool for the Evaluation of Machine Applications) is a
                    free tool from IFA (German Social Accident Insurance) for calculating Performance Level
                    according to BS EN ISO 13849-1.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-400 font-medium mb-2">Features:</p>
                      <ul className="text-gray-300 space-y-1">
                        <li>Graphical subsystem modelling</li>
                        <li>Component libraries from manufacturers</li>
                        <li>Automatic PL calculation</li>
                        <li>Documentation generation</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-blue-400 font-medium mb-2">Benefits:</p>
                      <ul className="text-gray-300 space-y-1">
                        <li>Standardised methodology</li>
                        <li>Audit trail for compliance</li>
                        <li>Easy what-if analysis</li>
                        <li>Industry-accepted tool</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-lg p-6 border-2 border-elec-yellow">
            <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Quick Reference Card
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-2">E-stop Requirements (BS EN ISO 13850)</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>Red mushroom head on yellow background</li>
                  <li>Latching operation (stays actuated)</li>
                  <li>Manual reset only (no auto-reset)</li>
                  <li>Reset must not restart machine</li>
                  <li>Override all other functions</li>
                  <li>Category 0 or 1 stop only</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Key Standards</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li><strong>BS EN ISO 13850:</strong> Emergency stop principles</li>
                  <li><strong>BS EN ISO 13849-1:</strong> Safety control systems (PL)</li>
                  <li><strong>BS EN ISO 14119:</strong> Guard interlocking</li>
                  <li><strong>BS EN 60204-1:</strong> Electrical equipment of machines</li>
                  <li><strong>IEC 62061:</strong> Functional safety (SIL)</li>
                  <li><strong>IEC 60947-5-1:</strong> Control circuit devices</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Stop Categories</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li><strong>Cat 0:</strong> Immediate power removal (uncontrolled)</li>
                  <li><strong>Cat 1:</strong> Controlled stop, then power removal</li>
                  <li><strong>Cat 2:</strong> Power maintained (NOT for E-stop)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Performance Level Quick Guide</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li><strong>PL c:</strong> Low-risk interlocks</li>
                  <li><strong>PL d:</strong> Most E-stop applications</li>
                  <li><strong>PL e:</strong> Highest risk (potential fatal)</li>
                  <li><strong>Cat 3/4:</strong> Dual-channel required for PL d/e</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-600">
              <h4 className="font-semibold text-white mb-2">Critical Safety Contacts</h4>
              <p className="text-gray-300 text-sm">
                <strong className="text-elec-yellow">Positive-opening contacts (IEC 60947-5-1):</strong> Must be used
                for all safety-critical applications. Mechanical linkage ensures contacts MUST open even if welded.
                Look for the standardised marking symbol on devices.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Info className="h-6 w-6 text-elec-yellow" />
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#242424] rounded-lg border border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation hover:bg-[#2a2a2a] transition-colors"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-center">Test Your Knowledge</h3>
            <p className="text-gray-400 text-center mb-6">
              Complete this 10-question quiz to reinforce your understanding of emergency stop
              systems, interlock design, and functional safety requirements.
            </p>

            {!showQuiz ? (
              <div className="text-center">
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="bg-elec-yellow text-black hover:bg-yellow-500 min-h-[44px] px-8 touch-manipulation font-semibold"
                >
                  Start Quiz
                </Button>
              </div>
            ) : (
              <Quiz
                questions={quizQuestions}
                moduleId="industrial-electrical-m2s4"
                onComplete={(score) => {
                  console.log(`Quiz completed with score: ${score}/${quizQuestions.length}`);
                }}
              />
            )}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-700">
          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-2/section-3')}
            variant="outline"
            className="min-h-[44px] touch-manipulation border-gray-600 hover:border-elec-yellow hover:text-elec-yellow flex items-center gap-2"
          >
            <ChevronLeft className="h-5 w-5" />
            <div className="text-left">
              <div className="text-xs text-gray-400">Previous</div>
              <div>Section 3: Motor Protection</div>
            </div>
          </Button>

          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-2/section-5')}
            className="min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-yellow-500 flex items-center gap-2"
          >
            <div className="text-right">
              <div className="text-xs opacity-80">Next</div>
              <div>Section 5: PLC Safety Integration</div>
            </div>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule2Section4;
