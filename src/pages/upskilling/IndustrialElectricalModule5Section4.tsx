import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Activity,
  Monitor,
  History,
  Wifi,
  Database,
  BookOpen,
  ClipboardList,
  Shield,
  Zap,
  Settings,
  FileWarning,
  ToggleLeft,
  Eye,
  Bell,
  WifiOff,
  Save,
  RefreshCw
} from 'lucide-react';

// Quick Check Questions for InlineCheck component
const quickCheckQuestions = [
  {
    id: 'qc-plc-diag-1',
    question: 'In Allen-Bradley RSLogix 5000, what does a major fault code 1 typically indicate?',
    options: [
      'Communication timeout',
      'Power-up fault',
      'I/O module failure',
      'Program checksum error'
    ],
    correctIndex: 1,
    explanation: 'Major fault code 1 in Allen-Bradley controllers indicates a power-up fault, which occurs during controller initialization. This requires clearing the fault and potentially checking the program or battery status before returning to Run mode.'
  },
  {
    id: 'qc-plc-diag-2',
    question: 'What safety precaution is CRITICAL before forcing I/O points in a PLC system?',
    options: [
      'Ensure the HMI is connected',
      'Document the current program state',
      'Ensure personnel safety and equipment lockout procedures',
      'Back up the alarm history'
    ],
    correctIndex: 2,
    explanation: 'Before forcing any I/O points, you MUST ensure all personnel are clear of affected equipment and proper lockout/tagout procedures are followed. Forced outputs can cause unexpected machine movement regardless of program logic or safety interlocks.'
  },
  {
    id: 'qc-plc-diag-3',
    question: 'In Siemens TIA Portal, what does a red "SF" LED on a CPU module indicate?',
    options: [
      'System running in safe mode',
      'System fault requiring attention',
      'Safety function active',
      'Standby function enabled'
    ],
    correctIndex: 1,
    explanation: 'The red SF (System Fault) LED on Siemens CPUs indicates a system fault that requires attention. This could be hardware failure, configuration errors, or other critical issues. Check the diagnostic buffer in TIA Portal for detailed fault information.'
  }
];

// Quiz Questions
const quizQuestions = [
  {
    question: 'What is the primary purpose of the diagnostic buffer in a Siemens S7-1500 PLC?',
    options: [
      'To store program backups',
      'To record system events, errors, and status changes chronologically',
      'To buffer communication data',
      'To store recipe data'
    ],
    correctAnswer: 'To record system events, errors, and status changes chronologically'
  },
  {
    question: 'In Allen-Bradley Studio 5000, what does the term "inhibited" mean when applied to an I/O module?',
    options: [
      'The module is running in safe mode',
      'The module is disabled and will not communicate',
      'The module has a firmware update pending',
      'The module is in redundancy mode'
    ],
    correctAnswer: 'The module is disabled and will not communicate'
  },
  {
    question: 'What major fault type 4 indicates in Allen-Bradley ControlLogix processors?',
    options: [
      'Power loss',
      'I/O fault',
      'Program fault (instruction execution error)',
      'Communication fault'
    ],
    correctAnswer: 'Program fault (instruction execution error)'
  },
  {
    question: 'When performing online changes in TIA Portal, what does the "Download to device" with "Start modules" option do?',
    options: [
      'Only downloads changes without affecting operation',
      'Downloads changes and automatically restarts the CPU',
      'Creates a backup before downloading',
      'Compares online and offline programs only'
    ],
    correctAnswer: 'Downloads changes and automatically restarts the CPU'
  },
  {
    question: 'What is the recommended maximum number of forces that should be active in a production PLC at any time?',
    options: [
      'As many as needed for debugging',
      'Maximum of 10 forces',
      'Zero - forces should be temporary for troubleshooting only',
      'One per I/O rack'
    ],
    correctAnswer: 'Zero - forces should be temporary for troubleshooting only'
  },
  {
    question: 'In RSLogix 5000, what does a flashing green "I/O" LED on the processor indicate?',
    options: [
      'Normal I/O communication',
      'I/O tree contains faulted modules',
      'I/O is being forced',
      'I/O firmware update in progress'
    ],
    correctAnswer: 'I/O tree contains faulted modules'
  },
  {
    question: 'What Siemens TIA Portal feature allows monitoring variable values without a trigger condition?',
    options: [
      'Force table',
      'Watch table',
      'Trace function',
      'Cross reference'
    ],
    correctAnswer: 'Watch table'
  },
  {
    question: 'What communication protocol uses RPI (Requested Packet Interval) for I/O updates in Allen-Bradley systems?',
    options: [
      'Modbus TCP',
      'PROFINET',
      'EtherNet/IP',
      'OPC UA'
    ],
    correctAnswer: 'EtherNet/IP'
  },
  {
    question: 'When should you use "consistent download" vs "download changes only" in TIA Portal?',
    options: [
      'Consistent download for minor changes, changes only for major updates',
      'Always use consistent download',
      'Download changes only for tested modifications, consistent download for complete project updates',
      'They are the same function'
    ],
    correctAnswer: 'Download changes only for tested modifications, consistent download for complete project updates'
  },
  {
    question: 'What is the purpose of the "Compare" function in PLC programming software?',
    options: [
      'To compare processor speeds',
      'To compare online program with offline backup and identify differences',
      'To compare I/O response times',
      'To compare alarm priorities'
    ],
    correctAnswer: 'To compare online program with offline backup and identify differences'
  }
];

