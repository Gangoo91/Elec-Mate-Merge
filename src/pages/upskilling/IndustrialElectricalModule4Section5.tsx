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
  Monitor,
  Server,
  Shield,
  AlertTriangle,
  Network,
  Database,
  Settings,
  Eye,
  Lock,
  Cpu,
  Layers,
  Bell
} from 'lucide-react';

const IndustrialElectricalModule4Section5: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useSEO({
    title: 'SCADA and HMI Introduction | Industrial Electrical Module 4 Section 5 | Elec-Mate',
    description: 'Learn SCADA system architecture, HMI design principles following ISA-101 standards, alarm management, OPC UA communication, and cybersecurity for UK Critical National Infrastructure protection.',
    keywords: [
      'SCADA systems',
      'HMI design',
      'ISA-101 standards',
      'high-performance HMI',
      'alarm management',
      'OPC UA',
      'industrial cybersecurity',
      'CNI protection',
      'PLC communication',
      'RTU'
    ],
    canonicalUrl: '/upskilling/industrial-electrical/module-4/section-5'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1',
      question: 'In a typical SCADA architecture, which component acts as the intermediary between field devices and the central control system?',
      options: [
        'Human Machine Interface (HMI)',
        'Remote Terminal Unit (RTU) or PLC',
        'Historian database',
        'Engineering workstation'
      ],
      correctIndex: 1,
      explanation: 'RTUs and PLCs serve as the intermediary layer, collecting data from field instruments and sensors, executing local control logic, and communicating with the central SCADA server. They enable distributed control and data acquisition across geographically dispersed sites.'
    },
    {
      id: 'qc2',
      question: 'According to ISA-101 high-performance HMI principles, what colour should be used for normal operating conditions on process displays?',
      options: [
        'Bright green to indicate everything is working',
        'Grey or muted colours to reduce visual clutter',
        'Blue to represent safe operation',
        'Yellow for continuous attention'
      ],
      correctIndex: 1,
      explanation: 'ISA-101 high-performance HMI standards recommend grey and muted colours for normal operations. This allows abnormal conditions (shown in colour) to stand out clearly, reducing operator fatigue and improving situational awareness. Bright colours are reserved for alarms and deviations.'
    },
    {
      id: 'qc3',
      question: 'What is the primary purpose of alarm rationalisation in a SCADA system?',
      options: [
        'To increase the total number of configured alarms',
        'To ensure every sensor has an associated alarm',
        'To reduce alarm floods and ensure each alarm is actionable',
        'To automatically acknowledge all alarms'
      ],
      correctIndex: 2,
      explanation: 'Alarm rationalisation ensures that each configured alarm is meaningful, actionable, and requires operator response. This reduces alarm floods (excessive alarms overwhelming operators), prevents alarm fatigue, and improves response to genuine abnormal conditions following EEMUA 191 guidelines.'
    }
  ];

  const quizQuestions = [
    {
      question: 'What does SCADA stand for?',
      options: [
        'System Control and Data Acquisition',
        'Supervisory Control and Data Acquisition',
        'Supervised Computer and Data Analysis',
        'System Communication and Data Administration'
      ],
      correctAnswer: 'Supervisory Control and Data Acquisition'
    },
    {
      question: 'Which communication protocol is recommended for modern SCADA systems due to its security features and platform independence?',
      options: [
        'Modbus RTU',
        'PROFIBUS',
        'OPC UA (Unified Architecture)',
        'DeviceNet'
      ],
      correctAnswer: 'OPC UA (Unified Architecture)'
    },
    {
      question: 'In ISA-101 compliant HMI design, how should process values within normal range be displayed?',
      options: [
        'Flashing to attract attention',
        'In bright green text',
        'As static numerical values without colour emphasis',
        'Hidden until they become abnormal'
      ],
      correctAnswer: 'As static numerical values without colour emphasis'
    },
    {
      question: 'What is the recommended maximum alarm rate per operator position according to EEMUA 191 guidelines?',
      options: [
        '1 alarm per minute average',
        '10 alarms per 10 minutes average',
        '1 alarm per 5 minutes average (12 per hour)',
        '30 alarms per hour average'
      ],
      correctAnswer: '1 alarm per 5 minutes average (12 per hour)'
    },
    {
      question: 'Which UK organisation provides guidance on protecting Critical National Infrastructure (CNI) SCADA systems?',
      options: [
        'Health and Safety Executive (HSE)',
        'National Cyber Security Centre (NCSC)',
        'Institution of Engineering and Technology (IET)',
        'British Standards Institution (BSI)'
      ],
      correctAnswer: 'National Cyber Security Centre (NCSC)'
    },
    {
      question: 'What is the primary function of a historian in a SCADA system?',
      options: [
        'To control field devices in real-time',
        'To provide long-term storage and retrieval of process data',
        'To generate operator alarms',
        'To program PLC logic'
      ],
      correctAnswer: 'To provide long-term storage and retrieval of process data'
    },
    {
      question: 'When selecting HMI hardware for an industrial environment, what IP rating would typically be required for a panel-mounted touchscreen in a washdown area?',
      options: [
        'IP20',
        'IP54',
        'IP65 or higher',
        'IP40'
      ],
      correctAnswer: 'IP65 or higher'
    },
    {
      question: 'What security principle involves separating the SCADA network from the corporate IT network?',
      options: [
        'Defence in depth',
        'Network segmentation (DMZ)',
        'Encryption at rest',
        'Multi-factor authentication'
      ],
      correctAnswer: 'Network segmentation (DMZ)'
    },
    {
      question: 'According to high-performance HMI principles, what should be the primary navigation method for operators?',
      options: [
        'Pull-down menus only',
        'Hierarchical display structure with clear navigation paths',
        'Command line interface',
        'Random access to any screen'
      ],
      correctAnswer: 'Hierarchical display structure with clear navigation paths'
    },
    {
      question: 'What is the purpose of alarm shelving in modern SCADA systems?',
      options: [
        'To permanently delete unwanted alarms',
        'To temporarily suppress known alarms during maintenance while maintaining audit trail',
        'To increase alarm priority levels',
        'To convert alarms into events'
      ],
      correctAnswer: 'To temporarily suppress known alarms during maintenance while maintaining audit trail'
    }
  ];

  const faqs = [
    {
      question: 'What is the difference between SCADA and DCS systems?',
      answer: 'SCADA (Supervisory Control and Data Acquisition) systems are typically used for geographically distributed processes like water distribution, power grids, and oil pipelines. They focus on data acquisition and supervisory control with RTUs at remote sites. DCS (Distributed Control System) is used for process-intensive applications in a single location like refineries and chemical plants, with tighter integration of control loops. Modern systems often blur this distinction, with hybrid architectures combining features of both. SCADA excels at wide-area monitoring, while DCS provides millisecond-level control response.'
    },
    {
      question: 'How do I implement ISA-101 standards in an existing HMI system?',
      answer: 'Implementing ISA-101 in existing systems requires a phased approach: First, conduct an audit of current displays identifying deviations from high-performance principles. Prioritise critical operational displays for redesign. Remove 3D effects, bright background colours, and decorative elements. Implement grey-scale backgrounds with colour reserved for abnormal conditions. Redesign trend displays for context and situational awareness. Train operators on the new interface philosophy. Consider piloting changes on one process area before full rollout. Document display standards in a site style guide. Budget for iterative improvements based on operator feedback.'
    },
    {
      question: 'What communication protocols should I use between PLCs and SCADA?',
      answer: 'For new installations, OPC UA (Unified Architecture) is the recommended standard offering built-in security (encryption, authentication), platform independence, and complex data structures. For legacy systems, Modbus TCP/IP remains widely supported and simple to implement. PROFINET is common in Siemens environments. DNP3 (Distributed Network Protocol) is standard for utilities and power systems. EtherNet/IP is prevalent in Rockwell/Allen-Bradley installations. Consider protocol converters or gateways when integrating mixed vendor environments. Always evaluate security implications—older protocols like Modbus lack authentication and should be isolated on protected networks.'
    },
    {
      question: 'How many alarms should a SCADA system have configured?',
      answer: 'EEMUA 191 guidelines recommend designing for approximately 1 alarm per 5 minutes (12 per hour) during normal operations, with upset conditions not exceeding 10 alarms in 10 minutes. A well-rationalised system typically has 150-300 configured alarms per operator console. Each alarm must be: indicative of abnormal condition, requiring operator action, time-sensitive, and not duplicated. Conduct alarm rationalisation reviews using Master Alarm Database documentation. Remove nuisance alarms, consolidate related alarms, and ensure proper priority assignment. Regular metrics analysis (alarm floods, most frequent alarms, standing alarms) drives continuous improvement.'
    },
    {
      question: 'What cybersecurity measures are essential for SCADA systems in UK CNI?',
      answer: 'UK Critical National Infrastructure SCADA systems must comply with NIS Regulations and NCSC guidance. Essential measures include: Network segmentation with industrial DMZ separating IT/OT networks; Firewalls with application-layer inspection for industrial protocols; Secure remote access via VPN with multi-factor authentication; Regular patching strategy coordinated with vendor support; Asset inventory and vulnerability management; Intrusion detection systems tuned for industrial protocols; Incident response plans specific to OT environments; Regular penetration testing by specialists; Security awareness training for operators and engineers; Backup and recovery procedures tested regularly. Consider IEC 62443 certification for comprehensive security lifecycle management.'
    },
    {
      question: 'What are the key considerations when selecting HMI panel hardware?',
      answer: 'Key selection criteria include: Display size appropriate for viewing distance and information density (typically 15-24 inches for operator stations); Resolution sufficient for text clarity and graphics detail; Touch technology—resistive for gloved operation, projective capacitive for multi-touch; Environmental ratings (IP65+ for washdown, ATEX for hazardous areas); Operating temperature range for the installation environment; Processing power for graphics rendering and data handling; Communication ports (Ethernet, serial) matching system requirements; Mounting options (panel, arm, VESA); Sunlight readability if exposed to natural light; Vendor support and spare parts availability; Compliance with relevant standards (UL, CE, UKCA). Consider total cost of ownership including maintenance and lifecycle support.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-elec-yellow mb-2">
            <Monitor className="w-6 h-6" />
            <span className="text-sm font-medium">Module 4 • Section 5</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            SCADA and HMI Introduction
          </h1>
          <p className="text-gray-300 text-lg">
            Master Supervisory Control and Data Acquisition systems and Human Machine Interface design
            principles following ISA-101 standards for high-performance operator displays.
          </p>
        </header>

        {/* Section 1: SCADA System Architecture */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">1</span>
            </div>
            <h2 className="text-2xl font-bold text-white">SCADA System Architecture and Components</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <Server className="w-8 h-8 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-elec-yellow mb-2">Understanding SCADA Architecture</h3>
                <p className="text-gray-300 mb-4">
                  SCADA (Supervisory Control and Data Acquisition) systems provide centralised monitoring and
                  control of industrial processes, often spanning large geographical areas. Modern SCADA
                  architecture consists of multiple interconnected layers working together.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-elec-yellow" />
                  SCADA Architecture Layers
                </h4>
                <div className="space-y-3">
                  <div className="border-l-2 border-elec-yellow pl-4">
                    <p className="text-elec-yellow font-medium">Level 0 - Field Devices</p>
                    <p className="text-gray-400 text-sm">Sensors, transmitters, actuators, and final control elements that interface directly with the physical process</p>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-4">
                    <p className="text-blue-400 font-medium">Level 1 - Control Layer</p>
                    <p className="text-gray-400 text-sm">PLCs (Programmable Logic Controllers) and RTUs (Remote Terminal Units) executing control logic and data acquisition</p>
                  </div>
                  <div className="border-l-2 border-green-500 pl-4">
                    <p className="text-green-400 font-medium">Level 2 - Supervisory Layer</p>
                    <p className="text-gray-400 text-sm">SCADA servers, HMI stations, and engineering workstations for monitoring and supervisory control</p>
                  </div>
                  <div className="border-l-2 border-purple-500 pl-4">
                    <p className="text-purple-400 font-medium">Level 3 - Operations Management</p>
                    <p className="text-gray-400 text-sm">Historians, reporting systems, and manufacturing execution systems (MES)</p>
                  </div>
                  <div className="border-l-2 border-orange-500 pl-4">
                    <p className="text-orange-400 font-medium">Level 4 - Enterprise</p>
                    <p className="text-gray-400 text-sm">Business systems, ERP integration, and corporate IT networks (separated by DMZ)</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Key SCADA Components</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-elec-yellow font-medium">SCADA Server</p>
                    <p className="text-gray-400 text-sm">Central system running SCADA software, managing communications, data processing, and alarm handling</p>
                  </div>
                  <div>
                    <p className="text-elec-yellow font-medium">RTU (Remote Terminal Unit)</p>
                    <p className="text-gray-400 text-sm">Ruggedised device for remote sites, collecting data and providing local control with store-and-forward capability</p>
                  </div>
                  <div>
                    <p className="text-elec-yellow font-medium">Communication Network</p>
                    <p className="text-gray-400 text-sm">Industrial Ethernet, serial links, cellular, radio, or satellite for connecting distributed sites</p>
                  </div>
                  <div>
                    <p className="text-elec-yellow font-medium">Historian Database</p>
                    <p className="text-gray-400 text-sm">Time-series database optimised for storing and retrieving large volumes of process data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: HMI Hardware Selection */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">2</span>
            </div>
            <h2 className="text-2xl font-bold text-white">HMI Hardware Selection</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <Monitor className="w-8 h-8 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-elec-yellow mb-2">Panel PCs and Touch Screens</h3>
                <p className="text-gray-300 mb-4">
                  Selecting appropriate HMI hardware is critical for operator effectiveness and system reliability.
                  Consider the operating environment, user requirements, and long-term supportability.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Display Technologies</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-elec-yellow border-b border-gray-600">
                        <th className="text-left py-2 pr-4">Type</th>
                        <th className="text-left py-2 pr-4">Advantages</th>
                        <th className="text-left py-2">Considerations</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="py-2 pr-4 font-medium">Resistive Touch</td>
                        <td className="py-2 pr-4">Works with gloves, stylus, lower cost</td>
                        <td className="py-2">Less durable, reduced clarity</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 pr-4 font-medium">Capacitive Touch</td>
                        <td className="py-2 pr-4">Multi-touch, excellent clarity, durable</td>
                        <td className="py-2">Requires conductive gloves or bare fingers</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 pr-4 font-medium">Panel PC</td>
                        <td className="py-2 pr-4">Full Windows/Linux capability, flexible</td>
                        <td className="py-2">Higher cost, more complex maintenance</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-medium">Dedicated HMI</td>
                        <td className="py-2 pr-4">Purpose-built, reliable, long lifecycle</td>
                        <td className="py-2">Vendor lock-in, limited flexibility</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Environmental Ratings</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#242424] p-3 rounded">
                    <p className="text-elec-yellow font-medium">IP65 - Dust-tight, Water Jets</p>
                    <p className="text-gray-400 text-sm">Required for washdown areas, food processing, outdoor kiosks</p>
                  </div>
                  <div className="bg-[#242424] p-3 rounded">
                    <p className="text-elec-yellow font-medium">IP67 - Temporary Immersion</p>
                    <p className="text-gray-400 text-sm">For harsh washdown or potential flooding environments</p>
                  </div>
                  <div className="bg-[#242424] p-3 rounded">
                    <p className="text-elec-yellow font-medium">ATEX/IECEx Certified</p>
                    <p className="text-gray-400 text-sm">Mandatory for Zone 1/2 or Zone 21/22 hazardous areas</p>
                  </div>
                  <div className="bg-[#242424] p-3 rounded">
                    <p className="text-elec-yellow font-medium">Extended Temperature</p>
                    <p className="text-gray-400 text-sm">-20°C to +60°C for outdoor or non-climate-controlled areas</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4">
                <p className="text-yellow-200 flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Selection Tip:</strong> Always verify the HMI hardware lifecycle support period.
                    Industrial equipment often operates for 15-20 years, so ensure spare parts and support
                    will be available throughout the expected system lifetime.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <div className="mb-12">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 3: HMI Software and Screen Design */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">3</span>
            </div>
            <h2 className="text-2xl font-bold text-white">HMI Software and Screen Design Principles</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <Eye className="w-8 h-8 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-elec-yellow mb-2">ISA-101 High-Performance HMI Design</h3>
                <p className="text-gray-300 mb-4">
                  ISA-101 (Human Machine Interfaces for Process Automation Systems) provides guidelines for
                  creating effective operator displays that improve situational awareness and reduce human error.
                  High-performance HMI design focuses on clarity, consistency, and actionable information.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">ISA-101 Key Principles</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Grey Background, Colour for Abnormal</p>
                      <p className="text-gray-400 text-sm">Use muted grey tones for normal operation; reserve colour to highlight deviations requiring attention</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Eliminate Visual Clutter</p>
                      <p className="text-gray-400 text-sm">Remove 3D effects, gradients, shadows, and decorative elements that distract from process information</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Contextual Information</p>
                      <p className="text-gray-400 text-sm">Show operating limits, setpoints, and trends alongside current values to provide context</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Hierarchical Navigation</p>
                      <p className="text-gray-400 text-sm">Structure displays in logical levels: Overview → Area → Unit → Detail with consistent navigation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white">5</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Analog Representation</p>
                      <p className="text-gray-400 text-sm">Use bar graphs and analog indicators that allow rapid visual assessment of process variables</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Colour Standards for Process Displays</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center">
                    <div className="w-full h-12 bg-gray-500 rounded mb-2"></div>
                    <p className="text-gray-300 text-sm">Normal Operation</p>
                  </div>
                  <div className="text-center">
                    <div className="w-full h-12 bg-yellow-500 rounded mb-2"></div>
                    <p className="text-gray-300 text-sm">Warning/Advisory</p>
                  </div>
                  <div className="text-center">
                    <div className="w-full h-12 bg-orange-500 rounded mb-2"></div>
                    <p className="text-gray-300 text-sm">High Priority</p>
                  </div>
                  <div className="text-center">
                    <div className="w-full h-12 bg-red-600 rounded mb-2"></div>
                    <p className="text-gray-300 text-sm">Critical/Emergency</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Display Hierarchy Structure</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="text-elec-yellow font-mono w-24">Level 1</span>
                    <div className="flex-1 bg-elec-yellow/20 rounded px-3 py-2">
                      <span className="text-white">Plant Overview - KPIs, overall status, major alarms</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-elec-yellow font-mono w-24">Level 2</span>
                    <div className="flex-1 bg-blue-500/20 rounded px-3 py-2">
                      <span className="text-white">Area Overview - Process areas, unit status summaries</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-elec-yellow font-mono w-24">Level 3</span>
                    <div className="flex-1 bg-green-500/20 rounded px-3 py-2">
                      <span className="text-white">Unit Control - Process flow diagrams, control loops</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-elec-yellow font-mono w-24">Level 4</span>
                    <div className="flex-1 bg-purple-500/20 rounded px-3 py-2">
                      <span className="text-white">Detail/Diagnostic - Individual equipment, trends, configuration</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Alarm Management and Historian */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">4</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Alarm Management and Historian Functions</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <Bell className="w-8 h-8 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-elec-yellow mb-2">Alarm Rationalisation and EEMUA 191</h3>
                <p className="text-gray-300 mb-4">
                  Effective alarm management is critical for operator safety and process efficiency.
                  EEMUA Publication 191 and ISA-18.2 provide industry standards for alarm system design,
                  implementation, and ongoing management.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Alarm Priority Levels (ISA-18.2)</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 bg-red-900/30 rounded p-3">
                    <span className="text-red-400 font-bold w-24">Critical</span>
                    <p className="text-gray-300 text-sm">Immediate action required to prevent loss of life or major equipment damage - response within seconds</p>
                  </div>
                  <div className="flex items-center gap-4 bg-orange-900/30 rounded p-3">
                    <span className="text-orange-400 font-bold w-24">High</span>
                    <p className="text-gray-300 text-sm">Prompt action required to prevent serious impact - response within minutes</p>
                  </div>
                  <div className="flex items-center gap-4 bg-yellow-900/30 rounded p-3">
                    <span className="text-yellow-400 font-bold w-24">Medium</span>
                    <p className="text-gray-300 text-sm">Action required to prevent equipment damage or production loss - response within 30 minutes</p>
                  </div>
                  <div className="flex items-center gap-4 bg-blue-900/30 rounded p-3">
                    <span className="text-blue-400 font-bold w-24">Low</span>
                    <p className="text-gray-300 text-sm">Awareness alarm, action at operator convenience - response within shift</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">EEMUA 191 Performance Targets</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#242424] p-3 rounded">
                    <p className="text-elec-yellow font-medium">Average Alarm Rate</p>
                    <p className="text-white text-2xl font-bold">~1 per 5 minutes</p>
                    <p className="text-gray-400 text-sm">12 alarms per hour maximum during normal operations</p>
                  </div>
                  <div className="bg-[#242424] p-3 rounded">
                    <p className="text-elec-yellow font-medium">Upset Conditions</p>
                    <p className="text-white text-2xl font-bold">Max 10 in 10 min</p>
                    <p className="text-gray-400 text-sm">Peak rate during plant upsets to prevent overload</p>
                  </div>
                  <div className="bg-[#242424] p-3 rounded">
                    <p className="text-elec-yellow font-medium">Standing Alarms</p>
                    <p className="text-white text-2xl font-bold">&lt; 5</p>
                    <p className="text-gray-400 text-sm">Alarms active for more than 24 hours should be rare</p>
                  </div>
                  <div className="bg-[#242424] p-3 rounded">
                    <p className="text-elec-yellow font-medium">Chattering Alarms</p>
                    <p className="text-white text-2xl font-bold">0</p>
                    <p className="text-gray-400 text-sm">Alarms toggling rapidly should be eliminated</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Database className="w-5 h-5 text-elec-yellow" />
                  Historian Functions
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-elec-yellow font-medium mb-2">Data Collection</p>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Time-series data storage at configurable rates</li>
                      <li>• Exception-based reporting to optimise storage</li>
                      <li>• Event and alarm logging with timestamps</li>
                      <li>• Batch and recipe data capture</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-elec-yellow font-medium mb-2">Analysis and Reporting</p>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Trend analysis and historical playback</li>
                      <li>• KPI calculation and dashboards</li>
                      <li>• Regulatory compliance reporting</li>
                      <li>• Root cause analysis support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <div className="mb-12">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 5: Communication with PLCs and RTUs */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">5</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Communication with PLCs and RTUs</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <Network className="w-8 h-8 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-elec-yellow mb-2">Industrial Communication Protocols</h3>
                <p className="text-gray-300 mb-4">
                  Reliable communication between SCADA systems and field devices is essential for effective
                  monitoring and control. Modern systems increasingly adopt OPC UA for its security features
                  and interoperability.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">OPC UA (Unified Architecture)</h4>
                <p className="text-gray-300 mb-3">
                  OPC UA is the modern standard for industrial communication, replacing legacy OPC Classic (DA, HDA, A&E).
                  It provides platform-independent, secure, and reliable data exchange.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#242424] p-3 rounded">
                    <p className="text-green-400 font-medium">Advantages</p>
                    <ul className="text-gray-400 text-sm mt-2 space-y-1">
                      <li>• Built-in security (encryption, authentication)</li>
                      <li>• Platform independent (Windows, Linux, embedded)</li>
                      <li>• Complex data structures and methods</li>
                      <li>• Information modelling capability</li>
                      <li>• Pub/Sub and client-server models</li>
                    </ul>
                  </div>
                  <div className="bg-[#242424] p-3 rounded">
                    <p className="text-blue-400 font-medium">Security Features</p>
                    <ul className="text-gray-400 text-sm mt-2 space-y-1">
                      <li>• X.509 certificate authentication</li>
                      <li>• Message signing and encryption</li>
                      <li>• User authentication and authorisation</li>
                      <li>• Audit logging of all transactions</li>
                      <li>• Secure channel establishment</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Common Industrial Protocols</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-elec-yellow border-b border-gray-600">
                        <th className="text-left py-2 pr-4">Protocol</th>
                        <th className="text-left py-2 pr-4">Application</th>
                        <th className="text-left py-2">Security Notes</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="py-2 pr-4 font-medium">Modbus TCP/RTU</td>
                        <td className="py-2 pr-4">Simple device integration, legacy systems</td>
                        <td className="py-2 text-red-400">No authentication - isolate on protected network</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 pr-4 font-medium">EtherNet/IP</td>
                        <td className="py-2 pr-4">Rockwell/Allen-Bradley ecosystems</td>
                        <td className="py-2 text-yellow-400">CIP Security available for newer devices</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 pr-4 font-medium">PROFINET</td>
                        <td className="py-2 pr-4">Siemens automation systems</td>
                        <td className="py-2 text-yellow-400">Security features in newer versions</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 pr-4 font-medium">DNP3</td>
                        <td className="py-2 pr-4">Utilities, power systems, water</td>
                        <td className="py-2 text-green-400">Secure Authentication v5 available</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-medium">IEC 61850</td>
                        <td className="py-2 pr-4">Substation automation</td>
                        <td className="py-2 text-green-400">Built-in security mechanisms</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">RTU vs PLC Selection</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#242424] p-3 rounded">
                    <p className="text-elec-yellow font-medium flex items-center gap-2">
                      <Cpu className="w-4 h-4" /> RTU Characteristics
                    </p>
                    <ul className="text-gray-400 text-sm mt-2 space-y-1">
                      <li>• Ruggedised for remote/harsh environments</li>
                      <li>• Wide-area communication (cellular, radio, satellite)</li>
                      <li>• Store-and-forward for unreliable links</li>
                      <li>• Low power options for solar/battery sites</li>
                      <li>• Ideal for water, gas, power distribution</li>
                    </ul>
                  </div>
                  <div className="bg-[#242424] p-3 rounded">
                    <p className="text-elec-yellow font-medium flex items-center gap-2">
                      <Settings className="w-4 h-4" /> PLC Characteristics
                    </p>
                    <ul className="text-gray-400 text-sm mt-2 space-y-1">
                      <li>• High-speed control and I/O processing</li>
                      <li>• Complex logic and motion control</li>
                      <li>• Tight integration with automation systems</li>
                      <li>• Extensive programming capabilities</li>
                      <li>• Ideal for manufacturing, process control</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Cybersecurity */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">6</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Cybersecurity Considerations for SCADA</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <Shield className="w-8 h-8 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-elec-yellow mb-2">UK CNI Protection and IEC 62443</h3>
                <p className="text-gray-300 mb-4">
                  SCADA systems controlling Critical National Infrastructure (CNI) in the UK must comply with
                  NIS Regulations and follow NCSC (National Cyber Security Centre) guidance. IEC 62443 provides
                  a comprehensive framework for industrial cybersecurity.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-4">
                <p className="text-red-200 flex items-start gap-2">
                  <Lock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Critical Warning:</strong> SCADA systems are high-value targets for cyber attacks.
                    The 2021 Oldsmar water treatment attack and various utility sector incidents demonstrate
                    real-world risks. Defence in depth is essential.
                  </span>
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Defence in Depth Strategy</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow text-sm font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Network Segmentation</p>
                      <p className="text-gray-400 text-sm">Separate IT and OT networks with industrial DMZ. Use firewalls with application-layer inspection for industrial protocols. No direct connectivity between corporate network and control systems.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow text-sm font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Access Control</p>
                      <p className="text-gray-400 text-sm">Implement role-based access control (RBAC). Require multi-factor authentication for remote access. Maintain audit logs of all user actions.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow text-sm font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Secure Remote Access</p>
                      <p className="text-gray-400 text-sm">VPN with strong encryption for remote connections. Jump servers for vendor access. Session recording and time-limited access.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow text-sm font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Monitoring and Detection</p>
                      <p className="text-gray-400 text-sm">Industrial intrusion detection systems (IDS). Network traffic analysis tuned for OT protocols. Security information and event management (SIEM) integration.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow text-sm font-bold">5</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Patch Management</p>
                      <p className="text-gray-400 text-sm">Coordinate patches with vendor support. Test patches in non-production environment. Schedule updates during planned outages.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">IEC 62443 Security Levels</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-4 bg-green-900/20 rounded p-3">
                    <span className="text-green-400 font-bold w-16">SL 1</span>
                    <p className="text-gray-300 text-sm">Protection against casual or coincidental violation</p>
                  </div>
                  <div className="flex items-center gap-4 bg-yellow-900/20 rounded p-3">
                    <span className="text-yellow-400 font-bold w-16">SL 2</span>
                    <p className="text-gray-300 text-sm">Protection against intentional violation using simple means</p>
                  </div>
                  <div className="flex items-center gap-4 bg-orange-900/20 rounded p-3">
                    <span className="text-orange-400 font-bold w-16">SL 3</span>
                    <p className="text-gray-300 text-sm">Protection against sophisticated attacks with moderate resources</p>
                  </div>
                  <div className="flex items-center gap-4 bg-red-900/20 rounded p-3">
                    <span className="text-red-400 font-bold w-16">SL 4</span>
                    <p className="text-gray-300 text-sm">Protection against state-sponsored attacks with extensive resources</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">UK Regulatory Requirements</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#242424] p-3 rounded">
                    <p className="text-elec-yellow font-medium">NIS Regulations 2018</p>
                    <p className="text-gray-400 text-sm mt-1">Operators of Essential Services (OES) must implement appropriate security measures and report significant incidents</p>
                  </div>
                  <div className="bg-[#242424] p-3 rounded">
                    <p className="text-elec-yellow font-medium">NCSC CAF</p>
                    <p className="text-gray-400 text-sm mt-1">Cyber Assessment Framework provides guidance for CNI operators on achieving appropriate security outcomes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <div className="mb-12">
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </div>

        {/* Quick Reference Card */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-lg p-6 border border-elec-yellow/30">
            <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
              <Monitor className="w-6 h-6" />
              Quick Reference: SCADA and HMI Essentials
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-2">SCADA Architecture</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Level 0: Field devices and sensors</li>
                  <li>• Level 1: PLCs and RTUs (control layer)</li>
                  <li>• Level 2: SCADA servers and HMI</li>
                  <li>• Level 3: Historians and MES</li>
                  <li>• Level 4: Enterprise/IT (via DMZ)</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">ISA-101 HMI Principles</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Grey backgrounds for normal operation</li>
                  <li>• Colour reserved for abnormal conditions</li>
                  <li>• No 3D effects or visual clutter</li>
                  <li>• Hierarchical display structure</li>
                  <li>• Contextual information with values</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">EEMUA 191 Alarm Targets</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Normal: ~1 alarm per 5 minutes</li>
                  <li>• Upset: Max 10 alarms in 10 minutes</li>
                  <li>• Standing alarms: Less than 5</li>
                  <li>• Chattering alarms: Zero</li>
                  <li>• Each alarm must be actionable</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Cybersecurity Essentials</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Network segmentation with DMZ</li>
                  <li>• OPC UA for secure communication</li>
                  <li>• Multi-factor authentication</li>
                  <li>• Regular patching strategy</li>
                  <li>• IEC 62443 compliance framework</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-elec-yellow/30">
              <h4 className="text-white font-semibold mb-2">Key Standards</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#1a1a1a] text-elec-yellow px-3 py-1 rounded text-sm">ISA-101 (HMI Design)</span>
                <span className="bg-[#1a1a1a] text-elec-yellow px-3 py-1 rounded text-sm">ISA-18.2 (Alarm Management)</span>
                <span className="bg-[#1a1a1a] text-elec-yellow px-3 py-1 rounded text-sm">EEMUA 191</span>
                <span className="bg-[#1a1a1a] text-elec-yellow px-3 py-1 rounded text-sm">IEC 62443</span>
                <span className="bg-[#1a1a1a] text-elec-yellow px-3 py-1 rounded text-sm">OPC UA</span>
                <span className="bg-[#1a1a1a] text-elec-yellow px-3 py-1 rounded text-sm">NIS Regulations</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Test Your Knowledge</h3>
          <Quiz questions={quizQuestions} />
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#242424] rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4">
          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-4/section-4')}
            variant="outline"
            className="flex items-center justify-center gap-2 min-h-[44px] touch-manipulation bg-transparent border-gray-600 text-white hover:bg-gray-800"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous: Section 4</span>
          </Button>

          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-4/section-6')}
            className="flex items-center justify-center gap-2 min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            <span>Next: Section 6</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule4Section5;
