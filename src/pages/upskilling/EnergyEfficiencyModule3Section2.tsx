import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Gauge,
  Wifi,
  Clock,
  Building2,
  GitBranch,
  CheckCircle2,
  BookOpen,
  AlertTriangle,
  Zap,
  FileSpreadsheet,
  Database,
  Settings,
  ClipboardList,
} from 'lucide-react';

const EnergyEfficiencyModule3Section2: React.FC = () => {
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const [expandedFAQs, setExpandedFAQs] = useState<number[]>([]);

  useSEO({
    title: 'Data Collection Methods - Energy Efficiency Module 3.2 | Elec-Mate',
    description:
      'Learn UK energy data collection techniques including manual meter reading, SMETS2 smart meters, DCC access, half-hourly data retrieval, BMS logs, and sub-metering strategies.',
    keywords: [
      'energy data collection',
      'smart meters UK',
      'SMETS2',
      'DCC',
      'CAD',
      'half-hourly data',
      'P272',
      'sub-metering',
      'BMS logs',
      'meter reading',
    ],
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-data-collection',
      question:
        'What is the primary advantage of SMETS2 meters over SMETS1 meters in the UK?',
      options: [
        'They use less electricity',
        'They can switch suppliers without losing smart functionality',
        'They are cheaper to install',
        'They only record monthly readings',
      ],
      correctIndex: 1,
      explanation:
        'SMETS2 meters communicate via the Data Communications Company (DCC) network, allowing them to maintain smart functionality when switching energy suppliers, unlike SMETS1 meters which often went "dumb" after switching.',
    },
    {
      id: 'qc2-data-collection',
      question:
        'Under P272, which business electricity meters require half-hourly settlement?',
      options: [
        'All business meters regardless of size',
        'Only meters with maximum demand over 1MW',
        'Profile Classes 05-08 (maximum demand over 100kW)',
        'Only meters with smart capability',
      ],
      correctIndex: 2,
      explanation:
        'P272 regulation mandates that Profile Classes 05-08 meters (those with maximum demand exceeding 100kW) must be settled on a half-hourly basis, requiring accurate HH data collection.',
    },
    {
      id: 'qc3-data-collection',
      question:
        'What does a Consumer Access Device (CAD) connect to for real-time energy data?',
      options: [
        'The electricity grid directly',
        'The Home Area Network (HAN) of the smart meter',
        'The internet via WiFi only',
        'The distribution network operator',
      ],
      correctIndex: 1,
      explanation:
        'A CAD connects to the smart meter\'s Home Area Network (HAN) using ZigBee protocol, allowing real-time access to consumption data without going through the supplier or DCC.',
    },
  ];

  const quizQuestions = [
    {
      question:
        'How often should manual meter readings be taken for effective energy monitoring in commercial premises?',
      options: [
        'Once per year for billing purposes',
        'Weekly or monthly depending on consumption patterns',
        'Only when the energy supplier requests',
        'Every five years during meter replacement',
      ],
      correctAnswer: 'Weekly or monthly depending on consumption patterns',
    },
    {
      question:
        'What is the standard data format for half-hourly electricity consumption data in the UK?',
      options: [
        'JSON files with timestamps',
        'D0010 and D0036 industry data flows',
        'Simple CSV with date and usage columns',
        'PDF reports from suppliers',
      ],
      correctAnswer: 'D0010 and D0036 industry data flows',
    },
    {
      question:
        'What information should be recorded alongside a manual meter reading?',
      options: [
        'Only the kWh value displayed',
        'Date, time, meter serial number, reading value, and any anomalies',
        'Just the date and reading',
        'The weather conditions only',
      ],
      correctAnswer:
        'Date, time, meter serial number, reading value, and any anomalies',
    },
    {
      question:
        'Which protocol do SMETS2 smart meters use for the Home Area Network?',
      options: ['WiFi 6', 'Bluetooth Low Energy', 'ZigBee', 'LoRaWAN'],
      correctAnswer: 'ZigBee',
    },
    {
      question:
        'What is the typical data resolution available from UK smart meters for domestic properties?',
      options: [
        'Hourly readings only',
        'Half-hourly readings',
        'Daily totals',
        '15-minute intervals',
      ],
      correctAnswer: 'Half-hourly readings',
    },
    {
      question: 'When validating energy data, what indicates a potential meter fault?',
      options: [
        'Readings that increase over time',
        'Negative consumption values or sudden reading reversals',
        'Higher usage during working hours',
        'Seasonal variations in consumption',
      ],
      correctAnswer: 'Negative consumption values or sudden reading reversals',
    },
    {
      question:
        'What is the recommended approach for sub-meter placement in a commercial building?',
      options: [
        'One meter at the main incomer only',
        'Meters on each major load type and floor/zone',
        'Random placement throughout the building',
        'Only on lighting circuits',
      ],
      correctAnswer: 'Meters on each major load type and floor/zone',
    },
    {
      question:
        'How can Building Management System data complement electricity meter data?',
      options: [
        'BMS data is not relevant to energy analysis',
        'It provides context like occupancy, temperatures, and equipment schedules',
        'It replaces the need for electricity meters',
        'It only monitors fire alarms',
      ],
      correctAnswer:
        'It provides context like occupancy, temperatures, and equipment schedules',
    },
    {
      question:
        'What is the Data Communications Company (DCC) role in UK smart metering?',
      options: [
        'Manufacturing smart meters',
        'Providing the secure network linking smart meters to energy suppliers',
        'Setting electricity prices',
        'Installing meters in homes',
      ],
      correctAnswer:
        'Providing the secure network linking smart meters to energy suppliers',
    },
    {
      question:
        'Which data cleaning technique helps identify outliers in energy consumption data?',
      options: [
        'Deleting all data and starting fresh',
        'Statistical analysis using standard deviation and percentile methods',
        'Ignoring any unusual values',
        'Averaging all readings to a single value',
      ],
      correctAnswer:
        'Statistical analysis using standard deviation and percentile methods',
    },
  ];

  const faqs = [
    {
      question: 'How do I access half-hourly data from my smart meter as a consumer?',
      answer:
        'You can request your half-hourly data directly from your energy supplier, who must provide it free of charge within 10 working days under Ofgem rules. Alternatively, use a Consumer Access Device (CAD) to access real-time data via the meter\'s Home Area Network, or register with the Smart Energy GB data access service. Some suppliers also offer online portals or apps where you can download your consumption data in CSV format.',
    },
    {
      question: 'What is the difference between SMETS1 and SMETS2 meters?',
      answer:
        'SMETS1 meters were the first generation, communicating directly with specific suppliers using proprietary systems. When you switched supplier, they often lost smart functionality. SMETS2 meters use the centralised Data Communications Company (DCC) network, maintaining smart functionality regardless of supplier. SMETS2 also offers better security, standardised communication protocols, and support for prepayment switching. Most SMETS1 meters are now being enrolled into the DCC network to provide similar functionality.',
    },
    {
      question: 'How accurate are sub-meters compared to fiscal meters?',
      answer:
        'Fiscal (billing) meters must comply with MID (Measuring Instruments Directive) standards with accuracy of ±2% for active energy. Sub-meters for internal monitoring may have varying accuracy classes - Class 1 (±1%) is common for high-value monitoring points, while Class 2 (±2%) is acceptable for general load breakdown. CT-connected sub-meters accuracy also depends on correct CT ratio selection and installation. Regular calibration checks are recommended, especially for sub-meters used in tenant billing or ESOS reporting.',
    },
    {
      question: 'What BMS data points are most valuable for energy analysis?',
      answer:
        'Key BMS data points include: HVAC system status and setpoints, zone temperatures and humidity, occupancy sensor states, lighting control states, AHU supply/return temperatures, chiller and boiler operational data, building mode schedules (occupied/unoccupied), and any demand response signals. Correlating this data with electricity consumption helps identify whether systems operate efficiently and highlights opportunities like reducing out-of-hours operation or optimising setpoints.',
    },
    {
      question: 'How should I handle gaps in energy consumption data?',
      answer:
        'First, document the gap with its duration and likely cause (meter fault, communication failure, etc.). For short gaps (under 24 hours), linear interpolation between known readings is acceptable. For longer gaps, use historical data from the same period in previous weeks, adjusting for known differences like weather or occupancy. Always flag interpolated data in your analysis. For regulatory reporting like ESOS, consult guidance on acceptable estimation methods and document your methodology.',
    },
    {
      question: 'What are P272 requirements and who do they affect?',
      answer:
        'P272 is an Ofgem-mandated change requiring electricity meters in Profile Classes 05-08 (typically businesses with maximum demand over 100kW) to be settled on actual half-hourly consumption data rather than estimated profiles. This affects how businesses are billed - charges reflect when electricity is used, not just how much. Affected businesses need meters capable of recording and transmitting half-hourly data. While increasing billing accuracy, it also provides valuable data for energy management and demand-side response opportunities.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-b border-gray-700 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Module 3: Energy Monitoring & Data Analysis</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-elec-yellow mb-2">
            Section 2: Data Collection
          </h1>
          <p className="text-gray-300">
            Manual, Smart Meters, and Building Management System Logs
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Introduction */}
        <div className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
          <div className="flex items-start gap-4">
            <Database className="w-8 h-8 text-elec-yellow flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-elec-yellow mb-3">
                Introduction to Energy Data Collection
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Effective energy management begins with reliable data collection. This section
                covers the practical methods for gathering energy consumption data in UK
                buildings, from traditional manual readings to modern smart meter systems and
                building management logs. Understanding these data sources and their
                characteristics is essential for accurate energy analysis and identifying
                efficiency opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Manual Meter Reading */}
        <section className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              1
            </div>
            <Gauge className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">
              Manual Meter Reading Techniques and Schedules
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Despite the rollout of smart meters, manual reading remains important for
              sub-meters, backup verification, and legacy installations. Accurate manual
              reading requires systematic approach and proper documentation.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">
                Best Practice Reading Procedure
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Record the date and exact time of reading (to the minute)</li>
                <li>Note the meter serial number (MPAN for electricity, MPRN for gas)</li>
                <li>Read all register values, including reactive power if available</li>
                <li>
                  Photograph the meter display for verification and dispute resolution
                </li>
                <li>Check for any error codes or warning indicators on the display</li>
                <li>Note the meter multiplier (CT ratio) if applicable</li>
                <li>Record ambient conditions if relevant (temperature for gas correction)</li>
              </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-elec-yellow font-medium mb-2">
                  Recommended Reading Schedules
                </h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <span className="text-white">High consumption sites:</span> Weekly
                  </li>
                  <li>
                    <span className="text-white">Medium sites:</span> Fortnightly
                  </li>
                  <li>
                    <span className="text-white">Low consumption:</span> Monthly
                  </li>
                  <li>
                    <span className="text-white">Sub-meters:</span> Match main meter frequency
                  </li>
                  <li>
                    <span className="text-white">Consistency:</span> Same day/time each period
                  </li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-elec-yellow font-medium mb-2">
                  Common Reading Errors to Avoid
                </h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <span className="text-red-400">✗</span> Transposing digits (1234 vs 1243)
                  </li>
                  <li>
                    <span className="text-red-400">✗</span> Missing decimal places
                  </li>
                  <li>
                    <span className="text-red-400">✗</span> Reading wrong register (day/night)
                  </li>
                  <li>
                    <span className="text-red-400">✗</span> Forgetting CT multiplier
                  </li>
                  <li>
                    <span className="text-red-400">✗</span> Inconsistent reading times
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-yellow-500 font-medium">CT-Connected Meters</h4>
                  <p className="text-sm mt-1">
                    For meters using Current Transformers, always multiply the displayed
                    reading by the CT ratio. A meter showing 1,000 kWh with 200:5 CTs actually
                    represents 40,000 kWh (1,000 × 40).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: UK Smart Meter Data Access */}
        <section className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              2
            </div>
            <Wifi className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">
              UK Smart Meter Data Access (SMETS2, DCC, CAD)
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              The UK's smart metering infrastructure provides multiple routes to access
              consumption data. Understanding these pathways is crucial for implementing
              effective energy monitoring systems.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">
                SMETS2 Architecture Overview
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 rounded px-2 py-1 text-xs font-medium">HAN</div>
                  <p>
                    <strong>Home Area Network:</strong> ZigBee-based local network connecting
                    meter, IHD (In-Home Display), and authorised CADs within the property.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-600 rounded px-2 py-1 text-xs font-medium">WAN</div>
                  <p>
                    <strong>Wide Area Network:</strong> Connects meters to the DCC via cellular
                    (majority) or mesh radio network (some rural areas).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 rounded px-2 py-1 text-xs font-medium">DCC</div>
                  <p>
                    <strong>Data Communications Company:</strong> Central hub providing secure
                    data exchange between meters, suppliers, and authorised third parties.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-elec-yellow font-medium mb-2">
                  Consumer Access Device (CAD)
                </h4>
                <p className="text-sm mb-2">
                  A CAD connects directly to your smart meter's HAN, providing real-time
                  consumption data without supplier involvement:
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Requires pairing with meter via supplier request</li>
                  <li>• Uses ZigBee Smart Energy Profile</li>
                  <li>• Updates every 10 seconds typically</li>
                  <li>• Popular devices: Glow, Hildebrand, Loop</li>
                  <li>• Data available via local API or cloud service</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-elec-yellow font-medium mb-2">
                  Data Access Routes
                </h4>
                <ul className="text-sm space-y-2">
                  <li>
                    <strong>Via Supplier:</strong> Request HH data (free, 10 working days)
                  </li>
                  <li>
                    <strong>Smart Energy GB:</strong> Consumer data access portal
                  </li>
                  <li>
                    <strong>CAD + Cloud:</strong> Real-time via device manufacturer's API
                  </li>
                  <li>
                    <strong>DCC Access:</strong> For authorised parties (complex, licenced)
                  </li>
                  <li>
                    <strong>Supplier Apps:</strong> Octopus, Bulb, OVO offer data downloads
                  </li>
                </ul>
              </div>
            </div>

            <InlineCheck
              id={quickCheckQuestions[0].id}
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>
        </section>

        {/* Section 3: Half-Hourly Data */}
        <section className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              3
            </div>
            <Clock className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">
              Half-Hourly Data Retrieval and Analysis
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Half-hourly (HH) data provides granular insight into consumption patterns,
              enabling detailed analysis of peak demand, baseload, and time-of-use
              optimisation opportunities.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">
                P272 and Half-Hourly Settlement
              </h3>
              <p className="text-sm mb-3">
                Ofgem's P272 modification requires larger business meters (Profile Classes
                05-08, typically &gt;100kW maximum demand) to be settled on actual half-hourly
                data rather than estimated profiles. This provides:
              </p>
              <ul className="text-sm space-y-1">
                <li>
                  <span className="text-green-400">✓</span> Accurate billing based on actual
                  consumption times
                </li>
                <li>
                  <span className="text-green-400">✓</span> Incentive to shift load away from
                  expensive periods (Triads, Red zones)
                </li>
                <li>
                  <span className="text-green-400">✓</span> Detailed data for energy management
                </li>
                <li>
                  <span className="text-green-400">✓</span> Demand-side response opportunities
                </li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">
                UK Industry Data Flows
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 text-elec-yellow">Data Flow</th>
                      <th className="text-left py-2 text-elec-yellow">Purpose</th>
                      <th className="text-left py-2 text-elec-yellow">Content</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-2 font-mono">D0010</td>
                      <td className="py-2">Meter readings request</td>
                      <td className="py-2">Supplier to DC/DA</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 font-mono">D0036</td>
                      <td className="py-2">Validated HH data</td>
                      <td className="py-2">48 periods per day + reactive</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 font-mono">D0019</td>
                      <td className="py-2">Metering system fault</td>
                      <td className="py-2">Error notifications</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono">D0275</td>
                      <td className="py-2">Actual HH data</td>
                      <td className="py-2">Raw meter data</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-elec-yellow font-medium mb-2">
                  Obtaining HH Data
                </h4>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Request from your electricity supplier</li>
                  <li>Contact your Meter Operator (MOP)</li>
                  <li>Use bureau services (AMR providers)</li>
                  <li>Access via energy management platforms</li>
                  <li>Request D0036 flows from Data Collector</li>
                </ol>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-elec-yellow font-medium mb-2">
                  Analysis Opportunities
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• Identify baseload (minimum overnight consumption)</li>
                  <li>• Peak demand timing and magnitude</li>
                  <li>• Weekend vs weekday patterns</li>
                  <li>• Seasonal variations</li>
                  <li>• Correlation with production/occupancy</li>
                </ul>
              </div>
            </div>

            <InlineCheck
              id={quickCheckQuestions[1].id}
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>
        </section>

        {/* Section 4: BMS Logs */}
        <section className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              4
            </div>
            <Building2 className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">
              Building Management System Logs and Exports
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Building Management Systems (BMS) provide contextual data essential for
              understanding energy consumption patterns. Integrating BMS data with meter
              readings enables sophisticated analysis of building performance.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">
                Key BMS Data Points for Energy Analysis
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-medium mb-2">HVAC Systems</h4>
                  <ul className="text-sm space-y-1">
                    <li>• AHU run status and speeds</li>
                    <li>• Zone temperature setpoints and actuals</li>
                    <li>• Chiller/boiler operation logs</li>
                    <li>• Damper and valve positions</li>
                    <li>• Supply/return air temperatures</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Building Systems</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Occupancy sensor states</li>
                    <li>• Lighting levels and schedules</li>
                    <li>• Access control data (people counting)</li>
                    <li>• Lift/escalator operation</li>
                    <li>• Time schedules (occupied/unoccupied)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">
                Data Export Methods
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FileSpreadsheet className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Manual Export:</strong>
                    <p className="text-sm">
                      CSV/Excel export from BMS front-end. Suitable for periodic analysis
                      but labour-intensive for continuous monitoring.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Database Connection:</strong>
                    <p className="text-sm">
                      Direct SQL connection to BMS historian. Enables automated data
                      extraction for analytics platforms.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">API Integration:</strong>
                    <p className="text-sm">
                      Modern BMS platforms (e.g., Trend IQ4, Honeywell Niagara) offer REST
                      APIs for real-time data access and integration.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">BACnet/Modbus:</strong>
                    <p className="text-sm">
                      Protocol-level integration for adding energy meters directly to BMS
                      or extracting data to third-party systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2">Integration Tip</h4>
              <p className="text-sm">
                When correlating BMS data with energy consumption, ensure timestamps are
                synchronised. BMS systems may use local time while meter data uses UTC.
                A 1-hour offset during BST can significantly skew analysis results.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Sub-Metering */}
        <section className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              5
            </div>
            <GitBranch className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">
              Sub-Metering Strategies and Placement
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Sub-metering provides the granular data needed to identify specific energy
              efficiency opportunities. Strategic placement maximises insight while
              managing installation costs.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">
                Sub-Metering Hierarchy
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-elec-yellow rounded-full"></div>
                  <span>
                    <strong>Level 1:</strong> Main incomer (fiscal meter) - Total site
                    consumption
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="w-2.5 h-2.5 bg-blue-400 rounded-full"></div>
                  <span>
                    <strong>Level 2:</strong> Distribution boards - Major load categories
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-8">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>
                    <strong>Level 3:</strong> End-use circuits - Specific equipment/zones
                  </span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-elec-yellow font-medium mb-2">
                  Priority Metering Points
                </h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <span className="text-green-400">■</span> HVAC plant (chillers, AHUs, pumps)
                  </li>
                  <li>
                    <span className="text-green-400">■</span> Lighting circuits by zone
                  </li>
                  <li>
                    <span className="text-green-400">■</span> Server rooms/IT loads
                  </li>
                  <li>
                    <span className="text-green-400">■</span> Production equipment
                  </li>
                  <li>
                    <span className="text-green-400">■</span> Catering/kitchen facilities
                  </li>
                  <li>
                    <span className="text-green-400">■</span> Tenant/department areas</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-elec-yellow font-medium mb-2">
                  Sub-Meter Selection Criteria
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• Accuracy class (MID Class 1 or 2)</li>
                  <li>• Communication protocol (Modbus, M-Bus, Pulse)</li>
                  <li>• CT or direct connected</li>
                  <li>• Single or three-phase measurement</li>
                  <li>• Parameters: kWh, kVArh, kVA, PF</li>
                  <li>• Data logging interval capability</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">
                CIBSE TM39 Sub-Metering Guidance
              </h3>
              <p className="text-sm mb-2">
                CIBSE Technical Memorandum 39 recommends sub-metering to cover at least:
              </p>
              <ul className="text-sm space-y-1">
                <li>• 90% of estimated annual energy consumption</li>
                <li>• All loads greater than 10% of total building consumption</li>
                <li>• Separately controlled lighting zones</li>
                <li>• Each major piece of HVAC equipment</li>
                <li>• Tenanted areas for recharge purposes</li>
              </ul>
            </div>

            <InlineCheck
              id={quickCheckQuestions[2].id}
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>
        </section>

        {/* Section 6: Data Validation */}
        <section className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              6
            </div>
            <CheckCircle2 className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">
              Data Validation and Cleaning Techniques
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Raw energy data often contains errors, gaps, and anomalies that must be
              identified and addressed before analysis. Robust validation ensures reliable
              conclusions and recommendations.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">
                Common Data Quality Issues
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Completeness Issues</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Missing readings (communication failures)</li>
                    <li>• Gaps in time series data</li>
                    <li>• Incomplete HH periods</li>
                    <li>• Missing meter channels</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Accuracy Issues</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Meter register rollovers</li>
                    <li>• CT ratio errors</li>
                    <li>• Timestamp synchronisation problems</li>
                    <li>• Unit conversion errors (kWh vs MWh)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">
                Validation Techniques
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-white font-medium mb-1">Range Checks</h4>
                  <p className="text-sm">
                    Verify readings fall within expected bounds. Flag values exceeding
                    maximum demand or below zero (unless export meter).
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Consistency Checks</h4>
                  <p className="text-sm">
                    Compare cumulative readings - each must be greater than or equal to the
                    previous. Check sub-meter sum approximates main meter reading.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Statistical Outlier Detection</h4>
                  <p className="text-sm">
                    Use standard deviation (flag values &gt;3σ from mean) or interquartile
                    range (values below Q1-1.5×IQR or above Q3+1.5×IQR) to identify anomalies.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Pattern Validation</h4>
                  <p className="text-sm">
                    Compare current period to historical patterns. Unexpected baseload
                    changes or absent weekday/weekend differentiation may indicate issues.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-elec-yellow font-medium mb-2">
                  Gap Filling Methods
                </h4>
                <ul className="text-sm space-y-2">
                  <li>
                    <strong>Linear interpolation:</strong> For gaps under 2 hours
                  </li>
                  <li>
                    <strong>Historical substitution:</strong> Same period from previous week
                  </li>
                  <li>
                    <strong>Regression models:</strong> Based on related variables (weather,
                    occupancy)
                  </li>
                  <li>
                    <strong>Mark as estimated:</strong> Always flag interpolated data
                  </li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-elec-yellow font-medium mb-2">
                  Documentation Requirements
                </h4>
                <ul className="text-sm space-y-2">
                  <li>• Log all data corrections with timestamp</li>
                  <li>• Record original values before modification</li>
                  <li>• Note method used for estimation/correction</li>
                  <li>• Maintain audit trail for ESOS compliance</li>
                  <li>• Flag data quality in reports</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-500 font-medium">Meter Fault Indicators</h4>
                  <p className="text-sm mt-1">
                    Investigate immediately if you observe: negative consumption values,
                    readings decreasing over time, consumption during confirmed shutdown
                    periods, or sudden persistent step changes in baseload without
                    corresponding operational changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-lg p-6 border-2 border-elec-yellow">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-elec-yellow">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-medium mb-2">Data Collection Checklist</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>□ Identify all meters (main + sub-meters)</li>
                <li>□ Record MPAN/MPRN numbers</li>
                <li>□ Note CT ratios and multipliers</li>
                <li>□ Establish reading schedule</li>
                <li>□ Set up smart meter data access</li>
                <li>□ Configure BMS data export</li>
                <li>□ Define validation rules</li>
                <li>□ Create data storage structure</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Key UK Standards & Codes</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>
                  <strong>P272:</strong> Half-hourly settlement for large supplies
                </li>
                <li>
                  <strong>MID:</strong> Measuring Instruments Directive accuracy
                </li>
                <li>
                  <strong>CIBSE TM39:</strong> Sub-metering guidance
                </li>
                <li>
                  <strong>D-flows:</strong> Industry data formats (D0010, D0036)
                </li>
                <li>
                  <strong>SMETS2:</strong> Second generation smart meter spec
                </li>
                <li>
                  <strong>ESOS:</strong> Energy audit documentation requirements
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Smart Meter Data Routes</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>1. Request from supplier (free, 10 days)</li>
                <li>2. Consumer Access Device (real-time)</li>
                <li>3. Supplier app/portal download</li>
                <li>4. Smart Energy GB access service</li>
                <li>5. DCC licensed party access</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Data Validation Rules</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Readings must increase (cumulative)</li>
                <li>• Values within expected range</li>
                <li>• No gaps &gt;2% of period</li>
                <li>• Sub-meters ≈ main meter ±5%</li>
                <li>• Timestamps in correct timezone</li>
                <li>• All estimated data flagged</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-lg border border-gray-600 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation hover:bg-[#252525] transition-colors"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQs.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQs.includes(index) && (
                  <div className="px-4 pb-4 text-gray-300 text-sm leading-relaxed border-t border-gray-700 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-elec-yellow">
              Knowledge Check Quiz
            </h2>
            <Button
              onClick={() => setShowQuiz(!showQuiz)}
              className="bg-elec-yellow text-black hover:bg-yellow-500 min-h-[44px] touch-manipulation"
            >
              {showQuiz ? 'Hide Quiz' : 'Start Quiz'}
            </Button>
          </div>

          {showQuiz && (
            <Quiz
              questions={quizQuestions}
              moduleId="energy-efficiency-m3s2"
              onComplete={(score) => {
                console.log(`Quiz completed with score: ${score}/${quizQuestions.length}`);
              }}
            />
          )}
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-700">
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-3/section-1')}
            variant="outline"
            className="flex items-center justify-center gap-2 min-h-[44px] touch-manipulation border-gray-600 text-white hover:bg-[#2a2a2a] hover:text-elec-yellow"
          >
            <ChevronLeft className="w-5 h-5" />
            <div className="text-left">
              <div className="text-xs text-gray-400">Previous</div>
              <div className="text-sm">Section 1: Energy Audit Fundamentals</div>
            </div>
          </Button>

          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-3/section-3')}
            className="flex items-center justify-center gap-2 min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-yellow-500"
          >
            <div className="text-right">
              <div className="text-xs opacity-75">Next</div>
              <div className="text-sm">Section 3: Analysis Techniques</div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule3Section2;
