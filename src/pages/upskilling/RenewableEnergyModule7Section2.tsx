import { ArrowLeft, CheckCircle, Lightbulb, AlertTriangle, Activity, TestTube, FileText, Zap, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { section2Questions } from '@/data/upskilling/renewableEnergyModule7QuizData';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import CommissioningChecksPractical from '@/components/upskilling/renewable-energy/CommissioningChecksPractical';
import CommissioningChecksFAQ from '@/components/upskilling/renewable-energy/CommissioningChecksFAQ';

const RenewableEnergyModule7Section2 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What test checks for cable degradation?",
      options: [
        "Open circuit voltage measurement",
        "Insulation resistance testing",
        "Short circuit current testing",
        "Power output measurement"
      ],
      correct: 1,
      explanation: "Insulation resistance testing detects cable degradation, moisture ingress, and insulation breakdown that can lead to earth faults and system failures."
    },
    {
      id: 2,
      question: "How is open circuit voltage measured?",
      options: [
        "With inverter running at full power",
        "With DC isolator open and multimeter across string terminals",
        "Using AC voltmeter at inverter output",
        "Through the monitoring system only"
      ],
      correct: 1,
      explanation: "Open circuit voltage (Voc) is measured with the DC isolator open using a DC voltmeter connected across the positive and negative terminals of each string."
    },
    {
      id: 3,
      question: "What's one sign of reverse polarity?",
      options: [
        "Higher than expected power output",
        "Inverter display shows negative power or won't start",
        "Improved system efficiency",
        "Reduced cable heating"
      ],
      correct: 1,
      explanation: "Reverse polarity typically causes the inverter to display negative power values, show fault codes, or fail to start as the power electronics cannot operate with incorrect voltage polarity."
    },
    {
      id: 4,
      question: "Why is insulation testing done before energising?",
      options: [
        "To check system efficiency",
        "To verify there are no earth faults that could cause shock or fire hazards",
        "To measure power output",
        "To test the inverter functionality"
      ],
      correct: 1,
      explanation: "Insulation testing before energisation verifies that there are no earth faults or insulation breakdown that could create dangerous shock hazards or fire risks when the system is powered."
    },
    {
      id: 5,
      question: "What should always be documented?",
      options: [
        "Only the installation date",
        "All test results, measurements, and system configuration details",
        "Just the warranty information",
        "Only fault conditions found"
      ],
      correct: 1,
      explanation: "Comprehensive documentation of all test results, measurements, system configuration, and any issues found is essential for warranty claims, future maintenance, and regulatory compliance."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-7">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Commissioning Checks (Voltage, Insulation, Functional Testing)
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Ensuring systems are installed correctly and safe to energise through comprehensive testing
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Commissioning Procedures
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Perform critical electrical tests
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Follow safe energisation steps
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Identify early-stage faults
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Commissioning ensures the system is installed correctly and safe to energise. This critical phase involves systematic testing, verification, and documentation to confirm system performance, safety, and compliance with relevant standards before handover to the customer.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TestTube className="h-6 w-6 text-yellow-400" />
                Open-Circuit Voltage (Voc) and Short-Circuit Current (Isc) Measurements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Voc and Isc measurements verify panel performance, string configuration, and connection integrity. These fundamental tests confirm that the PV array is performing within expected parameters.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Open-Circuit Voltage (Voc) Testing:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Test conditions:</strong> DC isolator open, no load connected</li>
                    <li>• <strong>Equipment:</strong> True RMS DC voltmeter, CAT III rated</li>
                    <li>• <strong>Measurement points:</strong> Each string positive to negative</li>
                    <li>• <strong>Temperature correction:</strong> Adjust for ambient conditions</li>
                    <li>• <strong>Expected range:</strong> ±5% of calculated Voc</li>
                    <li>• <strong>Safety:</strong> High voltage present even with isolator open</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Short-Circuit Current (Isc) Testing:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Test conditions:</strong> Short string terminals with ammeter</li>
                    <li>• <strong>Equipment:</strong> DC current clamp or inline ammeter</li>
                    <li>• <strong>Safety consideration:</strong> Brief test only to avoid overheating</li>
                    <li>• <strong>Irradiance dependency:</strong> Results vary with sunlight intensity</li>
                    <li>• <strong>Expected range:</strong> Proportional to irradiance level</li>
                    <li>• <strong>String comparison:</strong> All strings should read similarly</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Measurement Procedures and Calculations:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Voc Temperature Correction:</h5>
                    <div className="bg-gray-800 p-3 rounded border border-gray-600 mt-2">
                      <p className="text-gray-300 font-mono text-xs">
                        Voc_corrected = Voc_measured × [1 + (Temp_coeff × (25°C - Cell_temp))]
                      </p>
                    </div>
                    <ul className="text-gray-300 space-y-1 mt-2">
                      <li>• Typical temp coefficient: -0.35%/°C</li>
                      <li>• Cell temp ≈ Ambient + 30°C</li>
                      <li>• Voc increases as temperature decreases</li>
                      <li>• Record ambient temperature during test</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Isc Irradiance Scaling:</h5>
                    <div className="bg-gray-800 p-3 rounded border border-gray-600 mt-2">
                      <p className="text-gray-300 font-mono text-xs">
                        Isc_1000W = Isc_measured × (1000W/m² ÷ Current_irradiance)
                      </p>
                    </div>
                    <ul className="text-gray-300 space-y-1 mt-2">
                      <li>• Measure irradiance with calibrated meter</li>
                      <li>• Linear relationship with irradiance</li>
                      <li>• Minimum 200W/m² for accurate results</li>
                      <li>• Temperature effect minimal for Isc</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Typical Test Results and Fault Identification:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-gray-300">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-2">String Configuration</th>
                        <th className="text-left p-2">Expected Voc (STC)</th>
                        <th className="text-left p-2">Expected Isc (STC)</th>
                        <th className="text-left p-2">Common Faults</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">10× 400W panels (40V)</td>
                        <td className="p-2">400V ±20V</td>
                        <td className="p-2">10.5A ±0.5A</td>
                        <td className="p-2">Open circuit, shading</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">12× 350W panels (37V)</td>
                        <td className="p-2">444V ±22V</td>
                        <td className="p-2">9.8A ±0.5A</td>
                        <td className="p-2">Bypass diode failure</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Single panel fault</td>
                        <td className="p-2">Normal Voc</td>
                        <td className="p-2">Reduced Isc</td>
                        <td className="p-2">Cell damage, soiling</td>
                      </tr>
                      <tr>
                        <td className="p-2">Connection fault</td>
                        <td className="p-2">Zero or low Voc</td>
                        <td className="p-2">Zero Isc</td>
                        <td className="p-2">Open circuit, loose connection</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-orange-400" />
                Insulation Resistance Testing Procedures
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Insulation resistance testing verifies the electrical safety of the installation by detecting insulation breakdown, moisture ingress, and potential earth fault conditions before system energisation.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Test Equipment Requirements:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Insulation tester:</strong> 500V DC or 1000V DC capability</li>
                    <li>• <strong>Test voltage:</strong> Minimum 250V for LV circuits</li>
                    <li>• <strong>Measurement range:</strong> Up to 1000MΩ minimum</li>
                    <li>• <strong>Test leads:</strong> Insulated to test voltage rating</li>
                    <li>• <strong>Safety equipment:</strong> Warning signs, barriers</li>
                    <li>• <strong>Calibration:</strong> Annual calibration certificate required</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Test Procedure Steps:</h4>
                  <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
                    <li>Isolate all sources and loads completely</li>
                    <li>Remove or bridge any electronic devices</li>
                    <li>Connect test leads to conductors and earth</li>
                    <li>Apply test voltage for minimum 60 seconds</li>
                    <li>Record stabilised resistance reading</li>
                    <li>Discharge circuit before disconnecting</li>
                  </ol>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-3">Insulation Resistance Test Points:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">DC Side Tests:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Positive conductor to earth</li>
                      <li>• Negative conductor to earth</li>
                      <li>• Positive to negative (if required)</li>
                      <li>• String-to-string isolation</li>
                      <li>• Cable screen to earth</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">AC Side Tests:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Live conductor to earth</li>
                      <li>• Neutral conductor to earth</li>
                      <li>• Live to neutral</li>
                      <li>• Each phase in 3-phase systems</li>
                      <li>• Cable armour to earth</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Minimum Values:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• DC circuits: {"≥1MΩ"} @ 500V DC</li>
                      <li>• AC circuits: {"≥1MΩ"} @ 500V DC</li>
                      <li>• ELV circuits: {"≥0.5MΩ"} @ 250V DC</li>
                      <li>• SELV circuits: {"≥0.25MΩ"} @ 250V DC</li>
                      <li>• Investigation: {"<0.5MΩ"} requires action</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                <h4 className="text-red-400 font-semibold mb-3">Common Insulation Faults and Causes:</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-white font-medium mb-2">Low Insulation Resistance Causes:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Moisture ingress:</strong> Damaged cable joints or poor sealing</li>
                      <li>• <strong>Mechanical damage:</strong> Cables trapped, crushed, or abraded</li>
                      <li>• <strong>UV degradation:</strong> Exposed cable jacket deterioration</li>
                      <li>• <strong>Rodent damage:</strong> Cable insulation gnawed through</li>
                      <li>• <strong>Installation damage:</strong> Sharp edges or excessive bending</li>
                      <li>• <strong>Manufacturing defects:</strong> Poor quality control or handling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-green-400" />
                Functional Inverter Startup Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Functional testing verifies that the inverter operates correctly, safely connects to the grid, and responds appropriately to various operating conditions and fault scenarios.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Pre-Startup Checks:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>DC isolation confirmed:</strong> All DC switches open</li>
                    <li>• <strong>AC isolation confirmed:</strong> AC isolator open</li>
                    <li>• <strong>Earthing verified:</strong> All bonding connections secure</li>
                    <li>• <strong>Polarity confirmed:</strong> Positive and negative correctly connected</li>
                    <li>• <strong>String voltages checked:</strong> Within expected range</li>
                    <li>• <strong>Grid parameters verified:</strong> Voltage and frequency normal</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Startup Sequence Testing:</h4>
                  <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
                    <li>Close AC isolator and verify grid connection</li>
                    <li>Close DC isolator and monitor DC input</li>
                    <li>Observe inverter startup sequence and displays</li>
                    <li>Check for fault codes or error messages</li>
                    <li>Verify power generation and grid export</li>
                    <li>Test shutdown sequence and safety functions</li>
                  </ol>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-3">Functional Test Parameters:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Normal Operation Tests:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Startup voltage threshold (typically {">150V"} DC)</li>
                      <li>• Maximum power point tracking (MPPT) function</li>
                      <li>• Grid synchronisation within 20 seconds</li>
                      <li>• Power output proportional to irradiance</li>
                      <li>• Efficiency within manufacturer specifications</li>
                      <li>• Temperature derating if applicable</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Protection Function Tests:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Over/under voltage protection (±10% nominal)</li>
                      <li>• Over/under frequency protection (49.5-50.5Hz)</li>
                      <li>• Loss of mains detection ({"<0.5s"} response)</li>
                      <li>• Earth fault monitoring and alarm</li>
                      <li>• Overtemperature protection and derating</li>
                      <li>• Arc fault detection (if equipped)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Common Startup Issues and Solutions:</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-white font-medium mb-2">Inverter Won't Start:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Check DC voltage is above minimum threshold</li>
                      <li>• Verify grid voltage and frequency within limits</li>
                      <li>• Confirm all isolation switches are closed</li>
                      <li>• Check for earth faults or insulation issues</li>
                      <li>• Review error codes and fault history</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-white font-medium mb-2">Low Power Output:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Check for shading on panels</li>
                      <li>• Verify string connections and polarity</li>
                      <li>• Measure actual irradiance levels</li>
                      <li>• Check for inverter derating conditions</li>
                      <li>• Compare with weather-corrected expectations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-6 w-6 text-purple-400" />
                Confirming Communication and Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Modern renewable energy systems rely on communication and monitoring for performance optimisation, fault detection, and maintenance scheduling. Verifying these systems work correctly is essential for long-term operation.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Communication System Types:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>WiFi connection:</strong> Most common for residential systems</li>
                    <li>• <strong>Ethernet:</strong> Commercial installations and reliable connection</li>
                    <li>• <strong>RS485:</strong> String-level monitoring and control</li>
                    <li>• <strong>PowerLine communication:</strong> Data over power cables</li>
                    <li>• <strong>Cellular/4G:</strong> Remote locations without internet</li>
                    <li>• <strong>Zigbee/wireless:</strong> Panel-level optimisation systems</li>
                  </ul>
                </div>
                <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-500/30">
                  <h4 className="text-indigo-400 font-semibold mb-3">Monitoring System Functions:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Performance monitoring:</strong> Power, energy, efficiency tracking</li>
                    <li>• <strong>Fault detection:</strong> Early warning of system issues</li>
                    <li>• <strong>Environmental data:</strong> Irradiance, temperature recording</li>
                    <li>• <strong>String-level data:</strong> Individual string performance</li>
                    <li>• <strong>Historical logging:</strong> Long-term performance analysis</li>
                    <li>• <strong>Remote diagnostics:</strong> Off-site troubleshooting capability</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-3">Communication Testing Procedures:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Network Connectivity Tests:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• WiFi signal strength measurement</li>
                      <li>• Internet connectivity verification</li>
                      <li>• Port forwarding and firewall checks</li>
                      <li>• Data transmission rate testing</li>
                      <li>• Backup communication path verification</li>
                      <li>• Security protocol compliance check</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Monitoring Platform Tests:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• User account creation and access</li>
                      <li>• Real-time data display verification</li>
                      <li>• Alert and notification testing</li>
                      <li>• Mobile app functionality check</li>
                      <li>• Data logging and export functions</li>
                      <li>• Reporting and analytics features</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-teal-900/20 p-4 rounded-lg border border-teal-500/30">
                <h4 className="text-teal-400 font-semibold mb-3">Monitoring System Configuration:</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-white font-medium mb-2">Essential Configuration Items:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• System size and panel configuration entered correctly</li>
                      <li>• Geographic location and timezone set</li>
                      <li>• Expected performance baselines established</li>
                      <li>• Alert thresholds configured appropriately</li>
                      <li>• User permissions and access levels defined</li>
                      <li>• Maintenance schedules and reminder setup</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                Documenting Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Comprehensive documentation is essential for warranty claims, regulatory compliance, future maintenance, and system performance analysis. Proper records protect both installer and customer interests.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Essential Documentation:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Test certificates:</strong> All electrical test results</li>
                    <li>• <strong>Installation records:</strong> As-built drawings and photos</li>
                    <li>• <strong>Equipment data:</strong> Serial numbers and specifications</li>
                    <li>• <strong>Performance baselines:</strong> Initial power and energy readings</li>
                    <li>• <strong>Warranty documentation:</strong> All manufacturer warranties</li>
                    <li>• <strong>Operating instructions:</strong> User manuals and procedures</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Test Result Recording:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Measurement conditions:</strong> Temperature, irradiance, weather</li>
                    <li>• <strong>Test equipment used:</strong> Make, model, calibration dates</li>
                    <li>• <strong>All readings taken:</strong> Raw data before any corrections</li>
                    <li>• <strong>Calculated values:</strong> Temperature and irradiance corrections</li>
                    <li>• <strong>Pass/fail criteria:</strong> Standards and limits applied</li>
                    <li>• <strong>Remedial actions:</strong> Any faults found and corrected</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Documentation Standards and Requirements:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Regulatory Requirements:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• BS 7671 compliance certificates</li>
                      <li>• MCS installation certificate</li>
                      <li>• DNO connection notification</li>
                      <li>• Building control notification</li>
                      <li>• Fire service notification (if required)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Customer Handover Pack:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• System operation manual</li>
                      <li>• Emergency shutdown procedures</li>
                      <li>• Maintenance schedule and requirements</li>
                      <li>• Warranty terms and registration</li>
                      <li>• Contact details for support</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Digital Records:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Cloud storage backup</li>
                      <li>• Customer portal access</li>
                      <li>• QR codes for quick access</li>
                      <li>• Mobile-friendly formats</li>
                      <li>• Version control and updates</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                <h4 className="text-green-400 font-semibold mb-3">Quality Documentation Checklist:</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-white font-medium mb-2">Before Customer Handover:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>☐ All test certificates completed and signed</li>
                      <li>☐ Installation photos showing key components</li>
                      <li>☐ System performance verified against expectations</li>
                      <li>☐ Customer training completed and documented</li>
                      <li>☐ Warranty registrations submitted</li>
                      <li>☐ Monitoring system operational and configured</li>
                      <li>☐ Emergency contact information provided</li>
                      <li>☐ Copy retained for installer records</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-400" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                <h4 className="text-orange-400 font-semibold mb-3">Case Study: Startup Failure Due to Polarity Error</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  An inverter wouldn't start up during commissioning, displaying error codes and showing negative power readings. Investigation revealed incorrect polarity connections due to skipped testing during installation.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium mb-2">Investigation Process:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Inverter displayed "DC reverse polarity" error</li>
                      <li>• DC voltage measurement showed correct magnitude</li>
                      <li>• Polarity check revealed positive and negative swapped</li>
                      <li>• String connections traced back to junction box</li>
                      <li>• Multiple strings affected due to systematic error</li>
                      <li>• Labels were incorrect throughout installation</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-2">Resolution Actions:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• System safely isolated before corrections</li>
                      <li>• Polarity corrected at junction box connections</li>
                      <li>• All cable labels updated to match corrections</li>
                      <li>• Complete polarity verification performed</li>
                      <li>• Successful startup and power generation confirmed</li>
                      <li>• Installation procedures updated to prevent recurrence</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-card p-3 rounded border border-gray-600 mt-4">
                  <h5 className="text-green-400 font-medium mb-2">Prevention Measures:</h5>
                  <ul className="text-gray-300 text-xs space-y-1">
                    <li>• Mandatory polarity checks before any connections</li>
                    <li>• Consistent cable marking and labelling procedures</li>
                    <li>• Pre-energisation testing checklist implementation</li>
                    <li>• Team training on systematic error recognition</li>
                    <li>• Quality control inspection before commissioning</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Testing ensures system performance, warranty validity, and customer safety. Systematic commissioning procedures verify that installations meet design specifications and operate safely under all conditions.
              </p>
              <p className="text-yellow-400 font-medium">
                Comprehensive testing, documentation, and handover procedures ensure successful project completion and provide the foundation for reliable long-term system operation and maintenance.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={section2Questions}
                title="Commissioning Checks Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule7Section2;