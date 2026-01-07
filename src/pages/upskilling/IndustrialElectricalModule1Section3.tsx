import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Zap,
  Shield,
  AlertTriangle,
  Server,
  Cpu,
  Wrench,
  BookOpen,
  Network,
  Gauge,
  HardHat,
} from 'lucide-react';

const IndustrialElectricalModule1Section3: React.FC = () => {
  useSEO({
    title: 'MCC Panels and Switchgear Intro | Industrial Electrical Module 1 Section 3 | Elec-Mate',
    description:
      'Learn about Motor Control Centres (MCC), switchgear types (ACB, MCCB, MCB), bus bar systems, BS EN 61439 forms of separation, arc flash hazards, and maintenance requirements for industrial electrical systems.',
    keywords: [
      'MCC panels',
      'motor control centre',
      'switchgear',
      'ACB',
      'MCCB',
      'MCB',
      'bus bar systems',
      'BS EN 61439',
      'forms of separation',
      'arc flash',
      'PPE requirements',
      'fault levels',
      'kA ratings',
      'industrial electrical',
    ],
  });

  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const quickCheckQuestions = [
    {
      id: 'qc1-mcc-section3',
      question:
        'According to BS EN 61439, which Form of separation provides the highest level of segregation between functional units?',
      options: ['Form 1', 'Form 2b', 'Form 3b', 'Form 4b'],
      correctIndex: 3,
      explanation:
        'Form 4b provides the highest level of separation with segregation of busbars from functional units, separation of all functional units from each other, AND separation of terminals from functional units. This offers maximum protection for maintenance and fault containment.',
    },
    {
      id: 'qc2-mcc-section3',
      question:
        'What does the kA rating on a circuit breaker indicate?',
      options: [
        'Maximum continuous current capacity',
        'Prospective fault current the device can safely interrupt',
        'Voltage rating of the device',
        'Power factor correction capability',
      ],
      correctIndex: 1,
      explanation:
        'The kA (kiloampere) rating indicates the maximum prospective fault current that the circuit breaker can safely interrupt without damage. This must exceed the calculated fault level at the installation point to ensure safe operation during short-circuit conditions.',
    },
    {
      id: 'qc3-mcc-section3',
      question:
        'At what incident energy level (cal/cm²) does arc flash PPE Category 2 begin according to IEEE 1584?',
      options: [
        '1.2 cal/cm²',
        '4 cal/cm²',
        '8 cal/cm²',
        '25 cal/cm²',
      ],
      correctIndex: 1,
      explanation:
        'PPE Category 2 begins at 4 cal/cm² and extends to 8 cal/cm². Category 1 covers 1.2-4 cal/cm², Category 3 covers 8-25 cal/cm², and Category 4 covers 25-40 cal/cm². Above 40 cal/cm², live work is prohibited.',
    },
  ];

  const quizQuestions = [
    {
      question:
        'What is the primary function of a Motor Control Centre (MCC)?',
      options: [
        'To generate electrical power for motors',
        'To centralise motor starters, protection devices, and control equipment in one assembly',
        'To convert AC power to DC for motor operation',
        'To measure power consumption only',
      ],
      correctAnswer:
        'To centralise motor starters, protection devices, and control equipment in one assembly',
    },
    {
      question:
        'Which type of circuit breaker is typically used for main incoming supplies rated above 800A?',
      options: [
        'MCB (Miniature Circuit Breaker)',
        'MCCB (Moulded Case Circuit Breaker)',
        'ACB (Air Circuit Breaker)',
        'RCD (Residual Current Device)',
      ],
      correctAnswer: 'ACB (Air Circuit Breaker)',
    },
    {
      question:
        'In BS EN 61439, what does Form 2b separation provide that Form 2a does not?',
      options: [
        'Separation of busbars from functional units',
        'Separation of terminals from busbars',
        'Separation between functional units',
        'No internal separation at all',
      ],
      correctAnswer: 'Separation of terminals from busbars',
    },
    {
      question:
        'What material is commonly used for bus bars in MCC panels due to its conductivity?',
      options: ['Aluminium only', 'Steel', 'Copper or aluminium', 'Brass'],
      correctAnswer: 'Copper or aluminium',
    },
    {
      question:
        'What communication protocol is commonly used in intelligent switchgear for Ethernet-based SCADA integration?',
      options: ['Modbus RTU', 'PROFIBUS', 'IEC 61850 / Modbus TCP', 'HART'],
      correctAnswer: 'IEC 61850 / Modbus TCP',
    },
    {
      question:
        'What is the working distance typically used for arc flash calculations at an MCC?',
      options: ['300mm', '455mm (18 inches)', '610mm (24 inches)', '900mm'],
      correctAnswer: '455mm (18 inches)',
    },
    {
      question:
        'According to UK regulations, at what interval should fixed electrical installations be inspected and tested in industrial environments?',
      options: [
        'Every 6 months',
        'Annually',
        'Every 3-5 years depending on environment',
        'Every 10 years',
      ],
      correctAnswer: 'Every 3-5 years depending on environment',
    },
    {
      question:
        'What does Icw represent in switchgear specifications?',
      options: [
        'Ultimate breaking capacity',
        'Rated short-time withstand current',
        'Rated operational current',
        'Conditional short-circuit current',
      ],
      correctAnswer: 'Rated short-time withstand current',
    },
    {
      question:
        'Which test is performed on circuit breakers to verify they will trip at the correct current values?',
      options: [
        'Insulation resistance test',
        'Primary injection test',
        'Earth loop impedance test',
        'Polarity test',
      ],
      correctAnswer: 'Primary injection test',
    },
    {
      question:
        'What minimum arc rating (ATPV) must PPE have for Category 3 arc flash protection?',
      options: ['4 cal/cm²', '8 cal/cm²', '25 cal/cm²', '40 cal/cm²'],
      correctAnswer: '25 cal/cm²',
    },
  ];

  const faqs = [
    {
      question:
        'What is the difference between withdrawable and fixed MCC units?',
      answer:
        'Withdrawable (draw-out) units can be completely removed from the MCC for maintenance or replacement without de-energising the entire panel. They have test and isolated positions. Fixed units are permanently wired and require the section to be isolated for any work. Withdrawable units cost more but offer greater flexibility and reduced downtime. They are preferred for critical applications where rapid replacement may be necessary.',
    },
    {
      question:
        'How do I determine the required fault rating for switchgear?',
      answer:
        'The fault rating must exceed the prospective fault current (PFC) at the installation point. This is calculated using transformer impedance, cable impedance, and supply characteristics. For example, a 1000kVA transformer at 400V with 5% impedance gives approximately 29kA fault current. Always allow a safety margin and consider future capacity increases. Fault level studies should be conducted by a competent engineer using software like ETAP or DIgSILENT.',
    },
    {
      question: 'What are the key differences between ACB, MCCB, and MCB?',
      answer:
        'MCBs (Miniature Circuit Breakers) handle up to 125A with fault ratings to 10kA, suitable for final circuits. MCCBs (Moulded Case Circuit Breakers) cover 16A-1600A with fault ratings to 150kA, used for sub-main distribution. ACBs (Air Circuit Breakers) handle 800A-6300A with fault ratings to 150kA+, used for main incomers. ACBs offer advanced protection settings, are maintainable, and can be specified as withdrawable. MCCBs may be fixed or plug-in, while MCBs are always fixed.',
    },
    {
      question:
        'How often should thermographic surveys be performed on MCC panels?',
      answer:
        'Industry best practice recommends annual thermographic surveys for MCCs under normal conditions. High-criticality installations or those with high harmonic content should be surveyed every 6 months. Surveys should also be conducted after any significant load changes, following maintenance work, or if there are any signs of overheating. Thermal imaging identifies loose connections, overloaded circuits, and failing components before catastrophic failure.',
    },
    {
      question: 'What PPE is required for racking in/out circuit breakers?',
      answer:
        'Racking operations on energised equipment require arc flash PPE based on the calculated incident energy. Typically this includes: arc-rated face shield (minimum 8 cal/cm²), arc-rated coveralls or switching suit, arc-rated gloves, safety glasses, and hearing protection. The specific rating depends on the arc flash study results. Many organisations mandate Category 2 (8 cal/cm²) as minimum for all MCC work. Remote racking devices can eliminate the hazard entirely.',
    },
    {
      question:
        'What is the purpose of forms of separation in switchgear assemblies?',
      answer:
        'Forms of separation (BS EN 61439) define the degree of internal compartmentalisation. Form 1 has no separation - any access exposes all live parts. Form 2 separates busbars from functional units. Form 3 adds separation between functional units. Form 4 provides the highest separation including terminals. Higher forms allow maintenance on individual units while others remain energised, contain arc faults to smaller areas, and improve safety. Form 4 is typically specified for critical installations.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d] border-b border-gray-700 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-elec-yellow mb-2">
            <Server className="w-5 h-5" />
            <span className="text-sm font-medium">
              Industrial Electrical • Module 1 • Section 3
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            MCC Panels and Switchgear Intro
          </h1>
          <p className="text-gray-400 mt-2">
            Master Motor Control Centres, switchgear selection, bus bar systems,
            and arc flash safety for industrial installations
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Section 1: MCC Architecture */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">1</span>
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
              <Server className="w-5 h-5" />
              Motor Control Centre (MCC) Architecture
            </h2>
          </div>

          <div className="bg-[#2d2d2d] rounded-lg p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              A <strong className="text-white">Motor Control Centre (MCC)</strong> is
              a floor-mounted assembly containing motor starters, variable speed drives,
              protection devices, and control equipment in a unified enclosure. MCCs are
              the backbone of industrial electrical distribution, providing centralised
              control and protection for multiple motors.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-elec-yellow font-medium mb-2">
                  Key Components
                </h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Incoming feeder section (ACB/MCCB)</li>
                  <li>• Horizontal and vertical busbars</li>
                  <li>• Motor starter units (DOL, Star-Delta, Soft Start, VSD)</li>
                  <li>• Protection relays and metering</li>
                  <li>• Control wiring and marshalling</li>
                  <li>• Earthing and neutral bars</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-elec-yellow font-medium mb-2">
                  MCC Standards
                </h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• BS EN 61439-1: General rules</li>
                  <li>• BS EN 61439-2: Power switchgear assemblies</li>
                  <li>• IEC 60947: Low-voltage switchgear</li>
                  <li>• IP ratings per BS EN 60529</li>
                  <li>• EMC compliance per BS EN 61000</li>
                  <li>• Arc fault containment to IEC 61641</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-2">
                <Zap className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-200 font-medium">
                    Fixed vs Withdrawable Units
                  </p>
                  <p className="text-gray-300 text-sm mt-1">
                    Withdrawable units allow circuit breakers and starters to be
                    racked into test, isolated, or removed positions without
                    affecting adjacent units. This reduces downtime and improves
                    safety during maintenance. Fixed units are more economical
                    but require section isolation for any work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Switchgear Types and Ratings */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">2</span>
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Switchgear Types and Ratings (ACB, MCCB, MCB)
            </h2>
          </div>

          <div className="bg-[#2d2d2d] rounded-lg p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Selecting the correct switchgear requires understanding current ratings,
              fault levels, and application requirements. The three main types each
              serve specific purposes in the distribution hierarchy.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-3 px-2 text-elec-yellow">Parameter</th>
                    <th className="text-left py-3 px-2 text-elec-yellow">MCB</th>
                    <th className="text-left py-3 px-2 text-elec-yellow">MCCB</th>
                    <th className="text-left py-3 px-2 text-elec-yellow">ACB</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-2">Current Range</td>
                    <td className="py-2 px-2">0.5A - 125A</td>
                    <td className="py-2 px-2">16A - 1600A</td>
                    <td className="py-2 px-2">800A - 6300A</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-2">Icu (Ultimate Breaking)</td>
                    <td className="py-2 px-2">Up to 10kA</td>
                    <td className="py-2 px-2">Up to 150kA</td>
                    <td className="py-2 px-2">Up to 150kA+</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-2">Typical Application</td>
                    <td className="py-2 px-2">Final circuits</td>
                    <td className="py-2 px-2">Sub-mains, feeders</td>
                    <td className="py-2 px-2">Main incomer</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-2">Adjustable Trip</td>
                    <td className="py-2 px-2">No (fixed curves)</td>
                    <td className="py-2 px-2">Some models</td>
                    <td className="py-2 px-2">Yes (electronic)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2">Withdrawable Option</td>
                    <td className="py-2 px-2">No</td>
                    <td className="py-2 px-2">Plug-in available</td>
                    <td className="py-2 px-2">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h4 className="text-elec-yellow font-medium mb-2">
                <Gauge className="w-4 h-4 inline mr-2" />
                Key Rating Parameters
              </h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>
                  <strong className="text-white">Icu</strong> - Ultimate short-circuit
                  breaking capacity: Maximum fault current the device can interrupt
                  (may sustain damage, test sequence O-CO)
                </li>
                <li>
                  <strong className="text-white">Ics</strong> - Service short-circuit
                  breaking capacity: Fault current device can interrupt and remain
                  serviceable (test sequence O-CO-CO)
                </li>
                <li>
                  <strong className="text-white">Icw</strong> - Rated short-time
                  withstand current: Current device can carry for specified time
                  (typically 1s) without damage
                </li>
                <li>
                  <strong className="text-white">Icm</strong> - Rated short-circuit
                  making capacity: Maximum asymmetric current device can close onto
                </li>
              </ul>
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

        {/* Section 3: Bus Bar Systems */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">3</span>
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
              <Network className="w-5 h-5" />
              Bus Bar Systems and Forms of Separation
            </h2>
          </div>

          <div className="bg-[#2d2d2d] rounded-lg p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Bus bars distribute power from the incomer to individual outgoing
              circuits. <strong className="text-white">BS EN 61439</strong> defines
              Forms of internal separation that determine how functional units,
              busbars, and terminals are segregated within the assembly.
            </p>

            <div className="space-y-3">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-gray-500">
                <h4 className="text-white font-medium">Form 1 - No Separation</h4>
                <p className="text-gray-400 text-sm mt-1">
                  No internal separation. Opening any door exposes all live parts.
                  Only suitable where complete isolation is always possible.
                  Lowest cost option.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-blue-500">
                <h4 className="text-white font-medium">Form 2a/2b - Busbar Separation</h4>
                <p className="text-gray-400 text-sm mt-1">
                  <strong>2a:</strong> Busbars separated from functional units.
                  <strong> 2b:</strong> Additionally, terminals separated from busbars.
                  Allows access to functional units with busbars energised.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-yellow-500">
                <h4 className="text-white font-medium">Form 3a/3b - Unit Separation</h4>
                <p className="text-gray-400 text-sm mt-1">
                  <strong>3a:</strong> Separation between functional units AND from busbars.
                  <strong> 3b:</strong> Additionally, terminals separated from busbars.
                  Individual units can be accessed independently.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-elec-yellow">
                <h4 className="text-white font-medium">Form 4a/4b - Full Separation</h4>
                <p className="text-gray-400 text-sm mt-1">
                  <strong>4a:</strong> All Form 3a separation PLUS terminals separated
                  from functional units. <strong> 4b:</strong> Terminals also separated
                  from each other. Maximum protection and arc fault containment.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h4 className="text-elec-yellow font-medium mb-2">
                Bus Bar Construction
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <p className="text-white font-medium">Copper Bus Bars</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Higher conductivity (100% IACS)</li>
                    <li>• Better for high fault levels</li>
                    <li>• Smaller cross-section required</li>
                    <li>• Higher material cost</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium">Aluminium Bus Bars</p>
                  <ul className="mt-1 space-y-1">
                    <li>• 61% conductivity vs copper</li>
                    <li>• Lighter weight</li>
                    <li>• Lower cost</li>
                    <li>• Requires larger cross-section</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Intelligent Switchgear */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">4</span>
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              Intelligent Switchgear and Communication
            </h2>
          </div>

          <div className="bg-[#2d2d2d] rounded-lg p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Modern MCCs incorporate intelligent electronic devices (IEDs) that
              provide advanced protection, monitoring, and communication capabilities.
              This enables integration with SCADA systems, predictive maintenance,
              and energy management.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-elec-yellow font-medium mb-2">
                  Communication Protocols
                </h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• <strong className="text-white">Modbus RTU</strong> - Serial RS485</li>
                  <li>• <strong className="text-white">Modbus TCP</strong> - Ethernet based</li>
                  <li>• <strong className="text-white">PROFIBUS</strong> - Industrial fieldbus</li>
                  <li>• <strong className="text-white">PROFINET</strong> - Industrial Ethernet</li>
                  <li>• <strong className="text-white">IEC 61850</strong> - Substation automation</li>
                  <li>• <strong className="text-white">EtherNet/IP</strong> - CIP protocol</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-elec-yellow font-medium mb-2">
                  Monitoring Capabilities
                </h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Real-time current, voltage, power</li>
                  <li>• Energy metering (kWh, kVArh)</li>
                  <li>• Power quality (THD, harmonics)</li>
                  <li>• Temperature monitoring</li>
                  <li>• Trip event recording</li>
                  <li>• Breaker wear monitoring</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <p className="text-blue-200 font-medium">IEC 61850 Benefits</p>
              <p className="text-gray-300 text-sm mt-1">
                IEC 61850 provides standardised data modelling, high-speed peer-to-peer
                GOOSE messaging for protection schemes, and sampled values for digital
                instrument transformers. This enables faster fault clearance, reduced
                wiring, and improved interoperability between vendors.
              </p>
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

        {/* Section 5: Arc Flash Hazards */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">5</span>
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Arc Flash Hazards and PPE Requirements
            </h2>
          </div>

          <div className="bg-[#2d2d2d] rounded-lg p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              An arc flash is an explosive release of energy caused by an electrical
              fault through air. Temperatures can reach 20,000°C, causing severe burns,
              blast injuries, and fatalities. <strong className="text-white">IEEE 1584</strong> provides
              methods for calculating incident energy levels.
            </p>

            <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-200 font-medium">Arc Flash Hazards</p>
                  <ul className="text-gray-300 text-sm mt-1 space-y-1">
                    <li>• Thermal burns from radiant heat and hot gases</li>
                    <li>• Pressure wave causing blast injuries</li>
                    <li>• Molten metal and shrapnel projectiles</li>
                    <li>• Intense light causing eye damage</li>
                    <li>• Toxic fumes from vaporised materials</li>
                    <li>• Hearing damage from explosive sound</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-3 px-2 text-elec-yellow">PPE Category</th>
                    <th className="text-left py-3 px-2 text-elec-yellow">Incident Energy</th>
                    <th className="text-left py-3 px-2 text-elec-yellow">Min ATPV</th>
                    <th className="text-left py-3 px-2 text-elec-yellow">Required PPE</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-2">Category 1</td>
                    <td className="py-2 px-2">1.2 - 4 cal/cm²</td>
                    <td className="py-2 px-2">4 cal/cm²</td>
                    <td className="py-2 px-2">AR shirt/trousers, safety glasses, face shield</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-2">Category 2</td>
                    <td className="py-2 px-2">4 - 8 cal/cm²</td>
                    <td className="py-2 px-2">8 cal/cm²</td>
                    <td className="py-2 px-2">AR shirt/trousers, flash suit hood, face shield</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-2">Category 3</td>
                    <td className="py-2 px-2">8 - 25 cal/cm²</td>
                    <td className="py-2 px-2">25 cal/cm²</td>
                    <td className="py-2 px-2">AR flash suit, hood with face shield, AR gloves</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-2">Category 4</td>
                    <td className="py-2 px-2">25 - 40 cal/cm²</td>
                    <td className="py-2 px-2">40 cal/cm²</td>
                    <td className="py-2 px-2">Multi-layer AR flash suit, full hood, AR gloves</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 text-red-400">&gt;40 cal/cm²</td>
                    <td className="py-2 px-2 text-red-400">Prohibited</td>
                    <td className="py-2 px-2 text-red-400">N/A</td>
                    <td className="py-2 px-2 text-red-400">Live work NOT permitted</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h4 className="text-elec-yellow font-medium mb-2">
                <HardHat className="w-4 h-4 inline mr-2" />
                UK Standards for Arc Flash PPE
              </h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• <strong className="text-white">IEC 61482-2</strong> - Arc flash protective clothing testing</li>
                <li>• <strong className="text-white">GS38</strong> - HSE guidance on electrical test equipment</li>
                <li>• <strong className="text-white">BS EN 166</strong> - Eye protection specifications</li>
                <li>• <strong className="text-white">BS EN 60903</strong> - Electrical insulating gloves</li>
                <li>• Arc-rated PPE must display ATPV or EBT rating in cal/cm²</li>
              </ul>
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

        {/* Section 6: Maintenance and Testing */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">6</span>
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Maintenance and Testing Requirements
            </h2>
          </div>

          <div className="bg-[#2d2d2d] rounded-lg p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Regular maintenance ensures switchgear operates safely and reliably.
              BS 7671 and manufacturer guidelines specify testing requirements.
              Maintenance regimes should be based on criticality, environment,
              and operating conditions.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-elec-yellow font-medium mb-2">
                  Routine Inspections
                </h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Visual inspection for damage/contamination</li>
                  <li>• Thermographic survey (annually)</li>
                  <li>• Check ventilation and cooling</li>
                  <li>• Verify indicator lights and displays</li>
                  <li>• Inspect door seals and IP rating</li>
                  <li>• Check earthing connections</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-elec-yellow font-medium mb-2">
                  Periodic Testing
                </h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Insulation resistance (minimum 1MΩ)</li>
                  <li>• Contact resistance measurement</li>
                  <li>• Primary injection testing</li>
                  <li>• Secondary injection for protection</li>
                  <li>• Breaker timing tests</li>
                  <li>• Functional operation checks</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h4 className="text-elec-yellow font-medium mb-2">
                Inspection Frequencies (BS 7671 Table 3A)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 px-2 text-gray-400">Installation Type</th>
                      <th className="text-left py-2 px-2 text-gray-400">Maximum Interval</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2">Industrial</td>
                      <td className="py-2 px-2">3 years</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2">Hospitals / Medical</td>
                      <td className="py-2 px-2">1 year</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-2">Fire alarms / Emergency lighting</td>
                      <td className="py-2 px-2">1 year</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2">Hazardous areas</td>
                      <td className="py-2 px-2">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
              <p className="text-yellow-200 font-medium">Primary Injection Testing</p>
              <p className="text-gray-300 text-sm mt-1">
                Primary injection tests verify that circuit breakers trip at the
                correct current values by injecting high current through the main
                contacts. This tests the complete protection system including CTs,
                wiring, and trip units. Typically performed during commissioning
                and every 3-6 years depending on criticality.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] rounded-lg p-6 border border-elec-yellow/30">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-elec-yellow">
              Quick Reference Card
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-2">Forms of Separation</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li><strong>Form 1:</strong> No internal separation</li>
                <li><strong>Form 2:</strong> Busbars separated from units</li>
                <li><strong>Form 3:</strong> + Separation between units</li>
                <li><strong>Form 4:</strong> + Terminals separated</li>
                <li><strong>a/b suffix:</strong> b = terminals from busbars</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-2">Switchgear Ratings</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li><strong>In:</strong> Rated current</li>
                <li><strong>Icu:</strong> Ultimate breaking capacity</li>
                <li><strong>Ics:</strong> Service breaking capacity</li>
                <li><strong>Icw:</strong> Short-time withstand</li>
                <li><strong>Icm:</strong> Making capacity</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-2">Arc Flash PPE Categories</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li><strong>Cat 1:</strong> 1.2-4 cal/cm² (4 ATPV)</li>
                <li><strong>Cat 2:</strong> 4-8 cal/cm² (8 ATPV)</li>
                <li><strong>Cat 3:</strong> 8-25 cal/cm² (25 ATPV)</li>
                <li><strong>Cat 4:</strong> 25-40 cal/cm² (40 ATPV)</li>
                <li><strong>&gt;40:</strong> Live work prohibited</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-2">Key Standards</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li><strong>BS EN 61439:</strong> LV switchgear assemblies</li>
                <li><strong>IEC 60947:</strong> LV switchgear devices</li>
                <li><strong>IEEE 1584:</strong> Arc flash calculations</li>
                <li><strong>IEC 61482:</strong> Arc flash PPE testing</li>
                <li><strong>BS 7671:</strong> Wiring Regulations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#2d2d2d] rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation"
                >
                  <span className="text-white font-medium pr-4">
                    {faq.question}
                  </span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow">
            Section Quiz
          </h3>
          <Quiz
            questions={quizQuestions}
            moduleId="industrial-electrical-m1s3"
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between pt-8 border-t border-gray-700">
          <Button
            variant="outline"
            onClick={() =>
              navigate('/upskilling/industrial-electrical-module-1-section-2')
            }
            className="min-h-[44px] touch-manipulation bg-transparent border-gray-600 text-white hover:bg-[#2d2d2d] hover:text-elec-yellow"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous: Section 2
          </Button>
          <Button
            onClick={() =>
              navigate('/upskilling/industrial-electrical-module-1-section-4')
            }
            className="min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            Next: Section 4
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule1Section3;