// FAQ Data
const faqData = [
  {
    question: 'How do I determine if a PLC fault is hardware or software related?',
    answer: 'Start by checking the LED status indicators on the CPU and I/O modules - most hardware faults show distinct patterns. Review the diagnostic buffer or fault history for error codes. Hardware faults typically show specific module addresses, while software faults reference program blocks or instructions. Use the cross-reference feature to identify which program sections access faulted I/O. For intermittent faults, check for loose connections, EMI interference, or thermal issues. Always compare timestamps between fault logs and production events to identify patterns.'
  },
  {
    question: 'What is the safest way to force an output during troubleshooting?',
    answer: 'First, ALWAYS follow lockout/tagout procedures and ensure all personnel are clear of affected equipment. Document why you need the force and get supervisor approval if required. In the PLC software, enable force mode and apply the force to the specific address. Test with low-risk outputs first if possible. NEVER leave forces active in production - they bypass safety interlocks. Use the force table to track all active forces, and always remove forces and document their removal before leaving the job site. Many facilities require a force log with signatures.'
  },
  {
    question: 'How often should PLC programs be backed up and what should be included?',
    answer: 'PLC programs should be backed up after any validated change, at minimum monthly for critical systems, and always before making modifications. Include: the complete project file, I/O configuration, HMI programs, network configuration, and parameter files for drives and instruments. Use version control with meaningful names including date, revision number, and change description. Store backups in multiple locations - local, network, and offsite. Test restoration procedures periodically to ensure backups are valid and complete.'
  },
  {
    question: 'Why do communication faults occur intermittently and how can I diagnose them?',
    answer: 'Intermittent communication faults often result from: network traffic overload, incorrect RPI settings, cable/connector issues, EMI interference, IP conflicts, or switch configuration problems. Diagnose by monitoring network statistics in the PLC software, checking for CRC errors or packet loss. Use managed switches to view port statistics. Check cable routing away from VFDs and high-current lines. Verify RPI times are appropriate for the application - too fast causes network congestion, too slow causes timeouts. Document when faults occur to identify patterns related to specific machine operations.'
  },
  {
    question: 'What are the risks of making online changes to a running PLC program?',
    answer: 'Online changes carry significant risks: unexpected equipment behavior, safety system bypasses, production interruption, and potential equipment damage. Risks increase with complexity of changes. Some changes cannot be made online and require a download that stops the CPU. Always test changes offline first, have a rollback plan, and inform operators before making changes. Never make online changes to safety-related logic. Keep changes minimal and document everything. Some facilities prohibit online changes entirely and require scheduled downtime for any modifications.'
  },
  {
    question: 'How do I interpret the alarm priority levels in industrial control systems?',
    answer: 'Alarm priorities follow ISA-18.2 guidelines: Critical/Emergency alarms require immediate action to prevent personnel harm or major equipment damage. High priority alarms need prompt response to prevent process upset or minor equipment damage. Medium priority alarms indicate abnormal conditions requiring attention within a shift. Low priority alarms are informational or maintenance-related. Configure alarm limits with appropriate deadbands to prevent nuisance alarms. Implement alarm shelving for known conditions and use alarm rationalization to ensure each alarm has a defined response. Document alarm response procedures for operators.'
  }
];

