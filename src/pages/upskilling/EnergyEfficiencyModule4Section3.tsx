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
  Timer,
  Building2,
  Network,
  Thermometer,
  Gauge,
  Sun,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Zap,
  Clock,
  Cpu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnergyEfficiencyModule4Section3: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useSEO({
    title: 'Energy-Efficient Controls: Timers & BMS | Module 4 Section 3',
    description: 'Learn about time switches, Building Management Systems, BACnet/Modbus protocols, weather compensation, demand limiting, and renewable energy integration for UK buildings.',
    keywords: [
      'BMS',
      'Building Management Systems',
      'time switches',
      'optimum start',
      'BACnet',
      'Modbus',
      'LON protocol',
      'weather compensation',
      'demand limiting',
      'Part L controls',
      'energy efficiency',
      'building controls'
    ],
    canonicalUrl: '/upskilling/energy-efficiency/module-4/section-3'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1',
      question: 'What is the typical energy saving potential when installing a properly configured BMS in a commercial building?',
      options: ['5-10%', '15-30%', '40-50%', '60-70%'],
      correctIndex: 1,
      explanation: 'A properly configured Building Management System typically achieves 15-30% energy savings through optimised scheduling, setback control, and integrated systems management. This is well documented in CIBSE guidance and real-world case studies across UK commercial buildings.'
    },
    {
      id: 'qc2',
      question: 'Which protocol is most commonly used for integrating diverse building systems from different manufacturers in the UK?',
      options: ['LON (LonWorks)', 'KNX', 'BACnet', 'Modbus RTU'],
      correctIndex: 2,
      explanation: 'BACnet (Building Automation and Control Networks) is the most widely adopted open protocol in the UK for integrating multi-vendor building systems. Its object-oriented architecture and ASHRAE standardisation make it ideal for complex installations requiring interoperability.'
    },
    {
      id: 'qc3',
      question: 'What does an optimum start controller calculate to determine when heating should begin?',
      options: [
        'Only the outdoor temperature',
        'The time needed to reach setpoint based on thermal conditions',
        'The electricity tariff rates',
        'The number of occupants expected'
      ],
      correctIndex: 1,
      explanation: 'Optimum start controllers use adaptive algorithms to calculate the minimum pre-heat time required based on indoor temperature, outdoor temperature, and building thermal characteristics. This prevents unnecessary early starts while ensuring comfort conditions are met at occupancy time.'
    }
  ];

  const quizQuestions = [
    {
      question: 'Under Building Regulations Part L, what is the minimum requirement for heating system controls in new non-domestic buildings?',
      options: [
        'Simple on/off time switch only',
        'Time and temperature control with zone capability',
        'Manual control by building users',
        'Thermostat only without timing'
      ],
      correctAnswer: 'Time and temperature control with zone capability'
    },
    {
      question: 'What is the primary advantage of weather compensation control over fixed flow temperature systems?',
      options: [
        'Lower installation cost',
        'Simpler programming requirements',
        'Reduced energy consumption by matching output to demand',
        'Faster response to setpoint changes'
      ],
      correctAnswer: 'Reduced energy consumption by matching output to demand'
    },
    {
      question: 'In BMS terminology, what is a "setback" strategy?',
      options: [
        'Returning the system to factory defaults',
        'Reducing temperature setpoints during unoccupied periods',
        'Installing backup control systems',
        'Reverting to manual override mode'
      ],
      correctAnswer: 'Reducing temperature setpoints during unoccupied periods'
    },
    {
      question: 'Which communication topology does Modbus RTU typically use?',
      options: [
        'Star topology with central hub',
        'Ring topology with token passing',
        'Multi-drop RS-485 serial bus',
        'Mesh wireless network'
      ],
      correctAnswer: 'Multi-drop RS-485 serial bus'
    },
    {
      question: 'What is demand limiting in the context of building energy management?',
      options: [
        'Restricting the number of building users',
        'Automatically shedding loads to stay within maximum demand targets',
        'Limiting the size of new equipment installations',
        'Reducing the operating hours of the building'
      ],
      correctAnswer: 'Automatically shedding loads to stay within maximum demand targets'
    },
    {
      question: 'How does load cycling differ from load shedding?',
      options: [
        'Load cycling is permanent, shedding is temporary',
        'Load cycling rotates equipment operation, shedding removes loads entirely',
        'They are identical strategies with different names',
        'Load cycling only applies to lighting systems'
      ],
      correctAnswer: 'Load cycling rotates equipment operation, shedding removes loads entirely'
    },
    {
      question: 'What is the typical scan rate for a BMS monitoring critical HVAC parameters?',
      options: [
        'Once per hour',
        'Every 15-30 seconds',
        'Once per day',
        'Continuous real-time (sub-second)'
      ],
      correctAnswer: 'Every 15-30 seconds'
    },
    {
      question: 'When integrating solar PV with a BMS, what control strategy maximises self-consumption?',
      options: [
        'Export all generation to the grid',
        'Shift flexible loads to periods of high generation',
        'Disconnect the PV system during peak demand',
        'Run heating systems at night only'
      ],
      correctAnswer: 'Shift flexible loads to periods of high generation'
    },
    {
      question: 'What does BACnet MSTP stand for?',
      options: [
        'Master Slave Token Passing',
        'Multiple System Transfer Protocol',
        'Managed Service Transmission Point',
        'Main Server Terminal Port'
      ],
      correctAnswer: 'Master Slave Token Passing'
    },
    {
      question: 'According to CIBSE guidance, what is the recommended night setback temperature for commercial office heating?',
      options: [
        '5°C (frost protection only)',
        '10-12°C',
        '16-18°C',
        'Full heating maintained 24/7'
      ],
      correctAnswer: '10-12°C'
    }
  ];

  const faqs = [
    {
      question: 'What qualifications do I need to program and commission BMS systems in the UK?',
      answer: 'While there is no single mandatory qualification, most BMS commissioning engineers hold relevant electrical qualifications (such as Level 3 Electrical Installation) plus manufacturer-specific training certifications. BSRIA and CIBSE offer recognised BMS training courses. Many employers also require experience with specific protocols (BACnet, Modbus) and familiarity with building regulations Part L. The ECA and other trade bodies provide CPD programmes covering controls and energy management.'
    },
    {
      question: 'How do I determine the payback period for upgrading from time switches to a full BMS?',
      answer: 'Calculate the payback by comparing current energy costs against projected savings (typically 15-30% for well-implemented systems). Factor in: equipment and installation costs, commissioning and training, annual maintenance contracts, and any available grants or Enhanced Capital Allowances. For a medium commercial building, payback periods of 3-7 years are typical. Use half-hourly meter data or sub-metering to establish accurate baselines before upgrade, and consider using the Carbon Trust\'s building energy benchmarking tools.'
    },
    {
      question: 'Can existing older controls be integrated with modern BMS platforms?',
      answer: 'Yes, through several approaches: protocol converters/gateways can translate between legacy protocols (like older Modbus variants) and modern BACnet/IP systems. Many BMS manufacturers offer interface modules for common legacy equipment. For very old pneumatic or simple electrical controls, replacement with modern actuators and sensors connected to the new BMS is often more cost-effective than conversion. Always conduct a controls audit to identify what can be retained versus what needs replacement.'
    },
    {
      question: 'What are the Part L requirements for replacement boiler controls?',
      answer: 'When replacing boilers in existing buildings, Part L requires installation of appropriate controls including: time control, zone control where practical, weather compensation or load compensation for systems over 45kW, optimum start/stop control, and boiler sequence control for multi-boiler installations. The Non-Domestic Building Services Compliance Guide provides detailed minimum standards. Controls must be commissioned and a commissioning certificate provided to Building Control.'
    },
    {
      question: 'How often should BMS control strategies be reviewed and optimised?',
      answer: 'Best practice recommends: monthly review of energy consumption trends and alarm logs, quarterly review of schedules against actual occupancy, annual comprehensive review of all setpoints and control parameters, and immediate review after any building use changes. Many BMS platforms now include analytics that flag when performance deviates from expected patterns. CIBSE TM63 provides guidance on operational performance benchmarking. Budget approximately 2-4 days per year for optimisation on medium-sized commercial buildings.'
    },
    {
      question: 'What cybersecurity considerations apply to networked BMS installations?',
      answer: 'Modern IP-connected BMS systems require robust cybersecurity: segregate BMS networks from corporate IT networks using VLANs and firewalls, implement strong authentication (avoid default passwords), regularly update firmware and software, use encrypted connections for remote access, maintain access logs and review regularly, and conduct penetration testing. The NCSC (National Cyber Security Centre) provides guidance for operational technology security. BS EN ISO 27001 and IEC 62443 provide relevant standards frameworks.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a]/95 border-b border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-elec-yellow/20 rounded-lg">
              <Cpu className="w-8 h-8 text-elec-yellow" />
            </div>
            <div>
              <p className="text-elec-yellow text-sm font-medium">Module 4 - Section 3</p>
              <h1 className="text-3xl font-bold">Energy-Efficient Controls</h1>
              <p className="text-gray-400">Timers, BMS & Intelligent Building Systems</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Introduction */}
        <div className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <p className="text-gray-300 leading-relaxed">
            Effective building controls are essential for achieving energy efficiency targets and
            compliance with Part L of the Building Regulations. From simple time switches to
            sophisticated Building Management Systems, the right control strategy can deliver
            <span className="text-elec-yellow font-semibold"> 15-30% energy savings</span> in
            commercial buildings. This section covers the UK-specific requirements and best
            practices for implementing energy-efficient controls.
          </p>
        </div>

        {/* Section 1: Time Switches and Optimised Start/Stop */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-elec-yellow/20 rounded-lg">
              <span className="text-elec-yellow font-bold">1</span>
            </div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Timer className="w-6 h-6 text-elec-yellow" />
              Time Switch and Optimised Start/Stop Controls
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Time-based controls form the foundation of energy-efficient building operation in the UK.
              Part L requires heating systems to have appropriate time control, with more sophisticated
              requirements for larger installations.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Types of Time Control
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Simple Time Switches:</strong> Basic 7-day programmable timers for on/off control. Suitable for small installations with predictable occupancy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Optimised Start Controllers:</strong> Adaptive algorithms that calculate the minimum pre-heat time required to reach setpoint at occupancy time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Optimised Stop:</strong> Allows heating to switch off before the end of occupancy, using building thermal mass to maintain comfort.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Calendar-Based Scheduling:</strong> Annual programmes accounting for holidays, bank holidays, and seasonal variations.</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">Optimum Start Algorithm</h4>
              <p className="text-sm mb-3">
                Modern optimum start controllers use self-learning algorithms based on:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white">Input Parameters:</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Current indoor temperature</li>
                    <li>Outdoor temperature</li>
                    <li>Required setpoint</li>
                    <li>Historical warm-up data</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white">Adaptive Learning:</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Building thermal response rate</li>
                    <li>Seasonal adjustment factors</li>
                    <li>Equipment capacity variations</li>
                    <li>Typical 2-4 week learning period</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-semibold">Part L Requirement</h4>
                  <p className="text-sm text-gray-300">
                    For non-domestic buildings with heating systems over 45kW output, Part L requires
                    optimum start control. The controller must be capable of delaying start-up based
                    on internal and external conditions to minimise pre-conditioning time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: BMS Fundamentals */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-elec-yellow/20 rounded-lg">
              <span className="text-elec-yellow font-bold">2</span>
            </div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Building2 className="w-6 h-6 text-elec-yellow" />
              Building Management Systems (BMS) Fundamentals
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              A Building Management System (BMS), also known as Building Automation System (BAS) or
              Building Energy Management System (BEMS), provides centralised monitoring and control
              of building services including HVAC, lighting, and sometimes security systems.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3">BMS Architecture Levels</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-[#2a2a2a] rounded-lg">
                  <div className="w-8 h-8 bg-elec-yellow/20 rounded flex items-center justify-center text-elec-yellow font-bold text-sm">
                    L1
                  </div>
                  <div>
                    <p className="font-medium text-white">Management Level</p>
                    <p className="text-sm text-gray-400">Operator workstations, servers, data analytics, reporting, and remote access interfaces.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#2a2a2a] rounded-lg">
                  <div className="w-8 h-8 bg-elec-yellow/20 rounded flex items-center justify-center text-elec-yellow font-bold text-sm">
                    L2
                  </div>
                  <div>
                    <p className="font-medium text-white">Automation Level</p>
                    <p className="text-sm text-gray-400">Network controllers, routers, and communication infrastructure connecting subsystems.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#2a2a2a] rounded-lg">
                  <div className="w-8 h-8 bg-elec-yellow/20 rounded flex items-center justify-center text-elec-yellow font-bold text-sm">
                    L3
                  </div>
                  <div>
                    <p className="font-medium text-white">Field Level</p>
                    <p className="text-sm text-gray-400">Sensors (temperature, humidity, CO₂), actuators (valves, dampers), and local controllers.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">Energy Saving Benefits</h4>
                <ul className="text-sm space-y-1">
                  <li>• Optimised HVAC scheduling: 10-20%</li>
                  <li>• Improved setpoint control: 5-10%</li>
                  <li>• Fault detection & diagnostics: 5-15%</li>
                  <li>• Demand response capability: 10-20% peak</li>
                  <li>• Combined typical savings: 15-30%</li>
                </ul>
              </div>
              <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4">
                <h4 className="text-purple-400 font-semibold mb-2">Key BMS Functions</h4>
                <ul className="text-sm space-y-1">
                  <li>• Real-time monitoring & trending</li>
                  <li>• Automatic scheduling control</li>
                  <li>• Alarm management & notification</li>
                  <li>• Energy metering & reporting</li>
                  <li>• Remote access & diagnostics</li>
                </ul>
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

        {/* Section 3: Communication Protocols */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-elec-yellow/20 rounded-lg">
              <span className="text-elec-yellow font-bold">3</span>
            </div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Network className="w-6 h-6 text-elec-yellow" />
              BACnet, Modbus and LON Protocols Overview
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Understanding building automation protocols is essential for system integration and
              troubleshooting. The UK market predominantly uses BACnet for large commercial
              installations, with Modbus common for industrial applications and equipment interfaces.
            </p>

            <div className="space-y-4">
              {/* BACnet */}
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h3 className="text-elec-yellow font-semibold mb-3">BACnet (Building Automation and Control Networks)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm mb-2">
                      ASHRAE Standard 135 / ISO 16484-5. Object-oriented protocol designed
                      specifically for building automation. Most widely used open protocol in UK
                      commercial buildings.
                    </p>
                    <p className="text-sm font-medium text-white mt-3">Transport Options:</p>
                    <ul className="text-sm text-gray-400 list-disc list-inside">
                      <li>BACnet/IP (Ethernet/IP networks)</li>
                      <li>BACnet MS/TP (RS-485 serial)</li>
                      <li>BACnet/SC (Secure Connect)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Common Object Types:</p>
                    <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                      <li>Analog Input/Output (AI/AO)</li>
                      <li>Binary Input/Output (BI/BO)</li>
                      <li>Multi-state Value (MSV)</li>
                      <li>Schedule, Calendar, Trend Log</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Modbus */}
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h3 className="text-elec-yellow font-semibold mb-3">Modbus</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm mb-2">
                      Simple, robust protocol widely used for equipment integration. Master/slave
                      architecture with register-based data model. Common for meters, VFDs, and
                      industrial equipment.
                    </p>
                    <p className="text-sm font-medium text-white mt-3">Variants:</p>
                    <ul className="text-sm text-gray-400 list-disc list-inside">
                      <li>Modbus RTU (RS-485 serial)</li>
                      <li>Modbus TCP/IP (Ethernet)</li>
                      <li>Modbus ASCII (less common)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Register Types:</p>
                    <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                      <li>Coils (discrete outputs)</li>
                      <li>Discrete Inputs</li>
                      <li>Input Registers (read-only)</li>
                      <li>Holding Registers (read/write)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* LON */}
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h3 className="text-elec-yellow font-semibold mb-3">LON (LonWorks)</h3>
                <p className="text-sm mb-2">
                  Peer-to-peer protocol (ISO/IEC 14908) with distributed intelligence. Less common
                  in new UK installations but still found in existing buildings. Uses Standard
                  Network Variable Types (SNVTs) for interoperability.
                </p>
                <div className="flex items-start gap-2 mt-3 p-3 bg-amber-900/30 border border-amber-700 rounded">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">
                    LON installations are declining in the UK market. When upgrading legacy LON
                    systems, consider migration to BACnet/IP with appropriate gateways.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">Protocol Selection Guide</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 text-white">Application</th>
                    <th className="text-left py-2 text-white">Recommended Protocol</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800">
                    <td className="py-2">Large commercial BMS</td>
                    <td className="py-2">BACnet/IP</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2">Field-level device networks</td>
                    <td className="py-2">BACnet MS/TP</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2">Meter integration</td>
                    <td className="py-2">Modbus RTU/TCP</td>
                  </tr>
                  <tr>
                    <td className="py-2">VFD/motor control interface</td>
                    <td className="py-2">Modbus RTU</td>
                  </tr>
                </tbody>
              </table>
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

        {/* Section 4: Weather Compensation and Setback */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-elec-yellow/20 rounded-lg">
              <span className="text-elec-yellow font-bold">4</span>
            </div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Thermometer className="w-6 h-6 text-elec-yellow" />
              Weather Compensation and Setback Strategies
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Weather compensation and temperature setback are fundamental energy-saving strategies
              required by Part L for heating systems over 45kW in new non-domestic buildings. These
              techniques match energy output to actual building demand.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3">Weather Compensation Control</h3>
              <p className="text-sm mb-3">
                Weather compensation adjusts heating flow temperature based on outdoor temperature.
                As outdoor temperature rises, flow temperature decreases, reducing boiler cycling
                and improving efficiency, particularly with condensing boilers.
              </p>
              <div className="bg-[#2a2a2a] rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Compensation Curve Setup</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 mb-2">Typical UK Settings:</p>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Design outdoor temp: -3°C</li>
                      <li>• Design flow temp: 75-80°C</li>
                      <li>• Changeover point: 15-18°C outdoor</li>
                      <li>• Minimum flow: 35-45°C</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2">Adjustment Factors:</p>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Building insulation level</li>
                      <li>• Emitter type (radiators vs underfloor)</li>
                      <li>• Building thermal mass</li>
                      <li>• Internal heat gains</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3">Temperature Setback Strategies</h3>
              <div className="space-y-3">
                <div className="p-3 bg-[#2a2a2a] rounded-lg">
                  <h4 className="text-white font-medium">Night Setback</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Reduce heating setpoint during unoccupied night hours. CIBSE recommends
                    10-12°C for commercial offices (maintaining above 5°C frost protection minimum).
                    Savings of 5-15% on heating costs depending on building type.
                  </p>
                </div>
                <div className="p-3 bg-[#2a2a2a] rounded-lg">
                  <h4 className="text-white font-medium">Weekend/Holiday Setback</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Extended setback for longer unoccupied periods. Consider building thermal mass
                    and pre-heat requirements. Use calendar scheduling for bank holidays.
                  </p>
                </div>
                <div className="p-3 bg-[#2a2a2a] rounded-lg">
                  <h4 className="text-white font-medium">Cooling Setpoint Adjustment</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Raise cooling setpoints during unoccupied periods (typically to 28-30°C) or
                    disable entirely. Implement dead-band between heating and cooling setpoints
                    (minimum 2°C separation recommended).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2">Part L Compliance Note</h4>
              <p className="text-sm text-gray-300">
                For new non-domestic buildings with heating systems over 45kW, weather compensation
                (or load compensation) control is mandatory under Part L. The compensation curve
                must be adjustable to suit the building characteristics, and the sensor location
                must be approved during commissioning.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Demand Limiting and Load Cycling */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-elec-yellow/20 rounded-lg">
              <span className="text-elec-yellow font-bold">5</span>
            </div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Gauge className="w-6 h-6 text-elec-yellow" />
              Demand Limiting and Load Cycling
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Maximum demand charges can represent 20-40% of commercial electricity bills in the UK.
              Demand limiting strategies help control peak consumption through intelligent load
              management, reducing both costs and grid strain.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h3 className="text-elec-yellow font-semibold mb-3">Demand Limiting</h3>
                <p className="text-sm mb-3">
                  Automatically reduces electrical load when approaching maximum demand targets.
                  The BMS monitors real-time consumption and sheds non-essential loads in a
                  predetermined priority sequence.
                </p>
                <p className="text-sm font-medium text-white mb-2">Load Priority Hierarchy:</p>
                <ol className="text-sm space-y-1 list-decimal list-inside text-gray-400">
                  <li>Electric heating elements</li>
                  <li>Non-essential lighting</li>
                  <li>Hot water heating</li>
                  <li>Ventilation fans (reduced speed)</li>
                  <li>Chiller staging</li>
                </ol>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h3 className="text-elec-yellow font-semibold mb-3">Load Cycling</h3>
                <p className="text-sm mb-3">
                  Rotates equipment operation to spread electrical load while maintaining comfort.
                  Different from shedding as loads are rotated rather than removed entirely.
                </p>
                <p className="text-sm font-medium text-white mb-2">Common Applications:</p>
                <ul className="text-sm space-y-1 list-disc list-inside text-gray-400">
                  <li>Multiple chiller staging</li>
                  <li>AHU fan rotation</li>
                  <li>Packaged AC unit cycling</li>
                  <li>Water heater duty cycling</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3">BMS Demand Response Configuration</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Demand Setpoint</p>
                    <p className="text-gray-400">Set 5-10% below contracted maximum demand (kVA) to allow response time before penalties.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Monitoring Interval</p>
                    <p className="text-gray-400">Half-hourly metering standard in UK. BMS should sample every 1-5 minutes with predictive algorithms.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Restore Delay</p>
                    <p className="text-gray-400">Stagger load restoration (typically 5-10 minute intervals) to prevent demand spikes.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Zap className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-semibold">Grid Services Opportunity</h4>
                  <p className="text-sm text-gray-300">
                    Buildings with effective demand response capability may participate in National
                    Grid demand-side response schemes (DSR). This can provide additional revenue
                    streams while supporting grid stability. Contact your energy supplier or an
                    aggregator for participation requirements.
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

        {/* Section 6: Integration with Renewable Energy */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-elec-yellow/20 rounded-lg">
              <span className="text-elec-yellow font-bold">6</span>
            </div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Sun className="w-6 h-6 text-elec-yellow" />
              Integration with Renewable Energy Systems
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Modern BMS installations increasingly integrate with on-site renewable generation
              and battery storage to maximise self-consumption and reduce grid dependence.
              Effective integration requires careful control strategy design.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3">Solar PV Integration Strategies</h3>
              <div className="space-y-3">
                <div className="p-3 bg-[#2a2a2a] rounded-lg">
                  <h4 className="text-white font-medium flex items-center gap-2">
                    <Zap className="w-4 h-4 text-elec-yellow" />
                    Load Shifting to Generation Periods
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Schedule flexible loads (water heating, HVAC pre-conditioning, EV charging)
                    during peak solar generation hours (typically 10:00-15:00 in UK). BMS monitors
                    PV output and automatically adjusts scheduling.
                  </p>
                </div>
                <div className="p-3 bg-[#2a2a2a] rounded-lg">
                  <h4 className="text-white font-medium flex items-center gap-2">
                    <Zap className="w-4 h-4 text-elec-yellow" />
                    Excess Generation Response
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">
                    When generation exceeds demand, BMS can enable thermal storage charging,
                    battery storage, or bring forward scheduled loads to absorb surplus before
                    export.
                  </p>
                </div>
                <div className="p-3 bg-[#2a2a2a] rounded-lg">
                  <h4 className="text-white font-medium flex items-center gap-2">
                    <Zap className="w-4 h-4 text-elec-yellow" />
                    Weather Forecast Integration
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Advanced systems use weather forecasting APIs to predict solar generation
                    and adjust schedules proactively. Pre-condition buildings during expected
                    high generation periods.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h3 className="text-elec-yellow font-semibold mb-3">Battery Storage Control</h3>
                <ul className="text-sm space-y-2 text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Peak shaving during high demand periods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Time-of-use tariff optimisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Solar self-consumption maximisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Backup power for critical loads</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h3 className="text-elec-yellow font-semibold mb-3">Heat Pump Optimisation</h3>
                <ul className="text-sm space-y-2 text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Run during high COP conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Coordinate with solar generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Thermal storage pre-charging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Defrost cycle scheduling</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">BMS Data Points for Renewable Integration</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white">Solar PV:</p>
                  <ul className="text-gray-400 list-disc list-inside">
                    <li>Instantaneous generation (kW)</li>
                    <li>Daily/monthly yield (kWh)</li>
                    <li>Inverter status/alarms</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white">Battery:</p>
                  <ul className="text-gray-400 list-disc list-inside">
                    <li>State of charge (%)</li>
                    <li>Charge/discharge rate</li>
                    <li>Cycle count/health</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white">Grid Interface:</p>
                  <ul className="text-gray-400 list-disc list-inside">
                    <li>Import/export power</li>
                    <li>Grid frequency</li>
                    <li>Tariff signal (where available)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-6 border border-elec-yellow/30">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-2xl font-bold text-elec-yellow">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-2">Part L Control Requirements (Non-Domestic)</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Time and temperature control mandatory</li>
                <li>• Zone control where practical</li>
                <li>• Weather/load compensation over 45kW</li>
                <li>• Optimum start/stop over 45kW</li>
                <li>• Boiler sequence control (multi-boiler)</li>
                <li>• Commissioning certificate required</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Typical Energy Savings</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Optimum start: 5-10%</li>
                <li>• Weather compensation: 5-15%</li>
                <li>• Night setback: 5-15%</li>
                <li>• Full BMS installation: 15-30%</li>
                <li>• Demand limiting: 10-20% peak reduction</li>
                <li>• Renewable integration: 20-40% grid reduction</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Protocol Quick Guide</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• BACnet/IP: Enterprise BMS networks</li>
                <li>• BACnet MS/TP: Field device networks</li>
                <li>• Modbus RTU: Equipment interfaces (RS-485)</li>
                <li>• Modbus TCP: Ethernet-based metering</li>
                <li>• LON: Legacy systems (declining)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Key Standards & Guidance</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Building Regulations Part L</li>
                <li>• CIBSE Guide H: Building Control Systems</li>
                <li>• CIBSE TM63: Operational Performance</li>
                <li>• BSRIA BG6: Design of BMS</li>
                <li>• BS EN ISO 16484: Building Automation</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-3 bg-[#1a1a1a] rounded-lg">
            <h3 className="font-semibold text-elec-yellow mb-2">CIBSE Recommended Setpoints</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Office (occupied)</p>
                <p className="text-white font-medium">21-23°C</p>
              </div>
              <div>
                <p className="text-gray-400">Office (setback)</p>
                <p className="text-white font-medium">10-12°C</p>
              </div>
              <div>
                <p className="text-gray-400">Retail (occupied)</p>
                <p className="text-white font-medium">19-21°C</p>
              </div>
              <div>
                <p className="text-gray-400">Frost protection</p>
                <p className="text-white font-medium">5°C minimum</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4">Section Quiz</h2>
          <p className="text-gray-400 mb-6">
            Test your understanding of energy-efficient controls, BMS systems, and building
            automation protocols. Complete all 10 questions to assess your knowledge.
          </p>
          <Quiz questions={quizQuestions} />
        </section>

        {/* FAQs Section */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation active:scale-[0.98] hover:bg-[#2a2a2a] transition-colors"
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
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-4/section-2')}
            variant="outline"
            className="min-h-[44px] touch-manipulation active:scale-[0.98] bg-transparent border-gray-700 text-white hover:bg-gray-800 hover:border-elec-yellow"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous: Section 2
          </Button>
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-4/section-4')}
            className="min-h-[44px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            Next: Section 4
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule4Section3;
