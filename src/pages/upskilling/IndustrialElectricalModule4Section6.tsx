import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Quiz from '@/components/apprentice-courses/Quiz';
import InlineCheck from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  ShieldCheck,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Cpu,
  Eye,
  Hand,
  FileCheck,
  ClipboardList,
  CheckCircle2,
  XCircle,
  Info,
  Zap,
  Target,
  Clock,
  FileText,
  Settings
} from 'lucide-react';

const IndustrialElectricalModule4Section6: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO({
    title: 'Safety PLC and Machine Guarding | Industrial Electrical Module 4 Section 6 | Elec-Mate',
    description: 'Learn about Safety PLC architecture, Safety Integrity Levels (SIL), Performance Levels (PL), light curtains, safety mats, two-hand controls, and machine guarding compliance with IEC 62061 and ISO 13849-1.',
    keywords: [
      'Safety PLC',
      'machine guarding',
      'SIL rating',
      'Performance Level',
      'light curtain',
      'safety mat',
      'two-hand control',
      'IEC 62061',
      'ISO 13849-1',
      'PUWER',
      'functional safety'
    ],
    canonicalUrl: '/upskilling/industrial-electrical/module-4/section-6'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-safety-plc-m4s6',
      question: 'What is the key architectural difference between a Safety PLC and a standard PLC?',
      options: [
        'Safety PLCs are faster',
        'Safety PLCs use redundant processors with cross-checking',
        'Safety PLCs have more I/O points',
        'Safety PLCs use different programming languages'
      ],
      correctIndex: 1,
      explanation: 'Safety PLCs use redundant (dual or triple) processors that continuously cross-check each other. If any discrepancy is detected, the system goes to a safe state. This architecture is fundamental to achieving the required Safety Integrity Levels (SIL) per IEC 61508.'
    },
    {
      id: 'qc2-safety-plc-m4s6',
      question: 'According to ISO 13849-1, what Performance Level (PL) is typically required for a power press emergency stop?',
      options: [
        'PL a - Low risk',
        'PL b - Low to medium risk',
        'PL c - Medium risk',
        'PL d or PL e - High risk'
      ],
      correctIndex: 3,
      explanation: 'Power presses present severe hazards with potential for serious injury or death. ISO 13849-1 risk assessment typically requires PL d or PL e for emergency stops on such machinery. This corresponds to SIL 2 or SIL 3 under IEC 62061.'
    },
    {
      id: 'qc3-safety-plc-m4s6',
      question: 'What is the purpose of proof testing in safety-related control systems?',
      options: [
        'To verify production output',
        'To detect dangerous undetected faults before they cause harm',
        'To calibrate sensors for accuracy',
        'To update the PLC firmware'
      ],
      correctIndex: 1,
      explanation: 'Proof testing is performed at defined intervals to detect dangerous undetected faults that automatic diagnostics cannot find. The proof test interval is a critical factor in calculating the Probability of Failure on Demand (PFD) and maintaining the required SIL/PL over the equipment lifetime.'
    }
  ];

  const quizQuestions = [
    {
      question: 'Which standard specifically addresses functional safety of electrical/electronic/programmable electronic safety-related systems?',
      options: ['ISO 9001', 'IEC 61508', 'BS 7671', 'ISO 14001'],
      correctAnswer: 'IEC 61508'
    },
    {
      question: 'What does SIL stand for in functional safety?',
      options: [
        'Safety Inspection Level',
        'System Integration Layer',
        'Safety Integrity Level',
        'Standard Industrial Limit'
      ],
      correctAnswer: 'Safety Integrity Level'
    },
    {
      question: 'In a Category 3 safety system per ISO 13849-1, what happens when a single fault occurs?',
      options: [
        'The system stops immediately',
        'The safety function is still performed',
        'An alarm sounds but operation continues',
        'The system requires manual reset'
      ],
      correctAnswer: 'The safety function is still performed'
    },
    {
      question: 'What is the minimum safety distance calculation for a light curtain primarily based on?',
      options: [
        'The machine cycle time',
        'The hand speed constant and stopping time',
        'The production rate required',
        'The light curtain resolution'
      ],
      correctAnswer: 'The hand speed constant and stopping time'
    },
    {
      question: 'What is the typical hand approach speed (K value) used in safety distance calculations per EN ISO 13855?',
      options: ['1000 mm/s', '1600 mm/s', '2000 mm/s', '2500 mm/s'],
      correctAnswer: '2000 mm/s'
    },
    {
      question: 'Which UK regulation specifically requires machinery to be safe and properly guarded?',
      options: [
        'COSHH Regulations',
        'PUWER 1998',
        'CDM Regulations',
        'RIDDOR'
      ],
      correctAnswer: 'PUWER 1998'
    },
    {
      question: 'What software tool is commonly used to calculate Performance Levels according to ISO 13849-1?',
      options: ['AutoCAD', 'SISTEMA', 'MATLAB', 'LabVIEW'],
      correctAnswer: 'SISTEMA'
    },
    {
      question: 'In two-hand control systems, what is the maximum allowable time between actuating both controls?',
      options: ['0.5 seconds', '1.0 second', '0.25 seconds', '2.0 seconds'],
      correctAnswer: '0.5 seconds'
    },
    {
      question: 'What type of safety device would you use to detect a person standing in a hazardous area at floor level?',
      options: ['Light curtain', 'Safety mat', 'Interlock switch', 'Two-hand control'],
      correctAnswer: 'Safety mat'
    },
    {
      question: 'According to IEC 62061, what is the maximum achievable SIL for a subsystem without redundancy (HFT=0)?',
      options: ['SIL 1', 'SIL 2', 'SIL 3', 'SIL 4'],
      correctAnswer: 'SIL 2'
    }
  ];

  const faqs = [
    {
      question: 'What is the difference between SIL (IEC 62061) and PL (ISO 13849-1)?',
      answer: 'SIL (Safety Integrity Level) from IEC 62061 and PL (Performance Level) from ISO 13849-1 are both measures of safety system reliability, but use different calculation methods. SIL uses Probability of Dangerous Failure per Hour (PFH), while PL uses a combination of categories, MTTFd, DCavg, and CCF. For machinery, both standards are harmonised under the Machinery Directive. A rough equivalence: PL a ≈ no SIL, PL b ≈ SIL 1, PL c ≈ SIL 1, PL d ≈ SIL 2, PL e ≈ SIL 3. Many engineers use SISTEMA software to calculate PL and can correlate to SIL requirements.'
    },
    {
      question: 'How often should safety systems be proof tested?',
      answer: 'Proof test intervals depend on the required SIL/PL and the components used. Typically, proof tests are performed annually, but some systems may require more frequent testing (monthly or quarterly) or allow longer intervals (up to 10 years for some SIL 1 systems). The interval is determined during the safety system design and documented in the safety manual. Testing must verify all safety functions operate correctly, including redundant channels, diagnostics, and safe state behaviour. All proof tests must be documented with date, tester name, tests performed, and results.'
    },
    {
      question: 'Can I use a standard PLC for safety functions if I add redundancy?',
      answer: 'No, simply adding redundancy to a standard PLC does not make it suitable for safety functions. Safety PLCs are designed from the ground up with specific architectural features: certified processors with built-in self-test, diversified redundancy (different processor types), certified safety function blocks, watchdog timers with safe state outputs, and comprehensive diagnostics. The entire development process follows IEC 61508, with documented failure modes and proven-in-use data. Standard PLCs lack these features and cannot achieve SIL certification regardless of external redundancy.'
    },
    {
      question: 'What documentation is required for machine safety systems under PUWER?',
      answer: 'Under PUWER (Provision and Use of Work Equipment Regulations 1998) and the Machinery Directive, required documentation includes: Risk Assessment documenting all hazards and risk reduction measures; Safety Requirements Specification (SRS) defining required safety functions and their SIL/PL; System design documentation including circuit diagrams, component selection justification, and safety distance calculations; Validation and verification test reports; Proof test procedures and records; Maintenance schedules and records; Training records for operators and maintenance personnel; and a Declaration of Conformity with CE/UKCA marking.'
    },
    {
      question: 'How do I calculate the safety distance for a light curtain?',
      answer: 'Safety distance is calculated using the formula from EN ISO 13855: S = (K × T) + C, where S is the minimum safety distance in mm, K is the hand approach speed (typically 2000 mm/s for hand approach, 1600 mm/s for walk-up approach), T is the total stopping time in seconds (machine stopping time + light curtain response time), and C is the intrusion distance based on light curtain resolution. For finger detection (≤14mm resolution), C = 8 × (d - 14) where d is the resolution. For hand detection (>14mm to 40mm), additional penetration factors apply. Always verify the calculation with actual measured stopping times.'
    },
    {
      question: 'What is the role of enabling devices in safety systems?',
      answer: 'Enabling devices (also called hold-to-run or deadman switches) are three-position devices that permit machine motion only when held in the middle position. Position 1 (released) = stop, Position 2 (held) = motion permitted, Position 3 (panic pressed) = stop. They are used for setup, teaching, or maintenance when guards must be bypassed. The operator must consciously hold the device, and any panic reaction (releasing or squeezing harder) stops motion. EN ISO 13849-1 typically requires PL d for enabling device circuits. They must be used with reduced speed mode and are not a substitute for proper guarding during normal operation.'
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-8 h-8 text-elec-yellow" />
            <span className="text-elec-yellow font-medium">Module 4 - Section 6</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Safety PLC and Machine Guarding
          </h1>
          <p className="text-gray-400">
            Functional safety systems, SIL/PL requirements, and protective devices for machinery
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Introduction */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-elec-yellow mb-3">
                Critical Safety Topic
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Functional safety in machinery is governed by international standards including
                IEC 61508, IEC 62061, and ISO 13849-1. In the UK, PUWER 1998 (Provision and Use
                of Work Equipment Regulations) mandates that machinery must be safe and properly
                guarded. Understanding Safety PLCs, Safety Integrity Levels, and protective
                devices is essential for designing, installing, and maintaining compliant
                machine safety systems.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: Safety PLC vs Standard PLC Architecture */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              1
            </div>
            <Cpu className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold">Safety PLC vs Standard PLC Architecture</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Safety PLCs are purpose-built for functional safety applications and differ
              fundamentally from standard PLCs in their architecture, design philosophy, and
              certification requirements.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-red-900/50">
                <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Standard PLC
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    Single processor architecture
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    No inherent self-diagnostics
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    Undefined failure mode behaviour
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    General-purpose I/O modules
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    No safety certification
                  </li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-green-900/50">
                <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Safety PLC
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Redundant processors (1oo2 or 2oo3)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Continuous self-test diagnostics
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Defined safe state on failure
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Safety-rated I/O with diagnostics
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    IEC 61508 SIL 3 certified
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h4 className="text-elec-yellow font-semibold mb-3">Key Safety PLC Features</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-white">Diversified Redundancy:</span>
                    <span className="text-gray-400 ml-2">
                      Uses different processor types or instruction sequences to prevent
                      common-cause failures from affecting both channels
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-white">Watchdog Timers:</span>
                    <span className="text-gray-400 ml-2">
                      Hardware watchdogs ensure the system goes to safe state if program
                      execution fails or exceeds time limits
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-white">Certified Function Blocks:</span>
                    <span className="text-gray-400 ml-2">
                      Pre-certified safety function blocks for emergency stop, guard monitoring,
                      two-hand control, muting, and other safety functions
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-200">
                  <strong>EN 61508 Compliance:</strong> Safety PLCs must be developed according
                  to IEC 61508 lifecycle requirements, including hazard analysis, safety
                  requirements specification, design, implementation, validation, and operation/maintenance
                  phases. Manufacturers must provide safety manuals detailing safe use parameters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Safety Integrity Levels (SIL) and Performance Levels (PL) */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              2
            </div>
            <Target className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold">Safety Integrity Levels (SIL) and Performance Levels (PL)</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              SIL (IEC 62061) and PL (ISO 13849-1) are quantitative measures of safety system
              reliability. Both standards are harmonised under the EU Machinery Directive and
              UK Supply of Machinery (Safety) Regulations.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-3">Safety Integrity Levels (IEC 62061)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 px-3 text-elec-yellow">SIL</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">PFH Range</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Risk Reduction</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Example Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 px-3 font-medium">SIL 1</td>
                      <td className="py-2 px-3">10⁻⁶ to 10⁻⁵</td>
                      <td className="py-2 px-3">Low</td>
                      <td className="py-2 px-3 text-gray-400">Simple guard interlocks</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 px-3 font-medium">SIL 2</td>
                      <td className="py-2 px-3">10⁻⁷ to 10⁻⁶</td>
                      <td className="py-2 px-3">Medium</td>
                      <td className="py-2 px-3 text-gray-400">E-stops, light curtains</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">SIL 3</td>
                      <td className="py-2 px-3">10⁻⁸ to 10⁻⁷</td>
                      <td className="py-2 px-3">High</td>
                      <td className="py-2 px-3 text-gray-400">Press brakes, robots</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                PFH = Probability of Dangerous Failure per Hour
              </p>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-3">Performance Levels (ISO 13849-1)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 px-3 text-elec-yellow">PL</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">PFH Range</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">SIL Equivalent</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Typical Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 px-3 font-medium">PL a</td>
                      <td className="py-2 px-3">≥10⁻⁵ to &lt;10⁻⁴</td>
                      <td className="py-2 px-3">—</td>
                      <td className="py-2 px-3 text-gray-400">Category B, 1</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 px-3 font-medium">PL b</td>
                      <td className="py-2 px-3">≥3×10⁻⁶ to &lt;10⁻⁵</td>
                      <td className="py-2 px-3">SIL 1</td>
                      <td className="py-2 px-3 text-gray-400">Category 1, 2</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 px-3 font-medium">PL c</td>
                      <td className="py-2 px-3">≥10⁻⁶ to &lt;3×10⁻⁶</td>
                      <td className="py-2 px-3">SIL 1</td>
                      <td className="py-2 px-3 text-gray-400">Category 2, 3</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 px-3 font-medium">PL d</td>
                      <td className="py-2 px-3">≥10⁻⁷ to &lt;10⁻⁶</td>
                      <td className="py-2 px-3">SIL 2</td>
                      <td className="py-2 px-3 text-gray-400">Category 2, 3</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">PL e</td>
                      <td className="py-2 px-3">≥10⁻⁸ to &lt;10⁻⁷</td>
                      <td className="py-2 px-3">SIL 3</td>
                      <td className="py-2 px-3 text-gray-400">Category 3, 4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-3">ISO 13849-1 Categories</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold min-w-[60px]">Cat B:</span>
                  <span>Basic safety principles, no fault tolerance</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold min-w-[60px]">Cat 1:</span>
                  <span>Well-tried components and principles</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold min-w-[60px]">Cat 2:</span>
                  <span>Periodic testing by the machine control system</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold min-w-[60px]">Cat 3:</span>
                  <span>Single fault tolerance - safety function maintained</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold min-w-[60px]">Cat 4:</span>
                  <span>Single fault tolerance with fault detection</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-200">
                  <strong>SISTEMA Software:</strong> The German IFA provides free SISTEMA software
                  for calculating Performance Levels according to ISO 13849-1. It requires input
                  of component data (MTTFd, B10d values), system architecture (category), and
                  diagnostic coverage to calculate the achieved PL. This is the industry-standard
                  tool for PL verification.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 3: Light Curtains and Safety Mats */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              3
            </div>
            <Eye className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold">Light Curtains and Safety Mats</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Electro-sensitive protective equipment (ESPE) provides non-contact safeguarding
              that allows frequent access while maintaining protection. Light curtains and
              safety mats are the most common types.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-3">Light Curtains (AOPD)</h4>
              <p className="text-sm mb-3">
                Active Opto-electronic Protective Devices create an infrared sensing field
                between transmitter and receiver units. Breaking any beam triggers the safety
                output.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-white mb-2">Resolution Types</h5>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• <strong className="text-white">14mm:</strong> Finger detection</li>
                    <li>• <strong className="text-white">20-30mm:</strong> Hand detection</li>
                    <li>• <strong className="text-white">40mm+:</strong> Arm detection</li>
                    <li>• <strong className="text-white">50-90mm:</strong> Body detection</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-2">Key Parameters</h5>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• Response time (typically 5-20ms)</li>
                    <li>• Protected height/width</li>
                    <li>• Operating range</li>
                    <li>• Type (Type 2 or Type 4)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-3">Safety Distance Calculation</h4>
              <div className="bg-[#2a2a2a] rounded p-3 font-mono text-sm mb-3">
                <span className="text-elec-yellow">S = (K × T) + C</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold min-w-[30px]">S</span>
                  <span>= Minimum safety distance (mm)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold min-w-[30px]">K</span>
                  <span>= Approach speed (2000mm/s hand, 1600mm/s body per EN ISO 13855)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold min-w-[30px]">T</span>
                  <span>= Total stopping time (machine + light curtain response)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold min-w-[30px]">C</span>
                  <span>= Intrusion distance based on resolution (8 × (d-14) for finger detection)</span>
                </div>
              </div>
              <div className="mt-3 p-3 bg-[#1a1a1a] rounded border border-gray-600">
                <p className="text-sm text-gray-400">
                  <strong className="text-white">Example:</strong> Machine stopping time 150ms,
                  light curtain 15ms, 14mm resolution:
                  <br />
                  S = (2000 × 0.165) + 0 = 330mm minimum
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-3">Safety Mats</h4>
              <p className="text-sm mb-3">
                Pressure-sensitive mats detect when a person is standing in a hazardous area.
                Used for floor-level detection where light curtains cannot provide adequate
                coverage.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-white mb-2">Applications</h5>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• Robot cell perimeter protection</li>
                    <li>• Machine access areas</li>
                    <li>• Palletising systems</li>
                    <li>• Areas under or behind guards</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-2">Specifications</h5>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• Minimum 35kg activation weight</li>
                    <li>• Response time &lt;30ms typical</li>
                    <li>• PL d or PL e achievable</li>
                    <li>• Edge ramping for trip prevention</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-200">
                  <strong>Muting and Blanking:</strong> Light curtains can be configured with
                  muting (temporary bypass for material passage) or blanking (fixed blind zones).
                  Muting requires additional sensors to detect legitimate material and prevent
                  personnel bypass. Both features require careful design to maintain safety integrity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Two-Hand Control and Enabling Devices */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              4
            </div>
            <Hand className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold">Two-Hand Control and Enabling Devices</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Two-hand controls and enabling devices are operator-actuated safety devices that
              ensure hands are in safe positions during hazardous machine operations.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-3">Two-Hand Control (EN 574)</h4>
              <p className="text-sm mb-3">
                Requires simultaneous actuation of two control devices using both hands to
                initiate machine motion, keeping hands away from the danger zone.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-white mb-2">Type Requirements</h5>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• <strong className="text-white">Type I:</strong> Basic synchronicity</li>
                    <li>• <strong className="text-white">Type II:</strong> +Anti-tie-down</li>
                    <li>• <strong className="text-white">Type IIIA:</strong> +0.5s sync time</li>
                    <li>• <strong className="text-white">Type IIIB:</strong> +Single-stroke</li>
                    <li>• <strong className="text-white">Type IIIC:</strong> +Both features</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-2">Key Requirements</h5>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• Max 0.5s between actuations (Type III)</li>
                    <li>• Minimum 260mm between buttons</li>
                    <li>• Protected against single-hand operation</li>
                    <li>• Release of either stops motion</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-3">Enabling Devices (EN ISO 13849-1)</h4>
              <p className="text-sm mb-3">
                Three-position devices that permit motion only when held in the middle position.
                Used for setup, teaching, or maintenance operations.
              </p>
              <div className="bg-[#2a2a2a] rounded p-4 mt-3">
                <h5 className="font-medium text-white mb-3 text-center">Three-Position Operation</h5>
                <div className="flex justify-between items-center text-sm">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-400 font-bold">1</span>
                    </div>
                    <p className="text-gray-400">Released</p>
                    <p className="text-red-400 font-medium">STOP</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-elec-yellow rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-black font-bold">2</span>
                    </div>
                    <p className="text-gray-400">Held</p>
                    <p className="text-green-400 font-medium">ENABLED</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-red-400 font-bold">3</span>
                    </div>
                    <p className="text-gray-400">Panic</p>
                    <p className="text-red-400 font-medium">STOP</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  <strong className="text-white">Application:</strong> Robot teach pendants,
                  press brake foot pedals (dead-man function), CNC setup modes
                </p>
                <p>
                  <strong className="text-white">Requirement:</strong> Must be used with reduced
                  speed mode (&lt;250mm/s for robots) and cannot replace proper guarding during
                  normal operation
                </p>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-200">
                  <strong>Safety Distance:</strong> Two-hand controls must be positioned so that
                  the operator cannot release the controls and reach the hazard zone before
                  machine motion stops. Calculate using S = K × T where K = 1600mm/s for the
                  distance from controls to hazard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 5: Safety PLC Programming and Validation */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              5
            </div>
            <FileCheck className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold">Safety PLC Programming and Validation</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Safety PLC programming follows structured methodologies with certified function
              blocks. Validation ensures the safety system meets its Safety Requirements
              Specification (SRS).
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-3">Certified Safety Function Blocks</h4>
              <p className="text-sm mb-3">
                Safety PLCs provide pre-certified function blocks that have been validated to
                IEC 61508. Using these ensures software does not compromise the achieved SIL.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-white mb-2">Common Function Blocks</h5>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• Emergency Stop monitoring</li>
                    <li>• Guard door monitoring</li>
                    <li>• Light curtain monitoring</li>
                    <li>• Two-hand control</li>
                    <li>• Safe speed monitoring</li>
                    <li>• Safe position monitoring</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-2">Programming Rules</h5>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• Use only certified function blocks</li>
                    <li>• No custom code for safety functions</li>
                    <li>• Document all parameter settings</li>
                    <li>• Verify input/output wiring</li>
                    <li>• CRC verification of program</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-3">Validation Process</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <span className="font-medium text-white">Design Review:</span>
                    <span className="text-gray-400 ml-2">
                      Verify safety function design against SRS, check component selection,
                      review circuit diagrams
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <span className="font-medium text-white">Fault Injection Testing:</span>
                    <span className="text-gray-400 ml-2">
                      Simulate faults (open circuits, short circuits, stuck-at faults) to
                      verify safe state behaviour
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <span className="font-medium text-white">Functional Testing:</span>
                    <span className="text-gray-400 ml-2">
                      Test each safety function operates correctly under all specified
                      conditions
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div>
                    <span className="font-medium text-white">Stopping Time Measurement:</span>
                    <span className="text-gray-400 ml-2">
                      Measure actual stopping times to verify safety distance calculations
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    5
                  </div>
                  <div>
                    <span className="font-medium text-white">Documentation:</span>
                    <span className="text-gray-400 ml-2">
                      Complete validation report with test procedures, results, and sign-off
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-3">Software Safety Requirements</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3 p-2 bg-[#2a2a2a] rounded">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Program CRC checked at startup and runtime</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-[#2a2a2a] rounded">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Password protection for safety program changes</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-[#2a2a2a] rounded">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Program version control and change management</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-[#2a2a2a] rounded">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Separation of safety and standard programs</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-[#2a2a2a] rounded">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Diagnostic data logging and fault history</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Periodic Testing and Documentation */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              6
            </div>
            <ClipboardList className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold">Periodic Testing and Documentation</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              PUWER 1998 requires employers to ensure work equipment is maintained in safe
              condition. This includes periodic testing of safety systems and maintaining
              comprehensive documentation.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-3">Proof Test Requirements</h4>
              <p className="text-sm mb-3">
                Proof tests detect dangerous undetected faults that automatic diagnostics
                cannot find. The proof test interval affects the calculated PFH/PFD.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 px-3 text-elec-yellow">Component Type</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Typical Interval</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 px-3">Emergency Stops</td>
                      <td className="py-2 px-3">Weekly/Monthly</td>
                      <td className="py-2 px-3 text-gray-400">Actuate and verify stop</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 px-3">Guard Interlocks</td>
                      <td className="py-2 px-3">Monthly</td>
                      <td className="py-2 px-3 text-gray-400">Open guard during operation</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 px-3">Light Curtains</td>
                      <td className="py-2 px-3">Daily/Weekly</td>
                      <td className="py-2 px-3 text-gray-400">Test rod insertion</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 px-3">Safety Mats</td>
                      <td className="py-2 px-3">Weekly</td>
                      <td className="py-2 px-3 text-gray-400">Step test all zones</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Two-Hand Controls</td>
                      <td className="py-2 px-3">Daily</td>
                      <td className="py-2 px-3 text-gray-400">Synchronicity test</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-3">Required Documentation (PUWER/Machinery Directive)</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-white mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-elec-yellow" />
                    Design Documents
                  </h5>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• Risk Assessment (EN ISO 12100)</li>
                    <li>• Safety Requirements Specification</li>
                    <li>• Safety circuit diagrams</li>
                    <li>• SISTEMA/SIL calculation</li>
                    <li>• Component data sheets</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-elec-yellow" />
                    Operational Documents
                  </h5>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• Validation test reports</li>
                    <li>• Proof test procedures</li>
                    <li>• Proof test records</li>
                    <li>• Maintenance schedules</li>
                    <li>• Training records</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-3">Proof Test Record Requirements</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Date and time of test</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Name and signature of tester</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Equipment/device tested</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Test procedure followed</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Pass/fail result with measurements where applicable</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Any defects found and corrective actions</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Next test due date</span>
                </div>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-200">
                  <strong>Legal Requirement:</strong> Under PUWER Regulation 6, work equipment
                  must be maintained in an efficient state, in efficient working order, and in
                  good repair. Failure to maintain safety systems can result in prosecution
                  under the Health and Safety at Work Act 1974, with unlimited fines and
                  potential imprisonment for individuals.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-lg p-6 border border-elec-yellow/30">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-elec-yellow">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Key Standards</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow mt-0.5" />
                  <div>
                    <span className="font-medium">IEC 61508:</span>
                    <span className="text-gray-400 ml-1">Functional safety base standard</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow mt-0.5" />
                  <div>
                    <span className="font-medium">IEC 62061:</span>
                    <span className="text-gray-400 ml-1">Machinery safety (SIL method)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow mt-0.5" />
                  <div>
                    <span className="font-medium">ISO 13849-1:</span>
                    <span className="text-gray-400 ml-1">Machinery safety (PL method)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow mt-0.5" />
                  <div>
                    <span className="font-medium">EN ISO 13855:</span>
                    <span className="text-gray-400 ml-1">Safety distance calculation</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow mt-0.5" />
                  <div>
                    <span className="font-medium">EN 574:</span>
                    <span className="text-gray-400 ml-1">Two-hand control devices</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Critical Values</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-[#1a1a1a] rounded">
                  <span className="text-gray-400">Hand approach speed (K)</span>
                  <span className="text-elec-yellow font-mono">2000 mm/s</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#1a1a1a] rounded">
                  <span className="text-gray-400">Body approach speed (K)</span>
                  <span className="text-elec-yellow font-mono">1600 mm/s</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#1a1a1a] rounded">
                  <span className="text-gray-400">Two-hand sync time</span>
                  <span className="text-elec-yellow font-mono">0.5 s max</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#1a1a1a] rounded">
                  <span className="text-gray-400">Two-hand button spacing</span>
                  <span className="text-elec-yellow font-mono">260 mm min</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#1a1a1a] rounded">
                  <span className="text-gray-400">Robot reduced speed</span>
                  <span className="text-elec-yellow font-mono">250 mm/s max</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-semibold text-white mb-3">Safety Distance Formula</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 text-center">
                <div className="font-mono text-lg text-elec-yellow mb-2">
                  S = (K × T) + C
                </div>
                <div className="text-sm text-gray-400">
                  S = Safety distance (mm) | K = Approach speed (mm/s) | T = Stopping time (s) | C = Intrusion distance (mm)
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-semibold text-white mb-3">PL to SIL Correlation</h4>
              <div className="grid grid-cols-5 gap-2 text-center text-sm">
                <div className="bg-[#1a1a1a] rounded p-2">
                  <div className="text-elec-yellow font-bold">PL a</div>
                  <div className="text-gray-400">—</div>
                </div>
                <div className="bg-[#1a1a1a] rounded p-2">
                  <div className="text-elec-yellow font-bold">PL b</div>
                  <div className="text-gray-400">SIL 1</div>
                </div>
                <div className="bg-[#1a1a1a] rounded p-2">
                  <div className="text-elec-yellow font-bold">PL c</div>
                  <div className="text-gray-400">SIL 1</div>
                </div>
                <div className="bg-[#1a1a1a] rounded p-2">
                  <div className="text-elec-yellow font-bold">PL d</div>
                  <div className="text-gray-400">SIL 2</div>
                </div>
                <div className="bg-[#1a1a1a] rounded p-2">
                  <div className="text-elec-yellow font-bold">PL e</div>
                  <div className="text-gray-400">SIL 3</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors min-h-[44px] touch-manipulation"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="p-4 bg-[#1a1a1a]/50 border-t border-gray-700">
                    <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">
            Section Quiz
          </h2>
          <Quiz questions={quizQuestions} moduleId="industrial-electrical-m4s6" />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-4/section-5')}
            variant="outline"
            className="flex items-center justify-center gap-2 min-h-[44px] touch-manipulation border-gray-600 text-white hover:bg-gray-700"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous: Section 5</span>
          </Button>

          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-5')}
            className="flex items-center justify-center gap-2 min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-yellow-500"
          >
            <span>Next: Module 5</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule4Section6;