const IndustrialElectricalModule5Section4: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  // SEO Configuration
  useSEO({
    title: 'PLC Diagnostics and Alarms | Industrial Electrical Module 5 Section 4 | Elec-Mate',
    description: 'Learn PLC diagnostics, fault codes, I/O forcing, alarm management, and troubleshooting for Siemens TIA Portal and Allen-Bradley RSLogix/Studio 5000 systems.',
    keywords: [
      'PLC diagnostics',
      'PLC fault codes',
      'I/O forcing',
      'alarm management',
      'Siemens TIA Portal',
      'Allen-Bradley RSLogix',
      'Studio 5000',
      'PLC troubleshooting',
      'industrial automation',
      'diagnostic buffer'
    ],
    canonicalUrl: '/upskilling/industrial-electrical/module-5/section-4'
  });

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a]/95 border-b border-gray-700">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-8 h-8 text-elec-yellow" />
            <span className="text-elec-yellow text-sm font-medium">Module 5 - Section 4</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            PLC Diagnostics and Alarms
          </h1>
          <p className="text-gray-400">
            Master fault diagnosis, alarm management, and troubleshooting techniques for Siemens and Allen-Bradley PLC systems
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">

        {/* Section 1: Reading PLC Fault Codes and Diagnostics */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold">
              1
            </div>
            <FileWarning className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Reading PLC Fault Codes and Diagnostics</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Understanding PLC fault codes is essential for rapid troubleshooting. Both Siemens and Allen-Bradley
              systems provide comprehensive diagnostic information through their programming software and hardware
              indicators.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Allen-Bradley Major Fault Codes
              </h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-[#2a2a2a] p-3 rounded">
                  <span className="text-red-400 font-mono">Type 1:</span> Power-Up Fault
                  <p className="text-gray-400 text-xs mt-1">Battery low, memory corruption, or initialization error</p>
                </div>
                <div className="bg-[#2a2a2a] p-3 rounded">
                  <span className="text-red-400 font-mono">Type 3:</span> I/O Fault
                  <p className="text-gray-400 text-xs mt-1">Module communication lost or hardware failure</p>
                </div>
                <div className="bg-[#2a2a2a] p-3 rounded">
                  <span className="text-red-400 font-mono">Type 4:</span> Program Fault
                  <p className="text-gray-400 text-xs mt-1">Instruction execution error, math overflow</p>
                </div>
                <div className="bg-[#2a2a2a] p-3 rounded">
                  <span className="text-red-400 font-mono">Type 6:</span> Watchdog Fault
                  <p className="text-gray-400 text-xs mt-1">Scan time exceeded, program loop detected</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Siemens TIA Portal Diagnostics
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">●</span>
                  <div>
                    <strong>Diagnostic Buffer:</strong> Stores up to 3200 events with timestamps, accessible via
                    Online & Diagnostics view
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">●</span>
                  <div>
                    <strong>LED Indicators:</strong> RUN (green), STOP (yellow), ERROR (red), MAINT (yellow)
                    provide immediate visual status
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">●</span>
                  <div>
                    <strong>System Diagnostics OB:</strong> OB82 (I/O fault), OB83 (module removal),
                    OB86 (rack failure) for programmatic fault handling
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-amber-900/20 border border-amber-600 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-amber-400 font-semibold mb-1">Diagnostic Best Practice</h4>
                  <p className="text-sm text-gray-300">
                    Always check the diagnostic buffer BEFORE clearing faults. Record the fault code, timestamp,
                    and any associated events. This information is critical for root cause analysis and may be
                    lost after clearing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: I/O Status Monitoring and Forcing */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold">
              2
            </div>
            <ToggleLeft className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">I/O Status Monitoring and Forcing</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              I/O monitoring allows real-time observation of input and output states, while forcing enables
              manual override of I/O values for testing and troubleshooting. Both features require careful
              attention to safety.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h3 className="text-green-400 font-semibold mb-3">I/O Monitoring</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Real-time status display in tag browsers</li>
                  <li>• Color-coded state indicators (green=ON, gray=OFF)</li>
                  <li>• Module-level and bit-level views</li>
                  <li>• Data table trending for analog values</li>
                  <li>• Cross-reference to find usage in code</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h3 className="text-orange-400 font-semibold mb-3">I/O Forcing</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Override input or output values manually</li>
                  <li>• Force ON or OFF regardless of logic</li>
                  <li>• Bypasses ALL safety interlocks</li>
                  <li>• Forces persist through power cycles</li>
                  <li>• Force tables track active forces</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-400 font-semibold mb-2">CRITICAL SAFETY WARNING - I/O Forcing</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• <strong>NEVER</strong> force safety-related I/O without proper LOTO procedures</li>
                    <li>• Forced outputs can cause unexpected machine movement</li>
                    <li>• Forces bypass E-stop circuits and safety PLCs</li>
                    <li>• All forces must be removed before leaving equipment</li>
                    <li>• Document all forces with reason and removal time</li>
                    <li>• Some facilities require two-person verification for forces</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-semibold mb-3">Force Indicators by Platform</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between bg-[#2a2a2a] p-3 rounded">
                  <span>Allen-Bradley RSLogix/Studio 5000</span>
                  <span className="text-yellow-400 font-mono">Yellow highlight + "Forces Active" banner</span>
                </div>
                <div className="flex items-center justify-between bg-[#2a2a2a] p-3 rounded">
                  <span>Siemens TIA Portal</span>
                  <span className="text-yellow-400 font-mono">Force icon + yellow status in tables</span>
                </div>
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

        {/* Section 3: Program Monitoring and Online Changes */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold">
              3
            </div>
            <Eye className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Program Monitoring and Online Changes</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Online monitoring shows real-time execution of PLC logic, with power flow indication and current
              values. Online editing allows modifications to a running program, but requires careful consideration
              of the risks involved.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Online Monitoring Features
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="text-blue-400 font-medium mb-2">Allen-Bradley Studio 5000</h4>
                  <ul className="space-y-1">
                    <li>• Green highlighting shows power flow</li>
                    <li>• Real-time tag values in rungs</li>
                    <li>• Trend charts for continuous values</li>
                    <li>• Watch window for selected tags</li>
                    <li>• Breakpoints in Function Block</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-blue-400 font-medium mb-2">Siemens TIA Portal</h4>
                  <ul className="space-y-1">
                    <li>• Blue/green signal flow in LAD/FBD</li>
                    <li>• Watch tables for tag monitoring</li>
                    <li>• Trace function for recording values</li>
                    <li>• Call hierarchy display</li>
                    <li>• Status bar with scan time</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-orange-400 font-semibold mb-3">Online Editing Considerations</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-bold">CAN</span>
                  <div>
                    <p className="font-medium">Changes that can be made online:</p>
                    <p className="text-gray-400">Logic modifications, timer/counter presets, add/remove rungs,
                    modify data values, add comments</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">CANNOT</span>
                  <div>
                    <p className="font-medium">Changes requiring download/restart:</p>
                    <p className="text-gray-400">I/O configuration changes, adding new modules, changing task
                    priorities, major safety modifications, changing data types</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-blue-400 font-semibold mb-1">Online Edit Workflow</h4>
                  <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                    <li>Create backup of current online program</li>
                    <li>Inform operators of pending change</li>
                    <li>Make minimal, targeted modifications</li>
                    <li>Test in "Test Edit" mode if available</li>
                    <li>Assemble and download changes</li>
                    <li>Verify operation and document change</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Alarm History and Event Logs */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold">
              4
            </div>
            <Bell className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Alarm History and Event Logs</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Effective alarm management follows ISA-18.2 guidelines for industrial alarm systems. Proper
              configuration of alarm priorities, logging, and response procedures is essential for safe and
              efficient plant operations.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Alarm Priority Levels (ISA-18.2)
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 bg-red-900/30 p-3 rounded">
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">CRITICAL</span>
                  <span className="text-sm">Immediate action required - personnel safety or major equipment damage</span>
                </div>
                <div className="flex items-center gap-3 bg-orange-900/30 p-3 rounded">
                  <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold">HIGH</span>
                  <span className="text-sm">Prompt response needed - process upset or equipment damage likely</span>
                </div>
                <div className="flex items-center gap-3 bg-yellow-900/30 p-3 rounded">
                  <span className="bg-yellow-600 text-black px-2 py-1 rounded text-xs font-bold">MEDIUM</span>
                  <span className="text-sm">Attention within shift - abnormal condition requiring monitoring</span>
                </div>
                <div className="flex items-center gap-3 bg-blue-900/30 p-3 rounded">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">LOW</span>
                  <span className="text-sm">Informational - maintenance or status notification</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h3 className="text-green-400 font-semibold mb-3">Alarm Log Best Practices</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Include timestamp, tag, description, value</li>
                  <li>• Log acknowledgment time and operator ID</li>
                  <li>• Record alarm duration and reset time</li>
                  <li>• Archive logs for regulatory compliance</li>
                  <li>• Analyze trends for recurring issues</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h3 className="text-purple-400 font-semibold mb-3">Alarm Rationalization</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Each alarm must have defined response</li>
                  <li>• Eliminate nuisance alarms</li>
                  <li>• Set appropriate deadbands</li>
                  <li>• Use alarm shelving for known issues</li>
                  <li>• Target: 6 alarms/hour max per operator</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-semibold mb-3">Event Log Types</h3>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div className="bg-[#2a2a2a] p-3 rounded text-center">
                  <History className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <p className="font-medium">Process Events</p>
                  <p className="text-gray-400 text-xs">State changes, setpoint changes, mode changes</p>
                </div>
                <div className="bg-[#2a2a2a] p-3 rounded text-center">
                  <AlertCircle className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                  <p className="font-medium">System Events</p>
                  <p className="text-gray-400 text-xs">Faults, diagnostics, communication status</p>
                </div>
                <div className="bg-[#2a2a2a] p-3 rounded text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-green-400" />
                  <p className="font-medium">Security Events</p>
                  <p className="text-gray-400 text-xs">Login attempts, access changes, downloads</p>
                </div>
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

        {/* Section 5: Communication Fault Diagnosis */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold">
              5
            </div>
            <WifiOff className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Communication Fault Diagnosis</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Network communication issues are among the most challenging PLC faults to diagnose. Understanding
              the underlying protocols and using systematic troubleshooting approaches is essential for
              resolving these problems efficiently.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Wifi className="w-5 h-5" />
                Common Industrial Protocols
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="text-blue-400 font-medium mb-2">EtherNet/IP (Allen-Bradley)</h4>
                  <ul className="space-y-1 text-gray-400">
                    <li>• Uses CIP over TCP/UDP</li>
                    <li>• RPI defines update rate</li>
                    <li>• Implicit (I/O) vs Explicit messaging</li>
                    <li>• Default port: 44818 (TCP/UDP 2222)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-blue-400 font-medium mb-2">PROFINET (Siemens)</h4>
                  <ul className="space-y-1 text-gray-400">
                    <li>• Real-time Ethernet protocol</li>
                    <li>• RT (standard) and IRT (isochronous)</li>
                    <li>• Device naming required (not just IP)</li>
                    <li>• Update times down to 31.25 microseconds</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-red-400 font-semibold mb-3">Common Communication Faults</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-[#2a2a2a] p-3 rounded">
                  <p className="font-medium text-white">Connection Timeout</p>
                  <p className="text-gray-400">RPI too fast, network congestion, cable issues, wrong IP/subnet</p>
                </div>
                <div className="bg-[#2a2a2a] p-3 rounded">
                  <p className="font-medium text-white">Module Not Responding</p>
                  <p className="text-gray-400">Module powered off, wrong configuration, firmware mismatch</p>
                </div>
                <div className="bg-[#2a2a2a] p-3 rounded">
                  <p className="font-medium text-white">Intermittent Disconnects</p>
                  <p className="text-gray-400">EMI interference, loose connections, switch port issues, duplicate IP</p>
                </div>
                <div className="bg-[#2a2a2a] p-3 rounded">
                  <p className="font-medium text-white">CRC/Packet Errors</p>
                  <p className="text-gray-400">Cable damage, connector issues, grounding problems, switch failures</p>
                </div>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-600 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-green-400 font-semibold mb-2">Troubleshooting Checklist</h4>
                  <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                    <li>Check physical layer: cables, connectors, link LEDs</li>
                    <li>Verify IP addresses and subnet masks</li>
                    <li>Ping devices from engineering workstation</li>
                    <li>Check module configuration matches physical hardware</li>
                    <li>Review RPI settings - increase if timeouts occur</li>
                    <li>Monitor switch port statistics for errors</li>
                    <li>Use protocol analyzer (Wireshark) for packet capture</li>
                    <li>Check for duplicate IP addresses or device names</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Backup, Restore and Version Control */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold">
              6
            </div>
            <Database className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Backup, Restore and Version Control</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Proper backup procedures and version control are critical for maintaining system integrity,
              enabling rapid recovery from failures, and tracking changes over time. A disciplined approach
              to program management prevents costly downtime and ensures accountability.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                  <Save className="w-5 h-5" />
                  What to Back Up
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">●</span>
                    PLC program (complete project)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">●</span>
                    I/O configuration files
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">●</span>
                    HMI/SCADA applications
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">●</span>
                    Network configuration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">●</span>
                    Drive/instrument parameters
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">●</span>
                    Safety PLC programs separately
                  </li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Backup Schedule
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">●</span>
                    After every validated change
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">●</span>
                    Before any maintenance activity
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">●</span>
                    Weekly for critical systems
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">●</span>
                    Monthly for stable systems
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">●</span>
                    Before firmware updates
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">●</span>
                    During system commissioning
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-purple-400 font-semibold mb-3">Version Control Best Practices</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-[#2a2a2a] p-3 rounded">
                  <p className="font-medium text-white">Naming Convention</p>
                  <p className="text-gray-400 font-mono">
                    [System]_[Version]_[Date]_[Initials]<br />
                    Example: PackLine3_v2.5_20240115_JDS
                  </p>
                </div>
                <div className="bg-[#2a2a2a] p-3 rounded">
                  <p className="font-medium text-white">Change Documentation</p>
                  <p className="text-gray-400">
                    Include: reason for change, description of modifications, test results, approvals
                  </p>
                </div>
                <div className="bg-[#2a2a2a] p-3 rounded">
                  <p className="font-medium text-white">Storage Locations</p>
                  <p className="text-gray-400">
                    Minimum 3 locations: local engineering PC, network server, offsite/cloud backup
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-900/20 border border-amber-600 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-amber-400 font-semibold mb-1">Compare Before Restore</h4>
                  <p className="text-sm text-gray-300">
                    Always use the Compare function to verify differences between online and backup programs
                    before restoring. Restoring an outdated backup can undo critical process improvements or
                    reintroduce resolved bugs.
                  </p>
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
        <section className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-lg p-6 border-2 border-elec-yellow">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-elec-yellow">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="text-white font-semibold mb-3 border-b border-gray-600 pb-2">
                Allen-Bradley Major Fault Codes
              </h3>
              <div className="space-y-1 font-mono text-gray-300">
                <p><span className="text-red-400">1:</span> Power-up fault</p>
                <p><span className="text-red-400">3:</span> I/O fault</p>
                <p><span className="text-red-400">4:</span> Program/instruction fault</p>
                <p><span className="text-red-400">6:</span> Watchdog fault</p>
                <p><span className="text-red-400">7:</span> Nonrecoverable fault</p>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 border-b border-gray-600 pb-2">
                Siemens CPU LED Indicators
              </h3>
              <div className="space-y-1 text-gray-300">
                <p><span className="text-green-400">RUN:</span> Green = running</p>
                <p><span className="text-yellow-400">STOP:</span> Yellow = stopped</p>
                <p><span className="text-red-400">ERROR:</span> Red = fault</p>
                <p><span className="text-yellow-400">MAINT:</span> Yellow = maintenance needed</p>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 border-b border-gray-600 pb-2">
                Diagnostic OBs (Siemens)
              </h3>
              <div className="space-y-1 font-mono text-gray-300">
                <p><span className="text-blue-400">OB82:</span> I/O access fault</p>
                <p><span className="text-blue-400">OB83:</span> Module removal/insert</p>
                <p><span className="text-blue-400">OB86:</span> Rack failure</p>
                <p><span className="text-blue-400">OB121:</span> Programming error</p>
                <p><span className="text-blue-400">OB122:</span> Module access error</p>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 border-b border-gray-600 pb-2">
                Alarm Priority Target Rates
              </h3>
              <div className="space-y-1 text-gray-300">
                <p><span className="text-green-400">Goal:</span> Less than 6 alarms/hr/operator</p>
                <p><span className="text-yellow-400">Manageable:</span> 6-12 alarms/hr</p>
                <p><span className="text-red-400">Overload:</span> More than 12 alarms/hr</p>
                <p><span className="text-blue-400">Flood:</span> More than 10/10 min (suppress)</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-600">
            <h3 className="text-white font-semibold mb-2">Force Safety Checklist</h3>
            <div className="grid md:grid-cols-4 gap-2 text-xs text-gray-300">
              <div className="bg-[#1a1a1a] p-2 rounded">1. LOTO completed</div>
              <div className="bg-[#1a1a1a] p-2 rounded">2. Area cleared</div>
              <div className="bg-[#1a1a1a] p-2 rounded">3. Documented reason</div>
              <div className="bg-[#1a1a1a] p-2 rounded">4. Supervisor notified</div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-600 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors min-h-[44px] touch-manipulation"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="p-4 bg-[#2a2a2a] text-gray-300 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
              <ClipboardList className="w-6 h-6" />
              Section Quiz
            </h2>
            <Button
              onClick={() => setShowQuiz(!showQuiz)}
              className="bg-elec-yellow text-[#1a1a1a] hover:bg-yellow-500 min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              {showQuiz ? 'Hide Quiz' : 'Start Quiz'}
            </Button>
          </div>

          {showQuiz && (
            <Quiz
              questions={quizQuestions}
              onComplete={(score) => {
                console.log(`Quiz completed with score: ${score}/${quizQuestions.length}`);
              }}
            />
          )}
        </section>

        {/* Navigation */}
        <nav className="flex justify-between items-center pt-6 border-t border-gray-700">
          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-5/section-3')}
            variant="outline"
            className="flex items-center gap-2 border-gray-600 text-white hover:bg-[#2a2a2a] hover:text-elec-yellow min-h-[44px] touch-manipulation active:scale-[0.98]"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Previous: Section 3</span>
            <span className="sm:hidden">Previous</span>
          </Button>

          <span className="text-gray-400 text-sm">Section 4 of 6</span>

          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-5/section-5')}
            className="flex items-center gap-2 bg-elec-yellow text-[#1a1a1a] hover:bg-yellow-500 min-h-[44px] touch-manipulation active:scale-[0.98]"
          >
            <span className="hidden sm:inline">Next: Section 5</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule5Section4;
