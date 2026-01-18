import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Quiz from '@/components/apprentice-courses/Quiz';
import InlineCheck from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import {
  ArrowLeft,
  ArrowRight,
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
  Bell,
  BookOpen
} from 'lucide-react';

const IndustrialElectricalModule4Section5: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);

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
    canonicalUrl: '/study-centre/upskilling/industrial-electrical/module-4/section-5'
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

  const faqItems = [
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
      answer: 'For new installations, OPC UA (Unified Architecture) is the recommended standard offering built-in security (encryption, authentication), platform independence, and complex data structures. For legacy systems, Modbus TCP/IP remains widely supported and simple to implement. PROFINET is common in Siemens environments. DNP3 (Distributed Network Protocol) is standard for utilities and power systems. EtherNet/IP is prevalent in Rockwell/Allen-Bradley installations. Consider protocol converters or gateways when integrating mixed vendor environments. Always evaluate security implications - older protocols like Modbus lack authentication and should be isolated on protected networks.'
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
      answer: 'Key selection criteria include: Display size appropriate for viewing distance and information density (typically 15-24 inches for operator stations); Resolution sufficient for text clarity and graphics detail; Touch technology - resistive for gloved operation, projective capacitive for multi-touch; Environmental ratings (IP65+ for washdown, ATEX for hazardous areas); Operating temperature range for the installation environment; Processing power for graphics rendering and data handling; Communication ports (Ethernet, serial) matching system requirements; Mounting options (panel, arm, VESA); Sunlight readability if exposed to natural light; Vendor support and spare parts availability; Compliance with relevant standards (UL, CE, UKCA). Consider total cost of ownership including maintenance and lifecycle support.'
    }
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="/electrician/upskilling/industrial-electrical-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">Module 4 &gt; Section 5</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Page Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10">
            <Monitor className="w-8 h-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            SCADA and HMI Introduction
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master Supervisory Control and Data Acquisition systems and Human Machine Interface design
            principles following ISA-101 standards for high-performance operator displays.
          </p>
        </div>

        {/* Section Overview */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <h2 className="font-semibold text-foreground mb-2">Section Overview</h2>
          <p className="text-sm text-muted-foreground">
            This section covers SCADA system architecture from field devices to enterprise integration,
            HMI hardware selection and ISA-101 high-performance design principles, alarm management
            following EEMUA 191 guidelines, communication protocols including OPC UA, and cybersecurity
            requirements for UK Critical National Infrastructure.
          </p>
        </div>

        {/* Section 1: SCADA System Architecture */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            SCADA System Architecture and Components
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <div className="flex items-start gap-4">
              <Server className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Understanding SCADA Architecture</h3>
                <p className="text-sm text-muted-foreground">
                  SCADA (Supervisory Control and Data Acquisition) systems provide centralised monitoring and
                  control of industrial processes, often spanning large geographical areas. Modern SCADA
                  architecture consists of multiple interconnected layers working together.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card/50 border border-white/10 rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-elec-yellow" />
              SCADA Architecture Layers
            </h3>
            <div className="space-y-3">
              <div className="border-l-2 border-elec-yellow/50 pl-4">
                <p className="text-elec-yellow font-medium">Level 0 - Field Devices</p>
                <p className="text-sm text-muted-foreground">Sensors, transmitters, actuators, and final control elements that interface directly with the physical process</p>
              </div>
              <div className="border-l-2 border-blue-500/50 pl-4">
                <p className="text-blue-400 font-medium">Level 1 - Control Layer</p>
                <p className="text-sm text-muted-foreground">PLCs (Programmable Logic Controllers) and RTUs (Remote Terminal Units) executing control logic and data acquisition</p>
              </div>
              <div className="border-l-2 border-green-500/50 pl-4">
                <p className="text-green-400 font-medium">Level 2 - Supervisory Layer</p>
                <p className="text-sm text-muted-foreground">SCADA servers, HMI stations, and engineering workstations for monitoring and supervisory control</p>
              </div>
              <div className="border-l-2 border-purple-500/50 pl-4">
                <p className="text-purple-400 font-medium">Level 3 - Operations Management</p>
                <p className="text-sm text-muted-foreground">Historians, reporting systems, and manufacturing execution systems (MES)</p>
              </div>
              <div className="border-l-2 border-orange-500/50 pl-4">
                <p className="text-orange-400 font-medium">Level 4 - Enterprise</p>
                <p className="text-sm text-muted-foreground">Business systems, ERP integration, and corporate IT networks (separated by DMZ)</p>
              </div>
            </div>
          </div>

          <div className="bg-card/50 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">Key SCADA Components</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
                <p className="text-elec-yellow font-medium text-sm">SCADA Server</p>
                <p className="text-xs text-muted-foreground mt-1">Central system running SCADA software, managing communications, data processing, and alarm handling</p>
              </div>
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
                <p className="text-elec-yellow font-medium text-sm">RTU (Remote Terminal Unit)</p>
                <p className="text-xs text-muted-foreground mt-1">Ruggedised device for remote sites, collecting data and providing local control with store-and-forward capability</p>
              </div>
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
                <p className="text-elec-yellow font-medium text-sm">Communication Network</p>
                <p className="text-xs text-muted-foreground mt-1">Industrial Ethernet, serial links, cellular, radio, or satellite for connecting distributed sites</p>
              </div>
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
                <p className="text-elec-yellow font-medium text-sm">Historian Database</p>
                <p className="text-xs text-muted-foreground mt-1">Time-series database optimised for storing and retrieving large volumes of process data</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: HMI Hardware Selection */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            HMI Hardware Selection
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <div className="flex items-start gap-4">
              <Monitor className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Panel PCs and Touch Screens</h3>
                <p className="text-sm text-muted-foreground">
                  Selecting appropriate HMI hardware is critical for operator effectiveness and system reliability.
                  Consider the operating environment, user requirements, and long-term supportability.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card/50 border border-white/10 rounded-lg p-4 overflow-x-auto">
            <h3 className="font-semibold text-foreground mb-3">Display Technologies</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-elec-yellow border-b border-white/10">
                  <th className="text-left py-2 pr-4">Type</th>
                  <th className="text-left py-2 pr-4">Advantages</th>
                  <th className="text-left py-2">Considerations</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4 font-medium text-foreground">Resistive Touch</td>
                  <td className="py-2 pr-4">Works with gloves, stylus, lower cost</td>
                  <td className="py-2">Less durable, reduced clarity</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4 font-medium text-foreground">Capacitive Touch</td>
                  <td className="py-2 pr-4">Multi-touch, excellent clarity, durable</td>
                  <td className="py-2">Requires conductive gloves or bare fingers</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4 font-medium text-foreground">Panel PC</td>
                  <td className="py-2 pr-4">Full Windows/Linux capability, flexible</td>
                  <td className="py-2">Higher cost, more complex maintenance</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium text-foreground">Dedicated HMI</td>
                  <td className="py-2 pr-4">Purpose-built, reliable, long lifecycle</td>
                  <td className="py-2">Vendor lock-in, limited flexibility</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-card/50 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">Environmental Ratings</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
                <p className="text-elec-yellow font-medium text-sm">IP65 - Dust-tight, Water Jets</p>
                <p className="text-xs text-muted-foreground mt-1">Required for washdown areas, food processing, outdoor kiosks</p>
              </div>
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
                <p className="text-elec-yellow font-medium text-sm">IP67 - Temporary Immersion</p>
                <p className="text-xs text-muted-foreground mt-1">For harsh washdown or potential flooding environments</p>
              </div>
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
                <p className="text-elec-yellow font-medium text-sm">ATEX/IECEx Certified</p>
                <p className="text-xs text-muted-foreground mt-1">Mandatory for Zone 1/2 or Zone 21/22 hazardous areas</p>
              </div>
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
                <p className="text-elec-yellow font-medium text-sm">Extended Temperature</p>
                <p className="text-xs text-muted-foreground mt-1">-20C to +60C for outdoor or non-climate-controlled areas</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <p className="text-sm text-orange-300 flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Selection Tip:</strong> Always verify the HMI hardware lifecycle support period.
                Industrial equipment often operates for 15-20 years, so ensure spare parts and support
                will be available throughout the expected system lifetime.
              </span>
            </p>
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

        {/* Section 3: HMI Software and Screen Design */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            HMI Software and Screen Design Principles
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <div className="flex items-start gap-4">
              <Eye className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">ISA-101 High-Performance HMI Design</h3>
                <p className="text-sm text-muted-foreground">
                  ISA-101 (Human Machine Interfaces for Process Automation Systems) provides guidelines for
                  creating effective operator displays that improve situational awareness and reduce human error.
                  High-performance HMI design focuses on clarity, consistency, and actionable information.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card/50 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">ISA-101 Key Principles</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-elec-yellow font-medium">1</span>
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">Grey Background, Colour for Abnormal</p>
                  <p className="text-xs text-muted-foreground">Use muted grey tones for normal operation; reserve colour to highlight deviations requiring attention</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-elec-yellow font-medium">2</span>
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">Eliminate Visual Clutter</p>
                  <p className="text-xs text-muted-foreground">Remove 3D effects, gradients, shadows, and decorative elements that distract from process information</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-elec-yellow font-medium">3</span>
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">Contextual Information</p>
                  <p className="text-xs text-muted-foreground">Show operating limits, setpoints, and trends alongside current values to provide context</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-elec-yellow font-medium">4</span>
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">Hierarchical Navigation</p>
                  <p className="text-xs text-muted-foreground">Structure displays in logical levels: Overview - Area - Unit - Detail with consistent navigation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-elec-yellow font-medium">5</span>
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">Analog Representation</p>
                  <p className="text-xs text-muted-foreground">Use bar graphs and analog indicators that allow rapid visual assessment of process variables</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card/50 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">Colour Standards for Process Displays</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="text-center">
                <div className="w-full h-12 bg-gray-500 rounded mb-2"></div>
                <p className="text-xs text-muted-foreground">Normal Operation</p>
              </div>
              <div className="text-center">
                <div className="w-full h-12 bg-yellow-500 rounded mb-2"></div>
                <p className="text-xs text-muted-foreground">Warning/Advisory</p>
              </div>
              <div className="text-center">
                <div className="w-full h-12 bg-orange-500 rounded mb-2"></div>
                <p className="text-xs text-muted-foreground">High Priority</p>
              </div>
              <div className="text-center">
                <div className="w-full h-12 bg-red-600 rounded mb-2"></div>
                <p className="text-xs text-muted-foreground">Critical/Emergency</p>
              </div>
            </div>
          </div>

          <div className="bg-card/50 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">Display Hierarchy Structure</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-elec-yellow font-mono text-sm w-16">Level 1</span>
                <div className="flex-1 bg-elec-yellow/10 rounded px-3 py-2">
                  <span className="text-sm text-foreground">Plant Overview - KPIs, overall status, major alarms</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-elec-yellow font-mono text-sm w-16">Level 2</span>
                <div className="flex-1 bg-blue-500/10 rounded px-3 py-2">
                  <span className="text-sm text-foreground">Area Overview - Process areas, unit status summaries</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-elec-yellow font-mono text-sm w-16">Level 3</span>
                <div className="flex-1 bg-green-500/10 rounded px-3 py-2">
                  <span className="text-sm text-foreground">Unit Control - Process flow diagrams, control loops</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-elec-yellow font-mono text-sm w-16">Level 4</span>
                <div className="flex-1 bg-purple-500/10 rounded px-3 py-2">
                  <span className="text-sm text-foreground">Detail/Diagnostic - Individual equipment, trends, configuration</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Alarm Management */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Alarm Management and Historian Functions
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <div className="flex items-start gap-4">
              <Bell className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Alarm Rationalisation and EEMUA 191</h3>
                <p className="text-sm text-muted-foreground">
                  Effective alarm management is critical for operator safety and process efficiency.
                  EEMUA Publication 191 and ISA-18.2 provide industry standards for alarm system design,
                  implementation, and ongoing management.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card/50 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">Alarm Priority Levels (ISA-18.2)</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-4 bg-red-500/10 border-l-2 border-red-500 rounded-r-lg p-3">
                <span className="text-red-400 font-bold w-20 text-sm">Critical</span>
                <p className="text-xs text-muted-foreground">Immediate action required to prevent loss of life or major equipment damage - response within seconds</p>
              </div>
              <div className="flex items-center gap-4 bg-orange-500/10 border-l-2 border-orange-500 rounded-r-lg p-3">
                <span className="text-orange-400 font-bold w-20 text-sm">High</span>
                <p className="text-xs text-muted-foreground">Prompt action required to prevent serious impact - response within minutes</p>
              </div>
              <div className="flex items-center gap-4 bg-yellow-500/10 border-l-2 border-yellow-500 rounded-r-lg p-3">
                <span className="text-yellow-400 font-bold w-20 text-sm">Medium</span>
                <p className="text-xs text-muted-foreground">Action required to prevent equipment damage or production loss - response within 30 minutes</p>
              </div>
              <div className="flex items-center gap-4 bg-blue-500/10 border-l-2 border-blue-500 rounded-r-lg p-3">
                <span className="text-blue-400 font-bold w-20 text-sm">Low</span>
                <p className="text-xs text-muted-foreground">Awareness alarm, action at operator convenience - response within shift</p>
              </div>
            </div>
          </div>

          <div className="bg-card/50 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">EEMUA 191 Performance Targets</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
                <p className="text-elec-yellow font-medium text-sm">Average Alarm Rate</p>
                <p className="text-xl font-bold text-foreground">~1 per 5 minutes</p>
                <p className="text-xs text-muted-foreground">12 alarms per hour maximum during normal operations</p>
              </div>
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
                <p className="text-elec-yellow font-medium text-sm">Upset Conditions</p>
                <p className="text-xl font-bold text-foreground">Max 10 in 10 min</p>
                <p className="text-xs text-muted-foreground">Peak rate during plant upsets to prevent overload</p>
              </div>
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
                <p className="text-elec-yellow font-medium text-sm">Standing Alarms</p>
                <p className="text-xl font-bold text-foreground">&lt; 5</p>
                <p className="text-xs text-muted-foreground">Alarms active for more than 24 hours should be rare</p>
              </div>
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
                <p className="text-elec-yellow font-medium text-sm">Chattering Alarms</p>
                <p className="text-xl font-bold text-foreground">0</p>
                <p className="text-xs text-muted-foreground">Alarms toggling rapidly should be eliminated</p>
              </div>
            </div>
          </div>

          <div className="bg-card/50 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Database className="w-5 h-5 text-elec-yellow" />
              Historian Functions
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-elec-yellow font-medium text-sm mb-2">Data Collection</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>- Time-series data storage at configurable rates</li>
                  <li>- Exception-based reporting to optimise storage</li>
                  <li>- Event and alarm logging with timestamps</li>
                  <li>- Batch and recipe data capture</li>
                </ul>
              </div>
              <div>
                <p className="text-elec-yellow font-medium text-sm mb-2">Analysis and Reporting</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>- Trend analysis and historical playback</li>
                  <li>- KPI calculation and dashboards</li>
                  <li>- Regulatory compliance reporting</li>
                  <li>- Root cause analysis support</li>
                </ul>
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

        {/* Section 5: Communication Protocols */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Communication with PLCs and RTUs
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <div className="flex items-start gap-4">
              <Network className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Industrial Communication Protocols</h3>
                <p className="text-sm text-muted-foreground">
                  Reliable communication between SCADA systems and field devices is essential for effective
                  monitoring and control. Modern systems increasingly adopt OPC UA for its security features
                  and interoperability.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card/50 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">OPC UA (Unified Architecture)</h3>
            <p className="text-sm text-muted-foreground mb-3">
              OPC UA is the modern standard for industrial communication, replacing legacy OPC Classic (DA, HDA, A&E).
              It provides platform-independent, secure, and reliable data exchange.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border-l-2 border-green-500 rounded-r-lg p-3">
                <p className="text-green-400 font-medium text-sm">Advantages</p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>- Built-in security (encryption, authentication)</li>
                  <li>- Platform independent (Windows, Linux, embedded)</li>
                  <li>- Complex data structures and methods</li>
                  <li>- Information modelling capability</li>
                  <li>- Pub/Sub and client-server models</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border-l-2 border-blue-500 rounded-r-lg p-3">
                <p className="text-blue-400 font-medium text-sm">Security Features</p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>- X.509 certificate authentication</li>
                  <li>- Message signing and encryption</li>
                  <li>- User authentication and authorisation</li>
                  <li>- Audit logging of all transactions</li>
                  <li>- Secure channel establishment</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-card/50 border border-white/10 rounded-lg p-4 overflow-x-auto">
            <h3 className="font-semibold text-foreground mb-3">Common Industrial Protocols</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-elec-yellow border-b border-white/10">
                  <th className="text-left py-2 pr-4">Protocol</th>
                  <th className="text-left py-2 pr-4">Application</th>
                  <th className="text-left py-2">Security Notes</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4 font-medium text-foreground">Modbus TCP/RTU</td>
                  <td className="py-2 pr-4">Simple device integration, legacy systems</td>
                  <td className="py-2 text-red-400">No authentication - isolate on protected network</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4 font-medium text-foreground">EtherNet/IP</td>
                  <td className="py-2 pr-4">Rockwell/Allen-Bradley ecosystems</td>
                  <td className="py-2 text-yellow-400">CIP Security available for newer devices</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4 font-medium text-foreground">PROFINET</td>
                  <td className="py-2 pr-4">Siemens automation systems</td>
                  <td className="py-2 text-yellow-400">Security features in newer versions</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-4 font-medium text-foreground">DNP3</td>
                  <td className="py-2 pr-4">Utilities, power systems, water</td>
                  <td className="py-2 text-green-400">Secure Authentication v5 available</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium text-foreground">IEC 61850</td>
                  <td className="py-2 pr-4">Substation automation</td>
                  <td className="py-2 text-green-400">Built-in security mechanisms</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-card/50 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">RTU vs PLC Selection</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
                <p className="text-elec-yellow font-medium text-sm flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> RTU Characteristics
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>- Ruggedised for remote/harsh environments</li>
                  <li>- Wide-area communication (cellular, radio, satellite)</li>
                  <li>- Store-and-forward for unreliable links</li>
                  <li>- Low power options for solar/battery sites</li>
                  <li>- Ideal for water, gas, power distribution</li>
                </ul>
              </div>
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
                <p className="text-elec-yellow font-medium text-sm flex items-center gap-2">
                  <Settings className="w-4 h-4" /> PLC Characteristics
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>- High-speed control and I/O processing</li>
                  <li>- Complex logic and motion control</li>
                  <li>- Tight integration with automation systems</li>
                  <li>- Extensive programming capabilities</li>
                  <li>- Ideal for manufacturing, process control</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Cybersecurity */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Cybersecurity Considerations for SCADA
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">UK CNI Protection and IEC 62443</h3>
                <p className="text-sm text-muted-foreground">
                  SCADA systems controlling Critical National Infrastructure (CNI) in the UK must comply with
                  NIS Regulations and follow NCSC (National Cyber Security Centre) guidance. IEC 62443 provides
                  a comprehensive framework for industrial cybersecurity.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-sm text-red-300 flex items-start gap-2">
              <Lock className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Critical Warning:</strong> SCADA systems are high-value targets for cyber attacks.
                The 2021 Oldsmar water treatment attack and various utility sector incidents demonstrate
                real-world risks. Defence in depth is essential.
              </span>
            </p>
          </div>

          <div className="bg-card/50 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">Defence in Depth Strategy</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-elec-yellow text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">Network Segmentation</p>
                  <p className="text-xs text-muted-foreground">Separate IT and OT networks with industrial DMZ. Use firewalls with application-layer inspection for industrial protocols. No direct connectivity between corporate network and control systems.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-elec-yellow text-sm font-bold">2</span>
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">Access Control</p>
                  <p className="text-xs text-muted-foreground">Implement role-based access control (RBAC). Require multi-factor authentication for remote access. Maintain audit logs of all user actions.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-elec-yellow text-sm font-bold">3</span>
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">Secure Remote Access</p>
                  <p className="text-xs text-muted-foreground">VPN with strong encryption for remote connections. Jump servers for vendor access. Session recording and time-limited access.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-elec-yellow text-sm font-bold">4</span>
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">Monitoring and Detection</p>
                  <p className="text-xs text-muted-foreground">Industrial intrusion detection systems (IDS). Network traffic analysis tuned for OT protocols. Security information and event management (SIEM) integration.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-elec-yellow text-sm font-bold">5</span>
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">Patch Management</p>
                  <p className="text-xs text-muted-foreground">Coordinate patches with vendor support. Test patches in non-production environment. Schedule updates during planned outages.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card/50 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">IEC 62443 Security Levels</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-4 bg-green-500/10 border-l-2 border-green-500 rounded-r-lg p-3">
                <span className="text-green-400 font-bold w-12 text-sm">SL 1</span>
                <p className="text-xs text-muted-foreground">Protection against casual or coincidental violation</p>
              </div>
              <div className="flex items-center gap-4 bg-yellow-500/10 border-l-2 border-yellow-500 rounded-r-lg p-3">
                <span className="text-yellow-400 font-bold w-12 text-sm">SL 2</span>
                <p className="text-xs text-muted-foreground">Protection against intentional violation using simple means</p>
              </div>
              <div className="flex items-center gap-4 bg-orange-500/10 border-l-2 border-orange-500 rounded-r-lg p-3">
                <span className="text-orange-400 font-bold w-12 text-sm">SL 3</span>
                <p className="text-xs text-muted-foreground">Protection against sophisticated attacks with moderate resources</p>
              </div>
              <div className="flex items-center gap-4 bg-red-500/10 border-l-2 border-red-500 rounded-r-lg p-3">
                <span className="text-red-400 font-bold w-12 text-sm">SL 4</span>
                <p className="text-xs text-muted-foreground">Protection against state-sponsored attacks with extensive resources</p>
              </div>
            </div>
          </div>

          <div className="bg-card/50 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">UK Regulatory Requirements</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
                <p className="text-elec-yellow font-medium text-sm">NIS Regulations 2018</p>
                <p className="text-xs text-muted-foreground mt-1">Operators of Essential Services (OES) must implement appropriate security measures and report significant incidents</p>
              </div>
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
                <p className="text-elec-yellow font-medium text-sm">NCSC CAF</p>
                <p className="text-xs text-muted-foreground mt-1">Cyber Assessment Framework provides guidance for CNI operators on achieving appropriate security outcomes</p>
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
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-elec-yellow" />
            Quick Reference: SCADA and HMI Essentials
          </h2>

          <div className="bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 rounded-lg p-5 border border-elec-yellow/30">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">SCADA Architecture</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- Level 0: Field devices and sensors</li>
                  <li>- Level 1: PLCs and RTUs (control layer)</li>
                  <li>- Level 2: SCADA servers and HMI</li>
                  <li>- Level 3: Historians and MES</li>
                  <li>- Level 4: Enterprise/IT (via DMZ)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">ISA-101 HMI Principles</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- Grey backgrounds for normal operation</li>
                  <li>- Colour reserved for abnormal conditions</li>
                  <li>- No 3D effects or visual clutter</li>
                  <li>- Hierarchical display structure</li>
                  <li>- Contextual information with values</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">EEMUA 191 Alarm Targets</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- Normal: ~1 alarm per 5 minutes</li>
                  <li>- Upset: Max 10 alarms in 10 minutes</li>
                  <li>- Standing alarms: Less than 5</li>
                  <li>- Chattering alarms: Zero</li>
                  <li>- Each alarm must be actionable</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Cybersecurity Essentials</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- Network segmentation with DMZ</li>
                  <li>- OPC UA for secure communication</li>
                  <li>- Multi-factor authentication</li>
                  <li>- Regular patching strategy</li>
                  <li>- IEC 62443 compliance framework</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-elec-yellow/30">
              <h4 className="font-semibold text-foreground mb-2">Key Standards</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-background text-elec-yellow px-3 py-1 rounded text-sm">ISA-101 (HMI Design)</span>
                <span className="bg-background text-elec-yellow px-3 py-1 rounded text-sm">ISA-18.2 (Alarm Management)</span>
                <span className="bg-background text-elec-yellow px-3 py-1 rounded text-sm">EEMUA 191</span>
                <span className="bg-background text-elec-yellow px-3 py-1 rounded text-sm">IEC 62443</span>
                <span className="bg-background text-elec-yellow px-3 py-1 rounded text-sm">OPC UA</span>
                <span className="bg-background text-elec-yellow px-3 py-1 rounded text-sm">NIS Regulations</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Test Your Knowledge</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowQuiz(!showQuiz)}
              className="min-h-[44px] touch-manipulation border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              {showQuiz ? 'Hide Quiz' : 'Show Quiz'}
            </Button>
          </div>
          {showQuiz && <Quiz questions={quizQuestions} />}
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Button variant="outline" className="min-h-[44px] touch-manipulation border-white/20" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-4/section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 4 - Protocols
            </Link>
          </Button>
          <Button className="min-h-[44px] touch-manipulation bg-elec-yellow text-background hover:bg-elec-yellow/90" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-4/section-6">
              Next: Section 6 - Safety PLC
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default IndustrialElectricalModule4Section5;
