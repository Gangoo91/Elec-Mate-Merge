import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Quiz from '@/components/apprentice-courses/Quiz';
import InlineCheck from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  Network,
  Cable,
  Settings,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Zap,
  Monitor,
  Router,
  Cpu,
  Wrench,
  Info,
  Activity,
  Globe,
  Server
} from 'lucide-react';

const IndustrialElectricalModule4Section4: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Industrial Protocols: Modbus, Profibus, Ethernet/IP | Module 4 Section 4',
    description: 'Learn industrial communication protocols including Modbus RTU/TCP, PROFIBUS DP, PROFINET, EtherNet/IP, and EtherCAT. Covers network topology, wiring, addressing, and troubleshooting.',
    keywords: [
      'industrial protocols',
      'Modbus RTU',
      'Modbus TCP',
      'PROFIBUS DP',
      'PROFINET',
      'EtherNet/IP',
      'EtherCAT',
      'fieldbus',
      'industrial Ethernet',
      'PLC communication'
    ]
  });

  const quickCheckQuestions = [
    {
      id: 'qc1',
      question: 'What is the maximum cable length for a Modbus RTU network using RS-485 at 9600 baud?',
      options: ['100 meters', '500 meters', '1200 meters', '4000 meters'],
      correctIndex: 2,
      explanation: 'RS-485 used by Modbus RTU supports cable lengths up to 1200 meters (4000 feet) at 9600 baud. Higher baud rates reduce the maximum distance.'
    },
    {
      id: 'qc2',
      question: 'Which industrial protocol uses the Producer/Consumer communication model?',
      options: ['Modbus RTU', 'PROFIBUS DP', 'EtherNet/IP', 'Modbus TCP'],
      correctIndex: 2,
      explanation: 'EtherNet/IP uses the Producer/Consumer model where any device can produce or consume data. Modbus uses Master/Slave, while PROFIBUS DP uses a similar Master/Slave arrangement.'
    },
    {
      id: 'qc3',
      question: 'What type of cable is required for PROFIBUS DP networks?',
      options: ['Standard Ethernet CAT5', 'Purple shielded twisted pair', 'Coaxial cable', 'Fiber optic only'],
      correctIndex: 1,
      explanation: 'PROFIBUS DP requires special purple-jacketed shielded twisted pair cable with specific impedance characteristics (150 ohms). Standard Ethernet cable cannot be used.'
    }
  ];

  const quizQuestions = [
    {
      question: 'What is the function code for "Read Holding Registers" in Modbus protocol?',
      options: ['01', '02', '03', '04'],
      correctAnswer: '03'
    },
    {
      question: 'Which protocol operates at the highest speed?',
      options: ['Modbus RTU (115.2 kbps)', 'PROFIBUS DP (12 Mbps)', 'EtherCAT (100 Mbps)', 'Modbus TCP (10 Mbps)'],
      correctAnswer: 'EtherCAT (100 Mbps)'
    },
    {
      question: 'What is the maximum number of devices on a single PROFIBUS DP segment?',
      options: ['32', '64', '126', '247'],
      correctAnswer: '126'
    },
    {
      question: 'Which termination resistor value is required for Modbus RTU networks?',
      options: ['75 ohms', '100 ohms', '120 ohms', '150 ohms'],
      correctAnswer: '120 ohms'
    },
    {
      question: 'What port number does Modbus TCP use by default?',
      options: ['Port 44818', 'Port 502', 'Port 2222', 'Port 102'],
      correctAnswer: 'Port 502'
    },
    {
      question: 'PROFINET IO uses which Ethernet frame type for cyclic real-time data?',
      options: ['Standard TCP/IP', 'UDP/IP', 'Raw Ethernet frames', 'HTTP'],
      correctAnswer: 'Raw Ethernet frames'
    },
    {
      question: 'What addressing scheme does EtherNet/IP use for device identification?',
      options: ['Node address (1-247)', 'MAC address only', 'IP address with CIP identity', 'Slot/Rack addressing'],
      correctAnswer: 'IP address with CIP identity'
    },
    {
      question: 'Which topology is NOT supported by EtherCAT?',
      options: ['Line/Daisy-chain', 'Star', 'Tree', 'Ring'],
      correctAnswer: 'Star'
    },
    {
      question: 'What tool is commonly used for PROFIBUS network diagnostics?',
      options: ['Wireshark only', 'PROFIBUS tester/analyzer', 'Standard multimeter', 'Oscilloscope only'],
      correctAnswer: 'PROFIBUS tester/analyzer'
    },
    {
      question: 'Which industrial protocol was specifically designed for motion control applications?',
      options: ['Modbus RTU', 'PROFIBUS PA', 'EtherCAT', 'Modbus TCP'],
      correctAnswer: 'EtherCAT'
    }
  ];

  const faqs = [
    {
      question: 'What is the difference between Modbus RTU and Modbus TCP?',
      answer: 'Modbus RTU is a serial protocol using RS-232 or RS-485 physical layers with a compact binary format and CRC error checking. It operates at baud rates up to 115.2 kbps. Modbus TCP encapsulates Modbus messages in TCP/IP packets for Ethernet networks, operating at 10/100 Mbps. TCP adds its own error checking, so the CRC is not used. Modbus TCP uses port 502 and supports multiple simultaneous connections, while RTU is limited to one master on the bus.'
    },
    {
      question: 'Why do PROFIBUS networks require special purple cable?',
      answer: 'PROFIBUS DP cable has specific electrical characteristics required for reliable high-speed communication: 150-ohm characteristic impedance (vs. 100 ohms for Ethernet), specific capacitance and attenuation values, and robust shielding for industrial environments. The purple color is an industry standard for easy identification. Using standard Ethernet cable will cause signal reflections, data errors, and communication failures due to impedance mismatch.'
    },
    {
      question: 'How do I choose between EtherNet/IP and PROFINET?',
      answer: 'The choice often depends on your PLC vendor: Allen-Bradley/Rockwell systems typically use EtherNet/IP, while Siemens systems use PROFINET. Both offer similar performance for standard I/O applications. EtherNet/IP uses standard TCP/IP and UDP/IP, making it easier to integrate with IT networks. PROFINET offers better real-time performance for motion control (IRT mode). Consider your existing infrastructure, vendor support, and application requirements.'
    },
    {
      question: 'What causes communication timeout errors in Modbus?',
      answer: 'Common causes include: incorrect baud rate, parity, or stop bit settings; wrong device address; missing or incorrect termination resistors; cable length exceeding limits; electromagnetic interference; loose or damaged connections; incorrect wiring (A/B lines swapped); device not responding due to overload; and ground loops. Use a protocol analyzer to capture actual traffic and verify the physical layer with an oscilloscope.'
    },
    {
      question: 'Can I mix different protocols on the same network?',
      answer: 'For serial fieldbuses (Modbus RTU, PROFIBUS), you cannot mix protocols on the same physical network. For Ethernet-based protocols, they can coexist on the same physical network infrastructure since they use different ports/protocols, but dedicated network segments or VLANs are recommended to ensure deterministic performance. Gateways/protocol converters can translate between different protocols when integration is required.'
    },
    {
      question: 'What is the role of a termination resistor in industrial networks?',
      answer: 'Termination resistors absorb signal energy at cable ends to prevent reflections that cause data corruption. For RS-485/Modbus RTU, 120-ohm resistors are placed at both ends of the bus. PROFIBUS uses built-in active termination in connectors at both ends. Proper termination is critical—missing termination causes intermittent errors, while extra termination reduces signal amplitude. Always verify termination when troubleshooting communication issues.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-elec-yellow mb-2">
            <Network className="w-6 h-6" />
            <span className="text-sm font-medium">Module 4 - Section 4</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">
            Industrial Protocols: Modbus, Profibus, Ethernet/IP
          </h1>
          <p className="text-gray-300 text-lg">
            Master industrial communication protocols essential for PLC networking, device integration,
            and troubleshooting complex automation systems.
          </p>
        </div>

        {/* Section 1: Fieldbus vs Industrial Ethernet Overview */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center font-bold">
              1
            </div>
            <h2 className="text-2xl font-semibold">Fieldbus vs Industrial Ethernet Overview</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Cable className="w-5 h-5" />
              Evolution of Industrial Communications
            </h3>
            <p className="text-gray-300 mb-4">
              Industrial communication has evolved from simple hardwired connections to sophisticated
              networked systems. Understanding the differences between traditional fieldbus and modern
              industrial Ethernet is crucial for system design and troubleshooting.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Traditional Fieldbus</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Serial communication (RS-232, RS-485)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Lower speeds (9.6 kbps - 12 Mbps)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Specialized cables and connectors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Deterministic timing guaranteed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Examples: Modbus RTU, PROFIBUS DP</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Industrial Ethernet</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Ethernet-based (IEEE 802.3)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>High speeds (100 Mbps - 1 Gbps)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Standard/industrial Ethernet cables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>IT/OT convergence capable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Examples: EtherNet/IP, PROFINET, EtherCAT</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-3">Protocol Comparison Table</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 px-2 text-gray-300">Protocol</th>
                      <th className="text-left py-2 px-2 text-gray-300">Type</th>
                      <th className="text-left py-2 px-2 text-gray-300">Max Speed</th>
                      <th className="text-left py-2 px-2 text-gray-300">Max Nodes</th>
                      <th className="text-left py-2 px-2 text-gray-300">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2 text-blue-400">Modbus RTU</td>
                      <td className="py-2 px-2">Serial</td>
                      <td className="py-2 px-2">115.2 kbps</td>
                      <td className="py-2 px-2">247</td>
                      <td className="py-2 px-2">Legacy, simple I/O</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2 text-blue-400">Modbus TCP</td>
                      <td className="py-2 px-2">Ethernet</td>
                      <td className="py-2 px-2">100 Mbps</td>
                      <td className="py-2 px-2">Unlimited*</td>
                      <td className="py-2 px-2">SCADA, HMI</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2 text-purple-400">PROFIBUS DP</td>
                      <td className="py-2 px-2">Serial</td>
                      <td className="py-2 px-2">12 Mbps</td>
                      <td className="py-2 px-2">126</td>
                      <td className="py-2 px-2">Factory automation</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2 text-purple-400">PROFINET</td>
                      <td className="py-2 px-2">Ethernet</td>
                      <td className="py-2 px-2">100 Mbps</td>
                      <td className="py-2 px-2">Unlimited*</td>
                      <td className="py-2 px-2">Siemens systems</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2 text-green-400">EtherNet/IP</td>
                      <td className="py-2 px-2">Ethernet</td>
                      <td className="py-2 px-2">1 Gbps</td>
                      <td className="py-2 px-2">Unlimited*</td>
                      <td className="py-2 px-2">Rockwell systems</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 text-orange-400">EtherCAT</td>
                      <td className="py-2 px-2">Ethernet</td>
                      <td className="py-2 px-2">100 Mbps</td>
                      <td className="py-2 px-2">65,535</td>
                      <td className="py-2 px-2">Motion control</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-500 mt-2">*Limited by network infrastructure</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Modbus RTU and TCP/IP Fundamentals */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center font-bold">
              2
            </div>
            <h2 className="text-2xl font-semibold">Modbus RTU and TCP/IP Fundamentals</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Server className="w-5 h-5" />
              The Modbus Protocol Family
            </h3>
            <p className="text-gray-300 mb-4">
              Modbus, developed by Modicon in 1979, remains the most widely used industrial protocol
              due to its simplicity and open specification. Understanding both RTU (serial) and TCP
              (Ethernet) variants is essential for any industrial electrician.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-blue-400 mb-3">Modbus RTU Configuration</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-400 mb-2">Serial Parameters</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <span className="text-elec-yellow">Baud Rate:</span> 9600, 19200, 38400, 115200</li>
                    <li>• <span className="text-elec-yellow">Data Bits:</span> 8</li>
                    <li>• <span className="text-elec-yellow">Parity:</span> Even (most common), None, Odd</li>
                    <li>• <span className="text-elec-yellow">Stop Bits:</span> 1 (with parity), 2 (without)</li>
                    <li>• <span className="text-elec-yellow">Address Range:</span> 1-247 (0 = broadcast)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-400 mb-2">RS-485 Wiring</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <span className="text-green-400">A (D-):</span> Negative/inverting line</li>
                    <li>• <span className="text-green-400">B (D+):</span> Positive/non-inverting line</li>
                    <li>• <span className="text-green-400">GND:</span> Signal ground (reference)</li>
                    <li>• <span className="text-green-400">Shield:</span> Ground at one end only</li>
                    <li>• <span className="text-green-400">Termination:</span> 120Ω at both ends</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-green-400 mb-3">Modbus Function Codes</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 px-2 text-gray-300">Code</th>
                      <th className="text-left py-2 px-2 text-gray-300">Function</th>
                      <th className="text-left py-2 px-2 text-gray-300">Data Type</th>
                      <th className="text-left py-2 px-2 text-gray-300">Access</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2 text-elec-yellow">01</td>
                      <td className="py-2 px-2">Read Coils</td>
                      <td className="py-2 px-2">Discrete Output</td>
                      <td className="py-2 px-2">Read</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2 text-elec-yellow">02</td>
                      <td className="py-2 px-2">Read Discrete Inputs</td>
                      <td className="py-2 px-2">Discrete Input</td>
                      <td className="py-2 px-2">Read</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2 text-elec-yellow">03</td>
                      <td className="py-2 px-2">Read Holding Registers</td>
                      <td className="py-2 px-2">Analog Output</td>
                      <td className="py-2 px-2">Read</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2 text-elec-yellow">04</td>
                      <td className="py-2 px-2">Read Input Registers</td>
                      <td className="py-2 px-2">Analog Input</td>
                      <td className="py-2 px-2">Read</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2 text-elec-yellow">05</td>
                      <td className="py-2 px-2">Write Single Coil</td>
                      <td className="py-2 px-2">Discrete Output</td>
                      <td className="py-2 px-2">Write</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2 text-elec-yellow">06</td>
                      <td className="py-2 px-2">Write Single Register</td>
                      <td className="py-2 px-2">Analog Output</td>
                      <td className="py-2 px-2">Write</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2 text-elec-yellow">15</td>
                      <td className="py-2 px-2">Write Multiple Coils</td>
                      <td className="py-2 px-2">Discrete Output</td>
                      <td className="py-2 px-2">Write</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 text-elec-yellow">16</td>
                      <td className="py-2 px-2">Write Multiple Registers</td>
                      <td className="py-2 px-2">Analog Output</td>
                      <td className="py-2 px-2">Write</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-semibold text-purple-400 mb-3">Modbus TCP Specifics</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-400 mb-2">Network Settings</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <span className="text-elec-yellow">Default Port:</span> TCP 502</li>
                    <li>• <span className="text-elec-yellow">Unit ID:</span> 0-255 (usually 1 or 255)</li>
                    <li>• <span className="text-elec-yellow">Max Connections:</span> Vendor dependent</li>
                    <li>• <span className="text-elec-yellow">Timeout:</span> Typically 1-5 seconds</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-400 mb-2">Frame Structure</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Transaction ID: 2 bytes</li>
                    <li>• Protocol ID: 2 bytes (0x0000)</li>
                    <li>• Length: 2 bytes</li>
                    <li>• Unit ID + PDU: Variable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </section>

        {/* Section 3: PROFIBUS DP and PROFINET */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center font-bold">
              3
            </div>
            <h2 className="text-2xl font-semibold">PROFIBUS DP and PROFINET</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              Siemens Protocol Ecosystem
            </h3>
            <p className="text-gray-300 mb-4">
              PROFIBUS and PROFINET are dominant in manufacturing, particularly with Siemens equipment.
              PROFIBUS DP (Decentralized Periphery) remains widely installed, while PROFINET is the
              modern Ethernet-based successor.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-purple-400 mb-3">PROFIBUS DP Specifications</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-400 mb-2">Physical Layer</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <span className="text-elec-yellow">Cable:</span> Purple shielded twisted pair</li>
                    <li>• <span className="text-elec-yellow">Impedance:</span> 150 ohms</li>
                    <li>• <span className="text-elec-yellow">Connector:</span> 9-pin D-sub</li>
                    <li>• <span className="text-elec-yellow">Termination:</span> Active (built-in switch)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-400 mb-2">Performance</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <span className="text-elec-yellow">Speeds:</span> 9.6 kbps - 12 Mbps</li>
                    <li>• <span className="text-elec-yellow">Max Distance:</span> 100m @12Mbps, 1200m @93.75kbps</li>
                    <li>• <span className="text-elec-yellow">Max Nodes:</span> 126 per segment</li>
                    <li>• <span className="text-elec-yellow">Repeaters:</span> Up to 9 segments</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#242424] rounded p-3">
                <h5 className="text-sm font-medium text-elec-yellow mb-2">PROFIBUS Speed vs Distance</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-300">
                  <div className="text-center p-2 bg-[#1a1a1a] rounded">
                    <div className="font-bold text-purple-400">12 Mbps</div>
                    <div>100m max</div>
                  </div>
                  <div className="text-center p-2 bg-[#1a1a1a] rounded">
                    <div className="font-bold text-purple-400">1.5 Mbps</div>
                    <div>400m max</div>
                  </div>
                  <div className="text-center p-2 bg-[#1a1a1a] rounded">
                    <div className="font-bold text-purple-400">500 kbps</div>
                    <div>400m max</div>
                  </div>
                  <div className="text-center p-2 bg-[#1a1a1a] rounded">
                    <div className="font-bold text-purple-400">93.75 kbps</div>
                    <div>1200m max</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-green-400 mb-3">PROFINET Overview</h4>
              <p className="text-gray-300 text-sm mb-3">
                PROFINET uses standard Ethernet infrastructure with three performance classes:
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-[#242424] rounded p-3">
                  <h5 className="font-medium text-blue-400 mb-2">NRT (Non-Real-Time)</h5>
                  <ul className="text-gray-300 text-xs space-y-1">
                    <li>• Standard TCP/IP</li>
                    <li>• ~100ms cycle time</li>
                    <li>• Configuration/diagnostics</li>
                  </ul>
                </div>
                <div className="bg-[#242424] rounded p-3">
                  <h5 className="font-medium text-green-400 mb-2">RT (Real-Time)</h5>
                  <ul className="text-gray-300 text-xs space-y-1">
                    <li>• Prioritized Ethernet frames</li>
                    <li>• 1-10ms cycle time</li>
                    <li>• Standard I/O applications</li>
                  </ul>
                </div>
                <div className="bg-[#242424] rounded p-3">
                  <h5 className="font-medium text-orange-400 mb-2">IRT (Isochronous RT)</h5>
                  <ul className="text-gray-300 text-xs space-y-1">
                    <li>• Hardware-based timing</li>
                    <li>• &lt;1ms cycle time</li>
                    <li>• Motion control/drives</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-500 mb-1">PROFIBUS Wiring Critical Points</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Always use genuine PROFIBUS cable (not standard network cable)</li>
                    <li>• Enable termination ONLY at first and last devices</li>
                    <li>• Maintain correct A/B line polarity throughout</li>
                    <li>• Ground shield at one end only to prevent ground loops</li>
                    <li>• Keep cable segments within distance limits for selected baud rate</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </section>

        {/* Section 4: EtherNet/IP and EtherCAT */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center font-bold">
              4
            </div>
            <h2 className="text-2xl font-semibold">EtherNet/IP and EtherCAT</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Modern Industrial Ethernet Protocols
            </h3>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-green-400 mb-3">EtherNet/IP (Industrial Protocol)</h4>
              <p className="text-gray-300 text-sm mb-3">
                Developed by ODVA and Rockwell Automation, EtherNet/IP uses standard TCP/IP and UDP/IP
                with the Common Industrial Protocol (CIP) application layer.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-400 mb-2">Key Features</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <span className="text-elec-yellow">Producer/Consumer Model:</span> Multicast capable</li>
                    <li>• <span className="text-elec-yellow">TCP Port:</span> 44818 (explicit messages)</li>
                    <li>• <span className="text-elec-yellow">UDP Port:</span> 2222 (implicit/I/O)</li>
                    <li>• <span className="text-elec-yellow">RPI:</span> Requested Packet Interval (ms)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-400 mb-2">Connection Types</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <span className="text-blue-400">Explicit:</span> Configuration, diagnostics</li>
                    <li>• <span className="text-green-400">Implicit:</span> Cyclic I/O data</li>
                    <li>• <span className="text-purple-400">Class 1:</span> Cyclic scheduled</li>
                    <li>• <span className="text-orange-400">Class 3:</span> Explicit unconnected</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-orange-400 mb-3">EtherCAT (Ethernet for Control Automation Technology)</h4>
              <p className="text-gray-300 text-sm mb-3">
                Developed by Beckhoff, EtherCAT achieves exceptional performance through a unique
                "processing on the fly" architecture where each device processes the frame as it passes.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-400 mb-2">Technical Specifications</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <span className="text-elec-yellow">Speed:</span> 100 Mbps full duplex</li>
                    <li>• <span className="text-elec-yellow">Cycle Time:</span> &lt;100 microseconds possible</li>
                    <li>• <span className="text-elec-yellow">Jitter:</span> &lt;1 microsecond</li>
                    <li>• <span className="text-elec-yellow">Nodes:</span> Up to 65,535 devices</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-400 mb-2">Topology Support</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <span className="text-green-400">Line:</span> Primary topology (daisy-chain)</li>
                    <li>• <span className="text-green-400">Tree:</span> Branching supported</li>
                    <li>• <span className="text-green-400">Ring:</span> Cable redundancy</li>
                    <li>• <span className="text-red-400">Star:</span> Not supported directly</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 bg-[#242424] rounded p-3">
                <h5 className="text-sm font-medium text-elec-yellow mb-2">EtherCAT Frame Processing</h5>
                <div className="text-gray-300 text-sm">
                  <p className="mb-2">Each EtherCAT frame passes through all devices in sequence:</p>
                  <div className="flex items-center gap-2 text-xs overflow-x-auto pb-2">
                    <div className="bg-blue-900 px-3 py-2 rounded whitespace-nowrap">Master</div>
                    <span className="text-elec-yellow">→</span>
                    <div className="bg-green-900 px-3 py-2 rounded whitespace-nowrap">Slave 1<br/>(reads/writes)</div>
                    <span className="text-elec-yellow">→</span>
                    <div className="bg-green-900 px-3 py-2 rounded whitespace-nowrap">Slave 2<br/>(reads/writes)</div>
                    <span className="text-elec-yellow">→</span>
                    <div className="bg-green-900 px-3 py-2 rounded whitespace-nowrap">Slave N<br/>(reads/writes)</div>
                    <span className="text-elec-yellow">→</span>
                    <div className="bg-blue-900 px-3 py-2 rounded whitespace-nowrap">Return</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-400 mb-1">Protocol Selection Guide</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <span className="text-green-400">Rockwell/Allen-Bradley:</span> EtherNet/IP is native</li>
                    <li>• <span className="text-purple-400">Siemens:</span> PROFINET preferred, PROFIBUS legacy</li>
                    <li>• <span className="text-orange-400">Motion Control:</span> EtherCAT for best performance</li>
                    <li>• <span className="text-blue-400">Multi-vendor/SCADA:</span> Modbus TCP for simplicity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </section>

        {/* Section 5: Network Topology and Wiring Requirements */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center font-bold">
              5
            </div>
            <h2 className="text-2xl font-semibold">Network Topology and Wiring Requirements</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Router className="w-5 h-5" />
              Physical Network Design
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-3">Serial Bus Topology</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Modbus RTU and PROFIBUS DP use a multi-drop bus arrangement:
                </p>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>All devices share single cable pair</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Daisy-chain connection (no star or stubs)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Termination at both ends only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Spur/drop cables must be very short</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-3">Ethernet Topology Options</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Industrial Ethernet supports flexible topologies:
                </p>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Star:</strong> Devices connect to central switch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Line:</strong> Daisy-chain through device ports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Ring:</strong> Redundancy with RSTP/MRP</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Tree:</strong> Combination of above</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-elec-yellow mb-3">Cable Specifications by Protocol</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 px-2 text-gray-300">Protocol</th>
                      <th className="text-left py-2 px-2 text-gray-300">Cable Type</th>
                      <th className="text-left py-2 px-2 text-gray-300">Impedance</th>
                      <th className="text-left py-2 px-2 text-gray-300">Max Length</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2">Modbus RTU (RS-485)</td>
                      <td className="py-2 px-2">Shielded twisted pair</td>
                      <td className="py-2 px-2">120Ω</td>
                      <td className="py-2 px-2">1200m @9600 baud</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2">PROFIBUS DP</td>
                      <td className="py-2 px-2">Purple STP (Type A)</td>
                      <td className="py-2 px-2">150Ω</td>
                      <td className="py-2 px-2">100m @12Mbps</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2">EtherNet/IP</td>
                      <td className="py-2 px-2">CAT5e/6 industrial</td>
                      <td className="py-2 px-2">100Ω</td>
                      <td className="py-2 px-2">100m per segment</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2">PROFINET</td>
                      <td className="py-2 px-2">CAT5e/6 industrial</td>
                      <td className="py-2 px-2">100Ω</td>
                      <td className="py-2 px-2">100m per segment</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2">EtherCAT</td>
                      <td className="py-2 px-2">CAT5e/6 industrial</td>
                      <td className="py-2 px-2">100Ω</td>
                      <td className="py-2 px-2">100m between devices</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-500 mb-1">Industrial Ethernet Cable Requirements</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Use industrial-rated cables with oil/chemical resistance</li>
                    <li>• Maintain minimum bend radius (typically 4x cable diameter)</li>
                    <li>• Use industrial M12 or RJ45 connectors rated IP67</li>
                    <li>• Separate from power cables or use shielded cable</li>
                    <li>• Avoid running alongside VFD output cables</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Troubleshooting Communication Issues */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center font-bold">
              6
            </div>
            <h2 className="text-2xl font-semibold">Troubleshooting Communication Issues</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Diagnostic Tools and Techniques
            </h3>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-blue-400 mb-3">Essential Diagnostic Tools</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-400 mb-2">Hardware Tools</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <span className="text-elec-yellow">Oscilloscope:</span> Signal quality analysis</li>
                    <li>• <span className="text-elec-yellow">Cable Tester:</span> Continuity and mapping</li>
                    <li>• <span className="text-elec-yellow">PROFIBUS Tester:</span> ProfiTrace, NetTEST II</li>
                    <li>• <span className="text-elec-yellow">Network Analyzer:</span> Fluke or similar</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-400 mb-2">Software Tools</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <span className="text-elec-yellow">Wireshark:</span> Ethernet packet capture</li>
                    <li>• <span className="text-elec-yellow">Modbus Poll/Scan:</span> Protocol testing</li>
                    <li>• <span className="text-elec-yellow">PRONETA:</span> PROFINET diagnostics</li>
                    <li>• <span className="text-elec-yellow">RSLinx/Studio 5000:</span> EtherNet/IP diagnostics</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-orange-400 mb-3">Common Problems and Solutions</h4>
              <div className="space-y-3">
                <div className="bg-[#242424] rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-red-500" />
                    <span className="font-medium text-red-400">Intermittent Communication Loss</span>
                  </div>
                  <ul className="text-gray-300 text-sm space-y-1 ml-6">
                    <li>• Check termination resistors (add/remove as needed)</li>
                    <li>• Inspect for loose connections or damaged cables</li>
                    <li>• Verify proper grounding and shielding</li>
                    <li>• Look for EMI sources (VFDs, motors, welders)</li>
                    <li>• Check cable routing away from power conductors</li>
                  </ul>
                </div>

                <div className="bg-[#242424] rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium text-yellow-400">No Communication at All</span>
                  </div>
                  <ul className="text-gray-300 text-sm space-y-1 ml-6">
                    <li>• Verify matching communication parameters (baud, parity)</li>
                    <li>• Check device addresses for duplicates or errors</li>
                    <li>• Confirm A/B line polarity (RS-485/PROFIBUS)</li>
                    <li>• Test with single device to isolate issue</li>
                    <li>• Check for failed termination in intermediate devices</li>
                  </ul>
                </div>

                <div className="bg-[#242424] rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-blue-400">Slow Response / Timeouts</span>
                  </div>
                  <ul className="text-gray-300 text-sm space-y-1 ml-6">
                    <li>• Reduce number of devices or polling frequency</li>
                    <li>• Increase timeout values in master configuration</li>
                    <li>• Check for network congestion (Ethernet protocols)</li>
                    <li>• Optimize data packet sizes</li>
                    <li>• Consider upgrading to faster protocol or segmenting network</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-3">Systematic Troubleshooting Process</h4>
              <ol className="text-gray-300 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow text-[#1a1a1a] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <span><strong>Physical Layer:</strong> Check cables, connectors, termination, power supply</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow text-[#1a1a1a] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <span><strong>Data Link Layer:</strong> Verify baud rate, addressing, frame format</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow text-[#1a1a1a] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <span><strong>Network Layer:</strong> Check IP addresses, subnet masks, gateways (Ethernet)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow text-[#1a1a1a] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                  <span><strong>Application Layer:</strong> Verify register addresses, data types, function codes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow text-[#1a1a1a] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                  <span><strong>Document:</strong> Record all findings and changes for future reference</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] rounded-lg p-6 border border-elec-yellow/30">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-elec-yellow" />
              <h2 className="text-xl font-bold text-elec-yellow">Quick Reference Card</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-white mb-3 border-b border-gray-600 pb-1">
                  Modbus RTU Defaults
                </h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Baud: 9600 | Data: 8 | Parity: Even | Stop: 1</li>
                  <li>• Address Range: 1-247 (0 = broadcast)</li>
                  <li>• Termination: 120Ω at both ends</li>
                  <li>• Max Distance: 1200m @ 9600 baud</li>
                  <li>• Common Registers: 40001-49999 (holding)</li>
                </ul>

                <h3 className="font-semibold text-white mb-3 mt-4 border-b border-gray-600 pb-1">
                  PROFIBUS DP Quick Facts
                </h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Cable: Purple shielded, 150Ω impedance</li>
                  <li>• Connector: 9-pin D-sub with termination switch</li>
                  <li>• Speed: 93.75 kbps to 12 Mbps</li>
                  <li>• Max Nodes: 126 per segment</li>
                  <li>• GSD File: Device configuration descriptor</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3 border-b border-gray-600 pb-1">
                  Ethernet Protocol Ports
                </h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Modbus TCP: Port 502</li>
                  <li>• EtherNet/IP Explicit: Port 44818 (TCP)</li>
                  <li>• EtherNet/IP I/O: Port 2222 (UDP)</li>
                  <li>• PROFINET: Ethertype 0x8892</li>
                  <li>• EtherCAT: Ethertype 0x88A4</li>
                </ul>

                <h3 className="font-semibold text-white mb-3 mt-4 border-b border-gray-600 pb-1">
                  Troubleshooting Checklist
                </h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>□ Verify physical connections and cable integrity</li>
                  <li>□ Check communication parameters match</li>
                  <li>□ Confirm device addresses are unique</li>
                  <li>□ Verify termination is correct</li>
                  <li>□ Test with protocol analyzer if available</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Info className="w-6 h-6 text-elec-yellow" />
            Frequently Asked Questions
          </h2>
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
                    <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-12">
          <div className="bg-[#242424] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Zap className="w-6 h-6 text-elec-yellow" />
                Knowledge Check Quiz
              </h2>
              <Button
                onClick={() => setShowQuiz(!showQuiz)}
                className="bg-elec-yellow text-[#1a1a1a] hover:bg-yellow-400 min-h-[44px] touch-manipulation"
              >
                {showQuiz ? 'Hide Quiz' : 'Start Quiz'}
              </Button>
            </div>
            {showQuiz && (
              <Quiz
                questions={quizQuestions}
                moduleId="industrial-electrical-m4s4"
              />
            )}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4">
          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module4/section3')}
            variant="outline"
            className="flex items-center gap-2 min-h-[44px] touch-manipulation border-gray-600 text-white hover:bg-[#242424]"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous: Section 3 - PLC Hardware</span>
          </Button>
          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module4/section5')}
            className="flex items-center gap-2 min-h-[44px] touch-manipulation bg-elec-yellow text-[#1a1a1a] hover:bg-yellow-400"
          >
            <span>Next: Section 5 - HMI and SCADA</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule4Section4;
