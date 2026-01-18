import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Quiz from '@/components/apprentice-courses/Quiz';
import InlineCheck from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import {
  ArrowLeft,
  ClipboardCheck,
  Gauge,
  Thermometer,
  Activity,
  FileText,
  Settings,
  AlertTriangle,
  CheckCircle,
  Zap,
  BookOpen,
} from 'lucide-react';

const IndustrialElectricalModule2Section6: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Motor Commissioning and Load Testing | Industrial Electrical Module 2 Section 6',
    description:
      'Learn comprehensive motor commissioning procedures including pre-commissioning checks, insulation resistance testing, no-load tests, vibration analysis, load testing, and documentation requirements per BS 7671.',
    keywords: [
      'motor commissioning',
      'load testing',
      'insulation resistance testing',
      'IR testing',
      'vibration analysis',
      'ISO 10816',
      'BS 7671',
      'motor testing',
      'thermal imaging',
      'bearing temperature',
      'industrial electrical',
    ],
    canonicalUrl: '/study-centre/upskilling/industrial-electrical/module-2/section-6',
  });

  const quickCheckQuestions = [
    {
      id: 'qc1',
      question:
        'What is the minimum acceptable insulation resistance value for a motor according to BS 7671?',
      options: ['0.5 MΩ', '1 MΩ', '2 MΩ', '5 MΩ'],
      correctIndex: 1,
      explanation:
        'BS 7671 specifies a minimum insulation resistance of 1 MΩ for motors. Values below this indicate potential insulation degradation and the motor should not be energised until the fault is rectified.',
    },
    {
      id: 'qc2',
      question:
        'During a no-load test, what percentage of full load current is typically expected for a healthy induction motor?',
      options: ['10-20%', '25-50%', '60-80%', '90-100%'],
      correctIndex: 1,
      explanation:
        'A healthy induction motor typically draws 25-50% of its full load current when running unloaded. Higher values may indicate mechanical issues such as bearing problems or misalignment.',
    },
    {
      id: 'qc3',
      question:
        'According to ISO 10816, what vibration velocity (mm/s RMS) would indicate an unacceptable condition for a medium-sized motor?',
      options: ['Below 1.8 mm/s', '1.8-4.5 mm/s', '4.5-7.1 mm/s', 'Above 7.1 mm/s'],
      correctIndex: 3,
      explanation:
        'ISO 10816 classifies vibration above 7.1 mm/s RMS as unacceptable for medium-sized rotating machines. This level indicates potential damage and requires immediate attention before continued operation.',
    },
  ];

  const quizQuestions = [
    {
      question: 'What voltage should typically be used for insulation resistance testing on a 400V motor?',
      options: ['250V DC', '500V DC', '1000V DC', '2500V DC'],
      correctAnswer: '500V DC',
    },
    {
      question: 'Before conducting IR testing on a motor with a VSD, what essential step must be taken?',
      options: [
        'Run the motor at half speed',
        'Disconnect the motor from the VSD',
        'Increase the test voltage',
        'Short circuit the motor terminals',
      ],
      correctAnswer: 'Disconnect the motor from the VSD',
    },
    {
      question: 'What is the primary purpose of a locked rotor current test?',
      options: [
        'Measure insulation resistance',
        'Verify starting current and protection settings',
        'Check vibration levels',
        'Measure bearing temperature',
      ],
      correctAnswer: 'Verify starting current and protection settings',
    },
    {
      question: 'At what bearing temperature rise above ambient should immediate investigation be triggered?',
      options: ['20°C', '30°C', '40°C', '50°C'],
      correctAnswer: '40°C',
    },
    {
      question: 'During commissioning, motor rotation direction should be verified using which method first?',
      options: [
        'Running the motor at full speed',
        'Phase rotation meter before starting',
        'Visual inspection only',
        'Thermal imaging',
      ],
      correctAnswer: 'Phase rotation meter before starting',
    },
    {
      question: 'What documentation must be completed as per BS 7671 Schedule of Test Results?',
      options: [
        'Only insulation resistance values',
        'Continuity, IR, and polarity tests only',
        'All test results including IR, continuity, polarity, and functional tests',
        'Manufacturer specifications only',
      ],
      correctAnswer: 'All test results including IR, continuity, polarity, and functional tests',
    },
    {
      question: 'The Polarisation Index (PI) test compares IR readings taken at which time intervals?',
      options: [
        '30 seconds and 1 minute',
        '1 minute and 10 minutes',
        '10 minutes and 30 minutes',
        '1 minute and 5 minutes',
      ],
      correctAnswer: '1 minute and 10 minutes',
    },
    {
      question: 'What is the acceptable Polarisation Index value for healthy motor insulation?',
      options: ['Less than 1.0', 'Between 1.0 and 2.0', 'Greater than 2.0', 'Exactly 1.5'],
      correctAnswer: 'Greater than 2.0',
    },
    {
      question: 'During load testing, current imbalance between phases should not exceed:',
      options: ['2%', '5%', '10%', '15%'],
      correctAnswer: '5%',
    },
    {
      question: 'When using thermal imaging during commissioning, hot spots should not exceed the motor winding temperature rise class limit plus:',
      options: ['10°C', '20°C', '30°C', '40°C'],
      correctAnswer: '10°C',
    },
  ];

  const faqItems = [
    {
      question: 'Why must motors be isolated from VSDs before IR testing?',
      answer:
        'Variable Speed Drives (VSDs) contain sensitive electronic components including IGBTs, capacitors, and control circuits that can be permanently damaged by the high DC test voltages used in insulation resistance testing (typically 500V-1000V DC). The VSD output terminals should be disconnected from the motor cables, and the test performed between motor windings and earth. Always follow the VSD manufacturer\'s guidelines and ensure all capacitors are discharged before testing.',
    },
    {
      question: 'How do environmental conditions affect insulation resistance readings?',
      answer:
        'Temperature and humidity significantly impact IR values. Insulation resistance approximately halves for every 10°C increase in temperature. High humidity can cause surface leakage currents, reducing apparent IR values. BS 7671 recommends testing at temperatures above 10°C and correcting readings to a standard reference temperature (typically 40°C) using correction factors. Motors stored in damp conditions may require drying out before achieving acceptable IR values.',
    },
    {
      question: 'What vibration sources are typically identified during motor commissioning?',
      answer:
        'Common vibration sources include: mechanical imbalance (rotor or coupling), misalignment (angular or parallel), bearing defects (wear, inadequate lubrication, installation damage), loose foundation bolts or mounting, electrical issues (unbalanced supply, broken rotor bars, air gap eccentricity), and resonance with supporting structures. Each source produces characteristic vibration signatures that can be identified using spectrum analysis.',
    },
    {
      question: 'When should thermal imaging be performed during commissioning?',
      answer:
        'Thermal imaging should be performed after the motor has reached thermal equilibrium, typically 1-2 hours of operation at full load. Initial scans should establish baseline thermal patterns for future comparison. Key areas to monitor include: terminal connections (high resistance joints), motor frame (uniform heat distribution), bearing housings (compared to frame temperature), and cooling fan effectiveness. Any hot spots exceeding normal operating temperature by more than 10-15°C require investigation.',
    },
    {
      question: 'What records are required for motor commissioning handover?',
      answer:
        'Complete commissioning documentation should include: Electrical Installation Certificate and Schedule of Test Results (BS 7671), IR test results with temperature and humidity conditions, no-load and full-load current readings for all phases, vibration baseline measurements with locations identified, thermal imaging baseline images, bearing temperature records, motor nameplate data verification, protection relay settings confirmation, rotation direction verification, and any deviations or remedial actions taken. These records form part of the operation and maintenance manual.',
    },
    {
      question: 'How is the Polarisation Index used to assess motor condition?',
      answer:
        'The Polarisation Index (PI) is the ratio of IR readings taken at 10 minutes to 1 minute. It indicates insulation condition independent of temperature: PI &lt; 1.0 indicates dangerous contamination or moisture; PI 1.0-2.0 suggests questionable insulation requiring investigation; PI 2.0-4.0 indicates good insulation condition; PI &gt; 4.0 indicates excellent dry insulation. The PI test is particularly valuable for large motors and those that have been in storage, as it reveals moisture absorption or contamination that a single IR reading might miss.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="/electrician/upskilling/industrial-electrical-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">Module 2 &gt; Section 6</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10">
            <Settings className="w-8 h-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Motor Commissioning and Load Testing</h1>
          <p className="text-muted-foreground">
            Complete guide to motor verification, testing procedures, and documentation per BS 7671
          </p>
        </div>

        {/* Section Overview */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-semibold text-foreground mb-2">Section Overview</h2>
              <p className="text-sm text-muted-foreground">
                Motor commissioning is a critical process that ensures safe and reliable operation
                throughout the motor's service life. This section covers the systematic approach to
                commissioning, from pre-energisation checks through to full load testing and handover
                documentation. All procedures align with BS 7671, IEEE 43 for insulation testing, and
                ISO 10816 for vibration assessment.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Pre-commissioning Checks */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Pre-Commissioning Checks and Inspections
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <div className="flex items-start gap-3 mb-4">
              <ClipboardCheck className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Before any electrical testing, thorough mechanical and visual inspections must be
                completed to identify potential issues and ensure safety during commissioning.
              </p>
            </div>

            <h3 className="font-medium text-foreground mb-3">
              BS 7671 Initial Verification Requirements
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Regulation 134.2 requires initial verification of all new installations before being
              brought into service. For motors, this includes verification that the installation
              complies with the design, is correctly installed, and is safe for energisation.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-background/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Mechanical Checks
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>- Foundation bolts torqued to specification</li>
                  <li>- Coupling alignment within tolerance (plus or minus 0.05mm)</li>
                  <li>- Guards and covers correctly fitted</li>
                  <li>- Cooling air pathways clear</li>
                  <li>- Shaft rotation free without binding</li>
                  <li>- Nameplate data recorded and verified</li>
                  <li>- Lubrication points serviced</li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow" />
                  Electrical Checks
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>- Cable sizing matches motor FLC rating</li>
                  <li>- Terminal connections tight and correct</li>
                  <li>- Earth continuity verified (R &lt;= 0.5 ohm)</li>
                  <li>- Cable armour/screen earthed correctly</li>
                  <li>- Overload relay set to motor FLC</li>
                  <li>- Control circuit wiring verified</li>
                  <li>- Isolator locked off and tagged</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-300 mb-1">Pre-Energisation Safety</h4>
                  <p className="text-sm text-muted-foreground">
                    Never energise a motor without completing ALL pre-commissioning checks. The
                    commissioning engineer should sign off each checklist item before proceeding to
                    electrical testing. Any defects must be rectified before energisation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Insulation Resistance Testing */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Insulation Resistance Testing (IR) for Motors
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <div className="flex items-start gap-3 mb-4">
              <Gauge className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Insulation resistance testing is the primary method to verify winding integrity and
                detect moisture ingress, contamination, or insulation breakdown before energisation.
              </p>
            </div>

            <h3 className="font-medium text-foreground mb-3">BS 7671 Minimum Values</h3>
            <div className="bg-background/50 rounded-lg p-4 mb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-elec-yellow border-b border-white/10">
                      <th className="text-left py-2">Circuit Voltage</th>
                      <th className="text-left py-2">Test Voltage (DC)</th>
                      <th className="text-left py-2">Minimum IR Value</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-white/5">
                      <td className="py-2">Up to 500V</td>
                      <td className="py-2">500V</td>
                      <td className="py-2 font-semibold text-green-400">&gt;= 1 M ohm</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">500V to 1000V</td>
                      <td className="py-2">1000V</td>
                      <td className="py-2 font-semibold text-green-400">&gt;= 1 M ohm</td>
                    </tr>
                    <tr>
                      <td className="py-2">Above 1000V</td>
                      <td className="py-2">2500V</td>
                      <td className="py-2 font-semibold text-green-400">&gt;= 1 M ohm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h3 className="font-medium text-foreground mb-3">IR Test Procedure</h3>
            <ol className="space-y-2 text-sm text-muted-foreground mb-4">
              <li className="flex gap-3">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs flex-shrink-0">1</span>
                <span><strong className="text-foreground">Isolate and prove dead</strong> - Use approved voltage indicator before and after testing</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs flex-shrink-0">2</span>
                <span><strong className="text-foreground">Disconnect from VSD/soft starter</strong> - Essential to prevent damage to electronic components</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs flex-shrink-0">3</span>
                <span><strong className="text-foreground">Record ambient conditions</strong> - Temperature and humidity affect readings</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs flex-shrink-0">4</span>
                <span><strong className="text-foreground">Test phase to earth</strong> - All phases connected together, test to motor frame/earth</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs flex-shrink-0">5</span>
                <span><strong className="text-foreground">Test phase to phase</strong> - For wye-connected motors, test between each phase pair</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs flex-shrink-0">6</span>
                <span><strong className="text-foreground">Discharge capacitance</strong> - Short windings to earth after testing, maintain for at least 4x test duration</span>
              </li>
            </ol>

            <h3 className="font-medium text-foreground mb-3">Polarisation Index (PI) Test</h3>
            <p className="text-sm text-muted-foreground mb-3">
              For motors above 1kW, the PI test provides additional information about insulation condition:
            </p>
            <div className="bg-background/50 rounded-lg p-4 mb-4">
              <p className="text-center text-lg text-elec-yellow mb-3 font-mono">
                PI = IR at 10 minutes / IR at 1 minute
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-center">
                <div className="bg-red-500/10 border border-red-500/30 rounded p-2">
                  <div className="font-semibold text-red-400">&lt; 1.0</div>
                  <div className="text-muted-foreground text-xs">Dangerous</div>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded p-2">
                  <div className="font-semibold text-orange-400">1.0 - 2.0</div>
                  <div className="text-muted-foreground text-xs">Questionable</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                  <div className="font-semibold text-green-400">2.0 - 4.0</div>
                  <div className="text-muted-foreground text-xs">Good</div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                  <div className="font-semibold text-blue-400">&gt; 4.0</div>
                  <div className="text-muted-foreground text-xs">Excellent</div>
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

        {/* Section 3: No-Load and Locked Rotor Tests */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            No-Load and Locked Rotor Current Tests
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-medium text-foreground mb-3">No-Load Test (Running Light)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The no-load test verifies correct rotation, measures magnetising current, and identifies
              mechanical issues before coupling to the driven equipment.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-background/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">Test Procedure</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>- Verify phase rotation with meter before starting</li>
                  <li>- Ensure motor is uncoupled from load</li>
                  <li>- Start motor and confirm rotation direction</li>
                  <li>- Record current on all three phases</li>
                  <li>- Listen for abnormal noise</li>
                  <li>- Run for minimum 10 minutes to detect issues</li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">Expected Values</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>- No-load current: <span className="text-elec-yellow">25-50% FLC</span></li>
                  <li>- Phase current imbalance: <span className="text-elec-yellow">&lt; 5%</span></li>
                  <li>- Speed: Within <span className="text-elec-yellow">plus or minus 1%</span> of nameplate</li>
                  <li>- No abnormal vibration or noise</li>
                  <li>- Bearing temperature stable</li>
                </ul>
              </div>
            </div>

            <h3 className="font-medium text-foreground mb-3">Locked Rotor Test</h3>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-orange-300">Caution:</strong> The locked rotor test generates
                  significant heat and current. Test duration must be limited (typically &lt; 10 seconds)
                  and motor must be allowed to cool between tests. Some installations prohibit this test
                  - consult manufacturer guidance.
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              The locked rotor test measures starting current to verify protection settings. The rotor
              is mechanically prevented from rotating while supply voltage is applied briefly.
            </p>

            <div className="bg-background/50 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Key Measurements</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-elec-yellow border-b border-white/10">
                      <th className="text-left py-2">Parameter</th>
                      <th className="text-left py-2">Typical Range</th>
                      <th className="text-left py-2">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-white/5">
                      <td className="py-2">Starting Current</td>
                      <td className="py-2">5-8 x FLC</td>
                      <td className="py-2">Protection coordination</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Starting Torque</td>
                      <td className="py-2">Per nameplate</td>
                      <td className="py-2">Load starting capability</td>
                    </tr>
                    <tr>
                      <td className="py-2">Power Factor</td>
                      <td className="py-2">0.2 - 0.4</td>
                      <td className="py-2">Winding impedance check</td>
                    </tr>
                  </tbody>
                </table>
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

        {/* Section 4: Vibration and Bearing Temperature */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Vibration and Bearing Temperature Checks
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <div className="flex items-start gap-3 mb-4">
              <Activity className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Vibration analysis and thermal monitoring during commissioning establish baseline
                values for predictive maintenance and identify installation faults.
              </p>
            </div>

            <h3 className="font-medium text-foreground mb-3">ISO 10816 Vibration Severity Zones</h3>
            <p className="text-sm text-muted-foreground mb-4">
              ISO 10816-3 classifies vibration severity for rotating machines. Measurements are taken
              in velocity (mm/s RMS) at bearing housings in three planes.
            </p>

            <div className="bg-background/50 rounded-lg p-4 mb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-elec-yellow border-b border-white/10">
                      <th className="text-left py-2">Zone</th>
                      <th className="text-left py-2">Velocity (mm/s RMS)</th>
                      <th className="text-left py-2">Machine Condition</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-white/5">
                      <td className="py-2"><span className="bg-green-600 px-2 py-0.5 rounded text-white text-xs">Zone A</span></td>
                      <td className="py-2">&lt; 1.8</td>
                      <td className="py-2">Newly commissioned machines</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2"><span className="bg-blue-600 px-2 py-0.5 rounded text-white text-xs">Zone B</span></td>
                      <td className="py-2">1.8 - 4.5</td>
                      <td className="py-2">Acceptable for unrestricted operation</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2"><span className="bg-amber-600 px-2 py-0.5 rounded text-white text-xs">Zone C</span></td>
                      <td className="py-2">4.5 - 7.1</td>
                      <td className="py-2">Restricted operation, investigate</td>
                    </tr>
                    <tr>
                      <td className="py-2"><span className="bg-red-600 px-2 py-0.5 rounded text-white text-xs">Zone D</span></td>
                      <td className="py-2">&gt; 7.1</td>
                      <td className="py-2">Unacceptable, damage possible</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground text-xs mt-2">
                * Values shown for Group 2 machines (medium-sized, 15-300 kW). Consult ISO 10816-3 for specific machine classes.
              </p>
            </div>

            <h3 className="font-medium text-foreground mb-3">Bearing Temperature Monitoring</h3>
            <div className="flex items-start gap-3 mb-4">
              <Thermometer className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Bearing temperature during commissioning indicates lubrication adequacy, alignment
                condition, and pre-load setting for angular contact bearings.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-background/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">Temperature Limits</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>- Maximum absolute: <span className="text-elec-yellow">80 degrees C</span> (grease lubricated)</li>
                  <li>- Temperature rise above ambient: <span className="text-elec-yellow">&lt; 40 degrees C</span></li>
                  <li>- Stabilisation time: <span className="text-elec-yellow">1-2 hours</span></li>
                  <li>- Investigate if: <span className="text-red-400">&gt; 40 degrees C rise</span></li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">Thermal Imaging Points</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>- Drive end (DE) bearing housing</li>
                  <li>- Non-drive end (NDE) bearing housing</li>
                  <li>- Terminal box connections</li>
                  <li>- Motor frame (uniform distribution)</li>
                  <li>- Coupling area (alignment issues)</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <h4 className="font-medium text-blue-300 mb-2">Baseline Documentation</h4>
              <p className="text-sm text-muted-foreground">
                Record all vibration and temperature measurements during commissioning as baseline
                values. Future predictive maintenance trending compares operational values against
                these commissioning baselines to identify degradation before failure.
              </p>
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

        {/* Section 5: Load Testing */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Load Testing and Current Measurement
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <p className="text-sm text-muted-foreground mb-4">
              After successful no-load testing, the motor is coupled to the driven equipment and load
              tested to verify performance under operating conditions.
            </p>

            <h3 className="font-medium text-foreground mb-3">Load Test Procedure</h3>
            <ol className="space-y-2 text-sm text-muted-foreground mb-4">
              <li className="flex gap-3">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs flex-shrink-0">1</span>
                <span><strong className="text-foreground">Verify coupling alignment</strong> - Check angular and parallel alignment before restarting</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs flex-shrink-0">2</span>
                <span><strong className="text-foreground">Start unloaded</strong> - Run motor-pump/fan system without process load initially</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs flex-shrink-0">3</span>
                <span><strong className="text-foreground">Apply load incrementally</strong> - 25%, 50%, 75%, then 100% load stages</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs flex-shrink-0">4</span>
                <span><strong className="text-foreground">Record parameters at each stage</strong> - Current, power, vibration, temperature</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs flex-shrink-0">5</span>
                <span><strong className="text-foreground">Run at full load</strong> - Minimum 2 hours for thermal stabilisation</span>
              </li>
            </ol>

            <h3 className="font-medium text-foreground mb-3">Current Measurement Criteria</h3>
            <div className="bg-background/50 rounded-lg p-4 mb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-elec-yellow border-b border-white/10">
                      <th className="text-left py-2">Parameter</th>
                      <th className="text-left py-2">Acceptable</th>
                      <th className="text-left py-2">Action Required</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-white/5">
                      <td className="py-2">Full Load Current</td>
                      <td className="py-2 text-green-400">&lt;= Nameplate FLC</td>
                      <td className="py-2 text-red-400">&gt; FLC - Investigate load</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Phase Imbalance</td>
                      <td className="py-2 text-green-400">&lt; 5%</td>
                      <td className="py-2 text-red-400">&gt; 5% - Check supply/motor</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Power Factor</td>
                      <td className="py-2 text-green-400">0.85 - 0.95 at full load</td>
                      <td className="py-2 text-amber-400">&lt; 0.85 - May indicate light loading</td>
                    </tr>
                    <tr>
                      <td className="py-2">Starting Current</td>
                      <td className="py-2 text-green-400">Per nameplate code letter</td>
                      <td className="py-2 text-red-400">Excess - Check DOL/Star-Delta</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Phase Current Imbalance Calculation</h4>
              <div className="bg-elec-yellow/10 rounded p-3 font-mono text-sm text-elec-yellow mb-3">
                <p>Imbalance % = [(Max deviation from average) / Average current] x 100</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Example: L1=48A, L2=51A, L3=50A. Average=49.67A. Max deviation=1.67A. Imbalance = 3.4%
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Documentation */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Documentation and Handover Requirements
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <div className="flex items-start gap-3 mb-4">
              <FileText className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Complete documentation is essential for BS 7671 compliance, warranty validity, and
                ongoing maintenance planning. All test results form part of the installation's
                technical records.
              </p>
            </div>

            <h3 className="font-medium text-foreground mb-3">BS 7671 Required Documentation</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-background/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">Electrical Installation Certificate</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>- Design details and characteristics</li>
                  <li>- Installation details</li>
                  <li>- Inspection schedule (Section A)</li>
                  <li>- Test results schedule</li>
                  <li>- Signed declaration of compliance</li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">Schedule of Test Results</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>- Circuit details and reference</li>
                  <li>- Continuity of protective conductors</li>
                  <li>- Insulation resistance values</li>
                  <li>- Polarity verification</li>
                  <li>- Earth fault loop impedance</li>
                  <li>- Functional testing results</li>
                </ul>
              </div>
            </div>

            <h3 className="font-medium text-foreground mb-3">Motor-Specific Commissioning Records</h3>
            <div className="bg-background/50 rounded-lg p-4 mb-4">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-elec-yellow mb-2">Identification</h5>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>- Motor tag/asset number</li>
                    <li>- Manufacturer and model</li>
                    <li>- Serial number</li>
                    <li>- Nameplate data (kW, V, A, rpm)</li>
                    <li>- Installation location</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-elec-yellow mb-2">Test Results</h5>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>- IR values (all phases/earth)</li>
                    <li>- PI value (if performed)</li>
                    <li>- No-load current (3 phases)</li>
                    <li>- Full-load current (3 phases)</li>
                    <li>- Vibration baseline</li>
                    <li>- Bearing temperatures</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-elec-yellow mb-2">Settings Confirmation</h5>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>- Overload relay setting</li>
                    <li>- Trip class (10, 20, 30)</li>
                    <li>- Star-delta timer (if fitted)</li>
                    <li>- VSD parameters (if fitted)</li>
                    <li>- Protection relay settings</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="font-medium text-foreground mb-3">Handover Package</h3>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-medium text-green-300 mb-2">Complete Handover Should Include:</h4>
              <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                <li>- Electrical Installation Certificate</li>
                <li>- Schedule of Test Results</li>
                <li>- Motor commissioning checklist (signed)</li>
                <li>- Thermal imaging baseline report</li>
                <li>- Vibration analysis baseline report</li>
                <li>- Motor manufacturer datasheet</li>
                <li>- Spare parts list and recommendations</li>
                <li>- Maintenance schedule recommendations</li>
                <li>- As-built drawings if changes made</li>
                <li>- Protection relay settings record</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="space-y-4">
          <div className="bg-gradient-to-r from-elec-yellow/20 to-amber-600/20 border border-elec-yellow/30 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-elec-yellow" />
              Quick Reference Card
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-background/50 rounded-lg p-3">
                <h3 className="font-medium text-foreground text-sm mb-1">IR Test Minimum</h3>
                <p className="text-xl font-bold text-green-400">&gt;= 1 M ohm</p>
                <p className="text-muted-foreground text-xs">BS 7671 requirement</p>
              </div>

              <div className="bg-background/50 rounded-lg p-3">
                <h3 className="font-medium text-foreground text-sm mb-1">IR Test Voltage</h3>
                <p className="text-xl font-bold text-elec-yellow">500V DC</p>
                <p className="text-muted-foreground text-xs">For 400V motors</p>
              </div>

              <div className="bg-background/50 rounded-lg p-3">
                <h3 className="font-medium text-foreground text-sm mb-1">No-Load Current</h3>
                <p className="text-xl font-bold text-blue-400">25-50% FLC</p>
                <p className="text-muted-foreground text-xs">Typical range</p>
              </div>

              <div className="bg-background/50 rounded-lg p-3">
                <h3 className="font-medium text-foreground text-sm mb-1">Phase Imbalance</h3>
                <p className="text-xl font-bold text-amber-400">&lt; 5%</p>
                <p className="text-muted-foreground text-xs">Maximum acceptable</p>
              </div>

              <div className="bg-background/50 rounded-lg p-3">
                <h3 className="font-medium text-foreground text-sm mb-1">Vibration (New)</h3>
                <p className="text-xl font-bold text-green-400">&lt; 1.8 mm/s</p>
                <p className="text-muted-foreground text-xs">ISO 10816 Zone A</p>
              </div>

              <div className="bg-background/50 rounded-lg p-3">
                <h3 className="font-medium text-foreground text-sm mb-1">Bearing Temp Rise</h3>
                <p className="text-xl font-bold text-red-400">&lt; 40 degrees C</p>
                <p className="text-muted-foreground text-xs">Above ambient</p>
              </div>

              <div className="bg-background/50 rounded-lg p-3">
                <h3 className="font-medium text-foreground text-sm mb-1">PI Value (Good)</h3>
                <p className="text-xl font-bold text-green-400">&gt; 2.0</p>
                <p className="text-muted-foreground text-xs">10min / 1min ratio</p>
              </div>

              <div className="bg-background/50 rounded-lg p-3">
                <h3 className="font-medium text-foreground text-sm mb-1">Starting Current</h3>
                <p className="text-xl font-bold text-elec-yellow">5-8 x FLC</p>
                <p className="text-muted-foreground text-xs">DOL starting</p>
              </div>

              <div className="bg-background/50 rounded-lg p-3">
                <h3 className="font-medium text-foreground text-sm mb-1">Load Test Duration</h3>
                <p className="text-xl font-bold text-blue-400">&gt;= 2 hours</p>
                <p className="text-muted-foreground text-xs">At full load</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs - Static bordered list */}
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
          <Button
            onClick={() => setShowQuiz(!showQuiz)}
            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            {showQuiz ? 'Hide Quiz' : 'Take the Quiz'}
          </Button>

          {showQuiz && (
            <Quiz
              questions={quizQuestions}
              title="Motor Commissioning and Load Testing Quiz"
              passingScore={70}
            />
          )}
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-2/section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Forward/Reverse Control
            </Link>
          </Button>
          <Button size="lg" className="bg-elec-yellow text-black hover:bg-elec-yellow/90" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-3">
              Next: Module 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default IndustrialElectricalModule2Section6;
